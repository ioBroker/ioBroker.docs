---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.socketio/README.md
title: ioBroker socket.io
hash: ktN1Y0ayr7SU7SvJzFhp9d5LF0yT8y6TQc/lpsl8Ozs=
---
![Логотип](../../../en/adapterref/iobroker.socketio/admin/socketio.png)

![Количество установок](http://iobroker.live/badges/socketio-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.socketio.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.socketio.svg)
![НПМ](https://nodei.co/npm/iobroker.socketio.png?downloads=true)

# IoBroker socket.io
Этот адаптер используется веб-приложениями и адаптерами для связи с ioBroker с использованием веб-сокетов и протокола socket.io.

**Важное примечание: начиная с версии 4.0 этого адаптера используются исключительно чистые веб-сокеты! Socket.io больше не реализуется библиотекой socket.io, а моделируется с помощью чистых WebSockets!**

Пользователи могут использовать этот адаптер для подключения своих продуктов к ioBroker через веб-сокеты.
Собственно, этот адаптер могли бы использовать echarts, vis и многие другие адаптеры для извлечения данных из ioBroker.

Если возможно, используйте [`iobroker.ws`](https://github.com/ioBroker/ioBroker.ws) вместо этого адаптера.

Вы можете найти в примере [каталог](https://github.com/ioBroker/ioBroker.socketio/tree/master/example) простое приложение, которое использует этот интерфейс для отображения некоторых данных.

Используя интерфейс socket.io, пользователь должен понимать [основы и концепция](https://github.com/ioBroker/ioBroker) системы.

Также полезно прочитать о [структура объектов](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md).

**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

## Краткое описание концепции
### Объект
Объект представляет собой описание точки данных или группы. Группа может содержать другие точки данных, в этом случае она называется каналом.
Если группа состоит из других каналов, в этом случае она называется устройством.

Объект — это метаинформация, которая описывает точку данных и может содержать: максимальное/минимальное значение, единицу измерения, имя, значение по умолчанию, тип значения, информацию для адаптера для связи (например, IP-адрес) и так далее.

### Состояние
Состояние — это фактическое значение точки данных, представленное объектом javascript:

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

Состояния меняются очень часто по сравнению с объектами. (Обычно объекты должны быть изменены один раз при создании и все)

### Подтверждение
Каждое состояние имеет атрибут "ack". Он показывает направление команды.

- Если ack=false, значит какой-то другой адаптер хочет контролировать (записывать) эту переменную, чтобы эта команда была выполнена (например, включился свет).
- Если ack=true, это означает, что устройство сообщает о новом значении. (например, свет был включен вручную или обнаружено движение)

**Пример**: у нас есть адаптер домашней автоматизации (HAA), к которому подключена одна лампа по адресу `haa.0.lamp1`.

- Лампу можно включить вручную с помощью физического выключателя или по Wi-Fi с помощью HAA.
- Если vis хочет включить лампу через Wi-Fi, он должен установить новое значение с помощью `{value: true, ack: false}`.
- Когда лампа включена, она обычно информирует HAA о новом состоянии, и значение должно быть немедленно перезаписано на `{value: true, ack: true}`.
- Если лампа выключается вручную с помощью физического переключателя, она информирует HAA о новом состоянии с помощью `{value: false, ack: true}`.

### Качество
Каждая точка данных имеет атрибут `q` — *качество*.

## Использование
Вы можете найти описание каждого поддерживаемого метода [здесь](https://github.com/ioBroker/ioBroker.socket-classes#web-methods).

Для связи рекомендуется использовать [класс сокета](https://github.com/ioBroker/socket-client).

## Настройка веб-сокетов
На некоторых клиентах веб-сокетов возникают проблемы с производительностью связи.
Иногда эта проблема возникает из-за отката связи socket.io в механизме длительного опроса.
Вы можете установить параметр *Force Web-Sockets*, чтобы принудительно использовать транспорт только через веб-сокеты.

<!-- Заполнитель для следующей версии (в начале строки):

### **В РАБОТЕ** -->

## Changelog
### 6.4.0 (2023-07-07)
(bluefox) extended the getObjects function with the possibility to read the list of IDs

### 6.3.5 (2023-03-17)
* (bluefox) Increased the max size of the message to 200MB

### 6.3.4 (2023-03-03)
* (bluefox) Allowed deletion of fullcalendar objects

### 6.3.3 (2022-12-22)
* (bluefox) used new socket-classes

### 6.3.1 (2022-11-27)
* (bluefox) Added `fileChange` event

### 6.2.0 (2022-11-08)
* (Apollon77) Prepare for future js-controller versions
* (bluefox) Function `getObjects` for web was extended by devices, channels and enums

### 6.1.10 (2022-08-24)
* (bluefox) Caught error by subscribe

### 6.1.8 (2022-07-08)
* (bluefox) Corrected getAdapterInstances method

## License

The MIT License (MIT)

Copyright (c) 2014-2023 bluefox <dogafox@gmail.com>