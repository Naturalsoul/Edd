$(document).ready(() => {
    getAll()
    getAreas()
    getPerfiles()
    setTableModal()
    
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
            
            data.forEach((e) => {
                
                table += "<tr>"
                table += "<td>" + e.run + "</td><td>" + e.nombre + "</td><td>" + e.prioridad + "</td>"
                table += "<td><a class='btn btn-default' onclick='showDisponibilidad(\"" + e.disponibilidad + "\")'>Mostrar Disponibilidad</a></td>"
                table += "<td>" + e.area + "</td><td>" + e.perfil + "</td>"
                table += "<td><a onclick='update(\"" + e.run + "\", \"" + e.nombre + "\", \"" + e.prioridad + "\", \"" + e.disponibilidad + "\", \"" + e.codigo_area + "\", \"" + e.id_perfilprofesional + "\")'>Modificar</a> | "
                table += "<a onclick='remove(\"" + e.run + "\")'>Eliminar</td>"
                table += "</tr>"
            })
            
            $("#tabladocentes").html(table)
        }
    }
    
    $("#btningresardocente").on("click", () => {
        var data = {
            rundocente: $("#rundocente").val(),
            nombredocente: $("#nombredocente").val(),
            prioridaddocente: $("#prioridaddocente").val(),
            areadocente: $("#areadocente").val(),
            perfilprofesionaldocente: $("#perfilprofesionaldocente").val()
        }
        
        var disponibilidad = []
        
        for (var i = 0; i < 18; i++) {
            disponibilidad[i] = []
            for (var e = 0; e < 6; e++) {
                disponibilidad[i][e] = $("#" + i + "-" + e).is(":checked") ? true : false
            }
        }
        
        data.disponibilidaddocente = disponibilidad.toString()
        
        $.ajax({
            url: "/indocente",
            type: "POST",
            data: data,
            success: (data) => {
                alert(data)
                window.location.reload()
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
    
    function setTableModal () {
        var html = ""
        var bloques = [
            "8:30 - 9:15",
            "9:15 - 10:00",
            "10:05 - 10:50",
            "10:50 - 11:35",
            "11:40 - 12:25",
            "12:25 - 13:10",
            "13:45 - 14:30",
            "14:30 - 15:15",
            "15:20 - 16:05",
            "16:05 - 16:50",
            "16:55 - 17:40",
            "17:40 - 18:25",
            "18:30 - 19:15",
            "19:15 - 20:00",
            "20:05 - 20:50",
            "20:50 - 21:35",
            "21:40 - 22:25",
            "22:25 - 23:10"
        ]
        
        for (var i = 0; i < 18; i++) {
            html += "<tr>"
            html += "<td>" + bloques[i] + "</td>"
            
            for (var e = 0; e < 6; e++) {
                html += "<td>"
                html += "<input type='checkbox' id='" + i + "-" + e + "'></input>"
                html += "</td>"
            }
            
            html += "</tr>"
        }
        
        $("#tabledisponibilidaddocente").html(html)
    }
})

function showDisponibilidad (disponibilidad) {
    var html = ""
    var bloques = [
        "8:30 - 9:15",
        "9:15 - 10:00",
        "10:05 - 10:50",
        "10:50 - 11:35",
        "11:40 - 12:25",
        "12:25 - 13:10",
        "13:45 - 14:30",
        "14:30 - 15:15",
        "15:20 - 16:05",
        "16:05 - 16:50",
        "16:55 - 17:40",
        "17:40 - 18:25",
        "18:30 - 19:15",
        "19:15 - 20:00",
        "20:05 - 20:50",
        "20:50 - 21:35",
        "21:40 - 22:25",
        "22:25 - 23:10"
    ]
    
    var disponibilidaddocente = disponibilidad.split(",")
    var c = 0
    
    for (var i = 0; i < 18; i++) {
        html += "<tr>"
        html += "<td>" + bloques[i] + "</td>"
        
        for (var e = 0; e < 6; e++) {
            html += "<td>"
            html += (disponibilidaddocente[c] == "true") ? "Sí" : ""
            html += "</td>"
            c++
        }
        
        html += "</tr>"
    }
    
    $("#tabledisponibilidaddocentelistado").html(html)
    $("#modaldisponibilidaddocentelistado").modal()
}

function update (run, nombre, prioridad, disponibilidad, codigo_area, id_perfilprofesional) {
    $("#rundocente").val(run).prop("disabled", true)
    $("#nombredocente").val(nombre)
    $("#prioridaddocente").val(prioridad)
    $("#areadocente").val(codigo_area)
    $("#perfilprofesionaldocente").val(id_perfilprofesional)
    
    var c = 0
    var arrDis = disponibilidad.split(",")
    
    for (var i = 0; i < 18; i++) {
        for (var e = 0; e < 6; e++) {
            if (arrDis[c] == "true") {
                $("#" + i + "-" + e).prop("checked", true)
            } else {
                $("#" + i + "-" + e).prop("checked", false)
            }
            
            c++
        }
    }
    
    $("#btnupdateinsertdocente").html("<button class='btn btn-default' id='btnupdatedocente'>Actualizar Docente</button>")
    
    $("#btnupdatedocente").on("click", () => {
        var data = {
            rundocente: $("#rundocente").val(),
            nombredocente: $("#nombredocente").val(),
            prioridaddocente: $("#prioridaddocente").val(),
            areadocente: $("#areadocente").val(),
            perfilprofesionaldocente: $("#perfilprofesionaldocente").val()
        }
        
        var disponibilidad = []
        
        for (var i = 0; i < 18; i++) {
            disponibilidad[i] = []
            for (var e = 0; e < 6; e++) {
                disponibilidad[i][e] = $("#" + i + "-" + e).is(":checked") ? true : false
            }
        }
        
        data.disponibilidaddocente = disponibilidad.toString()
        
        $.ajax({
            url: "/updocente",
            type: "PUT",
            data: data,
            success: (data) => {
                alert(data)
                window.location.reload()
            }
        })
    })
}

function remove (run) {
    if (confirm("¿Realmente desea eliminar el registro de Docente?")) {
        $.ajax({
            type: "DELETE",
            url: "/deldocente",
            data: {run: run},
            success: (data) => {
                alert(data)
                window.location.reload()
            }
        })
    }
}