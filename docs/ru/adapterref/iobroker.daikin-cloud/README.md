---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.daikin-cloud/README.md
title: ioBroker.daikin-облако
hash: fc+lDvniOI9v/PO4rz0DAdRWjY9t8XW07zgPlvQiPIU=
---
![Логотип](../../../en/adapterref/iobroker.daikin-cloud/admin/daikin-cloud.jpg)

![Количество установок](http://iobroker.live/badges/daikin-cloud-stable.svg)
![версия НПМ](http://img.shields.io/npm/v/iobroker.daikin-cloud.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.daikin-cloud.svg)

# IoBroker.daikin-облако
![Тест и выпуск](https://github.com/Apollon77/iobroker.daikin-cloud/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/daikin-cloud/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Более подробную информацию и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 5.0.

## Адаптер daikin-cloud для ioBroker
Управление устройствами Daikin, которые подключены только к Daikin Cloud / приложению Onecta. Адаптер подключается к Daikin-Cloud и опрашивает данные оттуда. Чтобы это работало, вам нужно найти «Daikin Europe Developer Account» и создать там приложение. Затем адаптер будет использовать учетные данные этого приложения для подключения к Daikin Cloud.

## Отказ от ответственности
**Все названия продуктов и компаний или логотипы являются товарными знаками™ или зарегистрированными® товарными знаками их соответствующих владельцев. Их использование не подразумевает какой-либо связи или одобрения ими или любыми связанными дочерними компаниями! Этот личный проект поддерживается в свободное время и не имеет деловой цели.** **Daikin является товарным знаком DAIKIN INDUSTRIES, LTD.**

## Совместимость
Этот адаптер должен быть совместим с устройствами с Daikin WLAN-Adapters **BRP069C4x**, которыми можно управлять через приложение Daikin Onecta. Локальное подключение к этим устройствам невозможно!

Примечание: для устройств со старыми адаптерами WLAN, такими как **BRP069A4x**, которые могут использоваться только приложением Daikin Controller, используйте вместо этого адаптер [Дайкин](https://github.com/Apollon77/ioBroker.daikin).

## Функциональность
Новые устройства Daikin, проданные с 2020 года, содержат новый адаптер Wi-Fi (например, BRP069C4x), который подключается только к Daikin Cloud и больше недоступен локально. Эти устройства управляются только с помощью приложения Daikin Onecta.

Этот адаптер позволяет изначально (надеюсь, один раз) извлекать токены, используя персональный аккаунт разработчика и одноразовый поток входа. После этого эти токены можно использовать и обновлять для взаимодействия с устройствами.

После подключения к учетной записи Daikin Cloud адаптер автоматически создаст новое устройство для каждого устройства, подключенного к Daikin Cloud. Отображаются все доступные данные, а несколько состояний позволяют управлять устройством.
**Обратите внимание, что скорость выполнения команд облака Daikin не очень высокая, что означает, что может пройти до 3 минут, прежде чем команда будет действительно выполнена или состояния будут обновлены!**

Кроме того, для API Daikin Cloud существует ограничение в 200 запросов в день. В связи с этим, пожалуйста, рассмотрите следующие рекомендации:

* Интервал опроса по умолчанию в 15 минут должен быть достаточным для большинства случаев использования, оставляя также некоторое пространство для управления устройствами. Учтите, что каждое действие управления требует 2 запросов (один для управления, один для обновления данных через 1 минуту после вызова управления). Особенно со многими устройствами это может действительно стать проблематичным.
* Адаптер также поддерживает "Slow Polling", где вы можете определить собственный интервал. Используйте состояние `useSlowPolling`, чтобы включить или отключить медленный опрос в зависимости от ваших потребностей (например, в ночное время опрашивать только каждый час ...)
* В идеале между переключением состояния питания устройства должно пройти не менее 10 минут, иначе это плохо для подвижных частей устройства.

Текущие сведения об ограничении скорости содержатся в состояниях адаптера ifo и обновляются каждый раз, когда адаптер отправляет запрос в Daikin Cloud.

## Отказ от ответственности
**Daikin является торговой маркой DAIKIN INDUSTRIES, LTD. Я никоим образом не одобряюсь и не связан с DAIKIN INDUSTRIES, LTD. или любыми связанными с ней дочерними компаниями, логотипами или торговыми марками. Этот личный проект поддерживается в свободное время.**

## Changelog
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

Copyright (c) 2022-2024 Apollon77 <iobroker@fischer-ka.de>

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
