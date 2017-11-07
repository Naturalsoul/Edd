$(document).ready(() => {
    setTableModal()
    getSalas()
    
    function getSalas () {
        $.ajax({
            type: "GET",
            url: "/getsalas",
            contentType: "application/json",
            dataType: "json",
            success: inRes
        })
        
        function inRes (data) {
            var table = ""
            
            data.forEach((e) => {
                
                var equipamiento
                
                switch (e.equipamiento) {
                    case "0":
                        equipamiento = "Laboratorio"
                        break
                    
                    case "1":
                        equipamiento = "Sala"
                        break
                        
                    case "2":
                        equipamiento = "Leica"
                        break
                        
                    case "3":
                        equipamiento = "Taller"
                        break
                }
                
                table += "<tr>"
                table += "<td>" + e.codigo + "</td>"
                table += "<td>" + e.capacidad_alumnos + "</td>"
                table += "<td>" + equipamiento + "</td>"
                table += "<td><a class='btn btn-default' onclick='showDisponibilidad(\"" + e.disponibilidad + "\")'>Mostrar Disponibilidad</a></td>"
                table += "<td><a onclick='update(\"" + e.codigo + "\", \"" + e.capacidad_alumnos + "\", \"" + e.equipamiento + "\", \"" + e.disponibilidad + "\")'>Modificar</a> | "
                table += "<a onclick='remove(\"" + e.codigo + "\")'>Eliminar</a></td>"
                table += "</tr>"
            })
            
            $("#tablesalas").html(table)
        }
    }
    
    $("#btningresarsala").on("click", () => {
        var data = {
            codigo: $("#codigosala").val(),
            capacidad_alumnos: $("#capacidadalumnos").val(),
            equipamiento: $("#equipamientosala").val(),
        }
        
        var disponibilidad = []
        
        for (var i = 0; i < 18; i++) {
            disponibilidad[i] = []
            for (var e = 0; e < 6; e++) {
                disponibilidad[i][e] = $("#" + i + "-" + e).is(":checked") ? true : false
            }
        }
        
        data.disponibilidad = disponibilidad.toString()
        
        $.ajax({
            type: "POST",
            url: "/insala",
            data: data,
            success: (data) => {
                alert(data)
                window.location.reload()
            }
        })
    })
    
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
                html += "<input type='checkbox' id='" + i + "-" + e + "' class='form-control'></input>"
                html += "</td>"
            }
            
            html += "</tr>"
        }
        
        $("#tabledisponibilidadsala").html(html)
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
    
    var disponibilidadsala = disponibilidad.split(",")
    var c = 0
    
    for (var i = 0; i < 18; i++) {
        html += "<tr>"
        html += "<td>" + bloques[i] + "</td>"
        
        for (var e = 0; e < 6; e++) {
            html += "<td>"
            html += (disponibilidadsala[c] == "true") ? "Sí" : ""
            html += "</td>"
            c++
        }
        
        html += "</tr>"
    }
    
    $("#tabledisponibilidadsalalistado").html(html)
    $("#modaldisponibilidadsalalistado").modal()
}

function update (codigo, capacidad_alumnos, equipamiento, disponibilidad) {
    $("#codigosala").val(codigo).prop("disabled", true)
    $("#capacidadalumnos").val(capacidad_alumnos)
    $("#equipamientosala").val(equipamiento)
    
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
    
    $("#btnupdateinsertsala").html("<button class='btn btn-default' id='btnupdatesala'>Actualizar Sala</button>")
    
    $("#btnupdatesala").on("click", () => {
        $("#codigosala").prop("disabled", false)
        
        var data = {
            codigo: $("#codigosala").val(),
            capacidad_alumnos: $("#capacidadalumnos").val(),
            equipamiento: $("#equipamientosala").val(),
        }
        
        var disponibilidad = []
        
        for (var i = 0; i < 18; i++) {
            disponibilidad[i] = []
            for (var e = 0; e < 6; e++) {
                disponibilidad[i][e] = $("#" + i + "-" + e).is(":checked") ? true : false
            }
        }
        
        data.disponibilidad = disponibilidad.toString()
        
        $.ajax({
            type: "PUT",
            url: "/upsala",
            data: data,
            success: (data) => {
                alert(data)
                window.location.reload()
            }
        })
    })
}

function remove (codigo) {
    if (confirm("¿Realmente desea eliminar el registro de Sala?")) {
        $.ajax({
            type: "DELETE",
            url: "/delsala",
            data: {codigo: codigo},
            success: (data) => {
                alert(data)
                window.location.reload()
            }
        })
    }
}