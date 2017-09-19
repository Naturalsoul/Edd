var cn = require("../data/cn")
var time = require("./time")

var model = {}

model.getRegistros = (data, next) => {
    var sql = "SELECT * FROM registro"
    
    cn.Ask(sql, (res) => {
        if (res) {
            data.accion = "consultó por todos los registros en el Log"
            
            model.inRegistro(data, (results) => {
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

model.inRegistro = (data, next) => {
    var sql = "INSERT INTO registro (fecha_hora, accion, correo_usuario) VALUE(NOW(), '" + data.accion + "', '" + data.correo_usuario + "')"
    
    cn.Insert(sql, (res) => {
        if (res) {
            next(res)
        } else {
            next(false)
        }
    })
}

module.exports = model