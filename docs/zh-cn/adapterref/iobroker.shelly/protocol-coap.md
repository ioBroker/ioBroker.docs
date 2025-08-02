---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-coap.md"},"de/adapterref/iobroker.shelly/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"},"de/adapterref/iobroker.shelly/faq.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/faq.md"},"de/adapterref/iobroker.shelly/debug.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/debug.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.shelly/protocol-coap.md
title: ioBroker.shelly
hash: 3XDteAEV6pM9eOz5aWZOezb3pF10fD1EEYiHyntKT+w=
---
![标识](../../../de/admin/shelly.png)

# IoBroker.shelly
这是德语文档 - [🇺🇸 德语版](../en/protocol-coap.md)

## CoAP（CoIoT）
**CoAP/CoIoT 仅受 Gen1 设备支持 - Plus 和 Pro 设备 (Gen2) 不支持此协议！**

![iobroker_general_coap](../../../de/adapterref/iobroker.shelly/img/iobroker_general_coap.png)

**如果使用高于 1.9.4 的固件版本，则必须在 Shelly 设备上配置 CoIoT 服务器（单播）。**

输入 ioBroker 服务器的 IP 地址作为 CoIoT 服务器 - 后跟端口`5683`。例如，如果可以通过地址 `192.168.1.2` 联系您的 ioBroker，请在其中输入 `192.168.1.2:5683` 并激活 CoIoT。

![雪莉_科普](../../../de/adapterref/iobroker.shelly/img/shelly_coap.png)

**此更改后必须重新启动 Shelly 设备！**

CoAP/CoIoT 添加网络上的所有设备。如果您想排除个别设备，可以将其配置到黑名单中。为此，请将序列号插入表中：

![iobroker_coap](../../../de/adapterref/iobroker.shelly/img/iobroker_coap.png)

### 较旧的固件
如果您使用的Shelly固件版本低于或等于1.9.4，则无需进一步配置。适配器将自动找到您的设备。

**重要提示：由于 CoAP/CoIoT 使用多播 UDP 数据包，因此 Shelly 设备必须与 ioBroker 服务器位于同一子网中。**

### 重要说明
#### 码头工人
如果您在 Docker 容器中运行 ioBroker，则该容器必须配置为网络模式 `host` 或 `macvlan`。如果 Docker 容器在网络模式`bridge`下运行，则不会找到 Shelly 设备。

#### Shelly 固件 1.8.0（或更高版本）
- 如果您使用 CoAP/CoIoT 协议，则必须从该版本开始使用适配器版本 4.0.0（或更高版本）。
- 对于具有较旧固件的设备（Shelly 4 Pro 除外），必须使用版本 3.3.6（或更早版本）的适配器。适配器版本 4.0.0（或更高版本）与旧固件版本不兼容！

#### Shelly 固件 1.9.4（或更高版本）
- 从该版本开始，如果使用 CoAP/CoIoT 协议（单播），则必须在每个 Shelly 上存储 CoAP/CoIoT 服务器。