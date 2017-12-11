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
                var f = e.fecha_hora.split(/[-T:.]/g)
                var d = f[2] + "/" + f[1] + "/" + f[0] + " " + (parseInt(f[3]) - 3) + ":" + f[4] + ":" + f[4] + " GTM-3"
                
                html += "<tr><td>" + e.correo_usuario + "</td><td>" + e.accion + "</td><td>" + d + "</td>"
            })
            
            $("#tableregistroactividades").html(html)
        }
    }
})