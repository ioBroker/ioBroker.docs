---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-coap.md"},"de/adapterref/iobroker.shelly/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"},"de/adapterref/iobroker.shelly/faq.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/faq.md"},"de/adapterref/iobroker.shelly/debug.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/debug.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.shelly/faq.md
title: ioBroker.shelly
hash: tqBzJqrlwxJCvPxk4+OFMmmGxlA5sQuE3ueJiVY3CrI=
---
![标识](../../../de/admin/shelly.png)

# IoBroker.shelly
这是德语文档 - [🇺🇸 德语版](../en/faq.md)

## 可以同时使用CoAP（CoIoT）和MQTT吗？
不需要，但您可以创建 Shelly 适配器的第二个实例，然后将其配置为 MQTT（另一个实例配置为 CoAP/CoIoT）。

## 我不知道MQTT是如何工作的，使用起来复杂吗？
不需要，您只需按照 [这里](protocol-mqtt.md) 的说明配置 Shelly 设备即可。 Shelly 适配器在内部完成剩下的工作。

## 我可以在 CoAP (CoIoT) 和 MQTT 之间切换吗？
您可以随时更改 Shelly 实例中的配置。所有对象和状态将保持不变。仅与设备的通信发生变化。

## 我已经配置了CoAP（CoIoT），但是Shelly没有出现
最有可能配置了多播`mcast`。这不能可靠地工作 - 因此应该配置*单播*。 [这里](protocol-coap.md) 中解释了其工作原理。

*CoAP/CoIoT 仅受第一代 (Gen1) 设备支持！*

## Shelly 适配器无法识别我的设备
在适配器支持的设备列表中尚未找到该设备，或者 Shelly 上的 MQTT 设置中的客户端 ID 已更改。根据[文档](protocol-mqtt.md)，不得更改此 ID，因为此 ID 用于确定设备类型！

## 是否可以将 Shelly 适配器连接到现有的 MQTT 代理？
无法将 Shelly 适配器连接到网络上现有的 MQTT 代理。 Shelly 适配器在内部启动自己的 MQTT 代理，该代理在端口“`1882`”上启动，以避免与同一系统上的其他 MQTT 代理发生冲突。

## 使用 Shelly 适配器时还可以使用云连接吗？
如果您使用 **第一代 (Gen1)** 设备，则无法同时使用 MQTT 和 Shelly Cloud。在这种情况下，如果要同时存在云连接，则必须使用 CoAP/CoIoT 进行 ioBroker 集成。

**第 2 代+ (Gen2+)** 设备可以通过 MQTT 连接，同时保持云连接。