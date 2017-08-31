var cn = require("../data/cn")
var log = require("./registroactividades.model.js")

var model = {}

model.getPerfiles = (next) => {
    var sql = "SELECT * FROM perfilprofesional"
    
    cn.Ask(sql, (results) => {
        if (results) {
            next(results)
        } else {
            next(false)
        }
    })
}

model.inPerfil = (perfil, next) => {
    var sql = "INSERT INTO perfilprofesional (perfil) VALUE('" + perfil + "')"
    
    cn.Insert(sql, (results) => {
        if (results) {
            next(results)
        } else {
            next(false)
        }
    })
}

model.updatePerfil = (data, next) => {
    var sql = "UPDATE perfilprofesional SET perfil = '" + data.perfil + "' WHERE id = '" + data.id + "'"
    
    cn.Update(sql, (res) => {
        if (res) {
            data.accion = "actualizó el registro Nº " + data.id + " de Perfiles Profesionales"
            
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

model.removePerfil = (data, next) => {
    var sql = "DELETE FROM perfilprofesional WHERE id = '" + data.id + "'"
    
    cn.Remove(sql, (res) => {
        if (res) {
            var accion = "eliminó el registro Nº " + data.id + " de Perfiles Profesionales"
            
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