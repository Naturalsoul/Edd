var cn = require("../data/cn")
var log = require("./registroactividades.model.js")

var model = {}

model.getAsignaturas = (data, next) => {
    var flag = true
    var finalRes = []
    
    var sql = "SELECT * FROM asignatura"
    
    cn.Ask(sql, (results) => {
        if (results) {
            
            results.forEach((e, i) => {
                var o = e
                finalRes[i] = JSON.parse(JSON.stringify(o))
                
                sql = "SELECT da.run_docente AS run_docente, d.nombre AS nombre_docente FROM docente_asignatura AS da INNER JOIN docente AS d ON da.run_docente = "
                sql += "d.run WHERE da.codigo_asignatura = '" + o.codigo + "'"
                
                cn.Ask(sql, (res2) => {
                    if (res2) {
                        finalRes[i].docente = JSON.parse(JSON.stringify(res2))
                        
                        data.accion = "consultó por todos los Docentes asignados a una Asignatura"
                        
                        log.inRegistro(data, (res) => {
                            if (res) {
                                if (i + 1 == results.length) {
                                    if (flag) {
                                        data.accion = "consultó por todos los registros de Asignatura"
                                        
                                        log.inRegistro(data, (res) => {
                                            if (res) {
                                                next(finalRes)
                                            } else {
                                                next(false)
                                            }
                                        })
                                        
                                    } else {
                                        next(false)
                                    }
                                }
                                
                                return
                            } else {
                                flag = false
                                return
                            }
                        })
                        
                    } else {
                        flag = false
                        return
                    }
                })
            })
        } else {
            next(false)
        }
    })
}

model.inAsignatura = (data, next) => {
    var flag = true
    
    var sql = "INSERT INTO asignatura (codigo, nombre, especialidad, cantidad_horas, equipamiento, horasporsemana, semestre, codigo_maya) "
    sql += "VALUES('" + data.codigo + "', '" + data.nombre + "', '" + data.especialidad + "', '" + data.cantidad_horas + "', '" + data.equipamiento
    sql += "', '" + data.horasporsemana + "', '" +  data.semestre + "', '" + data.codigo_maya + "')"
    
    cn.Insert(sql, (res) => {
        if (res) {
            if (typeof data.docentes == "object") {
                data.docentes.forEach((e, i) => {
                    sql = "INSERT INTO docente_asignatura (codigo_asignatura, run_docente) VALUES('" + data.codigo + "', '" + e + "')"
                    
                    cn.Insert(sql, (res) => {
                        if (res) {
                            data.accion = "asignó el Docente con el Run " + e + " a la Asignatura " + data.nombre
                            
                            log.inRegistro(data, (res) => {
                                if (res) {
                                    return
                                } else {
                                    flag = false
                                    return
                                }
                            })
                        } else {
                            flag = false
                            return
                        }
                    })
                })
            } else {
                sql = "INSERT INTO docente_asignatura (codigo_asignatura, run_docente) VALUES('" + data.codigo + "', '" + data.docentes + "')"
                
                cn.Insert(sql, (res) => {
                    if (res) {
                        data.accion = "asignó el Docente con el Run " + data.docentes + " a la Asignatura " + data.nombre
                        
                        log.inRegistro(data, (res) => {
                            if (res) {
                                return
                            } else {
                                flag = false
                                return
                            }
                        })
                    } else {
                        flag = false
                        return
                    }
                })
            }
            
            if (flag) {
                data.accion = "ingresó un nuevo registro con el Código " + data.codigo + " en Asignatura"
                
                log.inRegistro(data, (res) => {
                    if (res) {
                        next(res)
                    } else {
                        next(false)
                    }
                })
                
            } else {
                next(false)
            }
            
        } else {
            next(false)
        }
    })
}

model.updateAsignatura = (data, next) => {
    var flag = true
    
    var sql = "UPDATE asignatura SET nombre = '" + data.nombre + "', especialidad = '" + data.especialidad
    sql += "', cantidad_horas = '" + data.cantidad_horas + "', equipamiento = '" + data.equipamiento + "', semestre = '" + data.semestre
    sql += "', horasporsemana = '" + data.horasporsemana + "', codigo_maya = '" + data.codigo_maya + "' WHERE codigo = '" + data.codigo + "'"
    
    cn.Update(sql, (res) => {
        if (res) {
            if (typeof data.docentes == "object") {
                data.docentes.forEach((e, i) => {
                    sql = "UPDATE docente_asignatura SET codigo_asignatura = '" + data.codigo + "', run_docente = '" + e + "' WHERE codigo_asignatura = '" + data.codigo + "'"
                    
                    cn.Update(sql, (res) => {
                        if (res) {
                            data.accion = "actualizó los Docentes asignados para la Asignatura con el Código " + data.codigo
                            
                            log.inRegistro(data, (res) => {
                                if (res) {
                                    return
                                } else {
                                    flag = false
                                    return
                                }
                            })
                        } else {
                            flag = false
                            return
                        }
                    })
                })
            } else {
                sql = "UPDATE docente_asignatura SET codigo_asignatura = '" + data.codigo + "', run_docente = '" + data.docentes + "' WHERE codigo_asignatura = '" + data.codigo + "'"
                
                cn.Update(sql, (res) => {
                    if (res) {
                        data.accion = "actualizó los Docentes asignados para la Asignatura con el Código " + data.codigo
                        
                        log.inRegistro(data, (res) => {
                            if (res) {
                                return
                            } else {
                                flag = false
                                return
                            }
                        })
                    } else {
                        flag = false
                        return
                    }
                })
            }
            
            if (flag) {
                data.accion = "actualizó el registro con el Código " + data.codigo + " en Asignatura"
                
                log.inRegistro(data, (res) => {
                    if (res) {
                        next(res)
                    } else {
                        next(false)
                    }
                })   
            } else {
                next(false)
            }
            
        } else {
            next(false)
        }
    })
}

model.removeAsignatura = (data, next) => {
    var sql = "DELETE FROM docente_asignatura WHERE codigo_asignatura = '" + data.codigo + "'"
    
    cn.Remove(sql, (res) => {
        if (res) {
            data.accion = "eliminó todos los docentes asignados a la Asignatura con el código " + data.codigo
            
            log.inRegistro(data, (res) => {
                if (res) {
                    sql = "DELETE FROM asignatura WHERE codigo = '" + data.codigo + "'"
                    
                    cn.Remove(sql, (res) => {
                        if (res) {
                            data.accion = "eliminó el registro de Asignatura con el código " + data.codigo
                            
                            log.inRegistro(data, (res) => {
                                (res) ? next(res) : next(false)
                            })
                            
                        } else {
                            next(false)
                        }
                    })
                    
                } else {
                    next(false)
                }
            })
        } else {
            next(false)
        }
    })
}

module.exports = model