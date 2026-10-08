<img src="admin/tr-064.svg" width="128" height="128">

# ioBroker.tr-064

![Number of Installations](http://iobroker.live/badges/tr-064-installed.svg)
![Number of Installations](http://iobroker.live/badges/tr-064-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.tr-064.svg)](https://www.npmjs.com/package/iobroker.tr-064)

![Test and Release](https://github.com/iobroker-community-adapters/iobroker.tr-064/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/tr-064/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.tr-064.svg)](https://www.npmjs.com/package/iobroker.tr-064)

> [!IMPORTANT]
> This adapter cannot be installed from github

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
### 5.1.6 (2026-10-07)
- (@GermanBluefox) The dialogs "Rename device" of the mesh topology and "Reset missed calls" of the widget and the device card show the button "Cancel" on the right side, grey and with a close icon, like everywhere in ioBroker

### 5.1.5 (2026-10-07)
- (@GermanBluefox) Updated packages

### 5.1.4 (2026-10-02)
- (@GermanBluefox) New look of the devices in the mesh topology: every device carries the symbol of its kind (computer, smartphone, camera, lamp, printer, ...) next to its name, below it the manufacturer and the IP address, and on the right side the band and the signal. The kind comes from the FRITZ!Box (`device_class`, or the kind which was set for the device in the box), an unknown one gets a generic symbol
- (@GermanBluefox) `common.localLink` of `io-package.json`, the link to the web interface of the FRITZ!Box, is replaced by `common.localLinks` - the js-controller has removed the old attribute from its schema, which made the package test fail
- (@GermanBluefox) A card of the mesh topology whose devices have no signal - a switch, a repeater with LAN devices only - uses compact devices: the manufacturer and the IP address stand next to each other below the name instead of below each other
- (@GermanBluefox) The table of the mesh topology shows the same symbol in front of the name, and the bars of the signal carry the color of the band - only a signal below -80 dBm, or one which the box itself calls too far away, turns red

### 5.1.2 (2026-10-01)
- (@GermanBluefox) The mesh topology shows the signal strength of a WLAN device: four bars and the value in dBm (`rx_rcpi`/`tx_rcpi` of the mesh list), the signal to noise and the rating of the FRITZ!Box itself ("too far away from the access point", `client_position`) in the tooltip and in the new column "Signal" of the table
- (@GermanBluefox) A device which is not connected any more shows when it was connected last (`last_connected`)
- (@GermanBluefox) The manufacturer of a device is taken from the FRITZ!Box (`device_manufacturer`, which it knows from LLDP or the DHCP request) and only looked up in the IEEE registries if the box does not name one
- (@GermanBluefox) The data rates of the mesh topology were shown as download and upload the wrong way round for every link whose first node is the access point - the FRITZ!Box reports `rx`/`tx` from the view of its own node 1, which is not always the upstream side
- (@GermanBluefox) A click on the missed calls of the tiles ("FRITZ!Box" widget of vis-2 and of `ioBroker.devices`) asks whether the counter is reset and sets `calllists.missed.count` to 0. The counter belongs to the adapter, not to the FRITZ!Box - it counts every missed call since the installation, including the complete call list which is read on the first start. The adapter now confirms a written counter right away instead of at the next poll

### 5.1.1 (2026-09-29)
- (@GermanBluefox) The mesh topology shows the manufacturer of a device below its name. It is resolved from the MAC address with the registries of the IEEE, which the adapter brings with it - no request leaves the network. A device with a randomized (locally administered) address, as many phones use it, is marked as such. The manufacturer can be switched off in the toolbar and in the attributes of the vis-2 widget
- (@GermanBluefox) A device can be renamed in the mesh topology: a click on its name asks for the new name and writes it into the FRITZ!Box (`X_AVM-DE_SetHostNameByMACAddress`), which uses it everywhere. A firmware without that action says so. Note: the objects below `devices` follow the name of the box, as long as the option "Use the configured names" is switched off
- (@GermanBluefox) New message `setHostName` (`sendTo('tr-064.0', 'setHostName', { mac, name })`) which renames a device in the FRITZ!Box

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