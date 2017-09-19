$(document).ready(() => {
    getCursos()
    
    function getCursos () {
        $.ajax({
            type: "GET",
            url: "/getcursos",
            contentType: "application/json",
            dataType: "json",
            success: inResults
        })
        
        function inResults (data) {
            var html = ""
            
            data.forEach((e) => {
                html += "<tr><td>" + e.codigo + "</td><td>" + e.tamano + "</td><td>" + e.nombre_seccion + "</td><td>"
                html += "<a onclick='update(\"" + e.codigo + "\", \"" + e.tamano + "\")'> Modificar </a> | "
                html += "<a onclick='remove(\"" + e.codigo + "\")'> Eliminar </a></td></tr>"
            })
            
            $("#tablecursos").html(html)
        }
    }
    
    $("#btningresarcurso").on("click", () => {
        $.ajax({
            type: "POST",
            url: "/incurso",
            data: $("#form-curso").serialize(),
            success: (data) => {
                alert(data)
                window.location.reload()
            }
        })
    })
})

function update (codigo, tamano) {
    $("#codigocurso").val(codigo).prop("disabled", true)
    $("#tamanocurso").val(tamano)
    
    $("#btnupdateinsertcurso").html("<button class='btn btn-default' id='btnupdatecurso'>Actualizar Curso</button>")
    
    $("#btnupdatecurso").on("click", () => {
        $("#codigocurso").prop("disabled", false)
        
        $.ajax({
            type: "PUT",
            url: "/upcurso",
            data: $("#form-curso").serialize(),
            success: (data) => {
                alert(data)
                window.location.reload()
            }
        })
    })
}

function remove (codigo) {
    if (confirm("¿Realmente desea borrar el registro?")) {
        $.ajax({
            type: "DELETE",
            url: "/delcurso",
            data: {codigo: codigo},
            success: (data) => {
                alert(data)
                window.location.reload()
            },
            error: (data) => {
                alert(data)
            }
        })
    }
}