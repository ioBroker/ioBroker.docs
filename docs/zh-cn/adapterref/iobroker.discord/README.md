---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.discord.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.discord.svg
BADGE-Number of Installations: https://iobroker.live/badges/discord-installed.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/discord-stable.svg
BADGE-NPM: https://nodei.co/npm/iobroker.discord.png?downloads=true
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.discord/README.md
title: ioBroker.discord
hash: fwhN9kYXwbAjv4bBtaRUFug5VEuhoZQiwxttfhG/WOM=
---
# IoBroker.discord
![标识](../../../de/adapterref/iobroker.discord/../../admin/discord.png)

这个 [ioBroker] 适配器将 [Discord] 机器人集成到 ioBroker 中。

适配器创建一个对象树，其中包含表示机器人的服务器和通道的对象和状态。
此外，还会为机器人看到的所有用户创建一个对象树。
然后可以通过这些状态通过 Discord 接收消息并发送消息和文件。

此外，适配器可以注册 Discord Slash 命令。
然后可以通过它查询或设置 ioBroker 状态。

* [函数](#函数)
* [创建不和谐机器人](#create-a-discord-bot)
* [将机器人添加到服务器](#add-the-bot-to-a-server)
  * [从服务器中删除机器人](#remove-the-bot-from-a-server)
* [状态](#states-states)
  * [discord.0.bot.*](#discord0bot)
  * [discord.0.servers.\<server-id\>.*](#discord0serversserver-id)
  * [discord.0.servers.\<server-id\>.channels.\<channel-id\>.*](#discord0serversserver-idchannelschannel-id)
  * [discord.0.servers.\<server-id\>.members.\<user-id\>.*](#discord0serversserver-idmembersuser-id)
  * [discord.0.users.\<user-id\>.*](#discord0usersuser-id)
  * [discord.0.slashCommands.\<command-name\>.*](#discord0slashcommandscommand-name)
  * [discord.0.raw.*](#discord0raw)
* [授权](#授权)
* [消息](#messages)
  * [收到的消息](#messages-received)
    * [使用 text2command](#use-of-text2command)
  * [发送消息](#发送消息)
    * [发送简单文本](#senden-simple-texts)
    * [发送文件](#sending-files)
    * [发送反应](#send-reactions)
    * [发送回复](#sending-responses)
    * [发送特殊自定义消息](#sending-special-custom-messages)
* [斜线命令]（#斜线命令）
  * [配置斜杠命令的状态](#configure-states-for-slash-commands)
  * [查询状态](#states-query)
  * [设置状态](#set-states)
  * [使用斜杠命令配置获取状态概览](#get-an-overview-of-states-with-configurations-for-slash-commands)
  * [自定义斜线命令](#custom-slash-commands)
    * [自定义斜线命令的 json 状态的结构](#structure-of-a-json-state-of-custom-slash-commands)
* [块]（#块）
  * [Blockly 示例：向用户发送消息并在三秒后处理它](#blockly-example-send-a-message-to-a-user-and-process-it-after-three-seconds)
  * [Blockly 示例：发送带有嵌入和两个文件附件的复合消息](#blockly-example-sending-a-compound-message-with-an-embed-and-two-file-attachments)
  * [阻止示例：响应自定义斜杠命令并发送请求的 IP cam 的图像](#blockly-example-react-to-custom-slash-command-and-send-image-of-requested-ip-cam)
* [在脚本中的使用](#usage-in-scripts)
  * [在脚本中发送消息](#sending-a-message-in-a-script)
  * [在脚本中编辑消息](#edit-a-message-in-a-script)
  * [删除脚本中的消息](#deleting-a-message-in-a-script)
  * [在脚本中的消息中添加反应表情符号](#add-reaction-emoji-to-a-message-in-a-script)
  * [等待脚本中消息的反应](#waiting-for-reactions-to-a-message-in-a-script)
  * [回复脚本中的自定义斜杠命令](#reply-to-custom-slash-commands-in-a-script)
  * [在脚本中请求有关服务器的信息](#request-information-about-a-server-in-a-script)
  * [在脚本中请求有关服务器通道的信息](#Request-information-about-a-server-channel-in-a-script)
  * [在脚本中请求有关用户的信息](#request-information-about-a-user-in-a-script)
  * [在脚本中请求有关服务器成员的信息](#request-information-about-a-server-member-in-a-script)
  * [请求脚本中上一条消息的信息](#request-information-about-a-previous-message-in-a-script)

＃＃ 功能
* 用于接收和发送消息的机器人所有服务器的 ioBroker 状态
* ioBroker 为机器人看到的所有用户接收和发送直接消息的状态
* 简化了机器人加入和离开 Discord 服务器的过程
* 设置机器人状态，包括动作
* 可选择监控用户的存在状态
* 可选择监控用户的语音状态
* 服务器成员的语音操作（静音、聋哑、断开连接）
* 处理所有消息，或仅处理服务器频道中提及机器人的消息
* 处理直接消息
* 可选择使用表情符号自动回复机器人的提及
* `.json` 通道、用户和消息数据的状态
* 使用 JSON 格式发送消息、文件、反应（表情符号）、回复或自定义消息内容
* 服务器和频道成员列表，包括分配的角色
* Discord 斜线命令支持获取和设置状态值
* 支持可在自定义脚本中执行的自定义 Discord Slash 命令（包括 Blockly）。
* [text2command] 支持（必须为每个 `.message` 状态单独启用）
* 在自定义脚本中发送、编辑和删除消息，发送和等待消息的响应
* 可选的原始状态在自定义脚本中提供更大的灵活性
* Blockly 支持自定义块，用于发送和编辑消息以及处理自定义斜杠命令

*不*支持和*不*打算做什么：

* 线程中的消息
* 发送和接收语音信息

是否缺少功能？只需在 [GitHub][GitHub New Issue] 上创建一个功能请求。

## 创建一个 Discord 机器人
要使用此适配器，需要创建 Discord Bot 应用程序。

1. 前往 [Discord Developer Portal] 并使用您的 Discord 帐户登录（如果尚未登录）。
2. 在_Applications_ 视图中，单击右上角的_New Application_ 按钮。

[![新应用程序](../en/media/bot-creation-1.png)](../../../de/adapterref/iobroker.discord/../en/media/bot-creation-1.png)

3. 为应用程序选择一个名称（这将是机器人的名称）并单击_创建_。

[![应用程序名称](../en/media/bot-creation-2.png)](../../../de/adapterref/iobroker.discord/../en/media/bot-creation-2.png)

4.（可选）上传_App Icon_，更改名称（_Name_），更改描述（_Description_），添加一些_Tags_并保存更改（_Save Changes_）。

[![应用程序设置](../en/media/bot-creation-3.png)](../../../de/adapterref/iobroker.discord/../en/media/bot-creation-3.png)

5. 导航至左侧菜单中的_Bot_，然后单击_Add Bot_ 按钮。

[![添加机器人](../en/media/bot-creation-4.png)](../../../de/adapterref/iobroker.discord/../en/media/bot-creation-4.png)在以下对话框中单击_是的，执行此操作！_以确认机器人的创建。

6. bot创建完成后，需要点击一次_Reset Token_按钮来获取bot token。

[![重置令牌](../en/media/bot-creation-5.png)](../../../de/adapterref/iobroker.discord/../en/media/bot-creation-5.png)因为这将使之前的所有令牌失效，您必须在弹出的对话框中使用按钮_是的，执行此操作！_确认这一点。
之后，机器人令牌将显示**一次**，您应该将其复制到安全的地方（例如适配器实例配置）。

7. 在 _Bot_ 页面上，向下滚动到 _Privileged Gateway Intents_ 并启用 _Presence Intent_、_Server Members Intent_ 和 _Message Content Intent_。不要忘记保存更改（_Save Changes_）。

[![特权网关意图](../en/media/bot-creation-6.png)](../../../de/adapterref/iobroker.discord/../en/media/bot-creation-6.png)注意：一旦机器人出现在 100 多台服务器上，这些意图将需要 Discord 的验证和批准。

8. 现在一切准备就绪，可以启动适配器实例，然后将机器人添加到不和谐服务器。

## 将机器人添加到服务器
要将机器人添加到服务器，您可以使用适配器实例配置中的_将机器人添加到服务器_选项卡。
那里将出现一个链接，允许将机器人添加到服务器，并正确设置所有必要的权限和范围。

[![将机器人添加到服务器](./media/bot-add-to-server.png)](../../../de/adapterref/iobroker.discord/./media/bot-zu-server-hinzufuegen.png)

适配器需要以下机器人权限：

* 更改昵称
*阅读新闻/查看频道
* 中等会员
* 发送信息
* 嵌入链接
* 附加文件
* 阅读消息历史
* 提及所有人
* 添加反应
*静音成员
* 聋人成员
* 移动成员

此外，还需要以下应用领域：

* 机器人
*应用程序.commands

如果缺少权限或范围，则适配器的某些功能将不起作用。

### 从服务器中删除机器人
要再次从服务器中删除机器人，在适配器实例配置的同一页面的下方，您可以选择一个服务器，然后单击 _Leave Server!_ 按钮告诉机器人离开服务器。

＃＃ 状态
每个服务器、通道和用户都由其唯一的数字 ID 标识。
因为名称可以更改，所以适配器创建的对象树使用这些 ID 来创建可靠的结构。

整个对象树是根据机器人可以看到的内容生成的。
因此，例如，服务器上的频道可能比显示的频道多。

### Discord.0.bot.*
|姓名 |说明 |
|---|---|
| `activityType`|机器人活动的类型。可能的值为`PLAYING`、`STREAMING`、`LISTENING`、`WATCHING`、`COMPETING`或空字符串。 |
| `status`|机器人的存在状态。可能的值为`online`、`idle`、`dnd`和`invisible`。 |
| `状态` |机器人的存在状态。可能的值是`online`、`idle`、`dnd`和`invisible`。 |

这些状态用于设置机器人的存在状态和活动，因为它应该向用户显示。

### Discord.0.servers.\<server-id\>.*
|姓名 |说明 |
|---|---|
| `channels.*`|服务器频道。 |
| `成员。*` |服务器的成员。 |

### Discord.0.servers.\<server-id\>.channels.\<channel-id\>.*
|姓名 |说明 |
|---|---|
| `channels.*`|只有当频道是一个类别时才会出现。那里的结构与服务器通道的结构相同。 |
| `members`|频道成员（显示名称）的逗号分隔列表。 |
| `message`|此频道中最后收到的消息。 |
| `messageId`|最后收到的消息的 ID。 |
| `messageAuthor`|最后收到的消息的作者（用户标签）。 |
| `messageTimestamp`|最后收到的消息的时间戳。 |
| `messageJson`|最后收到的消息的 JSON 数据。 |
| `send`|发送文本或 JSON 格式的消息。 |
| `sendFile`|发送文件。 |
| `sendReply`|发送对消息的回复。 |
| `sendReaction`|向消息发送反应（表情符号）。 |
| `json`|频道信息的 JSON 数据。 |
| `json` |频道信息的 JSON 数据。 |

对于所有 `message*` 和 `send*` 状态，请参阅下面的 _Messages_ 部分。

### Discord.0.servers.\<server-id\>.members.\<user-id\>.*
|姓名 |说明 |
|---|---|
| `tag`|用户在 Discord 中的唯一标签。 |
| `roles`|服务器上用户角色的逗号分隔列表。 |
| `joinedAt`|用户加入服务器的时间戳。 |
| `voiceChannel`|用户当前连接的语音通道，如果未连接，则为空字符串。 |
| `voiceDisconnect`|用于断开用户与语音通道的按钮。 |
| `voiceSelfDeaf`|指示用户是否已将自己变成聋子。 |
| `voiceSelfMute`|指示用户是否已将自己静音。 |
| `voiceServerDeaf`|指示用户是否已被服务器设为聋。也可用于更改此状态。 |
| `voiceServerMute`|指示用户是否已被服务器静音。也可用于更改此状态。 |
| `json`|用户信息的 JSON 数据。 |
| `json` |用户信息的 JSON 数据。 |

为了使`voice*` 状态保持最新，必须在实例配置中启用_观察用户的语音聊天状态_选项。
要使用 `voiceDisconnect`、`voiceServerDeaf` 和 `voiceServerMute` 操作，机器人必须在服务器上具有适当的权限。

### Discord.0.users.\<userid\>.*
|姓名 |说明 |
|---|---|
| `tag`|用户在 Discord 中的唯一标签。 |
| `activityType`|用户当前活动的性质。 `PLAYING`、`STREAMING`、`LISTENING`、`WATCHING`、`COMPETING`、`CUSTOM`之一或空字符串。 |
| `activityName`|用户当前活动的名称。例如，`PLAYING`期间的游戏名称。 |
| `avatarUrl`|用户头像的 URL。 |
| `bot`|指示用户是否是机器人。 |
| `message`|最后收到的用户直接消息。 |
| `messageId`|最后收到的来自用户的直接消息的 ID。 |
| `messageTimestamp`|最后收到的来自用户的直接消息的时间戳。 |
| `messageJson`|最后收到的来自用户的直接消息的 JSON 数据。 |
| `send`|发送文本或 JSON 格式的消息。 |
| `sendFile`|发送文件。 |
| `sendReply`|发送对消息的回复。 |
| `sendReaction`|向消息发送反应（表情符号）。 |
| `json`|用户信息的 JSON 数据。 |
| `json` |用户信息的 JSON 数据。 |

为了使 `status` 和 `activity*` 状态保持最新，必须在实例配置中启用 _Observe user presence_ 选项。

对于所有 `message*` 和 `send*` 状态，请参阅下面的 _Messages_ 部分。

### Discord.0.slashCommands.\<command-name\>.*
此外，当在适配器的实例配置中启用自定义命令时，存在以下状态。

每次调用自定义命令时，都会更新所有这些状态。

|姓名 |说明 |
|---|---|
| `json`|上次使用命令的 JSON 数据。包含个别状态中未包含的一些附加信息。 |
| `userId`|调用命令的用户 ID。 |
| `userTag`|调用命令的用户的唯一标签。 |
| `channelId`|调用命令的通道 ID。 |
| `serverId`|调用命令的服务器的 ID，如果在直接消息中调用命令，则为 `null`。 |
| `timestamp`|上次使用命令的时间戳。 |
| `option-*`|为命令指定的选项。为每个配置的选项创建一个单独的状态。如果在调用命令时未指定选项，则关联状态设置为 `null`。 |
| `option-*`|为命令配置的选项。 |
| `option-*.value`|调用命令时为选项指定的最后一个值。如果未指定选项，则关联状态设置为`null`。 |
| `option-*.choices`| JSON 数组，包含此选项的预定义选项。仅适用于文本类型选项。示例：`["Wert 1", "Wert 2", { "name": "Wert 3", "value": "w3" }]`|
| `sendReply`|向调用的命令发送响应。与频道或用户的 `.send` 状态一样，这可以是字符串或 JSON 对象。请参阅下面的_新闻_部分。 |
| `发送回复` |向调用的命令发送响应。与通道或用户 `.send` 状态一样，这可以是字符串或 JSON 对象。请参阅下面的_新闻_部分。 |

**注意：** 建议在您自己的脚本中使用 `json` 状态以避免重叠。
示例：当用户再次调用命令时，自定义脚本会读取各个 `option-*` 状态，并且命令的第一次和第二次调用的选项会混淆。

### Discord.0.raw.*
此外，当在适配器的实例配置中启用原始状态时，还有以下状态。

**注意：** 这些状态包含未经适配器任何检查、过滤或修改的原始数据。服务器被称为公会。

|姓名 |说明 |
|---|---|
| `messageJson`|最后收到的消息的原始 JSON 数据。 （频道消息和直接消息）|
| `interactionJson` |收到的最后一次交互的原始 JSON 数据。 （例如斜杠命令）|

＃＃ 授权
默认情况下，授权是启用的，只有授权用户才能与适配器交互。

授权用户和服务器角色可以在适配器的实例配置中设置，包括每个用户/角色的权限。
对于服务器角色，权限仅适用于该服务器，而不适用于其他服务器，也不适用于直接消息。
如果已为每个用户和服务器角色分配了权限，则这些权限将合并到相应的服务器。

用户和角色由其内部 ID 标识，因此即使更改用户标签、用户名或角色名称也不会影响授权。

也可以取消授权。但是，只有当机器人的所有服务器上的所有用户都可以信任时，才应该这样做！

＃＃ 消息
适配器能够接收和发送来自 Discord 文本通道和用户的消息。

默认情况下，只有提到机器人的消息才会在频道中处理。
为了也处理没有提及的消息，必须在实例配置中激活选项_处理服务器通道中的所有消息_。

如果收到提及机器人的消息，则适配器会使用表情符号响应该消息。
这可以在适配器的实例配置中进行调整。
如果启用了授权，则机器人将仅响应授权用户的提及。

### 收到的消息
接收到的消息被放置在通道消息的相应通道对象或直接消息的用户对象的`.message*`状态中。

默认情况下，启用授权时，仅归档来自授权用户的消息。
这可以通过适配器实例配置中的_处理来自未授权用户的消息_选项进行调整，以便也丢弃来自未授权用户的消息。

每个频道/用户最后收到的消息始终存储在 `.message` 状态。
最后收到的消息的时间戳、作者和 ID 存储在相关状态中。
此外，所有这些信息也以 JSON 格式存储在 `.messageJson` 状态。

#### 使用 text2command
要使用 text2command，必须在适配器的实例配置中选择一个 text2command 实例。

对于每个 `.message` 状态，可以启用自定义设置 _enable text2command for this state_。
如果激活，则接收到的消息将发送到选定的 text2command 实例。

来自 text2command 的响应由适配器作为回复、作为普通消息或根本不发送，具体取决于适配器的实例配置。

＃＃＃ 发送信息
要发送消息，可以将内容写入频道或用户的 `.send*` 状态。

#### 发送简单的文本
要发送简单文本，只需将文本写入所需目的地的`.send` 状态。
[Discord Markdown] 可用于格式化文本，就像在 Discord 客户端中一样。

要提及用户，用户 ID 可以以`<@Benutzer-ID>`的形式使用。
`<@&Gruppen-ID>`可用于提及群组，`<#Kanal-ID>`可用于频道。

示例：`Dies ist meine Nachricht.`、`Dies ist _meine_ **formatierte** Nachricht.`、`Hey <@490222742801481728>!`

＃＃＃＃ 发送文件
要将文件作为附件发送，请将文件的位置写入所需目的地的 `.sendFile` 状态。

文件的位置可以是...

* 本地文件的绝对或相对路径。

相对路径是相对于 ioBroker 安装的适配器目录的。
路径可以选择以 `file://` 作为前缀。
示例：`/home/user/image.png`、`../../iobroker-data/files/myfile.txt`、`file:///tmp/image.jpg`

* 远程文件的 URL。

  示例：`https://www.iobroker.dev/images/iobroker.png`

* Base64 编码的文件内容。

  示例：`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACzklEQVQ4y3WTy2tcdRTHP+d3753HncncmbaJiYvEhZrU+ii2urJgFCyCLnykpbQrsbR/gRQaXPUPUHBlH4ogUsRSqq7qLtlZrQpKg6Uu1OCkSWZ65859zfzucTExsYLf3Tl8zznf85JHZ5+cVuGcMebg0YXXHN/3UVVAqfk1VJV+HCMiAKRpyuXPr1hrixsCZ10VzgEnXMeRF+afJwgaFIUC0Go1UYVOp4OYUYIoivjiyjWszecUMMaYAyXPk7m5R8jznCjqk2YpjuMQhj1AcT2XLM3oR30GgyFB0KDkeWKMOeAeP7ZgDh16jizNeO/9Dwh7PR7ft5ejRxa49tXXvPnG6yRJzNWrX/LDjz8xMTHOu4tnKJXLLC0tG1OtViVoNKhWK9wLQ9pr6yRJwtTUJC/Oz3P9+jckccrk5APcXd+g3V6jUqkwiqmKKwKIMBrbCKpw585vvHNmkT17dvHQzAylUhkjZocnggi4I0+BAML9sEXBX+27XLj0MXGSMLR2h6cFKLh+zSdoNlHYXtW/oaq019a3bRGhPlYnaDbxaz5GVflHV7lcYlcrYJRH+V9s8VUVN4r6bG5ugginT52k2+ny/c2bADjGMDG+m073HlmWbyvq9XoURUEU9TGO4+C4DsPBgI31DZIkwVqLAs8+8zQnjh/j1Vdevq84Iriei+M4GABByLKMTz+7zMWPPuHBqSkGgwGdbpeZ6WmiXu+/g9nu0E2SRMMwJMty6rUa+596gsOHX+L8hUvEcUyp5PH7H38yMb4bgMbYGFmWE4YhSZKozO3b/7PruI/Nzj7MybffotVqYYwhjmPq9TpBo8Hq6iqFjkpmWcaH5y+ysnKboR3+4lpbfGdtvvfWrV+lUi5T8jyKoqBeq9FqBqiC7/sYM7qAnggrK7fJ8lyBG67AWQWstQeXlpd33lmhVt96535/60aENE0YWmuBbwUW/wZQx0cNXLu4ygAAAABJRU5ErkJggg==`

此外，可以将文本消息添加到文件中。只需写下文件的位置，后跟管道字符 `|` 和处于 `.sendFile` 状态的消息。
示例：`/tmp/image.png|Dies ist meine Datei`、`https://www.iobroker.dev/images/iobroker.png|Das ioBroker Logo`

#### 发送反应
`.sendReaction` 状态可用于使用表情符号对先前的消息做出反应。只需在状态下写表情符号。

默认情况下，响应会发送到其 ID 当前包含在相关 `.messageId` 状态中的消息。

如果要对特定消息进行操作，则可以将消息 ID 后跟管道字符 `|` 和表情符号写入 `.sendReaction` 状态。

示例：`👍`、`971032590515568660|👍`

#### 发送回复
`.sendReply` 状态可用于回复之前的消息。
为此，只需在状态中写入响应。

默认情况下，回复将发送到其 ID 当前包含在相关 `.messageId` 状态中的消息。

如果要回复特定消息，则消息 ID 后跟管道字符 `|` 和回复可以写入 `.sendReply` 状态。

示例：`Dies ist eine Antwort.`、`971032590515568660|Dies ist eine Antwort.`

#### 发送特殊的自定义消息
也可以通过将 JSON 消息对象写入 `.send` 或 `.sendReply` 状态来发送特殊自定义消息。

JSON 对象必须是 `MessageOptions` 类型。
有关更多信息，请参阅 [discord.js MessageOptions 文档][MessageOptions]。

例子：

发送图片：

```json
{
  "files": [
    {
      "attachment": "/tmp/image.jpg",
      "name": "image.jpg",
      "description": "Mein tolles Bild"
    }
  ]
}
```

发送嵌入内容：

```json
{
  "content": "Verwende das:",
  "embeds": [
    {
      "title": "ioBorker.discord",
      "description": "Discord Adapter für ioBroker",
      "color": "#5865f2",
      "url": "https://github.com/crycode-de/ioBroker.discord",
      "author": {
        "name": "Peter Müller",
        "url": "https://github.com/crycode-de"
      },
      "image": {
        "url": "https://github.com/crycode-de/ioBroker.discord/raw/main/admin/discord.png"
      },
      "footer": {
        "text": "❤👍"
      }
    }
  ]
}
```

从本地源发送嵌入图像：

```json
{
  "embeds": [
    {
      "title": "IP-Cam Alarm",
      "description": "Schau dir das an:",
      "color": "#ff0000",
      "image": {
        "url": "attachment://cam.jpg"
      }
    }
  ],
  "files": [
    {
      "attachment": "http://192.168.1.50:8080/ip-cam.jpg",
      "name": "cam.jpg"
    }
  ]
}
```

## 斜线命令
如果在适配器的实例配置中启用，适配器可以使用不和谐斜杠命令。这些命令可用于查询或设置 ioBroker 状态。

**注意：** 可用于 Discord 斜杠命令的状态必须单独配置。见下文。

Discord 斜线命令可以由适配器注册为服务器命令（默认）或全局命令。这可以在适配器的实例配置中设置。
使用服务器命令的优点是对命令的更改（例如添加状态）会立即应用且不会延迟。
但是，服务器命令不能用于用户和机器人之间的直接消息。
全局命令也可以在直接消息中使用，但是对命令的任何更改可能需要长达一个小时才能被 Discord 反映。这是 Discord 的限制，而不是适配器。

使用的默认斜杠命令是 `/iob-get` 和 `/iob-set`。
可以在适配器的实例配置中自定义命令的名称和描述。

### 配置斜杠命令的状态
对于应该通过 Discord 斜杠命令可用的每个状态，这需要在状态的自定义设置中启用。
为此，只需单击 Admin 中_Objects_ 视图中的_Custom Settings_ 齿轮图标，启用适配器实例的设置并选中选项_Enable Discord commands for this state_。

[![启用 Discord 命令](./media/slash-command-configuration-1.png)](../../../de/adapterref/iobroker.discord/./media/slash-befehl-konfiguration-1.png)

[![启用 Discord 命令](./media/slash-command-configuration-2.png)](../../../de/adapterref/iobroker.discord/./media/slash-befehl-konfiguration-2.png)

可以为每个状态定义一个 _Name_ 和一个 _Alias_ 以在 Discord 中使用。
_Name_ 用于命令的自动完成，_Alias_ 作为内部标识。两者的长度都不得超过 100 个字符。

可以为每个状态单独指定是否可用于查询和/或设置。
另外，可以激活在查询时显示信息，如果相应的状态没有被确认，或者在设置时总是要设置确认。

对于数据类型`string`的状态，可以选择将值视为文件（文件的位置）。
如果这被激活，则状态的当前值将与`.sendFile` 状态一样发送。
例如，这使得通过查询命令请求图像成为可能。

对于数据类型`number`的状态，可以指定查询命令中四舍五入的小数位数。

对于数据类型`boolean`的状态，可以定义`true`和`false`的用户定义值，然后用于显示的查询命令和检测的设置命令。

### 查询状态
要查询状态，只需在 Discord 客户端中调用 `/iob-get Zustandsalias`。
对于`Zustandsalias`，在键入命令时会显示自动完成。

每个值都按照状态对象及其自定义设置中的指定格式化输出。
可选地，如果没有确认状态，则添加信息。

### 设置状态
要查询状态，只需在 Discord 客户端中调用 `/iob-set Zustandsalias Neuer-Wert`。
对于`Zustandsalias`，在键入命令时会显示自动完成。
当状态的数据类型为`boolean`或`number`时，适配器会解析`Neuer-Wert`。

根据状态，可以单独配置是否应在确认或不确认的情况下设置该值。

对于数据类型`boolean`的状态，值`true`，`on`，`yes`，`1`及其相应的翻译（`wahr`，§ §SSSSS_6§ §, `ja`)，而为状态配置的 _True Value_ 被解释为 `true`。
任何其他值都被解释为`false`。

对于数据类型`number`的状态，指定的值被解释为十进制数。
如果 ioBroker 安装配置为使用逗号作为小数分隔符，则可以使用逗号或句点作为小数分隔符指定数字。否则，仅允许将句点用作小数分隔符。
如果在状态对象中指定了`min`和`max`的值，那么也会检查这些值。

### 使用斜杠命令的配置获取状态概览
为了获得斜杠命令的活动配置的所有状态的概览，可以在适配器的实例配置中单击按钮 _Log state objects configured for commands_。然后输出在 ioBroker 安装的日志中。

### 自定义斜杠命令
可以在适配器的实例配置中激活和配置自己的斜杠命令。
然后将配置的自定义命令与标准 get 和 set 命令一起注册到 Discord。

可以将选项添加到每个自定义命令。
这些选项随后将出现在该命令的 Discord 客户端中。
如果在调用命令时未指定选项，则该选项包含值 `null`。
对于 _Text_ 类型的选项，可以在关联的 `option-*.choices` 状态中将动态预定义的选项指定为 JSON 数组。

当调用用户定义的命令时，相关数据被写入相关状态。请参阅上面_States_ 部分中的状态描述。

包括选项在内的所有信息都写入命令的 `.json` 状态。
此状态主要用于接收脚本中的命令数据，因为所有必要的信息都存储在一个地方，因此即使在短时间内调用多个命令也不会混淆。
对于 _User_、_Role_、_Channel_ 或 _Mentionable_ 类型的选项，选项对象中会填充其他字段。

**注意：** 命令必须自行评估，然后向命令发送响应。例如，您可以使用自己的脚本来执行此操作。
必须在 15 分钟内通过 `.sendReply` 状态或相关的 `sendTo(...)` 操作发送响应。
如果在该时间内没有发送响应，则 Discord 客户端将显示错误_应用程序未响应_。

**注意：** 可以多次发送对命令调用的响应。
答案将被编辑并被新内容覆盖。

#### 自定义斜杠命令的 json 状态结构
```js
{
  interactionId: string,
  commandName: string,
  user: {
    id: string,
    tag: string,
    displayName: string,
  },
  channelId: string,
  serverId: string | null,
  timestamp: number,
  options: {
    [string]: {
      value: string | number | boolean | null,
      type: 'STRING' | 'NUMBER' | 'BOOLEAN' | 'USER' | 'ROLE' | 'CHANNEL' | 'MENTIONABLE' | null,
      user?: { // wenn type USER oder MENIONABLE ist
        id: string,
        tag: string,
        bot: boolean,
      },
      member?: { // wenn type USER oder MENIONABLE ist und der Befehl auf einem Server aufgerufen wurde
        id: string,
        displayName: string,
        roles: { id: string, name: string }[],
      },
      role?: { // wenn type ROLE oder MENTIONABLE ist
        id: string,
        name: string,
      },
      channel?: { // wenn type CHANNEL ist
        id: string,
        name: string,
        type: 'GUILD_CATEGORY' | 'GUILD_NEWS' | 'GUILD_STAGE_VOICE' | 'GUILD_STORE' | 'GUILD_TEXT' | 'GUILD_VOICE',
        lastMessageId: string | null,
      },
    },
    // ...
  }
}
```

## 块状
该适配器带有自己的 Blockly 块，用于...

* 向用户或服务器频道发送消息
*在直接消息或服务器频道中编辑消息
* 在消息中添加表情符号反应
* 使用可选的嵌入、附件和回复参考来组装消息内容
* 组装消息嵌入
* 合并邮件附件
* 对自定义斜杠命令做出反应
* 回复自定义斜杠命令

### Blockly 示例：向用户发送消息并在三秒后对其进行编辑
[![发送和编辑 Blockly 消息](./media/blockly-1.png)](../../../de/adapterref/iobroker.discord/./media/blockly-1.png)

<details><summary>块状代码</summary>

```xml
<xml xmlns="https://developers.google.com/blockly/xml">
  <variables>
    <variable id="KIILW$,(eB?pT`;GDuMF">messageId</variable>
  </variables>
  <block type="discord_send_message_user" id="?xkCV};-Lk_-|Q`]%(Gt" x="63" y="38">
    <field name="instance">.0</field>
    <field name="logResultOk">FALSE</field>
    <value name="user">
      <shadow type="text" id="jXN@CluUy_M/ig@4[(Uk">
        <field name="TEXT">cryCode#9911</field>
      </shadow>
    </value>
    <value name="content">
      <shadow type="text" id="uLWu1CJ$;k}|VTyw1-8}">
        <field name="TEXT">Hallo!</field>
      </shadow>
    </value>
    <value name="varMessageId">
      <shadow type="logic_null" id="bJ2lJW0qOa@Zjv%(]mFU"></shadow>
      <block type="variables_get" id="xkJ(vH/;@7%)cDo0HU/~">
        <field name="VAR" id="KIILW$,(eB?pT`;GDuMF">messageId</field>
      </block>
    </value>
    <value name="varError">
      <shadow type="logic_null" id="H:f+1-:p9-YkmpehJoco"></shadow>
    </value>
    <next>
      <block type="timeouts_wait" id="OM8gv}Pl#_mHQ|)([mUe">
        <field name="DELAY">3</field>
        <field name="UNIT">sec</field>
        <next>
          <block type="discord_edit_message_user" id="|L3A+9{s_H8j`AF@,*VF">
            <field name="instance">.0</field>
            <field name="logResultOk">FALSE</field>
            <value name="user">
              <shadow type="text" id="voJ:{uuYtbBZ!Xe,rtV|">
                <field name="TEXT">cryCode#9911</field>
              </shadow>
            </value>
            <value name="messageId">
              <shadow type="text" id="64L=tOKvKwoqGHadRgDm">
                <field name="TEXT"></field>
              </shadow>
              <block type="variables_get" id="(M^6xk74LUEsPdH=LagL">
                <field name="VAR" id="KIILW$,(eB?pT`;GDuMF">messageId</field>
              </block>
            </value>
            <value name="content">
              <shadow type="text" id="rvnV^RF,g$M/3+(npHNC">
                <field name="TEXT">Moin!</field>
              </shadow>
            </value>
            <value name="varError">
              <shadow type="logic_null" id="{H4Q^vl400kxRKrffDz)"></shadow>
            </value>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>
```

</详情>

### Blockly 示例：发送带有嵌入和两个文件附件的复合消息
[![发送块状复合消息](./media/blockly-2.png)](../../../de/adapterref/iobroker.discord/./media/blockly-2.png)

<details><summary>块状代码</summary>

```xml
<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="discord_send_message_server_channel" id="Mnc=pB-8%Dr/nsen|SC`" x="63" y="38">
    <field name="instance">.0</field>
    <field name="logResultOk">FALSE</field>
    <value name="serverId">
      <shadow type="text" id="PA4]t;7CuDrKtwa|oB?L">
        <field name="TEXT">813364154118963251</field>
      </shadow>
    </value>
    <value name="channelId">
      <shadow type="text" id="x^vm,CRT`z2AhDT#ZcUC">
        <field name="TEXT">813364154559102998</field>
      </shadow>
    </value>
    <value name="content">
      <shadow type="text" id="ebdEp~G?:_gInjN47g@f">
        <field name="TEXT"></field>
      </shadow>
      <block type="discord_create_content" id="kY,/zwmwkjo:U;cT?eN*">
        <value name="content">
          <shadow type="text" id="D|y(g`oE@H#gu+deGbv2">
            <field name="TEXT"></field>
          </shadow>
        </value>
        <value name="embeds">
          <shadow type="logic_null" id="Qt[pG25wLoI8+3/jN66C"></shadow>
          <block type="discord_create_embed" id="cXAWtP-36uYlAxLhIBhN">
            <value name="description">
              <shadow type="text" id="^D%m:ic9]AcUUQP8~U#6">
                <field name="TEXT">Eingebetteter Anhang</field>
              </shadow>
            </value>
            <value name="title">
              <shadow type="logic_null" id="_Wm.(^Ff6^u%K+gVz$^Z"></shadow>
            </value>
            <value name="url">
              <shadow type="logic_null" id="0,08A!7[kJ-nJPnPH$L5"></shadow>
            </value>
            <value name="color">
              <shadow type="colour_picker" id="V0}MlQJvN._LHFhG2K%@">
                <field name="COLOUR">#5865f2</field>
              </shadow>
            </value>
            <value name="imageUrl">
              <shadow type="logic_null" id="xXr:E++u0;@2#e]r;_`]"></shadow>
              <block type="text" id="76;;p-5{pls%KmrI!ar{">
                <field name="TEXT">attachment://datei1.jpg</field>
              </block>
            </value>
            <value name="footerText">
              <shadow type="logic_null" id="#BS`MgkNWbrQ@*m/kNdw"></shadow>
            </value>
          </block>
        </value>
        <value name="files">
          <shadow type="logic_null" id="4u@7^DXCI~J$r{Qx}1Ql"></shadow>
          <block type="lists_create_with" id="42g8r-+[xWw`|^.qOF!*">
            <mutation items="2"></mutation>
            <value name="ADD0">
              <block type="discord_create_file" id="EzK4NA^+bu4vChH/vj-b">
                <value name="attachment">
                  <shadow type="text" id="=OEkBZ:LFXvT2$S++21(">
                    <field name="TEXT">/tmp/datei1.jpg</field>
                  </shadow>
                </value>
                <value name="name">
                  <shadow type="text" id="zum#q*|`aD%A2s/N@/Ow">
                    <field name="TEXT">datei1.jpg</field>
                  </shadow>
                </value>
                <value name="description">
                  <shadow type="text" id="#ZZOq%3EHO/_GC+w.,-^">
                    <field name="TEXT"></field>
                  </shadow>
                </value>
              </block>
            </value>
            <value name="ADD1">
              <block type="discord_create_file" id="wIKo-2??SX@WcYc7e/5s">
                <value name="attachment">
                  <shadow type="text" id=")4lvYv.)IhU/p+~KUDym">
                    <field name="TEXT">/tmp/logdatei.txt</field>
                  </shadow>
                </value>
                <value name="name">
                  <shadow type="text" id="#)t#lK6{$RuZt34O;@Ag">
                    <field name="TEXT">log.txt</field>
                  </shadow>
                </value>
                <value name="description">
                  <shadow type="text" id="^UKzs+$TQ!tiE:`(=%}}">
                    <field name="TEXT"></field>
                  </shadow>
                </value>
              </block>
            </value>
          </block>
        </value>
        <value name="replyToId">
          <shadow type="logic_null" id="#1:[?d^x=)ZH.!uyxRI:"></shadow>
        </value>
      </block>
    </value>
    <value name="varMessageId">
      <shadow type="logic_null" id="@D^#9^84UknOfV|c$NK~"></shadow>
    </value>
    <value name="varError">
      <shadow type="logic_null" id="mJu{Fa9+]+Ml,{_OqIOh"></shadow>
    </value>
  </block>
</xml>
```

</详情>

### Blockly 示例：响应自定义斜杠命令并发送请求的 IP cam 的图像
[![块自定义斜线命令](./media/blockly-3.png)](../../../de/adapterref/iobroker.discord/./media/blockly-3.png)

<details><summary>块状代码</summary>

```xml
<xml xmlns="https://developers.google.com/blockly/xml">
  <variables>
    <variable id="Wcj[Gmy,vX]b,)s,O)`U">interactionId</variable>
    <variable id="{sXn[Mn@ZN#fWtTV6O^;">userTag</variable>
    <variable id="ULmVI=-QcXLnD!e60KTV">camID</variable>
  </variables>
  <block type="discord_on_custom_cmd" id="GE,i32wKhz%KGlBhV$j=" x="63" y="13">
    <mutation xmlns="http://www.w3.org/1999/xhtml" options="cam"></mutation>
    <field name="instance">.0</field>
    <field name="varInteractionId" id="Wcj[Gmy,vX]b,)s,O)`U">interactionId</field>
    <field name="log">FALSE</field>
    <field name="commandName">super-command</field>
    <value name="varUserId">
      <shadow type="logic_null" id="/}0,E!Gq=C2U]C^.8m1@"></shadow>
    </value>
    <value name="varUserTag">
      <shadow type="logic_null" id="+r2I4SpfhuW%9DE21,[c"></shadow>
      <block type="variables_get" id="Q=v?u?yU}Tw*@FH*|x7.">
        <field name="VAR" id="{sXn[Mn@ZN#fWtTV6O^;">userTag</field>
      </block>
    </value>
    <value name="option0">
      <shadow type="logic_null" id="hL^g}gJg-b.+SOH0s9m1"></shadow>
      <block type="variables_get" id="z/Lf|chD)~Ge0N~@EWG%">
        <field name="VAR" id="ULmVI=-QcXLnD!e60KTV">camID</field>
      </block>
    </value>
    <statement name="STATEMENT">
      <block type="discord_send_custom_command_reply" id="zJXF!F=|Xt4.kG/6ctl(">
        <field name="instance">.0</field>
        <field name="interactionId" id="Wcj[Gmy,vX]b,)s,O)`U">interactionId</field>
        <field name="logResultOk">FALSE</field>
        <value name="content">
          <shadow type="text" id="bdVm59S9_U*GFB(IBO6x">
            <field name="TEXT"></field>
          </shadow>
          <block type="discord_create_content" id="6m8gBtp;K@t8}{`9gPd1">
            <value name="content">
              <shadow type="text" id=".c}Z71nQ8LlQ@h}_Z?qR">
                <field name="TEXT"></field>
              </shadow>
              <block type="text_join" id="Z{wQ$[1g7z?KPMSHB],Y">
                <mutation items="3"></mutation>
                <value name="ADD0">
                  <block type="text" id="cuzUE7GB$#gC*;nOQ|Ke">
                    <field name="TEXT">Hi </field>
                  </block>
                </value>
                <value name="ADD1">
                  <block type="variables_get" id="|[[T@|n1Ro{EU56/jJ@P">
                    <field name="VAR" id="{sXn[Mn@ZN#fWtTV6O^;">userTag</field>
                  </block>
                </value>
                <value name="ADD2">
                  <block type="text" id="LV$kS:Gzv#cJ#gXe/{4a">
                    <field name="TEXT">!</field>
                  </block>
                </value>
              </block>
            </value>
            <value name="embeds">
              <shadow type="logic_null" id="p8S?*FLv4a6aIJogCKU;"></shadow>
            </value>
            <value name="files">
              <shadow type="logic_null" id="y#a8q/mr^)Ymt*j)S:H/"></shadow>
              <block type="discord_create_file" id="vN%eoP74=*)f63CQiJ__">
                <value name="attachment">
                  <shadow type="text" id="2$9y5yj3.GHx.ms*:Ce2">
                    <field name="TEXT"></field>
                  </shadow>
                  <block type="text_join" id="K9zuKTz?-b8VT$8XUVQ8">
                    <mutation items="3"></mutation>
                    <value name="ADD0">
                      <block type="text" id="p3f^[{6t+UuDJN=49+#Z">
                        <field name="TEXT">/tmp/cam</field>
                      </block>
                    </value>
                    <value name="ADD1">
                      <block type="variables_get" id="oVmVHEX[iT(-X#]m=[U@">
                        <field name="VAR" id="ULmVI=-QcXLnD!e60KTV">camID</field>
                      </block>
                    </value>
                    <value name="ADD2">
                      <block type="text" id="wUXx)@u6*2,+9!q{W`n`">
                        <field name="TEXT">.jpg</field>
                      </block>
                    </value>
                  </block>
                </value>
                <value name="name">
                  <shadow type="text" id="L5fO_+by.^Z:se~6|xCj">
                    <field name="TEXT">cam.jpg</field>
                  </shadow>
                </value>
                <value name="description">
                  <shadow type="text" id="ku}h+v)9oY;1`[9Rr)w%">
                    <field name="TEXT"></field>
                  </shadow>
                </value>
              </block>
            </value>
            <value name="replyToId">
              <shadow type="logic_null" id="Ou%Gd6C*+2OaIPUxPp}t"></shadow>
            </value>
          </block>
        </value>
        <value name="varMessageId">
          <shadow type="logic_null" id="RUb!i][5`[t0*mzLwBvN"></shadow>
        </value>
        <value name="varError">
          <shadow type="logic_null" id="SLsj^+8=[Bp%/X8n]$?Z"></shadow>
        </value>
      </block>
    </statement>
  </block>
</xml>
```

</详情>

## 在脚本中使用
在脚本中，函数`sendTo(...)`可用于与适配器实例交互。

_注意：_ 使用的所有 ID 都是字符串。

### 在脚本中发送消息
要发送消息，可以使用 `send` 或 `sendMessage` 命令。它们都是相同的。

`sendTo(...)` 的 `message` 部分必须是带有 `content` 的对象以发送和以下参数之一来识别目的地：

* `用户ID`
* `用户标签`
* `serverId` 和 `channelId`

`content` 可以是简单的字符串或 [MessageOptions] 对象。

`sendTo(...)`回调中的返回值是一个包含消息参数和`result`字符串的对象，以及成功发送的不和谐消息的`messageId`或§§SSSSS_3§ § 出现错误时的消息。

例子：

```js
// Senden einer Nachricht zu einem Benutzer
sendTo('discord.0', 'sendMessage', {
  userTag: 'cryCode#9911',
  content: 'Hi!',
}, (ret) => {
  log(ret);
  // {'result':'Message sent to user cryCode#9911','userTag':'cryCode#9911','content':'Hi!','messageId':'971779972052160552'}

  if (ret.error) {
    log(ret.error, 'error');
    return;
  }
  log(`Nachricht gesendet mit ID ${ret.messageId}`);
});

// Senden einer Antwort zu einem Benutzer
sendTo('discord.0', 'sendMessage', {
  userId: '490222742801481728',
  content: {
    content: 'Ok!',
    reply: {
      messageReference: '971779972052160552', // ID der Nachricht, auf die geantwortet werden soll
    },
  },
}, (ret) => {
  log(ret);
  // {'result':'Message sent to user cryCode#9911','userId':'490222742801481728','content':{'content':'Ok!','reply':{'messageReference':'971779972052160552'}},'messageId':'971786369401761832'}
});

// Senden einer Datei an einen Serverkanal
sendTo('discord.0', 'sendMessage', {
  serverId: '813364154118963251',
  channelId: '813364154559102998',
  content: {
    content: 'Schau dir das an:',
    files: [
      {
        attachment: "/tmp/image.jpg",
        name: "image.jpg",
        description: "Mein tolles Bild"
      },
    ],
  },
}, (ret) => {
  log(ret);
  // {'result':'Message sent to channel Allgemein','serverId':'813364154118963251','channelId':'813364154559102998','content':{'content':'Schau dir das an:','files':[{'attachment':'/tmp/image.jpg','name':'image.jpg','description':'Mein tolles Bild'}]},'messageId':'971780152759558234'}
});
```

### 在脚本中编辑消息
可以使用 `editMessage` 命令编辑以前的消息。
当然，只能编辑机器人发送的消息。

`sendTo(...)`的`message`部分与`sendMessage`（见上文）相同，只是添加了待处理消息的`messageId`。

返回值与`sendMessage`的相同。

例子：

```js
// Eine Nachricht bearbeiten
sendTo('discord.0', 'editMessage', {
  userTag: 'cryCode#9911',
  content: 'Hallo!',
  messageId: '971495175367049276',
}, (ret) => {
  log(ret);
  // {'result':'Message edited','userTag':'cryCode#9911','content':'Hallo!','messageId':'971495175367049276'}
});

// Nachricht senden und nach fünf Sekunden bearbeiten
sendTo('discord.0', 'sendMessage', {
    userTag: 'cryCode#9911',
    content: 'Es ist jetzt: ' + new Date().toLocaleString(),
}, (ret) => {
  if (ret.error) {
    log(ret.error, 'error');
    return;
  }
  setTimeout(() => {
    sendTo('discord.0', 'editMessage', {
      userTag: 'cryCode#9911',
      content:  'Es ist jetzt: ' + new Date().toLocaleString(),
      messageId: ret.messageId,
    }, (ret2) => {
      log(ret2);
      // {'result':'Message edited','userTag':'cryCode#9911','content':'Es ist jetzt: 5.5.2022, 16:25:38','messageId':'971779692166266920'}
    });
  }, 5000);
});
```

### 删除脚本中的消息
可以使用 `deleteMessage` 命令删除之前的消息。
当然，只能删除机器人发送的消息。

`sendTo(...)`的`message`部分与`sendMessage`相同（见上文），但没有`content`，但增加了消息的`messageId` , 将被删除。

返回值与`sendMessage`的相同。

例子：

```js
// Löschen einer Nachricht
sendTo('discord.0', 'deleteMessage', {
  userTag: 'cryCode#9911',
  messageId: '971495175367049276',
}, (ret) => {
  log(ret);
  // {'result':'Message deleted','userTag':'cryCode#9911','messageId':'971495175367049276'}
});
```

### 在脚本中的消息中添加反应表情符号
可以通过 `addReaction` 命令将反应（表情符号）添加到先前的消息中。

`sendTo(...)`的`message`部分与`sendMessage`相同（见上文），但没有`content`，但增加了消息的`messageId` ，应该对此做出反应，以及`emoji`。

返回值与`sendMessage`的相同。

例子：

```js
// Hinzufügen einer Reaktion auf eine Nachricht
sendTo('discord.0', 'addReaction', {
  userTag: 'cryCode#9911',
  messageId: '971786369401761832',
  emoji: '😎',
}, (ret) => {
  log(ret);
  // {'result':'Reaction added to message','userTag':'cryCode#9911','messageId':'971786369401761832','emoji':'😎'}
});
```

### 等待脚本中消息的反应
可以使用 `awaitMessageReaction` 命令等待对先前消息的反应（表情符号）。

`sendTo(...)`的`message`部分与`editMessage`相同（见上文），但没有`content`，但多了一个`timeout`和一个§§SSSSS_5 §§ 数字。

`timeout`是收集反应的最大等待时间，范围从 100 到 60000 毫秒。

`max` 数字决定了要收集的最大反应数。
如果未指定，默认为 1。

`sendTo(...)`的回调在达到最大等待时间或指定的反应次数时被调用。
返回值是一个包含消息参数和一个`reactions`数组的对象。每个响应都是`emoji`、`emojiId`和`users`的对象，其中`users`是具有`id`和`tag`的对象数组。
如果一个反应是一个普通的表情符号，那么它是`emojiId``null`。
对于自定义表情符号，`emoji` 包含表情符号的名称，`emojiId` 包含表情符号的 ID。

```js
sendTo('discord.0', 'awaitMessageReaction', {
  serverId: '813364154118963251',
  channelId: '813364154559102998',
  messageId: '970754574879162458',
  timeout: 10000,
  max: 3,
}, (ret) => {
  log(ret);
  // {'reactions':[{'emoji':'👍','emojiId':null,'users':[{'id':'490222742801481728','tag':'cryCode#9911'}]}],'serverId':'813364154118963251','channelId':'813364154559102998','messageId':'970754574879162458','timeout':10000,'max':3}
});
```

### 回复脚本中的自定义斜杠命令
`sendCustomCommandReply` 命令可用于发送对自定义命令调用的响应。

`sendTo(...)`的`message`部分必须是带有`content`发送和命令调用的`interactionId`的对象。

`content` 可以是简单的字符串或 [MessageOptions] 对象（如 `sendMessage`）。

```js
on({ id: 'discord.0.slashCommands.iob-test.json', change: 'any', ack: true }, (obj) => {
  log(`Benutzerdefinierter Slash-Befehl ${obj.state.val}`);
  // Benutzerdefinierter Slash-Befehl {"interactionId":"977265764136517725","commandName":"iob-test","channelId":"813364154559102998","serverId":"813364154118963251","user":{"id":"490222742801481728","tag":"cryCode#9911","displayName":"Peter"},"timestamp":1653068714890,"options":{"myopt":{"value":"test","type":"STRING"}}}

  const data = JSON.parse(obj.state.val);

  let reply;
  if (data.options.myopt.value) {
    reply = {
      content: `Du hast mir "${data.options.myopt.value}" gegeben.`,
      embeds: [
        {
          title: 'Das ist großartig!',
          color: '#00AA00',
        },
      ],
    };
  } else {
    reply = `Du hast mir nichts gegeben. 🤨`;
  }

  sendTo('discord.0', 'sendCustomCommandReply', {
    interactionId: data.interactionId,
    content: reply,
  }, (ret) => {
    log(ret);
    // {'result':'Reply sent','interactionId':'977265764136517725','content':{'content':'Du hast mir \'test\' gegeben.','embeds':[{'title':'Das ist großartig!','color':'#00AA00'}]},'messageId':'977265765122183248'}
  });
});
```

### 在脚本中获取有关服务器的信息
```js
sendTo('discord.0', 'getServerInfo', {
  serverId: '813364154118963251',
}, (ret) => {
  log(ret);
});
```

### 在脚本中获取有关服务器通道的信息
```js
sendTo('discord.0', 'getChannelInfo', {
  serverId: '813364154118963251',
  channelId: '813364154559102998',
}, (ret) => {
  log(ret);
});
```

### 在脚本中获取有关用户的信息
```js
sendTo('discord.0', 'getUserInfo', {
  userId: '490222742801481728',
}, (ret) => {
  log(ret);
});
```

```js
sendTo('discord.0', 'getUserInfo', {
  userTag: 'cryCode#9911',
}, (ret) => {
  log(ret);
});
```

### 在脚本中获取有关服务器成员的信息
```js
sendTo('discord.0', 'getServerMemberInfo', {
  serverId: '813364154118963251',
  userId: '490222742801481728',
}, (ret) => {
  log(ret);
});
```

```js
sendTo('discord.0', 'getServerMemberInfo', {
  serverId: '813364154118963251',
  userTag: 'cryCode#9911',
}, (ret) => {
  log(ret);
});
```

### 获取有关脚本中上一条消息的信息
```js
sendTo('discord.0', 'getMessageInfo', {
  serverId: '813364154118963251',
  channelId: '813364154559102998',
  messageId: '978252795763359794',
}, (ret) => {
  log(ret);
});
```

```js
sendTo('discord.0', 'getMessageInfo', {
  userId: '490222742801481728',
  messageId: '976090572760694814',
}, (ret) => {
  log(ret);
});
```

```js
sendTo('discord.0', 'getMessageInfo', {
  userTag: 'cryCode#9911',
  messageId: '976090572760694814',
}, (ret) => {
  log(ret);
});
```

[ioBroker]: https://www.iobroker.net

[Discord]: https://discord.com

[text2command]: https://github.com/ioBroker/ioBroker.text2command

[GitHub New Issue]: https://github.com/crycode-de/ioBroker.discord/issues/new/choose

[Discord Developer Portal]: https://discord.com/developers/applications

[Discord Markdown]: https://support.discord.com/hc/en-us/articles/210298617-Markdown-Text-101-Chat-Formatting-Bold-Italic-Underline-

[MessageOptions]: https://discord.js.org/#/docs/discord.js/stable/typedef/MessageOptions

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.1.6 (2022-07-28)

* (crycode-de) Fixed voice channel member count/list

### 1.1.5 (2022-07-27)

* (crycode-de) Made token validation less strict

### 1.1.4 (2022-07-14)

* (crycode-de) Fixed crash if custom command choices name was empty

### 1.1.3 (2022-07-01)

* (crycode-de) Dependency updates

### 1.1.2 (2022-06-23)

* (crycode-de) Fixed adapter termination on discord errors to let the js-controller restart the adapter

### 1.1.1 (2022-06-08)

* (crycode-de) Added support for text messages in voice channels
* (crycode-de) Added support for custom slash commands
* (crycode-de) Added Blockly support with special custom blocks
* (crycode-de) Send error replies on slash commands as ephemeral
* (crycode-de) Added config option to send all slash command replies as ephemeral
* (crycode-de) Register get/set commands only if states are configured for this
* (crycode-de) Choices for commands are now handled as autocomplete which allows more choices, is more dynamic and shows the choices only to authorized users
* (crycode-de) Added command options to `raw.interactionJson` json content
* (crycode-de) Fixed command name checks
* (crycode-de) Fixed some crashes / stuck conditions when network is not available
* (crycode-de) Fixed several small bugs

### 1.0.2 (2022-05-16)

* (crycode-de) Fixed some small issues found on adapter review

### 1.0.1 (2022-05-15)

* (crycode-de) Added possibility to let the bot leave a Discord server
* (crycode-de) Fixed crash on server updates

### 1.0.0 (2022-05-13)

* (crycode-de) First release

## License

MIT License

Copyright (c) 2022 Peter Müller <peter@crycode.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.