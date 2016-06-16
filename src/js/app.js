
var initialPlaces = {
	"places":
	[{
		"geometry" : {
			"location" :{
				"lat" : "40.715813",
				"lng" : "-74.009433"
			} 	
		},
		"name" : "Acappella"
	}]
}

var Place = function(data){
   console.log(data);
   this.lat = ko.observable(data.geometry.location.lat);
   this.lng = ko.observable(data.geometry.location.lng);
   this.name = ko.observable(data.name);
};

var ViewModel = function(){
	console.log("hai ");
	var self =this;
	this.myquery = ko.observable();
	this.mylist = ko.observableArray([]);
    this.placeList = ko.observableArray([]);

    initialPlaces.places.forEach(function(placeitem){
    	var place=new Place(placeitem);
    	self.placeList.push(place);
    	console.log("inside initial push");
    	createMarker(place);
    });

    // add the objects u recieve from google nearbysearch to an observable array
    this.addObjects = function(data){
    	self.placeList.push(new Place(data));
    }

	this.addItems = function(data){
		self.mylist.push(data);

	}

// when u type in new filter to search for and click filter button ,this function calls performSearch to search for keyword u typed
	this.filter = function(){
		self.mylist.removeAll();
		// console.log("filer results");
		// console.log(this.myquery());
		if(this.myquery()){
			console.log("inside filter");
			performSearch();
		}
	}

	this.itemClicked =function(index){
		// console.log("hi");
		// console.log(index);
		google.maps.event.trigger(markers[index],'click');

	}
};

var MyVM= new ViewModel();

ko.applyBindings(MyVM);