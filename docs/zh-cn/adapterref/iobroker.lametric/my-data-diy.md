---
chapters: {"pages":{"de/adapterref/iobroker.lametric/README.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/README.md"},"de/adapterref/iobroker.lametric/apps.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/apps.md"},"de/adapterref/iobroker.lametric/my-data-diy.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/my-data-diy.md"},"de/adapterref/iobroker.lametric/notifications.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/notifications.md"},"de/adapterref/iobroker.lametric/blockly.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/blockly.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.lametric/my-data-diy.md
title: ioBroker.lametric
hash: FZH01/aAuo1VaT3LqJEVl2EF035nhz1B28UKboy1TIY=
---
![标识](../../../de/admin/lametric.png)

# IoBroker.lametric
*LaMetric* 提供了一个附加应用程序（通过集成应用程序商店）来显示您自己的信息。此应用程序名为[我的数据DIY](https://apps.lametric.com/apps/my_data__diy_/8942)。该适配器以所需格式创建数据点。

从该应用程序的 2.0.0 版本开始，可以通过不同的方式将数据传输到设备。

- 推送：适配器定期将数据发送到设备（如果发生变化） - **标准选项**
- 民意调查：定期收集*LaMetric Time* 的数据（可配置）

本文档中对这两种方法进行了解释。

## 我的数据 (DIY) - 推送 *（需要适配器版本 >= 3.0.0）*（推荐）
- 需要 *我的数据 DIY* 应用程序 >= 2.0.0
- 需要固件 >= 3.0.16（2022 年之前制造的旧型号固件>=2.3.7）

## 我的数据 (DIY) - 投票 *（需要适配器版本 >= 1.1.0）*
可以使用各种适配器将数据传输到*LaMetric Time*：

- Web 适配器（推荐）*（需要适配器版本 >= 2.1.0）*
- REST API 适配器
- 简单的API适配器

### Web 适配器（推荐）
```ioBroker LaMetric Adapter -> Zustand mit Frame-Informationen <- ioBroker Web Adapter <- My Data DIY App <- LaMetric```

1. 安装[Web ioBroker适配器](https://github.com/ioBroker/ioBroker.web)
2. 创建 Web 适配器的新实例（例如“web.0”）
3. 配置新Web实例的端口（例如``8082``）
4. 通过应用程序商店在您的 *LaMetric Time* 上安装 *My Data DIY* 应用程序
5. 打开*我的数据（DIY）*应用程序的设置并配置REST API适配器的URL（见下文）
6. 转到适配器设置并使用您自己的信息添加新框架（请参阅下一节）
7. 不要忘记选择之前配置的Web实例！

HTTP 轮询配置：

```
URL: http://172.16.0.219:8082/lametric.0/
```

### REST API 适配器
```ioBroker LaMetric Adapter -> Zustand mit Frame-Informationen <- ioBroker REST API Adapter <- My Data DIY App <- LaMetric```

#### 配置（带身份验证）
1.安装[REST API ioBroker适配器](https://github.com/ioBroker/ioBroker.rest-api)
2. 使用名称“lametric”和您自己的密码（例如“HhX7dZl3Fe”）创建一个新的 ioBroker 用户
3. 将新的“lametric”用户添加到“users”组中
4. 通过应用程序商店在您的 *LaMetric Time* 上安装 *My Data DIY* 应用程序
5. 打开*我的数据（DIY）*应用程序的设置并配置REST API适配器的URL（见下文）
6. 转到适配器设置并使用您自己的信息添加新框架（请参阅下一节）

HTTP 轮询配置：

```
URL: http://172.16.0.219:8093/v1/state/lametric.0.mydatadiy.obj/plain?extraPlain=true
Username: lametric
Password: HhX7dZl3Fe
```

**替换示例IP、端口、用户名和密码！**

### 简单的 API 适配器
```ioBroker LaMetric Adapter -> Zustand mit Frame-Informationen <- ioBroker Simple API Adapter <- My Data DIY App <- LaMetric```

#### 配置（带身份验证）
1.安装【Simple API ioBroker适配器】(https://github.com/ioBroker/ioBroker.simple-api)
2. 使用名称“lametric”和您自己的密码（例如“HhX7dZl3Fe”）创建一个新的 ioBroker 用户
3. 将新的“lametric”用户添加到“users”组中
4. 通过应用程序商店在您的 *LaMetric Time* 上安装 *My Data DIY* 应用程序
5. 打开*我的数据（DIY）*应用程序的设置并配置简单API适配器的URL（见下文）
6. 转到适配器设置并使用您自己的信息添加新框架（请参阅下一节）

HTTP 轮询配置：

```
URL: http://172.16.0.219:8087/getPlainValue/lametric.0.mydatadiy.obj/?json&user=lametric&pass=HhX7dZl3Fe
```

**重要提示：使用 SimpleAPI 适配器的 json 标志（自版本 2.6.2 起可用）**

**替换 URL 中的示例 IP、端口、用户名和密码！**

#### 配置（无需身份验证）
1.安装【简单API ioBroker适配器】(https://github.com/ioBroker/ioBroker.simple-api)
2. 通过应用程序商店在您的*LaMetric Time* 上安装*My Data DIY* 应用程序
3. 打开*我的数据（DIY）*应用程序的设置并配置简单API适配器的URL（见下文）
4. 转到适配器设置并使用您自己的信息添加新框架（请参阅下一节）

HTTP 轮询配置：

```
URL: http://172.16.0.219:8087/getPlainValue/lametric.0.mydatadiy.obj/?json
```

**重要提示：使用 SimpleAPI 适配器的 json 标志（自版本 2.6.2 起可用）**

**替换 URL 中的示例 IP 和端口！**

### 帧配置
- 使用加号按钮添加任意数量的框架
- 图标：从[官方网站](https://developer.lametric.com/icons)选择一个图标并将ID粘贴到字段中。 **重要提示：使用 i（对于静态符号）或 a（对于动画符号）作为 ID 的前缀（例如：`i3389`）**
- 文本：键入要显示的任何文本。您可以通过在大括号中指定数据点的 ID 来查询数据点的信息。然后将数据点的当前值插入到此处。 （示例：“{youtube.0.channels.HausAutomatisierungCom.statistics.subscriberCount} 订阅者”）
- 持续时间：确定每帧应显示多长时间（默认 = 5 秒）

一些帧的配置示例：

![示例框架配置](../../../de/adapterref/iobroker.lametric/img/my-data-diy.png)

### 我的数据 DIY 应用程序配置
自 *My Data DIY* 应用程序 2.0.0 版本起，可以进行进一步设置。

- 类型：“HTTP 轮询”
- HTTP 轮询配置
    - URL：*参见上文（取决于方法）*
    - 轮询间隔：15 秒。
    - 用户名：*参见上文（取决于方法）*
    - 密码：*参见上文（取决于方法）*
- 数据格式：预定义（LaMetric 格式）

![iPhone 民意调查配置示例](../../../de/adapterref/iobroker.lametric/img/my-data-diy-iphone-poll.png)