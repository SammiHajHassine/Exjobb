var Helper = function() {
	this.item = "";
	
	this.setup = function() {
		var boxWidth = $('.box').innerWidth();
		$('.box').find('img').each(function(i) {
			$(this).css("margin-left", boxWidth/6 + "px");
		});	
	}
};


