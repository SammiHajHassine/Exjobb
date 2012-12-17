var MenuHandler = function() {
	this.item = "";
	this.observers = [];
}

MenuHandler.prototype.distribute = observerPattern.distribute;
var imagehandler = new imageHandler();
var menuhandler = new MenuHandler();
var sidemenus = new SideMenus();

sidemenus.observe(menuhandler, "openActiveMenus", sidemenus.openActiveMenus);
sidemenus.observe(menuhandler, "itemClicked", sidemenus.itemClicked);
sidemenus.observe(menuhandler, "returnToStart", sidemenus.returnToStart);
sidemenus.observe(menuhandler, "arrowClicked", sidemenus.arrowClicked);


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







