---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.socketio/README.md
title: ioBroker сокет.io
hash: ADSCIlqm9U+gK84+3fU1fEF8ZdlgfkilsN3ozaWAukA=
---
![Логотип](../../../en/adapterref/iobroker.socketio/admin/socketio.png)

![Количество установок](http://iobroker.live/badges/socketio-stable.svg)
![версия НПМ](http://img.shields.io/npm/v/iobroker.socketio.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.socketio.svg)
![НПМ](https://nodei.co/npm/iobroker.socketio.png?downloads=true)

# IoBroker сокет.io
Этот адаптер используется WEB-приложениями и адаптерами для связи с ioBroker с помощью веб-сокетов и протокола socket.io.

**Важное примечание: начиная с версии 4.0 этого адаптера используются исключительно чистые WebSockets! Socket.io больше не реализуется библиотекой socket.io, а моделируется через чистые WebSockets!**

Пользователи могут использовать этот адаптер для подключения своих продуктов к ioBroker через веб-сокеты.
На самом деле, этот адаптер может использоваться echarts, vis и многими другими адаптерами для извлечения данных из ioBroker.

Если возможно, используйте [`iobroker.ws`](https://github.com/ioBroker/ioBroker.ws) вместо этого адаптера.

В примере [каталог](https://github.com/ioBroker/ioBroker.socketio/tree/master/example) вы можете найти простое приложение, которое использует этот интерфейс для отображения некоторых данных.

Используя интерфейс socket.io, пользователь должен понимать [основы и концепция](https://github.com/ioBroker/ioBroker) системы.

Полезно также почитать о [структура объектов](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md).

**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Более подробную информацию и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

## Краткое описание концепции
### Объект
Объект — это описание точки данных или группы. Группа может содержать другие точки данных, в этом случае она называется каналом.
Если группа состоит из других каналов, в этом случае она называется устройством.

Объект — это метаинформация, которая описывает точку данных и может содержать: максимальное/минимальное значение, единицу измерения, имя, значение по умолчанию, тип значения, информацию об адаптере для связи (например, IP-адрес) и т. д.

### Состояние
Состояние — это фактическое значение точки данных, представленное объектом JavaScript:

```
{
    val: VALUE,
    ack: ACKNOWLEDGED,
    ts: TIMESTAMP, // could be converted into time with "new Date(state.ts)" (In older version of js-controller - "new Date(state.ts * 1000)")
    lc: TIMESTAMP of last change,
    from: ADAPTER_NAME,
    q: QUALITY
}
```

Состояния изменяются очень часто по сравнению с объектами. (Обычно объекты должны быть изменены один раз при создании и это все)

### Подтверждение
Каждое состояние имеет атрибут `ack`. Он показывает направление команды.

- Если ack=false, это означает, что какой-то другой адаптер хочет управлять (записывать) эту переменную, поэтому команда будет выполнена (например, включится свет).
- Если ack=true, это означает, что устройство сообщает о новом значении. (например, свет был включен вручную или было обнаружено движение)

**Пример**: у нас есть адаптер домашней автоматизации (HAA), к которому подключена одна лампа по адресу `haa.0.lamp1`.

- Лампу можно включить вручную с помощью физического выключателя или через Wi-Fi с помощью HAA.
- Если vis хочет включить лампу через Wi-Fi, он должен установить новое значение с помощью `{value: true, ack: false}`.
- Когда лампа включается, она обычно информирует HAA о новом состоянии, и значение должно быть немедленно перезаписано на `{value: true, ack: true}`.
- Если лампа выключена вручную с помощью физического переключателя, она информирует HAA о новом состоянии с помощью `{value: false, ack: true}`.

### Качество
Каждая точка данных имеет атрибут `q` - *качество*.

## Использование
Описание каждого поддерживаемого метода можно найти [здесь](https://github.com/ioBroker/ioBroker.socket-classes#web-methods).

Для связи предлагается использовать [класс сокета](https://github.com/ioBroker/socket-client).

## Настройка веб-сокетов
На некоторых клиентах веб-сокетов возникает проблема производительности связи.
Иногда эта проблема возникает из-за отката связи socket.io на механизме длинного опроса.
Вы можете установить опцию *Force Web-Sockets* для принудительного использования только транспорта веб-сокетов.

<!-- Заполнитель для следующей версии (в начале строки):

### **РАБОТА В ХОДЕ** -->

## Changelog
### 7.0.8 (2025-03-04)
* (@GermanBluefox) Removed the frequent debug output

### 7.0.7 (2025-03-03)
* (@GermanBluefox) Corrected the problem with the user rights

### 7.0.6 (2025-02-28)
* (@GermanBluefox) Added OAuth2 support

### 7.0.1 (2025-02-11)
* (@GermanBluefox) Adapter was rewritten in TypeScript

### 6.7.1 (2024-06-26)
* (@GermanBluefox) Corrected call of getObjectView with null parameter

### 6.7.0 (2024-04-27)
* (foxriver76) ported to webserver

### 6.6.1 (2024-02-22)
* (@GermanBluefox) Just some packages were updated

### 6.6.0 (2023-10-13)
* (@GermanBluefox) Corrected adapter termination if the alias has no target

### 6.5.7 (2023-10-08)
* (foxriver76) upgrade socket-classes to fix error with vis subscriptions

### 6.5.6 (2023-09-28)
* (@GermanBluefox) upgraded socket-classes to correct the error by unsubscribing on client disconnect

### 6.5.5 (2023-09-14)
* (foxriver76) upgrade socket-classes to fix crash cases

### 6.5.3 (2023-09-05)
* (mcm1957) added missing node16 requirement

### 6.5.2 (2023-08-01)
* (@GermanBluefox) Added the subscribing on the specific instance messages

### 6.4.0 (2023-07-07)
(@GermanBluefox) extended the getObjects function with the possibility to read the list of IDs

### 6.3.5 (2023-03-17)
* (@GermanBluefox) Increased the max size of the message to 200MB

### 6.3.4 (2023-03-03)
* (@GermanBluefox) Allowed deletion of fullcalendar objects

### 6.3.3 (2022-12-22)
* (@GermanBluefox) used new socket-classes

### 6.3.1 (2022-11-27)
* (@GermanBluefox) Added `fileChange` event

### 6.2.0 (2022-11-08)
* (Apollon77) Prepare for future js-controller versions
* (@GermanBluefox) Function `getObjects` for web was extended by devices, channels and enums

### 6.1.10 (2022-08-24)
* (@GermanBluefox) Caught error by subscribing

### 6.1.8 (2022-07-08)
* (@GermanBluefox) Corrected getAdapterInstances method

## License

The MIT License (MIT)

Copyright (c) 2014-2025 @GermanBluefox <dogafox@gmail.com>