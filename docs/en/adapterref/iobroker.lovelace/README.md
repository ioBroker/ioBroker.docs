![Logo](admin/lovelace.png)
# ioBroker.lovelace

![Number of Installations](http://iobroker.live/badges/lovelace-installed.svg)
![Number of Installations](http://iobroker.live/badges/lovelace-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.lovelace.svg)](https://www.npmjs.com/package/iobroker.lovelace)

![Test and Release](https://github.com/ioBroker/iobroker.lovelace/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/lovelace/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.lovelace.svg)](https://www.npmjs.com/package/iobroker.lovelace)

## lovelace adapter for ioBroker

With this adapter, you can build visualization for ioBroker with Home Assistant Lovelace UI.

[Deutsche Dokumentation](docs/de/README.md)

## Instance objects
In the folder instances, there are some objects that can be used to control the UI. For every browser, a new subfolder will
be created with a random ID. This ID is stored in the client browser's web storage. If you delete the web storage, a new
instance will be created. If you use Fully Kiosk Browser make sure the function `Delete webstorage on reload` is **disabled**.

This functionality uses browser_mod, which is installed and updated by the adapter. Do not add your own version of browser_mod as a custom card.

## Configuration
There are two ways how the entities could be configured:
- auto
- manual

### Auto
In auto mode the similar process will be applied like for `google home` or `material adapter`.

***Only objects and channel will be detected that have `function`and `room` categories defined***

You can define friendly names and this will be used in entities.

### Manual
The objects can be defined manually in an object tree like `sql` or `history`. The type of entity must be provided and optionally the name of object.
With this method only simple entities, like input_number, input_text or input_boolean could be created. It may not have more than one state or attribute.

## Panels
### Alarm panel
ioBroker does not support such a device yet, but it can be simulated. If you create such a script:

```js
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

```json5
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
This can be done manually if `input_select` entity type in custom dialog is selected.
The list of options to select from should be provided in a standard `common.states` object:

```json
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
in other words, there should also be select input in IoB.

### Timer
Timer could be simulated by the following script:

```js
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
Tested with `yr` and `daswetter`. One or more of the following objects must have `Function=Weather` and `Room=Any` set to be available in configuration:
- `daswetter.0.NextDays.Location_1`
- `yr.0.forecast`

Tested with `AccuWeather` driver v1.1.0 https://github.com/iobroker-community-adapters/ioBroker.accuweather.
Custom Lovelace card created in support of accuweather forecast - https://github.com/algar42/IoB.lovelace.accuweather-card

### Shopping list
Shopping list writes the values in form:
```json
[
   {"summary": "Task 1", "uid": "1234222", "status": "needs_action"},
   {"summary": "Task 2", "uid": "1234223", "status": "completed"}
]
```
into `lovelace.X.control.shopping_list` state.

You can also add your own todo or shopping lists by creating manual entities with type `todo`.

### Map
The objects must look like this one:

```js
createState('location', '39.5681295;2.6432632', false, {
    "name": "location",
    "role": "value.gps",
    "type": "string",
    "read": true,
    "write": false,
    "desc": "Gps Coordinates"
});
```

or these two objects:

```js
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
You can use a static picture for it or use any state that delivers URL as a state.
E.g.:

```json
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

or just manually set the entity type to `camera` and write URL into it.

### Markdown
You can use bindings in Markdown like in [iobroker.vis](https://github.com/ioBroker/ioBroker.vis#bindings-of-objects).

E.g., Text `Admin adapter is {a:system.adapter.admin.0.alive;a === true || a === 'true' ? ' ' : 'not '} *alive*.` will produce text `Admin adapter is alive` in a markdown panel.

## Custom cards
### Upload of custom cards
To upload the custom card either use the `Files` tab in Admin, drag & drop in the instance settings or write the following in command line where iobroker is installed:

```iobroker file write PATH_TO_FILE\bignumber-card.js /lovelace.0/cards/```

After restart of lovelace adapter it will include all files from the `cards` directory automatically.

If the card needs additional resources (css or js files), you will have to recreate the folder structure in the `cards` directory and place those files there.
The adapter will detect URLs starting with `/hacsfiles/` and reroute them to the `cards` directory. So if you see `404` errors for URLs including `/hacsfiles/`, then try to adjust the folder structure in the `cards` directory accordingly.

So, for example, if a custom card needs the following file `/hacsfiles/folder1/folder2/file3.json` you need to place it at `/lovelace.0/cards/folder1/folder2/file3.json`.

Often the custom cards are stored on GitHub as sources and must be compiled before use.
You should check the `Releases` menu on GitHub and try to find compiled files there.
Like this one: [https://github.com/kalkih/mini-graph-card/releases](https://github.com/kalkih/mini-graph-card/releases) (Look for the file `mini-graph-card-bundle.js`)

## Own images
The custom images (e.g., for a background) could be loaded via the same configuration dialog like the custom cards. And use it like this:

`background: center / cover no-repeat url("/cards/background.jpg") fixed`

or

`background: center / cover no-repeat url("/local/custom_ui/background.jpg") fixed`

in lovelace configuration file. Read more about the background in lovelace [here](https://www.home-assistant.io/lovelace/views/#background).

## Themes
The themes can be defined in the configuration dialog of ioBroker.
Paste something like:
```yaml
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
Use icons in form `mdi:NAME`, like `mdi:play-network`. Names can be taken from here: https://materialdesignicons.com/

## Notifications
You can add notifications via `sendTo` functionality or by writing the state into `lovelace.X.notifications.add`:

```js
sendTo('lovelace.0', 'send', {message: 'Message text', title: 'Title'}); // full version
sendTo('lovelace.0', 'send', 'Message text'); // short version
```

or

```js
setState('lovelace.0.notifications.add', '{"message": "Message text", "title": "Title"}'); // full version
setState('lovelace.0.notifications.add', 'Message text'); // short version
```

## Voice control
All commands from web interface will be written into lovelace.X.conversation state with `ack=false`.
You can write a script that will react on request and will answer:
```js
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
If that does not help, you can open the object `lovelace.*.configuration` in raw-editor in ioBroker and have a look there.
You can also restore that object from a backup. It contains the complete configuration of your visualization.

## Original sources for lovelace
Used sources are here https://github.com/GermanBluefox/home-assistant-polymer .

## Todo
Security must be taken from the current user and not from default_user

## Development
### Version
Used version of home-assistant-frontend@20250306.0
Version of Browser Mod: 2.3.3

### How to build the new Lovelace version
First of all, the actual https://github.com/home-assistant/frontend (dev branch) must be **manually** merged into https://github.com/GermanBluefox/home-assistant-polymer.git (***iob*** branch!).

All changes for ioBroker are marked with comment `// IoB`.
For now (20250401.0) following files were modified:
- `build-scripts/gulp/app.js` - Add new gulp task develop-iob
- `build-scripts/gulp/rspack.js` - Add new gulp task rspack-dev-app
- `src/data/icons.ts` - keep old icons, for now.
- `src/data/weather.ts` - add support to display weather icon from url.
- `src/dialogs/more-info/const.ts` - remove weather state & history
- `src/dialogs/more-info/ha-more-info-dialog.ts` - remove entity settings button and tab
- `src/dialogs/more-info/ha-more-info-history.ts` - remove `show more` link in history
- `src/dialogs/more-info/ha-more-info-logbook.ts` - remove `show more` link in logbook
- `src/dialogs/more-info/controls/more-info-weather.ts` - add support to display weather icon from url.
- `src/dialogs/voice-command-dialog/ha-voice-command-dialog.ts` - disable configuration of voice assistants
- `src/entrypoints/core.ts` - add no auth option
- `src/panels/lovelace/cards/hui-weather-forecast-card.ts` - add support to display weather icon from url.
- `src/panels/lovelace/entity-rows/hui-weather-entity-row.ts` - add support to display weather icon from url with auth.
- `src/panels/lovelace/hui-root.ts` - added notification button, disable manage dashboards link
- `src/util/documentation-url.ts` - for link to iobroker help instead of home assistant.
- `.husky/pre-commit` - remove git commit hooks.

After that checkout modified version in `./build` folder. Then.

1. go to ./build directory.
2. `git clone https://github.com/GermanBluefox/home-assistant-polymer.git` it is a fork of https://github.com/home-assistant/frontend.git, but some things are modified (see the file list earlier).
3. `cd home-assistant-polymer`
4. `git checkout master`
5. `yarn install`
6. `gulp build-app` for release or `gulp develop-iob` for the debugging version. To build web after changes you can call `webpack-dev-app` for faster build, but you need to call `build-app` anyway after the version is ready for use.
7. run script `hass_frontend/static_cards/newFrontend.sh` in adapter repo to update frontend (it assumes that the two repositories are next to each other in the same folder, if not, please adjust script, preferably with some parameter handling and make a PR, thanks :smile: ) 
8. Run `gulp rename` task.
9. Update the version in `README.md`

## Changelog

<!--
	PLACEHOLDER for the next version:
	### **WORK IN PROGRESS**
-->
### 5.0.4 (2025-12-17)
* (Garfonso) added missing roles to instance objects
* (Garfonso) manual entities should not vanish anymore because of automatic entities
* (Garfonso) add support for cover images from static urls

### 5.0.3 (2025-10-10)
* (Garfonso) make sure only existing themes are selectable in control.theme states.
* (Garfonso) bring back support for frontend_es5.

### 5.0.2 (2025-10-02)
* (Garfonso) some light entities did not restore their proper state on switch on. Fixed.
* (Garfonso) process folders-Objects for auto entities, too. (pirate-weather support)
* (Garfonso) prepare support for effects in light entities (will need new type-detector version).

### 5.0.1 (2025-09-09)
* (Garfonso) settings from entity registry are now loaded on startup
* (Garfonso) logbook: prevent entries from the future
* (Garfonso) icons should now work as before, again.
* (Garfonso) script entities now can be used again.
* (Garfonso) subscribe to all object ids in a template.
* (Garfonso) Update dependencies.

### 5.0.0 (2025-04-10)
* (Garfonso) Updated frontend to 20250401.0
* (Garfonso) Updated browser_mod to 2.3.3
* (Garfonso) Add statistics recorder
* (Garfonso) Add entity registry, use it to solve id clashes. In the future, store entity settings here.
* (Garfonso) Limit the number of stored browser instances
* (Garfonso) Improved caching behavior. Might solve iobroker.pro issue... hopefully?
* (Garfonso) Prevent crash with some edge cases with light entities
* (Garfonso) experimental dashboard support.
* (Garfonso) Allow to show sidebar via object in instances. VERY experimental. A lot of stuff does not yet work. But allows to configure dashboards and also browser mod.

## License

Copyright 2019-2025, bluefox <dogafox@gmail.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
