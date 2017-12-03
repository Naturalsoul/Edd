var cn = require("../data/cn")
var log = require("./registroactividades.model.js")

var model = {}

model.getHorarios = (data, next) => {
    var sql = "SELECT h.id AS id, h.horario AS horario, h.codigo_seccion AS codigo_seccion, h.dia_comienzo AS dia_comienzo, h.mes_comienzo AS mes_comienzo, h.anio AS anio, h.semestre AS semestre, s.nombre AS nombre_seccion FROM horario AS h INNER JOIN seccion AS s "
        sql += "ON s.codigo = h.codigo_seccion WHERE h.codigo_seccion = '" + data.codigo + "'"
        
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
            sql = "SELECT run_docente FROM docente_perfilprofesional WHERE id_perfilprofesional IN ((SELECT id_perfilprofesional FROM asignatura_perfilprofesional WHERE codigo_asignatura = '" + res[0].codigo + "'))"
            
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

model.getSecciones = (data, next) => {
    var sql = "SELECT codigo_seccion AS codigo FROM horario"
    
    cn.Ask(sql, (res) => {
        if (res) {
            data.accion = "consultó por todos los códigos de sección con horario"
            
            log.inRegistro(data, (res2) => {
                if (res2) {
                    next(res)
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
    var asignaturas = [] , seccion, salas = [], feriados = [], docentes = []
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
            salas[m].nuevaDisponibilidad = disponibilidadMatrix
        })
        
        asignaturas.forEach((e, indexAs) => {
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
                e.docentes[n].nuevaDisponibilidad = disponibilidadMatrix
            })
        })
        
        var bloquesUsadosPorDia = []
        
        for (var cDias = 0; cDias < 6; cDias++) {
            bloquesUsadosPorDia.push({
                dia: cDias,
                quantityOfBlocks: 0
            })
        }
        
        asignaturas.forEach((e, indexAs) => {
            var bloquesUsadosPorDiaFlag = false
            
            asignaturas[indexAs].settedDays = []
            
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
                    for (var i = bloquesHorarios.indexOf(seccion[0].hora_inicio); i <= bloquesHorarios.indexOf(seccion[0].hora_termino); i++) {
                        if (matrixSeccionSemestral[0][i][c].disponible) {
                            for (var d = 0; d < e.docentes.length; d++) {
                                if (e.docentes[d].disponibilidad[i][c] == "true") {
                                    for (var s = 0; s < salas.length; s++) {
                                        if (salas[s].disponibilidad[i][c] == "true" && salas[s].capacidad_alumnos >= seccion[0].tamano_curso && salas[s].equipamiento == e.equipamiento && e.cantidad_horas > 0) {
                                            bloquesUsadosPorDiaFlag = false
                                            
                                            for (var bupd = 0; bupd < bloquesUsadosPorDia.length; bupd++) {
                                                if (bloquesUsadosPorDia[bupd].dia == c) {
                                                    if (horasAsignadas == 4 && e.horasporsemana == "5") {
                                                        setData()
                                                        break
                                                    } else if (e.horasporsemana == "3" && bloquesUsadosPorDia[bupd].quantityOfBlocks <= 5 && horasAsignadas == 2) {
                                                        setData()
                                                        break
                                                    } else if (horasAsignadas == 1 && e.horasporsemana == "4" || horasAsignadas == 3 && e.horasporsemana == "4") {
                                                        setData()
                                                        break
                                                    } else if (bloquesUsadosPorDia[bupd].quantityOfBlocks < 5) {
                                                        setData()
                                                        break
                                                    } else {
                                                        bloquesUsadosPorDiaFlag = true
                                                        break
                                                    }
                                                    
                                                    function setData () {
                                                        matrixSeccionSemestral[0][i][c].disponible = false
                                                        matrixSeccionSemestral[0][i][c].asignatura = e.nombre
                                                        matrixSeccionSemestral[0][i][c].docente = e.docentes[d].nombre
                                                        matrixSeccionSemestral[0][i][c].sala = "Sala " + salas[s].codigo
                                                        
                                                        horasAsignadas++
                                                        
                                                        asignaturas[indexAs].cantidad_horas--
                                                        bloquesUsadosPorDia[bupd].quantityOfBlocks++
                                                        
                                                        var flagDocenteAgregado = false
                                                        
                                                        for (var indexDocentes = 0; indexDocentes < docentes.length; indexDocentes++) {
                                                            if (docentes[indexDocentes].run == e.docentes[d].run) {
                                                                flagDocenteAgregado = true
                                                                break
                                                            }
                                                        }
                                                        
                                                        if (!flagDocenteAgregado) {
                                                            docentes.push({
                                                                run: e.docentes[d].run,
                                                                nombre: e.docentes[d].nombre,
                                                                disponibilidad: e.docentes[d].disponibilidad
                                                            })
                                                        }
                                                        
                                                        docentes.forEach((elementListDocentes, indexListDocentes) => {
                                                            if (elementListDocentes.run == e.docentes[d].run) {
                                                                docentes[indexListDocentes].disponibilidad[i][c] = "false"
                                                            }
                                                        })
                                                        
                                                        salas[s].nuevaDisponibilidad[i][c] = "false"
                                                        
                                                        flagSala = true
                                                    }
                                                }
                                            }
                                            
                                            if (flagSala || bloquesUsadosPorDiaFlag) {
                                                break
                                            }
                                        }
                                    }
                                    
                                    if (flagSala || bloquesUsadosPorDiaFlag) {
                                        flagSala = false
                                        break
                                    }
                                }
                            }
                            
                            if (horasAsignadas == parseInt(e.horasporsemana) / 2 && e.horasporsemana != "5") {
                                break
                            } else if (horasAsignadas == 2 && e.horasporsemana == "5") {
                                break
                            } else if (bloquesUsadosPorDiaFlag) {
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
        
        for (var se = 1; se < matrixSeccionSemestral.length; se++) {
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
                        for (var a = 0; a < asignaturas.length; a++) {
                            if (asignaturas[a].nombre == matrixSeccionSemestral[0][i][c].asignatura) {
                                if (asignaturas[a].cantidad_horas > 0) {
                                    matrixSeccionSemestral[se][i][c] = matrixSeccionSemestral[0][i][c]
                                    asignaturas[a].cantidad_horas--
                                }
                            } else if (matrixSeccionSemestral[0][i][c].disponible) {
                                break
                            }
                        }
                    }
                }
            }
            
            for (var di = 0; di < 7; di++) {
                if (dia == meses[mes]) {
                    dia = 1
                    mes++
                } else {
                    dia++
                }
            }
        }
        
        doUpdates()
        
        function doUpdates () {
            docentes.forEach((d, c) => {
                var sql = "UPDATE docente SET disponibilidad = '" + d.disponibilidad.toString() + "' WHERE run = '" + d.run + "'"
                
                cn.Update(sql, (res) => {
                    if (c + 1 == docentes.length) {
                        salas.forEach((s, e) => {
                            sql = "UPDATE sala SET disponibilidad = '" + s.nuevaDisponibilidad.toString() + "' WHERE codigo = '" + s.codigo + "'"
                            
                            cn.Update(sql, (res) => {
                                if (e + 1 == salas.length) {
                                    var anio = (new Date).getFullYear()
                                    
                                    sql = "INSERT INTO horario (horario, dia_comienzo, mes_comienzo, codigo_seccion, semestre, anio) VALUES('" + JSON.stringify(matrixSeccionSemestral) + "', '" + data.dia + "', '" + data.mes + "', '" + seccion[0].codigo + "', '" + seccion[0].semestre + "', '" + anio + "')"
                                    
                                    cn.Ask(sql, (res) => {
                                        if (res) {
                                            data.accion = "creó un nuevo Horario para la Sección " + seccion[0].codigo
                                            
                                            log.inRegistro(data, (res) => {
                                                (res) ? next("Horario planificado!") : next(false)
                                            })
                                        } else {
                                            next(false)
                                        }
                                    })
                                }
                            })
                        })
                    }
                })
            })
        }
    }
}

model.removeHorario = (data, next) => {
    var sql = "DELETE FROM horario WHERE id = '" + data.id + "'"
    
    cn.Remove(sql, (results) => {
        if (results) {
            data.accion = "eliminó un registro de horario con el ID " + data.id
            
            log.inRegistro(data, (res) => {
                if (res) {
                    next(res)
                } else {
                    next(false)
                }
            })
        } else {
            next(false)
        }
    })
}

module.exports = model