---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.rpi2/README.md
title: kein Titel
hash: cWeo+oq08XAAh++hWgPAHjLTCo8IlnCkgOpYAAeWOEM=
---
![Logo](../../../en/adapterref/iobroker.rpi2/admin/rpi2.png) ioBroker RPI-Monitor-Adapter

![NPM-Version](https://img.shields.io/npm/v/iobroker.rpi2.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.rpi2.svg)
![Anzahl der Installationen](https://iobroker.live/badges/rpi2-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/rpi2-stable.svg)
![NPM](https://nodei.co/npm/iobroker.rpi2.png?downloads=true)

==============

**Tests:** ![Testen und Freigeben](https://github.com/iobroker-community-adapters/ioBroker.rpi2/workflows/Test%20and%20Release/badge.svg) RPI-Monitor-Implementierung zur Integration in ioBroker. Es handelt sich um die gleiche Implementierung wie für iobroker.rpi, jedoch mit GPIOs.

## Wichtige Informationen
Funktioniert nur mit Knoten >= 18

**ioBroker benötigt spezielle Berechtigungen zur Steuerung von GPIOs.** Bei den meisten Linux-Distributionen kann dies erreicht werden, indem der ioBroker-Benutzer zur Gruppe `gpio` hinzugefügt wird (empfohlen) oder ioBroker unter `root` ausgeführt wird (weniger sicher).

Damit GPIO funktioniert, müssen Sie libgpiod **vor** der Installation des Adapters installieren, und zwar wie folgt: `sudo apt-get install -y libgpiod-dev`

## Installation
Nach der Installation müssen Sie alle erforderlichen Module über die Administrationsseite konfigurieren.

Nach dem Start von iobroker.rpi generieren alle ausgewählten Module einen Objektbaum in ioBroker innerhalb von rpi.<Instanz>.<Modulname>, z. B. rpi.0.cpu

Stellen Sie sicher, dass Python und Build-Essential installiert sind:

```
sudo apt-get update
sudo apt-get install -y build-essential python
sudo apt-get install -y libgpiod-dev
```

(letzteres ist nur notwendig, wenn Sie mit GPIOs arbeiten möchten)

Folgende Objekte stehen nach der Auswahl zur Verfügung:

#### **CPU**
- CPU-Frequenz
- laden1
- laden5
- Belastung15

#### **Raspberry (vcgencmd ist erforderlich)**
- CPU-Spannung
- mem_arm
mem_gpu

#### **Erinnerung**
- verfügbarer Speicher
- speicherfrei
- Gesamtspeicher

#### **Netzwerk (eth0)**
- net_received
- net_send

#### **SD-Karte**
- sdcard_boot_total
- sdcard_boot_used
- sdcard_root_total
- sdcard_root_used

#### **Tauschen**
- swap_total
- swap_used

#### **Temperatur**
- soc_temp

#### **Betriebszeit**
- Betriebszeit

#### **WLAN**
- WLAN empfangen
- WLAN_senden

## Konfiguration
Auf der Konfigurationsseite können Sie folgende Module auswählen:

- CPU
- Himbeere
- Erinnerung
Netzwerk
SD-Karte
- Tauschen
- Temperatur
- Betriebszeit
WLAN

### NVME-Temperatur
Seit Adapterversion 2.3.2 können Sie die NVMe-Temperatur ablesen. Dazu müssen Sie das Paket `nvme-cli` auf Ihrem System installieren.
Sie können dies mit dem folgenden Befehl tun: `sudo apt-get install nvme-cli`. Sie müssen den Befehl außerdem zur ioBroker-Sudoers-Datei `/etc/sudoers.d/iobroker` hinzufügen. Öffnen Sie diese mit einem Editor, zum Beispiel nano: `sudo nano /etc/sudoers.d/iobroker`, und fügen Sie am Ende die folgende Zeile hinzu: `nvme smart-log /dev/nvme0`.

## GPIOs
Sie können auch GPIOs lesen und steuern.
Sie müssen lediglich in den Einstellungen die GPIO-Optionen konfigurieren (zusätzliche Registerkarte).

![GPIOs](../../../en/adapterref/iobroker.rpi2/img/pi3_gpio.png)

Nachdem einige Ports aktiviert wurden, werden im Objektbaum folgende Zustände angezeigt:

- rpi.0.gpio.PORT.state

Die Nummerierung der Ports erfolgt in BCM (BroadComm Pins on Chip). Die Nummerierung erhalten Sie mit ```gpio readall```.
Beispiel: PI2:

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
Sie können von den Temperatur-/Feuchtigkeitssensoren DHT11, DHT22 und AM2302 lesen.

Schließen Sie einen solchen Sensor an einen GPIO-Pin an, wie auf der Paketseite [Knoten-DHT-Sensor](https://www.npmjs.com/package/node-dht-sensor) beschrieben. Mehrere Sensoren können wie beschrieben an *mehrere* Pins angeschlossen werden (dies ist *kein* Bussystem).

## Changelog

<!--
	PLACEHOLDER for the next version:
	### **WORK IN PROGRESS**
-->
### 2.4.0 (2025-03-06)
* (Garfonso) read the current state of GPIO outputs during adapter startup.
* (Garfonso) re-read GPIO input, if set by the user (with ack=false).
* (Garfonso) add an option to invert true/false mapping to 1/0.
* (Garfonso) Allow multiple instances of this adapter per host.
* (Garfonso) tried to improve initialization of GPIO inputs.

### 2.3.2 (2025-02-06)
* (asgothian) added support for NVMe temperature (needs additional configuration, see README)
* (Garfonso) fixed inital values for outputs.

### 2.3.1 (2025-01-06)
* (Garfonso) fixed: GPIO library failed to load after recent dependency update.

### 2.3.0 (2024-12-23)
* (Garfonso) correct interpretation of start value setting. Output with initial value 0/1 will set GPIO accordingly during startup. Output without an initial state will not set GPIO at all.

### 2.2.2 (2024-11-02)
* (simatec) responsive design for settings page added

## License
MIT License

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