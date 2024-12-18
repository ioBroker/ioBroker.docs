---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.controme/README.md
title: ioBroker.Kontrolle
hash: su6wsdirQYbXW/MbQUqjSe1Bz2Tgm5e/AxHIq7hnC/o=
---
![Logo](../../../en/adapterref/iobroker.controme/admin/controme.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.controme.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.controme.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/controme-installed.svg)
![Anzahl Installationen (stabil)](http://iobroker.live/badges/controme-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/MadErstam/iobroker.controme.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/MadErstam/ioBroker.controme/badge.svg)
![NPM](https://nodei.co/npm/iobroker.controme.png?downloads=true)

# IoBroker.Kontrolle
**Tests:** ![Testen und Freigeben](https://github.com/MadErstam/ioBroker.controme/workflows/Test%20and%20Release/badge.svg)

## IoBroker-Adapter für Controme Mini-Server
Stellen Sie mithilfe der offiziellen API eine Verbindung zum lokalen Controme-Miniserver her.

Controme ist ein Heizungssteuerungssystem, mit dem Sie Ihre Fußbodenheizung, Zentralheizung, Heizkörper oder andere Formen der Klimatisierung steuern können. Das Herzstück eines Controme Smart-Heat-Systems ist der Controme Mini-Server, ein lokales Raspberry Pi-basiertes System. Weitere Informationen zum Controme Smart-Heat-System finden Sie unter [Controme-Website](https://www.controme.com/).

Der Adapter liest regelmäßig die Raumtemperaturen vom Mini-Server und ermöglicht es, die Solltemperaturen auf dem Server von ioBroker aus einzustellen. Um diesen Adapter zu verwenden, muss Controme die API aktivieren. Der Adapter soll die Controme-Benutzeroberfläche nicht ersetzen, sondern grundlegende Daten und Funktionen bereitstellen, um Controme in andere Smart Home-Geräte und -Dienste zu integrieren.

Der Adapter stellt für jeden in der Controme-Benutzeroberfläche definierten Raum die folgenden Daten bereit:

| Objekt | Typ | Beschreibung | lesen/schreiben |
| --- | --- | --- | --- |
| Raum-ID | Gerät | Jeder Raum wird mit seiner Controme-Raum-ID und dem Raumnamen als Gerätenamen dargestellt. | |
| roomID.actualTemperature | state | Die tatsächliche Temperatur des Raums mit der Rolle level.temperature. Dieser Status ist schreibgeschützt. Wenn kein Raumtemperatursensor für einen bestimmten Raum definiert ist, ist die vom Controme-Miniserver zurückgegebene tatsächliche Temperatur null. | lesen |
| roomID.humidity | state | Die Luftfeuchtigkeit des Raums mit der Rolle level.humidity. Dieser Status ist schreibgeschützt. Wenn der Sensor für den Raum keine Luftfeuchtigkeit erkennt, ist dieser Status null. | lesen |
| roomID.setpointTemperature | Status | Die Ziel-/Solltemperatur des Raums mit der Rolle value.temperature. | Lesen/Schreiben |
| roomID.setpointTemperaturePerm | status | Die permanente Ziel-/Solltemperatur des Raums mit der Rolle value.temperature. | lesen/schreiben |
| roomID.temperatureOffset | status | Die Offsettemperatur des Raums, um die die Sensormessungen von der tatsächlichen Temperatur des Raums abweichen. Der Temperatur-Offsetwert kann manuell in der Controme-Benutzeroberfläche eingestellt werden und wird außerdem von verschiedenen Controme-Modulen berechnet. | lesen |
| roomID.mode | state | Beschreibt den Betriebsmodus des Raumes, zB "Heizen". | lesen |
| roomID.is_temporary_mode | Status | Zeigt an, dass vorübergehende Änderungen an der Solltemperatur wirksam sind. | Lesen |
| roomID.temporary_mode_end | Status | Wenn für den Raum ein temporärer Modus aktiv ist, gibt dieser Status an, wann der temporäre Status endet. Wenn kein temporärer Status aktiv ist, ist dieser Status null. | lesen |
| roomID.temporary_mode_remaining | Status | Wenn ein temporärer Modus für den Raum aktiv ist, gibt dieser Status die verbleibenden Sekunden an, in denen der temporäre Status aktiv ist. Wenn kein temporärer Status aktiv ist, ist dieser Status null. Änderungen an diesem Status werden an Controme zurückgemeldet und ändern die verbleibende Zeit für den temporären Modus mit der im Status setpointTemperate definierten Solltemperatur. | Lesen/Schreiben |
| roomID.offsets | channel | Offsets werden zur Soll-Raumtemperatur addiert oder davon subtrahiert. Dieser Kanal fasst alle Offsets zusammen, die zum jeweiligen Raum gehören. | |
| roomID.offsets.[OFFSET-GROUP] | Kanal | Jede Offset-Quelle wird durch einen dedizierten Kanal innerhalb des Offset-Kanals des Raums dargestellt, zu dem der Offset gehört. | |
| roomID.offsets.[OFFSET-GROUP].[OFFSET] | Status | Die einzelnen Offset-Status stellen die verschiedenen Anpassungen dar, die vom Controme-Miniserver vorgenommen werden. | lesen |
| roomID.offsets.api | channel | Diese Offset-Gruppe ist etwas Besonderes, da ihre Zustände beschrieben werden können und mit ihnen der tatsächliche Raum-Offset bearbeitet werden kann. | |
| roomID.offsets.api.api | Status | Dieser Offset-Status wird standardmäßig vom Adapter erstellt. Sie können ihn verwenden, um die tatsächlichen Raum-Offsets zu manipulieren. Die Offset-Werte werden alle 10 Minuten vom Server zurückgesetzt. | Lesen/Schreiben |
| roomID.sensors | channel | Sensoren liefern die aktuellen Messwerte des Raumes. In diesem Kanal werden alle Sensoren zusammengefasst, die dem jeweiligen Raum zugeordnet sind. | |
| roomID.sensors.[SENSOR-ID] | Gerät | Jeder Sensor wird durch ein Gerät innerhalb des Sensorkanals des Raums dargestellt, dem er zugewiesen ist. | |
| roomID.sensors.[SENSOR-ID].isRoomTemperatureSensor | state | Dieser boolesche Status gibt an, ob ein Sensor als Raumtemperatursensor verwendet wird. Pro Raum kann nur ein einziger Sensor als Raumtemperatursensor verwendet werden. | lesen |
| roomID.sensors.[SENSOR-ID].actualTemperature | Status | Dieser Status stellt die tatsächlich vom Sensor gemessene Temperatur dar. Der Status ist Lesen/Schreiben, aber nur 1Wire-Sensoren oder virtuelle Sensoren akzeptieren die bereitgestellten Werte. Wenn Sie einen Wert in einen realen Sensor schreiben, wird der Wert beim nächsten Lesen überschrieben. | Lesen/Schreiben |
| roomID.outputs | channel | Ausgänge steuern typischerweise Ventile, die die Heizung des Raumes regeln. Dieser Kanal fasst alle Ausgänge zusammen, die dem jeweiligen Raum zugeordnet sind. | |
| roomID.outputs.[OUTPUT-ID] | Status | Jeder Ausgang wird durch einen Status innerhalb des Ausgangskanals des Raums dargestellt, zu dem er gehört. Die Ausgangs-ID-Nummer stellt die Nummer des Ausgangs auf dem Gateway dar. | lesen |
| GatewayMAC | Gerät | Jedes Gateway wird mit seiner MAC-Adresse und dem Gateway-Namen als Gerätenamen dargestellt. | |
| gatewayMAC.gatewayType | status | Der Typ des Gateways. Derzeit gibt es vier Kontroll-Gateways: Floor Gateway Smart, Floor Gateway Pro, Universal Gateway Mini, Universal Gateway Pro. | lesen |
| gatewayMAC.isUniversal | Status | Gibt an, ob das Gateway eines der universellen Gateways ist. Daten von universellen Gateways müssen auf andere Weise abgefragt werden. |
| gatewayMAC.outputs | Kanal | Ausgänge steuern typischerweise Ventile, die die Raumheizung für Etagengateways oder Geräte im Heizraum (Pumpen, Ventile) steuern. Dieser Kanal fasst alle Ausgänge des jeweiligen Gateways zusammen. | lesen |
| gatewayMAC.outputs.[OUTPUT-ID] | Status | Jeder Ausgang wird durch einen Status innerhalb des Ausgangskanals des Gateways dargestellt, dem er zugewiesen ist. Die Ausgangs-ID-Nummer stellt die Nummer des Ausgangs auf dem Gateway dar, wie in der Konfiguration eingerichtet. | lesen |

Die [API-Dokumentation](https://support.controme.com/api/) finden Sie auf der Controme-Website.

Um den Adapter zu starten, müssen auf der Administratoreinstellungsseite für die Adapterinstanz folgende Daten angegeben werden:

| Datenfeld | Typ | Beschreibung |
| --- | --- | --- |
| URL | Text | Die URL des Controme-Miniservers. Kann entweder die IP-Adresse oder der Name sein. |
| Haus-ID | Nummer | Die ID der Controme-Installation. Laut API-Dokumentation sollte diese entweder 1 oder 2 sein. |
| Intervall | Zahl | Das Intervall in Sekunden, in dem die Daten vom Server abgefragt werden. Dieser Wert sollte zwischen 15 Sekunden und 3600 Sekunden liegen. Zu niedrige Werte sind nicht sinnvoll, da Controme die Sensorwerte nur alle 3-5 Minuten aktualisiert. |
| forceReInit | checkbox | Wenn diese Checkbox gesetzt ist, bereinigt Controme die Objektstruktur in der ioBroker-Datenbank und lädt die Räume neu vom Server. Diese Einstellung ist nur erforderlich, wenn sich die Raumstruktur auf dem Controme-Server ändert. |
| warnOnNull | Kontrollkästchen | Wenn dieses Kontrollkästchen aktiviert ist, schreibt der Adapter Protokollwarnungen, wenn ein Sensor einen NULL-Wert zurückgibt. Die Rückgabe von NULL-Werten ist bei Fenstersensoren das erwartete Verhalten, würde bei Temperatursensoren jedoch auf ein Verbindungsproblem hinweisen. Die API erlaubt keine Unterscheidung zwischen |
| Benutzername | Text | Der Benutzername für den Zugriff auf die Controme-API. Dies ist normalerweise der Benutzername des Hauptbenutzers von Controme. |
| Passwort | Passwort | Das Passwort des Benutzers, mit dem auf die Controme-API zugegriffen wird. Dieses Passwort ist verschlüsselt. |
| Gateways | Tabelle | Alle Gateways, für die der Adapter Daten abfragen soll, müssen mit drei Werten konfiguriert werden: |
| gateways.gatewayMAC | Zeichenfolge | Die MAC-Adresse des einzelnen Gateways. |
| gateways.type | string | Der Typ des jeweiligen Gateways. Kann entweder Floor Gateway Smart/Pro, Universal Gateway Mini oder Universal Gateway Pro sein. |
| gateways.name | string | Der Name des jeweiligen Gateways. |
| gatewayOutputs | Tabelle | Alle Ausgänge aller Gateways, für die der Adapter die Daten abfragen soll, müssen mit drei Werten konfiguriert werden: |
| gatewayOutputs.gatewayMAC | string | Die MAC-Adresse des einzelnen Gateways. Diese muss mit einem der in der Gateway-Tabelle konfigurierten GatewayMAC-Werte übereinstimmen. Bitte beachten Sie, dass der Adapter derzeit nicht überprüft, ob die Gateway-MAC-Adressen mit denen in der Gateway-Tabelle konfigurierten übereinstimmen. Achten Sie daher darauf, dass die Gateway-MAC-Adressen in beiden Tabellen übereinstimmen. |
| gatewayOutputs.outputID | Nummer | Die Output-ID des jeweiligen Gateways, das abgefragt werden soll. Bei Mini-Gateways muss diese Nummer zwischen 1 und 8 liegen, bei anderen Gateways kann sie zwischen 1 und 15 liegen. |
| gatewayOutputs.outputName | string | Der Name des jeweiligen Ausgangs des Gateways. |

## Aufgaben
1. (in Arbeit) Veröffentlichen Sie den Adapter :)
2. Fügen Sie den Konfigurationsfeldern eine Datenüberprüfung hinzu
3. (erledigt) Erweiterung der vom Controme Mini-Server empfangenen Datenfelder (z. B. Luftfeuchtigkeit)
4. (erledigt) Sensordaten für jeden Sensor und Raum hinzufügen
5. (erledigt, Tests stehen noch aus) Implementierung des temporären Modus (temporäre Änderungen der gewünschten Temperatur für den Raum) neben der Solltemperatur
6. (erledigt) Option zum Einstellen von Werten für virtuelle Sensoren hinzufügen

## Kennen Sie Fehler
1. ...

## Changelog
<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
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

Copyright (c) 2024 MadErstam <erstam@gmx.de>