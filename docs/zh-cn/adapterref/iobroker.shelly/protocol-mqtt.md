---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-coap.md"},"de/adapterref/iobroker.shelly/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.shelly/protocol-mqtt.md
title: ioBroker.shelly
hash: WzLCNgnYqTmiO09+RSvlZtbuT0oaNfuPnARm77R54ac=
---
![商标](../../../de/adapterref/iobroker.shelly/../../admin/shelly.png)

# IoBroker.shelly
##MQTT
### 重要说明
- 无法将 Shelly 适配器连接到网络中现有的 MQTT 代理
- Shelly 适配器启动自己的 MQTT 代理，该代理在端口 ``1882`` 上启动，以避免与同一系统上的其他 MQTT 代理发生冲突
- MQTT代理的标准端口可以在适配器的配置中进行调整
- 不需要任何 MQTT 协议知识 - 所有通信都在内部处理

＃＃＃ 配置
1.在ioBroker中打开Shelly适配器配置
2.在*General Settings*中选择```MQTT and HTTP```作为*Protocol*
3. 打开 **MQTT 设置** 选项卡
4. 选择用户名和安全密码（您必须将此信息存储在 Shelly 设备上）

![iobroker_general](../../../de/adapterref/iobroker.shelly/./img/iobroker_general_mqtt.png)

![iobroker_mqtt](../../../de/adapterref/iobroker.shelly/./img/iobroker_mqtt.png)

在 Shelly 设备上激活 MQTT：

1. 在浏览器中打开 Shelly Web 配置（不是在 Shelly 应用程序中！）
2.转到```Internet和安全设置->高级-开发人员设置```
3. 激活 MQTT 并输入您刚刚配置的用户数据和您的 ioBroker 安装的 IP 地址 - 后跟端口 1882（例如 ``192.168.20.242:1882``）
4. 保存配置 - Shelly 会自动重启

- 对于 Gen1 设备：不要更改 ```自定义 MQTT 前缀```（如果更改此值，适配器将不起作用）

![贝壳第一代](../../../de/adapterref/iobroker.shelly/../shelly_mqtt-gen1.png)

![贝壳 gen2](../../../de/adapterref/iobroker.shelly/../shelly_mqtt-gen2.png)

**对于第 2 代设备，必须启用所有 RPC 选项（见屏幕截图）！**