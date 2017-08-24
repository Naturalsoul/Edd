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

model.updateSala = (data, next) => {
    var sql = "UPDATE FROM sala SET codigo = '" + data.codigo + "', capacidad_alumnos = '" + data.capacidad_alumnos + "', equipamiento_tecnologico = '"
        sql += data.equipamiento_tecnologico + "', disponibilidad = '" + data.disponibilidad + "' WHERE codigo = '" + data.codigo + "'"
        
    cn.Update(sql, (res) => {
        if (res) {
            next(res)
        } else {
            next(false)
        }
    })
}

model.removeSala = (codigo, next) => {
    var sql = "DELETE FROM sala WHERE codigo = '" + codigo + "'"
    
    cn.Remove(sql, (res) => {
        if (res) {
            next(res)
        } else {
            next(false)
        }
    })
}

module.exports = model