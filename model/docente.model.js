var cn = require("../data/cn")
var log = require("./registroactividades.model.js")

var model = {}

model.getDocentes = (data, next) => {
    var sql = "SELECT d.run AS run, d.nombre AS nombre, d.prioridad AS prioridad, d.disponibilidad AS disponibilidad, a.codigo AS codigo_area, "
        sql += "a.nombre AS area, p.id AS id_perfilprofesional, p.perfil AS perfil FROM docente AS d INNER JOIN area AS a ON d.codigo_area = a.codigo "
        sql += "OR d.codigo_area = 'Transversal' INNER JOIN perfilprofesional AS p ON p.id = (SELECT id_perfilprofesional FROM docente_perfilprofesional WHERE run_docente = d.run)"
    
    cn.Ask(sql, (results) => {
        if (results) {
            
            data.accion = "consultó por todos los registros de Docentes con el Area " + data.codigo_area
            
            log.inRegistro(data, (res) => {
                if (res) {
                    next(results)
                } else {
                    next(false)
                }
            })
            
        } else {
            next(false)
        }
    })
}

model.inDocente = (data, next) => {
    var sql = "INSERT INTO docente (run, nombre, prioridad, disponibilidad, codigo_area) VALUES('" + data.run + "', '" + data.nombre + "', '" + data.prioridad + "', '" + data.disponibilidad + "', '" + data.codigo_area + "')"
        
    cn.Insert(sql, (res) => {
        if (res) {
            sql = "INSERT INTO docente_perfilprofesional (run_docente, id_perfilprofesional) VALUES('" + data.run + "', '" + data.id_perfilprofesional + "')"
            
            cn.Insert(sql, (res) => {
                if (res) {
                    data.accion = "registro un nuevo docente con el Run " + data.run + " y el ID de Perfil Profesional Nº " + data.id_perfilprofesional
                    
                    log.inRegistro(data, (res) => {
                        (res) ? next(res) : next(false)
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

model.updateDocente = (data, next) => {
    var sql = "UPDATE docente_perfilprofesional SET run_docente = '" + data.run + "', id_perfilprofesional = '" + data.id_perfilprofesional + "' WHERE run_docente = '" + data.run + "'"
    
    cn.Update(sql, (res) => {
        if (res) {
            sql = "UPDATE docente SET run = '" + data.run + "', nombre = '" + data.nombre + "', prioridad = '" + data.prioridad + "', disponibilidad = '" + data.disponibilidad + "', codigo_area = '" + data.codigo_area + "' WHERE run = '" + data.run + "'"
            
            cn.Update(sql, (res) => {
              if (res) {
                  data.accion = "actualizó los datos del Docente con el Run " + data.run
                  
                  log.inRegistro(data, (res) => {
                      (res) ? next(res) : next(false)
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

model.removeDocente = (data, next) => {
    var sql = "DELETE FROM docente_perfilprofesional WHERE run_docente = '" + data.run + "'"
    
    cn.Remove(sql, (res) => {
        if (res) {
            sql = "DELETE FROM docente WHERE run = '" + data.run + "'"
            
            cn.Remove(sql, (res) => {
                if (res) {
                    data.accion = "eliminó el registro de Docente con el Run " + data.run
                    
                    log.inRegistro(data, (res) => {
                        (res) ? next(res) : next(false)
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

module.exports = model