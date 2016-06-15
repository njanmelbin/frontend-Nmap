// knockout.js code
var ViewModel = function(){
	console.log("hai ");
	var self =this;
	this.myquery = ko.observable("Restaurant");
	this.mylist = ko.observableArray([]);

	this.addItems = function(data){
		self.mylist.push(data);
	}

// when u type in new filter to search for and click filter button ,this function calls performSearch to search for keyword u typed
	this.filter = function(){
		self.mylist.removeAll();
		// console.log("filer results");
		// console.log(this.myquery());
		performSearch();
	}

	this.itemClicked =function(index){
		// console.log("hi");
		// console.log(index);
		google.maps.event.trigger(markers[index],'click');

	}
};

var MyVM= new ViewModel();

ko.applyBindings(MyVM);