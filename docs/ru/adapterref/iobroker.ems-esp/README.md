---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ems-esp/README.md
title: ioBroker.ems-esp
hash: r4Xvby0it7js6RYm5F4gfMQb8Ffqie79977L1g6vXSc=
---
![Логотип](../../../en/adapterref/iobroker.ems-esp/admin/ems-esp.png)

![НПМ-версия](https://img.shields.io/npm/v/iobroker.ems-esp.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.ems-esp.svg)
![Количество установок (последних)](https://iobroker.live/badges/ems-esp-installed.svg)
![Количество установок (стабильно)](https://iobroker.live/badges/ems-esp-stable.svg)
![Статус зависимости](https://img.shields.io/david/tp1de/iobroker.ems-esp.svg)
![НПМ](https://nodei.co/npm/iobroker.ems-esp.png?downloads=true)

# IoBroker.ems-esp
**Тесты:** ![Тестирование и выпуск](https://github.com/tp1de/ioBroker.ems-esp/workflows/Test%20and%20Release/badge.svg)

## Системы отопления Bosch / Buderus с интерфейсом km200 / IP-inside и/или ems-esp
Адаптер поддерживает интерфейс с системами отопления Bosch Group по шине EMS или EMS+.
(Будерус/Юнкерс/Нетфит и т.д.).

## Он может взаимодействовать с системой отопления с использованием вызовов Web-API для:
* км200, км200 грн, км100, км50, HMC300 или IP-inside (от Bosch Group)

* шлюз ems-esp (https://github.com/emsesp/EMS-ESP32) с последней версией для разработчиков (см. ниже) и чипом ESP32.

  Старые шлюзы ESP8266 с API V2 БОЛЬШЕ НЕ ПОДДЕРЖИВАЮТСЯ!

* Новые облачные шлюзы (MX300...) не поддерживаются!

Адаптер ioBroker ems-esp может считывать и записывать данные на оба шлюза для управления всеми компонентами отопления.
Его можно использовать либо для исходных шлюзов группы Bosch, либо для ems-esp, либо для обоих параллельно.

## Все измененные состояния из собственных скриптов или браузера объектов должны устанавливать Accepted = false !!!
Адаптер протестирован для шлюза ems-esp с последней версией прошивки (V3.6.0) ESP32.

## НОВИНКА Для записей и статистики энергопотребления требуется активный экземпляр базы данных.
Для записей требуется адаптер InfluxDB версии >= 4.0.2, который позволяет удалять записи базы данных. Период восстановления теперь считывается, и записи сохраняются только в течение периода хранения. Бета-статус InfluxDB v2 требует, чтобы период хранения был установлен на > 2 года для хранения. все исторические ценности.
В V2 это глобальный параметр для всех состояний!

## НОВОЕ: улучшен гистерезис потребности в тепле.
Потребность в тепле для каждого термостата активна, когда фактическая температура ниже (заданная температура – дельта).
Потребность в тепле неактивна, когда фактическая температура выше целевой температуры.
Убедитесь, что дельта достаточно высока, чтобы избежать слишком частого запуска котла.

## НОВИНКА: параметры потребности в тепле можно изменить во время активного экземпляра.
Параметры потребности в тепле (дельта/вес для каждого термостата) могут быть изменены внутри объектов во время активного экземпляра. Параметры потребности в тепле (вес вкл/вес для каждого контура отопления) могут быть изменены внутри объектов во время активного экземпляра.

Документация на немецком языке: https://github.com/tp1de/ioBroker.ems-esp/blob/main/doc/ems-esp-ds.pdf.

Английская документация: https://github.com/tp1de/ioBroker.ems-esp/blob/main/doc/ems-esp-es.pdf.

# Iobroker.ems-esp

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* influxdb adapter version >= 4.0.2 required 
* store km200 recordings only within defined retention period for influxdb
* delay start of statistics by 5 minutes

### 2.7.5 (2024-02-02)
* allow only positive deltam in config for heat demand function

### 2.7.4 (2024-02-01)
* avoid sql errors on instance start

### 2.7.3 (2024-01-31)
* error correction for heat demand function

### 2.7.2 (2024-01-31)
* error correction for heat demand function

### 2.7.1 (2024-01-30)
* improve error processing for wrongly defined heat demand states

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
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE."