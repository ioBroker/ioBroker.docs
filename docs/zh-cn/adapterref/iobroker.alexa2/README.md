---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.alexa2/README.md
title: ioBroker.alexa2
hash: 0tkrZY32K/97TQpOQ+IVlSzPZ7AfaQ5i4iO5NNUUD+A=
---
![标识](../../../en/adapterref/iobroker.alexa2/admin/alexa.png)

![安装数量](http://iobroker.live/badges/alexa2-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.alexa2.svg)
![下载](https://img.shields.io/npm/dm/iobroker.alexa2.svg)

# IoBroker.alexa2
![测试和发布](https://github.com/Apollon77/iobroker.alexa2/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/alexa2/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅 [Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!从 js-controller 3.0 开始使用哨兵报告。

此适配器可让您远程控制 Alexa (Amazon Echo) 设备。

非常感谢 soef 提供适配器的第 1 版，感谢 Hauke 和 ruhr70 在他们来自 ioBroker-Forum 的脚本中的想法（尤其是媒体进度更新）！也非常感谢 meicker 支持记录所有这些以及来自 ioBroker 论坛的众多用户的测试支持！

## 状态及其含义：
在适配器命名空间（例如 alexa2.0）中创建了一些通道

### Alexa2.0
|州名 |意思 |
| - | - |
|回声设备。* |每个 Echo 设备的状态，见下文 |
|历史。* |命令历史信息，见下文 |
|智能家居设备。* |每个智能家居设备的状态和一般情况，见下文 |
|信息。*|有关适配器状态的一般信息 |
|请求结果 | TuneIn 和智能家居设备请求的错误信息 |

### Alexa2.0.Contacts.ContactId.*
所有可用于发送文本消息的 Alexa 联系人，包括他自己。自己的联系人在他的名字后有一个特殊的“（自我）”。

|州名 |意思 |
| - | - |
| #clearOwnMessages |只存在于自己的联系人中，触发器会删除发送给自己的所有消息（还包括通过应用程序或设备发送给自己的消息！） |
|短信 |将此文本作为消息发送给用户。它显示在该用户的所有设备上，带有“黄色环” |

### Alexa2.0.Echo-Devices.Serialnumber.*
在“回声设备”下，每个亚马逊回声设备都列出了它的序列号。并非每个设备都显示所有状态。每个设备都有自己的状态，如下所述：

### Alexa2.0.Echo-Devices.Serialnumber.Alarm.*
每个设备的警报 (Wecker) 设置（如果可用）。

|州名 |意思 |价值 |
| - | - | - |
|启用 |显示警报状态并允许更改它： 用真激活警报 - 用假停用警报 |真/假|
|时间 |是时候报警了。覆盖现有闹钟的时间以为此闹钟设置新时间。如果您有一个现有的闹钟，您可以通过简单地以 hh:mm:ss 格式覆盖时间来更改时间，不需要设置秒 |时间输入 |
|触发|如果达到并触发警报，则为 true。时钟必须与 Amazon 和 iobroker 同步，一旦到达闹钟时间，使用它来触发其他操作 |真/假|
| recurringPattern |显示警报的重复模式 | 0 = 一次，不重复<br>P1D = 每天<br>XXXX-WD = 工作日<br>XXXX-WE = 周末<br>XXXX-WXX-1 = 每个星期一<br>XXXX-WXX-2 = 每个星期二<br>XXXX-WXX-3 = 每个星期三<br>XXXX-WXX-4 = 每周四<br>XXXX-WXX-5 = 每周五<br>XXXX-WXX-6 = 每个星期六<br>XXXX-WXX-7 = 每个星期日 |
|新 |该设备的新警报时间。如果您在此处输入值，则会创建一个新警报 |时间输入（hh:mm:ss，不需要秒）|

### Alexa2.0.Echo-Devices.Serialnumber.Bluetooth.*
在这里您可以找到所有已连接或已知的具有 MAC 地址的蓝牙设备。每个设备的状态：

|州名 |意思 |
| - | - |
|已连接 |显示当前连接状态并允许连接（设置为 true）或断开连接（设置为 false） |
|取消配对 |取消此设备与回声设备配对的按钮 |

### Alexa2.0.Echo-Devices.Serialnumber.Commands.*
使用命令，您可以在 Alexa 设备上触发一些操作。如果您在多房间设备上使用这些，那么它们将独立执行并且*不会*在单个设备上同步运行！

|州名 |意思 |价值 |
| - | - | - |
|请勿打扰 |打开/关闭此设备的“请勿打扰”|真/假|
|简报| 100秒简报-新闻等.pp|按钮 |
|早安|早上好，来自 Alexa ...|按钮 |
|事实|来自 Alexa 的有趣事实......（目前仅限美国）|按钮 |
|笑话|来自 Alexa 的笑话...|按钮 |
|清理 |播放类似于开始/结束聆听模式的“锣”音...|按钮 |
|策展人 |来自 Alexa 所选区域的随机句子...|文本（允许：“再见”、“确认”、“早安”、“赞美”、“生日”、“晚安”、“iamhome”）|
|唱歌 | Alexa 唱了一首歌...|按钮 |
|说话| Alexa 会说出您在此处输入的内容...|文本输入 |
|说话音量 |调整Alexa的说话音量，这个音量在说话前设置，然后重置| 0-100 |
|讲故事| Alexa 讲故事 |按钮 |
|交通|交通新闻 |按钮 |
|天气 |天气新闻 |按钮 |
|设备停止 |停止设备上的所有操作 |按钮 |
|通知 |向设备客户发送文本通知 |文字 |
|公告|播放公告（如在文本前使用 Bing 说话） |文字 |
| ssml |说 SSML XML 字符串 |文字 |
|文本命令 |向 Alexa 发送文本命令，目前仅限美国！ |文字 |

详细信息 发言和通知：在此处输入您希望 Alexa 说的话。您还可以通过在文本前给出一个百分比来调整 Alexa 的音量。
示例：10;Alexa 说 Alexa 的音量为 10%，而 100;Alexa 的音量为 100%。
通常每个说话命令只能发送 250 个字符。通过使用分号，您可以随心所欲地书写，只要您用分号分隔 250 个字符即可。
然后，Alexa 会在短暂的休息后依次朗读文本。您还可以通过编写 #Volume;#Block1;#Block2，a.s.o 将音量与更多 255 个块一起使用，a.s.o 此处设置的音量将用于定义的说话音量。

部分声音也来自 https://developer.amazon.com/en-US/docs/alexa/custom-skills/ask-soundlibrary.html 工作。在 speak 或 ssml 中指定为 `<audio src="soundbank://soundlibrary/animals/amzn_sfx_bear_groan_roar_01"/>`。详情和讨论请访问 https://forum.iobroker.net/topic/27509/ssml-audio

### Alexa2.0.Echo-Devices.Serialnumber.Info.*
有关 Alexa 设备的信息

|州名 |意思 |价值 |
| - | - | - |
|能力|功能如果alexa设备|信息 |
|设备类型 |来自亚马逊的设备类型 |信息 |
|设备类型字符串 |设备类型为字符串 |信息 |
| isMultiroomDevice |是多房间设备 - 多房间是虚拟设备组 |信息，真/假|
| isMultiroomMember |是多房间成员 - 如果为 true，则设备是多房间设备组的一部分 |信息，真/假|
| MultiroomParents |如果此设备是多房间设备组的一部分，则此状态显示父组设备 |信息 |
|姓名 | Alexa 设备名称 |信息 |
|序列号 | Alexa 设备序列号 |

### Alexa2.0.Echo-Devices.Serialnumber.Music-Provider.*
直接告诉 Alexa 播放来自受支持音乐提供商的音乐或播放列表。实际支持的有：My Library、Amazon Music、Tune In。您还可以在短语中包含多房间设备组名称以在该组上播放（例如“SWR3 auf Erdgeschoss”）

|州名 |意思 |价值 |
| - | - | - |
|亚马逊音乐 |短语与亚马逊音乐一起玩 |文字输入 |
|亚马逊音乐播放列表 |与亚马逊音乐一起播放的播放列表 |文字输入 |
|我的图书馆 |与我的图书馆一起玩的短语 |文字输入 |
|我的图书馆播放列表 |播放列表与我的图书馆一起播放 |文字输入 |
|收听 |与 Tune In 一起演奏的乐句 |文字输入 |
|收听播放列表 |使用 Tune In 播放的播放列表 |文字输入 |

### Alexa2.0.Echo-Devices.Serialnumber.Player.*
控制设备播放并查看当前状态和媒体信息的状态

|州名 |意思 |价值 |
| - | - | - |
| TuneIn-Station |文本字段输入电台名称以在此设备上播放此电台。也可以输入电台编号 (s123456...)、节目/播客 ID (p1234567...) 或主题 ID (t123456789...) |文字输入 |
|内容类型 |文本字段放入所需内容以在此设备上播放 |信息 |
|控制前进 |触发玩家“前进”命令的按钮（30 秒）|按钮 |
|控制下一页 |按钮触发玩家“下一步”命令|按钮 |
|控制暂停|按钮触发玩家“暂停”命令|按钮 |
|控制播放 |按钮触发播放器“播放”命令|按钮 |
| controlPrevious |按钮触发玩家“上一个”命令|按钮 |
|控制重复 |按钮触发玩家“重复”命令|真/假|
|控制倒带 |触发播放器“倒带”命令的按钮（30 秒）|按钮 |
| controlShuffle |切换为播放器启用或禁用随机播放模式 |真/假|
|当前专辑 |当前专辑实际播放|信息 |
|当前艺术家 |当前艺术家实际演奏|信息 |
|当前状态 |如果播放 -> true ，否则 false|真/假|
|当前标题|当前标题实际播放|信息 |
|图片网址 |相册图片的 URL |信息 |
| mainArtURL |当前主要艺术的 URL |信息 |
|媒体长度 |当前标题的长度 |信息 |
| mediaLengthStr |活动媒体长度为 (HH:)MM:SS |信息 |
| mainProgress |活动媒体已用时间 |信息 |
| mainProgressPercent |活动媒体已用时间百分比 |信息 |
| mediaProgressStr |活动媒体进度为 (HH:)MM:SS |信息 |
| miniArtUrl |艺术网址（迷你）|信息 |
|静音 | '静音' 状态 | Information, true / false, volume = 0 被认为是静音 |
|提供者 ID |当前音乐提供商的 ID |信息 |
|供应商名称 |当前音乐提供商的名称 |信息 |
|电台 ID | TuneIn 电台的 ID |信息 |
|服务 |当前音乐服务的名称 |信息 |
|音量 |播放音量。您可以输入 0-100% 之间的值 |输入量 |

### Alexa2.0.Echo-Devices.Serialnumber.Reminder.*
每个设备的提醒 (Erinnerungen) 设置（如果有）。

|州名 |意思 |价值 |
| - | - | - |
|启用 |显示提醒状态并允许更改它： 使用真激活提醒 - 使用假停用提醒，禁用时将在一段时间后自动删除 |真/假|
|时间|提醒时间。覆盖现有提醒的时间以设置新时间 |时间输入 |如果您有现有的提醒，您可以通过简单地以 hh:mm:ss 格式覆盖时间来更改时间，不需要设置秒 |
|触发|如果达到并触发提醒，则为 true。时钟必须与亚马逊和iobroker同步，一旦到了提醒时间，使用它来触发其他动作|真/假|

|新 |在格式中添加新的提醒<br>时间（时：分），文本<br>|文本输入<br>12:00，提醒我

### Alexa2.0.Echo-Devices.Serialnumber.Routines.*
Alexa 应用程序中设置的例程概述。自创建的例程有一个序列号，亚马逊显示为“预配置：...”每个例程都可以通过一个按钮触发运行一次。

|州名 |意思 |价值 |
| - | - | - |

|例程的序列或内部名称 |例程名称 |按钮

### Alexa2.0.Echo-Devices.Serialnumber.Timer.*
您可以在每台 Alexa 设备上运行一个或多个计时器。由于计时器的动态特性，不会像使用警报或提醒那样创建更多对象，但是存在一种获取触发信息的方法。

|州名 |意思 |价值 |
| - | - | - |

|触发|定时器被触发 |信息

**请注意ipbroker主机的时区设置与您当地的时区相匹配很重要，否则触发的时间检测可能是错误的！**

### Alexa2.0.Echo-Devices.Serialnumber.online
这个 Alexa 设备是否在线并连接到亚马逊云？

|州名 |意思 |价值 |
| - | - | - |

|在线 |设备是否在线？ |真假

### Alexa2.0.History
|州名 |意思 |价值 |
| - | - | - |
| #触发器 |获取新历史记录的按钮（比创建时间中的时间戳更当前），仅在不使用推送连接时才需要 |按钮 |
|卡片内容 | Alexa-App/Echo Show | 中显示的附加信息信息 |
| cardJson |附加信息如 Alexa-App/Echo Show 中以 JSON 格式显示 |信息 |
|创作时间 |此历史条目的日期，只有在以后作为此时间戳时才考虑新的历史条目 |信息 |
|域应用程序 ID |附加信息，如技能 ID 等，可选 |信息 |
|域应用名称 |附加信息，如技能名称等，可选 |信息 |
| json |最后一个命令数据的 Json 能够处理所有信息，例如在自己的 JavaScript 中| JSON |
|姓名 |获得最后一个请求的设备名称 |信息 |
|序列号 |获得最后一个请求的设备的序列号 |信息 |
|状态 |对 Alexa 的最后一条命令的状态 |成功 / 故障 / DISCARDED_NON_DEVICE_DIRECTED_INTENT;最后一个是在通过说出唤醒词激活设备时生成的，或者当设备将输入丢弃为“不适合我”时生成 |
|摘要 |设备收到的文本/摘要/操作 |信息 |

### Alexa.0.Smart-Home-Devices
包括 Alexa 从您的技能中知道的所有智能家居设备。对于所有已知设备，状态如下：

|州名 |意思 |价值 |
| - | - | - |

|全部删除 |从 Alexa 中删除所有智能家居设备，与 Alexa 应用程序中的按钮相同 |按钮 |发现设备 |查找新的智能家居设备，与 Alexa 应用程序中的按钮相同 |按钮 |查询全部 |查询所有设备，只有在至少一台设备能够检索信息时才可见|按钮

### Alexa.0.Smart-Home-Devices.SerialNumber.*
|州名 |意思 |价值 |
| - | - | - |

| #删除|从 Alexa 中删除智能家居设备 |按钮 | #启用 |智能家居设备是否处于活动状态？ |信息

| #查询 |查询此设备的数据，仅当智能家居设备/技能支持检索信息时可见 |按钮 |
|活跃 |当场景可以激活/停用时显示|真/假|
|电源状态|打开/关闭电源 |多变，真/假|
| ... |更多可能的状态取决于智能家居设备的类型|信息或可变:-) |

**-> 颜色/灯光设备的特殊状态**

|州名 |意思 |价值 |
| - | - | - |
|亮度| HUE灯的亮度|可变 0-100% |
|颜色-亮度|颜色定义的亮度（连同色调和饱和度，HSV）|信息，0-1% |
|色调|颜色的色调值（连同亮度和饱和度，HSV）|信息，0-360° |
|色彩饱和度|颜色的饱和度（连同亮度和色调，HSV）|信息, 0-1 |
|颜色RGB |实际颜色的 RGB 代码由 color-* 值构成 |信息，#rrggbb |
|颜色名称 | Alexa 定义的颜色名称 - 固定值 |可更改设置颜色，0-144 |
| colorTemperarureInKelvin |开尔文色温 |信息，1000-10000K |
|颜色温度名称 | Alexa 定义的色温名称 - 固定值 |可更改设置，0-18 |

使用#brightness 可以调整灯光的亮度，#colorName 是选择一种预定义的颜色（0-144）。对于 HUE 环境光，您可以在 #colorTemperatureName 中从 0-18 的 19 个值之间进行选择。所有的灯都可以用#powerState 打开和关闭。

### Alexa2.0.Info.*
|州名 |意思 |价值 |
| - | - | - |
|连接 |如果与 Alexa 的连接正常 |信息 -> 真/假 |
|饼干 | Alexa cookie，与多个也想访问 Alexa API 的外部脚本一起使用 |信息 |
| csrf | Alexa CSRF，与多个也想访问 Alexa API 的外部脚本一起使用 |信息 |

## 缺少功能
* 如何更新音量、随机播放或重复播放和请勿打扰的初始状态？！还是不需要的？
* 添加字段以显示播放信息，如 JS 版本
* 如果 cookie/csrf 无效，则自行停用

＃＃ 安装
像往常一样使用稳定存储库、最新存储库或使用 ioBroker 来自 GitHub 的“安装”选项

＃＃ 故障排除
### 通过电子邮件/密码确定 Cookie 的问题
有时，当 Amazon 在登录时检测到意外流量时，他们会进行适当的检查。
这可能会导致需要回答验证码才能登录的问题。
大多数情况下，此验证码需要回答一次，此后无需验证码即可登录。

当您需要回答这样的验证码时，请尝试执行以下操作：

* 使用通用浏览器（例如 Chrome）
* 禁用Javascript！
* 清除亚马逊可能存在的所有 cookie 或使用浏览器的 Proivate/Incognito 模式
* 致电 https://alexa.amazon.de
* 你应该得到一个登录表单（通常在旧的移动浏览器中显示）
* 使用您注册 Echo/Alexa 的亚马逊凭证登录那里
* 您可能需要登录两次或解决验证码
* 最后你应该看到“https://alexa.amazon.de/spa/index.html”作为 URL 但没有任何实际内容（因为 JS 仍然被禁用），但这完全没问题！！！！
* 现在尝试再次获取 cookie
* 如果它仍然不起作用，请再次尝试并从浏览器中检查 User-Agent 和 accept-Language 并在下次尝试时使用适配器中的那些

此外，Accept-Language-Header（默认为“de-DE”）需要与您的语言/浏览器语言/您登录的亚马逊页面的语言相匹配。

您还可以尝试使用 User-Agent 并使用与您使用的系统类型更匹配的一种。
例如，使用“Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36”作为用户代理被报告为当 ioBroker 在 linux 系统上运行时工作得更好。

您可以覆盖适配器配置中的所有这些参数。

### 如何自己确定Cookie？
如果自动 Cookie 确定不起作用，或者您不相信适配器会提供电子邮件/密码，那么您可以自行确定 cookie。网上有几个信息如何做到这一点。这里有一些链接：

* https://www.gehrig.info/alexa/Alexa.html
* 或使用 https://blog.loetzimmer.de/2017/10/amazon-alexa-hort-auf-die-shell-echo.html 中的 shellscript 将其放在 shell 上...

但请注意：Cookie 将在一段时间后超时，然后适配器将停止工作并自行禁用。然后您需要手动获取一个新的 cookie！

## Changelog

### __WORK IN PROGRESS__
* (Apollon77) Fix crash case
* (ammawel) Add recurringPattern for Notifications (see Readme)
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

Copyright (c) 2018-2021 Ingo Fischer <iobroker@fischer-ka.de>, 2017-2018 soef <soef@gmx.net>

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