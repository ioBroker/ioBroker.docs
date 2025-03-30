---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.simple-api/README.md
title: Simple-api
hash: q1/fQiizuoo4563slosAzKVM/45ewTQF6c+UgBc9kaM=
---
![Логотип](../../../en/adapterref/iobroker.simple-api/admin/simple-api.png)

![Количество установок](http://iobroker.live/badges/simple-api-stable.svg)
![версия НПМ](http://img.shields.io/npm/v/iobroker.simple-api.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.simple-api.svg)

# Простой API
![Тест и выпуск](https://github.com/ioBroker/ioBroker.simple-api/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/simple-api/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

Это интерфейс RESTFul для чтения объектов и состояний из ioBroker, а также для записи/управления состояниями с помощью HTTP-запросов Get/Post.

**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Более подробную информацию и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

**Используйте лучше [`ioBroker.rest-api`](https://github.com/ioBroker/ioBroker.rest-api) вместо этого адаптера.**

## Использование
Вызовите в браузере `http://ipaddress:8087/help`, чтобы получить справку об API. Результат:

```json
{
  "getPlainValue": "http://ipaddress:8087/getPlainValue/stateID",
  "getPlainValue": "http://ipaddress:8087/getPlainValue/stateID?json",
  "get": "http://ipaddress:8087/get/stateID/?prettyPrint",
  "getBulk": "http://ipaddress:8087/getBulk/stateID1,stateID2/?prettyPrint",
  "set": "http://ipaddress:8087/set/stateID?value=1&prettyPrint",
  "toggle": "http://ipaddress:8087/toggle/stateID?prettyPrint",
  "setBulk": "http://ipaddress:8087/setBulk?stateID1=0.7&stateID2=0&prettyPrint",
  "objects": "http://ipaddress:8087/objects?pattern=system.adapter.admin.0*&prettyPrint",
  "objects": "http://ipaddress:8087/objects?pattern=system.adapter.admin.0*&type=adapter&prettyPrint",
  "states": "http://ipaddress:8087/states?pattern=system.adapter.admin.0*&prettyPrint"
  "search": "http://ipaddress:8087/search?pattern=system.adapter.admin.0*&prettyPrint",
  "query": "http://ipaddress:8087/query/stateID1,stateID2/?prettyPrint"
  "query": "http://ipaddress:8087/query/stateID1,stateID2/?noHistory=true&prettyPrint"
  "query": "http://ipaddress:8087/query/stateID1,stateID2/?dateFrom=2019-06-06T12:00:00.000Z&d&prettyPrint"
  "query": "http://ipaddress:8087/query/stateID1,stateID2/?dateFrom=2019-06-06T12:00:00.000Z&dateTo=2019-06-06T12:00:00.000Z&aggregate=minmax&count=2000&prettyPrint"
}
```

### ПолучитьОбычноеЗначение
Позвоните, например:

`http://ipaddress:8087/getPlainValue/system.adapter.admin.0.alive`

Результат:

`true`

Кроме того, вы можете использовать ключ запроса `json` для принудительного анализа сохраненного значения:

`http://ipaddress:8087/getPlainValue/javascript.0.value?json`

Результат:

`{"a":1}`

А без флага `json` результат был бы таким:

`"{\"a\": 1}"`

Можно использовать еще один полезный флаг, `noStringify`:

`http://ipaddress:8087/getPlainValue/javascript.0.stringValue?noStringify`

Результат:

`VALUETEXT`

А без флага `noStringify` результат был бы таким:

`"VALUETEXT"`

### Получать
Вызов, например: `http://ipaddress:8087/get/system.adapter.admin.0.alive`

Результат:

```json
{"val":true,"ack":true,"ts":1442432193,"from":"system.adapter.admin.0","lc":1442431190,"expire":23437,"_id":"system.adapter.admin.0.alive","type":"state","common":{"name":"admin.0.alive","type":"boolean","role":"indicator.state"},"native":{}}
```

или позвоните, например:

```
http://ipaddress:8087/get/system.adapter.admin.0.alive?prettyPrint
```

Результат:

```json
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

### ПолучитьBulk
Получить множество состояний одним запросом, возвращенным в виде массива объектов в порядке списка в запросе и id/val/ts в качестве подобъекта

### Набор
Вызов, например: `http://ipaddress:8087/set/javascript.0.test?value=1`

Результат:

```json
{"id":"javascript.0.test","value":1}
```

или позвоните, например: `http://ipaddress:8087/set/javascript.0.test?value=1&prettyPrint`

Результат:

```json
{
  "id": "javascript.0.test",
  "value": 1
}
```

Конечно, точка данных `javascript.0.test` должна существовать.

Кроме того, можно определить тип значения: `http://ipaddress:8087/set/javascript.0.test?value=1&prettyPrint&type=string`

и флаг подтверждения также может быть определен: `http://ipaddress:8087/set/javascript.0.test?value=1&prettyPrint&ack=true`

### Переключать
Переключает значение:

- логическое значение: true => false, false => true
- количество без ограничений: x => 100-x
- число с ограничениями: x => макс - (x - мин)

### SetBulk
Установить несколько состояний одним запросом. Этот запрос также поддерживает метод POST, поскольку данные POST должны быть в теле, а не в URL.

Для этого используйте тип контента `text/plain`.

### SetValueFromBody
Эта команда позволяет задать значение заданного состояния, устанавливаемого содержимым тела POST.

Например, вызовите: `http://ipaddress:8087/setValueFromBody/0_userdata.0.example_state` с телом `hello`, где `0_userdata.0.example_state` — это идентификатор состояния.

Для этого используйте тип контента `text/plain`.

### Объекты
Чтение объектов определенного типа из БД.

Вызовите, например: `http://ipaddress:8087/objects?pattern=enum.*&type=enum` — для чтения всех перечислений

или

`http://ipaddress:8087/objects?pattern=system.adapter.admin.0.*` - для чтения всех состояний в ветке `system.adapter.admin.0`

### Штаты
### Поиск
Если в конфигурации задан источник данных (история, SQL), то будут перечислены только точки данных, известные источнику данных.
Если активирована опция «Список всех точек данных» или источник данных не указан, будут перечислены все точки данных.
Эта команда необходима для плагина Grafana JSON / SimpleJSON.

### Запрос
Если в конфигурации экземпляра указан источник данных (История, SQL), данные из указанных точек данных считываются за указанный период, в противном случае считывается только текущее значение.
Эта команда необходима для плагина Grafana JSON / SimpleJSON.

### Помощь
Возвращает вывод [этот](#usage)

## Использование
Предположим, у нас нет защиты и сервер работает на порту по умолчанию 8087.

Для всех запросов можно указать название или идентификатор штата.

Для каждого запроса, возвращающего JSON, вы можете установить параметр `prettyPrint`, чтобы получить вывод в удобочитаемой форме.

Если включена аутентификация, то обязательными являются два других поля: `?user=admin&pass=iobroker`

### ПолучитьОбычноеЗначение
Прочитать значение состояния как текст. Вы можете указать больше идентификаторов, разделенных точкой с запятой

`http://ip:8087/getPlainValue/admin.0.memHeapTotal` => `31.19`

`http://ip:8087/getPlainValue/admin.0.memHeapTotal, admin.0.memHeapUsed` =>

```
  31.19
  17.52
```

### Получать
Прочитать состояние и данные объекта состояния как JSON. Вы можете указать больше идентификаторов, разделенных точкой с запятой.
Если запрошено более одного идентификатора, будет возвращен массив JSON.

`http://localhost:8087/get/admin.0.memHeapTotal/?prettyPrint` =>

```json
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

`http://ip:8087/get/admin.0.memHeapTotal,admin.0.memHeapUsed/?prettyPrint` =>

```json
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

### ПолучитьBulk
Прочитайте состояния большего количества идентификаторов с временной меткой. Вы можете указать больше идентификаторов, разделив их точкой с запятой.
Массив JSON будет возвращаться всегда.

`http://ip:8087/getBulk/admin.0.memHeapTotal,admin.0.memHeapUsed/?prettyPrint` =>

```json
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

### Набор
Запишите состояния с указанными идентификаторами. Вы можете указать опцию *wait* в миллисекундах, чтобы дождаться ответа от водителя.

`http://ip:8087/set/hm-rpc.0.IEQ12345.LEVEL?value=1&prettyPrint` =>

```json
{
       "id": "hm-rpc.0.IEQ12345.LEVEL",
       "value": 1
     }
```

`http://ip:8087/set/hm-rpc.0.IEQ12345.LEVEL?value=1&wait=5000&prettyPrint` =>

```json
{
       "val": 1,
       "ack": true,
       "ts": 1423155399,
       "from": "hm-rpc.0.IEQ12345.LEVEL",
       "lc": 1423155399
     }
```

Если в указанное время ответ не получен, будет возвращено значение `null`.
В первом случае ответ будет возвращен немедленно, а `ack` — ложь. Во втором случае `ack` — истина. Это означает, что это был ответ от водителя.

### SetBulk
- записать большую часть идентификаторов в один запрос.

`http://ip:8087/setBulk?hm-rpc.0.FEQ1234567:1.LEVEL=0.7&Anwesenheit=0&prettyPrint` =>

```json
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

Вы также можете отправить этот запрос как POST. Пожалуйста, используйте тип контента `text/plain` и поместите данные в тело.

### Объекты
Получить список всех объектов для шаблона. Если шаблон не указан, будут возвращены все объекты в виде массива JSON.

`http://ip:8087/objects?prettyPrint` =>

```json
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

Получить все объекты управления адаптера system.adapter.admin.0: `http://ip:8087/objects?pattern=system.adapter.admin.0*&prettyPrint` =>

```json
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

### Штаты
Получить список всех состояний для шаблона. Если шаблон не указан, будут возвращены все состояния в виде массива JSON.

`http://ip:8087/states?prettyPrint` =>

```json
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

Получить все объекты управления адаптера system.adapter.admin.0:

`http://ip:8087/states?pattern=system.adapter.admin.0*&prettyPrint` =>

```json
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
Если в конфигурации задан источник данных (История, SQL), то будут перечислены только точки данных, известные источнику данных. Если активирована опция «Список всех точек данных» или не указан источник данных, будут перечислены все точки данных.

`http://ip:8087/search?pattern=system.adapter.admin.0*&prettyPrint` =>

```json
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
Если указан источник данных (История, SQL), то будут извлечены данные из указанных точек данных за указанный период.

`http://ip:8087/query/system.host.iobroker-dev.load,system.host.iobroker-dev.memHeapUsed/?prettyPrint&dateFrom=2019-06-08T01:00:00.000Z&dateTo=2019-06-08T01:00:10.000Z` =>

```json
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

`http://ip:8087/query/system.host.iobroker-dev.load,system.host.iobroker-dev.memHeapUsed/?prettyPrint&noHistory=true` =>

```json
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

В запросе можно использовать относительное время. Например, `dateFrom=-1h` или `dateTo=today`.

Поддерживаются следующие относительные шаблоны:

- `hour` или `thisHour` или `this hour` - начало текущего часа
- `last hour` или `lastHour` - начало предыдущего часа
- `today` - начало текущего дня
- `вчера` - начало предыдущего дня
- `week` или `thisWeek` или `this week` - начало текущей недели
- `lastWeek` или `last week` - начало предыдущей недели
- `month` или `thisMonth` или `this month` - начало текущего месяца
- `lastMonth` или `last month` - начало предыдущего месяца
- `year` или `thisYear` или `this year` - начало текущего года
- `lastYear` или `last year` - начало предыдущего года
- `-Nd` - N дней назад
- `-NM` - N месяцев назад
- `-Ny` - N лет назад
- `-Nh` - N часов назад
- `-Nm` - N минут назад
- `-Ns` - N секунд назад

## КОРС
С помощью опции «Разрешить источник (CORS)» вы можете установить заголовок `Access-Control-Allow-Origin`, чтобы разрешить запросы из других доменов.

Если оставить поле пустым, заголовок не будет установлен.

## Модификаторы
Вы можете использовать некоторые варианты для изменения ответа:

- `prettyPrint` - для получения вывода в удобной для восприятия форме
- `json` - для принудительного анализа значения в команде `getPlainValue`
- `timeRFC3339` - для получения времени временных меток (`ts` и `lc`) в формате RFC3339, например `2019-06-08T01:00:00.000Z`
- `callback` - ответ в формате JSONP. В `callback=<CALLBACK>` `CALLBACK` - это имя функции обратного вызова

## Аутентификация
Данный адаптер поддерживает следующие типы аутентификации:

- Параметры запроса `user` и `pass`
- Базовая аутентификация
- Oauth2 Bearer token в заголовке. Подробнее о том, как получить токены, читайте в веб-адаптере.

<!-- Заполнитель для следующей версии (в начале строки):

### **РАБОТА В ХОДЕ** -->

## Changelog
### 3.0.6 (2025-03-15)
* (bluefox) Added support for 'Access-Control-Allow-Origin'
* (bluefox) Removed letsencrypt information
* (bluefox) Added basic and OAuth2 authentication
* (bluefox) Implemented JSONP response
* (bluefox) Implemented relative times for query

### 3.0.5 (2025-03-13)
* (bluefox) Corrected the indication of running mode in admin
* (bluefox) Corrected the writing of numeric values
* (bluefox) Clear cache after 10 minutes

### 3.0.0 (2025-03-09)
* (bluefox) Updated packages
* (bluefox) Migrated to TypeScript
* (bluefox) If State/Object not found, the response will be 404 (and not 500)
* (bluefox) If a user has no permission, the response will be 403 (and not 401)

### 2.8.0 (2024-05-23)
* (foxriver76) ported to `@iobroker/webserver`

### 2.7.2 (2022-10-08)
* (Apollon77) Prepare for future js-controller versions

### 2.7.1 (2022-08-29)
* (bluefox) Check if the port is occupied only on defined interface
* (bluefox) Added JSON config

### 2.7.0 (2022-05-31)
* (crycode-de) Allow use of ack flag for setBulk post requests
* (Apollon77) Return an ack flag too on getBulk

### 2.6.5 (2022-04-14)
* Added support for aggregate and count for queries

### 2.6.4 (2022-03-17)
* (Apollon77) Optimize performance, especially when using names instead of object ids

### 2.6.3 (2022-02-19)
* (Apollon77) Optimize error message for multi-language objects
* (Apollon77) Do not overwrite state properties by object properties

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
* (Apollon77) Make sure that the adapter is showing the correct error when webserver cannot be initialized (Sentry IOBROKER-SIMPLE-API-7)

### 2.4.5 (2020-05-04)
* (Apollon77) webserver initialization optimized again to prevent errors with invalid certificates

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
* (bluefox) compatible only with new admin

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

Copyright (c) 2015-2025 bluefox <dogafox@gmail.com>

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