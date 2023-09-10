---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/dev/adapterjsonconfig.md
title: ioBroker JSON 配置
hash: 3b5laR6XRnAsBaL2XM30/xCa9fg0OcqaW1ch6misfQM=
---
# IoBroker JSON 配置
Admin（从版本 6 开始）支持适配器的 JSON 配置。
可以在 JSON 文件中定义配置，然后在 Admin 中使用它。

可以在此处找到具有多个选项卡的 `jsonConfig.json` 文件示例：https://github.com/ioBroker/ioBroker.admin/blob/master/admin/jsonConfig.json5 以及仅包含一个面板的示例：https://github.com/ioBroker/ioBroker.admin/blob/master/admin/jsonConfig.json5 /github.com/ioBroker/ioBroker.dwd/blob/master/admin/jsonConfig.json

您可以以 JSON 或 JSON5 格式定义设置。 JSON5 更易于人类阅读并支持注释。

此外，对于 JSON 文件，您必须在 `common` 部分的 `io-package.json` 中定义：

```json
...
"adminUI": {
  "config": "json"
}
...
```

说明适配器支持 JSON 配置。

所有标签、文本、帮助文本都可以是多语言的或只是字符串。

*如果属性名称以“_”开头，则不会保存在对象中。*

## 可能的控件类型
可能的类型：

- `tabs` - 带有项目的选项卡
  - `items` - 带有面板的对象 `{"tab1": {}, "tab2": {}...}`

- `面板` - 带有项目的选项卡
  - `icon` - 选项卡可以有图标 (base64)
  - `label` - 选项卡的标签
  - `items` - 对象 `{"attr1": {}, "attr2": {}}...`
  - `可折叠` - 只能作为选项卡的一部分
  - `color` - 可折叠标题的颜色 `primary` 或 `secondary` 或什么都没有

- `text` - 文本组件
  - `maxLength` - 字段中文本的最大长度
  - `readOnly` - 只读字段
  - `trim` - 默认为 true。如果不需要修剪，请将此属性设置为“false”。
  - `minRows` - 默认值为 1。如果您想要一个包含多行的文本区域，请将此属性设置为 `2` 或更大。
  - `maxRows` - 文本区域的最大行数。仅当 `minRows` > 1 时使用。

- `数字`
  - `min` - 最小值
  - `max` - 最大值
  - `步骤` - 步骤

- `颜色` - 颜色选择器

- `checkbox` - 显示复选框

- `slider` - 显示滑块（仅限 Admin6）
  - `min` - （默认 0）
  - `max` - （默认 100）
  - `step` - （默认`（最大 - 最小）/ 100`）
  - `unit` - 滑块的单位

- `ip` - 绑定地址
  - `listenOnAllPorts` - 将 0.0.0.0 添加到选项
  - `onlyIp4` - 仅显示 IP4 地址
  - `onlyIp6` - 仅显示 IP6 地址
  - `noInternal` - 不显示内部 IP 地址

- `user` - 从 system.user 中选择用户。 （有颜色和图标）
  - `short` - 没有 system.user。

- `room` - 从 `enum.room` 选择房间（带有颜色和图标） - （仅限 Admin6）
  - `short` - 没有`enum.rooms。`
  - `allowDeactivate` - 允许让房间空着

- `func` - 从 `enum.func` 选择函数（带颜色和图标） - （仅限 Admin6）
  - `short` - 没有`enum.func。`
  - `allowDeactivate` - 允许让功能为空

- `选择`
  - `options` - `[{label: {en: "option 1"}, value: 1}, ...]` 或

                `[{"items": [{"label": "Val1", "value": 1}, {"label": "Val2", value: "2}], "name": "group1"}, {"items": [{"label": "Val3", "value": 3}, {"label": "Val4", value: "4}], "name": "group2"}, {"label": "Val5", "value": 5}]`

- `自动完成`
  - `选项` - `["value1", "value2", ...]` 或 `[{"value": "value", "label": "Value1"}, "value2", ...]`
  - `freeSolo` - 将 `freeSolo` 设置为 `true`，因此文本框可以包含任意值。

- `!icon` - base64 图标
  - `最大尺寸`
  - `最大宽度`
  - `最大高度`
  - `crop` - 如果为 true，则允许用户裁剪图像（仅适用于非 svg）
  - `square` - 宽度必须等于高度，或者裁剪必须只允许正方形作为形状

- `image` - 将图像保存为`adapter.X`对象的文件或属性中的base64
  - `filename` - 文件名是结构名称。在下面的示例中，`login-bg.png` 是 `writeFile("myAdapter.INSTANCE", "login-bg.png")` 的文件名
  - `accept` - html 接受属性，如 `image/*,.pdf`
  - `maxSize` - 要上传的文件的最大大小
  - `base64` - 如果为 true，则图像将保存为属性中的 data-url，否则保存为文件存储中的二进制文件
  - `!maxWidth`
  - `!maxHeight`
  - `!crop` - 如果为 true，则允许用户裁剪图像
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

- `objectId` - 对象 ID：显示名称、颜色和图标
    - `types` - 所需类型：`channel`、`device`、...（默认情况下只有 `state`）。它是单数，因为“type”已经被占用。
    - `root` - [可选] 仅显示此根对象及其子对象
    - `customFilter` - [可选] 不能与 `type` 设置一起使用。例子

`{common: {custom: true}}` - 仅显示具有某些自定义设置的对象 `{common: {custom: 'sql.0'}}` - 仅显示具有 sql.0 自定义设置的对象（仅特定实例） `{common: {custom: '_dataSources'}}` - 仅显示适配器对象 §§SSSSS_5§ § 或 `sql` 或 `history` `{common: {custom: 'adapterName.'}}` - 仅显示特定适配器（所有实例）的自定义设置的对象 `{type: 'channel'}` - 仅显示通道 `{type: ['channel', 'device']}` - 仅显示通道和设备 `{common: {type: 'number'}` - 仅显示“数字”类型的状态 `{common: {type: ['number', 'string']}` - 仅显示“数字和字符串”类型的状态 `{common: {role: 'switch']}` - 仅显示从开关开始的角色状态 `{common: {role: ['switch', 'button]}` -仅显示角色从 `switch` 和 `button` 开始的州

- `密码` - 密码字段

该字段类型仅在 UI 中起作用。
密码和其他敏感数据应加密存储！为此，必须在 io-package.json 的 [本机加密](https://github.com/ioBroker/ioBroker.js-controller#automatically-encryptdecrypt-configuration-fields) 下提供密钥。
此外，您可以通过将其添加到 `io-package.json` 文件中的 `protectedNative` 来保护此属性不被提供给除 `admin` 和 `cloud` 之外的其他适配器。

    - `repeat` - 重复密码必须与密码进行比较
    - `visible` - 如果允许通过切换视图按钮查看密码，则为 true
    - `maxLength` - 字段中文本的最大长度

- `实例`
    - `适配器` - 适配器的名称。使用特殊名称“_dataSources”，您可以获得带有标志“common.getHistory”的所有适配器。
    - `allowDeactivate` - 如果为 true。显示附加选项“停用”
    - `long` - 值看起来像 `system.adapter.ADAPTER.0` 而不是 `ADAPTER.0`
    - `short` - 值看起来像 `0` 而不是 `ADAPTER.0`
    - `all` - 添加到选项“all”选项，值为“*”

- `chips` - 用户可以输入单词，它将被添加（参见云 => 服务 => 白名单）。如果未定义“分隔符”，则输出为数组。
    - `delimiter` - 如果定义了它，那么该选项将存储为带有分隔符的字符串而不是数组。例如，通过 `delimiter=;` 你会得到 `a;b;c` 而不是 `['a', 'b', 'c']`

- `alive` - 仅指示实例是否处于活动状态，并且可以在“隐藏”和“禁用”中使用（不会保存在配置中）

  仅文本：实例正在运行，实例未运行

    - `instance` - 检查实例是否存活。如果未定义，则将使用当前实例。您可以在文本中使用“${data.number}”模式。
    - `textAlive` - 默认文本是“实例 %s 处于活动状态”，其中 %s 将被替换为“ADAPTER.0”。
    - `textNotAlive` - 默认文本是`实例 %s 不活动`，其中 %s 将被替换为 `ADAPTER.0`。

- `pattern` - 具有“https://${data.ip}:${data.port}”等模式的只读字段（不会保存在配置中）

  带有只读标志的文本输入，显示模式。

    - `copyToClipboard` - 如果为 true - 显示按钮
    - `模式` - 我的模式

- `sendto` - 将请求发送到实例的按钮 (https://github.com/iobroker-community-adapters/ioBroker.email/blob/master/admin/index_m.html#L128)
    - `命令` - （默认`发送`）
    - `jsonData` - 字符串 - `"{\"subject1\": \"${data.subject}\", \"options1\": {\"host\": \"${data.host}\" }}“`。您可以使用特殊变量“data._origin”和“data._originIp”将调用者 URL 发送到实例，例如“http://127.0.0.1:8081/admin”。
    - `数据` - 对象 - `{"subject1": 1, "data": "static"}`。您可以指定 jsonData 或 data，但不能同时指定两者。
    - `结果` - `{结果1: {en: 'A'}, 结果2: {en: 'B'}}`
    - `错误` - `{error1: {en: 'E'}, error2: {en: 'E2'}}`
    - “变体” - “包含”、“概述”或什么都没有
    - `openUrl` - 如果 true - 在新选项卡中打开 URL，如果响应包含属性 `openUrl`，例如 `{"openUrl": "http://1.2.3.4:80/aaa", "window": "_blank" ，“saveConfig”：true}`。如果“saveConfig”为 true，将请求用户保存配置。
    - `reloadBrowser` - 如果 true - 重新加载当前浏览器窗口，如果响应包含属性 `reloadBrowser`，如 `{"reloadBrowser": true}`。
    - `window` - 如果 `openUrl` 为 true，则这是新窗口的名称。如果响应包含“window”属性，则可能会被覆盖。

      `this.props.socket.sendTo(adapterName.instance, command || 'send', data, result => {});`

    - `icon` - 是否应显示图标：`auth`、`send`、`web`、`warning`、`error`、`info`、`search`。您可以使用“base64”图标。 （如果您需要更多图标，请通过问题请求）
    - `useNative` - 如果适配器返回带有 `native` 属性的结果，它将用于配置。如果“saveConfig”为 true，将请求用户保存配置。
    - `showProcess` - 在请求进行时显示微调器
    - `timeout` - 请求超时（以毫秒为单位）。默认值：无。

- `setState` - 设置实例状态的按钮
    - `id` - `system.adapter.myAdapter.%INSTANCE%.test`，可以使用占位符`%INSTANCE%`替换为当前实例名称
    - `ack` - false (默认 false)
    - `val` - '${data.myText}_test' 或数字。将从状态类型自动检测类型并完成转换
    - `okText` - 按下按钮将显示的警报
    - `变体` - `包含`、`概述`、''

- `staticText` - 静态文本，如描述
    - `label` - 多语言文本
    - `text` - 与标签相同

- `staticLink` - 静态链接
    - `label` - 多语言文本
    - `href` - 链接。链接可以是动态的，如“#tab-objects/customs/${data.parentId}”
    - `button` - 将链接显示为按钮
    - `variant` - 按钮类型（`outlined`、`contained`、`text`）
    - `color` - 按钮的颜色（例如`primary`）
    - `icon` - 是否应显示图标：`auth`、`send`、`web`、`warning`、`error`、`info`、`search`、`book`、`help`、`upload` 。您可以使用“base64”图标（以“data:image/svg+xml;base64,...”开头）。 （如果您需要更多图标，请通过问题请求）

- `staticImage` - 静态图像
    - `href` - 可选的 HTTP 链接
    - `src` - 图片名称（来自管理目录）

- `table` - 包含可以删除、添加、上移、下移的项目的表
    - `items` - `[{"type": 见上文，"width": px 或 %, "title": {"en": "header"}, "attr": "name", "filter": false ，“排序”：true，“默认”：“”}]`
    - `noDelete` - 如果禁用删除或添加，则为布尔值，如果 `noDelete` 为 false，则添加、删除和上移/下移应该可以工作
    - `objKeyName` - （旧设置，不要使用！） - `{"192.168.1.1": {delay: 1000,enabled: true}, "192.168.1.2": {delay: 2000,启用：假}}`
    - `objValueName` - （旧设置，不要使用！） - `{"192.168.1.1": "value1", "192.168.1.2": "value2"}` 中值的名称
    - `allowAddByFilter` - 即使设置了过滤器也允许添加
    - `showSecondAddAt` - 将显示表格底部第二个添加按钮的行数。默认5
    - `showFirstAddOnTop` - 在第一列顶部而不是左侧显示第一个加号按钮。
    - `clone` - [可选] - 是否应显示克隆按钮。如果为 true，将显示克隆按钮。如果是属性名称，则该名称将是唯一的。
    - `export` - [可选] - 是否应显示导出按钮。导出为 csv 文件。
    - `import` - [可选] - 是否应显示导入按钮。从 csv 文件导入。
    - `uniqueColumns` - [可选] - 指定需要具有唯一条目的列数组

- `accordion` - 可以删除、添加、上移、下移项目的手风琴（Admin 6.6.0 及更高版本）
    - `items` - `[{"type": 见上文，"attr": "name", "default": ""}]` - 项目可以像在 `panel` 上一样放置（xs、sm、md、 lg 和换行符）
    - `titleAttr` - 项目列表的键，应用作名称
    - `noDelete` - 如果禁用删除或添加，则为布尔值，如果 `noDelete` 为 false，则添加、删除和上移/下移应该可以工作
    - `clone` - [可选] - 是否应显示克隆按钮。如果为 true，将显示克隆按钮。如果是属性名称，则该名称将是唯一的。

- `jsonEditor` - json 编辑器

- `语言` - 选择语言
    - `system` - 默认允许使用 `system.config` 中的系统语言

- `证书`
    - `certType` - 位于：`public`、`private`、`chained`。但从 6.4.0 开始，您可以使用“证书”类型。

- `certificates` - 它是一种通用类型，可以为您管理 `certPublic`、`certPrivate`、`certChained` 和 `leCollection` 属性。

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

- `certCollection` - 选择证书集合或仅使用所有集合或根本不使用让我们加密。

- `自定义`（仅限 Admin6）
    - `name` - 将通过 props 提供的组件名称，例如 ComponentInstancesEditor
    - `url` - 组件的位置
        - `custom/customComponents.js`：在这种情况下，文件将从 `/adapter/ADAPTER_NAME/custom/customComponents.js` 加载
        - `https://URL/myComponent`：直接来自 URL
        - `./adapter/ADAPTER_NAME/custom/customComponent.js`：在这种情况下，文件将从 `/adapter/ADAPTER_NAME/custom/customComponents.js` 加载
    - `i18n` - 如果 `i18n/xx.json` 文件位于与组件或翻译对象 `{"text1": {"en": Text1"}}` 相同的目录中，则为 true

- `分隔线` - 水平线
    - `height` - 可选高度
    - `颜色` - 可选分隔线颜色或`主要`、`次要`

- `标题`
    - `文本`
    - `尺寸` - 1-5 => h1-h5

- `cron`
    - `complex` - 显示 CRON 的“分钟”、“秒”等
    - `simple` - 显示简单的 CRON 设置

- `文件选择器`（仅限 Admin6）
    - `pattern` - 文件扩展名模式。允许 `**/*.ext` 显示子文件夹中的所有文件，`*.ext` 显示根文件夹中的所有文件，或 `folderName/*.ext` 显示子文件夹 `folderName` 中的所有文件。默认`**/*.*`。
    - `fileTypes` - [可选] 文件类型：`音频`、`图像`、`文本`
    - `objectID` - `meta` 类型的对象 ID。您可以使用特殊占位符“%INSTANCE%”：如“myAdapter.%INSTANCE%.files”
    - `upload` - 存储上传文件的路径。如“文件夹名称”。如果未定义，则不会显示上传字段。要在根目录中上传，请将此字段设置为“/”。
    - `refresh` - 在选择附近显示刷新按钮。
    - `maxSize` - 最大文件大小（默认 2MB）
    - `withFolder` - 显示文件夹名称，即使所有文件都在同一文件夹中
    - `delete` - 允许删除文件
    - `noNone` - 不显示`none`选项
    - `noSize` - 不显示文件大小

- `文件`（仅限 Admin6）

  带有文件选择器的输入字段

    - `disableEdit` - 如果用户可以手动输入文件名而不仅仅是通过选择对话框
    - `limitPath` - 将选择限制为“meta”类型和以下路径的一个特定对象（非强制）
    - `filterFiles` - 如`['png', 'svg', 'bmp', 'jpg', 'jpeg']`
    - `filterByType` - `图像、代码、txt、音频、视频`
    - `allowUpload` - 允许上传文件
    - `allowDownload` - 允许下载文件（默认 true）
    - `allowCreateFolder` - 允许创建文件夹
    - `allowView` - 允许平铺视图（默认 true）
    - `showToolbar` - 显示工具栏（默认 true）
    - `selectOnlyFolders` - 用户只能选择文件夹（例如上传路径）

- `imageSendTo` - 显示从后端以 Base64 字符串形式接收的图像
    - `width` - QR 码的宽度（以 px 为单位）
    - `height` - QR 码的高度（以 px 为单位）
    - `命令` - 发送命令
    - `jsonData` - 字符串 - `{"subject1": "${data.subject}", "options1": {"host": "${data.host}"}}`。该数据将被发送到后端
    - `数据` - 对象 - `{"subject1": 1, "data": "static"}`。您可以指定 jsonData 或 data，但不能同时指定两者。如果未定义 jsonData，此数据将发送到后端。

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

- `选择发送至`

  显示带有实例值给定值的下拉菜单。

    - `命令` - 发送命令
    - `jsonData` - 字符串 - `{"subject1": "${data.subject}", "options1": {"host": "${data.host}"}}`。该数据将被发送到后端
    - `数据` - 对象 - `{"subject1": 1, "data": "static"}`。您可以指定 jsonData 或 data，但不能同时指定两者。如果未定义 jsonData，该数据将被发送到后端。
    - `manual` - 允许手动编辑。没有下拉菜单（如果实例离线）。默认为“true”。
    - `multiple` - 多项选择
    - `showAllValues` - 即使没有找到标签（多个）也显示项目，默认=`true`
    - `noTranslation` - 不翻译选择的标签

要使用此选项，您的适配器必须实现消息处理程序：命令的结果必须是格式为`[{"value": 1, "label": "one"}, ...]`的数组

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

- `自动完成发送到`

  使用实例值中给定的值显示自动完成控制。

  - `命令` - 发送命令
  - `jsonData` - 字符串 - `{"subject1": "${data.subject}", "options1": {"host": "${data.host}"}}`。该数据将被发送到后端
  - `数据` - 对象 - `{"subject1": 1, "data": "static"}`。您可以指定 jsonData 或 data，但不能同时指定两者。如果未定义 jsonData，该数据将被发送到后端。
  - `freeSolo` - 将 `freeSolo` 设置为 `true`，因此文本框可以包含任意值。
  - `alsoDependsOn` - 通过更改哪些属性，必须重新发送命令
  - `maxLength` - 字段中文本的最大长度

要使用此选项，您的适配器必须实现消息处理程序：命令的结果必须是格式为`["value1", {"value": "value2", "label": "Value2"}, ...]`的数组，请参阅`selectSendTo`查看处理程序示例

- `文本发送到`

  显示具有实例值给定值的只读控制。

  - `容器` - div、文本
  - `copyToClipboard` - 如果为 true - 显示按钮
  - `alsoDependsOn` - 通过更改哪些属性，必须重新发送命令
  - `命令` - 发送命令
  - `jsonData` - 字符串 - `{"subject1": "${data.subject}", "options1": {"host": "${data.host}"}}`。该数据将被发送到后端
  - `数据` - 对象 - `{"subject1": 1, "data": "static"}`。您可以指定 jsonData 或 data，但不能同时指定两者。如果未定义 jsonData，该数据将被发送到后端。

要使用此选项，您的适配器必须实现消息处理程序：命令的结果必须是字符串。

```
adapter.on('message', obj => {
    if (obj) {
      switch (obj.command) {
        case 'command':
          obj.callback && adapter.sendTo(obj.from, obj.command, 'Received ' + JSON.stringify(obj.message), obj.callback);
          break;
      }
    }
});
```

- `坐标`

  确定当前位置并使用`system.config`坐标（如果不可能以“纬度，经度”形式存在）

  - `divider` - 纬度和经度之间的分隔符。默认“,”（如果未定义 longitudeName 和 latitudeName，则使用）
  - `autoInit` - 如果为空，则用当前坐标初始化字段
  - `longitudeName` - 如果定义，经度将存储在此属性中，分隔符将被忽略
  - `latitudeName` - 如果定义，纬度将存储在此属性中，分隔符将被忽略
  - `useSystemName` - 如果定义，将显示“使用系统设置”复选框，并从 system.config 读取纬度、经度，并将布尔值保存到给定名称

- `license` - 显示许可证信息（如果尚未接受）。必须定义属性“texts”或“licenseUrl”之一。接受许可证后，定义的配置属性将设置为“true”。
  - `texts` - 带有文本的段落数组，每个段落将显示为单独的段落
  - `licenseUrl` - 许可证文件的 URL（例如 https://raw.githubusercontent.com/ioBroker/ioBroker.docs/master/LICENSE）
  - `title` - 许可证对话框的标题
  - `agreeText` - 同意按钮的文本
  - `checkBox` - 如果定义，将显示具有给定名称的复选框。如果选中，则将启用同意的按钮。

- `checkLicense` - 非常特殊的组件，用于在线检查许可证。它需要原生的 `license` 和 `useLicenseManager` 属性。
  - `uuid` - 检查 UUID
  - `版本` - 检查版本

- `uuid` - 显示 iobroker UUID
- `port` - 端口的特殊输入。它会自动检查端口是否被其他实例使用并显示警告

**注意：标有“！”的属性或控件尚未实现。**

## 控件常用属性
所有类型都可以有：

- `sm` - 小屏幕上屏幕宽度的 1/12
- `md` - 中间屏幕上屏幕宽度的 1/12
- `lg` - 大屏幕上屏幕宽度的 1/12
- `xs` - 在非常小的屏幕上宽度为屏幕的 1/12
- `newLine` - 应从新行显示
- `label` - 字符串或对象，例如 {en: 'Name', ru: 'Имя'}
- `hidden` - 可以使用 `native.attribute` 进行计算的 JS 函数
- `hideOnlyControl` - 如果隐藏该位置将显示，但没有控制
- `disabled` - 可以使用 `native.attribute` 进行计算的 JS 函数
- `help` - 帮助文本（多语言）
- `helpLink` - href 帮助（只能与 `help` 一起使用）
- `图标` - base64 svg
- `!encrypted` - 值是否加密（当然仅适用于文本）
  - 如果加密，则使用“__encrypted__”值进行显示，如果更改，则使用“socket.encrypt”对其进行加密
- `style` - ReactJS 表示法中的 css 样式：`radiusBorder` 而不是 `radius-border`。
- `darkStyle` - 深色模式的 css 样式
- `validator` - JS 函数： true 无错误， false - 错误
- `validatorErrorText` - 显示验证器失败的文本
- `validatorNoSaveOnError` - 如果出错则禁用保存按钮
- `tooltip` - 可选的工具提示
- `default` - 默认值
- `defaultFunc` - 计算默认值的 JS 函数
- `defaultSendTo` - 从正在运行的实例请求初始值的命令，例如：`"myInstance": {"type": "text", "defaultSendTo": "fill"}`
  - `data` - 静态数据
  - `jsonData` - 静态数据
  - 如果没有定义 `data` 和 `jsonData`，则将发送以下信息 `{"attr": "<attribute name>", "value": "<current value>"}`
  - `button` - 用于重新触发实例请求的按钮标签
  - `buttonTooltip` - 按钮工具提示（默认：`按实例请求数据`）
  - `buttonTooltipNoTranslation` - 不翻译按钮工具提示
- `placeholder` - 占位符（用于文本控制）
- `noTranslation` - 不翻译选择或其他选项（不用于帮助、标签或占位符）
- `onChange` - 形式为 `{"alsoDependsOn": ["attr1", "attr2], "calculateFunc": "attr1 + attr2", "ignoreOwnChanges": true}` 的结构
- `doNotSave` - 不要将此属性保存为仅用于内部计算
- `noMultiEdit` - 如果此标志设置为 true，则当用户选择多个对象进行编辑时，将不会显示此字段。
- `确认`
  - `condition` - JS 函数：true 显示确认对话框
  - `text` - 确认对话框的文本
  - `title` - 确认对话框的标题
  - `ok` - 确定按钮的文本
  - `cancel` - 取消按钮的文本
  - `type` - 以下之一：`info`、`warning`、`error`、`none`
  - `alsoDependsOn` - 带有属性的数组，也可以通过这些属性检查条件

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

`Number`、`text`、`checkbox`、`select` 支持自动完成，以便在用作自定义设置时允许选择选项。
在这种情况下，该值将以所有可能值的数组形式提供。

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

在这种情况下，输入必须是文本，如`__different__`所示，并具有 3 个可能值的自动完成选项。
用户可以从下拉列表中选择 1000、2000 或 3000 或输入自己的新值，例如500。

如果值为 [false, true]，布尔值必须支持不确定

对于未更改的`__different__`，必须返回不同的值：

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

值`__different__` 被保留，任何文本输入都不能接受来自用户的它。

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

如果未提供架构，则必须根据数据自动创建架构。

- `布尔值` => 复选框
- `text` => 文本输入
- `数字` => 数字
- 名称 `bind` => ip
- 名称 `port` => 数字，最小值=1，最大值=0xFFFF
- 名称 `timeout` => 数字，help="ms"

如果元素没有属性`type`，则假设它具有默认类型“面板”。

## 国际化
有多种选项可以提供翻译。
只有第一个与我们的社区翻译工具 Weblate 兼容，所以它应该比其他的更受青睐！

1. 用户可以提供文件中的文本。

在结构的顶层设置`i18n: true`并在管理中提供文件：

- `admin/i18n/de/translations.json`
- `admin/i18n/en/translations.json`
- ...

或者

- `admin/i18n/de.json`
- `admin/i18n/en.json`
- ...

此外，用户可以提供 i18n 文件的路径，`i18n: "customI18n"`并在管理中提供文件：

- `admin/customI18n/de/translations.json`
- `admin/customI18n/en/translations.json`
- ...

或者

- `admin/customI18n/de.json`
- `admin/customI18n/en.json`
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

我们建议使用变体 2，因为可以使用 Weblate 处理文本。

## JS 函数
### 配置对话框
JS函数是：

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

如果`alive`状态发生变化，则必须重新更新、验证、禁用、隐藏所有字段。

适配器设置中的 JS 函数中可以使用以下变量：

- `data` - 此实例或表中当前行的本机设置（要访问所有设置，请使用 globalData）
- `_system` - 系统配置
- `_alive` - 实例是否还活着
- `_common` - 此实例的通用设置
- `_socket` - 套接字
- `_instance` - 实例编号
- `arrayIndex` - 仅在表中使用并表示数组中的当前行
- `globalData` - 仅在表中用于所有设置，而不仅仅是一个表行

### 自定义设置对话框
JS函数是：

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
- `originalData` - 未更改的数据
- `_system` - 系统配置
- `instanceObj` - 适配器实例对象
- `customObj` - 当前对象本身
- `_socket` - 套接字
- `arrayIndex` - 仅在表中使用并表示数组中的当前行
- `globalData` - 仅在表中用于所有设置，而不仅仅是一个表行

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

您可以在[`telegram`](https://github.com/iobroker-community-adapters/ioBroker.telegram/tree/master/src-admin) 或在 [`pushbullet`](https://github.com/Jens1809/ioBroker.pushbullet/tree/master/src-admin)适配器中找到示例。

## 架构
架构为 [这里](https://github.com/ioBroker/adapter-react-v5/tree/master/schemas)