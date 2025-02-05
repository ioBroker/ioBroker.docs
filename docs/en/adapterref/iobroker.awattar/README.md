![Logo](admin/awattar.png)
# ioBroker.awattar

[![NPM version](http://img.shields.io/npm/v/iobroker.awattar.svg)](https://www.npmjs.com/package/iobroker.awattar)
[![Downloads](https://img.shields.io/npm/dm/iobroker.awattar.svg)](https://www.npmjs.com/package/iobroker.awattar)
![Number of Installations (latest)](http://iobroker.live/badges/awattar-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/awattar-stable.svg)
[![Dependency Status](https://img.shields.io/david/sirjojo69/iobroker.awattar.svg)](https://david-dm.org/sirjojo69/iobroker.awattar)
[![Known Vulnerabilities](https://snyk.io/test/github/sirjojo69/ioBroker.awattar/badge.svg)](https://snyk.io/test/github/sirjojo69/ioBroker.awattar)

[![NPM](https://nodei.co/npm/iobroker.awattar.png?downloads=true)](https://nodei.co/npm/iobroker.awattar/)

**Tests:** ![Test and Release](https://github.com/sirjojo69/ioBroker.awattar/workflows/Test%20and%20Release/badge.svg)

<p>
<a href="https://www.awattar.de/" target="_blank">
<img border="0" alt="aWATTar" src="admin/awattarBig.png">
</a>
</p>


## aWATTar adapter for ioBroker

This adapter reads the hourly prices for the coming day of the electricity provider <a href="https://www.awattar.de/" target="_blank"> aWATTar </a>
for the hourly and hourly CAP tariffs.
With this information you can then control when e.g. your electric car or the home storage should be charged (namely at the cheapest time).
Since this provider offers its services only in Austria and Germany the detailed description is just in german.

Dieser Adapter liest die Stunden Preise für den kommenden Tag des Stromanbieters <a href="https://www.awattar.de/" target="_blank">aWATTar</a>
für die Tarife hourly und hourly CAP.
Mit dieser Information kann man dann steuern wann z.b. das Elektroauto oder der Hausspeicher geladen werden soll (nämlich zur billigsten Zeit).

In den Einstellungen des Adapters findest du 5 Felder (die jeweils mit Standardwerten belegt sind):
<li>In der Variable "URL for aWATTar API " steht die URL für den API Preis Datenfeed von aWATTar.</li>
<li>Wer (z.B. für die Beladung seines Elektroautos) die billigsten Stunden in der Nacht wissen will, benutzt die beiden folgenden Parameter.
<ul>In der Variable "Start Threshold Loading (e.g. for EV)" steht eine Uhrzeit die den Beginn eines Zeitraumes darstellt, für den man die billigsten Stunden in geordneter Reihenfolge bekommen möchte </ul>
<ul>In der Variable "End Threshold Loading" steht eine Uhrzeit die das Ende eines Zeitraumes darstellt, für den man die billigsten Stunden in geordneter Reihenfolge bekommen möchte</ul>
</li>
<li>In der Variable "actual VAT rate (percent)" muss die aktuell gültige Mwst. angegeben werden. Die Preise die über die Schnittstelle kommen sind ohne Mwst.</li>
<li>In der Variable "Arbeitspreis ( "Netznutzung" + "Umlagen, Abgaben, Steuern" + "Kosten für Ökostromzertifikate, Abrechnung und Vertrieb", incl. MWSt.)" kannst du deinen persönlichen Arbeitspreis eintragen (abhängig von der PLZ)</li>
<br>
Die Ergebnisse stehen dann im Object Baum des Adapters. (awattar.0)
Der Folder "prices" enthält für jede Stunde des Tages einen Eintrag mit dem Strompreis für diese Stunde
Der Folder "prices_ordered" enthält -sortiert nach dem Stundenpreis- einen Eintrag für jede Stunde des in den Settings eingestellten Zeitraumes mit dem Strompreis für diese Stunde .
<br><br>
Im Ausgangszustand ist der Adapter so eingestellt dass er um 15.00 Uhr die Werte für die 24h des nächsten Tages holt.
Dieser Schedule kann natürlich angepasst werden.
Laut <a href="https://www.awattar.de/services/api" target="_blank">aWATTar api Doku</a> stehen diese Werte jeden Tag um 14.00 Uhr bereit.


## Changelog
### 2.0.0 (2025-01-31)
* (SirJojo69) new price calculation

### 1.1.0
* (Apollon77) Updates to testing from ioBroker Core team to make testing compatible with js-controller 4.0
* (SirJojo69) changed copyright
* (SirJojo69) updated js-controller dependency to 5.0.19
* (SirJojo69) fixed stat and end date format to DD.MM.YYYY
* (SirJojo69) adapter runs once at start
* (mcm1957) Updates to testing

### 1.0.6
* (SirJojo69) new version for official repo

### 1.0.5
* (SirJojo69) Gesamtpreis und Bruttopreis hinzugefügt, API Aufruf mit start und ende. some internal fixes.

### 1.0.3
* (SirJojo69) einige Einstellungen verändert.

### 1.0.1
* (SirJojo69) deleted admin tab.

### 1.0.0
* (SirJojo69) first stable release.

### 0.0.1
* (SirJojo69) initial release.

## License
MIT License
Copyright (c) 2025 SirJojo69 <gtj.howe@gmx.de>

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