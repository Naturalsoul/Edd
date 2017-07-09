var express = require("express")
var router = express.Router()
var UserModel = require("../model/user.model.js")
var CarreraModel = require("../model/carrera.model.js")
var AreaModel = require("../model/area.model.js")

router.get("/", (req, res) => {
	res.render("index")
})

router.get("/login", (req, res) => {
	res.render("login")
})

router.post("/reqlogin", (req, res) => {
	var results = UserModel.checkUser(req.body.email, req.body.pass, (results) => {
		if (results) {
			req.session.email = results[0].correo
			req.session.area = results[0].codigo_area
			res.status(200).send({connected: true})
		} else {
			res.status(200).send({connected: false})
		}
	})
})

router.get("/logout", (req, res) => {
	req.session.email = null
	req.session.area = null
	res.render("index")
})

router.get("/sessions", (req, res) => {
	if (typeof req.session != "undefined") {
		if (req.session.email) {
			res.status(200).send({connected: true})
		} else {
			res.status(200).send({connected: false})
		}
	} else {
		res.status(200).send({connected: false})
	}
})

router.get("/carreras", (req, res) => {
	res.render("carreras")
})

router.get("/getcarreras", (req, res) => {
	CarreraModel.getCarreras(req.session.area, (results) => {
		res.status(200).send(results)
	})
})

router.post("/incarrera", (req, res) => {
	var results = CarreraModel.inCarrera(req.body.codigocarrera, req.body.nombrecarrera, req.body.area, (results) => {
		if (results) {
			res.status(200).send("Carrera Registrada!")
		} else {
			res.status(403).send("Error al ingresar la Carrera.")
		}
	})
})

router.get("/getareas", (req, res) => {
	AreaModel.getAreas(req.session.area, (results) => {
		res.status(200).send(results)
	})
})

router.get("/planificarhorarios", (req, res) => {
	res.render("planificarhorarios")
})

module.exports = router