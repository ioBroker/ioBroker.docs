![Logo](https://github.com/ylabonte/ioBroker.procon-ip/blob/master/admin/procon-ip.png?raw=true)
# ioBroker.procon-ip

![Number of Installations](http://iobroker.live/badges/procon-ip-installed.svg)
![Current stable version](http://iobroker.live/badges/procon-ip-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.procon-ip.svg)](https://www.npmjs.com/package/iobroker.procon-ip)

[![Test and Release](https://github.com/ylabonte/ioBroker.procon-ip/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/ylabonte/ioBroker.procon-ip/actions/workflows/test-and-release.yml)
[![Known Vulnerabilities](https://snyk.io/test/github/ylabonte/ioBroker.procon-ip/badge.svg)](https://snyk.io/test/github/ylabonte/ioBroker.procon-ip)
![Downloads](https://img.shields.io/npm/dm/iobroker.procon-ip.svg)

ioBroker adapter for the Pool Digital ProCon.IP swimming pool controller.
It is intended for integration with your ioBroker home automation, eg.
to build logic that involves other devices or to be paired with your favorite 
voice assistant(s):
* You can use the [_cloud_](https://github.com/ioBroker/ioBroker.cloud) or
  [_IoT_](https://github.com/ioBroker/ioBroker.iot) adapter for Alexa
  (and also Google Home, I think) and
* [_yahka_](https://github.com/jensweigele/ioBroker.yahka) adapter as bridge to
  the Apple HomeKit to be reached by Siri or
* use the [_javascript_](https://github.com/ioBroker/ioBroker.javascript) 
  adapter to build your own custom logic.

See the [wiki](https://github.com/ylabonte/ioBroker.procon-ip/wiki) for more
information.

## What is the ProCon.IP pool controller?
![Picture from pooldigital.de](https://www.pooldigital.de/shop/media/image/66/47/a5/ProConIP1_720x600.png)

The ProCon.IP pool control is a low budget network attached control unit for
home swimming pools. With its software switched relays, it can control
multiple pumps (for the pool filter and different dosage aspects) either
simply planned per time schedule or depending on a reading/value from one of
its many input channels for measurements (eg. i/o flow sensors, Dallas 1-Wire
thermometers, redox and pH electrodes). At least there is also the option to
switch these relays on demand, which makes them also applicable for switching
lights (or anything else you want) on/off.
Not all of its functionality is reachable via API. In fact there is one
documented API for reading (polling) values as CSV (`/GetState.csv`). In my
memories there was another one for switching the relays on/off and on with
timer. But I cannot find the second one anymore. So not even pretty, but
functional: The ProCon.IP has two native web interfaces, which can be
analyzed, to some kind of reverse engineer a given functionality (like
switching the relays).

For more information see the following link (sorry it's only in german;
haven't found an english documentation/information so far):
* [pooldigital.de webshop](https://www.pooldigital.de/shop/poolsteuerungen/procon.ip/35/procon.ip-webbasierte-poolsteuerung-/-dosieranlage)
* [pooldigital.de forum](http://forum.pooldigital.de/)

**Just to be clear: I have nothing to do with the development, sellings,
marketing or support of the pool control unit. I just developed a solution
to integrate such with ioBroker to make my parent's home a bit smarter.**

## Details on the adapter
The adapter uses the `/GetState.csv` API of the ProCon.IP to poll its values
and another - not documented - API, that operates with bitwise commands to
switch the relays. The second one is also used by the original web interfaces
of the ProCon.IP. So there might be future firmware upgrades, that brake
compatibility with this adapter or at least it functionality of switching the
relays. 

### Compatibility
For now the adapter has been tested and developed in combination with the
ProCon.IP firmware **revision 1.7.6.a**. But it should work with any prior
newer/upcoming firmware version.

## Development and participation
Feel free to contact me, if you wish to participate in development, translation
or documentation of this adapter.

Useful links for the approach will be
* the [TypeScript adapter template](https://github.com/ioBroker/ioBroker.template/tree/master/TypeScript)
  I had started from and
* the [guide for adapter developers](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/adapterdev.md).

## Donation
If you want to support this adapter or say thank you, you can:

[<img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 40px !important;width: 144px !important;" >](https://www.buymeacoffee.com/ylabonte)

## Changelog
### 1.5.4 (2024-02-27)
* Fix the last issues that were reported by the ioBroker adapter checker.  
  (Includes a minor optimization in implementation.) 
* Update [procon-ip package](https://github.com/ylabonte/procon-ip) to the 
  latest version.

## Changelog
### 1.5.3 (2024-02-27)
* Update dependencies.

## Changelog
### 1.5.2 (2024-02-13)
* Add newline before descriptive text in adapter config.
* Update dependencies.

### 1.5.1 (2023-09-05)
* Re-translate adapter config.
* Cleanup adapter code.
* Update dependencies.

### 1.5.0 (2023-08-31)
* Breaking backward compatibility: For older installations, this update may
  require an adapter reconfiguration.
* Require `js-controller >=3.0.0`: Remove support for obsolete credential 
  encryption mechanisms (in favor to ioBroker's native encryption mechanism).
* Require `iobroker.admin >=5.0.0`: Replace old-fashioned materialize admin 
  interface with a newer JSON defined one. 

### 1.4.0 (2023-08-21)
* Add generic relay timers
  (relays must be set to 'auto' for the timer to function).
* Update dependencies.

### 1.3.3 (2023-07-13)
* Update dependencies.

### 1.3.2 (2023-07-10)
* Update dependencies.
* Adapter Icon change.

### 1.3.1 (2023-06-12)
* re-add read-only restrictions on `onOff` states of dosage control relays.
* Add writable numeric `dosage` states to trigger timer-based manual dosage.

### 1.3.0 (2023-06-11)
* Remove restrictions on dosage control relays: enable manual switching.
* Add additional boolean states for dosage control information:
  `info.system.chlorineDosageEnabled`, `info.system.phPlusDosageEnabled`, 
  `info.system.phMinusDosageEnabled`, `info.system.electrolysis` (formerly 
  only available as combined bit-state/integer value 
  `info.system.dosageControl` as delivered by the GetState.csv).
* Update dependencies.

### 1.2.3 (2023-04-29)
* Update dependencies.

### 1.2.2 (2023-01-08)
* Update dependencies.

### 1.2.1 (2022-03-28)
* Fix connection problem (see [related issue](https://github.com/ylabonte/ioBroker.procon-ip/issues/29)).

### 1.2.0 (2022-03-07)
* Update `procon-ip` API library package to v1.3.2  
  (should fix a bug that let the relay switching fail).
* Fix minor issues that occur with invalid controller URLs.
* Update further dependencies.

### 1.1.1 (2021-09-05)
* Move API library sources into a [separate package](https://www.npmjs.com/package/procon-ip).
* Update `common.name` attributes when the corresponding label changes.
* Update dependencies.

### 1.0.2 (2020-09-05)
* Fine tune the polling and control requests 
  (add additional adapter settings for this).
* Wait a configurable amount of consecutive errors, before raising the log 
  level to _Warning_ for polling requests.
* Try to send control commands two more times, if an error occurs on the 
  request. 

### 1.0.1 (2020-08-16)
* Fix Object State updates.
  For some reason the two js objects used to compare the before and after 
  values of the GetState.csv calls became the same object (before was 
  referencing the new values). That caused the adapter to never update the
  object states.

### 1.0.0 (2020-08-15)
* Official release in ioBroker adapter repository:  
  The most exciting change with this release is, that it's available from the
  ioBroker adapter repository. Hence you can just install it, without copy/
  pasting the github repo url of this adapter!
* Fix all open [milestone issues](https://github.com/ylabonte/ioBroker.procon-ip/milestone/1)
  especially regarding the ones resulted from the [adapter review](https://github.com/ioBroker/ioBroker.repositories/pull/756#issuecomment-646988248)).
* Add/Extend documentation
  (see [wiki](https://github.com/ylabonte/ioBroker.procon-ip/wiki)).  
  Now it's up to you to extend the wiki or request me using issues to extend
  the wiki or README.md regarding a specific content.

### 0.4.1 (2020-05-29)
* Fix write actions to the appropriate states of external relays.  
  _This will add auto-recognition on whether the external relays are activated
  or not and therefore decide on how to handle write actions to the
  corresponding relay state._

### 0.4.0 (2020-05-10)
* Add encryption for configuration settings stored in ioBroker's internal db.
* Improve http request/connection error handling.
* Reduce logging output.
* Remove the unused admin tab.

### 0.3.1 (2020-05-04)
* Update dependencies including some reported as vulnerable.
* Add connection status indication for iobroker's instance tab.
* Add form validation for the configuration settings.

### 0.2.0 (2020-02-09)
* Update npm dependencies.
* Group admin settings input fields in rows.

### 0.1.1 (2019-09-12)
* Update vulnerable eslint-utils.

### 0.1.0 (2019-07-21)
* Fix object attributes regarding the cloud adapter.
* Pre-defined `smartName` attributes for active relays and temperature
  sensors.
* Recognize relays with 'light', 'licht' or 'leucht' in its name as
  `smartType` _LIGHT_.

### 0.0.4 (2019-07-17)
* Update `lodash` (pinning version `4.17.14`).
* Update other indirect and direct dependencies.

### 0.0.3 (2019-07-16)
* Fix missing `value` states.
* Reduce logging output.

### 0.0.2 (2019-07-09)
* Fix sys info state values.

### 0.0.1 (2019-07-09)
* All information from `GetState.csv` as readonly states.
* Writable states for all relays to toggle auto/manual.
* Writable states for relays not configured for dosage control to toggle 
  on/off.

## License
The MIT License (MIT)

Copyright (c) 2019-2024 ylabonte <yannic.labonte@gmail.com>
