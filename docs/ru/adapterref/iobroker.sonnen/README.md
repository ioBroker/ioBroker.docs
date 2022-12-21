---
BADGE-Number of Installations: http://iobroker.live/badges/sonnen-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.sonnen.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.sonnen.svg
BADGE-NPM: https://nodei.co/npm/iobroker.sonnen.png?downloads=true
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sonnen/README.md
title: солнечный адаптер
hash: zO5PfveY4rgOh9p7uA4OErQqhY9ZV/Y/TACMQFocdFw=
---
![логотип](../../../de/adapterref/iobroker.sonnen/media/sonnen.png)

# Солнечный адаптер
Адаптер Sonnen позволяет интегрировать SonnenBatterie в ioBroker.

## Обзор
### Солнечная батарея
С помощью sonnenBatterie вырабатываемую солнечной системой энергию можно хранить для личного использования и использовать именно тогда, когда это необходимо. Это позволяет стать независимым от анонимных энергетических компаний и стать самодостаточным производителем электроэнергии. Благодаря встроенному энергоменеджеру интеллектуальный высокотехнологичный аккумулятор обеспечивает оптимальное снабжение дома собственной энергией.
Это не только выгодно, но и экологично! SonnenBatterie доступен в различных гибких моделях хранения.

### Солнечный адаптер
Адаптер Sonnen может контролировать и контролировать SonnenBatterie в сети. С помощью Discovery Adapter (TODO: Link) sonnenBatteries можно найти в сети автоматически.<br/> Адаптер создает состояния для мониторинга и управления sonnenBatterie в виде объектов. Большая часть состояний используется только для контроля батареи, в то время как батареей также можно управлять, записывая некоторые состояния.

## Требования перед установкой
Обязательным условием для эксплуатации sonnenBatterie с ioBroker является успешная установка аккумулятора электриком. Аккумулятор также должен находиться в той же сети, что и ioBroker.

### Установка
Экземпляр адаптера устанавливается из административного интерфейса ioBroker. Подробные инструкции по необходимым шагам установки можно найти здесь (TODO:ССЫЛКА).<br/><br/> После завершения установки экземпляра адаптера автоматически открывается окно конфигурации.

## Конфигурация
### Главное окно настроек
![Основные настройки](../../../de/adapterref/iobroker.sonnen/media/mainSettings.png "Основные настройки")

| поле | Описание |
|:-------------|:-------------|
|IP-адрес |Здесь следует ввести IP-адрес нужного sonnenBatterie.|

| поле | Описание |
|:-------------|:-------------|
|Auth-Token |Здесь необходимо ввести Auth-Token, который можно найти в веб-интерфейсе Sonnen в разделе «Интеграция программного обеспечения». Если токен авторизации не введен, используется неофициальный API, который можно отключить в любой момент.|

### Окно дополнительных настроек
![расширенные настройки](../../../de/adapterref/iobroker.sonnen/media/advancedSettings.png "Расширенные настройки")

| поле | Описание |
|:-------------|:-------------|
|Интервал запроса|Здесь можно установить альтернативное значение в миллисекундах. Состояния sonnenBatterie обновляются через этот интервал.|

| поле | Описание |
|:-------------|:-------------|
|Запрос онлайн-статуса|Если вы хотите избежать запросов от вашей батареи к серверу Sonnen, вы можете деактивировать запрос онлайн-статуса (актуально только для 8080 API - например, eco8 и новее)|

После завершения настройки выйдите из диалогового окна настройки с помощью `SPEICHERN UND SCHLIEßEN`.
Затем это приводит к перезапуску адаптера.

## Экземпляров
Установка адаптера создала активный экземпляр адаптера sonnen в разделе `Objekte`.<br/><br/> ![пример](../../../de/adapterref/iobroker.sonnen/media/instance.png "пример") <span style="color:grey">*Первый экземпляр*</span>

На сервере ioBroker можно создать несколько экземпляров адаптера Sonnen. И наоборот, sonnenBatterie также может работать с несколькими серверами ioBroker. Если несколько устройств должны управляться сервером ioBroker, для каждой батареи необходимо создать один экземпляр.<br/><br/> Активирован ли адаптер или подключен ли он к аккумулятору, отображается цветом поля состояния экземпляра. Если указатель мыши указывает на символ, отображается дополнительная подробная информация.

## Объекты адаптера
В области `Objekte` перечислены все устройства и действия, обнаруженные адаптером в концентраторе, в виде древовидной структуры. Кроме того, также сообщается, гладко ли работает связь с хабом.

![объекты](../../../de/adapterref/iobroker.sonnen/media/objects.png "солнечные объекты") <span style="color:grey">*Объекты адаптера Sonnen*</span>

Ниже объекты разделены на состояния и кнопки. Поскольку в зависимости от батареи существует два разных API, создаются только те состояния, которые поддерживаются соответствующей батареей.
Каждая точка данных указана со связанным с ней типом данных и разрешениями.
Разрешения могут быть на чтение (R) или на запись (W). Каждая точка данных может быть как минимум прочитана (R), в то время как другие также могут быть записаны. Для поиска конкретной точки данных мы рекомендуем использовать комбинацию клавиш «STRG + F».

### Состояния
Примечание. Состояния устаревшего API (порт 3480) и старого API (порт 7979) в настоящее время не задокументированы или задокументированы лишь частично.

#### Канал: конфигурации
С API v2 здесь можно просмотреть конфигурацию батареи в различных состояниях. Состояния записи можно использовать для изменения конфигурации.

#### Канал: информация
* информация.связь

    |Тип данных|Разрешение|
    |:---:|:---:|
    |логический|R|

   *Только для чтения логическое значение, которое верно, если соединение между ioBroker и батареей установлено.*

* информация.lastSync

    |Тип данных|Разрешение|
    |:---:|:---:|
    |отметка времени|R|

   *Временная метка только для чтения, которая обновляется каждый раз при обновлении данных.*

* информация.конфигурация

    |Тип данных|Разрешение|
    |:---:|:---:|
    |строка|Р|

*Только читаемая строка JSON с информацией о конфигурации sonnenBatterie.* *Только в API v1, v2 есть канал `configurations`* для этого

* информация.PowerMeter

    |Тип данных|Разрешение|
    |:---:|:---:|
    |строка|Р|

   *Строка JSON, доступная только для чтения, с информацией о текущем измерении sonnenBatterie.*

* инфо.инвертор

    |Тип данных|Разрешение|
    |:---:|:---:|
    |число|R|

   *Только читаемое числовое значение с информацией об инверторе солнечной батареи.*

* информация.иос

    |Тип данных|Разрешение|
    |:---:|:---:|
    |логический|R|

   *Только читаемое логическое значение с «дискретной информацией ввода-вывода» sonnenBatterie.*

#### Канал: статус
* статус.потребление

    |Тип данных|Разрешение|
    |:---:|:---:|
    |число|R|

   *Только для чтения числовое значение, содержащее текущее потребление дома в ваттах.*

* статус.производство

    |Тип данных|Разрешение|
    |:---:|:---:|
    |число|R|

   *Только для чтения числовое значение, которое указывает, сколько ватт в настоящее время вырабатывается фотоэлектрической системой.*

* status.pacTotal

    |Тип данных|Разрешение|
    |:---:|:---:|
    |число|R|

*Только для чтения числовое значение, указывающее мощность инвертора переменного тока.
Если значение больше 0, батарея будет разряжена, если значение меньше 0, она будет заряжена.*

* статус.относительныйSoc

    |Тип данных|Разрешение|
    |:---:|:---:|
    |число|R|

   *Только для чтения числовое значение, представляющее текущий уровень заряда батареи.*

* статус.userSoc

    |Тип данных|Разрешение|
    |:---:|:---:|
    |число|R|

   *Только для чтения числовое значение, представляющее текущий уровень заряда батареи.*

* статус.acЧастота

    |Тип данных|Разрешение|
    |:---:|:---:|
    |число|R|

   *Только для чтения числовое значение, представляющее частоту переменного тока в герцах.*

* status.acVoltage

    |Тип данных|Разрешение|
    |:---:|:---:|
    |число|R|

   *Только для чтения числовое значение, представляющее текущее напряжение переменного тока инвертора.*

* status.batteryVoltage

    |Тип данных|Разрешение|
    |:---:|:---:|
    |число|R|

   *Только для чтения числовое значение, представляющее текущее напряжение постоянного тока (постоянного тока) батареи.*

* статус.системное время

    |Тип данных|Разрешение|
    |:---:|:---:|
    |дата|Р|

   *Дата ISO, представляющая системное время батареи, доступна только для чтения.*

* статус.системаустановлена

    |Тип данных|Разрешение|
    |:---:|:---:|
    |логический|R|

   * Логическое значение только для чтения, которое верно, если система установлена правильно.*

* статус.батареязарядка

    |Тип данных|Разрешение|
    |:---:|:---:|
    |логический|R|

   *Только для чтения логическое значение. Это верно, если sonnenBatterie в данный момент заряжается.*

* status.flowConsummentBattery

    |Тип данных|Разрешение|
    |:---:|:---:|
    |логический|R|

   *Только для чтения логическое значение. Это верно, если батарея в данный момент разряжается.*

* статус.flowConsummentGrid

    |Тип данных|Разрешение|
    |:---:|:---:|
    |логический|R|

   *Только для чтения логическое значение, которое верно, если в данный момент питание берется из сети.*

* статус.flowConsummentProduction

    |Тип данных|Разрешение|
    |:---:|:---:|
    |логический|R|

   *Только для чтения логическое значение. Это верно, если в настоящее время мощность потребляется непосредственно фотоэлектрической системой.*

* статус.flowGridBattery

    |Тип данных|Разрешение|
    |:---:|:---:|
    |логический|R|

   * Булев индикатор только для чтения, который верен, если батарея в данный момент заряжается от сети.*

* статус.flowProductionBattery

    |Тип данных|Разрешение|
    |:---:|:---:|
    |логический|R|

   *Только для чтения логическое значение, которое верно, если батарея в настоящее время заряжается непосредственно от фотоэлектрической батареи.*

* статус.flowProductionGrid

    |Тип данных|Разрешение|
    |:---:|:---:|
    |логический|R|

   *Только для чтения логическое значение, которое верно, если генерируемая электроэнергия в настоящее время подается в сеть.*

* статус .gridFeedIn

    |Тип данных|Разрешение|
    |:---:|:---:|
    |число|R|

*Числовое значение, доступное только для чтения, представляющее количество ватт энергии, которая в настоящее время подается в сеть или поступает из нее.
Если значение положительное, электроэнергия в настоящее время подается в сеть, если отрицательное, количество электроэнергии берется из сети.*

* статус.онлайнстатус

    |Тип данных|Разрешение|
    |:---:|:---:|
    |логический|R|

   *Только для чтения логическое значение, которое верно, когда sonnenBatterie находится в сети.*

* статус.состояние системы

  |Тип данных|Разрешение|
  |:---:|:---:|
  |строка|Р|

  *Строка только для чтения, указывающая, подключена ли батарея к сети.*

#### Канал: управление
* контроль.заряд

    |Тип данных|Разрешение|
    |:---:|:---:|
    |число|Ч/З|

   *Числовое значение, позволяющее указать максимальный разряд батареи в ваттах.*

*Примечание. Если установлено недопустимое значение, оно все равно будет подтверждено. Подтверждение (подтверждение) значения означает только то, что команда была передана на батарею.*

*Соответствующее значение уставки сохраняется до тех пор, пока батарея не получит новое значение заряда или разряда.
Если VPP активен, запрос будет отклонен.*

   *Примеры:*

```javascript
setState('sonnen.0.control.charge', 1250); // Die Batterie wird mit maximal 1250 Watt geladen
```

* контроль.разряда

    |Тип данных|Разрешение|
    |:---:|:---:|
    |число|Ч/З|

   *Числовое значение, позволяющее установить максимальный заряд батареи в ваттах.*

*Примечание. Если установлено недопустимое значение, оно все равно будет подтверждено. Подтверждение (подтверждение) значения означает только то, что команда была передана на батарею.*

*Соответствующее значение уставки сохраняется до тех пор, пока батарея не получит новое значение заряда или разряда.
Если VPP активен, запрос будет отклонен.*

   *Примеры:*

```javascript
setState('sonnen.0.control.discharge', 1250); // Die Batterie wird maximal mit 1250 Watt entladen
```

#### Канал: измеритель мощности
Этот канал имеет два подканала, например, `4_1` и `4_2`, где один представляет потребление, а другой — производство.
Например. `4_1.kwh_imported` представляет собой общий объем производства с момента установки батареи.

Два канала имеют одинаковые состояния. Все состояния доступны только для чтения и имеют тип `number`.

### Канал: инвертор
Канал состоит из доступных только для чтения состояний типа `number`, которые предоставляют информацию об инверторе sonnenBatterie.

### Канал: ios
Канал состоит из защищенных от записи состояний типа `boolean`, которые предоставляют информацию о состоянии дискретного ввода-вывода sonnenBatterie.

### Канал: конфигурации
Канал позволяет читать, а также записывать значения конфигурации солнечной батареи.

### Канал: батарея
Канал предоставляет данные о батарее, такие как количество циклов зарядки.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### 1.15.6 (2022-12-18)
* (foxriver76) added two GPIOs for CHP status

### 1.15.5 (2022-12-17)
* (foxriver76) added state list for `configurations.SH_HeaterOperatingMode'`
* (foxriver76) marked some datapoints as read-only and fixed state types

### 1.15.4 (2022-12-16)
* (foxriver76) fixed crash if v2 configurations endpoint is not available (closes #228)

### 1.15.3 (2022-12-14)
* (foxriver76) internal optimizations (Axios port)

### 1.15.2 (2022-12-14)
* (foxriver76) internal optimization (ES6 class)

### 1.15.1 (2022-12-13)
* (foxriver76) added `battery.cyclecount` state (closes #194)

### 1.15.0 (2022-12-13)
* (foxriver76) full port to v2 API (Software Version >= 1.8.7)
* (foxriver76) brings back `ios` and `inverter` endpoints
* (foxriver76) configuration request is now handled by a single call instead of one for each attribute
* (foxriver76) we fixed a lot of state roles

### 1.14.0 (2022-12-02)
* (foxriver76) implemented new state `latestData.dcShutdownReason` (closes #213)

### 1.13.1 (2022-11-24)
* (foxriver76) minor performance optimization
* (foxriver76) `info.lastSync` and `status.systemTime` are now type number
* (foxriver76) implemented silent fail on `ios` endpoint to support both API versions

### 1.13.0 (2022-10-28)
* (foxriver76) added `latestData` endpoint providing eclipse LED status and time since last full charge

### 1.12.3 (2022-10-27)
* (foxriver76) readded widget (closes #189)

### 1.12.2 (2022-10-27)
* (foxriver76) fixed issue with data types of configuration

### 1.12.1 (2022-09-26)
* (foxriver76) we now use the V2 API for the powermeter endpoint
* (foxriver76) we have ported the code to TypeScript
* (foxriver76) added configuration for V2 API, including ability to change it via adapter

### 1.11.0 (2022-06-22)
* (foxriver76) added `status.systemStatus` to indicate if the battery is connected to the grid (closes #139)

### 1.10.0 (2022-04-18)
* (rivengh) added battery discrete io states

### 1.9.8 (2021-09-27)
* (foxriver76) make requesting online status optional for 8080 api (closes #76)

### 1.9.6 (2021-08-03)
* (foxriver76) fix for horizontal flow animations in Safari (broken with 1.9.4)

### 1.9.4 (2021-07-17)
* (foxriver76) widget: make the svg smaller by using a flexbox to center the svg correctly inside the div

### 1.9.3 (2021-07-16)
* (foxriver76) also poll the configuration instead of updating it only once at start (closes #70)

### 1.9.2 (2021-07-16)
* (foxriver76) fix for legacy API

### 1.9.1 (2021-07-16)
* (foxriver76) use legacy API if old API is not completely implemented

### 1.9.0 (2021-07-16)
* (foxriver76) we now also support the legacy API (port 3480)
* (foxriver76) switch from intervals to timeouts to avoid overlapping poll runs

### 1.8.6 (2021-07-04)
* (foxriver76) widget: we removed debug logging and unnecessary template functions
* (foxriver76) widget: we now cache the jquery selectors to improve the performance

### 1.8.5 (2021-07-02)
* (foxriver76) widget: stroke width can now be configured

### 1.8.4 (2021-07-01)
* (foxriver76) widget: we made ID names more adapter specific to avoid getting wrong translations

### 1.8.3 (2021-07-01)
* (foxriver76) widget: we now allow defining the used adapter instance

### 1.8.2 (2021-06-30)
* (foxriver76) widget: css classes now have adapter specific names to avoid conflicts

### 1.8.1 (2021-06-30)
* (foxriver76) widget now has flow directions

### 1.8.0 (2021-06-30)
* (foxriver76) added widget

### 1.7.3 (2021-05-01)
* (foxriver76) we now update objects if attributes are updated, but preserve common.name attribute

### 1.7.2 (2021-04-30)
* (foxriver76) we fixed some type issues (fixes #58)

### 1.7.1 (2021-03-19)
* (foxriver76) do not log warnings on inverter endpoint if battery does not support it (closes #55)

### 1.7.0 (2020-11-12)
* (foxriver76) new channels for powermeter and inverter

### 1.6.1 (2020-11-11)
* (foxriver76) fixed charge and discharge not working with api v2

### 1.6.0 (2020-08-09)
* (foxriver76) added support for official api, automatically used when auth token is given by user

### 1.5.3 (2020-05-18)
* (foxriver76) poll online status always again if not confirmed that there are differences in api (old solution could lead to false negative)
* (foxriver76) more specific error handling

### 1.5.2 (2020-05-16)
* (foxriver76) check if onlineStatus is supported at adapter start - else do not poll it

### 1.5.0 (2020-05-04)
* (foxriver76) added online status indicator

### 1.4.2 (2020-04-16)
* (foxriver76) added more translations
* (foxriver76) optimizations for compact mode

### 1.4.0
* (foxriver76) introducing new states with power metering and inverter information (supported on :8080 API)
* (foxriver76) only minimum support until we know what users need as states

### 1.3.0
* (foxriver76) introducing new state with configuration information (supported on :8080 API)

### 1.2.0
* (foxriver76) support of another sonnen api

### 1.1.2
* (foxriver76) bugfix for control states

### 1.1.1
* (foxriver76) add compact mode compatibility

### 1.0.2
* (foxriver76) use adapter-core module

### 1.0.1
* (foxriver76) take timezone offset into account on time states

### 1.0.0
* (foxriver76) formal version increment

### 0.0.8
* (foxriver76) Enhanced debug logging
* (foxriver76) Prevent crashing when a return code is received

### 0.0.7
* (foxriver76) Only set info.connection on change

### 0.0.6
* (foxriver76) Only set states if request was successfull --> prevents adapter crash

### 0.0.5
* (foxriver76) translations on index_m.html
* (foxriver76) use 7000 as interval if poll interval is undefined

### 0.0.3
* (foxriver76) fixed links to bugs, repo etc

### 0.0.2
* (foxriver76) bugfixes on control states
* (foxriver76) big readme update
* (foxriver76) addded more states
* (foxriver76) added advanced settings

### 0.0.1
* (foxriver76) initial release

## License
The MIT License (MIT)

Copyright (c) 2018-2021 Moritz Heusinger <moritz.heusinger@gmail.com>

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