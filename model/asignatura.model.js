var cn = require("../data/cn")
var log = require("./registroactividades.model.js")

var model = {}

model.getAsignaturas = (data, next) => {
    var sql = "SELECT * FROM asignatura"
    
    cn.Ask(sql, (results) => {
        if (results) {
            data.accion = "consultó por todos los registros de Asignatura"
            
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

model.inAsignatura = (data, next) => {
    var sql = "INSERT INTO asignatura (codigo, nombre, especialidad, cantidad_horas, equipamiento, semestre, codigo_maya) "
    sql += "VALUES('" + data.codigo + "', '" + data.nombre + "', '" + data.especialidad + "', '" + data.cantidad_horas + "', '" + data.equipamiento
    sql += "', '" +  data.semestre + "', '" + data.codigo_maya + "')"
    
    cn.Insert(sql, (res) => {
        if (res) {
            data.accion = "ingresó un nuevo registro con el Código " + data.codigo + " en Asignatura"
            
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

model.updateAsignatura = (data, next) => {
    var sql = "UPDATE asignatura SET nombre = '" + data.nombre + "', especialidad = '" + data.especialidad
    sql += "', cantidad_horas = '" + data.cantidad_horas + "', equipamiento = '" + data.equipamiento + "', semestre = '" + data.semestre
    sql += "', codigo_maya = '" + data.codigo_maya + "' WHERE codigo = '" + data.codigo + "'"
    
    cn.Update(sql, (res) => {
        if (res) {
            data.accion = "actualizó el registro con el Código " + data.codigo + " en Asignatura"
            
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

model.removeAsignatura = (data, next) => {
    var sql = "DELETE FROM asignatura WHERE codigo = '" + data.codigo + "'"
    
    cn.Remove(sql, (res) => {
        if (res) {
            data.accion = "eliminó el registro con el Código " + data.codigo + " en Asignatura"
            
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