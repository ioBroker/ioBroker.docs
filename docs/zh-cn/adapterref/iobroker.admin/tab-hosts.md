---
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.admin/tab-hosts.md
title: 主机选项卡
hash: Jnt6k6H3Zc3NxzBPrWKISqelf4FWzT2DqjFE1jk2OjQ=
---
# 主机选项卡
可用的主机在此处显示。

在标准系统中只有一个主机。有一个[多主机系统](http://www.iobroker.net/?page_id=3068&lang=de)，相应地有几个。

## 标题行
标题栏包含最重要进程的图标。每个图标都有上下文帮助。只需将鼠标放在图标上一会儿。

![](../../../de/adapterref/iobroker.admin/img/tab-hosts_Hosts_icons.jpg)

### **详细图标：**
### **1.) 获取更新**
要检查 js-controller 是否有更新，您可以单击此按钮。如果有更新，选项卡上的标签会显示为绿色，并且新版本会显示在 _**available**_ 列中。

### **2.) 过滤器**
使用此字段，您可以根据自己的需要过滤主机列表

##页面内容
现有主机在页面上以表格形式显示。

![](../../../de/adapterref/iobroker.admin/img/tab-hosts_Hosts_01.jpg)

该表由以下列组成：

### **3.) 姓名**
这是每个主机的唯一名称，在主机的操作系统中设置。此名称必须是唯一的。

### **4.) 重启主机**
对应的主机可以用这个按钮重启。单击它对应于 **_reboot_** 命令。

### **5.) 类型**
指定主机在哪个引擎上运行。

### **6.) 标题**
完整的引擎名称，通常是 ioBroker.js-controller

### **7.) 平台**
引擎所基于的软件基础的规范。

### **8.) 操作系统**
主机上运行的操作系统的规范。

### **9 可用**
指示发动机的最新可用版本

如果有更新版本的引擎可用，则可以通过控制台进行更新。
如果可用，应始终先完成此操作，然后再开始更新适配器。

### **9.) 已安装**
引擎安装版本规格