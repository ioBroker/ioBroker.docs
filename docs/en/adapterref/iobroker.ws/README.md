![Logo](admin/ws.png)
# ioBroker.ws

![Number of Installations](http://iobroker.live/badges/ws-installed.svg) ![Number of Installations](http://iobroker.live/badges/ws-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.ws.svg)](https://www.npmjs.com/package/iobroker.ws)
[![Downloads](https://img.shields.io/npm/dm/iobroker.ws.svg)](https://www.npmjs.com/package/iobroker.ws)

[![NPM](https://nodei.co/npm/iobroker.ws.png?downloads=true)](https://nodei.co/npm/iobroker.ws/)

This adapter is used by WEB applications and adapters to communicate with ioBroker using websockets.

It is almost the same as `ioBroker.socketio`, but does not use socket.io library and only simulates it.

**Important Note: Since v4.0 of this adapter, pure Websockets are used exclusively! Socket.io is no longer implemented by the socket.io library but simulated via pure WebSockets!**

Users can use this adapter to connect their products to ioBroker via web sockets.
Actually, this adapter could be used by echarts, vis and many other adapters to extract data from ioBroker.

You can find in the example [directory](https://github.com/ioBroker/ioBroker.ws/tree/master/example) a simple application that uses this interface to show some data.

By using of socket.io interface user should understand the [basics and concept](https://github.com/ioBroker/ioBroker) of the system.

It is useful to read about the [structure of the objects](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md) too. 

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information on how to disable the error reporting, see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Brief description of the concept
### Object
Object is a description of a data point or group. The group could content other data points in this case it called a channel. If a group consists of other channels, in this case it is called a device. 

Object is meta-information that describes data point and could content: max/min value, unit, name, default value, type of value, information for adapter for communication (e.g., IP address) and so on.

### State
State is the actual value of the data point and presented by a JavaScript object: 
```js
const state = {
    "val": VALUE, 
    "ack": ACKNOWLEDGED, 
    "ts": TIMESTAMP, // could be converted into time with "new Date(state.ts)" (In older version of js-controller - "new Date(state.ts * 1000)")
    "lc": TIMESTAMP_of_last_change, 
    "from": ADAPTER_NAME, 
    "q": QUALITY
}
```

States change themselves very frequently in comparison to the objects. (Normally objects should be changed once by creation, and that's all) 

### Acknowledgment
Every state has the attribute `ack`. It shows the direction of command. 
- If ack=false, it means some other adapter wants to control (write) this variable, so that command will be executed (e.g., light will be switched on).
- If ack=true, it means that the device informs about new value. (e.g., light was switched on manually, or motion was detected)
 
**Example**: we have some home automation adapter (HAA) that has one lamp connected under address `haa.0.lamp1`. 
- Lamp can be switched on manually with a physical switch or via Wi-Fi with the help of HAA. 
- If vis wants to switch the lamp on via Wi-Fi, it should set the new value with `{ value: true, ack: false }`. 
- When the lamp is switched on it is normally informing HAA about new state and the value should be immediately overwritten with `{ value: true, ack: true }`.
- If the lamp is switched off manually via physical switch it informs HAA about new state with `{ value: false, ack: true }`. 

### Quality
Every data point has an attribute `q` - *quality*. 

## Usage
You can find the description of every supported method [here](https://github.com/ioBroker/ioBroker.socket-classes#web-methods).

It is suggested to use [socket class](https://github.com/ioBroker/socket-client) for communication. 

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### 5.0.0 (2026-06-20)
* (@GermanBluefox) Updated packages
* (@GermanBluefox) Migrated to TypeScript 6.0
* (@GermanBluefox) Used a common server library for WebSockets

### 4.1.0 (2026-04-13)
* (@GermanBluefox) Updated packages
* (@GermanBluefox) Fixed possible bugs

### 4.0.0 (2026-02-17)
* (@GermanBluefox) Updated packages
* (@GermanBluefox) Removed support for node.js 18

### 3.0.19 (2025-03-04)
* (@GermanBluefox) Removed the frequent debug output

### 3.0.18 (2025-03-03)
* (@GermanBluefox) Corrected the problem with the user rights

[Older changelogs can be found there](CHANGELOG_OLD.md)## License
The MIT License (MIT)

Copyright (c) 2014-2026 @GermanBluefox <dogafox@gmail.com>
