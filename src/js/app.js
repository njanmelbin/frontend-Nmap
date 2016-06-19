 
var initialPlaces = {
	"places":
	[{
		
		"location" :{
				"lat" : "40.7127047",
				"lng" : "-74.0058663",
				"formattedAddress" : ['723 (Btwn w 23rd & 24th Street)','New York, NY 10010']				
		}, 	
		"name" : "Halal Food Cart",
		"categories" :[{
			"name" : "Indian Restaurant",
			"pluralName" : "Indian Restaurants"

		}]
	},{
		"location" :{
				"lat" : "40.716134",
				"lng" : "-74.007316",
				"formattedAddress" : ['"190 Church St"','"New York, NY 10013"']				
		}, 	
		"name" : "Graffiti Earth",
		"categories" :[{
			"name" : "Indian Restaurant",
			"pluralName" : "Indian Restaurants"

		}]

	},{
		"location" :{
				"lat" : "40.716610714191454",
				"lng" : "-74.01460867595348",
				"formattedAddress" : ['New York, NY 10038','United States']				
		}, 	
		"name" : "29. Private Kitchen",
		"categories" :[{
			"name" : "Indian Restaurant",
			"pluralName" : "Indian Restaurants"

		}]

	},{
		"location" :{
				"lat" : "40.715191908398225",
				"lng" : "-74.01120185852051",
				"formattedAddress" : ['65 W Broadway','New York, NY 10007']				
		}, 	
		"name" : "Bangal Curry",
		"categories" :[{
			"name" : "Indian Restaurant",
			"pluralName" : "Indian Restaurants"
		}]

	},{
		"location" :{
				"lat" : "40.715614",
				"lng" : "-74.007545",
				"formattedAddress" : ['176 Church Street (between Duane and Reade Streets)','New York, NY']				
		}, 	
		"name" : "Baluchi's Kitchen",
		"categories" :[{
			"name" : "Indian Restaurant",
			"pluralName" : "Indian Restaurants"
		}]

	}]
}
var Place = function(data){
   // console.log(data);
   this.lat = ko.observable(data.location.lat);
   this.lng = ko.observable(data.location.lng);
   this.categoryName = ko.observable(data.categories[0].name.toLowerCase());
   this.pluralName = ko.observable(data.categories[0].pluralName.toLowerCase());
   this.name = ko.observable(data.name);
   var mycor = new google.maps.LatLng(this.lat(),this.lng());
    // console.log(mycor);
   var marker = new google.maps.Marker({
        position: mycor,
        map : map
    });
   this.marker = ko.observable(marker);
   var contentString = '<h3>'+ data.name +'</h3>'+
   						'<h4>'+ data.location.formattedAddress[0] +'</h4>'+
   						'<h4>'+ data.location.formattedAddress[1] +'</h4>';
   var infowindow = new google.maps.InfoWindow({
   		content : contentString
   })
   google.maps.event.addListener(marker, 'click', function() {
   		infowindow.open(map,marker);
   });
   this.infowindow = ko.observable(infowindow);
   // console.log(this.infowindow());
    // console.log(this.marker());
    // console.log("marker created");
    // console.log(marker);
    // console.log(this.categoryName());

   // console.log(data);
   // console.log(this.lat());
};

var ViewModel = function(){
	// console.log("hai ");
	var self =this;
	this.myquery = ko.observable();
	this.mylist = ko.observableArray([]);
    this.placeList = ko.observableArray([]);

    // initialPlaces.places.forEach(function(placeitem){
    // 	var place=new Place(placeitem);
    // 	self.placeList.push(place);
    // 	// self.addObjects(place);  
    // 	// console.log("inside initial push");
    // 	createMarker(place);
    // 	// self.addItems(place.name);
    // 	self.mylist.push(place.name);
    // });

    // add the objects u recieve from search to an observable array
    this.addObjects = function(data){
    	// console.log("inside addobj");
    	var place = new Place(data);
    	self.placeList.push(place);
    	self.mylist.push(place);
    	// createMarker(place);
    }
   // creates the list with names
	// this.addItems = function(data){
		// self.mylist.push(data);
// 
	// }

    this.initialise = function(){
    	performSearch();
    	initialPlaces.places.forEach(function(data){
    		var place = new Place(data);
    		self.placeList.push(place);
    		self.mylist.push(place);
    	});
    }
// when u type in new filter to search for and click filter button ,this function calls performSearch to search for keyword u typed
	this.filter = function(){
		self.mylist.removeAll();
		// ko.utils.arrayForEach(this.placeList(),function(obj){
			// console.log(obj.categoryName());
			// console.log(self.myquery().toLowerCase());
		self.placeList().forEach(function(obj){
			if(self.myquery().toLowerCase()===obj.categoryName()|| self.myquery().toLowerCase()===obj.pluralName()){
				obj.marker().setVisible(true);
				self.mylist.push(obj);
			}
			else{
				obj.marker().setVisible(false);
			}

		});
		// self.mylist.removeAll();
		// console.log("filer results");
		// console.log(this.myquery());
/*		if(self.myquery().toLowerCase()==="coffee shop"){
			// console.log("inside filter");
			// performSearch();
			ko.utils.arrayForEach(this.placeList(),function(obj){
				// console.log(obj.lat());
				if(obj.id()==="4bf58dd8d48988d1e0931735"){
					// console.log("inside coofe sop");
					obj.marker().setVisible(true);
					// console.log(obj.marker().Visible);
				}else{
					// console.log(obj.id());
					// console.log("inside other shop");
					obj.marker().setVisible(false);
				}
			});	
		}
		if(self.myquery().toLowerCase()==="bakery"){
			ko.utils.arrayForEach(this.placeList(),function(obj){
				// console.log(obj.lat());
				if(obj.id()==="4bf58dd8d48988d16a941735"){
					// console.log("inside coofe sop");
					obj.marker().setVisible(true);
					// console.log(obj.marker().Visible);
				}else{
					// console.log(obj.id());
					// console.log("inside other shop");
					
					obj.marker().setVisible(false);
				}
			});	

		}
		if(self.myquery().toLowerCase()==="park"||self.myquery().toLowerCase()==="parks"){
			ko.utils.arrayForEach(this.placeList(),function(obj){
				// console.log(obj.lat());
				if(obj.id()===""){
					// console.log("inside coofe sop");
					obj.marker().setVisible(true);
					// console.log(obj.marker().Visible);
				}else{
					// console.log(obj.id());
					// console.log("inside other shop");
					
					obj.marker().setVisible(false);
				}
			});	

		}
*/
	}

	this.itemClicked =function(obj){
		// console.log("hi");
		// console.log(index);
		// console.log(obj);
		// console.log(obj.infowindow());
		obj.infowindow().open(map,obj.marker());

	}
};




