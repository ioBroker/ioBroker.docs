---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mhi-wfrac/README.md
title: ioBroker.mhi-wfrac
hash: nmu9PXm/uPrkE/fQBD+eMW7gWSJZZfWdwueBLhlJDcY=
---
![Логотип](../../../en/adapterref/iobroker.mhi-wfrac/admin/mhi-wfrac.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.mhi-wfrac.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.mhi-wfrac.svg)
![Количество установок](https://iobroker.live/badges/mhi-wfrac-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/mhi-wfrac-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.mhi-wfrac.png?downloads=true)

# IoBroker.mhi-wfrac
**Тесты:** ![Тест и выпуск](https://github.com/hacki11/ioBroker.mhi-wfrac/workflows/Test%20and%20Release/badge.svg)

## Адаптер mhi-wfrac для ioBroker
Кондиционеры Mitsubishi Heavy Industries с адаптером WLAN WF-RAC

Этот адаптер интегрирует кондиционеры Mitsubishi Heavy Industries с WF-RAC (Wifi) в ioBroker.

Код основан на

- https://github.com/wolkeSoftware/ioBroker.woso_mitsu_aircon_rac
- https://github.com/W0w3/ioBroker.mhi_aircon
- https://github.com/jeatheak/Mitsubishi-WF-RAC-Integration
- https://github.com/mcheijink/WF-RAC

Большое спасибо за вашу работу. Она мне очень помогла.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.1.2 (2025-03-31)
* (hacki11) Fix review findings

### 2.1.1 (2025-03-13)
* (hacki11) Migrate to eslint9

### 2.1.0 (2025-03-11)
* (hacki11) Add `online` datapoint representing the reachability of each device
* (hacki11) Workaround the built-in hourly reboot of the WF-RAC module

### 2.0.0 (2025-03-09)
* (hacki11) Bring Adapter Stable
* (hacki11) Support multiple devices
* (hacki11) Fix Read Operation Mode 'Auto'
* (hacki11) Set `info.connection` to `false` when adpater is unloading

### 1.0.2
* (wolkeSoftware) made Entrust (3D Auto) changeable

### 1.0.1
* (wolkeSoftware) initial release

## License
MIT License

Copyright (c) 2025 hacki11

Copyright (c) 2023 W0w3

Copyright (c) 2023 wolkeSoftware

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