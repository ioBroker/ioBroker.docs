---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/dev/logging.md
title: 无题
hash: lqS7I0eLZt6tvBnm62QI2XrnTsl3mo5xbcJoPKJRbG8=
---
##日志传输器
如果您要订阅ioBroker适配器的某些或所有日志，可以使用** logTransporter **。要在适配器中激活，请将`"logTransporter": true`添加到`io-package.json`的通用结构中。<br><br>然后，在适配器代码中（如`main.js`文件中一样），您将需要调用`requireLog(true)`进行激活。将requireLog（）设置为true后，您可以使用`on('log', callback)`来订阅来自适配器的所有新日志。回调函数返回带有以下对象的所有日志（示例）：

```
{from:'testlog.0', message: 'testlog.0 (12504) adapter disabled', severity: 'error', ts:1585413238439}
```

`main.js`中的完整示例：

```
    adapter.requireLog(true);
    adapter.on('log', function(logObject) {
        // Here we have the log in "logObject" and can handle it accordingly.
        const severity = logObject.severity; // the log level (severity): info, warn, error, etc.
        // ....
});
```

##背景信息
有一种特殊类型的适配器，它消耗日志。通常，所有适配器都使用logger将其消息写入日志文件。
但是某些适配器必须显示日志或将它们存储在其他地方。

要创建这种类型的适配器，它必须在通用结构中具有** logTransporter **标志。

如果存在此类标志，则adapter.js会自动为其创建特殊状态-“ system.adapter.adapterName.X.logging”。
当此适配器想要接收日志时，必须将logTransport适配器将此变量设置为true。

“ system.adapter.adapterName.X.logging”是redis类型列表的fifo队列。

其他适配器监视所有变量“ * .logging”并根据列表写入日志消息。
该列表受1000条消息的限制（默认情况下）。

logTransport实例接收带有消息的事件“ log”。

要控制“ system.adapter.adapterName.X.logging”状态，适配器必须使用* requireLog *函数。
例如。 §§JJJJJ_0_0§§启用日志接收。

![插图](../../en/dev/media/logging.png)

该功能在* adapter.js *中实现，开发人员只需设置公共标志* logTransporter *并调用* requireLog（）*。

非logTransport适配器的功能是在* adapter.js *中实现的，开发人员不必关心它。