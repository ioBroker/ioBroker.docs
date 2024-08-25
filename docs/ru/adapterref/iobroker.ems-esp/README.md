---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ems-esp/README.md
title: ioBroker.ems-esp
hash: elU8v7ZAgneVz347C06yN0EWDQkmPmhe8/wbzQUEObM=
---
![Логотип](../../../en/adapterref/iobroker.ems-esp/admin/ems-esp.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.ems-esp.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.ems-esp.svg)
![Количество установок (последнее)](https://iobroker.live/badges/ems-esp-installed.svg)
![Количество установок (стабильно)](https://iobroker.live/badges/ems-esp-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.ems-esp.png?downloads=true)

# IoBroker.ems-esp
**Тесты:** ![Тест и выпуск](https://github.com/tp1de/ioBroker.ems-esp/workflows/Test%20and%20Release/badge.svg)

## Системы отопления Bosch / Buderus с интерфейсом km200 / IP-inside и/или ems-esp
Адаптер поддерживает интерфейс с системами отопления от Bosch Group с использованием шины EMS или EMS+.
(Buderus / Junkers / Netfit и т. д.).

## Он может взаимодействовать с системой отопления с помощью вызовов Web-API для:
* km200, km200 hrv, km100, km50, HMC300 или IP-inside (от Bosch Group)

* шлюз ems-esp (https://github.com/emsesp/EMS-ESP32) с чипом ESP32.

Старые шлюзы ESP8266 с API V2 больше не поддерживаются!! Адаптер протестирован для шлюза ems-esp с последней стабильной версией прошивки (V3.6.5) Последние версии прошивки для разработчиков могут работать нестабильно с адаптером ioBroker. Используйте на свой страх и риск.

* Новые облачные шлюзы Bosch-Group (MX300 / EasyControl ...) не поддерживаются, поскольку они не поддерживают LAN API!

Адаптер ioBroker ems-esp может считывать и записывать данные на оба шлюза для управления всеми компонентами отопления.
Его можно использовать как для исходных шлюзов Bosch-Group, так и для ems-esp или для обоих параллельно.
Все измененные состояния из собственных скриптов или браузера объектов должны устанавливать acknowledged = false !!!

Немецкая документация: https://github.com/tp1de/ioBroker.ems-esp/blob/main/doc/ems-esp-ds.pdf Английская документация: https://github.com/tp1de/ioBroker.ems-esp/blob/main/doc/ems-esp-es.pdf Немецкий форум ioBroker: https://forum.iobroker.net/topic/45862/neuer-adapter-ems-esp-f%C3%BCr-bosch-heizungen

# Iobroker.ems-esp

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 4.7.2 (2024-08-17)
* ems-esp: enable writing on custom entities

### 4.7.1 (2024-08-17)
* ems-esp: custom entities are now under object structure "custom"

### 4.7.0 (2024-08-16)
* ems-esp: do not allow more then one thermostat for extended own entities
* ems-esp: error correction for holidayModes custom entities

### 4.6.4 (2024-08-14)
* ems-esp: error correction on polling for 3.6.5

### 4.6.3 (2024-08-14)
* small adjustments
* dependabot updates dependencies

## License
MIT License

Copyright (c) 2024 Thomas Petrick <tp1degit@gmail.com>

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
*OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE."
