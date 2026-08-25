---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.public-transport/README.md
title: ioBroker.public-transport
hash: NIvhmX4QbnCx9cJvbfQvrfSsm74PSRtC8mAhXjEtk04=
---
![Logo](../../../en/adapterref/iobroker.public-transport/admin/iconAdapter.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.public-transport.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.public-transport.svg)
![Anzahl der Installationen](https://iobroker.live/badges/public-transport-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/public-transport-stable.svg)
![NPM](https://nodei.co/npm/iobroker.public-transport.png?downloads=true)

# IoBroker.öffentlicher-transport
**Tests:** ![Test und Freigabe](https://github.com/tt-tom17/ioBroker.public-transport/workflows/Test%20and%20Release/badge.svg)

## ÖPNV-Adapter für ioBroker
Der ÖPNV-Adapter ermöglicht die nahtlose Integration von Echtzeit-Fahrplaninformationen in Ihr ioBroker Smart-Home-System. Mit diesem Adapter können Sie Abfahrtszeiten verschiedener Verkehrsbetriebe in Deutschland, Österreich und anderen Ländern abrufen und für die Automatisierung nutzen.

[🇬🇧 Englische Dokumentation](https://github.com/tt-tom17/ioBroker.public-transport/wiki/en-Home) [🇩🇪 Deutsche Dokumentation](https://github.com/tt-tom17/ioBroker.public-transport/wiki)

## Datenquellen
Der Adapter selbst speichert keine Fahrplandaten – er fragt die Schnittstelle des in den Einstellungen ausgewählten Verkehrsnetzes ab. Es gelten die Nutzungsbedingungen des jeweiligen Betreibers.

<a href="https://www.vrr.de"><img src="admin/vrr-logo.svg" alt="Verkehrsverbund Rhein-Ruhr" height="70" align="left" hspace="12"></a>

**EFA – VRR:** Die Fahrplandaten für die Rhein-Ruhr-Region werden von der [Verkehrsverbund Rhein-Ruhr (VRR)](https://www.vrr.de) über ihre Open Service API bereitgestellt. Die VRR fordert Anwendungen, die diese Schnittstelle nutzen, auf, eine Verbindung zu www.vrr.de herzustellen und ihr Logo anzuzeigen – der Adapter zeigt daher beides in den Instanzeinstellungen an.

<br clear="left">

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.2.0 (2026-08-25)
* (tt-tom17) added EFA as a new backend with VRR (Rhein-Ruhr) as the first network

### 1.1.0 (2026-08-21)
* (tt-tom17) added a "Create detail data points" switch per station and journey. The switch is off by default
* (tt-tom17) fixed the departure widget hiding all multi-word products (S-Bahn, U-Bahn, RE, ICE, ...) whenever the product filter was enabled
* (tt-tom17) the widgets no longer log continuously; set `publicTransportDebug = true` in the browser console to get the diagnostics back

### 1.0.0 (2026-08-08)
* (tt-tom17) migrated the admin configuration GUI to @iobroker/gui-components 10 (React 19, MUI 9); requires admin >= 8.0.1

### 0.10.2 (2026-07-17)
* (tt-tom17) fixed journey and departure channel names showing stale labels after a connection changed
* (tt-tom17) added a "Number of transfers" dropdown per journey (-1 = backend decides, 0 = direct connections only); applies to both HAFAS and MOTIS

### 0.10.1 (2026-07-11)
* (tt-tom17) fixed departure and journey data points being cleared during slow polls (#87)

### 0.10.0 (2026-07-07)
* (tt-tom17) added a configurable time window (duration, in minutes) per station to fetch departures beyond the default 60 minutes (#85)
* (tt-tom17) disabled the "Vendo - Deutsche Bahn" client option, as the db-vendo endpoint currently returns OPS_BLOCKED (#85)
* (tt-tom17) fixed repository checker warnings (#80): translated untranslated admin i18n strings (zh-cn, es)

### 0.9.1 (2026-07-05)
* (tt-tom17) fixed stale data points not being cleared, both after a restart and during operation (#82)

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2025 - 2026 tt-tom17 <tgb@kabelmail.de>

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