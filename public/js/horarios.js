$(document).ready(() => {
    getHorarios()
    
    function getHorarios () {
        $.ajax({
            type: "GET",
            url: "/gethorarios",
            contentType: "application/json",
            dataType: "json",
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
            
            data.forEach((e) => {
                e.horario = JSON.parse(e.horario)
                var dia = parseInt(e.dia_comienzo)
                var mes = parseInt(e.mes_comienzo) - 1
                
                e.horario.forEach((h, index) => {
                    if (index == 0) {
                        html += "<div class='container slideTables' style='display: block;'>"
                    } else {
                        html += "<div class='container slideTables' style='display: none;'>"
                    }
                    
                    html += "<button class='btn btn-link pull-left' onclick='plusDivs(-1)'>&#10094;</button>"
                    html += "<button class='btn btn-link pull-right' onclick='plusDivs(+1)'>&#10095;</button>"
                    
                    html += "<h4 class='text-center'>" + (index + 1) + "º Semana</h4>"
                    html += "<div class='container'>"
                    html += "<div class='table-responsive'>"
                    html += "<table class='table-bordered'>"
                    html += "<thead>"
                    html += "<tr>"
                    html += "<th></th>"
                    html += "<th>" + dia + " de " + meses[mes].nombre + "</th>"
                    html += "<th>" + (dia + 1) + " de " + meses[mes].nombre + "</th>"
                    html += "<th>" + (dia + 2) + " de " + meses[mes].nombre + "</th>"
                    html += "<th>" + (dia + 3) + " de " + meses[mes].nombre + "</th>"
                    html += "<th>" + (dia + 4) + " de " + meses[mes].nombre + "</th>"
                    html += "<th>" + (dia + 5) + " de " + meses[mes].nombre + "</th>"
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
                            
                            if (i == 0) {
                                dia++
                                
                                if (dia + 1 > meses[mes].dias) {
                                    dia = 1
                                    mes++
                                }
                            }
                        }
                        
                        html += "</tr>"
                    }
                    
                    html += "</tbody>"
                    html += "</table>"
                    html += "</div>"
                    
                    html += "</div>"
                    
                    html += "</div>"
                    
                    dia++
                })
            })
            
            $("#filahorarios").html(html)
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

function plusDivs (n) {
    showDivs(slideIndex += n)
}

function showDivs (n) {
    var i;
    var x = document.getElementsByClassName("slideTables");
    if (n > x.length) {slideIndex = 1} 
    if (n < 1) {slideIndex = x.length} ;
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none"; 
    }
    x[slideIndex-1].style.display = "block"; 
}