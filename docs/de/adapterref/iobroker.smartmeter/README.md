---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.smartmeter/README.md
title: ioBroker.smartmeter
hash: hdxd47p6kQRGA3KvXbIpGVgEuG3y8mNMpIlZQ4eyg3Q=
---
![Logo](../../../en/adapterref/iobroker.smartmeter/admin/smartmeter.png)

![Anzahl der Installationen](http://iobroker.live/badges/smartmeter-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.smartmeter.svg)
![Test und Freigabe](https://github.com/Apollon77/iobroker.smartmeter/workflows/Test%20and%20Release/badge.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/smartmeter/svg-badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.smartmeter.svg)

# ioBroker.smartmeter

**Dieser Adapter nutzt die Sentry-Bibliotheken, um mir als Entwickler automatisch Ausnahmen und Codefehler zu melden.** Weitere Details finden Sie unten!

Dieser Adapter für ioBroker ermöglicht das Lesen und Parsen von Smartmeter-Protokollen, die der OBIS-Nummernlogik folgen, um ihre Daten verfügbar zu machen.

_**Der Adapter benötigt Node.js 16.x oder höher, um zu funktionieren!**_

_**Für die Installation dieses Adapters muss Git installiert sein!**_

## Beschreibung der Parameter

ioBroker-Forum-Thread: <http://forum.iobroker.net/viewtopic.php?f=23&t=5047&p=54973>

### Datenprotokoll

Unterstützte Protokolle:

- **Sml** : SML (Smart Message Language) als Binärformat
- **D0** : D0 (basierend auf IEC 62056-21:2002/IEC 61107/EN 61107) als ASCII-Format (binärer Protokollmodus E wird derzeit nicht unterstützt)
- **Json-Efr** : OBIS-Daten vom EFR Smart Grid Hub (JSON-Format)

### Datenübertragung

- **Serieller Empfang** : Empfang von Daten per serieller Push-Übertragung (Smartmeter sendet Daten in regelmäßigen Abständen ohne Anfrage). Wird hauptsächlich für SML verwendet.
- **Serielle bidirektionale Kommunikation** : D0-Protokoll in den Modi A, B, C und D (Modus E wird derzeit NICHT unterstützt!) mit Wakeup-, Signon-, Pot. ACK- und Datennachrichten zum Auslesen von Daten (Programmier-/Schreibmodus bisher nicht implementiert)
- **HTTP-Anfragen** : Daten über HTTP lesen, indem eine definierte URL angefordert wird.
- **Lokale Dateien** : Daten aus einer lokalen Datei lesen

### Datenanforderungsintervall

Anzahl der Sekunden, die auf die nächste Anfrage gewartet oder der serielle Empfang pausiert werden soll; Wert 0 ermöglicht den direkten Neustart nach dem Abschluss einer Nachricht.

Standardwert: 300 (= 5 Minuten)

### Baudrate des seriellen Geräts

Baudrate für die erste serielle Verbindung; falls nicht definiert, werden Standardwerte pro Transporttyp verwendet (9600 für SerialResponseTransport und 300 für SerialRequestResponseTransport).

### D0: Anmeldenachrichtenbefehl

Befehl für die Anmeldenachricht, Standardwert "?", um Pflichtfelder abzufragen; andere Werte hängen vom Gerät ab. Beispiel: Das Wärmemessgerät 2WR5 verwendet "#", um deutlich mehr Daten abzufragen (optionale Felder zusammen mit allen Pflichtfeldern).

### D0: Modus-Überschreiben

Der Adapter versucht, den in den Spezifikationen definierten D0-Protokollmodus zu ermitteln. Einige Geräte entsprechen den Spezifikationen nicht und verursachen daher Probleme. Mit dieser Option können Sie den ermittelten Protokollmodus überschreiben.

- Modus A: keine Baudratenumschaltung, keine Bestätigungsnachricht
- Modus B: Baudratenumschaltung, keine Bestätigungsnachricht
- Modus C: Baudratenumschaltung und Bestätigungsnachricht erforderlich
- Modus D: Keine Baudratenumschaltung, Baudrate immer 2400
- Modus E: Baudratenumschaltung und Bestätigungsnachricht erforderlich, benutzerdefinierte Protokolle werden derzeit nicht unterstützt! Kontaktieren Sie mich, falls Sie einen solchen Smartmeter besitzen.

### D0: Baudratenwechsel-Überschreiben

Der Adapter versucht, die Baudrate für die Datennachrichten gemäß den Protokollspezifikationen zu ermitteln. Wie beim Modus liefern manche Smartmeter hier jedoch falsche Daten. Daher können Sie die Baudrate für die Datennachricht bei Bedarf überschreiben. Lassen Sie das Feld leer, um die vom Smartmeter definierte Baudratenumschaltung zu verwenden.

## Der Adapter wurde getestet mit ...

... mindestens:

- Hager eHz Energy Meter (mehrere, z. B. eHZ-IW8E2A5L0EK2P, EHZ363W5, )
- EMH-Energiezähler
- EFR SmartGridHub
- Siemens 2WR5 Lesegerät aus einer Wärmestation
- Elster AS1440
- Iskraemeco MT174
- Iskraemeco MT175
- Itron EM214 Typ 720
- Landis & Gyr E220
- Niederländischer Smart Meter mit DSRM-Protokoll (Verwendung von „Nur serielle Gerätelesedaten“ und „D0“ als Protokoll)
- DZG DWS7412.1T
  - _WICHTIG_ : Es scheint ein Firmware-Fehler vorzuliegen, der dazu führt, dass der aktuelle Energieverbrauch manchmal negativ wird! Eine manuelle Neuberechnung ist mithilfe der Formel unter <https://github.com/Apollon77/smartmeter-obis/issues/75#issuecomment-581650736> möglich. \* ... und viele weitere

Bitte senden Sie mir Informationen zu Geräten, auf denen Sie die Bibliothek erfolgreich verwendet haben, und ich werde sie hier hinzufügen.

## Spezielle Smartmeter und Probleme

### DZG DVS74

Es scheint sich gelegentlich um einen Fehler in der SML-Firmware zu handeln, wodurch Werte in der SML-Nachricht falsch kodiert werden, die Nachricht selbst aber gültig ist. Die Lösung besteht darin, den Wert mithilfe von JavaScript nachzubearbeiten. Siehe <https://github.com/Apollon77/smartmeter-obis/issues/75#issuecomment-581650736>

## Wie man Probleme und Funktionswünsche meldet

Bitte nutzen Sie hierfür die GitHub-Issues.

Am besten stellen Sie den Adapter auf Debug-Log-Modus ein (Instanzen -> Expertenmodus -> Spaltenprotokollierung). Laden Sie anschließend die Logdatei von Ihrer Festplatte herunter (Unterverzeichnis „log“ im ioBroker-Installationsverzeichnis, nicht aus dem Admin-Bereich, da dieser die Zeilen abschneidet). Falls Sie die Datei nicht in einem GitHub-Issue bereitstellen möchten, können Sie sie mir auch per E-Mail senden ( <iobroker@fischer-ka.de> ). Bitte fügen Sie einen Verweis auf das entsprechende GitHub-Issue hinzu und beschreiben Sie, welche Einträge in der Logdatei zu welchem Zeitpunkt angezeigt werden.

## Was ist Sentry und was wird an die Server gemeldet?

Sentry.io ermöglicht Entwicklern einen Überblick über Fehler in ihren Anwendungen. Genau dies wird in diesem Adapter implementiert.

Wenn der Adapter abstürzt oder ein anderer Codefehler auftritt, wird diese Fehlermeldung, die auch im ioBroker-Protokoll erscheint, an unseren Sentry-Server in Deutschland übermittelt. Wenn Sie der iobroker GmbH die Berechtigung zur Erfassung von Diagnosedaten erteilt haben, wird auch Ihre Installations-ID (eine eindeutige ID **ohne** weitere Informationen wie E-Mail-Adresse, Name usw.) übermittelt. Dadurch kann Sentry Fehler gruppieren und die Anzahl der betroffenen Benutzer anzeigen. All dies hilft mir, fehlerfreie Adapter bereitzustellen, die praktisch nie abstürzen.

## Changelog
### 3.4.0 (2023-11-25)
* IMPORTANT: This version requires at least Node.js 16+
* (Apollon77) Prevent some crash cases

### 3.3.4 (2022-03-11)
* (Apollon77) Restore functionality of Port list in Admin

### 3.3.3 (2022-02-21)
* IMPORTANT: This version requires at least Node.js 12.17+ (excluding non LTS like 13.x)
* (Apollon77) Prevent some crash cases

### 3.2.1 (2021-05-09)
* (Apollon77) Optimize for js-controller 3.3

### 3.2.0 (2021-01-24)
* (Apollon77) Add new protocolSmlInputEncoding option for SML protocol. With this also ascii or base64 based encodings (e.g. with TCP transports) are possible.

### 3.1.9 (2021-01-22)
* (Apollon77) optimize stop handling (Sentry IOBROKER-SMARTMETER-10)

### 3.1.8 (2021-01-14)
* (Apollon77) prevent last warnings with js-controller 3.2

### 3.1.7 (2021-01-13)
* (Apollon77) prevent warnings with js-controller 3.2
* (Apollon77) update js-controller dependency to at least require js-controller 2.0.0

### 3.1.6 (2020-11-15)
* (Apollon77) update OpenSML lib to support Holley DTZ541 wrongly implemented CRC Algorithm

### 3.1.5 (2020-09-21)
* (Apollon77) update dependencies to prevent some crash cases and optimize tcp mode

### 3.1.3 (2020-07-20)
* (Apollon77) update dependencies to prevent some crash cases

### 3.1.2 (2020-04-12)
* (Apollon77) catch errors when no memory is available anymore and stop processing

### 3.1.1 (2020-03-11)
* (Apollon77) fix admin when switching to TCPTransport
* (Apollon77) bugfixes and optimizations

### 3.1.0 (2020-03-08)
* (Apollon77) bugfixes and optimizations
* (Apollon77) experimental TCP support, please give feedback

### 3.0.10 (2020-02-05)
* (Apollon77) make sure HTTP based smartmeters are also polled frequently when responses are invalid
* (Apollon77) other optimizations
* (Apollon77) Switch Sentry to iobroker own instance hosted in germany

### 3.0.8 (2019-12-20)
* (Apollon77) errors prevented when stopping to process data

### 3.0.7 (2019-12-18)
* (Apollon77) errors prevented when stopping to process data

### 3.0.6 (2019-12-07)
* (Apollon77) serial port configuration further optimized
* (Apollon77) update smartmeter-obis lib to fix some edge case errors and serial close handling

### 3.0.3 (2019-11-30)
* (Apollon77) serial port configuration further optimized

### 3.0.2 (2019-11-29)
* (Apollon77) Fix use of "/dev/serial/by-id" paths on linux if available

### 3.0.1 (2019-11-27)
* (Apollon77) BREAKING CHANGE: Supports nodejs 8.x+ only, up to 12.x
* (Apollon77) support compact mode
* (Apollon77) update to latest library versions to fix problems and add special handling for some smart meters with broken firmware
* (Apollon77) Use "/dev/serial/by-id" paths on linux if available; add port selection to Admin
* (Apollon77) Add Sentry for error reporting

### 2.0.0 (2019-03-22)
* (Apollon77) BREAKING CHANGE: State names changed because * no longer supported. Is replaced by __ now because of possible collisions in state names with only one _

### 1.2.2 (2018-11-11)
* Update smartmeter library, fix HTTP-JSON-Transport

### 1.2.1 (2018-06-23)
* BREAKING CHANGE: State names changed because * no longer supported. Is replaced by _

### 1.1.3 (2018-04-13)
* Fix Admin

### 1.1.2 (26.03.2018)
* Add better support for devices with more then 16 values (OpenSML Library upgrade)

### 1.1.0 (31.01.2018)
* Allow multiple queries for D0 and Serial-Bidirectional communication
* a lot of bugfixing and Optimizations
* Switch to SerialPort 6.0.4 to hopefully get more stable (less/no SIGSEGV/SIGABRT ...)

### 1.0.0 (25.08.2017)
* Update smartmeter library and fix some timing issues

### 0.5.12 (23.07.2017)
* update SML library

### 0.5.11 (21.06.2017)
* optimize D0 handling and add support for Dutch smartmeter using DSRM protocol.

### 0.5.8 (06.04.2017)
* optimize Serial handling on Windows (because pause and resume are not supported there)

### 0.5.6 (02.04.2017)
* update library

### 0.5.5 (19.03.2017)
* improved baudrate-changeover logic for D0 protocol (now hopefully finally)
* enhanced D0 protocol support for multiple values

### 0.5.0 (26.02.2017)
* maintenance update

### 0.4.2 (27.02.2017)
* one last try to fix the crashes SIGABRT/SIGSEGV

### 0.4.1 (24.02.2017)
* Fix potential hanging communication with D0 Serial

### 0.4.0 (23.02.2017)
* Optimize for D0 Message handling and baudrate changeovers

### 0.3.2 (22.02.2017)
* Optimize D0 protocol handling for mode E

### 0.3.1 (12.02.2017)
* Finalize Adapter config and added some informations

### 0.3.0 (11.02.2017)
* We now should be quiet stable

### 0.1.1
* Update smartmeter-obis library to 0.2.5 to add Serial Timeout for Request/Response protocol

### 0.1.0
* Initial version for public testing

### 0.0.1
* Initial version for internal testing

## License

The MIT License (MIT)

Copyright (c) 2017-2023 Apollon77 <ingo@fischer-ka.de>

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