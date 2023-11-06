---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.wled/README.md
title: ioBroker.wled
hash: VTksfi1/AiTQrA42JyJUFQycy0eZ5oh1cQtDRG20hgw=
---
![Logo](../../../en/adapterref/iobroker.wled/admin/wled_logo_akemi.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.wled.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.wled.svg)
![Anzahl der Installationen](https://iobroker.live/badges/wled-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/wled-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/DrozmotiX/iobroker.wled.svg)
![NPM](https://nodei.co/npm/iobroker.wled.png?downloads=true)

# IoBroker.wled
**Tests:** ![Test und Freigabe](https://github.com/DrozmotiX/iobroker.wled/workflows/Test%20and%20Release/badge.svg)

**Dieser Adapter nutzt den Dienst [Sentry.io](https://sentry.io), um mir als Entwickler automatisch Ausnahmen und Codefehler und neue Geräteschemata zu melden.** Weitere Details siehe unten!

## WLED-Adapter für ioBroker
Eine schnelle und funktionsreiche Implementierung eines ESP8266/ESP32-Webservers zur Steuerung von NeoPixel-LEDs (WS2812B, WS2811, SK6812, APA102) oder auch SPI-basierten Chipsätzen wie dem WS2801!

[WLED – Github-Projekt](https://github.com/Aircoookie/WLED) von @Aircoookie

## Anweisungen
Der Adapter versucht mithilfe von Bonjour-Diensten automatisch, WLED-Geräte in Ihrem Netzwerk zu finden.
Bekannte Probleme: Netzwerke mit VLAN-Trennung leiten Broadcast-Verkehr meist nicht weiter, was bedeutet, dass die automatische Erkennung fehlschlägt.

Keine Sorge, in diesem Fall können Sie das Gerät manuell über die IP-Adresse hinzufügen.

1) Stellen Sie sicher, dass Ihr WLED-Gerät läuft und über das Netzwerk erreichbar ist. 2) Installieren Sie den Adapter. 3) Konfigurieren Sie Intervallzeiten für Datenabfragen und automatische Erkennungszyklen. 4 – A) Starten Sie den Adapter. Geräte sollten automatisch erkannt werden. 4 – B) Wenn A fehlschlägt , verwenden Sie die Schaltfläche „Gerät hinzufügen“ und geben Sie die IP-Adresse des Geräts an. 5) Der Adapter sendet Änderungen sofort und fragt alle x Sekunden Daten ab (konfigurierbar).

## Unterstütze mich
Wenn Ihnen meine Arbeit gefällt, können Sie gerne eine persönliche Spende leisten (dies ist ein persönlicher Spendenlink für DutchmanNL, kein Bezug zum ioBroker-Projekt!) [![Spenden](https://raw.githubusercontent.com/DrozmotiX/ioBroker.wled/main/admin/button.png)](http://paypal.me/DutchmanNL)

## Was ist Sentry.io und was wird an die Server dieses Unternehmens gemeldet?
Sentry.io ist ein Dienst für Entwickler, um einen Überblick über Fehler in ihren Anwendungen zu erhalten. Und genau das ist in diesem Adapter umgesetzt.

Wenn der Adapter abstürzt oder ein anderer Codefehler auftritt, wird diese Fehlermeldung, die auch im ioBroker-Protokoll erscheint, an Sentry übermittelt. Wenn Sie der iobroker GmbH erlaubt haben, Diagnosedaten zu sammeln, ist auch Ihre Installations-ID (dies ist nur eine eindeutige ID **ohne** zusätzliche Informationen über Sie, E-Mail, Name oder ähnliches) enthalten. Dadurch kann Sentry Fehler gruppieren und anzeigen, wie viele einzelne Benutzer von einem solchen Fehler betroffen sind. All dies hilft mir, fehlerfreie Adapter bereitzustellen, die praktisch nie abstürzen.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### 0.7.2 (2023-10-31) - Improve online visibility of devices
* (DutchmanNL) Show online state of device in object tree
* (DutchmanNL) Bugfix: Update online state correctly in situation connection is lost, fixes #611
* (DutchmanNL) Reset brightness to 0 and on to false during adapter start and if a device disconnects, fixes #565

### 0.7.1 (2023-10-02)
* several fixes by [HaggardFFM](https://github.com/HaggardFFM) fixes #479, #423
* (DutchmanNL) missing state attribute definitions added
* implement white color channel by [HaggardFFM](https://github.com/HaggardFFM), fixes #306, #306
* (DutchmanNL) Removed error message if definitions are missing, no impact on functionality

### 0.6.7 (2022-06-08) - Bugfix [#400](https://github.com/DrozmotiX/ioBroker.wled/issues/400)
* (DutchmanNL) Bugfix: Cannot read property 'initialized' of undefined handleStates solved [#400](https://github.com/DrozmotiX/ioBroker.wled/issues/400)

### 0.6.6 (2022-06-08) - Log messages and error reporting improved
* (DutchmanNL) Log messages and error reporting improved
* (DutchmanNL) Don't send missing attribute definitions to Sentry

### 0.6.5 (2022-06-04) - Correct indication of connection state
* (DutchmanNL) Dependency updates
* (DutchmanNL) Bugfix: Correct indication of connection state #307
* (DutchmanNL) Improve error messages & sentry reporting

## License
MIT License

Copyright (c) 2023 DutchmanNL <oss@drozmotix.eu>

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