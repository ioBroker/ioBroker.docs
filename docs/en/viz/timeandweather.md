---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/viz/timeandweather.md
title: Time&Weather
hash: gobWIDvudg3iW1eszIOA2lKUW5A+/3y5Dr7K9GR2O4c=
---
# Time&Weather
This set provides widgets that can display the date, time and weather forecast.

|Widget | Image | Description|
|---------------------------------|-------|-------------|

[Cool Clock](#cool-clock) | ![001]|Analogue clock|
[Flip Clock](#flip-clock) | ![002]|Digital clock in retro style (with animation)|
[Segment Clock](#segment-clock) | ![004]|Digital clock in 7-segment style|
[Simple Clock](#simple-clock) | ![005]|Digital clock|
[Simple Date](#simple-date) | ![006]|Date display|
[SVG Clock](#svg-clock) | ![007]|Very variable clock in analogue style|
[HTC Weather](#htc-weather) | ![003]|Time display with weather information --> no longer works|
[Yahoo Weather](#yahoo-weather) | ![010]|Weather forecast from Yahoo --> no longer works|
[Weather Custom](#weather-custom)| ![010]|Weather forecast with configurable states|

*********************************************************

### Cool Clock
Analog clock ![001]

Attribute|Description|
----|----|
Theme|Various display themes are available|
Show no seconds|Display without second hand|
Digital clock|.|
Show am/pm|Time displayed in US style|

**Example:** ![008] [:arrow_up: back to top](../../de/viz/#TimeWeather) *********************************************************

### Flip Clock
Retro-style digital clock with animated numbers![002]

[:arrow_up: back to top](#TimeWeather)  
*********************************************************

### Segment Clock
7-segment style digital clock that can display either the current time or a time from a data point.

![004]

| Attribute|Description|
| ----|----|
| Object ID |Data point if the current time should not be displayed|
| Activate clock ||
| Seconds |Display seconds|
| Template ||
| Segment color ON | Color of active segments |
| Segment color OFF | Color of inactive segments |
| Interval for running text [ms]|Speed for running text display|
| Number of segments |7/14/16 segments per digit|
| Character angle | Inclination of the numbers |
| Character height | Digit height |
| Character width | Digit width |
| Character spacing |Number spacing|
| Segment width |Width of each segment|
| Segment distance |Distance between segments|
| Corner type | Shape of segments |

**Example:** ![011] [:arrow_up: back to top](../../de/viz/#TimeWeather) *********************************************************

### Simple CLock
7-segment style digital clock that displays the current time.

![005]

Attribute|Description|
----|---- Show no seconds|Do not show seconds Blink| ? No style| ?

**Example:** ![012] [:arrow_up: back to top](../../de/viz/#TimeWeather) *********************************************************

### Simple Date
Date display in 7-segment style for current date.

![006]

Attribute|Description|
----|---- Day of the week| Show the day of the week before the date Short day of the week| Show the day of the week as a short form (only if day of the week is enabled) Short year| Show only the last two digits of the year Leading zero| Leading zeros for day and month Month as text| Write out the month as text Short month| Write out the month abbreviation as text US format|? No style|?

**Example:** ![013] [:arrow_up: back to top](../../de/viz/#TimeWeather) *********************************************************

### SVG Clock
Analog clock with many display options

![007]

Attribute|Description|
----|---- Quarter text size|Text size for the quarter hour display Quarter text color|Text color for the quarter hour display Quarter tick color|Size of the quarter ticks Minute text size|Text size for the minute display Minute text color|Text color for the minute display Small tick color|Color of the small ticks (every minute) Show seconds|Show second hand Hand color|Color of the hour and minute hand Hand bump color|Color for the separated element from the hour and minute hand Second hand color|Color of the second hand Text font|Font of the numbers

**Example:** ![015] [:arrow_up: back to top](../../de/viz/#TimeWeather) *********************************************************

### HTC Weather
Weather display (no longer works because ...? ) ![003]

Attribute|Description|
----|---- City|Select weather for this city City name|Name of the city Language|Display language Update interval|Updating the weather data

[:arrow_up: back to top](#TimeWeather)  
*********************************************************

### Yahoo Weather
Weather forecast display (no longer usable because the Yahoo weather service has changed) (see https://developer.yahoo.com/weather/)

![010]

[:arrow_up: back to top](#TimeWeather)  
*********************************************************

### Weather Custom
Weather forecast display for any weather data source.
It is currently recommended to use the data from the 'daswetter' adapter.

![010]

Attribute|Description|
----|---- City|Select weather for this city City name|Name of the city Language|Display language

#### Now
Attribute|Description|
----|---- Temperature ID|Data point for current temperature Text ID|Data point for weather description text Humidity ID|Data point for humidity Min Temperature ID|Data point for daily minimum temperature Max Temperature ID|Data point for daily maximum temperature Wind speed|Data point for wind speed Wind direction|Data point for wind direction Image URL|Data point with URL to the corresponding weather symbol

#### Morning
Attribute|Description|
----|---- Text ID|Data point for weather description text Min Temperature ID|Data point for daily minimum temperature Max Temperature ID|Data point for daily maximum temperature Image URL|Data point with URL to the corresponding weather symbol

This will continue for the next few days (depending on forecast needs and click stamina)...

**Example:** ![016] [:arrow_up: back to top](../../de/viz/#TimeWeather) *********************************************************

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