---
chapters: {"pages":{"en/adapterref/iobroker.javascript/README.md":{"title":{"en":"ioBroker.javascript"},"content":"en/adapterref/iobroker.javascript/README.md"},"en/adapterref/iobroker.javascript/blockly.md":{"title":{"en":"Contents"},"content":"en/adapterref/iobroker.javascript/blockly.md"},"en/adapterref/iobroker.javascript/javascript.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.javascript/javascript.md"},"en/adapterref/iobroker.javascript/upgrade-guide.md":{"title":{"en":"Upgrade guide"},"content":"en/adapterref/iobroker.javascript/upgrade-guide.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.javascript/javascript.md
title: без заголовка
hash: zjORbumG0KPomxiRSgSPK+nsOHPMcXcsMtUy4CJPCvk=
---
## Содержание
- [Примечание](#примечание)
- [Глобальные функции](#global-functions)
    - [Лучшая практика](#лучшая практика)

- [Функции](#следующие-функции-можно-использовать-в-скриптах)
    - [require - загрузить какой-то модуль](#require---load-some-module)
    - [Буфер](#буфер)
    - [log - Выдает сообщение в журнал](#log---выдает-сообщение-в-журнал)
    - [exec - выполнить некоторую команду ОС, например "cp file1 file2"](#exec ---execute-some-os-command-like-cp-file1-file2)
    - [on - Подписаться на изменения или обновления некоторого состояния](#on---подписаться-на-изменения-или-обновления-некоторого-состояния)
    - [один раз](#один раз)
    - [подписаться - то же, что и на](#подписаться---то же, что и на)
    - [отписаться](#отписаться)
    - [getSubscriptions](#getsubscriptions)
    - [getFileSubscriptions](#getfilesubscriptions)
    - [расписание](#расписание)
        - [Расписание](#time-schedule)
        - [Астро-функция](#астро-функция)
    - [scheduleById](#scheduleById)
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
    - [отправить](#отправить)
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
    - [вФайле](#ВФайле)
    - [offFile](#offFile)
    - [onStop](#onstop)
    - [getHistory](#gethistory)
    - [runScript](#runscript)
    - [runScriptAsync](#runScriptAsync)
    - [startScript](#startscript)
    - [startScriptAsync](#startscript)
    - [стопскрипт](#стопскрипт)
    - [stopScriptAsync](#stopScriptAsync)
    - [isScriptActive](#isscriptactive)
    - [имя](#имя)
    - [экземпляр](#экземпляр)
    - [messageTo](#messageto)
    - [messageToAsync](#messagetoasync)
    - [onMessage](#onmessage)
    - [onMessageUnregister](#onmessageunregister)
    - [в журнале](#онлог)
    - [onLogUnregister](#onlogunregister)
    - [Подожди подожди)
    - [спать спать)
    - [httpGet](#httpget)
    - [httpPost](#httppost)
    - [createTempFile](#createtempfile)

- [Активность скриптов](#scripts-activity)
- [Журнал изменений](#changelog)

## Глобальные функции
Вы можете определить глобальные скрипты в папке `global`.
Все глобальные сценарии доступны во всех экземплярах. Если глобальный скрипт отключен, он не будет использоваться.
Глобальный скрипт будет просто добавлен к обычному скрипту и скомпилирован, поэтому вы не сможете обмениваться данными между скриптами через глобальные скрипты. Используйте для этого состояния.

Чтобы использовать глобальные функции в TypeScript, вам необходимо сначала указать `declare`, чтобы компилятор знал о глобальных функциях. Пример:

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
Создайте два экземпляра адаптера JavaScript: один «тестовый» и один «рабочий».
После того, как скрипт будет протестирован в «тестовом» экземпляре, его можно будет переместить в «производственный». При этом вы можете перезапустить «тестовый» экземпляр по своему усмотрению.

## В скриптах можно использовать следующие функции:
### Require - загрузить какой-нибудь модуль
```js
const mod = require('module_name');
```

Следующие модули предварительно загружены: `node:dgram`, `node:crypto`, `node:dns`, `node:events`, `node:fs`, `node:http`, `node:https`, §§ SSSSS_7§§, `node:net`, `node:os`, `node:path`, `node:util`, `node:stream`, `node:zlib`, `suncalc2`, `axios` §, `wake_on_lan`, `request` (устарело)

Чтобы использовать другие модули, введите имя (и версию) модуля в конфигурации экземпляра. ioBroker установит модуль. Впоследствии вы можете запросить и использовать его в своих сценариях.

### Консоль — выдает сообщение в журнал
Использование такое же, как в `javascript`.

### Exec — выполнить какую-либо команду ОС, например `cp file1 file2`
```js
exec(cmd, [options], callback);
```

Выполните системную команду и получите выходные данные.

```js
// Get the list of files and directories in /var/log
exec('ls /var/log', (error, stdout, stderr) => {
    log('stdout: ' + stdout);
});
```

Node.js использует /bin/sh для выполнения команд. Если вы хотите использовать другую оболочку, вы можете использовать объект опции, как описано в [Документация Node.js](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) для child_process.exec.
Рекомендуется всегда использовать имена путей заполнения для команд, чтобы убедиться, что выполняется правильная команда.

**Примечание:** для его вызова необходимо включить опцию *Включить команду «setObject»*.

### On — подписаться на изменения или обновления какого-либо состояния
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
|-----------  |-------     |-----------------------------------------------------------------------------------------------------------------------------------------------------|
| логика | строка | логика «и» или «или» для объединения условий \(по умолчанию: «и»\) |
|             |            |                                                                                                                                                     |
| идентификатор | строка | id равен заданному |
|             | регэксп | идентификатор соответствует регулярному выражению |
|             | Массив | идентификатор соответствует списку разрешенных идентификаторов |
|             |            |                                                                                                                                                     |
| имя | строка | имя равно заданному |
|             | регэксп | имя соответствует регулярному выражению |
|             | Массив | имя соответствует списку разрешенных имен |
|             |            |                                                                                                                                                     |
| изменить | строка | "eq", "ne", "gt", "ge", "lt", "le", "any" |
|             |   "экв" | (равно) Новое значение должно быть равно старому (state.val == oldState.val) |
|             |   "не" | (не равно) Новое значение не должно быть равно старому (state.val != oldState.val) **Если шаблон представляет собой id-строку, это значение используется по умолчанию** |
|             |   "гт" | (больше) Новое значение должно быть больше старого значения (state.val > oldState.val) |
|             |   "ге" | (больше или равно) Новое значение должно быть больше или равно старому (state.val >= oldState.val) |
|             |   "л" | (меньше) Новое значение должно быть меньше старого (state.val < oldState.val) |
|             |   "ле" | (меньше или равно) Новое значение должно быть меньше или равно старому значению (state.val <= oldState.val) |
|             |  "любой" | Триггер будет активирован, если придет только новое значение |
|             |            |                                                                                                                                                     |
| вал | смешанный | Новое значение должно быть равно заданному |
| ВАЛНЕ | смешанный | Новое значение не должно быть равно заданному |
| значение | смешанный | Новое значение должно быть больше заданного |
| ВАЛГЕ | смешанный | Новое значение должно быть больше или равно заданному |
| валЛт | смешанный | Новое значение должно быть меньше заданного |
| ВАЛЛЕ | смешанный | Новое значение должно быть меньше или равно заданному |
|             |            |                                                                                                                                                     |
| акк | логическое | Подтвержденное состояние нового значения равно заданному |
| д | номер | Состояние кода качества нового значения равно заданному. Вы можете использовать '*' для сопоставления с любым кодом. **Если не указано, q = 0 устанавливается как шаблон!** |
|             |            |                                                                                                                                                     |
| старыйВал | смешанный | Предыдущее значение должно быть равно заданному |
| старыйВалНе | смешанный | Предыдущее значение не должно быть равно заданному |
| старыйValGt | смешанный | Предыдущее значение должно быть больше заданного |
| старыйВалГе | смешанный | Предыдущее значение должно быть больше или равно заданному |
| старыйВалЛт | смешанный | Предыдущее значение должно быть меньше заданного |
| ОлдВАЛЛЕ | смешанный | Предыдущее значение должно быть меньше или равно заданному |
|             |            |                                                                                                                                                     |
| старыйАк | бул | Подтвержденное состояние предыдущего значения равно заданному |
| старыйQ | номер | Состояние кода качества предыдущего значения равно заданному. Вы можете использовать '*' для сопоставления с любым кодом |
|             |            |                                                                                                                                                     |
| ТС | строка | Временная метка нового значения должна быть равна заданной (state.ts == ts) |
| цГт | строка | Временная метка нового значения не должна быть равна заданной (state.ts != ts) |
| цГе | строка | Временная метка нового значения должна быть больше заданного значения (state.ts > ts) |
| тсЛт | строка | Временная метка нового значения должна быть больше или равна заданной (state.ts >= ts) |
| цЛе | строка | Временная метка нового значения должна быть меньше заданной (state.ts < ts) |
|             |            |                                                                                                                                                     |
| старыйЦ | строка | Предыдущая отметка времени должна быть равна заданной (oldState.ts == ts) |
| старыйЦГт | строка | Предыдущая отметка времени не должна быть равна заданной (oldState.ts != ts) |
| старыйЦГе | строка | Предыдущая отметка времени должна быть больше заданного значения (oldState.ts > ts) |
| старыйЦЛт | строка | Предыдущая отметка времени должна быть больше или равна заданной (oldState.ts >= ts) |
| старыйЦЛе | строка | Предыдущая отметка времени должна быть меньше заданной (oldState.ts < ts) |
|             |            |                                                                                                                                                     |
| ЖК | строка | Временная отметка последнего изменения должна быть равна заданной (state.lc == lc) |
| ЛКГТ | строка | Временная отметка последнего изменения не должна быть равна заданной (state.lc != lc) |
| ЖКГе | строка | Временная отметка последнего изменения должна быть больше заданного значения (state.lc > lc) |
| лкЛт | строка | Временная отметка последнего изменения должна быть больше или равна заданной (state.lc >= lc) |
| лкле | строка | Временная отметка последнего изменения должна быть меньше заданной (state.lc < lc) |
|             |            |                                                                                                                                                     |
| старыйLc | строка | Предыдущая отметка времени последнего изменения должна быть равна заданной (oldState.lc == lc) |
| старыйLcGt | строка | Предыдущая отметка времени последнего изменения не должна быть равна заданной (oldState.lc != lc) |
| старыйLcGe | строка | Отметка времени предыдущего последнего изменения должна быть больше заданного значения (oldState.lc > lc) |
| старыйLcLt | строка | Предыдущая отметка времени последнего изменения должна быть больше или равна заданной (oldState.lc >= lc) |
| старыйLcLe | строка | Предыдущая отметка времени последнего изменения должна быть меньше заданной (oldState.lc < lc) |
|             |            |                                                                                                                                                     |
| идентификатор канала | строка | ID канала должен быть равен заданному |
|             | регэксп | Идентификатор канала соответствует регулярному выражению |
|             | Массив | Идентификатор канала соответствует списку разрешенных идентификаторов каналов |
|             |            |                                                                                                                                                     |
| Имя канала | строка | Имя канала должно быть равно заданному |
|             | регэксп | Имя канала соответствует регулярному выражению |
|             | Массив | Имя канала соответствует списку разрешенных названий каналов |
|             |            |                                                                                                                                                     |
| идентификатор устройства | строка | Идентификатор устройства должен быть равен заданному |
|             | регэксп | Идентификатор устройства соответствует регулярному выражению |
|             | Массив | Идентификатор устройства соответствует списку разрешенных идентификаторов устройств |
|             |            |                                                                                                                                                     |
| имя устройства | строка | Имя устройства должно быть равно заданному |
|             | регэксп | Имя устройства соответствует регулярному выражению |
|             | Массив | Имя устройства соответствует списку разрешенных имен устройств |
|             |            |                                                                                                                                                     |
| идентификатор перечисления | строка | Состояние принадлежит данному перечислению |
|             | регэксп | Один перечислимый идентификатор состояния удовлетворяет заданному регулярному выражению |
|             | Массив | Один идентификатор перечисления состояния находится в данном списке идентификаторов перечисления |
|             |            |                                                                                                                                                     |
| имя_перечисления | строка | Состояние принадлежит данному перечислению |
|             | регэксп | Одно перечисление состояния удовлетворяет заданному регулярному выражению |
|             | Массив | Одно перечисляемое имя состояния находится в данном списке перечислений |
|             |            |                                                                                                                                                     |
| из | строка | Новое значение взято из определенного адаптера |
|             | регэксп | Новое значение получено из адаптера, соответствующего регулярному выражению |
|             | Массив | Новое значение взято из адаптера, который присутствует в данном списке разрешенных адаптеров |
|             |            |                                                                                                                                                     |
| отNe | строка | Новое значение не из определенного адаптера |
|             | регэксп | Новое значение не из адаптера, соответствующего регулярному выражению |
|             | Массив | Новое значение не принадлежит адаптеру, указанному в списке запрещенных адаптеров |
|             |            |                                                                                                                                                     |
| старыйОт | строка | Старое значение взято из определенного адаптера |
|             | регэксп | Старое значение взято из адаптера, соответствующего регулярному выражению |
|             | Массив | Старое значение взято из адаптера, который присутствует в данном списке разрешенных адаптеров |
|             |            |                                                                                                                                                     |
| старыйОтNe | строка | Старое значение не из определенного адаптера |
|             | регэксп | Старое значение не из адаптера, соответствующего регулярному выражению |
|             | Массив | Старое значение не относится к адаптеру, указанному в списке запрещенных адаптеров |

Примеры: Запуск по всем состояниям с идентификатором `'*.STATE'`, если они подтверждены и имеют новое значение `true`.

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

*Примечание:* По умолчанию в функцию обратного вызова будут передаваться только состояния с качеством 0x00. Если вы хотите получить все события, добавьте `{q: '*'}` в структуру шаблона.

*Примечание:* Обратите внимание, что по умолчанию «изменение» равно «любому», за исключением случаев, когда задан только идентификатор в виде строки (например, `on('id', () => {});`). В последнем случае изменение будет установлено на «ne».

*Примечание:* Если вы хотите также получать удаления/истечения состояния в качестве триггера, вам необходимо использовать изменение с `ne` или `any` И q с `*` в качестве фильтра!

*Примечание:* начиная с версии 4.3.2 в качестве второго параметра можно указать тип триггера: `on('my.id.0', 'any', obj => log(obj.state.val));`.

### Один раз
Регистрирует одноразовую подписку, которая автоматически отменяется после первого вызова. То же, что и [на](#on---subscribe-on-changes-or-updates-of-some-state), но выполняется только один раз.

```js
once(pattern, callback);
```

### Подписаться - то же, что **[на](#on---subscribe-on-changes-or-updates-of-some-state)**
### Отписаться
```js
unsubscribe(id);
// or
unsubscribe(handler);
```

Удалить все подписки для данного идентификатора объекта или для данного обработчика.

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

### Получить подписки
Получить список подписок.

Пример результата:

```js
{
	"megad.0.dataPointName": [
		{
			"name" : "script.js.NameOfScript",
			"pattern" : {
				"id" : "megad.0.dataPointName",
				"change" : "ne"
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
	"vis.0$%$main/*": [
		{
			"name" : "script.js.NameOfScript",
			"id" : "vis.0",
            "fileNamePattern": "main/*"
		}
	]
}
```

### Расписание
```js
schedule(pattern, callback);
```

Планировщик времени с астро-функцией.

#### График
Шаблон может представлять собой строку с [Cron-синтаксис](http://en.wikipedia.org/wiki/Cron), состоящую из 5 (без секунд) или 6 (с секундами) цифр:

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

Шаблон также может быть объектом, он используется особенно, если требуются секунды:

объект может иметь следующие свойства:

- `второй`
- `минута`
- `час`
- `дата`
- `месяц`
- `год`
- `деньнедели`

```js
schedule({ second: [20, 25] }, () => {
    log('Will be triggered at xx:xx:20 and xx:xx:25 of every minute!');
});

schedule({ hour: 12, minute: 30 }, () => {
    log('Will be triggered at 12:30!');
});
```

Шаблон может быть объектом даты Javascript (некоторый конкретный момент времени) — только в этом случае он будет срабатывать только один раз.

Если необходимо время начала или окончания расписания, это также можно реализовать с использованием объекта. В этом сценарии объект имеет свойства:

- `старт`
- `конец`
- `правило`

начало и конец определяют объект Date, DateString или количество миллисекунд с 01 января 1970 года 00:00:00 UTC.
Правило представляет собой строку расписания с [Cron-синтаксис](http://en.wikipedia.org/wiki/Cron) или объект:

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

Атрибут «shift» — это смещение в минутах. Оно также может быть отрицательным для определения времени до астрособытия.

В качестве атрибута в астрофункции можно использовать следующие значения:

- `"sunrise"`: восход солнца (верхний край солнца появляется на горизонте)
- `"sunriseEnd"`: восход солнца заканчивается (нижний край солнца касается горизонта)
- `"goldenHourEnd"`: заканчивается утренний золотой час (мягкий свет, лучшее время для фотографии).
- `"solarNoon"`: солнечный полдень (солнце находится в самом высоком положении)
- `"goldenHour"`: начинается вечерний золотой час.
- `"sunsetStart"`: начинается закат (нижний край солнца касается горизонта)
- `"закат"`: закат (солнце исчезает за горизонтом, начинаются вечерние гражданские сумерки)
- `"сумерки"`: сумерки (начинаются вечерние морские сумерки)
- `"nauticalDusk"`: морские сумерки (начинаются вечерние астрономические сумерки)
- «ночь»: начинается ночь (достаточно темно для астрономических наблюдений)
- `"nightEnd"`: ночь заканчивается (начинаются утренние астрономические сумерки)
- `"nauticalDawn"`: морской рассвет (начинаются утренние морские сумерки)
- `"рассвет"`: рассвет (утренние морские сумерки заканчиваются, начинаются утренние гражданские сумерки)
- `"надир"`: надир (самый темный момент ночи, солнце находится в самом низком положении)

**Примечание:** для использования «астро»-функции «широта» и «долгота» должны быть определены в настройках адаптера JavaScript.

**Примечание:** в некоторых местах иногда может быть так, что night/nightEnd не существует. Пожалуйста, прочитайте [здесь](https://github.com/mourner/suncalc/issues/70) об этом.

**Примечание:** вы можете использовать функцию включения для расписания с небольшими изменениями:

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

## Расписание по идентификатору
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

Пример: Создать состояние и зарегистрировать график изменений:

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
Аргумент должен быть `true`, если вы хотите получить список **всех запущенных скриптов**. В противном случае будут возвращены только расписания текущего сценария.

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

### Очистить расписание
Если **нет** функция «астро» не используется, вы можете отменить расписание позже. Для этого объект расписания необходимо сохранить:

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

Если первым атрибутом является строка, функция попытается проанализировать строку как строку JSON.

### GetAstroDate
```js
getAstroDate(pattern, date, offsetMinutes);
```

Возвращает объект Date JavaScript для указанного астрономического имени (например, `"sunrise"` или `"sunriseEnd"`). Допустимые значения см. в списке разрешенных значений в разделе [Астро](#astro--function) функции *schedule*.

Возвращаемый объект Date рассчитывается для переданной *даты*. Если дата не указана, используется текущий день.

```js
let sunriseEnd = getAstroDate('sunriseEnd');
log(`Sunrise ends today at ${sunriseEnd.toLocaleTimeString()}`);

let today = new Date();
let tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
let tomorrowNight = getAstroDate('night', tomorrow);
```

**Примечание. В зависимости от вашего географического положения могут быть случаи, когда, например, 'night'/'nightEnd' не существует в определенные моменты времени (например, в северных регионах в мае/июне каждого года!**

Вы можете использовать такие веб-страницы, как [suncalc.net](http://suncalc.net), чтобы проверить правильность моментов времени.

### IsAstroDay
```js
isAstroDay();
```

Возвращает `true`, если текущее время находится между астрономическим восходом и закатом.

### Время сравнения
```js
compareTime(startTime, endTime, operation, timeToCompare);
```

Сравните данное время с лимитами.

Если `timeToCompare` не указан, будет использоваться фактическое время.

Возможны следующие операции:

- `">"` - если заданное время больше `"startTime`
- `">="` - если заданное время больше или равно `startTime`
- `"<"` - если заданное время меньше `startTime`
- `"<="` - если заданное время меньше или равно `startTime`
- `"=="` - если заданное время равно `startTime`
- `"<>"` - если заданное время не равно `startTime`
- `"between"` - если заданное время находится между `startTime` и `endTime`
- `"not Between"` - если заданное время не находится между `startTime` и `endTime`

Время может быть объектом даты, датой со временем или просто временем.

Для определения времени вы можете использовать астрономические имена. Все три параметра могут быть установлены как астровремя.
Возможны следующие значения: `sunrise`, `sunset`, `sunriseEnd`, `sunsetStart`, `dawn`, `dusk`, `nauticalDawn`, §§SSSSSS_7. §§, `nightEnd`, `night`, `goldenHourEnd`, `goldenHour`.
Подробности см. в [Астро](#astro--function).

```js
log(compareTime('sunsetStart', 'sunsetEnd', 'between') ? 'Now is sunrise' : 'Now is no sunrise');
```

Также можно определить время со смещением:

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

Пожалуйста, обратитесь к https://github.com/ioBroker/ioBroker/wiki/Adapter-Development-Documentation#commands-and-statuses для использования `ack`.
Короткий:

- `ack` = false: скрипт хочет отправить команду для выполнения целевым устройством/адаптером.
- `ack` = true: команда успешно выполнена, и состояние обновляется как положительный результат.

### SetStateAsync
```js
await setStateAsync(id, state, ack);
```

То же, что и setState, но с `promise`.

### SetStateDelayed
```js
setStateDelayed(id, state, isAck, delay, clearRunning, callback);
```

То же, что и setState, но с задержкой в миллисекундах. Вы можете удалить все задержки для этого идентификатора (по умолчанию). Например.

```js
// Switch ON the light in the kitchen in one second
setStateDelayed('Kitchen.Light.Lamp', true,  1000);

// Switch OFF the light in the kitchen in 5 seconds and let first timeout run.
setStateDelayed('Kitchen.Light.Lamp', false, 5000, false, () => {
    log('Lamp is OFF');
});
```

Эта функция возвращает обработчик таймера, и этот таймер можно остановить индивидуально с помощью ClearStateDelayed.

### SetStateChanged
```js
await setStateChanged(id, state, ack);
```

То же, что и setState, но устанавливает значение только в том случае, если оно действительно изменилось.

### SetStateChangedAsync
```js
await setStateChangedAsync(id, state, ack);
```

То же, что и setStateChanged, но с `promise`.

###clearStateDelayed
```js
clearStateDelayed(id);
```

Очищает все отложенные задачи для указанного идентификатора состояния или какой-либо конкретной отложенной задачи.

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

Это синхронный вызов, и вы получите список всех работающих таймеров (setStateDelayed) для этого идентификатора.
Вы можете вызвать эту функцию без идентификатора и получить таймеры для всех идентификаторов.
Если вы вызовете эту функцию для определенного идентификатора объекта, вы получите следующий ответ:

```js
getStateDelayed('hm-rpc.0.LQE91119.1.STATE');

// returns an array like
[
	{ timerId: 1, left: 1123,   delay: 5000,  val: true,  ack: false },
	{ timerId: 2, left: 12555,  delay: 15000, val: false, ack: false },
]
```

Если вы запросите все идентификаторы, ответ будет выглядеть так:

```js
getStateDelayed();

// returns an object like
{
	'hm-rpc.0.LQE91119.1.STATE': [
		{ timerId: 1, left: 1123,   delay: 5000,   val: true,  ack: false },
		{ timerId: 2, left: 12555,  delay: 15000,  val: false, ack: false },
	],
	'hm-rpc.0.LQE91119.2.LEVEL': [
		{ timerId: 3, left: 5679, delay: 10000,   val: 100,  ack: false }
	]
}
```

- «left» — оставшееся время в миллисекундах
- `delay` — начальное значение задержки в миллисекундах

Вы можете задать вопрос напрямую по timerId. В этом случае ответ будет:

```js
getStateDelayed(3);

// returns an object like
{ id: 'hm-rpc.0.LQE91119.2.LEVEL', left: 5679, delay: 10000, val: 100, ack: false }
```

### GetState
```js
getState(id);
```

Возвращает состояние с заданным идентификатором в следующей форме:

```js
{
    val: value,
    ack: true/false,
    ts: timestamp,
    lc: lastchanged,
    from: origin
}
```

Если состояние не существует, в журналах будет напечатано предупреждение и будет возвращен объект `{ val: null, notExist: true }`.
Чтобы подавить проверку предупреждения, существует ли состояние перед вызовом getState (см. [существуетСостояние](#existsState)).

### GetStateAsync
```js
const stateObject = await getStateAsync(id);
```

То же, что и getState, но с `promise`.

### СуществуетСостояние
```js
existsState(id, (err, isExists) => {});
```

Если опция «Не подписываться на все состояния при запуске» отключена, вы можете использовать более простой вызов:

```js
existsState(id)
```

функция возвращает в этом случае true или false.

Проверьте, существует ли состояние.

### ПолучитьОбъект
```js
getObject(id, enumName);
```

Получите описание идентификатора объекта, хранящегося в системе.
Вы можете указать имя перечисления. Если это определено, к результату будут добавлены два дополнительных атрибута: enumIds и enumNames.
Эти массивы содержат все перечисления, членом которых является ID. Например:

```js
getObject('adapter.N.objectName', 'rooms');
```

возвращает в enumIds все комнаты, членом которых является запрошенный объект. Вы можете определить «true» как enumName, чтобы получить *все* перечисления.

### УстановитьОбъект
```js
setObject(id, obj, callback);
```

Запишите объект в БД. Эту команду можно отключить в настройках адаптера. Используйте эту функцию осторожно, так как глобальные настройки могут быть повреждены.

Вам следует использовать его для **изменения** существующего объекта, который вы прочитали заранее, например:

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

функция возвращает в этом случае true или false.

Проверьте, существует ли объект.

### РасширитьОбъект
```js
extendObject(id, obj, callback);
```

Это почти то же самое, что `setObject`, но сначала он считывает объект и пытается объединить все настройки вместе.

Используйте это следующим образом:

```js
// Stop instance
extendObject('system.adapter.sayit.0', {common: {enabled: false}});
```

### УдалитьОбъект
```js
deleteObject(id, isRecursive, callback);
```

Удалить объект из БД по идентификатору. Если объект имеет тип `state`, значение состояния также будет удалено.

Можно указать дополнительный параметр `isRecursive`, поэтому все дочерние элементы с данным идентификатором будут удалены. Очень опасно!

Используйте это следующим образом:

```js
// Delete state
deleteObject('javascript.0.createdState');
```

*Примечание: опция `isRecursive` доступна только с js-контроллером >= 2.2.x*

### GetIdByName
```js
getIdByName(name, alwaysArray);
```

Возвращает идентификатор объекта с заданным именем.
Если существует более одного объекта с таким именем, результатом будет массив.
Если установлен флаг `alwaysArray`, результатом всегда будет массив, если найден какой-либо идентификатор.

### GetEnums
```js
getEnums(enumName);
```

Получите список существующих перечислений с членами, например:

```js
getEnums('rooms');

// returns:
[
    {
        "id":"enum.rooms.LivingRoom",
        "members":["hm-rpc.0.JEQ0024123.1","hm-rpc.0.BidCoS-RF.4"],
        "name": "Living room"
    },
    {
        "id":"enum.rooms.Bath",
        "members":["hm-rpc.0.JEQ0024124.1","hm-rpc.0.BidCoS-RF.5"],
        "name": "Bath"
    }
]
```

### CreateState
```js
createState(name, initialValue, forceCreation, common, native, callback);
```

Создайте состояние и объект в пространстве javascript, если он не существует, например. `javascript.0.mystate`.

!! Предпочитаю создавать собственные точки данных с полным идентификатором `0_userdata.0.mystate` !!!

#### Параметры:
- `name`: название состояния без пространства имен, например. `mystate`
- `initialValue`: переменная может быть инициализирована после создания. Значение «неопределено» означает, что значение не инициализировать.
- `forceCreation`: создать/перезаписать состояние независимо от того, существует оно или нет.
- `common`: общее описание объекта см. описание [здесь](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#state)
- `native`: собственное описание объекта. Любая конкретная информация.
- `обратный вызов`: вызывается после создания и инициализации состояния.

Если вы установите в `common` флаг `alias` на `true`, то псевдоним будет создан с тем же именем (но в пространстве имен `alias.0`), что и состояние.
Псевдоним создается только в том случае, если он еще не существует.

Следующие настройки псевдонимов также действительны:

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

- `createState('myDatapoint')` - просто создать точку данных, если она не существует.
- `createState('myDatapoint', 1)` - создать точку данных, если она не существует, и инициализировать ее значением 1.
- `createState('myDatapoint', { type: 'string', role: 'json', read: true, write: false }, () => { log('created'); });` - с общими определениями например, печатать, читать, писать и играть роль
- `createState('myDatapoint', { name: 'Моя собственная точка данных', unit: '°C' }, () => { log('created'); });`
- `createState('myDatapoint', 1, { name: 'Моя собственная точка данных', unit: '°C' })` - создать точку данных, если она не существует, с определенным именем и единицами измерения

### CreateStateAsync
```js
await createStateAsync(name, initialValue, forceCreation, common, native);
```

То же, что `createState`, но обещание будет возвращено.

### Удалить состояние
```js
deleteState(name, callback);
```

Удалить состояние и объект в пространстве JavaScript, например. `javascript.0.mystate`. Состояния из других адаптеров удалить нельзя.

```js
deleteState('myDatapoint')
```

просто удалите точку данных, если она существует.

### УдалитьStateAsync
```js
await deleteStateAsync(name);
```

То же, что `deleteState`, но обещание будет возвращено.

### Создать псевдоним
```js
createAlias(name, alias, forceCreation, common, native, callback);
```

Создайте псевдоним в пространстве `alias.0`, если он не существует, например. `javascript.0.myalias` и ссылку на состояние или состояния чтения/записи.
Общее определение берется из объекта идентификатора псевдонима чтения, но предоставленное общее определение имеет приоритет.

#### Параметры:
- `name`: идентификатор нового состояния псевдонима с (возможно без пространства имен псевдонима), например `test.mystate` (будет добавлено пространство имен `alias.0.` = `alias.0.test.mystate`)
- `alias`: может быть либо существующим идентификатором состояния в виде строки, либо объектом с полным определением псевдонима, включая идентификаторы чтения/записи и функции чтения/записи. Примечание. Определения псевдонимов не могут быть установлены как часть общего параметра!
- `forceCreation`: создать/перезаписать псевдоним независимо от того, существует ли состояние или нет.
- `common`: общее описание объекта псевдонима см. описание [здесь](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#state). Указанные здесь значения будут иметь приоритет над общим определением объекта идентификатора псевдонима чтения. Не: определения псевдонимов не могут быть установлены как часть этого общего параметра, см. параметр псевдонима!
- `native`: собственное описание объекта. Любая конкретная информация.
- `обратный вызов`: вызывается после создания и инициализации состояния.

Возможен короткий тип createAlias:

- `createAlias('myAlias', 'myDatapoint')` — просто создайте alias.0.myAlias, который ссылается на javascript.X.myDatapoint, если он не существует.
- `createAlias('myAlias', { id: { read: 'myReadDatapoint', write: 'myWriteDatapoint' }})` — создает псевдоним и ссылку на различные состояния чтения/записи.

Дополнительные сведения см. в createState, он аналогичен.

### CreateAliasAsync
```js
await createAliasAsync(name, alias, forceCreation, common, native);
```

То же, что `createAlias`, но обещание будет возвращено.

### Отправить
```js
sendTo(adapter, command, message, callback);
sendTo(adapter, command, message, options, callback);
```

Отправьте сообщение определенному или всем экземплярам адаптера. При использовании имени адаптера сообщение отправляется всем экземплярам.

Чтобы получить конкретную информацию о сообщениях, необходимо прочитать документацию конкретного адаптера.

Пример (с настраиваемым тайм-аутом):

```js
sendTo('telegram', { user: 'UserName', text: 'Test message' }, { timeout: 2000 });
```

Некоторые адаптеры также поддерживают ответы на отправленные сообщения. (например, история, sql, телеграмма). Ответ возвращается в обратный вызов только в том случае, если сообщение отправлено в конкретный экземпляр!

Пример (с обратным вызовом):

```js
sendTo('telegram.0', { user: 'UserName', text: 'Test message' }, (res) => {
    log(`Sent to ${res} users`);
});
```

*Таймаут по умолчанию составляет 20000 миллисекунд (если определена функция обратного вызова)*

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

То же, что sendTo, но с `promise`.

Пример:

```js
const res = await sendToAsync('sql.0', 'getEnabledDPs', {});
log(JSON.stringify(res));
```

### ОтправитьToHost
```js
sendToHost(hostName, command, message, callback);
```

Отправьте сообщение экземпляру контроллера.

Поддерживаются следующие команды:

- `"cmdExec"`
- `"getRepository"`
- `"getInstalled"`
- `"getVersion"`
- `"getDiagData"`
- `"getLocationOnDisk"`
- `"getDevList"`
- `"getLogs"`
- `"getHostInfo"`

Это достаточно специфичные команды и требуются не часто.

Пример:

```js
sendToHost('myComputer', 'cmdExec', { data: 'ls /' }, (res) => {
    log('List of files: ' + res.data);
});
```

**Примечание:** для его вызова необходимо включить опцию *Включить команду «setObject»*.

### SendToHostAsync
```js
await sendToHostAsync(hostName, command, message);
```

То же, что sendToHost, но с `promise`.

### SetInterval
```js
setInterval(callback, ms, arg1, arg2, arg3, arg4);
```

То же, что и в JavaScript `setInterval`.

###clearInterval
```js
clearInterval(id);
```

То же, что и в JavaScript `clearInterval`.

### SetTimeout
```js
setTimeout(callback, ms, arg1, arg2, arg3, arg4);
```

То же, что и в JavaScript `setTimeout`.

### ClearTimeout
```js
clearTimeout(id);
```

То же, что и в JavaScript `clearTimeout`.

### SetImmediate
```js
setImmediate(callback, arg1, arg2, arg3, arg4);
```

То же, что и в javascript `setImmediate`, и почти то же самое, что и `setTimeout(callback, 0, arg1, arg2, arg3, arg4)`, но с более высоким приоритетом.

### ФорматДата
```js
formatDate(millisecondsOrDate, format);
```

#### Параметры:
- `milliсекундыOrDate`: количество миллисекунд из state.ts или state.lc (число миллисекунд от 1970.01.01 00:00:00) или объекта javascript *new Date()* или количество миллисекунд из *(new Date()). getTime())*
- `format`: может быть `null`, поэтому будет использоваться формат системного времени, в противном случае

* ГГГГ, JJJJ, ГГГГ — полный год, например 2015.
* YY, JJ, ГГ – короткий год, например 15
* ММ, ММ(кириллица) - полный месяц, напр. 01
* М, М(кириллица) - короткий месяц, напр. 1
* ДД, ТТ, ДД - полный день, напр. 02
* Д, Т, Д - короткий день, напр. 2
* чч, СС, чч – полные часы, напр. 03
* h, S, ч – короткие часы, напр. 3
* мм, мм(кириллица) - полные минуты, напр. 04
* m, м(кириллица) - короткие минуты, напр. 4
* ss, сс(кириллица) - полные секунды, напр. 05
* s, с(кириллица) - короткие секунды, напр. 5
* ссс, ссс(кириллица) - миллисекунды
* WW, НН(кириллица) - полный день недели в текстовом виде.
* W, Н(кириллица) - короткий день недели в виде текста
* ОО, ОО(кириллица) — полный месяц в виде текста.
* ООО, ООО (кириллица) — полный месяц в родительном падеже.
* О, О(кириллица) - короткий месяц в виде текста

#### Пример
```js
formatDate(new Date(), "YYYY-MM-DD") // => Date "2015-02-24"
formatDate(new Date(), "hh:mm") // => Hours and minutes "17:41"
formatDate(state.ts) // => "24.02.2015"
formatDate(state.ts, "JJJJ.MM.TT SS:mm:ss.sss") // => "2015.02.15 17:41:98.123"
formatDate(new Date(), "WW") // => Day of week "Tuesday"
formatDate(new Date(), "W") // => Day of week "Tu"
```

### ФорматTimeDiff
```js
formatTimeDiff(milliseconds, format);
```

#### Параметры:
- `миллисекунды`: разница в миллисекундах*
- `format`: может быть `null`, поэтому будет использоваться формат `hh:mm:ss`, в противном случае

* ДД, ТТ, ДД - полный день, напр. 02
* Д, Т, Д - короткий день, напр. 2
* чч, СС, чч – полные часы, напр. 03
* h, S, ч – короткие часы, напр. 3
* мм, мм(кириллица) - полные минуты, напр. 04
* m, м(кириллица) - короткие минуты, напр. 4
* ss, сс(кириллица) - полные секунды, напр. 05
* s, с(кириллица) - короткие секунды, напр. 5

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
Если указаны только часы, он добавит к ним текущую дату и попытается преобразовать.

```js
getDateObject('20:00'); // 2024-05-18T18:00:00.000Z
getDateObject('2024-01-01'); // 2024-01-01T00:00:00.000Z
```

###форматЗначение
```js
formatValue(value, decimals, format);
```

Форматирует любое значение (в том числе и строки) в число. Заменяет точку запятой, если это настроено в системе.
Десятичные дроби обозначают цифры после запятой. Значение по умолчанию — 2.
Формат не является обязательным:

 - '.,': 1234,567 => 1,234,56
 - ',.': 1234,567 => 1234,56
 - ' .': 1234,567 => 1 234,56

###адаптерПодписаться
```js
adapterSubscribe(id);
```

Отправьте адаптеру сообщение «подписаться», чтобы проинформировать адаптер. Если адаптер имеет общий флаг «подписка», в случае функции «подписка» эта функция будет вызываться автоматически.

###адаптерОтписаться
```js
adapterUnsubscribe(id);
```

Отправляет адаптеру сообщение `unsubscribe`, чтобы сообщить адаптеру не опрашивать значения.

###$ - Селектор
```js
$(selector).on(function(obj) {});
$(selector).toArray(); // Requires version >= 8.2.0
$(selector).each(function(id, i) {});
$(selector).setState(value, ack);
$(selector).getState();
```

Формат селектора:

```js
"name[commonAttr=something1](enumName=something2){nativeName=something3}[id=idfilter][state.id=idfilter]"
```

имя может быть: состояние, канал, устройство или расписание `idfilter` может содержать подстановочные знаки '*'

Префиксы ***(не реализовано - следует обсудить)***:

*\# — брать по имени, а не по id
* . - фильтровать по роли
* § - фильтровать по номеру

***Пример***:

- `$('state[id=*.STATE]')` или `$('state[state.id=*.STATE]')` или `$('*.STATE')` — выбрать все состояния, в которых идентификатор заканчивается на «.STATE».
- `$('state[id='hm-rpc.0.*]')` или `$('hm-rpc.0.*')` — возвращает все состояния экземпляра адаптера hm-rpc.0
- `$('channel(rooms=Гостиная)')` - все состояния в комнате "Гостиная"
- `$('channel{TYPE=BLIND}[state.id=*.LEVEL]')` - Получить все жалюзи Homematic
- `$('channel[role=switch](rooms=Living room)[state.id=*.STATE]').setState(false)` - Переключить все состояния с помощью .STATE каналов с ролью "switch" в " Гостиная» на ложь
- `$('channel[state.id=*.STATE](functions=Windows)').each(function (id, i) {log(id);});` - распечатать все состояния перечисления "windows" в журнале
- `$('schedule[id=*65]').each(function (id, i) {log(id);});` - вывести все расписания с цифрой 65 в конце
- `$('.switch §"Гостиная")` - Принимать состояния всех переключателей в "Гостиной" ***(не реализовано - следует обсудить)***
- `$('channel .switch §"Гостиная")` - Принимать состояния со всеми переключателями в "Гостиной" ***(не реализовано - следует обсудить)***

***Пояснение*** Давайте посмотрим на:

```js
$('channel[role=switch][state.id=*.STATE](rooms=Wohnzimmer)').on(obj => {
   log('New state ' + obj.id + ' = ' + obj.state.val);
});
```

Этот код ищет в каналах.
Найдите все каналы с `common.role="switch"`, принадлежащие к `enum.rooms.Wohnzimmer`.
Возьмите все их состояния, у которых id заканчивается на `".STATE"`, и сделайте подписку на все эти состояния.
Если некоторые из этих состояний изменятся, обратный вызов будет вызван как для функции «on».

Возможны следующие функции: setState, getState (только с первого), on,each, toArray

```js
// Switch on all switches in "Wohnzimmer"
$('channel[role=switch][state.id=*.STATE](rooms=Wohnzimmer)').setState(true);
```

Вы можете прервать цикл «каждый», вернув ложное значение, например:

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

### Чтение файла
```js
readFile(adapter, fileName, (error, bytes) => {});
```

Результат будет передан в обратном вызове.
Считать файл из БД из папки `javascript.0`.

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

### Запись файла
```js
writeFile(adapter, fileName, bytes, (error) => {});
```

Дополнительный код ошибки будет указан в обратном вызове. Аргумент *адаптер* можно опустить.
fileName — имя файла в БД. Все файлы хранятся в папке «javascript».
если вы хотите писать в другие папки, например. для «/vis.0/» используйте для этого setFile.

Файл, похожий на `'/subfolder/file.txt'`, будет храниться в разделе `"/javascript/subfolder/file.txt"`, и к нему можно будет получить доступ через веб-сервер с помощью `"http://ip:8082/javascript/subfolder/file.txt"`.

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

###дельФайл
```js
delFile(adapter, fileName, (error) => {});
```

Удалить файл или каталог. fileName — имя файла или каталога в БД.

Альтернативное название этого метода — `unlink`.

### Переименуйте файл
```js
renameFile(adapter, oldName, newName, (error) => {});
```

Переименуйте файл или каталог. oldName — это имя файла или каталога в БД, которое переименовывается в newName.

Альтернативное название этого метода — `rename`.

### В файле
```js
onFile(id, fileName, withFile, (id, fileName, size, fileData, mimeType) => {});
// or
onFile(id, fileName, (id, fileName, size) => {});
```

Подписаться на изменения файлов:

- `id` — это идентификатор объекта типа `meta`, например `vis.0`
- `fileName` — это имя файла или шаблон, например `main/*` или `main/vis-view.json`
- `withFile`, если содержимое файла должно быть доставлено в обратном вызове или нет. доставка содержимого файла требует памяти и времени, поэтому, если вы хотите просто получать информацию об изменениях, установите для `withFile` значение false.

Аргументы обратного вызова:

- `id` - идентификатор мета-объекта;
- `fileName` - имя файла (не шаблон);
- `size` - новый размер файла;
- `fileData` - содержимое файла типа `Buffer`, если файл является двоичным (определяется по расширению) или `string`. Доставляется только в том случае, если `withFile`;
- `mimeType` - тип файла mime, например `image/jpeg`. Доставляется только в том случае, если `withFile`;

**Важно**: эта функция доступна только в js-controller@4.1.x или более поздней версии.

### OffFile
```js
offFile(id, fileName);
// or
onFile(id, fileName);
```

Отписаться от изменений файлов:

- `id` — это идентификатор объекта типа `meta`, например `vis.0`
- `fileName` — это имя файла или шаблон, например `main/*` или `main/vis-view.json`

**Важно**: эта функция доступна только в js-controller@4.1.x или более поздней версии.

### НаСтоп
```js
onStop (() => { /* do something when script is stopped */ }, timeout);
```

Установите обратный вызов, который будет вызываться, если скрипт остановлен. Используется, например, для прекращения связи или закрытия соединений.

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

### Получить историю
```js
getHistory(instance, options, (error, result, options, instance) => {});
```

Читать историю из указанного экземпляра. Если экземпляр не указан, будет взят экземпляр истории системы по умолчанию.

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

Кроме того, к этим параметрам необходимо указать «id» и указать таймаут (по умолчанию: 20000 мс).

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

**Примечание: ** конечно, сначала необходимо включить историю для выбранного идентификатора в администраторе.

### RunScript
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
То же, что runScript, но с `promise`.

```js
runScriptAsync('scriptName')
    .then(() => log('Script started, but not yet executed'));

// or

await runScriptAsync('scriptName');
log(`Script was restarted`);
```

### Стартскрипт
```js
startScript('scriptName', ignoreIfStarted, callback);
```

Запускает скрипт. Если для ignoreIfStarted установлено значение true, ничего не будет сделано, если сценарий еще запущен, в противном случае сценарий будет перезапущен.

```js
startScript('scriptName', true); // start script if not started
```

### StartScriptAsync
То же, что runScript, но с `promise`.

```js
startScriptAsync('scriptName', ignoreIfStarted)
    .then(started => log(`Script was ${started ? 'started' : 'already started'}`));

// or

const started = await startScriptAsync('scriptName', ignoreIfStarted);
log(`Script was ${started ? 'started' : 'already started'}`);
```

Запускает скрипт. Если для ignoreIfStarted установлено значение true, ничего не будет сделано, если сценарий еще запущен, в противном случае сценарий будет перезапущен.

```js
startScript('scriptName', true); // start script if not started
```

### Стопскрипт
```js
stopScript('scriptName', callback);
```

Если stopScript вызывается без аргументов, он остановится сам:

```js
stopScript();
```

### Стопскриптасинк
То же, что и stopScript, но с `promise`:

```js
stopScriptAsync('scriptName')
    .then(stopped => log(`Script was ${stopped ? 'stopped' : 'already stopped'}`));

//or
const stopped = await stopScriptAsync('scriptName');
log(`Script was ${stopped ? 'stopped' : 'already stopped'}`);
```

Если stopScript вызывается без аргументов, он остановится сам:

```js
stopScript();
```

### IsScriptActive
```js
isScriptActive('scriptName');
```

Возвращает, если сценарий включен или отключен. Обратите внимание, что это не дает ответа, запущен ли сейчас скрипт или нет.
Скрипт можно завершить, но все равно активировать.

Это не функция. Это переменная с экземпляром javascript, которая видна в области действия скрипта.

### ToInt
### Держаться на плаву
### ToBoolean
### JsonataExpression
### Ждать
Просто приостановите выполнение скрипта.
Внимание, эта функция — `promise` и должна вызываться следующим образом:

```js
await wait(1000);
```

### Спать
То же, что [ждать](#wait)

### СообщениеКому
```js
messageTo({ instance: 'instance', script: 'script.js.common.scriptName', message: 'messageName' }, data, {timeout: 1000}, result =>
    log(JSON.stringify(result)));
```

Отправьте через «шину сообщений» сообщение другому сценарию. Или даже какому-нибудь обработчику в том же скрипте.

Тайм-аут обратного вызова по умолчанию составляет 5 секунд.

Цель может быть сокращена до:

```js
messageTo('messageName', data, result => {
    log(JSON.stringify(result));
});
```

Обратный вызов и параметры являются необязательными, а время ожидания по умолчанию составляет 5000 миллисекунд (если обратный вызов предусмотрен).

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

Подписывается на шину сообщений адаптера JavaScript и доставляет ответ через обратный вызов.
Ответ от скрипта, который отправляет ответ первым, будет принят как ответ, все остальные ответы будут игнорироваться.

Чтобы отправить сообщение сценарию JavaScript, который затем будет получен этим обработчиком, используйте [сообщениеКому](#messageTo).

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

Отписывается от этого сообщения.

### В журнале
```js
onLog('error', data => {
    sendTo('telegram.0', { user: 'UserName', text: data.message });
    log('Following was sent to telegram: ' + data.message);
});
```

Подписаться на журналы с указанным уровнем серьезности.

*Важно:* вы не можете выводить журналы в обработчике с одинаковой серьезностью, чтобы избежать бесконечных циклов.

Например, это не приведет к созданию журналов:

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

Вторые параметры могут быть объектом с дополнительными опциями (необязательно). Все опции являются необязательными. Поддерживаемые флаги:

- `timeout` (число) - Таймаут в миллисекундах
- `responseType` (строка). Поддерживаемые значения: `text` (по умолчанию) или `arraybuffer` для двоичных данных в ответе.
- `basicAuth` (объект) – учетные данные базовой аутентификации HTTP. например `{ пользователь: 'admin', пароль: 'iobroker' }`
- `bearerAuth` (строка) — токен для аутентификации носителя.
- `headers` (объект) – дополнительные пользовательские заголовки HTTP, например. `{ 'Accept-Language': 'en-GB,en;q=0.9' }`
- `validateCertificate` (логическое значение) – разрешает самозаверяющие сертификаты, если значение `false`

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

Отключить проверку сертификата — *Требуется версия >= 8.4.0*

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

### HTTPPost
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

С настраиваемыми заголовками и аутентификацией

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
onFile('0_userdata.0', 'test.jpg', true, async (id, fileName, size, data, mimeType) => {
    const tempFilePath = createTempFile(fileName, response.data);

    // Use the new path in other scripts (e.g. sendTo)
});
```

## Глобальные переменные скрипта
###имя сценария
`scriptName` — Имя скрипта.

```js
log(`Script ${scriptName} started!`);
```

### Пример
`instance` — экземпляр javascript, в котором выполняется скрипт (например, `0`).

```js
log(`Script ${scriptName} started started by ${instance}`);
```

###КаталогДанных по умолчанию
`defaultDataDir` — Абсолютный путь к данным iobroker.

```js
log(`Data dir: ${defaultDataDir}`);
```

### Подробный
`verbose` – Подробный режим включен?

```js
log(`Verbose mode: ${verbose ? 'enabled' : 'disabled'}`);

// Example
if (verbose) {
    log('...');
}
```

## Опция - «Не подписываться на все состояния при запуске»
Существует два режима подписки на состояния:

- Адаптер при запуске подписывается на все изменения и получает все изменения всех состояний (просто использовать getStates(id), но требует больше процессора и оперативной памяти):

```js
log(getState('someID').val);
```

- Адаптер подписывается каждый раз по указанному идентификатору, если вызывается «on/subscribe». В этом режиме адаптер получает только обновления для нужных состояний.

Он очень эффективен и эффективен при использовании оперативной памяти, но вы не можете получить доступ к состояниям непосредственно в getState. Вы должны использовать обратный вызов, чтобы получить результат состояния:

```js
getState('someID', (error, state) => {
    log(state.val);
});
```

Это связано с тем, что адаптер не имеет значения состояния в ОЗУ и должен запрашивать это значение из центральной базы данных.

## Активность скриптов
Есть возможность включать и отключать скрипты через состояния. Для каждого скрипта будет создано состояние с именем `javascript.INSTANCE.scriptEnabled.SCRIPT_NAME`.
Скрипты можно активировать и деактивировать, управляя этим состоянием с помощью `ack=false`.