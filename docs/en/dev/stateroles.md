# State roles

Objects from type `state` need their `common.role` property set to one of the roles defined in the list below. 
The Role information is a very important information and allows Visualization- and Smart-Assistant adapters 
to detect the function of the object and also how/if they relate to other objects in the same channel, device or folder.

## State role types
The following State Role types exist:

### Operative States
Operative states are used to control the normal functionality of a device. An RGB Lamp can have the following three objects (or more) with different roles that belong together:
* `switch` (On/Off)
* `level.color.rgb` with #RRGGBB color code of the lamp
* `level.brightness` with the brightness value

Also, the cleaning mode or the room-to-clean of a robotic vacuum cleaner is such an operative state. These states are using the below definition without any adjustments.

Please use the most detailed role name possible that provide the most details (e.g. `level.color.temperature` should be used over `level` for the color temperature, or `switch.power` is better than `switch` to operate the power of a device).
Additionally, when using detailed role names (more than one level), it is important not to use the same role twice in a channel of a device.

Different Device templates used for the detecting with the required and optional objects and their roles can be found 
in the [Type-detector repository](https://github.com/ioBroker/ioBroker.type-detector/blob/master/DEVICES.md).

### Configuration/Setting States
States that are configuring further "Non-operative" settings of the devices can also use the below basic role definitions to give more context of the type and usage of the provided value, **but add a ".setting." as second level of the role name**. For example:
* `level.setting.color.temperature` with a 0..100% number can be used to set the "Startup ColorTemperature" of a light bulb
* `switch.setting` (On/Off) could be used to define setting that can be turned on or off (e.g. child lock functionality)

User Interfaces might use these special roles to determine device settings and show then in a "Settings" dialog for the device, or ignore them.

Please note: These types of roles were defined in June 2025, so many (older) adapters might not use them. In the future this state type can/should be used when relevant.

### Generic States

If no detailed matching role can be found or the use case is not specific then you can fall back to us the below defined **Common** roles.

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
* `sensor.alarm.co`       - carbon monoxide detected
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

Buttons normally do not have a value and are only used to send an event (TRUE) when pressed, therefore the attribute read-flag must be FALSE.
User interfaces should not read the value of this state nor expect it to be reset to "FALSE" after the action was executed or such.
Button events triggering onChange on an adapter should be confirmed with ACK = TRUE to show the event has been recognized and processed.

* `button`
* `button.long`
* `button.stop`           - e.g. rollo stop,
* `button.stop.blind`     - stop the motion of a blind (device types `blind`, `blindButtons`)
* `button.stop.tilt`
* `button.start`
* `button.resume`
* `button.open.door`
* `button.open.window`
* `button.open.blind`
* `button.open.tilt`
* `button.close.blind`
* `button.close.tilt`
* `button.open`            - open a blind. The type detector accepts it as an equivalent of `button.open.blind`, but the more detailed role is preferred
* `button.close`          - close a blind. The type detector accepts it as an equivalent of `button.close.blind`, but the more detailed role is preferred
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
`common.type=number, common.write=false` (`common.type=string, common.write=false` where specified explicitly)

* `value`
* `value.window`      (`common.states={"0": "CLOSED", "1": "TILTED", "2": "OPEN"}`) It is important to have (`CLOSED/TILTED/OPEN`). Values can differ.
* `value.temperature` (`common.unit='°C' or '°F' or 'K'`)
* `value.temperature.dewpoint` (`common.unit='°C' or '°F')
* `value.humidity` relative humidity, same as `value.humidity.relative` (unit: %)
* `value.humidity.relative` - (unit: %)
* `value.humidity.absolute` - (unit: g/m³, mg/m³)
* `value.co`              - Carbon monoxide (unit: ppm)
* `value.co2`             - Carbon dioxide (unit: ppm)
* `value.no`              - Nitrogen monoxide (unit: µg/m³ or ppm)
* `value.no2`             - Nitrogen dioxide (unit: µg/m³ or ppm)
* `value.o3`              - Ozone (unit: µg/m³ or ppm)
* `value.ch2o`            - Formaldehyde (unit: µg/m³)
* `value.pm1`             - Particulate matter PM1 (unit: µg/m³)
* `value.pm25`            - Particulate matter PM2.5 (unit: µg/m³)
* `value.pm10`            - Particulate matter PM10 (unit: µg/m³)
* `value.rn`              - Radon (unit: Bq/m³)
* `value.tvoc`            - Total volatile organic compounds (unit: µg/m³ or ppb)
* `value.airquality`      - Air quality index (AQI)
* `value.so2`             - Sulphur dioxide (unit: µg/m³ or ppm)
* `value.co.level`, `value.co2.level`, `value.no2.level`, `value.o3.level`, `value.ch2o.level`, `value.pm1.level`, `value.pm25.level`, `value.pm10.level`, `value.rn.level`, `value.tvoc.level`, `value.so2.level` - qualitative level of the concentration of the same name (`common.states={"0": "UNKNOWN", "1": "LOW", "2": "MEDIUM", "3": "HIGH", "4": "CRITICAL"}`)
* `value.brightness`      - luminance level (unit: lux)
* `value.dimmer`          - actual dimming level in % (device type `dimmer`)
* `value.volume`          - actual sound volume in % (device types `media`, `volume`)
* `value.volume.group`    - actual sound volume of a group of devices in % (device type `volumeGroup`)
* `value.min`
* `value.max`
* `value.default`
* `value.battery`         - battery level
* `value.valve`           - valve level
* `value.filter`          - remaining condition of a filter (unit: %)
* `value.filter.carbon`   - remaining condition of an activated carbon filter (unit: %)
* `value.flow`            - flow rate of a liquid or a gas (unit: m³/h)
* `value.rssi`            - received signal strength of a radio device (unit: dBm)
* `value.time`            - getTime() of Date() object
* `value.timer`           - duration in s (r/o equivalent to `level.timer`)
* `value.interval`    (common.unit='sec') - Interval in seconds (can be 0.1 or less)
* ~~value.date        (common.type=string) - Date in form 2015.01.01 (without time)~~
* ~~value.datetime    (common.type=string) - Date and time in system format~~
* `value.gps.longitude`   - gps longitude coordinates
* `value.gps.latitude`    - gps latitude
* `value.gps.elevation`   - gps elevation
* `value.gps`             - longitude and latitude together like '5.56;43.45'  (`common.type=string`)
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
* `value.open.tilt`       - accepted variant of `value.tilt`. Prefer `value.tilt` for new adapters
* `value.lock`            - actual position of lock
* `value.speed`           - wind speed
* `value.pressure`        - (unit: mbar, `hPa` is the same value and is accepted too)
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
* `indicator.working.test` - a self test of the device is in progress
* `indicator.reachable`   - If a device is online
* `indicator.connected`   - used only for instances. Use `indicator.reachable` for devices
* `indicator.direction`   - `true` - up/open, `false` - down/close. Use better `value.direction`
* `indicator.error`       - true if any error condition exists
* `indicator.maintenance` - indicates system warnings/errors, alarms, service messages, battery empty or stuff like that
* `indicator.maintenance.lowbat`
* `indicator.maintenance.unreach`
* `indicator.maintenance.filter` - the filter of the device has to be changed
* `indicator.maintenance.alarm`
* `indicator.lowbat`      - true if low battery
* `indicator.alarm`       - same as indicator.maintenance.alarm
* `indicator.alarm.fire`  - fire detected
* `indicator.alarm.flood` - flood detected
* `indicator.alarm.secure` - door or window is opened
* `indicator.alarm.health` - health problem
* `indicator.alarm.muted` - the alarm of the device is currently muted

### Levels (numbers, read-write)
`common.type=number, common.write=true`(`common.type=string, common.write=true` where specified explicitly)

With **levels**, you can control or set some number value.

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
* `level.temperature.heating` - desired temperature for heating, for devices that hold a heating and a cooling setpoint at once
* `level.temperature.cooling` - desired temperature for cooling, for devices that hold a heating and a cooling setpoint at once
* `level.valve`           - set point for valve position
* `level.color.red`
* `level.color.green`
* `level.color.blue`
* `level.color.white`     - rgbW
* `level.color.hue`       - color in ° `0-360; 0=red, 120=green, 240=blue, 360=red(cyclic)`
* `level.color.saturation`
* `level.color.rgb`       - hex color like `#rrggbb` (`common.type=string`)
* `level.color.rgbw`      - hex color like `#rrggbbww` (`common.type=string`)
* `level.color.cie`       - cie color in form `[x, y]` (`common.type=string`)
* `level.color.luminance`
* `level.color.temperature` - color temperature in K° `2200 warm-white, 6500° cold white`
* `level.effect`          - effect, usually for lights. Should have list of possible effects in `common.states`. (`common.type=string`).
* `level.timer`
* `level.timer.sleep`    - sleep timer. 0 - off, or in minutes
* `level.timer.off`      - time in seconds after which the device switches itself off again, e.g. the on-time of a lamp or a socket
* ...
* `level.volume`         - (`min=0, max=100`) - sound volume, but min, max can differ. min < max
* `level.volume.group`   - (`min=0, max=100`) - sound volume, for the group of devices
* `level.curtain`        - set the curtain position
* `level.tilt`           - set the tilt position of blinds (max = fully opened, min = fully closed)
* `level.open.tilt`      - accepted variant of `level.tilt`. Prefer `level.tilt` for new adapters
* `level.speed`          - speed eg. fan, ventilator, .. Also used as the continuous fan speed in % of an air conditioner, fan or air purifier, where the stepped counterpart is `level.mode.fan`
* `level.pump`           - speed or flow setpoint of a pump (unit: %)

### Switches (booleans, read-write)
Switch controls a boolean device (`true = ON, false = OFF`)

`common.type=boolean, common.write=true`

* `switch`
* `switch.lock`           - lock (`true - open lock, false - close lock`)
* `switch.lock.door`      - door lock
* `switch.lock.window`    - window lock
* `switch.mode.boost`     - start/stop boost mode of thermostat
* `switch.boost`          - start/stop boost mode. Older variant of `switch.mode.boost`, still accepted (device type `airCondition`)
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
* `switch.pump`           - on/off of a pump. A dedicated role, because a pump has no other mandatory state and could not be told apart from a socket otherwise

### Air condition or thermostat
* `level.mode.fan`        - `AUTO, HIGH, LOW, MEDIUM, QUIET, TURBO`
* `level.mode.swing`      - `AUTO, HORIZONTAL, STATIONARY, VERTICAL`
* `level.mode.airconditioner` - air conditioner: `AUTO, COOL, DRY, ECO, FAN_ONLY, HEAT, OFF`, heating thermostat: `AUTO, MANUAL, VACATION`, 
* `level.mode.thermostat` - thermostat: `AUTO, MANUAL, VACATION`,
* `level.mode.airflow`    - airflow direction: `FORWARD, REVERSE`
* `switch.mode.swing`     - boolean variant of `level.mode.swing` for devices that can only switch the swing on and off
* `value.mode.thermostat` - what the device is actually doing, read-only: `OFF, HEAT, COOL`. The read-only counterpart of `level.mode.thermostat`
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
* `vacuum.map.base64`     - map of the cleaned area as a base64 encoded image (`common.type=string`)
* `value.usage.filter`    - remaining life of the filter in %
* `value.usage.brush`     - remaining life of the main brush in %
* `value.usage.brush.side` - remaining life of the side brush in %
* `value.usage.sensors`   - remaining time in % until the sensors have to be cleaned
* `indicator.maintenance.water` - the water tank has to be filled
* `level.mode.vacuum`     - run mode of a robotic vacuum: `IDLE, CLEANING, MAPPING` and vendor modes. The cleaning intensity is `level.mode.cleanup`
* `button.home`           - send the device back to its dock
* `value.progress`        - progress of the running job (unit: %)
* `value.vacuum.phase`    - current phase reported by the device (`common.type=string`)

Additionally, to these states normally the `switch.power` required to map the vacuum cleaner. `switch.power` in this case works as: `true` - clean, `false` - back to home.
Optionally `value.battery` and  

### Gate
* `switch.gate`           - closes(false) or opens(true) the gate (required)
* `value.position`        - position of the gate in percent (100% opened, 0% - closed)
* `value.gate`            - same as `value.position`
* `button.stop`           - stop the motion of the gate
* `indicator.opened`      - end contact: the gate is fully opened
* `indicator.closed`      - end contact: the gate is fully closed. Both contacts exist separately, because a gate can also stand between fully opened and fully closed

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
* `media.player.name`     - name of the player (`common.type=string`)
* `media.player.type`     - type of the player, e.g. the model (`common.type=string`)
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
* `date`                        - actual date or date of last-read information
* `date.forecast.1`                 - tomorrow date
* `date.forecast.0`                 - today date
* `dayofweek.forecast.0`            - day of week of today as text
* `date.sunrise`                - Sunrise for today
* `date.sunset`                 - Sunset for today
* `date.sunrise.forecast.0`     - Sunrise of the forecast for today. `date.sunrise.forecast.1` for tomorrow and so on
* `date.sunset.forecast.0`      - Sunset of the forecast for today. `date.sunset.forecast.1` for tomorrow and so on
* `time.sunrise`, `time.sunset` - accepted variants of `date.sunrise` / `date.sunset`, including the `.forecast.<n>` forms. Prefer the `date.*` roles for new adapters
* `dayofweek`                   - day of week as text
* `location`                    - Text description of location (e.g., address)
* `value.clouds`                - Clouds on the sky. 0% - no clouds, 100% - many clouds.
* `value.direction.max.wind`    - actual wind direction in degrees
* `value.direction.min.wind`    - actual wind direction in degrees
* `value.direction.wind`        - actual or average wind direction in degrees
* `value.direction.wind.forecast.0` - wind direction forecast for today in degrees
* `value.direction.wind.forecast.1` - wind direction forecast for tomorrow in degrees
* `value.humidity`              - actual or average humidity
* `value.humidity.max`          - actual humidity
* `value.humidity.forecast.0`   - humidity forecast for today. `value.humidity.forecast.1` for tomorrow and so on
* `value.humidity.max.forecast.0` - maximum humidity forecast for today. `value.humidity.max.forecast.1` for tomorrow and so on
* `value.temperature.forecast.0` - temperature forecast for today
* `value.temperature.feelslike.forecast.0` - felt temperature forecast for today
* `value.temperature.windchill.forecast.0` - wind chill forecast for today
* `value.pressure.tendency`     - tendency of the air pressure as text, e.g. `up`, `down`, `stable` (`common.type=string`)
* `value.humidity.min`          - actual humidity
* `value.precipitation`         - (`type: number, unit: mm`) precipitation for last 24 hours rain/snow (Niederschlag heute für Schnee oder Regen / осадки сегодня снега или дождя)
* `value.precipitation.chance`  - Actual precipitation chance for today
* `value.precipitation.day.forecast.0`     - Forecast for precipitation for daytime
* `value.precipitation.forecast.0`  - (`type: number, unit: %`) Forecast of precipitation chance for today
* `value.precipitation.forecast.0`  - (`type: number, unit: mm`) Forecast of precipitation level for today
* `value.precipitation.forecast.1`  - (`type: number, unit: %`) Forecast of precipitation chance for tomorrow
* `value.precipitation.forecast.1`  - (`type: number, unit: mm`) Forecast of precipitation level for tomorrow
* `value.precipitation.hour`    - Actual precipitation level in last hour
* `value.precipitation.night.forecast.0`   - Forecast for precipitation for nighttime
* `value.precipitation.today`   - Actual precipitation level for today (till 0:00)
* `value.precipitation.type`    - Actual precipitation type for today. (`type: number`) States: 0 - NO, 1 - RAIN, 2 - SNOW, 3 - HAIL
* `value.pressure.forecast.0`       - forecast for pressure for today
* `value.pressure.forecast.1`
* `value.radiation`             - Actual sun radiation level
* `value.rain`                  - Actual rain level in last 24 hours
* `value.rain.hour`             - Actual rain level in last hour
* `value.rain.today`            - Actual rain level for today (till 0:00)
* `value.snow`                  - Actual snow level in last 24 hours
* `value.snow.hour`             - Actual snow level in last hour
* `value.snow.today`            - Actual snow level for today (till 0:00)
* `value.snowline`              - Actual snow line in meters
* `value.speed.max.wind`        - maximal wind speed in last 24h
* `value.speed.min.wind`        - minimal wind speed in last 24h
* `value.speed.wind`            - actual or average wind speed
* `value.speed.wind.forecast.0`     - wind speed forecast for today
* `value.speed.wind.forecast.1`     - wind speed forecast for tomorrow
* `value.speed.wind.gust`       - actual wind gust speed
* `value.temperature`           - Actual temperature
* `value.temperature.dewpoint`  - Actual dew-point
* `value.temperature.feelslike` - Actual temperature "feels like"
* `value.temperature.max`       - Maximal temperature in last 24h
* `value.temperature.max.forecast.0`  - Max temperature forecast for today
* `value.temperature.max.forecast.1`  - Max temperature forecast for tomorrow
* `value.temperature.min`       - Minimal temperature in last 24h
* `value.temperature.min.forecast.0`  - Min temperature forecast for today
* `value.temperature.min.forecast.1`  - Min temperature forecast for tomorrow
* `value.temperature.windchill` - Actual wind chill
* `value.uv`                    - Actual UV level
* `weather.chart.url`           - URL to chart for weather history
* `weather.chart.url.forecast`  - URL to chart for weather forecast
* `weather.direction.wind`      - actual or average wind direction as text, e.g., NNW
* `weather.direction.wind.forecast.0` - wind direction forecast for today as text
* `weather.html`                - HTML object with weather description
* `weather.icon`                - Actual state icon URL for now
* `weather.icon.forecast.0`     - state icon URL of the forecast for today
* `weather.icon.wind.forecast.0` - wind icon URL of the forecast for today
* `weather.icon.forecast.1`         - tomorrow icon
* `weather.icon.name`           - Actual state icon name for now
* `weather.icon.wind`           - Actual wind icon URL for now
* `weather.json`                - JSON object with specific data
* `weather.state`               - Actual weather description
* `weather.state.forecast.0`        - Weather description for today
* `weather.state.forecast.1`        - tomorrow weather state
* `weather.title`               - Very short description
* `weather.title.forecast.0`        - Very short description for tomorrow
* `weather.title.short`         - Very, very short description (One word)
* `weather.type`                - Type of weather information

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

Roles of a camera (device type `camera`):

* `link.camera`           - URL of the camera image (`common.type=string`)
* `level.camera.position` - pan, tilt and zoom position of the camera
* `switch.camera.autofocus` - autofocus on/off
* `switch.camera.autowhitebalance` - automatic white balance on/off
* `switch.camera.brightness` - brightness correction on/off
* `switch.camera.nightmode` - night mode on/off

Role of an image (device type `image`):

* `icon`                  - URL of an image or an icon (`common.type=string`)
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

## Deprecated role aliases

The [type detector](https://github.com/ioBroker/ioBroker.type-detector) still accepts the roles listed below so that
existing adapters keep working, but they are **deprecated**. Do not use them in new adapters, and migrate them when you
touch an old adapter. Every alias has a documented replacement in the tables below.

### Buttons: the `action.*` namespace

The whole `action.*` namespace is an old spelling of `button.*`. The detector matches `button` and `action` alike.

| Deprecated                                                                 | Use instead                                                                |
|----------------------------------------------------------------------------|----------------------------------------------------------------------------|
| `action.play`, `action.pause`, `action.stop`, `action.next`, `action.prev` | `button.play`, `button.pause`, `button.stop`, `button.next`, `button.prev` |
| `action.home`                                                              | `button.home`                                                              |
| `action.open`, `action.open.blind`                                         | `button.open.blind`                                                        |
| `action.close`, `action.close.blind`                                       | `button.close.blind`                                                       |
| `action.open.tilt`, `action.close.tilt`, `action.stop.tilt`                | `button.open.tilt`, `button.close.tilt`, `button.stop.tilt`                |
| `action.stop.blind`                                                        | `button.stop.blind`                                                        |

### Sensors and alarms with a `state.` prefix or without `.alarm`

| Deprecated                                                            | Use instead                                               |
|-----------------------------------------------------------------------|-----------------------------------------------------------|
| `state.window`                                                        | `sensor.window`                                           |
| `state.door`                                                          | `sensor.door`                                             |
| `state.fire`, `state.alarm.fire`, `sensor.fire`, `indicator.fire`     | `sensor.alarm.fire`                                       |
| `state.flood`, `state.alarm.flood`, `sensor.flood`, `indicator.flood` | `sensor.alarm.flood`                                      |
| `state.co`, `state.alarm.co`, `sensor.co`                             | `sensor.alarm.co`                                         |
| `motion`, `state.motion`                                              | `sensor.motion`                                           |
| `state.light`                                                         | `sensor.light` (read-only) or `switch.light` (read-write) |
| `state.active`                                                        | `sensor.switch`                                           |

### Indicators

| Deprecated                                           | Use instead                     |
|------------------------------------------------------|---------------------------------|
| `indicator.battery`, `indicator.maintenance.battery` | `indicator.maintenance.lowbat`  |
| `indicator.unreach`                                  | `indicator.maintenance.unreach` |

### Switches

| Deprecated                | Use instead                      |
|---------------------------|----------------------------------|
| `switch.active`           | `switch`                         |
| `switch.party`            | `switch.mode.party`              |
| `switch.boost`            | `switch.mode.boost`              |
| `switch.autofocus`        | `switch.camera.autofocus`        |
| `switch.autowhitebalance` | `switch.camera.autowhitebalance` |
| `switch.brightness`       | `switch.camera.brightness`       |
| `switch.nightmode`        | `switch.camera.nightmode`        |

### Levels and values

| Deprecated                                             | Use instead                                                          |
|--------------------------------------------------------|----------------------------------------------------------------------|
| `level.thermostat`                                     | `level.mode.thermostat`                                              |
| `value.latitude`, `value.longitude`, `value.elevation` | `value.gps.latitude`, `value.gps.longitude`, `value.gps.elevation`   |
| `value.radius`, `value.accuracy`                       | `value.gps.radius`, `value.gps.accuracy`                             |
| `value.brush`, `value.brush.side`, `value.sensors`     | `value.usage.brush`, `value.usage.brush.side`, `value.usage.sensors` |

### Media

| Deprecated | Use instead  |
|------------|--------------|
| `media`    | `media.mute` |
