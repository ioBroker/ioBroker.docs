---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.eventlist/README.md
title: ioBroker.eventlist
hash: HxDwMRvKkYD+DWbR1NuYV4A7bkvoZS3RecdhaMCxCdY=
---
![标识](../../../en/adapterref/iobroker.eventlist/admin/eventlist.png)

![安装数量](http://iobroker.live/badges/eventlist-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.eventlist.svg)
![下载](https://img.shields.io/npm/dm/iobroker.eventlist.svg)

# IoBroker.eventlist
![测试和发布](https://github.com/ioBroker/iobroker.eventlist/workflows/Test%20and%20Release/badge.svg)[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/eventlist/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry 插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用哨兵报告。

## IoBroker 的事件列表适配器
允许定义必须在事件列表中记录的状态。

该列表可以在 admin、web、vis、另存为 PDF、material（尚未实现）中显示。

此外，您可以通过 Telegram 或 WhatsApp 发送事件。

![列表](../../../en/adapterref/iobroker.eventlist/img/list.png)

![PDF格式](../../../en/adapterref/iobroker.eventlist/img/pdf.png)

##报警模式
事件只能在警报模式下生成。
报警模式可以由变量`eventlist.X.alarm`控制。

此外，只有在警报模式打开时才能向信使发送消息。

用例：

- 例如。门磁只有在没有人在家的情况下才能发送消息。否则关于开门的事件将只收集在事件列表中。

## 可能的演示文稿
### 在管理员选项卡中
您可以在管理员中启用事件列表作为选项卡。

### 网络
事件列表可以在`http://<IP>:8082/eventlist/index.html`下显示。 （对于实例 > 0：`http://<IP>:8082/eventlist/index.html?X`，其中 X 是实例编号）

### 可见小部件
事件列表可以显示为 vis 小部件。

### PDF 生成
可以生成包含所有事件的 PDF 文档。

如果您将模式放入其中，文档标题可以包含生成日期：`Event list on {{YYYY MM DD}}`。
时间格式的确切描述可以在这里找到：https://momentjs.com/docs/#/displaying/format/

可以通过将 `true` 写入 `eventlist.0.triggerPDF` 来触发 PDF 的生成。

PDF 文件可以通过以下方式访问：

- 网络：`http://<IP>:8082/eventlist/eventlist/report.pdf`（例如 > 0：`http://<IP>:8082/eventlist/eventlist/report-X.pdf`，其中 X 是实例编号）
- 管理员：`http://<IP>:8081/files/eventlist/report.pdf`（例如 > 0：`http://<IP>:8081/files/eventlist/report-X.pdf`，其中 X 是实例编号）

**图标无法以 PDF 格式显示。**

## 消息框
用户可以通过 javascript 将自定义事件添加到列表中：

```
// add custom event to event list
sendTo('eventlist.0', 'insert', {
    event: 'My custom text',
    id: 'ID.that.linked.with.this.event',  // optional
    ts: new Date('2020-09-25T16:11:00',    // optional. Default is Date.now()
    val: 5,                                // optional
    duration: 5                            // in ms
});

// Or simple
sendTo('eventlist.0', 'insert', 'My custom text');
// or
setState('eventlist.0.insert', 'My custom text');
// or
setState('eventlist.0.insert', JSON.stringify({event: 'My custom text %s', val: 5}));
```

用户可以请求特定 ID 的格式化 JSON 列表。当然ID必须在`eventlist`之前启用。

```
// add custom event to event list
sendTo('eventlist.0', 'list', {
    ids: ['my.0.state.id1', 'my.0.state.id2'],
    count: 10, // optional limit of maximal lines in table,
    allowRelative: false, // optional if relative times, e.g. "one minute ago", may be used (Default: true)
}, result => {
    console.log(JSON.stringify(result)); // array with events
    // result = [{id: 'my.0.state.id1',
    //
});

// or
sendTo('eventlist.0', 'list', 'my.0.state.id1', result => {
    console.log(JSON.stringify(result)); // array with events
});
```

用户可以从事件列表中删除部分或全部事件。

```
// delete all events
sendTo('eventlist.0', 'delete', '*', result => {
    console.log(`Deleted ${result.deleted} events`);
});

// delete all events for specific state ID
sendTo('eventlist.0', 'delete', 'hm-rpc.0.AEOI99389408.1.STATE', result => {
    console.log(`Deleted ${result.deleted} events`);
});

// delete one event by timestamp
sendTo('eventlist.0', 'delete', '2020-10-20T21:00:12.000Z', result => {
    console.log(`Deleted ${result.deleted} events`);
});
```

## 模式
在事件文本和状态文本中，可以使用以下模式：

- %s - value (`State changed to %s` => `State changed to 5`),
- %u - 单位（`状态更改为 %s%u` => `状态更改为 5%`），
- %n - 名称（`%n 将状态更改为 %s` => `设备 A 将状态更改为 5`），
- %t - time (`State changed state on %t` => `State changed state on Sep Fr, 16:32:00`),
- %r - 相对时间（`State changed state %r` => `State changed state 5 seconds ago`），
- %d - 持续时间（`状态处于先前状态 %d` => `状态处于先前状态 5s`），
- %g - 值差异（`状态在 %g% 上改变` => `状态在 1% 上改变`），
- %o - 值差异（`State changed value from %o to %` => `State was changed on 1%`）

## Web 中多个实例的使用
例如。您可以显示实例 2 的特定列表，例如 `http://IP:8082/eventlist/index.htmlindex.html?2`。

生成的报告将存储在 `eventlist/report.pdf` 中的实例 0，但例如 `eventlist/report-1.pdf` 中的实例 1。

＃＃ 去做
- 以相应语言更改 PDF 中的初始文本
- 许多预定义的图标（最少 100 个）
- 材料小部件
- 将消息发送到系统日志（可能是 splunk）https://www.npmjs.com/package/splunk-logging

<!-- 下一个版本的占位符（在行首）：

### **正在进行中** -->

## Changelog
### 1.1.1 (2022-10-12)
* (bluefox) Fixed icons of devices
* (bluefox) Migrated GUI to `mui5`
* (bluefox) Allowed the editing of list name
* (Hirsch-DE) corrected events without unit

### 1.0.1 (2022-06-22)
* (bluefox) Added preparations for ioBroker cloud

### 1.0.0 (2022-06-20)
* (bluefox) Allowed to work behind reverse proxy

### 0.5.5 (2022-04-23)
* (Apollon77) Fix a crash issue
* (Apollon77) Add Sentry also for the Node.js part

### 0.5.4 (2022-02-14)
* (bluefox) Corrected the image paths

### 0.5.3 (2022-02-13)
* (bluefox) Corrected the error with "changes only" option
* (bluefox) Added possibility to use icons with custom events

### 0.4.4 (2021-06-24)
* (bluefox) Corrected the warning for js-controller 3.x

### 0.4.3 (2021-04-19)
* (bluefox) Added the support of Admin5

### 0.4.2 (2020-12-05)
* (bluefox) Added possibility to add multiple states
* (bluefox) Moved the duration to previous state
* (bluefox) Support of multiple instances

### 0.4.0 (2020-11-10)
* (bluefox) Added setting of even/odd background for widget
* (bluefox) Added filter

### 0.2.9 (2020-10-20)
* (bluefox) Corrected error in GUI by disabling of state
* (bluefox) Implemented the deletion of events from the event list

### 0.2.8 (2020-10-14)
* (bluefox) Corrected error in pdf settings  
* (bluefox) Implemented the recalculation of the relative time every 10 seconds

### 0.2.6 (2020-09-25)
* (bluefox) Corrected error in pdf creation

### 0.2.5 (2020-09-24)
* (bluefox) Extended icon selector

### 0.2.1 (2020-09-21)
* (bluefox) Vis-widget was corrected

### 0.1.3 (2020-09-15)
* (bluefox) Implemented the alarm mode and messengers

### 0.0.3 (2020-09-08)
* (bluefox) Objects with states are supported now

### 0.0.2 (2020-09-07)
* (bluefox) initial commit

### 0.0.1
* (bluefox) initial release

## License
MIT License

Copyright (c) 2020-2022 ioBroker <dogafox@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.