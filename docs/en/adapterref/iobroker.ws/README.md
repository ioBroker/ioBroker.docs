![Logo](admin/ws.png)
# ioBroker.ws

![Number of Installations](http://iobroker.live/badges/ws-installed.svg) ![Number of Installations](http://iobroker.live/badges/ws-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.ws.svg)](https://www.npmjs.com/package/iobroker.ws)
[![Downloads](https://img.shields.io/npm/dm/iobroker.ws.svg)](https://www.npmjs.com/package/iobroker.ws)

[![NPM](https://nodei.co/npm/iobroker.ws.png?downloads=true)](https://nodei.co/npm/iobroker.ws/)

This adapter used by WEB applications and adapters to communicate with ioBroker using websockets.

It is almost the same as `ioBroker.socketio`, but does not use socket.io library and only simulates it.

**Important Note: Since v4.0 of this adapter pure Websockets are used exclusively! Socket.io is no longer implemented by the socket.io library, but simulated via pure WebSockets!**

Users can use this adapter to connect their products to ioBroker via web sockets. Actually this adapter is e.g. used by Flot, Rickshaw, Vis and mobile to extract data from ioBroker.

You can find in the example [directory](https://github.com/ioBroker/ioBroker.ws/tree/master/example) simple application that uses this interface to show some data.

By using of socket.io interface user should understand the [basics and concept](https://github.com/ioBroker/ioBroker) of the system.

It is useful to read about the [structure of the objects](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md) too. 

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Brief description of concept
### Object
Object is description of data point or group. Group could content other data points in this case it called channel. If group consists of other channels in this case it called device. 

Object is meta information that describes data point and could content: max/min value, unit, name, default value, type of value, information for adapter for communication (e.g. ip address) and so on.

### State
State is actual value of the data point and presented by javascript object: 
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
- If ack=false, it means some other adapter wants to control (write) this variable, so that command will be executed (e.g. light will be switched on).
- If ack=true, it means that device informs about new value. (e.g. light was switched on manually or motion was detected)
 
**Example**: we have some home automation adapter (HAA) that has one lamp connected under address `haa.0.lamp1`. 
- Lamp can be switched on manually with physical switch or via Wi-Fi with the help of HAA. 
- If vis wants to switch the lamp on via Wi-Fi it should set the new value with ```{value: true, ack: false}```. 
- When the lamp is switched on it is normally inform HAA about new state and the value should be immediately overwritten with ```{value: true, ack: true}```.
- If the lamp is switched off manually via physical switch it informs HAA about new state with ```{value: false, ack: true}```. 

### Quality
Every data point has an attribute `q` - *quality*. 

## Usage
It is suggested to use example/conn.js for communication. 

After inclusion of conn.js file the global object `servConn` could be used to establish the communication with socketio adapter.

`servConn` object has hollowing methods:

### init
- function (connOptions, connCallbacks, objectsRequired)

`connOptions` - is optional parameter:

```
connOptions = {
    name:          'name of the connection', // optional - default 'vis.0', used to distinguish connections in socket-io adapter.
    connLink:      'http://localhost:8084',  // optional - URL of the socket.io adapter. By default it is same URL where the WEB server is. 
    socketSession: ''                        // optional - default 'nokey', and used by authentication
};
```

You can pass these parameters by defining the global variables before call of "init" too:

```
var socketUrl      = 'http://localhost:8084';  // is connOptions.connLink
var socketSession  = '';                       // is connOptions.socketSession
servConn.namespace = 'myapp';                  // is connOptions.name
```

`connCallbacks` - object with callbacks:

```
connCallbacks = {
    onConnChange:   function (isConnected) {}, // optional - called if connection state changed.
    onObjectChange: function (id, obj)     {}, // optional - called if content of some object is changed, new object created or object was deleted (obj = null)
    onUpdate:       function (id, state)   {}, // optional - called if state of some object is changed, new state for object is created or state was deleted (state = null)
    onError:        function (error)       {}  // optional - called if some error occurs
};
```

### setState
- function (pointId, value, callback)

set new value of some data point.
 
E.g. ```servConn.setState('adapter.0.myvalue', true)``` writes ```{val: true, ack: false}``` into *adapter.0.myvalue*.

- `pointId` - is ID of the state, like `adapter.0.myvalue`,
- `value`   - new value of the state, could be simple value (string, number, boolean) or object like ```{val: newValue, ack: false, q: 0}```. 
In case if used simple value, "ack" will be set to "false".
- `callback` - ```function (error) {}``` - called when the write of new value into DB is performed (not when the device was controlled).  

### getStates
- function (IDs, callback)

get the states of more than one state. This command normally is called after the connection is established to get the actual states of used data points.

- `IDs` - pattern or array with IDs. Could be omitted to get all states. Patterns could have wildcards, like: '*.STATE', 'haa.0.*' 
- `callback` - ```function (error, states) {}``` - *states* is object like ```{'id1': 'state1', 'id2': 'state2', ...}```. *stateX* are objects with the structure described [above](#state). 

### httpGet
- function (url, callback)

calls this URL from PC, where socketio adapter runs.
- `url` - is address to call. 
- `callback` - ```function (data) {}``` - result of the request (html body). 

### logError
- function (errorText)

writes error message into controller's log.

### getConfig
- function (callback)

reads controller configuration like language, temperature units, point or comma delimiter in floats, date format.

- `callback` - ```function (err, config) {}``` - config looks like:

```
{
  "_id": "system.config",
  "type": "config",
  "common": {
    "name":             "System configuration",
    "language":         "de",
    "tempUnit":         "°C",
    "currency":         "€",
    "dateFormat":       "DD.MM.YYYY",
    "isFloatComma":     true,
    "licenseConfirmed": true,
    "activeRepo":       "fast-online",
    "diag":             "extended",
    "defaultHistory":   ""
  }
}
```

### getObject
- function (id, callback)

read specific object from DB. With this function the meta information of some object could be read.

- `id` - id of the state, like "haa.0.light1",
- `callback` - ```function (error, obj)``` - obj looks like:
  
```
{
  "_id": "haa.0.light1",
  "type": "state",
  "common": {
    "def": false,
    "type": "boolean",
    "read": false,
    "write": true,
    "role": "switch",
    "name": "light in floor"
  },
  "native": {
    "CONTROL": "BUTTON.LONG",
    "DEFAULT": false,
    "FLAGS": 1,
    "ID": "PRESS_LONG",
    "MAX": true,
    "MIN": false,
    "OPERATIONS": 6,
    "TAB_ORDER": 1,
    "TYPE": "ACTION",
    "UNIT": ""
  },
  "enums": ['enum.rooms.floor'],
  "acl": {
    "object": 1638,
    "state": 1638
  }
}  
```

### getObjects
- function (callback)

read all objects from DB. 

- `callback` - ```function (error, objs)``` - objs looks like:  ```{'id1': 'object1', 'id2': 'object2', ...}```

### readDir
- function (dirName, callback)

reads files and directories in specified directory.

Files are stored in DB (or similar) and normally should not be accessed directly. File name consist of path, filename and file extension, like "/mobile.0/data/fileName.txt".  

- dirName - name of the directory like */mobile.0/data*
- callback - ```function (error, list)``` - list looks like:

```
[
    {
        file:       'file1.txt',
        stats:      {
                      mode: 33188,
                      size: 527,
                      atime: Mon, 10 Oct 2011 23:24:11 GMT,
                      mtime: Mon, 10 Oct 2011 23:24:11 GMT,
                      ctime: Mon, 10 Oct 2011 23:24:11 GMT,
                      birthtime: Mon, 10 Oct 2011 23:24:11 GMT
                    },
        isDir:      false,
        modifiedAt: timeInMs, // new Date().getTime()
        createdAt:  timeInMs, // new Date().getTime()
    },
    {
        file:       'main',
        stats:      {
                      mode: 33188,
                      atime: Mon, 10 Oct 2011 23:24:11 GMT,
                      mtime: Mon, 10 Oct 2011 23:24:11 GMT,
                      ctime: Mon, 10 Oct 2011 23:24:11 GMT,
                      birthtime: Mon, 10 Oct 2011 23:24:11 GMT
                    },
        isDir:      true,
        modifiedAt: timeInMs, // new Date().getTime()
        createdAt:  timeInMs, // new Date().getTime()
    },
    ...
]                
```

### mkdir
- function (dirName, callback)

- `callback` - ```function (error) {}```

### unlink
- function (name, callback)

deletes file or directory. Directory must be empty to be deleted. 

- dirName - name of the directory or file like */mobile.0/data*.
- `callback` - ```function (error) {}```

### readFile
- function (filename, callback)

- `callback` - ```function (error, fileData, mimeType)```

### readFile64
- function (filename, callback)

- `callback` - ```function (error, data)``` - data is ```{mime: mimeType, data: base64data}```

### writeFile
- function (filename, data, mode, callback)

- `callback` - ```function (error) {}```

### writeFile64
- function (filename, data, mode, callback)

- `callback` - ```function (error) {}```

### renameFile
- function (oldName, newName, callback)

- `callback` - ```function (error) {}```

### getHistory
- function (instance, options, callback)

- `callback` - ```function (error, data, step, sessionId) {}```

### requireLog
- function (isRequire, callback)

activates/deactivates log receiving for this socket.

- `callback` - ```function (error) {}```

### authEnabled
- function ()

reads if the authentication is enabled and which user is logged in

- `callback` - ```function (authEnabled, currentUser) {}```

If authentication is enabled, so current logged-in user will be returned, if auth is disabled, so the default user "running as" will be returned.

## Tuning Web-Sockets
On some web-sockets clients there is performance problem with communication. Sometimes this problem is due to fallback of socket.io communication on long polling mechanism.
You can set option *Force Web-Sockets* to force using only web-sockets transport.

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### 2.3.4 (2022-12-27)
* (bluefox) corrected connection string

### 2.3.3 (2022-12-22)
* (bluefox) used new socket-classes

### 2.3.1 (2022-11-27)
* (bluefox) Added `fileChange` event

### 2.2.1 (2022-11-08)
* (Apollon77) Prepare for future js-controller versions
* (bluefox) Function `getObjects`for web was extended by devices, channels and enums

### 2.1.5 (2022-08-24)
* (bluefox) Caught error by subscribe

### 2.1.3 (2022-07-08)
* (bluefox) Corrected getAdapterInstances method

### 2.1.2 (2022-06-20)
* (bluefox) Allowed to overload the system language

### 2.1.1 (2022-06-09)
* (bluefox) Do not show requireLog message

### 2.1.0 (2022-05-21)
* (bluefox) Updated ws library to 8.6.0
* (bluefox) Corrected the load of `iobroker.ws` as integrated socket

### 2.0.3 (2022-05-19)
* (bluefox) Hide warn messages

### 2.0.2 (2022-05-16)
* (bluefox) Process `writeDirAsZip` locally

### 2.0.0 (2022-05-12)
* (bluefox) Used common sockets (could be buggy)

### 1.3.0 (2022-03-27)
* (bluefox) Added `log` socket command

### 1.2.0 (2022-02-21)
* (bluefox) Made it possible to have more than one socket from one page

### 1.1.6 (2022-02-16)
* (bluefox) Added `unlink` and `rename` to web functions

### 1.1.4 (2022-02-13)
* (bluefox) Changed name `info.connection` to `info.connected`

### 1.1.2 (2022-02-13)
* (bluefox) Updated ws client file

### 1.1.1 (2022-02-02)
* (bluefox) Updated ws client file

### 1.1.0 (2022-01-31)
* (bluefox) Distributed the compatible client file together with the backen

### 1.0.1 (2022-01-30)
* (bluefox) Initial commit

## License
The MIT License (MIT)

Copyright (c) 2014-2022 bluefox <dogafox@gmail.com>
