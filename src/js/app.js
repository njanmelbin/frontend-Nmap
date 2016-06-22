 
var initialPlaces = {
	"places": [{

		"location": {
			"lat": "40.7127047",
			"lng": "-74.0058663",
			"formattedAddress": ["723 (Btwn w 23rd & 24th Street)", "New York, NY 10010"]
		},
		"name": "Halal Food Cart",
		"categories": [{
			"name": "Indian Restaurant",
			"pluralName": "Indian Restaurants"

		}]
	}, {
		"location": {
			"lat": "40.716134",
			"lng": "-74.007316",
			"formattedAddress": ["190 Church St", "New York, NY 10013"]
		},
		"name": "Graffiti Earth",
		"categories": [{
			"name": "Indian Restaurant",
			"pluralName": "Indian Restaurants"

		}]

	}, {
		"location": {
			"lat": "40.716610714191454",
			"lng": "-74.01460867595348",
			"formattedAddress": ["New York, NY 10038", "United States"]
		},
		"name": "29. Private Kitchen",
		"categories": [{
			"name": "Indian Restaurant",
			"pluralName": "Indian Restaurants"

		}]

	}, {
		"location": {
			"lat": "40.715191908398225",
			"lng": "-74.01120185852051",
			"formattedAddress": ["65 W Broadway", "New York, NY 10007"]
		},
		"name": "Bangal Curry",
		"categories": [{
			"name": "Indian Restaurant",
			"pluralName": "Indian Restaurants"
		}]

	}, {
		"location": {
			"lat": "40.715614",
			"lng": "-74.007545",
			"formattedAddress": ["176 Church Street (between Duane and Reade Streets)", "New York, NY"]
		},
		"name": "Baluchi's Kitchen",
		"categories": [{
			"name": "Indian Restaurant",
			"pluralName": "Indian Restaurants"
		}]

	}]
}

var Place = function(data) {
    this.lat = ko.observable(data.location.lat);
    this.lng = ko.observable(data.location.lng);
    this.categoryName = ko.observable(data.categories[0].name.toLowerCase());
    this.pluralName = ko.observable(data.categories[0].pluralName.toLowerCase());
    this.name = ko.observable(data.name);
    var mycor = new google.maps.LatLng(this.lat(), this.lng());
    var marker = new google.maps.Marker({
        position: mycor,
        map: map
    });
    this.marker = ko.observable(marker);
    var contentString = '<h3>' + data.name + '</h3>' +
        '<h4>' + data.location.formattedAddress[0] + '</h4>' +
        '<h4>' + data.location.formattedAddress[1] + '</h4>';
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    google.maps.event.addListener(marker, 'click', function() {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        infowindow.open(map, marker);
    });

    google.maps.event.addListener(infowindow, 'closeclick', function() {
        marker.setAnimation(null);
    });
};

var ViewModel = function() {
	
    var self = this;
    this.myquery = ko.observable('');
    this.mylist = ko.observableArray([]);
    this.placeList = ko.observableArray([]);


    /*   add the objects u recieve from search to an observable array
        By default , all the elements are to be displayed.So,added to mylist
        mylist observable array always contain a subset of objects to be displayed
        @param dataobject
    */
    this.addObjects = function(data) {
        var place = new Place(data);
        self.placeList.push(place);
        // self.mylist.push(place);
    };

    /*  when u type in new filter to search for ,
        this  search for keyword u typed
        forms a subset of filtered locations in the mylist observable array
    */


    this.filteredresult = ko.computed(function(){
        self.mylist.removeAll();
        var search = self.myquery().toLowerCase();
        // console.log(search);
        self.placeList().forEach(function(place){
            var str = place.name().toLowerCase();
            if (search === place.categoryName() || search === place.pluralName()) {
                place.marker().setVisible(true);
                self.mylist.push(place);
            } 
            else if(str.indexOf(search)!==-1){
                // console.log(str);
                self.mylist.push(place);
                place.marker().setVisible(true);
            }
            else{
                place.marker().setVisible(false);
            }
        });
    },this);

    /*    initalises the observable array with values obtained from API request and hard-coded values
        performSearch is used to get data from API
    */
    this.initialise = function() {
        performSearch();
        initialPlaces.places.forEach(function(data) {
            var place = new Place(data);
            self.placeList.push(place);
            // self.mylist.push(place);
        });
    };

    /*	when an item is clicked on the list ,an click event is triggered
    	for the corresponding object marker
    	@param object
    */
    this.itemClicked = function(obj) {
        google.maps.event.trigger(obj.marker(), 'click');

    };
};


