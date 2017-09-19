$(document).ready(() => {
    getMayas()
    getCarreras()
    
    function getMayas() {
        $.ajax({
            type: "GET",
            url: "/allmayas",
            contentType: "application/json",
            dataType: "json",
            success: inResults
        })
        
        function inResults (data) {
            var html = ""
            var i = 0
            
            data.forEach((e) => {
                html += "<tr><td id='" + i + "-codigo'>" + e.codigo + "</td><td id='" + i + "-cantidad_asignaturas'>" + e.cantidad_asignaturas + "</td>"
                html += "<td id='" + i + "-carrera'>" + e.nombre_carrera + "</td><td>"
                html += "<a id='" + i + "-update'> Modificar | </a>"
                html += "<a id='" + i + "-remove'> Eliminar </a></td></tr>"
                
                i++
            })
            
            $("#tablemayas").html(html)
            
            html = ""
            for (var i = 0; i < data.length; i++) {
                $("#" + i + "-update").attr("onclick", "update('" + data[i].codigo + "', '" + data[i].cantidad_asignaturas + "', '" + data[i].codigo_carrera + "')")
                $("#" + i + "-remove").attr("onclick", "remove('" + data[i].codigo + "')")
            }
        }
    }
    
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
                html += "<option value='" + e.codigo + "'>" + e.nombre + "</option>"
            })
            
            $("#codigocarreramaya").html(html)
        }
    }
    
    $("#btningresarmaya").on("click", () => {
        $.ajax({
            type: "POST",
            url: "/inmaya",
            data: $("#form-maya").serialize(),
            success: (data) => {
                alert(data)
                $("#form-maya").trigger("reset")
                window.location.reload()
            }
        })
    })
})

function remove (codigo) {
    if (confirm("¿De verdad desea borrar el registro?")) {
        $.ajax({
            type: "DELETE",
            url: "/delmaya",
            data: {codigo: codigo},
            success: (data) => {
                alert(data)
                window.location.reload()
            }
        })
    }
}

function update (codigo, nombre, codigo_carrera) {
    $("#codigomaya").val(codigo).prop("disabled", true)
    $("#cantidadasignaturas").val(nombre)
    $("#codigocarreramaya").val(codigo_carrera)
    
    $("#btnupdateinsertmaya").html("<button class='btn btn-default' id='btnupdatemaya'>Actualizar Maya</button>")
    
    $("#btnupdatemaya").on("click", () => {
        $("#codigomaya").prop("disabled", false)
        
        $.ajax({
            type: "PUT",
            url: "/upmaya",
            data: $("#form-maya").serialize(),
            success: (data) => {
                alert(data)
                window.location.reload()
            }
        })
    })
}