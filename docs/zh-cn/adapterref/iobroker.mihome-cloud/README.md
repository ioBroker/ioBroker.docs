---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.mihome-cloud/README.md
title: ioBroker.mihome-cloud
hash: VVsWVsdGF1A8M5qtOJuvubLxQgPSehFFE9QaiFSt6WI=
---
![标识](../../../en/adapterref/iobroker.mihome-cloud/admin/mihome-cloud.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.mihome-cloud.svg)
![下载](https://img.shields.io/npm/dm/iobroker.mihome-cloud.svg)
![安装数量](https://iobroker.live/badges/mihome-cloud-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/mihome-cloud-stable.svg)
![NPM](https://nodei.co/npm/iobroker.mihome-cloud.png?downloads=true)

# IoBroker.mihome-cloud
**测试：** ![测试和发布](https://github.com/TA2k/ioBroker.mihome-cloud/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 mihome-cloud 适配器
米家云设备适配器

**此适配器使用哨兵库自动向开发人员报告异常和代码错误。**有关更多详细信息和如何禁用错误报告的信息，请参阅[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用哨兵报告。

# 登录程序
输入应用程序邮件和密码。

＃ 控制
mihome-cloud.0.ID.remote

可以发送命令或者将状态unconfirmed设置为true。

如果命令需要输入，则这些输入将列在名称中，并且作为默认值列出 ID。

名称和 ID 可以在状态下找到。可以通过按铅笔然后在状态下找到可能的值。

输入值可以是例如`["10",0,1] `

如果remote下无法控制，可以在mihome-cloud.0.scenes下创建场景/智能场景并执行。

示例：机器人真空吸尘器房间清洁

mihome-cloud.0.id.remote.set-room-clean 需要作为输入 sweep set-room-clean 7-3 in [clean-room-ids,clean-room-mode,clean-room-oper] [24, 25,26]。

房间 ID 可能位于：

mihome-cloud.0.id.remote.get-map-room-list

mihome-cloud.0.id.remote.get-preference-ii

两者都需要 [clean-current-map] [33] 作为输入

mihome-cloud.0.id.status.clean-current-map sweep clean-current-map 7-33

不幸的是 null 你可以选择使用

mihome-cloud.0.id.status.cur-map-id

或者

mihome-cloud.0.id.remote.get-map-list map get-map-list 10-1 out[map-list]查询地图列表，查看mihome-cloud.0.id.status.map下的结果-列表地图 地图列表 10-4

然后你可以设置这个id

mihome-cloud.0.id.remote.get-map-room-list 地图 get-map-room-list 10-13 in[cur-map-id] out[room-id-name-list]

mihome-cloud.0.id.remote.get-preference-ii 扫描 get-preference-ii 7-10 in[clean-current-map] out [clean-preference,clean-prefer-on,clean-preference-ii, clean-prefer-on-ii]

格式：[1673811000]

然后你得到以下信息：

mihome-cloud.0.id.status.room-id-name-list: [{"name":"room1","id":10}]

或者

mihome-cloud.0.id.status.clean-preference ["1_10_0_1_0_0_1","1_11_0_0_0_0_1","1_12_1_1_2_0_1","1_13_0_0_0_0_1"]

mihome-cloud.0.id.status.clean-prefer-on

mihome-cloud.0.id.status.clean-preference-ii

mihome-cloud.0.id.status.clean-prefer-on-ii

有了这些信息，您就可以使用

mihome-cloud.0.id.remote.start-room-sweep 格式 ["10", "11", "12", "13"]

或者

mihome-cloud.0.id.remote.set-room-clean

格式 ["10",0,1]

## 讨论和问题
<https://forum.iobroker.net/topic/59636/test-adapter-mihome-cloud>

# Loginablauf
Die App Mail 和 Passwort eingeben。

#Steuerung
mihome-cloud.0.ID.remote

Können Befehle gesendet entweder den State unbestätigt auf true setzen。

Wenn ein Befehl Input erwartet werden die im Namen aufgezählt und als default Wert werden die IDs aufgelistet。

名称和 ID 查找人员身份。 Mögliche Werte findet man auf den Bleistift drückt und dann unter states。

Eingabewerte könnte z.b. `["10",0,1] `

Falls unter Remote keine Steuerung möglich ist können Szenen/Smart Szenario angelegt werden und diese können unter mihome-cloud.0.scenes ausgeführt werden。

Bsp：Saugroboter Raumreinigung

mihome-cloud.0.id.remote.set-room-clean benötigt als Input sweep set-room-clean 7-3 in[clean-room-ids,clean-room-mode,clean-room-oper] [24, 25,26]

Potenziel findet man 房间 ID 下：

mihome-cloud.0.id.remote.get-map-room-list

mihome-cloud.0.id.remote.get-preference-ii

beide benötigen [clean-current-map] [33] als 输入

mihome-cloud.0.id.status.clean-current-map sweep clean-current-map 7-33

ist leider null Man kann alternativ

mihome-cloud.0.id.status.cur-map-id

坚果订单

mihome-cloud.0.id.remote.get-map-list map get-map-list 10-1 out[map-list] die Kartenliste abfragen und sieht das 结果unter unter mihome-cloud.0.id.status.map -列表地图 地图列表 10-4

Diese Id kann man dann setzen

mihome-cloud.0.id.remote.get-map-room-list 地图 get-map-room-list 10-13 in[cur-map-id] out[room-id-name-list]

mihome-cloud.0.id.remote.get-preference-ii 扫描 get-preference-ii 7-10 in[clean-current-map] out [clean-preference,clean-prefer-on,clean-preference-ii, clean-prefer-on-ii]

格式：[1673811000]

Dann erhält man die Informationen unter:

mihome-cloud.0.id.status.room-id-name-list: [{"name":"room1","id":10}]

订单

mihome-cloud.0.id.status.clean-preference ["1_10_0_1_0_0_1","1_11_0_0_0_0_1","1_12_1_1_2_0_1","1_13_0_0_0_0_1"]

mihome-cloud.0.id.status.clean-prefer-on

mihome-cloud.0.id.status.clean-preference-ii

mihome-cloud.0.id.status.clean-prefer-on-ii

Mit den Informationen kann man dann

mihome-cloud.0.id.remote.start-room-sweep 格式 ["10","11","12","13"]

订单

mihome-cloud.0.id.remote.set-room-clean

格式 ["10",0,1]

## 讨论与讨论
<https://forum.iobroker.net/topic/59636/test-adapter-mihome-cloud>

## Changelog

### 0.0.5

- (TA2k) Bugfixes

### 0.0.3

- (TA2k) initial release

## License

MIT License

Copyright (c) 2023 TA2k <tombox2020@gmail.com>

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