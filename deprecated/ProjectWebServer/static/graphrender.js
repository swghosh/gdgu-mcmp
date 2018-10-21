var xhttp = new XMLHttpRequest()
xhttp.open("GET", "archivedsensordata.dyn.json", true)

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
        return item.sensorData.soilMoist.value
    })

    chartGenerate('Soil Moisture (' + items[0].sensorData.soilMoist.unit + ')', labels, values)
}