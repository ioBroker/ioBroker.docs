![Logo](admin/netatmo.png)
# ioBroker.netatmo

![Number of Installations](http://iobroker.live/badges/netatmo-installed.svg) 
![Number of Installations](http://iobroker.live/badges/netatmo-stable.svg) 
[![NPM version](http://img.shields.io/npm/v/iobroker.netatmo.svg)](https://www.npmjs.com/package/iobroker.netatmo)

![Test and Release](https://github.com/PArns/iobroker.netatmo/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/netatmo/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.netatmo.svg)](https://www.npmjs.com/package/iobroker.netatmo)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

Netatmo adapter for ioBroker

## __Important Note for Realtime events (Doorbell, Welcome, Presence, CO2/Smoke-Alarm)__
To receive realtime events from Netatmo you need an iot/Pro-Cloud Account with an Assistent- or Remote-License and an installed iot Instance connected to this account. The iot Instance needs to have v1.14.0 or higher.

Please select the iot Instance in the adapter settings and restart the adapter.

Netatmo adapter versions < 3.0 used an heroku service to pass these webhook events through, but Heroku has deceased this free service. So all Netatmo versions < 3.0 will not get realtime events anymore since 28.11.2022! Because of this we decided for this way to use proofed and stable iot/Pro-Cloud services.

## __Important Note for Authentication changes October 2022__
According to Netatmo the "old" way to authenticate with username and password directly by entering them into the adapter will be disabled by October 2022.

Version 2.0 of the adapter addresses this change and adjust the authentication. All upgrades before October 2022 should allow a seamless upgrade to 2.0.0 on the first start automatically - else requires a new authentication.

## __Important Note for v2.0.0!__
With v 2.0 of the adapter the object structure will change completely! Instead of names we decided to better use the unique IDs to make sure that duplicate or changing names do not produce issues.


## Installation and Configuration
You need to authenticate with your NetAtmo account using the Adapter Admin UI. 

First select all relevant device types you want to sync data for. When you change them you need to do the Authentication again later.

If you want to use a dedicated client-id/secret (see below) you can also enter them before the Authentication.

Use the "Authenticate with Netatmo" Button to start the authentication flow. A new Windows/Tab will be opened with the Netatmo Login page. After logging in and acknowledging the data access you are redirected back to your admin page.

In case of success just close the window and reload the adapter configuration. In case of an error check the error message and try again

By default, a general API key is used to do the requests which limits the update interval to 10 Minutes! 

To increase the interval or to get live updates from Welcome & Presence, CO- und Smoke-Detectors are only you need to enter an own ID/Secret from your NetAtmo App.
To do so, go to the following URL, login with your Netatmo account and fill out the requested form on https://auth.netatmo.com/access/login?next_url=https%3A%2F%2Fdev.netatmo.com%2Fapps%2Fcreateanapp !

Please make sure to configure your limits that they respect https://dev.netatmo.com/guideline#rate-limits (and have in mind that these limits also exist for ALL USERS if you do not use an own ID/Secret)

## Usage
The adapter should query all device types that you enabled in the configuration. If you change this you need to Re-Do the "Authenticate with Netatmo".

The adapter then creates states with data of the devices and extra "event" states for the devices that support this. To receive these events you need to choose the iot Instance and add a pro Cloud Account (see above).

Some devices are initialized with the latest event per type (if it happened in the last time), e.g. the cameras. For other device types (e.g. smoke/co2 sensors) the events are not pre-filled from the past and these states will be filled as soon as the next event is received.

### Special note for iDiamant/Bubendorff Roller shutters
The Netatmo API do not provide real time data for changes to the roller shutter devices. This means that the data are polled defined in the polling interval.
This basically means that the data will not be accurate in real time when the rollershutter are controller directly or via the Netatmo App.

When the devices are controlled via the adapter, it will update the values 2s and 17s after the controlling so that the data could be more up-to-date.

Depending on the device The target position can be set to any number between 0% and 100% OR only to 0% or 100% (and -1 for stop). But for these actions also the convenient buttons open, close and stop can be used.

## sendTo support

### setAway
You can also use the sendTo command to set all persons as away (for example if in use as alarm system)
```
sendTo('netatmo.0', "setAway", {homeId: '1234567890abcdefg'});
```
or
```
sendTo('netatmo.0', "setAway");
```
to mark all persons as away for all cameras

it's also possible to mark one or more specific persons as away
```
sendTo('netatmo.0', "setAway", {homeId: '1234567890abcdefg', personsId: ['123123123123123']});
```

The parameter homeId is the string listed behind the name of your Camera within the Objects tab (optional, if multiple cameras are installed),
the personsId is the id within the "Known" persons folder

### setHome
Basically the same functionality as described for "setAway" above also is existing for "setHome" to set persons or full homes as "occupied".

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
## Changelog
### 3.1.0 (2023-01-06)
* (Apollon77) Add support for Bubendorff roller shutters
* (Apollon77) Fix Monitoring State for Welcomes
* (Apollon77) Allow to just use CO2/Smoke sensors
* (Apollon77) Optimize Shutdown procedure

### 3.0.0 (2022-12-14)
* (Apollon77/bluefox) BREAKING CHANGE: Restructure Realtime events to be received via iot instance (iot >= 1.14.0 required)

### 2.1.2 (2022-11-17)
* (bluefox) Added missing objects for `Welcome` devices

### 2.1.1 (2022-09-30)
* (Apollon77) Make sure device types that require custom credentials are not selectable in UI without entering them
* (Apollon77) Fix a potential crash case

### 2.1.0 (2022-09-23)
* (Apollon77) Fix setAway
* (Apollon77) Adjust setAway/setHome message responses to return all errors/responses when multiple calls where done for multiple homes or persons

### 2.0.5 (2022-09-16)
* (Apollon77) Catch communication errors better

### 2.0.4 (2022-09-15)
* (Apollon77) Fix crash case with Smoke detector events

### 2.0.3 (2022-09-14)
* (Apollon77) Fixes and Optimizations for Doorbell devices

### 2.0.2 (2022-09-12)
IMPORTANT: This Adapter requires Admin 6.2.14+ to be configured!
* BREAKING: Object structure changes completely and now uses unique IDs instead of names!
* (Apollon77) Change the Authentication method as requested by Netatmo till October 2022
* (Apollon77) Doorbell integration
* (Apollon77) Converted to new APIs, values of several objects might be different
* (Apollon77) Fix crash cases reported by Sentry
* (Apollon77) Adjust setAway to the current API
* (Apollon77) Added setHome function (Welcome only) to mark all or specific persons as home (requires your own API key!)
* (Apollon77) setAway and setHome now also return the result of the call as callback tzo the message
* (Apollon77) Allow to edit floodlight and monitoring-state

### 1.7.1 (2022-03-30)
* (Apollon77) Fix Event cleanup

### 1.7.0 (2022-03-24)
* IMPORTANT: js-controller 3.3.19 is needed at least!
* (Apollon77) Activate events again (manually delete objects once if you get type errors)
* (Apollon77) Adjust some roles and written data to prevent warnings in logs

### 1.6.0 (2022-03-13)
* (Apollon77) Important: In person names (Welcome) in state IDs forbidden characters are now replaces by _!!
* (Apollon77) Fix another potential crash case reported by sentry

### 1.5.1 (2022-03-09)
* (Apollon77) Fix jsonconfig for Client secret

### 1.5.0 (2022-03-08)
* (kyuka-dom) Added support for netatmo carbon monoxide sensor.
* (kyuka-dom) Added support for netatmo smoke alarm.
* (foxriver76) prevent crashes if application limit reached
* (Apollon77) Allow to specify own id/secret in all cases
* (Apollon77/foxriver76) ensure that minimum polling interval of 10 minutes is respected if no individual ID/Secret is provided
* (Apollon77) Several pother fixes and optimizations
* (Apollon77) Add Sentry for crash reporting

### 1.4.4 (2021-07-21)
* (Apollon77) Fix typo that lead to a crash

### 1.4.3 (2021-06-27)
* (Apollon77) Fix typo to fix crash

### 1.4.2 (2021-06-27)
* (bluefox) Removed warnings about the type of states

### 1.4.0 (2021-06-24)
* (bluefox) Added the support of admin5 
* (bluefox) Removed warnings about the type of states

### 1.3.3
* (PArns) removed person history

### 1.3.2
* (PArns) Updated libs & merged pending patches
* (PArns) Changed update interval from 5 to 10 minutes (requested by Netatmo)

### 1.3.1
* (PArns) Fixed event cleanup crash

### 1.3.0
* (HMeyer) Added Netatmo Coach

### 1.2.2
* (PArns) Updated meta info

### 1.2.0
* (PArns) Fixed camera picture for events
* (PArns) Added camera vignette for events
* (PArns) Added camera video for events
* (PArns) Added new sub event type (human, vehicle, animal, unknown)
* (PArns) Added LastEventID within the LastEventData section

### 1.1.7
* (PArns) Added missing lib dependencies

### 1.1.6
* (PArns) Removed GIT requirement and included netatmo lib directly

### 1.1.5
* (PArns) Removed 502 error output if API has backend problems

### 1.1.4
* (PArns) Added support for unnamed modules

### 1.1.1
* (PArns) Simplified setAway

### 1.1.0
* (PArns) Added setAway function (Welcome only) to mark all or specific persons as away (requires your own API key!)

### 1.0.1
* (PArns) Fixed scope problems for presence & welcome (requires your own API key!)

### 1.0.0
* (PArns) Added live camera picture & stream for presence & welcome
* (PArns) Fixed known & unknown face image url for presence & welcome

### 0.6.2
* (PArns) Added name of last seen known face

### 0.6.1
* (PArns) Changed realtime server to use new general realtime server
* (PArns) Changed enums to channels to avoid enum creation
* (PArns) Simplified detection for movement-, known- & unknown- face events

### 0.6.0
* (PArns) Rewritten realtime updates to not need a local server any longer! Realtime updates are now turned on by default if a Welcome or Present cam is available

### 0.5.1
* (PArns) Optimized realtime updates to avoid updates if only movement was detected

### 0.5.0
* (PArns) Added realtime events for Netatmo Welcome

### 0.4.1
* (PArns) Removed log warnings for Wind sensor

### 0.4.0
* (PArns) Added absolute humidity
* (PArns) Added dewpoint

### 0.3.1
* (PArns) Reuse of preconfigured OAuth Client data
* (PArns) Added backward compatibility with existing installations

### 0.3.0
* (wep4you) Initial implementation of Netatmo welcome camera

### 0.2.2
* (PArns) Fixed SumRain24MaxDate & SumRain24Max which won't update in some rare cases

### 0.2.1
* (PArns) Corrected DateTime values & object types

### 0.2.0
* (PArns) Added SumRain1Max/SumRain1MaxDate & SumRain24Max/SumRain24MaxDate to get overall rain max since adapter installation

### 0.1.1
* (PArns) Fixed TemperatureAbsoluteMin/TemperatureAbsoluteMax

### 0.1.0
* (PArns) Fixed CO2 calibrating status
* (PArns) Added last update for devices
* (PArns) Added TemperatureAbsoluteMin/TemperatureAbsoluteMax to get overall temperature min/max since adapter installation

### 0.0.4
* (PArns) Fixed typo/missing parameter in GustStrength

### 0.0.3
* (PArns) Added error handling to prevent exceptions for missing parameters

### 0.0.2
* (PArns) Fixed rain sensor

### 0.0.1
* (PArns) Initial release

## License
MIT

Copyright (c) 2016-2023 Patrick Arns <iobroker@patrick-arns.de>
