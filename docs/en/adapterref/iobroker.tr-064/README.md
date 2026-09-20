<img src="admin/tr-064.svg" width="128" height="128">

# ioBroker.tr-064

![Number of Installations](http://iobroker.live/badges/tr-064-installed.svg)
![Number of Installations](http://iobroker.live/badges/tr-064-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.tr-064.svg)](https://www.npmjs.com/package/iobroker.tr-064)

![Test and Release](https://github.com/iobroker-community-adapters/iobroker.tr-064/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/tr-064/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.tr-064.svg)](https://www.npmjs.com/package/iobroker.tr-064)

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
- **Presence** (`Tr064Presence`): the configured devices with present/away, access point and band.

ioBroker.devices: the widget **FRITZ!Box** can be added to a category in all four sizes (1x1, 2x0.5, 2x1, 2x2); in the settings of the widget the instance of the adapter is selected.

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
### 5.1.0 (2026-09-19)
- (@GermanBluefox) New widgets for vis-2 ("FRITZ!Box", "Mesh topology", "Presence") and for ioBroker.devices ("FRITZ!Box"): the state of the box as a tile, a click shows the mesh topology
- (@GermanBluefox) New states `boxModel` and `boxFirmware`
- (@GermanBluefox) The table in the tab "Devices" uses the whole width again: in 5.0.2 it was so narrow that name, IP and MAC could not be read
- (@GermanBluefox) "Search for devices" works with many devices: the adapter reads the list of all devices in one request (`X_AVM-DE_GetHostListPath`) instead of one request per device, which took longer than the 20 seconds of the button. The search is always answered, also when a request fails, the box has no devices or the adapter is not connected
- (@GermanBluefox) Fixed the crash `systemData.save is not a function` on start when a call list is generated: installations which ran an adapter version from 2017 to 2020 still had an invalid attribute `save` in the object `tr-064.<instance>`, which is removed now
- (@GermanBluefox) `wlanGuest` switches the guest WLAN again on boxes with three bands (e.g. FRITZ!Box 5690 Pro, 4060) instead of the third band: the guest WLAN is always the last WLAN configuration of the box
- (@GermanBluefox) New states `wlan60` and `wlan60Password` for the 6 GHz WLAN, and `wlan52` and `wlan52Password` for the second 5 GHz WLAN (e.g. FRITZ!Box 4060). The adapter asks the box which band its third WLAN uses
- (@GermanBluefox) The call lists do not stop updating after some hours any more: the call monitor detects a connection which the box dropped unnoticed (e.g. by a restart) with TCP keepalive and reconnects, and the call lists are also read once a minute - that way they are updated without call monitor, too
- (@GermanBluefox) A call list download which the box does not answer is given up after 10 seconds with a warning
- (@GermanBluefox) `states.wlan` switches all WLANs like the WLAN button of the FRITZ!Box (`X_AVM-DE_SetWLANGlobalEnable`) and shows its state: switching on does not switch on the guest WLAN and bands which were off any more
- (@GermanBluefox) New states for the internet connection: `wanAccessType` (e.g. `LTE` during a fallback to a mobile connection), `wanLinkStatus`, `wanProvider`, `wanDownstreamMax`, `wanUpstreamMax`, and the traffic `wanBytesSent`, `wanBytesReceived` (64 bit counters), `wanSendRate`, `wanReceiveRate`
- (@GermanBluefox) New states `devices.xxx.accessPoint` and `devices.xxx.connection`: the FRITZ!Box or repeater a device is connected to and the band, read from the mesh topology. The new tab "Mesh" in the settings shows the mesh topology as a graphic. Admin 8 is required now
- (@GermanBluefox) New option "Read the event log of the FRITZ!Box": the complete event log including the logins to the user interface in `deviceLog.json`, new events in `deviceLog.newEvents`
- (@GermanBluefox) New state `callmonitor.connected` shows whether the call monitor is connected, and `callmonitor.*.device` the name of the telephone of a call
- (@GermanBluefox) New table "Phone book per own number": a number which is in several phone books gets its name from the phone book of the own number of the call
- (@GermanBluefox) New option "Write unchanged values too": every polled value is written with a new time stamp
- (@GermanBluefox) A single call forwarding of the FRITZ!Box is shown in `callForwarding` now - before, the states were only created from the second call forwarding on. With only one phone number the name of the number is added to the name of the state again, and a box without call forwardings does not delay the poll cycle by 3 seconds any more
- (@GermanBluefox) The call monitor does not lose events any more when the FRITZ!Box sends two of them in one network packet (e.g. `RING` and `DISCONNECT` of a very short call) or one event in two packets: the received data is split into lines now
- (@GermanBluefox) The call lists do not freeze for good any more when the FRITZ!Box numbers its calls from the beginning again, e.g. after exchanging the box, a factory reset or a restart: the adapter asked only for the calls after the last known call ID and got an empty list forever. It now checks an empty answer against the newest call of the box and builds the lists again from the call list of the box; only calls after the newest known call increase the counters. The meta object `tr-064.<instance>` is only written when the lists changed, not with every refresh
- (@GermanBluefox) New state `states.abNewMessages`: number of new (not yet listened) messages on the answering machines
- (@GermanBluefox) The MAC addresses of the configured devices are sent to the box in its own format `AA:BB:CC:DD:EE:FF`, so addresses entered in lower case, with dashes or without separators are found
- (@GermanBluefox) A configured device which the box does not know (or which is offline since the start) is logged once with a hint to check its MAC address and listed as inactive in `jsonDeviceList`, instead of silently being left out
- (@GermanBluefox) New option "Name the objects after this table" in the tab "Devices": the objects below `devices` get the names of the table instead of the names in the Fritz!Box, so two devices with the same name in the box are not mixed up any more. When the option is switched on, the objects which were created with the name of the box are deleted. mDNS writes into the same objects as the poll now - before it created additional objects with the name of the table
- (@GermanBluefox) A device can have several MAC addresses, separated by commas (e.g. a smartphone with a private Wi-Fi address in the home and the guest Wi-Fi): it is present if one of them is active. Changing the spelling of a MAC address does not delete the objects of the device any more, and "Search for devices" does not add a device of the table a second time
- (@GermanBluefox) A device request which the box does not answer does not stop the presence detection and the polling any more
- (@GermanBluefox) An info message tells when "Create JSON device list" is switched on, but no devices are configured
- (@GermanBluefox) The adapter connects to a FRITZ!Box whose WLAN is switched off: the check of the login used the WLAN, which the box answers with an error then, so the adapter restarted (4.x) or retried forever without creating its objects (5.0). A refused login is reported with a hint to check user, password and rights of the user instead of the advice to restart the box
- (@GermanBluefox) The adapter does not hang silently any more when the FRITZ!Box does not deliver the description of a service (e.g. `x_speedtestSCPD.xml` with FRITZ!OS 8.24 Labor): after 10 seconds the service is skipped with a warning, and the connection is limited to 60 seconds and retried
- (@GermanBluefox) The debug log does not contain sensitive data any more, so it can be shared to analyze problems: phone numbers, names, phone book and call data, host names, MAC and IP addresses, values of states and results of `states.command` are only logged with level `silly`, and the session ID in URLs of the box is never logged. The result of `states.command` is no longer logged with level info - it is still written into `states.commandResult`
- (@GermanBluefox) The call monitor does not stop any more when the FRITZ!Box refuses the connection, e.g. while it restarts after a firmware update: it retries every 60 seconds and reconnects on its own. The hint to open port 1012 with `#96*5*` is only logged if the call monitor was never connected

### 5.0.2 (2026-09-10)
- (@GermanBluefox) Fixed the crash `Cannot read properties of undefined (reading 'safe')` in `getWLAN` right after the start: the WLAN states are read again in every poll cycle
- (@GermanBluefox) A box without a separate 5 GHz configuration does not delay the polling by 3 seconds any more

### 5.0.1 (2026-09-09)
- (@GermanBluefox) **Breaking change:** the adapter requires node.js >= 22 now
- (@GermanBluefox) Adapter requires admin >= 7.7.22 now
- (@GermanBluefox) Adapter requires js-controller >= 6.0.11 now
- (@GermanBluefox) The adapter does not stop any more if the Fritz!Box cannot be reached. The connection is retried every 30 seconds, and the new state `info.connection` shows whether the box answers
- (@justr1) Expected disconnects of the call monitor (`ETIMEDOUT`, `ECONNRESET`, `EPIPE`) are logged as info now, because the adapter reconnects on its own
- (@GermanBluefox) The mDNS socket is closed when the adapter stops, so a restart does not leave a listener behind
- (@GermanBluefox) A phone book with only one contact is read now
- (@GermanBluefox) The hint how to open port 1012 is shown again if the call monitor is refused by the Fritz!Box
- (@GermanBluefox) The adapter was refactored to TypeScript. The sources are in `src/`, the adapter runs from `build/`
- (@GermanBluefox) The configuration dialog was rewritten as JsonConfig. Admin 7.7.22 or newer is required for it
- (@GermanBluefox) The adapter can only be installed from npm now, no longer directly from GitHub (`common.nogit`)
- (@GermanBluefox) The options "Use call forwarding options", "Use mDNS" and "Create JSON device list" have a default value in `io-package.json` now
- (@GermanBluefox) The command `dumpservices.fs` writes the file again instead of stopping the adapter

### 4.3.0 (2024-04-30)
* (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 4.2.18 (2023-01-04)
* (Apollon77) Prepare for future js-controller versions

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