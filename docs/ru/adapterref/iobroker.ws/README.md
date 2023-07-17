---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ws/README.md
title: ioBroker.ws
hash: 9JkQkAkEUwCAcPs2Nmazq+dTiQcPBBp+DG/V6J0DVqk=
---
![Логотип](../../../en/adapterref/iobroker.ws/admin/ws.png)

![Количество установок](http://iobroker.live/badges/ws-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.ws.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.ws.svg)
![НПМ](https://nodei.co/npm/iobroker.ws.png?downloads=true)

# IoBroker.ws
Этот адаптер используется веб-приложениями и адаптерами для связи с ioBroker с помощью веб-сокетов.

Он почти такой же, как `ioBroker.socketio`, но не использует библиотеку socket.io, а только имитирует ее.

**Важное примечание: начиная с версии 4.0 этого адаптера используются исключительно чистые веб-сокеты! Socket.io больше не реализуется библиотекой socket.io, а моделируется с помощью чистых WebSockets!**

Пользователи могут использовать этот адаптер для подключения своих продуктов к ioBroker через веб-сокеты.
Собственно, этот адаптер могли бы использовать echarts, vis и многие другие адаптеры для извлечения данных из ioBroker.

Вы можете найти в примере [каталог](https://github.com/ioBroker/ioBroker.ws/tree/master/example) простое приложение, которое использует этот интерфейс для отображения некоторых данных.

Используя интерфейс socket.io, пользователь должен понимать [основы и концепция](https://github.com/ioBroker/ioBroker) системы.

Также полезно прочитать о [структура объектов](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md).

**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

## Краткое описание концепции
### Объект
Объект представляет собой описание точки данных или группы. Группа может содержать другие точки данных, в этом случае она называется каналом. Если группа состоит из других каналов, в этом случае она называется устройством.

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

- Если ack=false, это означает, что какой-то другой адаптер хочет контролировать (записывать) эту переменную, чтобы эта команда была выполнена (например, включится свет).
- Если ack=true, это означает, что устройство сообщает о новом значении. (например, свет был включен вручную или обнаружено движение)

**Пример**: у нас есть адаптер домашней автоматизации (HAA), к которому подключена одна лампа по адресу `haa.0.lamp1`.

- Лампу можно включить вручную с помощью физического выключателя или по Wi-Fi с помощью HAA.
- Если vis хочет включить лампу через Wi-Fi, он должен установить новое значение с помощью ```{value: true, ack: false}```.
- Когда лампа включена, она обычно информирует HAA о новом состоянии, и значение должно быть немедленно перезаписано с помощью ```{value: true, ack: true}```.
- Если лампа выключается вручную с помощью физического переключателя, она информирует HAA о новом состоянии с помощью ```{value: false, ack: true}```.

### Качество
Каждая точка данных имеет атрибут `q` — *качество*.

## Использование
Вы можете найти описание каждого поддерживаемого метода [здесь](https://github.com/ioBroker/ioBroker.socket-classes#web-methods).

Для связи рекомендуется использовать [класс сокета](https://github.com/ioBroker/socket-client).

<!-- Заполнитель для следующей версии (в начале строки):

### **В РАБОТЕ** -->

## Changelog
### 2.4.0 (2023-07-07)
(bluefox) extended the getObjects function with the possibility to read the list of IDs

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

Copyright (c) 2014-2023 bluefox <dogafox@gmail.com>