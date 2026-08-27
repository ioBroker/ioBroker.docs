---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vis-mapwidgets/README.md
title: ioBroker.mapwidgets
hash: RIhavMcA2pv6ER/MXw8Xoui90+vgMlusoFOzBMBPwEU=
---
# IoBroker.mapwidgets
![标识](../../../en/adapterref/iobroker.vis-mapwidgets/admin/mapwidgets-small.svg)

![NPM 版本](https://img.shields.io/npm/v/iobroker.vis-mapwidgets.svg)
![下载](https://img.shields.io/npm/dm/ioBroker.vis-mapwidgets.svg)
![安装数量](https://iobroker.live/badges/vis-mapwidgets-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/vis-mapwidgets-stable.svg)
![NPM](https://nodei.co/npm/iobroker.vis-mapwidgets.png?downloads=true)

**测试：** ![测试与发布](https://github.com/oweitman/ioBroker.vis-mapwidgets/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 mapwidgets 适配器
借助此适配器，您可以使用 Leaflet 小部件在地图上显示各种元素。

这些元素可以使用 JSON 数据结构进行配置。

![完整测试图片](../../../en/adapterref/iobroker.vis-mapwidgets/example/ExampleCompleteTest/ExampleCompleteTest.png) **完整测试示例示例**

目前支持以下元素：

- 标记（可通过 ID 引用自定义图标）
- 图标
- 折线（例如，用于轨道）
- 多边形（几何形状）
- 矩形
圆圈

对于高级用例，可以通过专用变量访问地图对象，并使用 JavaScript 进行操作。

有关用例，请参阅 [示例](./example/example.md)

根据相关性和可行性，可根据要求添加其他功能。

＃＃ 配置
适配器本身没有任何配置选项。

小部件的配置如下所述。

## 可视化和小部件
以下组件实际存在

- [`地图 Leaflet`](#map-leaflet) - 使用 Leaflet 库 <https://leafletjs.com/> 显示地图数据。

### 地图传单
在地图上显示各种元素。

#### 小部件配置
| 名称 | 描述 |
| -------------------------------- | ----------------------------------------------------------------------- |
| `mapwidgets_oid` | 包含元素配置的数据点 |
| `mapwidgets_lon` | 地图中心的经度 |
| `mapwidgets_zoom` | 初始缩放级别 |
| `mapwidgets_expose` | 公开 `window.iobroker.mapwidgets.<widgetID>.map` 下的地图对象 |
| `mapwidgets_maptheme` | 地图配色方案：自动、浅色或深色（默认值：自动） |
| `mapwidgets_daynightenabled` | 启用日/夜模式 |
| `mapwidgets_daynightcolor` | 日/夜区域的边框颜色 |
| `mapwidgets_daynightopacity` | 日夜区域的不透明度 |
| `mapwidgets_daynightfillcolor` | 日/夜区域的填充颜色 |
| `mapwidgets_daynightfillopacity` | 日/夜区域的填充不透明度 |
| `mapwidgets_daynightfillopacity` | 白天/夜晚区域的填充透明度 |

地图配色方案仅更改 OpenStreetMap 的瓦片渲染。`auto` 遵循浏览器的 `prefers-color-scheme` 设置，并在该设置更改时更新。`light` 显示原始瓦片，而 `dark` 应用深色地图滤镜。标记、路径、多边形和其他 Leaflet 叠加层不会被过滤。

#### 地图配置
地图对象由几个主要组件构成，所有组件都可以独立配置：

```json
{
    "marker": [],
    "icons": {},
    "polyline": [],
    "polygon": [],
    "rectangle": [],
    "circle": []
}
```

为了测试目的，另请参阅 [示例\example.md](example/example.md) 以获取更多测试内容。

对于所有配置，原则是只需要显示元素所必需的信息量。

地图数据在编辑模式下进行验证。任何错误都可以通过带有红色感叹号的按钮访问和查看。

仅当存在错误时，此按钮才会显示。

在 vis 中，单击即可正常打开对话框。在 vis-2 中，需要按住 2 次 SHIFT 键并单击。

按钮

![感叹号按钮](../../../en/adapterref/iobroker.vis-mapwidgets/example/Exclamationmark.png)

对话

![错误对话框](../../../en/adapterref/iobroker.vis-mapwidgets/example/ErrorDialog.png)

各个属性的分配情况如下：

##### 标记
它包含一个单独的标记信息对象数组。

```json
[
    {
        "latlng": [50.182, 8.682],
        "options": {
            "title": "Default"
        },
        "popup": "<b>Default Marker</b>",
        "tooltip": "Hover me"
    },
    {
        "lat": 50.176,
        "lng": 8.69,
        "options": {
            "draggable": true,
            "title": "Draggable"
        },
        "popup": "Drag me!"
    }
]
```

纬度和经度为必填项；其他参数均为可选。

纬度和经度有两种替代表示法，请参见上面的示例。

对于自定义图标，图标的唯一 ID 以字符串形式指定（参见 `icons` 配置）。

有关工具提示和弹出窗口，请参阅[工具提示](#tooltip) 和 [弹出窗口]](#popup)。

参数的详细说明请参见此处：

<https://leafletjs.com/reference.html#marker>

＃＃＃＃＃ 图标
这包含一个对象数组，每个对象包含一个图标信息。

```json
{
    "greenleaf": {
        "iconUrl": "/vis.0/leaf-green.png",
        "iconSize": [25, 41],
        "iconAnchor": [12, 41],
        "popupAnchor": [1, -34],
        "shadowUrl": "/vis.0/leaf-shadow.png",
        "shadowSize": [41, 41],
        "shadowAnchor": [12, 41]
    },
    "orangeleaf": {
        "iconUrl": "/vis.0/leaf-orange.png",
        "iconSize": [32, 48],
        "iconAnchor": [16, 48],
        "popupAnchor": [0, -40],
        "shadowUrl": "/vis.0/leaf-shadow.png",
        "shadowSize": [50, 50],
        "shadowAnchor": [16, 48]
    }
}
```

`iconURL` 为必填项；其他所有参数均为可选。

图标的键名（例如，`greenleaf`）区分大小写，并且在图标集中必须是唯一的，并用作标记中的引用。

允许的字符：`a–z, 0–9, _, -.`

参数的详细说明请参见此处：

<https://leafletjs.com/reference.html#icon>

##### 折线/多边形/矩形/圆形
此数组包含各个折线/多边形/矩形/圆的信息。

所有类型的架构相同。差异如下所示。

折线：

```json
[
    {
        "latlng": [
            [50.2, 8.7],
            [50.2, 8.8],
            [50.3, 8.75]
        ],
        "options": {
            "color": "green",
            "weight": 10
        }
    },
    {
        "latlng": [
            [50.2, 8.8],
            [50.2, 8.9],
            [50.3, 8.85]
        ],
        "options": {
            "color": "blue",
            "weight": 5
        }
    }
]
```

**多边形：**

```json
[
    {
        "latlng": [
            [50.1, 8.7],
            [50.1, 8.8],
            [50.2, 8.75]
        ],
        "options": {
            "color": "green",
            "weight": 10
        }
    }
]
```

**长方形：**

```json
[
    {
        "latlng": [
            [50.3, 8.7],
            [50.4, 8.8]
        ],
        "options": {
            "color": "yellow",
            "weight": 10
        }
    }
]
```

**圆圈：**

```json
[
    {
        "latlng": [50.3, 8.6],
        "options": {
            "radius": 10000,
            "weight": 10,
            "color": "black"
        }
    }
]
```

###### `latlng`
该参数对于所有类型都是必需的。

纬度和经度始终是一个包含 2 个元素的数组 [纬度，经度]，如下文所述，称为坐标（左上坐标和右下坐标）。

折线、多边形、矩形都是坐标数组。

圆只包含一个坐标。

折线至少由 2 个元素组成，多边形至少由 3 个元素组成，矩形恰好由 2 个元素组成。

###### `options`
除了 Circle 对象之外，“options” 参数始终是可选的。

对于 Circle 对象，“radius” 参数是必需的。

Leaflet 文档中描述的在 latlng 和 options 级别分别设置“radius”参数的选项在此处不可用。

有关工具提示和弹出窗口，请参阅[工具提示](#tooltip) 和 [弹出窗口]](#popup)。

参数的详细说明请参见此处：

<https://leafletjs.com/reference.html#polyline>

<https://leafletjs.com/reference.html#polygon>

<https://leafletjs.com/reference.html#polygon>

<https://leafletjs.com/reference.html#circle>

##### 工具提示
标记、多边形、矩形、圆形的工具提示。

```json
[
    {
        "lat": 50.182,
        "lng": 8.682,
        "options": {
            "title": "Default"
        },
        "popup": "<b>Default Marker</b>",
        "tooltip": "Hover me"
    },
    {
        "lat": 50.171,
        "lng": 8.695,
        "options": {
            "icon": "orangeleaf",
            "draggable": true,
            "title": "Orange dot (draggable)"
        },
        "tooltip": {
            "text": "Permanent tooltip",
            "options": {
                "permanent": true,
                "offset": [0, -12]
            }
        }
    }
]
```

工具提示可以定义为简单的字符串，也可以定义为具有“text”和“options”属性的对象。

参数的详细说明请参见此处：

<https://leafletjs.com/reference.html#tooltip>

＃＃＃＃＃ 弹出窗口
弹出窗口，适用于标记、多边形、矩形、圆形。

```json
[
    {
        "lat": 50.182,
        "lng": 8.682,
        "options": {
            "title": "Default"
        },
        "popup": "<b>Default Marker</b>"
    },
    {
        "lat": 50.171,
        "lng": 8.695,
        "options": {
            "icon": "orangeleaf",
            "draggable": true,
            "title": "Orange dot (draggable)"
        },
        "popup": {
            "text": "Popup with offset",
            "options": {
                "offset": [0, -12]
            }
        }
    }
]
```

弹出窗口可以定义为简单的字符串，也可以定义为具有“text”和“options”属性的对象。

参数的详细说明请参见此处：

<https://leafletjs.com/reference.html#popup>

##### 特殊的iobroker选项
ioBroker 中仅 Leaflet 版本支持的特殊选项通过附加选项对象“iobOptions”实现。

并非所有对象类型都支持此对象。哪些选项适用于哪些对象类型，请参阅相应章节。

###### FitBounds
这适用于以下对象类型：标记、多边形、折线、矩形、圆形。

该系统收集对象的所有点，确定其周围的最小/最大边界框，计算适当的缩放级别，并将视图居中并缩放，以便所有选定的对象都可见。

**使用 3 个标记点的 fitBounds 示例：**

```json
{
    "marker": [
        {
            "latlng": [50.2, 8.7],
            "iobOptions": {
                "fitBounds": true
            }
        },
        {
            "latlng": [50.2, 8.6],
            "options": {
                "title": "Default"
            },
            "tooltip": {
                "text": "Default",
                "options": {
                    "permanent": true,
                    "direction": "top"
                }
            },
            "iobOptions": {
                "fitBounds": true
            }
        },
        {
            "latlng": [50.2, 8.8],
            "options": {
                "title": "with Custom Icon",
                "icon": "redleaf"
            },
            "tooltip": {
                "text": "with Custom Icon",
                "options": {
                    "permanent": true,
                    "direction": "bottom"
                }
            },
            "iobOptions": {
                "fitBounds": true
            }
        }
    ],
    "icons": {
        "redleaf": {
            "iconUrl": "/vis.0/leaf-red.png",
            "iconSize": [25, 41],
            "shadowUrl": "/vis.0/leaf-shadow.png",
            "shadowSize": [25, 41],
            "iconAnchor": [14, 39],
            "shadowAnchor": [3, 39],
            "popupAnchor": [50, 50]
        }
    }
}
```

### 地点时间线
“位置时间轴”组件可显示最多五人的每日位置历史记录。其布局灵感源自移动地图应用程序的地图和时间轴交互方式，但并未照搬任何特定应用程序的设计。

每个配置的跟踪数据点必须包含一个组合的WGS84位置：

```text
50.11552,8.68417
```

为了进行测试，请将 [`example/LocationTimeline/create-example-track.js`](example/LocationTimeline/create-example-track.js) 复制到 JavaScript 适配器脚本中。它会创建一个可配置的示例日，并将原始位置存储在 `history.0` 到 `storeState` 中。

对于选定的本地日历日期，该组件会从 `history.0` 请求未聚合的值。日期边界和夏令时变更遵循浏览器的时区。如果今天没有历史记录，则当前状态显示为单个标记。没有历史记录的过去日期将显示为空白。

该组件会移除孤立的、不合理的 GPS 跳跃数据，并将附近的样本归类为停留点。以下选项控制此处理过程：

- **时间轴布局**：自动、地图旁或地图下方
- **配色方案**（`timeline_theme`）：自动、浅色或深色

时间线控件、列表和对话框

- **地图配色方案** (`mapwidgets_maptheme`): 自动、浅色或深色

仅限 OpenStreetMap 图块

- **停留半径**：属于一次停留的样本的最大距离（默认值为 75 米）
- **最短停留时间**：最短停留时长（默认 10 分钟）
- **最大合理速度**：孤立 GPS 跳跃的阈值

（默认值 300 公里/小时；`0` 禁用过滤器）

两种配色方案的默认值均为 `auto`，并遵循浏览器的 `prefers-color-scheme` 设置。它们可以单独选择，例如，将深色时间轴界面与浅色地图图块结合使用。地图主题不会过滤路线、标记或其他 Leaflet 叠加层。

已知地点和反向地理编码结果会保存在这些状态中，这些状态是在适配器安装期间创建的：

```text
vis-mapwidgets.0.timeline.places
vis-mapwidgets.0.timeline.geocodingCache
```

IndexedDB 用作快速本地缓存。状态写入操作在后台收集和执行。已解决的停留可以保存为已知地点，并带有可编辑的标签和半径。

已解决的地点以名称加较短的地址栏显示。路线箭头指示行进方向，停留标记和路线段在点击时都会选中匹配的时间线条目。

外部反向地理编码默认处于禁用状态。启用后，端点默认使用公共 Nominatim 反向 API。请求会进行去重和序列化，每次调用之间至少间隔 1.1 秒。请配置联系邮箱并注意 [Nominatim 使用政策](https://operations.osmfoundation.org/policies/nominatim/)。

位置坐标将发送到已配置的外部服务。

### 实用函数文档
以下功能可在 `window.iobroker.mapwidgets` 下使用。例如：

```js
window.iobroker.mapwidgets.waitForGlobal(...)
window.iobroker.mapwidgets.loadScript(...)
window.iobroker.mapwidgets.loadCSS(...)
```

`loadScript` 和 `loadCSS` 可用于动态加载 JavaScript 文件和 CSS 样式表，这对于使用地图小部件可能是必要的。

`waitForGlobal` 可用于等待 `window.` 下的全局变量。

这是必要的，因为地图变量只有在 vis.js 初始化地图组件后才可用。

#### `loadScript(src, { attrs = {}, timeout = 15000 } = {})`
将外部 JavaScript 文件动态加载到当前文档中。

##### 参数 loadScript
- **src**（`string`）

要加载的 JavaScript 文件的 URL。

- **attrs**（`object`，可选）

`<script>`元素的其他属性。支持的键：

- `type`: 例如 `"module"` 表示以 ES 模块形式加载。
- `integrity`: 子资源完整性 (SRI) 哈希。
- `crossOrigin`：跨域设置（`"anonymous"` 或 `"use-credentials"`）。
- **超时时间**（`数字`，可选，默认值：`15000`）

加载尝试失败前的最大等待时间（毫秒）。

##### 返回 loadScript
- **承诺**

脚本成功加载时解析，出错或超时时拒绝。

如果脚本已存在于文档中，则解析为 `"already-loaded"`。

##### 示例加载脚本
```js
loadScript('https://cdn.example.com/lib.min.js')
    .then(() => {
        console.log('Script loaded!');
    })
    .catch(console.error);
```

#### `loadCSS(href, { attrs = {}, timeout = 15000 } = {})`
将外部 CSS 样式表动态加载到当前文档中。

##### 参数 loadCSS
- **href**（`字符串`）

要加载的 CSS 文件的 URL。

- **attrs**（`object`，可选）

`<link>`元素的其他属性。支持的键：

- `integrity`: 子资源完整性 (SRI) 哈希。
- `crossOrigin`：跨域设置。
- `media`：用于条件加载的媒体查询

      （例如`"print"`、`"(min-width: 768px)"`）。

- **超时时间**（`数字`，可选，默认值：`15000`）

加载尝试失败前的最大等待时间（毫秒）。

##### 返回 loadCSS
- **承诺**

样式表成功加载时解析，出错或超时时拒绝。

如果样式表已存在于文档中，则解析为 `"already-loaded"`。

##### LoadCSS 示例
```js
loadCSS('https://cdn.example.com/theme.css').catch(console.error);
```

#### `waitForGlobal(path, interval = 100, timeout = 0)`
等待全局变量（或 `window` 的嵌套属性）可用。

##### 参数 waitForGlobal
- **路径**（`字符串`）

以点分隔的全局变量路径（例如 `"jQuery"`, `"MyLib.utils.helper"`）。

- **间隔**（`数字`，可选，默认值：`100`）

检查变量的间隔时间（以毫秒为单位）。

- **超时时间**（`数字`，可选，默认值：`0`）

最大等待时间（毫秒）。`0` 表示无限期等待。

##### 返回 waitForGlobal
- **承诺**

一旦找到对象，就使用找到的对象进行解析。

如果在找到对象之前超时，则拒绝解析。

##### 示例 waitForGlobal
```html
<script>
    waitForGlobal('iobroker.mapwidgets.w00001.map', 200, 5000)
        .then(map => {
            // map is now available
        })
        .catch(err => console.error(err.message));
</script>
```

## 待办事项
待定

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.3.3 (2026-08-11)

- remove vis dependency

### 0.3.2 (2026-08-10)

- switch support link to short link service

### 0.3.1 (2026-08-09)

- fix review problems

### 0.3.0 (2026-08-05)

- Added an independent automatic, light, or dark map color scheme to the Map
  Leaflet and Location Timeline widgets.

### 0.2.5 (2026-08-04)

- The dark theme has been adjusted to make the dialog easier to read.

Older entries are in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License

MIT License

Copyright (c) 2026 oweitman <oweitman@gmx.de>

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