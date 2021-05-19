---
lastChanged: 06.06.2019
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/basics/states.md
title: 状态和数据点
hash: OUheU+wHUm8+dmMTruV37xytEJKhWqBC2U5RwekU/9g=
---
＃状态和数据点
**数据点**由“状态”类型的静态对象和动态状态（状态）组成。

是状态的属性

 * val-当前值
 * ack-标志，显示目标系统对值的确认
 * ts-状态的最新更新的Unix时间戳（以毫秒为单位）
 * lc-值的最后更改的Unix时间戳（以毫秒为单位）
 * q-[品质]（../dev/objectsschema.md＃状态）
 *来自上次更新的-（可选）源（适配器实例）
 *用户-（可选）用户名，是最后一个写入值的用户名。
 * c-（可选）评论
 *到期-（可选）以秒为单位的时间，当该值重置为“ null”时。

？&gt; ***这是一个占位符***。<br><br>帮助ioBroker并扩展本文。请注意[ioBroker样式指南](https://www.iobroker.net/#de/documentation/community/styleguidedoc.md)，以便可以更轻松地采用更改。