---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.nmea/README.md
title: ioBroker.nmea
hash: vCBjYK3WCOWWlFgakL8tYFBe3C7h7qjsD8NUn2FuIoI=
---
![Logo](../../../en/adapterref/iobroker.nmea/admin/nmea.png)

# IoBroker.nmea Dieser Adapter ermöglicht die Verbindung von ioBroker mit dem NMEA-2000 Yachtbus.
**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in Abschnitt [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

Um diesen Adapter zu verwenden, benötigen Sie eine Hardware, die den NMEA-2000-Bus lesen und in ein serielles Signal umwandeln kann:

- [Actisense NGT-1 (USB)](https://actisense.com/products/ngt-1-nmea-2000-to-pc-interface/)
- [Actisense NGX1-USB (USB)](https://actisense.com/products/nmea-2000-gateway-ngx-1/)
- oder [Raspberry Pi mit PiCAN-M](https://www.skpang.co.uk/collections/hats/products/copy-of-pican-m-with-can-bus-micro-c-and-rs422-connector-no-smps)
- [Yacht Devices YDWG-02/03](https://www.yachtd.com/products/wifi_gateway.html)
- [Yacht Devices YDEN-02/03](https://www.yachtd.com/products/ethernet_gateway.html)

PiCAN-M könnte mit Raspberry 4 und [5](https://copperhilltech.com/blog/testing-pican-can-bus-hats-with-the-raspberry-pi-5/) funktionieren.

![Widgets](../../../en/adapterref/iobroker.nmea/img/widgetExamples.png)

[YouTube-Erklärung](https://youtu.be/flp_-mypbRU?si=k0lp95OukQ88LBxj)

## So verwenden Sie es auf dem Raspberry Pi mit PiCAN-M
Das PiCAN M ist eine kompakte Erweiterungsplatine für den Raspberry Pi 3/4.

Sie ermöglicht den Anschluss von NMEA2000- und NMEA0183-Netzwerken an einen Raspberry Pi.
Die Platine kann über eine externe 12-V-Quelle mit Strom versorgt werden.
Zusätzlich bietet sie die Möglichkeit, den Raspberry Pi in Verbindung mit dem PiCAN-M-Board direkt über den NMEA2000-Bus mit Strom zu versorgen.

**Der PiCAN-M verfügt über keinen ausreichenden Verpolungsschutz für die 12-V-Versorgungsspannung. Bei externem Betrieb mit 12 V muss eine 1-A-Sicherung in die Stromversorgungsleitung eingebaut werden.**

Aufgrund des hohen Strombedarfs des Raspberry Pi empfehlen wir, ihn über eine externe Stromquelle (mindestens 3 A) zu betreiben. Die Stromversorgung über NMEA2000 und USB kann problemlos parallel erfolgen.

### Installation
Weitere Einzelheiten finden Sie in Kapitel 3 in [PiCAN-M Benutzerhandbuch](img/pican-m_UGB_10.pdf), hier jedoch eine kurze Zusammenfassung:

Bearbeiten Sie die Datei `/boot/config.txt` (mit `sudo nano /boot/config.txt`) und fügen Sie die folgenden Zeilen am Ende der Datei hinzu:

```
enable_uart=1
dtparam=i2c_arm=on
dtparam=spi=on
dtoverlay=mcp2515-can0,oscillator=16000000,interrupt=25
```

Ausgaben auf der UART-Konsole deaktivieren:

- Starten Sie in der Befehlszeile mit `sudo raspi-config`
- gehen Sie zu „3 Schnittstellenoptionen“
- gehe zu `I5 Serieller Port`
- Deaktivieren Sie `Shell über serielle Schnittstelle zugänglich` und `Hardwareaktivierte serielle Schnittstelle`.
- Beenden Sie `raspi-config` und starten Sie das System neu.

Installieren Sie can-utils

```shell
sudo apt-get install can-utils
```

## Actisense NGT-1
Actisense NGT-1 ist unter Windows und Linux ohne zusätzliche Treiber sichtbar. Es wird als serielle Schnittstelle „COMn“ (Windows) bzw. ttyN (unter Linux) erkannt.

## YDEN, YDWG
Aktivieren Sie Server N2 mit TCP-Protokoll und bidirektionalem Modus.

![YDWG](../../../en/adapterref/iobroker.nmea/img/yacht-devices.png)

UDP wäre auch eine Möglichkeit, aber da das Gateway die Daten kontinuierlich in das Netzwerk sendet, könnte der Bus überlastet werden.

## Todo
- Code kodieren
- AIS
- herausfinden, warum Daten von Adresse 100 gesendet wurden
- Integration von [iKonvert NMEA 2000](https://digitalyachtamerica.com/product/ikonvert-usb/)
- Integration von [Shipmodul MiniPlex-3-N2K](https://www.shipmodul.com/products.html)

## Datensimulation
Sie können Daten von externen Sensoren an den NMEA2000-Bus senden.
Tatsächlich können Sie jedoch nur Umgebungsdaten wie Temperatur, Luftfeuchtigkeit und Druck simulieren.

Mit dem Flag `Combined environment` können Sie die PGN-Nummer definieren, die für Temperatur, Luftfeuchtigkeit und Druck verwendet wird:

- Wenn Sie das Kennzeichen „Kombinierte Umgebung“ deaktivieren, wird für die Temperatur PGN 130314, für die Luftfeuchtigkeit PGN 130313 und für den Druck PGN 130314 verwendet.
- Wenn Sie das Flag „Kombinierte Umgebung“ auswählen, werden alle drei Werte zusammen mit anderen möglichen Umgebungswerten in PGN 130311 gesendet.

## Zeitzone
Es besteht die Möglichkeit, die Zeitzone anhand der GPS-Koordinaten einzustellen.
Dazu muss die entsprechende Option in den Adaptereinstellungen aktiviert und dem Benutzer `iobroker` die Befehlsausführung erlaubt werden: `sudo visudo`

```
iobroker ALL=(ALL) timedatectl set-timezone
```

## Autopilot
Tatsächlich wird nur ein Autopilot unterstützt: Raymarine.

Die Entwicklung von Simrad/navico/B&G ist noch nicht abgeschlossen.

<!--

### **IN BEARBEITUNG** -->

## Changelog
### 0.4.0 (2025-11-30)
* (bluefox) Added support of YDEN-02/03 and YDWG-02/03 gateways

### 0.3.0 (2025-08-16)
* (bluefox) Widgets were rewritten on TypeScript
* (bluefox) Corrected errors in the widgets and in the calculations
* (bluefox) Small fix for ais data

### 0.2.2 (2024-06-20)
* (bluefox) Backend was rewritten on TypeScript
* (bluefox) Support for AIS added
* (bluefox) Valid processing of temperature, pressure and humidity

### 0.1.8 (2024-03-20)
* (bluefox) Corrected vis-2 widgets

### 0.1.1 (2024-03-19)
* (bluefox) Corrected vis-2 widgets

### 0.0.4 (2024-03-12)
* (bluefox) Fixed CI tests

### 0.0.3 (2024-03-12)
* (bluefox) Initial commit

## License
The MIT License (MIT)

Copyright (c) 2024-2025 bluefox <dogafox@gmail.com>

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