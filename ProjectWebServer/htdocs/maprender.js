var content = '{"timestamp": "2018-06-03T13:35:18.591560", "latitude": 28.2699415, "longitude": 77.0636767, "sensorChannel": "sensorA", "sensorData": {"parameter1": 49, "parameter2": 963}}';
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