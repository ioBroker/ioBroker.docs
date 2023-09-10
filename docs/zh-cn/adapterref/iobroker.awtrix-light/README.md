---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.awtrix-light?style=flat-square
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.awtrix-light?label=npm%20downloads&style=flat-square
BADGE-Snyk Vulnerabilities for npm package: https://img.shields.io/snyk/vulnerabilities/npm/iobroker.awtrix-light?label=npm%20vulnerabilities&style=flat-square
BADGE-node-lts: https://img.shields.io/node/v-lts/iobroker.awtrix-light?style=flat-square
BADGE-Libraries.io dependency status for latest release: https://img.shields.io/librariesio/release/npm/iobroker.awtrix-light?label=npm%20dependencies&style=flat-square
BADGE-GitHub: https://img.shields.io/github/license/klein0r/iobroker.awtrix-light?style=flat-square
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/klein0r/iobroker.awtrix-light?logo=github&style=flat-square
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/klein0r/iobroker.awtrix-light?logo=github&style=flat-square
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/klein0r/iobroker.awtrix-light?logo=github&style=flat-square
BADGE-GitHub issues: https://img.shields.io/github/issues/klein0r/iobroker.awtrix-light?logo=github&style=flat-square
BADGE-GitHub Workflow Status: https://img.shields.io/github/actions/workflow/status/klein0r/iobroker.awtrix-light/test-and-release.yml?branch=master&logo=github&style=flat-square
BADGE-Snyk Vulnerabilities for GitHub Repo: https://img.shields.io/snyk/vulnerabilities/github/klein0r/iobroker.awtrix-light?label=repo%20vulnerabilities&logo=github&style=flat-square
BADGE-Beta: https://img.shields.io/npm/v/iobroker.awtrix-light.svg?color=red&label=beta
BADGE-Stable: http://iobroker.live/badges/awtrix-light-stable.svg
BADGE-Installed: http://iobroker.live/badges/awtrix-light-installed.svg
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.awtrix-light/README.md
title: ioBroker.awtrix-light
hash: 5C1Z+MP29CrscOkXs4nzVIvudBHKKvF/95auMm9hAgI=
---
![标识](../../../de/admin/awtrix-light.png)

# IoBroker.awtrix-light
＃＃ 要求
-nodejs 14.5（或更高版本）
- js-controller 4.0.15（或更高版本）
- 管理适配器 6.0.0（或更高版本）
- 固件版本为 _0.84_（或更高版本）的 _Awtrix Light_ 设备 - 例如 Ulanzi TC001

在此购买：[Aliexpress.com](https://haus-auto.com/p/ali/UlanziTC001) 或这里：[ulanzi.de](https://haus-auto.com/p/ula/UlanziTC001)（附属链接）

＃＃ 第一步
1. 将固件刷新到设备并通过 WiFi 将其添加到本地网络 - 请参阅[文档](https://blueforcer.github.io/awtrix-light/#/quickstart)
2. 在ioBroker中安装awtrix-light适配器（并创建一个新实例）
3.打开实例配置并存储设备在本地网络中的IP地址

## FAQ（常见问题）
**我可以使用适配器禁用默认应用程序（例如电池电量或传感器数据）吗？**

不，此功能现已从 awtrix-light 固件中删除。使用设备本身上的菜单永久隐藏这些应用程序。

**你能用其他文本替换逻辑值（真/假）吗？**

为此，只需在 `alias.0` 中创建类型为 `string`（字符串）的别名，然后使用读取函数将逻辑值转换为任何其他值（例如 `val ? 'offen' : 'geschlossen'`）。 *这是ioBroker的标准功能，与此适配器没有直接关系。*

**如何切换到最新固件版本？**

只需使用 [设备上的菜单](https://blueforcer.github.io/awtrix-light/#/onscreen) 导航至点 `update`。然后时钟会自行完成剩下的工作。无需再次使用网络闪烁器（除非固件更新明确要求这样做）。

**充电时设备会变热。**

不幸的是，硬件设计并不是最佳的。建议使用尽可能弱且最大可提供 1A 的电源装置。

**您可以从设备中取出电池吗？**

是的，有这个选项。然而，由于前面板是粘着的，所以必须用热风枪才能打开该设备。您还需要 [焊料降压转换器](https://github.com/Blueforcer/awtrix-light/issues/67#issuecomment-1595418765) 才能使一切正常工作。

**是否可以对设备上的应用程序进行不同的排序？**

默认情况下，应用程序的显示顺序与在实例设置中创建的顺序相同。只需向上或向下移动应用程序即可更改位置。具有历史数据/图表的应用程序位于其他自定义应用程序后面。

如果您想设置自己的仓位，可以在专家选项中激活用户定义的仓位。之后，可以为每个应用程序分配一个数字位置。

**可以存储不同的数字格式吗？**

类型号 (common.type `number`) 的所有状态均按照 ioBroker 中的配置进行格式化。系统的标准格式可以用专家设置覆盖（自适配器版本 0.7.1 起）。数字可以用以下格式表示：

- 系统默认
- `xx.xxx,xx`
- `xx,xxx.xx`（美国格式）
- `xxxxx，xx`
- `xxxxx.xx`（美国格式）

**您可以限制对 awtrix-light Web 界面的访问吗？**

是的，从固件版本 0.82 开始，可以使用用户名和密码来保护访问。从适配器版本 0.8.0 开始，此用户数据也可以存储在实例设置中。

## 多个设备上的相同应用程序
如果要使用相同的应用程序控制多个 awtrix-light 设备，则必须为每个设备创建一个单独的实例。但是，您可以在其他设备的实例设置中指定应用程序应从另一个实例接管。

例子

1. 在`awtrix-light.0`实例中配置所有所需的应用程序
2. 为第二个设备创建另一个实例 (`awtrix-light.1`)
3. 在`awtrix-light.1`的实例设置中选择`awtrix-light.0`以在第二个设备上显示相同的应用程序

## Blockly 和 JavaScript
`sendTo` /消息框可用于

- 显示一次性通知（带有文本、声音、符号……）
- 播放声音

### 通知
向设备发送一次性通知：

```javascript
sendTo('awtrix-light', 'notification', { text: 'haus-automatisierung.com', repeat: 1, stack: true, wakeup: true }, (res) => {
    if (res && res.error) {
        console.error(res.error);
    }
});
```

消息对象支持固件中可用的所有选项。有关详细信息，请参阅[文档](https://blueforcer.github.io/awtrix-light/#/api?id=json-properties)。

*Blockly 块也可用于创建通知（此处并未提供所有可用选项）。*

### 音调
要播放（之前创建的）声音文件：

```javascript
sendTo('awtrix-light', 'sound', { sound: 'beispiel' }, (res) => {
    if (res && res.error) {
        console.error(res.error);
    }
});
```

消息对象支持固件中可用的所有选项。有关详细信息，请参阅[文档](https://blueforcer.github.io/awtrix-light/#/api?id=sound-playback)。

*可以使用 Blockly 块来使此调用更易于使用。*

## 自定义应用程序
**应用程序名称只能包含小写字母 (a-z) 并且必须是唯一的。没有数字，没有特殊字符，没有空格。**

以下应用程序名称由内部应用程序保留，无法使用：`time`、`date`、`temp`、`hum`、`bat`。

- `%s` 是状态值的占位符
- `%u` 是状态单位的占位符（例如 `°C`）

这些占位符可以在自定义应用程序的文本中使用（例如`Außentemperatur: %s %u`）。

**自定义应用程序仅显示确认值！带有`ack: false`的控制值将被忽略（以避免对设备的重复请求并确保显示的值有效）！**

所选状态的数据类型应为字符串`string` 或数字`number`。其他类型（如`boolean`）也受支持，但会生成警告。建议使用带有转换函数的别名来用文本替换逻辑值（例如`val ? 'an' : 'aus'`或`val ? 'offen' : 'geschlossen'`）。有关详细信息，请参阅 ioBroker 文档。 *此标准功能与适配器无关。*

以下组合会导致日志中出现警告：

- 具有所选对象 ID 的自定义应用程序在文本中不包含占位符“%s”
- 使用“common.unit”中选定的无单位对象 ID 创建自定义应用程序，但主体中包含“%u”
- 未选择对象 ID，但文本中使用了“%s”

## 历史应用程序/图表
**应用程序名称只能包含小写字母 (a-z) 并且必须是唯一的。没有数字，没有特殊字符，没有空格。**

以下应用程序名称由内部应用程序保留，无法使用：`time`、`date`、`temp`、`hum`、`bat`。

**图表中仅显示确认值。带有`ack: false`的税值将被过滤并忽略！**

## 应用程序状态
- 通过每个应用程序的“激活”状态，可以将其带到前台
- 这些状态具有`button`角色并且只允许布尔值`true`（其他值会导致日志中出现警告）

## 隐藏自定义应用程序
每个自行创建的应用程序都有一个 ID 为 `apps.<name>.visible` 的状态。如果此状态设置为 `false` (false)，应用程序将从设备中删除并且不再显示。这对于显示某些应用程序非常有用，例如仅在白天或在某些时间段内。

## 隐藏本机应用程序
要隐藏设备上的默认应用程序（例如温度或湿度）：使用设备本身上的菜单！有关详细信息，请参阅[文档](https://blueforcer.github.io/awtrix-light/#/onscreen)。

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**

Updated recommended firmware version to 0.84

* (klein0r) Added expert apps

### 0.8.0 (2023-09-04)

Updated recommended firmware version to 0.83

* (klein0r) Allow to set custom app positions (expert options)
* (klein0r) Unsubscribe from all states if device is not reachable
* (klein0r) Added options basic auth
* (klein0r) Get background effects via API
* (klein0r) Fixed 0 decimals setting
* (klein0r) Changed log level of some messages
* (klein0r) Added states for transitions

### 0.7.1 (2023-08-09)

* (klein0r) Added option for number format

### 0.7.0 (2023-08-03)

Updated recommended firmware version to 0.72

* (klein0r) Added MovingLine effect
* (klein0r) Added settings for time style and transition effect
* (klein0r) Setting repeat to 1 in blockly notifications

### 0.6.2 (2023-07-30)

* (klein0r) Fixed handling of state cache when object has been changed

### 0.6.1 (2023-07-28)

* (klein0r) Remove background effect in threshold overrides
* (klein0r) Minor fixes in admin config
* (klein0r) Fixed missing icon in history apps

## License
MIT License

Copyright (c) 2023 Matthias Kleine <info@haus-automatisierung.com>

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