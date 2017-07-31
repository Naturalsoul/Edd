var cn = require("../data/cn")

var model = {}

model.checkUser = (email, pass, next) => {
	var sql = "SELECT correo, codigo_area FROM usuario WHERE correo = '" + email + "' AND pass = '" + pass + "'"

	var results = cn.Ask(sql, (results) => {
		if (results) {
			next(results)
		} else {
			next(results)
		}
	})
}

module.exports = model