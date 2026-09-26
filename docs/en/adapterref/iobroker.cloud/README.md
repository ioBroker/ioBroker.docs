---
chapters: {"pages":{"en/adapterref/iobroker.cloud/README.md":{"title":{"en":"ioBroker cloud adapter"},"content":"en/adapterref/iobroker.cloud/README.md"},"en/adapterref/iobroker.cloud/doc/ifttt.md":{"title":{"en":"How to use IFTTT with ioBroker"},"content":"en/adapterref/iobroker.cloud/doc/ifttt.md"},"en/adapterref/iobroker.cloud/doc/tasker.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.cloud/doc/tasker.md"}}}
---
![Logo](admin/cloud.png)
# ioBroker cloud adapter

![Number of Installations](http://iobroker.live/badges/cloud-installed.svg) ![Number of Installations](http://iobroker.live/badges/cloud-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.cloud.svg)](https://www.npmjs.com/package/iobroker.cloud)
[![Downloads](https://img.shields.io/npm/dm/iobroker.cloud.svg)](https://www.npmjs.com/package/iobroker.cloud)

[![NPM](https://nodei.co/npm/iobroker.cloud.png?downloads=true)](https://nodei.co/npm/iobroker.cloud/)

This adapter allows connection from the internet through ioBroker cloud to local installation of ioBroker.

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** 
For more details and for information how to disable the error reporting, see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Settings
### APP-KEY
To use cloud adapter, you should first get the APP-Key on [https://iobroker.net](https://iobroker.net).

This is application key that the user can get on [https://iobroker.net](https://iobroker.net) site. Please get the key there and enter it here.

![Intro](img/intro.png)

### Instance
All requests from cloud adapter will be routed to specific WEB Instance. User must specify here the WEB instance; that will be shown to user, when he logs in https://iobroker.net site.

### Allow self-signed certificates
If you use standard iobroker.net cloud, you can deactivate it. This option is only important if your own cloud is used.

### Alexa settings
***Alexa is not supported in `cloud` adapter anymore. Use ioBroker.iot adapter for that.***

## IFTTT
[instructions](/#/docs/adapterref/iobroker.cloud/doc/ifttt.md)

## Services
There is a possibility to send messages to cloud adapter.
If you call `[POST]https://iobroker.net/service/custom_<NAME>/<user-app-key>` und value as payload.

```bash
curl --data "myString" https://iobroker.net/service/custom_test/<user-app-key>
```

If you set in the settings the field "White list for services" the name *custom_test*, and call with "custom_test" as the service name, the state `cloud.0.services.custom_test` will be set to `myString`.

You may write "*" in whitelist and all services will be allowed.

From version 2.0.5 you can use GET request in form `[GET]https://iobroker.net/service/custom_<NAME>/<user-app-key>/<data>` to place the `\<data\>` into `cloud.0.services.custom_\<NAME\>`.

Here you can find instructions on how to use it with [tasker](/#/docs/adapterref/iobroker.cloud/doc/tasker.md).

IFTTT service is allowed only if an IFTTT key is set.

Reserved names are `ifttt`, `text2command`, `simpleApi`, `swagger`. These must be used without the `"custom_"` prefix.

### text2command
You may write `text2command` in whitelist, you can send POST request to `https://iobroker.net/service/text2command/<user-app-key>` to write data into `text2command.X.text` variable.

"X" can be defined in settings by the "Use text2command instance" option.

### simpleApi
You can use the following commands (only pro):
- `[GET]https://iobroker.pro/service/simpleApi/<user-app-key>/get/stateID` - to read state value => `{"val":103.516,"ack":true,"ts":1604132484682,"q":0,"from":"system.adapter.admin.0","lc":1604132469672,"result":"OK"}`
- `[GET]https://iobroker.pro/service/simpleApi/<user-app-key>/getPlainValue/stateID` - to read state value => `103.641`
- `[GET]https://iobroker.pro/service/simpleApi/<user-app-key>/set/stateID?value=1` - to set state value => `{"result":"OK"}`

**Don't forget to add `simpleApi` to allowed services in the configuration.**

### Limitations
If HTTPs (Security) or authentication is enabled on a defined web-instance, it does not work.

You can deactivate HTTPS and authentication on this web instance, but better is to create a new web instance that is bound to `localhost` and select this instance in cloud-settings.

## Remote shell (SSH)
On **pro** the cloud can act as an SSH jump host so you reach a shell (or any TCP service) on this machine
from anywhere, authenticated with your cloud e-mail and password. The inner SSH connection is end-to-end
encrypted between your client and the local `sshd`, so the cloud only forwards bytes.

Turn it on under **Remote shell** in the adapter settings:
- **Enable remote shell** — off by default.
- **Allowed destinations** — a table of rules; a destination is allowed when any row matches it. This is
  the authoritative allow-list, the cloud opens nothing the adapter does not permit. Each row has:
  - **Host** — a single IP or hostname (`127.0.0.1`, `localhost`), a wildcard (`192.168.*`), a CIDR
    (`192.168.1.0/24`), or a range (`192.168.1.10-192.168.1.50`).
  - **Ports** — a list and/or ranges (`22`, `22, 8081`, `8000-8100`), or empty / `*` / `all` for any port.

  Default: `127.0.0.1` and `localhost`, any port (this machine only). So one row can expose only SSH on
  the ioBroker box while another opens a whole subnet, e.g. `127.0.0.1 → 22` plus `192.168.1.0/24 → *`.

Then connect (with your own sshd moved off port 22, and `pi` being a user on this machine):
```bash
ssh -J <email>@iobroker.pro pi@localhost
```
`-L 8081:localhost:8081` tunnels the admin UI, `scp`/`sftp` copy files, and so on. UDP is not carried
(so KNXnet/IP over UDP needs a TCP-capable gateway or a VPN).

On start the adapter probes whether an SSH server is reachable on `127.0.0.1:22` and publishes the result
in the state **`info.sshAvailable`**. The settings page reads that state live: when no SSH server is found
(or the account is not pro) it shows a hint and **hides the remote-shell settings entirely**, so they only
appear when enabling them can actually reach a shell.

## Android application
With the new android application the location of variables for brightness and location has been changed.

Now they could be found in `cloud.X.devices.NAME`: 
- `cloud.X.devices.NAME.brightness`
- `cloud.X.devices.NAME.currentLocation`.
- `cloud.X.devices.NAME.batteryLevel`
- `cloud.X.devices.NAME.batteryState`.

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### 6.2.5 (2026-09-24)
* (@GermanBluefox) A POST body that arrives as a buffer is decoded instead of stringified, so the telemetry of the visu apps is no longer lost on its way through the cloud
* (@GermanBluefox) An empty body for a reported value, and a command without `deviceName`/`name`, are logged instead of being dropped silently

### 6.2.4 (2026-09-21)
* (@GermanBluefox) Updated packages

### 6.2.1 (2026-09-17)
* (@GermanBluefox) Updated packages
* (@GermanBluefox) Clear subscriptions on cloud disconnection

### 6.1.3 (2026-08-26)
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Migrated blockly to TypeScript

### 6.1.2 (2026-06-13)
* (@GermanBluefox) Added support of credentials manager

## License
The MIT License (MIT)

Copyright (c) 2016-2026 bluefox <dogafox@gmail.com>

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