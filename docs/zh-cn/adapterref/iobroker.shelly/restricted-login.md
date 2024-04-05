---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-coap.md"},"de/adapterref/iobroker.shelly/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"},"de/adapterref/iobroker.shelly/faq.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/faq.md"},"de/adapterref/iobroker.shelly/debug.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/debug.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.shelly/restricted-login.md
title: ioBroker.shelly
hash: z4prGm23mwxbuAqkkSpvIWqMry4F0JXvb33oN/DV+6g=
---
![标识](../../../de/admin/shelly.png)

# IoBroker.shelly
这是德语文档 - [🇺🇸英文版](../en/restricted-login.md)

## 受保护的登录
为了保护 Shelly 设备免遭未经授权的访问，请在 ioBroker 配置的“常规设置”选项卡中设置任何用户名和密码。

![iobroker_general_restrict_login](../../../de/adapterref/iobroker.shelly/img/iobroker_general_restrict_login.png)

然后在所有 Shelly 设备上启用受保护的访问。

**重要的：**

- 第 2 代以上设备不提供用户名选项 - 用户名可以自由选择，但仅与第 1 代设备相关
- 在Shelly实例中设置的所有设备上配置相同的密码
    - 第一代：从实例配置用户名和密码
    - 第 2+ 代：仅从实例设置中配置密码

### 警告
如果在 ioBroker 中配置了设备密码，如果某些 Shelly 设备未受保护，适配器将向日志写入警告！

要停止接收警告，您可以

- 可以在适配器的配置中删除密码（= 无需密码）或
- 可以在所有 Shelly 设备上激活受保护的访问

### 第 2 代以上设备（Plus 和 Pro）
1. 在浏览器中打开 Shelly Web 配置（不是在 Shelly 应用程序中！）
2. 转到“设置 -> 身份验证”
3.激活密码功能，输入刚才配置的密码
4.保存配置

![雪莉第二代](../../../de/adapterref/iobroker.shelly/img/shelly_restrict_login-gen2.png)

较旧的固件版本 (`< 0.12`) 具有不同的用户界面：

1. 在浏览器中打开 Shelly Web 配置（不是在 Shelly 应用程序中！）
2. 转到“设备 -> 身份验证”
3.激活密码功能，输入刚才配置的密码
4.保存配置

![雪莉 gen2 老](../../../de/adapterref/iobroker.shelly/img/shelly_restrict_login-gen2-old.png)

### 第一代设备
1. 在浏览器中打开 Shelly Web 配置（不是在 Shelly 应用程序中！）
2. 转到“互联网和安全设置 -> 限制登录”
3. 选中安全访问框并输入您刚刚配置的访问数据
4.保存配置-Shelly会自动重启
5. 确保所有Shelly设备上配置相同的访问数据

![雪莉第一代](../../../de/adapterref/iobroker.shelly/img/shelly_restrict_login-gen1.png)