![Logo](admin/controme.png)
# ioBroker.controme

[![NPM version](http://img.shields.io/npm/v/iobroker.controme.svg)](https://www.npmjs.com/package/iobroker.controme)
[![Downloads](https://img.shields.io/npm/dm/iobroker.controme.svg)](https://www.npmjs.com/package/iobroker.controme)
![Number of Installations (latest)](http://iobroker.live/badges/controme-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/controme-stable.svg)
[![Dependency Status](https://img.shields.io/david/MadErstam/iobroker.controme.svg)](https://david-dm.org/MadErstam/iobroker.controme)
[![Known Vulnerabilities](https://snyk.io/test/github/MadErstam/ioBroker.controme/badge.svg)](https://snyk.io/test/github/MadErstam/ioBroker.controme)

[![NPM](https://nodei.co/npm/iobroker.controme.png?downloads=true)](https://nodei.co/npm/iobroker.controme/)

**Tests:** ![Test and Release](https://github.com/MadErstam/ioBroker.controme/workflows/Test%20and%20Release/badge.svg)

## ioBroker adapter for Controme mini servier

Connect to local Controme mini server using the official API.

Controme is a heating control system with which you can control your floor heating, central heating system, radiators or other forms of climate control. At the core of a Controme Smart-Heat-System is the Controme mini server, a local Raspberry Pi based system. For more information on the Controme Smart-Heat-System, see the [Controme website](https://www.controme.com/).

The adapter periodically reads the room temperatures from the mini server as well as allows to set the setpoint temperatures on the server from ioBroker. To use this adapter, you need to have Controme activate the API. The adapter is not intended to replace the Controme UI, but shall over basic data and functionality to integrate Controme with other Smart Home devices and services.


The adapter provides the following data for each room defined in the Controme UI:
| Object | Type | Description | read/write |
| --- | --- | --- | --- |
| roomID | device | Each room is represented with its Controme room ID and the room name as device name. | |
| roomID.actualTemperature | state | The actual temperature of the room, with a role of level.temperature. This state is read-only. If no room temperature sensor for a particular room is defined, the actual temperature returned from the Controme mini server is null. | read |
| roomID.humidity | state | The humidity of the room, with a role of level.humidity. This state is read-only. If the sensor for the room does not detect humidity, this state is null. | read |
| roomID.setpointTemperature | state | The target / setpoint temperature of the room, with a role of value.temperature. | read/write | 
| roomID.setpointTemperaturePerm | state | The permanent target / setpoint temperature of the room, with a role of value.temperature. | read/write | 
| roomID.temperatureOffset | state | The offset temperature of the room, by which the sensor measurements are different from the actual temperature of the room. The temperature offset value can be set manually in the Controme UI, and in addition is calculated by various Controme modules. | read | 
| roomID.mode | state | Describes the operating mode of the room, e.g. "heating". | read | 
| roomID.is_temporary_mode | state | Indicates of temporary changes to the setPointTemperature are in effect. | read | 
| roomID.temporary_mode_end | state | When a temporary mode is active for the room, this state indicates when the temporary state ends. If no temporary state is active, this state is null. | read | 
| roomID.temporary_mode_remaining | state | When a temporary mode is active for the room, this state indicates the remaining seconds that the temporary state is active. If no temporary state is active, this state is null. Changes to this state will reflect back to Controme and will change the remaining time for the temporary mode with the setpoint temperature defined in state setpointTemperate. | read/write | 
| roomID.offsets | channel | Offsets are added or subtracted from the setpoint room temperature. This channel groups all offsets that belong to the respective room. | |
| roomID.offsets.[OFFSET-GROUP] | channel | Each offset source is repesented by a dedicated channel within the offsets channel of the room the offset belongs to. | |
| roomID.offsets.[OFFSET-GROUP].[OFFSET] | state | The individual offset state represent the different adjustments made by the Controme mini server. | read |
| roomID.offsets.api | channel | This offset group is special, since its states can be written to and can be used to manipulate the actual room offset. | |
| roomID.offsets.api.api | state | This offset state is created by default by the adapter. You can use it to manipulate the actual room offsets. The offset values are reset by the server each 10 minutes. | read/write |
| roomID.sensors | channel | Sensors provide the actual measurements associated with the room. This channel groups all sensors assigned to the respective room. | |
| roomID.sensors.[SENSOR-ID] | device | Each sensor is represented by a device within the sensors channel of the room it is assigned to. | |
| roomID.sensors.[SENSOR-ID].isRoomTemperatureSensor | state | This boolean state indicates if a sensor is used as room temperature sensor. For each room, only a single sensor can be used as room temperature sensor. | read |
| roomID.sensors.[SENSOR-ID].actualTemperature | state | This state represents the actual temperature measured by the sensor. The state is read/write, but only 1Wire sensors or virtual sensors will accept the provided values. In case you write a value to a real sensor, the value will be overwritten when the next reading is done. | read/write |
| roomID.outputs | channel | Outputs typically control valves that control the room's heating. This channel groups all outputs assigned to the respective room. | |
| roomID.outputs.[OUTPUT-ID] | state | Each output is represented by a state within the output channel of the room it belongs to. The output ID number represents the number of the output on the gateway. | read |
| gatewayMAC | device | Each gateway is represented with its MAC address and the gateway name as device name. | |
| gatewayMAC.gatewayType | state | The type of the gateway. Currently, there are four controme gateways: floor gateway smart, floor gateway pro, universal gateway mini, universal gateway pro. | read |
| gatewayMAC.isUniversal | state | Indicates if gateway is one of the universal gateways. Data from universal gateways need to be polled in a different way. |
| gatewayMAC.outputs | channel | Outputs typically control valves that control the room's heating for floor gateways or devices in the heating room (pumps, valves). This channel groups all outputs of the respective gateway. | read |
| gatewayMAC.outputs.[OUTPUT-ID] | state | Each output is represented by a state within the output channel of the gateway it is assigned to. The output ID number represents the number of the output on the gateway as setup in the configuration. | read |


The [API documentation](https://support.controme.com/api/) can be found on the Controme website.

To start the adapter, the following data need to be provided in the admin settings page for the adapter instance:
| Data field | Type | Description |
| --- | --- | --- |
| url | text | The URL of the Controme mini server. Can be either the IP address or the name. |
| house ID | number | The ID of the Controme installation. This should be either 1 or 2 according to the API documentation. |
| interval | number | The interval in seconds in which the data is polled from the server. This value should be between 15 seconds and 3600 seconds. Too low values do not make sense, since Controme updates the sensor values only every 3-5 minutes. | 
| forceReInit | checkbox | If this checkbox is set, Controme purges the object structure in the ioBroker database and reloads the rooms from the server. This setting is only required when the room structure on the Controme server changes. | 
| warnOnNull | checkbox | If this checkbox is set, the adapter writes log warnings when a sensor returns a NULL value. Returning NULL values is expected behaviour for window sensors, but would indicate a connection problem for temperature sensors. The API does not allow to discern between  | 
| username | text | The username with which to access the Controme API. This is usually the username of the main Controme user. |
| password | password | The password of the user with which to access the Controme API. This password is encrypted. |
| gateways | table | All gateways that the adapter shall poll the data for have to be configures with three values: |
| gateways.gatewayMAC | string | The MAC address of the individual gateway. |
| gateways.type | string | The type of the respective gateway. Can be either Floor Gateway Smart/Pro, Universal Gateway Mini or Universal Gateway Pro. |
| gateways.name | string | The name of the respective gateway. |
| gatewayOutputs | table | All outputs of all gateways that the adapter shall poll the data for have to be configures with three values: |
| gatewayOutputs.gatewayMAC | string | The MAC address of the individual gateway. This has to match one of the gatewayMAC values configured in the gateways table. Please note that currently, the adapter does not validate if the gateway MAC addresses match to those configured in the gateways table. So please pay attention that gateway MAC addresses match in both tables. |
| gatewayOutputs.outputID | number | The output ID of the respective gateway that shall be polled. For mini gateways, this number has to be 1 to 8, for other gateways is can be 1 to 15. |
| gatewayOutputs.outputName | string | The name of the respective output of the gateway. |


## To Dos

1. (in progress) Testing, testing, testing
2. Release adapter to stable after thorough testing

## Know Bugs

1. ...

## Changelog
<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 0.5.7 (2025-02-22)
* (MadErstam) Made adapter safe to handle different versions of API
* (MadErstam) Switched from got to axios for future compatibility

### 0.5.6 (2025-02-21)
* (MadErstam) Bugfixing regarding invalid API responses or invalid sensor values

### 0.5.5 (2025-02-20)
* (MadErstam) Bugfixing regarding async and promise

### 0.5.4 (2025-02-15)
* (MadErstam) Made sensor names safe
* (MadErstam) Bugfixing in getOutputs

### 0.5.3 (2024-11-27)
* (MadErstam) Various smaller bugfixes and improvements

### 0.5.2 (2024-11-25)
* (MadErstam) Make object IDs for offsets safe

### 0.5.1 (2024-11-06)
* (MadErstam) Minor bugfixing

### 0.5.0 (2024-11-05)
* (MadErstam) Added handling of temporary mode
* (MadErstam) Conducted code refactoring to improve readability and maintainability
* (MadErstam) Again moved admin translations to make it compatible with automatic translations

### 0.4.7 (2024-11-04)
* (MadErstam) Moved admin translations to separate files

### 0.4.6 (2024-11-04)
* (MadErstam) Added translations of admin form to Ukrainian

### 0.4.5 (2024-11-03)
* (MadErstam) Fixed remaining warnings of automated adapter checker

### 0.4.4 (2024-11-03)
* (MadErstam) Cleaned up warnings of automated adapter checker

### 0.4.3 (2024-11-03)
* (MadErstam) Cleaned up errors of automated adapter checker

### 0.4.2 (2024-11-02)
* (MadErstam) Preparations for adapter package release

### 0.4.1 (2024-11-02)
* (MadErstam) Preparations for adapter package release

### 0.4.0 (2024-10-31)
* (MadErstam) Extended api calls to include humidity and temporary mode states
* (MadErstam) Changed dependencies

### 0.3.4-alpha.2 (2022-06-01)
* (MadErstam) Added validation of setTargetTemp, setSetpointTemp, setActualTemp, setOffsetTemp values
* (MadErstam) Changed dependencies
* (MadErstam) Cleaning up

### 0.3.4-alpha.1 (2022-04-25)
* (MadErstam) Prepare for release

### 0.3.4-alpha.0 (2022-04-25)
* (MadErstam) Prepare for release

### 0.3.3 (2022-04-25)
* (MadErstam) Updated dependencies

### 0.3.2 (2022-04-25)
* (MadErstam) Prepare for release

### 0.3.1 (2022-04-25)
* (MadErstam) Cleaning up adapter, bugfixing, extended readme

### 0.3.0
* (MadErstam) Extended API polling (outputs, gateways)

### 0.2.4
* (MadErstam) Bugfixing

### 0.2.3
* (MadErstam) Bugfixing

### 0.2.2
* (MadErstam) Bugfixing in offset handling

### 0.2.1
* (MadErstam) Improved offset handling

### 0.2.0
* (MadErstam) Added sensors and offsets

### 0.1.2
* (MadErstam) Preparations for adapter package release

### 0.1.1
* (MadErstam) Minor bug fixes

### 0.1.0
* (MadErstam) initial release

## License
Copyright (c) 2025 MadErstam <erstam@gmx.de>

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
