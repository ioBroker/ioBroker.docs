---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.airconwithme/README.md
title: ioBroker.airconwithme
hash: 8At/uj5Yzl9hmpuibkprJWHGXlAOxZ39o+m/yrb3x+M=
---
![Логотип](../../../en/adapterref/iobroker.airconwithme/admin/airconwithme.png)

![версия НПМ](http://img.shields.io/npm/v/iobroker.airconwithme.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.airconwithme.svg)
![Количество установок (последнее)](http://iobroker.live/badges/airconwithme-installed.svg)
![Количество установок (стабильное)](http://iobroker.live/badges/airconwithme-stable.svg)
![Статус зависимости](https://img.shields.io/david/weggetor/iobroker.airconwithme.svg)
![Известные уязвимости](https://snyk.io/test/github/weggetor/ioBroker.airconwithme/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.airconwithme.png?downloads=true)

# IoBroker.airconwithme
**Тесты:** ![Тестирование и выпуск](https://github.com/weggetor/ioBroker.airconwithme/workflows/Test%20and%20Release/badge.svg)

## Адаптер airconwithme для ioBroker
Адаптер для кондиционера Mitsubishi с беспроводным адаптером Airconwithme

## Информация
В настройках адаптера необходимо указать IP-адрес WLAN-адаптера вашего кондиционера. Имя пользователя и пароль для адаптера Intesis по умолчанию: «admin» + «admin».

Большинство точек данных доступны только для чтения, вы можете установить следующее:

| Точка данных | Значения |
|----------|----------|
| вкл | 0: Выкл; 1: Вкл |
| userMode | 0: Авто; 1: Обогрев; 2: Осушение; 3: Вентилятор; 4: Охлаждение |
| fanSpeed | 1: Скорость 1; 2: Скорость 2; 3: Скорость 3; 4: Скорость 4 |
| позиция | 1: Позиция 1; 2: Позиция 2; 3: Позиция 3; 4: Позиция 4; 10: Свинг |
| userSetpoint | температура (°C) |
| remoteDisable | 0: Включить; 1: Отключить |

## Changelog
### 1.0.0 (2025-11-15)
* (weggetor) **MAJOR RELEASE**: Complete adapter modernization
* (weggetor) **BREAKING**: Migrated to TypeScript with modern ES2020+ features
* (weggetor) **SECURITY**: Updated all dependencies, eliminated vulnerabilities (0 vulnerabilities!)
* (weggetor) **ENHANCEMENT**: Complete code refactoring with proper error handling and logging
* (weggetor) **ENHANCEMENT**: Improved session management with smart caching and reconnection logic
* (weggetor) **ENHANCEMENT**: Modern GitHub Actions CI/CD pipeline with automated testing
* (weggetor) **ENHANCEMENT**: Enhanced type safety with comprehensive TypeScript interfaces
* (weggetor) **ENHANCEMENT**: Modular code structure for better maintainability

### 0.0.4
* (weggetor) Bugfix sending username + password to Intesis API (formerly send admin/admin hardcoded)

### 0.0.3
* (weggetor) Renamed some variables to avoid possible interference with other adapters, removed not used adminTab

### 0.0.2
* (weggetor) Modifications to automatic build incl. upload to npm

### 0.0.1
* (weggetor) initial release

## License
MIT License

Copyright (c) 2025 Torsten Weggen <info@bitboxx.net>

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