---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.al-ko.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.al-ko.svg
BADGE-Number of Installations: https://iobroker.live/badges/al-ko-installed.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/al-ko-stable.svg
BADGE-NPM: https://nodei.co/npm/iobroker.al-ko.png?downloads=true
---
# ioBroker.al-ko – English Documentation

![Logo](../../admin/al-ko-128.png)

## Overview

The ioBroker.al-ko adapter integrates **AL-KO Robolinho robotic mowers** and other AL-KO smart garden devices into ioBroker.  
It communicates with the official **AL-KO Cloud API**, including real-time updates via WebSockets.

---

## Features

- Connection to the official AL-KO Cloud API
- Automatic creation of all readable states
- Writable states controlled through a whitelist
- Changes to writable states are propagated back to AL-KO via the `desired` API
- Real-time updates through WebSocket
- Supports multiple devices
- Fully compatible with modern ioBroker admin/jsonConfig

---

## Requirements

To use this adapter, AL-KO API credentials are required.

Request access at:  
➡ https://alko-garden.at/iot-api-zugang-anfordern/

Required fields:

- Username
- Password
- Client ID
- Client Secret

Enter these values in Admin → Instance Settings.

---

## Disclaimer

This adapter is **not** affiliated with or supported by AL-KO.  
It is a **community-developed project**.

---

## Changes (Summary)

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

See full changelog here:  
➡ [CHANGELOG_OLD.md](../../CHANGELOG_OLD.md)

Key updates:

- Internal cleanup and consistency improvements
- Improved logging, ID sanitizing and timers
- Documentation restructured

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