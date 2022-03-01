---
chapters: {"pages":{"de/adapterref/iobroker.lametric/README.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/README.md"},"de/adapterref/iobroker.lametric/apps.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/apps.md"},"de/adapterref/iobroker.lametric/my-data-diy.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/my-data-diy.md"},"de/adapterref/iobroker.lametric/notifications.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/notifications.md"},"de/adapterref/iobroker.lametric/blockly.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/blockly.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.lametric/my-data-diy.md
title: ioBroker.lametric
hash: 2LhFVKaEfainwUdOOpewFKtoccW132P+qAQB5aXTLUU=
---
![商标](../../../de/adapterref/iobroker.lametric/../../admin/lametric.png)

# IoBroker.lametric
##我的数据（DIY）*（版本> 1.1.0）*
*LaMetric* 提供（通过集成的应用程序商店）一个额外的应用程序来显示您自己的信息。这个应用程序被称为[我的数据DIY](https://apps.lametric.com/apps/my_data__diy_/8942)。此适配器以所需格式创建数据点。
您可以使用简单 API 适配器将数据传输到 LaMetric Time。

```ioBroker LaMetric Adapter -> State with Frame information <- Simple API Adapter <- My Data DIY App <- LaMetric```

### 配置（带身份验证）
1.安装【Simple API ioBroker Adapter】(https://github.com/ioBroker/ioBroker.simple-api)
2. 使用名称“lametric”和自定义密码创建一个新的 ioBroker 用户（例如“HhX7dZl3Fe”）
3. 将新的“lametric”用户添加到“users”组
4. 通过应用商店在您的 *LaMetric Time* 上安装 *My Data DIY* 应用
5. 打开 *My Data (DIY)* 应用程序的设置并配置 Simple API Adapter 的 URL（见下文）
6. 进入适配器设置并使用您自己的信息添加新框架（参见下一节）

```
http://172.16.0.219:8087/getPlainValue/lametric.0.mydatadiy.obj/?json&user=lametric&pass=HhX7dZl3Fe
```

**重要提示：使用 SimpleAPI Adapter json 标志（自版本 2.6.2 起可用）**

**确保网址中的IP、端口、用户名和密码正确！**

### 配置（无需认证）
1.安装【Simple API ioBroker Adapter】(https://github.com/ioBroker/ioBroker.simple-api)
2. 通过应用商店在您的 *LaMetric Time* 上安装 *My Data DIY* 应用
3. 打开 *My Data (DIY)* 应用程序的设置并配置 Simple API Adapter 的 URL（见下文）
4. 进入适配器设置并使用您自己的信息添加新框架（请参阅下一节）

```
http://172.16.0.219:8087/getPlainValue/lametric.0.mydatadiy.obj/?json
```

**确保URL中的IP和端口正确！**

### 框架配置*（版本> 1.1.0）*
- 使用加号按钮添加任意数量的帧
- 图标：从[官方网站]（https://developer.lametric.com/icons）中选择一个图标并将ID粘贴到字段中。 **重要提示：使用 i（用于静态符号）或 a（用于动画符号）作为 ID 的前缀（例如：`i3389`）**
- 文本：键入要显示的任何文本。您可以通过将数据点的 ID 括在大括号中来从数据点中检索信息。然后在此时使用数据点的当前值。 （例如：`{youtube.0.channels.HomeAutomationCom.statistics.subscriberCount} 订阅者`）

一些框架的示例配置：

![示例框架配置](../../../de/adapterref/iobroker.lametric/./img/my-data-diy.png)