$(document).ready(() => {
    getPerfiles()
    
    function getPerfiles () {
        $.ajax({
            type: "GET",
            url: "/allperfiles",
            contentType: "application/json",
            dataType: "json",
            success: inResults
        })
        
        function inResults(data) {
            var html = ""
            
            data.forEach((e) => {
                html += "<tr><td>" + e.id + "</td><td>" + e.perfil + "</td><td> acciones </td></tr>"
            })
            
            $("#tablaperfilesprofesionales").html(html)
        }
    }
    
    $("#btningresarperfilprofesional").on("click", () => {
        $.ajax({
            type: "POST",
            url: "/inperfiles",
            data: $("#form-perfilprofesional").serialize(),
            success: (data) => {
                alert(data)
                $("#perfilprofesional").text()
                getPerfiles()
            },
            error: (data) => {
                alert(data)
            }
        })
    })
})