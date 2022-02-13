---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/protocol-coap.md"},"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/protocol-mqtt.md
title: ioBroker.shelly
hash: Y65Cchw+2llE+cACkPJipIMcUoFkdZb2VxMboLED7gM=
---
![标识](../../../../../../../../../../de/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/../../admin/shelly.png)

# IoBroker.shelly
##MQTT
1.在ioBroker中打开Shelly Adapter配置
2.在*general settings*中选择```MQTT and HTTP```作为*protocol*
3.打开**mqtt设置**选项卡
4. 选择一个安全的用户名和密码（您必须在 Shelly 设备上配置此信息）

![iobroker_general](../../../../../../../../../../de/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/./img/iobroker_general_mqtt.png)

![iobroker_mqtt](../../../../../../../../../../de/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/./img/iobroker_mqtt.png)

在所有 Shelly 设备上激活 MQTT：

1. 在您的网络浏览器中打开 Shelly 网络配置（而不是在 Shelly 应用程序中！）
2.转到```Internet和安全设置->高级-开发人员设置```
3. 激活 MQTT 并输入之前配置的用户名、密码和 ioBroker 安装的 ip 地址 - 后跟 1882 端口（例如 ``192.168.20.242:1882``）
4. 保存配置 - Shelly 会自动重启

- 对于 Gen1 设备：不要更改 ```自定义 MQTT 前缀```（如果更改前缀，适配器将不起作用）

![贝壳第一代](../../../../../../../../../../de/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/../shelly_mqtt-gen1.png)

![贝壳 gen2](../../../../../../../../../../de/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/../shelly_mqtt-gen2.png)