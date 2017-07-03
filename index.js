var express = require("express")
var mainRoutes = require("./routes/main")

var app = express()

app.set("view engine", "pug")
app.use(express.static("public"))

app.use("/", mainRoutes)

app.listen(5000, () => {
	console.log("App listening!")
})