var map;
var myLatLng = {
    lat: 40.7128,
    lng: -74.0059

};

// View Model 
var MyVM;

//Foursquare API uses this for authorization
var CLIENT_ID = "N0SQW20V1HZLIJ0SGCBP132CIEC55HKDR4KCX1LJ4U5YE3Q2";
var CLIENT_SECRET = "WHVNHIRBFRTG20FQEITL2GAB1WFSXSAUEGA00ZHIBA5U4L1B";
var foursquare_url;

/*
called when google maps have been loaded successfully
ViewModel gets created and app.js kicks in from here
*/

function initMap() {
    map = new google.maps.Map(document.getElementById('map-canvas'), {
        center: myLatLng,
        zoom: 15
    });
    services = new google.maps.places.PlacesService(map);
    MyVM = new ViewModel();
    ko.applyBindings(MyVM);
    MyVM.initialise();
}

/*sents request to foursquare API and response recieved is added
to the observable array placeList
*/

function performSearch() {
    foursquare_url = 'https://api.foursquare.com/v2/venues/search?ll=40.7128,-74.0059' +
        '&categoryId=4bf58dd8d48988d16a941735,4bf58dd8d48988d1e0931735,4bf58dd8d48988d163941735&radius=800' +
        '&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET + '&v=20130815';
    $.ajax(foursquare_url)
        .done(function(data) {
            console.log(data);
            data.response.venues.forEach(function(obj) {
                MyVM.addObjects(obj);
            });
        })
        .fail(function() {
            alert("foursquare API request failed");
        });
}

// called when google maps falis to load

function googleError() {
    alert("map not loaded");
}