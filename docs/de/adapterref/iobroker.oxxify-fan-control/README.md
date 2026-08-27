---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.oxxify-fan-control/README.md
title: ioBroker.oxxify-fan-control
hash: 2k/jKLDycTp3mwUAN4g6BhXFjPT5glD8iybdDBgPLgc=
---
![NPM-Version](https://img.shields.io/npm/v/iobroker.oxxify-fan-control.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.oxxify-fan-control.svg)
![node-lts](https://img.shields.io/node/v-lts/iobroker.oxxify-fan-control)
![Libraries.io-Abhängigkeitsstatus für die neueste Version](https://img.shields.io/librariesio/release/npm/iobroker.oxxify-fan-control?label=npm%20dependencies)
![Anzahl der Installationen](https://iobroker.live/badges/oxxify-fan-control-installed.svg)
![NPM](https://nodei.co/npm/iobroker.oxxify-fan-control.png?downloads=true)
![Beta](https://img.shields.io/npm/v/iobroker.oxxify-fan-control.svg?color=red&label=beta)
![Stabil](http://iobroker.live/badges/oxxify-fan-control-stable.svg)

<img src="admin/oxxify-fan-control.png" width="80">

# IoBroker.oxxify-Lüftersteuerung
**Tests:** ![Test und Freigabe](https://github.com/N-b-dy/ioBroker.oxxify-fan-control/workflows/Test%20and%20Release/badge.svg)

## Oxxify-Lüftersteuerungsadapter für ioBroker
Integrieren Sie Ihre Oxxify-Ventilatoren in Ihr Smart Home. Alle bereitgestellten ioBroker-Datenpunkte basieren auf dem in Abschnitt [Hier](./doc/BDA_Anschluss_SmartHome_RV_V2.pdf) beschriebenen Kommunikationsprotokoll. Da auch andere Hersteller dasselbe Protokoll verwenden (z. B. Blauberg-Lüfter), ist die Wahrscheinlichkeit hoch, dass sie ebenfalls funktionieren.

## Funktionierende Geräte
- Oxxify Smart 50 (von mir getestet)
- Jedes andere Oxxify-Gerät mit WLAN
- Blauberg Vents und andere mit demselben Protokoll (die folgenden funktionieren)
- Blauberg D180 S21
- Vento Expert A50-1 S10 W V.2

### Objektbaumbeschreibung
Die Objektstruktur enthält den Ordner „Geräte“, in dem für jeden konfigurierten Lüfter ein Eintrag erstellt wird. Die darunterliegenden Kanäle werden mit der eindeutigen Lüfter-ID des Herstellers angelegt. In der Spalte „Name“ wird der Eintrag aus der Konfiguration verwendet, um die Lüfter besser zu unterscheiden. Unterhalb jedes Lüfters werden vier Kanäle erstellt, um die pro Lüfter bereitgestellten Daten zu gruppieren. Diese werden im Folgenden erläutert:

#### Lüfterdaten
Dieser Kanal enthält alle lüfterbezogenen Daten wie Timer, Lüfterdrehzahl, Ein-/Aus-Status und Informationen zum Filterreinigungs-/Austauschintervall. Die Betriebsmodi des Lüfters enthalten den numerischen Wert aus dem Kommunikationsprotokoll sowie eine Statusmeldung. Die Werte können nur numerisch eingegeben werden (z. B. 1 für die Heizrückgewinnung). Gleiches gilt für den Timer-Modus und den Drehzahlmodus, der die Werte 1, 2, 3 und 255 für die manuelle Drehzahleinstellung akzeptiert. Die Drehzahl für Lüfter 2 ist auf meinen Geräten (Oxxify Pro 50) nicht verfügbar und beträgt entweder 0 U/min im Aus-Zustand oder 1500 U/min im Betrieb. Der andere Wert ändert sich entsprechend der Drehzahl.

![Bild](../../../en/adapterref/iobroker.oxxify-fan-control/doc/screenshots/fan-data.png)

#### Netzwerkdaten
Die Netzwerkdaten sind derzeit schreibgeschützt; das Schreiben/Ändern von Werten ist noch nicht implementiert und kann über die App des Herstellers erfolgen. Gleiches gilt für den Steuerungsstatus des Cloud-Servers.

![Bild](../../../en/adapterref/iobroker.oxxify-fan-control/doc/screenshots/network-data.png)

#### Sensordaten
Die Dateneingaben für die Sensoren sind gemäß Protokoll implementiert. Der analoge Spannungswert wird, wie im Protokoll definiert, in Prozent angegeben. Da ich weder den analogen Sensor noch den Relais-Sensor angeschlossen habe, kann ich nicht testen, was passiert, wenn man sie aktiviert.

![Bild](../../../en/adapterref/iobroker.oxxify-fan-control/doc/screenshots/sensors-data.png)

#### Systemdaten
Dieser Kanal enthält Systemdaten zur Hardware und Firmware sowie Laufzeitdaten, RTC-Batteriespannung und Datum/Uhrzeit. Hier können Alarme zurückgesetzt und die RTC-Zeit anhand des konfigurierten NTP-Servers eingestellt werden. Erfahrungsgemäß kann es vorkommen, dass nach einer RTC-Zeitsynchronisierung die neuen (korrekten) Werte nicht sofort sichtbar sind, sondern erst nach der nächsten Datenabfrage.

![Bild](../../../en/adapterref/iobroker.oxxify-fan-control/doc/screenshots/system-data.png)

## Aufgaben
- Weitere Tests implementieren
- Fehlende Datenpunkte implementieren (wie Zeitplan, Schreiben von Netzwerkdaten und Cloud-Steuerung)

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN BEARBEITUNG** -->

## Changelog
### 0.0.15 (2026-05-05)

- Security vulnerabilities fixed (#141)

### 0.0.14 (2026-05-05)

- Added missing JSDoc comments
- (copilot) Adapter requires node.js >= 22 now
- Warning [W5039] fixed

### 0.0.13 (2026-04-08)

- Auto PRs merged
- Fixing other deployment issues...

### 0.0.12 (2026-04-06)

- Deploy workflow changed from "npm install" to "npm ci"

### 0.0.11 (2026-04-06)

- TypeScript updated to 6.0
- Some dependency work

## License

Copyright (c) 2025-2026 N-b-dy <daten4me@gmx.de>

                    GNU GENERAL PUBLIC LICENSE
                       Version 3, 29 June 2007

### Disclaimer of Warranty.

THERE IS NO WARRANTY FOR THE PROGRAM, TO THE EXTENT PERMITTED BY
APPLICABLE LAW. EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT
HOLDERS AND/OR OTHER PARTIES PROVIDE THE PROGRAM "AS IS" WITHOUT WARRANTY
OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO,
THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM
IS WITH YOU. SHOULD THE PROGRAM PROVE DEFECTIVE, YOU ASSUME THE COST OF
ALL NECESSARY SERVICING, REPAIR OR CORRECTION.

### Limitation of Liability.

IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING
WILL ANY COPYRIGHT HOLDER, OR ANY OTHER PARTY WHO MODIFIES AND/OR CONVEYS
THE PROGRAM AS PERMITTED ABOVE, BE LIABLE TO YOU FOR DAMAGES, INCLUDING ANY
GENERAL, SPECIAL, INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE
USE OR INABILITY TO USE THE PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF
DATA OR DATA BEING RENDERED INACCURATE OR LOSSES SUSTAINED BY YOU OR THIRD
PARTIES OR A FAILURE OF THE PROGRAM TO OPERATE WITH ANY OTHER PROGRAMS),
EVEN IF SUCH HOLDER OR OTHER PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF
SUCH DAMAGES.