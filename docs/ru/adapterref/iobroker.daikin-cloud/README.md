---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.daikin-cloud/README.md
title: ioBroker.daikin-cloud
hash: F6mYvo4E6aBpGyEDB6JdzQjWJ0imE9aKjcNATYTRNBk=
---
![Логотип](../../../en/adapterref/iobroker.daikin-cloud/admin/daikin-cloud.jpg)

![Количество установок](http://iobroker.live/badges/daikin-cloud-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.daikin-cloud.svg)
![Тестирование и выпуск](https://github.com/Apollon77/iobroker.daikin-cloud/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/daikin-cloud/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.daikin-cloud.svg)

# ioBroker.daikin-cloud

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 5.0.

## адаптер daikin-cloud для ioBroker

Управляйте устройствами Daikin, подключенными только к облаку Daikin / приложению Onecta. Адаптер подключается к облаку Daikin и получает оттуда данные. Для этого необходимо найти учетную запись разработчика Daikin Europe и создать там приложение. Затем адаптер будет использовать учетные данные этого приложения для подключения к облаку Daikin.

## Отказ от ответственности

**Все названия продуктов и компаний, а также логотипы являются товарными знаками™ или зарегистрированными® товарными знаками соответствующих владельцев. Их использование не подразумевает какой-либо связи с ними или их дочерними компаниями, а также не подразумевает одобрения с их стороны! Этот личный проект создан в свободное время и не преследует коммерческих целей.** **Daikin является товарным знаком компании DAIKIN INDUSTRIES, LTD.**

## Совместимость

Этот адаптер должен быть совместим с устройствами, оснащенными беспроводными адаптерами Daikin WLAN-Adapters **BRP069C4x** , которыми можно управлять через приложение Daikin Onecta. Локальное подключение к этим устройствам невозможно!

Примечание: Для устройств со старыми адаптерами WLAN, такими как **BRP069A4x** , которые можно использовать только с приложением Daikin Controller, используйте вместо них адаптер [Daikin](https://github.com/Apollon77/ioBroker.daikin) .

## Функциональность

В новых устройствах Daikin, продаваемых с 2020 года, используется более современный Wi-Fi адаптер (например, BRP069C4x), который подключается только к облаку Daikin и больше не доступен локально. Управление этими устройствами осуществляется только с помощью приложения Daikin Onecta.

Этот адаптер позволяет первоначально (надеемся, один раз) получить токены, используя личную учетную запись разработчика и одноразовый вход в систему. После этого эти токены можно использовать и обновлять для взаимодействия с устройствами.

После подключения к учетной записи Daikin Cloud адаптер автоматически создаст новое устройство для каждого устройства, подключенного к Daikin Cloud. Отображаются все доступные данные, и несколько состояний позволяют управлять устройством. **Обратите внимание, что скорость выполнения команд в Daikin Cloud не очень высока, это означает, что может потребоваться до 3 минут, прежде чем команда будет фактически выполнена или состояния обновлены!**

Кроме того, существует ограничение на количество запросов к API Daikin Cloud — 200 в день. В связи с этим, пожалуйста, примите во внимание следующие рекомендации:

- Интервал опроса по умолчанию в 15 минут должен быть достаточным для большинства сценариев использования, оставляя при этом некоторое пространство для управления устройствами. Учтите, что каждое действие управления требует двух запросов (один для управления, другой для обновления данных через 1 минуту после вызова управления). Особенно при большом количестве устройств это может стать серьезной проблемой.
- Адаптер также поддерживает "медленный опрос", позволяющий задать собственный интервал. Используйте состояние.`useSlowPolling` Чтобы включить или отключить медленный опрос в зависимости от ваших потребностей (например, ночью опрос должен проводиться ежечасно...).
- В идеале, между переключениями режимов питания устройства должно проходить не менее 10 минут, иначе это вредно для движущихся частей устройства.

Информация о текущих ограничениях скорости содержится в параметрах адаптера ifo и обновляется каждый раз, когда адаптер отправляет запрос в облако Daikin.

## Отказ от ответственности

**Daikin является товарным знаком компании DAIKIN INDUSTRIES, LTD. Я никоим образом не связан с компанией DAIKIN INDUSTRIES, LTD. или какими-либо ее дочерними компаниями, логотипами или товарными знаками. Этот личный проект я создаю в свободное время.**

## Changelog
### 0.4.12 (2025-05-24)
* (@JeroenVdb) Always send writable entries to the device, irrelevant of status, always update local values
* (@Apollon77) Optimize role detection for some states
* (@Apollon77) Tried to prevent too luch logging of the same error in a short time on Wifi issues

### 0.4.11 (2024-10-04)
* (Apollon77) Increase communication timeout to 10s to prevent refresh issues

### 0.4.10 (2024-07-20)
* (Apollon77) Fixes some error cases reported by Sentry

### 0.4.9 (2024-07-19)
* (Apollon77) Optimized write handling

### 0.4.8 (2024-07-12)
* (Apollon77) Optimized handling of rate limits, block maximum 24h and retry then
* (Apollon77) Added option to prevent sending the same values again (prevented by default!)

### 0.4.7 (2024-07-09)
* (Apollon77) Handles initialization issue where objects could be deleted wrongly
* (Apollon77) Also check for HTTPS usage when returning the redirect URL

### 0.4.6 (2024-07-07)
* (Apollon77) Update dependencies with optimizations and second blocking layer for rate limiting

### 0.4.5 (2024-07-06)
* (Apollon77) Block communication when rate limited according to Daikin response

### 0.4.4 (2024-07-06)
* (Apollon77) Fix initialization retry schedule

### 0.4.3 (2024-07-05)
* IMPORTANT: Minimum Node.js version is 18.2
* (Apollon77) BREAKING: Adjusted to new Daiking Cloud API - You need to reauthenticate!
* (Apollon77) BREAKING: New rate limit of new API is 200 requests per day!! Adjust your usage!
* (Apollon77) Added option to set "slow polling" interval
* (Apollon77) Make electrical data available as states (arrays for now)
* (Apollon77) Restore last data updated timestamp
* (Apollon77) Make sure cloudConnection always contains a boolean
* (Apollon77) Refresh token also when error is "Refresh Token has expired"

### 0.3.0 (2023-08-23)
* (Apollon77) Make compatible with Node.js 18+ too
* (Apollon77) Adjust name fallback

### 0.2.3 (2022-09-12)
* (Apollon77) Clear the tokenset when email or password is changed in config

### 0.2.2 (2022-08-13)
* (Apollon77) Add naming support for devices using old WLAN adapters but updated for Onecta

### 0.2.1 (2022-07-03)
* (Apollon77) Fix the device info and count for connected devices in Admin UI

### 0.2.0 (2022-06-30)
* (Apollon77) Add name lookup for Altherma devices
* (Apollon77) Send data to Sentry on unknown device types

### 0.1.4 (2022-06-28)
* (Apollon77) Adjust logging on Login to be more clear

### 0.1.3 (2022-06-03)
* (Apollon77/Garfonso) Optimizations and fixes

### 0.1.2 (2022-05-27)
* (Apollon77) Prevent crash reported by Sentry

### 0.1.1 (2022-05-23)
* (Apollon77) Add Sentry for crash reporting

### 0.1.0 (2022-05-23)
* (Apollon77) initial release

## License
MIT License

Copyright (c) 2022-2025 Apollon77 <iobroker@fischer-ka.de>

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