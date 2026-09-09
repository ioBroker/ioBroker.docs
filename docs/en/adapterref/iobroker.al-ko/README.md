![Logo](admin/al-ko.png)

# ioBroker.al-ko

[![NPM version](https://img.shields.io/npm/v/iobroker.al-ko.svg)](https://www.npmjs.com/package/iobroker.al-ko)
[![Downloads](https://img.shields.io/npm/dm/iobroker.al-ko.svg)](https://www.npmjs.com/package/iobroker.al-ko)
![Number of Installations](https://iobroker.live/badges/al-ko-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/al-ko-stable.svg)

![NPM](https://nodei.co/npm/iobroker.al-ko.png?downloads=true)

## Overview

The ioBroker.al-ko adapter integrates **AL-KO Robolinho robotic lawnmowers** and other AL-KO smart garden devices into ioBroker using the official **AL-KO Cloud API**, including real-time updates via WebSocket.

This adapter is a **community project** and is **not affiliated with or supported by AL-KO**.

---

## Features

- Connects to the official AL-KO Cloud API
- Automatically creates all readable states
- Writable states controlled through a whitelist
- Sends state changes back to AL-KO (`desired` state API)
- Real-time updates via WebSocket
- Supports multiple devices
- Works with the newest ioBroker admin/jsonConfig format

---

## Requirements

You need AL-KO API credentials, which can be requested here:

➡ https://alko-garden.at/iot-api-zugang-anfordern/

Adapter settings in Admin:

- Username (AL-KO account)
- Password
- Client ID
- Client Secret

---

## Disclaimer

This adapter is **not** affiliated with or supported by AL-KO.  
Do **not** contact AL-KO customer service regarding this project.

---

## Changelog

### 0.3.11 (2026-05-07)
- Fixed CI issues and stabilized workflow
- Updated release tooling
- Require Node.js >= 22.13.0
- Improved code quality (eslint/prettier)

### 0.3.10 (2026-05-07)
- Migrated i18n to short format
- Aligned tsconfig with Node.js 22
- Updated Node.js requirement to >=22.13.0
- Stabilized CI configuration

### 0.3.9 (2026-05-07)
- Fixed missing changelog entry for 0.3.8
- Version alignment

### 0.3.8 (2026-05-07)
- Fixed CI/npm publish issues
- Updated dependencies
- Stability improvements

### 0.3.7 (2026-05-07)
- Updated dependencies (including axios security fixes)
- Require Node.js >= 22
- Stability improvements


➡ Full changelog here:  
[CHANGELOG_OLD.md](./CHANGELOG_OLD.md)

---

## License

MIT License

Copyright (c) 2026 Hubert Zechner <hubertiob@posteo.at>

This project is released under the **MIT License**.  
See the included **LICENSE** file for full details.
