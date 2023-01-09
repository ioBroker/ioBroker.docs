---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-coap.md"},"de/adapterref/iobroker.shelly/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"},"de/adapterref/iobroker.shelly/faq.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/faq.md"},"de/adapterref/iobroker.shelly/debug.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/debug.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.shelly/restricted-login.md
title: ioBroker.shelly
hash: wCEc8Ea6pa85lDkLIR96yI6FlyO+GnReChM9ldDMTZM=
---
![商标](../../../de/admin/shelly.png)

# IoBroker.shelly
## 受保护的登录
为保护 Shelly 设备免受未经授权的访问，请在 ioBroker 配置的 *General settings* 选项卡中设置任何用户名和密码。

![iobroker_general_restrict_login](../../../de/adapterref/iobroker.shelly/img/iobroker_general_restrict_login.png)

然后在所有 Shelly 设备上激活受保护的访问权限。

**重要的：**

- 第 2 代设备不提供用户名选项 - 用户名可以自由选择，但仅与第 1 代设备相关
- 在所有设备上配置在 Shelly 实例中设置的相同密码
    - 第 1 代：从实例配置用户名和密码
    - 第 2 代：仅配置实例设置中的密码

### 警告
如果在ioBroker中配置了设备密码，如果某些Shelly设备未受保护，适配器将在日志中写入警告！

要停止接收警告，要么

- 可以从适配器的配置中删除密码（= 不需要密码）或
- 在所有 Shelly 设备上激活受保护的访问

### 第 2 代设备（Plus 和 Pro）
1. 在浏览器中打开 Shelly Web 配置（不是在 Shelly 应用程序中！）
2.转到```设置->身份验证```
3.激活密码功能并输入您刚刚配置的密码
4.保存配置

![雪莉gen2](../../../de/adapterref/iobroker.shelly/img/shelly_restrict_login-gen2.png)

较旧的固件版本 (`< 0.12`) 具有不同的用户界面：

1. 在浏览器中打开 Shelly Web 配置（不是在 Shelly 应用程序中！）
2.转到```设备->身份验证```
3.激活密码功能并输入您刚刚配置的密码
4.保存配置

![雪莉gen2老](../../../de/adapterref/iobroker.shelly/img/shelly_restrict_login-gen2-old.png)

### 第一代设备
1. 在浏览器中打开 Shelly Web 配置（不是在 Shelly 应用程序中！）
2.转到```互联网和安全设置->限制登录```
3. 勾选安全访问框并输入您刚刚配置的访问数据
4.保存配置-Shelly会自动重启
5. 确保在所有 Shelly 设备上配置相同的凭据

![雪莉gen1](../../../de/adapterref/iobroker.shelly/img/shelly_restrict_login-gen1.png)