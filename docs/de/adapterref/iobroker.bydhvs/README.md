---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.bydhvs/README.md
title: kein Titel
hash: XDgN8jFQAHHQEHMq7lcxT7JcSKDWP9ssqrlWB+z8oTc=
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

## **IN ARBEIT**
* erste Version mit zwei Türmen in NPM

### 1.5.1 (15.01.2024)
* Aktivieren Sie die Möglichkeit, Informationen von einem Zwei-Turm-Aufbau abzurufen
* BRANDVERÄNDERUNG DER STRUKTUR.

### 1.5.0 (04.11.2023)
* Breaking Change: mindestens NodeJS 16 erforderlich
* automatisierte Prüfungen und Release-Skript repariert (danke an mcm1957, er hat die Arbeit erledigt)
* Ansonsten hat sich am Code nichts geändert

### 1.4.2 (28.09.2023)
* Tippfehler in der Versionsnummer entfernt

### 1.4.1 (24.09.2023)
* Kompatibilität mit js.controller 5x
* Einige Fehler bei der Wechselrichtererkennung wurden behoben
* Die Wechselrichternummer wird protokolliert, sodass ich bei Bedarf problemlos neue Wechselrichter hinzufügen kann. Senden Sie mir einfach das Silly-Log, wenn der Wechselrichter unbekannt ist.

### 1.4.0 (2022-10-31)
* Aktualisierung der genannten Module (hauptsächlich rund um das Testen)
* von Tapter beigesteuerte Verbesserungen (5 Module, Readme und besser lesbarer Code)
* Bessere Erkennung von Batterietyp und Wechselrichter
* SOC nicht nur aus Normaldaten, sondern auch aus Diagnosedaten. Da haben wir eine Dezimalstelle mehr
* Häufigkeitsbegrenzung für Batteriedetaildaten entfernt
* Die maximale Anzahl von Temperaturmessungen für HVS wurde auf 64 erhöht
* Unterstützung für bis zu 5 HVS-Module

### 1.3.0 (06.11.2021)
* Noch mehr Abhängigkeiten aktualisiert
* offizielle Veröffentlichung mit neuem staatlichen SOH

###

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->

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