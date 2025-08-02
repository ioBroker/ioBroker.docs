---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.hausbus_de/README.md
title: iobroker.hausbus_de
hash: ZnyoDSWe3HkqtcNMEUQ6T/17g+LeOpskkJLiCNUbH5M=
---
![Logo](../../../en/adapterref/iobroker.hausbus_de/admin/hausbusde.png)

# Iobroker.hausbus_de
IO-Broker-Adapter, der alle haus-bus.de-Komponenten unterstützt.<br> Eine Dokumentation über die unterstützte Hardware und IO Broker-Integration finden Sie unter<br> www.haus-bus.de/iobroker

## Installation<a name="installation"></a>
Dieser Adapter ist als stabile Version im offiziellen ioBroker-Katalog verfügbar.<br> Es wird empfohlen, es direkt aus dem Katalog in ioBroker zu installieren.<br> Wenn Sie eine neuere Version benötigen als im offiziellen ioBroker-Katalog verfügbar ist, können Sie diese Version auch hier direkt von GitHub installieren.<br> Bei Problemen oder Fehlern wenden Sie sich bitte an info@haus-bus.de<br>

## Aufstellen
Der HausBus.de-Adapter ist ohne weitere Konfigurationen einsatzbereit. Er sucht automatisch nach haus-bus.de-Komponenten über UDP-Broadcast-Anfragen. Es muss mindestens eine haus-bus.de-Komponente mit Netzwerkschnittstelle (z. B. ein beliebiges Relaismodul) vorhanden sein, die mit demselben Netzwerk wie der IO-Broker verbunden ist. Alle weiteren Komponenten können über RS485 mit dem Ethernet-Gateway an das Modul angeschlossen werden.

<br> <br> <br>

## Changelog
### 1.4.10 (2024-09-07)
* check health for devices that do not respond during search devices

### 1.4.9 (2024-09-05)
* fixed wrong value of brightness sensor

### 1.4.8 (2024-09-02)
* fixed high bus traffic during startup phase

### 1.4.6 (2024-08-07)
* support for new 12 channel relay module

### 1.3.0 (2023-12-31) 
* support for new analog inputs (0-10V or 4-20mA)

### 1.2.12 (2023-07-21) 
* configuration recovery

### 1.2.11 (2023-05-11) 
* updated latest iobroker catalog version

### 1.2.1 (2023-03-26)
* support for new ESP32 32 IO module

### 1.1.5 (2023-01-11)
* support for GIRA multi pushbuttons

### 1.1.4 (2023-01-02)
* support for new rollo module

### 1.1.2 (2022-10-22)
* removed dynamic upd broadcast address due to problems with docker submask

### 1.0.21 (2022-09-25)
* (hausbusde) fixed error from adapter checker

### 1.0.12 (2022-08-10)
* (hausbusde) first stable release and publish in ioBroker catalog.

### 0.1.18 (2022-03-13) 
* (hausbusde) corrected data type of backlight from string to number.

### 0.1.17 (2021-12-11) 
* (hausbusde) optimized bus speed in case of many outgoing messages at the same time.

### 0.1.16 (2021-11-28) 
* (hausbusde) corrected data type to number for setting temperatur, brightness and dimmer brightness.

### 0.1.15 (2021-11-17) 
* (hausbusde) new admin function for special configurations

### 0.1.14 (2021-10-02) 
* (hausbusde) support for new variant of 230V Dimmer

### 0.1.13 (2021-08-10) 
* (hausbusde) fixed unfunctional blink method for led interface

### 0.1.12 (2021-07-19) 
* (hausbusde) support for new RGB dimmer

### 0.1.11 (2021-07-14)
* (hausbusde) added celsius as unit for temperature

### 0.1.10 (2021-07-06)
* (hausbusde) replaced all blanks in object names by underscores

### 0.1.9 (2021-07-01)
* (hausbusde) support for 8 channel shutter module

### 0.1.8 (2021-02-08)
* (hausbusde) fixed backlight bug for push buttons

### 0.1.7 (2020-11-10)
* (hausbusde) fixed adapter restart if no internet connection is available
* (hausbusde) support for new 8 channel relay module and new 230V dimmer

### 0.1.5 (2020-11-01)
* (hausbusde) just some preparations for the first official release

### 0.1.4 (2020-09-12)
* (hausbusde) fixed invalid string value for relay events

### 0.1.3 (2020-09-11)
* (hausbusde) supporting lan bridge

### 0.1.2 (2020-09-06)
* (hausbusde) first public version

## License
MIT License

Copyright (c) 2024 Hermann Hoeschen <info@haus-bus.de>

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