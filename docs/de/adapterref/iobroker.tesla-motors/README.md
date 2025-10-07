---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tesla-motors/README.md
title: ioBroker.tesla-motors
hash: Fvr1aTw0IyZbJ+fLgciBIKNx+41ASXE7fi8j6dPSNfk=
---
![Logo](../../../en/adapterref/iobroker.tesla-motors/admin/tesla-motors.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.tesla-motors.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.tesla-motors.svg)
![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/tesla-motors-installed.svg)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/tesla-motors-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/iobroker-community-adapters/iobroker.tesla-motors.svg)
![NPM](https://nodei.co/npm/iobroker.tesla-motors.png?downloads=true)

# IoBroker.tesla-motors
**Tests:** ![Testen und Freigeben](https://github.com/iobroker-community-adapters/ioBroker.tesla-motors/workflows/Test%20and%20Release/badge.svg)

## Tesla-Adapter für ioBroker
Alle Tesla-Modelle und Powerwalls aus der Tesla-App werden angezeigt und aktualisiert.

**Fernbefehle für Tesla und Powerwall sind verfügbar unter** tesla-motors.0.id.remote

**Anmeldevorgang:**

- Klicken Sie in den Instanzoptionen auf den Authentifizierungslink.
- Geben Sie Ihre Anmeldedaten ein und führen Sie bei Bedarf Captcha/reCaptcha und MFA durch.
- Kopieren Sie auf der Seite „Seite nicht gefunden“ die vollständige URL aus dem Browser und fügen Sie sie in die Instanzoptionen ein. Klicken Sie dann auf „Speichern und schließen“.
- Die ersten Daten werden möglicherweise erst nach der ersten Fahrt angezeigt

**Feldbeschreibung**

- df Fahrer vorne
- Fahrertür hinten
- pf Beifahrer vorne
- pro Beifahrer hinten
- ft Kofferraum vorne
- rechter Kofferraum

[Erklärung der Optionscodes](https://tesla-api.timdorr.com/vehicle/optioncodes)

## Fragen und Diskussionen:
https://forum.iobroker.net/topic/47203/test-tesla-motors-v1-0-0

## Changelog

<!-- ### **WORK IN PROGRESS** -->
### 1.4.5 (2024-04-19)

- cleaned up token folder to reduce state objects

### 1.4.4 (2024-04-10)

- improve energy history data

### 1.4.3 (2024-04-10)

- fix for too many state in the powerwall energy history

### 1.4.2 (2023-11-17)

- fix km states are not refreshed

### 1.4.1 (2023-11-17)

- fix \_km states are not refreshed

### 1.4.0 (2023-11-14)

- fix location fetching and add new option to change location fetching interval

### 1.3.5 (2023-10-24)

- fix vehicle update

### 1.3.4 (2023-10-24)

- add wall_connector devices

### 1.3.4-alpha.0 (2023-10-18)

- (mcm1957) Standard iobroker release environment has been added.
- (mcm1957) Some dependencies have been updated.

### 1.3.2

- Create history elements by index not by date

### 1.3.1

- login url and ordered car fix

### 1.0.2

- (iobroker-community-adapters) ALL DATA POINTS ARE NEW, Vis must be adapted. New version with new states for Tesla and Powerwalls.

## License

MIT License

Copyright (c) 2021-2029 iobroker-community

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