---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.bydhvs.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.bydhvs.svg
BADGE-Number of Installations: https://iobroker.live/badges/bydhvs-installed.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/bydhvs-stable.svg
BADGE-NPM: https://nodei.co/npm/iobroker.bydhvs.png?downloads=true
---
# Structure of BYD HVS Messages

## Captureing of messages
These messages and decrypted by capturing the communication between the software Be Connect and the hardware. The position and information of each information is interpreted by the community and may be incorrect. Please take only valid information from BYD or its sub-companies.


## Messages

After a TCP Connection is estalished the communication requires to send a command to receive data or execute a measurement. The project of smarthomeNG describe it as a similarity for ModBus that we read and write registers with the TCP connection.
https://github.com/lgb-this/plugins/blob/develop/byd_bat/user_doc.rst
All Messages have a Header in Byte 1 and 2.

### Message 0 - Initiate connection and Basic data
The send out message is ```010300000066c5e0```

| Byte | Type | Description |
|:-- |:--:|:--|
| 3 to 21 | string | This is the serialnumber. On the 2. character you can identify the hardwaretype (HVS, HVM, ...) |
| 27 + 28 | character | Version in format V(27).(28) for the first BMU |
| 29 + 30 | character | Version in format V(29).(30) for the 2nd BMU |
| 33 | integer | used tower BMU |
| 36 | 2 seperate byte integer | 1 byte - towers; 2 byte - modules (23 => 2 towers & 3 modules) |
| 38 | enum | 0: OffGrid; 1: OnGrid; 2: Backup |

### Message 1 - System diagnosis
The send out message is ```01030500001984cc```

| Byte | Type | Descriptio |
|:-- |:--:|:--|
| 3 | int16 signed | SOC of the whole system |
| 5 | int16 signed | System max volts |
| 7 | int16 signed | System min volts |
| 9 | int16 signed | System SOH |
| 11 | int16 signed | System amperes |
| 13 | int16 unsigned | Battery volts with SF 100  |
| 15 | int16 signed | max Temperature |
| 17 | int16 signed | min Temperature |
| 19 | int16 signed | Battery Temperature |
| 29 | int16 signed | Error Number |
| 31 + 32 | characters | Param T |
| 35 | int16 unsigned | Ouput voltage with SF 100 |
| 37 | int16 unsigned | Total charge of the system |
| 41 | int16 unsinged | Total discharge of the system |

### Message 2 - System diagnosis
the send command is ```010300100003040e```

| Byte | Type | Descriptio |
|:-- |:--:|:--|
| 3 | enum | inverter type |
| 5 | enum | Battery type: 0: HVL; 1: HVM; 2: HVS |

### Message 5 - Tower basic information

| Byte | Type | Descriptio |
|:-- |:--:|:--|
| 5 | int16 signed | Tower max Volt |
| 7 | int16 singed | Tower min Volt |
| 9 | int | max volt cell number |
| 10 | int | min volt cell number |
| 11 | int16 signed | max temperature |
| 13 | int 16 signed | min temperature |
| 15 | int | max temperature cell |
| 16 | int | min temperature cell number |
| 17 - 32 | MSB, LSB | Balancing Flags |
| 33 | int32 Unsigned | tower charge total with SF 1000 |
| 37 | int32 Unsigned | tower discharge total with SF 1000 |
| 45 | int16 signed | tower battery voltage SF 10 |
| 51 | int16 singed | tower volt out |
| 53 | int16 signed | SOC Percentage |
| 55 | int16 signed | SOH percentage |
| 57 | int16 signed | Currentamperes |
| 59 + 60 | hex | state |

## Glossary
| Short | Description |
|:--:|:-- |
| SF | Scale Factor (Value 1234 & SF 100 => Real Value: 12.34) |

## Changelog
### 1.5.11 (2026-04-26)
* (arteck) del deprectated setStateAsync

### 1.5.10 (2026-04-26)
* (arteck) fix Modbus Exception – fc=0x3 exCode=0x4 in State 7
* (arteck) add Max retry attempts after error into settings

### 1.5.9 (2026-04-25)
* (arteck) fix wrong package
* (arteck) fix Modbus-RTU

### 1.5.8 (2026-04-23)
* (arteck) typo

### 1.5.7 (2026-04-23)
* (arteck) fix tower count > 1

###

## License
MIT License

Copyright (c) 2026 Christian <github@familie-herrmann.de>

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