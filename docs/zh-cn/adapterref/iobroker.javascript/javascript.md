---
chapters: {"pages":{"en/adapterref/iobroker.javascript/README.md":{"title":{"en":"ioBroker.javascript"},"content":"en/adapterref/iobroker.javascript/README.md"},"en/adapterref/iobroker.javascript/blockly.md":{"title":{"en":"Contents"},"content":"en/adapterref/iobroker.javascript/blockly.md"},"en/adapterref/iobroker.javascript/javascript.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.javascript/javascript.md"},"en/adapterref/iobroker.javascript/upgrade-guide.md":{"title":{"en":"Upgrade guide"},"content":"en/adapterref/iobroker.javascript/upgrade-guide.md"}}}
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.javascript/javascript.md
title: 无标题
hash: UmK1HZKtWaP8R5sBrmHDlBd/X2rcN/ZpM8kys6G6zfM=
---
＃＃ 内容
- [注](#note)
- [全局函数](#global-functions)
- [最佳实践](#best-practice)

- [函数](#以下函数可在脚本中使用)
- [require - 加载一些模块](#require---load-some-module)
- [控制台 - 将消息输出到日志](#控制台---将消息输出到日志)
- [exec - 执行一些操作系统命令，例如“cp file1 file2”](#exec---execute-some-os-command-like-cp-file1-file2)
- [on - 订阅某些状态的更改或更新](#on---subscribe-on-changes-or-updates-of-some-state)
- [一次](#一次)
- [订阅 - 与开启相同](#subscribe---same-as-on)
- [取消订阅](#取消订阅)
- [getSubscriptions](#getsubscriptions)
- [getFileSubscriptions](#getfilesubscriptions)
- [schedule](#schedule)
- [时间表](#time-schedule)
- [天文函数](#天文函数)
- [scheduleById](#schedulebyid)
- [getSchedules](#getschedules)
- [清除日程](#清除日程)
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
- [getEnums](#getEnums)
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
- [clearTimeout](#clearTimeout)
- [setImmediate](#setImmediate)
- [formatDate](#formatdate)
- [formatTimeDiff](#formattimediff)
- [getDateObject](#getDateObject)
- [formatValue](#formatvalue)
- [adapterSubscribe](#adaptersubscribe)
- [adapterUnsubscribe](#adapterunsubscribe)
- [$ - 选择器](#---选择器)
- [readFile](#readfile)
- [writeFile](#writefile)
- [delFile](#delFile)
- [重命名文件](#重命名文件)
- [onFile](#onFile)
- [offFile](#offFile)
- [onStop](#onstop)
- [getHistory](#gethistory)
- [runScript](#runscript)
- [runScriptAsync](#runScriptAsync)
- [startScript](#startscript)
- [startScriptAsync](#startscriptasync)
- [stopScript](#stopscript)
- [stopScriptAsync](#stopScriptAsync)
- [isScriptActive](#isscriptactive)
- [名称](#脚本名称)
- [实例](#实例)
- [messageTo](#messageto)
- [messageToAsync](#messagetoasync)
- [onMessage](#onmessage)
- [onMessageUnregister](#onmessageunregister)
- [onLog](#onlog)
    - [onLogUnregister](#onlogunregister)
- [等待](#等待)
- [睡眠](#睡眠)
- [httpGet](#httpget)
- [httpPost](#httppost)
- [createTempFile](#createtempfile)
- [registerNotification](#registerNotification)

- [脚本活动](#scripts-activity)
- [更新日志](#changelog)

全局函数
您可以在 `global` 文件夹中定义全局脚本。

所有全局脚本在所有实例上都可用。如果全局脚本被禁用，则不会使用它。

全局脚本会直接添加到普通脚本的前面并进行编译，因此您无法通过全局脚本在脚本之间共享数据。请使用状态来实现此功能。

要在 TypeScript 中使用全局函数，必须先将其标记为全局函数，以便编译器能够识别它们。例如：

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

最佳实践：
创建两个 JavaScript 适配器实例：一个用于测试，一个用于生产环境。

在测试实例中测试脚本后，即可将其部署到生产环境。之后，您可以根据需要重启测试实例。

## 以下函数可在脚本中使用：
### Require - 加载某些模块
```js
const mod = require('module_name');
```

以下模块已预加载：`node:dgram`、`node:crypto`、`node:dns`、`node:events`、`node:fs`、`node:http`、`node:https`、`node:http2`、`node:net`、`node:os`、`node:path`、`node:util`、`node:stream`、`node:zlib`、`suncalc2`、`axios`、`wake_on_lan`、`request`（已弃用）

要使用其他模块，请在实例配置中输入模块的名称（和版本）。ioBroker 将安装该模块。之后，您可以在脚本中引入并使用它。

### 控制台 - 将消息输出到日志
用法与`javascript`中的用法相同

### Exec - 执行一些操作系统命令，例如 `cp file1 file2`
```js
exec(cmd, [options], callback);
```

执行系统命令并获取输出结果。

```js
// Get the list of files and directories in /var/log
exec('ls /var/log', (error, stdout, stderr) => {
    log('stdout: ' + stdout);
});
```

Node.js 使用 /bin/sh 来执行命令。如果您想使用其他 shell，可以使用 child_process.exec 的 [Node.js 文档](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) 中所述的选项对象。

最佳实践是始终使用完整的命令路径名，以确保执行正确的命令。

**注意：**您必须启用“setObject”命令选项才能调用它。

### 开启 - 订阅某些状态的变更或更新
```js
on(pattern, callbackOrId, value);
```

回调函数将返回一个包含以下内容的对象作为参数：

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

**注意：** `state` 以前称为 `newState`。该名称仍然有效。

例子：

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

您可以使用以下参数来指定触发器：

| 参数 | 类型/值 | 描述 |
|-------------|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| 逻辑 | 字符串 | "and" 或 "or" 逻辑用于组合条件（默认值："and"） |
|             |            |                                                                                                                                                     |
| id | 字符串 | id 等于给定的值 |
| | 正则表达式 | id 与正则表达式匹配 |
| | 数组 | id 与允许的 ID 列表匹配 |
|             |            |                                                                                                                                                     |
| 名称 | 字符串 | 名称等于给定的名称 |
| | 正则表达式 | 名称与正则表达式匹配 |
| | 数组 | 名称与允许的名称列表匹配 |
|             |            |                                                                                                                                                     |
| 更改 | 字符串 | "eq", "ne", "gt", "ge", "lt", "le", "any" |
| | "eq" | （等于）新值必须等于旧值（state.val == oldState.val） |
| | "ne" | （不等于）新值必须不等于旧值 (state.val != oldState.val) **如果模式是 id 字符串，则默认使用此值** |
| | "gt" | （大于）新值必须大于旧值 (state.val > oldState.val) |
| | "ge" | （大于或等于）新值必须大于或等于旧值 (state.val >= oldState.val) |
| | "lt" | （较小）新值必须小于旧值 (state.val < oldState.val) |
| | "le" | （小于或等于）新值必须小于或等于旧值 (state.val <= oldState.val) |
| | "any" | 如果只有新值到达，则会触发 |
|             |            |                                                                                                                                                     |
| 值 | 混合 | 新值必须等于给定值 |
| valNe | mixed | 新值必须不等于给定值 |
| valGt | mixed | 新值必须大于给定值 |
| valGe | mixed | 新值必须大于或等于给定值 |
| valLt | mixed | 新值必须小于给定值 |
| valLe | mixed | 新值必须小于或等于给定值 |
|             |            |                                                                                                                                                     |
| ack | 布尔值 | 确认新值的状态是否等于给定值 |
| q | 数字 | 新值的质量代码状态与给定值相等。您可以使用“*”匹配任何代码。**如果未提供，则 q = 0 设置为模式！** |
|             |            |                                                                                                                                                     |
| oldVal | mixed | 先前的值必须等于给定的值 |
| oldValNe | mixed | 先前的值不能等于给定的值 |
| oldValGt | mixed | 先前的值必须大于给定的值 |
| oldValGe | mixed | 先前的值必须大于或等于给定的值 |
| oldValLt | mixed | 先前的值必须小于给定的值 |
| oldValLe | mixed | 先前的值必须小于或等于给定的值 |
|             |            |                                                                                                                                                     |
| oldAck | bool | 确认先前值的状态是否等于给定值 |
| oldQ | 数字 | 先前值的质量代码状态与给定值相等。您可以使用“*”匹配任何代码 |
|             |            |                                                                                                                                                     |
| ts | 字符串 | 新值的时间戳必须与给定的时间戳相等（state.ts == ts） |
| tsGt | 字符串 | 新值的时间戳必须与给定的时间戳不相等 (state.ts != ts) |
| tsGe | 字符串 | 新值的时间戳必须大于给定值（state.ts > ts） |
| tsLt | 字符串 | 新值的时间戳必须大于或等于给定的时间戳 (state.ts >= ts) |
| tsLe | 字符串 | 新值的时间戳必须小于给定的时间戳 (state.ts < ts) |
|             |            |                                                                                                                                                     |
| oldTs | 字符串 | 先前的时间戳必须与给定的时间戳相等 (oldState.ts == ts) |
| oldTsGt | 字符串 | 先前的时间戳必须与给定的时间戳不相等 (oldState.ts != ts) |
| oldTsGe | 字符串 | 先前的时间戳必须大于给定值 (oldState.ts > ts) |
| oldTsLt | 字符串 | 先前的时间戳必须大于或等于给定的时间戳 (oldState.ts >= ts) |
| oldTsLe | 字符串 | 先前的时间戳必须小于给定的时间戳 (oldState.ts < ts) |
|             |            |                                                                                                                                                     |
| lc | 字符串 | 最后更改时间戳必须等于给定的时间戳（state.lc == lc） |
| lcGt | 字符串 | 最后更改时间戳必须与给定时间戳不相等 (state.lc != lc) |
| lcGe | 字符串 | 最后更改时间戳必须大于给定值（state.lc > lc） |
| lcLt | 字符串 | 最后更改时间戳必须大于或等于给定值 (state.lc >= lc) |
| lcLe | 字符串 | 最后更改时间戳必须小于给定时间戳 (state.lc < lc) |
|             |            |                                                                                                                                                     |
| oldLc | 字符串 | 上一次最后更改时间戳必须等于给定的时间戳 (oldState.lc == lc) |
| oldLcGt | 字符串 | 上一次最后更改时间戳必须与给定的时间戳不相等 (oldState.lc != lc) |
| oldLcGe | 字符串 | 上次更改时间戳必须大于给定值 (oldState.lc > lc) |
| oldLcLt | 字符串 | 上一次最后更改时间戳必须大于或等于给定值 (oldState.lc >= lc) |
| oldLcLe | 字符串 | 上一次最后更改时间戳必须小于给定的时间戳 (oldState.lc < lc) |
|             |            |                                                                                                                                                     |
| channelId | 字符串 | 频道 ID 必须与给定的 ID 相等 |
| | 正则表达式 | 频道 ID 与正则表达式匹配 |
| | 数组 | 频道 ID 与允许的频道 ID 列表匹配 |
|             |            |                                                                                                                                                     |
| 频道名称 | 字符串 | 频道名称必须与给定名称相同 |
| | 正则表达式 | 频道名称与正则表达式匹配 |
| | 数组 | 频道名称与允许的频道名称列表进行匹配 |
|             |            |                                                                                                                                                     |
| deviceId | 字符串 | 设备 ID 必须与给定的 ID 相等 |
| | 正则表达式 | 设备 ID 与正则表达式匹配 |
| | 数组 | 设备 ID 与允许的设备 ID 列表匹配 |
|             |            |                                                                                                                                                     |
| deviceName | 字符串 | 设备名称必须与给定名称一致 |
| | 正则表达式 | 设备名称与正则表达式匹配 |
| | 数组 | 设备名称与允许的设备名称列表匹配 |
|             |            |                                                                                                                                                     |
| enumId | 字符串 | 状态属于给定的枚举 |
| | 正则表达式 | 状态的枚举 ID 中有一个满足给定的正则表达式 |
| | 数组 | 给定枚举 ID 列表中包含该州的一个枚举 ID |
|             |            |                                                                                                                                                     |
| enumName | 字符串 | 状态属于给定的枚举 |
| | 正则表达式 | 满足给定正则表达式的州枚举名称之一 |
| | 数组 | 状态的一个枚举名称在给定的枚举名称列表中 |
|             |            |                                                                                                                                                     |
| 来自 | 字符串 | 新值来自已定义的适配器 |
| | 正则表达式 | 新值来自与正则表达式匹配的适配器 |
| | 数组 | 新值来自给定允许适配器列表中的适配器 |
|             |            |                                                                                                                                                     |
| fromNe | 字符串 | 新值不是来自已定义的适配器 |
| | 正则表达式 | 新值不是来自与正则表达式匹配的适配器 |
| | 数组 | 新值并非来自给定的禁用适配器列表中的适配器 |
|             |            |                                                                                                                                                     |
| oldFrom | 字符串 | 旧值来自已定义的适配器 |
| | 正则表达式 | 旧值来自与正则表达式匹配的适配器 |
| | 数组 | 旧值来自给定允许适配器列表中的适配器 |
|             |            |                                                                                                                                                     |
| oldFromNe | 字符串 | 旧值并非来自已定义的适配器 |
| | 正则表达式 | 旧值并非来自与正则表达式匹配的适配器 |
| | 数组 | 旧值并非来自给定的禁用适配器列表中的适配器 |

示例：如果 ID 为 `'*.STATE'` 的所有状态已被确认且具有新值 `true`，则触发该状态。

```js
{
    "id": /\.STATE$/,
    "val": true,
    "ack": true,
    "logic": "and"
}
```

**注意：**您可以直接使用正则表达式：

```js
on(/^system\.adapter\..*\.\d+\.memRss$/, function (obj) {
});

// same as
on({id: /^system\.adapter\..*\.\d+\.memRss$/, change: "ne"}, function (obj) {
});
```

要简单地将两个州连接起来，可以这样写：

```js
on('stateId1', 'stateId2');
```

*stateId1* 的所有更改都将写入 *stateId2*。

如果将 `value` 参数与状态 ID 作为第二个参数一起设置，则在任何更改时，状态都将填充 `value`。

```js
on('stateId1', 'stateId2', 'triggered');
setState('stateId1', 'new value');

// stateId2 will be set to 'triggered'.
```

函数 `on` 返回一个处理程序。可以通过取消订阅来使用此处理程序。

*注意：* 默认情况下，只有质量值为 0x00 的状态才会传递给回调函数。如果要获取所有事件，请在模式结构中添加 `{q: '*'}`。

*注意：* 请注意，默认情况下，“change”等于“any”，除非仅设置了字符串形式的 id（例如 `on('id', () => {});`）。在这种情况下，“change”将被设置为“ne”。

*注意：* 如果您还想将状态删除/过期作为触发器，则需要使用 `ne` 或 `any` 进行更改，并且使用 `*` 作为过滤器进行 q 操作！

*注意：*从 4.3.2 版本开始，可以将触发器类型作为第二个参数写入：`on('my.id.0', 'any', obj => log(obj.state.val));`

＃＃＃ 一次
注册一次性订阅，该订阅会在首次调用后自动取消订阅。与 [在](#on---subscribe-on-changes-or-updates-of-some-state) 相同，但仅执行一次。

```js
once(pattern, callback);
```

### 订阅 - 与 **[在](#on---subscribe-on-changes-or-updates-of-some-state)** 相同
### 取消订阅
```js
unsubscribe(id);
// or
unsubscribe(handler);
```

移除给定对象 ID 或给定处理程序的所有订阅。

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

### 获取订阅
获取订阅列表。

结果示例：

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

### 获取文件订阅
获取文件订阅列表。

结果示例：

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

＃＃＃ 日程
```js
schedule(pattern, callback);
```

带天文功能的定时器。

#### 时间表
模式可以是包含 [定时任务语法](http://en.wikipedia.org/wiki/Cron) 的字符串，由 5 位（不含秒）或 6 位（含秒）数字组成：

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

该模式也可以是一个对象，尤其适用于需要秒数的情况：

该对象可能具有以下属性：

- `第二`
- `分钟`
- `小时`
- `日期`
- `月`
- `年`
- `星期几`

```js
schedule({ second: [20, 25] }, () => {
    log('Will be triggered at xx:xx:20 and xx:xx:25 of every minute!');
});

schedule({ hour: 12, minute: 30 }, () => {
    log('Will be triggered at 12:30!');
});
```

模式可以是 Javascript Date 对象（某个特定时间点）——只有在这种情况下，它才会触发一次。

如果需要设置日程的开始或结束时间，也可以使用对象来实现。在这种情况下，该对象具有以下属性：

- `开始`
- `结束`
- `规则`

start 和 end 定义了一个 Date 对象、一个 DateString 字符串或自 1970 年 1 月 1 日 00:00:00 UTC 以来的毫秒数。

Rule 是一个包含 [定时任务语法](http://en.wikipedia.org/wiki/Cron) 的日程字符串或一个对象：

```js
let startTime = new Date(Date.now() + 5000);
let endTime = new Date(startTime.getTime() + 5000);
schedule({ start: startTime, end: endTime, rule: '*/1 * * * * *' }, () => {
    log('It will run after 5 seconds and stop after 10 seconds');
});
```

规则本身也可以是一个对象：

```js
let today = new Date();
let startTime = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
let endTime =  new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
let ruleData = { hour: 12, minute: 30 };
schedule({ start: startTime, end: endTime, rule: ruleData }, () => {
    log('Will be triggered at 12:30, starting tomorow, ending in 7 days');
});
```

#### 天文函数
可以通过“astro”属性使用星象功能：

```js
schedule({ astro: 'sunrise' }, () => {
    log("Sunrise!");
});

schedule({ astro: 'sunset', shift: 10 }, () => {
    log("10 minutes after sunset!");
});
```

属性“shift”表示以分钟为单位的偏移量。它也可以是负数，表示天文事件发生之前的时间。

以下值可用作天文函数中的属性：

- `"日出"`：日出（太阳的上边缘出现在地平线上）
- `"sunriseEnd"`：日出结束（太阳的下边缘触及地平线）
- `"goldenHourEnd"`：早晨的黄金时段（柔和的光线，最适合摄影的时间）结束
- `"solarNoon"`：正午时分（太阳位于最高点）
- “黄金时段”：傍晚黄金时段开始
- `"sunsetStart"`：日落开始（太阳的下边缘触及地平线）
- `"日落"`：日落（太阳消失在地平线以下，傍晚民用曙暮光开始）
- `"dusk"`：黄昏（傍晚航海曙暮光开始）
- `"nauticalDusk"`：航海黄昏（傍晚天文曙暮光开始）
- `"night"`：夜晚开始（足够黑暗，可以进行天文观测）
- `"nightEnd"`：夜晚结束（晨曦天文曙光开始）
- `"nauticalDawn"`：航海黎明（早晨航海曙光开始）
- `"dawn"`：黎明（航海晨昏蒙影结束，民用晨昏蒙影开始）
- `"nadir"`：夜空最低点（夜晚最黑暗的时刻，太阳位于最低位置）

**注意：**要使用“astro”功能，必须在javascript适配器设置中定义“纬度”和“经度”。

**注意：**在某些情况下，可能不存在 night/nightEnd 属性。请阅读 [这里](https://github.com/mourner/suncalc/issues/70) 了解详情。

**注意：** 稍作修改，即可使用“on”函数进行日程安排：

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

## 按 ID 安排
```js
scheduleById(id, callback);
scheduleById(id, ack, callback);
```

允许根据状态值创建计划。如果状态值发生变化，旧计划将被删除，并自动创建新计划。

支持的格式：

- `[h]h:[m]m:ss`（例如 `12:42:15`、`15:3:12`、`3:10:25`）
- `[h]h:[m]m`（例如 `13:37`、`9:40`）

```js
scheduleById('0_userdata.0.configurableTimeFormat', () => {
    log('Executed!');
});
```

示例：创建状态并注册状态变更时的计划：

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

### 获取日程安排
```js
const list = getSchedules(true);
```

返回所有 CRON 作业和计划任务的列表（astro 除外）。

如果要获取**所有正在运行的脚本**的列表，参数必须为 `true`。否则，仅返回当前脚本中的计划任务。

```js
const list = getSchedules(true);
list.forEach(schedule => log(JSON.stringify(schedule)));

// clear all schedules in all scripts!
list.forEach(schedule => clearSchedule(schedule));
```

示例输出：

```
2020-11-01 20:15:19.929  - {"type":"cron","pattern":"0 * * * *","scriptName":"script.js.Heizung","id":"cron_1604258108384_74924"}
2020-11-01 20:15:19.931  - {"type":"schedule","schedule":"{"period":{}}","scriptName":"script.js.Heizung","id":"schedule_19576"}
```

### 清除日程
如果**未使用**任何“astro”函数，您可以稍后取消计划。要实现这一点，必须保存计划对象：

```js
let sch = schedule('*/2 * * * *', () => { /* ... */ });

// later:
clearSchedule(sch);
```

### 获取属性
```js
getAttr({ attr1: { attr2: 5 } }, 'attr1.attr2');
```

返回对象的一个属性。属性路径可以嵌套，如示例所示。

如果第一个属性是字符串，则该函数将尝试将该字符串解析为 JSON 字符串。

### 获取天文日期
```js
getAstroDate(pattern, date, offsetMinutes);
```

返回指定星体名称（例如 `"sunrise"` 或 `"sunriseEnd"`）对应的 JavaScript Date 对象。有关有效值，请参阅 *schedule* 函数中 [星体](#astro--function) 部分允许的值列表。

返回的 Date 对象是根据传入的 *date* 计算的。如果未提供日期，则使用当前日期。

```js
let sunriseEnd = getAstroDate('sunriseEnd');
log(`Sunrise ends today at ${sunriseEnd.toLocaleTimeString()}`);

let today = new Date();
let tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
let tomorrowNight = getAstroDate('night', tomorrow);
```

**注意：根据您的地理位置，某些时间段内可能不存在“夜晚”/“夜晚结束”等概念（例如，每年五月/六月北方地区！）。**

您可以使用类似 [suncalc.net](http://suncalc.net) 的网页来检查时间点是否正确。

### IsAstroDay
```js
isAstroDay();
```

如果当前时间在天文日出日落之间，则返回`true`。

### 比较时间
```js
compareTime(startTime, endTime, operation, timeToCompare);
```

将给定时间与限制时间进行比较。

如果没有指定 `timeToCompare`，则将使用实际时间。

可以进行以下操作：

- `">"` - 如果给定时间大于 `startTime`
- `">="` - 如果给定时间大于或等于 `startTime`
- `"<"` - 如果给定时间小于 `startTime`
- `"<="` - 如果给定时间小于或等于 `startTime`
- `"=="` - 如果给定时间等于 `startTime`
- `"<>"` - 如果给定时间不等于 `startTime`
- `"between"` - 如果给定时间介于 `startTime` 和 `endTime` 之间
- “不在中间” - 如果给定时间不在 `startTime` 和 `endTime` 之间

时间可以是日期对象、带时间的日期，或者仅仅是时间。

您可以使用天文名称来定义时间。所有三个参数都可以设置为天文时间。

以下是可选值：`sunrise`、`sunset`、`sunriseEnd`、`sunsetStart`、`dawn`、`dusk`、`nauticalDawn`、`nauticalDusk`、`nightEnd`、`night`、`goldenHourEnd`、`goldenHour`。

详情请参见 [星体](#astro--function)。

```js
log(compareTime('sunsetStart', 'sunsetEnd', 'between') ? 'Now is sunrise' : 'Now is no sunrise');
```

也可以定义带偏移量的时间：

```js
log(compareTime({ astro: 'sunsetStart', offset: 30 }, { astro: 'sunrise', offset: -30 }, '>') ? 'Now is at least 30 minutes after sunset' : 'No idea');
```

天体的结构。

```js
{
    astro: 'sunsetStart',// mandatory, can be written as string and not as object if offset and date are default
    offset: 30,          // optional
    date:   new Date()   // optional
}
```

### 设置状态
```js
setState(id, state, ack, callback);
```

*注意*：以下命令相同

```js
setState('myState', 1, false);
setState('myState', { val: 1, ack: false });
setState('myState', 1);
```

有关 `ack` 的用法，请参阅 https://github.com/ioBroker/ioBroker/wiki/Adapter-Development-Documentation#commands-and-statuses。

简述：

- `ack` = `false`：脚本想要发送一条命令给目标设备/适配器执行。
- `ack` = `true`：命令已成功执行，状态更新为肯定结果

### SetStateAsync
```js
await setStateAsync(id, state, ack);
```

与 setState 相同，但使用 `promise`。

### 设置状态延迟
```js
setStateDelayed(id, state, isAck, delay, clearRunning, callback);
```

与 setState 相同，但延迟时间以毫秒为单位。您可以清除此 ID 的所有正在运行的延迟（默认情况下）。例如：

```js
// Switch ON the light in the kitchen in one second
setStateDelayed('Kitchen.Light.Lamp', true,  1000);

// Switch OFF the light in the kitchen in 5 seconds and let first timeout run.
setStateDelayed('Kitchen.Light.Lamp', false, 5000, false, () => {
    log('Lamp is OFF');
});
```

此函数返回定时器的处理程序，并且可以使用 clearStateDelayed 单独停止此定时器。

### SetStateChanged
```js
await setStateChanged(id, state, ack);
```

与 setState 相同，但仅当值确实发生变化时才设置值。

### SetStateChangedAsync
```js
await setStateChangedAsync(id, state, ack);
```

与 setStateChanged 相同，但使用 `promise`。

### 清除延迟状态
```js
clearStateDelayed(id);
```

清除指定状态 ID 的所有延迟任务或某些特定延迟任务。

```js
setStateDelayed('Kitchen.Light.Lamp', false,  10000); // Switch OFF the light in the kitchen in ten second
let timer = setStateDelayed('Kitchen.Light.Lamp', true, 5000, false); // Switch ON the light in the kitchen in five second
clearStateDelayed('Kitchen.Light.Lamp', timer); // Nothing will be switched on
clearStateDelayed('Kitchen.Light.Lamp'); // Clear all running delayed tasks for this ID
```

### 获取延迟状态
```js
getStateDelayed(id);
```

这是一个同步调用，您将获得此 ID 下所有正在运行的定时器（setStateDelayed）列表。

您可以不指定 ID 调用此函数，获取所有 ID 的定时器。

如果您针对某个特定对象 ID 调用此函数，您将得到以下结果：

```js
getStateDelayed('hm-rpc.0.LQE91119.1.STATE');

// returns an array like
[
    { timerId: 1, left: 1123,   delay: 5000,  val: true,  ack: false },
    { timerId: 2, left: 12555,  delay: 15000, val: false, ack: false },
]
```

如果请求所有 ID，答案将如下所示：

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

- `left` 表示剩余时间，单位为毫秒。
- `delay` 是以毫秒为单位的初始延迟值

您可以直接通过 timerId 查询。在这种情况下，答案将是：

```js
getStateDelayed(3);

// returns an object like
{ id: 'hm-rpc.0.LQE91119.2.LEVEL', left: 5679, delay: 10000, val: 100, ack: false }
```

### 获取状态
```js
getState(id);
```

返回具有给定 ID 的状态，格式如下：

```js
{
    val: value,
    ack: true/false,
    ts: timestamp,
    lc: lastchanged,
    from: origin
}
```

如果状态不存在，则会在日志中打印警告信息，并返回对象 `{ val: null, notExist: true }`。

要抑制此警告，请在调用 getState 之前检查状态是否存在（参见 [存在状态](#existsState)）。

### GetStateAsync
```js
const stateObject = await getStateAsync(id);
```

与 getState 相同，但使用 `promise`。

### 存在状态
```js
existsState(id, (err, isExists) => {});
```

如果“启动时不订阅所有状态”选项被禁用，则可以使用更简单的调用：

```js
existsState(id)
```

在这种情况下，该函数返回 true 或 false。

检查某个状态是否存在。

### 获取对象
```js
getObject(id, enumName);
```

获取系统中存储的对象 ID 的描述。

您可以指定枚举名称。如果定义了枚举名称，结果中将添加两个附加属性：enumIds 和 enumNames。

这些数组包含 ID 所属的所有枚举。例如：

```js
getObject('adapter.N.objectName', 'rooms');
```

返回 enumIds 中所有包含请求对象的房间。您可以将 enumName 定义为“true”来获取*所有*枚举值。

### 设置对象
```js
setObject(id, obj, callback);
```

将对象写入数据库。此命令可在适配器设置中禁用。请谨慎使用此函数，因为全局设置可能会被损坏。

你应该用它来**修改**你预先读取的现有对象，例如：

```js
const obj = getObject('adapter.N.objectName');
obj.native.settings = 1;
setObject('adapter.N.objectName', obj, (err) => {
    if (err) log('Cannot write object: ' + err);
});
```

### 存在对象
```js
existsObject(id, function (err, isExists) {});
```

如果“启动时不订阅所有状态”选项被禁用，则可以使用更简单的调用：

```js
existsObject(id)
```

在这种情况下，该函数返回 true 或 false。

检查对象是否存在。

### 扩展对象
```js
extendObject(id, obj, callback);
```

它几乎与 `setObject` 相同，但首先它会读取对象并尝试将所有设置合并在一起。

使用方法如下：

```js
// Stop instance
extendObject('system.adapter.sayit.0', {common: {enabled: false}});
```

### 删除对象
```js
deleteObject(id, isRecursive, callback);
```

通过 ID 从数据库中删除对象。如果对象类型为 `state`，则其状态值也将被删除。

可以提供附加参数`isRecursive`，这样就会删除给定ID的所有子节点。非常危险！

使用方法如下：

```js
// Delete state
deleteObject('javascript.0.createdState');
```

*注意：`isRecursive`选项仅适用于js-controller 2.2.x及更高版本*

### 获取 IdByName
```js
getIdByName(name, alwaysArray);
```

返回具有给定名称的对象的 ID。

如果存在多个具有此名称的对象，则结果将是一个数组。

如果设置了 `alwaysArray` 标志，则只要找到 ID，结果就始终是一个数组。

### 获取枚举
```js
getEnums(enumName);
```

获取包含成员的现有枚举列表，例如：

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

### 创建状态
```js
createState(name, initialValue, forceCreation, common, native, callback);
```

如果 javascript 空间中不存在状态和对象，则创建它们，例如 `javascript.0.mystate`。

!! 建议使用完整 ID `0_userdata.0.mystate` 创建自己的数据点！！！

＃＃＃＃ 参数：
- `name`：不带命名空间的州名称，例如 `mystate`
- `initialValue`：变量创建后可以进行初始化。值为“undefined”表示不进行初始化。
- `forceCreation`：无论状态是否存在，都创建/覆盖状态。
- `common`：对象的通用描述，请参阅[此处](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#state)的描述
- `native`：对象的原生描述。任何具体信息。
- `callback`：在状态创建和初始化后调用。

如果在 `common` 中将标志 `alias` 设置为 `true`，则会创建一个与状态同名的别名（但位于 `alias.0` 命名空间中）。

仅当别名尚不存在时才会创建。

以下别名设置也有效：

```js
common => {
    alias: {
        id: 'alias.0.myOtherState', // will be created automatically if not already exists
        write: 'val * 1000', // convert function for write to created state
        read: 'val / 1000'   // convert function to read from created state
    }
}
```

或者

```js
common => {
    alias: {
        id: 'alias.0.myOtherState', // will be created automatically if not already exists
    }
}
```

createState 的一种可能简写形式：

- `createState('myDatapoint')` - 如果数据点不存在，则创建数据点
- `createState('myDatapoint', 1)` - 如果数据点不存在，则创建该数据点并将其初始化为 1。
- `createState('myDatapoint', { type: 'string', role: 'json', read: true, write: false }, () => { log('created'); });` - 其中包含 type、read、write 和 role 等通用定义
- `createState('myDatapoint', { name: '我自己的数据点', unit: '°C' }, () => { log('已创建'); });`
- `createState('myDatapoint', 1, { name: '我的数据点', unit: '°C' })` - 如果数据点不存在，则创建具有指定名称和单位的数据点

### 创建状态异步
```js
await createStateAsync(name, initialValue, forceCreation, common, native);
```

与 `createState` 相同，但会返回承诺。

### 删除状态
```js
deleteState(name, callback);
```

删除 JavaScript 空间中的状态和对象，例如 `javascript.0.mystate`。无法删除其他适配器中的状态。

```js
deleteState('myDatapoint')
```

如果数据点存在，则直接删除。

### DeleteStateAsync
```js
await deleteStateAsync(name);
```

与 `deleteState` 相同，但会返回承诺。

### 创建别名
```js
createAlias(name, alias, forceCreation, common, native, callback);
```

如果 `alias.0` 空间中不存在别名，则创建别名，例如 `javascript.0.myalias`，并引用状态或读/写状态。

通用定义取自读取别名 ID 对象，但提供的通用定义优先。

＃＃＃＃ 参数：
- `name`：新别名状态的 ID（可以不带别名命名空间），例如 `test.mystate`（将添加命名空间 `alias.0.` = `alias.0.test.mystate`）
- `alias`：可以是现有状态 ID 的字符串，也可以是包含完整别名定义的对象，包括读/写 ID 和读/写函数。注意：别名定义不能作为通用参数的一部分进行设置！
- `forceCreation`：创建/覆盖别名，无论状态是否存在。
- `common`：别名对象的通用描述，请参阅[此处](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#state)的描述。此处提供的值将优先于读取别名 ID 对象的通用定义。注意：别名定义不能作为此通用参数的一部分进行设置，请参阅别名参数！
- `native`：对象的原生描述。任何具体信息。
- `callback`：在状态创建和初始化后调用。

createAlias 可能是一种简短的类型：

- `createAlias('myAlias', 'myDatapoint')` - 如果 alias.0.myAlias 不存在，则创建它并指向 javascript.X.myDatapoint。
- `createAlias('myAlias', { id: { read: 'myReadDatapoint', write: 'myWriteDatapoint' }})` - 创建别名并引用不同的读/写状态

其他细节请参见 createState，它与之类似。

### 创建别名异步
```js
await createAliasAsync(name, alias, forceCreation, common, native);
```

与 `createAlias` 相同，但会返回承诺。

### 发送至
```js
sendTo(adapter, command, message, callback);
sendTo(adapter, command, message, options, callback);
```

向特定适配器实例或所有适配器实例发送消息。使用适配器名称时，消息将发送给所有实例。

要获取有关消息的具体信息，您必须阅读特定适配器的文档。

示例（带自定义超时设置）：

```js
sendTo('telegram', { user: 'UserName', text: 'Test message' }, { timeout: 2000 });
```

某些适配器也支持对已发送消息的响应。（例如 history、sql、telegram）只有当消息发送到特定实例时，才会将响应返回给回调函数！

示例（带回调函数）：

```js
sendTo('telegram.0', { user: 'UserName', text: 'Test message' }, (res) => {
    log(`Sent to ${res} users`);
});
```

*默认超时时间为20000毫秒（如果已定义回调函数）*

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

与 sendTo 相同，但使用 `promise`。

例子：

```js
const res = await sendToAsync('sql.0', 'getEnabledDPs', {});
log(JSON.stringify(res));
```

### 发送至主机
```js
sendToHost(hostName, command, message, callback);
```

向控制器实例发送消息。

支持以下命令：

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
- `'upgradeController'` - 将 js-controller 升级到最新版本
- `getInterfaces` - 返回系统所有可用的网络接口
- `'getInterfaces'` - 启动适配器上传
- `'rebuildAdapter'`
- `'readBaseSettings'`
- `'writeBaseSettings'`
- `'addNotification'`
- `'清除通知'`
- `'getNotifications'`
- `'updateLicenses'` - 从 iobroker.net 读取许可证
- `'升级操作系统软件包'`
- `'restartController'`

这是一些比较具体的命令，并不常用。

例子：

```js
sendToHost('myComputer', 'cmdExec', { data: 'ls /' }, (res) => {
    log('List of files: ' + res.data);
});
```

**注意：**您必须启用“setObject”命令选项才能调用它。

### SendToHostAsync
```js
await sendToHostAsync(hostName, command, message);
```

与 sendToHost 相同，但使用 `promise`。

### 设置间隔
```js
setInterval(callback, ms, arg1, arg2, arg3, arg4);
```

与 javascript 相同 `setInterval`。

### 清除间隔
```js
clearInterval(id);
```

与 javascript 相同 `clearInterval`。

### 设置超时
```js
setTimeout(callback, ms, arg1, arg2, arg3, arg4);
```

与 javascript 相同 `setTimeout`。

### 清除超时
```js
clearTimeout(id);
```

与 javascript 相同 `clearTimeout`。

### 设置立即
```js
setImmediate(callback, arg1, arg2, arg3, arg4);
```

与 javascript `setImmediate` 相同，与 `setTimeout(callback, 0, arg1, arg2, arg3, arg4)` 几乎相同，但优先级更高。

### 格式化日期
```js
formatDate(millisecondsOrDate, format);
```

＃＃＃＃ 参数：
- `millisecondsOrDate`：从 state.ts 或 state.lc 获取毫秒数（从 1970.01.01 00:00:00 开始的毫秒数），或从 JavaScript 的 `new Date()` 对象获取毫秒数，或从 `new Date().getTime()` 获取毫秒数。
- `format`：可以为 `null`，此时将使用系统时间格式；否则

* YYYY、JJJJ、ГГГГ - 全年，例如 2015 年
* YY、JJ、ГГ - 短年份，例如 15
* MM，MM（西里尔字母）- 完整月份，例如 01
* M, M（西里尔字母）- 月份缩写，例如 1
* DD、TT、ДД - 全天，例如 02
* D、T、Д - 短日，例如 2
* hh、SS、чч - 整点，例如 03
* h、S、ч - 短时，例如 3 小时
* mm，мм（西里尔字母）- 整分钟，例如 04
* m, м（西里尔字母）- 表示分钟的短数字，例如 4
* ss，сс（西里尔字母）- 完整秒数，例如 05
* s，c（西里尔字母）- 短秒数，例如 5
* sss，ссс（西里尔字母）- 毫秒
* WW, НН（西里尔字母）- 完整的星期几文本
* W, Н（西里尔字母）- 星期几的缩写
* OO, ОО（西里尔字母）- 以文本形式表示完整月份
* OOO, ООО（西里尔字母）- 完整月份作为文本作为属格
* O, О（西里尔字母）- 月份缩写

＃＃＃＃ 例子
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

＃＃＃＃ 参数：
- `毫秒`：以毫秒为单位的差值*
- `format`：可以为 `null`，此时将使用 `hh:mm:ss` 格式，否则

* DD、TT、ДД - 全天，例如“02”
* D、T、Д - 短日期，例如“2”
* hh、SS、чч - 完整小时数，例如“03”
* h、S、ч - 短时间，例如“3”
* mm，мм（西里尔字母）- 整分钟，例如“04”
* m, м（西里尔字母）- 短分钟数，例如“4”
* ss, сс（西里尔字母）- 完整秒数，例如“05”
* s, c（西里尔字母）- 短秒数，例如“5”

您可以使用转义字符 `\` 来避免替换。例如：`DD \Day\s, h \hour\s, m \minute, ss \second\s`

＃＃＃＃ 例子
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

### 获取日期对象
```js
getDateObject(stringOrNumber);
```

将字符串或数字转换为 Date 对象。

如果只提供小时数，则会加上当前日期并尝试转换。

```js
getDateObject('20:00'); // 2024-05-18T18:00:00.000Z
getDateObject('2024-01-01'); // 2024-01-01T00:00:00.000Z
```

### 格式化值
```js
formatValue(value, decimals, format);
```

将任何值（包括字符串）格式化为数字。如果系统已配置，则将小数点替换为逗号。

小数位数指定逗号后的数字位数。默认值为 2。

格式为可选参数。

- '.,': 1234.567 => 1.234,56
- ',.': 1234.567 => 1,234.56
- ' .': 1234.567 => 1 234.56

### AdapterSubscribe
```js
adapterSubscribe(id);
```

向适配器发送“subscribe”消息以通知适配器。如果适配器具有通用标志“subscribable”，则在“subscribe”函数的情况下，该函数将被自动调用。

### 适配器取消订阅
```js
adapterUnsubscribe(id);
```

向适配器发送消息 `unsubscribe`，以通知适配器不要轮询这些值。

### $ - 选择器
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

选择器格式：

```js
"name[commonAttr=something1](enumName=something2){nativeName=something3}[id=idfilter][state.id=idfilter]"
```

名称可以是：状态、通道、设备或计划 `idfilter` 可以使用通配符“*”

前缀***（尚未实现 - 应进行讨论）***：

* # - 按名称而非 ID 获取
* . - 按角色筛选
* § - 按房间筛选

***例子***：

- `$('state[id=*.STATE]')` 或 `$('state[state.id=*.STATE]')` 或 `$('*.STATE')` - 选择 id 以“.STATE”结尾的所有州。
- `$('state[id='hm-rpc.0.*]')` 或 `$('hm-rpc.0.*')` - 返回适配器实例 hm-rpc.0 的所有状态
- `$('channel(rooms=Living room)')` - 房间“Living room”中的所有状态
- `$('channel{TYPE=BLIND}[state.id=*.LEVEL]')` - 获取 Homematic 的所有百叶窗
- `$('channel[role=switch](rooms=Living room)[state.id=*.STATE]').setState(false)` - 将“客厅”中角色为“switch”的所有通道的 .STATE 状态切换为 false
- `$('channel[state.id=*.STATE](functions=Windows)').each(function (id, i) {log(id);});` - 将枚举类型“windows”的所有状态打印到日志中
- `$('schedule[id=*65]').each(function (id, i) {log(id);});` - 打印所有末尾带有 65 的日程表
- `$('.switch §"客厅")` - 获取所有位于“客厅”的开关的状态 ***（尚未实现 - 需要讨论）***
- `$('channel .switch §"客厅")` - 获取“客厅”中所有开关的状态 ***（尚未实现 - 需要讨论）***

***解释*** 让我们来看一下：

```js
$('channel[role=switch][state.id=*.STATE](rooms=Wohnzimmer)').on(obj => {
   log('New state ' + obj.id + ' = ' + obj.state.val);
});
```

此代码在频道中搜索。

查找所有 ID 为 `common.role="switch"` 且属于 `enum.rooms.Wohnzimmer` 的频道。

获取所有 ID 以 `".STATE"` 结尾的频道状态，并订阅所有这些状态。

如果其中某些状态发生变化，则会调用回调函数，类似于“on”函数。

以下函数可用：setState、getState（仅限第一个）、on、each、toArray

```js
// Switch on all switches in "Wohnzimmer"
$('channel[role=switch][state.id=*.STATE](rooms=Wohnzimmer)').setState(true);
```

你可以通过返回 false 值来中断“each”循环，例如：

```js
// print two first IDs of on all switches in "Wohnzimmer"
$('channel[role=switch][state.id=*.STATE](rooms=Wohnzimmer)').each((id, i) => {
    log(id);
    if (i == 1) {
        return false;
    }
});
```

或者，您可以获取一个不常见的 ID 数组，并按照您自己的方式进行处理：

```js
// get some state and filter only which has an `true` value
const enabled = $('channel[role=switch][state.id=*.STATE](rooms=Wohnzimmer)').toArray().filter((id) => getState(id)?.val === true);
```

### 读取文件
```js
readFile(adapter, fileName, (error, bytes) => {});
```

结果将在回调函数中给出。

从数据库读取文件夹 `javascript.0` 中的文件。

参数 *适配器* 可以省略。

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

默认情况下，工作目录/适配器为`javascript.0`。

### 写入文件
```js
writeFile(adapter, fileName, bytes, (error) => {});
```

可选的错误代码将在回调函数中返回。参数 *adapter* 可以省略。

fileName 是数据库中的文件名。所有文件都存储在“javascript”文件夹中。

如果要写入其他文件夹，例如“/vis.0/”，请使用 setFile 方法。

看起来像 `'/subfolder/file.txt'` 的文件将存储在 `"/javascript/subfolder/file.txt"` 下，并可通过 Web 服务器使用 `"http://ip:8082/javascript/subfolder/file.txt"` 访问。

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

### 删除文件
```js
delFile(adapter, fileName, (error) => {});
```

删除文件或目录。fileName 是数据库中文件或目录的名称。

此方法的别名是`unlink`

### 重命名文件
```js
renameFile(adapter, oldName, newName, (error) => {});
```

重命名文件或目录。oldName 是数据库中文件或目录的名称，将被重命名为 newName。

此方法的别名是`rename`

### 已存档
```js
onFile(id, fileName, withFile, (id, fileName, size, fileData, mimeType) => {});
// or
onFile(id, fileName, (id, fileName, size) => {});
```

订阅文件更改：

- `id` 是类型为 `meta` 的对象的 ID，例如 `vis.0`
- `fileName` 是文件名或文件名模式，例如 `main/*` 或 `main/vis-view.json`
- `withFile` 参数用于指定是否在回调函数中传递文件内容。传递文件内容会消耗内存和时间，因此如果您只想接收文件更改的通知，请将 `withFile` 设置为 false。

回调函数中的参数：

- `id` - `meta` 对象的 ID；
- `fileName` - 文件名（非模式）；
- `size` - 新文件大小；
- `fileData` - 如果文件是二进制文件（通过扩展名检测），则为 `Buffer` 类型的文件内容，否则为 `string` 类型。仅当使用 `withFile` 时才提供；
- `mimeType` - 文件 MIME 类型，例如 `image/jpeg`。仅当 `withFile` 时才提供；

**重要提示**：此功能仅适用于 js-controller@4.1.x 或更高版本。

### 存档
```js
offFile(id, fileName);
// or
onFile(id, fileName);
```

取消订阅文件更改：

- `id` 是类型为 `meta` 的对象的 ID，例如 `vis.0`
- `fileName` 是文件名或文件名模式，例如 `main/*` 或 `main/vis-view.json`

**重要提示**：此功能仅适用于 js-controller@4.1.x 或更高版本。

### OnStop
```js
onStop (() => { /* do something when script is stopped */ }, timeout);
```

安装回调函数，当脚本停止运行时会调用该函数。例如，可用于停止通信或关闭连接。

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

`timeout` 默认值为 1000 毫秒。

### 获取历史记录
```js
getHistory(instance, options, (error, result, options, instance) => {});
```

从指定实例读取历史记录。如果未指定实例，则使用系统默认历史记录实例。

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

您可以找到的可能选项 [这里](https://github.com/ioBroker/ioBroker.history#access-values-from-javascript-adapter)。

此外，您必须为这些参数指定“id”，并且可以指定超时时间（默认值：20000毫秒）。

再举一个例子：

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

**注意：** 当然，必须先在管理员后台为所选 ID 启用历史记录功能。

### 运行脚本
```js
runScript('scriptName', () => {
    // Callback is optional
    log('Srcipt started, but not yet executed');
});
```

按名称启动或重启其他脚本（以及自身）。

```js
// restart script
runScript('groupName.scriptName1');
```

### RunScriptAsync
与 runScript 相同，但使用 `promise`。

```js
runScriptAsync('scriptName')
    .then(() => log('Script started, but not yet executed'));

// or

await runScriptAsync('scriptName');
log(`Script was restarted`);
```

### 开始脚本
```js
startScript('scriptName', ignoreIfStarted, callback);
```

启动脚本。如果 ignoreIfStarted 设置为 true，则当脚本已在运行时，不会执行任何操作；否则，脚本将重新启动。

```js
startScript('scriptName', true); // start script if not started
```

### StartScriptAsync
与 runScript 相同，但使用 `promise`。

```js
startScriptAsync('scriptName', ignoreIfStarted)
    .then(started => log(`Script was ${started ? 'started' : 'already started'}`));

// or

const started = await startScriptAsync('scriptName', ignoreIfStarted);
log(`Script was ${started ? 'started' : 'already started'}`);
```

启动脚本。如果 ignoreIfStarted 设置为 true，则当脚本已在运行时，不会执行任何操作；否则，脚本将重新启动。

```js
startScript('scriptName', true); // start script if not started
```

### 停止脚本
```js
stopScript('scriptName', callback);
```

如果调用 stopScript 时不带任何参数，它将自行停止：

```js
stopScript();
```

### 停止脚本异步
与 stopScript 相同，但使用 `promise`：

```js
stopScriptAsync('scriptName')
    .then(stopped => log(`Script was ${stopped ? 'stopped' : 'already stopped'}`));

//or
const stopped = await stopScriptAsync('scriptName');
log(`Script was ${stopped ? 'stopped' : 'already stopped'}`);
```

如果调用 stopScript 时不带任何参数，它将自行停止：

```js
stopScript();
```

### IsScriptActive
```js
isScriptActive('scriptName');
```

返回脚本是否已启用或已禁用。请注意，此返回值不会返回脚本当前是否正在运行。

脚本可能已执行完毕，但仍处于激活状态。

它不是一个函数，而是一个包含 JavaScript 实例的变量，在脚本的作用域内可见。

### ToInt
### ToFloat
### 到布尔值
### Jsonata表达式
＃＃＃ 等待
暂停脚本执行。

警告：此函数为 `promise`，必须按如下方式调用：

```js
await wait(1000);
```

＃＃＃ 睡觉
与 [等待](#wait) 相同

### 发送给
```js
messageTo({ instance: 'instance', script: 'script.js.common.scriptName', message: 'messageName' }, data, { timeout: 1000 }, result =>
    log(JSON.stringify(result)));
```

通过“消息总线”将消息发送到其他脚本，甚至可以发送到同一脚本中的某个处理程序。

回调超时时间默认为 5 秒。

目标可以简称为：

```js
messageTo('messageName', data, (result) => {
    log(JSON.stringify(result));
});
```

回调函数和选项是可选的，超时时间默认为 5000 毫秒（如果提供了回调函数）。

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

订阅 `javascript` 适配器消息总线，并通过回调函数传递响应。

第一个发送响应的脚本的响应将被接受为答案，所有其他响应都将被忽略。

要向 JavaScript 脚本发送消息，然后由该处理程序接收，请使用 [消息到](#messageTo)。

要从任何其他适配器发送消息，请使用

```js
adapter.sendTo('javascript.0', 'toScript', {
    script: 'script.js.messagetest',
    message: 'messageName',
    data: {
        flag: true
    }
});
```

要从 CLI 发送消息，请使用

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

取消订阅此邮件。

### OnLog
```js
onLog('error', data => {
    sendTo('telegram.0', { user: 'UserName', text: data.message });
    log('Following was sent to telegram: ' + data.message);
});
```

订阅指定严重级别的日志。

*重要提示：*为避免无限循环，处理程序中不能输出严重级别相同的日志。

例如，以下操作不会生成任何日志：

```js
onLog('error', data => {
    console.error('Error: ' + data.message);
});
```

要接收所有日志，可以使用 `*`。在这种情况下，处理程序中的日志输出将被完全禁用。

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

取消订阅这些日志。

### HttpGet
*需要版本 >= 7.9.0*

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

第二个参数可以是一个包含更多选项的对象（可选）。所有选项均为可选。支持的标志：

- `timeout`（数字）- 超时时间，单位为毫秒
- `responseType`（字符串）- 支持的值包括 `text`（默认值）或 `arraybuffer`（用于表示响应中的二进制数据）。
- `basicAuth`（对象）- HTTP 基本身份验证凭据。例如：`{ user: 'admin', password: 'iobroker' }`
- `bearerAuth`（字符串）- 用于 bearer 身份验证的令牌
- `headers`（对象）- 自定义 HTTP 标头，例如 `{ 'Accept-Language': 'en-GB,en;q=0.9' }`
- `validateCertificate`（布尔值）- 当为 `false` 时允许使用自签名证书

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

下载文件到ioBroker文件系统：

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

禁用证书验证 - *需要版本 >= 8.4.0*

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
*需要版本 >= 7.9.0*

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

通过自定义标头和身份验证

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

### 创建临时文件
*需要版本 >= 8.3.0*

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

## 注册通知
*需要版本 >= 8.8.0*

```js
registerNotification('This is just an information'); // Notify
registerNotification('This is an important message!', true); // Alert
```

## 全局脚本变量
### 脚本名称
`scriptName` - 脚本名称。

```js
log(`Script ${scriptName} started!`);
```

＃＃＃ 实例
`instance` - 执行脚本的 javascript 实例（例如 `0`）。

```js
log(`Script ${scriptName} started started by ${instance}`);
```

### 默认数据目录
`defaultDataDir` - iobroker-data 的绝对路径。

```js
log(`Data dir: ${defaultDataDir}`);
```

### 详细
`verbose` - 已启用详细模式？

```js
log(`Verbose mode: ${verbose ? 'enabled' : 'disabled'}`);

// Example
if (verbose) {
    log('...');
}
```

## 选项 - “启动时不订阅所有状态”
订阅状态有两种方式：

1. 适配器在启动时订阅所有状态，并接收所有状态的所有变化（使用 getState(id) 很容易，但需要更多的 CPU 和 RAM）：

```js
log(getState('someID').val);
```

2. 每次调用 `on/subscribe` 时，适配器都会订阅指定 ID 的更新。在此模式下，适配器仅接收所需状态的更新。此选项占用内存更少，效率更高，但您无法通过 `getState` 同步访问状态。**您必须使用回调或 Promise 来访问状态**。

```js
getState('someID', (error, state) => {
    log(state.val);
});
```

原因：适配器的 RAM 中没有状态值，必须从中央状态数据库请求该状态值。

## 脚本活动
可以通过状态启用和禁用脚本。每个脚本都会创建一个名为 `javascript.INSTANCE.scriptEnabled.SCRIPT_NAME` 的状态。

可以通过控制 `ack=false` 状态来激活和停用脚本。