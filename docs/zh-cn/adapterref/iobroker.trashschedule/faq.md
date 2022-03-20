---
chapters: {"pages":{"de/adapterref/iobroker.trashschedule/README.md":{"title":{"de":"ioBroker.trashschedule"},"content":"de/adapterref/iobroker.trashschedule/README.md"},"de/adapterref/iobroker.trashschedule/blockly.md":{"title":{"de":"ioBroker.trashschedule"},"content":"de/adapterref/iobroker.trashschedule/blockly.md"},"de/adapterref/iobroker.trashschedule/faq.md":{"title":{"de":"ioBroker.trashschedule"},"content":"de/adapterref/iobroker.trashschedule/faq.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.trashschedule/faq.md
title: ioBroker.trashschedule
hash: lSgogAfQ2zn2c2JW+6xbH6dkE8G0Tl2kJU/6j1MqcjI=
---
![商标](../../../de/adapterref/iobroker.trashschedule/../../admin/trashschedule.png)

# IoBroker.trashschedule
＃＃常问问题
### Trashschedule 适配器保持黄色
如果适配器保持黄色，则 iCal 适配器无法获取约会。这是因为 iCal 适配器

- 无法调用那里配置的日历（访问权限），
- 或者使用的日历不包含任何约会/设定的时间太短。

**此外，当使用“事件”功能（见后台标签）时，必须在 iCal 适配器中设置“显示”复选框。** 如果未设置该复选框，相关约会将由iCal 适配器，因此不能再被 Trashschedule 适配器读取。

### 某些类型没有找到/填充
这可能是因为 iCal 适配器“对未来的展望不够远”。只需增加天数，以便也可以找到这些日期。我的建议是 8 周，即 56 天。这应该会找到大多数拾音器（以及后续拾音器）。圣诞树或类似物当然是个例外。

###剩余天数不更新
这个想法是 iCal 适配器将定期刷新日历。因此，此处应定义一个间隔，即再次读取 iCal 文件/iCal Url 中的数据的频率。不必定期重新启动 Trashschedule 适配器（它只会再次从 iCal 读取相同/旧数据）。因此，iCal 处于领先地位，并且必须确保始终提供最新的约会。 **因此，iCal 实例应至少每天启动一次（尽可能早）（请参阅实例上的 cron 设置）。**

### 为“trashschedule.0.type.xxx.nextWeekday”设置的状态值必须是“string”类型，但接收类型为“number”
在后来的适配器版本中，对部分数据点的数据类型进行了调整。如果日志中出现相应的错误，可以通过适配器重新创建所有数据点来解决。只需删除 ``trashschedule.0`` 下的所有数据点。这可以在对象视图中轻松完成。

重新启动实例后，所有数据点都将再次可用。

### 一些浮标在 VIS 小部件中不可用或未正确显示
使用的 SVG 中桶的颜色和不同的阴影是动态计算的。在 0.0.9 版本之前仍有一些错误，现已修复。将适配器更新到 0.0.9 或更新版本会有所帮助。此外，应通过适配器选项卡（激活专家模式）执行 VIS 和 Trashschedule 的“上传”。

### Trashschedule 适配器忽略约会的时间
行为如所愿。适配器不关心时间 - 它只对收集日期感兴趣。

### VIS 小部件在 Android 的 VIS 应用程序中不起作用
它不在我的手中。该应用程序的工作方式不同 - 小部件必须由开发人员手动存放。我建议使用 **Fully Kiosk Browser** 应用程序。所以不存在这样的问题。

### VIS 小部件为空/未显示任何内容
JSON 节点必须在“对象 ID”下的小部件中指定，例如：`trashschedule.0.type.json`

### Bin 的颜色以哪种格式存储？
颜色被指定为十六进制代码，例如使用 `#13a7eb`。但是，在较新的版本中，颜色选择器会为您处理这些问题。只需选择您想要的颜色。

### VIS 显示“无效日期”
1.停止Trashschedule实例
2. 删除适配器的所有数据点（即从trashschedule.0 中）。只需单击对象视图中的垃圾桶即可，然后将其删除。
3.在适配器列表的专家视图中，先点击Upload for Trashschedule，再点击Upload for VIS
4.重启iCal instance list一次，然后再启动Trashschedule

### 存储的小时数（从 x 小时开始跳过当前日期）被忽略
此问题已从 1.0.5 版修复。请将适配器更新到 1.0.5 或更高版本。