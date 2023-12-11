---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.rmb-bhkw.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.rmb-bhkw.svg
BADGE-NPM: https://nodei.co/npm/iobroker.rmb-bhkw.png?downloads=true
---
![Logo](admin/neoTower.png)
# ioBroker.rmb-bhkw

[![NPM version](https://img.shields.io/npm/v/iobroker.rmb-bhkw.svg)](https://www.npmjs.com/package/iobroker.rmb-bhkw)
[![Downloads](https://img.shields.io/npm/dm/iobroker.rmb-bhkw.svg)](https://www.npmjs.com/package/iobroker.rmb-bhkw)
![Test and Release](https://github.com/satchafunkilus/ioBroker.rmb-bhkw/workflows/Test%20and%20Release/badge.svg)

[![NPM](https://nodei.co/npm/iobroker.rmb-bhkw.png?downloads=true)](https://nodei.co/npm/iobroker.rmb-bhkw/)


## RMB CHP Adapter for ioBroker

Reads data from RMB CHP units (e.g. Remeha eLina) via the RMB Energie customer portal [rmbenergie.com](https://www.rmbenergie.com/login-report/) and makes them available as objects in ioBroker. Thus, the data can be accessed even without the optional ModBus interface of the plant.


## Usage

The adapter runs as a "scheduled" adapter and pulls the data in the specified interval from the customer portal. The system itself pushes the data only about every 15min to the customer portal, so the data are unfortunately not real-time data. It also makes little sense to set the interval of the adapter to a very short period. The default value for the data request is 5min.

The adapter uses a headless version of the Chromium browser to parse the data from the customer portal. Either the Chromium version supplied by the adapter can be used for this, or an external one. 

### Supplied version of Chrome
If the supplied Chromium browser is to be used, the dependencies must be fulfilled on the host system of ioBroker. On installation, the adapter will try and install any missing dependencies. Should this not work and any of the dependencies are missing, the adapter will throw an error in the log, indicating the missing library. These can be installed on a Debian/Ubuntu system for example with:

```
sudo apt install -y ca-certificates fonts-liberation libappindicator3-1 libasound2 libatk-bridge2.0-0 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libglib2. 0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils
```

If ioBroker is installed on a different operating system, the package names of the dependencies may be different - a quick Google search will probably help. These must then be installed for the respective operating system. Alternatively, you can switch to using an external browser.

### External Chrome Browser
If the supplied browser cannot be used due to missing dependencies, it is recommended to run the Chromium browser as a separate container. For this purpose, the image [browserless/chrome](https://hub.docker.com/r/browserless/chrome/) is recommended. This image can be executed with the command

```
docker run -p 3000:3000 browserless/chrome
```
and is then accessible at `http://[IP-of-docker-host]:3000`. If the web interface of the container appears, it works as expected and the corresponding path can be entered in the adapter configuration.

## Changelog
### 1.0.7 (2023-11-30)
* BREAKING CHANGE due to renaming of object ids
* Changed object IDs to English
* Prevented forbidden chars in object IDs
* Changed objects to read-only
* Changed logs to english
* Changed some logs from info to debug

### 1.0.6 (2023-05-29)
* Added option to allow insecure certificates, as rmbenegie portal is not updating their certificates in time, leading to data not being able to be pulled

### 1.0.5 (2023-02-18)
* Added Admin5 UI
* Updated dependencies

### 1.0.4 (2022-05-16)
* Missing dependencies for chromium are now installed automatically, therefore internal browser should also work in docker container
* Added random delay in polling of data to prevent DDoS on RMB servers
* Code cleanup
* Fixed icon paths
* Added english readme section

### 1.0.3 (2022-04-16)
* Improved handling of errors (Adapter does no longer pull data when server is offline, leading to empty/null states)

### 1.0.2 (2022-04-15)
* Fixed versioning issue in io-package.json (for real)

### 1.0.1 (2022-04-15)
* Fixed versioning issue in io-package.json

### 1.0.0 (2022-04-15)
* (satchafunkilus) First major release

### 1.0.0-0 (2022-04-15)
* (satchafunkilus) First functional release

### 0.0.2 (2022-04-15)
* (satchafunkilus) initial release

## License
MIT License

Copyright (c) 2023 satchafunkilus

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