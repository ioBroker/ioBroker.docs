![Logo](admin/ws.png)
# ioBroker.ws

![Number of Installations](http://iobroker.live/badges/ws-installed.svg) ![Number of Installations](http://iobroker.live/badges/ws-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.ws.svg)](https://www.npmjs.com/package/iobroker.ws)
[![Downloads](https://img.shields.io/npm/dm/iobroker.ws.svg)](https://www.npmjs.com/package/iobroker.ws)

[![NPM](https://nodei.co/npm/iobroker.ws.png?downloads=true)](https://nodei.co/npm/iobroker.ws/)

This adapter is used by WEB applications and adapters to communicate with ioBroker using websockets.

It is almost the same as `ioBroker.socketio`, but does not use socket.io library and only simulates it.

**Important Note: Since v4.0 of this adapter pure Websockets are used exclusively! Socket.io is no longer implemented by the socket.io library, but simulated via pure WebSockets!**

Users can use this adapter to connect their products to ioBroker via web sockets.
Actually, this adapter could be used by echarts, vis and many other adapters to extract data from ioBroker.

You can find in the example [directory](https://github.com/ioBroker/ioBroker.ws/tree/master/example) simple application that uses this interface to show some data.

By using of socket.io interface user should understand the [basics and concept](https://github.com/ioBroker/ioBroker) of the system.

It is useful to read about the [structure of the objects](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md) too. 

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Brief description of concept
### Object
Object is description of data point or group. The group could content other data points in this case it called channel. If a group consists of other channels, in this case it is called device. 

Object is meta information that describes data point and could content: max/min value, unit, name, default value, type of value, information for adapter for communication (e.g., ip address) and so on.

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
Every state has the attribute `ack`. It shows the direction of command. 
- If ack=false, it means some other adapter wants to control (write) this variable, so that command will be executed (e.g., light will be switched on).
- If ack=true, it means that the device informs about new value. (e.g., light was switched on manually or motion was detected)
 
**Example**: we have some home automation adapter (HAA) that has one lamp connected under address `haa.0.lamp1`. 
- Lamp can be switched on manually with physical switch or via Wi-Fi with the help of HAA. 
- If vis wants to switch the lamp on via Wi-Fi, it should set the new value with ```{value: true, ack: false}```. 
- When the lamp is switched on it is normally informing HAA about new state and the value should be immediately overwritten with ```{value: true, ack: true}```.
- If the lamp is switched off manually via physical switch it informs HAA about new state with ```{value: false, ack: true}```. 

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
### 2.5.8 (2023-10-11)
* (bluefox) Corrected adapter termination if the alias has no target

### 2.5.7 (2023-10-07)
* (foxriver76) upgraded socket-classes to fix vis problems

### 2.5.6 (2023-09-28)
* (bluefox) upgraded socket-classes to correct the error by unsubscribing on client disconnect

### 2.5.5 (2023-09-14)
* (foxriver76) upgraded socket-classes to fix crash cases

### 2.5.4 (2023-09-05)
* (mcm1957) added missing node16 requirement

### 2.5.3 (2023-08-01)
* (bluefox) Added the subscribing on the specific instance messages

### 2.4.0 (2023-07-07)
* (bluefox) extended the getObjects function with the possibility to read the list of IDs

### 2.3.6 (2023-03-03)
* (bluefox) Allowed deletion of fullcalendar objects

### 2.3.5 (2023-01-29)
* (bluefox) added `publishFileAll` method (for future use)

### 2.3.4 (2022-12-27)
* (bluefox) corrected connection string

### 2.3.3 (2022-12-22)
* (bluefox) used new socket-classes

### 2.3.1 (2022-11-27)
* (bluefox) Added `fileChange` event

## License
The MIT License (MIT)

Copyright (c) 2014-2023 bluefox <dogafox@gmail.com>
