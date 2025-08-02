---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sql/README.md
title: ioBroker.sql
hash: 02osqmZvJf24Pzwy/ep9AOBI5nqWUoRwZpF5L1cfL3E=
---
![Логотип](../../../en/adapterref/iobroker.sql/admin/sql.png)

![Количество установок](http://iobroker.live/badges/sql-stable.svg)
![версия НПМ](http://img.shields.io/npm/v/iobroker.sql.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sql.svg)
![Тесты](https://travis-ci.org/ioBroker/ioBroker.sql.svg?branch=master)
![НПМ](https://nodei.co/npm/iobroker.sql.png?downloads=true)

# IoBroker.sql
Этот адаптер сохраняет историю состояний в базе данных SQL.

Поддерживает PostgreSQL, mysql, Microsoft SQL Server и sqlite.
Вы можете оставить порт 0, если вам нужен порт по умолчанию.

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Более подробную информацию и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

## Настройки
## Настройки подключения
- **Тип БД**: Тип базы данных SQL: MySQL, PostgreSQL, MS-SQL или SQLite3
- **Хост**: IP-адрес или имя хоста с SQL Server
- **Порт**: порт SQL Server (оставьте пустым, если не уверены)
- **Имя базы данных**: Имя базы данных. По умолчанию iobroker
- **Пользователь**: Имя пользователя для SQL. Должно существовать в БД.
- **Пароль**: Пароль для SQL.
- **Подтверждение пароля**: просто повторите пароль здесь.
- **Шифрование**: некоторые базы данных поддерживают шифрование.
- **Округлить действительное число до**: количества цифр после запятой.
- **Разрешить параллельные запросы**: разрешить одновременные SQL-запросы к базе данных.
- **Не создавать базу данных**: активируйте эту опцию, если база данных уже создана (например, администратором) и у пользователя ioBroker недостаточно прав для создания базы данных.

## Настройки по умолчанию
- **Время дребезга** - Защита от нестабильных значений, чтобы гарантировать, что регистрируются только стабильные значения, если значение не изменилось в течение определенного количества миллисекунд. ВНИМАНИЕ: Если значения меняются чаще, то эта настройка фактически не будет регистрировать ни одно значение (потому что любое значение нестабильно)
- **Blocktime** - Определяет, как долго после сохранения последнего значения не сохраняется никаких дополнительных значений. Когда указанное время в миллисекундах истекает, то регистрируется следующее значение, которое удовлетворяет всем остальным проверкам.
- **Записывать только изменения** - Эта функция гарантирует, что будут регистрироваться только измененные значения, если они соответствуют другим проверкам (см. ниже). Одинаковые значения не будут регистрироваться.
- **все еще записывать те же значения (секунды)** - При использовании "Записывать только изменения" вы можете установить здесь интервал времени в секундах, после которого также неизмененные значения будут повторно зарегистрированы в БД. Вы можете обнаружить значения, повторно зарегистрированные адаптером, с помощью поля "from".
- **Минимальное отличие от последнего значения** - При использовании "Записывать только изменения" вы можете определить требуемое минимальное отличие между новым значением и последним значением. Если оно не достигнуто, значение не записывается.
- **игнорировать значения 0 или NULL (==0)** - Вы можете определить, следует ли игнорировать значения 0 или NULL.
- **игнорировать значения ниже нуля (<0)** - Вы можете определить, следует ли игнорировать значения ниже нуля.
- **Отключить оптимизированную для построения диаграмм регистрацию пропущенных значений** - По умолчанию адаптер пытается записать значения для оптимизированной диаграммы. Это может означать, что дополнительные значения (например, не прошедшие все проверки выше) будут автоматически регистрироваться. Если это нежелательно, вы можете отключить эту функцию.
- **Alias-ID** - Вы можете определить псевдоним для ID. Это полезно, если вы сменили устройство и хотите иметь непрерывную регистрацию данных. Пожалуйста, рассмотрите возможность перехода на настоящие псевдонимы States в будущем!
- **Сохранение данных** - Сколько значений в прошлом будет храниться на диске. Данные удаляются по достижении времени, как только новые данные должны быть сохранены для точки данных.
- **Максимальное количество хранимых в ОЗУ значений** - Определите, сколько значений будет храниться в ОЗУ перед сохранением их на диске. Вы можете контролировать объем операций ввода-вывода.
- **Включить расширенные журналы отладки для точки данных** - Если вы хотите увидеть более подробные журналы для этой точки данных, вы можете включить эту опцию. Вам все равно нужно включить уровень журнала "debug", чтобы эти дополнительные значения были видны! Это помогает в отладке проблем или понимании того, почему адаптер регистрирует значение (или нет).

Большинство этих значений можно предварительно определить в настройках экземпляра, а затем предварительно заполнить или использовать для точки данных.

## Советы по установке базы данных
### MS-SQL:
Используйте ```localhost\instance``` для хоста и проверьте, включены ли соединения TCP/IP.
https://msdn.microsoft.com/en-us/library/bb909712(v=vs.90).aspx

### SQLite:
это "файл"-БД и не может управлять слишком большим количеством событий. Если у вас большой объем данных, используйте настоящую БД, например PostgreSQL и т. д.

SQLite DB не нужно устанавливать отдельно. Это просто файл на диске, но для его установки вам потребуются инструменты сборки в вашей системе. Для Linux просто напишите:

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
Установить MySQL на Linux-системы можно следующим образом:

```
apt-get install mysql-server mysql-client

mysql -u root -p

CREATE USER 'iobroker'@'%' IDENTIFIED BY 'iobroker';
GRANT ALL PRIVILEGES ON * . * TO 'iobroker'@'%';
FLUSH PRIVILEGES;
```

При необходимости отредактируйте */etc/mysql/my.cnf*, чтобы установить привязку к IP-адресу для удаленного подключения.

**Предупреждение**: пользователь iobroker — «администратор». При необходимости предоставьте ограниченные права пользователю iobroker.

На «windows» его можно легко установить через установщик: https://dev.mysql.com/downloads/installer/.

Обратите внимание на метод аутентификации. Новый алгоритм шифрования в MySQL 8.0 пока не поддерживается `node.js`, и вам необходимо выбрать устаревший метод аутентификации.

![Окна](../../../en/adapterref/iobroker.sql/img/WindowsMySQLinstaller.png)

## Структура БД
Имя базы данных по умолчанию — `iobroker`, но его можно изменить в конфигурации.

### Источники Эта таблица представляет собой список экземпляров адаптера, которые записали записи. (state.from)
| БД | Имя в запросе |
|------------|----------------------|
| MS-SQL | iobroker.dbo.sources |
| MySQL | iobroker.sources |
| PostgreSQL | источники |
| SQLite | источники |

Структура:

| Поле | Тип | Описание |
|-------|--------------------------------------------|-------------------------------------------|
| id | ЦЕЛОЕ ЧИСЛО НЕ NULL ПЕРВИЧНЫЙ КЛЮЧ IDENTITY(1,1) | уникальный ID |
| имя | varchar(255) / ТЕКСТ | экземпляр адаптера, который записал запись |

*Примечание:* MS-SQL использует varchar(255), а другие используют TEXT

### Точки данных
Эта таблица представляет собой список точек данных. (Идентификаторы)

| БД | Имя в запросе |
|------------|-------------------------|
| MS-SQL | iobroker.dbo.datapoints |
| MySQL | iobroker.datapoints |
| PostgreSQL | точки данных |
| SQLite | точки данных |

Структура:

| Поле | Тип | Описание |
|-------|--------------------------------------------|-------------------------------------------------|
| id | ЦЕЛОЕ ЧИСЛО НЕ NULL ПЕРВИЧНЫЙ КЛЮЧ IDENTITY(1,1) | уникальный ID |
| имя | varchar(255) / ТЕКСТ | Идентификатор переменной, например hm-rpc.0.JEQ283747.1.STATE |
| тип | INTEGER | 0 - число, 1 - строка, 2 - логическое значение |

*Примечание:* MS-SQL использует varchar(255), а другие используют TEXT

### Числа
Значения для состояний с типом «число». **ts** означает «временной ряд».

| БД | Имя в запросе |
|------------|-------------------------|
| MS-SQL | iobroker.dbo.ts_number |
| MySQL | iobroker.ts_number |
| PostgreSQL | ts_number |
| SQLite | ts_number |

Структура:

| Поле | Тип | Описание |
|--------|--------------------------------------------|-------------------------------------------------|
| id | INTEGER | ID состояния из таблицы «Точки данных» |
| ts | BIGINT / INTEGER | Время в мс до эпохи. Может быть преобразовано во время с помощью "new Date(ts)" |
| val | РЕАЛЬНЫЙ | Значение |
| ack | BIT/BOOLEAN | Подтверждено: 0 - не подтверждено, 1 - подтверждено |
| _from | INTEGER | ID источника из таблицы «Источники» |
| q | ЦЕЛОЕ ЧИСЛО | Качество как число. Описание можно найти [здесь](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#states) |

*Примечание:* MS-SQL использует BIT, а другие используют BOOLEAN. SQLite использует для ts INTEGER, а все остальные BIGINT.

Пользователь может определить дополнительно к типу `number` функциональность `counters`. Для этого создается следующая таблица:

| БД | Имя в запросе |
|------------|-------------------------|
| MS-SQL | iobroker.dbo.ts_counter |
| MySQL | iobroker.ts_counter |
| PostgreSQL | ts_counter |
| SQLite | ts_counter |

Структура:

| Поле | Тип | Описание |
|--------|--------------------------------------------|-------------------------------------------------|
| id | INTEGER | ID состояния из таблицы «Точки данных» |
| ts | BIGINT / INTEGER | Время в мс до эпохи. Может быть преобразовано во время с помощью "new Date(ts)" |
| val | РЕАЛЬНЫЙ | Значение |

В этой таблице хранятся значения, когда счетчик был заменен, и значение не увеличилось, но не достигло нуля или меньшего значения.

### Струны
Значения для состояний с типом `string`.

| БД | Имя в запросе |
|------------|-------------------------|
| MS-SQL | iobroker.dbo.ts_string |
| MySQL | iobroker.ts_string |
| PostgreSQL | ts_string |
| SQLite | ts_string |

Структура:

| Поле | Тип | Описание |
|--------|--------------------------------------------|-------------------------------------------------|
| id | INTEGER | ID состояния из таблицы «Точки данных» |
| ts | BIGINT | Время в мс до эпохи. Может быть преобразовано во время с помощью "new Date(ts)" |
| val | ТЕКСТ | Значение |
| ack | BIT/BOOLEAN | Подтверждено: 0 - не подтверждено, 1 - подтверждено |
| _from | INTEGER | ID источника из таблицы «Источники» |
| q | ЦЕЛОЕ ЧИСЛО | Качество как число. Описание можно найти [здесь](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#states) |

*Примечание:* MS-SQL использует BIT, а другие используют BOOLEAN. SQLite использует для ts INTEGER, а все остальные BIGINT.

### Булевы значения
Значения для состояний с типом `boolean`.

| БД | Имя в запросе |
|------------|-------------------------|
| MS-SQL | iobroker.dbo.ts_bool |
| MySQL | iobroker.ts_bool |
| PostgreSQL | ts_bool |
| SQLite | ts_bool |

Структура:

| Поле | Тип | Описание |
|--------|--------------------------------------------|-------------------------------------------------|
| id | INTEGER | ID состояния из таблицы «Точки данных» |
| ts | BIGINT | Время в мс до эпохи. Может быть преобразовано во время с помощью "new Date(ts)" |
| val | BIT/BOOLEAN | Значение |
| ack | BIT/BOOLEAN | Подтверждено: 0 - не подтверждено, 1 - подтверждено |
| _from | INTEGER | ID источника из таблицы «Источники» |
| q | ЦЕЛОЕ ЧИСЛО | Качество как число. Описание можно найти [здесь](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#states) |

*Примечание:* MS-SQL использует BIT, а другие используют BOOLEAN. SQLite использует для ts INTEGER, а все остальные BIGINT.

## Доступ к значениям из адаптера Javascript
Доступ к отсортированным значениям можно получить из адаптера Javascript.

* Получите 50 последних сохраненных событий для всех идентификаторов

```
sendTo('sql.0', 'getHistory', {
    id: '*',
    options: {
        end:       Date.now(),
        count:     50,
        aggregate: 'onchange',
        addId: true
    }
}, function (result) {
    for (var i = 0; i < result.result.length; i++) {
        console.log(result.result[i].id + ' ' + new Date(result.result[i].ts).toISOString());
    }
});
```

* Получить сохраненные значения для "system.adapter.admin.0.memRss" за последний час

```
var end = Date.now();
sendTo('sql.0', 'getHistory', {
    id: 'system.adapter.admin.0.memRss',
    options: {
        start:      end - 3600000,
        end:        end,
        aggregate: 'onchange',
        addId: true
    }
}, function (result) {
    for (var i = 0; i < result.result.length; i++) {
        console.log(result.result[i].id + ' ' + new Date(result.result[i].ts).toISOString());
    }
});
```

Возможные варианты:

- **start** - (необязательно) время в мс - *Date.now()*'
- **end** - (необязательно) время в мс - *Date.now()*', по умолчанию (сейчас + 5000 секунд)
- **step** - (необязательно) используется в совокупности (макс., мин., средн., всего, ...) шаг в мс интервалов
- **count** - количество значений, если агрегат - 'onchange' или количество интервалов, если другой метод агрегации. Количество будет игнорироваться, если задан шаг, в противном случае значение по умолчанию - 500, если не задано
- **от** - если поле *от* должно быть включено в ответ
- **ack** - если поле *ack* должно быть включено в ответ
- **q** - если поле *q* должно быть включено в ответ
- **addId** - если поле *id* должно быть включено в ответ
- **limit** - не возвращать больше записей, чем лимит
- **округлить** - округлить результат до количества знаков после запятой
- **ignoreNull** - если нулевые значения должны быть включены (false), заменить на последнее ненулевое значение (true) или заменить на 0 (0)
- **removeBorderValues** - По умолчанию возвращаются дополнительные значения границ для оптимизации диаграмм. Установите этот параметр в значение true, если это нежелательно (например, для обработки данных скрипта)
- **returnNewestEntries** - Возвращаемые данные всегда сортируются по возрастанию временной метки. При использовании агрегата "none" и указании "count" или "limit" это означает, что обычно возвращаются самые старые записи (если только не указаны начальные данные). Установите этот параметр в значение true, чтобы получить самые новые записи.
- **aggregate** - метод агрегации (по умолчанию: «среднее»):
- *minmax* - используется специальный алгоритм. Разбить весь временной диапазон на небольшие интервалы и найти для каждого интервала макс, мин, начальное и конечное значения.
- *max* - Разбить весь временной диапазон на небольшие интервалы и найти для каждого интервала максимальное значение, а затем использовать его для этого интервала (нулевые значения будут игнорироваться).
- *min* - То же, что и max, но принимает минимальное значение.
- *среднее* - То же, что и максимальное, но берется среднее значение.
- *итого* - То же, что и max, но рассчитывается общее значение.
- *count* - То же, что и max, но вычисляет количество значений (нулевые значения будут вычислены).
- *процентиль* - вычислить n-й процентиль (n указывается в `options.percentile` или по умолчанию 50, если не указано иное).
- *quantile* - Рассчитать n-ный квантиль (n указывается в options.quantile или по умолчанию 0,5, если не указано иное).
- *интеграл* - Вычислить интеграл (дополнительные параметры см. ниже).
- *нет* - Никакого агрегирования вообще. Только необработанные значения за указанный период.
- **процентиль** - (необязательно) при использовании метода агрегации «процентиль» определяет уровень процентиля (0..100) (по умолчанию 50)
- **quantile** - (необязательно) при использовании метода агрегации «quantile» определяет уровень квантиля (0..1) (по умолчанию 0,5)
- **integralUnit** - (необязательно) при использовании метода агрегации «integral» определяет единицу в секундах (по умолчанию 60 с). Например, чтобы получить интеграл в часах для Вт·ч или т. п., установите значение 3600.
- **integralInterpolation** - (необязательно) при использовании агрегатного метода «integral» определяет метод интерполяции (по умолчанию «none»).
- *линейный* - линейная интерполяция
- *нет* - без/пошаговая интерполяция

Первая и последняя точки будут рассчитаны для агрегаций, за исключением агрегации `none`.
Если вы вручную запрашиваете некоторую агрегацию, вам следует игнорировать первое и последнее значения, поскольку они рассчитываются из значений за пределами периода.

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

Если счетчик будет заменен, то он также будет рассчитан.

## Пользовательские запросы
Пользователь может выполнять пользовательские запросы к таблицам из адаптера JavaScript:

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

В зависимости от базы данных перед именем таблицы необходимо вставить имя базы данных или имя базы данных + схему — см. поля выше в разделе «Структура баз данных».

Пример, если ваша база данных называется «iobroker»:

| БД | Имя в запросе |
|------------|------------------------------------------|
| MS-SQL | ВЫБРАТЬ * ИЗ iobroker.dbo.datapoints ...|
| MySQL | SELECT * FROM iobroker.datapoints ... |

## StoreState
Если вы хотите записать другие данные в базу данных SQL, вы можете использовать встроенную системную функцию **storeState**. Эту функцию также можно использовать для преобразования данных из других адаптеров истории, таких как InfluxDB или SQL.

Успешный ответ не означает, что данные действительно записаны на диск. Это просто означает, что они были обработаны!

Указанные идентификаторы не проверяются по базе данных ioBroker и не требуют настройки или включения там. Если собственные идентификаторы используются без настроек, то параметр "rules" не поддерживается и приведет к ошибке. Для таких идентификаторов используется значение по умолчанию "Maximal number of saved in RAM values".

Сообщение может иметь один из следующих трех форматов:

1. один идентификатор и один объект состояния
2. один идентификатор и массив объектов состояния
3. массив из нескольких идентификаторов с одним объектом состояния каждый

```javascript
// 1.
sendTo('sql.0', 'storeState', {
    id: 'mbus.0.counter.xxx',
    state: {
        ts: 1589458809352,
        val: 123,
        ack: false,
        from: 'system.adapter.whatever.0'
    }
}, result => console.log('added'));

// 2.
sendTo('sql.0', 'storeState', {
    id: 'mbus.0.counter.xxx',
    state: [
        {
            ts: 1589458809352,
            val: 123,
            ack: false,
            from: 'system.adapter.whatever.0'
        },
        {
            ts: 1589458809353,
            val: 123,
            ack: false,
            from: 'system.adapter.whatever.0'
        }
    ]
}, result => console.log('added'));

// 3.
sendTo('sql.0', 'storeState', [
    {
        id: 'mbus.0.counter.xxx',
        state: {
            ts: 1589458809352,
            val: 123,
            ack: false,
            from: 'system.adapter.whatever.0'
        }
    },
    {
        id: 'mbus.0.counter.yyy',
        state: {
            ts: 1589458809353,
            val: 123,
            ack: false,
            from: 'system.adapter.whatever.0'
        }
    }
], result => console.log('added'));
```

Кроме того, вы можете добавить атрибут `rules: true` в сообщение, чтобы активировать все правила, например `counter`, `changesOnly`, `de-bounce` и так далее.

В случае ошибок возвращается массив со всеми сообщениями об отдельных ошибках, а также successCount для просмотра количества успешно сохраненных записей.

## Удалить состояние
Если вы хотите удалить запись из базы данных, вы можете использовать встроенную системную функцию **delete**:

```
sendTo('sql.0', 'delete', [
    {id: 'mbus.0.counter.xxx', state: {ts: 1589458809352},
    {id: 'mbus.0.counter.yyy', state: {ts: 1589458809353}
], result => console.log('deleted'));
```

Чтобы удалить ВСЕ данные истории для определенной точки данных, выполните:

```
sendTo('sql.0', 'deleteAll', [
    {id: 'mbus.0.counter.xxx'}
    {id: 'mbus.0.counter.yyy'}
], result => console.log('deleted'));
```

Чтобы удалить исторические данные для определенной точки данных и определенного диапазона, выполните:

```
sendTo('sql.0', 'deleteRange', [
    {id: 'mbus.0.counter.xxx', start: '2019-01-01T00:00:00.000Z', end: '2019-12-31T23:59:59.999'},
    {id: 'mbus.0.counter.yyy', start: 1589458809352, end: 1589458809353}
], result => console.log('deleted'));
```

Время может быть выражено в миллисекундах с начала эпохи или в виде строки, которая может быть преобразована с помощью объекта Date JavaScript.

Значения будут удалены, включая определенные ограничения. `ts >= start AND ts <= end`

## Изменить состояние
Если вы хотите изменить значение записи, качество или флаг подтверждения в базе данных, вы можете использовать встроенную системную функцию **update**:

```
sendTo('sql.0', 'update', [
    {id: 'mbus.0.counter.xxx', state: {ts: 1589458809352, val: 15, ack: true, q: 0},
    {id: 'mbus.0.counter.yyy', state: {ts: 1589458809353, val: 16, ack: true, q: 0}
], result => console.log('deleted'));
```

`ts` является обязательным. В объект состояния должен быть включен по крайней мере один другой флаг.

Будьте осторожны с `counters`. `counters` в БД не будет сброшен, и вам придется справиться с этим самостоятельно.

## Управление журналом истории с помощью Javascript
Адаптер поддерживает включение и отключение ведения журнала истории через JavaScript, а также получение списка включенных точек данных с их настройками.

### Давать возможность
Сообщение требует наличия "id" точки данных. Кроме того, необязательные "options" для определения конкретных настроек точки данных:

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
Для сообщения требуется «идентификатор» точки данных.

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

<!-- Заполнитель для следующей версии (в начале строки):

### **РАБОТА В ХОДЕ** -->

## Changelog
### 3.0.1 (2024-06-13)
* (foxriver76) upgraded dependencies

### 3.0.0 (2023-09-13)
* IMPORTANT: Node.js 16.x is now needed at a minimum!
* (bluefox) Allowed setting port 0 as default
* (bluefox) Checked if a string is written into the number table
* (bluefox) Added support for `count` aggregate type on getHistory

### 2.2.0 (2022-09-19)
* IMPORTANT: Node.js 14.x is now needed at a minimum!
* (Apollon77) Fix potential crash cases with upcoming js-controller versions

### 2.1.8 (2022-08-13)
* (riversource/Apollon77) Optimize getHistory query by using "UNION ALL"
* (Apollon77) Fix crash cases reported by Sentry

### 2.1.7 (2022-06-30)
* (Apollon77) Fix crash cases reported by Sentry

### 2.1.6 (2022-06-27)
* (Apollon77) Allowed removing a configuration value for "round" in config again

### 2.1.5 (2022-06-27)
* (Apollon77) When no count is provided for aggregate "none" or "onchange" then the limit (default 2000) is used as count to define the number of data to return.
* (Apollon77) Fix the initialization of types and IDs for some cases.

### 2.1.3 (2022-06-12)
* (Apollon77) Make sure the debug log is active, according to the settings

### 2.1.2 (2022-06-08)
* (Apollon77) Huge performance optimizations for GetHistory calls

### 2.1.1 (2022-05-30)
* (Apollon77) Fix crash cases reported by Sentry

### 2.1.0 (2022-05-27)
* (Apollon77) Fix crash cases reported by Sentry
* (Apollon77) Fix several places where pooled connections might have not been returned to pool correctly and add logging for it
* (Apollon77) Work around an issue in used Pooling library that potentially gave out too many connections
* (Apollon77) Optimize retention check to better spread the first checks over time
* (Apollon77) Default to not use datapoint buffering as in 1.x when set to 0
* (Apollon77) Make sure disabling "Log changes only" also really does not log the changes anymore
* (Apollon77) Allow storeState and GetHistory also to be called for "unknown ids"
* (Apollon77) Adjust the fallback logic for type detection to use the type of the state value to log as last fallback
* (Apollon77) Fix storing booleans on MSSQL

### 2.0.2 (2022-05-11)
* (Apollon77) BREAKING: Configuration is only working in the new Admin 5 UI!
* (Apollon77) Did bigger adjustments to the recording logic and added a lot of new Features. Please refer to Changelog and Forum post for details.

### 2.0.0 (2022-05-11)
* (Apollon77) Breaking: Configuration is only working in the new Admin 5 UI!
* (Apollon77) Breaking! Did bigger adjustments to the recording logic. Debounce is refined and blockTime is added to differentiate between the two checks
* (Apollon77) Breaking! GetHistory requests now need to deliver the ts in milliseconds! Make sure to use up-to-date scripts and Charting UIs
* (Apollon77) Add RAM buffering and mass inserts for logging
* (Apollon77) New setting added to disable the "logging of additional values for charting optimization" - then only the expected data are logged
* (Apollon77) Add flag returnNewestEntries for GetHistory to determine which records to return when more entries as "count" are existing for aggregate "none"
* (Apollon77) Add support for addId getHistory flag for GetHistory
* (Apollon77) Add new Debug flag to enable/disable debug logging on datapoint level (default is false) to optimize performance
* (Apollon77) Add aggregate method "percentile" to calculate the percentile (0..100) of the values (requires options.percentile with the percentile level, defaults to 50 if not provided). Basically same as Quantile just different levels are used
* (Apollon77) Add aggregate method "quantile" to calculate the quantile (0..1) of the values (requires options.quantile with the quantile level, defaults to 0.5 if not provided). Basically same as Percentile just different levels are used
* (Apollon77) Add (experimental) method "integral" to calculate the integral of the values. Requires options.integralUnit with the time duration of the integral in seconds, defaults to 60s if not provided. Optionally a linear interpolation can be done by setting options.integralInterpolation to "linear"
* (Apollon77) When request contains flag removeBorderValues: true, the result then cut the additional pre and post border values out of the results
* (Apollon77) Enhance the former "Ignore below 0" feature and now allow specifying to ignore below or above specified values. The old setting is converted to the new one
* (Apollon77) Upgrade MSSQL and MySQL drivers incl. Support for MySQL 8
* (Apollon77) Make sure that min change delta allows numbers entered with comma (german notation) in all cases
* (Apollon77) Add support to specify how to round numbers on query per datapoint
* (Apollon77) Do not log passwords for Postgres connections
* (Apollon77) Optimize SSL support for database connections including option to allow self signed certificates
* (Apollon77) Allow to specify custom retention duration in days
* (winnyschuster) Fix Insert statement for MSSQL ts_counter
* (winnyschuster) type of ts in user queries corrected

### 1.16.2 (2022-02-16)
* (bluefox) Marked interpolated data with `i=true`

### 1.16.1 (2021-12-19)
* (Excodibur) Hide settings not relevant when "log changes only" is not used
* (Apollon77) Allow all number values for debounce again

### 1.16.0 (2021-12-14)
* (bluefox) Support only `js-controller` >= 3.3.x
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

Copyright (c) 2015-2024 bluefox <dogafox@gmail.com>, Apollon77

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