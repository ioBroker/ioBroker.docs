---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.scenes/README.md
title: ioBroker 场景适配器
hash: FR+CyK5Winwdr8oIsq6WZoOBdSghf+pQvTJGhAHNMXE=
---
![标识](../../../en/adapterref/iobroker.scenes/admin/scenes.png)

![安装数量](http://iobroker.live/badges/scenes-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.scenes.svg)
![下载](https://img.shields.io/npm/dm/iobroker.scenes.svg)

# IoBroker 场景适配器
![测试与发布](https://github.com/ioBroker/ioBroker.scenes/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/scenes/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

_scenes Adapter_可以创建场景并在ioBroker环境中执行它们。

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用 Sentry 报告。

该适配器可以创建三种类型的场景：

-**场景**
-**群组**
- **虚拟团体**

场景
如果未使用“set on false”设置，则会创建**场景**。
每个场景都可以单独配置，因此您可以在一个适配器实例中拥有**场景**和**组**。
**场景**只是状态 ID 和值的列表，这些状态必须通过激活场景才能拥有。例如，我们在场景`scene.allLightInBath`上创建了：

```
  scene.allLightInBath
  |- hm-rpc.0.BOTTOM_LIGHT.STATE  - true
  +- hm-rpc.0.TOP_LIGHT.STATE     - true
```

要激活场景，我们必须将`scene.allLightInBath` 设置为 true（例如，通过脚本或 vis）。然后两个状态都将设置为所需值，即 `true`。
`scene.allLightInBath` 的值也将是 `true`。如果我们手动切换到顶部灯光，`scene.allLightInBath` 的值将变为 `false`。
如果我们手动打开灯光，则再次变为 `true`。

让我们将风扇添加到**场景**中：

```
  scene.allLightInBath
  |- hm-rpc.0.BOTTOM_LIGHT.STATE  - true
  |- hm-rpc.0.TOP_LIGHT.STATE     - true
  |- hm-rpc.0.FAN.STATE          - true
  |- hm-rpc.0.FAN.STATE          - false (delay 60000ms)
```

在这种情况下，风扇将在**场景**激活时打开，并在一分钟内关闭。
风扇关闭后，`scene.allLightInBath`的值将变为`false`，因为并非所有状态都等于期望值。
有延迟的状态不参与计算。

您可以使用“播放”按钮测试场景。
此外，您可以将此**场景**直接与其他场景 ID 关联。例如，如果门上有传感器，您可以选择它作为触发器：

```
  trigger
    id:        hm-rpc.0.DOOR_SENSOR.STATE
    condition: ==
    value:     true
```

每次打开浴室的门时，所有带风扇的灯都会亮。

## 群组
**组** 就像虚拟通道。您可以借助**组**从多个执行器创建虚拟设备，并像一个设备一样一起控制它们。
让我们用浴缸的灯光修改我们的示例。

```
  scene.allLightInBath             "set on true"    "set on false"
  |- hm-rpc.0.BOTTOM_LIGHT.STATE  - true             false
  +- hm-rpc.0.TOP_LIGHT.STATE     - true             false
```

如果您将此**组**与门传感器链接起来，例如：

```
  trigger on true
    id:        hm-rpc.0.DOOR_SENSOR.STATE
    condition: ==
    value:     true

  trigger on false
    id:        hm-rpc.0.DOOR_SENSOR.STATE
    condition: ==
    value:     false
```

每次打开门，浴室里的所有灯都会亮起。`scene.allLightInBath` 的值将变为 **true**。
如果您关上门，灯就会熄灭，`scene.allLightInBath` 的值将变为 **false**。

虽然没什么用，但是作为例子还是不错的。

如果您手动打开一盏灯，`scene.allLightInBath` 的值将变为**不确定**。

延迟也可以在**组**中使用，但具有延迟的状态不参与**组**当前值的计算。

## 虚拟群组
**虚拟组** 类似于虚拟通道和组，但可以具有任何类型的值：数字、字符串等。
您可以创建一个虚拟组来控制客厅中的所有百叶窗。
通过将 40% 写入虚拟组，所有百叶窗都将设置为 40%。

此外，如果组中并非所有状态都具有相同的值，则可以定义应为该组采用哪个值的行为。

您可以提供以下聚合（仅在高级模式下可用）：

- `不确定`-（默认）- 该组的值将包含文本`不确定`。
- `any` - 组中所有状态的第一个非零值。
- `min` – 一组中所有状态的最小值。
- `max` – 一组中所有状态的最大值。
- `avg` - 一组中所有状态的平均值。

## 将实际状态保存为场景
为了保存某些场景的实际状态，您可以向适配器发送一条消息：

```
sendTo(
    'scenes.0',
    'save',
    {sceneId:
        'scene.0.SCENE_ID', // scene ID
        isForTrue: true     // true if actual values must be saved for `true` state and `false` if for false
    },
    result => result.err && console.error(result.error) // optional
);
```

适配器将读取此场景中定义的所有 ID 的实际值并将其保存为配置值。

## 通过消息禁用或启用场景 要禁用或启用某些场景，您可以向适配器发送消息：
```
// enable
sendTo(
    'scenes.0',
    'enable',
    'scene.0.SCENE_ID',
    result => result.err && console.error(result.error) // optional
);
// disable
sendTo(
    'scenes.0',
    'disable',
    'scene.0.SCENE_ID',
    result => result.err && console.error(result.error) // optional
);
// or
sendTo(
    'scenes.0',
    'disable', // 'enable' to enable
    {sceneId: 'scene.0.SCENE_ID'},
    result => result.err && console.error(result.error) // optional
);
```

<!-- 下一版本的占位符（在行首）：

### **正在进行中** -->

## Changelog
### 3.2.3 (2024-08-26)
* (bluefox) Packages updated

### 3.2.1 (2024-06-21)
* (bluefox) GUI migrated for the new `adapter-react` library

### 3.1.1 (2024-06-21)
* (bluefox) Packages updated
* (bluefox) Prepared for js-controller 6

### 3.0.4 (2024-04-27)
* (bluefox) Corrected error if profile is empty

### 3.0.3 (2024-02-25)
* (bluefox) Saving of the scene states from GUI was implemented

### 3.0.1 (2024-02-16)
* (bluefox) Cleared cron tasks by re-init
* (bluefox) CRON Editor dialog added
* (bluefox) Implemented scene enabling/disabling via messages
* (bluefox) Implemented the writing of the scene states with ack=true
* (bluefox) Added description to the scene states
* (bluefox) Added possibility to use categories/enumerations

### 2.4.2 (2024-02-12)
* (bluefox) Preserved empty folders by renaming and moving of scenes

### 2.4.0 (2022-12-23)
* (Apollon77) prevent a crash case reported by Sentry
* (bluefox) Updated some GUI libraries

### 2.3.9 (2022-02-13)
* (bluefox) Updated some GUI libraries
* (bluefox) Updated releaser

### 2.3.8 (2021-08-31)
* (Apollon77) Handles a case where states are not set but used as value (Sentry IOBROKER-SCENES-13)
* (TyrionWarMage) Added the aggregation mode for the virtual groups.
* (bluefox) Sentry data will not be sent in front-end if the diagnostic or sentry is disabled

### 2.3.6 (2021-01-22)
* (Apollon77) Check state id before getting value (Sentry IOBROKER-SCENES-F)

### 2.3.5 (2021-01-22)
* (Apollon77) Add error logging if invalid ids are configured for scenes (Sentry IOBROKER-SCENES-Y)

### 2.3.4 (2021-01-16)
* (Apollon77) Prevent a crash case (Sentry IOBROKER-SCENES-X, IOBROKER-SCENES-V)

### 2.3.3 (2020-12-06)
* (bluefox) Implemented drag&drop for the reorder of scenes in folders
* (bluefox) Implemented Easy mode
* (bluefox) Possibility to use set point from another state

### 2.3.1 (2020-11-06)
* (Apollon77) Prevent a crash case (Sentry IOBROKER-SCENES-M)

### 2.3.0 (2020-11-02)
* (bluefox) Fixed GUI errors

### 2.1.7 (2020-10-30)
* (Apollon77) Prevent a crash case (Sentry IOBROKER-SCENES-E, IOBROKER-SCENES-G, IOBROKER-SCENES-A)

### 2.1.6 (2020-09-25)
* (bluefox) Updated the select ID dialog.

### 2.1.3 (2020-09-18)
* (Apollon77) Prevent crash cases (Sentry IOBROKER-SCENES-B, IOBROKER-SCENES-8, IOBROKER-SCENES-D)

### 2.1.2 (2020-07-08)
* (bluefox) Interval between states was corrected

### 2.0.17 (2020-06-29)
* (bluefox) GUI error corrected

### 2.0.13 (2020-06-27)
* (bluefox) Mobile view added

### 2.0.12 (2020-06-26)
* (bluefox) GUI error corrected

### 2.0.10 (2020-06-20)
* (bluefox) Added "Do not overwrite state if it has the required value" option

### 2.0.9 (2020-06-17)
* (bluefox) The colors are corrected

### 2.0.8 (2020-06-16)
* (bluefox) The tolerance is implemented

### 2.0.3 (2020-06-14)
* (bluefox) New GUI based on React

### 1.1.1 (2019-05-26)
* (bluefox) Added storing of actual values in a scene via a message

### 1.1.0 (2018-04-24)
* (bluefox) Works now with Admin3

### 1.0.2 (2018-01-21)
* (bluefox) use new select ID dialog
* (DeepCoreSystem) translations
* (paul53) text fixes

### 1.0.0 (2017-11-11)
* (bluefox) fix false scenes

### 0.2.7 (2017-08-14)
* (bluefox) Support of iobroker.pro

### 0.2.6 (2016-06-21)
* (bluefox) add read/write settings to scene object

### 0.2.5 (2016-02-03)
* (bluefox) update node-schedule

### 0.2.4 (2016-01-24)
* (bluefox) fix error disabled states in a scene

### 0.2.3 (2015-12-10)
* (bluefox) fix error with trigger on false

### 0.2.2 (2015-11-22)
* (bluefox) fix error with restart adapter

### 0.2.1 (2015-10-27)
* (bluefox) delete triggers if virtual groups enabled

### 0.2.0 (2015-10-27)
* (bluefox) support of virtual groups

### 0.1.3 (2015-09-19)
* (bluefox) show set value if 0 or false in settings

### 0.1.2 (2015-08-15)
* (bluefox) add translations
* (bluefox) try to fix error by renaming

### 0.1.1 (2015-08-10)
* (bluefox) allow description for states in a scene
* (bluefox) check by rename if the scene with the same name yet exists
* (bluefox) allowed a coping of a scene
* (bluefox) fix error with delay and stopAllDelays settings

### 0.1.0 (2015-08-09)
* (bluefox) fix error with delays and config change
* (bluefox) implement replace

### 0.0.2 (2015-08-05)
* (bluefox) change configuration schema
* (bluefox) add cron
* (bluefox) add a burst interval

### 0.0.1 (2015-07-29)
* (bluefox) initial commit

## License
The MIT License (MIT)

Copyright (c) 2015-2024, Bluefox (dogafox@gmail.com)

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