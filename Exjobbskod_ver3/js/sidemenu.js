var SideMenus = function() {
	this.selectPTags = " >  ul > li > p";
	this.numberOfActiveMenus = 0;
	this.currentMenu = "sideMenu1";
	this.curr = {
		menu: "sideMenu1",
		status: "closed"
	};

	this.menusOpen = false;
	this.menus = [];
	this.menus.push(this.curr);

	this.openSideMenus = function() {	
		if(this.menusOpen) {
			for (var i = 0; i < this.menus.length; i++) {
				var menu = $("#" + this.menus[i].menu);
				menu.animate({width: "0"}, 250);
			}
			this.menusOpen = false;
		}
		else {
			var openmenus = this.openMenus(0);
			this.menusOpen = true;
		}
	}

	this.returnToStart = function() {
		if(this.menusOpen) {
			var openmenus = this.openSideMenus();
		}
		
		var marginLeft = 100;

		for (var i = 0; i < this.menus.length; i++) {
			var select = "#" + this.menus[i] + this.selectPTags;

			$(select).css("margin-left", marginLeft + "px");
			marginLeft += 50;
		}

		this.menus = [this.curr];
		this.currentMenu = "sideMenu1";
	}

	this.itemClicked = function() {
		var item = $(arguments[1].item).next("div");
		var menu = item[0].attributes[0].value;

		if(menu != this.currentMenu) {
			this.currentMenu = menu;

			if(this.indexOfRowContainingId(menu) == -1) {
				var newMenu = {
					menu : this.currentMenu,
					status: "open"
				}
				this.menus.push(newMenu);
				this.numberOfActiveMenus++;
			}
		}

		var openmenus = this.openMenus(this.indexOfRowContainingId(menu));
	}

	this.arrowClicked = function() {
		var id = $(arguments[1].item).context.parentElement.attributes[0].value;
		var index = this.indexOfRowContainingId(id);

		if(index >= 0) {
			var status = this.menus[index].status;

			if(status == "open") {
				var hidemenus = this.hideMenus(index);
			}
			else {
				var openmenus = this.openMenus(index);
			}
		}
	}

	this.hideMenus = function(id) {
		var selectedmenu = this.menus[id];
		var width = 240;
		var selectedIndex = id;
		var selectPTags = " >  ul > li > p";
		
		for (var i = this.menus.length; i > selectedIndex; i--) {
			$("#"+ (this.menus[i-1].menu)).animate({width: width + "px"}, 250);
			$("#"+ this.menus[i-1].menu + selectPTags).hide();
			
			var changeArrow = this.changeDirectionOfArrow("#" + this.menus[i-1].menu, "right");
			this.menus[i-1].status = "closed";
			width += 100; 
		}
		 
		$("#"+ this.menus[selectedIndex-1].menu + selectPTags).css("margin-left", (width-80) + "px");
		
		if(selectedIndex != 0) {
			$("#" + this.menus[selectedIndex-1].menu + selectPTags).show();
		}
		
	}

	this.openMenus = function(id) {
		var selectedmenu = this.menus[id];
		var width = "90%";
		var top = "0";
		var selectedIndex = id;
		var selectPTags = " >  ul > li > p";
		
		for (var i = selectedIndex; i >= 0; i--) {
			var curr = $("#"+ (this.menus[i].menu));			
			
			if(i != 0) {
				curr.css("top", top);
			}

			curr.animate({width: width}, 250);
			var changeArrow = this.changeDirectionOfArrow("#" + this.menus[i].menu, "left");
			$("#"+ this.menus[i].menu + selectPTags).hide();
			this.menus[i].status = "open";
		}
		
		$("#"+ this.menus[selectedIndex-1].menu + selectPTags).css("margin-left", (width) + "px");
		if(this.menus[selectedIndex +1] != null) {
			var prevWidth = $("#" + this.menus[selectedIndex +1] + this.selectPTags).css("margin-left");
			console.log(prevWidth);
			$("#"+ selectedmenu.menu + selectPTags).css("margin-left", (200*selectedIndex) + "px");
		}
		
		$("#"+ selectedmenu.menu + selectPTags).show();
	}

	this.indexOfRowContainingId = function(id) {
		for (var i=0, len=this.menus.length; i<len; i++) {
		    if(id == this.menus[i].menu) {
		    	return i;
		    }
		 }
		return -1;
	}

	this.changeDirectionOfArrow = function(object, direction) {
		if(direction === "left") {
			$(object + " > .leftimg")[0].style['display'] = "block";
			$(object + " > .rightimg")[0].style['display'] = "none";
		}	

		else {
			$(object + " > .leftimg")[0].style['display'] = "none";
			$(object + " > .rightimg")[0].style['display'] = "block";
		}	
	}
};


SideMenus.prototype.observe = observerPattern.observe;