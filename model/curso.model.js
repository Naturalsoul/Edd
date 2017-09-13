var cn = require("../data/cn")
var log = require("./registroactividades.model.js")

var model = {}

model.getCursos = (data, next) => {
    var sql = "SELECT * FROM curso"
    
    cn.Ask(sql, (res) => {
        if (res) {
            data.accion = "consultó por todos los registros de Curso"
            
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
    var sql = "UPDATE FROM curso SET codigo = '" + data.codigo + "', tamano = '" + data.tamano + "' WHERE codigo = '" + data.codigo + "'"
    
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