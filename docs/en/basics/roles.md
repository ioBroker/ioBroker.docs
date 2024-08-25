---
lastChanged: 24.01.2022
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/basics/roles.md
title: Roles of data points
hash: VpeRGEGN/hE2uKbhNCl43FaSqZoQ69UIxWld/aRyCSU=
---
# Roles of data points
For objects of type `state`, the property `common.role` must be set to one of the roles defined in the list below.
The role information is very important information and allows visualization and smart assistant adapters to recognize the function of the object and also how/if it relates to other objects in the same channel, device or folder.

Example: An RGB lamp can have the following three objects (or more) with different roles that belong together:

* `switch` - (On/Off)
* `level.color.rgb` with #RRGGBB color code of the lamp
* `level.brightness` with the brightness value

Various device templates used for detection with required and optional objects and their roles can be found in [Type Detector Repository](https://github.com/ioBroker/ioBroker.type-detector/blob/master/DEVICES.md).

## Generally
* `state` - very general purpose, to use when it is not known what role the data point has.
* `text` `common.type = string`
* `text.url` `common.type = string` val contains a URL for use in an anchor, iframe or img
* `html` `common.type = string`
* `json` `common.type = string`
* `list` `common.type = array`
* `date` `common.type = string` - parsable by `new Date(ddd)` string
* `date` `common.type = number` - `epoch seconds * 1000`

## Sensor (Boolean, read-only)
`common.type=boolean, common.write=false`

* `sensor.window` - window opened-`true` or closed-`false`
* `sensor.door` - door opened-`true` or closed-`false`
* `sensor.alarm` - some general alarms
* `sensor.alarm.flood` - water leak
* `sensor.alarm.fire` - Fire sensor
* `sensor.alarm.secure` - Door opened, window opened or motion detected during alarm is ON.
* `sensor.alarm.power` - No power (`voltage = 0`)
* `sensor.light` - feedback from the lamp that it is switched on
* `sensor.lock` - current position of the lock
* `sensor.motion` - motion sensor
* `sensor.rain` - Rain detected
* `sensor.noise` - noise detected

## Keys (Boolean, write only)
`common.type=boolean, common.write=true, common.read=false`

* `button`
* `button.long`
* `button.stop` - e.g. roller blind stop,
* `button.stop.tilt`
* `button.start`
* `button.open.door`
* `button.window.open`
* `button.open.blind`
* `button.open.tilt`
* `button.close.blind`
* `button.close.tilt`
* `button.mode`*
* `button.mode.auto`
* `button.mode.manual`
* `button.mode.silent`

## Buttons as sensors
`common.type=boolean, common.write=false, common.read=true`

* `button` - the difference that `common.write=false`. Please avoid this role and use `button.press` or `button.long`.
* `button.long`
* `button.press`

## Values (numbers, read-only)
`common.type=number, common.write=false`

* `value`
* `value.window` (`common.states={"0": "CLOSED", "1": "TILTED", "2": "OPEN"}`) It is important (`CLOSED/TILTED/ OPEN"). Values may vary.
* `value.temperature` (`common.unit='°C' or '°F' or 'K'')
* `value.humidity`
* `value.brightness` - luminance (unit: lux, )
* `value.min`
* `value.max`
* `value.default`
* `value.battery` - battery level
* `value.valve` - valve level
* `value.time` - getTime() of the Date() object
* `value.interval` (common.unit='sec') - Interval in seconds (can be 0.1 or less)
* ~~value.date (common.type=string) - Date in the form 2015.01.01 (without time)~~
* ~~value.datetime (common.type=string) - Date and time in system format~~
* `value.gps.longitude` - GPS longitude coordinates
* `value.gps.latitude` - GPS latitude
* `value.gps.elevation` - GPS altitude
* `value.gps` - longitude and latitude together like '5.56;43.45'
* `value.gps.accuracy` - Accuracy of the current GPS measurement
* `value.gps.radius` - Radius of the current GPS measurement
* `value.power` - actual power (unit=W or KW)
* `value.power.consumption` - Energy consumption (unit=Wh or KWh)
* `value.power.reactive` - reactive power (unit=VAr)
* `value.direction` - (common.type=number ~~or string~~, shows up/down, left/right, 4-way switch, wind direction, ...)
* `value.curtain` - current position of the curtain
* `value.blind` - current position of the blind (`max = fully open, min = fully closed`)
* `value.tilt` - current tilt position (`max = fully open, min = fully closed`)
* `value.lock` - current position of the lock
* `value.speed` - wind speed
* `value.pressure` - (unit: mbar)
* `value.distance`
* `value.distance.visibility`
* `value.severity` - a certain severity (conditions can be specified), higher is more important
* `value.warning` - some warnings (conditions can be specified), higher is more important
* `value.sun.elevation` - Sun position in °
* `value.sun.azimuth` - Sun azimuth in °
* `value.voltage` - Voltage in volts, `unit=V`
* `value.current` - Current in amps, `unit=A`
* `value.fill` - fill level, `unit=l,ml,m3,%`
* `value.blood.sugar` - Blood sugar value, `unit=mmol,mgdl`

## Indicators (boolean, read-only)
`common.type=boolean, common.write=false`

The difference between *indicators* and *sensors* is that indicators are shown as a small icon. Sensors as a real value.
So the indicator cannot be alone in the channel. It must be another main status within the channel.

* `indicator`
* `indicator.working` - indicates that the target system is doing something, such as adjusting blinds or opening locks.
* `indicator.reachable` - When the device is online
* `indicator.connected` - used only for instances. Use `indicator.reachable` for devices
* `indicator.maintenance` - displays system warnings/errors, alarms, service messages, battery empty or similar
* `indicator.maintenance.lowbat`
* `indicator.maintenance.unreach`
* `indicator.maintenance.alarm`
* `indicator.lowbat` - true if the battery is low
* `indicator.alarm` - like indicator.maintenance.alarm
* `indicator.alarm.fire` - Fire detected
* `indicator.alarm.flood` - Flood detected
* `indicator.alarm.secure` - door or window is open
* `indicator.alarm.health` - health problem

## Level (numbers, reading-writing)
With **Levels** you can control or set a numerical value.

`common.type=number, common.write=true`

* `level`
* `level.co2` - 0-100% air quality
* `level.dimmer` - brightness is also darker
* `level.blind` - Set blind position (max = fully open, min = fully closed)
* `level.temperature` - set desired temperature
* `level.valve` - setpoint for valve position
* `level.color.red`
* `level.color.green`
* `level.color.blue`
* `level.color.white` - rgbW
* `level.color.hue` - Color in ° `0-360; 0=red, 120=green, 240=blue, 360=red(cyclic)`
* `level.color.saturation`
* `level.color.rgb` - Hex color like `#rrggbb`
* `level.color.luminance`
* `level.color.temperature` - Color temperature in K° `2200 warm white, 6500° cold white`
* `level.timer`
* `level.timer.sleep` - sleep timer. 0 - off, or in minutes
* ...
* `level.volume` - (`min=0, max=100`) - Volume, but min, max may differ. min < max
* `level.volume.group` - (`min=0, max=100`) - Volume for the device group
* `level.curtain` - Set the curtain position
* `level.tilt` - Set the tilt position of the blinds (max = fully open, min = fully closed)

## Switch (Boolean, Read-Write)
Switch controls Boolean device (`true = ON, false = OFF`)

`common.type=boolean, common.write=true`

* `switch`
* `switch.lock` - lock (`true - open lock, false - close lock`)
* `switch.lock.door` - door lock
* `switch.lock.window` - Window lock
* `switch.mode.boost` - Start/stop boost mode of the thermostat
* `switch.mode.party` - Start/stop party mode of the thermostat
* `switch.power` - On/off thermostat or air conditioning
* `switch.light`
* `switch.comfort` - Comfort mode
* `switch.enable`
* `switch.power` - Switch on/off
* `switch.mode`*
* `switch.mode.auto` - Auto mode on/off
* `switch.mode.manual` - manual mode on/off
* `switch.mode.silent` - Silent mode on/off
* `switch.mode.moonlight` - moonlight mode on/off
* `switch.mode.color` - Color mode on/off
* `switch.gate` - closes(false) or opens(true) the gate

## Air conditioning or thermostat
* `level.mode.fan` - `AUTO, HIGH, LOW, MEDIUM, QUIET, TURBO`
* `level.mode.swing` - `AUTO, HORIZONTAL, STATIONARY, VERTICAL`
* `level.mode.airconditioner` - air conditioning: `AUTO, COOL, DRY, ECO, FAN_ONLY, HEAT, OFF`, heating thermostat: `AUTO, MANUAL, VACATION`,
* `level.mode.thermostat` - thermostat: `AUTO, MANUAL, VACATION`,

In addition to these states, `level.temperature` and `switch.power` are usually required to map the air conditioning system.

TODO: Think about ionization and oscillation.

## Vacuum cleaner
* `level.mode.cleanup` - Enumeration of `AUTO, ECO, EXPRESS, NORMAL, QUIET`. Only `AUTO` and `NORMAL` are required.
* `level.mode.work` - Enumeration of `AUTO, FAST, MEDIUM, SLOW, TURBO`. Optional state.
* `value.water` - 0-100% water level.
* `value.waste` - 0-100% waste bin level. (0% - empty, 100% - full)
* `indicator.maintenance.waste` - Trash is stupid.
* `value.state` - `HOME, CLEANING, PAUSE` and so on.

In addition to these states, the `switch.power` are usually required to assign the vacuum cleaner. `switch.power` works in this case as: `true` - clean, `false` - back home.
Optional `value.battery` and

## Goal
* `switch.gate` - closes(false) or opens(true) the gate (required)
* `value.position` - position of the gate in percent (100% open, 0% - closed)
* `value.gate` - same as `value.position`
* `button.stop` - stop gate movement

## Media
Special roles for media players

* `button.stop`
* `button.play`
* `button.next`
* `button.prev`
* `button.pause`
* `switch.pause`
* `button.forward`
* `button.reverse`
* `button.fastforward`
* `button.fastreverse`
* `button.volume.up`
* `button.volume.down`
* `media.seek` - (`common.type=number`) %
* `media.mode.shuffle` - (`common.type=number`) 0 - none, 1 - all, 2 - one
* `media.mode.repeat` - (`common.type=boolean`)
* `media.state` - ['play','stop','pause'] or [0 - pause, 1 - play, 2 - stop] or [true - play/false - pause]
* `media.artist`
* `media.album`
* `media.title`
* `media.title.next`
* `media.cover` - cover URL
* `media.cover.big` - big cover URL
* `media.cover.small` - tiny cover URL
* `media.duration.text` - e.g. "2:35"
* `media.duration` - (`common.type=number`) seconds
* `media.elapsed.text` - e.g. "1:30"
* `media.elapsed` - (`common.type=number`) seconds
* `media.broadcastDate` - (`common.type=string`) broadcast date
* `media.mute` - (`common.type=boolean`) true is mute
* `media.season` - (`common.type=string`) season number (important the type is really "string" to be able to indicate the absence of the season with "")
* `media.episode` - (`common.type=string`) episode number (important the type is really "string" to be able to indicate the absence of the episode with "")
* `media.mute.group` - (`common.type=boolean`) Mute the device group
* `media.tts` - Text-to-Speech
* `media.bitrate` - kbps
* `media.genre` - Genre song
* `media.date` - annual song
* `media.track` - (`common.type=string`) current play track ID [0 - ~] (important that the type is really `string` to be able to indicate the absence of the track with ""
* `media.playid` - Media player track ID
* `media.add` - add current playlist
* `media.clear` - clear current playlist (write only)
* `media.playlist` - json array like
* `media.url` - URL to play or current URL
* `media.url.announcement` - URL to play the announcement
* `media.jump` - number of items to jump into the playlist (can be negative)
* `media.content` - type of media played such as audio/mp3
* `media.link` - state with the current file
* `media.input` - number or string of the input (AUX, AV, TV, SAT, ...)
* `level.bass` - bass level
* `level.treble` - Treble level
* `switch.power.zone` - Power zone

```
[
    {
        "artist": "",
        "album": "",
        "bitrate":0,
        "title": "",
        "file": "",
        "genre": "",
        "year": 0,
        "len": "00:00",
        "rating": "",
        "cover": ""
    }
]
```

* `media.browser` - Json array like "files"

```
[
    {
        "fanart": "",
        "file": "",//smb://192.168.1.10/music/AtlantidaProject/
        "filetype": "", //directory
        "label": "",
        "lastmodified": "",
        "mimetype": "",
        "size": 0,
        "thumbnail": "",
        "title": "",
        "type": "",
        "lastmodified": "2016-02-27 16:05:46",
        "time": "88",
        "track": "01",
        "date": "2005",
        "artist": "yonderboy (H)",
        "album": "splendid isolation",
        "genre": "Trip-Hop"
    }
]
```

## Weather
* `value.temperature` - Current temperature
* `value.temperature.windchill` - Actual windchill
* `value.temperature.dewpoint` - Current dew point
* `value.temperature.feelslike` - Actual temperature "feels like"
* `value.temperature.min` - Minimum temperature in the last 24h
* `value.temperature.max` - Maximum temperature in the last 24h
* `value.humidity` - actual or average humidity
* `value.humidity.min` - actual humidity
* `value.humidity.max` - actual humidity
* `value.speed.wind` - current or average wind speed
* `value.speed.max.wind` - maximum wind speed in the last 24h
* `value.speed.min.wind` - minimum wind speed in the last 24h
* `value.speed.wind.gust` - actual wind gust speed
* `value.direction.wind` - current or average wind direction in degrees
* `value.direction.max.wind` - current wind direction in degrees
* `value.direction.min.wind` - current wind direction in degrees
* `weather.direction.wind` - current or average wind direction as text, e.g. NNW
* `date` - current date or date of last read information
* `date.sunrise` - Sunrise for today
* `date.sunset` - sunset for today
* `dayofweek` - weekday as text
* `location` - text description of the location (e.g. address)
* `weather.icon` - Current status icon URL for the moment
* `weather.icon.wind` - Current wind icon URL for the moment
* `weather.icon.name` - Current name of the status icon
* `weather.state` - Current weather description
* `value.precipitation` - (`type: number, unit: mm`) Precipitation of the last 24 hours rain/snow (Precipitation today for snow or rain)
* `value.precipitation.hour` - Actual precipitation in the last hour
* `value.precipitation.today` - Current precipitation amount for today (until 0:00)
* `value.precipitation.chance` - Actual precipitation probability for today
* `value.precipitation.type` - Current precipitation type for today. (`Type: Number`) States: 0 - NO, 1 - RAIN, 2 - SNOW, 3 - HAIL
* `value.radiation` - Actual solar radiation
* `value.uv` - Actual UV value
* `value.clouds` - clouds in the sky. 0% - no clouds, 100% - many clouds.
* `value.rain` - Actual rainfall in the last 24 hours
* `value.rain.hour` - Actual rainfall in the last hour
* `value.rain.today` - Current rainfall for today (until 0:00)
* `value.snow` - Actual snow level in the last 24 hours
* `value.snow.hour` - Actual snow level in the last hour
* `value.snow.today` - Current snow level for today (until 0:00)
* `value.snowline` - Actual snow line in meters
* `weather.chart.url` - URL to the weather chart
* `weather.chart.url.forecast` - URL to the weather forecast chart
* `weather.html` - HTML object with weather description
* `waether.title` - Very short description
* `weather.title.short` - Very, very short description (One word)
* `weather.type` - type of weather information
* `weather.json` - JSON object with specific data
* `value.speed.wind.forecast.0` - Wind speed forecast for today
* `weather.state.forecast.0` - Weather description for today
* `value.direction.wind.forecast.0` - Wind direction forecast for today in degrees
* `weather.direction.wind.forecast.0` - wind direction forecast for today as text
* `value.pressure.forecast.0` - Pressure forecast for today
* `value.temperature.min.forecast.0` - Min. temperature forecast for today
* `value.temperature.max.forecast.0` - Max. temperature forecast for today
* `value.precipitation.forecast.0` - (`type: number, unit: %`) Precipitation probability forecast for today
* `value.prepitation.forecast.0` - (`type: number, unit: mm`) Precipitation level forecast for today
* `weather.title.forecast.0` - Very short description for tomorrow
* `value.precipitation.day.forecast.0` - Precipitation forecast for the day
* `value.precipitation.night.forecast.0` - Precipitation forecast for the night

* `date.forecast.1` - tomorrow's date
* `weather.icon.forecast.1` - icon for tomorrow
* `weather.state.forecast.1` - Tomorrow's weather condition
* `value.temperature.min.forecast.1`
* `value.temperature.min.forecast.1`
* `value.prepitation.forecast.1` - (`type: number, unit: %`) Precipitation probability forecast for tomorrow
* `value.prepitation.forecast.1` - (`type: number, unit: mm`) Precipitation level forecast for tomorrow
* `value.direction.wind.forecast.1`
* `value.speed.wind.forecast.1`
* `value.pressure.forecast.1`

## The information
* `info.ip` - IP of the device
* `info.mac` - Mac of the device
* `info.name` - Name of the device
* `info.address` - another address (e.g. KNX)
* `info.serial` - serial number
* `info.firmware` - Firmware version
* `info.hardware` - Hardware version
* `info.port` - TCP port
* `info.standby` - true if the device is in standby mode
* `info.status` - device status
* `info.display` - Information shown on the device display
* `date.start` - string or number
* `date.end` - string or number

## Health
`common.type=number, common.read=true, common.write=false`

* `value.health.fat` - Body fat index in %
* `value.health.weight` - body weight in kg, lbs
* `value.health.bmi` - bmi index
* `value.health.calories` - calories burned
* `value.health.steps` - steps completed
* `value.health.bpm` - heartbeats per minute

## Other
* `url`
* `url.icon` - icon (additionally, every object can have `common.icon`)
* `url.cam` - webcam URL
* `url.blank` - open URL in new window
* `url.same` - open URL in this window
* `url.audio` - URL for audio file
* `text.phone` - phone number