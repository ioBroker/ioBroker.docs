---
BADGE-NPM: https://nodei.co/npm/iobroker.xsense.png?downloads=true
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.xsense.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.xsense.svg
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/arteck/ioBroker.xsense
BADGE-GitHub issues: https://img.shields.io/github/issues/arteck/ioBroker.xsense
BADGE-License: https://img.shields.io/badge/License-MIT-blue.svg
BADGE-Number of Installations: http://iobroker.live/badges/xsense-installed.svg
BADGE-Beta: https://img.shields.io/npm/v/iobroker.xsense.svg?color=red&label=beta
BADGE-Stable: https://iobroker.live/badges/xsense-stable.svg
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/adapterref/iobroker.xsense/README.md
title: ioBroker.xsense
hash: cVs2+UpS0IqpiAnic2+rk8AT9SiVDu+pPnOkHD/lBzU=
---
![logo](../../../de/adapterref/iobroker.xsense/admin/xsense.png)

![NPM](https://nodei.co/npm/iobroker.xsense.png?downloads=true)
![NPM version](http://img.shields.io/npm/v/iobroker.xsense.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.xsense.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/arteck/ioBroker.xsense)
![GitHub issues](https://img.shields.io/github/issues/arteck/ioBroker.xsense)
![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Number of Installations](http://iobroker.live/badges/xsense-installed.svg)
![beta](https://img.shields.io/npm/v/iobroker.xsense.svg?color=red&label=beta)
![Stable](https://iobroker.live/badges/xsense-stable.svg)

# ioBroker.xsense

\=================

</br>
**Version:** </br>

## XSense Adapter for ioBroker

This ioBroker adapter allows the integration of [XSense devices](https://de.x-sense.com/) into the ioBroker smart home system.\
&#x20;It is designed to receive data from XSense smoke detectors, CO detectors, and other compatible devices, making them available in ioBroker for automation and monitoring.\
&#x20;The adapter communicates with the XSense cloud server and provides an easy way to integrate XSense devices into existing ioBroker setups.\
&#x20;An XSense Bridge SBS50 is required.

---

## ❗ WARNING

The adapter is **not** intended for alarm purposes — it is primarily for monitoring the device battery status. I accept no liability if the place burns down.

---

### 🔧 Supported Devices

- Smoke detectors
- Carbon monoxide detectors
- Heat detectors
- Water leak detectors
- Hygrometers
- Base stations (if supported)

---

### ⚠️ Requirements

- An XSense account with registered devices
- Internet connection for cloud communication
- MQTT Server for messages

---

### 📦 Preparation

Since XSense does not allow simultaneous login from the app and third-party software, it is recommended to follow this procedure:

- Create a second account in the XSense app
- Log in with the new account, then log out
- Log in again with your original account
- Share the desired devices from the main account with the new account
- Log back into the new account and accept the invitation
- Finally, enter the new account credentials in the adapter settings

  **Alternatively:** You can use only one account, with the drawback that you will constantly be logged out of the app.

---

## ❗ Troubleshooting

Error message after installation

\[XSense] Cannot find package '@mongodb-js/zstd'

check your node version. zstd has a problem with Node 24

or if you have a VM on proxmox check your CPU settings<img width="676" height="140" alt="grafik" src="https://github.com/user-attachments/assets/68658aab-5336-4493-9a51-f833c3238a5a" />

---

---

<img width="1425" height="768" alt="grafik" src="https://github.com/user-attachments/assets/fd52869a-48f3-403a-a97c-dfef587e02bf" />

<img width="2028" height="577" alt="grafik" src="https://github.com/user-attachments/assets/65cc5c71-4cd3-4502-b4bd-a4c7241d7708" />

---

<!--
      ### **WORK IN PROGRESS**
-->

## Changelog
### 0.6.5 (2026-08-27)
* (arteck) async fix
* (arteck) fix battery info
* (arteck) fix orphaned states without house folder from MQTT messages for stations not yet known (startup race and newly added devices)

### 0.6.4 (2026-06-22)
* (arteck) Dependencies have been updated

### 0.6.3 (2026-05-20)
* (arteck) Dependencies have been updated

### 0.6.2 (2026-05-20)
* (copilot) Adapter requires node.js >= 22 now
* (arteck) Dependencies have been updated

### 0.6.1 (2026-05-03)
* (arteck) fix deviceManager

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2025-2026 Arthur Rupp <arteck@outlook.com>,

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