---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.harvia-fenix/README.md
title: ioBroker.harvia-fenix
hash: 3RkffmBtNMTrvcFbrdmEzKSKgkJHDo3PjWxBm0u7et0=
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
#### 🟢 默认场景（主账号/桑拿房所有者）
如果您使用主 MyHarvia 帐户（最初在移动应用程序中注册桑拿房的帐户）配置适配器：

* 配置中，**设备 ID** 和 **合作伙伴 ID** 都**留空**。
* 启动时，适配器将自动发现并连接到您的桑拿房。

#### 🟡 共享/访客账户场景（例如：专用 ioBroker 账户）
如果桑拿房通过 MyHarvia 2 应用从所有者帐户共享给辅助访客帐户，则 Harvia 的自动发现端点会为访客令牌返回一个空的设备列表 (`{"devices":[]}`)。

在这种情况下，您必须在适配器设置中手动指定设备 ID 和所有者合作伙伴 ID：

**60秒内获取两个ID的方法：**

1. 在适配器配置中，临时输入**主/所有者帐户**的登录凭据，然后单击**保存**。
2. 打开 ioBroker 日志。适配器会立即连接，并打印包含两个 ID 的行：
* `找到设备：...（ID：xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx）` ➡️ 这是您的**设备 ID**。
* `使用用户令牌中的合作伙伴 ID：ORG/prod:0:6656` ➡️ 这是您的**合作伙伴 ID**（通常为 `ORG/prod:0:6656` 或 `ORG/prod:0:6656:0`）。
3. 复制这两个值。
4. 重新打开配置，切换回您的**访客帐户**凭据，将复制的**设备 ID**和**合作伙伴 ID**粘贴到各自的可选字段中，然后单击**保存并关闭**。

现在，访客账户可以直接可靠地控制共享桑拿房！

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
| `info.avgHeatingRate` | 数字 | `value` | 只读 | 已学习的历史平均升温速率（单位：摄氏度/分钟）（`°C/min`）。 |
| `info.heatingAnomaly` | 布尔值 | `indicator` | 只读 | 如果实时供暖性能显著低于历史平均水平，则将 `true` 置为真。 |
| `estimatedHeatingTimeRemaining` | 数字 | `value.interval` | 只读 | 达到目标温度（`min`）前预计剩余加热时间（分钟）。 |
| `online` | 布尔值 | `indicator.reachable` | 只读 | 控制单元与云端的连接状态。 |
| `doorSafety` | 布尔值 | `indicator.safety` | 只读 | 安全回路状态（例如，`true`表示门已锁定/可以安全运行）。 |
| `remoteControl` | 布尔值 | `indicator` | 只读 | 远程启动就绪状态。如果为 `false`，则阻止远程启动加热器（通过适配器）。 |
| `errorMsg` | 字符串 | `text` | 只读 | 加热器当前错误信息或状态文本。 |
| `heatOn` | 布尔值 | `switch.power` | 读/写 | 主开关，用于打开 (`true`) 或关闭 (`false`) 桑拿加热器。 |
| `heaterPower` | 数字 | `value.power` | 只读 | *注意：* 此对象由 MyHarvia API 结构提供，但目前以 `0 kW`（未填充）的形式提供。它似乎是为未来的硬件或应用程序更新而保留的。 |
| `lightOn` | 布尔值 | `switch.light` | 读/写 | 切换打开或关闭集成桑拿照明。 |
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

## 智能功能与自动化
### 1. 自适应加热预测与异常检测
* **已学习的供暖持续时间（`estimatedHeatingTimeRemaining` 和 `info.avgHeatingRate`）：**

该适配器会学习您舱室的加热速率（摄氏度/分钟）。在运行过程中，它会将历史性能与实时温度变化相结合，以计算出准确的剩余加热时间。

* **异常检测（`info.heatingAnomaly`）：**

如果在至少 10 分钟的积极加热后，实时加热率低于历史平均值的 50%（例如，桑拿房门未关好或加热元件故障），则 `info.heatingAnomaly` 会启动 `true` 并记录警告。

### 2. 通知（推送触发器）
该适配器会自动计算加热进度，并提供专门设计的指示数据点，用于触发推送通知（例如通过 Telegram、Pushover 或 Alexa）：

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

// Trigger on heating anomaly (e.g. door open)
on({ id: 'harvia-fenix.0.info.heatingAnomaly', change: 'ne', val: true }, function () {
    sendTo('telegram.0', 'send', { text: '⚠️ Warning: Sauna is heating unusually slowly! Please check door and heater.' });
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
* [ ] 设置桑拿后自动冷饮提醒，帮助您在桑拿后放松身心🍺❄️
* [ ] 设计一款人工智能驱动的机器人毛巾挥动助手，打造极致的 Aufguss 体验 🧖‍♂️🪣

---

## Changelog
### **WORK IN PROGRESS**
* (meistermopper) Update @alcalzone/release-script-plugin-license to 5.2.2

### 0.4.0 (2026-08-13)
* (meistermopper) Add adaptive heating duration prognosis and anomaly detection
* (meistermopper) Add dev script shortcut for dev-server watch in package.json
* (meistermopper) Clarify Partner ID and guest account setup instructions
* (meistermopper) Document adaptive heating prognosis and anomaly detection
* (meistermopper) Add strict privacy and anonymization rule to AGENTS.md
* (meistermopper) Clean up To-Do list and add fun future wishlist items

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

[Older changelog entries](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2026 meistermopper <meister.mopper@gmail.com>