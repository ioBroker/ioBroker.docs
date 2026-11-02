---
chapters: {"pages":{"en/adapterref/iobroker.hm-rpc/README.md":{"title":{"en":"ioBroker HomeMatic RPC Adapter"},"content":"en/adapterref/iobroker.hm-rpc/README.md"},"en/adapterref/iobroker.hm-rpc/OLD_CHANGELOG.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.hm-rpc/OLD_CHANGELOG.md"}}}
---
![Logo](admin/homematic.png)

# ioBroker HomeMatic RPC Adapter

![Build Status](https://github.com/ioBroker/ioBroker.hm-rpc/workflows/Test%20and%20Release/badge.svg)
![Number of Installations](http://iobroker.live/badges/hm-rpc-installed.svg)
![Number of Installations](http://iobroker.live/badges/hm-rpc-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.hm-rpc.svg)](https://www.npmjs.com/package/iobroker.hm-rpc)
[![Downloads](https://img.shields.io/npm/dm/iobroker.hm-rpc.svg)](https://www.npmjs.com/package/iobroker.hm-rpc)

[![NPM](https://nodei.co/npm/iobroker.hm-rpc.png?downloads=true)](https://nodei.co/npm/iobroker.hm-rpc/)

This adapter connects HomeMatic interface processes (BidCos services, Homegear and CUxD) to ioBroker.
The communication uses XML-RPC or BIN-RPC.

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** It also reports new device schemas.
For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) and the chapter [What is Sentry.io](#what-is-sentryio).

## What is Homematic?

> Homematic is the smart home system of eQ-3. It allows the comprehensive control of many different functions in a house or in a flat. These functions can be combined in simple scenarios and in complex scenarios.

> The product range contains devices for light control, roller shutter control and heating control, hazard detectors, safety sensors and devices for weather measurement. The radio communication makes it easy to add devices to an existing building. In new buildings, wired bus components can be used.

Source: [Homepage of the manufacturer eQ-3](https://www.eq-3.de/produkte/homematic.html)

## Homematic components in ioBroker

Two adapters are required to manage and to control Homematic components with ioBroker:

### 1. Homematic ReGaHss

This adapter connects to the Homematic logic layer "ReGaHSS" (**Re**sidential **Ga**teway).
It synchronizes the device names, the system variables, the rooms, the functions and the programs between Homematic and ioBroker.

### 2. Homematic RPC

RPC means **R**emote **P**rocedure **C**all. It is a technique for the communication between processes.
This adapter connects to the communication modules of a Homematic central unit (CCU, CCU2, CCU3 and newer).
The following modules are supported:

- `rfd` for radio devices,
- `HMIP-rfd` for Homematic IP devices,
- `hs485d` for wired devices,
- `CUxD` for external components, like EnOcean or FS20 (CUxD is an additional software for the CCU),
- `CCU-Jack` for the virtual devices of [CCU-Jack](https://github.com/mdzio/ccu-jack) (an add-on for the CCU),
- `Homegear` as a replacement for a CCU.

This diagram shows the structure and the communication interfaces:

![Structure of a Homematic installation](img/homematic-structure.png)

Source: [wikimatic.de](http://www.wikimatic.de/wiki/Datei:Homematic_Aufbau.png)

## How the adapter works

One instance of the adapter is responsible for exactly one communication module (`rfd`, `hs485d` and so on).
If you want to use several modules at the same time, you must create a separate instance for every module.

The adapter communicates with the module either via BIN-RPC or via XML-RPC.
The communication uses an event interface, so the correct addresses are important.
The CCU sends the events to the adapter automatically, and a cyclic polling is not necessary.

Additionally, the adapter checks the connection to the CCU in a fixed interval.

If you teach in new devices on the CCU, you must enable the option "Synchronize objects (once)" and restart the adapter.
Only then the information about the new Homematic devices is transferred to the adapter.

## Configuration

### Main settings

#### HomeMatic Address

The IP address of the CCU, or of the host on which the BidCos service runs.

#### HomeMatic Port

The port depends on the selected communication module.
The adapter enters the port automatically as soon as you select the daemon.
Change the port only if your ports differ from the standard ports.

The following ports are used by default:

| Daemon          | Communication module   | Standard port             | HTTPS port    |
|-----------------|------------------------|---------------------------|---------------|
| HomeMatic IP    | HMIP-rfd               | 2010                      | 42010         |
| rfd             | rfd (radio devices)    | 2001                      | 42001         |
| Virtual Devices | virtual devices        | 9292                      | 49292         |
| hs485d          | hs485d (wired devices) | 2000                      | 42000         |
| CUxD            | CUxD                   | 8701                      | not supported |
| Homegear        | Homegear               | as configured in Homegear | not supported |
| CCU-Jack        | CCU-Jack               | 2121                      | 2122          |

The HTTPS ports work only with the XML-RPC protocol.

#### Adapter Address

The IP address of the host on which the adapter runs.
The CCU uses this address to connect to the adapter, so the CCU must be able to reach this address.
The entries "0.0.0.0 Listen on all IPs" and "127.0.0.1" are only for special cases, because the CCU cannot reach ioBroker at these addresses.

#### Adapter Port

The port on which the adapter waits for the connection of the CCU.
Keep the value "0", so that ioBroker selects a free port automatically.
Change this value only in special cases.

#### Daemon

A CCU supports different device types (radio, wired, Homematic IP, CUxD, CCU-Jack).
You must create a separate instance of the adapter for every type.

#### Protocol

Two protocols are available for the communication: XML-RPC and BIN-RPC.
BIN-RPC is faster, but some devices do not support it, or they support it incorrectly.
In this case select the XML-RPC protocol.

**Note:** CUxD works only with BIN-RPC. Homematic IP, Virtual Devices and CCU-Jack work only with XML-RPC.
For these daemons the adapter uses the right protocol automatically.

#### Synchronize objects (once)

At the first start, the instance reads *all* devices from the CCU.
If you change the configuration later (rename devices, add devices or remove devices), enable this option to synchronize the configuration in ioBroker again.

The instance restarts immediately, reads all devices again and disables this option itself.

### Additional settings

#### Adapter Callback Address

Sometimes ioBroker runs behind a router. In this case the inbound address and the outbound address are different.
Enter the IP address of the router here. The router forwards the traffic to ioBroker by the port number.

If ioBroker runs in a Docker container, enter the IP address of the Docker host here.
You must also forward the adapter port (see "Adapter Port") into the container.
You can select any free port for this, for example, 12001 or 12010.

#### Check communication interval (in seconds)

The adapter sends a ping to the CCU in this interval.

#### Reconnect interval (in seconds)

The adapter waits this time before it starts the next connection attempt.

#### Don't delete devices

By default, the adapter removes a device from the object tree if it does not find this device on the CCU at the adapter start,
or if the CCU reports the device as deleted while the adapter is running.
Enable this option to keep such devices, for example if you removed a device from the CCU only temporarily.

This option also avoids a problem on the CCU side:
Homematic IP devices are sometimes not transferred correctly to ioBroker, and the CCU reports them as deleted, e.g. during a firmware update, although they still exist.
Without this option their objects are deleted, and they are created again only after a restart of the adapter.
For this reason the option is enabled automatically as soon as you select Homematic IP as daemon.

With this option enabled, delete the objects of a device that you removed from the CCU manually in the object tree.

#### Use https

If this option is enabled, the adapter uses HTTPS instead of HTTP.
This works only with the XML-RPC protocol.

#### Username and Password

If the option "Use https" is enabled, enter the user name and the password of a CCU user here.
Enter these credentials also if the API of the CCU requires an authentication, the adapter sends them with XML-RPC with and without HTTPS.
BIN-RPC does not support an authentication.

### Device manager

The tab "Device manager" shows all devices of this instance.
You can rename a device, you can control a device directly, and you can read the installed firmware version and the available firmware version of a device.

## Instances

![Instances of the adapter](img/instances.png)

The installed instances of the adapter are listed in the area *Instances* of ioBroker.
The colored circle on the left side shows whether the instance is enabled and whether it is connected to the CCU.

If you move the mouse pointer over a symbol, you get detailed information.

## Objects of the adapter

The area *Objects* shows all values and all information that the CCU sends to the adapter. The values are shown in a tree structure.

Which objects and which values are shown depends on the devices (function and channels) and on the structure inside the CCU.

The central unit uses the ID `BidCoS-RF`, and all virtual buttons are listed under this ID.
Devices are created under their serial number, and groups get the name `INT000000x`.

### Channel 0 (all devices)

This channel is created for every device. It contains the following function data:

| Data point                       | Meaning                                                            |
|----------------------------------|--------------------------------------------------------------------|
| AES_Key                          | Encryption enabled or disabled                                     |
| Config (Pending / Pending Alarm) | Pending configuration                                              |
| Dutycycle / Dutycycle Alarm      | Transmission time of the Homematic devices                         |
| RSSI (Device / Peer)             | Signal strength between the device and the central unit            |
| Low Bat / Low Bat Alarm          | Low battery charge                                                 |
| Sticky unreach / unreach alarm   | System message about a communication error (error occurred before) |
| Unreach / unreach alarm          | System message about a communication error (current state)         |

### Channels 1 to 6

These channels contain measured values, control data and status data.
The shown data depends on the function of the device. The following table shows some examples:

| Function                        | Channel | Possible values                                                                  |
|---------------------------------|---------|----------------------------------------------------------------------------------|
| Sensors                         | 1       | Temperature, humidity, fill level, open or closed state and so on                |
| Heating thermostats             | 4       | Operating mode, set temperature, actual temperature, valve position and so on    |
| Actuators                       | 1       | Level (roller shutter, dimmer), direction of movement (roller shutter) and so on |
| Devices with measuring function | 3       | Status                                                                           |
|                                 | 6       | Consumption meter, voltage, power and so on                                      |

## Custom commands

You can send custom commands to the adapter, for example, to read and to control the MASTER area of a device.
The MASTER area allows you to configure the weekly heating programs and more.

Send a message to the adapter for this purpose.
The message contains the method as the first parameter, followed by an object.
This object must contain the `ID` of the target device. Optionally it contains the `paramType`, which selects, for example, the MASTER area.
Send additional parameters in the `params` object.

**Examples:**

Write all values of the MASTER area of a device to the log:

```javascript
sendTo('hm-rpc.0', 'getParamset', {ID: 'OEQ1861203', paramType: 'MASTER'}, res => {
    log(JSON.stringify(res));
});
```

Set an attribute of the MASTER area to a specific value:

```javascript
sendTo('hm-rpc.0', 'putParamset', {ID: 'OEQ1861203', paramType: 'MASTER', params: {'ENDTIME_FRIDAY_1': 700}}, res => {
    log(JSON.stringify(res));
});
```

List all devices:

```javascript
sendTo('hm-rpc.0', 'listDevices', {}, res => {
    log(JSON.stringify(res));
});
```

Set a value, like the adapter does it on `stateChange`:

```javascript
sendTo('hm-rpc.1', 'setValue', {ID: '000453D77B9EDF:1', paramType: 'SET_POINT_TEMPERATURE', params: 15}, res => {
    log(JSON.stringify(res));
});
```

Read the current value of a datapoint from the interface process of the CCU (the same as `.State()` in a HomeMatic script):

```javascript
sendTo('hm-rpc.1', 'getValue', {ID: '000453D77B9EDF:1', paramType: 'ACTUAL_TEMPERATURE'}, res => {
    if (!res.error) {
        log(`Temperature: ${res.result}`);
    } else {
        log(res.error);
    }
});
```

The interface process returns its cached value, it does not request a new value from the device.
The adapter already gets every change of this value as an event, so normally the state in ioBroker has the same value.
How often a device reports a value (e.g. the power of a switch actuator with power metering) is set in the MASTER area of its channel.

Read the `paramsetDescription` of a channel of a device:

```javascript
sendTo('hm-rpc.1', 'getParamsetDescription', {ID: '000453D77B9EDF:1', paramType: 'VALUES'}, res => {
    log(JSON.stringify(res));
});
```

Read the firmware information of a device. In this example the firmware status is written to the log:

```javascript
sendTo('hm-rpc.1', 'getDeviceDescription', {ID: '0000S8179E3DBE', paramType: 'FIRMWARE'}, res => {
    if (!res.error) {
        log(`FW status: ${res.result.FIRMWARE_UPDATE_STATE}`)
    } else {
        log(res.error)
    }
});
```

## Additional information

### Firmware update state

For devices whose description contains the firmware update state (Homematic IP), the adapter creates the state `<device>.0.FIRMWARE_UPDATE_STATE`.
It is updated whenever the CCU reports a change of the firmware update status, and on every start of the adapter.
Possible values are e.g. `UP_TO_DATE`, `NEW_FIRMWARE_AVAILABLE`, `DELIVER_FIRMWARE_IMAGE` (the firmware is being transferred), `READY_FOR_UPDATE` (the transfer is finished, the update can be started), `DO_UPDATE_PENDING` (the update must be started on the device) and `PERFORMING_UPDATE`.

```javascript
on({id: /^hm-rpc\.1\..*\.0\.FIRMWARE_UPDATE_STATE$/, val: 'READY_FOR_UPDATE'}, obj => {
    log(`Firmware of ${obj.id.split('.')[2]} is transferred`);
});
```

### Dummy program for the button states

If you use HomeMatic switches or HomeMatic remote controls, the CCU confirms the button states only if a "dummy" program runs on the CCU.
This program must use the state of the related switch or of the related remote control.
Without such a program, ioBroker does not get the button states.

You can use one single dummy program for several buttons.
Add all button states to the if-clause and combine them with the operator "or" or with the operator "and".
The then clause of the program can stay empty.
After that, the state in ioBroker is updated on every button press.

## What is Sentry.io?

Sentry.io is a service for developers. It gives an overview about the errors of their applications. Exactly this is implemented in this adapter.

If the adapter crashes, or if another code error happens, the error message is sent to Sentry. The same message also appears in the ioBroker log.
If you allowed the ioBroker GmbH to collect diagnostic data, your installation ID is sent too.
This installation ID is only a unique ID **without** any additional information about you, like your email address or your name.
It allows Sentry to group the errors and to show how many users are affected by an error.
All of this helps the developer to provide adapters that are free of errors and that basically never crash.

## Development

To update all device images, execute the following command:

```bash
npm run update-images
```

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 4.2.4 (2026-10-22)
* (@GermanBluefox) Do not re-register every 5 minutes if events with an outdated interface id keep arriving (#1542)

### 4.2.3 (2026-10-19)
* (@GermanBluefox) After an unclean stop, the CCU kept sending the events with the old interface ID and they were discarded silently. The adapter now removes an old registration before it registers, and registers again with a warning if events with an old ID of this instance arrive (#1542)

### 4.2.2 (2026-10-13)
* (@GermanBluefox) The virtual devices of CCU-Jack can be connected with the new daemon `CCU-Jack` (port 2121, HTTPS 2122, XML-RPC only) (#1003)
* (@GermanBluefox) The state `updated` (new devices for hm-rega) is no longer marked as writable, as expected for the role `indicator`
* (@GermanBluefox) Homebrew devices (AskSin++) of the add-ons from jp112sdl (JP-HB-Devices-addon) and TomMajor (HB-TM-Devices-AddOn) get the same icon as in the CCU WebUI (#903)

### 4.2.0 (2026-10-13)
* (@GermanBluefox) The firmware update state of Homematic IP devices is available in the new state `<device>.0.FIRMWARE_UPDATE_STATE`, e.g. `READY_FOR_UPDATE` when the firmware is transferred. The firmware information of the device object is updated, too (#1137)

### 4.1.3 (2026-10-12)
* (jhoos70) The invalid temperature 3276.8 of a not connected sensor (e.g. the external probe of a HmIP-STE2-PCB) is delivered as `null` instead of a value above the maximum
* (@GermanBluefox) The adapter reports the port of its RPC callback server to js-controller 8, which keeps a per-host registry of the occupied ports (`system.host.<name>.usedResources`). Reported is the port the server really got - the configuration only holds a wish for it (`0` means "pick one", and a configured port is moved on when it is taken), so this is the only place where the callback port can be seen. The port of the CCU is not reported, it belongs to another machine. Before the server is created, the log names an instance that has already declared the port. An older js-controller is unaffected

### Older changelog
[here](/#/docs/adapterref/iobroker.hm-rpc/OLD_CHANGELOG.md)

## License

The MIT License (MIT)

Copyright (c) 2014-2026 bluefox <dogafox@gmail.com>  
Copyright (c) 2014 hobbyquaker <hq@ccu.io>

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