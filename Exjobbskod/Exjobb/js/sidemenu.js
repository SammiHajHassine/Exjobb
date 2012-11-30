var SideMenus = function() {
	this.numberOfActiveMenus = 0;
	this.activeMenus = [];

	this.openSideMenus = function() {
		switch(this.numberOfActiveMenus) {
			case 0: 	
				var sideMenu1 = $('#sideMenu1');
				sideMenu1.animate({width: "80%"}, 150);
				this.activeMenus.push(sideMenu1);
				break;
			case 1: 
				$('#sideMenu1').animate({width: "80%"}, 150);	
				$('#sideMenu2').animate({width: "70%"}, 150);
				break;
		}
	}

	this.openMenu = function() {
		var item = $(arguments[1].item).find('div').first();
		item.css("top", "0");
		item.animate({width: "90%"}, 150);
		this.activeMenus.push(item);
	}

	this.returnToStart = function() {
		console.log(this.activeMenus)
		this.numberOfActiveMenus = 0;
	}
};

SideMenus.prototype.observe = observerPattern.observe;