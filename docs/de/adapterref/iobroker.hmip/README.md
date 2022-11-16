---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.hmip/README.md
title: ioBroker HomeMatic IP Cloud AccessPoint-Adapter
hash: Kralf0GncOLRR7KFU6xsIHqXXzkKbZYW5rKEt+x/BAM=
---
![Logo](../../../en/adapterref/iobroker.hmip/admin/homematic.png)

![Anzahl der Installationen](http://iobroker.live/badges/hmip-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.hmip.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.hmip.svg)

# IoBroker HomeMatic IP Cloud AccessPoint-Adapter
![Testen und freigeben](https://github.com/iobroker-community-adapters/iobroker.hmip/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/hmip/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry-Berichte werden ab js-controller 3.0 verwendet.

## Haftungsausschluss
**Alle Produkt- und Firmennamen oder Logos sind Warenzeichen™ oder eingetragene® Warenzeichen ihrer jeweiligen Inhaber. Ihre Verwendung impliziert keine Zugehörigkeit zu oder Billigung durch sie oder verbundene Tochtergesellschaften! Dieses persönliche Projekt wird in der Freizeit gepflegt und hat kein geschäftliches Ziel.** **HomeMatic ist eine Marke der ELV Elektronik AG**

## Beschreibung
Dieser Adapter ermöglicht die Kommunikation mit einem HomematicIP CloudAccessPoint über die Rest API der Homematic IP Cloud

**Wichtiger Hinweis:** Bitte beschränken Sie Steueranfragen auf das Nötigste, da EQ-3 anfing, IPs zu blockieren, wenn Sie zu viel tun!

## Installation
Dieser Adapter benötigt node-js in Version >= 10.0

Hier ein Schritt-für-Schritt-Installationsvideo auf YouTube https://youtu.be/kXWfJRUYJIA

## Die Info
Die meisten Homematic IP Geräte arbeiten bereits mit der neusten Adapterversion.

Ich werde es ständig verbessern, aber es wird Zeit brauchen. Jegliche Hilfe von der Community durch z.B. Pull Request wäre sehr willkommen.

Bei nicht funktionierenden HmIP-Geräten erstellen Sie bitte ein Problem mit dieser Info (bitte eines pro Gerät und wenn möglich den technischen Namen im Betreff).
Schalten Sie die Adapterprotokollierung in ioBroker in den Silly-Modus und fügen Sie den json des Geräts hinzu, der im Problem zum Protokoll gedruckt wird.
Möglicherweise benötige ich auch einen json einer Zustandsänderung.

Vielen Dank

Wenn Sie nach Informationen suchen, ob die Alarmeinstellungen aktiv sind, müssen Sie den aktiven Status der Gruppen INTERN und EXTERN überprüfen, sie repräsentieren in Kombination die drei Alarmzustände. INTERNE und EXTERNE Aktive bedeuten Abwesend, nur EXTERNE Aktive bedeuten nur Perimeter aktiv.

##Wichtige Info was man mit diesem Adapter machen kann
!!! Mit diesem Adapter können Sie nur Ereignisse auslösen, die über die Original Homematic IP App ausgelöst werden können.
Beispielsweise haben direkte Verbindungen zwischen Geräten keine Events in der App und können auch nicht über diesen Adapter getriggert werden!!!

## Einstellungen
* Geben Sie Ihre SGTIN (Rückseite des Access Points) und die PIN (falls zuvor festgelegt) ein und bestätigen Sie die Daten durch Drücken der blauen LED-Taste. Dadurch wird ein Authentifizierungstoken erstellt.

## Spezielle Einstellungen
### HMIP-DLD (Türschlossantrieb)
Wenn Sie dem Schloss in der HmIP-App (Einstellungen / Zugangsberechtigungen) eine PIN zugewiesen haben, muss die PIN im PIN-Zustand der Geräteobjekte gesetzt werden. Es ist NICHT Ihre System-PIN!! Wenn Sie in den Einstellungen keine PIN festgelegt haben, können Sie den PIN-Status auch leer lassen.
Bitte fügen Sie zusätzlich den „iobroker“-Client zur Liste der Zugangskontroll-Clients in den HmIP-App-Einstellungen hinzu!

## Vielen Dank
* an @coreGreenberet für seine Python-Bibliothek (https://github.com/coreGreenberet/homematicip-rest-api)

*

## Diskussion im ioBroker Forum https://forum.iobroker.net/topic/27532/homematic-ip-cloud-access-point-adapter
## Adapteranfrage auf GitHub
https://github.com/ioBroker/AdapterRequests/issues/62

## Changelog
### 1.20.0 (2022-09-19)
* IMPORTANT: Node.js 12.x is now required at minimum
* Add additional fields for MULTI_MODE_INPUT_CHANNEL for Doorbell
* Add valve position for FLOOR_TERMINAL_BLOCK_MECHANIC_CHANNEL
* Add several more states for SWITCH_CHANNEL, DIMMER_CHANNEL, WEATHER_SENSOR_CHANNEL, SHUTTER_CHANNEL 
* Add channel label

### 1.19.2 (2022-09-07)
* Optimize Reconnect handling

### 1.19.1 (2022-08-21)
* Fix datatype of selfCalibrationInProgress

### 1.19.0 (2022-08-14)
* Add several more device settings that can be modified via adapter
  * accelerationSensorMode
  * accelerationSensorSensitivity
  * accelerationSensorTriggerAngle
  * accelerationSensorEventFilterPeriod
  * accelerationSensorNeutralPosition
  * notificationSoundTypeHighToLow
  * notificationSoundTypeLowToHigh
  * routerModuleEnabled
  * minimumFloorHeatingValvePosition
  * sirenWaterAlarmTrigger
  * inAppWaterAlarmTrigger
  * acousticAlarmSignal
  * acousticAlarmTiming
  * acousticWaterAlarmTrigger
  * boostDuration
* Other fixes and optimizations

### 1.18.0 (2022-06-17)
* (Apollon77) Added support for PARTICULATE_MATTER_SENSOR_CHANNEL
* (Apollon77) Correctly ignore some channels without meaningful data

### 1.17.0 (2022-04-26)
* (Apollon77) Also reinitialize objects when new groups or clients are detected
* (Apollon77) Added experimental support to set dimLevel for Multi Mode Input Dimmer channels

### 1.16.1 (2022-04-19)
* (Apollon77) Fix crash case introduced by last version

### 1.16.0 (2022-04-16)
* (Apollon77) Optimize websocket reconnection handling
* (Apollon77) Add support for GENERIC_INPUT_CHANNEL

### 1.15.5 (2022-03-20)
* (Apollon77) Optimize reconnection handling

### 1.15.4 (2022-02-19)
* (Apollon77) Fix sendDoorCommand for HmIP-MOD-HO

### 1.15.3 (2022-01-22)
* (Apollon77) Add windowOpen indicator to two more places
* (Apollon77) Optimize reconnection handling
* (Apollon77) Optimize automatic initialization of unknown devices and channels

### 1.15.2 (2022-01-04)
* (Apollon77) Wait 10s until no new "unknown state update" was received before updating the whole system

### 1.15.0 (2022-01-02)
* Node.js 10.x is now minimum required version for this adapter
* (Apollon77) Optimize WebSocket reconnection Logic
* (Apollon77) Optimize current value handling and re-set value if a state change is not processed because of an unchanged value
* (Apollon77) Implement startImpulse call for ImpulseOutputChannels for e.g. HM-WGC
* (Apollon77) Implement support for HMIP-DLD to set the lock state and also an option PIN if needed (see notes above)
* (Apollon77) Detect new and unknown devices and channels and reinitialize the structure to add the new objects on the fly
* (Apollon77) Implement DOOR_LOCK_SENSOR_CHANNEL
* (Apollon77) Ignore HEAT_DEMAND_CHANNEL, DEHUMIDIFIER_DEMAND_CHANNEL, FLOOR_TERMINAL_BLOCK_CHANNEL and CHANGE_OVER_CHANNEL because no data to prevent logs
* (Apollon77) optimize unload handling

### 1.14.0 (2021-11-07)
* (Apollon77) Lower loglevel for state change logs to debug
* (Apollon77) Add verification when reading some data to prevent crashes
* (Apollon77) Removed some generic (error/info) states that only exists on chosen devices to re-add later in a generic way

### 1.13.2 (2021-08-25)
* (Apollon77) Fix warning on js-controller 3.3 with two datapoints

### 1.13.1 (2021-08-06)
* (Apollon77) Fix warning on js-controller 3.3 with "sabotage" datapoint

### 1.13.0 (2021-06-23)
* (Apollon77) Add support for HM-WGC/IMPULSE_OUTPUT_CHANNEL

### 1.12.2 (2021-06-04)
* (Apollon77) Fix a warning in js-controller 3.3

### 1.12.1 (2021-05-13)
* (Apollon77) Fix a warning in js-controller 3.3

### 1.12.0 (2021-05-13)
* (Apollon77) Implement NOTIFICATION_MP3_SOUND_CHANNEL

### 1.11.1 (2021-05-08)
* (Apollon77) IMPORTANT: The adapter now requires js-controller 3.1 at least!
* (Apollon77) Update objects on startup to make sure definition is current
* (Apollon77) prevent warnings in js-controller 3.3

### 1.11.0 (2021-04-25)
* (Apollon77) Implement CARBON_DIOXIDE_SENSOR_CHANNEL

### 1.10.0 (2021-04-12)
* (Apollon77) Implement TEMPERATURE_SENSOR_2_EXTERNAL_DELTA_CHANNEL, DOOR_LOCK_CHANNEL and ACCESS_AUTHORIZATION_CHANNEL

### 1.9.0 (2021-02-16)
* (Apollon77) Round temperature values to nearest 0.5 degrees
* (Apollon77) Only send values to HMIP when changed (reduce traffic!)
* (Apollon77) Add debouncing to setPointTemperature changes (means value is sent out when "stable" for 5s!) (reduce traffic!)
* (Apollon77) Add throttling to other change requests (means other changes are blocked for 1s) (reduce traffic!)
* (Apollon77) Implement ANALOG_ROOM_CONTROL_CHANNEL (Sentry IOBROKER-HMIP-1X)

### 1.7.2 (2021-02-09)
* (Apollon77) Try to detect websocket connection failures start over

### 1.7.0 (2021-01-26)
* (Apollon77) add Heating Absence Permanent state and functionality
* (Apollon77) add support for MULTI_MODE_INPUT_BLIND_CHANNEL

### 1.6.2 (2021-01-21)
* (Apollon77) Add check when HMIP domain could not be determined.

### 1.6.1 (2021-01-12)
* (Apollon77) Prevent crash case (Sentry IOBROKER-HMIP-1N)

### 1.6.0 (2020-12-24)
* Important note: Please limit control requests to the bare minimum because EQ-3 started to block IPs when you do too much!
* (Apollon77) Add support for WALL_MOUNTED_THERMOSTAT_CHANNEL

### 1.5.2 (2020-12-15)
* (Apollon77) ignore DEVICE_CHANNEL_EVENT for now and also log as debug to not flood log

### 1.5.0 (2020-11-09)
* (Apollon77) Add control options for primary/secondaryShadingLevel datapoints

### 1.4.1 (2020-11-03)
* (Apollon77) fix potential crash case (Sentry IOBROKER-HMIP-1N)

### 1.4.0 (2020-10-29)
* (Apollon77) Add ROTARY_WHEEL_CHANNEL and RAIN_DETECTION_CHANNEL, ACCESS_CONTROLLER_WIRED_CHANNEL
* (Apollon77) Read home anew if no home object is provided for SECURITY_JOURNAL_CHANGED event

### 1.3.1 (2020-09-18)
* (Apollon77) Fix missing write permission for Notification Light "On" channel

### 1.3.0 (2020-09-18)
* (SliX185) Add MAINS_FAILURE_CHANNEL
* (Apollon77) Add DEVICE_RECHARGEABLE_WITH_SABOTAGE, ACCESS_CONTROLLER_CHANNEL, FLOOR_TERMINAL_BLOCK_MECHANIC_CHANNEL, DEVICE_BASE_FLOOR_HEATING, MULTI_MODE_INPUT_DIMMER_CHANNEL, MULTI_MODE_INPUT_SWITCH_CHANNEL, ANALOG_OUTPUT_CHANNEL, ACCELERATION_SENSOR_CHANNEL, TILT_VIBRATION_SENSOR_CHANNEL, SHADING_CHANNEL
* (Apollon77) try to add dim/rgb support for NotificationLight. You might need to delete/recreate the states if it is not working.
* (Apollon77) add additional functions for setOperationLock, setClimateControlDisplay, setMinimumFloorHeatingValvePosition, setRgbDimLevel. You might need to delete/recreate the states if it is not working.
* (Apollon77) adjusted some roles. You might need to delete/recreate the states if it is not working.

### 1.2.2 (2020-08-17)
* (Apollon77) Prevent Crash case (Sentry IOBROKER-HMIP-1B)

### 1.2.1 (2020-08-10)
* (Apollon77) Fix pairing process

### 1.2.0 (2020-07-26)
* (saschaabraham) Added an active property INTERNAL and EXTERNAL groups for alarm zones
* (marcus0303/slix185) added DOOR_CHANNEL properties

### 1.1.1 (2020-07-23)
* (Apollon77) Crash prevented if object is deleted by state changed (Sentry IOBROKER-HMIP-Y)

### 1.1.0 (2020-07-14)
* (Apollon77) Remember already sent unknown channel infos to not spam Sentry
* (Apollon77) Handle reconnects better (Sentry IOBROKER-HMIP-G)
* (Apollon77) Try to prevent crashes on i valid server reponses, warning is logged
* (SliX185) Add HMIP-SPDR (PASSAGE_DETECTOR_CHANNEL)

### 1.0.1 (2020-05-16)
* (Apollon77) Make sure invalid data do not crash adapter (Sentry IOBROKER-HMIP-7)
* (Apollon77) code cleanup
* (Apollon77) fix several roles (role info is not allowed)

### 1.0.0 (2020-05-12)
* (Apollon77) Add Sentry for error/crash reporting
* (Apollon77) multiple fixes and optimizations
* (Apollon77) prevent adapter crashes in some places
* (Apollon77) 
* (ApolloSK) add vaporAmount for WeatherSensorPro
* (ApolloSK) fix HmIP-SWO-PR wrong DataType actualTemperature
* (marcus0303) Added DEVICE_GLOBAL_PUMP_CONTROL, FLOOR_TERMINAL_BLOCK_LOCAL_PUMP_CHANNEL and DEVICE_INCORRECT_POSITIONED, Fixed role in _createWaterSensorChannel and function call in _createWeatherSensorPlusChannel
* (marcus0303) Added CONTACT_INTERFACE_CHANNEL for HmIP-SCI (see Issue #70 ), Added FLOOR_TERMINAL_BLOCK_CHANNEL, HEAT_DEMAND_CHANNEL, DEHUMIDIFIER_DEMAND_CHANNEL, CHANGE_OVER_CHANNEL, but without functionality, because it's not implemented in REST-API. Only to supress Warnings in Log.

### 0.0.12
* (jogibear9988) multiple fixes

### 0.0.11
* (jogibear9988) multiple fixes

### 0.0.10
* (jogibear9988) added ping/pong, enable setBoots, more units, more hardware

### 0.0.9
* (jogibear9988) fullrx and operationlock channel

### 0.0.8
* (jogibear9988) fixes a few devices

### 0.0.7
* (jogibear9988) fixes wrong state handling

### 0.0.6
* (jogibear9988) fixes for more devices, alarm handling

### 0.0.5
* (jogibear9988) more devices and big refactoring (switched from DeviceType to FunctionalChannelType)

### 0.0.4
* (jogibear9988) more devices, bugfixes. thanks to TobiasF1986, steckenpferd and Ma-ster77

### 0.0.3
* (jogibear9988) bugfixes and more devices

### 0.0.2
* (jogibear9988) bugfixes, more devices and initial support of groups

### 0.0.1
* (jogibear9988) initial release

## License
The MIT License (MIT)

Copyright (c) 2018-2022 jogibear9988 <jochen.kuehner@gmx.de>, Apollon77

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