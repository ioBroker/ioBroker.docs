---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.wamo/README.md
title: ioBroker.wamo
hash: 1d30Q1AUHOsYbjAwwPiega1VUgb93964BIzEdfTSDak=
---
![Логотип](../../../en/adapterref/iobroker.wamo/admin/wamo.png)

![версия NPM](https://img.shields.io/npm/v/iobroker.wamo.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.wamo.svg)
![Количество установок](https://iobroker.live/badges/wamo-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/wamo-stable.svg)
![Статус зависимости](https://img.shields.io/david/smarthausleben/iobroker.wamo.svg)
![НПМ](https://nodei.co/npm/iobroker.wamo.png?downloads=true)

# IoBroker.wamo
**Тесты:** ![Тестируйте и выпускайте](https://github.com/smarthausleben/ioBroker.wamo/workflows/Test%20and%20Release/badge.svg)

## Wamo адаптер для ioBroker
Этот адаптер добавляет мониторинг защиты от утечек «wamo» к вашей установке ioBroker.

Адаптер подключается к вашему устройству защиты от утечек **SYR SafeTech Connect 2422** или **POLYGONVATRO**, чтобы считывать данные с устройства и создавать некоторые статистические данные, такие как история потребления воды.

SYR SaveTech Connect 2422: https://www.syr.de/de/Produkte/CB9D9A72-BC51-40CE-840E-73401981A519/SafeTech-Connect Блок POLYGONVATRO под капотом представляет собой блок SYR SaveTech Connect 2422, но без давления - датчик температуры и электропроводности. Блок POLYGONVATRO в настоящее время недоступен.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.2.13 (2022-10-12)
* (smarthausleben) add: new property "createoOnStartup" in DeviceParameter
* (smarthausleben) add: new property "saveRawData" in DeviceParameter
* (smarthausleben) change: creating all state objects during startup to avoid calling "setObjectNotExistsAsync" later on
* (smarthausleben) add: Profile parameter raw states
* (smarthausleben) change: default value for "factor_german_water_hardnes" changed to 0.0296041666666667
* (smarthausleben) FIX update german water hardnes factor object (GHARDFACTOR) during startup 

### 0.2.12 (2022-09-20)
* (smarthausleben) Release 0.2.12

### 0.2.11 (2022-09-19)
* (smarthausleben) Release 0.2.11

### 0.2.10 (2022-09-19)
* (smarthausleben) state types changed UNI, PSD, CSD, TSD, T2
* (smarthausleben) states changable UNI, PSD, CSD, TSD, T2
* (smarthausleben) added DeviceControls RST (restart device)
* (smarthausleben) new channel DeviceControl
* (smarthausleben) added unit for GHARDNESS (°dH)
* (smarthausleben) new state GHARDFACTOR (calculation factor German water hardnes)

### 0.2.9 (2022-08-12)
* (smarthausleben) states changable ATP, BTB, BSA, BUZ, DMA, DRP, IDS, LNG, LWT
* (smarthausleben) state types changed ATP, BSA, BUZ, DMA, DRP, DWL, IDS, LNG, LWT
* (smarthausleben) added states TMZ, TN, 71, ALD, CLP, BPB
* (smarthausleben) added channel and states for self learning: SLP, SLO, SOF, SMF, SLE, SLV, SLT, SLF
* (smarthausleben) change splitted options into two tabs 
* (smarthausleben) added options to define timeout for axios request 
* (smarthausleben) added options for delay time between reconection try to device if connection got lost
* (smarthausleben) change - exported Parameter declarations and parameter collections for timer into a seperate file 'lib/device-parameters.js'

## License
MIT License

Copyright (c) 2022 smarthausleben <info@smarthausleben.de>

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