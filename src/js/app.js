
var initialPlaces = {
	"places":
	[{
		"geometry" : {
			"location" :{
				"lat" : function(){return "40.715813"},
				"lng" : function(){return "-74.009433"}
			} 	
		},
		"name" : "Acappella"
	},{
		"geometry" : {
			"location" :{
				"lat" : function(){return "40.798033"},
				"lng" : function(){return "-73.968941"}
			} 	
		},
		"name" : "BroadWay Restaurant"
	},{
		"geometry" : {
			"location" :{
				"lat" : function(){return "40.745875"},
				"lng" : function(){return "-73.993713"}
			} 	
		},
		"name" : "B&B Restaurant Corp"

	},{
		"geometry" : {
			"location" :{
				"lat" : function(){return "40.761693"},
				"lng" : function(){return "-73.981881"}
			} 	
		},
		"name" : "Le Bernadrin"
	},{
		"geometry" : {
			"location" :{
				"lat" : function(){return "40.764967"},
				"lng" : function(){return "-73.979424 "}
			} 	
		},
		"name" : "Russian Tea Room"

	}]
}
var Place = function(data){
   // console.log(data);
   this.lat = ko.observable(data.geometry.location.lat());
   this.lng = ko.observable(data.geometry.location.lng());
   this.name = ko.observable(data.name);
};

var ViewModel = function(){
	// console.log("hai ");
	var self =this;
	this.myquery = ko.observable();
	this.mylist = ko.observableArray([]);
    this.placeList = ko.observableArray([]);

    initialPlaces.places.forEach(function(placeitem){
    	var place=new Place(placeitem);
    	self.placeList.push(place);
    	// self.addObjects(place);  
    	// console.log("inside initial push");
    	createMarker(place);
    	// self.addItems(place.name);
    	self.mylist.push(place.name);
    });

    // add the objects u recieve from google nearbysearch to an observable array
    this.addObjects = function(data){
    	var place = new Place(data);
    	self.placeList.push(place);
    	createMarker(place);
    }
   // creates the list with names
	this.addItems = function(data){
		self.mylist.push(data);

	}

// when u type in new filter to search for and click filter button ,this function calls performSearch to search for keyword u typed
	this.filter = function(){
		self.mylist.removeAll();
		// console.log("filer results");
		// console.log(this.myquery());
		if(this.myquery()){
			// console.log("inside filter");
			performSearch();
		}
	}

	this.itemClicked =function(index){
		// console.log("hi");
		// console.log(index);
		google.maps.event.trigger(markers[index],'click');

	}
};




