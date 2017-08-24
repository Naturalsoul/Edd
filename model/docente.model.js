var cn = require("../data/cn")

var model = {}

model.getDocentes = (next) => {
    var sql = "SELECT d.run AS run, d.nombre AS nombre, d.prioridad AS prioridad, d.disponibilidad AS disponibilidad, "
        sql += "a.nombre AS area, p.perfil AS perfil FROM docente AS d INNER JOIN area AS a ON d.codigo_area = a.codigo "
        sql += "INNER JOIN perfilprofesional AS p ON p.id = (SELECT id_perfilprofesional FROM docente_perfilprofesional WHERE run_docente = d.run)"
    
    cn.Ask(sql, (results) => {
        if (results) {
            
            next(results)
            
        } else {
            next(false)
        }
    })
}

model.inDocente = (data, next) => {
    console.dir(data)
    var sql = "INSERT INTO docente (run, nombre, prioridad, disponibilidad, codigo_area) VALUES('" + data.run + "', '" + data.nombre + "', '" + data.prioridad + "', LOAD_FILE('this is dummy'), '" + data.codigo_area + "')"
        
    cn.Insert(sql, (res) => {
        if (res) {
            sql = "INSERT INTO docente_perfilprofesional (run_docente, id_perfilprofesional) VALUES('" + data.run + "', '" + data.id_perfilprofesional + "')"
            
            cn.Insert(sql, (res) => {
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

model.updateDocente = (data, next) => {
    var sql = "UPDATE FROM docente SET run = '" + data.run + "', nombre = '" + data.nombre + "', prioridad = '" + data.prioridad + "', disponibilidad = '" + data.disponibilidad + "', codigo_area = '" + data.codigo_area + "', WHERE run = '" + data.run + "'"
    
    cn.Update(sql, (res) => {
        if (res) {
            sql = "UPDATE FROM docente_perfilprofesional SET run_docente = '" + data.run + "', id_perfilprofesional = '" + data.id_perfilprofesional + "' WHERE run_docente = '" + data.run + "'"
            
            cn.Update(sql, (res) => {
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