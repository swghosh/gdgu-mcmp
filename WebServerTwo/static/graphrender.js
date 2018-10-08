var xhttp = new XMLHttpRequest()
xhttp.open("GET", "/archived/data/" + kind, true)

xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
        chartIt()
    }
}
xhttp.send()

function chartIt() {
    var items = JSON.parse(xhttp.responseText)

    var labels = items.map(function(item) {
        return new Date(item.timestamp).toLocaleString()
    })
    var values = items.map(function(item) {
        return item.sensorData[kind].value
    })

    chartGenerate(kind + ' (' + items[0].sensorData[kind].unit + ')', labels, values)
}