---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-coap.md"},"de/adapterref/iobroker.shelly/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.shelly/protocol-coap.md
title: ioBroker.shelly
hash: 4xO4g+gr0t8H5P2ozmQJSnbPEH6WKFK+hRvsABnNi8o=
---
![商标](../../../de/adapterref/iobroker.shelly/../../admin/shelly.png)

# IoBroker.shelly
## CoAP
默认使用 CoAP 协议。

如果您使用固件低于或等于 1.9.4 的 Shelly，则无需进一步配置。适配器将自动找到您的设备。

**如果您使用高于 1.9.4 的版本，则必须在 Shelly 设备上为 CoAP 配置 CoIoT 服务器。** 输入 ioBroker 服务器的 IP 地址作为 CoIoT 服务器 - 后跟端口 §§ YYYYY_0§§。例如，如果您的 ioBroker 可以通过地址 ```192.168.1.2``` 联系到，请输入 ```192.168.1.2:5683``` 并激活 CoIoT。

**重要提示：由于 CoAP 使用多播 UDP 数据包，因此您的 Shelly 设备必须与您的 ioBroker 服务器位于同一子网中。**

如果您在 Docker 容器中运行 ioBroker，则容器必须配置为网络模式§§YYYY_0§§ 或 §§YYYYY_1§§。如果 Docker 容器在 ```bridge``` 网络模式下运行，将找不到 Shelly 设备。

![iobroker_restrict_login](../../../de/adapterref/iobroker.shelly/./img/iobroker_general_coap.png)

CoAP 添加网络中的所有设备。如果要排除单个设备，可以在黑名单中配置它们。为此，请在表中输入序列号：

![iobroker_coap](../../../de/adapterref/iobroker.shelly/./img/iobroker_coap.png)

![shelly_coap](../../../de/adapterref/iobroker.shelly/../shelly_coap.png)

### 重要说明
#### Shelly 固件 1.8.0（或更新版本）
- 如果您使用 CoAP 协议，则必须从此版本开始使用适配器的 4.0.0（或更新）版本。
- 对于固件较旧的设备（Shelly 4 Pro 除外），必须使用适配器版本 3.3.6（或更旧）。适配器版本 4.0.0（或更高版本）与旧固件版本不兼容！

#### Shelly 固件 1.9.4（或更新版本）
- 从这个版本开始，如果使用 CoAP 协议，则必须在每个 Shelly 上存储 CoIoT 服务器。本文档中 CoAP 部分的更多详细信息。

＃＃＃ 故障排除
在某些情况下，Shelly 适配器可能无法找到所有处于 CoAP 模式的设备。然后尝试以下操作：

1. 停止您的 Shelly 适配器实例。 **无需卸载适配器！**
2. 打开终端窗口并在 ioBroker 服务器上运行以下命令：

```
cd /opt/iobroker/node_modules/iobroker.shelly/
node coaptest.js
```

或者，可以使用```tcpdump```：

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

现在您应该会看到来自 Shelly 设备的所有 CoAP 消息。如果您没有看到任何消息，则说明 UDP 或多播消息存在网络问题。

CoAP 消息如下所示：

``` 
UDP Server listening on 0.0.0.0:5683
2020-08-19T19:33:29.484Z - 192.168.20.233:5683 - P-B3citsml	SHBTN-1#AXXXXXXXXXX#2RC{"G":[[0,9103,0],[0,2102,"S"],[0,2103,1],[0,3115,0],[0,3112,0],[0,3111,100],[0,9102,["button"]]]}
2020-08-19T19:33:29.827Z - 192.168.20.233:5683 - P-C3citsml	SHBTN-1#AXXXXXXXXXX#2RC{"G":[[0,9103,0],[0,2102,"S"],[0,2103,1],[0,3115,0],[0,3112,0],[0,3111,100],[0,9102,["button"]]]}
2020-08-19T19:33:33.942Z - 192.168.20.233:5683 - P-D3citsml	SHBTN-1#AXXXXXXXXXX#2RC{"G":[[0,9103,0],[0,2102,"S"],[0,2103,1],[0,3115,0],[0,3112,0],[0,3111,100],[0,9102,["button"]]]}
```