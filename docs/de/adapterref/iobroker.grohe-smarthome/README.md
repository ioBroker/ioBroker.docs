---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.grohe-smarthome/README.md
title: ioBroker.grohe-smarthome
hash: xuQpHXZ0cxu9gnAZ7DVpyKxx4DYgt1hHsqWrSJ3TMhA=
---
# IoBroker.grohe-smarthome

![NPM-Version](https://img.shields.io/npm/v/iobroker.grohe-smarthome.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.grohe-smarthome.svg)
![Anzahl der Installationen](https://iobroker.live/badges/grohe-smarthome-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/grohe-smarthome-stable.svg)
![NPM](https://nodei.co/npm/iobroker.grohe-smarthome.png?downloads=true)

**Tests:** ![Test und Freigabe](https://github.com/patricknitsch/ioBroker.grohe-smarthome/workflows/Test%20and%20Release/badge.svg)

## IoBroker Grohe Smarthome-Adapter
<img align="left" src="admin/grohe-smarthome.png" alt="Bild" width="200"/>Dieser Adapter verbindet ioBroker mit der <strong>Grohe Smarthome / Ondus</strong> Cloud und stellt Grohe-Geräte als Zustände (und einige Steuerelemente) innerhalb von ioBroker zur Verfügung.

Es unterstützt:

- **Grohe Sense** (Typ `101`)
- **Grohe Sense Guard** (Typ `103`)
- **Grohe Blue Home** (Typ `104`)
- **Grohe Blue Professional** (Typ `105`)

Der Adapter meldet sich über den OIDC/Keycloak-Flow von Grohe an, speichert ein **verschlüsseltes Aktualisierungstoken** in einem Zustand und fragt die Grohe Cloud-API in einem konfigurierbaren Intervall ab.

Ideen und Konzept stammen aus der Smart-Home-Integration **ha-grohe_smarthome**. Besonderer Dank gilt **Flo-Schilli**.

---

## Dokumentation
[🇺🇸 Dokumentation](./docs/en/README.md)

[🇩🇪 Dokumentation](./docs/de/README.md)

---

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.5.4 (2026-05-23)
* (copilot) Add latest Message for Notifications
* (copilot) Add Icons in Notifications

### 0.5.3 (2026-05-21)
* (copilot) Modify notification manager to work with instances
* (copilot) Update Dependencies

### 0.5.2 (2026-05-14)
* (patricknitsch) Fix Header when Device offline
* (patricknitsch) Add Icon and Online State on each Device
* (patricknitsch) Update Readme and Doc

### 0.5.1 (2026-05-09)
* (patricknitsch) Update Admin Dependency >= 7.6.23 for Device Manager
* Important Note: From 0.4.0 to 0.5.X the Sensor Overview is removed but visible. Thats a Bug from js-controller and should be fixed with 7.1.3

### 0.5.0 (2026-05-08)
* (copilot) Integrate Adapter in ioBroker Device Manager
* (copilot) Remove tab

Older entries can be found in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License
MIT License

Copyright (c) 2026 patricknitsch <patricknitsch@web.de>

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