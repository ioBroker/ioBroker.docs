---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.nmea/README.md
title: ioBroker.nmea
hash: 8Ndlwz3KyR1bjp1vC8w24cSSo9yeGwaog2bWOE8WKHk=
---
![Logo](../../../en/adapterref/iobroker.nmea/admin/nmea.png)

# ioBroker.nmea

Dieser Adapter ermöglicht die Verbindung von ioBroker mit dem NMEA-2000 Yachtbus.

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) . Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

Um diesen Adapter zu verwenden, benötigen Sie eine Hardware, die den NMEA-2000-Bus lesen und in ein serielles Signal umwandeln kann:

- [Actisense NGT-1 (USB)](https://actisense.com/products/ngt-1-nmea-2000-to-pc-interface/)
- [Actisense NGX1-USB (USB)](https://actisense.com/products/nmea-2000-gateway-ngx-1/)
- oder [Raspberry Pi mit PiCAN-M](https://www.skpang.co.uk/collections/hats/products/copy-of-pican-m-with-can-bus-micro-c-and-rs422-connector-no-smps)
- [Yachtgeräte YDWG-02/03](https://www.yachtd.com/products/wifi_gateway.html)
- [Yachtgeräte YDEN-02/03](https://www.yachtd.com/products/ethernet_gateway.html)

PiCAN-M ist mit Raspberry Pi 4 und [5](https://copperhilltech.com/blog/testing-pican-can-bus-hats-with-the-raspberry-pi-5/) kompatibel.

![Widgets](../../../en/adapterref/iobroker.nmea/img/widgetExamples.png)

[YouTube-Erklärung](https://youtu.be/flp_-mypbRU?si=k0lp95OukQ88LBxj)

## So verwenden Sie es auf Raspberry Pi mit PiCAN-M

Das PiCAN M ist eine kompakte Erweiterungsplatine für den Raspberry Pi 3/4. Sie ermöglicht den Anschluss von NMEA2000- und NMEA0183-Netzwerken an einen Raspberry Pi. Die Platine kann über eine externe 12-V-Quelle mit Strom versorgt werden. Alternativ bietet sie die Möglichkeit, den Raspberry Pi in Verbindung mit dem PiCAN-M-Board direkt über den NMEA2000-Bus mit Strom zu versorgen.

**Der PiCAN-M verfügt nicht über einen ausreichenden Verpolungsschutz für die 12-V-Versorgungsspannung. Bei externem Betrieb mit 12 V muss daher eine 1-A-Sicherung in die Stromversorgungsleitung eingebaut werden.**

Aufgrund des hohen Strombedarfs des Raspberry Pi empfehlen wir, ihn über eine externe Stromquelle (mindestens 3 A) mit Strom zu versorgen. Die Stromversorgung über NMEA2000 und USB kann problemlos parallel erfolgen.

### Installation

Weitere Einzelheiten finden Sie in Kapitel 3 des [PiCAN-M-Benutzerhandbuchs](https://github.com/ioBroker/ioBroker.nmea/blob/master/img/pican-m_UGB_10.pdf) , hier jedoch eine kurze Zusammenfassung:

Datei bearbeiten`/boot/config.txt` (mit`sudo nano /boot/config.txt` ) und fügen Sie die folgenden Zeilen am Ende der Datei hinzu:

```
enable_uart=1
dtparam=i2c_arm=on
dtparam=spi=on
dtoverlay=mcp2515-can0,oscillator=16000000,interrupt=25 
```

Ausgaben auf der UART-Konsole deaktivieren:

- Starten Sie in der Befehlszeile`sudo raspi-config`
- gehe zu`3 Interface Options`
- geh ot`I5 Serial Port`
- Deaktivieren`shell accessible over serial` Und`serial port hardware enabled`
- Ausgang`raspi-config` und Neustart

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

- Kodierungscode
- AIS
- Finden Sie heraus, warum Daten von Adresse 100 gesendet wurden
- Integration von [iKonvert NMEA 2000](https://digitalyachtamerica.com/product/ikonvert-usb/)
- Integration von [Shipmodul MiniPlex-3-N2K](https://www.shipmodul.com/products.html)

## Datensimulation

Sie können die Daten externer Sensoren an den NMEA2000-Bus anschließen. Tatsächlich können Sie aber nur Umgebungsdaten wie Temperatur, Luftfeuchtigkeit und Druck simulieren.

Mit der Flagge`Combined environment` Sie können die PGN-Nummer definieren, die für Temperatur, Luftfeuchtigkeit und Druck verwendet wird:

- Wenn Sie die Markierung deaktivieren`Combined environment` Für die Temperatur wird PGN 130314, für die Luftfeuchtigkeit PGN 130313 und für den Druck PGN 130314 verwendet.
- Wenn Sie die Flagge auswählen`Combined environment` Daher werden alle drei Werte in PGN 130311 zusammen mit anderen möglichen Umweltwerten gesendet.

## Zeitzone

Es besteht die Möglichkeit, die Zeitzone anhand der GPS-Koordinaten einzustellen. Dazu muss die entsprechende Option in den Adaptereinstellungen aktiviert und zugelassen werden.`iobroker` Benutzer die Befehlsausführung:`sudo visudo`

```
iobroker ALL=(ALL) timedatectl set-timezone
```

## Autopilot

Tatsächlich wird nur ein Autopilot unterstützt: Raymarine.

Die Entwicklung von Simrad/navico/B\&G ist noch nicht abgeschlossen.

### Winddatumsanzeige

Bei Raymarine-Geräten, die das „Pilot Wind Datum“ (PGN 65345) veröffentlichen, speichert der Adapter den Rohwinkel in Radiant unter`seatalkPilotWindDatum.windDatum` (Dies ist der Standardwert, den der Autopilot beim Ändern des Windwinkels zurückliest, daher muss er im Bogenmaß angegeben werden).

Zusätzlich gibt es einen schreibgeschützten Komfortzustand`seatalkPilotWindDatum.windDatumDisplay` wird erstellt. Es zeigt den Winkel genau so an wie der Raymarine-Pilotenkopf:

- `0…180°` → Steuerbord,`180…360°` → Hafen,
- jeweils als ein`≤180°` Wert plus ein sprachabhängiger Seitenbuchstabe (z. B. ein Datum von`230°` wird angezeigt als`130°P` auf Englisch und`130°B` (auf Deutsch).`0°` (direkt voraus) und`180°` (tot achtern) ohne Begleitschreiben.

Verwenden`windDatumDisplay` zur Visualisierung und`windDatum` für Berechnungen/Automatisierung.

<!--
	### **WORK IN PROGRESS**
-->

## Changelog
### **WORK IN PROGRESS**
- (@GermanBluefox) Migrated widgets to React 19

### 2.0.0 (2026-08-04)
- (bluefox) Migrated to devices V3

### 1.0.3 (2026-07-08)
- (bluefox) Better decoding of motor PGNs

### 1.0.2 (2026-06-30)
- (copilot) Adapter requires node.js >= 22 now
- (bluefox) Added `seatalkPilotWindDatum.windDatumDisplay` state with the Raymarine-style port/starboard wind-angle display
- (bluefox) The autopilot device-manager widget now shows the wind datum the Raymarine way (e.g. `130°P`) with a language-dependent port/starboard letter
- (bluefox) Added the custom icon set

### 1.0.1 (2026-06-26)
* (bluefox) Implemented Raymarine autopilot support
* (bluefox) Corrected values simulation for yacht devices gateways
* (bluefox) Added support of Fusion player

### 0.4.2 (2026-01-05)
* (bluefox) Updated packages

[Older changelogs can be found there](https://github.com/ioBroker/ioBroker.nmea/blob/master/CHANGELOG_OLD.md)

## License
The MIT License (MIT)

Copyright (c) 2024-2026 bluefox <dogafox@gmail.com>

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