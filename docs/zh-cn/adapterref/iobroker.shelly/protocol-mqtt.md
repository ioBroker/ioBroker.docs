---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-coap.md"},"de/adapterref/iobroker.shelly/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"},"de/adapterref/iobroker.shelly/faq.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/faq.md"},"de/adapterref/iobroker.shelly/debug.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/debug.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.shelly/protocol-mqtt.md
title: ioBroker.shelly
hash: qxNm4ySumCUo+BXI5OLJubJf3/4YwmXzmm3JLoNQDp4=
---
![标识](../../../de/admin/shelly.png)

# IoBroker.shelly
##MQTT
![iobroker_general_mqtt](../../../de/adapterref/iobroker.shelly/img/iobroker_general_mqtt.png)

### 重要说明
- 无法将 Shelly 适配器连接到网络中现有的 MQTT 代理
- Shelly 适配器启动自己的 MQTT 代理，该代理在端口 ``1882`` 上启动，以避免与同一系统上的其他 MQTT 代理发生冲突（MQTT 的默认端口为 1883）
- 无法将 MQTT 客户端（如 MQTT Explorer）连接到内部 MQTT 代理
- MQTT代理的标准端口可以在适配器的配置中进行调整
- **不需要了解 MQTT 协议** - 所有通信都在内部处理

＃＃＃ 配置
1.在ioBroker中打开Shelly适配器配置
2. 在*常规设置*中选择```MQTT（和HTTP）```作为*协议*
3. 打开 **MQTT 设置** 选项卡
4. 选择用户名和安全密码（您必须将此信息存储在所有 Shelly 设备上）

![iobroker_mqtt](../../../de/adapterref/iobroker.shelly/img/iobroker_mqtt.png)

在您的 Shelly 设备上激活 MQTT。

### 第一代设备
1. 在浏览器中打开 Shelly Web 配置（不是在 Shelly 应用程序中！）
2.转到```互联网和安全设置->高级-开发人员设置```
3. 激活 MQTT 并输入您刚刚配置的用户数据和 ioBroker 安装的 IP 地址 - 然后是配置的端口（例如 ```192.168.1.2:1882```）
4.保存配置-Shelly会自动重启

![shelly_mqtt gen1](../../../de/adapterref/iobroker.shelly/img/shelly_mqtt-gen1.png)

### 第 2 代设备（Plus 和 Pro）
1. 在浏览器中打开 Shelly Web 配置（不是在 Shelly 应用程序中！）
2.转到```网络-> Mqtt```
3. 激活 MQTT 并输入您刚刚配置的用户数据和 ioBroker 安装的 IP 地址 - 然后是配置的端口（例如 ```192.168.1.2:1882```）
4.保存配置-Shelly会自动重启

- **不要更改此配置中的“客户端 ID”**
- **对于第 2 代设备，必须启用所有 RPC 选项（见屏幕截图）！**
- 不得激活 SSL

![shelly_mqtt gen2](../../../de/adapterref/iobroker.shelly/img/shelly_mqtt-gen2.png)

![shelly_mqtt gen2](../../../de/adapterref/iobroker.shelly/img/shelly_mqtt-gen2-old.png)

### 服务质量 (QoS)
TODO（见 en）