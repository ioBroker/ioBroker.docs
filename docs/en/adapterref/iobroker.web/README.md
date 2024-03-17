![Logo](admin/web.png)
# ioBroker.web

![Number of Installations](http://iobroker.live/badges/web-installed.svg)
![Number of Installations](http://iobroker.live/badges/web-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.web.svg)](https://www.npmjs.com/package/iobroker.web)

![Test and Release](https://github.com/ioBroker/ioBroker.web/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/web/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.web.svg)](https://www.npmjs.com/package/iobroker.web)

Web server on the base of Node.js and express to read the files from ioBroker DB.

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** 
For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Tuning Web-Sockets
On some web-sockets clients, there is a performance problem with communication. 
Sometimes this issue is due to the fallback of socket.io communication on long polling mechanism.
You can set the option *Force Web-Sockets* to force using only web-sockets transport.

## Let's Encrypt Certificates
Read [here](https://github.com/ioBroker/ioBroker.admin#lets-encrypt-certificates)

## Extensions
Web driver supports extensions. 
The extension is URL handler, that will be called if such URL request appears.
The extensions look like the normal adapter, but they have no running process 
and will be called by web server.

E.g., the user can activate a special proxy adapter and reach other devices (like webcams) in the same web server.
It is required to let all services be available under one web server.

Web extension could and should support `unload` function, that could return `promise` if the unload action will take some time. 

You can read more about web-extensions [here](WEB-EXTENSIONS-HOWTO.md).

## Brute-force protection
If authentication is enabled and the user enters 5 times invalid password during one minute, he must wait at least one minute till next attempt.
After the 15th wrong attempt, the user must wait 1 hour.

## "Stay logged in" option
If this options is selected, the user stays logged in for one month.
If not, the user will stay logged in for the configured "login timeout".

## Access state's values
You can access the normal and binary state values via the HTTP get request.

```
http://IP:8082/state/system.adapter.web.0.alive =>
{"val":true,"ack":true,"ts":1606831924559,"q":0,"from":"system.adapter.web.0","lc":1606777539894}
```

or

```
http://IP:8082/state/javascript.picture.png =>
[IMAGE]
```

The image must be written in the javascript adapter like:

```
createState('javascript.0.picture.png', {type: 'file', name: 'Picture'}, () => {
    setBinaryState('javascript.0.picture.png', fs.readFileSync('/tmp/picture.png'));
});
```

## "Basic Authentication" option
Allows Login via Basic Authentication by sending `401` Unauthorized with a `WWW-Authenticate` header.
This can be used for applications like *FullyBrowser*. When entering the wrong credentials once, you will be redirected 
to the Login Page. 

## User list
You can define the list of users that can access the web server. You can change the access right for logged-in user.

If the user is not in the list, he cannot access the web server.

It is simpler as to set for every object and every state the access rights for the specific user.

## Advanced options
### Default redirect
If by opening of web port im browser no APP selection should be shown, but some specific application, 
the path could be provided here (e.g. `/vis/`) so this path will be opened automatically.

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### **WORK IN PROGRESS**
* (bluefox) Preparations for a custom loading background

### 6.2.5 (2024-02-22)
* (bluefox) Just some packages were updates

### 6.2.4 (2024-02-17)
* (klein0r) Extensions may block the web instance
* (klein0r) Fixed directory listing

### 6.2.3 (2023-12-18)
* (foxriver76) updated the websocket library to increase the maximum file size from 100 MB to 500 MB

### 6.2.2 (2023-12-14)
* (joltcoke) Corrected the crash if authentication is enabled

### 6.2.1 (2023-12-04)
* (bluefox) Added the user access list option

### 6.1.10 (2023-10-16)
* (bluefox) Corrected the start screen

### 6.1.7 (2023-10-16)
* (bluefox) Added the public accessibility check

### 6.1.6 (2023-10-13)
* (bluefox) Corrected adapter termination if the alias has no target
* (bluefox) Corrected socket.io connection

### 6.1.4 (2023-10-08)
* (foxriver76) upgrade socketio and ws dependencies to fix a vis subscribe problem

### 6.1.3 (2023-09-28)
* (bluefox) upgraded socketio and ws dependencies to correct the error by unsubscribing on client disconnect

### 6.1.2 (2023-09-14)
* (foxriver76) upgraded socketio and ws dependencies

### 6.1.1 (2023-09-05)
* (mcm1957) Added missing node16 requirement

### 6.1.0 (2023-08-01)
* (bluefox) Added the subscribing on the specific instance messages

### 6.0.3 (2023-07-27)
* (bluefox) Updated packages
* (bluefox) Implemented the possibility to view folder content

### 6.0.1 (2023-03-20)
* (bluefox) Removed letsencrypt handling from web adapter

### 5.5.3 (2023-03-17)
* (bluefox) Increased max size of the uploaded file via socket.io to 200MB (from 10MB)

### 5.5.2 (2023-03-03)
* (bluefox) Allowed deletion of fullcalendar objects

### 5.5.1 (2023-02-25)
* (bluefox) Allowed reading projects of vis-2-beta

### 5.5.0 (2023-02-15)
* (bluefox) Added special end-points for app authentication

### 5.4.3 (2023-01-29)
* (bluefox) Corrected error with `publishFileAll` (for future use)

### 5.4.1 (2022-12-23)
* (bluefox) Corrected GUI error

### 5.4.0 (2022-12-22)
* (bluefox) Used a new version of socket classes

## License
The MIT License (MIT)

Copyright (c) 2014-2024 Bluefox <dogafox@gmail.com>

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
