---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.rpi2/README.md
title: ioBroker.rpi2
hash: /sMZ6r1PpHPZM5DDTB130x9G7RpUUhnXF2Y/hqy9jhI=
---
# ioBroker.rpi2

![NPM-Version](https://img.shields.io/npm/v/iobroker.rpi2?style=flat-square)
![Downloads](https://img.shields.io/npm/dm/iobroker.rpi2?label=npm%20downloads&style=flat-square)
![node-lts](https://img.shields.io/node/v-lts/iobroker.rpi2?style=flat-square)
![Libraries.io-Abhängigkeitsstatus für die neueste Version](https://img.shields.io/librariesio/release/npm/iobroker.rpi2?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/iobroker-community-adapters/iobroker.rpi2?style=flat-square)
![GitHub-Repository-Größe](https://img.shields.io/github/repo-size/iobroker-community-adapters/iobroker.rpi2?logo=github&style=flat-square)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/iobroker.rpi2?logo=github&style=flat-square)
![Letzter Commit auf GitHub](https://img.shields.io/github/last-commit/iobroker-community-adapters/iobroker.rpi2?logo=github&style=flat-square)
![GitHub-Probleme](https://img.shields.io/github/issues/iobroker-community-adapters/iobroker.rpi2?logo=github&style=flat-square)
![GitHub-Workflow-Status](https://img.shields.io/github/actions/workflow/status/iobroker-community-adapters/iobroker.rpi2/test-and-release.yml?branch=master&logo=github&style=flat-square)
![Beta](https://img.shields.io/npm/v/iobroker.rpi2.svg?color=red&label=beta)
![Stabil](http://iobroker.live/badges/rpi2-stable.svg)
![Installiert](http://iobroker.live/badges/rpi2-installed.svg)

## Versionen

RPI-Monitor-Adapter für ioBroker

RPI-Monitor-Implementierung zur Integration in ioBroker. Es handelt sich um die gleiche Implementierung wie für iobroker.rpi, jedoch mit GPIOs.

## Wichtige Informationen

**ioBroker benötigt spezielle Berechtigungen zur Steuerung von GPIOs.** Auf den meisten Linux-Distributionen kann dies durch Hinzufügen des Benutzers ioBroker zur Benutzerverwaltung erreicht werden. `gpio` Gruppe.

Damit GPIO funktioniert, müssen Sie Folgendes installieren: `libgpiod` in Version `2.x`, **bevor** Sie den Adapter installieren (siehe unten)!

> \[!VORSICHT] Version 3.xx dieses Adapters unterstützt und erfordert Debian 13 / Trixie (Linux-Kernel 5.10 oder neuer). Führen Sie kein Update durch, wenn Sie ein älteres Betriebssystem verwenden.

## Installation

Nach der Installation können Sie die Monitoreinstellungen in den Instanzeinstellungen konfigurieren.

Nach dem Start von `iobroker.rpi` Alle ausgewählten Module erzeugen einen Objektbaum in ioBroker innerhalb von rpi.<instance> Die<modulename> z.B `rpi.0.cpu`

Der Adapter benötigt einige Betriebssystemabhängigkeiten. Normalerweise kümmert sich js-controller darum, aber falls Probleme auftreten, installieren Sie bitte die folgenden Pakete manuell:

```bash
sudo apt update
sudo apt install -y build-essential python
sudo apt install -y libgpiod-dev
sudo apt install -y pkg-config
```

(Die dritte Option ist nur erforderlich, wenn Sie mit GPIOs arbeiten möchten.) (Die letzte Option ist nur erforderlich, wenn Sie DHTxx/AM23xx-Sensoren verwenden möchten.)

### NVME-Temperatur

Ab Adapterversion 2.3.2 kann die NVMe-Temperatur ausgelesen werden. Dazu ist die Installation erforderlich. `nvme-cli` Das Paket muss auf Ihrem System installiert werden. Dies können Sie mit folgendem Befehl tun: `sudo apt-get install nvme-cli` Sie müssen den Befehl außerdem zur ioBroker-sudoers-Datei hinzufügen. `/etc/sudoers.d/iobroker` Öffnen Sie es mit einem Editor, zum Beispiel nano: `sudo nano /etc/sudoers.d/iobroker` und fügen Sie die folgende Zeile am Ende hinzu:

`iobroker ALL=(ALL) NOPASSWD: /usr/sbin/nvme smart-log /dev/nvme0`

## GPIOs

Sie können auch GPIOs auslesen und steuern. Dazu müssen Sie lediglich die GPIO-Optionen in den Einstellungen (Registerkarte „Zusätzliche Informationen“) konfigurieren.

![GPIOs](../../../en/adapterref/iobroker.rpi2/img/pi3_gpio.png)

Nachdem einige Ports aktiviert wurden, erscheinen im Objektbaum die folgenden Zustände:

- rpi.0.gpio.PORT.state

Die Portnummerierung erfolgt über BCM (BroadComm Pins on Chip). Die vollständige Nummerierung erhalten Sie mit `gpio readall` Zum Beispiel PI2:

```
+-----+-----+---------+------+---+---Pi 2---+---+------+---------+-----+-----+
| BCM | wPi |   Name  | Mode | V | Physical | V | Mode | Name    | wPi | BCM |
+-----+-----+---------+------+---+----++----+---+------+---------+-----+-----+
|     |     |    3.3v |      |   |  1 || 2  |   |      | 5v      |     |     |
|   2 |   8 |   SDA.1 | ALT0 | 1 |  3 || 4  |   |      | 5V      |     |     |
|   3 |   9 |   SCL.1 | ALT0 | 1 |  5 || 6  |   |      | 0v      |     |     |
|   4 |   7 | GPIO. 7 |   IN | 1 |  7 || 8  | 0 | IN   | TxD     | 15  | 14  |
|     |     |      0v |      |   |  9 || 10 | 1 | IN   | RxD     | 16  | 15  |
|  17 |   0 | GPIO. 0 |   IN | 0 | 11 || 12 | 0 | IN   | GPIO. 1 | 1   | 18  |
|  27 |   2 | GPIO. 2 |   IN | 0 | 13 || 14 |   |      | 0v      |     |     |
|  22 |   3 | GPIO. 3 |   IN | 0 | 15 || 16 | 0 | IN   | GPIO. 4 | 4   | 23  |
|     |     |    3.3v |      |   | 17 || 18 | 0 | IN   | GPIO. 5 | 5   | 24  |
|  10 |  12 |    MOSI |   IN | 0 | 19 || 20 |   |      | 0v      |     |     |
|   9 |  13 |    MISO |   IN | 0 | 21 || 22 | 1 | IN   | GPIO. 6 | 6   | 25  |
|  11 |  14 |    SCLK |   IN | 0 | 23 || 24 | 1 | IN   | CE0     | 10  | 8   |
|     |     |      0v |      |   | 25 || 26 | 1 | IN   | CE1     | 11  | 7   |
|   0 |  30 |   SDA.0 |   IN | 1 | 27 || 28 | 1 | IN   | SCL.0   | 31  | 1   |
|   5 |  21 | GPIO.21 |   IN | 1 | 29 || 30 |   |      | 0v      |     |     |
|   6 |  22 | GPIO.22 |   IN | 1 | 31 || 32 | 0 | IN   | GPIO.26 | 26  | 12  |
|  13 |  23 | GPIO.23 |   IN | 0 | 33 || 34 |   |      | 0v      |     |     |
|  19 |  24 | GPIO.24 |   IN | 0 | 35 || 36 | 0 | IN   | GPIO.27 | 27  | 16  |
|  26 |  25 | GPIO.25 |  OUT | 1 | 37 || 38 | 0 | IN   | GPIO.28 | 28  | 20  |
|     |     |      0v |      |   | 39 || 40 | 0 | IN   | GPIO.29 | 29  | 21  |
+-----+-----+---------+------+---+----++----+---+------+---------+-----+-----+
| BCM | wPi |   Name  | Mode | V | Physical | V | Mode | Name    | wPi | BCM |
+-----+-----+---------+------+---+---Pi 2---+---+------+---------+-----+-----+
```

## DHTxx/AM23xx-Sensoren

Sie können Daten von den Temperatur-/Feuchtigkeitssensoren DHT11, DHT21 (AM2301), DHT22 und AM2302 auslesen.

Schließen Sie einen solchen Sensor an einen GPIO-Pin an, wie auf der Seite des [node-dht-sensor](https://www.npmjs.com/package/node-dht-sensor) -Pakets beschrieben. Wie bereits erläutert, können mehrere Sensoren an _mehrere_ Pins angeschlossen werden (es handelt sich _nicht um_ ein Bussystem).

Wählen Sie in der GPIO-Tabelle Folgendes aus: `DHT11` für DHT11-Sensoren und `DHT22/AM23xx` Geben Sie für alle anderen Sensoren das Abfrageintervall in Millisekunden in die Spalte _„Entprellung/Abfrage“_ ein. Die Sensoren können nicht schneller als alle 2000 ms ausgelesen werden (DHT11: 1000 ms); ohne Angabe eines Werts fragt der Adapter alle 30000 ms ab.

Der Adapter liest die Messwerte eines Sensors auf eine von zwei Arten aus und protokolliert beim Start, welche Methode er für jeden Sensor verwendet.

### Linux-Kernel-Treiber (empfohlen, funktioniert auf allen Raspberry Pi-Modellen, einschließlich des Pi 5)

Linux verfügt über einen eigenen Treiber für diese Sensoren (er unterstützt DHT11, DHT21, HT22 und AM2302 gleichermaßen). Aktivieren Sie ihn für jeden Sensor, indem Sie eine Zeile hinzufügen zu `/boot/firmware/config.txt` (`/boot/config.txt` (bei älteren Systemen) und Neustart:

```
dtoverlay=dht11,gpiopin=17
```

`gpiopin` ist die GPIO-Nummer (BCM), die mit der in der GPIO-Tabelle des Adapters übereinstimmt. Sie können die Funktion mit folgendem Befehl überprüfen: `cat /sys/bus/iio/devices/iio:device*/in_temp_input` (Der Wert ist in 1/1000 °C angegeben.) Der Adapter erkennt den Treiber und verwendet ihn automatisch; es ist keine weitere Konfiguration erforderlich.

### Knoten-DHT-Sensor

Ohne den Kernel-Treiber verwendet der Adapter node-dht-sensor. Auf Raspberry Pi 1 bis 4 funktioniert dies standardmäßig.

Auf einem **Raspberry Pi 5** (sowie Pi 500 und Compute Module 5) funktioniert die Standardversion von node-dht-sensor nicht, da sie auf GPIO-Register zugreift, die der Pi 5 nicht besitzt. Verwenden Sie entweder den oben genannten Kernel-Treiber oder kompilieren Sie node-dht-sensor mit libgpiod-Unterstützung neu.

```bash
sudo apt-get install -y build-essential libgpiod-dev pkg-config
cd /opt/iobroker
sudo -u iobroker -H npm rebuild node-dht-sensor --use_libgpiod=true
```

Starten Sie anschließend den Adapter neu. `pkg-config` Diese Bibliothek ist erforderlich: Ohne sie verwendet der Build die veraltete libgpiod 1 und schlägt auf aktuellen Systemen fehl. Wird node-dht-sensor später neu installiert oder neu kompiliert (z. B. nach einem Node.js-Upgrade), erhält es erneut die Standardversion. Der Adapter protokolliert dann beim Start einen Fehler, und die Neukompilation muss wiederholt werden. Der Kernel-Treiber hat dieses Problem nicht.

## Changelog

<!--
	PLACEHOLDER for the next version:
	### **WORK IN PROGRESS**
-->
### 4.0.0 (2026-10-07)
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (mcm1957) Dependencies have been updated.
- (copilot) **ENHANCED**: Added `temperature.fan_activity` object to monitor fan RPM via `/sys/devices/platform/cooling_fan/...`; falls back to `0` when unavailable.
- (Garfonso/Claude): Improve GPIO handling.
- (Garfonso/Claude): **FIXED**: GPIO outputs no longer switch off and on again during adapter start (#431).
- (Garfonso/Claude): Use the `@garfonso/opengpio` npm package instead of a git branch of the fork.
- (Garfonso/Claude): **FIXED**: The fan parser unit test matched the old single-hwmon path and failed since the fan reading fix.
- (Garfonso/Claude): **FIXED**: DHT sensors ignored the configured poll interval (with no interval they were read continuously, so every read failed) and every sensor's timer read all sensors.
- (Garfonso/Claude): **NEW**: DHT sensors are read through the Linux dht11 kernel driver if it is enabled (`dtoverlay=dht11,gpiopin=<n>`). This makes them work on a Raspberry Pi 5 without rebuilding node-dht-sensor (#406).
- (Garfonso/Claude): **ENHANCED**: DHT sensor problems are logged with their cause and how to fix them; the startup log shows how each sensor is read.
- (Garfonso/Claude): **FIXED**: Raspberry Pi 500 and Compute Module 5 are recognised as Raspberry Pi 5 boards and use the same GPIO chip.
- (Garfonso/Claude): **FIXED**: The humidity object of a DHT sensor was named "temperature".
- (Garfonso/Claude): **BREAKING**: GPIO and DHT sensor handling changed in several places (see above). This mostly fixes problems, but please check your GPIO setup after updating.

### 3.0.2 (2025-12-01)
* (@klein0r) Check for required libgpiod-dev package version

### 3.0.1 (2025-11-28)
* (@klein0r) Updated logo, workflows and documentation
* (@klein0r) admin 7.6.17 and js-controller 6.0.11 (or later) are required

### 3.0.0 (2025-11-28)
* (@klein0r) NodeJS 20.x (or newer) is required
* (@klein0r) Updated opengpio to v2 (works on Debian trixie)

### 2.4.0 (2025-03-06)
* (Garfonso) read the current state of GPIO outputs during adapter startup.
* (Garfonso) re-read GPIO input, if set by the user (with ack=false).
* (Garfonso) add an option to invert true/false mapping to 1/0.
* (Garfonso) Allow multiple instances of this adapter per host.
* (Garfonso) tried to improve initialization of GPIO inputs.

## License
MIT License

Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2024-2025 Garfonso <garfonso@mobo.info>

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