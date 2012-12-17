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

	/*** CLICK FUNCTIONS ***/
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

	/*** MENU ACTION FUNCTIONS ***/
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

	this.returnToStart = function() {
		if(this.menusOpen) {
			var openmenus = this.openSideMenus();
		}


		this.menus = [this.curr];
		this.currentMenu = "sideMenu1";
		$("#" + this.currentMenu + this.selectPTags).css("margin-left", "100px")
	}

	this.hideMenus = function(id) {
		var selectedmenu = this.menus[id];
		var width = 250;
		var selectedIndex = id;

		for (var i = this.menus.length -1 ; i >= selectedIndex; i--) {
			//Get the current menu in the list of active menus
			var currentMenuName = this.menus[i].menu,
				currentmenu = $("#"+ currentMenuName); 
			
			
			//Animate the menu width,hide its p tags and change the direction of its menu arrow
			currentmenu.animate({width: width + "px"}, 250);
			var changeArrow = this.changeDirectionOfArrow("#" + currentMenuName, "right");

			//Hide the p tags and headline of the menu
			currentmenu.find(this.selectPTags).animate({marginLeft: "-500px"}, 200);
			currentmenu.find('> .headline').animate({marginLeft: "-500px"}, 200);

			//Denote the current menu as closed
			this.menus[i].status = "closed";

			width += 100; 
		}
		 
		if(selectedIndex != 0) {
			var menuBehindClosedMenus = $("#"+ this.menus[selectedIndex -1].menu);
			
			//positon p tags and headline accordingly with the correct widthones being closed
			menuBehindClosedMenus.find(this.selectPTags).css("margin-left", (width-50) + "px");	
			menuBehindClosedMenus.find('> .headline').css("margin-left", (width-100) + "px");
		}
			
	}

	this.openMenus = function(id) {
		var selectedIndex = id;
		
		for (var i = selectedIndex; i >= 0; i--) {
			var width = 800 - (i * 80),
			listItemsMarginLeft = 100 + (100 * (this.menus.length - selectedIndex)),
			headlineMarginLeft = listItemsMarginLeft -50,
			currentmenu = $("#"+ (this.menus[i].menu));	
			
			//If it's not the first menu the top-property needs to be set to 0 manually
			if(i != 0) {
				currentmenu.css("top", "-1px");
			}

			//Animate the width of the menu, set the position of its p tags, and change the direction of its menu arrow
			currentmenu.animate({width: width + "px"}, 200);
			//currentmenu.find(this.selectPTags).css("margin-left", listItemsMarginLeft + "px");	
			currentmenu.find(this.selectPTags).animate({marginLeft: listItemsMarginLeft + "px"}, 200);	
			currentmenu.find('> .headline').animate({marginLeft: headlineMarginLeft + "px"}, 200);	
			var changeArrow = this.changeDirectionOfArrow("#" + this.menus[i].menu, "left");

			//Denote the menu as open
			this.menus[i].status = "open";
		}
		
		//Show selected menus pTags and headline 
		var openedmenu = $("#" + this.menus[selectedIndex].menu);
		//openedmenu.find(this.selectPTags).show();
		openedmenu.find('> .headline').show();
		
		return openedmenu;
	}

	/*** MENU HELPER FUNCTIONS ***/
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