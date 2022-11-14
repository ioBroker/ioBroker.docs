---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.bydhvs/README.md
title: 无题
hash: fp0JFosNG9bcdhM2vBDHTsHIuTrwMY0S97qqFoofkS4=
---
![标识](../../../en/adapterref/iobroker.bydhvs/admin/bydhvs.png)

## IoBroker 的 bydhvs 适配器
比亚迪 HVS 电池轮询数据

＃＃ 英语：
＃＃ 介绍
此适配器从比亚迪光伏电池 (https://www.bydbatterybox.com/) 中获取数据，并将它们放入适配器中的数据点。不幸的是，没有官方 API 也没有文档，所以我使用了 wireshark 和 byd-hvs-simulator 来尝试理解通信。我的适配器模拟 byd-app，向设备发送类似的数据包并分析响应。

＃＃ 当心
beConnect 应用程序有两个步骤，第一步获取正常数据，第二步获取所有电池的详细数据（单个电池温度和电压以及更多详细信息）在一个数据包之后延迟，直到我得到结果。我认为同时测量了所有细胞，但我不确定。我绝对不确定您是否会因过于频繁地轮询这些数据而损害电池，所以请注意：风险自负！

##最多支持5个模块
现在最多支持 5 个 HVS 模块。

##设置
时间间隔：这很简单：多久轮询一次数据 IP 地址：这是自我解释。您可以使用标准地址（ 192.168.16.254 ）并在家中更改路由，例如：https://www.photovoltaikforum.com/thread/150898-byd-hvs-firmware-update/?postID=2215343#post2215343。优点是：beConnect 应用程序也可以工作。其他可能性：您更改盒子的 IP 地址。但是：请注意：网页上的文字令人困惑，如果您对所做的事情不是绝对安全：请不要触摸设置。在德国论坛上，我从被锁定在他们的系统之外并且无法返回的人那里读到，要么 byd 向您发送替换 HVU，要么您必须购买新的。
电池详细信息：如上所述：您需要电池的详细信息吗？如果是这样：设置 checkobx。
电池详细信息 - 每...周期：同上，应清除测试模式 - 在错误日志中显示数据：如果选中此框：发送和接收的数据显示在错误日志中，因此您可以轻松下载数据并在出现错误时将其发送给我。

## 德语：
## Ein wenig Erklärungen:
Prinzipiell ist der Adapter durch Anaylse der Datenpakete zwischen der BYD-App und dem BYD-Akku-System entstanden。 Es werden im Wesentlichen die Daten aus dem TAB System Info und aus dem TAB Diagnosis dargestellt。 Offensichtlich sind die Daten für "System Info" sofort in der Batterie bereit zum abholen, für die Diagnose-Daten sieht es so aus als wäre ein Messvorgang erforderlich, zwischen der Abfrage und den Werten muss ein Zeitintervall von gut 3 Sekunden eingehalten werden。

Ich bin mir nicht sicher ob das BYD-System durch zu häufige Abfragen beschädigt wird，也： Esist Dein Risiko was Du hier einträgst！

## Zu den Einstellungen:
Intervall: Zeitlicher Abstand zwischen den Abfragen des Adapters

IP-Adresse: Eigentlich logisch, damit ist die IP-Adresse des Adapters gemeint。 Dafür gibt es zwei Möglichkeiten: Entweder hält man sich an die Anleitung von Becker3 aus dem Photovoltaik-Forum, ist hier verlinkt: https://www.photovoltaikforum.com/thread/150898-byd-hvs-firmware-update/?postID= 2215343#post2215343。 Das hat den Vorteil das auch die BYD-APP läuft und man mit dieser direkt an die Daten, auch zum Vergleich, herankommt。 Oder man trägt "nur" die IP-Adresse die die die BYD-Box per DHCP erhalten hat ein。 Ausdrücklich waren möchte ich vor Änderungen an den IP-Einstellungen der BOX！ Im Forum kann man Berichte von Leute lesen die sich die Erreichbarkeit der Box dauerhaft Ruiniert haben。

Batterie-Details: Steuerung, ob die Details zu den Zellen gelesen werden sollen

Lesezyklen zu Batterie-Details: Anzahl der "Normal-Lese-Zyklen" bis wieder einmal die Diagnose-Daten gelesen werden。 Hier die Warnung dazu: Ich habe keine Idee ob man sich durch häufige Diagnose-Messungen Nachteile einhandelt, daher empfehle ich den Wert möglichst hoch zu setzen。 Ich wüsste auch nicht 是 man mit den Diagnose-Daten im regelmäßigen Poll anfangen sollte。

Zu den Batterie-Größen: Der Adapter funktioniert für Zelltemperaturen und ZellSpannungen bei 2-5 Batterie-Modulen。

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### 1.4.0 (2022-10-31)
* Update of referred modules (mainly around testing)
* improvmenets contributed by Tapter (5 modules, readme and better readable code)
* Better detection of battery type and inverter
* SOC not only from normal data but from diagnosis-data, too. There we have one decimal place more
* removed frequency limit for battery detail data
* increased max count of temperature measurements for HVS to 64
* support for up to 5 HVS modules

### 1.3.0 (2021-11-06)
* updated even more dependencies
* official release with new state SOH

### 1.2.4-0 (2021-11-02)
* Added state: SOH
* updated dependencies as suggested from bot

### 1.2.3 (2021-06-18)
* changed ratio of logo

### 1.2.2 (2021-06-14)
* bump to new patch-level (to get rid of the "-0")

###

## License
MIT License

Copyright (c) 2021 Christian <github@familie-herrmann.de>

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