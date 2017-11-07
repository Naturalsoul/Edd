var cn = require("../data/cn")
var log = require("./registroactividades.model.js")

var model = {}

model.getSalas = (data, next) => {
    var sql = "SELECT * FROM sala"
    
    cn.Ask(sql, (res) => {
        if (res) {
            data.accion = "consultó por todos los registros de Sala"
            
            log.inRegistro(data, (results) => {
                if (results) {
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

model.inSala = (data, next) => {
    var sql = "INSERT INTO sala (codigo, capacidad_alumnos, equipamiento, disponibilidad) VALUES('" + data.codigo + "', '" + data.capacidad_alumnos + "', '" + data.equipamiento + "', '"
        sql += data.disponibilidad + "')"
        
    cn.Insert(sql, (res) => {
        if (res) {
            data.accion = "ingresó un nuevo registro de Sala con el código " + data.codigo
            
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

model.updateSala = (data, next) => {
    var sql = "UPDATE sala SET capacidad_alumnos = '" + data.capacidad_alumnos + "', equipamiento = '" + data.equipamiento + "', disponibilidad = '" + data.disponibilidad + "' WHERE codigo = '" + data.codigo + "'"
    
    cn.Update(sql, (res) => {
        if (res) {
            data.accion = "actualizó el registro de Sala con el código " + data.codigo
            
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

model.removeSala = (data, next) => {
    var sql = "DELETE FROM sala WHERE codigo = '" + data.codigo + "'"
    
    cn.Remove(sql, (res) => {
        if (res) {
            data.accion = "eliminó el registro de Sala con el código " + data.codigo
            
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