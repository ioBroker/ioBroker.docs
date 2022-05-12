---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/viz/timeandweather.md
title: Time&Weather
hash: 3F5tnNInLrwz9Ic7Db40MfwRZ7qhrC1UraDW+wpkF5c=
---
# Time&Weather
This set provides widgets that can be used to display date, time and weather forecasts.

|Widgets | image | Description|
|---------------------------------|-------|-------------|

[cool clock](#cool-clock) | ![001]|Analog Clock|
[flip clock](#flip-clock) | ![002]|Retro style digital clock (with animation)|
[segment clock](#segment-clock) | ![004]|7 segment style digital clock|
[Simple Clock](#simple-clock) | ![005]|digital clock|
[simple date](#simple-date) | ![006]|Date Display|
[SVG Clock](#svg-clock) | ![007]|Very variable analog style clock|
[HTC Weather](#htc-weather) | ![003]|Time display with weather information --> no longer works|
[YahooWeather](#yahoo-weather) | ![010]|Weather forecast from Yahoo --> stopped working|
[Weather Custom](#weather-custom)| ![010]|Weather forecast with configurable states|

*********************************************************

### Cool Clock
Analog clock ![001]

attribute|description|
----|----|
Theme|Different display themes are available|
Show no seconds|display without second hand|
digital clock|.|
Show am/pm|US style time display|

**Example:** ![008] [:arrow_up: back to top](../../de/viz/#TimeWeather) *********************************** **********************

### Flip clock
Retro-style digital clock with animated numbers ![002]

[:arrow_up: back to top](#TimeWeather)  
*********************************************************

### Segment clock
7 segment style digital clock that can display either the current time or a time from a data point.

![004]

| attribute|description|
| ----|----|
| Object ID |Data point if the current time is not to be displayed|
| Activate clock ||
| Seconds |Display Seconds|
| Template ||
| segment color ON | Color of active segments|
| Segment color OFF | Color of the inactive segments|
| Interval for scrolling text [ms]|Speed for scrolling text display|
| Number of segments |7/14/16 segments per digit|
| character angle |slanting of digits|
| character height |digit height|
| character width |digit width|
| character spacing |spacing of digits|
| Segment width |Width of each segment|
| Segment distance |distance between segments|
| Corner type |shape of segments|

**Example:** ![011] [:arrow_up: back to top](../../de/viz/#TimeWeather) *********************************** **********************

### Simple Clock
7 segment style digital clock showing current time.

![005]

attribute|description|
----|---- Don't show seconds|Don't show seconds blinking| ? No Style| ?

**Example:** ![012] [:arrow_up: back to top](../../de/viz/#TimeWeather) *********************************** **********************

### Simple date
7 segment style date display for current date.

![006]

attribute|description|
----|---- Day of the week| Display day of week before date Short day of week| Show weekday as short form (only if weekday is enabled) Short year| Show only the last two digits of the year Leading zero|Leading zeros in day and month Month as text|Write out month as text Short month|Write out month abbreviation as text USA format|? No style|?

**Example:** ![013] [:arrow_up: back to top](../../de/viz/#TimeWeather) *********************************** **********************

### SVG Clock
Analog clock with many display options

![007]

attribute|description|
----|---- Quarter text size|Text size for the quarter hour Quarter text color|Text color for the quarter hour Quarter tick color|Size of quarter ticks Minute text size|Text size for the minute hour Minute text color|Text color for minute display Small tick color|Color of small ticks (every minute) Show seconds|Show second hand hand color|Hour and minute hand color Pointer bump color|Color for offset element of hour and minute hand Second hand color|Second hand color Text font |Typeset of numbers

**Example:** ![015] [:arrow_up: back to top](../../de/viz/#TimeWeather) *********************************** **********************

### HTC Weather
Weather display (doesn't work anymore because ...? ) ![003]

attribute|description|
----|---- City|Choose weather for this city City name|City name Language|Display language Update interval|Weather data update

[:arrow_up: back to top](#TimeWeather)  
*********************************************************

### Yahoo Weather
Weather forecast display (no longer usable because the Yahoo weather service has changed) (see https://developer.yahoo.com/weather/)

![010]

[:arrow_up: back to top](#TimeWeather)  
*********************************************************

### Weather Custom
Weather forecast display for any weather data source.
It is currently advisable to use the data from the 'daswetter' adapter.

![010]

attribute|description|
----|---- City|Choose weather for this city City Name|City Name Language|Display Language

#### Now
attribute|description|
----|---- Temperature ID|Data point for current temperature Text ID|Data point for weather description text Humidity ID|Data point for humidity Min Temperature ID|Data point for daily low temperature Max Temperature ID|Data point for daily high temperature wind speed|Data point for wind speed wind direction|Data point for wind direction image URL|data point with URL to the appropriate weather symbol

#### Morning
attribute|description|
----|---- Text ID|Data point for weather description text Min Temperature ID|Data point for daily minimum temperature Max Temperature ID|Data point for daily maximum temperature Image URL|Data point with URL to the appropriate weather symbol

This is how it goes on for the next few days (depending on the need for forecasting and click endurance)...

**Example:** ![016] [:arrow_up: back to top](../../de/viz/#TimeWeather) *********************************** **********************

[001]: media/iobroker-vis-timeandweather_timeandweather_coolclock.png

[002]: media/iobroker-vis-timeandweather_timeandweather_flipclock.png

[003]: media/iobroker-vis-timeandweather_timeandweather_htcweather.png

[004]: media/iobroker-vis-timeandweather_timeandweather_segmentclock.png

[005]: media/iobroker-vis-timeandweather_timeandweather_simpleclock.png

[006]: media/iobroker-vis-timeandweather_timeandweather_simpledate.png

[007]: media/iobroker-vis-timeandweather_timeandweather_svgclock.png

[008]: media/iobroker-vis-timeandweather_timeandweather_coolclock_config.png

[009]: media/iobroker-vis-timeandweather_timeandweather_htcweather_config.png

[010]: media/iobroker-vis-timeandweather_timeandweather_yahooweather.png

[011]: media/iobroker-vis-timeandweather_timeandweather_segmentclock_config.png

[012]: media/iobroker-vis-timeandweather_timeandweather_simpleclock_config.png

[013]: media/iobroker-vis-timeandweather_timeandweather_simpledate_config.png

[014]: media/iobroker-vis-timeandweather_timeandweather_svgclock_config.png

[015]: media/iobroker-vis-timeandweather_timeandweather_explain_svgclock.gif

[016]: media/iobroker-vis-timeandweather_timeandweather_explain_CustomWeather.gif