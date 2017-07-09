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

module.exports = model