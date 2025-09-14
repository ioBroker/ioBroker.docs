---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-coap.md"},"de/adapterref/iobroker.shelly/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"},"de/adapterref/iobroker.shelly/faq.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/faq.md"},"de/adapterref/iobroker.shelly/debug.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/debug.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.shelly/faq.md
title: ioBroker.shelly
hash: uQfzqoWLL+OdUCyI8jyCYSMf4WG5TQUQ/fPAMi5pjy0=
---
![标识](../../../de/admin/shelly.png)

# IoBroker.shelly
这是德语文档 - [🇺🇸 德语版](../en/faq.md)

## 使用 Shelly 应用程序也可以进行配置吗？
所有文档均基于设备网页界面的设置。应用程序中可能缺少某些选项。因此，不建议使用此方法！

## 可以同时使用 CoAP（CoIoT）和 MQTT 吗？
不可以，但是您可以创建 Shelly 适配器的第二个实例，然后将其配置为 MQTT（另一个配置为 CoAP/CoIoT）。

## 我不知道 MQTT 是如何工作的，使用起来很复杂吗？
不，您只需按照[这里](protocol-mqtt.md)中的说明配置 Shelly 设备即可。Shelly 适配器会在内部完成其余工作。

## 我可以在 CoAP（CoIoT）和 MQTT 之间切换吗？
您可以随时更改 Shelly 实例中的配置。所有对象和状态将保持不变。只有与设备的通信会发生变化。

## 我已经配置了 CoAP (CoIoT)，但是 Shelly 没有出现
最有可能的是，配置了多播`mcast`。这工作不可靠——因此，应该配置*单播*。如何配置请参见[这里](protocol-coap.md)。

*CoAP/CoIoT 仅受第一代 (Gen1) 设备支持！*

## Shelly 适配器无法识别我的设备
该设备尚未列在适配器的支持设备列表中，或者 Shelly 上的 MQTT 设置中的客户端 ID 已更改。根据[文档](protocol-mqtt.md)，此 ID 不得更改，因为此 ID 用于确定设备类型！

## 是否可以将 Shelly 适配器连接到现有的 MQTT 代理？
Shelly 适配器无法连接到您网络中现有的 MQTT 代理。Shelly 适配器会在内部启动其自身的 MQTT 代理，该代理在端口“`1882`”上启动，以避免与同一系统上的其他 MQTT 代理发生冲突。

## 如果我使用 Shelly 适配器，我还能使用云连接吗？
如果您使用的是第一代 (Gen1) 设备，则无法同时使用 MQTT 和 Shelly 云。在这种情况下，如果您想同时保持云连接，则需要使用 CoAP/CoIoT 进行 ioBroker 集成。

**第二代+（Gen2+）**设备可以通过 MQTT 连接，同时保持云连接。

## 哪些 Shelly 设备可以测量负功率/反馈能量？
请参阅 Shelly 论坛中的列表：https://support.shelly.cloud/de/support/solutions/articles/103000316350-welche-shelly-ger%C3%A4te-k%C3%B6nnen-negative-leistung-f%C3%BCr-zur%C3%BCckgespeiste-energie-messen