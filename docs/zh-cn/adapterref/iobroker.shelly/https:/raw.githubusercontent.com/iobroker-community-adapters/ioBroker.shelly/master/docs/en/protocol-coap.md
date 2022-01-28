---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/protocol-coap.md"},"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/protocol-coap.md
title: ioBroker.shelly
hash: ETZyDH5CptFxPEp95rUvpyc32Hz1GOYuHBy4KAxZ5S0=
---
![标识](../../../../../../../../../../de/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/../../admin/shelly.png)

# IoBroker.shelly
## CoAP
默认情况下，使用 CoAP 协议。

如果您使用固件版本低于 1.9.4 的 Shelly，则无需进行任何配置。 ioBroker 会自行找到您的 Shelly 设备。

**如果您使用高于 1.9.4 的固件版本，您必须在 Shelly 设备上为 CoAP 输入 CoIoT 服务器。** 输入 ioBroker 服务器的 IP 地址，后跟端口 ```5683``` 作为 CoIoT 服务器。例如，如果 ioBroker 在地址 ```192.168.1.2``` 上运行，您必须输入 ```192.168.1.2:5683``` 并激活 CoIoT。

**重要提示：由于 CoAP 使用多播 UDP 包，因此 Shelly 设备必须与您的 ioBroker 服务器位于同一子网中。**

如果您在 docker 容器中使用 ioBroker，则容器必须以网络模式运行 ```host``` 或 ```macvlan```。如果 docker 容器在 ```bridge``` 模式下运行，将找不到您的 Shelly 设备。

![iobroker_restrict_login](../../../../../../../../../../de/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/./img/iobroker_general_coap.png)

CoAP 将添加您网络中的所有设备。如果要排除某些 Shelly 设备，可以将它们加入黑名单。只需在黑名单表中输入序列号即可：

![iobroker_coap](../../../../../../../../../../de/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/./img/iobroker_coap.png)

![shelly_coap](../../../../../../../../../../de/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/../shelly_coap.png)

＃＃＃ 重要笔记
#### Shelly 固件 1.8.0（或更高版本）
- 如果使用 CoAP 协议，则必须使用适配器版本 4.0.0 或更高版本。
- 如果您使用固件低于 1.8.0 的设备（Shelly 4 Pro 除外），您必须使用 3.3.6 或更低版本的适配器。在这种情况下，适配器版本 4.0.0（或更高版本）将不起作用！

#### Shelly 固件 1.9.4（或更高版本）
- 您必须为 CoAP 输入 CoIoT 服务器。有关详细信息，请参阅本文档中的 CoAp 部分。

＃＃＃ 故障排除
在某些情况下，在 CoAP 模式下 Shelly 适配器将无法找到 Shelly 设备。请尝试以下方法：

1. 禁用 ioBroker Shelly 适配器实例。 **不要卸载 Shelly 适配器！** 但是禁用 Shelly 实例很重要。
2. 打开终端窗口并在 ioBroker 服务器上运行以下命令：

```
cd /opt/iobroker/node_modules/iobroker.shelly/
node coaptest.js
```

您可以使用 §§YYYYY_0§§ 来嗅探 CoAP 消息：

```
# Install tcpdump if it is not installed
sudo apt-get update
sudo apt-get install tcpdump

# tcpdump with IP address of Shelly device on network device eth1
sudo tcpdump -i eth1 src <IP-OF-SHELLY> and port 5683 -A

# tcpdump with IP address of Shelly device
sudo tcpdump src <IP-OF-SHELLY> and port 5683 -A

# tcpdump of all Shelly devices on network device eth1
sudo tcpdump  -i eth1 port 5683 -A

 # tcpdump of all Shelly devices
sudo tcpdump port 5683 -A
```

现在您将看到来自 Shelly 的所有 CoAP 消息。如果您没有看到任何消息，则说明 UDP 或多播消息存在网络问题。

CoAP 消息如下所示：

``` 
UDP Server listening on 0.0.0.0:5683
2020-08-19T19:33:29.484Z - 192.168.20.233:5683 - P-B3citsml	SHBTN-1#AXXXXXXXXXX#2RC{"G":[[0,9103,0],[0,2102,"S"],[0,2103,1],[0,3115,0],[0,3112,0],[0,3111,100],[0,9102,["button"]]]}
2020-08-19T19:33:29.827Z - 192.168.20.233:5683 - P-C3citsml	SHBTN-1#AXXXXXXXXXX#2RC{"G":[[0,9103,0],[0,2102,"S"],[0,2103,1],[0,3115,0],[0,3112,0],[0,3111,100],[0,9102,["button"]]]}
2020-08-19T19:33:33.942Z - 192.168.20.233:5683 - P-D3citsml	SHBTN-1#AXXXXXXXXXX#2RC{"G":[[0,9103,0],[0,2102,"S"],[0,2103,1],[0,3115,0],[0,3112,0],[0,3111,100],[0,9102,["button"]]]}
```