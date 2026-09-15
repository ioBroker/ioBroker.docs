---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.comfoair/README.md
title: ioBroker.comfoair
hash: emLTIXM6cI4M6yUZOJdK/gDE1605fka1uUkRiM0dmNk=
---
![Logo](../../../en/adapterref/iobroker.comfoair/admin/comfoair.png)

![Anzahl der Installationen](http://iobroker.live/badges/comfoair-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.comfoair.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.comfoair.svg)
![NPM](https://nodei.co/npm/iobroker.comfoair.png?downloads=true)

# ioBroker.comfoair

## Posten

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## ioBroker-Adapter für Zehnder Comfoair

Dies ist ein ioBroker-Adapter für Zehnder Comfoair 'CA'-Lüftungsgeräte (d. h. ComfoAir CA350, NICHT ComfoAir Q350...).

## Verbindung

### Per IP / LAN

Verwenden Sie einen RS232-zu-LAN- oder WLAN-Konverter, um ioBroker mit Ihrem Zehnder Comfoair zu verbinden. Installieren Sie die Hardware für die TCP-Verbindung zum Comfoair: d. h. den RS232-zu-LAN-Adapter an die serielle Schnittstelle des Comfoair. Verbinden Sie nur die Pins 2, 3 und 5 (sollte auch mit TX, RX und GND – den Kontakten des cc-Ease-Anschlusses – funktionieren).

### Serielle Verbindung

Verbinden Sie die serielle Schnittstelle Ihres Computers mit der seriellen Schnittstelle des Geräts, auf dem ioBroker ausgeführt wird. Verwenden Sie dazu beispielsweise ein RS232-zu-USB-Kabel oder einen RS232-zu-TTL-Adapter, um eine Verbindung zu den UART-Pins des Raspberry Pi herzustellen.

## Konfiguration

Wählen Sie Ihren bevorzugten Verbindungsmodus (IP oder seriell), legen Sie die comfoair - IP-Adresse und den Port fest oder geben Sie Ihr serielles Gerät an, definieren Sie einen (RS232) comfoair Verbindungsmodus (siehe 'Adapter & CC Ease') und legen Sie ein Abfrageintervall fest.

## Adapter & CC Ease

Generell wird davon abgeraten, Daten von zwei Sendern an einen Empfänger über die serielle RS232-Schnittstelle zu senden. Die parallele Nutzung von CCEase und Adapter kann zu Fehlern oder im schlimmsten Fall zu Schäden an Ihrer ComfoAir-Steuerung führen! Trennen Sie daher CCEase, bevor Sie den ComfoAir-Adapter starten, da es sonst deaktiviert wird. Die ComfoAir-Steuerung selbst kennt vier verschiedene RS232-Modi: CCEaseonly, PConly, PCMaster und PCLogmode. In den Modi PConly und PCMaster ist CCEase deaktiviert. In der Konfiguration können Sie einen der folgenden Verbindungsmodi auswählen. Bitte wählen Sie nur einen aus! Sobald der Adapter im Modus „Nur Adapter“ oder im Parallelmodus läuft, können Sie den RS232-Modus der ComfoAir-Steuerung ändern (was nicht empfohlen wird, da jeder Verbindungsmodus einen spezifischen RS232-Modus erfordert!).

### Nur Adapter

CC Ease ist getrennt (empfohlen) oder wird beim Start des Adapters heruntergefahren. Sie können Ihr Comfoair nur mit ioBroker steuern (RS232-Modus: PCMaster). Dieser Modus ist standardmäßig aktiviert und wird empfohlen.

### Nur Zuhören

Der Adapter empfängt die Daten von comfoair oder CC Ease. CC Ease ist aktiv, der Adapter kann keine Befehle senden. In diesem Modus werden nur grundlegende Werte (Temperaturen, Lüftungszustände) angezeigt. Da keine Kommunikation zwischen Adapter und comfoair stattfindet, besteht in diesem Modus auch kein Risiko für Kommunikationsfehler oder -schäden.

### Parallelmodus

CC Ease und der Adapter sind aktiv. Der ComfoAir-RS232-Modus ist auf „PCLogmode“ eingestellt. Der Adapter überwacht grundlegende Werte (Temperaturen, Lüftungsstufen) und fragt weitere Werte (Fehler, Filtertimer) ab. Um Kommunikationsfehler zu minimieren, empfiehlt sich ein verlängertes Abfrageintervall. Sie können Ihr ComfoAir-System mit ioBroker und der CC Ease-Einheit steuern. Vor dem Senden eines Befehls (einschließlich Abfrage) wird der RS232-Modus auf „PC Master“ umgeschaltet. Mit jedem Befehl wird zusätzlich eine Abfrage durchgeführt. Tests haben gezeigt, dass der Betrieb auch im Parallelbetrieb über einen längeren Zeitraum fehlerfrei verläuft. Die Nutzung dieses Modus erfolgt jedoch auf eigene Gefahr.

### Parallelmodus im konstanten PC-Logmodus

Einige Nutzer haben positive Erfahrungen mit dem dauerhaften Betrieb des Comfoair im PC-Logmodus gemacht. Dieser Modus bietet die gleichen Funktionen wie der reine Adaptermodus, jedoch mit laufendem CC Ease. Wichtig: Die Nutzung dieses Modus erfolgt auf eigene Gefahr.

## Verwendung des Adapters

Die Werte Ihres Comfoair sollten im Kanal „Status“ und „Temperaturen“ sichtbar sein. Bitte aktualisieren Sie die Objektansicht nach dem Ändern des Verbindungsmodus.

Durch Einstellen/Ändern von Werten im Kanal „control“ steuern Sie Ihre Comfoair-Lüftung. Alle Werte im Kanal „control“ müssen mit ACK=false gesetzt werden, damit sie vom Adapter als Befehle erkannt werden.

Boost-Modus: Boost-Zeit einstellen und starten. Die Belüftung kehrt nach Ablauf der Boost-Zeit zum vorherigen Wert zurück. Die Rückkehr wird abgebrochen, wenn der Belüftungswert während der Boost-Zeit geändert wird.

Getestet auf Comfoair CA350.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now

### 1.3.0 (2026-02-23)
- (mcm1957) Adapter requires node.js >=20 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (mcm1957) Dependencies have been updated
- (copilot) **CI/CD**: Migrated to ESLint 9 and @iobroker/eslint-config

### 1.2.2 (2024-04-24)

* (mcm1957) The dependency requirements have been corrected
* (mcm1957) Some dependencies have been updated

### 1.2.0 (2024-04-14)

* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 1.1.9 (2024-03-08)

-   (mcm1957) German title of adapter has been corrected
-   (mcm1957) Dependencies have been updated

### 1.1.8

-   boost-error fixed (sentry)

## License

The MIT License (MIT)

Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2023-2025 forelleblau marceladam@gmx.ch

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.