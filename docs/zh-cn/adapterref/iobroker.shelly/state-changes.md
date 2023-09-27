---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-coap.md"},"de/adapterref/iobroker.shelly/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"},"de/adapterref/iobroker.shelly/faq.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/faq.md"},"de/adapterref/iobroker.shelly/debug.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/debug.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.shelly/state-changes.md
title: ioBroker.shelly
hash: rkeOdF+pLvPvPPWG9ZwdD/ZmWNTbeaEbYr5z++0cs3U=
---
![标识](../../../de/admin/shelly.png)

# IoBroker.shelly
这是德语文档 - [🇺🇸英文版](../en/state-changes.md)

## 状态变化
在标准中，状态仅在值更改时更新。在这种情况下，“即使没有值更改也更新对象”被禁用。

例子：

* `shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'S' (最后更改时间: 02/01/2020 10:20:00)`
* `shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'S' (最后更改时间: 2020 年 2 月 1 日 **10:20:00**)` - 状态没有更新在ioBroker中
* `shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'L' (最后修改时间: 02/01/2020 10:22:00)`

如果选中*即使没有值变化也更新对象*，即使没有值变化，所有状态也会不断更新。所以只有最后一次更新的时间发生了变化。

例子：

* `shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'S' (最后更改时间: 02/01/2020 10:20:00)`
* `shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'S' (最后更改时间: 02/01/2020 **10:21:00**)` - 即使有，时间也会更新给定的值没有变化
* `shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'L' (最后修改时间: 02/01/2020 10:22:00)`