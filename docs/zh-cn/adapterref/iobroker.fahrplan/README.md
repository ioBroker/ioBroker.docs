---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.fahrplan/README.md
title: ioBroker.fahrplan
hash: kTK6yHU2pWIjDYV9j1ZE4GdWcFpfNoNcfgBXZsuoeM8=
---
![标识](../../../en/adapterref/iobroker.fahrplan/admin/fahrplan.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.fahrplan.svg)
![下载](https://img.shields.io/npm/dm/iobroker.fahrplan.svg)
![安装数量（最新）](https://iobroker.live/badges/fahrplan-installed.svg)
![安装数量（稳定）](https://iobroker.live/badges/fahrplan-stable.svg)
![依赖状态](https://img.shields.io/david/gaudes/iobroker.fahrplan.svg)
![新产品管理](https://nodei.co/npm/iobroker.fahrplan.png?downloads=true)

# IoBroker.fahrplan
![测试和发布](https://github.com/gaudes/ioBroker.fahrplan/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/fahrplan/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

## Fahrplan Adapter für ioBroker
### 德语
Dieser Adapter für ioBroker verwendet die mobile API von HAFAS verwendet。 HAFAS steht für HaCon Fahrplan-Auskunfts-System und wird von vielen europäischen Verkehrsunternehmen verwendet, unter anderem auch von der Deutschen Bahn。
Der Zugriff auf HAFAS erfolgt hierbei über [HAFAS-客户端](https://github.com/public-transport/hafas-client).

Der Adapter bietet hierbei drei Funktionen：

#### Fahrplan für Verbindungen (Routen)
Die gewünschten Routen müssen in der Adapterkonfiguration eingerichtet und aktiviert werden。
über einen konfigurierbaren Intervall ruft der Adapter dann regelmäßig die Verbindungsinformationen ab。
Die nächsten drei Verbindungen werden als HTML 和 optional auch detailiert als Objekte in ioBroker dargestellt。
Das HTML-Objekt kann einfach in VIS eingebunden werden。

#### Benachrichtigung bei Verspätungen der Routen
Für die konfigurierten Routen kann ein Verspätungsalarm aktiviert werden。所以 kann beispielsweise eine Benachrichtigung 通过 Telegram oder Alexa erfolgen，fall alle oder eine bestimmte Verbindung verspätet ist。

#### Abfahrtstafeln für Stationen
Zusätzlich bietet der Adapter eine Abfahrtstafel für konfigurierte Stationen。
Hierbei werden die nächsten drei Abfahrten einer Station abgerufen und als Objekte und HTML dargestellt。

** Dieser Adapter verwendet die Sentry Bibliotheken um automatisch Abstürze und Programmfehler an die Entwickler zu übermitteln.** Weitere Details und für Informationen zur Deaktivierung der Fehlerberichterstattung in der§§LLL_0 Sentry Reporting wird ab JS-Controller 3.0 verwendet。

＃＃＃ 英语
这个ioBroker 适配器使用HAFAS 的移动API。 HAFAS 是一种公共交通管理系统，供欧洲的公共交通供应商使用，例如德国铁路。
[HAFAS-客户端](https://github.com/public-transport/hafas-client) 用于访问 HAFAS。

适配器提供三个功能：

#### 连接（路线）时间表
必须在适配器配置中配置和启用所需的路由。
适配器按配置的时间间隔自动检索连接信息。
接下来的三个连接在 ioBroker 中保存为 HTML 和可选的详细对象。
HTML 对象可以很容易地在 VIS 中使用。

#### 路线延误通知
可以为配置的路由激活延迟通知。例如，当所有或一个特定连接延迟时，Telegram 或 Alexa 可能会发出通知。

####车站发车时刻表
此外，适配器还提供了配置站点的出发时间表。
在这里，接下来的三个连接被恢复并创建为对象和 HTML。

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅 [Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!从 js-controller 3.0 开始使用哨兵报告。

## 配置
### 德语
Die Start- und Zielorte sowie Zwischenziele müssen mit ihrer numerischen ID angegeben werden。
Einesuchfunktion ist im Tab Einstellungen integriert。

#### 标签 Einstellungen
![](../../../en/adapterref/iobroker.fahrplan/docs/de/img/settings.png)

|安装 | Beschreibung |---------------------------------|--- |安比特 | Auswahl des zu verwendenden Anbieters, aktuell DB und ÖBB | Aktualisierungsintervall | Intervall in dem die Route aktualisiert werden, Angabe in Minuten | Verspätet markieren ab | Verspätung in Minuten ab der die Verbindung als verspätet markiert wird。 Standardmäßig werden nur Verspätungen ab zwei Minuten markiert | Farbe für Pünktlich | Farbwert für bestätigte Pünktlichkeit | Farbe für Verspätungen | Farbwert für Verspätungen | Überschriftenerstellung | HTML-Tabellen werden mit Überschriften erzeugt | HTML-Ansicht erzeugen für 路线 | Erzeugt pro Route eine konfigurierbare HTML-Tabelle in einem Objekt | HTML-Ansicht erzeugen pro Verbindung | Erzeugt pro einzelner Verbindung eine HTML-Tabelle in einem Objekt |详细信息对象说明| Konfiguration der auszugebenden Objekte | JSON-Elemente Speichern | Die Rückgabe von HAFAS erfolgt als JSON,diese sollten zur Fehlerbehebung gespeichert werden

Auf der rechten Seite ist diesuchfunktion integriert。 Zuerst muss ein Anbieter ausgewählt werden。
Danach kann über dassuchfeld und Drücken des Knopfs "Suche" nach einer Station gesucht werden。
Die Suchergebnisse der aktuellen Suche werden in der Tabelle angezeigt。

#### 标签路由
![](../../../en/adapterref/iobroker.fahrplan/docs/de/img/settings_routes.png)

Mit dem +-Button können neue Einträge zur Tabelle hinzugefügt werden。

|安装 | Beschreibung |-----------------------------|--- |编号 | Die Nummer entspricht dem Unterknoten in den Objekten und wird automatischvergeben。
|活动 | Wenn die Route aktiviert ist werden die Verbindungsinfos aktualisiert |冯| Numerische ID von Startbahnhof oder Starthaltestelle (Ermittlung über Suche) |冯（特征名称）| Benutzerdefinierter Name von Startbahnhof oder Starthaltestelle, für HTML- 和 Verspätungstext verwendet |纳赫 | Numerische ID von Zielbahnhof oder Zielhaltestelle (Ermittlung über Suche) | Nach（特征名称）| Benutzerdefinierter Name von Zielbahnhof oder Zielhaltestelle, für HTML- 和 Verspätungstext verwendet |通过 | Fahrt über bestimmten Ort angegeben als numerische ID（可选，sonst leer） | Verkehrsmittel | Auswahl des Verkehrsmittels, z.B.公共汽车，S-Bahn，usw。 Standardmäßig werden alle Verkehrsmittel ausgewählt |最大限度。乌斯泰格 | Maximale Anzahl 和 Umstiegen。 0 für nur direkte Verbindungen。
|上一页 | 下一页Anzahl abzurufender Fahrten |法拉德米特纳姆 | Nur Verbindungen mit Fahrradmitnahme auswählen |时间偏移| Abfahrtszeit：0 = Jetzt，sonst n Minuten = Jetzt 加上 n Minuten

#### 标签 Verspätungsalarm
![](../../../en/adapterref/iobroker.fahrplan/docs/de/img/settings_delaynotification.png)

Mit dem +-Button können neue Einträge zur Tabelle hinzugefügt werden。

|安装 | Beschreibung |-----------------------------|--- |编号 | Die Nummer entspricht dem Unterknoten in den Objekten und wird automatischvergeben。
|活动 | Wenn der Verspätungsalarm aktiviert ist wird dieser geprüft |路线 |路线 auf die sich der Alarm beziehen soll | Geplante Abfahrt | Geplante Abfahrtszeit der zu prüfenden Route (Leer = Alle Verbindungen) |周刊 | Wochentage an denen die Prüfung erfolgen soll |在 Minuten 的 Benachrichtigung | Anzahl der Minuten vor der Abfahrt, in denen benachrichtigt werden soll |对象的 Ausgabetext | Angabe eines vorhandenen 对象

Hinweis zum Ausgabetext: Hier kann neben einfachen Objekten für VIS z.B. auch das "speak"-Objekt des Alexa-Adapters oder das "reponse"-Objekt des Telegram-Adapters verwendet werden。

#### 标签 Abfahrtstafeln
![](../../../en/adapterref/iobroker.fahrplan/docs/de/img/settings_departuretimetables.png)

Mit dem +-Button können neue Einträge zur Tabelle hinzugefügt werden。

|安装 | Beschreibung |-----------------------------|--- |编号 | Die Nummer entspricht dem Unterknoten in den Objekten und wird automatischvergeben。
|活动 | Wenn der Eintrag aktiviert ist wird dieser abgerufen |冯| Numerische ID von Startbahnhof oder Starthaltestelle (Ermittlung über Suche) |冯（特征名称）| Benutzerdefinierter Name von Startbahnhof oder Starthaltestelle, für HTML-Ausgabe verwendet |上一页 | 下一页Anzahl abzurufender Abfahrten | Verkehrsmittel | Auswahl des Verkehrsmittels, z.B.公共汽车，S-Bahn，usw。 Standardmäßig werden alle Verkehrsmittel ausgewählt |时间偏移| Abfahrtszeit：0 = Jetzt，sonst n Minuten = Jetzt 加上 n Minuten

＃＃＃ 英语
起点、终点和中途停留地必须用数字 ID 标识。
这些 ID 的搜索功能集成在选项卡设置中。

#### 标签设置
![](../../../en/adapterref/iobroker.fahrplan/docs/en/img/settings.png)

|设置 |说明|-----------------------------|--- |供应商 |选择公共交通供应商，目前为 DB 和 ÖBB |更新间隔 |以分钟为单位更新路线的间隔 |延迟后标记延迟 |定义延迟后的分钟应标记为延迟，默认情况下，延迟大于一分钟时标记为延迟 |准时上色 |颜色准时确认|延迟颜色 |延迟颜色 | HTML 表格的标题创建 |为 HTML 表格创建标题 |为路由创建 HTML 视图 |在对象中为每个路由创建一个可配置的 HTML 表 |创建每个旅程的 HTML 视图 |每次旅程在对象中创建一个 HTML 表 |保存详细对象 |输出对象的配置 |保存 JSON 元素 |从 HAFAS 返回的是 JSON，应保存以进行故障排除

#### 标签路由
![](../../../en/adapterref/iobroker.fahrplan/docs/en/img/settings_routes.png)

使用 +-Button 可以将新条目添加到表格中。

|设置 |说明|-----------------------------|--- |编号 |编号匹配对象中的子节点并自动分配|激活 |路由激活时更新连接信息 |来自 |起始站或起始站的数字ID |来自（自定义名称）|起点站或起点站的自定义名称，用于 HTML 和延迟通知输出 |至 |目的站或目的站的数字ID |来自（自定义名称）|目的地站或目的地站的自定义名称，用于 HTML 和延迟通知输出 |通过 |乘坐特殊车站作为数字 ID（可选，默认为空）|车辆 |选择车辆，例如公共汽车、S-Bahn 等。默认情况下，所有车辆都被选中 |最大限度。转让 |路由上的最大传输数，仅直接连接为 0 |出发 |接收的出发次数|自行车 |仅选择自行车允许的连接 |时间偏移 |出发时间：0 = 现在，否则 n 分钟 = 现在加上 n 分钟

####标签延迟警报
![](../../../en/adapterref/iobroker.fahrplan/docs/en/img/settings_delaynotification.png)

使用 +-Button 可以将新条目添加到表格中。

|安装 | Beschreibung |-----------------------------|--- |编号 |编号匹配对象中的子节点并自动分配|激活 |检查延迟警报是否已激活 |路线 |与此延迟警报有关的路线 |计划出发 |要检查的连接计划出发（空 = 所有路线）|平日 |应该检查连接的工作日|分分钟通知 |延迟警报激活时的起飞前几分钟 |输出文本的对象 |文本输出的 ioBroker 状态

“输出文本对象”提示：可以使用在 VIS 中使用的简单状态，但也可以使用 Alexa 适配器的“说话”状态或电报适配器的“响应”状态。

#### 标签出发时间表
![](../../../en/adapterref/iobroker.fahrplan/docs/en/img/settings_departuretimetables.png)

使用 +-Button 可以将新条目添加到表格中。

|设置 |说明|-----------------------------|--- |编号 |编号匹配对象中的子节点并自动分配|激活 |项目激活时更新连接信息 |来自 |起始站或起始站的数字ID |来自（自定义名称）|起点站或起点站的自定义名称，用于 HTML 和延迟通知输出 |出发 |接收的出发次数|车辆 |选择车辆，例如公共汽车、S-Bahn 等。默认情况下，所有车辆都被选中 |时间偏移 |出发时间：0 = 现在，否则 n 分钟 = 现在加上 n 分钟

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->

### 1.2.0 (2021-09-19)
* (Gaudes) Remove support for SBB, not using HAFAS anymore
* (Gaudes) Fix Hafas error "Bad Gateway" with code 502 (Sentry #26)
* (Gaudes) Fix unkown station in route (Sentry #7)
* (Gaudes) Remove support for Node 10
* (Gaudes) Update to newest Adapter creator for internal dependencies
* (Gaudes) Include Dependabot updates

### 1.1.1 (2021-06-22)
* (Gaudes) Advanced error reporting for HAFAS errors
* (Gaudes) Include Dependabot updates

### 1.1.0 (2021-06-04)
* (Gaudes) Time offset for routes and departure tables (Git #88)
* (Gaudes) Check if unloaded before writing/deleting objects (Sentry #7)
* (Gaudes) Include Dependabot updates

### 1.0.7 (2021-04-06)
* (Gaudes) Update HAFAS client to 5.15.2 (Fix error 'invalid json response body' with OEBB profile)
* (Gaudes) Configurable colors for delays and on time
* (Gaudes) Prepare for WebLate translations
* (Gaudes) Include Dependabot updates

### 1.0.6 (2021-03-16)
* (Gaudes) Fix route selection in delay config
* (Gaudes) Fix SBB product suburban-train (Sentry #21)
* (Gaudes) Include Dependabot updates

## License
MIT License

Copyright (c) 2021 Ralf Gaudes <ralf@gaudes.net>

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