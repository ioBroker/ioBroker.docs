![Logo](admin/zoe.png)
# iobroker.zoe2
=================

**Tests:**
[![Build Status](https://travis-ci.org/fungus75/ioBroker.zoe2.svg?branch=master)](https://travis-ci.org/fungus75/ioBroker.zoe2)
[![Known Vulnerabilities](https://snyk.io/test/github/fungus75/ioBroker.zoe2/badge.svg)](https://snyk.io/test/github/fungus75/ioBroker.zoe2)

**Downloads**
[![Downloads](https://img.shields.io/npm/dm/iobroker.zoe2.svg)](https://www.npmjs.com/package/iobroker.zoe2)
 ![Number of Installations](https://iobroker.live/badges/zoe2-installed.svg)

**License:**
[![License](https://img.shields.io/github/license/fungus75/ioBroker.zoe2)](https://github.com/fungus75/ioBroker.zoe2/blob/master/LICENSE)

**Features:**
[![Feature Requests](https://feathub.com/fungus75/ioBroker.zoe2?format=svg)](https://feathub.com/fungus75/ioBroker.zoe2)

Simple ioBroker-Adapter to get some basic values from Renault ZOE and use it in ioBroker. 


IMPORTANT!!! IF YOU UPDATE FROM A VERSION BEFORE 0.2.2, YOU HAVE TO REENTER YOUR PASSWORD BECAUSE STARTING WITH 0.2.2 PASSWORD IS SAVED ENCRYPTED!!!

**API KEY!!! IF ADAPTER STOPS WORKING PLEASE ALWAYS LOOK AT https://github.com/fungus75/ioBroker.zoe2/wiki BECAUSE RENAULT OFTEN CHANGES THEIR API KEY!!!**


PLEASE NOTE: THIS ADAPTER USES THE SAME API AS THE MY RENAULT APP. BUT YOU MUST HAVE TO SET UP MY RENAULT APP TO WORK BEFORE USING THIS ADAPTER. i.e. on Android: https://play.google.com/store/apps/developer?id=RENAULT+SAS - if you want to use the old api, please use https://github.com/fungus75/ioBroker.zoe instead.

PLEASE NOTE: THIS IS A VERY EARLY STATE OF DEVELOPMENT, USE OF YOUR OWN RISK

PLEASE NOTE: AFTER ANY UPDATE OF THE ADAPTER GO TO SETUP-SCREEN, CHANGE SOMETHING SO THAT SAVE IS ENABLED, CHANGE IT BACK AND HIT SAVE!

If this adapter is not available on the ioBroker-Admin-View, please use the following command to install it (from command-line on your ioBroker-Server):

```npm install https://github.com/fungus75/ioBroker.zoe2/tarball/master/```

Or you can use the GitHub-Button (labeled: install from own URL) in the Adapter-View and enter this URL on the "other"-Tab. This can also be used to update to the current adapter-version:

```https://github.com/fungus75/ioBroker.zoe2/tarball/master/```
(if this url does not work, use https://github.com/fungus75/ioBroker.zoe2.git instead)


You can use the method to update the adapter to the most recent version.




After that the adapter should show up in the ioBroker-Admin-View.

### Configuration

- You have to set username, password and VIN as you have done in my renault app
- This locales ("Laenderversionen") currently do work: de_DE
- Maybe you need a My-Z.E.Connect or similar services from Renault to use this
- After saving it took around 15 minutes to create the objects (zoe.0 and so on)

### Features

- Read this parameters from Zoe:
   - charge_level in percent
   - charging as boolean
   - plugged on as boolean
   - remaining range in kilometer
   - remaining time of charging
   - calculated endPoint of charing (charging_finished_at)
   - battery temperature
   - external temperature (not that accurate)
   - chargingPower
   - batteryCapacity
   - batteryAvailableEnergy
   - gpsLatitude and gpsLongitude, works only on newer ZOEs
- Write this parameters:
   - preconNow: starts precon/hvac (write true to that node, or press the button)
   - chargeCancel: stops charging
   - chargeEnable: enables charging
   

Control Charging:

With the two buttons chargeCancel and chargeEnable charging functionality can be controlled. If chargeCancel is pressed
(or true is written to this parameter), the charging function is disabled. ZOE should not charge if the power cord is
connected. On my 1st Gen ZOE this has no effect, so maybe it works on newer ZOEs?

As soon as chargeEnable is pressed (or true is written to this parameter), the charging function should work again.

How is this done: chargeEnable creates a charging-schedule that starts at the given hour you defined in the setup screen 
every day and lasts for 15 minutes. That looks as it is the shortest amount to be set. Turning charging off complete is 
not possible with the current API (or that parts of the current API that are known).


Some parameters only work on newer ZOEs.

### Testet with the folowing ZOEs:
- Zoe Phase 2 (Thanks Jack-RK-24)
- Zoe R210 (1st Generation, tested by fungus75)
- Zoe R90 (Thanks arturwolf)

### Please Note!!

Communication with ZOE or Renault-Services is done only during the interval-times with is 10 Minutes.
So if you press preconNow or chargeNow, it will take up to the next interval to send it to ZOE and it will take up to the
very next interval to get the status back.

The new ZOE API from Renault seems to be very lacy. That means that it only shows new values when there is something important.
As far as I found out, the most important thing is battery-level. That means i.E. the external temperature is not updated,
if the car stands at home. Only if i.E. the ZOE charges, the external temperature will be updated. If charging is finished,
still no new update. When driving, the battery level gets lower and lower and therefore it should update very regulary.

### Thanks  

https://michael-heck.net/index.php/elektromobilitaet/renault-zoe-ins-smarthome-integrieren, 
https://michael-heck.net/index.php/elektromobilitaet/renault-zoe-im-smarthome-neue-api-2020,
https://muscatoxblog.blogspot.com/2019/07/delving-into-renaults-new-api.html,
https://github.com/edent/Renault-Zoe-API,
https://github.com/jamesremuscat/pyze and 
https://github.com/hacf-fr/renault-api
for your great documentation and work.




## Changelog

### 0.2.8 (2024-04-27)
- BugFix Cockpit und Batterie (thanks to @MCP-KC, @gik007)

### 0.2.7 (2024-04-08)
- BugFix gps Location (thanks to @MCP-KC)

### 0.2.6 (2022-07-22)
- API Timeout configurable via config-screen
- Improved stability

### 0.2.5 (2022-03-30)
- Better error messages if kameronapikey changed
- Link to github-wiki added to admin-screen
- updated dependencies

### 0.2.4 (2022-02-16)
- Replaced obsolete Request-Library by axios
- Code-Adjustments

### 0.2.3 (2021-07-29)
- Code Adjustments, Error-Handling

### 0.2.2 (2021-07-26)
- Store Password Encrypted (You have to reset it, if updating from older version)

### 0.2.1 (2021-07-23)
- Code optimisation 

### 0.2.0 (2021-02-12)
- Adapter supports compact mode (required if adapter should be listed in official repo)

### 0.1.5 (2021-02-09)
- bugfix gigya parameter changed https://github.com/fungus75/ioBroker.zoe2/issues/17

### 0.1.4 (2021-02-05)
- added: kamereonapikey as setup parameter because it changed by Feb. 1st
- added: stopChargeWorkaroundHour: Because the API has no feature to stop charging, the stop-charging button starts scheduled charging to a very uncommon time. Configure the hour with that parameter
- bugfix https://github.com/fungus75/ioBroker.zoe2/issues/15
- bugfix https://github.com/fungus75/ioBroker.zoe2/issues/16
- bugfix https://github.com/fungus75/ioBroker.zoe2/issues/14

### 0.1.3 (2020-11-17)
- added: setup-value useHVACApi, see https://github.com/fungus75/ioBroker.zoe2/issues/10

### 0.1.2 (2020-07-28)
- changed: call charge-start API when "pressed" chargeEnable. Hopefully it helps on older ZOEs

### 0.1.1 (2020-07-18)
- added chargeCancel and chargeEnable. See "controll charging"

### 0.1.0 (2020-07-03)
- bugfix: https://github.com/fungus75/ioBroker.zoe2/issues/6, thanks to https://github.com/damack

### 0.0.9 (2020-06-25)
- added: getLocation can be turned on/off in config (useful for older ZOEs which do not allow getLocation)

### 0.0.8 (2020-06-18)
- bugfix: https://github.com/fungus75/ioBroker.zoe2/issues/2
- bugfix: https://github.com/fungus75/ioBroker.zoe2/issues/3

### 0.0.7 (2020-06-18)
- bugfix: https://github.com/fungus75/ioBroker.zoe2/issues/2
- added: gpsLatitude
- added: gpsLongitude 

### 0.0.6 (2020-04-30)
- added: chargingPower
- added: batteryCapacity
- added: batteryAvailableEnergy
- changed: Using battery-status v2 API (supplies better values for newer ZOEs, thanks Jack-RK-24 for testing)

### 0.0.5 (2020-04-29)
- added: config-paramter ignore API error (when set, the Adapter tries to ignore some API-Errors)

### 0.0.4 (2020-04-21)
- added: preconNow => starts precon (hvac)

### 0.0.3 (2020-04-16)
- added: totalMileage

### 0.0.2 (2020-04-15)
- first working version for github
- reads out some values (as shown in the Features list)

### 0.0.1 (2020-04-06)
- nonworking version, just to create initial repo on github
- code taken 1:1 from iobroker.zoe
- small adjustments, first access to the new renault api

## License
The MIT License (MIT)

Copyright (c) 2021 RenePilz <rene@pilz.cc>

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



