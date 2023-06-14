---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-coap.md"},"de/adapterref/iobroker.shelly/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"},"de/adapterref/iobroker.shelly/faq.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/faq.md"},"de/adapterref/iobroker.shelly/debug.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/debug.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.shelly/faq.md
title: ioBroker.shelly
hash: YdI6WcguC8lx+iIUrKbWdr1Oo+oqsBExjkqwvlXtyKE=
---
![标识](../../../de/admin/shelly.png)

# IoBroker.shelly
## 我可以同时使用 CoAP 和 MQTT 吗？
不可以，但您可以创建 Shelly 适配器的第二个实例，然后为 MQTT 配置该实例（另一个为 CoAP）。

## 不知道MQTT是怎么工作的，使用起来复杂吗？
不，您只需按照 [这里](protocol-mqtt.md) 的说明配置 Shelly 设备。 Shelly 适配器在内部完成其余工作。

## 我可以在 CoAP 和 MQTT 之间切换吗？
您可以随时更改 Shelly 实例中的配置。所有对象和状态都将保持不变。只有与设备的通信发生变化。

## 是否可以将 Shelly 适配器连接到现有的 MQTT 代理？
无法将 Shelly 适配器连接到网络中的现有 MQTT 代理。 Shelly 适配器在内部启动自己的 MQTT 代理，该代理在端口“`1882`”上启动，以避免与同一系统上的其他 MQTT 代理发生冲突。

## 使用 Shelly 适配器时，我还能使用云连接吗？
如果您使用的是**第一代 (Gen1)** 设备，则不能同时使用 MQTT 和 Shelly 云。在这种情况下，如果要同时存在云连接，则必须将 CoAP/CoIoT 用于 ioBroker 集成。

**第 2 代 (Gen2)** 设备可以通过 MQTT 连接，同时保持云连接。