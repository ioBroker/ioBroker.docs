---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.lovelace/README.md
title: ioBroker.lovelace
hash: Vsarg6AJFBh+tqIfiMJeA5EbUjdOYQHNNYLyi3W0cW8=
---
![商标](../../../en/adapterref/iobroker.lovelace/admin/lovelace.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.lovelace.svg)
![下载](https://img.shields.io/npm/dm/iobroker.lovelace.svg)
![依赖状态](https://img.shields.io/david/ioBroker/iobroker.lovelace.svg)
![已知漏洞](https://snyk.io/test/github/ioBroker/ioBroker.lovelace/badge.svg)
![新产品管理](https://nodei.co/npm/iobroker.lovelace.png?downloads=true)
![特拉维斯CI](http://img.shields.io/travis/ioBroker/ioBroker.lovelace/master.svg)
![应用程序](https://ci.appveyor.com/api/projects/status/github/ioBroker/ioBroker.lovelace?branch=master&svg=true)

# IoBroker.lovelace
## IoBroker 的 lovelace 适配器
使用此适配器，您可以使用 Home Assistant Lovelace UI 为 ioBroker 构建可视化。

[德意志档案](docs/de/README.md)

＃＃ 配置
如何配置实体有两种艺术：

- 汽车
- 手动的

＃＃＃ 汽车
在自动模式下，类似的过程将适用于 `google home` 或 `material adapter`。

***仅检测定义了 `function`和 `room` 类别的对象和通道***

您可以定义友好名称，这将在实体中使用。

＃＃＃ 手动的
可以在对象树中手动定义对象，如 sql 或 histroy。必须提供实体类型和可选的对象名称。
使用此方法只能创建简单的实体，如 input_number、input_text 或 input_boolean。它可能不会有多个状态或属性。

##面板
###报警面板
ioBroker 尚不支持此类设备，但可以对其进行模拟。如果您创建这样的脚本：

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

###数字输入
如果选择自定义对话框中的 input_number 实体类型，则可以手动完成此操作。
这种类型需要 `min` 和 `max` 值在 `common` 和可选的 `step` 可以添加。
如果你想看到向上和向下箭头，你应该在自定义 `mode` 中设置为“数字”：

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
如果选择自定义对话框中的 input_select 实体类型，则可以手动完成此操作。
要从中选择的选项列表应在标准 commom.states 对象中提供：

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

换句话说 in 也应该是 input select in IoB。

### 计时器
定时器可以通过以下脚本模拟：

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
用 yr 和 daswetter 测试。以下一个或多个对象必须将 `Function=Weather` 和 `Room=Any` 设置为在配置中可用：

- daswetter.0.NextDays.Location_1
- yr.0.forecast

使用 AccuWeather 驱动程序 v1.1.0 https://github.com/iobroker-community-adapters/ioBroker.accuweather 进行测试。
创建自定义 Lovelace 卡以支持 accuweather 预报 - https://github.com/algar42/IoB.lovelace.accuweather-card

＃＃＃ 购物清单
购物清单以以下形式写入值：

```
[
   {name: 'Task 1', id: 1234222, complete: false},
   {name: 'Task 2', id: 1234223, complete: true}
]
```

进入 `lovelace.X.control.shopping_list` 状态。

＃＃＃ 地图
对象必须如下所示：

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

###图片实体
您可以为其使用静态图片或使用任何提供 URL 作为状态的状态。
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

###隐藏工具栏
要隐藏工具栏，您可以在主题选项卡上的 ioBroker 配置对话框中设置复选框。
要显示它，您可以再次在对话框中禁用它，或者只使用 `?toolbar=true` 参数调用 URL。

###降价
您可以像 [iobroker.vis](https://github.com/ioBroker/ioBroker.vis#bindings-of-objects) 一样在降价中使用绑定。

例如。文本 `Admin adapter is {a:system.adapter.admin.0.alive;a === true || a === 'true' ? ' ' : 'not '} *alive*.` 将在降价面板中生成文本 `Admin adapter is alive`。

##自定义卡片
### 上传自定义卡片
要上传自定义卡，请写入以下内容：

```iobroker file write PATH_TO_FILE\bignumber-card.js /lovelace.0/cards/```

重新启动 lovelace 适配器后，它将自动包含 `cards` 目录中的所有文件。

以下定制卡可以成功测试：

- bignumber-card: https://github.com/custom-cards/bignumber-card/blob/master/bignumber-card.js
- simple-thermostat：https://github.com/nervetattoo/simple-thermostat/releases（获取最新版本）
- 恒温器：https://github.com/ciotlosm/custom-lovelace/tree/master/thermostat-card（需要 .js 和 .lib.js 文件）

我发现此链接 https://github.com/jimz011/homeassistant 作为自定义卡的有趣资源。

自定义卡片通常作为源存储在 github 上，必须在使用前进行编译。
您应该检查 github 上的 `Releases` 菜单并尝试在那里找到已编译的文件。
像这个：[https://github.com/kalkih/mini-graph-card/releases](https://github.com/kalkih/mini-graph-card/releases)（查找文件`mini-graph-card-bundle.js`）

## 自己的图像
自定义图像（例如背景）可以通过与自定义卡片相同的配置对话框加载。并像这样使用它：

`background: center / cover no-repeat url("/cards/background.jpg") fixed`

或者

`background: center / cover no-repeat url("/local/custom_ui/background.jpg") fixed`

在 lovelace 配置文件中。阅读更多关于爱情花边背景[这里](https://www.home-assistant.io/lovelace/views/#background)。

##主题
主题可以在 ioBroker 的配置对话框中定义。
粘贴如下内容：

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

取自 [这里](https://community.home-assistant.io/t/midnight-theme/28598/2)。

## 图标
使用 `mdi:NAME` 形式的图标，例如“mdi:play-network”。名称可以从这里获取：https://materialdesignicons.com/

## 通知
您可以通过 `sendTo` 功能或通过将状态写入 `lovelace.X.notifications.add` 来添加通知：

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
来自 Web 界面的所有命令都将写入 lovelace.X.conversation 状态，并带有 `ack=false`。
您可以编写一个脚本来响应请求并回答：

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
如果您弄乱了 YAML 代码并看到一个空白页面但仍然有顶部菜单，您可以从菜单中启用编辑模式（如果尚未启用），然后再次打开菜单以访问您在其中的“RAW Yaml 编辑器”查看完整的 YAML 代码并可以清理它。
如果这没有帮助，您可以在 ioBroker 的 raw-editor 中打开对象 lovelace.*.configuration 并查看那里。
您还可以从备份中恢复该对象。它包含您的可视化的完整配置。

## Lovelace 的原始来源
使用的来源在这里 https://github.com/GermanBluefox/home-assistant-polymer 。

＃＃ 去做
安全性必须来自当前用户，而不是来自 default_user

＃＃ 发展
＃＃＃ 版本
home-assistant-frontend@20201021.4 二手版本

### 如何构建新的 Lovelace 版本
首先，实际的 https://github.com/home-assistant/frontend（开发分支）必须**手动**合并到 https://github.com/GermanBluefox/home-assistant-polymer.git (* **iob*** 分支！）。

ioBroker 的所有更改都标有注释 `// IoB`。
目前（20201021.4）修改了以下文件：

- `build-scripts/gulp/app.js` - 添加新的 gulp 任务
- `build-scripts/gulp/webpack.js` - 添加新的 gulp 任务
- `src/data/lovelace.ts` - 添加隐藏工具栏选项
- `src/data/weather.ts` - 添加支持从 url 显示天气图标。
- `src/dialogs/more-info/ha-more-info-dialog.ts` - 删除实体设置按钮并删除天气状态和历史记录
- `src/dialogs/more-info/controls/more-info-climate.ts` - 不支持模式的打印模式名称
- `src/dialogs/more-info/controls/more-info-weather.ts` - 添加支持从 url 显示天气图标。
- `src/entrypoints/core.ts` - 修改认证过程
- `src/layouts/home-assistant-main.ts` - 删除应用侧边栏
- `src/panels/lovelace/cards/hui-weather-forecast-card.ts` - 添加支持从 url 显示天气图标。
- `src/panels/lovelace/entity-rows/hui-weather-entity-row.ts` - 添加支持显示来自带有身份验证的 url 的天气图标。
- `src/panels/lovelace/hui-root.ts` - 添加通知和语音控制
- `src/util/documentation-url.ts` - 用于链接到 iobroker 帮助而不是 homeassistant。
- `.gitignore` - 添加 `.idea` 忽略
- `package.json` - 移除 husky commit hook

在 `./build` 文件夹中结帐修改版本之后。然后。

1.进入./build目录。
2.`git clone https://github.com/GermanBluefox/home-assistant-polymer.git` 是https://github.com/home-assistant/frontend.git的一个fork，但是有些东西被修改了（请参阅前面的文件列表）。
3.`cd home-assistant-polymer`
4.`git checkout master`
5.`npm 安装`
6. 发布版使用`gulp build-app`，调试版使用`gulp develop-iob`。要在更改后构建 web，您可以调用 `webpack-dev-app` 以加快构建速度，但是在版本准备好使用之后，无论如何您都需要调用 `build-app`。
7.将`./build/home-assistant-polymer/hass_frontend`中的所有文件复制到这个repo中的`./hass_frontend`中
8. 启动 `gulp rename` 任务。

## Changelog

<!--
	PLACEHOLDER for next version:
	### **WORK IN PROGRESS**
-->
### 2.0.0 (2021-06-17)
* (Garfonso) Changed: !Breaking! Battery warning is now binary_sensor instead of sensor (now ui sets icon and  translates ok)
* (Garfonso) Fixed:   !Breaking! entity_id conflict for low_bat / humidity when part of another device
* (Garfonso) Updated frontend to 20210603.0 (changed light entity to not convert color anymore)
* (Garfonso) Changed: increased file size limit to 5 MB during upload in config.
* (Garfonso) Added: Support for input_datetime
* (Garfonso) Added: Support for manual complex light entities
* (Garfonso) Added: Support for images from base64 data in iobroker states 
* (Garfonso) Added: Support for additional alarm states.
* (Garfonso) Added: Parameter to only enter code when disarming alarm
* (Garfonso) Added: Support for admin 5 (jsonCustom)
* (Garfonso) Added: Support for airCondition / rework thermostat
* (Garfonso) Added: manual entities can be more complex now (needs documentation)
* (Garfonso) Added: darkMode control

### 1.5.0 (2021-02-15)
* (Garfonso) Changed: defaultTheme and control.theme were in conflict. Now control.theme is set when selecting a new default theme.
* (Garfonso) Added: control.themeDark to control devices in dark mode, too.
* (Garfonso) Fixed: Device Icons with authentication now work
* (Garfonso) Changed: previously only admin user could change the UI. Now also the owner of the configuration object and members of the owner group are allowed to change the UI.
* (Garfonso) Internal code cleanup / breaking dependency update.
* (Garfonso) Added: Support for pure humidity sensors.
* (Garfonso) Added: Support for URL as entity_image
* (Garfonso) Fixed: Adjust user-name/user-id handling to changes in js-controller 3.2.*
* (Garfonso) Fixed: default themes do not show as selected
* (Garfonso) Fixed: Loading themes / custom cards / image-proxy

### 1.4.3 (2021-02-01)
* (bluefox) Support of lovelace via ioBroker.pro

### 1.4.2 (2021-01-08)
* (thost96) Fixed: set Theme state type to string instead of text

### 1.4.1 (2021-01-08)
* (bluefox) Support of new Let's Encrypt (only with js-controller 3.2.x)

## License

Copyright 2019-2021, bluefox <dogafox@gmail.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.