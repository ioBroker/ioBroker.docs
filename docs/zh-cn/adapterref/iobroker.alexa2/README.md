---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.alexa2/README.md
title: ioBroker.alexa2
hash: PqfeIIlQZTVkbwckefEF4Z9wCUkhC7prs+UoxLvVC2g=
---
![标识](../../../en/adapterref/iobroker.alexa2/admin/alexa.png)

![安装数量](http://iobroker.live/badges/alexa2-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.alexa2.svg)
![下载](https://img.shields.io/npm/dm/iobroker.alexa2.svg)

# IoBroker.alexa2
![测试和发布](https://github.com/Apollon77/iobroker.alexa2/workflows/Test%20and%20Release/badge.svg)[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/alexa2/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry 插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用哨兵报告。

此适配器允许您远程控制您的 Alexa (Amazon Echo) 设备。

非常感谢 soef 提供版本 1 的适配器，感谢 Hauke 和 ruhr70 在他们的脚本中来自 ioBroker-Forum 的想法（尤其是媒体进度更新）！还要非常感谢 meicker 支持记录所有这些以及来自 ioBroker 论坛的众多用户的测试支持！

## 免责声明
**所有产品和公司名称或徽标均为其各自所有者的商标™ 或注册® 商标。使用它们并不意味着与它们或任何相关子公司有任何关联或认可！这个个人项目是在业余时间维护的，没有商业目标。** **ALEXA 是 AMAZON TECHNOLOGIES, INC. 的商标**

## 状态及其含义：
在适配器命名空间（例如 alexa2.0）中创建了一些通道

### Alexa2.0
|州名 |意义 |
| - | - |
|回声设备。* |每个 Echo 设备的状态，见下文 |
|历史。* |命令历史信息，见下文 |
|智能家居设备。* |每个智能家居设备的状态和一般情况，见下文 |
|信息。*|关于适配器状态的一般信息 |
|请求结果 | TuneIn 和智能家居设备请求的错误信息 |

### Alexa2.0.Contacts.ContactId.*
所有可用于向其发送短信的 Alexa 联系人，包括他自己。自己的联系人在他的名字后得到一个特殊的“（Self）”。

|州名 |意义 |
| - | - |
| #clearOwnMessages |仅存在于自己的联系人中，并且触发器会删除所有发送给自己的消息（也包括通过 App 或设备发送给自己的消息！） |
|短信 |将此文本作为消息发送给用户。显示在该用户的所有设备上，带有“黄环” |

### Alexa2.0.Echo-Devices.CommandsAll.*
要发送到帐户中所有设备的命令。

|州名 |意义 |
| - | - |
|设备停止 |停止设备上的所有操作 |按钮 |
| deviceDoNotDisturb |为所有设备打开/关闭“请勿打扰”。 |真/假，或以秒为单位启用的数字（最长 12 小时）或格式为“HH:MM”的字符串，直到此时启用 |

### Alexa2.0.Echo-Devices.Serialnumber.*
在“回声设备”下，每个亚马逊回声设备都列出了它的序列号。并非每个设备都显示所有状态。每个设备都有自己的状态，如下所述：

### Alexa2.0.Echo-Devices.Serialnumber.Alarm.*
每个设备的警报 (Wecker) 设置（如果有）。

|州名 |意义 |价值 |
| - | - | - |
| <id>.customVolume |为此提醒设置自定义音量。音量在提醒触发前 2 秒设置，并在计时器（或适配器认为！）停止后立即重新设置为之前的值 - 最迟在 120 秒之后！当自定义卷和触发时间重叠时，将在最后恢复一次！|数字 0..100 |
| <id>.日期 |覆盖现有警报的日期以设置此警报的新日期。如果您有现有的警报，您可以在此处更改日期，只需以 YYYY-MM-DD 格式覆盖时间。使用每天多次重复设置时可能无效！ |日期输出 |
| <id>.delete |按钮删除警报 |删除为真 |
| <id>.enabled |显示警报状态并允许更改它：使用 true 激活警报 - 使用 false 停用警报 |真/假|
| <id>.musicEntity |如果此闹钟是音乐闹钟，则显示曲目信息 |字符串或空 |
| <id>.musicProvider |如果此闹钟是音乐闹钟，则显示音乐的提供者 |字符串或空 |
| <id>.nextTriggerDate |包含下一个预期触发的时间点，以毫秒为单位的 unix epoch |号码 |
| <id>.recurringDays |如果警报具有重复设置，则显示配置的天数列表 |美国工作日表示法（例如 MO、TU、WE、TH、FR、SA、SU）|
|<id> .recurringPattern |显示警报的重复模式| 0 = 一次，不重复<br>P1D = 每天<br>XXXX-WD = 工作日<br>XXXX-WE = 周末<br>XXXX-WXX-1 = 每个星期一<br>XXXX-WXX-2 = 每个星期二<br>XXXX-WXX-3 = 每个星期三<br>XXXX-WXX-4 = 每个星期四<br>XXXX-WXX-5 = 每个星期五<br>XXXX-WXX-6 = 每个星期六<br>XXXX-WXX-7 = 每个星期日 |
| <id>.snoozed |如果此时闹钟已暂停，则为 true |真/假 |
| <id>.声音 |包含此警报的设置声音。可以改变。也可以在音乐声音输入和“内置声音”之间进行切换。 |列表中的 ID |
| <id>.time |警报时间。覆盖现有闹钟的时间以设置此闹钟的新时间。如果您有一个现有的警报，您可以通过简单地覆盖格式 hh:mm:ss 的时间来更改这里的时间，不需要设置秒。使用每天多次重复设置时可能无效！ |时间输入 |
| <id>.triggered |如果达到并触发警报，则为 true。时钟必须与亚马逊和iobroker同步，一旦达到闹钟时间，使用此触发其他操作|真/假|
|新 |数据以以下格式创建一个新的提醒作为字符串，由 ; 分隔作为“timestamp;[label];[sound];[recurring]。时间戳为 unix 时间戳，以 ms 为单位，标签为文本，声音为声音 ID，重复出现一次为空，“DAILY”为每日或“WEEKLY=MO,TU ,WE,TH,FR,SA,SU" 以逗号分隔的每周日期列表。上面示例中括号中的字段表示它们是可选的！| String |
|触发 |在此设备上最后触发的警报 ID |身份证 |

当更改闹钟不起作用时，请确保闹钟时间点在未来 - 所以改变例如过去警报上的“声音”将_不_起作用！

### Alexa2.0.Echo-Devices.Serialnumber.Bluetooth.*
在这里，您可以找到所有已连接或已知的具有 MAC 地址的蓝牙设备。每个设备的状态：

|州名 |意义 |
| - | - |
|连接 |显示当前连接状态并允许连接（设置为true）或断开连接（设置为false）|
|取消配对 |取消此设备与回显设备的配对的按钮 |

### Alexa2.0.Echo-Devices.Serialnumber.Commands.*
使用命令，您可以在 Alexa 设备上触发一些操作。如果您在多房间设备上使用它们，那么它们将独立执行并且*不会*在单个设备上同步运行！

|州名 |意义 |价值 |
| - | - | - |
|请勿打扰 |打开/关闭此设备或群组的“请勿打扰”。值也随着来自云端的设备配置更新而更新|真/假，或以秒为单位启用的数字（最长 12 小时）或格式为“HH:MM”的字符串，直到此时启用 |
|简报| 100 秒内的简报 - 新闻 etc.pp|按钮 |
|早安 |来自 Alexa 的早上好...|按钮 |
|趣事 |来自 Alexa 的有趣事实……（目前仅限美国）|按钮 |
|笑话 |来自 Alexa 的笑话 ...|按钮 |
|清理 |播放“锣”音，例如聆听模式的开始/结束...|按钮 |
|策展人 |来自 Alexa 所选区域的随机句子 ...|文本（允许：“再见”、“确认”、“早安”、“赞美”、“生日”、“晚安”、“iamhome”）|
|新歌| Alexa 唱一首歌...|按钮 |
|说话| Alexa 会说出您在此处输入的内容...|文本输入 |
|音量 |调整Alexa的说话音量，这个音量在说话之前设置，之后重置| 0-100 |
|技能 |启动定义的技能 |技能 ID 作为字符串 |
|技能你的 |启动一个定义的技能 - 也预填充了 Alexa 应用程序中显示的“你的技能”|技能 ID 作为字符串 |
|讲故事 | Alexa 讲故事 |按钮 |
|交通 |交通资讯 |按钮 |
|天气|天气新闻 |按钮 |
|设备停止 |停止设备上的所有操作 |按钮 |
|通知 |向设备的客户发送文本通知 |文本，可选择指定标题“title;text” |
|公告|播放公告（例如说话，但在文本前使用 Bing）|正文 |
| ssml |讲 SSML XML 字符串 |正文 |
|文本命令 |向 Alexa 发送文本命令。确保只使用文本（例如 3 -> 3 等，否则 Alexa 可能无法正确响应它！）|正文 |
|声音 |在设备上播放声音。 |正文 |

详细信息 发言和公告：在此处输入您想让 Alexa 说的话。您还可以通过在文本前给出百分比来调整 Alexa 的音量。
示例：10;Alexa 表示 Alexa 音量为 10%，而 100;Alexa 表示音量为 100%。
通常每个语音命令只能发送 250 个字符。通过使用分号，只要用分号分隔 250 个字符，就可以写多少就写多少。
然后 Alexa 将在一个小休息后一个接一个地朗读文本。您还可以通过编写#Volume;#Block1;#Block2, a.s.o 将音量与更多 255 个块一起使用，此处设置的音量将用于定义的说话音量。

部分也来自 https://developer.amazon.com/en-US/docs/alexa/custom-skills/ask-soundlibrary.html 工作。在 speak 或 ssml 中指定为 `<audio src="soundbank://soundlibrary/animals/amzn_sfx_bear_groan_roar_01"/>`。详情和讨论请访问 https://forum.iobroker.net/topic/27509/ssml-audio

### Alexa2.0.Echo-Devices.Serialnumber.FireTVCommands.*
如果设备是 Amazon FireTV，那么您可以使用以下命令：

|州名 |意义 |价值 |
| - | - | - |
|开启 |打开 FireTV 和电视 |按钮 |
|关闭 |关闭 FireTV 和电视 |按钮 |
|视频暂停 |暂停正在运行的视频 |按钮 |
|视频简历 |恢复当前视频 |按钮 |
|导航首页 |导航到主页 |按钮 |

### Alexa2.0.Echo-Devices.Serialnumber.Info.*
有关 Alexa 设备的信息

|州名 |意义 |价值 |
| - | - | - |
|能力 |如果Alexa 设备的功能|资讯 |
|设备类型 |来自亚马逊的设备类型 |资讯 |
|设备类型字符串 |设备类型为字符串 |资讯 |
| isMultiroomDevice |是multiroom 设备- Multiroom 是一个虚拟设备组|信息，真/假 |
| isMultiroom 会员 |是多房间成员 - 如果为 true，则设备是多房间设备组的一部分 |信息，真/假 |
| MultiroomParents |如果此设备是多房间设备组的一部分，则此状态显示父组设备 |资讯 |
|姓名 | Alexa 设备名称 |资讯 |
|序列号 | Alexa设备序列号|

### Alexa2.0.Echo-Devices.Serialnumber.Music-Provider.*
直接告诉 Alexa 播放音乐或支持的音乐提供商的播放列表。实际支持的是：我的图书馆、亚马逊音乐、Tune In。您还可以在短语中包含多房间设备组名称以在该组上播放（例如“SWR3 auf Erdgeschoss”）

|州名 |意义 |价值 |
| - | - | - |
|亚马逊音乐|与亚马逊音乐一起玩的短语 |文字输入 |
|亚马逊音乐播放列表 |使用 Amazon Music 播放的播放列表 |文字输入 |
|我的图书馆 |与我的图书馆一起玩的短语 |文字输入 |
|我的图书馆播放列表 |与我的图书馆一起玩的播放列表 |文字输入 |
|调入 |用 Tune In 演奏的短语 |文字输入 |
|收听播放列表 |使用 Tune In 播放的播放列表 |文字输入 |

### Alexa2.0.Echo-Devices.Serialnumber.Player.*
状态来控制设备的播放并查看当前状态和媒体信息

|州名 |意义 |价值 |
| - | - | - |
|允许下一个 |是否允许 Next/Forward 操作？ |资讯 |
|允许播放暂停 |是否允许播放/暂停操作？ |资讯 |
|允许上一个 |是否允许上一步操作？ |资讯 |
|允许重复 |可以使用重复功能吗？ |资讯 |
|允许随机播放 |可以使用随机播放功能吗？ |资讯 |
|内容类型 |要在此设备上播放所需内容的文本字段 |资讯 |
|控制前进 |触发播放器“前进”命令的按钮（30 秒）|按钮 |
|控制下一个 |触发播放器“下一步”命令的按钮 |按钮 |
|控制暂停 |触发播放器“暂停”命令的按钮 |按钮 |
|控制播放 |触发播放器“播放”命令的按钮 |按钮 |
|控制上一页 |触发播放器“上一个”命令的按钮 |按钮 |
|控制重复 |触发播放器“重复”命令的按钮 |真/假|
|控制倒带 |触发播放器“倒带”命令的按钮（30 秒）|按钮 |
|控制随机播放 |切换以启用或禁用播放器的随机播放模式 |真/假|
|当前专辑 |当前正在播放的专辑 |资讯 |
|当前艺术家 |当前艺术家实际演奏 |资讯 |
|当前状态 |如果正在播放 -> true ，否则为 false|真/假|
|当前标题 |当前标题实际播放 |资讯 |
|图片网址 |专辑图片的 URL |资讯 |
| mainArtURL |当前主要艺术的 URL |资讯 |
|媒体 ID |当前播放媒体的媒体ID（通常为queueID:<number> | String，可设置跳转到提供的媒体ID |
|媒体长度 |当前标题的长度 |资讯 |
|媒体长度Str |活动媒体长度为 (HH:)MM:SS |资讯 |
|主要进展 |活动媒体经过时间 |资讯 |
|主要进度百分比 |活动媒体经过的时间百分比 |资讯 |
| mediaProgressStr |活动媒体进度为 (HH:)MM:SS |资讯 |
| miniArtUrl |艺术作品的网址（迷你）|资讯 |
|静音 | “静音”状态 |信息，true / false，volume = 0 被认为是静音 |
| playInGroup |媒体是否在组中播放？ |资讯 |
| playInGroupId |播放组ID |资讯 |
|提供者ID |当前音乐提供商的ID |资讯 |
|提供者名称 |当前音乐提供商的名称 |资讯 |
|质量 |当前媒体的质量名称（可能为空） |资讯 |
|质量编解码器 |当前媒体的编解码器（可能为空） |资讯 |
|质量数据率 |当前媒体的数据速率（kbps）（可能为空）|资讯 |
| qualitySampleRate |当前介质的采样率 (Hz)（可能为空） |资讯 |
|队列ID |当前播放列表的队列ID |资讯 |
|电台 ID | TuneIn 电台的 ID |资讯 |
|服务 |当前音乐服务的名称 |资讯 |
| TuneIn-站 |文本字段输入电台名称以在此设备上播放此电台。也可以输入站号 (s123456...)、节目/播客 ID (p1234567...) 或主题 ID (t123456789...) |文字输入 |
|体积 |播放音量。您可以输入一个介于 0-100% | 之间的值。输入量 |

### Alexa2.0.Echo-Devices.Serialnumber.Preferences.*
在这里您可以找到一些设备首选项。

|州名 |意义 |价值 |
| - | - |
| ringNotificationsEnabled |显示是否启用铃声通知并允许对其进行编辑（真/假）。使用设备配置间隔从云端更新状态 |
|通知卷 |为设备设置的通知音量。该值在适配器启动时加载一次，然后不与云服务同步，但可以更改 |数字 0..100 |
|上升警报状态 |为设备设置的上升报警状态。该值在适配器启动时加载一次，然后不与云服务同步，但可以更改 |布尔值 |
| auxPort-*-方向 | AuxPort 的方向（如果支持）。该值在适配器启动时加载一次，然后不与云服务同步，但可以更改 | “输入”或“输出” |
|连接扬声器 |扬声器用于设备输出。该值在适配器启动时加载一次，然后不与云服务同步，但可以更改 | “InternalSpeaker”、“Bluetooth”或“Aux”（如果设备支持！检查应用程序）|
| defaultAlarmNotificationSound |为设备设置的默认警报声音。该值在适配器启动时加载一次，然后不与云服务同步，但可以更改 |列表中的 ID |
| defaultTimerNotificationSound |为设备设置的默认计时器声音。该值在适配器启动时加载一次，然后不与云服务同步，但可以更改 |列表中的 ID |
| displayAdaptiveBrightnessEnabled |是否启用设备显示的自适应亮度。该值在适配器启动时加载一次，然后不与云服务同步，但可以更改 |真/假 |
|显示启用 |设备的显示是否启用。该值在适配器启动时加载一次，然后不与云服务同步，但可以更改 |真/假 |
|显示亮度 |显示器的亮度。该值在适配器启动时加载一次，然后不与云服务同步，但可以更改 | 0..100% |
|均衡器低音 |均衡器低音设置。如果启用推送连接，则在更改时更新值 |号码 |
|均衡器中档 |均衡器中频设置。如果启用推送连接，则在更改时更新值 |号码 |
|均衡器高音 |均衡器高音设置。如果启用推送连接，则在更改时更新值 |号码 |

### Alexa2.0.Echo-Devices.Serialnumber.Reminder.*
每个设备的提醒 (Erinnerungen) 设置（如果有）。

|州名 |意义 |价值 |
| - | - | - |
| <id>.customVolume |为此提醒设置自定义音量。音量在提醒触发前 2 秒设置，并在计时器停止（或适配器认为！）停止前重新设置为之前的值 - 最迟在 120 秒之后！当自定义卷和触发时间重叠时，将在最后恢复一次！|数字 0..100 |
| <id>.日期 |覆盖现有警报的日期以设置此警报的新日期。如果您有现有的警报，您可以在此处更改日期，只需以 YYYY-MM-DD 格式覆盖时间。使用每天多次重复设置时可能无效！ |日期输出 |
| <id>.delete |按钮删除警报 |删除为真 |
| <id>.enabled |显示警报状态并允许更改它：使用 true 激活警报 - 使用 false 停用警报 |真/假|
| <id>.nextTriggerDate |包含下一个预期触发的时间点，以毫秒为单位的 unix epoch |号码 |
| <id>.recurringDays |如果警报具有重复设置，则显示配置的天数列表 |美国工作日表示法（例如 MO、TU、WE、TH、FR、SA、SU）|
|<id> .recurringPattern |显示警报的重复模式| 0 = 一次，不重复<br>P1D = 每天<br>XXXX-WD = 工作日<br>XXXX-WE = 周末<br>XXXX-WXX-1 = 每个星期一<br>XXXX-WXX-2 = 每个星期二<br>XXXX-WXX-3 = 每个星期三<br>XXXX-WXX-4 = 每个星期四<br>XXXX-WXX-5 = 每个星期五<br>XXXX-WXX-6 = 每个星期六<br>XXXX-WXX-7 = 每个星期日 |
| <id>.snoozed |如果此时闹钟已暂停，则为 true |真/假 |
| <id>.声音 |包含此警报的设置声音。可以调整|列表中的 ID |
| <id>.time |警报时间。覆盖现有闹钟的时间以设置此闹钟的新时间。如果您有一个现有的警报，您可以通过简单地覆盖格式 hh:mm:ss 的时间来更改这里的时间，不需要设置秒。使用每天多次重复设置时可能无效！ |时间输入 |
| <id>.triggered |如果达到并触发警报，则为 true。时钟必须与亚马逊和iobroker同步，一旦达到闹钟时间，使用此触发其他操作|真/假|
|新 |数据以以下格式创建一个新的提醒作为字符串，由 ; 分隔作为“timestamp;label;[sound];[recurring]。时间戳为 unix 时间戳，以毫秒为单位或文本，如“HH:MM”，标签为文本（必需），声音为声音 ID，重复出现一次为空，“每日”用于每日或“WEEKLY=MO,TU,WE,TH,FR,SA,SU”，用逗号分隔的每周日列表。为了充分的灵活性，重复也可以是一个 JSON 化的对象，其中包含传递的所有数据。上面示例中的字段括号表示它们是可选的！| String |
|触发 |在此设备上最后触发的警报 ID |身份证 |

当更改提醒不起作用时，请确保提醒时间点在未来 - 所以更改例如过去提醒中的“声音”将_不_起作用！

### Alexa2.0.Echo-Devices.Serialnumber.Routines.*
Alexa App 中设置的例程概览。自己创建的例程有一个序列号，亚马逊显示为“预配置：...”每个例程都可以通过一个按钮触发运行一次。

|州名 |意义 |价值 |
| - | - | - |

|例程的序列或内部名称 |例程名称 |按钮

### Alexa2.0.Echo-Devices.Serialnumber.Timer.*
您可以在每台 Alexa 设备上运行一个或多个计时器。由于计时器的动态特性，不会像警报或提醒那样创建更多对象，但存在一种获取触发信息的方法。

|州名 |意义 |价值 |
| - | - | - |

|活动定时器列表 | JSON 数组，包含 ID、标签和触发时间点的活动计时器列表作为 unix 时间戳，单位为 ms | JSON 数组 |下一个时间日期 |包含下一个预期触发的时间点，以毫秒为单位的 unix epoch |号码 |号码 |下一个定时器 ID |下一个要触发的定时器ID |字符串 |停止定时器 ID |使用定时器 ID 控制来停止定时器（如果定时器正在响铃，也会停止！） |字符串 |触发 |一个定时器被触发了——事实上它是“nextTimerId”一个 |真假

**请注意，iobroker 主机的时区设置为与您的本地时区匹配很重要，否则触发的时间检测可能是错误的！**

### Alexa2.0.Echo-Devices.Serialnumber.online
这个 Alexa 设备是否在线并连接到亚马逊云？

|州名 |意义 |价值 |
| - | - | - |

|在线 |设备是否在线？ |真假

### Alexa2.0.History
|州名 |意义 |价值 |
| - | - | - |
| #触发器 |获取新历史的按钮（比创建时间中的时间戳更当前），仅在不使用推送连接时才需要 |按钮 |
|卡片内容 | Alexa-App/Echo Show | 中显示的附加信息资讯 |
|卡杰森 | JSON 格式的 Alexa-App/Echo Show 中显示的附加信息 |资讯 |
|创建时间 |此历史记录条目的日期，新的历史记录条目仅在稍后作为此时间戳时才考虑 |资讯 |
|域应用程序 ID |附加信息，如 Skill-ID 等，可选 |资讯 |
|域应用程序名称 |附加信息，如技能名称等，可选 |资讯 |
| json |最后一个命令数据的 Json 能够处理所有信息，例如在自己的 JavaScript 中| JSON |
|姓名 |收到最后一个请求的设备名称 |资讯 |
|序列号 |获得最后一个请求的设备的序列号 |资讯 |
|状态 |对 Alexa 的最后一条命令的状态 |成功/故障/丢弃_NON_DEVICE_DIRECTED_INTENT；最后一个是通过说出唤醒词激活设备时生成的，或者当设备将输入丢弃为“不适合我”时生成 |
|总结 |设备收到的文本/摘要/操作 |资讯 |

### Alexa.0.Smart-Home-Devices
包括 Alexa 根据您的技能了解的所有智能家居设备。对于所有已知设备，状态如下：

|州名 |意义 |价值 |
| - | - | - |

|全部删除 |从 Alexa 中删除所有智能家居设备，与 Alexa App 中的按钮相同 |按钮 |发现设备 |查找新的智能家居设备，与 Alexa App 中的按钮相同 |按钮 |查询全部 |查询所有设备，仅在至少一台设备能够检索信息时可见 |按钮

### Alexa.0.Smart-Home-Devices.SerialNumber.*
|州名 |意义 |价值 |
| - | - | - |

| #删除 |从 Alexa 中删除智能家居设备 |按钮

| #启用 |智能家居设备是否处于活动状态？启用/禁用状态和控制。状态将在与智能家居设备数据相同的时间间隔内与云同步。 |真/假|
| #includeInAllQuery |查询所有设备状态时是否应包括此设备？ |真/假|
| #查询 |此设备的查询数据，仅在智能家居设备/技能支持检索信息时可见 |按钮 |
|活跃 |显示可以激活/停用的场景|真/假|
|电源状态 |打开/关闭电源 |多变，真/假 |
| ... |更多可能的状态取决于智能家居设备的类型 |信息或多变:-) |

**-> 彩色/灯光设备的特殊状态**

|州名 |意义 |价值 |
| - | - | - |
|亮度 | HUE 灯的亮度 | 0-100% 可变 |
|颜色-亮度 |颜色定义的亮度（连同色调和饱和度，HSV）|信息，0-1% |
|色调|颜色的色调值（连同亮度和饱和度，HSV）|信息，0-360° |
|色彩饱和度|颜色的饱和度（连同亮度和色调，HSV）|信息，0-1 |
|颜色RGB |由 color-* 值构建的实际颜色的 RGB 代码 |信息，#rrggbb |
|颜色名称 | Alexa 定义的颜色名称 - 固定值 |可更改设置颜色，0-144 |
| colorTemperarureInKelvin |开尔文色温 |信息，1000-10000K |
|颜色温度名称 |由 Alexa 定义的色温名称 - 固定值 |可更改设置，0-18 |

使用#brightness，您可以调整灯光的亮度，#colorName 是选择一种预定义的颜色 (0-144)。对于 HUE 环境光，您可以在 #colorTemperatureName 中的 0-18 的 19 个值之间进行选择。所有的灯都可以用#powerState 打开和关闭。

### Alexa2.0.Info.*
|州名 |意义 |价值 |
| - | - | - |
|连接 |如果与 Alexa 的连接正常 |信息->真/假|
|饼干 | Alexa cookie，与几个也想访问 Alexa API 的外部脚本一起使用 |资讯 |
| csrf | Alexa CSRF，与几个也想访问 Alexa API 的外部脚本一起使用 |资讯 |

＃＃ 安装
像往常一样使用稳定的存储库、最新的存储库或使用来自 GitHub 的 ioBroker “安装”选项

## 通过消息发送 Alexa 设备命令序列
到 Alexa 设备的所有命令都可以通过适配器发送到单个设备或组。适配器支持发送这些命令，并且 - 如果需要 - 还可以将它们组合起来以在语音输出之前设置特定音量并在之后恢复原始音量。

当您想将自定义序列发送到 alexa 设备时，您可以创建例程并通过状态触发例程。

如果这不够灵活，适配器从 3.14.0 版本开始提供了一种通过消息发送命令的方法。

您提供一个数组结构，它将被转换为命令。一个数组元素有两种类型的选项：

**一条命令**

```json
{
    "command": "speak", // command like the state name in Commands states
    "value": "This is a test speak.", // value like value you set on state
    "device": "..." // optional: serialNumber of the device to send this command to
}
```

**序列定义**

```json
{
    "sequenceType": "...", // "SerialNode" or "ParallelNode"
    "nodes": [...] // array of commands or sequences
}
```

发送消息，例如使用 JavaScript 适配器如下所示：

```javascript
adapter.sendTo(
    "alexa.0", // target
    "sendSequenceCommand", // command
    { // value
        "deviceSerialNumber": "...", // Serial number of one device to get Meta data which will be used if no device is pecified on the commands
        "sequenceNodes": [...], // list of sequences or commands
        "sequenceType": "SerialNode" // "SerialNode" or "ParallelNode" for the provided sequenceNodes on main level. Default is "SerialNode"
    }, (err, res) => {
        console.log(err);
        console.log(JSON.stringify(res));
    }
);
```

当命令作为“ParallelNode”并行执行时，这主要是为了将命令发送到不同的设备。作为“SerialNode”的命令一个接一个地执行 - **亚马逊会处理这个问题，而不是适配器！**

如下结构是可能的：

```json
... // use ParallelNode on main level
"sequenceNodes": [
    {
        "sequenceType": "SerialNode",
        "nodes": [
            {
                "command": "speak",
                "value": "This is a test speak.",
                "device": "DeviceA"
            },
            {
                "command": "speak",
                "value": "This is a second test speak.",
                "device": "DeviceA"
            }
        ]
    },
    {
        "sequenceType": "SerialNode",
        "nodes": [
            {
                "command": "speak",
                "value": "This is a test speak.",
                "device": "DeviceB"
            },
            {
                "command": "speak",
                "value": "This is a second test speak.",
                "device": "DeviceB"
            },
            {
                "sequenceType": "ParallelNode",
                "nodes": [
                    {
                        "command": "flashbriefing",
                        "device": "DeviceC"
                    },
                    {
                        "command": "flashbriefing",
                        "device": "Device B"
                    }
                ]
            }
        ]
    }
]

```

＃＃ 故障排除
### 通过电子邮件/密码确定 Cookie 的问题
有时，亚马逊在登录时检测到意外流量时会进行奇怪的检查。
这可能导致需要回答验证码才能登录的问题。
大多数情况下，这个验证码需要被回答一次，然后在没有验证码的情况下登录。

当您需要回答这样的验证码时，请尝试执行以下操作：

* 使用通用浏览器（例如 Chrome）
*禁用Javascript！
* 清除亚马逊可能存在的所有 cookie 或使用浏览器的私有/隐身模式
* 致电 https://alexa.amazon.de
* 你应该得到一个登录表单（通常显示为旧的移动浏览器）
* 使用您在其中注册 Echo/Alexa 的 Amazon 凭证登录
* 您可能需要登录两次或解决验证码
* 最后你应该看到“https://alexa.amazon.de/spa/index.html”作为 URL 但没有任何实际内容（因为 JS 仍然被禁用），但这完全可以！！！！
* 现在尝试再次获取 cookie
* 如果它仍然不起作用，请再次执行并检查浏览器中的用户代理和接受语言，并在下次尝试使用适配器中的那些

此外，Accept-Language-Header（默认为“de-DE”）需要与您的语言/浏览器语言/您登录的亚马逊页面的语言相匹配。

您还可以尝试使用 User-Agent 并使用与您使用的系统类型更匹配的一个。
例如，使用“Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36”作为用户代理，当 ioBroker 在 linux 系统上运行时，据报告它工作得更好。

您可以覆盖适配器配置中的所有这些参数。

###如何自行判断Cookie？
如果自动确定 Cookie 不起作用或者您不信任适配器提供电子邮件/密码，则您可以自行确定 cookie。网上有很多关于如何做到这一点的信息。这里有一些链接：

* https://www.gehrig.info/alexa/Alexa.html
* 或使用 https://blog.loetzimmer.de/2017/10/amazon-alexa-hort-auf-die-shell-echo.html 中的 shellscript 在 shell 上获取它...

但请注意：Cookie 将在几次后超时，然后适配器将停止工作并自行禁用。然后你需要手动获取一个新的cookie！

### 推送连接不连接
有时，由于连接尝试次数过多，亚马逊可能会阻止特定 IP 和“设备”的推送连接端点。

如果推送连接从未建立，那么您可以尝试使用以下方法：

* 删除适配器的实例
* 检查是否有 /opt/iobroker/node_modules/iobroker.alexa2/formerDataStore*.json 之类的文件 - 如果存在，请删除它们
* 添加新实例并获取新 cookie

然后它应该再次工作

### 我的 Echo 设备列表中有太多应用程序/“此设备”设备
适配器读取亚马逊报告的任何内容。有时未使用的旧应用程序或其他连接会保留在该列表中。
如果你想清理它，你需要访问亚马逊网站并移除那里的设备。

链接：https://www.amazon.de/hz/mycd/digital-console/devicedetails?deviceFamily=ALEXA_APP

删除未使用的设备后，请重新启动适配器以将它们也删除。

## Changelog
### 3.21.0 (2022-11-03)
* IMPORTANT: Because of rate limits by Amazon I decided to remove the update of smart home device values in intervals because it seems to produce too much load in Skills and Amazon systems.
* (Apollon77) Optimizes loading of smart home device states
* (Apollon77) Fixed issue with enabling/disabling of Alarms in combination with non-default music for the alarm
* (Apollon77) Prevented that Timers or Alarms that are long in the future to trigger their trigger state too early
* (Apollon77) Fixed deleting own user Messages state
* (Apollon77) Already request Notification updates when history registered a Notification action and do not wait for Push info to come in

### 3.20.1 (2022-10-29)
* (Apollon77) make sure caching works correctly with multiple instances of the adapter

### 3.20.0 (2022-10-29)
* (Apollon77) Increase minimum interval for requesting smart home device data to 15 minutes (900s) because of Amazon rate limits. Please do not try to work around it!
* (Apollon77) Cache Smart home device list and data to prevent too many requests when restarting adapter in short intervals and to prevent deleted smart home devices also on further rate limit issues

### 3.19.10 (2022-10-27)
* (Apollon77) Fix issue in retry handling when rate limit exceeded is returned by Amazon
* (Apollon77) Do not clean up Smart Home Device objects for now - delete manually if you remove a device

### 3.19.9 (2022-09-12)
* (Apollon77) Receive the correct player status again when musik is stopped

### 3.19.8 (2022-09-07)
* (Apollon77) Add safeguard for too high intervals

### 3.19.7 (2022-08-19)
* (Apollon77) Fix doNotDisturb when using a time string

### 3.19.6 (2022-08-18)
* (Apollon77) Fix doNotDisturb when using a time string

### 3.19.5 (2022-08-09)
* (Apollon77) Fix doNotDisturb for groups

### 3.19.4 (2022-08-07)
* (Apollon77) Prevent unwanted device Name updates

### 3.19.3 (2022-08-07)
* (Apollon77) Fix crash check with multiple adapter instances

### 3.19.2 (2022-08-06)
* (Apollon77) Fix Alarm creation when just providing time and it is for next day

### 3.19.1 (2022-08-04)
* (Apollon77) Fix retry handling

### 3.19.0 (2022-08-04)
* (Apollon77) Preserve Names as soon as it is an App type in general
* (Apollon77) Enhance checks and safeguards for polling intervals
* (Apollon77) Check for restart intervals that do not make sense and stop adapter if detected
* (Apollon77) Add additional crash-loop detection

### 3.18.6 (2022-07-19)
* (Apollon77) Fix deviceStop sequence command

### 3.18.5 (2022-07-19)
* (Apollon77) Fix crash case reported by Sentry
* (arteck) Add image for Fire Cube

### 3.18.3 (2022-07-18)
* (Apollon77) Fix doNotDisturb and doNotDisturb for All devices
* (Apollon77) Update do not disturb status after set for all devices
* (Apollon77) preserve a changed name for a "This device" device object

### 3.18.2 (2022-07-18)
* (Apollon77) Enable commands again for Apps with type A2TF17PFR55MTB - will only work sometimes as it seems

### 3.18.1 (2022-07-18)
* (Apollon77) Optimize Handling when push connection could not be established

### 3.18.0 (2022-07-18)
* IMPORTANT: Smart home device values are from now on only synchronized when enabled via #includeInIntervalQuery state. Enable only what's really needed!
* (Apollon77) Allow to query several more smart home device states (incl. the Echo own Temperature-Sensor if available) and more optimizations
* (Apollon77) Optimize querying smart home device states to only request relevant properties
* (Apollon77) Exclude some value types again from requesting from Amazon because they make no sense and will never contain meaningful data
* (Apollon77) Add FireTV commands for FireTV devices
* (Apollon77) Add CommandsAll.deviceStop and CommandsAll.deviceDoNotDisturb commands to be sent to all devices
* (Apollon77) Add Equalizer preferences (if supported by devices)
* (Apollon77) Add Speaker and AUX preferences (if supported by devices)
* (Apollon77) Add Display (enabled, brightness, adaptive brightness) preferences (if supported by devices)
* (Apollon77) Enhance doNotDisturb state to also allow specifying a enable duration or end timepoint
* (Apollon77) Add a fallback to update music player when a new history record mentions music as target for the spoken words. Could help as fallback when push infos are not coming in sometimes with Sonos
* (Apollon77) Delay initialization of push connection to when basic structures are initialized
* (Apollon77) Add some more devices

### 3.17.5 (2022-07-14)
* (Apollon77) Minimum smart home device query interval is now 5 minutes and not 1 minute anymore to remove some requests for now

### 3.17.4 (2022-07-13)
* (Apollon77) Make sure disabling query intervals really work (disabling smart home device and state and configuration was not possible)

### 3.17.3 (2022-07-12)
* (Apollon77) Prevent datatype warnings in log

### 3.17.2 (2022-07-12)
* (Apollon77) Another adjustment for smart home device data readings
* (Apollon77) Fix crash cases reported by Sentry

### 3.17.1 (2022-07-12)
* (Apollon77) Work around timing issues with speak-volume when using announcement
* (Apollon77) Correctly initialize volume/mute on startup also when player data are not available
* (Apollon77) Do not overwrite speak-volume (and some other fields) with null on adapter start
* (Apollon77) Fix crash cases reported by Sentry

### 3.17.0 (2022-07-11)
* (Apollon77) Add support to play Audible books in Music-Providers
* (Apollon77) Optimize deletion of alarms and reminders
* (Apollon77) Optimize requesting smart home device data

### 3.16.1 (2022-07-11)
* (Apollon77) Fix deletion and cancellation of Alarms and Reminders

### 3.16.0 (2022-07-11)
* (Apollon77) Add (official) support for Music-Alarms - they are now listed under "Alarms" together with the other Alarms! The "sound" list will contain the device specific music targets - so you can basically zse the ones that you created at least once via voice commands.
* (Apollon77) For a Music Alarm the "customVolume" on the alarm is used to set the normal device volume 2s before the alarm but do not (!) reset it afterwards
* (Apollon77) Prevent crashes on one time Alarms that just triggered

### 3.15.2 (2022-07-09)
* (Apollon77) Fix case where initialization of the adapter was never finished and so nothing was controllable when App devices where not synced

### 3.15.1 (2022-07-09)
* (Apollon77) Convert Smarthome device values if wrong datatype is delivered by device
* (Apollon77) Add handling for two more battery health states for smart home devices
* (Apollon77) Fix crash case when initializing notifications

### 3.15.0 (2022-07-09)
* (Apollon77) IMPORTANT: Format to specify multiple Details on "New" for Alarms and Reminders changed, see documentation!
* (Apollon77) Add Alarm/Reminder triggered state per device which will contain the ID of the alarm that got triggered when it is triggered
* (Apollon77) Add several more fields for Alarms and Reminders to show better the details of the alarm
* (Apollon77) Allow to cancel Reminders and Alarms as in the Alexa App
* (Apollon77) Allow to also edit Alarm/Reminder Dates additionally to the times
* (Apollon77) Allow to set a custom Volume for Reminders and Alarms - it will be set 2s before the expected trigger and restored afterwards
* (Apollon77) Calculate the "nextTriggerDate" as Timestamp of next expected triggering
* (Apollon77) Add a JSON-Array with all running timers and the "next id" as state
* (Apollon77) Allow to stop a timer by ID
* (Apollon77) Add the days-list of Alarms when configured for recurrency
* (Apollon77) Add new Commands skill and skillYours to start Skills
* (Apollon77) Add Notification volume, Ascending Alarm setting and default notification sounds as preferences
* (Apollon77) Slow down the initialization of all data a bit, so startup could take longer

### 3.14.0 (2022-07-06)
* (Apollon77) Allow to define if Lists and Smart home devices are synced by the adapter with the Amazon Cloud at all
* (Apollon77) Enhance Smart Home Device support by adding various controllers and states. If in your Alexa App something is configurable which is not in ioBroker please send a debug log!
* (Apollon77) Re-Introduce the ability to poll smart home device states in intervals, but only devices are queried that report their status proactively to Amazon-Cloud to prevent Skill developer costs! ioBroker (and OpenHab) devices are NOT queried! The interval can be configured but must not be lower than 60s! Querying is disabled by default.
* (Apollon77) Add message to send out sequences of commands to alexa devices
* (Apollon77) Add Info states for macAddress and WifiSSID of the Alexa devices
* (Apollon77) Add several new states for Player for allowed actions, medium quality
* (Apollon77) Add mediaId and also allow to set it to jump to a defined entry in the playlist
* (Apollon77) Add Commands.sound to play a sound
* (Apollon77) Do not set the speak-volume when executing textCommand and deviceStop
* (Apollon77) Do not set speak-volume if the volume is already as wanted when executing commands
* (Apollon77) update Do-Not-Disturb status once on start and with device configuration updates
* (Apollon77) Allow to specify the title in notification commands
* (Apollon77) When a device plays music in a group then new states in "Player"will indicate this together with the group ID
* (Apollon77) Allow to enable and disable smart home devices - this will be synced together with the smart home state updates from the cloud if changed in the app!
* (Apollon77) Detect Rate limit exceeded response and do one automatic request retry 10s later (plus a random part)
* (Apollon77) Slow down the update of player status to prevent rate limit exceeded errors. initial update of the player states is delayed on startup of the adapter
* (Apollon77) Restore character replacement for Music providers (space is now again a "-")
* (Apollon77) Add more devices
* (Apollon77) Optimize startup and unload handling

### 3.13.0 (2022-07-02)
* IMPORTANT List Names are now checked for invalid characters and replaced. Might change the name of objects in ioBroker. Old ones need to be deleted manually!
* (Apollon77) Fix command sending in multi owner environments (e.g. Family shared devices)
* (Apollon77) Add some new devices
* (ammawel) Add the date of an alarm as state, not only time
* (Apollon77) Add option to also query the App Devices to allow to send commands to them
* (Apollon77) Rework Multiroom for commands to prevent rate limiting issues!
* (Apollon77) Fix Routine Naming if triggers were used
* (Apollon77) Support devices with "Ziggy" as wake word
* (Apollon77) All commands with voice output respect the defined speak-volume now
* (Apollon77) Allow again to directly enter TuneIn station Ids (s*) and topicIds (t*)
* (Apollon77) Add media states to show remaining time of media playback
* (simatec) Adjust link color im Admin configuration
* (Apollon77) Some requests are automatically retried with a slight delay if Amazon responds with error 503

### 3.12.0 (2021-11-13)
* (Apollon77) SequenceNodes created for a device are now bound to the "deviceOwnCustomer" - should help in mixed owner groups
* (ammawel) Add recurringPattern for Notifications (see Readme)
* (Apollon77) Fix crash case
* (Apollon77) Make sure states are not set too early before objects are created

### 3.11.2 (2021-10-12)
* (Apollon77) Fix crash case (Sentry IOBROKER-ALEXA2-AT)

### 3.11.1 (2021-10-12)
* (Apollon77) Prevent warnings with js-controller 3.3

### 3.11.0 (2021-10-12)
* (Apollon77) Add support for Multi Utterance Routines
* (Apollon77) Fix object deletion for lists
* (Apollon77) Fix Creation of new Lists and add deletion support
* (Apollon77) Allow Commands for Stereo Pairs
* (Apollon77) Optimize Push Connection and History retrieval

### 3.10.4 (2021-10-11)
* IMPORTANT: Node.js 10 support is dropped, supports LTS versions of Node.js starting with 12.x
* (Apollon77) Update Push Connection

### 3.9.3 (2021-07-11)
* (Apollon77) Try to fix setting targetTemperature for ThermostatController

### 3.9.2 (2021-07-05)
* (Apollon77) Only ignore empty history entries if both, summary and alexaResponse is empty

### 3.9.1 (2021-06-04)
* (Apollon77) Fix cookie exchange and cookie validation checks

### 3.9.0 (2021-05-11)
* (Apollon77) Add some new devices
* (Apollon77) Always recognize "alexa" as wakeword to handle commands via the apps correctly

### 3.8.4 (2021-05-11)
* (Apollon77) Optimize Cookie refresh handling
* (Apollon77) Fix warnings from js-controller 3.3 and optimize

### 3.8.2 (2021-04-19)
* (Apollon77) Adjust automatic Cookie Refresh interval from 7 to 4 days

### 3.8.1 (2021-02-09)
* (Apollon77) Initialize volume for all devices on start

### 3.8.0 (2021-02-04)
* (Apollon77) Add configuration option to not write history entries where no command text was recognized

### 3.7.1 (2021-02-03)
* (Apollon77) add some more detected text into summary and answerText states (textCommand commands should be in history back again)

### 3.7.0 (2021-02-03)
* (Apollon77) IMPORTANT: History entries are now requested via a different data source because Amazon seems to tun off the old option. History.status is for this no longer filled, but new states were added. Only voice commands are reported ( textCommand entries not longer)
* (Apollon77) other optimizations in communications and prevent hammering amazon with requests in error cases

### 3.6.1 (2021-02-02)
* (fbeister) Add and adjust some known devices
* (Apollon77) Optimize object deletion

### 3.6.0 (2021-01-28)
* (Apollon77) Update Routines API because of amazon changes

### 3.5.6 (2021-01-22)
* (Apollon77) Catch error when deleting objects

### 3.5.4 (2021-01-22)
* (Apollon77) restart adapter when no initial cookie could be requested

### 3.5.2 (2021-01-17)
* (Apollon77) Prevent to write non-existing state values
* (Apollon77) Add and adjust some known devices

### 3.5.0 (2020-12-24)
* (Apollon77) Remove bespoken because textCommand is more flexible
* (Apollon77) Add and adjust some known devices, add Echo 4 image

### 3.4.0 (2020-12-11)
* (Apollon77) add support for textCommand - tell an Alexa device a text as you would speak it
* (Apollon77) make sure discovery of devices is still possible also after deleting all devices before

### 3.3.5 (2020-12-03)
* (Apollon77) make sure music providers with empty names do not produce errors

### 3.3.2 (2020-11-23)
* (Apollon77) prevent crash cases and optimize reconnection handling

### 3.3.1 (2020-07-24)
* (Apollon77) Further optimize Cookie handling

### 3.3.0 (2020-07-19)
* (Apollon77) Hopefully allow easier upgrades if old deviceId is invalid now
* (Apollon77) Allow to have separate deviceIds per instance

### 3.2.8 (2020-07-16)
* (Apollon77) Work around Amazon Security changes and make proxy working again

### 3.2.7 (2020-07-15)
* (Apollon77) Work around Amazon Security changes and make proxy working again
* (arteck) add echo studio

### 3.2.6 (2020-07-15)
* (Apollon77) Work around Amazon Security changes and make proxy working again

### 3.2.5 (2020-07-13)
* (Apollon77) Work around Amazon Security changes and make proxy working again 
* (Apollon77) fix Sentry crash case when Amazon do not respond correctly (IOBROKER-ALEXA2-1C)

### 3.2.4 (2020-06-18)
* (Apollon77) Update Alexa-Remote Library to optimize communication error/timeout cases

### 3.2.3 (2020-06-17)
* (Apollon77) Fix currentState handling

### 3.2.2 (2020-06-17)
* (Apollon77) remove goodnight because was not working
* (Apollon77) Fix Play/Pause states and some media optimizations

### 3.2.1 (2020-06-17)
* (Apollon77) update amazon-cookie library: another optimization for Node.js 14

### 3.2.0 (2020-06-17)
* (Apollon77/hive) add new commands, jokes/facts/goodnight/cleanup
* (Apollon77/hive) add new command curatedtts with allowed values ["goodbye", "confirmations", "goodmorning", "compliments", "birthday", "goodnight", "iamhome"] to play random curated sentences
* (Apollon77) Prevent some crashes
* (Apollon77) Make sure Timer are not triggering the state when deleted
* (Apollon77) make sure that Lists objects are deleted correctly when deleting
* (Apollon77) Make compatible with nodejs 14
* (Apollon77) Adjust to changes from Amazon so that initial Proxy process works again
* (OberstVonGatow) Make sure that for Spotify Media data requests do not have negative effects and stop the playback

### 3.1.2 (2020-03-18)
* (Gieskanne/Apollon77) Add Next Timer Date as state
* (Apollon77) Fix missing history entries
* (Apollon77) Prevent List deletions from logging errors
* (Apollon77) optimiztions, dependency updates and fixes
* (Apollon77) Switch to ioBroker own sentry instance
* (Apollon77) add Info.softwareVersion

### 3.0.8 (2020-01-19)
* (Apollon77) fix some crash cases
* (Apollon77) Update Sentry DSN and add filtering
* (Apollon77) Update deps

### 3.0.7 (2019-12-28)
* (Apollon77) Prevent some errors

### 3.0.6 (2019-12-26)
* (Apollon77) Prevent some errors

### 3.0.5 (2019-12-25)
* (Apollon77) Prevent some errors

### 3.0.4 (2019-12-24)
* (Apollon77) Prevent some errors

### 3.0.3 (2019-12-24)
* Adapter needs nodejs 8+ and js-controller 2.0 now!
* (Zefau) add functionality for handling of lists
* (Apollon77) Add answerText when available from history
* (Apollon77) handle error for empty valueMaps for ColorTemperatures
* (Apollon77) also support names for new special routines (Alarm Notifications, Sensor Detections, ..)
* (Apollon77) GitHub Actions for Test& Build
* (Apollon77) Add Sentry for error reporting
* (Apollon77) prevent some crashed after changes by Amazon
* (Apollon77) fix Routine names after changes by Amazon
* (Apollon77) add some devices and new images
* (Apollon77) Add more situations to update player status because amazon send no info anymore on title changes

### 2.6.4 (2019-07-25)
* (Apollon77) add some error handling for contacts

### 2.6.1 (2019-07-22)
* (Apollon77) add new device
* (Apollon77) fix volume logic for ssml
* (Apollon77) Allow reminders to bet set >+ 1day

### 2.6.0 (2019-07-21)
* (Apollon77) added possibility to send text messages to users including himself, allows deletion of all messages to himself
* (Apollon77) added option to reset Cookies. After sahev the adapter will restart and needs to get a new Login (see adapter config)
* (Apollon77) change announcement and ssml to send commands more synchronous

### 2.5.0/1 (2019-07-07/18)
* (INgoRah) Support compact mode
* (Apollon77) enhance error handling for broken authentications

### 2.4.6 (2019-07-05)
* (Apollon77) enhance error handling for broken authentications

### 2.4.5 (2019-07-01)
* (Apollon77) enhance error handling for broken authentications

### 2.4.4 (2019-06-26)
* (Apollon77) new devices added

### 2.4.3 (2019-06-25)
* (Apollon77) enhance error handling for Amazon Push Infos

### 2.4.1/2 (2019-06-23)
* (Apollon77) Allow to specify an external docker container IP to override Proxy-IP
* (Apollon77) Add more Devices from GitHub
* (Apollon77) try to work around an Image URL bug from Amazon
* (Apollon77) optimize Admin display of Status/Link
* (Apollon77) add Link to https://alexa.amazon.com to Admin instance overview
* (Apollon77) Remove Admin2 support
* (Apollon77) Optimize Handling from DNS errors (hopefully) to prevent stopped Adapters on Internet/DNS problems

### 2.3.3 (2019-06-21/22)
* (Apollon77) adjust to current Amazon changes
* (Apollon77) fix volume handling
* (Apollon77) Add some more devices
* (Apollon77) Logging reduced
* (Apollon77) unknown devices get commands activated automatically
* (Apollon77) remove Email/Password fields and add info about login to Admin screen (still needs to be polished, only Admin v3)
* (Apollon77) detect App-Devices and remove them from the list because they are not usable in any way

### 2.2.0 (2019-01-xx) [unpublished]
* (Apollon77) add new sequenceCommands "calendarNext", "calendarToday", "calendarTomorrow"
* (Apollon77) fix wake word handling and history sanitizing

### 2.1.0 (2019-01-13) [unpublished]
* (Apollon77) cookie handling completely rewritten, no email/password anymore, only Proxy (still only from log)
* (Apollon77) fixes routine triggering that triggered on wrong device sometimes
* (Apollon77) added new commands "deviceStop", "announcement", "notification", and "ssml" (see documentation above)

### 1.1.3 (2018-11-17)
* (Apollon77) optimize cookie handling again

### 1.1.2 (2018-11-17)
* (Apollon77) new devices
* (Apollon77) make proxy for cookies work again

### 1.1.1 (2018-11-09)
* (Apollon77) new devices
* (Apollon77) make proxy for cookies work again

### 1.1.0 (2018-09-18)
* (Apollon77) Further optimizations to lower number of requests
* (Apollon77) Experimental support for Playlist IDs (p1234567) in TuneIn-Station

### 1.0.1 (2018-09-16)
* (Apollon77) fixes and important changes to make sure not too many requests are sent

### 1.0.0 (2018-09-06)
* (Apollon77) polishng and finalization, make it 1.0.0

### 0.7.5 (2018-09-04)
* (Apollon77) speak can now contain separated text by semicolons. These Texts will then be spoken sequencially. So the old limit if 250 characters is only existing for one such text part. So, now longer texts are possible too. Separate it with a semicolon.
* (Apollon77) more color handling fixes

### 0.7.0 (2018-08-30)
* (Apollon77) Add Bespoken Virtual device support to be able to interact with Alexa infrastructure
* (Apollon77) add new Device Types for Smarthome-integration (Contact and Motion sensors)

### 0.6.4 (2018-08-30)
* (Apollon77) fixes to colorhandling
* (Apollon77) allow to deliver a volume together with aspeak command by using "80;text" and then volume is set before speak and reset afterwards. Experimental!

### 0.6.1 (2018-08-24)
* (Apollon77) sometimes new alarms were not triggered in adapter
* (Apollon77) add support to control smart devices and groups (and also add groups). Because I was only able to test a few types i added logging. please check log, try out and report back!
* (Apollon77) When routines are executed via voice command and push connection is enabled the routine state is also triggered by "true" with ack=true when routine trigger text is matching exactly to spoken text
* (Apollon77) corrected volume and mute handling in states, a volume of 0 is also seen as "muted" if muting flag is not supported by device
* (Apollon77) when speak text is coming from cloud adapter and contains SSML tags they will be filtered out, so you can use a speak endpoint directly to output response from Smart Home skill actions

### 0.5.2 (2018-08-16)
* (Apollon77) fix an error when getting new cookie
* (Apollon77) add new "Playlist" states for the Music providers to directly prepend "playlist" :-)
* (Apollon77) Volumes are not updated for multiroom devices when === 0
* (Apollon77) Add Reminder and Alarms support. Write time and pot. text separated by comma into the "New" stat to create a new one (e.g. "10:00:00, Test-Reminder")
* (Apollon77) Also with Push-Connection some times states are generally updated to make sure data are correct (e.g. player media info will disappear 2h after stopping the music)
* (Apollon77) Added some more deviceTypes

### 0.4.0 (2018-08-13)
* (Apollon77) internal Refactoring
* (Apollon77) states that are not needed anymore will be removed. This will be logged for now, so please check this and give feedback!
* (Apollon77) sanitized music provider state names (spaces are now dashes ... should be removed automatically)
* (Apollon77) Renamed TuneIn-Direct to TuneIn-Station (even if you still can enter text to search, this works with stations too) ... should be removed automatically)
* (Apollon77) Device and Bluetooth status is now also checked at states update
* (Apollon77) After enabling Push-Connection the configured polling is turned off and anything is done based on real time informations from Alexa. Test it
* (Apollon77) Enhanced History states to include the status of the action (SUCCESS, FAIL ...), infos from returned cards (if available) and info on accessed skill for this action.
* (Apollon77) When using Push-Connection History update is also updated automatically. An empty summary with status DISCARDED_NON_DEVICE_DIRECTED_INTENT means the activation of the echo by saying the wake word
* (Bluefox) Add icons for some of the devices for Admin

### 0.3.8 (2018-07-27)
* (Apollon77) Several Multiroom-fixes
* (Apollon77) fixed shuffle/repeat
* (Apollon77) fixed status for play, pause, shuffle and repeat

### 0.3.4 (2018-07-27)
* (Apollon77) Only 20 Routines were queried, now up to 2000
* (Apollon77) Also allow commands including speak for multiroom, BUT it is triggered per device, so NO synchronous audio output!!
* (Apollon77) Thanks to Matten-Matten also Music-provers can be started on multiroom devices

### 0.3.2 (2018-07-25)
* (Apollon77) Fix volume settings for multiroom devices (please report other devices where it is not working)
* (Apollon77) Add serial number and name to Info

### 0.3.0 (2018-07-24)
* (Bluefox) Admin3 fixes and slight changes to roles and code
* (Apollon77) Reworked state names (hopefully last time!)
* (Apollon77) Combine Player-Control and Player-Info into channel Player to support better detection and material support
* (Apollon77) Added further information in Infos states per echo device
* (Apollon77) Try to detect the type of the device different and decide if commands are available or not (till capabilities are known better)
* (Apollon77) New "Music-Provider" states depending on available music providers with possibility to enter a text to play something (same as you would speak it)
* (Apollon77) Volume is send different now, so that it also works when Device player get's inactive

### 0.2.4 (2018-07-22)
* (pix) materialize settings window
* (Apollon77) WOn IP is set automatically with IP from first network interface
* (Apollon77) fix comma replacements in speaks, do not speak empty text
* (Apollon77) if Device is Multiroom, the do not create Routines and Commands and not bluetooth
* (Apollon77) add information about multiroom device and master (later we can use this to sort out commands that are impossible with multiroom)
* (Apollon77) History is also stored as JSON, so it can be used to monitor one datapoint and have all infos on updateState
* (Apollon77) Several other fixes

### 0.2.3 (2018-07-20)
* (Apollon77) in Numbers with . are replaced by commas

### 0.2.2 (2018-07-20)
* (Apollon77) Finally fix device renaming

### 0.2.1 (2018-07-20)
* (Apollon77) Small fix of history channel type and setting states initially

### 0.2.0 (2018-07-20) (as iobroker.alexa2)
* (Apollon77) 0.2.0: added many Player-Info datapoints including "progress updates " when media is playing
* (Apollon77) 0.2.0: removed "Notifications" because the only benefit for now is to show them, no interaction or change possible
* (Apollon77) 0.2.0: adapter now allows to configure intervals for history updates and other data updates like player info
* (Apollon77) 0.2.0: if cookie could not be determined correctly a proxy is started to allow manual login and cookie is catched in the background on success
* (Apollon77) 0.2.0: add info datapoints for connection (connected to Alexa), cookie and csrf
* (Apollon77) 0.2.0: rework complete logic to not use soef library anymore
* (Apollon77) 0.2.0: Speaking free text at any timepoint is available under Commands.speak
* (Apollon77) 0.2.0: Sequence-Commands (weather, traffic, flashbriefing, goodmorning, singasong, tellstory) are available to be triggered under "Commands"
* (Apollon77) 0.2.0: Automation-Routines are now available to be triggered per device under "Routines"
* (Apollon77) 0.2.0: Automatically use different user-agents for Win32, MacOS and Linux based systems
* (Apollon77) 0.2.0: Automatically use different user-agents for Win32, MacOS and Linux based systems
* (Apollon77) 0.2.0: Also support entering TuneIn-Station IDs ("s" plus 4-6 digits) to play that station

### 0.1.0 (2018-07-10)
* (Apollon77) get Adapter working again, especially getting cookie and optimize refresh

### 0.0.x
* soef versions

## License

The MIT License (MIT)

Copyright (c) 2018-2022 Ingo Fischer <iobroker@fischer-ka.de>, 2017-2018 soef <soef@gmx.net>

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