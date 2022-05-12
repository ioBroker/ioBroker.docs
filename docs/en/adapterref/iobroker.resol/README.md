# ioBroker.resol

![Logo](admin/resol.svg)

![Number of Installations (latest)](http://iobroker.live/badges/resol-installed.svg)
[![NPM version](https://img.shields.io/npm/v/iobroker.resol.svg)](https://www.npmjs.com/package/iobroker.resol)
![Number of Installations (stable)](http://iobroker.live/badges/resol-stable.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/Grizzelbee/ioBroker.resol/badge.svg)](https://snyk.io/test/github/Grizzelbee/ioBroker.resol)
[![CodeQL](https://github.com/Grizzelbee/ioBroker.resol/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/Grizzelbee/ioBroker.resol/actions/workflows/codeql-analysis.yml)
[![Test and Release](https://github.com/Grizzelbee/ioBroker.resol/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/Grizzelbee/ioBroker.resol/actions/workflows/test-and-release.yml)
[![NPM](https://nodei.co/npm/iobroker.resol.svg?downloads=true)](https://nodei.co/npm/iobroker.resol/)

[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/grizzelbee/iobroker.resol/blob/master/README.md#License)
[![Downloads](https://img.shields.io/npm/dm/iobroker.resol.svg)](https://www.npmjs.com/package/iobroker.resol)

## Credits
This adapter is derived from the myVbus adapter and based on the work of by DutchmanNL and pdbjjens. Many thanks to both of them for their work.
Since pdbjjens only wanted to read values from vbus and for some people there is a need to get more control of their devices - this adapter was risen.
Here you get the ability to control your vbus controller.


## ioBroker Adapter for Resol VBus
This adapter connects various VBus-based devices to ioBroker supporting various connection types. 

> If you like this adapter and consider supporting me <br/>
> [![Donate with payPal](admin/paypal-donate-button.png)](https://www.paypal.com/donate/?hosted_button_id=SPUDTXGNG2MYG)



It's using resol-vbus, a JavaScript library provided by Daniel Wippermann.
Please visit <https://github.com/danielwippermann/resol-vbus>  if you're interested in a deeper dive. 

## Features

* Enables reading of the measurement data from various RESOL(R) VBus(R) devices - preferably solar and system controllers from the DeltaSol(R) series including built-in heat quantity meters (HQM) - using DL3 or DL2 data loggers, KM2 communication modules, VBus/LAN interface adapters or serial/LAN gateways locally via TCP/IP.
* Device access using the VBus/USB serial interface adapter or via VBus.net(R) using DLx/KMx is also supported.
* Processes live VBus data streams and makes them available as ioBroker states.
* Values are updated with a configurable cycle time.
* Reading or setting the VBus device configuration parameters is not supported. The tools provided by Resol should be used for this, e.g. via VBus.net or the parameterization tool RPT.
* Reading DL3 channel 0 (sensors directly connected to the DL3 device) is not supported due to limitations of the DL3 interface.

## Configuration hints

* The default setting for the connection type is VBus/LAN, but it must be explicitly selected even for VBus/LAN, otherwise no connection will be established.
* The correct settings for direct LAN access for VBus/LAN, DL3, DL2, KM2 are:
  * Connection type: VBus/LAN or KM2 or DL2 or DL3
  * Connection identifier: IP address (e.g. 192.168.178.188) or FullyQualifiedHostName (e.g. host1.example.com)
  * VBus password: YourVBusPassword (default: vbus)
  * Connection port: Default setting 7053 should not be changed
  * DL3 channel: Only relevant for DL3 (values 1-6, channel 0 can not be read out)
  * Update interval: Time between updates of the measured values (default 30s)
* The correct settings for the DL3, DL2, KM2 access via VBus.net are:
  * Connection type: vbus.net
  * Connection identifier: leave blank
  * Connection port: Default setting 7053 should not be changed
  * VBus password: YourVBusPassword (default: vbus)
  * DL3 channel: Only relevant for DL3 (values: 1-6, channel 0 cannot be read out)
  * Via identifier: Your Via-tag (e.g. d1234567890.vbus.io) - without http:// before
  * Update interval: Time between the update of the measured values (default 30s)

### Examples:
#### Connection via USB/Serial

| Operating System | Connectiondevice | Device-address      | Port | DL3-Channel | Via-Tag |   
|------------------|------------------|---------------------|------|-------------|---------|
| Windows          | USB/Serial       | COMx                |      | None        |         |
| Linux            |                  | /dev/tty.usbserial/ |      | None        |         |

#### Connection via LAN 
This includes: 
  * LAN
  * KM2 Devices
  * DL2 Devices 
  * DL3 Devices (Selection of Channel is important, Channel 0 is not supported)
  * Serial to LAN Gateways

|         | Connectiondevice             | Device-address            | Port           | DL3-Channel                         | Via-Tag     |   
|---------|------------------------------|---------------------------|----------------|-------------------------------------|-------------|
|         | select your Device from List | IP-Address of your Device | TCP Port       | DL3 Channel to use, when applicable | leave blank |
| Example | KM2                          | 192.168.17x.xxx           | 7053 (Default) | None                                |             | 
| Example | DL2                          | 192.168.17x.xxx           | 7053 (Default) | None                                |             | 
| Example | DL3                          | 192.168.17x.xxx           | 7053 (Default) | Channel x                           |             | 

#### Connection via vbus.net by Resol
You'll find your personal per device Via-tag on the vbus.net homepage under: My VBus.net - My devices.
Best is to copy/paste it from there - **without http://**
 
|                   | Connectiondevice          | Device-address | Port           | DL3-Channel | Via-Tag                          |   
|-------------------|---------------------------|----------------|----------------|-------------|----------------------------------|
|                   | select vbus.net from List | leave blank    | TCP Port       | None        | your Via-tag from resol vbus.net |
| Example KM2 / DL2 | vbus.net                  |                | 7053 (Default) | None        | d01234567890.vbus.net            | 
| Example KM2 / DL2 | vbus.net                  |                | 7053 (Default) | None        | d01234567890.vbus.io             | 
| Example Dl3       | vbus.net                  |                | 7053 (Default) | Channel x   | d01234567890.vbus.io             | 
 
 
#### Sending commands to resol device

Edit the file of your controller you will find in the installed directory 'lib\resol-setup'

{"dp": [{"dpName":"Pumpe1","type":"number","min":0,"max":2},
	    {"dpName":"Pumpe2","type":"number","min":0,"max":2},
		{"dpName":"AutoRueckkuehl","type":"number","min":0,"max":1}
	   ],
	   
"fct": [{"name":"Pumpe1","cmd":"Handbetrieb1","val":"val"},
		{"name":"Pumpe2","cmd":"Handbetrieb2","val":"val"},
		{"name":"AutoRueckkuehl","cmds":[{"cmd":"ORueckkuehlung","val":"val"},{"cmd":"OHolyCool","val":"val"}]}
	   ]}
 
The items "dp" will be created after installing the adapter
The items "fct", "name" there is the link of the dpName. 
Example : If you change the value in the object "Pumpe1" then the adapter sends the command "Handbetrieb1" with the value to the resol device.
Also more than one command are possible. E.g. "AutoRueckkuehl"
 
#### How to add a new command 

e.g cooling for device resol cs plus

Please notice the device id in the resol objects (8721)
Open the selector file lib/resol-setup/Setup-Resol-Types.js and notice the line according to the device identifier
{"id":8721,"setup":"setup-resol-deltasol-cs-plus","data":"resol-deltasol-cs-plus-110-data"},
 
Open the file resol-deltasol-cs-plus-110-data.js in directory  resol-vbus/src/configuration-optimizers
Search in this file for 'ORueckkuehlung'

Open the file setup-resol-deltasol-cs-plus.js in directory lib/resol-setup/
Add a line in "dp" {"dpName":"Rueckkuehlung","type":"number","min":0,"max":1}
Add a line in "fct" {"name":"Rueckkuehlung","cmd":"ORueckkuehlung","val":"val"},

The file should look like this

{"dp": [{"dpName":"Pumpe1","type":"number","min":0,"max":2},
	    {"dpName":"Pumpe2","type":"number","min":0,"max":2},
		{"dpName":"Rueckkuehlung","type":"number","min":0,"max":1},
		{"dpName":"AutoRueckkuehl","type":"number","min":0,"max":1}
	   ],
	   
"fct": [{"name":"Pumpe1","cmd":"Handbetrieb1","val":"val"},
		{"name":"Pumpe2","cmd":"Handbetrieb2","val":"val"},
		{"name":"Rueckkuehlung","cmd":"ORueckkuehlung","val":"val"},
		{"name":"AutoRueckkuehl","cmds":[{"cmd":"ORueckkuehlung","val":"val"},{"cmd":"OHolyCool","val":"val"}]}
	   ]}
	   
Save the file and restart the adapter, you will find now a new object Rueckkuehlung.

## Todo

## Changelog
### **WORK IN PROGRESS**

### v1.1.6 (2022-05-04)
* (grizzelbee) Fix: [#103](https://github.com/Grizzelbee/ioBroker.resol/issues/103) Fixed support for Serial-to-LAN-Gateway connections (Disabled credentials handshake - which is not necessary over serial ports.)

### v1.1.5 (2022-04-29)
* (grizzelbee) New: [#96](https://github.com/Grizzelbee/ioBroker.resol/issues/96) Fixed Cosmo-Multi-2 support (Faking a DeltaSol-E now)

### v1.1.0 (2022-04-28)
* (grizzelbee) New: [#96](https://github.com/Grizzelbee/ioBroker.resol/issues/96) Added support for DeltaSol-E and improved support for Cosmo-Multi-2 controllers

### v1.0.0 (2022-04-25)
* (grizzelbee) New: [#94](https://github.com/Grizzelbee/ioBroker.resol/issues/94) Added support for Cosmo controllers (No Sensor connected = 888°C)
* (grizzelbee) Upd: Pushed version from 0.4.4 to v1.0.0 to be compliant to semver
* (grizzelbee) Upd: Dependencies got updated

### v0.4.4 (2022-03-17)
* (grizzelbee) New: Added donate button to config page and readme
* (grizzelbee) Upd: Dependencies got updated

### v0.4.3 (2022-02-08)
* (grizzelbee) Fix: fixed wrong state role "switch" and changed to "level"

### v0.4.2 (2022-01-05)
* (grizzelbee) Fix: Removed password encryption stuff from admin to avoid double encryption

### v0.4.1 (2022-01-05)
* (grizzelbee) Fix: switched action roles from "indicator" to "switch" to be compliant with ioBroker rules
* (grizzelbee) Fix: Removed password encryption stuff and added dependency Admin >=4.0.9
* (grizzelbee) Fix: Fixed a few code warnings
* (grizzelbee) Fix: Fixed: info.connection has been written w/o ACK 
* (grizzelbee) Upd: updated dependencies

### v0.4.0 (2021-11-08)
* (grizzelbee) Upd: updated dependencies
* (grizzelbee) New: Trying more than one time to connect when network isn't setup properly. E.g. on router startup.

### v0.3.3 (2021-11-04)
* (grizzelbee) Upd: updated dependencies
* (grizzelbee) Upd: Switched from adapter-type climate-control to energy

### v0.3.2 (2021-09-16)
* (grizzelbee) Upd: updated dependencies
* (grizzelbee) Fix: [#27](https://github.com/Grizzelbee/ioBroker.resol/issues/27) Fixed: State value to set for "resol.0.xxx.010221110010002220" has to be type "number" but received type "string" - it may be needed to delete datapoints manually
* (grizzelbee) Upd: set correct tier in io-package
* (grizzelbee) New: Writing value null when received value is <= -999 and >= 999. This is to avoid writing crap when no sensors are connected. 
* (grizzelbee) New: Making use of adapter internal decrypt function (req. at least js-controller >= 3.0)

### v0.3.1 (2021-05-07)
* (gargano)    Fix: wrong object types fixed according JS-Controller 3.x
* (gargano)    Fix: prevent setState if value = undefined
* (gargano)    Upd: Updated resol lib by Daniel Wippermann to v0.22.0
* (grizzelbee) New: Added sentry
* (grizzelbee) Fix: Made eslint happy
* (grizzelbee) Upd: updated dependencies

### v0.3.0 (2021-01-xx)
* (grizzelbee) Upd: Updated dependencies
* (grizzelbee) New: Log connection-losts as info

### v0.2.1 (2021-01-23)
* (gargano)    New: write function to resol device added

### v0.2.0 (2021-01-18)
* (grizzelbee) New: New Icon
* (grizzelbee) Upd: Update resol-Bus lib to V0.21.0 
* (grizzelbee) Upd: Security-Update to lodash lib 
* (grizzelbee) Upd: Reorganized configuration to get it more intuitive  
* (grizzelbee) Upd: Config-page translated via gulp
* (grizzelbee) New: Changed the way to configure access via vbus.net to be more intuitive
* (grizzelbee) New: Extended documentation
* (grizzelbee) Fix: Adapter doesn't crash on connection losts anymore

### v0.1.0 (2020-03-29)
* (grizzelbee) Fix: config page shows current settings now (not default anymore) **May raise the need to reenter the password!**
* (grizzelbee) Fix: "Connected" state is updated correctly now if connection is disrupted.
* (grizzelbee) New: Added Badge for latest(npm) version to readme
* (grizzelbee) Fix: removed default password from config to ensure it's encrypted on first config
* (grizzelbee) Fix: removed Force-ReInit
* (grizzelbee) Fix: sensor maintenance indicators are working booleans now
* (grizzelbee) New: added new activity indicator states for each relais.
* (grizzelbee) New: testing configuration to avoid start with invalid config

### v0.0.6
* (pdbjjens) alpha 6 release updated dependencies

### v0.0.5
* (pdbjjens) alpha 5 release improved type and role mapping of adapter values

### v0.0.4
* (pdbjjens) alpha 4 release updated dependency on resol-vbus library to 0.21.0

### v0.0.3
* (pdbjjens) alpha 3 release tested with DL3 over local LAN and VBus.net and DeltaSol SLT (0x1001) incl. HQM (0x1011)

### v0.0.2
* (pdbjjens) alpha 2 release tested with VBus/LAN, KM2, VBus.net and DeltaSol E (0x7721 & 0x7722), DeltaSol M (0x7311 & 0x716), DeltaSol CS Plus (0x2211), Oventrop RQXXL (0x7541)

### v0.0.1
* (pdbjjens) initial release tested only with VBus/USB (Serial) and DeltaSol(R) BS2009 (0x427B)

## Legal Notices

RESOL, VBus, VBus.net, DeltaSol and others are trademarks or registered trademarks of RESOL - Elektronische Regelungen GmbH
<https://www.resol.de/en>

All other trademarks are the property of their respective owners.

## sentry.io

This adapter uses sentry.io to collect details on crashes and report it automated to the author.
The [ioBroker.sentry plugin](https://github.com/ioBroker/plugin-sentry) is used for it. Please refer to
the [plugin homepage](https://github.com/ioBroker/plugin-sentry) for detailed information on what the plugin does, which information is collected and how to disable it, if you don't like to support the author with you're information on crashes.



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

## Copyright

Copyright (c) 2022 grizzelbee <open.source@hingsen.de>

