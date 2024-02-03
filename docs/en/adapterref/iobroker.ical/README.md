---
BADGE-Number of Installations: http://iobroker.live/badges/ical-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.ical.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.ical.svg
---
![Logo](ical.png)
# ioBroker.ical
ioBroker.ical is an adapter for the ioBroker automation platform focusing on iCalendar files, widely used for storing and sharing calendar data. It allows users to read and parse iCalendar files locally or from a specified URL.  

With ioBroker.ical, you can perform various actions based on calendar events, such as triggering smart home devices, sending notifications, or executing specific scripts or routines. For example, you could create automation rules that turn on the lights when a particular event is about to start or send a reminder notification for an upcoming appointment.  

Sentry reporting, starting with js-controller 3.0, means that this adapter can use Sentry libraries to report exceptions and code errors to developers automatically. For more details and how to disable error reporting, see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry). 

## Usage
ioBroker.ical reads calendar files in `.ics` format and writes events, in a predefined time interval, into the ioBroker variable. Alternatively, using a local .ics file by using the absolute path to the file instead of the URL is possible. They may be displayed in VIS using `basic html - String (unescaped)`.

Two variables are created:
1. `iCalReadTrigger`
1. `iCalEvents`

The variable `iCalReadTrigger` triggers the read-in process.
The variable iCalReadTrigger triggers the read-in process. In succession, Calendars will read from settings, where users can deposit several URLs, and the result is summarized.
Alternatively, users may also give the read command a URL, e.g. temporarily read another calendar.

To read default URLs, the string `read` must write to the variable `iCalReadTrigger` 

The string `read https: // ...` must write to the variable iCalReadTrigger to read from the default URLs.

The result returns the iCal adapter in the variable `iCalEvents`.

By writing a `check` to` iCalReadTrigger`, the check on events will trigger the read data without re-reading the data.

Alternatively, the adapter can automatically query the calendars in a definable interval (only with the `default URL`).
To do this, set the polling interval (in minutes) in the settings with the variable runEveryMinutes.

## Config file options

- `preview`: 7 # means that appointments will display 7 days in advance
- `runEveryMinutes`: 30 # means the adapter automatically revisits the calendar every 30 minutes. If 0, it will not read automatically.
- `colorize`: true # Today's appointments and appointments  currently running will be colored red, with tomorrow's appointments  orange. This option overrides the option everyCalOneColor
- `debug`: false # if true, extended output writes to the CCU.IO log
- `defColor`:` white` # sets the default color of the calendar entries
- `fulltime`: ` ` # determines which string will replace 00:00 for all-day appointments. For spaces (between the quotes), the time will omit for all-day appointments.
- `replaceDates`: true # If true, today's date is replaced by the string todayString (for example, today). Tomorrow's appointments through the string tomorrowString
- `everyCalOneColor`: false # If true, multiple calendars will have each calendar colored in a color to be specified. This will not work with the colorize option set!
- `Calendar1`:
    - "calURL": "http: //11111.ics", URL of the calendar
    - "calColor": "white" color of the calendar, if the option "everyCalOneColor" is set.
     
  Users may enter any number of calendars. The standard config file contains two calendars.
- `Events`:
  - `name`:" vacation ":
  - `enabled`: true # determines if the event will be edited
  - `Set ID`: Can enter an additional state, which is updated when the event is active
  - `On / Off`: Can write an alternative value to the state stored under 'Set ID'
  - `display`: false # determines whether the event is also displayed in the iCalEvents, or only evaluated
  - `Set Ack`: false # Ack "off" controls the state, e.g. to switch something. #true Ack "on" updates the value.
  
  By setting an event (in this example, "vacation"), the calendars search for the string "vacation".
  If an appointment with the keyword "vacation" is in a calendar, then a state with the Name holiday is automatically set to True. If the appointment is over, the state will reset to false.
  A status will create for each day of the preview period. Danger!
  It will search for a substring, i. an entry in the calendar "vacation" is recognized as well as an
  Entry "holiday parents". This must be taken into account when setting the events.  
- Explanation of the states under ical.0.events.0:
  - The event in the path ical.0.events.0.later sets to true if it is still happening today but has not started yet
  - The event in path ical.0.events.0.now sets to true if it is currently active
  - The event in the path ical.0.events.0.today sets to true if the event is active today
  - Note: events from previous days are not displayed


By adjusting the CSS in the VIS, the styles of today's (standard red) and tomorrow's dates (standard orange) can be set:
- `iCalWarn` - Newline calendar entry today
- `iCalPreWarn` - beginning of line calendar entry tomorrow
- `iCalNormal` - end of line from today
- `iCalNormal2` - tomorrow's end of line

### Calendars
#### Apple iCloud Calendar
Apple iCloud calendars are viewable if previously shared. It's best to create your own calendar for Homematic, as the calendar will share with everyone.
To do this, right-click on the calendar in the Calendar app and select Share Settings. Now check "Public Calendar" and copy the displayed URL. IMPORTANT: the URL starts with webcal: // p0X-cale .....
` http` must replace `webcal`. Then enter this URL either in the settings at defaultURL, or specify it in `read URL`, eg. `readURL http: // p-03-calendarws.icloud.com / xxxxxxxxx`

#### Google Calendar
To include a Google Calendar, go to the Google Calendar calendar setting (mouse click on the "down arrow" next to the calendar). Find the calendar URL  by clicking the `ICAL` symbol next to the " Private address " field. Then enter this URL either in the settings at defaultURL or specify it in `read URL`, eg. `readURL https: // www.google.com / calendar / ical / xxxxxxxx / basic.ics`.

#### OwnCloud Calendar
To include a hardcooked calendar of an OwnCloud, you have to approve this calendar in the calendar view in OwnCloud as a hardcourt calendar and share the link. Add URL (https://&lt;DOMAIN&gt;/remote.php/dav/calendars/USER/xxxxxxx_shared_by_xxxxxx?export) in the ioBroker.ical adapter with username and password.

#### NextCloud Calendar
To include a NextCloud calendar, copy the download link of the  desired user calendar in the calendar view in NextCloud.
To do this, log in to NextCloud as a user and go to 'Calendar'. In the left column, click on the desired calendar by the circle with three dots.
In the menu that appears, hover with the mouse over 'Download' and right-click to copy the link.
Example: https://&lt;DOMAN&gt;/remote.php/dav/calendars/MYCALENDAR/personal/?export (the link must contain "?export").

Enter this URL into the ioBroker.ical adapter with the username and password, mandatory for all individual desired calendars of all users.

#### Baikal lightweight CalDAV+CardDAV Server
The Baikal server offers the "ics-export" plugin that allows exporting calendar as a single ICal file. This export plugin is selected with the URL and allows seamless integration with this ioBroker adaptor. Please add the export filter to the URL of your calendar (`https://SERVER/baikal/cal.php/calendars/path/to/calendar?export&accept=ical`). If you encounter authentication issues, please change the `WebDAV authentication type` from `DIGEST` to `BASIC` in the admin settings of the WebUI of the Baikal server.

### CSS
The generated HTML includes two kinds of CSS classes to allow design freedom.

#### Timebased CSS classes
* _iCalNormal_/_iCalNormal2_: The Event started before today (and is still running) or later as in 3 days, default color without CSS and without a calender color is the configured adapter color
* _iCalWarn_/_iCalWarn2_: The Event starts today, default color without CSS and without a calendercolor is `red`
* _iCalPreWarn_/_iCalPreWarn2_: The Event starts tomorrow, default color without CSS and  a calendercolor is `orange`
* _iCalPrePreWarn_/_iCalPrePreWarn2_: The Event starts day after tomorrow, default color without CSS and without a calendercolor is `yellow`
Uses the first CSS class (e.g. iCalNormal) for the date and time part of the HTML and the second CSS class (e.g. iCalNormal2) is used for the Event name.

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
Each span also has a CSS class assigned based on the calendar's name. The event is in the "calendar name" defined in the adapter configuration for this (underscores replace spaces).

* _iCal-<calendername>_: The date and time part of the HTML uses this class.
* _iCal->calendername2>_: The Event name uses this class.

To set these CSS classes, you need to use the time-based CSS class too, e.g. _.icalNormal2.iCal-<calendername>2_:

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
In instance options, it is possible to maintain a filter per calendar, which must be a semicolon-separated list. Enabling the option `Filter as regular expression`, will interpret the filter as a regular expression. A calendar refresh will exclude all events that match by description, location or summary.

The search pattern is:
```
SUMMARY:MySummary
DESCRIPTION:MyDescription
LOCATION:MyLocation
```

Blacklist: If you want to exclude all events of a specific location use `LOCATION:MyLocation` or simple `MyLocation` or 2 locations `LOCATION:MyLocation;LOCATION:SomewhereElse`.
Whitelist: If you only want to include events of a specific location, use regular expression like `/^(SUMMARY:.*)\s*(DESCRIPTION:.*)\s*(LOCATION:(?!MyLocation).*)$/` or for 2 locations `/^(SUMMARY:.*)\s*(DESCRIPTION:.*)\s*(LOCATION:(?!((MyHomeLocation)|(MyWorkLocation))).*)$/`

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.14.2 (2024-01-29)
* (jens-maus) update node-ical to latest 0.17.2

### 1.14.1 (2024-01-29)
* (klein0r) Create dummy file in files tab
* (klein0r) Fixed recurring events

### 1.14.0 (2024-01-07)
* (klein0r) Allow to set custom http user agent
* (klein0r) Added option to use files tab for calendar files

### 1.13.6 (2023-12-25)
* (mcm1957) Incorrect jsonConfig has been fixed [#602]
* (mcm1957) Dependencies have been updated

### 1.13.5 (2023-12-15)
* (jens-maus) updated node-ical to latest 0.17.1

## License

The MIT License (MIT)

Copyright (c) 2014-2024, bluefox <dogafox@gmail.com>

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