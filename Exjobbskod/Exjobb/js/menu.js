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

    /***INITIAL OPERATIONS***/


    noimg.css("display", "block");
    noimg.appendTo(sidemenu);
    img2 = noimg.clone();
    img2.appendTo(sidemenu2);
    rightimg.appendTo(sidemenu2);

    rightimg2 = rightimg.clone();
    img3 = noimg.clone();
    img3.appendTo(sidemenu3);
    rightimg2.appendTo(sidemenu3);

    noimg.click({param1: sidemenu, param2: "left"}, imgClick);
    img2.click({param1: sidemenu2, param2: "left"}, imgClick);
    rightimg.click({param1: sidemenu2, param2: "right"}, imgClick);
    img3.click({param1: sidemenu3, param2: "left"}, imgClick);
    rightimg2.click({param1: sidemenu3, param2: "right"}, imgClick);
   
    /**********************/

  /******CLICK-FUNCTIONS*****/
  currentPage.click(function() {
    if(allSideMenusOpen == true){
      closeAllSidemenus();
    }
  });

  $('#logo').click(function() {
    closeAllSidemenus();
    numofsidemenus = 1;
    currentPage = $('#menuWrapper');
  })

  $('#navImg').click(function() {
      if(allSideMenusOpen == false) {
        openAllSidemenus();
      }
      else {
        closeAllSidemenus();
      }
  });

 /* $('.item').click( 
    function() {
      sidemenu2.animate({width: "72%"}, 150);
    
      /*tillfällig lösning*/
    /*  changeDirectionOfArrow(sidemenu2, "left");
      currentPage = sidemenu;
      numofsidemenus++;
    });*/

  $('.item2').click( 
    function() {
      sidemenu3.animate({width: "60%"}, 150);
      /*TODO
      * Kolla vilken item som blivit klickad på 
      */
      /*tillfällig lösning*/
      changeDirectionOfArrow(sidemenu3, "left");
      currentPage = sidemenu2;
      
      numofsidemenus++;
    });
  /*********************/

  /******FUNCTIONS*******/
  function imgClick(event) {
    if(event.data.param1.selector== "#sideMenu1") {
      closeAllSidemenus();
      //sidemenu.animate({width: "0"}, 150);
    } 
    else if (event.data.param1.selector== "#sideMenu2") {      
      if(currentPage.selector == "#sideMenu1") { 
        if(event.data.param2 == "right") {
          changeDirectionOfArrow(sidemenu2, "left");
          sidemenu2.animate({width: "70%"}, 150);
        } 
        else {
          changeDirectionOfArrow(sidemenu2, "right");
          sidemenu2.animate({width: "100"}, 150);
        } 
      } 
      else if(currentPage.selector == "#sideMenu2") {
        if(event.data.param2 == "right") {
          changeDirectionOfArrow(sidemenu2, "left");
          sidemenu2.animate({width: "75%"}, 150);
        } 
        else {
          changeDirectionOfArrow(sidemenu2, "right");
          sidemenu2.animate({width: "200"}, 150);
        } 
      }    
    }

    else if (event.data.param1.selector== "#sideMenu3"){
      if(currentPage.selector == "#sideMenu2") { 
        if(event.data.param2 == "right") {
          changeDirectionOfArrow(sidemenu2, "left");
          sidemenu2.animate({width: "72%"}, 150);
          changeDirectionOfArrow(sidemenu3, "left");
          sidemenu3.animate({width: "60%"}, 150);
        } 
        else {
          changeDirectionOfArrow(sidemenu3, "right");
          sidemenu3.animate({width: "100"}, 150);
        } 
      }  
    }
  }

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

  function openAllSidemenus() {
    var percentage = 85;

    for(var i = 1; i <= numofsidemenus; i++){
      var select = "#sideMenu" + i;
      var currentMenu = $(select);

      currentMenu.animate({width: "" + percentage +"%"});
      currentMenu.find(".rightimg").css("display", "none");
      currentMenu.find(".leftimg").css("display", "block");

      percentage -= 15;
    }  
    allSideMenusOpen = true;
  }

  function closeAllSidemenus() {
    for(var i = 1; i <= numofsidemenus; i++){
          var select = "#sideMenu" + i;
          $(select).animate({width: "0"}, 150);
    } 
    allSideMenusOpen = false;
  }
  /***********************/
});








