
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
   this.lat = ko.observable(data.location.lat);
   this.lng = ko.observable(data.location.lng);
   this.categoryName = ko.observable(data.categories[0].name.toLowerCase());
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
   this.infowindow = ko.observable(infowindow);
   console.log(this.infowindow());
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
    }
// when u type in new filter to search for and click filter button ,this function calls performSearch to search for keyword u typed
	this.filter = function(){
		self.mylist.removeAll();
		// ko.utils.arrayForEach(this.placeList(),function(obj){
			// console.log(obj.categoryName());
			// console.log(self.myquery().toLowerCase());
		self.placeList().forEach(function(obj){
			if(self.myquery().toLowerCase()===obj.categoryName()){
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
		console.log(obj);
		console.log(obj.infowindow());
		obj.infowindow().open(map,obj.marker());

	}
};




