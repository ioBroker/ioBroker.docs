---
chapters: {"pages":{"de/adapterref/iobroker.lametric/README.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/README.md"},"de/adapterref/iobroker.lametric/apps.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/apps.md"},"de/adapterref/iobroker.lametric/my-data-diy.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/my-data-diy.md"},"de/adapterref/iobroker.lametric/notifications.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/notifications.md"},"de/adapterref/iobroker.lametric/blockly.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/blockly.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.lametric/my-data-diy.md
title: ioBroker.lametric
hash: 6O6ZeB7+MDcY+HE2owKfpxe11hP+PJkL6hu94GZbq9g=
---
![标识](../../../de/adapterref/iobroker.lametric/../../admin/lametric.png)

# IoBroker.lametric
## 我的数据 (DIY) *(需要适配器版本 >= 1.1.0)*
*LaMetric* 提供（通过集成的应用商店）一个额外的应用来显示您自己的信息。这个应用程序被称为[我的数据DIY](https://apps.lametric.com/apps/my_data__diy_/8942)。此适配器以所需格式创建数据点。

可以使用各种适配器在 *LaMetric Time* 传输此数据：

- Web Adaptor（推荐）*（需要适配器版本 > 2.1.0）*
- REST API 适配器
- 简单的 API 适配器

### Web 适配器（推荐）
```ioBroker LaMetric Adapter -> Zustand mit Frame-Informationen <- ioBroker Web Adapter <- My Data DIY App <- LaMetric```

1. 安装【Web ioBroker Adapter】(https://github.com/ioBroker/ioBroker.web)
2. 创建一个新的网络适配器实例（例如 ``web.0``）
3.配置新Web实例的端口（例如``8082``）
4. 通过应用商店在您的 *LaMetric Time* 上安装 *My Data DIY* 应用
5. 打开 *My Data (DIY)* 应用程序的设置并配置 REST API 适配器的 URL（见下文）
6. 进入适配器设置并使用您自己的信息添加新框架（请参阅下一节）
7.不要忘记选择之前配置的web实例！

```
http://172.16.0.219:8082/lametric.0/
```

### REST API 适配器
```ioBroker LaMetric Adapter -> Zustand mit Frame-Informationen <- ioBroker REST API Adapter <- My Data DIY App <- LaMetric```

#### 配置（带认证）
1.安装【REST API ioBroker Adapter】(https://github.com/ioBroker/ioBroker.rest-api)
2. 使用名称“lametric”和自定义密码创建一个新的 ioBroker 用户（例如“HhX7dZl3Fe”）
3. 将新的“lametric”用户添加到“users”组
4. 通过应用商店在您的 *LaMetric Time* 上安装 *My Data DIY* 应用
5. 打开 *My Data (DIY)* 应用程序的设置并配置 REST API 适配器的 URL（见下文）
6. 进入适配器设置并使用您自己的信息添加新框架（请参阅下一节）

```
http://lametric:HhX7dZl3Fe@172.16.0.219:8093/v1/state/lametric.0.mydatadiy.obj/plain?extraPlain=true
```

**替换URL中的示例IP、端口、用户名和密码！**

### 简单的 API 适配器
```ioBroker LaMetric Adapter -> Zustand mit Frame-Informationen <- ioBroker Simple API Adapter <- My Data DIY App <- LaMetric```

#### 配置（带认证）
1.安装【Simple API ioBroker Adapter】(https://github.com/ioBroker/ioBroker.simple-api)
2. 使用名称“lametric”和自定义密码创建一个新的 ioBroker 用户（例如“HhX7dZl3Fe”）
3. 将新的“lametric”用户添加到“users”组
4. 通过应用商店在您的 *LaMetric Time* 上安装 *My Data DIY* 应用
5. 打开 *My Data (DIY)* 应用程序的设置并配置 Simple API Adapter 的 URL（见下文）
6. 进入适配器设置并使用您自己的信息添加新框架（请参阅下一节）

```
http://172.16.0.219:8087/getPlainValue/lametric.0.mydatadiy.obj/?json&user=lametric&pass=HhX7dZl3Fe
```

**重要提示：使用 SimpleAPI Adapter json 标志（自版本 2.6.2 起可用）**

**替换URL中的示例IP、端口、用户名和密码！**

#### 配置（无需认证）
1.安装【Simple API ioBroker Adapter】(https://github.com/ioBroker/ioBroker.simple-api)
2. 通过应用商店在您的 *LaMetric Time* 上安装 *My Data DIY* 应用
3. 打开 *My Data (DIY)* 应用程序的设置并配置 Simple API Adapter 的 URL（见下文）
4. 进入适配器设置并使用您自己的信息添加新框架（请参阅下一节）

```
http://172.16.0.219:8087/getPlainValue/lametric.0.mydatadiy.obj/?json
```

**重要提示：使用 SimpleAPI Adapter json 标志（自版本 2.6.2 起可用）**

**替换URL中的示例IP和端口！**

### 框架配置
- 使用加号按钮添加任意数量的帧
- 图标：从[官方网站]（https://developer.lametric.com/icons）中选择一个图标并将ID粘贴到字段中。 **重要提示：使用 i（用于静态符号）或 a（用于动画符号）作为 ID 的前缀（例如：`i3389`）**
- 文本：键入要显示的任何文本。您可以通过将数据点的 ID 括在大括号中来从数据点中检索信息。然后在此时使用数据点的当前值。 （例如：`{youtube.0.channels.HomeAutomationCom.statistics.subscriberCount} 订阅者`）
- 持续时间：指定每帧应显示多长时间（默认 = 5 秒）

一些框架的示例配置：

![示例框架配置](../../../de/adapterref/iobroker.lametric/./img/my-data-diy.png)

![示例配置 iphone](../../../de/adapterref/iobroker.lametric/./img/my-data-diy-iphone.png)