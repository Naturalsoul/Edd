var cn = require("../data/cn")

var model = {}

model.getAreas = (codigo, next) => {
	var sql = "SELECT codigo, nombre FROM area WHERE codigo = '" + codigo + "'"

	cn.Ask(sql, (results) => {
		if(results) {
			next(results)
		} else {
			next(false)
		}
	})
}

model.getAll = (next) => {
	var sql = "SELECT codigo, nombre FROM area"
	
	cn.Ask(sql, (results) => {
		if (results) {
			next(results)
		} else {
			next(false)
		}
	})
}

model.inArea = (codigo, nombre, next) => {
	var sql = "INSERT INTO area (codigo, nombre) VALUE('" + codigo + "', '" + nombre + "')"
	
	cn.Insert(sql, (results) => {
		next(results)
	})
}

model.updateArea = (codigo, nombre, next) => {
	var sql = "UPDATE area SET nombre = '" + nombre + "' WHERE codigo = '" + codigo + "'"
	
	cn.Update(sql, (results) => {
		if (results) {
			next(results)
		} else {
			next(false)
		}
	})
}

model.removeArea = (codigo, next) => {
	var sql = "DELETE FROM area WHERE codigo = '" + codigo + "'"
	
	cn.Remove(sql, (results) => {
		if (results) {
			next(results)
		} else {
			next(false)
		}
	})
}

module.exports = model