---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mediola-gateway/README.md
title: ioBroker.mediola-gateway
hash: Pj2+zNiC37sB2AmJD2qnS3hf1uQNa391exu/PkW0sHs=
---
![Logo](../../../en/adapterref/iobroker.mediola-gateway/admin/mediola-gateway.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.mediola-gateway.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.mediola-gateway.svg)
![Anzahl der Installationen](https://iobroker.live/badges/mediola-gateway-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/mediola-gateway-stable.svg)
![NPM](https://nodei.co/npm/iobroker.mediola-gateway.png?downloads=true)
![Test und Freigabe](https://github.com/oelison/ioBroker.mediola-gateway/workflows/Test%20and%20Release/badge.svg)

# IoBroker.mediola-gateway
## Mediola-Gateway-Adapter für ioBroker
Konfiguration und Nutzung von Mediola-Gateways

## Verwendung mit z.B. Mediola-Gateway V4/V5/V6
Wenn Sie nur ein Mediola Gateway (https://www.mediola.com/) verwenden, ist die automatische Erkennung der beste Einstieg. Die erkannte IP-Adresse und MAC-Adresse werden nach der Erkennung in den Protokollen angezeigt. Bei mehreren Mediola Gateways empfiehlt es sich, dem Adapter die MAC-Adresse zuzuweisen. Dadurch wird das jeweilige Gateway automatisch gefunden. Alternativ kann auch die IP-Adresse verwendet werden, sofern diese sich nicht ändert und besser bekannt ist als die MAC-Adresse.

Sobald der Adapter das Mediola Gateway gefunden hat, wird die Instanz grün angezeigt und die Objekte receivedIrData, sendIrData und sendRfData sind nutzbar. Systemvariablen des Mediola Gateways werden ebenfalls in der Objektliste aufgeführt. Nach einiger Zeit ändert sich hauptsächlich der Wert für receivedIrData. Dieser Wert repräsentiert die empfangenen IR-Daten im Raum, in dem sich das Mediola Gateway befindet.

Jede Änderung der Systemvariablen wird dort ebenfalls angezeigt und kann für die Automatisierung genutzt werden.
Die Funktion sendIrData wurde mit verschiedenen gelernten IR-Codes getestet. Einfach den IR-Code in das Objekt einfügen, um die Daten zu senden.

## Fehlerbehebung
Überprüfen Sie http://ip-of-mediola/command?XC_FNC=getstates\ Erwartetes Ergebnis: {XC_SUC}[...]\ Nicht erwartetes Ergebnis: {"XC_ERR":{"code":"000007","msg":"Zugriff verweigert"}} (nie auf Gateway V4 gesehen)\ Wenn dies funktioniert, haben Sie eine Mediola ohne festgelegtes Passwort. Es gibt keinen Hinweis darauf, warum der Adapter nicht funktionieren sollte. Kontaktieren Sie das Forum: https://forum.iobroker.net/topic/63560/neuer-adapter-mediola-gateway (Entschuldigung, es ist auf Deutsch, aber Englisch ist auch möglich). Mit Benutzername und Passwort oder Authentifizierungsschlüssel: Überprüfen Sie http://ip-of-mediola/command?XC_USER=username&XC_PASS=password&XC_FNC=getstates oder http://ip-of-mediola/command?auth=authkey&XC_FNC=getstates. Erwartetes Ergebnis: {XC_SUC}[...] Nicht erwartetes Ergebnis: {XC_ERR}{"code":"010000"}. Wenn dies funktioniert, müssen Benutzername und Passwort in der Konfiguration hinzugefügt werden. Wenn dies nicht funktioniert, haben Sie möglicherweise nicht den richtigen Benutzernamen und das richtige Passwort. Wenn Sie nur ein Passwort festgelegt haben, müssen Sie einen vollständigen Benutzer einrichten. (Gateway V6)

Überprüfen Sie http://ip-of-mediola/command?auth=authkey&XC_FNC=getstates\

## Verwendung für WIR (WR), Roto (BK) und Elero (ER) Sonnenschutzrollos
Diese Sonnenschutzrollos werden automatisch erkannt. Sie beginnen mit WR, BK oder ER. Der Adapter enthält zwei Ordner: „Status“ und „Aktion“.
Im Ordner „Status“ wird der Schließungsgrad von WR in Prozent angezeigt. Die Statuswerte für BK und ER sind immer leer (es wird nie ein anderer Wert angezeigt). Um den Status zu aktualisieren, muss in den Einstellungen der Adapterinstanz die Option „Status von Mediola lesen“ aktiviert sein. Das Aktualisierungsintervall kann in Minuten angepasst werden.
Im Ordner „Aktion“ können die Sonnenschutzrollos gesteuert werden. Zum Öffnen nach oben muss 1, zum Schließen 2 und zum Stoppen 3 eingegeben werden. Für WR können Sie die Werte 10, 20, 30, 40, 50, 60, 70, 80 und 90 senden, um einen Prozentsatz festzulegen.

## Verwendung für Nobily (NY/DY) Sonnenschutzrollos
Das ist etwas komplizierter. Die Geräte werden nicht automatisch erkannt. Sie müssen in den Expertenmodus wechseln! Falls noch nicht vorhanden, muss unter „mediola-gateway.0“ ein Ordner namens „action“ erstellt werden. In diesem Ordner fügen Sie einen Status „Datapoint“ vom Typ „String“ mit dem Namen „NY12345678“ oder „DY12345678“ hinzu. „NY“ oder „DY“ müssen in Großbuchstaben geschrieben werden. Die achtstellige Hexadezimalzahl erhalten Sie mit dem Debug-Tool des Konfigurationstools. Notieren Sie sich alle Zahlen im Abschnitt „group“.

### HAFTUNGSAUSSCHLUSS
Haftungsausschluss: Alle Produkt- und Firmennamen sowie Logos sind Marken oder eingetragene Marken ihrer jeweiligen Inhaber. Ihre Verwendung impliziert keine Zugehörigkeit oder Unterstützung durch diese oder verbundene Unternehmen! Dieses private Projekt wird aus reinem Vergnügen betrieben und verfolgt keine geschäftlichen Ziele. mediola ist eine Marke der mediola - connected living AG.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.3.0 (2026-06-05)

-   BK with self qualified direction (2 digits)
-   updates from deps
-   bumps
-   node 22 or higher is needed now
-   js-controller >= 6.0.11
-   admin >= 7.6.20

### 1.2.0 (2025-02-15)

-   Node 16 removed
-   some updates of libs
-   DY2 as 2DY added (Thanks to JEnsR)

### 1.1.0 (2024-01-21)

-   RT (Somfy) system added (Thanks to Falk)
-   DY (Nobily) system added (Thanks to BlindlyBlinds)
-   ER (Elero) system added (Thanks to CsL-007 [#35](https://github.com/oelison/ioBroker.mediola-gateway/issues/35))
-   HM (HomeMatic) read added (Thanks to drapo)
-   command and cmd calls possible

### 1.0.1 (2023-08-26)

-   folder action created as real folder
-   folder sysvars created as real folder

### 1.0.0 (2023-08-10)

-   user and password login to mediola
-   WIR system added (Thanks to Keulehd)
-   BK and NY system added (Thanks to line)
-   pull data added for not pushed states
-   sysvars are now in a folder (breaking change)

[Older changelogs can be found there](https://github.com/oelison/ioBroker.mediola-gateway/blob/main/CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 oelison <iobrokermediola@sciphy.de> (bots could use the mail, humans add a "2" before the @)

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