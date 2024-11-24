---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ws/README.md
title: ioBroker.ws
hash: nTPtVkzKPbkqwG4ZqyA5Utge6xM5EauqFIYXv23k87Q=
---
![Логотип](../../../en/adapterref/iobroker.ws/admin/ws.png)

![Количество установок](http://iobroker.live/badges/ws-stable.svg)
![версия НПМ](http://img.shields.io/npm/v/iobroker.ws.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.ws.svg)
![НПМ](https://nodei.co/npm/iobroker.ws.png?downloads=true)

# IoBroker.ws
Этот адаптер используется веб-приложениями и адаптерами для связи с ioBroker с помощью веб-сокетов.

Он почти такой же, как `ioBroker.socketio`, но не использует библиотеку socket.io, а только имитирует ее.

**Важное примечание: начиная с версии 4.0 этого адаптера используются исключительно чистые WebSockets! Socket.io больше не реализуется библиотекой socket.io, а моделируется через чистые WebSockets!**

Пользователи могут использовать этот адаптер для подключения своих продуктов к ioBroker через веб-сокеты.
На самом деле, этот адаптер может использоваться echarts, vis и многими другими адаптерами для извлечения данных из ioBroker.

В примере [каталог](https://github.com/ioBroker/ioBroker.ws/tree/master/example) вы можете найти простое приложение, которое использует этот интерфейс для отображения некоторых данных.

Используя интерфейс socket.io, пользователь должен понимать [основы и концепция](https://github.com/ioBroker/ioBroker) системы.

Полезно также почитать о [структура объектов](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md).

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Более подробную информацию и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

## Краткое описание концепции
### Объект
Объект — это описание точки данных или группы. Группа может содержать другие точки данных, в этом случае она называется каналом. Если группа состоит из других каналов, в этом случае она называется устройством.

Объект — это метаинформация, которая описывает точку данных и может содержать: максимальное/минимальное значение, единицу измерения, имя, значение по умолчанию, тип значения, информацию об адаптере для связи (например, IP-адрес) и т. д.

### Состояние
Состояние — это фактическое значение точки данных, представленное объектом JavaScript:

```js
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

<!-- Заполнитель для следующей версии (в начале строки):

### **РАБОТА В ХОДЕ** -->

## Changelog
### 2.7.0 (2024-11-17)
* (bluefox) Update ws-server library

### 2.6.2 (2024-06-26)
* (bluefox) Corrected call of getObjectView with null parameter

### 2.6.1 (2024-04-22)
* (foxriver76) fixed require of webserver

### 2.6.0 (2024-04-21)
* (foxriver76) use `@iobroker/webserver`

### 2.5.11 (2024-02-22)
* (bluefox) Some packages were updated

### 2.5.10 (2023-12-17)
* (foxriver76) updated ws-server to increase the file limit to 500 MB

### 2.5.9 (2023-12-14)
* (joltcoke) Corrected the crash if authentication is enabled

### 2.5.8 (2023-10-11)
* (bluefox) Corrected adapter termination if the alias has no target

### 2.5.7 (2023-10-07)
* (foxriver76) upgraded socket-classes to fix vis problems

### 2.5.6 (2023-09-28)
* (bluefox) upgraded socket-classes to correct the error by unsubscribing on client disconnect

### 2.5.5 (2023-09-14)
* (foxriver76) upgraded socket-classes to fix crash cases

### 2.5.4 (2023-09-05)
* (mcm1957) added missing node16 requirement

### 2.5.3 (2023-08-01)
* (bluefox) Added the subscribing on the specific instance messages

### 2.4.0 (2023-07-07)
* (bluefox) extended the getObjects function with the possibility to read the list of IDs

### 2.3.6 (2023-03-03)
* (bluefox) Allowed deletion of fullcalendar objects

### 2.3.5 (2023-01-29)
* (bluefox) added `publishFileAll` method (for future use)

### 2.3.4 (2022-12-27)
* (bluefox) corrected connection string

### 2.3.3 (2022-12-22)
* (bluefox) used new socket-classes

### 2.3.1 (2022-11-27)
* (bluefox) Added `fileChange` event

## License
The MIT License (MIT)

Copyright (c) 2014-2024 bluefox <dogafox@gmail.com>