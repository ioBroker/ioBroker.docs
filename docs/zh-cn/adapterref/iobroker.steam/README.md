---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.steam/README.md
title: ioBroker.steam
hash: 3IsZC6sGoAbu/vEEiNS99z+Zq4WrUYMO/0JetlssxRk=
---
![标识](../../../en/adapterref/iobroker.steam/admin/steam.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.steam.svg)
![下载](https://img.shields.io/npm/dm/iobroker.steam.svg)
![安装数量](https://iobroker.live/badges/steam-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/steam-stable.svg)
![新公共管理](https://nodei.co/npm/iobroker.steam.png?downloads=true)

# IoBroker.steam
## IoBroker.steam
此适配器允许您将来自 Steam API 的信息集成到您的 ioBroker 系统中。

＃＃ 特征
Steam 个人资料信息：
* **玩家姓名**：显示玩家当前的 Steam 名称。
* **个人资料 URL：**提供 Steam 个人资料的 URL。
* **头像 URL：**显示玩家头像的 URL。
* **玩家状态**：显示玩家的当前状态（例如，在线、游戏中、离开）。
* **游戏附加信息**：显示有关当前玩的游戏的信息（如果有）。
* **Steam ID64**：用户唯一的 64 位 Steam ID。

**游戏监控：**
* **要监控的游戏**：配置要监控的游戏列表。
* **游戏应用程序 ID**：存储每个受监控游戏的 Steam 应用程序 ID。
* **游戏新闻**：每 6 小时（每天 4 次）获取并更新每个受监控游戏的最新新闻。
* **游戏名称建议**：如果找不到游戏（例如，由于拼写错误），适配器会记录警告并从 Steam 应用列表中建议最多 5 个类似的游戏名称。
* **自动完成**：添加游戏时，适配器会自动完成缺失的信息 - 如果您提供游戏名称，它会找到 AppID，反之亦然。
* **自有游戏导入**：只需单击即可从您的 Steam 库导入您拥有的所有游戏。
* **增强的游戏信息**：显示游戏图标、徽标、社区统计 URL、游戏时间统计等。
* **自动游戏检测**：在游戏进行时自动检测并创建游戏状态。

API 请求管理：
* **GetPlayerSummaries：**以可配置的间隔请求玩家摘要（最少 15 秒，默认 60 秒）。
* **每日请求数**：监控 GetPlayerSummaries API 请求的数量，以避免超过每天 10,000 个请求的限制。
* **自动重置**：在 0:00（午夜）自动重置每日请求计数。
* **优化 API 使用**：防止重复的 API 调用并在请求之间添加适当的冷却时间。
* **Steam AppList 缓存：**有效缓存 Steam 应用程序列表以减少 API 调用。

＃＃ 配置
1. **Steam 名称**：输入您的 Steam 用户名。
2. **Steam API 密钥**：输入您的 Steam API 密钥。您可以在[此处](https://steamcommunity.com/dev/apikey)生成 API 密钥。
3. **玩家摘要间隔**：设置请求玩家摘要的频率（最少 15 秒）。
4. **启用游戏建议**：切换在找不到游戏时是否建议类似的游戏名称。
5. **启用自有游戏**：将您拥有的所有游戏从 Steam 导入到您的配置中（需要重新启动适配器）。
6. **待监控的游戏**：添加待监控的游戏。您可以提供游戏名称或 AppID，适配器会自动填充缺失的信息。

＃＃ 用法
安装和配置适配器后，Steam 个人资料信息、游戏新闻、最近玩过的游戏和 API 请求统计数据将作为 ioBroker 中的状态提供。

适配器创建几个状态文件夹：

- **steam.0** - 包含一般个人资料信息和连接状态
- **steam.0.games** - 包含受监控的游戏及其 AppID、新闻和统计数据

当正在进行游戏时，其`isPlaying`状态将设置为真，并且该游戏的所有数据将自动更新。

## Changelog

### 0.5.6 (2025-06-28)
* (bloop16)
    * release version

### 0.5.3 (2025-06-14)
* (bloop16)
    * fixed state roles.
    * fixed io-package.json (`info.connention`)
    * removed uneeded `getState`
    * added trigger to `onReady`for `onStateChange`

### 0.5.2 (2025-06-14)
* (bloop16)
    * Fixed `onStateChange`to work correct with `currentGameAppId`

### 0.5.1 (2025-05-04)
* (bloop16)
    * Automatic detection and addition of newly played games to the monitored list (no adapter restart required)
    * Full internationalization (i18n) for all log messages and UI texts
    * Improved game lookup: supports AppID/name, fuzzy search, and suggestions for typos
    * Import all owned Steam games with one click
    * Enhanced management and updating of game states (icons, logos, stats, news)
    * Optimized API request handling (rate limits, backoff, random intervals)
    * Automatic creation and cleanup of objects/states
    * Improved error handling and logging

### 0.4.5 (2025-05-02)
* (bloop16)
    * Corrected state roles to align with ioBroker standards
    * Replaced standard `setTimeout`/`setInterval` with adapter versions (`this.setTimeout`/`this.setInterval`) for better lifecycle management.
    * Ensured the standard `info` device object is created in `io-package.json`.

### 0.4.4 (2025-05-01)
* (bloop16) changed view log message log levels, ready for latest

### 0.4.3 (2025-05-01)
* (bloop16)
    * Update package.json: Upgrade Node.js engine requirement and dependencies

### 0.4.2 (2025-04-21)
* (bloop16)
    * Improved rate limit handling: only shows warnings after 3 consecutive rate limits

### 0.4.1 (2025-04-21)
* (bloop16)
    * Added randomness API request vary +-5sec

### 0.4.0 (2025-04-21)
* (bloop16)
    * Button "Get owned games" in admin UI now reliably triggers fetching 
    * Improved error handling and logging for owned games import
    * Removed unnecessary debug/info logs and startup messages
    * Optimized interval and timer handling for all background tasks
    * Improved translation coverage for all user-facing messages

### 0.3.0 (2025-04-18)
* (bloop16)
    * Added auto-completion for game names and AppIDs
    * Added import of all owned games from Steam library
    * Enhanced game information with icons, logos, and community stats
    * Fixed adapter termination issues
    * Added automatic game detection when player starts playing
    * Optimized API usage with reduced duplicate calls

### 0.2.3 (2025-04-18)
* (bloop16)
    * Fix APIRequest

### 0.2.1 (2025-04-16)
* (bloop16)
    * Fix APIRequest

### 0.2.0 (2025-04-16)
* (bloop16)
    * Added function to suggest up to 5 similar game names if a game cannot be found (typo-tolerant search and warning in log).

### 0.1.2 (2025-04-15)
* (bloop16)
    * Added configurable interval for GetPlayerSummaries (min 15s, default 60s)
    * Added fetching and updating of game news every 6 hours (4x per day)
    * Added fetching of recently played games every 15 minutes
    * Improved API request management and daily request counter reset
    * Cleaned up code and improved error handling

### 0.0.3 (2025-04-13)
* (bloop16)  
    * fixed state directory

### 0.0.2 (2025-04-13)
* (bloop16) First working Version  
    * Steam profile information integration  
    * API request management with daily limits  
    * Automatic reset of request counter  
    * Secure API key storage

## License
MIT License

Copyright (c) 2025 bloop16 <bloop16@hotmail.com>

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