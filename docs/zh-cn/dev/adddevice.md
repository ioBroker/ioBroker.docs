---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/dev/adddevice.md
title: 如何将设备添加到 Alexa 或 Google Home
hash: KJyj2QNgNPa29Jr/BcB/QJi6yPa8ucW5nGzTU+4Hr+A=
---
# 如何将设备添加到 Alexa 或 Google Home
要添加设备，我们有 4 个步骤：

- 如果需要，扩展国家角色并加入所需的新角色。
- 使用新设备扩展类型检测器
- 将设备添加到 iobroker.devices 以便可以模拟它。
- 将设备添加到 alexa/google 等

新角色
我们有 3 个（甚至更多）来源，在添加新设备之前必须进行检查：

- Alexa 智能家居 API：https://developer.amazon.com/de-DE/docs/alexa/device-apis/alexa-brightnesscontroller.html
- Yandex API：https://yandex.ru/dev/dialogs/alice/doc/smart-home/concepts/device-types-docpage/
- 谷歌 API：https://developers.google.com/assistant/smarthome/guides

此外，检查某些适配器中的现有设备也可能很有用。

以空调为例。我们有：

- https://yandex.ru/dev/dialogs/alice/doc/smart-home/concepts/device-type-thermostat-ac-docpage/
- https://developer.amazon.com/de-DE/docs/alexa/device-apis/alexa-thermostatcontroller.html
- https://developers.google.com/assistant/smarthome/guides/aircooler

Yandex 拥有最全面的州信息，因此将其作为依据是合理的。
我们可以看到，对于恒温器模式和摆动位置，文档中没有角色。

因此我们将它添加到这里：https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/stateroles.md#air-condition-or-thermostat

所有其他状态（电源、设定温度）均存在。

## 类型检测器
添加或找到所有必需的角色后，必须扩展类型检测器。
将新设备类型添加到全局列表：https://github.com/ioBroker/ioBroker.type-detector/blob/master/index.js#L29 以某个设备为基础，将其复制到`ChannelDetector`类的`patterns`中。
类型检测器必须以某种方式区分设备，因此您的设备必须具有一组独特的角色。
我们将`level.temperature`和`level.mode.thermostat`作为空调的特定模式，并将这两个状态标记为`required`。
最复杂的设备必须位于列表的顶部，因此它们将首先被检测到，最后会出现越来越多的简单设备。

您必须创建 `iobroker.type-detector` npm 包的新版本。

## Iobroker.设备
转到 https://github.com/ioBroker/ioBroker.devices/blob/master/src/package.json 并在那里更新您的版本。
之后扩展图标列表：https://github.com/ioBroker/ioBroker.devices/blob/master/src/src/Components/TypeIcon.js

并创建一个新版本。