---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.midas-aquatemp/README.md
title: ioBroker.midas-aquatemp
hash: rOtzxDCLO1xb0up4n/6LQBft3dt06yVrRXcZ148KB4o=
---
![Logo](../../../en/adapterref/iobroker.midas-aquatemp/admin/midas-aquatemp.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.midas-aquatemp.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.midas-aquatemp.svg)
![Anzahl der Installationen](https://iobroker.live/badges/midas-aquatemp-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/midas-aquatemp-stable.svg)
![NPM](https://nodei.co/npm/iobroker.midas-aquatemp.png?downloads=true)

# IoBroker.midas-aquatemp
**Tests: ** ![Test und Freigabe](https://github.com/Miro1310/ioBroker.midas-aquatemp/workflows/Test%20and%20Release/badge.svg)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Informationen und Anweisungen zum Deaktivieren der Fehlerberichterstattung finden Sie in Abschnitt [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Verwendung der Sentry-Berichterstattung beginnt mit js-controller 3.0.

## Midas-aquatemp Adapter für ioBroker
## Dokumentation
### Konfiguration
| Feld | Beschreibung |
|------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Benutzername** | Ihre Linked-Go-Cloud-Konto-E-Mail-Adresse. Es wird dringend empfohlen, ein separates zweites Konto für den Adapter zu erstellen, da gleichzeitige Anmeldungen von anderen Apps zu Konflikten führen können. |
| **Passwort** | Passwort für das Linked-Go-Cloud-Konto. |
| **Aktualisierungsintervall** | Wie oft der Adapter das Gerät nach neuen Daten abfragt (in Sekunden). Der Mindestwert beträgt 60 Sekunden. |
| **API-Ebene** | Die Cloud-API-Version, die zur Kommunikation mit dem Gerät verwendet wird. Beginnen Sie mit **API 3** (Standard). Wenn Ihr Gerät nicht gefunden wird oder Daten fehlen, versuchen Sie es stattdessen mit API 2 oder API 1. |
| **Geräte-MAC** | MAC-Adresse des Geräts, wie sie in der Linked-Go-App angezeigt wird. Nur erforderlich, wenn **Geräte-MAC verwenden** aktiviert ist. |
| **Geräte-MAC verwenden** | Wenn diese Option aktiviert ist, überspringt der Adapter die automatische Geräteerkennung und verbindet sich direkt über die oben genannte MAC-Adresse. Verwenden Sie diese Option, wenn das Gerät nicht über die normale Geräteliste gefunden werden kann. Hinweis: Der Zustand `flowSwitch` ist in diesem Modus möglicherweise nicht auf allen Geräten verfügbar. |
| **Unsicheres TLS zulassen** | Deaktiviert die TLS-Zertifikatsprüfung. **Nur zur Fehlerbehebung – nicht für den normalen Gebrauch empfohlen.** |

Die TLS-Zertifikatvalidierung ist standardmäßig aktiviert. Sie kann nur über die oben genannte Adaptereinstellung **Unsicheres TLS zulassen** deaktiviert werden; wenn sie aktiviert ist, protokolliert der Adapter beim Start eine Warnung.

### Unterstützte Geräte
Die folgenden Geräte funktionieren nachweislich mit diesem Adapter. Andere [Midas](https://www.midas-gmbh.de/) / Poolsana-Geräte, die die Linked-Go Cloud-API verwenden, sind möglicherweise ebenfalls kompatibel, dies kann jedoch nicht garantiert werden.

Falls Ihr Gerät nicht aufgeführt ist, Sie es aber erfolgreich mit diesem Adapter verwendet haben, können Sie gerne ein Issue oder einen Pull Request öffnen, um es hinzuzufügen.

**Funktioniert einwandfrei:**

- Poolsana InverterPro Serie (17, 21) mit WLAN-Adapter für Midas Inverter-Heizgeräte
- Poolsana Prime 8
- XPS-50, 5 kW, COP 5,1, bis zu 16 m³

Bei Problemen kontaktieren Sie uns.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 1.3.3 (2026-07-25)

- FIX: #138 Correct power consumption calculation to handle decimal values
- FIX: #126 Repository checker and Claude Review for latest repro

### 1.3.2 (2026-07-05)

- FIX: Code style and linting issues

### 1.3.1 (2026-06-15)

- FIX: Object Structure Check

### 1.3.0 (2026-06-15)

- FIX: Compatibility with the updated Linked-Go cloud API (API level 3 with new endpoint paths and camelCase parameters)
- FIX: Device discovery now tries both deviceList payload formats (default and legacy) to ensure devices are found
  regardless of API behaviour
- FIX: Numerous control and polling issues (mode, silent mode, set temperature, fault detection)
- FIX: Product-specific protocol codes for Poolsana vs. other devices
- FIX: TLS certificate validation enabled by default; optional insecure mode via adapter config or environment variable
- FIX: Invalid or missing sensor values are no longer written as NaN
- FEAT: Add online state — boolean datapoint that indicates whether the device is currently reachable via the cloud API
- CHORE: Update dependencies

### 1.2.5 (2025-08-02)

- Add size attributes to jsonConfig
- Minimal admin version: 7.4.10
- Breaking change: minimal supported node.js version is 20.x

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2024-2026 MiRo1310 <michael.roling@gmx.de>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.