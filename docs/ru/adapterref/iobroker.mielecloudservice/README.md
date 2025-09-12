---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mielecloudservice/README.md
title: ioBroker.mielecloudservice
hash: vzo6tHwgbmojZaV0Z6FYzrGFq1zU1CcPeidE7IHZQBE=
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

&gt;Если вам понравился этот адаптер и вы хотите меня поддержать:<br/> &gt;[![Сделать пожертвование через PayPal](admin/paypal-donate-button.png)](https://www.paypal.com/donate/?hosted_button_id=SPUDTXGNG2MYG)

## Описание
Этот адаптер предназначен для получения информации обо всех ваших устройствах Miele@Home из официального API Miele 3rd Party.
Независимо от того, подключены ли они напрямую через Wi-Fi или через шлюз XGW3000. Он реализует **Miele 3rd Party API V1.0.5**.

## Sentry.io
Этот адаптер использует sentry.io для сбора информации о сбоях и автоматического сообщения об этом автору. Для этого используется плагин [ioBroker.sentry](https://github.com/ioBroker/plugin-sentry). Подробную информацию о работе плагина, собираемой информации и о том, как его отключить, см. в разделе [домашняя страница плагина](https://github.com/ioBroker/plugin-sentry), если вы не хотите предоставлять автору информацию о сбоях.

## Предпосылки
* Пользователь Miele@Home (приложение для смартфона)
* Пароль Miele@Home (приложение для смартфона)
* Miele Client_id (из https://www.miele.com/developer/)
* Miele Client_secret (из https://www.miele.com/developer/ )

## Установка
Для установки сделайте следующее:

1. Установка через администратора с помощью
1. Установка через администратора с помощью
* стабильный репозиторий - для получения актуальной стабильной версии
* последний репозиторий — для получения последней тестовой версии (возможно нестабильной)
* через: https://github.com/Grizzelbee/ioBroker.mielecloudservice.git - чтобы получить последнюю версию для разработки
2. Создайте учетную запись приложения Miele@Home в приложении Miele для смартфона.
3. Создайте учетную запись разработчика по адресу https://www.miele.com/f/com/en/register_api.aspx
4. Добавьте ваши устройства Miele в приложение (если они не были добавлены автоматически)
6. Заполните client_secret и client_id, полученные от команды разработчиков Miele, а также account-id и password из приложения.

## Функции
В настоящее время этот адаптер реализует практически все функции API Miele V1.0.5 и некоторые части API V1.0.6.
Возможности API могут (и в настоящее время) отличаться от возможностей приложений для iOS и Android.
Например, информация о TwinDos отсутствует — даже в приложениях она есть.
Это включает в себя:

* Поддерживаются все известные и документированные типы устройств (API V1.0.6).
* Основная информация для всех типов приборов.
* Расширенная информация для всех типов приборов.
* EcoFeedback (потребление воды и/или электроэнергии) для приборов, сообщающих об этом.

`Note: Not all devices report this information - event not if they do so in the iOS or Android apps. Search for the ecoFeedback folder in the device tree.`

* Поддерживаемые действия, которые вы можете выполнить на этом устройстве — возможности устройства в основном сообщаются самим API.

## Известные проблемы
* Программы поддерживаются, начиная с версии адаптера 6.0.0. За исключением программ, требующих дополнительных параметров, например, для духовок.

## Конфигурация
### Базовая конфигурация
Для работы этого адаптера вам понадобится как минимум:

* Пользователь Miele@Home (из приложения для смартфона)
* Пароль Miele@Home (из приложения на смартфоне)
* Miele Client_id (из https://www.miele.com/developer/)
* Miele Client_secret (из https://www.miele.com/developer/ )

### Запрос данных с серверов Miele
Начиная с версии 6.2.0 у вас есть возможность выбирать между

* События, отправленные сервером (флажок «События, отправленные сервером» установлен — по умолчанию и *настоятельно рекомендуется*)
* Опрос данных по времени (флажок «События, отправленные сервером» не установлен)
* Отложенная обработка

#### События, отправленные сервером (настоятельно рекомендуется)
События, отправленные сервером, — очень удобный способ получения данных с серверов Miele, поскольку серверы будут отправлять данные при любых изменениях. Больше никаких бесполезных опросов каждые xx секунд, игнорирующих наличие изменений. К сожалению, при использовании этого типа подключения возникают проблемы: оно довольно часто выходит из строя, и решить их помогает только перезапуск адаптера.

#### Опрос данных по времени
Для повышения стабильности работы адаптера я вновь добавил опрос данных в качестве параметра конфигурации, который можно использовать при сбое SSE.
Тем не менее, SSE используется по умолчанию, и я настоятельно рекомендую попробовать его, поскольку он экономит много ресурсов как на вашей стороне, так и на стороне Miele. Кроме того, я использую SSE, начиная с версии 5.x.x.
Опрос данных по времени зависит от двух параметров конфигурации:

* интервал опроса
* единица интервала опроса (секунды/минуты)

#### Задержка обработки
Если у вас есть несколько устройств Miele и вы используете их одновременно, API может отправлять много сообщений за короткий промежуток времени. В зависимости от оборудования вашего ioBroker, это может привести к перегрузке сервера и привести к зависанию визуализации или полному зависанию брокера. Чтобы избежать этого, этот параметр конфигурации сокращает количество обрабатываемых сообщений до одного сообщения каждые xxx миллисекунд.
Связанные параметры конфигурации:

* отложенная обработка
* задержка сообщения

## Управление вашими устройствами
### Действия
Реализованы все поддерживаемые и документированные в настоящее время действия для всех устройств (API V1.0.5).
> Помните, что действия будут работать только при переводе устройства в соответствующее состояние (например, «Управление мобильным устройством», «Включение питания» и т. д.).
Подробнее о действиях см. в разделе [Miele-Документация](#documentation).

### Программы (представлены в API V1.0.5)
В API версии 1.0.5 Miele представила новую конечную точку «/programs».
Поддержка этой конечной точки начнётся с версии адаптера 4.5.0. Будет создана новая точка данных [device.Actions.Program] со списком всех поддерживаемых программ, возвращаемых Miele.
**Выбор одного из значений приведёт к немедленному выполнению программы!** В настоящее время поддерживаются только простые программы. Например, для духовок требуется дополнительная информация — это будет реализовано в будущей версии.

При публикации адаптера Miele указала несколько категорий устройств для поддержки этой конечной точки, и только (по крайней мере, у меня) некоторые из них действительно работают. В моей кофемашине, стиральной машине и сушилке адаптер работает только для кофемашины.
Но Miele работает над этим и регулярно расширяет поддержку.
Подробнее см. в общей документации по API Miele (ниже).

## Документация
Если вы хотите получить более глубокое понимание или вам нужен перевод исходного значения, обратитесь к [эта документация.](machine_states.md)

## Авторские права
Авторские права (c) 2025 grizzelbee <open.source@hingsen.de>

## Changelog
 <!--
   Placeholder for the next version (at the beginning of the line):
   ### **WORK IN PROGRESS**
* (grizzelbee) Upd: Dependencies got updated

 -->
### 6.5.12 (2025-09-01)
* (grizzelbee) Upd: Dependencies got updated
* (grizzelbee) Upd: some Dev-Dependencies got removed as told by MCM1957

### 6.5.11 (2025-08-06)
* (grizzelbee) Upd: Dependencies got updated
* (grizzelbee) Fix: Fixed some minor issues found by adapter-checker
* (grizzelbee) Fix: [515](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/515) made sentry information more visible
* (grizzelbee) Fix: [514](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/514) Removed Node 18 from Tests and added Node24

### 6.5.10 (2025-04-03)
* (grizzelbee) Upd: Dependencies got updated
* (grizzelbee) Fix: [494](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/494) Fixed some minor issues found by adapter-checker

### 6.5.9 (2025-02-26)
 
- (grizzelbee) Fix: [482](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/482) Fixed broken SSE connection

### 6.5.8 (2025-02-13)
- (grizzelbee) Upd: Dependencies got updated
- (grizzelbee) Fix: Fixed some minor issues found by adapter-checker
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