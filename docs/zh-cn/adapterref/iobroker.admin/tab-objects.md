---
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.admin/tab-objects.md
title: 对象选项卡
hash: GIc3qNC2ZnoKb8Y2zbYYsyTbWS+DWObdVmPTllsNDVk=
---
# 对象选项卡
所有管理对象都位于此选项卡下。为每个实例创建一个文件夹，其中由它创建的数据点位于分层结构中。也可以在此处手动创建和删除对象。可以上传或下载整个对象结构。另一个按钮可以显示专家视图。

<span style="line-height: 1.5; text-align: justify;"></span>

![iobroker_admin_objects_content00](../../../de/adapterref/iobroker.admin/img/tab-objects_Inhalt00.jpg)

## 标题行
标题栏包含最重要进程的图标。每个图标都有上下文帮助。为此，只需将鼠标放在图标上一段时间即可。

![iobroker_admin_objects_headline_icons](../../../de/adapterref/iobroker.admin/img/tab-objects_Headline_Icons.jpg)

### **图标详细说明：**
### **1.) 更新视图**
如果刚刚创建的对象不可见，单击此图标将有助于使页面状态保持最新。

### **2.) 更改排序**
此按钮更改此页面上对象的排序。

当该按钮处于活动状态时，所有对象均按字母顺序排序。 如果此按钮未激活，则对象将按实例分层排序。

然后接下来的两个图标也将可见。

### **3.) 折叠所有主题区域**
### **4.) 扩展所有主题领域**
### **5.) 管理员模式**
当您选择此图标时，将显示其他对象（切换功能）。 这些是系统的数据点。

### **6.) 添加**
选择此图标后，可以添加其他对象。
如果选择了一个文件夹，则该文件夹将在对象结构中被采用为_Parent_。
配置窗口打开：

![iobroker_admin_objects_addobject](../../../de/adapterref/iobroker.admin/img/tab-objects_AddObject.jpg)

现在必须在此处选择新对象的名称，并根据层次结构提供设备、通道或数据点作为类型。
可用的数据点类型有逻辑值、开关、字符串、数字、值列表、字段、对象和混合。

单击“确定”确认输入窗口后，另一个窗口将打开：

![iobroker_admin_objects_addobjec02t](../../../de/adapterref/iobroker.admin/img/tab-objects_AddObjec02t.jpg)

可以在此处输入更多数据。可以将角色和图标添加到对象中。

其他选项卡下还有该对象的其他属性。
这样的信息对于每个对象都是可用的。

### **7.) 上传**
此按钮将完整的对象结构作为 json 文件上传到 ioBroker 服务器

### **8.) 下载**
使用此按钮，所选对象结构将从 ioBroker 服务器作为 json 文件下载并保存。

## 页面内容
![iobroker_admin_objects_headline_columns](../../../de/adapterref/iobroker.admin/img/tab-objects_Headline_Columns.jpg)

现有对象显示在页面上的表格中。

该表由以下列组成（列标题 1 和 2 下的字段以及其他列的下拉菜单用作过滤条件）。
图中的表格按照层次结构排列，所有子项（节点）都已展开：

### **1.) ID**
这些是对象层次结构的顶层。这里的顶层是例如
实例的名称，包括数据的相应结构。

### **2.) 姓名**
对象的名称在此列中指定。此外，前面的图标显示了这是哪个层次结构级别（设备、通道或数据点）。

此列中的值是可编辑的。

![iobroker_admin_objects_struct01](../../../de/adapterref/iobroker.admin/img/tab-objects_Structure01.jpg)

### **3.) 输入**
层次结构级别中的类型已通过前面的图标在 _Name_ 列中可见，此处再次明确提及。您可以使用列标题中的下拉菜单按这些类型进行过滤，例如，仅显示所有数据点。

### 4.) 角色
该角色指定 .vis 和 mobile 等用户界面应如何处理此数据点。
这基本上是通过术语简要描述的该对象的功能。
然后您可以再次过滤。此列中的值是可编辑的。

### **5.) 房间**
如果该对象已分配给房间，则会在此处显示。
除其他外，这还用于在搜索对象时进行过滤。
此列中的值是可编辑的。这意味着稍后可以将对象分配到房间。
如果您单击该字段，则会打开一个弹出窗口，其中包含迄今为止已创建的房间。

![iobroker_admin_objects_rooms](../../../de/adapterref/iobroker.admin/img/tab-objects_Rooms.jpg)

### **6.) 函数**
此列包含分配了相应对象的交易。

此列中的值是可编辑的。这意味着这些对象随后可以分配给交易。如果您单击该字段，则会打开一个弹出窗口，其中包含迄今为止已创建的交易。

### **7.) 价值**
如果对象是数据点，则此处显示该数据点的当前值。

### **8.) 其他**
如果单击铅笔图标，则会打开一个窗口，其中包含该对象的属性。
它与上面创建新对象时出现的窗口相同。
可以在此处更改对象的属性。使用此函数时应极其谨慎，并且仅当您确切知道要使用它做什么时。

单击垃圾桶图标可删除该对象以及层次结构中其下方的**所有**对象。为了安全起见，将出现一个窗口，必须在其中再次确认删除。

![iobroker_admin_objects_删除](../../../de/adapterref/iobroker.admin/img/tab-objects_delete.jpg)

仅当至少安装了一个历史实例（History、InfluxDB 或 SQL）时才会出现齿轮图标。
可以在此处配置用于记录历史数据的数据点。更多信息可在 [历史适配器](http://www.iobroker.net/?page_id=144&lang=de) 的描述中找到。

使用标题栏中的齿轮，可以对匹配当前过滤条件的所有数据点同时执行此操作。因此，请务必仔细检查是否选择了此页面上的过滤条件，以便仅包含所需的数据点。

用于过滤此列的下拉菜单适用于包含记录数据的数据点。
_with_、_without_ 和 _all_ 以及已安装的历史记录实例可在此处找到。