---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.controme/README.md
title: ioBroker.control
hash: xmYok2X8iUdUdS8sgIwcr1Pp5ueo2SW3ybxGWddh3Ls=
---
![Logo](../../../en/adapterref/iobroker.controme/admin/controme.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.controme.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.controme.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/controme-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/controme-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/MadErstam/iobroker.controme.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/MadErstam/ioBroker.controme/badge.svg)
![NPM](https://nodei.co/npm/iobroker.controme.png?downloads=true)

# IoBroker.control
**Tests:** ![Testen und Freigeben](https://github.com/MadErstam/ioBroker.controme/workflows/Test%20and%20Release/badge.svg)

## IoBroker-Adapter für Controme Mini-Server
Stellen Sie mithilfe der offiziellen API eine Verbindung zum lokalen Controme-Miniserver her.

Controme ist ein Heizungssteuerungssystem, mit dem Sie Ihre Fußbodenheizung, Zentralheizung, Heizkörper oder andere Klimatisierungsgeräte steuern können. Das Herzstück des Controme Smart-Heat-Systems ist der Controme Mini-Server, ein lokales Raspberry-Pi-basiertes System. Weitere Informationen zum Controme Smart-Heat-System finden Sie im [Controme-Website](https://www.controme.com/).

Der Adapter liest regelmäßig die Raumtemperaturen vom Mini-Server und ermöglicht die Einstellung der Solltemperaturen auf dem Server über ioBroker. Um diesen Adapter zu verwenden, muss Controme die API aktivieren. Der Adapter ersetzt nicht die Controme-Benutzeroberfläche, sondern bietet grundlegende Daten und Funktionen zur Integration von Controme in andere Smart-Home-Geräte und -Dienste.

Der Adapter stellt für jeden in der Controme-Benutzeroberfläche definierten Raum die folgenden Daten bereit:

| Objekt | Typ | Beschreibung | Lesen/Schreiben |
| --- | --- | --- | --- |
| Raum-ID | Gerät | Jeder Raum wird mit seiner Controlle-Raum-ID und dem Raumnamen als Gerätenamen dargestellt. | |
| roomID.actualTemperature | state | Die tatsächliche Temperatur des Raumes mit der Rolle level.temperature. Dieser Status ist schreibgeschützt. Wenn für einen bestimmten Raum kein Raumtemperatursensor definiert ist, ist die vom Controme Mini-Server zurückgegebene tatsächliche Temperatur null. | lesen |
| roomID.humidity | state | Die Luftfeuchtigkeit des Raumes mit der Rolle level.humidity. Dieser Status ist schreibgeschützt. Wenn der Raumsensor keine Luftfeuchtigkeit erkennt, ist dieser Status null. | lesen |
| roomID.setpointTemperature | Status | Die Ziel-/Solltemperatur des Raums mit der Rolle value.temperature. | Lesen/Schreiben |
| roomID.setpointTemperaturePerm | Status | Die permanente Ziel-/Solltemperatur des Raums mit der Rolle value.temperature. | Lesen/Schreiben |
| roomID.temperatureOffset | Status | Die Offset-Temperatur des Raumes, um die die Sensormessungen von der tatsächlichen Raumtemperatur abweichen. Der Temperatur-Offset-Wert kann manuell in der Controme-Benutzeroberfläche eingestellt werden und wird zusätzlich von verschiedenen Controme-Modulen berechnet. | lesen |
| roomID.mode | state | Beschreibt den Betriebsmodus des Raumes, z.B. „Heizen“. | lesen |
| roomID.is_temporary_mode | Status | Zeigt an, dass vorübergehende Änderungen an der Solltemperatur wirksam sind. | lesen |
| roomID.temporary_mode_end | Status | Wenn für den Raum ein temporärer Modus aktiv ist, gibt dieser Status an, wann der temporäre Status endet. Wenn kein temporärer Status aktiv ist, ist dieser Status null. | lesen |
| roomID.temporary_mode_remaining | Status | Wenn für den Raum ein temporärer Modus aktiv ist, gibt dieser Status die verbleibenden Sekunden an, die der temporäre Zustand aktiv ist. Ist kein temporärer Zustand aktiv, ist dieser Status null. Änderungen an diesem Status werden an Controme zurückgemeldet und ändern die verbleibende Zeit für den temporären Modus mit der im Status „setpointTemperate“ definierten Solltemperatur. | Lesen/Schreiben |
| roomID.offsets | Kanal | Offsets werden zur Soll-Raumtemperatur addiert oder davon subtrahiert. Dieser Kanal fasst alle Offsets zusammen, die zum jeweiligen Raum gehören. | |
| roomID.offsets.[OFFSET-GROUP] | Kanal | Jede Offset-Quelle wird durch einen dedizierten Kanal innerhalb des Offset-Kanals des Raums dargestellt, zu dem der Offset gehört. | |
| roomID.offsets.[OFFSET-GROUP].[OFFSET] | Status | Die einzelnen Offset-Status stellen die verschiedenen Anpassungen dar, die vom Controme-Miniserver vorgenommen werden. | lesen |
| roomID.offsets.api | Kanal | Diese Offset-Gruppe ist etwas Besonderes, da ihre Zustände beschrieben werden können und sie zum Bearbeiten des tatsächlichen Raum-Offsets verwendet werden können. | |
| roomID.offsets.api.api | Status | Dieser Offset-Status wird standardmäßig vom Adapter erstellt. Sie können ihn verwenden, um die tatsächlichen Raum-Offsets zu manipulieren. Die Offset-Werte werden alle 10 Minuten vom Server zurückgesetzt. | Lesen/Schreiben |
| roomID.sensors | channel | Sensoren liefern die aktuellen Messwerte des Raumes. Dieser Kanal fasst alle dem jeweiligen Raum zugeordneten Sensoren zusammen. | |
| roomID.sensors.[SENSOR-ID] | Gerät | Jeder Sensor wird durch ein Gerät innerhalb des Sensorkanals des Raums dargestellt, dem er zugewiesen ist. | |
| roomID.sensors.[SENSOR-ID].isRoomTemperatureSensor | Status | Dieser boolesche Status gibt an, ob ein Sensor als Raumtemperatursensor verwendet wird. Pro Raum kann nur ein einziger Sensor als Raumtemperatursensor verwendet werden. | lesen |
| roomID.sensors.[SENSOR-ID].actualTemperature | Status | Dieser Status repräsentiert die vom Sensor gemessene aktuelle Temperatur. Der Status ist Lesen/Schreiben, aber nur 1Wire-Sensoren oder virtuelle Sensoren akzeptieren die bereitgestellten Werte. Wenn Sie einen Wert an einen realen Sensor schreiben, wird dieser beim nächsten Lesen überschrieben. | Lesen/Schreiben |
| roomID.outputs | channel | Ausgänge steuern typischerweise Ventile, die die Heizung des Raumes regeln. Dieser Kanal fasst alle dem jeweiligen Raum zugeordneten Ausgänge zusammen. | |
| roomID.outputs.[OUTPUT-ID] | Status | Jeder Ausgang wird durch einen Status innerhalb des Ausgangskanals des zugehörigen Raums repräsentiert. Die Ausgangs-ID entspricht der Nummer des Ausgangs am Gateway. | lesen |
| GatewayMAC | Gerät | Jedes Gateway wird mit seiner MAC-Adresse und dem Gateway-Namen als Gerätenamen dargestellt. | |
| gatewayMAC.gatewayType | Status | Der Typ des Gateways. Derzeit gibt es vier Kontroll-Gateways: Floor Gateway Smart, Floor Gateway Pro, Universal Gateway Mini, Universal Gateway Pro. | lesen |
| gatewayMAC.isUniversal | Status | Gibt an, ob das Gateway eines der universellen Gateways ist. Daten von universellen Gateways müssen auf andere Weise abgefragt werden. |
| gatewayMAC.outputs | Kanal | Ausgänge steuern typischerweise Ventile, die die Raumheizung für Etagengateways oder Geräte im Heizraum (Pumpen, Ventile) steuern. Dieser Kanal gruppiert alle Ausgänge des jeweiligen Gateways. | lesen |
| gatewayMAC.outputs.[OUTPUT-ID] | Status | Jeder Ausgang wird durch einen Status innerhalb des Ausgangskanals des Gateways repräsentiert, dem er zugeordnet ist. Die Ausgangs-ID entspricht der in der Konfiguration festgelegten Ausgangsnummer des Gateways. | lesen |

Die [API-Dokumentation](https://support.controme.com/api/) finden Sie auf der Controme-Website.

Um den Adapter zu starten, müssen auf der Admin-Einstellungsseite für die Adapterinstanz folgende Daten angegeben werden:

| Datenfeld | Typ | Beschreibung |
| --- | --- | --- |
| URL | Text | Die URL des Controme-Miniservers. Kann entweder die IP-Adresse oder der Name sein. |
| Haus-ID | Nummer | Die ID der Controme-Installation. Laut API-Dokumentation sollte diese entweder 1 oder 2 sein. |
| Intervall | Zahl | Das Intervall in Sekunden, in dem die Daten vom Server abgefragt werden. Dieser Wert sollte zwischen 15 Sekunden und 3600 Sekunden liegen. Zu niedrige Werte sind nicht sinnvoll, da Controme die Sensorwerte nur alle 3-5 Minuten aktualisiert. |
| forceReInit | Kontrollkästchen | Wenn dieses Kontrollkästchen aktiviert ist, bereinigt Controme die Objektstruktur in der ioBroker-Datenbank und lädt die Räume neu vom Server. Diese Einstellung ist nur erforderlich, wenn sich die Raumstruktur auf dem Controme-Server ändert. |
| warnOnNull | Kontrollkästchen | Wenn dieses Kontrollkästchen aktiviert ist, schreibt der Adapter Warnungen ins Protokoll, wenn ein Sensor einen NULL-Wert zurückgibt. Die Rückgabe von NULL-Werten ist bei Fenstersensoren normal, würde aber bei Temperatursensoren auf ein Verbindungsproblem hinweisen. Die API erlaubt keine Unterscheidung zwischen |
| Benutzername | Text | Der Benutzername für den Zugriff auf die Controme-API. Dies ist normalerweise der Benutzername des Hauptbenutzers von Controme. |
| Passwort | Passwort | Das Passwort des Benutzers für den Zugriff auf die Control-API. Dieses Passwort ist verschlüsselt. |
| Gateways | Tabelle | Alle Gateways, für die der Adapter die Daten abfragen soll, müssen mit drei Werten konfiguriert werden: |
| gateways.gatewayMAC | Zeichenfolge | Die MAC-Adresse des einzelnen Gateways. |
| gateways.type | string | Der Typ des jeweiligen Gateways. Kann entweder Floor Gateway Smart/Pro, Universal Gateway Mini oder Universal Gateway Pro sein. |
| gateways.name | string | Der Name des jeweiligen Gateways. |
| gatewayOutputs | Tabelle | Alle Ausgänge aller Gateways, für die der Adapter die Daten abfragen soll, müssen mit drei Werten konfiguriert werden: |
| gatewayOutputs.gatewayMAC | string | Die MAC-Adresse des jeweiligen Gateways. Diese muss mit einem der in der Gateway-Tabelle konfigurierten GatewayMAC-Werte übereinstimmen. Bitte beachten Sie, dass der Adapter derzeit nicht überprüft, ob die Gateway-MAC-Adressen mit den in der Gateway-Tabelle konfigurierten übereinstimmen. Achten Sie daher darauf, dass die Gateway-MAC-Adressen in beiden Tabellen übereinstimmen. |
| gatewayOutputs.outputID | Zahl | Die Output-ID des jeweiligen Gateways, das abgefragt werden soll. Bei Mini-Gateways muss diese Zahl zwischen 1 und 8 liegen, bei anderen Gateways zwischen 1 und 15. |
| gatewayOutputs.outputName | string | Der Name des jeweiligen Ausgangs des Gateways. |

## Aufgaben
1. (in Bearbeitung) Testen, testen, testen
2. Adapter nach gründlichen Tests stabil freigeben

## Bugs kennen
1. ...

## Changelog
<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 0.5.7 (2025-02-22)
* (MadErstam) Made adapter safe to handle different versions of API
* (MadErstam) Switched from got to axios for future compatibility

### 0.5.6 (2025-02-21)
* (MadErstam) Bugfixing regarding invalid API responses or invalid sensor values

### 0.5.5 (2025-02-20)
* (MadErstam) Bugfixing regarding async and promise

### 0.5.4 (2025-02-15)
* (MadErstam) Made sensor names safe
* (MadErstam) Bugfixing in getOutputs

### 0.5.3 (2024-11-27)
* (MadErstam) Various smaller bugfixes and improvements

### 0.5.2 (2024-11-25)
* (MadErstam) Make object IDs for offsets safe

### 0.5.1 (2024-11-06)
* (MadErstam) Minor bugfixing

### 0.5.0 (2024-11-05)
* (MadErstam) Added handling of temporary mode
* (MadErstam) Conducted code refactoring to improve readability and maintainability
* (MadErstam) Again moved admin translations to make it compatible with automatic translations

### 0.4.7 (2024-11-04)
* (MadErstam) Moved admin translations to separate files

### 0.4.6 (2024-11-04)
* (MadErstam) Added translations of admin form to Ukrainian

### 0.4.5 (2024-11-03)
* (MadErstam) Fixed remaining warnings of automated adapter checker

### 0.4.4 (2024-11-03)
* (MadErstam) Cleaned up warnings of automated adapter checker

### 0.4.3 (2024-11-03)
* (MadErstam) Cleaned up errors of automated adapter checker

### 0.4.2 (2024-11-02)
* (MadErstam) Preparations for adapter package release

### 0.4.1 (2024-11-02)
* (MadErstam) Preparations for adapter package release

### 0.4.0 (2024-10-31)
* (MadErstam) Extended api calls to include humidity and temporary mode states
* (MadErstam) Changed dependencies

### 0.3.4-alpha.2 (2022-06-01)
* (MadErstam) Added validation of setTargetTemp, setSetpointTemp, setActualTemp, setOffsetTemp values
* (MadErstam) Changed dependencies
* (MadErstam) Cleaning up

### 0.3.4-alpha.1 (2022-04-25)
* (MadErstam) Prepare for release

### 0.3.4-alpha.0 (2022-04-25)
* (MadErstam) Prepare for release

### 0.3.3 (2022-04-25)
* (MadErstam) Updated dependencies

### 0.3.2 (2022-04-25)
* (MadErstam) Prepare for release

### 0.3.1 (2022-04-25)
* (MadErstam) Cleaning up adapter, bugfixing, extended readme

### 0.3.0
* (MadErstam) Extended API polling (outputs, gateways)

### 0.2.4
* (MadErstam) Bugfixing

### 0.2.3
* (MadErstam) Bugfixing

### 0.2.2
* (MadErstam) Bugfixing in offset handling

### 0.2.1
* (MadErstam) Improved offset handling

### 0.2.0
* (MadErstam) Added sensors and offsets

### 0.1.2
* (MadErstam) Preparations for adapter package release

### 0.1.1
* (MadErstam) Minor bug fixes

### 0.1.0
* (MadErstam) initial release

## License
Copyright (c) 2025 MadErstam <erstam@gmx.de>

MIT License

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