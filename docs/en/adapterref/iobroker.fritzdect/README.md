![Logo](admin/fritzdect_logo.png)

# ioBroker.fritzdect

[![NPM version](http://img.shields.io/npm/v/iobroker.fritzdect.svg)](https://www.npmjs.com/package/iobroker.fritzdect)
[![Downloads](https://img.shields.io/npm/dm/iobroker.fritzdect.svg)](https://www.npmjs.com/package/iobroker.fritzdect)
![Number of Installations (latest)](http://iobroker.live/badges/fritzdect-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/fritzdect-stable.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/foxthefox/ioBroker.fritzdect/badge.svg)](https://snyk.io/test/github/foxthefox/ioBroker.fritzdect)

**Tests:** ![Test and Release](https://github.com/foxthefox/ioBroker.fritzdect/workflows/Test%20and%20Release/badge.svg)

Fritzbox DECT adapter for ioBroker

## Setup

IP-address and password of Fritzbox should be defined via admin page, before the first start of the instance.
The IP-address must be written with leading 'http://'

The devices are detected automatically during startup of fritzdect instance. If devices are added to the fritzbox during a running adapter instance, then please restart the adapter for object creation.

Several permissions have to be set in the fritzbox in order to interact with the adapter!

If the polling interval is set to 0 in the adapter configuration, automatic cyclic polling is disabled and updates are performed only on demand (via the `update` command).

A german explanatory doc is available here: [install_de](./docs/de/install.md)

The widget requires that also vis-metro and vis-jqui-mfd are installed

## Common Issues / Frequently Asked Questions

1.  Fritzbox returned '00000000' no login possible. possible reasons:

    The fritzbox allows only a limited number of logins in a timeframe.
    There are no appropriate user rights set in the fritzbox.
    There is a time elapsing in the fritzbox blocking the logins.
    A german doc is available here: [troubleshooting](./docs/de/troubleshooting.md)

2.  using https would result in:

          { error: { [Error: self signed certificate] code: 'DEPTH_ZERO_SELF_SIGNED_CERT' }

    to overcome this, the option "rejectUnauthorized: false" is used in the https.request.

## Thermostat

### Fritzbox AHA API

The API of fritzbox has the following access:

- sethkrtsoll
    - 8-28°C for automatic control
    - greater 28°C (254=ON)
    - greater 28°C (253=OFF)

These settings are covered by the hkrmode and the 3 buttons. The activation lasts as long there is no other command or programmed sequence.

Additionally there is the access to:

- windowopenactiv
- boostactive

These are indications as well as commands (sethkrwindowopen,sethkrboost) and when commanded they act with the provided time limit (max. 24h).
For activation of boost/windowopen the following sequence applies:

- set the activetime to the desired value in minutes
- activate the activ (from false -> true)
- the acteendtime changes to the target
  For deactivation of boost/windowopen the following sequence applies:
- deactivate the activ (from true -> false)
- the acteendtime changes to unixtime=0

### fritzdect implementation

From the above API possibilities the thermostat has different modes in point of view of iobroker.adapter:

- auto (temperature control), to be set by hkrmode (0) or button "setmodeauto" -> the tsoll value will be used!
- night if tsoll = absenk
- comfort if tsoll = komfort
- on (full open), to be set by hkrmode (1) or button "setmodeon"
- off (full close), to be set by hkrmode (2) or button "setmodeoff"
- boost (full open for limited time), detected by feedback boostactive, can be set by boostactive (false->true)
- windowopen (full closed for defined time), detected by feedback windowopenactiv, can be set be windowopenactiv (false->true)
- holiday (temp control), detected by holidayactive
- summer (temp control), detected by summeractive

## ioBroker objects

objects in _italic_ are not part of all fritz.box configurations
objects in **bold** are datapoints from the adapter

The datapoints are created on the basis of the returned values of the Fritz AHA API. All groups or devices start wirth "DECT\_".

### devices or groups

| Object                     | Value   |        settable        | Description                                   | DECT2x0 | DECT3x0 | DECT400 | DECT440 | DECT500 | Blinds | Contact |
| -------------------------- | ------- | :--------------------: | --------------------------------------------- | ------- | ------- | ------- | ------- | ------- | ------ | ------- |
| id                         | text    |           -            | internal id of device                         | DECT2x0 | DECT3x0 | DECT400 | DECT440 | DECT500 | Blinds | Contact |
| name                       | text    |           -            | name of device                                | DECT2x0 | DECT3x0 | DECT400 | DECT440 | DECT500 | Blinds | Contact |
| productname                | text    |           -            | product name                                  | DECT2x0 | DECT3x0 | DECT400 | DECT440 | DECT500 | Blinds | Contact |
| manufacturer               | text    |           -            | product manufacturer                          | DECT2x0 | DECT3x0 | DECT400 | DECT440 | DECT500 | Blinds | Contact |
| fwversion                  | text    |           -            | product FW version                            | DECT2x0 | DECT3x0 | DECT400 | DECT440 | DECT500 | Blinds | Contact |
| mode                       | text    |           -            | mode, manuell or auto                         | DECT2x0 | DECT3x0 |         |         |         |        |         |
| present                    | boolean |           -            | true/false -> connected/not available         | DECT2x0 | DECT3x0 | DECT400 | DECT440 | DECT500 | Blinds | Contact |
| _txbusy_                   | boolean |           -            | true/false -> cmd sending active/not active   | DECT2x0 | DECT3x0 | DECT400 | DECT440 | DECT500 | Blinds | Contact |
| _batterylow_               | boolean |           -            | battery status                                |         | DECT3x0 | DECT400 | DECT440 |         |        | Contact |
| _battery_                  | number  |           -            | actual capacity in %                          |         | DECT3x0 | DECT400 | DECT440 |         |        | Contact |
| state                      | boolean |          -/x           | true/false                                    | DECT2x0 |         |         |         | DECT500 | Blinds | Contact |
| power                      | number  |           -            | actual power in W                             | DECT2x0 |         |         |         |         |        |         |
| energy                     | number  |           -            | actual energy consumption in Wh               | DECT2x0 |         |         |         |         |        |         |
| _voltage_                  | number  |           -            | actual voltage in V                           | DECT2x0 |         |         |         |         |        |         |
| lock                       | boolean |           -            | UI/API lock                                   | DECT2x0 | DECT3x0 |         |         |         |        |         |
| devicelock                 | boolean |           -            | Button lock                                   | DECT2x0 | DECT3x0 |         |         |         |        |         |
| _celsius_                  | number  |           -            | actual temperature in °C                      | DECT2x0 | DECT3x0 |         | DECT440 |         |        |         |
| _offset_                   | number  |           -            | offset temperature in °C                      | DECT2x0 | DECT3x0 |         | DECT440 |         |        |         |
| _rel_humidity_             | number  |           -            | relative humidity %                           |         |         |         | DECT440 |         |        |         |
| tist                       | number  |           -            | actual temperature in °C                      |         | DECT3x0 |         |         |         |        |         |
| tsoll                      | number  |           x            | target temperature in °C                      |         | DECT3x0 |         |         |         |        |         |
| komfort                    | number  |           -            | comfort temperature in °C                     |         | DECT3x0 |         |         |         |        |         |
| absenk                     | number  |           -            | night temperature in °C                       |         | DECT3x0 |         |         |         |        |         |
| **hkrmode**                | array   |           x            | 0=AUTO/1=OFF/2=ON state of thermostat         |         | DECT3x0 |         |         |         |        |         |
| **lasttarget**             | number  |           -            | last target temperature in °C                 |         | DECT3x0 |         |         |         |        |         |
| errorcode                  | number  |           -            | errorcode                                     |         | DECT3x0 |         |         |         |        |         |
| **operationList**          | number- | list of possible modes |                                               | DECT3x0 |         |         |         |         |        |
| **operationMode**          | number  |           -            | actual mode                                   |         | DECT3x0 |         |         |         |        |         |
| _windowopenendtime_        | time    |           -            | time when open window status ends             |         | DECT3x0 |         |         |         |        |         |
| _windowopenactiv_          | boolean |           x            | status and cmd of window open detection       |         | DECT3x0 |         |         |         |        |         |
| **windowopenactivtime**    | number  |           x            | time (minutes) when activation of window open |         | DECT3x0 |         |         |         |        |         |
| _boostactive_              | boolean |           x            | boost mode active status and cmd              |         | DECT3x0 |         |         |         |        |         |
| _boostactiveendtime_       | time    |           -            | time when boost status ends                   |         | DECT3x0 |         |         |         |        |         |
| **boostactivtime**         | number  |           x            | time (minutes) when activation of boost       |         | DECT3x0 |         |         |         |        |         |
| **adaptiveHeatingRunning** | boolean |           -            | adaptive heating status                       |         | DECT3x0 |         |         |         |        |         |
| **adaptiveHeatingActive**  | boolean |           x            | adaptive heating cmd                          |         | DECT3x0 |         |         |         |        |         |
| **setmodeauto**            | number  |           x            | set Auto                                      |         | DECT3x0 |         |         |         |        |         |
| **setmodeon**              | number  |           x            | set On                                        |         | DECT3x0 |         |         |         |        |         |
| **setmodeoff**             | number  |           x            | set Off                                       |         | DECT3x0 |         |         |         |        |         |
| _summeractive_             | boolean |           -            | summer program status                         |         | DECT3x0 |         |         |         |        |         |
| _holidayactive_            | boolean |           -            | holiday program status                        |         | DECT3x0 |         |         |         |        |         |
| _tchange_                  | number  |           -            | temp with next change in °C                   |         | DECT3x0 |         |         |         |        |         |
| _endperiod_                | time    |           -            | time when next change is active               |         | DECT3x0 |         |         |         |        |         |
| supported_modes            | number  |           -            | supported colormodes                          |         |         |         |         | DECT500 |        |         |
| _fullcolorsupport_         | boolean |           -            | fullcolorsupport                              |         |         |         |         | DECT500 |        |         |
| _mapped_                   | boolean |           -            | indication mapped                             |         |         |         |         | DECT500 |        |         |
| _unmapped_hue_             | number  |           -            | unmapped hue value                            |         |         |         |         | DECT500 |        |         |
| _unmapped_saturation_      | number  |           -            | unmapped saturation value                     |         |         |         |         | DECT500 |        |         |
| current_mode               | number  |           -            | actual colormode                              |         |         |         |         | DECT500 |        |         |
| level                      | number  |           x            | level 0-255                                   |         |         |         |         | DECT500 | Blinds |         |
| levelpercentage            | number  |           x            | level 0-100 %                                 |         |         |         |         | DECT500 | Blinds |         |
| hue                        | number  |           x            | color 0-359                                   |         |         |         |         | DECT500 |        |         |
| saturation                 | number  |           x            | saturation 0-100                              |         |         |         |         | DECT500 |        |         |
| temperature                | number  |           x            | color temperature (white mode)                |         |         |         |         | DECT500 |        |         |
| lastpressedtimestamp       | time    |           -            | timestamp                                     |         |         | DECT400 | DECT440 |         |        | Contact |
| **blindsopen**             | booelan |           x            | target open                                   |         |         |         |         |         | Blinds |         |
| **blindsclose**            | boolean |           x            | target close                                  |         |         |         |         |         | Blinds |         |
| **blindsstop**             | boolean |           x            | target stop                                   |         |         |         |         |         | Blinds |         |
| lastalertchgtimestamp      | time    |           -            | timestamp                                     |         |         |         |         |         | Blinds |         |
| _enpositionsset_           | boolean |           -            | status configuration                          |         |         |         |         |         | Blinds |         |
| _mode_                     | text    |           -            | modus                                         |         |         |         |         |         | Blinds |         |

### stats (part of device)

| Object   | Value  | settable | Description                       |
| -------- | ------ | :------: | --------------------------------- |
| count    | number |    -     | count of the values in array      |
| grid     | number |    -     | time between values in array in s |
| datatime | number |    -     | reference timestamp for array     |
| stats    | array  |    -     | array of values                   |

Above is available for power and voltage.
Additional the energy has monthly and daily array and their belonging descriptive data.
Furthermore for energy the array values are summed up for:

- today
- last 31 days
- month to date
- last 12 month
- year to date

### groups

| Object         | Value   | settable | Description                   |
| -------------- | ------- | :------: | ----------------------------- |
| masterdeviceid | text    |    -     | internal id of group          |
| members        | text    |    -     | member id's of group          |
| masterdeviceid | boolean |    -     | cmd sending active            |
| synchronized   | boolean |    -     | devices of group are synchron |

### templates

| Object       | Value   | settable | Description                           |
| ------------ | ------- | :------: | ------------------------------------- |
| toggle       | boolean |    x     | toggle switch for template activation |
| lasttemplate | text    |    -     | last confirmed template               |

### routines

| Object | Value   | settable | Description                          |
| ------ | ------- | :------: | ------------------------------------ |
| active | boolean |    x     | toggle switch for routine activation |

## Manual Update

It is possible to trigger a manual update, for example between polling intervals or when polling is disabled.
To do this, send a message with the text "update" and no parameters to the adapter instance.
The optional callback will be executed once the update is complete.

Below is an example demonstrating how to trigger the manual update:

```javascript
sendTo('fritzdect.0', 'update', null, e => {
    if (e['result']) {
        // update successful
    } else {
        console.log(e['error']);
    }
});
```

## API limitations

- Boost and WindowOpen can only be set for the next 24h. time=0 is cancelling the command
- updates to the thermostat are within a 15min range, depending on the previous communication of thermostat with fritzbox the next cycle is sooner or later, but definitely not imediately after an ioBroker intervention
- if a windowopenactiv is set on a thermostat, which is part of a group, then the whole group and its thermostats is set to windowopenactiv (function inside the FB)
- only a few color temperatures are accepted (mapped already be the API to valid ones)
- only the predefined colors are valid combinations (getcolordefaults)

## Write only on changes to the objects

This is a new feature to write only the changes to the objects. It reduces the logging and might be useful.
If it is activated, a different feedback must be present to the actual state. Introducing a hysteresis makes not really practicable:

- if temperatures have a change, it is a change and the 0.5° step does not need a threshold
- values which are increasing over time would need an absolut threshold and not in %
- values scaled to 100 are transmitted in steps of 1, so a threshold of 1% is capturing the same steps
  otherwise it is more complex and individually to be parametrized.

## 3rd party devices (HAN-FUN, ZigBee)

These devices are split into a device and an unit (the function itself). The device has usually no interactions and therefore is not created in the adapter. The information portion and datapoints (i.e. battery status) of the device is merged into the unit. The id shown in the adapter belongs to the unit (which is not shown in the FB-App).

## Known Adapter Limitations:

- Not all FW-versions of fritz.box support all objects.
- use exclude possibility in adapter config, to disable communication related to newer functions
- some datapoints are unavailable in newer FB-FW-versions (i.e. buttons of DECT440)

## TODO:

- map of data input from user to valid predefined colors (nearest match)
- blind alert state -> decode bit array

## Changelog

### 2.6.4 (WIP)

- new IKEA lamp commands issue #625
- object corrections

### 2.6.3 (npm)

- update to comply with repo checker

## License

The MIT License (MIT)

Copyright (c) 2018-2026 foxthefox <foxthefox@wysiwis.net>
