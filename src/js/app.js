// var locations=['mumbai','delhi','kochi','chennai'];

// global map variable
var map;
console.log("map map map map");

//  function initialize gets called when page gets loaded
 var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        });
      }

//set boundary based on pin locations
// window.mapBounds = new google.maps.LatLngBounds();

//fit map to bounds , bounds argument is from createMapMarkers 
// map.fitBounds(bounds) 


