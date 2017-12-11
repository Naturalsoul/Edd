$(document).ready(() => {
    getArea()
    getCarreras()
    getSecciones()
    
    function getArea () {
        $.ajax({
            type: "GET",
            url: "/getareas",
            contentType: "application/json",
            dataType: "json",
            success: inResults
        })
        
        function inResults (data) {
            var html = ""
            
            data.forEach((e) => {
                html += "<option value='" + e.codigo + "'>" + e.nombre + "</option>"
            })
            
            $("#planificararea").html(html)
        }
    }
    
    function getCarreras () {
        $.ajax({
            type: "GET",
            url: "/getcarreras",
            contentType: "application/json",
            contentType: "json",
            success: inResults
        })
        
        function inResults (data) {
            var html = ""
            
            data.forEach((e) => {
                html += "<option value='" + e.codigo + "'>" + e.nombre + "</option>"
            })
            
            $("#planificarcarrera").html(html)
        }
    }
    
    function getSecciones () {
        $.ajax({
            type: "GET",
            url: "/getsecciones",
            contentType: "application/json",
            dataType: "json",
            success: inResults
        })
        
        function inResults (data) {
            var html = ""
            
            data.forEach((e) => {
                html += "<option value='" + e.codigo + "'>" + e.nombre + "</option>"
            })
            
            $("#seccionplanificar").html(html)
        }
    }
    
    $("#btnplanificar").on("click", () => {
        var data = {
            carrera: $("#planificarcarrera").val(),
            seccion: $("#seccionplanificar").val(),
            cantidad_semanas: $("#cantidadsemanas").val(),
            dia: $("#diacomienzo").val(),
            mes: $("#mescomienzo").val()
        }
        
        if (data.dia > 0 && data.dia < 32 && data.mes > 0 && data.mes < 13) {
            
            if (data.cantidad_semanas < 2) {
                alert("Cantidad de semanas erroneas. Debe ser más de una semana.")
            } else {
                $.ajax({
                    type: "POST",
                    url: "/doplanificar",
                    data: data,
                    success: (data) => {
                        alert(data)
                        window.location.reload()
                    }
                })
            }
        } else {
            alert("Día o Mes erroneos.")
        }
    })
})