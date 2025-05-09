---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.lovelace/README.md
title: ioBroker.lovelace
hash: CevnA7T7sHSamYWblZJOuDzy/NIuSAqwybgwIb9sCEI=
---
![标识](../../../en/adapterref/iobroker.lovelace/admin/lovelace.png)

![安装数量](http://iobroker.live/badges/lovelace-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.lovelace.svg)
![下载](https://img.shields.io/npm/dm/iobroker.lovelace.svg)

# IoBroker.lovelace
![测试和发布](https://github.com/ioBroker/iobroker.lovelace/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/lovelace/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

## IoBroker 的 lovelace 适配器
使用此适配器，您可以使用 Home Assistant Lovelace UI 为 ioBroker 构建可视化。

[德国文献](docs/de/README.md)

## 实例对象
文件夹实例中有一些对象可用于控制 UI。对于每个浏览器，系统都会创建一个带有随机 ID 的新子文件夹。此 ID 存储在客户端浏览器的 Web 存储中。如果您删除 Web 存储，则会创建一个新的实例。如果您使用 Fully Kiosk 浏览器，请确保 `Delete webstorage on reload` 功能已**禁用**。

此功能使用 browser_mod，该模块由适配器安装和更新。请勿将您自己的 browser_mod 版本添加为自定义卡。

＃＃ 配置
有两种方法可以配置实体：

- 汽车
- 手动的

＃＃＃ 汽车
在自动模式下，将应用类似的过程，如`google home`或`material adapter`。

***仅检测定义了`function`和`room`类别的对象和通道***

您可以定义友好名称，并将其用于实体中。

＃＃＃ 手动的
对象可以在对象树中手动定义，例如`sql`或`history`。必须提供实体类型，并可选地提供对象名称。
此方法只能创建简单实体，例如输入编号 (input_number)、输入文本 (input_text) 或输入布尔值 (input_boolean)。它不能具有多个状态或属性。

## 面板
### 报警面板
ioBroker 尚不支持此类设备，但可以模拟。如果您创建这样的脚本：

```js
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

或者您只需使用`lovelace.X.control.alarm (entity_id = alarm_control_panel.defaultAlarm)`即可。

### 数字输入
如果在自定义对话框中选择了 input_number 实体类型，则可以手动完成此操作。
此类型需要`min`和`max`值（`common`），以及可选的`step`值。
如果您想看到向上和向下箭头，则应在自定义`mode`中将其设置为“number”：

```json5
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
如果在自定义对话框中选择了`input_select`实体类型，则可以手动完成此操作。
可供选择的选项列表应在标准`common.states`对象中提供：

```json
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

换句话说，IoB 中也应该有选择输入。

### 计时器
可以通过以下脚本模拟计时器：

```js
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
已使用 `yr` 和 `daswetter` 进行测试。以下一个或多个对象必须将 `Function=Weather` 和 `Room=Any` 设置为可在配置中使用：

- `daswetter.0.NextDays.Location_1`
-`yr.0.预测`

已使用 `AccuWeather` 驱动程序 v1.1.0 进行测试，网址：https://github.com/iobroker-community-adapters/ioBroker.accuweather。
为支持 accuweather 天气预报而创建的自定义 Lovelace 卡 - https://github.com/algar42/IoB.lovelace.accuweather-card

### 购物清单
购物清单以以下形式写入值：

```json
[
   {"summary": "Task 1", "uid": "1234222", "status": "needs_action"},
   {"summary": "Task 2", "uid": "1234223", "status": "completed"}
]
```

进入`lovelace.X.control.shopping_list`状态。

您还可以通过创建类型为`todo`的手动实体来添加您自己的待办事项或购物清单。

＃＃＃ 地图
这些对象必须看起来像这样：

```js
createState('location', '39.5681295;2.6432632', false, {
    "name": "location",
    "role": "value.gps",
    "type": "string",
    "read": true,
    "write": false,
    "desc": "Gps Coordinates"
});
```

或者这两个对象：

```js
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
您可以使用静态图片，或使用任何提供 URL 的状态作为状态。
例如：

```json
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

或者只是手动将实体类型设置为`camera`并将 URL 写入其中。

### 降价
您可以在 Markdown 中使用绑定，就像在[iobroker.vis](https://github.com/ioBroker/ioBroker.vis#bindings-of-objects)中一样。

例如，文本`Admin adapter is {a:system.adapter.admin.0.alive;a === true || a === 'true' ? ' ' : 'not '} *alive*.`将在markdown面板中生成文本`Admin adapter is alive`。

## 自定义卡片
### 上传自定义卡片
要上传自定义卡片，请写入以下内容：

```iobroker file write PATH_TO_FILE\bignumber-card.js /lovelace.0/cards/```

重新启动 lovelace 适配器后，它将自动包含来自 `cards` 目录的所有文件。

以下定制卡可以成功测试：

- `bignumber-card`: https://github.com/custom-cards/bignumber-card/blob/master/bignumber-card.js
- `simple-thermostat`: https://github.com/nervetattoo/simple-thermostat/releases （获取最新版本）
- `thermostat`: https://github.com/ciotlosm/custom-lovelace/tree/master/thermostat-card (需要 .js 和 .lib.js 文件)

我发现此链接 https://github.com/jimz011/homeassistant 是自定义卡片的有趣资源。

自定义卡片通常作为源代码存储在 GitHub 上，使用前必须先编译。
您应该查看 GitHub 上的 `Releases` 菜单，并尝试在其中找到已编译的文件。
例如：[https://github.com/kalkih/mini-graph-card/releases](https://github.com/kalkih/mini-graph-card/releases)（查找文件 `mini-graph-card-bundle.js`）

## 自己的图像
自定义图像（例如，用于背景）可以通过与自定义卡片相同的配置对话框加载。使用方法如下：

`background: center / cover no-repeat url("/cards/background.jpg") fixed`

或者

`background: center / cover no-repeat url("/local/custom_ui/background.jpg") fixed`

在 lovelace 配置文件中。更多关于 lovelace 的背景信息，请参阅[这里](https://www.home-assistant.io/lovelace/views/#background)。

## 主题
您可以在 ioBroker 的配置对话框中定义主题。
粘贴以下内容：

```yaml
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

取自[这里](https://community.home-assistant.io/t/midnight-theme/28598/2)。

## 图标
使用`mdi:NAME`格式的图标，例如`mdi:play-network`。名称可从此处获取：https://materialdesignicons.com/

## 通知
您可以通过`sendTo`功能添加通知，或者将状态写入`lovelace.X.notifications.add`：

```js
sendTo('lovelace.0', 'send', {message: 'Message text', title: 'Title'}); // full version
sendTo('lovelace.0', 'send', 'Message text'); // short version
```

或者

```js
setState('lovelace.0.notifications.add', '{"message": "Message text", "title": "Title"}'); // full version
setState('lovelace.0.notifications.add', 'Message text'); // short version
```

## 语音控制
所有来自 Web 界面的命令都将以 `ack=false` 的形式写入 lovelace.X.conversation 状态。
您可以编写一个脚本，用于响应请求并进行回复：

```js
on({id: 'lovelace.0.conversation', ack: false, change: 'any'}, obj => {
   console.log('Question: ' + obj.state.val);
   if (obj.state.val.includes('time')) {
      setState('lovelace.0.conversation', new Date().toString(), true); // true is important. It will say, that this is answer.
   } else {
      setState('lovelace.0.conversation', 'Sorry I don\'t know, what do you want', true); // true is important. It will say, that this is answer.
   }
});
```

## 故障排除
如果您弄乱了 YAML 代码，导致页面空白但顶部菜单仍然可见，您可以先在菜单中启用编辑模式（如果尚未启用），然后再次打开菜单访问“RAW Yaml 编辑器”，在其中您可以查看完整的 YAML 代码并进行清理。
如果这没有帮助，您可以在 ioBroker 的 raw-editor 中打开对象 `lovelace.*.configuration` 进行查看。
您也可以从备份中恢复该对象。它包含您可视化的完整配置。

## Lovelace 的原始来源
使用的来源在这里 https://github.com/GermanBluefox/home-assistant-polymer 。

## 待办事项
安全性必须从当前用户而不是默认用户那里获取

＃＃ 发展
＃＃＃ 版本
使用 home-assistant-frontend@20250306.0 版本 浏览器模块版本：2.3.3

### 如何构建新的 Lovelace 版本
首先，实际的 https://github.com/home-assistant/frontend (dev 分支) 必须**手动**合并到 https://github.com/GermanBluefox/home-assistant-polymer.git (***iob*** 分支！)。

ioBroker 的所有更改均标有注释`// IoB`。
目前（20250401.0）已修改以下文件：

- `build-scripts/gulp/app.js` - 添加新的 gulp 任务develop-iob
- `build-scripts/gulp/rspack.js` - 添加新的 gulp 任务 rspack-dev-app
- `src/data/icons.ts` - 始终对旧版本使用后备，其中前端决定为 binary_sensors 使用哪个图标（如果没有提供）。
- `src/data/weather.ts` - 添加从 url 显示天气图标的支持。
- `src/dialogs/more-info/const.ts` - 删除天气状态和历史记录
- `src/dialogs/more-info/ha-more-info-dialog.ts` - 删除实体设置按钮和选项卡
- `src/dialogs/more-info/ha-more-info-history.ts` - 删除历史记录中的“显示更多”链接
- `src/dialogs/more-info/ha-more-info-logbook.ts` - 删除日志中的“显示更多”链接
- `src/dialogs/more-info/controls/more-info-weather.ts` - 添加从 url 显示天气图标的支持。
- `src/dialogs/voice-command-dialog/ha-voice-command-dialog.ts` - 禁用语音助手配置
- `src/entrypoints/core.ts` - 添加无身份验证选项
- `src/panels/lovelace/cards/hui-weather-forecast-card.ts` - 添加从 url 显示天气图标的支持。
- `src/panels/lovelace/entity-rows/hui-weather-entity-row.ts` - 添加通过 auth 从 url 显示天气图标的支持。
- `src/panels/lovelace/hui-root.ts` - 添加通知按钮，禁用管理仪表板链接
- `src/util/documentation-url.ts` - 用于链接到 iobroker 帮助而不是家庭助理。
- `.husky/pre-commit` - 删除 git 提交钩子。

之后，在`./build`文件夹中检出修改后的版本。然后。

1. 转到./build 目录。
2. `git clone https://github.com/GermanBluefox/home-assistant-polymer.git` 它是 https://github.com/home-assistant/frontend.git 的一个 fork，但有些内容被修改了（请参阅前面的文件列表）。
3. `cd home-assistant-polymer`
4. `git checkout master`
5. `yarn 安装`
6. 使用 `gulp build-app` 进行发布，或使用 `gulp develop-iob` 进行调试。修改后，如果需要构建 Web 应用，可以调用 `webpack-dev-app` 来加快构建速度，但版本可用后，仍然需要调用 `build-app`。
7. 在适配器仓库中运行脚本“hass_frontend/static_cards/newFrontend.sh”来更新前端（假设两个仓库在同一个文件夹中彼此相邻，如果不是，请调整脚本，最好进行一些参数处理并进行 PR，谢谢 :smile: ）
8.运行“gulp rename”任务。
9. 更新 `README.md` 中的版本

## Changelog

<!--
	PLACEHOLDER for the next version:
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (Garfonso) settings from entity registry are now loaded on startup
* (Garfonso) logbook: prevent entries from the future
* (Garfonso) use default icons for binary sensors again (recompiled frontend, clear browser cache if problems occur)

### 5.0.0 (2025-04-10)
* (Garfonso) Updated frontend to 20250401.0
* (Garfonso) Updated browser_mod to 2.3.3
* (Garfonso) Add statistics recorder
* (Garfonso) Add entity registry, use it to solve id clashes. In the future, store entity settings here.
* (Garfonso) Limit the number of stored browser instances
* (Garfonso) Improved caching behavior. Might solve iobroker.pro issue... hopefully?
* (Garfonso) Prevent crash with some edge cases with light entities
* (Garfonso) experimental dashboard support.
* (Garfonso) Allow to show sidebar via object in instances. VERY experimental. A lot of stuff does not yet work. But allows to configure dashboards and also browser mod.

### 4.1.15 (2025-03-10)
* (Garfonso) repaired image loading, again.

### 4.1.14 (2025-03-10)
* (Garfonso) repaired image loading. Fixes #577

### 4.1.13 (2025-03-06)
* (Garfonso) reworked image sending. Now weather icons work for normal users, too. Also, weather images are transferred from our server, so no access to admin is needed anymore.

## License

Copyright 2019-2025, bluefox <dogafox@gmail.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.