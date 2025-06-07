---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/dev/adapterjsonconfig.md
title: ioBroker JSON 配置：初学者指南
hash: cKAza368CjBQjzeBBEFQSj0TMNxPcQ4mCpItJ4NpZhA=
---
# IoBroker JSON 配置：初学者指南
本指南介绍如何使用 JSON 格式定义 ioBroker 适配器的配置选项。这种方法提供了一种更方便用户且灵活的方式，可在 ioBroker 管理界面中管理适配器设置。

## 你需要什么
- ioBroker Admin 版本 6（或更新版本）
- 对 JSON 语法有基本的了解

JSON 配置的好处
- 改进了配置适配器的用户体验
- 更轻松地集成复杂的配置选项
- 适配器代码和配置之间明确分离

＃＃ 入门
1. **定义配置文件：**

- 在适配器的管理目录中创建一个名为“jsonConfig.json”或“jsonConfig.json5”的文件。
- JSON5 是 JSON 的超集，允许注释，使配置文件更具可读性。

2. **启用 JSON 配置：**

- 在适配器的 `io-package.json` 文件中，在 `common` 部分下添加以下行：

```json
"common": {
    "adminUI": {
        "config": "json"
    }
}
```

3. **配置文件的结构：**

配置文件定义了选项卡、面板和控制元素的层次结构。\ 每个元素都有特定的属性，决定了其在管理界面中的行为和外观。

jsonConfig 自动确保将收集的数据记录为适配器的配置数据并在内部存储，以便可以在适配器中检索和进一步处理。

以下示例将创建以下配置对象：

```json5
{
  options1: {
    myPort: 1234,
    options: {
      myType: 1,
    },
    myBool: false,
  },
}
```

如果属性名称以“\_”开头，则不会保存在对象中。

## 具有多个选项卡的 jsonConfig 示例
```json5
{
    "type": "tabs",
    "items": {
        "options1": {
            "type": "panel",
            "label": "Tab1",
            "icon": "base64 svg", // optional
            "items": {
                myPort: {
                    "type": "number",
                    "min": 1,
                    "max": 65565,
                    "label": "Number",
                    "sm": 6, // 1 - 12
                    "validator": "!!data.name", // else error
                    "hidden": "data.myType === 1", // hidden if myType is 1
                    "disabled": "data.myType === 2" // disabled if myType is 2
                },
                "options.myType": { // name could support more than one level
                    "newLine": true, // must start from new row
                    "type": "select",
                    "label": "Type",
                    "sm": 6, // 1 - 12
                    "options": [
                        {"label": "option 1", "value": 1},
                        {"label": "option 2", "value": 2}
                    ]
                },
                "myBool": {
                    "type": "checkbox",
                    "label": "My checkbox",
                },
                "_notSaved":"abc"
            }
        },
        "tab2": {
            "label": "Tab2",
            "type": "panel",
            "disabled": "data.myType === 1",
            "hidden": "data.myType === 2",
        }
    },
}
```

在 GitHub 上相应的管理目录中，可以找到许多其他适配器中的更多示例。

## 支持开发工具
### VS 代码
为了在 VS 代码中启用 jsonConfig 的验证，必须将以下部分添加到文件“.vscode/settings.json”。

```json5
    "json.schemas": [
        {
            "fileMatch": ["admin/jsonConfig.json", "admin/jsonCustom.json", "admin/jsonTab.json"],
            "url": "https://raw.githubusercontent.com/ioBroker/ioBroker.admin/master/packages/jsonConfig/schemas/jsonConfig.json"
        }
    ]
```

## 常见控制元素
jsonConfig 由多个按层次结构排列的元素组成。\ 每个元素可以是以下类型之一。\ 某些元素可以包含其他子元素。

如果您测试此适配器：[jsonconfig-演示](https://github.com/mcm4iob/ioBroker.jsonconfig-demo)，则可以看到几乎所有组件都在运行。\ 您可以通过管理员中的 GitHub 图标在 npm 选项卡上输入 `iobroker.jsonconfig-demo` 来安装它。

- [**`accordion`:**](#accordion) 用于可折叠内容的手风琴元素（Admin 6.6.0 或更新版本）
- [**`alive`:**](#alive) 显示实例是否正在运行（只读）
- [**`autocomplete`:**](#autocomplete) 带有自动完成建议的输入字段
- [**`autocompleteSendTo`:**](#autocompletesendto) 使用实例值自动完成控件来发送数据
- [**`certificate`:**](#certificate) 管理安全连接的证书
- [**`certificateCollection`:**](#certificatecollection) 选择 Let's Encrypt 证书的集合
- [**`certificates`:**](#certificates) 用于管理不同证书类型的通用类型（从 Admin 6.4.0 开始）
- [**`checkbox`:**](#checkbox) 布尔值复选框
- [**`checkLicense`:**](#checklicense) 非常特殊的组件，用于在线检查许可证
- [**`chips`:**](#chips) 用户可以输入添加到数组的单词
- [**`color`:**](#color) 颜色选择器
- [**`cron`:**](#cron) 配置 cron 表达式来安排任务
- [**`custom`:**](#custom) 集成自定义组件以实现特定功能（仅限 Admin 6）
- [**`datePicker`:**](#datepicker) 允许用户选择日期
- [**`deviceManager`:**](#devicemanager) 显示设备管理器
- [**`divider`:**](#divider) 创建水平线分隔符
- [**`file`:**](#file) 具有文件选择和可选上传/下载功能的输入字段（仅限管理员 6）
- [**`fileSelector`:**](#fileselector) 允许用户从系统中选择文件（仅限 Admin6）
- [**`func`:**](#func) 从 enum.func 列表中选择一个函数（仅限 Admin 6）
- [**`header`:**](#header) 创建具有不同大小的标题 (h1-h5)
- [**`image`:**](#image) 上传或显示图片
- [**`imageSendTo`:**](#imagesendto) 显示从后端接收的图像并根据命令发送数据
- [**`instance`:**](#instance) 选择一个适配器实例
- [**`interface`:**](#interface) 选择实例运行的主机接口
- [**`ip`:**](#ip) 带有高级选项的 IP 地址输入字段
-[**`jsonEditor`:**](#jsoneditor) 用于复杂配置数据的 JSON 编辑器
- [**`language`:**](#language) 选择用户界面语言
- [**`license`:**](#license) 如果尚未接受，则显示许可证信息。
- [**`number`:**](#number) 具有最小/最大值和步长的数字输入字段
- [**`oauth2`:**](#oauth2) 对适配器进行 OAuth2 身份验证（Admin 7.6.18 或更新版本）
- [**`objectId`:**](#objectid) 选择带有名称、颜色和图标的对象 ID
- [**`panel`:**](#panel) 带有项目的选项卡
- [**`password`:**](#password) 密码输入字段
- [**`pattern`:**](#pattern) 显示模式的只读字段（例如 URL）
- [**`port`:**](#port) 端口的特殊输入
- [**`qrCode`:**](#qrcode) 将数据显示为二维码（Admin 7.0.18 或更新版本）
- [**`room`:**](#room) 从 `enum.room` 列表中选择一个房间（仅限管理员 6）
- [**`select`:**](#select) 带有预定义选项的下拉菜单
- [**`selectSendTo`:**](#selectsendto) 带有用于发送数据的实例值的下拉菜单
- [**`sendTo`:**](#sendto) 向实例发送请求的按钮
- [**`setState`:**](#setstate) 设置实例状态的按钮
- [**`slider`:**](#slider) 用于选择范围内值的滑块（仅限管理员 6）
- [**`state`:**](#state) 显示来自状态的控制或信息 (admin >= 7.1.0)
- [**`staticImage`:**](#staticimage) 显示静态图像
- [**`staticInfo`:**](#staticinfo) 以预格式化的形式显示静态信息，如“标题：值单位”(admin >= 7.3.3)
- [**`staticLink`:**](#staticlink) 创建静态链接
- [**`staticText`:**](#statictext) 显示静态文本（例如描述）
- [**`coordinates`:**](#coordinates) 确定当前位置，如果无法以“纬度，经度”形式使用 `system.config` 坐标
- [**`table`:**](#table) 可以添加、删除或重新排序的行的表
- [**`tabs`:**](#tabs) 带有项目的标签页
- [**`text`:**](#text) 单行或多行文本输入字段
- [**`textSendTo`:**](#textsendto) 显示根据实例值给定的只读控件。
- [**`timePicker`:**](#timepicker) 允许用户选择时间
- [**`user`:**](#user) 从 `system.user` 列表中选择一个用户
- [**`uuid`:**](#uuid) 显示 iobroker 的 UUID

通过利用 JSON 配置，您可以为您的 ioBroker 适配器创建用户友好且适应性强的配置体验。

## 示例项目
| 类型 | 链接 |
|-------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 多个标签页：| [`ioBroker.admin`](https://github.com/ioBroker/ioBroker.admin/blob/master/admin/jsonConfig.json5) |
| 自定义组件：| [`telegram`](https://github.com/iobroker-community-adapters/ioBroker.telegram/tree/master/src-admin) 或在 [`pushbullet`](https://github.com/Jens1809/ioBroker.pushbullet/tree/master/src-admin) |
| 自定义组件：| [`telegram`](https://github.com/iobroker-community-adapters/ioBroker.telegram/tree/master/src-admin) 或 [`pushbullet`](https://github.com/Jens1809/ioBroker.pushbullet/tree/master/src-admin) |
| 验证：| |

## 大型配置的分离
## 包括
需要管理员 6.17.1 或更新版本。

要编写复杂的 JSON 文件，您可以包含其他 JSON 文件。
包含的文件必须与主文件位于同一目录中。

```json5
{
  tabs: {
    tab1: {
      type: "panel", // data will be combined with the content of "tab1.json". If the same attribute is defined in both files, the value from the included file will be used.
      "#include": "tab1.json",
    },
  },
}
```

## I18n - 国际化
提供翻译的选项有多种。只有第一个与我们的社区翻译工具 Weblate 兼容，因此应该优先选择它！

要启用翻译功能，您需要在 JSON 配置对象的顶层提供并启用 i18n 属性。

```json5
{
  i18n: true,
}
```

### 独立文件翻译：兼容 weblate
默认情况下，文件必须位于以下目录中：

```text
admin/i18n/de/translations.json
admin/i18n/en/translations.json
```

或者

```text
admin/i18n/de.json
admin/i18n/en.json
```

此外，用户可以提供`i18n`文件、`i18n`：`customI18n`的路径，并在管理员中提供文件：

```json5
  i18n: "customI18n",
```

```text
admin/customI18n/de/translations.json
admin/customI18n/en/translations.json
```

或者

```text
admin/customI18n/de.json
admin/customI18n/en.json
```

文件的结构对应以下结构

**en.json:**

```json5
{
  i18nText1: "Open",
  i18nText2: "Close",
  "This is a Text": "This is a Text",
}
```

**de.json:**

```json5
{
  i18nText1: "Öffnen",
  i18nText2: "Schließen",
  "This is a Text": "Dies ist ein Text",
}
```

搜索翻译时，特定字段中的信息用于查找文件中包含文本的属性。如果未找到该属性，则保留该字段中的信息。建议使用英文输入文本。

### 直接在字段中提供翻译
所有可包含文本的字段均可指定翻译。例如，标签、标题、工具提示、文本等字段。

```json5
   "type": "text",
   "label: {
        "en": "house",
        "de": "Haus"
    }
}
```

### 直接在 i18n 中提供翻译
翻译也可以直接作为`jsonConfig` 对象顶层的`i18n` 属性中的对象提供。

搜索翻译时，特定字段中的信息用于查找 i18n 对象中文本对应的属性。
如果未找到该属性，则保留该字段中的信息。
建议输入英文文本。

## 元素类型
每个元素可以具有[共同属性](#common-attributes-of-controls)以及属于相应类型的特殊属性，如下所示

###`tabs`
包含项目的标签页

| 属性 | 描述 |
|-----------------|------------------------------------------------------------------------------------------------|
| `items` | 带面板的对象`{"tab1": {}, "tab2": {}...}` |
| `tabsStyle` | Mui-Tabs 组件的 React 格式的 CSS 样式（`marginLeft` 而不是 `margin-left`）|
| `tabsStyle` | Mui-Tabs 组件的 React 格式的 CSS 样式（`marginLeft` 而不是 `margin-left`）|

###`panel`
带有项目的标签

| 属性 | 描述 |
|---------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| `icon` | 选项卡可以包含图标（base64，如`data:image/svg+xml;base64,...`）或`jpg/png` 图像（以`.png` 结尾）|
| `items` | 对象`{"attr1": {}, "attr2": {}}...` |
| `collapsable` | 仅可能不属于标签[jsonConfig.json](..%2F..%2F..%2F..%2F..%2FioBroker.ring%2Fadmin%2FjsonConfig.json) |
| `color` | 可折叠标题的颜色`primary` 或`secondary` 或无 |
| `innerStyle` | Panel 组件内部 div 的 React 格式 CSS 样式（`marginLeft` 而非 `margin-left`）。不适用于可折叠面板。|
| `innerStyle` | Panel 组件内部 div 的 CSS 样式，采用 React 格式（`marginLeft` 而非 `margin-left`）。不适用于可折叠面板。|

###`text`
文本组件

| 属性 | 描述 |
|-------------------|--------------------------------------------------------------------------------------------------------|
| `maxLength` | 字段中文本的最大长度 |
| `copyToClipboard` | 显示“复制到剪贴板”按钮，但仅当禁用或只读为真时 |
| `trim` | 默认为 true。如果不需要修剪，请将此属性设置为 `false`。|
| `minRows` | 默认值为 1。如果您想要一个包含多行的文本区域，请将此属性设置为 `2` 或更大。|
| `maxRows` | 文本区域的最大行数。仅当 `minRows` > 1 时使用。|
| `noClearButton` | 如果为真，则不会显示清除按钮（管理员 >= 6.17.13）|
| `validateJson` | 如果为真，则文本将被验证为 JSON |
| `allowEmpty` | 如果为真，则仅当值不为空时才会验证 JSON |
| `time` | 该值是以毫秒为单位的时间或字符串。仅与 readOnly 标志一起使用 |
| `time` | 值是以毫秒为单位的时间或字符串。仅与 readOnly 标志一起使用 |

###`number`
| 属性 | 描述 | 备注 |
|----------|---------------|----------------|
| `min` | 最小值 | |
| `step` | 步骤 | |
| `unit` | 单位 | 管理员 >= 7.4.9 |
| `单位` | 单位 | 管理员 >= 7.4.9 |

###`color`
颜色选择器

| 属性 | 描述 |
|-----------------|----------------------------------------------------------------|
| `noClearButton` | 如果为真，则不会显示清除按钮（管理员 >= 6.17.13）|

###`checkbox`
显示复选框

###`slider`
显示滑块（仅限 Admin6）

| 属性 | 描述 |
| -------- | ----------------------------- |
| `min` | （默认 0）|
| `step` | （默认`(max - min) / 100`）|
| `unit` | 滑块单位 |
| `unit` | 滑块单位 |

###`qrCode`
在二维码中显示数据（管理员 >= 7.0.18）

| 属性 | 描述 |
| --------- | ------------------------------------- |
| `data` | 要在二维码中编码的数据 |
| `fgColor` | 前景色 |
| `bgColor` | 背景颜色 |
| `level` | 二维码等级 (`L` `M` `Q` `H`) |
| `level` | 二维码级别 (`L` `M` `Q` `H`) |

###`ip`
绑定地址

| 属性 | 描述 |
|--------------------|-----------------------------------|
| `listenOnAllPorts` | 将 0.0.0.0 添加到选项 |
| `onlyIp6` | 仅显示 IP6 地址 |
| `noInternal` | 不显示内部 IP 地址 |
| `noInternal` | 不显示内部 IP 地址 |

###`user`
从 system.user 中选择用户。（带有颜色和图标）

| 属性 | 描述 |
|----------|-----------------|
| `short` | 没有系统用户。|

###`room`
从`enum.room`中选择房间（带颜色和图标）-（仅限 Admin6）

| 属性 | 描述 |
|-------------------|--------------------------|
| `short` | 没有`enum.rooms.` |
| `allowDeactivate` | 允许让房间空置 |

###`func`
从`enum.func`中选择功能（带颜色和图标）-（仅限 Admin6）

| 属性 | 描述 |
|-------------------|-----------------------------------|
| `short` | 没有`enum.func.` |
| `allowDeactivate` | 允许将功能留空 |

###`select`
| 属性 | 描述 |
|-----------------|---------------------------------------------------------------------------|
| `options` | 带有标签、可选翻译、可选分组和值的对象 |
| `showAllValues` | 即使未找到标签也显示项目（多个），默认=`true` |
| `showAllValues` | 即使未找到标签也显示项目（多个），默认值 =`true` |

#### `select options` 的示例
```json
[
  {"label": {"en": "option 1"}, "value": 1}, ...
]
```

或者

```json
[
   {
      "items": [
         {"label": "Val1", "value": 1},
         {"label": "Val2", "value": 2}
         ],
      "name": "group1"
   },
   {
      "items": [
         {"label": "Val3", "value": 3},
         {"label": "Val4", "value": 4}
      ],
      "name": "group2"
   },
   {"label": "Val5", "value": 5}
]
```

###`autocomplete`
| 属性 | 描述 |
|------------|---------------------------------------------------------------------------------------------------------------|
| `options` | `["value1", "value2", ...]` 或 `[{"value": "value", "label": "Value1"}, "value2", ...]`（键必须是唯一的）|
| `freeSolo` | 将 `freeSolo` 设置为 `true`，这样文本框就可以包含任意值。|

###`image`
将图像保存为`adapter.X`对象的文件或属性中的base64格式

| 属性 | 描述 |
|--------------|----------------------------------------------------------------------------------------------------------------------------------------|
| `filename` | 文件名为结构名称。以下示例中，`login-bg.png` 是 `writeFile("myAdapter.INSTANCE", "login-bg.png")` 的文件名 |
| `maxSize` | 上传文件的最大大小 |
| `base64` | 如果为真，图像将保存为属性中的 data-url，否则保存为文件存储中的二进制文件 |
| `crop` | 如果为真，则允许用户裁剪图像 |
|`!maxWidth`||
|`!maxHeight`||
| `!square` | 宽度必须等于高度，或者裁剪必须只允许正方形作为形状 |
| `!square` | 宽度必须等于高度，或者裁剪必须只允许正方形作为形状 |

#### `image` 的示例
```json
  "login-bg.png": {
       "type": "image",
       "accept": "image/png",
       "label": {
         "en": "Upload image"
       },
       "crop": true
     },
     "picture": {
       "type": "image",
       "base64": true,
       "accept": "image/*",
       "label": {
         "en": "Upload image"
       },
       "crop": true
     }
  }
```

###`oauth2`
（管理员 >= 6.17.18）

显示 OAuth2 身份验证按钮以获取适配器的刷新和访问令牌。

要使用此功能，您必须首先向 ioBroker 维护团队提供 OAuth2 数据（客户端 ID、密钥等），以便他们将其添加到云端。

| 属性 | 描述 |
|----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `identifier` | Oauth2 标识符，如 `spotify`、`google`、`dropbox`、`microsoft` |
| `scope` | 可选范围以空格分隔，例如 `user-read-private user-read-email` |
| `refreshLabel` | 用于刷新令牌的可选按钮标签 |
| `refreshLabel` | 用于刷新令牌的可选按钮标签 |

#### `oauth2` 的示例
```json
  "_oauth2": {
       "type": "oauth2",
       "identifier": "spotify",
       "label": "Get Spotify OAuth2 Token",
       "label": "Refresh Spotify OAuth2 Token",
       "icon": "data:image/svg+xml;base64,...",
  }
```

另请参阅[OAUTH2.md](OAUTH2.md)以了解更多信息。

###`objectId`
对象 ID：用名称、颜色和图标显示

| 属性 | 描述 |
|----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `types` | 所需类型：`channel`、`device`、...（默认只有`state`）。它是复数，因为`type` 已被占用。|
| `customFilter` | [可选] 不能与 `type` 设置一起使用。它是一个对象，而不是 JSON 字符串。|
| `filterFunc` | [可选] 不能与 `type` 设置一起使用。它是一个函数，每个对象都会调用，并且必须返回 true 或 false。示例：`obj.common.type === 'number'` |
| `filterFunc` | [可选] 不能与 `type` 设置一起使用。它是一个函数，每个对象都会调用，并且必须返回 true 或 false。例如：`obj.common.type === 'number'` |

#### `customFilter` 的示例
##### 仅显示具有某些自定义设置的对象
`{common: {custom: true}}`

##### 仅显示具有 sql.0 自定义设置的对象（仅限特定实例）
`{common: {custom: 'sql.0'}}`

##### 仅显示适配器`influxdb`或`sql`或`history`的对象
`{common: {custom: '_dataSources'}}`

##### 仅显示特定适配器（所有实例）的自定义设置对象
`{common: {custom: 'adapterName.'}}`

##### 仅显示频道
`{type: 'channel'}`

##### 仅显示频道和设备
`{type: ['channel', 'device']}`

##### 仅显示“数字”类型的状态
`{common: {type: 'number'}`

##### 仅显示“数字”和“字符串”类型的状态
`{common: {type: ['number', 'string']}`

##### 仅显示角色从 switch 开始的状态
`{common: {role: 'switch'}`

##### 仅显示角色从`switch` 和`button` 开始的状态
`{common: {role: ['switch', 'button']}`

###`password`
此字段类型仅对 UI 有影响。
密码和其他敏感数据应加密存储！为此，必须在 io-package.json 的 [本机加密](https://github.com/ioBroker/ioBroker.js-controller#automatically-encryptdecrypt-configuration-fields) 下提供密钥。
此外，您可以通过将此属性添加到 `io-package.json` 文件中的 `protectedNative` 来保护此属性不被提供给除 `admin` 和 `cloud` 之外的其他适配器。

| 属性 | 描述 |
|-------------|---------------------------------------------------------------------------------------------------------|
| `repeat` | 重复密码必须与密码进行比较 |
| `readOnly` | 只读标志。如果 readOnly 为真，则 Visible 自动为真 |
| `maxLength` | 字段中文本的最大长度 |
| `maxLength` | 字段中文本的最大长度 |

###`instance`
| 属性 | 描述 |
|-------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `adapter` | 适配器的名称。使用特殊名称`_dataSources`，您可以获取所有带有标志`common.getHistory`的适配器。|
| `allowDeactivate` | 如果为真，则显示附加选项“停用”|
| `onlyEnabled` | 如果为真，则仅显示已启用的实例 |
| `long` | 值将类似于`system.adapter.ADAPTER.0` 而不是`ADAPTER.0` |
| `short` | 值将类似于`0` 而不是`ADAPTER.0` |
| `all` | 将选项“全部”选项添加到值为`*` |
| `all` | 向选项“all”选项添加值 `*` |

###`chips`
用户可以输入单词，该单词将被添加（参见云 => 服务 => 白名单）。如果未定义`delimiter`，则输出为数组。

| 属性 | 描述 |
|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `delimiter` | 如果已定义，则该选项将存储为带分隔符的字符串，而不是数组。例如，`delimiter=;` 将获得 `a;b;c`，而不是 `['a', 'b', 'c']` |

###`alive`
仅指示实例是否处于活动状态，并且可以在“隐藏”和“禁用”状态下使用（不会保存在配置中）

仅文本：实例正在运行，实例未运行

| 属性 | 描述 |
|----------------|-------------------------------------------------------------------------------------------------------------------------------------|
| `instance` | 检查实例是否处于活动状态。如果未定义，则将使用当前实例。您可以在文本中使用`${data.number}`模式。|
| `textNotAlive` | 默认文本为 `Instance %s is not alive`，其中 %s 将被替换为 `ADAPTER.0`。翻译必须存在于 i18n 文件中 |
| `textNotAlive` | 默认文本为“实例 %s 未处于活动状态”，其中 %s 将被替换为“ADAPTER.0”。翻译必须存在于 i18n 文件中 |

###`pattern`
具有类似“https://${data.ip}:${data.port}”模式的只读字段（不会保存在配置中）带有只读标志的文本输入，显示一种模式。

| 属性 | 描述 |
|-------------------|-----------------------|
| `copyToClipboard` | 如果为真 - 显示按钮 |
| `图案` | 我的图案 |

###`sendTo`
向实例发送请求的按钮（<https://github.com/iobroker-community-adapters/ioBroker.email/blob/master/admin/index_m.html#L128>）

| 属性 | 描述 |
|-----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `command` | （默认`send`）|
| `data` | 对象 - `{"subject1": 1, "data": "static"}`。您可以指定 jsonData 或 data，但不能同时指定两者。|
| `result` | `{result1: {en: 'A'}, result2: {en: 'B'}}` |
| `error` | `{error1: {en: 'E'}, error2: {en: 'E2'}}` |
| `variant` | `contained`、`outlined` 或无。按钮的变体。|
| `openUrl` | 如果为 true - 如果响应包含属性 `openUrl`，例如 `{"openUrl": "http://1.2.3.4:80/aaa", "window": "_blank", "saveConfig": true}`，则在新标签页中打开 URL。如果 `saveConfig` 为 true，则将要求用户保存配置。|
| `reloadBrowser` | 如果为 true - 重新加载当前浏览器窗口，如果响应包含属性`reloadBrowser`，例如`{"reloadBrowser": true}`。|
| `window` | 如果 `openUrl` 为真，则这是新窗口的名称。如果响应包含 `window` 属性，则可以被覆盖。`this.props.socket.sendTo(adapterName.instance, command \|\| 'send', data, result => {});` |
| `icon` | 是否应显示图标：`auth`、`send`、`web`、`warning`、`error`、`info`、`search`。您可以使用`base64`图标（例如`data:image/svg+xml;base64,...`）或`jpg/png`图像（以`.png`结尾）。（如果您需要更多图标，请通过问题提出请求）|
| `useNative` | 如果适配器返回的结果带有`native`属性，则该属性将用于配置。如果`saveConfig`为真，则将请求用户保存配置。|
| `showProcess` | 请求进行中时显示旋转器 |
| `timeout` | 请求超时（毫秒）。默认值：无。|
| `onLoaded` | 最初执行一次按钮逻辑 |
| `controlStyle` | 按钮的样式。|
| `controlStyle` | 按钮的样式。|

###`setState`
设置实例状态的按钮

| 属性 | 描述 |
|-----------|-----------------------------------------------------------------------------------------------------------------------------------|
| `id` | `system.adapter.myAdapter.%INSTANCE%.test`，您可以使用占位符`%INSTANCE%`将其替换为当前实例名称 |
| `val` | `${data.myText}\_test` 或数字。类型将根据状态类型自动检测并完成转换 |
| `okText` | 按下按钮将显示警报 |
| `variant` | `contained`, `outlined`, '' |
| `变体` | `包含`, `概述`, '' |

###`staticText`
静态文本（如描述）

| 属性 | 描述 |
|----------|---------------------|
| `label` | 多语言文本 |
| `text` | 与标签相同 |

必须指定 `label` 或 `text` 中的一个，不能同时指定

###`staticLink`
| 属性 | 描述 |
|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `label` | 多语言文本 |
| `target` | `_blank` 或 `_self` 或窗口名称 |
| `close` | 如果为真，则 GUI 将被关闭（不是用于管理员中的 JsonConfig，而是用于动态 GUI）|
| `button` | 将链接显示为按钮 |
| `variant` | 按钮类型（`outlined`、`contained`、`text`）|
| `color` | 按钮颜色（例如 `primary`）|
| `icon` | 是否应显示图标：`auth`、`send`、`web`、`warning`、`error`、`info`、`search`、`book`、`help`、`upload`。您可以使用`base64`图标（以`data:image/svg+xml;base64,...`开头）或`jpg/png`图像（以`.png`结尾）。（如果您需要更多图标，请通过问题请求）|
| `icon` | 是否显示图标：`auth`、`send`、`web`、`warning`、`error`、`info`、`search`、`book`、`help`、`upload`。您可以使用 `base64` 图标（以 `data:image/svg+xml;base64,...` 开头）或 `jpg/png` 图像（以 `.png` 结尾）。（如果您需要更多图标，请通过 issue 请求）|

###`staticImage`
| 属性 | 描述 |
|----------|----------------------------------------|
| `href` | 可选 HTTP 链接 |
| `src` | 图片名称（来自管理目录）|

###`table`
包含可删除、添加、上移、下移项目的表格

| 属性 | 描述 |
|-----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| `items` | `[{"type": see above, "width": px or %, "title": {"en": "header"}, "attr": "name", "filter": false, "sort": true, "default": ""}]` |
| `objKeyName` | （旧设置，请勿使用！） - `{"192.168.1.1": {delay: 1000, enabled: true}, "192.168.1.2": {delay: 2000, enabled: false}}` 中的密钥名称 |
| `objValueName` | （旧设置，请勿使用！） - `{"192.168.1.1": "value1", "192.168.1.2": "value2"}` 中的值的名称 |
| `allowAddByFilter` | 即使设置了过滤器，也允许添加 |
| `showSecondAddAt` | 表格底部第二个添加按钮显示的行数。默认 5 |
| `showFirstAddOnTop` | 在第一列的顶部显示第一个加号按钮，而不是在左侧。|
| `clone` | [可选] - 是否显示克隆按钮。如果为 true，则会显示克隆按钮。如果属性名称为 true，则此名称必须是唯一的。|
| `export` | [可选] - 是否显示导出按钮。导出为 csv 文件。|
| `import` | [可选] - 是否显示导入按钮。从 csv 文件导入。|
| `uniqueColumns` | [可选] - 指定列数组，这些列需要具有唯一的条目 |
| `encryptedAttributes` | [可选] - 指定应加密的列数组 |
| `compact` | [可选] - 如果为真，表格将以紧凑模式显示 |
| `compact` | [可选] - 如果为 true，表格将以紧凑模式显示 |

###`accordion`
可删除、添加、上移、下移项目的手风琴（Admin 6.6.0 及更新版本）

| 属性 | 描述 |
|-------------|-------------------------------------------------------------------------------------------------------------------------------------|
| `items` | `[{"type": see above, "attr": "name", "default": ""}]` 项目可以像`panel` （xs、sm、md、lg 和 newLine）一样放置 |
| `noDelete` | 布尔值，如果删除或添加被禁用，如果`noDelete`为假，则添加、删除和上/下移动应该可以工作|
| `clone` | [可选] - 是否显示克隆按钮。如果为 true，则会显示克隆按钮。如果属性名称为 true，则此名称必须是唯一的。|
| `clone` | [可选] - 是否显示克隆按钮。如果为 true，则会显示克隆按钮。如果属性名称为唯一，则此名称必须是唯一的。|

###`jsonEditor`
打开 JSON(5) 编辑器的按钮。管理员版本 5.7.3 开始支持 JSON5。

| 属性 | 描述 |
|------------------------|-----------------------------------------------------------------------|
| `validateJson` | 如果为假，则文本将不会被验证为 JSON |
| `json5` | 如果允许 JSON5 格式（从 7.5.3 开始）|
| `doNotApplyWithError` | 如果 JSON 或 JSON5 中出现错误，则不允许保存该值（从 7.5.3 开始）|
| `doNotApplyWithError` | 如果 JSON 或 JSON5 中出现错误，则不允许保存值（从 7.5.3 开始）|

###`language`
选择语言

| 属性 | 描述 |
|----------|----------------------------------------------------------------------------------------------------------------------|
| `system` | 允许使用`system.config` 中的系统语言作为默认语言（如果选择，则为空字符串值）|

###`certificate`
| 属性 | 描述 |
|------------|----------------------------------------------------------------------------------------|
| `certType` | 属于：`public`、`private`、`chained`。但从 6.4.0 开始，您可以使用 `certificates` 类型。|

###`certificates`
它是一个通用类型，可以管理`certPublic`、`certPrivate`、`certChained` 和 `leCollection` 属性。
示例：

```json
{
  "_certs": {
    "type": "certificates",
    "newLine": true,
    "hidden": "!data.secure",
    "sm": 12
  }
}
```

###`certificateCollection`
选择一个证书集合或者只使用所有集合或者根本不使用加密。

| 属性 | 描述 |
|--------------------|------------------------------------|
| `leCollectionName` | 证书集合的名称 |

###`custom`
仅限 Admin6

| 属性 | 描述 |
|---------------|--------------------------------------------------------------------------------------------------------------------------------|
| `name` | 将通过 props 提供的组件名称，如 `ComponentInstancesEditor` |
| `i18n` | 如果 `i18n/xx.json` 文件与组件或翻译对象位于同一目录中，则为 true `{"text1": {"en": Text1"}}` |
| `bundlerType` | 如果模块使用 TypeScript 编写，请将其设置为 `module`。从 Admin 7.5.x 开始 |
| `bundlerType` | 如果模块使用 TypeScript 编写，请将其设置为 `module`。从 Admin 7.5.x 开始 |

#### URL 示例
- `custom/customComponents.js`：在这种情况下，文件将从 `/adapter/ADAPTER_NAME/custom/customComponents.js` 加载
- `https://URL/myComponent`：直接从 URL 获取
- `./adapter/ADAPTER_NAME/custom/customComponent.js`：在这种情况下，文件将从 `/adapter/ADAPTER_NAME/custom/customComponents.js` 加载

###`datePicker`
允许用户选择日期输入，UI 格式来自配置

###`timePicker`
允许用户选择日期输入，返回的字符串是可解析的日期字符串或格式`HH:mm:ss`

| 属性 | 描述 |
|----------------|------------------------------------------------------------------------------------------------------|
| `format` | 传递给日期选择器的格式默认为`HH:mm:ss` |
| `timeSteps` | 表示每个视图可用的时间步长。默认为 `{ hours: 1, minutes: 5, seconds: 5 }` |
| `returnFormat` | `fullDate` 或 `HH:mm:ss`。出于向后兼容的原因，默认为完整日期。|
| `returnFormat` | `fullDate` 或 `HH:mm:ss`。出于向后兼容的原因，默认为完整日期。|

###`divider`
水平线

| 属性 | 描述 |
|----------|--------------------------------------------------|
| `height` | 可选高度 |
| `color` | 可选分隔线颜色或 `primary`、`secondary` |

###`header`
| 属性 | 描述 |
|----------|--------------|
|`text`||
| `尺寸` | 1-5 => h1-h5 |

###`cron`
显示 CRON 设置。您有 3 个选项：

- `simple` - 显示简单的 CRON 设置
- `复杂` - 显示 CRON 的“分钟”、“秒”等
- 非“简单”或“复杂” - 用户可以在对话框中在简单和复杂之间切换

| 属性 | 描述 |
|-----------|-----------------------------------------------|
| `complex` | 以“分钟”、“秒”等为单位显示 CRON |
| `简单` | 显示简单的 CRON 设置 |

###`fileSelector`
从下拉菜单中的一个文件夹中选择一个文件。如果需要，您可以上传一个新文件到此文件夹。

仅限 Admin6

| 属性 | 描述 |
|--------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `pattern` | 文件扩展名模式。允许使用 `**/*.ext` 显示子文件夹中的所有文件，`*.ext` 显示根文件夹中的所有文件，或使用 `folderName/*.ext` 显示子文件夹中的所有文件 `folderName`。默认使用 `**/*.*`。|
| `objectID` | 对象 ID 类型为 `meta`。您可以使用特殊占位符 `%INSTANCE%`：例如 `myAdapter.%INSTANCE%.files` |
| `upload` | 上传文件的存储路径。类似 `folderName`。如果未定义，则不会显示上传字段。要在根目录中上传，请将此字段设置为 `/`。|
| `refresh` | 在选择附近显示刷新按钮。|
| `maxSize` | 最大文件大小（默认 2MB）|
| `withFolder` | 即使所有文件都在同一个文件夹中，也显示文件夹名称 |
| `delete` | 允许删除文件 |
| `noNone` | 不显示`none`选项|
| `noSize` | 不显示文件大小 |
| `noSize` | 不显示文件大小 |

###`file`
带有文件选择器的输入字段。它将显示为一个文本字段，旁边有一个按钮用于打开对话框。
仅限 Admin6。

| 属性 | 描述 |
|---------------------|------------------------------------------------------------------------------------------|
| `disableEdit` | 如果用户可以手动输入文件名，而不仅仅是通过选择对话框|
| `filterFiles` | 喜欢 `['png', 'svg', 'bmp', 'jpg', 'jpeg', 'gif']` |
| `allowUpload` | 允许上传文件 |
| `allowDownload` | 允许下载文件（默认为 true）|
| `allowCreateFolder` | 允许创建文件夹 |
| `allowView` | 允许平铺视图（默认为 true）|
| `showToolbar` | 显示工具栏（默认为 true）|
| `selectOnlyFolders` | 用户只能选择文件夹（例如上传路径）|
| `trim` | 修剪文件名 |
| `trim` | 修剪文件名 |

###`imageSendTo`
显示从后端接收的 base64 字符串形式的图像

| 属性 | 描述 |
|------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `width` | QR 码宽度（像素）|
| `command` | sendTo 命令 |
| `jsonData` | 字符串 - `{"subject1": "${data.subject}", "options1": {"host": "${data.host}"}}`。此数据将发送至后端 |
| `data` | 对象 - `{"subject1": 1, "data": "static"}`。您可以指定 jsonData 或 data，但不能同时指定。如果 jsonData 未定义，则此数据将发送到后端。|
| `data` | object - `{"subject1": 1, "data": "static"}`。您可以指定 jsonData 或 data，但不能同时指定。如果 jsonData 未定义，则此数据将发送到后端。|

#### `imageSendTo` 后端代码示例
```js
adapter.on("message", (obj) => {
  if (obj.command === "send") {
    const QRCode = require("qrcode");
    QRCode.toDataURL(
      "3ca4234a-fd81-fdb8-5584-08c732f70e4d",
      (err, url) =>
        obj.callback && adapter.sendTo(obj.from, obj.command, url, obj.callback)
    );
  }
});
```

###`selectSendTo`
显示具有实例值给定的下拉菜单。

| 属性 | 描述 |
|-----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `command` | sendTo 命令 |
| `data` | 对象 - `{"subject1": 1, "data": "static"}`。您可以指定 jsonData 或 data，但不能同时指定。如果 jsonData 未定义，则此数据将发送到后端。|
| `manual` | 允许手动编辑。无下拉菜单（如果实例处于离线状态）。默认`true`。|
| `multiple` | 多选选择 |
| `showAllValues` | 即使未找到标签也显示项目（多个），默认=`true` |
| `noTranslation` | 不翻译选择的标签。要使用此选项，您的适配器必须实现消息处理程序。命令的结果必须是 `[{"value": 1, "label": "one"}, ...]` 格式的数组 |
| `alsoDependsOn` | 通过更改哪些属性，必须重新发送命令 |
| `alsoDependsOn` | 通过更改哪些属性，必须重新发送命令 |

#### `selectSendTo` 后端代码示例
```js
adapter.on("message", (obj) => {
  if (obj) {
    switch (obj.command) {
      case "command":
        if (obj.callback) {
          try {
            const { SerialPort } = require("serialport");
            if (SerialPort) {
              // read all found serial ports
              SerialPort.list()
                .then((ports) => {
                  adapter.log.info(`List of port: ${JSON.stringify(ports)}`);
                  adapter.sendTo(
                    obj.from,
                    obj.command,
                    ports.map((item) => ({
                      label: item.path,
                      value: item.path,
                    })),
                    obj.callback
                  );
                })
                .catch((e) => {
                  adapter.sendTo(obj.from, obj.command, [], obj.callback);
                  adapter.log.error(e);
                });
            } else {
              adapter.log.warn("Module serialport is not available");
              adapter.sendTo(
                obj.from,
                obj.command,
                [{ label: "Not available", value: "" }],
                obj.callback
              );
            }
          } catch (e) {
            adapter.sendTo(
              obj.from,
              obj.command,
              [{ label: "Not available", value: "" }],
              obj.callback
            );
          }
        }

        break;
    }
  }
});
```

###`autocompleteSendTo`
显示根据实例值给出的自动完成控制。

| 属性 | 描述 |
|-----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `command` | sendTo 命令 |
| `data` | 对象 - `{"subject1": 1, "data": "static"}`。您可以指定 jsonData 或 data，但不能同时指定。如果 jsonData 未定义，则此数据将发送到后端。|
| `freeSolo` | 将`freeSolo`设置为`true`，这样文本框就可以包含任意值。|
| `alsoDependsOn` | 通过更改哪些属性，必须重新发送命令 |
| `maxLength` | 字段中文本的最大长度 |
| `maxLength` | 字段中文本的最大长度 |

要使用此选项，您的适配器必须实现消息处理程序：

命令的结果必须是`["value1", {"value": "value2", "label": "Value2"}, ...]`形式的数组（键必须是唯一的）。有关处理程序示例，请参阅`selectSendTo`

###`textSendTo`
显示根据实例值给出的只读控制。

| 属性 | 描述 |
|-------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `container` | `div`, `text`, `html` |
| `alsoDependsOn` | 通过更改哪些属性，必须重新发送命令 |
| `command` | sendTo 命令 |
| `jsonData` | 字符串 - `{"subject1": "${data.subject}", "options1": {"host": "${data.host}"}}`。此数据将发送到后端 |
| `data` | 对象 - `{"subject1": 1, "data": "static"}`。您可以指定 jsonData 或 data，但不能同时指定。如果 jsonData 未定义，则此数据将发送到后端。|
| `data` | object - `{"subject1": 1, "data": "static"}`。您可以指定 jsonData 或 data，但不能同时指定。如果 jsonData 未定义，则此数据将发送到后端。|

要使用此选项，您的适配器必须实现消息处理程序：命令的结果必须是具有以下参数的字符串或对象：

```json5
{
  text: "text to show", // mandatory
  style: { color: "red" }, // optional
  icon: "search", // optional. It could be base64 or link to image in the same folder as jsonConfig.json file
  // possible predefined names: edit, rename, delete, refresh, add, search, unpair, pair, identify, play, stop, pause, forward, backward, next, previous, lamp, backlight, dimmer, socket, settings, group, user, qrcode, connection, no-connection, visible
  iconStyle: { width: 30 }, // optional
}
```

#### `textSendTo` 的示例
```js
adapter.on("message", (obj) => {
  if (obj) {
    switch (obj.command) {
      case "command":
        obj.callback &&
          adapter.sendTo(
            obj.from,
            obj.command,
            "Received " + JSON.stringify(obj.message),
            obj.callback
          );
        // or with style
        obj.callback &&
          adapter.sendTo(
            obj.from,
            obj.command,
            {
              text: "Received " + JSON.stringify(obj.message),
              style: { color: "red" },
              icon: "search",
              iconStyle: { width: 30 },
            },
            obj.callback
          );
        // or as html
        obj.callback &&
          adapter.sendTo(
            obj.from,
            obj.command,
            `<div style="color: green">${JSON.stringify(obj.message)}</div>`,
            obj.callback
          );
        break;
    }
  }
});
```

###`coordinates`
确定当前位置，如果无法以“纬度，经度”形式表示，则使用`system.config`坐标

| 属性 | 描述 |
|-----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `divider` | 纬度和经度之间的分隔符。默认为“，”（如果 longitudeName 和 latitudeName 均未定义则使用）|
| `longitudeName` | 如果定义，经度将存储在此属性中，分隔符将被忽略 |
| `latitudeName` | 如果定义，纬度将存储在此属性中，分隔符将被忽略 |
| `useSystemName` | 如果定义了，则会显示“使用系统设置”复选框，并从`system.config` 读取纬度和经度，并将布尔值保存到给定名称|
| `useSystemName` | 如果定义，将显示“使用系统设置”复选框，并从 `system.config` 读取纬度、经度，并将布尔值保存到给定名称 |

###`interface`
选择实例运行的主机接口

| 属性 | 描述 |
|------------------|----------------------------------------------------------------|
| `ignoreLoopback` | 不显示环回接口 (127.0.0.1) |
| `ignoreInternal` | 不显示内部接口（通常也是 127.0.0.1）|

###`license`
如果尚未接受，则显示许可证信息。必须定义属性`texts`或`licenseUrl`之一。当许可证被接受时，定义的配置属性将设置为`true`。

| 属性 | 描述 |
|--------------|------------------------------------------------------------------------------------------------------------|
| `texts` | 包含文本的段落数组，每个段落将显示为单独的段落 |
| `title` | 许可证对话框的标题 |
| `agreeText` | 同意按钮的文本 |
| `checkBox` | 如果已定义，则会显示具有指定名称的复选框。如果已选中，则会启用同意按钮。|
| `checkBox` | 如果定义，则显示指定名称的复选框。如果选中，则启用同意按钮。|

###`checkLicense`
这是一个非常特殊的组件，用于在线检查许可证。它在原生代码中必须包含`license`和`useLicenseManager`属性。

| 属性 | 描述 |
|-----------|---------------|
| `uuid` | 检查 UUID |
| `version` | 检查版本 |

###`uuid`
显示 iobroker UUID

###`port`
端口的特殊输入。它会自动检查端口是否被其他实例使用，并显示警告

| 属性 | 描述 |
|----------|-------------------------------------------------------------------------------------------------------------------------------|
| `min` | 允许的最小端口号。它可以是 0。如果该值为零，则不会检查端口是否被占用。|

###`state`
（管理员 >= 7.1.0）显示来自状态（管理员 >= 7.6.4）属性`showEnterButton` 和`setOnEnterKey` 的控制或信息

| 属性 | 描述 |
|-------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `oid` | 应使用哪个对象 ID 进行控制。该 ID 不带 `adapter.X.` 前缀 |
| `foreign` | `oid` 是绝对的，无需将 `adapter.X` 或 `system.adapter.X.` 添加到 oid |
| `control` | 应如何显示状态值：`text`、`html`、`input`、`slider`、`select`、`button`、`switch`、`number` |
| `controlled` | 如果为 true，状态将显示为开关、选择、按钮、滑块或文本输入。仅在未定义任何控件属性时使用 |
| `unit` | 将单位添加到值 |
| `trueText` | 如果值为真，则会显示此文本 |
| `trueTextStyle` | 值为真时的文本样式 |
| `falseText` | 如果值为 false 或者控件是“按钮”，则会显示此文本 |
| `falseTextStyle` | 如果值为 false 或者控件是“按钮”，则文本的样式 |
| `trueImage` | 如果值为真，则会显示此图像 |
| `falseImage` | 如果值为 false 或者控件是“按钮”，则会显示此图像 |
| `min` | 控制类型滑块或数字的最小值 |
| `max` | 控制类型滑块或数字的最大值 |
| `step` | 控制类型滑块或数字的步长值 |
| `controlDelay` | 滑块或数字的延迟（毫秒）|
| `variant` | 按钮变体：`contained`、`outlined`、`text` |
| `readOnly` | 定义控件是否为只读 |
| `narrow` | 通常，标题和值显示在行的左右两侧。使用此标志，值将显示在标签之后 |
| `blinkOnUpdate` | 更新时值应闪烁（真或彩色）|
| `size` | 字体大小：小、正常、大或数字 |
| `addColon` | 如果标签中不存在冒号，则在标签末尾添加冒号 |
| `labelIcon` | 标签的 Base64 图标 |
| `buttonValue` | 可选值，将发送给按钮 |
| `showEnterButton` | 显示“设置”按钮。此情况下，仅当按下按钮时才会发送值。您可以定义按钮的文本。默认文本为“设置”（仅适用于“输入”、“数字”或“滑块”）|
| `setOnEnterKey` | 此例中的值仅在按下“Enter”键时发送。它可以与 `showEnterButton` | 结合使用。 |
| `setOnEnterKey` | 此例中的值仅在按下“Enter”键时发送。可与 `showEnterButton` 结合使用 |

###`staticInfo`
以预格式化的形式显示静态信息，如“标题：值单位”（管理员> = 7.3.3）此控件主要用于动态表单

| 属性 | 描述 |
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| `data` | 要显示的值 |
| `unit` | （可选）单位（可以是多语言）|
| `narrow` | （可选）通常，标题和值分别显示在行的左右两侧。使用此标志，值将紧跟在标签之后 |
| `addColon` | （可选）如果标签中不存在冒号，则在末尾添加标签 |
| `blinkOnUpdate` | （可选）更新时值应闪烁（真实或彩色）|
| `blink` | （可选）值应持续闪烁（真或彩色）|
| `styleLabel` | （可选）React CSS 样式 |
| `styleValue` | （可选）React CSS 样式 |
| `styleUnit` | （可选）React CSS 样式 |
| `copyToClipboard` | （可选）显示值的“复制到剪贴板”按钮 |
| `labelIcon` | （可选）标签的 base64 图标 |
| `size` | （可选）字体大小：小、正常、大或数字 |
| `highlight` | （可选）鼠标悬停时突出显示线条 |
| `booleanAsCheckbox` | （可选）将布尔值显示为复选框 |
| `booleanAsCheckbox` | （可选）将布尔值显示为复选框 |

###`deviceManager`
显示设备管理器。为此，适配器必须支持设备管理器协议。请参阅 iobroker/dm-utils。

以下是如何在选项卡中显示设备管理器的示例：

```json
"_deviceManager": {
  "type": "panel",
  "label": "Device manager",
  "items": {
    "_dm": {
      "type": "deviceManager",
      "sm": 12,
      "style": {
        "width": "100%",
        "height": "100%",
        "overflow": "hidden"
      }
    }
  },
  "style": {
    "width": "100%",
    "height": "100%",
    "overflow": "hidden"
  },
  "innerStyle": {
    "width": "100%",
    "height": "100%",
    "overflow": "hidden"
  }
}
```

## 控件的常用属性
### 布局选项`xl`、`lg`、`md`、`sm`、`xs`
这些选项用于定义不同屏幕尺寸上元素的宽度，确保在各种设备上具有响应性和适应性的布局。

有效数字为 1 至 12。

如果您指定一个数字，例如 6，则元素的宽度将为屏幕宽度的 6/12（50%）；或者，例如 3，则元素的宽度将为屏幕宽度的 3/12（25%）。
为不同的布局选项分配数字，可以指定元素在不同屏幕尺寸下的宽度。

| 选项 | 描述 |
|--------|------------------------------------------|
| `xl` | 超大屏幕（1536px >= 宽度）|
| `md` | 中间屏幕（900px <= 宽度 < 1200px）|
| `sm` | 小屏幕（600px <= 宽度 < 900px）|
| `xs` | 小屏幕（宽度 < 600px）|
| `xs` | 小屏幕 (宽度 < 600px) |

以下选项是适合大多数情况的推荐预设

```json
"xs": 12,
"sm": 12,
"md": 6,
"lg": 4,
"xl": 4,
```

#### 建议检查布局
应检查每个适配器的相应布局，以查看该布局是否可以在所有分辨率下显示和使用。

例如，可以使用内置于每个基于 Chromium 的浏览器的 Web 开发人员工具进行测试。

步骤 1：使用 F12 打开 Web 开发人员工具

步骤2：打开设备工具栏（1）

步骤3：选择不同的设备（2）

![图像](../../en/dev/img/webdevtools.png)

在 Web 开发人员工具的设置中，您可以根据需要创建具有精确宽度的自己的设备。

### 更多选项
| 选项 | 描述 |
|--------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type` | 如果元素没有属性`type`，则假定其默认类型为“面板”。元素类型。有关当前可用选项，请参阅[常见控制元素：](#common-control-elements) |
| `label` | 字符串或对象，如 {en: 'Name', ru: 'Имя'} |
| `hidden` | 可以使用`native.attribute`进行计算的 JS 函数 |
| `hideOnlyControl` | 如果隐藏，该地点将会显示，但没有控制|
| `disabled` | 可以使用`native.attribute`进行计算的 JS 函数 |
| `help` | 帮助文本（多语言）|
| `helpLink` | href 帮助（只能与 `help` 一起使用）|
| `style` | ReactJS 符号中的 CSS 样式：`radiusBorder` 而不是 `radius-border`。|
| `darkStyle` | 暗黑模式的 CSS 样式 |
| `validator` | JS 函数：true 无错误，false - 错误 |
| `validatorErrorText` | 验证器失败时显示的文本 |
| `validatorNoSaveOnError` | 如果出现错误则禁用保存按钮 |
| `tooltip` | 可选工具提示 |
| `default` | 默认值 |
| `defaultFunc` | 计算默认值的 JS 函数 |
| `placeholder` | 占位符（用于文本控制）|
| `noTranslation` | 不翻译选择或其他选项（不用于帮助、标签或占位符）|
| `onChange` | 形式为`{"alsoDependsOn": ["attr1", "attr2"], "calculateFunc": "data.attr1 + data.attr2", "ignoreOwnChanges": true}` 的结构 |
| `doNotSave` | 请勿保存此属性，因为仅用于内部计算 |
| `noMultiEdit` | 如果此标志设置为 true，则当用户选择了多个对象进行编辑时，此字段将不会显示。|
| `expertMode` | 如果此标志设置为 true，则仅当专家模式为 true 时才会显示此字段（来自 Admin 7.4.3）|
| `expertMode` | 如果此标志设置为 true，则仅当专家模式为 true 时才会显示此字段（从 Admin 7.4.3 开始）|

### 详细配置选项
#### `defaultSendTo`
从运行实例请求初始值的命令，例如：`"myInstance": {"type": "text", "defaultSendTo": "fill"}`

- `data` - 静态数据
- `jsonData` - 静态数据
- 如果没有定义 `data` 和 `jsonData`，将发送以下信息 `{"attr": "<attribute name>", "value": "<current value>"}`
- `button` - 用于重新触发实例请求的按钮标签
- `buttonTooltip` - 按钮工具提示（默认：`通过实例请求数据`）
- `buttonTooltipNoTranslation` - 不翻译按钮工具提示
- `allowSaveWithError` - 即使实例处于离线状态也允许保存配置

#### `confirm`
- `condition` - JS 函数：true 显示确认对话框
- `text` - 确认对话框的文本
- `title` - 确认对话框的标题
- `ok` - 确定按钮的文本
- `cancel` - 取消按钮的文本
- `type` - 以下之一：`info`、`warning`、`error`、`none`
- `alsoDependsOn` - 带有属性的数组，也用于通过这些属性检查条件

自动完成
`Number`、`text`、`checkbox`、`select` 支持自动完成功能，以便在用作自定义设置时选择选项。
在这种情况下，值将以包含所有可能值的数组形式提供。

例子：

```json5
// ...
   "timeout": {
      "type": "number",
      "label": "Timeout"
   }
// ...

"data": {
   "timeout": [1000, 2000, 3000]
}
```

在这种情况下，输入必须是文本，显示为`__different__`，并带有三个可能值的自动完成选项。用户可以从下拉菜单中选择 1000、2000 或 3000，也可以输入自己的新值，例如 500。

如果值为 [false, true]，布尔值必须支持不确定

对于未改变的`__different__`必须返回不同的值：

输入：

```json
"data": {
   "timeout": [1000, 2000, 3000]
}
```

如果超时未改变，则输出：

```json
"newData": {
   "timeout": "__different__"
}
```

值`__different__` 是保留的，并且没有任何文本输入可以接受来自用户的该值。

组件必须看起来像

```jsx
<SchemaEditor
    style={customStyle}
    className={classes.myClass}
    schema={schema}
    customInstancesEditor={CustomInstancesEditor}
    data={common.native}
    onError={(error, attribute) => error can be true/false or text. Attribute is optional}
    onChanged={(newData, isChanged) => console.log('Changed ' + isChanged)}
/>
```

如果没有提供模式，则必须根据数据自动创建模式。

- `boolean` => 复选框
- `text` => 文本输入
- `number` => 数字
- 名称 `bind` => ip
- 名称 `port` => 数字，最小值=1，最大值=0xFFFF
- 名称 `timeout` => 数字，帮助="ms"

## 待办事项
以下章节摘自原版 SCHEMA.MD。
我对内容理解不够深入，需要 bluefox 进行改进。

## JS 函数
### 配置对话框
JS函数是：

```js
const myValidator = "_alive === true && data.options.myType == 2";

const func = new Function(
  'data',          // actual obj.native or obj.common.custom['adapter.X'] object
                   // If table, so data is current line in the table
  'originalData',  // data before changes
  '_system',       // system config => 'system.config'=>common
  '_alive',        // If instance is alive
  '_common',       // common part of instance = 'system.config.ADAPTER.X' => common
  '_socket',       // socket connection
  '_instance',     // instance number
  'arrayIndex',    // filled only by table and represents the row index
  'globalData',    // filled only by table and represents the obj.native or obj.common.custom['adapter.X'] object
  '_changed',      // indicator if some data was changed and must be saved
  myValidator.includes('return') ? myValidator : 'return ' + myValidator); // e.g. "_alive === true"

const isValid = func(data, systemConfig.common, instanceAlive, adapter.common, this.props.socket);
```

如果`alive`状态发生变化，则所有字段都必须重新更新、验证、禁用和隐藏。

适配器设置中的 JS 函数中可以使用以下变量：

- `data` - 此实例或表中当前行的本机设置（要访问所有设置，请使用 globalData）
- `_system` - 系统配置
- `_alive` - 实例是否处于活动状态
- `_common` - 此实例的通用设置
- `_socket` - 套接字
- `_instance` - 实例编号
- `arrayIndex` - 仅在表中使用并表示数组中的当前行
- `globalData` - 仅在表的所有设置中使用，而不仅仅是在一行表中使用

### 自定义设置对话框
JS函数是：

```js
const myValidator =
  "customObj.common.type === 'boolean' && data.options.myType == 2";

const func = new Function(
  "data",
  "originalData",
  "_system",
  "instanceObj",
  "customObj",
  "_socket",
  arrayIndex,
  myValidator.includes("return") ? myValidator : "return " + myValidator
); // e.g. "_alive === true"

const isValid = func(
  data || this.props.data,
  this.props.originalData,
  this.props.systemConfig,
  instanceObj,
  customObj,
  this.props.socket
);
```

自定义设置中的 JS 函数中可以使用以下变量：

- `data` - 当前自定义设置或表中的当前行（要访问所有设置，请使用 globalData）
- `originalData` - 未改变的数据
- `_system` - 系统配置
- `instanceObj` - 适配器实例对象
- `customObj` - 当前对象本身
- `_socket` - 套接字
- `arrayIndex` - 仅在表中使用并表示数组中的当前行
- `globalData` - 仅在表的所有设置中使用，而不仅仅是在一行表中使用

## 自定义组件
```jsx
<CustomInstancesEditor
    common={common.data}
    alive={isInstanceAlive}
    data={data}
    socket={this.props.socket}
    themeName={this.props.themeName}
    themeType={this.props.themeType}
    theme={this.props.theme}
    name="accessAllowedConfigs"
    onChange={(newData, isChanged) => {}}
    onError={error => error can be true/false or text}
/>
```

您可以在[`telegram`](https://github.com/iobroker-community-adapters/ioBroker.telegram/tree/master/src-admin) 或在 [`pushbullet`](https://github.com/Jens1809/ioBroker.pushbullet/tree/master/src-admin)适配器中找到示例。

管理中的 JSON 选项卡
从管理版本 7.6.x 开始，您可以通过 JSON 配置定义选项卡（如 `backitup` 或 `matter`）。

为此，您必须在`io-package.json`中的`common`部分中定义以下内容：

```json5
{
   "common": {
      // ....
      "adminTab": {
         "link": "jsonTab.json", // the name could be any, but only ends with `.json` or `.json5`
         // all following parameters are optional
         "icon": "AABBCC", // base64 icon. If not provided, the adapter icon will be taken
         "name": "TabName", // String or multi-language object for menu label
         "singleton": true, // Tab will not have an instance number and for all instances will exist only one menu item.
         "order": 10, // Order in admin tab (0 is disabled, 1 - first after static menu items, 200 is last)
      },
      // ....
   }
}
```

文件`jsonTab.json5`可能如下所示：

```json5 
{
   "i18n": "tabI18n", // folder name in admin, where the translations are stored (relative to "admin" folder)
   "command": "tab", // If defined, the tab will send a message by initializing to backend with command "tab" (string contained in "sendTo")
   "items": {
      "memHeapTotal": {
         // This will show "system.adapter.admin.0.memHeapTotal" value
         "type": "state",
         "label": "Memory",
         "sm": 12,
         "system": true,
         "oid": "memHeapTotal"
      },
      "infoConnected": {
         // This will show "admin.0.info.connected" value
         "newLine": true,
         "type": "state",
         "label": "Info about connected socket clients",
         "sm": 12,
         "oid": "info.connected"
      },
      "dayTime": {
         // This will show "javascript.0.variables.dayTime" value
         "newLine": true,
         "type": "state",
         "label": "Aktuelle Zeit",
         "sm": 12,
         "foreign": true,
         "oid": "javascript.0.variables.dayTime"
      },
      "value": {
         // This will show "data.value" value from "sendTo" answer
         "newLine": true,
         "type": "text",
         "readOnly": "true",
         "label": "Value from sendTo answer",
         "sm": 12,
      }
   }
}
```

如果提供了`sendTo`，实例将收到一条消息（`common.messagebox` 在`io-package.json` 中必须为 true），其中包含命令`tab`，或存储在`sendTo` 中的值（如果该值是字符串）。
实例必须使用如下结构进行回答：

```typescript
onMessage = (obj: ioBroker.Message): void => {
    if (obj?.command === 'tab' && obj.callback) {
        // if not instance message
        this.sendTo(obj.from, obj.command, { data: { value: 5 } }, obj.callback);
    }
};
```

## 报告架构错误
在此处创建问题：https://github.com/ioBroker/ioBroker.admin/issues

## 对于维护者
要更新 JsonConfig 模式的位置，请对此文件创建拉取请求：https://github.com/ioBroker/ioBroker.admin/blob/master/packages/jsonConfig/schemas/jsonConfig.json