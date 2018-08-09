var xhttp = new XMLHttpRequest()
xhttp.open("GET", "livesensordata.dyn.json", false)
xhttp.send()

var content = (function() {
    var items = JSON.parse(xhttp.responseText)
    return {
        timestamp: items[0].timestamp,
        sensorData: {
            soilMoist: items[0].sensorData.soilMoist,
            coTwoConc: items[1].sensorData.coTwoConc
        },
        latitude: items[0].latitude,
        longitude: items[0].longitude
    }
})()

function parseRecord(content) {
    var timestamp = new Date(content.timestamp);
    return `At <b>${timestamp.toString()}</b>, <br>The CO<sub>2</sub> concentration was <b>${content.sensorData.coTwoConc.value} ${content.sensorData.coTwoConc.unit}</b> and the soil moisture was <b>${content.sensorData.soilMoist.value} ${content.sensorData.soilMoist.unit}</b> mm Hg.`
}

var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: content.latitude,
            lng: content.longitude
        },
        zoom: 13,
        mapTypeId: 'terrain'
    });

    var place = {
        lat: content.latitude,
        lng: content.longitude
    };
    var marker = new google.maps.Marker({
        position: place,
        map: map,
        icon: '/droneicon.png',
        title: "GD Goenka University"
    });

    var infoWindow = new google.maps.InfoWindow({
        content: parseRecord(content)
    });
    marker.addListener('click', function() {
        infoWindow.open(map, marker);
    });
}