![Logo](admin/scenes.png)
# ioBroker scenes adapter

![Number of Installations](http://iobroker.live/badges/scenes-installed.svg)
![Number of Installations](http://iobroker.live/badges/scenes-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.scenes.svg)](https://www.npmjs.com/package/iobroker.scenes)

![Test and Release](https://github.com/ioBroker/ioBroker.scenes/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/scenes/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.scenes.svg)](https://www.npmjs.com/package/iobroker.scenes)

_scenes Adapter_ can create scenes and execute them in ioBroker environment.

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

This adapter can create three types of scenes: 
- **scenes**
- **groups**
- **virtual groups**

## Scenes
**Scenes** will be created if setting "set on false" are not used. 
Every scene can be configured individually, so you can have **scenes** and **groups** in one instance of adapter.
The **scene** is just a list of states id and values, that these states must have by activation of the scene. E.g., we have created on the scene `scene.allLightInBath`:

```
  scene.allLightInBath
  |- hm-rpc.0.BOTTOM_LIGHT.STATE  - true
  +- hm-rpc.0.TOP_LIGHT.STATE     - true
```

To activate the scene, we must set `scene.allLightInBath` to true (e.g., over a script or vis). Then both states will be set to desired values, to `true`. 
The value of `scene.allLightInBath` will be `true` too. If we manually switch to the top light, the value of the `scene.allLightInBath` will go to `false`.
And again to `true` if we will manually switch the light on.

Let's add to the **scene** the fan:

```
  scene.allLightInBath
  |- hm-rpc.0.BOTTOM_LIGHT.STATE  - true
  |- hm-rpc.0.TOP_LIGHT.STATE     - true
  |- hm-rpc.0.FAN.STATE          - true
  |- hm-rpc.0.FAN.STATE          - false (delay 60000ms)
```

In this case, the fan will be switched on ba activation of the **scene** and will be switched off in one minute. 
After the fan will be switched off the value of `scene.allLightInBath` will go to `false`, because not all states are equal to desired values. 
States with delay are not participated in calculations.

You can test the scene with a "play" button.
Additionally, you can link this **scene** direct with other scene ID. E.g., if you have a sensor on the door, you can select it as a trigger:

```
  trigger
    id:        hm-rpc.0.DOOR_SENSOR.STATE
    condition: ==
    value:     true
```

And every time you open the door in the bath, all lights with fan will be switched on.

## Groups
**Groups** are like virtual channels. You can create with the help of **groups** virtual device from several actuators and control them together, like one device.
Let's modify our sample with the bath's lights.  

```
  scene.allLightInBath             "set on true"    "set on false" 
  |- hm-rpc.0.BOTTOM_LIGHT.STATE  - true             false
  +- hm-rpc.0.TOP_LIGHT.STATE     - true             false
```

If you link this **group** with the door sensor like:

```
  trigger on true
    id:        hm-rpc.0.DOOR_SENSOR.STATE
    condition: ==
    value:     true

  trigger on false
    id:        hm-rpc.0.DOOR_SENSOR.STATE
    condition: ==
    value:     false
```

Every time you open the door, all lights in a bath will be switched on. The value of the `scene.allLightInBath` will go to **true**.
If you close the door, the lights will be switched off, and the value of `scene.allLightInBath` will go to **false**. 

It is useless, but it is good as an example.

If you manually switch on one light, the value of the `scene.allLightInBath` will go to **uncertain**.

Delays can be used in the **group** too, but the states with delay are not participated in calculations of the current value of **group**.

## Virtual groups
**Virtual groups** are like virtual channels and like groups, but can have any kind of values: numbers, strings, and so on. 
You can create a virtual group to control all shutters in the living room. 
By writing 40% into a virtual group, all shutters will be set to 40%.

Additionally, you can define the behavior for which value should be taken for the group if not all states of the group have the same value.

You can provide the following aggregations (available only in advanced mode):
- `uncertain` - (default) - the value of the group will have text `uncertain`.
- `any` - first non-zero value of all states in a group.
- `min` - minimal value of all states in a group.
- `max` - maximal value of all states in a group.
- `avg` - average value of all states in a group.

## Members from categories (rooms and functions)
Instead of single states, you can add all devices of a room and/or a function as one member of a scene.
The list of devices is calculated at the start of the adapter, so new devices in this room or function are taken automatically.

With the "Name filter (RegEx)" you can take only some devices of the category. 
The filter is a case-insensitive regular expression, that is checked against the ID and the names (in all languages) of the devices.
E.g., the filter `left` takes from the room "Kitchen" only the bulbs `CL left 01` ... `CL left 05`, and the filter `^CL (left|right) 0[1-3]$` only the first three bulbs of both lamps.

## Save actual states as a scene
To save actual states in some scene, you can send a message to the adapter:
```js
sendTo(
    'scenes.0', 
    'save', 
    {sceneId: 
        'scene.0.SCENE_ID', // scene ID 
        isForTrue: true     // true if actual values must be saved for `true` state and `false` if for false 
    }, 
    result => result.err && console.error(result.error) // optional
);
```
The adapter will read all actual values for IDs defined in this scene and save it as configured ones.
## Disable or enable a scene via a message
To disable or enable some scene, you can send a message to the adapter:
```js
// enable
sendTo(
    'scenes.0', 
    'enable', 
    'scene.0.SCENE_ID', 
    result => result.err && console.error(result.error) // optional
);
// disable
sendTo(
    'scenes.0', 
    'disable', 
    'scene.0.SCENE_ID', 
    result => result.err && console.error(result.error) // optional
);
// or
sendTo(
    'scenes.0', 
    'disable', // 'enable' to enable
    {sceneId: 'scene.0.SCENE_ID'}, 
    result => result.err && console.error(result.error) // optional
);
```

## Stop a running scene
If a scene has members with a delay or a burst interval, it runs for some time. To stop it, write `stop` into the scene state (e.g., from vis or a script):
```js
setState('scene.0.SCENE_ID', 'stop');
```
or send a message to the adapter:
```js
sendTo(
    'scenes.0', 
    'stop', 
    'scene.0.SCENE_ID', 
    result => result.error ? console.error(result.error) : console.log(result.result) // optional
);
```
All delayed commands of this scene, which are not yet executed, will be cancelled. The values, that were already written, stay unchanged and the scene keeps its value.
Virtual groups are not stopped by writing `stop`, they forward this value to their members as usual.

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 5.2.0 (2026-10-24)
* (reloxx13) Recognize uppercase and mixed-case boolean scene commands, so nested scenes receive FALSE correctly (#475)
* (@GermanBluefox) The state of a scene, that controls other scenes with "TRUE"/"FALSE", is now detected correctly and is not "uncertain" anymore (#475)
* (@GermanBluefox) Scenes as members of another scene now get the TRUE/FALSE selector, so the desired values are stored as booleans (#475)
* (@GermanBluefox) A scene, whose members match TRUE and FALSE at the same time, does not jump from FALSE to TRUE anymore (#267)
* (@GermanBluefox) The search in the scene list is now case-insensitive (#364)
* (@GermanBluefox) Updated "@iobroker/testing" to 6.3.1 and removed the direct "mocha" dependency
* (@GermanBluefox) A running scene can be stopped by writing "stop" into the scene state or with the message "stop". All delayed commands of the scene are cancelled (#42)
* (@GermanBluefox) Added the name filter (regular expression) for members from categories, e.g., to take only some lamps of a room (#457)

### 5.1.0 (2026-09-03)
* (@GermanBluefox) Added the option "Only on change" for the triggers, so a state that is written again with the same value does not activate the scene anymore. It is enabled by default and can be switched off for every trigger
* (@GermanBluefox) The trigger value is now selected from a list if the trigger state is boolean or has "common.states"
* (@GermanBluefox) Added the loop protection: if a scene is activated too often in a short time, it will be disabled automatically

### 5.0.2 (2026-08-08)
* (ioBroker-Bot) Adapter requires js-controller >= 6.0.11 now.
* (@SimonFischer04) Corrected the virtual group aggregation for the "any" mode
* (@SimonFischer04) Added "sum" as a virtual group function

### 5.0.1 (2026-08-06)
* (@GermanBluefox) Updated packages
* (@GermanBluefox) Added widget for "devices" adapter
* (@GermanBluefox) GUI migrated to React 19 + MUI 9

### 4.0.4 (2025-10-20)
* (@GermanBluefox) Corrected the selection of multiple IDs in the scene editor

## License
The MIT License (MIT)

Copyright (c) 2015-2026, Bluefox (dogafox@gmail.com)

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