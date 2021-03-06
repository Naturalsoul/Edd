$(document).ready(() => {
    getUsuarios()
    getAreas()
    
    function getUsuarios () {
        $.ajax({
            type: "GET",
            url: "/getusuarios",
            contentType: "application/json",
            dataType: "json",
            success: inResults
        })
        
        function inResults (data) {
            var html = ""
            
            data.forEach((e) => {
                html += "<tr><td>" + e.correo + "</td><td>" + e.nombre + "</td><td>" + e.institucion + "</td><td>" + e.nombre_area + "</td></tr>"
            })
            
            $("#tablausuarios").html(html)
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
    
    $("#btningresarusuario").on("click", () => {
        $.ajax({
            type: "POST",
            url: "/inusuario",
            data: $("#form-usuario").serialize(),
            success: (data) => {
                alert(data)
                window.location.reload()
            }
        })
    })
})