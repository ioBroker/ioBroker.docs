---
title: 小部件
lastChanged: 11.08.2019
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/viz/widgets.md
hash: TxhNPmBC2abg80GhW8v2M7m6PomjfeOCj2SJAYiI5/g=
---
# 小部件
＃＃ 一般来说
在这种情况下，小部件（“设备、事物”）是显示元素，以各种方式显示数字、文本、图像或图表并提供交互选项。

## IoBroker.vis 小部件
在带有 vis 的 ioBroker 中，有不同的用于可视化的小部件集。

-------------------------------------------------------------------------------
-------------------------------------------------------------------------------

### 小部件的基本设置
＃＃＃＃ 一般来说
![001_Widget_General](../../de/viz/media/vis_widgets_001_Widget_Generell.jpg)

|属性|描述|
|-----|----|

|名称|可以在此处输入此小部件的唯一名称|评论|可在此处输入简短描述| CSS 类|:构造: |过滤词|:结构: |在视图中显示|您可以在此处选择此小部件是仅出现在当前视图中还是出现在多个视图中。
|不活动（锁定）|：构造：

#### **可见性**
小部件的可见性可以取决于数据点的状态。
![002_Widget_可见性](../../de/viz/media/vis_widgets-2_002_Widget_Sichtbarkeit.jpg)

|属性|描述|
|----|----|

| `Object ID`|此处输入应控制所选小部件可见性的数据点的 ID。可以使用 按钮搜索数据点。
|条件|如果在此处为上述数据点输入条件，则小部件将变得可见...
|条件的值|...对应于此处输入的值。

＃＃＃＃ **一般来说**
![](../../de/viz/media/vis_widgets_003_Widget_Allgemein.jpg)“常规”部分特定于每个小部件，并针对每个小部件进行了更详细的描述。
在此部分中，所需的数据点将分配给“对象 ID”字段中的小部件。

*** 小部件的 **CSS 设置** 可以在以下菜单项中找到，并且可以根据您自己的意愿进行调整：

#### **CSS 通用**
![](../../de/viz/media/vis_widgets_004_CSS_allgemein.jpg)

|属性|描述|
|-----|----|

| `left`|距视图左边缘的距离 | `top`|距视图顶部边缘的距离 | `width`|小部件的宽度 | `height`|小部件的高度 | `z-index`|指定小部件所在的级别（0=在背景上，正值=值越高，越靠前）| `overflow-y`|

| `溢出-y`|
| `opacity`|透明度（0=不透明 -> 图像不可见.. 1=透明 -> 图像可见） |

#### CSS 字体和文本
![005_CSS_字体_文本](../../de/viz/media/vis_widgets_005_CSS_Font_Text.jpg)

|属性|描述|
|-----|----|

| `color`|字体颜色（通过选择对话框或通过颜色代码）| `text-align`|文本对齐方式（左、右、中）| `text-shadow`|文本阴影颜色 | `font-family`|字体 | `font-style`|字符集类型（普通、斜体、斜体、首字母、继承）| `font-variant`|字符集变体（普通、小型大写字母……）| `font-weight`|字符集强度 | `font-size`|字体大小 | `line-height`|行间距| `letter-spacing`|字符间距 | `word-spacing`|字间距

#### **CSS 背景**
![006_CSS_背景](../../de/viz/media/vis_widgets_006_CSS_Hintergrund.jpg)

|属性 |描述 |
|-----|-----|

| `background` |可以在此处一起指定以下几个属性 | `-color` |背景颜色 | `-image` |背景图片 | `-repeat` |确定背景是否在元素的整个宽度和/或高度上重复。
| `-attachement` |确定背景图像在滚动时是固定还是移动 | `-position` |背景图像方向 (https://www.w3schools.com/cssref/pr_background-position.asp) | `-size` |背景图像的大小 | `-clip` |调节与边缘的重叠 | `-origin` |图像坐标的坐标系原点

#### **CSS 边框**
![007_CSS_边框](../../de/viz/media/vis_widgets_007_CSS_Border.jpg)

|属性|描述|
|----|----|
|`-width`|边框厚度|  |
|`-color`|边框颜色|
|`-radius`|边框的圆角半径；最多可以是小部件较短路线的一半|
|`-radius`|边框的圆角半径；最多可以是小部件较短路线的一半|

|属性|描述|
|-----|----|

| `-width`|边框厚度 | `-style`|边框的线条样式 | `-color`|边框颜色 | `-radius`|边框的圆角半径；最多可以是小部件较短路线的一半

#### CSS 阴影和间距
![008_CSS_阴影_距离](../../de/viz/media/vis_widgets_008_CSS_Schatten_Abstand.jpg)

|属性|描述|
|----|----|
|`padding`|距小部件框边缘的偏移|
|`padding-top`|顶部偏移|
|`padding-right`|右侧偏移|
|`padding-bottom`|下侧偏移|
|`box-shadow`|小部件框阴影的颜色|
|`margin-top`|小部件周围的上边距（自动、%、px、pt、cm）|
|`margin-right`|小部件的右边框|
|`margin-bottom`|小部件周围的底部边框|
|`margin-left`|小部件周围的左边框|
|`margin-left`|小部件周围的左边距|

|属性|描述|
|-----|----|

| `padding`|距小部件框边缘的偏移| `padding-left`|左侧偏移| `padding-top`|顶部偏移| `padding-right`|右侧偏移| `padding-bottom`|下侧偏移| `box-shadow`|小部件框阴影的颜色 | `margin-top`|小部件周围的上边距（自动、%、px、pt、cm）| `margin-right`|小部件周围的右边框 | `margin-bottom`|小部件周围的底部边框 | `margin-left`|小部件周围的左边框