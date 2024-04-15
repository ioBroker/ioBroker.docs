---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.comfoair/README.md
title: ioBroker.comfoair
hash: 6p3kCLVVzilY/rhsudJNUVqqhuVsPsXcjbbzJWX0n+Q=
---
![Logo](../../../en/adapterref/iobroker.comfoair/admin/comfoair.png)

![Anzahl der Installationen](http://iobroker.live/badges/comfoair-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.comfoair.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.comfoair.svg)
![NPM](https://nodei.co/npm/iobroker.comfoair.png?downloads=true)

# IoBroker.comfoair
## Wachposten
**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## IoBroker-Adapter für Zehnder Comfoair
Dies ist ein ioBroker-Adapter für Zehnder Comfoair „CA“-Lüftungsanlagen (z. B. ComfoAir CA350, NICHT ComfoAir Q350 …).

## Verbindung
### Per IP / LAN
Verwenden Sie einen RS232-zu-LAN- oder WiFi-Konverter, um ioBroker mit Ihrem Zehnder Comfoair zu verbinden.
Installieren Sie Hardware für TCP-Verbindung zu Comfoair: z. B. RS232-zu-LAN-Adapter an die serielle Schnittstelle des Comfoair. Verbinden Sie nur die Pins 2, 3 und 5 (sollte auch mit TX-, RX- und GND-Kontakten der cc-Ease-Verbindung funktionieren).

### Serielle VERBINDUNG
Verbinden Sie die serielle Schnittstelle Ihres Comfoair mit einer seriellen Schnittstelle des Geräts, auf dem ioBroker läuft. Verwenden Sie beispielsweise ein RS232-zu-USB-Kabel oder einen RS232-zu-TTL-Adapter, um die Verbindung zu den UART-Pins des Raspberry Pi herzustellen.

## Konfiguration
Wählen Sie Ihren bevorzugten Verbindungsmodus (IP oder seriell), stellen Sie die Comfoair-IP-Adresse und den Port ein oder geben Sie Ihr serielles Gerät an, definieren Sie einen (RS232) Comfoair-Verbindungsmodus (siehe „Adapter & CC Ease“) und definieren Sie ein Polling-Intervall.

## Adapter und CC-Einfachheit
Generell ist es nicht empfehlenswert, bei der seriellen RS232-Kommunikation Daten von 2 Sendern an einen Empfänger zu senden. Die parallele Verwendung von CCEase und Adapter kann zu Fehlern oder im schlimmsten Fall zu Schäden an Ihrer ComfoAir-Steuerung führen! Daher sollte beim Starten des ComfoAir-Adapters Ihre CC-Ease getrennt sein bzw. wird heruntergefahren.
Die ComfoAir selbst kennt 4 verschiedene RS232-Modi: CCEaseonly, PConly, PCMaster, PCLogmode. In PConly und PCMaster ist CC-Ease ausgeschaltet.
In der Instanzkonfiguration können Sie einen der folgenden Verbindungsmodi auswählen. Bitte nur einen davon ankreuzen! Sobald der Adapter im Adapter-Only- oder Parallelmodus läuft, können Sie den RS232-Modus der ComfoAir umschalten (was nicht empfohlen wird, da ein bestimmter Verbindungsmodus einen bestimmten RS232-Modus erfordert!).

### Nur Adapter
CC Ease ist getrennt (empfohlen) oder wird heruntergefahren, wenn der Adapter startet. Sie können Ihren Comfoair nur mit ioBroker steuern (rs232mode ist PCMaster). Dieser Modus ist Standard und wird empfohlen.

### Nur zuhören
Der Adapter fängt die Daten ab, die vom comfoair oder CC Ease gesendet werden. CC Ease läuft, es können keine Befehle vom Adapter gesendet werden. In diesem Modus erhalten Sie nur einen Basissatz an Werten (Temperaturen, Lüftungszustände). In diesem Modus besteht auch keine Gefahr von Kommunikationsfehlern/-schäden, da keine Kommunikation vom Adapter zum comfoair stattfindet.

### Parallelmodus
CC Ease und Adapter laufen. Der ComfoAir RS232-Modus ist auf „PCLogmode“ eingestellt. Der Adapter „hört“ auf grundlegende Werte (Temperaturen, Lüftungsstufen) und fragt andere ab (Fehler, Filtertimer). Stellen Sie ein verlängertes Abfrageintervall ein, um das Risiko von Kommunikationsfehlern zu verringern. Sie können Ihr ComfoAir mit ioBroker und mit der CC Ease-Einheit steuern. Bevor ein Befehl gesendet wird (Polling inbegriffen), wird der RS232-Modus auf PC Master umgeschaltet. Mit jedem gesendeten Befehl wird auch ein Polling durchgeführt. Tests haben einen fehlerfreien Parallelbetrieb über einen längeren Zeitraum gezeigt. Aber: Sie führen diesen Modus auf eigene Gefahr aus.

### Parallelmodus im konstanten PC-Logmodus
Einige Benutzer haben positive Erfahrungen damit gemacht, den comfoair dauerhaft im PC-Logmodus laufen zu lassen. Dieser Modus bietet dieselben Funktionen wie der Adapter-Only-Modus, allerdings mit laufendem CC Ease. Aber: Sie führen diesen Modus auf eigene Gefahr aus.

## Verwenden des Adapters
Die Werte Ihres Comfoair sollten im Kanal „Status“ und „Temperaturen“ sichtbar sein. Bitte aktualisieren Sie die Objektansicht nach dem Ändern des Verbindungsmodus.

Durch das Setzen/Ändern von Werten im 'control' - Kanal steuern Sie Ihre Comfoair Lüftung. Alle Werte im 'control' - Kanal müssen mit ACK=false gesetzt werden, um als Befehle für den Adapter erkannt zu werden.

Boostmodus: Boostzeit einstellen und starten. Nach der Boostzeit wird die Belüftung wieder auf die vorherige Stufe zurückgesetzt. Wird während der Boostzeit die Belüftungsstufe geändert, wird die Rückkehr abgebrochen.

Getestet auf comfoair CA350.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.2.0 (2024-04-14)

* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 1.1.9 (2024-03-08)

-   (mcm1957) German title of adapter has been corrected
-   (mcm1957) Dependencies have been updated

### 1.1.8

-   boost-error fixed (sentry)

### 1.1.7

-   dependencies updated, serialport 10.x - update

### 1.1.6

-   boostmode enhanced, dependencies updated

### 1.1.5

-   Bugfix (js-controller update)

### 1.1.3

-   boostmode added

### 1.1.2

-   adapter - internal filter-h counter added

### 1.1.1

-   Periodical self-test with restart in case of fail added

### 1.1.0

-   displays now working hours of different ventilation levels, preheating, bypass and frost-protection.

### 1.0.0

-   offers now the possibility of a direct serial connection besides the connection over IP/LAN.

### 0.3.2

-   Bypass - error bug fixed.

### 0.3.1

-   new connection mode: parallel in constant PC-Logmode.

### 0.3.0

-   new connection modes, i.e. 'listening only', selftest-function and setting filter-timer added.

### 0.2.1

-   smaller bugfixes.

### 0.2.0

-   New rs232 - Modes, reading enthalpie-values, handling connection-errors.

### 0.1.4

-   README-Update 'NO PARALLEL USE', discard 'Safe-Mode'.

### 0.1.3

-   RS - 232 interface: manual- or safe - mode possible.

### 0.1.2

-   ReadME updated, minor bugfixes.

### 0.1.1

-   bugfix ventlevels, reading errors

### 0.1.0

-   ReadME Update

### 0.0.7

-   Core Files/Testing Update and introduce adapter-core

### 0.0.6

-   Filter - change - indicator.

### 0.0.5

-   bugfix set vent levels.

### 0.0.4

-   gets & sets vent levels, gets filter-timer.

### 0.0.3

-   minor bugfixes, sets comfort-temperature and resets filter-hours.

### 0.0.2

-   First running Version. Gets temp, vent, bypass and filter states, sets fan level.

### 0.0.1

-   In development stage, contributions welcome

## License

The MIT License (MIT)

Copyright (c) 2023-2024 forelleblau marceladam@gmx.ch

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