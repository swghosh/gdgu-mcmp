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
        title: "GD Goenka University"
    });

    var infoWindow = new google.maps.InfoWindow({
        content: "At " + content.timestamp + " " + kind + " was " + content[kind].value + content[kind].unit + "."
    });
    marker.addListener('click', function() {
        infoWindow.open(map, marker);
    });
}