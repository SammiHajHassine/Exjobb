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

	this.returnToStart = function() {
		if(this.menusOpen) {
			var openmenus = this.openSideMenus();
		}


		this.menus = [this.curr];
		this.currentMenu = "sideMenu1";
		$("#" + this.currentMenu + this.selectPTags).css("margin-left", "100px")
	}

	this.itemClicked = function() {
		var item = $(arguments[1].item).next("div");
		var menu = item[0].attributes[0].value;

		if(menu != this.currentMenu) {
			this.currentMenu = menu;

			if(this.indexOfRowContainingId(menu) == -1) {
				var newM = this.createMenuObject(this.currentMenu, "open", arguments[1].item.innerText, item[0].className);
				var len = $("#" + newM.menu).find('> .headline').length;
				
				if(len === 0) {
					this.appendMenuHeadline(newM.menu, newM.headline)
				}
				
				this.numberOfActiveMenus++;
			}
		}

		var openmenu = this.openMenus(this.indexOfRowContainingId(menu));
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

	this.openActiveMenus = function() {	
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

	this.hideMenus = function(id) {
		var selectedmenu = this.menus[id];
		var width = 260;
		var selectedIndex = id;
		
		for (var i = this.menus.length; i > selectedIndex; i--) {
			//Get the current menu in the list of active menus
			var currentmenu = $("#" + this.menus[i-1].menu); 

			//Animate the menu width,hide its p tags and change the direction of its menu arrow
			currentmenu.animate({width: width + "px"}, 250);
			var changeArrow = this.changeDirectionOfArrow("#" + this.menus[i-1].menu, "right");

			//Hide the p tags and headline of the menu
			currentmenu.find(this.selectPTags).hide();
			currentmenu.find('> .headline').hide();

			//Denote the current menu as closed
			this.menus[i-1].status = "closed";

			width += 100; 
		}
		 
		
		//If there are open menus to the right of the one/ones being closed, positon p tags accordingly 
		//with the correct width and make them visible
		var tempMenu = $("#"+ this.menus[selectedIndex-1].menu);
		if(tempMenu != null) {
			tempMenu.find(this.selectPTags).css("margin-left", (width-50) + "px");
			tempMenu.find('> .headline').css("margin-left", (width-100) + "px");	
		}
		if(selectedIndex != 0) {
			tempMenu.find(this.selectPTags).show();
			tempMenu.find('> .headline').show();
		}	
	}

	this.openMenus = function(id) {
		var selectedmenu = this.menus[id];
		var selectedIndex = id;

		//Values in menuPositionValues: 0=top, 1=left, 2=width 
		var menuPositionValues = ["0", "90%", "85%"];
		
		for (var i = selectedIndex; i >= 0; i--) {
			if(parseInt(selectedIndex) != (this.menus.length-1)) {
				menuPositionValues[1] = 100 + (100 * (this.menus.length - selectedIndex));
			}

			//Get the current menu and its p tags
			var currentmenu = $("#"+ (this.menus[i].menu));	
			
			//If it's not the first menu the top-property needs to be set to 0 manually
			if(i != 0) {
				currentmenu.css("top", menuPositionValues[0]);
			}

			//Animate the width of the menu, set the position of its p tags, and change the direction of its menu arrow
			currentmenu.animate({width: menuPositionValues[2]}, 250);
			currentmenu.find(this.selectPTags).css("margin-left", menuPositionValues[1] + "px");	
			var changeArrow = this.changeDirectionOfArrow("#" + this.menus[i].menu, "left");

			//Denote the menu as open
			this.menus[i].status = "open";
		}
		
		//Only show one menu's, the selected one's, p tags
		var openedmenu = $("#" + selectedmenu.menu);
		
		//Position and show the headline of the opened menu
		var leftmargin = parseInt(openedmenu.find(this.selectPTags).css("margin-left").substring(0, 3)) - 50;
		
		var openedmenuHeadline = openedmenu.find('> .headline');
		openedmenuHeadline.css("margin-left", leftmargin + "px");	

		openedmenu.find(this.selectPTags).show();
		openedmenuHeadline.show();
		
		return openedmenu;
	}


	this.indexOfRowContainingId = function(id) {
		for (var i=0, len=this.menus.length; i<len; i++) {
		    if(id == this.menus[i].menu) {
		    	return i;
		    }
		 }
		return -1;
	}

	this.indexOfRowContainingLevel = function(level) {
		for (var i=0, len=this.menus.length; i<len; i++) {
		    if(level == this.menus[i].level) {
		    	return i;
		    }
		 }
		return -1;
	}

	this.appendMenuHeadline = function(element, headline) {
		var hTag = document.createElement("h2");
		hTag.innerText = headline;
		hTag.setAttribute('class', 'headline')
		
		$("#" + element).prepend(hTag);
	}

	this.changeDirectionOfArrow = function(object, direction) {
		var element = $(object);
		var leftselector = " > .leftimg",
			rightselector = " > .rightimg";

		if(direction === "left") {
			element.find(leftselector)[0].style['display'] = "block";
			element.find(rightselector)[0].style['display'] = "none";
		}	

		else {
			element.find(rightselector)[0].style['display'] = "block";
			element.find(leftselector)[0].style['display'] = "none";
		}	
	}

	this.createMenuObject = function(newmenu, newstatus, newheadline, newlevel) {
		var newMenuObject = {
			menu : newmenu,
			status: newstatus,
			headline: newheadline,
			level: newlevel
		}

		if(this.indexOfRowContainingLevel(newlevel) != -1) {
			var menuSelector = this.menus[this.indexOfRowContainingLevel(newlevel)].menu;
			$("#" + menuSelector).css("width", "0");
			this.menus[this.indexOfRowContainingLevel(newlevel)] = newMenuObject;
		}
		else {
			this.menus.push(newMenuObject);
		}
		return newMenuObject;
	}
};

SideMenus.prototype.observe = observerPattern.observe;