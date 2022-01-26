---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.awattar/README.md
title: ioBroker.awattar
hash: PzT3xH36qGE3IjMR6UxLBEKz75D3cNiyFUoMT48FoK0=
---
![标识](../../../en/adapterref/iobroker.awattar/admin/awattar.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.awattar.svg)
![下载](https://img.shields.io/npm/dm/iobroker.awattar.svg)
![安装数量（最新）](http://iobroker.live/badges/awattar-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/awattar-stable.svg)
![依赖状态](https://img.shields.io/david/sirjojo69/iobroker.awattar.svg)
![已知漏洞](https://snyk.io/test/github/sirjojo69/ioBroker.awattar/badge.svg)
![新产品管理](https://nodei.co/npm/iobroker.awattar.png?downloads=true)

# IoBroker.awattar
**测试：** ![测试和发布](https://github.com/sirjojo69/ioBroker.awattar/workflows/Test%20and%20Release/badge.svg)

<p><a href="https://www.awattar.de/" target="_blank"><img border="0" alt="阿瓦塔" src="admin/awattarBig.png"></a></p>

## IoBroker 的 aWATTar 适配器
该适配器读取电力供应商<a href="https://www.awattar.de/" target="_blank">aWATTar</a>未来一天的每小时和每小时 CAP 费率的每小时价格。有了这些信息，您就可以控制何时应该为您的电动汽车或家庭存储充电（即在最便宜的时间）。由于该提供商仅在奥地利和德国提供其服务，因此详细说明仅为德语。

Dieser Adapter 位于 Stunden Preise für den kommenden Tag des Stromanbieters <a href="https://www.awattar.de/" target="_blank">aWATTar</a> für die Tarif 每小时和每小时 CAP。 Mit dieser 信息 kann man dann steuern wann zb das Elektroauto oder der Hausspeicher geladen werden soll (nämlich zur billigsten Zeit)。

在 den Einstellungen des Adapters findest du 5 Felder (die jeweils mit Standardwerten belegt sind)：<li>在变量“aWATTar API 的 URL”中，为 API Preis Datenfeed von aWATTar 提供 URL。</li><li> Wer (zB für die Beladung seines Elektroautos) die billigsten Stunden in der Nacht wissen will, benutzt die beiden folgenden 参数。<ul>在变量“Start Threshold Loading (eg for EV)” steht eine Uhrzeit die den Beginn eines Zeitraumes darstellt, für den man die billigsten Stunden in geordneter Reihenfolge bekommen möchte</ul><ul> In der Variable &quot;End Threshold Loading&quot; steht eine Uhrzeit die das Ende eines Zeitraumes darstellt, für den man die billigsten Stunden in geordneter Reihenfolge bekommen möchte</ul></li><li>在变量中“实际增值税率（百分比）” muss die aktuell gültige Mwst。安杰本沃登Die Preise die über die Schnittstelle kommen sind ohne Mwst。</li><li>在变量 &quot;Arbeitspreis ( &quot;Netznutzung&quot; + &quot;Umlagen, Abgaben, Steuern&quot; + &quot;Kosten für Ökostromzertifikate, Abrechnung und Vertrieb&quot;, incl. MWSt.)&quot; kannst du deinen persönlichen Arbeitspreis eintraggen ()</li><br> Die Ergebnisse stehen dann im Object Baum des Adapters。 (awattar.0) Der Folder &quot;prices&quot; enthält für jede Stunde des Tages einen Eintrag mit dem Strompreis für diese Stunde Der Folder &quot;prices_ordered&quot; enthält -sortiert nach dem Stundenpreis-einen Eintrag für jede Stunde des Tages einen Eintrag mit dem Strompreis für diese für diese Stunde 。<br><br> Im Ausgangszustand ist der Adapter so eingestellt dass er um 15.00 Uhr die Werte für die 24h des nächsten Tages holt。 Dieser Schedule kann natürlich angepasst werden。 Laut <a href="https://www.awattar.de/services/api" target="_blank">aWATTar api</a> Doku stehen diese Werte jeden Tag um 14.00 Uhr bereit。

## Changelog

### 1.0.6
* (SirJojo69) new version for official repo

### 1.0.5
* (SirJojo69) Gesamtpreis und Bruttopreis hinzugefügt, API Aufruf mit start und ende. some internal fixes.

### 1.0.3
* (SirJojo69) einige Einstellungen verändert.

### 1.0.1
* (SirJojo69) deleted admin tab.

### 1.0.0
* (SirJojo69) first stable release.

### 0.0.1
* (SirJojo69) initial release.

## License
MIT License

Copyright (c) 2020 - 2021 SirJojo69 <gtj.howe@gmx.de>

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