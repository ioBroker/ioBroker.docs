---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.pwned-check/README.md
title: ioBroker.pwned-check
hash: vgvs+zBTh58scQomT7gXNZRJIJQNXbdjCPyF6VIckY4=
---
![标识](../../../en/adapterref/iobroker.pwned-check/admin/pwned-check.svg)

![NPM 版本](https://img.shields.io/npm/v/iobroker.pwned-check.svg)
![下载](https://img.shields.io/npm/dm/iobroker.pwned-check.svg)
![安装数量](https://iobroker.live/badges/pwned-check-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/pwned-check-stable.svg)
![NPM](https://nodei.co/npm/iobroker.pwned-check.png?downloads=true)

# IoBroker.pwned-check
**测试：** ![测试与发布](https://github.com/ipod86/ioBroker.pwned-check/workflows/Test%20and%20Release/badge.svg)

## 用于密码和电子邮件泄露检查的 ioBroker 适配器
该适配器会检查您的密码或电子邮件地址是否出现在已知的数据泄露事件中——而无需将您的实际密码发送到任何服务器。

＃＃ 特征
- **隐私至上** – 密码绝不会被传输。SHA-1 哈希值在浏览器本地计算；只有前 5 个字符会被发送到 API（k-匿名性）。
- **密码检查** – 使用免费的 [Have I Been Pwned](https://haveibeenpwned.com/API/v3#PwnedPasswords) k-anonymity API — 无需 API 密钥
- **电子邮件检查** – 使用免费的 [XposedOrNot](https://xposedornot.com) API — 无需 API 密钥
- **泄露详情** – `emails.<id>.leaks.*` 下每个泄露源的详细数据点
- **ioBroker 通知** – 当检测到新的安全漏洞时，以配置的系统语言（支持 11 种语言）发送系统通知。
- **HTML可视化** – 生成可用于可视化信息系统或其他仪表盘的即用型HTML数据点
- **可配置外观** – 主题（浅色/深色）、背景透明度、卡片透明度、字体大小
- **可配置间隔** – 每 3、6、12 或 24 小时检查一次
- **恶意软件检测** – 通过进程和文件检查检测 pawns-cli（iProyal 代理软件）（**仅限 Linux 系统** — 在 Windows 和 macOS 系统上会自动跳过）

## 平台支持
密码和电子邮件泄露检查适用于**所有平台**（Linux、Windows、macOS）。

**恶意软件检测**（pawns-cli 检查）**仅限 Linux 系统**——恶意软件检测工具 (pawns-cli) 是一个 Linux 二进制文件，在 Windows 或 macOS 系统上不可用。在非 Linux 系统上，此检查将自动跳过；无需任何配置。

＃＃ 安装
通过 ioBroker 管理界面安装——搜索 **pwned-check**。

＃＃ 配置
### 密码选项卡
每个要监控的密码添加一个条目。输入**描述**（例如服务名称）和**密码**。SHA-1 哈希值将在您的浏览器中计算并存储——明文密码绝不会被保存。

| 字段 | 描述 |
|-------|-------------|
| 描述 | 此密码的标签（例如“GitHub”） |
| 密码 | 输入一次；仅存储 SHA-1 哈希值 |

### 电子邮件选项卡
每个要监控的电子邮件地址添加一个条目。

| 字段 | 描述 |
|-------|-------------|
| 电子邮件 | 要检查的电子邮件地址 |

### 设置选项卡
| 设置 | 说明 | 默认值 |
|---------|-------------|---------|
| 间隔 | 检查新违规行为的频率 | 24 小时 |
| 主题 | 浅色或深色视觉效果 | 浅色 |
| 背景透明度 | 外层容器不透明度（0 = 完全透明） | 100% |
| 卡片透明度 | 单个入场卡不透明度 | 100% |
| 字体大小 | 可视化中的文本大小 | 14 像素 |

## 数据点
适配器在 `pwned-check.<instance>` 下创建数据点。

### 密码
| 数据点 | 类型 | 描述 |
|-----------|------|-------------|
| `passwords.<id>.isPwned` | 布尔值 | `true` 如果在违规中发现 |
| `passwords.<id>.lastCheck` | 字符串 | 上次成功检查的 ISO 时间戳 |
| `passwords.<id>.lastCheck` | 字符串 | 上次成功检查的 ISO 时间戳 |

### 电子邮件
| 数据点 | 类型 | 描述 |
|-----------|------|-------------|
| `emails.<id>.isPwned` | 布尔值 | `true` 如果在违规事件中发现 |
| `emails.<id>.leaks.<service>` | 布尔值 | `true`，针对每个发现的违规源 |
| `emails.<id>.leaks.<service>` | 布尔值 | 对于找到的每个泄露源，`true` |

＃＃＃ 其他
| 数据点 | 类型 | 描述 |
|-----------|------|-------------|
| `visualisation` | 字符串 | 用于 VIS 或 ioBroker.vis-2 的 HTML 代码片段 |
| `info.connection` | 布尔值 | 检查运行时为 `true` |

＃＃ 隐私
密码**绝不会**以明文形式存储，只会存储其 SHA-1 哈希值。
- 密码哈希值采用 HIBP **k-匿名性** 方法进行验证：仅传输哈希值的前 5 个十六进制字符；完整的哈希值永远不会离开您的系统。
- 电子邮件地址通过 HTTPS 发送到 XposedOrNot API。

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.0.9 (2026-07-01)
* (ipod86) fix: update adapter-core to 3.4.1, clarify malware scanner description in README (W0034)
* (ipod86) fix: update admin dependency to >= 7.8.23 and fix dependabot cooldown format (W8917)

### 0.0.8 (2026-06-09)
* (ipod86) fix: robust language detection for widget (toLowerCase + language fallback)
* (ipod86) fix: translate all widget strings to system language (SAFE/PWNED/section headers/last check)

### 0.0.7 (2026-06-08)
* (ipod86) fix: translate all object names and widget texts to English/system language
* (ipod86) fix: malware notification now only sent on new detection, not on every check
* (ipod86) fix: malware check skipped on non-Linux platforms (Windows/macOS)
* (ipod86) fix: i18n description key corrected in 9 language files

### 0.0.6 (2026-06-06)
* (ipod86) fix: add missing intermediate folder/channel objects for emails, passwords, system, leaks (E3009)
* (ipod86) fix: update @alcalzone/release-script to >=5.2.1 (E0036)

### 0.0.5 (2026-05-31)
* (ipod86) fix: use this.setInterval/clearInterval/setTimeout/delay instead of plain JS timers (W5004, W5005, W5051)
* (ipod86) fix: add missing i18n key "label" to all languages (W5604)
* (ipod86) fix: engines.node >= 22, @tsconfig/node22, @types/node ^22, deploy node 24 (E0028, E3022)
* (ipod86) fix: add dependabot ignore block for @types/node major versions (E8917)
* (ipod86) fix: remove Node 20 from test matrix (W3024)
* (ipod86) fix: upgrade typescript to 6.0.3, release-script to 5.2.0, @iobroker/eslint-config to 2.3.4

Older changelogs are available in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License

MIT License

Copyright (c) 2026 ipod86

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