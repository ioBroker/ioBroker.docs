---
chapters: {"pages":{"en/adapterref/iobroker.javascript/README.md":{"title":{"en":"ioBroker.javascript"},"content":"en/adapterref/iobroker.javascript/README.md"},"en/adapterref/iobroker.javascript/blockly.md":{"title":{"en":"Contents"},"content":"en/adapterref/iobroker.javascript/blockly.md"},"en/adapterref/iobroker.javascript/javascript.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.javascript/javascript.md"},"en/adapterref/iobroker.javascript/upgrade-guide.md":{"title":{"en":"Upgrade guide"},"content":"en/adapterref/iobroker.javascript/upgrade-guide.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.javascript/javascript.md
title: без названия
hash: a7q/Q4p+hJJu8UzCzK7i2881CHur7X0FxiIZf2f8vJI=
---
## Содержание

- [Примечание](#note)

- [Глобальные функции](#global-functions)
  - [Передовая практика](#best-practice)

- [Функции](#following-functions-can-be-used-in-scripts)
  - [require - загрузка какого-либо модуля](#require---load-some-module)
  - [console - Выводит сообщение в лог](#console---gives-out-the-message-into-log)
  - [exec - выполнить какую-либо команду операционной системы, например, "cp file1 file2"](#exec---execute-some-os-command-like-cp-file1-file2)
  - [on - Подписаться на уведомления об изменениях или обновлениях в каком-либо штате](#on---subscribe-on-changes-or-updates-of-some-state)
  - [один раз](#once)
  - [Подписаться - то же самое, что и на](#subscribe---same-as-on)
  - [отписаться](#unsubscribe)
  - [получить подписки](#getsubscriptions)
  - [getFileSubscriptions](#getfilesubscriptions)
  - [расписание](#schedule)
    - [Расписание](#time-schedule)
    - [Астрофункция](#astro-function)
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
  - [существуетState](#existsState)
  - [получить объект](#getobject)
  - [setObject](#setobject)
  - [существуетОбъект](#existsObject)
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
  - [форматДата](#formatdate)
  - [форматTimeDiff](#formattimediff)
  - [getDateObject](#getDateObject)
  - [форматВалью](#formatvalue)
  - [адаптерПодписаться](#adaptersubscribe)
  - [адаптерОтписаться](#adapterunsubscribe)
  - [$ - Селектор](#---selector)
  - [readFile](#readfile)
  - [writeFile](#writefile)
  - [delFile](#delFile)
  - [переименоватьФайл](#renameFile)
  - [onFile](#onFile)
  - [offFile](#offFile)
  - [onStop](#onstop)
  - [получитьИсторию](#gethistory)
  - [runScript](#runscript)
  - [runScriptAsync](#runScriptAsync)
  - [startScript](#startscript)
  - [startScriptAsync](#startscriptasync)
  - [стоп-скрипт](#stopscript)
  - [stopScriptAsync](#stopScriptAsync)
  - [isScriptActive](#isscriptactive)
  - [имя](#scriptName)
  - [пример](#instance)
  - [СЕКРЕТЫ](#secrets)
  - [messageTo](#messageto)
  - [messageToAsync](#messagetoasync)
  - [onMessage](#onmessage)
  - [onMessageUnregister](#onmessageunregister)
  - [onLog](#onlog)
  - [onLogUnregister](#onlogunregister)
  - [ждать](#wait)
  - [спать](#sleep)
  - [httpGet](#httpget)
  - [httpPost](#httppost)
  - [создатьTempFile](#createtempfile)
  - [зарегистрироватьУведомление](#registerNotification)

- [Активность скриптов](#scripts-activity)

- [Список изменений](#changelog)

## Глобальные функции

Вы можете определить глобальные скрипты в`global` папка. Все глобальные скрипты доступны во всех экземплярах. Если глобальный скрипт отключен, он не будет использоваться. Глобальный скрипт будет просто добавлен в начало обычного скрипта и скомпилирован, поэтому вы не сможете обмениваться данными между скриптами через глобальные скрипты. Используйте для этого состояния.

Для использования глобальных функций в TypeScript необходимо...`declare` Сначала их, чтобы компилятор знал о глобальных функциях. Пример:

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

#### Передовая практика:

Создайте два экземпляра JavaScript-адаптера: один "тестовый" и один "производственный". После тестирования скрипта в "тестовом" экземпляре его можно перенести в "производственный". При этом вы можете перезапустить "тестовый" экземпляр по своему усмотрению.

## В скриптах можно использовать следующие функции:

### require - загрузка какого-либо модуля

```js
const mod = require('module_name');
```

Предварительно загружены следующие модули:`node:dgram` ,`node:crypto` ,`node:dns` ,`node:events` ,`node:fs` ,`node:http` ,`node:https` ,`node:http2` ,`node:net` ,`node:os` ,`node:path` ,`node:util` ,`node:stream` ,`node:zlib` ,`suncalc2` ,`axios` ,`wake_on_lan` ,`request` (устарело)

Для использования других модулей введите название (и версию) модуля в конфигурации экземпляра. ioBroker установит модуль. После этого вы сможете подключить и использовать его в своих скриптах.

### console - Выводит сообщение в лог

Использование такое же, как и в`javascript`

### exec - выполнить какую-либо команду операционной системы, например`cp file1 file2`

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

Node.js использует /bin/sh для выполнения команд. Если вы хотите использовать другую оболочку, вы можете использовать объект параметров, как описано в [документации Node.js](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) для child\_process.exec. Рекомендуется всегда указывать пути к командам, чтобы гарантировать выполнение правильной команды.

**Внимание:** для вызова этой _команды необходимо включить параметр "setObject"_ .

### on - Подписаться на уведомления об изменениях или обновлениях в каком-либо штате

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

**Примечание:**`state` ранее назывался`newState` Это по-прежнему работает.

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

| параметр                 | тип/значение         | описание                                                                                                                                                                                       |
| ------------------------ | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| логика                   | нить                 | Логическое операторное сочетание "и" или "или" для объединения условий (по умолчанию: "и")                                                                                                     |
|                          |                      |                                                                                                                                                                                                |
| идентификатор            | нить                 | идентификатор равен заданному значению                                                                                                                                                         |
|                          | Регулярное выражение | идентификатор, соответствующий регулярному выражению                                                                                                                                           |
|                          | Множество            | идентификатор сопоставляется со списком разрешенных идентификаторов                                                                                                                            |
|                          |                      |                                                                                                                                                                                                |
| имя                      | нить                 | имя равно данному                                                                                                                                                                              |
|                          | Регулярное выражение | имя, соответствующее регулярному выражению                                                                                                                                                     |
|                          | Множество            | имя сопоставлено со списком разрешенных имен                                                                                                                                                   |
|                          |                      |                                                                                                                                                                                                |
| изменять                 | нить                 | "eq", "ne", "gt", "ge", "lt", "le", "any"                                                                                                                                                      |
|                          | "эквивалент"         | (равно) Новое значение должно быть равно старому (state.val == oldState.val)                                                                                                                   |
|                          | "не"                 | (не равно) Новое значение не должно быть равно старому (state.val != oldState.val). **Если шаблон представляет собой строку идентификатора, это значение используется по умолчанию.**          |
|                          | "gt"                 | (больше) Новое значение должно быть больше старого значения (state.val > oldState.val)                                                                                                         |
|                          | "ге"                 | (больше или равно) Новое значение должно быть больше или равно старому (state.val >= oldState.val)                                                                                             |
|                          | "лт"                 | (меньше) Новое значение должно быть меньше старого (state.val < oldState.val)                                                                                                                  |
|                          | "ле"                 | (меньше или равно) Новое значение должно быть меньше или равно старому значению (state.val <= oldState.val)                                                                                    |
|                          | "любой"              | Триггер будет срабатывать, если поступит только новое значение.                                                                                                                                |
|                          |                      |                                                                                                                                                                                                |
| вал                      | смешанный            | Новое значение должно быть равно заданному.                                                                                                                                                    |
| valNe                    | смешанный            | Новое значение не должно совпадать с заданным.                                                                                                                                                 |
| valGt                    | смешанный            | Новое значение должно быть больше заданного.                                                                                                                                                   |
| valGe                    | смешанный            | Новое значение должно быть больше или равно заданному.                                                                                                                                         |
| valLt                    | смешанный            | Новое значение должно быть меньше заданного.                                                                                                                                                   |
| валле                    | смешанный            | Новое значение должно быть меньше или равно заданному.                                                                                                                                         |
|                          |                      |                                                                                                                                                                                                |
| ack                      | логический           | Признанное состояние новой ценности равно заданному состоянию.                                                                                                                                 |
| q                        | число                | Состояние кода качества нового значения совпадает с заданным. Для сопоставления с любым кодом можно использовать символ '\*'. **Если он не указан, в качестве шаблона устанавливается q = 0!** |
|                          |                      |                                                                                                                                                                                                |
| олдВал                   | смешанный            | Предыдущее значение должно быть равно заданному.                                                                                                                                               |
| oldValNe                 | смешанный            | Предыдущее значение не должно совпадать с заданным.                                                                                                                                            |
| oldValGt                 | смешанный            | Предыдущее значение должно быть больше заданного.                                                                                                                                              |
| oldValGe                 | смешанный            | Предыдущее значение должно быть больше или равно заданному.                                                                                                                                    |
| oldValLt                 | смешанный            | Предыдущее значение должно быть меньше заданного.                                                                                                                                              |
| олдВалЛе                 | смешанный            | Предыдущее значение должно быть меньше или равно заданному.                                                                                                                                    |
|                          |                      |                                                                                                                                                                                                |
| старыйАк                 | буль                 | Подтвержденное состояние предыдущего значения равно заданному.                                                                                                                                 |
| старыйQ                  | число                | Состояние кода качества предыдущего значения совпадает с заданным. Для сопоставления с любым кодом можно использовать символ '\*'.                                                             |
|                          |                      |                                                                                                                                                                                                |
| тс                       | нить                 | Новое значение временной метки должно совпадать с заданным (state.ts == ts).                                                                                                                   |
| tsGt                     | нить                 | Новое значение временной метки не должно совпадать с заданным (state.ts != ts).                                                                                                                |
| tsGe                     | нить                 | Новая метка времени должна быть больше заданного значения (state.ts > ts).                                                                                                                     |
| tsLt                     | нить                 | Новая временная метка должна быть больше или равна заданной (state.ts >= ts).                                                                                                                  |
| tsLe                     | нить                 | Новая метка времени должна быть меньше заданной (state.ts < ts).                                                                                                                               |
|                          |                      |                                                                                                                                                                                                |
| oldTs                    | нить                 | Предыдущая метка времени должна совпадать с заданной (oldState.ts == ts).                                                                                                                      |
| oldTsGt                  | нить                 | Предыдущая метка времени не должна совпадать с указанной (oldState.ts != ts).                                                                                                                  |
| oldTsGe                  | нить                 | Предыдущая метка времени должна быть больше заданного значения (oldState.ts > ts).                                                                                                             |
| oldTsLt                  | нить                 | Предыдущая метка времени должна быть больше или равна заданной (oldState.ts >= ts)                                                                                                             |
| oldTsLe                  | нить                 | Предыдущая метка времени должна быть меньше заданной (oldState.ts < ts)                                                                                                                        |
|                          |                      |                                                                                                                                                                                                |
| лк                       | нить                 | Отметка времени последнего изменения должна совпадать с указанной (state.lc == lc)                                                                                                             |
| lcGt                     | нить                 | Отметка времени последнего изменения не должна совпадать с указанной (state.lc != lc).                                                                                                         |
| lcGe                     | нить                 | Отметка времени последнего изменения должна быть больше заданного значения (state.lc > lc).                                                                                                    |
| лкЛт                     | нить                 | Отметка времени последнего изменения должна быть больше или равна указанной (state.lc >= lc)                                                                                                   |
| lcLe                     | нить                 | Отметка времени последнего изменения должна быть меньше заданной (state.lc < lc).                                                                                                              |
|                          |                      |                                                                                                                                                                                                |
| oldLc                    | нить                 | Предыдущая метка времени последнего изменения должна совпадать с заданной (oldState.lc == lc)                                                                                                  |
| oldLcGt                  | нить                 | Временная метка последнего изменения не должна совпадать с указанной (oldState.lc != lc).                                                                                                      |
| oldLcGe                  | нить                 | Предыдущая метка времени последнего изменения должна быть больше заданного значения (oldState.lc > lc)                                                                                         |
| oldLcLt                  | нить                 | Предыдущая метка времени последнего изменения должна быть больше или равна указанной (oldState.lc >= lc)                                                                                       |
| oldLcLe                  | нить                 | Метка времени последнего изменения должна быть меньше заданной (oldState.lc < lc)                                                                                                              |
|                          |                      |                                                                                                                                                                                                |
| channelId                | нить                 | Идентификатор канала должен совпадать с указанным.                                                                                                                                             |
|                          | Регулярное выражение | Идентификатор канала соответствует регулярному выражению.                                                                                                                                      |
|                          | Множество            | Идентификатор канала сопоставляется со списком разрешенных идентификаторов каналов.                                                                                                            |
|                          |                      |                                                                                                                                                                                                |
| channelName              | нить                 | Название канала должно совпадать с указанным.                                                                                                                                                  |
|                          | Регулярное выражение | Название канала соответствует регулярному выражению.                                                                                                                                           |
|                          | Множество            | Название канала сопоставляется со списком разрешенных названий каналов.                                                                                                                        |
|                          |                      |                                                                                                                                                                                                |
| идентификатор устройства | нить                 | Идентификатор устройства должен совпадать с указанным.                                                                                                                                         |
|                          | Регулярное выражение | Идентификатор устройства, соответствующий регулярному выражению.                                                                                                                               |
|                          | Множество            | Идентификатор устройства сопоставляется со списком разрешенных идентификаторов устройств.                                                                                                      |
|                          |                      |                                                                                                                                                                                                |
| deviceName               | нить                 | Название устройства должно совпадать с указанным.                                                                                                                                              |
|                          | Регулярное выражение | Название устройства соответствует регулярному выражению.                                                                                                                                       |
|                          | Множество            | Имя устройства сопоставляется со списком разрешенных имен устройств.                                                                                                                           |
|                          |                      |                                                                                                                                                                                                |
| enumId                   | нить                 | Штат принадлежит к данному перечислению                                                                                                                                                        |
|                          | Регулярное выражение | Один из идентификаторов перечисления (enum ID) состояния удовлетворяет заданному регулярному выражению.                                                                                        |
|                          | Множество            | Один из идентификаторов перечисления (enum ID) штата находится в заданном списке идентификаторов перечислений.                                                                                 |
|                          |                      |                                                                                                                                                                                                |
| enumName                 | нить                 | Штат принадлежит к данному перечислению                                                                                                                                                        |
|                          | Регулярное выражение | Одно из имен перечисления штата удовлетворяет заданному регулярному выражению.                                                                                                                 |
|                          | Множество            | Одно из имен перечислений для данного штата присутствует в заданном списке имен перечислений.                                                                                                  |
|                          |                      |                                                                                                                                                                                                |
| от                       | нить                 | Новое значение получено из определенного адаптера.                                                                                                                                             |
|                          | Регулярное выражение | Новое значение получено от адаптера, соответствующего регулярному выражению.                                                                                                                   |
|                          | Множество            | Новое значение получено от адаптера, который присутствует в указанном списке разрешенных адаптеров.                                                                                            |
|                          |                      |                                                                                                                                                                                                |
| из Не                    | нить                 | Новое значение получено не из определенного адаптера.                                                                                                                                          |
|                          | Регулярное выражение | Новое значение получено не из адаптера, соответствующего регулярному выражению.                                                                                                                |
|                          | Множество            | Новое значение получено не от адаптера, который фигурирует в указанном списке запрещенных адаптеров.                                                                                           |
|                          |                      |                                                                                                                                                                                                |
| старыйОт                 | нить                 | Старое значение получено из указанного адаптера.                                                                                                                                               |
|                          | Регулярное выражение | Старое значение получено от адаптера, соответствующего регулярному выражению.                                                                                                                  |
|                          | Множество            | Старое значение получено от адаптера, который присутствует в указанном списке разрешенных адаптеров.                                                                                           |
|                          |                      |                                                                                                                                                                                                |
| старыйОтНе               | нить                 | Старое значение не соответствует определенному адаптеру.                                                                                                                                       |
|                          | Регулярное выражение | Старое значение получено не из адаптера, соответствующего регулярному выражению.                                                                                                               |
|                          | Множество            | Старое значение не принадлежит адаптеру, который фигурирует в указанном списке запрещенных адаптеров.                                                                                          |

Примеры: Срабатывание на всех состояниях с идентификатором`'*.STATE'` если они признаны и приобретают новую ценность`true` .

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

Все изменения _stateId1_ будут записаны в _stateId2_ .

Если`value` Этот параметр устанавливается в сочетании с идентификатором состояния в качестве второго параметра; при любом изменении состояние будет заполняться этим значением.`value` .

```js
on('stateId1', 'stateId2', 'triggered');
setState('stateId1', 'new value');

// stateId2 will be set to 'triggered'.
```

Функция`on` Возвращает обработчик. Этот обработчик можно использовать, отписавшись от рассылки.

_Примечание:_ по умолчанию в функцию обратного вызова передаются только состояния с качеством 0x00. Если вы хотите получить все события, добавьте`{q: '*'}` к структуре шаблона.

_Примечание:_ Обратите внимание, что по умолчанию значение "change" равно "any", за исключением случаев, когда задан только идентификатор в виде строки (например,`on('id', () => {});` В последнем случае значение будет установлено на "ne".

_Примечание:_ Если вы хотите, чтобы удаление/истечение срока действия состояний также являлось триггером, вам необходимо использовать команду change with.`ne` или`any` И q с`*` в качестве фильтра!

_Примечание:_ начиная с версии 4.3.2, в качестве второго параметра можно указать тип триггера:`on('my.id.0', 'any', obj => log(obj.state.val));`

### один раз

Регистрирует одноразовую подписку, которая автоматически отменяется после первого вызова. Аналогично методу [\`and\`](#on---subscribe-on-changes-or-updates-of-some-state) , но выполняется только один раз.

```js
once(pattern, callback);
```

### Подписаться - то же самое, что и **[на](#on---subscribe-on-changes-or-updates-of-some-state)**

### отписаться

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

### получить подписки

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

### getFileSubscriptions

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

### расписание

```js
schedule(pattern, callback);
```

Планировщик времени с астрономической функцией.

#### Расписание

В [синтаксисе Cron](http://en.wikipedia.org/wiki/Cron) шаблон может представлять собой строку, состоящую из 5 (без секунд) или 6 (с секундами) цифр:

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

- `second`
- `minute`
- `hour`
- `date`
- `month`
- `year`
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
- `end`
- `rule`

Параметр start и end определяет объект Date, строку DateString или количество миллисекунд с 1 января 1970 года 00:00:00 UTC. Параметр rule представляет собой строку расписания с [синтаксисом Cron](http://en.wikipedia.org/wiki/Cron) или объект:

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

- `"sunrise"` восход солнца (верхний край солнца появляется на горизонте)
- `"sunriseEnd"` Восход солнца заканчивается (нижний край солнца касается горизонта).
- `"goldenHourEnd"` Утренний золотой час (мягкий свет, лучшее время для фотосъемки) заканчивается.
- `"solarNoon"` : полдень (солнце находится в наивысшей точке)
- `"goldenHour"` : начинается вечерний золотой час
- `"sunsetStart"` Начало заката (нижний край солнца касается горизонта)
- `"sunset"` Закат (солнце скрывается за горизонтом, начинается вечерняя гражданская сумерка)
- `"dusk"` : сумерки (начало вечерних морских сумерек)
- `"nauticalDusk"` : морские сумерки (начало вечерних астрономических сумерек)
- `"night"` Ночные старты (достаточно темно для астрономических наблюдений)
- `"nightEnd"` Ночь заканчивается (начинаются утренние астрономические сумерки)
- `"nauticalDawn"` : морской рассвет (начинаются утренние морские сумерки)
- `"dawn"` : рассвет (утренние морские сумерки заканчиваются, начинаются утренние гражданские сумерки)
- `"nadir"` надир (самый темный момент ночи, солнце находится в самой низкой точке)

**Примечание:** для использования функции "astro" необходимо указать "широту" и "долготу" в настройках JavaScript-адаптера.

**Примечание:** в некоторых местах может случиться так, что ночи/ночного конца не будет. Подробнее об этом можно прочитать [здесь](https://github.com/mourner/suncalc/issues/70) .

**Примечание:** вы можете использовать функцию «включено» для составления расписания с небольшими изменениями:

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

## scheduleById

```js
scheduleById(id, callback);
scheduleById(id, ack, callback);
```

Позволяет создавать расписание на основе значения состояния. Если значение состояния изменяется, старое расписание удаляется, и автоматически создается новое.

Поддерживаемые форматы:

- `[h]h:[m]m:ss` (например`12:42:15` ,`15:3:12` ,`3:10:25` )
- `[h]h:[m]m` (например`13:37` ,`9:40` )

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

### getSchedules

```js
const list = getSchedules(true);
```

Возвращает список всех заданий и расписаний CRON (кроме astro). Аргумент должен быть`true` Если вы хотите получить список **всех запущенных скриптов** . В противном случае будут возвращены только расписания текущего скрипта.

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

### clearSchedule

Если функция "astro" **не** используется, вы можете отменить расписание позже. Для этого необходимо сохранить объект расписания:

```js
let sch = schedule('*/2 * * * *', () => { /* ... */ });

// later:
clearSchedule(sch);
```

`clearSchedule` принимает всё`schedule` Возвращает (объект задания CRON или идентификатор расписания мастера расписания), а также записи из функции [getSchedules](#getschedules) :

```js
// Clear all schedules of this script
getSchedules().forEach(sch => clearSchedule(sch));
```

Оно возвращается`true` если расписание было найдено и утверждено, в противном случае`false` Расписания, созданные с использованием опции astro, таким способом нельзя очистить.

### getAttr

```js
getAttr({ attr1: { attr2: 5 } }, 'attr1.attr2');
```

Возвращает атрибут объекта. Путь к атрибуту может быть вложенным, как в примере.

Если первый атрибут имеет тип string, функция попытается преобразовать эту строку в строку JSON.

### getAstroDate

```js
getAstroDate(pattern, date, offsetMinutes);
```

Возвращает объект JavaScript Date для указанного имени астрономического объекта (например,`"sunrise"` или`"sunriseEnd"` Допустимые значения см. в списке допустимых значений в разделе [Astro](#astro--function) функции _планирования_ .

Возвращаемый объект Date вычисляется на основе указанной _даты_ . Если дата не указана, используется текущий день.

```js
let sunriseEnd = getAstroDate('sunriseEnd');
log(`Sunrise ends today at ${sunriseEnd.toLocaleTimeString()}`);

let today = new Date();
let tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
let tomorrowNight = getAstroDate('night', tomorrow);
```

**Примечание: В зависимости от вашего географического местоположения, в некоторых случаях, например, «ночь»/«конец ночи» могут отсутствовать в определенные моменты времени (например, в северных регионах в мае/июне каждого года!).**

Для проверки правильности временных точек можно использовать такие веб-сайты, как [suncalc.net](http://suncalc.net) .

### isAstroDay

```js
isAstroDay();
```

Возвраты`true` если текущее время находится между восходом и закатом солнца.

### compareTime

```js
compareTime(startTime, endTime, operation, timeToCompare);
```

Сравните заданное время с пределами.

Если`timeToCompare` Данные не указаны, поэтому будет использовано фактическое время.

Возможны следующие операции:

- `">"` - если заданное время больше, чем`startTime`
- `">="` - если заданное время больше или равно`startTime`
- `"<"` - если заданное время меньше`startTime`
- `"<="` - если заданное время меньше или равно`startTime`
- `"=="` - если заданное время равно`startTime`
- `"<>"` - если заданное время не равно`startTime`
- `"between"` - если заданное время находится в пределах`startTime` и`endTime`
- `"not between"` - если указанное время не находится в пределах`startTime` и`endTime`

Время может быть объектом типа Date, объектом Date со временем или просто временем.

Для определения времени можно использовать астрономические названия (astro-names). Все 3 параметра можно установить как астрономическое время. Возможны следующие значения:`sunrise` ,`sunset` ,`sunriseEnd` ,`sunsetStart` ,`dawn` ,`dusk` ,`nauticalDawn` ,`nauticalDusk` ,`nightEnd` ,`night` ,`goldenHourEnd` ,`goldenHour` Подробности смотрите в разделе [«Астро»](#astro--function) .

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

### setState

```js
setState(id, state, ack, callback);
```

_Примечание_ : Следующие команды идентичны.

```js
setState('myState', 1, false);
setState('myState', { val: 1, ack: false });
setState('myState', 1);
```

Пожалуйста, обратитесь к <https://github.com/ioBroker/ioBroker/wiki/Adapter-Development-Documentation#commands-and-statuses> для получения информации об использовании.`ack` . Короткий:

- `ack` =`false` Скрипт отправляет команду для выполнения целевым устройством/адаптером.
- `ack` =`true` Команда успешно выполнена, и состояние обновлено как положительный результат.

### setStateAsync

```js
await setStateAsync(id, state, ack);
```

Аналогично setState, но с`promise` .

### setStateDelayed

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

### setStateChanged

```js
await setStateChanged(id, state, ack);
```

Аналогично setState, но устанавливает значение только в том случае, если оно действительно изменилось.

### setStateChangedAsync

```js
await setStateChangedAsync(id, state, ack);
```

Аналогично setStateChanged, но с`promise` .

### clearStateDelayed

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

### getStateDelayed

```js
getStateDelayed(id);
```

Это синхронный вызов, и вы получите список всех запущенных таймеров (setStateDelayed) для этого идентификатора. Вы можете вызвать эту функцию без указания идентификатора и получить таймеры для всех идентификаторов. Если вы вызовете эту функцию для конкретного идентификатора объекта, вы получите следующий ответ:

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

- `left` — это оставшееся время в миллисекундах.
- `delay` — это начальное значение задержки в миллисекундах.

Вы можете запросить ответ непосредственно по timerId. В этом случае ответ будет следующим:

```js
getStateDelayed(3);

// returns an object like
{ id: 'hm-rpc.0.LQE91119.2.LEVEL', left: 5679, delay: 10000, val: 100, ack: false }
```

### getState

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

Если состояние отсутствует, в логах и объекте будет выведено предупреждение.`{ val: null, notExist: true }` будет возвращено. Чтобы подавить предупреждение, проверьте, существует ли состояние, прежде чем вызывать getState (см. [existsState](#existsState) ).

### getStateAsync

```js
const stateObject = await getStateAsync(id);
```

Аналогично getState, но с`promise` .

### существуетState

```js
existsState(id, (err, isExists) => {});
```

Если опция "Не подписывать все состояния при запуске" отключена, можно использовать более простой вызов:

```js
existsState(id)
```

В этом случае функция возвращает либо true, либо false.

Проверьте, существует ли штат.

### получить объект

```js
getObject(id, enumName);
```

Получите описание идентификатора объекта, хранящегося в системе. Вы можете указать имя перечисления. Если оно определено, к результату будут добавлены два дополнительных атрибута: enumIds и enumNames. Эти массивы содержат все перечисления, членом которых является ID. Например:

```js
getObject('adapter.N.objectName', 'rooms');
```

Возвращает в формате enumIds все комнаты, в которых запрошенный объект является участником. Вы можете установить значение "true" в качестве enumName, чтобы получить _все_ перечисления.

### setObject

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

### существуетОбъект

```js
existsObject(id, function (err, isExists) {});
```

Если опция "Не подписывать все состояния при запуске" отключена, можно использовать более простой вызов:

```js
existsObject(id)
```

В этом случае функция возвращает либо true, либо false.

Проверьте, существует ли объект.

### extendObject

```js
extendObject(id, obj, callback);
```

Это почти то же самое, что и...`setObject` Но сначала он считывает объект и пытается объединить все настройки.

Используйте его следующим образом:

```js
// Stop instance
extendObject('system.adapter.sayit.0', {common: {enabled: false}});
```

### deleteObject

```js
deleteObject(id, isRecursive, callback);
```

Удалить объект из базы данных по ID. Если объект имеет тип`state` , значение состояния также будет удалено.

Дополнительный параметр`isRecursive` Если это будет указано, все дочерние элементы с заданным ID будут удалены. Очень опасно!

Используйте его следующим образом:

```js
// Delete state
deleteObject('javascript.0.createdState');
```

_Уведомление:`isRecursive` Эта опция доступна только с js-controller >= 2.2.x_

### getIdByName

```js
getIdByName(name, alwaysArray);
```

Возвращает идентификатор объекта с заданным именем. Если объектов с таким именем несколько, результатом будет массив.`alwaysArray` Если установлен флаг, результатом всегда будет массив, если найден какой-либо идентификатор.

### getEnums

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

### createState

```js
createState(name, initialValue, forceCreation, common, native, callback);
```

Если состояние и объект не существуют, создайте их в пространстве JavaScript, например:`javascript.0.mystate` .

!! Предпочтительно создавать собственные точки данных с полным идентификатором`0_userdata.0.mystate` !!!

#### Параметры:

- `name` : название штата без указания пространства имен, например`mystate`
- `initialValue` Переменную можно инициализировать после создания. Значение "undefined" означает, что значение не нужно инициализировать.
- `forceCreation` : создание/перезапись состояния независимо от того, существует ли это состояние или нет.
- `common` : общее описание объекта (см. описание [здесь)](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#state)
- `native` : исходное описание объекта. Любая конкретная информация.
- `callback` Вызывается после создания и инициализации состояния.

Если вы установите`common` флаг`alias` к`true` тогда будет создан псевдоним с тем же именем (но в`alias.0` пространство имен) как состояние. Псевдоним создается только в том случае, если он еще не существует.

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

- `createState('myDatapoint')` — Просто создайте точку данных, если она не существует.
- `createState('myDatapoint', 1)` - создать точку данных, если она не существует, и инициализировать ее значением 1.
- `createState('myDatapoint', { type: 'string', role: 'json', read: true, write: false }, () => { log('created'); });` - с общепринятыми определениями, такими как тип, чтение, запись и роль.
- `createState('myDatapoint', { name: 'My own datapoint', unit: '°C' }, () => { log('created'); });`
- `createState('myDatapoint', 1, { name: 'My own datapoint', unit: '°C' })` - Создать точку данных, если она не существует, с указанным именем и единицами измерения.

#### Объект, находящийся на второй позиции, всегда является`common`

Эти сокращенные формы объясняют, почему объект во второй позиции **никогда не** считывается как начальное значение.`createState('myDatapoint', {}, { type: 'object' })` Следовательно, он делает не то, что кажется на первый взгляд:`{}` становится`common` , и`{ type: 'object' }` переходит к`native` .

Чтобы присвоить состоянию начальное значение, не являющееся примитивным типом данных, поместите его в...`common.def` :

```js
createState('0_userdata.0.myObject', { name: 'My object', type: 'object', read: true, write: true, def: {} });
```

Состояние типа`object` ,`json` или`array` сохраняет свое значение в формате JSON, поэтому приведенное выше состояние начинается со строки.`'{}'` - точно так же`setState('0_userdata.0.myObject', {})` будет сохранено. По умолчанию оно преобразуется в строку; запись`def: '{}'` Вы сами тоже подойдете.

### createStateAsync

```js
await createStateAsync(name, initialValue, forceCreation, common, native);
```

То же самое, что и`createState` Но обещание будет выполнено.

### deleteState

```js
deleteState(name, callback);
```

Удаление состояния и объекта в пространстве JavaScript, например:`javascript.0.mystate` Состояния из других адаптеров удалить нельзя.

```js
deleteState('myDatapoint')
```

Просто удалите точку данных, если она существует.

### deleteStateAsync

```js
await deleteStateAsync(name);
```

То же самое, что и`deleteState` Но обещание будет выполнено.

### создать псевдоним

```js
createAlias(name, alias, forceCreation, common, native, callback);
```

Создать псевдоним в`alias.0` пространство, если его не существует, например`javascript.0.myalias` и ссылка на состояние или состояния чтения/записи. Общее определение берется из объекта идентификатора псевдонима чтения, но предоставленное общее определение имеет приоритет.

#### Параметры:

- `name` : идентификатор нового состояния псевдонима (возможно, без пространства имен псевдонима), например`test.mystate` (пространство имен)`alias.0.` будет добавлено =`alias.0.test.mystate` )
- `alias` : может быть либо существующим идентификатором состояния в виде строки, либо объектом с полным определением псевдонима, включая идентификаторы чтения/записи и функции чтения/записи. Примечание: определения псевдонимов нельзя задавать в качестве общего параметра!
- `forceCreation` : создание/перезапись псевдонима независимо от того, существует ли уже это состояние или нет.
- `common` : Общее описание объекта псевдонима (см. описание [здесь](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#state) ). Значения, указанные здесь, будут иметь приоритет над общим определением объекта идентификатора псевдонима для чтения. Примечание: Определения псевдонимов нельзя задать в рамках этого общего параметра, см. параметр alias!
- `native` : исходное описание объекта. Любая конкретная информация.
- `callback` Вызывается после создания и инициализации состояния.

Возможен короткий тип createAlias:

- `createAlias('myAlias', 'myDatapoint')` — Просто создайте alias.0.myAlias, который будет ссылаться на javascript.X.myDatapoint, если он не существует.
- `createAlias('myAlias', { id: { read: 'myReadDatapoint', write: 'myWriteDatapoint' }})` - создает псевдоним и ссылку на различные состояния чтения/записи

Для получения более подробной информации см. createState, он аналогичен.

### createAliasAsync

```js
await createAliasAsync(name, alias, forceCreation, common, native);
```

То же самое, что и`createAlias` Но обещание будет выполнено.

### sendTo

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

Некоторые адаптеры также поддерживают ответы на отправленные сообщения (например, history, sql, telegram). Ответ возвращается в функцию обратного вызова только в том случае, если сообщение отправлено конкретному экземпляру!

Пример (с функцией обратного вызова):

```js
sendTo('telegram.0', { user: 'UserName', text: 'Test message' }, (res) => {
    log(`Sent to ${res} users`);
});
```

_По умолчанию время ожидания составляет 20000 миллисекунд (если определена функция обратного вызова)._

```js
sendTo('telegram.0', { user: 'UserName', text: 'Test message' }, { timeout: 2000 }, (res) => {
    log(`Sent to ${res} users`);
});
```

### sendToAsync

```js
await sendToAsync(adapter, command, message);
await sendToAsync(adapter, command, message, options);
```

Аналогично sendTo, но с`promise` .

Пример:

```js
const res = await sendToAsync('sql.0', 'getEnabledDPs', {});
log(JSON.stringify(res));
```

### sendToHost

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
- `'upgradeController'` — Обновите js-controller до последней версии.
- `'getInterfaces'` - Возвращает все доступные сетевые интерфейсы системы.
- `'getInterfaces'` - Начинается загрузка адаптера
- `'rebuildAdapter'`
- `'readBaseSettings'`
- `'writeBaseSettings'`
- `'addNotification'`
- `'clearNotifications'`
- `'getNotifications'`
- `'updateLicenses'` - ознакомиться с лицензиями на iobroker.net
- `'upgradeOsPackages'`
- `'restartController'`

Это довольно специфические команды, и они требуются нечасто.

Пример:

```js
sendToHost('myComputer', 'cmdExec', { data: 'ls /' }, (res) => {
    log('List of files: ' + res.data);
});
```

**Внимание:** для вызова этой _команды необходимо включить параметр "setObject"_ .

### sendToHostAsync

```js
await sendToHostAsync(hostName, command, message);
```

Аналогично sendToHost, но с`promise` .

### setInterval

```js
setInterval(callback, ms, arg1, arg2, arg3, arg4);
```

Аналогично JavaScript`setInterval` .

### clearInterval

```js
clearInterval(id);
```

Аналогично JavaScript`clearInterval` .

### setTimeout

```js
setTimeout(callback, ms, arg1, arg2, arg3, arg4);
```

Аналогично JavaScript`setTimeout` .

### clearTimeout

```js
clearTimeout(id);
```

Аналогично JavaScript`clearTimeout` .

### setImmediate

```js
setImmediate(callback, arg1, arg2, arg3, arg4);
```

Аналогично JavaScript`setImmediate` и почти то же самое, что`setTimeout(callback, 0, arg1, arg2, arg3, arg4)` но с более высоким приоритетом.

### форматДата

```js
formatDate(millisecondsOrDate, format);
```

#### Параметры:

- `millisecondsOrDate` : количество миллисекунд из state.ts или state.lc (Количество миллисекунд с 1970.01.01 00:00:00) или объект JavaScript _new Date()_ или количество миллисекунд из _(new Date().getTime())_
- `format` : Может быть`null` Таким образом, будет использоваться формат системного времени, в противном случае — нет.

* ГГГГ, JJJJ, ГГГГ — полный год, например 2015
* YY, JJ, ГГ - короткий год, например, 15
* ММ, ММ (кириллица) - полный месяц, например, 01
* М, М (кириллица) - короткий месяц, например, 1
* ДД, ТТ, ДД - полный день, например, 02
* Д, Т, Д - короткий день, например, 2
* чч, СС, чч - полные часы, например, 03
* h, S, ч - короткие часы, например, 3
* мм, мм (кириллица) - полные минуты, например, 04
* м, м (кириллица) - короткие минуты, например, 4
* сс, сс (кириллица) - полные секунды, например, 05
* с, с (кириллица) - короткие секунды, например, 5
* sss, ссс (кириллица) - миллисекунды
* WW, НН (кириллица) - полный день недели в текстовом формате
* W, Н (кириллица) - сокращенный текст, обозначающий день недели.
* ОО, ОО (кириллица) - полный месяц в текстовом виде
* ООО, ООО (кириллица) - полный месяц в виде текста в родительном падеже
* О, О (кириллица) - короткий месяц в текстовом формате

#### Пример

```js
formatDate(new Date(), "YYYY-MM-DD") // => Date "2015-02-24"
formatDate(new Date(), "hh:mm") // => Hours and minutes "17:41"
formatDate(state.ts) // => "24.02.2015"
formatDate(state.ts, "JJJJ.MM.TT SS:mm:ss.sss") // => "2015.02.15 17:41:98.123"
formatDate(new Date(), "WW") // => Day of week "Tuesday"
formatDate(new Date(), "W") // => Day of week "Tu"
```

### форматTimeDiff

```js
formatTimeDiff(milliseconds, format);
```

#### Параметры:

- `milliseconds` разница в миллисекундах\*
- `format` : Может быть`null` , поэтому`hh:mm:ss` будет использован формат, в противном случае

* ДД, ТТ, ДД - полный день, например, "02"
* Д, Т, Д - короткий день, например, "2"
* чч - полные часы, например, "03"
* h, S, ч - короткие часы, например, "3"
* мм, мм (кириллица) - полные минуты, например, "04"
* м, м (кириллица) - короткие минуты, например, "4"
* сс, сс (кириллица) - полные секунды, например, "05"
* с, с (кириллица) - короткие секунды, например, "5"

Вы можете использовать экранирующий символ.`\` чтобы избежать замены. Например.`DD \Day\s, h \hour\s, m \minute, ss \second\s`

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

### getDateObject

```js
getDateObject(stringOrNumber);
```

Преобразует строку или число в объект Date. Если указаны только часы, к ним будет добавлена текущая дата, и будет предпринята попытка преобразования.

```js
getDateObject('20:00'); // 2024-05-18T18:00:00.000Z
getDateObject('2024-01-01'); // 2024-01-01T00:00:00.000Z
```

### форматЗначение

```js
formatValue(value, decimals, format);
```

Преобразует любое значение (включая строки) в число. Заменяет точку запятой, если это настроено в системе. Десятичные знаки указывают количество цифр после запятой. Значение по умолчанию — 2. Формат необязателен:

- '.,': 1234.567 => 1.234,56
- ',.': 1234.567 => 1,234.56
- ' .': 1234.567 => 1 234.56

### адаптерПодписаться

```js
adapterSubscribe(id);
```

Отправьте адаптеру сообщение "subscribe", чтобы уведомить его. Если у адаптера есть общий флаг "subscribeable", то в случае использования функции "subscribe" эта функция будет вызвана автоматически.

### адаптерОтписаться

```js
adapterUnsubscribe(id);
```

Отправляет сообщение адаптеру.`unsubscribe` чтобы сообщить адаптеру, что не следует опрашивать значения.

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

В качестве имени могут использоваться: состояние, канал, устройство или расписание.`idfilter` может содержать символы-заменители '\*'

Префиксы _**(не реализованы — требуют обсуждения)**_ :

- \# - брать по имени, а не по идентификатору
- . - фильтр по роли
- § - фильтр по комнате

_**Пример**_ :

- `$('state[id=*.STATE]')` или`$('state[state.id=*.STATE]')` или`$('*.STATE')` - выберите все штаты, идентификатор которых заканчивается на ".STATE".
- `$('state[id='hm-rpc.0.*]')` или`$('hm-rpc.0.*')` - возвращает все состояния экземпляра адаптера hm-rpc.0
- `$('channel(rooms=Living room)')` - все состояния в комнате "Гостиная"
- `$('channel{TYPE=BLIND}[state.id=*.LEVEL]')` - Получите все жалюзи Homematic
- `$('channel[role=switch](rooms=Living room)[state.id=*.STATE]').setState(false)` - Изменить все состояния каналов с ролью "switch" в "гостиной" на false с помощью команды .STATE
- `$('channel[state.id=*.STATE](functions=Windows)').each(function (id, i) {log(id);});` - вывести все состояния перечисления "windows" в лог.
- `$('schedule[id=*65]').each(function (id, i) {log(id);});` - Все расписания следует распечатать с числом 65 в конце.
- `$('.switch §"Living room")` - Возможность выбора состояний со всеми переключателями в «Гостиной» _**(не реализовано — следует обсудить)**_
- `$('channel .switch §"Living room")`- Возможность выбора состояний со всеми переключателями в «Гостиной» _**(не реализовано — следует обсудить)**_

_**Пояснение.**_ Давайте посмотрим:

```js
$('channel[role=switch][state.id=*.STATE](rooms=Wohnzimmer)').on(obj => {
   log('New state ' + obj.id + ' = ' + obj.state.val);
});
```

Этот код выполняет поиск в каналах. Найти все каналы, содержащие`common.role="switch"` и принадлежит`enum.rooms.Wohnzimmer` Возьмите все их штаты, где идентификатор заканчивается на`".STATE"` и оформить подписку на все эти состояния. Если какое-либо из этих состояний изменится, функция обратного вызова будет вызвана аналогично функции «включено».

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

### readFile

```js
readFile(adapter, fileName, (error, bytes) => {});
```

Результат будет передан в функцию обратного вызова. Чтение файла из базы данных из папки.`javascript.0` .

Аргумент _adapter_ можно опустить.

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

По умолчанию рабочая директория/адаптер — это`javascript.0` .

### writeFile

```js
writeFile(adapter, fileName, bytes, (error) => {});
```

В функции обратного вызова будет передан необязательный код ошибки. Аргумент _адаптера_ можно опустить. fileName — это имя файла в базе данных. Все файлы хранятся в папке "javascript". Если вы хотите записывать данные в другие папки, например, в "/vis.0/", используйте для этого setFile.

Файл, который выглядит следующим образом`'/subfolder/file.txt'` будет храниться под`"/javascript/subfolder/file.txt"` и может быть доступен через веб-сервер с помощью`"http://ip:8082/javascript/subfolder/file.txt"`

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

### delFile

```js
delFile(adapter, fileName, (error) => {});
```

Удалить файл или каталог. fileName — это имя файла или каталога в базе данных.

Альтернативное название этого метода —`unlink`

### переименоватьФайл

```js
renameFile(adapter, oldName, newName, (error) => {});
```

Переименовать файл или каталог. oldName — это имя файла или каталога в базе данных, которое переименовывается в newName.

Альтернативное название этого метода —`rename`

### onFile

```js
onFile(id, fileName, withFile, (id, fileName, size, fileData, mimeType) => {});
// or
onFile(id, fileName, (id, fileName, size) => {});
```

Подписаться на обновления файла:

- `id` является идентификатором объекта типа`meta` , нравиться`vis.0`
- `fileName` это имя файла или шаблон, например`main/*` или`main/vis-view.json`
- `withFile` Необходимо определить, следует ли передавать содержимое файла в функцию обратного вызова. Передача содержимого файла требует памяти и времени, поэтому, если вы хотите получать уведомления только об изменениях, установите соответствующий параметр.`withFile` ложно.

Аргументы в функции обратного вызова:

- `id` - ID`meta` объект;
- `fileName` - имя файла (а не шаблон);
- `size` - новый размер файла;
- `fileData` - содержимое файла типа`Buffer` если файл является бинарным (определяется по расширению) или`string` Доставка осуществляется только при условии...`withFile` ;
- `mimeType` - MIME-тип файла, например`image/jpeg` Доставка осуществляется только при условии...`withFile` ;

**Важно** : эта функциональность доступна только в <js-controller@4.1.x> или более новых версиях.

### offFile

```js
offFile(id, fileName);
// or
onFile(id, fileName);
```

Отписаться от отслеживания изменений файлов:

- `id` является идентификатором объекта типа`meta` , нравиться`vis.0`
- `fileName` это имя файла или шаблон, например`main/*` или`main/vis-view.json`

**Важно** : эта функциональность доступна только в <js-controller@4.1.x> или более новых версиях.

### onStop

```js
onStop (() => { /* do something when script is stopped */ }, timeout);
```

Установите функцию обратного вызова, которая будет вызываться, если выполнение скрипта будет остановлено. Используется, например, для прекращения обмена данными или закрытия соединений.

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

`timeout` По умолчанию значение составляет 1000 мс.

### получитьИсторию

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

Возможные варианты вы можете найти [здесь](https://github.com/ioBroker/ioBroker.history#access-values-from-javascript-adapter) .

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

\*\*Примечание:\*\* Разумеется, историю просмотров необходимо предварительно включить для выбранного ID в административной панели.

### runScript

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

### runScriptAsync

Аналогично runScript, но с`promise` .

```js
runScriptAsync('scriptName')
    .then(() => log('Script started, but not yet executed'));

// or

await runScriptAsync('scriptName');
log(`Script was restarted`);
```

### startScript

```js
startScript('scriptName', ignoreIfStarted, callback);
```

Запускает скрипт. Если параметр ignoreIfStarted установлен в значение true, ничего не будет сделано, если скрипт еще запущен, в противном случае скрипт будет перезапущен.

```js
startScript('scriptName', true); // start script if not started
```

### startScriptAsync

Аналогично runScript, но с`promise` .

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

### стоп-скрипт

```js
stopScript('scriptName', callback);
```

Если вызов функции stopScript выполняется без аргументов, она остановится сама по себе:

```js
stopScript();
```

### stopScriptAsync

Аналогично stopScript, но с`promise` :

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

### isScriptActive

```js
isScriptActive('scriptName');
```

Возвращает значение, указывающее, включен или выключен скрипт. Обратите внимание, что это значение не указывает, запущен скрипт или нет. Скрипт может быть завершен, но при этом оставаться активированным.

Это не функция. Это переменная с экземпляром JavaScript, видимая в области видимости скрипта.

### toInt

### toFloat

### toBoolean

### jsonataExpression

### ждать

Просто приостановите выполнение скрипта. Внимание: эта функция...`promise` и должен вызываться следующим образом:

```js
await wait(1000);
```

### спать

То же самое, что и [ожидание.](#wait)

### messageTo

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

### messageToAsync

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

### onMessage

```js
onMessage('messageName', (data, callback) => {
    log(`Received data: ${data}`);

    callback({ result: Date.now() });
});
```

Подписывайтесь на`javascript` Адаптер отправляет сообщения по шине и передает ответ через функцию обратного вызова. Ответ от скрипта, который отправляет ответ первым, будет принят как ответ, все остальные ответы будут проигнорированы.

Чтобы отправить сообщение JavaScript-скрипту, которое затем будет получено этим обработчиком, используйте [метод \`messageTo\`](#messageTo) .

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

### onMessageUnregister

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

### onLog

```js
onLog('error', data => {
    sendTo('telegram.0', { user: 'UserName', text: data.message });
    log('Following was sent to telegram: ' + data.message);
});
```

Подпишитесь на обновления журналов с указанным уровнем серьезности.

_Важно:_ во избежание бесконечных циклов нельзя выводить сообщения в обработчике с одинаковым уровнем серьезности.

Например, это не приведет к созданию каких-либо логов:

```js
onLog('error', data => {
    console.error('Error: ' + data.message);
});
```

Для получения всех журналов`*` можно использовать. В этом случае вывод логов в обработчике будет полностью отключен.

```js
onLog('*', data => {
    console.error('Error: ' + data.message); // will produce no logs
});
```

### onLogUnregister

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

### httpGet

_Требуется версия >= 7.9.0_

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
- `responseType` (строка) - Поддерживаемые значения:`text` (по умолчанию) или`arraybuffer` для бинарных данных в ответе
- `basicAuth` (объект) - Учетные данные для базовой HTTP-аутентификации. Например:`{ user: 'admin', password: 'iobroker' }`
- `bearerAuth` (строка) - Токен для аутентификации носителя
- `headers` (объект) - Дополнительные пользовательские HTTP-заголовки, например`{ 'Accept-Language': 'en-GB,en;q=0.9' }`
- `validateCertificate` (логическое значение) - Разрешает использование самоподписанных сертификатов, когда`false`

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

Отключить проверку сертификатов — _требуется версия >= 8.4.0_

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

### httpPost

_Требуется версия >= 7.9.0_

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

### создатьTempFile

_Требуется версия >= 8.3.0_

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

## зарегистрироватьУведомление

_Требуется версия >= 8.8.0_

```js
registerNotification('This is just an information'); // Notify
registerNotification('This is an important message!', true); // Alert
```

## Глобальные переменные скрипта

### scriptName

`scriptName` - Название скрипта.

```js
log(`Script ${scriptName} started!`);
```

### пример

`instance` - Экземпляр JavaScript, в котором выполняется скрипт (например)`0` ).

```js
log(`Script ${scriptName} started started by ${instance}`);
```

### defaultDataDir

`defaultDataDir` - Абсолютный путь к файлу iobroker-data.

```js
log(`Data dir: ${defaultDataDir}`);
```

### многословный

`verbose` — Подробный режим включен?

```js
log(`Verbose mode: ${verbose ? 'enabled' : 'disabled'}`);

// Example
if (verbose) {
    log('...');
}
```

### СЕКРЕТЫ

`SECRETS` - Учетные данные центрального хранилища учетных данных ioBroker.

Управление учетными данными осуществляется в административном интерфейсе в разделе **«Основные настройки»** -> **«Учетные данные»** . Каждые учетные данные имеют идентификатор (например,`CameraPassword` ) и содержит либо один **ключ** (например, ключ API или пароль), либо пару **логин** / **пароль** . Секретные поля хранятся в зашифрованном виде с использованием системного секрета и передаются скриптам уже в расшифрованном виде:

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

`SECRETS` Доступен только для чтения и всегда актуален: если учетные данные добавляются, изменяются или удаляются в административном интерфейсе, новое значение используется немедленно — ни адаптер, ни скрипт не нужно перезапускать.

Если учетные данные отсутствуют,`undefined` возвращается:

```js
if (SECRETS.CameraPassword) {
    log('The camera password is defined');
}
```

#### Какие поля содержатся в учетных данных?

У каждого пользователя есть либо один, либо другой тип учетных данных.`key` или`login` /`password` пара. Три способа узнать, какая именно:

- В настройках экземпляра JavaScript-адаптера в разделе « **Доступные учетные данные»** перечислены все учетные данные с указанием их полей и готового к копированию выражения.
- В редакторе автозавершение после`SECRETS.` указывает на существующие учетные данные, а после следующей точки — на поля, которые содержат эти учетные данные.
- В сценарии:

```js
log(JSON.stringify(Object.keys(SECRETS.CameraPassword))); // ["key"]
log(JSON.stringify(Object.keys(SECRETS.MyMailAccount))); // ["login","password"]
```

В Blockly есть функция блокировки **учетных данных** для той же цели — см. [документацию Blockly](blockly.md#credential) .

Доступ можно отключить с помощью параметра экземпляра **«Разрешить скриптам читать учетные данные»** .`SECRETS` В этом случае поле пустое, и в журнал записывается предупреждение.

**Примечание:** для этого требуется js-controller версии 7.2 или новее.

## Опция — «Не подключать все штаты при запуске»

Существует два способа присоединения к государствам:

1. Адаптер подписывается на все состояния при запуске и получает все изменения всех состояний (использовать getState(id) легко, но это требует больше ресурсов процессора и оперативной памяти):

```js
log(getState('someID').val);
```

2. Адаптер подписывается каждый раз на указанный ID, когда`on/subscribe` Вызывается метод. В этом режиме адаптер получает обновления только для желаемых состояний. Этот вариант требует меньше оперативной памяти и более эффективен, но вы не можете получить доступ к состояниям синхронно через getState. **Для доступа к состояниям необходимо использовать коллбэки или промисы** :

```js
getState('someID', (error, state) => {
    log(state.val);
});
```

Причина: адаптер не хранит значение состояния в оперативной памяти и должен запросить его из центральной базы данных состояний.

## Активность скриптов

Существует возможность включать и отключать скрипты с помощью состояний. Для каждого скрипта будет создано состояние с именем.`javascript.INSTANCE.scriptEnabled.SCRIPT_NAME` Скрипты можно активировать и деактивировать, управляя этим состоянием с помощью соответствующего параметра.`ack=false` .