---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.webui/README.md
title: ioBroker.webui
hash: yjdW1qnpqD83Ji1Oov1Ih8lpB7KE38Q4PLHsdrpz/v0=
---
# IoBroker.webui
ioBroker 的 webui

![图像](https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.webui/master/screenshot.png)

＃＃ 描述
这是一个完整的ioBroker可视化系统。

它包括以下功能：

  - 自己的简单脚本语言
  - 绑定到 ioBroker 对象，包括转换器和 JavaScript 表达式
  - 从剪贴板粘贴图像
  - 拖放外部图像
  - 拖放 ioBroker 对象以自动创建绑定
  - 将 ioBroker 对象拖放到属性中以创建它们的绑定
  - 屏幕中 ioBroker 对象的相对信号路径（完整路径可以从外部移交给屏幕）
  - html代码的分割视图编辑
  - 全局样式表支持
  - 包含 web 组件的 npm 包的使用
  - 屏幕内的屏幕
  - 使用 ioBroker 的所有图标包
  - 使用 ioBroker 的图表
  - 使用组合信号对象 ID，例如"webui.0.test3.{webui.0.test3.select}" -> 这将使用 webui.0.test3.select 中的值作为信号名称

＃＃ 安装
### 依赖关系
  - 您需要安装 Web Adaptor。它适用于以下设置： ![image](https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.webui/master/web.png)

## 概念
＃＃＃ 描述
设计器使用 Web 组件，因此您设计的 HTML 位于 Web 组件的 Shdowroot 内部。这件男装，你不能穿<body>或者<html>样式表内部。要设置外部布局的样式，请使用“:host”选择器。这也意味着，您不能使用“on...”事件处理程序。使用“@...”事件分配。

### WebUI 中的自定义控件
您可以在 WebUI 中创建自己的可重用自定义控件。它可以有单独的 Javascript、属性和模板。

您可以使用“BaseCustomWebcomponent”的双括号语法和双花括号语法来创建从模板到设计器中定义的属性的绑定。大括号创建两种方式的绑定。
如果使用绑定对话框，则可以使用 ??Propertyname 绑定到属性，并通过 ?Propertyname 绑定到属性中的 ioBroker 对象。
在脚本中，您还可以写入自定义属性中定义的信号。

您还可以在 CustomControl 或 Screen 中包含 Javascript。您也可以使用导出函数“init(instance)”，当您的 CustomControl 被实例化时，该函数将被调用。 （也可以使用连接和断开功能）

## 赞助
如果您想帮助开发，请赞助该项目：https://github.com/sponsors/jogibear9988

## 开发中
  * 在 IOBroker 中安装存储库作为适配器
  * 将存储库下载到额外的“dev”目录，不要在ioBroker Node_modules目录内开发。
  * 在“dev”目录中执行以下步骤。

  * 安装依赖项

```
  $ npm install
```

  * 更改后编译 Typescript（或在 VsCode 中按 Ctrl + Shift + B 并选择“tsc watch”）

```
  $ npm run tsc
```

  * 调整“config.js”以匹配您的 iobroker 的 IP 地址和端口

   （运行“npm build”时，存储库根目录中的 config.js 将替换为“/config”中的 config.js）

```
    window.iobrokerHost = '192.168.1.2';
    window.iobrokerPort = '8082';
    window.iobrokerSocketScriptUrl = 'http://' + window.iobrokerHost + ':' + window.iobrokerPort + '/lib/js/socket.io.js';
```

  * 在本地服务器中运行应用程序

```
  $ npm start
```

  * 将 Chrome 导航至 [localhost:8000]() 以查看该应用程序。

### 有关开发的更多信息
  - 跑步

```
  $ npm run reflection
```

   重新创建用于属性网格的脚本反射文件

  - 跑步

```
  $ npm run build
```

   将编译后的文件和 node_modules 复制到 www 文件夹，以便可以通过 github 安装适配器

  - 跑步

```
  $ npm run release
  $ npm publish
```

要为 iobroker 创建正确的发布提交，请小心，这也会推送到 git 存储库。
请务必先编辑“CHANGELOG.md”，README.Md中“## **WORK IN PROGRESS**”中的文本将用于版本信息

## 有关适配器的信息。
该适配器基于以下设计器组件：https://github.com/node-projects/web-component-designer

您需要创建一个屏幕“start”，这是打开runtime.html时调用的第一个屏幕，但您可以通过查询参数更改它：runtime.html?screenName=screen2

## Changelog
<!--
	Placeholder for next versions:
	### __WORK IN PROGRESS__
-->
### 0.12.3 (2023-09-20)
- after eval removal, functions need a return

### 0.12.2 (2023-09-20)
- events names for 2way bindings need a editor

### 0.12.1 (2023-09-20)
- two way for indirect bindings

### 0.12.0 (2023-09-20)
- support indirect bindings via {...} in signals (like in vis)

### 0.11.2 (2023-09-17)
- check npm package name

### 0.11.1 (2023-09-16)
- fix build on windows

### 0.11.0 (2023-09-11)
- dragdrop fixes
- screen/control size fixes
- connected/disconnected callbacks

### 0.10.0 (2023-09-10)
- new script commands
- bugfix with bindings and empty events
- select exported function in javascript
- bugfix in save of screens
- typescript in scripts
- started work on translateable runtime

### 0.9.0 (2023-09-06)
- signal selector in properties
- screen selector in properties
- new screen had style in scripts
- indirect value/property acces from scripts via editor
- list multiple undo entries (on hold of undo)

### 0.8.0 (2023-09-03)
- update designer to add and fix some commands
- move screen/control scripts out of html code
- add a javascript editor view
- bugfix when states where null after a fresh install
- designer addons do now work again
- docking framework updated, cause of bugs with undocking

### 0.7.0 (2023-09-01)
- screens and controls have now settings (width, height, useGlobalStyle)

### 0.6.0 (2023-09-01)
- removed many uneeded files from installation

### 0.5.1 (2023-09-01)
- show version in ui

### 0.5.0 (2023-09-01)
- signal as property type
- removed svg-image control
- shorter custom control tag name
- better dynamics editor
- dock ui fixes
- control ui from backend (switch view, reload)

### 0.4.0 (2023-08-30)
- remove uneeded files from upload
- remove icons into extra iobroker packages
- support icon adapters
- rename screens & controls

### 0.3.0 (2023-08-29)
- default value for custom properties
- open screens only once
- property bindings default one way

### 0.2.3 (2023-08-28)
- rework how custom controls are initalized

### 0.2.2 (2023-08-28)
- better support & fixes of custom elements
- enum properties in custom controls
- sample custom controls

### 0.2.1 (2023-08-28)
- null ref fix in bindings

### 0.2.0 (2023-08-28)
- Import/Export of Screens/Images/Controls
- Define your own Controls directly in webui
- Drag/Drop of Icons/Images to Properties
- Drag/Drop of objects to Bindings-Editor Signalname
- Basic functionality of CustomControls

### 0.1.0 (2023-08-27)
-   initial public release

## License
The MIT License (MIT)

Copyright (c) 2023 jogibear9988 <jochen.kuehner@gmx.de>