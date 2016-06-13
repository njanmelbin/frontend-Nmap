// var locations=['mumbai','delhi','kochi','chennai'];
// global map variable
var map;
console.log("map ");

//  function initialize gets called when page gets loaded
var infowindow;
var myLatLng={
            lat: -34.397,
            lng: 150.644

};

// function creates a map centered at given latitude and longitude
// createMapMarker function gets called

function initMap() {
    console.log("init map calle");
    map = new google.maps.Map(document.getElementById('map-canvas'), {
        center: myLatLng ,
        zoom: 12
    });
 	var marker = new google.maps.Marker({
    position: myLatLng,
    map: map
    });

 	services = new google.maps.places.PlacesService(map);

 	google.maps.event.addListenerOnce(map,'bounds_changed',performSearch);
}
// a map marker gets created for a given lattitude and longitude
// a infowindow is attached to the map marker
// note that every object creationin map class takes options as arguments

function createMarker(place){
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
  	infowindow = new google.maps.InfoWindow({
  		content : place.name
  	});
  	// console.log(place.name);
    infowindow.open(map, this);
  });
}

//function to filter the results

function performSearch(){
	console.log("perform search");
	var request={
		bounds : map.getBounds(),
		name : "Park" 
	}

	services.nearbySearch(request, callback);

}

// function to call on retrieval of results

function callback(results,status) {
	console.log(results);
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

// after the DOM is loaded initMap gets called
window.addEventListener('load', initMap);