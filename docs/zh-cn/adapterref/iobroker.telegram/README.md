---
BADGE-GitHub license: https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.telegram
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.telegram.svg
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.telegram
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.telegram
BADGE-GitHub commits since latest release (by date): https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.telegram/latest
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.telegram
BADGE-GitHub issues: https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.telegram
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.telegram.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/telegram-stable.svg
BADGE-Number of Installations: https://iobroker.live/badges/telegram-installed.svg
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.telegram/README.md
title: ioBroker.telegram
hash: LIH4I86GIbO4wPtQSMlDymm3ec/3Yr+mpvSGK9W66kw=
---
![标识](../../../en/admin/telegram.png)

# IoBroker.telegram
＃＃ 配置
请[@BotFather](https://telegram.me/botfather)创建新机器人`/newbot`。

您将被要求输入机器人名称，然后是用户名。

之后，您将获得令牌。

![截屏](../../../en/adapterref/iobroker.telegram/img/chat.png)

您应该在配置对话框中设置通信密码。之后启动适配器。

要与您的机器人开始对话，您需要使用 `/password phrase` 进行用户身份验证，其中 **`phrase`** 是您配置的密码。因此，请在 Telegram 中与您创建的机器人新建对话，然后在第一个命令中输入密码。

**注意：**您可以使用缩写形式`/p phrase`。

要添加漂亮的头像图片，请在 **BotFather** 聊天中输入 `/setuserpic`，然后上传所需的图片（512x512 像素），例如这张 [标识](img/logo.png)。

您可以通过消息框 `sendTo('telegram', 'Test message')` 向所有已认证用户发送消息，也可以向特定用户 `sendTo('telegram', '@userName Test message')` 发送消息。

用户必须事先通过身份验证。

您也可以通过这种方式指定用户：

```javascript
sendTo('telegram', {user: 'UserName', text: 'Test message'}, function (res) {
    console.log('Sent to ' + res + ' users');
});
```

如果您使用上述示例，请注意，您必须将“UserName”替换为您要发送消息的用户的名字或 Telegram 公开用户名。（这取决于适配器设置中的“存储用户名而非名字”选项是否已启用。）如果此选项已启用，且用户未在其 Telegram 帐户中指定公开用户名，则适配器将继续使用用户的名字。请记住，如果用户稍后（在验证您的机器人身份后）设置了公开用户名，则下次用户向机器人发送消息时，已保存的名字将被用户名替换。

您可以指定多个收件人（只需用逗号分隔用户名）。

例如，收件人：“User1,User4,User5”

您也可以通过状态发送消息，只需将状态 *"telegram.INSTANCE.communicate.response"* 的值设置为 *"@userName Test message"* 或使用 JSON 对象即可：

```json
{
    "text": "Test message"
}
```

JSON 语法还允许从 [Telegram 机器人 API](https://core.telegram.org/bots/api) 添加选项，以及设置用户或聊天 ID：

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

要向群组发送消息，您必须先邀请机器人加入您希望它发帖的群组。

通过在 JSON 消息负载中提供 `chat_id`，您实际上可以向这些群组发送消息。

要查找 `chat_id`，您需要将适配器的日志级别设置为 `debug`。

然后，您只需在您希望机器人发送消息的群组中 ping 您的机器人即可。

请确保在消息前面添加 `/`，以便机器人能够看到该消息 ([如果开启了机器人隐私设置](#How-to-receive-messages-in-group-chats-using-telegram-adapter))。

iobroker 日志随后将显示聊天 ID。

＃＃ 用法
您可以使用带有 [text2command](https://github.com/ioBroker/ioBroker.text2command) 适配器的 Telegram。它预定义了通信模式，您可以以文本形式向您的服务器发送命令。

要发送照片，只需发送文件路径而不是文本或 URL：`sendTo('telegram', 'absolute/path/file.png')` 或 `sendTo('telegram', 'https://telegram.org/img/t_logo.png')`。

如何将网络摄像头截图发送到 Telegram：

```javascript
function sendImage() {
    httpGet('https://raw.githubusercontent.com/ioBroker/ioBroker.javascript/master/admin/javascript.png', { responseType: 'arraybuffer' }, async (err, response) => {
        if (err) {
            console.error(err);
        } else {
            const tempFilePath = createTempFile('telegram-image.png', response.data);

            sendTo('telegram.0', 'send', {
                text: tempFilePath,
                caption: 'A wonderful adapter',
                user: 'yourUserName1,yourUserName2',
            });
        }
    });
}

on('0_userdata.0.someState', (obj) => {
    if (obj.state.val) {
        // send 4 images: immediately, in 5, 15 and 30 seconds
        sendImage();
        setTimeout(sendImage, 5000);
        setTimeout(sendImage, 15000);
        setTimeout(sendImage, 30000);
    }
});
```

以下消息仅用于执行操作：

- *打字* - 用于发送短信，
- *upload_photo* - 用于上传照片，
- *upload_video* - 用于视频，
- *record_video* - 用于视频录制，
- *record_audio* - 用于音频录制，
- *upload_audio* - 用于音频，
- *upload_document* - 用于上传文档，
- *find_location* - 用于查找位置数据

在这种情况下，将会发送操作命令。

Telegram API 的描述位于 [这里](https://core.telegram.org/bots/api) 中，您可以通过将其包含在发送对象中来使用此 API 中定义的所有选项。例如：

```javascript
sendTo('telegram.0', 'send', {
    text:                   '/tmp/snap.jpg',
    caption:                'Snapshot',
    disable_notification:   true
});
```

**可能的选择**：

- *disable_notification*：静默发送消息。iOS 用户将不会收到通知，Android 用户将收到无声通知。（所有类型）
- *parse_mode*：发送 Markdown 或 HTML，如果您希望 Telegram 应用在您的机器人消息中显示粗体、斜体、等宽文本或内联 URL。可选值：“Markdown”、“MarkdownV2”、“HTML”（消息）
- *disable_web_page_preview*: 禁用此消息（message）中链接的预览。
- *标题*：文档、照片或视频的标题，0-200 个字符（视频、音频、照片、文档）
- *持续时间*：发送的视频或音频的持续时间（以秒为单位）（音频、视频）
- *表演者*：音频文件（音频）的表演者
- *标题*：音频文件的曲目名称（音频）
- *宽度*：视频宽度（视频）
- *高度*：视频高度（视频）

适配器会尝试根据消息中的文本来检测消息类型（照片、视频、音频、文档、贴纸、操作、位置）。如果文本是现有文件的路径，则会根据该类型发送消息。

将根据纬度和经度属性检测位置：

```javascript
sendTo('telegram.0', 'send', {
    latitude:               52.522430,
    longitude:              13.372234,
    disable_notification:   true
});
```

将根据纬度、经度、名称和地址属性检测场所：

```javascript
sendTo('telegram.0', 'send', {
    latitude:               52.51630462381893,
    longitude:              13.37770039691943,
    title:                  'Brandenburger Tor',
    address:                'Pariser Platz 8, 10117 Berlin',
});
```

### 明确的消息类型
如果您想将数据作为缓冲区发送，则可以额外定义消息类型。

可上传的类型有：*贴纸*、*视频*、*文档*、*音频*、*照片*。

```javascript
sendTo('telegram.0', 'send', {
    text: fs.readFileSync('/opt/path/picture.png'),
    type: 'photo'
});
```

### 从 ioBroker 文件存储或状态（iob:// URI）发送文件
除了本地文件路径或网页 URL 之外，`text` 还可以是 **ioBroker URI**。适配器会解析该 URI，读取内容，并使用自动检测的媒体类型（照片、视频、音频、文档等）发送。当文件存储在 Redis/jsonl 后端的 ioBroker 文件存储中时，此功能尤其有用，因为该文件**并不**存在于本地文件系统中，所以使用普通路径是行不通的。

支持以下方案：

- `iobfile://<adapter.instance>/<path>` — 来自 ioBroker 文件存储的文件。
- `iobstate://<state.id>` — 状态的值（请参阅下文了解如何解释该值）。
- `iobobject://<object.id> /<path> ` — 嵌套在 ioBroker 对象中的值（`path` 通过 `/` 导航到对象内部）。

```javascript
// send a snapshot that another adapter has written into the file storage
sendTo('telegram.0', 'send', {
    user: 'UserName',
    text: 'iobfile://cameras.0/snapshots/front_door.jpg',
    caption: 'Someone is at the front door',
});

// send a file whose full path is stored in a state
sendTo('telegram.0', 'send', {
    text: 'iobstate://0_userdata.0.lastReport',
});

// take a value out of an object
sendTo('telegram.0', 'send', {
    text: 'iobobject://0_userdata.0.myObject/native/document',
});
```

媒体类型由文件扩展名决定（`.jpg`/`.png` → 照片，`.mp4` → 视频，`.mp3`/`.ogg`/`.wav` → 音频，`.gif` → 动画，`.webp` → 贴纸，`.pdf`/`.csv`/`.docx`/... → 文档）。如果扩展名未知，则类型取自存储的 MIME 类型；作为备用方案，内容将以文档形式发送。您仍然可以使用 `type` 选项显式地覆盖此设置。

**状态/对象值的解释方式**（`iobstate://` 和 `iobobject://`）：

- 将**数据 URL**（`data:image/png;base64,...`）解码并以相应的媒体类型发送；
- 如果值本身是 `iob*://` URI 或 `http(s)://` URL，则会进一步解析（最多 5 层嵌套）；
- 任何其他字符串都被视为文件路径/URL；
- 数字、布尔值和对象以文本形式发送（对象被 JSON 字符串化）。

＃＃＃ 键盘
您可以在客户端显示键盘**回复键盘标记**：

```javascript
sendTo('telegram.0', 'send', {
    text: 'Press button',
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

您可以阅读更多 [这里](https://core.telegram.org/bots/api#replykeyboardmarkup)和[这里](https://core.telegram.org/bots#keyboards)。

您可以在客户端显示键盘**内联键盘标记**：

```javascript
sendTo('telegram', 'send', {
    user: 'my_username;username2', // optional. Separator could be ";" or "," or space
    text: 'Click the button',
    reply_markup: {
        inline_keyboard: [
            [{ text: 'Button 1_1', callback_data: '1_1' }],
            [{ text: 'Button 1_2', callback_data: '1_2' }]
        ]
    }
});
```

您可以阅读更多 [这里](https://core.telegram.org/bots/api#inlinekeyboardmarkup)和[这里](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating)。

**注意：** *用户按下回调按钮后，Telegram 客户端会显示进度条，直到您调用 answerCallbackQuery 函数。因此，即使不需要通知用户（例如，不指定任何可选参数），也必须调用 answerCallbackQuery 函数。*

### 答案回调查询
使用此方法可以回复通过内联键盘发送的回调查询。回复将以通知或提示的形式显示在聊天屏幕顶部。成功时，返回 *True*。

```javascript
if (command === '1_2') {
    sendTo('telegram', 'send', {
     user: 'my_username username2', // optional. Separator could be ";" or "," or space
        answerCallbackQuery: {
            text: 'Pressed!',
            showAlert: false, // Optional parameter
        },
   });
}
```

您可以阅读更多 [这里](https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md#telegrambotanswercallbackquerycallbackqueryid-text-showalert-options--promise)。

＃＃＃ 问题
您可以向 Telegram 发送消息，下一个回复将在回调中返回。

回复超时时间可在实例配置中设置（默认为 60 秒）。如果用户未及时回复，回调将返回字符串 `'__timeout__'`（因此 `msg.data` 为 `undefined`）。

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
    if (msg === '__timeout__') {
        console.log('no answer within the configured timeout');
    } else if (msg.data === '1') {
        console.log('user pressed Yes');
    } else {
        console.log('user pressed No');
    }
});
```

**重要提示 – 调用方有自己的超时时间 `sendTo`：** 发送 `ask` 的适配器（例如 JavaScript 适配器）会对其 `sendTo` 回调应用**自己的**超时时间，在 JavaScript 适配器中，此超时时间默认约为 **20 秒**。如果您配置的应答超时时间超过此值，则*调用方*会提前触发回调，并返回超时结果——这看起来像是用户回答了“否”。请增加调用方的超时时间，使其**大于**应答超时时间，例如，在 JavaScript 适配器中，将其作为最后一个参数传递：

```javascript
sendTo('telegram.0', 'ask', {
    text: 'Are you sure?',
    reply_markup: { inline_keyboard: [[{ text: 'Yes!', callback_data: '1' }], [{ text: 'No...', callback_data: '0' }]] }
}, msg => {
    // ... handle msg (see above)
}, { timeout: 65000 }); // must be > the configured answer timeout (here 60 s)
```

聊天 ID
从 0.4.0 版本开始，您可以使用聊天 ID 向聊天室发送消息。

```javascript
sendTo('telegram.0', 'send', {
    text: 'Message to chat',
    chatId: 'SOME-CHAT-ID-123'
});
```

## 线程 ID
您还可以为超级组设置线程 ID。

```javascript
sendTo('telegram.0', 'send', {
    text: 'Message to chat',
    chatId: 'SOME-CHAT-ID-123',
    message_thread_id: 7,
});
```

接收位置信息
当用户与机器人分享位置（回形针 → 位置）或发送场所时，坐标会以字符串 `latitude;longitude` 的形式写入状态 `telegram.INSTANCE.communicate.requestLocation`（角色 `value.gps`）。元数据状态（`requestChatId`、`requestMessageId`、`requestUserId`）也会更新，以便您知道是谁发送的。

```javascript
on({ id: 'telegram.0.communicate.requestLocation', change: 'any' }, obj => {
    const [latitude, longitude] = obj.state.val.split(';').map(parseFloat);
    const user = getState('telegram.0.communicate.requestUserId').val;
    console.log(`User ${user} is at ${latitude}, ${longitude}`);
    // e.g. forward the coordinates to a map widget
});
```

## 接收频道帖子
如果机器人是某个频道的管理员，则该频道中发布的帖子也会被接收，并以 `[channel title]text` 的形式写入 `telegram.INSTANCE.communicate.request`（与 `communicate.requestChatId` 和 `communicate.requestMessageId` 一起）。频道帖子是匿名的（没有发送者用户），因此身份验证/命令处理不适用于它们——它们仅作为请求公开。任何附加的媒体都会像普通消息一样保存，并且该频道会被添加到 `communicate.chats` 中。

## 已知的聊天和群组
机器人收到的每个聊天或群组消息都会以 JSON 对象 `id => { title, type }` 的形式存储在状态 `telegram.INSTANCE.communicate.chats` 中（其中 `type` 为 `private`、`group`、`supergroup` 或 `channel` 之一）。这便于查找群组的聊天 ID（例如，让其他适配器选择要发送消息的群组）。将机器人添加到群组并发送一条消息，即可使该群组显示出来。

```json
{
    "1234567": { "title": "John Doe", "type": "private" },
    "-1001234567890": { "title": "My smart home group", "type": "supergroup" }
}
```

列表会被持久化保存，因此即使适配器重启后仍然有效。发送时请使用聊天 ID 作为 `chatId`：

```javascript
sendTo('telegram.0', 'send', { text: 'Hello group', chatId: '-1001234567890' });
```

## 更新消息
以下方法允许您修改消息历史记录中的现有消息，而不是发送包含操作结果的新消息。这对于使用回调查询的*内联键盘*消息最为有用，但也有助于减少与普通聊天机器人对话中的冗余信息。

### 编辑消息文本
使用此方法可以编辑机器人发送或通过机器人发送的文本（适用于内联机器人）。成功后，如果机器人发送了编辑后的消息，则返回编辑后的消息；否则返回 *True*。

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

*或最后一条消息的新文本：*

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

您可以阅读更多 [这里](https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md#telegramboteditmessagetexttext-options--promise)。

### 编辑消息标题
使用此方法可以编辑机器人发送或通过机器人发送的消息标题（适用于内联机器人）。

成功后，如果机器人发送了编辑后的消息，则返回编辑后的消息；否则返回 *True*。

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

您可以阅读更多 [这里](https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md#telegramboteditmessagetexttext-options--promise)。

### 编辑消息媒体
使用此方法可以编辑机器人发送或通过机器人发送的消息图片（适用于内联机器人）。

成功后，如果机器人发送了编辑后的消息，则返回编辑后的消息；否则返回 *True*。

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

您可以阅读更多 [这里](https://core.telegram.org/bots/api#editmessagemedia)。

### 编辑消息回复标记
使用此方法仅编辑机器人发送或通过机器人发送的消息的回复标记（适用于内联机器人）。成功后，如果机器人发送了编辑后的消息，则返回编辑后的消息；否则返回 *True*。

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

您可以阅读更多 [这里](https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md#telegramboteditmessagereplymarkupreplymarkup-options--promise)。

### 删除消息
使用此方法可以删除邮件（包括服务邮件），但存在以下限制：

- 只有在发送时间不超过 48 小时的消息才能删除。

成功时返回*True*。

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

您可以阅读更多 [这里](https://github.com/yagop/node-telegram-bot-api/blob/master/doc/api.md#TelegramBot+deleteMessage)。

## 对用户回复/消息做出反应
假设您仅使用 JavaScript，未使用 `text2command`。

您已使用 `sendTo()` 向用户发送了一条消息/问题，如上所述。

用户通过点击按钮或输入消息进行回复。

您可以提取该命令并向用户提供反馈，执行命令或在 iobroker 中切换状态。

- telegram.0 是您要使用的 iobroker Telegram 实例。
用户是指已在您的 TelegramBot 注册并发送消息的用户
- 命令是您的 TelegramBot 收到的命令。

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
如果您知道 ID，则可以请求获取状态的值：

```
/state system.adapter.admin.0.memHeapTotal
> 56.45
```

### /state stateName value - 设置状态值
如果您知道 ID，则可以设置状态值：

```
/state hm-rpc.0.JEQ0ABCDE.3.STOP true
> Done
```

## 轮询或服务器模式
如果使用轮询模式，适配器默认每 300 毫秒轮询一次 Telegram 服务器以获取更新。这会消耗流量，并且消息可能会延迟最多 300 毫秒。轮询间隔可以在适配器配置中定义。

要使用服务器模式，您的 ioBroker 实例必须可从互联网访问（例如，使用 `noip.com` 动态 DNS 服务）。

Telegram 只能与 HTTPS 服务器配合使用，但您可以使用 **let's encrypt** 证书。

服务器模式需要提供以下设置：

- URL - 格式为 https://yourdomain.com:8443。
- IP 地址 - 服务器将绑定到的 IP 地址。默认值为 0.0.0.0。如果您不确定，请勿更改。
- 端口 - 实际上 Telegram 只支持 443、80、88、8443 端口，但您可以通过路由器将端口转发给任何人。
- 公钥证书 - 如果 **let's encrypt** 被禁用，则需要此证书。
- 私钥 - 如果 **let's encrypt** 已禁用，则需要此密钥。
- 链式证书（可选）
- Let's Encrypt 选项 - 设置 Let's Encrypt 证书非常简单。请阅读[此处](https://github.com/ioBroker/ioBroker.admin#lets-encrypt-certificates)了解更多信息。

高级安全
可以禁用用户身份验证。这样一来，任何新用户都无法进行身份验证。

要创建受信任用户列表，首先禁用“不验证新用户”选项，然后通过发送 `/password <PASSWORD>` 消息来验证所有应该在受信任列表中的用户。

发送有效密码的用户将被添加到信任列表中。

之后，可以启用“不验证新用户身份”选项，这样就不会有新用户能够通过身份验证。

要使用此选项，必须启用“记住已验证用户”选项。

## 通过 Telegram 通话
借助 [callmebot](https://www.callmebot.com/) api，您可以调用您的 Telegram 帐户，并通过 TTS 引擎朗读一些文本。

要通过 JavaScript 适配器实现这一点，只需调用：

```javascript
sendTo('telegram.0', 'call', 'Some text');
```

或者

```javascript
sendTo('telegram.0', 'call', {
    text: 'Some text',
    user: '@Username', // optional and the call will be done to the first user in telegram.0.communicate.users.
    lang: 'de-DE-Standard-A', // optional and the system language will be taken
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

语言选项的可能值：

- `ar-XA-Standard-A` - 阿拉伯语（女声）
- `ar-XA-Standard-B` - 阿拉伯语（男声）
- `ar-XA-Standard-C` - 阿拉伯语（男声 2）
- `cs-CZ-Standard-A` - 捷克语（捷克共和国）（女声）
- `da-DK-Standard-A` - 丹麦语（丹麦）（女声）
- `nl-NL-Standard-A` - 荷兰语（荷兰）（女声 - 如果系统语言为荷兰语且未提供语言，则使用此语音）
- `nl-NL-Standard-B` - 荷兰语（男声）
- `nl-NL-Standard-C` - 荷兰语（男声 2）
- `nl-NL-Standard-D` - 荷兰语（荷兰）（女声 2）
- `nl-NL-Standard-E` - 荷兰语（荷兰）（女声 3）
- `en-AU-Standard-A` - 英语（澳大利亚）（女声）
- `en-AU-Standard-B` - 英语（澳大利亚）（男声）
- `en-AU-Standard-C` - 英语（澳大利亚）（女声 2）
- `en-AU-Standard-D` - 英语（澳大利亚）（男声 2 声）
- `en-IN-Standard-A` - 英语（印度）（女声）
- `en-IN-Standard-B` - 英语（印度）（男声）
- `en-IN-Standard-C` - 英语（印度）（男声 2）
- `en-GB-Standard-A` - 英语（英国）（女声 - 如果系统语言为英语且未指定语言，则使用此语音）
- `en-GB-Standard-B` - 英语（英国）（男声）
- `en-GB-Standard-C` - 英语（英国）（女声 2）
- `en-GB-Standard-D` - 英语（英国）（男声 2）
- `en-US-Standard-B` - 英语（美国）（男声）
- `en-US-Standard-C` - 英语（美国）（女声）
- `en-US-Standard-D` - 英语（美国）（男声 2）
- `en-US-Standard-E` - 英语（美国）（女声 2）
- `fil-PH-Standard-A` - 菲律宾语（菲律宾）（女声）
- `fi-FI-Standard-A` - 芬兰语（芬兰）（女声）
- `fr-CA-Standard-A` - 法语（加拿大）（女声）
- `fr-CA-Standard-B` - 法语（加拿大）（男声）
- `fr-CA-Standard-C` - 法语（加拿大）（女声 2）
- `fr-CA-Standard-D` - 法语（加拿大）（男声 2）
- `fr-FR-Standard-A` - 法语（法国）（女声 - 如果系统语言为法语且未指定语言，则使用此语音）
- `fr-FR-Standard-B` - 法语（法国）（男声）
- `fr-FR-Standard-C` - 法语（法国）（女声 2）
- `fr-FR-Standard-D` - 法语（法国）（男声 2）
- `de-DE-Standard-A` - 德语（德国）（女声 - 如果系统语言为德语且未指定语言，则使用此语音）
- `de-DE-Standard-B` - 德语（德国）（男声）
- `el-GR-Standard-A` - 希腊语（希腊）（女声）
- `hi-IN-Standard-A` - 印地语（印度）（女声）
- `hi-IN-Standard-B` - 印地语（印度）（男声）
- `hi-IN-Standard-C` - 印地语（印度）（男声 2）
- `hu-HU-Standard-A` - 匈牙利语（匈牙利）（女声）
- `id-ID-Standard-A` - 印尼语（印度尼西亚）（女声）
- `id-ID-Standard-B` - 印尼语（印度尼西亚）（男声）
- `id-ID-Standard-C` - 印尼语（印度尼西亚）（男声 2）
- `it-IT-Standard-A` - 意大利语（意大利）（女声 - 如果系统语言为 IT 且未提供语言，则将使用此语音）
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
- `ko-KR-Standard-D` - 韩语（韩国）（男声 2 声）
- `cmn-CN-Standard-A` - 普通话（女声）
- `cmn-CN-Standard-B` - 普通话（男声）
- `cmn-CN-Standard-C` - 普通话（男声 2）
- `nb-NO-Standard-A` - 挪威语（挪威）（女声）
- `nb-NO-Standard-B` - 挪威语（挪威）（男声）
- `nb-NO-Standard-C` - 挪威语（挪威）（女声 2 声部）
- `nb-NO-Standard-D` - 挪威语（挪威）（男声 2）
- `nb-no-Standard-E` - 挪威语（挪威）（女声 3 声部）
- `pl-PL-Standard-A` - 波兰语（波兰）（女声 - 如果系统语言为波兰语且未指定语言，则使用此语音）
- `pl-PL-Standard-B` - 波兰语（男声）
- `pl-PL-Standard-C` - 波兰语（男声 2）
- `pl-PL-Standard-D` - 波兰语（波兰）（女声 2）
- `pl-PL-Standard-E` - 波兰语（波兰）（女声 3 声部）
- `pt-BR-Standard-A` - 葡萄牙语（巴西）（女声 - 如果系统语言为葡萄牙语且未指定语言，则使用此语音）
- `pt-PT-Standard-A` - 葡萄牙语（葡萄牙）（女声）
- `pt-PT-Standard-B` - 葡萄牙语（葡萄牙）（男声）
- `pt-PT-Standard-C` - 葡萄牙语（葡萄牙）（男声 2）
- `pt-PT-Standard-D` - 葡萄牙语（葡萄牙）（女声 2）
- `ru-RU-Standard-A` - 俄语（俄罗斯）（女声 - 如果系统语言为俄语且未指定语言，则使用此语音）
- `ru-RU-Standard-B` - 俄语（俄罗斯）（男声）
- `ru-RU-Standard-C` - 俄语（俄罗斯）（女声 2）
- `ru-RU-Standard-D` - 俄语（俄罗斯）（男声 2）
- `sk-SK-Standard-A` - 斯洛伐克语（斯洛伐克）（女声）
- `es-ES-Standard-A` - 西班牙语（西班牙）（女声 - 如果系统语言为 ES 且未指定语言，则使用此语音）
- `sv-SE-Standard-A` - 瑞典语（瑞典）（女声）
- `tr-TR-Standard-A` - 土耳其语（土耳其）（女声）
- `tr-TR-Standard-B` - 土耳其语（土耳其）（男声）
- `tr-TR-Standard-C` - 土耳其语（土耳其）（女声 2）
- `tr-TR-Standard-D` - 土耳其语（土耳其）（女声 3 音）
- `tr-TR-Standard-E` - 土耳其语（土耳其）（男声）
- `uk-UA-Standard-A` - 乌克兰语（乌克兰）（女声）
- `vi-VN-Standard-A` - 越南语（越南）（女声）
- `vi-VN-Standard-B` - 越南语（越南）（男声）
- `vi-VN-Standard-C` - 越南语（越南）（女声 2）
- `vi-VN-Standard-D` - 越南语（越南）（男声 2）

待办事项：

场地

## 根据管理员设置自动插入键盘（简易键盘）
每个州都可以启用其他设置：

![设置](../../../en/adapterref/iobroker.telegram/img/stateSettings.png)

输入`/cmds`后，Telegram 中将显示以下键盘：

![设置](../../../en/adapterref/iobroker.telegram/img/stateSettings1.png)

在 Telegram 适配器的配置对话框中，`/cmds` 可以替换为任何文本（例如“？”）。

如果在 Telegram 适配器的配置对话框中启用了“使用键盘命令访问房间”选项，则第一步将显示房间列表。***尚未实现***

### 状态设置
首先，必须启用该配置。

#### 别名
设备名称。如果名称为空，则名称将从对象中获取。

输入“门灯”后，将显示以下布尔状态菜单。

![设置](../../../en/adapterref/iobroker.telegram/img/stateSettings2.png)

您可以打开设备、关闭设备或查询设备状态。

如果您点击 `Door lamp ?`，您将获得 `Door lamp  => switched off`。

### 只读
如果激活，将不会显示 ON/OFF 按钮，只会显示 `Door lamp ?`。

### 报告变更
如果设备状态发生变化（例如，有人手动打开了灯），新的状态将发送到 Telegram。

例如：`Door lamp  => switched on`。

### 一字排开的按钮
一个设备一行中应该显示多少个按钮？

由于名称较长，或许一行中只显示 2 个（甚至 1 个）按钮会更好。

![设置](../../../en/adapterref/iobroker.telegram/img/stateSettings3.png)

### 只写
如果启用，状态查询（`Door lamp ?`）按钮将不会显示。

![设置](../../../en/adapterref/iobroker.telegram/img/stateSettings4.png)

### 开启命令
按钮 `ON` 上将显示哪些文本？

例如：![设置](../../../en/adapterref/iobroker.telegram/img/stateSettings5.png)

将生成以下键盘：![设置](../../../en/adapterref/iobroker.telegram/img/stateSettings6.png)

### 开启文本
状态报告中将显示的文本。

例如，如果设备状态变为真，则显示 `Door lamp => activated`，且**开启文本**为 `activated`。

只有当“报告更改”功能启用时，才会显示开/关文本。

### 关闭命令
与 **ON 命令** 相同，但用于 OFF。

### 关闭文本
与“开启文本”相同，但用于“关闭”状态。

例如，如果设备状态变为 false，则文本为 `Door lamp => deactivated`，而“关闭文本”为 `deactivated`。

### 仅此而已
例如，对于按钮而言，它们没有“关闭”状态。在这种情况下，“关闭”按钮将不会显示。

![设置](../../../en/adapterref/iobroker.telegram/img/stateSettings7.png)

## 如何使用 Telegram 适配器在群聊中接收消息
如果 Telegram 机器人能够接收用户在私聊中发送的消息，但无法接收用户在群聊中发送的消息，

在这种情况下，您需要联系 `@botfather` 并禁用隐私模式。

BotFather聊天：

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

## 如何通过 Node-RED 发送消息
对于向所有用户发送简单的文本消息，只需将文本放在消息的有效负载中，并将其发送到 ioBroker 状态 `telegram.INSTANCE.communicate.response`。

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

在将其发送至 `telegram.INSTANCE.communicate.responseJson you need to stringify the object!` 之前

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 5.0.0-alpha.0 (2026-07-10)
- (@GermanBluefox) Channel posts (from a channel where the bot is an admin) are now received and written to `communicate.request`/`communicate.requestChatId` (previously ignored)
- (@GermanBluefox) Robustness: all `setState` calls now catch their errors (via a `setStateSafe` helper), so a failing state write can no longer cause an unhandled promise rejection
- (@GermanBluefox) Added the state `communicate.chats`: every chat/group the bot receives a message from is remembered as JSON (`id => {title, type}`), so other adapters can offer a chat/group picker
- (@GermanBluefox) Outgoing messages that fail because telegram is unreachable are now queued in memory and resent automatically once the connection is back (bounded queue, permanent errors like "chat not found" are not retried)
- (@GermanBluefox) Documented that an unanswered `ask` returns the string `'__timeout__'`, and that the calling adapter's own `sendTo` timeout (JavaScript adapter defaults to ~20 s) must be larger than the configured answer timeout - otherwise the callback fires early (looks like a "No" answer)
- (@GermanBluefox) A received location or venue is now written to the new state `communicate.requestLocation` as `latitude;longitude` (role `value.gps`), so it can be shown e.g. on a map
- (@GermanBluefox) Fixed: recipients can now be mixed by username and first name in one list - a recipient without a public telegram username is matched by first name even when "store username" is active
- (@GermanBluefox) Added the missing translations for the configuration labels (API URL, port, certificates, media quality, ...) in all languages
- (@GermanBluefox) Robustness: all telegram API calls now catch their errors, so a failing call can no longer terminate the adapter with an unhandled promise rejection
- (@GermanBluefox) The inline keyboard of a broadcast `ask` question is now removed for the user who answered (taken from the pressed callback message)
- (@GermanBluefox) Fixed: the adapter no longer crashes (unhandled promise rejection) when the inline keyboard of an answered/timed-out `ask` question cannot be removed (e.g. "message to edit not found")
- (@GermanBluefox) Fixed: `deleteMessage`/`editMessage*` without an explicit `user`/`chatId` is now executed once for the chat given in its options instead of being broadcast to every user (which made the other users fail)
- (@GermanBluefox) The caption of a received photo/video/document is now written to `communicate.request` (like a normal text message), so image captions are no longer lost
- (@GermanBluefox) Added a "Parsemode" option to the "ask via Telegram" Blockly block, so questions can be formatted with HTML/MarkdownV2
- (@GermanBluefox) Added support for sending files directly from the ioBroker file storage via `iobfile://`, `iobobject://` and `iobstate://` URIs (works with Redis/jsonl where the file is not on the local filesystem)
- (@GermanBluefox) The `/password` message is now deleted from the chat after a successful authentication
- (@GermanBluefox) Fixed: `requestChatId`/`requestMessageId`/`requestUserId` are now set when receiving a photo, document or other media
- (@GermanBluefox) Fixed: sending to a recipient by numeric user id (`{ user: "12345" }`) now works
- (@GermanBluefox) Fixed: no longer crashes when a system notification contains an empty messages list
- (@GermanBluefox) Added an optional `ioBroker.assistant` instance: messages that no internal rule/command matched are forwarded to it and its answer is sent back to the chat
- (@GermanBluefox) Migrated the adapter backend to TypeScript; texts are now provided as `i18n` JSON files loaded via `I18n`
- (@GermanBluefox) The target instance is now checked to be alive before a message is forwarded (text2command/assistant)
- (@GermanBluefox) States without a value are now reported as "uncertain" instead of showing an unset boolean as "ON"
- (@GermanBluefox) Timers are now managed by the adapter and cleared on unload (including pending question timeouts)
- (@GermanBluefox) Fixed: the "allow states" option could not be disabled
- (@GermanBluefox) Fixed: a question timeout could drop other pending questions
- (@GermanBluefox) Fixed: `communicate.responseSilentJson` acknowledged the wrong state
- (@GermanBluefox) Fixed: removed a stray empty entry from the generated command keyboard
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
* (@klein0r) admin 7.6.17 and js-controller 6.0.11 (or later) are required
* (@klein0r) Updated dependencies

### 4.1.0 (2025-03-19)
* (bluefox) Admin component was migrated to TypeScript
* (bluefox) Node.js >= 20.x and js-controller >= 6 and admin >= 7 are required now.

### 4.0.0 (2025-01-13)
* NodeJS >= 20.x and js-controller >= 6 are required
* (simatec) Responsive Design added
* (klein0r) Allow async function calls in ask callback function

### 3.9.0 (2024-07-22)
* (klein0r) Added option to send venue (with title and address)

### 3.8.2 (2024-07-16)
* (bluefox) Username can consist of more than one user. The separator is comma, semicolon or space.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

The MIT License (MIT)

Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
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