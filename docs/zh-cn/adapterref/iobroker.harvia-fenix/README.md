---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.harvia-fenix/README.md
title: ioBroker.harvia-fenix
hash: jEMlySiE0Wma0PxeDul3GrIPE76sFjebGAPMZoV+jX0=
---
![下载](https://img.shields.io/npm/dm/iobroker.harvia-fenix.svg)
![节点](https://img.shields.io/node/v/iobroker.harvia-fenix.svg)
![执照](https://img.shields.io/npm/l/iobroker.harvia-fenix.svg)
![GitHub 问题](https://img.shields.io/github/issues/meistermopper/ioBroker.harvia-fenix.svg)
![安装数量](https://iobroker.live/badges/harvia-fenix-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/harvia-fenix-stable.svg)
![NPM](https://nodei.co/npm/iobroker.harvia-fenix.png?downloads=true)

<p align="center"><img src="admin/harvia.png" alt="标识" width="100" /></p>

# IoBroker.harvia-fenix
**[这是文档的德语版本。](https://github.com/meistermopper/ioBroker.harvia-fenix/blob/main/README_de.md)**

![测试与发布](https://github.com/meistermopper/ioBroker.harvia-fenix/workflows/Test%20and%20Release/badge.svg)

### IoBroker 适配器，用于通过 MyHarvia 云基础设施集成和控制您的 **Harvia Fenix** 桑拿控制单元。
有关 Harvia 及其桑拿控制单元的更多信息，请访问 [Harvia 官方网站](https://www.harvia.com)。

---

## ⚠️ 重要安全警告和免责声明
**桑拿加热器的远程操作必须遵守严格的安全规定！** 根据欧洲安全标准**EN 60335-2-53**以及**EN 60335-1**，远程控制装置必须配备防火措施。桑拿房必须配备经认证的门传感器或安全断电系统。这样可以确保，如果易燃物品（例如毛巾）放置在加热器上或附近，加热器将无法通过远程方式或定时器启动。

* **免责声明：**本适配器的开发者对因使用或错误配置本软件而导致的任何损害、火灾、人身伤害或法律问题概不负责，亦不提供任何保证或法律责任。您需自行承担使用此集成软件的全部风险。
* **商标：** Harvia 和 MyHarvia 2 是 Harvia 集团的注册商标。本适配器是一个独立的、社区驱动的开源项目，未经 Harvia 官方认可、赞助或支持。

---

＃＃ 安装
该适配器可在 ioBroker 官方软件仓库中找到。您可以直接通过 ioBroker 管理后台的 Web 界面进行安装。

### 通过 ioBroker 管理员
1. 在浏览器中打开 ioBroker Web 界面（例如 `192.168.1.33:8081`）。
2. 点击**适配器**选项卡。
3. 在筛选器中输入“harvia-fenix”。
4. 点击三个点，然后点击 **Harvia Fenix** 适配器的“+”符号，添加实例。

---

＃＃ 设置
除了安装适配器之外，您还必须使用您的 MyHarvia 帐户详细信息配置适配器实例。

### 先决条件
1. **Node.js 版本 >= 22**
2. 在官方 **MyHarvia 2** 智能手机应用程序中注册的帐户。
3. 您有效的登录凭证：
- **电子邮件地址**
   - **密码**

*注：我们建议在 Harvia 2 应用中为 ioBroker 设置一个单独的账户，并在实例中使用该账户的登录凭据。*

### IoBroker 配置
1. 在浏览器中打开 ioBroker 界面（例如 `192.168.1.33:8081`）。
2. 导航至“实例”选项卡，然后单击您的 `harvia-fenix.0` 实例的设置图标。
3. 输入您的 MyHarvia 帐户的**电子邮件地址**和**密码**。
4. 如果将“设备 ID”字段留空，适配器将在启动时自动搜索与您的帐户关联的设备。它会将找到的第一个设备用作活动设备。
5. 调整可选参数：**轮询间隔**（秒）、**最低/最高目标温度限制**（°C）和**最长加热时间**（分钟）。
6. 点击**保存并关闭**。

### 设备配置和多设备支持
#### 自动发现
如果适配器设置中的“设备 ID”字段留空，适配器将在启动时自动搜索与您的帐户关联的设备，并将找到的第一个设备用作活动单元。检测到的 ID 将打印到 ioBroker 日志中。

#### 手动设备 ID
对于大多数只有一台桑拿房的用户来说，自动发现功能就足够了。但是，建议从日志中复制检测到的 ID 并粘贴到配置中，以确保与特定硬件建立稳定的连接。

#### 多间桑拿房
如果您的 MyHarvia 帐户管理多个控制单元（例如，一个在家中，一个在度假小屋）：

1. 为每个桑拿房创建一个单独的适配器实例（例如 `harvia-fenix.0` 和 `harvia-fenix.1`）。
2. 在各自的实例配置中，手动输入每个单元的特定**设备 ID**。

这样，您就可以使用各自的数据点独立地监控和控制两个桑拿房。

### 共享/访客帐户和合作伙伴 ID
合作伙伴 ID 是什么？
MyHarvia 云基础设施将设备、用户和应用程序划分到不同的“合作伙伴组织”中。例如，官方的 **MyHarvia 2** 智能手机应用程序映射到合作伙伴 ID `ORG/prod:0:6656:0`。

通常情况下，当用户登录时，适配器会解码其 JSON Web Token (JWT) 有效负载，并自动从 `custom:org` 字段中提取合作伙伴 ID。然后，它使用此 ID 查询 Harvia 云 API 以发现已连接的设备。

#### 共享/访客帐户问题
如果其他用户（所有者/主要用户）已在 MyHarvia 2 应用中与您共享了他们的桑拿房：

1. 您的帐户令牌与不同的访客合作伙伴 ID 相关联（例如 `ORG/prod:0:6749` 或自定义 ID）。
2. 如果适配器查询您的访客合作伙伴 ID 下的设备列表，Harvia Cloud API 将返回一个空列表 (`{"devices":[]}`)，您将看不到桑拿房。
3. 要发现和控制共享桑拿房，API 请求**必须使用所有者的合作伙伴 ID**。

如何查找所有者的合作伙伴 ID？
有两种方法可以确定所有者的合作伙伴 ID：

1. **标准应用程序：** 如果所有者使用的是官方的标准 **MyHarvia 2** 移动应用程序，则合作伙伴 ID 为 **`ORG/prod:0:6656:0`**。
2. **从 ioBroker 日志中获取信息：** 如果所有者已经运行了 `harvia-fenix` 适配器，他们可以查看 ioBroker 启动日志。启动时，适配器会打印类似这样的行：

`Using partner ID from user token: ORG/prod:0:XXXX` 所有者可以简单地复制此 ID 并将其与访客用户共享。

#### 如何配置共享/访客帐户
1. 在适配器设置中输入您自己的**用户名/电子邮件**和**密码**（访客凭据）。
2. 在“合伙人 ID（可选）”字段中输入**所有者的合伙人 ID**。
3. 如果将 **设备 ID** 字段留空，适配器将使用所有者的合作伙伴 ID 搜索共享设备并自动找到它。

---

## 兼容性说明
* **支持：** **通过 **MyHarvia 2** 移动应用程序管理的 Harvia Fenix** 控制单元。
* **不支持：** **Harvia Xenio** 系列（例如 Xenio WiFi / CX001WIFI）。Xenio 系列依赖于旧版硬件生态系统，并使用较旧的“MyHarvia for Xenio”应用程序，该应用程序与此适配器使用的 API 存在根本性的不兼容。

---

＃＃ 用法
该适配器将桑拿房的云状态映射到 `harvia-fenix.0.*` 下的结构化 ioBroker 数据点。

### 可用数据点
| 数据点 | 类型 | 角色 | 访问权限 | 描述 |
|---|---|---|---|---|
| `info.connection` | 布尔值 | `indicator` | 只读 | 适配器与 MyHarvia 云的连接状态。 |
| `info.maxTemp` | 编号 | `value.temperature` | 只读 | 最大目标温度限制 (`110 °C`)。 |
| `online` | 布尔值 | `indicator.reachable` | 只读 | 控制单元与云端的连接状态。 |
| `doorSafety` | 布尔值 | `indicator.safety` | 只读 | 安全回路状态（例如，`true`表示门已锁定/可以安全运行）。 |
| `remoteControl` | 布尔值 | `indicator` | 只读 | 远程启动就绪状态。如果为 `false`，则阻止远程启动加热器（通过适配器）。 |
| `errorMsg` | 字符串 | `text` | 只读 | 来自加热器的当前错误消息或状态文本。 |
| `heatOn` | 布尔值 | `switch.power` | 读/写 | 主开关，用于打开 (`true`) 或关闭 (`false`) 桑拿加热器。 |
| `heaterPower` | 数字 | `value.power` | 只读 | *注意：* 此对象由 MyHarvia API 结构提供，但目前以 `0 kW`（未填充）的形式提供。它似乎是为未来的硬件或应用程序更新而保留的。 |
| `lightOn` | 布尔值 | `switch.light` | 读/写 | 切换开启或关闭集成桑拿照明。 |
| `maxDuration` | 数字 | `level.timer` | 读/写 | 桑拿房使用期间允许的最大加热时间（分钟）（`min`）。 |
| `panelTemp` | 数字 | `value.temperature` | 只读 | 在物理控制面板单元处测量的温度读数。 |
| `targetTemp` | 数字 | `level.temperature` | 读/写 | 桑拿房的目标温度设定值（例如，`90 °C`）。 |
| `temp` | 数字 | `value.temperature` | 只读 | 桑拿房内的当前环境温度（例如，`17 °C`）。 |
| `readyNotified10Min` | 布尔值 | `indicator` | 只读 | 当桑拿房距离目标温度还有大约 10 分钟（比目标温度低 13°C）时，将 `true` 置为真。 |
| `targetReachedNotified` | 布尔值 | `indicator` | 只读 | 当桑拿房成功达到设定的目标温度时，将 `true` 置为真。 |
| `totalBathingHours` | 编号 | `value.number` | 只读 | 桑拿房历史累计使用总小时数 (`h`)。 |
| `totalOperatingHours` | 数字 | `value.hours` | 只读 | 系统总运行小时数 (`h`)。 |
| `totalSessions` | 数字 | `value.count` | 只读 | 已执行的桑拿加热疗程总数计数器。 |
| `totalSessions` | 数字 | `value.count` | 只读 | 已执行的桑拿加热会话总数计数器。 |

---

## 通知与自动化
该适配器会自动计算加热进度，并提供两个专门设计的指示数据点，用于触发推送通知（例如通过 Telegram、Pushover 或 Alexa）。

您可以使用一个简单的 ioBroker 脚本（JavaScript 或 Blockly），监听这些状态变为 `true`：

```javascript
// Trigger for the 10-minute pre-warning
on({ id: 'harvia-fenix.0.readyNotified10Min', change: 'ne', val: true }, function () {
    const targetTemp = getState('harvia-fenix.0.targetTemp').val;
    sendTo('telegram.0', 'send', { text: `🧖 The sauna will reach its target temperature (${targetTemp}°C) in about 10 minutes.` });
});

// Trigger when the sauna is fully ready
on({ id: 'harvia-fenix.0.targetReachedNotified', change: 'ne', val: true }, function () {
    const targetTemp = getState('harvia-fenix.0.targetTemp').val;
    sendTo('telegram.0', 'send', { text: `♨️ The sauna has reached the target temperature of ${targetTemp}°C and is ready!` });
});
```

*注：当加热器关闭或开始新的加热过程时，这些状态将自动重置为`false`。*

---

## 故障排除
### `errorMsg`中的常见 API 错误和状态消息
* **`操作被阻止（403 禁止访问）。控制面板上的远程启动授权（安全回路）可能未激活。`**
- **原因：**欧洲安全标准要求，只有在安全回路/门传感器关闭且在桑拿房面板上物理启用远程启动后，才能激活远程启动。
- **解决方法：** 关闭桑拿房门，然后按下 Harvia 控制面板上的**远程启动/Fernstart**按钮。屏幕上的远程图标必须处于激活状态。完成后，即可通过适配器控制桑拿房。
* **`云锁定：设备繁忙，命令已丢弃。`（已记录为调试日志）**
- **原因：** Harvia 的 API 会对快速连续发送的命令（例如在 UI 中快速点击）进行速率限制，以保护硬件。
- **解决方案：**在发送命令之间等待几秒钟。适配器会自动丢弃发送过快的命令，以防止 API 阻塞。

---

待办事项
* [ ] 等待 Harvia 官方许可才能使用其原有标志
* [x] 将适配器添加到官方 ioBroker `latest` 仓库
* [x] 将适配器添加到官方 ioBroker `stable` 仓库

---

## Changelog
### 0.3.2 (2026-08-11)
* (meistermopper) Use absolute GitHub URLs for language switching links in README files
* (meistermopper) Remove latest repository and translation badges from README files
* (meistermopper) Mark stable repository addition as completed in To-Do list
* (meistermopper) Remove direct npm installation instructions from README files
* (dependabot) Bump axios from 1.18.1 to 1.19.0
* (meistermopper) Center adapter logo in README files
* (meistermopper) Add Weblate translation status badge to README files
* (meistermopper) Add npm run translate step to release-before-commit script
* (meistermopper) Replace static latest badge with dynamic iobroker.live badge

### 0.3.1 (2026-08-04)
* (meistermopper) Update GitHub Actions in auto-translate workflow to v7
* (meistermopper) Add Git commit and push authorization rule to AGENTS.md
* (meistermopper) Add auto-translate workflow for automatic i18n translations
* (meistermopper) Add missing CHANGELOG_OLD link to README files
* (meistermopper) Fix untranslated news entries for 0.2.8 in io-package.json
* (meistermopper) Add common.news translation rule to AGENTS.md
* (meistermopper) Remove redundant npm badge and move Test and Release badge after NPM banner

### 0.3.0 (2026-07-29)
* (meistermopper) Add configurable min/max temperature limits and maxDuration in Admin UI

### 0.2.8 (2026-07-26)
* (meistermopper) Note latest repository availability in README installation section
* (meistermopper) Fix doorSafety role to sensor.door for repochecker compliance
* (meistermopper) Add missing CHANGELOG_OLD link to README.md (repochecker S6022)
* (meistermopper) Fix changelog rotation in README_de.md to enforce 5 entries limit

### 0.2.7 (2026-07-17)
* (meistermopper) Implement retry for "Device unavailable" and proactive token refresh
* (meistermopper) Restore clean datapoint table and safety warnings in README files
* (meistermopper) Mark latest repository item as completed in To-Do list
* (meistermopper) Clarify remoteControl description in README files
* (meistermopper) Remove redundant ==== underlines from header in README files
* (meistermopper) Remove duplicate changelog link and format it consistently in README files
* (meistermopper) Update Biome schema version to 2.5.3 to match CLI version

[Older changelog entries](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2026 meistermopper <meister.mopper@gmail.com>