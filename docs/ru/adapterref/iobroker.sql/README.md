---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sql/README.md
title: ioBroker.sql
hash: Prk8SGTi5atOvb0Uq5WtXU/qC0uV2fpDn/ZLEzU49Io=
---
![Логотип](../../../en/adapterref/iobroker.sql/admin/sql.png)

![Количество установок](http://iobroker.live/badges/sql-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.sql.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sql.svg)
![Тесты](https://travis-ci.org/ioBroker/ioBroker.sql.svg?branch=master)
![НПМ](https://nodei.co/npm/iobroker.sql.png?downloads=true)

# IoBroker.sql
Этот адаптер сохраняет историю состояний в базу данных SQL.

Поддерживает PostgreSQL, MySQL, Microsoft SQL Server и SQLite.
Вы можете оставить порт 0, если вам нужен порт по умолчанию.

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Для получения более подробной информации и сведений о том, как отключить отправку сообщений об ошибках, см. [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отправка сообщений Sentry используется начиная с js-controller 3.0.

## Настройки
## Настройки подключения
- **Тип базы данных**: Тип SQL-базы данных: MySQL, PostgreSQL, MS-SQL или SQLite3
- **Хост**: IP-адрес или имя хоста в SQL Server
- **Порт**: Порт SQL Server (оставьте поле пустым, если не уверены)
- **Имя базы данных**: Имя базы данных. iobroker по умолчанию
- **Пользователь**: Имя пользователя для SQL. Должен существовать в базе данных.
- **Пароль**: Пароль для SQL.
- **Подтверждение пароля**: Просто повторите пароль здесь.
- **Шифрование**: Некоторые базы данных поддерживают шифрование.
- **Округлить до:** количества цифр после запятой.
- **Разрешить параллельные запросы**: Разрешить одновременные SQL-запросы к базе данных.
- **Не создавать базу данных**: Активируйте эту опцию, если база данных уже создана (например, администратором), а у пользователя ioBroker недостаточно прав для ее создания.

## Настройки по умолчанию
- **Время подавления дребезга** - Защита от нестабильных значений, гарантирующая запись в лог только стабильных значений, если значение не изменялось в течение заданного количества миллисекунд. ВНИМАНИЕ: Если значения изменяются чаще, чем позволяет это значение, запись в лог не производится (поскольку любое значение является нестабильным).
- **Время блока** - Определяет, в течение какого времени после сохранения последнего значения никакие дальнейшие значения не сохраняются. По истечении заданного времени в миллисекундах в лог записывается следующее значение, удовлетворяющее всем остальным проверкам.
- **Записывать только изменения** - Эта функция гарантирует, что в журнал будут записываться только измененные значения, если они соответствуют другим проверкам (см. ниже). Значения, оставшиеся неизменными, в журнал записываться не будут.
- **По-прежнему записывать те же значения (в секундах)** - При использовании параметра "Записывать только изменения" вы можете установить здесь временной интервал в секундах, по истечении которого неизмененные значения также будут повторно записываться в базу данных. Вы можете отслеживать повторно записанные адаптером значения с помощью поля "из".
- **Минимальная разница по сравнению с последним значением** - При использовании параметра "Записывать только изменения" можно задать требуемую минимальную разницу между новым значением и последним значением. Если она не достигнута, значение не записывается.
- **игнорировать значения 0 или null (==0)** - Вы можете указать, следует ли игнорировать значения 0 или null.
- **игнорировать значения меньше нуля (<0)** - Вы можете указать, следует ли игнорировать значения меньше нуля.
- **Отключить оптимизированное для построения графиков логирование пропущенных значений** - По умолчанию адаптер пытается записывать значения для оптимизированного построения графиков. Это может означать, что дополнительные значения (например, не прошедшие все проверки выше) автоматически регистрируются. Если это не требуется, вы можете отключить эту функцию.
- **Идентификатор-псевдоним** - Вы можете задать псевдоним для идентификатора. Это полезно, если вы сменили устройство и хотите вести непрерывную запись данных. В будущем, пожалуйста, рассмотрите возможность перехода на реальные состояния псевдонимов!
- **Срок хранения** - Сколько значений из прошлого будет сохранено на диске. Данные удаляются по истечении указанного времени, как только для точки данных потребуется сохранить новые данные.
- **Максимальное количество значений, хранящихся в оперативной памяти** - Определите, сколько значений будет храниться в оперативной памяти перед сохранением на диск. Вы можете контролировать объем операций ввода-вывода.
- **Включить расширенные отладочные журналы для точки данных** - Если вы хотите видеть более подробные журналы для этой точки данных, вы можете включить эту опцию. Вам все равно необходимо включить уровень логирования "debug", чтобы эти дополнительные значения были видны! Это помогает в отладке проблем или понимании того, почему адаптер регистрирует значение (или нет).

Большинство этих значений можно предварительно определить в настройках экземпляра, после чего они автоматически заполняются или используются в качестве точки данных.

## Советы по установке базы данных
### MS-SQL:
Используйте `localhost\instance` в качестве хоста и проверьте, включены ли TCP/IP-соединения.

https://msdn.microsoft.com/en-us/library/bb909712(v=vs.90).aspx

### SQLite:
Это "файловая" база данных, которая не может обрабатывать слишком много событий. Если у вас большой объем данных, используйте настоящую базу данных, например, PostgreSQL и подобные ей.

Базу данных SQLite устанавливать отдельно не нужно. Это всего лишь файл на диске, но для его установки вам потребуются инструменты сборки в вашей системе. Для Linux просто напишите:

```bash
sudo apt-get install build-essential
```

Для Windows установите Node.js с опцией "Автоматически устанавливать необходимые инструменты...", а затем переустановите адаптер, например:

```bash
cd /opt/iobroker
iobroker stop sql
npm install iobroker.sql --production
iobroker start sql
```

### MySQL:
Установить MySQL на Linux можно следующим образом:

```bash
apt-get install mysql-server mysql-client

mysql -u root -p

CREATE USER 'iobroker'@'%' IDENTIFIED BY 'iobroker';
GRANT ALL PRIVILEGES ON * . * TO 'iobroker'@'%';
FLUSH PRIVILEGES;
```

При необходимости отредактируйте файл */etc/mysql/my.cnf*, чтобы установить привязку к IP-адресу для удаленного подключения.

**Предупреждение**: пользователь iobroker является администратором. При необходимости предоставьте пользователю iobroker ограниченные права.

В операционной системе Windows его можно легко установить с помощью установщика: https://dev.mysql.com/downloads/installer/.

Обратите внимание на метод аутентификации. Новый алгоритм шифрования в MySQL 8.0 пока не поддерживается `node.js`, поэтому необходимо выбрать устаревший метод аутентификации.

![Windows](../../../en/adapterref/iobroker.sql/img/WindowsMySQLinstaller.png)

## Структура баз данных
Имя базы данных по умолчанию — `iobroker`, но его можно изменить в конфигурации.

### Источники Эта таблица представляет собой список экземпляров адаптера, которые записали данные. (state.from)
| БД | Имя в запросе |
|------------|----------------------|
| MS-SQL | iobroker.dbo.sources |
| MySQL | iobroker.sources |
| PostgreSQL | источники |
| SQLite | источники |

Структура:

| Поле | Тип | Описание |
|-------|--------------------------------------------|-------------------------------------------|
| id | INTEGER NOT NULL PRIMARY KEY IDENTITY(1,1) | unique ID |
| имя | varchar(255) / TEXT | экземпляр адаптера, который записал запись |

*Примечание:* В MS-SQL используется varchar(255), а в других системах — TEXT.

### Точки данных
Эта таблица представляет собой список точек данных (идентификаторов).

| БД | Имя в запросе |
|------------|-------------------------|
| MS-SQL | iobroker.dbo.datapoints |
| MySQL | iobroker.datapoints |
| PostgreSQL | точки данных |
| SQLite | точки данных |

Структура:

| Поле | Тип | Описание |
|-------|--------------------------------------------|-------------------------------------------------|
| id | INTEGER NOT NULL PRIMARY KEY IDENTITY(1,1) | unique ID |
| имя | varchar(255) / TEXT | ID переменной, например, hm-rpc.0.JEQ283747.1.STATE |
| тип | ЦЕЛОЕ ЧИСЛО | 0 - число, 1 - строка, 2 - логическое значение |

*Примечание:* В MS-SQL используется varchar(255), а в других системах — TEXT.

### Числа
Значения для штатов с типом "число". **ts** означает "временной ряд".

| БД | Имя в запросе |
|------------|------------------------|
| MS-SQL | iobroker.dbo.ts_number |
| MySQL | iobroker.ts_number |
| PostgreSQL | ts_number |
| SQLite | ts_number |

Структура:

| Поле | Тип | Описание |
|--------|--------------------------------------------|---------------------------------------------------------------------------------------------------------------------------|
| id | INTEGER | Идентификатор штата из таблицы "Точки данных" |
| ts | BIGINT / INTEGER | Время в миллисекундах до начала эпохи. Может быть преобразовано во время с помощью функции "new Date(ts)" |
| val | REAL | Value |
| ack | BIT/BOOLEAN | Подтверждено: 0 - не подтверждено, 1 - подтверждено |
| _из | ЦЕЛОЕ ЧИСЛО | Идентификатор источника из таблицы "Источники" |
| q | ЦЕЛОЕ ЧИСЛО | Качество как число. Вы можете найти описание [здесь](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#states) |

*Примечание:* MS-SQL использует тип данных BIT, а другие — BOOLEAN. SQLite использует тип данных INTEGER, а все остальные — BIGINT.

Пользователь может дополнительно определить для типа `number` функциональность типа `counters`. Для этой цели создана следующая таблица:

| БД | Имя в запросе |
|------------|-------------------------|
| MS-SQL | iobroker.dbo.ts_counter |
| MySQL | iobroker.ts_counter |
| PostgreSQL | ts_counter |
| SQLite | ts_counter |

Структура:

| Поле | Тип | Описание |
|--------|------------------|---------------------------------------------------------------------|
| id | INTEGER | Идентификатор штата из таблицы "Точки данных" |
| ts | BIGINT / INTEGER | Время в миллисекундах до начала эпохи. Может быть преобразовано во время с помощью функции "new Date(ts)" |
| val | REAL | Value |

В этой таблице хранятся значения, когда счетчик был заменен, и значение не увеличилось, но не достигло нуля или стало меньше.

### Строки
Значения для штатов типа `string`.

| БД | Имя в запросе |
|------------|------------------------|
| MS-SQL | iobroker.dbo.ts_string |
| MySQL | iobroker.ts_string |
| PostgreSQL | ts_string |
| SQLite | ts_string |

Структура:

| Поле | Тип | Описание |
|--------|-----------------------|---------------------------------------------------------------------------------------------------------------------------|
| id | INTEGER | Идентификатор штата из таблицы "Точки данных" |
| ts | BIGINT | Время в миллисекундах до начала эпохи. Может быть преобразовано во время с помощью функции "new Date(ts)" |
| значение | ТЕКСТ | Значение |
| ack | BIT/BOOLEAN | Подтверждено: 0 - не подтверждено, 1 - подтверждено |
| _из | ЦЕЛОЕ ЧИСЛО | Идентификатор источника из таблицы "Источники" |
| q | ЦЕЛОЕ ЧИСЛО | Качество как число. Вы можете найти описание [здесь](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#states) |

*Примечание:* MS-SQL использует тип данных BIT, а другие — BOOLEAN. SQLite использует тип данных INTEGER, а все остальные — BIGINT.

### Логические значения
Значения для штатов типа `boolean`.

| БД | Имя в запросе |
|------------|-------------------------|
| MS-SQL | iobroker.dbo.ts_bool |
| MySQL | iobroker.ts_bool |
| PostgreSQL | ts_bool |
| SQLite | ts_bool |

Структура:

| Поле | Тип | Описание |
|--------|-------------|---------------------------------------------------------------------------------------------------------------------------|
| id | INTEGER | Идентификатор штата из таблицы "Точки данных" |
| ts | BIGINT | Время в миллисекундах до начала эпохи. Может быть преобразовано во время с помощью функции "new Date(ts)" |
| значение | БИТ/БУЛЕВОЕ | Значение |
| ack | BIT/BOOLEAN | Подтверждено: 0 - не подтверждено, 1 - подтверждено |
| _из | ЦЕЛОЕ ЧИСЛО | Идентификатор источника из таблицы "Источники" |
| q | ЦЕЛОЕ ЧИСЛО | Качество как число. Вы можете найти описание [здесь](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#states) |

*Примечание:* MS-SQL использует тип данных BIT, а другие — BOOLEAN. SQLite использует тип данных INTEGER, а все остальные — BIGINT.

## Доступ к значениям из адаптера JavaScript
Отсортированные значения доступны через JavaScript-адаптер.

* Получите 50 последних сохраненных событий для всех идентификаторов

```js
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

* Получение сохраненных значений для "system.adapter.admin.0.memRss" за последний час

```js
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

- **начало** - (необязательно) время в миллисекундах - *Date.now()*
- **конец** - (необязательно) время в миллисекундах - *Date.now()*, по умолчанию `(сейчас + 5000 секунд)`
- **шаг** - (необязательно) используется в агрегированном виде (макс., мин., среднее, суммарно, ...) шаг в миллисекундах интервалов
- **count** - количество значений, если агрегирование выполняется по методу 'onchange', или количество интервалов, если используется другой метод агрегирования. Значение count будет проигнорировано, если задан шаг, в противном случае значение по умолчанию равно 500, если шаг не задан.
- **от** - если поле *от* должно быть включено в ответ
- **ack** - если поле *ack* должно быть включено в ответ
- **q** - если поле *q* должно быть включено в ответ
- **addId** - если поле *id* должно быть включено в ответ
- **лимит** - не возвращайте больше записей, чем лимит.
- **округление** - округлить результат до количества знаков после запятой.
- **ignoreNull** - если должны быть включены нулевые значения (false), заменяется последним ненулевым значением (true) или заменяется на 0 (0)
- **removeBorderValues** - По умолчанию возвращаются дополнительные значения границ для оптимизации построения диаграмм. Установите этот параметр в значение true, если это не требуется (например, для обработки данных скриптом).
- **returnNewestEntries** - Возвращаемые данные всегда сортируются по временной метке в порядке возрастания. При использовании агрегатной функции "none" и указании параметров "count" или "limit" обычно возвращаются самые старые записи (если начальные данные не указаны). Установите этот параметр в значение true, чтобы получать самые новые записи.
- **агрегировать** - метод агрегирования (по умолчанию: `average`):
- *minmax* - используется специальный алгоритм. Весь временной диапазон разбит на небольшие интервалы, и для каждого интервала находятся максимальное, минимальное, начальное и конечное значения.
- *max* - Разделите весь временной диапазон на небольшие интервалы и для каждого интервала найдите максимальное значение, затем используйте его для этого интервала (значения null будут игнорироваться).
- *мин* - То же, что и макс, но принимает минимальное значение.
- *среднее* - То же самое, что и максимальное значение, но берется среднее значение.
- *Итого* - То же, что и максимум, но рассчитывается общая сумма.
- *count* - То же, что и max, но вычисляет количество значений (значения null будут учтены).
- *процентиль* - Вычислить n-й процентиль (n задается в `options.percentile` или по умолчанию равно 50, если не указано).
- *квантиль* - Вычислить n-й квантиль (n задается в `options.quantile` или по умолчанию равно 0,5, если не указано).
- *интеграл* - Вычислите интеграл (дополнительные параметры см. ниже).
- *нет* - Никакой агрегации вообще. Только исходные значения за заданный период.
- **процентиль** - (необязательно) при использовании агрегатного метода "процентиль" определяет уровень процентиля (0..100) (по умолчанию 50)
- **квантиль** - (необязательно) при использовании агрегатного метода "квантиль" определяет уровень квантиля (0..1) (по умолчанию 0.5)
- **integralUnit** - (необязательно) при использовании агрегатного метода "integral" определяет единицу измерения в секундах (по умолчанию 60 секунд). Например, чтобы получить интеграл в часах для Вт·ч или чего-то подобного, установите значение 3600.
- **integralInterpolation** - (необязательно) при использовании агрегатного метода "integral" определяет метод интерполяции (по умолчанию "none").
- *линейная* - линейная интерполяция
- *нет* - нет/пошаговая интерполяция

Для агрегаций будут вычислены первая и последняя точки, за исключением агрегации `none`.
Если вы вручную запрашиваете какую-либо агрегацию, следует игнорировать первое и последнее значения, поскольку они вычисляются на основе значений, находящихся вне периода.

## Получить счетчик
Пользователь может запросить значение некоторого счетчика (тип = число, счетчик = true) за определенный период времени.

```js
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

Если счетчик будет заменен, это также будет учтено при расчетах.

## Пользовательские запросы
Пользователь может выполнять собственные запросы к таблицам из JavaScript-адаптера:

```js
sendTo('sql.0', 'query', 'SELECT * FROM datapoints', function (result) {
    if (result.error) {
        console.error(result.error);
    } else {
        // show result
         console.log('Rows: ' + JSON.stringify(result.result));
    }
});
```

Или получите записи за последний час для ID=system.adapter.admin.0.memRss

```js
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

В зависимости от базы данных, перед именем таблицы необходимо указать либо имя базы данных + схема — см. поля выше в разделе «Структура баз данных».

Например, если ваша база данных называется 'iobroker':

| БД | Имя в запросе |
|---------|---------------------------------------------|
| MS-SQL | `SELECT * FROM iobroker.dbo.datapoints ...` |
| MySQL | `SELECT * FROM iobroker.datapoints ...` |

## StoreState
Если вы хотите записать другие данные в базу данных SQL, вы можете использовать встроенную системную функцию **storeState**. Эта функция также может использоваться для преобразования данных из других адаптеров истории, таких как InfluxDB или SQL.

Успешный ответ не означает, что данные действительно записаны на диск. Это просто означает, что они были обработаны!

Указанные идентификаторы не проверяются в базе данных ioBroker и не требуют настройки или включения в ней. Если используются собственные идентификаторы без настроек, параметр "rules" не поддерживается и приведет к ошибке. Для таких идентификаторов используется значение по умолчанию "Максимальное количество значений, хранящихся в оперативной памяти".

Сообщение может иметь один из следующих трех форматов:

1. Один объект ID и один объект состояния.
2. Один идентификатор и массив объектов состояния.
3. Массив из нескольких идентификаторов, каждый из которых содержит один объект состояния.

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

Кроме того, вы можете добавить атрибут `rules: true` в сообщение, чтобы активировать все правила, такие как `counter`, `changesOnly`, `de-bounce` и так далее.

В случае ошибок возвращается массив со всеми сообщениями об ошибках, а также значение successCount, показывающее, сколько записей было успешно сохранено.

## Удалить состояние
Если вы хотите удалить запись из базы данных, вы можете использовать встроенную системную функцию **delete**:

```javascript
sendTo('sql.0', 'delete', [
    {id: 'mbus.0.counter.xxx', state: {ts: 1589458809352}},
    {id: 'mbus.0.counter.yyy', state: {ts: 1589458809353}},
], result => console.log('deleted'));
```

Чтобы удалить ВСЕ исторические данные для определенной точки данных, выполните следующую команду:

```javascript
sendTo('sql.0', 'deleteAll', [
    {id: 'mbus.0.counter.xxx'},
    {id: 'mbus.0.counter.yyy'}
], result => console.log('deleted'));
```

Чтобы удалить исторические данные для определенной точки данных и для определенного диапазона, выполните следующую команду:

```javascript
sendTo('sql.0', 'deleteRange', [
    {id: 'mbus.0.counter.xxx', start: '2019-01-01T00:00:00.000Z', end: '2019-12-31T23:59:59.999'},
    {id: 'mbus.0.counter.yyy', start: 1589458809352, end: 1589458809353}
], result => console.log('deleted'));
```

Время может быть указано в миллисекундах с начала эпохи или в виде строки ans, которая может быть преобразована с помощью объекта Date в JavaScript.

Значения будут удалены, включая установленные ограничения. `ts >= start AND ts <= end`

## Изменить состояние
Если вы хотите изменить значение записи, качество или флаг подтверждения в базе данных, вы можете использовать встроенную системную функцию **обновление**:

```javascript
sendTo('sql.0', 'update', [
    {id: 'mbus.0.counter.xxx', state: {ts: 1589458809352, val: 15, ack: true, q: 0}},
    {id: 'mbus.0.counter.yyy', state: {ts: 1589458809353, val: 16, ack: true, q: 0}},
], result => console.log('deleted'));
```

`ts` является обязательным. В объект состояния должен быть включен как минимум еще один флаг.

Будьте осторожны с `counters`. Значение `counters` в базе данных не будет сброшено, и вам придется управлять им самостоятельно.

## Управление историей событий с помощью JavaScript
Адаптер поддерживает включение и отключение ведения истории с помощью JavaScript, а также получение списка включенных точек данных с их настройками.

### Давать возможность
Для отправки сообщения необходим идентификатор (id) точки данных. Кроме того, доступны необязательные параметры (options) для определения настроек, специфичных для данной точки данных:

```javascript
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
Для отправки сообщения необходим идентификатор ("id") точки данных.

```javascript
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

```javascript
sendTo('sql.0', 'getEnabledDPs', {}, function (result) {
    //result is object like:
    console.log({
        "system.adapter.sql.0.memRss": {
            "changesOnly":true,
            "debounce":0,
            "retention":31536000,
            "maxLength":3,
            "changesMinDelta":0.5,
            "enabled":true,
            "changesRelogInterval":0,
            "aliasId": ""
        },
        // ...
    });
});
```

<!-- Заполнитель для следующей версии (в начале строки):

### **РАБОТА В ПРОЦЕССЕ** -->

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
* (Apollon77) Add aggregate method "percentile" to calculate the percentile (0..100) of the values (requires `options.percentile` with the percentile level, defaults to 50 if not provided). Basically the same as Quantile, just different levels are used
* (Apollon77) Add aggregate method "quantile" to calculate the quantile (0..1) of the values (requires `options.quantile` with the quantile level, defaults to 0.5 if not provided). Basically the same as Percentile just different levels are used
* (Apollon77) Add (experimental) method "integral" to calculate the integral of the values. Requires options.integralUnit with the time duration of the integral in seconds, defaults to 60s if not provided. Optionally, a linear interpolation can be done by setting options.integralInterpolation to "linear"
* (Apollon77) When request contains flag removeBorderValues: true, the result then cut the additional pre- and post-border values out of the results
* (Apollon77) Enhance the former "Ignore below 0" feature and now allow specifying to ignore below or above specified values. The old setting is converted to the new one
* (Apollon77) Upgrade MSSQL and MySQL drivers incl. Support for MySQL 8
* (Apollon77) Make sure that min change delta allows numbers entered with comma (german notation) in all cases
* (Apollon77) Add support to specify how to round numbers on query per datapoint
* (Apollon77) Do not log passwords for Postgres connections
* (Apollon77) Optimize SSL support for database connections including option to allow self-signed certificates
* (Apollon77) Allows to specify custom retention duration in days
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

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

The MIT License (MIT)

Copyright (c) 2015-2026 bluefox <dogafox@gmail.com>, Apollon77

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