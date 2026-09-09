---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.schwoerer-ventcube/README.md
title: ioBroker.schwoerer-ventcube
hash: a9C+euhKNMUF8sRykOutusRyN5xlkmiyDvGcrezyQ3w=
---
![Logo](../../../en/adapterref/iobroker.schwoerer-ventcube/admin/schwoerer-ventcube.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.schwoerer-ventcube.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.schwoerer-ventcube.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/schwoerer-ventcube-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/schwoerer-ventcube-stable.svg)
![Sprachniveau: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/Excodibur/ioBroker.schwoerer-ventcube.svg?logo=lgtm&logoWidth=18)
![GitHub-Veröffentlichungsstatus](https://github.com/Excodibur/iobroker.schwoerer-ventcube/workflows/Build%2C%20Test%20and%20Release/badge.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/schwoerer-ventcube/svg-badge.svg)
![NPM](https://nodei.co/npm/iobroker.schwoerer-ventcube.png?downloads=true)

# ioBroker.schwoerer-ventcube

## Schwoerer-Ventcube-Adapter für ioBroker

Adapter für das Schwoerhaus Ventcube-System. Weitere Informationen zu Ventcube Fresh finden Sie [hier](https://www.bauinfocenter.de/lueftung/lueftungsanlagen/) .

**Haftungsausschluss** : Dieser Adapter wurde weder von der Firma [Schwoererhaus KG](https://www.schwoererhaus.de/) , dem Vertreiber des Ventcube-Systems, entwickelt noch offiziell unterstützt. Die Anweisungen sollten sorgfältig und auf eigene Gefahr befolgt werden.

### Voraussetzungen

Um auf die Netzwerkschnittstelle von Ventcube zugreifen zu können, müssen folgende (bekannte) Voraussetzungen erfüllt sein:

- Der Ventcube muss mit Ihrem internen Netzwerk verbunden werden (in der Regel über ein Netzwerkkabel).
- Die Modbus-TCP-Schnittstelle muss unterstützt werden (Control-Panel: >= V1.05, VentCube: >= V02.11) und muss oft zuerst manuell aktiviert werden.
  - Melden Sie sich im Control Panel im Bereich „Service“ an (verwenden Sie das Standardpasswort aus der Dokumentation).
  - Überprüfen Sie in den Grundeinstellungen, ob eine Netzwerkverbindung hergestellt ist und sowohl „9. Netzwerkschnittstelle“ als auch „10. Modbus TCP“ aktiviert sind.
  - Falls die letzten beiden Einstellungen nicht aktiv sind, aktivieren Sie diese und starten Sie den Ventcube neu (z. B. durch kurzzeitiges Unterbrechen der Stromzufuhr).

### Konfigurationsparameter

Je nach gebäudespezifischer Ventcube-Konfiguration werden nicht alle Parameter genutzt, die über die Ventcube-Oberfläche abgerufen oder geändert werden können. Jeder Parameter im Ordner „parameters“ ist mit einem Eintrag im Ordner „lastUpdate“ verknüpft, der den Zeitstempel der letzten Aktualisierung für den jeweiligen Parameter angibt.

Alle in der unten genannten Spezifikation aufgeführten Parameter wurden dem Adapter hinzugefügt und sind über die Option _**„Erweiterte Funktionen“**_ zugänglich, die während der Adapterbereitstellung konfiguriert werden kann. Durch Aktivierung dieser Option ruft der Adapter regelmäßig Daten für über 100 Parameter ab, von denen die meisten in durchschnittlichen Haushalten wahrscheinlich nicht verwendet werden. Der Testumfang beschränkte sich auf die standardmäßig aktivierten _**Basisfunktionen**_ .

Die folgenden Standardkonfigurationswerte müssen wahrscheinlich während der Adapterbereitstellung geändert werden, damit die Verbindung zu Ventcube ordnungsgemäß hergestellt werden kann:

| Parameter                             | Standardwert | Erläuterung                                                                                                                                                                                                                                             |
| ------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Server`                              | HERMES-LT    | Normalerweise registriert sich Ventcube im Netzwerk mit _HERMES-LT_ , aber wenn das nicht funktioniert, versuchen Sie es mit der IP-Adresse.                                                                                                            |
| `Port`                                | 502          |                                                                                                                                                                                                                                                         |
| `Interval`                            | 30           | Nach wie vielen Sekunden sollen die Metriken vom Server aktualisiert werden?                                                                                                                                                                            |
| `Request Timeout`                     | 5000         | Wie viele Millisekunden soll gewartet werden, bis Anfragen an Ventcube ein Timeout verursachen?                                                                                                                                                         |
| `Reconnection Attempts`               | 10           | Falls die Verbindung zu Ventcube abbricht, wie oft sollte eine Wiederverbindung versucht werden?                                                                                                                                                        |
| `Delay between reconnection attempts` | 10000        | Wie lange soll zwischen den Wiederverbindungsversuchen gewartet werden (in Millisekunden)?                                                                                                                                                              |
| `Advanced Functions`                  | ✓            | Während die Basisfunktionen möglicherweise ausreichen, wenn Ventcube nur zur Belüftung verwendet wird, sollten die erweiterten Funktionen aktiviert werden, wenn Heiz-/Kühlfunktionen oder Systemmetriken (Fehlercodes, Lüfterdetails) benötigt werden. |

#### Interessante Funktionen (um nur einige zu nennen)

- _**Betriebsart**_ , veränderlich
- _**Stoßlüftung**_ (30-minütiger Luftstoß der Stufe 4), veränderbar
- _**Ist Temp Raum 1**_ (Temperatur im Haus)
- _**T10 Außentemperatur**_

### Referenzsystem

Der ioBroker-Adapter wurde erfolgreich getestet mit:

| Bedienfeld | Ventcube | Modbus-Spezifikation                                                                                                                    |
| ---------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| V01.10     | V02.26   | [Parameterliste\_Modbus\_TCP\_03.2020](https://schwoerer-service.com/storage/files/Community/2020/Parameterliste_Modbus_TCP_032020.pdf) |

## Changelog
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now

See [Changelog](https://github.com/Excodibur/ioBroker.schwoerer-ventcube/blob/master/CHANGELOG.md) for a list of all changes.

<!--
	Placeholder for the next version (add instead of version-number-headline below):
	## __WORK IN PROGRESS__
-->

### **WORK IN PROGRESS**
- (ioBroker-Bot) Adapter requires js-controller >= 6.0.11 now.

### 1.4.2 (2021-08-08)
* Removed test configuration from default adapter values

### 1.4.1 (2021-06-05)
* Corrected Modbus address for ***T6*** measurement (Issue #60)[https://github.com/Excodibur/ioBroker.schwoerer-ventcube/issues/60], (PR #61)[https://github.com/Excodibur/ioBroker.schwoerer-ventcube/pull/61]
* Added scheduling priority ***Tier 2*** (introduced with JS-Controller 3.3.0)
* (Development) added tests for Node.js 16 Support

### 1.4.0 (2021-04-30)
* Added Admin 5 support

### 1.3.0 (2020-09-23)
* Added new parameter ***request timeout***
* Added info channel to inform about adapter status
* Redefined state roles to describe available data better
* Improvements to Adapter termination process


### 1.2.0 (2020-09-15)
* Added missing reconnect behaviour in case Ventcube is not reachable
* Added connection settings for new reconnect-behaviour
* Reworked layout ouf settings page
* (Development) Fixed mock-server connection handling and Windows integration tests
* (Development) Moved integration tests (windows, Linux, OSX) from Travis to Github Actions

## License
MIT License

Copyright (c) 2020-2026 Excodibur

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