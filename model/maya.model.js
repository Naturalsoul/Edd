var cn = require("../data/cn")

var model = {}

model.getMayas = (next) => {
    var sql = "SELECT m.codigo AS codigo, m.cantidad_asignaturas AS cantidad_asignaturas, c.nombre AS nombre_carrera FROM maya AS m "
        sql += "LEFT JOIN carrera AS c ON m.codigo_carrera = c.codigo"
        
    cn.Ask(sql, (res) => {
        if (res) {
            next(res)
        } else {
            next(false)
        }
    })
}

model.inMaya = (data, next) => {
    var sql = "INSERT INTO maya (codigo, cantidad_asignaturas, codigo_carrera) VALUES('" + data.codigo + "', '" + data.cantidad_asignaturas + "', '" + data.codigo_carrera + "')"
    
    cn.Insert(sql, (res) => {
        if (res) {
            next(res)
        } else {
            next(false)
        }
    })
}

model.updateMaya = (data, next) => {
    var sql = "UPDATE FROM maya SET codigo = '" + data.codigo + "', cantidad_asignaturas = '" + data.cantidad_asignaturas + "', codigo_carrera = '" + data.codigo_carrera + "', WHERE codigo = '" + data.codigo + "'"
    
    cn.Update(sql, (res) => {
        if (res) {
            next(res)
        } else {
            next(false)
        }
    })
}

model.removeMaya = (codigo, next) => {
    var sql = "DELETE FROM maya WHERE codigo = '" + codigo + "'"
    
    cn.Remove(sql, (res) => {
        if (res) {
            next(res)
        } else {
            next(false)
        }
    })
}

module.exports = model