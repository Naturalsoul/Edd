$(document).ready(() => {
    
    function getSalas() {
        $.ajax({
            type: "GET",
            url: "/allsalas",
            contentType: "application/json",
            dataType: "json",
            success: inRes
        })
        
        function inRes (data) {
            var table = ""
            
            for (var i = 0; i < data.length; i++) {
                table += "<tr>"
                table += "<td>" + data.codigo + "</td>"
                table += "<td>" + data.capacidad_alumnos + "</td>"
                table += "<td>" + data.equipamiento_tecnologico + "</td>"
                table += "<td><a id='disponibilidadsala-" + i + "' download='Disponibilidad Sala - " + data.codigo + ".csv' type='text/csv'>Disponibilidad Sala</a></td>"
                table += "<td>Acciones</td>"
                table += "</tr>"
            }
            
            $("#tablesalas").html(table)
            
            for (var i = 0; i < data.length; i++) {
                var csv = data.disponibilidad
                var data = new Blob([csv])
                $("#disponibilidadsala-" + i).attr("href", URL.createObjectURL(data))
            }
        }
    }
})