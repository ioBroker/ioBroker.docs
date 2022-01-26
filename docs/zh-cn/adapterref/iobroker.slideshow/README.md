---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.slideshow/README.md
title: ioBroker.slideshow
hash: 8/D05kkVGAGGdx8R2raAPYz/Nnw278Ps6uxt/JycIvw=
---
![商标](../../../en/adapterref/iobroker.slideshow/admin/slideshow.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.slideshow.svg)
![下载](https://img.shields.io/npm/dm/iobroker.slideshow.svg)
![安装数量（最新）](https://iobroker.live/badges/slideshow-installed.svg)
![安装数量（稳定）](https://iobroker.live/badges/slideshow-stable.svg)
![依赖状态](https://img.shields.io/david/gaudes/iobroker.slideshow.svg)
![新产品管理](https://nodei.co/npm/iobroker.slideshow.png?downloads=true)

# IoBroker.slideshow
![测试和发布](https://github.com/gaudes/ioBroker.slideshow/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/slideshow/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

[德意志报](#deutsch)

[英文说明](#english)

![演示](../../../en/adapterref/iobroker.slideshow/docs/img/demo.gif)

##<a name="deutsch"></a> Diashow Adapter for ioBroker
Dieser Adapter für ioBroker stellt eine Diashow quasi als Bildschirmschoner für VIS zur Verfügung。

Folgende Quellen stehen aktuell zur Verfügung：

* Die letzten acht täglichen 图片来自 Bing.com
* 通过 VIS-Dateimanager hochgeladene 图片
* Bilder aus beliebigem Pfad im Dateisystem
* 图片来自 Synology PhotoStation

VIS stellt der Adapter ein Widget zur Verfügung 中的 Zur Darstellung。
Dieses bietet auch Funktionen für Effekt beim Bildwechsel, beispielsweise sanftes Ein- und Ausblenden。
Zusätzlich kann ein Timeout eingestellt werden。 Sofern auf anderen View im Projekt keine Aktion für das eingestellte Timeout erfolgt ist, wird zur View mit der Diashow gewechselt。 Durck Klicken des Bilds wird entweder zurück zur letzten Ansicht oder zu einer eingestellten Ansicht gewechselt。

Neben dem Bild selbst als Pfad oder Base64-kodiertes Objekt werden weitere Objekte mit Informationen zum Bild in ioBroker erstellt。
Diese sind abhängig von der ausgewählten Quelle：

|对象 |兵 |本地和日期系统 |群晖 | ----------- | ----------- | ----------- | ----------- |信息1 |标题 |标题 (EXIF-信息) |标题 |信息2 |写信 | Betreff (EXIF-信息) |写信 |信息3 |版权所有-资讯|评论 (EXIF-信息) |日期名称 |日期 | Datum der Anzeige auf Bing-Seite | Aufnahmedatum (EXIF-信息) |苦参

Der Button "updatepicturelist" als Objekt in ioBrokerliest die Bilder aus den konfigurierten Quellen neu ein, z.B. nach Hinzufügen oder Löschen von Bildern。 Die Bilder aus allen Quellen mit Ausnahme Bing werden sonst nur beim Start des Adapters eingelesen。 Bing-Bilder werden stündlich automatisch aktualisiert。

** Dieser Adapter verwendet die Sentry Bibliotheken um automatisch Abstürze und Programmfehler an die Entwickler zu übermitteln.** Weitere Details und für Informationen zur Deaktivierung der Fehlerberichterstattung in der§§LLL_0 Sentry Reporting wird ab JS-Controller 3.0 verwendet。

### 配置
在 den Einstellungen des Adapters wird die Quelle der Bilder ausgewählt, außerdem das Intervall für den Wechsel der Bilder, beispielsweise 10 Sekunden。
Außerdem kann eingestellt werden, wie oft die Liste der Bilder aktualisiert werden soll。 Die Einstellung erfolgt in Stunden, bei 0 ist die automatische Aktualisierung deaktiviert。

贝 Auswahl der Quelle "Dateisystem" kann dann noch der Pfad im Dateisystem ausgewählt werden, außerdem das Format (Hochoder Querformat) der anzuzeigenden Bilder sowie die Reihenfolge。

Bei Auswahl der Quelle "Synology PhotoStation" 必须使用 IP 地址或主机名 sowie Benutzername 和 Passwort angegeben werden。下载 von Bildern durch Benutzer muss in den Einstellungen von PhotoStation aktiviert sein。

### VIS-小部件
Das Widget ist in der Categorie "slideshow" enthalten。

Das Widget sollte in eine eigene 查看 integriert werden。 Hierdurch lässt sich der automatische Start der Diashow nutzen。

Folgende Einstellungen sind möglich：

* Abschnitt“Allgemein”
* Object-ID: Hier muss der vom Adapter erzeugte Datenpunkt ausgewählt werden, beispielsweise "slideshow.0.picture"
* 小部件 mit Bild füllen
* True (Standard) = Bild füllt das Widget, der Bildrand ist möglicherweise abgeschnitten
* False = Das vollständige Bild wird angezeigt, das Widget kann jedoch leere Zonen haben
* Abschnitt“效果”
* SlideshowEffect: Als Effekt kann zwischen folgenden gewählt werden:
*“凯恩”
*“褪色”：Einfaches Verblassen und Erscheinen
*“过渡”：超白兰登
* “jQuery-Effekt”：多样化的 jQuery-Effekte，beispielsweise Rolladen
* Übergangsphase：时代在 Millisekunden für den Effekt，gute Werte sind 500 或 1000ms
* Transition Style: Stil für "Transistion" 和 "jQuery-Effekt"
* jQuery-Effekt：Gewünschter jQuery-Effekt
* Abschnitt“Automatischer Diashow-Start”
* Aktivierung des automatischen 开始
* 超时：Nach welcher Zeit ohne Aktion auf die Diashow-View gewechselt wird
* Ziel beim Klicken：
* Zuletzt verwendete Ansicht
* Konfigurierte Ansicht (siehe nächster Einstellung)
* Kein, fall beispielsweise ein eigener Button integriert werden soll
* Zielansicht: Aufzurufende Ansicht beim Verlassen der Diashow

＃＃＃ 常问问题
**Quelle Dateisystem**

Können Netzlaufwerke eingebunden werden？

Ja, aber nicht direkt durch den 适配器。 ioBroker unterstützt mittlerweile sehr viele Betriebssysteme。 Der Zugriff und das Verbinden von Netzwerkfreigaben ist je nach Betriebssystem komplett unterschiedlich。 Teilweise werden auch weitere Komponenten wie z.B. Samba bei Linux 本诺特。 Das Verbinden des Netzlaufwerks (Mappen bzw. Mount) kann aber direkt über das Betriebssystem durchgeführt werden。 Unter Linux erfolgt der Mount in ein angegebenes Verzeichnis, z.B. /mnt/图片。 Dieses Verzeichnis kann dann in der Adapter-Konfiguration verwendet werden。

**群晖**

为 Synology PhotoStation weitere Einstellungen wie z.B. 提供的服务Auswahl des Albums integriert werden？ Kann DSM 7 (Synology Photos) unterstützt werden？

Synology PhotoStation wird mit DSM 6 enden。 Der Nachfolger，Synology Photos，erscheint mit DSM 7。DSM 7 ist aktuell noch Beta，die finale Version wird vermutlich Sommer 2021 erscheinen。 Vermutlich ändert sich auch die Entwickler-Schnittstelle。 Daher Investiere ich keinen Aufwand mehr in die bisherige Version。 Sobald DSM 7 offiziell erscheint werden ich die Integration prüfen。 Leider gab es für die bisherige Version keine offizielle Dokumentation von Synology。
Der Zugriff auf bestimmte Fotoalben bzw。 Ordner kann jedoch in der aktuellen Version von PhotoStation einfach realisiert werden。 Hierzu unter DSM einen Benutzer für Slideshow anlegen und diesem Benutzer in der PhotoStation nur Berechtigungen auf die gewünschten Fotoalben bzw。秩序之本。

##<a name="english"></a> ioBroker 幻灯片适配器
此 ioBroker 适配器为 VIS 提供幻灯片，就像屏幕保护程序。

实际上可以使用以下来源：

* 来自 Bing.com 的最后八张每日图片
* 图片由VIS-File-Manager上传
* 图片来自文件系统路径
* 图片来自 Synology PhotoStation

Adapter 为 VIS 中的 Presentation 提供了一个 Widget，它提供对图片变化的效果，例如平滑淡出和淡入。
此外，可以配置超时。当在同一个 VIS 项目中的其他视图上没有发生定义超时的操作时，将启动带有幻灯片的视图。单击图片，它会变回上一个视图或预定义的视图。

除了作为路径或Base64编码对象的图片之外，还有更多在ioBroker中创建的带有图片信息的对象。
这些取决于所选的来源：

|对象 |兵 |本地和文件系统 |群晖 | ----------- | ----------- | ----------- | ----------- |信息1 |标题 |标题（EXIF 信息） |标题 |信息2 |说明 |主题（EXIF 信息） |说明 |信息3 |版权所有 |评论（EXIF 信息） |日期名称 |日期 |显示在 Bing 页面上的日期 |录制日期（EXIF信息）|录制日期

ioBroker 中作为 objekt 的按钮“updatepicturelist”从配置的源重新读取图片，例如在从源添加或删除图片后很有用。来自所有来源的图片，除了必应，通常在适配器启动时加载。 Bing 图片每小时自动更新一次。

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅 [Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!从 js-controller 3.0 开始使用哨兵报告。

＃＃＃ 配置
在适配器设置中可以选择图片来源。虽然图片的间隔发生了变化。
同样可配置的是图像列表的更新频率。设置以小时为单位，0 禁用自动更新。

选择源“文件系统”时，可以输入路径，并显示图片的格式（景观或纵向）。也可以配置顺序。

选择源“Synology PhotoStation”时，必须配置IP地址或主机名和密码的用户名。必须在 PhotoStation 设置中启用图片下载。

注意：更改（添加或删除）后，需要重新启动适配器。

### VIS-小部件
小部件可以在“幻灯片”类别中找到。

小部件应集成在自己的视图中，以便可以使用幻灯片的自动启动。

存在以下配置选项：

* 类别“常见”
* Object-ID：必须提供适配器创建的ioBroker对象，例如“slideshow.0.picture”
* 用图片填充小部件
* True (默认) = 图片填充小部件，图片边框可能会被剪掉
* False = 显示完整图片，但小部件可能有空白区域
* 类别“效果”
* SlideshowEffect：提供以下选项：
* “没有任何”
*“淡入淡出”：简单的淡出和淡入
*“过渡”：淡入淡出
* "jQuery-Effekt": 不同的 jQuery 效果，例如 "blind"
* 过渡期：效果的时间以毫秒为单位，500 或 1000 是推荐值
* 过渡风格：“过渡”和“jQuery-Effect”的风格
* jQuery-Effect: 想要的效果
* 类别“自动幻灯片放映”
* 启用自动启动
* 超时：在其他视图上处于非活动状态的时间（以秒为单位）之后，将开始幻灯片放映
*点击目标：
* 最后使用的视图
* 配置视图（见下一个设置）
* 无，例如在集成另一个小部件时
* 目标视图：离开幻灯片时显示的视图

＃＃＃ 常问问题
**源文件系统**

可以集成网络驱动器吗？

是的，但不能直接通过适配器。 ioBroker 现在支持大量操作系统。访问和连接网络共享完全不同，具体取决于操作系统。在某些情况下，还需要其他组件，例如 Samba for Linux。网络驱动器的连接（映射或挂载）可以由操作系统直接完成。在 Linux 下，挂载发生在指定的目录中，例如/mnt/图片。然后可以在适配器配置中使用该目录。

**源 Synology**

是否可以为 Synology PhotoStation 集成专辑选择等其他设置？是否支持 DSM 7 (Synology Photos)？

Synology PhotoStation 将以 DSM 6 结束。继任者 Synology Photos 将与 DSM 7 一起出现。DSM 7 目前仍处于测试阶段，最终版本可能会在 2021 年夏季出现。想必开发者界面也会发生变化。所以我不会在以前的版本上投入更多的精力。一旦DSM 7正式发布，我会检查集成。不幸的是，没有针对先前版本的官方 Synology 文档。
但是，在当前版本的 PhotoStation 中可以轻松实现对某些相册或文件夹的访问。为此，请在 DSM 下为幻灯片创建一个用户，并仅授予此用户访问 PhotoStation 中所需相册或文件夹的权限。

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->

### 0.1.4 (2021-04-18)
* (Gaudes) Configurable order for Filesystem (Git #37)
* (Gaudes) Configurable picture list update every n hours (Git #41)
* (Gaudes) Fix toggleClass for effect Transition (Git #42)
* (Gaudes) Configurable picture filling in widget (Git #38)
* (Gaudes) Fix for multiple widgets (Git #44)
* (Gaudes) Include Dependabot updates

### 0.1.3 (2021-04-07)
* (Gaudes) Handle Synology picture download error 502 (Sentry #A)
* (Gaudes) Fix update picture list (Git #30)
* (Gaudes) Handle passwords with special characters for Synology (Git #12)
* (Gaudes) Fix empty result (Sentry #9)
* (Gaudes) Prepare for WebLate translations
* (Gaudes) Quality fixing (lgtm.com)
* (Gaudes) Include Dependabot updates

### 0.1.2 (2021-03-09)
* (Gaudes) Fix error with breadcrumb on Synology login

### 0.1.1 (2021-03-08)
* (Gaudes) Rename Adapter to slideshow
* (Gaudes) Fix directory access denied (Sentry #4)
* (Gaudes) Error handling for Synology Login (Sentry #3)
* (Gaudes) Fix empty result (Sentry #2)
* (Gaudes) Fix file-not-found (Sentry #1)
* (Gaudes) Include Dependabot updates

### 0.1.0 (2021-02-26)
* (Gaudes) Prepare for beta tests
* (Gaudes) Include Dependabot updates

### 0.0.5 (2021-02-17)
* (Gaudes) Adaptive width and height in widget depending on orientation
* (Gaudes) Fix format option for Synology
* (Gaudes) Writing extended picture information to objects
* (Gaudes) Button for update picture list
* (Gaudes) Save picture count as object
* (Gaudes) Quality fixing (lgtm.com)
* (Gaudes) Include Sentry error reporting
* (Gaudes) Include Dependabot updates

### 0.0.4 (2021-01-21)
* (Gaudes) Allow PNG-files in Filesystem
* (Gaudes) Fix config problem with formats
* (Gaudes) Handle portrait orientation in widget

### 0.0.3 (2021-01-14)
* (Gaudes) Prepare for alpha tests

### 0.0.2 (2021-01-11)
* (Gaudes) initial release

## License
MIT License

Copyright (c) 2021 Gaudes <ralf@gaudes.net>

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