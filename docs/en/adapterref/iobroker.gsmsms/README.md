![Logo](admin/gsmsms.png)

# ioBroker.gsmsms

![Number of Installations](https://iobroker.live/badges/gsmsms-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/gsmsms-stable.svg)
[![NPM version](https://img.shields.io/npm/v/iobroker.gsmsms.svg)](https://www.npmjs.com/package/iobroker.gsmsms)

![Test and Release](https://github.com/forelleblau/ioBroker.gsmsms/workflows/Test%20and%20Release/badge.svg)
[![Downloads](https://img.shields.io/npm/dm/iobroker.gsmsms.svg)](https://www.npmjs.com/package/iobroker.gsmsms)

## gsmsms adapter for ioBroker

Send and recieve SMS with GSM-hardware.

## Hardware

Any GSM-Hardware (shield, surfstick i.e) connected to a serial port of your ioBroker - device.
GSM-modules/sticks need a lot of power. Please ensure a sufficient power supply.

Some devices have to be set to the right mode for serial communication (see 'usb_modeswitch').

## Settings

### Port & connection setting

#### Path to Serial Port - required.

e.g. `/dev/ttyUSB0` or `/dev/serial/by-id/xxxxxxxxxxx` (by-id is more stable, ttyUSBx can change with a reboot)

Some devices expose multiple USB port, so it can be that you need to try it out. Most likely the "first" on will work, but will maybe not deliver "incoming message notifications", then you can try the other and send in a sms and see if some seconds later it is received (on a Huawai this is the third port as example).

#### Your SIM PIN

If your SIM card is protected by a PIN provide the PIN and it will be used to unlock the SIM card during initialization (empty, means "no PIN existing on the SIM card").

<!--
#### Connection mode

##### Always open

Opens a modem connection as soon as the adapter is started. Incoming and outgoing SMS are delivered instantly. SMS arrived while the adapter is down will be delivered by the next adapter - startup (according to capacity of your SIM).

##### Retrieval interval

Outgoing SMS are sent instantly. Incoming SMS are retrieved periodically according to the specified interval. A modem connection is opened only for sending and retrieving SMS.

##### Send only

The adapter is only used to send SMS. All incoming SMS are ignored (possibly saved to SIM but not retrieved to the adapter).
-->

### GSM settings

Not to run out of SIM-Memory, all SMS are deleted from SIM after delivery/reading. Use e.g. the 'history' - adapter to store your messages or any other convenient solution.

| Name                        | Type    | Default                   | Description                                                                                                                                                                                                                                                                                                    |
| --------------------------- | ------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Incoming SMS indication     | boolean | true                      | Enables the modem to notify that a new SMS message has been received.                                                                                                                                                                                                                                          |
| Enable concatenation        | boolean | true                      | Receive concatenated messages as one.                                                                                                                                                                                                                                                                          |
| Custom Iinit command        | string  |                           | If your device needs a custom initialization command it can be provided and will be used after PIN check. i.e. some devices need 'AT+CPMS="SM","SM","SM"' to get the right storage set. The command is expected to return `'OK'` (empty, means "no custom command for init"). pls refer your GSM-device specs. |
| CNMI when modem open/closed | string  | '2,1,0,2,0' / '2,0,2,2,1' | Defines if messages are saved on SIM or delivered instantly. pls refer your GSM-device specs.                                                                                                                                                                                                                  |

<!--| Incoming call indication    | boolean | false                     | Receive `'onNewIncomingCall'` event when receiving calls.                                                                                                                 |-->                                                       

### SerialPort settings

Please refer to your GMS-device specs (Google will help in most cases)

| Name     | Type    | Default | Description                                             |
| -------- | ------- | ------- | ------------------------------------------------------- |
| baudRate | number  | 19200   | The port's Baud rate.                                   |
| dataBits | number  | 8       | Must be one of: 8, 7, 6, or 5.                          |
| stopBits | number  | 1       | Must be one of: 1 or 2.                                 |
| parity   | string  | "none"  | Must be one of: 'none', 'even', 'mark', 'odd', 'space'. |
| rtscts   | boolean | false   | flow control setting                                    |
| xon      | boolean | false   | flow control setting                                    |
| xoff     | boolean | false   | flow control setting                                    |
| xany     | boolean | false   | flow control settings                                   |

### Other settings and recommendations

#### To be specified as adapter - objects (`admin.x`)

-   your name (default is `ownNumber`), maximum length is 16 chars.
-   your phone Number.
-   SMS operating Mode (`PDU` or `SMS`, `PDU` is default and recommended).

All inputs have to be made with ack=false!

#### Inbox/Outbox - History

By activating the History-adapter for the `inbox.messageRaw` - object and the `sendSMS.messageRaw` - object you get a complete In- and Outbox of your SMS traffic.

<!--
#### SMS - errors

When errors are returned and the error originated from the device (so the exchange with the device was technically successful), then in the error message, an error code should be listed, e.g. "+CMS ERROR: 500". The error message is displayed in the log on 'warn' - level and stored in the `info.error` object.
An (incomplete) list of possible error codes and their meanings can be found e.g. at <https://www.activexperts.com/sms-component/gsm-error-codes/>.
-->

## Functionalities

### Receive SMS

Incoming SMS are written to the `inbox.*` - objects. `inbox.messageRaw` can be used as trigger for further operations (e.g. forward incoming sms by e-mail adapter).

### Send SMS

To send a sms fill in `sendSMS.recipient, sendSMS.message` and optionally `sendSMS.alert` and push the `sendSMS.send` - button. Or set the `sendSMS.messageRaw` - Object with a string in the following form and ack=false: `{"recipient": "Number", "message":"Yourtext", "alert":"false"}`.

This adapter also provides a comm-block for blockly and sendTo functionalities for other scripts (sendTo("gsmsms._InstanceNo_", "send", {text: '_yourText_',recipient: '_phonenumber_', alert: '_false/true_'});).

### Execute AT+ commands

! Pls be sure to know what you do when setting AT+ commands, it's your SIM-card / device.

AT+commands are sent be setting `admin.atCommandSLR` in the format `AT+XXXXy`.
Send any command you like, but be aware that you will see only the last line of the response.

## Serialport-gsm

This adapter is based on the [SerialPort-GSM plugin](https://github.com/zabsalahid/serialport-gsm) for communicating with GSM modems, primarily for SMS.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

### 0.0.5

-   (forelleblau) bug fixed (adapter set "undefined" into state values)

### 0.0.4

-   (Apollon77) Optimizations, brush up to comply with ioBroker.repositories requirements

### 0.0.3

-   (forelleblau) dependencies updated, bugs fixed

### 0.0.2

-   (forelleblau) first published version

### 0.0.1

-   (forelleblau) initial release

## License

MIT License

Copyright (c) 2022-2023 forelleblau <mailto:marceladam@gmx.ch>

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

<!--
## Developer manual

This section is intended for the developer. It can be deleted later

### Getting started

You are almost done, only a few steps left:

1.  Head over to [main.js](main.js) and start programming!

### Best Practices

We've collected some [best practices](https://github.com/ioBroker/ioBroker.repositories#development-and-coding-best-practices) regarding ioBroker development and coding in general. If you're new to ioBroker or Node.js, you should
check them out. If you're already experienced, you should also take a look at them - you might learn something new :)

### Scripts in `package.json`

Several npm scripts are predefined for your convenience. You can run them using `npm run <scriptname>`
| Script name | Description |
\|-------------\|-------------\|
\| `test:js` | Executes the tests you defined in `*.test.js` files. |
\| `test:package` | Ensures your `package.json` and `io-package.json` are valid. |
\| `test:unit` | Tests the adapter startup with unit tests (fast, but might require module mocks to work). |
\| `test:integration` | Tests the adapter startup with an actual instance of ioBroker. |
\| `test` | Performs a minimal test run on package files and your tests. |
\| `check` | Performs a type-check on your code (without compiling anything). |
\| `lint` | Runs `ESLint` to check your code for formatting errors and potential bugs. |
\| `release` | Creates a new release, see [`@alcalzone/release-script`](https://github.com/AlCalzone/release-script#usage) for more details. |

### Writing tests

When done right, testing code is invaluable, because it gives you the
confidence to change your code while knowing exactly if and when
something breaks. A good read on the topic of test-driven development
is <https://hackernoon.com/introduction-to-test-driven-development-tdd-61a13bc92d92>.
Although writing tests before the code might seem strange at first, but it has very
clear upsides.

The template provides you with basic tests for the adapter startup and package files.
It is recommended that you add your own tests into the mix.

### Publishing the adapter

Using GitHub Actions, you can enable automatic releases on npm whenever you push a new git tag that matches the form
`v<major>.<minor>.<patch>`. We **strongly recommend** that you do. The necessary steps are described in `.github/workflows/test-and-release.yml`.

Since you installed the release script, you can create a new
release simply by calling:

```bash
npm run release
```

Additional command line options for the release script are explained in the
[release-script documentation](<https://github.com/AlCalzone/release-script#command-line>
).

To get your adapter released in ioBroker, please refer to the documentation
of [ioBroker.repositories](https://github.com/ioBroker/ioBroker.repositories#requirements-for-adapter-to-get-added-to-the-latest-repository).

### Test the adapter manually with dev-server

Since you set up `dev-server`, you can use it to run, test and debug your adapter.

You may start `dev-server` by calling from your dev directory:

```bash
dev-server watch
```

The ioBroker.admin interface will then be available at <http://localhost:8081/>

Please refer to the [`dev-server` documentation](https://github.com/ioBroker/dev-server#command-line) for more details.
