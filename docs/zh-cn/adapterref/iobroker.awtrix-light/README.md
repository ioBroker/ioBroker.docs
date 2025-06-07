---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.awtrix-light?style=flat-square
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.awtrix-light?label=npm%20downloads&style=flat-square
BADGE-node-lts: https://img.shields.io/node/v-lts/iobroker.awtrix-light?style=flat-square
BADGE-Libraries.io dependency status for latest release: https://img.shields.io/librariesio/release/npm/iobroker.awtrix-light?label=npm%20dependencies&style=flat-square
BADGE-GitHub: https://img.shields.io/github/license/klein0r/iobroker.awtrix-light?style=flat-square
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/klein0r/iobroker.awtrix-light?logo=github&style=flat-square
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/klein0r/iobroker.awtrix-light?logo=github&style=flat-square
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/klein0r/iobroker.awtrix-light?logo=github&style=flat-square
BADGE-GitHub issues: https://img.shields.io/github/issues/klein0r/iobroker.awtrix-light?logo=github&style=flat-square
BADGE-GitHub Workflow Status: https://img.shields.io/github/actions/workflow/status/klein0r/iobroker.awtrix-light/test-and-release.yml?branch=master&logo=github&style=flat-square
BADGE-Beta: https://img.shields.io/npm/v/iobroker.awtrix-light.svg?color=red&label=beta
BADGE-Stable: http://iobroker.live/badges/awtrix-light-stable.svg
BADGE-Installed: http://iobroker.live/badges/awtrix-light-installed.svg
chapters: {"pages":{"de/adapterref/iobroker.awtrix-light/README.md":{"title":{"de":"ioBroker.awtrix-light"},"content":"de/adapterref/iobroker.awtrix-light/README.md"},"de/adapterref/iobroker.awtrix-light/weather-app.md":{"title":{"de":"ioBroker.awtrix-light"},"content":"de/adapterref/iobroker.awtrix-light/weather-app.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.awtrix-light/README.md
title: ioBroker.awtrix-light
hash: FxNpFW8FV46EXb0cCMmvKwSo6/M3PV9mN/5GKvkM03Q=
---
![标识](../../../de/admin/awtrix-light.png)

# IoBroker.awtrix-light
＃＃ 要求
- nodejs 20（或更新版本）
- js-controller 6.0.0（或更新版本）
- 管理适配器 7.4.10（或更新版本）
- 固件版本为 0.98（或更新版本）的 Awtrix 3 设备 - 例如 Ulanzi TC001

在此购买：[Aliexpress.com](https://haus-auto.com/p/ali/UlanziTC001) 或此处：[ulanzi.de](https://haus-auto.com/p/ula/UlanziTC001)（附属链接）

## 第一步
1. 将固件刷入设备并通过 Wi-Fi 将其添加到本地网络 - 请参阅[文档](https://blueforcer.github.io/awtrix3/#/quickstart)
2. 在 ioBroker 中安装 awtrix-light 适配器（并创建一个新实例）
3.打开实例配置，输入设备在本地网络中的IP地址

## FAQ（常见问题）
**我可以使用适配器禁用默认应用程序（如电池电量或传感器数据）吗？**

不可以，此功能已从 awtrix-light 固件中移除。您可以使用设备自带的菜单永久隐藏这些应用。

**逻辑值（true/false）可以用其他文本替换吗？**

为此，只需在`alias.0`中创建一个类型为`string`（字符串）的别名，并使用读取函数将逻辑值转换为任何其他值（例如，`val ? 'offen' : 'geschlossen'`）。*这是ioBroker的标准功能，与此适配器无关*。

**如何升级到最新固件版本？**

只需使用[设备上的菜单](https://blueforcer.github.io/awtrix3/#/onscreen)导航至`update`点即可。手表将自动完成剩余操作。无需再次使用网页刷写器（除非固件更新明确要求）。

**充电时设备会变热。**

遗憾的是，硬件设计并非最佳。建议使用功率尽可能弱的电源，最大输出电流为 1A。

**可以从设备中取出电池吗？**

是的，可以。但是，由于前面板是用胶水粘住的，所以需要用热风枪打开设备。你还需要一个[降压转换器焊接](https://github.com/Blueforcer/awtrix3/issues/67#issuecomment-1595418765)才能让一切正常工作。

**我可以对设备上的应用程序进行不同的排序吗？**

默认情况下，应用程序的显示顺序与实例设置中的配置顺序相同。只需上下拖动应用程序即可更改其位置。包含历史数据/图表的应用程序位于其他自定义应用程序的后面。

如果您想自定义位置，可以在专家选项中启用自定义位置。然后，您可以为每个应用程序分配一个数字位置。

**可以存储不同的数字格式吗？**

所有数字类型状态（common.type `number`）的格式均按照 ioBroker 中的配置进行设置。系统默认格式可以通过专家设置覆盖（适配器版本 0.7.1 起）。数字可以采用以下格式表示：

- 系统标准
-`xx.xxx,xx`
- `xx,xxx.xx`（美国格式）
-`xxxxx,xx`
- `xxxxx.xx`（美国格式）

**可以限制对 awtrix-light 网页界面的访问吗？**

是的，从固件版本 0.82 开始，可以使用用户名和密码保护访问。从适配器版本 0.8.0 开始，这些用户凭据也可以存储在实例设置中。

**通知的保留选项如何起作用？**

使用`hold: true`选项发送通知时，文本将一直显示在屏幕上，直到通知被确认。确认操作可以通过设备上的中间按钮完成，也可以将`notification.dismiss`状态设置为`true`。

**某些状态变化不会立即显示。**

如果状态变化非常频繁（例如每秒一次），某些更改将被忽略且不会传输，以降低设备负载。为此，每个应用都有自己的“阻止时间”，可以在实例设置中进行全局配置。默认时间为 3 秒。不建议设置小于 3 秒的值。

## 在多个设备上使用相同的应用程序
如果要使用相同的应用程序控制多个 awtrix-light 设备，则必须为每个设备创建一个单独的实例。但是，在其他设备的实例设置中，可以指定应从另一个实例采用应用程序。

例子

1. 在实例“awtrix-light.0”中配置所有需要的应用程序
2. 为第二个设备创建另一个实例（`awtrix-light.1`）
3. 在 `awtrix-light.1` 的实例设置中选择 `awtrix-light.0`，以便在第二台设备上显示相同的应用

自 0.15.0 版本（及更新版本）起，自定义应用和所有专家应用内容的可见性也会转移到复制应用设置的其他设备。例如，在上面的示例中，实例 `awtrix-light.1` 中的应用在主实例 `awtrix-light.0` 中的可见性发生更改后也会被隐藏。所有专家应用内容也同样如此。

## Blockly 和 JavaScript
`sendTo` / 消息框可用于

- 显示一次性通知（包含文本、声音、图标等）
- 播放声音

### 通知
向设备发送一次性通知：

```javascript
sendTo('awtrix-light.0', 'notification', { text: 'haus-automatisierung.com', repeat: 1, stack: true, wakeup: true, hold: false }, (res) => {
    if (res && res.error) {
        console.error(res.error);
    }
});
```

消息对象支持固件中所有可用的选项。详情请参阅[文档](https://blueforcer.github.io/awtrix3/#/api?id=json-properties)。

*您还可以使用 Blockly 块来创建通知（并非所有可用选项都提供）。*

### 声音
**声音文件必须以 RTTTL 格式保存在 MELODIES 文件夹中。这些声音的文件扩展名为 .txt。播放声音时不得包含文件扩展名！**

要播放（先前创建的）声音文件`beispiel.txt`：

```javascript
sendTo('awtrix-light.0', 'sound', { sound: 'beispiel' }, (res) => {
    if (res && res.error) {
        console.error(res.error);
    }
});
```

消息对象支持固件中所有可用的选项。详情请参阅[文档](https://blueforcer.github.io/awtrix3/#/api?id=sound-playback)。

*可以使用 Blockly 块使此调用更加容易使用。*

播放您自己的铃声：

```javascript
sendTo('awtrix-light.0', 'rtttl', 'Beep: d=32,o=7,b=120: a,P,c#', (res) => {
    if (res && res.error) {
        console.error(res.error);
    }
});
```

应用程序
**应用名称只能包含小写字母 (a-z)，且必须唯一。不得包含数字、特殊字符和空格。**

以下应用程序名称由内部应用程序保留，不能使用：`Time`、`Date`、`Temperature`、`Humidity`、`Battery`。

- 随着每个应用程序的“激活”状态，它可以被带到前台
- 这些状态具有“按钮”角色，并且只允许布尔值“true”（其他值会导致日志中出现警告）

每个自定义应用都有一个 ID 为 `apps.<name>.visible` 的状态。如果此状态设置为 `false` (false)，则该应用将从设备中移除并不再显示。此功能适用于仅在一天内或特定时段显示某些应用。

### 自定义应用程序
- `%s` 是状态值的占位符
- `%u` 是状态单位的占位符（例如 `°C`）

这些占位符可用于自定义应用程序的文本（例如`Außentemperatur: %s %u`）。

**自定义应用仅显示已确认的值！带有`ack: false`的控制值将被忽略（以避免重复向设备发出请求并确保显示的值有效）！**

选定状态的数据类型应为字符串（`string`）或数字（`number`）。其他类型（例如`boolean`）也受支持，但会生成警告。建议使用带有转换函数的别名，将逻辑值替换为文本（例如`val ? 'an' : 'aus'`或`val ? 'offen' : 'geschlossen'`）。详情请参阅 ioBroker 文档。*此标准功能与适配器无关*。

以下组合会导致日志中出现警告：

- 具有选定对象 ID 的自定义应用在文本中不包含占位符“%s”
- 使用选定的对象 ID 创建自定义应用程序，在 `common.unit` 中没有单位，但文本中包含 `%u`
- 未选择任何对象 ID，但文本中使用了“%s”

### 历史应用程序/图表
待办事项

**图表中仅显示已确认的值。带有`ack: false`的对照值将被过滤并忽略！**

### 专家应用程序
自适配器版本 0.10.0 起，专家应用程序即可使用。这些应用程序允许您通过状态手动设置所有值，并使用自定义逻辑进行控制。要创建新的专家应用程序：

- 在实例设置中打开“专家选项”选项卡
- 创建一个具有可自由选择名称的新专家应用程序（例如“测试”）
- 保存实例设置

此后，应用程序`test`的所有可控状态均在`awtrix-light.0.apps.test`下创建。要更改应用程序的相应值，您只需使用自己的脚本（例如 JavaScript 或 Blockly）设置状态`icon`、`text`等的值即可。

例如：[天气应用](weather-app.md)

#### 基本对象
*需要适配器版本 2.0.0（及更新版本）*

基础对象是 Awtrix 应用的基本定义，允许设置所有现有选项。*基础对象扩展了专家应用的所有其他属性。*

例如，您想在专家应用程序上使用彩虹效果，但没有预定义的数据点可以直接使用此功能。在这种情况下，可以在基础对象（JSON 格式）中定义属性：`{ "rainbow": true }`。

请参阅[文档](https://blueforcer.github.io/awtrix3/#/api?id=custom-apps-and-notifications)了解所有可用属性。

## 隐藏本机应用程序
要隐藏设备上的默认应用（例如温度或湿度）：请使用设备本身的菜单！详情请参阅[文档](https://blueforcer.github.io/awtrix3/#/onscreen)。

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.0.0 (2025-05-02)

* (@klein0r) Added base object for expert apps to allow all options
* (@klein0r) Added responsive design for admin config

### 1.7.0 (2025-04-08)

* (@klein0r) Improved error handling when adapter is not ready (starting)
* (@klein0r) Added scroll speed to expert apps
* (@klein0r) Added icons for custom apps in object tree

### 1.6.0 (2025-01-27)

Updated recommended firmware version to 0.98

* (@klein0r) Updated dependencies

### 1.5.0 (2025-01-07)

Updated recommended firmware version to 0.97

* (@klein0r) Updated dependencies

### 1.4.1 (2024-11-20)

NodeJS >= 20.x and js-controller >= 6 is required

## License

MIT License

Copyright (c) 2025 Matthias Kleine <info@haus-automatisierung.com>

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