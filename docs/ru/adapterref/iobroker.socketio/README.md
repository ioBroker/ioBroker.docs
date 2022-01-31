---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.socketio/README.md
title: ioBroker socket.io
hash: LiIYhUgFOj7RdsVerQB0EZRgEb4Wwyt5+MnOv/c2NGY=
---
![Логотип](../../../en/adapterref/iobroker.socketio/admin/socketio.png)

![Количество установок](http://iobroker.live/badges/socketio-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.socketio.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.socketio.svg)
![НПМ](https://nodei.co/npm/iobroker.socketio.png?downloads=true)

# IoBroker socket.io
Этот адаптер используется веб-приложениями и адаптерами для связи с ioBroker с использованием веб-сокетов и протокола socket.io.

**Важное примечание: начиная с версии 4.0 этого адаптера используются исключительно чистые веб-сокеты! Socket.io больше не реализуется библиотекой socket.io, а моделируется с помощью чистых WebSockets!**

Пользователи могут использовать этот адаптер для подключения своих продуктов к ioBroker через веб-сокеты. На самом деле этот адаптер, например. используется Flot, Rickshaw, Vis и мобильными устройствами для извлечения данных из ioBroker.

Вы можете найти в примере [каталог](https://github.com/ioBroker/ioBroker.socketio/tree/master/example) простое приложение, которое использует этот интерфейс для отображения некоторых данных.

Используя интерфейс socket.io, пользователь должен понимать [основы и концепция](https://github.com/ioBroker/ioBroker) системы.

Также полезно прочитать о [структура объектов](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md).

**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

## Краткое описание концепции
### Объект
Объект представляет собой описание точки данных или группы. Группа может содержать другие точки данных, в этом случае она называется каналом. Если группа состоит из других каналов, в этом случае она называется устройством.

Объект — это метаинформация, которая описывает точку данных и может содержать: максимальное/минимальное значение, единицу измерения, имя, значение по умолчанию, тип значения, информацию для адаптера для связи (например, IP-адрес) и так далее.

### Состояние
Состояние является фактическим значением точки данных и представлено объектом javascript:

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
Для связи рекомендуется использовать example/conn.js.

После включения файла conn.js глобальный объект `servConn` можно использовать для установления связи с адаптером socketio.

`servConn` объект имеет методы выдалбливания:

### В этом
- функция (connOptions, connCallbacks, objectsRequired)

`connOptions` - необязательный параметр:

```
connOptions = {
    name:          'name of the connection', // optional - default 'vis.0', used to distinguish connections in socket-io adapter.
    connLink:      'http://localhost:8084',  // optional - URL of the socket.io adapter. By default it is same URL where the WEB server is.
    socketSession: ''                        // optional - default 'nokey', and used by authentication
};
```

Вы также можете передать эти параметры, определив глобальные переменные перед вызовом «init»:

```
var socketUrl      = 'http://localhost:8084';  // is connOptions.connLink
var socketSession  = '';                       // is connOptions.socketSession
servConn.namespace = 'myapp';                  // is connOptions.name
```

`connCallbacks` — объект с обратными вызовами:

```
connCallbacks = {
    onConnChange:   function (isConnected) {}, // optional - called if connection state changed.
    onObjectChange: function (id, obj)     {}, // optional - called if content of some object is changed, new object created or object was deleted (obj = null)
    onUpdate:       function (id, state)   {}, // optional - called if state of some object is changed, new state for object is created or state was deleted (state = null)
    onError:        function (error)       {}  // optional - called if some error occurs
};
```

### SetState
- функция (pointId, значение, обратный вызов)

установить новое значение некоторой точки данных.

Например. ```servConn.setState('adapter.0.myvalue', true)``` записывает ```{val: true, ack: false}``` в *adapter.0.myvalue*.

- `pointId` - идентификатор состояния, например `adapter.0.myvalue`,
- `value` - новое значение состояния, может быть простым значением (строка, число, логическое значение) или объектом типа ```{val: newValue, ack: false, q: 0}```.

В случае, если используется простое значение, для «ack» будет установлено значение «false».

- `callback` - ```function (error) {}``` - вызывается при записи нового значения в БД (не при управлении устройством).

### Получить состояния
- функция (идентификаторы, обратный вызов)

получить состояния более чем одного состояния. Эта команда обычно вызывается после установления соединения, чтобы получить фактические состояния используемых точек данных.

- `IDs` - шаблон или массив с идентификаторами. Можно опустить, чтобы получить все состояния. Шаблоны могут иметь подстановочные знаки, например: '*.STATE', 'haa.0.*'
- `callback` - ```функция (ошибка, состояния) {}``` - *states* является объектом типа ```{'id1': 'state1', 'id2': 'state2', ...} ```. *stateX* — это объекты со структурой, описанной [выше](#state).

### HttpПолучить
- функция (url, обратный вызов)

вызывает этот URL-адрес с ПК, на котором работает адаптер socketio.

- `url` - адрес для звонка.
- `callback` - ```function (data) {}``` - результат запроса (тело html).

### ЛогОррор
- функция (текст ошибки)

записывает сообщение об ошибке в журнал контроллера.

### Получить конфигурацию
- функция (обратный вызов)

считывает конфигурацию контроллера, такую как язык, единицы измерения температуры, разделитель точек или запятых в числах с плавающей запятой, формат даты.

- `callback` - ```function (err, config) {}``` - config выглядит так:

```
{
  "_id": "system.config",
  "type": "config",
  "common": {
    "name":             "System configuration",
    "language":         "de",
    "tempUnit":         "°C",
    "currency":         "€",
    "dateFormat":       "DD.MM.YYYY",
    "isFloatComma":     true,
    "licenseConfirmed": true,
    "activeRepo":       "fast-online",
    "diag":             "extended",
    "defaultHistory":   ""
  }
}
```

### ПолучитьОбъект
- функция (id, обратный вызов)

прочитать конкретный объект из БД. С помощью этой функции можно было прочитать метаинформацию некоторого объекта.

- `id` - id штата, например "haa.0.light1",
- `callback` - ```функция (ошибка, объект)``` - объект выглядит так:

```
{
  "_id": "haa.0.light1",
  "type": "state",
  "common": {
    "def": false,
    "type": "boolean",
    "read": false,
    "write": true,
    "role": "switch",
    "name": "light in floor"
  },
  "native": {
    "CONTROL": "BUTTON.LONG",
    "DEFAULT": false,
    "FLAGS": 1,
    "ID": "PRESS_LONG",
    "MAX": true,
    "MIN": false,
    "OPERATIONS": 6,
    "TAB_ORDER": 1,
    "TYPE": "ACTION",
    "UNIT": ""
  },
  "enums": ['enum.rooms.floor'],
  "acl": {
    "object": 1638,
    "state": 1638
  }
}
```

### ПолучитьОбъекты
- функция (обратный вызов)

читать все объекты из БД.

- `callback` - ```функция (ошибка, объекты)``` - объекты выглядят так: ```{'id1': 'object1', 'id2': 'object2', ...}```

### ReadDir
- функция (dirName, обратный вызов)

читает файлы и каталоги в указанном каталоге.

Файлы хранятся в БД (или аналогичном) и, как правило, не должны быть доступны напрямую. Имя файла состоит из пути, имени файла и расширения файла, например «/mobile.0/data/fileName.txt».

- dirName - имя каталога вида */mobile.0/data*
- обратный вызов - ```функция (ошибка, список)``` - список выглядит так:

```
[
    {
        file:       'file1.txt',
        stats:      {
                      mode: 33188,
                      size: 527,
                      atime: Mon, 10 Oct 2011 23:24:11 GMT,
                      mtime: Mon, 10 Oct 2011 23:24:11 GMT,
                      ctime: Mon, 10 Oct 2011 23:24:11 GMT,
                      birthtime: Mon, 10 Oct 2011 23:24:11 GMT
                    },
        isDir:      false,
        modifiedAt: timeInMs, // new Date().getTime()
        createdAt:  timeInMs, // new Date().getTime()
    },
    {
        file:       'main',
        stats:      {
                      mode: 33188,
                      atime: Mon, 10 Oct 2011 23:24:11 GMT,
                      mtime: Mon, 10 Oct 2011 23:24:11 GMT,
                      ctime: Mon, 10 Oct 2011 23:24:11 GMT,
                      birthtime: Mon, 10 Oct 2011 23:24:11 GMT
                    },
        isDir:      true,
        modifiedAt: timeInMs, // new Date().getTime()
        createdAt:  timeInMs, // new Date().getTime()
    },
    ...
]
```

### Мкдир
- функция (dirName, обратный вызов)

- `обратный вызов` - ```функция (ошибка) {}```

### Отвязать
- функция (имя, обратный вызов)

удаляет файл или каталог. Каталог должен быть пустым, чтобы его можно было удалить.

- dirName - имя каталога или файла вида */mobile.0/data*.
- `обратный вызов` - ```функция (ошибка) {}```

### ЧтениеФайл
- функция (имя файла, обратный вызов)

- `обратный вызов` - ``функция (ошибка, fileData, mimeType)```

### ReadFile64
- функция (имя файла, обратный вызов)

- `обратный вызов` - ``функция (ошибка, данные)``` - данные ```{mime: mimeType, data: base64data}```

### Запись в файл
- функция (имя файла, данные, режим, обратный вызов)

- `обратный вызов` - ```функция (ошибка) {}```

### Запись в файл64
- функция (имя файла, данные, режим, обратный вызов)

- `обратный вызов` - ```функция (ошибка) {}```

### Переименуйте файл
- функция (oldName, newName, обратный вызов)

- `обратный вызов` - ```функция (ошибка) {}```

### Получить историю
- функция (экземпляр, опции, обратный вызов)

- `обратный вызов` - ``функция (ошибка, данные, шаг, sessionId) {}```

### Требуется журнал
- функция (isRequire, обратный вызов)

активирует/деактивирует получение логов для этого сокета.

- `обратный вызов` - ```функция (ошибка) {}```

### Авторизация
- функция ()

читает, включена ли аутентификация и какой пользователь вошел в систему

- `обратный вызов` - ``функция (authEnabled, currentUser) {}```

Если аутентификация включена, то будет возвращен текущий вошедший в систему пользователь, если аутентификация отключена, то будет возвращен пользователь по умолчанию, работающий как.

## Настройка веб-сокетов
На некоторых клиентах веб-сокетов есть проблемы с производительностью связи. Иногда эта проблема возникает из-за отката связи socket.io в механизме длительного опроса.
Вы можете установить опцию *Force Web-Sockets*, чтобы принудительно использовать транспорт только через веб-сокеты.

<!-- Заполнитель для следующей версии (в начале строки):

### __РАБОТА ВЫПОЛНЯЕТСЯ__ -->

## Changelog
### 4.0.3 (2022-01-30)
* (bluefox) Removed the deprecated "passport.socketio" packet

### 4.0.2 (2022-01-30)
* (bluefox) Removed "force web sockets" option

### 4.0.1 (2022-01-29)
* (bluefox) Fixed authentication

### 4.0.0 (2022-01-29)
* (bluefox) Remove socket-io and use only web sockets

### 3.1.5 (2021-10-22)
* (foxriver76) make error logging on failed authentication more specific
* (foxriver76) "request" was replaced by "axios"

### 3.1.4 (2021-01-13)
* (Apollon77) Define instanceObject "connected" to prevent warning with js-controller 3.2

### 3.1.3 (2021-01-12)
* (Apollon77) fix socketio dependency

### 3.1.2 (2021-01-09)
* (bluefox) Support of new Let's Encrypt (only with js-controller 3.2.x)

### 3.0.13 (2020-08-21)
* (bluefox) Added getAdapterName method

### 3.0.12 (2020-07-27)
* (Apollon77) socket.io pingTimeout and pinInterval increased to prevent too fast reconnections and bigger visualizations

### 3.0.11 (2020-07-23)
* (Apollon77) make sure web adapter gets restarted on socketio adapter upgrade

### 3.0.10 (2020-07-16)
* (Apollon77) Error caught when trying to write an empty base64 value into a file (Sentry )

### 3.0.9 (2020-06-11)
* (Apollon77) optimize error handling on webserver initialization again

### 3.0.8 (2020-06-10)
* (Apollon77) Make sure adapter does not crash if getHttp is called with an invalid URL (Sentry IOBROKER-WEB-R)

### 3.0.7 (2020-05-04)
* (Apollon77) webserver initialization optimized again to prevent errors with invalid certificates

### 3.0.6 (2020-04-30)
* (bluefox) errors on webserver initialization are handled properly

### 3.0.5 (2020-04-23)
* (bluefox) Caught the web server errors

### 3.0.4 (2020-04-23)
* fix crash reason when server closes (Sentry IOBROKER-SOCKETIO-2/3/4/5)

### 3.0.3 (2020-04-16)
* (Apollon77) Remove usage of deprecated object methods; prevent js-controller 3.0 warnings
* (Apollon77) Add Sentry error reporting

### 3.0.2 (2020-03-07)
* (bluefox) Unload of adapter was corrected

### 3.0.1 (2020-02-23)
* (Apollon77) Workaround for socket.io bug #3555 added to make sure always the correct client files are delivered

### 3.0.0 (2020-01-15)
* (Apollon77) upgrade all dependencies, especially socketio to current version! This might break ipad 1/2 devices

### 2.1.2 (2019-09-28)
* (Apollon77) optimize shutdown for compact mode

### 2.1.1 (2018-06-09)
* (bluefox) Used socket.io Version 1.7.2
* (bluefox) Fix authentication problem

### 2.1.0 (2018-05-04)
* (bluefox) Used socket.io Version 1.7.4

### 2.0.1 (2018-02-28)
* (bluefox) Dropped support of old browsers. Please do not update if you have iPad 1 and so on.

### 1.9.0 (2018-01-14)
* (bluefox) Ready for admin3

### 1.8.7 (2017-11-29)
* (bluefox) Tune cloud work

### 1.8.5 (2017-10-22)
* (bluefox) Escape [] in subscriptions

### 1.8.4 (2017-10-16)
* (bluefox) Check callback validity

### 1.8.3 (2017-10-09)
* (bluefox) Allow authentication via URL

### 1.8.2 (2017-09-20)
* (bluefox) Fix cmdExec command

### 1.8.1 (2017-09-13)
* (bluefox) Fix user access rights for sendToHost

### 1.8.0 (2017-08-06)
* (bluefox) Support the access to admin via iobroker.pro

### 1.7.5 (2017-05-24)
* (bluefox) fix error if subscribe is empty

### 1.7.4 (2017-01-04)
* (bluefox) fix error with authentication

### 1.7.3 (2016-11-13)
* (bluefox) support of socket extensions

### 1.7.2 (2016-11-06)
* (bluefox) Fix unsubscribe of states

### 1.7.1 (2016-10-11)
* (bluefox) Fix authentication for app

### 1.7.0 (2016-08-30)
* (bluefox) compatible only with new admin

### 1.6.1 (2016-08-29)
* (bluefox) fix error by checking user name

### 1.6.0 (2016-08-27)
* (bluefox) support of letsencrypt certificates

### 1.5.4 (2016-08-26)
* (bluefox) fix error in socket.js

### 1.5.3 (2016-08-14)
* (bluefox) support of force only web sockets transport

### 1.5.2 (2016-07-06)
* (bluefox) support of chained certificates

### 1.5.1 (2016-06-28)
* (bluefox) add sendToHost command

### 1.5.0 (2016-06-17)
* (bluefox) preparations for cloud

### 1.4.1 (2016-05-13)
* (bluefox) change getHistory function

### 1.4.0 (2016-04-24)
* (bluefox) encode json files

### 1.3.0 (2016-03-17)
* (bluefox) rename files

### 1.2.3 (2015-12-24)
* (bluefox) support of authentication over URL

### 1.2.2 (2015-12-09)
* (bluefox) remove unused parameter "cache"

### 1.2.0 (2015-11-15)
* (bluefox) add version compatibility check

### 1.1.0 (2015-11-14)
* (Smiling_Jack) add getHistory

### 1.0.0 (2015-09-30)
* (bluefox) stop adapter before update

### 0.4.5 (2015-08-11)
* (bluefox) update packets

### 0.4.4 (2015-07-07)
* (bluefox) extend writeFile with mode

### 0.4.3 (2015-07-06)
* (bluefox) add chmodFile

### 0.4.1 (2015-06-13)
* (bluefox) add default ttl
* (bluefox) enable run from "web" and add permissions check

### 0.4.0 (2015-06-13)
* (bluefox) add permissions support

### 0.3.1 (2015-05-19)
* (bluefox) support of subscribe on objectChanged

### 0.3.0 (2015-04-23)
* (bluefox) enable security

### 0.2.3 (2015-03-07)
* (bluefox) extend getStates to support list of objects

### 0.2.2 (2015-02-14)
* (bluefox) fix error with objectChanged event

### 0.2.0 (2015-01-16)
* (bluefox) make socket usable as module

### 0.1.6 (2015-01-08)
* (bluefox) support of subscribe for different sockets. Support of socket names. Diagnostic info in socket.0.connected

### 0.1.5 (2015-01-07)
* (bluefox) fix error with update of states and objects

### 0.1.4 (2015-01-06)
* (bluefox) support of file manager in vis

### 0.1.3 (2015-01-02)
* (bluefox) enable adapter by default

### 0.1.2 (2015-01-02)
* (bluefox) add "request" module to package.json

### 0.1.1 (2015-01-02)
* (bluefox) enable npm install

### 0.1.0 (2014-12-28)
* (bluefox) support of read/write files

### 0.0.5 (2014-12-19)
* (bluefox) support of setObjects command

### 0.0.4 (2014-12-10)
* (bluefox) support of https sockets

### 0.0.3 (2014-12-05)
* (bluefox) support of https sockets

### 0.0.2 (2014-11-24)
* (bluefox) fix error by start

### 0.0.1 (2014-10-10)
* (bluefox) authentication works

## License

The MIT License (MIT)

Copyright (c) 2014-2022 bluefox <dogafox@gmail.com>