---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sma-em/README.md
title: ioBroker.sma-em
hash: f39C/BfrdNVNPF82YqYwoAD1loe0RFmFZOXHKgRakA0=
---
# IoBroker.sma-em
![Logo](../../../en/adapterref/iobroker.sma-em/admin/sma-em.png)

![Anzahl der Installationen](http://iobroker.live/badges/sma-em-installed.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sma-em.svg)
![stabile Version](http://iobroker.live/badges/sma-em-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.sma-em.svg)
![NPM](https://nodei.co/npm/iobroker.sma-em.png?downloads=true)

## IoBroker Adapter für SMA Energy Meter
**Tests:** ![Testen und freigeben](https://github.com/iobroker-community-adapters/iobroker.sma-em/workflows/Test%20and%20Release/badge.svg)

### Die Info
Dieser Adapter liest Informationen von SMA Energy Meter (EMETER-20) und Sunny Home Manager 2 (HM-20).
Es unterstützt das SMA-EMETER-Protokoll-2. Damit funktionieren auch kompatible Energiezähler anderer Hersteller.

SMA Energy Meter und Sunny Home Manager 2 senden sekündlich Datagramme mit ihren Energiemessdaten per Multicast ins Netz.
Der SMA Energy Meter Adapter empfängt diese Multicast-Nachrichten und speichert sie als iobroker-Zustände.
Eine einzelne Instanz des SMA Energy Meter Adapters erkennt alle SMA Energy Meter und Sunny Home Manager in allen angeschlossenen Netzwerken.

![Zustände](../../../en/adapterref/iobroker.sma-em/docs/en/img/overview.png)

### Zustände im nicht erweiterten Modus
- Momentanwerte von Gesamtwirkleistungsaufnahme (pregard) und Wirkleistungseinspeisung (püberschuss)
- Energiezählerwerte Gesamtwirkleistungsbezug (pregardcounter) und Wirkleistungseinspeisung (psurpluscounter)
- SMA Time Tick Zähler, Zeitstempel der letzten empfangenen Nachricht,
- Seriennummer, SUSyID, Softwareversion von SMA Energy Meter und Sunny Home Manager
- Detaillierte Werte für jede der einzelnen Phasen L1 / L2 / L3 (optional):
  - Momentanwerte von Wirkleistungsaufnahme (pregard) und Wirkleistungseinspeisung (püberschuss) pro Phase
  - Energiezählerwerte von Wirkleistungsbezug (pregardcounter) und Wirkleistungseinspeisung (psurpluscounter) pro Phase

### Zustände im erweiterten Modus
Zusätzlich zu den Zuständen im nicht erweiterten Modus stehen im erweiterten Modus die folgenden Werte zur Verfügung

- Momentanwerte der gesamten Blindleistungsaufnahme (qregard) und der Blindleistungseinspeisung (qüberschuss)
- Energiezählerwerte Gesamtblindleistungsbezug (qregardcounter) und Blindleistungseinspeisung (qsurpluscounter)
- Momentanwerte von Gesamtscheinleistungsaufnahme (sregard) und Scheinleistungseinspeisung (ssurplus)
- Energiezählerwerte der gesamten Scheinleistungsaufnahme (sregardcounter) und Scheinleistungseinspeisung (ssurpluscounter)
- cosphi (Leistungsfaktor)
- Netzfrequenz (nur mit Sunny Home Manager 2 verfügbar, SMA Energy Meter liefert derzeit keine Netzfrequenzwerte)
- Detailliert für jede der einzelnen Phasen L1 / L2 / L3 (optional):
  - Momentanwerte der Blind- und Scheinleistungsaufnahme/Einspeisung je Phase
  - Energiezählerwerte der Blind- und Scheinleistungsaufnahme/Einspeisung pro Phase
  - Spannung und Stromstärke pro Phase

### Einstellmöglichkeiten
![Einstellungen](../../../en/adapterref/iobroker.sma-em/docs/en/img/adminpage.png)

- Multicast-IP: Die Standardeinstellung ist 239.12.255.254.
- Multicast-Port: Die Standardeinstellung für den UDP-Port ist 9522.

  (Beide sollten nicht geändert werden, da SMA Geräte immer diese IP-Adresse und diesen Port verwenden)

- Details L1 - L3: Über diese Auswahlmöglichkeiten können Details zu jeder Phase angezeigt werden.
- Erweiterter Modus: Liefert detailliertere Informationen wie Blindleistung, Scheinleistung, cosphi, Netzfrequenz, Spannung, Stromstärke

  (Konfigurieren Sie die Details L1-L3 und den erweiterten Modus nicht gleichzeitig, da dies das ioBroker-System stark belastet.)

<!-- Platzhalter für die nächste Version (am Zeilenanfang):

### __LAUFENDE ARBEIT__ -->
## Rechtliche Hinweise
SMA und Sunny Home Manager sind eingetragene Warenzeichen der SMA Solar Technology AG <https://www.sma.de/de.html>

Alle anderen Warenzeichen sind Eigentum ihrer jeweiligen Inhaber.

Die Autoren werden in keiner Weise von SMA Solar Technology AG oder verbundenen Tochterunternehmen, Logos oder Marken unterstützt oder sind mit ihnen verbunden.

## Changelog
### 0.6.5 (2022-02-19)

- Updated dependencies
- Compatibility check for js-controller 4.0
- Prevent onUnload warnings

### 0.6.4 (2021-08-19)

- (TGuybrush) Bug fixes
- Prevent warnings regarding non-existent objects upon adapter instance creation and start-up under js-controller 3.2.x
- Improved check of SMA Energy Meter multicast messages to prevent ghost devices and warnings regarding unknown OBIS values.

### 0.6.3 (2021-03-04)

- (TGuybrush) The adapter binds now to all external IPv4 addresses.

### 0.6.1-beta.0 (2021-01-18)

- (TGuybrush) Bug fixes
  - Software Version string, last part is the revision as character (e.g. R = release)
  - Potential Warning during the first start
  - Revised units to follow the SI standardization (DIN 1301)
- (TGuybrush) Top level hierarchy object description indicates if the device is a SMA Energy Meter or a SMA Home Manager 2.
- (DutchmanNL) Released to the latest repo, fixed some typo's + news and translations

### 0.6.0

- (TGuybrush) Fixed wrong status information
  - Complete adapter core rewritten to extract the status values by their OBIS value instead of the absolute position in the received UDP message according to the SMA documentation.
  - Improved compatibility to future new OBIS values
- (TGuybrush) Add additional status information
  - Power grid frequency
  - Time tick counter
  - SMA SUSy ID
  - Software Version

- Add a timestamp for each received status information

## License

The MIT License (MIT)

Copyright (c) 2022 IoBroker-Community

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.