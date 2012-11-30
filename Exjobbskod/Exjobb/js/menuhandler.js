var MenuHandler = function() {
	this.item = "";
	this.observers = [];
}

MenuHandler.prototype.distribute = observerPattern.distribute;

var menuhandler = new MenuHandler();
var instance = new SideMenus();

instance.observe(menuhandler, "openActiveMenus", instance.openSideMenus);
instance.observe(menuhandler, "openMenu", instance.openMenu);
instance.observe(menuhandler, "returnToStart", instance.returnToStart);

$('#navImg').click(function() {
	menuhandler.distribute('openMenu');
});

$('.item').click(function() {
	menuhandler.item = this;
	menuhandler.distribute('openMenu');
});

$('#logo').click(function() {
	menuhandler.item = this;
	menuhandler.distribute('returnToStart');
});

