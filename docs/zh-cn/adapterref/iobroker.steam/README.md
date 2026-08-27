---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.steam/README.md
title: ioBroker.steam
hash: gMuV3gFX6s2hFU7VmyVC07P0mBzCQ8OQMtfaikPKWf8=
---
![标识](../../../en/adapterref/iobroker.steam/admin/steam.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.steam.svg)
![下载](https://img.shields.io/npm/dm/iobroker.steam.svg)
![安装数量](https://iobroker.live/badges/steam-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/steam-stable.svg)
![NPM](https://nodei.co/npm/iobroker.steam.png?downloads=true)

# IoBroker.steam
## IoBroker.steam
该适配器将 Steam 个人资料和游戏活动信息集成到 ioBroker 中。

＃＃ 要求
- Node.js 版本 >= 22
- ioBroker.js-controller >= 6.0.11
- ioBroker.admin >= 7.6.20

＃＃ 特征
* **Steam个人资料信息：**
* **玩家名称：** 显示玩家当前的 Steam 名称。
* **个人资料网址：** 提供 Steam 个人资料的网址。
* **头像网址：** 显示玩家头像的网址。
* **玩家状态：** 显示玩家的当前状态（例如，在线、游戏中、离开）。
* **游戏额外信息：** 显示当前正在玩的游戏的相关信息（如有）。
* **Steam ID64：** 用户的唯一 64 位 Steam ID。

* **游戏监控：**
* **要监控的游戏：** 配置要监控的游戏列表。
* **游戏应用 ID：** 存储每个受监控游戏的 Steam 应用 ID。
* **游戏新闻：** 每 6 小时（每天 4 次）获取并更新每个受监控游戏的最新消息。
* **游戏名称建议：** 如果找不到游戏（例如，由于拼写错误），适配器会记录警告，并从 Steam 应用程序列表中建议最多 5 个类似的游戏名称。
* **自动补全：** 添加游戏时，适配器会自动补全缺失的信息 - 如果您提供游戏名称，它会查找 AppID，反之亦然。
* **已拥有游戏导入：** 一键导入您 Steam 库中所有已拥有的游戏。
* **增强游戏信息：** 显示游戏图标、徽标、社区统计数据网址、游戏时间统计数据等。
* **自动游戏检测：** 在游戏进行时自动检测并创建游戏状态。

* **API 请求管理：**
* **GetPlayerSummaries:** 以可配置的时间间隔（最小 15 秒，默认 60 秒）请求球员摘要。
* **每日请求计数：** 监控 GetPlayerSummaries API 请求的数量，以避免超过每天 10,000 次请求的限制。
* **自动重置：** 每天 0:00（午夜）自动重置请求计数。
* **优化 API 使用：** 防止重复 API 调用，并在请求之间添加适当的冷却时间。
* **Steam 应用列表缓存：** 高效缓存 Steam 应用列表，以减少 API 调用次数。

＃＃ 配置
1. **Steam 名称 / SteamID64**

输入您的 Steam 个性化名称或公开个人资料中的 17 位 SteamID64。

2. **Steam API 密钥**

在浏览器中登录 Steam，打开 [Steam API 密钥页面](https://steamcommunity.com/dev/apikey) 文件，创建一个密钥，并将其复制到适配器配置中。

您的 Steam 社区个人资料必须设置为公开。

3. **球员总结区间**

设置玩家摘要的轮询间隔（最小 15 秒）。

4. **启用游戏推荐**

启用日志中的容错游戏名称建议。

5. **启用已拥有的游戏**

将已拥有的游戏导入配置（需要重启适配器）。

6. **需要监控的游戏**

添加游戏名称或应用ID。适配器会自动补全缺失的信息。

＃＃ 用法
安装并配置适配器后，Steam 个人资料信息、游戏新闻、最近玩过的游戏和 API 请求统计信息将作为状态显示在 ioBroker 中。

适配器会创建多个状态文件夹：

- **steam.0** - 包含常规个人资料信息和连接状态
- **steam.0.games** - 包含受监控的游戏及其 AppID、新闻和统计数据

当游戏进行时，其 `isPlaying` 状态将设置为 true，并且该游戏的所有数据将自动更新。

## Changelog

### WORK IN PROGRESS

### 0.5.11 (2026-07-02)
- (bloop16) Fixed repo-checker issues E5600/S5601 by fully migrating admin i18n to short format.
- (bloop16) Fixed W5606 by completing missing translations and correcting placeholder formatting.
- (bloop16) bumped key dependencies (axios, adapter-core).
- (bloop16) #113 follow-up fixes: release-script minimum update, Node 22 tsconfig alignment, and ESLint/dependency cleanup.

### 0.5.10 (2026-05-29)
- (bloop16) Improved Steam onboarding and setup guidance
- (bloop16) Fixed editor and test typing diagnostics for JavaScript adapter workflow
- (bloop16) Updated README to ioBroker release format and moved legacy entries to [CHANGELOG_OLD.md](CHANGELOG_OLD.md)

### 0.5.9 (2026-03-22)
- (bloop16) Added concurrency configuration to CI workflow
- (bloop16) Removed obsolete dependabot workflow file

Older changelog entries are archived in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License
MIT License

Copyright (c) 2025-2026 bloop16 <bloop16@hotmail.com>

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