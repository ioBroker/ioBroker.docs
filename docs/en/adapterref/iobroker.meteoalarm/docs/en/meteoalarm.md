---
chapters: {"pages":{"en/adapterref/iobroker.meteoalarm/README.md":{"title":{"en":"ioBroker.meteoalarm"},"content":"en/adapterref/iobroker.meteoalarm/README.md"},"en/adapterref/iobroker.meteoalarm/docs/en/meteoalarm.md":{"title":{"en":"ioBroker.meteoalarm"},"content":"en/adapterref/iobroker.meteoalarm/docs/en/meteoalarm.md"}}}
---
# ioBroker.meteoalarm

## Add it to your vis
The easiest way to add it to your vis is by using the widget basic - html, and there entering {meteoalarm.0.htmlToday}. This gives you a predesigned HTML widget, which you can adjust in the adapter-setup.

# Setup

## Settings
"No Background Color in HTML Widget": 
Ability to use the HTML Widget without background color (e.g. if you want to use the color object to fill your whole widget, not just the html widget).

"Use white icons": 
Use white icons instead of black ones.

"Icons": 
Define the size of the icon in the HTML widget.

"No symbols in widget":
Don't use the symbol in the HTML widget. You can still access it in the objects. This is usefill if you want to show the icon seperatly from the widget - e.g. in a bigger size.

"Today instead of Weekday"
Show in the header of the widget instead of the weekday "today", "tomorrow" or "yesterday.

"Define Warning colors": 
Ability to define the colors for the various alarm levels in HEX code. Used for HTML widget and also for the color object to manually assign it to another widget

## Alarm Types Setup
Here you can define which alarm levels and alarm types are tracked. This has an effect on the alarm objects, on the HTML widget and on the JSON object.

## Notifications
It is possible to let the adapter send you the notifications by mail, telegram, signal or pushover. 

* Signal
* Mail
* Pushover
* Telegram
* Synochat

Available Settings:
* Show Location: If this setting is activated, the location name is added to the notification
* Warning Level in Words: Add the warning level in words additionally to the warning symbols
* No details: Don't add the description of the warning to the notification - e.g. for Alexa
* Send "no warnings": Send a notification if all alarms are ended and there is no warning at the moment
* Warning Level Symbols: Choose what symbols should be added to the notification


## Notification Alarm Types
Here you can define which alarm levels and types are used for the notifications. Important: if a level or type is not tracked in the "Alarm Types" setup, then you can not track it in the notifications.


# Objects

## General Objects

|Object Name|Description|                                                                       
|:---:|:---:|
|JSON|JSON that includes all alarms. Structure: Event, Description,Level,Start Date, Icon, Alarmtype|
|color|Color code of the hightest available alarm level|
|htmlToday|HTML Widget code (adjustable in setup)|
|lastUpdate|Last Update from Meteoalarm|
|level|Maximum level of available alarms|
|link|Feed Link|
|location|Location name|
|noOfAlarms|Count of available alarms|
|notification|Object that changes if a new alarm is added. Can be used for notifications.|


## Objects for each alarm
These objects are created for each alarm.

|Object Nane|Description|                                                                       
|:---:|:---:|
|color|Hex code for alarm - can be adjusted in setup for the various levels|
|description|Long description of alarm|
|effective|Start date/time of alarm event|
|event|Event type|
|expires|End date/time of alarm event|
|headline|Short description of alarm|
|icon|Link to icon|
|level|Level number (see alarm levels below)|
|levelText|Level in words|
|link|Link to xml|
|sender|Who sent the alarm (e.g. Deutscher Wetterdienst")|
|sent|Date/time when alarm was sent|
|type|Type of alarm as number (see alarm types above|
|typeText|Type of alarm in words (see alarm types above|
|updateIdentifier|Not relevant|

# Alarm Details

## Alarm Levels
|Alarm Level|Number|Description|                                                                       
|:---:|:---:|:---:|
|Green|1|There is no warning available at the moment|
|Yellow|2|The weather is potentially dangerous. The predicted weather phenomena are not unusual, but increased attention should be paid to activities exposed to meteorological risks. Keep yourself informed about the meteorological conditions to be expected and do not take any avoidable risks|
|Orange|3|The weather is dangerous. Unusual meteorological phenomena have been predicted. Damage and accidents are likely. Be very attentive and careful and keep up to date with the expected meteorological conditions|
|Red|4|The weather is very dangerous. Unusually intense meteorological phenomena were predicted. Extreme damage and accidents, often over large areas, threaten life and property|

## Alarm Types
|Alarm Type|Description|                                                                       
|:---:|:---:|
|1|Wind|
|2|Snow/Ice|
|3|Thunder & Lightning|
|4|Fog|
|5|High temperature|
|6|Low temperature|
|7|Coast Event|
|8|Forrest fire|
|9|Avalanche|
|10|Rain|
|11|Unknown|
|12|Flood|
|13|Rain-Flood|

# Supported countries
* Austria
* Germany
* Belgium
* BosniaHerzegovina
* Croatia
* Cyprus
* Czech Republic
* Denmark
* Estonia
* Finland
* France
* Greece
* Hungary
* Iceland
* Israel
* Italy
* Latvia
* Lithuania
* Luxembourg
* Malta
* Netherlands
* Norway
* Poland
* Romania
* Serbia
* Slovakia
* Slovenia
* Spain
* Sweden
* Switzerland
* UK

If you don't find your country, please create an issue on github, and I will be happy to add it

# Not supported countries
* Portugal (geocode file from meteoalarm.org is probably incorrect)
* Bulgaria (geocode file from meteoalarm.org is probably incorrect)