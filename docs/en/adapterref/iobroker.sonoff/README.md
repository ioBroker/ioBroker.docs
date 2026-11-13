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

| Feature                                       | ioBroker.sonoff        | [ioBroker.mqtt](https://github.com/ioBroker/ioBroker.mqtt/) (in broker mode)   | [ioBroker.mqtt](https://github.com/ioBroker/ioBroker.mqtt/) (in client mode) | [ioBroker.mqtt-client](https://github.com/Pmant/ioBroker.mqtt-client/) |
|-----------------------------------------------|------------------------|--------------------------------------------------------------------------------|------------------------------------------------------------------------------|------------------------------------------------------------------------|
| Has a built-in MQTT broker                    | yes                    | yes                                                                            | no                                                                           | no                                                                     |
| Relays messages to other MQTT subscribers     | NO!!!                  | yes                                                                            | not applicable                                                               | not applicable                                                         |
| External MQTT broker                          | optional (bridge mode) | unsupported                                                                    | required                                                                     | required                                                               |
| Tasmota MQTT messages to ioBroker Objects     | smart processing       | 1:1 processing of all messages                                                 | 1:1 processing of subscribed messages                                        | 1:1 processing of subscribed messages                                  |
| non-Tasmota MQTT messages to ioBroker Objects | no processing          | 1:1 processing of all messages                                                 | 1:1 processing of subscribed messages                                        | 1:1 processing of subscribed messages                                  |
| publish ioBroker values as MQTT messages      | none                   | configured subtrees                                                            | configured subtrees                                                          | individually configured values                                         |

## Usage

This adapter communicates with Sonoff devices with Tasmota firmware or ESP devices via MQTT.

The following topics are expected:
- `tele/DeviceNAME/STATE`
- `tele/DeviceNAME/SENSOR`
- `tele/DeviceNAME/INFOx`
- `tele/DeviceNAME/ENERGY`
- `tele/DeviceNAME/SWITCH` (remote controls, see [Auto-creation of objects](#auto-creation-of-objects))
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

**Note**: The list could be easily extended. Please send `Pull Requests` or *debug data* for unknown states to the developer (via issue). Own topics (e.g. of rules or scripts on the device) can be added in the settings, see `Additional topics` below.

## Sending any command (`Backlog`)
Every device has the state `Backlog`. Its text is sent to `cmnd/<topic>/Backlog`, so it can be any Tasmota command, also commands without an own state, e.g. `POWER1 TOGGLE` or `POWER1 BLINK`. Several commands are separated by `;`: `POWER1 ON; Delay 100; POWER1 OFF`. The device card of the device manager shows it as a text field.

The `POWERx` states stay boolean (on/off), so that visualizations, scripts and histories keep working. Use `Backlog` for `TOGGLE` or `BLINK`.

## Encrypted connections (MQTTS)
With **Secure (MQTTS)** the built-in server accepts only TLS connections. Usually port `8883` is used for it, so set the port too. The certificates are selected from the certificates of ioBroker (admin: Settings → Certificates), empty fields use the self-signed default certificates of ioBroker. If the certificates cannot be read, the server is not started and the log tells why.

On the Tasmota side:

* TLS is only included in the `tasmota32` and `tasmota-zbbridge` builds. ESP8266 devices need an own build with `USE_MQTT_TLS`, see the [Tasmota TLS documentation](https://tasmota.github.io/docs/TLS/).
* `SetOption103 1` enables TLS, `MqttPort 8883` sets the port.
* `SetOption132 1` checks the fingerprint of the server instead of the built-in certificate authorities (Let's Encrypt, Amazon). It is required for self-signed certificates, e.g. the default ones of ioBroker. Tasmota learns the fingerprint on the first connection.
* The search for devices of the device manager writes `SetOption103 1; SetOption132 1` automatically, if the server (or in bridge mode the external broker, `mqtts://`) uses TLS.

A device without TLS on the MQTTS port is reported once per hour (`TLS connection from <address> failed`), the further attempts are logged as debug.

For the connection to an external broker see [Encrypted connections](#encrypted-connections) of the bridge mode.

## Bridge mode

By default the adapter runs a built-in TCP broker that Tasmota devices connect to directly. If you already run a dedicated MQTT broker (e.g. Mosquitto) you can use bridge mode instead — the adapter connects to your existing broker as a client.

### Configuration

In the adapter settings, activate **Use external MQTT broker** and set **External broker URL** to your broker address, e.g. `mqtt://192.168.1.10:1883` or just `192.168.1.10:1883`. Optionally set username and password. If the option is deactivated (or no URL is entered), the built-in broker is started as before.

**Credentials from the central storage:** instead of entering the user and password, you can select **Credentials: From the credential storage** - for the built-in server as well as for the external broker - and pick a credential of the form "Login & password" that is managed once in the system settings of admin (Settings → Credentials, admin 7.9.0 or newer). This is handy if the same MQTT login is used by several adapters or instances. The adapter reads the credential on start and restarts if it is changed. If the credential cannot be read, the MQTT server/connection is not started and an error is logged.

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
* `TELE_SWITCH` - creates objects from `tele/xxx/SWITCH` telegrams of remote controls (on by default)

Usually TELE_SENSOR should be sufficient for most users.

**Remote controls:** the Berry script [Tasmota-eWeLinkRemote](https://github.com/Flobul/Tasmota-eWeLinkRemote) (eWeLink R5, S-MATE) sends every press as `tele/xxx/SWITCH = {"Button1":{"Action":"single"},"Signal":-61,"DeviceId":"5AC87680",...}`. It is stored in `Button1_Action` (`single`, `double` or `hold`) and `Signal`, `DeviceId`, `DeviceType`, `Sequence`, `Timestamp`. Every press is written, also the same action again. `DeviceId` is written before `ButtonX_Action`, so a script triggered by the button can read which remote was pressed.

**Additional topics:** values on other topics than the ones above are ignored, unless the last part of the topic is listed in `Additional topics` (separated by commas, `*` as wildcard, case is ignored), e.g. `PIR*, Motion`:

* A plain value creates a read-only state with the name of the topic: `stat/xxx/PIR1 = ON` creates `PIR1`. The type is detected from the first value: a number (`1`, `25.4`), on/off (`ON`, `OFF`) or a text. An existing state keeps its type, values which do not fit (e.g. `TOGGLE` for on/off) are ignored.
* JSON is processed like `tele/xxx/SENSOR`, but under the name of the topic: `tele/xxx/Motion = {"State":"detected"}` creates `Motion_State` (`Motion.State` with `Create object tree`).
* The Tasmota telegrams (`STATE`, `SENSOR`, `RESULT`, `STATUSx`, ...) keep their own options, even with `*`.

With several remote controls, the Berry script can send every remote on a separate topic, e.g. `EweTopicMode 3 %prefix%/%topic%/Remote_%alias%` with the additional topic `Remote_*`. Then every remote gets its own states (`Remote_kitchen_Button1_Action`, ...).

* `Create object tree` creates objects as tree structure

**Warning!** This option will mess up your sonoff object tree! You have to redo all the settings for storage...
Store the object structure as a JSON file, so you can recreate your old structure.
Best is to stop the adapter, delete all objects under sonoff and start the adapter again.

## Flags for LED controllers
The mode states will be created only if the device has one of the states:

- `Red`, `Green`, `Blue`, `WW`, `CW`, `Color`, `RGB_POWER`, `WW_POWER`, `CW_POWER`, `Hue`, `Saturation`

States:

* `modeLedExor` - exor for white LEDs and color LEDs => if the white LEDs are switched on, color LEDs are switched off and vice versa (default true)
* `modeReadColors` - allow for color read from MQTT (default false)

## Roles of the objects since 5.0
Since version 5.0 the objects get roles which the type-detector recognizes correctly, so that adapters like Alexa (iot), Matter, Material or devices find the right devices: a relay as light or socket, a light with its color, dimmer and effect, a temperature sensor and so on. Before, e.g. `Wifi_Channel` or `MqttPort` were detected as dimmer and `POWER` of an RGB light was replaced by `WW_POWER`.

**The behavior of the existing objects can change:**

* The roles of the existing objects are updated as soon as the device sends the value again. Only the roles which the older versions set are changed, a role changed by you (e.g. `switch.light` on `POWER`) is kept. The ID, the name, the history settings and the value stay as they are.
* Visualizations, scripts or aliases which select the states by their role can find other states now.
* `Switch1`...`Switch28` are the inputs of the device and so read-only now.
* The most important changes:
  * network and firmware information: `info.ip`, `info.name`, `info.firmware`, `info.hardware`, ...
  * diagnostic values (`Heap`, `LoadAvg`, `Wifi_Channel`, `HTTP_API`, ...): `info.status`, `UptimeSec`: `value.interval`, `Wifi_Signal`: `value.rssi`
  * `POWER`, `POWER1`... with `switch.power`: `switch`
  * `RGB_POWER`, `WW_POWER`, `CW_POWER`: `switch.mode.color`, `switch.mode.white`, `switch.mode.coldwhite`, `Fade`, `modeLedExor`, `modeReadColors`: `switch.setting`, `Scheme`: `level.effect`, `CT`: `level.color.temperature`
  * `Today`, `Yesterday`: `value.energy.consumed`, `Vcc`: `value.voltage.vcc`, `DewPoint`: `value.temperature.dewpoint`
  * automatically created states: texts `text`, writable numbers `state` (before `level`)

A device with several relays (`POWER1`, `POWER2`, ...) in one channel is still detected only as one device, as the type-detector finds every device type only once per channel.

## Device manager
The devices are shown in the device manager of the admin with their relays, dimmers, colors, shutters and settings, which can be controlled directly there.

**Firmware update:** if "Check for firmware updates" is enabled (default), the adapter reads the latest Tasmota release from GitHub once a day. A Tasmota device with an older firmware shows the update indicator and the action "Update firmware". It sends `Upgrade 1` to the device, which downloads the firmware from its own OTA URL (by default the official release of its build variant, e.g. `tasmota` or `tasmota32`) and restarts. The dialog waits until the device reports the new version, at most 5 minutes. Development builds are not offered to be "updated" to the release they are based on.

**Search for devices:** the action "Search for devices" of the instance asks every address of the local networks (the /24 network of each own address) via the web interface of Tasmota for its status - the official Tasmota builds do not announce themselves by mDNS. The found devices are listed with their current MQTT settings, the ones already connected with this instance separately. For the selected devices the adapter enables MQTT and writes the MQTT server, port, user and password (`Backlog SetOption3 1; MqttHost ...; MqttPort ...; MqttUser ...; MqttPassword ...`). The settings are prefilled with the own address and the port and credentials of the built-in server, in bridge mode with the external broker. The devices restart and appear in the list as soon as they are connected. Devices with a web password require it in the form. If ioBroker runs in a Docker container without host network, only the network of the container is searched.

The device card shows the connection and the Wi-Fi signal (`Wifi_Signal` in dBm) live.

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
## Changelog
### 5.4.0 (2026-11-10)
* (@GermanBluefox) The built-in MQTT server supports encrypted connections (MQTTS) with the certificates of ioBroker, new option "Secure (MQTTS)". The search for devices enables TLS on the devices then (#529)

### 5.3.0 (2026-11-10)
* (@GermanBluefox) Presses of remote controls (`tele/<topic>/SWITCH`, e.g. eWeLink R5 with the Berry script Tasmota-eWeLinkRemote) are stored, new option "For tele/SWITCH" (#515)
* (@GermanBluefox) New option "Additional topics": values of own topics like `stat/<topic>/PIR1` are stored, also with wildcards (`PIR*`) (#281)
* (@GermanBluefox) Every device has the state `Backlog` to send any Tasmota command, e.g. `POWER1 TOGGLE` (#277)

### 5.2.2 (2026-11-10)
* (@patricknitsch) The firmware update dialog of the device manager recognizes the new version also with "Create object tree" ("INFO.Info1.Version"), before it waited till the timeout
* (@patricknitsch) The firmware update from the device manager clears the "Upgrade" command afterwards, so a restart of the external broker (e.g. the ioBroker MQTT adapter) does not start the update again
* (@patricknitsch) Bridge mode: "INFO.Version" and the IP address are requested again after a device restarted (e.g. after a firmware update)
* (@GermanBluefox) A device with a wrong MQTT password is reported only once per hour instead of on every connection attempt, the other attempts are logged as debug (#548)
* (@GermanBluefox) Control characters (e.g. 0x00) of a corrupted payload are escaped in the warning "cannot parse data", so they do not corrupt the log file (#586)
* (@GermanBluefox) The timers use the adapter functions, so they are cleared when the adapter stops

### 5.2.1 (2026-10-23)
* (@GermanBluefox) Firmware with other texts for ON/OFF (e.g. "AN"/"AUS" of a German build) is supported: the texts of every device are requested and recognized automatically

### 5.2.0 (2026-10-22)
* (@GermanBluefox) The MQTT login of the built-in server and of the external broker can be taken from the central credential storage of admin (Settings → Credentials), admin 7.9.0+ is required (#629)

Older changes can be found in CHANGELOG_OLD.md

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