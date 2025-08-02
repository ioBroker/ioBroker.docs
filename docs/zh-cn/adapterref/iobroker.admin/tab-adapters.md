---
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.admin/tab-adapters.md
title: 标签适配器
hash: QL+KH1rDLyLUu//lZEw1peBxkvCTrTkqq2Z4ohf+BKg=
---
# 选项卡适配器
此处显示和管理可用和已安装的适配器。

![iobroker_image_bpi_20160910](../../../de/adapterref/iobroker.admin/img/ioBroker_Image_BPi_20160910.jpg)

## 标题行
标题栏中有最重要进程的图标。
每个图标都有上下文帮助。为此，只需将鼠标放在图标上一段时间即可。

![iobroker_adapter_admin_002aa](../../../de/adapterref/iobroker.admin/img/tab-adapters_002aa.jpg)

### **图标详细说明：**
![](../../../de/adapterref/iobroker.admin/img/tab-adapters_icons01_20170108-e1483882554815.jpg)

### **1.) 仅显示已安装的适配器**
当您选择此图标时，仅显示已安装的适配器（切换功能）

### **2.) 显示带有更新的适配器**
当您选择此图标时，仅显示有可用更新的适配器（切换功能）

**_已安装_** 列中可更新适配器后面有一个更新图标。
单击此按钮，相应的适配器将更新到最新版本。

标题栏中还出现另一个图标：

![iobroker_adapter_admin_002b](../../../de/adapterref/iobroker.admin/img/tab-adapters_002b.jpg)

单击此图标将更新所有可用的适配器。

### **3.) 从自己的 URL 安装适配器**
使用 Octocat 图标，可以从您自己的路径（URL 或文件路径）或 GitHub 的预发布版本安装适配器。

单击该图标后，将打开相应的选择窗口：

![iobroker_adapter_admin_002c_github](../../../de/adapterref/iobroker.admin/img/tab-adapters_002c_GitHub.jpg)

在 **_From github_** 选项卡下，只需从下拉菜单中选择所需的适配器，即可安装最新的预发布版本。

如果选择“任何”选项卡，则可以在字段中输入永久文件路径或任何 URL（例如外部适配器开发人员的 URL），并可以安装相应的适配器。

![iobroker_adapter_admin_002c_ownfile](../../../de/adapterref/iobroker.admin/img/tab-adapters_002c_ownFile.jpg)

### **4.) 开启专家模式**
专家模式还可以安装旧版本的适配器。
如果选择此按钮，每个适配器的最右侧会出现一个下拉菜单 (4)，可用于安装早期版本。

![](../../../de/adapterref/iobroker.admin/img/tab-adapters_icons02_20170108.jpg)

### **5.) 检查更新**
每次重新启动时都会自动检查更新。但是，您可以使用此按钮手动启动搜索。

如果[系统设置](#Systemeinstellungen)下的存储库集中有可用更新，则 **_Adapter_** 选项卡的字体显示为绿色。

### **5.) 更改排序**
此按钮更改此页面上适配器的排序。

当该按钮处于活动状态时，所有适配器均按字母顺序排序，首先显示已安装适配器的块，然后显示尚未安装适配器的块。这两个块中的每一个都按字母顺序排序。

如果此按钮未激活，适配器将按主题排序。

然后接下来的两个图标也将可见。

### **6.) 折叠所有主题区域**
### **7.) 扩展所有主题领域**
右侧还有两个按钮

![iobroker_adapter_admin_003a](../../../de/adapterref/iobroker.admin/img/tab-adapters_003a.jpg)

### **8.) 编辑选项卡**
使用此按钮，您可以隐藏不必要的选项卡并显示那些不可见的选项卡。

### **<a id="Systemeinstellungen"></a> 9.) 系统设置**
ioBroker的基本参数在这里设置。

## 页面内容
![iobroker_admin_adapter_content01](../../../de/adapterref/iobroker.admin/img/tab-adapters_Inhalt01.jpg) 适配器显示在页面上的表格中。该表由以下列组成：

### **1.) 姓名**
此列中列出了具有关联图标的适配器的名称。
如果使用标题栏中的图标 (5) 选择分组适配器，组名称也会出现在此处。

### **2.) 描述**
以下是适配器工作原理的简要说明

### **3.) 关键字**
以下是一些与适配器相关的搜索词。

### **4.) 版本**
此处显示可用版本。为了概览，适配器的开发状态以颜色突出显示。 （红色 = 计划中；黄色 = beta；橙色 = alpha；绿色 = 最终）。

### **5.) 已安装**
此列提供有关此适配器安装状态的各种信息。
一方面，已安装适配器的版本号在那里。如果以粗体打印，则表示有可用更新。后面的方括号中是该适配器安装的实例数量、其中有多少实例已激活以及它们的状态是什么。所以[2/1]意味着这个适配器有两个实例，其中一个被激活并且运行没有问题（后者可以通过第二个数字的绿色来识别）。如果此适配器适配器有更新，则右侧有一个更新图标。单击此图标将启动更新过程。

### **6.) 平台**
这指定了该适配器基于哪个软件平台。通常这是nodejs下的javascript。

### **7.) 许可证**
这是适配器可用的许可证。许可条件通常可以在自述文件中找到。如果许可证要求最终用户接受，则在创建实例时将显示相应的包含许可证条件的窗口。

### **8.) 安装**
此栏中有各种用于安装和帮助的按钮。

![](../../../de/adapterref/iobroker.admin/img/tab-adapters_icons02_20170108.jpg)

1. (+) 这将添加适配器的实例。这仍然需要在实例选项卡中配置和激活。对于大多数适配器，可以安装任意数量的实例，例如用于处理不同的硬件。如果不可能，将打开一个窗口并显示相应的错误消息。
2. (?) 如果此按钮处于活动状态，它将链接到适配器的帮助页面。它通常位于 GitHub 上，适配器也在那里维护。
3.（垃圾桶）此按钮将删除适配器和所有已安装的实例
4. （下拉菜单）可以使用此菜单安装相应适配器的早期版本。该下拉菜单仅在专家模式下可见。