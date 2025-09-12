---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.pirate-weather/README.md
title: ioBroker.pirate-weather
hash: ovEFc1olkHWgOzghIJRM7HIsrmPuct5Lrd7lpN30I6E=
---
![Логотип](../../../en/adapterref/iobroker.pirate-weather/admin/pirate-weather.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.pirate-weather.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.pirate-weather.svg)
![Количество установок](https://iobroker.live/badges/pirate-weather-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/pirate-weather-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.pirate-weather.png?downloads=true)

# IoBroker.pirate-weather
**Тесты:** ![Тестирование и выпуск](https://github.com/ticaki/ioBroker.pirate-weather/workflows/Test%20and%20Release/badge.svg)

## Пиратско-погодный адаптер для ioBroker
Получите данные из Pirate-Weather.

Необходимый токен API можно получить здесь: https://docs.pirateweather.net/en/latest/. Остальное должно быть понятно.
Объяснение значения отдельных точек данных можно найти здесь: https://docs.pirateweather.net/en/latest/API/

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.4.1 (2025-09-12)
- (ticaki) Humidity is now displayed correctly in percent.  fixes #15
- (ticaki) Wind direction text is now translated into the system iobroker language. fixes #16

### 0.4.0 (2025-08-28)
- (ticaki) In the CA system of units, precipAccumulation is now output in mm.
- (ticaki) Use api version 2

### 0.3.0 (2025-08-25)
- (ticaki) update deps - inital latest release
- (ticaki) increase delay by 1.5 seconds

### 0.2.0 (2025-08-16)
- (ticaki) Configuration option to enter an interval in minutes. In the event of an error, no accelerated reconnection is used here.
- (ticaki) Use system language for summaries.

### 0.1.4 (2025-08-15)
- (ticaki) Ignore ECONNABORTED error code
- (ticaki) In the event of an error, new connection attempt in 10 minutes
- (ticaki) missing % added
- (ticaki) Startup log message added.

### 0.1.3 (2025-08-12)
- (ticaki) BREAKING: cloudCover, precipProbability, humidity and moonPhase are now percentage values

### 0.1.2 (2025-08-10)
- (ticaki) update icon

### 0.1.1 (2025-08-10)
- (ticaki) First version for the iobroker repository

### 0.1.0 (2025-08-09)
- (ticaki) units (us, ca, uk) added
- (ticaki) beautiful states :)
- (ticaki) Zero minutes and seconds in the interval.
- (ticaki) fixed: Language undefined not exist!

### 0.0.7 (2025-08-09)
- (ticaki) data removed from enumeration names

## License

MIT License

Copyright (c) 2025 ticaki <github@renopoint.de>

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