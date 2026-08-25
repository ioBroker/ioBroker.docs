---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.omoda/README.md
title: ioBroker.omoda
hash: A9vHKEqmtsrZqWaz5ie+qeb/ZUIFhwzOWRk0TnruWsg=
---
![标识](../../../en/adapterref/iobroker.omoda/admin/omoda.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.omoda.svg)
![下载](https://img.shields.io/npm/dm/iobroker.omoda.svg)
![安装数量](https://iobroker.live/badges/omoda-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/omoda-stable.svg)
![NPM](https://nodei.co/npm/iobroker.omoda.png?downloads=true)

# IoBroker.omoda
**测试：** ![测试与发布](https://github.com/AlanSRU/ioBroker.omoda/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 omoda 适配器
将您的 **Omoda / Jaecoo** 汽车导入 ioBroker：车辆状态、GPS 位置、电池/充电、远程 **锁定** 和 **气候** — 使用与官方 [Omoda / Jaecoo 应用](https://www.omoda.com/) 相同的云后端。

> ⚠️ **非官方、逆向工程软件。** 与 Omoda、Jaecoo 或 Chery 无任何关联、认可或联系。按“原样”提供，**使用风险自负，且仅限用于您自己的车辆**。名称和商标归其各自所有者所有。请参阅 [执照](LICENSE)。

### 它的功能
- **状态** — 车门、车窗、天窗、车锁、发动机、空调运行情况、轮胎压力/温度。
- **位置** — GPS 纬度/经度、速度、方向。
- **电池及充电** — 电量状态、纯电/总续航里程、充电状态、充电功率

充电插头已连接，剩余充电时间。

- **命令** — 锁定/解锁、开启/关闭空调（可设置目标温度）、请求 GPS 定位

位置和“唤醒并刷新完整状态”。

车辆应用程序的其他功能（独立座椅加热/通风、除霜器、电动汽车充电启动/停止和定时充电、车窗/天窗/后备箱控制、防盗警报）计划在以后的版本中推出。

＃＃＃ 要求
- 与车辆关联的 **Omoda / Jaecoo 帐户**（车主或委托访问权限）。
- 账户**邮箱**和**命令PIN码**。
- 地区：默认为**欧洲**（已确认在英国也有效）。其他市场也可以设置。

在适配器设置的**区域和轮询**下进行配置。

**提示：**考虑为适配器使用**委托的第二个帐户**。如果在此处和官方应用程序中使用同一个帐户登录，则会导致两个帐户反复互相登出。

＃＃＃ 设置
1. 从 ioBroker 管理后台的“适配器”选项卡安装 **Omoda / Jaecoo** 适配器并创建

一个实例。

2. 在**帐户**选项卡上，输入您的**电子邮件**和**命令PIN码**并保存。
3. 在“登录（OTP）”选项卡上，按“请求 OTP 代码”——系统会将一次性代码通过电子邮件发送给您。
4. 输入验证码并按**确认OTP**。适配器登录并发现您的车辆。

根据 `omoda.0.<VIN>` 为每个 VIN 创建设备。

只有当会话过期时（通常是因为打开了官方应用程序），才需要新的 OTP；否则会话会自动刷新。

### 注意事项及安全提示
- 命令密码 (PIN) 是您的帐户密码。反复输入错误密码可能会导致帐户被锁定。

帐户**，因此适配器在几次尝试失败后停止——在重试之前，请重新检查设置中的 PIN 码。

- 车辆处于待机状态时，许多值都显示为“null”；电池电量、速度和里程数更新

**行驶或充电时**，或按下**刷新完整状态**（这将短暂唤醒汽车）后。

- 唤醒汽车的操作受到后端**速率限制**，因此适配器会强制执行冷却。
- MQTT遥测连接使用**双向TLS**。客户端证书/密钥材料和

固定 CA 证书随适配器一起发布在 `data/certs-store.json` 中（已加密，由上游 HA 集成恢复），因此适配器无需重新配置即可离线工作。如果 Chery 轮换了 MQTT CA 或客户端证书，则必须重新生成该文件并发布新的适配器版本——在此之前，遥测连接将无法建立。

## 鸣谢
此适配器移植自 **Caslinovich** 和 **JackRonan** 在 Home Assistant 集成 **[omoda-jaecoo-ha](https://github.com/JackRonan/omoda-jaecoo-ha)** 中出色的逆向工程工作。他们恢复了协议常量、请求签名公式、MQTT 凭证派生和端点配方，并在此以 MIT 许可证使用——没有他们的努力，本项目将不复存在。请为上游项目点赞并支持。此 ioBroker 移植版本中的所有错误均由我负责，与他们无关。

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.2.0 (2026-08-10)
* (Alan Paris) **BREAKING:** `commands.lock` now follows the ioBroker `switch.lock` spec — **true UNLOCKS** the car, false locks it. Any script writing `true` to lock must be inverted. This is the polarity Alexa/Google (via ioBroker.iot), VIS lock widgets and type-detector already assume, so the old behaviour unlocked the car when the user asked to lock it
* (Alan Paris) Fixed telemetry fields the car reports as `null` being stored as real values: `doors.locked` no longer reads "locked" when nothing was reported, and GPS no longer jumps to latitude/longitude 0
* (Alan Paris) `info.connection` now returns to false when the session expires (e.g. the official app logs in on the same account) instead of staying true while every poll silently failed
* (Alan Paris) Corrected the "Dept ID" help text in all 11 languages — the default is 44 (UK), not 39
* (Alan Paris) The OTP code is now encrypted at rest, not only marked protected
* (Alan Paris) `location.heading` uses a plain `value` role (`value.direction` is an up/down/opening enum, not a compass bearing)
* (Alan Paris) Car MQTT reconnects back off from 10 s to 2 min and stop repeating the same warning, instead of retrying every 10 s forever when the broker keeps rejecting us
* (Alan Paris) The captcha solver yields to the event loop, so it can no longer stall other adapters sharing a compact host process
* (Alan Paris) Removed unused constants, token-store helpers and the placeholder test file
* (Alan Paris) Default "Dept ID" is now 44 (UK) instead of 39 (IT) — existing instances keep the value they already have (upstream 37f8f2b)
* (Alan Paris) Fixed a stale "charge remaining time": the field vanishes from the payload when charging ends, so the state now clears instead of showing the last value for hours (upstream a0f61ed)
* (Alan Paris) Command confirmations no longer cry "check failed" when the car reports only the climate module — the backend includes it on nearly every successful OFF command (upstream 2cc7d56)
* (Alan Paris) Backend rejections caused by vehicle permissions or a malformed request (A00374/A00554/A00567/A00604/A00643/A00757) no longer count towards the wrong-PIN anti-lockout (upstream 8aa4176)
* (Alan Paris) Correct state roles for info.model and info.brand; account email marked as protected
* (Alan Paris) The charging/driving fast-follow poll now self-schedules, so a slow probe can no longer overlap the next one

### 0.1.1 (2026-07-18)
* (Alan Paris) Security: never log the VIN or MQTT user id in cleartext (masked to a short suffix)
* (Alan Paris) Fixed a leak of the car MQTT client and polling timers when re-logging in after a session drop
* (Alan Paris) Added credit to the upstream Home Assistant integration (JackRonan/omoda-jaecoo-ha) in the README and LICENSE
* (Alan Paris) Added full admin UI translations for all 11 languages
* (Alan Paris) Config: clearer "Dept ID" help — it must match your account country's dialing code (UK=44, IT=39, …)
* (Alan Paris) Require Node.js >= 22 and admin >= 7.6.17; enabled automated npm publishing via trusted publishing (OIDC)
* (Alan Paris) Marked the OTP code as protected; various adapter-checker compliance fixes

### 0.1.0 (2026-07-18)
* (Alan Paris) initial release

## License
MIT License

Copyright (c) 2026 Alan Paris <alan.paris@scottish.rugby>

Portions Copyright (c) 2026 Caslinovich and the omoda-jaecoo-ha contributors (JackRonan),
ported from https://github.com/JackRonan/omoda-jaecoo-ha (MIT) and retained under its terms.

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