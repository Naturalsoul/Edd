$(document).ready(() => {
    getLog()
    
    function getLog() {
        $.ajax({
            type: "GET",
            url: "/getregistroactividades",
            contentType: "application/json",
            dataType: "json",
            success: inResults
        })
        
        function inResults(data) {
            data = data.reverse()
            
            var html = ""
            
            data.forEach((e) => {
                html += "<tr><td>" + e.correo_usuario + "</td><td>" + e.accion + "</td><td>" + e.fecha_hora + "</td>"
            })
            
            $("#tableregistroactividades").html(html)
        }
    }
})