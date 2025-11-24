---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.oxxify-fan-control/README.md
title: ioBroker.oxxify-fan-control
hash: VknOEdw6EEXBDF8eU0ziSbKrp02cPIJP3E2G2IVt8XY=
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
Dieser Kanal enthält alle lüfterbezogenen Daten wie Timer, Lüfterdrehzahl, Ein-/Aus-Status und Informationen zum Filterreinigungs-/Austauschintervall. Die Lüfterbetriebsmodi enthalten den numerischen Wert aus dem Kommunikationsprotokoll sowie eine Statusmeldung. Die Werte können nur numerisch eingegeben werden (z. B. 1 für die Heizrückgewinnung). Gleiches gilt für den Timer-Modus und den Lüfterdrehzahl-Modus, der die Werte 1, 2, 3 und 255 für die manuelle Drehzahleinstellung akzeptiert. Die Lüfterdrehzahl für Lüfter 2 ist auf meinen Geräten (Oxxify Pro 50) nicht verfügbar und beträgt entweder 0 U/min im Aus-Zustand oder 1500 U/min im Betrieb. Der andere Wert ändert sich entsprechend der Drehzahl.

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
- Dokumentation verbessern
- Fehlende Datenpunkte implementieren (wie Zeitplan, Schreiben von Netzwerkdaten und Cloud-Steuerung)

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN BEARBEITUNG** -->

## Changelog

### **WORK IN PROGRESS**

- Some dependency work
- Avoid warning messages, if the received protocol does not contain values to update the ioBroker states (Issue #91)

### 0.0.8 (2025-10-16)

- Some dependency work
- Issues from adapter checker fixed

### 0.0.7 (2025-07-01)

- Some dependency work
- Code documentation extended
- Added Node.js 24 to test and release pipeline
- Resending interval of not overtaken values changed from 1,5 seconds to 2,5 seconds
- Changed writable mixed numerical/string values for enums into selectable values, to show available configurations (**breaking change** if already used to remote control fans)
- Rewrite mechanism allows now manual changes within the buttons of the fan, which were overridden by the internal stored value before

### 0.0.6 (2025-04-17)

- Vulnerable dependency updated

### 0.0.5 (2025-03-21)

- Added automatic write retry mechanism for writing values within the fan, as writing with UDP is not very reliable in connection with poor network conditions
- Adapter checker issues fixed

### 0.0.4 (2025-01-31)

- Updated ESLint to 9.x.x
- Fixed copyright issue from adapter checker
- Replaced deletion of all objects with deletion of missing devices from config only
- Avoided illegal characters from user input for fan id within code
- Changed state subscription to all states below the devices folder
- Added restart logic of UDP server in case of an error
- Added adapter terminiation if multiple udp server errors occured
- Replaced cyclic checking of the send quene with a timeout approach instead of interval
- Missing intermediate objects created
- Roles updated according to the read/write definitions
- Polling interval limited in JSON config and code
- ioBroker unit in object tree for RTC date & time removed

### 0.0.3 (2025-01-11)

- Added states for objects with high byte 0x03 with reading and writing
- Recreate device objects on adapter restart
- Simplified methods for writing fan data based on subscribed states
- Added a first unit test for the parsing of numbers.

### 0.0.2 (2025-01-06)

- (N-b-dy) initial release

## License

Copyright (c) 2025 N-b-dy <daten4me@gmx.de>

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