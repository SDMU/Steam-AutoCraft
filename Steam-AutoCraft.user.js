// ==UserScript==
// @name         Steam-AutoCraft
// @version      1.2.2
// @description  AutoCraft Badges inside Steam
// @author       10101000 aka Ryan Steed
// @match        *://steamcommunity.com/*/gamecards/*
// @copyright    2015 10101000 (Ryan Steed)
// @grant        none
// ==/UserScript==

// Isolate jQuery for compatibility with other scripts
jQuery.noConflict();

var craftBadgeState = 0;
var invLinks = jQuery('.gamecards_inventorylink');

jQuery(document).ready(function(){
    if (jQuery('.gamecard_badge_progress').length >= 1){
        checkBadge();
    }

    addButton();
    
    if (window.sessionStorage.autoCraftState){
        autoCraft();
    }
});

function addButton(){
    if (invLinks){
        if (craftBadgeState == 1){
            invLinks.append('<a><button type="button" class="btn_grey_grey btn_small_thin" id="autocraft"><span>AutoCraft remaining badges</span></button></a>');
            jQuery('#autocraft').click(function(){ autoCraft(); });
        } else {
            invLinks.append('<a><button type="button" class="btn_disabled btn_grey_grey btn_small_thin" id="autocraft" disabled><span>AutoCraft remaining badges</span></button></a>');
        }
    }
}

function checkBadge(){
    if (jQuery('.badge_craft_button').length >= 1){
        craftBadgeState = 1;
    } else {
        delete window.sessionStorage.autoCraftState;
    }
}
    
function craftBadge(){
    jQuery('.badge_craft_button').click();
    setTimeout(function(){ window.location.reload(true); }, 2000);
}
                      
function autoCraft(){
    craftBadge();
    setTimeout(function(){ checkBadge(); window.location.reload(true); }, 10000);
    window.sessionStorage.autoCraftState = 1;
}
