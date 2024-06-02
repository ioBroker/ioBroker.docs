![Logo](admin/sonnen-charger.png)
# ioBroker.sonnen-charger

[![NPM version](https://img.shields.io/npm/v/iobroker.sonnen-charger.svg)](https://www.npmjs.com/package/iobroker.sonnen-charger)
[![Downloads](https://img.shields.io/npm/dm/iobroker.sonnen-charger.svg)](https://www.npmjs.com/package/iobroker.sonnen-charger)
![Number of Installations](https://iobroker.live/badges/sonnen-charger-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/sonnen-charger-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.sonnen-charger.png?downloads=true)](https://nodei.co/npm/iobroker.sonnen-charger/)

**Tests:** ![Test and Release](https://github.com/ChrisWbb/ioBroker.sonnen-charger/workflows/Test%20and%20Release/badge.svg)

## sonnen-charger adapter for ioBroker

This adpater integrates your sonnenCharger into ioBroker  
Additional information about sonnenCharger can be found on [vendors webpage](https://sonnen.de/ladestation-elektroauto/).


## Configuration

After you have created an instance of the apdater you have to configure several parameters:

|Parameter Name|Description|Default|                                                                       
|:---|:---|:---|
|IP-Address|IP-Address of the sonnenCharger|-|
|Port|Port of Modbus-Interface of the sonnenCharger|502|
|Request interval|Interval for fetching data in seconds (ValueRage 30 - 3600) |30|
|Allow write access to sonnenCharger|**EXPERIMENTAL** be carefull when writing data into sonnenCharger|false|


## Usage

### Channel: info

|Id|Description|Datatype|Unit|Read/Write|Addition Information|
|:---|:---|:---|:---|:---|:---|
|connection|Device or service connected|boolean|-|R|-|

### Channel: chargerSettings

|Id|Description|Datatype|Unit|Read/Write|Addition Information|
|:---|:---|:---|:---|:---|:---|
|serialNumber|Serial number|string||R||
|model|Model|string||R||
|hwVersion|Hardware version|string||R||
|swVersion|Software version|string||R||
|numberOfConnectors|Number of connectors|integer||R||

### Channel: chargerSettings.connector.\<number\>

|Id|Description|Datatype|Unit|Read/Write|Addition Information|
|:---|:---|:---|:---|:---|:---|
|connectorType|Connector type|string||R||
|numberOfPhases|Number phases|integer||R||
|l1ConnectedToPhase|L1 connected to phase|integer||R||
|l2ConnectedToPhase|L2 connected to phase|integer||R||
|l3ConnectedToPhase|L3 connected to phase|integer||R||
|customMaxCurrent|Custom max current|float|A|R||

### Channel: measurements.\<number\>

|Id|Description|Datatype|Unit|Read/Write|Addition Information|
|:---|:---|:---|:---|:---|:---|
|connectorStatus|Connnector status id|integer||R||
|connectorStatusLabel|Connnector status label|string||R|0 : Unknown<br> 1 : SocketAvailable<br> 2 : WaitingForVehicleToBeConnected<br> 3 : WaitingForVehicleToStart<br> 4 : Charging<br>  5 : ChargingPausedByEv<br> 6 : ChargingPausedByEvse<br> 7 : ChargingEnded<br>  8 : ChargingFault<br> 9 : UnpausingCharging<br>  10 : Unavailable|
|measuredVehicleNumberOfPhases|Measured vehicle number of phases id|integer||R||
|measuredVehicleNumberOfPhasesLabel|Measured vehicle number of phases label|string||R||
|evMaxPhaseCurrent|EV max phase current|float|A|R||
|targetCurrentFromPowerMgm|Target current from power mgm or modbus|float|A|R||
|frequency|Frequency|float|Hz|R||
|voltageL1|L-N voltage (L1)|float|V|R||
|voltageL2|L-N voltage (L2)|float|V|R||
|voltageL3|L-N voltage (L3)|float|V|R||
|currentL1|Curent (L1)|float|A|R||
|currentL2|Curent (L2)|float|A|R||
|currentL3|Curent (L3)|float|A|R||
|activePowerL1|Active power (L1)|float|kW|R||
|activePowerL2|Active power (L2)|float|kW|R||
|activePowerL3|Active power (L3)|float|kW|R||
|activePowerTotal|Active power (total)|float|kW|R||
|powerFactor|Power factor|float||R||
|totalImportedActiveEnergyInRunningSession|Total imported active energy in running session|float|kWh|R||
|runningSessionDuration|Running session duration|number|seconds|R||
|runningSessionDepartureTime|Running session departure time|number|seconds|R|Unix time (seconds since 1970-01-01 00:00:00 UTC)|
|runningSessionDepartureTimeISO|Running session departure time in ISO UTC format|string||R||
|runningSessionID|Running session ID|integer||R|In the case that charger is communicating with central system, this is a transactionId provided by central system over OCPP|
|evMaxPower|EV max power|float|kW|R|Max power detected in the currently running charging session|
|evPlannedEnergy|EV planned energy|float|kWh|R|Total amount of energy that is planned to be delivered for currently running charging session|

### Channel: commands

|Id|Description|Datatype|Unit|Read/Write|Addition Information|
|:---|:---|:---|:---|:---|:---|
|restart|Restart sonnen-charger|button||W||
|setTime|Set time UTC"|integer|seconds|W|Unix time (seconds since 1970-01-01 00:00:00 UTC)|

### Channel: commands.connectors\<number\>

|Id|Description|Datatype|Unit|Read/Write|Addition Information|
|:---|:---|:---|:---|:---|:---|
|stopCharging|Stop charging|button||W||
|pauseCharging|Pause charging|button||W||
|setDepartureTime|Set departure time|integer|seconds|W||
|setCurrentSetpoint|Set current setpoint|float|A|W||
|cancelCurrentSetpoint|Cancel current setpoint|button||W||
|setPowerSetpoint|Set power setpoint|float|kW|W||
|cancelPowerSetpoint|Cancel power setpoint|button||W||

## Changelog
### 1.2.1 (2024-05-30)
* (ChrisWbb) fix findings of adapter checker

### 1.2.0 (2024-05-30)
* (ChrisWbb) update dependancy versions
* (ChrisWbb) fix finding of adapter checker
* (ChrisWbb) adjust state roles
* (ChrisWbb) new version of @types/node
* (ChrisWbb) tests for node 20.x

### 1.1.1 (2023-03-30)
* (ChrisWbb) fixed release problem

### 1.1.0 (2023-03-30)
* (ChrisWbb) write access to holding register
* (ChrisWbb) refactoring async calls
* (ChrisWbb) smaller changes based on suggestions from review
* (ChrisWbb) update readme

### 1.0.2 (2023-02-18)
* (ChrisWbb) fix ESLint findings

### 1.0.1 (2023-02-18)
* (ChrisWbb) preparation for release
* (ChrisWbb) small fixes from adapter check

### 1.0.0 (2023-01-02)
* (ChrisWbb) initial version

## License
MIT License

Copyright (c) 2024 ChrisWbb <development@chrweber.de>

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
