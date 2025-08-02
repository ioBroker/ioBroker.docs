---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.philips-tv/README.md
title: ioBroker.philips-tv
hash: 67VlpDL7OnTXlujO0BCdJiqkmEua0uGVdLXQsckpYVo=
---
![Логотип](../../../en/adapterref/iobroker.philips-tv/admin/philips-tv.png)

![версия NPM](https://img.shields.io/npm/v/iobroker.philips-tv.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.philips-tv.svg)
![Количество установок](https://iobroker.live/badges/philips-tv-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/philips-tv-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.philips-tv.png?downloads=true)

# IoBroker.philips-tv
**Тесты:** ![Тестируйте и выпускайте](https://github.com/AlCalzone/ioBroker.philips-tv/workflows/Test%20and%20Release/badge.svg)

## TV адаптер Philips для ioBroker
Адаптер для управления телевизорами Philips по сети

## Отказ от ответственности
Разработчики этого модуля никоим образом не одобрены и не связаны с Koninklijke Philips N.V. или какими-либо связанными дочерними компаниями, логотипами или товарными знаками.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.5.2 (2022-10-26)
* (foxriver76) we renamed `customAmbilightCommand` to `currentAmbilightConfiguration` and update the state on polling (closes #431)
Please delete `customAmbilightCommand` manually

### 0.5.1 (2022-10-17)
* (foxriver76) fix `ESOCKETTIMEDOUT` on post requests

### 0.5.0 (2022-10-17)
* (foxriver76) added new state `hdmiInput` without relying on Google Assistant

### 0.4.5 (2022-10-06)
* (foxriver76) fixed communication with API

### 0.4.4 (2022-10-06)
* (foxriver76) fix build

### 0.4.3 (2022-10-06)
* (foxriver76) try to fix `ESOCKETTIMEDOUT`

### 0.4.0 (2022-09-17)
* (foxriver76) marked state definitions of launch commands to be read-only
* (foxriver76) we now use the real device name for the device object
* (foxriver76) workaround to switch hdmi input via Google Assistant

### 0.3.2 (2022-09-17)
* (foxriver76) corrected button `PlayPause` to lowercase `playPause`

### 0.3.1 (2022-09-16)
* (foxriver76) added admin v5 dependency

### 0.3.0 (2022-09-12)
* (foxriver76) adapter rework to support Android and JointSpace V6 API
* __BREAKING__: Please use the adapter config to configure this instance properly

### 0.2.0
* (AlCalzone) Support sending key presses

### 0.1.0
* (AlCalzone) Initial release

## License
MIT License

Copyright (c) 2022 Moritz Heusinger <moritz.heusinger@gmail.com>

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
