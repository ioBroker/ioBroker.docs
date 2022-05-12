---
title: 小部件
lastChanged: 11.08.2019
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/viz/widgets.md
hash: beLY0bKf2v2bHfNEpPQQjde4CBBS7s9c5jyaH3r9Z2o=
---
# 小部件
＃＃ 作为基本规则
在这种情况下，小部件（“设备、事物”）是以各种方式显示数字、文本、图像或图表并提供交互选项的显示元素。

## IoBroker.vis 小部件
在 ioBroker 中使用 vis 有不同的可视化小部件集。

-------------------------------------------------------------------------------
-------------------------------------------------------------------------------

###小部件的基本设置
＃＃＃＃ 作为基本规则
![001_Widget_General](../../de/viz/media/vis_widgets_001_Widget_Generell.jpg)

|属性|描述|
|-----|----|

|名称|可以在此处输入此小部件的唯一名称 |评论|可以在这里输入简短的描述 | CSS类|：构造：|过滤词|：构造：|在视图中显示|在这里您可以选择此小部件是否应仅出现在当前视图中或多个视图中。
|非活动（锁定）|：构造：

#### **可见性**
小部件的可见性可以取决于数据点的状态。
![002_Widget_Visibility](../../de/viz/media/vis_widgets-2_002_Widget_Sichtbarkeit.jpg)

|属性|描述|
|----|----|

| `Object ID`|用于控制所选小部件可见性的数据点的 ID 在此处输入。可以使用按钮搜索数据点。
|条件|如果在此处为上述数据点输入的条件，则小部件可见...
|条件值|...等于此处输入的值。

＃＃＃＃ **一般的**
![](../../de/viz/media/vis_widgets_003_Widget_Allgemein.jpg)“常规”部分特定于每个小部件，并针对每个小部件进行了更详细的描述。
在本节中，所需的数据点被分配给对象 ID 字段中的小部件。

*** 小部件的 **CSS 设置** 可以在以下菜单项中找到，并且可以根据自己的要求进行调整：

#### **CSS 通用**
![](../../de/viz/media/vis_widgets_004_CSS_allgemein.jpg)

|属性|描述|
|-----|----|

| `left`|距视图左边缘的距离 | `top`|距视图顶部的距离 | `width`|小部件的宽度 | `height`|小部件高度 | `z-index`|小部件所在级别的指示（0=在背景上，正值=值越高，越靠近前面）| `overflow-y`|

| `溢出-y`|
| `opacity`|透明度（0=不透明->图像不可见.. 1=透明->图像可见） |

#### CSS 字体和文本
![005_CSS_Font_Text](../../de/viz/media/vis_widgets_005_CSS_Font_Text.jpg)

|属性|描述|
|-----|----|

| `color`|字体颜色（通过选择对话框或颜色代码）| `text-align`|文本对齐（左、右、居中）| `text-shadow`|文字阴影颜色 | `font-family`|字体 | `font-style`|字符集类型（普通、斜体、斜体、初始、继承）| `font-variant`|字符集变体（普通，小型大写字母，...）| `font-weight`|字体强度 | `font-size`|字体大小 | `line-height`|行距 | `letter-spacing`|字符间距 | `word-spacing`|字间距

#### **CSS 背景**
![006_CSS_Background](../../de/viz/media/vis_widgets_006_CSS_Hintergrund.jpg)

|属性 |说明 |
|-----|-----|

| `background` |可以在此处指定以下几个属性 | `-color` |背景颜色 | `-image` |背景图片 | `-repeat` |确定背景是否在元素的整个宽度和/或高度上重复。
| `-attachement` |确定背景图像在滚动时是固定的还是移动的 | `-position` |背景图像方向 (https://www.w3schools.com/cssref/pr_background-position.asp) | `-size` |背景图片大小 | `-clip` |控制与边界的交点 | `-origin`|图像坐标的坐标系原点

#### **CSS 边框**
![007_CSS_边框](../../de/viz/media/vis_widgets_007_CSS_Border.jpg)

|属性|描述|
|----|----|
|`-width`|边框厚度| |
|`-color`|边框颜色|
|`-radius`|边界的拐角半径；最多可以是小部件较短距离的一半|
|`-radius`|边框的角半径；最多可以是小部件较短距离的一半|

|属性|描述|
|-----|----|

| `-width`|边框厚度 | `-style`|边框线型 | `-color`|边框颜色 | `-radius`|边界的拐角半径；最多可以是小部件较短距离的一半

#### CSS 阴影和间距
![008_CSS_shadow_distance](../../de/viz/media/vis_widgets_008_CSS_Schatten_Abstand.jpg)

|属性|描述|
|----|----|
|`padding`|从小部件框边缘偏移|
|`padding-top`|顶部偏移|
|`padding-right`|右侧偏移|
|`padding-bottom`|底部偏移|
|`box-shadow`|小部件框阴影的颜色|
|`margin-top`|小部件周围的上边距（auto、%、px、pt、cm）|
|`margin-right`|小部件周围的右边框|
|`margin-bottom`|小部件周围的底部边框|
|`margin-left`|小部件周围的左边框|
|`margin-left`|小部件周围的左边距|

|属性|描述|
|-----|----|

| `padding`|从小部件框边缘偏移| `padding-left`|左侧偏移 | `padding-top`|顶部偏移 | `padding-right`|右侧偏移 | `padding-bottom`|底部偏移 | `box-shadow`|小部件框阴影颜色 | `margin-top`|小部件周围的上边距（auto、%、px、pt、cm）| `margin-right`|小部件周围的右边框 | `margin-bottom`|小部件周围的底部边框 | `margin-left`|小部件周围的左边框