---
chapters: {"pages":{"en/adapterref/iobroker.javascript/README.md":{"title":{"en":"ioBroker.javascript"},"content":"en/adapterref/iobroker.javascript/README.md"},"en/adapterref/iobroker.javascript/blockly.md":{"title":{"en":"Contents"},"content":"en/adapterref/iobroker.javascript/blockly.md"},"en/adapterref/iobroker.javascript/javascript.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.javascript/javascript.md"},"en/adapterref/iobroker.javascript/upgrade-guide.md":{"title":{"en":"Upgrade guide"},"content":"en/adapterref/iobroker.javascript/upgrade-guide.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.javascript/javascript.md
title: нет названия
hash: GAJA8RS9IaFYK+wuVs1bjbRRKC6HtRWjGW6E6KDCY74=
---
## Содержание
- [Примечание](#примечание)
- [Глобальные функции](#global-functions)
- [Лучшая практика](#лучшая-практика)

- [Функции](#следующие-функции-могут-быть-использованы-в-скриптах)
- [require - загрузить некоторый модуль](#require---load-some-module)
- [console - Выдает сообщение в журнал](#console---выдает-сообщение-в-журнал)
- [exec - выполнить некоторую команду ОС, например "cp file1 file2"](#exec---execute-some-os-command-like-cp-file1-file2)
- [on - Подписаться на изменения или обновления некоторого состояния](#on---subscribe-on-changes-or-updates-of-some-state)
- [один раз](#один раз)
- [подписаться - то же, что и на](#подписаться---то же-что-на)
- [отписаться](#отписаться)
- [getSubscriptions](#getsubscriptions)
- [getFileSubscriptions](#getfilesubscriptions)
- [расписание](#расписание)
- [Расписание](#time-schedule)
- [Астро-функция](#астро-функция)
- [scheduleById](#schedulebyid)
- [getSchedules](#getschedules)
- [clearSchedule](#clearschedule)
- [getAttr](#getattr)
- [getAstroDate](#getastrodate)
- [isAstroDay](#isastroday)
- [сравнитьВремя](#сравнитьвремя)
- [установитьСостояние](#установитьСостояние)
    - [setStateAsync](#setstateasync)
    - [setStateDelayed](#setstatedelayed)
- [clearStateDelayed](#clearstatedelayed)
- [getStateDelayed](#getstatedelayed)
- [получитьСостояние](#получитьСостояние)
- [getStateAsync](#getstateasync)
- [существуетСостояние](#существуетСостояние)
- [получитьОбъект](#получитьОбъект)
- [установитьОбъект](#установитьОбъект)
- [существуетОбъект](#существуетОбъект)
- [extendObject](#extendobject)
- [удалитьОбъект](#удалитьОбъект)
- [getIdByName](#getidbyname)
- [getEnums](#getenums)
- [createState](#createstate)
- [createStateAsync](#createstateasync)
- [deleteState](#deletestate)
- [deleteStateAsync](#deletestateasync)
- [отправитьКому](#отправитькому)
- [sendToAsync](#sendtoasync)
- [отправитьХосту](#отправитьХосту)
- [sendToHostAsync](#sendtohostasync)
- [setInterval](#setinterval)
- [clearInterval](#clearinterval)
- [setTimeout](#settimeout)
- [clearTimeout](#cleartimeout)
- [установить немедленно](#установить немедленно)
- [форматДаты](#форматдаты)
- [formatTimeDiff](#formattimediff)
- [getDateObject](#getDateObject)
- [formatValue](#formatvalue)
- [adapterSubscribe](#adaptersubscribe)
- [adapterUnsubscribe](#adapterunsubscribe)
- [$ - Селектор](#---селектор)
- [readFile](#readfile)
- [writeFile](#writefile)
- [delFile](#delFile)
- [переименоватьФайл](#переименоватьФайл)
- [onFile](#onFile)
- [offFile](#offFile)
- [onStop](#onstop)
- [getHistory](#gethistory)
- [runScript](#runscript)
- [runScriptAsync](#runScriptAsync)
- [startScript](#startscript)
- [startScriptAsync](#startscriptasync)
- [стопСкрипт](#стопСкрипт)
- [stopScriptAsync](#stopScriptAsync)
- [isScriptActive](#isscriptactive)
- [имя](#scriptName)
- [экземпляр](#экземпляр)
- [сообщениеКому](#сообщениеКому)
- [сообщениеВАсинхронизацию](#сообщениеВАсинхронизацию)
- [onMessage](#onmessage)
- [onMessageUnregister](#onmessageunregister)
- [onLog](#onlog)
    - [onLogUnregister](#onlogunregister)
- [подождать](#подождать)
- [спать](#спать)
- [httpGet](#httpget)
- [httpPost](#httppost)
- [createTempFile](#createtempfile)
- [регистрироватьУведомление](#регистрироватьУведомление)

- [Активность скриптов](#scripts-activity)
- [Журнал изменений](#журнал изменений)

## Глобальные функции
Вы можете определить глобальные скрипты в папке `global`.
Все глобальные скрипты доступны на всех экземплярах. Если глобальный скрипт отключен, он не будет использоваться.
Глобальный скрипт будет просто добавлен к обычному скрипту и скомпилирован, поэтому вы не сможете обмениваться данными между скриптами через глобальные скрипты. Используйте для этого состояния.

Чтобы использовать глобальные функции в TypeScript, вам нужно сначала `declare` их, чтобы компилятор знал о глобальных функциях. Пример:

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

#### Лучшая практика:
Создайте два экземпляра адаптера javascript: один «тестовый» и один «производственный».
После того, как скрипт протестирован в экземпляре «тестовый», его можно переместить в «производственный». Таким образом, вы можете перезапустить экземпляр «тестовый» по своему усмотрению.

## В скриптах можно использовать следующие функции:
### Требуется - загрузить какой-то модуль
```js
const mod = require('module_name');
```

Предварительно загружены следующие модули: `node:dgram`, `node:crypto`, `node:dns`, `node:events`, `node:fs`, `node:http`, `node:https`, `node:http2`, `node:net`, `node:os`, `node:path`, `node:util`, `node:stream`, `node:zlib`, `suncalc2`, `axios`, `wake_on_lan`, `request` (устарело)

Чтобы использовать другие модули, введите имя (и версию) модуля в конфигурации экземпляра. ioBroker установит модуль. Вы можете потребовать и использовать его в своих скриптах впоследствии.

### Console - Выдает сообщение в лог
Использование такое же, как в `javascript`

### Exec - выполнить некоторую команду ОС, например `cp file1 file2`
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

Node.js использует /bin/sh для выполнения команд. Если вы хотите использовать другую оболочку, вы можете использовать объект option, как описано в [Документация Node.js](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) для child_process.exec.
Лучше всего всегда использовать имена путей для заполнения команд, чтобы убедиться, что выполняется правильная команда.

**Примечание:** для его вызова необходимо включить опцию *Включить команду "setObject"*.

### On - Подписаться на изменения или обновления какого-либо состояния
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

**Примечание:** `state` ранее назывался `newState`. Это все еще работает.

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
| логика | строка | логика «и» или «или» для объединения условий \(по умолчанию: «и»\) |
|             |            |                                                                                                                                                     |
| id | string | id равен указанному |
| | RegExp | идентификатор, соответствующий регулярному выражению |
| | Массив | идентификатор, соответствующий списку разрешенных идентификаторов |
|             |            |                                                                                                                                                     |
| имя | строка | имя равно указанному |
| | RegExp | имя, соответствующее регулярному выражению |
| | Массив | имя, соответствующее списку разрешенных имен |
|             |            |                                                                                                                                                     |
| изменить | строка | "eq", "ne", "gt", "ge", "lt", "le", "любой" |
| | "eq" | (равно) Новое значение должно быть равно старому (state.val == oldState.val) |
| | "ne" | (не равно) Новое значение не должно быть равно старому (state.val != oldState.val) **Если шаблон — это строка идентификатора, это значение используется по умолчанию** |
| | "gt" | (больше) Новое значение должно быть больше старого значения (state.val > oldState.val) |
| | "ge" | (больше или равно) Новое значение должно быть больше или равно старому (state.val >= oldState.val) |
| | "lt" | (меньше) Новое значение должно быть меньше старого (state.val < oldState.val) |
| | "le" | (меньше или равно) Новое значение должно быть меньше или равно старому значению (state.val <= oldState.val) |
| | "любой" | Триггер сработает, если придет только новое значение |
|             |            |                                                                                                                                                     |
| val | mixed | Новое значение должно быть равно заданному |
| valNe | mixed | Новое значение не должно быть равно заданному |
| valGt | mixed | Новое значение должно быть больше заданного |
| valGe | mixed | Новое значение должно быть больше или равно заданному |
| valLt | mixed | Новое значение должно быть меньше заданного |
| valLe | mixed | Новое значение должно быть меньше или равно заданному |
|             |            |                                                                                                                                                     |
| ack | boolean | Подтвержденное состояние нового значения равно заданному |
| q | число | Состояние кода качества нового значения равно заданному. Вы можете использовать '*' для сопоставления с любым кодом. **Если не указано, q = 0 устанавливается как шаблон!** |
|             |            |                                                                                                                                                     |
| oldVal | mixed | Предыдущее значение должно быть равно указанному |
| oldValNe | mixed | Предыдущее значение не должно быть равно заданному |
| oldValGt | mixed | Предыдущее значение должно быть больше указанного |
| oldValGe | mixed | Предыдущее значение должно быть больше или равно заданному |
| oldValLt | mixed | Предыдущее значение должно быть меньше указанного |
| oldValLe | mixed | Предыдущее значение должно быть меньше или равно заданному |
|             |            |                                                                                                                                                     |
| oldAck | bool | Подтвержденное состояние предыдущего значения равно заданному |
| oldQ | number | Состояние кода качества предыдущего значения равно данному. Вы можете использовать '*' для сопоставления с любым кодом |
|             |            |                                                                                                                                                     |
| ts | string | Новая метка времени значения должна быть равна заданной (state.ts == ts) |
| tsGt | string | Новая метка времени значения не должна быть равна заданной (state.ts != ts) |
| tsGe | string | Новая метка времени значения должна быть больше заданного значения (state.ts > ts) |
| tsLt | string | Новая метка времени значения должна быть больше или равна указанной (state.ts >= ts) |
| tsLe | string | Новая метка времени значения должна быть меньше заданной (state.ts < ts) |
|             |            |                                                                                                                                                     |
| oldTs | string | Предыдущая метка времени должна быть равна указанной (oldState.ts == ts) |
| oldTsGt | string | Предыдущая метка времени не должна быть равна указанной (oldState.ts != ts) |
| oldTsGe | string | Предыдущая метка времени должна быть больше заданного значения (oldState.ts > ts) |
| oldTsLt | string | Предыдущая метка времени должна быть больше или равна указанной (oldState.ts >= ts) |
| oldTsLe | string | Предыдущая метка времени должна быть меньше указанной (oldState.ts < ts) |
|             |            |                                                                                                                                                     |
| lc | string | Последняя метка времени изменения должна быть равна указанной (state.lc == lc) |
| lcGt | string | Последняя метка времени изменения не должна быть равна указанной (state.lc != lc) |
| lcGe | string | Отметка времени последнего изменения должна быть больше заданного значения (state.lc > lc) |
| lcLt | string | Последняя метка времени изменения должна быть больше или равна указанной (state.lc >= lc) |
| lcLe | string | Последняя метка времени изменения должна быть меньше заданной (state.lc < lc) |
|             |            |                                                                                                                                                     |
| oldLc | string | Предыдущая метка времени последнего изменения должна быть равна указанной (oldState.lc == lc) |
| oldLcGt | string | Предыдущая метка времени последнего изменения не должна быть равна указанной (oldState.lc != lc) |
| oldLcGe | string | Предыдущая метка времени последнего изменения должна быть больше заданного значения (oldState.lc > lc) |
| oldLcLt | string | Предыдущая метка времени последнего изменения должна быть больше или равна указанной (oldState.lc >= lc) |
| oldLcLe | string | Предыдущая метка времени последнего изменения должна быть меньше указанной (oldState.lc < lc) |
|             |            |                                                                                                                                                     |
| channelId | string | Идентификатор канала должен быть равен указанному |
| | RegExp | Идентификатор канала, соответствующий регулярному выражению |
| | Массив | Идентификатор канала, соответствующий списку разрешенных идентификаторов каналов |
|             |            |                                                                                                                                                     |
| channelName | string | Имя канала должно совпадать с указанным |
| | RegExp | Имя канала соответствует регулярному выражению |
| | Массив | Имя канала, соответствующее списку разрешенных имен каналов |
|             |            |                                                                                                                                                     |
| deviceId | string | Идентификатор устройства должен быть равен указанному |
| | RegExp | Идентификатор устройства, соответствующий регулярному выражению |
| | Массив | Идентификатор устройства, соответствующий списку разрешенных идентификаторов устройств |
|             |            |                                                                                                                                                     |
| deviceName | string | Имя устройства должно совпадать с указанным |
| | RegExp | Имя устройства, соответствующее регулярному выражению |
| | Массив | Имя устройства, соответствующее списку разрешенных имен устройств |
|             |            |                                                                                                                                                     |
| enumId | string | Состояние принадлежит данному перечислению |
| | RegExp | Один перечисленный идентификатор штата удовлетворяет заданному регулярному выражению |
| | Массив | Один идентификатор перечисления штата находится в заданном списке идентификаторов перечисления |
|             |            |                                                                                                                                                     |
| enumName | string | Состояние принадлежит данному перечислению |
| | RegExp | Одно имя перечисления штата удовлетворяет заданному регулярному выражению |
| | Массив | Одно имя перечисления штата находится в заданном списке имен перечислений |
|             |            |                                                                                                                                                     |
| из | строка | Новое значение из определенного адаптера |
| | RegExp | Новое значение получено из адаптера, соответствующего регулярному выражению |
| | Массив | Новое значение получено от адаптера, который присутствует в указанном списке разрешенных адаптеров |
|             |            |                                                                                                                                                     |
| fromNe | string | Новое значение не из определенного адаптера |
| | RegExp | Новое значение не из адаптера, соответствующего регулярному выражению |
| | Массив | Новое значение не из адаптера, который присутствует в указанном списке запрещенных адаптеров |
|             |            |                                                                                                                                                     |
| oldFrom | string | Старое значение взято из определенного адаптера |
| | RegExp | Старое значение взято из адаптера, соответствующего регулярному выражению |
| | Массив | Старое значение получено от адаптера, который присутствует в указанном списке разрешенных адаптеров |
|             |            |                                                                                                                                                     |
| oldFromNe | string | Старое значение не из определенного адаптера |
| | RegExp | Старое значение не из адаптера, соответствующего регулярному выражению |
| | Массив | Старое значение не относится к адаптеру, который присутствует в указанном списке запрещенных адаптеров |

Примеры: активировать все состояния с идентификатором `'*.STATE'`, если они подтверждены и имеют новое значение `true`.

```js
{
    "id": /\.STATE$/,
    "val": true,
    "ack": true,
    "logic": "and"
}
```

**Примечание:** вы можете использовать RegExp напрямую:

```js
on(/^system\.adapter\..*\.\d+\.memRss$/, function (obj) {
});

// same as
on({id: /^system\.adapter\..*\.\d+\.memRss$/, change: "ne"}, function (obj) {
});
```

Чтобы просто соединить два состояния друг с другом, напишите:

```js
on('stateId1', 'stateId2');
```

Все изменения *stateId1* будут записаны в *stateId2*.

Если параметр `value` установлен в сочетании с идентификатором состояния в качестве второго параметра, при любом изменении состояние будет заполнено `value`.

```js
on('stateId1', 'stateId2', 'triggered');
setState('stateId1', 'new value');

// stateId2 will be set to 'triggered'.
```

Функция `on` возвращает обработчик обратно. Этот обработчик можно использовать, отписавшись.

*Примечание:* По умолчанию в функцию обратного вызова будут переданы только состояния с качеством 0x00. Если вы хотите получить все события, добавьте `{q: '*'}` в структуру шаблона.

*Примечание:* Обратите внимание, что по умолчанию "change" равно "any", за исключением случаев, когда задан только id в виде строки (например, `on('id', () => {});`). В последнем случае change будет установлено на "ne".

*Примечание:* Если вы также хотите получить удаления/истечения состояний в качестве триггера, вам необходимо использовать change с `ne` или `any` И q с `*` в качестве фильтра!

*Примечание:* начиная с версии 4.3.2 можно записать тип триггера в качестве второго параметра: `on('my.id.0', 'any', obj => log(obj.state.val));`

### Один раз
Регистрирует одноразовую подписку, которая автоматически отменяет подписку после первого вызова. То же, что и [на](#on---subscribe-on-changes-or-updates-of-some-state), но выполняется только один раз.

```js
once(pattern, callback);
```

### Подписаться - то же самое, что и **[на](#on---subscribe-on-changes-or-updates-of-some-state)**
### Отписаться
```js
unsubscribe(id);
// or
unsubscribe(handler);
```

Удалить все подписки для указанного идентификатора объекта или для указанного обработчика.

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

### ПолучитьПодписки
Получить список подписок.

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

Планировщик времени с астрофункцией.

#### Расписание
Шаблон может быть строкой с [Cron-синтаксис](http://en.wikipedia.org/wiki/Cron), которая состоит из 5 (без секунд) или 6 (с секундами) цифр:

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

Шаблон также может быть объектом, он используется, в частности, если требуются секунды:

объект может иметь следующие свойства:

- `второй`
- `минута`
- `час`
- `дата`
- `месяц`
- `год`
- `деньНедели`

```js
schedule({ second: [20, 25] }, () => {
    log('Will be triggered at xx:xx:20 and xx:xx:25 of every minute!');
});

schedule({ hour: 12, minute: 30 }, () => {
    log('Will be triggered at 12:30!');
});
```

Шаблон может быть объектом даты Javascript (определенная временная точка) — в этом случае он будет срабатывать только один раз.

Если необходимо время начала или окончания для расписания, это также может быть реализовано с использованием объекта. В этом сценарии объект имеет следующие свойства:

- `старт`
- `конец`
- `правило`

start и end определяют объект Date, DateString или количество миллисекунд с 01 января 1970 00:00:00 UTC.
Rule — это строка расписания с [Cron-синтаксис](http://en.wikipedia.org/wiki/Cron) или объект:

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

#### Астро-функция
Астрофункцию можно использовать через атрибут «astro»:

```js
schedule({ astro: 'sunrise' }, () => {
    log("Sunrise!");
});

schedule({ astro: 'sunset', shift: 10 }, () => {
    log("10 minutes after sunset!");
});
```

Атрибут "shift" - это смещение в минутах. Оно может быть и отрицательным, чтобы определить время до астрономического события.

В качестве атрибутов в астрофункции можно использовать следующие значения:

- `"sunrise"`: восход солнца (верхний край солнца появляется на горизонте)
- `"sunriseEnd"`: восход солнца заканчивается (нижний край солнца касается горизонта)
- `"goldenHourEnd"`: заканчивается утренний золотой час (мягкий свет, лучшее время для фотосъемки)
- `"solarNoon"`: солнечный полдень (солнце находится в самом высоком положении)
- `"goldenHour"`: начинается вечерний золотой час
- `"sunsetStart"`: начинается закат (нижний край солнца касается горизонта)
- `"sunset"`: закат (солнце скрывается за горизонтом, начинаются вечерние гражданские сумерки)
- `"dusk"`: сумерки (начинаются вечерние навигационные сумерки)
- `"nauticalDusk"`: навигационные сумерки (начинаются вечерние астрономические сумерки)
- `"ночь"`: наступает ночь (достаточно темно для астрономических наблюдений)
- `"nightEnd"`: конец ночи (начало утренних астрономических сумерек)
- `"nauticalDawn"`: навигационный рассвет (начинаются утренние навигационные сумерки)
- `"dawn"`: рассвет (утренние навигационные сумерки заканчиваются, утренние гражданские сумерки начинаются)
- `"надир"`: надир (самый темный момент ночи, солнце находится в самом низком положении)

**Примечание:** для использования функции «astro» необходимо определить «широту» и «долготу» в настройках адаптера JavaScript.

**Примечание:** в некоторых местах иногда может быть так, что night/nightEnd не существует. Пожалуйста, прочтите [здесь](https://github.com/mourner/suncalc/issues/70) об этом.

**Примечание:** вы можете использовать функцию «on» для расписания с небольшими изменениями:

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

Позволяет создать расписание на основе значения состояния. Если значение состояния изменится, старое расписание будет удалено, а новое расписание будет создано автоматически.

Поддерживаемые форматы:

- `[ч]ч:[м]м:сс` (например, `12:42:15`, `15:3:12`, `3:10:25`)
- `[ч]ч:[м]м` (например, `13:37`, `9:40`)

```js
scheduleById('0_userdata.0.configurableTimeFormat', () => {
    log('Executed!');
});
```

Пример: создание штата и регистрация графика изменений:

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

### ПолучитьРасписания
```js
const list = getSchedules(true);
```

Возвращает список всех заданий и расписаний CRON (кроме astro).
Аргумент должен быть `true`, если вы хотите получить список для **каждого запущенного скрипта**. В противном случае будут возвращены только расписания в текущем скрипте.

```js
const list = getSchedules(true);
list.forEach(schedule => log(JSON.stringify(schedule)));

// clear all schedules in all scripts!
list.forEach(schedule => clearSchedule(schedule));
```

Пример вывода:

```
2020-11-01 20:15:19.929  - {"type":"cron","pattern":"0 * * * *","scriptName":"script.js.Heizung","id":"cron_1604258108384_74924"}
2020-11-01 20:15:19.931  - {"type":"schedule","schedule":"{"period":{}}","scriptName":"script.js.Heizung","id":"schedule_19576"}
```

### ОчиститьРасписание
Если **не** используется функция "astro", вы можете отменить расписание позже. Чтобы разрешить это, объект расписания должен быть сохранен:

```js
let sch = schedule('*/2 * * * *', () => { /* ... */ });

// later:
clearSchedule(sch);
```

### ПолучитьАттр
```js
getAttr({ attr1: { attr2: 5 } }, 'attr1.attr2');
```

Возвращает атрибут объекта. Путь к атрибуту может быть вложенным, как в примере.

Если первый атрибут — строка, функция попытается проанализировать строку как строку JSON.

### ПолучитьАстроДата
```js
getAstroDate(pattern, date, offsetMinutes);
```

Возвращает объект Date javascript для указанного имени астро (например, `"sunrise"` или `"sunriseEnd"`). Для допустимых значений см. список допустимых значений в разделе [Астро](#astro--function) в функции *schedule*.

Возвращаемый объект Date вычисляется для переданной *date*. Если дата не указана, используется текущий день.

```js
let sunriseEnd = getAstroDate('sunriseEnd');
log(`Sunrise ends today at ${sunriseEnd.toLocaleTimeString()}`);

let today = new Date();
let tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
let tomorrowNight = getAstroDate('night', tomorrow);
```

**Примечание: в зависимости от вашего географического положения могут быть случаи, когда, например, «ночь»/«конец ночи» не существуют в определенные моменты времени (например, местоположения на севере в мае/июне каждого года!**

Вы можете использовать такие веб-страницы, как [suncalc.net](http://suncalc.net), чтобы проверить правильность временных точек.

### IsAstroDay
```js
isAstroDay();
```

Возвращает `true`, если текущее время находится между астрономическим восходом и закатом Солнца.

### СравнитьВремя
```js
compareTime(startTime, endTime, operation, timeToCompare);
```

Сравните данное время с ограничениями.

Если `timeToCompare` не указано, будет использовано фактическое время.

Возможны следующие операции:

- `">"` - если указанное время больше, чем `startTime`
- `">="` - если указанное время больше или равно `startTime`
- `"<"` - если указанное время меньше `startTime`
- `"<="` - если указанное время меньше или равно `startTime`
- `"=="` - если указанное время равно `startTime`
- `"<>"` - если указанное время не равно `startTime`
- `"between"` - если указанное время находится между `startTime` и `endTime`
- `"not between"` - если указанное время не находится между `startTime` и `endTime`

Время может быть объектом Date или Date со временем или просто временем.

Вы можете использовать астроимена для определения времени. Все 3 параметра могут быть установлены как астровремя.
Возможны следующие значения: `sunrise`, `sunset`, `sunriseEnd`, `sunsetStart`, `dawn`, `dusk`, `nauticalDawn`, `nauticalDusk`, `nightEnd`, `night`, `goldenHourEnd`, `goldenHour`.
Подробнее см. [Астро](#astro--function).

```js
log(compareTime('sunsetStart', 'sunsetEnd', 'between') ? 'Now is sunrise' : 'Now is no sunrise');
```

Время можно определить и со смещением:

```js
log(compareTime({ astro: 'sunsetStart', offset: 30 }, { astro: 'sunrise', offset: -30 }, '>') ? 'Now is at least 30 minutes after sunset' : 'No idea');
```

Структура астрообъекта.

```js
{
    astro: 'sunsetStart',// mandatory, can be written as string and not as object if offset and date are default
    offset: 30,          // optional
    date:   new Date()   // optional
}
```

### УстановитьСостояние
```js
setState(id, state, ack, callback);
```

*Примечание*: Следующие команды идентичны

```js
setState('myState', 1, false);
setState('myState', { val: 1, ack: false });
setState('myState', 1);
```

Пожалуйста, обратитесь к https://github.com/ioBroker/ioBroker/wiki/Adapter-Development-Documentation#commands-and-statuses для использования `ack`.
Коротко:

- `ack` = `false`: Скрипт хочет отправить команду для выполнения целевым устройством/адаптером.
- `ack` = `true`: Команда была успешно выполнена, и состояние обновлено как положительный результат

### SetStateAsync
```js
await setStateAsync(id, state, ack);
```

То же, что и setState, но с `promise`.

### SetStateDelayed
```js
setStateDelayed(id, state, isAck, delay, clearRunning, callback);
```

То же, что и setState, но с задержкой в миллисекундах. Вы можете очистить все текущие задержки для этого идентификатора (по умолчанию). Например:

```js
// Switch ON the light in the kitchen in one second
setStateDelayed('Kitchen.Light.Lamp', true,  1000);

// Switch OFF the light in the kitchen in 5 seconds and let first timeout run.
setStateDelayed('Kitchen.Light.Lamp', false, 5000, false, () => {
    log('Lamp is OFF');
});
```

Эта функция возвращает обработчик таймера, и этот таймер может быть индивидуально остановлен с помощью clearStateDelayed.

### SetStateChanged
```js
await setStateChanged(id, state, ack);
```

То же, что и setState, но устанавливает значение только в том случае, если значение действительно изменилось.

### SetStateChangedAsync
```js
await setStateChangedAsync(id, state, ack);
```

То же, что и setStateChanged, но с `promise`.

### ClearStateDelayed
```js
clearStateDelayed(id);
```

Очищает все отложенные задачи для указанного идентификатора состояния или определенной отложенной задачи.

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
Вы можете вызвать эту функцию без идентификатора и получить таймеры для всех идентификаторов.
Если вы вызовете эту функцию для некоторого конкретного идентификатора объекта, вы получите следующий ответ:

```js
getStateDelayed('hm-rpc.0.LQE91119.1.STATE');

// returns an array like
[
    { timerId: 1, left: 1123,   delay: 5000,  val: true,  ack: false },
    { timerId: 2, left: 12555,  delay: 15000, val: false, ack: false },
]
```

Если вы запросите все удостоверения личности, ответ будет выглядеть так:

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

- `left` - оставшееся время в миллисекундах
- `delay` — начальное значение задержки в миллисекундах

Вы можете спросить по timerId напрямую. В этом случае ответ будет:

```js
getStateDelayed(3);

// returns an object like
{ id: 'hm-rpc.0.LQE91119.2.LEVEL', left: 5679, delay: 10000, val: 100, ack: false }
```

### ПолучитьСостояние
```js
getState(id);
```

Возвращает состояние с указанным идентификатором в следующей форме:

```js
{
    val: value,
    ack: true/false,
    ts: timestamp,
    lc: lastchanged,
    from: origin
}
```

Если состояние не существует, в журналах будет выведено предупреждение и будет возвращен объект `{ val: null, notExist: true }`.
Чтобы отключить предупреждение, проверьте, существует ли состояние, перед вызовом getState (см. [существуетСостояние](#existsState)).

### GetStateAsync
```js
const stateObject = await getStateAsync(id);
```

То же, что и getState, но с `promise`.

### СуществуетСостояние
```js
existsState(id, (err, isExists) => {});
```

Если опция «Не подписываться на все состояния при запуске» отключена, можно использовать более простой вызов:

```js
existsState(id)
```

В этом случае функция возвращает значение true или false.

Проверьте, существует ли государство.

### ПолучитьОбъект
```js
getObject(id, enumName);
```

Получить описание идентификатора объекта, хранящегося в системе.
Вы можете указать имя перечисления. Если это определено, к результату будут добавлены два дополнительных атрибута: enumIds и enumNames.
Эти массивы содержат все перечисления, где ID является членом. Например:

```js
getObject('adapter.N.objectName', 'rooms');
```

возвращает в enumIds все комнаты, где запрошенный объект является членом. Вы можете определить "true" как enumName, чтобы получить обратно *все* перечисления.

### SetObject
```js
setObject(id, obj, callback);
```

Записать объект в БД. Эту команду можно отключить в настройках адаптера. Используйте эту функцию осторожно, так как глобальные настройки могут быть повреждены.

Его следует использовать для **изменения** существующего объекта, который вы предварительно считываете, например:

```js
const obj = getObject('adapter.N.objectName');
obj.native.settings = 1;
setObject('adapter.N.objectName', obj, (err) => {
    if (err) log('Cannot write object: ' + err);
});
```

### СуществуетОбъект
```js
existsObject(id, function (err, isExists) {});
```

Если опция «Не подписываться на все состояния при запуске» отключена, можно использовать более простой вызов:

```js
existsObject(id)
```

В этом случае функция возвращает значение true или false.

Проверьте, существует ли объект.

### РасширитьОбъект
```js
extendObject(id, obj, callback);
```

Это почти то же самое, что и `setObject`, но сначала он считывает объект и пытается объединить все настройки вместе.

Используйте это так:

```js
// Stop instance
extendObject('system.adapter.sayit.0', {common: {enabled: false}});
```

### УдалитьОбъект
```js
deleteObject(id, isRecursive, callback);
```

Удалить объект из БД по ID. Если объект имеет тип `state`, то значение состояния также будет удалено.

Можно указать дополнительный параметр `isRecursive`, поэтому все дочерние элементы указанного идентификатора будут удалены. Очень опасно!

Используйте это так:

```js
// Delete state
deleteObject('javascript.0.createdState');
```

*Примечание: опция `isRecursive` доступна только с js-controller >= 2.2.x*

### ПолучитьIdByName
```js
getIdByName(name, alwaysArray);
```

Возвращает идентификатор объекта с указанным именем.
Если существует более одного объекта с таким именем, результатом будет массив.
Если установлен флаг `alwaysArray`, результатом всегда будет массив, если найден какой-либо идентификатор.

### ПолучитьEnums
```js
getEnums(enumName);
```

Получите список существующих перечислений с членами, например:

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

### СоздатьСостояние
```js
createState(name, initialValue, forceCreation, common, native, callback);
```

Создать состояние и объект в пространстве JavaScript, если он не существует, например, `javascript.0.mystate`.

!! Предпочитаю создавать собственные точки данных с полным идентификатором `0_userdata.0.mystate` !!!

#### Параметры:
- `name`: имя состояния без пространства имен, например `mystate`
- `initialValue`: переменная может быть инициализирована после создания. Значение "undefined" означает, что значение не инициализируется.
- `forceCreation`: создать/перезаписать состояние независимо от того, существует ли состояние или нет.
- `common`: общее описание объекта, см. описание [здесь](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#state)
- `native`: собственное описание объекта. Любая конкретная информация.
- `callback`: вызывается после создания и инициализации состояния.

Если вы установите в `common` флаг `alias` на `true`, то псевдоним будет создан с тем же именем (но в пространстве имен `alias.0`), что и состояние.
Псевдоним создается только в том случае, если он еще не существует.

Также действительны следующие настройки для псевдонимов:

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

- `createState('myDatapoint')` - просто создать точку данных, если она не существует
- `createState('myDatapoint', 1)` - создать точку данных, если она не существует, и инициализировать ее значением 1
- `createState('myDatapoint', { type: 'string', role: 'json', read: true, write: false }, () => { log('created'); });` - с общими определениями, такими как тип, чтение, запись и роль
- `createState('myDatapoint', { name: 'Моя собственная точка данных', unit: '°C' }, () => { log('created'); });`
- `createState('myDatapoint', 1, { name: 'Моя собственная точка данных', unit: '°C' })` - создать точку данных, если она не существует, с определенным именем и единицами измерения

### CreateStateAsync
```js
await createStateAsync(name, initialValue, forceCreation, common, native);
```

То же, что и `createState`, но обещание будет возвращено.

### УдалитьСостояние
```js
deleteState(name, callback);
```

Удалить состояние и объект в пространстве javascript, например `javascript.0.mystate`. Состояния из других адаптеров не могут быть удалены.

```js
deleteState('myDatapoint')
```

просто удалите точку данных, если она существует.

### DeleteStateAsync
```js
await deleteStateAsync(name);
```

То же, что и `deleteState`, но обещание будет возвращено.

### СоздатьПсевдоним
```js
createAlias(name, alias, forceCreation, common, native, callback);
```

Создайте псевдоним в пространстве `alias.0`, если он не существует, например, `javascript.0.myalias` и ссылку на состояние или состояния чтения/записи.
Общее определение берется из объекта идентификатора псевдонима чтения, но предоставленный общий имеет приоритет.

#### Параметры:
- `name`: идентификатор нового псевдонима состояния с (возможно без псевдонима пространства имен), например `test.mystate` (пространство имен `alias.0.` будет добавлено = `alias.0.test.mystate`)
- `alias`: может быть либо существующим идентификатором состояния в виде строки, либо объектом с полным определением псевдонима, включая идентификаторы чтения/записи и функции чтения/записи. Примечание: определения псевдонимов не могут быть установлены как часть общего параметра!
- `forceCreation`: создать/перезаписать псевдоним независимо от того, существует ли состояние или нет.
- `common`: общее описание объекта псевдонима см. описание [здесь](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#state). Значения, указанные здесь, будут иметь приоритет над общим определением объекта идентификатора псевдонима чтения. Примечание: Определения псевдонимов не могут быть установлены как часть этого общего параметра, см. параметр псевдонима!
- `native`: собственное описание объекта. Любая конкретная информация.
- `callback`: вызывается после создания и инициализации состояния.

Возможен короткий тип createAlias:

- `createAlias('myAlias', 'myDatapoint')` - просто создайте alias.0.myAlias, который ссылается на javascript.X.myDatapoint, если он не существует
- `createAlias('myAlias', { id: { read: 'myReadDatapoint', write: 'myWriteDatapoint' }})` - создает псевдоним и ссылку на различные состояния чтения/записи

Для получения более подробной информации см. createState, он аналогичен.

### CreateAliasAsync
```js
await createAliasAsync(name, alias, forceCreation, common, native);
```

То же, что и `createAlias`, но обещание будет возвращено.

### ОтправитьКому
```js
sendTo(adapter, command, message, callback);
sendTo(adapter, command, message, options, callback);
```

Отправить сообщение определенному или всем экземплярам адаптера. При использовании имени адаптера сообщение отправляется всем экземплярам.

Чтобы получить конкретную информацию о сообщениях, необходимо прочитать документацию по конкретному адаптеру.

Пример (с настраиваемым тайм-аутом):

```js
sendTo('telegram', { user: 'UserName', text: 'Test message' }, { timeout: 2000 });
```

Некоторые адаптеры также поддерживают ответы на отправленные сообщения. (например, history, sql, telegram) Ответ возвращается в функцию обратного вызова только в том случае, если сообщение отправлено определенному экземпляру!

Пример (с обратным вызовом):

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

То же, что и sendTo, но с `promise`.

Пример:

```js
const res = await sendToAsync('sql.0', 'getEnabledDPs', {});
log(JSON.stringify(res));
```

### ОтправитьХосту
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
- `'upgradeController'` - Обновить js-controller до последней версии
- `'getInterfaces'` - Возвращает все доступные сетевые интерфейсы системы
- `'getInterfaces'` - Начинает загрузку адаптера
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

**Примечание:** для его вызова необходимо включить опцию *Включить команду "setObject"*.

### SendToHostAsync
```js
await sendToHostAsync(hostName, command, message);
```

То же, что и sendToHost, но с `promise`.

### УстановитьИнтервал
```js
setInterval(callback, ms, arg1, arg2, arg3, arg4);
```

То же, что и javascript `setInterval`.

### ClearInterval
```js
clearInterval(id);
```

То же, что и javascript `clearInterval`.

### УстановитьТаймаут
```js
setTimeout(callback, ms, arg1, arg2, arg3, arg4);
```

То же, что и javascript `setTimeout`.

### ClearTimeout
```js
clearTimeout(id);
```

То же, что и javascript `clearTimeout`.

### Установить немедленно
```js
setImmediate(callback, arg1, arg2, arg3, arg4);
```

То же, что и javascript `setImmediate` и почти то же, что и `setTimeout(callback, 0, arg1, arg2, arg3, arg4)`, но с более высоким приоритетом.

### ФорматДата
```js
formatDate(millisecondsOrDate, format);
```

#### Параметры:
- `millisecondsOrDate`: количество миллисекунд из state.ts или state.lc (количество миллисекунд из 1970.01.01 00:00:00) или объект javascript *new Date()* или количество миллисекунд из *(new Date().getTime())*
- `format`: может быть `null`, поэтому будет использоваться системный формат времени, в противном случае

* ГГГГ, JJJJ, ГГГГ — полный год, например 2015.
* YY, JJ, ГГ – короткий год, например 15
* ММ, ММ(кириллица) - полный месяц, например 01
* M, М(кириллица) - сокращенный месяц, например, 1
* DD, TT, ДД - полный день, например 02
* D, T, Д - короткий день, например, 2
* чч, СС, чч - полные часы, например 03
* ч, С, ч - сокращенный рабочий день, например 3
* мм, мм(кириллица) - полные минуты, например 04
* m, м(кириллица) - краткие минуты, например, 4
* сс, сс(кириллица) - полные секунды, например 05
* с, с(кириллица) - короткие секунды, например, 5
* sss, ссс(кириллица) - миллисекунды
* WW, НН(кириллица) - полный день недели в текстовом виде
* W, Н(кириллица) - сокращенный день недели в текстовом виде
* OO, ОО(кириллица) - полный месяц в текстовом виде
* OOO, ООО(кириллица) - полный месяц как текст в родительном падеже
* O, О(кириллица) - краткое название месяца в текстовом виде

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
- `format`: может быть `null`, поэтому будет использоваться формат `hh:mm:ss`, в противном случае

* DD, TT, ДД - полный день, например "02"
* D, T, Д - короткий день, например, "2"
* чч, СС, чч - полные часы, например "03"
* h, S, ч - сокращенные часы, например "3"
* мм, мм(кириллица) - полные минуты, например "04"
* m, м(кириллица) - краткие минуты, например, "4"
* сс, сс(кириллица) - полные секунды, например "05"
* с, с(кириллица) - краткие секунды, например, "5"

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

### ПолучитьОбъектДаты
```js
getDateObject(stringOrNumber);
```

Преобразует строку или число в объект Date.
Если указаны только часы, он добавит к ним текущую дату и попытается преобразовать.

```js
getDateObject('20:00'); // 2024-05-18T18:00:00.000Z
getDateObject('2024-01-01'); // 2024-01-01T00:00:00.000Z
```

### FormatValue
```js
formatValue(value, decimals, format);
```

Форматирует любое значение (также строки) в число. Заменяет точку запятой, если настроено в системе.
Десятичные знаки указывают цифры после запятой. Значение по умолчанию — 2.
Формат необязателен:

- '.,': 1234.567 => 1.234,56
- ',.': 1234.567 => 1,234.56
- ' .': 1234.567 => 1 234.56

### АдаптерПодписаться
```js
adapterSubscribe(id);
```

Отправьте адаптеру сообщение "subscribe", чтобы информировать адаптер. Если адаптер имеет общий флаг "subscribeable" в случае функции "subscribe", эта функция будет вызвана автоматически.

### АдаптерОтписаться
```js
adapterUnsubscribe(id);
```

Отправляет адаптеру сообщение `unsubscribe`, чтобы сообщить адаптеру о необходимости не опрашивать значения.

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

имя может быть: состоянием, каналом, устройством или расписанием `idfilter` может иметь подстановочные знаки '*'

Префиксы ***(не реализованы - следует обсудить)*** :

* \# - брать по имени, а не по идентификатору
* . - фильтр по роли
* § - фильтр по комнате

***Пример***:

- `$('state[id=*.STATE]')` или `$('state[state.id=*.STATE]')` или `$('*.STATE')` - выбрать все штаты, где идентификатор заканчивается на ".STATE".
- `$('state[id='hm-rpc.0.*]')` или `$('hm-rpc.0.*')` - возвращает все состояния экземпляра адаптера hm-rpc.0
- `$('channel(rooms=Гостиная)')` - все состояния в комнате "Гостиная"
- `$('channel{TYPE=BLIND}[state.id=*.LEVEL]')` - Получить все ставни Homematic
- `$('channel[role=switch](rooms=Living room)[state.id=*.STATE]').setState(false)` - Переключить все состояния с .STATE каналов с ролью "switch" в "Living room" на false
- `$('channel[state.id=*.STATE](functions=Windows)').each(function (id, i) {log(id);});` - вывести все состояния перечисления "windows" в журнал
- `$('schedule[id=*65]').each(function (id, i) {log(id);});` - вывести все расписания с 65 в конце
- `$('.switch §"Гостиная")` - Принять состояния со всеми переключателями в "Гостиной" ***(не реализовано - следует обсудить)***
- `$('channel .switch §"Гостиная")` - Принять состояния со всеми переключателями в "Гостиной" ***(не реализовано - следует обсудить)***

***Объяснение*** Давайте рассмотрим:

```js
$('channel[role=switch][state.id=*.STATE](rooms=Wohnzimmer)').on(obj => {
   log('New state ' + obj.id + ' = ' + obj.state.val);
});
```

Этот код ищет в каналах.
Найдите все каналы с `common.role="switch"` и принадлежит `enum.rooms.Wohnzimmer`.
Возьмите все их состояния, где идентификатор заканчивается на `".STATE"`, и подпишитесь на все эти состояния.
Если некоторые из этих состояний изменятся, будет вызван обратный вызов, как для функции "on".

Возможны следующие функции: setState, getState (только из первой), on, each, toArray

```js
// Switch on all switches in "Wohnzimmer"
$('channel[role=switch][state.id=*.STATE](rooms=Wohnzimmer)').setState(true);
```

Вы можете прервать цикл «each», вернув значение false, например:

```js
// print two first IDs of on all switches in "Wohnzimmer"
$('channel[role=switch][state.id=*.STATE](rooms=Wohnzimmer)').each((id, i) => {
    log(id);
    if (i == 1) {
        return false;
    }
});
```

Или вы можете получить обычный массив идентификаторов и обработать его по-своему:

```js
// get some state and filter only which has an `true` value
const enabled = $('channel[role=switch][state.id=*.STATE](rooms=Wohnzimmer)').toArray().filter((id) => getState(id)?.val === true);
```

### ReadFile
```js
readFile(adapter, fileName, (error, bytes) => {});
```

Результат будет выдан в обратном вызове.
Прочитать файл из БД из папки `javascript.0`.

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

### ЗаписьФайла
```js
writeFile(adapter, fileName, bytes, (error) => {});
```

Необязательный код ошибки будет указан в обратном вызове. Аргумент *adapter* можно опустить.
fileName — имя файла в БД. Все файлы хранятся в папке "javascript".
если вы хотите записать в другие папки, например, в "/vis.0/", используйте для этого setFile.

Файл, который выглядит как `'/subfolder/file.txt'`, будет сохранен в `"/javascript/subfolder/file.txt"` и к нему можно будет получить доступ через веб-сервер с помощью `"http://ip:8082/javascript/subfolder/file.txt"`

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

Удалить файл или каталог. fileName — имя файла или каталога в БД.

Альтернативное название этого метода — `unlink`

### ПереименоватьФайл
```js
renameFile(adapter, oldName, newName, (error) => {});
```

Переименовать файл или каталог. oldName — имя файла или каталога в БД, которое переименовывается в newName.

Альтернативное название этого метода — `rename`

### НаФайле
```js
onFile(id, fileName, withFile, (id, fileName, size, fileData, mimeType) => {});
// or
onFile(id, fileName, (id, fileName, size) => {});
```

Подписаться на изменения файла:

- `id` — это идентификатор объекта типа `meta`, например `vis.0`
- `fileName` — имя файла или шаблон, например `main/*` или `main/vis-view.json`
- `withFile`, если содержимое файла должно быть доставлено в обратном вызове или нет. Доставка содержимого файла занимает память и время, поэтому, если вы хотите просто получать информацию об изменениях, установите `withFile` в значение false.

Аргументы в обратном вызове:

- `id` - идентификатор объекта `meta`;
- `fileName` - имя файла (не шаблон);
- `size` - новый размер файла;
- `fileData` - содержимое файла типа `Buffer`, если файл двоичный (определяется по расширению) или `string`. Доставляется только если `withFile`;
- `mimeType` - mime-тип файла, например `image/jpeg`. Доставляется только если `withFile`;

**Важно**: эта функция доступна только в js-controller@4.1.x или более поздней версии.

### OffФайл
```js
offFile(id, fileName);
// or
onFile(id, fileName);
```

Отписаться от изменений файла:

- `id` — это идентификатор объекта типа `meta`, например `vis.0`
- `fileName` — имя файла или шаблон, например `main/*` или `main/vis-view.json`

**Важно**: эта функция доступна только в js-controller@4.1.x или более поздней версии.

### OnStop
```js
onStop (() => { /* do something when script is stopped */ }, timeout);
```

Установить обратный вызов, который будет вызван, если скрипт остановлен. Используется, например, для остановки связи или закрытия соединений.

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

`timeout` по умолчанию составляет 1000 мс.

### ПолучитьИсторию
```js
getHistory(instance, options, (error, result, options, instance) => {});
```

Прочитать историю из указанного экземпляра. Если экземпляр не указан, будет взят системный экземпляр истории по умолчанию.

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

Возможные варианты вы можете найти [здесь](https://github.com/ioBroker/ioBroker.history#access-values-from-javascript-adapter).

Дополнительно к этим параметрам необходимо указать «id» и можно указать таймаут (по умолчанию: 20000 мс).

Еще один пример:

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

**Примечание: **конечно, история должна быть сначала включена для выбранного идентификатора в администраторе.

### Запустить скрипт
```js
runScript('scriptName', () => {
    // Callback is optional
    log('Srcipt started, but not yet executed');
});
```

Запускает или перезапускает другие скрипты (и себя тоже) по имени.

```js
// restart script
runScript('groupName.scriptName1');
```

### RunScriptAsync
То же, что и runScript, но с `promise`.

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

Запускает скрипт. Если ignoreIfStarted установлен в значение true, ничего не будет сделано, если скрипт уже запущен, в противном случае скрипт будет перезапущен.

```js
startScript('scriptName', true); // start script if not started
```

### StartScriptAsync
То же, что и runScript, но с `promise`.

```js
startScriptAsync('scriptName', ignoreIfStarted)
    .then(started => log(`Script was ${started ? 'started' : 'already started'}`));

// or

const started = await startScriptAsync('scriptName', ignoreIfStarted);
log(`Script was ${started ? 'started' : 'already started'}`);
```

Запускает скрипт. Если ignoreIfStarted установлен в значение true, ничего не будет сделано, если скрипт уже запущен, в противном случае скрипт будет перезапущен.

```js
startScript('scriptName', true); // start script if not started
```

### StopScript
```js
stopScript('scriptName', callback);
```

Если stopScript вызывается без аргументов, он остановит себя:

```js
stopScript();
```

### StopScriptAsync
То же, что и stopScript, но с `promise`:

```js
stopScriptAsync('scriptName')
    .then(stopped => log(`Script was ${stopped ? 'stopped' : 'already stopped'}`));

//or
const stopped = await stopScriptAsync('scriptName');
log(`Script was ${stopped ? 'stopped' : 'already stopped'}`);
```

Если stopScript вызывается без аргументов, он остановит себя:

```js
stopScript();
```

### IsScriptActive
```js
isScriptActive('scriptName');
```

Возвращает, включен или отключен скрипт. Обратите внимание, что это не возвращает, запущен ли сейчас скрипт или нет.
Скрипт может быть завершен, но все еще активирован.

Это не функция. Это переменная с экземпляром javascript, которая видна в области действия скрипта.

### ToInt
### ToFloat
### ToBoolean
### JsonataВыражение
### Ждать
Просто приостановите выполнение скрипта.
Предупреждение: эта функция `promise` и должна вызываться следующим образом:

```js
await wait(1000);
```

### Спать
То же, что и [ждать](#wait)

### СообщениеКому
```js
messageTo({ instance: 'instance', script: 'script.js.common.scriptName', message: 'messageName' }, data, {timeout: 1000}, result =>
    log(JSON.stringify(result)));
```

Отправить через «шину сообщений» сообщение какому-либо другому сценарию. Или даже какому-либо обработчику в том же сценарии.

По умолчанию время ожидания обратного вызова составляет 5 секунд.

Цель может быть сокращена до:

```js
messageTo('messageName', data, result => {
    log(JSON.stringify(result));
});
```

Обратный вызов и параметры необязательны, а тайм-аут по умолчанию составляет 5000 миллисекунд (если предусмотрен обратный вызов).

```js
messageTo('messageName', dataWithNoResponse);
```

### СообщениеToAsync
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
    log(`Received data: ${data}`); callback({ result: Date.now() });
});
```

Подписывается на шину сообщений адаптера javascript и доставляет ответ через обратный вызов.
Ответ от скрипта, который отправляет ответ первым, будет принят как ответ, все остальные ответы будут проигнорированы.

Чтобы отправить сообщение сценарию JavaScript, которое затем будет получено этим обработчиком, используйте [сообщениеКому](#messageTo).

Чтобы отправить сообщение с любого другого адаптера, используйте

```js
adapter.sendTo('javascript.0', 'toScript', {
    script: 'script.js.messagetest',
    message: 'messageName',
    data: {
        flag: true
    }
});
```

для отправки сообщения из CLI используйте

```bash
iob message javascript.0 toScript '{"script": "script.js.messagetest", "message": "messageName", "data": { "flag": true }}'
```

### OnMessageUnregister
```js
const id = onMessage('messageName', (data, callback) => {
    log(data);
    callback(Date.now());
});

// unsubscribe specific handler
onMessageUnregister(id);
// or unsubscribe by name
onMessageUnregister('messageName');
```

Отписаться от этого сообщения.

### В журнале
```js
onLog('error', data => {
    sendTo('telegram.0', { user: 'UserName', text: data.message });
    log('Following was sent to telegram: ' + data.message);
});
```

Подпишитесь на журналы с указанной степенью серьезности.

*Важно:* вы не можете выводить логи в обработчике с одинаковой серьезностью, чтобы избежать бесконечных циклов.

Например, это не создаст никаких журналов:

```js
onLog('error', data => {
    console.error('Error: ' + data.message);
});
```

Для получения всех журналов можно использовать `*`. В этом случае вывод журнала в обработчике будет полностью отключен.

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

Отписываемся от этих журналов.

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

Вторым параметром может быть объект с дополнительными опциями (необязательно). Все опции необязательны. Поддерживаемые флаги:

- `timeout` (число) - Время ожидания в миллисекундах
- `responseType` (строка) - Поддерживаемые значения: `text` (по умолчанию) или `arraybuffer` для двоичных данных в ответе.
- `basicAuth` (объект) - учетные данные базовой аутентификации HTTP. например, `{ user: 'admin', password: 'iobroker' }`
- `bearerAuth` (строка) - Токен для аутентификации на предъявителя
- `headers` (объект) - Дополнительные пользовательские заголовки HTTP, например `{ 'Accept-Language': 'en-GB,en;q=0.9' }`
- `validateCertificate` (логическое значение) - разрешает самоподписанные сертификаты, если `false`

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

Отключить проверку сертификата - *Требуется версия >= 8.4.0*

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

### СоздатьTempFile
*Требуется версия >= 8.3.0*

```js
httpGet('https://raw.githubusercontent.com/ioBroker/ioBroker.javascript/master/admin/javascript.png', { responseType: 'arraybuffer' }, async (err, response) => {
    if (err) {
        console.error(err);
    } else {
        const tempFilePath = createTempFile('javascript.png', response.data);
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

## РегистрацияУведомление
*Требуется версия >= 8.8.0*

```js
registerNotification('This is just an information'); // Notify
registerNotification('This is an important message!', true); // Alert
```

## Глобальные переменные скрипта
### ИмяСкрипта
`scriptName` - Название скрипта.

```js
log(`Script ${scriptName} started!`);
```

### Пример
`instance` — экземпляр javascript, в котором выполняется скрипт (например, `0`).

```js
log(`Script ${scriptName} started started by ${instance}`);
```

### DefaultDataDir
`defaultDataDir` - Абсолютный путь к iobroker-data.

```js
log(`Data dir: ${defaultDataDir}`);
```

### Многословный
`verbose` - Включен ли подробный режим?

```js
log(`Verbose mode: ${verbose ? 'enabled' : 'disabled'}`);

// Example
if (verbose) {
    log('...');
}
```

## Опция - "Не подписываться на все штаты при запуске"
Существует два способа подписки на состояния:

1. Адаптер подписывается на все состояния при запуске и получает все изменения всех состояний (легко использовать getState(id), но требуется больше ресурсов ЦП и ОЗУ):

```js
log(getState('someID').val);
```

2. Адаптер подписывается каждый раз на указанный идентификатор при вызове `on/subscribe`. В этом режиме адаптер получает только обновления для желаемых состояний. Этот вариант требует меньше оперативной памяти и более эффективен, но вы не можете получить доступ к состояниям синхронно через getState. **Вы должны использовать обратные вызовы или обещания для доступа к состояниям**:

```js
getState('someID', (error, state) => {
    log(state.val);
});
```

Причина: Адаптер не имеет значения состояния в оперативной памяти и должен запросить его из центральной базы данных состояний.

## Активность скриптов
Существует возможность включать и отключать скрипты через состояния. Для каждого скрипта будет создано состояние с именем `javascript.INSTANCE.scriptEnabled.SCRIPT_NAME`.
Скрипты можно активировать и деактивировать, управляя этим состоянием с помощью `ack=false`.