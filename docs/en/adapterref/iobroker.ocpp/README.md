![Logo](admin/ocpp.png)
# ioBroker.ocpp

[![NPM version](https://img.shields.io/npm/v/iobroker.ocpp.svg)](https://www.npmjs.com/package/iobroker.ocpp)
[![Downloads](https://img.shields.io/npm/dm/iobroker.ocpp.svg)](https://www.npmjs.com/package/iobroker.ocpp)
![Number of Installations](https://iobroker.live/badges/ocpp-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/ocpp-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.ocpp.png?downloads=true)](https://nodei.co/npm/iobroker.ocpp/)

**Tests:** ![Test and Release](https://github.com/foxriver76/ioBroker.ocpp/workflows/Test%20and%20Release/badge.svg)


## Disclaimer
The developers of this module are in no way endorsed by or affiliated with Open Charge Alliance,
or any associated subsidiaries, logos or trademarks.

## OCPP adapter for ioBroker
Adapter to connect an OCPP 1.6 supported wallbox

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.12.5 (2023-02-09)
* (foxriver76) revert changes of 0.12.4

### 0.12.3 (2023-02-07)
* (foxriver76) allow deactivating `numberPhases` by setting `null

### 0.12.2 (2023-01-19)
* (foxriver76) ensure main connector is always created even if no status received there

### 0.12.1 (2023-01-19)
* (foxriver76) we now also detect feature profiles if clients add unallowed whitespaces

### 0.12.0 (2023-01-18)
* (foxriver76) the `idTag` for remote transactions is now `ioBroker` persistent over all transactions
* (foxriver76) implemented the management of authentication list
* (foxriver76) only create states if supported by profile (closes #22)
* (foxriver76) increased stability on first connection

### 0.11.1 (2023-01-17)
* (foxriver76) we now correctly detect data type and role of configuration attributes

### 0.11.0 (2023-01-17)
* (foxriver76) `idTag` is now read correctly from `startTransaction` message (closes #21)
* (foxriver76) implemented possibility to trigger `hard` and `soft` reset

### 0.10.0 (2023-01-16)
* (foxriver76) implemented state to control number of phases used for charging

### 0.9.1 (2023-01-13)
* (foxriver76) we now avoid not implemented logging if `chargeLimit` is set to null (deactivated)

### 0.9.0 (2023-01-13)
* (foxriver76) we removed states from main connector which are not allowed there
* (foxriver76) we now synchronize configuration into adapter
* (foxriver76) we added ack flag to `availability` state
* (foxriver76) we added ack flag for `charge limit` states
* (foxriver76) we optimized error logging
* (foxriver76) we now allow changing charger configuration via adapter
* (foxriver76) we improved reconnect handling

__Please delete all states of connector 0 once__

### 0.8.2 (2022-12-13)
* (foxriver76) only log the `errorCode` if it is different from `NoError`

### 0.8.1 (2022-11-21)
* (foxriver76) make `transactionId` matching `connectorId` again

### 0.8.0 (2022-10-10)
* (foxriver76) we now support wallboxes with multiple connectors (closes #16)
* (foxriver76) we added a new state `lastTransactionConsumption`
* (foxriver76) implemented a `transactionId` handling
__The structure of the datapoints has changed to support wallboxes with multiple connectors. Please delete states once and adjust your scripts!__

### 0.7.0 (2022-09-21)
* (foxriver76) we have introduced a state to sepcify if chargeLimit is in watts or ampere

### 0.6.0 (2022-08-14)
* (foxriver76) we now handle `DataTransfer` messages

### 0.5.1 (2022-07-17)
* (foxriver76) we have optimized some log messages

### 0.5.0 (2022-07-17)
* (foxriver76) added possibility to define the `idTag` of the transaction (closes #13)

### 0.4.0 (2022-03-21)
* (foxriver76) implemented authentication

### 0.3.3 (2022-02-14)
* (foxriver76) fixed default value of `info.connection`

### 0.3.2 (2022-01-26)
* (foxriver76) set 'TxDefaultProfile' instead of 'TxProfile' if charging starts, else it may block overriding the limit during transaction

### 0.3.1 (2022-01-26)
* (foxriver76) set charging profiles on stack level 0, because some chargers do not support higher levels

### 0.3.0 (2022-01-18)
* (foxriver76) if wallbox offers multiple meter values they will now alle be represented
* (foxriver76) admin is no longer needed on the same host (multihost)

### 0.2.0 (2022-01-09)
* (foxriver76) close server on unload for compact mode
* (foxriver76) fixed the message type
* (foxriver76) limit state is now in Ampere and should work now

### 0.1.1 (2022-01-09)
* (foxriver76) we are requesting config of new clients too
* (foxriver76) we fixed a bug with limitState not respected on `startTransaction`
* (foxriver76) make sure we use no outdated connection

### 0.1.0 (2022-01-08)
* (foxriver76) small optimizations
* (foxriver76) updated dependencies

### 0.0.10 (2022-01-08)
* (foxriver76) fixed error on sending commands if device name containts dots
* (foxriver76) we also log repsonse errors from now on

### 0.0.9 (2022-01-08)
* (foxriver76) switch to updated OCPP fork
* (foxriver76) minor optimizations

### 0.0.8 (2021-11-15)
* (foxriver76) we now replace dots in device names by underscores

### 0.0.7 (2021-10-30)
* (foxriver76) added possibility to limit the charging process to given Wh if supported by ChargePoint

### 0.0.6 (2021-10-28)
* (foxriver76) we fixed name of availability state
* (foxriver76) we fixed unnecessary comma in `info.connection` state

### 0.0.5 (2021-10-28)
* (foxriver76) we added the meterValue state
* (foxriver76) we added state to control availability

### 0.0.4 (2021-10-27)
* (foxriver76) we can now enable/disable a charger

### 0.0.3 (2021-10-27)
* (foxriver76) initial release

## License
MIT License

Copyright (c) 2022 Moritz Heusinger <moritz.heusinger@gmail.com>

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
