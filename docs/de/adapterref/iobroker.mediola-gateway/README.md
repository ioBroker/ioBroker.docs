---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mediola-gateway/README.md
title: ioBroker.mediola-gateway
hash: ZbXps5bi5Ycj0fEoRzrSrqUtuLCPQQ35384m/3FDP9Q=
---
![Logo](../../../en/adapterref/iobroker.mediola-gateway/admin/mediola-gateway.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.mediola-gateway.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.mediola-gateway.svg)
![Anzahl der Installationen](https://iobroker.live/badges/mediola-gateway-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/mediola-gateway-stable.svg)
![NPM](https://nodei.co/npm/iobroker.mediola-gateway.png?downloads=true)

# IoBroker.mediola-gateway
**Tests:** ![Test und Freigabe](https://github.com/oelison/ioBroker.mediola-gateway/workflows/Test%20and%20Release/badge.svg)

## Mediola-Gateway-Adapter für ioBroker
Konfiguration und Nutzung von Mediola-Gateways

## Verwendung mit z.B. Mediola-Gateway V4/V5/V6
Wenn Sie nur ein Mediola Gateway (https://www.mediola.com/) haben, ist die automatische Erkennung der beste Einstieg. In den Protokollen ist die erkannte IP-Adresse und MAC-Adresse nach der Erkennung sichtbar. Wenn Sie mehr als ein Mediola Gateway haben, ist es besser, dem Adapter die MAC-Adresse zu geben. Dann wird dieses spezifische Gateway gefunden. Es ist auch möglich, die IP-Adresse zu verwenden, wenn diese sich nicht ändert und besser bekannt ist als die MAC-Adresse.
Nachdem der Adapter das Mediola Gateway gefunden hat, wird die Instanz grün und die Objekte „receiveIrData“, „sendIrData“ und „sendRfData“ sind verwendbar. Wenn Sie Systemvariablen im Mediola Gateway haben, werden diese auch in der Objektliste aufgeführt. Nach einiger Zeit ändern sich hauptsächlich die empfangenen IrData. Dies stellt das empfangene IR-Datum in dem Raum dar, in dem sich das Mediola Gateway befindet.
Dort wird auch jede Änderung der Systemvariablen angezeigt und kann zur Automatisierung genutzt werden.
Die sendIrData werden mit mehreren gelernten IR-Codes getestet. Geben Sie einfach den IR-Code in das Objekt ein, um die Daten zu senden.

## Verwendung für Sonnenschutzrollos WIR (WR) und Roto (BK).
Diese Sonnenschutzrollos werden automatisch gefunden. Sie beginnen mit WR oder BK. Es gibt zwei Ordner im Adapter. Das eine wird Zustand genannt, das andere Aktion.
Im Status wird der WR-Status in Prozent der Schließung angezeigt. Der BK-Status ist immer leer (es wurde nie ein anderer Wert gesehen). Um den Status zu aktualisieren, muss in den Adapterinstanzeinstellungen das Flag „Status von Mediola lesen“ gesetzt werden. Das Aktualisierungsintervall kann in Minuten eingestellt werden.
Im Aktionsordner konnten die Sonnenschutzrollos gesteuert werden. Für die Aufwärtsbewegung muss eine 1 geschrieben werden, für die Abwärtsbewegung eine 2 und für einen Stopp eine 3. Für WIR können Sie 10, 20, 30, 40, 50, 60, 70, 80 und 90 senden, um einen Prozentsatz festzulegen.

## Verwendung für Nobily (NY) Sonnenschutzrollos
Das ist tatsächlich etwas kompliziert. Die Geräte werden nicht automatisch erkannt. Sie müssen in den Expertenmodus wechseln! Falls noch nicht vorhanden, muss unter „mediola-gateway.0“ ein Ordner „action“ erstellt werden. In diesem Ordner müssen Sie einen Status „Datapoint“ mit dem Typ string und dem Namen „NY12345678“ hinzufügen. „NY“ muss in Großbuchstaben geschrieben sein und die Hexadezimalzahl mit 8 Zeichen muss aus dem Debug-Tool des Konfigurationstools stammen. Nehmen Sie alle Nummern, die Sie im Gruppenbereich finden.

### HAFTUNGSAUSSCHLUSS
HAFTUNGSAUSSCHLUSS Alle Produkt- und Firmennamen oder Logos sind Marken™ oder eingetragene® Marken ihrer jeweiligen Eigentümer. Ihre Verwendung impliziert keine Zugehörigkeit oder Billigung durch sie oder verbundene Partner! Dieses persönliche Projekt wird auf Freizeitbasis verfolgt und hat keine geschäftlichen Ziele. mediola ist eine Marke der mediola – connected Living AG.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 1.0.0 (2023-08-10)

-   user and password login to mediola
-   WIR system added (Thanks to Keulehd)
-   BK and NY system added (Thanks to line)
-   pull data added for not pushed states
-   sysvars are now in a folder (breaking change)

### 0.1.4 (2023-05-20)

-   axios with log error on error
-   ack true for readonly objects
-   ack check on state change
-   invalid chars checked

### 0.1.3 (2023-05-18)

-   test and release script corrected

### 0.1.2 (2023-05-18)

-   npm deploy activated
-   Readme improved

### 0.1.1 (2023-05-11)

-   dependencies update

### 0.1.0 (2023-05-03)

-   initial release
-   send ir (only IR_ID 01 front IR)
-   reveive ir

## License

MIT License

Copyright (c) 2023 oelison <iobrokermediola@sciphy.de>

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