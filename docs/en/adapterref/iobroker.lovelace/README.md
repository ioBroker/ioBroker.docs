![Logo](admin/lovelace.png)
# ioBroker.lovelace

[![NPM version](http://img.shields.io/npm/v/iobroker.lovelace.svg)](https://www.npmjs.com/package/iobroker.lovelace)
[![Downloads](https://img.shields.io/npm/dm/iobroker.lovelace.svg)](https://www.npmjs.com/package/iobroker.lovelace)
[![Dependency Status](https://img.shields.io/david/ioBroker/iobroker.lovelace.svg)](https://david-dm.org/ioBroker/iobroker.lovelace)
[![Known Vulnerabilities](https://snyk.io/test/github/ioBroker/ioBroker.lovelace/badge.svg)](https://snyk.io/test/github/ioBroker/ioBroker.lovelace)

[![NPM](https://nodei.co/npm/iobroker.lovelace.png?downloads=true)](https://nodei.co/npm/iobroker.lovelace/)

**Tests:** Linux/Mac: [![Travis-CI](http://img.shields.io/travis/ioBroker/ioBroker.lovelace/master.svg)](https://travis-ci.org/ioBroker/ioBroker.lovelace)
Windows: [![AppVeyor](https://ci.appveyor.com/api/projects/status/github/ioBroker/ioBroker.lovelace?branch=master&svg=true)](https://ci.appveyor.com/project/ioBroker/ioBroker-lovelace/)

## lovelace adapter for ioBroker

With this adapter you can build visualization for ioBroker with Home Assistant Lovelace UI.

[Deutsche Dokumentation](docs/de/README.md)

## Configuration
There are two arts how the entities could be configured:
- auto
- manual

### Auto
In auto mode the similar process will be applied like for `google home` or `material adapter`.

***Only objects and channel will be detected that have `function`and `room` categories defined***

You can define friendly names and this will be used in entities.

### Manual
The objects can be defined manually in object tree like sql or histroy. The type of entity must be provided and optionally the name of object.
With this method only simple entities, like input_number, input_text or input_boolean could be created. It may not have more than one state or attribute.

## Panels
### Alarm panel
ioBroker does not support such a device yet, but it can be simulated. If you create such a script:

```
createState(
    'alarmSimple',
    false,
    false,
    {
        "name": "alarmSimple",
        "role": "alarm",
        "type": "boolean",
        "read": true,
        "write": true,
        "desc": "Arm or disarm with code",
        "def": false,
        "custom": {
            "lovelace.0": {
                "enabled": true,
                "entity": "alarm_control_panel",
                "name": "simulateAlarm" // this is a name how the entity will be called. In this case "alarm_control_panel.simulateAlarm"
            }
        }
    },
    {
        "alarm_code": 1234 // this is a alarm code, that must be entered
    },
    function () {
        // react on changes
        on({id: 'javascript.' + instance + '.alarmSimple', change: 'any'}, function (obj) {
            console.log('Control here the real device: ' + obj.state.val);
        });
    }
);
```

or you just use `lovelace.X.control.alarm (entity_id = alarm_control_panel.defaultAlarm)` for it.

### Number input
This can be done manually if input_number entity type in custom dialog is selected.
This type required `min` and `max` values in `common` and optional `step` could be added.
If you want to see the up and down arrows, you should set in custom `mode` to 'number':

```
common: {
    custom: {
        "lovelace.0": {
            "enabled": true,
            "entity": "input_number",
            "name": "Shutter" // this is a name how the entity will be called. In this case "alarm_control_panel.simulateAlarm"
            "mode": "number", // default presentation is slider
        }
    }
}
```

### Select input
This can be done manually if input_select entity type in custom dialog is selected.
The list of options to select from should be provide in standard commom.states object:

```
"common": {
    "type": "string",
    "states": {
      "1": "select 1",
      "2": "Select 2",
      "3": "select 3"
    },
    "custom": {
      "lovelace.0": {
        "enabled": true,
        "entity": "input_text",
        "name": "test_input_select"
      }
    }
```
in other words in should also be input select in IoB.

### Timer
Timer could be simulated by following script:

```
createState(
    'timerSimple',
    false,
    false,
    {
        "name": "timerSimple",
        "role": "level.timer",
        "type": "number",
        "read": true,
        "write": true,
        "unit": "sec",
        "desc": "Start/Stop Timer",
        "def": 0,
        "custom": {
            "lovelace.0": {
                "enabled": true,
                "entity": "timer",
                "name": "simulateTimer" // this is a name how the entity will be called. In this case "timer.simulateTimer"
            }
        }
    },
    {
        "alarm_code": 1234 // this is a alarm code, that must be entered
    },
    function () {
        let interval;
        let id = 'javascript.' + instance + '.timerSimple';
        // react on changes
        on({id, change: 'any'}, function (obj) {
            // If command
            if (!obj.state.ack) {
                // If start or pause timer
                if (obj.state.val) {
                    // If pause (the same value was written)
                    if (obj.state.val === obj.oldState.val) {
                        if (interval) {
                            setState(id, state.val, true);
                            clearInterval(interval);
                            interval = null;
                        } else {
                            interval = setInterval(() => {
                                getState(id, (err, state) => {
                                    state.val--;
                                    if (state.val <= 0) {
                                        clearInterval(interval);
                                        interval = null;
                                        state.val = 0;
                                    }
                                    setState(id, state.val, true);
                                });
                            }, 1000);
                        }
                    } else {
                        interval && clearInterval(interval);
                        // update value every second
                        interval = setInterval(() => {
                            getState(id, (err, state) => {
                                state.val--;
                                if (state.val <= 0) {
                                    clearInterval(interval);
                                    interval = null;
                                    state.val = 0;
                                }
                                setState(id, state.val, true);
                            });
                        }, 1000);
                    }
                } else {
                    // stop interval
                    interval && clearInterval(interval);
                    interval = null;
                }
            }
        });
        // test timer. Disable it later
        setTimeout(() => setState(id, 20));
    }
);
```

### Weather
Tested with yr and daswetter. One or more of following objects must have `Function=Weather` and `Room=Any` set to be available in configuration:
- daswetter.0.NextDays.Location_1
- yr.0.forecast

Tested with AccuWeather driver v1.1.0 https://github.com/iobroker-community-adapters/ioBroker.accuweather.
Custom Lovelace card created in support of accuweather forecast - https://github.com/algar42/IoB.lovelace.accuweather-card

### Shopping list
Shopping list writes the values in form:
```
[
   {name: 'Task 1', id: 1234222, complete: false},
   {name: 'Task 2', id: 1234223, complete: true}
]
```
into `lovelace.X.control.shopping_list` state.

### Map
The objects must look like this one:

```
createState('location', '39.5681295;2.6432632', false, {
    "name": "location",
    "role": "value.gps",
    "type": "string",
    "read": true,
    "write": false,
    "desc": "Gps Coordinates"
});
```

or this two objects:

```
createState('location.longitude', 2.6432632, false, {
    "name": "location longitude",
    "role": "value.gps.longitude",
    "type": "number",
    "read": true,
    "write": false,
    "desc": "Gps Coordinates"
});
createState('location.latitude', 39.5681295, false, {
    "name": "location latitude",
    "role": "value.gps.latitude",
    "type": "number",
    "read": true,
    "write": false,
    "desc": "Gps Coordinates"
});
```

### Picture entity
You can use static picture for it or use any state that delivers URL as state.
E.g.:

```
{
  "_id": "daswetter.0.NextDays.Location_1.Day_1.iconURL",
  "type": "state",
  "common": {
    "name": "Weather icon URL",
    "type": "string",
    "role": "weather.icon.forecast.0",
    "read": true,
    "write": false
  },
  "native": {}
}
```

or just set manually the entity type to `camera` and write URL into it.

### Hide toolbar
To hide toolbar you can set the checkbox in the ioBroker configuration dialog on the Themes tab.
To show it, you can disable it in the dialog again or just call the URL with `?toolbar=true` parameter.

### Markdown
You can use bindings in markdown like in [iobroker.vis](https://github.com/ioBroker/ioBroker.vis#bindings-of-objects).

E.g. Text `Admin adapter is {a:system.adapter.admin.0.alive;a === true || a === 'true' ? ' ' : 'not '} *alive*.` will produce text `Admin adapter is alive` in markdown panel.

## Custom cards
### Upload of custom cards
To upload the custom card write following:

```iobroker file write PATH_TO_FILE\bignumber-card.js /lovelace.0/cards/```

After restart of lovelace adapter it will include all files from the `cards` directory automatically.

Following custom cards could be tested successfully:
- bignumber-card: https://github.com/custom-cards/bignumber-card/blob/master/bignumber-card.js
- simple-thermostat: https://github.com/nervetattoo/simple-thermostat/releases (take the latest release)
- thermostat: https://github.com/ciotlosm/custom-lovelace/tree/master/thermostat-card (both files .js and .lib.js are required)

I found this link https://github.com/jimz011/homeassistant as an interesting resource for custom cards.

Often the custom cards are stored on github as sources and must be compiled before use.
You should check the `Releases` menu on github and try to find compiled files there.
Like this one: [https://github.com/kalkih/mini-graph-card/releases](https://github.com/kalkih/mini-graph-card/releases) (Look for the file `mini-graph-card-bundle.js`)

## Own images
The custom images (e.g. for background) could be loaded via the same configuration dialog like the custom cards. And use it like this:

`background: center / cover no-repeat url("/cards/background.jpg") fixed`

or

`background: center / cover no-repeat url("/local/custom_ui/background.jpg") fixed`

in lovelace configuration file. Read more about background in lovelace [here](https://www.home-assistant.io/lovelace/views/#background).

## Themes
The themes can be defined in configuration dialog of ioBroker.
Paste something like:
```
midnight:
  # Main colors
  primary-color: '#5294E2'                                                        # Header
  accent-color: '#E45E65'                                                         # Accent color
  dark-primary-color: 'var(--accent-color)'                                       # Hyperlinks
  light-primary-color: 'var(--accent-color)'                                      # Horizontal line in about

  # Text colors
  primary-text-color: '#FFFFFF'                                                   # Primary text colour, here is referencing dark-primary-color
  text-primary-color: 'var(--primary-text-color)'                                 # Primary text colour
  secondary-text-color: '#5294E2'                                                 # For secondary titles in more info boxes etc.
  disabled-text-color: '#7F848E'                                                  # Disabled text colour
  label-badge-border-color: 'green'                                               # Label badge border, just a reference value

  # Background colors
  primary-background-color: '#383C45'                                             # Settings background
  secondary-background-color: '#383C45'                                           # Main card UI background
  divider-color: 'rgba(0, 0, 0, .12)'                                             # Divider

  # Table rows
  table-row-background-color: '#353840'                                           # Table row
  table-row-alternative-background-color: '#3E424B'                               # Table row alternative

  # Nav Menu
  paper-listbox-color: 'var(--primary-color)'                                     # Navigation menu selection hoover
  paper-listbox-background-color: '#2E333A'                                       # Navigation menu background
  paper-grey-50: 'var(--primary-text-color)'
  paper-grey-200: '#414A59'                                                       # Navigation menu selection

  # Paper card
  paper-card-header-color: 'var(--accent-color)'                                  # Card header text colour
  paper-card-background-color: '#434954'                                          # Card background colour
  paper-dialog-background-color: '#434954'                                        # Card dialog background colour
  paper-item-icon-color: 'var(--primary-text-color)'                              # Icon color
  paper-item-icon-active-color: '#F9C536'                                         # Icon color active
  paper-item-icon_-_color: 'green'
  paper-item-selected_-_background-color: '#434954'                               # Popup item select
  paper-tabs-selection-bar-color: 'green'

  # Labels
  label-badge-red: 'var(--accent-color)'                                          # References the brand colour label badge border
  label-badge-text-color: 'var(--primary-text-color)'                             # Now same as label badge border but that's a matter of taste
  label-badge-background-color: '#2E333A'                                         # Same, but can also be set to transparent here

  # Switches
  paper-toggle-button-checked-button-color: 'var(--accent-color)'
  paper-toggle-button-checked-bar-color: 'var(--accent-color)'
  paper-toggle-button-checked-ink-color: 'var(--accent-color)'
  paper-toggle-button-unchecked-button-color: 'var(--disabled-text-color)'
  paper-toggle-button-unchecked-bar-color: 'var(--disabled-text-color)'
  paper-toggle-button-unchecked-ink-color: 'var(--disabled-text-color)'

  # Sliders
  paper-slider-knob-color: 'var(--accent-color)'
  paper-slider-knob-start-color: 'var(--accent-color)'
  paper-slider-pin-color: 'var(--accent-color)'
  paper-slider-active-color: 'var(--accent-color)'
  paper-slider-container-color: 'linear-gradient(var(--primary-background-color), var(--secondary-background-color)) no-repeat'
  paper-slider-secondary-color: 'var(--secondary-background-color)'
  paper-slider-disabled-active-color: 'var(--disabled-text-color)'
  paper-slider-disabled-secondary-color: 'var(--disabled-text-color)'

  # Google colors
  google-red-500: '#E45E65'
  google-green-500: '#39E949'
```

taken from [here](https://community.home-assistant.io/t/midnight-theme/28598/2).

## Icons
Use icons in form `mdi:NAME`, like 'mdi:play-network'. Names can be taken from here: https://materialdesignicons.com/

## Notifications
You can add notifications via `sendTo` functionality or by writing the state into `lovelace.X.notifications.add`:

```
sendTo('lovelace.0', 'send', {message: 'Message text', title: 'Title'}); // full version
sendTo('lovelace.0', 'send', 'Message text'); // short version
```

or

```
setState('lovelace.0.notifications.add', '{"message": "Message text", "title": "Title"}'); // full version
setState('lovelace.0.notifications.add', 'Message text'); // short version
```

## Voice control
All commands from web interface will be written into lovelace.X.conversation state with `ack=false`.
You can write a script that will react on request and will answer:
```
on({id: 'lovelace.0.conversation', ack: false, change: 'any'}, obj => {
   console.log('Question: ' + obj.state.val);
   if (obj.state.val.includes('time')) {
      setState('lovelace.0.conversation', new Date().toString(), true); // true is important. It will say, that this is answer.
   } else {
      setState('lovelace.0.conversation', 'Sorry I don\'t know, what do you want', true); // true is important. It will say, that this is answer.
   }
});
```

## Trouble Shooting
If you messed up the YAML Code and see a blank page but still have the top menu, you can enable edit mode (if not already enabled) from the menu and then open the menu again to access the "RAW Yaml Editor" in which you see the complete YAML code and can clean it up.
If that does not help, you can open the object lovelace.*.configuration in raw-editor in ioBroker and have a look there.
You can also restore that object from a backup. It contains the complete configuration of your visualization.

## Original sources for lovelace
Used sources are here https://github.com/GermanBluefox/home-assistant-polymer .

## Todo
Security must be taken from current user and not from default_user

## Development
### Version
Used version of home-assistant-frontend@20201021.4

### How to build the new Lovelace version
First of all the actual https://github.com/home-assistant/frontend (dev branch) must be **manually** merged into https://github.com/GermanBluefox/home-assistant-polymer.git (***iob*** branch!).

All changes for ioBroker are marked with comment `// IoB`.
For now (20201021.4) following files were modified:
- `build-scripts/gulp/app.js` - Add new gulp task
- `build-scripts/gulp/webpack.js` - Add new gulp task
- `src/data/lovelace.ts` - add hide toolbar option
- `src/data/weather.ts` - add support to display weather icon from url.
- `src/dialogs/more-info/ha-more-info-dialog.ts` - remove entity settings button and remove weather state & history
- `src/dialogs/more-info/controls/more-info-climate.ts` - print mode name for unsupported modes
- `src/dialogs/more-info/controls/more-info-weather.ts` - add support to display weather icon from url.
- `src/entrypoints/core.ts` - modified authentication process
- `src/layouts/home-assistant-main.ts` - remove app sidebar
- `src/panels/lovelace/cards/hui-weather-forecast-card.ts` - add support to display weather icon from url.
- `src/panels/lovelace/entity-rows/hui-weather-entity-row.ts` - add support to display weather icon from url with auth.
- `src/panels/lovelace/hui-root.ts` - added notifications and voice control
- `src/util/documentation-url.ts` - for link to iobroker help instead of homeassistant.
- `.gitignore` - add `.idea` ignore
- `package.json` - remove husky commit hook


After that checkout modified version in `./build` folder. Then.

1. go to ./build directory.
2. `git clone https://github.com/GermanBluefox/home-assistant-polymer.git` it is a fork of https://github.com/home-assistant/frontend.git, but some things are modified (see the file list earlier).
3. `cd home-assistant-polymer`
4. `git checkout master`
5. `npm install`
6. `gulp build-app` for release or `gulp develop-iob` for the debugging version. To build web after changes you can call `webpack-dev-app` for faster build, but you need to call `build-app` anyway after the version is ready for use.
7. copy all files from `./build/home-assistant-polymer/hass_frontend` into `./hass_frontend` in this repo
8. Start `gulp rename` task.

## Changelog

<!--
	PLACEHOLDER for next version:
	### **WORK IN PROGRESS**
-->
### 2.0.6 (2021-08-31)
* (Garfonso) Add manual entity support for geo_location (inofficial currently)
* (Garfonso) Fix binding for other things than val (like ts or lc).
* (algar42) Add additional field for accuweather weather (and custom card)
* (algar42) translate russian characters to allowed charset in ids
* (Garfonso) Add workaround for custom card upload issue with admin 5.
* (Garfonso) fix history attribues with state and multiple attributes

### 2.0.4 (2021-07-23)
* (Garfonso) Add support for fan entity (makes fan card working).
* (Garfonso) fix backwards compatibility for input_datetime attributes.
* (Garfonso) fix airconditioner with power mode on mode update

### 2.0.3 (2021-07-04)
* (Garfonso) fix typo.

### 2.0.2 (2021-07-04)
* (Garfonso) fixed: Date shift for weather forecast without date state.

### 2.0.1 (2021-07-01)
* (Garfonso) fixed: Zigbee lights (issue 222).

## License

Copyright 2019-2021, bluefox <dogafox@gmail.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
