$(document).ready(() => {
    getAreas()
    getUsuarios()
    
    function getUsuarios () {
        $.ajax({
            type: "GET",
            url: "/getinformacionpersonal",
            contentType: "application/json",
            dataType: "json",
            success: inResults
        })
        
        function inResults (data) {
            var html = ""
            
            data.forEach((e) => {
                html += "<tr><td>" + e.correo + "</td><td>" + e.nombre + "</td><td>" + e.institucion + "</td><td>" + e.codigo_area + "</td></tr>"
                $("#correousuario").val(e.correo)
                $("#nombreusuario").val(e.nombre)
                $("#institucionusuario").val(e.institucion)
                $("#areausuario").val(e.codigo_area)
            })
            
            $("#tableinformacionpersonal").html(html)
        }
    }
    
    function getAreas () {
        $.ajax({
            type: "GET",
            url: "/getallareas",
            contentType: "application/json",
            dataType: "json",
            success: inResults
        })
        
        function inResults (data) {
            var html = ""
            
            data.forEach((e) => {
                html += "<option value='" + e.codigo + "'>" + e.nombre + "</option>"
            })
            
            $("#areausuario").html(html)
        }
    }
    
    $("#btningresarinformacionpersonal").on("click", () => {
        $.ajax({
            type: "PUT",
            url: "/upusuario",
            data: $("#form-usuario").serialize(),
            success: (data) => {
                alert(data)
                window.location.reload()
            }
        })
    })
})