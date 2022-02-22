---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.hikvision-alarmserver/README.md
title: ioBroker.hikvision-alarmserver
hash: AY7QhbmgeBfqcBWFAuLw+g/FAJ6YmDXQcdhlF9dTeHE=
---
![Logo](../../../en/adapterref/iobroker.hikvision-alarmserver/admin/hikvision-alarmserver.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.hikvision-alarmserver.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.hikvision-alarmserver.svg)
![Anzahl der Installationen](https://iobroker.live/badges/hikvision-alarmserver-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/hikvision-alarmserver-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/raintonr/iobroker.hikvision-alarmserver.svg)
![NPM](https://nodei.co/npm/iobroker.hikvision-alarmserver.png?downloads=true)

# IoBroker.hikvision-alarmserver
**Tests:** ![Testen und freigeben](https://github.com/raintonr/ioBroker.hikvision-alarmserver/workflows/Test%20and%20Release/badge.svg)

## Hikvision Alarm Server-Adapter für ioBroker
Ein Adapter zum Empfangen von Alarmen/Ereignissen, die von Hikvision-Kameras gesendet werden.

Getestet mit einfachen und intelligenten Ereignissen auf Hikvision DS-2CD2143G2-I. Erfolgs-/Fehler-/Fehlerberichte sind willkommen.

## Verwendung
Die Adapterinstanz erstellt einen booleschen Zustand für jede gemeldete Kombination aus Kamera/Ereignistyp. Kameras werden anhand der MAC-Adresse identifiziert (begrenzt durch die von der Kamera bereitgestellten Informationen).

Es scheint, dass Kameras jede Sekunde wiederholt Ereignisse ausgeben, wenn diese Ereignisse noch gültig sind, aber keine Nachricht gesendet wird, um sie zu löschen. Aus diesem Grund löscht der Adapter automatisch Ereignisse, die länger als 5 Sekunden nicht erneut gemeldet wurden.

## Aufbau
### IoBroker
Wählen Sie in der Adapterkonfiguration einen freien Port aus, auf dem der Adapter lauschen soll (standardmäßig 8089).

### Vor der Kamera
Besuchen Sie die Konfigurationsseite Ihrer Kamera(s) und definieren Sie die IP-/Host- und Porteinstellungen von ioBroker:

![Alarmserver-Optionen](../../../en/adapterref/iobroker.hikvision-alarmserver/docs/images/alarm-server-options.png)

Stellen Sie sicher, dass die Verknüpfung in den Ereignissen, die Sie ioBroker melden möchten, „Überwachungszentrum benachrichtigen“ enthält. Z.B:

![Bewegungserkennungsoptionen](../../../en/adapterref/iobroker.hikvision-alarmserver/docs/images/motion-detection-options.png)

## Changelog

### 0.0.2
* (Robin Rainton) initial release.

## License
MIT License

Copyright (c) 2022 Robin Rainton <robin@rainton.com>

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