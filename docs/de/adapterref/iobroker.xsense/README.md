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
---
![Logo](admin/xsense.png)
# ioBroker.xsense
=================

[![NPM](https://nodei.co/npm/iobroker.xsense.png?downloads=true)](https://nodei.co/npm/iobroker.xsense/)

[![NPM version](http://img.shields.io/npm/v/iobroker.xsense.svg)](https://www.npmjs.com/package/iobroker.xsense)
[![Downloads](https://img.shields.io/npm/dm/iobroker.xsense.svg)](https://www.npmjs.com/package/iobroker.xsense)
![GitHub last commit](https://img.shields.io/github/last-commit/arteck/ioBroker.xsense)
![GitHub issues](https://img.shields.io/github/issues/arteck/ioBroker.xsense)[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/arteck/ioBroker.xsense/blob/master/LICENSE)

</br>
**Version:** </br>

![Number of Installations](http://iobroker.live/badges/xsense-installed.svg)
![Beta](https://img.shields.io/npm/v/iobroker.xsense.svg?color=red&label=beta)
![Stable](https://iobroker.live/badges/xsense-stable.svg)


## XSense Adapter for ioBroker

This ioBroker adapter allows the integration of [XSense devices](https://de.x-sense.com/) into the ioBroker smart home system.  
It is designed to receive data from XSense smoke detectors, CO detectors, and other compatible devices, making them available in ioBroker for automation and monitoring.  
The adapter communicates with the XSense cloud server and provides an easy way to integrate XSense devices into existing ioBroker setups.  
An XSense Bridge SBS50 is required.

---

## ❗ WARNING
The adapter is **not** intended for alarm purposes — it is primarily for monitoring the device battery status.
I accept no liability if the place burns down.

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

  **Alternatively:** You can use only one account, with the drawback that you will constantly be logged out of the app.

---

## ❗ Troubleshooting

Error Message after install

[XSense] Cannot find package '@mongodb-js/zstd'

check your Node version. zstd has a problem wit Node 24

or if you have a VM on proxmox check your CPU settings
<img width="676" height="140" alt="grafik" src="https://github.com/user-attachments/assets/68658aab-5336-4493-9a51-f833c3238a5a" />



------------------------------------------------------------------------------
------------------------------------------------------------------------------


<img width="1029" height="438" alt="grafik" src="https://github.com/user-attachments/assets/86e4fd1c-1d4e-4234-a2ad-48b8dd9f418e" />

<img width="2028" height="577" alt="grafik" src="https://github.com/user-attachments/assets/65cc5c71-4cd3-4502-b4bd-a4c7241d7708" />

------------------------------------------------------------------------------
<!--
      ### **WORK IN PROGRESS**
-->

## Changelog
### 0.6.3 (2026-05-20)
* (arteck) Dependencies have been updated

### 0.6.2 (2026-05-20)
* (copilot) Adapter requires node.js >= 22 now
* (arteck) Dependencies have been updated

### 0.6.1 (2026-05-03)
* (arteck) fix deviceManager

### 0.6.0 (2026-05-03)
* (arteck) fix battery info
* (arteck) add deviceManager

### 0.5.1 (2026-05-02)
* (arteck) fix battery info
* (arteck) mqtt message as info in log