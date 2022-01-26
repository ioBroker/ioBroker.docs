---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.upnp/README.md
title: ioBroker.upnp
hash: HJxTPvVhDbLKVrCZXT6q+fgUyDw1V6xjVS/RgGT+afE=
---
![商标](../../../en/adapterref/iobroker.upnp/admin/upnp-discovery.png)

![安装数量](http://iobroker.live/badges/upnp-stable.svg)
![商标](http://img.shields.io/npm/v/iobroker.upnp.svg)
![图像](https://travis-ci.org/Jey-Cee/ioBroker.upnp.svg?branch=master)

＃ioBroker.upnp
1. [Deutsch]（＃german_description）
* [是否是UPnP？]（＃was-ist-upnp）
* [Funktionsbeschreibung]（＃funktionsbeschreibung）
* [Objektstruktur]（＃objektstruktur）
* [Allgemeine Objekte]（＃allgemeine-objekte）
* [Upnp对象]（＃upnp-objekte）
* [Steuerung]（＃steuerung）
* [Geräte/ Dienst Spezifische Besonderheiten]（＃gerätedienst-spezifische-besonderheiten）

2. [English]（＃english_description）
* [什么是UPnP？]（＃what-is-upnp）
* [功能说明]（＃functional-description）
* [对象结构]（＃object-structure）
* [通用对象]（＃general-objects）
* [Upnp对象]（＃object-structure）
* [Control]（＃control）
* [设备/服务特定功能]（＃devices服务特定功能）

3. [变更日志]（＃changelog）

##德语说明
### Verwendungszweck
UPnP-FähigenGeräten的通讯与交互方向。

#### Ist UPnP吗？
UPnP =通用即插即用。国家标准化委员会在网络上发表的论文。
Dazu生成了“ Schemas”，以einer xml Datei dargestellt的形式删除了werden。有关信息和软件的信息，请联系我们。戴米特·迪恩斯（Dimitte）死于迪恩斯特（Dienste）和努兹巴（Nutzbar），罪恶之情。 Diese的Diese Beschreibung主题Diest的主题Schema，dadurchkönnenschnell Informationen和Befehle ausgetauscht werden ohne das esnötigist zu wissen um welches Modell oder von chemer Hersteller dasGerät。在世界范围内，标准化和软件技术都得到了认可。最佳实践者与物联网标准化组织“物联网–物联网”的最佳合作者。
达祖世界大战2016年是“开放连接基金会”，随后是UPnP论坛，随后是UPnP-法赫根汽车制造有限公司和标准帽子。

#### Funktionsbeschreibung
从头开始启动适配器，然后从头到尾开始广播。 Die Antworten Enthalten den链接到XML Dateien der Dienste。 ioBroker erzeugt和mit allenverfügbaren中的Anhand der xml Dateien werden die Objekte。

Zeitverzögert与Dienst gestartet der auf Nachrichten vonGeräten/ Diensten wartet死于其他人。 Neu erkannteGeräte/ Dienste werden automatisch zu den vorhandenenhinzugefügt。法国人和德国人自动贩卖机，德国人和阿邦尼埃特人身分证明书。

#### Objektstruktur
JedesGerätoder软件广播公司广播电视节目。 Unterhalb使Objekts死于Möglichkeiten。 DieMöglichkeitenwerden in 3 Kategorien（Rolle / role）eingeteilt：indicator.state，action和argument。

**州– **州捷克共和国的Objekts / Datenpunkts imGerät/ Dienst darstellt。 Jeder indicator.state hat einen bestimmten类型wie数字，字符串，布尔值，…。 Darüberhinaus ist inuch agenau festgelegt welchen Wert oder Wertebereich der inidcator.state哈本·坎恩（Haben Kann），安加本·辛德（Angeben Objekts）在内。
Bisher Implementierte本地人：

-sendEvents = Bedeutung bis jetzt Unbekannt。
-allowedValues =字符串死于Akzeptiert werden。
-最小值= Gibt den niedrigsten Zahlen饱受Akzeptiert的欢迎。
-最大值= Gibt denhöchstenZahlen浸透了Akzeptiert怪癖。
-步骤=在welsch Schritten ein Wertverändertwerden kann中的Gibt an。

**按钮– **“请求”由Befehl der an dasGerät/ den Dienst geschickt werden kann和von diesem Aktzeptiert wird设计。 Dieses Objekt hat im Regelfall ein Unterobjekt，争论不休。

**论点– ** ist Unterobjekt von einer Aktion-Channel。 Der Type ist“ gemischt” da nicht vorgegeben wird。在书呆子的《对象论》中找到了“信息交流”，“西恩·科嫩·冯·斯图恩·祖斯·安德斯·塞恩”的论点。
Bisher bekannte本地人：

-方向=在信息情报统计专家小组的调查中，Richtung陷入困境。

“在”中体现出了温特·基恩·维特·祖鲁克·格莱菲特的作用。
“ Out”代表着我们的智慧。

-relatedStateVariable = Gibt den indicator.state a derfürden Austausch der Daten

Zuständig主义者。

-argumentsNumber =保留操作权。

### Allgemeine Objekte
吉尔特人的历史发现/杰德·迪恩斯特与韦尔滕·祖尔·瓦尼通·本·提格特。在杰拉特/杰明里根州的杰克逊·贝桑德石油公司建立UPnP标准。

**活着– ** wird vomGerät/ Dienst auf“ true” gesetzt和vom适配器nach x Sekunden auf“ null” gesetzt，wenn dasGerät/ Dienst diesen nicht wieder auf“ true” setzt。活着的信号最大的生命是最大的本笃会时代。 Wenn einGerät身份不明身份。 Es istmöglich死于Skript auf的“真正”祖籍，das sollte jedoch nur gemacht werden wenn man sicher ist dass das Gerst / Dienst erreichbar主义者。 Wenn Alive manuell auf“ true”的gesetzt wurde解决了manuell auf“ false”的gesetzt werden wenn nicht mehrnötig，da andernfalls Fehler auftretenkönnen。

** Sid – **订购时的方向识别。 Diese sid wird jedesmal vom主持人erzeugt wenn eine订阅von einem客户angefordert wird。主持人definierten Zeit ab和daher wird sie immer wieder Aktualisiert。 Sie gilt nurfüreinen bestimmten Dienst。

** request – ** sendet einen SOAP request mit den gegebenen Optionen

### UPnP对象
可以在UPnP标准版和标准版中找到。 Es handelt sich hier nicht um eineVollständigeliste aller Objekte，死于Auswahl和Objekten stellt lediglichhäufigvorkommende Objekte dar。

**（A_ARG_TYPE_）InstanceID – **实例实例ID是由Instanz eines Dienstes angibt der angesprochen werden造成的。在实例ID中，实例ID =0。事件ID与事件消息von einem Dienst和jedem Befehl der einen Dienst gesendet wird，米特·伯格曼（mitübergeben）。

**（A_ARG_TYPE_）Channel（*）– **频道对象发现音频/视频目录。 Ein Channel muss zum Beispiel angwerben werden wenn dieLautstärkeverändertwerden soll。 MöglicheWertekönnenBeispielsweise“大师”，“ LF”或“ RF”系列。在贝斯比尔（Beispiel）的“大师”（AllgemeineLautstärke）舞蹈中，“ LF”链接了vorne，而“ RF”则链接了vorne。 Wenn jetzt dieLautstärkenur rechts vorneverändertwerden soll，频道第RF的“ RF”人

**（设置/获取）音量（*）– **音量对象发现音频/视频的数量。劳特斯塔克的安特根根·恩斯特内特·劳特斯塔克·恩斯泰根·恩斯特莱特。 Dieses Objekt的帽子浸入了Mindestwert和eminen的男装中，在meistenfällenliegt der Wertebereich zwischen 0和100中。Die Schrittweite liegt普通的bei 1，das beuteutet eskönnenenn glatte Zahlen。

### Steuerung
**按钮– **“请求” Eine Action告诉einen Befehl dar，der an dasGerät/ den Dienst geschickt werden kann。 Zu jeder Actiongehörenauch Argumente，死于Zwingend angegeben werdenmüssen。动作的犯错者是劳尔（Rolle / role），侵权行为“动作”。 Beschreibt man die wi der to be发送“发送”与der Befehl an dasGerät/ den Dienst gesendet。

** state.argument.x – ** Muss zwingend bei einer行动Angegeben werden，温特·罗尔（Rolle）“ state.argument.in” ist。 MöglicheWerte在“相关状态变量”中与Angdenben werdenkönnen/Müssen发现了关系。 Der名称为“ Related State Variable”（相关状态变量），其名称为“ native”->“ relatedStateVariable”提示。最佳自画像中的Argumentemüssen模具，hierzu gibt es“ native”-> Argument_No。 Ein Argument犯错误的人可能是围捕者Rolle / role，侵权行为“ argument”。曼彻斯特语录中的“Müssenmit einem”字符串。 Es kann nicht pauschal beantwortet werden wann das der Fall ist，aber bei komplexenstrings wie zum Beispiel URL的kann das der Fall sein。 hilft nur ausprobieren。将在einem论据übergebenmuss man“＆quot; verwenden中进行” man man ein“。

**（相关状态）变量– **可用的变量。在Native Native的der Variablen中，发现了verschiedene Informationen：

-allowValues = gibt变量或变量变量或变量行动gesweret werden kann。
-最小值=变数变暖焓值变元参量行动者行动kendenet werden kann。
-maximum = derhöchsteWert den die可变焓Kann oder als参数mit einer动作gesendet werden kann。
-步骤=在welchen Schritten ein Wert angegeben wird中绑定。
-sendEvents =吗？ MöglicheWerte表示“是”或“否”。 Es ist abervölligunklar是das zu bedeuten的帽子。纪念日/纪念日自动变数/永恒的自动变奏曲werden wenn“是的”。

贝斯派尔（Beispiel），一个男人死于Werte花粉kann：

```
// get every 10 seconds the values from device
schedule("*/10 * * * * *",  function () {
   setState( "upnp.0.FRITZ!Box_6590_Cable.WANDevice.WANCommonInterfaceConfig.GetCommonLinkProperties.request"/*GetCommonLinkProperties*/, true);
   setState( "upnp.0.FRITZ!Box_6590_Cable.WANDevice.WANCommonInterfaceConfig.GetAddonInfos.request"/*GetAddonInfos*/, true);
});
```

Es gibt可能死于“请求” Objekt das Polling im Admin einzustellen。 DafürKlickt man auf dasSchraubenschlüsselSymbol bei dem Objekt。

###Geräte/ Dienst Spezifische Besonderheiten
** Sonos：**FürQPlay ist es nichtmöglicheine Subscription zu erstellen。社会主义的强化

** Phillips Hue Bridge 2：**通过UPnP解释器，在Hue Bridge 2上的der Hue Bridge 2和Fehlerhaft中实现UPnP标准。

** Yamaha：** Verwendet eine auf dem UPnP标准basierende API，仅用于本征特征码Datenformat verwendet。 Derzeit wird das vom UPnP适配器不适用。

** Sony：** Verwendet ecal ScalarWebApi genannte Schnittstelle dieüberUPnP ansprechbar ist jedoch ein eigenes Daten Format verwendet。 Derzeit wird das vom UPnP适配器不适用。

** Amazon Kindle：** Stellt einen UPnP Dienst bereit，jedoch wird keine UPnP-Dienstbeschreibung geliefert和kann daher nichtzt werden。

##英文说明
***通过https://www.deepl.com/translator翻译***

＃＃＃ 有可能的使用
用于与所有支持UPnP的设备进行通信和交互。

####什么是UPnP？
UPnP =通用即插即用。尝试标准化网络上设备之间的通信。为此，存在所谓的“方案”，它们以xml文件的形式显示。它们包含有关所提供的设备或软件及其服务的所有信息。为了确保也可以使用这些服务，提供了每个服务的描述。该描述遵循为服务定义的方案，允许在不知道设备或软件是哪个型号或制造商的情况下快速交换信息和命令。过去，这种标准化主要用于媒体设备和软件。一段时间以来，还一直在努力通过这种标准化来标准化“ IoT-物联网”的通信。为此，成立于2016年的“开放连接基金会”负责UPnP论坛的任务，该论坛对支持UPnP的设备进行了认证并制定了标准。

＃＃＃＃ 功能说明
适配器在第一次启动时广播并评估响应。答案包含指向服务xml文件的链接。 xml文件用于在ioBroker中创建对象，并用所有可用信息填充它们。

延迟时间启动服务，该服务等待来自已登录或注销的设备/服务的消息。新检测到的设备/服务会自动添加到现有设备/服务中。第二个服务登录到每个可用设备并订阅状态消息，以便ioBroker会自动收到有关设备（服务）的任何更改（已发送）的通知。

####对象结构
对广播做出反应的每个设备或软件都被创建为一个单独的对象。在此对象下，您将找到所有可用服务及其功能。可能性分为3类（角色/角色）：指标。状态，动作和论点。

状态-**是表示设备/服务中对象/数据点当前状态的变量。每个indicator.state都有特定的类型，例如数字，字符串，布尔值，.....。此外，还明确指定了inidcator的值或值范围。状态可以具有，这些详细信息存储在对象的“本机”中。先前实现的native的：

-sendEvents =到目前为止的含义未知。
-allowedValues =可接受的字符串。
-最小值=给出接受该值的最小值。
-最大值=给出接受的最高值。
-step =指定可以更改值的步骤。

**按钮-**“ reuqest”是可以发送到设备/服务并由设备/服务接受的命令。这个对象通常有一个子对象，即参数。

** argument-**是动作的子对象。未指定类型为“混合”。对象的本机对象包含不同的信息，每个参数的参数可能不同。先前已知的本地人的：

-direction =指示信息流发生的方向。 In“表示未返回任何值。Out”表示已返回一个值。
-relatedStateVariable =返回指标。负责数据交换的状态。
-argumentsNumber =返回其操作的参数数量。

###常规对象
为每个设备/服务找到以下对象，并且这些对象是管理所必需的。它们不是UPnP标准或相应设备的设备/说明手册的一部分。

如果设备/服务没有再次将其设置为“ true”，则设备/服务将其设置为“ true”，并在x秒后由适配器将其设置为“ null”。到期时间取决于设备给定的Alive信号的最大寿命。设备注销后，状态将设置为“ false”。可以通过手工或脚本将此对象设置为“ true”，但是只有在确定设备/服务可以访问时，才应该这样做。如果将Alive手动设置为“ true”，则如果不需要，也应将其手动设置为“ false”，否则可能会发生错误。

** Sid-**用作订阅的标识。每次从客户端请求订阅时，主机都会创建此页面。 sid在主机定义的时间后运行，因此它一次又一次地更新。仅对特定服务有效。

### UPnP对象
此处列出的对象可以在UPnP标准和/或设备/目标描述中找到。这不是所有对象的完整列表，这种对象选择仅表示经常出现的对象。

**（A_ARG_TYPE_）InstanceID-** instanceID是最常见的并且是必需的，因为它指定了要寻址的服务的实例。在大多数情况下，instanceID =0。此ID与服务以及发送给服务的每个命令一起传递给每个事件消息。

**（A_ARG_TYPE_）Channel（*）-**通道对象与音频/视频服务关联。例如，如果要更改音量，必须指定一个通道。可能的值可以是例如“ Master”，“ LF”或“ RF”。在此示例中，“ Master”代表常规音量，“ LF”代表左前，“ RF”代表右前。如果只想在右前面板上更改音量，则必须在“通道”中指定“ RF”。

**（设置/获取）音量（*）-**音量对象与音频/视频服务关联。根据发生的位置，它用于显示音量或调整音量。该对象始终具有可以指定的最小值和最大值，在大多数情况下，值的范围在0到100之间。步长通常为1，这意味着只能输入偶数。

＃＃＃ 控制
**按钮-**“请求”操作是可以发送到设备/服务的命令。每个操作还包括必须指定为强制性的参数。动作可以通过其角色/角色（即“动作”）来识别。如果使用“发送”描述操作，则命令将发送到设备/服务。

** state.argument.x-**如果角色为“ state.argument.in”，则必须执行操作。可以/必须指定的可能值可以在“相关状态变量”中找到。此“相关状态变量”的名称存储在对象中的“本地”->“ relatedStateVariable”下。必须以一定顺序给出参数，为此，必须使用“本地”-> Argument_No。一个参数可以通过其角色/角色来识别，并在其中说“ argument”。某些字符串必须在数据点中写有““”“。不可能以统一的价格回答此问题，但是对于复杂的字符串（例如URL），情况可能就是这样。它只会帮助您尝试一下。如果要在参数中传递“”，则必须使用“”。

**（相关状态）变量-**这些是用于数据交换的变量。在变量的本机变量中，有一些信息：

-allowedValues =提供有关变量的可能内容或可作为参数与操作一起发送的内容的信息。
-最小值=变量可以包含的最小值或作为带操作的参数发送的最小值。
-maximum =变量可以包含的最大值，或作为带有操作的自变量发送的最大值。
-step =指示在哪个步骤中指定值。
-sendEvents =吗？可能的值为“是”或“否”。但这还不清楚。如果在sendEvents设置为“是”，则仅由设备/服务自动发送该变量的值的假设尚未得到确认。

示例如何轮询值：

```
// get every 10 seconds the values from device
schedule("*/10 * * * * *",  function () {
   setState( "upnp.0.FRITZ!Box_6590_Cable.WANDevice.WANCommonInterfaceConfig.GetCommonLinkProperties.request"/*GetCommonLinkProperties*/, true);
   setState( "upnp.0.FRITZ!Box_6590_Cable.WANDevice.WANCommonInterfaceConfig.GetAddonInfos.request"/*GetAddonInfos*/, true);
});
```

您可以通过对象配置在管理员中启用轮询。

###设备/服务特定功能
** Sonos：**无法为QPlay创建订阅。这可能需要身份验证。

** Phillips Hue Bridge 2：**在Hue Bridge 2中UPnP标准的实现是错误的，这就是为什么找到Hue Bridge 2但无法通过UPnP访问的原因。

** Yamaha：**使用基于UPnP标准的API，但使用其自己的数据格式。当前，UPnP适配器不支持此功能。

** Sony：**使用称为UPnP可寻址但使用其自己的数据格式的ScalarWebApi接口。当前，UPnP适配器不支持此功能。

** Amazon Kindle：**提供UPnP服务，但未提供UPnP服务描述，因此无法使用。

<！-下一个版本的占位符（在该行的开头）：

### __进展中__->

## Changelog
### __WORK IN PROGRESS__
* (bluefox) added support for Admin5

### 1.0.17 (2021-02-21)
* (jey-cee) fix warning messages with js-controller 3.2.x [Github issue #63](https://github.com/iobroker-community-adapters/ioBroker.upnp/issues/63)

### 1.0.16 (2020-04-27)
* (jey-cee) fixes for js-controller 3

### 1.0.15 (2019-08-27)
* (jey-cee) make control of devices work again (including player controls)

### 1.0.14 (2019-08-04)
* (bluefox) Tried to fix error with player

### 1.0.11 (2019-03-07)
* (bluefox) Invalid characters in XML will be replaced

### 1.0.7 (2019-03-01)
Breaking change: naming was changed and command to poll has another name - "request"
* (bluefox) refactoring
* (bluefox) scheduling per action configurable from admin

### 0.3.9
* fix auto discover

### 0.3.8
* (jey-cee) changes for object name's
* (jey-cee) fix for empty USN
* (jey-cee) added simple media player controls

### 0.3.7
* (jey-cee) fixed auto discover

### 0.3.6
*(jey-cee) fixed problem with settings

### 0.3.5
* (jey-cee) added option in settings for disable auto discover

### 0.3.4
* (jey-cee) added Travis-CI Tests

### 0.3.3
* (jey-cee) try to fix bug that cause to crash the adapter when sending actions
* (jey-cee) added unsubscribe on subscription error
* (jey-cee) added sync between Arguments and the related State Variable
* (jey-cee) fixed bug when sending an action and there comes no answer

### 0.3.2
* (jey-cee) updated version number from 0.2.4 to 0.3.2

### 0.3.0
* (jey-cee) added native Argument_No for object type argument
* (jey-cee) changed state update handling for event messages, fix for A_ARG_TYPE states
* (jey-cee) added possibility for controling UPnP devices

### 0.2.4
* (jey-cee) updated npm package node-upnp-subscriptions to resolve max handler problem
* (jey-cee) added support for 2nd stage deviceList
* (jey-cee) bugfix: iobroker stops while updating a lot of objects
* (jey-cee) added handling for initial messages from devices

### 0.2.3
* (jey-cee) fixed Dead message handler
* (jey-cee) added Subscription to service (only event message handling)
* (jey-cee) when adapter stops Alive state is set to false and sid(subscription id) is cleared

### 0.2.2
* (jey-cee) added listener for Alive/Dead messages from devices
* (jey-cee) if new devices joining the network they will added automatically
* (jey-cee) replace whitespace chars in device id's on creation, because objects and sub-object with whitespace chars wasn't usable

### 0.2.1
* (jey-cee) bug fixing: corrected creation of native's and smaller Bugs

### 0.2.0
* (jey-cee) getting all xml data from UPnP devices

### 0.1.0
* (jey-cee) initial release

## License
The MIT License (MIT)

Copyright (c) 2016-2021 Jey Cee <jey-cee@live.com>

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