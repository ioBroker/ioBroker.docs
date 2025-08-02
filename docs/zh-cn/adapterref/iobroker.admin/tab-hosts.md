---
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.admin/tab-hosts.md
title: “主机”选项卡
hash: A0PX3gNVnrOQijF2MxOe4AXudr5VPDE9MVykcpPXSng=
---
# 主机选项卡
此处显示可用的主机。

在标准系统中只有一台主机。对于 [多主机系统](http://www.iobroker.net/?page_id=3068&lang=de)，相应地有几个。

## 标题行
标题栏包含最重要进程的图标。每个图标都有上下文帮助。为此，只需将鼠标放在图标上一段时间即可。

![](../../../de/adapterref/iobroker.admin/img/tab-hosts_Hosts_icons.jpg)

### **图标详细说明：**
### **1.) 获取更新**
要检查 js 控制器是否有更新，您可以单击此按钮。如果有更新，选项卡的标签会显示为绿色，并且新版本会显示在_**可用**_列中。

### **2.) 过滤器**
使用此文件，您可以根据自己的意愿过滤主机列表

## 页面内容
该页面以表格形式显示现有主机。

![](../../../de/adapterref/iobroker.admin/img/tab-hosts_Hosts_01.jpg)

该表由以下列组成：

### **3.) 姓名**
这是主机操作系统中设置的唯一主机名。该名称必须是唯一的。

### **4.) 重新启动主机**
通过此按钮可以重新启动相应的主机。点击它对应的是**_reboot_**命令。

### **5.) 输入**
有关主机正在运行哪个引擎的信息。

### **6.) 标题**
引擎的全名，通常为 ioBroker.js-controller

### **7.) 平台**
引擎所基于的软件基础的规范。

### **8.) 操作系统**
主机上运行的操作系统的规范。

### **9.) 可用**
指示引擎的最新可用版本

如果有更新版本的引擎可用，可以通过控制台进行更新。
如果可用，应始终在更新适配器之前先完成此操作。

### **9.) 已安装**
指示已安装的引擎版本