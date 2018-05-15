content = JSON.parse(content);

function parseRecord(content) {
    var timestamp = new Date(content.timestamp);
    return `At <b>${timestamp.toString()}</b>, <br>The temperature was <b>${content.sensorData.parameter1}</b> deg C and the pressure was <b>${content.sensorData.parameter2}</b> mm Hg.`
}

var map;
function initMap() {
    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: content.latitude,
            lng: content.longitude
        },
        zoom: 13
    });

    var place = {
        lat: content.latitude,
        lng: content.longitude
    };
    var marker = new google.maps.Marker({
        position: place,
        map: map,
        title: "GD Goenka University"
    });

    var infoWindow = new google.maps.InfoWindow({
        content: parseRecord(content)
    });
    marker.addListener('click', function() {
        infoWindow.open(map, marker);
    });
}