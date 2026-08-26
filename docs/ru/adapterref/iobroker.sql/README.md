---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sql/README.md
title: ioBroker.sql
hash: NXEEIlPo6cH0fn2HCE2go9SbdI2baq1kA5EZpGrZRfU=
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
- **Идентификатор-псевдоним** - Вы можете задать псевдоним для идентификатора. Это полезно, если вы сменили устройство и хотите вести непрерывную запись данных. В будущем, пожалуйста, рассмотрите возможность перехода на использование реальных состояний псевдонимов!
- **Срок хранения** - Сколько значений из прошлого будет сохранено на диске. Данные удаляются по истечении указанного времени, как только для точки данных потребуется сохранить новые данные.
- **Максимальное количество значений, хранящихся в оперативной памяти** - Определите, сколько значений будет храниться в оперативной памяти перед сохранением на диск. Вы можете контролировать объем операций ввода-вывода.
- **Включить расширенные отладочные журналы для точки данных** - Если вы хотите видеть более подробные журналы для этой точки данных, вы можете включить эту опцию. Вам все равно необходимо включить уровень логирования "debug", чтобы эти дополнительные значения были видны! Это помогает в отладке проблем или понимании того, почему адаптер регистрирует значение (или нет).

Большинство этих значений можно предварительно определить в настройках экземпляра, после чего они автоматически заполняются или используются в качестве точки данных.

## Советы по установке базы данных
### MS-SQL:
Используйте `localhost\instance` в качестве хоста и проверьте, включены ли TCP/IP-соединения.

https://msdn.microsoft.com/en-us/library/bb909712(v=vs.90).aspx

### SQLite:
Это "файловая" база данных, и она не может обрабатывать слишком много событий. Если у вас большой объем данных, используйте настоящую базу данных, например, PostgreSQL и подобные ей.

Базу данных SQLite устанавливать отдельно не нужно. Это всего лишь файл на диске, но для его установки вам потребуются инструменты сборки в вашей системе. Для Linux достаточно написать:

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
- **count** - количество значений, если агрегирование выполняется с помощью 'onchange', или количество интервалов, если используется другой метод агрегирования. Значение count будет проигнорировано, если задан шаг, в противном случае значение по умолчанию равно 500, если шаг не задан.
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

## Браузер данных
В настройках экземпляра есть вкладка **Обозреватель данных**: слева — все точки данных, имеющие данные в базе данных, справа — сохраненные значения выбранной точки. Значения можно просматривать постранично, редактировать, удалять и вставлять новые. Для работы этой вкладки необходим запущенный экземпляр.

Данный компонент представляет собой компонент JSON-Config `custom`. Его исходный код находится в `src-admin`, а собранный пакет в `admin/custom` уже добавлен в репозиторий:

```bash
npm run npm:admin      # install the dependencies of the component (only once)
npm run build:admin    # clean, build and copy into admin/custom
cd src-admin && npm start   # development server on http://localhost:4173
```

Список точек данных берется из сообщения **getDatapoints**, которое также можно использовать в скриптах:

```js
sendTo('sql.0', 'getDatapoints', {}, result => {
    // [{id: 'system.adapter.admin.0.memRss', index: 1, type: 'Number'}, ...]
    console.log(JSON.stringify(result.result));
});
```

Он возвращает все точки данных из таблицы `datapoints`, включая те, для которых отключено логирование, отсортированные по ID. В отличие от `getDpOverview`, он не определяет первую метку времени для каждой точки данных и отвечает немедленно.

## Чтение исходных значений
`getHistory` предназначен для построения диаграмм: он агрегирует, интерполирует, округляет и суммирует значения непосредственно до и после запрошенного диапазона. Чтобы просмотреть и пролистать сохраненные строки точно так же, как они находятся в базе данных, используйте **getRawEntries**:

```js
sendTo(
    'sql.0',
    'getRawEntries',
    {
        id: 'system.adapter.admin.0.memRss',
        start: Date.now() - 3600000, // optional, inclusive
        end: Date.now(),             // optional, inclusive
        limit: 100,                  // optional, default 100, maximum 2000
        offset: 0,                   // optional, default 0
        sort: 'desc',                // optional, 'desc' (newest first, default) or 'asc'
    },
    result => {
        if (result.error) {
            console.error(result.error);
        } else {
            // total = number of all entries matching start/end, so a table can page through them
            console.log(`${result.result.length} of ${result.total} entries`);
            // [{ts: 1589458809352, val: 51.5, ack: 1, q: 0, from: 'system.adapter.admin.0'}, ...]
            console.log(JSON.stringify(result.result));
        }
    },
);
```

В ответе дополнительно содержатся `id`, `index` (идентификатор в таблице `datapoints`), `type` (`Number`, `String` или `Boolean`), `table` (`ts_number`, `ts_string` или `ts_bool`) и используемые `limit`, `offset` и `sort`.

Значения возвращаются в том виде, в котором они поступают из базы данных, и **не** преобразуются: значения `ack` и логические значения в большинстве баз данных соответствуют `0`/`1`, а `val` строкового значения представляет собой сохраненную строку. `from` соответствует `null`, если источник не был сохранен.

Подобно `update`, `delete` и `storeState`, это работает и для точек данных, для которых также отключено логирование, при условии, что у них все еще есть записи в базе данных. Если точка данных неизвестна, ответ содержит `error`.

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

Все три команды также принимают одну точку данных в виде объекта, например, `sendTo('sql.0', 'deleteAll', {id: 'mbus.0.counter.xxx'}, result => ...)`.
В этом случае ответ отправляется после выполнения удаления и представляет собой либо `{success: true}`, либо `{error: "..."}`.
При использовании массива ответ отправляется немедленно и ничего не сообщает об отдельных удалениях.

## Изменить состояние
Если вы хотите изменить значение записи, качество или флаг подтверждения в базе данных, вы можете использовать встроенную системную функцию **обновление**:

```javascript
sendTo('sql.0', 'update', [
    {id: 'mbus.0.counter.xxx', state: {ts: 1589458809352, val: 15, ack: true, q: 0}},
    {id: 'mbus.0.counter.yyy', state: {ts: 1589458809353, val: 16, ack: true, q: 0}},
], result => console.log('deleted'));
```

`ts` является обязательным. В объект состояния должен быть включен как минимум еще один флаг.

Будьте осторожны с `counters`. Значение `counters` в базе данных не будет сброшено, и вам придется обрабатывать его самостоятельно.

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
### 4.1.0 (2026-08-26)
* (@ipod86) Added a button to the datapoint settings to delete all logged values of this datapoint
* (@GermanBluefox) The messages `delete`, `deleteRange` and `deleteAll` now report errors back to the caller instead of always answering with success
* (@GermanBluefox) The messages `delete`, `deleteRange` and `deleteAll` work now also for datapoints whose logging is disabled
* (@GermanBluefox) The messages `delete`, `deleteRange` and `deleteAll` delete the counter values of a numeric datapoint (table `ts_counter`) too
* (@GermanBluefox) Fixed `NaN` as a result of the aggregation `percentile` with 100 or `quantile` with 1
* (@GermanBluefox) Fixed the last value of the `integralTotal` aggregation: it was interpolated onto the start instead of the end of the requested range
* (@GermanBluefox) Added the message `getRawEntries` to read the stored values of one datapoint page by page (with the total number of entries) for tools that show or edit the raw data
* (@GermanBluefox) The message `update` works now also for datapoints whose logging is disabled and reports errors back to the caller
* (@GermanBluefox) `storeState` uses the data type stored in the database for known datapoints instead of deriving it from the value
* (@GermanBluefox) Added the tab `Data browser` to the instance settings: show, edit, delete and insert the stored values of a datapoint
* (@GermanBluefox) Added the message `getDatapoints` that returns all datapoints of the database immediately

### 4.0.4 (2026-08-11)
* (@GermanBluefox) Fixed that nothing was stored for datapoints with an `aliasId`: the adapter subscribed to the alias name instead of the real state ID, so no state change ever arrived

### 4.0.3 (2026-08-11)
* (@GermanBluefox) Corrected a small configuration error

### 4.0.2 (2026-08-10)
* (@GermanBluefox) Fixed empty charts for the aggregation `onchange` ("raw" in e-charts): it was run through the interval aggregation and returned only `null` values
* (@GermanBluefox) The MySQL and phpMyAdmin docker containers are no longer enabled by default: instances without the docker settings in their config (e.g. after an update from 3.x) reported "Docker is not installed"

### 4.0.1 (2026-08-07)
* (@GermanBluefox) Fixed MySQL error "Can't create more than max_prepared_stmt_count statements": every query allocated a server-side prepared statement
* (@GermanBluefox) Batches of more than 500 values are no longer sent as one multi-statement query

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