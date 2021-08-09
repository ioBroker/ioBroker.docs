![Logo](admin/ring.png)

# Ring Adapter

[![Travis CI Build Status](https://travis-ci.org/iobroker-community-adapters/ioBroker.ring.svg?branch=master)](https://travis-ci.org/iobroker-community-adapters/ioBroker.ring)
[![AppVeyor Build Status](https://ci.appveyor.com/api/projects/status/github/iobroker-community-adapters/ioBroker.ring?branch=master&svg=true)](https://ci.appveyor.com/project/schmupu/ioBroker-ring/)
![Number of Installations](http://iobroker.live/badges/ring-installed.svg) ![Number of Installations](http://iobroker.live/badges/ring-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.ring.svg)](https://www.npmjs.com/package/iobroker.ring)
[![Downloads](https://img.shields.io/npm/dm/iobroker.ring.svg)](https://www.npmjs.com/package/iobroker.ring)

[![NPM](https://nodei.co/npm/iobroker.ring.png?downloads=true)](https://nodei.co/npm/iobroker.ring/)

Requires node.js 10.0 or higher and Admin v3. 

The Ring adapter works with Ring devices like the Ring Video Doorbell and Ring Cam and shows if somenone rings the doorbell or if motion is detected. The Ring Video Doorbell or Cam sends a videostream if a motion or doorbell ist detected or you use the SIP Information for a SIP Video Conference with your SIP client. 
Unfortunately the snapshot and livestream function does not work properly. Unfortunately I have no influence on it. Please consider this before you create an issue. 
The adapter will not provide all ring devices because the used API do not includes all ring devices. 

You can use for example the Blink SIP client on [http://icanblink.com/](http://icanblink.com/). To get video working go into Blink's Preferences and under "Accounts", switch the tab to "Media" and deselect "Encrypt audio and video" under "RTP Options". Be careful the SIP information expire after a few seconds!
Hopefully I will able to support a video stream soon. Unfortunatly [ring.com](https://ring.com) does not have an official API that support this feature. 
If you press the livestreamrequest button you get new SIP Information for building up a SIP Video Call session. If you are using the [ring.com](https://ring.com) cloud you find under history a http link to your last motion / door bell recorded video. 


## Install & Configuration

After installing the Adapter you have to enter your Email and Password of your [ring.com](https://ring.com) Account and a Token. Ring now requires the use of Two-Factor Auth (2fa) for all accounts. For getting the token please do following on your shell.
```
npx -p ring-client-api ring-auth-cli
```
or
```
# Unix 
cd /opt/iobroker/node_modules/iobroker.ring/
npm i ring-client-api

cd /opt/iobroker/node_modules/iobroker.ring/node_modules/ring-client-api
node ring-auth-cli
```

![Ring Admin 1](docs/ring_admin_tab1.png)

You can use special variables for your livestream and snapshort path and filename. This variables will be replaced with a counter, timestamp, ring id or kind of ring.

* %d : Unix timestamp. Example: test_%d -> test_1588331430061
* %i : Id of your ring device: Example: test_%i -> test_234567890
* %n : Counter since ring instance start. Example: test_%n -> test_1
* %k : Kind of your ring device: Example: test_%k -> test_doorbel

![Ring Admin 2](docs/ring_admin_tab2.png)

## Objects

![Ring Admin 2](docs/ring_objects.png)

## Example

An example to get changes if a motion or door ring is detected: 
```
on({id: "ring.0.doorbell_4711.kind"/*Kind*/},  (obj) => {
  if(obj.state.val == 'ding')   console.log("Someone is at the door");
  if(obj.state.val == 'motion') console.log("Motion detected");
});
```

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### __WORK IN PROGRESS__
* (theimo1221) Refactoring

### 1.2.3 (2021-07-30)
* (theimo1221) Update packages
* (theimo1221) Fix compatibility issues with new ring api

### 1.2.2 (2021-05-05)
* (theimo1221) Update packages due to security patches

### 1.2.1 (2021-04-09)
* (theimo1221) Bump version

### 1.2.0 (2021-04-08)
* (theimo1221) Add new device type spotlightw as doorbell
* (theimo1221) Update dependencies (ringapi, node-schedule, etc.)

### 1.1.6-3 (2021-03-29)
* (theimo1221) Fix typo preventing Livestream recordings after motion detection
* (theimo1221) Reduce Levels of Log Messages, to not spam iobroker Log



### 1.1.6-2 (2021-03-29)
* (theimo1221) Fixing some Issues while saving snapshots and place Snapshots within 'iobroker-data' Folder. 

### 1.1.6-1 (2021-03-26)
* (theimo1221) Support for Floodlight V2
* (theimo1221) Control Floodlight by Switch

### 1.1.5 (04.11.2020)
* (Stübi) Add floodlight

### 1.1.4 (23.05.2020)
* (Stübi) Add new libraries  

### 1.1.3 (06.05.2020)
* (Stübi) Fixed error of missing objects 

### 1.1.2 (02.05.2020)
* (Stübi) Fixed health info like missing battery status (Issue #22, Issue #25) 
* (Stübi) Change error handling
* (Stübi) Providing Stick Up Cam (BETA)
* (Stübi) Using variables in the filename of the livestream or snapshot 

### 1.1.1 (02.05.2020)
* (Stübi) Bugfixing
* (Stübi) User can enable/disable external sentry logging

### 1.1.0 (01.05.2020)
* (Stübi) Node 10 is now required, Node 12 recommended. If you use Node 8 or less, the adapter will stop immediately.
* (Stübi) Tested with js-controller 3. I recommend using js-controller 3 or higher because of sentry logging and more features in the future 
* (Stübi) Snapshot link will be shown as https or http in state (Issue #18)
* (Stübi) Livestream link added and a request button added to get new livestream
* (Stübi) Old snapshots and livestreams can be deleted on the filesystem
* (Stübi) Sentry logging added
* (Stübi) Small improvements and bugfixing   
* (Stübi) Add a Two-Factor Auth (2fa) description (Issue #14, Issue #13, Issue #19)

### 1.0.7 (24.12.2019)
* (Stübi) Bugfixing

### 1.0.6 (20.12.2019)
* (Stübi) Bugfixing: Login with username and password changed
* (Stübi) New feature (BETA): Now you can make snapshots in jpg and a livestream in mp4 format. Unfortunately the snapshot / livestream does not work always! 

### 1.0.5 (18.04.2019)
* (Stübi) Bugfixing 
* (Stübi) Using new API. With this API livestreaming and snapshots are possible (work still in progress and not supported in this version)
* (Stübi) Fixed an error with js-controller 2.0. You need at least this version with js-controller 2.0
* (Stübi) two face authentication


### 1.0.4 (17.04.2019)
* (Stübi) Bugfixing for Ring Pro 

### 1.0.3 (09.03.2019)
* (Stübi) Major change! I had to change the used ring.com API to an other API. The old one did not work anymore. For this reason, a lot has to be redesigned.  

### 1.0.2 (01.02.2019)
* (Stübi) More debug information 

### 1.0.1 (05.01.2019)
* (Stübi) Support js-controller compact mode 

### 1.0.0 (04.01.2018)
* (Stübi) Add camera device. For this reason, the device name changed from doorbot to doorbell.

### 0.1.3 (20.12.2018)
* (Stübi) Update error handling

### 0.1.2 (17.12.2018)
* (Stübi) Update error handling

### 0.1.1 (15.12.2018)
* (Stübi) Improvements

### 0.1.0 (14.12.2018)
* (Stübi) First Version


## License
The MIT License (MIT)

Copyright (c) 2020 Thorsten <thorsten@stueben.de> / <https://github.com/schmupu>

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
