$(document).ready(() => {
    getFeriados()
    
    function getFeriados () {
        $.ajax({
            type: "GET",
            url: "/getferiados",
            contentType: "application/json",
            dataType: "json",
            success: inRes
        })
        
        function inRes (data) {
            var html = ""
            
            data.forEach((e) => {
                html += "<tr>"
                html += "<td>" + e.id + "</td>"
                html += "<td>" + e.dia + "</td>"
                html += "<td>" + e.mes + "</td>"
                html += "<td>"
                html += "<a onclick='update(\"" + e.id + "\", \"" + e.dia + "\", \"" + e.mes + "\")'>Modificar</a>"
                html += " | "
                html += "<a onclick='remove(\"" + e.id + "\")'>Eliminar</a>"
                html += "</td>"
                html += "</tr>"
            })
            
            $("#tableferiados").html(html)
        }
    }
    
    $("#btningresarferiado").on("click", () => {
        var data = {
            dia: $("#diaferiado").val(),
            mes: $("#mesferiado").val()
        }
        
        $.ajax({
            type: "POST",
            url: "/inferiado",
            data: data,
            success: (data) => {
                alert(data)
                window.location.reload()
            }
        })
    })
})

function update (id, dia, mes) {
    $("#diaferiado").val(dia)
    $("#mesferiado").val(mes)
    
    $("#btnupdateinsertferiado").html("<button class='btn btn-default' id='btnupdateferiado'>Actualizar Feriado</button>")
    
    $("#btnupdateferiado").on("click", () => {
        var data = {
            id: id,
            dia: $("#diaferiado").val(),
            mes: $("#mesferiado").val()
        }
        
        $.ajax({
            type: "PUT",
            url: "/upferiado",
            data: data,
            success: (data) => {
                alert(data)
                window.location.reload()
            }
        })
    })
}

function remove (id) {
    if (confirm("¿Realmente desea eliminar el Registro?")) {
        $.ajax({
            type: "DELETE",
            url: "/delferiado",
            data: {id: id},
            success: (data) => {
                alert(data)
                window.location.reload()
            }
        })
    }
}