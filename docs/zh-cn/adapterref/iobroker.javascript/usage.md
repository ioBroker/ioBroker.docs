---
chapters: {"pages":{"de/adapterref/iobroker.javascript/README.md":{"title":{"de":"ioBroker.javascript"},"content":"de/adapterref/iobroker.javascript/README.md"},"de/adapterref/iobroker.javascript/blockly.md":{"title":{"de":"Inhalt"},"content":"de/adapterref/iobroker.javascript/blockly.md"},"de/adapterref/iobroker.javascript/usage.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.javascript/usage.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.javascript/usage.md
title: 无题
hash: 50NeRF4Q6HGVB3B6z2x5zKqS1dGtU8RUoqkxE2+y80M=
---
**注意：目前英文版包含更多信息，我们建议阅读它**

javascript适配器用于方便地创建、编辑和管理脚本。

＃＃ 配置
[这里有更多关于它的信息](https://github.com/ioBroker/ioBroker/wiki/ioBroker-Adapter-javascript#konfiguration)

![Javascript 适配器设置菜单](../../../de/adapterref/iobroker.javascript/img/javascript_Einstellungen-Javascript.png) 实际配置包括输入要加载的附加 npm 模块（以逗号分隔），以及用于各种计算的地理坐标。例如，要获取坐标，您可以放大_谷歌地图_并单击所需的位置。然后显示坐标。保存后，必须使用红色播放按钮激活适配器。

* * *

＃＃ 服务
安装过程中，_Admin_ 界面中会显示另一个选项卡_Scripts_。这里通过单击工具栏中的（+）（红色圆圈）来创建一个新文件夹。  使用其左侧的“空白表”图标创建一个新脚本。将打开一个窗口，询问文件夹结构中的名称和位置。
![JavaScript 适配器](../../../de/adapterref/iobroker.javascript/img/javascript_Javascript-Adapter.png)

### 文件夹和文件列表
可以根据需要创建文件夹结构。存储位置对脚本的功能没有影响。除了树形结构外，还有列表视图。搜索字段可以更轻松地查找脚本。为了运行脚本，必须通过单击左侧文件夹结构中的红色_Play_按钮来激活它。要停止，请按绿色_暂停_按钮。为每个脚本创建一个新对象。它的脚本名称中添加了 `_enabled`，并且位于 `javascript.Instanz.ScriptEnabled` 文件夹中。该对象用 (`true/false`) 指示脚本是否正在运行。还可以设置状态来打开/关闭脚本。保存在 _global_ 文件夹中的脚本是全局脚本。这些在每个其他脚本之前在内部复制，即预先处理。这意味着全局函数可以应用于多个脚本。全局脚本中的变量可以在其他脚本中使用。但要小心：每个脚本都有自己的变量空间。不能在全局脚本中使用变量在脚本之间交换值。对象（状态）必须用于此目的。

＃＃＃编辑
创建后，_Javascript_ 编辑器将在右侧打开。一些示例脚本可以在[这里](http://www.iobroker.net/docu/?page_id=2786&lang=de)中找到。

＃＃＃＃ 姓
如果您之前指定了名称，该名称将显示在此处并且可以更改。

＃＃＃＃ 地点
所有创建的文件夹都显示在此下拉列表中。它们目前按创建时间顺序排序。

＃＃＃＃ 发动机类型
您可以在此处选择是否要使用 _javascript_ 或 _coffeescript_ 引擎。

＃＃＃＃ 日志
右下角是日志窗口，用于输出与所选脚本相关的所有日志。保存/重新启动脚本后将显示日志。

* * *

＃＃ 尖端
### 备份
为了能够在有疑问时恢复脚本，建议使用_复制和粘贴_进行备份。

### 测试实例
要测试新脚本，最好创建另一个 Javascript 实例并在此实例中启动脚本。
可以使用脚本名称后面的下拉菜单设置所需的实例。
如果脚本中存在严重错误，则仅此附加测试实例终止，而生产实例不会终止。

![选择 Javascript 适配器实例](../../../de/adapterref/iobroker.javascript/img/screen.jpg)