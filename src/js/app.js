// var locations=['mumbai','delhi','kochi','chennai'];
// global map variable
var map;
console.log("map map map map");

//  function initialize gets called when page gets loaded
var map;

function initMap() {
    console.log("init map called");
    map = new google.maps.Map(document.getElementById('map-canvas'), {
        center: {
            lat: -34.397,
            lng: 150.644
        },
        zoom: 8
    });
}

window.addEventListener('load', initMap);