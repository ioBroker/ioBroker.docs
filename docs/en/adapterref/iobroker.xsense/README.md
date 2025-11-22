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
hash: EAKZ0Anx09hS8DeJxkB9P5e65e6vvxJxCHMdCWooShE=
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

# IoBroker.xsense
=================

</br> **Version:** </br>

## XSense Adapter for ioBroker
This ioBroker adapter allows the integration of [XSense devices](https://de.x-sense.com/) into the ioBroker smart home system.
It is designed to receive data from XSense smoke detectors, CO detectors, and other compatible devices, making them available in ioBroker for automation and monitoring.
The adapter communicates with the XSense cloud server and provides an easy way to integrate XSense devices into existing ioBroker setups.
An XSense Bridge SBS50 is required.

## The [Original Python Code](https://github.com/theosnel/python-xsense) is from [theosnel](https://github.com/theosnel) .. big THX for
---

## ❗ WARNING
A too frequent polling interval (default: 5 min) will shorten the device battery life, as the devices are **always** explicitly woken up.
The adapter is **not** intended for alarm purposes — it is primarily for monitoring the device battery status.

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

---

### 📦 Preparation
Since XSense does not allow simultaneous login from the app and third-party software, it is recommended to follow this procedure:

- Create a second account in the XSense app
- Log in with the new account, then log out
- Log in again with your original account
- Share the desired devices from the main account with the new account
- Log back into the new account and accept the invitation
- Finally, enter the new account credentials in the adapter settings

  **Alternatively:** You can only use one account, with the drawback that you will constantly be logged out of the app.

---

## 🚀 Installing Python (if not already installed)
It must be an official and publicly released Python version.

💻 **Windows**

1. **Install Python**
   - Download: [https://www.python.org/downloads/windows/](https://www.python.org/downloads/windows/)
   - During installation, **enable “Add Python to PATH”**
Then verify:

```powershell
python --version
pip --version
```

   - Afterwards, in the objects under `xsense.0.info.callPython`, enter `python` (default value is `python3`).

🐧 **Linux / Docker**

- This happens automatically — just select the preferred version in the adapter settings.

---

## ❗ Troubleshooting
If the correct version is installed but the adapter has already fetched the wrong one, first delete the environment:

```
  rm -Rf /home/iobroker/.cache/autopy/venv/xsense-env
 ```

Then restart the adapter.
If it still doesn’t work, check the file /home/iobroker/.cache/autopy/venv/xsense-env/pyvenv.cfg.
It lists the Python versions relevant to the environment — adjust if necessary.
If the file does not exist, you did not wait long enough for the adapter to start.

------------------------------------------------------------------------------
------------------------------------------------------------------------------

<img width="1029" height="438" alt="graphic" src="https://github.com/user-attachments/assets/86e4fd1c-1d4e-4234-a2ad-48b8dd9f418e" />

<img width="2028" height="577" alt="graphic" src="https://github.com/user-attachments/assets/65cc5c71-4cd3-4502-b4bd-a4c7241d7708" />

------------------------------------------------------------------------------

## Changelog
### 0.2.1 (2025-10-30)
* (arteck) fix link to readme
* (arteck) fix load bridge as first

### 0.2.0 (2025-10-21)
* (arteck) !!!!!!!!!!!!!!!!!!!!!!!   new tree structure, delete all old devices
* (arteck) fix for more bridges

### 0.1.3 (2025-10-20)
* (arteck) fix for more devices than 15

### 0.1.2 (2025-10-06)
* (arteck) fix error message

### 0.1.1 (2025-10-04)
* (arteck) fix

### 0.1.0 (2025-10-04)
* (arteck) improved query handling
* (arteck) add Test button with answer message
* (arteck) shorter request interval (min 10 sec)

### 0.0.18 (2025-09-06)
* (arteck) fix time state from device

### 0.0.17 (2025-09-06)
* (arteck) Dependencies have been updated

### 0.0.16 (2025-09-06)
* (arteck) Dependencies have been updated

### 0.0.15 (2025-08-17)
* (arteck) add forceRefresh button for manual refresh of device data

### 0.0.14 (2025-08-16)
* (arteck) add checkbox for windows
* (arteck) add timeout for python
* (arteck) fix state roles

### 0.0.13 (2025-08-03)
* (arteck) fix io-package

### 0.0.12 (2025-07-30)
* (arteck) fix util

### 0.0.11 (2025-07-30)
* (arteck) fix util missing

### 0.0.10 (2025-07-30)
* (arteck) pip auto install for linux

### 0.0.9 (2025-07-30)
* (arteck) fix callPython Object

### 0.0.8 (2025-07-30)
* (arteck) add callPython Object

### 0.0.6 (2025-07-29)
* (arteck) new error message

### 0.0.5 (2025-07-29)
* (arteck) serialnumber is a string

### 0.0.4 (2025-07-28)
* (arteck) fix language

### 0.0.3 (2025-07-28)
* (arteck) modify Debug method

### 0.0.2 (2025-07-28)
* (arteck) initial release

### 0.0.1 (2025-07-27)
* (arteck) initial release

## License

MIT License

Copyright (c) 2025 Arthur Rupp <arteck@outlook.com>,

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