---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.alexa2/README.md
title: ioBroker.alexa2
hash: hIgfNRM8mI+AD4Vh929r4j7dHFzbcmZU/Q3a1cuctuw=
---
![商标](../../../en/adapterref/iobroker.alexa2/admin/alexa.png)

![安装数量](http://iobroker.live/badges/alexa2-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.alexa2.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.alexa2.svg)

＃ioBroker.alexa2
![测试与发布](https://github.com/Apollon77/iobroker.alexa2/workflows/Test%20and%20Release/badge.svg)[![翻译状态]（https://weblate.iobroker.net/widgets/adapters/-/alexa2/svg-badge.svg）](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用服务[哨兵](https://sentry.io)向开发人员自动向我报告异常和代码错误以及新设备架构。**更多详细信息，请参见下文！

此适配器使您可以远程控制Alexa（Amazon Echo）设备。

非常感谢soef提供该适配器的版本1，并感谢Hauke和ruhr70提供了来自ioBroker-Forum的脚本中的想法（尤其是媒体进度更新）！还要感谢meicker对所有这些文档的支持以及ioBroker论坛的许多用户的测试支持！

##状态及其含义：
在适配器名称空间（例如alexa2.0）中，创建了一些通道

### Alexa2.0
|州名|意思|
| - | - |
|回声设备。每个Echo设备的状态，请参见下文|
|历史记录。* |有关命令历史记录的信息，请参见下文|
|智能家居设备。* |每个智能家居设备的状态，以及一般情况，请参见下文|
|信息* |有关适配器状态的常规信息|
| requestResult | TuneIn和智能家居设备请求的错误信息|

### Alexa2.0.Contacts.ContactId。*
可用于向其发送文本消息的所有Alexa联系人，包括他本人。自己的联系人在其姓名后得到一个特殊的“（（自我）”）。

|州名|意思|
| - | - |
| #clearOwnMessages |仅存在于自己的联系人中，触发器将删除发送给自己的所有消息（还包括通过App或设备发送给自己的消息！） |
| textMessage |将此文本作为消息发送给用户。此用户的所有设备上均显示“黄色环”。 |

### Alexa2.0.Echo-Devices.Serialnumber。*
在“回声设备”下，列出了每个亚马逊回声设备及其序列号。并非每个设备都显示所有状态。每个设备都有自己的状态，如下所述：

### Alexa2.0.Echo-Devices.Serialnumber.Alarm。*
每个设备的警报（Wecker）设置（如果有）。

|州名|意思|值|
| - | - | - |
|启用|显示警报状态并允许对其进行更改：启用为true的警报-禁用为false的警报|正确/错误|
|时间|警报时间。覆盖现有警报的时间以为此警报设置新时间。如果您已有警报，可以在此处通过简单地以hh：mm：ss格式覆盖时间来更改时间，而无需设置秒。时间输入|
|触发如果达到并触发警报，则为true。时钟必须与Amazon和iobroker保持同步，一旦达到闹钟时间，就可以使用此时钟来触发其他操作|正确/错误|
|新品|该设备发出新警报的时间。如果在此处输入值，将创建一个新警报。时间输入（hh：mm：ss，不需要秒） |

### Alexa2.0.Echo-Devices.Serialnumber.Bluetooth。*
在这里，您可以找到具有MAC地址的所有已连接或已知的蓝牙设备。每个设备的状态：

|州名|意思|
| - | - |
|已连接|显示当前的连接状态，并允许连接（设置为true）或断开连接（设置为false） |
|不成对|取消此设备与echo设备的配对的按钮。 |

### Alexa2.0.Echo-Devices.Serialnumber.Commands。*
使用命令，您可以在Alexa设备上触发一些操作。如果您在多房间设备上使用它们，那么它们将独立执行，并且*将不会*在单个设备上同步运行！

|州名|意思|值|
| - | - | - |
| doNotDisturb |打开/关闭请勿打扰此设备|是/否|
|简报|在100秒内进行简报-新闻等。纽扣 |
|早安|来自Alexa的早上好... |纽扣 |
|功能|来自Alexa的有趣事实...（目前仅美国）|纽扣 |
|笑话来自Alexa的笑话... |纽扣 |
|清理|像播放聆听模式的开始/结束一样播放“锣”音... |纽扣 |
|策展人|来自Alexa所选区域的随机句子... |文本（允许使用：“再见”，“确认”，“早安”，“赞美”，“生日”，“晚安”，“ iamhome”）|
| singasong | Alexa唱了一首歌... |纽扣 |
|讲| Alexa说您在此处输入的内容... |文字输入|
|音量|调整Alexa的语音音量，该音量会在语音通话之前设置好，然后再重新设置| 0-100 |
|讲故事| Alexa讲故事|纽扣 |
|交通|交通新闻|纽扣 |
|天气天气新闻纽扣 |
| deviceStop |停止设备上的所有操作|纽扣 |
|通知|发送文本通知给设备的客户|文字|
|公告|播放公告（例如讲话，但在文本前加上Bing）|文字|
| ssml |说出SSML XML字符串|文字|
| textcommand |将文字指令发送到Alexa，目前仅在美国！ |文字|

详细信息发言和公告：在此处输入您想让Alexa说的内容。您还可以通过在文本前输入一个百分比来调整Alexa的音量。
例如：10; Alexa说Alexa的音量为10％，而100; Alexa的音量为100％。
通常，每个语音命令只能发送250个字符。通过使用分号，只要用分号分隔250个字符，就可以编写任意数量的文字。
然后，Alexa将稍稍休息一下，然后彼此说出文字。您还可以通过编写#Volume;＃Block1;＃Block2，a.s.o将音量与255个以上的块一起使用，此处设置的音量将用于定义的语音音量。

从https://developer.amazon.com/zh-CN/docs/alexa/custom-skills/ask-soundlibrary.html工作中也可以听到部分声音。在语音或ssml中指定为`<audio src="soundbank://soundlibrary/animals/amzn_sfx_bear_groan_roar_01"/>`。有关详细信息和讨论，请访问https://forum.iobroker.net/topic/27509/ssml-audio

### Alexa2.0.Echo-Devices.Serialnumber.Info。*
有关Alexa设备的信息

|州名|意思|值|
| - | - | - |
|能力| alexa设备提供的功能|信息|
| deviceType |亚马逊提供的设备类型|信息|
| deviceTypeString |设备类型为字符串信息|
| isMultiroomDevice |是多房间设备-多房间是虚拟设备组|信息，对/错|
| isMultiroomMember |是Multiroom成员-如果为true，则该设备属于Multiroom设备组|信息，对/错|
|多人家长|如果此设备是多房间设备组的一部分，则此状态将显示父组设备|。信息|
|名称| Alexa设备的名称|信息|
|序列号| Alexa设备的序列号|

### Alexa2.0.Echo-Devices.Serialnumber.Music-Provider。*
直接告诉Alexa播放音乐或受支持的音乐提供商的播放列表。实际支持的是：我的图书馆，亚马逊音乐，调入。您还可以在短语中加入一个多房间设备组名称，以便在该组中播放（例如“ SWR3 auf Erdgeschoss”）

|州名|意思|值|
| - | - | - |
|亚马逊音乐|玩Amazon Music的短语|文字输入|
|亚马逊音乐播放列表|播放列表可与Amazon Music一起播放|文字输入|
|我的图书馆|玩“我的书架”的短语文字输入|
|我的图书馆播放列表|可与“我的媒体库”一起播放的播放列表|文字输入|
|调入|播放“ Tune In”的短语文字输入|
|播放中音调|播放列表可与Tune In一起播放|文字输入|

### Alexa2.0.Echo-Devices.Serialnumber.Player。*
控制设备播放并查看当前状态和媒体信息的状态

|州名|意思|值|
| - | - | - |
| TuneIn-Station |输入要在该设备上播放此电台的电台名称的文本字段。也可以输入站号（s123456 ...），显示/播客ID（p1234567 ...）或主题ID（t123456789 ...）|文字输入|
| ContentType |文本字段以放置所需的内容以在此设备上播放|信息|
| controlForward |触发播放器“前进”命令的按钮（30秒）|纽扣 |
|控制下一个|按钮触发播放器的“下一个”命令纽扣 |
| controlPause |按钮触发播放器“暂停”命令纽扣 |
| controlPlay |按钮触发播放器“播放”命令纽扣 |
| controlPrevious |按钮触发播放器的“上一个”命令纽扣 |
| controlRepeat |按钮触发播放器“重复”命令正确/错误|
| controlRewind |触发播放器“倒带”命令的按钮（30秒）|纽扣 |
| controlShuffle |切换为播放器启用或禁用随机播放模式|正确/错误|
| currentAlbum |当前正在播放专辑信息|
| currentArtist |当前正在演奏的艺术家|信息|
| currentState |如果播放-> true，则为false |正确/错误|
| currentTitle |当前正在播放的标题|信息|
| imageURL |相册图像的URL |信息|
| mainArtURL |当前主要艺术作品的网址|信息|
| mediaLength |当前标题的长度|信息|
| mediaLengthStr |有效媒体长度为（HH：）MM：SS |信息|
| mainProgress |主动媒体经过时间|信息|
| mainProgressPercent |有效媒体耗用时间（以百分比为单位）|信息|
| mediaProgressStr |活动媒体进度为（HH：）MM：SS |信息|
| miniArtUrl |艺术品网址（迷你）|信息|
|静音| “ MUTE”的状态|信息，对/错，音量= 0被认为是静音|
| providerID |当前音乐提供商的ID |信息|
| providerName |当前音乐提供商的名称|信息|
| radioStationId | TuneIn广播电台的ID |信息|
|服务|当前音乐服务的名称|信息|
|数量播放音量。您可以输入0-100％|输入量|

### Alexa2.0.Echo-Devices.Serialnumber.Reminder。*
每个设备的提醒（Erinnerungen）设置（如果有）。

|州名|意思|值|
| - | - | - |
|启用|显示提醒状态并允许对其进行更改：使用true激活提醒-使用false禁用提醒，禁用后将在一段时间后自动删除。正确/错误|
|时间|提醒时间。覆盖现有提醒的时间以设置新时间|时间输入|如果您已有提醒，则可以在此处更改时间，只需以hh：mm：ss格式覆盖时间即可，无需设置秒。 |
|触发如果达到并触发了提醒，则为true。时钟必须与Amazon和iobroker保持同步，一旦达到提醒时间，可使用此时钟来触发其他操作|正确/错误|

|新品|以以下格式添加新的提醒<br>时间（hh：mm），文字<br>|文字输入<br>12:00，提醒我

### Alexa2.0.Echo-Devices.Serialnumber.Routines。*
在Alexa App中设置的例程概述。自行创建的例程具有序列号，Amazon显示为“ preconfigured：...”（预配置：...），每个例程都可以通过按钮触发一次，以运行一次。

|州名|意思|值|
| - | - | - |

|例程的序列号或内部名称|例程名称|按钮

### Alexa2.0.Echo-Devices.Serialnumber.Timer。*
您可以在每台Alexa设备上运行一个或多个计时器。由于计时器具有非常动态的特性，因此不会再创建像“警报”或“提醒”这样的其他对象，但是存在一种获取触发信息的方法。

|州名|意思|值|
| - | - | - |

|触发计时器被触发|信息

### Alexa2.0.Echo-Devices.Serialnumber.online
此Alexa设备是否在线且已连接到Amazon云？

|州名|意思|值|
| - | - | - |

|在线|设备在线吗？ |真假

### Alexa2.0。历史
|州名|意思|值|
| - | - | - |
| #trigger |按钮以获取新的历史记录（更多的当前时间，然后是creationTime中的时间戳），仅在不使用推式连接时才需要|纽扣 |
| cardContent |其他信息，如Alexa-App / Echo Show中所示。信息|
| cardJson |如JSON格式所示，其他信息如Alexa-App / Echo中所示。信息|
| creationTime |此历史记录条目的日期，仅当此时间戳记|稍后才考虑新的历史记录条目。信息|
| domainApplicationId |其他信息，例如Skill-ID或类似信息，可选|信息|
| domainApplicationName |其他信息，例如技能名称或类似信息，可选|信息|
| json |最后命令数据的Json能够处理所有信息，例如用自己的JavaScript | JSON |
|名称|上次请求的设备的名称|信息|
| serialNumber |得到最后一个请求的设备的序列号|信息|
|状态|对Alexa的最后命令状态|成功/故障/ DISCARDED_NON_DEVICE_DIRECTED_INTENT;当说出唤醒字来激活设备时，或者当设备将输入丢弃为“不适合我”时，将生成最后一个。 |
|总结设备收到的文本/摘要/操作|信息|

### Alexa.0。智能家居设备
包括Alexa从您的技能中了解的所有智能家居设备。所有已知设备的状态如下：

|州名|意思|值|
| - | - | - |

| deleteAll |与Alexa应用程序中的按钮相同，从Alexa删除所有智能家居设备。纽扣discoverDevices |查找新的智能家居设备，与Alexa App中的按钮相同|纽扣queryAll |查询所有设备，仅当至少一台设备能够检索信息时才可见|按钮

### Alexa.0.Smart-Home-Devices.SerialNumber。*
|州名|意思|值|
| - | - | - |

| #delete |从Alexa删除智能家居设备|纽扣#enabled |智能家居设备是否处于活动状态？ |信息

| #query |查询此设备的数据，仅当智能家居设备/技能支持检索信息时才可见|纽扣 |
|活跃当场景可以被激活/关闭时显示正确/错误|
| powerState |开启/关闭电源|多变，对/错|
| ... |根据智能家居设备的类型，还有更多可能的状态。信息或可变的:-) |

**->彩色/灯光设备的特殊状态**

|州名|意思|值|
| - | - | - |
|亮度| HUE灯的亮度|可变0-100％|
|色彩亮度|色彩清晰度的亮度（以及色相和饱和度，HSV）|信息，0-1％|
|色相|颜色的色相值（以及亮度和饱和度，HSV）|信息，0-360°|
|颜色饱和度|颜色的饱和度（以及亮度和色相，HSV）|信息0-1 |
| colorRGB |实际颜色的RGB代码是根据color- *值构建的|信息，＃rrggbb |
| colorName |由Alexa定义的颜色名称-固定值|可变以设置颜色，0-144 |
| colorTemperarureInKelvin |开尔文色温|信息，1000-10000K |
| colorTemperatureName | Alexa定义的色温名称-固定值|可变设置，0-18 |

使用#brightness，您可以调整灯光的亮度，＃colorName是选择一种预定义的颜色（0-144）。对于HUE环境光，您可以在#colorTemperatureName中的0-18值之间选择19个值。可以使用#powerState打开和关闭所有指示灯。

### Alexa2.0.Info。*
|州名|意思|值|
| - | - | - |
|连接|如果与Alexa的连接正常|信息->正确/错误|
| Cookie | Alexa cookie，与几个也要访问Alexa API的外部脚本一起使用|信息|
| csrf | Alexa CSRF，与几个也要访问Alexa API的外部脚本一起使用|信息|

##缺少功能
*如何更新音量，随机播放或重复播放和doNotDisturb的初始状态？还是不需要？
*添加字段以显示播放信息，例如JS版本
*如果cookie / csrf无效，则自动停用

＃＃ 安装
像往常一样，使用稳定的存储库，最新的存储库或使用GitHub的ioBroker“安装”选项

＃＃ 故障排除
###通过电子邮件/密码确定Cookie的问题
有时，当Amazon在登录时检测到意外流量时，就会对其进行怪异的检查。
这可能会导致需要输入验证码才能登录的问题。
通常，此验证码需要回答一次，此后无需使用验证码即可登录。

当您需要回答这样的验证码时，请尝试执行以下操作：

*使用常见的浏览器（例如Chrome）
*禁用Javascript！
*清除Amazon可能存在的所有cookie或使用浏览器的Proivate / Incognito模式
*致电https://alexa.amazon.de
*您应该获得一个登录表单（通常显示在较旧的移动浏览器中）
*使用您在其中注册了Echo / Alexa的Amazon凭证登录那里
*您可能需要登录两次或解决验证码
*最后，您应该看到“ https://alexa.amazon.de/spa/index.html”作为URL，但没有任何实际内容（因为仍然禁用了JS），但这完全可以！！！
*现在尝试再次获取cookie
*如果仍然无法正常运行，请再次执行该操作，然后从浏览器中检查User-Agent和accept-Language并在下一次尝试中使用适配器中的内容

另外，Accept-Language-Header（接受语言标头）（默认为“ de-DE”）需要与您的语言/浏览器语言/登录的亚马逊页面的语言匹配。

您也可以尝试使用User-Agent并使用一种与您使用的系统类型更多匹配项的代理。
例如，当ioBroker在Linux系统上运行时，使用User-Agent的示例使用“ Mozilla / 5.0（X11; Linux x86_64）AppleWebKit / 537.36（KHTML，例如Gecko）Chrome / 51.0.2704.103 Safari / 537.36”可以更好地工作。

您可以在适配器配置中覆盖所有这些参数。

###如何自行确定Cookie？
如果无法自动确定Cookie，或者您不信任适配器提供电子邮件/密码，那么您可以自己确定Cookie。网络上有几个信息。这里有一些链接：

* https://www.gehrig.info/alexa/Alexa.html
*或使用https://blog.loetzimmer.de/2017/10/amazon-alexa-hort-auf-die-shell-echo.html中的shellscript在外壳上获取它...

但是请注意：Cookie会在若干时间后超时，然后适配器将停止工作并自行禁用。然后，您需要手动获取一个新的cookie！

##什么是Sentry.io，什么报告给该公司的服务器？
Sentry.io是一项服务，供开发人员从其应用程序中获取有关错误的概述。确切地说，这是在此适配器中实现的。

当适配器崩溃或发生其他代码错误时，此错误消息（也出现在ioBroker日志中）将提交给Sentry。当您允许iobroker GmbH收集诊断数据时，还将包括您的安装ID（这是唯一ID，**没有**关于您，电子邮件，姓名等的任何其他信息）。这使Sentry可以对错误进行分组，并显示有多少唯一用户受此错误影响。所有这些都帮助我提供了基本上不会崩溃的无错误适配器。

## Changelog

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

### 0.1.x (Github only as iobroker.alexa)
* (Apollon77) 0.1.5: Adapter disables itself on error (no cookie/no csrf in cookie/captcha needed)
* (Apollon77) 0.1.5: Reorganized some states (delete object again please), add playerinfo section for later usage, hopefully fixed unplanned device renaming and other things
* (Apollon77) 0.1.5: Added adapter config options to overwrite used amazon-page, user-agent and accept-language for cookie determination and
* (Apollon77) 0.1.4: State changes are logged and only considered when ack=false!
* (Apollon77) 0.1.3: Corrected all roles, delete objects and start again!
* (Apollon77) 0.1.3: bluetooth connection status filled correctly initially
* (Apollon77) 0.1.2: Library fixes and updates
* (Apollon77) 0.1.1: Library fixes and updates

### 0.1.0 (2018-07-10)
* (Apollon77) get Adapter working again, especially getting cookie and optimize refresh

### 0.0.x
* soef versions

## License

The MIT License (MIT)

Copyright (c) 2017-2018 soef <soef@gmx.net>, 2018-2021 Ingo Fischer <iobroker@fischer-ka.de>

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