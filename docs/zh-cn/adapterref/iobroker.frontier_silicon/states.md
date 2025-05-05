---
chapters: {"pages":{"en/adapterref/iobroker.frontier_silicon/README.md":{"title":{"en":"FSAPI Examples"},"content":"en/adapterref/iobroker.frontier_silicon/README.md"},"en/adapterref/iobroker.frontier_silicon/states.md":{"title":{"en":"States documentation"},"content":"en/adapterref/iobroker.frontier_silicon/states.md"}}}
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.frontier_silicon/states.md
title: 国家文件
hash: y+TCc1W/jo/MrU28pP5KrkLLYgE23NfYoVB17594zAs=
---
# 状态文档
当适配器读取设备设置时，ioBroker 对象和状态会被创建。
状态可以是只读 (`ro`) 或读写 (`rw`) *ok，按钮也可以是只写*。

- 声音的

基本音频设置。尚未实现均衡器控制。

- 最大音量（`number, ro`）

最大音量可选

- 静音（`boolean，rw`）

如果设备已静音，则为 `true`；否则，为 `false`

- 音量（`number，rw`）
  - 控制
- 音量减小和音量增大

减小音量

- 设备

- friendlyName (`string, rw`)
- 功率（`boolean，rw`）
- radioId (`string, ro`)

我猜测这是设备的 MAC 地址

- 版本（`string，ro`）

软件版本

- webfsapi（`string，ro`）

API地址

- 信息

- 连接（`boolean，ro`）

适配器连接指示灯

- 媒体

- 状态（`string，ro`）

有效值为：

- 0：“空闲”
1：“缓冲”
- 2：“玩耍”
- 3：“暂停”
4：“重新缓冲”
- 5：“错误”
6：“已停止”
- 7：“ERROR_POPUP”

- 控制（`boolean，wo`）

- 0：“停止”
- 1：“播放”
- 2：“暂停”
- 3：“下一个”
- 4：“上一个”

请不要太在意以下名称。电台在不同模式下对它们的使用有所不同。

- 专辑（`string，ro`）
- 艺术家（`string，ro`）
- 图形（`string，ro`）

使用此 URL 来获取专辑封面或电台徽标。

- 名称（`string，ro`）
- 字符串（`string，ro`）
- 标题（`string，ro`）

- 模式

- readPresets（`boolean，wo`）

重新读取所有预设

- selectPreset (`number, rw`)

用于获取或选择预设。
请注意，适配器会进行猜测，因为此值无法通过 API 读取。

- 选定（`number，rw`）

指示或选择所选模式。也可以通过`modes.{number}.switchTo`选择。

- selectedLabel（`string，ro`）

指示所选模式的标签。

- `{number}`

- id (`string, ro`)

该模式的名称

- 键（`number，ro`）

该模式的索引。在对象树中等于`mode.{number}`，可以写入`modes.selected`。

- 可选（`boolean，ro`）

`true` 是否可以手动选择此模式。

- streamable（`boolean，ro`）

仅出现在支持多房间的设备上。`true` 如果此模式可用作多个多房间设备的源。

- switchTo（`boolean，wo`）

选择该模式。

- 预设

- 可用（`boolean，ro`）

指示此模式的预设是否可用

- `{number}`

该预设的索引。等于`mode.*.presets.{number}.key`。

- 键（`number，ro`）

该预设的索引。在对象树中等于`mode.*.presets.{number}`，可以写入`modes.selectPreset`。

- 名称（`string，ro`）

该预设的名称

- 召回（`boolean, wo`）

选择该预设**和**相应的模式。

请注意，有时您可以选择“按下按钮”或“设置值”。请选择对您来说更方便的方式。