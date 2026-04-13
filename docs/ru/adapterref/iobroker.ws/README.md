---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ws/README.md
title: ioBroker.ws
hash: DzmdQGifgATBcDe+ZOI3dLcRh0qFciQw0QI+pX2msPM=
---
![Логотип](../../../en/adapterref/iobroker.ws/admin/ws.png)

![Количество установок](http://iobroker.live/badges/ws-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.ws.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.ws.svg)
![НПМ](https://nodei.co/npm/iobroker.ws.png?downloads=true)

# IoBroker.ws
Этот адаптер используется веб-приложениями и адаптерами для связи с ioBroker с помощью веб-сокетов.

Он практически идентичен `ioBroker.socketio`, но не использует библиотеку socket.io, а только имитирует её.

**Важное примечание: начиная с версии 4.0 этого адаптера, используются исключительно чистые WebSocket! Socket.io больше не реализован в библиотеке socket.io, а имитируется с помощью чистых WebSocket!**

Пользователи могут использовать этот адаптер для подключения своих продуктов к ioBroker через веб-сокеты.
Фактически, этот адаптер может использоваться echarts, vis и многими другими адаптерами для извлечения данных из ioBroker.

В примере [каталог](https://github.com/ioBroker/ioBroker.ws/tree/master/example) вы найдете простое приложение, использующее этот интерфейс для отображения некоторых данных.

При использовании интерфейса socket.io пользователь должен понимать [основы и концепции](https://github.com/ioBroker/ioBroker) системы.

Полезно также ознакомиться с разделом [структура объектов](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md).

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Для получения более подробной информации и сведений о том, как отключить отправку сообщений об ошибках, см. [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отправка сообщений Sentry используется начиная с js-controller 3.0.

## Краткое описание концепции
### Объект
Объект — это описание точки данных или группы данных. Группа может содержать другие точки данных, в этом случае она называется каналом. Если группа состоит из других каналов, в этом случае она называется устройством.

Объект представляет собой метаинформацию, описывающую точку данных и ее содержимое: максимальное/минимальное значение, единица измерения, имя, значение по умолчанию, тип значения, информация для адаптера связи (например, IP-адрес) и так далее.

### Состояние
State — это фактическое значение точки данных, представленное объектом JavaScript:

```json
{
    "val": VALUE,
    "ack": ACKNOWLEDGED,
    "ts": TIMESTAMP, // could be converted into time with "new Date(state.ts)" (In older version of js-controller - "new Date(state.ts * 1000)")
    "lc": TIMESTAMP of last change,
    "from": ADAPTER_NAME,
    "q": QUALITY
}
```

Состояния изменяются очень часто по сравнению с объектами. (Обычно объекты изменяются только один раз при создании, и на этом всё.)

### Благодарность
Каждый штат имеет атрибут `ack`. Он показывает направление команды.

- Если ack=false, это означает, что какой-то другой адаптер хочет управлять (записывать) эту переменную, чтобы команда была выполнена (например, свет будет включен).
- Если ack=true, это означает, что устройство сообщает о новом значении (например, свет был включен вручную или было обнаружено движение).

**Пример**: у нас есть адаптер домашней автоматизации (HAA), к которому подключена одна лампа по адресу `haa.0.lamp1`.

- Лампу можно включить вручную с помощью физического выключателя или через Wi-Fi с помощью HAA.
- Если vis хочет включить лампу через Wi-Fi, он должен установить новое значение с помощью `{value: true, ack: false}`.
- Когда лампа включается, она обычно сообщает HAA о новом состоянии, и значение должно быть немедленно перезаписано значением `{value: true, ack: true}`.
- Если лампа выключается вручную с помощью физического выключателя, она сообщает HAA о новом состоянии с помощью `{value: false, ack: true}`.

### Качество
Каждая точка данных имеет атрибут `q` - *качество*.

## Использование
Описание каждого поддерживаемого метода можно найти в разделе [здесь](https://github.com/ioBroker/ioBroker.socket-classes#web-methods).

Для связи рекомендуется использовать [класс сокета](https://github.com/ioBroker/socket-client).

<!-- Заполнитель для следующей версии (в начале строки):

### **РАБОТА В ПРОЦЕССЕ** -->

## Changelog
### 4.1.0 (2026-04-13)
* (@GermanBluefox) Updated packages
* (@GermanBluefox) Fixed possible bugs

### 4.0.0 (2026-02-17)
* (@GermanBluefox) Updated packages
* (@GermanBluefox) Removed support for node.js 18

### 3.0.19 (2025-03-04)
* (@GermanBluefox) Removed the frequent debug output

### 3.0.18 (2025-03-03)
* (@GermanBluefox) Corrected the problem with the user rights

### 3.0.17 (2025-02-28)
* (@GermanBluefox) Added OAuth2 authentication

### 3.0.5 (2025-02-11)
* (@GermanBluefox) Corrected address detection
* (@GermanBluefox) Corrected language settings

### 3.0.4 (2025-02-11)
* (@GermanBluefox) Adapter was rewritten in TypeScript

### 2.7.0 (2024-11-17)
* (@GermanBluefox) Update ws-server library

### 2.6.2 (2024-06-26)
* (@GermanBluefox) Corrected call of getObjectView with null parameter

### 2.6.1 (2024-04-22)
* (foxriver76) fixed require of webserver

### 2.6.0 (2024-04-21)
* (foxriver76) use `@iobroker/webserver`

### 2.5.11 (2024-02-22)
* (@GermanBluefox) Some packages were updated

### 2.5.10 (2023-12-17)
* (foxriver76) updated ws-server to increase the file limit to 500 MB

### 2.5.9 (2023-12-14)
* (joltcoke) Corrected the crash if authentication is enabled

### 2.5.8 (2023-10-11)
* (@GermanBluefox) Corrected adapter termination if the alias has no target

### 2.5.7 (2023-10-07)
* (foxriver76) upgraded socket-classes to fix vis problems

### 2.5.6 (2023-09-28)
* (@GermanBluefox) upgraded socket-classes to correct the error by unsubscribing on client disconnect

### 2.5.5 (2023-09-14)
* (foxriver76) upgraded socket-classes to fix crash cases

### 2.5.4 (2023-09-05)
* (mcm1957) added missing node16 requirement

### 2.5.3 (2023-08-01)
* (@GermanBluefox) Added the subscribing on the specific instance messages

### 2.4.0 (2023-07-07)
* (@GermanBluefox) extended the getObjects function with the possibility to read the list of IDs

### 2.3.6 (2023-03-03)
* (@GermanBluefox) Allowed deletion of fullcalendar objects

### 2.3.5 (2023-01-29)
* (@GermanBluefox) added `publishFileAll` method (for future use)

### 2.3.4 (2022-12-27)
* (@GermanBluefox) corrected connection string

### 2.3.3 (2022-12-22)
* (@GermanBluefox) used new socket-classes

### 2.3.1 (2022-11-27)
* (@GermanBluefox) Added `fileChange` event

## License
The MIT License (MIT)

Copyright (c) 2014-2026 @GermanBluefox <dogafox@gmail.com>