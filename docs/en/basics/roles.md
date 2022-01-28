---
lastChanged: 24.01.2022
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/basics/roles.md
title: Roles of data points
hash: HGg/8s3vDfGg9f6ECINJcwJyi8jBXU8A8kfR6vBF7Tw=
---
# Roles of data points
For objects of type `state`, the property `common.role` must be set to one of the roles defined in the list below.
The role information is very important information and allows visualization and smart assistant adapters to recognize the function of the object and also how/whether it relates to other objects in the same channel, device or folder.

Example: An RGB lamp can have the following three objects (or more) with different roles that belong together:

* `switch` - (on/off)
* `level.color.rgb` with #RRGGBB color code of the lamp
* `level.brightness` with the brightness value

See [type detector repository](https://github.com/ioBroker/ioBroker.type-detector/blob/master/DEVICES.md) for various device templates used for discovery with required and optional objects and their roles.

## General
* `state` - very general purpose, to be used when the role of the data item is not known.
* `text` `common.type = string`
* `text.url` `common.type = string` val contains a url to use in an anchor, iframe or img
* `html` `common.type=string`
* `json` `common.type = string`
* `list` `common.type = array`
* `date` `common.type = string` - parsable by `new Date(ddd)` string
* `date` `common.type = number` - `epoch seconds * 1000`

## Sensor (Boolean, read-only)
`common.type=boolean, common.write=false`

* `sensor.window` - window open-`true` or closed-`false`
* `sensor.door` - door open-`true` or closed-`false`
* `sensor.alarm` - some general alarms
* `sensor.alarm.flood` - water leak
* `sensor.alarm.fire` - Fire sensor
* `sensor.alarm.secure` - door open, window open or motion detected while alarm is ON.
* `sensor.alarm.power` - No power (`voltage = 0`)
* `sensor.light` - feedback from the lamp that it is on
* `sensor.lock` - current position of the lock
* `sensor.motion` - motion sensor
* `sensor.rain` - Rain detected
* `sensor.noise` - noise detected

## Keys (boolean, write only)
`common.type=boolean, common.write=true, common.read=false`

* `button`
* `button.long`
* `button.stop` - e.g. blind stop,
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

## Keys as sensors
`common.type=boolean, common.write=false, common.read=true`

* `button` - the difference that `common.write=false`. Please avoid this role and use `button.press` or `button.long`.
* `button.long`
* `button.press`

## Values (numbers, read-only)
`common.type=number, common.write=false`

* `value`
* `value.window` (`common.states={"0": "CLOSED", "1": "TILTED", "2": "OPEN"}`) It is important (`CLOSED/TILTED/ OPEN "). Values may vary.
* `value.temperature` (`common.unit='°C' or '°F' or 'K'')
* `value.humidity`
* `value.brightness` - luminance (unit: lux, )
* `value.min`
* `value.max`
* `value.default`
* `value.battery` - battery level
* `value.valve` - valve level
* `value.time` - getTime() of the Date() object
* `value.interval` (common.unit='sec') - interval in seconds (can be 0.1 or less)
* ~~value.date (common.type=string) - date in form 2015.01.01 (without time)~~
* ~~value.datetime (common.type=string) - date and time in system format~~
* `value.gps.longitude` - GPS longitude coordinates
* `value.gps.latitude` - GPS latitude
* `value.gps.elevation` - GPS elevation
* `value.gps` - longitude and latitude together like '5.56;43.45'
* `value.gps.accuracy` - accuracy of the current GPS measurement
* `value.gps.radius` - radius of the current GPS measurement
* `value.power` - actual power (unit=W or KW)
* `value.power.consumption` - energy consumption (unit=Wh or KWh)
* `value.power.reactive` - reactive power (unit=VAr)
* `value.direction` - (common.type=number ~~or string~~, indicates up/down, left/right, 4-way switch, wind direction, ...)
* `value.curtain` - current position of the curtain
* `value.blind` - current position of the blind (`max = fully open, min = fully closed`)
* `value.tilt` - current tilt position (`max = fully open, min = fully closed`)
* `value.lock` - current position of the lock
* `value.speed` - wind speed
* `value.pressure` - (unit: mbar)
* `value.distance`
* `value.distance.visibility`
* `value.severity` - some severity (states can be specified), higher is more important
* `value.warning` - some warnings (states can be specified), higher is more important
* `value.sun.elevation` - sun elevation in °
* `value.sun.azimuth` - sun azimuth in °
* `value.voltage` - voltage in volts, `unit=V`
* `value.current` - current in amperes, `unit=A`
* `value.fill` - fill level, `unit=l,ml,m3,%`
* `value.blood.sugar` - blood sugar value, `unit=mmol,mgdl`

## Indicators (boolean, read-only)
`common.type=boolean, common.write=false`

The difference between *indicators* and *sensors* is that indicators are displayed as a small icon. Sensors as real value.
So the indicator must not be alone in the channel. It must be another major status within the channel.

* `indicator`
* `indicator.working` - indicates that the target system is doing something, such as opening blinds or opening locks.
* `indicator.reachable` - When the device is online
* `indicator.connected` - used for instances only. Use `indicator.reachable` for devices
* `indicator.maintenance` - displays system warnings/errors, alarms, service messages, battery dead or similar
* `indicator.maintenance.lowbat`
* `indicator.maintenance.unreach`
* `indicator.maintenance.alarm`
* `indicator.lowbat` - true if the battery is low
* `indicator.alarm` - same as indicator.maintenance.alarm
* `indicator.alarm.fire` - Fire detected
* `indicator.alarm.flood` - Flood detected
* `indicator.alarm.secure` - door or window is open
* `indicator.alarm.health` - health problem

## Level / level (numbers, read-write)
With **Levels** you can control or set a numerical value.

`common.type=number, common.write=true`

* `level`
* `level.co2` - 0-100% air quality
* `level.dimmer` - brightness is also dimmer
* `level.blind` - set blind position (max = fully open, min = fully closed)
* `level.temperature` - set desired temperature
* `level.valve` - setpoint for valve position
* `level.color.red`
* `level.color.green`
* `level.color.blue`
* `level.color.white` - rgbW
* `level.color.hue` - color in ° `0-360; 0=red, 120=green, 240=blue, 360=red(cyclic)`
* `level.color.saturation`
* `level.color.rgb` - hex color like `#rrggbb`
* `level.color.luminance`
* `level.color.temperature` - color temperature in K° `2200 warm white, 6500° cool white`
* `level.timer`
* `level.timer.sleep` - sleep timer. 0 - off, or in minutes
* ...
* `level.volume` - (`min=0, max=100`) - volume, but min, max may differ. minimum < maximum
* `level.volume.group` - (`min=0, max=100`) - volume, for the device group
* `level.curtain` - Set the curtain position
* `level.tilt` - set the tilt position of the blinds (max = fully open, min = fully closed)

## Switch (Boolean, Read-Write)
Switch controls boolean device (`true = ON, false = OFF`)

`common.type=boolean, common.write=true`

* `switch`
* `switch.lock` - lock (`true - open lock, false - close lock`)
* `switch.lock.door` - door lock
* `switch.lock.window` - window lock
* `switch.mode.boost` - Thermostat start/stop boost mode
* `switch.mode.party` - start/stop party mode of the thermostat
* `switch.power` - on/off thermostat or air conditioner
* `switch.light`
* `switch.comfort` - comfort mode
* `switch.enable`
* `switch.power` - power on/off
* `switch.mode`*
* `switch.mode.auto` - Auto mode on/off
* `switch.mode.manual` - manual mode on/off
* `switch.mode.silent` - Silent mode on/off
* `switch.mode.moonlight` - moonlight mode on/off
* `switch.mode.color` - color mode on/off
* `switch.gate` - closes(false) or opens(true) the gate

## Air conditioning or thermostat
* `level.mode.fan` - `AUTO, HIGH, LOW, MEDIUM, QUIET, TURBO`
* `level.mode.swing` - `AUTO, HORIZONTAL, STATIONARY, VERTICAL`
* `level.mode.airconditioner` - air conditioner: `AUTO, COOL, DRY, ECO, FAN_ONLY, HEAT, OFF`, heater thermostat: `AUTO, MANUAL, VACATION`,
* `level.mode.thermostat` - thermostat: `AUTO, MANUAL, VACATION`,

 In addition to these states, the `level.temperature` and `switch.power` are usually required to map the air conditioner.

TODO: Think about ionization and oscillation.

## Vacuum cleaner
* `level.mode.cleanup` - enumeration of `AUTO, ECO, EXPRESS, NORMAL, QUIET`. Only `AUTO` and `NORMAL` are required.
* `level.mode.work` - enumeration of `AUTO, FAST, MEDIUM, SLOW, TURBO`. Optional state.
* `value.water` - 0-100% water level.
* `value.waste` - 0-100% waste bin level. (0% - empty, 100% - full)
* `indicator.maintenance.waste` - trash can is stupid.
* `value.state` - `HOME, CLEANING, PAUSE` and so on.

In addition to these states, the `switch.power` are usually required to associate the vacuum cleaner. `switch.power` in this case works as: `true` - clean, `false` - back home.
Optional `value.battery` and

## Goal
* `switch.gate` - closes(false) or opens(true) the gate (required)
* `value.position` - position of gate in percent (100% open, 0% - closed)
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
* `media.cover` - Cover URL
* `media.cover.big` - big cover URL
* `media.cover.small` - tiny cover URL
* `media.duration.text` - e.g. "2:35"
* `media.duration` - (`common.type=number`) seconds
* `media.elapsed.text` - e.g. "1:30"
* `media.elapsed` - (`common.type=number`) seconds
* `media.broadcastDate` - (`common.type=string`) broadcast date
* `media.mute` - (`common.type=boolean`) true is mute
* `media.season` - (`common.type=string`) season number (important the type is really "string" to be able to show missing season with "")
* `media.episode` - (`common.type=string`) episode number (important the type is really "string" to be able to indicate missing episode with "")
* `media.mute.group` - (`common.type=boolean`) Mute device group
* `media.tts` - Text to Speech
* `media.bitrate` - kbps
* `media.genre` - genre song
* `media.date` - song of the year
* `media.track` - (`common.type=string`) current play track id [0 - ~] (important that the type is really `string` to be able to indicate missing track with "".
* `media.playid` - media player track ID
* `media.add` - add current playlist
* `media.clear` - clear current playlist (write only)
* `media.playlist` - json array like
* `media.url` - URL to play or current URL
* `media.url.announcement` - URL to play the announcement
* `media.jump` - number of items to jump into the playlist (can be negative)
* `media.content` - type of media being played like audio/mp3
* `media.link` - state with the current file
* `media.input` - number or string of input (AUX, AV, TV, SAT, ...)
* `level.bass` - bass level
* `level.treble` - treble level
* `switch.power.zone` - power zone

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

* `media.browser` - json array like "files"

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
* `value.temperature.windchill` - Actual wind chill
* `value.temperature.dewpoint` - Current dew point
* `value.temperature.feelslike` - Actual temperature "feelslike"
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
* `dayofweek` - day of the week as text
* `location` - textual description of the location (e.g. address)
* `weather.icon` - Current status icon url for now
* `weather.icon.wind` - Current wind icon url for now
* `weather.icon.name` - Current name of the status icon
* `weather.state` - Current weather description
* `value.precipitation` - (`type: number, unit: mm`) Precipitation last 24 hours rain/snow (precipitation today for snow or rain)
* `value.precipitation.hour` - Actual precipitation over the last hour
* `value.precipitation.today` - Current amount of precipitation for today (until 0:00)
* `value.precipitation.chance` - Actual chance of precipitation for today
* `value.precipitation.type` - Current precipitation type for today. (`Type: Number`) States: 0 - NO, 1 - RAIN, 2 - SNOW, 3 - HAIL
* `value.radiation` - Actual solar irradiance
* `value.uv` - Actual UV value
* `value.clouds` - clouds in the sky. 0% - no clouds, 100% - a lot of clouds.
* `value.rain` - Actual amount of rain in the last 24 hours
* `value.rain.hour` - Actual amount of rain in the last hour
* `value.rain.today` - Current rain amount for today (until 0:00)
* `value.snow` - Actual snow level in the last 24 hours
* `value.snow.hour` - Actual snow level in the last hour
* `value.snow.today` - Current snow level for today (until 0:00)
* `value.snowline` - Actual snow line in meters
* `weather.chart.url` - URL to the weather history chart
* `weather.chart.url.forecast` - URL to chart for weather forecast
* `weather.html` - HTML object with weather description
* `waether.title` - Very short description
* `weather.title.short` - Very, very short description (one word)
* `weather.type` - type of weather information
* `weather.json` - JSON object with specific data
* `value.speed.wind.forecast.0` - wind speed forecast for today
* `weather.state.forecast.0` - weather description for today
* `value.direction.wind.forecast.0` - Wind direction forecast for today in degrees
* `weather.direction.wind.forecast.0` - Today's wind direction forecast as text
* `value.pressure.forecast.0` - pressure forecast for today
* `value.temperature.min.forecast.0` - Min. temperature forecast for today
* `value.temperature.max.forecast.0` - Max. temperature forecast for today
* `value.precipitation.forecast.0` - (`type: number, unit: %`) Precipitation probability forecast for today
* `value.prepitation.forecast.0` - (`type: number, unit: mm`) Forecast of precipitation level for today
* `weather.title.forecast.0` - Very short description for tomorrow
* `value.precipitation.day.forecast.0` - Precipitation forecast for the day
* `value.precipitation.night.forecast.0` - forecast of precipitation for the night

* `date.forecast.1` - tomorrow's date
* `weather.icon.forecast.1` - icon for tomorrow
* `weather.state.forecast.1` - Weather state of tomorrow
* `value.temperature.min.forecast.1`
* `value.temperature.min.forecast.1`
* `value.prepitation.forecast.1` - (`type: number, unit: %`) Prediction of precipitation probability for tomorrow
* `value.prepitation.forecast.1` - (`type: number, unit: mm`) Forecast of precipitation level for tomorrow
* `value.direction.wind.forecast.1`
* `value.speed.wind.forecast.1`
* `value.pressure.forecast.1`

## The information
* `info.ip` - IP of the device
* `info.mac` - Mac of the device
* `info.name` - name of the device
* `info.address` - another address (e.g. KNX)
* `info.serial` - serial number
* `info.firmware` - firmware version
* `info.hardware` - hardware version
* `info.port` - TCP port
* `info.standby` - true if the device is in standby mode
* `info.status` - device status
* `info.display` - Information shown on the device display
* `date.start` - string or number
* `date.end` - string or number

## Bless you
`common.type=number, common.read=true, common.write=false`

* `value.health.fat` - body fat index in %
* `value.health.weight` - body weight in kg, lbs
* `value.health.bmi` - bmi index
* `value.health.calories` - calories burned
* `value.health.steps` - steps done
* `value.health.bpm` - heartbeats per minute

## Other
* `url`
* `url.icon` - icon (in addition, any object can have `common.icon`)
* `url.cam` - web camera URL
* `url.blank` - open URL in new window
* `url.same` - Open URL in this window
* `url.audio` - URL for audio file
* `text.phone` - phone number