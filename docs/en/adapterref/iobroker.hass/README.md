![Logo](admin/hass.png)
# ioBroker.hass

![Number of Installations](http://iobroker.live/badges/hass-installed.svg)
![Number of Installations](http://iobroker.live/badges/hass-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.hass.svg)](https://www.npmjs.com/package/iobroker.hass)

![Test and Release](https://github.com/ioBroker/ioBroker.hass/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/hass/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.hass.svg)](https://www.npmjs.com/package/iobroker.hass)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.


This adapter allows the connecting of Home Assistant to ioBroker.

## Usage
Create a long term token in HASS and use it as PW (copy it also in the repeat field).

Then it should read out all attributes for all devices. Services might be controllable (e.g. "turn_on"). To control services you have two options:

### Set a direct value
Set the state with an ack=false value which is not a string (e.g. Boolean true) then it will be triggered also in HASS without additional service data. This will only work if the service has one field to be sent - then the value is sent as this field! If the service has more than one field you will find a warning in the log that provides more details about the fields taht are possible to be sent, e.g.

```
Please make sure to provide a stringified JSON as value to set relevant fields! Please refer to the Readme for details!
Allowed field keys are: temperature, target_temp_high, target_temp_low, hvac_mode
```

### Set a stringified JSON to provide one or multiple fields
Set the state with an ack=false String value which is a stringified JSON object to call the service and use the JSON object as service data

For the last option on a light.turn_off with e.g. `{"transition":10,"flash":"short"}` these two service data details are sent with the call to HASS. The available fields with their exact data definition can be seen in the JSON definition of the ioBroker object in the native.fields section and would look like the following in the above example:

`
...
    native: {
        "fields": {
            "transition": {
                "name": "Transition",
                "description": "Duration it takes to get to next state.",
                "selector": {
                    "number": {
                        "min": 0,
                        "max": 300,
                        "unit_of_measurement": "seconds"
                    }
                }
            },
            "flash": {
                "name": "Flash",
                "description": "If the light should flash.",
                "advanced": true,
                "selector": {
                    "select": {
                        "options": [
                            "long",
                            "short"
                        ]
                    }
                }
            }
        },
        "entity_id": "light.mi_control_hub_light",
        "attr": "turn_off",
        "type": "light"
    }
...
`

For some services like set_speed it is required to call with a JSON object like `{speed: "high"}` in general to provide required values. In this case the field definition look e.g. like:

```
...
    native: {
        "fields": {
            "speed": {
                "name": "Speed",
                "description": "Speed setting.",
                "required": true,
                "example": "low",
                "selector": {
                    "text": null
                }
            }
        }
        ...
    }
...
```

## Configuration
There is a good article about connection. 

Please check it https://www.smarthomejetzt.de/mit-iobroker-auf-eine-home-assistant-hass-io-installation-und-die-geraete-zugreifen/ 

**Unfortunately only in german, but the [google translate works rather good](https://translate.google.com/translate?hl=en&sl=de&tl=en&u=https%3A%2F%2Fwww.smarthomejetzt.de%2Fmit-iobroker-auf-eine-home-assistant-hass-io-installation-und-die-geraete-zugreifen%2F)** 

<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->

## Changelog
### 1.4.0 (2023-01-03)
* (Apollon77) Added more guidance logging when setting services incorrectly
* (Apollon77) Prevent crashes when attributes contain "." at the end of their names
* (Apollon77) Added logging for state updates for unknown objects

### 1.3.0 (2022-07-01)
* (Apollon77) Further optimize sending data to HASS and allow to set values like numbers as normal states if the service has one attribute and it can be mapped

### 1.2.0 (2022-06-17)
* (Apollon77) IMPORTANT: Replace special characters in entity attribute names with an underscore! Object IDs might change!
* (Apollon77) make sure a "null" value in state changes is not crashing

### 1.1.2 (2022-03-29)
* (Apollon77) Fix crash cases reported by Sentry

### 1.1.1 (2022-03-25)
* (Apollon77) Show password fields masked again in config

### 1.1.0 (2022-03-24)
* IMPORTANT: You need to re-enter the password once after installing this version!
* (Apollon77) Implement Service triggers to use any value to trigger or stringified JSON to call with fields
* (Apollon77) Optimize unload handling
* (Apollon7) Add Sentry for crash reporting

### 1.0.1 (2021-09-04)
* IMPORTANT: js-controller 2.0 is needed st least!
* (Apollon77) Fix start issue
* (Apollon77/Garfonso) Fix issue where value could not be set in hass

### 1.0.0 (2020-12-13)
* (bluefox) added the support of compact mode

### 0.1.0
* (bluefox) initial release

## License
The MIT License (MIT)

Copyright (c) 2018-2023 bluefox <dogafox@gmail.com>

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
