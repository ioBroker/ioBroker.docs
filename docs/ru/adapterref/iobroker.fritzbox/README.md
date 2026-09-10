---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.fritzbox/README.md
title: без названия
hash: 35ZhXMzCsohcmiBf9cQsn4rvaepMqYDc2GnnLw5qoMw=
---
![Логотип](../../../en/adapterref/iobroker.fritzbox/admin/fritzbox.png)ioBroker fritzbox Adapter

![Количество установок](http://iobroker.live/badges/fritzbox-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.fritzbox.svg)
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.fritzbox/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/fritzbox/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.fritzbox.svg)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

## AVM Fritz!Box®

Fritz!Box (написание названия производителя AVM) — один из наиболее распространенных маршрутизаторов на рынке.

В настоящее время существуют модели для всех распространенных типов интернет-соединения: DSL, кабельное, мобильное и оптоволоконное.

### Адаптер Fritzbox

Адаптер устанавливает соединение между Fritz!Box (сокращенно: FB) и ioBroker и предоставляет данные и списки вызовов.

## Предварительные условия перед установкой

Обмен данными осуществляется через встроенный в FB _монитор вызовов_ . Для его активации наберите следующий номер с подключенного телефона:

- `#96*5*` - включить монитор вызовов
- `#96*4*` - выключить монитор вызовов

## Установить

Выберите адаптер «fritzbox» в администраторе ioBroker.

## Конфигурация

### Настройки

Здесь вам нужно лишь активировать, какие данные следует передавать и в каком формате. По словам разработчиков, некоторые поля данных являются лишними (см. графическое изображение и тему на форуме); данный адаптер не будет получать дальнейших обновлений, так как его можно заменить более мощным адаптером "TR-064".

![Сообщение с форума](../../../en/adapterref/iobroker.fritzbox/doc/konfig_fehler.png)

Более подробная информация на форуме [в этой теме](https://forum.iobroker.net/viewtopic.php?f=20\&t=3344\&hilit=fritzbox) .

### Автонастройка

см. [Настройки](#settings)

## Пример

В разделе « _Экземпляры_ ioBroker» вы найдете установленный экземпляр адаптера. Слева отображается информация в виде светофора, показывающая, активирован ли адаптер и подключен ли он.

![пример](../../../en/adapterref/iobroker.fritzbox/doc/instanz.png)

Если навести указатель мыши на символ, вы получите подробную информацию.

## Объекты адаптера

В области объектов все значения, списки и информация, передаваемые FB адаптеру, отображаются в древовидной структуре (см. настройки).

Непосредственно в папке экземпляра _fritzbox.x_ вы найдете _сообщение_ с данными, содержащее дату, время и тип последнего действия.

![иерархия папок](../../../en/adapterref/iobroker.fritzbox/doc/ordnerbaum.png)

Ниже кратко описаны соответствующие каналы и созданные в них точки данных.

### Монитор звонков канала

Представленные данные отображают количество звонков в режиме реального времени.

| **точка данных** | **описание**                                                              |
| ---------------- | ------------------------------------------------------------------------- |
| все              | Отображение даты, времени и номера телефона; входящие и исходящие звонки. |
| вызов            | Отображение даты, времени и номера телефона; исходящий                    |
| соединять        | Отображение даты, времени и номера телефона существующего соединения.     |
| кольцо           | Отображение даты, времени и номера телефона входящих звонков.             |

### Звонки по каналам

В рамках этого канала создаются еще 2 канала и некоторые точки данных:

![звонки по каналам](../../../en/adapterref/iobroker.fritzbox/doc/calls.png)

| **точка данных**       | **описание**                                  |
| ---------------------- | --------------------------------------------- |
| callLastNumber         | последний набранный номер телефона            |
| connectNumber          | последний текущий подключенный звонок         |
| connectNumbers         | все текущие подключенные звонки               |
| пропущенное количество | счетчик пропущенных звонков                   |
| пропущенная датаСброс  | дата последнего сброса счетчика               |
| кольцо                 | сигнал о входящем вызове                      |
| ringActualNumber       | номер телефона входящего звонка               |
| ringActualNumbers      | телефонные номера всех входящих звонков       |
| ringLastMissedNumber   | номер телефона последнего пропущенного звонка |
| ringLastNumber         | номер телефона последнего входящего звонка    |

#### counterActualCalls

Здесь в режиме реального времени отображаются значения различных счетчиков текущих вызовов:

| **точка данных**   | **описание**                                             |
| ------------------ | -------------------------------------------------------- |
| allActiveCount     | Количество всех активных вызовов (соединенных, входящих) |
| количество звонков | количество исходящих звонков                             |
| connectCount       | количество существующих подключений                      |
| количество колец   | количество входящих звонков                              |

#### telLinks

Приведенные ниже данные представлены в виде ссылок, так что соответствующий номер можно набрать по этой ссылке (например, через виджет в VIS):

| **точка данных**        | **описание**                                        |
| ----------------------- | --------------------------------------------------- |
| callLastNumberTel       | повторный набор, последний набранный номер телефона |
| ringLastMissedNumberTel | последний пропущенный звонок                        |
| ringLastNumberTel       | последний входящий звонок                           |

### Канал cdr

Эти данные предоставляют информацию в отформатированном виде (см. настройки).

| **точка данных** | **описание**                 |
| ---------------- | ---------------------------- |
| html             | последний звонок             |
| json             |                              |
| пропущенный HTML | последний пропущенный звонок |
| пропущенныйJSON  |                              |
| текст            | последний звонок             |

### История канала

Эти данные представляют собой таблицы в отформатированном виде. Какую именно информацию передавать, можно определить в настройках.

| **точка данных** | **описание**       |
| ---------------- | ------------------ |
| allTableHTML     |                    |
| allTableJSON     | все звонки         |
| allTableTxt      |                    |
| missedTableHTML  | пропущенные звонки |
| missedTableJSON  |                    |

### Канальная система

| **точка данных** | **описание**                                                                        |
| ---------------- | ----------------------------------------------------------------------------------- |
| дельтаВремя      | Разница во времени между системным временем ioBroker и временем Fritzbox в секундах |
| deltaTimeOK      | Результат теста (верно/неверно)                                                     |

## Часто задаваемые вопросы

**В: Существует адаптер Fritzbox и адаптер TR-064, который также обеспечивает доступ к монитору звонков Facebook. В чем разница между ними, нужно ли устанавливать оба адаптера?**

А: Адаптер Fritzbox изначально предоставлял доступ только к той информации о маршрутизаторе, которая касалась звонков.

TR-064 можно считать дальнейшим развитием технологии, поскольку этот адаптер предоставляет гораздо более полную информацию, например, об устройствах, зарегистрированных в FB.

В принципе, достаточно установить один из двух адаптеров. Однако, поскольку многие давние пользователи используют адаптер FB и построили на его основе свои визуализации, он остается доступным, но его разработка прекращена.

Новичкам рекомендуется установить [адаптер TR-064](https://github.com/ioBroker/ioBroker.docs/tree/master/docs/adapterref/docs/iobroker.tr-064/de) .

## Документация по данным

В среде **fritzbox.x** адаптер создает следующие каналы и точки данных:

- сообщение -(Сообщение от FRITZ!Box)

### `calls` Канал

- calls.ring - true/false, есть ли входящий вызов?
- calls.missedCount - Целое число, доступное для чтения и записи, количество пропущенных звонков.
- calls.missedDateReset - Дата последнего сброса значения calls.missedCount до 0.
- calls.ringActualNumber - номер текущего входящего вызова (последний, если их несколько)
- calls.ringActualNumbers - все звонки, поступающие в данный момент
- calls.ringLastNumber - последний звонивший
- calls.ringLastMissedNumber - последний пропущенный звонок
- calls.callLastNumber - повторный набор, последний набранный номер телефона
- calls.connectNumber - последний текущий подключенный вызов
- calls.connectNumbers - все текущие подключенные звонки

### `calls.counterActualCalls` Канал - в режиме реального времени

- calls.counterActualCalls.ringCount - количество входящих звонков (RING)
- calls.counterActualCalls.callCount - количество попыток исходящих вызовов (CALL)
- calls.counterActualCalls.connectCount - количество активных подключенных вызовов (CONNECT)
- calls.counterActualCalls.allActiveCount - количество всех активных вызовов (CALL, RING и CONNECT)

### `calls.telLinks` Канал - номера телефонов, доступные для набора: тел. +...

- calls.telLinks.ringLastNumberTel - последний вызывающий абонент в качестве доступной ссылки
- calls.telLinks.ringLastMissedNumberTel - последний пропущенный звонок в качестве набираемого номера
- calls.telLinks.callLastNumberTel - повторный набор, последний набранный номер телефона, набираемый номер

### `history.` Канал

- history.allTableTxt - ...
- history.allTableHTML - список вызовов в виде HTML-таблицы
- history.allTableJSON - список вызовов в формате JSON
- history.missedTableHTML - список пропущенных звонков в формате HTML
- history.missedTableJSON - список пропущенных звонков в формате JSON

### `history.cdr` Канал

- history.cdr.json - CDR в формате JSON
- history.cdr.html - CDR в формате HTML
- history.cdr.txt - CDR в формате TXT
- history.cdr.missedJSON - последний пропущенный звонок в формате JSON
- history.cdr.missedHTML - последний пропущенный звонок в формате HTML

### `callmonitor.` Канал

- callmonitor.all - HTML-список: все активные вызовы во всех штатах
- callmonitor.ring - HTML-список: все активные входящие звонки
- callmonitor.call - HTML-список: все исходящие звонки
- callmonitor.connect - HTML-список: все подключенные вызовы

### `system.` Канал

- system.deltaTime - разница во времени между системой и FRITZ!Box в секундах.
- system.deltaTimeOK - true/false, разница во времени между системой и FRITZ!Box в пределах допустимого отклонения

### `wlan.` Канал

- wlan.enabled - true/false, чтение и запись, состояние беспроводной сети, доступно только при настройке пароля.

### `phonebook.` Канал

- phonebook.tableJSON - телефонная книга со всеми внешними номерами в формате JSON.

### `tam.` Канал

- tam.messagesJSON - все сообщения автоответчика в формате JSON

## Примеры виджетов

### FRITZ!Box Большой виджет

Включает его, среди прочего:

- Красная полоса, отображающая номер телефона звонящего во время активного входящего вызова.
- Графическая шкала, показывающая количество вызовов по типам: звонок, установление соединения и завершение соединения.
- Счетчик пропущенных звонков с кнопкой сброса
- список пропущенных звонков
- Список всех звонков с цветовой кодировкой (подключено/не подключено) и указанием направления.
- Счетчики для: текущих вызовов, установления исходящих вызовов, установленных вызовов, общего количества вызовов/попыток вызовов.
- Информационное поле, которое становится желтым, когда время FRITZ!Box слишком сильно отклоняется от системного времени ioBroker.

![FRITZ!Box большой виджет](../../../en/adapterref/iobroker.fritzbox/doc/iobroker_fritzbox_widget_gross.png)

[ioBroker FRITZ!Box большой виджет в формате VIS (файл импорта)](https://github.com/iobroker-community-adapters/ioBroker.fritzbox/blob/master/widgets/iobroker_fritzbox_widget_gross.json)

### Виджет мониторинга звонков в реальном времени FRITZ!Box

Отображает все активные вызовы, входящие вызовы (звонок) и установленные исходящие соединения. Продолжительность активных и входящих вызовов отображается (обновляется каждую секунду).

![Виджет мониторинга звонков в реальном времени FRITZ!Box](../../../en/adapterref/iobroker.fritzbox/doc/iobroker_fritzbox_anrufmonitor.png)

[Виджет мониторинга звонков в реальном времени ioBroker для импорта в VIS](https://github.com/iobroker-community-adapters/ioBroker.fritzbox/blob/master/widgets/iobroker_fritzbox_anrufmonitor.json)

### Виджет списка вызовов FRITZ!Box, использующий "базовый HTML-виджет".

Содержимое столбцов и их заголовки можно свободно выбирать в виджете. Это также позволяет использовать заголовки на других языках.

![Виджет списка вызовов FRITZ!Box с базовым HTML-виджетом](../../../en/adapterref/iobroker.fritzbox/doc/iobroker_fritzbox_html_table.png)

[Виджет списка вызовов ioBroker с базовым HTML-виджетом для импорта в VIS.](https://github.com/iobroker-community-adapters/ioBroker.fritzbox/blob/master/widgets/iobroker_fritzbox_html_table.json)

### Виджеты FRITZ!Box: информация о текущих и прошлых звонках.

Информационные виджеты представляют собой примеры отдельных точек данных, генерируемых адаптером FRITZ!Box.

Имеется одна точка данных с номером телефона, выведенным устройством FRITZ!Box (a), и одна точка данных с номером телефона, преобразованным в набираемую ссылку (b) (например, отображается номер 020147114711 и связывается с tel:+4920147114711). Эти телефонные ссылки полезны, например, на интерфейсах VIS смартфонов, для возврата пропущенного вызова одним касанием.

Примеры виджетов:

- (1) последний звонивший
- (2) текущий абонент (отображается на протяжении всего звонка)
- (3) последний позвонивший, звонок которого не был принят (не был дан ответ)
- (4) повторный набор: последний набранный номер телефона

![Виджет FRITZ!Box предоставляет информацию о последних звонках.](../../../en/adapterref/iobroker.fritzbox/doc/iobroker_fritzbox_letzte_telefonate.png)

[Виджет ioBroker предоставляет информацию о последних звонках.](https://github.com/iobroker-community-adapters/ioBroker.fritzbox/blob/master/widgets/iobroker_fritzbox_letzte_telefonate.json)

## Формат данных JSON для JSON CDR и JSON Call List

```json
{
    "date":"25.07.15 16:40:21",
    "dateEpoch":1437835221000,
    "dateEpochNow":1437835221000,
    "deltaTime":0,
    "deltaTimeOK":true,
    "type":"DISCONNECT",
    "id":"1",
    "extensionLine":"11",
    "ownNumber":"021147114711",
    "externalNumber":"051112345678",
    "lineType":"POTS",
    "durationSecs":"55",
    "durationForm":"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;55",
    "durationSecs2":"55",
    "durationRingSecs":"",
    "connect":true,
    "direction":"out",
    "dateStartEpoch":1437835144000,
    "dateConnEpoch":1437835167000,
    "dateEndEpoch":1437835221000,
    "dateStart":"25.07.15 16:39:04",
    "dateConn":"25.07.15 16:39:27",
    "dateEnd":"25.07.15 16:40:21",
    "callSymbol":"<<-&nbsp;",
    "callSymbolColor":"<span style=\" color:green\"><b><<-&nbsp;</b></span>",
    "unknownNumber":false,
    "ownNumberForm":"021147114711&nbsp;&nbsp;&nbsp;",
    "externalNumberForm":"051112345678&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
    "ownNumberE164":"+4921147114711",
    "externalE164":"+4951112345678",
    "externalTelLink":"<a style=\" text-decoration: none;\" href=\"tel:+4951112345678\">051112345678&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>",
    "externalTelLinkCenter":"<a style=\" text-decoration: none;\" href=\"tel:+4951112345678\">051112345678</a>"
}
```

<!--
## todo
* Doku der Datenpunkte
* Import des xml Telefonbuch der Fritzbox
* Feinere Konfiguration der Anruferliste (Tabellen)
-->

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.0.0 (2026-09-09)
- (copilot) Adapter requires node.js >= 22 now
- (copilot) **ENHANCED**: Translated README documentation from German to English
- (GermanBluefox) Merged the ioBroker.net manual (docs/de, docs/en) into a single README.md
- (GermanBluefox) The adapter was refactored to TypeScript, the sources are in `src/` and are compiled to `build/`
- (GermanBluefox) The admin configuration was migrated from the HTML page to JsonConfig, the translations moved to `admin/i18n/<lang>.json`
- (GermanBluefox) `request` was replaced by `axios`
- (GermanBluefox) `enableWlan`, `enablePhonebook` and `enableTAM` have a default in io-package.json now, unused `native` entries were removed
- (GermanBluefox) The adapter cannot be installed directly from GitHub anymore, because the sources have to be compiled (`common.nogit`)
- (GermanBluefox) **FIXED**: after a lost connection, the adapter tried to reconnect only once
- (GermanBluefox) **FIXED**: the tel: links were not initialized, they were written to `telLinks.*` instead of `calls.telLinks.*`
- (GermanBluefox) **FIXED**: the cleanup of the answering machine audio files looked into the working directory instead of the instance directory
- (GermanBluefox) The adapter supports the compact mode now

### 0.7.0 (2026-03-07)
- (iobroker-bot) Adapter requires node.js >= 20 now.
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (mcm1957) Dependencies have been updated

### 0.6.0 (2024-04-11)
* (mcm1957) Adapter requires node.js >=18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 0.5.0 (2022-04-02)
* (Apollon77) Write history.missedTableJSON value
* (Apollon77) Store tam files in an instance-specific location
* (Apollon77) Fix crash cases reported by Sentry

### 0.4.0 (2022-03-25)
* IMPORTANT: You need to re-enter the password once after installing this version!
* (Khaos66/Apollon77) General updates and fixes
* (Khaos66) TAM (Telephone Answering Maschine) support added
* (Apollon77) Add Sentry for crash reporting

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.fritzbox/blob/master/CHANGELOG_OLD.md)

## License

The MIT License (MIT)

Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2015-2022, ruhr70

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