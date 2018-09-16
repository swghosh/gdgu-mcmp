var divTop = document.querySelector('div.top')
var divContent = document.querySelector('div.content')

var nonZeroScroll = false

var nonZeroScrollTopBar = function() {
    if(!nonZeroScroll) {
        divTop.classList.add('nonzeroscroll')
        divTop.classList.add('smaller')
        divContent.classList.add('nonzeroscroll')

        nonZeroScroll = true            
    }
    // else {
    //     if(nonZeroScroll) {
    //         divTop.classList.remove('nonzeroscroll')
    //         divTop.classList.remove('smaller')
    //         divContent.classList.remove('nonzeroscroll')

    //         nonZeroScroll = false            
    //     }          
    // }
}

document.addEventListener('scroll', nonZeroScrollTopBar)