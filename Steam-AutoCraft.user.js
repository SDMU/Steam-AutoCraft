// ==UserScript==
// @name         Steam-AutoCraft
// @version      1.3
// @description  AutoCraft Steam Community Badges
// @author       10101000 aka Ryan Steed
// @match        *://steamcommunity.com/*/gamecards/*
// @match        *://steamcommunity.com/*/badges/*
// @copyright    2016 10101000 (Ryan Steed)
// @grant        none
// ==/UserScript==

// Isolate jQuery for compatibility with other scripts
jQuery.noConflict();


// Vars
var craftBadgeState = 0;
var craftBadgesState = 0;
var craftRefreshTimeoutms = 2000;
var pageRefreshTimeoutms = 10000;
// Badges
var badgeLinks = jQuery('.badge_details_set_favorite');
// Badge Details
var invLinks = jQuery('.gamecards_inventorylink');

// Run
jQuery(document).ready(function(){
    // Check for badges to craft
    if (jQuery('.badge_progress_tasks').length >= 1){
        checkBadges();
    } else if (jQuery('.gamecard_badge_progress').length >= 1){
        checkBadge();
    }

    if (window.sessionStorage.craftRecursive && craftBadgesState == 1){
        window.location.href = jQuery('div').find('.badge_row a.badge_row_overlay').attr('href');
        autoCraft();
    } else if (window.sessionStorage.craftRecursive && craftBadgesState == 0 && craftBadgeState == 0 && jQuery('.gamecard_badge_progress').length >= 1){
        window.location.href = jQuery('div').find('.profile_small_header_text a.whiteLink').attr('href') + '/badges/';
    } else if (!window.sessionStorage.craftRecursive && craftBadgesState == 0 && craftBadgeState == 0 && jQuery('.gamecard_badge_progress').length >= 1){
        delete window.sessionStorage.autoCraftState;
    } else if (window.sessionStorage.craftRecursive && craftBadgesState == 0 && craftBadgeState == 0 && jQuery('.badge_progress_tasks').length >= 1){
        delete window.sessionStorage.craftRecursive;
        delete window.sessionStorage.autoCraftState;
    }

    // Always add button
    addButton();

    // Start autoCraft
    if (window.sessionStorage.autoCraftState){
        autoCraft();
    }
});

function addButton(){
    // Add button to badges page
    if (badgeLinks.length >= 1){
        if (craftBadgesState == 1){
            badgeLinks.append('<a><button type="button" class="btn_grey_black btn_small_thin" id="autocraft"><span>AutoCraft remaining badges</span></button></a>');
            jQuery('#autocraft').click(function(){ window.sessionStorage.craftRecursive = 1; window.location.href = jQuery('div').find('.badge_row a.badge_row_overlay').attr('href'); autoCraft(); });           
        } else {
            badgeLinks.append('<a><button type="button" class="btn_disabled btn_grey_black btn_small_thin" id="autocraft" disabled><span>AutoCraft remaining badges</span></button></a>');
        }
    }

    // Add button to badge details page
    if (invLinks.length >= 1){
        if (craftBadgeState == 1){
            invLinks.append('<a><button type="button" class="btn_grey_grey btn_small_thin" id="autocraft"><span>AutoCraft remaining badges</span></button></a>');
            jQuery('#autocraft').click(function(){ autoCraft(); });
        } else {
            invLinks.append('<a><button type="button" class="btn_disabled btn_grey_grey btn_small_thin" id="autocraft" disabled><span>AutoCraft remaining badges</span></button></a>');
        }
    }
}

// Check for badges to craft
function checkBadge(){
    if (jQuery('.badge_craft_button').length >= 1){
        craftBadgeState = 1;
    }
}

function checkBadges(){
    if (jQuery('.badge_craft_button').length >= 1){
        craftBadgesState = 1;
    }
}

// Craft badge and refresh page
function craftBadge(){
    jQuery('.badge_craft_button').click();
    setTimeout(function(){ window.location.reload(true); }, craftRefreshTimeoutms);
}

// Auto-craft all potential badges
function autoCraft(){
    craftBadge();
    setTimeout(function(){ checkBadge(); window.location.reload(true); }, pageRefreshTimeoutms);
    window.sessionStorage.autoCraftState = 1;
}
