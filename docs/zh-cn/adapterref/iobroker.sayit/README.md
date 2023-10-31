---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sayit/README.md
title: ioBroker sayit 适配器
hash: /unz3ntgh85Hz+ZiPVipGk8JExnbZ/YczfEFY+uJno8=
---
![标识](../../../en/adapterref/iobroker.sayit/admin/sayit.png)

![安装数量](http://iobroker.live/badges/sayit-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.sayit.svg)
![下载](https://img.shields.io/npm/dm/iobroker.sayit.svg)

# IoBroker sayit 适配器
![测试与发布](https://github.com/ioBroker/iobroker.sayit/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/sayit/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!从 js-controller 3.0 开始使用 Sentry 报告。

SayIt Adapter 可以将文本转换为语音并在某些设备上播放。

＃＃ 配置
实际上，支持以下输出：

- *浏览器* - 文本将通过打开的“iobroker.vis”页面的浏览器播放。几乎所有桌面浏览器和少数移动浏览器都支持它。

- *[Home24- MediaPlayer](http://www.home-24.net/index.php?app=media)* - 文本将发送到安装了 Home24 - MediaPlayer 的 Android 设备并播放。为此，将使用 Android 中构建的文本转语音引擎。端口不能更改，设置为50000。

- *Home24 - MediaPlayer 和 [FTP 服务器](https://play.google.com/store/apps/details?id=rudey.FTPServer)* - 文本将通过 Home24 - MediaPlayer 在 Android 设备上发送和播放安装。为此，将使用谷歌文本转语音引擎。生成的 mp3 文件将通过 FTP 复制到 Android 设备并使用 Home24 - MediaPlayer 播放。

    两个应用程序必须具有相同的主目录。 （例如“sd 卡”的根目录）。

- *系统* - 文本将由运行 ioBroker 适配器的操作系统播放。支持以下操作系统：Windows、linux、Mac OSx。

- *Windows 引擎* - 文本将由运行 sayIt 适配器的 Windows 播放。为此，将使用 Windows 文本转语音引擎，该引擎应由用户预先配置。您可以在[此处](http://windows.microsoft.com/en-us/windows/setting-speech-options#1TC=windows-7)查看如何设置。

- *Sonos* - 在 Sonos 设备上播放文本。确保 Web Adaptor 已启用。需要使 SONOS 能够读取生成的 mp3 文件。

- *Heos* - 在 HEOS 设备上播放文本。确保 Web Adaptor 已启用。需要启用 HEOS 才能读取生成的 mp3 文件。

- *Chromecast* - 在 Chromecast 设备上播放文本。

- *MPD* - 在音乐播放器守护进程上播放文本。仅对 Web 适配器使用 **http**，不要使用 https。

要在 RaspberryPI 或 Linux 系统上启用文本转语音功能，请执行以下命令 `sudo apt-get -y install mpg321` 一次以安装 mpg321。

mp3/wav 文件可以通过将其名称写入对象来播放。 （例如`/vis.0/main/img/door-bell.mp3`）

必须首先加载该文件。

### TTS 引擎
在线的：

- 谷歌：英语、德语、俄语、意大利语、西班牙语、法语；
- Yandex：俄语

要使用 Yandex 语音，您必须在此处请求 API 密钥：[https://tech.yandex.ru/speechkit/cloud/doc/dg/concepts/About-docpage/](https://tech.yandex.ru/speechkit/cloud/doc/dg/concepts/About-docpage/)。 [此服务将于 2019 年 1 月 1 日停用，并由 Yandex.cloud 取代] 要使用 Yandex.cloud，您应该在此处注册：[https://cloud.yandex.ru/]，在云端安装 SpeechKIT API 并获取身份验证令牌和文件夹 ID，如 API 说明中所述。

- 云：要使用云语音，您需要配置并运行“云”适配器或直接在设置中输入应用程序密钥
- 亚马逊网络服务 Polly：

  要使用 AWS Polly 语音，您需要创建访问密钥和秘密密钥[此处](https://console.aws.amazon.com/iam/home)。您可以在[此处找到亚马逊文档](http://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html)。

离线：

- PicoTTS（仅限 Linux）：英语、德语、意大利语、西班牙语、法语；

对于 PicoTTS，需要安装以下软件包：`libttspico-utils` 和 lame。
安装命令：`sudo apt-get install libttspico-utils lame`

- Coqui TTS：英语、德语、西班牙语、法语、荷兰语、日语、中文；

  有关如何使用的说明，请访问[官方文档](https://tts.readthedocs.io/en/latest/index.html)

### 云和 Amazon Web Services Polly 文本格式
您可以使用 [语音合成标记语言](http://docs.aws.amazon.com/polly/latest/dg/ssml.html) 设置文本格式。

最有用的功能：

- `<break time="3s"/>`- 暂停 x 秒（最多 10 秒）。
- `<emphasis> big </emphasis>` - 强调某个单词。
- `<prosodyvolume="+6dB"rate="90%">我正在说这个</prosody>` - 控制速度和音量参数。
- `<say-asterpret-as="digits">12345</say-as>` - 分别说出每个数字。

更多[信息](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speech-synthesis-markup-language-ssml-reference)。

###系统命令
如果您有一些程序可以在本地或其他地方播放音频文件，您可以在此处编写此命令。例如。

```myCustomPlayer --option```

如果选择 **System** 输出，`sayit` 适配器将在本地系统上执行以下命令：

```myCustomPlayer --option /opt/iobroker/node_modules/iobroker.sayit/say.mp3```

如果文件名必须保留在中间的某个位置，您可以使用 *%s* 来指定文件名必须放置的位置：

```myCustomPlayer --option "%s" > /dev/null```

说它将从中制作```myCustomPlayer --option "/opt/iobroker/node_modules/iobroker.sayit/say.mp3" > /dev/null```。

＃＃ 用法
SayIt 适配器不能单独使用。它必须通过 javascript 适配器或通过特定小部件的“vis”进行控制。
创建适配器实例后，您可以找到以下对象：

- `sayit.N.tts.text`：要说出的短语。
- `sayit.N.tts.volume`：播放短语时使用的音量。
- `sayit.N.tts.playing`：如果文本正在播放则为 true，否则为 false。仅支持“Windows”和“系统”播放模式。
- `sayit.N.tts.cachetext`：要缓存的短语，然后可以在没有互联网的情况下使用。

   例如，您可以在此处手动输入“No internet”，如果 ping 到 google.com 为负，请将“No internet”写入“tts.text”，然后就会发音。当然，必须启用缓存。

状态`tts.text`支持扩展语法，因此语言/引擎和卷可以与文本一起定义。它用于启用多语言文本到语音引擎。
例如，如果适配器具有“Google-english”引擎，则可以使用短语```de:Sag es```强制使用Google-Deutsch语音引擎。

通过```ru;75;Погода хорошая```，我们可以强制使用俄语和音量 75%。

您可以以当前或给定音量（而不是最大）的百分比指定公告音量。例如，如果命令是```de;75;Gutes Wetter```并且“公告音量”是 50%，则公告将以 100% 的 38% 音量播放。

也可以指定播放mp3文件的系统命令。如果将其留空，将使用默认设置：windows - `cmdmp3.exe`、OSX - `/usr/bin/afplay`、linux - `mpg321` 或 `omxplayer`（推荐）。

要安装 omxplayer，请写入 ```sudo apt-get install omxplayer``` 或写入 ```sudo apt-get install mpg321``` 以安装 mpg321。

**注意：** 只有在实例启动后才可以选择默认的公告选择。

### 优先事项
尽管有排队文本，但要立即发音文本，您有 2 种可能性：

- 地方 ”！”作为文本中的第一个字符，因此该文本将在当前字符之后立即发音。
- 将 true 写入“tts.clearQueue”状态，队列将被清除。之后，您可以将新文本写入“tts.text”，但所有排队的文本都会被丢弃。

＃＃＃ 引擎
发动机可能有以下值：

＃＃＃＃ 谷歌
- **en** - 英语
- **德** - 德语
- **pl** - 波兰
- **ru** - Русский
- **英国** - український
- **它** - 意大利
- **es** - 西班牙语
- **fr** - 法语
- **nl** - 荷兰
- **zh-CN** - 简体中文
- **pt** - 葡萄牙语

#### Yandex
- **ru_YA:Yandex** - Русский
- **ru_YA_CLOUD:Yandex Cloud** - Русский [Yandex.Cloud API 生成 OGG 格式的文件。要在 Linux 上播放 ogg 文件，应安装 mplayer 并选择为系统播放器]

#### 通过云的 Amazon Poly
- **ru-RU_CLOUD_Female** - Русский - Татьяна
- **ru-RU_CLOUD_Male** - Русский - Максим
- **de-DE_CLOUD_Female** - 德语 - Marlene
- **de-DE_CLOUD_Male** - 德语 - 汉斯
- **de-DE_CLOUD_Female_Vicki** - 德语 - Vicki
- **de-DE_CLOUD_Male_Daniel** - 德语 - 丹尼尔
- **de-AT_CLOUD_Female_Hannah** - 奥地利 - 汉娜
- **en-US_CLOUD_Female** - en-US - 女性 - Salli
- **en-US_CLOUD_Male** - en-US - 男 - Joey
- **da-DK_CLOUD_Female** - da-DK - 女 - Naja
- **da-DK_CLOUD_Male** - da-DK - 男 - Mads
- **en-AU_CLOUD_Female** - en-AU - 女 - Nicole
- **en-AU_CLOUD_Male** - en-AU - 男 - Russell
- **en-GB_CLOUD_Female_Amy** - en-GB - 女 - Amy
- **en-GB_CLOUD_Male** - en-GB - 男 - Brian
- **en-GB_CLOUD_Female_Emma** - en-GB - 女 - 艾玛
- **en-GB-WLS_CLOUD_Female** - en-GB-WLS - 女性 - Gwyneth
- **en-GB-WLS_CLOUD_Male** - en-GB-WLS - 男 - Geraint
- **cy-GB_CLOUD_Female** - cy-GB - 女 - Gwyneth
- **cy-GB_CLOUD_Male** - cy-GB - 男 - Geraint
- **en-IN_CLOUD_Female** - en-IN - 女 - Raveena
- **en-US_CLOUD_Male_Chipmunk** - en-US - 男性 - 花栗鼠
- **en-US_CLOUD_Male_Eric** - en-US - 男 - Eric
- **en-US_CLOUD_Female_Ivy** - en-US - 女性 - Ivy
- **en-US_CLOUD_Female_Jennifer** - en-US - 女性 - Jennifer
- **en-US_CLOUD_Male_Justin** - en-US - 男 - Justin
- **en-US_CLOUD_Female_Kendra** - en-US - 女性 - Kendra
- **en-US_CLOUD_Female_Kimberly** - en-US - 女性 - Kimberly
- **es-ES_CLOUD_Female** - es-ES - 女性 - Conchita
- **es-ES_CLOUD_Male** - es-ES - 男 - 恩里克
- **es-US_CLOUD_Female** - es-US - 女性 - Penelope
- **es-US_CLOUD_Male** - es-US - 男 - Miguel
- **fr-CA_CLOUD_Female** - fr-CA - 女性 - Chantal
- **fr-FR_CLOUD_Female** - fr-FR - 女 - Celine
- **fr-FR_CLOUD_Male** - fr-FR - 男 - Mathieu
- **is-IS_CLOUD_Female** - is-IS - 女 - Dora
- **is-IS_CLOUD_Male** - is-IS - 男 - Karl
- **it-IT_CLOUD_Female** - it-IT - 女 - Carla
- **it-IT_CLOUD_Male** - it-IT - 男 - Giorgio
- **nb-NO_CLOUD_Female** - 否 - 女 - Liv
- **否-NO_CLOUD_Female** - 否-NO - 女性 - Ida
- **nl-NL_CLOUD_女性** - nl-NL - 女性 - 乐天
- **nl-NL_CLOUD_Male** - nl-NL - 男 - Ruben
- **pl-PL_CLOUD_Female_Agnieszka** - pl-PL - 女 - Agnieszka
- **pl-PL_CLOUD_Male_Jacek** - pl-PL - 男 - Jacek
- **pl-PL_CLOUD_Female_Ewa** - pl-PL - 女性 - Ewa
- **pl-PL_CLOUD_Male_Jan** - pl-PL - 男 - Jan
- **pl-PL_CLOUD_女性** - pl-PL - 女性 - Maja
- **pt-BR_CLOUD_Female** - pt-BR - 女 - 维多利亚
- **pt-BR_CLOUD_Female_Camila** - pt-BR - 女 - 卡米拉
- **pt-BR_CLOUD_Male** - pt-BR - 男 - Ricardo
- **pt-PT_CLOUD_Male** - pt-PT - 男 - Cristiano
- **pt-PT_CLOUD_Female** - pt-PT - 女性 - Ines
- **ro-RO_CLOUD_Female** - ro-RO - 女 - 卡门
- **sv-SE_CLOUD_Female** - sv-SE - 女性 - 阿斯特丽德
- **tr-TR_CLOUD_Female** - tr-TR - 女 - Filiz
- **pt-BR_CLOUD_Female_Camila** - pt-BR - 女 - 卡米拉

#### 微微 TTS
- **en-US** - 美国英语
- **en-GB** - 英语 GB
- **de-DE** - 德语
- **it-IT** - 意大利
- **es-ES** - 西班牙语
- **fr-FR** - 法语

#### 科基 TTS
- 英语
- 德语
- 西班牙语
- 法国人
- 荷兰
- 日本

#### Amazon Poly 直接
- **ru-RU_AP_Female** - Русский - Татьяна
- **ru-RU_AP_Male** - Русский - Максим
- **de-DE_AP_Female** - 德语 - Marlene
- **de-DE_AP_Female_Vicki** - 德语 - Vicki
- **de-DE_AP_Male** - 德语 - 汉斯
- **en-US_AP_Female** - en-US - 女 - Salli
- **en-US_AP_Male** - en-US - 男 - Joey
- **da-DK_AP_女性** - da-DK - 女性 - Naja
- **da-DK_AP_Male** - da-DK - 男 - Mads
- **en-AU_AP_Female** - en-AU - 女 - Nicole
- **en-AU_AP_Male** - en-AU - 男 - Russell
- **en-GB_AP_Female_Amy** - en-GB - 女 - 艾米
- **en-GB_AP_Male** - en-GB - 男 - Brian
- **en-GB_AP_Female_Emma** - en-GB - 女 - 艾玛
- **en-GB-WLS_AP_Female** - en-GB-WLS - 女 - Gwyneth
- **en-GB-WLS_AP_Male** - en-GB-WLS - 男 - Geraint
- **cy-GB_AP_女性** - cy-GB - 女性 - 格温妮丝
- **cy-GB_AP_Male** - cy-GB - 男 - Geraint
- **en-IN_AP_Female** - en-IN - 女 - Raveena
- **en-US_AP_Male_Chipmunk** - en-US - 男性 - 花栗鼠
- **en-US_AP_Male_Eric** - en-US - 男 - Eric
- **en-US_AP_Female_Ivy** - en-US - 女性 - Ivy
- **en-US_AP_Female_Jennifer** - en-US - 女性 - Jennifer
- **en-US_AP_Male_Justin** - en-US - 男 - 贾斯汀
- **en-US_AP_Female_Kendra** - en-US - 女性 - Kendra
- **en-US_AP_Female_Kimberly** - en-US - 女性 - Kimberly
- **es-ES_AP_Female** - es-ES - 女性 - Conchita
- **es-ES_AP_Male** - es-ES - 男 - 恩里克
- **es-US_AP_Female** - es-US - 女性 - 佩内洛普
- **es-US_AP_Male** - es-US - 男 - Miguel
- **fr-CA_AP_女性** - fr-CA - 女性 - 尚塔尔
- **fr-FR_AP_Female** - fr-FR - 女 - Celine
- **fr-FR_AP_Male** - fr-FR - 男 - Mathieu
- **is-IS_AP_Female** - is-IS - 女 - Dora
- **is-IS_AP_Male** - is-IS - 男 - Karl
- **it-IT_AP_女性** - it-IT - 女性 - 卡拉
- **it-IT_AP_Male** - it-IT - 男 - Giorgio
- **nb-NO_AP_女性** - nb-NO - 女性 - Liv
- **nl-NL_AP_女性** - nl-NL - 女性 - 乐天
- **nl-NL_AP_Male** - nl-NL - 男 - Ruben
- **pl-PL_AP_Female_Agnieszka** - pl-PL - 女 - Agnieszka
- **pl-PL_AP_Male_Jacek** - pl-PL - 男 - Jacek
- **pl-PL_AP_Female_Ewa** - pl-PL - 女 - Ewa
- **pl-PL_AP_Male_Jan** - pl-PL - 男 - Jan
- **pl-PL_AP_女性** - pl-PL - 女性 - Maja
- **pt-BR_AP_女性** - pt-BR - 女性 - 维多利亚
- **pt-BR_AP_Male** - pt-BR - 男 - 里卡多
- **pt-PT_AP_Male** - pt-PT - 男 - Cristiano
- **pt-PT_AP_女性** - pt-PT - 女性 - Ines
- **ro-RO_AP_Female** - ro-RO - 女 - 卡门
- **sv-SE_AP_女性** - sv-SE - 女性 - 阿斯特丽德
- **tr-TR_AP_女性** - tr-TR - 女性 - Filiz
- **ko-KR_AP_女性** - ko-KR - 女性 - Seoyeon

<!-- 下一个版本的占位符（在行的开头）：

### **正在进行中** -->

## Changelog
### 4.0.0 (2023-10-31)
* (bluefox) Breaking changes: A minimal node.js version is 16
* (bluefox) Browser outputs now to vis(1) and vis-2

### 3.0.5 (2023-04-17)
* (bluefox) Corrected error with System player
* (bluefox) Do not allow for chromecast to cache files.
* (bluefox) Allowed to add cloud App-Key without running cloud adapter
* (bluefox) Added austrian language
* (bluefox) Added norwegian language
* (klein0r) Used sendTo instead of setState in blockly

### 3.0.0 (2023-04-03)
* (bluefox) Restored cloud engines. Warning: update cloud adapter to at least 4.4.0
* (bluefox) Breaking changes: A minimal node.js version is 14

### 2.1.2 (2023-03-27)
* (bluefox) Corrected engines with web-link

### 2.1.1 (2023-03-24)
* (Jey-Cee) Added support for Coqui TTS
* (bluefox) Renamed all configuration attributes

### 2.0.0 (2023-03-23)
* (bluefox) Adapter was completely rewritten with async/await
* (bluefox) Could be buggy

### 1.13.0 (2023-03-22)
* (bluefox) Made compatible with future js-controller

### 1.12.6 (2022-02-09)
* (bluefox) used setForeignBinaryState if possible

### 1.12.5 (2022-02-09)
* (bluefox) Fixed errors in io-package.json

### 1.12.3 (2021-06-25)
* (bluefox) corrected the Google engine
* (bluefox) Added new voices: german, korean, brasil, Dutch

### 1.12.2 (2020-11-07)
* (Apollon77) Prevent crash case (Sentry IOBROKER-SAYIT-Q, IOBROKER-SAYIT-S, IOBROKER-SAYIT-T)

### 1.12.0 (2020-10-19)
* (withstu) Support for HEOS was added

### 1.11.5 (2020-09-24)
* (Apollon77) prevent scheduled restart problems

### 1.11.3 (2020-09-17)
* (Apollon77) make sure initialize errors do not crash adapter (Sentry IOBROKER-SAYIT-N)

### 1.11.2 (2020-08-08)
* (Apollon77) catch errors in MDNS discovery (Sentry IOBROKER-SAYIT-E)

### 1.11.1 (2020-08-06)
* (Apollon77) handle errors from process spawn better (Sentry IOBROKER-SAYIT-D)

### 1.11.0 (2020-08-02)
* (Apollon77) Move the generated mp3 file to an own directory in iobroker-data instead of inside node_modules (Hopefully not breaking)
* (Apollon77) Change File write to use Sync methods to make sure they cannot run in parallel

### 1.10.2 (2020-07-19)
* (Apollon77) Crash case prevented (Sentry IOBROKER-SAYIT-8)

### 1.10.1 (2020-07-16)
* (Apollon77) Handle edge cases and prevent crashes (Sentry IOBROKER-SAYIT-4, IOBROKER-SAYIT-6)
* (Apollon77) try to get caching working again for Yandex

### 1.10.0 (2020-07-07)
* (algar42) GUI updated to fill drop-downs correctly. Premium voices added to Yandex.Cloud engine

### 1.9.8 (2020-06-11)
* (Apollon77) fixed error handling on file copy

### 1.9.7 (2020-06-11)
* (algar42) tts.ogg state added for ogg file type

### 1.9.6 (2020-05-24)
* (bluefox) Showed names of SONOS devices

### 1.9.4 (2020-05-11)
* (Apollon77) Fix Blockly
* (Apollon77) Update dependencies

### 1.9.3 (2020-04-24)
* (bluefox) Fixed blockly with missing languages

### 1.9.2 (2020-04-21)
Changed type of top-level object to "meta" in order to comply with js-controller v3

### 1.9.1 (2020-03-12)
* (foxriver76) removed usage of adapter.getMessage

### 1.9.0 (2019-11-06)
* (algar42) Output file extension is changed dynamically based on the engine selected

### 1.8.2 (2019-07-11)
* (bluefox) Web server URL will be updated if web server was updated

### 1.8.1
* Add Ukrainian Google Language

### 1.8.0 (2018-12-04)
* (bluefox) Priority for the text was added

### 1.7.1 (2018-09-19)
* (BuZZy1337) fixed error in Blockly-Block

### 1.7.0 (2018-06-08)
* (bluefox) Ivona removed
* (bluefox) Error was fixed by upload of file to FTP
* (bluefox) admin3

### 1.6.8 (2018-04-11)
* (BuZZy1337) Generate separate mp3 files for each instance.
* Fixes [Issue#34](https://github.com/ioBroker/ioBroker.sayit/issues/34)
* (BuZZy1337) Always upload mp3 files to the state sayit.X.tts.mp3

### 1.6.7 (2018-02-05)
* (Apollon77) Remove unneeded logging
* (bondrogeen) Admin3 Fixes

### 1.6.6 (2017-11-27)
* (angelnu) Wait for a Google Home announcement to complete

### 1.6.5 (2017-11-04)
* (bluefox) Fix cloud .pro

### 1.6.4 (2017-10-18)
* (bluefox) Fix system commands

### 1.6.3 (2017-10-04)
* (bluefox) Code refactoring
* (bluefox) Add google home as output
* (bluefox) Remove ivona because not more supported

### 1.5.2 (2017-03-09)
* (bluefox) Catch error if some directory in mp3 folder

### 1.5.1 (2017-02-15)
* (bluefox) Fix blockly language

### 1.5.0 (2017-01-27)
* (DarkChaos) Add AWS Polly as source
* (bluefox) Add cloud as source

### 1.4.0 (2017-01-16)
* (bluefox) fixed install problem
* (bluefox) add PicoTTS as source

### 1.3.3 (2017-01-13)
* (bluefox) show only installed instances in blockly

### 1.3.2 (2017-01-10)
* (angelnu) changes for new chromecast tts

### 1.3.1 (2016-12-27)
* (bluefox) small fixed of config dialog
* (AirKing555) Fix Volume change

### 1.3.0 (2016-12-20)
* (instalator) add mpd

### 1.2.1 (2016-10-31)
* (bluefox) Fix cache

### 1.2.0 (2016-10-28)
* (bluefox) Finish sayit

### 1.1.3 (2016-10-24)
* (bluefox) Fix changing of engine

### 1.1.2 (2016-10-20)
* (bluefox) Add omxplayer option

### 1.0.1 (2016-10-12)
* (bluefox) support of blockly

### 1.0.0 (2016-05-14)
* (bluefox) Make the type of mp3 as file

### 0.3.16 (2015-12-26)
* (Vegetto) Support for Chromecast devices

### 0.3.16 (2015-12-26)
* (bluefox) enable play of mp3 files from disk

### 0.3.15 (2015-11-10)
* (bluefox) fill default settings by first start

### 0.3.14 (2015-11-01)
* (bluefox) fixed error with sayItWindows

### 0.3.13 (2015-10-27)
* (bluefox) fixed error with sayItSystem

### 0.3.12 (2015-10-06)
* (bluefox) fixed error if received mp3 file is too short
* (bluefox) try to implement cache datapoint (you can use sayit.0.tts.cachetext to create cache for phrases and use sayit without internet)

### 0.3.11 (2015-08-03)
* (bluefox) change google requests from http to https

### 0.3.10 (2015-07-26)
* (bluefox) add new voice Russian-Maxim
* (bluefox) fixed error with mp24ftp

### 0.3.9 (2015-07-09)
* (bluefox) fixed error by mediaplayer24

### 0.3.8 (2015-06-09)
* (bluefox) make the volume for announcement configurable
* (bluefox) make the command for "system" configurable

### 0.3.7 (2015-05-28)
* (bluefox) fixed volume for an announcement
* (bluefox) support for play files from internal filesystem, like "/sayit.0/tts.userfiles/myGong.mp3"

### 0.3.6 (2015-03-24)
* (bluefox) fixed error with volume by sonos

### 0.3.5 (2015-03-22)
* (bluefox) fixed error in an announcement

### 0.3.4 (2015-03-20)
* (bluefox) fixed error in an announcement

### 0.3.3 (2015-03-20)
* (bluefox) enable announcement

### 0.3.2 (2015-03-16)
* (bluefox) clear cache if engine changed

### 0.3.1 (2015-03-15)
* (bluefox) fixed small error with log

### 0.3.0 (2015-03-08)
* (bluefox) add ivona/Amazon voices

### 0.2.2 (2015-03-08)
* (bluefox) fixed error by buffering of non-generated texts.

### 0.2.1 (2015-03-07)
* (bluefox) fixed error by buffering of non-generated texts.

### 0.2.0 (2015-03-02)
* (bluefox) add yandex-russian support

### 0.1.0 (2015-03-02)
* (bluefox) queue texts

### 0.0.1 (2015-02-06)
* (bluefox) initial commit

## License

The MIT License (MIT)

Copyright (c) 2014-2023, bluefox <dogafox@gmail.com>

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