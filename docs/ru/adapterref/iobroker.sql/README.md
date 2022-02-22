---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sql/README.md
title: ioBroker.sql
hash: DCF5AmF4X9Z+t37Ff0XTqogvrFR9L2WUru1+DJ5UxBA=
---
![Логотип](../../../en/adapterref/iobroker.sql/admin/sql.png)

![Количество установок](http://iobroker.live/badges/sql-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.sql.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sql.svg)
![Тесты](https://travis-ci.org/ioBroker/ioBroker.sql.svg?branch=master)
![НПМ](https://nodei.co/npm/iobroker.sql.png?downloads=true)

# IoBroker.sql
Этот адаптер сохраняет историю состояний в базу данных SQL.

Поддерживает PostgreSQL, mysql, Microsoft SQL Server и sqlite.
Вы можете оставить порт 0, если требуется порт по умолчанию.

**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

### MS-SQL:
Используйте ```localhost\instance``` для хоста и проверьте, включены ли соединения TCP/IP.
https://msdn.microsoft.com/en-us/library/bb909712(v=vs.90).aspx

### SQLite:
является "файловой" БД и не может управлять слишком большим количеством событий. Если у вас большой объем данных, используйте настоящую БД, например PostgreSQL и др.

SQLite DB не должна быть установлена дополнительно. Это просто файл на диске, но для его установки вам потребуются инструменты сборки в вашей системе. Для Linux просто напишите:

```
sudo apt-get install build-essential
```

Для окон:

```
c:\>npm install --global --production windows-build-tools
```

а затем переустановите адаптер, например:

```
cd /opt/iobroker
iobroker stop sql
npm install iobroker.sql --production
iobroker start sql
```

### MySQL:
Вы можете установить mysql в системах Linux следующим образом:

```
apt-get install mysql-server mysql-client

mysql -uroot -p

CREATE USER 'iobroker'@'%' IDENTIFIED BY 'iobroker';
GRANT ALL PRIVILEGES ON * . * TO 'iobroker'@'%';
FLUSH PRIVILEGES;
```

При необходимости отредактируйте */etc/mysql/my.cnf*, чтобы установить привязку к IP-адресу для удаленного подключения.

**Внимание**: пользователь iobroker — «admin». При необходимости дайте ограниченные права пользователю iobroker.

На «виндовс» его можно легко установить через установщик: https://dev.mysql.com/downloads/installer/.

Обратите внимание на метод аутентификации. Новый алгоритм шифрования в MySQL 8.0 еще не поддерживается `node.js`, и вы должны выбрать устаревший метод аутентификации.

![Окна](../../../en/adapterref/iobroker.sql/img/WindowsMySQLinstaller.png)

## Структура БД
Имя базы данных по умолчанию — «iobroker», но его можно изменить в конфигурации.

### Источники Эта таблица представляет собой список экземпляров адаптера, которые записали записи. (гос.от)
| БД | Имя в запросе |
|------------|----------------------|
| MS-SQL | iobroker.dbo.sources |
| MySQL | iobroker.sources |
| Постгрес SQL | источники |
| SQLite | источники |

Структура:

| Поле | Тип | Описание |
|-------|--------------------------------------------|-------------------------------------------|
| идентификатор | INTEGER NOT NULL PRIMARY KEY IDENTITY(1,1) | уникальный идентификатор |
| имя | varchar(255) / ТЕКСТ | экземпляр адаптера, записавший запись |

*Примечание:* MS-SQL использует varchar(255), а другие используют TEXT.

### Точки данных
Эта таблица представляет собой список точек данных. (идентификаторы)

| БД | Имя в запросе |
|------------|-------------------------|
| MS-SQL | iobroker.dbo.datapoints |
| MySQL | iobroker.datapoints |
| Постгрес SQL | точки данных |
| SQLite | точки данных |

Структура:

| Поле | Тип | Описание |
|-------|--------------------------------------------|-------------------------------------------------|
| идентификатор | INTEGER NOT NULL PRIMARY KEY IDENTITY(1,1) | уникальный идентификатор |
| имя | varchar(255) / ТЕКСТ | ID переменной, например. hm-rpc.0.JEQ283747.1.СОСТОЯНИЕ |
| тип | ЦЕЛОЕ ЧИСЛО | 0 - число, 1 - строка, 2 - логическое значение |

*Примечание:* MS-SQL использует varchar(255), а другие используют TEXT.

### Числа
Значения для состояний с типом "число". **ts** означает «временной ряд».

| БД | Имя в запросе |
|------------|-------------------------|
| MS-SQL | iobroker.dbo.ts_number |
| MySQL | iobroker.ts_number |
| Постгрес SQL | ts_номер |
| SQLite | ts_номер |

Структура:

| Поле | Тип | Описание |
|--------|--------------------------------------------|-------------------------------------------------|
| идентификатор | ЦЕЛОЕ ЧИСЛО | ID состояния из таблицы "Точки данных" |
| тс | БОЛЬШОЕ / ЦЕЛОЕ | Время в мс до эпохи. Можно преобразовать во время с помощью «новой даты (ts)» |
| вал | НАСТОЯЩИЙ | Значение |
| подтверждение | БИТ/БУЛЕВОЕ | Подтверждено: 0 - нет подтверждения, 1 - подтверждение |
| _из | ЦЕЛОЕ ЧИСЛО | ID источника из таблицы "Источники" |
| д | ЦЕЛОЕ ЧИСЛО | Качество как число. Вы можете найти описание [здесь](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#states) |

*Примечание:* MS-SQL использует BIT, а другие используют BOOLEAN. SQLite использует для ts INTEGER и все остальные BIGINT.

Пользователь может определить дополнительные для типа `number` функциональные возможности «счетчиков». Для этого создается следующая таблица:

| БД | Имя в запросе |
|------------|-------------------------|
| MS-SQL | iobroker.dbo.ts_counter |
| MySQL | iobroker.ts_counter |
| Постгрес SQL | ts_counter |
| SQLite | ts_counter |

Структура:

| Поле | Тип | Описание |
|--------|--------------------------------------------|-------------------------------------------------|
| идентификатор | ЦЕЛОЕ ЧИСЛО | ID состояния из таблицы "Точки данных" |
| тс | БОЛЬШОЕ / ЦЕЛОЕ | Время в мс до эпохи. Можно преобразовать во время с помощью «новой даты (ts)» |
| вал | НАСТОЯЩИЙ | Значение |

В этой таблице хранятся значения, когда счетчик был заменен, и значение не увеличилось, а не стало равным нулю или меньшему значению.

### Строки
Значения для состояний с типом "строка".

| БД | Имя в запросе |
|------------|-------------------------|
| MS-SQL | iobroker.dbo.ts_string |
| MySQL | iobroker.ts_string |
| Постгрес SQL | ts_string |
| SQLite | ts_string |

Структура:

| Поле | Тип | Описание |
|--------|--------------------------------------------|-------------------------------------------------|
| идентификатор | ЦЕЛОЕ ЧИСЛО | ID состояния из таблицы "Точки данных" |
| тс | БОЛЬШОЙ | Время в мс до эпохи. Можно преобразовать во время с помощью «новой даты (ts)» |
| вал | ТЕКСТ | Значение |
| подтверждение | БИТ/БУЛЕВОЕ | Подтверждено: 0 - нет подтверждения, 1 - подтверждение |
| _из | ЦЕЛОЕ ЧИСЛО | ID источника из таблицы "Источники" |
| д | ЦЕЛОЕ ЧИСЛО | Качество как число. Вы можете найти описание [здесь](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#states) |

*Примечание:* MS-SQL использует BIT, а другие используют BOOLEAN. SQLite использует для ts INTEGER и все остальные BIGINT.

### Булевы значения
Значения для состояний с типом "boolean".

| БД | Имя в запросе |
|------------|-------------------------|
| MS-SQL | iobroker.dbo.ts_bool |
| MySQL | iobroker.ts_bool |
| Постгрес SQL | ts_bool |
| SQLite | ts_bool |

Структура:

| Поле | Тип | Описание |
|--------|--------------------------------------------|-------------------------------------------------|
| идентификатор | ЦЕЛОЕ ЧИСЛО | ID состояния из таблицы "Точки данных" |
| тс | БОЛЬШОЙ | Время в мс до эпохи. Можно преобразовать во время с помощью «новой даты (ts)» |
| вал | БИТ/БУЛЕВОЕ | Значение |
| подтверждение | БИТ/БУЛЕВОЕ | Подтверждено: 0 - нет подтверждения, 1 - подтверждение |
| _из | ЦЕЛОЕ ЧИСЛО | ID источника из таблицы "Источники" |
| д | ЦЕЛОЕ ЧИСЛО | Качество как число. Вы можете найти описание [здесь](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#states) |

*Примечание:* MS-SQL использует BIT, а другие используют BOOLEAN. SQLite использует для ts INTEGER и все остальные BIGINT.

## Пользовательские запросы
Пользователь может выполнять пользовательские запросы к таблицам из адаптера javascript:

```
sendTo('sql.0', 'query', 'SELECT * FROM datapoints', function (result) {
    if (result.error) {
        console.error(result.error);
    } else {
        // show result
         console.log('Rows: ' + JSON.stringify(result.result));
    }
});
```

Или получить записи за последний час для ID=system.adapter.admin.0.memRss

```
sendTo('sql.0', 'query', 'SELECT id FROM datapoints WHERE name="system.adapter.admin.0.memRss"', function (result) {
    if (result.error) {
        console.error(result.error);
    } else {
        // show result
        console.log('Rows: ' + JSON.stringify(result.result));
        var now = new Date();
        now.setHours(-1);
        sendTo('sql.0', 'query', 'SELECT * FROM ts_number WHERE ts >= ' + now.getTime() + ' AND id=' + result.result[0].id, function (result) {
            console.log('Rows: ' + JSON.stringify(result.result));
        });
    }
});
```

*Примечание:*

В зависимости от базы данных имя базы данных или имя базы данных + схема должны быть вставлены перед именем таблицы — см. поля выше в разделе «Структура баз данных».

Пример, если ваша база данных называется «iobroker»:

| БД | Имя в запросе |
|------------|------------------------------------------|
| MS-SQL | SELECT * FROM iobroker.dbo.datapoints ...|
| MySQL | SELECT * FROM iobroker.datapoints ... |

## StoreState
Если вы хотите записать другие данные в InfluxDB/SQL, вы можете использовать встроенную системную функцию **storeState**.
Эту функцию также можно использовать для преобразования данных из других адаптеров истории, таких как история или SQL.

Указанные идентификаторы не сверяются с базой данных ioBroker и не нуждаются в настройке там, а доступны только напрямую.

Сообщение может иметь один из следующих трех форматов:

* один идентификатор и один объект состояния: `{id: 'adapter.0.device.counter', состояние: {val: 1, ts: 10239499}}`
* один идентификатор и массив объектов состояния: `{id: 'adapter.0.device.counter', состояние: [{val: 1, ts: 10239499}, {val: 2, ts: 10239599}, {val: 3 , тс: 10239699}]}`
* массив из нескольких идентификаторов с объектами состояния `[{id: 'adapter.0.device.counter1', состояние: {val: 1, ts: 10239499}, {id: 'adapter.0.device.counter2', состояние: {val: 2, ts: 10239599}]`

Кроме того, вы можете добавить атрибут `rules: true`, чтобы активировать все правила, такие как `counter`, `changesOnly`, `de-bounce` и т. д.: `{id: 'adapter.0.device.counter', rules: true, state: [{val: 1, ts: 10239499}, {val: 2, ts: 10239599}, {val: 3, ts: 10239699}]}`

## Удалить состояние
Если вы хотите удалить запись из базы данных, вы можете использовать встроенную системную функцию **delete**:

```
sendTo('sql.0', 'delete', [
    {id: 'mbus.0.counter.xxx', state: {ts: 1589458809352},
    {id: 'mbus.0.counter.yyy', state: {ts: 1589458809353}
], result => console.log('deleted'));
```

Чтобы удалить ВСЕ данные истории для некоторой точки данных, выполните:

```
sendTo('sql.0', 'deleteAll', [
    {id: 'mbus.0.counter.xxx'}
    {id: 'mbus.0.counter.yyy'}
], result => console.log('deleted'));
```

Чтобы удалить данные истории для некоторой точки данных и для некоторого диапазона, выполните:

```
sendTo('sql.0', 'deleteRange', [
    {id: 'mbus.0.counter.xxx', start: '2019-01-01T00:00:00.000Z', end: '2019-12-31T23:59:59.999'},
    {id: 'mbus.0.counter.yyy', start: 1589458809352, end: 1589458809353}
], result => console.log('deleted'));
```

Время может быть мс с начала эпохи или строкой, которую можно преобразовать с помощью объекта Date javascript.

Значения будут удалены, включая определенные пределы. `ts >= start AND ts <= end`

## Изменить состояние
Если вы хотите изменить значение записи, качество или флаг подтверждения в базе данных, вы можете использовать встроенную системную функцию **update**:

```
sendTo('sql.0', 'update', [
    {id: 'mbus.0.counter.xxx', state: {ts: 1589458809352, val: 15, ack: true, q: 0},
    {id: 'mbus.0.counter.yyy', state: {ts: 1589458809353, val: 16, ack: true, q: 0}
], result => console.log('deleted'));
```

`ts` является обязательным. В объект состояния должен быть включен хотя бы один другой флаг.

Будьте осторожны с `counters`. `counters` в БД не будет сброшен, и вы должны справиться с этим самостоятельно.

## Получить историю
В дополнение к пользовательским запросам вы можете использовать встроенную системную функцию **getHistory**:

```
var end = Date.now();
sendTo('sql.0', 'getHistory', {
    id: 'system.adapter.admin.0.memRss',
    options: {
        start:      end - 3600000,
        end:        end,
        aggregate: 'minmax' // or 'none' to get raw values
    }
}, function (result) {
    for (var i = 0; i < result.result.length; i++) {
        console.log(result.result[i].id + ' ' + new Date(result.result[i].ts).toISOString());
    }
});
```

## Получить счетчик
Пользователь может запросить значение некоторого счетчика (тип=число, счетчик=истина) за определенный период.

```
var now = Date.now();
// get consumption value for last 30 days
sendTo('sql.0', 'getCounter', {
    id: 'system.adapter.admin.0.memRss',
    options: {
        start:      now - 3600000 * 24 * 30,
        end:        now,
    }
}, result => {
    console.log(`In last 30 days the consumption was ${result.result} kWh`);
});
```

Если счетчик будет заменен, то он тоже будет рассчитан.

## Управление журналом истории через Javascript
Адаптер поддерживает включение и отключение ведения журнала истории через JavaScript, а также получение списка включенных точек данных с их настройками.

### Включить
Сообщение требует наличия «идентификатора» точки данных. Кроме того, необязательные «параметры» для определения конкретных настроек точки данных:

```
sendTo('sql.0', 'enableHistory', {
    id: 'system.adapter.sql.0.memRss',
    options: {
        changesOnly:  true,
        debounce:     0,
        retention:    31536000,
        maxLength:    3,
        changesMinDelta: 0.5,
        aliasId: ''
    }
}, function (result) {
    if (result.error) {
        console.log(result.error);
    }
    if (result.success) {
        //successful enabled
    }
});
```

### Запрещать
Сообщение требует наличия «идентификатора» точки данных.

```
sendTo('sql.0', 'disableHistory', {
    id: 'system.adapter.sql.0.memRss',
}, function (result) {
    if (result.error) {
        console.log(result.error);
    }
    if (result.success) {
        // successful enabled
    }
});
```

### Получить список
Сообщение не имеет параметров.

```
sendTo('sql.0', 'getEnabledDPs', {}, function (result) {
    //result is object like:
    {
        "system.adapter.sql.0.memRss": {
            "changesOnly":true,
            "debounce":0,
            "retention":31536000,
            "maxLength":3,
            "changesMinDelta":0.5,
            "enabled":true,
            "changesRelogInterval":0,
            "aliasId": ""
        }
        ...
    }
});
```

## Настройки соединения
- **Тип БД**: Тип БД SQL: MySQL, PostgreSQL, MS-SQL или SQLite3.
- **Хост**: IP-адрес или имя хоста с SQL Server.
- **Порт**: порт SQL Server (оставьте пустым, если не уверены)
- **Имя базы данных**: имя базы данных. Брокер по умолчанию
- **Пользователь**: имя пользователя для SQL. Должен существовать в БД.
- **Пароль**: пароль для SQL.
- **Подтверждение пароля**: Просто повторите пароль здесь.
- **Шифровать**: некоторые БД поддерживают шифрование.
- **Округлите действительное число до**: количество цифр после запятой.
- **Разрешить параллельные запросы**: разрешить одновременные запросы SQL к БД.
- **Не создавать базу данных**: Активируйте эту опцию, если база данных уже создана (например, администратором) и у пользователя ioBroker недостаточно прав для создания БД.

## Настройки по умолчанию
- **Интервал устранения отказов**: не сохранять значения чаще, чем этот интервал.
- **Записывать любые неизмененные значения**: дополнительно записывать значения каждые X секунд.
- **Минимальная разница между последним значением и журналом**: минимальный интервал между двумя значениями.
- **Хранение**: как долго значения будут храниться в БД.

<!-- Заполнитель для следующей версии (в начале строки):

### __РАБОТА ВЫПОЛНЯЕТСЯ__ -->

## Changelog
### 1.16.1 (2021-12-19)
* (Excodibur) Hide settings not relevant when "log changes only" is not used
* (Apollon77) Allow all number values for debounce again

### 1.16.0 (2021-12-14)
* (bluefox) Support only `js.controller` >= 3.3.x
* (bluefox) Used system/custom view for collecting the objects
* (bluefox) Implemented option to ignore zero- or/and below zero- values

### 1.15.7 (2021-04-28)
* (bluefox) fixed the support of Admin5

### 1.15.6 (2021-04-19)
* (bluefox) added support of Admin5

### 1.15.5 (2021-01-22)
* (Apollon77) make sure message query is a string (Sentry)

### 1.15.4 (2021-01-17)
* (Apollon77) Optimize stop handling

### 1.15.3 (2020-08-29)
* (bluefox) Added the option "Do not create database". E.g. if DB was created and it does not required to do that, because the user does not have enough rights.

### 1.15.2 (2020-07-26)
* (Apollon77) prevent wrong errors that realId is missing

### 1.15.1 (2020-07-20)
* (Apollon77) implement a workaround for postgres problem

### 1.15.0 (2020-07-19)
*BREAKING* This version only accepts Node.js 10.x+ (because sqlite3 was upgraded)
* (Apollon77) Prevent crash case (Sentry IOBROKER-SQL-16, IOBROKER-SQL-15, IOBROKER-SQL-1K)

### 1.14.2 (2020-06-23)
* (bluefox) Fixed error for data storage

### 1.14.1 (2020-06-17)
* (bluefox) Corrected error for objects with mixed type

### 1.14.0 (2020-05-20)
* (bluefox) added the range deletion and the delete all operations

### 1.13.1 (2020-05-20)
* (bluefox) added changed and delete operations

### 1.12.6 (2020-05-08)
* (bluefox) set default history if not yet set

### 1.12.5 (2020-05-05)
* (Apollon77) Crash prevented for invalid objects (Sentry IOBROKER-SQL-X)

### 1.12.4 (2020-05-04)
* (Apollon77) Potential crash fixed when disabling data points too fast (Sentry IOBROKER-SQL-W) 
* (Apollon77) Always set "encrypt" flag, even if false because else might en in default true (see https://github.com/tediousjs/tedious/issues/931)

### 1.12.3 (2020-04-30)
* (Apollon77) Try to create indexes on MSSQL to speed up things. Infos are shown if not possible to be able for the user to do it themself. Timeout is 15s

### 1.12.2 (2020-04-30)
* (Apollon77) MSSQL works again

### 1.12.1 (2020-04-26)
* (Apollon77) Fix potential crash (Sentry)

### 1.12.0 (2020-04-23)
* (Apollon77) Implement max Connections setting and respect it, now allows to control how many concurrent connections to database are used (default 100) and others wait up to 10s for a free connection before failing)
* (Apollon77) Change dependencies to admin to a global dependency
* (Apollon77) Update connection status also in between
* (Apollon77) fix some potential crash cases (Sentry reported)
* (Omega236) Add id to error message for queries
* (Apollon77) update pg to stay compatible with nodejs 14
* (Apollon77) Start clearly ending timeouts on unload ... still some cases left!

### 1.11.1 (2020-04-19)
* __Requires js-controller >= 2.0.0__
* (Apollon77) removed usage of adapter.objects
* (Apollon77) check if objects have changed and ignore unchanged
* (Apollon77) Add Sentry for Error Reporting with js-controller 3.0
* (Apollon77) Make sure value undefined is ignored

### 1.10.1 (2020-04-12)
* (bluefox) Converted to ES6
* (bluefox) The counter functionality was implemented.

### 1.9.5 (2019-05-15)
* (Apollon77) Add support for nodejs 12

### 1.9.4 (2019-02-24)
* (Apollon77) Fix several smaller issues and topics
* (Apollon77) Optimize Texts (for Admin v3 UI)

### 1.9.0 (2018-06-19)
* (Apollon77) Add option to log datapoints as other ID (alias) to easier migrate devices and such

### 1.8.0 (2018-04-29)
* (Apollon77) Update sqlite3, nodejs 10 compatible
* (BuZZy1337) Admin fix

### 1.7.4 (2018-04-15)
* (Apollon77) Fix getHistory

### 1.7.3 (2018-03-28)
* (Apollon77) Respect 'keep forever' setting for retention from data point configuration

### 1.7.2 (2018-03-24)
* (Apollon77) Disable to write NULLs for SQLite

### 1.7.1 (2018-02-10)
* (Apollon77) Make option to write NULL values on start/stop boundaries configurable

### 1.6.9 (2018-02-07)
* (bondrogeen) Admin3 Fixes
* (Apollon77) optimize relog feature and other things

### 1.6.7 (2018-01-31)
* (Bluefox) Admin3 Fixes
* (Apollon77) Relog and null log fixes

### 1.6.2 (2018-01-30)
* (Apollon77) Admin3 Fixes

### 1.6.0 (2018-01-14)
* (bluefox) Ready for Admin3

### 1.5.8 (2017-10-05)
* (Apollon77) fix relog value feature

### 1.5.7 (2017-08-10)
* (bluefox) add "save last value" option

### 1.5.6 (2017-08-02)
* (Apollon77) fix behaviour of log interval to always log the current value

### 1.5.4 (2017-06-12)
* (Apollon77) fix dependency to other library

### 1.5.3 (2017-04-07)
* (Apollon77) fix in datatype conversions

### 1.5.0 (2017-03-02)
* (Apollon77) Add option to define storage datatype per datapoint inclusing converting the value if needed

### 1.4.6 (2017-02-25)
* (Apollon77) Fix typo with PostgrSQL

### 1.4.5 (2017-02-18)
* (Apollon77) Small fix again for older configurations
* (Apollon77) fix for DBConverter Analyze function

### 1.4.3 (2017-02-11)
* (Apollon77) Small fix for older configurations

### 1.4.2 (2017-01-16)
* (bluefox) Fix handling of float values in Adapter config and Datapoint config.

### 1.4.1
* (Apollon77) Rollback to sql-client 0.7 to get rid of the mmagic dependecy that brings problems on older systems

### 1.4.0 (2016-12-02)
* (Apollon77) Add messages enableHistory/disableHistory
* (Apollon77) add support to log changes only if value differs a minimum value for numbers

### 1.3.4 (2016-11)
* (Apollon77) Allow database names with '-' for MySQL

### 1.3.3 (2016-11)
* (Apollon77) Update dependecies

### 1.3.2 (2016-11-21)
* (bluefox) Fix insert of string with '

### 1.3.0 (2016-10-29)
* (Apollon77) add option to re-log unchanged values to make it easier for visualization

### 1.2.1 (2016-08-30)
* (bluefox) Fix selector for SQL objects

### 1.2.0 (2016-08-30)
* (bluefox) сompatible only with new admin

### 1.0.10 (2016-08-27)
* (bluefox) change name of object from "history" to "custom"

### 1.0.10 (2016-07-31)
* (bluefox) fix multi requests if sqlite

### 1.0.9 (2016-06-14)
* (bluefox) allow settings for parallel requests

### 1.0.7 (2016-05-31)
* (bluefox) draw line to the end if ignore null

### 1.0.6 (2016-05-30)
* (bluefox) allow setup DB name for mysql and mssql

### 1.0.5 (2016-05-29)
* (bluefox) switch max and min with each other

### 1.0.4 (2016-05-29)
* (bluefox) check retention of data if set "never"

### 1.0.3 (2016-05-28)
* (bluefox) try to calculate old timestamps

### 1.0.2 (2016-05-24)
* (bluefox) fix error with io-package

### 1.0.1 (2016-05-24)
* (bluefox) fix error with SQLite

### 1.0.0 (2016-05-20)
* (bluefox) change default aggregation name

### 0.3.3 (2016-05-18)
* (bluefox) fix postgres

### 0.3.2 (2016-05-13)
* (bluefox) queue select if IDs and FROMs queries for sqlite

### 0.3.1 (2016-05-12)
* (bluefox) queue delete queries too for sqlite

### 0.3.0 (2016-05-08)
* (bluefox) support of custom queries
* (bluefox) only one request simultaneously for sqlite
* (bluefox) add tests (primitive and only sql)

### 0.2.0 (2016-04-30)
* (bluefox) support of milliseconds
* (bluefox) fix sqlite

### 0.1.4 (2016-04-25)
* (bluefox) fix deletion of old entries

### 0.1.3 (2016-03-08)
* (bluefox) do not print errors twice

### 0.1.2 (2015-12-22)
* (bluefox) fix MS-SQL port settings

### 0.1.1 (2015-12-19)
* (bluefox) fix error with double entries

### 0.1.0 (2015-12-14)
* (bluefox) support of strings

### 0.0.3 (2015-12-06)
* (smiling_Jack) Add demo Data ( todo: faster insert to db )
* (smiling_Jack) change aggregation (now same as history Adapter)
* (bluefox) bug fixing

### 0.0.2 (2015-12-06)
* (bluefox) allow only 1 client for SQLite

### 0.0.1 (2015-11-19)
* (bluefox) initial commit

## License

The MIT License (MIT)

Copyright (c) 2015-2021 bluefox <dogafox@gmail.com>, Apollon77

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.