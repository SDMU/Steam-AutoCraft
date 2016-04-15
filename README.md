###Summary

Steam-AutoCraft is a [JavaScript](https://en.wikipedia.org/wiki/JavaScript)/[jQuery](https://jquery.com/) [UserScript](https://github.com/10101000/Steam-AutoCraft/blob/master/OpenUserJs/OpenUserJS.org/wiki/Userscript-Beginners-HOWTO) compatible with [Google Chrome](http://www.google.com/chrome/) and [Tampermonkey](https://tampermonkey.net/) or [Mozilla Firefox](https://www.mozilla.org/en-US/firefox/desktop/) and [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/). Please [INSTALL](https://github.com/10101000/Steam-AutoCraft/blob/master/INSTALL) for installation instructions, [CHANGELOG](https://github.com/10101000/Steam-AutoCraft/blob/master/CHANGELOG) for description of changes, and [LICENSE](https://github.com/10101000/Steam-AutoCraft/blob/master/LICENSE) for license information.

###[Install](https://github.com/10101000/Steam-AutoCraft/blob/master/INSTALL)
For use with Tampermonkey please read http://tampermonkey.net/faq.php#Q102. For Greasemonkey: http://wiki.greasespot.net/Greasemonkey_Manual:Getting_Help.

Please use the following URL to install inside your browser: https://raw.githubusercontent.com/10101000/Steam-AutoCraft/master/Steam-AutoCraft.user.js

###Usage

Once installed, Steam-AutoCraft adds a new button labeled *"AutoCraft remaining badges"* to the Steam badges & gamecard pages. When activated, the script crafts the available badge, refreshes the page, and checks for another badge to craft until all trading cards are used. Activation from the badges page will craft ALL available badges for ALL possible games.

###[Changelog](https://github.com/10101000/Steam-AutoCraft/blob/master/CHANGELOG)
* Thu, Apr 14, 2016 10:15:49 PM - Release 1.3.1: Minor update to fix the addButton function.
* Sun, Mar 27, 2016  1:01:16 AM - Introduce automatic crafting of all craft-able badges for ALL craft-able games in addition to existing functionality. We now show the button on the game cards (\*://steamcommunity.com/\*/gamecards/\*) & badges (\*://steamcommunity.com/\*/badges/\*) pages.
* Fri, Mar 25, 2016 7:55:00 PM - Updated to accommodate Steam Community changes.
* Tue, Dec 29, 2015  1:58:01 PM - Remove @namespace and @require jQuery to use the Steam include.
* Tue, Dec 29, 2015  1:58:01 PM - Small update to always show button but in disabled state if no badges are available to craft.
* Fri, Jul 10, 2015  3:11:53 PM - Re-commit of 1.1 release.




###Notes

Thanks to Jan Biniok for [Tampermonkey](https://tampermonkey.net/), to [Google](https://www.google.com/) for [Chrome](http://www.google.com/chrome/), to [Valve Software](http://www.valvesoftware.com/) for [Steam](http://store.steampowered.com/), and to Dr. McKay for [Steam Trading Card Bulk Buyer](https://bitbucket.org/Doctor_McKay/steam-trading-card-bulk-buyer), inspiration, and a great UserScript!
