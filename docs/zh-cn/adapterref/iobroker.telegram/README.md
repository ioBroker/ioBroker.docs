---
BADGE-Number of Installations: http://iobroker.live/badges/telegram-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.telegram.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.telegram.svg
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.telegram/README.md
title: ioBroker.电报
hash: HdJZPY7CZavnYmHZ+XHUZ6D5EDouGngb+/w7ik+4Igg=
---
![标识](../../../en/admin/telegram.png)

# IoBroker.电报
＃＃ 配置
要求 [@机器人之父](https://telegram.me/botfather) 创建新的机器人 `/newbot`。

系统将要求您输入机器人的名称，然后输入用户名。
之后，您将获得令牌。

![截屏](../../../en/adapterref/iobroker.telegram/img/chat.png)

您应该在配置对话框中设置通信密码。在此之后启动适配器。

要与您的机器人开始对话，您需要使用 `/password phrase` 对用户进行身份验证，其中 **`phrase`** 是您配置的密码。因此，在 Telegram 中与您生成的 Bot 打开一个新对话，然后您需要输入密码作为第一个命令。

**注意：**您可以使用缩写形式 `/p phrase`。

要添加漂亮的头像图片，请在 **BotFather** 聊天中输入 `/setuserpic` 并上传他想要的图片（512x512 像素），就像这张 [标识](img/logo.png)。

您可以通过 messageBox `sendTo('telegram', 'Test message')` 或特定用户 `sendTo('telegram', '@userName Test message')` 将消息发送给所有经过身份验证的用户。
之前必须对用户进行身份验证。

您也可以用这种方式指定用户：

```javascript
sendTo('telegram', {user: 'UserName', text: 'Test message'}, function (res) {
    console.log('Sent to ' + res + ' users');
});
```

如果您使用上面的示例，请注意您必须将“用户名”替换为您要向其发送消息的用户的名字或公共电报用户名。 （取决于是否启用了适配器设置中的“存储用户名而不是名字”设置）如果设置了该选项并且用户未在其电报帐户中指定公共用户名，则适配器将继续使用的名字用户。请记住，如果用户稍后设置公共用户名（在对您的 bot 进行身份验证之后），保存的名字将在用户下次向 bot 发送消息时替换为用户名。

可以指定多个收件人（只需用逗号分隔用户名）。
例如：收件人：“用户 1、用户 4、用户 5”

您也可以通过状态发送消息，只需将状态 *"telegram.INSTANCE.communicate.response"* 设置为值 *"@userName Test message"* 或使用 JSON 对象：

```json
{
    "text": "Test message"
}
```

JSON 语法还允许从 [电报机器人 API](https://core.telegram.org/bots/api) 添加选项，以及设置用户或 chatId：

```json
{
    "text": "Test message, but with *bold*",
    "parse_mode": "Markdown",
    "chatId": "1234567890",
    "user": "UserName"
}
```

您也可以在文本中设置 `parse_mode`：

```
sendTo('telegram', {user: 'UserName', text: '<MarkdownV2>Test message, but with *bold*</MarkdownV2>'}, function (res) {
   console.log('Sent to ' + res + ' users');
});
```

或者

```
setState('telegram.0.communicate.response', '<MarkdownV2>Test message, but with *bold*</MarkdownV2>');
```

为了向群组发送消息，您必须邀请机器人加入您希望机器人发帖的群组。
通过向 JSON 消息负载提供 `chat_id`，您实际上可以向这些组发送消息。

为了找出 `chat_id`，您必须将适配器的日志级别设置为 `debug`。
然后，您可以在您希望机器人向其发送消息的组中对您的机器人执行 ping 操作。
确保在消息前面放置一个 `/` 以便机器人看到消息 ([如果机器人隐私已打开](#How-to-receive-messages-in-group-chats-using-telegram-adapter))。
然后 iobroker 日志将在日志中显示聊天 ID。

＃＃ 用法
您可以将电报与 [文本命令](https://github.com/ioBroker/ioBroker.text2command) 适配器一起使用。有预定义的通信模式，您可以以文本形式命令您回家。

要发送照片，只需发送文件路径而不是文本或 URL：`sendTo('telegram', 'absolute/path/file.png')` 或 `sendTo('telegram', 'https://telegram.org/img/t_logo.png')`。

如何将网络摄像头的屏幕截图发送到电报的示例：

```javascript
var request = require('request');
var fs      = require('fs');

function sendImage() {
    request.get({url: 'http://login:pass@ipaddress/web/tmpfs/snap.jpg', encoding: 'binary'}, function (err, response, body) {
        fs.writeFile('/tmp/snap.jpg', body, 'binary', function (err) {

        if (err) {
            console.error(err);
        } else {
            console.log('Snapshot sent');
            sendTo('telegram.0', '/tmp/snap.jpg');
            //sendTo('telegram.0', {text: '/tmp/snap.jpg', caption: 'Snapshot'});
        }
      });
    });
}
on('someState', function (obj) {
    if (obj.state.val) {
        // send 4 images: immediately, in 5, 15 and 30 seconds
        sendImage();
        setTimeout(sendImage, 5000);
        setTimeout(sendImage, 15000);
        setTimeout(sendImage, 30000);
    }
});
```

以下消息保留用于操作：

- *打字* - 用于短信，
- *upload_photo* - 用于照片，
- *upload_video* - 对于视频，
- *record_video* - 用于视频，
- *record_audio* - 用于音频，
- *upload_audio* - 用于音频，
- *upload_document* - 对于文档，
- *find_location* - 位置数据

在这种情况下，将发送操作命令。

电报 API 的描述可以在 [这里](https://core.telegram.org/bots/api) 中找到，您可以使用此 api 中定义的所有选项，只需将其包含到发送对象中即可。例如。：

```javascript
sendTo('telegram.0', {
    text:                   '/tmp/snap.jpg',
    caption:                'Snapshot',
    disable_notification:   true
});
```

**可能的选择**：

- *disable_notification*：静默发送消息。 iOS 用户不会收到通知，Android 用户会收到没有声音的通知。 （所有类型）
- *parse_mode*：如果您希望 Telegram 应用程序在您的机器人消息中显示粗体、斜体、固定宽度的文本或内联 URL，则发送 Markdown 或 HTML。可能的值：“Markdown”、“MarkdownV2”、“HTML”（消息）
- *disable_web_page_preview*：禁用此消息中链接的链接预览（消息）
- *caption*：文档、照片或视频的标题，0-200 个字符（视频、音频、照片、文档）
- *持续时间*：发送视频或音频的持续时间（以秒为单位）（音频、视频）
- *表演者*：音频文件（音频）的表演者
- *title*：音频文件（audio）的曲目名称
- *宽度*：视频宽度（video）
- *高度*：视频高度（视频）

适配器会根据消息中的文本尝试检测消息的类型（照片、视频、音频、文档、标签、操作、位置），如果文本是现有文件的路径，它将按类型发送。

将根据属性纬度检测位置：

```javascript
sendTo('telegram.0', {
    latitude:               52.522430,
    longitude:              13.372234,
    disable_notification:   true
});
```

### 显式消息类型
如果您想将数据作为缓冲区发送，您可以定义额外的消息类型。

以下类型是可能的：*贴纸*、*视频*、*文档*、*音频*、*照片*。

```javascript
sendTo('telegram.0', {
    text: fs.readFileSync('/opt/path/picture.png'),
    type: 'photo'
});
```

＃＃＃ 键盘
您可以在客户端显示键盘 **ReplyKeyboardMarkup**：

```javascript
sendTo('telegram.0', {
    text:   'Press button',
    reply_markup: {
        keyboard: [
            ['Line 1, Button 1', 'Line 1, Button 2'],
            ['Line 2, Button 3', 'Line 2, Button 4']
        ],
        resize_keyboard:   true,
        one_time_keyboard: true
    }
});
```

您可以阅读更多内容 [这里]（https://core.telegram.org/bots/api#replykeyboardmarkup）和[这里](https://core.telegram.org/bots#keyboards)。

您可以在客户端显示键盘 **InlineKeyboardMarkup**：

```javascript
sendTo('telegram', {
    user: user,
    text: 'Click the button',
    reply_markup: {
        inline_keyboard: [
            [{ text: 'Button 1_1', callback_data: '1_1' }],
            [{ text: 'Button 1_2', callback_data: '1_2' }]
        ]
    }
});
```

您可以阅读更多内容 [这里]（https://core.telegram.org/bots/api#inlinekeyboardmarkup）和[这里](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating)。

**注意：** *用户按下回调按钮后，Telegram 客户端将显示一个进度条，直到您调用 answerCallbackQuery。因此，即使不需要通知用户（例如，不指定任何可选参数），也有必要通过调用 answerCallbackQuery 来做出反应。*

### AnswerCallback查询
使用此方法发送对从内联键盘发送的回调查询的答复。答案将作为聊天屏幕顶部的通知或提醒显示给用户。成功时，返回 *True*。

```javascript
if (command === '1_2') {
    sendTo('telegram', {
        user: user,
        answerCallbackQuery: {
            text: 'Pressed!',
            showAlert: false // Optional parameter
        }
   });
}
```

您可以阅读更多内容 [这里](https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md#telegrambotanswercallbackquerycallbackqueryid-text-showalert-options--promise)。

＃＃＃ 问题
您可以将消息发送到电报，下一个答案将在回调中返回。
超时可以在配置中设置，默认为 60 秒。

```javascript
sendTo('telegram.0', 'ask', {
    user: user, // optional
    text: 'Are you sure?',
    reply_markup: {
        inline_keyboard: [
            // two buttons could be on one line too, but here they are on different
            [{ text: 'Yes!',  callback_data: '1' }], // first line
            [{ text: 'No...', callback_data: '0' }]  // second line
        ]
    }
}, msg => {
    console.log('user says ' + msg.data);
});
```

## 聊天ID
从 0.4.0 版本开始，您可以使用聊天 ID 发送消息进行聊天。

```javascript
sendTo('telegram.0', {text: 'Message to chat', chatId: 'SOME-CHAT-ID-123');
```

## 更新消息
以下方法允许您更改消息历史记录中的现有消息，而不是发送带有操作结果的新消息。这对于使用回调查询的*内联键盘*消息最有用，但也有助于减少与常规聊天机器人的对话中的混乱。

### 编辑消息文本
使用此方法编辑由机器人或通过机器人（对于内联机器人）发送的文本。成功时，如果机器人发送了已编辑的消息，则返回已编辑的消息，否则返回 *True*。

```javascript
if (command === '1_2') {
    sendTo('telegram', {
        user: user,
        text: 'New text before buttons',
        editMessageText: {
            options: {
                chat_id: getState('telegram.0.communicate.requestChatId').val,
                message_id: getState('telegram.0.communicate.requestMessageId').val,
                reply_markup: {
                    inline_keyboard: [
                        [{ text: 'Button 1', callback_data: '2_1' }],
                        [{ text: 'Button 2', callback_data: '2_2' }]
                    ],
                }
            }
        }
    });
}
```

*或上一条消息的新文本：*

```javascript
if (command === '1_2') {
    sendTo('telegram', {
        user: user,
        text: 'New text message',
        editMessageText: {
            options: {
                chat_id: getState('telegram.0.communicate.requestChatId').val,
                message_id: getState('telegram.0.communicate.requestMessageId').val,
            }
        }
    });
}
```

您可以阅读更多内容 [这里](https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md#telegramboteditmessagetexttext-options--promise)。

### 编辑消息标题
使用此方法编辑由机器人或通过机器人（对于内联机器人）发送的消息的标题。
成功时，如果机器人发送了已编辑的消息，则返回已编辑的消息，否则返回 *True*。

```javascript
if (command === '1_2') {
    sendTo('telegram', {
        user, // optional
        text: 'New caption',
        editMessageCaption: {
            options: {
                chat_id: getState('telegram.0.communicate.requestChatId').val,
                message_id: getState('telegram.0.communicate.requestMessageId').val
            }
        }
    });
}
```

您可以阅读更多内容 [这里](https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md#telegramboteditmessagetexttext-options--promise)。

### 编辑消息媒体
使用此方法编辑由机器人或通过机器人（对于内联机器人）发送的消息的图片。
成功时，如果机器人发送了已编辑的消息，则返回已编辑的消息，否则返回 *True*。

```javascript
if (command === '1_2') {
    sendTo('telegram', {
        user, // optional
        text: 'picture.jpg',
        editMessageMedia: {
            options: {
                chat_id: (await getStateAsync('telegram.0.communicate.botSendChatId')).val,
                message_id: (await getStateAsync('telegram.0.communicate.botSendMessageId')).val
            }
        }
    });
}
```

支持以下媒体类型：`photo`、`animation`、`audio`、`document`、`video`。

您可以阅读更多内容 [这里](https://core.telegram.org/bots/api#editmessagemedia)。

### 编辑消息回复标记
使用此方法仅编辑由机器人或通过机器人（对于内联机器人）发送的消息的回复标记。成功时，如果机器人发送了已编辑的消息，则返回已编辑的消息，否则返回 *True*。

```javascript
if (command === '1_2') {
    sendTo('telegram', {
        user: user,
        text: 'New text before buttons',
        editMessageReplyMarkup: {
            options: {
                chat_id: (await getStateAsync('telegram.0.communicate.botSendChatId')).val,
                message_id: (await getStateAsync('telegram.0.communicate.botSendMessageId')).val,
                reply_markup: {
                    inline_keyboard: [
                        [{ text: 'Button 1', callback_data: '2_1' }],
                        [{ text: 'Button 2', callback_data: '2_2' }]
                    ],
                }
            }
        }
    });
}
```

您可以阅读更多内容 [这里](https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md#telegramboteditmessagereplymarkupreplymarkup-options--promise)。

### 删除消息
使用此方法删除消息，包括服务消息，但有以下限制：

- 只有在不到 48 小时前发送的消息才能被删除。

返回 *True* 成功。

```javascript
if (command === 'delete') {
    sendTo('telegram', {
        user: user,
        deleteMessage: {
            options: {
                chat_id: getState('telegram.0.communicate.requestChatId').val,
                message_id: getState('telegram.0.communicate.requestMessageId').val
            }
        }
    });
}
```

您可以阅读更多内容 [这里](https://github.com/yagop/node-telegram-bot-api/blob/master/doc/api.md#TelegramBot+deleteMessage)。

## 对用户回复/消息做出反应
假设您只使用没有 *text2command* 的 JavaScript。如上所述，您已经使用 *sendTo()* 向您的用户发送了一条消息/问题。用户通过按下按钮或写消息来回复。您可以提取命令并向您的用户提供反馈，在 iobroker 中执行命令或切换状态。

 - telegram.0 是您要使用的 iobroker Telegram 实例
 - 用户是向您发送消息的 TelegramBot 注册的用户
 - 命令是您的 TelegramBot 收到的命令

```javascript
on({id: 'telegram.0.communicate.request', change: 'any'}, function (obj) {
    var stateval = getState('telegram.0.communicate.request').val;              // save Statevalue received from your Bot
    var user = stateval.substring(1,stateval.indexOf(']'));                 // extract user from the message
    var command = stateval.substring(stateval.indexOf(']') + 1,stateval.length);   // extract command/text from the message

    switch (command) {
        case '1_2':
            //... see example above ...
            break;
        case 'delete':
            //... see example above
            break;
        //.... and so on ...
    }
});

```

## 特殊命令
### /state stateName - 读取状态值
如果您现在是 ID，则可以请求 state 的值：

```
/state system.adapter.admin.0.memHeapTotal
> 56.45
```

### /state stateName value - 设置状态值
如果您现在是 ID，则可以设置 state 的值：

```
/state hm-rpc.0.JEQ0ABCDE.3.STOP true
> Done
```

## 轮询或服务器模式
如果使用轮询模式，适配器默认每 300 毫秒轮询一次电报服务器以获取更新。它使用流量，消息可以延迟到轮询间隔。轮询间隔可以在适配器配置中定义。

要使用服务器模式，您的 ioBroker 实例必须可以从互联网访问（例如使用 `noip.com` 动态 DNS 服务）。

Telegram 只能与 HTTPS 服务器一起使用，但您可以使用 **let's encrypt** 证书。

必须为服务器模式提供以下设置：

- URL - 格式为 https://yourdomain.com:8443。
- IP - IP 地址，服务器将绑定到的位置。默认 0.0.0.0。如果您不确定，请不要更改它。
- 端口 - 电报实际上只支持 443、80、88、8443 端口，但您可以通过路由器将端口转发给任何人。
- 公共证书 - 需要，如果 **let's encrypt** 被禁用。
- 私钥 - 如果禁用了 **let's encrypt**，则需要。
- 链证书（可选）
- 让我们加密选项 - 设置 **让我们加密** 证书非常容易。请阅读[此处](https://github.com/ioBroker/ioBroker.admin#lets-encrypt-certificates)。

## 高级安全性
可以禁用用户身份验证。因此，没有新人可以进行身份验证。

要创建受信任用户列表，请首先禁用“不验证新用户”选项，并通过发送 `/password <PASSWORD>` 消息验证所有应在受信任列表中的用户。

发送有效密码的用户将存储在受信任列表中。

之后可以激活选项“不验证新用户”并且没有新用户可以验证。

要使用此选项，必须激活“记住经过身份验证的用户”选项。

## 通过电报调用
感谢 [叫我机器人](https://www.callmebot.com/) api，您可以调用您的电报帐户，一些文本将通过 TTS 引擎读取。

要从 javascript 适配器做到这一点，只需调用：

```javascript
sendTo('telegram.0', 'call', 'Some text');
```

或者

```javascript
sendTo('telegram.0', 'call', {
    text: 'Some text',
    user: '@Username', // optional and the call will be done to the first user in telegram.0.communicate.users.
    language: 'de-DE-Standard-A' // optional and the system language will be taken
    repeats: 0, // number of repeats
});
```

或者

```javascript
sendTo('telegram.0', 'call', {
    text: 'Some text',
    users: ['@Username1', '+49xxxx'] // Array of `users' or telephone numbers.
});
```

或者

```javascript
sendTo('telegram.0', 'call', {
    file: 'url of mp3 file that is accessible from internet',
    users: ['@Username1', '@Username2'] // Array of `users' or telephone numbers.
});
```

语言的可能值：

- `ar-XA-Standard-A` - 阿拉伯语（女声）
- `ar-XA-Standard-B` - 阿拉伯语（男声）
- `ar-XA-Standard-C` - 阿拉伯语（男声 2）
- `cs-CZ-Standard-A` - 捷克语（捷克共和国）（女声）
- `da-DK-Standard-A` - 丹麦语（丹麦）（女声）
- `nl-NL-Standard-A` - 荷兰语（荷兰）（女声 - 如果系统语言为 NL 且未提供任何语言，则将使用）
- `nl-NL-Standard-B` - 荷兰语（荷兰）（男声）
- `nl-NL-Standard-C` - 荷兰语（荷兰）（男声 2）
- `nl-NL-Standard-D` - 荷兰语（荷兰）（女声 2）
- `nl-NL-Standard-E` - 荷兰语（荷兰）（女声 3）
- `en-AU-Standard-A` - 英语（澳大利亚）（女声）
- `en-AU-Standard-B` - 英语（澳大利亚）（男声）
- `en-AU-Standard-C` - 英语（澳大利亚）（女声 2）
- `en-AU-Standard-D` - 英语（澳大利亚）（男声 2）
- `en-IN-Standard-A` - 英语（印度）（女声）
- `en-IN-Standard-B` - 英语（印度）（男声）
- `en-IN-Standard-C` - 英语（印度）（男声 2）
- `en-GB-Standard-A` - 英语（英国）（女声 - 如果系统语言为 EN 且未提供语言，则将使用）
- `en-GB-Standard-B` - 英语（英国）（男声）
- `en-GB-Standard-C` - 英语（英国）（女声 2）
- `en-GB-Standard-D` - 英语（英国）（男声 2）
- `en-US-Standard-B` - 英语（美国）（男声）
- `en-US-Standard-C` - 英语（美国）（女声）
- `en-US-Standard-D` - 英语（美国）（男声 2）
- `en-US-Standard-E` - 英语（美国）（女声 2）
- `fil-PH-Standard-A` - 菲律宾语（菲律宾）（女声）
-`fi-FI-Standard-A`-芬兰语（芬兰）（女声）
- `fr-CA-Standard-A` - 法语（加拿大）（女声）
- `fr-CA-Standard-B` - 法语（加拿大）（男声）
- `fr-CA-Standard-C` - 法语（加拿大）（女声 2）
- `fr-CA-Standard-D` - 法语（加拿大）（男声 2）
- `fr-FR-Standard-A` - 法语（法国）（女声 - 如果系统语言为 FR 且未提供语言，则将使用）
- `fr-FR-Standard-B` - 法语（法国）（男声）
- `fr-FR-Standard-C` - 法语（法国）（女声 2）
- `fr-FR-Standard-D` - 法语（法国）（男声 2）
- `de-DE-Standard-A` - 德语（德国）（女声 - 如果系统语言为 DE 且未提供语言，则将使用）
- `de-DE-Standard-B` - 德语（德国）（男声）
- `el-GR-Standard-A` - 希腊语（希腊）（女声）
- `hi-IN-Standard-A` - 印地语（印度）（女声）
- `hi-IN-Standard-B` - 印地语（印度）（男声）
- `hi-IN-Standard-C` - 印地语（印度）（男声 2）
-`hu-HU-Standard-A`-匈牙利语（匈牙利）（女声）
- `id-ID-Standard-A` - 印度尼西亚语（印度尼西亚）（女声）
- `id-ID-Standard-B` - 印度尼西亚语（印度尼西亚）（男声）
- `id-ID-Standard-C` - 印度尼西亚语（印度尼西亚）（男声 2）
- `it-IT-Standard-A` - 意大利语（意大利）（女声 - 如果系统语言是 IT 且未提供语言，则将使用）
- `it-IT-Standard-B` - 意大利语（意大利）（女声 2）
- `it-IT-Standard-C` - 意大利语（意大利）（男声）
- `it-IT-Standard-D` - 意大利语（意大利）（男声 2）
- `ja-JP-Standard-A` - 日语（日本）（女声）
- `ja-JP-Standard-B` - 日语（日本）（女声 2）
- `ja-JP-Standard-C` - 日语（日本）（男声）
- `ja-JP-Standard-D` - 日语（日本）（男声 2）
- `ko-KR-Standard-A` - 韩语（韩国）（女声）
- `ko-KR-Standard-B` - 韩语（韩国）（女声 2）
- `ko-KR-Standard-C` - 韩语（韩国）（男声）
- `ko-KR-Standard-D` - 韩语（韩国）（男声 2）
- `cmn-CN-Standard-A` - 普通话（女声）
- `cmn-CN-Standard-B` - 普通话（男声）
- `cmn-CN-Standard-C` - 普通话（男声 2）
- `nb-NO-Standard-A` - 挪威语（挪威）（女声）
- `nb-NO-Standard-B` - 挪威语（挪威）（男声）
- `nb-NO-Standard-C` - 挪威语（挪威）（女声 2）
- `nb-NO-Standard-D` - 挪威语（挪威）（男声 2）
- `nb-no-Standard-E` - 挪威语（挪威）（女声 3）
- `pl-PL-Standard-A` - 波兰语（波兰）（女声 - 如果系统语言是 PL 且未提供语言，将使用）
- `pl-PL-Standard-B` - 波兰语（波兰）（男声）
- `pl-PL-Standard-C` - 波兰语（波兰）（男声 2）
- `pl-PL-Standard-D` - 波兰语（波兰）（女声 2）
- `pl-PL-Standard-E` - 波兰语（波兰）（女声 3）
- `pt-BR-Standard-A` - 葡萄牙语（巴西）（女声 - 如果系统语言为 PT 且未提供语言，则将使用）
-`pt-PT-Standard-A`-葡萄牙语（葡萄牙）（女声）
-`pt-PT-Standard-B`-葡萄牙语（葡萄牙）（男声）
-`pt-PT-Standard-C`-葡萄牙语（葡萄牙）（男声 2）
-`pt-PT-Standard-D`-葡萄牙语（葡萄牙）（女声 2）
- `ru-RU-Standard-A` - 俄语（俄罗斯）（女声 - 如果系统语言为 RU 且未提供语言，则将使用）
- `ru-RU-Standard-B` - 俄语（俄罗斯）（男声）
- `ru-RU-Standard-C` - 俄语（俄罗斯）（女声 2）
- `ru-RU-Standard-D` - 俄语（俄罗斯）（男声 2）
-`sk-SK-Standard-A`-斯洛伐克语（斯洛伐克）（女声）
- `es-ES-Standard-A` - 西班牙语（西班牙）（女声 - 如果系统语言为 ES 且未提供语言，则将使用）
-`sv-SE-Standard-A`-瑞典语（瑞典）（女声）
- `tr-TR-Standard-A` - 土耳其语（土耳其）（女声）
- `tr-TR-Standard-B` - 土耳其语（土耳其）（男声）
- `tr-TR-Standard-C` - 土耳其语（土耳其）（女声 2）
- `tr-TR-Standard-D` - 土耳其语（土耳其）（女声 3）
- `tr-TR-Standard-E` - 土耳其语（土耳其）（男声）
-`uk-UA-Standard-A`-乌克兰语（乌克兰语）（女声）
- `vi-VN-Standard-A` - 越南语（越南）（女声）
- `vi-VN-Standard-B` - 越南语（越南）（男声）
- `vi-VN-Standard-C` - 越南语（越南）（女声 2）
- `vi-VN-Standard-D` - 越南语（越南）（男声 2）

去做：

- 场地

## 基于管理员设置的自动内联键盘（简易键盘）
对于每个状态，可以启用附加设置：

![设置](../../../en/adapterref/iobroker.telegram/img/stateSettings.png)

通过输入 `/cmds` 电报中将显示以下键盘：

![设置](../../../en/adapterref/iobroker.telegram/img/stateSettings1.png)

`/cmds` 可以在电报适配器的配置对话框中替换为任何文本（例如“？”）。

如果在电报适配器的配置对话框中启用了**在键盘命令中使用房间**选项，那么在第一步中将显示房间列表。 ***尚未实现***

###状态中的设置
首先必须启用配置。

####别名
设备名称。如果名称为空，则名称将从对象中获取。
通过输入“门灯”，布尔状态将显示以下菜单。
![设置](../../../en/adapterref/iobroker.telegram/img/stateSettings2.png)

您可以打开设备、关闭设备或请求状态。
如果您点击 `Door lamp ?`，您将获得 `Door lamp  => switched off`。

＃＃＃ 只读
如果激活，将不会显示开/关按钮，仅显示 `Door lamp ?`。

### 报告变化
如果设备的状态发生变化（例如有人物理上打开了灯），新的状态将传递给电报。
例如。 `Door lamp  => switched on`。

### 排成一行的按钮
一台设备的行中必须显示多少个按钮。
由于名称很长，最好在一行中只显示 2 个（甚至一个）按钮。

![设置](../../../en/adapterref/iobroker.telegram/img/stateSettings3.png)

### 只写
如果激活，状态查询 (`Door lamp ?`) 按钮将不会显示。
![设置](../../../en/adapterref/iobroker.telegram/img/stateSettings4.png)

### 打开命令
哪些文本将显示在 `ON` 按钮上。
喜欢这里：![设置](../../../en/adapterref/iobroker.telegram/img/stateSettings5.png)

将产生以下键盘：![设置](../../../en/adapterref/iobroker.telegram/img/stateSettings6.png)

### 开启文本
将在状态报告中显示的文本。
例如。 `Door lamp => activated` 如果设备状态更改为 true 并且 **ON Text** 为 `activated`

仅当 **报告更改** 被激活时，才会显示开/关文本。

### 关闭命令
与 **ON 命令** 相同，但用于 OFF。

### 关闭文本
与 **ON Text** 相同，但用于 OFF。
例如。 `Door lamp => deactivated` 如果设备状态更改为 false 且 **OFF Text** 为 `deactivated`

### 只有真
例如。对于按钮，它们没有关闭状态。在这种情况下，将不会显示 OFF 按钮。

![设置](../../../en/adapterref/iobroker.telegram/img/stateSettings7.png)

## 如何使用电报适配器在群聊中接收消息
如果 telegram bot 在私聊中接收到用户发送给 bot 的消息，但在群聊中收不到用户发送的消息。
在这种情况下，您必须与 `@botfather` 交谈并禁用隐私模式。

BotFather 聊天：

```
You: /setprivacy

BotFather: Choose a bot to change group messages settings.

You: @your_name_bot

BotFather: 'Enable' - your bot will only receive messages that either start with the '/' symbol or mention the bot by username.

'Disable' - your bot will receive all messages that people send to groups.

Current status is: ENABLED

You: Disable

BotFather: Success! The new status is: DISABLED. /help
```

## 如何通过 node-red 发送消息
对于发送给所有用户的简单文本消息，只需将文本放在消息的有效负载中并将其发送到 ioBroker 状态 `telegram.INSTANCE.communicate.response`。

如果要设置其他选项，请使用 JSON 对象填充有效负载，例如：

```javascript
msg.payload = {
    // text is the only mandatory field here
    "text": "*bold _italic bold ~italic bold strikethrough~ __underline italic bold___ bold*",
    // optional chatId or user, the recipient of the message
    "chatId": "1234567890",
    // optional settings from the telegram bots API
    "parse_mode": "MarkdownV2"
}
```

在发送到 `telegram.INSTANCE.communicate.responseJson you need to stringify the object!` 之前

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.15.6 (2023-02-17)
* (bluefox) Implemented the optional escaping of characters in blockly
* (bluefox) Added the possibility to send updates of states only by changes
* (bluefox) Added option to select the quality of stored images

### 1.15.5 (2023-02-16)
* (bluefox) Added possibility to set `parse_mode` in the text message

### 1.15.2 (2022-11-04)
* (Steff42) Make sure the userid is a string to show warnings in the log
* (bluefox) Added ukrainian language

### 1.15.0 (2022-09-28)
* (klein0r) Fixed custom component (username was missing)
* (klein0r) Translated all objects
* (bluefox) Updated GUI packages and corrected build process

### 1.14.1 (2022-07-04)
* (bluefox) Fixed warnings for `botSendChatId`

## License

The MIT License (MIT)

Copyright (c) 2016-2023, bluefox <dogafox@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.