---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sayit/README.md
title: ioBroker sayit 适配器
hash: +ihpuczRngjRxTmffEJbUT5jR1VuwSqI598CSYm6N90=
---
![标识](../../../en/adapterref/iobroker.sayit/admin/sayit.png)

![安装数量](http://iobroker.live/badges/sayit-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.sayit.svg)
![下载](https://img.shields.io/npm/dm/iobroker.sayit.svg)

# IoBroker sayit 适配器
![测试与发布](https://github.com/ioBroker/iobroker.sayit/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/sayit/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用 Sentry 库自动向开发者报告异常和代码错误。** 更多详情以及如何禁用错误报告，请参阅 [Sentry插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！Sentry 报告功能从 js-controller 3.0 开始使用。

SayIt Adapter 可以将文本转换为语音并在某些设备上播放。

＃＃ 配置
实际上，支持以下输出：

- *浏览器* - 浏览器将在打开的 `iobroker.vis` 页面中播放文本。几乎所有桌面浏览器都支持此功能，少数移动浏览器也支持。

- *[Home24- MediaPlayer](http://www.home-24.net/index.php?app=media)* - 文本将发送到安装了 Home24- MediaPlayer 的 Android 设备并播放。这将使用 Android 内置的文本转语音引擎。端口不可更改，请设置为 50000。

- *Home24 - 媒体播放器和 [FTP 服务器](https://play.google.com/store/apps/details?id=lutey.FTPServer)* - 文本将发送到安装了 Home24 - 媒体播放器的 Android 设备并播放。此过程将使用 Google 的文本转语音引擎。生成的 mp3 文件将通过 FTP 复制到 Android 设备，并使用 Home24 - 媒体播放器播放。

两个应用程序必须具有相同的主目录。（例如，SD 卡的根目录）。

- *系统* - 文本将由运行 ioBroker 适配器的操作系统播放。支持的操作系统包括：Windows、Linux 和 Mac OS X。

- *Windows 引擎* - 文本将由 Windows 系统播放，sayIt 适配器在 Windows 系统中运行。为此，系统将使用 Windows 自带的文本转语音引擎，该引擎需要用户预先配置。您可以[点击此处](http://windows.microsoft.com/en-us/windows/setting-speech-options#1TC=windows-7)查看设置方法。

- *Sonos* - 在 Sonos 设备上播放文本。请确保已启用 Web Adapter。这是 Sonos 读取生成的 mp3 文件所必需的。

- *Heos* - 在 HEOS 设备上播放文本。请确保已启用 Web Adapter。这是 HEOS 读取生成的 mp3 文件所必需的。

- *Chromecast* - 在 Chromecast 设备上播放文本。

- *MPD* - 在音乐播放器守护进程中播放文本。Web 适配器仅使用 **http**，不要使用 https。

要在 RaspberryPI 或 linux 系统上启用文本转语音功能，请调用以下命令 `sudo apt-get -y install mpg321` 安装 mpg321。

可以通过将文件名写入对象来播放mp3/wav文件。（例如：`/vis.0/main/img/door-bell.mp3`）

必须先加载该文件。

### TTS发动机
在线的：

- Google：英语、德语、俄语、意大利语、西班牙语、法语；
Yandex：俄罗斯

要使用 Yandex 语音服务，您必须在此处申请 API 密钥：[https://tech.yandex.ru/speechkit/cloud/doc/dg/concepts/About-docpage/](https://tech.yandex.ru/speechkit/cloud/doc/dg/concepts/About-docpage/)。[此服务将于 2019 年 1 月 1 日停用，并由 Yandex.cloud 取代] 要使用 Yandex.cloud，您应该在此处注册：[https://cloud.yandex.ru/]，在云端安装 SpeechKIT API，并按照 API 说明获取身份验证令牌和文件夹 ID。

- FreeTTS：由 [https://freetts.org](https://freetts.org) 提供，包含 75 多种语言的 400 多种语音。

语言并非由引擎选择，而是由语音选择，例如 `de-DE-KatjaNeural`。

需要 [定价页面](https://freetts.org/pricing) 中的 API 密钥。该服务的免费层级会在每段文本后附加“使用 freeTTS.org 生成”的语音，因此不能用于公告。

- 云端：要使用云端语音，您需要配置并运行“云”适配器，或者直接在设置中输入应用密钥。
- Amazon Web Services Polly：

要使用 AWS Polly 语音，您需要创建访问密钥和秘密密钥 [您可以在这里找到亚马逊的文档：[https://console.aws.amazon.com/iam/home](https://console.aws.amazon.com/iam/home)。](http://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html)。

离线：

- PicoTTS（仅限 Linux）：英语、德语、意大利语、西班牙语、法语；

要使用 PicoTTS，需要安装以下软件包：`libttspico-utils` 和 lame。

安装命令：`sudo apt-get install libttspico-utils lame`

- Coqui TTS：英语、德语、西班牙语、法语、荷兰语、日语、中文；

使用方法请转至[官方文件](https://tts.readthedocs.io/en/latest/index.html)

### 文本生成测试
通过选项卡 `Engine` 上的按钮 `Test text generation`，您可以检查所选引擎是否配置正确。

字段 `Test text` 已预先填充所选引擎语言的测试语句，可根据需要进行更改。如果该字段为空，则将使用相同的语句。文本将根据对话框的设置生成，因此在测试之前不得保存这些设置。

文本仅生成，不会播放，因此即使没有播放器，测试也能正常运行。

对话框会显示生成文件的大小和时长，并尝试在新浏览器标签页中打开该文件，以便您收听。为此，ioBroker 管理员必须允许浏览器弹出窗口。

要同时测试生成和播放，请使用选项卡 `Player` 上的按钮 `Test`。

### 云计算和亚马逊网络服务 Polly 文本格式
您可以使用 [语音合成标记语言](http://docs.aws.amazon.com/polly/latest/dg/ssml.html) 格式化文本。

最实用的功能：

- `<break time="3s"/>`- 暂停 x 秒（最多 10 秒）。
- `<emphasis>大</emphasis>` - 强调某个词。
- `<prosody volume="+6dB" rate="90%">我正在说这个</prosody>` - 控制速度和音量参数。
- `<say-as interpret-as="digits">12345</say-as>` - 逐个读出每个数字。

更多 [信息](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speech-synthesis-markup-language-ssml-reference)。

### 系统命令
如果您有可以播放本地或其他位置音频文件的程序，您可以在这里输入该命令。例如：

`myCustomPlayer --option`

如果选择**系统**输出，则`sayit`适配器将在本地系统上执行以下命令：

`myCustomPlayer --option /opt/iobroker/node_modules/iobroker.sayit/say.mp3`

如果文件名必须位于文件中间的某个位置，可以使用 *%s* 来指定文件名必须放置的位置：

`myCustomPlayer --option "%s" > /dev/null`

sayIt 将从中生成 `myCustomPlayer --option "/opt/iobroker/node_modules/iobroker.sayit/say.mp3" > /dev/null`。

＃＃ 用法
SayIt 适配器不能单独使用。它必须通过 JavaScript 适配器或带有特定控件的“vis”界面进行控制。

创建适配器实例后，您可以找到以下对象：

- `sayit.N.tts.text`：要说的短语。
- `sayit.N.tts.volume`: 播放该短语时将使用的音量。
- `sayit.N.tts.playing`：如果文本正在播放，则为 true；否则为 false。仅支持“windows”和“system”播放模式。
- `sayit.N.tts.cachetext`：要缓存的短语，之后无需联网即可使用。

例如，您可以手动输入“无网络连接”，如果 ping 通 google.com 的结果为否定，则将“无网络连接”写入“tts.text”，系统就会朗读出来。当然，必须启用缓存。

状态 `tts.text` 支持扩展语法，因此可以同时定义语言/引擎和音量以及文本。它用于启用多语言文本转语音引擎。

例如，如果适配器具有引擎 `Google-english`，则可以使用短语 `de:Sag es` 强制使用 Google Deutsch 语音引擎。

使用 `ru;75;Погода хорошая` 可以强制使用俄语，音量设置为 75%。

您可以指定公告音量的百分比，该百分比基于当前音量或给定音量（而非最大音量）。例如，如果命令为 `de;75;Gutes Wetter`且“公告音量”为 50%，则公告将以 100% 最大音量的 38% 播放。

也可以指定播放 mp3 文件的系统命令。如果留空，则将使用默认设置：windows - `cmdmp3.exe`，OSX - `/usr/bin/afplay`，linux - `mpg321` 或 `omxplayer`（推荐）。

要安装 omxplayer，请输入 `sudo apt-get install omxplayer`；要安装 mpg321，请输入 `sudo apt-get install mpg321`。

**注意：** 默认公告选择仅在实例启动后才可进行。

使用 `sendTo`，您可以发送更多不同的参数，例如 `sonosDevice` 或 `browserInstance`：

```javascript
sendTo('sayit.0', 'say', {
    text: 'Hello',
    sonosDevice: 'Wohnzimmer', // optional, if not defined, the device from configuration will be used
    engine: 'Google-de', // optional, if not defined, the device from configuration will be used
    type: 'sonos', // optional, if not defined, the device from configuration will be used
    volume: 20, // optional, if not defined, the device from configuration will be used
});
```

### 优先事项
即使队列中已有文本，您仍想立即朗读文本，有两种方法：

- 将“!”放在文本的第一个字符，这样该文本就会在当前文本之后立即被读出。
将 `tts.clearQueue` 状态值设置为 true，队列将被清空。之后，您可以向 `tts.text` 写入新文本，但所有已排队的文本都将被丢弃。

### 发动机
发动机的可能取值如下：

＃＃＃＃ 谷歌
- **en** - 英语
- **de** - Deutsch
- **pl** - 波兰语
- **ru** - Русский
- **英国** - український
- **它** - 意大利语
- **es** - 西班牙语
- **fr** - 法语
- **nl** - 荷兰语
- **zh-CN** - 简体中文
- **pt** - Português

#### 免费TTS
- **freeTTS** - 语音、语速和音调均取自实例配置。

语言是语音的一部分，因此只有一个引擎名称。语音（例如 `de-DE-KatjaNeural`）在配置对话框中选择，系统会从服务中读取所有可用语音的列表。

请求长度限制为 10000 个字符，因此较长的文本会被分割并逐段朗读。

#### Yandex
- **ru_YA:Yandex** - Русский
- **ru_YA_CLOUD:Yandex Cloud** - Русский [Yandex.Cloud API 生成 OGG 格式的文件。要在 Linux 上播放 OGG 文件，需要安装 mplayer 并将其设置为系统播放器。]

#### Amazon Polly 通过云
- **ru-RU_CLOUD_Female** - Русский - Татьяна
- **ru-RU_CLOUD_Male** - Русский - Максим
- **de-DE_CLOUD_Female** - 德语 - Marlene
- **de-DE_CLOUD_Male** - 德语 - 汉斯
- **de-DE_CLOUD_Female_Vicki** - 德语 - Vicki
- **de-DE_CLOUD_Male_Daniel** - 德语 - 丹尼尔
- **de-AT_CLOUD_Female_Hannah** - 奥地利 - 汉娜
- **en-US_CLOUD_Female** - en-US - 女性 - 萨莉
- **en-US_CLOUD_Male** - en-US - Male - Joey
- **da-DK_CLOUD_Female** - da-DK - 女 - Naja
- **da-DK_CLOUD_Male** - da-DK - 男 - Mads
- **en-AU_CLOUD_Female** - en-AU - 女 - Nicole
- **en-AU_CLOUD_Male** - en-AU - 男 - Russell
- **en-GB_CLOUD_Female_Amy** - en-GB - 女 - Amy
- **en-GB_CLOUD_Male** - en-GB - 男 - Brian
- **en-GB_CLOUD_Female_Emma** - en-GB - 女 - 艾玛
- **en-GB-WLS_CLOUD_Female** - en-GB-WLS - 女性 - 格温妮丝
- **en-GB-WLS_CLOUD_Male** - en-GB-WLS - 男 - Geraint
- **cy-GB_CLOUD_Female** - cy-GB - 女性 - 格温妮丝
- **cy-GB_CLOUD_Male** - cy-GB - 男 - Geraint
- **en-IN_CLOUD_Female** - en-IN - 女性 - Raveena
- **en-US_CLOUD_Male_Chipmunk** - en-US - Male - Chipmunk
- **en-US_CLOUD_Male_Eric** - en-US - Male - Eric
- **en-US_CLOUD_Female_Ivy** - en-US - Female - Ivy
- **en-US_CLOUD_Female_Jennifer** - en-US - 女性 - Jennifer
- **en-US_CLOUD_Male_Justin** - en-US - 男 - Justin
- **en-US_CLOUD_Female_Kendra** - en-US - 女性 - Kendra
- **en-US_CLOUD_Female_Kimberly** - en-US - Female - Kimberly
- **es-ES_CLOUD_Female** - es-ES - 女性 - Conchita
- **es-ES_CLOUD_Male** - es-ES - 男 - 恩里克
- **es-US_CLOUD_Female** - es-US - 女性 - 佩内洛普
- **es-US_CLOUD_Male** - es-US - 男 - 米格尔
- **fr-CA_CLOUD_Female** - fr-CA - 女性 - Chantal
- **fr-FR_CLOUD_Female** - fr-FR - 女性 - Celine
- **fr-FR_CLOUD_Male** - fr-FR - 男 - Mathieu
- **is-IS_CLOUD_Female** - is-IS - Female - Dora
- **is-IS_CLOUD_Male** - is-IS - Male - Karl
- **it-IT_CLOUD_Female** - it-IT - 女性 - 卡拉
- **it-IT_CLOUD_Male** - it-IT - 男 - Giorgio
- **nb-NO_CLOUD_Female** - no-NO - Female - Liv
- **no-NO_CLOUD_Female** - no-NO - Female - Ida
- **nl-NL_CLOUD_Female** - nl-NL - 女性 - 乐天
- **nl-NL_CLOUD_Male** - nl-NL - 男 - Ruben
- **pl-PL_CLOUD_Female_Agnieszka** - pl-PL - 女性 - Agnieszka
- **pl-PL_CLOUD_Male_Jacek** - pl-PL - 男 - Jacek
- **pl-PL_CLOUD_Female_Ewa** - pl-PL - 女性 - Ewa
- **pl-PL_CLOUD_Male_Jan** - pl-PL - 男 - 一月
- **pl-PL_CLOUD_Female** - pl-PL - 女性 - Maja
- **pt-BR_CLOUD_Female** - pt-BR - 女性 - 维多利亚
- **pt-BR_CLOUD_Female_Camila** - pt-BR - 女性 - 卡米拉
- **pt-BR_CLOUD_Male** - pt-BR - 男 - Ricardo
- **pt-PT_CLOUD_Male** - pt-PT - 男 - 克里斯蒂亚诺
- **pt-PT_CLOUD_Female** - pt-PT - 女性 - Ines
- **ro-RO_CLOUD_Female** - ro-RO - 女性 - 卡门
- **sv-SE_CLOUD_Female** - sv-SE - 女性 - 阿斯特丽德
- **tr-TR_CLOUD_Female** - tr-TR - Female - Filiz
- **pt-BR_CLOUD_Female_Camila** - pt-BR - 女性 - 卡米拉

#### Pico TTS
- **en-US** - 美国英语
- **en-GB** - Englisch GB
- **de-DE** - 德语
- **it-IT** - Italiano
- **es-ES** - 西班牙语
- **fr-FR** - 法语

#### Coqui TTS
- 英语
- 德语
- 西班牙语
- 法语
- 荷兰语
- 日本

#### 亚马逊 Polly Direct
- **ru-RU_AP_Female** - Русский - Татьяна
- **ru-RU_AP_Male** - Русский - Максим
- **de-DE_AP_Female** - 德语 - Marlene
- **de-DE_AP_Female_Vicki** - 德语 - Vicki
- **de-DE_AP_Male** - 德语 - 汉斯
- **en-US_AP_Female** - en-US - 女性 - 萨莉
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
- **cy-GB_AP_Female** - cy-GB - 女性 - 格温妮丝
- **cy-GB_AP_Male** - cy-GB - 男 - Geraint
- **en-IN_AP_Female** - en-IN - 女 - Raveena
- **en-US_AP_Male_Chipmunk** - en-US - 男性 - 花栗鼠
- **en-US_AP_Male_Eric** - en-US - Male - Eric
- **en-US_AP_Female_Ivy** - en-US - Female - Ivy
- **en-US_AP_Female_Jennifer** - en-US - 女性 - Jennifer
- **en-US_AP_Male_Justin** - en-US - 男 - 贾斯汀
- **en-US_AP_Female_Kendra** - en-US - 女性 - Kendra
- **en-US_AP_Female_Kimberly** - en-US - 女性 - Kimberly
- **es-ES_AP_Female** - es-ES - 女性 - Conchita
- **es-ES_AP_Male** - es-ES - 男 - 恩里克
- **es-US_AP_Female** - es-US - 女性 - 佩内洛普
- **es-US_AP_Male** - es-US - 男 - Miguel
- **fr-CA_AP_Female** - fr-CA - 女性 - Chantal
- **fr-FR_AP_Female** - fr-FR - 女性 - Celine
- **fr-FR_AP_Male** - fr-FR - 男 - Mathieu
- **is-IS_AP_Female** - is-IS - Female - Dora
- **is-IS_AP_Male** - is-IS - Male - Karl
- **it-IT_AP_Female** - it-IT - 女性 - 卡拉
- **it-IT_AP_Male** - it-IT - 男 - Giorgio
- **nb-NO_AP_Female** - nb-NO - 女性 - 莉芙
- **nl-NL_AP_Female** - nl-NL - 女性 - 乐天
- **nl-NL_AP_Male** - nl-NL - 男 - 鲁本
- **pl-PL_AP_Female_Agnieszka** - pl-PL - 女 - Agnieszka
- **pl-PL_AP_Male_Jacek** - pl-PL - 男 - Jacek
- **pl-PL_AP_Female_Ewa** - pl-PL - 女性 - Ewa
- **pl-PL_AP_Male_Jan** - pl-PL - 男 - 一月
- **pl-PL_AP_Female** - pl-PL - 女性 - Maja
- **pt-BR_AP_Female** - pt-BR - 女性 - 维多利亚
- **pt-BR_AP_Male** - pt-BR - 男 - Ricardo
- **pt-PT_AP_Male** - pt-PT - 男 - 克里斯蒂亚诺
- **pt-PT_AP_Female** - pt-PT - 女性 - Ines
- **ro-RO_AP_Female** - ro-RO - 女性 - 卡门
- **sv-SE_AP_女性** - sv-SE - 女性 - 阿斯特丽德
- **tr-TR_AP_Female** - tr-TR - 女性 - Filiz
- **ko-KR_AP_女性** - ko-KR - 女性 - Seoyeon

<!-- 下一版本的占位符（位于行首）：

### **正在进行中** -->

## Changelog
### 5.3.1 (2026-08-13)
* (@GermanBluefox) Added the button "Test text generation" to the "Engine" tab, so the selected engine can be tested with an own text
* (@GermanBluefox) Test generations do not overwrite the cached files anymore
* (@GermanBluefox) Adapter requires node.js >= 22 and js-controller >= 6.0.11 now
* (@GermanBluefox) Older changelog entries were moved to CHANGELOG_OLD.md
* (@GermanBluefox) Updated the dependabot and auto-merge configuration

### 5.3.0 (2026-08-13)
* (@GermanBluefox) Added freetts.org as a new TTS engine with more than 400 voices. An API key is required
* (@GermanBluefox) The engine is selected in two steps now: first the provider and then the voice
* (@GermanBluefox) The words of the Blockly block are translated into all 11 languages now
* (@GermanBluefox) Blockly block migrated to TypeScript and the generated code is unchanged

### 5.2.4 (2026-08-07)
* (@GermanBluefox) Corrected the upload of the announcement mp3 files and the location of the cache directory
* (@GermanBluefox) Corrected the splitting of long texts for the Google engine
* (@GermanBluefox) Corrected the detection of sonos devices in the configuration dialog
* (@GermanBluefox) Cached files will be deleted again if the engine was changed
* (@GermanBluefox) The queue does not block anymore if an error occurs by processing of a task
* (@GermanBluefox) Texts with semicolons will not be interpreted as "language;volume;text" anymore
* (@GermanBluefox) The local engines (PicoTTS, CoquiTTS) and the windows player are called without shell now
* (@GermanBluefox) Corrected the default settings of a new instance

### 5.1.0 (2025-09-17)
* (bluefox) Adapter was rewritten with TypeScript
* (bluefox) Updated Polly voices list
* (bluefox) Added an option to send sonos device as a parameter in sendTo command

### 5.0.0 (2024-07-16)
* (mcm1957) Adapter requires admin v7 or newer now
* (mcm1957) Adapter requires jas-controller 5 or newer now
* (bluefox) Added possibility to play directly from states: `sayit.0/tts.userfiles/gong.mp3`

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

The MIT License (MIT)

Copyright (c) 2014-2026, bluefox <dogafox@gmail.com>

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