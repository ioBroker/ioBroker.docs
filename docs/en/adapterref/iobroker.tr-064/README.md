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
- Restart the Fritz!Box
- Start the WPS process
- Reconnect the internet connection
- Read the external IP address

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

You can also switch on the option "Use mDNS to discover new devices". If mDNS is used, the adapter does not need to poll the Fritz!Box, and it detects changes faster.

Users report that the detection also works reliably for iOS devices, for example, for iPhones. For iPhones, users report that the Fritz!Box needs up to 10 minutes to detect that a person has left and is no longer connected with the Wi-Fi. The Fritz!Box needs up to 1 minute to detect the presence again.

The ioBroker community has published a script that uses this information of the adapter to trigger actions. Examples are: switch off everything automatically after all persons have left the home, show the number of persons that are at home, or show the status of a person in VIS. See the [thread in the ioBroker forum](https://forum.iobroker.net/topic/4538/anwesenheitscontrol-basierend-auf-tr64-adapter-script) (in German).

### Answering machine (in German: `Anrufbeantworter`)

You can switch the answering machine on and off. With the state `cbIndex` you select the number of the answering machine.

### Call monitor

The call monitor creates states in real time for every incoming and outgoing call. If the phone book is switched on, which is the default setting, the adapter resolves the numbers into names. There is also a state that shows a ringing telephone.

### Phone book

- If the phone book is switched on, the adapter uses it to find the name for the number of the caller.
- There are three more states to resolve a number or a name. If a picture is available, you also get the URL of the picture of the contact.

Example: if you set the state `phonebook.number`, the adapter sets all 3 states, `name`, `number` and `image`, to the values of the contact that was found. Note: for a search by name, the adapter first compares the complete name. If no contact is found, the adapter searches for a part of the name.

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

### 4.2.17 (2022-09-16)
* (simatec/Apollon77) Prevent duplication of entries in configuration
* (Apollon77) Make sure the active status of devices in jsonDeviceList is correct

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