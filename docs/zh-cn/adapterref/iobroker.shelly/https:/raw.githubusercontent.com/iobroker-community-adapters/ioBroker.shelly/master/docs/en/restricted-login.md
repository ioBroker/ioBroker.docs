---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/protocol-coap.md"},"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/restricted-login.md
title: ioBroker.shelly
hash: EGaADnnibnxatRZByNCswqiZD/5YEwI6XQehKJ3UB/4=
---
![标识](../../../../../../../../../../de/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/../../admin/shelly.png)

# IoBroker.shelly
##限制登录
要使用受限登录保护您的 Shelly 设备，请在 ioBroker 配置中的*常规设置*选项卡上选择用户名和密码。

![iobroker_general_restrict_login](../../../../../../../../../../de/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/./img/iobroker_general_restrict_login.png)

激活所有 Shelly 设备上的登录限制。

**第 2 代设备不提供用户名选项。如果您使用 Gen 1 和 Gen 2 设备，请在所有设备上使用相同的密码。**

### 第 1 代
1. 在您的网络浏览器中打开 Shelly 网络配置（而不是在 Shelly 应用程序中！）
2.转到```Internet和安全设置->限制登录```
3.勾选复选框并输入之前配置的用户名和密码
4. 保存配置 - Shelly 会自动重启
5. 确保在所有 Shelly 设备上配置相同的用户名和密码

![贝壳基因1](../../../../../../../../../../de/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/../shelly_restrict_login-gen1.png)

### 第 2 代
1. 在您的网络浏览器中打开 Shelly 网络配置（而不是在 Shelly 应用程序中！）
2. 转到```设备-> 身份验证```
3.启用认证功能并输入之前配置的密码
4.保存配置

![贝壳基因2](../../../../../../../../../../de/adapterref/iobroker.shelly/https:/raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/../shelly_restrict_login-gen2.png)