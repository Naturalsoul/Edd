var cn = require("../data/cn")
var log = require("./registroactividades.model.js")

var model = {}

model.getSecciones = (data, next) => {
    var sql = "SELECT s.codigo AS codigo, s.nombre AS nombre, s.semestre AS semestre, s.hora_inicio AS hora_inicio, s.hora_termino AS hora_termino, "
    sql += "s.codigo_curso AS codigo_curso, c.nombre AS carrera, s.codigo_maya AS codigo_maya FROM seccion AS s LEFT JOIN carrera AS c ON s.codigo_carrera = c.codigo"
    
    cn.Ask(sql, (res) => {
        if (res) {
            data.accion = "consultó por todos los registros de Sección"
            
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

model.inSeccion = (data, next) => {
    var sql = "INSERT INTO seccion (codigo, nombre, semestre, hora_inicio, hora_termino, codigo_curso, codigo_carrera, codigo_maya) "
    sql += "VALUES('" + data.codigo + "', '" + data.nombre + "', '" + data.semestre + "', '" + data.hora_inicio + "', '" + data.hora_termino
    sql += "', '" + data.codigo_curso + "', '" + data.codigo_carrera + "', '" + data.codigo_maya + "')"
    
    cn.Insert(sql, (res) => {
        if (res) {
            data.accion = "ingresó un nuevo registro con el Código " + data.codigo + " en Sección"
            
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

model.updateSeccion = (data, next) => {
    var sql = "UPDATE seccion SET nombre = '" + data.nombre + "', semestre = '" + data.semestre + "', hora_inicio = '" + data.hora_inicio
    sql += "', hora_termino = '" + data.hora_termino + "', codigo_curso = '" + data.codigo_curso + "', codigo_carrera = '" + data.codigo_carrera
    sql += "', codigo_maya = '" + data.codigo_maya + "' WHERE codigo = '" + data.codigo + "'"
    
    cn.Update(sql, (res) => {
        if (res) {
            data.accion = "actualizó el registro con el Código " + data.codigo + " en Sección"
            
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

model.removeSeccion = (data, next) => {
    var sql = "DELETE FROM seccion WHERE codigo = '" + data.codigo + "'"
    
    cn.Remove(sql, (res) => {
        if (res) {
            data.accion = "eliminó el registro con el Código " + data.codigo + " en Sección"
            
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