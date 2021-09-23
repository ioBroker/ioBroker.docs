---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.awattar/README.md
title: ioBroker.awattar
hash: PzT3xH36qGE3IjMR6UxLBEKz75D3cNiyFUoMT48FoK0=
---
![Logo](../../../en/adapterref/iobroker.awattar/admin/awattar.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.awattar.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.awattar.svg)
![Anzahl der Installationen (spätestens)](http://iobroker.live/badges/awattar-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/awattar-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/sirjojo69/iobroker.awattar.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/sirjojo69/ioBroker.awattar/badge.svg)
![NPM](https://nodei.co/npm/iobroker.awattar.png?downloads=true)

#ioBroker.awattar
**Tests:** ![Testen und freigeben](https://github.com/sirjojo69/ioBroker.awattar/workflows/Test%20and%20Release/badge.svg)

<p><a href="https://www.awattar.de/" target="_blank"><img border="0" alt="aWATTar" src="admin/awattarBig.png"></a></p>

## AWATTar-Adapter für ioBroker
Dieser Adapter liest die Stundenpreise für den kommenden Tag des Stromanbieters <a href="https://www.awattar.de/" target="_blank">aWATTar</a> für die Stunden- und Stundentarife CAP aus. Mit diesen Informationen können Sie dann steuern, wann zB Ihr Elektroauto oder der Heimspeicher geladen werden soll (nämlich zum günstigsten Zeitpunkt). Da dieser Anbieter seine Dienste nur in Österreich und Deutschland anbietet, ist die ausführliche Beschreibung nur in deutscher Sprache.

This Adapter liest die Stunden Preise für den kommenden Tag des Stromanbieters <a href="https://www.awattar.de/" target="_blank">aWATTar</a> für die Tarife stündlich und stündlich CAP. Mit dieser Information can man dann steuern wann zb das Elektroauto oder der Hausspeicher geladen werden soll (nämlich zur billigsten Zeit).

In den Einstellungen des Adapters findest du 5 Felder (die jeweils mit Standardwerten belegt sind):<li> In der Variable &quot;URL for aWATTar API&quot; steht die URL für den API Preis Datenfeed von aWATTar.</li><li> Wer (zB für die Beladung seiner Elektroautos) sterben billigsten Stunden in der Nacht wissen will, benutzt die beiden folgenden Parameter.<ul> In der Variable &quot;Start Threshold Loading (zB for EV)&quot; steht eine Uhrzeit sterben den Anfang eines Zeitraumes darstellt, für den Mann die billigsten Stunden in geordneter Reihenfolge bekommen möchte</ul><ul> In der Variable &quot;End Threshold Loading&quot; steht eine Uhrzeit die das Ende eines Zeitraumes darstellt, für den Mann die billigsten Stunden in geordneter Reihenfolge bekommen möchte</ul></li><li> In der Variable &quot;tatsächlicher Umsatzsteuersatz (Prozent)&quot; muss die aktuell gültige Mwst. angegeben werden. Die Preise sterben über die Schnittstelle kommen sind ohne Mwst.</li><li> In der Variable &quot;Arbeitspreis (&quot;Netznutzung&quot; + &quot;Umlagen, Abgaben, Steuern&quot; + &quot;Kosten für Ökostromzertifikate, Abrechnung und Vertrieb&quot;, incl. MWSt.)&quot; kannst du deinen persönlichen Arbeitspreis eintragen (abhängig von der PLZ)</li><br> Die Ergebnisse stehen dann im Objekt Baum des Adapters. (awattar.0) Der Ordner &quot;prices&quot; enthält für jede Stunde des Tages einen Eintrag mit dem Strompreis für diese Stunde für diese Stunde.<br><br> Im Ausgangszustand ist der Adapter so eingestellt dass er um 15.00 Uhr die Werte für die 24h des nächsten Tages holt. Dieser Fahrplan kann natürlich angepasst werden. Laut <a href="https://www.awattar.de/services/api" target="_blank">aWATTar api Doku</a> stehen diese Werte jeden Tag um 14.00 Uhr bereit.

## Changelog

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

Copyright (c) 2020 - 2021 SirJojo69 <gtj.howe@gmx.de>

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