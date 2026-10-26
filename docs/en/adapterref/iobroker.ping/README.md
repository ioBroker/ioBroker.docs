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

You can also monitor TCP ports by specifying the port number after the IP address with a colon (e.g., `192.168.1.1:80` or `google.com:443`). This will check if the port is reachable instead of using ICMP ping.

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information on how to disable the error reporting, see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Ping from javascript adapter

You can ping any IP address from the JavaScript adapter with the command:

```js
sendTo('ping.0', 'ping', '192.168.1.1', res => {
    console.log('Result: ' + JSON.stringify(res)); // Result: {"result": {"host": "192.168.1.1", "alive": true, "ms": 250}}
});
```

You can also check TCP ports:

```js
sendTo('ping.0', 'ping', '192.168.1.1:80', res => {
    console.log('Result: ' + JSON.stringify(res)); // Result: {"result": {"host": "192.168.1.1:80", "alive": true, "ms": 15}}
});
```

## Known Issues

- if it is not possible to ping your linux client, check if `iputils-ping` is correctly installed on a client.

- `ping` command under linux requires root permissions.

You can give the adapter the rights to execute the `ping` command as root.

For this, you need to add the following line to the `/etc/sudoers` file with `sudo visudo` command: `iobroker ALL=(ALL) NOPASSWD: /bin/ping`.

Or you can allow the ping execution by `sudo setcap cap_net_raw+ep /bin/ping` command.

You must install `setcap` with `sudo apt-get install libcap2-bin` before if `setcup` not found.

## Waking sleeping devices (e.g. iPhones)

Some devices, particularly iPhones in deep sleep mode, do not respond to standard ICMP ping. To detect such devices reliably, the adapter can send a burst of 10 empty UDP packets to port 5353 (mDNS) which wakes the device, waits one second and then performs a regular ping to confirm reachability.

Enable **"Wake before ping"** for individual devices in the Devices table.

The burst is sent by the adapter itself (the same as `hping3 -2 -c 10 -p 5353 -i u1 -q <IP>`), so no additional tool has to be installed and it works on every platform.

## TCP Port Check

From version 1.8.0 you can also check TCP ports by specifying the port number after the IP address with a colon (e.g., `192.168.1.1:80`).

The adapter will check if the TCP port is reachable instead of using ICMP ping.

## Wake-on-LAN from javascript adapter

You can wake up any device by sending a Wake-on-LAN magic packet using its MAC address:

```js
// Send to broadcast (255.255.255.255)
sendTo('ping.0', 'wakeOnLan', '01:23:45:67:89:AB', res => {
    console.log('Result: ' + JSON.stringify(res)); // Result: {"result": {"mac": "01:23:45:67:89:AB"}}
});

// Send to a specific IP (e.g. directed broadcast)
sendTo('ping.0', 'wakeOnLan', { mac: '01:23:45:67:89:AB', ip: '192.168.1.255' }, res => {
    console.log('Result: ' + JSON.stringify(res)); // Result: {"result": {"mac": "01:23:45:67:89:AB", "ip": "192.168.1.255"}}
});
```

## Writing to alive states

Every device state is writable and reacts to unacknowledged writes:

- **Write `false`** — triggers an immediate ping of that device, outside of the normal polling interval.
- **Write `true`** — sends a [Wake-on-LAN](https://en.wikipedia.org/wiki/Wake-on-LAN) magic packet to wake the device up.

### Wake-on-LAN

For Wake-on-LAN to work, the adapter needs to know the device's MAC address. It is resolved in this order:

1. **MAC discovered by network browse** — if the device was found during a network browse, its MAC address is cached automatically.
2. **Live ARP lookup** — if the above is not available, the adapter tries to resolve the MAC via ARP at the moment of the write.

If the MAC address cannot be determined, a warning is logged and the packet is not sent.

Example from the JavaScript adapter:

```js
// Trigger immediate ping
setState('ping.0.myHost.192_168_1_1', false);

// Send Wake-on-LAN magic packet
setState('ping.0.myHost.192_168_1_1', true);
```

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 3.1.4 (2026-10-13)
- (@GermanBluefox) Replaced `hping3` with a native UDP burst to wake sleeping devices, so nothing has to be installed anymore and it works on all platforms (#400)

### 3.1.3 (2026-10-13)
- (@GermanBluefox) Fixed lint error after GUI package update (3.1.2 was not published to npm)

### 3.1.2 (2026-10-13)
- (@GermanBluefox) Updated packages and added missing translations

### 3.1.1 (2026-09-01)
- (@GermanBluefox) Ping says now when this host may not send ICMP at all instead of reporting every device as offline
- (@GermanBluefox) Added an optional TCP check that keeps the devices monitored on such a host (LXC container)

### 3.0.1 (2026-08-03)
- (copilot) Breaking: Adapter requires node.js >= 22 now
- (@GermanBluefox) Migrated for Admin 8

## License

The MIT License (MIT)

Copyright (c) 2014-2026, @GermanBluefox <dogafox@gmail.com>

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