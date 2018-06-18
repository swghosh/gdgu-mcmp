var places = palmTreeCoordinates()

var map, markers = [], infoWindows = [];

const markerIcon = '//maps.google.com/mapfiles/ms/icons/blue-dot.png'

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: places[0],
        zoom: 15,
        mapTypeId: 'terrain'
    })
    markers = places.map(function(place, index) {
        let marker = new google.maps.Marker({
            position: place,
            icon: markerIcon,
            map: map
        })
        let infoWindow = new google.maps.InfoWindow({
            content: '<b> Station # ' + index + '</b> <br>environmental-network'
        })

        infoWindows.push(infoWindow)

        marker.addListener('click', function() {
            infoWindow.open(map, marker)
        })
        return marker
    })
}