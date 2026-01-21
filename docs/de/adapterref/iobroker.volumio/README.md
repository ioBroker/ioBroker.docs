---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.volumio/README.md
title: ioBroker.volumio
hash: 0vHVTyX+WBHXZeJc4qalwJaA20eNyJgyhR1I2pgwrSU=
---
![Logo](../../../en/adapterref/iobroker.volumio/admin/volumio.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.volumio.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.volumio.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/volumio-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/volumio-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/a-i-ks/iobroker.volumio.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/a-i-ks/ioBroker.volumio/badge.svg)
![NPM](https://nodei.co/npm/iobroker.volumio.png?downloads=true)

# IoBroker.volumio
**Tests:** ![Test und Freigabe](https://github.com/a-i-ks/ioBroker.volumio/workflows/Test%20and%20Release/badge.svg)

### Unterstütze mich
Wenn Ihnen dieser Adapter geholfen hat, coole Automatisierungen in Ihrem Smart Home zu realisieren und Ihre Entwicklungszeit zu verkürzen, können Sie mich gerne auf einen Kaffee einladen :)

[![Spenden](https://raw.githubusercontent.com/a-i-ks/ioBroker.volumio/master/donate_button.png)](http://paypal.me/iske)

## Volumio-Adapter für ioBroker
Volumio-Adapter für ioBroker

Dies ist ein Adapter zur Fernsteuerung einer Volumio-Instanz.

### ✨ Version 0.9.0 – Dual-API-Unterstützung
Der Adapter unterstützt nun **zwei Kommunikationsmodi** mit Volumio:

#### 🚀 WebSocket-Modus (Empfohlen - Standard)
- **Echtzeit-Updates** über Socket.IO
- Sofortige Zustandsänderungen ohne Abstimmung
- Geringerer Netzwerk-Overhead
- Automatische Wiederverbindung bei Verbindungsverlust
- Ideal für reaktionsschnelle Hausautomation

#### 📡 REST-API-Modus
- Statusaktualisierungen per Abfrage (konfigurierbares Intervall)
- Kompatibel mit älteren Volumio-Versionen
- Optionale Unterstützung für HTTP-Push-Benachrichtigungen (veraltet)
- Ausweichoption für Netzwerke, in denen WebSocket blockiert ist

### 🎛️ Konfiguration
Wählen Sie in den Adaptereinstellungen Ihren bevorzugten API-Modus aus:

- **API-Modus**: Wählen Sie „WebSocket“ (empfohlen) oder „REST API“
- **Abfrageintervall** (REST-Modus): Wie oft auf Zustandsänderungen geprüft werden soll (Standard: 2 Sekunden)
- **Wiederverbindungseinstellungen** (WebSocket-Modus): Konfigurieren Sie das Wiederholungsverhalten bei Verbindungsverlust.

### 🎵 Implementierte Funktionen
* **Wiedergabesteuerung**
* Wiedergabe / Pause / Stopp
* Zwischen Wiedergabe/Pause umschalten
* Nächster / Vorheriger Titel
* Spiele den n-ten Song aus der Playlist ab
* **Lautstärkeregelung**
* Auf einen bestimmten Wert (0-100) einstellen
* Lautstärke erhöhen/verringern
* Stummschalten / Stummschaltung aufheben
* Stummschaltung umschalten
* **Warteschlangenmanagement**
* Warteschlange leeren
* **Wiedergabeoptionen**
* Zufallswiedergabe (Shuffle)
* Wiederholungsmodus
* Einzelne Spur wiederholen
* **Staatsinformationen**
* Echtzeit-Spielerstatus (WebSocket) oder Abfrage (REST)
* Trackinformationen (Titel, Interpret, Album, Cover)
* Systeminformationen
* Verbindungsstatus

### 📚 API-Dokumentation
Dieser Adapter verwendet die offiziellen Volumio-APIs:

- **WebSocket-API**: https://developers.volumio.com/api/websocket-api
- **REST-API**: https://developers.volumio.com/api/rest-api

### 🔮 Geplante Funktionen (Zukünftige Versionen)
- [ ] Musikbibliothek durchsuchen
- [ ] Wiedergabelistenverwaltung (Auflisten, Erstellen, Löschen)
- [ ] Suchfunktion
- [ ] Unterstützung für Multiroom-Audio

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

Copyright (c) 2024-2025 André Iske <andre.iske@mailbox.org>

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