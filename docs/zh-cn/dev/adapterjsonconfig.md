---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/dev/adapterjsonconfig.md
title: ioBroker JSON 配置
hash: uvQuLv+B2UrVMpWA3t0/bd9VxY4hTapAX8U0J3lRgV0=
---
# IoBroker JSON 配置
Admin（从版本 6 开始）支持适配器的 JSON 配置。
可以在 JSON 文件中定义配置，然后在 Admin 中使用它。

具有多个选项卡的`jsonConfig.json`文件示例可在此处找到：https://github.com/ioBroker/ioBroker.admin/blob/master/admin/jsonConfig.json5 只有一个面板的示例可在此处找到：https://github.com/ioBroker/ioBroker.dwd/blob/master/admin/jsonConfig.json

您可以用 JSON 或 JSON5 格式定义设置。JSON5 更易于阅读，并且支持注释。

此外，对于 JSON 文件，您必须在`common` 部分的`io-package.json` 中定义：

```json
{
  "common": {
    "adminUI": {
      "config": "json"
    }
  }
}
```

表示适配器支持 JSON 配置。

如果您测试此适配器，则可以看到几乎所有组件都在运行：https://github.com/mcm4iob/ioBroker.jsonconfig-demo。
您可以通过管理员中的 GitHub 图标在 npm 选项卡上输入`iobroker.jsonconfig-demo`来安装它。

JSON 配置文件的模式在此处定义：https：//github.com/ioBroker/adapter-react-v5/blob/main/schemas/jsonConfig.json

所有标签、文本、帮助文本都可以是多种语言或仅仅是字符串。

*如果属性名称以“_”开头，则不会保存在对象中。*

包括
需要管理员 6.17.1 或更新版本。

要编写复杂的 JSON 文件，您可以包含其他 JSON 文件。
包含的文件必须与主文件位于同一目录中。

```json5
{
    "tabs": {
        "tab1": {
            "type": "panel", // data will be combined with the content of "tab1.json". If the same attribute is defined in both files, the value from the included file will be used.
            "#include": "tab1.json"
        }
    }
}
```

## 可能的控制类型
可能的类型：

- `tabs` - 带有项目的标签
- `items` - 带有面板的对象 `{"tab1": {}, "tab2": {}...}`
- `iconPosition` - `bottom`、`end`、`start` 或 `top`。仅适用于具有 `icon` 属性的面板。默认值：`start`
- `tabsStyle` - Mui-Tabs 组件的 React 格式的 CSS 样式（`marginLeft` 而不是 `margin-left`）

- `panel` - 带有项目的标签
- `icon` - 选项卡可以有图标（base64 如 `data:image/svg+xml;base64,...`）或 `jpg/png` 图像（以 `.png` 结尾）
- `label` - 标签的标签
- `items` - 对象 `{"attr1": {}, "attr2": {}}...`
- `collapsable` - 仅可能不属于 tabs[jsonConfig.json](..%2F..%2F..%2F..%2F..%2FioBroker.ring%2Fadmin%2FjsonConfig.json)
- `color` - 可折叠标题的颜色 `primary` 或 `secondary` 或者无
- `innerStyle` - Panel 组件的 React 格式（`marginLeft` 而非 `margin-left`）内层 div 的 CSS 样式。不适用于可折叠面板。

- `text` - 文本组件
- `maxLength` - 字段中文本的最大长度
- `readOnly` - 只读字段
- `trim` - 默认为 true。如果不需要修剪，请将此属性设置为 `false`。
- `minRows` - 默认值为 1。如果您想要一个包含多行的文本区域，请将此属性设置为 `2` 或更大。
- `maxRows` - 文本区域的最大行数。仅当 `minRows` > 1 时使用。
- `noClearButton` - 如果为真，则不会显示清除按钮（admin >= 6.17.13）
- `validateJson` - 如果为 true，文本将被验证为 JSON
- `allowEmpty` - 如果为 true，则仅当值不为空时才会验证 JSON
- `time` - 值是毫秒或字符串的时间。仅与 readOnly 标志一起使用

- `数字`
- `min` - 最小值
- `max` - 最大值
- `步骤` - 步骤

- `color` - 颜色选择器
- `noClearButton` - 如果为真，则不会显示清除按钮（admin >= 6.17.13）

- `checkbox` - 显示复选框

- `slider` - 显示滑块 (仅限 Admin6)
- `min` - （默认 0）
- `max` - （默认 100）
- `step` - （默认 `(max - min) / 100`）
- `unit` - 滑块的单位

- `qrCode` - 在二维码中显示数据（来自 Admin 7）
- `data` - 要在二维码中编码的数据
- `size` - QR 码的大小
- `fgColor` - 前景色
- `bgColor` - 背景颜色
- `level` - QR 码级别（`L` `M` `Q` `H`）

- `ip` - 绑定地址
- `listenOnAllPorts` - 将 0.0.0.0 添加到选项
- `onlyIp4` - 仅显示 IP4 地址
- `onlyIp6` - 仅显示 IP6 地址
- `noInternal` - 不显示内部 IP 地址

- `user` - 从 system.user 中选择用户。（带颜色和图标）
- `简短` - 没有 system.user。

- `room` - 从 `enum.room` 中选择房间（带颜色和图标）-（仅限 Admin6）
- `short` - 没有 `enum.rooms.`
- `allowDeactivate` - 允许让房间空置

- `func` - 从 `enum.func` 中选择函数（带颜色和图标）-（仅限 Admin6）
- `short` - 没有 `enum.func.`
- `allowDeactivate` - 允许将功能留空

-`选择`
- `options` - `[{label: {en: "option 1"}, value: 1}, ...]` 或

                `[{"items": [{"label": "Val1", "value": 1}, {"label": "Val2", value: "2}], "name": "group1"}, {"items": [{"label": "Val3", "value": 3}, {"label": "Val4", value: "4}], "name": "group2"}, {"label": "Val5", "value": 5}]`

-`自动完成`
- `options` - `["value1", "value2", ...]` 或 `[{"value": "value", "label": "Value1"}, "value2", ...]` （键必须是唯一的）
- `freeSolo` - 将`freeSolo`设置为`true`，这样文本框就可以包含任意值。

- `image` - 将图像保存为 `adapter.X` 对象的文件或属性中的 base64
- `filename` - 文件的名称是结构名称。在下面的例子中，`login-bg.png` 是 `writeFile("myAdapter.INSTANCE", "login-bg.png")` 的文件名
- `accept` - html 接受属性，如 `{'image/**': [], 'application/pdf': ['.pdf'] }`，默认 `{'image/*': [] }`
- `maxSize` - 上传文件的最大大小
- `base64` - 如果为 true，图像将作为 data-url 保存在属性中，否则作为二进制文件保存在文件存储中
- `crop` - 如果为 true，则允许用户裁剪图像
-`!最大宽度`
- `!最大高度`
- `!square` - 宽度必须等于高度，或者裁剪必须只允许正方形作为形状

```
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

- `objectId` - 对象 ID：用名称、颜色和图标显示它
- `types` - 所需类型：`channel`、`device`、...（默认情况下只有 `state`）。它是复数，因为 `type` 已被占用。
- `root` - [可选] 仅显示此根对象及其子对象
- `customFilter` - [可选] 不能与 `type` 设置一起使用。它是一个对象，而不是 JSON 字符串。示例
- `{common: {custom: true}}` - 仅显示具有一些自定义设置的对象
- `{common: {custom: 'sql.0'}}` - 仅显示具有 sql.0 自定义设置的对象（仅限特定实例）
- `{common: {custom: '_dataSources'}}` - 仅显示适配器 `influxdb` 或 `sql` 或 `history` 的对象
- `{common: {custom: 'adapterName.'}}` - 仅显示特定适配器的自定义设置的对象（所有实例）
- `{type: 'channel'}` - 仅显示频道
- `{type: ['channel', 'device']}` - 仅显示频道和设备
- `{common: {type: 'number'}` - 仅显示数字类型的状态
- `{common: {type: ['number', 'string']}` - 仅显示数字和字符串类型的状态
- `{common: {role: 'switch'}` - 仅显示角色从 switch 开始的状态
- `{common: {role: ['switch', 'button']}` - 仅显示角色以 `switch` 和 `button` 开头的状态
- `filterFunc` - [可选] 不能与 `type` 设置一起使用。它是一个将为每个对象调用的函数，必须返回 true 或 false。示例：`obj.common.type === 'number'`

- `password` - 密码字段

此字段类型仅在 UI 中产生影响。
密码和其他敏感数据应加密存储！为此，必须在 [本机加密](https://github.com/ioBroker/ioBroker.js-controller#automatically-encryptdecrypt-configuration-fields) 下的 io-package.json 中提供密钥。
此外，您可以通过将此属性添加到 `io-package.json` 文件中的 `protectedNative` 来保护此属性不被提供给除 `admin` 和 `cloud` 之外的其他适配器。

- `repeat` - 重复密码必须与密码进行比较
- `visible` - 如果允许通过切换查看按钮查看密码则为 true（仅适用于输入新密码时）
- `readOnly` - 只读标志。如果 readOnly 为真，则 Visible 自动为真
- `maxLength` - 字段中文本的最大长度

-`实例`
- `adapter` - 适配器的名称。使用特殊名称 `_dataSources`，您可以获取带有标志 `common.getHistory` 的所有适配器。
- `adapters` - 应显示的可选适配器列表。如果未定义，则将显示所有适配器。仅当未定义 `adapter` 属性时才有效。
- `allowDeactivate` - 如果为真。显示附加选项“deactivate”
- `onlyEnabled` - 如果为 true。仅显示已启用的实例
- `long` - 值看起来像 `system.adapter.ADAPTER.0` 而不是 `ADAPTER.0`
- `short` - 值看起来像 `0`，而不是 `ADAPTER.0`
- `all` - 向选项“all”添加值为 `*`

- `chips` - 用户可以输入单词，然后它将被添加（参见云 => 服务 => 白名单）。如果没有定义 `delimiter`，则输出为数组。
- `delimiter` - 如果已定义，则选项将存储为带分隔符的字符串，而不是数组。例如，通过 `delimiter=;`，您将获得 `a;b;c`，而不是 `['a', 'b', 'c']`

- `alive` - 仅指示实例是否处于活动状态，并且可以在“隐藏”和“禁用”状态下使用（不会保存在配置中）

仅文本：实例正在运行，实例未运行

- `instance` - 检查实例是否处于活动状态。如果未定义，则将使用当前实例。您可以在文本中使用 `${data.number}` 模式。
- `textAlive` - 默认文本为 `Instance %s is alive`，其中 %s 将被 `ADAPTER.0` 替换。翻译必须存在于 i18n 文件中
- `textNotAlive` - 默认文本为“实例 %s 未激活”，其中 %s 将被替换为 `ADAPTER.0`。翻译必须存在于 i18n 文件中

- `pattern` - 具有类似 'https://${data.ip}:${data.port}' 模式的只读字段（不会保存在配置中）

带有只读标志的文本输入，显示一种模式。

- `copyToClipboard` - 如果为 true - 显示按钮
- `pattern` - 我的图案

- `sendto` - 向实例发送请求的按钮（https://github.com/iobroker-community-adapters/ioBroker.email/blob/master/admin/index_m.html#L128）
- `命令` - （默认`发送`）
- `jsonData` - 字符串 - `"{\"subject1\": \"${data.subject}\", \"options1\": {\"host\": \"${data.host}\"}}"`。您可以使用特殊变量 `data._origin` 和 `data._originIp` 向实例发送调用者 URL，例如 `http://127.0.0.1:8081/admin`。
- `data` - object - `{"subject1": 1, "data": "static"}`。您可以指定 jsonData 或 data，但不能同时指定两者。
    - `结果` - `{结果1: {en: 'A'}, 结果2: {en: 'B'}}`
    - `错误` - `{error1: {en: 'E'}, error2: {en: 'E2'}}`
- `variant` - `contained`, `outlined` 或者什么都没有
- `openUrl` - 如果为 true - 在新选项卡中打开 URL，如果响应包含属性 `openUrl`，例如 `{"openUrl": "http://1.2.3.4:80/aaa", "window": "_blank", "saveConfig": true}`。如果 `saveConfig` 为 true，则将请求用户保存配置。
- `reloadBrowser` - 如果为 true - 重新加载当前浏览器窗口，如果响应包含属性 `reloadBrowser`，如 `{"reloadBrowser": true}`。
- `window` - 如果 `openUrl` 为真，则这是新窗口的名称。如果响应包含 `window` 属性，则可以覆盖。

`this.props.socket.sendTo(adapterName.instance, command || 'send', data, result => {});`

- `icon` - 是否应显示图标：`auth`、`send`、`web`、`warning`、`error`、`info`、`search`。您可以使用 `base64` 图标（如 `data:image/svg+xml;base64,...`）或 `jpg/png` 图像（以 `.png` 结尾）。（如果您需要更多图标，请通过问题请求）
- `useNative` - 如果适配器返回的结果带有 `native` 属性，则将用于配置。如果 `saveConfig` 为真，则将请求用户保存配置。
- `showProcess` - 请求进行时显示微调器
- `timeout` - 请求超时（毫秒）。默认值：无。
- `onLoaded` - 最初执行一次按钮逻辑

- `setState` - 设置实例状态的按钮
- `id` - `system.adapter.myAdapter.%INSTANCE%.test`，可以使用占位符 `%INSTANCE%` 替换为当前实例名称
- `ack` - false （默认 false）
- `val` - '${data.myText}_test' 或数字。类型将自动从状态类型中检测并完成转换
- `okText` - 按下按钮时显示的警报
- `变体` - `包含`, `概述`, ''

- `staticText` - 类似描述的静态文本
- `label` - 多语言文本
- `text` - 与标签相同

- `staticLink` - 静态链接
- `label` - 多语言文本
- `href` - 链接。链接可以是动态的，例如 `#tab-objects/customs/${data.parentId}`
- `target` - `_blank` 或 `_self` 或窗口名称
- `close` - 如果为真，GUI 将被关闭（不是用于管理中的 JsonConfig，而是用于动态 GUI）
- `按钮` - 将链接显示为按钮
- `variant` - 按钮类型（`outlined`, `contained`, `text`）
- `color` - 按钮颜色（例如 `primary`）
- `icon` - 是否应显示图标：`auth`、`send`、`web`、`warning`、`error`、`info`、`search`、`book`、`help`、`upload`。您可以使用 `base64` 图标（以 `data:image/svg+xml;base64,...` 开头）或 `jpg/png` 图像（以 `.png` 结尾）。（如果您需要更多图标，请通过问题请求）

- `staticImage` - 静态图像
- `href` - 可选的 HTTP 链接
- `src` - 图片名称（来自管理目录）

- `table` - 包含可以删除、添加、上移、下移的项目的表格
- `items` - `[{"type": 见上文, "width": px 或 %, "title": {"en": "header"}, "attr": "name", "filter": false, "sort": true, "default": ""}]`
- `noDelete` - 布尔值，表示删除或添加是否被禁用，如果 `noDelete` 为 false，则添加、删除和上/下移动应该可以工作
- `objKeyName` - （旧设置，请勿使用！） - `{"192.168.1.1": {delay: 1000, enabled: true}, "192.168.1.2": {delay: 2000, enabled: false}}` 中密钥的名称
- `objValueName` - （旧设置，请勿使用！） - `{"192.168.1.1": "value1", "192.168.1.2": "value2"}` 中的值的名称
- `allowAddByFilter` - 即使设置了过滤器，也允许添加
- `showSecondAddAt` - 表格底部显示第二个添加按钮的行数。默认 5
- `showFirstAddOnTop` - 在第一列的顶部而不是左侧显示第一个加号按钮。
- `clone` - [可选] - 是否应显示克隆按钮。如果为 true，则将显示克隆按钮。如果是属性名称，则此名称将是唯一的。
- `export` - [可选] - 是否显示导出按钮。导出为 csv 文件。
- `import` - [可选] - 是否显示导入按钮。从 csv 文件导入。
- `uniqueColumns` - [可选] - 指定列数组，这些列需要具有唯一的条目
- `encryptedAttributes` - [可选] - 指定需要加密的列数组
- `compact` - [可选] - 如果为 true，表格将以紧凑模式显示。

- `accordion` - 可以删除、添加、上移、下移项目的手风琴（Admin 6.6.0 及更新版本）
- `items` - `[{"type": 见上文, "attr": "name", "default": ""}]` - 项目可以像在 `panel` 上一样放置（xs、sm、md、lg 和 newLine）
- `titleAttr` - 项目列表的键，应用于名称
- `noDelete` - 布尔值，表示删除或添加被禁用，如果 `noDelete` 为 false，则添加、删除和上/下移动应该可以工作
- `clone` - [可选] - 是否应显示克隆按钮。如果为 true，则将显示克隆按钮。如果是属性名称，则此名称将是唯一的。

- `jsonEditor` - json 编辑器
- `validateJson` - 如果为 false，则文本将不会被验证为 JSON
- `allowEmpty` - 如果为 true，则仅当值不为空时才会验证 JSON

- `语言` - 选择语言
- `system` - 允许默认使用 `system.config` 中的系统语言（如果选择，则将有一个空字符串值）

-`证书`
- `certType` - 可选：`public`、`private`、`chained`。但从 6.4.0 开始，您可以使用 `certificates` 类型。

- `certificates` - 它是一种通用类型，可为您管理 `certPublic`、`certPrivate`、`certChained` 和 `leCollection` 属性。

  例子：

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

- `certCollection` - 选择证书集合或仅使用所有集合或根本不使用加密。
- `leCollectionName` - 证书集合的名称

- `自定义` (仅限 Admin6)
- `name` - 将通过 props 提供的组件名称，例如 ComponentInstancesEditor
- `url` - 组件的位置
- `custom/customComponents.js`：在这种情况下，文件将从 `/adapter/ADAPTER_NAME/custom/customComponents.js` 加载
- `https://URL/myComponent`：直接从 URL
- `./adapter/ADAPTER_NAME/custom/customComponent.js`：在这种情况下，文件将从 `/adapter/ADAPTER_NAME/custom/customComponents.js` 加载
- `i18n` - 如果 `i18n/xx.json` 文件与组件或翻译对象 `{"text1": {"en": Text1"}}` 位于同一目录中，则为 true

- `datePicker` - 允许用户选择日期输入，UI 格式来自用户安装中配置的 `dateFormat`。

组件返回可解析的日期字符串。

- `timePicker` - 允许用户选择日期输入，返回的字符串是可解析的日期字符串或格式为 `HH:mm:ss`
- `format` - 传递给日期选择器的格式默认为 `HH:mm:ss`
- `views` - 配置应向用户显示哪些视图。默认为 `['hours', 'minutes', 'seconds']`
- `timeSteps` - 表示每个视图可用的时间步长。默认为 `{ 小时：1， 分钟：5， 秒：5 }`
- `returnFormat` - `fullDate` 或 `HH:mm:ss`。出于向后兼容的原因，默认为完整日期。

- `分隔线` - 水平线
- `height` - 可选高度
- `color` - 可选分隔线颜色或 `primary`、`secondary`

-`标题`
-`文本`
- `尺寸` - 1-5 => h1-h5

-`cron`
- `复杂` - 用“分钟”、“秒”等显示 CRON
- `simple` - 显示简单的 CRON 设置

- `fileSelector`（仅限 Admin6）
- `pattern` - 文件扩展名模式。允许 `**/*.ext` 显示子文件夹中的所有文件、`*.ext` 显示根文件夹中的所有文件或 `folderName/*.ext` 显示子文件夹 `folderName` 中的所有文件。默认为 `**/*.*`。
- `fileTypes` - [可选] 文件类型：`audio`, `image`, `text`
- `objectID` - `meta` 类型的对象 ID。您可以使用特殊占位符 `%INSTANCE%`：例如 `myAdapter.%INSTANCE%.files`
- `upload` - 路径，上传的文件将存储于此。类似 `folderName`。如果未定义，则不会显示上传字段。若要在根目录中上传，请将此字段设置为 `/`。
- `refresh` - 在选择附近显示刷新按钮。
- `maxSize` - 最大文件大小（默认 2MB）
- `withFolder` - 即使所有文件都在同一个文件夹中，也显示文件夹名称
- `delete` - 允许删除文件
- `noNone` - 不显示 `none` 选项
- `noSize` - 不显示文件大小

- `文件` (仅限 Admin6)

带有文件选择器的输入字段

- `disableEdit` - 如果用户可以手动输入文件名，而不仅仅是通过选择对话框
- `limitPath` - 将选择限制为一个特定类型的 `meta` 对象并遵循路径（非强制性）
- `filterFiles` - 如 `['png', 'svg', 'bmp', 'jpg', 'jpeg', 'gif']`
- `allowUpload` - 允许上传文件
- `allowDownload` - 允许下载文件（默认 true）
- `allowCreateFolder` - 允许创建文件夹
- `allowView` - 允许平铺视图（默认为 true）
- `showToolbar` - 显示工具栏（默认 true）
- `selectOnlyFolders` - 用户只能选择文件夹（例如上传路径）
- `trim` - 修剪文件名

- `imageSendTo` - 显示从后端接收的以 base64 字符串形式呈现的图像
- `width` - QR 码的宽度（单位：px）
- `height` - QR 码的高度（单位：px）
- `command` - sendTo 命令
- `jsonData` - 字符串 - `{"subject1": "${data.subject}", "options1": {"host": "${data.host}"}}`. 此数据将发送到后端
- `data` - object - `{"subject1": 1, "data": "static"}`。您可以指定 jsonData 或 data，但不能同时指定。如果未定义 jsonData，则此数据将发送到后端。

后端代码示例：

```
adapter.on('message', obj => {
    if (obj.command === 'send') {
        const QRCode = require('qrcode');
        QRCode.toDataURL('3ca4234a-fd81-fdb8-5584-08c732f70e4d', (err, url) =>
            obj.callback && adapter.sendTo(obj.from, obj.command, url, obj.callback));
    }
});
```

-`selectSendTo`

显示根据实例值给定的下拉菜单。

- `command` - sendTo 命令
- `jsonData` - 字符串 - `{"subject1": "${data.subject}", "options1": {"host": "${data.host}"}}`。此数据将发送到后端
- `data` - object - `{"subject1": 1, "data": "static"}`。您可以指定 jsonData 或 data，但不能同时指定。如果未定义 jsonData，则此数据将发送到后端。
- `manual` - 允许手动编辑。无下拉菜单（如果实例处于离线状态）。默认为 `true`。
- `multiple` - 多选选择
- `showAllValues` - 即使未找到标签（多个），也显示项目，默认值为 `true`
- `noTranslation` - 不翻译选择的标签

要使用此选项，您的适配器必须实现消息处理程序：命令的结果必须是`[{"value": 1, "label": "one"}, ...]` 形式的数组

- `alsoDependsOn` - 通过改变哪些属性，必须重新发送命令

```
adapter.on('message', obj => {
   if (obj) {
       switch (obj.command) {
           case 'command':
               if (obj.callback) {
                   try {
                       const { SerialPort } = require('serialport');
                       if (SerialPort) {
                           // read all found serial ports
                           SerialPort.list()
                               .then(ports => {
                                   adapter.log.info(`List of port: ${JSON.stringify(ports)}`);
                                   adapter.sendTo(obj.from, obj.command, ports.map(item => ({label: item.path, value: item.path})), obj.callback);
                               })
                               .catch(e => {
                                   adapter.sendTo(obj.from, obj.command, [], obj.callback);
                                   adapter.log.error(e)
                               });
                       } else {
                           adapter.log.warn('Module serialport is not available');
                           adapter.sendTo(obj.from, obj.command, [{label: 'Not available', value: ''}], obj.callback);
                       }
                   } catch (e) {
                       adapter.sendTo(obj.from, obj.command, [{label: 'Not available', value: ''}], obj.callback);
                   }
               }

               break;
       }
   }
});
```

- `autocompleteSendTo`

显示根据实例值给定的自动完成控制。

- `command` - sendTo 命令
- `jsonData` - 字符串 - `{"subject1": "${data.subject}", "options1": {"host": "${data.host}"}}`。此数据将发送到后端
- `data` - object - `{"subject1": 1, "data": "static"}`。您可以指定 jsonData 或 data，但不能同时指定。如果未定义 jsonData，则此数据将发送到后端。
- `freeSolo` - 将`freeSolo`设置为`true`，这样文本框就可以包含任意值。
- `alsoDependsOn` - 通过改变哪些属性，必须重新发送命令
- `maxLength` - 字段中文本的最大长度

要使用此选项，您的适配器必须实现消息处理程序：命令的结果必须是形式为`["value1", {"value": "value2", "label": "Value2"}, ...]`的数组（键必须是唯一的）请参阅`selectSendTo`了解处理程序示例

-`textSendTo`

显示根据实例值给定的只读控制。

- `容器` - div，文本，html
- `copyToClipboard` - 如果为 true - 显示按钮
- `alsoDependsOn` - 通过改变哪些属性，必须重新发送命令
- `command` - sendTo 命令
- `jsonData` - 字符串 - `{"subject1": "${data.subject}", "options1": {"host": "${data.host}"}}`。此数据将发送到后端
- `data` - object - `{"subject1": 1, "data": "static"}`。您可以指定 jsonData 或 data，但不能同时指定。如果未定义 jsonData，则此数据将发送到后端。

要使用此选项，您的适配器必须实现消息处理程序：命令的结果必须是具有以下参数的字符串或对象：

```
{
    text: 'text to show',  // mandatory
    style: {color: 'red'}, // optional
    icon: 'search',        // optional. It could be base64 or link to image in the same folder as jsonConfig.json file
                           // possible predefined names: edit, rename, delete, refresh, add, search, unpair, pair, identify, play, stop, puase, forward, backward, next, previous, lamp, backlight, dimmer, socket, settings, group, user, qrcode, connection, no-connection, visible
    iconStyle: {width: 30} // optional
}
```

例子：

```
adapter.on('message', obj => {
    if (obj) {
      switch (obj.command) {
        case 'command':
          obj.callback && adapter.sendTo(obj.from, obj.command, 'Received ' + JSON.stringify(obj.message), obj.callback);
          // or with style
          obj.callback && adapter.sendTo(obj.from, obj.command, { text: 'Received ' + JSON.stringify(obj.message), style: { color: 'red' }, icon: 'search', iconStyle: { width: 30 }}, obj.callback);
          // or as html
          obj.callback && adapter.sendTo(obj.from, obj.command, `<div style="color: green">${JSON.stringify(obj.message)}</div>`, obj.callback);
          break;
      }
    }
});
```

-`坐标`

确定当前位置，如果无法以“纬度，经度”形式显示，则使用`system.config`坐标

- `divider` - 纬度和经度之间的分隔符。默认为“，”（如果未定义 longitudeName 和 latitudeName，则使用）
- `autoInit` - 如果为空，则使用当前坐标初始化字段
- `longitudeName` - 如果定义，经度将存储在此属性中，分隔符将被忽略
- `latitudeName` - 如果定义，纬度将存储在此属性中，分隔符将被忽略
- `useSystemName` - 如果已定义，则会显示带有“使用系统设置”的复选框，并从 `system.config` 中读取纬度、经度，并将布尔值保存到给定的名称

-`界面`

选择实例运行的主机的接口

- `ignoreLoopback` - 不显示环回接口（127.0.0.1）
- `ignoreInternal` - 不显示内部接口（通常也是 127.0.0.1）

- `license` - 如果尚未接受，则显示许可证信息。必须定义属性 `texts` 或 `licenseUrl` 之一。当许可证被接受时，定义的配置属性将设置为 `true`。
- `texts` - 包含文本的段落数组，每个段落将显示为单独的段落
- `licenseUrl` - 许可证文件的 URL（例如 https://raw.githubusercontent.com/ioBroker/ioBroker.docs/master/LICENSE）
- `title` - 许可证对话框的标题
- `agreeText` - 同意按钮的文本
- `checkBox` - 如果定义，则显示具有给定名称的复选框。如果选中，则将启用同意按钮。

- `checkLicense` - 非常特殊的组件，用于在线检查许可证。它需要本机中的 `license` 和 `useLicenseManager` 属性。
- `uuid` - 检查 UUID
- `version` - 检查版本

- `uuid` - 显示 iobroker UUID

- `port` - 端口的特殊输入。它会自动检查端口是否被其他实例使用并显示警告。
- `min` - 允许的最小端口号。它可以是 0。如果值为零，则不会检查端口是否被占用。

-

- `state` - 显示来自状态的控制或信息
- `oid` - 应采用哪个对象 ID 进行控制。该 ID 不带“adapter.X.”前缀
- `system` - 如果为真，状态将从 system.adapter.XX.I. 获取，而不是从 XX.I 获取
- `control` - 如何显示状态值：`text`、`html`、`input`、`slider`、`select`、`button`、`switch`、`number`
- `controlled` - 如果为 true，状态将显示为开关、选择、按钮、滑块或文本输入。仅在未定义控制属性时使用
- `unit` - 将单位添加到值中
- `trueText` - 如果值为真，则显示此文本
- `trueTextStyle` - 如果值为 true，则为文本样式
- `falseText` - 如果值为 false 或者控件是“按钮”，则显示此文本
- `falseTextStyle` - 如果值为 false 或者控件是“按钮”，则为文本的样式
- `trueImage` - 如果值为 true，则显示此图像
- `falseImage` - 如果值为 false 或者控件是“按钮”，则显示此图像
- `min` - 控制类型滑块或数字的最小值
- `max` - 控制类型滑块或数字的最大值
- `step` - 控制类型滑块或数字的步长值
- `controlDelay` - 滑块或数字的延迟（以毫秒为单位）
- `variant` - 按钮的变体：`contained`, `outlined`, `text`

- `deviceManager` - 显示设备管理器。为此，适配器必须支持设备管理器协议。请参阅 iobroker/dm-utils。

以下是如何在选项卡中显示设备管理器的示例：

```
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
所有类型都可以有：

- `sm` - 小屏幕上屏幕宽度为 1/12
- `md` - 中间屏幕的宽度为屏幕的 1/12
- `lg` - 大屏幕上的 1/12 宽度
- `xs` - 小屏幕上的宽度为屏幕的 1/12
- `newLine` - 应从新行开始显示
- `label` - 字符串或对象，如 {en: 'Name', ru: 'Имя'}
- `hidden` - 可以使用 `native.attribute` 进行计算的 JS 函数
- `hideOnlyControl` - 如果隐藏，则会显示该位置，但没有控件
- `disabled` - 可以使用 `native.attribute` 进行计算的 JS 函数
- `help` - 帮助文本（多语言）
- `helpLink` - 帮助 href（只能与 `help` 一起使用）
- `style` - ReactJS 符号中的 css 样式：`radiusBorder` 而不是 `radius-border`。
- `darkStyle` - 暗黑模式的 css 样式
- `validator` - JS 函数：true 无错误，false - 错误
- `validatorErrorText` - 验证器失败时显示的文本
- `validatorNoSaveOnError` - 如果出现错误则禁用保存按钮
- `tooltip` - 可选的工具提示
- `default` - 默认值
- `defaultFunc` - 用于计算默认值的 JS 函数
- `defaultSendTo` - 从运行实例请求初始值的命令，例如：“myInstance”：{“type”：“text”，“defaultSendTo”：“fill”}`
- `data` - 静态数据
- `jsonData` - 静态数据
- 如果没有定义 `data` 和 `jsonData`，则将发送以下信息 `{"attr": "<属性名称>", "value": "<当前值>"}`
- `button` - 用于重新触发实例请求的按钮标签
- `buttonTooltip` - 按钮工具提示（默认：`按实例请求数据`）
- `buttonTooltipNoTranslation` - 不翻译按钮工具提示
- `allowSaveWithError` - 即使实例处于离线状态也允许保存配置
- `placeholder` - 占位符（用于文本控制）
- `noTranslation` - 不翻译选择或其他选项（不用于帮助、标签或占位符）
- `onChange` - 结构形式为 `{"alsoDependsOn": ["attr1", "attr2"], "calculateFunc": "data.attr1 + data.attr2", "ignoreOwnChanges": true}`
- `doNotSave` - 不保存此属性，因为仅用于内部计算
- `noMultiEdit` - 如果此标志设置为 true，则当用户选择多个对象进行编辑时，此字段将不会显示。
-`确认`
- `condition` - JS 函数：true 显示确认对话框
- `text` - 确认对话框的文本
- `title` - 确认对话框的标题
- `ok` - 确定按钮的文本
- `cancel` - 取消按钮的文本
- `type` - 以下之一：`info`, `warning`, `error`, `none`
- `alsoDependsOn` - 带有属性的数组，也用于通过这些属性检查条件

```
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
                    "validator": "'"!!data.name"'", // else error
                    "hidden": "data.myType === 1", // hidden if myType is 1
                    "disabled": "data.myType === 2" // disabled if myType is 2
                },
                "options.myType": { // name could support more than one levelhelperText
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
                }
            }
        },
        "tab2": {
            "label": "Tab2",
            "disabled": "data.myType === 1",
            "hidden": "data.myType === 2",
        }
    },
}
```

`Number`、`text`、`checkbox`、`select` 支持自动完成功能，以便在用作自定义设置时选择选项。
在这种情况下，该值将作为所有可能值的数组提供。

例子：

```
...
   "timeout": {
      "type": "number",
      "label": "Timeout"
   }
...

data: {
   timeout: [1000, 2000, 3000]
}
```

在这种情况下，输入必须是文本，显示为`__different__`，并带有三个可能值的自动完成选项。
用户可以从下拉列表中选择 1000、2000 或 3000，也可以输入自己的新值，例如 500。

如果值为 [false, true]，布尔值必须支持不确定

对于未改变的`__different__`必须返回不同的值：

```
Input:
data: {
   timeout: [1000, 2000, 3000]
}

Output if timeout was not changed:
newData: {
   timeout: "__different__"
}
```

值`__different__` 被保留，并且没有任何文本输入可以接受来自用户的该值。

组件必须看起来像

```
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
- `数字` => 数字
- 名称 `bind` => ip
- 名称 `port` => 数字，最小值=1，最大值=0xFFFF
- 名称 `timeout` => 数字，帮助="ms"

如果元素没有属性`type`，则假定它具有默认类型“面板”。

## 面板样式
您也可以为面板提供样式。以下是带有面板背景的示例：

```json
{
  "i18n": true,
  "type": "panel",
  "style": {
    "backgroundImage": "url(adapter/mpd/background.png)",
    "backgroundPosition": "top",
    "backgroundRepeat": "no-repeat",
    "backgroundSize": "cover"
  },
  "items": {
    "...": {}
  }
}
```

国际化
提供翻译的选项有多种。
只有第一个与我们的社区翻译工具 Weblate 兼容，因此它应该比其他的更受青睐！

1.用户可以提供文件中的文本。

在结构的顶层设置`i18n: true`并在管理中提供文件：

-`admin/i18n/de/translations.json`
-`admin/i18n/en/translations.json`
- ...

或者

-`admin/i18n/de.json`
-`admin/i18n/en.json`
- ...

此外，用户可以提供 i18n 文件的路径，`i18n: "customI18n"`并在管理员中提供文件：

-`admin/customI18n/de/translations.json`
-`admin/customI18n/en/translations.json`
- ...

或者

-`admin/customI18n/de.json`
-`admin/customI18n/en.json`
- ...

2. 用户可以直接在标签中提供翻译，例如：

```
{
   "type": "text",
   "label: {
        "en": "Label",
        "de": "Taxt"
    }
}
```

3. 用户可以在 i18n 属性中提供翻译：

```
{
    "18n": {
        "My Text: {
            "en": "My Text",
            "de": "Mein Text"
        },
        "My Text2: {
            "en": "My Text2",
            "de": "Mein Text2"
        },
    },
    "type": "panel",
    ...
}
```

我们建议尽可能使用变体 1，因为它可以使用 Weblate 处理文本。

JS 函数
### 配置对话框
JS 函数为：

```
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
  '_changed'       // indicator if some data was changed and must be saved
  myValidator.includes('return') ? myValidator : 'return ' + myValidator); // e.g. "_alive === true"

const isValid = func(data, systemConfig.common, instanceAlive, adapter.common, this.props.socket);

```

如果`alive`状态发生变化，则所有字段都必须重新更新、验证、禁用和隐藏。

适配器设置中的 JS 函数中有以下变量可用：

- `data` - 此实例或表中当前行的本机设置（要访问所有设置，请使用 globalData）
- `_system` - 系统配置
- `_alive` - 实例是否处于活动状态
- `_common` - 此实例的通用设置
- `_socket` - 套接字
- `_instance` - 实例编号
- `arrayIndex` - 仅在表中使用，表示数组中的当前行
- `globalData` - 仅在表的所有设置中使用，而不仅仅是一行表

### 自定义设置对话框
JS 函数为：

```
const myValidator = "customObj.common.type === 'boolean' && data.options.myType == 2";

const func = new Function(
  'data',
  'originalData',
  '_system',
  'instanceObj',
  'customObj',
  '_socket',
  arrayIndex,
  myValidator.includes('return') ? myValidator : 'return ' + myValidator); // e.g. "_alive === true"

const isValid = func(data || this.props.data, this.props.originalData, this.props.systemConfig, instanceObj, customObj, this.props.socket);
```

自定义设置中的 JS 函数中可以使用以下变量：

- `data` - 当前自定义设置或表中的当前行（要访问所有设置，请使用 globalData）
- `originalData` - 未改变的数据
- `_system` - 系统配置
- `instanceObj` - 适配器实例对象
- `customObj` - 当前对象本身
- `_socket` - 套接字
- `arrayIndex` - 仅在表中使用，表示数组中的当前行
- `globalData` - 仅在表的所有设置中使用，而不仅仅是一行表

## 自定义组件
```
<CustomInstancesEditor
    common={common data}
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

您可以在[`telegram`](https://github.com/iobroker-community-adapters/ioBroker.telegram/tree/master/src-admin) 或在 [`pushbullet`](https://github.com/Jens1809/ioBroker.pushbullet/tree/master/src-admin) 适配器中找到示例。

## 架构
架构为[这里](https://github.com/ioBroker/adapter-react-v5/tree/master/schemas)