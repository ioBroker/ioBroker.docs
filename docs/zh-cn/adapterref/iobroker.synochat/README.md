---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.synochat/README.md
title: <img src="docs/images/synochatLogo.png" alt="绘画"/>Synology-Chat ioBroker 适配器
hash: KrnAaDHnRDfrpUbZceOQWh67jy5jX4KMmLgPHYXhpEo=
---
![稳定版本](https://iobroker.live/badges/synochat-stable.svg)
![NPM 版本](https://img.shields.io/npm/v/iobroker.synochat.svg)
![下载](https://img.shields.io/npm/dm/iobroker.synochat.svg)
![安装数量](https://iobroker.live/badges/synochat-installed.svg)
![新公共管理](https://nodei.co/npm/iobroker.synochat.png?downloads=true)

#<img src="docs/images/synochatLogo.png" alt="绘画"/> Synology-Chat ioBroker 适配器
![测试和发布](https://github.com/phoeluga/ioBroker.synochat/workflows/Test%20and%20Release/badge.svg)

[![捐赠][donate-badge2]][donate-link]

## 这是什么？
此适配器在 Synology Chat 和 ioBroker 之间提供接口。为此，我们使用 Synology Chat 提供的标准集成功能和相应的 REST API 端点。
传入和传出集成可用于向 Synology 聊天服务器发送消息，或更新 ioBroker 实例中的消息对象以接收消息。

---

＃ 手动的
## 1. 安装
您可以从 ioBroker 安装中的适配器部分实例化该适配器。
更多信息请参阅官方[ioBroker 文档](https://www.iobroker.net/#de/documentation/admin/adapter.md)。

## 2. 配置
<div id="synology-chat-configuration"></div>

### 2.1. Synology 聊天配置
- Synology Chat 提供了处理收发消息的功能。下文将更详细地介绍这两个选项。

- 要通过 Synology Chat 界面创建消息，必须在 Synology Chat 中创建集成：

![SynoChatChannel](./docs/images/diSynoChatChannel.png) ![SynoChat集成](../../../en/adapterref/iobroker.synochat/docs/images/diSynoChatIntegrations.png)

#### 2.1.1. 传入集成
为了将传入消息集成到 Synology 聊天中，需要一个令牌，该令牌可以从创建期间生成的 URL 中获取。
![SynoChat集成传入](./docs/images/diSynoChatIntegrationIncoming.png) ![SynoChat集成传入设置](../../../en/adapterref/iobroker.synochat/docs/images/diSynoChatIntegrationIncomingSettings.png)

	<div id="synologyChatConfigurationOutgoingIntegration"></div>

#### 2.1.2. 传出集成
为了将外发消息集成到 Synology 聊天中，需要提供一个 Web Hook URL。实例化 `synochat` 适配器后，您将从实例对象中获取此 Web Hook URL。更多详细信息，请参阅 [3. 用法 > 3.1 一般](#web-hook-location) ![SynoChat集成传入](./docs/images/diSynoChatIntegrationOutgoing.png) ![SynoChat集成传入设置](../../../en/adapterref/iobroker.synochat/docs/images/diSynoChatIntegrationOutgoingSettings.png)

***注意：*** *频道类型（传入；传出）是从 Synology 聊天的角度指定的。例如，“传入”表示消息将发送到 Synology 聊天服务器。*

有关如何在 Synology 聊天中处理集成的更多详细信息，请参阅 Synology 的官方文档[这里](https://kb.synology.com/DSM/help/Chat/chat_integration)

### 2.2. ioBroker适配器实例配置
- 此适配器的配置可以在实例设置中完成。

#### 2.2.1. 主要设置：
	![IobrokerInstanceSettingsMainSettings](../../../en/adapterref/iobroker.synochat/docs/images/diIobrokerInstanceSettingsMainSettings.png)

* **Synology URL/IP**

使用此属性将提供您的 Synology-Chat 应用程序的 URL。请注意，请使用包含`http://` 或`https://` 的绝对 URL，并且不要提供类似`/` 的后缀。
您可以像往常一样，使用`:` 在 URL 后提供特定端口。

***有效值示例：***

- https://mychat.mydomain.tld
- https://192.168.1.1:8080

* **验证 SSL 证书**

当然，我们始终建议对数据传输进行加密。
在家庭环境中，通常使用自签名证书进行加密连接。在这种情况下，可能需要禁用 HTTP 连接的 SSL 证书验证。
禁用此属性可关闭证书验证。

* **ioBroker 实例的主机名/IP 地址**

此属性允许您指定可通过 URL 访问 ioBroker 实例的主机名或 IP 地址。初始适配器实例化后，此值将自动设置为 ioBroker 安装的主机操作系统的当前 IP 地址。

如果使用 ioBroker 作为 Docker 实例，则可能需要更改此值，例如，如果使用反向代理或类似代理来访问您的 ioBroker 实例。

此值用于生成从 Synology 聊天服务器接收消息的频道的 Web Hook URL。

	<div id="configurationAdapterWebInstance"></div>

* **从 Synology 聊天向 ioBroker 适配器实例发送消息的 Web 实例**

`synochat` 适配器正在使用 `web` 适配器来提供 Web 钩子。您需要选择 `web` 适配器的特定实例，以便为 Synology 聊天集成提供专用的 Web 钩子。

	<div id="channel-configuration"></div>

#### 2.2.2. 频道管理/配置：
	![Iobroker实例设置通道配置](../../../en/adapterref/iobroker.synochat/docs/images/diIobrokerInstanceSettingsChannelConfiguration.png)

* **频道已启用**

此选项可用于禁用传入或传出消息的处理。

例如，如果用户只想暂时禁用某个频道的使用，并希望保留访问令牌或类似的设置以防止再次收集它们，这将很有用。

频道名称

此设置指定发送消息的频道名称。对于`Send data to Synology chat server - Incoming integration`类型的频道，此名称可自由选择，并用于引用。

此处配置的频道名称应与 Synology 聊天的频道名称相同。

对于类型为`Get data from Synology chat server - Outgoing integration`的频道，其名称必须与 Synology 聊天频道的频道名称相同才能接收消息。
频道名称的映射区分大小写（必须考虑大小写）。

* **频道令牌**

此设置提供 Synology 聊天频道的访问令牌。创建此令牌的方式因频道类型而异。
更多详情请参阅第 [Synology 聊天配置](#synology-chat-configuration) 章。

***注意：***\ *根据集成情况，创建 Synology 聊天集成时，您将获得类似于以下示例的链接：*

https://mychat.mydomain.tld/webapi/entry.cgi?api=SYNO.Chat.External&method=incoming&version=2&token=%22QF5DWyG7M47Ls3cv%22

*在此示例中，令牌包含在 URL 中。编码的控制字符 - `%22` - 在设置的开头和结尾处指定。\**这些必须删除！**\ 在此示例中，要输入的令牌应为 `QF5DWyG7M47Ls3cv`。*

频道类型

***注意：***\ *必须从 Synology 聊天的角度指定频道类型。例如，在配置中选择“传入”表示消息将发送到 Synology 聊天。*

此设置根据 Synology 聊天中选择的集成指定将使用的 Synology 聊天频道的类型。

* **将数据发送到 Synology 聊天服务器 - 传入集成**\

此选项使通道能够在对象值发生变化时立即发送 ioBroker 消息对象（[参见使用章节](#usage)）的新值。

* **从 Synology 聊天服务器获取数据 - 传出集成**\

此选项使频道能够从 Synology 聊天服务器接收消息并更新 ioBroker 消息对象的新值（[参见使用章节](#usage)）。

请注意，使用此通道类型时，ioBroker 适配器实例配置的通道名称必须与 Synology 聊天通道的通道名称相同才能接收消息。
通道名称的映射区分大小写（必须考虑大小写）。

> 注意：请确保不要选择传出渠道的“*反应*”选项

如果要在发送和接收消息中配置一个通道，只需添加具有相同名称的第二个通道并选择另一种通道类型。

**对象值模板**

如果频道消息对象的值包含 JSON 值，您可以选择一个模板，将该对象值解析为人类可读的值，然后再将其发送到 Synology 聊天频道。

相关消息模板可以在[消息模板](#message-templates)部分进行配置。

* **对通知管理器做出反应**

`synochat` 可以接收来自 [ioBroker通知管理器](https://github.com/foxriver76/ioBroker.notification-manager) 的消息。此选项允许您选择相应频道是否响应来自通知管理器的消息并将其转发至 Synology Chat。

相关消息模板可以在[消息模板](#messageTemplates)部分进行配置。

* **对所有 ioBroker 消息做出反应**

除了来自 [ioBroker通知管理器](https://github.com/foxriver76/ioBroker.notification-manager) 的消息外，`synochat` 还可以接收来自其他适配器的消息。此选项允许您选择相应频道是否应对来自所有其他发件人的消息，并将其相应地转发到 Synology Chat。

适配器实例可以接收消息。这些消息由一个对象组成，该对象包含多个属性，这些属性可以作为参数包含在消息模板中。在发送消息之前，这些参数会被相应地替换。

相关消息模板可以在[消息模板](#message-templates)部分进行配置。

* **验证 SSL 证书 - 适用于非文本消息**

如果传入渠道类型需要发送文本以外的内容（例如图像），则需要通过 URL 从 HTTP 源指定。如果此内容附带自签名证书，则可以使用此设置启用或禁用证书检查。
有关发送非文本内容的详细信息，请参阅第 [Synology 聊天配置](#synology-chat-configuration) 章节。

	<div id="message-templates"></div>

#### 2.2.3. 消息模板：
您可以定义在将消息发送到 Synology Chat Server 之前进行处理的消息模板。这些模板可以包含在发送过程中被替换的模式。

	![Iobroker实例设置通道配置](../../../en/adapterref/iobroker.synochat/docs/images/diIobrokerInstanceSettingsMessageTemplates.png)

模式必须始终以`${`开头，以`}`结尾。例如：`${foo}`。在处理消息时，模式`${foo}`将被替换为属性`foo`的相应 JSON 值。

	**样本：**

如果配置为向 Synology Chat 发送数据的频道收到其消息对象的对象更改，则它可能包含如下所示的 JSON 值：

	```json
    {
        "sensor": {
            "id": "temp0815",
            "name": "Temperature - Living room",
            "type": "temperature",
            "location": "living room",
            "value": "23.4"
        }
    }
	```

您可以通过在类似`${sensor.value}`的路径中提供此值的内部属性来访问它们。

如果你想发送类似“客厅温度变为 23.4°C”的短信

您的消息模板将如下所示：

`The ${sensor.type} in the ${sensor.location} changed to ${sensor.value}°C`

**注意事项和限制：**

1. 如果您尝试访问包含点（“。”）的键的属性，则必须使用字符“/-”对其进行转义！

例如，如果您的消息对象值如下所示：

```JSON
{
       "category": {
           "instances": {
               "system.adapter.notification-manager.0": {
                   "notification": "Test notification",
               }
           }
       }
   }
```

并且您想要访问属性`notification`，您的模式将是`${category.instances.system/-adapter/-notification-manager/-0.notification}`

2. 无法访问数组中的特定项目。

例如，如果您的消息对象值如下所示：

```JSON
{
       "messages": [
           {
           "text": "Lorem"
           },
           {
           "text": "Ipsum"
           }
       ]
   }
```

您无法访问`message`对象中的`text`属性。在这种情况下，您需要在此适配器外部准备对象值，然后再将其传递给`synochat`通道消息对象。

* **通过 ioBroker 通知管理器发送接收消息的模板**

此模板将定义从通知管理器接收的消息内容。您可以将`iobroker.Message` 对象和嵌入的通知管理器消息对象的属性名称用作模板中的参数。

内部接收的对象类型为`iobroker.Message`：

		```javascript
		/** A message being passed between adapter instances */
        interface Message {
            /** The command to be executed */
            command: string;
            /** The message payload */
            message: MessagePayload;
            /** The source of this message */
            from: string;
            /** ID of this message */
            _id: number;
            /** Callback information. This is set when the source expects a response */
            callback: MessageCallbackInfo;
        }
		```

根据描述，通知管理器将提供其自己的消息对象，该对象嵌入在`message`属性中，作为`iobroker.Message`的一部分。

您可以使用模式`${message.NOTIFICATION_MANAGER_ATTRIBUTES}`通过`message`属性访问这些数据。

**可用图案：**

* `${command}` - 与 `iobroker.Message` 对象相关的模式
* `${message}` - 与 `iobroker.Message` 对象相关的模式
* `${from}` - 与 `iobroker.Message` 对象相关的模式
* `${_id}` - 与 `iobroker.Message` 对象相关的模式
* `${instances}` - 模式将被替换为与通知管理器收到的通知相关的实例列表
* `${contextData}` - 提供附加 contextData 的模式，该模式也与通知信息一起存储

有关[Notification-Manager](https://github.com/foxriver76/ioBroker.notification-manager) 消息对象可以在 [README] 中找到](https://github.com/foxriver76/ioBroker.notification-manager)结构的更多信息。

> 注意：请确保不要选择传出渠道的“*反应*”选项

* **用于发送所有其他收到的消息的模板**

与上面描述的相同的`iobroker.Message`对象用于向适配器实例发送所有类型的消息。

		```javascript
		/** A message being passed between adapter instances */
        interface Message {
            /** The command to be executed */
            command: string;
            /** The message payload */
            message: MessagePayload;
            /** The source of this message */
            from: string;
            /** ID of this message */
            _id: number;
            /** Callback information. This is set when the source expects a response */
            callback: MessageCallbackInfo;
        }
		```

从该对象本身可以使用以下模式来访问相关属性的值。

**可用图案：**

* `${command}` - 与 `iobroker.Message` 对象相关的模式
* `${message}` - 与 `iobroker.Message` 对象相关的模式
* `${from}` - 与 `iobroker.Message` 对象相关的模式
* `${_id}` - 与 `iobroker.Message` 对象相关的模式

`${message}` 模式始终包含来自相应发送者的信息。如果消息仅包含 `String`，则只需提供 `${message}` 模式。如果它提供的是 JSON 值，您还可以通过提供值的路径来访问内部属性，例如 `${message.foo.bar}`。

> 注意：请确保不要选择传出渠道的“*反应*”选项

* **模板 1-10 - 应用于特定渠道的模板**

您还可以为特定频道的消息对象提供 JSON 值。在这种情况下，您可以定义最多十个用户特定的模板，这些模板可在将消息发送到 Synology Chat 服务器之前应用。

可以通过提供值的路径作为类似`${foo.bar}`的模式来访问 JSON 属性。

模板可以与[通道配置](#channel-configuration) 中的频道相关联。

**可用图案：**

可用的模式与将提供给频道消息对象的客户 JSON 值相关。

#### 2.2.4. 帮助：
* 此选项卡通常会重定向到该项目的官方 GitHub 页面，其中提供了详细的帮助和使用说明。
* 如果有任何未解决的问题、更改建议、不良行为或错误，请创建 [GitHub 问题](https://github.com/phoeluga/ioBroker.synochat/issues/new/choose) 以确保本项目的质量。

<div id="configurationWebInstance"></div>

### 2.3. `web` 实例的配置
要从 Synology 聊天服务器接收消息，需要配置传出集成 - 请参阅[传出集成](#synologyChatConfigurationOutgoingIntegration)。

这需要运行`web` 适配器的实例并在[`synochat` 适配器实例已配置](#configurationAdapterWebInstance) 中进行配置。

如果使用的 `web` 实例配置为使用 HTTPS 安全连接，**请确保您提供有效的证书或将您自己的证书导入 Synology 中的受信任证书**。\ 否则，Synology 聊天服务器将不会向您的 ioBroker 适配器实例发送任何消息。
通信将无法建立，并且遗憾的是，两个站点的用户都不会直接收到由于证书无效而导致消息被拒绝的提示。

<div id="usage"></div>

## 3. 用法
### 3.1 一般规定
* 配置适配器实例后，将在相应适配器实例的对象中为每个已配置的通道创建一个具有通道名称的文件夹。

	![Iobroker对象概述](../../../en/adapterref/iobroker.synochat/docs/images/diIobrokerObjectOverview.png)

* 在此文件夹中可以找到相应频道的消息对象，该对象代表已发送或已接收的消息。

***注意：***\ *发送消息或用户更改消息对象时，请确保未设置 Ack 标志。Synology 聊天服务器确认成功接收消息后，适配器将设置 Ack 标志。*\ **如果用户在 ioBroker 对象视图中更改消息值时设置了 Ack 标志，则该消息将不会被处理！***

	![代理对象设置消息](../../../en/adapterref/iobroker.synochat/docs/images/diIobrokerObjectSetMessage.png)

* 当消息对象发生变化并且频道类型设置为“将数据发送到 Synology 聊天服务器”时，此消息将传递到 Synology 聊天。

	![SynoChatChannel传入消息](../../../en/adapterref/iobroker.synochat/docs/images/diSynoChatChannelIncomingMessage.png)

* 要从 Synology Chat Server 接收消息并相应地更新消息对象，请确保配置的“触发词”（请参阅 [Synology 聊天配置](#synology-chat-configuration)）在消息中不带标点符号。因此，它必须独立存在。

**示例**\ 如果 `Trigger word` 为 `Alarm`，则 Synology 聊天中的消息应如下所示：\ `An alarm was triggered in the hallway.`

请注意，`Trigger word` 区分大小写（必须考虑大写和小写）。

<div id="web-hook-location"></div>

* Web hook URL/地址将作为适配器实例的信息文件夹中的对象值提供，并且对一个适配器实例内的所有通道有效。

	![IobrokerObjectWebHook](../../../en/adapterref/iobroker.synochat/docs/images/diIobrokerObjectWebHook.png)

### 3.2 消息内容类型
除了发送纯文本消息外，其他类型的内容（例如图像）也可以发送到传入通道。为此，内容必须以 Web 资源的形式提供。要发送图像，只需将 URL 设置为 [3. 用法 > 3.1 一般](#usage) 中提到的 Syno-Chat 适配器实例的消息对象的值即可。

**监控摄像头用例示例**\ 许多监控摄像头提供流或接口来检索以指定时间间隔或检测到运动时更新的图像。\ 此 URL 提供需要设置为消息对象值的图像。

### 3.3 出现问题时的调试
为了在出现问题时获取有关适配器行为的更多详细信息，您可以将`synochat` 适配器实例的日志级别提升至`debug`。

由于此适配器使用`web`适配器实例向Synology聊天服务器提供Web钩子，因此已配置的`web`实例正在执行某些功能。为了在接收消息时获取更详细的信息，您需要将已配置的`web`实例的日志级别也提升至`debug`。与`synochat`适配器相关的日志消息可以通过日志消息前缀`synochat.<INSTANCE_NUMBER>`识别。

---

## 其他披露
#### 资源归属
- [由 Pixel perfect - Flaticon 创建的聊天图标](https://www.flaticon.com/free-icons/chat)

[donate-badge]:https://img.shields.io/static/v1?label=Treat%20a%20coffee&message=donate%20a%20tip&color=2a9cde&logo=data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTcgMjJoMTBhMSAxIDAgMCAwIC45OS0uODU4TDE5Ljg2NyA4SDIxVjZoLTEuMzgybC0xLjcyNC0zLjQ0N0EuOTk4Ljk5OCAwIDAgMCAxNyAySDdjLS4zNzkgMC0uNzI1LjIxNC0uODk1LjU1M0w0LjM4MiA2SDN2MmgxLjEzM0w2LjAxIDIxLjE0MkExIDEgMCAwIDAgNyAyMnptMTAuNDE4LTExSDYuNTgybC0uNDI5LTNoMTEuNjkzbC0uNDI4IDN6bS05LjU1MSA5LS40MjktM2g5LjEyM2wtLjQyOSAzSDcuODY3ek03LjYxOCA0aDguNzY0bDEgMkg2LjYxOGwxLTJ6IiBmaWxsPSIjZWRmMmZhIiBjbGFzcz0iZmlsbC0wMDAwMDAiPjwvcGF0aD48L3N2Zz4=

[donate-badge2]:https://img.shields.io/static/v1?label=Treat%20a%20coffee&message=donate%20a%20tip&color=2a9cde&logo=data:image/svg+xml;base64,PHN2ZyBkYXRhLW5hbWU9IkxheWVyIDEiIHZpZXdCb3g9IjAgMCAzMiAzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjYuNSAxNUgyNnYtMWEyIDIgMCAwIDAtMi0ySDJhMiAyIDAgMCAwLTIgMnY2YTEwLjY0IDEwLjY0IDAgMCAwIDExIDExaDRhMTAuNzkgMTAuNzkgMCAwIDAgOS4zMS01aDIuMTlhNS41IDUuNSAwIDAgMCAwLTExWk0xNSAyN2gtNGE2LjcgNi43IDAgMCAxLTctN3YtNGgxOHY0YTYuNzcgNi43NyAwIDAgMS03IDdabTExLjQ0LTQuNzdoLS43OGExMy43NSAxMy43NSAwIDAgMCAuMi0yLjMxdi0xLjE1aC41OGExLjczIDEuNzMgMCAwIDEgMCAzLjQ2Wk0xMyAxMGEyIDIgMCAwIDAgMi0yVjJhMiAyIDAgMSAwLTQgMHY2YTIgMiAwIDAgMCAyIDJaTTIwIDEwYTIgMiAwIDAgMCAyLTJWN2EyIDIgMCAwIDAtNCAwdjFhMiAyIDAgMCAwIDIgMlpNNiAxMGEyIDIgMCAwIDAgMi0yVjZhMiAyIDAgMCAwLTQgMHYyYTIgMiAwIDAgMCAyIDJaIiBmaWxsPSIjZjBmNWZhIiBjbGFzcz0iZmlsbC1iYTYzYzYiPjwvcGF0aD48L3N2Zz4=

[donate-link]: https://www.paypal.com/donate/?hosted_button_id=9MLB29CKX5674

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.4.2 (2025-10-04)
- *[@phoeluga]* Adding channelToken and channels properties to protectedNative and encryptedNative object type
- *[@phoeluga]* Enhanced template handling to properly ignore non-JSON objects, preventing them from being processed as JSON objects
- *[@OlliMartin]* Allow to be used in message templates - #34
- *[@phoeluga]* Adding compatibility check and testing for node.js 24 - #35
- *[@phoeluga]* Updated dependencies to the current minimum versions and according to - #36 ; #38 ; #39

### 1.3.3 (2025-01-26)
- *[@phoeluga]* Updated admin UI to fix desponsive design (mobile view) - #28

### 1.3.2 (2025-01-04)
- *[@phoeluga]* Fixed issue with 5 digit port number when using a IP for property Synology URL/IP - #20
- *[@phoeluga]* Addressed W[171],W[105],W[109] - #18
- *[@phoeluga]* Updated admin style.css and classes to support scrolling on mobile device view - #24
- *[@phoeluga]* Updated several dependencies to met the current overall config - #21
- *[@phoeluga]* Update test-workflow to be prepared for Node.js v22 - #22
- *[@phoeluga]* Bumped min. Node.js version to v18 - #22
- *[@phoeluga]* Bumped @iobroker/adapter-core to version >= 3.x.x - #23
- *[@phoeluga]* Updated ESLint usage and config - Migration to ESLint 9 - #25

### 1.3.1 (2023-08-13)
- *[@phoeluga]* Fixed TypeError issue with empty initial value of outgoing channels - #13
- *[@phoeluga]* Updated information about handling of outgoing channels - #14
- *[@phoeluga]* Fixed special character escaping issue - #16
- *[@phoeluga]* Added text mapping for 'human readable' descriptions of the message parent objects - #14

### 1.3.0 (2023-07-23)
- *[@phoeluga]* Added feature to react on messages from Notification-Manager - #9
- *[@phoeluga]* Added feature to react on general received messages sent to the `synochat` adapter instance.
- *[@phoeluga]* Added message templates for received messages from other adapters.
- *[@phoeluga]* Added message templates for object values related to an associated channel.

### 1.2.1 (2022-05-18)
- *[@phoeluga]* The IP family check to determine the local IP address of the ioBroker instance has been adjusted.

### 1.2.0 (2022-05-17)

- *[@phoeluga]* Added enhancement #6 - Delayed sending of messages has been added to work around the limitations of messages sent to the Synology Chat Server in a certain time interval.
- *[@phoeluga]* Regarding #6, a message queue has been added to ensure that the order of messages to be sent is respected when the sending of messages is delayed.
- *[@phoeluga]* Implementation of the [requirements](https://github.com/ioBroker/ioBroker.repositories/pull/1759#issuecomment-1127520995) for adding the adapter in the ioBroker repository - Adding MIT license hint to the Readme.
- *[@phoeluga]* Implementation of the [requirements](https://github.com/ioBroker/ioBroker.repositories/pull/1759#issuecomment-1127520995) for adding the adapter in the ioBroker repository - Moved adapter instance object subscription after initial connectivity check.
- *[@phoeluga]* Implementation of the [requirements](https://github.com/ioBroker/ioBroker.repositories/pull/1759#issuecomment-1127520995) for adding the adapter in the ioBroker repository - Added exception handling to cover https://github.com/nodejs/node/issues/43014 in Nodejs 18
- *[@phoeluga]* Implementation of the [requirements](https://github.com/ioBroker/ioBroker.repositories/pull/1759#issuecomment-1127527703) for adding the adapter in the ioBroker repository - Added axios as dependency in package.json

### 1.1.1 (2022-04-16)

- *[@phoeluga]* Fixed issue #4 - Issue while migrating data from version < 1.1.0
- *[@phoeluga]* Added collecting and loading of default values when loading the initial configuration of the adapter instance
- *[@phoeluga]* The channel search behavior has been adjusted to react accordingly to deactivated channels and to query the remaining channels.

### 1.1.0 (2022-04-14)

- *[@phoeluga]* Added the ability to manage multiple channels in one adapter instance per Synology chat server.
- *[@phoeluga]* A possibility of ioBroker hostname / IP address configuration has been introduced.\
(May be helpful when using an ioBroker Docker instance).
- *[@phoeluga]* A functionality to receive incoming messages from the Synology chat server using WebHooks has been added.\
(An instance of the web adapter is required to use this feature)
- *[@phoeluga]* The translation of the UI properties was added.
- *[@phoeluga]* Added function to migrate channel data from an older version to a new channel object in the list approach.
- *[@phoeluga]* Added possibility for a user to disable dedicated channels from being processed.

### 1.0.1 (2022-04-06)

- *[@phoeluga]* Resolved #1 - Unable to send messages with special characters
- *[@phoeluga]* Resolved #2 - Send images


### 1.0.0 (2022-04-05)

- *[@phoeluga]* Initial release


### 0.0.1 (2022-04-03) - ALPHA

- *[@phoeluga]* Start of development

## License

This code is licensed under 'The MIT License (MIT)' license specified in the [LICENSE](./LICENSE) file.

Copyright (c) 2025 phoeluga <phoeluga@gmail.com>