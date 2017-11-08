var cn = require("../data/cn")
var log = require("./registroactividades.model.js")

var model = {}

model.getHorarios = (data, next) => {
    var sql = "SELECT h.horario AS horario, h.codigo_seccion AS codigo_seccion, h.dia_comienzo AS dia_comienzo, h.mes_comienzo AS mes_comienzo, s.nombre AS nombre_seccion FROM horario AS h INNER JOIN seccion AS s "
        sql += "ON s.codigo = h.codigo_seccion"
        
    cn.Ask(sql, (res) => {
        if (res) {
            data.accion = "consultó por todos los registros de Horario"
            
            log.inRegistro(data, (results) => {
                (results) ? next(res) : next(false)
            })
        } else {
            next(false)
        }
    })
}

model.getRecomendacionDocente = (data, next) => {
    var docentes = []
    
    var sql = "SELECT codigo FROM asignatura WHERE nombre = '" + data.asignatura + "'"
    
    cn.Ask(sql, (res) => {
        if (res) {
            sql = "SELECT run_docente FROM docente_perfilprofesional WHERE id_perfilprofesional = (SELECT id_perfilprofesional FROM asignatura_perfilprofesional WHERE codigo_asignatura = '" + res[0].codigo + "')"
            
            cn.Ask(sql, (res) => {
                if (res) {
                    res.forEach((e, i) => {
                        sql = "SELECT run, nombre, disponibilidad FROM docente WHERE run = '" + e.run_docente + "'"
                        
                        cn.Ask(sql, (res2) => {
                            res2.forEach((d, c) => {
                                var disponibilidadArr = d.disponibilidad.split(",")
                                var indexTotal = 0
                                var flag = false
                                
                                for (var i2 = 0; i2 < 18; i2++) {
                                    for (var c2 = 0; c2 < 6; c2++) {
                                        if (i2 == data.bloque_horario) {
                                            if (disponibilidadArr[indexTotal] == "true") {
                                                docentes.push(JSON.parse(JSON.stringify(d)))
                                                flag = true
                                                break
                                            }
                                        }
                                        
                                        indexTotal++
                                    }
                                    
                                    if (flag) {
                                        flag = false
                                        break
                                    }
                                }
                                
                                if (i + 1 == res.length) {
                                    
                                    data.accion = "pidió recomendaciones de Docentes para la Asignatura " + data.asignatura
                                    
                                    log.inRegistro(data, (res) => {
                                        if (res) {
                                            next(docentes)
                                        } else {
                                            next(false)
                                        }
                                    })
                                }
                            })
                        })
                    })
                } else {
                    next(false)
                }
            })
            
        } else {
            next(false)
        }
    })
}

model.inHorarios = (data, next) => {
    var asignaturas = [] , seccion, salas = [], feriados = []
    var bloquesHorarios = [
            "8:30 - 9:15",
            "9:15 - 10:00",
            "10:05 - 10:50",
            "10:50 - 11:35",
            "11:40 - 12:25",
            "12:25 - 13:10",
            "13:45 - 14:30",
            "14:30 - 15:15",
            "15:20 - 16:05",
            "16:05 - 16:50",
            "16:55 - 17:40",
            "17:40 - 18:25",
            "18:30 - 19:15",
            "19:15 - 20:00",
            "20:05 - 20:50",
            "20:50 - 21:35",
            "21:40 - 22:25",
            "22:25 - 23:10"
    ]
    
    var sql = "SELECT s.*, c.tamano AS tamano_curso FROM seccion AS s INNER JOIN curso AS c ON s.codigo_curso = c.codigo AND s.codigo = '" + data.seccion + "'"
    
    cn.Ask(sql, (res) => {
        if (res) {
            seccion = JSON.parse(JSON.stringify(res))
            
            sql = "SELECT * FROM asignatura WHERE semestre = '" + seccion[0].semestre + "' AND codigo_maya = '" + seccion[0].codigo_maya + "' ORDER BY cantidad_horas DESC"
            
            cn.Ask(sql, (res) => {
                if (res) {
                    res.forEach((e, i) => {
                        asignaturas[i] = JSON.parse(JSON.stringify(e))
                        
                        sql = "SELECT da.run_docente AS run, d.nombre AS nombre, d.disponibilidad AS disponibilidad FROM docente_asignatura AS da INNER JOIN "
                        sql += "docente AS d ON da.codigo_asignatura = '" + e.codigo + "' AND da.run_docente = d.run"
                        
                        cn.Ask(sql, (res2) => {
                            if (res2) {
                                asignaturas[i].docentes = JSON.parse(JSON.stringify(res2))
                                
                                if (i + 1 == res.length) {
                                    sql = "SELECT * from sala"
                                    
                                    cn.Ask(sql, (res) => {
                                        if (res) {
                                            res.forEach((e, c) => {
                                                salas[c] = JSON.parse(JSON.stringify(e))
                                                
                                                if (c + 1 == res.length) {
                                                    sql = "SELECT dia, mes FROM feriado"
                                                    
                                                    cn.Ask(sql, (res) => {
                                                        if (res) {
                                                            res.forEach((e, f) => {
                                                                feriados[f] = e.dia + "/" + e.mes
                                                                
                                                                if (f + 1 == res.length) {
                                                                    doHorario()
                                                                }
                                                            })
                                                        } else {
                                                            next(false)
                                                        }
                                                    })
                                                }
                                            })
                                        } else {
                                            next(false)
                                        }
                                    })
                                }
                                
                            } else {
                                next(false)
                            }
                        })
                    })
                    
                } else {
                    next(false)
                }
            })
            
        } else {
            next(false)
        }
    })
    
    function doHorario () {
        var meses = [
            31,
            28,
            31,
            30,
            31,
            30,
            31,
            31,
            30,
            31,
            30,
            31
        ]
        
        var matrixSeccionSemestral = []
        var dia = parseInt(data.dia)
        var mes = (parseInt(data.mes) - 1)
        
        for (var semanas = 0; semanas < parseInt(data.cantidad_semanas); semanas++) {
            var matrixSeccion = []
            
            for (var i = 0; i < 18; i++) {
                var columns = []
                
                for (var e = 0; e < 6; e++) {
                    columns.push({
                        disponible: true,
                        asignatura: null,
                        docente: null,
                        sala: null
                    })
                }
                
                matrixSeccion[i] = columns
            }
            
            matrixSeccionSemestral.push(matrixSeccion)
        }
        
        salas.forEach((s, m) => {
            var disponibilidadArr = s.disponibilidad.split(",")
            var disponibilidadMatrix = []
            var index = 0
            
            for (var i = 0; i < 18; i++) {
                var columns = []
                
                for (var c = 0; c < 6; c++) {
                    columns.push(disponibilidadArr[index])
                    index++
                }
                
                disponibilidadMatrix[i] = columns
            }
            
            salas[m].disponibilidad = disponibilidadMatrix
        })
        
        for (var se = 0; se < matrixSeccionSemestral.length; se++) {
            asignaturas.forEach((e, indexAs) => {
                if (typeof e.docentes != "undefined") {
                    e.docentes.forEach((d, n) => {
                        var disponibilidadMatrix = []
                        
                        if (typeof d.disponibilidad == "string") {
                            var disponibilidadArr = d.disponibilidad.split(",")
                            var index = 0
                            
                            for (var i = 0; i < 18; i++) {
                                var columns = []
                                
                                for (var c = 0; c < 6; c++) {
                                    columns.push(disponibilidadArr[index])
                                    index++
                                }
                                
                                disponibilidadMatrix[i] = columns
                            }
                        } else {
                            disponibilidadMatrix = d.disponibilidad
                        }
                        
                        e.docentes[n].disponibilidad = disponibilidadMatrix
                    })
                }
                
                var horasAsignadas = 0
                var flagSala = false
                
                for (var c = 0; c < 6; c++) {
                    var diaAux = dia
                    var mesAux = mes + 1
                    
                    if (diaAux + c > meses[mes]) {
                        diaAux += c - meses[mes]
                        mesAux++
                    } else {
                        diaAux += c
                    }
                    
                    if (feriados.indexOf(diaAux.toString() + "/" + mesAux.toString()) == -1) {
                        for (var i = bloquesHorarios.indexOf(seccion[0].hora_inicio); i < bloquesHorarios.indexOf(seccion[0].hora_termino); i++) {
                            if (matrixSeccionSemestral[se][i][c].disponible) {
                                for (var d = 0; d < e.docentes.length; d++) {
                                    if (e.docentes[d].disponibilidad[i][c] == "true") {
                                        for (var s = 0; s < salas.length; s++) {
                                            if (salas[s].disponibilidad[i][c] == "true" && salas[s].capacidad_alumnos >= seccion[0].tamano_curso && salas[s].equipamiento == e.equipamiento && e.cantidad_horas > 0) {
                                                matrixSeccionSemestral[se][i][c].disponible = false
                                                matrixSeccionSemestral[se][i][c].asignatura = e.nombre
                                                matrixSeccionSemestral[se][i][c].docente = e.docentes[d].nombre
                                                matrixSeccionSemestral[se][i][c].sala = "Sala " + salas[s].codigo
                                                
                                                horasAsignadas++
                                                
                                                asignaturas[indexAs].cantidad_horas--
                                                
                                                flagSala = true
                                                break
                                            }
                                        }
                                        
                                        if (flagSala) {
                                            flagSala = false
                                            break
                                        }
                                    }
                                }
                                
                                if (horasAsignadas == parseInt(e.horasporsemana) / 2 && e.horasporsemana != "5") {
                                    break
                                } else if (horasAsignadas == 2 && e.horasporsemana == "5") {
                                    break
                                } else if (horasAsignadas == e.horasporsemana) {
                                    return
                                }
                            }
                        }
                    }
                }
            })
            
            for (var di = 0; di < 7; di++) {
                if (dia == meses[mes]) {
                    dia = 1
                    mes++
                } else {
                    dia++
                }
            }
        }
        
        var sql = "INSERT INTO horario (horario, dia_comienzo, mes_comienzo, codigo_seccion) VALUES('" + JSON.stringify(matrixSeccionSemestral) + "', '" + data.dia + "', '" + data.mes + "', '" + seccion[0].codigo + "')"
        
        cn.Ask(sql, (res) => {
            if (res) {
                data.accion = "creó un nuevo Horario para Sección " + seccion[0].codigo
                
                log.inRegistro(data, (res) => {
                    (res) ? next("Horario planificado!") : next(false)
                })
            } else {
                next(false)
            }
        })
    }
}

module.exports = model