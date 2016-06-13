// var locations=['mumbai','delhi','kochi','chennai'];
// global map variable
var map;
console.log("map ");
var markers=[];
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
        zoom: 10
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
// pushes marker into markers arry
function createMarker(place){
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  markers.push(marker);

  google.maps.event.addListener(marker, 'click', function() {
  	infowindow = new google.maps.InfoWindow({
  		content : place.name
  	});
  	// console.log(place.name);
    infowindow.open(map, this);
  });
}

// function to delete all Markers

function DeleteMarkers() {
	console.log("delete markers");
        //Loop through all the markers and remove
      for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
        markers = [];
    };
//function to filter the results

function performSearch(){
	DeleteMarkers();
	console.log("perform search");
	// console.log(data);
	var request={
		bounds : map.getBounds(),
		name : MyVM.myquery()
	}

	services.nearbySearch(request, callback);

}

// function to call on retrieval of results

function callback(results,status) {
	console.log(results);
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
    	MyVM.addItems(results[i].name);
    	createMarker(results[i]);
    }
  }
}

// after the DOM is loaded initMap gets called
window.addEventListener('load', initMap);