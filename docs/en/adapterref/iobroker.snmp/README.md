![Logo](admin/snmp.png)
# ioBroker.snmp

[![GitHub license](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.snmp)](https://github.com/iobroker-community-adapters/ioBroker.snmp/blob/main/LICENSE)
[![Downloads](https://img.shields.io/npm/dm/iobroker.snmp.svg)](https://www.npmjs.com/package/iobroker.snmp)
![GitHub repo size](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.snmp)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/snmp/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)</br>
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.snmp)
![GitHub commits since latest release (by date)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.snmp/latest)
![GitHub last commit](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.snmp)
![GitHub issues](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.snmp)
</br>
**Version:** </br>
[![NPM version](http://img.shields.io/npm/v/iobroker.snmp.svg)](https://www.npmjs.com/package/iobroker.snmp)
![Current version in stable repository](https://iobroker.live/badges/snmp-stable.svg)
![Number of Installations](https://iobroker.live/badges/snmp-installed.svg)
</br>
**Tests:** </br>
[![Test and Release](https://github.com/iobroker-community-adapters/ioBroker.snmp/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.snmp/actions/workflows/test-and-release.yml)
[![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.snmp/actions/workflows/codeql.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.snmp/actions/workflows/codeql.yml)

## Sentry
**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.**
For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Info
This adapter can be used to poll information from devices like printers, network devices, etc. using SNMP protocol.

## Adapter-Configuration
The adapter queries specified OIDs which are grouped within oid groups which in turn are assigned to devices.
The configuration data is entered at several tabs. The adapter supports IPv4 adn IPv6 connections.

For details see documentation referenced below.

## Documentation

[english documentation](docs/en/snmp.md)<br>
[deutsche Dokumentation](docs/de/snmp.md)<br>
[russian documentation](docs/ru/snmp.md)

## Changelog

<!--
   ### **WORK IN PROGRESS**
-->
### 3.2.0 (2024-03-29)
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 3.1.0 (2023-10-13)
* (mcm1957) Requirements have been updated. Adapter requires node.js 18 or newer now
* (mcm1957) Packages have been update to cleanup open dependabot PRs

### 3.0.0 (2023-10-12)
* (bluefox) updated packages. Minimal node.js version is 16

### 2.4.11 (2023-07-13)
* (McM1957) Node-net-snmp has been updated to improve uint32 handling (#282)
* (McM1957) Several other dependencies have been updated

### 2.4.10 (2023-07-08)
* (McM1957) Another typo at error output has been fixed

### 2.4.9 (2023-07-05)
* (McM1957) An option to disable closing of reader session in case of an error has been added.
* (McM1957) Logging in case of errors hase been enhanced when debug log enabled.

### 2.4.8 (2023-07-04)
* (McM1957) fixed: UDP ports got lost during error handling (#282)
* (McM1957) fixed: Incorrect toString() syntax caused several issues, i.e. missing error output (#283)
* (McM1957) Dependencies have been updated

### 2.4.7 (2023-04-12)
* (McM1957) changed: several externalmodules including net-snmp have been updated

### 2.4.6 (2023-03-26)
* (McM1957) Fixed: SNMP set did not work for numeric value 0 (#240)

### 2.4.5 (2023-03-20)
* (McM1957) Fixed: SNMPv3 crash when using SHA authentication (#236)

### 2.4.4 (2023-03-03)
* (McM1957) Fixed: crash reported by sentry (#235)

### 2.4.3 (2023-03-01)
* (McM1957) Translations and dependencies have been updated.

### 2.4.2 (2023-02-25)
* (McM1957) A problem reported by sentry has been fixed. (#230)

### 2.4.1 (2023-02-22)
* (McM1957) An error at configuration pages has been corrected. (#228)

### 2.4.0 (2023-02-21)
* (McM1957) Support to write data to oids has been implemented. (#150)
* (McM1957) Major parts of code have been rewritten so support oid writing.
* (McM1957) States containing type information can be disabled now. (#218)
* (McM1957) States indicating online and error status of devices have been added. State 'online' has been moved to folder info.
* (McM1957) Devicestatus is now displayed at object view using colour and icons.
* (McM1957) Data type 'automatic' has been added to oid states datatype selector.
* (McM1957) A problem reported by sentry has been fixed. (#224)
* (McM1957) An incorrect setting of ack flags has been corrected. (#225)
* (McM1957) Support for sha224, sha256, sha384 and sha512 message authentication has been added (#210)

### 2.3.0 (2022-12-13)
* (McM1957) Add support for using native datatypes for states. (#143)
* (McM1957) Support has been added to store binary oid data as json. (#188)
* (McM1957) Incorrect setting of write mode has been fixed. (#191)
* (McM1957) Tables within german documentation have been fixed. (#192)
* (McM1957) Naming an oid with the reserved name 'online' has been blocked. (#203)
* (McM1957) Some changes related to code quality have been implemented. (#201, #190)

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

## License
The MIT License (MIT)

Copyright (c) 2024-2025 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2017-2023 Marcolotti <info@ct-j.de>, McM1957 <mcm57@gmx.at>, ioBroker Community Developers 

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
