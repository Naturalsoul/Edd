var cn = require("../data/cn")
var log = require("./registroactividades.model.js")

var model = {}

model.getFeriados = (data, next) => {
    var sql = "SELECT * FROM feriado"
    
    cn.Ask(sql, (res) => {
        if (res) {
            data.accion = "consultó por todos los registros de Feriados"
            
            log.inRegistro(data, (results) => {
                (results) ? next(res) : next(false)
            })
        } else {
            next(false)
        }
    })
}

model.inFeriado = (data, next) => {
    var sql = "INSERT INTO feriado (dia, mes) VALUES('" + data.dia + "', '" + data.mes + "')"
    
    cn.Insert(sql, (res) => {
        if (res) {
            data.accion = "ingresó un nuevo registro de Feriado con la fecha " + data.dia + "/" + data.mes
            
            log.inRegistro(data, (res) => {
                (res) ? next(res) : next(false)
            })
        } else {
            next(false)
        }
    })
}

model.updateFeriado = (data, next) => {
    var sql = "UPDATE feriado SET dia = '" + data.dia + "', mes = '" + data.mes + "' WHERE id = '" + data.id + "'"
    
    cn.Update(sql, (res) => {
        if (res) {
            data.accion = "actualizó un nuevo registro de Feriado con la fecha " + data.dia + "/" + data.mes
            
            log.inRegistro(data, (res) => {
                (res) ? next(res) : next(false)
            })
        } else {
            next(false)
        }
    })
}

model.removeFeriado = (data, next) => {
    var sql = "DELETE FROM feriado WHERE id = '" + data.id + "'"
    
    cn.Remove(sql, (res) => {
        if (res) {
            data.accion = "eliminó el registro de Feriado con el ID " + data.id
            
            log.inRegistro(data, (res) => {
                (res) ? next(res) : next(false)
            })
        } else {
            next(false)
        }
    })
}

module.exports = model