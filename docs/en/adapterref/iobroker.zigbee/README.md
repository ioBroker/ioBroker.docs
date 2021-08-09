---
BADGE-Number of Installations: http://iobroker.live/badges/zigbee-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.zigbee.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.zigbee.svg
---
# ioBroker adapter for working with Zigbee-devices
With the Zigbee-coordinator based on Texas Instruments SoC cc253x (and others), it creates its own zigbee-network, into which zigbee-devices are connected. By work directly with the coordinator, the driver allows you to manage devices without additional gateways / bridge from device manufacturers (Xiaomi / TRADFRI / Hue). About the device Zigbee-network can be read [here (in English)](https://github.com/Koenkk/zigbee2mqtt/wiki/ZigBee-network).

## Hardware
For work, you need one of the following devices, flashed with a special ZNP firmware: [cc2531, cc2530, cc2530 + RF](https://github.com/Koenkk/zigbee2mqtt/wiki/Supported-sniffer-devices#zigbee-coordinator)

![](img/CC2531.png)
![](img/sku_429478_2.png)
![](img/sku_429601_2.png)
![](img/CC2591.png)

The necessary equipment for the firmware and the device preparation process is described [here (in English)](https://github.com/Koenkk/zigbee2mqtt/wiki/Getting-started) or [here (in Russian)](https://github.com/kirovilya/ioBroker.zigbee/wiki/%D0%9F%D1%80%D0%BE%D1%88%D0%B8%D0%B2%D0%BA%D0%B0)

The devices connected to the Zigbee-network inform the coordinator of their status and events (button presses, motion detection, temperature change). This information is reflected in the ioBroker object-states. Some ioBroker states have feedback and send commands to the zigbee-device when the value changes (switching the state of the outlet or lamp, changing the scene or the brightness of the lamp).

## Work with adapter
To start the driver, you must specify the name of the port on which the cc253x device is connected.

To connect devices, you need to switch the Zigbee-coordinator to pairing mode by pressing the green button. The countdown will begin (60 seconds) until the device connectivity is available.
To connect Zigbee devices in most cases, just press the pairing button on the device itself. But there are features for some devices. More information about pairing with devices can be found [here (in English)](https://github.com/Koenkk/zigbee2mqtt/wiki/Pairing-devices) or [here (in Russian)](https://github.com/kirovilya/ioBroker.zigbee/wiki#%D0%9F%D0%BE%D0%B4%D0%B4%D0%B5%D1%80%D0%B6%D0%B8%D0%B2%D0%B0%D0%B5%D0%BC%D1%8B%D0%B5-%D1%83%D1%81%D1%82%D1%80%D0%BE%D0%B9%D1%81%D1%82%D0%B2%D0%B0)

After successful pairing, the device appears in the configuration panel. If the device appears in the configuration panel but has the type "undefined", then this is an unknown device and can not be work with it. If the device is in the list of available devices, but added as "undefined", then try to remove the device and add it again.

## Additional info
There is a [friendly project](https://github.com/koenkk/zigbee2mqtt) with similar functionality on the same technologies, where you can work with the same devices using the MQTT protocol. Therefore, if any improvements or support for new zigbee-devices occur in the Zigbee2MQTT project, we can transfer and add the same functionality to this adapter. If you notice this, then write the issue - we'll postpone it.

There are knowledge bases that can be useful for working with Zigbee-devices and equipment:
* in English https://github.com/koenkk/zigbee2mqtt/wiki
* in Russian https://github.com/kirovilya/ioBroker.zigbee/wiki

## Changelog

### 1.5.6 (2021-05-26)
* (kirovilya) new UI add

### 1.5.5 (2021-05-05)
* Fixes for new zigbee-herdsman-converters
* UI fixes

### 1.5.3 (2021-04-30)
* (arteck) Fix for js-controller 3.3.*

### 1.5.2 (2021-04-29)
* (asgothian) Groups on dashboard


### 1.5.1 (2021-04-14)
* (kirovilya) Dashboard
* (asgothian) Groups (reworked)
* [Experimental support EZSP protocol for EFR32 chips](https://github.com/Koenkk/zigbee-herdsman/issues/319) (zigbee-herdsman)


### 1.4.4 (2021-02-14)
* (kirovilya) External converters https://www.zigbee2mqtt.io/information/configuration.html#external-converters-configuration
* (asgothian) Enhancement ping process
* (asgothian) Devive query state-button
* (asgothian) State Cleanup button
* (arteck) Setting to use exposes instead of internal device description


### 1.4.1 (2020-12)
* (o0shojo0o) added a kelvin posibility into colortemp
* (asgothian) Hue_calibration for exposed devices (Use requires PR on zigbee-herdsman-converters, PR is being worked on)
* (asgothian) fix Tuya Thermostat: restore lost property "preset"
* (asgothian) Change for Device Availability: Stagger initial ping by 200 ms to prevent network congestion due to a large number of ping requests
* (asgothian) Change for Device Availability: Ping request triggered on reconnect. Before the herdsman Ping function is used, the adapter attempts to read the "state" dp. If this is successful, no ping is sent and the state is set
* (asgothian) Change for Device Availability: Set link Quality to 0 when a device is not connected, 10 when it is reconnecting.
* (asgothian) fix for message "illegal properties x,y" - remove color and color_temp from readable states on device available again (Issue #607)
* (asgothian) RGB Color can now be entered as "named" color. Implemented names are taken from the list of extended web colors on wikipedia (https://en.wikipedia.org/wiki/Web_colors)
* (asgothian) change in how RGB color is parsed. Incomplete colors will now be parsed successfully. #FFF will result in R 0, G 15, B 255
* (asgothian) change in OTA: Message that a device does not respond for OTA query downgraded to "info" from "error"
* (asgothian) new coordinator card


### 1.4.0 (2020-12)
* Many new devices available

Starting from version 1.4.0, new devices in iobroker.zigbee will be added automatically, based on the *exposes* described in zigbee-herdsman-converters.
The *exposes* section describes the device's capabilities, events and control commands. In iobroker.zigbee these descriptions are converted to iobroker states.
This means that the new device is described correctly enough in zigbee-herdsman-converters to start working with iobroker.zigbee (do not need to add it to our /lib/devices files.js and /lib/states.js).

The only thing that is not described (yet, it may change in the future) in zigbee-herdsman-converters is the device image. This is why the device icon on network map uses external links to the resource https://www.zigbee2mqtt.io/images/devices/*.
If you want to use local images, then you need to put the image file in /admin/img and briefly describe the device in the /lib/devices.js file without the *states*:
```
{
    models: [‘01MINIZB’],
    icon: 'img/ITEAD01ZBMINI. png',
}
```
in this case, the *states* attribute will be formed based on the *exposes* description and the image will be local.

### 1.3.1 (2020-10-30)
* [Experimental Zigate support](https://github.com/Koenkk/zigbee-herdsman/issues/242) (zigbee-herdsman)
* New devices by: 
    asgothian, arteck, kirovilya, PaulchenPlump

### 1.3.0 (2020-10-07)
* More stable (zigbee-herdsman)
* Backup prior database and nv-data (for z-stack 3) before start adapter
* Allow to select bind cluster
* Admin Tab support (experimental)
* (UncleSamSwiss, DutchmanNL) Translation
* New devices by: 
    arteck, kirovilya, Shade, krumbholz, fre, Alex18081, ae, asgothian, 
    Strunzdesign, kairauer, VLGorskij, Hesse-Bub, PaulchenPlump, blackrozes

### 1.2.1 (2020-08-16)
* Fixes after changing device identify method
* (Garfonso) Allow to unbind from coordinator

### 1.2.0 (2020-08-09)
* Serialport 9.0.0. (zigbee-herdsman)
* Drop support Node < 10 (zigbee-herdsman)
* Device now identify (for zigbee-herdsman-converters) by model not zigbeeModel

Improvements and fixes:
* (Strunzdesign) Fixed the mapping between bulb levels and adapter levels
* (kirovilya) Fix ota for unavailable devices
* (kirovilya) Lazy states - created only when an event arrives
* (kirovilya) States generator - states are created depending on the device and its endpoints
* (Shade) Fixed WXKG11LM clicks
* (allofmex) Improved DeveloperTab logs
* (allofmex) Add humidity and temperature calibration state to Tuya RH3052
* (kirovilya) Fixed a typo due to which extPanID was not set
* (allofmex) Retry reconnect gateway all the time for tcp connected gateway
* (kirovilya) Allow to collect zigbee-herdsman logs to iobroker logs
* (kirovilya) Additional states for QBKG12LM

New devices:
* (kirovilya) BlitzWolf BW-IS3, Paulmann 500.67, Paulmann 798.09
* (kirovilya) DiY Geiger counter https://modkam.ru/?p=1591
* (kirovilya) DiY 8 Relays + 8 switches https://modkam.ru/?p=1638
* (kirovilya) DiY Freepad https://github.com/diyruz/freepad
* (kirovilya) Neo Zigbee Siren Alarm https://szneo.com/en/products/show.php?id=241
* (Shade) RB 278 T
* (arteck) TS0601_thermostat
* (arteck) TS0121
* (arteck) GL-D-004Z
* (Shade) WXKG07LM
* (drohne200) 1746430P7
* (sebastian) 4058075816459
* (itProfi) SGMHM-I1
* (arteck) owvfni3
* (arteck) TS0001, TS0111
* (Daniel Dreier) Paulmann 500.45
* (arteck) ZK-EU-2U
* (Newan) Busch-Jaeger 6735/6736/6737
* (andrico21) ZM-L03E-Z
* (arteck) 915005106701, 9290018187B
* (frankjoke) HGZB-20-UK, GL-W-001Z
* (arteck) 4034031P7, 3435011P7
* (arteck) TS0041
* (agross) 5062231P7, 5062431P7
* (kirovilya) TI0001-switch, TI0001-socket
* (arteck) RB 178 T
* (arteck) HGZB-07A, AV2010/22, AV2010/22A, TS0041, TS0043
* (nbars) E1744
* (Florian Look) GS361A-H04
* (arteck) ICZB-IW11SW
* (kirovilya) HS2WD-E
* (Sacred-Shadow) FL 130 C
* (arteck) HS3SA, 9290022169, 4096730U7, AC10787, SP 220, SP 222, SP 224, 07004D, BW-IS2, InstaRemote
* (kirovilya) MCLH-08, MCLH-05
* (Sacred-Shadow) 1746130P7
* (mar565) GUNNARP panel round
* (Erdnuss3003) 4090531P7


### 1.1.1 (2020-04-17)
* (kirovilya) Critical. Fixed error starting adapter if cc-chip was only flashed
* (kirovilya) Nue/3A FNB56-ZSW02LX2.0
* (Strunzdesign) Added missing raw button events for Philips Hue Smart Button ROM001
* (Sacred-Shadow) Fix Color for Outdoor Lantern W RGBW OSRAM

### 1.1.0 (2020-04-12)
new Zigbee-herdsman features:
* ConBee/RaspBee (experimental support) https://github.com/Koenkk/zigbee-herdsman/issues/72
* OTA update for some devices (IKEA, OSRAM and other) https://github.com/Koenkk/zigbee2mqtt/issues/2921
* Touchlink reset and join https://github.com/Koenkk/zigbee2mqtt/issues/2396
* Green Power devices support https://github.com/Koenkk/zigbee2mqtt/issues/3322
* (peterfido) iCasa KPD14S und KPD18S hinzu
* (kirovilya) Moes Zigbee Thermostatic Radiator
* (kirovilya) LifeControl power plug MCLH-03, bulb MCLH-02, water leak MCLH-07, door sensor MCLH-04
* (kirovilya) Philips LCT002, LCT011, LTW015, LWG004
* (kirovilya) Gledopto GL-C-007 with with channel
* (MultivitaminJuice) Iluminize 511.040
* (Sacred-Shadow) Bitron 902010/24
* (kirovilya) Color indication of LQI and Battery icon
* (kirovilya) Device info modal dialog
* (arteck) Philips LCT026
* (obakuhl) Improvements Osram switch mini
* (arteck) Nue / 3A FB56+ZSW1GKJ2.5, LXN-1S27LX1.0
* (agross) Philips Signe Floor and Table
* (arteck) TRADFRI bulb E14 WS 470lm, OSRAM PAR16 TW Z3
* (kirovilya) Smart remote controller (4 buttons)
* (allofmex) OTA updates
* (kirovilya) Aqara opple change mode keys (for binding)
* (palsch) Heiman HS2WD-E siren

### 1.0.4 (2020-03-14)
* (kirovilya) Philips Hue Adore Bathroom Mirror Light
* (kirovilya) Oujiabao Gas and carbon monoxide alarm
* (kirovilya) Tuya SOS button
* (Erdnuss3003) Schwaiger ZBT-DIMLight-GLS0800
* (arteck) Smart Home Pty FB56-ZCW11HG1.4, LXT56-LS27LX1.7
* (arteck) Xiaomi plug lumi.plug.mmeu01
* (arteck) Innr RS 228 T, RS 230 C
* (arteck) Gledopto GL-MC-001, GL-D-003ZS
* (allmyjoes) Bitron AV2010/21A
* (arteck) Osram Panel TW 595 UGR22
* (kirovilya) IKEA SURTE door WS 38x64
* (andigandi) Philips Hue LCG002, Hue LTG002
* (arteck) iCasa ICZB-FC
* (arteck) Osram A60 DIM Z3
* (arteck) Paulmann 371000001
* (DaCHRIS) Osram PAR16 DIM Z3
* (DaCHRIS) Philips LWG001
* (DaCHRIS) Illuminize 511.202
* (SchumyHao) TERNCY-SD01 knob dimmer
* (SchumyHao) Xiaomi lumi.lock.aq1
* (kirovilya) New eWeLink devices: button, TH sensor, contact sensor, motion sensor
* (kirovilya) Allow pairing to routers (again)
* (Erdnuss3003) Philips Hue LCT021
* (root) Trust ZWLD-100 water leak sensor
* (smartpran) Bitron AV2010/32

### 1.0.3 (2020-02-09)
* (Tw1nh34d) Hornbach FLAIR LED
* (asgothian) Hue smart button, Heiman smoke sensor
* (kirovilya) Philips LTC014, LTC015
* (kirovilya) Power states for QBKG11LM
* (Garfonso) Change role for occupancy state to 'sensor.motion'
* (kirovilya) Change illuminance state to illuminance_lux (for lux value)
* (arteck) Philips LCF002
* (arteck) TRADFRI open/close remote
* (kirovilya) Tuya sensor TS0201

### 1.0.2 (2020-01-29)
* (kirovilya) All button events for Aqara Opple switch
* (ma-john) OSRAM PAR16 RGBW Z3
* (arteck) Phillips LWA004
* (MiniMe6666) Heiman SmokeSendor-N-3.0
* (kirovilya) Force remove device
* (kirovilya) Fix some networkmap bugs
* (kirovilya) Extended info button
* (kirovilya) Long press for WXKG01LM

### 1.0.1 (2020-01-23)
* fix for old z-stack firmware

### 1.0.0 (2020-01-22)
* Powered by new [zigbee-herdsman](https://github.com/Koenkk/zigbee-herdsman) library and new [converters database](https://github.com/Koenkk/zigbee-herdsman-converters)
* Drop support NodeJS 6
* Serialport 8.0.5 (in zigbee-herdsman)
* More new devices
* Some design update
* Binding

## License
The MIT License (MIT)

Copyright (c) 2018-2021 Kirov Ilya <kirovilya@gmail.com>

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