var cn = require("../data/cn")

var model = {}

model.getCarreras = (area, next) => {
	var sql = "SELECT codigo, nombre FROM carrera WHERE codigo_area = '" + area + "'"

	var results = cn.Ask(sql, (results) => {
		if (results) {
			next(results)
		} else {
			next(false)
		}
	})
}

model.inCarrera = (codigo, nombre, area, next) => {
	var sql = "INSERT INTO carrera (codigo, nombre, codigo_area) VALUE('" + codigo + "', '" + nombre + "', '" + area + "')"

	var results = cn.Insert(sql, (results) => {
		next(results)
	})
}

module.exports = model