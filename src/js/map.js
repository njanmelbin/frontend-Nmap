// var locations=['mumbai','delhi','kochi','chennai'];
// global map variable
var map;
// console.log("map ");
var markers = [];
//  function initialize gets called when page gets loaded
//new york coordinates -40.7128° N, 74.0059°
var infowindow;
var myLatLng = {
    lat: 40.7128,
    lng: -74.0059

};
var MyVM;
//Foursquare API uses this
var CLIENT_ID = "N0SQW20V1HZLIJ0SGCBP132CIEC55HKDR4KCX1LJ4U5YE3Q2";
var CLIENT_SECRET = "WHVNHIRBFRTG20FQEITL2GAB1WFSXSAUEGA00ZHIBA5U4L1B";

// function creates a map centered at given latitude and longitude
// perform search is called

function initMap() {
    // console.log("init map calle");
    map = new google.maps.Map(document.getElementById('map-canvas'), {
        center: myLatLng,
        zoom: 12
    });
    // console.log("map created");
/*    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map
    });
*/
    services = new google.maps.places.PlacesService(map);
    MyVM = new ViewModel();
    ko.applyBindings(MyVM);
    // google.maps.event.addListenerOnce(map, 'bounds_changed', appstart);
}
// a map marker gets created for a given lattitude and longitude
// a infowindow is attached to the map marker
// note that every object creationin map c lass takes options as arguments
// pushes marker into markers arry
function createMarker(place) {
    // var lat= place.lat();
    // console.log(lat);
    var mycor = new google.maps.LatLng(place.lat(),place.lng());
    // console.log(mycor);
    var marker = new google.maps.Marker({
        position: mycor,
        map : map
    });
    // console.log("marker created");
    // console.log(marker);
    markers.push(marker);

    //url for contacting the foursquare API  
    var foursquare_url = 'https://api.foursquare.com/v2/venues/search?ll=' + place.lat() + ',' + place.lng() + '&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET + '&v=20130815';
    // console.log(foursquare_url);
    var contentString;
    google.maps.event.addListener(marker, 'click', function() {

        $.ajax({
            url: foursquare_url,
            dataType: "json",
            success: function(data) {
/*                console.log(data.response.venues[0].name);
                console.log(data.response.venues[0].location.address);
                console.log(data.response.venues[0].location.city);
                console.log(data.response.venues[0]);
*/                contentString = '<h3>' + data.response.venues[0].name + '</h3>' +
                    '<h4>' + data.response.venues[0].location.address + '</h4> ' +
                    '<h4>' + data.response.venues[0].location.city + '</h4>';
                console.log(contentString);
                infowindow = new google.maps.InfoWindow({
                    content: contentString
                });
                infowindow.open(map, marker);


            },
            error : function(){
                alert("Not able to reach Foursquare API");
            }
        });
        // console.log(contentString);

        // console.log(place.name);
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

function performSearch() {
    DeleteMarkers();
    console.log("perform search");
    // console.log(data);
    var request = {
        bounds: map.getBounds(),
        name: MyVM.myquery()
    }
    console.log(MyVM.myquery());
    services.nearbySearch(request, callback);

}

// function to call on retrieval of results

function callback(results, status) {
    console.log(results);
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            MyVM.addItems(results[i].name);
            MyVM.addObjects(results[i]);
        }
    }
}

// after the DOM is loaded initMap gets called
window.addEventListener('load', initMap);