![Logo](admin/eventlist.png)
# ioBroker.eventlist

![Number of Installations](http://iobroker.live/badges/eventlist-installed.svg)
![Number of Installations](http://iobroker.live/badges/eventlist-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.eventlist.svg)](https://www.npmjs.com/package/iobroker.eventlist)

![Test and Release](https://github.com/ioBroker/iobroker.eventlist/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/eventlist/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.eventlist.svg)](https://www.npmjs.com/package/iobroker.eventlist)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Event-List adapter for ioBroker
Allows defining the states that must be logged in the event list.

The list can be shown in admin, web, vis, saved as PDF, material (not yet implemented).

Additionally, you can send events via Telegram or WhatsApp.

![List](img/list.png)

![PDF](img/pdf.png)

## Settings of a state
A state is normally added to the list in the instance settings, where the whole set of settings is
available: texts, colours, icons, messengers and the standing messages.

The most important of them are also in the custom settings of the object itself, the tab behind the
gear symbol in the objects list: the event text, "only changes", and for a boolean state the text
and the colour of TRUE and FALSE. This is the same set the old dialog of the adapter offered, and it
writes into the same place, `common.custom.<eventlist.X>`, so both ways can be mixed.

## Alarm mode
The events could be generated only in alarm mode.
The alarm mode could be controlled by variable `eventlist.X.alarm`.
 
Additionally, the messages to messengers could be sent only if the alarm mode is ON.

Use case:
- E.g., door sensor can send the messages only if nobody is home. Else the events about door opening will be only collected in the event list.  

## Messages
Beside the event list, which logs what happened, the adapter keeps a list of what is *standing*: a
message comes when a condition becomes true, it goes when the condition becomes false, and it leaves
the list only once it has been acknowledged. This is the usual behaviour of a control room and
something the event list alone cannot do.

Do not confuse it with the alarm mode above. The alarm mode is an arming switch, a message is a
fault.

### Levels
`fatal`, `error`, `warning` and `info`. The two severe ones have to be acknowledged by default, the
other two do not; every message can override that.

### The four states of a message
| code | active | acknowledged | in the list |
|------|--------|--------------|-------------|
| K    | yes    | no           | yes         |
| KQ   | yes    | yes          | yes         |
| KG   | no     | no           | yes         |
| KGQ  | no     | yes          | no          |

A message that goes and comes again before it was acknowledged does not produce a second entry, it
counts its repetitions instead. So a flapping contact cannot flood the list.

### Messages from a state
The message settings sit next to the other settings of a state, in
`common.custom.<eventlist.X>.message`:

```json
{
    "level": "error",
    "text": "%n too hot: %s%u",
    "condition": { "operator": ">", "limit": 90 },
    "requiresAck": true,
    "priority": 50,
    "hysteresis": 5,
    "delay": 3000,
    "delayGone": 60000,
    "group": "boiler"
}
```

`condition` is either a comparison with `operator` and `limit` for numbers, or a `value` that raises
the message for booleans and texts. In the text the patterns `%s`, `%u`, `%n` and `%l` may be used.

For states with an enumeration, every single value can carry a `level` instead. Then every value is
its own message and only the one of the current value stands. Text, group and the delays are shared
by all of them.

### Quiet in the list
Four settings keep the list readable, all of them optional:

| setting | |
|---|---|
| `delay` | the condition has to hold that many milliseconds before the message comes |
| `delayGone` | the same for going. A fault that stops for a moment is not repaired. |
| `hysteresis` | only for numbers: a message that stands goes only once the value has come back over the limit by that much. Against a value that trembles at its limit. |
| flapping protection | set for the whole instance, by default more than ten transitions in five minutes |

A message that flaps stays in the list, is marked with `flapping` and writes no further entries into
the event list until it has calmed down. Only the beginning and the end of the restlessness are
written, so a loose contact costs two lines and not two hundred.

### Groups
`group` is a free name. Messages of the same group are acknowledged together, and the one that came
first is marked with `first` in the list — usually the fault, while the rest is its consequence.

```js
// acknowledge the whole group
setState('eventlist.0.messages.ack', 'boiler');
```

### Messages from a script
Not every fault hangs on a single signal. A script can raise and clear a message itself, the freely
chosen `id` holds it together over its life cycle:

```js
sendTo('eventlist.0', 'message', {
    id:    'heating.flow',
    level: 'error',
    text:  'Flow too cold although the pump runs',
});

// the same message goes again
sendTo('eventlist.0', 'message', { id: 'heating.flow', state: 'gone' });
```

A message from a foreign system may bring a `severity` from 1 to 1000 instead of a level, as OPC UA
does. It is mapped onto a level: above 800 `fatal`, above 500 `error`, above 200 `warning`, the rest
`info`.

### Acknowledging
```js
// one message, a group, or "*" for everything that can be acknowledged
setState('eventlist.0.messages.ack', 'heating.flow');

// with the name of the user, and with the number of acknowledged messages as an answer
sendTo('eventlist.0', 'ack', { id: '*', user: 'ben' }, result => console.log(result.acknowledged));

// read the standing messages
sendTo('eventlist.0', 'messages', null, result => console.log(JSON.stringify(result)));
```

### During a maintenance
While somebody works on the heating, everything reports. A message or a whole group can be taken out
of the list for a while:

```js
// half an hour of quiet for the group "boiler"
setState('eventlist.0.messages.suppress', 'boiler:30');

// the same with the message API, and "*" suppresses everything
sendTo('eventlist.0', 'suppress', { target: 'boiler', minutes: 30 });

// let it back in
setState('eventlist.0.messages.suppress', 'boiler:0');
```

Without a duration the one from the instance settings is used, an hour by default, and a suppression
lasts a month at most. That end matters: a message that is suppressed for ever is a fault nobody
knows about any more. A suppressed message keeps working internally, it is only out of the list, out
of the counters and out of the event list; the beginning and the end of the suppression are written
into the event list, so the gap in the history has a reason.

### The table in the admin
The instance settings have a tab **Messages** with everything that stands: level, the combined state
`K` / `KQ` / `KG`, how long it has been standing, the text, the value, how often it came, the group
and the state ID. The first message of a group and a flapping one are marked, what is suppressed at
the moment is named above the table, and single messages or all of them at once can be acknowledged
from there. The order is the one of a control room: level, then priority, then time.

### The horn
`messages.horn` is true while an unacknowledged message of a configurable level or a more severe one
stands, by default from `error` on. It is meant for a siren, a lamp or a tile colour and goes quiet
with the acknowledgement, not with the repair. Messages that nobody has to acknowledge never sound
it.

### States
| state | |
|---|---|
| `messages.list` | the standing messages, sorted and ready for display |
| `messages.raw` | the same messages with their internal state, survives a restart |
| `messages.count` | how many messages stand |
| `messages.countFatal` … `countInfo` | the same per level |
| `messages.unacknowledged` | how many of them nobody has acknowledged |
| `messages.highest` | the most severe standing level, empty if nothing stands |
| `messages.horn` | an unacknowledged message from the configured level on stands |
| `messages.ack` | write here to acknowledge a message, a group or `*` |
| `messages.suppress` | write here to suppress, as `target:minutes` |
| `messages.suppressed` | what is suppressed at the moment, and until when |

Every transition also writes a normal entry into the event list, with the level, the message id and
what happened. So the history stays complete and all existing views, the PDF and the messengers keep
working.

After a restart the conditions are evaluated again. A message whose condition is no longer true goes
at that moment and stays in the list unacknowledged, because otherwise nobody would ever learn that
the fault happened. Messages from a script cannot be re-evaluated, only the script knows their
condition, so they stay as they were. Running delays do not survive a restart, they start again;
suppressions do, they keep running until their end.

## Possible presentations

### In the Admin as tab
You can enable the event list as a tab in the admin.

### Web
Event list could be shown under `http://<IP>:8082/eventlist/index.html`. (for instances > 0: `http://<IP>:8082/eventlist/index.html?X`, where X is the instance number)

### Vis Widget
Event list can be displayed as a vis widget. 

### Device manager
The device manager shows a tile with the newest event. A click on it opens the whole list in a
dialog. The tile can be limited to the events of one state, so every device can have its own tile.

### PDF generation
There is a possibility to generate a PDF document with all events.

Document title can consist the generation date if you place the pattern into it: `Event list on {{YYYY MM DD}}`. 
The exact description of time format could be found here: https://momentjs.com/docs/#/displaying/format/

The generation of PDF can be triggered by writing a `true` into `eventlist.0.triggerPDF`. 

The PDF file could be accessed via:
- web: `http://<IP>:8082/eventlist/eventlist/report.pdf` (for instances > 0: `http://<IP>:8082/eventlist/eventlist/report-X.pdf`, where X is the instance number)
- admin: `http://<IP>:8081/files/eventlist/report.pdf` (for instances > 0: `http://<IP>:8081/files/eventlist/report-X.pdf`, where X is the instance number)

**The icons could not be shown in PDF.**

## Message box
Users can add custom events to the list via javascript:
```js
// add custom event to event list
sendTo('eventlist.0', 'insert', {
    event: 'My custom text', 
    id: 'ID.that.linked.with.this.event',  // optional 
    ts: new Date('2020-09-25T16:11:00'),    // optional. Default is Date.now()
    val: 5,                                // optional 
    duration: 5,                           // in ms
});

// Or simple
sendTo('eventlist.0', 'insert', 'My custom text');
// or
setState('eventlist.0.insert', 'My custom text');
// or
setState('eventlist.0.insert', JSON.stringify({event: 'My custom text %s', val: 5}));
```

User can request a formatted JSON list for a specific ID. Of course the ID must be enabled in the `eventlist` before.
```js
// add custom event to event list
sendTo('eventlist.0', 'list', {
    ids: ['my.0.state.id1', 'my.0.state.id2'],
    count: 10, // optional limit of maximal lines in table,
    allowRelative: false, // optional if relative times, e.g. "one minute ago", may be used (Default: true)
}, result => {
    console.log(JSON.stringify(result)); // array with events
    // result = [{id: 'my.0.state.id1', 
    //
});

// or 
sendTo('eventlist.0', 'list', 'my.0.state.id1', result => {
    console.log(JSON.stringify(result)); // array with events
});
```

Users can delete some or all events from the event list.
```js
// delete all events
sendTo('eventlist.0', 'delete', '*', result => {
    console.log(`Deleted ${result.deleted} events`);
});

// delete all events for specific state ID
sendTo('eventlist.0', 'delete', 'hm-rpc.0.AEOI99389408.1.STATE', result => {
    console.log(`Deleted ${result.deleted} events`);
});

// delete one event by timestamp
sendTo('eventlist.0', 'delete', '2020-10-20T21:00:12.000Z', result => {
    console.log(`Deleted ${result.deleted} events`);
});
```

## Patterns
In the event texts and in the state texts, the following patterns could be used:
- %s - value (`State changed to %s` => `State changed to 5`), 
- %u - unit (`State changed to %s%u` => `State changed to 5%`), 
- %n - name (`%n changed state to %s` => `Device A changed state to 5`), 
- %t - time (`State changed state on %t` => `State changed state on Sep Fr, 16:32:00`), 
- %r - relative time (`State changed state %r` => `State changed state 5 seconds ago`),
- %d - duration (`State was in previous state for %d` => `State was in previous state for 5s`), 
- %g - value difference, so the new value minus the previous one. Only for states of type `number` (`State was changed on %g%` => `State was changed on 1%`),
- %o - previous value (`State changed value from %o to %s` => `State changed value from 4 to 5`)

## Usage of multiple instances in the web
E.g., you can show the specific list for instance 2, like `http://IP:8082/eventlist/index.html?2`.

The generated report will be stored for instance 0 in `eventlist/report.pdf`, but for instance 1 in `eventlist/report-1.pdf`.

## Todo
- Change initial texts in PDF in according language
- Many predefined icons (minimum 100)
- Send messages to syslog (maybe splunk) https://www.npmjs.com/package/splunk-logging

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### **WORK IN PROGRESS**
* (@GermanBluefox) Added devices widget
* (@GermanBluefox) Added messages with levels, coming and going, and acknowledgement
* (@GermanBluefox) Added delays, hysteresis, groups, flapping protection, suppression and horn for the messages
* (@GermanBluefox) Added the tab with the standing messages and the acknowledgement in the admin
* (@GermanBluefox) Brought the settings of a state back into the custom tab of the objects, as a JSON config component
* (@GermanBluefox) Fixed the alarm mode, that was switched off by every restart

### 3.0.0 (2026-09-04)
* (@GermanBluefox) Updated packages
* (@GermanBluefox) A Minimum node.js version is 22
* (@GermanBluefox) Migrated to TypeScript
* (@GermanBluefox) Added blockly und vis-2 widgets (only for vis-2 >= 2.20.0)

### 2.1.0 (2025-05-20)
* (maeb3) Correction for handover of a message to pushover
* (bluefox) The packages were updated
* (bluefox) GUI migrated to vite

### 2.0.1 (2024-02-11)
* (bluefox) Translated the duration

### 2.0.0 (2023-10-12)
* (bluefox) Caught errors by subscribe
* (bluefox) Minimum node.js version is 16

### 1.2.4 (2023-05-17)
* (bluefox) Just the packages were updated

### 1.2.3 (2023-03-16)
* (bluefox) Corrected the edit of the event sources
* (bluefox) Added possibility to use default texts for string values like for booleans

### 1.2.2 (2022-12-27)
* (bluefox) Corrected web page loading in web adapter

### 1.2.1 (2022-12-23)
* (bluefox) Updated GUI packages

### 1.2.0 (2022-11-12)
* (bluefox) Fixed error with edit of the state settings
* (bluefox) Added possibility to use default texts for string values like for booleans

### 1.1.1 (2022-10-12)
* (bluefox) Fixed icons of devices
* (bluefox) Migrated GUI to `mui5`
* (bluefox) Allowed the editing of list name
* (Hirsch-DE) corrected events without a unit

### 1.0.1 (2022-06-22)
* (bluefox) Added preparations for ioBroker cloud

### 1.0.0 (2022-06-20)
* (bluefox) Allowed working behind reverse proxy

### 0.5.5 (2022-04-23)
* (Apollon77) Fix a crash issue
* (Apollon77) Add Sentry also for the Node.js part

### 0.5.4 (2022-02-14)
* (bluefox) Corrected the image paths

### 0.5.3 (2022-02-13)
* (bluefox) Corrected the error with "changes only" option
* (bluefox) Added possibility to use icons with custom events

### 0.4.4 (2021-06-24)
* (bluefox) Corrected the warning for js-controller 3.x

### 0.4.3 (2021-04-19)
* (bluefox) Added the support for Admin5

### 0.4.2 (2020-12-05)
* (bluefox) Added possibility to add multiple states
* (bluefox) Moved the duration to the previous state
* (bluefox) Support for multiple instances

### 0.4.0 (2020-11-10)
* (bluefox) Added setting of even/odd background for widget
* (bluefox) Added filter

### 0.2.9 (2020-10-20)
* (bluefox) Corrected error in GUI by disabling of state
* (bluefox) Implemented the deletion of events from the event list

### 0.2.8 (2020-10-14)
* (bluefox) Corrected error in pdf settings  
* (bluefox) Implemented the recalculation of the relative time every 10 seconds

### 0.2.6 (2020-09-25)
* (bluefox) Corrected error in pdf creation

### 0.2.5 (2020-09-24)
* (bluefox) Extended icon selector

### 0.2.1 (2020-09-21)
* (bluefox) Vis-widget was corrected

### 0.1.3 (2020-09-15)
* (bluefox) Implemented the alarm mode and messengers

### 0.0.3 (2020-09-08)
* (bluefox) Objects with states are supported now

### 0.0.2 (2020-09-07)
* (bluefox) initial commit

### 0.0.1
* (bluefox) initial release

## License
MIT License

Copyright (c) 2020-2026 ioBroker <dogafox@gmail.com>

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
