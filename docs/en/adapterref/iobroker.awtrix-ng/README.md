---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.awtrix-ng?style=flat-square
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.awtrix-ng?label=npm%20downloads&style=flat-square
BADGE-node-lts: https://img.shields.io/node/v-lts/iobroker.awtrix-ng?style=flat-square
BADGE-Libraries.io dependency status for latest release: https://img.shields.io/librariesio/release/npm/iobroker.awtrix-ng?label=npm%20dependencies&style=flat-square
BADGE-GitHub: https://img.shields.io/github/license/klein0r/iobroker.awtrix-ng?style=flat-square
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/klein0r/iobroker.awtrix-ng?logo=github&style=flat-square
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/klein0r/iobroker.awtrix-ng?logo=github&style=flat-square
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/klein0r/iobroker.awtrix-ng?logo=github&style=flat-square
BADGE-GitHub issues: https://img.shields.io/github/issues/klein0r/iobroker.awtrix-ng?logo=github&style=flat-square
BADGE-GitHub Workflow Status: https://img.shields.io/github/actions/workflow/status/klein0r/iobroker.awtrix-ng/test-and-release.yml?branch=main&logo=github&style=flat-square
BADGE-Beta: https://img.shields.io/npm/v/iobroker.awtrix-ng.svg?color=red&label=beta
BADGE-Stable: http://iobroker.live/badges/awtrix-ng-stable.svg
BADGE-Installed: http://iobroker.live/badges/awtrix-ng-installed.svg
---
![Logo](../../admin/awtrix-ng.png)

# ioBroker.awtrix-ng

## Requirements

- nodejs 22 (or later)
- js-controller 6.0.11 (or later)
- Admin Adapter 7.6.20 (or later)
- _Awtrix NG_ device with firmware _1.1.1_ (or later) - e.g. Ulanzi TC001

Buy here: [Aliexpress.com](https://haus-auto.com/p/ali/UlanziTC001), here: [Amazon.de](https://haus-auto.com/p/amz/UlanziTC001) or here: [ulanzi.de](https://haus-auto.com/p/ula/UlanziTC001) (Affiliate-Links)

## Getting started

1. Flash the firmware on your device and add it to your WiFi network - see [documentation](https://blueforcer.github.io/awtrix-ng/getting-started/flashing/)
2. Install the awtrix-ng adapter in ioBroker (and add a new instance)
3. Open the instance configuration and enter the IP address of the device in your local network

## FAQ

**Can I use the adapter to disable the native apps (like battery state and sensor data)?**

No, this feature has been removed in the awtrix light firmware. Please use the on screen menu to hide these apps.

**Is it possible to replace boolean values with other text (not true/false)?**

Just create an alias in `alias.0` of type `string` and convert your `boolean` value into any other text with a read function (like `val ? 'open' : 'closed'`). *This is an ioBroker feature and not related to this adapter.*

**The device is getting hot while charging.**

The hardware design is not the best. Please use a power supply which deliveres max. 1A.

**Can I define a custom number format?**

All states (of common.type `number`) are formatted as configured in the system settings of ioBroker. It is possible to override the system format (since adapter version 0.7.1) by using an expert option. Numbers can be formatted in the following styles:

- System default
- `xx.xxx,xx`
- `xx,xxx.xx` (US-Format)
- `xxxxx,xx`
- `xxxxx.xx` (US-Format)

**Is it possible to protect web ui of the device?**

Yes, since firware version 0.82 it is possible to configure a user name and a password to protect the access. Since adapter version 0.8.0 it is also possible to enter these credentials in the instance configuration.

**How does the hold option in notifications work?**

When sending a notification with `hold: true`, the text will stay on the display until the notification will be confirmed. This can either happen with a press on the middle button of the device, or by setting the state `notification.dismiss` to `true`.

**Some state changes are not displayed immediately.**

If your states changes very often (like every second), some changes will be ignored to prevent frequent requests to the device. Each app has a global "block time" which is configurable in the instance configuration. The default block time is 3 seconds. It is not recommended to set a lower value than 3.

## Same apps on multiple devices

If you have multiple awtrix-ng devices, **it is required to create a new instance for each device.** But it is possible to copy all app settings of another instance if you want to display the same information on all devices. Just select the other instance in the app configuration tab.

Example:

1. Configure all apps in instance `awtrix-ng.0`
2. Create a new instance for the second device (`awtrix-ng.1`)
3. Choose `awtrix-ng.0` in the instance configuration of `awtrix-ng.1` to use the same apps on the second device

Since version 0.15.0 (and later) the visibility of custom apps and contents of expert apps are also applied to other devices (when app settings are copied). In the example above the apps of `awtrix-ng.1` will be hidden automatically if the visibility state of an app in instance `awtrix-ng.0` changes.

## Blockly and JavaScript

`sendTo` / message box can be used to

- send one time notifications (with text, sound, icon, ...)
- play a custom sound

### Notifications

Send a "one time" notification to your device:

```javascript
sendTo(
    'awtrix-ng.0',
    'notification',
    {
        text: 'haus:automation',
        textColor: '#E2671F', // optional
        icon: '37620', // optional
        durationMs: 5000, // optional
        repeat: 1, // optional
        stack: true, // optional
        wakeup: true, // optional
        hold: false // optional
    },
    (res) => {
        if (res && res.error) {
            console.error(res.error);
        }
    }
);
```

The message object supports all available options of the firmware. See [documentation](https://blueforcer.github.io/awtrix-ng/reference/payload/) for details.

*You can also use a Blockly block to send a notification (doesn't provide all available options).*

### Sounds

**The sound files must be saved as RTTTL fomat in the folder MELODIES. The file extension of these files is .txt. When playing those files, the file extension must not be provided.**

To play a (previously created) sound with the name `example`:

```javascript
sendTo('awtrix-ng.0', 'audio', { sound: 'example' }, (res) => {
    if (res && res.error) {
        console.error(res.error);
    }
});
```

The message object supports all available options of the firmware. See [documentation](https://blueforcer.github.io/awtrix-ng/reference/payload/) for details.

*You can also use a Blockly block to play a sound.*

To play a custom ringtone:

```javascript
sendTo('awtrix-ng.0', 'audio', { rtttl: 'beep:d=4,o=5,b=120:c,e,g' }, (res) => {
    if (res && res.error) {
        console.error(res.error);
    }
});
```

## Apps

**App names must be lowercase (a-z) and unique. No numbers, no capital letters, no special characters, no whitespaces.**

The following names are used by internal apps and cannot be used: `Time`, `Date`, `Temperature`, `Humidity`, `Battery`.

- You can use the state `activate` of each app to bring that app to front
- This state has the role `button` and allows just the value `true` (other values will raise a warning)

Each custom and history app has a state `apps.<name>.visible`. If this state is set to `false`, the app will be removed from the device and no further updates are pushed. This is useful, if a certain app should only be displayed during day time or in a given time range.

### Custom apps

- `%s` is a placeholder for the state value
- `%u` is a placeholder for the unit of the state object (e.g. `°C`)

It is possible to define a custom text with those placeholders (e.g. `Outside: %s %u`).

**Custom apps just display acknowledged values! Control states with `ack: false` are ignored (to prevent duplicate requests and to ensure that values are valid / confirmed)!**

The selected state should have the data type `string` or `number`. Other tyes (like `boolean`) are also supported but raise a warning. It is recommended to use an alias state with a convert function to replace a boolean value with text (e.g. `val ? 'on' : 'off'` or `val ? 'open' : 'closed'`). See ioBroker documentation for details. *This standard feature is not related to this adapter.*

The following combinations will lead to a warning in the log:

- A custom app with a selected object id of a state, but `%s` is missing in the text
- A custom app with a selected object id of a state without a unit `common.unit`, but `%u` is used in the text
- A custom app without a selected object, but `%s` has been used in the text

### History apps / graphs

TODO

**History apps just display acknowledged history values! Control states with `ack: false` are filtered and ignored!**

### Expert apps

Expert apps are available since apdater version 0.10.0. They allow to set all values manually and to implement your own logic by controlling all data via states. To create a new expert app

- Go to expert options in instance settings
- Create a new expert app by choosing a name (e.g. `test`)
- Save and close the instance settings

After that, all controllable states for the app name `test` will be created in `awtrix-ng.0.apps.test`. Just set values of `icon`, `text` and other states by using your own scripts and logic (e.g. JavaScript or Blockly).

#### Base Object

The base object is a basic defition of an awtrix app to allow all possible attributes. *The base object will be extended with other attributes of the expert app.*

See [documentation](https://blueforcer.github.io/awtrix-ng/reference/payload/) for available attributes.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

* (@klein0r) Recommended Awtrix NG version is now 1.1.1
* (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 0.1.0 (2026-08-11)

* (@klein0r) Used new audio API endpoint for all types of sounds (file, mp3, rtttl)
* (@klein0r) Recommended Awtrix NG version is now 1.1.0

### 0.0.10 (2026-08-07)

* (@klein0r) Updated documentation
* (@klein0r) Recommended Awtrix NG version is now 1.0.15
* (@klein0r) Automatically cast icon value to string in notifications

### 0.0.9 (2026-08-06)

* (@klein0r) Removed option to automatically delete other apps
* (@klein0r) Updated logo

### 0.0.8 (2026-08-06)

* (@klein0r) Added more settings
* (@klein0r) Fixed Blockly code generation

### 0.0.7 (2026-08-05)

* (@klein0r) Removed device update state and notification
* (@klein0r) Fixed rtttl endpoint
* (@klein0r) Improved error handling

## License

MIT License

Copyright (c) 2026 Matthias Kleine <info@haus-automatisierung.com>

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