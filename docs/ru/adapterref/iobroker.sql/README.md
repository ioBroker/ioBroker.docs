---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sql/README.md
title: ioBroker.sql
hash: uiMHt5I5QQ02Yp+FYsgOKI5z4sPD+c0Zw25RXw1rzFo=
---
![Логотип](../../../en/adapterref/iobroker.sql/admin/sql.png)

![Количество установок](http://iobroker.live/badges/sql-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.sql.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sql.svg)
![Тесты](https://travis-ci.org/ioBroker/ioBroker.sql.svg?branch=master)
![НПМ](https://nodei.co/npm/iobroker.sql.png?downloads=true)

# ioBroker.sql

Этот адаптер сохраняет историю состояний в базу данных SQL.

Поддерживает PostgreSQL, MySQL, Microsoft SQL Server и SQLite. При желании можно оставить порт 0.

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках, см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

## Настройки

## Настройки подключения

- **Тип базы данных** : Тип SQL-базы данных: MySQL, PostgreSQL, MS-SQL или SQLite3
- **Хост** : IP-адрес или имя хоста в SQL Server.
- **Порт** : Порт сервера SQL Server (оставьте поле пустым, если не уверены).
- **Имя базы данных** : Имя базы данных. Брокер io по умолчанию
- **Пользователь** : Имя пользователя для SQL. Должен существовать в базе данных.
- **Пароль** : Пароль для SQL.
- **Подтверждение пароля** : Просто повторите пароль здесь.
- **Шифрование** : Некоторые базы данных поддерживают шифрование.
- **Округлите действительное число до** : количества цифр после запятой.
- **Разрешить параллельные запросы** : разрешить одновременные SQL-запросы к базе данных.
- **Не создавать базу данных** : Активируйте эту опцию, если база данных уже создана (например, администратором), а у пользователя ioBroker недостаточно прав для ее создания.

## Настройки по умолчанию

- **Время задержки (Debounce Time** ) — защита от нестабильных значений, гарантирующая запись в лог только стабильных значений, если значение не изменялось в течение заданного количества миллисекунд. ВНИМАНИЕ: Если значения изменяются чаще, чем позволяет этот параметр, запись в лог не производится (поскольку любое значение является нестабильным).
- **Blocktime** — определяет, в течение какого времени после сохранения последнего значения никакие дальнейшие значения не сохраняются. По истечении указанного времени в миллисекундах в лог записывается следующее значение, удовлетворяющее всем остальным проверкам.
- **Записывать только изменения** — эта функция гарантирует, что в журнал будут записываться только измененные значения, если они соответствуют другим проверкам (см. ниже). Значения, оставшиеся неизменными, в журнал записываться не будут.
- **Запись тех же значений (в секундах) по-прежнему будет производиться** . При использовании параметра "Записывать только изменения" можно установить временной интервал в секундах, по истечении которого неизмененные значения также будут повторно записываться в базу данных. Повторно записанные адаптером значения можно отследить по полю "from".
- **Минимальная разница от последнего значения** — При использовании параметра «Записывать только изменения» можно задать требуемую минимальную разницу между новым значением и последним значением. Если эта разница не достигнута, значение не записывается.
- **Игнорировать значения 0 или null (==0)** — Вы можете указать, следует ли игнорировать значения 0 или null.
- **Игнорировать значения меньше нуля (<0)** — Вы можете указать, следует ли игнорировать значения меньше нуля.
- **Отключение оптимизированного логирования пропущенных значений для построения графиков** — по умолчанию адаптер пытается записывать значения для оптимизированного построения графиков. Это может означать, что дополнительные значения (например, не прошедшие все проверки выше) автоматически регистрируются. Если это не требуется, вы можете отключить эту функцию.
- **Alias-ID** — Вы можете задать псевдоним для идентификатора. Это полезно, если вы сменили устройство и хотите обеспечить непрерывную запись данных. В будущем, пожалуйста, рассмотрите возможность перехода на использование реальных состояний псевдонимов!
- **Срок хранения** — сколько значений из прошлого будет сохранено на диске. Данные удаляются по истечении указанного времени, как только необходимо сохранить новые данные для конкретной точки данных.
- **Максимальное количество значений, хранящихся в оперативной памяти** — определите, сколько значений будет храниться в оперативной памяти перед сохранением на диск. Вы можете контролировать объем операций ввода-вывода.
- **Включить расширенные отладочные журналы для точки данных** — Если вы хотите видеть более подробные журналы для этой точки данных, вы можете включить эту опцию. Для отображения этих дополнительных значений вам все равно необходимо включить уровень логирования «отладка»! Это помогает в отладке проблем или понимании того, почему адаптер регистрирует (или не регистрирует) значение.

Большинство этих значений можно предварительно определить в настройках экземпляра, после чего они автоматически заполняются или используются в качестве точки данных.

## Советы по установке базы данных

### MS-SQL:

Использовать`localhost\instance` Проверьте хост и убедитесь, что TCP/IP-соединения включены. <https://msdn.microsoft.com/en-us/library/bb909712(v=vs.90).aspx>

### SQLite:

Это "файловая" база данных, и она не может обрабатывать слишком много событий. Если у вас большой объем данных, используйте настоящую базу данных, например, PostgreSQL и подобные ей.

Базу данных SQLite устанавливать отдельно не нужно. Это всего лишь файл на диске, но для его установки вам потребуются инструменты сборки в вашей системе. Для Linux достаточно написать:

```bash
sudo apt-get install build-essential
```

Для Windows установите Node.js с опцией "Автоматически установить необходимые инструменты...", а затем переустановите адаптер, например:

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

При необходимости отредактируйте файл _/etc/mysql/my.cnf_ , чтобы установить привязку к IP-адресу для удаленного подключения.

**Внимание** : пользователь iobroker является администратором. При необходимости предоставьте пользователю iobroker ограниченные права.

В операционной системе Windows его можно легко установить с помощью установщика: <https://dev.mysql.com/downloads/installer/> .

Обратите внимание на метод аутентификации. Новый алгоритм шифрования в MySQL 8.0 пока не поддерживается.`node.js` и вам необходимо выбрать устаревший метод аутентификации.

![Windows](../../../en/adapterref/iobroker.sql/img/WindowsMySQLinstaller.png)

## Структура баз данных

Имя базы данных по умолчанию —`iobroker` Однако это можно изменить в настройках.

### Источники

В этой таблице представлен список экземпляров адаптера, которые записали данные. (state.from)

| ДБ         | Имя в запросе        |
| ---------- | -------------------- |
| MS-SQL     | iobroker.dbo.sources |
| MySQL      | iobroker.sources     |
| PostgreSQL | источники            |
| SQLite     | источники            |

Структура:

| Поле          | Тип                                        | Описание                                    |
| ------------- | ------------------------------------------ | ------------------------------------------- |
| идентификатор | INTEGER NOT NULL PRIMARY KEY IDENTITY(1,1) | уникальный идентификатор                    |
| имя           | varchar(255) / TEXT                        | экземпляр адаптера, который записал запись. |

_Примечание:_ MS-SQL использует varchar(255), а другие языки программирования — TEXT.

### Точки данных

Эта таблица представляет собой список точек данных (идентификаторов).

| ДБ         | Имя в запросе           |
| ---------- | ----------------------- |
| MS-SQL     | iobroker.dbo.datapoints |
| MySQL      | iobroker.datapoints     |
| PostgreSQL | точки данных            |
| SQLite     | точки данных            |

Структура:

| Поле          | Тип                                        | Описание                                                       |
| ------------- | ------------------------------------------ | -------------------------------------------------------------- |
| идентификатор | INTEGER NOT NULL PRIMARY KEY IDENTITY(1,1) | уникальный идентификатор                                       |
| имя           | varchar(255) / TEXT                        | Идентификатор переменной, например, hm-rpc.0.JEQ283747.1.STATE |
| тип           | ЦЕЛОЕ                                      | 0 — число, 1 — строка, 2 — логическое значение                 |

_Примечание:_ MS-SQL использует varchar(255), а другие языки программирования — TEXT.

### Числа

Значения для состояний с типом "число". **ts** означает "временной ряд".

| ДБ         | Имя в запросе           |
| ---------- | ----------------------- |
| MS-SQL     | iobroker.dbo.ts\_number |
| MySQL      | iobroker.ts\_number     |
| PostgreSQL | ts\_number              |
| SQLite     | ts\_number              |

Структура:

| Поле          | Тип                 | Описание                                                                                                                |
| ------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| идентификатор | ЦЕЛОЕ               | Идентификатор штата из таблицы "Точки данных".                                                                          |
| тс            | БОЛЬШОЕ ЦЕЛОЕ ЧИСЛО | Время в миллисекундах до начала эпохи. Может быть преобразовано во время с помощью функции "new Date(ts)".              |
| вал           | НАСТОЯЩИЙ           | Ценить                                                                                                                  |
| ack           | БИТ/БУЛЕВОЕ         | Подтверждено: 0 - не подтверждено, 1 - подтверждено.                                                                    |
| \_от          | ЦЕЛОЕ               | Идентификатор источника из таблицы "Источники".                                                                         |
| q             | ЦЕЛОЕ               | Качество в цифрах. Описание можно найти [здесь.](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#states) |

_Примечание:_ MS-SQL использует тип данных BIT, а другие — BOOLEAN. SQLite использует тип данных INTEGER для всех типов данных, а все остальные — BIGINT.

Пользователь может определить дополнительные параметры для определения типа.`number` функциональность`counters` Для этой цели создана следующая таблица:

| ДБ         | Имя в запросе            |
| ---------- | ------------------------ |
| MS-SQL     | iobroker.dbo.ts\_counter |
| MySQL      | iobroker.ts\_counter     |
| PostgreSQL | ts\_counter              |
| SQLite     | ts\_counter              |

Структура:

| Поле          | Тип                 | Описание                                                                                                   |
| ------------- | ------------------- | ---------------------------------------------------------------------------------------------------------- |
| идентификатор | ЦЕЛОЕ               | Идентификатор штата из таблицы "Точки данных".                                                             |
| тс            | БОЛЬШОЕ ЦЕЛОЕ ЧИСЛО | Время в миллисекундах до начала эпохи. Может быть преобразовано во время с помощью функции "new Date(ts)". |
| вал           | НАСТОЯЩИЙ           | Ценить                                                                                                     |

В этой таблице хранятся значения, когда счетчик был заменен, и значение не увеличилось, но не достигло нуля или стало меньше.

### Строки

Значения для штатов с типом`string` .

| ДБ         | Имя в запросе           |
| ---------- | ----------------------- |
| MS-SQL     | iobroker.dbo.ts\_string |
| MySQL      | iobroker.ts\_string     |
| PostgreSQL | ts\_string              |
| SQLite     | ts\_string              |

Структура:

| Поле          | Тип         | Описание                                                                                                                |
| ------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------- |
| идентификатор | ЦЕЛОЕ       | Идентификатор штата из таблицы "Точки данных".                                                                          |
| тс            | БИГИНТ      | Время в миллисекундах до начала эпохи. Может быть преобразовано во время с помощью функции "new Date(ts)".              |
| вал           | ТЕКСТ       | Ценить                                                                                                                  |
| ack           | БИТ/БУЛЕВОЕ | Подтверждено: 0 - не подтверждено, 1 - подтверждено.                                                                    |
| \_от          | ЦЕЛОЕ       | Идентификатор источника из таблицы "Источники".                                                                         |
| q             | ЦЕЛОЕ       | Качество в цифрах. Описание можно найти [здесь.](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#states) |

_Примечание:_ MS-SQL использует тип данных BIT, а другие — BOOLEAN. SQLite использует тип данных INTEGER для всех типов данных, а все остальные — BIGINT.

### Логические значения

Значения для состояний с типом`boolean` .

| ДБ         | Имя в запросе         |
| ---------- | --------------------- |
| MS-SQL     | iobroker.dbo.ts\_bool |
| MySQL      | iobroker.ts\_bool     |
| PostgreSQL | ts\_bool              |
| SQLite     | ts\_bool              |

Структура:

| Поле          | Тип         | Описание                                                                                                                |
| ------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------- |
| идентификатор | ЦЕЛОЕ       | Идентификатор штата из таблицы "Точки данных".                                                                          |
| тс            | БИГИНТ      | Время в миллисекундах до начала эпохи. Может быть преобразовано во время с помощью функции "new Date(ts)".              |
| вал           | БИТ/БУЛЕВОЕ | Ценить                                                                                                                  |
| ack           | БИТ/БУЛЕВОЕ | Подтверждено: 0 - не подтверждено, 1 - подтверждено.                                                                    |
| \_от          | ЦЕЛОЕ       | Идентификатор источника из таблицы "Источники".                                                                         |
| q             | ЦЕЛОЕ       | Качество в цифрах. Описание можно найти [здесь.](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#states) |

_Примечание:_ MS-SQL использует тип данных BIT, а другие — BOOLEAN. SQLite использует тип данных INTEGER для всех типов данных, а все остальные — BIGINT.

## Доступ к значениям из JavaScript-адаптера

Отсортированные значения доступны через JavaScript-адаптер.

- Получите 50 последних сохраненных событий для всех идентификаторов.

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

- Получение сохраненных значений для "system.adapter.admin.0.memRss" за последний час

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

- **начало** - (необязательно) время в миллисекундах - _Date.now()_
- **конец** - (необязательно) время в миллисекундах - _Date.now()_ , по умолчанию -`(now + 5000 seconds)`
- **шаг** - (необязательно) используется в агрегированных данных (макс., мин., среднее, суммарно и т. д.) шаг в миллисекундах интервалов
- **count** — количество значений, если используется агрегация 'onchange', или количество интервалов, если используется другой метод агрегации. Значение count будет проигнорировано, если задан шаг, в противном случае значение по умолчанию — 500, если шаг не задан.
- **от** - если поле _"от"_ должно быть включено в ответ
- **ack** - если поле _ack_ должно быть включено в ответ
- **q** - следует ли включать поле _q_ в ответ
- **addId** - если поле _id_ должно быть включено в ответ
- **limit** - не возвращать больше записей, чем limit
- **округление** - округление результата до количества знаков после запятой.
- **ignoreNull** - если необходимо включить нулевые значения (false), заменить их последним ненулевым значением (true) или заменить на 0 (0).
- **removeBorderValues** — По умолчанию возвращаются дополнительные значения границ для оптимизации построения диаграмм. Установите значение true для этого параметра, если это не требуется (например, для обработки данных скриптом).
- **returnNewestEntries** — возвращаемые данные всегда сортируются по временной метке в порядке возрастания. При использовании агрегатной функции "none" и указании параметров "count" или "limit" обычно возвращаются самые старые записи (если начальные данные не указаны). Установите этот параметр в значение true, чтобы получать самые новые записи.
- **aggregate** - метод агрегирования (По умолчанию:`average` ):
  - _minmax_ — используется специальный алгоритм. Весь временной диапазон разбивается на небольшие интервалы, и для каждого интервала находятся максимальное, минимальное, начальное и конечное значения.
  - _max_ - Разделите весь временной диапазон на небольшие интервалы и для каждого интервала найдите максимальное значение, затем используйте его для этого интервала (значения null будут игнорироваться).
  - _min_ - То же самое, что и max, но принимает минимальное значение.
  - _Среднее значение_ - То же самое, что и максимальное, но берется среднее значение.
  - _Итого_ - То же, что и максимум, но рассчитывается общая сумма.
  - _count_ — Аналогично max, но вычисляет количество значений (значения null будут учтены).
  - _Процентиль_ - Вычислите n-й процентиль (n задано в`options.percentile` или значение по умолчанию равно 50, если оно не указано).
  - _квантиль_ - Вычислите n-й квантиль (n задано в`options.quantile` или значение по умолчанию равно 0,5, если не указано).
  - _интеграл_ - Вычислите интеграл (дополнительные параметры см. ниже).
  - _Нет_ — никакой агрегации вообще. Только исходные значения за определенный период.
- **Процентиль** - (необязательно) при использовании агрегатного метода "процентиль" определяет уровень процентиля (0..100) (по умолчанию 50)
- **квантиль** - (необязательно) при использовании агрегатного метода "квантиль" определяет уровень квантиля (0..1) (по умолчанию 0.5)
- **integralUnit** — (необязательно) при использовании агрегатного метода "integral" определяет единицу измерения в секундах (по умолчанию 60 секунд). Например, чтобы получить интеграл в часах для Вт·ч или чего-то подобного, установите значение 3600.
- **integralInterpolation** — (необязательно) при использовании агрегатного метода "integral" определяет метод интерполяции (по умолчанию "none").
  - _линейная_ - линейная интерполяция
  - _нет_ - нет/пошаговая интерполяция

Для агрегированных данных будут рассчитаны первая и последняя точки, за исключением агрегированных данных.`none` Если вы вручную запрашиваете агрегирование, следует игнорировать первое и последнее значения, поскольку они рассчитываются на основе значений, выходящих за пределы периода.

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

_Примечание:_

В зависимости от базы данных, перед именем таблицы необходимо указать либо имя базы данных + схема — см. поля выше в разделе «Структура баз данных».

Например, если ваша база данных называется 'iobroker':

| ДБ     | Имя в запросе                               |
| ------ | ------------------------------------------- |
| MS-SQL | `SELECT * FROM iobroker.dbo.datapoints ...` |
| MySQL  | `SELECT * FROM iobroker.datapoints ...`     |

## браузер данных

В настройках экземпляра есть вкладка **«Просмотр данных»** : слева — все точки данных, имеющие данные в базе данных, справа — сохраненные значения выбранной точки. Значения можно просматривать постранично, редактировать, удалять и вставлять новые. Для работы этой вкладки необходим запущенный экземпляр.

Данный компонент представляет собой JSON-конфигурацию.`custom` компонент. Его исходные коды находятся в`src-admin` встроенный пакет в`admin/custom` привержен:

```bash
npm run npm:admin      # install the dependencies of the component (only once)
npm run build:admin    # clean, build and copy into admin/custom
cd src-admin && npm start   # development server on http://localhost:4173
```

Список точек данных берется из сообщения **getDatapoints** , которое также можно использовать в скриптах:

```js
sendTo('sql.0', 'getDatapoints', {}, result => {
    // [{id: 'system.adapter.admin.0.memRss', index: 1, type: 'Number'}, ...]
    console.log(JSON.stringify(result.result));
});
```

Она возвращает каждую точку данных`datapoints` Таблица, включая те, для которых отключено логирование, отсортирована по ID. В отличие от`getDpOverview` Однако, он не определяет первую временную метку каждой точки данных и отвечает немедленно.

## Прочитайте исходные значения

`getHistory` Этот метод предназначен для построения диаграмм: он агрегирует, интерполирует, округляет и суммирует значения непосредственно до и после запрошенного диапазона. Чтобы просмотреть и пролистать сохраненные строки точно так же, как они находятся в базе данных, используйте **getRawEntries** :

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

В ответе также содержится`id` ,`index` (ID в`datapoints` стол),`type` (`Number` ,`String` или`Boolean` ),`table` (`ts_number` ,`ts_string` или`ts_bool` ) и использованный`limit` ,`offset` и`sort` .

Возвращаемые значения отображаются в том виде, в котором они получены из базы данных, и **не** подвергаются преобразованию:`ack` а логические значения являются`0` /`1` в большинстве баз данных, и`val` В случае строкового объекта datapoint это сохраненная строка.`from` является`null` если источник не был сохранен.

Нравиться`update` ,`delete` и`storeState` Это работает и для точек данных, для которых отключено логирование, при условии, что у них еще есть записи в базе данных. Если точка данных неизвестна, ответ содержит`error` .

## storeState

Если вы хотите записать другие данные в базу данных SQL, вы можете использовать встроенную системную функцию **storeState** . Эта функция также может использоваться для преобразования данных из других адаптеров истории, таких как InfluxDB или SQL.

Успешный ответ не означает, что данные действительно записаны на диск. Это просто означает, что они были обработаны!

Указанные идентификаторы не проверяются в базе данных ioBroker и не требуют настройки или включения в ней. Если используются собственные идентификаторы без настроек, параметр "rules" не поддерживается и приведет к ошибке. Для таких идентификаторов используется значение по умолчанию "Максимальное количество значений, хранящихся в оперативной памяти".

Сообщение может иметь один из следующих трех форматов:

1. один идентификатор и один объект состояния
2. один идентификатор и массив объектов состояния
3. массив из нескольких идентификаторов, каждый из которых содержит один объект состояния.

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

Кроме того, вы можете добавить атрибут.`rules: true` в сообщении для активации всех правил, например:`counter` ,`changesOnly` ,`de-bounce` и так далее.

В случае ошибок возвращается массив со всеми сообщениями об ошибках, а также значение successCount, показывающее, сколько записей было успешно сохранено.

## удалить состояние

Для удаления записи из базы данных можно использовать встроенную системную функцию **delete** :

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

Значения, включая установленные ограничения, будут удалены.`ts >= start AND ts <= end`

Все три команды также принимают одну точку данных в качестве объекта, например:`sendTo('sql.0', 'deleteAll', {id: 'mbus.0.counter.xxx'}, result => ...)` В этом случае ответ отправляется после выполнения удаления и представляет собой либо`{success: true}` или`{error: "..."}` При использовании массива ответ отправляется немедленно и ничего не сообщает об отдельных удалениях.

## изменить состояние

Если вы хотите изменить значение записи, качество или флаг подтверждения в базе данных, вы можете использовать встроенную системную функцию **обновления** :

```javascript
sendTo('sql.0', 'update', [
    {id: 'mbus.0.counter.xxx', state: {ts: 1589458809352, val: 15, ack: true, q: 0}}, 
    {id: 'mbus.0.counter.yyy', state: {ts: 1589458809353, val: 16, ack: true, q: 0}},
], result => console.log('deleted'));
```

`ts` является обязательным. В объект состояния должен быть включен как минимум еще один флаг.

Будьте осторожны с`counters` . The`counters` В базе данных это значение не будет сброшено, и вам придется обрабатывать его самостоятельно.

## Управление историей просмотров с помощью JavaScript

Адаптер поддерживает включение и отключение ведения истории с помощью JavaScript, а также получение списка включенных точек данных с их настройками.

### давать возможность

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

### запрещать

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

### получить список

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

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### 4.1.5 (2026-08-28)
* (@GermanBluefox) Updated packages

### 4.1.4 (2026-08-27)
* (@GermanBluefox) Connection errors no longer start with the useless class name `AggregateError`: the log now shows only the real reason, e.g. `connect ECONNREFUSED 127.0.0.1:3306; connect ECONNREFUSED ::1:3306`

### 4.1.3 (2026-08-27)
* (@GermanBluefox) Connection errors are logged with the real reason again: Node reports a failed TCP connect as an `AggregateError` whose own message is empty, so the log only showed the word `AggregateError` instead of e.g. `connect ECONNREFUSED 127.0.0.1:3306`
* (@GermanBluefox) The reconnection loop no longer repeats the same connection error every 30 seconds: the first occurrence is logged as error, repetitions go to debug and once an hour a reminder is logged

### 4.1.2 (2026-08-27)
* (@GermanBluefox) Fixed `enableHistory` being answered with `success: true` but silently doing nothing when it arrived while the adapter was still starting up: the adapter subscribed to object changes only after it had read the logging settings, so a message that landed in that gap activated no logging
* (@joltcoke) Fixed average and total returning null for every interval that contains a null value: parseFloat(null) is NaN and poisoned the sum of the whole interval (thanks to @joltcoke, ioBroker/ioBroker.sql#526). As the result was NaN and not null, ignoreNull could not act on it either
* (@joltcoke) Fixed min returning a wrong value if the interval contains a null, minmax losing the minimum if the interval starts with a null, and percentile/quantile counting a null as 0

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