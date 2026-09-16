---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ws/README.md
title: ioBroker.ws
hash: 7Ye2IjPmKH3F2gIsVRYQWp3q/kfDDBhZL9jCwB0Ntvg=
---
![Количество установок](http://iobroker.live/badges/ws-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.ws.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.ws.svg)
![НПМ](https://nodei.co/npm/iobroker.ws.png?downloads=true)

<img src="admin/ws.svg" width="100" height="100" />

# ioBroker.ws

Этот адаптер используется веб-приложениями и адаптерами для связи с ioBroker с помощью веб-сокетов.

Это почти то же самое, что и...`ioBroker.socketio` , но не использует библиотеку socket.io, а только имитирует её.

**Важное примечание: начиная с версии 4.0 этого адаптера, используются исключительно чистые WebSocket! Socket.io больше не реализован в библиотеке socket.io, а имитируется с помощью чистых WebSocket!**

Пользователи могут использовать этот адаптер для подключения своих продуктов к ioBroker через веб-сокеты. Фактически, этот адаптер может использоваться echarts, vis и многими другими адаптерами для извлечения данных из ioBroker.

В [каталоге](https://github.com/ioBroker/ioBroker.ws/tree/master/example) с примерами вы найдете простое приложение, которое использует этот интерфейс для отображения некоторых данных.

Пользователю, использующему интерфейс socket.io, необходимо понимать [основы и концепцию](https://github.com/ioBroker/ioBroker) системы.

Полезно также почитать о [структуре объектов](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md) .

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также сведения о том, как отключить отправку сообщений об ошибках, см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

## Краткое описание концепции

### Объект

Объект — это описание точки данных или группы данных. Группа может содержать другие точки данных, в этом случае она называется каналом. Если группа состоит из других каналов, в этом случае она называется устройством.

Объект представляет собой метаинформацию, описывающую точку данных и ее содержимое: максимальное/минимальное значение, единица измерения, имя, значение по умолчанию, тип значения, информация об адаптере для связи (например, IP-адрес) и так далее.

### Состояние

State — это фактическое значение точки данных, представленное объектом JavaScript:

```js
const state = {
    "val": VALUE, 
    "ack": ACKNOWLEDGED, 
    "ts": TIMESTAMP, // could be converted into time with "new Date(state.ts)" (In older version of js-controller - "new Date(state.ts * 1000)")
    "lc": TIMESTAMP_of_last_change, 
    "from": ADAPTER_NAME, 
    "q": QUALITY
}
```

Состояния изменяются очень часто по сравнению с объектами. (Обычно объекты изменяются только один раз при создании, и на этом всё.)

### Благодарность

Каждый штат обладает этим атрибутом.`ack` Это показывает направление команды.

- Если ack=false, это означает, что какой-то другой адаптер хочет управлять (записывать) эту переменную, чтобы команда была выполнена (например, включился свет).
- Если ack=true, это означает, что устройство сообщает о новом значении (например, свет был включен вручную или было обнаружено движение).

**Пример** : у нас есть адаптер домашней автоматизации (HAA), к которому подключена одна лампа по указанному адресу.`haa.0.lamp1` .

- Лампу можно включить вручную с помощью физического выключателя или через Wi-Fi с помощью HAA.
- Если vis хочет включить лампу через Wi-Fi, он должен установить новое значение с помощью`{ value: true, ack: false }` .
- Когда лампа включается, она обычно сообщает HAA о новом состоянии, и это значение должно быть немедленно перезаписано.`{ value: true, ack: true }` .
- Если лампа выключается вручную с помощью физического выключателя, это сообщает HAA о новом состоянии.`{ value: false, ack: true }` .

### Качество

Каждая точка данных имеет атрибут.`q` - _качество_ .

## Использование

Описание всех поддерживаемых методов можно найти [здесь](https://github.com/ioBroker/ioBroker.socket-classes#web-methods) .

Рекомендуется использовать [класс сокета](https://github.com/ioBroker/socket-client) для обмена данными.

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### 5.0.2 (2026-08-31)
* (@GermanBluefox) Updated packages

### 5.0.1 (2026-08-28)
* (@GermanBluefox) Updated packages

### 5.0.0 (2026-06-20)
* (@GermanBluefox) Updated packages
* (@GermanBluefox) Migrated to TypeScript 6.0
* (@GermanBluefox) Used a common server library for WebSockets

### 4.1.0 (2026-04-13)
* (@GermanBluefox) Updated packages
* (@GermanBluefox) Fixed possible bugs

### 4.0.0 (2026-02-17)
* (@GermanBluefox) Updated packages
* (@GermanBluefox) Removed support for node.js 18