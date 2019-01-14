// expects variable kind to be set by any external script

var xhttp = new XMLHttpRequest()
xhttp.open("GET", "/live/data/" + kind, false)

// xhttp.onreadystatechange = function() {
//     if(this.readyState == 4 && this.status == 200) {
//     }
// }
xhttp.send()
let content = JSON.parse(xhttp.responseText)[0]

var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: content.latitude,
            lng: content.longitude
        },
        zoom: 16,
        mapTypeId: 'terrain'
    });

    var place = {
        lat: content.latitude,
        lng: content.longitude
    };

    var circle = new google.maps.Circle({
        radius: content.accuracy,
        map: map,
        center: place,
        strokeColor: '#006eff',
        strokeOpacity: '0.45',
        fillColor: '#006eff',
        fillOpacity: '0.35',
        strokeWeight: 2
    })
    var marker = new google.maps.Marker({
        position: place,
        map: map,
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            strokeColor: 'ff0077',
            strokeWeight: 10,
            scale: 10
        }
    });
    var infoWindow = new google.maps.InfoWindow({
        content: "<h2>" + new Date(content.timestamp).toLocaleString() + "</h2> <p><b>" + extendedKind + ":</b> <u>" + content.sensorData[kind].value + content.sensorData[kind].unit + "</u></p>"
    });
    marker.addListener('click', function() {
        infoWindow.open(map, marker);
    });
}