---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.oxxify-fan-control/README.md
title: ioBroker.oxxify-Lüftersteuerung
hash: DNu+6Wzxb0lqxbKo9ktggF/NVrn1b0oB7dW3GBFE+qk=
---
![NPM-Version](https://img.shields.io/npm/v/iobroker.oxxify-fan-control.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.oxxify-fan-control.svg)
![Knoten-lts](https://img.shields.io/node/v-lts/iobroker.oxxify-fan-control)
![Libraries.io-Abhängigkeitsstatus für die neueste Version](https://img.shields.io/librariesio/release/npm/iobroker.oxxify-fan-control?label=npm%20dependencies)
![Anzahl der Installationen](https://iobroker.live/badges/oxxify-fan-control-installed.svg)
![NPM](https://nodei.co/npm/iobroker.oxxify-fan-control.png?downloads=true)
![Beta](https://img.shields.io/npm/v/iobroker.oxxify-fan-control.svg?color=red&label=beta)
![Stabil](http://iobroker.live/badges/oxxify-fan-control-stable.svg)

<img src="admin/oxxify-fan-control.png" width="80">

# IoBroker.oxxify-fan-control
**Tests:** ![Testen und Freigeben](https://github.com/N-b-dy/ioBroker.oxxify-fan-control/workflows/Test%20and%20Release/badge.svg)

## Oxxify-fan-control-Adapter für ioBroker
Integrieren Sie Ihre Oxxify-Ventilatoren in Ihr Smart Home. Alle bereitgestellten ioBroker-Datenpunkte basieren auf dem unter [Hier](./doc/BDA_Anschluss_SmartHome_RV_V2.pdf) beschriebenen Kommunikationsprotokoll. Da andere Hersteller dasselbe Protokoll verwenden (z. B. Blauberg-Ventile), ist es sehr wahrscheinlich, dass diese ebenfalls funktionieren.

## Funktionierende Geräte
- Oxxify smart 50 (von mir getestet)
- Jedes andere Oxxify-Gerät mit WLAN
- Blauberg Vents (sollte vorhanden sein, noch nicht getestet)

### Objektbaumbeschreibung
Der Objektbaum enthält den Ordner „devices“, der für jeden konfigurierten Lüfter einen Eintrag erstellt. Die darunterliegenden Kanäle werden mit der eindeutigen Lüfter-ID erstellt, die vom Hersteller vergeben wird. In der Spalte „Name“ wird der Eintrag aus der Konfiguration verwendet, um die Lüfter besser unterscheiden zu können. Unter jedem Lüfter werden vier Kanäle angelegt, um die pro Lüfter bereitgestellten Daten zu gruppieren. Diese werden wie folgt erklärt:

#### Fandaten
Dieser Kanal enthält alle lüfterbezogenen Daten wie Timer, Lüftergeschwindigkeit, Ein-/Aus-Zustand und Informationen zum Filterreinigungs-/-wechselintervall. Die Lüfterbetriebsarten enthalten den numerischen Wert aus dem Kommunikationsprotokoll sowie einen sprechenden String-Status. Die Werte können nur als Zahl angegeben werden (z. B. eine 1 für die Wärmerückgewinnung). Gleiches gilt für den Timer-Modus und den Lüftergeschwindigkeitsmodus, der die Werte 1, 2, 3 und 255 für die manuelle Geschwindigkeitseinstellung akzeptiert. Die Lüftergeschwindigkeit für Lüfter 2 ist bei meinen Geräten (Oxxify pro 50) nicht verfügbar und bleibt entweder bei 0 U/min im ausgeschalteten Zustand oder bei 1500 U/min in jedem Betriebszustand. Der andere Wert ändert sich je nach Geschwindigkeit.

![Bild](../../../en/adapterref/iobroker.oxxify-fan-control/doc/screenshots/fan-data.png)

#### Netzwerkdaten
Die Netzwerkdaten sind aktuell nur lesbar, das Schreiben/Ändern von Werten ist hier noch nicht implementiert und kann über die App des Herstellers erfolgen. Gleiches gilt für den Kontrollzustand des Cloud-Servers.

![Bild](../../../en/adapterref/iobroker.oxxify-fan-control/doc/screenshots/network-data.png)

#### Sensordaten
Die Dateneingabe für die Sensoren erfolgt wie im Protokoll definiert. Der analoge Spannungswert wird wie im Protokoll definiert in % angegeben. Da ich keine Anschlüsse an den Analog- und Relaissensor habe, kann ich nicht wirklich testen, was passiert, wenn man sie aktiviert.

![Bild](../../../en/adapterref/iobroker.oxxify-fan-control/doc/screenshots/sensors-data.png)

#### Systemdaten
Dieser Kanal enthält Systemdaten zur Hardware und Firmware sowie Laufzeit, RTC-Batteriespannung und Datum/Uhrzeit. Hier können Alarme zurückgesetzt und die RTC-Zeit basierend auf dem konfigurierten NTP-Server eingestellt werden. Meiner Erfahrung nach kann es vorkommen, dass nach einer RTC-Zeitsynchronisierung die neuen (richtigen) Werte nicht sofort sichtbar sind und es bis zur nächsten Datenabfrage dauert.

![Bild](../../../en/adapterref/iobroker.oxxify-fan-control/doc/screenshots/system-data.png)

## Aufgaben
- Implementierung weiterer Tests
- Dokumentation verbessern
- Implementierung fehlender Datenpunkte (wie Zeitplan, Schreiben von Netzwerkdaten und Cloud-Steuerung)

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN ARBEIT** -->

## Changelog

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