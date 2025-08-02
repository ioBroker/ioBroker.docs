---
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.admin/tab-users.md
title: 用户选项卡
hash: HKsMwIvpGIO+9hqNOzBFUsRM8OOTNgILqQ6z75xDXDY=
---
# 用户选项卡
可以在此处创建用户。为此，请单击左下角的 (+)。默认情况下，管理员已创建。

![iobroker_adapter_admin_user_01](../../../de/adapterref/iobroker.admin/img/tab-user_01-1.jpg)

## 页面内容
该页面以表格形式显示现有用户。列标题中的字段用于根据您自己的条件过滤表。

该表由以下列组成：

### **1.) ID**
根据由 system.user.Username 组成的结构，这是各个用户的唯一名称。

### **2.) 姓名**
用户名。该名称可以自由选择。该名称必须是唯一的。

### **3.) 已启用**
此复选框可用于激活或停用用户的可用性。

### **4.) 群组**
此处显示在 **_Groups_** 选项卡中创建的组。在这里可以使用复选框将用户分配到相应的组。

![iobroker_adapter_admin_user_groups](../../../de/adapterref/iobroker.admin/img/tab-user_Groups.jpg)

### **5.) 创建新用户**
该图标可用于创建新用户，然后必须将其分配给现有组。

### **6.) 编辑现有用户**
在列表中选择现有用户后，可以使用该图标编辑该用户的数据。

### **7.) 删除现有用户**
可以使用垃圾桶图标删除现有用户，但现有组保持不变。