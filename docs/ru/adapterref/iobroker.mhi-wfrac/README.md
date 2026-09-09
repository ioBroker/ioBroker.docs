---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mhi-wfrac/README.md
title: ioBroker.mhi-wfrac
hash: tYABUrlQyVBujwOD6o9EtAj7PIvXxuv8jdok7qDfUVo=
---
![Логотип](../../../en/adapterref/iobroker.mhi-wfrac/admin/mhi-wfrac.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.mhi-wfrac.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.mhi-wfrac.svg)
![Количество установок](https://iobroker.live/badges/mhi-wfrac-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/mhi-wfrac-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.mhi-wfrac.png?downloads=true)
![Тестирование и выпуск](https://github.com/hacki11/ioBroker.mhi-wfrac/workflows/Test%20and%20Release/badge.svg)

# ioBroker.mhi-wfrac

## Адаптер mhi-wfrac для ioBroker

Кондиционеры Mitsubishi Heavy Industries с адаптером WLAN WF-RAC

Этот адаптер позволяет интегрировать кондиционеры Mitsubishi Heavy Industries, оснащенные технологией WF-RAC (Wi-Fi), в платформу ioBroker.

Код основан на

- <https://github.com/wolkeSoftware/ioBroker.woso_mitsu_aircon_rac>
- <https://github.com/W0w3/ioBroker.mhi_aircon>
- <https://github.com/jeatheak/Mitsubishi-WF-RAC-Integration>
- <https://github.com/mcheijink/WF-RAC>

Большое спасибо за вашу работу — она мне очень помогла.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.3.0 (2026-07-07)
- (copilot) Adapter requires node.js >= 22 now
- (hacki11) Add support for WF-RAC firmware v200
- (hacki11) Maintenance work for repo checker warnings and project housekeeping

### 2.2.0 (2026-02-28)
* (hacki11) Update dependencies
* (hacki11) Update minimum node version
* (hacki11) Fix ioBroker issues

### 2.1.7 (2025-05-17)
* (hacki11) Set `online` to false on adapter shutdown

### 2.1.6 (2025-05-05)
* (hacki11) Fix: `swingUpDown` was not writeable

### 2.1.5 (2025-04-28)
* (hacki11) Fix: Errorhandler used undefined aircon channel
* (hacki11) Increased retry count to workaround hourly aircon resets

[Older changelogs can be found there](https://github.com/hacki11/ioBroker.mhi-wfrac/blob/main/CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2025-2026 hacki11  
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