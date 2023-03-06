---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.heos/README.md
title: ioBroker.heos
hash: +hjK3Ue0UTEq7DAn+u3QyfM/S4vt79Vc1I3osWbejIc=
---
![标识](../../../en/adapterref/iobroker.heos/admin/heos.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.heos.svg)
![下载](https://img.shields.io/npm/dm/iobroker.heos.svg)
![安装数量（最新）](http://iobroker.live/badges/heos-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/heos-stable.svg)
![依赖状态](https://img.shields.io/david/withstu/iobroker.heos.svg)
![已知漏洞](https://snyk.io/test/github/withstu/ioBroker.heos/badge.svg)
![NPM](https://nodei.co/npm/iobroker.heos.png?downloads=true)

#ioBroker.heos
该适配器允许从 ioBroker 控制 HEOS。

##免责声明
HEOS、DENON 和 Marantz 是 D&M Holdings Inc. 的商标。
此模块的开发人员未以任何方式得到 D&M Holdings Inc. 或任何相关子公司、徽标或商标的认可或附属。

＃＃ 参考
使用的 HEOS API 记录在此处：https://rn.dmglobal.com/euheos/HEOS_CLI_ProtocolSpecification_2021.pdf

## 网络要求
协议 SSDP 用于寻找玩家。 UPnP 需要对 239.255.255.250:1900 的多播访问以及适当的 IGMP 消息。可以在适配器设置中配置用于接收 SSDP 消息的源端口（默认设置为 ```0``` 表示端口是自动选择的）。更多详细信息：https://support.denon.com/app/answers/detail/a_id/4717/~/network-requirements-for-heos 对于 HEOS 播放器的 API 访问，适配器使用端口 ```1255``` .

＃＃ 配置
* **自动播放**：连接播放器或取消静音后自动播放音乐。可以在configuration中全局配置。如果全局启用它，您可以为状态为“auto_play”的特定玩家禁用它。
* **命令范围**：定义命令状态的命令```scope/[cmd]```发送给哪些玩家。它可以以逗号分隔状态发送给所有玩家、所有领先玩家或所有 PID：```heos.0.command_scope_pid```
* **静音正则表达式**：

在配置中，您可以激活一项功能，根据歌曲信息的正则表达式匹配使播放器静音。这可用于自动静音广告。例如，对于 Spotify，您可以使用以下正则表达式：```spotify:ad:|Advertisement```。

* **ignore_broadcast_cmd**：这个玩家状态配置，如果玩家应该忽略所有玩家的命令，例如player/set_mute&state=on 或按下预设/播放列表的播放按钮

## 状态及其含义
### 命令状态
HEOS 播放器可以通过不同的播放器状态进行控制。要以更高级的方式控制玩家，您可以使用命令状态。一方面，有一个全局命令状态 (heos.0.command) 可以通过一个命令控制整个适配器或多个播放器。另一方面，每个玩家都有一个命令状态。

#### HEOS 命令状态（heos.0.command）
*```系统/连接```：尝试连接到HEOS
* ```system/disconnect```: 与 HEOS 断开连接
*```系统/重新连接```：断开连接并连接
*```system/load_sources```：重新加载源
* ```system/reboot```: 重启连接的播放器
* ```system/reboot_all```: 重启所有玩家
* ```group/set_group?pid=<pid1>,<pid2>,...```: 使用玩家 ID 列表设置组，例如```group/set_group?pid=12345678,12345679```。
* ```group/set_group?pid=<pid1>```: 删除现有组，例如“组/组组？pid=12345678”
* ```group/ungroup_all```: 删除所有组
* ```group/group_all```: 将所有玩家归为一组
* ```player/[cmd]```: 向所有玩家发送命令。例如播放器/set_mute&state=on
* ```leader/[cmd]```: 将命令发送给所有领先玩家。例如领导者/set_mute&state=on
* ```scope/[cmd]```：将命令发送到配置的范围所有玩家，领先玩家或逗号分隔的玩家 pids in scope_pids
*```...```：尝试将所有其他命令发送到 HEOS（有关详细信息，请查看 HEOS API PDF）

#### 玩家命令状态（heos.0.players.123456789.command）
注意：多个命令是可能的，如果它们用管道分开，例如set_volume&level=20|play_preset&preset=1

* ```set_volume?level=0|1|..|100```: 设置播放器音量
* ```set_play_state?state=play|pause|stop```: 设置播放器状态
* ```set_play_mode?repeat=on_all|on_one|off&shuffle=on|off```: 设置重复和随机播放模式
* ```set_mute?state=on|off```: 静音播放器
* ```volume_down?step=1..10```: 降低音量
* ```volume_up?step=1..10```: 提高音量
*```play_next```：接下来播放
*```play_previous```：播放上一个
* ```play_preset?preset=1|2|..|n```: 播放预设 n
* ```play_stream?url=url_path```: 播放 URL 流
* ```add_to_queue?sid=1025&aid=4&cid=[CID]```: 在播放器上使用 [CID] 播放播放列表（帮助：1 - 现在播放；2 - 播放下一个；3 - 添加到结尾；4 - 替换和玩）

### 预设和播放列表
每个来源，例如预设/收藏夹或播放列表位于源状态文件夹 (```heos.0.sources```)。您可以在 ID 为 1028 的子文件夹中找到您的预设/收藏夹，在 ID 为 1025 的子文件夹中找到播放列表。最初适配器不会创建您的个人预设和播放列表，因为您必须通过设置以下状态来触发更新真实：

- 预设/收藏夹：```heos.0.sources.1028.browse```
- 播放列表：```heos.0.sources.1025.browse```

之后，适配器会为预设或播放列表创建状态，以便您可以轻松地在所有播放器上播放预设。

### 图像颜色提取
在 1.7.6 版本中，歌曲封面的突出颜色被提取并保存为三种新的播放器状态：

* **current_image_color_palette**：由 node-vibrant 选择的突出颜色。
* **current_image_color_background**：图像中人口最多的颜色。可用作 VIS 中播放器控件的背景颜色。
* **current_image_color_foreground**：图像中人口第二多的颜色，与背景颜色形成良好的阅读对比。可用作 VIS 中播放器控件的文本颜色。

＃＃ 寻找
搜索功能不适用于所有来源。 Spotify 和亚马逊音乐支持搜索。

## 说吧
[SayIt 适配器](https://github.com/ioBroker/ioBroker.sayit) 受支持。

![赛义特](docs/media/sayit.png)![说配置](../../../en/adapterref/iobroker.heos/docs/media/sayit-config.png)

## 材质界面
[材质 UI 适配器](https://github.com/ioBroker/ioBroker.material) 受支持。

![材料](../../../en/adapterref/iobroker.heos/docs/media/material-ui.png)

## 可视化
＃＃＃ 安装
* 创建以下字符串状态：
    * 0_userdata.0.heos.queue_pid
    * 0_userdata.0.heos.queue_html
    * 0_userdata.0.heos.browse_result_html

### 玩家视角
* 打开文件：[player_view.json](docs/vis/views/player_view.json)
* 将 123456789 替换为玩家 pid
* 将视图导入 VIS

![播放器视图](../../../en/adapterref/iobroker.heos/docs/media/player-view.png)

### 预设
*点击按钮```heos.0.sources.1028.browse```加载预设
* 打开文件：[presets_view.json](docs/vis/views/presets_view.json)
* 将视图导入 VIS

![预设配置](docs/media/presets-config.png)![预设](../../../en/adapterref/iobroker.heos/docs/media/presets.png)

＃＃＃ 队列
*队列小部件：[queue_player_widget.json](docs/vis/views/queue_player_widget.json)
* 队列视图：[queue_view.json](docs/vis/views/queue_view.json)
* 队列 HTML 生成脚本：[queue.js](docs/vis/scripts/queue.js)

![队列小部件](../../../en/adapterref/iobroker.heos/docs/media/queue-widget.png)

### 浏览资源
* 浏览小部件：[browse_player_widget.json](docs/vis/views/browse_player_widget.json)
* 浏览视图：[browse_view.json](docs/vis/views/browse_view.json)
* 浏览 HTML 生成脚本：[browse.js](docs/vis/scripts/browse.js)

![浏览小部件](docs/media/browse-widget.png)![浏览资源](docs/media/browse-sources.png)![浏览 tunein](../../../en/adapterref/iobroker.heos/docs/media/browse-tunein.png)

或者，您可以使用 Uhula 的脚本：https://forum.iobroker.net/post/498779

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (withstu) optimize error handling

### 1.12.1 (2023-02-26)
* (withstu) optimize leader election

### 1.12.0 (2023-02-25)
* (withstu) optimize scope handling
* (withstu) switch to HEOS default cmd delimiter
* (withstu) add configuration to prefer list of IPs for adapter connection
* (withstu) optimize error handling

### 1.11.4 (2022-11-04)
* (withstu) improve play all button in browse feature

### 1.11.3 (2022-11-04)
* (withstu) update some dependencies
* (withstu) improve failure handling
* (withstu) improve play all button in browse feature

### 1.11.2 (2022-10-16)
* (withstu) adopt to new adapter structure

### 1.11.1 (2022-10-16)
* (withstu) fix release

### 1.11.0 (2022-10-16)
* (withstu) improve player failure detection
* (withstu) fix bug in regex mute
* (withstu) fix upnp NaN warning #192

### 1.10.0 (2022-06-16)
* (foxriver76) fix default value of `sid` (closes #174)

### 1.9.2 (2022-01-22)
* (withstu) add volume lock

### 1.9.1 (2021-08-17)
* (withstu) fix type issues
* (withstu) fix roles and repeat state

### 1.9.0 (2021-07-27)
* (stephanritscher) add option to configure udp source port

### 1.8.6 (2021-06-13)
* (withstu) test fixed pipeline

### 1.8.4 (2021-06-13)
* (withstu) improve stability

### 1.8.3 (2021-05-13)
* (withstu) fix upnp values on failure

### 1.8.2 (2021-05-12)
* (withstu) BREAKING: add queue paging
* (withstu) BREAKING: volume_max -> volume_limit
* (foxriver76) Fix type issues and some more minor changes

### 1.8.1 (2021-05-07)
* (withstu) fix reboot loop

### 1.8.0 (2021-04-24)
* (withstu) add reboot on failure configuration

### 1.7.9 (2021-04-07)
* (withstu) fix reboot
* (withstu) add power state

### 1.7.8 (2021-04-05)
* (withstu) add reboot

### 1.7.7 (2021-02-25)
* (withstu) add creation of missing version state

### 1.7.6 (2021-02-24)
* (withstu) add image color extraction

### 1.7.5 (2021-02-12)
* (withstu) add bit depth

### 1.7.4 (2021-02-01)
* (withstu) fix upnp init bug

### 1.7.3 (2021-02-01)
* (withstu) add upnp module and support bitrate, audio format and sample rate

### 1.7.2 (2021-01-30)
* (withstu) fix seek in groups

### 1.7.1 (2021-01-30)
* (withstu) add seek

### 1.7.0 (2021-01-29)
* (withstu) reboot not responding players
* (withstu) delete old presets and playlists

### 1.6.2 (2021-01-02)
* (withstu) fix "user not logged in" handling

### 1.6.1 (2020-11-25)
* (withstu) clear timeout and interval on unload; fix roles; remove sleep in tts module

### 1.6.0 (2020-11-22)
* (withstu) add regex mute

### 1.5.6 (2020-11-22)
* (withstu) add source images & optimize auto play

### 1.5.5 (2020-11-01)
* (withstu) update some packages and add sources event

### 1.5.4 (2020-10-24)
* (withstu) ignore invalid now playing responses

### 1.5.3 (2020-10-18)
* (withstu) minor improvements related to auto play feature

### 1.5.2 (2020-10-11)
* (withstu) improve tts stop method

### 1.5.1 (2020-10-11)
* (withstu) improve tts and don't update queue during tts

### 1.5.0 (2020-10-10)
* (withstu) add tts support and maximum volume

### 1.4.0 (2020-10-10)
* (withstu) add more play and queue settings
* (withstu) bugfixing for invalid heos responses (empty player name)

### 1.3.4 (2020-10-04)
* (withstu) remove sorting and available filter and fix browse play

### 1.3.3 (2020-10-04)
* (withstu) fix previous page button in browse feature

### 1.3.2 (2020-10-04)
* (withstu) fix preset sorting

### 1.3.1 (2020-10-03)
* (withstu) add back button to browse feature

### 1.3.0 (2020-10-03)
* (withstu) add queue and some browse improvements

### 1.2.4 (2020-09-29)
* (withstu) minor bugfix

### 1.2.3 (2020-09-29)
* (withstu) improve browse feature (add pictures and sources view)

### 1.2.2 (2020-09-28)
* (withstu) rename browse command

### 1.2.1 (2020-09-28)
* (withstu) introduce browse_result state

### 1.2.0 (2020-09-27)
* (withstu) Breaking change: restructure playlists/presets (you should delete the devices playlists, presets and sources before installation)

### 1.1.2 (2020-09-26)
* (withstu) log browse parameters

### 1.1.1 (2020-09-26)
* (withstu) add source browse feature (Click the button in the sources. You can find the possible next commands in the log.)

### 1.1.0 (2020-09-26)
* (withstu) encrypt password

### 1.0.1 (2020-09-21)
* (withstu) remove connected state, because it is included in the info channel

### 1.0.0 (2020-09-21)
* (withstu) initial release

## License
MIT License

Copyright (c) 2023 withstu <withstu@gmx.de>

derived from https://forum.iobroker.net/topic/10420/vorlage-denon-heos-script by Uwe Uhula
TTS derived from https://github.com/ioBroker/ioBroker.sonos

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