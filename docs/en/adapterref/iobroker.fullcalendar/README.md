![Logo](admin/fullcalendar.png)
# ioBroker.fullcalendar

![Number of Installations](http://iobroker.live/badges/fullcalendar-installed.svg) ![Number of Installations](http://iobroker.live/badges/fullcalendar-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.fullcalendar.svg)](https://www.npmjs.com/package/iobroker.fullcalendar)
[![Downloads](https://img.shields.io/npm/dm/iobroker.fullcalendar.svg)](https://www.npmjs.com/package/iobroker.fullcalendar)

[![NPM](https://nodei.co/npm/iobroker.fullcalendar.png?downloads=true)](https://nodei.co/npm/iobroker.fullcalendar/)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

Schedules with [fullcalendar](https://fullcalendar.io).

## Plan the events (control your devices)
You must not use any external resources, the scheduling is processed only in ioBroker and will be not combined with any external services like "google calendar" or "iTunes".

![Example](img/example.png)

The vis-2 widget in the month view with a dark theme: watering, heating mode and balcony light as events.

![vis-2 widget, month view](img/vis2-widget-month.png)

You can control your events with a calendar and can plan to control them periodically.

- **Duration** of "On/Off" and "Toggle" events can be given in seconds, minutes or hours. With a duration of 1 second, an event works like a push button.
- **Condition** ("Only if"): an event writes its value only if another state has the given value at that time (`==`, `!=`, `>`, `>=`, `<`, `<=`), e.g. the shutter goes down only if the terrace door is closed. If the condition is not met, the whole event is skipped (an "On/Off" event does not write the end value either), and a line is written to the log.
- **Calendars** can be switched off (button in the calendar list or "Active" in the calendar dialog): their events stay, but are not executed until the calendar is switched on again. This way you can prepare scenarios like "Vacation" and switch them by a script (`enableCalendar`, see below).

## Events simulation
You can record your behavior and can play it back later.
For example, you can create two recordings for workday and for weekend and play them back on according days.

Or you can record the whole week and can play it back in the next weeks while you are away.

How to use:
- Go to the simulation tab
- Create the new simulation by clicking on the "+" button and selecting the type of simulation: day or week
- Click the record button and wait 24 hours or 7 days till simulation stops to record events
- Now you can replay the simulation by clicking on the play button. Additionally, you can define the time when the simulation should be started.

## Web components
Besides the vis-2 widget, the adapter brings the calendar as a web component for every host of
[ioBroker web components](https://github.com/ioBroker/web-components), e.g. Aura or devices: `<iob-fullcalendar>`
(`admin/webcomponents/fullcalendar.js`, described by `fullcalendar.json` in `common.webComponents`).

It shows the events of an instance - or of one of its calendars - as month, week, day or list and, unless it is read only,
creates, moves, resizes, edits and deletes them like the widget, in the dialog of the host. It reads and writes the
events through the instance (`sendTo` with `getEventObjects`, `setEventObject`, `deleteEventObject`), so the instance must be running.

Build it with `npm run build-wc` (part of `npm run build`).

## Agenda states
The adapter writes what is planned into states, e.g. to ask a chat or voice assistant about it or to show it in a visualization:

| State                          | Content                                                                         |
|--------------------------------|---------------------------------------------------------------------------------|
| `fullcalendar.0.events.list`        | all events (JSON): name, calendar, state, value, time or cron, next execution |
| `fullcalendar.0.events.today`       | executions today (JSON), also the ones already done                            |
| `fullcalendar.0.events.tomorrow`    | executions tomorrow (JSON)                                                     |
| `fullcalendar.0.events.next`        | the next execution (JSON, `null` = none)                                      |
| `fullcalendar.0.events.count`       | number of events                                                               |
| `fullcalendar.0.events.lastChanged` | time of the last change of an event                                            |

One execution looks like this (times are local times of the ioBroker host):
```json
{"id": "fullcalendar.0.event-…", "name": "Light living room", "calendar": "", "time": "2026-10-28T22:30:00", "ts": 1793223000000,
 "oid": "hm-rpc.0.ABC.1.STATE", "value": false, "recurring": false}
```
A "double" event has `endTime` and `endValue` too, `calendar` is `""` for the default calendar. Events of simulations are not part of the agenda.

## Script and adapter API (sendTo)
Other adapters and scripts can plan events, e.g. a voice assistant for "turn off the light in 2 hours":
```js
// in 2 hours (`in`: seconds, or "90s", "30m", "2h", "1h30m", "1d")
sendTo('fullcalendar.0', 'addEvent', { oid: 'hm-rpc.0.ABC.1.STATE', value: false, in: '2h' }, res => log(JSON.stringify(res)));
// at a time (local time, or a timestamp in ms), for 10 minutes, in the calendar "Garden"
sendTo('fullcalendar.0', 'addEvent', {
    oid: 'hm-rpc.0.PUMP.1.STATE', value: true, start: '2026-10-29T07:30', duration: '10m', calendar: 'Garden', name: 'Pump',
}, res => log(JSON.stringify(res))); // {id, name, type, start, ts} or {error}
// every year on June 15 at 08:00 (a birthday), the start may be in the past
sendTo('fullcalendar.0', 'addEvent', {
    oid: '0_userdata.0.birthday', value: 'Anna', start: '2020-06-15T08:00', recurring: 'yearly', name: 'Birthday Anna',
}, res => log(JSON.stringify(res))); // {id, name, type, start: next execution, ts, cron: "0 0 8 15 6 *"}
// move an event to 09:30 (a series keeps its days) and let it switch for 2 minutes
sendTo('fullcalendar.0', 'updateEvent', { id: 'fullcalendar.0.event-…', start: '09:30', duration: '2m' }, res => log(JSON.stringify(res)));
// delete all events with this name
sendTo('fullcalendar.0', 'deleteEvent', { name: 'Birthday Anna' }, res => log(JSON.stringify(res)));
// a new calendar; addEvent finds it by its name
sendTo('fullcalendar.0', 'addCalendar', { name: 'Garden' }, res => log(JSON.stringify(res))); // {id, name, enabled}
```

| Command          | Message                                                                                    | Answer                                            |
|------------------|--------------------------------------------------------------------------------------------|---------------------------------------------------|
| `addEvent`       | see below                                                                                  | `{id, name, type, start, ts, cron?}` (`start`/`ts` = first execution) |
| `updateEvent`    | `id` and the parameters of `addEvent` to change, see below                                 | `{id, name, type, enabled, start, ts, cron?}` (`start`/`ts` = next execution, `null` if none) |
| `deleteEvent`    | `id`, `ids` (a list) and/or `name` (all events with exactly this name; optional `calendar`) | `{result: "ok", deleted: [id, …], notFound?: [id, …]}` |
| `getEvent`       | `id`                                                                                       | `{event: definition}`                             |
| `getEvents`      | optional `calendar`                                                                        | `{events: [definition, …]}`                       |
| `listEvents`     | optional `from`, `to` (default now … 7 days, or `days`), `calendar`, `max`                   | `{events: [execution, …]}`                        |
| `getCalendars`   | –                                                                                          | `{calendars: [{id, name, enabled}, …]}`           |
| `addCalendar`    | `name` (new); optional `color`, `icon`, `enabled` (default `true`)                         | `{id, name, enabled}`                             |
| `enableCalendar` | `calendar` (name or ID), `enabled` (`true`/`false`)                                        | `{id, enabled}`                                   |
| `getEventObjects` | optional `calendar` (`<namespace>.Calendars.<id>`) | `{events: [object, …]}`: the schedule objects, for the web component |
| `setEventObject` | `event` (a schedule object of this instance) | `{result: "ok"}` |
| `deleteEventObject` | `id` | `{result: "ok"}` |
| `getCommands`    | –                                                                                          | `{commands: [{command, params, answer}, …]}`      |

Parameters of `addEvent`:

| Parameter                  | Meaning                                                                                                    |
|----------------------------|------------------------------------------------------------------------------------------------------------|
| `oid`                      | state to write (must exist and be writable)                                                                |
| `value`                    | value to write                                                                                             |
| `start` or `in`            | `start`: local time (`"2026-10-29T07:30"`, `"07:30"` = today) or a timestamp in ms; `in`: delay (seconds, or `"90s"`, `"30m"`, `"2h"`, `"1h30m"`, `"1d"`) |
| `duration` / `durationSec` | after this time (same formats as `in`) the second value is written; then `type` is `"double"` by default |
| `type`                     | `"single"` (default), `"double"` (writes `endValue` after `duration`), `"toggle"` (switches back after `duration`) |
| `endValue`                 | value of `"double"`; for a boolean `value` the default is the opposite                                    |
| `recurring`                | `"daily"`, `"weekly"`, `"monthly"` or `"yearly"`: repeats at the time of day of `start` (also of a `start` in the past). The day comes from `start`, or from `weekdays` (list, `0` = Sunday or `"MO"`, `"TU"`…), `monthDays` (list, 1…31), `months` (list, 1…12) |
| `rrule`                    | instead of `recurring`: iCal rule, e.g. `"FREQ=YEARLY"`, `"FREQ=WEEKLY;BYDAY=MO,FR"`, `"FREQ=MONTHLY;BYMONTHDAY=1,15"`. Supported: `FREQ` (DAILY, WEEKLY, MONTHLY, YEARLY), `BYDAY` (plain weekdays), `BYMONTHDAY`, `BYMONTH`. Not supported: `INTERVAL` > 1, `COUNT`, `UNTIL`, `BYDAY=2MO` |
| `name`                     | name of the event, default: name of the state                                                              |
| `calendar`                 | name or ID of the calendar, default: the default calendar                                                  |
| `color`                    | color in the calendar                                                                                      |

`updateEvent` changes an event in place, the parameters not given stay as they are:
- `start` or `in` moves a one-shot event; of a series it changes the time of day, the days stay.
- `recurring` or `rrule` make it a series (at the time of `start`, or at its current time of day), `recurring: false` together with `start` or `in` makes it a one-shot event again.
- `value`, `oid`, `type`, `duration`/`durationSec`, `endValue`, `name`, `color` like in `addEvent`. If a boolean event switches the other way (`value`), its end value follows.
- `enabled: false` / `true` switches it off or on.
- `calendar` moves it to another calendar. The event gets a new ID then, the answer has it.

Errors come back as `{error}`, an unknown command answers with the list of the commands. A new event appears in the calendar like one created by hand and can be edited there. Recurring events run at whole minutes.

## Todo
- Week and day must scroll to the current time

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
## Changelog
### 3.5.1 (2026-11-13)
* (@GermanBluefox) Calendar (admin, vis-2 widget and web component): "Today" works also when today is in the view; the list scrolls to today (or to the next day with events), and the day lights up briefly - in the month view its tile, in the week and day view its column

### 3.5.0 (2026-11-13)
* (@GermanBluefox) Added the short form of the web component manifests (tag, name, icon, size) to `common.webComponents`, so that hosts like Aura can list the components before the adapter is installed; the build writes it with `iob-web-components sync-io-package`
* (@GermanBluefox) vis-2 widget: in a narrow widget the list and the toolbar fit (no scrolling sideways, the buttons wrap), the day of the list is one line, and styles of the page can no longer put frames around its entries
* (@GermanBluefox) vis-2 widget and web component: in a narrow month view the events are dots, so a daily event no longer looks like a bar over the whole week
* (@GermanBluefox) vis-2 widget and web component: new option "Only the names of the events" hides the values and the duration ("Watering" instead of "Watering → ON → 20 min. → OFF"); the widget translates ON/OFF, and a repeated double event shows its end
* (@GermanBluefox) Added the message `addCalendar` to create a calendar

### 3.4.1 (2026-11-09)
* (bluefox) Web component: the time of an event always has minutes, so a full hour no longer looks different from "19:45", and a long title ends with "..." instead of being cut off

### 3.4.0 (2026-11-09)
* (bluefox) Added the web component `<iob-fullcalendar>` for Aura, devices and other hosts of web components (`common.webComponents`)
* (bluefox) Added the messages `getEventObjects`, `setEventObject` and `deleteEventObject` for the web component

### 3.3.1 (2026-10-29)
* (@GermanBluefox) Added the admin >= 7.6.17 dependency, the translated name of the admin tab and the uk translations (#557)
* (@GermanBluefox) The adapter timers (`this.setTimeout`/`this.setInterval`) are used instead of the plain ones (#557)
* (@GermanBluefox) Added the message `updateEvent`: move or change an event without deleting and creating it again

## License
The MIT License (MIT)

Copyright (c) 2017-2026 Bluefox <dogafox@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.