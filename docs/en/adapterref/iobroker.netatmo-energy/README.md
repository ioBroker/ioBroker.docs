---
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.netatmo-energy.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.netatmo-energy.svg
BADGE-Number of Installations (latest): http://iobroker.live/badges/netatmo-energy-installed.svg
BADGE-Number of Installations (stable): http://iobroker.live/badges/netatmo-energy-stable.svg
BADGE-Dependency Status: https://img.shields.io/david/Homemade-Disaster/iobroker.netatmo-energy.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/Homemade-Disaster/ioBroker.netatmo-energy/badge.svg
BADGE-NPM: https://nodei.co/npm/iobroker.netatmo-energy.png?downloads=true
---
![Logo](https://raw.githubusercontent.com/Homemade-Disaster/ioBroker.netatmo-energy/master/admin/netatmo-energy.png)
# ioBroker.netatmo-energy

[![NPM version](http://img.shields.io/npm/v/iobroker.netatmo-energy.svg)](https://www.npmjs.com/package/iobroker.netatmo-energy)
[![Downloads](https://img.shields.io/npm/dm/iobroker.netatmo-energy.svg)](https://www.npmjs.com/package/iobroker.netatmo-energy)
![Number of Installations (latest)](http://iobroker.live/badges/netatmo-energy-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/netatmo-energy-stable.svg)
[![Dependency Status](https://img.shields.io/david/Homemade-Disaster/iobroker.netatmo-energy.svg)](https://david-dm.org/Homemade-Disaster/iobroker.netatmo-energy)
[![Known Vulnerabilities](https://snyk.io/test/github/Homemade-Disaster/ioBroker.netatmo-energy/badge.svg)](https://snyk.io/test/github/Homemade-Disaster/ioBroker.netatmo-energy)

[![NPM](https://nodei.co/npm/iobroker.netatmo-energy.png?downloads=true)](https://nodei.co/npm/iobroker.netatmo-energy/)

**Tests:** ![Test and Release](https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/workflows/Test%20and%20Release/badge.svg)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Requirements & configuration
Netatmo Energy hardware (thermostat, valves)
Account at Netatmo Cloud
- Adapter is working with admin => 3 and nodejs >= 12
- Create your own account at https://auth.netatmo.com/de-de/access/signup
- Login in site https://dev.netatmo.com/apidocumentation/energy
- Create your own APP by clicking your account (top left), and press button "Create"
  - Fill out the form with your data
  - Copy your own client ID and client secret to the adapter config
	- Go back to the Documentation of Netatmo Energy API https://dev.netatmo.com/apidocumentation/energy
	- Select "GET homesdata" - "Try it out" - "EXECUTE / HOMESDATA"
		- you will get a response including your home id
		- copy it to your adapter config
	- insert your user and password from Netatmo Cloud to your adapter config
	- choose "general settings options" and "Save and close" the adapter config
		- apply temperature immediately ... send API request after changing "SetTemp" object
		- read API states immediately ... send API homestatus request after changing fields in API
		- Refresh states every x seconds ... permanent refresh of the API data. (0 = no permanent refresh)
  - As an option you can activate the notification assistant. Therefore, you have to activate the option "Enable / disable notifications" in the "Logon information" menu and do the setup for the notification service in the menu "notifications". You can get informations, warnings and errors.

A detailed description is available on adapter wiki (https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/wiki).

<img src="https://raw.githubusercontent.com/Homemade-Disaster/ioBroker.netatmo-energy/master/docs/img/settings_login_en.png" alt="settingsLogin" width="70%"/>

<img src="https://raw.githubusercontent.com/Homemade-Disaster/ioBroker.netatmo-energy/master/docs/img/settings_api_en.png" alt="settingsAPI" width="70%"/>

## netatmo-energy adapter for ioBroker
Get and set data using Netatmo-Energy API. This adapter uses the fetch command to execute http requests to Netatmo Energy API. The official documentation of this API: https://dev.netatmo.com/apidocumentation/energy.

It also creates a device called "energyAPP" including channels "APIRequests", "trigger".

### API Requests
* homesdata             ... get the whole structure of your Netatmo energy environment (using NAPlug-Parameter as default).You can set specific parameters.
* homestatus            ... get the status and the technical information of your valves assigned in your rooms. If you want to get the information of a specific device type you can choose specific parameters.
* getroommeasure        ... Retrieve data history of a room. The response of this request will be stored in the response field.
* getmeasure            ... Retrieve boiler historical data. The response of this request will be stored in the response field.
* setthermmode_schedule ... set the mode of your Netatmo Energy to schedule (default)  
* setthermmode_hq       ... set the mode of your Netatmo Energy to hq (freeze mode)
* setthermmode_away     ... set the mode of your Netatmo Energy to away (from home)
* switchhomeschedule    ... set the schedule mode of all available schedule types. All possible combinations of the API request an its parameters are listed in channel switchhomeschedule as separate API requests.
* synchomeschedule      ... set the thermostat schedule of a home. To edit a particular schedule, you need to enter the schedule_id, if you don't specify one, the modification will be applied to the current schedule. Please specify the necessary parameters and send the request using synchomeschedule.

If an API request need parameters, you can find these in the channel "parameters" in the corresponding API request channel.

### Trigger
* applychanges          ... transfer all manually changes of your valves to Netatmo Energy
* refresh_structure     ... create request homesdata and homestatus in sequenz

### Update requests
* setroomthermpoint     ... depending on the "setting" channel it sets the temperature of each room (immediately or by using the trigger "applychanges")

### Status
* running               ... here you can see if API Requests are running right now

### Request structure
<img src="https://raw.githubusercontent.com/Homemade-Disaster/ioBroker.netatmo-energy/master/docs/img/EnergyAPP_measure.png" alt="settingsLogin" width="80%"/><img src="https://raw.githubusercontent.com/Homemade-Disaster/ioBroker.netatmo-energy/master/docs/img/EnergyAPP.png" alt="settingsLogin" width="80%"/>

## Build structure
If you start the adapter it will be generating the actual "homes"-environment of your Netatmo Energy APP.
It will automatically be built up the whole homes-structure, and also the actual status of your valves.
Depending on the adapter settings it will refresh theses data after sending an API setthermmode request or an API setroomthermpoint request.

## Notifications
If you have activated a notification service in the adapter configuration you get specific messages using a notification service.
Following services are available.

<img src="https://raw.githubusercontent.com/Homemade-Disaster/ioBroker.netatmo-energy/master/docs/img/notification_types_en.png" alt="settingsAPI" width="30%"/>

Please insert the necessary informations to connect to the service you choose.

<img src="https://raw.githubusercontent.com/Homemade-Disaster/ioBroker.netatmo-energy/master/docs/img/notification_en.png" alt="settingsAPI" width="70%"/>

## Widget
Widget for VIS to show a complete valve. You have only to define the "SetTemp" - datapoint. The widget will get all other fields dynamically out of the "rooms"-structure.

<img src="https://raw.githubusercontent.com/Homemade-Disaster/ioBroker.netatmo-energy/master/docs/img/valve_widget_en.png" alt="settingsAPI" width="250px"/>

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.2.4 (2022-02-13)
* (ioKlausi) Release Script added

### 0.2.3
* (ioKlausi) AbortController added

### 0.2.2
* (ioKlausi) Übersetzungen hinzugefügt & Kompaktmodus getestet

### 0.2.1
* (ioKlausi) Creation of states adapted

### 0.2.0
* (ioKlausi) Compatibility check to js-controller 4.0

## License
MIT License

Copyright (c) 2022 ioKlausi <nii@gmx.at>

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