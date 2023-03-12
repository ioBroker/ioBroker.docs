![Logo](admin/loxone.png)

# ioBroker.loxone

[![NPM version](http://img.shields.io/npm/v/iobroker.loxone.svg)](https://www.npmjs.com/package/iobroker.loxone)
[![Downloads](https://img.shields.io/npm/dm/iobroker.loxone.svg)](https://www.npmjs.com/package/iobroker.loxone)
![Number of Installations (latest)](http://iobroker.live/badges/loxone-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/loxone-stable.svg)
[![Dependency Status](https://img.shields.io/david/UncleSamSwiss/iobroker.loxone.svg)](https://david-dm.org/UncleSamSwiss/iobroker.loxone)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/loxone/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

[![NPM](https://nodei.co/npm/iobroker.loxone.png?downloads=true)](https://nodei.co/npm/iobroker.loxone/)

**Tests:** ![Test and Release](https://github.com/UncleSamSwiss/ioBroker.loxone/workflows/Test%20and%20Release/badge.svg)

## loxone adapter for ioBroker

**_This adapter requires at least nodejs 10.x!_**

Fetches all information available in Loxone Miniserver (and Loxone Miniserver Go) and provides changes in realtime.

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Install

Install this adapter via ioBroker Admin:

1. Open instance config dialog
2. Enter the IP address or host name and HTTP port (80 by default) of your Loxone Miniserver
3. Create a new user in the Loxone Miniserver (using the Loxone Config application) to which you only give read and write rights to all required variables.
4. Enter this user's name and its password in the config dialog
5. Save the configuration
6. Start the adapter

## Configuration

### Miniserver Hostname / IP

This is the IP address or host name of your Loxone Miniserver or Miniserver Go.

### Miniserver Port

This is the HTTP port of your Loxone Miniserver.

By default the Miniserver is configured to listen on port 80, but you might have changed it.

### Miniserver Username

Provide a valid username to access the Loxone Miniserver.

It is strongly suggested to use a user different from "admin" for security reasons.

The user only needs read access to the variables you want to use from ioBroker.

### Miniserver Password

Provide the password for the given username (see above).

### Synchronize Names

This will update names in ioBroker whenever they change in the Loxone configuration.
If this is disabled, names will only be synchronized the first time a control is detected.

### Synchronize Rooms

This will populate the enum.rooms enumeration with all rooms provided by the Loxone Miniserver and will link all controls.

### Synchronize Functions

This will populate the enum.functions enumeration with all categories provided by the Loxone Miniserver and will link all controls.

### Weather Server

Choose what weather data you wish to synchronize:

-   "Don't synchronize weather data" will not synchronize anything related to the Weather Server
-   "Synchronize current weather only" will synchronize the data under "Actual"
-   "Synchronize 24 hours of weather forcast" will synchronize the current weather and 24 hours of weather forcast
-   "Synchronize entire weather forcast" will synchronize the current weather and the entire weather forcast (96 hours)

## States

The adapter automatically connects to the configured Loxone Miniserver and creates states for each control state it finds.

The IDs of the states are formatted like this: `loxone.<instance>.<control>.<state>`

-   `<instance>` is the ioBroker adapter instance index (usually "0")
-   `<control>` is the UUID of the control
-   `<state>` is the state within the control (see [Supported Control Types](#supported-control-types) for more information).

The name provided when configuring a control in Loxone Config will only be used as its display name in ioBroker.
This is because a user may choose the same name for multiple controls.

For more information about controls and their states, please also have a look at the Loxone API (especially the Structure File): https://www.loxone.com/enen/kb/api/

## Control Visibility

By default Loxone Miniserver hides many controls (and thus their states) from the Web interface.

That means, they are also hidden from this ioBroker adapter.

### Use in User Interface

To ensure, all your states are properly reported to ioBroker, please verify that they have "Use" in the "User Interface" section checked:

![Use in User Interface settings](doc/loxone-config-use-in-visualization.png)

### Display diagnostic inputs

To see diagnostic inputs (e.g. battery status of Air devices), please verify that the device has "Display diagnostic inputs" checked:

![Display diagnostic inputs settings](doc/loxone-config-display-diagnostics.png)

## Global States

The following global states are currently provided by this adapter:

-   `operatingMode`: the current operating mode number of the Loxone Miniserver
-   `operatingMode-text`: the current operating mode of the Loxone Miniserver as text
-   `sunrise`: the number of minutes after midnight when the sun rises today
-   `sunset`: the number of minutes after midnight when the sun goes down today
-   `notifications`: the number of notifications
-   `modifications`: the number of modifications
-   all other global states are simply reported as texts

## Supported Control Types

The following control types are currently supported by this adapter.

Behind the name of the state, you can see the type of the state:

-   `(rw)`: readable and writable: this state can be changed from ioBroker
-   `(ro)`: read-only: this state can't be changed from ioBroker
-   `(wo)`: write-only: this state's value isn't reported by this adapter, but it can be changed, triggering some action on the Loxone Miniserver

### AalSmartAlarm

Provided by AAL Smart Alarm control.

-   `alarmLevel` (ro) the ID of the current alarm level
    -   0 = No alarm
    -   1 = Immediate alarm
    -   2 = Delayed alarm
-   `alarmCause` (ro) A string representing the last cause for an alarm
-   `isLocked` (ro) Reset active, inputs will be ignored and therefore no alarms will be executed
-   `isLeaveActive` (ro) Leave input is set, no alarms will be executed
-   `disableEndTime` (ro) End time for the control to be disabled
-   `confirm` (wo) Confirm pending alarm
-   `disable` (wo) Disable control for a certain period of time, no alarms will be executed. Setting it to 0 will reenable the Smart Alarm
-   `startDrill` (wo) Execute test alarm

### AalEmergency

Provided by AAL Smart Emergency Button control.

-   `status` (ro) the ID of the current status
    -   0 = running, normal operation, waiting for emergency button press
    -   1 = alarm triggered
    -   2 = reset input in config asserted, control is shut down
    -   3 = app has temporarily disabled control
-   `disableEndTime` (ro) End time for the control to be disabled
-   `resetActive` (ro) text state with the active reset input (if control is in reset)
-   `trigger` (wo) trigger an alarm from the app
-   `quit` (wo) quit an active alarm
-   `disable` (wo) disable the control for the given time in seconds. Set to 0 to start control again if it is disabled

### Alarm

Provided by burgler alarm control.

-   `armed` (rw) boolean state (true / false) of the alarm; writing `true` to this value will immediately turn the alarm on (without the predefined delay)
-   `nextLevel` (ro) the ID of the next alarm level
    -   1 = Silent
    -   2 = Acustic
    -   3 = Optical
    -   4 = Internal
    -   5 = External
    -   6 = Remote
-   `nextLevelDelay` (ro) the delay of the next level in seconds
-   `nextLevelDelayTotal` (ro) the total delay of the next level in seconds
-   `level` (ro) the ID of the current alarm level
    -   1 = Silent
    -   2 = Acustic
    -   3 = Optical
    -   4 = Internal
    -   5 = External
    -   6 = Remote
-   `startTime` (ro) the timestamp when alarm started
-   `armedDelay` (ro) the delay of the alarm control being armed
-   `armedDelayTotal` (ro) the total delay of the alarm control being armed
-   `sensors` (ro) the list of sensors
-   `disabledMove` (rw) the movement is disabled (true) or not (false)
-   `delayedOn` (wo) writing any value to this state arms the alarm with the configured delay
-   `quit` (wo) writing any value to this state acknowledges the alarm

### Central Alarm

Provided by central burgler alarm control.

-   `armed` (rw) boolean state (true / false) of the alarm; writing `true` to this value will immediately turn the alarm on (without the predefined delay)
-   `delayedOn` (wo) writing any value to this state arms the alarm with the configured delay
-   `quit` (wo) writing any value to this state acknowledges the alarm

### AlarmClock

Provided by alarm clock control.

-   `isEnabled` (rw) boolean state (true / false) of the alarm clock
-   `isAlarmActive` (ro) boolean (true / false) whether the alarm is currently ringing
-   `confirmationNeeded` (ro) boolean (true / false) whether the user needs to confirm the alarm
-   `ringingTime` (ro) countdown in seconds how long the alarm clock will be ringing until it’s going to snooze again
-   `ringDuration` (rw) duration in seconds the alarm clock is ringing
-   `prepareDuration` (rw) preparation time in seconds
-   `snoozeTime` (ro) seconds until snoozing ends
-   `snoozeDuration` (rw) duration in seconds of snoozing
-   `snooze` (wo) writing any value to this state snoozes the current alarm
-   `dismiss` (wo) writing any value to this state dismisses the current alarm

### AudioZone

Provided by Music Server Zone.

-   `serverState` (ro) state of the music server:
    -   -3 = unknown/invalid zone
    -   -2 = not reachable
    -   -1 = unknown
    -   0 = offline
    -   1 = initializing (booting, trying to reach it)
    -   2 = online
-   `playState` (rw) the playback state:
    -   -1 = unknown (this value can't be set)
    -   0 = stopped (setting this value will pause playback)
    -   1 = paused (setting this value will pause playback)
    -   2 = playing (setting this value will start/resume playback)
-   `clientState` (ro) state of the client:
    -   0 = offline
    -   1 = initializing (booting, trying to reach it)
    -   2 = online
-   `power` (rw) whether or not the client power is active
-   `volume` (rw) current volume
-   `maxVolume` (ro) zones can be assigned a maximum volume
-   `shuffle` (rw) whether or not playlist shuffle is enabled
-   `sourceList` (ro) list containing all zone-favorites
-   `repeat` (rw) repeat mode:
    -   -1 = unknown
    -   0 = off
    -   1 = repeat all
    -   2 = -not used-
    -   3 = repeat current item
-   `songName` (ro) song name
-   `duration` (ro) how long the whole track is, -1 if not known (stream)
-   `progress` (rw) current position in the track
-   `album` (ro) album name
-   `artist` (ro) artist name
-   `station` (ro) station name
-   `genre` (ro) genre name
-   `cover` (ro) song/album cover image URL
-   `source` (rw) current selected source identifier (see `sourceList` above)
-   `prev` (wo) writing any value to this state moves to the previous track
-   `next` (wo) writing any value to this state moves to the next track

### Central Audio

Provided by central Music Server.

-   `control` (wo) sets the play state of all players (`true` = play, `false` = pause)

### Colorpicker

This device only appears inside a LightController.

-   `red` (rw) red value of the color picker
-   `green` (rw) green value of the color picker
-   `blue` (rw) blue value of the color picker

Setting one or more of the above states from ioBroker will only send a command to the Miniserver after about 100 ms.
This is to prevent the color from changing multiple times for a single user input.

### Colorpicker V2

This device only appears inside a Light Controller V2 in Loxone software version 9 and above.

-   `red` (rw) red value of the color picker
-   `green` (rw) green value of the color picker
-   `blue` (rw) blue value of the color picker

Setting one or more of the above states from ioBroker will only send a command to the Miniserver after about 100 ms.
This is to prevent the color from changing multiple times for a single user input.

### Daytimer / IRCDaytimer

Provided by timer/schedule.

-   `mode` (ro) current operating mode of the daytimer
-   `mode-text` (ro) current operating mode name of the daytimer
-   `override` (ro) the remaining time of the timer
-   `value` (ro) current value, `true` or `false` for digital and a value for analog
-   `value-formatted` (ro) current formatted value as text
-   `needsActivation` (ro) only available if the control needs to be activated
-   `resetActive` (ro) stays active as long as the reset input of the daytimer is active
-   `pulse` (wo) activates the new value if an entry needs activation

### Dimmer

Provided by dimmers.

-   `position` (rw) current position for the dimmer
-   `min` (ro) current minimum value
-   `max` (ro) current maximum value
-   `step` (ro) current step value
-   `on` (wo) writing any value to this state sets the dimmer to the last known position
-   `off` (wo) writing any value to this state disables the dimmer, sets position to 0 but remembers the last position

### EIBDimmer

Provided by EIB/KNX dimmers.

-   `position` (rw) current position for the dimmer
-   `on` (wo) writing any value to this state sets the dimmer to the last known position
-   `off` (wo) writing any value to this state disables the dimmer, sets position to 0 but remembers the last position

### Fronius

Provided by energy monitor.

-   `prodCurr` (ro) current production power
-   `prodCurrDay` (ro) energy production all over the current day
-   `prodCurrMonth` (ro) energy production all over the current month
-   `prodCurrYear` (ro) energy production all over the current year
-   `prodTotal` (ro) energy production since setting up
-   `consCurr` (ro) current consumption power
-   `consCurrDay` (ro) energy consumed throughout the current day
-   `consTotal` (ro) energy consumed since setting up
-   `deliveryDay` (ro) unknown
-   `earningsDay` (ro) how much money was earned over the current by either consuming the produced power yourself instead of consuming it from the grid, or by exporting unused produced power to the grid
-   `earningsMonth` (ro) how much money was earned over the current month
-   `earningsYear` (ro) how much money was earned over the current year
-   `earningsTotal` (ro) how much money was earned since setting up
-   `gridCurr` (ro) current grid consumption/delivery power. If negative, power is being delivered to the grid.
-   `batteryCurr` (ro) current battery charging/usage power. If negative, the battery is charging.
-   `stateOfCharge` (ro) represents the charging state of the battery. 100 = fully charged.
-   `co2Factor` (ro) How much co2 does it take to produce one kWh, used to compute CO2 savings
-   `online` (ro) true: online, false: offline

### Gate

Provided by gate controls.

-   `position` (ro) the position from 1 = up to 0 = down
-   `active` (rw) current direction of the gate movement
    -   -1 = close
    -   0 = not moving
    -   1 = open
-   `preventOpen` (ro) whether preventing opening of door
-   `preventClose` (ro) whether preventing closing of door

### Central Gate

Provided by central gate control.

-   `open` (wo) opens all gates
-   `close` (wo) closes all gates
-   `stop` (wo) stops all gate motors

### Hourcounter

Provided by

-   `total` (ro) total number of seconds the counter has been active so far
-   `remaining` (ro) how many seconds left until the next maintenance is required
-   `lastActivation` (ro) the timestamp when the counter was activated the last time
-   `overdue` (ro) `false` if not overdue, otherwise maintenance is required
-   `maintenanceInterval` (ro) seconds until the next maintenance
-   `active` (ro) whether or not the counter is currently active
-   `overdueSince` (ro) seconds since the maintainanceInterval was exceeded
-   `reset` (wo) will cause a reset of the following values
    -   remaining to maintenanceInterval
    -   overdue to 0
    -   overdueSince to 0
-   `resetAll` (wo) like `reset`, but also sets
    -   total to 0
    -   lastActivation to 0

### InfoOnlyAnalog

Provided by virtual states as well as the Loxone Touch switch.

-   `value` (ro) the state value (number) of the control
-   `value-formatted` (ro) if configured, the formatted value of the state (using the "Unit" format from Loxone Config)

### InfoOnlyDigital

Provided by virtual states as well as the Loxone Touch switch.

-   `active` (ro) boolean state (true / false) of the control
-   `active-text` (ro) if configured, the text equivalent of the state
-   `active-image` (ro) if configured, the image equivalent of the state
-   `active-color` (ro) if configured, the color equivalent of the state

![InfoOnlyDigital settings](doc/loxone-config-info-only-digital.png)

### InfoOnlyText

Provided by virtual text states.

-   `text` (ro) the state value of the control
-   `text-formatted` (ro) if configured, the formatted value of the state

### Intercom

Provided by door controllers.

-   `bell` (ro) whether the bell is ringing
-   `lastBellEvents` (ro) array containing the timestamps for each bell-activity that wasn't answered
-   `version` (ro) Loxone Intercoms only - text containing the currently installed firmware
    versions
-   `answer` (wo) writing any value to this state will deactivate the bell

This type of channel might contain other devices. See the respective chapter for more information.

### Intelligent Room Controller V2

Provided by the intelligent room controller V2 since Miniserver 10.0.

TODO: Documentation currently missing

### Jalousie

Provided by different kinds of blinds (automatic and manual).

-   `up` (rw) whether Jalousie is moving up
-   `down` (rw) whether Jalousie is moving down
-   `position` (ro) position of the Jalousie, a number from 0 to 1
    -   Jalousie upper position = 0
    -   Jalousie lower position = 1
-   `shadePosition` (ro) shade position of the Jalousie (blinds), a number from 0 to 1
    -   Blinds are not shaded = 0
    -   Blinds are shaded = 1
-   `safetyActive` (ro) only used by ones with Autopilot, this represents the safety shutdown
-   `autoAllowed` (ro) only used by ones with Autopilot
-   `autoActive` (rw) only used by ones with Autopilot
-   `locked` (ro) only by ones with Autopilot, this represents the output QI in Loxone Config
-   `infoText` (ro) informs e.g. on what caused the locked state, or what did cause the safety to become active.
-   `fullUp` (wo) writing any value to this state triggers a full up motion
-   `fullDown` (wo) writing any value to this state triggers a full down motion
-   `shade` (wo) writing any value to this state shades the Jalousie to the perfect position

### Central Jalousie

Provided by the central blinds control.

-   `autoActive` (rw) only used by ones with Autopilot
-   `fullUp` (wo) writing any value to this state triggers a full up motion
-   `fullDown` (wo) writing any value to this state triggers a full down motion
-   `shade` (wo) writing any value to this state shades of all blinds to the perfect position

### Light Controller

Provided by (hotel) lighting controllers.
Scenes can only be modified in the Loxone applications, but can be selected in ioBroker.

-   `activeScene` (rw) current active scene number
    -   0: all off
    -   1..8: user defined scene (definition/learning of scenes has to be done with the Loxone tools)
    -   9: all on
-   `sceneList` (ro) list of all scenes
-   `plus` (wo) changes to the next scene
-   `minus` (wo) changes to the previous scene

This type of channel might contain other devices. See the respective chapter for more information.

### Light Controller V2

Provided by (hotel) lighting controllers in Loxone software version 9 and above.
Moods can only be modified in the Loxone applications, but can be selected and combined in ioBroker.

-   `moodList` (ro) list of all configured mood names
-   `activeMoods` (rw) currently active list of mood names
-   `favoriteMoods` (ro) list of the favorite mood names
-   `additionalMoods` (ro) list of the non-favorite mood names
-   `plus` (wo) changes to the next mood
-   `minus` (wo) changes to the previous mood

This type of channel might contain other devices. See the respective chapter for more information.

### Central Light Controller

Provided by central lighting controller.

-   `control` (wo) turns all lights on or off

### Mailbox

Provided by Paketsafe Air / Tree.

-   `notificationsDisabledInput` (ro) State of the notifications disabled input
-   `packetReceived` (ro) State if a packet has been received
-   `mailReceived` (ro) State if mail has been received
-   `disableEndTime` (ro) timestamp until the notifications are disabled
-   `confirmPacket` (wo) Confirm receive of a packet
-   `confirmMail` (wo) Confirm receive of mail
-   `disableNotifications` (wo) Disable the notifications for x seconds; 0 seconds for cancelling timer

### Meter

Provided by utility meters.

-   `actual` (ro) the actual value (number)
-   `actual-formatted` (ro) if configured, the formatted actual value of the state (using the "Unit" format from Loxone Config)
-   `total` (ro) the total value (number)
-   `total-formatted` (ro) if configured, the formatted total value of the state (using the "Unit" format from Loxone Config)
-   `reset` (wo) writing any value to this state resets the total value

### Presence Detector

Provided by presence detector.

-   `active` (ro) presence state
-   `locked` (ro) locked state
-   `events` (ro) the number of events
-   `infoText` (ro) reason why the presence detector is locked

### Pushbutton

Provided by virtual push-button inputs.

-   `active` (rw) the current state of the pushbutton
-   `pulse` (wo) writing any value to this state will simulate the button being pushed only for a very short time

### Radio

Provided by radio buttons (8x and 16x).

-   `activeOutput` (rw) ID of the currently active output or 0 if none is active ("All Off")

### Remote

Provided by media controller.
Basic read only functionality only.

-   `active` (ro) true if the Miniserver is sending the commands for switching the modes or power on
-   `mode` (ro) the key for the current mode or 0 if no mode selected ("All Off")"
-   `timeout` (ro)  the timeout in milliseconds

### Slider

Provided by analog virtual inputs.

-   `value` (rw) the current value of the slider
-   `value-formatted` (ro) if configured, the formatted value of the state (using the "Unit" format from Loxone Config)
-   `error` (ro) indicates an invalid value of the slider

### SmokeAlarm

Provided by utility meters.

-   `nextLevel` (ro) the ID of the next alarm level
    -   1 = Silent
    -   2 = Acustic
    -   3 = Optical
    -   4 = Internal
    -   5 = External
    -   6 = Remote
-   `nextLevelDelay` (ro) delay of the next level in seconds
-   `nextLevelDelayTotal` (ro) total delay of the next level in seconds
-   `level` (ro) the ID of the current alarm level
    -   1 = Silent
    -   2 = Acustic
    -   3 = Optical
    -   4 = Internal
    -   5 = External
    -   6 = Remote
-   `sensors` (ro) the list of sensors
-   `acousticAlarm` (ro) state of the acoustic alarm false for not active and true for active
-   `testAlarm` (ro) whether testalarm is active
-   `alarmCause` (ro) the cause of the alarm:
    -   1 = smoke detector only
    -   2 = water only
    -   3 = smoke and water
    -   4 = temperature only
    -   5 = fire and temperature
    -   6 = temperature and water
    -   7 = fire, temperature and water
-   `startTime` (ro) timestamp when alarm started
-   `timeServiceMode` (rw) delay until service mode is disabled
-   `mute` (wo) writing any value to this state mutes the sirene
-   `quit` (wo) writing any value to this state acknowledges the smoke alarm

### Switch

Provided by virtual input switches.

-   `active` (rw) the current state of the switch

### Text State

Provided by "state".

-   `textAndIcon` (ro) the current value of the state

### TimedSwitch

Provided by stairwell and multifunction switches.

-   `deactivationDelayTotal` (ro) seconds, how long the output will be active if the timer is used
-   `deactivationDelay` (ro) countdown until the output is deactivated
    -   0 = the output is turned off
    -   -1 = the output is permanently on
    -   otherwise it will count down from deactivationDelayTotal
-   `on` (wo) writing any value to this state enables the switch permanently without deactivation delay
-   `off` (wo) writing any value to this state disables the switch
-   `pulse` (wo) pulses the switch:
    -   deactivationDelay = 0
        -   Will start the countdown, from deactivationDelayTotal to 0
    -   if this is a stairwell switch:
        -   deactivationDelay = -1
            -   No effect, will remain permanently on.
        -   deactivationDelay > 0
            -   Restarts the countdown
    -   if this is a multifunction switch
        -   turns it off (from countdown or permanent on state)

### Tracker

Provided by stairwell and multifunction switches.

-   `entries` (ro) list of entries returned from the miniserver

### UpDownAnalog

Provided by Virtual Input (Up-Down buttons).

-   `value` (rw) the current value of the input
-   `value-formatted` (ro) if configured, the formatted value of the state (using the "Unit" format from Loxone Config)
-   `error` (ro) indicates an invalid value of the slider

### ValueSelector

Value selection.

-   `value` (rw) current value
-   `min` (ro) current minimum value
-   `max` (ro) current maximum value
-   `step` (ro) current step value

### WindowMonitor

Provided by utility meters.

-   `numOpen` (ro) number of open windows & doors
-   `numClosed` (ro) number of closed windows & doors
-   `numTilted` (ro) number of tilted windows & doors
-   `numOffline` (ro) number of windows & doors that are not available
-   `numLocked` (ro) number of locked windows & doors
-   `numUnlocked` (ro) number of unlocked windows & doors

The sum of the values from all these states is equal to the number of windows & doors monitored.? The windows/doors with two states will always be counted to the "worst" state.

For each monitored window / door there will be a device with an index as its ID and the given name. They have the following states:

-   `closed` (ro) the window / door is closed
-   `tilted` (ro) the window / door is tilted
-   `open` (ro) the window / door is open
-   `locked` (ro) the window / door is locked
-   `unlocked` (ro) the window / door is unlocked

## Weather Server

The weather server information is provided as a device with multiple channels.
The device is called `WeatherServer`.
It contains:

-   the channel `Actual` with the current weather values
-   one channel for each forecast hour called `HourXX` where `XX` is the number of hours from now

Every channel contains the following states:

-   `barometricPressure`: numeric barometric pressure value
-   `barometricPressure-formatted`: formatted barometric pressure value with unit
-   `dewPoint`: numeric dew point value
-   `dewPoint-formatted`: formatted dew point value with unit
-   `perceivedTemperature`: numeric perceived temperature value
-   `perceivedTemperature-formatted`: formatted perceived temperature value with unit
-   `precipitation`: numeric precipitation value
-   `precipitation-formatted`: formatted precipitation value with unit
-   `relativeHumidity`: numeric relative humidity value
-   `relativeHumidity-formatted`: formatted relative humidity value with unit
-   `solarRadiation`: solar radiation value
-   `temperature`: numeric temperature value
-   `temperature-formatted`: formatted temperature value with unit
-   `timestamp`: timestamp of the data as `value.time` (JavaScript time)
-   `weatherType`: numeric weather type enumeration value
-   `weatherType-text`: text representation of the weather type
-   `windDirection`: wind direction value
-   `windSpeed`: wind speed value
-   `windSpeed-formatted`: formatted wind speed value with unit

## Unsupported Control Types

When Loxone adds new control types, they are most often not immediately supported by this adapter.

In this case, the control will have "Unknown:" in front of its name. E.g. `Unknown: Wallbox`

Those controls will contain all states reported by the Miniserver, but they will all be read-only strings.

If you need better support for a new control type, please follow the steps in the next section to requeset a new feature.

**Sentry:** unsupported control types will be reported to the developers using Sentry. This way you might get new controls in the next release without having to request it yourself.

## Bug Reports and Feature Requests

Please use the GitHub repository to report any bugs or request new features.

If you require an unsupported control type, please provide the name as it is reported in the error log of ioBroker as well as the entire raw contents of the device in the ioBroker object tree:

Log file example for "LightController":

![Log of missing LightController control](doc/log-missing-control-type.png)

Native value from ioBroker &gt; Objects

![Details of missing LightController control](doc/details-missing-control-type.png)

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

-   (raintonr) Added info statistics (#364)
-   (raintonr) Added basic functionality for Remote (Media Controller)

### 3.0.0 (2021-12-29)

-   (tdesmet) Changed to lxcommunicator (fixes #210)
-   (UncleSamSwiss) Updated all dependencies

### 2.2.3 (2021-07-06)

-   (UncleSamSwiss) Reduced number of Sentry reports for unsupported controls.

### 2.2.2 (2021-06-23)

-   (UncleSamSwiss) Explicitly setting adapter tier to 2.
-   (UncleSamSwiss) Added support for Daytimer (IOBROKER-LOXONE-1Z)
-   (UncleSamSwiss) Added support for Radio (IOBROKER-LOXONE-21)
-   (UncleSamSwiss) Added support for Fronius (IOBROKER-LOXONE-1Y)
-   (UncleSamSwiss) Added support for IRCDaytimer (IOBROKER-LOXONE-27)
-   (UncleSamSwiss) Added support for Hourcounter (IOBROKER-LOXONE-23)
-   (UncleSamSwiss) Added support for InfoOnlyText (IOBROKER-LOXONE-29)
-   (UncleSamSwiss) Fixed issues with Lumitech color pickers (#150)

### 2.2.1 (2021-05-18)

-   (UncleSamSwiss) Fixed typo causing "Cannot read property 'off' of undefined" (IOBROKER-LOXONE-2R, #72)
-   (UncleSamSwiss) Improved Sentry reporting for structure file

### 2.2.0 (2021-05-17)

-   (UncleSamSwiss) Unknown/unsupported controls are now shown with their states as read-only strings
-   (raintonr) Fixes for auto-position based on percentage (#76)
-   (raintonr) Added support for IRoomControllerV2 (#22)
-   (UncleSamSwiss) Added experimental support for EIBDimmer (#15)
-   (UncleSamSwiss) Added support for ValueSelector (#36)
-   (UncleSamSwiss) Added support for TextState (#73)
-   (UncleSamSwiss) Added support for UpDownAnalog (#57)
-   (UncleSamSwiss) Fixed some "State has wrong type" warnings (#99, #128)
-   (UncleSamSwiss) Added support for Lumitech color picker (#44)
-   (UncleSamSwiss) Weather server data can now be filtered (#131)
-   (UncleSamSwiss) Added support for PresenceDetector (IOBROKER-LOXONE-1R)
-   (UncleSamSwiss) Added support for AAL Smart Alarm (IOBROKER-LOXONE-1X)
-   (UncleSamSwiss) Added support for AAL Emergency Button (IOBROKER-LOXONE-1W)
-   (UncleSamSwiss) Added support for Paketsafe (IOBROKER-LOXONE-1P)

### 2.1.0 (2020-12-21)

-   (raintonr) Fixed: activeMoods can get stuck/not sync properly; all events is now handled with a queue (#58, #61, #62)
-   (raintonr) Added open/close buttons to Garage/Gate Control (#59, #60)
-   (pinkit) Added support for virtual text inputs (#48)
-   (UncleSamSwiss) Updated to the latest adapter template
-   (UncleSamSwiss) Changed log level of "Currently unsupported control type" message to "info" (#65)

### 2.0.2 (2020-10-26)

-   (UncleSamSwiss) Fixed color picker updates (#52)
-   (UncleSamSwiss) TimedSwitch to have `on`/`off` instead of `active` (#53)
-   (UncleSamSwiss) Cleaning illegal characters for room and function names (#54)

### 2.0.1 (2020-09-24)

-   (UncleSamSwiss) Fixed percentage states always showing 0% (#49)
-   (UncleSamSwiss) Fixed analog virtual inputs wouldn't set the value 0 from ioBroker (#47)
-   (UncleSamSwiss) Added translations to package information.

### 2.0.0

-   **BREAKING:** Since the password is now encrypted, you will need to enter the password again after an update to this version!
-   (UncleSamSwiss) Updated to the latest development tools and changed to the TypeScript language

### 1.1.0

-   (UncleSamSwiss) Added support for Miniserver Gen 2
-   (sstroot) RGB for LightControllerV2
-   (Apollon77) Updated CI Testing

### 1.0.0

-   (UncleSamSwiss) Fixed issue that was resetting the custom settings and cloud smartName
-   (alladdin) Fixed connection issues with Loxone Miniserver 10
-   (UncleSamSwiss) Changed all write-only "switch"es to "button"s
-   (UncleSamSwiss) Added support for AlarmClock control
-   (Apollon77) Updated CI Testing

### 0.4.0

-   (UncleSamSwiss) Improved support for Loxone Config 9
-   (UncleSamSwiss) Changed all color choosers (i.e. color lights) to use RGB (previously HSV/HSL was completely wrong)

### 0.3.0

-   (UncleSamSwiss) Control names only synchronized on the first time by default (configurable); users can change control names the way they want

### 0.2.1

-   (UncleSamSwiss) Added support for Slider control

### 0.2.0

-   (UncleSamSwiss) Added proper support for Alexa for the following controls: Alarm, AudioZone, Gate, Jalousie and LightController

### 0.1.1

-   (UncleSamSwiss) Added support for synchronizing rooms and functions (categories) from Loxone Miniserver

### 0.1.0

-   (UncleSamSwiss) Added support for many more controls including commands from ioBroker to Loxone Miniserver

### 0.0.3

-   (Bluefox) Formatting, refactoring and Russian translations

### 0.0.2

-   (UncleSamSwiss) Added creation of an empty device for all unsupported controls (helps figure out its configuration)

### 0.0.1

-   (UncleSamSwiss) Initial version

## License

Copyright 2022 UncleSamSwiss

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

## Legal

This project is not affiliated directly or indirectly with the company Loxone Electronics GmbH.

Loxone and Miniserver are registered trademarks of Loxone Electronics GmbH.
