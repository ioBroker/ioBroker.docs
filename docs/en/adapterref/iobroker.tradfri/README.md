![Logo](admin/tradfri.png)
# ioBroker.tradfri

![Build Status](https://action-badges.now.sh/AlCalzone/ioBroker.tradfri)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/AlCalzone/ioBroker.tradfri.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/AlCalzone/ioBroker.tradfri/alerts/)

![Number of Installations](http://iobroker.live/badges/tradfri-installed.svg) ![Number of Installations](http://iobroker.live/badges/tradfri-stable.svg)

## Requirements
* Linux (e.g. Raspberry Pi) / OSX / Windows
* NodeJS >= 12.x
* Trådfri gateway

## Installation
1. Install this adapter over the iobroker admin GUI or via `npm install iobroker.tradfri --production` 
1. In the ioBroker GUI, add an adapter instance. 
1. Configure the instance by entering the IP/hostname of your gateway and the security code that can be found on the label at the bottom.

### Troubleshooting installation issues:
#### Linux/OSX:
Make sure you install the most recent released version. If there are compilation errors, you might have to install build-essential:
```
apt-get -y install build-essential
```

#### Windows:
If you are running on older NodeJS versions (< 10), the installation may fail with the following error somewhere in the log:
```
Can't find Python executable "python", you can set the PYTHON env variable.
```

To solve it, open an administrative shell:
1. Press the <kbd>&#8862;&nbsp;Windows</kbd> key
2. Enter `cmd`, press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Enter</kbd>
3. Confirm the UAC prompt
and run the following command:
```
npm install --add-python-to-path --global windows-build-tools
```
This may take a while... afterwards the installation should succeed.

## Sending custom CoAP packets
You can send custom CoAP packets from other adapters by using `sendTo`. Example from JavaScript:
```js
sendTo("tradfri.0", "request", options, (ret) => {
	// do something with the result
});
```
The `options` object looks as follows:
```js
{
	path: string,
	method?: "get" | "post" | "put" | "delete", // optional, default = "get"
	payload?: object                            // optional, should be a JSON object
}
```
The result object `ret` looks as follows:
```js
{
	error: string | null,
	result: {
		code: string,            // see https://tools.ietf.org/html/rfc7252#section-12.1.2
		payload: object | Buffer
	}
}
```

## Changelog
[Older changes](CHANGELOG_OLD.md)
<!--
	Placeholder for next release:
	### __WORK IN PROGRESS__
-->
### 3.1.3 (2022-04-24)
* Fix: support for Node.js 18

### 3.1.2 (2021-12-31)
* Fixed a typo preventing the adapter from controlling air purifiers

### 3.1.1 (2021-12-21)
* Fix: actually create states for STARKVIND Air Purifier

### 3.1.0 (2021-12-19)
* Add support for STARKVIND Air Purifier

### 3.0.2 (2021-12-03)
* Improve support for older browsers
* Update dependencies

## License
The MIT License (MIT)

Copyright (c) 2017-2022 AlCalzone <d.griesel@gmx.net>

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
