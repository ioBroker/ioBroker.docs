---
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/viz/fancyswitch.md
title: 花式开关
hash: DFXagUdr/ZV0Iv1rR8AXrE035qtjVkn9+FGKRExwK0M=
---
# 奇幻开关
该组代表了一些工作方式基本相同的开关。
它们代表布尔状态，也可以切换它们。

|小部件|图片|描述 |
|------------------------|-------|--------------|
|关闭/打开灯| ![转变](../../de/viz/media/fancyswitch-1.png)|浅灰色摇杆开关|
|深色滑块开/关| ![转变](../../de/viz/media/fancyswitch-3.png)|带有“开”/“关”标签的滑块|
|深色滑块关闭/打开 | ![转变](../../de/viz/media/fancyswitch-4.png)|带有“关闭”/“打开”标签的滑块 |
|摇杆暗关/开| ![开关](media/fancyswitch-5.png) ![开关](../../de/viz/media/fancyswitch-6.png)|带有“关”/“开”标签的深色摇杆开关；也可选择浅色风格 |
|Giva 实验室 iButton | ![转变](../../de/viz/media/fancyswitch_givalabsibutton.png)|带有“开”/“关”标签的白色滑块 |
|Taitem jqui 切换开关| ![转变](../../de/viz/media/fancyswitch_taitem.png)|白色滑块，滑块外部带有“开”/“关”标签 |
|Taitem jqui 切换开关| ![开关](../../de/viz/media/fancyswitch_taitem.png)|白色滑块，滑块外部带有“开”/“关”标签 |

## 属性说明
|属性|描述|关注点|
|----|----|---|
|ObjectId|要显示的对象的 ID，其中包含 HTML|Switch、Slider、Slider、Rocker |
|反转|反转开关状态|开关、滑块、滑块、摇杆|
|False 值|状态 false/off/off 对应的值|开关、滑块、滑块、摇杆 |
|真值|状态 false/off/off 对应的值|开关、滑块、滑块、摇杆 |
|自动关闭|代表按钮功能：经过一段可调时间后，开关恢复到原始状态|开关、滑块、滑块、摇杆|
|灯光风格|开关的更亮表现|深色摇杆关闭/打开|
|杠杆大小||Giva Labs iButton |
|容器尺寸||Giva Labs iButton |
|允许拖动|开关可以拉动（不仅仅是按下）|Giva Labs iButton |
|动画|切换以动画方式显示|Giva Labs iButton |
|切换持续时间|数据点切换有延迟|Giva Labs iButton |
|高亮开关|滑动区域的开关也以颜色显示|Taitem jqui Toggleswitch |
|小部件宽度|开关的宽度，与标签无关|Taitem jqui Toggleswitch |
|Prepend html|要在对象之前显示的 HTML 代码|Taitem jqui Toggleswitch |
|附加 HTML|要在对象后面显示的 HTML 代码|Taitem jqui Toggleswitch |

**示例：** ![009](../../de/viz/media/fancyswitch_all.gif)