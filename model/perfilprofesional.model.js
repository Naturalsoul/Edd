var cn = require("../data/cn")

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

module.exports = model