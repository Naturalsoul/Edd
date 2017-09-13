var cn = require("../data/cn")
var log = require("./registroactividades.model.js")

var model = {}

model.getCarreras = (data, next) => {
	var sql = "SELECT codigo, nombre FROM carrera WHERE codigo_area = '" + data.area + "'"

	cn.Ask(sql, (results) => {
		if (results) {
			data.accion = "consultó por los registros de Carrera con el Código de Area " + data.area
			
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

model.inCarrera = (data, next) => {
	var sql = "INSERT INTO carrera (codigo, nombre, codigo_area) VALUE('" + data.codigo + "', '" + data.nombre + "', '" + data.area + "')"

	cn.Insert(sql, (results) => {
		if (results) {
			data.accion = "ingresó un registro con el Código " + data.codigo + " en Carrera"
			
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

model.updateCarrera = (data, next) => {
	var sql = "UPDATE carrera SET nombre = '" + data.nombre + "', codigo_area = '" + data.area + "' WHERE codigo = '" + data.codigo + "'"
	
	cn.Update(sql, (results) => {
		if (results) {
			data.accion = "actualizó el registro con el Código " + data.codigo + " en Carrera"
			
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

model.removeCarrera = (data, next) => {
	var sql = "DELETE FROM carrera WHERE codigo = '" + data.codigo + "'"
	
	cn.Remove(sql, (results) => {
		if (results) {
			data.accion = "eliminó el registro con Código " + data.codigo + " en Carrera"
			
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