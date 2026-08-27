---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vis2-materialdesign/README.md
title: ioBroker.vis2-materialdesign
hash: iEZdpEiPEaYgXsqj+X3nHoeeOCXoYcq5Gg1CcHR9ZpU=
---
![标识](../../../en/adapterref/iobroker.vis2-materialdesign/admin/vis-materialdesign.png) <!-- 目录中省略 -->

![稳定版](https://img.shields.io/badge/stable%20version-%E2%80%91%E2%80%91%E2%80%91-lightgrey)
![NPM 版本](http://img.shields.io/npm/v/iobroker.vis2-materialdesign.svg)
![下载](https://img.shields.io/npm/dm/iobroker.vis2-materialdesign.svg)
![NPM](https://nodei.co/npm/iobroker.vis2-materialdesign.png?downloads=true)

# IoBroker.vis2-materialdesign
[![测试](https://github.com/typhosj/ioBroker.vis2-materialdesign/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/typhosj/ioBroker.vis2-materialdesign/actions/workflows/test-and-release.yml)

<!-- 省略目录中的内容 -->

## IoBroker VIS 2 的 Material Design 小部件
此适配器由 typhosj 维护。这些组件基于 Scrounger 的 VIS Material Design 原始组件作品。

**文档：** [Deutsch](https://github.com/typhosj/ioBroker.vis2-materialdesign/blob/master/doc/de/README.md) · [English](https://github.com/typhosj/ioBroker.vis2-materialdesign/blob/master/doc/en/README.md)

## 设计状态
现有组件目前仍保留其 Material Design 2 时代的外观、组件 ID 和设置。我们计划推出 Material Design 3 的可选升级方案，该方案不会对现有的 VIS 2 项目进行任何更改。

＃＃ 要求
- ioBroker 管理后台版本 7.6.20 或更高版本
- Node.js 22 或更高版本
- 已安装 VIS 2 适配器
- 当前使用的基于 Chium 内核的浏览器或 Firefox（目标环境）

振动反馈取决于浏览器和设备。请参阅[浏览器兼容性表](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/vibrate#browser_compatibility)。

＃＃ 安装
从 ioBroker 管理适配器列表中安装 **Material Design Widgets** (`vis2-materialdesign`)。无需单独的适配器流程即可交付小部件。

快速入门
1. 打开 VIS 2 编辑器和一个项目。
2. 打开 **Material Design** 小部件集。
3. 将一个控件拖入视图中并选中它。
4. 在**WIDGET**选项卡中配置其对象 ID 和行为。
5. 保存项目并在运行时模式下测试视图。

主题的使用是可选的。您可以在适配器的**主题编辑器**中配置颜色和字体，保存后，对选定的组件使用**主题 → 使用主题**。这会将匹配的主题引用复制到该组件中；之后仍然可以更改组件的显式设置。

## 文档
- [德语用户指南](https://github.com/typhosj/ioBroker.vis2-materialdesign/blob/master/doc/de/README.md)
- [英文用户指南](https://github.com/typhosj/ioBroker.vis2-materialdesign/blob/master/doc/en/README.md)
- [德语组件目录](https://github.com/typhosj/ioBroker.vis2-materialdesign/blob/master/doc/de/widgets/README.md)
- [英文组件目录](https://github.com/typhosj/ioBroker.vis2-materialdesign/blob/master/doc/en/widgets/README.md)

＃＃ 支持
报告当前 VIS 2 问题，见 [GitHub 问题跟踪器](https://github.com/typhosj/ioBroker.vis2-materialdesign/issues)。

## Changelog
### 0.4.0 (2026-08-25)

- (typhosj) Added automatic filling of the widget fields from the metadata of the datapoint you pick (issue #15): name, unit, min/max/step, decimals, the states, the icon and the room/function of the object reach the fields that carry them, in Value, Slider, Round Slider, Progress, Progress Circular, Switch, Checkbox, Button State, Button Toggle, Select, Autocomplete, Input, List, Icon List and Table. A value you typed is never overwritten, not even when it happens to equal the default, and a field you cleared stays empty — the new **refill fields from the object** button in the same section does it anyway and names beforehand what it would overwrite. A list row also gets its right-hand column as a binding to the state, the Select builds its menu entries from the states, the Table takes its columns from the JSON it reads, and the sliders pick up a WORKING datapoint sitting next to the level. A binding you set counts as your own value, because the binding dialog leaves no other trace; an icon the object only resolves inside its own adapter folder is dropped in favour of what its role says, so no widget shows a broken image; and a menu built from the states clears the entries above its new count, which the button names before it does it
- (typhosj) Fixed the "padding bottom" of the List and Icon List header having no effect in any setting: the header row had a fixed height, so the bottom padding hung below its content box and the header container clipped it away. The height is a minimum now and all four paddings take part - more padding at the bottom lifts the header text, which is what an alignment "bottom" would have done. Its default drops from 20 to 0, because those 20 px were never drawn
- (typhosj) Fixed the calendar month grid showing the view background through its day cells: the days and the weekday header were left transparent, so on a view with a dark background or a background image the grid looked empty and the day numbers were unreadable. Both now paint the widget's own surface, and the month view's weekday names follow the dark theme like the week and day views already did. An explicitly set day, header or label color still wins
- (typhosj) Fixed all four charts being thrown away and rebuilt on every incoming value: their data and options are built fresh on each render, and the chart canvas read that as a new chart. The entry animation restarted, an open tooltip closed and the canvas flickered whenever a datapoint changed. The existing chart is updated in place now, and only a changed chart type builds a new one
- (typhosj) Fixed the Line History chart's "refresh method" being able to add refreshes but never to restrict them: the live values of every data series counted towards the refresh no matter what was selected, so "time interval" queried the history adapter on every incoming value instead of on its interval, and "by object" never waited for its trigger datapoint at all. The values now count only under "realtime" and the trigger only under "by object"
- (typhosj) Fixed two widgets on the same view fighting over the theme colors: the theme's CSS variables were written page-wide, so whichever widget rendered last decided the colors for every other one. Visible as soon as two widgets resolved the dark setting differently — one of them dragged the whole view along. Each widget now carries its own set
- (typhosj) Fixed the adapter configuration freezing for tens of seconds when saving: the several hundred theme states were written one round trip after another. They go out in batches now, which matters most when the admin is open over a slow connection
- (typhosj) Fixed "generate global script" replacing an existing script without a word: the script object was overwritten whole, so anything edited in the script editor was gone, and writing it enabled restarts the JavaScript instance. It asks before doing either now and keeps the script's enabled state instead of switching it back on
- (typhosj) Hardened the sanitizer for HTML coming from a state against SVG animation elements: `<animate>`, `<set>` and `<animateTransform>` rewrite another element's attribute while it is already on the page, so a `javascript:` URL smuggled in through one of them never passed the URL check. They are dropped now, like the other active-content elements

### 0.3.5 (2026-08-20)

- (typhosj) Fixed the Bar Chart rendering nothing at all, and the Pie Chart tooltip and the Value widget throwing, when a decimals field was given a minimum above its maximum — which is what filling in "min decimals" and leaving "max decimals" empty adds up to. The maximum is lifted to the minimum now instead of breaking the widget
- (typhosj) Fixed HTML from a state being able to carry a `<style>` block: its rules are page-wide, so one state value could hide a whole VIS view or lay an invisible layer over it, and the text inside such a block is re-parsed on the way back out, which turns an inert `<img onerror>` into a live one
- (typhosj) Fixed every number option of the **Calendar** falling back to 0 instead of its declared default once the field was emptied in the editor: the day axis collapsed from 24 hours to one, rows dropped to the 12 px floor and the click sound went silent. The same three coercions are shared by all fourteen widgets that had drifting copies of them now
- (typhosj) Fixed the "min screen resolution" of the **Alerts** hiding every alerts widget on the page instead of the one it was set on, so two of them with different breakpoints hid each other
- (typhosj) Fixed the **Alerts** never announcing anything to a screen reader — the widget whose whole job is showing messages had no live region — and replaced the hard-coded English labels that input, select, table, top app bar, card, icon list and list read out
- (typhosj) Added the **animation duration** to the **Line History Chart**, the shared chart setting the other three offered while this one was stuck at 1000 ms, and gave its time axis the label font its own y axis already took. Added the eleven tooltip options to the **JSON Chart** that the other charts have offered all along
- (typhosj) Fixed the theme colour of the **Icon** widget reaching no widget at all: it was filed under "Material Design Icon", a name the widget does not use
- (typhosj) Fixed 37 attribute labels printing their raw key in the editor (`refreshOnWakeUp`, `state_oid`, `header_height`, `topAppBarZ_index` and the rest), across the HTML card, all four charts, both dialogs, the icon list, the list, the top app bar, the alerts, the autocomplete and the view-in-widget pair. The object-id section of the **Button State Multi**, **Button State Multi vertical** and **Icon Button State Multi** showed `group.buttonOids` for the same reason, as did the two view-in-widget group headers
- (typhosj) Fixed the Icon List's "sub label font color selected" dark-mode colour being stored under the light-mode object id: the dark value overwrote the light one and the dark state was never created. Pick that one colour once more if you had set it
- (typhosj) Fixed the editor's **use theme** button writing into options that do not exist, where it silently did nothing: a **Pie Chart** carried x/y axis colours and fonts although a pie has no axes, the **JSON Chart** axis and value fonts it never draws, the linear **Slider** the round slider's background colour, the **List** a switch hover colour it does not offer, and the drawer header a text size it has no field for. The 53 `AdapterStatus` entries went with them — that was a VIS 1 JavaScript, never a widget of this adapter
- (typhosj) Fixed `listTypeButtonNav` staying English in eight languages and naming the wrong widget in Chinese, and `listTypeButtonLink` spelling URL as "Url" everywhere
- (typhosj) Fixed the third option of every **alignment** dropdown reading "rechts" in all eleven languages, including English, French and Spanish. `flex-start` had its own slips — Russian read "оставил" (left behind, the verb) and Chinese "剩下" (what remains) — and `extraAttr` and `htmlText` showed their raw key names
- (typhosj) Fixed the charts writing the Material Design blue into `Chart.defaults.global`, a mutation that reached every chart.js instance on the page, this adapter's or not; each axis carries the colour itself now. The dark-theme state is re-subscribed when its object id is changed in the editor, instead of taking effect only after a page reload. `vibrateOnMobilDevices` vibrates in the nine widgets whose editor showed a default of 50 while the code fell back to 0. The **Calendar** only runs its minute clock where the "now" line is actually drawn, instead of re-rendering every calendar every minute
- (typhosj) Removed the editor sections that opened onto nothing: icon buttons carry no label, so their label group was empty, and the Installed Version's common group had lost its only field
- (typhosj) Changed the sliders to stop flooding the bus while dragging: every pointer move used to write a state, so one drag produced hundreds of writes and a Zigbee lamp ended up seconds behind the finger. The first move still goes out at once, the rest is limited to one write per 200 ms, and the release always writes the value the finger stopped on. The new **send value on release** goes further and writes nothing at all until the pointer comes up. Affects Slider, Round Slider and Icon Button Slider
- (typhosj) Fixed the last settings that did nothing: the chart card title size and the JSON chart's bar width; the **Top App Bar** drawer's vibration, hover colours and sub-list background; the **List**'s scroll-to-top on change, selected-row colour and switch hover colour; the **Input**'s hover background and its hint that waits for focus like Select's; the **Progress** strip distance; the **Card**'s title-section background; the **Alerts** close-icon press colour; the **Dialog**'s close-button size and its pressed colour, which now also works in the windowed dialog; and the **Icon Button Slider**'s colorize and colorize factor
- (typhosj) Added a legend to the **Bar Chart**, which declared the whole legend group and drew none, and put Pie, JSON and Bar on one legend implementation — so the JSON chart's legend learned the point style the other two already had
- (typhosj) Added the change effect and "hidden on load" to the **Value** widget: the value flashes in its effect colour and size for the configured duration whenever it changes (not when the first state arrives, so a dashboard does not light up on load), and the widget can stay invisible until its state is there, holding its box so the layout does not jump
- (typhosj) Fixed the per-view **min/max width** of the Grid and Masonry views doing nothing: a view is hidden outside the widget width it names, and an empty bound means no bound on that side. Masonry's **alignment** reaches its columns as well now — it was the only alignment setting the widget has, and it was read under two field names Masonry never declared
- (typhosj) Moved **input type** from Select, which has no text entry for it to act on, to Autocomplete, where it reaches the filter input: date and time give the browser's own picker
- (typhosj) Added the sixteen **Select** and **Autocomplete** fields that were decoration: the hint text with its font, size and colour (shown only while the list is open unless "always show" is set), an entry counter, the hover and selected background and border colours, the label offset, and auto-focus (which stays off in the editor)
- (typhosj) Fixed the **values** group of the Bar, Pie and Line History charts being decoration: the datalabels plugin was loaded but never configured, so Bar and Pie drew the raw number in the plugin's own style and Line History drew nothing. Font, colour, box, placement, rotation and the "every n-th value" step all apply now. The Line History default moves to **off** — a history line carries hundreds of points and a label on each is a wall of text — while Bar and Pie keep theirs on
- (typhosj) Added the ten **Bar Chart** axis settings that the editor offered and nothing read: bar width, the automatic label skip, the x-axis label rotation, offset and grid-line offset, and on the value axis the step size, the minimum and maximum digits, the tick limit and the appended unit
- (typhosj) Fixed the **chart padding** doing nothing in all four charts and the tooltip box geometry doing nothing in Bar and Pie: arrow size, distance, corner radius, padding, title margin and the colour box reach chart.js now. The Bar tooltip applies its own decimals setting, both Bar and Pie append the configured tooltip text, and "disable hover effects", the hover colour and the hover border reach the chart
- (typhosj) Removed 63 editor settings that no widget read, so nobody has to wonder why they have no effect: `debug` (declared for 45 widgets, read for one console line), the Bar Chart's bar label text, its tick source and its zero-line width and colour, the Top App Bar's backdrop item layout with its two background heights and its six colours, its permission selector with the disabled-entry fonts and colours, the Grid and Masonry resolution assistant, and the Select and Autocomplete ripple colour, which this port has no ripple for. Values already saved for them stay in the project and are simply ignored
- (typhosj) Closed the nineteen npm audit advisories in the build's transitive dev dependencies (brace-expansion, serialize-javascript, diff, uuid, nanoid, js-yaml, undici, postcss, adm-zip and the vite 7 line). The adapter declares no runtime dependencies and ships only its built bundles, which came out byte-identical after the change
- (typhosj) Fixed the close-icon field of the **Dialog** being the last one on VIS 2's own icon picker, which loads its value as an image and answered the default `close` with a 404 in the editor. It uses the widget set's own icon and file picker now, like every other icon field
- (typhosj) Fixed the **Masonry Views** collapsing its columns to thin lines: the **alignment** option carries text-align values and was written as `justify-items`, which shrinks every grid column to the width of its content. It aligns the content of a column again and the columns fill the widget as before
- (typhosj) Changed `vis2-materialdesign.0.colors.darkTheme` from a switch into a three-way setting: `auto` follows VIS 2's own theme, `light` and `dark` force one. The widget set used to know only a boolean of its own that nothing in VIS 2 ever moved, so a light view could show dark widgets. Stored `true`/`false` values and every script writing them keep working; `auto` is the default for new installations
- (typhosj) Fixed the header of the **List** and the **Icon List** being a card: it carried the card class, whose column layout put the header image above the heading instead of beside it and turned the header **alignment** into a vertical one, so left, center and right moved the header up, to the middle and down. Its rounded frame and shadow were drawn around the header too and VIS 2 cut them off at both sides (issue #14)
- (typhosj) Removed the **List** option "enable overflow": a row grows with its content in VIS 2, so there was nothing left for the option to release (issue #14)
- (typhosj) Fixed the **List** and **Icon List** drawing their rows one header height taller than the widget box: the list, the card and the card's text section each measured themselves against the whole widget, so with a header the lower rows ended up outside the widget and VIS 2 clipped them away. Header and content now share the box
- (typhosj) Fixed the **alignment** of the Icon List header doing nothing: the header row is a flex row, which ignores `text-align`, so `center` and `flex-end` stayed on the left (the List header got the same fix)
- (typhosj) Fixed an appointment over midnight being drawn at its start time on every day it touches in the week and day view of the **Calendar**: a 23:00–01:00 appointment showed at 23:00 on both days. Each day now gets the part of the appointment that falls into it — the first day to midnight, the next one from midnight — and a day that only carries a part outside the configured time axis shows nothing
- (typhosj) Fixed the week and day view of the **Calendar** snapping every appointment to the interval lines: an appointment was pulled back to the line above it and stretched to full intervals, so 08:30 started on the 08:00 line and 15 minutes filled the hour. It is now placed and sized by the minute, like VIS 1; only an appointment without an end still gets one interval. Overlapping is measured in minutes too, so two appointments that merely share an hour no longer split the column
- (typhosj) Fixed the **Top App Bar** still swallowing clicks meant for the widgets below it. Its own box already passed them through, but VIS 2's frame around the widget stays a click target of its own and ate them as soon as the app bar was stacked above a view (view in widget, or a neighbour with a lower z-index). Only the bar, the drawer and its scrim take clicks now; in the editor the widget stays selectable
- (typhosj) Fixed the **List** divider styles `padded` and `inset` and the layouts `card` and `cardOutlined` looking exactly like `standard`: all four only set class names whose geometry came from a stylesheet VIS 2 does not load. The dividers carry their insets again, and both card layouts their card geometry — inset far enough that VIS 2's clipping no longer eats the elevation shadow (issue #14)
- (typhosj) Fixed the **List** fonts for the right and the second right text never reaching the text, and the row header font sharing its setting with the widget header, so one field restyled both. Row headers now have their own font (**listItemHeaderFont**) — a row header font that was set through the font group before has to be picked once more — and the left-hand font labels say which text they belong to. **listBackground** wrote a CSS variable no rule read and paints the widget again (issue #14)
- (typhosj) Added three layout options to the **List**: the header image can sit right of the heading with its own distance, the header alignment now moves the header (the flex row ignored `text-align`), and the switch/checkbox can be placed after the right text with a configurable gap (issue #14)
- (typhosj) Fixed the **Calendar** settings that existed in the editor but were never read: click sound and vibration now fire on the control buttons and the day numbers, the "selected / hover" colors of day numbers and control buttons are applied, and the control layouts `raised` and `unelevated` render as filled buttons, `raised` with its elevation (issue #13)
- (typhosj) Fixed a day number of the **Calendar** opening the target view on the date the view was left on instead of the day that was clicked, and a month step from the 31st skipping a month (issue #13)
- (typhosj) Fixed overlapping appointments of the **Calendar** covering each other in the week and day view: the option **overlap mode** now does what it says — `column` splits the width between them, `stack` offsets them — and the day view shows the calendar week in the corner above the time axis like the week view (issue #13)
- (typhosj) Added direct support for the **ical adapter** to the Calendar: a state like `ical.0.data.table` can be used as it is. The widget reads the adapter's own field names (`event`, `_date`, `_end`, `_allDay`, `_calColor`) next to the documented start/end/name format, and converts its UTC timestamps to local time so an appointment no longer lands on the wrong hour or day (reported in the forum)
- (typhosj) Added a line on the current time to the week and day view of the Calendar, moved on every minute. It can be switched off and colored in the time-axis group (reported in the forum)
- (typhosj) Added the calendar week to the week view of the Calendar, above the time axis, following the existing "show calendar week" option (reported in the forum)
- (typhosj) Fixed all-day and multi-day appointments of the **Calendar** covering one day too many: an all-day end is exclusive, and the ical adapter writes it as midnight of the following day, which the widget still counted as a day of its own. An end at midnight now ends the appointment on the previous day, whether it is written as a date or as a timestamp (reported in the forum)
- (typhosj) Fixed the month view of the **Calendar** dropping the start time of an appointment that has one; it shows the time in front of the name again, like VIS 1 (reported in the forum)
- (typhosj) Fixed the Calendar option **font color for past days** doing nothing: past days are dimmed with it again, in the month grid and in the day header of the week and day view (reported in the forum)

### 0.3.4 (2026-08-16)

- (typhosj) Fixed the **Min/Max** limit of the Addition buttons: a single bound was always read as the minimum, so a maximum like `50` lifted the state up to 50 on the first press and then counted on without any limit. A single bound is now the end the step runs into — a step up stops at a maximum, a step down at a minimum — while `0;100` keeps bounding both ends. An empty field, and an empty half in `50;`, also stopped acting as a bound of 0, so a button without a limit can count into negative values again (issue #12)
- (typhosj) Fixed every **active** option of the Navigation buttons doing nothing: the variant reads no object, so "active" was always false and label true, active label color, active background, active image and active image color never showed. Active now means the target view is the one on screen, which is what highlights the current page in a navigation bar (issue #11)
- (typhosj) Fixed the button styles `raised` and `unelevated` looking identical: no shadow was drawn at all, and the shadow is the whole difference between them. `raised` now carries the Material elevation and gives up 4 px of its box for it, because VIS 2 clips a widget at its edge — the opening button of the Dialog widgets got the same room, its shadow was drawn but clipped away (issue #11)
- (typhosj) Fixed the chart area background, the card's section background and every tooltip option except "show tooltip" being editor fields the four chart widgets never read: mode, position, colors and fonts now reach chart.js, the Line History tooltip formats its value with the configured decimals and unit, and its points take the line color instead of the translucent fill (issue #10)
- (typhosj) Fixed the fade of the Advanced View widgets never running — the jQuery easing name went straight into CSS and the views were switched through `display`, which cannot animate — and made the `persistent`, `notIfInvisible` and `debug` options of the `8` variant do what they say. The dropped `slowConnection` option only delayed a VIS 1 network path that VIS 2 does not have (issue #9)
- (typhosj) Fixed multi-color SVG icons being flattened to one blue in the Icon List and List widgets: the default item color was applied before the "did the user pick a color?" check, so every SVG was masked. An SVG keeps its own colors now unless a color is chosen explicitly (issue #8)
- (typhosj) Fixed the push button writing its off value on a release the button never saw the press for: a view loading under the pointer, a widget taking focus while a key is down, or a hover followed by a mouse-leave wrote the state with nobody touching the button
- (typhosj) Fixed the Theme Editor's config dialog closing before the runtime state sync finished, which could leave the object tree half migrated; the dialog now waits for the sync to complete before closing, and shows a toast when it finishes without closing
- (typhosj) Fixed the Top App Bar swallowing every click in the empty part of its widget box: the box has to be as tall as the drawer it opens, and the transparent area below the bar blocked the widgets underneath. Only the bar, the drawer and its scrim take clicks now
- (typhosj) Fixed the drawer of the Top App Bar and the Dialog overlay staying behind other widgets whose CSS-general **z-index** was set: their own z-index option could only sort them inside the widget itself. Both now lift the widget while the drawer or the dialog is open
- (typhosj) Fixed the **button style** of the Dialog and Dialog iFrame widgets doing nothing: the opening button was always drawn filled, so `text`, `outlined` and `icon` looked exactly like `raised`. The flat styles now drop the fill and carry the primary color in border and label, `raised` gets its shadow back, and `icon` is round (issue #6)
- (typhosj) Fixed the `text` and `outlined` styles of the button widgets painting their label in the on-primary color (white by default) on a transparent background, which left it invisible; label and border now use the button color
- (typhosj) Fixed every repeating editor group not letting a single entry be added: VIS 2 puts the add, clone and delete buttons on the last of these groups, and all of them hid exactly that one — while typing a number into the matching count field does not rebuild the groups either. That group now shows as an add bar carrying only the buttons and a line naming it, so the count keeps meaning the number of entries. Affected the menu entries of Select, Autocomplete and Top App Bar, the data sets of all four charts, the columns of the Table, the views of Advanced View, Advanced View in Widget and Responsive Layout, and the object list of the multi-state buttons (issue #7)
- (typhosj) Fixed the **+** button of the List and Icon List rows adding a row the runtime never drew: the button counted up a second, hidden index while the widget kept reading "count of list items". Both now use one number, and the hidden index is gone (rows added past the count through that button have to be added once more)
- (typhosj) Fixed the Select and Autocomplete widgets dropping every menu entry that was given a label but no value — which is what the editor stores for a freshly added entry. Such an entry now uses its label as the value written to the object (issue #7)
- (typhosj) Fixed the Select and Autocomplete data method "states of the object" never showing a single entry: the widget read the states from an object cache that VIS 2 does not hand to widgets, so it always saw nothing (issue #7)
- (typhosj) Changed every **count** option to mean what it says: 3 now gives three entries. VIS 1 stored the last index there, so 3 produced four — this affects the data sets of the Bar, Pie and Line History charts, the menu entries of the Top App Bar, the table columns, the select and autocomplete values, the object ids of the multi-state buttons, and the views of Advanced View in Widget and of the responsive layouts. Check the value once when you rebuild such a widget from a VIS 1 project, otherwise its last entry disappears
- (typhosj) Fixed the Select and Autocomplete widgets offering only the first list entry in the editor: the item group carried the fields of entry 0 instead of repeating per entry, so a "number of select values" above 1 had nowhere to be filled in
- (typhosj) Fixed the per-data-set options of the Bar, Pie and Line History charts being editable only for the first data set: bar color, label, value text, tooltip text — and the per-series line and y-axis settings of the Line History chart — appeared once instead of once per data set, so a chart with several data sets could not be styled per series like in VIS 1. Each data set now has one group holding its object id and all of its options; existing charts keep every saved value (reported in the forum)
- (typhosj) Fixed the icon picker showing only the first 400 of the 6809 icons with no way to reach the rest — the grid ends there and neither scrolling nor paging went further, so an icon whose name you did not know was unreachable. The grid now keeps loading while you scroll (issue #4)
- (typhosj) Documented how the Top App Bar switches views — it writes the selected menu index into its object id, and an [Advanced View in Widget 8](doc/en/widgets/html-widgets.md) with the same object id shows the matching view (reported in the forum)

### 0.3.3 (2026-07-24)

- (typhosj) Fixed the Theme Editor's runtime state sync: it never created the intermediate channel objects for nested color/font states, used the "value" role (number-only) for string values, and could leave font-size states with a stale string/number type mismatch
- (typhosj) Removed the "mocha" devDependency; it is already provided by `@iobroker/testing`

### 0.3.2 (2026-07-24)

- (typhosj) Fixed the "npm run test:package" CI check to run the standard `@iobroker/testing` package-file validation again (it was shadowed by a project-specific script of the same name)
- (typhosj) Removed the unused `axios` devDependency

[Older changelog entries](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 typhosj <typhosj@gmx.de>  
Copyright (c) 2021 Scrounger <scrounger@gmx.net>

The widgets are based on the original VIS Material Design widget work by
Scrounger <scrounger@gmx.net>.

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