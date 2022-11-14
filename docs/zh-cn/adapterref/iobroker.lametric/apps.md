---
chapters: {"pages":{"de/adapterref/iobroker.lametric/README.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/README.md"},"de/adapterref/iobroker.lametric/apps.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/apps.md"},"de/adapterref/iobroker.lametric/my-data-diy.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/my-data-diy.md"},"de/adapterref/iobroker.lametric/notifications.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/notifications.md"},"de/adapterref/iobroker.lametric/blockly.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/blockly.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.lametric/apps.md
title: ioBroker.lametric
hash: zIqxC1mqT1GyChvDagDfjVSXqQPcvYonXcFew2h197A=
---
![标识](../../../de/adapterref/iobroker.lametric/../../admin/lametric.png)

# IoBroker.lametric
## 特殊应用程序/小部件 *（需要适配器版本 >= 1.1.2）*
可以为某些应用程序提供附加信息或对其进行控制。

- [闹钟](https://apps.lametric.com/apps/alarm_clock/68)
- [秒表](https://apps.lametric.com/apps/stopwatch/71)
- [定时器](https://apps.lametric.com/apps/timer/72)
- [收音机](https://apps.lametric.com/apps/radio/70)
- [天气](https://apps.lametric.com/apps/weather/69)

### 闹钟
**clock.clockface**

有效值为

- `weather`、`page_a_day`、`custom` 或 `none`
- 格式为 `data:image/png;base64,<base64 编码的 png 二进制文件>` 或 `data:image/gif;base64,<base64 编码的 gif 二进制文件>` 格式的自定义图标

例子：

```
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAOklEQVQYlWNUVFBgwAeYcEncv//gP04FMEmsCmCSiooKjHAFMEF0SRQTsEnCFcAE0SUZGBgYGAl5EwA+6RhuHb9bggAAAABJRU5ErkJggg==
```

**clock.alarm.enabled**

启用或停用警报

**clock.alarm.time**

闹钟时间格式为``HH:MM:SS`` oder ``HH:MM`` - z.B. ``10:00:00`` oder ``10:00``

**clock.alarm.wake_with_radio**

用收音机代替闹钟叫醒

### 计时器
**倒计时.配置**

以秒为单位的时间

＃＃＃ 天气
**天气预报**

开始天气预报显示