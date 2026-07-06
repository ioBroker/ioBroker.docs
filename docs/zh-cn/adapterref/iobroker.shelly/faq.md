---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/ble-devices.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/ble-devices.md"},"de/adapterref/iobroker.shelly/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-coap.md"},"de/adapterref/iobroker.shelly/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"},"de/adapterref/iobroker.shelly/faq.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/faq.md"},"de/adapterref/iobroker.shelly/debug.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/debug.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.shelly/faq.md
title: ioBroker.shelly
hash: JnJPee9cDlktLgrVB+3UuZNBND5ByJ/AxeQ6j5XT9/A=
---
![标识](../../../de/admin/shelly.png)

# IoBroker.shelly
这是德语文档 - [🇺🇸 英文版](../en/faq.md)

## 是否也可以通过 Shelly 应用程序进行配置？
所有文档均基于设备的网页界面设置。应用程序中可能缺少某些选项。因此，不建议使用此方法！

CoAP（CoIoT）和MQTT可以同时使用吗？
但是，可以创建 Shelly 适配器的第二个实例，然后将其配置为 MQTT（另一个配置为 CoAP/CoIoT）。

我不了解MQTT的工作原理；它使用起来复杂吗？
不，Shelly 设备只需按照 [这里](protocol-mqtt.md) 中的说明进行配置即可。Shelly 适配器会在内部处理其余部分。

我可以在CoAP（CoIoT）和MQTT之间切换吗？
Shelly实例的配置可以随时更改。所有对象和状态都将保留。只有与设备的通信方式会发生变化。

我已经配置了 CoAP（CoIoT），但是 Shelly 设备没有显示出来。
很可能已配置多播（`mcast`）。但这种方式并不稳定，因此应该配置单播。具体配置方法请参见[这里](protocol-coap.md)。

*CoAP/CoIoT 仅支持第一代 (Gen1) 设备！*

我的设备无法被Shelly适配器识别。
要么该设备尚未列入适配器支持的设备列表中，要么 Shelly 设备上的 MQTT 设置中的客户端 ID 已被更改。根据 [文档](protocol-mqtt.md) 的规定，此 ID 不得更改，因为它用于识别设备类型！

## 是否可以将 Shelly 适配器连接到现有的 MQTT 代理？
Shelly适配器无法连接到网络上现有的MQTT代理。Shelly适配器会启动自己的内部MQTT代理，该代理运行在端口``1882``上，以避免与同一系统上的其他MQTT代理发生冲突。

使用 Shelly 适配器时，还能使用云连接吗？
对于第一代 (Gen1) 设备，无法同时使用 MQTT 和 Shelly 云服务。在这种情况下，如果要同时保持云连接，则必须使用 CoAP/CoIoT 进行 ioBroker 集成。

**第二代及以上（Gen2+）**设备可以通过MQTT连接，同时保持与云的连接。

## Shelly 的哪些设备可以测量负功率/反馈能量？
请参阅 Shelly 论坛中的列表：https://support.shelly.cloud/de/support/solutions/articles/103000316350-welche-shelly-ger%C3%A4te-k%C3%B6nnen-negative-leistung-f%C3%BCr-zur%C3%BCckgespeiste-energie-messen