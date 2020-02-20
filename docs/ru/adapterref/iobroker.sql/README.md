---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sql/README.md
title: ioBroker.sql
hash: kOf3oPq4qStRFDipZVtBzb4+UGhHEUFhZ2n7hKt1Hhg=
---
![логотип](../../../en/adapterref/iobroker.sql/admin/sql.png)

![Количество установок](http://iobroker.live/badges/sql-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.sql.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sql.svg)
![тесты](https://travis-ci.org/ioBroker/ioBroker.sql.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.sql.png?downloads=true)
![Значок Greenkeeper](https://badges.greenkeeper.io/ioBroker/ioBroker.sql.svg)

# IoBroker.sql
==================================

Этот адаптер сохраняет историю состояний в БД SQL.

Поддерживает PostgreSQL, MySQL, Microsoft SQL Server и SQLite.
Вы можете оставить порт 0, если требуется порт по умолчанию.

### MS-SQL:
Используйте ```localhost\instance``` для хоста и проверьте, включены ли соединения TCP / IP.
https://msdn.microsoft.com/en-us/library/bb909712(v=vs.90).aspx

### SQLite:
"file" -DB и не может управлять слишком многими событиями. Если у вас большой объем данных, используйте реальные БД, такие как PostgreSQL и co.

БД SQLite не должна быть установлена дополнительно. Это просто файл на диске, но для его установки вам понадобятся инструменты сборки в вашей системе. Для Linux просто напишите:

```
sudo apt-get install build-essential
```

Для окон:

```
c:\>npm install --global --production windows-build-tools
```

А затем переустановите адаптер, например:

```
cd /opt/iobroker
iobroker stop sql
npm install iobroker.sql --production
iobroker start sql
```

### MySQL:
Вы можете установить MySQL на Linux-системах:

```
apt-get install mysql-server mysql-client

mysql -uroot -p

CREATE USER 'iobroker'@'%' IDENTIFIED BY 'iobroker';
GRANT ALL PRIVILEGES ON * . * TO 'iobroker'@'%';
FLUSH PRIVILEGES;
```

При необходимости отредактируйте */ etc / mysql / my.cnf* чтобы установить привязку к IP-адресу для удаленного подключения.

** Предупреждение **: пользователь iobroker - «admin». При необходимости предоставьте ограниченные права пользователю iobroker.

## Структура БД
Имя базы данных по умолчанию - «iobroker», но его можно изменить в конфигурации.

### Источники Эта таблица представляет собой список экземпляров адаптера, в которые были записаны записи. (State.from)
| БД | Имя в запросе |
|------------|----------------------|
| MS-SQL | iobroker.dbo.sources |
| MySQL | iobroker.sources |
| PostgreSQL | источники |
| SQLite | источники |

Состав:

| Поле | Тип | Описание |
|-------|--------------------------------------------|-------------------------------------------|
| id | INTEGER NOT NULL ПЕРВИЧНАЯ КЛЮЧЕВАЯ ИДЕНТИЧНОСТЬ (1,1) | уникальный идентификатор |
| имя | varchar (255) / ТЕКСТ | экземпляр адаптера, который написал запись |

* Примечание: * MS-SQL использует varchar (255), а другие используют TEXT

### Datapoints
Эта таблица представляет собой список точек данных. (Идентификаторы)

| БД | Имя в запросе |
|------------|-------------------------|
| MS-SQL | iobroker.dbo.datapoints |
| MySQL | iobroker.datapoints |
| PostgreSQL | точки данных |
| SQLite | точки данных |

Состав:

| Поле | Тип | Описание |
|-------|--------------------------------------------|-------------------------------------------------|
| id | INTEGER NOT NULL ПЕРВИЧНАЯ КЛЮЧЕВАЯ ИДЕНТИЧНОСТЬ (1,1) | уникальный идентификатор |
| имя | varchar (255) / ТЕКСТ | ID переменной, например, hm-rpc.0.JEQ283747.1.STATE |
| тип | INTEGER | 0 - число, 1 - строка, 2 - логическое значение |

* Примечание: * MS-SQL использует varchar (255), а другие используют TEXT

### Числа
Значения для состояний с типом «число». **ts** означает «временной ряд».

| БД | Имя в запросе |
|------------|-------------------------|
| MS-SQL | iobroker.dbo.ts_number |
| MySQL | iobroker.ts_number |
| PostgreSQL | ts_number |
| SQLite | ts_number |

Состав:

| Поле | Тип | Описание |
|--------|--------------------------------------------|-------------------------------------------------|
| id | INTEGER | Идентификатор состояния из таблицы «Datapoints» |
| тс | BIGINT / INTEGER | Время в мс до эпохи. Может быть преобразовано во время с помощью «новой даты (ts)» |
| val | НАСТОЯЩИЙ | Значение |
| Ack | BIT / BOOLEAN | Признается: 0 - не подтверждено, 1 - подтверждено |
| _from | INTEGER | Идентификатор источника из таблицы "Источники" |
| q | INTEGER | Качество как номер. Вы можете найти описание [Вот](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#states) |

* Примечание: * MS-SQL использует BIT, а другие используют BOOLEAN. SQLite использует для TS INTEGER и всех других BIGINT.

### Строки
Значения для состояний с типом «строка».

| БД | Имя в запросе |
|------------|-------------------------|
| MS-SQL | iobroker.dbo.ts_string |
| MySQL | iobroker.ts_string |
| PostgreSQL | ts_string |
| SQLite | ts_string |

Состав:

| Поле | Тип | Описание |
|--------|--------------------------------------------|-------------------------------------------------|
| id | INTEGER | Идентификатор состояния из таблицы «Datapoints» |
| тс | BIGINT | Время в мс до эпохи. Может быть преобразовано во время с помощью «новой даты (ts)» |
| val | ТЕКСТ | Значение |
| Ack | BIT / BOOLEAN | Признается: 0 - не подтверждено, 1 - подтверждено |
| _from | INTEGER | Идентификатор источника из таблицы "Источники" |
| q | INTEGER | Качество как номер. Вы можете найти описание [Вот](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#states) |

* Примечание: * MS-SQL использует BIT, а другие используют BOOLEAN. SQLite использует для TS INTEGER и всех других BIGINT.

### Booleans
Значения для состояний с типом «логическое».

| БД | Имя в запросе |
|------------|-------------------------|
| MS-SQL | iobroker.dbo.ts_bool |
| MySQL | iobroker.ts_bool |
| PostgreSQL | ts_bool |
| SQLite | ts_bool |

Состав:

| Поле | Тип | Описание |
|--------|--------------------------------------------|-------------------------------------------------|
| id | INTEGER | Идентификатор состояния из таблицы «Datapoints» |
| тс | BIGINT | Время в мс до эпохи. Может быть преобразовано во время с помощью «новой даты (ts)» |
| val | BIT / BOOLEAN | Значение |
| Ack | BIT / BOOLEAN | Признается: 0 - не подтверждено, 1 - подтверждено |
| _from | INTEGER | Идентификатор источника из таблицы "Источники" |
| q | INTEGER | Качество как номер. Вы можете найти описание [Вот](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#states) |

* Примечание: * MS-SQL использует BIT, а другие используют BOOLEAN. SQLite использует для TS INTEGER и всех других BIGINT.

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

Или получить записи за последний час для ID = system.adapter.admin.0.memRss

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

## StoreState
Если вы хотите записать другие данные в InfluxDB, вы можете использовать встроенную системную функцию **storeState** Эта функция также может использоваться для преобразования данных из других адаптеров History, таких как History или SQL.

Указанные идентификаторы не проверяются в базе данных ioBroker и не требуют настройки там, а доступны только напрямую.

Сообщение может иметь один из следующих трех форматов:

* один идентификатор и один объект состояния
* один идентификатор и массив объектов состояния
* массив из нескольких идентификаторов с объектами состояния

## Получить историю
В дополнение к пользовательским запросам вы можете использовать встроенную системную функцию **getHistory**

```
var end = new Date().getTime();
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

## Управление журналом истории через Javascript
Адаптер поддерживает включение и отключение ведения журнала истории через JavaScript, а также получение списка включенных точек данных с их настройками.

### Включить
Сообщение должно иметь «id» точки данных. Дополнительно необязательные «options» определяют специфические параметры точки данных:

```
sendTo('sql.0', 'enableHistory', {
    id: 'system.adapter.sql.0.memRss',
    options: {
        changesOnly:  true,
        debounce:     0,
        retention:    31536000,
        maxLength:    3,
        changesMinDelta: 0.5,
        aliasId: ""
    }
}, function (result) {
    if (result.error) {
        console.log(result.error);
    }
    if (result.success) {
        //successfull enabled
    }
});
```

### Отключить
В сообщении необходимо указать «id» точки данных.

```
sendTo('sql.0', 'disableHistory', {
    id: 'system.adapter.sql.0.memRss',
}, function (result) {
    if (result.error) {
        console.log(result.error);
    }
    if (result.success) {
        //successfull enabled
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
- **Тип БД** Тип БД SQL: MySQL, PostgreSQL, MS-SQL или SQLite3
- **Хост** IP-адрес или имя хоста с SQL Server
- **Порт** порт SQL Server (оставьте пустым, если не уверены)
- **Имя базы данных** Имя базы данных. По умолчанию iobroker
- **Пользователь** имя пользователя для SQL. Должен существовать в БД.
- **Пароль** пароль для SQL.
- **Подтверждение пароля** просто повторите пароль здесь.
- **Зашифровать** некоторые БД поддерживают шифрование.
- **Округление до** количество цифр после запятой.
- **Разрешить параллельные запросы** разрешить одновременные запросы SQL к БД.

## Настройки по умолчанию
- **Интервал отмены отказов** Не сохраняйте значения чаще, чем этот интервал.
- **Записывать неизмененные значения любые** записывать значения каждые X секунд.
- **Минимальная разница от последнего значения к журналу** минимальный интервал между двумя значениями.
- **Хранение хранения** как долго значения будут храниться в БД.

## 1.10.0 (2019-07-xx) WIP !!
* (bluefox) Конвертировать в ES6

## 1.9.5 (2019-05-15)
* (Apollon77) Добавить поддержку для nodejs 12

## 1.9.4 (2019-02-24)
* (Apollon77) Исправлено несколько мелких проблем и тем
* (Apollon77) Оптимизация текстов (для Admin v3 UI)

## 1.9.0 (2018-06-19)
* (Apollon77) Добавлена возможность регистрировать точки данных как другие идентификаторы (псевдонимы) для упрощения миграции устройств и т. П.

## 1.8.0 (2018-04-29)
* (Apollon77) Обновление sqlite3, совместимо с nodejs 10
* (BuZZy1337) Исправление администратора

## 1.7.4 (2018-04-15)
* (Apollon77) Исправление getHistory

## 1.7.3 (2018-03-28)
* (Apollon77) Соблюдайте настройку «сохранить навсегда» для сохранения из конфигурации datapoint

## 1.7.2 (2018-03-24)
* (Apollon77) Отключить запись NULL для SQLite

## 1.7.1 (2018-02-10)
* (Apollon77) Возможность настройки записи значений NULL на границах начала / остановки

## 1.6.9 (2018-02-07)
* (bondrogeen) Admin3 Исправления
* (Apollon77) оптимизировать функцию relog и многое другое

## 1.6.7 (2018-01-31)
* (Bluefox) Admin3 Исправления
* (Apollon77) Исправления в логах и нулевых логах

## 1.6.2 (2018-01-30)
* (Apollon77) Admin3 Исправления

## 1.6.0 (2018-01-14)
* (bluefox) готов для администратора3

## 1.5.8 (2017-10-05)
* (Apollon77) исправлено свойство значения журнала

## 1.5.7 (2017-08-10)
* (bluefox) добавить опцию «сохранить последнее значение»

## 1.5.6 (2017-08-02)
* (Apollon77) исправлено поведение журнала интервалов, чтобы всегда записывать текущее значение

## 1.5.4 (2017-06-12)
* (Apollon77) исправление зависимости от другой библиотеки

## 1.5.3 (2017-04-07)
* (Apollon77) исправлено в преобразованиях типов данных

### 1.5.0 (2017-03-02)
* (Apollon77) Добавить опцию, чтобы определить тип данных хранилища для каждой точки данных, включая преобразование значения при необходимости

### 1.4.6 (2017-02-25)
* (Apollon77) Исправление опечатки в PostgrSQL

### 1.4.5 (2017-02-18)
* (Apollon77) Небольшое исправление снова для старых конфигураций
* (Apollon77) исправлено для функции анализа DBConverter

### 1.4.3 (2017-02-11)
* (Apollon77) Небольшое исправление для старых конфигураций

### 1.4.2 (2017-01-16)
* (bluefox) Исправлена обработка значений с плавающей точкой в конфигурации адаптера и конфигурации Datapoint.

### 1.4.1
* (Apollon77) Откат к sql-client 0.7, чтобы избавиться от зависимости mmagic, которая вызывает проблемы на старых системах

### 1.4.0 (2016-12-02)
* (Apollon77) Добавление сообщений enableHistory / disableHistory
* (Apollon77) добавить поддержку для регистрации изменений, только если значение отличается от минимального значения для чисел

### 1.3.4 (2016-11)
* (Apollon77) Разрешить имена баз данных с '-' для MySQL

### 1.3.3 (2016-11)
* (Apollon77) Обновление зависимостей

### 1.3.2 (2016-11-21)
* (bluefox) Исправить вставку строки с помощью '

### 1.3.0 (2016-10-29)
* (Apollon77) добавить опцию, чтобы повторно регистрировать неизмененные значения, чтобы упростить визуализацию

### 1.2.1 (2016-08-30)
* (bluefox) Исправлен селектор для объектов SQL

### 1.2.0 (2016-08-30)
* (bluefox) совместимо только с новым администратором

### 1.0.10 (2016-08-27)
* (bluefox) изменить имя объекта с «история» на «пользовательский»

### 1.0.10 (2016-07-31)
* (bluefox) исправляет несколько запросов, если sqlite

### 1.0.9 (2016-06-14)
* (bluefox) разрешить настройки для параллельных запросов

### 1.0.7 (2016-05-31)
* (bluefox) рисует линию до конца, если игнорирует ноль

### 1.0.6 (2016-05-30)
* (bluefox) разрешить установку имени БД для mysql и mssql

### 1.0.5 (2016-05-29)
* (bluefox) переключают макс и мин между собой

### 1.0.4 (2016-05-29)
* (bluefox) проверяет сохранение данных, если установлено «никогда»

### 1.0.3 (2016-05-28)
* (bluefox) попытайтесь вычислить старые временные метки

### 1.0.2 (2016-05-24)
* (bluefox) исправить ошибку с io-пакетом

### 1.0.1 (2016-05-24)
* (bluefox) исправить ошибку с SQLite

### 1.0.0 (2016-05-20)
* (bluefox) изменить имя агрегации по умолчанию

### 0.3.3 (2016-05-18)
* (bluefox) исправление postgres

### 0.3.2 (2016-05-13)
* (bluefox) очередь выбирает, если ID и запросы FROMs для sqlite

### 0.3.1 (2016-05-12)
* (bluefox) запросы на удаление очереди тоже для sqlite

### 0.3.0 (2016-05-08)
* (bluefox) поддержка пользовательских запросов
* (bluefox) только один запрос одновременно на sqlite
* (bluefox) добавить тесты (примитив и только sql)

### 0.2.0 (2016-04-30)
* (bluefox) поддержка миллисекунд
* (bluefox) исправить sqlite

### 0.1.4 (2016-04-25)
* (bluefox) исправление удаления старых записей

### 0.1.3 (2016-03-08)
* (bluefox) не печатать ошибки дважды

### 0.1.2 (2015-12-22)
* (bluefox) исправление настроек порта MS-SQL

### 0.1.1 (2015-12-19)
* (bluefox) исправить ошибку с двойными записями

### 0.1.0 (2015-12-14)
* (bluefox) поддержка строк

### 0.0.3 (2015-12-06)
* (Smiling_Jack) Добавить демонстрационные данные (todo: более быстрая вставка в БД)
* (smiling_Jack) изменение агрегации (теперь аналогично истории Adapter)
* (bluefox) исправление ошибок

### 0.0.2 (2015-12-06)
* (bluefox) разрешить только 1 клиент для SQLite

### 0.0.1 (2015-11-19)
* (bluefox) начальная фиксация

## Changelog

## License

The MIT License (MIT)

Copyright (c) 2015-2018 bluefox <dogafox@gmail.com>, Apollon77

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