$(document).ready(() => {
    getAreas()
    
    function getAreas() {
        $.ajax({
            type: "GET",
            url: "/getallareas",
            contentType: "application/json",
            dataType: "json",
            success: inResults
        })
        
        function inResults (data) {
            var html = ""
            var i = 0
            
            data.forEach((e) => {
                html += "<tr><td id='" + i + "-codigo'>" + e.codigo + "</td><td id='" + i + "-nombre'>" + e.nombre + "</td><td>"
                html += "<a id='" + i + "-update'> Modificar | </a>"
                html += "<a id='" + i + "-remove'> Eliminar </a></td></tr>"
                
                i++
            })
            
            $("#tablaareas").html(html)
            
            html = ""
            for (var i = 0; i < data.length; i++) {
                $("#" + i + "-update").attr("onclick", "update('" + $("#" + i + "-codigo").html() + "', '" + $("#" + i + "-nombre").html() + "')")
                $("#" + i + "-remove").attr("onclick", "remove('" + $("#" + i + "-codigo").html() + "')")
            }
        }
    }
    
    $("#btningresararea").on("click", () => {
        $.ajax({
            type: "POST",
            url: "/inarea",
            data: $("#form-area").serialize(),
            success: (data) => {
                alert(data)
                $("#form-area").trigger("reset")
                window.location.reload()
            }
        })
    })
})

function remove (codigo) {
    if (confirm("¿De verdad desea borrar el registro?")) {
        $.ajax({
            type: "DELETE",
            url: "/delarea",
            data: {codigo: codigo},
            success: (data) => {
                alert(data)
                window.location.reload()
            }
        })
    }
}

function update (codigo, nombre) {
    $("#codigo-area").val(codigo).prop("disabled", true)
    $("#nombre-area").val(nombre)
    
    $("#btnupdateinsertarea").html("<button class='btn btn-default' id='btnupdatearea'>Actualizar Área</button>")
    
    $("#btnupdatearea").on("click", () => {
        $("#codigo-area").prop("disabled", false)
        
        $.ajax({
            type: "PUT",
            url: "/uparea",
            data: $("#form-area").serialize(),
            success: (data) => {
                alert(data)
                window.location.reload()
            }
        })
    })
}