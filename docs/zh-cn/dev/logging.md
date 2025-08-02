---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/dev/logging.md
title: 无标题
hash: lqS7I0eLZt6tvBnm62QI2XrnTsl3mo5xbcJoPKJRbG8=
---
## 原木运输机
如果您想要订阅 ioBroker 适配器的某些或所有日志，您可以使用 **logTransporter**。要在您的适配器中激活，请将 `"logTransporter": true` 添加到您的 `io-package.json` 的通用结构中。<br><br>在您的适配器代码中（例如在 `main.js` 文件中），您将需要调用 `requireLog(true)` 来激活。一旦将 requireLog() 设置为 true，您就可以使用 `on('log', callback)` 订阅来自适配器的所有新日志。回调函数使用以下对象返回所有日志（示例）：

```
{from:'testlog.0', message: 'testlog.0 (12504) adapter disabled', severity: 'error', ts:1585413238439}
```

来自`main.js`的完整示例：

```
    adapter.requireLog(true);
    adapter.on('log', function(logObject) {
        // Here we have the log in "logObject" and can handle it accordingly.
        const severity = logObject.severity; // the log level (severity): info, warn, error, etc.
        // ....
});
```

背景信息
有一种特殊类型的适配器会使用日志。通常，所有适配器都会使用记录器将其消息写入日志文件。
但有些适配器必须显示日志或将其存储到其他内容中。

要创建这种类型的适配器，它必须在通用结构中具有 **logTransporter** 标志。

如果存在这样的标志，adapter.js 会自动为其创建特殊状态 - “system.adapter.adapterName.X.logging”。
当此适配器想要接收日志时，必须由 logTransport 适配器将此变量设置为 true。

“system.adapter.adapterName.X.logging”是redis类型列表的fifo队列。

其他适配器监视所有变量“*.logging”，并将日志消息写入相应的列表。
列表限制为 1000 条消息（默认情况下）。

logTransport 实例接收带有消息的事件“log”。

要控制“system.adapter.adapterName.X.logging”状态，适配器必须使用 *requireLog* 函数。
例如，```adapter.requireLog(true);``` 启用日志接收。

![插图](../../en/dev/media/logging.png)

该功能在*adapter.js*中实现，开发人员只需设置通用标志*logTransporter*并调用*requireLog()*。

非 logTransport 适配器的功能在 *adapter.js* 中实现，开发人员不必关心它。