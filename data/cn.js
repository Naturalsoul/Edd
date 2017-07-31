var mysql = require("mysql")

var connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "Edd",
	port: "3306"
})

var cn = {}

cn.Ask = (sql, next) => {
	connection.query(sql, (err, results, fields) => {
		if (err) {
			console.log(err)
			next(false)
		} else {
			next(results)
		}
	})
}

cn.Insert = (sql, next) => {
	connection.query(sql, (err, results, fields) => {
		if (err) {
			console.log(err)
			next(false)
		} else {
			next(results)
		}
	})
}

module.exports = cn