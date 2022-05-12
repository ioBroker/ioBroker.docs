---
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/viz/fancyswitch.md
title: 花式开关
hash: n0p4vOCoNTExbz9aObBMSobY2hhSyFfbooJ5fUG/fVI=
---
# 花式开关
这组代表了一些大部分以相同方式工作的开关。
它们代表布尔状态，也可以切换它们。

|小部件 |图片 |说明 |
|------------------------|-------|--------------|
|关灯/开灯| ![转变](../../de/viz/media/fancyswitch-1.png)|浅灰色换挡拨片 |
|滑块暗开/关 | ![转变](../../de/viz/media/fancyswitch-3.png)|带有“开”/“关”标签的滑块 |
|滑块暗开/关 | ![转变](../../de/viz/media/fancyswitch-4.png)|带有“关闭”/“开启”标签的滑块 |
|摇杆暗开/关| ![开关](媒体/fancyswitch-5.png) ![开关](../../de/viz/media/fancyswitch-6.png)|带有“关闭”/“开启”标签的深色摇杆开关；也可选择浅色|
|Giva Labs iButton | ![转变](../../de/viz/media/fancyswitch_givalabsibutton.png)|带有“开”/“关”标签的白色滑块 |
|Taitem jqui 拨动开关| ![转变](../../de/viz/media/fancyswitch_taitem.png)|滑块外带有“开”/“关”标签的白色滑块 |
|Taitem jqui 拨动开关| ![switch](../../de/viz/media/fancyswitch_taiitem.png)|滑块外带有“开”/“关”标签的白色滑块 |

## 属性说明
|属性|描述|主题|
|----|----|---|
|ObjectId|要显示的包含 HTML 的对象的 ID|开关、滑块、推杆、跷跷板 |
|反转|反转开关状态|开关、滑块、滑轨、摇杆 |
|false 值|false/off/off 状态对应的值|switch,slider,ram,seesaw |
|真值|false/off/off状态对应的值|Switch,slider,ram,seesaw |
|自动关闭|代表按键功能：经过一段可调时间后，开关恢复原状|开关、滑块、滑动、摇杆 |
|明亮的风格|更亮的开关表示|摇杆暗开/关|
|杠杆尺寸||Giva Labs iButton |
|容器尺寸||Giva Labs iButton |
|允许拖动|可以拖动开关（不仅仅是按下）|Giva Labs iButton |
|动画|切换是动画|Giva Labs iButton |
|切换持续时间|数据点仅在延迟后切换|Giva Labs iButton |
|高亮开关|开关的滑动区域也是彩色显示|Taitem jqui Toggleswitch |
|Widget 宽度|开关宽度，与标签无关|Taitem jqui Toggleswitch |
|Prepend html|要在对象之前渲染的HTML代码|Taitem jqui Toggleswitch |
|追加Html|要在对象之后渲染的HTML代码|Taitem jqui Toggleswitch |

**示例：** ![009](../../de/viz/media/fancyswitch_all.gif)