---
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.admin/tab-events.md
title: 事件选项卡
hash: Jd/OCziLpD5NEpRYCSU4SojMo2Q+BeRO1rICq8meWjM=
---
# 事件选项卡
所有数据点的当前状态都显示在此选项卡中。值也可以更改。

![iobroker_admin_states_columns](../../../de/adapterref/iobroker.admin/img/tab-events_States_columns.jpg)

##页面内容
现有对象以表格形式显示在页面上。通过单击列标题（切换功能），可以按字母顺序按升序或降序对列进行排序。下面的字段用于根据您自己的标准过滤数据点。

该表由以下列组成：

### **1.) ID**
这是对应数据点的唯一名称，根据结构，例如适配器名称.实例的编号.设备名称.通道名称.数据点名称。

### **2.) 父母姓名**
与第 3 列名称中的内容相同。

### **3.) 姓名**
数据点的名称。这可以是更容易理解的自动生成或手动分配的名称。此名称不必是唯一的。

### **4.) 价值**
数据点的当前值在此处指定。

此值是可编辑的

### **5.) 确认**
如果此值被系统更改并接受，则该值为_true_，否则为_false。_

### **6.) 来源**
此处指定哪个实例对数据点进行了最后一次更改。

### **7.) 时间**
这是上次更新数据点时的时间戳。

### **8.) 改变**
这是数据点的值上次更改时的时间戳。

## 页脚
页脚中有一些信息

![iobroker_admin_states_footer](../../../de/adapterref/iobroker.admin/img/tab-events_States_footer.jpg)

### **1.) 重新加载**
可以单击此图标来更新表格。

### **2.) 页面信息**
页脚中间的信息块为您提供了使用下拉菜单设置每页行数的选项。每页有 20、100、200、500 和 1000 行可供选择。此外，还有关于总共有多少页的信息，以及使用箭头图标向前或向后滚动的选项。

### **3.) 数据点信息**
此信息表示现有数据点的总数及其在当前页面上显示的范围。