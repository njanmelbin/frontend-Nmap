var ViewModel = function(){
	console.log("hai ");
	var self =this;
	this.myquery = ko.observable("McDonalds's");
	this.mylist = ko.observableArray([]);

	this.addItems = function(data){
		self.mylist.push(data);
	}

	this.filter = function(){
		self.mylist.removeAll();
		console.log("filer results");
		console.log(this.myquery());
		performSearch(this.myquery());
	}
};

var MyVM= new ViewModel();

ko.applyBindings(MyVM);