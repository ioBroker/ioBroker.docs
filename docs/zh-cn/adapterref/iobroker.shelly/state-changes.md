---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/protocol-coap.md"},"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.shelly/state-changes.md
title: ioBroker.shelly
hash: /CtJFOi7c6OZS8TDpUPQzlWXdoqcwtTIhw+TzVPRW/Q=
---
![标识](../../../de/adapterref/iobroker.shelly/../../admin/shelly.png)

# IoBroker.shelly
## 状态变化
默认情况下，状态仅在值更改时更新。在这种情况下，*即使没有值更改也更新对象*被禁用。

例子：

* shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'S'（最后更改时间：02/01/2020 10:20:00）
* shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'S'（最后更改时间：02/01/2020 **10:20:00**） - ioBroker 中的状态未更新
* shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'L'（最后更改时间：02/01/2020 10:22:00）

如果您激活*即使没有值更改也更新对象*，即使没有值更改，所有状态也会不断更新。所以只有最后一次更新的时间会改变。

例子：

* shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'S'（最后更改时间：02/01/2020 10:20:00）
* shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'S'（最后更改时间：02/01/2020 **10:21:00**） - 虽然没有更新，但时间已更新价值变化
* shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'L'（最后更改时间：02/01/2020 10:22:00）