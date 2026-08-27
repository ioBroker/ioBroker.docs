---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/ble-devices.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/ble-devices.md"},"de/adapterref/iobroker.shelly/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-coap.md"},"de/adapterref/iobroker.shelly/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"},"de/adapterref/iobroker.shelly/faq.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/faq.md"},"de/adapterref/iobroker.shelly/debug.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/debug.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.shelly/restricted-login.md
title: ioBroker.shelly
hash: KJs5Qz34Ommj2ehpimk+/hQAXBwFDWhdig5al0gPRwU=
---
![标识](../../../de/admin/shelly.png)

# IoBroker.shelly
这是德语文档 - [🇺🇸 英文版](../en/restricted-login.md)

## 受保护的登录
为保护 Shelly 设备免受未经授权的访问，必须在 ioBroker 配置的 *常规设置* 选项卡中设置用户名和密码。

![iobroker_general_restrict_login](../../../de/adapterref/iobroker.shelly/img/iobroker_general_restrict_login.png)

然后，必须在所有 Shelly 设备上启用受保护的访问。

**重要的：**

- 第二代及以后的设备不提供用户名选项 - 用户名可以自由选择，但仅与第一代设备相关。
- 所有设备必须配置相同的密码。
- 第一代：必须配置实例中的用户名和密码
- 第二代及以上：只需配置实例设置中的密码。

### 警告
如果在 ioBroker 中配置了设备密码，则当某些 Shelly 设备未受保护时，适配器会将警告写入日志！

要停止接收警告，您可以选择以下两种方式之一：

- 从适配器的配置中移除密码（= 无需密码）或
- 所有 Shelly 设备都必须启用受保护的访问。

### 第二代及以上设备（Plus 和 Pro）
1. 在浏览器中打开 Shelly 网页配置页面（不要在 Shelly 应用中打开！）
2. 前往“设置 -> 身份验证”
3. 启用密码功能，并输入您刚刚设置的密码。
4. 保存配置

![Shelly Gen2](../../../de/adapterref/iobroker.shelly/img/shelly_restrict_login-gen2.png)

### 第一代设备
1. 在浏览器中打开 Shelly 网页配置页面（不要在 Shelly 应用中打开！）
2. 转到“互联网和安全设置 -> 限制登录”
3. 勾选安全访问复选框，并输入您刚刚配置的访问数据。
4. 保存配置 - Shelly 将自动重启。
5. 确保所有 Shelly 设备上配置相同的访问数据。

![雪莉第一代](../../../de/adapterref/iobroker.shelly/img/shelly_restrict_login-gen1.png)