---
BADGE-GitHub: https://img.shields.io/github/license/dkleber89/ioBroker.beckhoff
BADGE-npm: https://img.shields.io/npm/v/iobroker.beckhoff.svg
BADGE-Number of Installations: http://iobroker.live/badges/beckhoff-installed.svg
---
[![Build Status](https://travis-ci.org/dkleber89/ioBroker.beckhoff.svg?branch=master)](https://travis-ci.org/dkleber89/ioBroker.beckhoff) [![Build status](https://ci.appveyor.com/api/projects/status/tpqe657lqrir3kew/branch/master?svg=true)](https://ci.appveyor.com/project/dkleber89/iobroker-beckhoff/branch/master) ![npm](https://img.shields.io/npm/dm/iobroker.beckhoff)
[![npm](https://img.shields.io/npm/v/iobroker.beckhoff.svg)](https://www.npmjs.com/package/iobroker.beckhoff) ![Number of Installations](http://iobroker.live/badges/beckhoff-stable.svg)  ![Number of Installations](http://iobroker.live/badges/beckhoff-installed.svg)

![Logo](img/beckhoff.png)

# ioBroker.beckhoff
This adapter for ioBroker can Communicate with a Beckhoff Automation System (Twincat 2 or 3) over the ADS Protocol.
The ADS Protocol is implemented in every System of Beckhoff and can be used without any License on ioBroker or Automation System.

This Project is not affilate to Beckhoff in any way

## Description
### Requirements
-   Beckhoff PLC that has an ethernet connection and is connected to your LAN
    -   Make your you give the PLC a fixed IP address
    -   Make sure you can ping the PLC from ioBroker
    -   TwinCat 2 **excluding BC Runtimes** or TwinCat 3

### PLC Configuration
1. Enable ADS on your PLC project. To do this click on your task and then enable the checkbox before `Create symbols`. Download the new configuration and make sure you reboot your PLC. The reboot is only needed when you are using TwinCat 2.

    ![createSymbols](img/createSymbols.png)

2. Now add a static route to our Beckhoff PLC. The route should point to your server that will run the proxy application.

    Here an example to add a Static Route directly on PLC u can add this Route also from your EngineeringPC to the PLC.

    ![createSymbols](img/addRoute.png)

    Important is that the AmsNetId and the AdressInfo (IP-Adress) matches with the Adapter Settings. For further Information about TwinCat Router and Security read Documentation on Synchronisierung [Beckhoff Information System](https://infosys.beckhoff.com/ 'Beckhoff Information System')

3. On TwinCat 2 Create a Struct and fill in your needed Symbols. Then add this Struct to a GlobalVariableTable.

    ##### Currently Supported Types: BOOL, BYTE, WORD, DWORD, SINT, USINT, INT, UINT, DINT, UDINT, REAL, LREAL, STRING(80)

    OPTIONAL: You can create a Variable in root of Struct with the exact name -> ioBrokerResync (Not Casesensitiv and not matter which Type) -> Every time this Variable changes his value the Table get resynced in ioBroker.

4. On TwinCat 3 Create a GlobalVariableTable and fill in your needed Symbols.

    ##### Currently Supported Types: BOOL, BYTE, WORD, DWORD, SINT, USINT, INT, UINT, DINT, UDINT, REAL, LREAL, STRING(80)

    OPTIONAL: You can create a Variable in root of Variable Table with the exact name -> ioBrokerResync (Not Casesensitiv and not matter which Type) -> Every time this Variable changes his value the Table get resynced in ioBroker.

### Adapter Configuration
#### Twincat 3 and Twincat 2
1. Choose your Runtime Version
2. Fill in Target IP-Adress and AMS-Net-ID.
3. On TwinCat 2 fill in the Instance Name of Struct.
4. On TwinCat 3 fill in the correct Tablename of the before created GlobalVariableTable.
5. All other Points u mostly not need to Change.

#### Twincat 2 <= v2.11.2240
Upload your *.tpy File from your PLC Project -> Every Time you change something on the Struct u communicate with the ioBroker, you need to Upload it again.

### Dataexchange
-   When some Value is changed in PLC then it will be automatic transferred to ioBroker
-   When a Value is changed in ioBroker (Important: ACK need to be FALSE!!) then the Value will be automatic transferred to PLC. After that the Adapter set ACK to TRUE.

### Attention
1. TwinCAT AMS Router doesn't allow multiple TCP connections from the same host. So when you use two instances on the same host to connect to the same TwinCAT router, you will see that TwinCAT will close the first TCP connection and only respond to the newest.
2. The Adapter Sync the complete GlobalVariableTable. U have different options to trigger a resync:
    - Create a resync Variable in PLC (See [here](#PLC-Configuration))
    - When the PLC are not in Run longer your Resync Intervall -> Then the Sync will triggered after the start of PLC.
    - Every Time you Download the Project to your PLC except "OnlineChange"
    - Restart the Adapter
3. Sync never meant the Dataexchange of the Symbols. Sync is the create or delete the States in ioBroker dependent on the GlobalVariableTable in the PLC.

## Changelog
### 1.4.1 (2021-06-13)

-   (dkleber89) Some little Adapter maintenance

### 1.4.0 (2021-01-25)

-   (dkleber89) Add LREAL Support

### 1.3.0 (2021-01-25)

-   (dkleber89) Set correct type for channels

### 1.2.2 (2020-05-30)

-   (dkleber89) Clear reconnectTimeout on Adapter unload;

### 1.2.1 (2020-04-20)

- (dkleber89) Add CI over Github Actions; Update Dependencies;

### 1.2.0 (2020-01-02)

- (dkleber89) Add Support for Strings with fixed length to 80 Chars

### 1.1.0 (2019-11-12)

- (dkleber89) Add Support for older TwinCat2 Systems with no autosync

### 1.0.7 (2019-10-25)

- (dkleber89) Add Support for Compact Mode -> JS Controller >= 2.0.0

### 1.0.6 (2019-08-11)

-   (dkleber89) Add check change of Datatype on resync

### 1.0.5 (2019-08-10)

-   (dkleber89) Eslint, Prettier with Airbnb Codestyle, CI adopted, little random changes in Project Structure

### 1.0.4 (2019-08-01)

-   (dkleber89) Increase depth of LOG details, Update dependency versions

### 1.0.2 (2019-05-18)

-   (Appollon77) Update testing for Node.js v12 in Appveyor und Travis

## License

The MIT License (MIT)

Copyright (c) 2018-2021 dkleber89 <dkleber89@gmail.com>

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