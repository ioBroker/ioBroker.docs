---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/ble-devices.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/ble-devices.md"},"de/adapterref/iobroker.shelly/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-coap.md"},"de/adapterref/iobroker.shelly/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"},"de/adapterref/iobroker.shelly/faq.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/faq.md"},"de/adapterref/iobroker.shelly/debug.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/debug.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.shelly/protocol-coap.md
title: ioBroker.shelly
hash: iM2D2Z+N9DE47HtPBt8tjmTYL6Ku1UZN5M5BsL4VzfE=
---
![标识](../../../de/admin/shelly.png)

# IoBroker.shelly
这是德语文档 - [🇺🇸 英文版](../en/protocol-coap.md)

## CoAP（CoIoT）
**CoAP/CoIoT 仅支持第一代设备 - Plus 和 Pro 设备（第二代）不支持此协议！**

![iobroker_general_coap](../../../de/adapterref/iobroker.shelly/img/iobroker_general_coap.png)

**如果使用的固件版本高于 1.9.4，则必须在 Shelly 设备上配置 CoIoT 服务器（单播）。**

必须将 ioBroker 服务器的 IP 地址输入为 CoIoT 服务器，后跟端口 `5683`。例如，如果 ioBroker 可通过地址 `192.168.1.2` 访问，则必须在此处输入 `192.168.1.2:5683`，并且必须激活 CoIoT。

![shelly_coap](../../../de/adapterref/iobroker.shelly/img/shelly_coap.png)

**更改此设置后，必须重启 Shelly 设备！**

CoAP/CoIoT 会将所有设备添加到网络中。如果需要排除个别设备，可以将其配置到黑名单中。为此，必须将这些设备的序列号输入到黑名单表中。

![iobroker_coap](../../../de/adapterref/iobroker.shelly/img/iobroker_coap.png)

### 旧版固件
如果使用固件版本为 1.9.4 或更低的 Shelly 设备，则无需进行其他配置。适配器将自动检测到这些设备。

重要提示：由于 CoAP/CoIoT 使用组播 UDP 数据包，Shelly 设备必须与 ioBroker 服务器位于同一子网。

### 重要说明
#### Docker
如果 ioBroker 运行在 Docker 容器中，则该容器必须配置为网络模式 `host` 或 `macvlan`。如果 Docker 容器运行在网络模式 `bridge` 下，则不会检测到 Shelly 设备。

#### Shelly 固件 1.8.0（或更高版本）
- 使用 CoAP/CoIoT 协议时，从本版本开始，适配器版本必须为 4.0.0（或更高版本）。
对于固件版本较旧的设备（Shelly 4 Pro 除外），必须使用适配器版本 3.3.6（或更早版本）。适配器版本 4.0.0（或更高版本）与较旧的固件版本不兼容！

#### Shelly 固件 1.9.4（或更高版本）
从本版本开始，如果使用 CoAP/CoIoT 协议（单播），则必须在每个 Shelly 设备上配置 CoAP/CoIoT 服务器。