---
title: 适配器参考
lastChanged: 05.05.2021
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/dev/adapterref.md
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
hash: wE0vp1lO4JVPuSv9cchA14CeWT9kWSPotrwA3Bg+ekA=
---
# 适配器参考
## 数据结构 - 对象和状态
ioBroker 中的适配器是一个独立的进程，它在中央数据存储中读取和写入对象和状态。数据存储可以显示为数据库 (redis / couchDB) 或仅显示为文本文件，但连接方法始终相同 - 通过 API。这意味着开发人员不应该关心它是哪个数据库以及数据如何在那里存储和提供。

内存中有两种类型的数据：

* 对象
* 状态

对象是一些数据点的静态描述。状态是数据点的动态值。通常有一个对象，每个状态都有一个描述。 （但不是相反）。

对象还描述了：

* 主机配置
* 适配器说明
* 适配器实例的配置
* 配置 HTML 文件的内容
* WEB文件的内容
* 列表
* 用户
* 状态层次结构（通道和设备）

可以在“对象”选项卡上的管理适配器中检查对象和当前状态。

对象的 ID 由不同的部分组成。每个部分用“.”表示。彼此分开。有系统对象（ID 以 _ 或“系统”开头。）和适配器对象（ID 以适配器名称.实例编号开头）。

?> 注意：在描述中，**适配器名称**代表开发人员尝试创建的适配器的名称。

对象可以在通道中分组，通道可以在设备中分组。以下是 Homematic 设备和频道的示例：

```
* hm-rpc.0.IEQ1234567 - device
  * hm-rpc.0.IEQ1234567.0 - channel
    * hm-rpc.0.IEQ1234567.0.INFO - state
    * hm-rpc.0.IEQ1234567.0.RSSI - state
  * hm-rpc.0.IEQ1234567.0 - channel
    * hm-rpc.0.IEQ1234567.0.STATE - state
    * hm-rpc.0.IEQ1234567.0.BATTERY - state
```

对象 ID 必须始终以通道 ID 开头，通道 ID 必须以设备 ID 开头。例如，在上面的状态名称 hm-rpc.0.IEQ1234567.0.INFO 中，hm-rpc.0.IEQ1234567.0 部分是通道 ID，hm-rpc.0.IEQ1234567 是设备 ID。

这用于在层次结构中设置设备、通道和状态的协调。

?> 注意：如果适配器不是那么复杂，设备甚至通道都可以省略。

** Adapter ** 是一个文件包，存放在 node_modules 目录下。对于每个适配器，该适配器的描述可以在“system.adapter.adapterName”对象中找到。这些只是文件 io-package.json 中的“common”和“native”字段。当调用 `iobroker install adapterName` 或 `iobroker add adapterName` 时，会自动创建此条目。如果适配器是使用 `npm install iobroker.adapterName` 安装的，则在创建第一个实例之前不会创建任何条目。但这并不重要。 “更新”所需的信息直接从 io-package.json 读取。可以在 [这里](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/objectsschema.md) 中找到适配器常规设置的完整列表。

** Instance ** 是适配器的一个实例。根据适配器类型，可以创建多个实例。某些适配器只有一个，例如 Vis 或 Rickshaw。此行为由 io-package.json 中的标志控制。

对于每个实例，配置对象位于 ID“system.adapter.adapterName.X”下的数据存储中，其中 X 是适配器实例编号。它包含此适配器实例的设置。通常它由“common”和“native”设置组成。一般设置为：

*`启用`：真/假；
* `host`：此实例必须在其上运行的主机名；
* `mode`：无，守护进程，订阅，调度，一次；

描述可以在 [这里](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/objectsschema.md) 中找到。

`Native` 设置包含此适配器的特定配置，例如例如：设备的 IP 地址、设备设置等。

?> 注意：实例可以运行在不同的主机上（多主机），而且不同主机上的适配器可以有不同的版本。

适配器实例的所有对象 ID 都以适配器名称.X 开头，其中 X 是适配器实例的编号。

对象有不同的类型用于不同的目的。

对于每个适配器（不是实例），会自动创建以下对象：

* `system.adapter.adaptername`：适配器的描述（如名称、版本号、...）
* `适配器名称`：由适配器的“www”目录中的 HTML/JS/CSS 文件组成的对象。只有在适配器包中找到“www”目录时才会创建此对象。
* `adaptername.admin`：由适配器包的“admin”目录中的 HTML/JS/CSS 文件组成的对象。

为每个适配器实例“X”自动创建以下对象：

* `system.adapter.adaptername.X`：适配器实例的配置
* `system.adapter.adaptername.X.alive`：指示实例是否处于活动状态（每30秒发送一次消息）
* `system.adapter.adaptername.X.connected`：指定实例是否连接到数据存储。它可以连接，但由于死锁而无法发送活动消息。
* `system.adapter.adaptername.X.memHeapTotal`：总内存使用量
* `system.adapter.adaptername.X.memHeapUsed`：内存使用情况
* `system.adapter.adaptername.X.memRss`：内存使用情况
* `system.adapter.adaptername.X.uptime`：适配器运行的秒数。

可以在 [这里](http://stackoverflow.com/questions/12023359/what-do-the-return-values-of-node-js-process-memoryusage-stand-for) 中找到内存状态的说明。

如果适配器处于“无”或“一次”模式，则不会创建活动、正常运行时间等对象。

** 适配器的目录结构 **

适配器包必须包含一些必需的目录和文件：

* `admin`（必需目录）
* `index.html`
* `xxx.png` - 可选；更好：`adaptername.png`（支持所有图像格式：jpeg、jpg、svg、bmp、...）
* `www` - (需要的目录)
* `lib` - （因为 `utils.js` 需要目录）
* `utils.js`
* `package.json` - 必需
* `io-package.json` - 必需
* `main.js` - 必需（也可以是 `adaptername.js`）

?> 注：lib/utils.js 是所有适配器通用的文件，通过该文件可以确定js-controller 的位置和iobroker.js-controller/lib/adapter.js 对应的路径。当前的大部分 utils.js 都可以在这里下载。不要更改此文件！

## 文件名
为了被 ioBroker 控制器接受和启动，适配器必须遵守命名约定。

* 在 github（或其他地方）上，它必须命名为 `io **B** roker.adapterName`（大写 B）。
* 如果适配器要在 npm 上可用，它必须具有名称 iobroker.adaptername，因为 npm 不允许在包名称中使用大写字母。可以在 package.json 中定义
* 用于配置适配器的 GUI HTML 文件必须命名为 admin/index.html。 admin 目录中可以有更多文件，但必须存在 index.html。
* 适配器启动文件必须命名为 main.js 或 adaptername.js。
* 适配器名称必须唯一，小写，无特殊字符，无空格。适配器名称中允许使用“-”、“_”。

## Io-package.json 的结构
io-package.json 被 js-controller 用来显示关于适配器的信息并知道如何处理它。公共部分中所有字段的完整描述可以在 [这里] () 中找到。

io-package.json 由“admin”读取以找出适配器的在线版本。

###常用字段
最重要的常见字段是：

* `name`：必需。不带“ioBroker.”的适配器名称，即“adaptername”而不是“ioBroker.adaptername”
* `版本`：必需的。必须与 package.json 相同。
* `title`：必填。适配器的简称，如“适配器名称”
* `desc`：必要。适配器说明。它可以是像“这个适配器做这个和那个”这样的字符串或像这样的对象：

```
{
   "en": "This adapter does this and that",
   "de": "Dieser Aadpter macht dies und jenes",
   "ru": "Этот драйвер делает то и это"
}
```

如果没有当前语言的条目，则说明以英文显示。

* `平台`：必要。目前只支持`Javascript / Node.js`。
* `mode`：必要。适配器启动的模式。
* `已启用`：可选。如果为 true，则实例在添加后被激活。
* `license`：许可适配器的许可名称；
* `loglevel`：创建实例后设置的初始日志级别。可以是调试、信息、警告或错误
* `readme`：链接到 Internet 上的自述页面。管理适配器用于在“？”时显示链接按钮被点击。
* `icon`：适配器图标的图标名称（不是路径）。此图标必须位于适配器的管理员目录中。
* `extIcon`：Internet 上的图标路径，用于在适配器尚未安装时显示适配器的图标。
* `keywords`：关键字作为数组以在管理适配器中启用搜索。
* `localLink`：链接到适配器“www”文件（或适配器服务器）。 “http://192.168.0.100”
* `type`：以下类型是可能的：`hardware、social、storage、visual、api、scripting、weather、other、connection`。
* `messagebox`：可选。如果适配器要接收系统消息，则必须设置为 true。

?> 注意：localLink 可以有用真实值替换的特殊键。

* `% ip%`: 将被第一个“web”实例中定义的 IP 地址替换。
* `% field%`，其中 field 是来自适配器实例配置的 `native` 部分的属性。

例如，`http://%ip%:%port%` 显示为“http://192.168.0.1:8080”，其中“192.168.0.1”是“web”适配器的 IP 地址，8080 是 `system.adapter.adapterName.X => native.port` 的值。

### 对象字段
对象 - 适配器所有实例的静态对象 (xxx.object)。通过安装适配器（而不是创建实例），可以自动创建一些预定义的对象（通常用于描述某些内容）。这些对象不得依赖于特定实例并适用于该适配器的所有实例。例如，hm-rpc 适配器具有所有 HomeMatic 设备的结构描述。

此外，可以定义新视图。在 SQL 中，它们被称为“存储过程”，在 couchDB 视图中。

?> 注意：不要将视图与 `vis` 混合在一起。

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

此处定义了 hm-rpc 适配器的两个视图：`listDevices` 和 `paramsetDescription`。
它们从数据存储中返回按视图条件过滤的对象集。它可以有效地（使用 CouchDB 时）请求指定的对象列表。

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

`startkey` 和 `endkey` 的使用也可以在同一页面上找到。

?> 注意：视图的使用是可选的，需要开发者对 CouchDB 有基本的了解。

### 实例对象字段
一些特定的对象或具有类型状态的对象可以在 `io-package.json` 的 `instanceObjects` 中定义。

对于创建的每个实例，将创建 `instanceObjects` 字段中的所有条目。

例如，适配器 `hm-rpc` 为每个实例创建状态 `updated` 以便向另一个适配器发出信号，表明某些新设备出现在数据存储中并且需要由 §§SSSSS_2 进行处理§§.

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

没有必要提供对象的完整路径，也不能因为适配器实例未知。
`common.name`中的特殊词`%INSTANCE%`可用于在对象名称中表示。例如：

```
"name": "Some new devices added in hm-rpc.%INSTANCE%",
```

将扩展为

```
"name": "Some new devices added in hm-rpc.0,
```

通过创建第一个实例。

### Package.json
package.json 是 npm 包的标准描述文件。完整描述可以在 https://docs.npmjs.com/files/package.json 找到。

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

!> 所有字段都是必填字段。 `devDependencies` 也应该在里面以启用 grunt 任务。

＃＃＃ 提供
建议将代码放在 Github 上。在代码稳定并且可以安装适配器后，可以通过要求用户安装适配器来与其他用户共享适配器，如下所示：

```
npm install https://github.com/yourName/iobroker.adapterName/tarball/master/
```

如果一切正常并且来自用户的积极反馈，则适配器可以在 npm 上发布。
要是能提前在github上发表一下就好了。

发布是通过以下命令完成的：

```
npm publish
```

这可以在适配器目录中调用。确保已删除除所需文件以外的所有其他文件（例如 `.idea`），或将 `.gitignore` 添加到文件中。

当然，首先必须在 npm 上创建一个帐户。

?> 注意：同一版本的代码不能发布两次。因此，在发布之前增加 `package.json` 和 `io-package.json` 中的版本。

在适配器经过测试并且其他用户发现它有用后，可以将其传输到共享存储库，以便可以使用 `admin` 适配器进行安装。

## 这就是您创建自己的适配器的方式
在 https://github.com/ioBroker/ioBroker.template 您可以找到一些模板用于您自己的适配器。

如果要创建小部件或带有小部件的适配器，可以在 https://github.com/ioBroker/ioBroker.example/tree/master/VIS 找到这些。

### Main.js 的结构
```
var utils = require(__dirname + '/lib/utils'); // Get common adapter utils - mandatory
```

此行加载模块 `lib/utils.js`。所有适配器函数都有一个共同点，即找到 `iobroker.js-controller` 的根。
因为适配器可以安装在三种不同的路径中：

* `.../iobroker/node_modules/iobroker.adapterName` - 这是默认路径，推荐使用
* `... / iobroker.js-controller / node_modules / iobroker.adapterName` - 调试时使用
* `.../iobroker.js-controller/adapter/adapterName` - 旧样式（已弃用）

utils.js 除了搜索文件 `iobroker.js-controller/lib/adapter.js` 并加载它之外什么都不做。

```
var adapter = utils.adapter('adapterName'); // - mandatory
```

该行创建了名称为 `adapterName` 的对象 `adapter`。它加载实例 `adapterName.X` 的整个配置，其中 X 是适配器的实例编号。

`js-controller` 启动一个适配器作为它自己进程的一个分支，有两个参数：实例和协议级别；喜欢：

```
child_process.fork('pathToAdapter/main.js', '0 info');
```

一切都在 `adapter.js` 中自动处理，适配器的开发人员不必担心。

适配器支持 3 个额外的启动标志：

* `--install` - 即使没有可用的配置，也会启动适配器。由适配器用于通过安装适配器来执行安装过程。
* `--force` - 启动适配器，即使它在配置中被禁用
* `--logs` - 如果日志仅显示在日志表中，则在控制台中显示日志。

```
var myPacket1= require('myPacket1'); // add own module
```

然后适配器中需要的所有其他模块，例如B. 加载了 `fs`、`require` 等。
不要忘记在 `package.json` 中声明它们。

### 适配器选项
适配器对象只能使用 `utils.adapter('adapterName')` 之类的名称或以下附加参数创建：

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

所有处理程序都可以通过事件来模拟（见下文），例如

```
adapter.on('ready', function () {
    main();
});
```

###适配器对象的属性
您如何创建 `adapter` 对象

```
var adapter = utils.adapter('adapterName');
```

在此对象实例中创建了以下属性：

* `name` - 适配器的名称，例如B.`适配器名称`
* `host` - 运行适配器实例的主机名
* `instance` - 此适配器实例的实例编号
* `namespace` - 适配器对象的命名空间，例如B.`适配器名称.0`
* `config` - 适配器设置的本机部分
* `common` - 适配器设置的公共部分
* `systemConfig` - `iobroker-data / iobroker.json` 的内容（仅当 `options.systemConfig = true` 时）
* `log` - 记录器对象

####最重要的事件
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

!> *入口点* 所有初始化都将在 main 中进行，因为在“准备好”之前不会进行任何配置。

```
adapter.on('ready', function () {
* main();
});
```

####日志记录
能够为调试和控制目的记录事件是非常重要的。以下函数可用于记录事件：

```
adapter.log.debug("debug message"); // log message with debug level
adapter.log.info("info message");   // log message with info level (enabled by default for all adapters)
adapter.log.warn("warning");        // log message with info warn
adapter.log.error("error");         // log message with info error
```

没有必要指定消息的来源或时间。这些属性是自动添加的，例如

```
admin-0 2015-07-10 17:35:52 info successful connection to socket.io from xx.yy.17.17
```

当然，也可以使用 `console.log`、`console.debug` 或 `console.error`，但这些消息只有在控制台或编程 IDE 中手动启动适配器时才可见。

####实例配置
适配器对象有一个属性，用于读取实例的配置：`adapter.config`。
该对象由 `native` 部分的 `system.adapter.adapterName.X` 对象组成。例如，如果 `io-package.json` 看起来像这样：

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

因此，`adapter.config` 是相同的：

```
{
   "location": "Stuttgart",
   "language": ""
}
```

并在配置对话框中输入了用户的数据。实例配置的**公共**部分可以通过“适配器”对象的“公共”属性访问。例如，对于显示的 io-package.json 是“adapter.common”：

```
{
   "name": "adapterName"
}
```

要访问 ioBroker 配置（保存在文件 `iobroker-data/iobroker.json` 中），请将适配器选项 `systemConfig` 设置为 true。

```
var adapter = utils.adapter({
    name: 'adapterName',  // adapter name
    systemConfig:  true // load ioBroker configuration into systemConfig
});
```

要获取全局日期格式，选项 `useFormatDate` 必须设置为 true：

```
var adapter = utils.adapter({
    name: 'adapterName',  // adapter name
    useFormatDate:  true  // load from system.config the global date format
});
```

日期格式在adapter.dateFormat 下可用。

所有其他配置都可以使用功能 `getForeignObject` 手动读取。

** 如何读取状态 **

ioBroker 适配器中有两种读取状态的模式：

* 事件订阅（推荐）
* 投票

要订阅您自己的事件，必须调用以下命令：

`adapter.subscribeStates('*');` // 使用模式 `adapterName.X.*` 订阅此适配器实例的所有变量

`adapter.subscribeStates('memory*');` // 使用模式 `adapterName.X.memory*` 订阅此适配器实例的所有变量

如何订阅其他事件：

`adapter.subscribeForeignStates('yr.*.forecast.html');` // 变量 `forecast.html` 订阅所有适配器实例 `yr`。

占位符“*”可以在这两个函数中使用。

然后，您将收到事件 `stateChange` 并可以使用此值执行某些操作。
订阅后，您将不会收到当前状态，因为只有在发生更改时才会发生事件。
为了获得初始状态，您应该在开始时执行一次“Query”（通常在“Ready”事件中）。

轮询为了在开始时读取您自己的状态或读取间隔值，请使用函数`adapter.getState` 如下：

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

要读取其他适配器的状态，您应该使用函数 `adapter.getForeignState`。不支持通配符。

#### 命令和状态
在谈论状态时，应该区分命令和状态。 “命令”的 ack 标志为 false，由用户发送（通过 vis、Javascript 适配器、admin）以控制设备或特定适配器。通常适配器（例如 Homematic）会订阅它们自己的所有更改，如果某些状态更改为 ack = false，它们会尝试执行此命令（例如点亮）。

“状态”的标志 `ack` 为真，表示它来自设备或服务。
例如，如果天气适配器收到一个新的天气预报，它将以 `ack=true` 发布，或者如果 Homematic 温度计测量新的温度，它也会以 `ack=true` 发布。
即使用户实际打开灯，新状态也会通过 `ack=true` 发布。

`Ack=false` 通常通过在设备响应之后执行来覆盖。

例如，如果用户按下 `vis` 中的键并发送命令 `hm-rpc.0.kitchen.light=ON`。
Socket-io 适配器将带有 `kitchen.light = {val: 1, ack: false}` 的新状态发送到实例 `hm-rpc.0`。

Homematic Adapter 订阅了`hm-rpc.0` 的所有状态，并且当收到带有`ack=false` 的新状态时，它会将新值发送到物理交换机。

物理交换机执行命令并将自己的新状态 ON 发送到 `hm-rpc` 适配器。
适配器 `hm-rpc.0` 发布状态 `hm-rpc.0.kitchen.light={val: 1, ack: true}` 的新状态（带有时间戳）。

此更改不是由 hm-rpc 适配器进行的，因为 ack 为真。这是来自物理设备的确认。

#### 状态是怎么写的？
状态可以写为命令或状态。为此，必须使用 `adapter.setState` 和 `adapter.setForeignState`：

`adapter.setForeignState('otherAdapter.X.someState', 1);` // 控制其他适配器（不需要控制自己的状态，我们可以直接做）

`adapter.setState('myState', 1, true);` // 设置自己实例的新状态

`adapter.setState('myState', {val: 1, ack: true});` // 同上

```
adapter.setState('myState', 1, true, function (err) {
   // analyse if the state could be set (because of permissions)
   if (err) adapter.log.error(err);
});
```

注意：以下命令相同

```
adapter.setState('myState', 1, false);
adapter.setState('myState', 1);
```

#### 状态结构
状态是一个 Javascript 对象，具有以下属性：

* `val`：状态值（期望值或实际值）
* `ack`：方向标志。 false 为所需值，true 为实际值。默认值：false（命令）
* `ts`：时间戳为 1970 年 1 月 1 日午夜和指定日期之间的毫秒数。 Javascript 对象 Date 的 getTime() 方法的结果。默认值：当前时间。
* `lc`：上次更改的时间戳。与 ts 格式相同，但值的时间戳发生变化。该值可能会更新，但该值将保持不变。在这种情况下，lc 不会改变。
* `from`：定义值的适配器实例的名称，例如“system.adapter.web.0”（带有可见性）
* `expire`：（可选）可以设置以秒为单位的过期时间限制。在此之后，变量被设置为“零”。例如，通过适配器实例的“活动”状态。如果适配器实例在 30 秒内未触发“活动”状态，则将其标记为“关闭”。要设置过期状态，请使用以下代码 setState ('Variable', {val: true, expire: 30})
* `q`：（可选）质量。请参阅此处的说明

** 适配器的操作模式 **

适配器可以在不同的模式下运行。可以使用 common.mode 属性定义适配器的模式。

* `none` - 此适配器不会启动。
* `daemon` - 始终运行的进程（进程终止时重新启动）
* `subscribe` - 当状态 system.adapter ... alive 变为 true 时启动。 .alive 更改为 false 时退出，进程退出时将 .alive 设置为 false（进程退出时不重新启动）
* `schedule` - 根据在 system.adapter 中找到的计划启动... common.schedule - 通过重新安排新状态来响应 .schedule 中的更改
* `once` - 每次 system.adapter .. 对象更改时都会启动此适配器。完成后不会重新启动。

通常，适配器应该使用模式守护进程。

如果适配器每 X 分钟只检查一次，它应该使用 `schedule` 模式并一起定义 cron 计划（例如 `1 * * * *` - 每小时）。

#### 如何读取对象？
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

函数总是异步的。

适配器的对象必须按设备、通道和状态进行组织。

请参阅：getForeignObjects、findForeignObject、getForeignObject、getDevices、getChannels、getStatesOf

#### 对象是如何编写的？
通常可以使用两个函数来编写对象：`setObject, setForeignObject`。但是，有许多用于更改对象的帮助功能：

* `extendObject，extendForeignObject`
* `delObject, delForeignObject`
* `setObjectNotExists, setForeignObjectNotExists`
* `创建设备，删除设备`
* `创建频道，删除频道`
* `创建状态，删除状态`
* `addStateToEnum, deleteStateFromEnum`

extendObject 只读取一个对象，与特定对象合并并写回一个对象。

`xxxObject` 和 `xxxForeignObject` 之间的区别在于 `xxxObject` 会自动将 `adapter.instance.` 文本添加到对象 ID。

函数总是异步的。

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

#### Info.connection
当适配器建立连接并监控（例如到受控设备）时，它应该创建一个变量 `info.connection` 并等待。

在这种情况下，连接状态显示在 `admin` 中的实例列表中。如果需要，状态的质量取决于连接状态。

＃＃ 职能
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

## 事件
```
* ready
* objectChange(id, obj) (Warning obj can be null if deleted)
* message(obj)
* stateChange(id, state) (Warning state can be null if deleted)
* unload
```

###这是一个实例的创建方式
在 npm 中发布之前：复制到 ioBroker / node_modules，转到 `admin` 并添加一个实例。在 npm 中发布后：转到 `ioBroker/` 并写入 `npm install iobroker.xxx --production --no-optional --logevel=error`，转到 `admin` 并添加。

##这就是调试的方式
* 启动ioBroker
* 添加一个适配器实例
* 停用适配器实例
* 启动 WebStorm
* 创建用于使用 node.js 进行调试的配置。
* 应用标志：`--force, instance, log level`（你可以启动适配器为` node xxx.js 1 Debug --force`，1是实例索引（默认0，Debug是日志级别和`- -force`意味着设置“启用：假”。将被忽略）

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

＃＃ 最佳实践