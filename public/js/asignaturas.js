$(document).ready(() => {
    getAsignaturas()
    getMayas()
    
    function getAsignaturas() {
        $.ajax({
            type: "GET",
            url: "/getasignaturas",
            contentType: "application/json",
            dataType: "json",
            success: inResults
        })
        
        function inResults (data) {
            var html = ""
            var i = 0
            
            data.forEach((e) => {
                var especialidad = ""
                var equipamiento = ""
                
                switch (e.especialidad) {
                    case 0:
                        especialidad = "No"
                        break
                        
                    case 1:
                        especialidad = "Sí"
                        break;
                }
                
                switch (e.equipamiento) {
                    case 0:
                        equipamiento = "Laboratorio"
                        break
                    
                    case 1:
                        equipamiento = "Sala"
                        break
                        
                    case 2:
                        equipamiento = "Leica"
                        break
                        
                    case 3:
                        equipamiento = "Taller"
                        break
                }
                
                html += "<tr><td id='" + i + "-codigo'>" + e.codigo + "</td><td id='" + i + "-nombre'>" + e.nombre + "</td>"
                html += "<td id='" + i + "-especialidad'>" + especialidad + "</td><td id='" + i + "-cantidadhoras'>" + e.cantidad_horas + "</td>"
                html += "<td id='" + i + "-equipamiento'>" + equipamiento + "</td><td id='" + i + "-semestre'>" + (parseInt(e.semestre) + 1) + "</td>"
                html += "<td id='" + i + "-maya'>" + e.codigo_maya + "</td><td>"
                html += "<a id='" + i + "-update'> Modificar | </a>"
                html += "<a id='" + i + "-remove'> Eliminar </a></td></tr>"
                
                i++
            })
            
            $("#tableasignaturas").html(html)
            
            html = ""
            for (var i = 0; i < data.length; i++) {
                var forUpdate = "'" + data[i].codigo + "', '" + data[i].nombre + "', '" + data[i].especialidad + "', '" + data[i].cantidad_horas + "', '" + data[i].equipamiento
                forUpdate += "', '" + data[i].semestre + "', '" + data[i].codigo_maya + "'"
                
                $("#" + i + "-update").attr("onclick", "update(" + forUpdate + ")")
                $("#" + i + "-remove").attr("onclick", "remove('" + data[i].codigo + "')")
            }
        }
    }
    
    function getMayas() {
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
            
            $("#mayaasignatura").html(html)
        }
    }
    
    $("#btningresarasignatura").on("click", () => {
        $.ajax({
            type: "POST",
            url: "/inasignatura",
            data: $("#form-asignatura").serialize(),
            success: (data) => {
                alert(data)
                $("#form-asignatura").trigger("reset")
                window.location.reload()
            }
        })
    })
})

function remove (codigo) {
    if (confirm("¿De verdad desea borrar el registro?")) {
        $.ajax({
            type: "DELETE",
            url: "/delasignatura",
            data: {codigo: codigo},
            success: (data) => {
                alert(data)
                window.location.reload()
            }
        })
    }
}

function update (codigo, nombre, especialidad, cantidad_horas, equipamiento, semestre, codigo_maya) {
    $("#codigoasignatura").val(codigo).prop("disabled", true)
    $("#nombreasignatura").val(nombre)
    $("#especialidadasignatura").val(especialidad)
    $("#cantidadhorasasignatura").val(cantidad_horas)
    $("#equipamientoasignatura").val(equipamiento)
    $("#semestreasignatura").val(semestre)
    $("#mayaasignatura").val(codigo_maya)
    
    $("#btnupdateinsertasignatura").html("<button class='btn btn-default' id='btnupdateasignatura'>Actualizar Asignatura</button>")
    
    $("#btnupdateasignatura").on("click", () => {
        $("#codigoasignatura").prop("disabled", false)
        
        $.ajax({
            type: "PUT",
            url: "/upasignatura",
            data: $("#form-asignatura").serialize(),
            success: (data) => {
                alert(data)
                window.location.reload()
            }
        })
    })
}