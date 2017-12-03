$(document).ready(() => {
    getSeccionesInHorarios()
    
    function getSeccionesInHorarios () {
        $.ajax({
            type: "GET",
            url: "/getseccionesinhorario",
            contentType: "application/json",
            dataType: "json",
            success: inRes
        })
        
        function inRes (data) {
            var html = ""
            
            data.forEach((e) => {
                html += "<option value='" + e.codigo + "'>" + e.codigo + "</option>"
            })
            
            $("#seccionhorarios").html(html)
        }
    }
    
    $("#btnbuscarhorario").on("click", () => {
        getHorarios($("#seccionhorarios").val())
    })
    
    function getHorarios (codigo_seccion) {
        
        $.ajax({
            type: "POST",
            url: "/gethorarios",
            data: {codigo: codigo_seccion},
            success: inRes
        })
        
        function inRes (data) {
            var html = ""
            
            var bloquesHorarios = [
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
            
            var meses = [
                {
                    nombre: "Enero",
                    dias: 31
                },
                {
                    nombre: "Febrero",
                    dias: 28
                },
                {
                    nombre: "Marzo",
                    dias: 31
                },
                {
                    nombre: "Abril",
                    dias: 30
                },
                {
                    nombre: "Mayo",
                    dias: 31
                },
                {
                    nombre: "Junio",
                    dias: 30
                },
                {
                    nombre: "Julio",
                    dias: 31
                },
                {
                    nombre: "Agosto",
                    dias: 31
                },
                {
                    nombre: "Septiembre",
                    dias: 30
                },
                {
                    nombre: "Octubre",
                    dias: 31
                },
                {
                    nombre: "Noviembre",
                    dias: 30
                },
                {
                    nombre: "Diciembre",
                    dias: 31
                }
            ]
            
            data.forEach((e, indexTotal) => {
                e.horario = JSON.parse(e.horario)
                var dia = parseInt(e.dia_comienzo)
                var mes = (parseInt(e.mes_comienzo) - 1)
                var anio = e.anio
                var semestre = e.semestre
                var id = e.id
                var seccion = e.codigo_seccion
                
                e.horario.forEach((h, index) => {
                    var diasSemana = {
                        martes: (dia + 1) > meses[mes].dias ? (dia + 1) - meses[mes].dias : (dia + 1),
                        miercoles: (dia + 2) > meses[mes].dias ? (dia + 2) - meses[mes].dias : (dia + 2),
                        jueves: (dia + 3) > meses[mes].dias ? (dia + 3) - meses[mes].dias : (dia + 3),
                        viernes: (dia + 4) > meses[mes].dias ? (dia + 4) - meses[mes].dias : (dia + 4),
                        sabado: (dia + 5) > meses[mes].dias ? (dia + 5) - meses[mes].dias : (dia + 5)
                    }
                    
                    var mesesSemana = {
                        martes: (dia + 1) > meses[mes].dias ? meses[mes + 1].nombre : meses[mes].nombre,
                        miercoles: (dia + 2) > meses[mes].dias ? meses[mes + 1].nombre : meses[mes].nombre,
                        jueves: (dia + 3) > meses[mes].dias ? meses[mes + 1].nombre : meses[mes].nombre,
                        viernes: (dia + 4) > meses[mes].dias ? meses[mes + 1].nombre : meses[mes].nombre,
                        sabado: (dia + 5) > meses[mes].dias ? meses[mes + 1].nombre : meses[mes].nombre
                    }
                    
                    if (index == 0) {
                        html += "<div class='container slideTables-" + indexTotal + "' style='display: block;'>"
                    } else {
                        html += "<div class='container slideTables-" + indexTotal + "' style='display: none;'>"
                    }
                    
                    html += "<h5>Fecha: " + dia + "/" + (mes + 1) + "/" + anio + "</h5>"
                    html += "<h5>" + (parseInt(semestre) + 1) + "º Semestre</h5>"
                    html += "<button class='btn btn-link pull-left' onclick='plusDivs(-1, \"" + indexTotal + "\")'>&#10094;</button>"
                    html += "<button class='btn btn-link pull-right' onclick='plusDivs(+1, \"" + indexTotal + "\")'>&#10095;</button>"
                    
                    
                    html += "<h4 class='text-center'>" + (index + 1) + "º Semana</h4>"
                    html += "<div class='container'>"
                    html += "<div class='table-responsive'>"
                    html += "<table class='table-bordered'>"
                    html += "<thead>"
                    html += "<tr>"
                    html += "<th></th>"
                    html += "<th>" + dia + " de " + meses[mes].nombre + "</th>"
                    html += "<th>" + diasSemana.martes + " de " + mesesSemana.martes + "</th>"
                    html += "<th>" + diasSemana.miercoles + " de " + mesesSemana.miercoles + "</th>"
                    html += "<th>" + diasSemana.jueves + " de " + mesesSemana.jueves + "</th>"
                    html += "<th>" + diasSemana.viernes + " de " + mesesSemana.viernes + "</th>"
                    html += "<th>" + diasSemana.sabado + " de " + mesesSemana.sabado + "</th>"
                    html += "</tr>"
                    html += "<tr>"
                    html += "<th>Bloques Horarios</th>"
                    html += "<th>Lunes</th>"
                    html += "<th>Martes</th>"
                    html += "<th>Miercoles</th>"
                    html += "<th>Jueves</th>"
                    html += "<th>Viernes</th>"
                    html += "<th>Sabado</th>"
                    html += "</tr>"
                    html += "</thead>"
                    html += "<tbody>"
                    
                    for (var i = 0; i < 18; i++) {
                        html += "<tr>"
                        html += "<td>" + bloquesHorarios[i] + "</td>"
                        
                        for (var e = 0; e < 6; e++) {
                            html += "<td>"
                            
                            if (!h[i][e].disponible) {
                                html += "<a onclick='showRecom(\"" + i + "\", \"" + h[i][e].asignatura + "\")'>" + h[i][e].asignatura + "</a>"
                                html += "<p>" + h[i][e].docente + "</p>"
                                html += "<p>" + h[i][e].sala + "</p>"
                            } else {
                                html += ""
                            }
                            
                            html += "</td>"
                        }
                        
                        html += "</tr>"
                    }
                    
                    html += "</tbody>"
                    html += "</table>"
                    html += "</div>"
                    
                    html += "</div>"
                    
                    html += "</div>"
                    
                    for (var di = 0; di < 7; di++) {
                        if (dia == meses[mes].dias) {
                            dia = 1
                            mes++
                        } else {
                            dia++
                        }
                    }
                })
                
                html += "<br>"
                html += "<a class='btn btn-danger' onclick='remove(\"" + id + "\")'>Eliminar Horario</a>  "
                html += "<button class='btn btn-success' id='exportToExcel'>Exportar a Excel</button>"
                html += "<input type='hidden' name='seccion' value='" + seccion + "' class='seccion'>"
                html += "<br><hr><br>"
            })
            
            $("#filahorarios").html(html)
            
            $("#exportToExcel").click((e) => {
                var time = new Date()
                
                $(".table-bordered").table2excel({
                    exclude: "",
                    name: "Horario de " + $(".seccion").val(),
                    filename: "Horario " + $(".seccion").val() + " - " + time.getFullYear()
                })
            })
        }
    }
})

function showRecom (bloquehorario, asignatura) {
    
    $.ajax({
        type: "POST",
        url: "/getrecomendaciondocente",
        data: {bloquehorario: bloquehorario, asignatura: asignatura},
        success: inRes
    })
    
    function inRes (data) {
        console.log(data)
        
        var html = ""
        
        data.forEach((e) => {
            html += "<tr>"
            html += "<td>"
            html += e.run + " - " + e.nombre
            html += "</td>"
            html += "</tr>"
        })
        
        $("#tablerecomendaciondocentes").html(html)
        $("#modalplanificar").modal()
    }
}

var slideIndex = 1

function plusDivs (n, indexTotal) {
    showDivs(slideIndex += n, indexTotal)
}

function showDivs (n, indexTotal) {
    var i;
    var x = document.getElementsByClassName("slideTables-" + indexTotal);
    if (n > x.length) {slideIndex = 1} 
    if (n < 1) {slideIndex = x.length} ;
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none"; 
    }
    x[slideIndex-1].style.display = "block"; 
}

function remove (id) {
    if (confirm("¿Está seguro? Recuerde que deberá modificar manualmente las disponibilidades de los Docentes y Salas.")) {
        $.ajax({
            type: "DELETE",
            url: "/delhorario",
            data: {id: id},
            success: (data) => {
                alert(data)
                window.location.reload()
            },
            error: (data) => {
                alert(data)
                window.location.reload()
            }
        })
    }
}