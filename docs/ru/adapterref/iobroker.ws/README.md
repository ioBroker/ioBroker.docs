---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ws/README.md
title: ioBroker.ws
hash: cHFDPzB1oFJRb2WVniS1yyYafFjUmhajBRgWuIskwtU=
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

Пользователи могут использовать этот адаптер для подключения своих продуктов к ioBroker через веб-сокеты. На самом деле этот адаптер, например. используется Flot, Rickshaw, Vis и мобильными устройствами для извлечения данных из ioBroker.

Вы можете найти в примере [каталог](https://github.com/ioBroker/ioBroker.ws/tree/master/example) простое приложение, которое использует этот интерфейс для отображения некоторых данных.

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

### Качественный
Каждая точка данных имеет атрибут `q` — *качество*.

## Использование
Для связи рекомендуется использовать example/conn.js.

После включения файла conn.js глобальный объект `servConn` можно использовать для установления связи с адаптером socketio.

`servConn` объект имеет методы выдолбления:

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

Файлы хранятся в БД (или аналогичном) и обычно не должны быть доступны напрямую. Имя файла состоит из пути, имени файла и расширения файла, например «/mobile.0/data/fileName.txt».

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

- `обратный вызов` - ``функция (ошибка, данные, шаг, идентификатор сеанса) {}```

### Требуется журнал
- функция (isRequire, обратный вызов)

активирует/деактивирует получение логов для этого сокета.

- `обратный вызов` - ```функция (ошибка) {}```

### Авторизация
- функция ()

читает, включена ли аутентификация и какой пользователь вошел в систему

- `обратный вызов` - ```функция (authEnabled, currentUser) {}```

Если аутентификация включена, то будет возвращен текущий вошедший в систему пользователь, если аутентификация отключена, то будет возвращен пользователь по умолчанию, работающий как.

## Настройка веб-сокетов
На некоторых клиентах веб-сокетов есть проблемы с производительностью связи. Иногда эта проблема возникает из-за отката связи socket.io в механизме длительного опроса.
Вы можете установить опцию *Force Web-Sockets*, чтобы принудительно использовать транспорт только через веб-сокеты.

<!-- Заполнитель для следующей версии (в начале строки):

### **В РАБОТЕ** -->

## Changelog
### 2.0.0 (2022-05-12)
* (bluefox) Used common sockets (could be buggy)

### 1.3.0 (2022-03-27)
* (bluefox) Added `log` socket command

### 1.2.0 (2022-02-21)
* (bluefox) Made it possible to have more than one socket from one page

### 1.1.6 (2022-02-16)
* (bluefox) Added `unlink` and `rename` to web functions

### 1.1.4 (2022-02-13)
* (bluefox) Changed name `info.connection` to `info.connected`

### 1.1.2 (2022-02-13)
* (bluefox) Updated ws client file

### 1.1.1 (2022-02-02)
* (bluefox) Updated ws client file

### 1.1.0 (2022-01-31)
* (bluefox) Distributed the compatible client file together with the backen

### 1.0.1 (2022-01-30)
* (bluefox) Initial commit

## License
The MIT License (MIT)

Copyright (c) 2014-2022 bluefox <dogafox@gmail.com>