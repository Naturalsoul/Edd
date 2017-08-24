var express = require("express")
var multer = require("multer")
var router = express.Router()


var UserModel = require("../model/user.model.js")
var CarreraModel = require("../model/carrera.model.js")
var AreaModel = require("../model/area.model.js")
var PerfilProfesionalModel = require("../model/perfilprofesional.model.js")
var DocenteModel = require("../model/docente.model.js")
var SalaModel = require("../model/sala.model.js")

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

router.get("/areas", (req, res) => {
	res.render("areas")
})

router.get("/getareas", (req, res) => {
	AreaModel.getAreas(req.session.area, (results) => {
		res.status(200).send(results)
	})
})

router.get("/getallareas", (req, res) => {
	AreaModel.getAll((results) => {
		res.status(200).send(results)
	})
})

router.post("/inarea", (req, res) => {
	AreaModel.inArea(req.body.codigoarea, req.body.nombrearea, (results) => {
		if (results) {
			res.status(200).send("Área Registrada!")
		} else {
			res.status(403).send("Error al ingresar el Área.")
		}
	})
})

router.get("/perfilprofesional", (req, res) => {
	res.render("perfilesprofesionales")
})

router.get("/allperfiles", (req, res) => {
	PerfilProfesionalModel.getPerfiles((results) => {
		res.status(200).send(results)
	})
})

router.post("/inperfiles", (req, res) => {
	PerfilProfesionalModel.inPerfil(req.body.perfilprofesional, (results) => {
		if (results) {
			res.status(200).send("Perfil profesional Registrado!")
		} else {
			res.status(403).send("Error al ingresar el Perfil profesional.")
		}
	})
})

router.get("/docentes", (req, res) => {
	res.render("docentes")
})

router.get("/alldocentes", (req, res) => {
	DocenteModel.getDocentes((results) => {
		res.status(200).send(results)
	})
})

router.post("/indocente", multer({ dest: "./model/disponibilidad/docentes"}).single("disponibilidaddocente"), (req, res) => {
	console.dir(req.body)
	DocenteModel.inDocente({
		run: req.body.rutdocente,
		nombre: req.body.nombredocente,
		prioridad: req.body.prioridaddocente,
		disponibilidad: req.file,
		codigo_area: req.body.areadocente,
		id_perfilprofesional: req.body.perfilprofesionaldocente
	}, (results) => {
		if (results) {
			res.status(200).send("¡Docente registrado correctamente!")
		} else {
			res.status(403).send("Error al ingresar el docente. Verifique que los campos sean correctos.")
		}
	})
})

router.get("/salas", (req, res) => {
	res.render("salas")
})

router.get("/allsalas", (req, res) => {
	SalaModel.getSalas((results) => {
		res.status(200).send(results)
	})
})

router.post("/insala", multer({ dest: "./model/disponibilidad/salas/" }).single("disponibilidadsala"), (req, res) => {
	SalaModel.inSala({
		codigo: req.body.codigo,
		capacidad_alumnos: req.body.capacidadalumnos,
		equipamiento_tecnologico: req.body.capacidadalumnos,
		disponibilidad: req.file.disponibilidadsala
	}, (results) => {
		if (results) {
			res.send(200).send("¡Sala registrada correctamente!")
		} else {
			res.status(403).send("Error al ingresar la sala. Verifique que los campos sean correctos.")
		}
	})
})

router.get("/planificarhorarios", (req, res) => {
	res.render("planificarhorarios")
})

module.exports = router