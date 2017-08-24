$(document).ready(() => {
    getAll()
    getAreas()
    getPerfiles()
    
    function getAll () {
        $.ajax({
            type: "GET",
            url: "/alldocentes",
            contentType: "application/json",
            dataType: "json",
            success: inRes
        })
        
        function inRes(data) {
            
            var table = ""
            var i = 0
            
            data.forEach((e) => {
                
                table += "<tr><td>" + e.run + "</td><td>" + e.nombre + "</td><td>" + e.prioridad + "</td>"
                table += "<td><a id='disponibilidad-" + i + "' download='Disponibilidad - " + e.nombre + ".csv' type='text/csv'>Disponibilidad</a></td>"
                table += "<td>" + e.area + "</td><td>" + e.perfil + "</td><td> Acciones </td></tr>"
                
                i++
            })
            
            $("#tabladocentes").html(table)
            
            i = 0
            
            data.forEach((e) => {
                var csv = e.disponibilidad
                var data = new Blob([csv])
                $("#disponibilidad-" + i).attr("href", URL.createObjectURL(data))
                i++
            })
        }
    }
    
    $("#btningresardocente").on("click", () => {
        $.ajax({
            url: "/indocente",
            type: "POST",
            data: new FormData($("#form-docente")),
            cache: false,
            contentType: "application/x-www-form-urlencoded",
            processData: false,
            xhr: () => {
                var myXhr = $.ajaxSettings.xhr()
                return myXhr
            },
            complete: (xhr, response) => {
                alert(response)
            }
        })
    })
    
    function getAreas() {
        $.ajax({
            type: "GET",
            url: "/getallareas",
            contentType: "application/json",
            dataType: "json",
            success: inRes
        })
        
        function inRes(data) {
            var options = ""
            
            data.forEach((e) => {
                options += "<option value='" + e.codigo + "'>" + e.nombre + "</option>"
            })
            
            $("#areadocente").html(options)
        }
    }
    
    function getPerfiles() {
        $.ajax({
            type: "GET",
            url: "/allperfiles",
            contentType: "application/json",
            dataType: "json",
            success: inRes
        })
        
        function inRes(data) {
            var options = ""
            
            data.forEach((e) => {
                options += "<option value='" + e.id + "'>" + e.perfil + "</option>"
            })
            
            $("#perfilprofesionaldocente").html(options)
        }
    }
})