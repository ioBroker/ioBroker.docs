---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mielecloudservice/README.md
title: ioBroker.mielecloudservice
hash: bxu3vb+SjaR2PsJUQyYA4WUmRy5xhp6wY8m3GijYVNs=
---
![Логотип](../../../en/adapterref/iobroker.mielecloudservice/admin/mielecloudservice.svg)

![Количество установок](http://iobroker.live/badges/mielecloudservice-stable.svg)
![версия НПМ](https://img.shields.io/npm/v/iobroker.mielecloudservice.svg)
![Известные уязвимости](https://snyk.io/test/github/Grizzelbee/ioBroker.mielecloudservice/badge.svg?targetFile=package.json)
![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![Загрузки](https://img.shields.io/npm/dm/iobroker.mielecloudservice.svg)
![НПМ](https://nodei.co/npm/iobroker.mielecloudservice.png?downloads=true)

# IoBroker.mielecloudservice [![Тестирование и выпуск](https://github.com/Grizzelbee/ioBroker.mielecloudservice/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/Grizzelbee/ioBroker.mielecloudservice/actions/workflows/test-and-release.yml)
## Адаптер mielecloudservice для ioBroker
Подключите свою технику Miele (XGW3000 и WiFiConn@ct)

&gt;Если вам понравился этот адаптер и вы решили поддержать меня:<br/> &gt;[![Пожертвовать через PayPal](admin/paypal-donate-button.png)](https://www.paypal.com/donate/?hosted_button_id=SPUDTXGNG2MYG)

## Описание
Этот адаптер предназначен для получения информации обо всех ваших устройствах Miele@Home из официального API Miele 3rd-party.
Независимо от того, подключены ли они напрямую через Wi-Fi или шлюз XGW3000. Он реализует **Miele 3rd Party API V1.0.5**

## Предпосылки
* Пользователь Miele@Home (приложение для смартфона)
* Пароль Miele@Home (приложение для смартфона)
* Miele Client_id (с https://www.miele.com/developer/)
* Miele Client_secret (из https://www.miele.com/developer/ )

## Установка
Для установки выполните следующие действия:

1. Установите через администратора, используя
1. Установите через администратора, используя
* стабильный репозиторий - для получения текущей стабильной версии
* последний репозиторий - для получения последней тестовой версии (возможно нестабильной)
* через: https://github.com/Grizzelbee/ioBroker.mielecloudservice.git - чтобы получить последнюю версию для разработки
2. Создайте учетную запись приложения для Miele@Home в приложении Miele для смартфона
3. Создайте учетную запись разработчика по адресу https://www.miele.com/f/com/en/register_api.aspx
4. Добавьте свои устройства Miele в приложение (если они не были добавлены автоматически)
6. Введите client_secret и client_id, полученные от команды разработчиков Miele, а также account-id и password из приложения.

## Функции
В настоящее время этот адаптер реализует почти все функции API Miele V1.0.5 и некоторые части API V1.0.6.
Возможности API могут (и в настоящее время) отличаться от возможностей приложений iOS и Android.
Например, нет информации о TwinDos — даже в приложениях она есть.
Включая:

* Поддерживаются все известные и документированные типы устройств (API V1.0.6).
* Основная информация по всем типам приборов.
* Расширенная информация для всех типов приборов.
* EcoFeedback (потребление воды и/или электроэнергии) для приборов, сообщающих об этом.

`Note: Not all devices report this information - event not if they do so in the iOS or Android apps. Search for the ecoFeedback folder in the device tree.`

* Поддерживаемые действия, которые можно выполнить на этом устройстве — возможности устройства в основном сообщаются самим API.

## Известные проблемы
* Программы в основном поддерживаются с версии адаптера v6.0.0. За исключением программ, которым нужны дополнительные параметры, например для духовок.

## Конфигурация
### Базовая конфигурация
Для работы этого адаптера вам понадобится как минимум:

* Пользователь Miele@Home (из приложения для смартфона)
* Пароль Miele@Home (из приложения для смартфона)
* Miele Client_id (с https://www.miele.com/developer/)
* Miele Client_secret (из https://www.miele.com/developer/ )

### Запрос данных с серверов Miele
Начиная с версии V6.2.0 у вас есть возможность выбирать между

* События, отправленные сервером (флажок «События, отправленные сервером» отмечен — по умолчанию и *настоятельно рекомендуется*)
* Опрос данных по времени (флажок «События, отправленные сервером» не установлен)
* Отложенная обработка

#### События, отправленные сервером (настоятельно рекомендуется)
Server-Sent Events — очень удобный метод получения данных с серверов Miele, поскольку серверы будут отправлять вам данные всякий раз, когда происходят изменения. Никаких бесполезных опросов каждые xx секунд, игнорирующих, были ли изменения или нет. К сожалению, при использовании этого типа соединения возникают проблемы — оно довольно часто дает сбой, и только перезапуск адаптера решает эту проблему.

#### Опрос данных на основе времени
Для повышения стабильности адаптера я снова ввел опрос данных как параметр конфигурации, который вы можете использовать, когда SSE дает сбой.
Тем не менее, SSE используется по умолчанию, и я настоятельно рекомендую попробовать и использовать его, поскольку он экономит много ресурсов на вашей стороне и стороне Mieles. Кроме того, я фокусируюсь на SSE с версии 5.x.x.
Опрос данных на основе времени опирается на два параметра конфигурации:

* интервал опроса
* единица интервала опроса (секунды/минуты)

#### Задержка обработки
Если у вас есть несколько приборов Miele и вы используете их одновременно, может случиться так, что API начнет отправлять много сообщений за короткий промежуток времени. В зависимости от вашего оборудования ioBroker это может перегрузить ваш сервер и привести к неотзывчивой визуализации или вообще неотзывчивому брокеру. Чтобы избежать этого, этот параметр конфигурации уменьшает количество обрабатываемых сообщений до одного сообщения каждые xxx миллисекунд.
Связанные параметры конфигурации:

* отложенная обработка
* задержка сообщения

## Управление вашими устройствами
### Действия
Реализованы все поддерживаемые и документированные в настоящее время действия для всех устройств (API V1.0.5).
> Пожалуйста, помните, что действия будут работать только в том случае, если вы переведете свое устройство в соответствующее состояние (например, Mobile Control, powerOn, ...).
Пожалуйста, обратитесь к [Miele-Документация](#documentation) для получения дополнительной информации о действиях.

### Программы (представлены в API V1.0.5)
С API V1.0.5 Miele представила новую конечную точку под названием "/programs".
Поддержка этой конечной точки начинается с версии адаптера 4.5.0. Будет создана новая точка данных [device.Actions.Program] со списком всех поддерживаемых программ, возвращаемых Miele.
**Выбор одного из значений приведет к немедленному выполнению программы!** В настоящее время поддерживаются только простые программы. Например, для духовок требуется дополнительная информация — она будет реализована в будущей версии.

При публикации адаптера Miele задокументировала несколько категорий устройств для поддержки этой конечной точки, и только (по крайней мере для меня) подмножество из них действительно работает. Для моей кофейной системы, стиральной машины и сушилки это работает только для кофейной системы.
Но Miele работает над этим и регулярно расширяет поддержку.
Пожалуйста, обратитесь к общей документации API Miele (ниже) для получения дополнительной информации.

## Документация
Если вы хотите получить более глубокое понимание или вам нужен перевод исходного значения, обратитесь к [эта документация.](machine_states.md)

## Сентри.ио
Этот адаптер использует sentry.io для сбора данных о сбоях и автоматического сообщения об этом автору. Для этого используется плагин [ioBroker.сентри](https://github.com/ioBroker/plugin-sentry). Пожалуйста, обратитесь к [домашняя страница плагина](https://github.com/ioBroker/plugin-sentry) для получения подробной информации о том, что делает плагин, какая информация собирается и как его отключить, если вы не хотите поддерживать автора своей информацией о сбоях.

## Авторские права
Авторские права (c) 2025 grizzelbee <open.source@hingsen.de>

## Changelog
### **WORK IN PROGRESS**
- (grizzelbee) Upd: Dependencies got updated
- (grizzelbee) Fix: Added screen size settings in Admin-UI for responsive design
- (grizzelbee) Fix: Fixed sentry MIELECLOUDSERVICE-5V

### 6.5.7 (2024-10-01)
- (grizzelbee) Upd: Dependencies got updated
- (grizzelbee) Fix: Fixed some minor issues found by adapter-checker
- (grizzelbee) Upd: Added tests for node 22

### 6.5.6 (2024-05-10) (Dying for an Angel)

- (grizzelbee) New: [402](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/402) Added signalDoor to Washing machines, Tumble dryer and Washer dryer
- (grizzelbee) Upd: Dependencies got updated

### 6.5.5 (2024-01-03) (Dying for an Angel)

- (grizzelbee) Upd: Added year 2024 to licence
- (grizzelbee) Upd: Dependencies got updated

### 6.5.4 (2023-05-03) (Dying for an Angel)
* (grizzelbee) New: Added file `.ncurc.json` to prevent axios-oauth-client from being automatically updated by `npx npm-check-updates`

### 6.5.3 (2023-04-26) (Dying for an Angel)
* (grizzelbee) Fix: two minor bug fixes - including a fix that prevents objects from being updated constantly.

### 6.5.2 (2023-04-21) (Dying for an Angel)
* (grizzelbee) Fix: [367](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/367) Fixed "oauth is not a function" error during startup by downgrading axios-oauth-client to v1.5.0

### 6.5.1 (2023-04-21) (Dying for an Angel)
* (grizzelbee) Fix: Some minor fixes for ioBroker adapter checker

### 6.5.0 (2023-04-18) (Dying for an Angel)
* (grizzelbee) New: added device type 74 = Hob with vapour extraction (part of Miele API v1.0.6)
* (grizzelbee) Upd: Updated ReadMe file
* (grizzelbee) Chg: Dependencies got Updated
* (grizzelbee) Chg: Important: Requires at least Node.js 14
* (grizzelbee) Chg: Changed SpinningSpeed from number to string 
* (grizzelbee) New: Added RAW-Value to SpinningSpeed 
* (grizzelbee) Chg: Changed PlateStep-xxx from number to string (related to issue [356](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/356))
* (grizzelbee) New: Added RAW-Value to Platesteps (related to issue [356](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/356))
* (grizzelbee) Fix: [343](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/343) GENERIC_BUSINESS_ERROR occurred when switching ventilationStep
* (grizzelbee) Fix: [356](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/356) In some cases the value 0 (zero) is ignored (e.g. at PlateStep)
* (grizzelbee) Fix: [359](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/359) Fixed "oauth is not a function" error during startup by downgrading axios-oauth-client to v1.5.0

### 6.4.0 (2022-09-07) (Dying for an Angel)
* (grizzelbee) Fix: program names get localized now
* (grizzelbee) New: moved Admin-UI to jsonConfig
* (grizzelbee) Chg: BREAKING CHANGE: removed duplicate en-/decryption of passwords due to jsonConfig
* (grizzelbee) Chg: Moved some documentation from the readme file to machine_states.md

### 0.9.1 (2019-07-26)
* (grizzelbee) Fix: Fixed small bug introduced in V0.9.0 throwing an exception in debugging code

### 0.9.0 (2019-07-26)
* (grizzelbee) Upd: New versioning due to completeness and stability of the adapter (about 90%)
* (grizzelbee) New: make poll interval configurable  (currently 1,2,3,4,5,7,10,15 Minutes)
* (grizzelbee) Fix: fixed ESLint config
* (grizzelbee) Upd: Changed order of config fields in UI
* (grizzelbee) New: Set 5 Minutes poll interval and english response language as default to get initial values
* (grizzelbee) New: Parent-Datapoint of time values will be used to get a pretty readable time in the format h:mm. The deeper datapoints 0 and 1 will still be updated, but his will be removed in a future version to reduce workload.

### 0.0.5 (2019-07-25)
* (grizzelbee) Upd: some code maintenance
* (grizzelbee) New: added reply-language to config
   - Miele API is currently able to reply in German or English, now you can choose.
* (grizzelbee) New: created new Icon
* (grizzelbee) Fix: fixed translation issues and translated adapter UI using gulp
* (grizzelbee) Upd: Made changes to travis requested by apollon77

### 0.0.4
* (hash99) add devices configuration

### 0.0.3
* (hash99) adapter conform

### 0.0.1
* (hash99) initial release

## License
The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.