---
BADGE-Number of Installations: http://iobroker.live/badges/ical-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.ical.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.ical.svg
---
![Logo](ical.png)
# ioBroker iCal adapter
This adapter allows to read .ics files from specific URL and parse it (Google Calendar or iCal). 
Alternatively it is possible to use a local `.ics` file (use absolute path to the file instead of URL)


## Usage
Based on iCal Adapter for (CCU.IO)[https://github.com/hobbyquaker/ccu.io/tree/master/adapter/ical] from vader722

### Adapter iCal
iCal adapter for ioBroker reads calendar files in `.ics` format from specified URL and writes events, that situated in the predefined time interval into ioBroker variable. Alternatively it is possible to use a local .ics file (use absolute path to the file instead of URL).
They can shown in VIS using `basic html - String (unescaped)` widget.

Two variables are created:
- `iCalReadTrigger`
- `iCalEvents`

The variable `iCalReadTrigger` is used to trigger the read-in process.
In the settings several URLs can be deposited, from which the calendar is read.
The calendars are then read in succession and the result is summarized.
Alternatively, the read command may also be given a URL, e.g. temporarily read another calendar.

To read in the defaultURLs, the string `read` must be written to the variable `iCalReadTrigger`.

To read from any URL, the string `read https: // ...` must be written to the variable `iCalReadTrigger`.

The result returns the iCal adapter in the variable `iCalEvents`.

By writing `check` to` iCalReadTrigger`, the check on events is triggered on the read data without re-reading the data.

Alternatively, the adapter can also automatically query the calendars in a definable interval (only with the `defaultURL`).
To do this, set the polling interval (in minutes) in the settings with the variable runEveryMinutes.

Meaning of the options in the config file:

- `preview`: 7 # means that appointments are displayed 7 days in advance
- `runEveryMinutes`: 30 # means that the adapter automatically rewists the calendar every 30 minutes. If 0 is not read automatically
- `colorize`: true # Today's appointments  and appointments which are currently running will be colored red, tomorrow's appointments will be orange, this option overrides the option everyCalOneColor
- `debug`: false # if true, extended output is written to the CCU.IO log
- `defColor`:` white` # sets the default color of the calendar entries
- `fulltime`: ` ` # determines by which string the time 00:00 is replaced for all day appointments. For spaces (between the quotes), the time is omitted for all-day appointments
- `replaceDates`: true # If true, today's date is replaced by the string todayString (for example, Today). Tomorrow's appointments through the string tomorrowString
- `everyCalOneColor`: false # If true, multiple calendars will have each calendar colored in a color to be specified. If the colorize option is set, this will not work!
- `Calendar1`:
    - "calURL": "http: //11111.ics", URL of the calendar
    - "calColor": "white" color of the calendar, if the option "everyCalOneColor" is set.
     
  Any number of calendars can be entered. The standard config file contains 2 calendars.
- `Events`:
  - `name`:" vacation ":
  - `enabled`: true # determines if the event will be edited
  - `Set ID`: An additional state can be entered here, which is updated when the event is active
  - `On / Off`: Here, an alternative value can be written to the state stored under 'Set ID'
  - `display`: false # determines whether the event is also displayed in the iCalEvents, or only evaluated
  - `Set Ack`: false # Ack "off" controls the state, e.g. to switch something. #true Ack "on" updates the value
  
  By setting an event (in this example "vacation"), the calendars are searched for the string "vacation".
  If an appointment with the keyword "vacation" is in a calendar, then automatically a state with the
  Name holiday set to True. If the appointment is over, the state is reset to false.
  A status is created for each day of the preview period. Danger!
  It is searched for a substring, i. an entry in the calendar "vacation" is recognized as well as a
  Entry "holiday parents". This must be taken into account when setting the events.
  
- Explanation of the states under ical.0.events.0
  - The event in the path ical.0.events.0.later is set to true if it is still happening today but has not started yet
  - The event in path ical.0.events.0.now is set to true if it is currently active
  - The event in the path ical.0.events.0.today is set to true if the event is active today
  - Note: events from previous days are not displayed


By adjusting the CSS in the VIS, the styles of today's (standard red) and tomorrow's dates (standard orange) can be set:
- `iCalWarn` - Newline calendar entry today
- `iCalPreWarn` - beginning of line calendar entry tomorrow
- `iCalNormal` - end of line from today
- `iCalNormal2` - tomorrow's end of line

### calendar
#### Apple iCloud Calendar
Apple iCloud calendars can be viewed if previously shared. It's best to create your own calendar for Homematic, as the calendar will be shared with everyone.
To do this, right-click on the calendar in the Calendar app and select Share Settings. Now check "Public Calendar" and copy the displayed URL. IMPORTANT: the url starts with webcal: // p0X-cale .....
`webcal` has to be replaced by` http`. Then enter this URL either in the settings at defaultURL, or specify it in `read URL`, eg. `readURL http: // p-03-calendarws.icloud.com / xxxxxxxxx`

#### Google Calendar
To include a Google Calendar, you must go to the Google Calendar calendar setting (mouse click on the "down arrow" next to the calendar). The URL of the calendar can be found by clicking on the `ICAL` symbol next to the field" Private address ". Then enter this URL either in the settings at defaultURL, or specify it in `read URL`, eg. `readURL https: // www.google.com / calendar / ical / xxxxxxxx / basic.ics`.

#### OwnCloud Calendar
To include a hardcooked calendar of an OwnCloud, you have to approve this calendar in the calendar view in OwnCloud as a hardcourt calendar and share the link. This URL (https://&lt;DOMAIN&gt;/remote.php/dav/calendars/USER/xxxxxxx_shared_by_xxxxxx?export) have to be added in the ioBroker.ical adapter with username and password.

#### NextCloud Calendar
To include a NextCloud calendar, the download link of the single desired calendar of a user must be copied in the calendar view in NextCloud.
To do this, log in to NextCloud as a user and go to 'Calendar'. In the left column, click on the desired calendar by the circle with three dots.
In the menu that appears hover with the mouse over 'Download' and right click to copy the link.
Example: https://&lt;DOMAN&gt;/remote.php/dav/calendars/MYCALENDAR/personal/?export (it is important that the link contains "?export").

Enter this URL into the ioBroker.ical adapter with username and password. This must be done individually for all desired calendars of all users.

#### Baikal lightweight CalDAV+CardDAV Server
The Baikal server offers the "ics-export" plugin that allows to export a calendar as a single ICal file. This export plugin is selected with the URL and allows seamless integration with this ioBroker adaptor. Please add the export filter to the URL of your calendar (`https://SERVER/baikal/cal.php/calendars/path/to/calendar?export&accept=ical`). If you encounter authentication issues, please change the `WebDAV authentication type` from `DIGEST` to `BASIC` in the admin settings of the WebUI of the Baikal server.

### CSS
In the generated HTML two kind of css classes are included to allow design freedom.

#### Timebased CSS classes
* _iCalNormal_/_iCalNormal2_: The Event started before today (and is still running) or later as in 3 days, default color without CSS and without a calendercolor is the configured adapter color
* _iCalWarn_/_iCalWarn2_: The Event starts today, default color without CSS and without a calendercolor is `red`
* _iCalPreWarn_/_iCalPreWarn2_: The Event starts tomorrow, default color without CSS and without a calendercolor is `orange`
* _iCalPrePreWarn_/_iCalPrePreWarn2_: The Event starts day after tomorrow, default color without CSS and without a calendercolor is `yellow`
The first CSS class (e.g. iCalNormal) is used for the date and time part of the HTML and the second CSS class (e.g. iCalNormal2) is used for the Event name.

CSS example for those CSS classes to format the output a bit different (e.g. date/time left+bold and Eventname right ...):

```
.icalWarn{
    color:red;
    float:left;
    font-size:12px;
    font-weight:bold;
}
.icalWarn2{
    color:white;
    float:right;
    font-size:12px;
    font-weight:normal;
}
.icalPreWarn{
    color:yellow;
    float:left;
    font-size:12px;
    font-weight:bold;
}
.icalPreWarn2{
    color:white;
    float:right;
    font-size:12px;
    font-weight:normal;
}
.icalPrePreWarn{
    color:white;
    float:left;
    font-size:12px;
    font-weight:bold;
}
.icalPrePreWarn2{
    color:white;
    float:right;
    font-size:12px;
    font-weight:normal;
}
.icalNormal{
    color:green;
    float:left;
    font-size:12px;
    font-weight:bold;
}
.icalNormal2{
    color:white;
    float:right;
    font-size:12px;
    font-weight:normal;
}
```

#### Calender-based CSS classes
Each span also has a CSS class assigned based on the name of the calendar the event is in The "calendar name" defined in the adapter configuration is used for this (spaces are replaced by underscores).

* _iCal-<calendername>_: This class is used for the date and time part of the HTML
* _iCal->calendername2>_: This class is used for the Event name

To set these CSS classes you need to use the timebased CSS class too, e.g. _.icalNormal2.iCal-<calendername>2_:

```
.icalNormal2.iCal-Google2{
    color:white;
    float:right;
    font-size:12px;
    font-weight:normal;
}
```

#### Example of generated html

```
<span style="font-weight: bold; color:white"><span class="icalNormal iCal-calendar-today">&#8594; 3.1.2018 2:00</span></span><span style="font-weight: normal; color:white"><span class='icalNormal2 iCal-calendar-today2'> TestEvent</span></span><br/>
<span style="font-weight: bold; color: red"><span class="icalWarn iCal-calendar-today">1.1.2018  ganzer Tag</span></span><span style="font-weight:normal;color:red"><span class='icalWarn2 iCal-calendar-today2'> Today Event</span></span><br/>
```

## Filter
In instance options it is possible to maintain a filter per calendar. It have to be a semicolon separated list. If you enable the option `Filter as regular expression` the filter is interpreted as a regular expression. During calendar refresh all events that matches by description, location or summary are excluded.

The search pattern is:
```
SUMMARY:MySummary
DESCRIPTION:MyDescription
LOCATION:MyLocation
```

Blacklist: If you want to exclude all events of a specific location use `LOCATION:MyLocation` or simple `MyLocation` or 2 locations `LOCATION:MyLocation;LOCATION:SomewhereElse`.
Whitelist: If you only want to include events of a specific location use regular expression like `/^(SUMMARY:.*)\s*(DESCRIPTION:.*)\s*(LOCATION:(?!MyLocation).*)$/` or for 2 locations `/^(SUMMARY:.*)\s*(DESCRIPTION:.*)\s*(LOCATION:(?!((MyHomeLocation)|(MyWorkLocation))).*)$/`

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
* (klein0r) Use color picker in adapter settings
* (klein0r) Dropped Admin 4 UI
* (klein0r) Added Ukranian language

### 1.13.2 (2022-08-29)
* (Apollon77) fix strange log messages by downgrading RRule again

### 1.13.1 (2022-06-27)
* (klein0r) Changed request library

### 1.13.0 (2022-06-17)
* (klein0r) Added Admin 5 UI
* (klein0r) Translated all object names

### 1.12.2 (2022-06-03)
* (Apollon77) Fix displaying rest-time of event in one case

### 1.12.1 (2022-03-22)
* (Apollon77) Adjust colorize of dates to also show dates started in the past with todays color

## License

The MIT License (MIT)

Copyright (c) 2014-2022, bluefox <dogafox@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.