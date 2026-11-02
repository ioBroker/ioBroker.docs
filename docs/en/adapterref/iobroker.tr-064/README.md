<img src="admin/tr-064.svg" width="128" height="128">

# ioBroker.tr-064

![Number of Installations](http://iobroker.live/badges/tr-064-installed.svg)
![Number of Installations](http://iobroker.live/badges/tr-064-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.tr-064.svg)](https://www.npmjs.com/package/iobroker.tr-064)

![Test and Release](https://github.com/iobroker-community-adapters/iobroker.tr-064/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/tr-064/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.tr-064.svg)](https://www.npmjs.com/package/iobroker.tr-064)

> [!IMPORTANT]
> This adapter cannot be installed from GitHub

**This adapter uses the Sentry libraries. These libraries report exceptions and code errors automatically to the developers.** For more details, and for information about how to switch off the error reporting, see the [documentation of the Sentry plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry). The Sentry reporting is used from js-controller 3.0 on.

## Info

This adapter reads the most important information from an AVM Fritz!Box. Examples are the call list and the number of messages on the answering machine.

The adapter is based on the [FRITZ! interface documentation](https://fritz.com/pages/schnittstellen/).

## Required settings in your Fritz!Box

- Change the login method to "Use user name and password".
- The Fritz!Box uses a maximum of 32 characters of the password. The Fritz!Box shortens longer passwords in its own user interface without a warning. Therefore, enter only these 32 characters in the configuration of the adapter.
- Create a user and give this user the permission to control the Fritz!Box and its settings.
- Switch on the access for applications on the "Network" tab. In the German user interface, the path is: `Netzwerk` -> `Heimnetzfreigaben` -> `Zugriff für Anwendungen` -> `aktiviert`.
- If you want to use the `ring` function, you must configure additional settings. See the section [ring (dial a number)](#ring-dial-a-number).

## Features

### Simple states and functions

- Switch the Wi-Fi for 2.4 GHz and 5 GHz on and off
- Switch the guest Wi-Fi on and off
- Switch all Wi-Fis with `states.wlan` like the WLAN button of the Fritz!Box: only the Wi-Fis which were active before are switched on again, not the guest Wi-Fi or a band which you switched off
- Restart the Fritz!Box
- Start the WPS process
- Reconnect the internet connection
- Read the external IP address
- Read the internet connection: `states.wanAccessType` (`DSL`, `Ethernet`, `Fiber`, `Cable`, `LTE`, `UMTS`), `states.wanLinkStatus` (`Up`, `Down`, ...), `states.wanProvider`, the line speed `states.wanDownstreamMax`/`states.wanUpstreamMax` (bit/s), the bytes sent and received since the connection was established `states.wanBytesSent`/`states.wanBytesReceived` and the current rates `states.wanSendRate`/`states.wanReceiveRate` (bytes per second). A change of `wanAccessType` shows for example a fallback to a mobile connection

### ring (dial a number)

- If you use an internal number, for example `**610`, the state `ring` lets this internal telephone ring. Example: `**610[,timeout]`
- If you use an external number, the state `ring` connects you with this external number. The Fritz!Box calls the external number, and your default telephone rings as soon as the called person picks up the telephone.

You can configure the default telephone in the Fritz!Box. In the German user interface, the path is: `Telefonie` -> `Anrufe` -> `Wahlhilfe` -> `Wählhilfe verwenden`. Select there also the option `Verbindung mit dem Telefon ISDN- und Schnurlostelefone`.

### toPauseState

- Possible values: `ring`, `connect`, `end`
- You can use this state to pause a video player on an incoming call (`ring`), or when somebody picks up the telephone (`connect`).
- You can continue the playback on the value `end`.

### Presence

You can use this adapter to monitor the presence of persons in your home. In this way you see when a member of your family or a roommate leaves the home or comes back:

- Open the settings of the adapter and switch to the tab "Devices".
- Add all devices of your family members or roommates, for example, their smartphones, and confirm with "Save".
- For every device, the adapter creates a folder structure in the objects of the adapter. Normally this is the folder `tr-064.0.devices`.
- As soon as somebody arrives or leaves, the adapter gets this information. The state `tr-064.0.devices.xxx.active`, where `xxx` is the name of the device, shows whether this device is available, and therefore whether the person is at home.

The option "Show the access point of the devices" (on by default) reads the mesh topology of the Fritz!Box once a minute: `devices.xxx.accessPoint` is the Fritz!Box or the repeater the device is connected to, `devices.xxx.connection` the band (`2.4 GHz`, `5 GHz`, `6 GHz`) or `LAN`. With it a script can react only when a smartphone is connected to the repeater at the entrance. The tab "Mesh" of the settings shows the whole mesh topology as a graphic, while the instance runs.

By default `xxx` is the name of the device in the Fritz!Box, not the name in the table. Switch on "Name the objects after this table" in the tab "Devices" to get the names of the table. Then two devices with the same name in the Fritz!Box get separate objects, and the objects do not move when a device is renamed in the Fritz!Box. When you switch the option on, the objects which were created with the name of the Fritz!Box are deleted on the next start, so scripts, aliases or VIS views which use them have to be adjusted. A name which occurs twice in the table gets a number at the end (`Guest`, `Guest_2`).

A smartphone with a private Wi-Fi address has another MAC address in every Wi-Fi, e.g. in the guest Wi-Fi. Enter all its addresses in the column MAC, separated by commas: the device is present as soon as one of them is active, and `lastMAC-address` shows which one. A rotating private address (iOS 18: "Rotating") changes regularly and cannot be watched this way.

You can also switch on the option "Use mDNS to discover new devices". If mDNS is used, the adapter does not need to poll the Fritz!Box, and it detects changes faster.

Users report that the detection also works reliably for iOS devices, for example, for iPhones. For iPhones, users report that the Fritz!Box needs up to 10 minutes to detect that a person has left and is no longer connected with the Wi-Fi. The Fritz!Box needs up to 1 minute to detect the presence again.

The ioBroker community has published a script that uses this information of the adapter to trigger actions. Examples are: switch off everything automatically after all persons have left the home, show the number of persons that are at home, or show the status of a person in VIS. See the [thread in the ioBroker forum](https://forum.iobroker.net/topic/4538/anwesenheitscontrol-basierend-auf-tr64-adapter-script) (in German).

### Persons, groups, guests (like fb-checkpresence)

The tab "Persons" watches persons instead of single devices. Every row is one person with a name, an optional group and the MAC or IP addresses of all its devices. In the column "MAC / IP" type a part of the name, MAC or IP and choose the device from the list of the Fritz!Box (devices of the tab "Devices" are offered too); an address which is not in the list can simply be typed. Instead of an address the host name of the device in the Fritz!Box can be typed too (e.g. `Annas-iPhone`, upper and lower case do not matter) - it works as long as the device is not renamed in the Fritz!Box. The addresses are stored separated by commas (e.g. `AA:BB:CC:DD:EE:FF, 192.168.178.23, Annas-iPhone`). An IP address only works if the Fritz!Box always gives the device the same address ("Always assign this IPv4 address" in the Fritz!Box); a smartphone with a private Wi-Fi address is better watched by IP or host name than by its changing MAC. IP addresses and host names need the host list of the Fritz!Box; a box without it watches only MAC addresses. A person is present as soon as one of its devices is active. Everything is written below `tr-064.0.presence`:

| State                                                                | Content                                                                                            |
|----------------------------------------------------------------------|----------------------------------------------------------------------------------------------------|
| `persons.<name>.present`                                             | `true` while the person is at home                                                                 |
| `persons.<name>.lastArrival` / `lastDeparture`                       | when the person came / left the last time (ms, `0` = not known yet)                                |
| `persons.<name>.presentSince` / `absentSince`                        | minutes since then, `0` in the other state                                                         |
| `persons.<name>.presentToday` / `absentToday`                        | minutes present / absent since midnight                                                            |
| `persons.<name>.devices`                                             | the active devices of the person                                                                   |
| `persons.<name>.history`                                             | the last comings and goings as JSON, the newest first: `[{"ts": 1791799596991, "present": false}]` |
| `present`, `allPresent`                                              | anybody / everybody is at home                                                                     |
| `presentCount`, `absentCount`, `presentNames`, `absentNames`, `json` | who is at home and who is not                                                                      |
| `groups.<group>.*`                                                   | the same as above for the persons of one group                                                     |
| `guests.present`, `count`, `names`, `json`                           | active devices of the guest network (option "Detect guests")                                       |
| `unknown.present`, `count`, `names`, `json`                          | active devices which are neither in "Devices" nor in "Persons" (option "Detect unknown devices")   |

A smartphone switches its Wi-Fi off in standby. With "Absent after (min)" a person counts as absent only when all its devices are inactive for these minutes; `lastDeparture` is then the moment the last device went offline. The first reading after the setup is no event: `lastArrival` and `lastDeparture` stay `0` until the person comes or leaves for the first time. Times, sums and the history survive a restart of the adapter.

For a longer history, switch on a history instance (history, sql or influxdb) for `persons.<name>.present`, the widgets read the events from there. The objects of a person who is removed from the table are deleted on the next start.

### Answering machine (in German: `Anrufbeantworter`)

You can switch the answering machine on and off. With the state `cbIndex` you select the number of the answering machine.

### Call monitor

The call monitor creates states in real time for every incoming and outgoing call. If the phone book is switched on, which is the default setting, the adapter resolves the numbers into names. There is also a state that shows a ringing telephone.

- `callmonitor.connected` shows whether the adapter is connected to the call monitor of the Fritz!Box.
- `extension` is the port of the telephone which takes or makes the call, `device` its name, e.g. `Mobilteil Küche`. The Fritz!Box reports only the port; the adapter learns the name of every port from the call lists, so `device` is only filled when the call lists are switched on and the telephone was used once. The Fritz!Box knows the telephone of an incoming call only when it is picked up: `callmonitor.connect.device`.
- The Fritz!Box does not report internal calls, e.g. of a door bell which calls `**9`, neither to the call monitor nor over TR-064.

### Phone book

- If the phone book is switched on, the adapter uses it to find the name for the number of the caller.
- There are three more states to resolve a number or a name. If a picture is available, you also get the URL of the picture of the contact.

Example: if you set the state `phonebook.number`, the adapter sets all 3 states, `name`, `number` and `image`, to the values of the contact that was found. Note: for a search by name, the adapter first compares the complete name. If no contact is found, the adapter searches for a part of the name.

If one number is in several phone books with different names, the table "Phone book per own number" in the options decides which name the call monitor shows: enter your own number (the last digits are enough) and the name of the phone book in the Fritz!Box. A call to or from this own number takes the name from this phone book first.

### Call lists

Output formats:

- `json`
- `html`

The following call lists exist:

- all calls
- missed calls
- incoming calls
- outgoing calls

Call counter: you can set the call counter to 0. The next call increases the counter by 1.

You can configure the HTML output with a template.

### Event log

The option "Read the event log of the FRITZ!Box" reads the event log of the Fritz!Box once a minute:

- `deviceLog.json` - the last 50 events, the newest first: `[{"id": 506, "group": "sys", "date": "18.09.26", "time": "10:05:00", "msg": "..."}]`. `group` is `sys`, `net`, `fon`, `wlan` or `usb`.
- `deviceLog.newEvents` - the events since the last reading, written only when there are new ones. After a restart it contains the events since the last run.

With it a script can report a login to the user interface of the Fritz!Box ("Anmeldung des Benutzers ... an der FRITZ!Box-Benutzeroberfläche"). The text of the messages depends on the language of the Fritz!Box. The action `GetDeviceLog` of `states.command` returns a shortened log without these events.

### Write unchanged values

By default the adapter writes a value only when it changes. With the option "Write unchanged values too" every polled value is written with a new time stamp, so a script can use "was updated" instead of "was changed". This increases the load of the database.

### Widgets for vis-2 and ioBroker.devices

The adapter brings widgets which show the state of the Fritz!Box. A click on the tile opens a dialog with the mesh topology, full screen on a phone.

vis-2 (widget set "FRITZ!Box"):

- **FRITZ!Box** (`Tr064FritzBox`): a tile like in ioBroker.devices with the online state, model, kind of the connection, current download and upload, external IP, WLAN and guest WLAN, new messages and missed calls. It chooses its layout by its size, from a small square to a large card with the use of the line. Optionally the chips of the WLAN and the guest WLAN switch them (`switchWlan`).
- **Mesh topology** (`Tr064Mesh`): the mesh topology as a graphic or table which fills the widget, refreshed while it is visible.
- **Presence** (`Tr064Presence`): the configured devices with present/away, access point and band - or, with "Mode" = persons, the persons of the tab "Persons" (optionally of one group) with since when they are at home or away, and the number of guests.
- **Person** (`Tr064Person`): one person, selected by its name. Icon, picture and text for present and for absent are free to choose, as well as the colors. It shows since when the person is at home or away, when it came and left the last time, the sums of today and - if the widget is high enough - the last comings and goings. They come from a history instance (history, sql, influxdb) if one logs `present`, otherwise from the state `history` of the adapter.
- **Wi-Fi QR code** (`Tr064GuestWlan`): the QR code of the guest WLAN or of the own WLAN (2.4 GHz, 5 GHz, and if the box has it the second 5 GHz or 6 GHz) with network name and password - a phone joins by scanning it with the camera. "Show the code": on the widget, in a dialog after a click, or in a dialog after a PIN. The dialog closes by itself after 60 seconds (adjustable, 0 = never).

ioBroker.devices: the widget **FRITZ!Box** can be added to a category in all four sizes (1x1, 2x0.5, 2x1, 2x2); in the settings of the widget the instance of the adapter is selected. The widget **Person** shows one person (selected by its name) with photo or icon, the texts and colors of the settings, since when and the last arrival and departure; a click opens the comings and goings of the last days. The widget **Wi-Fi QR code** shows the QR code of the guest WLAN or of one band of the own WLAN with the same three modes as in vis-2; the PIN is asked with the PIN pad of ioBroker.devices.

The QR code needs a FritzBox user with the right "FRITZ!Box settings" (`GetSecurityKeys`). The adapter reads SSID and password only on request of a widget (message `guestWlan`, `{ wlan: "guest" | "wlan24" | "wlan50" | "wlan52" | "wlan60" }`, the guest WLAN without it), writes them into no state and does not log them. The QR code of the own WLAN gives access to the home network: show it with a PIN or only in the dialog. In the modes with dialog the password is read only while the dialog is open. The PIN is stored in the vis project or the settings of the tile: it keeps guests away from the code, it does not protect against somebody who can edit the project.

The widgets need the states of the adapter version with these widgets (`states.boxModel`, `states.wan*`, ...) and the running instance for the mesh topology.

### The states command and commandResult

With the state `command` you can call every tr-064 command from this [documentation](https://avm.de/service/schnittstellen/). Example:

```javascript
command = {
    "service": "urn:dslforum-org:service:WLANConfiguration:1",
    "action": "X_AVM-DE_SetWPSConfig",
    "params": {
        "NewX_AVM-DE_WPSMode": "pbc",
        "NewX_AVM-DE_WPSClientPIN": ""
    }
};
```

Set the state `command` to the JSON of the lines above, this means to `{ ... }`, without `command =` and without line breaks. The answer of the call is written into the state `commandResult`.

The following example shows how to switch the answering machine of the Fritz!Box on and off with the state `command`. For a test you can copy the text and paste it into the state `tr-064.0.states.command`.

Switch the answering machine on:

`{"service": "urn:dslforum-org:service:X_AVM-DE_TAM:1","action": "SetEnable", "params": {"NewIndex": "0","NewEnable": "1"}}`

Switch the answering machine off:

`{"service": "urn:dslforum-org:service:X_AVM-DE_TAM:1","action": "SetEnable", "params": {"NewIndex": "0","NewEnable": "0"}}`

You find a detailed description of the actions and of the parameters for TAM here: [x_tam.pdf](https://avm.de/fileadmin/user_upload/Global/Service/Schnittstellen/x_tam.pdf). This link is also contained in the AVM documentation above.

### Switch on the call monitor

Before you can use the call monitor, you must switch it on in the AVM Fritz!Box. To switch the call monitor on, dial `#96*5*` on a connected telephone. The Fritz!Box then opens the TCP/IP port 1012. To close the port, dial `#96*4*`.

## Initial creation

@soef created this adapter at https://github.com/soef/ioBroker.tr-064. The adapter is not maintained there anymore. Therefore it was moved to iobroker-community, so that errors can be corrected. Thanks to @soef for his work.

## How to migrate from tr-064-community (intermediate version and name)

If you switch from the adapter tr-064-community, you can copy the complete device list and all settings:

- Open the objects in the admin and switch on the expert mode.
- Search for the object tree `system.adapter.tr-064-community.0`, where `0` is the number of the instance. If you had several instances, select the correct one.
- Click the button with the pencil on the right side of this line.
- In the window, select "raw (experts only)", and copy the part `native` of the JSON.
- Open `system.adapter.tr-064.0`, where `0` is the number of the instance. If you had several instances, select the correct one.
- Paste the copied content into the part `native`.
- Save the changes.
- Start the adapter.
- Check the configuration and control whether everything was restored correctly.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 5.3.1 (2026-10-23)
* (GermanBluefox) Widget "Wi-Fi QR code": the QR code can also show the own WLAN (2.4 GHz, 5 GHz, second 5 GHz, 6 GHz) instead of the guest WLAN

### 5.3.0 (2026-10-23)
* (GermanBluefox) New widget "Guest Wi-Fi QR code" for vis-2 and `ioBroker.devices`: the QR code of the guest WLAN on the tile, in a dialog after a click or in a dialog after a PIN

### 5.2.6 (2026-10-22)
* (GermanBluefox) Widget "FRITZ!Box Person": the comings and goings can be exported as a CSV file for Excel (#763)

### 5.2.5 (2026-10-21)
- (@GermanBluefox) Rejected calls (type 10) are now added to the call lists "all" and "missed" (#757)
- (@GermanBluefox) Fixed: IP addresses were missing in the mesh table view (#755)

### 5.2.4 (2026-10-20)
- (@GermanBluefox) The adapter connects again with a FritzBox user without the right "FRITZ!Box settings" (e.g. only call list and voice messages); such a user gets a warning instead of "The FritzBox refused the login": https://github.com/iobroker-community-adapters/ioBroker.tr-064/issues/754

## License
The MIT License (MIT)

Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2015-2023 soef <soef@gmx.net>, ioBroker-Community-Developers

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