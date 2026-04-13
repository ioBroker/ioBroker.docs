---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.openligadb/README.md
title: ioBroker适配器，用于从OpenLigaDB获取足球比赛结果
hash: YrfbY729Ff6oXcaEvK7MjRVrj55++kWS04OdlNVuy74=
---
![标识](../../../en/adapterref/iobroker.openligadb/admin/openligadb_n.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.openligadb.svg)
![下载](https://img.shields.io/npm/dm/iobroker.openligadb.svg)
![安装数量](https://iobroker.live/badges/openligadb-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/openligadb-stable.svg)
![GitHub 上的 nycrc 配置](https://img.shields.io/nycrc/oweitman/iobroker.openligadb?preferredThreshold=functions)
![NPM](https://nodei.co/npm/iobroker.openligadb.png?downloads=true)

# IoBroker 适配器，用于从 OpenLigaDB 获取足球比赛结果
＃＃ 概述
用于请求足球或其他游戏的数据的适配器，格式为`openligadb.de`

＃＃ 配置
添加适配器实例，然后点击扳手图标。在表单中，您可以添加联赛和赛季的快捷方式。

请访问 `openligadb.de` 查看可用的联赛、赛季和快捷方式。如果一个赛季跨越两年，请仅输入起始年份。

示例数据：1. 德国足球甲级联赛为 `shortcut = bl1 season = 2023`

如果您保存并关闭了配置，那么不久之后，您的联赛和赛季应该就会有新的数据点。

## 小部件
实际上有 5 个可用的组件。请在组件筛选器中输入 openligadb。

表4
![小部件表 4](../../../en/adapterref/iobroker.openligadb/widgets/openligadb/img/table.png)

这是经典的表格视图。该表格包含多个列。

- MP = 游戏场次
- W = 胜场
- D = 绘制
- L = 损失
- 进球数 = 净胜球
- 积分 = 排名积分
- T = 趋势

#### 属性表
|属性|集团|描述 |
| ----------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 所有比赛 | | 选择数据点 `allmatches`。（注意：在旧版组件中，使用的是 `table`。）此数据点在联赛/赛季成功设置后，于配置过程中创建。它包含所选联赛/赛季的所有比赛数据，格式为 JSON。所有表格视图（模式）均源自此数据集。 |
| 模式 | | 定义表格视图模式。可用选项：总计 (`1total`)、主场 (`2home`)、客场 (`3away`)、上半场 (`4round1`)、下半场 (`5round2`)。 |
| mode_binding | | `mode` 的替代方案，用于通过绑定进行动态控制。接受与 `mode` 相同的值。如果提供了有效值，则会覆盖 `mode` 属性。通常，此字段可以留空。 |
| mode_binding | | `mode` 的替代方案，旨在通过绑定实现动态控制。接受与 `mode` 相同的值。如果提供了有效值，则会覆盖 `mode` 属性。通常，此字段可以留空。 |
| maxicon | | 球队图标的最大尺寸（宽度和高度均适用）。 |
| 简称 | | 如果数据集中包含团队简称，则显示团队简称而不是完整名称。 |
| 高亮显示 | | 高亮显示名称与指定词语匹配的球队。多个词语之间可以用分号分隔（`;`）。匹配项会用 `<b>` 标签包裹。可以通过 CSS 类 `favorite` 或为每个高亮显示定义自定义类来应用其他样式（请参阅相应的文档部分）。 |
| 筛选 | | 按球队名称筛选表格。多个筛选条件可以用分号分隔（`;`）。 |
| 筛选 | | 按球队名称筛选表格。多个筛选条件之间用分号 (`;`) 分隔。 |
| iconup,icondn,iconst | 属性组图标 | 定义趋势指标（上涨、下跌、稳定）的自定义图标。 |
| 属性组中的 lastgamecount | 高级设置 | 将表格计算限制为相对于当前显示的比赛日（`currgameday` 或 `showgameday`）的特定数量的最近比赛日。例如：`showgameday` = 10 且 `lastgamecount` = 5 → 仅考虑第 6 至 10 个比赛日。 |
| 属性组中的 lastgamecount | 高级设置 | 将表格计算限制为相对于当前比赛日（`currgameday` 或 `showgameday`）的特定数量的最近比赛日。例如：`showgameday` = 10 且 `lastgamecount` = 5 → 仅考虑第 6 至 10 个比赛日。 |

### 比赛日游戏 v2
![小部件比赛日](../../../en/adapterref/iobroker.openligadb/widgets/openligadb/img/gameday.png)

此小部件显示比赛日信息。根据设置，它可以始终显示当前比赛日、相对于当前比赛日的比赛日，或显示特定比赛日。

此外，还可以设置显示的比赛日数量。

显示中的某些元素已标记了**CSS类**，可以根据需要定义其特定格式：

| CSS 类 | 影响哪个元素 | 备注 |
| --------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 收藏 | 比赛日标题（日期/时间） | 允许在收藏球队比赛日显示日期和时间。可选择性地与 CSS 类 `todaygameheader` 结合使用。 |
| 收藏 | 球队名称 | 允许自定义球队名称格式。 |
| 今日比赛 | 整场比赛 | 适用于当天进行的比赛。 |
| todaygameheader | 比赛日标题（日期/时间） | 当比赛日日期与当天一致时应用。 |

#### CSS 类示例
##### 示例：比赛日（一般日期）显示标题
```css
.oldb-tt tr.favorite {
    color: yellow;
}
```

##### 示例团队名称
```css
.oldb-tt b.favorite {
    color: blue;
}
```

##### 游戏示例行
```css
.oldb-tt .todaygame {
    color: red;
}
```

##### 比赛日（今天的日期）示例显示标题
```css
.oldb-tt .todaygameheader {
    color: lightgreen;
}
```

#### 属性比赛日
| 属性 | 组 | 描述 |
| ---------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 所有比赛 | | 此处必须选择名为 **allmatches** 的数据点。此数据点在配置联赛/赛季后创建（前提是配置有效）。它包含联赛/赛季的所有比赛和结果，格式为 JSON。如果今天有比赛日，则会为日期（**todaygameheader**）和相应的比赛（**todaygame**）分配 CSS 类。 |
| 当前比赛日 | | 此处必须选择名为 **当前比赛日** 的数据点。此数据点在配置联赛/赛季后创建（前提是配置有效）。其值由适配器根据当前日期计算。当前比赛日在上一个比赛日的最后一场比赛和下一个比赛日的第一场比赛之间切换。 |
| maxicon | | 球队图标在 x 或 y 方向上的最大尺寸。 |
| 简称 | | 如果提供的数据中包含简称，则显示简称而不是团队名称。 |
| 显示进球信息 | | 显示进球球员信息。 |
| 高亮显示 | | 您可以在此处输入一个或多个要高亮显示的词语，用分号 (;) 分隔。搜索仅在团队名称内进行。匹配的名称将用 HTML `<b>` 标签包裹。您可以使用 CSS 类 **"favorite"** 应用更详细的格式设置。此外，还可以为每个高亮显示定义自定义 CSS 类。请参阅“待办事项”章节。 |
| 显示比赛日 | 高级设置 | 如果此字段为空，则始终显示当前比赛日。如果输入正数，则显示指定的比赛日（如有）。如果输入负数，则显示相对于当前比赛日的比赛日（例如，-1 对应于上一个比赛日）。 |
| 显示比赛日计数 | 高级设置 | 通常情况下，此字段为空或包含 1，表示仅显示一个比赛日。如果输入其他数字，则会显示相应数量的比赛日，从 **显示比赛日** 中定义的设置开始。 |
| 显示星期几 | 高级设置 | （可选）在日期前显示星期几。 |

##### 示例
###### Showgameday 属性中的绑定示例
如有必要，也可以使用 vis-binding 计算并填充此字段。

相对计算的比赛日示例：|

```text
    Previous matchday
    {a:openligadb.0.bl1.2019.currgameday;a-1} or
    Next matchday
    {a:openligadb.0.bl1.2019.currgameday;a+1}
```

由于在可视化编辑模式下不会计算绑定，

在编辑模式下使用绑定时，始终显示当前比赛日。

### 最喜欢的俱乐部比赛 2
![最喜欢的游戏](../../../en/adapterref/iobroker.openligadb/widgets/openligadb/img/favgames.png) 此小部件显示您喜爱的球队在一个或多个联赛中的即将进行的比赛。选择要显示的联赛数量后，每个联赛将显示一个单独的配置组，您可以在其中配置以下设置。

如果比赛在今天举行，则相应的比赛（todaygame）将被标记上 CSS 类。

＃＃＃＃ 例子
```css
.todaygame {
    color: red;
}

.todaygameheader {
    color: yellow;
}
```

＃＃＃＃ 属性
| 属性 | 组 | 描述 |
| ---------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| leaguecount | 常规 | 指定要查询的联赛数量。每个联赛都会显示一个单独的配置组。 |
| maxicon | 常规 | 球队图标在 x 轴或 y 轴方向上的最大尺寸。 |
| 显示结果 | 常规 | 确定是否显示比赛结果（如有）。 |
| 显示缩写 | 常规 | 为了区分不同联赛的比赛，可以为每个配置定义自定义缩写。此选项控制是否显示该缩写。 |
| 显示星期几 | 常规 | （可选）显示日期前的星期几。**联赛** 组中的以下属性可能会根据 **联赛数量** 的值重复出现。 |
| 所有比赛 | 联赛 | 此处必须选择名为 **allmatches** 的数据点。配置联赛/赛季后，如果配置有效，则会创建此数据点。它包含联赛/赛季的所有比赛和结果，格式为 JSON。 |
| 当前比赛日 | 联赛 | 此处必须选择名为 **当前比赛日** 的数据点。此数据点在配置联赛/赛季后创建（前提是配置有效）。其值由适配器根据当前日期计算。当前比赛日在上一个比赛日的最后一场比赛和下一个比赛日的第一场比赛之间切换。 |
| 显示比赛日 | 联赛 | 如果此字段为空，则使用当前比赛日。如果输入正数，则使用指定的比赛日（如有）。如果输入负数，则比赛日相对于当前比赛日确定（例如，-1 对应于上一个比赛日）。 |
| showgamedaycount | 联赛 | 定义要显示的比赛日数量。如果留空，则显示所有剩余的比赛日（最多 9999 个比赛日）。如果输入一个数字，则显示该数字范围内的比赛日，从 **showgameday** 中定义的设置开始。 |
| 简称 | 联赛 | 如果提供的数据中包含简称，则显示简称而不是球队名称。 |
| 缩写 | 联赛 | 如果启用了 **showabbreviation** 功能，则显示此联赛的缩写。 |
| 高亮显示 | 联赛 | 您可以在此处输入一个或多个关键词，用分号 (;) 分隔，以识别您喜欢的球队。搜索仅限于球队名称。与其他组件不同，此处不会应用任何特殊的视觉高亮显示。 |

#### 最喜欢的俱乐部游戏示例
##### 最喜欢的俱乐部游戏中 `showgameday` 属性的绑定示例
也可以使用 `vis-binding` 计算并填充此字段。

相对而言，精心安排的比赛日示例：

```css
Previous matchday
{a:openligadb.0.bl1.2019.currgameday;a-1} or
Next matchday
{a:openligadb.0.bl1.2019.currgameday;a+1}
```

由于在 vis 编辑模式下不会计算绑定，因此在编辑模式下使用绑定时，始终会显示当前比赛日。

### 数据透视表 2
此小部件以数据透视表的形式显示所有比赛和结果。

| CSS 类 | 影响哪个元素 | 示例 |
| --------- | ------------------------------------- | ------- |
| 收藏 | 通过**高亮显示**选择的球队名称 | |

#### 数据透视表示例
##### 示例：通过高亮选择团队名称
```css
.oldb-tt .favorite {
    color: yellow;
}
```

#### 属性透视表
| 属性 | 组 | 描述 |
| ------------------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 所有比赛 | 常规 | 此处必须选择名为 **allmatches** 的数据点。配置联赛/赛季后，如果配置有效，则会创建此数据点。它包含联赛/赛季的所有比赛和结果，格式为 JSON。 |
| 当前比赛日 | 常规 | 此处必须选择名为 **当前比赛日** 的数据点。此数据点在配置联赛/赛季后创建（前提是配置有效）。其值由适配器根据当前日期计算。当前比赛日在上一个比赛日的最后一场比赛和下一个比赛日的第一场比赛之间切换。 |
| maxicon | | 球队图标在 x 或 y 方向上的最大尺寸。 |
| sort4e | | 定义要应用的排序标准。 |
| 简称 | | 如果提供的数据中包含简称，则显示简称而不是团队名称。 |
| 开场高亮显示 | | 在表格开头显示高亮显示的球队。 |
| 高亮显示 | | 您可以在此处输入一个或多个要高亮显示的词语，用分号 (;) 分隔。搜索仅在团队名称内进行。匹配的名称将用 HTML `<b>` 标签包裹。您可以使用 CSS 类 **"favorite"** 应用更详细的格式设置。 |

### 得分手 2
此小部件显示所有得分最高的选手。

#### 属性目标获取器
| 属性 | 组 | 描述 |
| ------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 进球者 | 常规 | 此处必须选择名为“进球者”的数据点。此数据点在配置联赛/赛季后创建（前提是配置有效）。它包含当前赛季的所有最佳射手。 |
| maxcount | | 限制显示的进球球员数量。 |
| sortorder | | 定义排序顺序。 |
| onlyhighlight | | 仅显示符合高亮筛选条件的条目。 |
| 高亮显示 | | 您可以在此处输入一个或多个要高亮显示的词语，用分号 (;) 分隔。搜索仅在玩家名称内进行。匹配的名称将用 HTML `<b>` 标签包裹。您可以使用 CSS 类 **"favorite"** 应用更详细的格式设置。 |

## 可重复利用的食谱
### 通过按钮控制桌子模式
1. 创建一个 **table v2** 小部件，并按照本文档中的说明进行配置。
2. 在小部件设置的“可见性”组中，分配您创建的数据点。
3. 复制此小部件，并将副本并排放置，以便

该视图中总共存在**三个实例**。

4. 在每个组件的**可见性**设置中，设置**“条件值”**

取以下值之一（每个小部件一个值）：`total`、`home`、`away`

5. 创建一个新的控件：**单选按钮值列表**

（包含在默认的 vis 安装中）。

6. 在此小部件的“常规”组下，选择您创建的对象 ID。
7. 在“值”字段中，输入：

`total;home;away`（此值必须与小部件可见性设置中使用的值匹配）

8. 在“文本”栏中输入：

`Total;Home;Away`

9. 打开 vis 运行时并测试设置。
10. 一切就绪后，将小部件精确地叠放在一起。

这样它们就会显示为一个单独的组件。

### 控件行的滚动（跑马灯）效果
当只显示一行或几行时，例如在 **FavGame 小部件** 中，效果最佳。

`#w00000` 是要进行动画处理的控件的 ID。

扩张

```css
#w00000 .oldb-tt {
    max-width: 100vw; /* iOS needs this */
    overflow: hidden;
}

#w00000 .oldb-tt tbody {
    display: inline-block;
    padding-left: 100%;
    animation: marquee 10s linear infinite;
}

/* Make it move */
@keyframes marquee {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-100%);
    }
}
```

### Spieltag über +/- Buttons steuern, sowie direkte Auswahl per Listbox
![控制按钮](../../../en/adapterref/iobroker.openligadb/widgets/openligadb/img/controlbuttons.png)

对于此控件，必须创建一个额外的数字类型数据点。

在本例中，它被命名为 javascript.0.bl1.spieltag。

感谢 bommel_030，导入的 4 个控件可以在这里找到：

扩张

```text
    [{"tpl":"_tplGroup","data":{"members":["w00065","w00066","g00001"],"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","attrCount":"1","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0},"widgetSet":null,"style":{"top":38.28125,"left":"663px","width":"141px","height":"37px"}},{"tpl":"tplIconInc","data":{"oid":"javascript.0.bl1.spieltag","repeat_delay":"800","repeat_interval":"800","src":"","step":"-1","minmax":"1","text":"-","g_last_change":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"name":"spieltag_minus","g_visibility":false,"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","g_gestures":false,"g_signals":false,"signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false},"style":{"left":"0%","top":"16.22%","background":"#303030","width":"17.73%","height":"67.57%","z-index":"50","font-family":"","background-color":"#303030","font-weight":"bolder","border-width":"2px","border-radius":"10px","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","color":"white","border-style":"solid","border-color":"white","font-size":""},"widgetSet":"jqui","grouped":true,"groupName":"w00065"},{"tpl":"tplIconInc","data":{"oid":"javascript.0.bl1.spieltag","repeat_delay":"800","repeat_interval":"800","src":"","step":"+1","minmax":"34","text":"+","gestures-offsetX":0,"gestures-offsetY":"-1","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis.0/VIS/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis.0/VIS/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis.0/VIS/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"g_last_change":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"name":"spieltag_plus","g_visibility":false,"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide"},"style":{"left":"82.27%","top":"16.22%","background":"#303030","width":"17.73%","height":"67.57%","z-index":"50","font-family":"","background-color":"#303030","font-weight":"bolder","border-width":"2px","border-radius":"10px","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","color":"white","border-style":"solid","border-color":"white"},"widgetSet":"jqui","grouped":true,"groupName":"w00066"},{"tpl":"_tplGroup","data":{"members":["w00064","w00059"],"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","attrCount":"1","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0},"widgetSet":null,"style":{"top":"0%","left":"21.99%","width":"56.74%","height":"100%"},"grouped":true,"groupName":"g00001"},{"tpl":"tplJquiSelectList","data":{"oid":"javascript.0.bl1.spieltag","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"values":"1;2;3;4;5;6;7;8;9;10;11;12;13;14;15;16;17;18;19;20;21;22;23;24;25;26;27;28;29;30;31;32;33;34","texts":"1. Spieltag;2. Spieltag;3. Spieltag;4. Spieltag;5. Spieltag;6. Spieltag;7. Spieltag;8. Spieltag;9. Spieltag;10. Spieltag;11. Spieltag;12. Spieltag;13. Spieltag;14. Spieltag;15. Spieltag;16. Spieltag;17. Spieltag;18. Spieltag;19. Spieltag;20. Spieltag;21. Spieltag;22. Spieltag;23. Spieltag;24. Spieltag;25. Spieltag;26. Spieltag;27. Spieltag;28. Spieltag;29. Spieltag;30. Spieltag;31. Spieltag;32. Spieltag;33. Spieltag;34. Spieltag","height":"150","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"no_style":true,"class":"","lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"open":false,"name":"spieltag_liste","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide"},"style":{"left":"0%","top":"54.77%","height":"45.95%","width":"100%","background":"","box-shadow":"","border-radius":"5px","padding-left":"","padding-right":"","margin-right":"","color":"","font-weight":"bolder","border-width":"2px","border-style":"solid","border-color":"white","background-color":""},"widgetSet":"jqui","grouped":true,"groupName":"w00064"},{"tpl":"tplIconState","data":{"oid":"javascript.0.bl1.spieltag","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":false,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"text":"Heute","invert_icon":false,"value":"{openligadb.0.bl1.2019.currgameday}"},"style":{"left":"0%","top":"0%","color":"white","background":"#303030","font-size":"small","font-weight":"normal","height":"45.95%","border-width":"2px","border-style":"solid","border-color":"white","width":"100%"},"widgetSet":"jqui","grouped":true,"groupName":"w00059"}]
```

### 如果您喜欢的球队今天有比赛，则显示特定属性
**示例 1** 如果拜仁慕尼黑今天有比赛，则 HTML 小部件的背景会变为绿色。

绑定表达式放置在此处 CSS 背景选项卡的 background-color 字段中。

```text
    {a:openligadb.0.bl1.2019.currgameday;vis.binds["openligadb"].checkTodayFavorite('openligadb.0.bl1.2019.allmatches','bayern')?'red':'green'}
```

扩张

```text
    [{"tpl":"tplHtml","data":{"g_fixed":false,"g_visibility":false,"g_css_font_text":false,"g_css_background":true,"g_css_shadow_padding":false,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","refreshInterval":"0","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0},"style":{"left":"445px","top":"589px","background":"{a:openligadb.0.bl1.2019.currgameday;vis.binds[\"openligadb\"].checkTodayFavorite('openligadb.0.bl1.2019.allmatches','bayer')?'red':'green'}","width":"70px","height":"70px","border-radius":"10px"},"widgetSet":"basic"}]
```

### 选择表格控件的表格模式
![表格模式](../../../en/adapterref/iobroker.openligadb/widgets/openligadb/img/tableselect.png) 此 HTML 小部件控制表格小部件的模式。

以下小部件中使用的数据点为：

`javascript.0.tablemode`

这必须绑定到表格小部件中的 `mode_binding` 属性，如下所示：

```text
    {javascript.0.tabellemodus}
```

以下是导入所需的组件代码。

扩张

```text
    [{"tpl":"tplJquiRadioList","data":{"oid":"javascript.0.tabellemodus","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":false,"g_css_border":false,"g_gestures":false,"g_signals":false,"g_last_change":false,"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","values":"1total;2home;3away;4round1;5round2","texts":"Gesamt;Heim;Auswärts;Hinrunde;Rückrunde","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"class":""},"style":{"left":"54px","top":"356px","background":"black","font-size":"xx-small"},"widgetSet":"jqui"}]
```

## 特殊功能
### Vis.binds\["openligadb"\].checkTodayFavorite(ObjectID,Favorites)
此 JavaScript 函数用于检查今天是否有一个或多个球队的比赛。该函数可通过 vis 绑定使用。

由于绑定要求，需要考虑以下几点。

这个函数可以在绑定中使用，例如，如下所示。

为了进行测试，可以将以下符号输入到 HTML 小部件中。

结果将为“是”或“否”，具体取决于搜索词今天是否出现在球队名称中。

所有引号（单引号和双引号）必须与所示完全一致。

#### 模式
```text
    {a:oid;vis.binds["openligadb"].checkTodayFavorite('oid_allmatches','clubsuche1,clubsuche2')?'ja':'nein'}
```

#### 真实案例
```text
    {a:openligadb.0.bl1.2024.currgameday;vis.binds["openligadb"].checkTodayFavorite('openligadb.0.bl1.2024.allmatches','bayern')?'ja':'nein'}
```

#### 参数的含义
```text
<table><tbody><tr><td>oid</td><td>An arbitrary data point that triggers the update. It is recommended to choose, for example, currgameday,<br>as this is updated simultaneously with allmatches.</td></tr><tr><td>oid_allmatches</td><td>Name of an allmatches data point for the respective league/season.</td></tr><tr><td>clubsuche</td><td>One or more names (can also be partial names), separated by commas (,). Please note:<br>This field corresponds to the highlight field in the widgets. Multiple search terms only need to be separated by commas here, not by semicolons as in the widgets.</td></tr></tbody></table>
```

vis 小部件的文档可在 vis 或 [小部件文档/德语](https://htmlpreview.github.io/?https://github.com/oweitman/ioBroker.openligadb/blob/master/widgets/openligadb/doc.html) 中找到

## `sendTo` 命令
### `getMatchData`
按联赛、赛季和时间范围从 OpenLigaDB 请求数据。

#### 必填参数
| `Parameter` | `Example` | `Type` | `Description` |
| `league` | `bl1` | `string` | `identifier of the league, see openlogadb` |
| `season` | `2024` | `string` | `name of the season, see openlogadb` |
| `datefrom` | `2024-09-01T00:00` | `string` | `date in ISO notation` |
| `datetill` | `2024-09-10T00:00` | `string` | `date in ISO notation` |
| `datetill` | `2024-09-10T00:00` | `字符串` | `ISO 表示法的日期` |

#### 示例 sendTo
```javascript
sendTo(
    'openligadb.0',
    'getMatchData',
    {
        league: 'bl1',
        season: '2024',
        datefrom: '2024-09-01T00:00',
        datetill: '2024-09-10T00:00',
    },
    function (matches) {
        console.log(matches);
    },
);
```

## 待办事项
- 如果用户未选择正确的数据点，则在小部件中进行验证
翻译
- ~~新增透视表和目标获取器组件的文档~~
- ~~扩展表格模式，包含第一轮、第二轮~~
- ~~新的游戏记录透视表组件~~
- ~~新增带有排序功能的组件目标获取排名~~
- ~~扩展表格，添加趋势符号（向上/向下箭头，箭头表示不变）~~
- ~~扩展表格以计算最近 x 场比赛的结果~~
- ~~扩展表格以计算指定比赛日的排名~~
- ~~文档适配器/小部件~~
修复俱乐部列动态化的问题
- ~~新组件：俱乐部接下来的 x 场比赛~~
- ~~小部件游戏日设置，用于开始游戏日并设置长度（-1,3 = 显示上一个游戏日）

比赛日及之后的3个比赛日）~~

- ~~如果绑定了 showgameday，则此值为编辑模式的替代值~~
- ~~重点推荐俱乐部~~
- ~~游戏日小部件中的可控游戏日~~

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
   ### **WORK IN PROGRESS**
-->
### 1.9.3 (2026-03-29)

- translate widgets
- translate readme
- move widgetscript to dist folder
- remove unused scripts
- release
- fix workflow

### 1.9.1 (2025-08-26)

- test remove node 18,extend to node 24
- fix calcCurrentGameDay if games array is empty

### 1.9.0 (2025-08-04)

- revert to node 18
- move to axios
- use ioUtils
- move to class
- improve currgameday calc if the season didnt start

### 1.8.1 (2025-01-23)

- adjust breakpoints in jsonConfig as a workaround for the new table/card-elements

### 1.8.0 (2024-10-27)

- move widget documentation from html file to readme
- adjust and prove responsive design for jsonconfig
- implement individual color settings for highlite and filters for each widget

### 1.7.0 (2024-09-16)

- fix quotes

### 1.6.0 (2024-09-16)

- reimplement checkTodayFavorite

### 1.5.0 (2024-09-15)

- Addition of a CSS example for the Pivot Table widget
- add `sendTo` command to getMatchData
- remove deprecated widgets
- addition widget option "only logo" to supress the teamname

### 1.4.11 (2024-08-09)

- fix issues from adapter checker

### 1.4.10 (2024-08-02)

- switch to eslint 9
- adjust markdownlint settings to be compatible with prettier

### 1.4.9 (2024-06-13)

- fix if no game exist for team1/team2
- somme prettier changes
- launch config for vscode

### 1.4.8 (2024-06-06)

- release

### 1.4.7 (2024-06-04)

- update dependencies

### 1.4.6 (2024-06-01)

- fix yml structure

### 1.4.5 (2024-06-01)

- fix yml structure

### 1.4.4 (2024-06-01)

- Enable NPM Publish
- Enable dependabot
- fix checks from adapter checker

### 1.4.3 (2024-06-01)

- remove files from eslint check

### 1.4.2 (2024-06-01)

- fix double qoutes
- remove files from eslint check

### 1.4.1 (2024-06-01)

- update package and io-broker files
- fix problems with vis2
- remove vis as a

### 1.2.4

- fix problems reported by adapter-checker

### 1.2.3

- add connectiontype and datasource to io-package.json

### 1.2.2

- fix result calculation

### 1.2.1

- fix object type

### 1.2.0

- fix display of goals if goals are without minutes and playername saved by openligadb

- fixed that sometimed request of states failed

### 1.1.0

- prepare v1.1.0

### 1.0.3

- change setstate/createobject logic

### 1.0.2

- remove deprecated widgets / change widget beta flag

- improve debug messages

### 1.0.1

- improve error message for requests

### 1.0.0

- prepare for stable repository

### 0.11.5

- pivottable: show only results for selected gameday
- table3: icon attributes, add image selection dialog
- table3: add an extra attribute for mode to use with binding
- all widgets: update documentation

### 0.11.4

- fixed build/test problem

### 0.11.3

- pivottable: fix problem with rank number

### 0.11.2

- pivottable: fix problem with sort and highlightontop
- fix problem with goalgetters

### 0.11.1

- change some template settings, goalgetter table get headers,
  add object change sensing
- widget goalgetters: add parameter highlight and showonlyhighlight
- widget pivottable: add sort option and choice to place favorite teams on top
- remove year from date for several widgets

### 0.11.0

- extend table to calculate with x last games and extend table to calculate
  ranking for a defined gameday, to ensure backward compatibility i have to
  create a new table v3 widget
- extend table with trend sign (arrow up/down, point for no change)
- new widget goal getter ranking with sort function
- new widget pivot table of played games
- extend table modes with 1st round,2nd round

### 0.10.3

- change computing and output logic of gameday widget to mark gameday
  header with favorite class
- improve documentation with css-klasses for table widget
- bugfix for calculate gameday.

### 0.10.2

- Add data column goaldiff to table widget, improve more documentation
  (systax highlighting,copy code function), add example to
  control gameday with buttons,

### 0.10.1

- Improve documentation with more recipes and syntax highlighting,
  improve code to get and subscribe states

### 0.10.0

- New widget Table 2 that includes the calculation of the total, home and
  away results. the previous widget is now deprecated, due to the
  different datapoint (allmatches) to be selected.

### 0.9.3

- Remove ES6 features due to compatibility with older browsers

### 0.9.2

- next try to fix the experimental javascript binding function

### 0.9.1

- fix bugs in calculation matchresults and highlight clubs in favgames

### 0.9.0

- new Function for vis Binding to search for games at the actual day for
  favorite clubs, css-classes für games at actual day, fix bug to show
  the right match results,

### 0.8.0

- push version for latest repository. fix some typos. fix a problem with
  date handling on different OS

### 0.0.11

- widget gameday: fix issue with not working gamedaycount

### 0.0.10

- widget gameday: optional you can show informations about the goalgetters

### 0.0.9

- optional weekday for widgets: gameday and gamesoffavclub,highlight the
  clubname in gamesoffavclub

### 0.0.8

- new widget games of favorite clubs with multi league support as
  replacement for the old one

### 0.0.7

- close connections and remove observers (timeouts/intervals)

### 0.0.6

- NPM deployment and preperation for the latest repository

### 0.0.5

- highlight favorite club,
- Replacement value for edit mode if showgameday is set with binding,
- widget gameday setting for start gameday an length (-1,3 = show previous
  gameday and 3 gamedays after that)
- some documentation
- remove unused code
- new widget: next x games of club
- fix issue for dynamic with of club column

### 0.0.4

- fixed more oids in vis runtime

### 0.0.3

- fixed getting oids in vis runtime

### 0.0.2

- add controlable gameday logic to gameday widget and adapter

### 0.0.1

- initial release

## License

MIT License

Copyright (c) 2025-2026 oweitman

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.