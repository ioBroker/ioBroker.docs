---
title: 适配器参考
lastChanged: 05.05.2021
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/dev/adapterref.md
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
hash: NKbO1PQ3EGYvDTaYVbyi2KvWO781qT7NpopN1mx6IOw=
---
# 适配器参考
## 数据结构 - 对象和状态
ioBroker 中的适配器是一个独立的进程，用于读取对象和状态并将其写入中央数据存储。数据存储可以表示为数据库（redis / couchDB）或只是文本文件，但连接方法始终相同 - 通过 API。也就是说，开发人员不应该担心它是什么数据库以及如何在其中存储和提供数据。

内存中有两种类型的数据：

* 对象
* 状态

对象是一些数据点的静态描述。状态是数据点的动态值。通常有一个对象，其中包含每个状态的描述。 （但反之则不然）。

对象还描述：

* 主机配置
* 适配器说明
* 适配器实例的配置
* 配置 HTML 文件的内容
* WEB文件的内容
* 枚举
* 用户
* 状态层次结构（通道和设备）

可以在管理适配器的“对象”选项卡上检查对象及其当前状态。

对象的 ID 由不同的部分组成。每个部分都用“.”分隔。彼此分开。有系统对象（ID 以 _ 或“system.”开头）和适配器对象（ID 以适配器名称.实例编号开头）。

?> 注意：在描述中，**适配器名称**代表开发人员想要创建的适配器的名称。

对象可以分组为通道，通道可以分组为设备。以下是 Homematic 设备和通道的示例：

```
* hm-rpc.0.IEQ1234567 - device
  * hm-rpc.0.IEQ1234567.0 - channel
    * hm-rpc.0.IEQ1234567.0.INFO - state
    * hm-rpc.0.IEQ1234567.0.RSSI - state
  * hm-rpc.0.IEQ1234567.0 - channel
    * hm-rpc.0.IEQ1234567.0.STATE - state
    * hm-rpc.0.IEQ1234567.0.BATTERY - state
```

对象 ID 必须始终以通道 ID 开头，并且通道 ID 必须以设备 ID 开头。例如，在上面的状态名称 hm-rpc.0.IEQ1234567.0.INFO 中，hm-rpc.0.IEQ1234567.0 部分是通道 ID，hm-rpc.0.IEQ1234567 是设备 ID。

这用于建立层次结构中设备、通道和状态的协调。

?> 注意：如果适配器不是那么复杂，设备甚至通道都可以省略。

**Adapter**是一个文件包，放在node_modules目录下。对于每个适配器，可以在“system.adapter.adapterName”对象中找到该适配器的描述。这些只是 io-package.json 文件中的“common”和“native”字段。当调用 `iobroker install adapterName` 或 `iobroker add adapterName` 时，会自动创建此条目。如果适配器安装有`npm install iobroker.adapterName`，则在创建第一个实例之前不会创建任何条目。但这并不那么重要。 “更新”所需的信息直接从 io-package.json 中读取。适配器常规设置的完整列表可在 [这里](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/objectsschema.md) 中找到。

**实例**是适配器的实例。根据适配器类型，可以创建多个实例。有些适配器只有一个，例如 Vis 或 Rickshaw。此行为由 io-package.json 中的标志控制。

对于每个实例，配置对象位于数据存储中 ID“system.adapter.adapterName.X”下，其中 X 是适配器实例编号。它包含此适配器实例的设置。通常它由“通用”和“本机”设置组成。常规设置为：

* `启用`: true / false;
* `host`：该实例必须运行的主机名；
* `模式`：无、守护进程、订阅、调度、一次；

说明可参见[这里](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/objectsschema.md)。

`Native` 设置包含此适配器的特定配置，例如例如：设备IP地址、设备设置等。

?> 注意：实例可以运行在不同的主机（多主机）上，不同主机上的适配器可以有不同的版本。

所有适配器实例对象 ID 均以适配器名称.X 开头，其中 X 是适配器实例编号。

对象有不同的类型用于不同的目的。

为每个适配器（而不是实例）自动创建以下对象：

* `system.adapter.adaptername`：适配器的描述（例如名称、版本号...）
* `adaptername`：由适配器“www”目录的 HTML/JS/CSS 文件组成的对象。仅当在适配器包中找到 www 目录时才会创建此对象。
* `adaptername.admin`：由适配器包的“admin”目录中的 HTML/JS/CSS 文件组成的对象。

对于每个适配器实例“X”，将自动创建以下对象：

* `system.adapter.adaptername.X`: 适配器实例配置
* `system.adapter.adaptername.X.alive`：实例是否处于活动状态（每30秒发送消息）
* `system.adapter.adaptername.X.connected`：指示实例是否连接到数据存储。它可能已连接，但由于死锁而无法发送活动消息。
* `system.adapter.adaptername.X.memHeapTotal`: 总内存使用量
* `system.adapter.adaptername.X.memHeapUsed`: 内存使用情况
* `system.adapter.adaptername.X.memRss`: 内存使用情况
* `system.adapter.adaptername.X.uptime`：适配器运行的秒数。

内存状态的说明可以在[这里](http://stackoverflow.com/questions/12023359/what-do-the-return-values-of-node-js-process-memoryusage-stand-for)中找到。

如果适配器具有“none”或“once”模式，则不会创建活动、正常运行时间等对象。

**适配器目录结构**

适配器包必须包含一些必需的目录和文件：

* `admin`（必需目录）
* `index.html`
* `xxx.png` - 可选；更好：`adaptername.png`（支持所有图像格式：jpeg、jpg、svg、bmp，...）
* `www` - (必要的目录)
* `lib` - （由于`utils.js`而必需的目录）
* `utils.js`
* `package.json` - 必要
* `io-package.json` - 必要
* `main.js` - 必需（也可以是 `adaptername.js`）

?> 注意：lib/utils.js是所有适配器的公共文件，用于确定js控制器的位置以及iobroker.js-controller/lib/adapter.js对应的路径。最新的 utils.js 可以在此处下载。不要更改此文件！

## 文件名
为了被 ioBroker 控制器接受并启动，适配器必须遵守命名约定。

* 在 github（或其他地方）上，它必须命名为“io**B**roker.adapterName”（大写 B）。
* 如果适配器要在 npm 上可用，则必须将其命名为 iobroker.adaptername，因为 npm 不允许包名称中使用大写字母。可以在package.json中定义
* 用于配置适配器的 GUI HTML 文件必须命名为 admin/index.html。 “admin”目录中可以有更多文件，但必须存在index.html。
* 适配器启动文件必须命名为main.js 或adaptername.js。
* 适配器名称必须唯一，采用小写字母，不含特殊字符和空格。适配器名称中允许使用“-”、“_”。

## Io-package.json 的结构
js-controller 使用 io-package.json 显示有关适配器的信息以及如何处理它。公共部分中所有字段的完整描述可以在[这里]()找到。

“admin”读取 io-package.json 以查找适配器的在线版本。

### 公共字段
最重要的公共字段是：

* `名称`：必填。不带“ioBroker.”的适配器名称，即“adaptername”而不是“ioBroker.adaptername”
* `版本`：必填。必须与 package.json 相同。
* `标题`：必填。适配器的简称，例如“适配器名称”
* `desc`：必填。适配器的描述。它可以是像“这个适配器执行这个和那个”这样的字符串，也可以是像这样的对象：

```
{
   "en": "This adapter does this and that",
   "de": "Dieser Aadpter macht dies und jenes",
   "ru": "Этот драйвер делает то и это"
}
```

如果当前语言没有条目，则说明将以英语显示。

* `平台`：必填。目前仅支持“Javascript/Node.js”。
* `模式`：必填。适配器启动的模式。
* `启用`：可选。如果为true，则实例在添加后激活。
* `license`：适配器获得许可的许可证名称；
* `loglevel`: 实例创建后设置的初始日志级别。可以是“愚蠢”、“调试”、“信息”、“警告”或“错误”
* `readme`：链接到 Internet 上的自述文件页面。管理适配器使用它来在“？”时显示链接。按钮被点击。
* `icon`：适配器图标的图标名称（不是路径）。该图标必须位于适配器的管理员目录中。
* `extIcon`：互联网上的图标路径，用于在尚未安装适配器时显示适配器的图标。
* `keywords`：关键字作为数组以在管理适配器中启用搜索。
* `localLink`：链接到适配器“www”文件（或适配器服务器）。 “http://192.168.0.100”
* `type`：可以使用以下类型：`硬件、社交、存储、视觉、API、脚本、天气、其他、连接`。
* `消息框`：可选。如果适配器要接收系统消息，则必须设置为 true。

?> 注意：localLink 可以有用实际值替换的特殊键。

* `%ip%`：将替换为第一个“web”实例中定义的 IP 地址。
* `%field%`，其中 field 是适配器实例配置的“native”部分的属性。

例如，`http://%ip%:%port%` 显示为“http://192.168.0.1:8080”，其中“192.168.0.1”是“Web”适配器的 IP 地址，8080 是`system.adapter.adapterName.X => native.port` 的值。

### 对象字段
对象 - 适配器所有实例的静态对象 (xxx.object)。安装适配器（而不是创建实例）允许自动创建一些预定义对象（通常描述某些内容）。这些对象不能依赖于特定实例并适用于该适配器的所有实例。例如，hm-rpc适配器具有所有HomeMatic设备的结构描述。

此外，还可以定义新的视图。在 SQL 中它们被称为“存储过程”，在 couchDB 中被称为“视图”。

?> 注意：请勿将视图与`vis` 混合。

Javascript 语言用于视图定义。例子：

```
{
	"_id": "_design/hm-rpc",
	"language": "javascript",
	"views": {
		"listDevices": {
			"map": "function(doc) {\n  if (doc._id.match(/^hm-rpc\\.[0-9]+\\.\\*?[A-Za-z0-9_-]+(\\.[0-9]+)?$/)) {\n   emit(doc._id, {ADDRESS:(doc.native?doc.native.ADDRESS:''),VERSION:(doc.native?doc.native.VERSION:'')});\n  }\n}"
		},
		"paramsetDescription": {
			"map": "function(doc) {\n  if (doc._id.match(/^hm-rpc\\.meta/) && doc.meta.type === 'paramsetDescription') {\n   emit(doc._id, doc);\n  }\n}"
		}
	}
}
```

这里为 hm-rpc 适配器定义了两个视图：`listDevices` 和 `paramsetDescription`。
它们从数据存储中返回按视图条件过滤的对象集。它可以有效地（当使用 CouchDB 时）请求指定的对象列表。

例子：

```
adapter.objects.getObjectView('hm-rpc', 'listDevices',
    {startkey: 'hm-rpc.' + adapter.instance + '.', endkey: 'hm-rpc.' + adapter.instance + '.\u9999'},
    function (err, doc) {
	    if (doc && doc.rows) {
		    for (var i = 0; i < doc.rows.length; i++) {
			    var id  = doc.rows[i].id;
			    var obj = doc.rows[i].value;
			    console.log('Found ' + id + ': ' + JSON.stringify(obj));
		    }
            if (!doc.rows.length) console.log('No objects found.');
	    } else {
		    console.log('No objects found: ' + err);
	    }
    }
);
```

`startkey` 和 `endkey` 的用法也可以在同一页面上找到。

?> 注意：使用视图是可选的，并且要求开发人员具备 CouchDB 的基本知识。

### 实例对象字段
一些特定对象或具有类型状态的对象可以在`io-package.json`的`instanceObjects`中定义。

对于每个创建的实例，都会创建 `instanceObjects` 字段中的所有条目。

例如，适配器`hm-rpc`为每个实例创建状态`updated`，以向另一个适配器发出信号：数据存储中出现了一些新设备，并且它们需要由`hm-rega`处理。

```
"instanceObjects": [
	{
		"_id": "updated",
		"type": "state",
		"common": {
			"name": "Some new devices added",
			"type": "bool",
			"read":  true,
			"write": true
		}
	}
]
```

没有必要提供对象的完整路径，这是不可能的，因为适配器实例未知。
可以在 `common.name` 中使用特殊词`%INSTANCE%`，以在对象名称中指示它。例如：

```
"name": "Some new devices added in hm-rpc.%INSTANCE%",
```

将扩展至

```
"name": "Some new devices added in hm-rpc.0,
```

通过创建第一个实例。

### 包.json
package.json 是 npm 包的默认描述文件。完整的描述可以在 https://docs.npmjs.com/files/package.json 找到。

`package.json`的简短结构：

```
{
  "name": "iobroker.adapterName",
  "version": "0.0.1",
  "description": "Adapter XXX",
  "author": "myName<myemail@mail.com>"
  "homepage": "https://github.com/yourgit/ioBroker.adapterName",
  "readme": "https://github.com/yourgit/ioBroker.adapterName/blob/master/README.md",
  "keywords": ["ioBroker", "adapterName"],
  "repository": {
    "type": "git",
    "url": "https://github.com/yourgit/ioBroker.adapterName"
  },
  "dependencies": {
    "myPacket1": "~0.3.1",
    "myPacket2": "~2.1.0"
  },
  "devDependencies": {
    "grunt": "~0.4.4",
    "grunt-replace": "~0.7.6",
    "grunt-contrib-jshint": "~0.10.0",
    "grunt-jscs": "~0.6.1",
    "grunt-http": "~1.4.1",
    "grunt-contrib-clean": "~0.5.0",
    "grunt-contrib-compress": "~0.8.0",
    "grunt-contrib-copy": "~0.5.0",
    "grunt-exec": "~0.4.5"
  },
  "bugs": {
    "url": "https://github.com/yourgit/ioBroker.adapterName/issues"
  },
  "main": "main.js",
  "license": "MIT"
}
```

!> 所有字段均为必填。 `devDependencies` 也应该位于内部以启用基本任务。

＃＃＃ 部署
建议将代码放到Github上。代码稳定并且可以安装适配器后，可以通过要求用户安装适配器来与其他用户共享适配器，如下所示：

```
npm install https://github.com/yourName/iobroker.adapterName/tarball/master/
```

如果一切顺利并且来自用户的积极反馈，该适配器可以在 npm 上发布。
如果事先在 github 上有发布版本就好了。

发布是通过以下命令完成的：

```
npm publish
```

可以在适配器目录中访问它。确保除所需文件之外的所有文件均已删除（例如`.idea`），或将`.gitignore`添加到文件中。

当然，你需要先在npm上创建一个帐户。

?> 注意：同一版本的代码不能发布两次。因此，在发布之前增加`package.json`和`io-package.json`中的版本。

适配器经过测试并且其他用户发现它有用后，可以将其提交到共享存储库，以便可以通过`admin`适配器进行安装。

## 如何创建自己的适配器
您可以在 https://github.com/ioBroker/ioBroker.template 找到一些用于您自己的适配器的模板。

如果您想创建一个小部件或带有小部件的适配器，可以在 https://github.com/ioBroker/ioBroker.example/tree/master/VIS 找到它们。

### Main.js 的结构
```
var utils = require('./lib/utils'); // Get common adapter utils - mandatory
```

该行加载模块`lib/utils.js`。所有适配器函数的共同点是找到`iobroker.js-controller`的根。
因为适配器可以安装在三个不同的路径中：

* `.../iobroker/node_modules/iobroker.adapterName` - 这是默认路径，建议使用
* `.../iobroker.js-controller/node_modules/iobroker.adapterName` - 调试时使用
* `.../iobroker.js-controller/adapter/adapterName` - 旧样式（已弃用）

utils.js 除了查找文件`iobroker.js-controller/lib/adapter.js` 并加载它之外什么也不做。

```
var adapter = utils.adapter('adapterName'); // - mandatory
```

此行创建名为 `adapterName` 的对象 `adapter`。它加载实例`adapterName.X`的整个配置，其中X是适配器的实例编号。

`js-controller` 使用两个参数启动适配器作为其自身进程的分支：实例和协议级别；喜欢：

```
child_process.fork('pathToAdapter/main.js', '0 info');
```

一切都在`adapter.js`中自动处理，适配器的开发人员不必担心。

该适配器支持 3 个附加启动标志：

* `--install` - 即使没有配置也会启动适配器。由适配器用于通过安装适配器来执行安装操作。
* `--force` - 启动适配器，即使它在配置中被禁用
* `--logs` - 如果日志仅显示在日志表中，则在控制台中显示日志。

```
var myPacket1= require('myPacket1'); // add own module
```

适配器中所需的所有其他模块，例如B. `fs`、`require`等可以加载。
不要忘记在 `package.json` 中声明它们。

### 适配器选项
适配器对象只能使用 `utils.adapter('adapterName')` 之类的名称或使用以下附加参数来创建：

```
var adapter = utils.adapter({
    name: 'adapterName',    // mandatory - name of adapter
    dirname: '',            // optional - path to adapter (experts only)
    systemConfig: false,    // optional - if system global config must be included in object
                            // (content of iobroker-data/iobroker.json)
        config: null,       // optional - alternate global configuration for adapter (experts only)
    instance: null,         // optional - instance of the adapter
    useFormatDate: false,   // optional - if adapter wants format date according to global settings.
                            // if true (some libs must be preloaded) adapter can use "formatDate" function.
    logTransporter: false,  // optional - if adapter collects logs from all adapters (experts only)

    objectChange: null,     // optional - handler for subscribed objects changes
    message: null,          // optional - handler for messages for this adapter
    stateChange: null,      // optional - handler for subscribed states changes
    ready: null,            // optional - will be called when adapter is initialized
    unload: null,           // optional - will be called by adapter termination
    noNamespace: false      // optional - if true, stateChange will be called with id that has no namespace. Instead "adapter.0.state" => "state"
});
```

所有处理程序都可以通过事件来模拟（见下文），例如：

```
adapter.on('ready', function () {
    main();
});
```

### 适配器对象的属性
您如何创建 `adapter` 对象

```
var adapter = utils.adapter('adapterName');
```

在此对象实例中创建以下属性：

* `name` - 适配器的名称，例如例如“适配器名称”
* `host` - 运行适配器实例的主机名
* `instance` - 此适配器实例的实例号
* `namespace` - 适配器对象的命名空间，例如例如“适配器名称.0”
* `config` - 适配器设置的本机部分
* `common` - 适配器设置的公共部分
* `systemConfig` - `iobroker-data/iobroker.json` 的内容（仅当 `options.systemConfig = true` 时）
* `log` - 记录器对象

#### 最重要的事件
```
adapter.on('objectChange', function (id, obj) {
    adapter.log.info('objectChange ' + id + ' ' + JSON.stringify(obj));
});
```

```
adapter.on('stateChange', function (id, state) {
* adapter.log.info('stateChange ' + id + ' ' + JSON.stringify(state));

* // you can use the ack flag to detect if state is command(false) or status(true)
* if (!state.ack) {
* * adapter.log.info('ack is not set!');
* }
});
```

!> *入口点* 所有初始化必须在 main 中执行，因为在“准备好”之前不会进行任何配置。

```
adapter.on('ready', function () {
* main();
});
```

#### 日志记录
能够记录事件以用于调试和控制目的非常重要。以下函数可用于记录事件：

```
adapter.log.debug("debug message"); // log message with debug level
adapter.log.info("info message");   // log message with info level (enabled by default for all adapters)
adapter.log.warn("warning");        // log message with info warn
adapter.log.error("error");         // log message with info error
```

无需指明消息的来源或时间。这些属性是自动添加的，例如

```
admin-0 2015-07-10 17:35:52 info successful connection to socket.io from xx.yy.17.17
```

当然，也可以使用`console.log`、`console.debug` 或`console.error`，但这些消息仅在适配器在控制台或编程 IDE 中手动启动时可见。

#### 实例配置
适配器对象有一个用于读取实例配置的属性：`adapter.config`。
该对象由对象 `system.adapter.adapterName.X` 的`native`部分组成。例如，如果`io-package.json`看起来像这样：

```
{
   "common": {
       "name": "adapterName"
   },
   "native": {
       "location": "Stuttgart",
       "language": ""
   }
}
```

所以`adapter.config`是相等的：

```
{
   "location": "Stuttgart",
   "language": ""
}
```

并具有用户在配置对话框中输入的数据。实例配置的 **common** 部分可以使用“适配器”对象的“common”属性进行访问。例如，对于所示的 io-package.json，“adapter.common”是：

```
{
   "name": "adapterName"
}
```

要访问 ioBroker 配置（存储在文件`iobroker-data/iobroker.json`中），请将适配器选项`systemConfig`设置为 true。

```
var adapter = utils.adapter({
    name: 'adapterName',  // adapter name
    systemConfig:  true // load ioBroker configuration into systemConfig
});
```

要获取全局日期格式，`useFormatDate`选项必须设置为 true：

```
var adapter = utils.adapter({
    name: 'adapterName',  // adapter name
    useFormatDate:  true  // load from system.config the global date format
});
```

日期格式可在adapter.dateFormat 中找到。

所有其他配置都可以使用`getForeignObject`功能手动读取。

**如何阅读条件**

ioBroker 适配器中有两种读取状态的模式：

* 事件订阅（推荐）
* 投票

要订阅您自己的事件，必须调用以下命令：

`adapter.subscribeStates('*');` // 使用模式`adapterName.X.*` 订阅此适配器实例的所有变量

`adapter.subscribeStates('memory*');` // 使用模式`adapterName.X.memory*` 订阅此适配器实例的所有变量

如何订阅其他活动：

`adapter.subscribeForeignStates('yr.*.forecast.html');` // 订阅所有适配器实例`yr`的变量`forecast.html`。

通配符“*”可以在这两个函数中使用。

然后您将收到事件`stateChange`，并可以使用该值执行某些操作。
订阅后，您将不会收到当前状态，因为事件仅在发生更改时才会发生。
要获取初始状态，您应该在启动时轮询一次（通常在 Ready 事件中）。

轮询 要在启动时读取您自己的状态或以一定间隔读取值，请使用函数`adapter.getState`，如下所示：

```
adapter.getState('myState', function (err, state) {

  adapter.log.info(
      'State ' + adapter.namespace + '.myState -' +
      '  Value: '    + state.val +
      ', ack: '      + state.ack +
      ', time stamp: '   + state.ts  +
      ', last changed: ' + state.lc
  );
});
```

请注意，此结果是异步返回的。

要读取其他适配器的状态，您应该使用`adapter.getForeignState`函数。不支持通配符。

#### 命令和状态
在谈论状态时，应该区分命令和状态。 “Command”的 ack 标志为 false，由用户（通过 vis、javascript 适配器、admin）发送以控制设备或特定适配器。通常适配器（例如 Homematic）会订阅它们自己的所有更改，并且当某些状态更改为 ack = false 时，它们会尝试执行此命令（例如灯亮起）。

“状态”的 `ack` 标志为 true，表示它来自设备或服务。
例如，如果天气适配器收到了新的天气预报，它将以 `ack=true` 发布，或者如果 Homematic 温度计测量到新的温度，它也会以 `ack=true` 发布。
即使用户实际打开灯，新状态也会通过 `ack=true` 发布。

`Ack=false` 通常会在设备响应后被执行覆盖。

例如，如果用户按下 `vis` 中的键并发送命令 `hm-rpc.0.kitchen.light=ON`。
Socket-io 适配器将带有 `kitchen.light = {val: 1, ack: false}` 的新状态发送到实例 `hm-rpc.0`。

Homematic 适配器订阅了 `hm-rpc.0` 的所有状态，当收到 `ack=false` 的新状态时，它会将新值发送到物理交换机。

物理交换机执行命令并将其自身的新 ON 状态发送到`hm-rpc`适配器。
适配器`hm-rpc.0`发布状态`hm-rpc.0.kitchen.light={val: 1, ack: true}`的新状态（带有时间戳）。

此更改不是由 hm-rpc 适配器执行的，因为 ack 为 true。这是来自物理设备的确认。

#### 状态是怎么写的
状态可以写成命令或状态。为此，必须使用 `adapter.setState` 和 `adapter.setForeignState`：

`adapter.setForeignState('otherAdapter.X.someState', 1);` // 控制其他适配器（不需要控制自己的状态，我们直接做即可）

`adapter.setState('myState', 1, true);` // 设置您自己的实例的新状态

`adapter.setState('myState', {val: 1, ack: true});` // 同上

```
adapter.setState('myState', 1, true, function (err) {
   // analyse if the state could be set (because of permissions)
   if (err) adapter.log.error(err);
});
```

注意：以下命令是相同的

```
adapter.setState('myState', 1, false);
adapter.setState('myState', 1);
```

#### 状态结构
状态是一个具有以下属性的 Javascript 对象：

* `val`: 状态值（期望值或实际值）
* `ack`: 方向标志。 false 表示期望值，true 表示实际值。默认值： false（命令）
* `ts`：时间戳，表示 1970 年 1 月 1 日午夜与指定日期之间的毫秒数。 Javascript Date 对象的 getTime() 方法的结果。默认值：当前时间。
* `lc`: 最后修改的时间戳。与 ts 格式相同，但值的时间戳发生变化。可能值已更新，但值保持不变。在这种情况下 lc 不会改变。
* `from`: 设置值的适配器实例的名称，例如“system.adapter.web.0”（可见）
* `expire`：（可选）有一个选项可以设置过期超时（以秒为单位）。此后变量将设置为“零”。例如，它由适配器实例的“活动”状态确定。如果适配器实例在 30 秒内未触发“活动”状态，则将其标记为“关闭”。要设置过期状态，请使用以下代码 setState('Variable', {val: true, expire: 30})
* `q`：（可选）质量。请参阅此处的说明

**适配器操作模式**

适配器可以在不同的模式下运行。适配器的模式可以使用 common.mode 属性来定义。

* `none` - 该适配器不会启动。
* `daemon` - 始终运行的进程（进程终止时重新启动）
* `subscribe` - 当 system.adapter ... 活动状态更改为 true 时启动。 .alive 修改为 false 时退出，进程退出时设置 .alive 为 false（进程退出时不重新启动）
* `schedule` - 根据 system.adapter 中找到的时间表启动 ... common.schedule - 通过使用新状态重新安排来响应 .schedule 的更改
* `once` - 每次修改 system.adapter .. 对象时都会启动此适配器。完成后不会重新启动。

通常适配器应该使用模式守护程序。

如果适配器仅检查某些内容

#### 对象是如何读取的？
可以使用 getObject 或 getForeignObject 命令读取对象：

```
adapter.getForeignObject('otherAdapter.X.someState', function (err, obj) {
  if (err) {
    adapter.log.error(err);
  } else {
    adapter.log.info(JSON.stringify(obj));
  }
});

adapter.getObject('myObject', function (err, obj) {

});
```

函数始终是异步的。

适配器对象必须被组织成设备、通道和状态。

请参阅：getForeignObjects、findForeignObject、getForeignObject、getDevices、getChannels、getStatesOf

#### 对象是如何编写的？
通常可以使用两个函数来写入对象：`setObject, setForeignObject`。然而，有很多修改对象的帮助函数：

* `扩展对象，扩展外部对象`
* `delObject，delForeignObject`
* `setObjectNotExists, setForeignObjectNotExists`
* `创建设备，删除设备`
* `创建频道，删除频道`
* `创建状态，删除状态`
* `addStateToEnum，deleteStateFromEnum`

ExtendObject 只是读取一个对象，与特定对象合并，然后写回一个对象。

`xxxObject` 和 `xxxForeignObject` 之间的区别在于，`xxxObject` 自动使用 `adapter.instance.` 文本扩展对象 ID。

函数始终是异步的。

```
adapter.getForeignObject('otherAdapter.X.someState', function (err, obj) {
  if (err) {
    adapter.log.error(err);
  } else {
    adapter.log.info(JSON.stringify(obj));
    obj.native = {}; // modify object
    adapter.setForeignObject(obj._id, obj, function (err) {
      if (err) adapter.log.error(err);
    });
  }
});
```

#### 信息连接
当适配器连接并监视（例如连接到受控设备）时，它应该创建并维护变量`info.connection`。

在这种情况下，连接状态将显示在 `admin` 的实例列表中。如果需要，状态的质量取决于连接状态。

＃＃ 特征
```
* setObject = function setObject(id, obj, callback)
* extendObject = function extendObject(id, obj, callback)
* setForeignObject = function setForeignObject(id, obj, callback)
* extendForeignObject = function extendForeignObject(id, obj, callback)
* getEnum = function getEnum(_enum, callback)
* getEnums = function getEnums(_enumList, callback)
* getForeignObjects = function getForeignObjects(pattern, type, enums, callback)
* findForeignObject = function findForeignState(id, type, callback)
* getForeignObject = function getForeignObject(id, callback)
* delObject = function delObject(id, callback)
* delForeignObject = function delForeignObject(id, callback)
* subscribeObjects = function subscribeObjects(pattern)
* subscribeForeignObjects = function subscribeObjects(pattern)
* setObjectNotExists = function setObjectNotExists(id, object, callback)
* setForeignObjectNotExists = function setForeignObjectNotExists(id, obj, callback)
* createDevice = function createDevice(deviceName, common, _native, callback)
* createChannel = function createChannel(parentDevice, channelName, roleOrCommon, _native, callback)
* createState = function createState(parentDevice, parentChannel, stateName, roleOrCommon, _native, callback)
* deleteDevice = function deleteDevice(deviceName, callback)
* addChannelToEnum = function addChannelToEnum(enumName, addTo, parentDevice, channelName, callback)
* deleteChannelFromEnum = function deleteChannelFromEnum(enumName, parentDevice, channelName, callback)
* deleteChannel = function deleteChannel(parentDevice, channelName, callback)
* deleteState = function deleteState(parentDevice, parentChannel, stateName, callback)
* deleteStateFromEnum('', parentDevice, parentChannel, stateName);
* getDevices = function getDevices(callback)
* getChannelsOf = function getChannelsOf(parentDevice, callback)
* getStatesOf = function getStatesOf(parentDevice, parentChannel, callback)
* addStateToEnum = function addStateToEnum(enumName, addTo, parentDevice, parentChannel, stateName, callback)
* deleteStateFromEnum = function deleteStateFromEnum(enumName, parentDevice, parentChannel, stateName, callback)
* rmDir = function rmDir(path, callback)
* mkDir = function mkDir(path, mode, callback)
* readDir = function readDir(adapter, path, callback)
* unlink = function unlink(adapter, name, callback)
* rename = function rename(adapter, oldName, newName, callback)
* mkdir = function mkdir(adapter, dirname, callback)
* readFile = function readFile(adapter, filename, options, callback)
* writeFile = function writeFile(adapter, filename, data, mimeType, callback)
* formatDate = function formatDate(dateObj, isSeconds, _format)
* sendTo = function sendTo(objName, command, message, callback)
* sendToHost = function sendToHost(objName, command, message, callback)
* setState = function setState(id, state, callback)
* setForeignState = function setForeignState(id, state, callback)
* getState = function getState(id, callback)
* getStateHistory = function getStateHistory(id, start, end, callback)
* getForeignStateHistory = function getStateHistory(id, start, end, callback)
* idToDCS = function idToDCS(id)
* getForeignState = function getForeignState(id, callback)
* delForeignState = function delForeignState(id, callback)
* delState = function delState(id, callback)
* getStates = function getStates(pattern, callback)
* getForeignStates = function getForeignStates(pattern, callback)
* subscribeForeignStates = function subscribeForeignStates(pattern)
* unsubscribeForeignStates = function unsubscribeForeignStates(pattern)
* subscribeStates = function subscribeStates(pattern)
* getSession = function getSession(id, callback)
* setSession = function setSession(id, ttl, data, callback)
* destroySession = function destroySession(id, callback)
* getMessage = function getMessage(callback)
* lenMessage = function lenMessage(callback)
* setBinaryState = function setBinaryState(id, binary, callback)
* getBinaryState = function getBinaryState(id, callback)
* getPort = function adapterGetPort(port, callback)
* checkPassword = function checkPassword(user, pw, callback)
* setPassword = function setPassword(user, pw, callback)
* checkGroup = function checkGroup(user, group, callback)
* stop (common.mode: subscribe, schedule, once)
* terminate
* setInteral
* clearInterval
* setTimeout
* clearTimeout
* log.debug(msg)
* log.info(msg)
* log.warn(msg)
* log.error(msg)
```

## 活动
```
* ready
* objectChange(id, obj) (Warning obj can be null if deleted)
* message(obj)
* stateChange(id, state) (Warning state can be null if deleted)
* unload
```

### 这就是创建实例的方式
在发布到 npm 之前：复制到 ioBroker/node_modules，转到 `admin` 并添加实例。发布到 npm 后：转到 `ioBroker/` 并写入 `npm install iobroker.xxx --production --no-optional --logevel=error`，转到 `admin` 并添加。

## 这是调试方法
* 启动ioBroker
* 添加适配器实例
* 禁用适配器实例
* 启动WebStorm
* 使用node.js创建调试配置
* 应用程序的标志：`--force，实例，日志级别`（您可以将适配器启动为`node xxx.js 1 Debug --force`，1是实例索引（默认为0，调试是日志级别，`- -force ` 表示忽略“enabled: false”设置。）

## 管理.html
```
* function showMessage(message, title, icon)
* function getObject(id, callback)
* function getState(id, callback)
* function getEnums(_enum, callback)
* function getIPs(host, callback)
* function fillSelectIPs(id, actualAddr, noIPv4, noIPv6)
* function sendTo(_adapter_instance, command, message, callback)
* function sendToHost(host, command, message, callback)
* function fillSelectCertificates(id, type, actualValued)
* function getAdapterInstances(_adapter, callback)
* function getIsAdapterAlive(_adapter, callback)
* function addToTable(tabId, value, $grid, _isInitial)
* function enumName2Id(enums, name)
* function editTable(tabId, cols, values, top, onChange)
* function getTableResult(tabId, cols)
```

## 最佳实践