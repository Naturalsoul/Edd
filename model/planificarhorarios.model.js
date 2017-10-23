var cn = require("../data/cn")
var log = require("./registroactividades.model.js")

var model = {}

model.inHorarios = (data, next) => {
    var asignaturas = [] , seccion
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
    
    var matrixSeccion = []
    
    var sql = "SELECT * FROM seccion WHERE codigo = '" + data.seccion + "'"
    
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
                                    doHorario()
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
        for (var i = 0; i < 18; i++) {
            var columns = []
            
            for (var e = 0; e < 6; e++) {
                columns.push({
                    disponible: true,
                    asignatura: null,
                    docente: null
                })
            }
            
            matrixSeccion[i] = columns
        }
        
        asignaturas.forEach((e) => {
            var bloquesDia = 0
            
            if (typeof e.docentes != "undefined") {
                e.docentes.forEach((d, n) => {
                    var disponibilidadArr = d.disponibilidad.split(",")
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
                    
                    e.docentes[n].disponibilidad = disponibilidadMatrix
                })
            }
            
            var horasAsignadas = 0
            
            for (var c = 0; c < 6; c++) {
                for (var i = bloquesHorarios.indexOf(seccion[0].hora_inicio); i < bloquesHorarios.indexOf(seccion[0].hora_termino); i++) {
                    if (matrixSeccion[i][c].disponible) {
                        e.docentes.forEach((d) => {
                            if (d.disponibilidad[i][c] == "true") {
                                matrixSeccion[i][c].disponible = false
                                matrixSeccion[i][c].asignatura = e.nombre
                                matrixSeccion[i][c].docente = d.nombre
                                
                                horasAsignadas++
                                return
                            }
                        })
                        
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
        })
        
        console.log("\n\nfinal --------------")
        console.log(matrixSeccion)
        
        var html = ""
        
        for (var i = 0; i < 18; i++) {
            html += "<tr>"
            html += "<td>" + bloquesHorarios[i] + "</td>"
            
            for (var e = 0; e < 6; e++) {
                html += "<td>"
                
                if (!matrixSeccion[i][e].disponible) {
                    html += matrixSeccion[i][e].asignatura + "<br>" + matrixSeccion[i][e].docente
                }
                
                html += "</td>"
            }
            
            html += "</tr>"
        }
        
        next(html)
    }
}

module.exports = model