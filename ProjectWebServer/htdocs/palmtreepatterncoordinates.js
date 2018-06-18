const x0 = 88.4493781, y0 = 22.5838757, del = 0.0009

const nInit = 3
const nLimit = 20

function palmTreeCoordinates() {
    var places = [{
        lat: y0, lng: x0
    }]

    for(var n = nInit; n < nLimit; n++) {

        var theta = (2 * Math.PI) / n

        for(var index = 0; index < n; index++) {

            var currentAngle = theta - (Math.PI / 2) + (index * theta)
            var currentDel = del * (n - nInit + 1)

            var currentX = x0 + currentDel * Math.cos(currentAngle), currentY = y0 + currentDel * Math.sin(currentAngle)
            places.push({
                lat: currentY, lng: currentX
            })
        }
    }

    return places
}
