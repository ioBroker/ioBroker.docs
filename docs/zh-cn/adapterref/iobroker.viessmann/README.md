---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.viessmann/README.md
title: ioBroker.viessmann
hash: py7WH/sT7A9CXgu/xcGjnCdIpEIKKXYdeErNrQ8IoFo=
---
![商标](../../../en/adapterref/iobroker.viessmann/admin/viessmann.png)

![安装数量](http://iobroker.live/badges/viessmann-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.viessmann.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.viessmann.svg)
![特拉维斯](http://img.shields.io/travis/misanorot/ioBroker.viessmann/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/misanorot/ioBroker.viessmann?branch=master&svg=true)
![NPM](https://nodei.co/npm/iobroker.viessmann.png?downloads=true)

＃ioBroker.viessmann
=================

[![贝宝]（https://www.paypalobjects.com/zh_CN/DK/i/btn/btn_donateCC_LG.gif）](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=ZYHW84XXF5REJ&source=url)

**[英文说明](https://github.com/misanorot/ioBroker.viessmann/blob/master/lib/Readme_en.md)**

Mit diesem Adapter ist es smöglich，来自Objekten zu speichern的[电压控制](https://github.com/openv/vcontrold)kommuniziert程序。
Ebenso ist das Setzen von Werten，围网捕捞者Vito.xml的死者。

####（主持人）
主机名与IOBroker laufen相当，因此请使用.xml Dateien einzulesen中的Linux系统代理。
*（Vorausgesetzt，dem标准Pfad中的sie liegt：/etc/vcontrold/vito.xml）*

####（Anderer主机）
Ist Vcontroled auf einem anderen主机安装程序，按SSH Zugang的.xml Dateien einlesen的要求提供。
SSH选项卡中的HierfürdienötigenInformationen。
*（Eine funktionierende SSH版本与vorausgesetzt。）*

Nach dem Neustart der Instanz，Wird diese dann automatisch eingelesen，Man Kann nun in der Konstanguration der Instanz die Werte einstellen。

＃在Folgenden表aufgebaugt中，删除Struktur der vito.xml中的muss：
		```<vito>
			<devices>
				<device ID="2094" name="V200KW1" protocol="KW2"/>
			</devices>
			<commands>
				<command name='getOelverbrauch' protocmd='getaddr' >
					<addr>7574</addr>
					<len>4</len>
					<description></description>
				</command>
				<command name='getTempAbgas' protocmd='getaddr'>
					<addr>0808</addr>
					<len>2</len>
					<unit>UT</unit>
					<error>05 05</error>
					<description>Abgastemeratur in Grad C</description>
				</command>
			</commands>
		</vito>```

Eine Sortierung der Befehle，他的父亲。

## Wichtig !：
-werden ggf的Bei jedem neuen einlesen der Vito Daten。死于“ alten” Einstellungengelöscht。

Es ist empfehlenswert，Abfragewerten亲戚关系部，EinmöglichstGrosses Abfrageintervall zuwählen。
Es ist ebensomöglich，einen Wert ausserhalb des Abfragezyklus abzufragen。 Hierzu muss der Datenpunkt *强制投票*，mit demgewünschten*获取* Wert beschrieben werden。

* die benutzten Bilder stammen von www.viessmann.com。*

＃＃ 去做
-Anderung der Vito.xml和Verlust der Einstellungen
-实施单位开/关

**[更新日志](https://github.com/misanorot/ioBroker.viessmann/blob/master/changelog.md)**

## License

The MIT License (MIT)

Copyright (c) 2017-2020 misanorot <audi16v@gmx.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.