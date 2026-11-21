---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.accuweather/README.md
title: ioBroker.accuweather
hash: hQE5pTtWK2HaJprmVg7nl0ULro1HqR/mMHIOVpF2jdo=
---
![Логотип](../../../en/adapterref/iobroker.accuweather/admin/accuweather.png)

![Количество установок](https://iobroker.live/badges/accuweather-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.accuweather.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.accuweather.svg)
![НПМ](https://nodei.co/npm/iobroker.accuweather.png?downloads=true)

# ioBroker.accuweather

## Адаптер AccuWeather для ioBroker

Прогноз погоды с использованием API AccuWeather.

Адаптер принимает

- Текущая ситуация (обновляется каждый час), (24 запроса)
- Ежедневный прогноз погоды на 5 дней (обновление ежедневно примерно в 7:00 и 20:00), (2 запроса)
- и прогноз погоды на 12 часов (обновляется каждые шесть часов в 00:00, 06:00, 12:00 и 18:00). (4 запроса)

По умолчанию адаптер обновляет устаревшие данные только при перезапуске. Допускается 50 запросов в день, для обновления всех данных после каждого перезапуска потребуется 3 запроса.

## Начиная

### Получить ключ API

Чтобы получить ключ API, зарегистрируйтесь на <https://developer.accuweather.com/> и создайте приложение. `My Apps` меню. После создания приложения вам будет сгенерирован ключ API. Для бесплатного использования можно отправлять 50 запросов к API в день. Было отмечено, что для работы API предпочтительны следующие настройки (пожалуйста, выберите свою страну!):![настройки](../../../en/adapterref/iobroker.accuweather/admin/image.png)

### Получить ключ местоположения

Чтобы получить ключ местоположения, перейдите на [сайт https://www.accuweather.com/](https://www.accuweather.com/) и введите название своего города или попробуйте ввести свои координаты (широта, долгота) так, как они у вас есть, например, в настройках ioBroker. Ваш ключ местоположения будет числом в конце URL-адреса прогноза.

### Используется в визуализации Lovelace (начиная с версии 1.1.0)

В сводном канале отображается текущий и посуточный прогноз погоды с указанием ролей/типов состояний, поддерживаемых детектором типов. Новая функция позволяет отображать прогноз погоды в пользовательском интерфейсе Lovelace. Для лучшего отображения создается пользовательская карточка Lovelace — см. <https://github.com/algar42/IoB.lovelace.accuweather-card>

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog

### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22.19.0 now
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 2.3.0 (2026-05-04)
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (mcm1957) Dependencies have been updated

### 2.2.0 (2026-02-10)
- (copilot) Adapter requires admin 7.6.17 now
- (mcm1957) Dependencies have been updated

### 2.1.1 (2025-09-02)
* (mcm1957) Dependencies have been updated

### 2.1.0 (2025-01-22)
* (ticaki) Change: min. js-controller to 6.0.11
* (ticaki) Change: Outdated data is updated at startup.
* (ticaki) New: Photo link added in current weather
* (ticaki) New: Metric and Imperial are available for selection - Will be taken into account with the next data update.
* (ticaki) New: In the event of a data retrieval error, an attempt is made again after 10 minute
* (ticaki) Remove admin option (restart blocking)
* (ticaki) Rewritten in Typescript
* (ticaki) For error codes from the 400 series, do not attempt any unscheduled reconnections.

### 2.0.1 (2025-01-18)
* (ticaki) BREAKING: Requires Nodejs 20 or higher
* (ticaki) BREAKING: Command states are now buttons and only respond to ack=false. 
* (ticaki) admin option: No data is updated on adapter startup (default: true). 
* (ticaki) apikey renamed and encrypted
* (ticaki) Dependencies and eslint updated
* (devtronic) Add nextHour.CloudCover

## License
MIT License

Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2021-2023 algar42 <igor.aleschenkov@gmail.com>

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