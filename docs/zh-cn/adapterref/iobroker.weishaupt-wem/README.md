---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.weishaupt-wem/README.md
title: ioBroker.weishaupt-wem
hash: F4866vNCXSe9t1AP1tmbJAaUgg1hot1aVMVXlIKMERQ=
---
![标识](../../../en/adapterref/iobroker.weishaupt-wem/admin/weishaupt-wem.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.weishaupt-wem.svg)
![下载](https://img.shields.io/npm/dm/iobroker.weishaupt-wem.svg)
![依赖状态](https://img.shields.io/david/ta2k/iobroker.weishaupt-wem.svg)
![已知漏洞](https://snyk.io/test/github/ta2k/ioBroker.weishaupt-wem/badge.svg)
![NPM](https://nodei.co/npm/iobroker.weishaupt-wem.png?downloads=true)
![特拉维斯-CI](http://img.shields.io/travis/ta2k/ioBroker.weishaupt-wem/master.svg)

# IoBroker.weishaupt-wem
## IoBroker 的 weishaupt-wem 适配器
weishaupt WEM Portal 适配器

## WEM门户域
Das WEM Portal wrd je nach Region unter unterschiedlichen Domains ausgeliefert (`www.wemportal.com` 或 `www.wemportal.de`)。在浏览器中登录或登录 `www.wemportal.de` 时，请先登录 `403 Forbidden`（Azure 应用程序网关）中的适配器，然后在“WEM Portal Domain”下的 Adapter-Einstellungen die passende Domain 中进行登录。标准为`www.wemportal.com`。

## 自定义指令
Für ein Custom Befehl befehl benötigst du die URL 和 den gewünschten Wert。 Für die URL einfach die Option im WEM Portal mit Chrome aufrufen und dann rechte Maustate Untersuchen dann unter Elements/Elemente mit STRG+F nach iframe suchen mit name=&quot;RDWWriteParameter&quot; die URL nach src mit rechts Klick Link kopieren raus kopieren。未来之事<option suchen und den gewünschten Wert unter value kopieren und als state Wert eintragen.
z.B.: <https://www.wemportal.com/Web/UControls...,>208557

## 应用支持
适配器位于应用程序中的日期。

**weishaupt-wem.0.20999** “通过应用程序命名”

**weishaupt-wem.0.20999.1-3.parameters** 您可以通过 **NumericValue** 或 **StringValue** 找到当前状态并查看。查找 Min Max Werte 和 **EnumValues** 下的 NumericValue 查找项

## Changelog

### 0.0.20

* (ta2k) Abgeschaltete Leistungs-/Prozentwerte (Aus/off/--) werden als numerische 0 gespeichert (kWh-Zähler bleiben unberührt)

### 0.0.19

* (ta2k) Fix Absturz "Canvas.Image is not a constructor" mit jsdom 30 / Node 24 (Canvas-Stub meldet sich jetzt als nicht installiert)

### 0.0.18

* (ta2k) Backoff bei 403 vom Azure Gateway (Rate-Limit / Bot-Schutz) statt Relogin-Sturm
* (ta2k) Anfragen entzerrt (Throttling zwischen App-Requests) analog hass-WEM-Portal
* (ta2k) Zentrale App-API-Anfrage mit einmaligem Relogin-Retry und Session-Ablauf-Erkennung
* (ta2k) Neue App-Daten: Geräte-Status/Fehler (DeviceStatus), Energiestatistik (Statistics, stündlich), Heizzeiten (CircuitTimes)
* (ta2k) Heizzeiten schreibbar über `circuitTimes.PARAMETERID.setSchedule` (CircuitTimes/Write)
* (ta2k) App-Header und Login gegen die App-APK v3.0.1 verifiziert (X-Api-Version 2.0.0.0, AppVersion 3.0.1, Android)
* (ta2k) Auswählbare Portal-Domain (.com / .de)
* (ta2k) Login/Status-Fehler beenden nicht mehr die Instanz (kein Crash bei fehlenden Parametern oder Status)

### 0.0.16

* (ta2k) Improve error and login handling
  
### 0.0.15

* (ta2k) add app support

### 0.0.14

* (ta2k) fix command sends
### 0.0.13

* (ta2k) update dependencies

### 0.0.9

* (ta2k) fix for Status label

### 0.0.5

* (ta2k) fix remote for WWP

### 0.0.4

* (ta2k) remove spaces in ids

### 0.0.3

* (ta2k) Fix remote control

### 0.0.2

* (ta2k) Möglichkeit Parameter zu ändern
* Nummerische Werte als Zahlen in ioBroker geschrieben

### 0.0.1

* (ta2k) initial release

## License

MIT License

Copyright (c) 2019 ta2k <tombox2020@gmail.com>

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