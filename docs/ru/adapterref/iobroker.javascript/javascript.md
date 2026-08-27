---
chapters: {"pages":{"en/adapterref/iobroker.javascript/README.md":{"title":{"en":"ioBroker.javascript"},"content":"en/adapterref/iobroker.javascript/README.md"},"en/adapterref/iobroker.javascript/blockly.md":{"title":{"en":"Contents"},"content":"en/adapterref/iobroker.javascript/blockly.md"},"en/adapterref/iobroker.javascript/javascript.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.javascript/javascript.md"},"en/adapterref/iobroker.javascript/upgrade-guide.md":{"title":{"en":"Upgrade guide"},"content":"en/adapterref/iobroker.javascript/upgrade-guide.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.javascript/javascript.md
title: без названия
hash: NogBCyMp5BYHsfx/fMVZjU5d8QeI/rlWmvGLGoaJw6w=
---
## Содержание
- [Примечание](#примечание)
- [Глобальные функции](#global-functions)
- [Лучшая практика](#лучшая-практика)

- [Функции](#следующие-функции-могут-использоваться-в-скриптах)
- [require - load some module](#require---load-some-module)
- [console - Выводит сообщение в лог](#console---выводит-сообщение-в-лог)
- [exec - выполнить какую-либо команду ОС, например, "cp file1 file2"](#exec---выполнить-какую-команду-ОС, например, "cp-file1-file2")
- [on - Подписка на изменения или обновления какого-либо состояния](#on---subscribe-on-changes-or-updates-of-some-state)
- [один раз](#один раз)
- [подписаться - то же, что и на](#subscribe---same-as-on)
- [отписаться](#отписаться)
- [getSubscriptions](#getsubscriptions)
- [getFileSubscriptions](#getfilesubscriptions)
- [расписание](#расписание)
- [Расписание](#расписание)
- [Астро-функция](#астро-функция)
- [scheduleById](#schedulebyid)
- [getSchedules](#getschedules)
- [clearSchedule](#clearschedule)
- [getAttr](#getattr)
- [getAstroDate](#getastrodate)
- [isAstroDay](#isastroday)
- [compareTime](#comparetime)
- [setState](#setstate)
    - [setStateAsync](#setstateasync)
    - [setStateDelayed](#setstatedelayed)
- [clearStateDelayed](#clearstatedelayed)
- [getStateDelayed](#getstatedelayed)
- [getState](#getstate)
- [getStateAsync](#getstateasync)
- [existsState](#existsState)
- [getObject](#getobject)
- [setObject](#setobject)
- [existsObject](#existsObject)
- [extendObject](#extendobject)
- [deleteObject](#deleteobject)
- [getIdByName](#getidbyname)
- [getEnums](#getenums)
- [createState](#createstate)
- [createStateAsync](#createstateasync)
- [deleteState](#deletestate)
- [deleteStateAsync](#deletestateasync)
- [sendTo](#sendto)
- [sendToAsync](#sendtoasync)
- [sendToHost](#sendtohost)
- [sendToHostAsync](#sendtohostasync)
- [setInterval](#setinterval)
- [clearInterval](#clearinterval)
- [setTimeout](#settimeout)
- [clearTimeout](#cleartimeout)
- [setImmediate](#setImmediate)
- [formatDate](#formatdate)
- [formatTimeDiff](#formattimediff)
- [getDateObject](#getDateObject)
- [formatValue](#formatvalue)
- [adapterSubscribe](#adaptersubscribe)
- [adapterUnsubscribe](#adapterunsubscribe)
- [$ - Селектор](#---селектор)
- [readFile](#readfile)
- [writeFile](#writefile)
- [delFile](#delFile)
- [renameFile](#renameFile)
- [onFile](#onFile)
- [offFile](#offFile)
- [onStop](#onstop)
- [getHistory](#getHistory)
- [runScript](#runscript)
- [runScriptAsync](#runScriptAsync)
- [startScript](#startscript)
- [startScriptAsync](#startscriptasync)
- [stopScript](#stopscript)
- [stopScriptAsync](#stopScriptAsync)
- [isScriptActive](#isscriptactive)
- [имя](#scriptName)
- [экземпляр](#экземпляр)
- [СЕКРЕТЫ](#секреты)
- [messageTo](#messageto)
- [messageToAsync](#messagetoasync)
- [onMessage](#onmessage)
- [onMessageUnregister](#onmessageunregister)
- [onLog](#onlog)
    - [onLogUnregister](#onlogunregister)
- [ждать](#ждать)
- [сон](#сон)
- [httpGet](#httpget)
- [httpPost](#httppost)
- [createTempFile](#createtempfile)
- [registerNotification](#registerNotification)

- [Активность скриптов](#scripts-activity)
- [Список изменений](#changelog)

## Глобальные функции
Глобальные скрипты можно определить в папке `global`.
Все глобальные скрипты доступны во всех экземплярах. Если глобальный скрипт отключен, он не будет использоваться.
Глобальный скрипт будет просто добавлен в начало обычного скрипта и скомпилирован, поэтому вы не сможете обмениваться данными между скриптами через глобальные скрипты. Используйте для этого состояния.

Для использования глобальных функций в TypeScript необходимо сначала добавить их в список глобальных функций (`declare`), чтобы компилятор знал об этих функциях. Пример:

```typescript
// global script:
// ==============
function globalFn(arg: string): void {
    // actual implementation
}

// normal script:
// ==============
declare function globalFn(arg: string): void;
// use as normal:
globalFn('test');
```

#### Рекомендации:
Создайте два экземпляра JavaScript-адаптера: один "тестовый" и один "производственный".
После тестирования скрипта в "тестовом" экземпляре его можно перенести в "производственный". При этом вы можете перезапустить "тестовый" экземпляр по своему усмотрению.

## В скриптах можно использовать следующие функции:
### Require - загрузка какого-либо модуля
```js
const mod = require('module_name');
```

Предварительно загружены следующие модули: `node:dgram`, `node:crypto`, `node:dns`, `node:events`, `node:fs`, `node:http`, `node:https`, `node:http2`, `node:net`, `node:os`, `node:path`, `node:util`, `node:stream`, `node:zlib`, `suncalc2`, `axios`, `wake_on_lan`, `request` (устарело)

Для использования других модулей введите название (и версию) модуля в конфигурации экземпляра. ioBroker установит модуль. После этого вы сможете подключить и использовать его в своих скриптах.

### Console - Выводит сообщение в лог
Использование аналогично `javascript`

### Exec - выполнить какую-либо команду операционной системы, например, `cp file1 file2`
```js
exec(cmd, [options], callback);
```

Выполните системную команду и получите результаты.

```js
// Get the list of files and directories in /var/log
exec('ls /var/log', (error, stdout, stderr) => {
    log('stdout: ' + stdout);
});
```

Node.js использует /bin/sh для выполнения команд. Если вы хотите использовать другую оболочку, вы можете использовать объект параметров, как описано в [Документация Node.js](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) для child_process.exec.
Рекомендуется всегда указывать пути к командам, чтобы гарантировать выполнение правильной команды.

**Внимание:** Для вызова этой функции необходимо включить опцию *Включить команду "setObject"*.

### Вкл. - Подписка на уведомления об изменениях или обновлениях какого-либо состояния
```js
on(pattern, callbackOrId, value);
```

Функция обратного вызова вернет объект в качестве параметра со следующим содержимым:

```js
{
    id: 'javascript.0.myplayer',
    state: {
        val:  'new state',
        ts:   1416149118,
        ack:  true,
        lc:   1416149118,
        from: 'system.adapter.sonos.0'
    },
    oldState: {
        val:  'old state',
        ts:   1416148233,
        ack:  true,
        lc:   1416145154,
        from: 'system.adapter.sonos.0'
    }
}
```

**Примечание:** `state` ранее назывался `newState`. Это название по-прежнему работает.

Пример:

```js
let timer;

// Create state "javascript.0.counter"
createState('counter', 0);

// On change
on('adapter.0.device.channel.sensor', (data) => {
    // But not ofter than 30 seconds
    if (!timer) {
        timer = setTimeout(() => {
            timer = null;
        }, 30000);

        // Set acknowledged value
        setState('counter', 1 + getState('counter'), true);

        // Or to set unacknowledged command
        setState('adapter.0.device.channel.actor', true);
    }
});
```

Для указания триггера можно использовать следующие параметры:

| параметр | тип/значение | описание |
|-------------|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| логика | строка | логика «и» или «или» для объединения условий \(по умолчанию: «и») |
|             |            |                                                                                                                                                     |
| id | строка | id равен заданному |
| | Регулярное выражение | идентификатор, соответствующий регулярному выражению |
| | Массив | идентификатор, сопоставленный со списком разрешенных идентификаторов |
|             |            |                                                                                                                                                     |
| имя | строка | имя равно заданному |
| | Регулярное выражение | имя, соответствующее регулярному выражению |
| | Массив | имя, соответствующее списку допустимых имен |
|             |            |                                                                                                                                                     |
| изменить | строка | "eq", "ne", "gt", "ge", "lt", "le", "any" |
| | "eq" | (равно) Новое значение должно быть равно старому (state.val == oldState.val) |
| | "ne" | (не равно) Новое значение не должно быть равно старому (state.val != oldState.val) **Если шаблон представляет собой строку идентификатора, это значение используется по умолчанию** |
| | "gt" | (больше) Новое значение должно быть больше старого значения (state.val > oldState.val) |
| | "ge" | (больше или равно) Новое значение должно быть больше или равно старому (state.val >= oldState.val) |
| | "lt" | (меньше) Новое значение должно быть меньше старого (state.val < oldState.val) |
| | "le" | (меньше или равно) Новое значение должно быть меньше или равно старому значению (state.val <= oldState.val) |
| | "любой" | Триггер будет срабатывать, если поступит только новое значение |
|             |            |                                                                                                                                                     |
| val | mixed | Новое значение должно быть равно заданному |
| valNe | mixed | Новое значение не должно быть равно заданному |
| valGt | mixed | Новое значение должно быть больше заданного |
| valGe | mixed | Новое значение должно быть больше или равно заданному |
| valLt | mixed | Новое значение должно быть меньше заданного |
| valLe | mixed | Новое значение должно быть меньше или равно заданному |
|             |            |                                                                                                                                                     |
| ack | логическое значение | Подтвержденное состояние нового значения равно заданному |
| q | число | Состояние кода качества нового значения равно заданному. Для сопоставления с любым кодом можно использовать '*'. **Если не указано, в качестве шаблона устанавливается q = 0!** |
|             |            |                                                                                                                                                     |
| oldVal | mixed | Предыдущее значение должно быть равно заданному |
| oldValNe | mixed | Предыдущее значение не должно совпадать с заданным |
| oldValGt | mixed | Предыдущее значение должно быть больше заданного |
| oldValGe | mixed | Предыдущее значение должно быть больше или равно заданному |
| oldValLt | mixed | Предыдущее значение должно быть меньше заданного |
| oldValLe | mixed | Предыдущее значение должно быть меньше или равно заданному |
|             |            |                                                                                                                                                     |
| oldAck | bool | Подтвержденное состояние предыдущего значения равно заданному |
| oldQ | число | Состояние кода качества предыдущего значения равно заданному. Для сопоставления с любым кодом можно использовать '*' |
|             |            |                                                                                                                                                     |
| ts | строка | Новая метка времени должна совпадать с заданной (state.ts == ts) |
| tsGt | строка | Новая метка времени не должна совпадать с заданной (state.ts != ts) |
| tsGe | строка | Новая метка времени должна быть больше заданного значения (state.ts > ts) |
| tsLt | string | Новая метка времени должна быть больше или равна заданной (state.ts >= ts) |
| tsLe | string | Новая метка времени должна быть меньше заданной (state.ts < ts) |
|             |            |                                                                                                                                                     |
| oldTs | строка | Предыдущая метка времени должна совпадать с заданной (oldState.ts == ts) |
| oldTsGt | string | Предыдущая метка времени не должна совпадать с указанной (oldState.ts != ts) |
| oldTsGe | строка | Предыдущая метка времени должна быть больше заданного значения (oldState.ts > ts) |
| oldTsLt | string | Предыдущая метка времени должна быть больше или равна заданной (oldState.ts >= ts) |
| oldTsLe | string | Предыдущая метка времени должна быть меньше заданной (oldState.ts < ts) |
|             |            |                                                                                                                                                     |
| lc | строка | Время последнего изменения должно совпадать с указанным (state.lc == lc) |
| lcGt | string | Время последнего изменения не должно совпадать с указанным (state.lc != lc) |
| lcGe | строка | Время последнего изменения должно быть больше заданного значения (state.lc > lc) |
| lcLt | string | Время последнего изменения должно быть больше или равно указанному (state.lc >= lc) |
| lcLe | string | Метка времени последнего изменения должна быть меньше заданной (state.lc < lc) |
|             |            |                                                                                                                                                     |
| oldLc | string | Предыдущая метка времени последнего изменения должна совпадать с заданной (oldState.lc == lc) |
| oldLcGt | string | Предыдущая метка времени последнего изменения не должна совпадать с указанной (oldState.lc != lc) |
| oldLcGe | строка | Предыдущая метка времени последнего изменения должна быть больше заданного значения (oldState.lc > lc) |
| oldLcLt | string | Предыдущая метка времени последнего изменения должна быть больше или равна указанной (oldState.lc >= lc) |
| oldLcLe | string | Предыдущая метка времени последнего изменения должна быть меньше заданной (oldState.lc < lc) |
|             |            |                                                                                                                                                     |
| channelId | string | Идентификатор канала должен совпадать с указанным |
| | Регулярное выражение | Идентификатор канала, соответствующий регулярному выражению |
| | Массив | Идентификатор канала, соответствующий списку разрешенных идентификаторов каналов |
|             |            |                                                                                                                                                     |
| channelName | string | Название канала должно совпадать с указанным |
| | Регулярное выражение | Название канала, соответствующее регулярному выражению |
| | Массив | Название канала, соответствующее списку разрешенных названий каналов |
|             |            |                                                                                                                                                     |
| deviceId | string | Идентификатор устройства должен совпадать с указанным |
| | Регулярное выражение | Идентификатор устройства, соответствующий регулярному выражению |
| | Массив | Идентификатор устройства, сопоставленный со списком разрешенных идентификаторов устройств |
|             |            |                                                                                                                                                     |
| deviceName | string | Имя устройства должно совпадать с указанным |
| | Регулярное выражение | Имя устройства, соответствующее регулярному выражению |
| | Массив | Имя устройства, соответствующее списку разрешенных имен устройств |
|             |            |                                                                                                                                                     |
| enumId | string | Штат принадлежит заданному перечислению |
| | Регулярное выражение | Один идентификатор перечисления штата удовлетворяет заданному регулярному выражению |
| | Массив | Один идентификатор перечисления штата находится в заданном списке идентификаторов перечислений |
|             |            |                                                                                                                                                     |
| enumName | string | Штат принадлежит заданному перечислению |
| | Регулярное выражение | Одно из имен перечисления штата удовлетворяет заданному регулярному выражению |
| | Массив | Одно из имен перечислений штата есть в заданном списке имен перечислений |
|             |            |                                                                                                                                                     |
| из | строка | Новое значение получено из определенного адаптера |
| | Регулярное выражение | Новое значение получено из адаптера, соответствующего регулярному выражению |
| | Массив | Новое значение получено от адаптера, который присутствует в заданном списке разрешенных адаптеров |
|             |            |                                                                                                                                                     |
| fromNe | строка | Новое значение не получено из определенного адаптера |
| | Регулярное выражение | Новое значение получено не из адаптера, соответствующего регулярному выражению |
| | Массив | Новое значение не получено от адаптера, который фигурирует в заданном списке запрещенных адаптеров |
|             |            |                                                                                                                                                     |
| oldFrom | string | Старое значение получено из определенного адаптера |
| | Регулярное выражение | Старое значение получено от адаптера, соответствующего регулярному выражению |
| | Массив | Старое значение получено от адаптера, который присутствует в указанном списке разрешенных адаптеров |
|             |            |                                                                                                                                                     |
| oldFromNe | string | Старое значение не получено из определенного адаптера |
| | Регулярное выражение | Старое значение не получено от адаптера, соответствующего регулярному выражению |
| | Массив | Старое значение не принадлежит адаптеру, который фигурирует в указанном списке запрещенных адаптеров |

Примеры: Срабатывание на всех состояниях с идентификатором `'*.STATE'`, если они подтверждены и имеют новое значение `true`.

```js
{
    "id": /\.STATE$/,
    "val": true,
    "ack": true,
    "logic": "and"
}
```

**Примечание:** вы можете использовать регулярные выражения напрямую:

```js
on(/^system\.adapter\..*\.\d+\.memRss$/, function (obj) {
});

// same as
on({id: /^system\.adapter\..*\.\d+\.memRss$/, change: "ne"}, function (obj) {
});
```

Чтобы просто соединить два состояния, напишите:

```js
on('stateId1', 'stateId2');
```

Все изменения *stateId1* будут записаны в *stateId2*.

Если параметр `value` установлен в сочетании с идентификатором состояния в качестве второго параметра, то при любом изменении состояние будет заполнено значением `value`.

```js
on('stateId1', 'stateId2', 'triggered');
setState('stateId1', 'new value');

// stateId2 will be set to 'triggered'.
```

Функция `on` возвращает обработчик. Этот обработчик можно использовать, отписавшись от рассылки.

*Примечание:* По умолчанию в функцию обратного вызова передаются только состояния с качеством 0x00. Если вы хотите получить все события, добавьте `{q: '*'}` в структуру шаблона.

*Примечание:* Обратите внимание, что по умолчанию значение параметра «change» равно «any», за исключением случаев, когда задан только идентификатор в виде строки (например, `on('id', () => {});`). В последнем случае значение параметра «change» будет установлено на «ne».

*Примечание:* Если вы хотите также получать триггеры на удаление/истечение срока действия состояний, вам необходимо использовать команду change с `ne` или `any` И команду q с `*` в качестве фильтра!

*Примечание:* начиная с версии 4.3.2, в качестве второго параметра можно указать тип триггера: `on('my.id.0', 'any', obj => log(obj.state.val));`

### Один раз
Регистрирует одноразовую подписку, которая автоматически отменяется после первого вызова. Аналогично [на](#on---subscribe-on-changes-or-updates-of-some-state), но выполняется только один раз.

```js
once(pattern, callback);
```

### Подписка - то же самое, что и **[на](#on---subscribe-on-changes-or-updates-of-some-state)**
### Отписаться
```js
unsubscribe(id);
// or
unsubscribe(handler);
```

Удалить все подписки для заданного идентификатора объекта или для заданного обработчика.

```js
// By handler
let mySubscription = on({ id: 'javascript.0.myState', change: 'any' }, (data) => {
    // unsubscribe after first trigger
    if (unsubscribe(mySubscription)) {
        log('Subscription deleted');
    }
});

// by Object ID
on({ id: 'javascript.0.myState1', change: 'ne' }, (data) => {
    log('Some event');
});

on({ id: 'javascript.0.myState1', change: 'any' }, (data) => {
    // unsubscribe
    if (unsubscribe('javascript.0.myState1')) {
        log('All subscriptions deleted');
    }
});
```

### GetSubscriptions
Получите список подписок.

Пример результата:

```js
{
    'megad.0.dataPointName': [
        {
            name : 'script.js.NameOfScript',
            pattern : {
                id : 'megad.0.dataPointName',
                change : 'ne'
            }
        }
    ]
}
```

### GetFileSubscriptions
Получить список подписок на файлы.

Пример результата:

```js
{
    'vis.0$%$main/*': [
        {
            name : 'script.js.NameOfScript',
            id : 'vis.0',
            fileNamePattern: 'main/*'
        }
    ]
}
```

### Расписание
```js
schedule(pattern, callback);
```

Планировщик времени с астрономической функцией.

#### Расписание
Шаблон может представлять собой строку с [Синтаксис Крон](http://en.wikipedia.org/wiki/Cron), состоящую из 5 (без секунд) или 6 (с секундами) цифр:

```
* * * * * *
│ │ │ │ │ │
│ │ │ │ │ │
│ │ │ │ │ └───── day of week (0 - 6) (0 to 6 are Sunday to Saturday, or use names; 7 is Sunday, the same as 0)
│ │ │ │ └────────── month (1 - 12)
│ │ │ └─────────────── day of month (1 - 31)
│ │ └──────────────────── hour (0 - 23)
│ └───────────────────────── min (0 - 59)
└───────────────────────────── [optional] sec (0 - 59)
```

```js
// Example with 5 digits:
schedule('*/2 * * * *', () => {
    log('Will be triggered every 2 minutes!');
});

// Example with 6 digits:
schedule('*/3 * * * * *', () => {
    log('Will be triggered every 3 seconds!');
});
```

Шаблон также может быть объектом; он используется, в частности, если требуется указать секунды:

Объект может обладать следующими свойствами:

- `второй`
- `минута`
- `час`
- `дата`
- `месяц`
- `год`
- `dayOfWeek`

```js
schedule({ second: [20, 25] }, () => {
    log('Will be triggered at xx:xx:20 and xx:xx:25 of every minute!');
});

schedule({ hour: 12, minute: 30 }, () => {
    log('Will be triggered at 12:30!');
});
```

В качестве шаблона может использоваться объект Javascript Date (для определенного момента времени) — в этом случае он сработает только один раз.

Если необходимо указать время начала или окончания расписания, это также можно реализовать с помощью объекта. В этом случае объект обладает следующими свойствами:

- `start`
- `конец`
- `правило`

Начальное и конечное значения определяют объект Date, строку DateString или количество миллисекунд с 1 января 1970 года 00:00:00 UTC.
Правило представляет собой строку расписания с [Синтаксис Крон](http://en.wikipedia.org/wiki/Cron) или объект:

```js
let startTime = new Date(Date.now() + 5000);
let endTime = new Date(startTime.getTime() + 5000);
schedule({ start: startTime, end: endTime, rule: '*/1 * * * * *' }, () => {
    log('It will run after 5 seconds and stop after 10 seconds');
});
```

Само правило также может быть объектом:

```js
let today = new Date();
let startTime = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
let endTime =  new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
let ruleData = { hour: 12, minute: 30 };
schedule({ start: startTime, end: endTime, rule: ruleData }, () => {
    log('Will be triggered at 12:30, starting tomorow, ending in 7 days');
});
```

#### Астрофункция
Астрофункцию можно использовать через атрибут "astro":

```js
schedule({ astro: 'sunrise' }, () => {
    log("Sunrise!");
});

schedule({ astro: 'sunset', shift: 10 }, () => {
    log("10 minutes after sunset!");
});
```

Атрибут «сдвиг» — это смещение в минутах. Он также может быть отрицательным, чтобы определить время до астрономического события.

В функции astro-function в качестве атрибута можно использовать следующие значения:

- «Восход солнца»: восход солнца (верхний край солнца появляется на горизонте)
- `"sunriseEnd"`: восход солнца заканчивается (нижний край солнца касается горизонта)
- «Завершение золотого часа»: заканчивается утренний золотой час (мягкий свет, лучшее время для фотосъемки).
- `"solarNoon"`: солнечный полдень (солнце находится в наивысшей точке)
- `"золотой час"`: начинается вечерний золотой час
- `"sunsetStart"`: начинается закат (нижний край солнца касается горизонта)
- «закат»: закат (солнце скрывается за горизонтом, начинается вечерняя гражданская сумерка)
- «сумерки»: закат (начало вечерних морских сумерек)
- `"nauticalDusk"`: морские сумерки (начало вечерних астрономических сумерек)
- «ночь»: наступает ночь (достаточно темно для астрономических наблюдений)
- «конец ночи»: ночь заканчивается (начинаются утренние астрономические сумерки)
- `"nauticalDawn"`: морской рассвет (начало утренних морских сумерек)
- «рассвет»: рассвет (утренние морские сумерки заканчиваются, утренние гражданские сумерки начинаются)
- «надир»: надир (самый темный момент ночи, солнце находится в самом низком положении)

**Примечание:** для использования функции "astro" необходимо указать "широту" и "долготу" в настройках JavaScript-адаптера.

**Примечание:** В некоторых местах может случиться так, что ночи/ночного конца не будет. Пожалуйста, ознакомьтесь с информацией в разделе [здесь](https://github.com/mourner/suncalc/issues/70).

**Примечание:** Вы можете использовать функцию «включено» для планирования с небольшими изменениями:

```js
on({ time: '*/2 * * * *' }, () => {
    log((new Date()).toString() + " - Will be triggered every 2 minutes!");
});

on({ time: { hour: 12, minute: 30 }}, () => {
    log((new Date()).toString() + " - Will be triggered at 12:30!");
});

on({ astro: 'sunset', shift: 10 }, () => {
    log((new Date()).toString() + " - 10 minutes after sunset!");
});
```

## ScheduleById
```js
scheduleById(id, callback);
scheduleById(id, ack, callback);
```

Позволяет создавать расписание на основе значения состояния. Если значение состояния изменяется, старое расписание удаляется, и автоматически создается новое.

Поддерживаемые форматы:

- `[h]h:[m]m:ss` (например, `12:42:15`, `15:3:12`, `3:10:25`)
- `[h]h:[m]m` (например, `13:37`, `9:40`)

```js
scheduleById('0_userdata.0.configurableTimeFormat', () => {
    log('Executed!');
});
```

Пример: Создать состояние и зарегистрировать расписание при изменениях:

```js
createState(
    '0_userdata.0.myTime',
    '00:00:00', // default value
    {
        type: 'string',
        read: true,
        write: true
    },
    () => {
        scheduleById('0_userdata.0.myTime', () => {
            log('Executed!');
        });
    }
);
```

### GetSchedules
```js
const list = getSchedules(true);
```

Возвращает список всех заданий и расписаний CRON (кроме astro).
Аргумент должен быть `true`, если вы хотите получить список для **каждого запущенного скрипта**. В противном случае будут возвращены только расписания текущего скрипта.

```js
const list = getSchedules(true);
list.forEach(schedule => log(JSON.stringify(schedule)));

// clear all schedules in all scripts!
list.forEach(schedule => clearSchedule(schedule));
```

Пример выходных данных:

```
2020-11-01 20:15:19.929  - {"type":"cron","pattern":"0 * * * *","scriptName":"script.js.Heizung","id":"cron_1604258108384_74924"}
2020-11-01 20:15:19.931  - {"type":"schedule","schedule":"{"period":{}}","scriptName":"script.js.Heizung","id":"schedule_19576"}
```

### ClearSchedule
Если функция "astro" не используется, вы можете отменить расписание позже. Для этого необходимо сохранить объект расписания:

```js
let sch = schedule('*/2 * * * *', () => { /* ... */ });

// later:
clearSchedule(sch);
```

### GetAttr
```js
getAttr({ attr1: { attr2: 5 } }, 'attr1.attr2');
```

Возвращает атрибут объекта. Путь к атрибуту может быть вложенным, как в примере.

Если первый атрибут имеет тип string, функция попытается преобразовать эту строку в строку JSON.

### GetAstroDate
```js
getAstroDate(pattern, date, offsetMinutes);
```

Возвращает объект JavaScript Date для указанного астрономического имени (например, `"sunrise"` или `"sunriseEnd"`). Список допустимых значений см. в разделе [Астро](#astro--function) функции *schedule*.

Возвращаемый объект Date вычисляется на основе переданной *даты*. Если дата не указана, используется текущий день.

```js
let sunriseEnd = getAstroDate('sunriseEnd');
log(`Sunrise ends today at ${sunriseEnd.toLocaleTimeString()}`);

let today = new Date();
let tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
let tomorrowNight = getAstroDate('night', tomorrow);
```

**Примечание: В зависимости от вашего географического местоположения, в некоторых случаях, например, «ночь»/«конец ночи» могут отсутствовать в определенные моменты времени (например, в северных регионах в мае/июне каждого года!)

Для проверки правильности временных точек можно использовать веб-страницы, например, [suncalc.net](http://suncalc.net).

### IsAstroDay
```js
isAstroDay();
```

Возвращает `true`, если текущее время находится между восходом и закатом солнца.

### CompareTime
```js
compareTime(startTime, endTime, operation, timeToCompare);
```

Сравните заданное время с пределами.

Если `timeToCompare` не указано, будет использоваться фактическое время.

Возможны следующие операции:

- `">"` - если заданное время больше `startTime`
- `">="` - если заданное время больше или равно `startTime`
- `"<"` - если заданное время меньше `startTime`
- `"<="` - если заданное время меньше или равно `startTime`
- `"=="` - если заданное время равно `startTime`
- `"<>"` - если заданное время не равно `startTime`
- `"between"` - если заданное время находится в промежутке между `startTime` и `endTime`.
- `"не между"` - если указанное время не находится в интервале между `startTime` и `endTime`

Время может быть объектом типа Date, объектом Date со временем или просто временем.

Для определения времени можно использовать астрономические имена. Все 3 параметра можно установить как астрономическое время.
Возможны следующие значения: `sunrise`, `sunset`, `sunriseEnd`, `sunsetStart`, `dawn`, `dusk`, `nauticalDawn`, `nauticalDusk`, `nightEnd`, `night`, `goldenHourEnd`, `goldenHour`.
Подробнее см. [Астро](#astro--function).

```js
log(compareTime('sunsetStart', 'sunsetEnd', 'between') ? 'Now is sunrise' : 'Now is no sunrise');
```

Также можно задать время со смещением:

```js
log(compareTime({ astro: 'sunsetStart', offset: 30 }, { astro: 'sunrise', offset: -30 }, '>') ? 'Now is at least 30 minutes after sunset' : 'No idea');
```

Строение астрономического объекта.

```js
{
    astro: 'sunsetStart',// mandatory, can be written as string and not as object if offset and date are default
    offset: 30,          // optional
    date:   new Date()   // optional
}
```

### SetState
```js
setState(id, state, ack, callback);
```

*Примечание*: Следующие команды идентичны.

```js
setState('myState', 1, false);
setState('myState', { val: 1, ack: false });
setState('myState', 1);
```

Пожалуйста, обратитесь к https://github.com/ioBroker/ioBroker/wiki/Adapter-Development-Documentation#commands-and-statuses для получения информации об использовании `ack`.
Кратко:

- `ack` = `false`: Скрипт хочет отправить команду для выполнения целевым устройством/адаптером.
- `ack` = `true`: Команда успешно выполнена, и состояние обновлено как положительный результат.

### SetStateAsync
```js
await setStateAsync(id, state, ack);
```

Аналогично setState, но с `promise`.

### SetStateDelayed
```js
setStateDelayed(id, state, isAck, delay, clearRunning, callback);
```

Аналогично setState, но с задержкой в миллисекундах. Вы можете очистить все текущие задержки для этого ID (по умолчанию). Например:

```js
// Switch ON the light in the kitchen in one second
setStateDelayed('Kitchen.Light.Lamp', true,  1000);

// Switch OFF the light in the kitchen in 5 seconds and let first timeout run.
setStateDelayed('Kitchen.Light.Lamp', false, 5000, false, () => {
    log('Lamp is OFF');
});
```

Эта функция возвращает обработчик таймера, и этот таймер может быть остановлен индивидуально с помощью clearStateDelayed.

### SetStateChanged
```js
await setStateChanged(id, state, ack);
```

Аналогично setState, но устанавливает значение только в том случае, если оно действительно изменилось.

### SetStateChangedAsync
```js
await setStateChangedAsync(id, state, ack);
```

Аналогично setStateChanged, но с `promise`.

### ClearStateDelayed
```js
clearStateDelayed(id);
```

Сбрасывает все отложенные задачи для указанного идентификатора состояния или для конкретной отложенной задачи.

```js
setStateDelayed('Kitchen.Light.Lamp', false,  10000); // Switch OFF the light in the kitchen in ten second
let timer = setStateDelayed('Kitchen.Light.Lamp', true, 5000, false); // Switch ON the light in the kitchen in five second
clearStateDelayed('Kitchen.Light.Lamp', timer); // Nothing will be switched on
clearStateDelayed('Kitchen.Light.Lamp'); // Clear all running delayed tasks for this ID
```

### GetStateDelayed
```js
getStateDelayed(id);
```

Это синхронный вызов, и вы получите список всех запущенных таймеров (setStateDelayed) для этого идентификатора.
Вы можете вызвать эту функцию без указания идентификатора и получить таймеры для всех идентификаторов.
В случае вызова этой функции для конкретного идентификатора объекта вы получите следующий ответ:

```js
getStateDelayed('hm-rpc.0.LQE91119.1.STATE');

// returns an array like
[
    { timerId: 1, left: 1123,   delay: 5000,  val: true,  ack: false },
    { timerId: 2, left: 12555,  delay: 15000, val: false, ack: false },
]
```

Если запросить все идентификаторы, ответ будет выглядеть так:

```js
getStateDelayed();

// returns an object like
{
    'hm-rpc.0.LQE91119.1.STATE': [
        { timerId: 1, left: 1123,   delay: 5000,   val: true,  ack: false },
        { timerId: 2, left: 12555,  delay: 15000,  val: false, ack: false },
    ],
    'hm-rpc.0.LQE91119.2.LEVEL': [
        { timerId: 3, left: 5679, delay: 10000,   val: 100,  ack: false },
    ],
}
```

— `left` — это оставшееся время в миллисекундах.
— `delay` — это начальное значение задержки в миллисекундах.

Вы можете запросить ответ непосредственно по timerId. В этом случае ответ будет следующим:

```js
getStateDelayed(3);

// returns an object like
{ id: 'hm-rpc.0.LQE91119.2.LEVEL', left: 5679, delay: 10000, val: 100, ack: false }
```

### GetState
```js
getState(id);
```

Возвращает состояние с заданным идентификатором в следующем формате:

```js
{
    val: value,
    ack: true/false,
    ts: timestamp,
    lc: lastchanged,
    from: origin
}
```

Если состояние не существует, в логах будет выведено предупреждение, и будет возвращен объект `{ val: null, notExist: true }`.
Чтобы подавить предупреждение, проверьте, существует ли состояние, прежде чем вызывать getState (см. [существуетState](#existsState)).

### GetStateAsync
```js
const stateObject = await getStateAsync(id);
```

Аналогично getState, но с `promise`.

### ExistsState
```js
existsState(id, (err, isExists) => {});
```

Если опция "Не подписывать все состояния при запуске" отключена, можно использовать более простой вызов:

```js
existsState(id)
```

В этом случае функция возвращает либо true, либо false.

Проверьте, существует ли штат.

### GetObject
```js
getObject(id, enumName);
```

Получите описание идентификатора объекта, хранящегося в системе.
Вы можете указать имя перечисления. Если оно определено, к результату будут добавлены два дополнительных атрибута: enumIds и enumNames.
Эти массивы содержат все перечисления, членом которых является ID. Например:

```js
getObject('adapter.N.objectName', 'rooms');
```

Возвращает в формате enumIds все комнаты, в которых запрошенный объект является участником. Вы можете установить значение "true" в качестве enumName, чтобы получить *все* перечисления.

### SetObject
```js
setObject(id, obj, callback);
```

Запись объекта в базу данных. Эту команду можно отключить в настройках адаптера. Используйте эту функцию с осторожностью, так как это может повредить глобальные настройки.

Его следует использовать для **изменения** уже существующего объекта, который вы предварительно прочитали, например:

```js
const obj = getObject('adapter.N.objectName');
obj.native.settings = 1;
setObject('adapter.N.objectName', obj, (err) => {
    if (err) log('Cannot write object: ' + err);
});
```

### ExistsObject
```js
existsObject(id, function (err, isExists) {});
```

Если опция "Не подписывать все состояния при запуске" отключена, можно использовать более простой вызов:

```js
existsObject(id)
```

В этом случае функция возвращает либо true, либо false.

Проверьте, существует ли объект.

### ExtendObject
```js
extendObject(id, obj, callback);
```

Это почти то же самое, что и `setObject`, но сначала он считывает объект и пытается объединить все настройки.

Используйте его следующим образом:

```js
// Stop instance
extendObject('system.adapter.sayit.0', {common: {enabled: false}});
```

### DeleteObject
```js
deleteObject(id, isRecursive, callback);
```

Удаление объекта из базы данных по ID. Если объект имеет тип `state`, значение состояния также будет удалено.

Можно было бы указать дополнительный параметр `isRecursive`, чтобы все дочерние элементы с указанным ID были удалены. Это очень опасно!

Используйте его следующим образом:

```js
// Delete state
deleteObject('javascript.0.createdState');
```

*Примечание: опция `isRecursive` доступна только с js-controller >= 2.2.x*

### GetIdByName
```js
getIdByName(name, alwaysArray);
```

Возвращает идентификатор объекта с заданным именем.
Если объектов с таким именем несколько, результатом будет массив.
Если установлен флаг `alwaysArray`, результатом всегда будет массив, если найден какой-либо идентификатор.

### GetEnums
```js
getEnums(enumName);
```

Получите список существующих перечислений с такими элементами, как:

```js
getEnums('rooms');

// returns all rooms - e.g.:
[
    {
        id: 'enum.rooms.LivingRoom',
        members: [ 'hm-rpc.0.JEQ0024123.1', 'hm-rpc.0.BidCoS-RF.4' ],
        name: 'Living room'
    },
    {
        id: 'enum.rooms.Bath',
        members: [ 'hm-rpc.0.JEQ0024124.1', 'hm-rpc.0.BidCoS-RF.5' ],
        name: 'Bath'
    }
]

getEnums('functions');

// returns all functions - e.g.:
[
    {
        id: 'enum.functions.light',
        members: [
            '0_userdata.0.AnotherOne',
            '0_userdata.0.MyLigh'
        ],
        name: {
            en: 'Light',
            ru: 'Свет',
            de: 'Licht',
            fr: 'Lumière',
            it: 'Leggero',
            nl: 'Licht',
            pl: 'Lekki',
            pt: 'Luz',
            es: 'Luz',
            'zh-cn': '光'
        }
    }
]
```

### CreateState
```js
createState(name, initialValue, forceCreation, common, native, callback);
```

Если состояние и объект не существуют, создайте их в пространстве JavaScript, например, `javascript.0.mystate`.

!! Предпочтительно создавать собственные точки данных с полным идентификатором `0_userdata.0.mystate` !!!

#### Параметры:
- `name`: имя штата без указания пространства имен, например, `mystate`.
- `initialValue`: переменная может быть инициализирована после создания. Значение "undefined" означает, что значение не инициализируется.
- `forceCreation`: создать/перезаписать состояние независимо от того, существует ли это состояние или нет.
- `common`: общее описание объекта. См. описание [здесь](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#state)
- `native`: собственное описание объекта. Любая конкретная информация.
- `callback`: вызывается после создания и инициализации состояния.

Если вы установите в `common` флаг `alias` в значение `true`, то будет создан псевдоним с тем же именем (но в пространстве имен `alias.0`), что и состояние.
Псевдоним создается только в том случае, если он еще не существует.

Следующие настройки для псевдонимов также допустимы:

```js
common => {
    alias: {
        id: 'alias.0.myOtherState', // will be created automatically if not already exists
        write: 'val * 1000', // convert function for write to created state
        read: 'val / 1000'   // convert function to read from created state
    }
}
```

или

```js
common => {
    alias: {
        id: 'alias.0.myOtherState', // will be created automatically if not already exists
    }
}
```

Возможен короткий тип createState:

- `createState('myDatapoint')` - просто создает точку данных, если она не существует.
- `createState('myDatapoint', 1)` - создает точку данных, если она не существует, и инициализирует ее значением 1.
- `createState('myDatapoint', { type: 'string', role: 'json', read: true, write: false }, () => { log('created'); });` - с общими определениями, такими как type, read, write и role
- `createState('myDatapoint', { name: 'Моя собственная точка данных', unit: '°C' }, () => { log('created'); });`
- `createState('myDatapoint', 1, { name: 'Моя собственная точка данных', unit: '°C' })` - создает точку данных, если она не существует, с указанным именем и единицами измерения.

#### Объект на второй позиции всегда является `common`
Эти сокращенные формы являются причиной того, почему объект во второй позиции **никогда** не считывается как начальное значение. Поэтому `createState('myDatapoint', {}, { type: 'object' })` не делает того, что кажется: `{}` становится `common`, а `{ type: 'object' }` переходит к `native`.

Чтобы присвоить состоянию начальное значение, не являющееся примитивным типом данных, поместите его в `common.def`:

```js
createState('0_userdata.0.myObject', { name: 'My object', type: 'object', read: true, write: true, def: {} });
```

Состояние типа `object`, `json` или `array` сохраняет свое значение в формате JSON, поэтому указанное выше состояние начинается со строки `'{}'` — точно так же, как и `setState('0_userdata.0.myObject', {})`. По умолчанию значение преобразуется в строку; создание `def: '{}'` самостоятельно также работает.

### CreateStateAsync
```js
await createStateAsync(name, initialValue, forceCreation, common, native);
```

Аналогично `createState`, но обещание будет возвращено.

### DeleteState
```js
deleteState(name, callback);
```

Удалять состояние и объект в пространстве JavaScript, например, `javascript.0.mystate`. Состояния из других адаптеров удалить нельзя.

```js
deleteState('myDatapoint')
```

Просто удалите точку данных, если она существует.

### DeleteStateAsync
```js
await deleteStateAsync(name);
```

Аналогично `deleteState`, но обещание будет возвращено.

### CreateAlias
```js
createAlias(name, alias, forceCreation, common, native, callback);
```

Создайте псевдоним в пространстве `alias.0`, если он не существует, например, `javascript.0.myalias`, и укажите ссылку на состояние или состояния чтения/записи.
Общее определение берется из объекта идентификатора псевдонима для чтения, но предоставленное общее определение имеет приоритет.

#### Параметры:
- `name`: идентификатор нового состояния псевдонима (возможно и без пространства имен псевдонимов), например, `test.mystate` (будет добавлено пространство имен `alias.0.` = `alias.0.test.mystate`)
- `alias`: может быть либо существующим идентификатором состояния в виде строки, либо объектом с полным определением псевдонима, включая идентификаторы чтения/записи и функции чтения/записи. Примечание: определения псевдонимов нельзя задавать в качестве общего параметра!
- `forceCreation`: создать/перезаписать псевдоним независимо от того, существует ли состояние или нет.
- `common`: общее описание объекта псевдонима, см. описание [здесь](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#state). Значения, указанные здесь, будут иметь приоритет над общим определением объекта идентификатора псевдонима для чтения. Примечание: определения псевдонимов нельзя задать в качестве части этого общего параметра, см. параметр alias!
- `native`: собственное описание объекта. Любая конкретная информация.
- `callback`: вызывается после создания и инициализации состояния.

Возможен короткий тип createAlias:

- `createAlias('myAlias', 'myDatapoint')` - просто создает alias.0.myAlias, который ссылается на javascript.X.myDatapoint, если он не существует.
- `createAlias('myAlias', { id: { read: 'myReadDatapoint', write: 'myWriteDatapoint' }})` - создает псевдоним и ссылку на различные состояния чтения/записи.

Для получения более подробной информации см. createState, он аналогичен.

### CreateAliasAsync
```js
await createAliasAsync(name, alias, forceCreation, common, native);
```

Аналогично `createAlias`, но обещание будет возвращено.

### SendTo
```js
sendTo(adapter, command, message, callback);
sendTo(adapter, command, message, options, callback);
```

Отправить сообщение конкретному или всем экземплярам адаптера. При использовании имени адаптера сообщение отправляется всем экземплярам.

Для получения конкретной информации о сообщениях необходимо ознакомиться с документацией к конкретному адаптеру.

Пример (с настраиваемым таймаутом):

```js
sendTo('telegram', { user: 'UserName', text: 'Test message' }, { timeout: 2000 });
```

Некоторые адаптеры также поддерживают отправку ответов на отправленные сообщения (например, history, sql, telegram). Ответ возвращается в функцию обратного вызова только в том случае, если сообщение отправлено конкретному экземпляру!

Пример (с функцией обратного вызова):

```js
sendTo('telegram.0', { user: 'UserName', text: 'Test message' }, (res) => {
    log(`Sent to ${res} users`);
});
```

*Время ожидания по умолчанию составляет 20000 миллисекунд (если определена функция обратного вызова)*

```js
sendTo('telegram.0', { user: 'UserName', text: 'Test message' }, { timeout: 2000 }, (res) => {
    log(`Sent to ${res} users`);
});
```

### SendToAsync
```js
await sendToAsync(adapter, command, message);
await sendToAsync(adapter, command, message, options);
```

Аналогично sendTo, но с `promise`.

Пример:

```js
const res = await sendToAsync('sql.0', 'getEnabledDPs', {});
log(JSON.stringify(res));
```

### SendToHost
```js
sendToHost(hostName, command, message, callback);
```

Отправить сообщение экземпляру контроллера.

Поддерживаются следующие команды:

- `'cmdExec'`
- `'getRepository'`
- `'getInstalled'`
- `'getVersion'`
- `'getDiagData'`
- `'getLocationOnDisk'`
- `'getDevList'`
- `'getLogs'`
- `'getLogFile'`
- `'getLogFiles'`
- `'delLogs'`
- `'getHostInfo'`
- `'getHostInfoShort'`
- `'updateMultihost'`
- `'upgradeController'` - Обновить js-контроллер до последней версии
- `'getInterfaces'` - Возвращает все доступные сетевые интерфейсы системы.
- `'getInterfaces'` - Запускает загрузку адаптера
- `'rebuildAdapter'`
- `'readBaseSettings'`
- `'writeBaseSettings'`
- `'addNotification'`
- `'clearNotifications'`
- `'getNotifications'`
- `'updateLicenses'` - чтение лицензий с iobroker.net
- `'upgradeOsPackages'`
- `'restartController'`

Это довольно специфические команды, и они требуются нечасто.

Пример:

```js
sendToHost('myComputer', 'cmdExec', { data: 'ls /' }, (res) => {
    log('List of files: ' + res.data);
});
```

**Внимание:** Для вызова этой функции необходимо включить опцию *Включить команду "setObject"*.

### SendToHostAsync
```js
await sendToHostAsync(hostName, command, message);
```

Аналогично sendToHost, но с `promise`.

### SetInterval
```js
setInterval(callback, ms, arg1, arg2, arg3, arg4);
```

Аналогично javascript `setInterval`.

### ClearInterval
```js
clearInterval(id);
```

Аналогично javascript `clearInterval`.

### SetTimeout
```js
setTimeout(callback, ms, arg1, arg2, arg3, arg4);
```

Аналогично javascript `setTimeout`.

### ClearTimeout
```js
clearTimeout(id);
```

Аналогично javascript `clearTimeout`.

### SetImmediate
```js
setImmediate(callback, arg1, arg2, arg3, arg4);
```

Аналогично JavaScript `setImmediate` и почти идентично `setTimeout(callback, 0, arg1, arg2, arg3, arg4)`, но с более высоким приоритетом.

### FormatDate
```js
formatDate(millisecondsOrDate, format);
```

#### Параметры:
- `millisecondsOrDate`: количество миллисекунд из файла state.ts или state.lc (количество миллисекунд с 1970.01.01 00:00:00) или объект JavaScript *new Date()* или количество миллисекунд из *(new Date().getTime())*
- `format`: Может принимать значение `null`, в этом случае будет использоваться формат системного времени, в противном случае — `format`.

* ГГГГ, JJJJ, ГГГГ — полный год, например 2015.
* YY, JJ, ГГ – короткий год, например 15
* MM, ММ (кириллица) - полный месяц, например, 01
* M, М (кириллица) - короткий месяц, например, 1
* ДД, ТТ, ДД - полный день, например, 02
* D, T, Д - короткий день, например, 2
* чч, СС, чч - полные часы, например, 03
* ч, с, ч - короткие часы, например, 3
* мм, мм (кириллица) - полные минуты, например, 04
* м, м (кириллица) - короткие минуты, например, 4
* ss, сс (кириллица) - полные секунды, например, 05
* s, с (кириллица) - короткие секунды, например, 5
* sss, ссс (кириллица) - миллисекунды
* WW, НН (кириллица) - полный день недели в текстовом формате
* W, Н (кириллица) - сокращенное название дня недели в текстовом формате
* OO, ОО (кириллица) - полный месяц в текстовом виде
* ООО, ООО (кириллица) - полный месяц в виде текста в родительном падеже
* O, О (кириллица) - короткий месяц в текстовом формате

#### Пример
```js
formatDate(new Date(), "YYYY-MM-DD") // => Date "2015-02-24"
formatDate(new Date(), "hh:mm") // => Hours and minutes "17:41"
formatDate(state.ts) // => "24.02.2015"
formatDate(state.ts, "JJJJ.MM.TT SS:mm:ss.sss") // => "2015.02.15 17:41:98.123"
formatDate(new Date(), "WW") // => Day of week "Tuesday"
formatDate(new Date(), "W") // => Day of week "Tu"
```

### FormatTimeDiff
```js
formatTimeDiff(milliseconds, format);
```

#### Параметры:
- `миллисекунды`: разница в миллисекундах*
- `format`: Может быть `null`, в этом случае будет использоваться формат `hh:mm:ss`. В противном случае — нет.

* ДД, ТТ, ДД - полный день, например, "02"
* D, T, Д - короткий день, например, "2"
* чч, СС, чч - полные часы, например, "03"
* ч, с, ч - короткие часы, например, "3"
* мм, мм (кириллица) - полные минуты, например, "04"
* м, м (кириллица) - короткие минуты, например, "4"
* ss, сс (кириллица) - полные секунды, например, "05"
* s, с (кириллица) - короткие секунды, например, "5"

Для предотвращения замены можно использовать экранирующий символ `\`, например, `DD \Day\s, h \hour\s, m \minute, ss \second\s`.

#### Пример
```js
formatTimeDiff(60000, "mm:ss") // => "01:00"

const diff = 172800000 + 10800000 + 540000 + 15000; // 2 days, 3 hours, 9 minutes + 15 secoonds
formatTimeDiff(diff); // "51:09:15"
formatTimeDiff(diff, 'DD hh:mm'); // "02 03:09"
formatTimeDiff(diff, 'D hh:mm'); // "2 03:09"
formatTimeDiff(diff, 'hh:mm:ss'); // "51:09:15"
formatTimeDiff(diff, 'h:m:s'); // "51:9:15"
formatTimeDiff(diff, 'hh:mm'); // "51:09"
formatTimeDiff(diff, 'mm:ss'); // "3069:15"
formatTimeDiff(diff, 'hh'); // "51"
formatTimeDiff(diff, 'mm'); // "3069"
```

### GetDateObject
```js
getDateObject(stringOrNumber);
```

Преобразует строку или число в объект Date.
Если указаны только часы, к ним будет добавлена текущая дата, и будет предпринята попытка преобразования.

```js
getDateObject('20:00'); // 2024-05-18T18:00:00.000Z
getDateObject('2024-01-01'); // 2024-01-01T00:00:00.000Z
```

### FormatValue
```js
formatValue(value, decimals, format);
```

Преобразует любое значение (включая строки) в число. Заменяет точку запятой, если это настроено в системе.
Десятичные знаки указывают количество цифр после запятой. Значение по умолчанию — 2.
Формат необязателен:

- '.,': 1234.567 => 1.234,56
- ',.': 1234.567 => 1,234.56
- ' .': 1234.567 => 1 234.56

### AdapterSubscribe
```js
adapterSubscribe(id);
```

Отправьте адаптеру сообщение "subscribe", чтобы уведомить его. Если у адаптера есть общий флаг "subscribeable", то в случае использования функции "subscribe" эта функция будет вызвана автоматически.

### AdapterUnsubscribe
```js
adapterUnsubscribe(id);
```

Отправляет адаптеру сообщение `unsubscribe`, чтобы сообщить адаптеру о необходимости прекратить опрос значений.

### $ - Селектор
```js
$(selector).on((obj) => {}); // Register a subscription for each matching state
$(selector).toArray(); // Get all matching object IDs of the selector expression (requires version >= 8.2.0)
$(selector).each((id, i) => {}); // iterate over all matching states
$(selector).setState(value, ack, callback); // set state value of all matching object IDs (callback is optional)
$(selector).setStateAsync(value, ack); // set state value of all matching object IDs - returns a promise
$(selector).setStateChanged(value, ack, callback); // set state value of all matching object IDs if value has changed (callback is optional)
$(selector).setStateChangedAsync(value, ack, callback); // set state value of all matching object IDs if value has changed - returns a promise
$(selector).setStateDelayed(state, isAck, delay, clearRunning, callback); // // set state value of all matching object IDs with a given delay
$(selector).getState(); // get all states
$(selector).getStateAsync(); // get all states - returns a promise
```

Формат селектора:

```js
"name[commonAttr=something1](enumName=something2){nativeName=something3}[id=idfilter][state.id=idfilter]"
```

Имя может быть: состояние, канал, устройство или расписание. `idfilter` может содержать подстановочные знаки '*'

Префиксы ***(не реализованы - требуют обсуждения)*** :

* \# - брать по имени, а не по идентификатору
* . - фильтр по роли
* § - фильтр по комнате

***Пример***:

- `$('state[id=*.STATE]')` или `$('state[state.id=*.STATE]')` или `$('*.STATE')` - выбрать все штаты, идентификатор которых заканчивается на ".STATE".
- `$('state[id='hm-rpc.0.*]')` или `$('hm-rpc.0.*')` - возвращает все состояния экземпляра адаптера hm-rpc.0
- `$('channel(rooms=Living room)')` - все состояния в комнате "Living room"
- `$('channel{TYPE=BLIND}[state.id=*.LEVEL]')` - Получить все жалюзи Homematic
- `$('channel[role=switch](rooms=Living room)[state.id=*.STATE]').setState(false)` - Изменяет все состояния каналов с ролью "switch" в "Living room" на false, используя .STATE
- `$('channel[state.id=*.STATE](functions=Windows)').each(function (id, i) {log(id);});` - вывести все состояния перечисления "windows" в лог
- `$('schedule[id=*65]').each(function (id, i) {log(id);});` - вывести все расписания, в конце которых стоит число 65.
- `$('.switch §"Гостиная")` - Принимать состояния всех переключателей в "Гостиной" ***(не реализовано - требует обсуждения)***
- `$('channel .switch §"Living room")` - Передача состояний всех переключателей в "Гостиной" ***(не реализовано - требует обсуждения)***

***Пояснение*** Давайте посмотрим:

```js
$('channel[role=switch][state.id=*.STATE](rooms=Wohnzimmer)').on(obj => {
   log('New state ' + obj.id + ' = ' + obj.state.val);
});
```

Этот код выполняет поиск по каналам.
Находит все каналы с идентификатором `common.role="switch"`, принадлежащие к `enum.rooms.Wohnzimmer`.
Берёт все их состояния, идентификаторы которых заканчиваются на `".STATE"`, и оформляет подписку на все эти состояния.
Если какое-либо из этих состояний изменится, будет вызвана функция обратного вызова, аналогичная функции «on».

Возможны следующие функции: setState, getState (только начиная с первого значения), on, each, toArray

```js
// Switch on all switches in "Wohnzimmer"
$('channel[role=switch][state.id=*.STATE](rooms=Wohnzimmer)').setState(true);
```

Вы можете прервать цикл "each", вернув значение false, например:

```js
// print two first IDs of on all switches in "Wohnzimmer"
$('channel[role=switch][state.id=*.STATE](rooms=Wohnzimmer)').each((id, i) => {
    log(id);
    if (i == 1) {
        return false;
    }
});
```

Или же вы можете получить обычный массив идентификаторов и обработать его по-своему:

```js
// get some state and filter only which has an `true` value
const enabled = $('channel[role=switch][state.id=*.STATE](rooms=Wohnzimmer)').toArray().filter((id) => getState(id)?.val === true);
```

### ReadFile
```js
readFile(adapter, fileName, (error, bytes) => {});
```

Результат будет передан в функции обратного вызова.
Чтение файла из базы данных из папки `javascript.0`.

Аргумент *адаптер* можно опустить.

```js
// read vis views
readFile('vis.0', '/main/vis-views.json', (error, data) => {
    log(data.substring(0, 50));
});

// The same as
//readFile('/../vis.0/main/vis-views.json', (error, data) => {
//     log(data.substring(0, 50));
//});
```

По умолчанию рабочий каталог/адаптер — `javascript.0`.

### WriteFile
```js
writeFile(adapter, fileName, bytes, (error) => {});
```

В функции обратного вызова будет передан необязательный код ошибки. Аргумент *adapter* можно опустить.
fileName — это имя файла в базе данных. Все файлы хранятся в папке "javascript".
Если вы хотите записывать данные в другие папки, например, в "/vis.0/", используйте для этого setFile.

Файл, имеющий вид `'/subfolder/file.txt'`, будет храниться в папке `"/javascript/subfolder/file.txt"` и доступен через веб-сервер по адресу `"http://ip:8082/javascript/subfolder/file.txt"`

```js
// store screenshot in DB
const fs = require('node:fs');
let data = fs.readFileSync('/tmp/screenshot.png');
writeFile(null, '/screenshots/1.png', data, (error) => {
    log('file written');
});

// The same as
//writeFile('/screenshots/1.png', data, function (error) {
//    log('file written');
//});
```

```js
// store file in '/vis.0' in DB
const fs = require('node:fs');
let data = fs.readFileSync('/tmp/screenshot.png');
writeFile('vis.0', '/screenshots/1.png', data, (error) => {
    log('file written');
});
```

### DelFile
```js
delFile(adapter, fileName, (error) => {});
```

Удалить файл или каталог. fileName — это имя файла или каталога в базе данных.

Альтернативное название этого метода — `unlink`

### ПереименоватьФайл
```js
renameFile(adapter, oldName, newName, (error) => {});
```

Переименовать файл или каталог. oldName — это имя файла или каталога в базе данных, которое переименовывается в newName.

Альтернативное название этого метода — `rename`

### OnFile
```js
onFile(id, fileName, withFile, (id, fileName, size, fileData, mimeType) => {});
// or
onFile(id, fileName, (id, fileName, size) => {});
```

Подписаться на обновления файла:

- `id` — это идентификатор объекта типа `meta`, например `vis.0`.
— `fileName` — это имя файла или шаблон, например `main/*` или `main/vis-view.json`.
— Параметр `withFile` определяет, следует ли передавать содержимое файла в функцию обратного вызова или нет. Передача содержимого файла требует памяти и времени, поэтому, если вы хотите получать только уведомления об изменениях, установите `withFile` в значение false.

Аргументы в функции обратного вызова:

- `id` - ID объекта `meta`;
- `fileName` - имя файла (а не шаблон);
- `size` - новый размер файла;
- `fileData` - содержимое файла типа `Buffer`, если файл является двоичным (определяется по расширению) или строковым. Доставляется только при использовании `withFile`;
- `mimeType` - MIME-тип файла, например `image/jpeg`. Доставляется только при использовании `withFile`;

**Важно**: эта функциональность доступна только в js-controller версии 4.1.x или новее.

### OffFile
```js
offFile(id, fileName);
// or
onFile(id, fileName);
```

Отписаться от отслеживания изменений файлов:

- `id` — это идентификатор объекта типа `meta`, например `vis.0`.
— `fileName` — это имя файла или шаблон, например `main/*` или `main/vis-view.json`.

**Важно**: эта функциональность доступна только в js-controller версии 4.1.x или новее.

### OnStop
```js
onStop (() => { /* do something when script is stopped */ }, timeout);
```

Установите функцию обратного вызова, которая будет вызвана, если выполнение скрипта будет остановлено. Используется, например, для прекращения обмена данными или закрытия соединений.

```js
// establish connection
const conn = require('net');
// ...

// close connection if script stopped
onStop((callback) => {
    if (conn) {
        // close connection
        conn.destroy();
    }
    callback();
}, 2000 /*ms*/);
```

`timeout` по умолчанию равно 1000 мс.

### GetHistory
```js
getHistory(instance, options, (error, result, options, instance) => {});
```

Считывание истории из указанного экземпляра. Если экземпляр не указан, будет использован системный экземпляр истории по умолчанию.

```js
// Read history of 'system.adapter.admin.0.memRss' from sql driver
const end = new Date().getTime();
getHistory(
    'sql.0',
    {
        id:         'system.adapter.admin.0.memRss',
        start:      end - 3600000,
        end:        end,
        aggregate:  'm4',
        timeout:    2000
    },
    (err, result) => {
        if (err) console.error(err);
        if (result) {
            for (let i = 0; i < result.length; i++) {
                log(result[i].id + ' ' + new Date(result[i].ts).toISOString());
            }
        }
    }
);
```

Возможные варианты, которые вы можете найти: [здесь](https://github.com/ioBroker/ioBroker.history#access-values-from-javascript-adapter).

Кроме того, к этим параметрам необходимо указать "id", а также можно задать время ожидания (по умолчанию: 20000 мс).

Ещё один пример:

```js
// Get last 50 entries from default history instance with no aggregation:
getHistory({
        id:         'system.adapter.admin.0.alive',
        aggregate:  'none',
        count:      50
    }, (err, result) => {
        if (err) console.error(err);
        if (result) {
            for (let i = 0; i < result.length; i++) {
                log(result[i].id + ' ' + new Date(result[i].ts).toISOString());
            }
        }
    });
```

**Примечание:** Разумеется, историю просмотров необходимо предварительно включить для выбранного ID в административной панели.

### RunScript
```js
runScript('scriptName', () => {
    // Callback is optional
    log('Srcipt started, but not yet executed');
});
```

Запускает или перезапускает другие скрипты (и себя самого) по имени.

```js
// restart script
runScript('groupName.scriptName1');
```

### RunScriptAsync
Аналогично runScript, но с `promise`.

```js
runScriptAsync('scriptName')
    .then(() => log('Script started, but not yet executed'));

// or

await runScriptAsync('scriptName');
log(`Script was restarted`);
```

### StartScript
```js
startScript('scriptName', ignoreIfStarted, callback);
```

Запускает скрипт. Если параметр ignoreIfStarted установлен в значение true, ничего не будет сделано, если скрипт еще запущен, в противном случае скрипт будет перезапущен.

```js
startScript('scriptName', true); // start script if not started
```

### StartScriptAsync
Аналогично runScript, но с `promise`.

```js
startScriptAsync('scriptName', ignoreIfStarted)
    .then(started => log(`Script was ${started ? 'started' : 'already started'}`));

// or

const started = await startScriptAsync('scriptName', ignoreIfStarted);
log(`Script was ${started ? 'started' : 'already started'}`);
```

Запускает скрипт. Если параметр ignoreIfStarted установлен в значение true, ничего не будет сделано, если скрипт еще запущен, в противном случае скрипт будет перезапущен.

```js
startScript('scriptName', true); // start script if not started
```

### StopScript
```js
stopScript('scriptName', callback);
```

Если вызов функции stopScript выполняется без аргументов, она остановится сама по себе:

```js
stopScript();
```

### StopScriptAsync
Аналогично stopScript, но с `promise`:

```js
stopScriptAsync('scriptName')
    .then(stopped => log(`Script was ${stopped ? 'stopped' : 'already stopped'}`));

//or
const stopped = await stopScriptAsync('scriptName');
log(`Script was ${stopped ? 'stopped' : 'already stopped'}`);
```

Если вызов функции stopScript выполняется без аргументов, она остановится сама по себе:

```js
stopScript();
```

### IsScriptActive
```js
isScriptActive('scriptName');
```

Возвращает значение, указывающее, включен или выключен скрипт. Обратите внимание, что это значение не указывает, запущен скрипт или нет.
Скрипт может быть завершен, но при этом оставаться активированным.

Это не функция. Это переменная с экземпляром JavaScript, видимая в области видимости скрипта.

### ToInt
### ToFloat
### ToBoolean
### JsonataExpression
### Ждать
Просто приостановите выполнение скрипта.
Внимание: эта функция имеет идентификатор `promise` и должна вызываться следующим образом:

```js
await wait(1000);
```

### Спать
То же, что и [ждать](#wait)

### MessageTo
```js
messageTo({ instance: 'instance', script: 'script.js.common.scriptName', message: 'messageName' }, data, { timeout: 1000 }, result =>
    log(JSON.stringify(result)));
```

Отправьте сообщение через "шину сообщений" другому скрипту. Или даже обработчику в том же скрипте.

По умолчанию время ожидания обратного вызова составляет 5 секунд.

Целевой объект можно сократить до:

```js
messageTo('messageName', data, (result) => {
    log(JSON.stringify(result));
});
```

Функции обратного вызова и параметры являются необязательными, а время ожидания по умолчанию составляет 5000 миллисекунд (если функция обратного вызова предоставлена).

```js
messageTo('messageName', dataWithNoResponse);
```

### MessageToAsync
```js
onMessage('myTopic', async (data, callback) => {
    log(data);

    if (!data.myPayload) {
        // return error (promise reject)
        callback({ error: 'something went wrong!!' });
    } else {
        // return result (promise resolve)
        callback({ result: 'ok' });
    }
});

(async () => {
    try {
        const msg = await messageToAsync({ instance: 0, script: 'script.js.test2', message: 'myTopic' }, { myPayload: true }, { timeout: 1000 });
        log(`Done with: ${JSON.stringify(msg)}`);
    } catch (error) {
        // contents of result.error
        console.error(error);
    }
})();
```

### OnMessage
```js
onMessage('messageName', (data, callback) => {
    log(`Received data: ${data}`);

    callback({ result: Date.now() });
});
```

Подписывается на шину сообщений адаптера `javascript` и отправляет ответ через обратный вызов.
Ответ от скрипта, который отправил ответ первым, будет принят как ответ, все остальные ответы будут проигнорированы.

Чтобы отправить сообщение JavaScript-скрипту, который затем будет получен этим обработчиком, используйте [messageTo](#messageTo).

Для отправки сообщения с любого другого адаптера используйте

```js
adapter.sendTo('javascript.0', 'toScript', {
    script: 'script.js.messagetest',
    message: 'messageName',
    data: {
        flag: true
    }
});
```

Для отправки сообщения из командной строки используйте

```bash
iob message javascript.0 toScript '{"script": "script.js.messagetest", "message": "messageName", "data": { "flag": true }}'
```

### OnMessageUnregister
```js
const id = onMessage('messageName', (data, callback) => {
    log(data);
    callback({ result: Date.now() });
});

// unsubscribe specific handler
onMessageUnregister(id);
// or unsubscribe by name
onMessageUnregister('messageName');
```

Отписаться от этой рассылки.

### OnLog
```js
onLog('error', data => {
    sendTo('telegram.0', { user: 'UserName', text: data.message });
    log('Following was sent to telegram: ' + data.message);
});
```

Подпишитесь на обновления журналов с указанным уровнем серьезности.

*Важно:* Во избежание бесконечных циклов нельзя выводить сообщения в обработчике с одинаковым уровнем серьезности.

Например, это не приведет к созданию каких-либо логов:

```js
onLog('error', data => {
    console.error('Error: ' + data.message);
});
```

Для получения всех логов можно использовать `*`. В этом случае вывод логов в обработчике будет полностью отключен.

```js
onLog('*', data => {
    console.error('Error: ' + data.message); // will produce no logs
});
```

### OnLogUnregister
```js
function logHandler(data) {
    console.error('Error: ' + data.message);
}
const id = onLog('warn', logHandler);

// unsubscribe by ID
onLogUnregister(id);
// or unsubscribe by function handler
onLogUnregister(logHandler);
// or unsubscribe all handlers with specific severity
onLogUnregister('warn');
```

Отписывается от этих журналов.

### HttpGet
*Требуется версия >= 7.9.0*

```js
httpGet('http://jsonplaceholder.typicode.com/posts', (err, response) => {
    if (!err) {
        console.log(response.statusCode);
        console.log(response.data);
    } else {
        console.error(err);
    }
});
```

Второй параметр может быть объектом с дополнительными опциями (необязательными). Все опции необязательны. Поддерживаемые флаги:

- `timeout` (число) - Время ожидания в миллисекундах
- `responseType` (строка) - Поддерживаемые значения: `text` (по умолчанию) или `arraybuffer` для двоичных данных в ответе.
- `basicAuth` (объект) - Учетные данные для базовой HTTP-аутентификации. Например: `{ user: 'admin', password: 'iobroker' }`
- `bearerAuth` (строка) - Токен для аутентификации носителя
- `headers` (объект) - Дополнительные пользовательские HTTP-заголовки, например, `{ 'Accept-Language': 'en-GB,en;q=0.9' }`
- `validateCertificate` (логическое значение) - Разрешает использование самоподписанных сертификатов, если значение равно `false`.

```js
httpGet('http://jsonplaceholder.typicode.com/posts', { timeout: 1000 }, (err, response) => {
    if (!err) {
        console.log(response.statusCode);
        console.log(response.data);
    } else {
        console.error(err);
    }
});
```

Загрузите файл в файловую систему ioBroker:

```js
httpGet('http://1.2.3.4/image.jpg', { responseType: 'arraybuffer' }, async (err, response) => {
    if (!err) {
        writeFile('0_userdata.0', 'test.jpg', response.data, (err) => {
            if (err) {
                console.error(err);
            }
        });
    } else {
        console.error(err);
    }
});
```

Отключить проверку сертификатов — *Требуется версия >= 8.4.0*

```js
httpGet('http://jsonplaceholder.typicode.com/posts', { validateCertificate: false }, (err, response) => {
    if (!err) {
        console.log(response.statusCode);
        console.log(response.data);
    } else {
        console.error(err);
    }
});
```

### HttpPost
*Требуется версия >= 7.9.0*

```js
httpPost('http://jsonplaceholder.typicode.com/posts', { title: 'foo', body: 'bar', userId: 1 }, (error, response) => {
    if (!error) {
        console.log(response.statusCode);
        console.log(response.data);
        console.log(response.headers);
    } else {
        console.error(error);
    }
});
```

С пользовательскими заголовками и аутентификацией

```js
httpPost(
    'http://jsonplaceholder.typicode.com/posts',
    {
        title: 'foo',
        body: 'bar',
        userId: 1
    },
    {
        timeout: 2000,
        basicAuth: {
            user: 'admin',
            password: 'dg2LdALNznHFNo'
        },
        headers: {
            'Cookie': 'PHPSESSID=298zf09hf012fh2; csrftoken=u32t4o3tb3gg43; _gat=1'
        }
    },
    (error, response) => {
        if (!error) {
            console.log(response.statusCode);
            console.log(response.data);
            console.log(response.headers);
        } else {
            console.error(error);
        }
    }
);
```

### CreateTempFile
*Требуется версия >= 8.3.0*

```js
httpGet('https://raw.githubusercontent.com/ioBroker/ioBroker.javascript/master/admin/javascript.svg', { responseType: 'arraybuffer' }, async (err, response) => {
    if (err) {
        console.error(err);
    } else {
        const tempFilePath = createTempFile('javascript.svg', response.data);
        console.log(`Saved to ${tempFilePath}`);

        // Use the new path in other scripts (e.g. sendTo)
    }
});
```

```js
onFile('0_userdata.0', '*.jpg', true, async (id, fileName, size, data, mimeType) => {
    const tempFilePath = createTempFile(fileName, response.data);

    // Use the new path in other scripts (e.g. sendTo)
});
```

```js
readFile('0_userdata.0', 'test.jpg', (err, data, mimeType) => {
    if (err) {
        console.error(err);
    } else {
        const tempFilePath = createTempFile('test.jpg', data);

        // Use the new path in other scripts (e.g. sendTo)
        sendTo('telegram.0', 'send', {
            text: tempFilePath,
            caption: 'Just a test image',
            user: 'yourUsername',
        });
    }
});
```

## RegisterNotification
*Требуется версия >= 8.8.0*

```js
registerNotification('This is just an information'); // Notify
registerNotification('This is an important message!', true); // Alert
```

## Глобальные переменные скрипта
### ScriptName
`scriptName` - Название скрипта.

```js
log(`Script ${scriptName} started!`);
```

### Пример
`instance` - Экземпляр JavaScript, в котором выполняется скрипт (например, `0`).

```js
log(`Script ${scriptName} started started by ${instance}`);
```

### DefaultDataDir
`defaultDataDir` - Абсолютный путь к данным iobroker.

```js
log(`Data dir: ${defaultDataDir}`);
```

### Подробный
`verbose` - Подробный режим включен?

```js
log(`Verbose mode: ${verbose ? 'enabled' : 'disabled'}`);

// Example
if (verbose) {
    log('...');
}
```

### СЕКРЕТЫ
`SECRETS` - Учетные данные центрального хранилища учетных данных ioBroker.

Управление учетными данными осуществляется в административном интерфейсе в разделе **Основные настройки** -> **Учетные данные**. Каждые учетные данные имеют идентификатор (например, `CameraPassword`) и содержат либо один **ключ** (например, ключ API или пароль), либо пару **логин/**пароль**. Секретные поля хранятся в зашифрованном виде с использованием системного секрета и передаются скриптам уже в расшифрованном виде.

```js
// credential of the type "key"
httpGet(`http://camera.local/snapshot?password=${SECRETS.CameraPassword.key}`, (err, result) => {
    // ...
});

// credential of the type "login"
log(`Mail account: ${SECRETS.MyMailAccount.login} / ${SECRETS.MyMailAccount.password}`);

// credential IDs that are no valid variable names
log(SECRETS['My camera'].key);
```

`SECRETS` является значением только для чтения и всегда актуально: если учетные данные добавляются, изменяются или удаляются в административном интерфейсе, новое значение используется немедленно — ни адаптер, ни скрипт не нужно перезапускать.

Если учетные данные не существуют, возвращается `undefined`:

```js
if (SECRETS.CameraPassword) {
    log('The camera password is defined');
}
```

#### Какие поля содержатся в учетных данных?
Каждые учетные данные имеют либо одну пару `key`, либо пару `login`/`password`. Существует три способа узнать, какая именно:

- В настройках экземпляра JavaScript-адаптера в разделе **Доступные учетные данные** перечислены все

учетные данные с их полями и готовым к копированию выражением.

— В редакторе автозавершение после `SECRETS.` предлагает существующие учетные данные, а после

далее укажите точно те поля, которые содержатся в учетных данных.

- В сценарии:

```js
log(JSON.stringify(Object.keys(SECRETS.CameraPassword))); // ["key"]
log(JSON.stringify(Object.keys(SECRETS.MyMailAccount))); // ["login","password"]
```

В Blockly есть блокировка **учетных данных** для той же цели — см. [Блочная документация](blockly.md#credential).

Доступ можно отключить с помощью параметра экземпляра **Разрешить скриптам читать учетные данные**.

В этом случае `SECRETS` становится пустым, и в журнал записывается предупреждение.

**Примечание:** Для этого требуется js-controller версии 7.2 или новее.

## Опция - "Не подписывать все состояния при запуске"
Существует два способа присоединения к государствам:

1. Адаптер подписывается на все состояния при запуске и получает все изменения всех состояний (просто использовать getState(id), но это требует больше ресурсов процессора и оперативной памяти):

```js
log(getState('someID').val);
```

2. Адаптер подписывается каждый раз на указанный ID при вызове `on/subscribe`. В этом режиме адаптер получает обновления только для желаемых состояний. Этот вариант требует меньше оперативной памяти и более эффективен, но вы не можете получить доступ к состояниям синхронно через `getState`. **Для доступа к состояниям необходимо использовать коллбэки или промисы**:

```js
getState('someID', (error, state) => {
    log(state.val);
});
```

Причина: адаптер не хранит значение состояния в оперативной памяти и должен запросить его из центральной базы данных состояний.

## Активность скриптов
Существует возможность включать и отключать скрипты с помощью состояний. Для каждого скрипта будет создано состояние с именем `javascript.INSTANCE.scriptEnabled.SCRIPT_NAME`.
Скрипты можно активировать и деактивировать, управляя этим состоянием с помощью `ack=false`.