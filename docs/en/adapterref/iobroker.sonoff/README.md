![Logo](admin/sonoff.png)
# ioBroker Sonoff

![Number of Installations](http://iobroker.live/badges/sonoff-installed.svg)
![Number of Installations](http://iobroker.live/badges/sonoff-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.sonoff.svg)](https://www.npmjs.com/package/iobroker.sonoff)

![Test and Release](https://github.com/ioBroker/ioBroker.sonoff/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/sonoff/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.sonoff.svg)](https://www.npmjs.com/package/iobroker.sonoff)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Comparison of ioBroker adapters using MQTT protocol
If you only have Tasmotas speaking MQTT protocol go for `ioBroker.sonoff`.
For other scenarios, consider the different options:

| Feature                                       | ioBroker.sonoff  | [ioBroker.mqtt](https://github.com/ioBroker/ioBroker.mqtt/) (in broker mode)  | [ioBroker.mqtt](https://github.com/ioBroker/ioBroker.mqtt/) (in client mode) | [ioBroker.mqtt-client](https://github.com/Pmant/ioBroker.mqtt-client/) |
|-----------------------------------------------|------------------|-------------------------------------------------------------------------------|------------------------------------------------------------------------------|------------------------------------------------------------------------|
| Has a built-in MQTT broker                    | yes              | yes                                                                           | no                                                                           | no                                                                     |
| Relays messages to other MQTT subscribers     | NO!!!            | yes                                                                           | not applicable                                                               | not applicable                                                         |
| External MQTT broker                          | unsupported      | unsupported                                                                   | required                                                                     | required                                                               |
| Tasmota MQTT messages to ioBroker Objects     | smart processing | 1:1 processing of all messages                                                | 1:1 processing of subscribed messages                                        | 1:1 processing of subscribed messages                                  |
| non-Tasmota MQTT messages to ioBroker Objects | no processing    | 1:1 processing of all messages                                                | 1:1 processing of subscribed messages                                        | 1:1 processing of subscribed messages                                  |
| publish ioBroker values as MQTT messages      | none             | configured subtrees                                                           | configured subtrees                                                          | individually configured values                                         |

## Usage

This adapter communicates with Sonoff devices with Tasmota firmware or ESP devices via MQTT.

The following topics are expected:
- `tele/DeviceNAME/STATE`
- `tele/DeviceNAME/SENSOR`
- `tele/DeviceNAME/INFOx`
- `tele/DeviceNAME/ENERGY`
- `cmnd/DeviceNAME/POWERx`
- `stat/DeviceNAME/POWERx`
- `/DeviceNAME/BM280/Temperature`
- `/DeviceNAME/BM280/Humidity`
- `/DeviceNAME/BM280/Temperatur`
- `/DeviceNAME/BM280/Feuchtigkeit`
- `/DeviceNAME/BM280/Vcc`
- `/DeviceNAME/BM280/VCC`
- `/DeviceNAME/BM280/Laufzeit`
- `/DeviceNAME/BM280/RSSI`
- `/DeviceNAME/BM280/POWER`
- `/DeviceNAME/BM280/POWER1`
- `/DeviceNAME/BM280/POWER2`
- `/DeviceNAME/BM280/POWER3`
- `/DeviceNAME/BM280/POWER4`
- `/DeviceNAME/BM280/Switch1`
- `/DeviceNAME/BM280/Switch2`
- `/DeviceNAME/BM280/Total`
- `/DeviceNAME/BM280/Today`
- `/DeviceNAME/BM280/heute`
- `/DeviceNAME/BM280/Yesterday`
- `/DeviceNAME/BM280/gestern`
- `/DeviceNAME/BM280/Faktor`
- `/DeviceNAME/BM280/Factor`
- `/DeviceNAME/BM280/Power`
- `/DeviceNAME/BM280/Leistung`
- `/DeviceNAME/BM280/Voltage`
- `/DeviceNAME/BM280/Spannung`
- `/DeviceNAME/BM280/Current`
- `/DeviceNAME/BM280/Strom`
- `/DeviceNAME/BM280/Punkt`
- `/DeviceNAME/BM280/Counter1`
- `/DeviceNAME/BM280/Counter2`
- `/DeviceNAME/BM280/Counter3`
- `/DeviceNAME/BM280/Counter4`
- `/DeviceNAME/BM280/Pressure`
- `/DeviceNAME/BM280/SeaPressure`
- `/DeviceNAME/BM280/Druck`
- `/DeviceNAME/BM280/Approx. Altitude`
- `/DeviceNAME/BM280/Module`
- `/DeviceNAME/BM280/Version`
- `/DeviceNAME/BM280/Hostname`
- `/DeviceNAME/BM280/IPAddress`
- `/DeviceNAME/BM280/IPaddress`
- `/DeviceNAME/BM280/RestartReason`
- `/DeviceNAME/BM280/CarbonDioxide`
- `/DeviceNAME/DHT11/Illuminance`
- `/DeviceNAME/SonoffSC/Light`
- `/DeviceNAME/SonoffSC/Noise`
- `/DeviceNAME/SonoffSC/AirQuality`
- `/DeviceNAME/SDS0X1/PM2.5`
- `/DeviceNAME/SDS0X1/PM10`
- `/DeviceNAME/SDS0X1/UvLevel`
- `/DeviceNAME/SDS0X1/Latitude`
- `/DeviceNAME/SDS0X1/Longitude`
- `/DeviceNAME/SR04/Distance`

**Note**: The list could be easily extended. Please send `Pull Requests` or *debug data* for unknown states to the developer (via issue).

## Auto-creation of objects
In the web config, you can determine which MQTT telegrams create the new objects not in default data points:

* `TELE_SENSOR` - creates objects from `tele/xxx/SENSOR` telegrams
* `TELE_STATE` - creates objects from `tele/xxx/STATE` telegrams
* `STAT_RESULT` - creates objects from `stat/xxx/RESULT` telegrams

Usually TELE_SENSOR should be sufficient for most users.

* `Create object tree` creates objects as tree structure

**Warning!** This option will mess up your sonoff object tree! You have to redo all the settings for storage...
Store the object structure as JSON file, so you can recreate your old structure.
Best is to stop the adapter, delete all objects under sonoff and start the adapter again.

## Flags for LED controllers
The mode states will be created only if the device has one of the states:

- `Red`, `Green`, `Blue`, `WW`, `CW`, `Color`, `RGB_POWER`, `WW_POWER`, `CW_POWER`, `Hue`, `Saturation`

States:

* `modeLedExor` - exor for white LEDs and color LEDs => if the white LEDs are switched on, color LEDs are switched off and vice versa (default true)
* `modeReadColors` - allow for color read from MQTT (default false)

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
## Changelog
### 3.2.1 (2024-10-07)

* (bluefox) Sanitize the IDs of the clients

### 3.2.0 (2024-08-28)
* (bluefox) Added information about connected clients in the server mode

### 3.1.2 (2024-08-17)
* (mattreim) updated packages

### 3.1.1 (2024-08-09)
* (mattreim) updated packages

### 3.1.0 (2024-05-25)
* Important: Node.js 18.x and js-controller 5.0.19+ are necessary at minimum
* (mattreim) upgraded states for Tasmota 13.4.0.3 20240402
* (mattreim) enhanced some log messages
* (mattreim) Added PWM Items
* (Apollon77) Fixed QoS handling to prevent invalid resubmissions
* (Apollon77) Prevent creation of storeMap property in common and cleanup

### 3.0.3 (2023-09-25)
* (bluefox/Bettman66) Added migration of password on JSON Config

### 2.5.7 (2023-07-07)
* (mcm1957) Disabled the logging of username and password during connection errors
* (bluefox) added json config

### 2.5.3 (2023-03-30)
* (GreatSUN) Implemented potential `.STATE.POWER` update

### 2.5.1 (2022-04-23)
* (Apollon77) Fixed the crash case reported by Sentry

### 2.5.0 (2022-03-21)
* (GreatSUN) Implement writing of NSPanel Widget changes
* (Apollon77) Fixed the crash case reported by Sentry

### 2.4.7 (2021-11-14)
* (Apollon77) Fix crash case (Sentry IOBROKER-SONOFF-1S)

### 2.4.6 (2021-11-13)
* (Apollon77) Fix some crash cases reported by Sentry (IOBROKER-SONOFF-B, IOBROKER-SONOFF-R, IOBROKER-SONOFF-4, IOBROKER-SONOFF-1, IOBROKER-SONOFF-13, IOBROKER-SONOFF-1J, IOBROKER-SONOFF-16, IOBROKER-SONOFF-3, IOBROKER-SONOFF-H)
* (Apollon77) Adjust Uptime to mixed because it seems that it can be number or string

### 2.4.5 (2021-07-21)
* (Apollon77) Fix some crash cases reported by Sentry

### 2.4.4 (2021-07-19)
* (bluefox) Added UvaIntensity and UvbIntensity

### 2.4.3 (2021-07-18)
* (bluefox) Better type detection for non-described states

### 2.4.2 (2021-07-17)
* (bluefox) Optimize for js-controller 3.3

### 2.4.1 (2021-07-17)
* (Apollon77/bluefox) Optimize for js-controller 3.3
* (Apollon77) Add Sentry for error reporting with js-controller 3.x+

### 2.4.0 (2021-02-04)
* (anwa) add several data points
* (anwa) Fix translation for 'ignorePings'
* (anwa) Fixed the wrong unit for humidity
* (anwa) Config option to create a complete object tree instead of a flat structure
* (anwa) Change Action type to string
* (Apollon77) js-controller 2.0 is required at least

### 2.3.3 (2019-11-27)
* (bluefox) Error with the empty packet was caught

### 2.3.2 (2019-10-23)
* (bluefox) Fixed the password input in the configuration
* (bluefox) Allowed setting the IP interface for server
* (bluefox) Fixed tests for js-controller 2.0
* (bluefox) Fixed the monitoring of the client connection
* (bluefox) Changed "indicator.connected" to "indicator.reachable" for clients
* (bluefox) Supported `{POWERn: "true"}`
* (bluefox) Correct processing of `{temp: nan}`

### 2.2.3 (2019-01-10)
* (simatec) Support for compact mode

### 2.2.2 (2018-06-22)
* (bluefox) Configuration was fixed

### 2.2.1 (2018-06-20)
* (bluefox) '-' in names was allowed again

### 2.2.0 (2018-05-22)
* (gemu2015) auto generate objects, support for arrays (channel), led-controllers improved

### 2.1.3 (2018-05-08)
* (bluefox) Added HC-SR04 Ultrasonic Sensor

### 2.1.2 (2018-04-23)
* (bluefox) Added support of UvLight, Longitude and Latitude

### 2.1.1 (2018-04-13)
* (bluefox) Support of the particle concentration sensor

### 2.1.0 (2018-03-30)
* (gemu2015) Support of the devices control (many thanks :)
* (gemu2015) Support of many new values
* (modmax) Update alive status of the clients
* (modmax) Added POWER5-8 and Switch3-4

### 2.0.2 (2018-03-19)
* (modmax) Fixing reconnection of clients
* (bluefox) Add SeaPressure

### 2.0.1 (2018-03-17)
* (bluefox) Replace stream handler
* (bluefox) Add timeout for clients
* (bluefox) Add Light/Noise/AirQuality
* (bluefox) Do not send pingresp for invalid clients

### 1.0.3 (2018-03-03)
* (bluefox) Add Analog0/1/2/3 sensor

### 1.0.2 (2018-02-17)
* (Apollon77) Add Illuminance sensor

### 1.0.1 (2018-02-05)
* (bluefox) Ready for admin3
* (bluefox) Added CO2 sensor

### 1.0.0 (2017-11-27)
* (AlZiBa) typo @ alive
* (AlZiBa) add Today's power consumption for Sonoff POW
* (AlZiBa) unit of power consumption is kWh

### 0.3.3 (2017-11-03)
* (bluefox) Add counters

### 0.3.2 (2017-10-22)
* (Tan-DE) Small change for Switch1. Switch2 and additional IPaddress added.

### 0.3.1 (2017-10-12)
* (bluefox) Fix tests and LWT

### 0.3.0 (2017-10-06)
* (bluefox) Add INFO and ESP

### 0.2.0 (2017-10-05)
* (bluefox) Add ENERGY and DS18x20

### 0.1.0 (2017-10-01)
* (bluefox) initial commit

## License

The MIT License (MIT)

Copyright (c) 2017-2024, bluefox <dogafox@gmail.com>

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
