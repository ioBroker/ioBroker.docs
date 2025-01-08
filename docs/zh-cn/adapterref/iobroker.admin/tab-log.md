---
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.admin/tab-log.md
title: 选项卡“日志”
hash: kzof4XfyddkyR8KdFjUtTOUg5IE6jzeGfhiqozkyyE0=
---
# 选项卡“日志”
系统的消息在这里不断输出。
最新消息如上。

![](../../../de/adapterref/iobroker.admin/img/tab-log_01.jpg)

## 标题行
标题栏包含最重要进程的图标。
每个图标都有上下文帮助。为此，只需将鼠标放在图标上一段时间即可。

![](../../../de/adapterref/iobroker.admin/img/tab-log_icons.jpg)

### **图标详细说明：**
### **1.) 停止更新**
如果单击此按钮，列表的不断更新将停止。
现在显示的是未显示的新消息的数量，而不是暂停图标。

### **2.) 更新日志**
此按钮更新列表。

### **3.) 复制日志**
单击此图标后，列表将显示为文本。使用 CTRL-A 可选择整个文本，使用 CTRL-C 将其插入剪贴板以供进一步编辑。

### **4.) 删除列表**
单击此图标只会删除屏幕上的列表

### **5.) 删除日志**
单击此图标，主机上的整个日志将被永久删除。

### 下拉菜单
### **实例过滤器**
![](../../../de/adapterref/iobroker.admin/img/tab-log_instances.jpg)

该下拉菜单可用于根据日志记录实例过滤消息。
仅那些页面上有条目的实例才会显示在菜单中。

### **显示的日志级别**
![](../../../de/adapterref/iobroker.admin/img/tab-log_loglevel.jpg)

此菜单可用于设置应显示的消息的严重级别。
然而，这只是现有列表的过滤器。为了在实例的特定级别设置日志记录，必须在 _**Instances**_ 选项卡中进行设置。