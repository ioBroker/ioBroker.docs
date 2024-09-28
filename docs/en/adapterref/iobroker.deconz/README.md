![Logo](admin/deconz.png)

ioBroker deConz dresden-elektronik Adapter
==============

![Number of Installations](http://iobroker.live/badges/deconz-installed.svg) ![Number of Installations](http://iobroker.live/badges/deconz-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.deconz.svg)](https://www.npmjs.com/package/iobroker.deconz)  [![Downloads](https://img.shields.io/npm/dm/iobroker.deconz.svg)](https://www.npmjs.com/package/iobroker.deconz) [![Translation status](https://weblate.iobroker.net/widgets/adapters/-/deconz/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)


[![NPM version](https://nodei.co/npm/iobroker.deconz.png?downloads=true)](https://nodei.co/npm/iobroker.deconz/)

## Notice
No Support for Beta Versions of deConz

Required js-controller version >5.x.x, Required node.js >= 18.x.x

## English

Connects to deConz REST-API software developed by dresden-elektronik. This software aims to be a universal ZigBee Gateway solution, using hardware from dresden-elektronik the ConBee(X) USB stick and RaspBee(X) a modul for the Raspberry Pi.


You must first link to deConz.
1. a) Enter IP address for deConz <br>
   b) Enter standard Bridge Port: 80 and standard Websocket: 443
2. After IP address and port is entered and saved hit "Create API Key" Button. Now you can enter the credentials for deConz or go to Phoscon APP and register ioBroker as third party APP.

## To avoid some errors after an update (deconz/adapter), stop the adapter and delete these entries in the object structure. When you start, the object structure is recreated.
![Deconz-Adapter](https://github.com/mattreim/ioBroker.deconz/assets/80219712/fb56647e-a0a8-4535-9e18-2b7651b32824)

#### Send more than one command at the same time
For this purpose there is a object called "action".

Examples:

`"on": true, "xy": [0.6586,0.3138]`

`"on": true, "transitiontime": 5, "hue": 360`


## Links
[deCONZ REST-API Plugin](https://github.com/dresden-elektronik/deconz-rest-plugin)  
[Documentation of deCONZ REST-API Plugin](https://dresden-elektronik.github.io/deconz-rest-doc/)  
[Gateways (Hardware)](https://www.dresden-elektronik.de/funktechnik/solutions/wireless-light-control/gateways/)  

## [Sponsors](https://github.com/Jey-Cee/ioBroker.deconz/blob/master/SPONSORS.MD)

## Changelog

### 1.5.0 (2024-08-11)
* Updated/added some translations
* (mattreim) Dependencies have been updated
* (mattreim) Logo compressed
* (mattreim) Remove common.title

### 1.4.1 (2024-05-05)
* (mattreim) Added new objects for various sensors

### 1.4.0 (2024-01-29)
* (mattreim) Added new objects for Tuya and Bosch thermostats

### 1.3.23 (2023-11-05)
* fix crash when new device was added closes [#319](https://github.com/Jey-Cee/ioBroker.deconz/issues/319)
* added possibility to change the port for websocket connection
* updated/added translations
* (grizzelbee) Fix: Re-enabled window covers
* (grizzelbee) Upd: Dependencies got updated
* (grizzelbee) New: Added ukrainian translation

### 1.3.21 (2022-05-13)
* added schedule to object definition
* changed limit for duration to 999999

### 1.3.20 (2022-02-26)
* (withstu) add retry if gateway is busy
* change min/max range for offset
* updated translations
* fix link for overview page
* fix parameter can not be set since deConz 2.11.5
* fix xy is invalid: #289 #295
* remove Sentry

### 1.3.19 (2021-08-08)
* fix for js-controller 3.3.x

### 1.3.17
* fix crash [#248](https://github.com/Jey-Cee/ioBroker.deconz/issues/248)

### 1.3.16 
* added datapoints melody and volume (Used by NEO-Alarm-Sirene by Tuya)
* added new effects for Müller Licht Tint: sunset, party, worklight, campfire, romance, nightlight
* added new effects for Lidl Melinera: steady, snow, rainbow, snake, twinkle, fireworks, flag, waves, updown, vintage, fading, collide, strobe, sparkles, carnival, glow 
* added 2 new datapoints they were used by Lidl Melinera effects: effectspeed: simple number; effectcolours: array of rgb values = [[255,0,0],[0,255,0],[0,0,255]] https://github.com/dresden-elektronik/deconz-rest-plugin/issues/3716#issuecomment-735467996

### 1.3.15 (2021-05-08)
* fix info message: "State value to set for "deconz.0.Sensors.3.pending" has to be stringified but received type "object""
* fix info message: State value to set for "deconz.0.Sensors.3.orientation" has to be stringified but received type "object"

### 1.3.13
* fixes for js-controller 3.3

### 1.3.12
* fixes for js-controller 3.3

### 1.3.11
* fix auto reconnect

### 1.3.10
* (bortim) added change-event handling, new in deConz v2.05.78

### 1.3.9
* set default port to 80

### 1.3.8
* fix colorloopspeed is not working
* fix set xy has no effect 
* some small fixes

### 1.3.7
* stable re-release

### 1.3.6
* fix object definition dimup and dimdown

### 1.3.5
* disable node v8 tests
* fix createscene object definition
* prevent websocket to connect if port, api key or ip is missing
* catch errors on ackStateVal
* fix "Cannot read property 'id' of undefined" for controlId
* fix crash on scene actions with js-controller 3
* catch onStateChange stateObj is null
* fix level update when bri was set by other deConz instance

### 1.3.4
* fix message "State value to set is invalid"
* terminate websocket connection on error to make sure the session is closed
* check response is not undefined
* catch request errors and send to sentry
* prevent sending message with wrong value type

### 1.3.3
* fix catch response of setLightState is undefined
* fix ws.terminate at unload
* catch ip/port undefined at auto updates
* catch res is undefined at deleteApiKey

### 1.3.2
* transitiontime now in seconds instead 1/10 seconds
* fix colorspeed
* use new class style
* add sentry for error collection
* fix transition time if set to 0
* objects will be now deleted if the device is removed by adapter
* fix multiple websocket connections
* try to fix #120 reconnect after 60 seconds

### 1.3.1
* fix set dimspeed
* connect to Websocket in any case

### 1.3.0
* fix websocket connection if there are no upnp broadcast answer from deconz
* corrected duration role
* added level to lights and groups

### 1.2.6
* fix crash by executing commands without parameters

### 1.2.5
* code cleanup
* (Zefau) fixed duplicated subscription
* (Zefau) useless loop within getGroupAttributes()
* refactor logging
* refactor state change
* fix API Key Dialog
* Websocket reconnect after 60 Seconds if no message is received

### 1.2.4
* dynamicly add boolean states for button events
* added new object definitions
* (mobilutz) remove ip overwrite
* (njeisecke) add transitiontime for bri_inc (dim step)

### 1.2.3
* fix expire time for alive 
* add object for open zigbee network to add new devices without admin config
* removed input for opne network time
* fix device list in admin config

### 1.2.2
* adapter configuration handling rewritten
* fix lastupdated UTC to locale time

### 1.2.1
* convert lastupdated time to locale
* object creation refactored
* fix adapter config update
* add auto detect deConz
* include ssdp discovery to repo

### 1.2.0
* fix adapter crash when deConz is not reachable
* show connection state as adapter state
* add auto reconnect to deconz
* add new objects for thermostat support and others

### 1.1.3
* Changed default port to 80
* (mplogas) fixed config save 
* (mplogas) added config.delay to set up presence sensor cooldown

### 1.1.2
* fix button objects
*  changed buttonpressed from boolean to number

### 1.1.0
*  added objects for "tiltangle", "vibration", "vibrationstrength" and "orientation"
*  (asgothian) added object "buttonpressd"
*  some fixes

### 1.0.2
* fix set bri for groups

### 1.0.1
* small fixes

### 1.0.0
*  (thewhobox) skip helper groups
*  (thewhobox) added channels for lights, groups and sensors
*  (thewhobox) skip unusable sensors
*  (thewhobox/KristianHeider) turn light/groups on when changing brightness
*  (jey-cee) added object group for remotes
*  (jey-cee) stop overwrite objects on adapter start
*  (jey-cee) prepared for compact mode
*  (jey-cee) new possible to change offset (if the device accept it)
*  (jey-cee) new possible to change duration (if the device accept it)
*  (jey-cee) get API key with credentials

### 0.4.0
* (asgothian) Fix for hue change
* (halloamt)  Added support for dimming lights and groups
* (halloamt)  Added support for custom actions

### 0.3.1
* Fixing hue from range 0-65535 to 0-360

### 0.3.0
* Added scene support
*  Drop nodejs 4 support

### 0.2.5
* Fix/Change handling create objects during running Adapter

### 0.2.4
* Fix create objects during running adapter

### 0.2.3
* Create objects during runing adapter

### 0.2.2
*  Changed id naming
*  Use websocket messages instead polling afterwards

### 0.2.1
* (Jey-Cee) Added new elements to config
* (Jey-Cee) Changed som small things

### 0.2.0
* (Jey-Cee) next Try with Xiaomi Sensors
* (Jey-Cee) Added "pressure" sensor
* (Jey-Cee) Added create group to adapter config

### 0.1.7

* (Jey-Cee) add possibility to delete devices from deConz
* (Jey-Cee) fix issue on getAll... functions when there are is nothing

### 0.1.6

* (Jey-Cee) fix Xiaomi Sensors recognition

### 0.1.5

* (Jey-Cee) Try to fix Sensors

### 0.1.4

* (Jey-Cee) Added support for Admin v3
* (Jey-Cee) Create API Key without use of WebApp/Phoscon (only with deConz standard password)

### 0.1.3

* (Jey-Cee) Stop Spam in log
* (Jey-Cee) Added filter for name to id conversation

### 0.1.2

* (Jey-Cee) Added new datapoints for sensors (experimental)

### 0.1.1

* (Jey-Cee) Adapter complete rewritten

### 0.1.0

* (Jey-Cee) first release

## License
Apache-2.0

Copyright (c) 2017-2024 Jey Cee jey-cee@live.com
