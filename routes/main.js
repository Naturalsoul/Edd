var express = require("express")
var multer = require("multer")
var router = express.Router()

var UserModel = require("../model/user.model.js")
var AreaModel = require("../model/area.model.js")
var AsignaturaModel = require("../model/asignatura.model.js")
var CarreraModel = require("../model/carrera.model.js")
var CursoModel = require("../model/curso.model.js")
var DocenteModel = require("../model/docente.model.js")
var MayaModel = require("../model/maya.model.js")
var PerfilProfesionalModel = require("../model/perfilprofesional.model.js")
var LogModel = require("../model/registroactividades.model.js")
var SeccionModel = require("../model/seccion.model.js")

// Multer Settings -----------------------------

var upload = multer({ dest: "./uploads/" })

// -----------------------------------------------

router.get("/", (req, res) => {
	res.render("index")
})

router.get("/login", (req, res) => {
	res.render("login")
})

router.post("/reqlogin", (req, res) => {
	UserModel.checkUser(req.body.email, req.body.pass, (results) => {
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
	delete req.session.email
	delete req.session.area
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
	if (typeof req.session.email != "undefined") {
		res.render("carreras")
	} else {
		res.render("index")
	}
})

router.get("/getcarreras", (req, res) => {
	if (typeof req.session.email != "undefined") {
		var data = {
			correo_usuario: req.session.email,
			area: req.session.area
		}
		
		CarreraModel.getCarreras(data, (results) => {
			res.status(200).send(results)
		})
	} else {
		res.render("index")
	}
	
})

router.post("/incarrera", (req, res) => {
	if (typeof req.session.email != "undefined") {
		var data = {
			correo_usuario: req.session.email,
			codigo: req.body.codigocarrera,
			nombre: req.body.nombrecarrera,
			area: req.body.areacarrera
		}
		
		CarreraModel.inCarrera(data, (results) => {
			if (results) {
				res.status(200).send("Carrera Registrada!")
			} else {
				res.status(403).send("Error al ingresar la Carrera.")
			}
		})
	} else {
		res.render("index")
	}
})

router.put("/upcarrera", (req, res) => {
	if (typeof req.session.email != "undefined") {
		var data = {
			correo_usuario: req.session.email,
			codigo: req.body.codigocarrera,
			nombre: req.body.nombrecarrera,
			area: req.body.areacarrera
		}
		
		CarreraModel.updateCarrera(data, (results) => {
			if (results) {
				res.status(200).send("Carrera Actualizada!")
			} else {
				res.status(403).send("Error al actualizar la Carrera.")
			}
		})
	} else {
		res.render("index")
	}
})

router.delete("/delcarrera", (req, res) => {
	if (typeof req.session.email != "undefined") {
		var data = {
			correo_usuario: req.session.email,
			codigo: req.body.codigo
		}
		
		CarreraModel.removeCarrera(data, (results) => {
			if (results) {
				res.status(200).send("Carrera Eliminada!")
			} else {
				res.status(403).send("Error al eliminar la Carrera.")
			}
		})
	} else {
		res.render("index")
	}
})

router.get("/areas", (req, res) => {
	if (typeof req.session.email != "undefined") {
		res.render("areas")
	} else {
		res.render("index")
	}
})

router.get("/getareas", (req, res) => {
	if (typeof req.session.email != "undefined") {
		var data = {
			correo_usuario: req.session.email,
			codigo: req.session.area
		}
		
		AreaModel.getAreas(data, (results) => {
			res.status(200).send(results)
		})
	} else {
		res.render("index")
	}
})

router.get("/getallareas", (req, res) => {
	if (typeof req.session.email != "undefined") {
		var data = {
			correo_usuario: req.session.email
		}
		
		AreaModel.getAll(data, (results) => {
			res.status(200).send(results)
		})
	} else {
		res.render("index")
	}
})

router.post("/inarea", (req, res) => {
	if (typeof req.session.email != "undefined") {
		var data = {
			correo_usuario: req.session.email,
			codigo: req.body.codigoarea,
			nombre: req.body.nombrearea
		}
		
		AreaModel.inArea(data, (results) => {
			if (results) {
				res.status(200).send("Área Registrada!")
			} else {
				res.status(403).send("Error al ingresar el Área.")
			}
		})
	} else {
		res.render("index")
	}
})

router.put("/uparea", (req, res) => {
	if (typeof req.session.email != "undefined") {
		var data = {
			correo_usuario: req.session.email,
			codigo: req.body.codigoarea,
			nombre: req.body.nombrearea
		}
		
		AreaModel.updateArea(data, (results) => {
			if (results) {
				res.status(200).send("Área Actualizada!")
			} else {
				res.status(403).send("Error al actualizar el Área.")
			}
		})
	} else {
		res.render("index")
	}
})

router.delete("/delarea", (req, res) => {
	if (typeof req.session.email != "undefined") {
		var data = {
			correo_usuario: req.session.email,
			codigo: req.body.codigo // Se debe agregar el código del área a eliminar
		}
		
		AreaModel.removeArea(data, (results) => {
			if (results) {
				res.status(200).send("Área Eliminada!")
			} else {
				res.status(403).send("Error al eliminar el Área.")
			}
		})
	} else {
		res.render("index")
	}
})

router.get("/perfilprofesional", (req, res) => {
	if (typeof req.session.email != "undefined") {
		res.render("perfilesprofesionales")
	} else {
		res.render("index")
	}
})

router.get("/allperfiles", (req, res) => {
	if (typeof req.session.email != "undefined") {
		var data = {
			correo_usuario: req.session.email
		}
		
		PerfilProfesionalModel.getPerfiles(data, (results) => {
			res.status(200).send(results)
		})
	} else {
		res.render("index")
	}
})

router.post("/inperfiles", (req, res) => {
	if (typeof req.session.email != "undefined") {
		var data = {
			correo_usuario: req.session.email,
			perfil: req.body.perfilprofesional
		}
		
		PerfilProfesionalModel.inPerfil(data, (results) => {
			if (results) {
				res.status(200).send("Perfil profesional Registrado!")
			} else {
				res.status(403).send("Error al ingresar el Perfil profesional.")
			}
		})
	} else {
		res.render("index")
	}
})

router.put("/upperfil", (req, res) => {
	if (typeof req.session.email != "undefined") {
		var data = {
			correo_usuario: req.session.email,
			id: req.body.id,
			perfil: req.body.perfilprofesional
		}
		
		PerfilProfesionalModel.updatePerfil(data, (results) => {
			if (results) {
				res.status(200).send("Perfil Profesional Actualizado!")
			} else {
				res.status(403).send("Error al actualizar el Perfil Profesional.")
			}
		})
	} else {
		res.render("index")
	}
})

router.delete("/delperfil", (req, res) => {
	if (typeof req.session.email != "undefined") {
		var data = {
			correo_usuario: req.session.email,
			id: req.body.id
		}
		
		PerfilProfesionalModel.removePerfil(data, (results) => {
			if (results) {
				res.status(200).send("Perfil Profesional Eliminado!")
			} else {
				res.status(403).send("Error al eliminar el Perfil Profesional.")
			}
		})
	} else {
		res.render("index")
	}
})

router.get("/docentes", (req, res) => {
	if (typeof req.session.email != "undefined") {
		res.render("docentes")	
	} else {
		res.render("index")
	}
})

router.get("/alldocentes", (req, res) => {
	if (typeof req.session.email != "undefined") {
		var data = {
			correo_usuario: req.session.email,
			codigo_area: req.session.area
		}
		
		DocenteModel.getDocentes(data, (results) => {
			res.status(200).send(results)
		})
	} else {
		res.render("index")
	}
})

router.post("/indocente", (req, res) => {
	if (typeof req.session.email != "undefined") {
		var data = {
			correo_usuario: req.session.email,
			run: req.body.rundocente,
			nombre: req.body.nombredocente,
			prioridad: req.body.prioridaddocente,
			disponibilidad: req.body.disponibilidaddocente,
			codigo_area: req.body.areadocente,
			id_perfilprofesional: req.body.perfilprofesionaldocente
		}
		
		DocenteModel.inDocente(data, (results) => {
			if (results) {
				res.status(200).send("Docente Registrado!")
			} else {
				res.status(403).send("Error al ingresar el Docente.")
			}
		})
	} else {
		res.render("index")
	}
})

router.put("/updocente", (req, res) => {
	if (typeof req.session.email != "undefined") {
		var data = {
			correo_usuario: req.session.email,
			run: req.body.rundocente,
			nombre: req.body.nombredocente,
			prioridad: req.body.prioridaddocente,
			disponibilidad: req.body.disponibilidaddocente,
			codigo_area: req.body.areadocente,
			id_perfilprofesional: req.body.perfilprofesionaldocente
		}
		
		DocenteModel.updateDocente(data, (results) => {
			if (results) {
				res.status(200).send("Docente Actualizado!")
			} else {
				res.status(403).send("Error al actualizar el Docente.")
			}
		})
	} else {
		res.render("index")
	}
})

router.delete("/deldocente", (req, res) => {
	if (typeof req.session.email != "undefined") {
		var data = {
			correo_usuario: req.session.email,
			run: req.body.run
		}
		
		DocenteModel.removeDocente(data, (results) => {
			if (results) {
				res.status(200).send("Registro de Docente Eliminado!")
			} else {
				res.status(403).send("Error al eliminar el registro de Docente.")
			}
		})
	} else {
		res.render("index")
	}
})

router.get("/asignaturas", (req, res) => {
	if (typeof req.session.email != "undefined") {
		res.render("asignaturas")
	} else {
		res.render("index")
	}
})

router.get("/getasignaturas", (req, res) => {
	if (typeof req.session.email != "undefined") {
		var data = {
			correo_usuario: req.session.email
		}
		
		AsignaturaModel.getAsignaturas(data, (results) => {
			res.status(200).send(results)
		})
	} else {
		res.render("index")
	}
})

router.post("/inasignatura", (req, res) => {
	if (typeof req.session.email != "undefined") {
		var data = {
			correo_usuario: req.session.email,
			codigo: req.body.codigoasignatura,
			nombre: req.body.nombreasignatura,
			especialidad: req.body.especialidadasignatura,
			cantidad_horas: req.body.cantidadhorasasignatura,
			equipamiento: req.body.equipamientoasignatura,
			semestre: req.body.semestreasignatura,
			codigo_maya: req.body.mayaasignatura
		}
		
		AsignaturaModel.inAsignatura(data, (results) => {
			if (results) {
				res.status(200).send("Asignatura Registrada!")
			} else {
				res.status(403).send("Error al ingresar la Asignatura.")
			}
		})
	} else {
		res.render("index")
	}
})

router.put("/upasignatura", (req, res) => {
	if (typeof req.session.email != "undefined") {
		var data = {
			correo_usuario: req.session.email,
			codigo: req.body.codigoasignatura,
			nombre: req.body.nombreasignatura,
			especialidad: req.body.especialidadasignatura,
			cantidad_horas: req.body.cantidadhorasasignatura,
			equipamiento: req.body.equipamientoasignatura,
			semestre: req.body.semestreasignatura,
			codigo_maya: req.body.mayaasignatura
		}
		
		AsignaturaModel.updateAsignatura(data, (results) => {
			if (results) {
				res.status(200).send("Asignatura Actualizada!")
			} else {
				res.status(403).send("Error al actualizar la Asignatura.")
			}
		})
	} else {
		res.render("index")
	}
})

router.delete("/delasignatura", (req, res) => {
	if (typeof req.session.email != "undefined") {
		var data = {
			correo_usuario: req.session.email,
			codigo: req.body.codigo // Se debe ingresar el código de la Asignatura
		}
		
		AsignaturaModel.removeAsignatura(data, (results) => {
			if (results) {
				res.status(200).send("Asignatura Eliminada!")
			} else {
				res.status(403).send("Error al eliminar la Asignatura.")
			}
		})
	} else {
		res.render("index")
	}
})

router.get("/cursos", (req, res) => {
	if (typeof req.session.email != "undefined") {
		res.render("cursos")
	} else {
		res.render("index")
	}
})

router.get("/getcursos", (req, res) => {
	if (typeof req.session.email != "undefined") {
		var data = {
			correo_usuario: req.session.email
		}
		
		CursoModel.getCursos(data, (results) => {
			res.status(200).send(results)
		})
	} else {
		res.render("index")
	}
})

router.post("/incurso", (req, res) => {
	if (typeof req.session.email != "undefined") {
		var data = {
			correo_usuario: req.session.email,
			codigo: req.body.codigocurso,
			tamano: req.body.tamanocurso
		}
		
		CursoModel.inCurso(data, (results) => {
			if (results) {
				res.status(200).send("Curso Registrado!")
			} else {
				res.status(403).send("Error al ingresar el Curso.")
			}
		})
	} else {
		res.render("index")
	}
})

router.put("/upcurso", (req, res) => {
	if (typeof req.session.email != "undefined") {
		var data = {
			correo_usuario: req.session.email,
			codigo: req.body.codigocurso,
			tamano: req.body.tamanocurso
		}
		
		CursoModel.updateCurso(data, (results) => {
			if (results) {
				res.status(200).send("Curso Actualizado!")
			} else {
				res.status(403).send("Error al actualizar el Curso.")
			}
		})
	} else {
		res.render("index")
	}
})

router.delete("/delcurso", (req, res) => {
	if (typeof req.session.email != "undefined") {
		var data = {
			correo_usuario: req.session.email,
			codigo: req.body.codigo
		}
		
		CursoModel.removeCurso(data, (results) => {
			if (results) {
				res.status(200).send("Curso Eliminado!")
			} else {
				res.status(403).send("Error al eliminar el Curso.")
			}
		})
	} else {
		res.render("index")
	}
})

router.get("/mayas", (req, res) => {
	if (typeof req.session.email != "undefined") {
		res.render("maya")
	} else {
		res.render("index")
	}
})

router.get("/allmayas", (req, res) => {
	if (typeof req.session.email != "undefined") {
		var data = {
			correo_usuario: req.session.email
		}
		
		MayaModel.getMayas(data, (results) => {
			res.status(200).send(results)
		})
	} else {
		res.render("index")
	}
})

router.post("/inmaya", (req, res) => {
	if (typeof req.session.email != "undefined") {
		var data = {
			correo_usuario: req.session.email,
			codigo: req.body.codigomaya,
			cantidad_asignaturas: req.body.cantidadasignaturas,
			codigo_carrera: req.body.codigocarreramaya
		}
		
		MayaModel.inMaya(data, (results) => {
			if (results) {
				res.status(200).send("Maya Registrada!")
			} else {
				res.status(403).send("Error al ingresar la Maya.")
			}
		})
	} else {
		res.render("index")
	}
})

router.put("/upmaya", (req, res) => {
	if (typeof req.session.email != "undefined") {
		var data = {
			correo_usuario: req.session.email,
			codigo: req.body.codigomaya,
			cantidad_asignaturas: req.body.cantidadasignaturas,
			codigo_carrera: req.body.codigocarreramaya
		}
		
		MayaModel.updateMaya(data, (results) => {
			if (results) {
				res.status(200).send("Maya Actualizada!")
			} else {
				res.status(403).send("Error al actualizar la Maya.")
			}
		})
	} else {
		res.render("index")
	}
})

router.delete("/delmaya", (req, res) => {
	if (typeof req.session.email != "undefined") {
		var data = {
			correo_usuario: req.session.email,
			codigo: req.body.codigo // Se debe ingresar el código de la Maya.
		}
		
		MayaModel.removeMaya(data, (results) => {
			if (results) {
				res.status(200).send("Maya Eliminada!")
			} else {
				res.status(403).send("Error al eliminar la Maya.")
			}
		})
	} else {
		res.render("index")
	}
})

router.get("/secciones", (req, res) => {
	if (typeof req.session.email != "undefined") {
		res.render("secciones")
	} else {
		res.render("index")
	}
})

router.get("/getsecciones", (req, res) => {
	if (typeof req.session.email != "undefined") {
		var data = {
			correo_usuario: req.session.email
		}
		
		SeccionModel.getSecciones(data, (results) => {
			res.status(200).send(results)
		})
	} else {
		res.render("index")
	}
})

router.post("/inseccion", (req, res) => {
	if (typeof req.session.email != "undefined") {
		var data = {
			correo_usuario: req.session.email,
			codigo: req.body.codigoseccion,
			nombre: req.body.nombreseccion,
			semestre: req.body.semestreseccion,
			hora_inicio: req.body.horainicioseccion,
			hora_termino: req.body.horaterminoseccion,
			codigo_curso: req.body.cursoseccion,
			codigo_carrera: req.body.carreraseccion,
			codigo_maya: req.body.mayaseccion
		}
		
		SeccionModel.inSeccion(data, (results) => {
			if (results) {
				res.status(200).send("Sección Registrada!")
			} else {
				res.status(403).send("Error al ingresar la Sección.")
			}
		})
	} else {
		res.render("index")
	}
})

router.put("/upseccion", (req, res) => {
	if (typeof req.session.email != "undefined") {
		var data = {
			correo_usuario: req.session.email,
			codigo: req.body.codigoseccion,
			nombre: req.body.nombreseccion,
			semestre: req.body.semestreseccion,
			hora_inicio: req.body.horainicioseccion,
			hora_termino: req.body.horaterminoseccion,
			codigo_curso: req.body.cursoseccion,
			codigo_carrera: req.body.carreraseccion,
			codigo_maya: req.body.mayaseccion
		}
		
		SeccionModel.updateSeccion(data, (results) => {
			if (results) {
				res.status(200).send("Sección Actualizada!")
			} else {
				res.status(403).send("Error al actualizar la Sección.")
			}
		})
	} else {
		res.render("index")
	}
})

router.delete("/delseccion", (req, res) => {
	if (typeof req.session.email != "undefined") {
		var data = {
			correo_usuario: req.session.email,
			codigo: req.body.codigo
		}
		
		SeccionModel.removeSeccion(data, (results) => {
			if (results) {
				res.status(200).send("Sección Actualizada!")
			} else {
				res.status(403).send("Error al eliminar la Sección.")
			}
		})
	} else {
		res.render("index")
	}
})

router.get("/registroactividades", (req, res) => {
	if (typeof req.session.email != "undefined") {
		res.render("registroactividades")
	} else {
		res.render("index")
	}
})

router.get("/getregistroactividades", (req, res) => {
	if (typeof req.session.email != "undefined") {
		var data = {
			correo_usuario: req.session.email
		}
		
		LogModel.getRegistros(data, (results) => {
			res.status(200).send(results)
		})
	} else {
		res.render("index")
	}
})

router.get("/crearusuario", (req, res) => {
	if (typeof req.session.email != "undefined") {
		res.render("crearusuario")
	} else {
		res.render("index")
	}
})

router.get("/informacionpersonal", (req, res) => {
	if (typeof req.session.email != "undefined") {
		res.render("modinformacionpersonal")
	} else {
		res.render("index")
	}
})

router.get("/getusuarios", (req, res) => {
	if (typeof req.session.email != "undefined") {
		var data = {
			correo_usuario: req.session.email,
			area: req.session.area
		}
		
		UserModel.getUsers(data, (results) => {
			res.status(200).send(results)
		})
	} else {
		res.render("index")
	}
})

router.get("/getinformacionpersonal", (req, res) => {
	if (typeof req.session.email != "undefined") {
		var data = {
			correo_usuario: req.session.email
		}
		
		UserModel.getOneUser(data, (results) => {
			res.status(200).send(results)
		})
	} else {
		res.render("index")
	}
})

router.post("/inusuario", (req, res) => {
	if (typeof req.session.email != "undefined") {
		var data = {
			correo_usuario: req.session.email,
			correo: req.body.correousuario,
			pass: req.body.passusuario,
			nombre: req.body.nombreusuario,
			institucion: req.body.institucionusuario,
			codigo_area: req.body.areausuario
		}
		
		UserModel.inUser(data, (results) => {
			if (results) {
				res.status(200).send("Usuario Registrado!")
			} else {
				res.status(403).send("Error al ingresar el nuevo Usuario.")
			}
		})
	} else {
		res.render("index")
	}
})

router.put("/upusuario", (req, res) => {
	if (typeof req.session.email != "undefined") {
		var data = {
			correo_usuario: req.session.email,
			correo: req.body.correousuario,
			pass: req.body.contrasenausuario,
			nombre: req.body.nombreusuario,
			institucion: req.body.institucionusuario,
			codigo_area: req.body.areausuario
		}
		
		UserModel.updateUser(data, (results) => {
			if (results) {
				res.status(200).send("Usuario Actualizado!")
			} else {
				res.status(403).send("Error al actualizar el Usuario.")
			}
		})
	} else {
		res.render("index")
	}
})

router.get("/planificarhorarios", (req, res) => {
	if (typeof req.session.email != "undefined") {
		res.render("planificarhorarios")
	} else {
		res.render("index")
	}
})

module.exports = router