---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.synology/README.md
title: ioBroker Synology 适配器
hash: WkVual2m2dT72rLqP5brHKeJT9eWswnA4uloqjj13Og=
---
![标识](../../../en/adapterref/iobroker.synology/admin/synology.png)

![安装数量](http://iobroker.live/badges/synology-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.synology.svg)
![下载](https://img.shields.io/npm/dm/iobroker.synology.svg)

# IoBroker Synology 适配器
![测试和发布](https://github.com/iobroker-community-adapters/ioBroker.synology/workflows/Test%20and%20Release/badge.svg)[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/synology/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry 插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用哨兵报告。

＃＃ 描述
该驱动程序允许您接收数据并管理您的 Synology NAS 服务器。

### 2FA 设置
如果您在 DSM6/7 中使用 2FA，请参阅说明[这里](docs/en/template.md)

### 重启和关机
自 v2.1.4 起，适配器将通过 SSH 执行此操作，因此请在适配器设置中设置 SSH 端口。您可以在 Synology 设置中看到它：![涂鸦](https://user-images.githubusercontent.com/6681528/161436776-bd04b0c6-cfb2-47ab-9bee-7ea700575bbb.png) ![涂鸦](https://user-images.githubusercontent.com/6681528/161436897-174f3396-c2bb-4248-b91c-707005f7d2a8.png)

### 发送方法
您可以通过设置 sendMethod 对象来发送任何命令（方法），例如： Get the SurveillanceStation info 是一个没有附加参数的 getInfo 方法。

```{"method": "getInfo", "params": {}}```

＃＃＃ 控制
**commands.reboot** - 重启 NAS

**commands.shutdown** - 关闭 NAS

***SurveillanceStation.cameras.{NAMECAM}***：

*启用 - 当前状态和启用/禁用相机
* linkSnapshot - 快照的 URL

***SurveillanceStation.HomeMode.status_on*** - 当前状态和启用/禁用家庭模式

***SurveillanceStation.getSnapshotCamera*** - 通过相机编号获取快照，文件保存在目录``...iobroker-data\synology_0\snapshotCam_2.jpg``

***AudioStation.players.{PLAYERID}***：

* 播放、暂停、停止、下一个、上一个 - 控制播放（按钮，只有 true）
*重复 - 重复控制（关闭，全部，一）
* shuffle - 随机控制（真/假）
* 音量 - 音量远程播放器 (0-100)
* seek - 控制播放搜索 (0-100)
* play_folder - 将文件夹中的曲目添加到播放列表（id 文件夹，例如 ``dir_5816``）
* play_track - 按其 id 播放曲目（例如 ``music_120847``）
* current_play - 当前曲目在播放列表中的编号控制和状态（例如``14``）

***下载站***：

* activeTask - 不完整下载的数量
* listTasks - 一个下载不完整的数组
* shedule_enabled, shedule_emule_enabled - 预定或立即下载的状态和控制
* add_hash_download - 添加到哈希下载（例如 ``8BD3CAD02FC9ECB661A12378414FA310D3F3FE03``）
* add_url_download - 添加下载 URL 或磁力链接
* folder - 要下载的文件夹，在添加下载之前设置，否则加载到默认文件夹
* pause_task, resume_task - 暂停下载并继续。 （例如 ``dbid_170`` 或 ``170`` 或 ``all``）

### 消息框
```
sendTo('synology.0', 'getSnapshot', {camId: 2}, (res) => {
    if(res) sendTo('telegram.0', {text: res, caption: 'caption for image'});
});
```

＃＃ __工作正在进行中__
-->

### 2.1.12 (2022-10-26) *(McM1957) 已删除以明文形式记录密码。
### 2.1.11 (2022-10-24)
*(McM1957) 适配器已适配为与 node14 兼容。

### 2.1.10 (2022-10-23)
*(McM1957) 处理包含特殊字符（即美元符号）的密码已得到修复 (#180) *(McM1957) 基本模块已按照dependabot 的建议进行了更新。

### 2.1.9 (2022-07-01)
* (Apollon77) 尝试在 NAS 重启时使用 2FA 防止账户锁定

### 2.1.8 (2022-06-12)
* (Apollon77) 减慢重新连接到 DSM

### 2.1.7 (2022-04-26)
* (Apollon77) 尝试在 NAS 重启时使用 2FA 防止账户锁定

### 2.1.6 (2022-04-04)
* (Apollon77) 修复 2FA

### 2.1.5 (2022-04-03)
* (Apollon77) 修复 DSM 版本检测

### 2.1.4 (2022-04-03)
* (arteck) 关闭和重启的解决方法（在设置中配置你的 ssh 端口）
* (Apollon77) 防止在启动时设置 FileStation.info.items 时出错

### 2.1.1 (2022-03-26)
* (Apollon77) 优化对象类型确定和调整

### 2.1.0 (2022-03-25)
* 重要提示：安装此版本后需要重新输入一次密码！
* (Apollon77) 相机快照现在也存储在 ioBroker 存储中，以便更轻松地用于可视化！
* (foxriver76) 使用 Admin5 时在 Admin 中隐藏密码显示
* (Apollon77) 修复卷描述
* (Apollon77) 修复自 js-controller 3.3 以来的类型问题

### 2.0.1 (2021-09-17)
* (MeisterTR) 解决方法 JSON 配置密码

### 2.0.0
*（安装程序）DSM7 支持

### 1.1.3 (2021-08-23)
* (MeisterTR) 固定 2FA

### 1.1.2 (2021-08-12)
* (MeisterTR) 固定数据类型
* (MeisterTR) 添加了新的 ConfigJson（如果您使用 2FA，请在配置中重新输入）
* (MeisterTR) 再次修复快照

### 1.1.1 (2021-08-09)
* (MeisterTR) 修复正常运行时间类型
* (MeisterTR) 修复损坏的快照链接

### 1.1.0 (2021-08-07)
* (MeisterTR) 修复 DSM7
* (MeisterTR) 添加了发布脚本
* (MeisterTR) 变更测试
* (MeisterTR) 将 syno repo 更改为默认值

### 1.0.1
* (thost96) 修复错误类型编号 [问题 78](https://github.com/instalator/ioBroker.synology/issues/78)

### 1.0.0
*（安装程序）在 hdd_info [问题 51]（https://github.com/instalator/ioBroker.synology/issues/51）中更改名称对象
* (Apollon77) 重大更改：请在管理员中设置新密码！
* (Apollon77) 现在至少需要 js-controller 3.0！
*（Apollon77 商店密码现已加密）

### 0.1.20
*（安装程序）修复错误

### 0.1.18
*（安装程序）更改专辑封面的链接

### 0.1.17
*（安装程序）添加了 Sentry 插件支持

### 0.1.16
*（安装程序）修复错误

### 0.1.15
*（安装程序）修复了解析信息中的错误
* (安装程序) 固定 api 未定义

### 0.1.14
*（安装程序）修复丢失的[数据点]（https://github.com/instalator/ioBroker.synology/issues/43）
*（安装程序）重构
*（安装程序）更改了一些错误的日志记录
*（安装程序）在 syno 包中更改了格式会话

### 0.1.11
*（安装程序）添加了motionDetected状态
* (SpectreKr*) 添加到 FS 共享

### 0.1.10
*（安装程序）固定副本封面文件
*（安装程序）修复获取 DSM 5.x 的软件包
*（安装程序）添加了选择用于接收数据的服务的选项

### 0.1.8
*（安装程序）修复错误 addDownload
*（安装程序）固定 listRadios
*（安装器）固定盖

### 0.1.7
*（安装器）固定 2FA
*（安装程序）添加了设置指南 2FA

### 0.1.6
*（安装程序）修复 2fa
*（安装程序）修复错误
*（安装程序）更改错误日志
*（安装程序）修复 io 包
*（安装程序）修复错误状态播放器

### 0.1.4
*（安装程序）DownloadStation 的更改
*（安装程序）添加播放列表最喜欢的电台
*（安装程序）添加了清除播放列表按钮
*（安装程序）重构

### 0.1.3
*（安装程序）更改 obj 为 ss 信息修复翻唱歌曲
*（安装程序）修复 info.connection
*（安装程序）为播放器浏览器文件添加 6.2.3 修复
*（安装程序）修复 2FA
*（安装程序）修复错误添加下载
*（安装程序）添加了 DownloadStation 任务列表

### 0.1.2
*（安装程序）修复错误

### 0.1.1
*（安装程序）为快照添加了消息框
*（安装程序）更新自述文件
*（安装程序）为不同的流添加了 ss 链接
*（安装程序）修复错误
*（安装程序）重构

### 0.1.0
*（安装程序）添加 HomeMode 开关
*（安装程序）更改为 audiostation
*（安装程序）更改为 as 和 ss
*（安装程序）添加快照功能
*（安装程序）固定系统配置
*（安装程序）修复了许多错误

### 0.0.4 (2018-10-07)
*（安装程序）Изменен репозиторий библиотеки
*（安装程序）Добавлено в конфиг время опроса

### 0.0.3 (2018-01-03)
*（安装者）初始

## Changelog
<!--

## License
The MIT License (MIT)

Copyright (c) 2021-2022 instalator <vvvalt@mail.ru>, ioBroker Community-Developers

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