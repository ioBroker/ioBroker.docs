![Logo](admin/apsystems-ez1.png)

![NPM version](https://img.shields.io/npm/v/iobroker.apsystems-ez1.svg) ![Downloads](https://img.shields.io/npm/dm/iobroker.apsystems-ez1.svg) ![Number of Installations](https://iobroker.live/badges/apsystems-ez1-installed.svg) ![Current version in stable repository](https://iobroker.live/badges/apsystems-ez1-stable.svg) ![Tests](https://github.com/zhihaining/ioBroker.apsystems-ez1/workflows/Test%20and%20Release/badge.svg) 

---

## 📌 Description

This adapter integrates with **APsystems EZ1 microinverters** using the device’s **local HTTP API (port 8050)**.  
It allows reading real‑time inverter data and controlling certain device parameters.

### ✔ Supported Features

- Read realtime **power** and **energy** values  
- Read **device information** (firmware, SSID, IP, etc.)  
- Read **alarm states**  
- Set **MaxPower**  
- Set **On/Off state**  
- Support for **multiple devices** in one adapter instance  
- HTTP timeout + retry logic  
- Optional **email alerting** on repeated errors  
- Includes a **VIS2 widget** for monitoring and control  

### 🔗 Manufacturer Information

APsystems EZ1 product page:  
https://apsystems.com

---

## 🛠 Installation

Install via ioBroker Admin:

**Adapters → Search “apsystems-ez1” → Install**

or via CLI:
```
iobroker install iobroker.apsystems-ez1
```
---

## ⚙️ Configuration

The adapter supports **multiple devices** via a JSON array:

### **Devices**
Example:

```json
[
  { "name": "Roof", "ip": "192.168.1.50" },
  { "name": "Garage", "ip": "192.168.1.51" }
]
```

### pollInterval

- Interval in seconds between polls
- Default: 30

### httpTimeout

- HTTP timeout in milliseconds
- Default: 5000

### httpRetries

- Number of retry attempts
- Default: 2

### EZ1 API-Port

- IP Port Number of device
- Default: 8050

### alertEmail

- Optional email address for persistent error alerts
- Requires local sendmail

---

## 📊 Created States

All states are created under:

```
apsystems-ez1.<instance>.devices.<DeviceName>.*
```

### Device Information
|State	|Type	|Description|
| -------- | ------- | ------- |
|deviceId	|string	|Device ID|
|devVer	|string	|Firmware version|
|ssid	|string	|Connected WiFi SSID|
|ipAddr	|string	|Device IP address|

### Power & Energy
|State	|Type	|Description|
| -------- | ------- | ------- |
|output.p1	|number	|Power channel 1 (W)|
|output.p2	|number	|Power channel 2 (W)|
|output.p	|number	|Total power (W)|
|output.e1	|number	|Energy channel 1 (kWh)|
|output.e2	|number	|Energy channel 2 (kWh)|
|output.e	|number	|Total energy (kWh)|
|output.te1	|number	|Lifetime energy channel 1|
|output.te2	|number	|Lifetime energy channel 2|

### Control
|State	|Type	|Write	|Description|
| -------- | ------- | ------- | ------- |
|control.maxPower	|number	|yes	|Set Max Power (W)|
|control.onOff	|boolean	|yes	|Turn inverter on/off|

### Alarms
|State	|Type	|Description|
| -------- | ------- | ------- |
|alarm.og	|boolean	|Off‑grid alarm|
|alarm.isce1	|boolean	|DC1 short circuit|
|alarm.isce2	|boolean	|DC2 short circuit|
|alarm.oe	|boolean	|Output fault|

## 🖼 VIS2 Widget

A VIS2 widget template is included under:
```
vis2/ez1-control
```
It displays:

- Power & energy values
- Alarm states
- MaxPower & On/Off controls

You may need to adjust the instance ID inside the widget.

## 🌐 EZ1 Local API Endpoints

The adapter uses the following endpoints:

```
GET /getDeviceInfo
GET /getOutputData
GET /getMaxPower
GET /getAlarm
GET /getOnOff

GET /setMaxPower?p=VALUE
GET /setOnOff?status=0|1
```
---

## 🧪 Development & Testing

Install dependencies:
```
npm install
```

Run tests:
```
npm test
```

Run adapter in dev‑server:

```
dev-server watch
```

---
## 📦 Publishing

Releases are handled via GitHub Actions.
Push a tag like:

```
v0.1.7
```

and a new release will be published automatically.

---

## Changelog
### 0.2.4 (2026-02-06)
- Fix review findings

### 0.2.3 (2026-01-13)
- release 0.2.3 to npm

### 0.1.6

- Fix warning at startup of validator function

### 0.1.5

- First pre‑release version

### 0.1.4

- First hardware‑tested version

### 0.1.3

- Refactor release script, add i18n step, avoid duplicates

### 0.1.2

- Fix JSON parsing and repository checker issues; add dminUI config and icons

### 0.1.1

- Initial release

---

## 🧑‍💻 Author

Haining Zhi  
GitHub: https://github.com/zhihaining

---
## License

MIT License
Copyright (c) 2026

---
