![Logo](admin/snmp.png)
# ioBroker.snmp

![Number of Installations](http://iobroker.live/badges/snmp-installed.svg)
![Number of Installations](http://iobroker.live/badges/snmp-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.snmp.svg)](https://www.npmjs.com/package/iobroker.snmp)

![Test and Release](https://github.com/iobroker-community-adapters/iobroker.snmp/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/snmp/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.snmp.svg)](https://www.npmjs.com/package/iobroker.snmp)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.**
For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Info
This adapter can be used to poll information from devices like printers, network devices, etc. using SNMP protocol.

## Changelog

<!--
## __WORK IN PROGRESS__
-->

### __WORK IN PROGRESS__
* (McM1957) Add support for using native datatypes for states (#143).
* (McM1957) Support has been added to store binary oid data as json (#188).
* (McM1957) Incorrect setting of write mode has been fixed (#191)
* (McM1957) Tables within german documentation have been fixed (#192).
* (McM1957) Naming an oid with the reserved name 'online' has been blocked (#203).
* (McM1957) Some changes related to code quality have been implemnted (#201, #190)

### 2.2.1 (2022-10-18)
* (McM1957) Fixed an error within io-package.json.
* (McM1957) Ukrainian translations have been added.

### 2.2.0 (2022-10-18)
* (McM1957) The compatibility flag is now deprecated and will be removed in future releases. Please adapt config if required.
* (McM1957) SNMP V3 support has been added (#71)
* (McM1957) Support for IPv6 has been added (#138)
* (McM1957) Code has been cleaned as suggested by eslint 
* (McM1957) Base modules have been upgraded to current versions
* (McM1957) Documentaion  has been updates (en, de, ru)

### 2.1.10 (2022-09-22)
* (McM1957) Validation of OID and device names has been enhanced, crash was reported by sentry (#169)

### 2.1.9 (2022-09-13)
* (McM1957) Support for (IPv4) domainnames has been readded (#165)
* (McM1957) Devices without any active oid do no longer cause an fatal error but only log a warning (#155)
* (McM1957) Timervalues are now validated more strictly (#156, #164)
* (McM1957) Some crashes reported by sentry have been fixed (#167)
* (McM1957) external packages have been updated by dependabot

### 2.1.8 (2022-09-08)
* (McM1957) HOTFIX: Parameter "community" has not been migrated when updating to version v2.x.x from previous releases. (#163)

### 2.1.7 (2022-08-27)
* (McM1957) Documentation within README.md has been updated (#133)

### 2.1.6 (2022-08-19)
* (McM1957) Some issues reported by sentry have been fixed (#151, #152)

### 2.1.5 (2022-08-11)
* (McM1957) The functionality of option "optional" has been restored. (#147)

### 2.1.4 (2022-08-08)
* (McM1957) HOTFIX - A system crash at SNMP v1 errors has been fixed (#145)

### 2.1.3 (2022-08-07)
* (McM1957) A new option to control the number of OIDs within a single request has been added to avoid TOOBIG errors (#72)

### 2.1.2 (2022-08-02)
* (McM1957) conversion of floatingpoint values has been corrected (#16)

### 2.1.1 (2022-08-01)
* (McM1957) some external packages have been updated

### 2.1.0 (2022-07-30)
* (McM1957) net-snmp has been upgraded to version 3.8.2
* (McM1957) Support for SNMP v2c has been added (#116)
* (McM1957) The quality marker of stateobjects will be used in case of error or timeout
* (McM1957) The OID marker 'Optional' has been implemented. This marker suppresses errors for OIDs which are not always available. (#116)
* (McM1957) Support for Counter64 OIDs has been added. (#57)
* (McM1957) The data returned by snmp communication  will be logged with more details now.
* (McM1957) Compact mode has been enabled. (#20)
* (McM1957) Known restriction: currently only SNMP V1 and SNMP V2c are supported.
* (McM1957) Known restriction: OID attribute writeable is not yet implemented.

### 2.0.1 (2022-07-22)
* (McM1957) Faulty handling of compatibility mode flag has been corrected (#135)
* (McM1957) Logging of errors for invalid OIDs corrected (#134)

### 2.0.0 (2022-07-21)
* IMPORTANT: This release will change the configuration structures!
  Please backup your configuration before starting the installation.
  The Installation will try to convert the old configuration - but it is not guaranteed to succeed in all cases. 
* (McM1957) Many parts of the code have been rewriten
* (McM1957) The adapter now uses the admin5 interface
* (McM1957) Timer values can now be set differently per device (#105)
* (McM1957) Changing the order of configuration entries does no longer destroy data (#15)
* (McM1957) Stateobjects for devices can now be named. The old behavior is available as an option.
* (McM1957) Known restriction: currently only SNMP V1 is supported.
* (McM1957) Known restriction: OID attributes optional and writeable are not yet implemented.

### 1.0.0 (2022-03-21)
* IMPORTANT: This release will change the object structures!
* (McM1957) latency for update of info.connection has been reduced 
* (McM1957) excessive error logging if target is unreachable hab been optimzed
* (McM1957) additional online object at ip base to indicate target is reachable has been added
* (McM1957) if OIDs specify different communities for one device a warning will be output
* (Apollon77) Sentry for crash reporting has been added

### 0.5.0
* (Marcolotti) Add documentation (de,en,ru)
* (Marcolotti) Add languages (de,en,ru)

### 0.0.3
* (Apollon77)  Fix Object Type

### 0.0.2
* (Bluefox)    Fixes

### 0.0.1
* (Bluefox)    refactoring
* (Marcolotti) initial release

## __Adapter-Configuration__
The adapter queries specified oids which are grouped within oid groups which in turn are assigned to devices. The configuration data is entered at several tabs:

### __TAB OID-Groups__
Here you specify all oids to be queried by the adapter, one oid per line.

| Parameter     | Type        | Description                       | Comment                             |
|---------------|-------------|-----------------------------------|-------------------------------------|
| active        | boolean     | if set to true, OID will be used  | can be used to disable a single OID |
| OID-Group     | text        | name of the OID group             | will used to assign group to device |
| OID-Name      | text        | name assigned to the OID          | will used to name datapoint         |
| OID           | text        | oid string (1.2.3.4.)             | oid string as specified by device vendor |
| writeable     | boolean     | should be set to true if OID is writeable | reserved for future use     |
| optional      | boolean     | should be set to true if OID is optional  | if set to true, no error will be raised if oid is unknown |

### __TAB Device__
Here you specify which devices should be queried.

| Parameter     | Type        | Description                       | Comment                             |
|---------------|-------------|-----------------------------------|-------------------------------------|
| active        | boolean     | if set to true, the device will be used  | can be used to disable a single device |
| Name          | text        | name of the device                | will be used to create name of data points |
| IP address    | text        | ip address (IPv4 or IPv6) with optional port number    | NOTE: currently only IPv4 is supported |
| OID-Group     | text        | OID group specified at tab IOD Groups | A OID group can be assigned to more than one device |                   |
| SNMP-Version  | select      | SNMP version to use               | NOTE: SNMPv3 is not yet supported   |
| Community (v1, v2c) or Auth-ID (v3) | text | community for SNMP v1 or V2c, authorization group for SNMP v3 | NOTE: SNMPv3 is not yet supported |
| timeout (sec) | number      | processing timeout in seconds     |                                     |
| retry (sec)   | number      | retry intervall in seconds        |                                     |
| polling (sec) | number      | poll intervall in seconds         |                                     |


### __TAB Authorization__
This tab contains SNMP V3 authorization information. Please note that SNMP V3 is not yet implemented.

| Parameter     | Type        | Description                       | Comment                             |
|---------------|-------------|-----------------------------------|-------------------------------------|


### __TAB Options__
Here you specify some general options

| Parameter     | Type        | Description                       | Comment                             |
|---------------|-------------|-----------------------------------|-------------------------------------|
| Packetsize    | integer     | maximum number of OIDs sent within a single request | reduce this value in case of TOOBIG errors |
| Compatibility mode | boolean | if this option is activated, datapoint names are based on ip address | NOTE: outdated - do not use any longer. This flag will not work with IPv6 addresses. Might be removed in future releases. |



## __License__
The MIT License (MIT)

Copyright (c) 2017-2022 Marcolotti <info@ct-j.de>, McM1957 <mcm57@gmx.at>, ioBroker Community Developers 

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
