var cn = require("../data/cn")
var log = require("./registroactividades.model.js")

var model = {}

model.getCursos = (data, next) => {
    var sql = "SELECT c.codigo AS codigo, c.tamano AS tamano, s.nombre AS nombre_seccion FROM curso AS c "
    sql += "LEFT JOIN seccion AS s ON s.codigo_curso = c.codigo"
    
    cn.Ask(sql, (results) => {
        if (results) {
            data.accion = "consultó por todos los registros de Curso"
            
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

model.inCurso = (data, next) => {
    var sql = "INSERT INTO curso (codigo, tamano) VALUE('" + data.codigo + "', '" + data.tamano + "')"
    
    cn.Insert(sql, (res) => {
        if (res) {
            data.accion = "ingresó un registro con el Código " + data.codigo + " en Curso"
            
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

model.updateCurso = (data, next) => {
    var sql = "UPDATE curso SET tamano = '" + data.tamano + "' WHERE codigo = '" + data.codigo + "'"
    
    cn.Update(sql, (res) => {
        if (res) {
            data.accion = "actualizó el registro con el Código " + data.codigo + " en Curso"
            
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

model.removeCurso = (data, next) => {
    var sql = "DELETE FROM curso WHERE codigo = '" + data.codigo + "'"
    
    cn.Remove(sql, (res) => {
        if (res) {
            data.accion = "eliminó el registro con el Código " + data.codigo + " en Curso"
            
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