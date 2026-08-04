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
hash: NExEYBGFM5k1VqLSHFysT9KH9uzmzXr3VAUAQa8Zf2E=
---
![标识](../../../de/admin/awtrix-light.png)

# IoBroker.awtrix-light
＃＃ 要求
- nodejs 22（或更高版本）
- js-controller 6.0.11（或更高版本）
- 管理适配器 7.6.20（或更高版本）
- 固件版本为 0.98（或更高版本）的 Awtrix 3 设备 - 例如 Ulanzi TC001

点击这里购买：[Aliexpress.com](https://haus-auto.com/p/ali/UlanziTC001) 或此处：[ulanzi.de](ulanzi.de)](https://haus-auto.com/p/ula/UlanziTC001)（联盟链接）

## 第一步
1. 将固件刷入设备并通过 Wi-Fi 将其添加到本地网络 - 请参阅[文档](https://blueforcer.github.io/awtrix3/#/quickstart)
2. 在 ioBroker 中安装 awtrix-light 适配器（并创建一个新实例）
3. 打开实例配置，输入本地网络上设备的 IP 地址。

## 常见问题解答
我可以使用适配器禁用默认应用程序（例如电池电量或传感器数据）吗？

不，此功能已从 awtrix-light 固件中移除。请使用设备本身的菜单永久隐藏这些应用。

逻辑值（真/假）可以替换成其他文本吗？

为此，只需在 `alias.0` 中创建一个类型为 `string`（字符串）的别名，并使用读取函数将逻辑值转换为任何其他值（例如，`val ? 'offen' : 'geschlossen'`）。*这是 ioBroker 的标准功能，与此适配器没有直接关系。*

如何升级到最新固件版本？

只需使用 [设备上的菜单](https://blueforcer.github.io/awtrix3/#/onscreen) 导航至点 `update` 即可。手表会自动处理剩余步骤。无需再次使用网络刷机工具（除非固件更新明确要求）。

设备充电时会发热。

遗憾的是，硬件设计并非最佳。建议使用功率尽可能小的电源，即最大输出电流为 1A 的电源。

**设备中的电池可以取出吗？**

是的，这可以做到。但是，由于前窗被胶水粘住了，所以必须用热风枪打开设备。此外，还需要一个[[焊接降压转换器](https://github.com/Blueforcer/awtrix3/issues/67#issuecomment-1595418765)]才能使一切正常工作。

是否可以重新排列设备上的应用程序？

默认情况下，应用会按照实例设置中的配置顺序显示。只需拖放应用即可更改其位置。包含历史数据/图表的应用会显示在其他自定义应用的后面。

要定义自定义位置，可以在专家选项中启用用户自定义位置功能。之后，即可为每个应用分配一个数字位置。

可以使用其他数字格式吗？

所有类型为数字的状态（common.type `number`）均按照 ioBroker 中的配置进行格式化。系统默认格式可通过专家设置进行覆盖（自适配器版本 0.7.1 起）。数字可以采用以下格式表示：

- 系统标准
- `xx.xxx,xx`
- `xx,xxx.xx`（美国格式）
- `xxxxx,xx`
- `xxxxx.xx`（美国格式）

是否可以限制对 awtrix-light 网页界面的访问？

是的，自固件版本 0.82 起，可以使用用户名和密码保护访问权限。自适配器版本 0.8.0 起，这些用户数据也可以存储在实例设置中。

**通知的按住功能是如何运作的？**

当发送带有选项 `hold: true` 的通知时，文本将一直显示在屏幕上，直到收到确认通知为止。确认通知可以通过设备上的中间按钮完成，也可以通过将状态从 `notification.dismiss` 更改为 `true` 来完成。

**某些状态变更不会立即显示。**

如果状态变化非常频繁（例如每秒一次），为了最大限度地减少设备负载，部分变化将被忽略而不进行传输。每个应用都有自己的“阻塞时间”来实现此目的，该时间可在实例设置中进行全局配置。默认值为 3 秒。不建议将值设置为小于 3 秒。

## 多台设备上的相同应用
如果要使用相同的应用程序控制多个 awtrix-light 设备，**必须为每个设备创建一个单独的实例。** 但是，在其他设备的实例设置中，可以指定应用程序应来自不同的实例。

例子

1. 在实例 `awtrix-light.0` 中配置所有所需的应用程序
2. 为第二个设备创建另一个实例（`awtrix-light.1`）
3. 在 `awtrix-light.1` 的实例设置中选择 `awtrix-light.0`，以便在第二个设备上显示相同的应用程序。

自 0.15.0 版本（及更高版本）起，自定义应用和专家应用的所有内容的可见性也会同步到复制应用设置的其他设备。例如，在上述示例中，一旦主实例 `awtrix-light.0` 中应用的可见性发生更改，实例 `awtrix-light.1` 中的应用也会被隐藏。专家应用的所有内容同样适用。

## Blockly 和 JavaScript
`sendTo` / 消息框可用于

- 显示一次性通知（包含文字、声音、符号等）
播放声音

### 通知
向设备发送一次性通知：

```javascript
sendTo('awtrix-light.0', 'notification', { text: 'haus-automatisierung.com', repeat: 1, stack: true, wakeup: true, hold: false }, (res) => {
    if (res && res.error) {
        console.error(res.error);
    }
});
```

消息对象支持固件中提供的所有选项。详情请参见[文档](https://blueforcer.github.io/awtrix3/#/api?id=json-properties)。

*或者，也可以使用 Blockly 模块创建通知（但并非所有可用选项都包含在 Blockly 模块中）。*

### 色调
**音频文件必须为 RTTTL 格式，并放置在 MELODIES 文件夹中。这些音频文件的扩展名为 .txt。播放音频时请勿包含文件扩展名！**

要播放（先前创建的）音频文件 `beispiel.txt`：

```javascript
sendTo('awtrix-light.0', 'sound', { sound: 'beispiel' }, (res) => {
    if (res && res.error) {
        console.error(res.error);
    }
});
```

消息对象支持固件中提供的所有选项。详情请参见[文档](https://blueforcer.github.io/awtrix3/#/api?id=sound-playback)。

*可以使用 Blockly 代码块来简化此调用。*

播放您自己的铃声：

```javascript
sendTo('awtrix-light.0', 'rtttl', 'Beep: d=32,o=7,b=120: a,P,c#', (res) => {
    if (res && res.error) {
        console.error(res.error);
    }
});
```

## 应用
应用名称只能包含小写字母（a-z），且必须唯一。不能包含数字、特殊字符或空格。

以下应用程序名称为内部应用程序保留，不能使用：`Time`、`Date`、`Temperature`、`Humidity`、`Battery`。

- 任何应用程序的“激活”状态都允许将其置于前台。
- 这些状态具有“按钮”角色，并且只允许布尔值“true”（其他值会导致日志中出现警告）

每个用户创建的应用都有一个状态，其 ID 为 `apps.<name>.visible`。如果此状态设置为 `false`（false），则该应用将从设备中移除，不再显示。这对于仅在一天中的特定时间段内显示某些应用非常有用。

### 自定义应用
- `%s` 是状态值的占位符
- `%u` 是状态单位的占位符（例如 `°C`）

这些占位符可用于自定义应用程序的文本中（例如 `Außentemperatur: %s %u`）。

**自定义应用仅显示已确认的值！带有 `ack: false` 的控件值将被忽略（以避免向设备发出重复请求，并确保显示的值有效）！**

所选状态的数据类型应为字符串 `string` 或数字 `number`。其他类型（例如 `boolean`）也受支持，但会生成警告。建议使用别名和转换函数将逻辑值替换为文本（例如 `val ? 'an' : 'aus'` 或 `val ? 'offen' : 'geschlossen'`）。有关详细信息，请参阅 ioBroker 文档。*此标准功能与适配器无关。*

以下组合会在日志中产生警告：

- 具有选定对象 ID 的自定义应用程序的文本中不包含占位符 `%s`。
- 创建的自定义应用程序具有选定的对象 ID，但 `common.unit` 中没有单位，但文本中包含 `%u`。
- 未选择对象 ID，但在文本中使用了 `%s`。

### 历史应用/图表
待办事项

**图表中仅显示已确认的值。带有“`ack: false`”的税值已被过滤并忽略！**

### 专业应用
专家应用功能自适配器版本 0.10.0 起可用。这些应用允许您通过状态手动设置所有值，并使用您自己的逻辑进行控制。要创建新的专家应用：

- 打开实例设置中的“专家选项”选项卡。
- 创建一个名为“test”的新专家应用（例如：`test`）。
- 保存实例设置

之后，应用程序`test`的所有可控状态都将在`awtrix-light.0.apps.test`下创建。要更改应用程序的相应值，可以使用自定义脚本（例如，JavaScript或Blockly）简单地设置状态`icon`、`text`等的值。

示例：[天气应用](weather-app.md)

#### 基本对象
*需要适配器版本 2.0.0（及更高版本）*

基础对象是 Awtrix 应用的基本定义，用于设置所有现有选项。*基础对象会扩展专家应用的所有其他属性。*

例如：您想在专家应用程序中使用彩虹效果，但没有预定义的数据点可直接使用此功能。在这种情况下，可以在基础对象（JSON 格式）中定义该属性：`{ "rainbow": true }`。

有关所有可用属性，请参阅 [文档](https://blueforcer.github.io/awtrix3/#/api?id=custom-apps-and-notifications)。

## 隐藏原生应用
要隐藏设备上的默认应用程序（例如温度或湿度）：请使用设备本身的菜单！有关详细信息，请参阅 [文档](https://blueforcer.github.io/awtrix3/#/onscreen)。

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 4.0.0 (2026-07-30)

* (@Brainbug01) Added option/setting for global overlay
* (copilot) Adapter requires node.js >= 22 now
* (@klein0r) admin 7.6.20 and js-controller 6.0.11 (or later) are required
* (@klein0r) Acknowledge new values of buttons (for admin ui)
* (@klein0r) Fixed state object role definitions

### 3.0.0 (2025-10-21)

* (@klein0r) admin 7.6.17 and js-controller 6.0.11 (or later) are required

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

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 Matthias Kleine <info@haus-automatisierung.com>

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