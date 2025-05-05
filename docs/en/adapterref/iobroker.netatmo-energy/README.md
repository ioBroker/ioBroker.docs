---
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.netatmo-energy.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.netatmo-energy.svg
BADGE-Number of Installations (latest): http://iobroker.live/badges/netatmo-energy-installed.svg
BADGE-Number of Installations (stable): http://iobroker.live/badges/netatmo-energy-stable.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/Homemade-Disaster/ioBroker.netatmo-energy/badge.svg
BADGE-NPM: https://nodei.co/npm/iobroker.netatmo-energy.png?downloads=true
---
![Logo](https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/admin/netatmo-energy.png)

# ioBroker.netatmo-energy

[![NPM version](http://img.shields.io/npm/v/iobroker.netatmo-energy.svg)](https://www.npmjs.com/package/iobroker.netatmo-energy)
[![Downloads](https://img.shields.io/npm/dm/iobroker.netatmo-energy.svg)](https://www.npmjs.com/package/iobroker.netatmo-energy)
![Number of Installations (latest)](http://iobroker.live/badges/netatmo-energy-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/netatmo-energy-stable.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/Homemade-Disaster/ioBroker.netatmo-energy/badge.svg)](https://snyk.io/test/github/Homemade-Disaster/ioBroker.netatmo-energy)
![Test and Release](https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/admin/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

[![NPM](https://nodei.co/npm/iobroker.netatmo-energy.png?downloads=true)](https://nodei.co/npm/iobroker.netatmo-energy/)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Requirements & configuration

Netatmo Energy hardware (thermostat, valves)
Account at Netatmo Cloud

- Adapter is working with admin >= 3 and nodejs >= 16
- Create your own account at <https://auth.netatmo.com/de-de/access/signup>
- Login in site <https://dev.netatmo.com/apidocumentation/energy>
- Create your own APP by clicking your account (top left), and press button "Create"
  - Fill out the form with your data
  - Copy your own client ID and client secret to the adapter config
    - Go back to the Documentation of Netatmo Energy API <https://dev.netatmo.com/apidocumentation/energy>
    - Select "GET homesdata" - "Try it out" - "EXECUTE / HOMESDATA"
      - you will get a response including your home id
      - copy it to your adapter config
    - Start the Netatmo Energy Adapter and authenticate yourself to the Netatmo API
      - Press the button "Authenticate with Netatmo"
      - Log into your account if necessary
      - Confirm 3rd party permissions for your Netatmo APP
      - Close the browser window
    - choose "general settings options" and "Save and close" the adapter config
      - apply temperature immediately ... send API request after changing "SetTemp" object
      - read API states immediately ... send API homestatus request after changing fields in API
      - Refresh states every x seconds ... permanent refresh of the API data. (0 = no permanent refresh)
  - As an option you can activate the notification assistant. Therefore, you must activate the option "Enable / disable notifications" in the "Logon information" menu and do the setup for the notification service in the menu "notifications". You can get information's, warnings and errors.
  - It is also possible to config the sensors for Doors/Windows in the Sensorik tab. Please also maintain the action, you want to trigger. These functions can generally be activated or deactivated on the login page.

A detailed description is available on adapter wiki (<https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/wiki>).

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/settings_login_en.png" alt="settingsLogin" width="70%"/>

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/settings_api_en.png" alt="settingsAPI" width="70%"/>

## netatmo-energy adapter for ioBroker

Get and set data using Netatmo-Energy API. This adapter uses the fetch command to execute http requests to Netatmo Energy API. The official documentation of this API: <https://dev.netatmo.com/apidocumentation/energy>.

It also creates a device called "energyAPP" including channels "APIRequests", "trigger".

### API Requests

- homesdata             ... get the whole structure of your Netatmo energy environment (using NAPlug-Parameter as default). You can set specific parameters.
- homestatus            ... get the status and the technical information of your valves assigned in your rooms. If you want to get the information of a specific device type, you can choose specific parameters.
- getroommeasure        ... Retrieve data history of a room. The response of this request will be stored in the response field.
- getmeasure            ... Retrieve boiler historical data. The response of this request will be stored in the response field.
- setthermmode_schedule ... set the mode of your Netatmo Energy to schedule (default)  
- setthermmode_hq       ... set the mode of your Netatmo Energy to hq (freeze mode)
- setthermmode_away     ... set the mode of your Netatmo Energy to away (from home)
- switchhomeschedule    ... set the schedule mode of all available schedule types. All possible combinations of the API request an its parameters are listed in channel switchhomeschedule as separate API requests.
- synchomeschedule      ... set the thermostat schedule of a home. To edit a particular schedule, you need to enter the schedule_id, if you don't specify one, the modification will be applied to the current schedule. Please specify the necessary parameters and send the request using synchomeschedule.
- createnewhomeschedule ... creates a new thermostat schedule for a home. Please specify the necessary parameters and send the request using createnewhomeschedule.

If an API request needs parameters, you can find these in the channel "parameters" in the corresponding API request channel.

### Trigger

- applychanges          ... transfer all manually changes of your valves to Netatmo Energy
- refresh_structure     ... create request homesdata and homestatus in sequenz

### Update requests

- setroomthermpoint     ... depending on the "setting" channel it sets the temperature of each room (immediately or by using the trigger "applychanges").
- set_mode_to_home      ... In the channel "setting" you can use the button "set_mode_to_home" to set "home"-Mode for the valve. The API request to transfer the changes will start immediately.

### Messages

- message_text          ... all messages are transferred to this datapoint

### Status

- running               ... here you can see if API Requests are running right now

### Request structure

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/EnergyAPP_measure.png" alt="settingsLogin" width="80%"/><img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/EnergyAPP.png" alt="settingsLogin" width="80%"/>

## Build structure

If you start the adapter, it will be generating the actual "homes"-environment of your Netatmo Energy APP.
It will automatically be built up the whole homes-structure, and the actual status of your valves.
Depending on the adapter settings it will refresh theses data after sending an API setthermmode request or an API setroomthermpoint request.

## Notifications

If you have activated a notification service in the adapter configuration you get specific messages using a notification service.
Following services are available.

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/notification_types_en.png" alt="settingsAPI" width="30%"/>

Please insert the necessary information's to connect to the service you choose.

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/notification_en.png" alt="settingsAPI" width="70%"/>

It is possible to test the connection to the notification service by pressing the button "SEND TEST NOTIFICATION". You have to save all notification configurations before you can use this function.

## Messages

You can send messages depending on status changes of specific states. The messages can be defined by yourself. These messages always transferred to datapoint "message_text".

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/messages_en.png" alt="settingsAPI" width="70%"/>

## Sensor actions

In the table, you can react to the "window_open" attribute per room. The status of the respective window sensors can trigger an action when changing, which is to be entered here. It is possible to select all sensors, which are boolean. This means that external sensors can also be integrated.

The following actions can be triggered:

- Set temperature
- Set Home-Mode
- Set heating mode
  - Frost guardian
  - Away from home
  - Normal
- Activate heating plan
  - you can take each existing heating plan from your Netatmo-Energy App

The temperature of a valve can thus be set when opening or closing a window/door. By entering a delay time (in seconds), the stored action is executed with a delay. If the triggering sensor is changed again within the delay time, the pending actions are not carried out.

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/sensors_en.png" alt="sensors" width="70%"/>

## Admin-Tab

On the Admin-Tab you can see all thermostats, plugs and valves from your netatmo energy instance. From there you can refresh the view and also request an API refresh. You have also the option to save changes into the cloud and to switch from manual mode to schedule mode.

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/admintab_en.png" alt="admintab" width="70%"/>

On each card you can find status icons, which show you the actual state of each thermostat, valve and plug. On the second page of the thermostat, you can find major API requests to change the thermostat mode and the schedule mode.

## Widget

Widget for VIS to show a complete valve. You have only to define the "SetTemp" - datapoint. The widget will get all other fields dynamically out of the "rooms"-structure.

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/valve_widget_en.png" alt="settingsAPI" width="250px"/>

## Changelog

[Older changes](CHANGELOG_OLD.md)
<!-- ### **WORK IN PROGRESS** -->
### 2.8.1 (2025-04-24)

* (ioKlausi) Update dependencies

### 2.8.0 (2025-01-31)

* (ioKlausi) Update dependencies

### 2.7.3 (2024-01-27)

* (ioKlausi) Option 'Only update datapoints if changes are detected' corrected

### 2.7.2 (2024-01-18)

* (ioKlausi) Adjust attributes of the adapter

### 2.7.1 (2023-12-10)

* (ioKlausi) Remove GULP support
* (ioKlausi) Support dark mode

### 2.7.0 (2023-11-19)

* (ioKlausi) Adjust default value for parameters

### 2.6.5 (2023-11-05)

* (ioKlausi) New options in the adapter configuration for updating datapoints

### 2.6.4 (2023-10-25)

* (ioKlausi) Change value only if changes are detected

### 2.6.3 (2023-10-14)

* (ioKlausi) Adapt GULP

### 2.6.2 (2023-10-13)

* (ioKlausi) Bug fix of 'Sentry errors'

### 2.6.1 (2023-06-01)

* (ioKlausi) Correct some adapter check issues

### 2.6.0 (2023-05-01)

* (ioKlausi) Enable / Disable sensor actions

### 2.5.8 (2023-04-16)

* (ioKlausi) Bug fix of translations

### 2.5.7 (2023-04-16)

* (ioKlausi) Bug fix of sensor actions

### 2.5.6 (2023-04-15)

* (ioKlausi) Bug fix of Sentry errors
* (ioKlausi) Home mode for individual rooms in admin tab established
* (ioKlausi) Bug fix of translations

### 2.5.5 (2023-04-11)

* (ioKlausi) Bug fix of Sentry errors

### 2.5.4 (2023-04-10)

* (ioKlausi) Bug fix of Sentry errors

### 2.5.3 (2023-04-10)

* (ioKlausi) Added data point for messages

### 2.5.2 (2023-04-09)

* (ioKlausi) Made some adjustments in the admin config

### 2.5.1 (2023-04-09)

* (ioKlausi) Test message in config added
* (ioKlausi) Revise ioBroker Netatmo-Energy APP

### 2.5.0 (2023-04-07)

* (ioKlausi) Sensor changed to object ID type boolean

## License

MIT License

Copyright (c) 2021-2025 ioKlausi <nii@gmx.at>

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