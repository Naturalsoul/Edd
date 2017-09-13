var cn = require("../data/cn")
var log = require("./registroactividades.model.js")

var model = {}

model.getAreas = (data, next) => {
	var sql = "SELECT codigo, nombre FROM area WHERE codigo = '" + data.codigo + "'"

	cn.Ask(sql, (results) => {
		if(results) {
			data.accion = "consultó por todos los registros con el ID Nº " + data.codigo + " de Area"
			
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

model.getAll = (data, next) => {
	var sql = "SELECT codigo, nombre FROM area"
	
	cn.Ask(sql, (results) => {
		if (results) {
			data.accion = "consultó por todos los registros de Area"
			
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

model.inArea = (data, next) => {
	var sql = "INSERT INTO area (codigo, nombre) VALUE('" + data.codigo + "', '" + data.nombre + "')"
	
	cn.Insert(sql, (results) => {
		if (results) {
			data.accion = "ingresó un nuevo registro con el Código " + data.codigo + " en Area"
			
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

model.updateArea = (data, next) => {
	var sql = "UPDATE area SET nombre = '" + data.nombre + "' WHERE codigo = '" + data.codigo + "'"
	
	cn.Update(sql, (results) => {
		if (results) {
			data.accion = "actualizó el registro con el Código " + data.codigo + " en Area"
			
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

model.removeArea = (data, next) => {
	var sql = "DELETE FROM area WHERE codigo = '" + data.codigo + "'"
	
	cn.Remove(sql, (results) => {
		if (results) {
			data.accion = "eliminó el registro con el Código " + data.codigo + " en Area"
			
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