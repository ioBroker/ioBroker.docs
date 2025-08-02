---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-coap.md"},"de/adapterref/iobroker.shelly/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"},"de/adapterref/iobroker.shelly/faq.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/faq.md"},"de/adapterref/iobroker.shelly/debug.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/debug.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.shelly/debug.md
title: ioBroker.shelly
hash: jewN0ODcNYhVW2t/1J05+xr6ZHrxICAjpV86oZ5wjQE=
---
![标识](../../../de/admin/shelly.png)

# IoBroker.shelly
这是德语文档 - [🇺🇸英文版](../en/debug.md)

＃＃ 调试
*调试仅适用于第 2 代以上设备*

＃＃＃ 要求
- 第 2 代以上设备
- MQTT 模式下的 Shelly Adapter 实例（版本 >= 6.0.0）

### 启用调试
1. 必须在每个 Shelly 设备上单独启用调试模式。为此，可以使用 Web 界面或状态“<device-id>.Sys.debugEnabled”。
2. 为了将调试消息写入ioBroker的标准日志（日志级别“info”），必须在实例中激活“记录调试消息”配置（默认为“false”）。

日志中的所有调试消息均以 `[Shelly Debug Message] ...` 开头