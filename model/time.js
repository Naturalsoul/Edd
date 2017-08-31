var time = {}

time.getTime = () => {
    var now = new Date()
    var fecha = now.getDate() + "-" + now.getMonth() + "-" + now.getFullYear() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds()
    
    return fecha
}

module.exports = time