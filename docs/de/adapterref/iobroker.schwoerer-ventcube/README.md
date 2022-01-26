---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.schwoerer-ventcube/README.md
title: ioBroker.schwoerer-ventcube
hash: R21i7JZQEDmG0ZtnGRGE6OViAK5St/HwwIGOPIZRX0M=
---
![Logo](../../../en/adapterref/iobroker.schwoerer-ventcube/admin/schwoerer-ventcube.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.schwoerer-ventcube.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.schwoerer-ventcube.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/Excodibur/iobroker.schwoerer-ventcube.svg)
![Anzahl der Installationen (spätestens)](http://iobroker.live/badges/schwoerer-ventcube-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/schwoerer-ventcube-stable.svg)
![Sprachnote: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/Excodibur/ioBroker.schwoerer-ventcube.svg?logo=lgtm&logoWidth=18)
![NPM](https://nodei.co/npm/iobroker.schwoerer-ventcube.png?downloads=true)

#ioBroker.schwoerer-ventcube
![Github-Release-Status](https://github.com/Excodibur/iobroker.schwoerer-ventcube/workflows/Build%2C%20Test%20and%20Release/badge.svg)

[![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/schwaerer-ventcube/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

## Schwoerer-ventcube Adapter für ioBroker
Adapter für Schwörerhaus Ventcube-System. Weitere Informationen zu Ventcube Fresh finden Sie unter [Hier](https://www.bauinfocenter.de/lueftung/lueftungsanlagen/).

**Haftungsausschluss**: Dieser Adapter wird weder von der Firma [Schwörerhaus KG](https://www.schwoererhaus.de/) entwickelt noch offiziell unterstützt, die das Ventcube-System vertreibt. Anweisungen sollten mit Sorgfalt und auf eigene Gefahr befolgt werden.

###Voraussetzungen
Um auf die Netzwerkschnittstelle von Ventcube zugreifen zu können, müssen folgende (bekannte) Voraussetzungen erfüllt sein:

- Der Ventcube muss mit Ihrem internen Netzwerk verbunden sein (normalerweise über Netzwerkkabel)
- Modbus TCP Schnittstelle muss unterstützt werden (Control-Panel: >= V1.05, VentCube: >= V02.11) und muss oft erst manuell aktiviert werden
    * Melden Sie sich in der Systemsteuerung im Abschnitt "Service" an (verwenden Sie das Standardpasswort aus den Dokumenten)
* Überprüfen Sie in den Grundeinstellungen, ob die Netzwerkverbindung hergestellt ist und "9. Netzwerkschnittstelle" und "10. Modbus TCP" beide aktiv sind.
* Wenn die letzten beiden Einstellungen nicht aktiv sind, aktivieren Sie diese und starten Sie den Ventcube neu (z. B. durch vorübergehende Unterbrechung der Stromversorgung)

### Konfigurationsparameter
Je nach gebäudespezifischem Ventcube-Setup werden nicht alle Parameter verwendet, die über die Ventcube-Schnittstelle abgerufen oder geändert werden können. Jeder Parameter im Ordner "parameters" steht Seite an Seite mit einem Eintrag im Ordner "lastUpdate", der den letzten Abrufzeitstempel für jeden Parameter angibt.

Alle Parameter, die in der unten aufgeführten Spezifikation erwähnt werden, wurden dem Adapter hinzugefügt und können über die Option ***Erweiterte Funktionen*** abgerufen werden, die während der Adapterbereitstellung konfigurierbar ist. Wenn Sie diese Option aktivieren, ruft der Adapter regelmäßig Daten für mehr als 100 Parameter ab, von denen die meisten in normalen Haushalten möglicherweise nicht verwendet werden. Der Testumfang wurde auf ***Grundfunktionen*** beschränkt (standardmäßig aktiviert).

Die folgenden Standardkonfigurationswerte müssen wahrscheinlich während der Adapterbereitstellung geändert werden, damit eine ordnungsgemäße Verbindung mit Ventcube hergestellt werden kann:

| Parameter | Standardwert | Erklärung |
| `Server` | HERMES-LT | Normalerweise registriert sich Ventcube im Netzwerk mit _HERMES-LT_, aber wenn es nicht funktioniert, versuchen Sie es mit der IP-Adresse. |
| `Port` | 502 | |
| `Interval` | 30 | Nach wie vielen Sekunden sollen die Metriken vom Server aktualisiert werden |
| `Request Timeout` | 5000 | Wie viele Millisekunden soll gewartet werden, bis Anfragen an Ventcube ablaufen |
| `Reconnection Attempts` | 10 | Falls die Verbindung zu Ventcube verloren geht, wie oft sollte eine erneute Verbindung versucht werden |
| `Delay between reconnection attempts` | 10000 | Wie lange zwischen Wiederverbindungsversuchen gewartet werden soll (in Millisekunden) |
| `Advanced Functions` | &#10003; | Während Grundfunktionen ausreichen können, wenn Ventcube nur zur Belüftung verwendet wird, sollten erweiterte Funktionen aktiviert werden, wenn Heiz-/Kühlfunktionen oder Systemmetriken (Fehlercodes, Lüfterdetails) benötigt werden. |
| `Erweiterte Funktionen` | &#10003; | Während Grundfunktionen ausreichen können, wenn Ventcube nur zur Belüftung verwendet wird, sollten erweiterte Funktionen aktiviert werden, wenn Heiz-/Kühlfunktionen oder Systemmetriken (Fehlercodes, Lüfterdetails) benötigt werden. |

#### Interessante Funktionen (für den Anfang)
- ***Betriebsart***, änderbar
- ***Stoßlüftung*** (30 Minuten Stufe 4 Luftstoß), wechselbar
- ***Ist Temp Raum 1*** (Temperatur im Haus)
- ***T10 Außentemperatur***

### Referenzsystem
Der ioBroker Adapter wurde erfolgreich getestet mit:

| Systemsteuerung | Ventcube | Modbus-Spezifikation |
|---------------|----------|-----------------------------------|
| V01.10 | V02.26 | [Parameterliste_Modbus_TCP_03.2020](https://schwoerer-service.com/storage/files/Community/2020/Parameterliste_Modbus_TCP_032020.pdf) |

## Changelog
See [Changelog](https://github.com/Excodibur/ioBroker.schwoerer-ventcube/blob/master/CHANGELOG.md).

## License
MIT License

Copyright (c) 2020-2021 Excodibur

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