---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.fujitsu-airstage/README.md
title: ioBroker.fujitsu-airstage
hash: TmZqiLJaNZQ5e70yc2ADMC/IowyBzm6Ep+Ruf68VRJ4=
---
![Logo](../../../en/adapterref/iobroker.fujitsu-airstage/admin/fujitsu.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.fujitsu-airstage.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.fujitsu-airstage.svg)
![Anzahl der Installationen](https://iobroker.live/badges/fujitsu-airstage-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/fujitsu-airstage-stable.svg)
![NPM](https://nodei.co/npm/iobroker.fujitsu-airstage.png?downloads=true)
![Test und Freigabe](https://github.com/stefan5232/ioBroker.fujitsu-airstage/workflows/Test%20and%20Release/badge.svg)

# ioBroker.fujitsu-airstage

## Fujitsu Airstage Adapter für ioBroker

Dieser Adapter ermöglicht die Steuerung von Fujitsu Airstage Klimaanlagen über ioBroker. Die Klimaanlagen müssen mit einem WLAN-Modul ausgestattet und im lokalen Netzwerk erreichbar sein.

**Haftungsausschluss** : Dieser Adapter ist ein unabhängiges Community-Projekt und steht in keiner Verbindung zu Fujitsu Limited oder deren Tochtergesellschaften. „Fujitsu“ und „Airstage“ sind eingetragene Marken von Fujitsu Limited. Ihre Verwendung dient ausschließlich der Kennzeichnung kompatibler Geräte. Eine Liste der unterstützten Geräte finden Sie auf der offiziellen [Fujitsu Airstage-Produktseite](https://www.fujitsu-general.com/us/products/split/) .

### Merkmale

- **Vollständige Kontrolle** : Ein-/Ausschalten, Temperatur, Betriebsmodus, Lüftergeschwindigkeit
- **Erweiterte Funktionen** : Leistungsstarker Modus, Sparmodus, Schwenksteuerung (vertikal/horizontal)
- **Statusüberwachung** : Aktuelle Innen-/Außentemperatur, Stromverbrauch, Gerätestatus
- **Zusätzliche Funktionen** : WLAN-LED, Geräuscharmer Modus, Personenerkennung, Energiesparlüfter
- **Mehrere Geräte** : Unterstützung für eine unbegrenzte Anzahl von Klimaanlagen
- **Automatische Aktualisierungen** : Konfigurierbares Abfrageintervall für Statusaktualisierungen

### Anforderungen

- Fujitsu Airstage Klimaanlage mit WLAN-Modul
- Die Klimaanlage muss im lokalen Netzwerk (LAN/WLAN) erreichbar sein.
- IP-Adresse und Geräte-ID (MAC-Adresse) der Klimaanlage

### Installation

Installieren Sie den Adapter über die ioBroker-Admin-Oberfläche.

### Konfiguration

#### Geräte-ID finden

Die Geräte-ID ist die MAC-Adresse des WLAN-Moduls **ohne Doppelpunkte** :

- Beispiel einer MAC-Adresse: `AA:BB:CC:DD:EE:FF`
- Geräte-ID für Adapter: `AABBCCDDEEFF`

Sie können die MAC-Adresse finden:

- In der Fujitsu-App (z. B. FGLair)
- In der Liste der mit Ihrem Router verbundenen Geräte
- Auf einem Aufkleber auf dem WLAN-Modul

#### Ermittlung der IP-Adresse

Sie können die IP-Adresse der Klimaanlage finden:

- In Ihrem Router unter DHCP-Clients
- In der Fujitsu-App unter Gerätedetails

**Empfehlung** : Weisen Sie der Klimaanlage in Ihrem Router eine statische IP-Adresse zu (DHCP-Reservierung).

#### Adaptereinstellungen

1. Öffnen Sie die Adapterkonfiguration in ioBroker.
2. Fügen Sie ein oder mehrere Geräte hinzu:
   - **Name** : Freiformname (z. B. „Wohnzimmer“, „Schlafzimmer“)
   - **IP-Adresse** : Lokale IP-Adresse der Klimaanlage (z. B. 192.168.1.100)
   - **Geräte-ID** : MAC-Adresse ohne Doppelpunkte (z. B. AABBCCDDEEFF)
3. **Abfrageintervall** : Legt fest, wie oft der Status abgefragt wird (Standard: 30 Sekunden).
4. Einstellungen speichern und Instanz starten

### Datenpunkte

Für jedes konfigurierte Gerät werden die folgenden Datenpunkte erstellt:

#### Steuerelement (beschreibbar)

| Datenpunkt           | Typ             | Beschreibung                                                     |
| -------------------- | --------------- | ---------------------------------------------------------------- |
| `power`              | boolescher Wert | Gerät ein-/ausschalten                                           |
| `target_temperature` | Nummer          | Zieltemperatur (16-30°C)                                         |
| `mode`               | Zeichenkette    | Betriebsmodi: Automatik, Kühlen, Heizen, Entfeuchten, Ventilator |
| `fan_speed`          | Zeichenkette    | Lüftergeschwindigkeit: Auto, Leise, Niedrig, Mittel, Hoch        |
| `swing_vertical`     | boolescher Wert | Vertikale Schwingung                                             |
| `swing_horizontal`   | boolescher Wert | Horizontale Schwingung                                           |
| `powerful`           | boolescher Wert | Leistungsstarker Modus (schnelles Aufheizen/Abkühlen)            |
| `economy`            | boolescher Wert | Sparmodus (Energiesparmodus)                                     |
| `fan_ctrl`           | boolescher Wert | Energiesparender Ventilator                                      |
| `outdoor_low_noise`  | boolescher Wert | Geräuscharmer Modus für Außengerät                               |
| `wifi_led`           | boolescher Wert | WLAN-LED ein/aus                                                 |
| `min_heat`           | boolescher Wert | Minimale Heizstufe                                               |

#### Status (schreibgeschützt)

| Datenpunkt             | Typ             | Beschreibung                       |
| ---------------------- | --------------- | ---------------------------------- |
| `current_temperature`  | Nummer          | Aktuelle Raumtemperatur            |
| `outdoor_temperature`  | Nummer          | Außentemperatur                    |
| `power_consumption`    | Nummer          | Kumulierter Energieverbrauch in Wh |
| `vertical_direction`   | Zeichenkette    | Vertikale Luftströmungsrichtung    |
| `vertical_increments`  | Nummer          | Vertikale Luftstrominkremente      |
| `horizontal_direction` | Nummer          | Horizontale Luftströmungsrichtung  |
| `human_detection`      | boolescher Wert | Personenerkennung aktiv            |
| `online`               | boolescher Wert | Gerät erreichbar                   |

### Fehlerbehebung

#### Gerät wird als offline angezeigt

- Überprüfen Sie, ob die IP-Adresse korrekt ist.
- Prüfen Sie, ob die Klimaanlage im Netzwerk erreichbar ist (Ping).
- Prüfen Sie, ob die Geräte-ID korrekt ist (12 Hexadezimalzeichen).
- Stellen Sie sicher, dass keine Firewall die Verbindung blockiert.

#### Befehle werden nicht ausgeführt

- Überprüfen Sie das Protokoll auf Fehlermeldungen.
- Erhöhen Sie den Protokollierungsgrad auf „Debug“, um detaillierte Informationen zu erhalten.
- Stellen Sie sicher, dass die Klimaanlage nicht manuell verriegelt ist.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.2.4 (2026-09-20)
* (S. Bott) Fix `power_consumption` role mismatch with its unit (`value.power.consumed` → `value.energy.consumed`, matching the cumulative Wh value reported by the device)
* (S. Bott) Fix missing `Name`/`Device ID` i18n keys in admin table, and incorrect German placeholder text in 9 non-German languages
* (S. Bott) Fix `info.connection` object name not being corrected on existing installations

### 0.2.3 (2026-08-25)
* (S. Bott) Fix PR review findings: preserve custom object settings on restart, avoid overlapping polling calls, correct state roles
* (S. Bott) Clean up i18n keys in jsonConfig.json and translation files
* (S. Bott) Add link to official Fujitsu Airstage product page in README

### 0.2.2 (2026-07-07)
* (S. Bott) Fix vertical_direction write flag not applied on existing installations

### 0.2.1 (2026-07-07)
* (S. Bott) Fix vertical_direction: make writable to set fixed vane position

### 0.2.0 (2026-07-07)
* (S. Bott) Fix PR review findings: sendCommand, pollInterval validation, i18n, metadata
* (S. Bott) Add news translations for all ioBroker languages
* (S. Bott) Update dependencies, raise admin requirement to >=7.8.23

### 0.1.7 (2026-06-20)
* (S. Bott) Fix installation from GitHub: commit build output to repository

### 0.1.6 (2026-06-19)
* (S. Bott) Fix human_detection_auto_save: set write=true to match role switch
* (S. Bott) Fix repository checker errors (E0036, E5019)

### 0.1.5 (2026-06-14)
* (S. Bott) Fix 'no existing object' warnings when MAC address entered in lowercase
* (S. Bott) Fix typo: info.connected → info.connection

### 0.1.4 (2026-06-14)
* (S. Bott) Fix all repository checker errors and warnings (issue #86)
* (S. Bott) Add missing i18n translations for all languages
* (S. Bott) Add prettier.config.mjs, fix eslint config import
* (S. Bott) Remove redundant devDependencies (@typescript-eslint/*, eslint)
* (S. Bott) Upgrade to TypeScript 6 with required tsconfig migrations
* (S. Bott) Update all dependencies to latest versions

### 0.1.3 (2026-06-14)
* (S. Bott) Resolve all repository checker errors, warnings and suggestions from issue #84
* (S. Bott) Update Node.js requirement to >=22 and GitHub Actions to Node 24.x
* (S. Bott) Update @alcalzone/release-script packages to 5.2.0
* (S. Bott) Update admin dependency to >=7.6.20
* (S. Bott) Restructure README to English-only (ioBroker requirement)
* (S. Bott) Add English translations for jsonConfig
* (S. Bott) Replace setTimeout/setInterval with adapter methods
* (S. Bott) Configure Dependabot with 7-day cooldown
* (S. Bott) Update all dependencies to latest versions

### 0.1.1 (2026-01-03)
* (S. Bott) Fix ioBroker repository checker errors and warnings
* (S. Bott) Update dependencies (axios, sinon, typescript-eslint, etc.)
* (S. Bott) Fix setTimeout memory leak
* (S. Bott) Fix ESLint compatibility with TypeScript ESLint v8

### 0.1.0 (2025-12-31)
* (S. Bott) initial release

## License

MIT License

Copyright (c) 2026 S. Bott <stefan5232@gmx.de>

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