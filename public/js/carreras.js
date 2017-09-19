$(document).ready(() => {
    getCarreras()
    getAreas()
    
    function getCarreras () {
        $.ajax({
            type: "GET",
            url: "/getcarreras",
            contentType: "application/json",
            dataType: "json",
            success: inResults
        })
        
        function inResults (data) {
            var html = ""
            
            data.forEach((e) => {
                html += "<tr><td>" + e.codigo + "</td><td>" + e.nombre + "</td><td>" + e.nombre_area + "</td>"
                html += "<td><a onclick='update(\"" + e.codigo + "\", \"" + e.nombre + "\", \"" + e.codigo_area + "\")'> Modificar </a> | "
                html += "<a onclick='remove(\"" + e.codigo + "\")'> Eliminar </a></td></tr>"
            })
            
            $("#tablacarreras").html(html)
        }
    }
    
    function getAreas () {
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
            
            $("#areacarrera").html(html)
        }
    }
    
    $("#btningresarcarrera").on("click", () => {
        $.ajax({
            type: "POST",
            url: "/incarrera",
            data: $("#form-carrera").serialize(),
            success: (data) => {
                alert(data)
                window.location.reload()
            }
        })
    })
})

function update (codigo, nombre, codigo_area) {
    $("#codigocarrera").val(codigo).prop("disabled", true)
    $("#nombrecarrera").val(nombre)
    $("#areacarrera").val(codigo_area)
    
    $("#btnupdateinsertcarrera").html("<button class='btn btn-default' id='btnupdatecarrera'>Actualizar Carrera</button>")
    
    $("#btnupdatecarrera").on("click", () => {
        $("#codigocarrera").prop("disabled", false)
        
        $.ajax({
            type: "PUT",
            url: "/upcarrera",
            data: $("#form-carrera").serialize(),
            success: (data) => {
                alert(data)
                window.location.reload()
            }
        })
    })
}

function remove (codigo) {
    if (confirm("¿Realmente desea borrar el registro?")) {
        $.ajax({
            type: "DELETE",
            url: "/delcarrera",
            data: {codigo: codigo},
            success: (data) => {
                alert(data)
                window.location.reload()
            }
        })
    }
}