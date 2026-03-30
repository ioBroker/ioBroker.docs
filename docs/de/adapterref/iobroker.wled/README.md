---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.wled/README.md
title: ioBroker.wled
hash: ZGr8DVFCltNzqXCLqZuyQfAjFjsiLxvJkqe5kEdcfqo=
---
![Logo](../../../en/adapterref/iobroker.wled/admin/wled_logo_akemi.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.wled.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.wled.svg)
![Anzahl der Installationen](https://iobroker.live/badges/wled-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/wled-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/DrozmotiX/iobroker.wled.svg)
![NPM](https://nodei.co/npm/iobroker.wled.png?downloads=true)

# IoBroker.wled
**Tests:** ![Test und Freigabe](https://github.com/DrozmotiX/iobroker.wled/workflows/Test%20and%20Release/badge.svg)

**Dieser Adapter nutzt den Dienst [Sentry.io](https://sentry.io), um mir als Entwickler automatisch Ausnahmen, Codefehler und neue Geräteschemas zu melden.** Weitere Details finden Sie unten!

## WLED-Adapter für ioBroker
Eine schnelle und funktionsreiche Implementierung eines ESP8266/ESP32-Webservers zur Steuerung von NeoPixel (WS2812B, WS2811, SK6812, APA102)-LEDs oder auch SPI-basierten Chipsätzen wie dem WS2801!

[WLED – GitHub-Projekt](https://github.com/Aircoookie/WLED) von @Aircoookie

## Anweisungen
Der Adapter versucht automatisch, WLED-Geräte in Ihrem Netzwerk mithilfe von Bonjour-Diensten zu finden. Bekannte Probleme: Netzwerke mit VLAN-Trennung leiten Broadcast-Datenverkehr meist nicht weiter, daher schlägt die automatische Erkennung fehl.

Keine Sorge, in diesem Fall können Sie das Gerät manuell über die IP-Adresse hinzufügen.

1) Stellen Sie sicher, dass Ihr WLED-Gerät eingeschaltet und über das Netzwerk erreichbar ist. 2) Installieren Sie den Adapter. 3) Konfigurieren Sie die Intervalle für die Datenabfrage und die automatische Erkennung. 4 - A) Starten Sie den Adapter. Geräte sollten automatisch erkannt werden. 4 - B) Falls A fehlschlägt, verwenden Sie die Schaltfläche „Gerät hinzufügen“ und geben Sie die IP-Adresse des Geräts an. 5) Der Adapter sendet Änderungen sofort und fragt Daten alle x Sekunden ab (konfigurierbar).

## Merkmale
### Kontrollmethoden
Der Adapter bietet vielfältige Möglichkeiten zur Steuerung Ihrer WLED-Geräte:

1. **Standardzustände** - Einzelne Zustände für Helligkeit, Farbe, Effekte usw. verwenden.
2. **JSON-Befehle** – Senden Sie vollständige JSON-Befehle über den `action`-Status für erweiterte Steuerung.
3. **Rohe HTTP-API-Befehle** – Senden von Legacy-HTTP-API-Befehlen über den `rawCommand`-Zustand

### Verwendung von rohen HTTP-API-Befehlen
Für fortgeschrittene Benutzer, die unformatierte HTTP-API-Befehle senden müssen (veralteter Endpunkt `/win`), steht der Status `rawCommand` zur Verfügung:

```javascript
// Example: Set brightness to 255, effect to 0, and colors
setState('wled.0.XXXXXXXXXXXX.rawCommand', 'A=255&FX=0&R=255&G=0&B=0');

// Example: Complex command with multiple parameters
setState('wled.0.XXXXXXXXXXXX.rawCommand', 'SM=0&SS=0&SV=2&S=15&S2=299&GP=7&SP=30&RV=0&SB=255&A=255&W=255&R2=0&G2=0&B2=0&W2=&FX=0&T=1');
```

**Hinweis:** Der Zustand `rawCommand` ist für fortgeschrittene Anwendungsfälle und die Kompatibilität mit der älteren WLED-HTTP-API vorgesehen. Für die meisten Anwendungsfälle werden die Standardzustände oder JSON-Befehle (über den Zustand `action`) empfohlen.

Gängige Rohbefehlsparameter:

- `A` - Masterhelligkeit (0-255)
- `R`, `G`, `B` - RGB-Werte der Primärfarben (0-255)
- `R2`, `G2`, `B2` - RGB-Werte der Sekundärfarbe (0-255)
- `W`, `W2` - Weißkanalwerte (0-255)
- `FX` - Effekt-ID
- `SX` - Effektgeschwindigkeit
- `IX` - Effektintensität
- `FP` - Paletten-ID
- `T` - Übergangszeit

Eine vollständige Liste der Parameter finden Sie in [WLED HTTP-API-Dokumentation](https://kno.wled.ge/interfaces/http-api/).

### Segmentverwaltung über sendTo
Der Adapter bietet leistungsstarke Segmentverwaltungsfunktionen über `sendTo`-Befehle, mit denen Sie Segmente dynamisch zu Ihrem JavaScript-Code hinzufügen und löschen können:

#### Hinzufügen von Segmenten
```javascript
// Add a new segment to a WLED device
sendTo('wled.0', 'addSegment', {
    deviceId: 'AABBCCDDEEFF',  // Device MAC address
    segmentId: 1,              // Segment ID (0-based)
    start: 0,                  // Start LED
    stop: 10,                  // Stop LED (exclusive)
    on: true,                  // Optional: Turn segment on/off
    bri: 255,                  // Optional: Brightness (0-255)
    fx: 0,                     // Optional: Effect ID
    sx: 128,                   // Optional: Effect speed
    ix: 128,                   // Optional: Effect intensity
    pal: 0,                    // Optional: Color palette
    col: [[255,0,0],[0,255,0],[0,0,255]]  // Optional: Colors (RGB arrays)
}, (result) => {
    if (result.success) {
        console.log('Segment added successfully: ' + result.message);
    } else {
        console.error('Failed to add segment: ' + result.error);
    }
});
```

#### Segmente löschen
```javascript
// Delete a segment from a WLED device
sendTo('wled.0', 'deleteSegment', {
    deviceId: 'AABBCCDDEEFF',  // Device MAC address
    segmentId: 1               // Segment ID to delete
}, (result) => {
    if (result.success) {
        console.log('Segment deleted successfully: ' + result.message);
    } else {
        console.error('Failed to delete segment: ' + result.error);
    }
});
```

**Parameter:**

- `deviceId` (erforderlich): Die MAC-Adresse Ihres WLED-Geräts (z. B. 'AABBCCDDEEFF')
- `segmentId` (erforderlich): Die Segment-ID (Nummerierung ab 0)
- Für `addSegment`:
- `start` (optional): Erste LED im Segment, Standardwert 0
- `stop` (optional): Letzte LED im Segment (exklusiv), Standardwert ist 1
- `on` (optional): Segment ein-/ausschalten
- `bri` (optional): Helligkeit (0-255)
- `fx` (optional): Effekt-ID
- `sx` (optional): Effektgeschwindigkeit (0-255)
- `ix` (optional): Effektintensität (0-255)
- `pal` (optional): Farbpaletten-ID
- `col` (optional): Array von RGB-Farbarrays

**Hinweis:** Der Adapter übernimmt die Kommunikation automatisch über WebSocket (sofern verfügbar) oder HTTP-API und aktualisiert den Gerätestatus nach Segmentierungsvorgängen.

## Unterstützt mich
Wenn Ihnen meine Arbeit gefällt, freue ich mich über eine persönliche Spende (dies ist ein persönlicher Spendenlink für DutchmanNL, er steht in keiner Verbindung zum ioBroker-Projekt!). [![Spenden](https://raw.githubusercontent.com/DrozmotiX/ioBroker.wled/main/admin/button.png)](http://paypal.me/DutchmanNL)

Was ist Sentry.io und was wird an die Server dieses Unternehmens gemeldet?
Sentry.io ist ein Dienst, der Entwicklern einen Überblick über Fehler in ihren Anwendungen bietet. Genau dies wird in diesem Adapter implementiert.

Wenn der Adapter abstürzt oder ein anderer Codefehler auftritt, wird diese Fehlermeldung, die auch im ioBroker-Protokoll erscheint, an Sentry übermittelt. Wenn Sie der iobroker GmbH die Erlaubnis erteilt haben, Diagnosedaten zu erfassen, wird auch Ihre Installations-ID (eine eindeutige ID **ohne** weitere Informationen zu Ihrer Person wie E-Mail-Adresse, Name usw.) übermittelt. Dadurch kann Sentry Fehler gruppieren und anzeigen, wie viele Benutzer von einem solchen Fehler betroffen sind. All dies hilft mir, fehlerfreie Adapter bereitzustellen, die praktisch nie abstürzen.

## Für Entwickler
### Automatisierte Bereitstellung
Dieser Adapter nutzt GitHub Actions mit **NPM Trusted Publishing** für die automatisierte Bereitstellung.

Für Wartungsteams, die Bereitstellungsprobleme beheben, siehe [docs/DEPLOYMENT_SETUP.md](docs/DEPLOYMENT_SETUP.md) für:

- Überprüfung der vertrauenswürdigen Veröffentlichungskonfiguration auf npmjs.com
- Erforderliche Workflow- und Jobnameneinstellungen
- Behebung von Authentifizierungsfehlern
- Testbereitstellung mit Vorabversionen

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### __WORK IN PROGRESS__
* (DutchmanNL) **CI/CD**: Fixed deployment failure by adding missing sentry-version-prefix parameter to GitHub Actions workflow
* (DutchmanNL) **CI/CD**: Updated GitHub Copilot instructions template from v0.4.2 to v0.5.6 - adds ESLint configuration, translation management, lint-first CI/CD workflow guidance

### 0.9.2 (2026-02-16)
* (DutchmanNL) solve auto deployment issues

### 0.9.0 (2026-02-15)
* (DutchmanNL) **NEW**: Added segment management via sendTo commands - dynamically add and delete WLED segments
* (DutchmanNL) **NEW**: Added Hue Sync control - synchronize WLED colors with Philips Hue lights (hp state: 0-99, 0=off)
* (DutchmanNL) **NEW**: Added Reboot control - restart WLED device remotely (rb state: boolean button)
* (DutchmanNL) **NEW**: Added Realtime UDP control - toggle reception of realtime UDP data (rd state: boolean switch)
* (DutchmanNL) **NEW**: Added support for sending raw HTTP API commands via `rawCommand` state (fixes #677)
* (DutchmanNL) **FIXED**: Corrected online/offline state detection - `_online` state now properly contains boolean values resolves #654
* (DutchmanNL) **FIXED**: Ensure backend processes and stop when device is deleted in ioBroker object tree (fixes #615)
* (DutchmanNL) **ENHANCED**: Reduced code complexity by extracting validation helpers to separate module (lib/validation.js) #777
* (DutchmanNL) **TESTING**: Added comprehensive unit tests for validation helpers (49 test cases covering edge cases and error handling)
* (DutchmanNL) **CI/CD**: Fixed automated deployment failure by removing unused build step for JavaScript-only adapter

### 0.8.0 (2026-02-15)
* (ticaki) allow sending of raw json from state
* (DutchmanNL) **FIXED**: Implement proper Bonjour browser cleanup in onUnload() to prevent resource leaks
* (DutchmanNL) **CI/CD**: Migrated deployment workflow to NPM Trusted Publishing (OIDC) for enhanced security

### 0.7.3 (2024-10-26)
* (HaggardFFM) allow write on segments, solves #688 #706
* (DutchmanNL) Fixed error when a device is not available Solves #698

### 0.7.2 (2023-10-31) - Improve online visibility of devices
* (DutchmanNL) Show online state of device in object tree
* (DutchmanNL) Bugfix: Update online state correctly in situation connection is lost, fixes #611
* (DutchmanNL) Reset brightness to 0 and on to false during adapter start and if a device disconnects, fixes #565

## License
MIT License

Copyright (c) 2024-2026 DutchmanNL <oss@drozmotix.eu>

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