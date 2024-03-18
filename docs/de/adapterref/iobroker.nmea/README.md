---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.nmea/README.md
title: ioBroker.nmea
hash: U06Gr9hESafFHlewxSL4RCzHxbWVW/nJ+R6atcrITFs=
---
![Logo](../../../en/adapterref/iobroker.nmea/admin/nmea.png)

# IoBroker.nmea Dieser Adapter ermöglicht den Anschluss von ioBroker an den NMEA-2000-Yachtbus.
Um diesen Adapter verwenden zu können, benötigen Sie eine Hardware, die den NMEA-2000-Bus lesen und in den seriellen Port umwandeln kann:

- Actisense NGT-1 (USB)
- oder Raspberry PI mit Pican-M

![Widgets](../../../en/adapterref/iobroker.nmea/img/widgetExamples.png)

## So verwenden Sie es auf Raspberry PI mit Pican-M
Das PiCAN M ist ein kompaktes Zusatzboard, das für den Raspberry Pi 3/4 entwickelt wurde.
Es ermöglicht den Anschluss von NMEA2000- und NMEA0183-Netzwerken an einen Raspberry Pi.
Die Platine kann über eine externe 12-V-Quelle mit Strom versorgt werden.
Darüber hinaus bietet es die Möglichkeit, den Raspberry Pi bei Verwendung mit der PiCAN-M-Karte direkt über den NMEA2000-Bus mit Strom zu versorgen.

Aufgrund der hohen Anforderungen des Raspberry Pi an die Stromversorgung empfehlen wir, den Raspberry PI über eine externe Stromquelle mit Strom zu versorgen.
Die Stromversorgung über NMEA2000 und über USB könnte problemlos parallel funktionieren.

### Installation
Bearbeiten Sie die Datei `/boot/config.txt` (mit `sudo nano /boot/config.txt`) und fügen Sie am Ende der Datei folgende Zeilen hinzu:

```
enable_uart=1
dtparam=i2c_arm=on
dtparam=spi=on
dtoverlay=mcp2515-can0,oscillator=16000000,interrupt=25
```

Deaktivieren Sie die Ausgaben auf der UART-Konsole:

- Starten Sie in der CLI „sudo raspi-config“.
- Gehen Sie zu „3 Schnittstellenoptionen“.
- Gehen Sie zu „I5 Serial Port“.
- Deaktivieren Sie „Shell zugänglich über Seriell“ und „Hardware für seriellen Port aktiviert“.
- Beenden Sie die Raspi-Konfiguration und starten Sie neu

Can-Utils installieren

```
sudo apt-get install can-utils
```

## Actisense NGT-1
Actisense NGT-1 ist ohne zusätzliche Treiber unter Windows oder Linux sichtbar. Es ist als serieller Port „COMn“ (Windows) oder ttyN (unter Linux) sichtbar.

## Machen
- Code verschlüsseln
- AIS
- Finden Sie heraus, warum Daten von Adresse 100 gesendet wurden

<!--

### **ARBEIT IN ARBEIT** -->

## Changelog
### 0.0.4 (2024-03-12)
* (bluefox) Fixed CI tests

### 0.0.3 (2024-03-12)
* (bluefox) Initial commit

## License
The MIT License (MIT)

Copyright (c) 2024 bluefox <dogafox@gmail.com>

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