var MenuHandler = function() {
	this.item = "";
	this.observers = [];
}

MenuHandler.prototype.distribute = observerPattern.distribute;
var imagehandler = new imageHandler();
var menuhandler = new MenuHandler();
var instance = new SideMenus();

instance.observe(menuhandler, "openActiveMenus", instance.openSideMenus);
instance.observe(menuhandler, "itemClicked", instance.itemClicked);
instance.observe(menuhandler, "returnToStart", instance.returnToStart);
instance.observe(menuhandler, "arrowClicked", instance.arrowClicked);


$('#navImg').click(function() {
	menuhandler.distribute('openActiveMenus');
});

$('.item').click(function() {
	menuhandler.item = this;
	menuhandler.distribute('itemClicked');
});

$('#logo').click(function() {
	menuhandler.distribute('returnToStart');
});

$('.arrowimg').click(function() {
	menuhandler.item = this;
	menuhandler.distribute('arrowClicked');
});




