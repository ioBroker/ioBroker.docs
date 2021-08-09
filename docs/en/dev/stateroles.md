# State roles

Objects from type "State" need their common.role property set to one of the roles defined in the list below. The Role information is a very important information and allows Visualization- and Smart-Assistant adapters to detect the function of the object and also how/if they relate to other objects in the same channel, device or folder

Example:
A RGB Lamp can have thw following three objects (or more) with different roles that belong together:
* switch (On/Off)
* level.color.rgb with #RRGGBB color code of the lamp
* level.brightness with the brightness value

Different Device templates used for the detecting with the required and optional objects and their roles can be found in the [Type-detector repository](https://github.com/ioBroker/ioBroker.type-detector/blob/master/DEVICES.md).

## Common
* `state` - very common purpose. If you don't know which role the state has, use this one.
* `text`              `common.type = string`
* `text.url`          `common.type = string` state val contains an url for usage in an anchor, iframe or img
* `html`              `common.type = string`
* `json`              `common.type = string`
* `list`              `common.type = array`
* `date`              `common.type = string` - parsable by `new Date(ddd)` string
* `date`              `common.type = number` - epoch seconds * 1000

## Sensor (booleans, read-only)
`common.type=boolean, common.write=false`

* `sensor.window`         - window opened-`true` or closed-`false`
* `sensor.door`           - door opened-`true` or closed-`false`
* `sensor.alarm`          - some common alarm
* `sensor.alarm.flood`    - water leakage
* `sensor.alarm.fire`     - fire sensor
* `sensor.alarm.secure`   - door opened, window opened or motion detected during alarm is ON.
* `sensor.alarm.power`    - No power (voltage = 0)
* `sensor.light`          - feedback from lamp, that it is ON
* `sensor.lock`           - actual position of lock
* `sensor.motion`         - motion sensor
* `sensor.rain`           - rain detected
* `sensor.noise`          - noise detected

## Buttons (booleans, write-only)
`common.type=boolean, common.write=true, common.read=false`

* `button`
* `button.long`
* `button.stop`           - e.g. rollo stop,
* `button.stop.tilt`
* `button.start`
* `button.open.door`
* `button.open.window`
* `button.open.blind`
* `button.open.tilt`
* `button.close.blind`
* `button.close.tilt`
* `button.mode.`*
* `button.mode.auto`
* `button.mode.manual`
* `button.mode.silent`

## Buttons as sensor
`common.type=boolean, common.write=false, common.read=true`

* `button`         - the difference, that `common.write=false`. Please avoid this role and use `button.press` or `button.long`.
* `button.long`
* `button.press`

## Values (numbers, read-only)
`common.type=number, common.write=false`

* `value`
* `value.window`      (common.states={"0": "CLOSED", "1": "TILTED", "2": "OPEN"}) It is important to have (CLOSED/TILTED/OPEN). Values can differ.
* `value.temperature` (common.unit='°C' or '°F' or 'K')
* `value.humidity`
* `value.brightness`      - luminance level (unit: lux, )
* `value.min`
* `value.max`
* `value.default`
* `value.battery`         - battery level
* `value.valve`           - valve level
* `value.time`            - getTime() of Date() object
* `value.interval`    (common.unit='sec') - Interval in seconds (can be 0.1 or less)
* ~~value.date        (common.type=string) - Date in form 2015.01.01 (without time)~~
* ~~value.datetime    (common.type=string) - Date and time in system format~~
* `value.gps.longitude`   - gps longitude coordinates
* `value.gps.latitude`    - gps latitude
* `value.gps.elevation`   - gps elevation
* `value.gps`             - longitude and latitude together like '5.56;43.45'
* `value.power`           - actual power (unit=W or KW)
* `value.power.consumption` - energy consumption (unit=Wh or KWh)
* `value.direction`       - (common.type=number ~~or string~~, indicates up/down, left/right, 4-way switches, wind-direction, ... )
* `value.curtain`         - actual position of curtain
* `value.blind`           - actual position of blind (max = fully open, min = fully closed)
* `value.tilt`            - actual tilt position (max = fully open, min = fully closed)
* `value.lock`            - actual position of lock
* `value.speed`           - wind speed
* `value.pressure`        - (unit: mbar)
* `value.distance`
* `value.distance.visibility`
* `value.severity`        - some severity (states can be provided), Higher is more important
* `value.warning`         - some warning (states can be provided), Higher is more important
* `value.sun.elevation`   - sun elevation in °
* `value.sun.azimuth`     - sun azimuth in °
* `value.voltage`         - Voltage in Volt, unit=V
* `value.current`         - Current in Ampere, unit=A
* `value.fill`            - Fill level, unit=l,ml,m3,%
* `value.blood.sugar`     - Blood sugar value, unit=mmol,mgdl

## Indicators (boolean, read-only)
`common.type=boolean, common.write=false`

The difference of *Indicators* from *Sensors* is that indicators will be shown as small icon. Sensors as a real value.
So the indicator may not be alone in the channel. It must be some other main state inside channel.

* `indicator`
* `indicator.working`     - indicates that the target systems is executing something, like blinds or lock opening.
* `indicator.reachable`   - If device is online
* `indicator.connected`   - used only for instances. Use indicator.reachable for devices
* `indicator.maintenance` - indicates system warnings/errors, alarms, service messages, battery empty or stuff like that
* `indicator.maintenance.lowbat`
* `indicator.maintenance.unreach`
* `indicator.maintenance.alarm`
* `indicator.lowbat`      - true if low battery
* `indicator.alarm`       - same as indicator.maintenance.alarm
* `indicator.alarm.fire`  - fire detected
* `indicator.alarm.flood` - flood detected
* `indicator.alarm.secure` - door or window is opened
* `indicator.alarm.health` - health problem

## Levels (numbers, read-write)
With **levels** you can control or set some number value.

`common.type=number, common.write=true`

* `level`
* `level.co2`             - 0-100% ait quality
* `level.dimmer`          - brightness is dimmer too
* `level.blind`           - set blind position (max = fully open, min = fully closed)
* `level.temperature`     - set desired temperature
* `level.valve`           - set point for valve position
* `level.color.red`
* `level.color.green`
* `level.color.blue`
* `level.color.white`     - rgbW
* `level.color.hue`       - color in ° 0-360; 0=red, 120=green, 240=blue, 360=red(cyclic)
* `level.color.saturation`
* `level.color.rgb`       - hex color like '#rrggbb'
* `level.color.luminance`
* `level.color.temperature` - color temperature in K° 2200 warm-white, 6500° cold white
* `level.timer`
* `level.timer.sleep`    - sleep timer. 0 - off, or in minutes
* ...
* `level.volume`         - (min=0, max=100) - sound volume, but min, max can differ. min < max
* `level.volume.group`   - (min=0, max=100) - sound volume, for the group of devices
* `level.curtain`        - set the curtain position
* `level.tilt`           - set the tilt position of blinds (max = fully open, min = fully closed)

## Switches (booleans, read-write)
Switch controls boolean device (true = ON, false = OFF)

`common.type=boolean, common.write=true`

* `switch`
* `switch.lock`           - lock (true - open lock, false - close lock)
* `switch.lock.door`      - door lock
* `switch.lock.window`    - window lock
* `switch.mode.boost`     - start/stop boost mode of thermostat
* `switch.mode.party`     - start/stop party mode of thermostat
* `switch.power`          - on/off thermostat or air conditioner
* `switch.light`
* `switch.comfort`        - comfort mode
* `switch.enable`
* `switch.power`          - power on/off
* `switch.mode.`*
* `switch.mode.auto`      - auto mode on/off
* `switch.mode.manual`    - manual mode on/off
* `switch.mode.silent`    - silent mode on/off
* `switch.mode.moonlight` - moon light mode on/off
* `switch.mode.color`     - color mode on/off
* `switch.gate'           - closes(false) or opens(true) the gate

## Air condition or thermostat
* `level.mode.fan`        - `AUTO, HIGH, LOW, MEDIUM, QUIET, TURBO`
* `level.mode.swing`      - `AUTO, HORIZONTAL, STATIONARY, VERTICAL`
* `level.mode.airconditioner` - air conditioner: `AUTO, COOL, DRY, ECO, FAN_ONLY, HEAT, OFF`, heating thermostat: `AUTO, MANUAL, VACATION`, 
* `level.mode.thermostat` - thermostat: `AUTO, MANUAL, VACATION`, 
 Additionally to these states normally the `level.temperature` and `switch.power` required to map the air conditioner.

TODO: Think about ionization`and oscillation. 

## Vacuum cleaner
* `level.mode.cleanup`    - Enumeration of `AUTO, ECO, EXPRESS, NORMAL, QUIET`. Only `AUTO` and `NORMAL` are required. 
* `level.mode.work`       - Enumeration of `AUTO, FAST, MEDIUM, SLOW, TURBO`. Optional state.
* `value.water`           - 0-100% water level.
* `value.waste`           - 0-100% waste bin level. (0% - empty, 100% - full)
* `indicator.maintenance.waste` - Waste bin is fool.
* `value.state`           - `HOME, CLEANING, PAUSE` and so on.

Additionally to these states normally the `switch.power` required to map the vacuum cleaner. `switch.power` in this case works as: `true` - clean, `false` - back to home.
Optionally `value.battery` and  

## Gate
* `switch.gate`           - closes(false) or opens(true) the gate (required)
* `value.position`        - position of the gate in percent (100% opened, 0% - closed)
* `value.gate`            - same as `value.position`
* `button.stop`           - stop motion of gate

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
* `media.seek`            - (common.type=number) %
* `media.mode.shuffle`    - (common.type=number) 0 - none, 1 - all, 2 - one
* `media.mode.repeat`     - (common.type=boolean)
* `media.state`           - ['play','stop','pause'] or [0 - pause, 1 - play, 2 - stop] or [true - playing/false - pause]
* `media.artist`
* `media.album`
* `media.title`
* `media.title.next`
* `media.cover`           - cover url
* `media.cover.big`       - big cover url
* `media.cover.small`     - tiny cover url
* `media.duration.text`   - e.g "2:35"
* `media.duration`        - (common.type=number) seconds
* `media.elapsed.text`    - e.g "1:30"
* `media.elapsed`         - (common.type=number) seconds
* `media.broadcastDate`   - (common.type=string) Broadcast date
* `media.mute`            - (common.type=boolean) true is muted
* `media.season`          - (common.type=string) season number (important the type is really "string" to be able to indicate absence of season with "")
* `media.episode`         - (common.type=string) episode number (important the type is really "string" to be able to indicate absence of episode with "")
* `media.mute.group`      - (common.type=boolean) mute of group of devices
* `media.tts`             - text to speech
* `media.bitrate`         - kbps
* `media.genre`           - genre song
* `media.date`            - year song
* `media.track`           - (common.type=string) current play track id [0 - ~] (important the type is really "string" to be able to indicate absence of track with "")
* `media.playid`          - media player track id
* `media.add`             - add current playlist
* `media.clear`           - clear current playlist (write-only)
* `media.playlist`        - json array like
* `media.url`             - url to play or current url
* `media.url.announcement` - URL to play announcement
* `media.jump`            - Number of items to jump in the playlist (it can be negative)
* `media.content`         - Type of media being played such as audio/mp3
* `media.link`            - State with the current file
* `media.input`           - number or string of input (AUX, AV, TV, SAT, ...)
* `level.bass`            - Bass level
* `level.treble`          - Treble level
* `switch.power.zone`     - power zone

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

* `media.browser`         - json array like "files"

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
* `value.temperature`           - Actual temperature
* `value.temperature.windchill` - Actual wind chill
* `value.temperature.dewpoint`  - Actual dew-point
* `value.temperature.feelslike` - Actual temperature "feels like"
* `value.temperature.min`       - Minimal temperature in last 24h
* `value.temperature.max`       - Maximal temperature in last 24h
* `value.humidity`              - actual or average humidity
* `value.humidity.min`          - actual humidity
* `value.humidity.max`          - actual humidity
* `value.speed.wind`            - actual or average wind speed
* `value.speed.max.wind`        - maximal wind speed in last 24h
* `value.speed.min.wind`        - minimal wind speed in last 24h
* `value.speed.wind.gust`       - actual wind gust speed
* `value.direction.wind`        - actual or average wind direction in degrees
* `value.direction.max.wind`    - actual wind direction in degrees
* `value.direction.min.wind`    - actual wind direction in degrees
* `weather.direction.wind`      - actual or average wind direction as text, e.g. NNW
* `date`                        - actual date or date of last read information
* `date.sunrise`                - Sunrise for today
* `date.sunset`                 - Sunset for today
* `dayofweek`                   - day of week as text
* `location`                    - Text description of location (e.g. address)
* `weather.icon`                - Actual state icon URL for now
* `weather.icon.wind`           - Actual wind icon URL for now
* `weather.icon.name`           - Actual state icon name for now
* `weather.state`               - Actual weather description
* `value.precipitation`         - (type: number, unit: mm) precipitation for last 24 hours rain/snow (Niederschlag heute für Schnee oder Regen / осадки сегодня снега или дождя)
* `value.precipitation.hour`    - Actual precipitation level in last hour
* `value.precipitation.today`   - Actual precipitation level for today (till 0:00)
* `value.precipitation.chance`  - Actual precipitation chance for today
* `value.precipitation.type`    - Actual precipitation type for today. (type: `number`) States: 0 - NO, 1 - RAIN, 2 - SNOW, 3 - HAIL
* `value.radiation`             - Actual sun radiation level
* `value.uv`                    - Actual UV level
* `value.clouds`                - Clouds on the sky. 0% - no clouds, 100% - many clouds.
* `value.rain`                  - Actual rain level in last 24 hours
* `value.rain.hour`             - Actual rain level in last hour
* `value.rain.today`            - Actual rain level for today (till 0:00)
* `value.snow`                  - Actual snow level in last 24 hours
* `value.snow.hour`             - Actual snow level in last hour
* `value.snow.today`            - Actual snow level for today (till 0:00)
* `value.snowline`              - Actual snow line in meters
* `weather.chart.url`           - URL to chart for weather history
* `weather.chart.url.forecast`  - URL to chart for weather forecast
* `weather.html`                - HTML object with weather description
* `weather.title`               - Very short description
* `weather.title.short`         - Very, very short description (One word)
* `weather.type`                - Type of weather information
* `weather.json`                - JSON object with specific data
* `value.speed.wind.forecast.0`     - wind speed forecast for today
* `weather.state.forecast.0`        - Weather description for today
* `value.direction.wind.forecast.0` - wind direction forecast for today in degrees
* `weather.direction.wind.forecast.0` - wind direction forecast for today as text
* `value.pressure.forecast.0`       - forecast for pressure for today
* `value.temperature.min.forecast.0`  - Min temperature forecast for today
* `value.temperature.max.forecast.0`  - Max temperature forecast for today
* `value.precipitation.forecast.0`  - (type: number, unit: %) Forecast of precipitation chance for today
* `value.precipitation.forecast.0`  - (type: number, unit: mm) Forecast of precipitation level for today
* `weather.title.forecast.0`        - Very short description for tomorrow
* `value.precipitation.day.forecast.0`     - Forecast for precipitation for day time
* `value.precipitation.night.forecast.0`   - Forecast for precipitation for nighttime

* `date.forecast.1`                 - tomorrow date
* `weather.icon.forecast.1`         - tomorrow icon
* `weather.state.forecast.1`        - tomorrow weather state
* `value.temperature.min.forecast.1`
* `value.temperature.max.forecast.1`
* `value.precipitation.forecast.1`  - (type: number, unit: %) Forecast of precipitation chance for tomorrow
* `value.precipitation.forecast.1`  - (type: number, unit: mm) Forecast of precipitation level for tomorrow
* `value.direction.wind.forecast.1`
* `value.speed.wind.forecast.1`
* `value.pressure.forecast.1`

## Info
* `info.ip`        - ip of device
* `info.mac`       - mac of device
* `info.name`      - name of device
* `info.address`   - some other address (e.g. KNX)
* `info.port`      - tcp port
* `info.standby`   - true if device in standby mode
* `info.status`    - status of device
* `info.display`   - information shown on device display
* `date.start`     - string or number
* `date.end`       - string or number

## Health
`common.type=number, common.read=true, common.write=false`

* `value.health.fat`      - body fat index in %
* `value.health.weight`   - body weight in kg, lbs
* `value.health.bmi`      - bmi index
* `value.health.calories` - burned calories
* `value.health.steps`    - steps done
* `value.health.bpm`      - heart beats per minute

## Others
* `url`
* `url.icon`               - icon (additionally every object can have common.icon)
* `url.cam`                - web camera url
* `url.blank`              - open URL in new window
* `url.same`               - open URL in this window
* `url.audio`              - URL for audio file
* `text.phone`             - phone number

* `adapter.messagebox`     (common.type=object, common.write=true) used to send messages to email, pushover and other adapters
* `adapter.wakeup`         (common.type=boolean, common.write=true) wake up adapter from suspended mode
