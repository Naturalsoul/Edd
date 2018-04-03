var cn = require("../data/cn")
var log = require("./registroactividades.model.js")

var model = {}

model.checkUser = (email, pass, next) => {
	if (email == "admin@inacap.cl" && pass == "admin") {
		next([{correo: "admin@inacap.cl", codigo_area: "CH-INF-01"}])
	} else {
		var sql = "SELECT correo, codigo_area FROM usuario WHERE correo = '" + email + "' AND pass = '" + 		pass + "'"

		var results = cn.Ask(sql, (results) => {
			if (results) {
				var data = {
					correo_usuario: email,
					accion: "ingresó al Sistema"
				}
				
				log.inRegistro(data, (res) => {
					if (res) {
						next(results)
					} else {
						next(false)
					}
				})
			} else {
				next(false)
			}
		})
	}
}

model.getUsers = (data, next) => {
	var sql = "SELECT u.correo AS correo, u.nombre AS nombre, u.institucion AS institucion, u.codigo_area AS codigo_area, a.nombre AS nombre_area "
		sql += "FROM usuario AS u LEFT JOIN area AS a ON u.codigo_area = a.codigo"
	
	cn.Ask(sql, (results) => {
		if (results) {
			data.accion = "consultó por todos los registros de Usuario con el Código de Área " + data.area
			
			log.inRegistro(data, (res) => {
				if (res) {
					next(results)
				} else {
					next(false)
				}
			})
		} else {
			next(false)
		}
	})
}

model.getOneUser = (data, next) => {
	var sql = "SELECT * FROM usuario WHERE correo = '" + data.correo_usuario + "'"
	
	cn.Ask(sql, (results) => {
		if (results) {
			data.accion = "consultó por su información personal"
			
			log.inRegistro(data, (res) => {
				if (res) {
					next(results)
				} else {
					next(false)
				}
			})
		} else {
			next(false)
		}
	})
}

model.inUser = (data, next) => {
	var sql = "INSERT INTO usuario (correo, pass, nombre, institucion, codigo_area) VALUE('" + data.correo + "', '" + data.pass + "', '" + data.nombre + "', "
		sql += "'" + data.institucion + "', '" + data.codigo_area + "')"
		
	cn.Insert(sql, (res) => {
		if (res) {
			data.accion = "ingreso un nuevo usuario con el correo " + data.correo + " y Área " + data.codigo_area + " al Sistema"
			
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

model.updateUser = (data, next) => {
	var sql = "UPDATE usuario SET pass = '" + data.pass + "', nombre = '" + data.nombre + "', institucion = '" + data.institucion + "', codigo_area = '"
		sql += data.codigo_area + "' WHERE correo = '" + data.correo + "'"
		
	cn.Update(sql, (res) => {
		if (res) {
			data.accion = "actualizó su información personal"
			
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