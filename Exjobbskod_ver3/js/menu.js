$(document).ready(function() {
    
    /*****VARIABLES******/
     var sidemenu = $('#sideMenu1'),
      sidemenu2 = $('#sideMenu2'),
      sidemenu3 = $('#sideMenu3'),
      menuwrapper = $('#menuWrapper'),
      noimg = $('.leftimg'),
      rightimg = $('.rightimg'),
      allSideMenusOpen = false,
      currentPage = menuwrapper,
      numofsidemenus = 1;
    /*********************/

  function changeDirectionOfArrow(menu, direction){
    if(direction == "right") {
      menu.find(".leftimg").css("display", "none");
      menu.find(".rightimg").css("display", "block");
    } 
    else {
      menu.find(".leftimg").css("display", "block");
      menu.find(".rightimg").css("display", "none");
    } 
  }
});








