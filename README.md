###Summary

Steam-AutoCraft is a [JavaScript](https://en.wikipedia.org/wiki/JavaScript)/[jQuery](https://jquery.com/) [UserScript](https://github.com/10101000/Steam-AutoCraft/blob/master/OpenUserJs/OpenUserJS.org/wiki/Userscript-Beginners-HOWTO) compatible with [Google Chrome](http://www.google.com/chrome/) and [Tampermonkey](https://tampermonkey.net/) or [Mozilla Firefox](https://www.mozilla.org/en-US/firefox/desktop/) and [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/). Please read the [INSTALL](https://github.com/10101000/Steam-AutoCraft/blob/master/INSTALL) file for installation instructions, the [CHANGELOG](https://github.com/10101000/Steam-AutoCraft/blob/master/CHANGELOG) file for description of changes, and the [LICENSE](https://github.com/10101000/Steam-AutoCraft/blob/master/LICENSE) for for license information.

###[Install](https://github.com/10101000/Steam-AutoCraft/blob/master/INSTALL)
For use with Tampermonkey please read http://tampermonkey.net/faq.php#Q102. For Greasemonkey: http://wiki.greasespot.net/Greasemonkey_Manual:Getting_Help.

Please use the following URL to install inside your browser: https://raw.githubusercontent.com/10101000/Steam-AutoCraft/master/Steam-AutoCraft.user.js

###Usage

Once installed, Steam-AutoCraft adds a new button labeled *"AutoCraft remaining badges"* to the Steam badges & gamecard pages. Once activated, the script crafts the available badge, refreshes the page after 10 seconds, and checks for another badge to craft until all trading cards are used. Activation from the badges page will craft ALL available badges for ALL possible games.

###[Changelog](https://github.com/10101000/Steam-AutoCraft/blob/master/CHANGELOG)
* Fri, Jul 10, 2015  3:11:53 PM - Re-commit of 1.1 release.
* Tue, Dec 29, 2015  1:58:01 PM - Small update to always show button but in disabled state if no badges are available to craft.
* Tue, Dec 29, 2015  1:58:01 PM - Remove @namespace and @require jQuery to use the Steam include.
* Fri, Mar 25, 2016  7:55:00 PM - Updated to accommodate Steam Community changes.
* Sun, Mar 27, 2016  1:01:16 AM - Introduce automatic crafting of all craft-able badges for ALL craft-able games in addition to existing functionality. We now show the button on the game cards (*://steamcommunity.com/*/gamecards/*) & badges (*://steamcommunity.com/*/badges/*) pages.

###Notes

Thanks to Jan Biniok for [Tampermonkey](https://tampermonkey.net/), to [Google](https://www.google.com/) for [Chrome](http://www.google.com/chrome/), to [Valve Software](http://www.valvesoftware.com/) for [Steam](http://store.steampowered.com/), and to Dr. McKay for [Steam Trading Card Bulk Buyer](https://bitbucket.org/Doctor_McKay/steam-trading-card-bulk-buyer), inspiration, and a great UserScript!
