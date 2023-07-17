![Logo](admin/socketio.png)
# ioBroker socket.io

![Number of Installations](http://iobroker.live/badges/socketio-installed.svg) ![Number of Installations](http://iobroker.live/badges/socketio-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.socketio.svg)](https://www.npmjs.com/package/iobroker.socketio)
[![Downloads](https://img.shields.io/npm/dm/iobroker.socketio.svg)](https://www.npmjs.com/package/iobroker.socketio)

[![NPM](https://nodei.co/npm/iobroker.socketio.png?downloads=true)](https://nodei.co/npm/iobroker.socketio/)

This adapter is used by WEB applications and adapters to communicate with ioBroker using websockets and the socket.io protocol.

**Important Note: Since v4.0 of this adapter pure Websockets are used exclusively! Socket.io is no longer implemented by the socket.io library, but simulated via pure WebSockets!**

Users can use this adapter to connect their products to ioBroker via web sockets.
Actually, this adapter could be used by echarts, vis and many other adapters to extract data from ioBroker.

If possible, please use [`iobroker.ws`](https://github.com/ioBroker/ioBroker.ws) instead of this adapter.

You can find in the example [directory](https://github.com/ioBroker/ioBroker.socketio/tree/master/example) simple application that uses this interface to show some data.

By using of socket.io interface user should understand the [basics and concept](https://github.com/ioBroker/ioBroker) of the system.

It is useful to read about the [structure of the objects](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md) too. 

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Brief description of concept
### Object
Object is description of data point or group. The group could content other data points in this case it called channel.
If a group consists of other channels, in this case it is called device. 

Object is meta information that describes data point and could content: max/min value, unit, name,
default value, type of value, information for adapter for communication (e.g., ip address) and so on.

### State
State is the actual value of the data point and presented by javascript object: 
```
{
    val: VALUE, 
    ack: ACKNOWLEDGED, 
    ts: TIMESTAMP, // could be converted into time with "new Date(state.ts)" (In older version of js-controller - "new Date(state.ts * 1000)")
    lc: TIMESTAMP of last change, 
    from: ADAPTER_NAME, 
    q: QUALITY
}
```

States change itself very frequently in compare to the objects. (Normally objects should be changed once by creation and that's all) 

### Acknowledgment
Every state has the attribute "ack". It shows the direction of command. 
- If ack=false, it means some other adapter wants to control (write) this variable, so that command will be executed (e.g., light will be switched on).
- If ack=true, it means that the device informs about new value. (e.g., light was switched on manually or motion was detected)
 
**Example**: we have some home automation adapter (HAA) that has one lamp connected under address `haa.0.lamp1`. 
- Lamp can be switched on manually with physical switch or via Wi-Fi with the help of HAA. 
- If vis wants to switch the lamp on via Wi-Fi, it should set the new value with `{value: true, ack: false}`. 
- When the lamp is switched on it is normally informing HAA about new state and the value should be immediately overwritten with `{value: true, ack: true}`.
- If the lamp is switched off manually via physical switch it informs HAA about new state with `{value: false, ack: true}`. 

### Quality
Every data point has an attribute `q` - *quality*. 

## Usage
You can find the description of every supported method [here](https://github.com/ioBroker/ioBroker.socket-classes#web-methods).

It is suggested to use [socket class](https://github.com/ioBroker/socket-client) for communication.

## Tuning Web-Sockets
On some web-sockets clients, there is a performance problem with communication.
Sometimes this issue is due to the fallback of socket.io communication on long polling mechanism.
You can set the option *Force Web-Sockets* to force using only web-sockets transport.

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### 6.4.0 (2023-07-07)
(bluefox) extended the getObjects function with the possibility to read the list of IDs

### 6.3.5 (2023-03-17)
* (bluefox) Increased the max size of the message to 200MB

### 6.3.4 (2023-03-03)
* (bluefox) Allowed deletion of fullcalendar objects

### 6.3.3 (2022-12-22)
* (bluefox) used new socket-classes

### 6.3.1 (2022-11-27)
* (bluefox) Added `fileChange` event

### 6.2.0 (2022-11-08)
* (Apollon77) Prepare for future js-controller versions
* (bluefox) Function `getObjects` for web was extended by devices, channels and enums

### 6.1.10 (2022-08-24)
* (bluefox) Caught error by subscribe

### 6.1.8 (2022-07-08)
* (bluefox) Corrected getAdapterInstances method

## License

The MIT License (MIT)

Copyright (c) 2014-2023 bluefox <dogafox@gmail.com>
