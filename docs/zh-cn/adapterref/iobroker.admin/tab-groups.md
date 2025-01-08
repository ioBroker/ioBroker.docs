---
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.admin/tab-groups.md
title: 组选项卡
hash: w81xH774XQVxqMAhQ70BdlBiKKarcO5bWiTNR7Zbfvc=
---
# 组选项卡
在这里，可以通过单击屏幕左下角的（+）来创建具有不同权限的用户组。

![iobroker_adapter_admin_user_02](../../../de/adapterref/iobroker.admin/img/tab-groups_admin_User_02.jpg)

## 页面内容
现有组显示在页面上的表格中。列标题中的字段用于根据您自己的条件过滤表。

该表由以下列组成：

### **1.) ID**
根据由 system.group.groupname 组成的结构，这是各个组的唯一名称。

### **2.) 姓名**
群组的名称。该名称可以自由选择。该名称必须是唯一的。

### **3.) 描述**
此处可以添加描述，例如引用该组中的权限。

### **4.) 用户**
在 **_Users_** 选项卡中创建的用户显示在此处，并且可以通过复选框分配到所选组。

### **5.) 自定义权限**
单击铅笔符号时，会打开另一个窗口，可以在其中调整该组的权限。

![iobroker_adapter_admin_user_rechte_01](../../../de/adapterref/iobroker.admin/img/tab-groups_User_Rechte_01.jpg)

### **6.) 创建新组**
该图标可用于创建使用前面的点配置的新组。