---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.bydhvs/README.md
title: ohne Titel
hash: 6rJsGMiwPDh+TVJW6fkrBhq0iv+bPoQEMAMO0zfJzWU=
---
![Logo](../../../en/adapterref/iobroker.bydhvs/admin/bydhvs.png)

## Bydhvs-Adapter für ioBroker
Umfragedaten zur BYD HVS-Batterie

## Einführung
Dieser Adapter nimmt Daten von einer BYD-PV-Batterie ( https://www.bydbatterybox.com/ ) und legt sie in Datenpunkte im Adapter ab. Leider gibt es keine offizielle API und keine Dokumentation, also habe ich Wireshark und einen BYD-HVS-Simulator verwendet, um zu versuchen, die Kommunikation zu verstehen. Mein Adapter simuliert die BYD-App, sendet ähnliche Pakete an das Gerät und analysiert die Antworten.

## Seien Sie vorsichtig
Die beConnect-App besteht aus zwei Schritten: Im ersten Schritt erhält man die normalen Daten, im zweiten Schritt erhält man Detaildaten für alle Zellen (Temperatur und Spannung einzelner Zellen und einige weitere Details). Um die Detaildaten zu erhalten, muss es nach einem der Datenpakete eine Verzögerung geben, bis ich das Ergebnis erhalten kann. Ich glaube, in der Zwischenzeit sind alle Zellen gemessen, aber ich bin mir nicht sicher. Ich bin mir definitiv nicht sicher, ob Sie Ihrer Batterie schaden, wenn Sie diese Daten zu oft abfragen, also seien Sie sich bewusst: Sie handeln auf eigene Gefahr!

## Unterstützung für bis zu 5 Module
Es werden jetzt bis zu 5 HVS-Module unterstützt.

## Einstellungen
Intervall: Ganz einfach: wie oft sollen die Daten abgefragt werden? IP-Adresse: Das ist selbsterklärend. Entweder du nimmst die Standardadresse ( 192.168.16.254 ) und änderst das Routing zuhause, z.B.: https://www.photovoltaikforum.com/thread/150898-byd-hvs-firmware-update/?postID=2215343#post2215343 . Der Vorteil ist: Die beConnect App funktioniert auch. Andere Möglichkeit: Du änderst die IP-Adresse der Box. Aber: Achtung: der Text auf der Webseite ist verwirrend und wenn du dir nicht ganz sicher bist: BITTE die Einstellungen nicht anfassen. In den deutschen Foren habe ich von Leuten gelesen, die aus ihrem System ausgesperrt wurden und es gibt keinen Weg zurück, entweder schickt dir byd eine Ersatz-HVU oder du musst eine neue kaufen.
Batteriedetails: Wie oben erklärt: Brauchst du die Details der Batterie? Wenn ja: setze das Kontrollkästchen.
Batteriedetails - alle ... Zyklen: Auch wie oben, sollte klar sein Testmodus - Daten im Fehlerprotokoll anzeigen: Wenn du dieses Kontrollkästchen aktivierst: werden die gesendeten und empfangenen Daten im Fehlerprotokoll angezeigt, sodass du die Daten einfach herunterladen und mir im Fehlerfall senden kannst.
Kopieren und Einfügen funktioniert nicht - die Daten werden am Ende abgeschnitten. Du musst sie herunterladen, bevor du sie mir senden kannst.

[Link zur nativen deutschen Readme:](README-German.md)

## **IN ARBEIT**
* erste Version mit zwei Türmen im NPM

### 1.5.1 (15.01.2024)
* Ermöglicht das Abrufen von Informationen aus einem Zwei-Turm-Setup
* WICHTIGE ÄNDERUNG der Struktur.

### 1.5.0 (04.11.2023)
* Wesentliche Änderung: Mindestens Node.js 16 erforderlich
* Automatische Prüfungen und Release-Skript repariert (danke an mcm1957, er hat die Arbeit gemacht)
* ansonsten nichts im Code geändert

### 1.4.2 (28.09.2023)
* Tippfehler in der Versionsnummer entfernt

### 1.4.1 (24.09.2023)
* Kompatibilität mit js.controller 5x
* Einige Fehler bei der Wechselrichtererkennung behoben
* Die Wechselrichternummer wird protokolliert, sodass ich bei Bedarf problemlos neue Wechselrichter hinzufügen kann. Senden Sie mir einfach das Silly-Log, wenn der Wechselrichter unbekannt ist.

### 1.4.0 (31.10.2022)
* Aktualisierung der genannten Module (vor allem im Bereich Tests)
* Verbesserungen von Tapter (5 Module, Readme und besser lesbarer Code)
* Bessere Erkennung von Batterietyp und Wechselrichter
* SOC nicht nur aus Normaldaten, sondern auch aus Diagnosedaten. Da haben wir eine Dezimalstelle mehr
* Frequenzbegrenzung für Batteriedetaildaten entfernt
* Maximale Anzahl der Temperaturmessungen für HVS auf 64 erhöht
* Unterstützung für bis zu 5 HVS-Module

### 1.3.0 (06.11.2021)
* noch mehr Abhängigkeiten aktualisiert
* offizielle Veröffentlichung mit neuem Status SOH

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