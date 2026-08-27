![Logo](admin/google-sharedlocations2.png)
# ioBroker.google-sharedlocations2

[![NPM version](https://img.shields.io/npm/v/iobroker.google-sharedlocations2.svg)](https://www.npmjs.com/package/iobroker.google-sharedlocations2)
[![Downloads](https://img.shields.io/npm/dm/iobroker.google-sharedlocations2.svg)](https://www.npmjs.com/package/iobroker.google-sharedlocations2)
![Number of Installations](https://iobroker.live/badges/google-sharedlocations2-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/google-sharedlocations2-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.google-sharedlocations2.png?downloads=true)](https://nodei.co/npm/iobroker.google-sharedlocations2/)

**Tests:** ![Test and Release](https://github.com/Garfonso/ioBroker.google-sharedlocations2/workflows/Test%20and%20Release/badge.svg)

## google-sharedlocations2 adapter for ioBroker

Share your location with ioBroker via Google Maps. You should create a separate Google account for this purpose, i.e. an account for your ioBroker installation. Do NOT use your personal account.

### Configuration

In config, you can enter the credentials of the Google account you created for ioBroker and the adapter will do everything for you. Do **NOT** enter your **personal** account data.

Then share your location from your mobile device (and account) with this iobroker-google-account. The adapter will read the shared location and create states in ioBroker for each person sharing their location with the Google account.

You can configure the polling interval. But it will ignore values below 1 minute to avoid being blocked by Google.

If you do not want to enter username & password, this is possible, read [below](#use-a-cookie).

### Use a cookie
Sometimes there are issues with login. Since the adapter just opens a browser and tries to login (but is more or less "blind", relies on information it already has), this can fail and there is not much I can do. Sometimes you might get a warning about a new login. Sometimes you will have to re-login with a second factor. If you run into such an issue copy a valid Cookie for google.com into the state `google-sharedlocations2.0.info.currentCookies` from a real browser. 

You can even leave username & password empty in the configuration and then the adapter will try to keep that cookie working as good as possible (similar to my fork of the old google-sharedlocations-Adapter) without ever trying to login (but using the browser from time to time to load the whole page, seems to help with staying logged in). 


This is not associated with Google in any way. Usage of this adapter might violate Google's Terms of Service. Use at your own risk.

Copyright and trademark of Google are property of Google.


## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.4.0 (2026-07-03)
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.
* (Garfonso) minor fixes and improvements.
* (Garfonso/Claude) added self heal if wrong chrome version is installed (e.g. after update of puppeteer).

### 0.3.6 (2026-04-25)
* (Garfonso) somehow the old improve cookie call does not work anymore (since switch to fetch). Don't see why. -> So we just run the browser once a day.
* (Garfonso) Login with browser no tries to clear cookies in browser, if normal login does not work.

### 0.3.5 (2026-04-22)
* (Garfonso) resize logo.

### 0.3.4 (2026-04-22)
* (Garfonso) replaced axios dependency. Tried to make login more robust.

### 0.3.3 (2026-02-17)
* (Garfonso) if deleting cookies, also delete cookies in Browser to force login with username & password.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2026 Garfonso <garfonso@mobo.info>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
