---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-coap.md"},"de/adapterref/iobroker.shelly/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"},"de/adapterref/iobroker.shelly/faq.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/faq.md"},"de/adapterref/iobroker.shelly/debug.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/debug.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.shelly/protocol-coap.md
title: ioBroker.shelly
hash: caVSRUn5lV64VZTjAIYf8TiMzwy1C2bVXiaYDsVE7PU=
---
![标识](../../../de/adapterref/iobroker.shelly/../../admin/shelly.png)

# IoBroker.shelly
## CoAP
![iobroker_general_coap](../../../de/adapterref/iobroker.shelly/./img/iobroker_general_coap.png)

**如果使用高于 1.9.4 的固件版本，则必须在 Shelly 设备上配置 CoIoT 服务器（单播）。**

输入 ioBroker 服务器的 IP 地址作为 CoIoT 服务器 - 后跟端口```5683```。例如，如果您的 ioBroker 可以通过地址 ```192.168.1.2``` 联系到，请输入 ```192.168.1.2:5683``` 并激活 CoIoT。

![shelly_coap](../../../de/adapterref/iobroker.shelly/./img/shelly_coap.png)

CoAP 添加网络中的所有设备。如果要排除个别设备，可以在黑名单中进行配置。为此，请在表中输入序列号：

![iobroker_coap](../../../de/adapterref/iobroker.shelly/./img/iobroker_coap.png)

### 旧固件
如果您使用的 Shelly 固件版本低于或等于 1.9.4，则无需进一步配置。适配器将自动找到您的设备。

**重要提示：由于 CoAP 使用多播 UDP 数据包，因此 Shelly 设备必须与 ioBroker 服务器位于同一子网中。**

### 重要说明
#### 码头工人
如果您在 Docker 容器中运行 ioBroker，则容器必须配置为网络模式§§YYYY_0§§ 或 §§YYYYY_1§§。如果 Docker 容器在 ```bridge``` 网络模式下运行，将找不到 Shelly 设备。

#### Shelly 固件 1.8.0（或更新版本）
- 如果您使用 CoAP 协议，则从该版本开始，适配器必须是 4.0.0 版（或更高版本）。
- 对于固件较旧的设备（Shelly 4 Pro 除外），必须使用适配器版本 3.3.6（或更早）。适配器版本 4.0.0（或更高版本）与旧固件版本不兼容！

#### Shelly 固件 1.9.4（或更新版本）
- 从这个版本开始，如果使用 CoAP 协议（单播），则必须在每个 Shelly 上存储 CoIoT 服务器。