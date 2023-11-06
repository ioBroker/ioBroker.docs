---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.bydhvs/README.md
title: kein Titel
hash: rdIh77tbZwWxtyNaiQ+u+VWM8qKa82gxi9pQbGIM1S8=
---
![Logo](../../../en/adapterref/iobroker.bydhvs/admin/bydhvs.png)

## Bydhvs-Adapter für ioBroker
Umfragedaten der BYD HVS-Batterie

## Einführung
Dieser Adapter nimmt Daten von einer Byd-PV-Batterie (https://www.bydbatterybox.com/) auf und speichert sie in Datenpunkten im Adapter. Leider gibt es keine offizielle API und keine Dokumentation, daher habe ich Wireshark und einen byd-hvs-Simulator verwendet, um zu versuchen, die Kommunikation zu verstehen. Mein Adapter simuliert die byd-App, sendet ähnliche Pakete an das Gerät und analysiert die Antworten.

## Seien Sie vorsichtig
In der beConnect-App gibt es zwei Schritte: Im ersten Schritt erhalten Sie die normalen Daten, im zweiten Schritt erhalten Sie Detaildaten für alle Zellen (einzelne Zellentemperatur und -spannung und einige weitere Details). Um die Detaildaten zu erhalten, müssen Sie dort klicken eine Verzögerung nach einem der Datenpakete sein, bis ich das Ergebnis erhalten kann. Ich denke, dass mittlerweile alle Zellen gemessen sind, bin mir aber nicht sicher. Ich bin mir definitiv nicht sicher, ob Sie Ihrem Akku schaden, wenn Sie diese Daten zu oft abfragen. Seien Sie sich also bewusst: Sie handeln auf eigenes Risiko!

## Unterstützung für bis zu 5 Module
Es werden jetzt bis zu 5 HVS-Module unterstützt.

## Einstellungen
Intervall: Das ist ganz einfach: Wie oft (n) sollen die Daten abgefragt werden? IP-Adresse: Das ist selbsterklärend. Entweder Sie verwenden die Standardadresse ( 192.168.16.254 ) und ändern das Routing zu Hause, z. B.: https://www.photovoltaikforum.com/thread/150898-byd-hvs-firmware-update/?postID=2215343#post2215343 . Der Vorteil ist: Auch die beConnect-App funktioniert. Andere Möglichkeit: Sie ändern die IP-Adresse der Box. Aber: Seien Sie gewarnt: Der Text auf der Webseite ist verwirrend und wenn Sie sich bei den Dingen, die Sie tun, nicht ganz sicher sind: Berühren Sie die Einstellungen BITTE nicht. In den deutschen Foren habe ich von Leuten gelesen, die aus ihrem System ausgesperrt wurden und es kein Zurück mehr gibt, entweder schickt dir byd eine Ersatz-HVU oder du musst eine neue kaufen.
Batteriedetails: Wie oben erklärt: Benötigen Sie die Details der Batterie? Wenn ja: setze das checkobx.
Batteriedetails – alle ... Zyklen: Auch wie oben, sollte klar sein. Testmodus – Daten im Fehlerprotokoll anzeigen: Wenn Sie dieses Kontrollkästchen aktivieren: Die gesendeten und empfangenen Daten werden im Fehlerprotokoll angezeigt, sodass Sie sie einfach herunterladen können die Daten und senden sie mir bei Fehlern zu.
Kopieren und Einfügen funktioniert nicht – die Daten werden am Ende ausgeschnitten. Sie müssen es herunterladen, bevor Sie es mir senden.

[Link zur nativen deutschen Readme:](README-German.md)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### 1.5.0 (2023-11-04)
* Breaking change: nodejs 16 minimum required  
* automated checks and release-script repaired (thanks to mcm1957, he did the work)
* nothing else changed in code

### 1.4.2 (2023-09-28)
* Typo in version number removed

### 1.4.1 (2023-09-24)
* Compatibility with js.controller 5x
* Removed some bugs in detecting inverter
* Inverternumber ist logged, so I can easily add new inverters if neccerary, just send me the silly-log if inverter is unknown.

### 1.4.0 (2022-10-31)
* Update of referred modules (mainly around testing)
* improvmenets contributed by Tapter (5 modules, readme and better readable code)
* Better detection of battery type and inverter
* SOC not only from normal data but from diagnosis-data, too. There we have one decimal place more
* removed frequency limit for battery detail data
* increased max count of temperature measurements for HVS to 64
* support for up to 5 HVS modules

### 1.3.0 (2021-11-06)
* updated even more dependencies
* official release with new state SOH

###

## License
MIT License

Copyright (c) 2023 Christian <github@familie-herrmann.de>

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