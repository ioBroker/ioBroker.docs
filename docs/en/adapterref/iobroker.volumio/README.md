![Logo](admin/volumio.png)
# ioBroker.volumio

[![NPM version](http://img.shields.io/npm/v/iobroker.volumio.svg)](https://www.npmjs.com/package/iobroker.volumio)
[![Downloads](https://img.shields.io/npm/dm/iobroker.volumio.svg)](https://www.npmjs.com/package/iobroker.volumio)
![Number of Installations (latest)](http://iobroker.live/badges/volumio-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/volumio-stable.svg)
[![Dependency Status](https://img.shields.io/david/a-i-ks/iobroker.volumio.svg)](https://david-dm.org/a-i-ks/iobroker.volumio)
[![Known Vulnerabilities](https://snyk.io/test/github/a-i-ks/ioBroker.volumio/badge.svg)](https://snyk.io/test/github/a-i-ks/ioBroker.volumio)

[![NPM](https://nodei.co/npm/iobroker.volumio.png?downloads=true)](https://nodei.co/npm/iobroker.volumio/)

**Tests:** ![Test and Release](https://github.com/a-i-ks/ioBroker.volumio/workflows/Test%20and%20Release/badge.svg)

### Support me
If this adapter has helped you to realise cool automations in your SmartHome and helped you reduce time to develop, you can invite me for a cup of coffee :) 

[![Donate](https://raw.githubusercontent.com/a-i-ks/ioBroker.volumio/master/donate_button.png)](http://paypal.me/iske)

## volumio adapter for ioBroker

Volumio Adapter for ioBroker

This is an adapter for remote controlling a Volumio instance.

### ✨ Version 0.9.0 - Dual API Support

The adapter now supports **two communication modes** with Volumio:

#### 🚀 WebSocket Mode (Recommended - Default)
- **Real-time updates** via Socket.IO
- Immediate state changes without polling
- Lower network overhead
- Automatic reconnection on connection loss
- Perfect for responsive home automation

#### 📡 REST API Mode
- Polling-based state updates (configurable interval)
- Compatible with older Volumio versions
- Optional HTTP push notifications support (deprecated)
- Fallback option for networks where WebSocket is blocked

### 🎛️ Configuration

Choose your preferred API mode in the adapter settings:
- **API Mode**: Select "WebSocket" (recommended) or "REST API"
- **Poll Interval** (REST mode): How often to check for state changes (default: 2 seconds)
- **Reconnection Settings** (WebSocket mode): Configure retry behavior on connection loss

### 🎵 Implemented Functions

* **Playback Control**
    * Play / Pause / Stop
    * Toggle between Play/Pause
    * Next / Previous track
    * Play n-th song from playlist
* **Volume Control**
    * Set to specific value (0-100)
    * Volume step up / down
    * Mute / Unmute
    * Toggle mute
* **Queue Management**
    * Clear queue
* **Playback Options**
    * Random playback (shuffle)
    * Repeat mode
    * Repeat single track
* **State Information**
    * Real-time player state (WebSocket) or polling (REST)
    * Track information (title, artist, album, artwork)
    * System information
    * Connection status

### 📚 API Documentation

This adapter uses the official Volumio APIs:
- **WebSocket API**: https://developers.volumio.com/api/websocket-api
- **REST API**: https://developers.volumio.com/api/rest-api

### 🔮 Planned Features (Future Versions)

- [ ] Browse music library
- [ ] Playlist management (list, create, delete)
- [ ] Search functionality
- [ ] Multi-room audio support


## Changelog
<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 0.9.0 (2025-12-22)
**Major Release - Milestone before 1.0.0**

#### 🎉 New Features
* **Dual API Support**: Choose between WebSocket (real-time) or REST API (polling) mode
* **WebSocket Mode** (NEW - Default):
  - Real-time state updates via Socket.IO
  - Automatic reconnection with configurable retry settings
  - Lower network overhead and better responsiveness
* **REST API Mode** (Enhanced):
  - Improved polling mechanism with configurable interval
  - Better error handling and connection management
* **Client Abstraction Layer**: Clean architecture for API communication
* **Configurable API Settings**:
  - API mode selection in adapter configuration
  - Poll interval for REST mode (default: 2 seconds)
  - Reconnection attempts and delay for WebSocket mode

#### 🔧 Improvements
* Complete refactoring of API communication layer
* Unified interface for both REST and WebSocket clients
* Better connection state management
* Improved error handling across all operations
* Enhanced logging for debugging

#### 📦 Dependencies
* Added `socket.io-client` v4.8.1 for WebSocket support
* Updated all dependencies to latest secure versions
* Migrated to ESLint 9 with @iobroker/eslint-config
* Updated to NPM Trusted Publishing via OIDC

#### 🏗️ Architecture
* New modular client structure:
  - `IVolumioClient` - Common interface
  - `RestVolumioClient` - REST API implementation
  - `WebSocketVolumioClient` - WebSocket implementation
  - `VolumioClientFactory` - Dynamic client creation

#### ⚠️ Deprecations
* HTTP push notifications marked as deprecated (REST-only feature)
* WebSocket mode provides superior real-time updates

#### ✅ Testing
* Added comprehensive unit tests for client implementations
* All 72 tests passing (15 unit tests + 57 package validation tests)
* Build and type-checking successful

### 0.2.0 (2024-05-21)
* (André Iske)
  - Updated to newest ioBroker adapter structure
  - Fixed adapter crashes

### 0.1.3
* (André Iske) Security patches

### 0.1.2
* (André Iske) Minor bug fixes

### 0.1.0
* (André Iske) Complete reworked adapter
    * Switched codebase to typescript
    * Changed License to MIT

### 0.0.1
* (André Iske) initial release

## License
MIT License

Copyright (c) 2024-2026 André Iske <andre.iske@mailbox.org>

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
