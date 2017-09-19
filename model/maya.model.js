var cn = require("../data/cn")
var log = require("./registroactividades.model.js")

var model = {}

model.getMayas = (data, next) => {
    var sql = "SELECT m.codigo AS codigo, m.cantidad_asignaturas AS cantidad_asignaturas, m.codigo_carrera AS codigo_carrera, c.nombre AS nombre_carrera FROM maya AS m "
        sql += "LEFT JOIN carrera AS c ON m.codigo_carrera = c.codigo"
        
    cn.Ask(sql, (results) => {
        if (results) {
            data.accion = "consultó por todos los registros de Maya"
            
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

model.inMaya = (data, next) => {
    var sql = "INSERT INTO maya (codigo, cantidad_asignaturas, codigo_carrera) VALUES('" + data.codigo + "', '" + data.cantidad_asignaturas + "', '" + data.codigo_carrera + "')"
    
    cn.Insert(sql, (res) => {
        if (res) {
            data.accion = "ingresó un nuevo registro con el Código " + data.codigo + " en Maya"
            
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

model.updateMaya = (data, next) => {
    var sql = "UPDATE maya SET codigo = '" + data.codigo + "', cantidad_asignaturas = '" + data.cantidad_asignaturas + "', codigo_carrera = '" + data.codigo_carrera + "' WHERE codigo = '" + data.codigo + "'"
    
    cn.Update(sql, (res) => {
        if (res) {
            data.accion = "actualizó el registro con Código " + data.codigo + " en Maya"
            
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

model.removeMaya = (data, next) => {
    var sql = "DELETE FROM maya WHERE codigo = '" + data.codigo + "'"
    
    cn.Remove(sql, (res) => {
        if (res) {
            data.accion = "eliminó el registro con el Código " + data.codigo + " en Maya"
            
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