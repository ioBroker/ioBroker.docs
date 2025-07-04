# State roles

Objects from type `state` need their `common.role` property set to one of the roles defined in the list below. 
The Role information is a very important information and allows Visualization- and Smart-Assistant adapters 
to detect the function of the object and also how/if they relate to other objects in the same channel, device or folder.

## State role types
The following State Role types exist:

### Operative States
Operative states are used to control the normal functionality of a device. A RGB Lamp can have the following three objects (or more) with different roles that belong together:
* `switch` (On/Off)
* `level.color.rgb` with #RRGGBB color code of the lamp
* `level.brightness` with the brightness value

Also the cleaning mode or the room-to-clean of a robotic vacuum cleaner is such an operative state. These states are using the below definition witout any adjustments.

Please use the most detailed role name possible that provide the most details (e.g. `level.color.temperature` should be used over `level` for the color temperature, or `switch.power` is better than `switch` to operate the power of a device).
Additionally, when using detailed role names (more than one level), it is important not to use the same role twice in a channel of a device.

Different Device templates used for the detecting with the required and optional objects and their roles can be found 
in the [Type-detector repository](https://github.com/ioBroker/ioBroker.type-detector/blob/master/DEVICES.md).

### Configuration/Setting States
States that are configuring further "Non-operative" settings of the devices can also use the below basic role definitions to give more context of the type and usage of the provided value, **but add a ".setting." as second level of the role name**. For example:
* `level.setting.color.temperature` with a 0..100% number can be used to set the "Startup ColorTemperature" of a light bulb
* `switch.setting` (On/Off) coud be used to define setting that can be turned on or off (e.g. child lock functionality)

User Interfaces might use these special roles to determine device settings and show then in a "Settings" dialog for the device, or ignore them.

Please note: These types of roles were defined in June 2025, so many (older) adapters might not use them. In the future this state type can/should be used when relevant.

### Generic States

If no detailed matching role can be found or the usecase is not specific then you can fallback to us the below defined **Common** roles.

## State role categories

### Common
* `state` - very common purpose. If you don't know which role the state has, use this one.
* `text`              `common.type = string`
* `text.url`          `common.type = string` state val contains an url for usage in an anchor, iframe or img
* `html`              `common.type = string`
* `json`              `common.type = string`
* `list`              `common.type = array`
* `date`              `common.type = string` - parsable by `new Date(ddd)` string
* `date`              `common.type = number` - `epoch seconds * 1000`

### Sensor (booleans, read-only)
`common.type=boolean, common.write=false`

* `sensor`                - generic sensor state to represent a status: active - `true` or inactive `false`
* `sensor.contact`        - general contact: open - `true` or closed -`false`
* `sensor.window`         - window opened-`true` or closed-`false`
* `sensor.door`           - door opened-`true` or closed-`false`
* `sensor.alarm`          - some common alarm
* `sensor.alarm.flood`    - water leakage
* `sensor.alarm.fire`     - fire sensor
* `sensor.alarm.secure`   - door opened, window opened or motion detected during alarm is ON.
* `sensor.alarm.power`    - No power (`voltage = 0`)
* `sensor.light`          - feedback from the lamp, that it is ON
* `sensor.lock`           - actual position of lock: unlocked - `true` or locked - `false`
* `sensor.motion`         - motion sensor
* `sensor.rain`           - rain detected
* `sensor.noise`          - noise detected
* `sensor.switch`         - switch status: on - `true` or off - `false`

### Buttons (booleans, write-only)
`common.type=boolean, common.write=true, common.read=false`

* `button`
* `button.long`
* `button.stop`           - e.g. rollo stop,
* `button.stop.tilt`
* `button.start`
* `button.resume`
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

### Buttons as sensor
`common.type=boolean, common.write=false, common.read=true`

* `button`         - the difference, that `common.write=false`. Please avoid this role and use `button.press` or `button.long`.
* `button.long`
* `button.press`

### Values (numbers, read-only)
`common.type=number, common.write=false`

* `value`
* `value.window`      (`common.states={"0": "CLOSED", "1": "TILTED", "2": "OPEN"}`) It is important to have (`CLOSED/TILTED/OPEN`). Values can differ.
* `value.temperature` (`common.unit='°C' or '°F' or 'K'`)
* `value.humidity`
* `value.co2`             - CO2 (unit: ppm)
* `value.brightness`      - luminance level (unit: lux)
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
* `value.gps.accuracy`    - accuracy of current gps measurement
* `value.gps.radius`      - radius of current gps measurement
* ~~`value.power.consumption` - energy consumption (unit=Wh or KWh)~~
* ~~`value.power.production` - energy production (unit=Wh or KWh)~~
* `value.energy`          - energy (unit=Wh, kWh or m3 for gasoline) 
* `value.energy.active`   - active energy (unit=Ws, Wh, kWh)
* `value.energy.reactive` - reactive energy (unit=vars, kVarh)
* `value.energy.consumed` - energy consumed (unit=Ws, Wh, kWh)
* `value.energy.produced` - power produced (unit=Ws, Wh or kWh)
* `value.power`           - energy power (unit=W or kW)
* `value.power.active`    - active power (unit=W, kW)
* `value.power.reactive`  - reactive power (unit=var, kVar)
* `value.power.consumed`  - power consumed (unit=W or kW)
* `value.power.produced`  - power produced (unit=W or kW)
* `value.direction`       - (common.type=number, indicates up/down, left/right, 4-way switches, wind-direction, ... 0 - nothig, 1 - up/opening, 2 - down/closing, 3 - undefined)
* `value.curtain`         - actual position of curtain
* `value.blind`           - actual position of the blind (`max = fully open, min = fully closed`)
* `value.tilt`            - actual tilt position (`max = fully open, min = fully closed`)
* `value.lock`            - actual position of lock
* `value.speed`           - wind speed
* `value.pressure`        - (unit: mbar)
* `value.distance`
* `value.distance.visibility`
* `value.severity`        - some severity (states can be provided), Higher is more important
* `value.warning`         - some warning (states can be provided), Higher is more important
* `value.sun.elevation`   - sun elevation in °
* `value.sun.azimuth`     - sun azimuth in °
* `value.voltage`         - Voltage in Volt, `unit=V`
* `value.current`         - Current in Ampere, `unit=A`
* `value.frequency`       - Frequency in Hz, `unit=Hz`
* `value.fill`            - Fill level, `unit=l,ml,m3,%`
* `value.blood.sugar`     - Blood sugar value, `unit=mmol,mgdl`

### Indicators (boolean, read-only)
`common.type=boolean, common.write=false`

The difference of *Indicators* from *Sensors* is that indicators will be shown as small icon. Sensors as a real value.
So the indicator may not be alone in the channel. It must be some other main state inside a channel.

* `indicator`
* `indicator.working`     - indicates that the target system is executing something, like blinds or lock opening.
* `indicator.reachable`   - If a device is online
* `indicator.connected`   - used only for instances. Use `indicator.reachable` for devices
* `indicator.direction`   - `true` - up/open, `false` - down/close. Use better `value.direction`
* `indicator.error`       - true if any error condition exists
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

### Levels (numbers, read-write)
With **levels**, you can control or set some number value.

`common.type=number, common.write=true`

* `level`
* `level.humidity`        - humidity as a setpoint, i.e., for humidifiers / climate controls
* `level.battery`         - battery target voltage / capacity i.e.for loading
* `level.battery.min`     - battery minimum voltage / capacity
* `level.battery.max`     - battery maximum voltage / capacity
* `level.valve`           - opening value for valves
* `level.pressure`        -
* `level.pressure.min`    - minimum air or oil pressure value allowed
* `level.pressure.max`    - maximum air or oil pressure value allowed
* `level.voltage`         - target voltage for generators
* `level.voltage.min`     - minimum voltage for generators
* `level.voltage.max`     - maximum voltage for generators
* `level.current`         - target current for i.e., loading battery devices
* `level.current.min`     - minimum current for i.e., loading battery devices
* `level.current.max`     - maximum current for i.e., loading battery devices 
* `level.frequency`       - target frequency for generators
* `level.frequency.min`   - minimum frequency for generators or for power grid alarms
* `level.frequency.max`   - maximum frequency for generators or for power grid alarms
* `level.fill`            - setpoint for any container fill level states 
* `level.brightness`      - luminance level (unit: lux)
* `level.min`             - minimum level allowed  
* `level.max`             - maximum level allowed
* `level.default`         - default level
* `level.dimmer`          - brightness is dimmer too
* `level.blind`           - set blind position (max = fully opened, min = fully closed)
* `level.temperature`     - set desired temperature
* `level.valve`           - set point for valve position
* `level.color.red`
* `level.color.green`
* `level.color.blue`
* `level.color.white`     - rgbW
* `level.color.hue`       - color in ° `0-360; 0=red, 120=green, 240=blue, 360=red(cyclic)`
* `level.color.saturation`
* `level.color.rgb`       - hex color like `#rrggbb` (`common.type=string`)
* `level.color.rgbw`      - hex color like `#rrggbbww` (`common.type=string`)
* `level.color.cie`       - cie color in form `[x, y]` (`common.type=string)
* `level.color.luminance`
* `level.color.temperature` - color temperature in K° `2200 warm-white, 6500° cold white`
* `level.timer`
* `level.timer.sleep`    - sleep timer. 0 - off, or in minutes
* ...
* `level.volume`         - (`min=0, max=100`) - sound volume, but min, max can differ. min < max
* `level.volume.group`   - (`min=0, max=100`) - sound volume, for the group of devices
* `level.curtain`        - set the curtain position
* `level.tilt`           - set the tilt position of blinds (max = fully opened, min = fully closed)
* `level.speed`          - speed eg. fan, ventilator, ..

### Switches (booleans, read-write)
Switch controls a boolean device (`true = ON, false = OFF`)

`common.type=boolean, common.write=true`

* `switch`
* `switch.lock`           - lock (`true - open lock, false - close lock`)
* `switch.lock.door`      - door lock
* `switch.lock.window`    - window lock
* `switch.mode.boost`     - start/stop boost mode of thermostat
* `switch.mode.party`     - start/stop party mode of thermostat
* `switch.power`          - on/off power, thermostat or air conditioner
* `switch.light`
* `switch.comfort`        - comfort mode
* `switch.enable`
* `switch.mode.`*
* `switch.mode.auto`      - auto mode on/off
* `switch.mode.manual`    - manual mode on/off
* `switch.mode.silent`    - silent mode on/off
* `switch.mode.moonlight` - moon light mode on/off
* `switch.mode.color`     - color mode on/off
* `switch.gate`           - closes(false) or opens(true) the gate

### Air condition or thermostat
* `level.mode.fan`        - `AUTO, HIGH, LOW, MEDIUM, QUIET, TURBO`
* `level.mode.swing`      - `AUTO, HORIZONTAL, STATIONARY, VERTICAL`
* `level.mode.airconditioner` - air conditioner: `AUTO, COOL, DRY, ECO, FAN_ONLY, HEAT, OFF`, heating thermostat: `AUTO, MANUAL, VACATION`, 
* `level.mode.thermostat` - thermostat: `AUTO, MANUAL, VACATION`,
* `value.mode.airconditioner` - current device state: `IDLE`, `HEAT, `COOL`  (0,1,2 in apple home) 
 Additionally to these states normally the `level.temperature` and `switch.power` required to map the air conditioner.

TODO: Think about ionization` and oscillation. 

### Vacuum cleaner
* `level.mode.cleanup`    - Enumeration of `AUTO, ECO, EXPRESS, NORMAL, QUIET`. Only `AUTO` and `NORMAL` are required. 
* `level.mode.work`       - Enumeration of `AUTO, FAST, MEDIUM, SLOW, TURBO`. Optional state.
* `value.water`           - 0-100% water level.
* `value.waste`           - 0-100% waste bin level. (0% - empty, 100% - full)
* `indicator.maintenance.waste` - Waste bin is fool.
* `value.state`           - `HOME, CLEANING, PAUSE` and so on.

Additionally, to these states normally the `switch.power` required to map the vacuum cleaner. `switch.power` in this case works as: `true` - clean, `false` - back to home.
Optionally `value.battery` and  

### Gate
* `switch.gate`           - closes(false) or opens(true) the gate (required)
* `value.position`        - position of the gate in percent (100% opened, 0% - closed)
* `value.gate`            - same as `value.position`
* `button.stop`           - stop the motion of the gate

### Media
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
* `media.seek`            - (`common.type=number`) %
* `media.mode.shuffle`    - (`common.type=number`) 0 - none, 1 - all, 2 - one
* `media.mode.repeat`     - (`common.type=boolean`)
* `media.state`           - `['play','stop','pause']` or `[0 - pause, 1 - play, 2 - stop]` or `[true - playing/false - pause]`
* `media.artist`
* `media.album`
* `media.title`
* `media.title.next`
* `media.cover`           - cover url
* `media.cover.big`       - big cover url
* `media.cover.small`     - tiny cover url
* `media.duration.text`   - e.g "2:35"
* `media.duration`        - (`common.type=number`) seconds
* `media.elapsed.text`    - e.g "1:30"
* `media.elapsed`         - (`common.type=number`) seconds
* `media.broadcastDate`   - (`common.type=string`) Broadcast date
* `media.mute`            - (`common.type=boolean`) true is muted
* `media.season`          - (`common.type=string`) season number (important the type is really "string" to be able to indicate absence of season with "")
* `media.episode`         - (`common.type=string`) episode number (important the type is really "string" to be able to indicate absence of episode with "")
* `media.mute.group`      - (`common.type=boolean`) mute of a group of devices
* `media.tts`             - text to speech
* `media.bitrate`         - kbps
* `media.genre`           - genre song
* `media.date`            - year song
* `media.track`           - (`common.type=string`) current play track id `[0 - ~]` (important the type is really `string` to be able to indicate absence of track with "")
* `media.playid`          - media player track id
* `media.add`             - add current playlist
* `media.clear`           - clear current playlist (write-only)
* `media.playlist`        - json array like
* `media.url`             - url to play or current url
* `media.url.announcement` - URL to play an announcement
* `media.jump`            - Number of items to jump in the playlist (it can be negative)
* `media.content`         - Type of media being played such as audio/mp3
* `media.link`            - State with the current file
* `media.input`           - number or string of input (AUX, AV, TV, SAT, ...)
* `level.bass`            - Bass level
* `level.treble`          - Treble level
* `switch.power.zone`     - power zone

```json
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

```json5
[
    {
        "fanart": "",
        "file": "", // smb://192.168.1.10/music/AtlantidaProject/
        "filetype": "", // directory
        "label": "",
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

### Weather
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
* `weather.direction.wind`      - actual or average wind direction as text, e.g., NNW
* `date`                        - actual date or date of last-read information
* `date.sunrise`                - Sunrise for today
* `date.sunset`                 - Sunset for today
* `dayofweek`                   - day of week as text
* `location`                    - Text description of location (e.g., address)
* `weather.icon`                - Actual state icon URL for now
* `weather.icon.wind`           - Actual wind icon URL for now
* `weather.icon.name`           - Actual state icon name for now
* `weather.state`               - Actual weather description
* `value.precipitation`         - (`type: number, unit: mm`) precipitation for last 24 hours rain/snow (Niederschlag heute für Schnee oder Regen / осадки сегодня снега или дождя)
* `value.precipitation.hour`    - Actual precipitation level in last hour
* `value.precipitation.today`   - Actual precipitation level for today (till 0:00)
* `value.precipitation.chance`  - Actual precipitation chance for today
* `value.precipitation.type`    - Actual precipitation type for today. (`type: number`) States: 0 - NO, 1 - RAIN, 2 - SNOW, 3 - HAIL
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
* `value.precipitation.forecast.0`  - (`type: number, unit: %`) Forecast of precipitation chance for today
* `value.precipitation.forecast.0`  - (`type: number, unit: mm`) Forecast of precipitation level for today
* `weather.title.forecast.0`        - Very short description for tomorrow
* `value.precipitation.day.forecast.0`     - Forecast for precipitation for daytime
* `value.precipitation.night.forecast.0`   - Forecast for precipitation for nighttime

* `date.forecast.1`                 - tomorrow date
* `weather.icon.forecast.1`         - tomorrow icon
* `weather.state.forecast.1`        - tomorrow weather state
* `value.temperature.min.forecast.1`
* `value.temperature.max.forecast.1`
* `value.precipitation.forecast.1`  - (`type: number, unit: %`) Forecast of precipitation chance for tomorrow
* `value.precipitation.forecast.1`  - (`type: number, unit: mm`) Forecast of precipitation level for tomorrow
* `value.direction.wind.forecast.1`
* `value.speed.wind.forecast.1`
* `value.pressure.forecast.1`

### Info
* `info.ip`        - IP of a device
* `info.mac`       - MAC address of a device
* `info.name`      - name of a device
* `info.address`   - some other address (e.g., KNX)
* `info.serial`    - serial number
* `info.firmware`  - firmware version
* `info.hardware`  - hardware version
* `info.port`      - tcp port
* `info.standby`   - true if device in standby mode
* `info.status`    - status of a device
* `info.display`   - information shown on device display
* `info.model`     - device model
* `date.start`     - string or number
* `date.end`       - string or number

### Health
`common.type=number, common.read=true, common.write=false`

* `value.health.fat`      - body fat index in %
* `value.health.weight`   - body weight in kg, lbs
* `value.health.bmi`      - bmi index
* `value.health.calories` - burned calories
* `value.health.steps`    - steps done
* `value.health.bpm`      - heart beats per minute

### Others
* `url`
* `url.icon`               - icon (additionally every object can have `common.icon`)
* `url.cam`                - web camera url
* `url.blank`              - open URL in a new window
* `url.same`               - open URL in this window
* `url.audio`              - URL for an audio file
* `text.phone`             - phone number
* `time.span`              - time difference in ms (common.type=number), i.e., time since last update, duration of operation, time until next try, ...
* `time.interval`          - intervall value in ms (common.type=number), i.e. some polling interval
* `time.timeout`           - timeout value in ms (common.type=number), i.e. timeouts for communication requests
* `chart`                  - JSON array with chart data, like `[{ts: 1678575600000, val: 1}, {ts: 1678579200000, val: 2}]`

* `adapter.messagebox`     (`common.type=object, common.write=true`) used to send messages to email, pushover and other adapters
* `adapter.wakeup`         (`common.type=boolean, common.write=true`) wake up adapter from suspended mode
