---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.nmea/README.md
title: ioBroker.nmea
hash: RpMOucw8igSZtPZLPvyx4jDtS5zdyMhwPh/f/iPGgIg=
---
![Logo](../../../en/adapterref/iobroker.nmea/admin/nmea.png)

# IoBroker.nmea. Dieser Adapter ermöglicht den Anschluss von ioBroker an den NMEA-2000-Yachtbus.
**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

Um diesen Adapter zu verwenden, benötigen Sie eine Hardware, die den NMEA-2000-Bus lesen und für den seriellen Port konvertieren kann:

Actisense NGT 1 (USB)
- oder Raspberry PI mit PiCAN-M

![Widgets](../../../en/adapterref/iobroker.nmea/img/widgetExamples.png)

[YouTube-Erklärung](https://youtu.be/flp_-mypbRU?si=k0lp95OukQ88LBxj)

## So verwenden Sie es auf Raspberry PI mit PiCAN-M
Das PiCAN M ist eine kompakte Zusatzplatine für den Raspberry Pi 3/4.

Sie ermöglicht den Anschluss von NMEA2000- und NMEA0183-Netzwerken an einen Raspberry Pi.

Die Platine kann über eine externe 12-V-Quelle mit Strom versorgt werden.

Zusätzlich bietet sie die Möglichkeit, den Raspberry Pi bei Verwendung mit der PiCAN-M-Platine direkt über den NMEA2000-Bus mit Strom zu versorgen.

**Für die 12V Versorgungsspannung verfügt das PiCAN-M nicht über einen entsprechenden Verpolungsschutz. Bei externem Betrieb an 12V ist es notwendig, eine 1A Sicherung in die Stromversorgungsleitung einzubauen.**

Aufgrund der hohen Anforderungen des Raspberry Pi an die Stromversorgung empfehlen wir, den Raspberry Pi über eine externe Stromquelle (mindestens 3 A) mit Strom zu versorgen.
Die Stromversorgung über NMEA2000 und über USB kann problemlos parallel erfolgen.

### Installation
Weitere Einzelheiten finden Sie in Kapitel 3 in [PiCAN-M-Benutzerhandbuch](img/pican-m_UGB_10.pdf). Hier ist jedoch eine kurze Zusammenfassung:

Editieren Sie die Datei `/boot/config.txt` (mit `sudo nano /boot/config.txt`) und fügen Sie am Ende der Datei folgende Zeilen hinzu:

```
enable_uart=1
dtparam=i2c_arm=on
dtparam=spi=on
dtoverlay=mcp2515-can0,oscillator=16000000,interrupt=25
```

Ausgänge auf der UART-Konsole deaktivieren:

- Starten Sie in der CLI `sudo raspi-config`
- gehen Sie zu „3 Schnittstellenoptionen“
- gehen Sie zu „I5 Serial Port“
- Deaktivieren Sie „Shell über Seriell zugänglich“ und „Serieller Port-Hardware aktiviert“.
- Beenden Sie `raspi-config` und starten Sie neu

Installieren Sie can-utils

```
sudo apt-get install can-utils
```

## Actisense NGT-1
Actisense NGT-1 ist unter Windows oder Linux ohne zusätzliche Treiber sichtbar. Es ist als serieller Port „COMn“ (Windows) oder ttyN (unter Linux) sichtbar.

## Machen
- Code kodieren
- AIS
- Finden Sie heraus, warum Daten von Adresse 100 gesendet wurden
- Integration von [iKonvert NMEA 2000](https://digitalyachtamerica.com/product/ikonvert-usb/)
- Integration von [Shipmodul MiniPlex-3-N2K](https://www.shipmodul.com/products.html)

## Datensimulation
Sie können die Daten externer Sensoren in den NMEA2000-Bus einspeisen.
Eigentlich können Sie nur Umgebungsdaten wie Temperatur, Luftfeuchtigkeit und Druck simulieren.

Mit dem Flag `Combined environment` können Sie die PGN-Nummer festlegen, die für Temperatur, Luftfeuchtigkeit und Druck verwendet wird:

- Wenn Sie die Flagge „Kombinierte Umgebung“ deaktivieren, wird für die Temperatur PGN 130314, für die Luftfeuchtigkeit PGN 130313 und für den Druck PGN 130314 verwendet.
- Wenn Sie die Flagge „Kombinierte Umgebung“ auswählen, werden alle drei Werte zusammen mit anderen möglichen Umgebungswerten in PGN 130311 gesendet.

## Zeitzone
Es besteht die Möglichkeit, die Zeitzone anhand der GPS-Koordinaten einzustellen.
Dazu muss die entsprechende Option in den Adaptereinstellungen aktiviert sein und dem Benutzer `iobroker` die Ausführung des Befehls `sudo visudo` gestattet sein.

```
iobroker ALL=(ALL) timedatectl set-timezone
```

<!--

### **IN ARBEIT** -->

## Changelog
### 0.2.0 (2024-06-15)
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