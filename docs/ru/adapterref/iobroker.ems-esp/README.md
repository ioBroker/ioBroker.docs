---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ems-esp/README.md
title: ioBroker.ems-esp
hash: C/kKfnlXzTppJxgSLeJa/aEjjErCh3Jdx0W6PGGMZ0E=
---
![Логотип](../../../en/adapterref/iobroker.ems-esp/admin/ems-esp.png)

![НПМ-версия](https://img.shields.io/npm/v/iobroker.ems-esp.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.ems-esp.svg)
![Количество установок (последних)](https://iobroker.live/badges/ems-esp-installed.svg)
![Количество установок (стабильно)](https://iobroker.live/badges/ems-esp-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.ems-esp.png?downloads=true)

# IoBroker.ems-esp
**Тесты:** ![Тестирование и выпуск](https://github.com/tp1de/ioBroker.ems-esp/workflows/Test%20and%20Release/badge.svg)

## Системы отопления Bosch / Buderus с интерфейсом km200 / IP-inside и/или ems-esp
Адаптер поддерживает интерфейс с системами отопления Bosch Group по шине EMS или EMS+.
(Будерус/Юнкерс/Нетфит и т.д.).

## Он может взаимодействовать с системой отопления с использованием вызовов Web-API для:
* км200, км200 грн, км100, км50, HMC300 или IP-inside (от Bosch Group)

* шлюз ems-esp (https://github.com/emsesp/EMS-ESP32) с последней версией для разработчиков (см. ниже) и чипом ESP32.

Старые шлюзы ESP8266 с API V2 БОЛЬШЕ НЕ ПОДДЕРЖИВАЮТСЯ! Адаптер протестирован для шлюза ems-esp с последней версией прошивки (> V3.6.0) ESP32. Последние версии прошивки для разработчиков могут работать нестабильно с адаптером ioBroker. Использование осуществляется на свой страх и риск.

* Новые облачные шлюзы Bosch-Group (MX300 / EasyControl ...) не поддерживаются, поскольку они не поддерживают LAN API!

Адаптер ioBroker ems-esp может считывать и записывать данные на оба шлюза для управления всеми компонентами отопления.
Его можно использовать либо для оригинальных шлюзов Bosch-Group, либо для ems-esp, либо для обоих параллельно.
Все измененные состояния из собственных скриптов или браузера объектов должны устанавливать подтверждение = false !!!

## НОВОЕ в версии >= 3.3.0: Введены предупреждения об использовании непродуктивной прошивки ems-esp.
Документация на немецком языке: https://github.com/tp1de/ioBroker.ems-esp/blob/main/doc/ems-esp-ds.pdf Документация на английском языке: https://github.com/tp1de/ioBroker.ems-esp /blob/main/doc/ems-esp-es.pdf Немецкий форум ioBroker: https://forum.iobroker.net/topic/45862/neuer-adapter-ems-esp-f%C3%BCr-bosch-heizungen

# Iobroker.ems-esp

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 3.5.0 (2024-05-15)
* warm water starts not supported anymore within statistics due to namechanges within ems-esp firmware 3.7

### 3.4.4 (2024-05-15)
* improve delays between axios get requests for km200 and ems-esp to avoid errors

### 3.4.3 (2024-05-14)
* corrections for reading gateway data for km200 gateway

### 3.4.2 (2024-05-13)
* update dependencies
* replace setTimeout by adapter.delay

### 3.4.1 (2024-04-26)
* correct enum settings for ems-esp gateway on adapter start

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