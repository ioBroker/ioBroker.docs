---
title: 实例
lastChanged: 10.05.02021
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/admin/instances.md
hash: UoGLmTCoECn4hXH3ZdHdTGnXR2yC6U/6IeuOooI7o5A=
---
此处列出了已通过适配器选项卡安装的实例，并且可以进行相应的配置。

## 标题行
标题栏包含最重要进程的图标。每个图标都有上下文帮助。为此，只需将鼠标放在图标上一段时间即可。还有有关服务器负载的信息。

![标题栏中的图标](../../de/admin/media/ADMIN_Instanzen_numbers.png)

图标详细说明：

### 1 - 刷新视图
如果刚刚创建的实例不可见，单击此图标将有助于使页面状态保持最新。

### 2 - 打开管理员模式
当您选择此图标时，将显示用于配置实例的附加列（切换功能）。有关这方面的信息可以在页面内容部分找到。

### 3 - 仅显示所选主机的实例
![可用的主机](../../de/admin/media/ADMIN_Instanzen_hosts.png)

在多主机系统中，所有主机的实例都由主服务器的管理员管理。该实例所在主机的信息位于***Server*** 列中。

如果在标题中选择了主机，则只能使用此按钮显示安装在那里的实例。

![可用的主机](../../de/admin/media/ADMIN_Instanzen_hosts.png)

### 4 - 过滤器
可以在此字段中输入术语来过滤或搜索实例

## 实例窗口中的更多信息
第一个数字表示实例到目前为止使用的内存以及剩余的可用内存（以 MB 为单位）。后面是空闲内存的百分比。 ioBroker 服务器的名称和正在运行的进程数位于方括号中。

## 页面内容
![可用的主机](../../de/admin/media/ADMIN_Instanzen_numbers02.png)

已安装的适配器实例显示在页面上的表格中。

该表由以下列组成：

### 1 - 条件
这里实例的状态由红绿灯表示。将鼠标悬停在信号上可以获得更多信息。

并非所有实例都有此红绿灯。但这并不是恐慌的理由。这些实例要么是时间控制的实例，仅短暂连接到控制器，然后立即关闭，要么像 vis 一样继续在后台运行。

### 2 - 图标
此处显示此适配器在整个 ioBroker 中使用的图标

### 3 - 实例
此列包含实例的名称。它由适配器的名称和一个按实例安装顺序连续编号的数字组成。第一个实例收到

0. 此指定是 ioBroker 中数据点指定的基础。

### 4 - 激活
这是实例启动或停止的地方。绿色暂停标志表示适配器正在运行，可以通过单击暂停，红色播放标志显示已停止的实例，可以通过单击启动。

### 5 - 配置
单击此图标将打开特定于适配器的配置菜单。相应的菜单针对关联的适配器进行了描述。

### 6 - 重新启动
当您点击该图标时，对应的实例将会重新启动

### 7 - 垃圾桶
该图标删除相应的实例。保留同一适配器的其他实例。适配器本身也保留下来。

### 8 - 网页链接
该图标包含指向该实例网站的链接。要么是因为该适配器带有自己的 Web 界面（具有不同的端口），要么只是不同的路径。在某些情况下，此链接还会指向帮助页面。

### 9 - 标题
此处指定实例的名称。您可以根据自己的意愿或需要更改此名称。如果有多个适配器实例（否则名称相同），这尤其有用。例如，如果 RF、有线和 CuxD 各有一个实例，则 hm-rpc 就会出现这种情况。

### 10.) 日程安排
对于按时间控制启动的适配器，在此输入该适配器应启动的时间。该调度采用 cron 作业的格式。要更改它，请单击带有三个点的按钮。将打开一个输入窗口，其中包含许多附加信息和帮助。

### 11 - 重新启动
您还可以使用时钟图标来创建应重新启动该实例的时间表。

此栏仅在专家模式下可见！

### 12 - 日志级别
可以在此列中调整实例的相应日志级别。可用的有调试、信息、警告和错误。默认情况下该值为 info。如果您感觉某些事情不太正常，您可以将其设置为调试。然后该实例的日志选项卡中也会输出调试信息，这可以帮助查找错误。相反，您也可以将该值设置得更高，这样日志就不会那么广泛。
此栏仅在专家模式下可见！

### 13 - 内存限制
您可以在此处指定应为实例提供多少 RAM 作为预防措施。此内存量将不再可用于其他任务，因此不应选择太高，特别是对于 RAM 很少的系统。如果实例暂时需要更多内存，系统当然会为其分配内存，但随后会立即再次释放给系统。当实例需要的内存多于为其保留的内存时，所需的内存将显示为红色。

此栏仅在专家模式下可见！

### 14 - 内存使用情况
此处显示实例实际使用的内存。这些值会定期更新。更新后，这些值会短暂以绿色文本显示。