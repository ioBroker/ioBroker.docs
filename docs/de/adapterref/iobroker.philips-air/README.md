---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.philips-air/README.md
title: ioBroker.philips-air
hash: czNXaH7IM55KRCCAIKNzjIkKYChgIu2vKeJGUh2E1Rw=
---
![Logo](../../../en/adapterref/iobroker.philips-air/admin/philips-air.png)

![Anzahl der Installationen](http://iobroker.live/badges/philips-air-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.philips-air.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.philips-air.svg)

# IoBroker.philips-air
![Test und Freigabe](https://github.com/iobroker-community-adapters/ioBroker.philips-air/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/philips-air/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in Abschnitt [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Philips Luftreiniger-Adapter für ioBroker
Verbindet Philips Luftreiniger und ausgewählte Philips/Versuni Ventilatoren mit ioBroker.

**Getestet mit AC2729 und Philips/Versuni CX3550/01**, sollte aber auch mit neueren Luftreinigern funktionieren, die über lokales CoAP mit Verschlüsselung kommunizieren.

![AC2729](../../../en/adapterref/iobroker.philips-air/img/device.png)

[Link zur Philips-Website](https://www.philips.de/c-m-ho/luftreiniger-und-luftbefeuchter/kombi)

## Verwendung
Es wird lediglich die IP-Adresse des Geräts benötigt. Sie finden diese in Ihrem Router (z. B. `MiCO`).
Es kann vorkommen, dass einige Geräte nicht über alle Variablen verfügen und daher im Objektbaum leer bleiben.

![Objekte](../../../en/adapterref/iobroker.philips-air/img/objects.png)

## Philips/Versuni CX3550/01 Lüfter
Der CX3550/01 wird über die lokale, verschlüsselte CoAP-Verbindung unterstützt. Es wird keine Cloud-API von Philips, Versuni oder HomeID verwendet.

Getestete Funktionen des CX3550/01:

- Ein-/Ausschalten
- Lüfterstufe 1, 2 und 3
- Schlafmodus
- Natürliche Brise
- Oszillation ein/aus
- Piepton ein/aus
- Statusablesung über lokales CoAP
- Timer-Statusanzeige

Die Timersteuerung wird für den CX3550/01 absichtlich nicht unterstützt. Lokale Timer-Schreibvorgänge können dazu führen, dass die Firmware `D03102` auf `0` setzt, wodurch der Lüfter abgeschaltet wird. Der Adapter stellt die Timerinformationen des CX3550/01 daher nur als schreibgeschützten Status bereit.

Weitere Einzelheiten sind in [docs/CX3550.md](docs/CX3550.md) dokumentiert.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.6.1 (2026-07-03)
- (Holly86) Added support for Philips/Versuni CX3550/01 pedestal fan.
- (Holly86) Added CX fan modes, oscillation, beep and read-only timer state.
- (Holly86) Timer control is intentionally not exposed because local timer writes can switch the fan off.

### 1.5.0 (2026-06-24)
- (tt-tom17) CoAP connection now stays stable instead of disconnecting every few minutes
- (tt-tom17) Fixed adapter checker warnings

### 1.4.0 (2026-06-17)
- (tt-tom17) Connection to CoAP and HTTP devices is much more reliable now: several cases that could crash the adapter, freeze the connection or stop it from reconnecting have been fixed
- (tt-tom17) Air quality, filter and on/off values are now shown with the correct type and update reliably
- (tt-tom17) Clearer log messages, including a hint to switch to CoAP when a device does not answer on HTTP
- (tt-tom17) HTTP mode no longer needs the extra "philips-air" package and its outdated dependencies
- (tt-tom17) The device address field now accepts an IP address or a hostname and warns about invalid input
- (tt-tom17) Dependencies updated

### 1.3.0 (2026-06-15)
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
* (mcm1957) Dependencies have been updated

### 1.2.0 (2025-02-10)
* (mcm1957) Adapter requires node.js >= 20, js-controller >= 6 and admin >= 6 now.
* (mcm1957) Adapter migrated to eslint 9 / @iobroker/eslint-config
* (mcm1957) Materialize UI support has been removed
* (mcm1957) jsonConfig responsive design size attributes have been added
* (mcm1957) Dependencies have been updated


[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License


Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2020-2022 ioBroker <dogafox@gmail.com>

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