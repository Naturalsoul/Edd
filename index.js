var express = require("express")
var expressSession = require("express-session")
var bodyParser = require("body-parser")
var mainRoutes = require("./routes/main")

var app = express()

app.set("view engine", "pug")
app.use(express.static("public"))
app.use(expressSession({secret: "123456789QWERTY", resave: false, saveUninitialized: true}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/", mainRoutes)

app.listen(process.env.PORT, () => {
	console.log("App listening!")
})