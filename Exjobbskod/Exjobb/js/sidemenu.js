var SideMenus = function() {
	this.numberOfActiveMenus = 1;
	this.activeMenus = ["sideMenu1"];
	this.currentMenu = "sideMenu1";
	this.menusOpen = false;

	this.openSideMenus = function() {	
		if(this.menusOpen) {
			for (var i = 0; i < this.activeMenus.length; i++) {
				var menu = $("#" + this.activeMenus[i]);
				menu.animate({width: "0"}, 150);
			}
			this.menusOpen = false;
		}
		else {
			for (var i = 0; i < this.activeMenus.length; i++) {
				var menu = $("#" + this.activeMenus[i]);
				menu.animate({width: "90%"}, 150);
			}
			this.menusOpen = true;
		}
	}

	this.openMenu = function() {
		var item = $(arguments[1].item).find('div').first();
		item.css("top", "0");
		item.animate({width: "90%"}, 150);
		var menu = item[0].attributes[0].value;

		if(menu != this.currentMenu) {
			this.currentMenu = menu;

			if(this.activeMenus.indexOf(menu) == -1) {
				this.activeMenus.push(this.currentMenu);
			}
		}	
	}

	this.returnToStart = function() {
		if(this.menusOpen) {
			this.openSideMenus();
		}
		this.activeMenus = ["sideMenu1"];
	}
};

SideMenus.prototype.observe = observerPattern.observe;