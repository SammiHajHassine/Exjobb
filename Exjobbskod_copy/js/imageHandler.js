var imageHandler = function() {
	this.numberOfSideMenus = 0;
	this.sideMenus = [];
	this.menus = [{
		key: "",
		value : ""
	}];
	this.menuNumber = 1;
	this.select = "#sideMenu" + this.menuNumber;
	this.leftimg = $('.leftimg');
    this.rightimg = $('.rightimg');
    this.leftimg.css("display", "block");

	this.getNumberOfSideMenus = function() {
		var menu = $('body').find(this.select);
		while(menu.is("div") == true) {
			this.numberOfSideMenus++;
			this.menuNumber++;
			this.select = "#sideMenu" + this.menuNumber;
			this.sideMenus.push(menu);
			menu = $('body').find(this.select);
		}
	}

	this.appendNavImages = function() {
		for (var i = 0; i < this.sideMenus.length; i++) {
			this.sideMenus[i][0].appendChild(this.leftimg[0]);
			this.sideMenus[i][0].appendChild(this.rightimg[0]);
			this.leftimg = this.leftimg.clone();
			this.rightimg = this.rightimg.clone();
		};
	}

	this.imageClicked = function() {
		var item = $(arguments[1].item).context.parentElement;
		var rightimg = "#" + item.attributes[0].value + " > .rightimg";
		var leftimg = "#" + item.attributes[0].value + " > .leftimg";
		
		$(leftimg)[0].style["display"] = "none";
		$(rightimg)[0].style["display"] = "block";	
	}

	this.getNumberOfSideMenus();
	this.appendNavImages();
}