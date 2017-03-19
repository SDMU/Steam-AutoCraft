// ==UserScript==
// @name         Steam-AutoCraft
// @version      1.5.1
// @description  AutoCraft Steam Community Badges
// @author       10101000
// @include      /^https?:\/\/steamcommunity\.com\/+(id\/+[A-Za-z0-9$-_.+!*'(),]+|profiles\/+[0-9]+)\/+(badges\/?|gamecards\/+[0-9]+\/?).*$/
// @copyright    2016 10101000
// @grant        none
// ==/UserScript==

// Vars
var canCraftBadge            = 0;
var isBadgesPage             = 0;
var isGameCardsPage          = 0;
var craftRefreshTimeoutmsDef = 2000;
var pageRefreshTimeoutmsDef  = 10000;
var craftRefreshTimeoutms    = craftRefreshTimeoutmsDef;
var pageRefreshTimeoutms     = pageRefreshTimeoutmsDef;
var gameIdBlackList          = '';
var gamecardHrefLinks        = '';
var gamecardHref             = '';
var redirect                 = 0;

// Badges
var badgeLinks         = jQuery('.badge_details_set_favorite');
// Badges progress
var badgeProgressTasks = jQuery('.badge_progress_tasks');
// Gamecards
var invLinks           = jQuery('.gamecards_inventorylink');
// Gamecard progress
var badgeProgress      = jQuery('.gamecard_badge_progress');

// Run
jQuery(document).ready(function(){
    // Check settings
    checkSettings();

    // Determine current page
    if (invLinks.length >= 1) {
        isGameCardsPage  = 1;
    } else if ((badgeLinks.length >= 1) && (invLinks.length <= 0)) {
        isBadgesPage     = 1;
    }

    // Check for badges to craft
    if (jQuery('.badge_craft_button').length >= 1){
        if ((badgeProgressTasks.length >= 1) || (badgeProgress.length >= 1)){
            canCraftBadge  = 1;
        }
    }

    // Badge page logic
    if (isBadgesPage === 1) {
        if (window.sessionStorage.craftRecursive) {
            if (canCraftBadge === 0) {
                delete window.sessionStorage.craftRecursive;
            }
        }
    }

    // Gamecard page logic
    if (isGameCardsPage === 1) {
        if ((canCraftBadge === 0) && (window.sessionStorage.craftRecursive)) {
            delete window.sessionStorage.autoCraftState;

            // If all badges have been crafted, load badges page
            window.location.href = jQuery('div').find('.profile_small_header_text a.whiteLink').attr('href') + '/badges/';
        }
    }

    // Check blacklist and add button
    jQuery.when(checkBlacklist()).done( function() {
        addButton();
    });

    // Disable reset button when applicable
    if ((pageRefreshTimeoutms === pageRefreshTimeoutmsDef) && (craftRefreshTimeoutms === craftRefreshTimeoutmsDef) && (!gameIdBlackList)) {
        jQuery('#autocraft_button_reset').addClass('btn_disabled');
        jQuery('#autocraft_button_reset').prop('disabled',true);
    } else {
        jQuery('#autocraft_button_reset').removeClass('btn_disabled');
    }

    // Start autoCraft
    if ((canCraftBadge === 1) && ((window.sessionStorage.autoCraftState) || (window.sessionStorage.craftRecursive))) {
        if (redirect === 1) {
            window.location.href = gamecardHref;
        }
        jQuery.when(checkBlacklist()).done( function() {
            craftBadge();
        });
    }
});

function addButton() {
    // Set HTML vars
    var settingsDiv = `<div id="autocraft_settings_div" class="newmodal" style="position: fixed; z-index: 1000; left: 20%; top: 15%; display: none;">
   <div class="newmodal_header_border">
      <div class="newmodal_header">
         <span id="autocraft_settings_title">Steam-AutoCraft Settings</span>
         <div id="autocraft_settings_close" class="newmodal_close"/>
      </div>
   </div>
   <div class="newmodal_content_border">
      <div class="newmodal_content" style="max-height: 354px;">
         <div class="market_dialog_content">
            <div class="market_dialog_iteminfo">
               <div id="autocraft_settings_list" class="market_content_block market_home_listing_table market_home_main_listing_table market_listing_table">
                  <form id="autocraft_settings_form" align="left">
                  <div class="market_listing_row market_recent_listing_row">
                     Page Refresh Timeout (ms): <input type="text" class="market_dialog_input" id="autocraft_setting_refresh_timeout" name="autocraft_setting_refresh_timeout" value="`+pageRefreshTimeoutms+`"> The the longer refresh that happens after crafting each badge in milliseconds.
                  <div style="clear: both"/>
                  <div class="market_listing_row market_recent_listing_row">
                     Craft Refresh Timeout (ms): <input type="text" class="market_dialog_input" id="autocraft_setting_craft_refresh_timeout" name="autocraft_setting_craft_refresh_timeout" value="`+craftRefreshTimeoutms+`"> The short refresh that we set immediately after beginning a craft in milliseconds.
                  <div style="clear: both"/>
                  <div class="market_listing_row market_recent_listing_row">
                     Game ID Blacklist (id1,id2):&nbsp;<input type="text" class="market_dialog_input" id="autocraft_setting_blacklist" name="autocraft_setting_blacklist" value="`+gameIdBlackList+`"> Game ID blacklisting in the form of 12345,67890. We skip these games.
                  <div style="clear: both"/>
                  <div class="market_dialog_content_separator"></div>
                  <div class="market_dialog_content market_dialog_content_dark">
                     <div class="market_sell_dialog_input_area">
                        <input id="autocraft_button_reset" type="button" class="btn_grey_grey btn_small_thin" name="Reset" value="Reset" align="center">
                        <input id="autocraft_button_save" type="button" class="btn_grey_grey btn_small_thin" name="Save" value="Save" align="center">
                     </div>
                  </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
</div>`

    jQuery('body').append('<div id="autocraft_settings_background_div" class="newmodal_background" style="opacity: 0.8; display: none;">');

    // Add button to badge details page
    if (isGameCardsPage === 1){
        // Add settings div
        jQuery(settingsDiv).insertAfter('.gamecards_inventorylink');
        jQuery('#autocraft_button_reset').click(function(){ resetSettings(); });
        jQuery('#autocraft_button_save').click(function(){ saveSettings(); });

        // Buttons
        invLinks.append('<a><button type="button" class="btn_grey_grey btn_small_thin btn_disabled" id="autocraft" disabled><span>AutoCraft badges&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></button><button type="button" class="btn_grey_grey btn_small_thin" id="autocraft_settings"><span>&#9881;</span></button></a>&nbsp;');

        // Set initial position
        var position = jQuery('#autocraft').position();
        var x        = position.left;
        var y        = position.top;
        x           -= (jQuery('#autocraft_settings').outerWidth() - jQuery('#autocraft').outerWidth());
        jQuery('#autocraft_settings').css({
            position: 'absolute',
            zIndex:   500,
            top:      y,
            left:     x
        })

        // Transform to overlay
        jQuery('#autocraft_settings').css({
            position:            'element(#autocraft)',
            zIndex:              500,
            transform:           'translateX(-100%)',
            'background-color':  'transparent',
            'background-repeat': 'no-repeat',
            border:              'none',
            cursor:              'pointer',
            overflow:            'hidden',
            outline:             'none',
            top:                 '',
            left:                ''
        })

        jQuery('#autocraft_settings').click(function(){ toggleSettings(); });
        jQuery('#autocraft_settings_close').click(function(){ toggleSettings(); });

        if (canCraftBadge == 1){
            jQuery('#autocraft').click(function(){ autoCraft(); });
            jQuery('#autocraft').removeClass('btn_disabled');
            jQuery('#autocraft').prop('disabled',false);
        }

        return;
    }

    // Add button to badges page
    if (isBadgesPage === 1){
        // Add settings div
        jQuery(settingsDiv).insertAfter('.badge_details_set_favorite');
        jQuery('#autocraft_button_reset').click(function(){ resetSettings(); });
        jQuery('#autocraft_button_save').click(function(){ saveSettings(); });

        // Buttons
        badgeLinks.append('<a><button type="button" class="btn_grey_black btn_small_thin btn_disabled" id="autocraft"><span>AutoCraft all badges&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></button><button class="btn_grey_black btn_small_thin" id="autocraft_settings"><span>&#9881;</span></button></a>&nbsp;');

        // Set initial position
        var position = jQuery('#autocraft').position();
        var x        = position.left;
        var y        = position.top;
        x           -= (jQuery('#autocraft_settings').outerWidth() - jQuery('#autocraft').outerWidth());
        jQuery('#autocraft_settings').css({
            position: 'absolute',
            zIndex:   500,
            top:      y,
            left:     x
        })

        // Transform to overlay
        jQuery('#autocraft_settings').css({
            position:            'element(#autocraft)',
            zIndex:              500,
            transform:           'translateX(-100%)',
            'background-color':  'transparent',
            'background-repeat': 'no-repeat',
            border:              'none',
            cursor:              'pointer',
            overflow:            'hidden',
            outline:             'none',
            top:                 '',
            left:                ''
        })

        jQuery('#autocraft_settings').click(function(){ toggleSettings(); });
        jQuery('#autocraft_settings_close').click(function(){ toggleSettings(); });

        // Load economy.css
        jQuery('head').append('<link href="/public/css/skin_1/economy.css" rel="stylesheet" type="text/css">');
        jQuery('head').append('<link href="/public/css/skin_1/economy_market.css" rel="stylesheet" type="text/css">');

        if (canCraftBadge == 1){
            // Detect execution from page other than 1 and disable
            if (!(jQuery('.pageLinks .pagelink').filter('a[href="?p=1"]').length >= 1)) {
                gamecardHrefLinks = jQuery('div').find('.badge_row .badge_craft_button');
                gamecardHref = gamecardHrefLinks[0];
                if (typeof gamecardHref !== 'undefined') {
                    jQuery('#autocraft').removeClass('btn_disabled');
                    jQuery('#autocraft').prop('disabled',false);
                    jQuery('#autocraft').click(function(){ window.sessionStorage.craftRecursive = 1; window.location.href = gamecardHref; });
                } else {
                    delete window.sessionStorage.autoCraftState;
                }
            } else {
                jQuery('#autocraft').click(function(){ alert("Please execute from page 1."); });
            }
        }

        return;
    }
}

// Auto-craft
function autoCraft() {
    craftBadge();
    setTimeout(function(){ window.location.reload(true); }, pageRefreshTimeoutms);
    window.sessionStorage.autoCraftState = 1;
}

// Check settings
function checkSettings() {
    // Use localStorage for persistence across browser sessions
    if (window.localStorage.pageRefreshTimeoutms) {
        pageRefreshTimeoutms = window.localStorage.pageRefreshTimeoutms;
    }

    if (window.localStorage.craftRefreshTimeoutms) {
        craftRefreshTimeoutms = window.localStorage.craftRefreshTimeoutms;
    }

    if (window.localStorage.gameIdBlackList) {
        gameIdBlackList = window.localStorage.gameIdBlackList;
    }
}

// Check blacklist
function checkBlacklist() {
    if (isGameCardsPage === 1) { return; }
    // Join csv blacklist with pipe for use inside regex
    var blacklist = gameIdBlackList.replace(/[ \t]*,[ \t]*/g, '|');
    var regex     = "^https?:\/\/steamcommunity\.com\/+(id\/+[A-Za-z0-9$-_.+!*'(),]+|profiles\/+[0-9]+)\/gamecards\/"+blacklist+"\/.*$";
    var re        = new RegExp(regex);

    // Get badge links
    gamecardHrefLinks = jQuery('div').find('.badge_row .badge_craft_button');
    gamecardHrefLinks.each(function() {
        gamecardHrefLink = jQuery(this).attr('href');

        // Disable badge link
        if (blacklist.length > 0) {
            if (gamecardHrefLink.match(re)) {
                jQuery('a[href="'+gamecardHrefLink+'"]').filter('.badge_craft_button').replaceWith('5 of 5 cards collected');
            }
        }
    });

    // Redirect or clean up
    if (jQuery('.badge_craft_button').length >= 1) {
        redirect = 1;
    } else {
        delete window.sessionStorage.craftRecursive;
        jQuery('#autocraft').addClass('btn_disabled');
        jQuery('#autocraft').prop('disabled',true);
    }
}

// Craft badge and refresh page
function craftBadge() {
    jQuery('.badge_craft_button').click();
    if (isGameCardsPage === 1) {
        setTimeout(function(){ window.location.reload(true); }, craftRefreshTimeoutms);
    }
}

// Reset settings
function resetSettings() {
    var resetConfirm = confirm("Reset all settings?");
    if (resetConfirm === true) {
        pageRefreshTimeoutms  = pageRefreshTimeoutmsDef;
        delete window.localStorage.pageRefreshTimeoutms;
        jQuery('#autocraft_setting_refresh_timeout').val( pageRefreshTimeoutmsDef );

        craftRefreshTimeoutms = craftRefreshTimeoutmsDef;
        delete window.localStorage.craftRefreshTimeoutms;
        jQuery('#autocraft_setting_craft_refresh_timeout').val( craftRefreshTimeoutmsDef );

        gameIdBlackList = '';
        delete window.localStorage.gameIdBlackList;
        jQuery('#autocraft_setting_blacklist').val( gameIdBlackList );

        toggleSettings();
        window.location.reload(true);
    }
}

// Save settings
function saveSettings() {
    var problemState  = 0;
    var settingsArray = jQuery('#autocraft_settings_form').serializeArray();

    jQuery.each(settingsArray, function (i, setting) {
        if (setting.name === 'autocraft_setting_refresh_timeout') {
            // Ensure that only integers are entered
            if (setting.value.match(/^[0-9]+$/)) {
                pageRefreshTimeoutms                     = setting.value;
                window.localStorage.pageRefreshTimeoutms = setting.value;
            } else {
                alert("Invalid input: "+setting.value+", 'Page Refresh Timeout (ms)' requires an integer!");
                problemState = 1;
            }
        }

        if (setting.name === 'autocraft_setting_craft_refresh_timeout') {
            // Ensure that only integers are entered
            if (setting.value.match(/^[0-9]+$/)) {
                craftRefreshTimeoutms                     = setting.value;
                window.localStorage.craftRefreshTimeoutms = setting.value;
            } else {
                alert("Invalid input: "+setting.value+", 'Craft Refresh Timeout (ms)' requires an integer!");
                problemState = 1;
            }
        }

        if (setting.name === 'autocraft_setting_blacklist') {
            // Allow only integers and commas
            if ((setting.value.match(/^([ \t]*,?[0-9]+,?[ \t]*)+$/)) || (setting.value === '')) {
                gameIdBlackList                     = setting.value;
                window.localStorage.gameIdBlackList = setting.value;
            } else {
                alert("Invalid input: "+setting.value+", 'Game ID Blacklist (id1,id2)' requires an integer with optional comma!");
                problemState = 1;
            }
        }
    });

    if (problemState === 0) {
        toggleSettings();
        window.location.reload(true);
    }
}

// Settings toggle
function toggleSettings() {
    // Toggle the settings
    jQuery('#autocraft_settings_div').toggle();
    jQuery('#autocraft_settings_background_div').fadeToggle();

    // Change look on view
    if (jQuery('#autocraft_settings_div').is(':visible')) {
        jQuery('#autocraft_settings').addClass('btn_disabled');
    } else {
        jQuery('#autocraft_settings').removeClass('btn_disabled');
    }

    // Close on outside click
    var inside_autocraft_settings=false;

    jQuery('#autocraft_settings_div').hover(function(){
        inside_autocraft_settings=true;
    }, function(){
        inside_autocraft_settings=false;
    });

    jQuery('body').mouseup(function(){
        if((jQuery('#autocraft_settings_div').is(':visible')) && (!inside_autocraft_settings)) {
            jQuery('#autocraft_settings_div').hide();
            jQuery('#autocraft_settings_background_div').fadeOut();
            jQuery('#autocraft_settings').removeClass('btn_disabled');
        }
    });
}
