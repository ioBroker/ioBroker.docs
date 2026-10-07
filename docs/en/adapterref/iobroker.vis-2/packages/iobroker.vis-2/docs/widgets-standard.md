---
chapters: {"pages":{"en/adapterref/iobroker.vis-2/README.md":{"title":{"en":"Next generation visualization for ioBroker: vis-2"},"content":"en/adapterref/iobroker.vis-2/README.md"},"en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/widgets-standard.md":{"title":{"en":"Standard widgets"},"content":"en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/widgets-standard.md"},"en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/widgets-jQui.md":{"title":{"en":"jQui widgets - jQuery UI widgets"},"content":"en/adapterref/iobroker.vis-2/packages/iobroker.vis-2/docs/widgets-jQui.md"}}}
---
# Standard widgets

Two widget sets come with vis-2 for the devices of a house:

| Set          | What it is for                                                                                                |
| ------------ | ------------------------------------------------------------------------------------------------------------- |
| **relative** | Cards for a page with sections — every widget fills whole cells of a grid and follows the width of the screen |
| **absolute** | Markers for a floor plan — every widget is a coin or a capsule at the place it was dragged to                 |

Both are the same twenty-seven devices. A device is described once in the source
(`src-vis/src/Vis/Widgets/Standard/devices/`) and comes out twice, so a thermostat is the same thermostat on
a tablet in the hall and on the plan of the ground floor: the same states, the same attributes, the same
words, two shapes.

The pictures below are of the runtime in the dark theme. The system language of the ioBroker they were taken
from is German, so the widgets speak German in them; every word they say is translated into eleven languages
and follows the language of the installation.

- [Switch](#switch)
- [Dimmer](#dimmer)
- [Colour light](#colour-light)
- [Thermostat](#thermostat)
- [Knob](#knob)
- [Measured value](#measured-value)
- [Input](#input)
- [Fill level](#fill-level)
- [Sensor](#sensor)
- [Window or door](#window-or-door)
- [Weather](#weather)
- [Alarm system](#alarm-system)
- [Blind](#blind)
- [Lock](#lock)
- [Camera](#camera)
- [Vacuum robot](#vacuum-robot)
- [Player](#player)
- [Button](#button)
- [List](#list)
- [Table](#table)
- [Chart](#chart)
- [Clock](#clock)
- [Page tile](#page-tile)
- [Text](#text)
- [Web page](#web-page)
- [Theme switcher](#theme-switcher)

## One device, two shapes

![The markers of the set absolute](img/standard/markers.png)

A card says everything it has to say; a marker has the size of a coin and has to choose. Which choice it makes
is decided per device:

- a device with a number worth reading — a dimmer, a thermostat, a fill level — becomes a **capsule** with
  that number in it;
- everything else becomes a **coin** with its symbol, coloured by what it is doing;
- a device that cannot be shrunk this far — a list, a table, a chart, a camera, a player — becomes a coin that
  **opens its card** on a click.

A level is read as a height rather than as a number, so the markers of the dimmer, the blind and the fill
level stand as full as the device does.

## What every widget has

Besides its own states, every widget of both sets carries these:

| Attribute     | Takes    | What it does                                                                                            |
| ------------- | -------- | ------------------------------------------------------------------------------------------------------- |
| `layout`      | select   | Layout — `default` Name above, value below, `compact` One row, `card` Coloured tile (default `default`) |
| `widgetTitle` | text     | Name                                                                                                    |
| `icon`        | icon     | Icon                                                                                                    |
| `noCard`      | checkbox | Without frame                                                                                           |

The values of `layout` differ between the sets, because the shapes do:

| Set      | `layout`                                                                                     |
| -------- | -------------------------------------------------------------------------------------------- |
| relative | `default` name above and value below · `compact` one row · `card` a coloured tile            |
| absolute | `icon` the symbol alone · `name` symbol and name · `state` symbol, name and what it is doing |

Anything that switches something can ask first — and ask for a PIN:

| Attribute     | Takes  | What it does                                                                                                          |
| ------------- | ------ | --------------------------------------------------------------------------------------------------------------------- |
| `confirm`     | select | Ask before switching — `none` Never, `on` When switching on, `off` When switching off, `both` Always (default `none`) |
| `confirmText` | text   | Question                                                                                                              |
| `pin`         | text   | PIN                                                                                                                   |

Every attribute of every widget can be bound to a state instead of being set to a value; see
_Bindings of objects_ in the [README](https://github.com/iobroker/iobroker.vis-2/blob/master/packages/README.md).

## Sizes

A card is dropped at the size its widget asks for (the tile given under every heading below) and is resized in
the editor by the handle in its corner, in whole cells. A section has twelve columns per section column, a row
is 56 px by default, and both can be changed per view and per section.

A card may grow past the rows it was given when its content needs more room — the grid rows are
`minmax(height, auto)`. A card that should keep its height exactly gets the rows it needs.

## Building pages out of devices

The editor can fill a page by itself: **Views → Devices** reads the objects of the installation through the
type detector and offers every device it found, grouped by room. What it builds are the widgets below — which
widget a kind of device gets is noted at the end of each section.

## Switch

`tplRelSwitch` (set _relative_) · `tplAbsSwitch` (set _absolute_) · default tile 6 columns × 2 rows

![Switch](img/standard/switch.png)

Anything that is on or off: a socket, a lamp, a pump. The card can ask before it switches, and ask for a PIN.

| Attribute  | Takes    | What it does |
| ---------- | -------- | ------------ |
| `oid`      | state    | Object ID    |
| `oid2`     | state    | Feedback     |
| `onValue`  | text     | Value for on |
| `readOnly` | checkbox | Read only    |

The assistant picks this widget for the device types `socket`, `light`, `fan`, `pump`, `airPurifier`, `unknown`.

## Dimmer

`tplRelDimmer` (set _relative_) · `tplAbsDimmer` (set _absolute_) · default tile 6 columns × 2 rows

![Dimmer](img/standard/dimmer.png)

A lamp that is more than on or off: a toggle to switch it and a slider for the brightness. Works with a scale of 0 to 100 as well as 0 to 255.

| Attribute     | Takes  | What it does                                                                               |
| ------------- | ------ | ------------------------------------------------------------------------------------------ |
| `oid`         | state  | Object ID                                                                                  |
| `oidActual`   | state  | Feedback                                                                                   |
| `oidSwitch`   | state  | On and off                                                                                 |
| `min`         | number | Minimum                                                                                    |
| `max`         | number | Maximum                                                                                    |
| `step`        | number | Step                                                                                       |
| `onBehaviour` | select | When switched on — `last` Back to where it stood, `preset` To a set value (default `last`) |
| `onValue`     | number | That value (%) (default `100`)                                                             |

The assistant picks this widget for the device types `dimmer`.

## Colour light

`tplRelRgb` (set _relative_) · `tplAbsRgb` (set _absolute_) · default tile 6 columns × 4 rows

![Colour light](img/standard/rgb.png)

Colour light with a wheel, a brightness bar and - where the lamp can do it - colour temperature and a white channel. Six ways of telling a lamp a colour.

| Attribute       | Takes  | What it does                                                                                                                                                                                                                              |
| --------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode`          | select | How the lamp is told the colour — `hex` One state, #rrggbb, `hexw` One state and white, `rgb` Red, green and blue, `rgbw` Red, green, blue and white, `hue` Hue, saturation and brightness, `ct` Only white, warm to cold (default `hex`) |
| `oid`           | state  | Object ID                                                                                                                                                                                                                                 |
| `oidRed`        | state  | Red                                                                                                                                                                                                                                       |
| `oidGreen`      | state  | Green                                                                                                                                                                                                                                     |
| `oidBlue`       | state  | Blue                                                                                                                                                                                                                                      |
| `oidWhite`      | state  | White                                                                                                                                                                                                                                     |
| `oidSaturation` | state  | Saturation                                                                                                                                                                                                                                |
| `oidBrightness` | state  | Brightness                                                                                                                                                                                                                                |
| `oidSwitch`     | state  | On and off                                                                                                                                                                                                                                |
| `oidCt`         | state  | Colour temperature                                                                                                                                                                                                                        |
| `ctMin`         | number | Warmest, in Kelvin                                                                                                                                                                                                                        |
| `ctMax`         | number | Coldest, in Kelvin                                                                                                                                                                                                                        |

The assistant picks this widget for the device types `rgb`, `rgbSingle`, `rgbwSingle`, `hue`, `ct`, `cie`.

## Thermostat

`tplRelThermostat` (set _relative_) · `tplAbsThermostat` (set _absolute_) · default tile 6 columns × 5 rows

![Thermostat](img/standard/thermostat.png)

What the room is, what it should be, and what the heating is doing about it. Drag the knob along the scale; the modes come from the object, whatever the manufacturer calls them.

| Attribute   | Takes  | What it does                                                                         |
| ----------- | ------ | ------------------------------------------------------------------------------------ |
| `oid`       | state  | Set temperature                                                                      |
| `oidActual` | state  | Measured temperature                                                                 |
| `oidMode`   | state  | Mode                                                                                 |
| `oidPower`  | state  | On and off                                                                           |
| `unit`      | text   | Unit                                                                                 |
| `presets`   | text   | Values as buttons                                                                    |
| `controls`  | select | What is shown — `dial` The dial, `presets` The buttons, `both` Both (default `dial`) |
| `min`       | number | Minimum                                                                              |
| `max`       | number | Maximum                                                                              |
| `step`      | number | Step                                                                                 |

The assistant picks this widget for the device types `thermostat`, `airCondition`.

## Knob

`tplRelKnob` (set _relative_) · `tplAbsKnob` (set _absolute_) · default tile 6 columns × 4 rows

![Knob](img/standard/knob.png)

Any number set by hand that is not a light: the volume, a fan speed, how far a valve is open. As a knob to read from across a room, or as a slider to save height in a list.

| Attribute   | Takes  | What it does                                                                               |
| ----------- | ------ | ------------------------------------------------------------------------------------------ |
| `oid`       | state  | Object ID                                                                                  |
| `oidActual` | state  | Feedback                                                                                   |
| `shape`     | select | Turned or pushed — `dial` Knob, `slider` Slider (default `dial`)                           |
| `unit`      | text   | Unit                                                                                       |
| `presets`   | text   | Values as buttons                                                                          |
| `controls`  | select | What is shown — `control` The knob, `presets` The buttons, `both` Both (default `control`) |
| `min`       | number | Minimum                                                                                    |
| `max`       | number | Maximum                                                                                    |
| `step`      | number | Step                                                                                       |
| `digits`    | number | Decimals                                                                                   |
| `ticks`     | number | Marks on the scale                                                                         |
| `color`     | color  | Colour of the scale                                                                        |
| `colorTo`   | color  | Colour at the top end                                                                      |

The assistant picks this widget for the device types `slider`, `volume`, `volumeGroup`, `percentage`.

## Measured value

`tplRelValue` (set _relative_) · `tplAbsValue` (set _absolute_) · default tile 6 columns × 2 rows

![Measured value](img/standard/value.png)

_with the history behind the number and the second value beside it_

A measured value to read: temperature, humidity, power. Where the state is logged the card draws its history behind the number, shows which way it is going, and opens the chart on a click.

| Attribute | Takes  | What it does             |
| --------- | ------ | ------------------------ |
| `oid`     | state  | Object ID                |
| `unit`    | text   | Unit                     |
| `oid2`    | state  | Second value             |
| `unit2`   | text   | Unit of the second value |
| `digits`  | number | Decimals                 |
| `min`     | number | Minimum                  |
| `max`     | number | Maximum                  |

**History**

| Attribute        | Takes    | What it does                                                                                                       |
| ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------ |
| `chart`          | checkbox | Chart in the background (default `true`)                                                                           |
| `chartSmoothing` | select   | Smoothing — `0` None, `60` 1 minute, `300` 5 minutes, `900` 15 minutes, `3600` 1 hour (default `0`)                |
| `chartHours`     | select   | Period of the chart — `1` 1 hour, `6` 6 hours, `12` 12 hours, `24` 1 day, `72` 3 days, `168` 7 days (default `24`) |
| `chartSpline`    | checkbox | Smooth line                                                                                                        |
| `chartClick`     | checkbox | Open chart on click (default `true`)                                                                               |
| `trend`          | checkbox | Trend arrow                                                                                                        |
| `trendHours`     | select   | Period of the trend — `1` 1 hour, `6` 6 hours, `12` 12 hours, `24` 1 day, `72` 3 days, `168` 7 days (default `1`)  |
| `trendThreshold` | number   | Ignore changes smaller than                                                                                        |
| `trendUpColor`   | color    | Colour when rising                                                                                                 |
| `trendDownColor` | color    | Colour when falling                                                                                                |

The assistant picks this widget for the device types `temperature`, `humidity`, `illuminance`, `pressure`, `airQuality`, `flow`, `electricity`, `info`.

## Input

`tplRelInput` (set _relative_) · `tplAbsInput` (set _absolute_) · default tile 4 columns × 2 rows

![Input](img/standard/input.png)

_a text state_

![Input](img/standard/input-number.png)

_a number with `buttons` turned on_

A state written by hand: a field, a dropdown or a tick. For everything a house has that no device type covers - a script variable, a mode somebody invented, a setpoint. What the control is comes out of the object and can be overruled; a state that cannot be written to only shows its value.

| Attribute | Takes    | What it does                                                                                                                         |
| --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `oid`     | state    | Object ID                                                                                                                            |
| `kind`    | select   | Entered with — `auto` Out of the object, `text` Text field, `number` Number field, `select` Choice, `checkbox` Tick (default `auto`) |
| `unit`    | text     | Unit                                                                                                                                 |
| `min`     | number   | Minimum                                                                                                                              |
| `max`     | number   | Maximum                                                                                                                              |
| `step`    | number   | Step                                                                                                                                 |
| `buttons` | checkbox | Minus and plus beside it                                                                                                             |
| `options` | text     | Own choices                                                                                                                          |
| `textOn`  | text     | Word while true                                                                                                                      |
| `textOff` | text     | Word while false                                                                                                                     |

## Fill level

`tplRelTank` (set _relative_) · `tplAbsTank` (set _absolute_) · default tile 4 columns × 4 rows

![Fill level](img/standard/tank.png)

A cistern, an oil tank, a pellet store, a battery: a bar with a scale beside it, because nobody reads a fill level as a number — they read it as a height. Set a warning level and it turns red before the tank is empty.

| Attribute       | Takes  | What it does                                                                                                                          |
| --------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| `oid`           | state  | Object ID                                                                                                                             |
| `unit`          | text   | Unit                                                                                                                                  |
| `min`           | number | Empty at                                                                                                                              |
| `max`           | number | Full at                                                                                                                               |
| `low`           | number | Warn below                                                                                                                            |
| `digits`        | number | Decimals                                                                                                                              |
| `valuePosition` | select | Where the number stands — `right` Beside it, `top` Above it, `bottom` Below it, `inside` On the bar, `none` Nowhere (default `right`) |

The assistant picks this widget for the device types `fillLevel`.

## Sensor

`tplRelSensor` (set _relative_) · `tplAbsSensor` (set _absolute_) · default tile 6 columns × 2 rows

![Sensor](img/standard/sensor.png)

A state that is only ever one of two things: a window, a door, motion, smoke, water. Say what it watches and it finds its symbol and its words; mark it as an alarm and it turns red when it goes off.

| Attribute  | Takes    | What it does                                                                                                                                                                         |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `oid`      | state    | Object ID                                                                                                                                                                            |
| `kind`     | select   | What it watches — `contact` Contact, `window` Window, `door` Door, `motion` Motion, `smoke` Smoke or fire, `water` Water, `light` Light, `generic` Anything else (default `contact`) |
| `alarm`    | checkbox | Treat as an alarm                                                                                                                                                                    |
| `inverted` | checkbox | Inverted                                                                                                                                                                             |
| `textOn`   | text     | Word while true                                                                                                                                                                      |
| `textOff`  | text     | Word while false                                                                                                                                                                     |
| `iconOn`   | icon     | Icon when active                                                                                                                                                                     |
| `iconOff`  | icon     | Icon when inactive                                                                                                                                                                   |
| `colorOn`  | color    | Colour when active                                                                                                                                                                   |
| `colorOff` | color    | Colour when inactive                                                                                                                                                                 |

The assistant picks this widget for the device types `window`, `windowTilt`, `door`, `motion`, `fireAlarm`, `floodAlarm`, `coAlarm`, `contact`, `buttonSensor`.

## Window or door

`tplRelWindow` (set _relative_) · `tplAbsWindow` (set _absolute_) · default tile 6 columns × 4 rows

![Window or door](img/standard/window.png)

A window or a door drawn as one: closed, tilted or standing open. The shape is recognised across a room, before anybody reads a word.

| Attribute   | Takes    | What it does                                                      |
| ----------- | -------- | ----------------------------------------------------------------- |
| `oid`       | state    | Object ID                                                         |
| `kind`      | select   | What it watches — `window` Window, `door` Door (default `window`) |
| `handle`    | select   | Handle on the — `right` Right, `left` Left (default `right`)      |
| `tiltValue` | text     | Value for tilted                                                  |
| `inverted`  | checkbox | Inverted                                                          |

The assistant picks this widget for the device types `window`, `windowTilt`, `door`.

## Weather

`tplRelWeather` (set _relative_) · `tplAbsWeather` (set _absolute_) · default tile the whole width × 4 rows

![Weather](img/standard/weather.png)

_without a forecast (`days` = 0)_

What the weather is doing now, and what it will do. Every weather adapter serves the same handful of readings under a different name, so each one is a field and the card shows what it was given: with only a temperature it is a thermometer, with everything it is a weather station. The icons are the ones the adapter serves — a widget that drew its own would disagree with the forecast that comes with them.

| Attribute          | Takes    | What it does                                                                                    |
| ------------------ | -------- | ----------------------------------------------------------------------------------------------- |
| `source`           | select   | Where the weather comes from — `manual` By hand, `instance` From an instance (default `manual`) |
| `instance`         | instance | Weather adapter                                                                                 |
| `oid`              | state    | Temperature now                                                                                 |
| `oidText`          | state    | What the sky is doing                                                                           |
| `oidIcon`          | state    | Picture of the weather                                                                          |
| `oidFeelsLike`     | state    | Feels like                                                                                      |
| `oidHumidity`      | state    | Humidity                                                                                        |
| `oidWind`          | state    | Wind                                                                                            |
| `oidPrecipitation` | state    | Chance of rain                                                                                  |
| `unit`             | text     | Unit                                                                                            |
| `windUnit`         | text     | Unit of the wind                                                                                |
| `days`             | number   | Days of the forecast (default `0`)                                                              |
| `plain`            | checkbox | Plain card                                                                                      |

**Forecast** — these fields exist once per row, numbered: `oidDayIcon1`, `oidDayIcon2`, …

| Attribute    | Takes | What it does       |
| ------------ | ----- | ------------------ |
| `oidDayIcon` | state | Picture of the day |
| `oidDayMin`  | state | Lowest of the day  |
| `oidDayMax`  | state | Highest of the day |
| `oidDayName` | state | Name of the day    |

The assistant picks this widget for the device types `weatherCurrent`, `weatherForecast`.

## Alarm system

`tplRelSecurity` (set _relative_) · `tplAbsSecurity` (set _absolute_) · default tile 6 columns × 4 rows

![Alarm system](img/standard/security.png)

Armed, disarmed, or going off — three states and nothing else is the honest shape of it. What arming means (everybody out, or somebody asleep upstairs) is the system’s own business: where it says so in its object, the card shows those as buttons; where it does not, the buttons it was given do. Like the lock it asks on both ways by default, and a PIN can be set for it. Disarming a house from a tablet in the hall is exactly the move that should cost one.

| Attribute    | Takes    | What it does           |
| ------------ | -------- | ---------------------- |
| `oid`        | state    | Armed                  |
| `oidAlarm`   | state    | Going off              |
| `oidArmAway` | state    | Arm — everybody out    |
| `oidArmHome` | state    | Arm — somebody at home |
| `oidDisarm`  | state    | Disarm                 |
| `oidDelay`   | state    | Arm with delay         |
| `inverted`   | checkbox | Inverted               |
| `zones`      | number   | Zones (default `0`)    |

**Zones** — these fields exist once per row, numbered: `oidZone1`, `oidZone2`, …

| Attribute  | Takes | What it does     |
| ---------- | ----- | ---------------- |
| `oidZone`  | state | Zone             |
| `zoneName` | text  | Name of the zone |

## Blind

`tplRelBlind` (set _relative_) · `tplAbsBlind` (set _absolute_) · default tile 6 columns × 4 rows

![Blind](img/standard/blind.png)

A blind with the window it hangs in: pull it with the mouse, or use up, stop and down. It shows the number the state carries, which in ioBroker is how much light comes in.

| Attribute   | Takes    | What it does                                                                                               |
| ----------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| `mode`      | select   | Control — `auto` As the states allow, `level` Slider and position, `buttons` Buttons only (default `auto`) |
| `oid`       | state    | Object ID                                                                                                  |
| `oidActual` | state    | Feedback                                                                                                   |
| `oidUp`     | state    | Up                                                                                                         |
| `oidStop`   | state    | Stop                                                                                                       |
| `oidDown`   | state    | Down                                                                                                       |
| `min`       | number   | Minimum                                                                                                    |
| `max`       | number   | Maximum                                                                                                    |
| `step`      | number   | Step                                                                                                       |
| `inverted`  | checkbox | Inverted                                                                                                   |

The assistant picks this widget for the device types `blind`, `blindButtons`, `gate`.

## Lock

`tplRelLock` (set _relative_) · `tplAbsLock` (set _absolute_) · default tile 6 columns × 2 rows

![Lock](img/standard/lock.png)

A lock: locked or not, with the door opener beside it where there is one. It asks before both ways by default — a dashboard hangs where everyone walks past it, and a front door is not something to open because a sleeve brushed the screen. A PIN can be set for it.

| Attribute   | Takes    | What it does    |
| ----------- | -------- | --------------- |
| `oid`       | state    | Lock and unlock |
| `oidActual` | state    | Feedback        |
| `oidOpen`   | state    | Door opener     |
| `inverted`  | checkbox | Inverted        |

The assistant picks this widget for the device types `lock`.

## Camera

`tplRelCamera` (set _relative_) · `tplAbsCamera` (set _absolute_) · default tile 6 columns × 4 rows

![Camera](img/standard/camera.png)

_the picture here is a placeholder, not a camera_

The picture a camera takes: from the cameras adapter, from a doorbell over HTTP, or straight out of a state that carries it. A still picture has to be fetched again to stay a picture of now, which is what the interval is for. On a floor plan the camera is a dot — the click opens the card, and that is where the picture is.

| Attribute | Takes  | What it does                                                                             |
| --------- | ------ | ---------------------------------------------------------------------------------------- |
| `src`     | text   | Address of the picture                                                                   |
| `oid`     | state  | Picture from a state                                                                     |
| `refresh` | number | New picture every (s) (default `10`)                                                     |
| `fit`     | select | How it fills the box — `cover` Fill and crop, `contain` Show all of it (default `cover`) |
| `rotate`  | select | Turned by — `0` Not at all, `90` 90°, `180` 180°, `270` 270° (default `0`)               |

The assistant picks this widget for the device types `camera`, `image`.

## Vacuum robot

`tplRelVacuum` (set _relative_) · `tplAbsVacuum` (set _absolute_) · default tile 6 columns × 4 rows

![Vacuum robot](img/standard/vacuum.png)

A robot is a device one gives two orders to - go, and come back - and otherwise only looks at. What it says about itself it says in its own words, out of the object: no two manufacturers agree on them. The map some robots serve is a picture behind an address, so the camera widget shows it.

| Attribute     | Takes | What it does          |
| ------------- | ----- | --------------------- |
| `oid`         | state | Start and stop        |
| `oidStatus`   | state | What it is doing      |
| `oidBattery`  | state | Battery               |
| `oidCharging` | state | Is charging           |
| `oidPause`    | state | Pause                 |
| `oidHome`     | state | Send back to the dock |
| `oidMode`     | state | Mode                  |

The assistant picks this widget for the device types `vacuumCleaner`.

## Player

`tplRelMedia` (set _relative_) · `tplAbsMedia` (set _absolute_) · default tile 6 columns × 4 rows

![Player](img/standard/media.png)

What is playing, and the four buttons one reaches for. Which of them a given player has is its own business - some have one state that is play and pause at once, some have a button per action - so every one of them is a field and the card shows what it was given. Where there is a cover, that is what the card is mostly made of: a title in twelve point tells you what is playing, a cover tells you across the room.

| Attribute     | Takes  | What it does            |
| ------------- | ------ | ----------------------- |
| `oid`         | state  | Playing or not          |
| `oidTitle`    | state  | Title                   |
| `oidArtist`   | state  | Artist                  |
| `oidCover`    | state  | Cover                   |
| `oidPlay`     | state  | Play                    |
| `oidPause`    | state  | Pause                   |
| `oidPrev`     | state  | Previous track          |
| `oidNext`     | state  | Next track              |
| `oidVolume`   | state  | Volume                  |
| `oidMute`     | state  | Mute                    |
| `oidElapsed`  | state  | Played so far (s)       |
| `oidDuration` | state  | Length of the track (s) |
| `min`         | number | Minimum                 |
| `max`         | number | Maximum                 |

The assistant picks this widget for the device types `media`.

## Washer / dryer

`tplRelAppliance` (set _relative_) · `tplAbsAppliance` (set _absolute_) · default tile 4 columns × 4 rows

![Washer / dryer](img/standard/appliance.png)

The one device in the house that is looked at for a single reason: whether it is done yet. The ring says how far the programme has got, the middle how much longer it has, and underneath stands the time of day it will be finished at. Every state is optional but the status - a machine that only reports the remaining minutes gets a turning drum instead of a ring.

| Attribute       | Takes  | What it does                                                                                                         |
| --------------- | ------ | -------------------------------------------------------------------------------------------------------------------- |
| `oid`           | state  | Status                                                                                                               |
| `runValue`      | text   | Value while running                                                                                                  |
| `oidRunning`    | state  | Running                                                                                                              |
| `oidProgram`    | state  | Programme                                                                                                            |
| `oidRemaining`  | state  | Time left                                                                                                            |
| `remainingUnit` | select | Time left counts in — `minutes` Minutes, `seconds` Seconds, `hours` Hours, `clock` Hours:minutes (default `minutes`) |
| `oidStart`      | state  | Started at                                                                                                           |
| `oidEnd`        | state  | Ready at                                                                                                             |
| `kind`          | select | Machine — `washer` Washing machine, `dryer` Tumble dryer, `dishwasher` Dishwasher (default `washer`)                 |

## Button

`tplRelButton` (set _relative_) · `tplAbsButton` (set _absolute_) · default tile 6 columns × 2 rows

![Button](img/standard/button.png)

_writes a value_

![Button](img/standard/button-dialog.png)

_shows a page over the one it stands on_

Something happens when it is pressed, and nothing is shown afterwards: a scene, a script, a doorbell, a gate. For a relay wired as a pulse it can write a second value a moment later, which saves a script that exists only for that. It can ask before it fires, and ask for a PIN.

| Attribute      | Takes  | What it does                                                                                                      |
| -------------- | ------ | ----------------------------------------------------------------------------------------------------------------- |
| `action`       | select | On a press — `value` Write a value, `navigate` Go to a page, `dialog` Show a page over this one (default `value`) |
| `oid`          | state  | Object ID                                                                                                         |
| `view`         | views  | Page                                                                                                              |
| `dialogSize`   | select | Size of the dialog — `small` Small, `medium` Medium, `large` Large, `full` The whole window (default `medium`)    |
| `text`         | text   | Word on the button                                                                                                |
| `value`        | text   | Value to write                                                                                                    |
| `releaseValue` | text   | Value after letting go                                                                                            |
| `releaseAfter` | number | After (ms)                                                                                                        |
| `color`        | color  | Colour                                                                                                            |

The assistant picks this widget for the device types `button`.

## List

`tplRelList` (set _relative_) · `tplAbsList` (set _absolute_) · default tile 6 columns × 4 rows

![List](img/standard/list.png)

Several states in one card, a row each: switches, sliders and readings together. What a row is operated with comes out of its object - a writable boolean is a switch, a number between two limits a slider, everything else a reading - and the name and the symbol of a row are taken over from the object as well.

| Attribute | Takes  | What it does       |
| --------- | ------ | ------------------ |
| `rows`    | number | Rows (default `3`) |

**Rows** — these fields exist once per row, numbered: `oidRow1`, `oidRow2`, …

| Attribute     | Takes  | What it does                                                                                                                                                               |
| ------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `oidRow`      | state  | State                                                                                                                                                                      |
| `rowName`     | text   | Name                                                                                                                                                                       |
| `rowIcon`     | icon   | Icon                                                                                                                                                                       |
| `rowKind`     | select | Operated with — `auto` Out of the object, `switch` Switch, `slider` Slider, `select` Choice, `value` Reading only, `button` Button, `delimiter` Separator (default `auto`) |
| `rowText`     | text   | Caption of the button                                                                                                                                                      |
| `rowTextOn`   | text   | Word while true                                                                                                                                                            |
| `rowTextOff`  | text   | Word while false                                                                                                                                                           |
| `rowIconOn`   | icon   | Icon when active                                                                                                                                                           |
| `rowIconOff`  | icon   | Icon when inactive                                                                                                                                                         |
| `rowColorOn`  | color  | Colour when active                                                                                                                                                         |
| `rowColorOff` | color  | Colour when inactive                                                                                                                                                       |
| `rowUnit`     | text   | Unit                                                                                                                                                                       |

## Table

`tplRelTable` (set _relative_) · `tplAbsTable` (set _absolute_) · default tile the whole width × 6 rows

![Table](img/standard/table.png)

The rows a state holds as JSON: the next departures, the open alarms, the devices of a gateway. Which columns are shown can be left to the data or named one by one, with a heading, a width, an alignment and what is written in front of and behind every cell.

| Attribute        | Takes    | What it does                             |
| ---------------- | -------- | ---------------------------------------- |
| `oid`            | state    | State with the rows                      |
| `withHead`       | checkbox | Heading row (default `true`)             |
| `zebra`          | checkbox | Every second row shaded (default `true`) |
| `headColor`      | color    | Colour of the heading                    |
| `headBackground` | color    | Background of the heading                |
| `maxRows`        | number   | At most this many rows                   |
| `columns`        | number   | Described columns (default `3`)          |

**Columns** — these fields exist once per row, numbered: `columnKey1`, `columnKey2`, …

| Attribute          | Takes  | What it does                                                              |
| ------------------ | ------ | ------------------------------------------------------------------------- |
| `columnKey`        | custom | Key in the data                                                           |
| `columnTitle`      | text   | Heading                                                                   |
| `columnAlign`      | select | Alignment — `left` Left, `center` Centred, `right` Right (default `left`) |
| `columnWidth`      | text   | Width                                                                     |
| `columnPrefix`     | text   | In front of the value                                                     |
| `columnSuffix`     | text   | Behind the value                                                          |
| `columnWords`      | text   | A word per value                                                          |
| `columnColor`      | color  | Colour                                                                    |
| `columnBackground` | color  | Background                                                                |
| `columnRules`      | custom | Colour by value                                                           |

## Chart

`tplRelChart` (set _relative_) · `tplAbsChart` (set _absolute_) · default tile the whole width × 4 rows

![Chart](img/standard/chart.png)

What a value did, as a card of its own: two states against each other, a day of the heating, the power of the last week. The measured value carries its history behind its number; this is for when the course itself is the point. It draws only what a history adapter records.

| Attribute | Takes    | What it does                                                                                                       |
| --------- | -------- | ------------------------------------------------------------------------------------------------------------------ |
| `oid`     | state    | Object ID                                                                                                          |
| `oid2`    | state    | Second value                                                                                                       |
| `hours`   | select   | Period of the chart — `1` 1 hour, `6` 6 hours, `12` 12 hours, `24` 1 day, `72` 3 days, `168` 7 days (default `24`) |
| `toolbar` | checkbox | Buttons for the period (default `true`)                                                                            |
| `step`    | checkbox | Hold the value                                                                                                     |
| `spline`  | checkbox | Smooth line                                                                                                        |
| `color`   | color    | Colour of the line                                                                                                 |
| `color2`  | color    | Colour of the second line                                                                                          |

The assistant picks this widget for the device types `chart`.

## Clock

`tplRelClock` (set _relative_) · `tplAbsClock` (set _absolute_) · default tile 4 columns × 4 rows

![Clock](img/standard/clock.png)

_digits, with the date_

![Clock](img/standard/clock-analog.png)

_hands_

The one thing on a dashboard that is not a device. A tablet on a wall is a clock for most of the day, and one that has to be read off the corner of the system bar is no clock. With hands or in digits, with the date under it.

| Attribute     | Takes    | What it does                                                          |
| ------------- | -------- | --------------------------------------------------------------------- |
| `mode`        | select   | Hands or digits — `analog` Hands, `digital` Digits (default `analog`) |
| `withSeconds` | checkbox | With seconds                                                          |
| `withDate`    | checkbox | With the date                                                         |
| `color`       | color    | Colour of the hands                                                   |

## Page tile

`tplRelLink` (set _relative_) · `tplAbsLink` (set _absolute_) · default tile 6 columns × 2 rows

![Page tile](img/standard/link.png)

A card that leads somewhere: to another page of this project, or to an address of its own. A start page with a tile per room reads better than a list at the side, and on a floor plan a marker that opens the detail page of a room is the natural gesture.

| Attribute   | Takes        | What it does        |
| ----------- | ------------ | ------------------- |
| `view`      | select-views | Page it leads to    |
| `url`       | text         | Address instead     |
| `newWindow` | checkbox     | In a tab of its own |
| `subtitle`  | text         | Line under the name |
| `color`     | color        | Colour              |

## Text

`tplRelText` (set _relative_) · `tplAbsText` (set _absolute_) · default tile the whole width × 1 rows

![Text](img/standard/text.png)

Words that are not a device: a heading over a section, a room name on a floor plan, a note. It can carry the value of a state after its text, and it has no card around it — a heading in a frame is not a heading.

| Attribute | Takes    | What it does                                                                                                |
| --------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| `text`    | text     | Text                                                                                                        |
| `icon`    | icon     | Icon                                                                                                        |
| `oid`     | state    | State after the text                                                                                        |
| `unit`    | text     | Unit                                                                                                        |
| `size`    | select   | Size — `header` Heading, `title` Title, `normal` Normal, `small` Small (default `title`)                    |
| `align`   | select   | Alignment — `left` Left, `center` Centred, `right` Right, `between` Text left, value right (default `left`) |
| `bold`    | checkbox | Bold (default `true`)                                                                                       |
| `color`   | color    | Colour                                                                                                      |

## Web page

`tplRelIframe` (set _relative_) · `tplAbsIframe` (set _absolute_) · default tile 6 columns × 4 rows

![Web page](img/standard/iframe.png)

A web page inside a widget: a camera, a chart of another adapter, a timetable, a map. It can reload itself for pages that never update on their own. What it cannot do is reach into the page — a browser keeps a frame from another site to itself, and that is the right way round.

| Attribute   | Takes    | What it does         |
| ----------- | -------- | -------------------- |
| `src`       | text     | Address              |
| `oid`       | state    | Address from a state |
| `refresh`   | number   | Reload every (s)     |
| `scrolling` | checkbox | May scroll           |
| `radius`    | number   | Rounded corners      |

## Theme switcher

`tplRelTheme` (set _relative_) · `tplAbsTheme` (set _absolute_) · default tile 4 columns × 2 rows

![Theme switcher](img/standard/theme.png)

A dashboard in a hallway is read in daylight and at night, and which theme it should be in is nothing the project can know. The switch changes the runtime itself, so every card, every marker and the menu change with it, and the choice is remembered in the browser. A view that must always be dark sets one theme instead, and one that should look like the rest of the device follows the browser.

| Attribute   | Takes  | What it does                                                                                                          |
| ----------- | ------ | --------------------------------------------------------------------------------------------------------------------- |
| `mode`      | select | What it does — `toggle` Switch, `fixed` Always this theme, `system` Follow the browser (default `toggle`)             |
| `themeName` | select | Theme — `light` Light, `dark` Dark, `modernLight` Light (new design), `modernDark` Dark (new design) (default `dark`) |