---
chapters: {"pages":{"en/adapterref/iobroker.frontier_silicon/README.md":{"title":{"en":"FSAPI Examples"},"content":"en/adapterref/iobroker.frontier_silicon/README.md"},"en/adapterref/iobroker.frontier_silicon/states.md":{"title":{"en":"States documentation"},"content":"en/adapterref/iobroker.frontier_silicon/states.md"}}}
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.frontier_silicon/states.md
title: 国家文件
hash: m7GbrKvPlQzlicPjl2Smtwt6dhj8UPevPNzVmdBw5wY=
---
# 各州文件
适配器读取设备设置时，会创建 ioBroker 对象和状态。

状态可以是只读的 (`ro`) 或读写的 (`rw`) *按钮也可以是只写的*。

- 声音的

基本音频设置。尚未实现均衡器控制。

- maxVolume(`number, ro`)

可选择的最大音量

- 静音（`boolean, rw`）

`true` 如果设备已静音，`false`否则

- 容量（`number, rw`）
  - 控制
- 音量减小和音量增大

进/或减少 1 倍体积

- 设备

- friendlyName（`string, rw`）
- 功率（`boolean, rw`）
- radioId（`string, ro`）

我猜这是设备的MAC地址。

- 版本（`string, ro`）

软件版本

- webfsapi（`string, ro`）

API的地址

- 信息

- 连接（`boolean, ro`）

适配器连接指示灯

- 媒体

- 状态（`string, ro`）

有效值包括：

- 0：“空闲”
- 1：缓冲
- 2： “玩耍”
- 3：“已暂停”
- 4： “反驳”
- 5：“错误”
- 6： “停止”
- 7：“错误弹出窗口”

- 控制（`boolean, wo`）

- 0：“停止”
- 1：“播放”
- 2：“暂停”
- 3：“下一个”
- 4：“上一页”

请勿过分认真对待以下名称。收音机在不同的模式下对它们的使用方式不同。

- 专辑（`string, ro`）
- 艺术家（`string, ro`）
- graphic(`string, ro`)

使用此网址可获取专辑封面或电台标志。

- name(`string, ro`)
- string (`string, ro`)
- 标题（`字符串，ro`）

- 模式

- currentNavIndex (`number, ro`)

指示当前导航列表的索引。

完整的导航列表以 25 个项目为一组读取。

此对象的原生部分还包含当前导航的一些其他属性，例如所有导航名称、当前完整导航列表中的项目数，以及索引指向的当前项目的类型和子类型。

导航类型："0": "目录", "1": "可播放项目", "2": "搜索目录", "3": "未知", "4": "表单项目", "5": "消息项目", "6": "Amazon登录" 导航子类型："0": "无", "1": "电台", "2": "播客", "3": "曲目", "4": "文本", "5": "密码", "6": "选项", "7": "提交", "8": "按钮", "9": "禁用"

- currentNavKey（`number, rw`）

指示或设置完整导航列表中选定的键。

- currentNavList(`string, ro`)

导航列表中当前选中项的 JSON 格式字符串。

它是一个键值对数组，包含每个项的所有属性，例如：

{"key":"116","name":"1LIVE diGGi ","type":"1","subtype":"1","graphicuri":"","artist":"","contextmenu":"0"} 它可供 JavaScript 脚本使用，以动态生成 JSON 对象或 HTML 页面，供媒体播放器组件使用。

- currentNavName（`string, ro`）

导航列表中当前选定项目的名称，例如目录或可播放项目。

- navigationBack（`boolean, wo`）

在导航树中返回上一级

- navigationDown (`boolean, wo`)

在当前导航树层级内向下导航

- navigationUp（`boolean, wo`）

在当前导航树层级内向上导航

- navigationSelect（`boolean, wo`）

选择当前索引项。如果所选项是目录，则会在导航树中打开下一级。如果所选项是可播放项，则会自动开始播放。

- navigationHome（`boolean, wo`）

返回导航树的顶层

- navigationSearch（`string, rw`）

允许输入搜索词并将其发送到设备。但是，只有在按下 navigationSelect 按钮且所选项目类型为 SearchDirectory 时，设备才会开始搜索。导航搜索词应在按下 navigationSelect 按钮之前简要输入。

- presetDown (`boolean, wo`)

在当前模式的预设列表中向下滚动。下一个电台或曲目将自动播放。

- presetUp（`boolean, wo`）

在当前模式的预设选项中向上导航。下一个电台或曲目将自动开始播放。

- readPresets(`boolean, wo`)

重新读取所有预设

- selectPreset(`number, rw`)

用于获取或选择预设值。

请注意，适配器会进行猜测，因为无法从 API 读取此值。

- 已选择（`number, rw`）

指示或选择所选模式。也可以通过 `modes.{number}.switchTo` 选择。

- selectedLabel(`string, ro`)

指示所选模式的标签。

- `{number}`

- id（`string, ro`）

该模式的名称

- key(`number, ro`)

该模式的索引。等于对象树中的 `mode.{number}`，可以写入 `modes.selected`。

- selectable（`boolean, ro`）

`true` 如果可以手动选择此模式。

- streamable（`boolean, ro`）

仅在支持多房间功能的设备上显示。`true` 如果此模式可用作多个多房间设备的音源。

- switchTo(`boolean, wo`)

选择该模式。

- 预设

- 可用（`boolean, ro`）

指示此模式是否有预设值可用

- `{number}`

该预设的索引。等于 `mode.*.presets.{number}.key`。

- key(`number, ro`)

该预设的索引。等于对象树中的 `mode.*.presets.{number}`，可以写入 `modes.selectPreset`。

- name(`string, ro`)

该预设的名称

- 召回（`boolean, wo`）

选择该预设**以及**相应的模式。

- 设置（`boolean, wo`）

将该预设设置为当前正在播放的电台或曲目。如果您尝试在播放其他模式的电台时设置模式 X 的预设，则会收到警告。