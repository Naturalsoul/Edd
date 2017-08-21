$(document).ready(() => {
	checkSessions()
	getAreas()
	getAreasForModel()
	getCarreras()
	getCarrerasPlanificar()

	$("#login-submit").on("click", () => {
		$.ajax({
			type: "POST",
			url: "/reqlogin",
			data: $("#login-form").serialize(),
			success: (data) => {
				if (data.connected) {
					window.location.href = "https://edd-naturalsoul.c9users.io/";
				} else {
					alert("Usuario Inválido")
				}
			}
		})
	})

	function checkSessions() {
		$.ajax({
			type: "GET",
			url: "/sessions",
	        contentType: "application/json",
			dataType: "json",
			success: (data) => {
				if (data.connected) {
					$(".connected").show()
					$(".disconnected").hide()
				} else {
					$(".connected").hide()
					$(".disconnected").show()
				}
			}
		})
	}

	function getAreas() {
		var results;
		var optionsArea = ""

		$.ajax({
			type: "GET",
			url: "/getareas",
			contentType: "application/json",
			dataType: "json",
			success: (data) => {
				results = data
				inResults()
			}
		})

		function inResults() {
			results.forEach((e) => {
				optionsArea += "<option value='" + e.codigo + "'>" + e.nombre + "</option>"
			})

			$("#area").html(optionsArea)
			$("#planificararea").html(optionsArea)
		}
	}

	$("#ingresar-carrera").on("click", () => {
		$.ajax({
			type: "POST",
			url: "/incarrera",
			data: $("#carreras-form").serialize(),
			success: (data) => {
				alert(data)
				$("#codigo-carrera").text("");
				$("#nombre-carrera").text("");
				$("#area")[0].selectedIndex = 0
				getCarreras()
			},
			error: (data) => {
				alert(data)
			}
		})
	})

	function getCarreras() {
		var table = ""

		$.ajax({
			type: "GET",
			url: "/getcarreras",
			contentType: "application/json",
			dataType: "json",
			success: (data) => {
				inResults(data)
			}
		})

		function inResults(data) {
			data.forEach((e) => {
				table += "<tr><td>" + e.codigo + "</td><td>" + e.nombre + "</td><td> acciones </td></tr>"
			})

			$("#tablacarreras").html(table)
		}
	}

	function getCarrerasPlanificar() {
		var options = ""

		$.ajax({
			type: "GET",
			url: "/getcarreras",
			contentType: "application/json",
			dataType: "json",
			success: (data) => {
				inResults(data)
			}
		})

		function inResults(data) {
			data.forEach((e) => {
				options += "<option value='" + e.codigo + "'>" + e.nombre + "</option>"
			})

			$("#planificarcarrera").html(options)
		}
	}
	
	function getAreasForModel () {
		var table = ""
		
		$.ajax({
			type: "GET",
			url: "/getallareas",
			contentType: "application/json",
			dataType: "json",
			success: (data) => {
				inResults(data)
			}
		})
		
		function inResults(data) {
			data.forEach((e) => {
				table += "<tr><td>" + e.codigo + "</td><td>" + e.nombre + "</td><td> acciones </td></tr>"
			})
			
			$("#tablaareas").html(table)
		}
	}
	
	$("#btningresararea").on("click", () => {
		$.ajax({
			type: "POST",
			url: "/inarea",
			data: $("#form-area").serialize(),
			success: (data) => {
				alert(data)
				$("#codigo-area").text("");
				$("#nombre-area").text("");
				getAreasForModel()
			},
			error: (data) => {
				alert(data)
			}
		})
	})
})