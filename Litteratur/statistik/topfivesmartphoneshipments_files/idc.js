/*Insights Nav Info script*/
function switchInsight(number) {
    for (i = 1; i <= 7; i++) {
        if (number == i) {
            $("#insight" + i).removeClass('hidden');
            $("#insight" + i).addClass('insight' + i);
        } else {
            $("#insight" + i).removeClass('insight' + i);
            $("#insight" + i).addClass('hidden');
        }
    }
}

_menu = ["about", "analysts", "events", "myidc", "prodserv"];
_mainMenuNumber = 0;

/*Submenu scripts*/
function arrangeMenu(selectedMenu) {

    // If a specific menu name was given to us, use that. Otherwise, find the appropriate menu to highlight
    // based on the URL path.
    if (selectedMenu) {
        part = selectedMenu;
    } else {
        patharray = window.location.pathname.split("/");
        part = patharray[1];//determining in which part of idc.com user is
    }

    // lump all these URL paths into the Products & Services tab.
    if (part == "research" || part == "IEP" || part == "idcstore" || part == "gotinsights" ||
        part == "pricelease" || part == "vertical_markets" || part == "MarketScape" || part == "eagroup" ||
        part == "gms" || part == "ITEPresentations" || part == "IEP" || part == "pvws" || part == "2010st" || part == "newsletters") {
        part = "prodserv";//research and products are under one tab now
    }

    // find the corresponding menu number for the tab we want highlighted
    for (i = 0; i < _menu.length; i++) {
        if (part == _menu[i]) {
            _mainMenuNumber = i + 1;
            break;
        }
    }
    if (_mainMenuNumber != 0) {
        showSubmenu(_mainMenuNumber);
        $("#idc-message").hide();//if it's not HOME tab then we switch off voice of IDC
    }

    // remove the "selected menu" class from the other tabs and add it to the selected tab
    for (i = 0; i <= _menu.length; i++) {
        $("#mainmenu" + i).removeClass("btnMenuCurrent");
    }
    // .. and add it to the selected tab
    $("#mainmenu" + _mainMenuNumber).addClass("btnMenuCurrent");


    if (_mainMenuNumber == 4)
        $("#mainmenu4").removeClass("lightBlue");

}
function hideAllSubmenus() {
	for (i = 1; i <= _menu.length; i++) {
        $("#submenu" + i).removeClass('submenu_on');
        $("#submenu" + i).addClass('submenu_off');
    }
}
function showSubmenu(num) {
    hideAllSubmenus();
    $("#submenu" + num).removeClass('submenu_off');
    $("#submenu" + num).addClass('submenu_on');
}

function hideSubmenu(num) {
    showSubmenu(_mainMenuNumber);
}


function showSubInsights(num) {
    $("#subInsights" + num).removeClass('insightSub_off');
    $("#subInsights" + num).addClass('insightSub_on');

    $("#languages").addClass("hide");
}

function hideSubInsights(num) {
    $("#subInsights" + num).removeClass('insightSub_on');
    $("#subInsights" + num).addClass('insightSub_off');

    $("#languages").removeClass("hide");
}

function showHelp(num) {
    $("#help" + num).removeClass('help_off');
    $("#help" + num).addClass('help_on');
}

function hideHelp(num) {
    $("#help" + num).removeClass('help_on');
    $("#help" + num).addClass('help_off');
}

function showSub(num) {
    $("#subSubMenu" + num).removeClass('submenu-manageAccount_off');
    $("#subSubMenu" + num).addClass('submenu-manageAccount');
}

function hideSub(num) {
    $("#subSubMenu" + num).removeClass('submenu-manageAccount');
    $("#subSubMenu" + num).addClass('submenu-manageAccount_off');
}

function switchTab(number) {
    for (i = 1; i <= 4; i++) {
        if (number == i) {
            $("#box" + i).removeClass('hidden');
            $("#box" + i).addClass('box' + i);
            $("#tab" + i).addClass('tab-selected' + i);
        } else {
            $("#box" + i).removeClass('box' + i);
            $("#tab" + i).removeClass('tab-selected' + i);
            $("#box" + i).addClass('hidden');
        }
    }
    tabSwitched(number);
}

/*START - Banners (Large and Small) script:
 This JS has been changed due to a conflict with HBX or SiteCatalyst.
 Please reference:
 /includes/rotating_banners/large_banner_inc.html
 /includes/rotating_banners/small_banner_inc.html
 For other pages such as Events with instances of a rotating banner,
 the file will be in that local includes folder.
 */

/*Show/Hide script*/
function show(obj) {
    if (document.getElementById) {
        var elem = document.getElementById(obj);
        elem.style.display = 'block';
    }
}

function hide(obj) {
    if (document.getElementById) {
        var elem = document.getElementById(obj);
        elem.style.display = 'none';
    }
}
/*END - Banners (Large and Small) script*/


//Voice of IDC on the home page
function voiceOfIdc() {
    DwrHandler.getIndustryWatch(function(data) {
        if (data != null) {
            //don't make tweet a link if  url is null
            if (data.tweetUrl != null) {
                var onClick = "javascript:pageTracker._trackPageview('/MyLinks/Industry_Watch')";
                $("#industryWatch").html("<a href=" + data.tweetUrl + " onclick=" + onClick + " style='color:red' name='&lid=Header_Voice_of_IDC' >" + data.tweetText + "</a>");
            }
            else {
                $("#industryWatch").text(data.tweetText);
            }
        } else {
            //First parameter is a number of tweets rotating on home page
            DwrHandler.getIdcTweets(5, handleTweetsData)
        }
    });

}

function handleTweetsData(data) {
    var voi = $("#voiceOfIdc");
    var index = 0;
    if (data != null && data.length > 0) {
        var showNextMsg = function() {
            if (index >= data.length - 1) {
                index = 0;
            } else {
                index++;
            }
            //don't make tweet a link if  url is null
            if (data[index].tweetUrl != null) {
                var onClick = "javascript:pageTracker._trackPageview('/MyLinks/Voice_of_IDC')";
                voi.html("<a href=" + data[index].tweetUrl + " onclick=" + onClick + ">" + data[index].tweetText + "</a>").fadeIn().oneTime(15000, function() {
                    voi.fadeOut().oneTime(1000, showNextMsg);
                });
            } else {
                voi.text(data[index].tweetText).fadeIn().oneTime(15000, function() {
                    voi.fadeOut().oneTime(1000, showNextMsg);
                });
            }

        };
        showNextMsg();
    }
}

function processAjaxCode(req, callback) {
    if (req.status != 200) {
        if (callback != null) {
            window.location = loginUrl + window.encodeURIComponent('?callback=') + callback;
        } else {
            window.location = loginUrl;
        }
    }
}

function processDwrError(exception) {
	if (exception.javaClassName=='org.springframework.security.access.AccessDeniedException') {
        window.location = window.location.protocol + "//" + window.location.host + '/action/login.do?successUrl=' + window.location.pathname;
	} else {
		alert(exception.message);
	}
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function MM_jumpMenu(targ, selObj, restore) { //v3.0
    eval(targ + ".location='" + selObj.options[selObj.selectedIndex].value + "'");
    if (restore) selObj.selectedIndex = 0;
}
