### Summary

Steam-AutoCraft is a [JavaScript](https://en.wikipedia.org/wiki/JavaScript)/[jQuery](https://jquery.com/) [UserScript](https://github.com/OpenUserJs/OpenUserJS.org/wiki/Userscript-Beginners-HOWTO) compatible with [Google Chrome](http://www.google.com/chrome/) and [Tampermonkey](https://tampermonkey.net/) or [Mozilla Firefox](https://www.mozilla.org/en-US/firefox/desktop/) and [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/). Please read [INSTALL](https://github.com/10101000/Steam-AutoCraft/blob/master/INSTALL) for installation instructions, [CHANGELOG](https://github.com/10101000/Steam-AutoCraft/blob/master/CHANGELOG) for description of changes, and [LICENSE](https://github.com/10101000/Steam-AutoCraft/blob/master/LICENSE) for license information.

### [Install](https://github.com/10101000/Steam-AutoCraft/blob/master/INSTALL)
For use with Tampermonkey please read http://tampermonkey.net/faq.php#Q102. For Greasemonkey: http://wiki.greasespot.net/Greasemonkey_Manual:Getting_Help.

Please use the following URL to install inside your browser: https://raw.githubusercontent.com/10101000/Steam-AutoCraft/master/Steam-AutoCraft.user.js

If the aforementioned URL doesn't install the script (Greasemonkey 4.x with Firefox 57+) try this URL: https://cdn.rawgit.com/10101000/Steam-AutoCraft/master/Steam-AutoCraft.user.js

### Usage

Once installed, Steam-AutoCraft adds a new button labeled *"AutoCraft all badges"* to the Steam badges page & *"Auto Craft badges"* to the gamecard page. When activated, the script crafts the available badge, refreshes the page, and checks for another badge to craft until all trading cards are used. Activation from the badges page will craft ALL available badges for ALL possible games.

The following settings are available by clicking the "⚙" button: Page Refresh Timeout, Card Refresh Timeout, Game ID Blacklist, and Badge Crafting Limit. Page and Card refresh values both use the milliseconds metric. The Page refresh occurs after all badges have been crafted and is longer than the Card refresh. The card refresh occurs after a single badge as been crafted. The Game ID Blacklist value uses the format of id1,id2, i.e. 12345,67890. Any ID in the list will be excluded from automatic crafting when recursive mode is executed from the badges page. Badge Crafting Limit sets a limit to the number of badges crafted for the session.

### [Changelog](https://github.com/10101000/Steam-AutoCraft/blob/master/CHANGELOG)
* Sun, 24 Dec 2017 15:49:07 -0700 - Release 1.6.2: Fix for Firefox 57+ with Greasemonkey 4.x.
* Mon, 24 Apr 2017 17:01:22 -0600 - Release 1.6.1: Bug fixes.
* Sat, 25 Mar 2017 23:30:27 -0600 - Release 1.6: Use \<a\> and \<span\> instead of buttons. Show version on settings page. Use newlines for proper button spacing. Redirect to original badges page URL to support execution from any page. Detect conflict with with Chrome extension. Improved settings. Addition of badge crafting limit. Dynamic button name.
* Sun, 19 Mar 2017 12:57:25 -0600 - Release 1.5.2: Only load CSS if necessary.
* Sun, 19 Mar 2017 05:23:41 -0600 - Release 1.5.1: Forgot to load economy_market.css on the badges page for the settings formatting.
* Sun, 19 Mar 2017 05:10:12 -0600 - Release 1.5: New features and bug fixes. Renamed buttons. Re-designed settings to use Steam's newmodal style popup. Settings button now overlays autocraft buttons to appear as a single element. Blacklist input now supports spaces. Fixed bugs with blacklist crafting.

### Notes

Thanks to Jan Biniok for [Tampermonkey](https://tampermonkey.net/), to [Google](https://www.google.com/) for [Chrome](http://www.google.com/chrome/), to [Valve Software](http://www.valvesoftware.com/) for [Steam](http://store.steampowered.com/), and to Dr. McKay for [Steam Trading Card Bulk Buyer](https://bitbucket.org/Doctor_McKay/steam-trading-card-bulk-buyer), inspiration, and a great UserScript!
