var cn = require("../data/cn")

var model = {}

model.getSalas = (next) => {
    var sql = "SELECT * FROM sala"
    
    cn.Ask(sql, (results) => {
        if (results) {
            next(results)
        } else {
            next(false)
        }
    })
}

model.inSala = (data, next) => {
    var sql = "INSERT INTO sala (codigo, capacidad_alumnos, equipamiento_tecnologico, disponibilidad) VALUES('" + data.codigo
        sql += "', '" + data.capacidad_alumnos + "', '" + data.equipamiento_tecnologico + "', '" + data.disponibilidad + "')"
        
    cn.Insert(sql, (results) => {
        if (results) {
            next(results)
        } else {
            next(false)
        }
    })
}

module.exports = model