---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.simple-api/README.md
title: Simple-api
hash: txduiwaVbJHHCbM4ZG9+h/lYVF/17V9Qo6bz2ml5m9E=
---
![Логотип](../../../en/adapterref/iobroker.simple-api/admin/simple-api.png)

![Количество установок](http://iobroker.live/badges/simple-api-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.simple-api.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.simple-api.svg)

# Simple-api
![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.simple-api/workflows/Test%20and%20Release/badge.svg) [![Статус перевода] (https://weblate.iobroker.net/widgets/adapters/-/simple-api/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

Это интерфейс RESTFul для чтения объектов и состояний из ioBroker и для записи / управления состояниями через HTTP-запросы Get / Post.

** Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода. ** Дополнительные сведения и информацию о том, как отключить отчет об ошибках, см. В [Документация Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Сторожевые отчеты используются начиная с js-controller 3.0.

## Использование
Позвоните в браузере `http://ipaddress:8087/help`, чтобы получить помощь по API. Результат:

```
{
  "getPlainValue": "http://ipaddress:8087/getPlainValue/stateID",
  "getPlainValue": "http://ipaddress:8087/getPlainValue/stateID?json",
  "get": "http://ipaddress:8087/get/stateID/?prettyPrint",
  "getBulk": "http://ipaddress:8087/getBulk/stateID1,stateID2/?prettyPrint",
  "set": "http://ipaddress:8087/set/stateID?value=1&prettyPrint",
  "toggle": "http://ipaddress:8087/toggle/stateID&prettyPrint",
  "setBulk": "http://ipaddress:8087/setBulk?stateID1=0.7&stateID2=0&prettyPrint",
  "objects": "http://ipaddress:8087/objects?pattern=system.adapter.admin.0*&prettyPrint",
  "objects": "http://ipaddress:8087/objects?pattern=system.adapter.admin.0*&type=adapter&prettyPrint",
  "states": "http://ipaddress:8087/states?pattern=system.adapter.admin.0*&prettyPrint"
  "search": "http://ipaddress:8087/search?pattern=system.adapter.admin.0*&prettyPrint",
  "query": "http://ipaddress:8087/query/stateID1,stateID2/?prettyPrint"
  "query": "http://ipaddress:8087/query/stateID1,stateID2/?noHistory=true&prettyPrint"
  "query": "http://ipaddress:8087/query/stateID1,stateID2/?dateFrom=2019-06-06T12:00:00.000Z&d&prettyPrint"
  "query": "http://ipaddress:8087/query/stateID1,stateID2/?dateFrom=2019-06-06T12:00:00.000Z&dateTo=2019-06-06T12:00:00.000Z&prettyPrint"
}
```

### GetPlainValue
Звоните, например:

`http://ipaddress:8087/getPlainValue/system.adapter.admin.0.alive`

Результат:

`true`

Кроме того, вы можете использовать ключ запроса `json` для принудительного анализа сохраненного значения:

`http://ipaddress:8087/getPlainValue/javascript.0.value?json`

Результат:

`{"a":1}`

И без флага `json` результат будет

`"{\"a\": 1}"`

Также можно использовать еще один полезный флаг, `noStringify`:

`http://ipaddress:8087/getPlainValue/javascript.0.stringValue?noStringify`

Результат:

`VALUETEXT`

И без флага `noStringify` результат будет

`"VALUETEXT"`

### Получать
Звоните, например: `http://ipaddress:8087/get/system.adapter.admin.0.alive`

Результат:

```
{"val":true,"ack":true,"ts":1442432193,"from":"system.adapter.admin.0","lc":1442431190,"expire":23437,"_id":"system.adapter.admin.0.alive","type":"state","common":{"name":"admin.0.alive","type":"boolean","role":"indicator.state"},"native":{}}
```

или позвоните, например:

```
http://ipaddress:8087/get/system.adapter.admin.0.alive?prettyPrint
```

Результат:

```
{
  "val": true,
  "ack": true,
  "ts": 1442432238,
  "from": "system.adapter.admin.0",
  "lc": 1442431190,
  "expire": 28494,
  "_id": "system.adapter.admin.0.alive",
  "type": "state",
  "common": {
    "name": "admin.0.alive",
    "type": "boolean",
    "role": "indicator.state"
  },
  "native": {}
}
```

### GetBulk
Получите много состояний одним запросом, возвращенным как массив объектов в порядке списка в запросе и id / val / ts как подобъект

### Установленный
Звоните, например:

```
http://ipaddress:8087/set/javascript.0.test?value=1
```

Результат:

```
{"id":"javascript.0.test","value":1}
```

или позвоните, например:

```
http://ipaddress:8087/set/javascript.0.test?value=1&prettyPrint
```

Результат:

```
{
  "id": "javascript.0.test",
  "value": 1
}
```

Конечно, точка данных `javascript.0.test` должна существовать.

Дополнительно может быть определен тип значения:

```
http://ipaddress:8087/set/javascript.0.test?value=1&prettyPrint&type=string
```

и флаг ack тоже может быть определен:

```
http://ipaddress:8087/set/javascript.0.test?value=1&prettyPrint&ack=true
```

### Переключать
Переключает значение:

- логическое: true => false, false => true
- число без ограничений: x => 100-x
- число с ограничениями: x => max - (x - min)

### SetBulk
Установите множество состояний одним запросом. Этот запрос также поддерживает метод POST, поскольку данные POST должны быть в теле, а не в URL.

### SetValueFromBody
Позволяет установить значение данного состояния, задаваемое содержимым тела POST.

### Объекты
### Состояния
### Поиск
Если в конфигурации установлен источник данных (История, SQL), то будут перечислены только точки данных, известные источнику данных.
Если опция «Список всех точек данных» активирована или источник данных не указан, будут перечислены все точки данных.
Эта команда необходима для подключаемого модуля Grafana JSON / SimpleJSON.

### Запрос
Если был указан источник данных (History, SQL), данные из указанных точек данных считываются за указанный период, в противном случае считывается только текущее значение.
Эта команда необходима для подключаемого модуля Grafana JSON / SimpleJSON.

### Помощь
Возвращает вывод [это](#usage)

## Установить
```node iobroker.js add simple-api```

## Использование
Предположим, у нас нет безопасности, и сервер работает на порте по умолчанию 8087.

Для всех запросов можно указать имя или идентификатор состояния.

Для каждого запроса, возвращающего JSON, вы можете установить параметр `prettyPrint`, чтобы получить результат в удобочитаемой форме.

Если аутентификация включена, два других поля являются обязательными: `?user=admin&pass=iobroker`

### GetPlainValue
Считать значение состояния как текст. Вы можете указать несколько идентификаторов, разделенных точкой с запятой

```http://ip:8087/getPlainValue/admin.0.memHeapTotal```

```
  31.19
```

```http://ip:8087/getPlainValue/admin.0.memHeapTotal, admin.0.memHeapUsed```

```
  31.19
  17.52
```

### Получать
Прочитать состояние и данные объекта состояния как json. Вы можете указать несколько идентификаторов, разделенных точкой с запятой.
Если запрошено более одного идентификатора, будет возвращен массив JSON.

```http://localhost:8087/get/admin.0.memHeapTotal/?prettyPrint```

```
  {
    "val": 31.19,
    "ack": true,
    "ts": 1423154619,
    "from": "system.adapter.admin.0",
    "lc": 1423153989,
    "_id": "system.adapter.admin.0.memHeapTotal",
    "type": "state",
    "common": {
      "name": "admin.0.memHeapTotal",
      "type": "number",
      "role": "indicator.state",
      "unit": "MB",
      "history": {
        "enabled": true,
        "changesOnly": true,
        "minLength": 480,
        "maxLength": 960,
        "retention": 604800,
        "debounce": 10000
      }
    },
    "native": {}
  }
```

```http://ip:8087/get/admin.0.memHeapTotal,admin.0.memHeapUsed/?prettyPrint```

```
  [
    {
      "val": 31.19,
      "ack": true,
      "ts": 1423154544,
      "from": "system.adapter.admin.0",
      "lc": 1423153989,
      "_id": "system.adapter.admin.0.memHeapTotal",
      "type": "state",
      "common": {
        "name": "admin.0.memHeapTotal",
        "type": "number",
        "role": "indicator.state",
        "unit": "MB",
        "history": {
          "enabled": true,
          "changesOnly": true,
          "minLength": 480,
          "maxLength": 960,
          "retention": 604800,
          "debounce": 10000
        }
      },
      "native": {}
    },
    {
      "val": 16.25,
      "ack": true,
      "ts": 1423154544,
      "from": "system.adapter.admin.0",
      "lc": 1423154544,
      "_id": "system.adapter.admin.0.memHeapUsed",
      "type": "state",
      "common": {
        "name": "admin.0.memHeapUsed",
        "type": "number",
        "role": "indicator.state",
        "unit": "MB",
        "history": {
          "enabled": true,
          "changesOnly": true,
          "minLength": 480,
          "maxLength": 960,
          "retention": 604800,
          "debounce": 10000
        }
      },
      "native": {}
    }
  ]
```

### GetBulk
Прочтите состояния других идентификаторов с отметкой времени. Вы можете указать несколько идентификаторов, разделенных точкой с запятой.
Массив JSON будет возвращен всегда.

```http://ip:8087/getBulk/admin.0.memHeapTotal,admin.0.memHeapUsed/?prettyPrint```

```
  {
      "admin.0.memHeapTotal": {
          "val": 31.19,
          "ts": 1423154754
      },
      "admin.0.memHeapUsed": {
          "val": 15.6,
          "ts": 1423154754
      }
  }
```

### Установленный
Напишите состояния с указанными идентификаторами. Вы можете указать опцию *wait* в миллисекундах для ожидания ответа от драйвера.

```http://ip:8087/set/hm-rpc.0.IEQ12345.LEVEL?value=1&prettyPrint```

```{
       "id": "hm-rpc.0.IEQ12345.LEVEL",
       "value": 1
     }
```

```http://ip:8087/set/hm-rpc.0.IEQ12345.LEVEL?value=1&wait=5000&prettyPrint```

```{
       "val": 1,
       "ack": true,
       "ts": 1423155399,
       "from": "hm-rpc.0.IEQ12345.LEVEL",
       "lc": 1423155399
     }
```

Если в указанное время не будет получен ответ, будет возвращено значение `null`.
В первом случае ответ будет возвращен немедленно и `ack` будет ложным. Во втором случае верно `ack`. Значит, это был ответ водителя.

### SetBulk
- записать множество идентификаторов в одном запросе.

```http://ip:8087/setBulk?hm-rpc.0.FEQ1234567:1.LEVEL=0.7&Anwesenheit=0&prettyPrint```

```
  [
    {
      "id": "hm-rpc.0.FEQ1234567:1.LEVEL",
      "val": "0.7"
    },
    {
      "error": "error: datapoint \"Anwesenheit\" not found"
    }
  ]
```

Вы также можете отправить этот запрос как POST.

### Объекты
Получите список всех объектов для выкройки. Если не указан шаблон, будут возвращены все объекты в виде массива JSON.

```http://ip:8087/objects?prettyPrint```

```
  {
  "system.adapter.admin.0.uptime": {
    "_id": "system.adapter.admin.0.uptime",
    "type": "state",
    "common": {
      "name": "admin.0.uptime",
      "type": "number",
      "role": "indicator.state",
      "unit": "seconds"
    },
    "native": {}
  },
  "system.adapter.admin.0.memRss": {
    "_id": "system.adapter.admin.0.memRss",
    "type": "state",
    "common": {
      "name": "admin.0.memRss",
      "desc": "Resident set size",
      "type": "number",
      "role": "indicator.state",
      "unit": "MB",
      "history": {
        "enabled": true,
        "changesOnly": true,
        "minLength": 480,
        "maxLength": 960,
        "retention": 604800,
        "debounce": 10000
      }
    },
    "native": {}
  },
  ...
```

Получить все управляющие объекты адаптера system.adapter.admin.0:

```http://ip:8087/objects?pattern=system.adapter.admin.0*&prettyPrint```

```
    {
    "system.adapter.admin.0.uptime": {
      "_id": "system.adapter.admin.0.uptime",
      "type": "state",
      "common": {
        "name": "admin.0.uptime",
        "type": "number",
        "role": "indicator.state",
        "unit": "seconds"
      },
      "native": {}
    },
    ...

```

### Состояния
Получите список всех состояний шаблона. Если шаблон не указан, будут возвращены все состояния в виде массива JSON.

```http://ip:8087/states?prettyPrint```

```
  {
    "system.adapter.admin.0.uptime": {
      "val": 32176,
      "ack": true,
      "ts": 1423156164,
      "from": "system.adapter.admin.0",
      "lc": 1423156164
    },
    "system.adapter.admin.0.memRss": {
      "val": 41.14,
      "ack": true,
      "ts": 1423156164,
      "from": "system.adapter.admin.0",
      "lc": 1423156119
    },
    "system.adapter.admin.0.memHeapTotal": {
      "val": 31.19,
      "ack": true,
      "ts": 1423156164,
      "from": "system.adapter.admin.0",
      "lc": 1423155084
    },
  ...
```

Получить все управляющие объекты адаптера system.adapter.admin.0:

```http://ip:8087/states?pattern=system.adapter.admin.0*&prettyPrint```

```
    {
      "system.adapter.admin.0.uptime": {
        "val": 32161,
        "ack": true,
        "ts": 1423156149,
        "from": "system.adapter.admin.0",
        "lc": 1423156149
      },
      "system.adapter.admin.0.memRss": {
        "val": 41.14,
        "ack": true,
        "ts": 1423156149,
        "from": "system.adapter.admin.0",
        "lc": 1423156119
      },
      "system.adapter.admin.0.memHeapTotal": {
        "val": 31.19,
        "ack": true,
        "ts": 1423156149,
        "from": "system.adapter.admin.0",
        "lc": 1423155084
      },
      "system.adapter.admin.0.memHeapUsed": {
        "val": 19.07,
        "ack": true,
        "ts": 1423156149,
        "from": "system.adapter.admin.0",
        "lc": 1423156149
      },
      "system.adapter.admin.0.connected": {
        "val": true,
        "ack": true,
        "ts": 1423156149,
        "from": "system.adapter.admin.0",
        "lc": 1423128324,
        "expire": 28100
      },
      "system.adapter.admin.0.alive": {
        "val": true,
        "ack": true,
        "ts": 1423156149,
        "from": "system.adapter.admin.0",
        "lc": 1423128324,
        "expire": 28115
      }
    }
```

### Поиск
Если в конфигурации установлен источник данных (История, SQL), то будут перечислены только точки данных, известные источнику данных.
Если опция «Список всех точек данных» активирована или источник данных не указан, будут перечислены все точки данных.

```
http://ip:8087/search?pattern=system.adapter.admin.0*&prettyPrint
```

```
  {
    "system.adapter.admin.0.outputCount",
    "system.adapter.admin.0.inputCount",
    "system.adapter.admin.0.uptime",
    "system.adapter.admin.0.memRss",
    "system.adapter.admin.0.memHeapTotal",
    "system.adapter.admin.0.memHeapUsed",
    "system.adapter.admin.0.cputime",
    "system.adapter.admin.0.cpu",
    "system.adapter.admin.0.connected",
    "system.adapter.admin.0.alive"
  }
```

### Запрос
Если указан источник данных (История, SQL), данные из указанных точек данных считываются за указанный период.

```http://ip:8087/query/system.host.iobroker-dev.load,system.host.iobroker-dev.memHeapUsed/?prettyPrint&dateFrom=2019-06-08T01:00:00.000Z&dateTo=2019-06-08T01:00:10.000Z```

```
  [
    {
      "target": "system.host.iobroker-dev.load",
      "datapoints": [
        [
          0.12,
          1559955600000
        ],
        [
          0.46,
          1559955601975
        ],
        [
          0.44,
          1559955610000
        ]
      ]
    },
    {
      "target": "system.host.iobroker-dev.memHeapUsed",
      "datapoints": [
        [
          23.01,
          1559955600000
        ],
        [
          22.66,
          1559955601975
        ],
        [
          22.69,
          1559955610000
        ]
      ]
    }
  ]
```

Если источник данных не указан или передан параметр noHistory, то считывается только текущее значение точки данных.

```http://ip:8087/query/system.host.iobroker-dev.load,system.host.iobroker-dev.memHeapUsed/?prettyPrint&noHistory=true```

```
  [
    {
      "target": "system.host.iobroker-dev.load",
      "datapoints": [
        [
          0.58,
          1559970500342
        ]
      ]
    },
    {
      "target": "system.host.iobroker-dev.memHeapUsed",
      "datapoints": [
        [
          21.53,
          1559970500342
        ]
      ]
    }
  ]
```

<! - Заполнитель для следующей версии (в начале строки):

### __РАБОТА В ПРОЦЕССЕ__ ->

## Changelog
### 2.6.2 (2021-11-12)
* (bluefox) Support of new flags for `getPlainValue`: `json` and `noStringify`

### 2.6.1 (2021-05-13)
* (Apollon77) Catch error in request parsing when malformed (Sentry IOBROKER-SIMPLE-API-16)

### 2.6.0 (2021-05-09)
* (Apollon77) Also URL-Decode the path parts like state ids
* (Apollon77) Optimize for js-controller 3.3

### 2.5.3 (2021-01-25)
* (Apollon77) Make sure that delayed answers are not crashing (Sentry IOBROKER-SIMPLE-API-Z)

### 2.5.2 (2021-01-09)
* (bluefox) Support of new Let's Encrypt (only with js-controller 3.2.x)

### 2.4.8 (2020-09-17)
* (Apollon77) Make sure missing favico file locally is not throwing exceptions (Sentry IOBROKER-SIMPLE-API-G)

### 2.4.7 (2020-08-17)
* (Apollon77) check that targets are an array for "query" requests (Sentry IOBROKER-SIMPLE-API-F)

### 2.4.6 (2020-06-11)
* (Apollon77) Make sure adapter is showing correct error when webserver can not be initialized (Sentry IOBROKER-SIMPLE-API-7)

### 2.4.5 (2020-05-04)
* (Apollon77) webserver initialization optimized again to prevent errors with imvalid certificates

### 2.4.4 (2020-05-02)
* (Apollon77) Make sure Permission errors do not crash adapter (Sentry IOBROKER-SIMPLE-API-3)

### 2.4.3 (2020-04-30)
* (Apollon77) Optimize web server error handling

### 2.4.1 (2020-04-23)
* (bluefox) Caught the web server errors

### 2.4.0 (2020-04-12)
* (Apollon77) Add Sentry support with js-controller 3.0
* (Apollon77) fix potential crash

### 2.3.3 (2019-11-16)
* (bluefox) Added response code for unknown commands

### 2.3.2 (2019-10-18)
* (Apollon77) Fix Admin 3 support

### 2.3.1 (2019-10-12)
* (bluefox) Admin 3 is now supported
* (bluefox) NPM packages were updated

### 2.2.0 (2019-09-10)
* (bluefox) New flags are supported: ack and type
* (bluefox) Return error codes as JSON if no pretty print defined

### 2.1.2 (2019-09-05)
* (Apollon77) fix compact mode

### 2.1.0 (2019-07-05)
* (Marco.K) Added command set for the Grafana plugins JSON / SimpleJSON. Usage see https://forum.iobroker.net/topic/23033/aufruf-modifikation-simpleapi-adapter-iobroker-als-datenquelle-f%C3%BCr-grafana

### 2.0.5 (2019-06-26)
* (Apollon77) remove logging

### 2.0.4 (2019-06-23)
* (Apollon77) fix usage as web extension

### 2.0.2 (2018-12-17)
* (Apollon77) fix decoding for state Ids with # in it

### 2.0.0 (2018-06-29)
* (Giermann) BREAKING CHANGE: getBulk is returning data in a different structure

### 1.6.3 (2018-04-15)
* (Apollon77) Return used character encoding (UTF-8)

### 1.6.2 (2017-11-27)
* (Apollon77) Fix decoding problems

### 1.6.1 (2017-09-25)
* (Apollon77) Fix statuscode for setBulk and optimize permission errors

### 1.6.0 (2017-07-10)
* (Apollon77) Fix handling of URL-encoded values, they are now decoded properly
* (Apollon77) Optimize Permission handling
* (Apollon77) add possibility to only allow access to states where user is also owner, finally works correct with js-controller 1.1.1!

### 1.5.0 (2017-03-10)
* (greyhound) Add new POST method setValueFromBody

### 1.4.0 (2017-01-05)
* (bluefox) new web server plugin support

### 1.3.0 (2016-08-30)
* (bluefox) сompatible only with new admin

### 1.2.0 (2016-08-27)
* (bluefox) support of letsencrypt certificates

### 1.1.1 (2016-07-06)
* (bluefox) support of chained certificates

### 1.1.0 (2016-02-09)
* (bluefox) fix toggle, objects, states, setBulk, POST
* (bluefox) add tests

### 1.0.0 (2015-09-30)
* (bluefox) stop adapter before update

### 0.1.2 (2015-06-28)
* (bluefox) add description in readme.md
* (bluefox) change "toggle" for boolean and numbers

### 0.1.1 (2015-06-28)
* (bluefox) change setForeignState api
* (bluefox) add type to io-package.json
* (bluefox) enable run from "web"
* (bluefox) add default user

### 0.1.0 (2015-06-10)
* (bluefox) change setForeignState api
* (bluefox) support of user permissions

### 0.0.4 (2015-03-11)
* (bluefox) remove socket.io from file

### 0.0.3 (2015-02-13)
* (bluefox) remove socket.io from dependencies

### 0.0.2 (2015-02-12)
* (bluefox) enable be a part of "web"

### 0.0.1 (2015-02-06)
* (bluefox) initial commit

## License
The MIT License (MIT)

Copyright (c) 2015-2021 bluefox <dogafox@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.