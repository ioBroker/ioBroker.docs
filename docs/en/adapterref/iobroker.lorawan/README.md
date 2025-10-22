![Logo](admin/lorawan.png)
# ioBroker.lorawan

[![NPM version](https://img.shields.io/npm/v/iobroker.lorawan.svg)](https://www.npmjs.com/package/iobroker.lorawan)
[![Downloads](https://img.shields.io/npm/dm/iobroker.lorawan.svg)](https://www.npmjs.com/package/iobroker.lorawan)
![Number of Installations](https://iobroker.live/badges/lorawan-installed.svg)
![Number of Installations](https://iobroker.live/badges/lorawan-stable.svg)
![Test and Release](https://github.com/BenAhrdt/ioBroker.lorawan/workflows/Test%20and%20Release/badge.svg)
[![Donate](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)](https://paypal.me/besc83)

[![NPM](https://nodei.co/npm/iobroker.lorawan.png?downloads=true)](https://nodei.co/npm/iobroker.lorawan/)

## lorawan adapter for ioBroker
The adapter communicates bidirectionally with LoraWan devices via LoRaWAN Network Server via MQTT protocol.
“The Thinks Network” and “Chirpstack” are supported now, more could follow later. 
Adapter was created in collaboration with Joerg Froehner LoraWan@hafenmeister.com

For Documentation use the doc folder.
For now there is documentation in English here: https://wiki.hafenmeister.de

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.18.0 (2025-10-19)
* (BenAhrdt) New NPM Auorisation

### 1.17.19 (2025-10-07)
* (BenAhrdt) improve Bridge Handling

### 1.17.18 (2025-10-06)
* (BenAhrdt) push NextSend

### 1.17.17 (2025-10-04)
* (BenAhrdt) serialize appending Data on NextSend
* (BenAhrdt) update assignhandler (SensorTemperature)

### 1.17.16 (2025-09-25)
* (BenAhrdt) bring state_off topic to humidifier

### 1.17.15 (2025-09-25)
* (BenAhrdt) notifi new discover in case of oldDiscoveredDevices
* (BenAhrdt) bugfix debug logging

### 1.17.14 (2025-09-24)
* (BenAhrdt) add humidifier to foreign States

### 1.17.13 (2025-09-24)
* (BenAhrdt) Bugfix discover new devices

### 1.17.12 (2025-09-24)
* (BenAhrdt) Virtual Mode in default selected for Climate Entities
* (BenAhrdt) improve hidden attribute for climate entitie in LoRaWAN
* (BenAhrdt) change discovery delete {} => ''

### 1.17.11 (2025-09-23)
* (BenAhrdt) dont fillDownlinks in case of not implemented messagetype
* (BenAhrdt) type of json ids changed to string

### 1.17.10 (2025-09-23)
* (BenAhrdt) Update topics und qnique ids

### 1.17.9 (2025-09-20)
* (BenAhrdt) setdefault defiveidentifier for lorawan bridge function to used Device Id

### 1.17.8 (2025-09-20)
* (BenAhrdt) normalize [] () & {} into _

### 1.17.7 (2025-09-19)
* (BenAhrdt) Virtal Mode for Foreign climate entities available

### 1.17.6 (2025-09-19)
* (BenAhrdt) Check foreign state id in climate improved

### 1.17.5 (2025-09-19)
* (BenAhrdt) Improve quere for foreign states in discover foreign climate

### 1.17.4 (2025-09-19)
* (BenAhrdt) More debuglogging for Foreign Climate error

### 1.17.3 (2025-09-19)
* (BenAhrdt) Bugfix calling Foreign climate ids

### 1.17.2 (2025-09-19)
* (BenAhrdt) Bugfix nameing of foreign states

### 1.17.1 (2025-09-19)
* (BenAhrdt) Bugfix xs in jsonconfig

### 1.17.0 (2025-09-19)
* (BenAhrdt) Add Climate Entity configuration to foreign states

### 1.16.12 (2025-09-18)
* (BenAhrdt) delete devices in bridge (discover empty) after changing the device_identifier

### 1.16.11 (2025-09-18)
* (BenAhrdt) dont use bridge enum within namespace of adapter
* (BenAhrdt) Improve Namebuilding of foreign states to bridge

### 1.16.10 (2025-09-18)
* (BenAhrdt) bugfix change query of Bridgeurl to LoRaWAN url

### 1.16.9 (2025-09-18)
* (BenAhrdt) bring connectiontest to bridge config
* (BenAhrdt) Bugfixing deaktivate LNS connection search in case of empty url
* (BenAhrdt) Bugfixing defaultvalues for json states.

### 1.16.8 (2025-09-17)
* (BenAhrdt) Bring enum selection in config

### 1.16.7 (2025-09-17)
* (BenAhrdt) Bugfix deleting discovered devices
* (BenAhrdt) build in devug logging to find bug in devicename

### 1.16.6 (2025-09-17)
* (BenAhrdt) Change detection of new Discovery from LoRaWAN devices

### 1.16.5 (2025-09-17)
* (BenAhrdt) Bugfix in notifications to Bridge (new device dicovered) => namespace not set

### 1.16.4 (2025-09-17)
* (BenAhrdt) Bridge import foreign states till Adapter is running
* (BenAhrdt) Bridge delete foreign states till Adapter is running

### 1.16.3 (2025-09-16)
* (BenAhrdt) nameing of foreign Devices in Bridge

### 1.16.2 (2025-09-16)
* (BenAhrdt) bugfix namespace also by calling work from directoryhandler

### 1.16.1 (2025-09-16)
* (BenAhrdt) bugfix namespace also by notifications

### 1.16.0 (2025-09-16)
* (BenAhrdt) possibility to insert foreign states to bridge by using enum.functions.bridge

### 1.15.8 (2025-09-16)
* (BenAhrdt) remove await from some callings

### 1.15.7 (2025-09-15)
* (BenAhrdt) solve publishing intern

### 1.15.6 (2025-09-15)
* (BenAhrdt) improve handling of state device in case of subfolders

### 1.15.5 (2025-09-15)
* (BenAhrdt) Bugfix logging removed

### 1.15.4 (2025-09-15)
* (BenAhrdt) Bugfix send state topics retain
* (BenAhrdt) Bugfix with stateending

### 1.15.3 (2025-09-15)
* (BenAhrdt) dont translate the selected state in bridge config

### 1.15.2 (2025-09-15)
* (BenAhrdt) change wording of notifications
* (BenAhrdt) import diagnostic and config fpr entity_type
* (BenAhrdt) change extSernsorTemperature in ExtSernsorTemperature

### 1.15.1 (2025-09-14)
* (BenAhrdt) Send Trigger retain = false

### 1.15.0 (2025-09-14)
* (BenAhrdt) Bring notification for Bridge in Admin
* (BenAhrdt) Notify different trigger to Bridge

### 1.14.9 (2025-09-13)
* (BenAhrdt) notifi new device discovered till Adapter running

### 1.14.8 (2025-09-13)
* (BenAhrdt) Add general, offline and online Notifications to the discovered devices
* (BenAhrdt) Add general Notifications to device called namespace of the Adapter

### 1.14.7 (2025-09-12)
* (BenAhrdt) Add Folders for Target Temperature in Heating Events
* (BenAhrdt) correct unit handling & Max valueCount in Tab

### 1.14.6 (2025-09-12)
* (BenAhrdt) more logging in debug mode

### 1.14.5 (2025-09-12)
* (BenAhrdt) Safe last 10 publish and subscribed values

### 1.14.4 (2025-09-11)
* (BenAhrdt) Return the virtual mode

### 1.14.3 (2025-09-11)
* (BenAhrdt) Change Nameing of Virtual ID for virtual_mode

### 1.14.2 (2025-09-11)
* (BenAhrdt) Bugfix Climate current_temperature topic

### 1.14.1 (2025-09-11)
* (BenAhrdt) Bugfix unique_id of climate entities

### 1.14.0 (2025-09-11)
* (BenAhrdt) normalize topics (without space, dot ....)
* (BenAhrdt) change topics into set and state topic

### 1.13.14 (2025-09-10)
* (BenAhrdt) Add assign more device_class and state_class in case of unit

### 1.13.13 (2025-09-09)
* (BenAhrdt) Bugfix unit of measurement

### 1.13.12 (2025-09-09)
* (BenAhrdt) Improve Statehandling and improve Key Length-handling

### 1.13.11 (2025-09-09)
* (BenAhrdt) Bugfix selction of States and state_class

### 1.13.10 (2025-09-09)
* (BenAhrdt) Change Timeformat in Info states and improov logging in case of Statechange
* (BenAhrdt) Add possibility to activate / deactivate cron for cyclic discovery

### 1.13.9 (2025-09-07)
* (BenAhrdt) Add time to State Information and improov translations.

### 1.13.8 (2025-09-07)
* (BenAhrdt) Add Tabfunctionality to Adapter (info to some states)

### 1.13.7 (2025-09-07)
* (BenAhrdt) More Informations in Tab
* (BenAhrdt) Additionals States for published ids & subscribed topics

### 1.13.6 (2025-09-06)
* (BenAhrdt) Bugfix handling in fillDownlink

### 1.13.5 (2025-09-06)
* (BenAhrdt) Show discovery topic(s) & messag(es) ind array
* (BenAhrdt) Add Tab to see Discovered, Published and Subscribed Ids.
* (BenAhrdt) Add Posibility to discover climate Entity
* (BenAhrdt) Retaining Discovery

### 1.13.4 (2025-09-04)
* (BenAhrdt) Bugfixing crc in Vicki Profile => ChildLock

### 1.13.3 (2025-09-04)
* (BenAhrdt) Add images to the new States

### 1.13.2 (2025-09-04)
* (BenAhrdt) Dont check connection to Bridge if not selected
* (BenAhrdt) Add the State discovered Ids

### 1.13.1 (2025-09-04)
* (BenAhrdt) More Debuglogging
* (BenAhrdt) General Nameing in the functions
* (BenAhrdt) Performance update fpr rediscover on cron.

### 1.13.0 (2025-09-03)
* (BenAhrdt) Build fist Version of own Bridge MQTT Client

### 1.12.1 (2025-09-01)
* (BenAhrdt) remove Bug with folder / state handling

### 1.12.0 (2025-09-01)
* (BenAhrdt) Custom Table for Config HA Bridge

### 1.11.10 (2025-08-31)
* (BenAhrdt) insert logging to object change

### 1.11.9 (2025-08-31)
* (BenAhrdt) build Custom Config for HA Bridge

### 1.11.8 (2025-08-30)
* (BenAhrdt) log adapterObjects at start

### 1.11.7 (2025-08-30)
* (BenAhrdt) more improov logging in case of deviceinformation at startup (debug)

### 1.11.6 (2025-08-30)
* (BenAhrdt) improov logging in case of deviceinformation at startup (debug)

### 1.11.5 (2025-08-29)
* (BenAhrdt) update Assignhandler
* (BenAhrdt) update Core dependencies

### 1.11.4 (2025-08-23)
* (BenAhrdt) set Custom Send payload to upper case

### 1.11.3 (2025-08-17)
* (BenAhrdt) replace german specific chars like ä => ae

### 1.11.2 (2025-08-17)
* (BenAhrdt) swap hidden logic

### 1.11.1 (2025-08-17)
* (BenAhrdt) add more hidden attributes to HA Bridge

### 1.11.0 (2025-08-17)
* (BenAhrdt) change dependencies
* (BenAhrdt) Add LoRaWAN 2 Home Assistant Bridge

### 1.10.22 (2025-07-27)
* (BenAhrdt) config notification and / or logging in case of connection state to LNS

### 1.10.21 (2025-07-27)
* (BenAhrdt) add extSersorTemperature unit "°C"

### 1.10.20 (2025-07-23)
* (BenAhrdt) backflip handling limits

### 1.10.19 (2025-07-23)
* (BenAhrdt) improove handling of limits for downlinks

### 1.10.18 (2025-07-23)
* (BenAhrdt) add role to valve openess in vicki

### 1.10.17 (2025-06-16)
* (BenAhrdt) bugfix profile for dnt-lw-etrv

### 1.10.16 (2025-06-16)
* (BenAhrdt) add profile for dnt-lw-etrv

### 1.10.15 (2025-06-16)
* (BenAhrdt) add some roles and Units

### 1.10.14 (2025-06-10)
* (BenAhrdt) bugfix jsonconfig schema
* (BenAhrdt) add some roles for uplink states

### 1.10.13 (2025-06-01)
* (BenAhrdt) update dependencie for mqtt in 5.13.0

### 1.10.12 (2025-05-30)
* (BenAhrdt) update Testing to 24.x

### 1.10.11 (2025-05-25)
* (BenAhrdt) Round to convert only integers to HEX
* (BenAhrdt) add roles for uplinks from dnt-lw-etrv

### 1.10.10 (2025-05-18)
* (BenAhrdt) update assignhandler

### 1.10.9 (2025-05-17)
* (BenAhrdt) correct lower case for targetTemperatureFloat
* (BenAhrdt) remove role switch in case of send with uplink and collect

### 1.10.8 (2025-05-17)
* (BenAhrdt) add some states for Mode

### 1.10.7 (2025-05-17)
* (BenAhrdt) add some roles

### 1.10.6 (2025-05-16)
* (BenAhrdt) change State Opened to role sensor.window for zigbee / matter stndard

### 1.10.5 (2025-05-15)
* (BenAhrdt) add role for Low Battery
* (BenAhrdt) add role value.battery to state BatteryPercent

### 1.10.4 (2025-05-15)
* (BenAhrdt) set new roles and bugfix role in downlink.control at startup

### 1.10.3 (2025-05-07)
* (BenAhrdt) set logging for custom send from warning to debug

### 1.10.2 (2025-05-04)
* (BenAhrdt) update dependencie to node >= 20
* (BenAhrdt) improove timestamp in deviceInformation, if its not present in message (eg. manualy send via TTN)

### 1.10.1 (2025-04-17)
* (BenAhrdt) Improove Custom Send

### 1.10.0 (2025-04-17)
* (BenAhrdt) Add CustomSend to Control folder
* (BenAhrdt) update Profile for 16ASPM

### 1.9.0 (2025-04-15)
* (BenAhrdt) Change default fpr push and replace

### 1.8.2 (2025-04-15)
* (BenAhrdt) Defaultvalues for push und replace (TTN)

### 1.8.1 (2025-04-06)
* (BenAhrdt) chaned format time in device info

### 1.8.0 (2025-04-06)
* (BenAhrdt) update dependencies and time / timestamp in deviceinfos

### 1.7.1 (2025-04-06)
* (BenAhrdt) change timewriting in deviceinfos at chirpstack

### 1.7.0 (2025-02-18)
* (BenAhrdt) add Volt to assignhandler with unit "V"
* (BenAhrdt) update dependency for admin and js-controller
* (BenAhrdt) update release script dependecie to 3.8

### 1.6.6 (2025-01-27)
* (BenAhrdt) start with known profiles

### 1.6.5 (2025-01-26)
* (BenAhrdt) export and import downlinkconmfigs with filemanager

### 1.6.4 (2025-01-21)
* (BenAhrdt) Set decoded Structure in deviceInfos (with Merge)

### 1.6.3 (2025-01-20)
* (BenAhrdt) Names of states changed (Downlink Raw)
* (BenAhrdt) Change setObjectNotExistsAsync to extendObjectAsync for Raw Data

### 1.6.2 (2025-01-15)
* (BenAhrdt) Bugfix creation of deviceinfo

### 1.6.1 (2025-01-10)
* (BenAhrdt) correction of role for state ExtenalTemperatur

### 1.6.0 (2024-12-05)
* (BenAhrdt) update eslint

### 1.5.7 (2024-11-26)
* (BenAhrdt) change header responsive

### 1.5.6 (2024-11-26)
* (BenAhrdt) add folder "uplink.remaining.version_ids" to writecommands

### 1.5.5 (2024-11-23)
* (BenAhrdt) add CRC-8

### 1.5.4 (2024-11-15)
* (BenAhrdt) add roles and fix responsive issues

### 1.5.3 (2024-10-30)
* (BenAhrdt) add roles

### 1.5.2 (2024-10-28)
* (BenAhrdt) add new standard types / add new Roles / update core to 3.2.2

### 1.5.1 (2024-10-17)
* (BenAhrdt) remove some wrong loggings

### 1.5.0 (2024-10-17)
* (BenAhrdt) add some notifications for devices back online

### 1.4.2 (2024-09-27)
* (BenAhrdt) add informations about delete an custom entry in config

### 1.4.1 (2024-09-25)
* (BenAhrdt) remove timestamp from role date (ttn timestamp im µs)

### 1.4.0 (2024-08-30)
* (BenAhrdt) function to assign properties

### 1.3.1 (2024-07-30)
* (BenAhrdt) implements example image

### 1.3.0 (2024-07-29)
* (BenAhrdt) Add "Custom"-Configuration

### 1.2.3 (2024-06-26)
* (BenAhrdt) Bugfix offlinenotification (calculation of diffenerce)

### 1.2.2 (2024-06-25)
* (BenAhrdt) Bugfix inf generate Deviceinfo at startup for chirpstack

### 1.2.1 (2024-06-24)
* (BenAhrdt) improof building of offlinenotification >= 25 hours

### 1.2.0 (2024-05-28)
* (BenAhrdt) change deviceInformations (keep old values in structure)

### 1.1.1 (2024-05-15)
* (BenAhrdt) mqtt dependencies updated for better keepalive

### 1.1.0 (2024-05-12)
* (BenAhrdt) implement keepalive in config

### 1.0.9 (2024-05-11)
* (BenAhrdt) remove debug warn logging

### 1.0.8 (2024-05-11)
* (BenAhrdt) set keepalive value to 0 => deactivate automatic reconnection

### 1.0.7 (2024-05-10)
* (BenAhrdt) setObjectAsynch bug after offline solved

### 1.0.6 (2024-05-10)
* (BenAhrdt) icons changed
* (BenAhrdt) device offline notofication placed in messagehandler.js

### 1.0.5 (2024-05-10)
* (BenAhrdt) device offline location changed

### 1.0.4 (2024-05-10)
* (BenAhrdt) changed icon and offline time

### 1.0.3 (2024-05-10)
* (BenAhrdt) notifications for connection and disconnection LNS added
* (BenAhrdt) notifiction for device offline added

### 1.0.2 (2024-03-27)
* (BenAhrdt) change some comments and logging

### 1.0.1 (2024-03-25)
* (BenAhrdt) support 2's complement

### 1.0.0 (2024-03-21)
* (BenAhrdt) implement wifi icons

### 0.6.6 (2024-03-11)
* (BenAhrdt) update Vicki device-config

### 0.6.5 (2024-03-08)
* (BenAhrdt) setObject changed into setObjectAsync

### 0.6.4 (2024-03-07)
* (BenAhrdt) Change writing of deviceinformations at Ttn

### 0.6.3 (2024-03-05)
* (BenAhrdt) def of deviceinformations changed

### 0.6.2 (2024-03-05)
* (BenAhrdt) seperate dp for deviceinformations

### 0.6.1 (2024-03-02)
* (BenAhrdt) better concept to write values and change setObjectNotExists to extendObject

### 0.6.0 (2024-03-02)
* (BenAhrdt) change concept of assigning roles, values and writecommands

### 0.5.5 (2024-03-01)
* (BenAhrdt) first step of handling with date

### 0.5.4 (2024-03-01)
* (BenAhrdt) implement ther approvedFolder conzept for writecommands from message

### 0.5.3 (2024-02-29)
* (BenAhrdt) change folder for writetriggers

### 0.5.2 (2024-02-29)
* (BenAhrdt) make writetrigger more flexible

### 0.5.1 (2024-02-29)
* (BenAhrdt) detecting of triggerwords changed

### 0.5.0 (2024-02-28)
* (BenAhrdt) trigger for devicetype implemented

### 0.4.1 (2024-02-26)
* (BenAhrdt) implement new deviceprofiles

### 0.4.0 (2024-02-26)
* (BenAhrdt) searchallgorythm improoved, defaultvalues changed, remove query for "all"

### 0.3.10 (2024-02-25)
* (BenAhrdt) change logging again if a device joined the network

### 0.3.9 (2024-02-25)
* (BenAhrdt) change logging if a device joined the network

### 0.3.8 (2024-02-23)
* (BenAhrdt) write def into state in case of type changes

### 0.3.7 (2024-02-22)
* (BenAhrdt) improove forbidden chars and implements join raw

### 0.3.6 (2024-02-21)
* (BenAhrdt) set attributs if undefined

### 0.3.5 (2024-02-21)
* (BenAhrdt) set tier to 2 and improove standard devices

### 0.3.4 (2024-02-20)
* (BenAhrdt) put some debug and silly logging to code

### 0.3.3 (2024-02-19)
* (BenAhrdt) set infos into native

### 0.3.2 (2024-02-16)
* (BenAhrdt) wording recieved => received in messageing

### 0.3.1 (2024-02-15)
* (BenAhrdt) rebuild with better messageing

### 0.3.0 (2024-02-15)
* (BenAhrdt) define user friendly Blockly Blocks with result

### 0.2.1 (2024-02-13)
* (BenAhrdt) check types of messaging values and implements more blockly blocks

### 0.2.0 (2024-02-12)
* (BenAhrdt) more functionality in messageing

### 0.1.13 (2024-02-12)
* (BenAhrdt) building of directory changed and message implemented

### 0.1.12 (2024-02-09)
* (BenAhrdt) default value crc config bug fixed

### 0.1.11 (2024-02-09)
* (BenAhrdt) min / max values for downlink-configs (number)

### 0.1.10 (2024-02-08)
* (BenAhrdt) default of crc changed

### 0.1.9 (2024-02-07)
* (BenAhrdt) crc calculation improoved

### 0.1.8 (2024-02-07)
* (BenAhrdt) implement crc calculation

### 0.1.7 (2024-02-06)
* (BenAhrdt) change filter on statechange

### 0.1.6 (2024-02-05)
* (BenAhrdt) implments byte swap

### 0.1.5 (2024-02-02)
* (BenAhrdt) remove units and insert roles

### 0.1.4 (2024-02-01)
* (BenAhrdt) change input of length and validate hex inputs

### 0.1.3 (2024-02-01)
* (BenAhrdt) change internal Base devices

### 0.1.2 (2024-01-31)
* (BenAhrdt) concept of config changed

### 0.1.1 (2024-01-30)
* (BenAhrdt) reduceing calling changeInfo > create expersettings to send downlinks with uplink

### 0.1.0 (2024-01-26)
* (BenAhrdt) removing downlink/configuration path and first tests of send downlink with uplink

### 0.0.18 (2024-01-25)
* (BenAhrdt) remove wrong warn logging

### 0.0.17 (2024-01-25)
* (BenAhrdt) changed Handling of standard configurations

### 0.0.16 (2024-01-22)
* (BenAhrdt) romeve reacheble object directory / improoved object === NULL

### 0.0.15 (2024-01-21)
* (BenAhrdt) bugfix chirpstack directory at downlink queued

### 0.0.14 (2024-01-21)
* (BenAhrdt) bugfix chirpstack directory

### 0.0.13 (2024-01-21)
* (BenAhrdt) change device id selecting in chirpstack out of directory (for downlink queued)

### 0.0.12 (2024-01-21)
* (BenAhrdt) change flow of downlink

### 0.0.11 (2024-01-20)
* (BenAhrdt) toSend und lastSend added to folders

### 0.0.10 (2024-01-19)
* (BenAhrdt) changes in length calculation

### 0.0.9 (2024-01-19)
* (BenAhrdt) first version for beta

### 0.0.8 (2024-01-18)
* (BenAhrdt) first implementation of chirpstack

### 0.0.7 (2024-01-17)
* (BenAhrdt) hex to Upper case, more units for decoded payload values

### 0.0.6 (2024-01-16)
* (BenAhrdt) insert whole translation for config and move some functions

### 0.0.5 (2024-01-15)
* (BenAhrdt) delete not configed states at startup

### 0.0.4 (2024-01-15)
* (BenAhrdt) implements buttons and standard downlink control ind json (push / replace)

### 0.0.3 (2024-01-14)
* (BenAhrdt) first config for downlinks inputed

### 0.0.2 (2024-01-12)
* (BenAhrdt) initial release

## License
MIT License

Copyright (c) 2025 BenAhrdt <bsahrdt@gmail.com>  
Copyright (c) 2025 Joerg Froehner <LoraWan@hafenmeister.com>

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

## DISCLAIMER
The rights of the trademarks and company names,
remain with their owners and have no relation to this adapter.
The fairuse policy must continue to be adhered to by the operator of the adapter.
If this repository is forked, it must be cited as the source.

LoRa® is a registered trademark or service
mark of Semtech Corporation or its affilantes.

LoRaWAN® is a licensed mark.