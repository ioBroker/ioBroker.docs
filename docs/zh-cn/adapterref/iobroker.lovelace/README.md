---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.lovelace/README.md
title: ioBroker.lovelace
hash: jauHsiL93iAoVR1jApfIbb+5knn1hL0iz07N5kwQSxY=
---
![标识](../../../en/adapterref/iobroker.lovelace/admin/lovelace.png)

![安装数量](http://iobroker.live/badges/lovelace-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.lovelace.svg)
![下载](https://img.shields.io/npm/dm/iobroker.lovelace.svg)

# IoBroker.lovelace
![测试与发布](https://github.com/ioBroker/iobroker.lovelace/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/lovelace/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

## IoBroker 的 lovelace 适配器
借助此适配器，您可以使用 Home Assistant Lovelace UI 为 ioBroker 构建可视化。

[德语文献](docs/de/README.md)

## 实例对象
在文件夹实例中，有一些可用于控制 UI 的对象。对于每个浏览器，都会使用随机 ID 创建一个新的子文件夹。该 ID 存储在客户端浏览器的 Web 存储中。如果删除网络存储，将创建一个新实例。如果您使用全信息亭浏览器，请确保功能`Delete webstorage on reload`被**禁用**。

此功能使用 browser_mod，它由适配器安装和更新。不要将您自己的 browser_mod 版本添加为自定义卡。

＃＃ 配置
有两种方法可以配置实体：

- 汽车
- 手动的

＃＃＃ 汽车
在自动模式下，将应用类似的过程，如`google home` 或`material adapter`。

***仅检测定义了 `function` 和 `room` 类别的对象和通道***

您可以定义友好名称，这将在实体中使用。

＃＃＃ 手动的
可以在对象树（如 sql 或 histroy）中手动定义对象。必须提供实体的类型以及对象的名称（可选）。
使用此方法只能创建简单的实体，例如 input_number、input_text 或 input_boolean。它可能没有超过一种状态或属性。

## 面板
### 报警面板
ioBroker尚不支持这样的设备，但可以模拟。如果您创建这样的脚本：

```
createState(
    'alarmSimple',
    false,
    false,
    {
        "name": "alarmSimple",
        "role": "alarm",
        "type": "boolean",
        "read": true,
        "write": true,
        "desc": "Arm or disarm with code",
        "def": false,
        "custom": {
            "lovelace.0": {
                "enabled": true,
                "entity": "alarm_control_panel",
                "name": "simulateAlarm" // this is a name how the entity will be called. In this case "alarm_control_panel.simulateAlarm"
            }
        }
    },
    {
        "alarm_code": 1234 // this is a alarm code, that must be entered
    },
    function () {
        // react on changes
        on({id: 'javascript.' + instance + '.alarmSimple', change: 'any'}, function (obj) {
            console.log('Control here the real device: ' + obj.state.val);
        });
    }
);
```

或者您只需使用 `lovelace.X.control.alarm (entity_id = alarm_control_panel.defaultAlarm)` 即可。

### 数字输入
如果选择自定义对话框中的 input_number 实体类型，则可以手动完成此操作。
可以添加此类型在 `common` 中所需的 `min` 和 `max` 值以及可选的 `step`。
如果您想看到向上和向下箭头，您应该在自定义`mode`中设置为“number”：

```
common: {
    custom: {
        "lovelace.0": {
            "enabled": true,
            "entity": "input_number",
            "name": "Shutter" // this is a name how the entity will be called. In this case "alarm_control_panel.simulateAlarm"
            "mode": "number", // default presentation is slider
        }
    }
}
```

### 选择输入
如果选择自定义对话框中的`input_select`实体类型，则可以手动完成此操作。
应在标准`common.states`对象中提供可供选择的选项列表：

```
"common": {
    "type": "string",
    "states": {
      "1": "select 1",
      "2": "Select 2",
      "3": "select 3"
    },
    "custom": {
      "lovelace.0": {
        "enabled": true,
        "entity": "input_text",
        "name": "test_input_select"
      }
    }
```

换句话说，IoB中也应该有选择输入。

### 计时器
定时器可以通过以下脚本来模拟：

```
createState(
    'timerSimple',
    false,
    false,
    {
        "name": "timerSimple",
        "role": "level.timer",
        "type": "number",
        "read": true,
        "write": true,
        "unit": "sec",
        "desc": "Start/Stop Timer",
        "def": 0,
        "custom": {
            "lovelace.0": {
                "enabled": true,
                "entity": "timer",
                "name": "simulateTimer" // this is a name how the entity will be called. In this case "timer.simulateTimer"
            }
        }
    },
    {
        "alarm_code": 1234 // this is a alarm code, that must be entered
    },
    function () {
        let interval;
        let id = 'javascript.' + instance + '.timerSimple';
        // react on changes
        on({id, change: 'any'}, function (obj) {
            // If command
            if (!obj.state.ack) {
                // If start or pause timer
                if (obj.state.val) {
                    // If pause (the same value was written)
                    if (obj.state.val === obj.oldState.val) {
                        if (interval) {
                            setState(id, state.val, true);
                            clearInterval(interval);
                            interval = null;
                        } else {
                            interval = setInterval(() => {
                                getState(id, (err, state) => {
                                    state.val--;
                                    if (state.val <= 0) {
                                        clearInterval(interval);
                                        interval = null;
                                        state.val = 0;
                                    }
                                    setState(id, state.val, true);
                                });
                            }, 1000);
                        }
                    } else {
                        interval && clearInterval(interval);
                        // update value every second
                        interval = setInterval(() => {
                            getState(id, (err, state) => {
                                state.val--;
                                if (state.val <= 0) {
                                    clearInterval(interval);
                                    interval = null;
                                    state.val = 0;
                                }
                                setState(id, state.val, true);
                            });
                        }, 1000);
                    }
                } else {
                    // stop interval
                    interval && clearInterval(interval);
                    interval = null;
                }
            }
        });
        // test timer. Disable it later
        setTimeout(() => setState(id, 20));
    }
);
```

＃＃＃ 天气
使用`yr`和`daswetter`进行测试。以下一个或多个对象必须将 `Function=Weather` 和 `Room=Any` 设置为在配置中可用：

- `daswetter.0.NextDays.Location_1`
- `yr.0.预测`

使用 `AccuWeather` 驱动程序 v1.1.0 https://github.com/iobroker-community-adapters/ioBroker.accuweather 进行测试。
创建自定义 Lovelace 卡以支持 Accuweather 天气预报 - https://github.com/algar42/IoB.lovelace.accuweather-card

＃＃＃ 购物清单
购物清单将值写入以下形式：

```
[
   {"summary": "Task 1", "uid": "1234222", "status": "needs_action"},
   {"summary": "Task 2", "uid": "1234223", "status": "completed"}
]
```

进入`lovelace.X.control.shopping_list`状态。

您还可以通过创建类型为`todo`的手动实体来添加自己的待办事项或购物清单。

＃＃＃ 地图
这些对象必须如下所示：

```
createState('location', '39.5681295;2.6432632', false, {
    "name": "location",
    "role": "value.gps",
    "type": "string",
    "read": true,
    "write": false,
    "desc": "Gps Coordinates"
});
```

或这两个对象：

```
createState('location.longitude', 2.6432632, false, {
    "name": "location longitude",
    "role": "value.gps.longitude",
    "type": "number",
    "read": true,
    "write": false,
    "desc": "Gps Coordinates"
});
createState('location.latitude', 39.5681295, false, {
    "name": "location latitude",
    "role": "value.gps.latitude",
    "type": "number",
    "read": true,
    "write": false,
    "desc": "Gps Coordinates"
});
```

### 图片实体
您可以使用静态图片或使用任何提供 URL 作为状态的状态。
例如。：

```
{
  "_id": "daswetter.0.NextDays.Location_1.Day_1.iconURL",
  "type": "state",
  "common": {
    "name": "Weather icon URL",
    "type": "string",
    "role": "weather.icon.forecast.0",
    "read": true,
    "write": false
  },
  "native": {}
}
```

或者只是手动将实体类型设置为 `camera` 并将 URL 写入其中。

### 降价
您可以在 Markdown 中使用绑定，如 [iobroker.vis](https://github.com/ioBroker/ioBroker.vis#bindings-of-objects) 中所示。

例如，文本 `Admin adapter is {a:system.adapter.admin.0.alive;a === true || a === 'true' ? ' ' : 'not '} *alive*.` 将在 Markdown 面板中生成文本 `Admin adapter is alive`。

## 自定义卡
### 上传自定义卡片
要上传自定义卡，请写入以下内容：

```iobroker file write PATH_TO_FILE\bignumber-card.js /lovelace.0/cards/```

重新启动lovelace适配器后，它将自动包含`cards`目录中的所有文件。

以下自定义卡可以成功测试：

- `bignumber-card`：https://github.com/custom-cards/bignumber-card/blob/master/bignumber-card.js
- `simple-thermostat`：https://github.com/nervetattoo/simple-thermostat/releases（采用最新版本）
- `thermostat`：https://github.com/ciotlosm/custom-lovelace/tree/master/thermostat-card（.js 和 .lib.js 文件都是必需的）

我发现此链接 https://github.com/jimz011/homeassistant 作为自定义卡片的有趣资源。

通常，自定义卡作为源存储在 GitHub 上，并且必须在使用前进行编译。
您应该检查 GitHub 上的 `Releases` 菜单并尝试在那里找到已编译的文件。
像这样：[https://github.com/kalkih/mini-graph-card/releases](https://github.com/kalkih/mini-graph-card/releases)（查找文件`mini-graph-card-bundle.js`）

## 自己的图像
自定义图像（例如，用于背景）可以通过与自定义卡相同的配置对话框加载。并像这样使用它：

`background: center / cover no-repeat url("/cards/background.jpg") fixed`

或者

`background: center / cover no-repeat url("/local/custom_ui/background.jpg") fixed`

在lovelace配置文件中。阅读有关lovelace [这里](https://www.home-assistant.io/lovelace/views/#background)的背景的更多信息。

## 主题
主题可以在 ioBroker 的配置对话框中定义。
粘贴类似的内容：

```
midnight:
  # Main colors
  primary-color: '#5294E2'                                                        # Header
  accent-color: '#E45E65'                                                         # Accent color
  dark-primary-color: 'var(--accent-color)'                                       # Hyperlinks
  light-primary-color: 'var(--accent-color)'                                      # Horizontal line in about

  # Text colors
  primary-text-color: '#FFFFFF'                                                   # Primary text colour, here is referencing dark-primary-color
  text-primary-color: 'var(--primary-text-color)'                                 # Primary text colour
  secondary-text-color: '#5294E2'                                                 # For secondary titles in more info boxes etc.
  disabled-text-color: '#7F848E'                                                  # Disabled text colour
  label-badge-border-color: 'green'                                               # Label badge border, just a reference value

  # Background colors
  primary-background-color: '#383C45'                                             # Settings background
  secondary-background-color: '#383C45'                                           # Main card UI background
  divider-color: 'rgba(0, 0, 0, .12)'                                             # Divider

  # Table rows
  table-row-background-color: '#353840'                                           # Table row
  table-row-alternative-background-color: '#3E424B'                               # Table row alternative

  # Nav Menu
  paper-listbox-color: 'var(--primary-color)'                                     # Navigation menu selection hoover
  paper-listbox-background-color: '#2E333A'                                       # Navigation menu background
  paper-grey-50: 'var(--primary-text-color)'
  paper-grey-200: '#414A59'                                                       # Navigation menu selection

  # Paper card
  paper-card-header-color: 'var(--accent-color)'                                  # Card header text colour
  paper-card-background-color: '#434954'                                          # Card background colour
  paper-dialog-background-color: '#434954'                                        # Card dialog background colour
  paper-item-icon-color: 'var(--primary-text-color)'                              # Icon color
  paper-item-icon-active-color: '#F9C536'                                         # Icon color active
  paper-item-icon_-_color: 'green'
  paper-item-selected_-_background-color: '#434954'                               # Popup item select
  paper-tabs-selection-bar-color: 'green'

  # Labels
  label-badge-red: 'var(--accent-color)'                                          # References the brand colour label badge border
  label-badge-text-color: 'var(--primary-text-color)'                             # Now same as label badge border but that's a matter of taste
  label-badge-background-color: '#2E333A'                                         # Same, but can also be set to transparent here

  # Switches
  paper-toggle-button-checked-button-color: 'var(--accent-color)'
  paper-toggle-button-checked-bar-color: 'var(--accent-color)'
  paper-toggle-button-checked-ink-color: 'var(--accent-color)'
  paper-toggle-button-unchecked-button-color: 'var(--disabled-text-color)'
  paper-toggle-button-unchecked-bar-color: 'var(--disabled-text-color)'
  paper-toggle-button-unchecked-ink-color: 'var(--disabled-text-color)'

  # Sliders
  paper-slider-knob-color: 'var(--accent-color)'
  paper-slider-knob-start-color: 'var(--accent-color)'
  paper-slider-pin-color: 'var(--accent-color)'
  paper-slider-active-color: 'var(--accent-color)'
  paper-slider-container-color: 'linear-gradient(var(--primary-background-color), var(--secondary-background-color)) no-repeat'
  paper-slider-secondary-color: 'var(--secondary-background-color)'
  paper-slider-disabled-active-color: 'var(--disabled-text-color)'
  paper-slider-disabled-secondary-color: 'var(--disabled-text-color)'

  # Google colors
  google-red-500: '#E45E65'
  google-green-500: '#39E949'
```

摘自[这里](https://community.home-assistant.io/t/midnight-theme/28598/2)。

## 图标
使用`mdi:NAME`形式的图标，如`mdi:play-network`。名称可以从这里获取：https://materialdesignicons.com/

## 通知
您可以通过 `sendTo` 功能或将状态写入 `lovelace.X.notifications.add` 来添加通知：

```
sendTo('lovelace.0', 'send', {message: 'Message text', title: 'Title'}); // full version
sendTo('lovelace.0', 'send', 'Message text'); // short version
```

或者

```
setState('lovelace.0.notifications.add', '{"message": "Message text", "title": "Title"}'); // full version
setState('lovelace.0.notifications.add', 'Message text'); // short version
```

＃＃ 语音控制
来自 Web 界面的所有命令都将写入 lovelace.X.conversation 状态，其中包含 `ack=false`。
您可以编写一个脚本，该脚本将根据请求做出反应并回答：

```
on({id: 'lovelace.0.conversation', ack: false, change: 'any'}, obj => {
   console.log('Question: ' + obj.state.val);
   if (obj.state.val.includes('time')) {
      setState('lovelace.0.conversation', new Date().toString(), true); // true is important. It will say, that this is answer.
   } else {
      setState('lovelace.0.conversation', 'Sorry I don\'t know, what do you want', true); // true is important. It will say, that this is answer.
   }
});
```

＃＃ 故障排除
如果您弄乱了 YAML 代码并看到空白页面但仍然有顶部菜单，您可以从菜单中启用编辑模式（如果尚未启用），然后再次打开菜单以访问“RAW Yaml 编辑器”，您可以在其中使用查看完整的 YAML 代码并可以清理它。
如果这没有帮助，您可以在 ioBroker 的原始编辑器中打开对象 `lovelace.*.configuration` 并查看那里。
您还可以从备份中恢复该对象。它包含可视化的完整配置。

## Lovelace 的原始来源
使用的来源在这里 https://github.com/GermanBluefox/home-assistant-polymer 。

＃＃ 去做
安全性必须来自当前用户而不是default_user

＃＃ 发展
＃＃＃ 版本
使用的版本 home-assistant-frontend@20231208.2 浏览器版本：2.3.0

### 如何构建新的 Lovelace 版本
首先，实际的https://github.com/home-assistant/frontend（dev分支）必须**手动**合并到https://github.com/GermanBluefox/home-assistant-polymer.git（ ***iob*** 分支！）。

ioBroker 的所有更改均标有注释 `// IoB`。
目前（20231208.2）以下文件已被修改：

- `build-scripts/gulp/app.js` - 添加新的 gulp 任务develop-iob
- `build-scripts/gulp/webpack.js` - 添加新的 gulp 任务 webpack-dev-app
- `src/data/weather.ts` - 添加支持显示来自 url 的天气图标。
- `src/dialogs/more-info/const.ts` - 删除天气状态和历史记录
- `src/dialogs/more-info/ha-more-info-dialog.ts` - 删除实体设置按钮和选项卡
- `src/dialogs/more-info/ha-more-info-history.ts` - 删除历史记录中的“显示更多”链接
- `src/dialogs/more-info/controls/more-info-weather.ts` - 添加对从 url 显示天气图标的支持。
- `src/dialogs/voice-command-dialog/ha-voice-command-dialog.ts` - 禁用语音助手的配置
- `src/entrypoints/core.ts` - 修改了身份验证过程
- `src/panels/lovelace/cards/hui-weather-forecast-card.ts` - 添加支持显示来自 url 的天气图标。
- `src/panels/lovelace/entity-rows/hui-weather-entity-row.ts` - 添加支持显示带有身份验证的 url 中的天气图标。
- `src/panels/lovelace/hui-root.ts` - 添加通知和语音控制
- `src/util/documentation-url.ts` - 用于链接到 iobroker 帮助而不是家庭助理。
- `.gitignore` - 添加 `.idea` 忽略
- `.husky/pre-commit` - 删除 git commit 挂钩。
- `package.json` - 删除 husky 提交钩子

之后在`./build`文件夹中签出修改后的版本。然后。

1.进入./build目录。
2. `git clone https://github.com/GermanBluefox/home-assistant-polymer.git` 它是 https://github.com/home-assistant/frontend.git 的一个分支，但有些东西被修改了（请参阅前面的文件列表）。
3. `cd home-assistant-polymer`
4. `git checkout master`
5.`纱线安装`
6. 用于发布版本的“gulp build-app”或用于调试版本的“gulpdevelop-iob”。要在更改后构建网络，您可以调用“webpack-dev-app”以加快构建速度，但在版本准备好使用后，您仍然需要调用“build-app”。
7. 将“./build/home-assistant-polymer/hass_frontend”中的所有文件复制到此存储库中的“./hass_frontend”
8. 多次运行 `gulp rename` 任务（直到没有发生任何更改）。
9. 更新“README.md”中的版本以及“server.js”中的“VERSION”常量。

## Changelog

<!--
	PLACEHOLDER for the next version:
	### **WORK IN PROGRESS**
-->
### 4.1.4 (2024-02-10)
* (Garfonso) improved fix: lamp icons now turn gray on switch off.

### 4.1.3 (2024-02-10)
* (Garfonso) prevent warning for browser_mod/recall_id service call
* (Garfonso) fix: lamp icons now turn gray on switch off.
* (Garfonso) fix: notifications via sendTo work again.

### 4.1.2 (2024-01-09)
* (Garfonso) fix: time in timestamp display

### 4.1.1 (2024-01-02)
* (Garfonso) changed: determining user id
* (Garfosno) changed: history attributes handling
* (Garfonso) added: handle browser_mod/recall_id service call.
* (Garfonso) changed: all states are strings (fixes #483)

### 4.1.0 (2023-12-18)
* (Garfons) add an option to show users on login screen (off by default)

## License

Copyright 2019-2024, bluefox <dogafox@gmail.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.