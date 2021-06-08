---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/dev/adddevice.md
title: 如何将设备添加到 alexa 或 google home
hash: 7LOEqf58Vo+Ne7CyV77jozHsy8UjnC7Ghl8TQAR8aD0=
---
# 如何将设备添加到alexa或google home
要添加设备，我们有 4 个步骤：

- 如果需要，使用所需的新角色扩展状态角色。
- 使用新设备扩展类型检测器
- 将设备添加到 iobroker.devices 以使其可以模拟。
- 将设备添加到 alexa/google 和 co

##新角色
我们有 3 个（甚至更多）来源，必须在添加新设备之前检查这些来源：

- Alexa 智能家居 API：https://developer.amazon.com/de-DE/docs/alexa/device-apis/alexa-brightnesscontroller.html
- Yandex API：https://yandex.ru/dev/dialogs/alice/doc/smart-home/concepts/device-types-docpage/
- 谷歌 API：https://developers.google.com/assistant/smarthome/guides

此外，检查某些适配器中的现有设备可能很有用。

我们以空调为例。我们有：

- https://yandex.ru/dev/dialogs/alice/doc/smart-home/concepts/device-type-thermostat-ac-docpage/
- https://developer.amazon.com/de-DE/docs/alexa/device-apis/alexa-thermostatcontroller.html
- https://developers.google.com/assistant/smarthome/guides/aircooler

Yandex 拥有各州的最全貌，因此将其作为基础是合理的。
我们可以看到，对于恒温器模式和摆动位置，文档中没有任何角色。

所以我们会在这里添加它：https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/stateroles.md#air-condition-or-thermostat

所有其他状态（功率、设定温度）都存在。

## 类型检测器
添加所有必需的角色后，必须扩展类型检测器。
将新的设备类型添加到全局列表：https://github.com/ioBroker/ioBroker.type-detector/blob/master/index.js#L29 以一些设备为基础并将其复制到 `patterns` 的`ChannelDetector` 类。
类型检测器必须以某种方式区分设备，因此您的设备必须具有唯一的角色集。
我们将 `level.temperature` 和 `level.mode.thermostat` 作为空调的特定模式，并将这两个状态标记为 `required`。
大多数复杂的设备必须在列表的顶部，因此它们将首先被检测到，最后会出现越来越多的简单设备。

您必须创建新版本的 `iobroker.type-detector` npm 包。

 ## iobroker.devices
转到 https://github.com/ioBroker/ioBroker.devices/blob/master/src/package.json 并在那里更新您的版本。
之后扩展图标的列表：https://github.com/ioBroker/ioBroker.devices/blob/master/src/src/Components/TypeIcon.js

 并创建一个新版本。