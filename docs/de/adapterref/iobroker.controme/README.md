---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.controme/README.md
title: ioBroker.controme
hash: Kl/bgmgRYmT6Id3fx1sljMnwMwBeQWOP70hm9v7xiCA=
---
![Logo](../../../en/adapterref/iobroker.controme/admin/controme.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.controme.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.controme.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/controme-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/controme-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/MadErstam/iobroker.controme.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/MadErstam/ioBroker.controme/badge.svg)
![NPM](https://nodei.co/npm/iobroker.controme.png?downloads=true)
![Test und Freigabe](https://github.com/MadErstam/ioBroker.controme/workflows/Test%20and%20Release/badge.svg)

# ioBroker.controme

## ioBroker-Adapter für Controme Mini-Server

Stellen Sie über die offizielle API eine Verbindung zum lokalen Controme-Mini-Server her.

Controme ist ein Heizungssteuerungssystem, mit dem Sie Ihre Fußbodenheizung, Zentralheizung, Heizkörper oder andere Klimatisierungssysteme steuern können. Herzstück eines Controme Smart-Heat-Systems ist der Controme Mini-Server, ein lokales System auf Basis eines Raspberry Pi. Weitere Informationen zum Controme Smart-Heat-System finden Sie auf der [Controme-Website](https://www.controme.com/) .

Der Adapter liest regelmäßig die Raumtemperaturen vom Mini-Server aus und ermöglicht die Einstellung der Solltemperaturen auf dem Server über ioBroker. Für die Nutzung dieses Adapters muss die Controme-API aktiviert sein. Der Adapter ersetzt nicht die Controme-Benutzeroberfläche, sondern stellt grundlegende Daten und Funktionen bereit, um Controme in andere Smart-Home-Geräte und -Dienste zu integrieren.

Der Adapter liefert die folgenden Daten für jeden in der Controme-Benutzeroberfläche definierten Raum:

| Objekt                                              | Typ     | Beschreibung                                                                                                                                                                                                                                                                                                                                                                         | lesen/schreiben |
| --------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------- |
| Raum-ID                                             | Gerät   | Jeder Raum wird durch seine Controme-Raum-ID und den Raumnamen als Gerätenamen repräsentiert.                                                                                                                                                                                                                                                                                        |                 |
| RaumID.tatsächlicheTemperatur                       | Zustand | Die tatsächliche Raumtemperatur, mit der Rolle „level.temperature“. Dieser Zustand ist schreibgeschützt. Wenn für einen bestimmten Raum kein Raumtemperatursensor definiert ist, gibt der Controme-Miniserver die tatsächliche Temperatur „null“ zurück.                                                                                                                             | lesen           |
| Raum-ID.Luftfeuchtigkeit                            | Zustand | Die Luftfeuchtigkeit im Raum, dargestellt durch die Variable „level.humidity“. Dieser Wert ist schreibgeschützt. Wenn der Sensor im Raum keine Luftfeuchtigkeit misst, ist dieser Wert null.                                                                                                                                                                                         | lesen           |
| RaumID.Sollwerttemperatur                           | Zustand | Die Ziel-/Solltemperatur des Raumes, mit der Rolle Wert.Temperatur.                                                                                                                                                                                                                                                                                                                  | lesen/schreiben |
| roomID.setpointTemperaturePerm                      | Zustand | Die permanente Ziel-/Solltemperatur des Raumes, mit der Rolle Wert.Temperatur.                                                                                                                                                                                                                                                                                                       | lesen/schreiben |
| roomID.temperatureOffset                            | Zustand | Die Temperaturabweichung des Raumes, um die die Sensormessungen von der tatsächlichen Raumtemperatur abweichen. Der Wert der Temperaturabweichung kann manuell in der Controme-Benutzeroberfläche eingestellt werden und wird zusätzlich von verschiedenen Controme-Modulen berechnet.                                                                                               | lesen           |
| roomID.mode                                         | Zustand | Beschreibt den Betriebsmodus des Raumes, z. B. „Heizung“.                                                                                                                                                                                                                                                                                                                            | lesen           |
| roomID.is\_temporary\_mode                          | Zustand | Zeigt an, dass vorübergehende Änderungen der Solltemperatur in Kraft sind.                                                                                                                                                                                                                                                                                                           | lesen           |
| roomID.temporary\_mode\_end                         | Zustand | Wenn für den Raum ein temporärer Modus aktiv ist, zeigt dieser Status an, wann dieser temporäre Zustand endet. Wenn kein temporärer Modus aktiv ist, ist dieser Status null.                                                                                                                                                                                                         | lesen           |
| roomID.temporary\_mode\_remaining                   | Zustand | Wenn für den Raum ein temporärer Modus aktiv ist, zeigt dieser Status die verbleibenden Sekunden an, in denen dieser Modus aktiv ist. Ist kein temporärer Modus aktiv, ist dieser Status leer. Änderungen dieses Status werden an Controme zurückgemeldet und ändern die verbleibende Zeit des temporären Modus anhand der im Status „setpointTemperate“ definierten Solltemperatur. | lesen/schreiben |
| roomID.offsets                                      | Kanal   | Die Sollwerte der Raumtemperatur werden addiert oder subtrahiert. Dieser Kanal gruppiert alle Abweichungen, die zum jeweiligen Raum gehören.                                                                                                                                                                                                                                         |                 |
| roomID.offsets.\[OFFSET-GROUP]                      | Kanal   | Jede Offsetquelle wird durch einen eigenen Kanal innerhalb des Offsetkanals des Raums repräsentiert, zu dem der Offset gehört.                                                                                                                                                                                                                                                       |                 |
| roomID.offsets.\[OFFSET-GROUP].\[OFFSET]            | Zustand | Die einzelnen Offset-Zustände repräsentieren die verschiedenen Anpassungen, die vom Controme Mini-Server vorgenommen wurden.                                                                                                                                                                                                                                                         | lesen           |
| roomID.offsets.api                                  | Kanal   | Diese Offset-Gruppe ist speziell, da ihre Zustände beschrieben und zur Manipulation des tatsächlichen Raum-Offsets verwendet werden können.                                                                                                                                                                                                                                          |                 |
| roomID.offsets.api.api                              | Zustand | Dieser Offset-Zustand wird standardmäßig vom Adapter erstellt. Sie können ihn verwenden, um die tatsächlichen Raum-Offsets zu bearbeiten. Die Offset-Werte werden alle 10 Minuten vom Server zurückgesetzt.                                                                                                                                                                          | lesen/schreiben |
| roomID.sensoren                                     | Kanal   | Die Sensoren liefern die tatsächlichen Messwerte des Raumes. Dieser Kanal gruppiert alle dem jeweiligen Raum zugeordneten Sensoren.                                                                                                                                                                                                                                                  |                 |
| roomID.sensors.\[SENSOR-ID]                         | Gerät   | Jeder Sensor wird durch ein Gerät innerhalb des Sensorkanals des Raums repräsentiert, dem er zugeordnet ist.                                                                                                                                                                                                                                                                         |                 |
| roomID.sensors.\[SENSOR-ID].isRoomTemperatureSensor | Zustand | Dieser boolesche Wert gibt an, ob ein Sensor als Raumtemperatursensor verwendet wird. Pro Raum kann nur ein einziger Sensor als Raumtemperatursensor eingesetzt werden.                                                                                                                                                                                                              | lesen           |
| roomID.sensors.\[SENSOR-ID].actualTemperature       | Zustand | Dieser Zustand repräsentiert die vom Sensor gemessene Temperatur. Der Zustand ist lesbar/beschreibbar, jedoch akzeptieren nur 1-Wire-Sensoren oder virtuelle Sensoren die eingegebenen Werte. Wird ein Wert an einen realen Sensor gesendet, wird dieser bei der nächsten Messung überschrieben.                                                                                     | lesen/schreiben |
| roomID.outputs                                      | Kanal   | Die Ausgänge steuern typischerweise Ventile, die die Heizung des Raumes regeln. Dieser Kanal gruppiert alle Ausgänge, die dem jeweiligen Raum zugeordnet sind.                                                                                                                                                                                                                       |                 |
| roomID.outputs.\[OUTPUT-ID]                         | Zustand | Jeder Ausgang wird durch einen Zustand innerhalb des Ausgabekanals des zugehörigen Raums repräsentiert. Die Ausgabe-ID-Nummer entspricht der Nummer des Ausgangs am Gateway.                                                                                                                                                                                                         | lesen           |
| Gateway-MAC                                         | Gerät   | Jedes Gateway wird durch seine MAC-Adresse und den Gateway-Namen als Gerätenamen repräsentiert.                                                                                                                                                                                                                                                                                      |                 |
| gatewayMAC.gatewayType                              | Zustand | Der Gateway-Typ. Aktuell gibt es vier Controme-Gateways: Floor Gateway Smart, Floor Gateway Pro, Universal Gateway Mini und Universal Gateway Pro.                                                                                                                                                                                                                                   | lesen           |
| gatewayMAC.isUniversal                              | Zustand | Gibt an, ob es sich beim Gateway um eines der universellen Gateways handelt. Daten von universellen Gateways müssen auf andere Weise abgefragt werden.                                                                                                                                                                                                                               |                 |
| gatewayMAC.outputs                                  | Kanal   | Die Ausgänge steuern typischerweise Ventile, die die Raumheizung für Fußbodenheizungs-Gateways oder Geräte im Heizraum (Pumpen, Ventile) regeln. Dieser Kanal fasst alle Ausgänge des jeweiligen Gateways zusammen.                                                                                                                                                                  | lesen           |
| gatewayMAC.outputs.\[OUTPUT-ID]                     | Zustand | Jeder Ausgang wird durch einen Zustand innerhalb des Ausgabekanals des zugehörigen Gateways repräsentiert. Die Ausgabe-ID-Nummer entspricht der Nummer des Ausgangs auf dem Gateway, wie in der Konfiguration festgelegt.                                                                                                                                                            | lesen           |

Die [API-Dokumentation](https://support.controme.com/api/) finden Sie auf der Controme-Website.

Um den Adapter zu starten, müssen die folgenden Daten auf der Administrator-Einstellungsseite für die Adapterinstanz angegeben werden:

| Datenfeld                 | Typ              | Beschreibung                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URL                       | Text             | Die URL des Controme-Miniservers. Kann entweder die IP-Adresse oder der Name sein.                                                                                                                                                                                                                                                                                                                |
| Haus-ID                   | Nummer           | Die ID der Controme-Installation. Diese sollte laut API-Dokumentation entweder 1 oder 2 sein.                                                                                                                                                                                                                                                                                                     |
| Intervall                 | Nummer           | Das Intervall in Sekunden, in dem die Daten vom Server abgefragt werden. Dieser Wert sollte zwischen 15 und 3600 Sekunden liegen. Zu niedrige Werte sind nicht sinnvoll, da Controme die Sensorwerte nur alle 3–5 Minuten aktualisiert.                                                                                                                                                           |
| erzwingenReInit           | Kontrollkästchen | Wenn dieses Kontrollkästchen aktiviert ist, löscht Controme die Objektstruktur in der ioBroker-Datenbank und lädt die Räume vom Server neu. Diese Einstellung ist nur erforderlich, wenn sich die Raumstruktur auf dem Controme-Server ändert.                                                                                                                                                    |
| warnOnNull                | Kontrollkästchen | Wenn dieses Kontrollkästchen aktiviert ist, protokolliert der Adapter Warnungen, sobald ein Sensor einen NULL-Wert zurückgibt. Die Rückgabe von NULL-Werten ist bei Fenstersensoren erwartbar, deutet aber bei Temperatursensoren auf ein Verbindungsproblem hin. Die API erlaubt keine Unterscheidung zwischen den beiden Typen.                                                                 |
| Benutzername              | Text             | Der Benutzername für den Zugriff auf die Controme-API. Dies ist üblicherweise der Benutzername des Hauptbenutzers von Controme.                                                                                                                                                                                                                                                                   |
| Passwort                  | Passwort         | Das Passwort des Benutzers, mit dem auf die Controme-API zugegriffen werden soll. Dieses Passwort ist verschlüsselt.                                                                                                                                                                                                                                                                              |
| Gateways                  | Tisch            | Alle Gateways, von denen der Adapter die Daten abfragen soll, müssen mit drei Werten konfiguriert werden:                                                                                                                                                                                                                                                                                         |
| gateways.gatewayMAC       | Zeichenkette     | Die MAC-Adresse des jeweiligen Gateways.                                                                                                                                                                                                                                                                                                                                                          |
| gateways.type             | Zeichenkette     | Der jeweilige Gateway-Typ. Dies kann entweder Floor Gateway Smart/Pro, Universal Gateway Mini oder Universal Gateway Pro sein.                                                                                                                                                                                                                                                                    |
| gateways.name             | Zeichenkette     | Der Name des jeweiligen Gateways.                                                                                                                                                                                                                                                                                                                                                                 |
| Gateway-Ausgaben          | Tisch            | Alle Ausgänge aller Gateways, von denen der Adapter die Daten abfragen soll, müssen mit drei Werten konfiguriert werden:                                                                                                                                                                                                                                                                          |
| gatewayOutputs.gatewayMAC | Zeichenkette     | Die MAC-Adresse des jeweiligen Gateways. Diese muss mit einem der in der Gateway-Tabelle konfigurierten GatewayMAC-Werte übereinstimmen. Bitte beachten Sie, dass der Adapter derzeit nicht überprüft, ob die Gateway-MAC-Adressen mit den in der Gateway-Tabelle konfigurierten übereinstimmen. Stellen Sie daher bitte sicher, dass die Gateway-MAC-Adressen in beiden Tabellen übereinstimmen. |
| gatewayOutputs.outputID   | Nummer           | Die Ausgabekennung des jeweiligen Gateways, das abgefragt werden soll. Bei Mini-Gateways muss diese Zahl zwischen 1 und 8 liegen, bei anderen Gateways kann sie zwischen 1 und 15 liegen.                                                                                                                                                                                                         |
| gatewayOutputs.outputName | Zeichenkette     | Der Name des jeweiligen Ausgangs des Gateways.                                                                                                                                                                                                                                                                                                                                                    |

## Aufgaben

1. (in Bearbeitung) Testen, testen, testen
2. Freigabe des Adapters für die stabile Version nach gründlichen Tests

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