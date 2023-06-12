![Logo](admin/solarmanpv.png)
# ioBroker.solarmanpv

[![NPM version](https://img.shields.io/npm/v/iobroker.solarmanpv.svg)](https://www.npmjs.com/package/iobroker.solarmanpv)
[![Downloads](https://img.shields.io/npm/dm/iobroker.solarmanpv.svg)](https://www.npmjs.com/package/iobroker.solarmanpv)
![Number of Installations](https://iobroker.live/badges/solarmanpv-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/solarmanpv-stable.svg)
[![Dependency Status](https://img.shields.io/david/raschy/iobroker.solarmanpv.svg)](https://david-dm.org/raschy/iobroker.solarmanpv)

[![NPM](https://nodei.co/npm/iobroker.solarmanpv.png?downloads=true)](https://nodei.co/npm/iobroker.solarmanpv/)

**Tests:** ![Test and Release](https://github.com/raschy/ioBroker.solarmanpv/workflows/Test%20and%20Release/badge.svg)

## solarmanpv adapter for ioBroker

Reading data from balcony power plant


### Getting started

This adapter is used to display data of a balcony power plant, which 
is provided by a inverter "Bosswerk MI600" in ioBroker. This inverter 
is compatible with others in the Deye family.

I assume that the plant is monitored by the app "Solarman" so far. 
This adapter gets the data from this cloud.

First you have to ask Solarman support <service@solarmanpv.com> for 
the needed Credentials (app_id & app_secret) must be requested.
There may still be a query of the type, "I need to ask what platform 
are you using? What is your role? Are you an individual, O&M provider, 
manufacturer, or distributor? Can you give me your email address for 
the API?". In my case, another query then came: "Why are you applying 
for API?". I politely answered this question as well and was sent the 
necessary data the next day.

On the admin page the 4 fields  have to be according to the description. 
This adapter is created as a "scheduled" adapter. 
Since the data in the cloud is updated only about every 6 minutes, 
it does not make to start the adapter more frequently.

Since version 0.3.0, in contrast to the previous versions, a blacklist 
is made possible. This means that "all" values supplied by the Api are 
read in and the user can filter out the values that are not needed via 
the blacklist. The corresponding data points can be deleted, which 
makes the number of objects clearer.

Since 16.04.2023 Solarman has switched to a new platform. Further 
adaptations of the api, as far as they exist, have not been made.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.4.3 (2023-06-12)
* (raschy) Blacklist also deletes data points
* (raschy) Fixed error with multiple inverters

### 0.4.2 (2023-05-31)
* (raschy) Module selection activated

### 0.4.1 (2023-05-27)
* (raschy) Do not display devices that are not required

### 0.4.0 (2023-04-16)
* (raschy) Solarman has switched to a new platform

### 0.3.2 (2023-03-28)
* (raschy) Error 'DB-closed' fixed

### 0.3.1 (2023-02-19)
* (raschy) Inverter-Filter deactivated

### 0.3.0 (2023-02-17)
* (raschy) Blacklist added

### 0.2.2 (2023-02-08)
* (raschy) Release for github/npm

### 0.2.1 (2023-02-08)
* (raschy) Timeout extended, type error fixed during setup, some data added from BMS

### 0.2.0 (2022-11-07)
* (raschy) Adding the battery data from hybrid inverters

### 0.1.5 (2022-10-17)
* (raschy) Added support for hybrid inverters and 4 MPPTs

### 0.1.4 (2022-09-17)
* (raschy) Corrections after first review

### 0.1.3 (2022-08-19)
* (raschy) Adapter termination code changed

### 0.1.2 (2022-07-30)
* (raschy) Added device status, structure reduced

### 0.1.1 (2022-07-27)
* (raschy) Clean up the code and start delay

### 0.1.0 (2022-07-26)
* (raschy) Also for multiple inverter per station

### 0.0.14 (2022-07-13)
* (raschy) Extension for multiple plants

### 0.0.13 (2022-07-11)
* (raschy) Clean up the debug values

### 0.0.13-alpha.0 (2022-07-10)
* (raschy) ApiClient swapped to separate file

### 0.0.12 (2022-07-04)
* (raschy) test and release workflow for npm activated

### 0.0.11 (2022-07-03)
* (raschy) Create to release

### 0.0.10 (2022-07-03)
* (raschy) User warnings addet

### 0.0.9 (2022-06-20)
* (raschy) Errorhandling addet

### 0.0.8 (2022-06-19)
* (raschy) Try after clearing folder

### 0.0.7 (2022-06-19)
* (raschy) Try first release

### 0.0.6 (2022-06-19)
* (raschy) Crypto version corrected

### 0.0.5 (2022-06-19)
* (raschy) Crypto version changed

### 0.0.4 (2022-06-19)
* (raschy) Dependecies addet

### 0.0.3 (2022-06-19)
* (raschy) ReadMe changed

### 0.0.2 (2022-06-19)
* (raschy) changed to jsonConfig

### 0.0.1 (2022-06-16)
* (raschy) initial release

## License
MIT License

Copyright (c) 2023 raschy <raschy@gmx.de>

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