---
title: 事件
lastChanged: 10.05.2021
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/admin/events.md
hash: 5xQhxMr82Fyb7tKpihP3Sp/Vj7as6+yQvCM9e0k1ZGI=
---
所有数据点的当前状态都显示在此选项卡中。
此处的值无法更改。

![活动页面](../../de/admin/media/ADMIN_Ereignisse_numbers.png)

## 标题行
标题栏包含最重要进程的图标。每个图标都有上下文帮助。只需将鼠标放在图标上一会儿。

### 详细图标：
### 1 - 暂停视图
使用此按钮，您可以停止最新事件的当前显示。然后该按钮变为黄色背景，“错过”事件的数量在该背景上进行计数。

!> 由于事件有时会在毫秒范围内更新，因此可能会出现延迟或显示可能会冻结

再次单击该按钮将重新启动实时显示。

### 2 - 删除广告
此按钮清除屏幕

##页面内容
现有事件以表格形式显示在页面上。最近的事件位于顶部。

![活动页面](../../de/admin/media/ADMIN_Ereignisse_numbers02.png)

您可以通过单击列标题根据特定条件进行过滤。

### 1 - 类型
这里是 ***stateChange***，即值的更新，或 ***objectChange*** 这也是两个过滤器选项。

###2-ID
这是对应数据点的唯一名称，根据结构，例如适配器名称.实例的编号.设备名称.通道名称.数据点名称。

在这里，您可以过滤完整的 ID，也可以过滤其中的一部分，例如所有 TEMPERATURE 数据点。

### 3 - 价值
这是各个数据点的当前值。

### 4 - 确认
如果此值已更改并被系统接受，则该值为 true，否则为 false。

这些也是过滤器选项

### 5 - 来源
此处指定哪个实例对数据点进行了最后一次更改。

这些可以在此列中过滤。

### 6 - 时间
这是上次更新数据点时的时间戳。

### 7 - 已更改
这是数据点的值上次更改时的时间戳。