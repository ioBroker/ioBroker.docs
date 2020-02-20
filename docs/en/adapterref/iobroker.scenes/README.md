![Logo](admin/scenes.png)
# ioBroker scenes adapter

![Number of Installations](http://iobroker.live/badges/scenes-installed.svg) ![Number of Installations](http://iobroker.live/badges/scenes-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.scenes.svg)](https://www.npmjs.com/package/iobroker.scenes)
[![Downloads](https://img.shields.io/npm/dm/iobroker.scenes.svg)](https://www.npmjs.com/package/iobroker.scenes)

[![NPM](https://nodei.co/npm/iobroker.scenes.png?downloads=true)](https://nodei.co/npm/iobroker.scenes/)

_scenes Adapter_ can create scenes and execute them in ioBroker environment.

This adapter can create three types of scenes: 
- **scenes**
- **groups**
- **virtual groups**

## Scenes
**Scenes** will be created if setting "set on false" are not used. 
Every scene can be configured individually, so you can have **scenes** and **groups** in one instance of adapter.
The **scene** is just list of states id and values, that these states must have by activation of the scene. E.g. we have created on scene "_scene.allLightInBath_":

```
  scene.allLightInBath
  |- hm-rpc.0.BOTTOM_LIGHT.STATE  - true
  +- hm-rpc.0.TOP_LIGHT.STATE     - true
```

To activate scene we must set "_scene.allLightInBath_" to true (e.g over script or vis). Then both states will be set to desired values, to **true**. 
The value of _scene.allLightInBath_ will be **true** too. If we manually switch of the top light the value of the _scene.allLightInBath_ will go to **false**.
And again to **true** if we will switch manually the light on.

Let's add to the **scene** the fan:

```
  scene.allLightInBath
  |- hm-rpc.0.BOTTOM_LIGHT.STATE  - true
  |- hm-rpc.0.TOP_LIGHT.STATE     - true
  |- hm-rpc.0.FAN.STATE          - true
  |- hm-rpc.0.FAN.STATE          - false (delay 60000ms)
```

In this case the fan will be switched on ba activation of the **scene** and will be switched off in one minute. 
After the fan will be switched off the value of _scene.allLightInBath_ will go to **false**, because not all states are equal to desired values. 
States with delay are not participate in calculations.

You can test the scene with a "play" button.
Additionally you can link this **scene** direct with other scene ID. E.g if you have a sensor on the door you can select it as a trigger:

```
  trigger
    id:        hm-rpc.0.DOOR_SENSOR.STATE
    condition: ==
    value:     true
```

And every time you will open the door in the bath all lights with fan will be switched on.

## Groups
**Groups** are like virtual channels. You can create with the help of **groups** virtual device from several actuators and control them together, like one device.
Let's modify our sample with bath's lights.  

```
  scene.allLightInBath             "set on true"    "set on false" 
  |- hm-rpc.0.BOTTOM_LIGHT.STATE  - true             false
  +- hm-rpc.0.TOP_LIGHT.STATE     - true             false
```

If you will link this **group** with the door sensor like:

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

Every time you will open the door all lights in a bath will be switched on. The value of the _scene.allLightInBath_ will go to **true**.
If you will close the door the lights will be switched off. And the value of _scene.allLightInBath_ will go to **false**. 

It is useless, but it is good as an example.

If you will manually switch on one light, the value of the _scene.allLightInBath_ will go to **uncertain**.

Delays can be used in the **group** too, but the states with delay are not participate in calculations of the current value of **group**.

## Virtual groups
**Virtual groups** are like virtual channels and like groups, but can have any kind of values: numbers, strings and so on. 
You can create virtual group to control all shutters in living room. By writing 40% into virtual group all shutters will be set to 40%. 

## Save actual states as scene
To save actual states in some scene you can send a message to the adapter:
```
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

## Changelog
### 1.1.1 (2019-05-26)
* (bluefox)Added storing of actual values in scene via message

### 1.1.0 (2018-04-24)
* (bluefox) Works now with Admin3

### 1.0.2 (2018-01-21)
* (bluefox) use new select ID dialog
* (DeepCoreSystem) translations
* (paul53) text fixes

### 1.0.0 (2017-11-11)
* (bluefox) fix false scenes

### 0.2.7 (2017-08-14)
* (bluefox) Support of iobroker.pro

### 0.2.6 (2016-06-21)
* (bluefox) add read/write settings to scene object

### 0.2.5 (2016-02-03)
* (bluefox) update node-schedule

### 0.2.4 (2016-01-24)
* (bluefox) fix error disabled states in scene

### 0.2.3 (2015-12-10)
* (bluefox) fix error with trigger on false

### 0.2.2 (2015-11-22)
* (bluefox) fix error with restart adapter

### 0.2.1 (2015-10-27)
* (bluefox) delete triggers if virtual groups enabled

### 0.2.0 (2015-10-27)
* (bluefox) support of virtual groups

### 0.1.3 (2015-09-19)
* (bluefox) show set value if 0 or false in settings

### 0.1.2 (2015-08-15)
* (bluefox) add translations
* (bluefox) try to fix error by renaming

### 0.1.1 (2015-08-10)
* (bluefox) allow description for states in scene
* (bluefox) check by rename if the scene with the same name yet exists
* (bluefox) allow copy scene
* (bluefox) fix error with delay and stopAllDelays settings

### 0.1.0 (2015-08-09)
* (bluefox) fix error with delays and config change
* (bluefox) implement replace 

### 0.0.2 (2015-08-05)
* (bluefox) change configuration schema
* (bluefox) add cron
* (bluefox) add burst interval

### 0.0.1 (2015-07-29)
* (bluefox) initial commit
