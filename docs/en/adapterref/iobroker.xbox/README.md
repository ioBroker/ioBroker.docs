![Logo](admin/xbox.png)
# ioBroker.xbox
===========================

![Build Status](https://github.com/foxriver76/ioBroker.xbox/workflows/Test%20and%20Release/badge.svg)![Number of Installations](http://iobroker.live/badges/xbox-installed.svg) ![Number of Installations](http://iobroker.live/badges/xbox-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.xbox.svg)](https://www.npmjs.com/package/iobroker.xbox)
[![Downloads](https://img.shields.io/npm/dm/iobroker.xbox.svg)](https://www.npmjs.com/package/iobroker.xbox)

[![NPM](https://nodei.co/npm/iobroker.xbox.png?downloads=true)](https://nodei.co/npm/iobroker.xbox/)

## Disclaimer
Xbox, Xbox One, Smartglass and Xbox Live are trademarks of Microsoft Corporation.
The developers of this module are in no way endorsed by or affiliated with
Microsoft Corporation, or any associated subsidiaries, logos or trademarks.

## Steps 

* Fulfill the requirements
* Install the adapter and control your Xbox One or Xbox One X

## Requirements
* If you want to power your Xbox on with this adapter, you have to
[configure the instant-on power modus](https://support.xbox.com/en-GB/xbox-one/console/learn-about-power-modes) on your Xbox.

## Acknowledgement
Thanks to [Team Open Xbox](https://openxbox.org/) for developing and maintaining the
[xbox-rest-server](https://github.com/OpenXbox/xbox-smartglass-core-node) and the related libraries.
Without their effort, developing this package would not be possible.

## Installation
You can install the adapter via Admin interface or on your terminal.

1. Open your ioBroker web interface in a browser (eg: 192.168.30.70:8081)
2. Click on Tab "Adapters"
3. Type "Xbox" in the filter
4. Click on the three points and then on the "+" symbol of the Xbox adapter <br/>
![Add Adapter](/docs/en/img/plusAddAdapter.png)

## Setup
1. Fill in the Live ID of your Xbox in the settings of the adapter instance. You can find the Live ID in the settings of your console: System > Console info > *"Xbox Live device ID"* or *"Xbox network device ID"* (depending on which Xbox model and firmware is used)
2. Fill in the ip address of your Xbox.
3. Save the settings and open the ioBroker log.
4. To start the login procedure, open the Link from the log (*Xbox login url available at: \<link\>*) in a webbrowser. Then copy the API key, which can be found after `code=` in the url of the browser's address bar, into the "API Token" field of the adapter instance settings.

## States
In this section you can find a description of every state of the adapter.

### Channel Info

* info.connection

    |Data type|Permission|
    |:---:|:---:|
    |boolean|R|
   
   *Read-only boolean indicator. Is true if adapter is connected to Xbox.*

* info.activeTitleName

    |Data type|Permission|
    |:---:|:---:|
    |string|R|

    *Contains the name of the active title (which is focused) as read-only string.*

* info.activeTitleId

    |Data type|Permission|
    |:---:|:---:|
    |string|R|

    *Contains the id (converted to hex) of the active title (which is focused) as read-only string.*

* info.activeTitleImage

    |Data type|Permission|
    |:---:|:---:|
    |string|R|

    *Contains the link to the active title (which is focused) cover image as a string.* 

* info.activeTitleType

    |Data type|Permission|
    |:---:|:---:|
    |string|R|

    *Contains the type of the active title (which is focused) as a read-only string, e.g. 'Game'.*

* info.gamertag

    |Data type|Permission|
    |:---:|:---:|
    |string|R|

    *String which contains the gamertag of the currently authenticated user.* 

* info.gamerscore

  |Data type|Permission|
  |:---:|:---:|
  |number|R|

  *Number which contains the gamerscore of the currently authenticated user.*

* info.installedApplications

  |Data type|Permission|
  |:---:|:---:|
  |string|R|

  *String which contains a comma-separated list of the currently installed applicaitons. DLCs are excluded.*

* info.authenticated

  |Data type|Permission|
  |:---:|:---:|
  |boolean|R|

  *Boolean value which indicates if you are successfully authenticated on Xbox Live.* 
   
### Channel Settings

* settings.power

    |Data type|Permission|
    |:---:|:---:|
    |boolean|R/W|

   *Boolean-value to turn your Xbox on and off. State also indicates current power status of the Xbox.*

* settings.launchTitle/launchStoreTitle

    |Data type|Permission|
    |:---:|:---:|
    |string|R/W|

   *A writable string, which allows the user to launch a specific title by its title id
   (converted to hexadecimal). To find out about the hex code of a desired title, you can
   use the info.currentTitles state. The command is acknowledged when it has arrived at the server,
   which does not mean, that the command has been executed.*

   *Example:*
    ```javascript
    setState('settings.launchTitle', '2340236c', false); // Launch Red Dead Redemption 2
    ```
  
    With `launchStoreTitle` you can use real names. The adapter will search for the title in store and take the ID of
    the first result.

* settings.inputText

    |Data type|Permission|
    |:---:|:---:|
    |string|R/W|

   *Writable string, which allows the user to fill text into an active text field, e.g. to send
   private messages. The command is acknowledged when it has arrived at the server, which does
   not mean, that the command has been executed.*

   *Example:*
   ```javascript
   setState('settings.inputText', 'H1 M8 h0w d0 u do?', false); // Send a super nerdy text to someone
   ```

* settings.gameDvr

    |Data type|Permission|
    |:---:|:---:|
    |string|W|

    *Writable string which records the defined time of gameplay. The state is available when
    authenticate is turned on in the settings. You have to be logged in on your Xbox with the same account
    as you are authenticated with. A game needs to be in the foreground.
    
    *Example:*
   ```javascript
   setState('settings.gameDvr', '-60,30', false); // record last 60 seconds until the next 30 seconds (total of 90 seconds)
   ```
### Channel Gamepad

* gamepad.a

   *Emulates the A button of your gamepad.*

* gamepad.b

   *Emulates the B button of your gamepad.*

* gamepad.x

   *Emulates the X button of your gamepad.*
   
* gamepad.y

   *Emulates the Y button of your gamepad.*
   
* gamepad.clear

   *Emulates the Clear button of your Xbox.*
   
* gamepad.dPadDown

   *Emulates the DPad Down button of your Xbox.*
   
* gamepad.dPadUp

   *Emulates the DPad Up button of your Xbox.*
   
* gamepad.dPadRight

   *Emulates the DPad Right button of your Xbox.*
   
* gamepad.dPadLeft

   *Emulates the DPad Left button of your Xbox.*
   
* gamepad.enroll

   *Emulates the Enroll button of your Xbox.*
   
* gamepad.leftShoulder

   *Emulates the Left Shoulder button of your Xbox.*
   
* gamepad.rightShoulder

   *Emulates the Right Shoulder button of your Xbox.*
   
* gamepad.leftThumbstick

   *Emulates the Left Thumbstick button of your Xbox.*
   
* gamepad.rightThumbstick

   *Emulates the Right Thumbstick button of your Xbox.*
   
* gamepad.menu

   *Emulates the Menu button of your Xbox.*
   
* gamepad.nexus

   *Emulates the Nexus (Xbox) button of your Xbox.*
 
* gamepad.view

   *Emulates the View button of your Xbox.*
   
### Channel Media

* media.seek

    |Data type|Permission|
    |:---:|:---:|
    |number|R/W|

   *Jump to a specific position on media content. The state will be
   acknowledged when it has been arrived at the REST server, which not means, that it has been
   executed.*

* media.play

   *Play button for media content.*
   
* media.pause

   *Pause button for media content.*
   
* media.playPause

   *Combined Play and Pause button for media content.*
   
* media.back

   *Back button for media content.*
   
* media.channelDown

   *Channel Down button for media content.*
   
* media.channelUp

   *Channel Up button for media content.*
   
* media.fastForward

   *Fast Forward button for media content.*
   
* media.menu

   *Menu button for media content.*
   
* media.nextTrack

   *Next Track button for media content.*
   
* media.previousTrack

   *Previous Track button for media content.*
   
* media.record

   *Record button for media content.*
   
* media.rewind

   *Rewind button for media content.*
   
* media.stop

   *Stop button for media content.*
   
* media.view

   *View button for media content.*

### Folder friends
For every friend a channel will be created. Under this channel you will find several read-only states.
   
## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### 1.1.0 (2023-09-04)
* (foxriver76) allow to send web API commands even if Xbox is locally not connected

### 1.0.2 (2022-12-14)
* (foxriver76) we have ensured, that instance object is existing again

### 1.0.1 (2022-11-02)
* (foxriver76) we have optimized error logging messages

### 1.0.0 (2022-09-09)
* (foxriver76) updated dependencies
* (foxriver76) see previous beta versions

### 1.0.0-beta.10 (2022-08-20)
* (foxriver76) we now determine correct store locale for germany if system language is "de"

### 1.0.0-beta.9 (2022-08-07)
* (foxriver76) we fixed `activeTitleName` of applications which have no short title

### 1.0.0-beta.8 (2022-08-03)
* (foxriver76) removed unused messagebox

### 1.0.0-beta.7 (2022-08-02)
* (foxriver76) we have revived acknowledgment flag for power on state

### 1.0.0-beta.6 (2022-08-02)
* (foxriver76) we are now synchronizing friends

### 1.0.0-beta.5 (2022-08-01)
* (foxriver76) fixed `activeTitleImage` which is now the cover and always an url
* (foxriver76) optimized `launchStoreTitle` by preventing API calls for DLCs
* (foxriver76) added gamerscore as state (synched every 10 minutes)
* (foxriver76) added list of installed applications to a new state

### 1.0.0-beta.4 (2022-07-30)
* (foxriver76) we have optimized `launchStoreTitle` to check for installed apps first
* (foxriver76) we have optimized error logging

### 1.0.0-beta.2 (2022-07-30)
* (foxriver76) added `launchStoreTitle` state to launch apps by their names

### 1.0.0-beta.1 (2022-07-29)
* (foxriver76) fixed missing state objects

### 1.0.0-beta.0 (2022-07-29)
* (foxriver76) complete TypeScript rewrite
* (foxriver76) removed Python dependencies by siwtching to Xbox API written in Node.js
* (foxriver76) fixed title launch (closes #39)
* (foxriver76) fixed Xbox Live Auth (closes #63)

### 0.7.10 (2022-05-20)
* (foxriver76) fixed error with mising admin ui on new installations

### 0.7.9 (2022-05-20)
* (foxriver76) fixed wrong default value of `media.seek` (closes #113)

### 0.7.8 (2022-02-20)
* (foxriver76) we now set `unsafePerm` flag to ensure compatibility with future controller
* (foxriver76) updated dependencies

### 0.7.7 (2021-04-18)
* (foxriver76) do not log rest server logging on levels above debug, so it can be activated when needed

### 0.7.6 (2021-03-29)
* (foxriver76) added `requests` package as pip dev
* (foxriver76) added logging for rest server

### 0.7.3 (2020-12-25)
* (foxriver76) fixed debug logging on discovery

### 0.7.2 (2020-11-23)
* (foxriver76) removed logging of error on adapter stoppage due to rest server termination
* (foxriver76) removed warn logging for debugging
* (foxriver76) fixed currentTitles and activeTitle states

### 0.7.0 (2020-11-04)
* (foxriver76) replaced deprecated requests module by axios
* (foxriver76) migrated to xbox-smartglass 1.3
* (foxriver76) removed Python3.6 support 
* (foxriver76) event based rest server startage (faster and more robust)
* (foxriver76) GameDVR now supports custom time

### 0.6.9 (2020-11-02)
* (foxriver76) dependency upgrade, fixes installation problems

### 0.6.8 (2020-09-24)
* (foxriver76) minor optimization

### 0.6.5 (2020-05-28)
* (foxriver76) fixed problem with auth-only states

### 0.6.4 (2020-05-11)
* (foxriver76) compatibility with controller v3

### 0.6.3 (2020-04-02)
* (foxriver76) try specific python versions first on install
* (foxriver76) bump dependency, because of auth bug in smartglass

### 0.6.1 (2020-03-17)
* (foxriver76) fixes for compact mode compatibility
* (foxriver76) more translations added
* (foxriver76) minor optimizations

### 0.6.0 (2020-03-01)
* (foxriver76) dependency upgrade (smartglass has been refactored)
* __python 3.6 required!__

### 0.5.12 (2020-01-17)
* (foxriver76) let js-controller know which apt packages are required

### 0.5.11 (2019-11-27)
* (foxriver76) we not try to install apt packages any longer if already installed

### 0.5.8
* (foxriver76) increased stopTimeout to successfully shut down adapter on windows based systems
* (foxriver76) now using setStateChanged instead of own implementation

### 0.5.7
* (foxriver76) fix gamertag not set if no state on the object exists yet

### 0.5.6
* (foxriver76) if still logged in dont log warning/set auth false anymore
* (foxriver76) on logout only set auth to false, but keep gamertag

### 0.5.5
* (foxriver76) minor optimizations

### 0.5.3
* (foxriver76) improve log message quality
* (foxriver76) more promisification
* (foxriver76) minor fix for compact mode

### 0.5.0
* (foxriver76) support of compact mode
* (foxriver76) fixes and optimizations

### 0.4.4
* (foxriver76) small fixes and optimizations

### 0.4.2
* (foxriver76) use adapter-core module

### 0.4.1
* (foxriver76) minor type fix

### 0.4.0
* (foxriver76) Seek converted to number, to jump to specific position
* (foxriver76) try reauthentication when auth gets lost

### 0.3.0
* (foxriver76) new state activeTitleType added
* (foxriver76) minor fixes
* (foxriver76) authentication for 2 factor auth added

### 0.2.2
* (foxriver76) minor fix when currentTitles empty, activeTitle states should be too
* (foxriver76) dont set info.connection on power off, because will be
self detected and prevents reconnection on shutdown

### 0.2.1
* (foxriver76) minor fix on state name

### 0.2.0
* (foxriver76) Authentication for Xbox Live added
* (foxriver76) When logged in current titles contains the correct title full name
* (foxriver76) Added decryption and encryption
* (foxriver76) minor fixes
* (foxriver76) Added new states

### 0.1.7
* (foxriver76) rest-server will now be stopped on windows unload too
* (foxriver76) enhanced windows debug logging

### 0.1.6
* (foxriver76) fix rest-server start on win when nopy not in own node_modules folder

### 0.1.5
* (foxriver76) starting rest-server on windows fixed
* (foxriver76) stopping rest-server on windows fixed

### 0.1.4
* (foxriver76) set info.connection and settings.power to false on unload
* (foxriver76) not only rely on ping to check if xbox is on, use available too

### 0.1.3
* (foxriver76) minor fix
* (foxriver76) bump smartglass-rest requirement to 0.9.7
* (foxriver76) enables pwoer on for not multicastable consoles
* (foxriver76) only use discovery when Xbox disconnected and online

### 0.1.2
* (foxriver76) fix when currentTitles is empty

### 0.1.1
* (foxriver76) minor fixes
* (foxriver76) explicit require versions of python deps
* (foxriver76) fix for power on, when Xbox not in broadcast network

### 0.1.0
* (foxriver76) brought back live id to settings
* (foxriver76) input text state to enter text in an open text field
* (foxriver76) ability to find consoles which are not available via broadcast
* (foxriver76) info state for active titles & launch title state

### 0.0.13
* (foxriver76) minor fix
* (foxriver76) restart adapter on rest server error
* (foxriver76) log when losing connection without ping

### 0.0.12
* (foxriver76) when console unavailable, also do not connect
* (foxriver76) debug logging for unavailable console
* (foxriver76) only set power states on change

### 0.0.11
* (foxriver76) minor connection fix

### 0.0.10
* (foxriver76) when status is connecting, don't connect again

### 0.0.9
* (foxriver76) LiveID is not necessary anymore

### 0.0.8
* (foxriver76) If reconnect attempts fail often in a row, only log it once
* (foxriver76) removed unneeded objects from io-package and adjusted title

### 0.0.6
* (foxriver76) Stop making connect requests when already connected
* (foxriver76) more user friendly logging
* (foxriver76) more robustness in nopys path

### 0.0.5
* (foxriver76) using relative paths for starting server
* (foxriver76) adding commands for windows
* (foxriver76) enhanced installation manual

### 0.0.4
* (foxriver76) automatically install required Debian packages
* (foxriver76) updated Readme
* (foxriver76) make installation for Windows possible
* (foxriver76) improved logging
* (foxriver76) detect OS

### 0.0.3
* (foxriver76) fixed state handling
* (foxriver76) using ping to check consoles power status instead of connection
* (foxriver76) stop powering on if it is unsuccessful for 15 seconds
* (foxriver76) restarting adapter when REST snpm erver is down

### 0.0.2
* (foxriver76) fixed endpoints
* (foxriver76) automated installation of dependencies
* (foxriver76) readme updated
* (foxriver76) code optimized

### 0.0.1
* (foxriver76) initial release

## License
The MIT License (MIT)

Copyright (c) 2018-2023 Moritz Heusinger <moritz.heusinger@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
