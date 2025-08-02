---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.canbus/README.md
title: ioBroker.canbus
hash: ONJmAdYQIWIxaxVsFSbSVsYCmTRhQ7lmQEdzZjOyYpA=
---
# IoBroker.canbus
![标识](../../../en/adapterref/iobroker.canbus/admin/canbus.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.canbus.svg)
![下载](https://img.shields.io/npm/dm/iobroker.canbus.svg)
![安装数量（最新）](https://iobroker.live/badges/canbus-installed.svg)
![安装数量（稳定）](https://iobroker.live/badges/canbus-stable.svg)
![新公共管理](https://nodei.co/npm/iobroker.canbus.png?downloads=true)

[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/canbus/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**测试：**![测试和发布](https://github.com/crycode-de/ioBroker.canbus/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 CAN 总线适配器
该适配器将 ioBroker 连接到控制器局域网（CAN 总线）。

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-Plugin 文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用 Sentry 报告。

＃＃ 特征
* 使用标准帧和扩展帧接收和发送原始消息
* 每条消息都可以配置为接收和/或发送数据
* 能够自动添加尚未配置的 CAN 消息对象
* 为每条消息配置解析器，以便从原始消息缓冲区读取/写入数据
* 数字类型
* 布尔值包括位掩码支持
* 不同字符编码的字符串
* 自定义脚本来读取/写入原始数据缓冲区
* 高级导入/导出功能
* 导入消息配置来扩展您现有的配置
* 在管理界面中从 GitHub 导入预定义的“众所周知”的配置
* 以 `json` 或 `csv` 文件形式导出和导入消息配置
* 可选支持固定数据长度（DLC）
* 可选支持 RTR 标志
* 可选原始状态包含原始 CAN 消息对象
* 可选地为每个解析器在给定的时间间隔内自动设置一个特定的值（对于轮询数据很有用）

＃＃ 要求
* Linux 操作系统（因为使用了 socketcan 库）
* 内核支持的 CAN 硬件，并创建类似“can0”的接口
* 关于 CAN 总线上发送的消息的一些知识

**注意：**目前仅支持 Node.js >=20 和 <23 版本。由于使用了 `socketcan` 库，这是一个临时限制。

## 解析器
使用解析器，您可以从 CAN 消息缓冲区读取数据或将数据写入 CAN 消息缓冲区。

以下数据类型有预定义的解析器。
此外，您还可以编写自己的脚本，使用*自定义解析器*读取/写入值。

### *big-endian* 和 *little-endian* 表示的数字类型
* 有符号和无符号 8、16 和 32 位整数
* 32 位浮点数
* 64 位双精度

### 布尔值
* 1 个字节，包括位掩码支持

＃＃＃ 细绳
* 1至8字节长度
* 编码：*ascii*、*base64*、*hex*、*latin1*、*utf8*、*utf16le*

＃＃＃ 风俗
对于自定义解析器，您必须提供自己的读写脚本。
这些脚本应该是纯 JavaScript 编写的，并且只能在有限的范围内运行。

在脚本中您可以使用以下功能：

* 全局变量`undefined`、`NaN`、`isNaN`、`Infinity`、`isFinite`、`atob`、`btoa`、

`encodeURI`、`encodeURIComponent`、`decodeURI`、`decodeURIComponent`、`parseFloat`、`parseInt`、`JSON`、`Number`、`String`、`Array`、`BigInt`、`Blob`、`Boolean`、`Date`、`Map`、`Math`、`Object`、`RegExp`、`Set`、`Intl` `Buffer`、`Promise`、`setTimeout`、`clearTimeout`

* `async`/`await`
* 适配器日志函数 `log.warn('something')`、`log.info('something')`、`log.debug('something')`
* `getStateAsync('id')`、`getObjectAsync('id')`、`setStateAsync('id', 'value', ack)`，其中 `id` 是当前适配器实例下的状态/对象的部分 ID
* `getForeignStateAsync('id')`、`getForeignObjectAsync('id')` 和 `setForeignStateAsync('id', 'value', ack)`，其中 `id` 是状态/对象的完整 ID
* 函数 `wait(ms)` 返回一个在给定时间后解析的 Promise
* 适配器实例的所有自定义脚本之间共享的对象“sharedData”

脚本中的错误将被适配器记录。

在这两个脚本中，变量`buffer`和`value`都是预定义的。`buffer`始终以 Node.js 缓冲区的形式包含当前 CAN 消息内容。

`sharedData` 对象默认为空，可用于在单个自定义解析器的多个调用之间甚至多个自定义解析器之间共享一些数据。

#### 自定义读取脚本
在读取脚本中，您必须从`buffer`变量中读取`value`。

在自定义读取脚本的开头，`buffer` 将是已接收/当前 CAN 报文数据的副本（类似于 `.json` 状态）。
`value` 将是 `undefined`，应由脚本设置。

自定义读取脚本末尾的 `value` 变量的内容将用作状态的新值。
如果 `value` 为 `undefined`，则它将被忽略。使用此功能，您可以按数据部分过滤自定义读取脚本中的消息。

自定义读取脚本的示例
检查接收缓冲区中的前三个字节是否与固定值匹配。
如果匹配，则从缓冲区第 3 和第 4 个字节读取一个 16 位有符号整数值，并将其除以 10。

```js
if (buffer[0] === 0xC2 && buffer[1] === 0x10 && buffer[2] === 0x0F) {
  value = buffer.readInt16BE(3) / 10;
}
```

因为只有当前三个字节匹配时才会设置`value`，所以所有其他数据将被忽略，并且不会为状态设置新值。

#### 自定义写入脚本
在写入脚本中，您必须修改（或替换）`buffer` 变量。

在自定义写入脚本的开头，`buffer` 将是当前 CAN 报文数据的副本（类似于`.json` 状态）。
`value` 设置为应写入`buffer` 的状态值。

自定义写入脚本末尾的`buffer`变量的内容将用作 CAN 消息的新数据。

您也可以通过在自定义写入脚本中调用`return false;`来取消写入。
这允许您在不满足某些条件时阻止写入。

自定义写入脚本的示例
准备一个包含固定值的新缓冲区。
将状态值以有符号的 16 位整数形式写入缓冲区，从缓冲区的第五个字节开始。

```js
buffer = Buffer.from([0x30, 0x00, 0xFA, 0x06, 0x7E, 0x00, 0x00]);
buffer.writeInt16BE(value, 5);
```

新的`buffer`将被设置为`.json`状态。
如果消息启用了“自动发送”选项，则该消息将自动发送。

## 在脚本中的使用
您可以在脚本中处理/修改`<messageId>.json`或`<messageId>.<parserId>`状态。

此外，如果您在适配器配置中启用了`raw.received`和`raw.send`状态，则可以使用它们。
它们保存消息数据的字符串化JSON数据，可用于独立于配置的消息处理每条接收或发送的消息。
通过将JSON数据写入`raw.send`状态，您可以发送包含任何所需数据的CAN消息。

### 原始消息对象示例
```js
{
  "id": 42,
  "ext": false,
  "data": [0, 13, 37, 255],
  "rtr": false
}
```

`ext` 和 `rtr` 是可选的，默认为 `false`。

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.2.0 (2025-05-27)

* (crycode-de) Node.js >= 20 and <23, Admin >= 7.4.10 required
* (crycode-de) Optimized admin layout for smaller devices and added a warning on very small devices
* (crycode-de) Updated dependencies

### 2.1.1 (2024-11-04)

* (crycode-de) Fixed get/set functions in custom parser scripts

### 2.1.0 (2024-11-03)

* (crycode-de) Allow `setStateAsync` and `setForeignStateAsync` in custom parser scripts
* (crycode-de) Allow `setTimeout` and `clearTimeout` in custom parser scripts (using the adapters setTimeout implementation)
* (crycode-de) Added `wait` function to custom parser scripts

### 2.0.0 (2024-11-02)

* (crycode-de) Node.js >= 18, Admin >= 6.17, js-contoller >= 5.0.19 are required
* (crycode-de) Changed how custom parser scripts are interpreted. Most custom parser scripts should work as before but they have a limited scope now.
* (crycode-de) Custom parser scripts now support `getStateAsync`, `getForeignStateAsync`, `getObjectAsync` and `getForeignObjectAsync`. If you have used `getStateAsync`/`getObjectAsync` before you need to change them to `getForeignStateAsync`/`getForeignObjectAsync` or update the IDs if you get data from the same adapter instance.
* (crycode-de) Custom write parser scripts an now return false to cancel the write
* (crycode-de) Updated dependencies

### 1.3.1 (2022-04-19)

* (crycode-de) Fixed `autoSetValue` defaults for parsers
* (crycode-de) Fixed sentry admin integration
* (crycode-de) Updated dependencies

## License

Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)

Copyright (c) 2020-2025 Peter Müller <peter@crycode.de> (<https://crycode.de/>)