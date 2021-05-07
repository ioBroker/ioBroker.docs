---
title: 适配器参考
lastChanged: 05.05.2021
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/dev/adapterref.md
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
hash: VNEYNjstH+I1+ngC4LIIX38UBV+wjpexBJICrd3D5SM=
---
＃适配器参考
##数据结构-对象和状态
ioBroker中的适配器是一个独立的过程，用于在中央数据存储区中读写对象和状态。数据存储可以显示为数据库（redis / couchDB）或仅显示为文本文件，但是连接方法始终相同-通过API。这意味着开发人员不必在乎它是哪个数据库，以及如何在该数据库中存储和使用数据。

内存中有两种类型的数据：

*对象
* 状态

对象是某些数据点的静态描述。状态是数据点的动态值。通常，会有一个带有每个状态描述的对象。 （但不是相反）。

对象还描述：

*主机的配置
*适配器说明
*适配器实例的配置
*配置HTML文件的内容
* WEB文件的内容
*清单
*用户
*状态层次结构（通道和设备）

可以在“对象”选项卡上的管理适配器中检查对象和当前状态值。

对象的名称由不同部分组成。每个部分均以“。”表示。彼此分开。有系统对象（名称以_或“ system”开头。）和适配器对象（名称以adapterName开头）。

？>注意：在描述中，这里的** adapterName **代表开发人员要创建的适配器的名称。

可以在通道中将状态分组，而在设备中可以将通道分组。这是Homematic组和渠道的示例：

```
* hm-rpc.0.IEQ1234567 - device
  * hm-rpc.0.IEQ1234567.0 - channel
    * hm-rpc.0.IEQ1234567.0.INFO - state
    * hm-rpc.0.IEQ1234567.0.RSSI - state
  * hm-rpc.0.IEQ1234567.0 - channel
    * hm-rpc.0.IEQ1234567.0.STATE - state
    * hm-rpc.0.IEQ1234567.0.BATTERY - state
```

状态ID必须始终以通道名称开头，而通道名称必须以设备名称开头。例如，在上述状态名称hm-rpc.0.IEQ1234567.0.INFO中，部分hm-rpc.0.IEQ1234567.0是通道名称，而hm-rpc.0.IEQ1234567是设备名称。

这用于在层次结构中设置设备，通道和状态的协调。

？>注意：如果适配器不是那么复杂，则可以忽略设备甚至通道。

**适配器**是一个文件包，存储在node_modules目录中。对于每个适配器，可以在“ system.adapter.adapterName”对象中找到该适配器的描述。这些只是文件io-package.json中的“ common”和“ native”字段。当调用`iobroker install adapterName`或`iobroker add adapterName`时，将自动创建此条目。如果适配器与`npm install iobroker.adapterName`一起安装，则在创建第一个实例之前不会创建任何条目。但这不是那么重要。直接从io-package.json中读取“更新”所需的信息。适配器的常规设置的完整列表可以在[这里](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/objectsschema.md)中找到。

**实例**是适配器的实例。根据适配器类型，可以创建多个实例。对于某些适配器，只能使用一个，例如Vis或Rickshaw。此行为由io-package.json中的标志控制。

对于每个实例，配置对象都位于数据存储区中，标识为“ system.adapter.adapterName.X”，其中X是适配器实例号。它包含该适配器实例的设置。通常，它由“常规”和“本机”设置组成。常规设置为：

*`enabled`：是/否；
*`host`：该实例必须在其上运行的主机名；
*`mode`：无，守护程序，订阅，计划，一次；

可以在[这里](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/objectsschema.md)中找到说明。

`Native`设置包含此适配器的特定配置，例如例如：设备的IP地址，设备设置等。

？>注意：实例可以在不同的主机（多主机）上运行，此外，不同主机上的适配器可以具有不同的版本。

适配器实例的所有对象ID均以adapterName.X开头，其中X是适配器实例的编号。

出于不同目的，对象具有不同的类型。

对于每个适配器（不是实例），将自动创建以下对象：

*`system.adapter.adapterName`：适配器的描述（例如名称，版本号等）
*`adapterName`：由适配器的“ www”目录中的HTML / JS / CSS文件组成的对象。仅当在适配器包中找到www目录时，才创建此对象。
*`adapterName.admin`：由适配器包的“ admin”目录中的HTML / JS / CSS文件组成的对象。

将为每个适配器实例“ X”自动创建以下对象：

*`system.adapter.adapterName.X`：适配器实例的配置
*`system.adapter.adapterName.X.alive`：指示实例是否处于活动状态（每30秒发送一次消息）
*`system.adapter.adapterName.X.connected`：指定实例是否连接到数据存储。它可以连接，但是由于死锁而无法发送活动消息。
*`system.adapter.adapterName.X.memHeapTotal`：总内存使用量
*`system.adapter.adapterName.X.memHeapUsed`：内存使用情况
*`system.adapter.adapterName.X.memRss`：内存使用情况
*`system.adapter.adapterName.X.uptime`：适配器运行的秒数。

内存状态的说明可以在[这里](http://stackoverflow.com/questions/12023359/what-do-the-return-values-of-node-js-process-memoryusage-stand-for)中找到。

如果适配器处于“无”或“一次”模式，则不会创建任何活动对象，正常运行时间等对象。

**适配器的目录结构**

适配器软件包必须包含一些必需的目录和文件：

*`admin`（必需目录）
*`index.html`
*`xxx.png`-可选；更好：“ adapterName.png”（支持所有图像格式：jpeg，jpg，svg，bmp等）
*`www`-（必需目录）
*`lib`-（由于utils.js`而为必需目录）
*`utils.js`
*`package.json`-必填
*`io-package.json`-必填
*`main.js`-必需（也可以是`AdapterName.js`）

？>注意：lib / utils.js是所有适配器的通用文件，通过它可以确定js-controller的位置以及iobroker.js-controller / lib / adapter.js的对应路径。当前大多数utils.js均可在此处下载。不要更改此文件！

##个文件名
为了被ioBroker控制器接受并启动，适配器必须符合命名约定。

*在github（或其他地方）上，它必须命名为`io **B** roker.adapterName`（大写字母B）。
*如果适配器要在npm上可用，则其名称必须为iobroker.adapterName，因为npm不允许软件包名称中使用大写字母。可以在package.json中定义
*用于配置适配器的GUI HTML文件必须命名为admin / index.html。 admin目录中可以有更多文件，但是index.html必须存在。
*适配器启动文件必须命名为main.js或adapterName.js。
*适配器的名称必须是唯一的，用小写字母，没有特殊字符和空格。适配器名称中允许使用“-”，“ _”。

## Io-package.json的结构
js-controller使用io-package.json来显示有关适配器的信息并知道如何处理它。可以在[here]（）中找到公共部分中所有字段的完整描述。

io-package.json由“ admin”读取，以查找适配器的联机版本。

###公用字段
最重要的共同领域是：

*`name`：必填。不带“ ioBroker。”的适配器的名称，即“ adapterName”而不是“ ioBroker.adapterName”
*`version`：必填。必须与package.json相同。
*`title`：必填。适配器的简称，例如“适配器名称”
*`desc`：必要。适配器的说明。它可以是一个字符串，例如“此适配器执行此操作”或诸如以下的对象：

```
{
   "en": "This adapter does this and that",
   "de": "Dieser Aadpter macht dies und jenes",
   "ru": "Этот драйвер делает то и это"
}
```

如果没有当前语言的条目，则说明以英语显示。

*`Platform`：必要。目前仅支持Javascript /Node.js。
*`mode`：必要。适配器启动的模式。
*`enabled`：可选。如果为true，则在添加实例后将其激活。
*`License`：许可适配器使用的许可名称；
*`loglevel`：创建实例后设置的初始日志级别。可以是Debug，Info，Warning或Error
*`readme`：链接到Internet上的自述文件页面。管理适配器用于在显示“？”时显示链接。按钮被点击。
*`icon`：适配器图标的图标名称（而不是路径）。此图标必须在适配器的管理员目录中。
*`extIcon`：Internet上的图标路径，用于显示适配器的图标（如果尚未安装适配器的话）。
*`keywords`：关键字作为数组，以启用在管理适配器中的搜索。
*`localLink`：链接到适配器“ www”文件（或适配器服务器）。 “ http://192.168.0.100”
*`type`：以下类型是可能的：`硬件，社交，存储，视觉，api，脚本，天气，其他，连接`。
*`messagebox`：可选。如果适配器要接收系统消息，则必须将其设置为true。

？>注意：localLink可以具有用实值替换的特殊键。

*`％ip％`：将被第一个“ web”实例中定义的IP地址替换。
*`％field％`，其中field是适配器实例的“ native”部分的属性。

例如，`http://%ip%:%port%`显示为“ http://192.168.0.1:8080”，其中“ 192.168.0.1”是“ Web”适配器的IP地址，而8080是`system.adapter.adapterName.X => native.port`的值。

###对象字段
对象-适配器的所有实例的静态对象（xxx.object）。通过安装适配器（而不是实例创建），可以自动创建一些预定义的对象（通常描述某些内容）。这些对象不得依赖于特定实例，而应应用于此适配器的所有实例。例如，hm-rpc适配器具有所有HomeMatic设备的结构描述。

此外，可以定义新视图。在SQL中，它们在“ couchDB”视图中称为“存储过程”。

？>注意：请勿将视图与`vis`混合使用。

Java语言用于视图定义。例子：

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

hm-rpc适配器的两个视图在此处定义：`listDevices`和`paramsetDescription`。
它们从数据存储返回按视图条件筛选的对象集。它可以有效地（当使用CouchDB时）请求指定的对象列表。

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

`startkey`和`endkey`的使用也可以在同一页面上找到。

注意：视图的使用是可选的，并且要求开发人员对CouchDB有基本的了解。

###实例对象字段
某些特定的对象或具有类型状态的对象可以在`io-package.json`的`instanceObjects`中定义。

对于创建的每个实例，都会创建`instanceObjects`字段中的所有条目。

例如，适配器`hm-rpc`为每个实例创建状态`updated`，以便向另一个适配器发出信号，表明某些新设备出现在数据存储中，并且它们需要由§§SSSSS_2处理§§。

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

不必提供对象的完整路径，也不能提供对象的完整路径，因为适配器实例未知。
`common.name`中的特殊词`%INSTANCE%`可用于在对象名称中表示它。例如：

```
"name": "Some new devices added in hm-rpc.%INSTANCE%",
```

将扩展到

```
"name": "Some new devices added in hm-rpc.0,
```

通过创建第一个实例。

### Package.json
package.json是npm软件包的标准描述文件。完整的描述可以在https://docs.npmjs.com/files/package.json中找到。

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

！>所有字段均为必填项。 `devDependencies`也应位于内部，以启用密集任务。

＃＃＃ 提供
建议在Github上使用代码。在代码稳定并且可以安装适配器之后，可以通过要求用户如下安装适配器来与其他用户共享该适配器：

```
npm install https://github.com/yourName/iobroker.adapterName/tarball/master/
```

如果一切正常，并且得到用户的积极反馈，则可以在npm上发布适配器。
如果事先在github上有出版物，那将是很好的。

使用以下命令完成发布：

```
npm publish
```

可以在适配器目录中调用它。确保已删除除必要文件以外的所有其他文件（例如`.idea`），或将`.gitignore`添加到文件中。

当然，必须先在npm上创建一个帐户。

？>注意：相同版本的代码不能发布两次因此，在发布之前，请增加`package.json`和`io-package.json`中的版本。

在测试了适配器并且其他用户发现它有用之后，可以将其转移到共享存储库中，以便可以使用`admin`适配器进行安装。

##这是您创建自己的适配器的方式
在https://github.com/ioBroker/ioBroker.template中，您可以找到一些用于您自己的适配器的模板。

如果要创建窗口小部件或带有窗口小部件的适配器，可以在https://github.com/ioBroker/ioBroker.example/tree/master/VIS中找到它们。

### Main.js的结构
```
var utils = require(__dirname + '/lib/utils'); // Get common adapter utils - mandatory
```

此行加载模块`lib/utils.js`。所有适配器功能的共同点是找到`iobroker.js-controller`的根。
因为可以在三个不同的路径中安装适配器：

*`... / iobroker / node_modules / iobroker.adapterName`-这是默认路径，建议使用
*`... / iobroker.js-controller / node_modules / iobroker.adapterName`-调试时使用
*`... / iobroker.js-controller / adapter / adapterName`-旧样式（已弃用）

utils.js除了搜索文件`iobroker.js-controller/lib/adapter.js`并进行加载外什么也不做。

```
var adapter = utils.adapter('adapterName'); // - mandatory
```

该行创建名称为`adapterName`的对象`adapter`。它为实例`adapterName.X`加载整个配置，其中X是适配器的实例号。

`js-controller`通过两个参数将适配器作为其自身进程的分支来启动：实例和协议级别；喜欢：

```
child_process.fork('pathToAdapter/main.js', '0 info');
```

一切都在`adapter.js`中自动处理，并且适配器的开发人员不必担心。

适配器支持3个其他启动标志：

*`--install`-即使没有可用的配置也启动适配器。适配器用于通过安装适配器执行安装过程。
*`--force`-启动适配器，即使已在配置中将其禁用
*`--logs`-如果仅在日志表中显示日志，则在控制台中显示日志。

```
var myPacket1= require('myPacket1'); // add own module
```

然后是适配器中所需的所有其他模块，例如B.`fs`，`require`等已加载。
不要忘记在`package.json`中声明它们。

###适配器的选项
只能使用诸如`utils.adapter('adapterName')`之类的名称或以下附加参数来创建适配器对象：

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

可以通过事件（请参见下文）模拟所有处理程序，例如

```
adapter.on('ready', function () {
    main();
});
```

###适配器对象的属性
如何创建`adapter`对象

```
var adapter = utils.adapter('adapterName');
```

在此对象实例中创建以下属性：

*`name`-适配器的名称，例如B.`adapterName`
*`host`-运行适配器实例的主机名
*`instance`-该适配器实例的实例号
*`Namespace`-适配器对象的名称空间，例如B.`adapterName.0`
*`config`-适配器设置的本机部分
*`common`-适配器设置的通用部分
*`systemConfig`-iobroker-data / iobroker.json`的内容（仅当`options.systemConfig = true`时）
*`adapterDir`-适配器文件夹的路径
*`ioPack`-io-package.json`的内容
*`pack`-package.json`的内容
*`log`-记录器对象
*`version`-适配器版本
*`状态`-（仅限专家）
*`对象`-（仅适用于专家）
*`connected`-如果适配器连接到主机

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

！> *入口点*所有初始化均应主要进行，因为在“就绪”之前未进行任何配置。

```
adapter.on('ready', function () {
* main();
});
```

####记录
能够记录事件以进行调试和控制非常重要。以下功能可用于记录事件：

```
adapter.log.debug("debug message"); // log message with debug level
adapter.log.info("info message");   // log message with info level (enabled by default for all adapters)
adapter.log.warn("warning");        // log message with info warn
adapter.log.error("error");         // log message with info error
```

无需指定消息的来源或时间。这些属性是自动添加的，例如

```
admin-0 2015-07-10 17:35:52 info successful connection to socket.io from xx.yy.17.17
```

当然，也可以使用`console.log`，`console.debug`或`console.error`§，但是这些消息仅在适配器是在控制台或编程IDE中手动启动时才可见。

####实例配置
适配器对象的属性用于读取实例的配置：`adapter.config`。
该对象由`system.adapter.adapterName.X`对象的`native`组成。例如`io-package.json`看起来像这样：

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

因此，`adapter.config`是相同的：

```
{
   "location": "Stuttgart",
   "language": ""
}
```

并已在配置对话框中从用户输入数据。可以使用“适配器”对象的“公共”属性来访问实例配置的“公共”部分。例如，对于所示的io-package.json为“ adapter.common”：

```
{
   "name": "adapterName"
}
```

要访问ioBroker配置（保存在文件`iobroker-data/iobroker.json`中），请将适配器选项`systemConfig`设置为true。

```
var adapter = utils.adapter({
    name: 'adapterName',  // adapter name
    systemConfig:  true // load ioBroker configuration into systemConfig
});
```

要获取全局日期格式，必须将选项`useFormatDate`设置为true：

```
var adapter = utils.adapter({
    name: 'adapterName',  // adapter name
    useFormatDate:  true  // load from system.config the global date format
});
```

日期格式在adapter.dateFormat下可用。

可以使用功能`getForeignObject`手动读取所有其他配置。

**如何读取状态**

ioBroker适配器中有两种读取状态的模式：

*活动订阅（推荐）
*轮询

要订阅您自己的事件，必须调用以下命令：

`adapter.subscribeStates('*');`//用模式`adapterName.X.*`订阅此适配器实例的所有变量

`adapter.subscribeStates('memory*');`//用模式`adapterName.X.memory*`订阅此适配器实例的所有变量

如何订阅其他活动：

`adapter.subscribeForeignStates('yr.*.forecast.html');`//变量`forecast.html`订阅所有适配器实例`yr`。

占位符“ *”可以在两个函数中使用。

然后，您将收到事件`stateChange`，并可以使用此值进行操作。
订阅后，您将不会收到当前状态，因为事件仅在发生更改时发生。
为了获得初始状态，您应该在开始时执行一次“查询”（通常在“就绪”事件中）。

轮询为了从头开始读取自己的状态或以一定间隔读取值，请使用`adapter.getState`函数，如下所示：

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

要读取其他适配器的状态，应使用功能`adapter.getForeignState`。不支持通配符。

####命令和状态
在谈论状态时，应在命令和状态之间进行区分。 “命令”的ack标志为false，由用户（通过vis，Javascript适配器，admin）发送，以控制设备或特定适配器。通常，适配器（例如Homematic）被订阅以进行其自身的所有更改，并且如果某些状态更改为ack = false，则它们将尝试执行此命令（例如，点亮）。

“状态”将标志`ack`标记为true，并指示它来自设备或服务。
例如，如果天气适配器收到了新的天气预报，它将与`ack=true`一起发布，或者如果Homematic温度计测量了新的温度，那么它还将与`ack=true`一起发布。
即使用户实际打开了灯，新状态也会用`ack=true`发布。

`Ack=false`通常在设备响应后被执行覆盖。

例如，如果用户按下`vis`中的键并发送了`hm-rpc.0.kitchen.light=ON`命令。
Socket-io适配器将带有`kitchen.light = {val: 1, ack: false}`的新状态发送到实例`hm-rpc.0`。

Homematic适配器已订阅`hm-rpc.0`的所有状态，并且当使用`ack=false`接收到新状态时，它将新值发送到物理交换机。

物理交换机执行命令并将新的自身状态发送到`hm-rpc`适配器。
适配器`hm-rpc.0`发布状态`hm-rpc.0.kitchen.light={val: 1, ack: true}`的新状态（带有时间戳）。

hm-rpc适配器不执行此更改，因为ack为true。这是来自物理设备的确认。

####状态如何写？
状态可以写为命令或状态。为此，必须使用`adapter.setState`和`adapter.setForeignState`：

`adapter.setForeignState('otherAdapter.X.someState', 1);`//控制其他适配器（不必控制您自己的状态，我们可以直接执行此操作）

`adapter.setState('myState', 1, true);`// //显示您自己国家的新状态

`adapter.setState('myState', {val: 1, ack: true});`//如上

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

####状态结构
State是具有以下属性的Javascript对象：

*`val`：状态值（期望值或实际值）
*`ack`：方向标志。对于期望值，为false；对于实际值，为true。默认值：false（命令）
*`ts`：时间戳，表示从1970年1月1日午夜到指定日期的毫秒数。 Javascript对象Date的getTime（）方法的结果。默认值：当前时间。
*`lc`：最后一次更改的时间戳。与ts的格式相同，但值的时间戳会更改。该值可以更新，但该值可以保持不变。在这种情况下，lc不会更改。
*`from`：定义值的适配器实例的名称，例如“ system.adapter.web.0”（使用vis）
*`expire` ：（可选）可以设置以秒为单位的到期时间限制。在此时间之后，变量将设置为“零”。例如，通过适配器实例的“活动”状态。如果适配器实例在30秒内未触发“活动”状态，则将其标记为“关闭”。要设置到期状态，请使用以下代码setState（'Variable'，{val：true，expire：30}）
*`q` ：（可选）质量。看到这里的描述

**适配器的操作模式**

适配器可以在不同的模式下运行。可以使用common.mode属性定义适配器的模式。

*`none`-此适配器将无法启动。
*`daemon`-始终运行的进程（在进程终止时重新启动）
*`subscribe`-在状态system.adapter ... alive变为true时启动。当.alive更改为false时退出，并在进程退出时将.alive设置为false（在进程退出时不重新启动）
*`Schedule`-根据在system.adapter ... common.schedule中找到的时间表启动。
*`once`-每次更改system.adapter ..对象时，都会启动此适配器。完成后将不会重新启动。

通常，适配器应使用模式守护程序。

如果适配器仅每X分钟检查一次，则应使用`schedule`模式并一起定义cron计划（例如，每小时`1 * * * *`）。

####如何读取对象？
可以使用getObject或getForeignObject命令读取对象：

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

适配器的对象必须按设备，通道和状态进行组织。

请参阅：getForeignObjects，findForeignObject，getForeignObject，getDevices，getChannels，getStatesOf

####如何编写对象？
通常可以使用两个函数来编写对象：`setObject, setForeignObject`。但是，有许多用于更改对象的帮助功能：

*`extendObject，extendForeignObject`
*`delObject，delForeignObject`
*`setObjectNotExists，setForeignObjectNotExists`
*`createDevice，deleteDevice`
*`createChannel，deleteChannel`
*`createState，deleteState`
*`addStateToEnum，deleteStateFromEnum`

extensObject仅读取对象，与特定对象合并，然后写回对象。

`xxxObject`和`xxxForeignObject`之间的区别在于，`xxxObject`自动将`adapter.instance.`文本添加到对象ID。

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

####信息连接
当适配器建立连接并进行监视（例如连接到受控设备）时，它应创建一个变量`info.connection`并等待。

在这种情况下，连接状态将显示在`admin`中的实例列表中。如果需要，状态的质量取决于连接状态。

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

##活动
```
* ready
* objectChange(id, obj) (Warning obj can be null if deleted)
* message(obj)
* stateChange(id, state) (Warning state can be null if deleted)
* unload
```

###这是创建实例的方式
在npm中发布之前：复制到ioBroker / node_modules，转到`admin`并添加一个实例。在npm中发布后：转到`ioBroker/`并编写`npm install iobroker.xxx --production --no-optional --logevel=error`，然后转到`admin`并添加。

##这是调试的方式
*启动ioBroker
*添加适配器的实例
*停用适配器实例
*启动WebStorm
*使用node.js创建调试配置。
*应用程序的标志：“-force，instance，log level”（您可以将适配器启动为“ node xxx.js 1 Debug --force”，1是实例索引（默认为0，debug是log level和` - -force`意味着设置“启用：假”被忽略）。

## Admin.html
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