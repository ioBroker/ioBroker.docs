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
| External MQTT broker                          | optional (bridge mode) | unsupported                                                              | required                                                                     | required                                                               |
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

## Bridge mode

By default the adapter runs a built-in TCP broker that Tasmota devices connect to directly. If you already run a dedicated MQTT broker (e.g. Mosquitto) you can use bridge mode instead — the adapter connects to your existing broker as a client.

### Configuration

In the adapter settings, activate **Use external MQTT broker** and set **External broker URL** to your broker address, e.g. `mqtt://192.168.1.10:1883` or just `192.168.1.10:1883`. Optionally set username and password. If the option is deactivated (or no URL is entered), the built-in broker is started as before.

**Topics to subscribe** defines which topics the adapter listens to, by default `tele/#, stat/#, +/tele/+, +/stat/+`. Extend this list if your devices use other topics, e.g. OpenBeken devices, which publish to `<devicename>/...`, or a global prefix in the full topic (`myPrefix/tele/#`).

Optionally you can set the **Client ID** used at the broker (default `iobroker_sonoff_<instance>`), the **Keepalive** interval and **Clean session**. Deactivate the clean session if the broker should store the messages of the devices while the adapter is not running.

### Full topic structures

The usual Tasmota `FullTopic` settings are supported and detected automatically per device, commands are sent back in the same structure:

| FullTopic | Example | Command |
|---|---|---|
| `%prefix%/%topic%/` (default) | `tele/lamp/STATE` | `cmnd/lamp/POWER` |
| `%topic%/%prefix%/` | `lamp/tele/STATE` | `lamp/cmnd/POWER` |
| `gateway/%prefix%/%topic%/` | `gateway/tele/lamp/STATE` | `gateway/cmnd/lamp/POWER` |
| `gateway/%topic%/%prefix%/` | `gateway/lamp/tele/STATE` | `gateway/lamp/cmnd/POWER` |

Nested topics like `tele/house/floor1/lamp/STATE` work as well. A fix prefix in front of the full topic (last two lines, e.g. for several gateways on one broker) is only recognized if the subscriptions cover it, so add e.g. `gateway/tele/#, gateway/stat/#` to **Topics to subscribe**. The same is true for the `%topic%/%prefix%/` structure, which is covered by `+/tele/+, +/stat/+` by default.

### Encrypted connections

Use `mqtts://broker:8883` (or `wss://`) as URL. For self-signed certificates deactivate **Check the certificate of the broker**, or enter the path to your **CA certificate**. If the broker requires client certificates, the paths to the **client certificate** and the **client key** can be entered too. The files are read from the file system of the ioBroker host.

### Device naming

In bridge mode the adapter cannot see the MQTT CONNECT packets of the devices (MQTT protocol limitation), so the name of a device is taken from its messages:

1. `MqttClient` from `stat/<topic>/STATUS6` - this is the MQTT client ID, so the devices get the same names as with the built-in broker. The adapter requests this information (`cmnd/<topic>/Status 6`) as soon as an unknown device appears.
2. `Hostname` from `tele/<topic>/STATE`, `tele/<topic>/INFO2` or `stat/<topic>/STATUS5`, if the device does not answer the status request.
3. The topic itself, if nothing arrives within 30 seconds (e.g. devices with custom firmware).

A device is only renamed if the new name comes from the same or a better source, so the objects do not change back and forth. If a device is renamed in Tasmota, the adapter renames the corresponding ioBroker objects, but references in other adapters (history, VIS, ...) must be adjusted manually.

Because the external broker keeps running while the adapter restarts, the devices do not repeat their boot messages. To fill `INFO.Hostname`, `INFO.IPAddress` and `INFO.Version`, the adapter requests them (`cmnd/<topic>/Status 5` and `cmnd/<topic>/Status 2`) when a device is seen the first time. `Module` (from INFO1) cannot be requested and stays empty.

### Availability

With the built-in broker the `alive` state follows the TCP connection of the device. In bridge mode the last will topic (`tele/<topic>/LWT`) is used instead: `Online` sets `alive` to true, `Offline` to false.

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

### **WORK IN PROGRESS**
* (stony2k) Add bridge mode to connect to an external MQTT broker instead of running a built-in broker
* (stony2k) Fix alive state object not being created (warning "has no existing object")
* (bluefox/GreatSUN) Fixed the names of data points inside a group: since 3.3.0 e.g. `SML_Total_in` was created as `SML_in` (#489)
* (bluefox) The states which were created with a shortened name by 3.3.x are listed in the log on start, so they can be deleted (#489)
* (bluefox) Bridge mode: the topics to subscribe are configurable now and nested full topics as well as OpenBeken topics are supported
* (bluefox) Bridge mode: devices are named after their MQTT client ID like with the built-in broker and are no longer renamed by less reliable sources
* (bluefox) Bridge mode: the `alive` state is set from the last will topic (LWT), so devices are recognized as offline
* (bluefox) Commands for auto-created states are sent to `cmnd/...` again, also for nested full topics
* (bluefox) `info.connection` contains the list of the connected clients again (server mode), in bridge mode the URL of the broker
* (bluefox/patricknitsch) Bridge mode: support for the full topic structure `%topic%/%prefix%/` (device first), detected automatically per device
* (bluefox/patricknitsch) Bridge mode: encrypted connections with CA/client certificates and optional certificate check, configurable client ID, keepalive and clean session
* (bluefox/patricknitsch) Bridge mode: a fix prefix in front of the full topic (e.g. `gateway/tele/device/STATE`) is recognized and used for the commands
* (@Apollon77/@copilot) Add support for OpenBeken LED datapoints (led_enableAll, led_dimmer, led_temperature, led_basecolor_rgb, led_finalcolor_rgbcw, led_basecolor_rgbcw, led_hue, led_saturation) - enables control of OpenBeken LED devices with automatic topic mapping for /get and /set suffixes
* (@Apollon77/@copilot) Add PulseTime1-PulseTime16 datapoint support - users can now read and set PulseTime values directly from ioBroker to control relay auto-off timers

### 3.3.0 (2025-09-20)
* (@Apollon77/@copilot) **IMPORTANT**: Commands now correctly use cmnd/ prefix instead of tele/ prefix
* (@Apollon77/@copilot) Added configuration for advanced MQTT settings
* (@Apollon77/@copilot) Fix shutter command mapping to use correct Tasmota format - Transforms Shutter1_Position to ShutterPosition1 for proper device control
* (@Apollon77/@copilot) Fix IRHVAC Power, Light and Mode fields showing NULL instead of actual string values
* (@Apollon77/@copilot) Add Zigbee device control support for Tasmota coordinators - users can now control Zigbee devices (Power/Dimmer) through ioBroker states via automatic ZbSend command generation
* (@Apollon77/@copilot) Add support for Tasmota tele/MARGINS messages enabling integration of PowerLow, PowerHigh, and PowerDelta limits
* (@Apollon77/@copilot) Fix POW R2 energy datapoints not being created by enabling TELE_STATE by default
* (@Apollon77/@copilot) Fix pressure and temperature unit display to respect PressureUnit and TempUnit from Tasmota MQTT messages
* (@Apollon77/@copilot) Add support for decoupled button actions in Tasmota devices - creates Button1-Button8 datapoints for button events
* (@Apollon77/@copilot) Fix RESULT message processing bug where tele/*/RESULT messages were incorrectly processed as WAKEUP instead of RESULT
* (@Apollon77/@copilot) Fix deprecated value.power.consumption role for ENERGY_Power datapoint to improve device detection
* (@Apollon77/@copilot) Add support for SHUTTER5-SHUTTER16 datapoints for ESP32 shutter32 devices
* (@Apollon77/@copilot) Update admin UI responsive design to use ioBroker standard values for mobile compatibility
* (@Apollon77/@copilot) Add support for Sonoff B1 (RGB LED) and Sonoff SC (Environmental Sensor) devices with proper value ranges
* (@Apollon77/@copilot) Add meaningful state labels for Scheme datapoint (color animation schemes)
* (@Apollon77/@copilot) Add configuration option to suppress "not connected" warnings for temporarily offline devices
* (@Apollon77/@copilot) Add Switch5-Switch28 datapoint definitions for consistent boolean mapping
* (@Apollon77/@copilot) Fix write flag for all Switch datapoints to enable proper control from ioBroker

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

Copyright (c) 2017-2026, bluefox <dogafox@gmail.com>

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
