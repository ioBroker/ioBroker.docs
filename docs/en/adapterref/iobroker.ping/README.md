![Logo](admin/ping.png)
# PING Adapter

![Number of Installations](http://iobroker.live/badges/ping-installed.svg)
![Number of Installations](http://iobroker.live/badges/ping-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.ping.svg)](https://www.npmjs.com/package/iobroker.ping)

![Test and Release](https://github.com/ioBroker/ioBroker.ping/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/ping/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.ping.svg)](https://www.npmjs.com/package/iobroker.ping)

## Pings configured IP addresses.
Pings specified IP addresses in a defined interval and monitors the results.

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Ping from javascript adapter
You can ping any IP address from the JavaScript adapter with command:
```
sendTo('ping.0', 'ping', '192.168.1.1', (res) => {
    console.log('Result: ' + JSON.stringify(res)); // Result: {"result": {"host": "192.168.1.1", "alive": true, "ms": 250}} 
});
```

## Known Issues
* if it is not possible to ping your linux client, check if `iputils-ping` is correctly installed on a client.

* `ping` command under linux requires root permissions.

You can give the adapter the rights to execute the `ping` command as root.

For this, you need to add the following line to the `/etc/sudoers` file with `sudo visudo` command: `iobroker ALL=(ALL) NOPASSWD: /bin/ping`.

Or you can allow the ping execution by `sudo setcap cap_net_raw+ep /bin/ping` command.

You must install setcap with `sudo apt-get install libcap2-bin` before if `setcup` not found.

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### 1.7.0 (2024-08-17)
* (bluefox) Added possibility to browse the IP ranges

### 1.6.4 (2024-07-17)
* (bluefox) Added possibility to execute `setcap` command to allow ping without root rights

### 1.6.3 (2024-07-16)
* (bluefox) Updated the packages

### 1.6.2 (2023-07-19)
* (McM1957) Handling of state updates causing crashes with js-controller 5 has been corrected. (Issue #106)
* (McM1957) Trailing spaces are now removed from ip address and name. Trailing spaces blocked correct operation. (Issue #98)
* (bluefox) Added JSON config
* (bluefox) Added different intervals for online and offline devices
* (bluefox) implemented export/import of devices

### 1.5.3 (2022-02-24)
* (Apollon77) Fix the ping retry logic

### 1.5.2 (2022-01-20)
* (basti4557) Number of retries can be defined if a ping request failed. This should minimize wrong offline detection.

### 1.5.0 (2021-07-14)
* js-controller 2.0 required at least
* (Apollon77) optimize for js-controller 3.3

### 1.4.12 (2020-09-18)
* (Apollon77) Prevented a crash case when no devices are defined (Sentry IOBROKER-PING-R)

### 1.4.11 (2020-08-26)
* (Apollon77) update js-controller dependency to correct version (1.5.8)

### 1.4.8 (2020-06-29)
* (Apollon77) Prevent adapter crashes with invalid state/channel names, see error log! (Sentry IOBROKER-PING-H, IOBROKER-PING-P, IOBROKER-PING-B)

### 1.4.7 (2020-05-02)
* (Apollon77) finally try to catch spawn errors (Sentry IOBROKER-PING-2)

### 1.4.6 (2020-04-29)
* (Apollon77) Make sure the adapter does not crash if ping command cannot be executed (Sentry)
* (Apollon77) Catch error when `ping.probe` could not be started (Sentry IOBROKER-PING-2)

### 1.4.5 (2020-04-23)
* (Apollon77) Fixed a potential crash case (Sentry)

### 1.4.4 (2020-04-17)
* (bluefox) Added support for Admin3

### 1.4.3 (2020-04-17)
* (Apollon77) Add Sentry for js-controller 3.0
* (Apollon77) update dependencies

### 1.4.2 (2020-01-23)
* (JayVee2) Sort the IP addresses

### 1.4.1 (2019-01-08)
* (simatec) supported compact mode

### 1.4.0 (2018-01-25)
* (vdemidov) refactored, added ping time and roundtrips per second for every host

### 1.3.2 (2017-09-20)
* (ldittmar) object values are converted to the valid type

### 1.3.0 (2017-02-21)
* (bluefox) allowed removing host name from state's name

### 1.2.0 (2016-12-09)
* (bluefox) change configuration dialog

### 1.1.3 (2016-11-16)
* (bluefox) catch error if no IP defined

### 1.1.1 (2016-04-10)
* (bluefox) remove ms

### 1.1.0 (2016-04-10)
* (bluefox) rewrite ping for windows

### 1.0.0 (2016-04-03)
* (bluefox) support for freebsd and all windows languages
* (bluefox) add tests

### 0.1.3 (2015-01-26)
* (bluefox) Fixed the error if the configuration changed

### 0.1.2 (2015-01-14)
* (bluefox) Fixed the configuration page

### 0.1.1 (2015-01-03)
* (bluefox) Enabled npm install

### 0.1.0 (2014-11-26)
* (bluefox) Used ping npm module instead of static one

### 0.0.5 (2014-11-21)
* (bluefox) Made possible to have shorter ping intervals (down to 5 seconds)

### 0.0.4 (2014-11-07)
* (bluefox) fix ping node

### 0.0.3 (2014-11-03)
* (bluefox) fix ping node (do not forget to remove package from git when the npm gets the update)

### 0.0.1 (2014-11-02)
* (bluefox) support of server (actually no authentication)

## License

The MIT License (MIT)

Copyright (c) 2014-2024, bluefox <dogafox@gmail.com>

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
