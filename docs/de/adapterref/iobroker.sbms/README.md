---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sbms/README.md
title: ioBroker.sbms
hash: AR1e9Yuaa4B4UTBx4REZgDYRTfmg0XKY4chdC1kyeGA=
---
![Logo](../../../en/adapterref/iobroker.sbms/admin/sbms.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.sbms.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sbms.svg)
![Anzahl der Installationen](https://iobroker.live/badges/sbms-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/sbms-stable.svg)
![NPM](https://nodei.co/npm/iobroker.sbms.png?downloads=true)

# IoBroker.sbms
**Tests:** ![Testen und Freigeben](https://github.com/buffoletti/ioBroker.sbms/workflows/Test%20and%20Release/badge.svg)

## Electrodacus SBMS-Adapter für ioBroker
Einfacher Adapter, um Daten von [Electrodacus SBMS](https://electrodacus.com/) als Zustände von MQTT, der RawData-HTML-Seite oder dem seriellen Port verfügbar zu machen.

Einheiten und Struktur wurden vom ursprünglichen Datenstrom leicht angepasst. Wenn die Option „Vollständige Nachricht“ aktiviert ist, werden die Originaldaten zusätzlich in die Ordner sbms.x.mqtt/html/serial übertragen.

Bei allen drei Methoden mit aktiviertem WLAN stellte ich fest, dass selbst bei 1-Sekunden-Update-Intervallen oft nur alle 2 Sekunden neue Daten bereitgestellt werden, wie im Feld sbms.time.second zu sehen ist. Dies ist also das maximal zu erwartende Maximum. Um konsistente 1-Sekunden-Updates zu erhalten, verwenden Sie den seriellen Port und setzen Sie die USART-Datenprotokolloption auf SBMS auf 1. Auf diese Weise sind Zähler und Ausgleichsinformationen nicht zugänglich.

Nur auf SBMS0 getestet.

### Serieller Anschluss / USB mit WLAN-Erweiterungskarte
1. Überprüfen Sie in SBMS die Baudrate (festgelegt auf 921600 bei aktiviertem WLAN)
2. Verbinden Sie den Host mit SBMS USB (oder verwenden Sie einen USB-zu-Seriell-Adapter und stellen Sie eine direkte Verbindung her, wenn Sie keine WLAN-Erweiterungskarte haben).
3. Identifizieren Sie auf dem Host den seriellen Port mit `ls /dev/serial/by-id`
4. Konfigurieren Sie auf der Adapter-Admin-Seite entsprechend
5. Aktualisierungsintervall anpassen (1s: vollständiger Stream wird verarbeitet)

Hinweise:

- Im SBMS-Handbuch heißt es, dass die Baudrate 921,6k möglicherweise nicht zuverlässig ist.
- Wenn der serielle Port im Adapter-Admin konfiguriert ist, sind MQTT und HTML deaktiviert.

### MQTT
1. MQTT-Broker einrichten und iobroker verbinden
2. Verbinden Sie SBMS mit WLAN und MQTT-Broker
3. Identifizieren Sie den ioBroker-Status, der das SBMS-JSON empfängt (Standard: root/sbms).
4. Im SBMS-Adapter-Konfigurationsnamen-Topic im iobroker-Format mit Punkten
5. Aktualisierungsintervall anpassen (1s: jede Aktualisierung des Themenstatus wird verarbeitet)

### RawData-HTML-Seite
Die RawData-HTML-Seite enthält zusätzliche Informationen (z. B. Zähler und Ausgleich).

1. Verbinden Sie SBMS mit WLAN
2. IP ermitteln und statisch einstellen (WLAN-Router)
3. Im SBMS-Adapternamen IP-Adresse
4. Updateintervall anpassen

Wenn MQTT- und HTML-Optionen aktiviert sind, werden die Basisinformationen aus dem MQTT-Stream aktualisiert, während Batterieparameter und Zähler aus der RawPage. Balancing nicht in die allgemeine Datenstruktur eingefügt werden.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 0.4.1 (2025-09-28)
- fix: negative loads when using non-pv chargers

### 0.4.0 (2025-09-25)

Review add to latest:
- Breaking: Object Tree (cells.min > cells.min.voltage, cells.max.ID > cells.maxID)
- added multilanguage support
- fix connection watchdog intervals, change to adapter.intervals, safe ui intervals
- cleaning: devDependencies, object tree, eslint 9
- debug logs changed to iobroker standard


### 0.3.0 (2025-09-15)

- Support for USART Data Log Optin added

### 0.2.0 (2025-09-13)

- New object tree structure for info/parameters, flags and balancing

### 0.1.2 (2025-09-12)

- Added Serial Port

### 0.0.1 (2025-09-02)

- Initial Release

## License

MIT License

Copyright (c) 2025 buffoletti <info@buffoletti.de>

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