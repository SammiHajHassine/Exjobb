var MenuHandler = function() {
	this.item = "";
	this.observers = [];
}

MenuHandler.prototype.distribute = observerPattern.distribute;
var imagehandler = new imageHandler();
var menuhandler = new MenuHandler();
var instance = new SideMenus();

instance.observe(menuhandler, "openActiveMenus", instance.openSideMenus);
instance.observe(menuhandler, "openMenu", instance.openMenu);
instance.observe(menuhandler, "returnToStart", instance.returnToStart);
instance.observe(menuhandler, "imageClicked", imagehandler.imageClicked);
instance.observe(menuhandler, "imageClicked", instance.imageClicked);


$('#navImg').click(function() {
	menuhandler.distribute('openActiveMenus');
});

$('.item').click(function() {
	menuhandler.item = this;
	menuhandler.distribute('openMenu');
});

$('#logo').click(function() {
	menuhandler.distribute('returnToStart');
});

$('.arrowimg').click(function() {
	menuhandler.item = this;
	menuhandler.distribute('imageClicked');
});




