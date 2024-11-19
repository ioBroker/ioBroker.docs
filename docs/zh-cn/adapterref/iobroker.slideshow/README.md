---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.slideshow/README.md
title: ioBroker.幻灯片
hash: JzFpziqmjAlUpvoVt6P6xVMXV1nenar3ljFNKgEY15M=
---
![标识](../../../en/adapterref/iobroker.slideshow/admin/slideshow.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.slideshow.svg)
![下载](https://img.shields.io/npm/dm/iobroker.slideshow.svg)
![安装数量（最新）](https://iobroker.live/badges/slideshow-installed.svg)
![安装数量（稳定）](https://iobroker.live/badges/slideshow-stable.svg)
![新平台](https://nodei.co/npm/iobroker.slideshow.png?downloads=true)

# IoBroker.幻灯片
![测试与发布](https://github.com/gaudes/ioBroker.slideshow/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/slideshow/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

[德文说明书](#deutsch)

[英文描述](#english)

![演示](../../../en/adapterref/iobroker.slideshow/docs/img/demo.gif)

##<a name="deutsch"></a> Diashow 适配器 for ioBroker
ioBroker 的 Dieser 适配器类似于 Diashow 的 VIS zur Verfügung 的 Bildschirmschoner。

Folgende Quellen stehen aktuell zur Verfügung：

* Die letzten acht täglichen Bilder von Bing.com
* 通过 VIS-Dateimanager hochgeladene Bilder
* 图片来自日期系统中的 Beliebigem Pfad
* Synology PhotoStation 和 Synology Photo 的图片

在 VIS 中设置适配器并在小部件中进行操作。
在 Bildwechsel、beispielsweise sanftes Ein- 和 Ausblenden 中使用效果功能。
Zusätzlich kann ein Timeout eingestellt werden。因此，在项目中查看主要动作时会出现超时，请通过 Diashow 技术查看。 Durck Klicken des Bilds wird entweder zurück zur letzten Ansicht oder zu einer eingestellten Ansicht gewechselt。

Neben dem Bild 本身就是 Pfad 或 Base64-kodiertes Objekt werden weitere Objekte mit Informationen zum Bild in ioBroker erstellt。
Diese sind abhängig von der ausgewählten Quelle：

|对象|必应 |本地和日期系统|群晖 | ----------- | ----------- | ----------- | ----------- |信息1 |标题 |标题（EXIF-信息）|标题 |信息2 |说明 | Betreff（EXIF-信息）|说明 |信息3 |版权信息| Kommentar（EXIF 信息）|日期名称 |日期 | Bing-Seite 的数据 | Aufnahmedatum（EXIF 信息）|高等医学

按钮“updatepicturelist”作为 ioBroker 中的对象位于 configurierten Quellen neu ein，z.B. 中的图像中。 nach Hinzufügen oder Löschen von Bildern。适配器和适配器的启动图像。 Bing-Bilder 会自动显示。

**Dieser Adapter verwendet die Sentry Bibliotheken um automatisch Abstürze und Programmfehler an die Entwickler zu übermitteln.** Weitere Details und für Informationen zur Deaktivierung der Fehlerberichterstattung in der [Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry 报告来自 JS-Controller 3.0 版本。

### 配置
在适配器的安装过程中，图像的间隔时间为 10 秒。
如果您想查看世界各地的情况，我们通常会将列表中的图片显示为世界各地的情况。 Die Einstellung erfolgt in Stunden, bei 0 ist die automatische Aktualisierung deaktiviert.

Bei Auswahl der Quelle“Dateisystem”可以在日期系统 ausgewählt werden、außerdem das Format (Hochoder Querformat) der anzuzeigenden Bilder sowie die Reihenfolge 中找到。

“Synology PhotoStation”必须使用 DSM 版本，IP 地址或主机名必须是用户名和密码。下载 PhotoStation 活动中的图片。

### VIS 小部件
Das Widget 位于“幻灯片”类别中。

Das Widget sollte in eine eigene View integriert werden。 Hierdurch lässt sich der automatische Start der Diashow nutzen。

Folgende Einstellungen sind möglich：

* 简报“一般”
	* 对象 ID：Hier muss der vom Adapter erzeugte Datenpunkt ausgewählt werden，beispielsweise“slideshow.0.picture”
* 带有图片的小部件
		* True（标准）= Bild füllt das Widget，der Bildrand ist möglicherweise abgeschnitten
		* False = Das vollständige Bild wird angezeigt，das Widget kann jedoch leere Zonen haben
* 摘要“效果”
	* SlideshowEffect：Als Effekt kann zwischen folgenden gewählt werden：
*“凱恩”
		*“淡出”：Einfaches Verblassen und Erscheinen
		*“转变”：Überblenden
		*“jQuery-Effekt”：多样化的 jQuery-Effekte，beispielsweise Rolladen
	* Übergangsphase：Zeit in Millisekunden für den Effekt，gute Werte sind 500 oder 1000ms
	* 过渡风格：Stil für“Transistion”和“jQuery-Effekt”
	* jQuery-Effekt：Gewünschter jQuery-Effekt
* Abschnitt“Automatischer Diashow-Start”
	* 自动化活动开始
	* 超时：Nach welcher Zeit ohne Aktion auf die Diashow-View gewechselt wrd
* 请点击这里：
		* Zuletzt verwendete Ansicht
		* Konfigurierte Ansicht (siehe nächster Einstellung)
		* Kein，fall beispielsweise ein eigener Button integriert werden soll
	* Zielansicht：Aufzurufende Ansicht beim Verlassen der Diashow

＃＃＃ 常问问题
**来源数据库**

Können Netzlaufwerke eingebunden werden？

Ja， aber nicht direkt durch den Adapter。 ioBroker unterstützt mittlerweile sehr viele Betriebssysteme。 Der Zugriff und das Verbinden von Netzwerkfreigaben ist je nach Betriebssystem komplett unterschiedlich。 Teilweise werden auch weitere Komponenten wie z.B. Samba bei Linux benötigt。 Das Verbinden des Netzlaufwerks (Mappen bzw. Mount) 可以直接在 werden 上使用 Betriebssystem。在 Linux 下挂载在 ein angegebenes Verzeichnis, z.B. /mnt/图片。请参阅适配器配置的说明。

**Synology**

关于 Synology PhotoStation weitere Einstellungen wie z.B. 的 Können Auswahl des 专辑完整吗？

Der Zugriff auf bestimmte Fotoalben bzw。在 PhotoStation 的最新版本中，您可以看到它的真实情况。 DSM einen Benutzer 的幻灯片放映和 PhotoStation 中的 Benutzer 位于 PhotoStation 中，位于 Fotoalben bzw 中。奥德纳·格本。

##<a name="english"></a> ioBroker 幻灯片适配器
此 ioBroker 适配器为 VIS 提供了幻灯片，就像屏幕保护程序一样。

实际上可以使用以下来源：

* 来自 Bing.com 的最新八张每日图片
* 图片通过VIS-File-Manager上传
* 来自文件系统路径的图片
* 来自 Synology PhotoStation 或 Synology Photo 的图片

适配器在 VIS 中提供了一个用于演示的小部件，它提供了图片变化效果，例如平滑淡出和淡入。
此外，还可以配置超时。当同一 VIS 项目中的其他视图上未发生定义的超时操作时，将启动带有幻灯片放映的视图。单击图片即可返回上一个视图或预定义视图。

除了作为路径或 Base64 编码对象的图片外，还有更多在 ioBroker 中创建的带有图片信息的对象。
这些取决于所选的来源：

| 对象 | Bing | 本地和文件系统 | Synology | ----------- | ----------- | ----------- | ----------- | info1 | 标题 | 标题（EXIF 信息）| 标题 | info2 | 描述 | 主题（EXIF 信息）| 描述 | info3 | 版权 | 评论（EXIF 信息）| Dateiname | 日期 | Bing 页面上显示的日期 | 录制日期（EXIF 信息）| 录制日期

ioBroker 中的“updatepicturelist”按钮作为对象重新读取已配置源中的图片，在添加或删除源中的图片后非常有用。除 Bing 外，所有源中的图片通常在适配器启动时加载。Bing 图片每小时自动更新一次。

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用 Sentry 报告。

＃＃＃ 配置
在适配器设置中，可以选择图片源。尽管图片更改的间隔。
还可以配置图像列表的更新频率。设置以小时为单位，0 表示禁用自动更新。

当选择源“文件系统”时，可以输入路径和要显示的图片的格式（横向或纵向）。还可以配置顺序。

当选择源“Synology PhotoStation”时，必须配置 Synology DSM 版本、IP 地址或主机名以及带密码的用户名。

注意：更改（添加或删除）后，需要重新启动适配器。

### VIS 小部件
您可以在“幻灯片”类别中找到该小部件。

该小部件应集成在自己的视图中，以便可以使用幻灯片的自动启动。

存在以下配置选项：

* 类别“常见”
* Object-ID：必须提供适配器创建的 ioBroker 对象，例如“slideshow.0.picture”
* 用图片填充小部件
* True （默认）= 图片填充小部件，图片边框可能会被切断
* 错误 = 显示完整的图片，但小部件可能有空白区域
* 类别“效果”
* 幻灯片效果：有以下选项可供选择：
		* “没有任何”
* “淡入淡出”：简单淡出淡入
* “过渡”：淡入淡出
* “jQuery-Effekt”：不同的 jQuery 效果，例如“盲”
* 过渡周期：效果的时间（以毫秒为单位），建议值为 500 或 1000
* 过渡风格：适用于“Transistion”和“jQuery-Effect”的风格
* jQuery-Effect：所需效果
* 类别“幻灯片自动开始”
* 启用自动启动
* 超时：其他视图处于不活动状态的时间（以秒为单位）过后，幻灯片将开始放映
* 点击目标：
* 最后使用的视图
* 配置视图（参见下一个设置）
* 无，例如当集成另一个小部件时，因此
* 目标视图：离开幻灯片放映时显示的视图

＃＃＃ 常问问题
**源文件系统**

网络驱动器可以集成吗？

是的，但不能直接通过适配器。ioBroker 现在支持大量操作系统。访问和连接网络共享完全取决于操作系统。在某些情况下，还需要附加组件，例如 Samba for Linux。网络驱动器的连接（映射或挂载）可以由操作系统直接完成。在 Linux 下，挂载发生在指定的目录中，例如 /mnt/pictures。然后可以在适配器配置中使用此目录。

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### 0.2.1 (2024-11-18)
* (Gaudes) Update in package.json for VIS

### 0.2.0 (2024-11-13)
* (Gaudes) Include support for Synology DSM 7
* (Gaudes) Add controls for start/stop
* (Gaudes) Remove support for older Node versions
* (Gaudes) Update to newest Adapter creator for internal dependencies
* (Gaudes) Include adapter-dev
* (Gaudes) Include Dependabot updates

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

Copyright (c) 2024 Gaudes <ralf@gaudes.net>

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