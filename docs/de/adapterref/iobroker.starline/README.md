---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.starline/README.md
title: ioBroker.starline
hash: uSGA8rTiU9pBpcSEn6/WSYsQNZE1ssAb1lr9DO8EPS4=
---
![Logo](../../../en/adapterref/iobroker.starline/admin/starline_git.jpg)

![Spenden](https://img.shields.io/badge/Donate-PayPal-green.svg)

# IoBroker.starline
Mit dem Adapter können Sie Fahrzeugstatusdaten über den StarLine Telematics-Dienst (https://starline-online.ru) abrufen.

##### Steuerung der wichtigsten Alarmfunktionen:
- Aktivieren/Deaktivieren des Systems
- Aktivieren Sie die AntiHiJack-Funktion
- Fernstart des Motors
- Aktivieren Sie den Valet-Modus (Servicemodus).
- Hilfskanäle auslösen
- Webasto-Heizung ein-/ausschalten (falls vorhanden)
- Fordern Sie die GPS-Koordinaten des Fahrzeugs an
- Deaktivieren Sie die Stoß- und Neigungssensoren

Für die Arbeit mit dem Ladegerät ist ein neues, leistungsstarkes und leistungsstarkes Dienstprogramm erforderlich, das die StarLine-Telematikdienste 2.0 unterstützt.

Der Drucker ist bereit, die folgenden Autokosten für den StarLine-Telematikdienst zu nutzen. https://starline-online.ru.

##### Управление основными режимами работы автосигнализации:
  - Постановка/снятие с охраны
  - Aktivierung der AntiHiJack-Funktion
  - Автозапуск
  - Активация servisnoго режима (Valet)
  - Активация доп. каналов
  - Sperrung/Öffnungssperre für Webasto (dies ist der Fall)
  - Запрос координат автомобиля
  - Отключение датчиков удара и наклона

## Changelog

#### 2.1.0
* (tglynx) modernized the adapter to support the current (August 2025) starline website api

#### 2.0.0
* (instalator) latest working version from 2021

#### 1.1.3
* (instalator) fixed error parse mayak

#### 1.1.2
* (instalator) fixed objects
* (instalator) fixed interval

#### 1.1.1
* (instalator) fixed send command

#### 1.1.0
* (instalator) fixed auth
* (instalator) added support admin3

#### 1.0.0
* (instalator) up to stable

#### 0.2.0
* (instalator) fix error sendCommand

#### 0.1.9
* (instalator) change send command, 
* (instalator) fix parse balance"

#### 0.1.8
* (instalator) change link getdata

#### 0.1.7
* (instalator) change position x and y to longitude and latitude

#### 0.1.5
* (instalator) release

#### 0.1.2
* (instalator) fix widget for new structure

#### 0.1.1
* (Bluefox) changed the structure of the widget

#### 0.1.0
* (instalator) add widget

#### 0.0.3
* (instalator) added monitoring function
* (instalator) added control function

#### 0.0.2
* (instalator) initial release

## License
The MIT License (MIT)

Copyright (c) 2021 instalator <vvvalt@mail.ru>

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