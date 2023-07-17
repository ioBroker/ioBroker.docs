![Adapter Icon](admin/procon-ip.png)
# ioBroker.procon-ip

![Number of Installations](http://iobroker.live/badges/procon-ip-installed.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.procon-ip.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.procon-ip.svg)](https://www.npmjs.com/package/iobroker.procon-ip)

[![Test and Release](https://github.com/ylabonte/ioBroker.procon-ip/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/ylabonte/ioBroker.procon-ip/actions/workflows/test-and-release.yml)
[![Known Vulnerabilities](https://snyk.io/test/github/ylabonte/ioBroker.procon-ip/badge.svg)](https://snyk.io/test/github/ylabonte/ioBroker.procon-ip)
[![Buy me a coffee](https://img.shields.io/badge/buy%20me%20a%20coffee-donate-yellow.svg?style=flat)](https://www.buymeacoffee.com/ylabonte)

[![NPM](https://nodei.co/npm/iobroker.procon-ip.png?downloads=true)](https://nodei.co/npm/iobroker.procon-ip/)

## ProCon.IP pool control adapter for ioBroker
ioBroker adapter for basic support of the ProCon.IP swimming pool control
unit. It is intended for integration with your ioBroker home automation, eg.
to build logic that involves other devices or simply to be paired with your
favorite voice assistant(s):
* You can use the [_cloud_](https://github.com/ioBroker/ioBroker.cloud) or
  [_IoT_](https://github.com/ioBroker/ioBroker.iot) adapter for Alexa
  (and also Google Home, I think) and
* [_yahka_](https://github.com/jensweigele/ioBroker.yahka) as bridge to the
  Apple HomeKit to be reached by Siri or
* use the [_javascript_](https://github.com/ioBroker/ioBroker.javascript) to
  build your own custom logic.

See the [wiki](https://github.com/ylabonte/ioBroker.procon-ip/wiki) for more
information.

### What is the ProCon.IP pool control?
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

### Details on the adapter
The adapter uses the `/GetState.csv` API of the ProCon.IP to poll its values
and another - not documented - API, that operates with bitwise commands to
switch the relays. The second one is also used by the original web interfaces
of the ProCon.IP. So there might be future firmware upgrades, that brake
compatibility with this adapter or at least it functionality of switching the
relays. 

#### Compatibility
For now the adapter has been tested and developed in combination with the
ProCon.IP firmware **revision 1.7.0.c**.

## Roadmap
There is nothing special on the plan. You can create an issue to suggest new
features/functionality...

## Development and participation
Feel free to contact me, if you wish to participate in development or
documentation of this adapter.

Useful links for the approach will be
* the [TypeScript adapter template](https://github.com/ioBroker/ioBroker.template/tree/master/TypeScript)
  I had started from and
* the [guide for adapter developers](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/adapterdev.md).

## Changelog
### Release v1.3.3
* Update dependencies.

### Release v1.3.2
* Update dependencies.
* Adapter Icon change.

### Release v1.3.1
* re-add read-only restrictions on `onOff` states of dosage control relays.
* Add writable numeric `dosage` states to trigger timer-based manual dosage.

### Release v1.3.0
* Remove restrictions on dosage control relays: enable manual switching.
* Add additional boolean states for dosage control information:
  `info.system.chlorineDosageEnabled`, `info.system.phPlusDosageEnabled`, 
  `info.system.phMinusDosageEnabled`, `info.system.electrolysis` (formerly 
  only available as combined bit-state/integer value 
  `info.system.dosageControl` as delivered by the GetState.csv).
* Update dependencies.

### Release v1.2.3
* Update dependencies.

### Release v1.2.2
* Update dependencies.

### Release v1.2.1
* Fix connection problem (see [related issue](https://github.com/ylabonte/ioBroker.procon-ip/issues/29))

### Release v1.2.0
* Update `procon-ip` API library package to v1.3.2  
  (should fix a bug that let the relay switching fail).
* Fix minor issues that occur with invalid controller URLs.
* Update further dependencies.

### Release v1.1.1
* Move API library sources into a [separate package](https://www.npmjs.com/package/procon-ip).
* Update `common.name` attributes when the corresponding label changes.
* Update dependencies

### Release v1.0.2
* Fine tune the polling and control requests 
  (add additional adapter settings for this).
* Wait a configurable amount of consecutive errors, before raising the log 
  level to _Warning_ for polling requests.
* Try to send control commands two more times, if an error occurs on the 
  request. 

### Release v1.0.1
* Fix Object State updates  
  For some reason the two js objects used to compare the before and after values
  of the GetState.csv calls became the same object (before was referencing the
  new values). That caused the adapter to never update the object states.

### Release v1.0.0
* Official release in ioBroker adapter repository:  
  The most exciting change with this release is, that it's available from the
  ioBroker adapter repository. Hence you can just install it, without copy/
  pasting the github repo url of this adapter!
* Fix all open [milestone issues](https://github.com/ylabonte/ioBroker.procon-ip/milestone/1)
  especially regarding the ones resulted from the [adapter review](https://github.com/ioBroker/ioBroker.repositories/pull/756#issuecomment-646988248))
* Add/Extend documentation
  (see [wiki](https://github.com/ylabonte/ioBroker.procon-ip/wiki)).  
  Now it's up to you to extend the wiki or request me using issues to extend
  the wiki or README.md regarding a specific content.

### Release v0.4.1
* Fix write actions to the appropriate states of external relays  
  _This will add auto-recognition on whether the external relays are activated
  or not and therefore decide on how to handle write actions to the
  corresponding relay state._

### Release v0.4.0
* Add encryption for configuration settings stored in ioBroker's internal db
* Improve http request/connection error handling
* Reduce logging output
* Remove the unused admin tab

### Release v0.3.1
* Update dependencies including some reported as vulnerable
* Add connection status indication for iobroker's instance tab
* Add form validation for the configuration settings

### Release v0.2.0
* Update npm dependencies
* Group admin settings input fields in rows

### Release v0.1.1
* Update vulnerable eslint-utils

### Release v0.1.0
* Fix object attributes regarding the cloud adapter
* Pre-defined `smartName` attributes for active relays and temperature
  sensors
* Recognize relays with 'light', 'licht' or 'leucht' in its name as
  `smartType` _LIGHT_ 

### Release v0.0.4
* Update `lodash` (pinning version `4.17.14`)
* Update other indirect and direct dependencies

### Release v0.0.3
* Fix missing `value` states
* Reduce logging output

### Release v0.0.2
* Fix sys info state values

### Release v0.0.1
* All information from `GetState.csv` as readonly states
* Writable states for all relays to toggle auto/manual
* Writable states for relays not configured for dosage control to toggle on/off

## License
MIT License

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

Copyright (c) 2019-2023 Yannic Labonte <yannic.labonte@gmail.com>
