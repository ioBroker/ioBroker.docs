---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.canbus/README.md
title: ioBroker.canbus
hash: AsmePoTscNwWtzLsi82WDRG9EPTCLQmIlZFVoUGldy8=
---
# IoBroker.canbus
![Логотип](../../../en/adapterref/iobroker.canbus/admin/canbus.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.canbus.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.canbus.svg)
![Количество установок (последнее)](https://iobroker.live/badges/canbus-installed.svg)
![Количество установок (стабильное)](https://iobroker.live/badges/canbus-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.canbus.png?downloads=true)

[![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/canbus/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Тесты:** ![Тестирование и выпуск](https://github.com/crycode-de/ioBroker.canbus/workflows/Test%20and%20Release/badge.svg)

## Адаптер CAN-шины для ioBroker
Этот адаптер подключает ioBroker к сети контроллеров (шине CAN).

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Подробнее об отключении отчётов об ошибках см. в разделе [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчёты Sentry используются, начиная с версии js-controller 3.0.

## Функции
* Получать и отправлять необработанные сообщения с использованием стандартных и расширенных кадров
* Каждое сообщение может быть настроено для приема и/или отправки данных
* Возможность автоматического добавления объектов для просмотренных CAN-сообщений, которые еще не настроены
* Настройте парсеры для каждого сообщения для чтения/записи данных из/в буфер необработанных сообщений.
* Числовые типы
* Булевы значения, включая поддержку битовых масок
* Строки в разных кодировках символов
* Пользовательские скрипты для чтения/записи из/в буфер необработанных данных
* Расширенная функция импорта/экспорта
* Импортируйте конфигурации сообщений для расширения существующей конфигурации
* Импортируйте предопределенные «хорошо известные» конфигурации из GitHub в интерфейсе администратора.
* Экспортируйте и импортируйте конфигурации сообщений в виде файлов `json` или `csv`
* Дополнительная поддержка фиксированной длины данных (DLC)
* Опциональная поддержка флага RTR
* Дополнительные необработанные состояния, содержащие необработанные объекты сообщений CAN
* Опционально автоматически устанавливать определенное значение в заданном интервале для каждого парсера (полезно для опроса данных)

## Требования
* Операционная система Linux (из-за используемой библиотеки socketcan)
* Аппаратное обеспечение CAN, которое поддерживается ядром и создает интерфейс типа `can0`
* Некоторые знания о сообщениях, отправляемых по вашей CAN-шине

## Парсеры
Используя парсеры, вы можете считывать данные из буфера сообщений CAN или записывать данные в него.

Существуют предустановленные парсеры для следующих типов данных.
Кроме того, вы можете написать собственные скрипты для чтения/записи значений с помощью *пользовательского парсера*.

### Числовые типы в представлении *big-endian* и *little-endian*
* Знаковые и беззнаковые 8-, 16- и 32-битные целые числа
* 32-битное число с плавающей точкой
* 64-битный двойной

### Булево
* 1 байт, включая поддержку битовой маски

### Нить
* Длина от 1 до 8 байт
* Кодировка: *ascii*, *base64*, *hex*, *latin1*, *utf8*, *utf16le*

### Обычай
Для создания собственного парсера вам необходимо предоставить собственный скрипт чтения и записи.
Эти скрипты должны быть написаны на чистом JavaScript и будут выполняться в ограниченной области действия.

В скриптах вы можете использовать следующие возможности:

* Глобальные переменные `undefined`, `NaN`, `isNaN`, `Infinity`, `isFinite`, `atob`, `btoa`,

`encodeURI`, `encodeURIComponent`, `decodeURI`, `decodeURIComponent`, `parseFloat`, `parseInt`, `JSON`, `Number`, `String`, `Array`, `BigInt`, `Blob`, `Boolean`, `Date`, `Map`, `Math`, `Object`, `RegExp`, `Set`, `Intl`, `Buffer`, `Promise`, `setTimeout`, `clearTimeout`

* `async`/`await`
* Функции журнала адаптера `log.warn('something')`, `log.info('something')`, `log.debug('something')`
* `getStateAsync('id')`, `getObjectAsync('id')`, `setStateAsync('id', 'value', ack)`, где `id` — это частичный идентификатор состояния/объекта под текущим экземпляром адаптера
* `getForeignStateAsync('id')`, `getForeignObjectAsync('id')` и `setForeignStateAsync('id', 'value', ack)`, где `id` — полный идентификатор состояния/объекта
* Функция `wait(ms)`, которая возвращает обещание, которое разрешается по истечении заданного времени.
* Объект `sharedData`, который является общим для всех пользовательских скриптов экземпляра адаптера.

Ошибки в скриптах будут регистрироваться адаптером.

В обоих скриптах переменные `buffer` и `value` предопределены.
`buffer` всегда содержит текущее содержимое сообщения CAN в виде буфера Node.js.

Объект `sharedData` по умолчанию пуст и может использоваться для совместного использования некоторых данных между несколькими вызовами одного пользовательского парсера или даже между несколькими пользовательскими парсерами.

#### Пользовательский сценарий чтения
В скрипте чтения необходимо прочитать `value` из переменной `buffer`.

В начале пользовательского скрипта чтения `buffer` будет копией данных принятого/текущего сообщения CAN (как в состоянии `.json`).
`value` будет `undefined` и должен быть установлен скриптом.

Содержимое переменной `value` в конце пользовательского скрипта чтения будет использовано в качестве нового значения состояния.
Если `value` равно `undefined`, оно будет проигнорировано. Это позволяет фильтровать сообщения в пользовательском скрипте чтения по частям данных.

##### Пример пользовательского сценария чтения
Проверьте первые три байта в полученном буфере на соответствие фиксированным значениям.
Если совпадение найдено, считайте 16-битное целое число со знаком из байтов 3 и 4 буфера и разделите его на 10.

```js
if (buffer[0] === 0xC2 && buffer[1] === 0x10 && buffer[2] === 0x0F) {
  value = buffer.readInt16BE(3) / 10;
}
```

Причина `value` устанавливается только тогда, когда совпадают первые три байта, все остальные данные будут проигнорированы и не установят новое значение для состояния.

#### Пользовательский скрипт записи
В скрипте записи вам необходимо изменить (или заменить) переменную `buffer`.

В начале пользовательского скрипта записи `buffer` будет копией текущих данных сообщения CAN (как в состоянии `.json`).
`value` задаётся значением состояния, которое должно быть записано в `buffer`.

Содержимое переменной `buffer` в конце пользовательского скрипта записи будет использоваться в качестве новых данных для сообщения CAN.

Вы также можете отменить запись, вызвав функцию `return false;` в пользовательском скрипте записи.
Это позволяет предотвратить запись, если не выполнены определённые условия.

##### Пример пользовательского сценария записи
Подготовьте новый буфер с фиксированными значениями.
Запишите значение состояния в буфер как 16-битное целое число со знаком, начиная с пятого байта буфера.

```js
buffer = Buffer.from([0x30, 0x00, 0xFA, 0x06, 0x7E, 0x00, 0x00]);
buffer.writeInt16BE(value, 5);
```

Новое состояние `buffer` будет установлено как состояние `.json`.
Если для сообщения включена опция *autosend*, оно будет отправлено автоматически.

## Использование в скриптах
Вы можете обрабатывать/изменять состояния `<messageId>.json` или `<messageId>.<parserId>` в своих скриптах.

Кроме того, вы можете использовать состояния `raw.received` и `raw.send`, если они включены в конфигурации адаптера.
Они содержат строковые данные JSON сообщения и могут использоваться для обработки каждого полученного или отправленного сообщения независимо от настроенных сообщений.
Записав данные JSON в состояние `raw.send`, вы можете отправлять CAN-сообщения с любыми данными.

### Пример объекта необработанного сообщения
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

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.3.0 (2025-10-03)

* (crycode-de) Support for Node.js 24
* (crycode-de) js-controller >= 6.0.11, Admin >= 7.6.17 required
* (crycode-de) Fixed issue with importing configurations
* (crycode-de) Updated dependencies

### 2.2.0 (2025-05-27)

* (crycode-de) Node.js >= 20 and <23, Admin >= 7.4.10 required
* (crycode-de) Optimized admin layout for smaller devices and added a warning on very small devices
* (crycode-de) Updated dependencies

### 2.1.1 (2024-11-04)

* (crycode-de) Fixed get/set functions in custom parser scripts

### 2.1.0 (2024-11-03)

* (crycode-de) Allow `setStateAsync` and `setForeignStateAsync` in custom parser scripts
* (crycode-de) Allow `setTimeout` and `clearTimeout` in custom parser scripts (using the adapters setTimeout implementation)
* (crycode-de) Added `wait` function to custom parser scripts

### 2.0.0 (2024-11-02)

* (crycode-de) Node.js >= 18, Admin >= 6.17, js-contoller >= 5.0.19 are required
* (crycode-de) Changed how custom parser scripts are interpreted. Most custom parser scripts should work as before but they have a limited scope now.
* (crycode-de) Custom parser scripts now support `getStateAsync`, `getForeignStateAsync`, `getObjectAsync` and `getForeignObjectAsync`. If you have used `getStateAsync`/`getObjectAsync` before you need to change them to `getForeignStateAsync`/`getForeignObjectAsync` or update the IDs if you get data from the same adapter instance.
* (crycode-de) Custom write parser scripts an now return false to cancel the write
* (crycode-de) Updated dependencies

## License

Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)

Copyright (c) 2020-2025 Peter Müller <peter@crycode.de> (<https://crycode.de/>)