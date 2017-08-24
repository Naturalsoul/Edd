var cn = require("../data/cn")

var model = {}

model.getCursos = (next) => {
    var sql = "SELECT * FROM curso"
    
    cn.Ask(sql, (res) => {
        if (res) {
            next(res)
        } else {
            next(false)
        }
    })
}

model.inCurso = (data, next) => {
    var sql = "INSERT INTO curso (codigo, tamano) VALUE('" + data.codigo + "', '" + data.tamano + "')"
    
    cn.Insert(sql, (res) => {
        if (res) {
            next(res)
        } else {
            next(false)
        }
    })
}

model.updateCurso = (data, next) => {
    var sql = "UPDATE FROM curso SET codigo = '" + data.codigo + "', tamano = '" + data.tamano + "' WHERE codigo = '" + data.codigo + "'"
    
    cn.Update(sql, (res) => {
        if (res) {
            next(res)
        } else {
            next(false)
        }
    })
}

model.removeCurso = (codigo, next) => {
    var sql = "DELETE FROM curso WHERE codigo = '" + codigo + "'"
    
    cn.Remove(sql, (res) => {
        if (res) {
            next(res)
        } else {
            next(false)
        }
    })
}

module.exports = model