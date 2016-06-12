// var locations=['mumbai','delhi','kochi','chennai'];
// global map variable
var map;
console.log("map ");

//  function initialize gets called when page gets loaded
var map;
var myLatLng={
            lat: -34.397,
            lng: 150.644

};

// function creates a map centered at given latitude and longitude
// createMapMarker function gets called

function initMap() {
    console.log("init map called");
    map = new google.maps.Map(document.getElementById('map-canvas'), {
        center: myLatLng ,
        zoom: 8
    });
 	createMapMarker();
}

// a map marker gets created for a given lattitude and longitude
// a infowindow is attached to the map marker
// note that every object creationin map class takes options as arguments

function createMapMarker(){
	var marker = new google.maps.Marker({
    position: myLatLng,
    map: map
  });
// console.log(marker);

var infowindow = new google.maps.InfoWindow({
    content: '<h1>Cool stuff here</h1>'
  });

marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}

window.addEventListener('load', initMap);