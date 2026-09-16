---
chapters: {"pages":{"en/adapterref/iobroker.mielecloudservice/README.md":{"title":{"en":"ioBroker.mielecloudservice"},"content":"en/adapterref/iobroker.mielecloudservice/README.md"},"en/adapterref/iobroker.mielecloudservice/machine_states.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.mielecloudservice/machine_states.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mielecloudservice/README.md
title: ioBroker.mielecloudservice
hash: ukTe/tfTBtEcvDSPK2Z5KYoAHtdhgVk28kR00mkVtiY=
---
![Логотип](../../../en/adapterref/iobroker.mielecloudservice/admin/mielecloudservice.svg)

![Количество установок](http://iobroker.live/badges/mielecloudservice-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.mielecloudservice.svg)
![Известные уязвимости](https://snyk.io/test/github/Grizzelbee/ioBroker.mielecloudservice/badge.svg?targetFile=package.json)
![Тестирование и выпуск](https://github.com/Grizzelbee/ioBroker.mielecloudservice/actions/workflows/test-and-release.yml/badge.svg)
![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![Загрузки](https://img.shields.io/npm/dm/iobroker.mielecloudservice.svg)
![НПМ](https://nodei.co/npm/iobroker.mielecloudservice.png?downloads=true)

# ioBroker.mielecloudservice

## Адаптер mielecloudservice для ioBroker

Подключите ваши приборы Miele (XGW3000 и WiFiConn\@ct) к сети.

> Если вам понравился этот адаптер и вы хотели бы меня поддержать:<br/>[![Пожертвовать через PayPal](https://github.com/Grizzelbee/ioBroker.mielecloudservice/blob/master/admin/paypal-donate-button.png)](https://www.paypal.com/donate/?hosted_button_id=SPUDTXGNG2MYG)

## Описание

Этот адаптер предназначен для получения информации обо всех ваших устройствах Miele\@Home из официального API сторонних разработчиков Miele. Он работает независимо от того, подключены ли они напрямую через Wi-Fi или через шлюз XGW3000. Адаптер реализует **API сторонних разработчиков Miele версии 1.0.5.**

## sentry.io

Этот адаптер использует sentry.io для сбора информации о сбоях и автоматического сообщения о них автору. Для этого используется плагин [ioBroker.sentry](https://github.com/ioBroker/plugin-sentry) . Подробную информацию о том, что делает плагин, какая информация собирается и как отключить его, если вы не хотите предоставлять автору информацию о сбоях, вы можете найти на [домашней странице плагина](https://github.com/ioBroker/plugin-sentry) .

## Предварительные требования

- Приложение Miele\@Home для пользователей смартфонов
- Miele\@Home Password (приложение для смартфонов)
- Miele Client\_id (из <https://www.miele.com/developer/> )
- Секретный ключ клиента Miele (из <https://www.miele.com/developer/> )

## Установка

Для установки выполните следующие действия:

1. Установка через администратора с помощью
2. Установка через администратора с помощью

- Репозиторий stable — для получения текущей стабильной версии.
- Последний репозиторий — для получения последней тестовой версии (возможно, нестабильная).
- Чтобы получить последнюю версию для разработчиков, перейдите по ссылке: <https://github.com/Grizzelbee/ioBroker.mielecloudservice.git>

2. Создайте учетную запись приложения Miele\@Home в мобильном приложении Miele.
3. Создайте учетную запись разработчика по адресу <https://www.miele.com/f/com/en/register_api.aspx>
4. Добавьте свои устройства Miele в приложение (если они не были добавлены автоматически).
5. Введите client\_secret и client\_id, полученные от команды разработчиков Miele, а также account-id и password из приложения.

## Функции

В настоящее время этот адаптер реализует почти все функции API Miele версии 1.0.5 и некоторые части API версии 1.0.6. Возможности API могут (и в настоящее время так и есть) отличаться от возможностей приложений для iOS и Android. Например, в TwinDos нет никакой информации — даже в приложениях она есть. Это включает в себя:

- Поддерживаются все известные и задокументированные типы устройств (API V1.0.6).
- Основная информация по всем типам бытовой техники.
- Расширенная информация по всем типам бытовой техники.
- Функция EcoFeedback (показатели потребления воды и/или электроэнергии) для приборов, сообщающих об этом.`Note: Not all devices report this information - event not if they do so in the iOS or Android apps. Search for the ecoFeedback folder in the device tree.`
- Поддерживаемые действия, которые можно выполнять на этом устройстве — возможности устройства в основном предоставляются самим API.

## Известные проблемы

- Поддерживаются программы, начиная с версии 6.0.0 адаптера. За исключением программ, требующих дополнительных параметров, например, для духовок.

## Конфигурация

### Базовая конфигурация

Для работы этого адаптера вам потребуется как минимум:

- Пользователь Miele\@Home (из приложения для смартфона)
- Пароль Miele\@Home (из приложения для смартфона)
- Miele Client\_id (из <https://www.miele.com/developer/> )
- Секретный ключ клиента Miele (из <https://www.miele.com/developer/> )

### Запрос данных с серверов Miele.

Начиная с версии 6.2.0 у вас есть возможность выбора между

- События, отправляемые сервером (флажок «События, отправляемые сервером» установлен — значение по умолчанию, _настоятельно рекомендуется_ )
- Опрос данных по времени (флажок «События, отправляемые сервером» снят)
- Отложенная обработка

#### События, отправляемые сервером (настоятельно рекомендуется)

Server-Sent Events — очень удобный способ получения данных с серверов Miele, поскольку серверы будут отправлять вам данные при каждом изменении. Нет необходимости в бесполезном опросе каждые xx секунд, игнорирующем наличие или отсутствие изменений. К сожалению, у этого типа подключения есть проблемы — оно довольно часто дает сбои, и решить эту проблему можно только перезапуском адаптера.

#### Опрос данных по времени

Для повышения стабильности адаптера я вернул опрос данных в качестве параметра конфигурации, который вы можете использовать, если SSE не сработает. Тем не менее, SSE используется по умолчанию, и я настоятельно рекомендую попробовать и использовать его, поскольку это экономит много ресурсов как на вашей стороне, так и на стороне Mieles. Кроме того, я уделяю особое внимание SSE, поскольку в версии 5.xx опрос данных по времени основан на двух параметрах конфигурации:

- интервал опроса
- Единица измерения интервала опроса (секунды/минуты)

#### Отложенная обработка

Если у вас есть бытовая техника Miele, и вы используете её одновременно, может случиться так, что API будет отправлять много сообщений за короткий промежуток времени. В зависимости от вашего оборудования ioBroker это может перегрузить ваш сервер и привести к зависанию визуализации или полной зависанию брокера. Чтобы избежать этого, этот параметр конфигурации уменьшает количество обрабатываемых сообщений до одного сообщения каждые xxx миллисекунд. Связанные параметры конфигурации:

- отложенная обработка
- задержка сообщения

## Управление вашими устройствами

### Действия

Реализованы все поддерживаемые и документированные действия для всех устройств (API V1.0.5).

> Пожалуйста, помните, что действия будут работать только в том случае, если вы переведете устройство в соответствующее состояние (например, «Управление мобильным устройством», «Включено» и т. д.). Для получения дополнительной информации о действиях обратитесь к [документации Miele](#documentation) .

### Программы (введены в API версии 1.0.5)

В API версии 1.0.5 компания Miele представила новую конечную точку под названием "/programs". Поддержка этой конечной точки начинается с версии адаптера 4.5.0. Будет создана новая точка данных \[device.Actions.Program], содержащая список всех поддерживаемых программ, возвращаемых Miele. **Выбор одного из значений немедленно запустит программу!** В настоящее время поддерживаются только простые программы. Например, для духовок требуется дополнительная информация — это будет реализовано в будущей версии.

При публикации адаптера компания Miele указала несколько категорий устройств, поддерживающих этот интерфейс, и только (по крайней мере, у меня) работает лишь его часть. Для моей кофемашины, стиральной машины и сушилки он работает только с кофемашиной. Но Miele работает над этим и регулярно расширяет поддержку. Для получения дополнительной информации обратитесь к общей документации по API Miele (ниже).

## Документация

Если вы хотите получить более глубокое понимание или вам необходим перевод исходных данных, пожалуйста, обратитесь к [этой документации.](/#/docs/adapterref/iobroker.mielecloudservice/machine_states.md)

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