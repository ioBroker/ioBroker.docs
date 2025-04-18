---
title: 术语解释
lastChanged: 28.10.2022
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/basics/glossary.md
hash: JnivtZyRdEJ0E0HkDbRXmChDkytvfguiAW5fiVp6ki0=
---
为了让您更容易上手并让进一步的帮助更容易理解，这里解释了 ioBroker 中及其周围出现的最重要的术语。

* **适配器**

用于设备、服务或提供数据的模块或驱动程序。
由于 ioBroker 的模块化结构，一切都是适配器：管理界面、可视化、脚本编写……

* **行政**

管理适配器提供用于配置 ioBroker 的 Web 界面。这包括安装适配器、创建实例、创建和检查对象、状态、编辑脚本等等。

* **类别**

    英文术语：enum(eration)

枚举/类别是分组在一起的特定对象的列表。

* **块状**

Blockly 允许您使用可链接的功能块以图形方式组装简单的控件和脚本。不需要任何编程知识。

保存 Blockly 脚本时，会生成 JavaScript 代码，然后执行该代码。

* **CCU**

是来自制造商eQ-3的Homematic智能家居中心。有 2 个版本，较旧的 CCU1 和较新型号的 CCU2，以及全新的 CCU3。

    CCU 代表中央控制单元

所有 Homematic 和 HomematicIP 设备均可使用 CCU2 和 CCU3 进行控制。 CCU1 只能处理 Homematic 设备。
家庭自动化设备有无线电和有线版本（有线总线）。

* **CSS**

层叠样式表。使用CSS，无论内容如何，都可以描述网站的显示。作为 HTML 中定义的页面结构的补充，CSS 定义了页面的显示方式。

* **Cubietruck/Cubieboard 3**

类似于 Raspberry PI/Odroid 的单板计算机，但具有 SATA 接口和 2GB RAM

* **设备**

    英文术语：Device

在 ioBroker 中，设备通常是适配器下面的下一个级别，并对设备的所有通道和状态进行分组。

* **家庭用品**

Homematic是一款由eQ-3制造、elv分销的智能家居系统。另请参见 CCU。

* **主持人**

    主机是运行 ioBroker 的计算机/服务器。

多主机模式下有多台主机，其中一台为主，其余为从

* **HTML**

超文本标记语言。一种页面描述语言（WWW 的基础），用于在 Web 浏览器中显示内容（文本、链接、图形、视频等）。

* **实例**

每个适配器至少有一个实例（但可以有多个）。
使用多个实例的原因有多种。
例如，您可以使用 JavaScript 适配器的第二个实例进行测试，而不会出现重要脚本失败的风险，因为发生错误时只有测试实例受到影响。

大多数适配器可以使用多个实例启动，以便能够寻址相同类型或具有相同协议的多个设备。一个实例对应于主机上正在运行的一个进程。
示例：2 个 Hue 桥应集成到 ioBroker 中。由于每个适配器只能配置一个桥，因此只需创建 Hue 适配器的第一个和第二个实例，并在相应的适配器实例中配置每个桥。实例化还可以轻松区分数据点，因为对象结构前面有实例名称（例如hue.0和hue.1）。

* **Javascript**

ioBroker 的所有内容均使用该编程语言进行编程，您自己的脚本也可使用该编程语言进行编程。

* **js控制器**

js控制器是ioBroker的主要进程，为所有其他模块提供必要的核心基本功能。
它还建立对中央对象和状态数据库的访问，协调和监视所有正在运行的适配器实例和进程。如有必要，适配器将由 js 控制器重新启动。

* **渠道**

频道对主题相关的状态进行分组，通常位于一台设备下。每个设备可以有多个通道。

* **掌握**

master就是主机，它集中负责所有实例（包括从实例！）的管理。当主实例终止时，从实例也会终止。主站提供所有从站连接的中央对象和状态数据库。

* **多主机模式**

如果需要特殊接口（例如读取地下室的电表），ioBroker 的多主机模式可用于在多台计算机之间分配控制任务。此外，可以使用多个主机来均匀分配负载或内存消耗。多主机模式下，一台主机被定义为master；其他人都是奴隶。主站控制所有从站以及实例在从站之间的分配。

* **节点红色**

图形编程界面，其中完成的模块（节点）可以通过简单的链接（流）链接到复杂的程序。

* **对象和状态**

    基本定义可以在[此处]找到。

* **对象**

对象更详细地描述状态并提供有关它的元信息、配置和描述。对象具有类型，例如主机、适配器、实例、枚举、设备、通道或数据点……

元数据还定义状态的数据类型，例如数字、布尔值、字符串以及状态应如何在可视化界面中显示。

* **奥德罗伊德**

类似于 Raspberry PI 的单板计算机。有多个版本，具有不同的硬件功能。

* **解析器适配器**

通过指定所谓的适配器，可以从任何来源的文本中使用适配器
正则表达式，剪切出可以写入状态的部分。这些值可以在脚本等中使用。进行进一步处理。

* **树莓派**

信用卡大小的单板计算机（由 Raspberry PI 基金会开发）。电路板包含运行计算机所需的所有组件（CPU、GPU、RAM 等）。与传统计算机相比，其优点是功耗最小且尺寸较小。缺点：CPU、RAM等无法更换或升级。

* **Redis**

一个 no-SQL 数据库，将数据保存在内存中，并可在 ioBroker 中用于存储状态数据。可选择用于提高性能，因为写入和读取操作不需要访问硬盘驱动器、SSD 或 SD 卡。要将 Redis DB 与 ioBroker 一起使用，必须在 js-controller 基本配置中指定。

* **状态**

    查看条件或对象

* **可见**

VIS适配器允许您为ioBroker创建自己的操作和可视化界面，并将其显示在各种设备上。界面由可定制的小部件和您自己的 HTML 代码组成，可以使用 CSS 更改外观。

* **小工具**

Vis 中的控件。 Widget 用于显示或控制状态；例如，使用按钮打开和关闭灯，该按钮根据开关状态改变其外观。

* **状态或状态**

状态包含 ioBroker 中数据点的当前值。
它还描述了时间戳、最后更改的时间以及发送者或接收者的确认。

    状态可以保存在 JSON 文件或 Redis DB 中。

[hier]: https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/objectsschema.md