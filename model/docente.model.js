var cn = require("../data/cn")

var model = {}

model.getDocentes = (next) => {
    var sql = "SELECT d.rut AS rut, d.nombre AS nombre, d.prioridad AS prioridad, d.disponibilidad AS disponibilidad, "
        sql += "a.nombre AS area, p.perfil AS perfil FROM docente AS d INNER JOIN area AS a ON d.codigo_area = a.codigo "
        sql += "INNER JOIN perfilprofesional AS p ON p.id = (SELECT id_perfilprofesional FROM docente_perfilprofesional WHERE rut_docente = d.rut)"
    
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
    var sql = "INSERT INTO docente (rut, nombre, prioridad, disponibilidad, codigo_area) VALUES('" + data.rut + "', '" + data.nombre + "', '" + data.prioridad + "', LOAD_FILE('this is dummy'), '" + data.codigo_area + "')"
        
    cn.Insert(sql, (res) => {
        if (res) {
            sql = "INSERT INTO docente_perfilprofesional (rut_docente, id_perfilprofesional) VALUES('" + data.rut + "', '" + data.id_perfilprofesional + "')"
            
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

module.exports = model