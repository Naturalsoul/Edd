$(document).ready(() => {
    getSecciones()
    getCursos()
    getCarreras()
    getMayas()
    
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
                html += "<tr><td>" + e.codigo + "</td><td>" + e.nombre + "</td><td>" + (parseInt(e.semestre) + 1) + "</td><td>" + e.hora_inicio + "</td>"
                html += "<td>" + e.hora_termino + "</td><td>" + e.codigo_curso + "</td><td>" + e.carrera + "</td><td>" + e.codigo_maya + "</td>"
                html += "<td><a onclick='update(\"" + e.codigo + "\", \"" + e.nombre + "\", \"" + e.semestre + "\", \"" + e.hora_inicio + "\", "
                html += "\"" + e.hora_termino + "\", \"" + e.codigo_curso + "\", \"" + e.codigo_carrera + "\", \"" + e.codigo_maya + "\")'> Modificar </a> |"
                html += "<a onclick='remove(\"" + e.codigo + "\")'> Eliminar </a></td></tr>"
            })
            
            $("#tablesecciones").html(html)
        }
    }
    
    function getCursos () {
        $.ajax({
            type: "GET",
            url: "/getcursos",
            contentType: "application/json",
            dataType: "json",
            success: inResults
        })
        
        function inResults (data) {
            var html = ""
            
            data.forEach((e) => {
                html += "<option value='" + e.codigo + "'>" + e.codigo + "</option>"
            })
            
            $("#cursoseccion").html(html)
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
            
            $("#carreraseccion").html(html)
        }
    }
    
    function getMayas () {
        $.ajax({
            type: "GET",
            url: "/allmayas",
            contentType: "application/json",
            dataType: "json",
            success: inResults
        })
        
        function inResults (data) {
            var html = ""
            
            data.forEach((e) => {
                html += "<option value='" + e.codigo + "'>" + e.codigo + "</option>"
            })
            
            $("#mayaseccion").html(html)
        }
    }
    
    $("#btningresarseccion").on("click", () => {
        $.ajax({
            type: "POST",
            url: "/inseccion",
            data: $("#form-seccion").serialize(),
            success: (data) => {
                alert(data)
                window.location.reload()
            }
        })
    })
})

function update (codigo, nombre, semestre, hora_inicio, hora_termino, codigo_curso, codigo_carrera, codigo_maya) {
    $("#codigoseccion").val(codigo).prop("disabled", true)
    $("#nombreseccion").val(nombre)
    $("#semestreseccion").val(semestre)
    $("#horainicioseccion").val(hora_inicio)
    $("#horaterminoseccion").val(hora_termino)
    $("#cursoseccion").val(codigo_curso)
    $("#carreraseccion").val(codigo_carrera)
    $("#mayaseccion").val(codigo_maya)
    
    $("#btnupdateinsertseccion").html("<button class='btn btn-default' id='btnupdateseccion'>Actualizar Sección</button>")
    
    $("#btnupdateseccion").on("click", () => {
        $("#codigoseccion").prop("disabled", false)
        
        $.ajax({
            type: "PUT",
            url: "/upseccion",
            data: $("#form-seccion").serialize(),
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
            url: "/delseccion",
            data: {codigo: codigo},
            success: (data) => {
                alert(data)
                window.location.reload()
            }
        })
    }
}