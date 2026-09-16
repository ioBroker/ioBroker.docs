![Logo](admin/fritzbox.png)
ioBroker fritzbox Adapter

![Number of Installations](http://iobroker.live/badges/fritzbox-installed.svg)
![Number of Installations](http://iobroker.live/badges/fritzbox-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.fritzbox.svg)](https://www.npmjs.com/package/iobroker.fritzbox)

![Test and Release](https://github.com/iobroker-community-adapters/ioBroker.fritzbox/workflows/Test%20and%20Release/badge.svg)
<!-- [![Translation status](https://weblate.iobroker.net/widgets/adapters/-/fritzbox/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget) -->
[![Downloads](https://img.shields.io/npm/dm/iobroker.fritzbox.svg)](https://www.npmjs.com/package/iobroker.fritzbox)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## AVM Fritz!Box®

The Fritz!Box (own spelling of the manufacturer AVM) is one of the most widely used routers on the market.

There are now models for all common types of internet connection: DSL, cable, mobile and fiber access.

### Adapter Fritzbox

The adapter establishes a connection between the Fritz!Box (short: FB) and ioBroker and provides data and lists of calls.

## Prerequisites before installation

The data exchange takes place via the *call monitor* integrated in the FB. To activate it, dial the following number from a connected telephone:

* `#96*5*` - switch call monitor on
* `#96*4*` - switch call monitor off

## Install

Choose Adapter "fritzbox" in ioBroker Admin

## Configuration

### Settings

Here you only have to activate which data should be transmitted and in which form. According to the developers some data fields are unnecessary (see the graphic and the thread in the forum); this adapter does not receive any further updates, as it can be replaced by the more powerful "TR-064" adapter.

![Post from the forum](doc/konfig_fehler.png)

Further information in the forum [in this thread](https://forum.iobroker.net/viewtopic.php?f=20&t=3344&hilit=fritzbox).

### Autosetup

see [Settings](#settings)

## Instance

Under *Instances* of the ioBroker you find the installed instance of the adapter. On the left it is visualized in a traffic light system whether the adapter is activated and connected.

![instance](doc/instanz.png)

If you place the mouse pointer on a symbol, you get detailed information.

## Objects of the adapter

In the objects area all values, lists and information transmitted by the FB to the adapter are displayed in a tree structure (see settings).

Directly in the instance folder *fritzbox.x* you find the data point *message* with date, time and type of the last action.

![folder hierarchy](doc/ordnerbaum.png)

The respective channels and the data points created therein are briefly described below.

### Channel callmonitor

The data points show the calls in real time.

| **data point** | **description**                                                       |
|----------------|-----------------------------------------------------------------------|
| all            | display of date, time and phone number; incoming and outgoing         |
| call           | display of date, time and phone number; outgoing                      |
| connect        | display of date, time and phone number of an existing connection      |
| ring           | display of date, time and phone number of incoming calls              |

### Channel calls

Within this channel 2 more channels and some data points are created:

![channel calls](doc/calls.png)

| **data point**       | **description**                               |
|----------------------|-----------------------------------------------|
| callLastNumber       | last dialed phone number                      |
| connectNumber        | last currently connected call                 |
| connectNumbers       | all currently connected calls                 |
| missedCount          | counter of missed calls                       |
| missedDateReset      | date of the last counter reset                |
| ring                 | signal for an incoming call                   |
| ringActualNumber     | phone number of a currently incoming call     |
| ringActualNumbers    | phone numbers of all currently incoming calls |
| ringLastMissedNumber | phone number of the last missed call          |
| ringLastNumber       | phone number of the last incoming call        |

#### counterActualCalls

Here the values of the various counters of current calls are listed in real time:

| **data point** | **description**                                       |
|----------------|-------------------------------------------------------|
| allActiveCount | number of all active calls (connected, incoming)      |
| callCount      | number of outgoing calls                              |
| connectCount   | number of existing connections                        |
| ringCount      | number of currently incoming calls                    |

#### telLinks

The data points listed below are formatted as a link, so that the corresponding number can be dialed via the link (e.g. via a widget in VIS):

| **data point**          | **description**                              |
|-------------------------|----------------------------------------------|
| callLastNumberTel       | redial, last dialed phone number             |
| ringLastMissedNumberTel | last missed call                             |
| ringLastNumberTel       | last incoming call                           |

### Channel cdr

These data points provide information in formatted form (see settings).

| **data point** | **description**          |
|----------------|--------------------------|
| html           | last call                |
| json           |                          |
| missedHTML     | last missed call         |
| missedJSON     |                          |
| txt            | last call                |

### Channel history

These data points provide tables in formatted form. Which information is transmitted can be defined in the settings.

| **data point**  | **description**  |
|-----------------|------------------|
| allTableHTML    |                  |
| allTableJSON    | all calls        |
| allTableTxt     |                  |
| missedTableHTML | missed calls     |
| missedTableJSON |                  |

### Channel system

| **data point** | **description**                                             |
|----------------|-------------------------------------------------------------|
| deltaTime      | delta time between ioBroker system time and Fritzbox in sec |
| deltaTimeOK    | test result (true/false)                                    |

## FAQ

**Q: There is the Fritzbox and the TR-064 adapter, which also accesses the FB call monitor. What are the differences, do both adapters have to be installed?**

A: The Fritzbox adapter comes from the initial phase and made only those of the possible information of the router available which concerned the calls.

TR-064 can be considered a further development, as this adapter offers much more extensive information, e.g. about the devices registered at the FB.

In principle it is sufficient if one of the two adapters is installed. However, since many long-standing users use the FB adapter and have built their visualization on it, it remains available but is no longer being developed.

Newcomers are recommended to install the [TR-064 adapter](https://github.com/ioBroker/ioBroker.docs/tree/master/docs/adapterref/docs/iobroker.tr-064/de).

## Data Points Documentation

Under **fritzbox.x.** the adapter creates the following channels and data points:

* message -(Message from the FRITZ!Box)

### `calls` Channel
* calls.ring - true/false, is there an incoming call?
* calls.missedCount - Integer, read & write, number of missed calls
* calls.missedDateReset - Date when calls.missedCount was last reset to 0
* calls.ringActualNumber - currently ringing call - the last one if there are multiple)
* calls.ringActualNumbers - all currently ringing calls
* calls.ringLastNumber - last caller
* calls.ringLastMissedNumber - last missed caller
* calls.callLastNumber - redial, last dialed phone number
* calls.connectNumber - last currently connected call
* calls.connectNumbers - all currently connected calls

### `calls.counterActualCalls` Channel - Realtime
* calls.counterActualCalls.ringCount - number of incoming ringing calls (RING)
* calls.counterActualCalls.callCount - number of outgoing call attempts (CALL)
* calls.counterActualCalls.connectCount - number of active connected calls (CONNECT)
* calls.counterActualCalls.allActiveCount - number of all active calls (CALL, RING & CONNECT)

### `calls.telLinks` Channel - dialable phone numbers tel:+...
* calls.telLinks.ringLastNumberTel - last caller as a dialable link
* calls.telLinks.ringLastMissedNumberTel - last missed caller as a dialable link
* calls.telLinks.callLastNumberTel - redial, last dialed phone number, dialable

### `history.` Channel
* history.allTableTxt - ...
* history.allTableHTML - call list as HTML table
* history.allTableJSON - call list as JSON
* history.missedTableHTML - missed calls list as HTML
* history.missedTableJSON - missed calls list as JSON

### `history.cdr` Channel
* history.cdr.json - CDR as JSON
* history.cdr.html - CDR as HTML
* history.cdr.txt - CDR as TXT
* history.cdr.missedJSON - last missed call as JSON
* history.cdr.missedHTML - last missed call as HTML

### `callmonitor.` Channel
* callmonitor.all - HTML list: all active calls in all states
* callmonitor.ring - HTML list: all active incoming calls
* callmonitor.call - HTML list: all outgoing calls
* callmonitor.connect - HTML list: all connected calls

### `system.` Channel
* system.deltaTime - time delta between system and FRITZ!Box in seconds
* system.deltaTimeOK - true/false, time delta between system and FRITZ!Box within tolerance

### `wlan.` Channel
* wlan.enabled - true/false, read & write, WLAN state, only available when password is configured

### `phonebook.` Channel
* phonebook.tableJSON - phone book of all external numbers as JSON

### `tam.` Channel
* tam.messagesJSON - all messages of the answering machine as JSON

## Example Widgets

### FRITZ!Box Large Widget

Includes it among others:

* a red bar showing the caller's phone number during an active incoming call
* a graphical timeline showing the number of calls by type: ringing, call setup, and connected
* counter for missed calls with a reset button
* list of missed calls
* list of all calls with color coding (connected/not connected) and direction
* counters for: currently ringing calls, outgoing call setups, connected calls, total calls/call attempts
* an info field that turns yellow when the FRITZ!Box time deviates too much from the ioBroker system time

![FRITZ!Box large widget](doc/iobroker_fritzbox_widget_gross.png)

[ioBroker FRITZ!Box large widget as VIS import file](https://github.com/iobroker-community-adapters/ioBroker.fritzbox/blob/master/widgets/iobroker_fritzbox_widget_gross.json)

### FRITZ!Box Live Call Monitor Widget

Shows all active calls, incoming calls (ringing), and outgoing call setups. The duration is displayed for active calls and incoming calls (updated every second).

![FRITZ!Box live call monitor widget](doc/iobroker_fritzbox_anrufmonitor.png)

[ioBroker live call monitor widget for import into VIS](https://github.com/iobroker-community-adapters/ioBroker.fritzbox/blob/master/widgets/iobroker_fritzbox_anrufmonitor.json)

### FRITZ!Box Call List Widget using the "basic - HTML Widget"

The column contents and their headers can be freely chosen in the widget. This also allows headings in other languages.

![FRITZ!Box call list widget with the basic - HTML widget](doc/iobroker_fritzbox_html_table.png)

[ioBroker call list widget with the basic - HTML widget for import into VIS](https://github.com/iobroker-community-adapters/ioBroker.fritzbox/blob/master/widgets/iobroker_fritzbox_html_table.json)

### FRITZ!Box Widgets: Information About Current and Past Callers

The info widgets are examples of individual data points generated by the FRITZ!Box adapter.

There is one data point with the phone number as output by the FRITZ!Box (a), and one data point with the phone number converted to a dialable link (b) (e.g. the number 020147114711 is displayed and linked with tel:+4920147114711). The tel-links are useful, for example, on VIS interfaces on smartphones, to return a missed call with a single tap.

Example widgets:
* (1) last caller
* (2) current caller (shown for the duration of ringing)
* (3) last caller who was missed (not answered)
* (4) redial: last dialed a phone number

![FRITZ!Box widget information about recent calls](doc/iobroker_fritzbox_letzte_telefonate.png)

[ioBroker widget information about recent calls](https://github.com/iobroker-community-adapters/ioBroker.fritzbox/blob/master/widgets/iobroker_fritzbox_letzte_telefonate.json)

## JSON Data Format for JSON CDR and JSON Call List

```json
{
    "date":"25.07.15 16:40:21",
    "dateEpoch":1437835221000,
    "dateEpochNow":1437835221000,
    "deltaTime":0,
    "deltaTimeOK":true,
    "type":"DISCONNECT",
    "id":"1",
    "extensionLine":"11",
    "ownNumber":"021147114711",
    "externalNumber":"051112345678",
    "lineType":"POTS",
    "durationSecs":"55",
    "durationForm":"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;55",
    "durationSecs2":"55",
    "durationRingSecs":"",
    "connect":true,
    "direction":"out",
    "dateStartEpoch":1437835144000,
    "dateConnEpoch":1437835167000,
    "dateEndEpoch":1437835221000,
    "dateStart":"25.07.15 16:39:04",
    "dateConn":"25.07.15 16:39:27",
    "dateEnd":"25.07.15 16:40:21",
    "callSymbol":"<<-&nbsp;",
    "callSymbolColor":"<span style=\" color:green\"><b><<-&nbsp;</b></span>",
    "unknownNumber":false,
    "ownNumberForm":"021147114711&nbsp;&nbsp;&nbsp;",
    "externalNumberForm":"051112345678&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
    "ownNumberE164":"+4921147114711",
    "externalE164":"+4951112345678",
    "externalTelLink":"<a style=\" text-decoration: none;\" href=\"tel:+4951112345678\">051112345678&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>",
    "externalTelLinkCenter":"<a style=\" text-decoration: none;\" href=\"tel:+4951112345678\">051112345678</a>"
}
```
<!--
## todo
* Doku der Datenpunkte
* Import des xml Telefonbuch der Fritzbox
* Feinere Konfiguration der Anruferliste (Tabellen)
-->

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.0.0 (2026-09-09)
- (copilot) Adapter requires node.js >= 22 now
- (copilot) **ENHANCED**: Translated README documentation from German to English
- (GermanBluefox) Merged the ioBroker.net manual (docs/de, docs/en) into a single README.md
- (GermanBluefox) The adapter was refactored to TypeScript, the sources are in `src/` and are compiled to `build/`
- (GermanBluefox) The admin configuration was migrated from the HTML page to JsonConfig, the translations moved to `admin/i18n/<lang>.json`
- (GermanBluefox) `request` was replaced by `axios`
- (GermanBluefox) `enableWlan`, `enablePhonebook` and `enableTAM` have a default in io-package.json now, unused `native` entries were removed
- (GermanBluefox) The adapter cannot be installed directly from GitHub anymore, because the sources have to be compiled (`common.nogit`)
- (GermanBluefox) **FIXED**: after a lost connection, the adapter tried to reconnect only once
- (GermanBluefox) **FIXED**: the tel: links were not initialized, they were written to `telLinks.*` instead of `calls.telLinks.*`
- (GermanBluefox) **FIXED**: the cleanup of the answering machine audio files looked into the working directory instead of the instance directory
- (GermanBluefox) The adapter supports the compact mode now

### 0.7.0 (2026-03-07)
- (iobroker-bot) Adapter requires node.js >= 20 now.
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (mcm1957) Dependencies have been updated

### 0.6.0 (2024-04-11)
* (mcm1957) Adapter requires node.js >=18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 0.5.0 (2022-04-02)
* (Apollon77) Write history.missedTableJSON value
* (Apollon77) Store tam files in an instance-specific location
* (Apollon77) Fix crash cases reported by Sentry

### 0.4.0 (2022-03-25)
* IMPORTANT: You need to re-enter the password once after installing this version!
* (Khaos66/Apollon77) General updates and fixes
* (Khaos66) TAM (Telephone Answering Maschine) support added
* (Apollon77) Add Sentry for crash reporting

## License

The MIT License (MIT)

Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2015-2022, ruhr70

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