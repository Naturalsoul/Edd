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
                html += "<tr><td>" + e.id + "</td><td>" + e.perfil + "</td>"
                html += "<td><a onclick='update(\"" + e.id + "\", \"" + e.perfil + "\")'> Modificar </a> | "
                html += "<a onclick='remove(\"" + e.id + "\")'> Eliminar </a></td></tr>"
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
                window.location.reload()
            },
            error: (data) => {
                alert(data)
            }
        })
    })
})

function update (id, perfil) {
    $("#perfilprofesional").val(perfil)
    
    $("#btnupdateinsertperfil").html("<button class='btn btn-default' id='btnupdateperfil'>Actualizar Perfil</button>")
    
    $("#btnupdateperfil").on("click", () => {
        $.ajax({
            type: "PUT",
            url: "/upperfil",
            data: {id: id, perfilprofesional: $("#perfilprofesional").val()},
            success: (data) => {
                alert(data)
                window.location.reload()
            }
        })
    })
}

function remove (id) {
    if (confirm("¿Realmente desea borrar el registro?")) {
        $.ajax({
            type: "DELETE",
            url: "/delperfil",
            data: {id: id},
            success: (data) => {
                alert(data)
                window.location.reload()
            }
        })
    }
}