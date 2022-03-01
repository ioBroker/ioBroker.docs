---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-coap.md"},"de/adapterref/iobroker.shelly/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.shelly/restricted-login.md
title: ioBroker.shelly
hash: KSwWPyMo0b2e/iCwIZGpuh/Be6fKXaP6aO2Ypui9tbI=
---
![商标](../../../de/adapterref/iobroker.shelly/../../admin/shelly.png)

# IoBroker.shelly
## 受保护的登录
为了保护 Shelly 设备免受未经授权的访问，请在 ioBroker 配置的 *General settings* 选项卡中设置任何用户名和密码。

![iobroker_general_restrict_login](../../../de/adapterref/iobroker.shelly/./img/iobroker_general_restrict_login.png)

在所有 Shelly 设备上激活受保护的访问权限。

**第 2 代不提供用户名选项。如果您使用的是 Gen 1 和 Gen 2 设备，请在所有设备上配置相同的密码。**

### 第 1 代
1. 在浏览器中打开 Shelly Web 配置（不是在 Shelly 应用程序中！）
2.转到```Internet和安全设置->限制登录```
3.勾选安全访问复选框，输入刚刚配置的访问数据
4. 保存配置 - Shelly 会自动重启
5. 确保在所有 Shelly 设备上配置了相同的凭据

![贝壳基因1](../../../de/adapterref/iobroker.shelly/./img/shelly_restrict_login-gen1.png)

### 第 2 代
1. 在浏览器中打开 Shelly Web 配置（不是在 Shelly 应用程序中！）
2. 转到```设备-> 身份验证```
3.开启密码功能，输入刚刚配置的密码
4.保存配置

![贝壳基因2](../../../de/adapterref/iobroker.shelly/./img/shelly_restrict_login-gen2.png)