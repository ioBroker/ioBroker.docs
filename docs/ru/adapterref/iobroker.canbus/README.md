---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.canbus/README.md
title: ioBroker.canbus
hash: 3cIsF9IkK2XBHSxx2d33+5cqsawYPRQ8dsqv1hiTq80=
---
# IoBroker.canbus
![Логотип](../../../en/adapterref/iobroker.canbus/admin/canbus.png)

![версия NPM](https://img.shields.io/npm/v/iobroker.canbus.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.canbus.svg)
![Количество установок (последние)](https://iobroker.live/badges/canbus-installed.svg)
![Количество установок (стабильно)](https://iobroker.live/badges/canbus-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.canbus.png?downloads=true)

[![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/canbus/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Тесты:** ![Тестируйте и выпускайте](https://github.com/crycode-de/ioBroker.canbus/workflows/Test%20and%20Release/badge.svg)

## Адаптер шины CAN для ioBroker
Этот адаптер соединяет ioBroker с локальной сетью контроллеров (шина CAN).

**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

## Функции
* Получайте и отправляйте необработанные сообщения, используя стандартные кадры и расширенные кадры
* Каждое сообщение может быть настроено на получение и/или отправку данных
* Возможность автоматического добавления объектов для увиденных сообщений CAN, которые еще не настроены
* Настроить синтаксические анализаторы для каждого сообщения для чтения/записи данных из/в буфер необработанных сообщений.
  * Числовые типы
  * Логические значения, включая поддержку битовой маски
  * Строки в разных кодировках символов
  * Пользовательские скрипты для чтения/записи из/в буфер необработанных данных
* Расширенная функция импорта/экспорта
  * Импортируйте конфигурации сообщений, чтобы расширить существующую конфигурацию
  * Импорт предопределенных «хорошо известных» конфигураций из GitHub в интерфейсе администратора.
  * Экспорт и импорт конфигураций ваших сообщений в виде файлов `json` или `csv`
* Дополнительная поддержка фиксированной длины данных (DLC)
* Дополнительная поддержка флага RTR
* Необязательные необработанные состояния, содержащие необработанные объекты сообщений CAN.
* Необязательно автоматически устанавливать определенное значение в заданном интервале для каждого парсера (полезно для опроса данных)

## Требования
* Операционная система Linux (из-за используемой библиотеки socketcan)
* Аппаратное обеспечение CAN, которое поддерживается ядром и создает интерфейс, подобный `can0`
* Некоторые знания о сообщениях, отправляемых по шине CAN.

## Парсеры
Используя синтаксические анализаторы, вы можете читать данные или записывать данные в буфер сообщений CAN.

Существуют предопределенные синтаксические анализаторы для следующих типов данных.
Кроме того, вы можете написать свои собственные скрипты для чтения/записи значений с помощью *настраиваемого парсера*.

### Числовые типы в представлении *big-endian* и *little-endian*
* 8-, 16- и 32-битное целое число со знаком и без знака
* 32-битное число с плавающей запятой
* 64-битный двойной

### Логическое значение
* 1 байт, включая поддержку битовой маски

### Нить
* Длина от 1 до 8 байт
* Кодировка: *ascii*, *base64*, *hex*, *latin1*, *utf8*, *utf16le*

### Обычай
Для пользовательского парсера вы должны предоставить свой собственный скрипт чтения и записи.
Эти скрипты должны быть чистыми javascript и будут работать в песочнице.

В скриптах вы можете использовать следующие функции:

* Большинство встроенных функций Node.js
* `асинхронно`/`ждите`
* Функции журнала адаптера `log.warn('something')`, `log.info('something')`, `log.debug('something')`
* `getStateAsync('id')` и `getObjectAsync('id')`, где `id` - это полный идентификатор состояния/объекта
* Объект `sharedData`, который является общим для всех пользовательских сценариев экземпляра адаптера.

Ошибки в сценариях будут протоколироваться адаптером.

В обоих сценариях переменные `buffer` и `value` определены заранее.
`buffer` всегда содержит текущее содержимое сообщения CAN в виде буфера Node.js.

Объект `sharedData` по умолчанию пуст и может использоваться для обмена некоторыми данными между несколькими вызовами одного пользовательского анализатора или даже между несколькими пользовательскими анализаторами.

#### Пользовательский скрипт чтения
В сценарии чтения вы должны прочитать `value` из переменной `buffer`.

В начале пользовательского сценария чтения `buffer` будут данными полученного/текущего сообщения CAN (как в состоянии `.json`).
`value` будет равно `undefined` и должно быть установлено сценарием.

Содержимое переменной `value` в конце пользовательского сценария чтения будет использоваться как новое значение для состояния.
Если `value` равно `undefined`, оно будет проигнорировано. Используя это, вы можете фильтровать сообщения в пользовательском сценарии чтения по частям данных.

##### Пример пользовательского сценария чтения
Проверьте первые три байта в полученном буфере на соответствие фиксированным значениям.
При совпадении считать 16-битное целое число со знаком из буферных байтов 3 и 4 и разделить его на 10.

```js
if (buffer[0] === 0xC2 && buffer[1] === 0x10 && buffer[2] === 0x0F) {
  value = buffer.readInt16BE(3) / 10;
}
```

Причина `value` устанавливается только при совпадении первых трех байтов, все остальные данные будут игнорироваться и не будут устанавливать новое значение для состояния.

#### Пользовательский сценарий записи
В сценарии записи вы должны изменить (или заменить) переменную `buffer`.

В начале пользовательского сценария записи `buffer` будут текущими данными сообщения CAN (как в состоянии `.json`).
`value` устанавливается в значение состояния, которое должно быть записано в `buffer`.

Содержимое переменной `buffer` в конце пользовательского сценария записи будет использоваться как новые данные для сообщения CAN.

##### Пример пользовательского скрипта записи
Подготовьте новый буфер с фиксированными значениями.
Запишите значение состояния в буфер как 16-битное целое число со знаком, начиная с пятого байта в буфере.

```js
buffer = Buffer.from([0x30, 0x00, 0xFA, 0x06, 0x7E, 0x00, 0x00]);
buffer.writeInt16BE(value, 5);
```

Затем новое состояние `buffer` будет установлено как состояние `.json`.
Если для сообщения включена опция *autosend*, сообщение будет отправлено автоматически.

## Использование в скриптах
Вы можете обрабатывать/изменять состояния `<messageId>.json` или `<messageId>.<parserId>` в своих скриптах.

Кроме того, вы можете использовать состояния `raw.received` и `raw.send`, если они включены в конфигурации адаптера.
Они содержат строковые данные JSON данных сообщения и могут использоваться для обработки каждого полученного или отправленного сообщения независимо от настроенных сообщений.
Записав данные JSON в состояние `raw.send`, вы можете отправлять сообщения CAN, содержащие любые данные, которые вам нравятся.

### Пример необработанного объекта сообщения
```js
{
  "id": 42,
  "ext": false,
  "data": [0, 13, 37, 255],
  "rtr": false
}
```

`ext` и `rtr` являются необязательными и по умолчанию равны `false`.

## Changelog

### 1.3.0 (2022-02-07)
* (crycode-de) Added `sharedData` object in custom parsers

### 1.2.3 (2021-10-17)
* (crycode-de) Added missing `autoSet...` parser options to csv export/import
* (crycode-de) Fixed `TypeError: Method Promise.prototype.then called on incompatible receiver [object Object]` triggered by a bug in an old `vm2` version
* (crycode-de) Updated dependencies

### 1.2.2 (2021-08-22)
* (crycode-de) Fixed text colors in dark theme of admin 5
* (crycode-de) Updated dependencies

### 1.2.1 (2021-06-22)
* (crycode-de) Added option to automatically set a certain value in a given interval for each parser
* (crycode-de) Added checks for duplicate parser IDs
* (VeSler) Russian translation updates
* (crycode-de) Use inline sourcemaps for the adapter build files to make remote debugging work
* (crycode-de) Updated dependencies

### 1.1.4 (2021-04-30)
* (crycode-de) Added license information to import of well-known configurations
* (crycode-de) Fixed "Parser returned wrong data type undefined" log message
* (crycode-de) Updated dependencies

### 1.1.3 (2021-04-12)
* (crycode-de) Added definition of possible state values in admin
* (crycode-de) Added selection of the state role for each parser in admin
* (crycode-de) Fixed display bug of floating action buttons in admin
* (crycode-de) Export uses defaults if some config parts are not defined (e.g. if the config is from an older version)
* (crycode-de) Fixed wrong validation if a message/parser was deleted

### 1.1.2 (2021-04-06)
* (crycode-de) Added copy/paste function for message and parser configurations in admin

### 1.1.1 (2021-04-02)
* (crycode-de) Import bugfixes
* (crycode-de) Prevent wrong log warning if a parser returned undefined
* (crycode-de) Added react errorboundary for better clientside error handling

### 1.1.0 (2021-04-01)
* (crycode-de) Added import/export feature for messages in json or csv format
* (crycode-de) Added import of well known configurations from GitHub
* (crycode-de) Fixed config import in admin
* (crycode-de) Added ioBroker state data type option for custom parsers

### 1.0.2 (2021-03-26)
* (crycode-de) Fixed issue where missing state prevented custom parser write
* (DutchmanNL) Dutch translation updates
* (UncleSamSwiss) French translation updates
* (VeSler) Russian translation updates

### 1.0.1 (2021-03-12)
* (crycode-de) Use a queue to process _parser_ and _send_ state changes in the correct order
* (crycode-de) Fixed some spelling issues
* (crycode-de) Updated dependencies

### 1.0.0 (2021-02-23)
* (crycode-de) Sort messages in admin
* (VeSler) Russian admin translations
* (crycode-de) Updated dependencies

Older changelog is in CHANGELOG_OLD.md

## License

Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)

Copyright (c) 2020-2022 Peter Müller <peter@crycode.de> (https://crycode.de/)