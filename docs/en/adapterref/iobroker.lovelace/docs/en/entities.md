---
chapters: {"pages":{"en/adapterref/iobroker.lovelace/README.md":{"title":{"en":"ioBroker.lovelace"},"content":"en/adapterref/iobroker.lovelace/README.md"},"en/adapterref/iobroker.lovelace/docs/en/README.md":{"title":{"en":"ioBroker.lovelace — Documentation"},"content":"en/adapterref/iobroker.lovelace/docs/en/README.md"},"en/adapterref/iobroker.lovelace/docs/en/entities.md":{"title":{"en":"Entities"},"content":"en/adapterref/iobroker.lovelace/docs/en/entities.md"},"en/adapterref/iobroker.lovelace/docs/en/cards_and_ui.md":{"title":{"en":"Custom cards, themes & UI tips"},"content":"en/adapterref/iobroker.lovelace/docs/en/cards_and_ui.md"},"en/adapterref/iobroker.lovelace/docs/en/features.md":{"title":{"en":"Features"},"content":"en/adapterref/iobroker.lovelace/docs/en/features.md"},"en/adapterref/iobroker.lovelace/docs/en/theme_migration.md":{"title":{"en":"Migrating themes (2026 frontend update)"},"content":"en/adapterref/iobroker.lovelace/docs/en/theme_migration.md"}}}
---
![Logo](../../admin/lovelace.png)
# Entities

There are two ways to turn ioBroker objects into Home Assistant `entities`:
1. [Automatic detection](#automatic-detection) (preferred)
2. [Manual configuration](#manual-configuration)

Below you also find the [supported entity types](#supported-entity-types) and some [special entities](#special-entities) (alarm, timer, weather, map, …).

## Automatic detection
This is always the preferred way, when possible. Detection uses the ioBroker library `type-detector`, which is also used by other adapters such as `iot` or `material`. So if your devices are configured cleanly for one of those adapters, several of them benefit at once.

There is also a UI for the `type-detector`: the [devices adapter](https://github.com/iobroker/iobroker.devices). It is strongly recommended to install it and enable its tab in Admin — all detected devices show up there and can potentially be used in Lovelace.

![Devices adapter](../de/media/devices-overview.JPG)

For detection it is important that the states of a device have the right roles and types (number, string, boolean, …). If that is not the case for one of your devices, build a device with the alias function of the js-controller. The easiest way is again the *devices tab* in Admin: there you can pick an existing object for each state of a device, and the roles and other properties are set correctly on the alias so detection works.

After the folder, type, room and function are set, the individual states are assigned like this:
![State configuration](../de/media/devices-create.JPG)

Lovelace detects every device shown in the devices tab that has **both** a room **and** a function assigned. Devices missing one of the two are ignored.

In the instance settings you can see for more complex objects that several states are combined into one `entity`, for example:
![Light entity](../de/media/light-entity.JPG)

This is a light (`light`) supporting colour, colour temperature and dimming — 4 ioBroker states in one object.

## Manual configuration
In the object view (the `custom` settings of an ioBroker object) Lovelace can be enabled for individual objects. You set the entity `domain` (`light`, `input_boolean`, …) and a name.

Simple single-state entities (e.g. `input_number`, `input_text`, `input_boolean`) work directly. In addition, multi-state entities can be configured via object pickers in the custom dialog — e.g. a `cover` (such as an automatic window), `device_tracker` and `person`. For those types you pick the ioBroker states for each role (e.g. cover `SET`/`ACTUAL`/`OPEN`/`CLOSE`/`STOP`, or tracker presence / GPS) and the adapter reuses the full entity logic.

For complex devices (e.g. lights with dimming and colour) the automatic detection is strongly recommended. Also for (binary) sensors prefer automatic detection: the `device_class` attribute is then filled and the presentation fits the device better (e.g. a binary sensor of type "door" is shown as "door" and on/off is translated to open/closed).

#### Where to enable the settings, and what the entity state is
For **simple** single-state types (`input_number`, `input_text`, `input_boolean`, `input_select`, `switch`, `sensor`, `binary_sensor`, `camera`, `timer`, `alarm_control_panel`) enable the custom settings **on the state itself** — that object's value *is* the entity state.

For the **multi-state** types you pick the ioBroker states per role in the custom dialog. The object you enable the settings on is only the **anchor** (it gives the entity its id and friendly name); its own value is **not** read — map every functional state with the pickers. So you can put the settings on any one of the device's states (e.g. the target-temperature state of a thermostat).

`SET` is always the **target** value (a setpoint, a cover level), not the entity state. The entity state (the main value shown on the card) per type:

| Domain | Picker roles | Entity state |
|---|---|---|
| `light` | `ON` (on/off), `ON_ACTUAL`, `DIMMER` (brightness), `TEMPERATURE` (colour temp), `RGB`, `HUE`, `SATURATION`, `EFFECT` | `on` / `off` |
| `cover` | `SET` (level), `ACTUAL`, `OPEN`/`CLOSE`/`STOP`, `TILT_SET`/`TILT_ACTUAL` | `open` / `closed` / `opening` / `closing` |
| `climate` | `SET` (target temp), `ACTUAL` (current temp), `MODE` (HVAC mode), `POWER` (on/off), `HUMIDITY`, `SPEED`, `SWING`, `BOOST`, `PARTY`; a *Heating/cooling* choice appears when no `MODE` is mapped | the HVAC mode: `heat` / `cool` / `off` |
| `lock` | `SET` (lock/unlock), `ACTUAL`, `OPEN` (latch) | `locked` / `unlocked` |
| `media_player` | `STATE`, `POWER`, `PLAY`/`PAUSE`/`STOP`/`NEXT`/`PREV`, `VOLUME`/`VOLUME_ACTUAL`/`MUTE`, `SEEK`/`REPEAT`/`SHUFFLE`, `TITLE`/`ARTIST`/`COVER`/`DURATION`/`ELAPSED` | `playing` / `paused` / `idle` |
| `vacuum` | `STATE` (status), `POWER` (start/stop), `PAUSE`, `BATTERY`, `WORK_MODE` (fan speed) | `cleaning` / `docked` / `paused` / `returning` / `idle` / `error` |
| `humidifier` | `POWER` (on/off), `SET` (target humidity), `ACTUAL` (current humidity), `MODE` | `on` / `off` |
| `water_heater` | `SET` (target temp), `ACTUAL` (current temp), `POWER` (on/off), `MODE` (operation) | the operation mode |
| `device_tracker` / `person` | presence, GPS (`"lat;lon"` or separate latitude/longitude), GPS accuracy, battery, picture (URL or state), source type | `home` / `not_home` / a zone name |

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
                "name": "simulateAlarm" // entity name -> "alarm_control_panel.simulateAlarm"
            }
        }
    },
    {
        "alarm_code": 1234 // alarm code that must be entered
    },
    function () {
        on({id: 'javascript.' + instance + '.alarmSimple', change: 'any'}, function (obj) {
            console.log('Control here the real device: ' + obj.state.val);
        });
    }
);
```

or you just use `lovelace.X.control.alarm (entity_id = alarm_control_panel.defaultAlarm)`.

### Number input
Select the `input_number` entity type in the custom dialog. It requires `min` and `max` in `common`; an optional `step` can be added. For up/down arrows instead of a slider set `mode` to `number`:

```json5
common: {
    custom: {
        "lovelace.0": {
            "enabled": true,
            "entity": "input_number",
            "name": "Shutter", // entity name -> "input_number.Shutter"
            "mode": "number" // default presentation is slider
        }
    }
}
```

### Select input
Select the `input_select` entity type in the custom dialog. The list of options comes from the standard `common.states` object:

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

### Timer
A timer can be simulated with the following script:

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
                "name": "simulateTimer" // entity name -> "timer.simulateTimer"
            }
        }
    },
    {},
    function () {
        let interval;
        let id = 'javascript.' + instance + '.timerSimple';
        on({id, change: 'any'}, function (obj) {
            if (!obj.state.ack) {
                if (obj.state.val) {
                    if (obj.state.val === obj.oldState.val) {
                        if (interval) {
                            setState(id, state.val, true);
                            clearInterval(interval);
                            interval = null;
                        } else {
                            interval = setInterval(() => {
                                getState(id, (err, state) => {
                                    state.val--;
                                    if (state.val <= 0) { clearInterval(interval); interval = null; state.val = 0; }
                                    setState(id, state.val, true);
                                });
                            }, 1000);
                        }
                    } else {
                        interval && clearInterval(interval);
                        interval = setInterval(() => {
                            getState(id, (err, state) => {
                                state.val--;
                                if (state.val <= 0) { clearInterval(interval); interval = null; state.val = 0; }
                                setState(id, state.val, true);
                            });
                        }, 1000);
                    }
                } else {
                    interval && clearInterval(interval);
                    interval = null;
                }
            }
        });
        setTimeout(() => setState(id, 20));
    }
);
```

## Supported entity types
The following entity types are created by the adapter or can be configured manually. Given is the `domain` (the part the entity_id starts with, e.g. `light` for `light.kitchen`) and the ioBroker devices that lead to this entity on automatic detection.

### Light
Domain: `light`

ioBroker devices: Light (`light`), Dimmer (`dimmer`), colour temperature (`ct`), RGB light (`rgb`), RGB single (`rgbSingle`), HUE light (`hue`).

ioBroker sorts lamps into several device classes depending on their capabilities — three of them for coloured light (`rgb`, `rgbSingle`, `hue`), optionally with dimmer / colour temperature. The class with the most capabilities is used. Manual configuration currently only supports on/off and optionally dimming; lights with the extended capabilities require automatic detection.

![Light entity](../de/media/light-entity.JPG)
![Light entity in Lovelace](../de/media/light-entity-lovelace.JPG)

### Sensors
Domain: `sensor`

ioBroker devices: window tilt (`windowTilt`), humidity (`humidity`), temperature (`temperature`).

Although sensors usually consist of a single ioBroker state (so manual configuration would work), automatic detection is still recommended so the `device_class` attribute is filled and Lovelace sets the correct icon and unit.

### Climate
Domain: `climate`

ioBroker devices: thermostat (`thermostat`), air condition (`airCondition`).

![Climate card](../de/media/climate-entity-full.JPG)

Temperature is controlled in Lovelace via a round slider. Below it, buttons select the mode (only for known modes). Modes are mapped to numbers via `states` in the ioBroker state. Lovelace knows `auto`, `heat`, `cool`, `heat_cool`, `dry`, `fan_only` and `off`; these are shown as translated buttons. Other states are shown as a dropdown in the more-info dialog, which also has dropdowns for presets (if `boost` or `party` exist in the ioBroker device) and fan / swing if detected (their states are shown 1:1).

![Climate more info](../de/media/climate-entity-full-moreinfo.JPG)
![Climate attributes](../de/media/climate-entity-full-attributes.JPG)

## Special entities

### Weather
Tested with `yr` and `daswetter`. One or more of the following objects must have `Function=Weather` and `Room=Any` set to be available in configuration:
- `daswetter.0.NextDays.Location_1`
- `yr.0.forecast`

Tested with the `AccuWeather` driver v1.1.0 (https://github.com/iobroker-community-adapters/ioBroker.accuweather). Custom Lovelace card in support of accuweather forecast: https://github.com/algar42/IoB.lovelace.accuweather-card

### Shopping list
The shopping list writes its values into the `lovelace.X.control.shopping_list` state in this form:
```json
[
   {"summary": "Task 1", "uid": "1234222", "status": "needs_action"},
   {"summary": "Task 2", "uid": "1234223", "status": "completed"}
]
```
You can also add your own todo or shopping lists by creating manual entities with type `todo`.

### Map / presence
The map shows objects like this one:

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

or two separate objects with roles `value.gps.longitude` and `value.gps.latitude`.

To show a person/presence marker on the map, map an ioBroker object to a manual `device_tracker` or `person` entity (see [Manual configuration](#manual-configuration)).

### Picture entity
Use a static picture, or any state that delivers a URL:

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

or just manually set the entity type to `camera` and write the URL into it. For video / live streams see [Features → Video](/#/docs/adapterref/iobroker.lovelace/docs/en/features.md#video--live-streams).