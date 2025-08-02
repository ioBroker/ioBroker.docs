---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.huum-sauna/README.md
title: ioBroker.huum-сауна
hash: sh9FqHhUnPMCC437HSfs2ydK5SwFcHk8AvZ93qBJVnA=
---
![Логотип](../../../en/adapterref/iobroker.huum-sauna/admin/huum-sauna.png)

![НПМ-версия](https://img.shields.io/npm/v/iobroker.huum-sauna.svg)
![Количество установок](https://iobroker.live/badges/huum-sauna-stable.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.huum-sauna)
![Количество установок (последних)](https://iobroker.live/badges/huum-sauna-installed.svg)
![Лицензия](https://img.shields.io/npm/l/iobroker.huum-sauna.svg)
![НПМ](https://nodei.co/npm/iobroker.huum-sauna.png?downloads=true)

# IoBroker.huum-сауна
Этот адаптер интегрирует устройство управления сауной HUUM в iobroker.
Спецификацию HUUM Devive для управления сауной можно найти [здесь](https://huum.de/). Описание API вы можете найти ([github.com/horemansp/HUUM](https://github.com/horemansp/HUUM))

## Параметры
- 1 + 2 учетных данных пользователя для веб-страницы HUUM «https://api.huum.eu/action/home/»
- 3 обновления.. Обновите, чтобы загрузить данные HUUM с устройства.
- 4 световых пути.. Дополнительный световой путь (состояние) для переключения внешнего света. Если используется метод пустого переключения HUUM
- 5 AstroLight.. При установке свет автоматически включается с заходом солнца (для саун на открытом воздухе).

## Пример использования
![графика](https://user-images.githubusercontent.com/56934142/150417838-425261da-a6c7-47b3-bf1b-2af6035ffd59.png)

## [Журнал изменений](CHANGELOG.md)
-->

## Changelog
<!--
    ### **WORK IN PROGRESS**
-->

### 0.4.5 (2023-10-31)
- Fixed login with no sauna defined
- Steamer Error -> setting humdidity to 0, old version otherwise sauna will be switched off

### 0.4.4 (2023-02-12)
- adapted temp reached when sauna is stopped from the app
- added an offset for temp reached value when use the intelligent sauna mode

### 0.4.3 (2023-01-31)
- Fixed Switchlight when lightpath is empty

### 0.4.2 (2022-09-25)
- Fixes on presets, no more states for the setting

### 0.4.1 (2022-09-25)
-  Added new Preset states for steam or dry saunamode

### 0.4.0 (2022-08-21)
- fixed light external state issue

### 0.3.9 (2022-08-20)
- added steamerError, when error occurs sauna is switched off and a warning is documented
- saftey issue, reduce targettemperatur when in steam mode
- some minor changes

### 0.3.8 (2022-08-04)
- Add Sauna Sleep Refresh Time as parameter, when set to 0 there is no traffic otherwise update in minutes

### 0.3.7 (2022-02-26)
- add Sauna Images -> adapted from icons-mfd-svg Images
- added sleepRefresh when Sauna is switched off to reduce network traffic (30 minutes)

### 0.3.6 (2022-02-20)
- release script
- fixes

### 0.3.1 (2022-02-20)
- included automated switch on light

### 0.3.0 (2022-02-13)
- create stable version

### 0.2.1 (2022-01-30)
- create npm package

### 0.2.0 (2022-01-30)  - 2022 Release
- minor Version created

### 0.1.10 (2022-01-30)
- added Trigger (state targetTempReached) when sauna temperature is reached
- Minor bug fixes and code revisions

### 0.1.7
- starting sauna with target temperature and humidity
- switch on light in sauna (also on separat id)
- subscribe also foreign state id
- minor bugs and code revision

### 0.1.6
- starting sauna with target temperature
- switch on light in sauna (also on separat id)
- get sauna status

### 0.1.0
- initial version

<!--

## License
MIT License

Copyright (c) 2023 Chris besterquester@live.at

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

Copyright (c) 2023 Chris besterquester@live.at
