---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.upnp/README.md
title: ioBroker.upnp
hash: qKl3jUBUbIAfp2+IKp9xFSeH5ZAUfTIlwtHbPgiTM3s=
---
![标识](../../../en/adapterref/iobroker.upnp/admin/upnp-discovery.png)

![安装数量](http://iobroker.live/badges/upnp-stable.svg)
![标识](http://img.shields.io/npm/v/iobroker.upnp.svg)
![图像](https://travis-ci.org/Jey-Cee/ioBroker.upnp.svg?branch=master)

# IoBroker.upnp
1. [德语](#german_description)
	 * [是 UPnP 吗？](#was-ist-upnp)
	 * [Funktionsbeschreibung](#funktionsbeschreibung)
	 * [对象结构](#objektstruktur)
	 * [Allgemeine Objekte](#allgemeine-objekte)
	 * [Upnp 对象](#upnp-objekte)
* [维护](#维护)
	 * [Geräte/Dienst Spezifische Besonderheiten](#gerätedienst-spezifische-besonderheiten)

2. [英语](#english_description)
* [什么是 UPnP？](#what-is-upnp)
* [功能描述](#function-description)
* [对象结构](#object-structure)
* [一般对象](#general-objects)
* [Upnp 对象](#object-structure)
* [控制](#控制)
* [设备/服务特定功能](#devicesservice-specific-features)

3. [变更日志](#changelog)

## 德语描述
### 适用条件
UPnP-Fähigen Geräten 的通讯和交互。

#### 是什么 UPnP？
UPnP = 通用即插即用。这是通信网络的标准化。
Dazu 提供了 sogenannte“Schemas”，以 einer xml Datei dargestellt 的形式提供。请注意所有信息都来自于软件或软件，并且这些信息也非常重要。 Damit diese auch Nutzbar sind, wird auch eine Beschreibung zu jedem Dienst mitgeliefert. Diese Beschreibung folgt dem für den Dienst festgelegten Schema，dadurch können schnell Informationen und Befehle ausgetauscht werden ohne das es nötig ist zu wissen um welches Modell oder von welchem Hersteller das Gerät oder die Software ist。  在Mediengeräte 和软件genutzt 的所有标准中。 Seit einiger Zeit gibt es Bestrebungen auch die Kommunikation des “IoT – Internet of Things” mit dieser Standardisierung zu vereinheitlichen.
Dazu wurde 2016 是“开放连接基金会”的一部分，是 UPnP 论坛的一部分，也是 UPnP-Fähigen Geräten durchgeführt 和 Standards erstellt hat 的认证。

#### 功能说明
适配器将开始在 Antworten 中开始广播和广播。 Die Antworten enthalten den Link zu den xml Dateien der Dienste。 ioBroker 中的对象和 xml 日期已包含在 ioBroker 中并包含所有信息。

Zeitverzögert wird ein Dienst gestartet der auf Nachrichten von Geräten/Diensten wartet die sich anoder abmelden。 Neu erkannte Geräte/Dienste werden automatisch zu den vorhandenen hinzugefügt。在任何情况下，您都可以在 Gerätes 和 Abonniert Statusmeldungen 中进行操作，但请注意 ioBroker 的操作（die gesendet wrd） des Gerätes/Dientes automatisch mitgeteilt。

#### 对象结构
Jedes Gerät oder Software die auf den Broadcast reagiert wrd als eigenständiges Angelegt. Unterhalb dieses Befinden sich alle bereitgestellten Dienste mit ihren Möglichkeiten。 Die Möglichkeiten werden 分为 3 个类别（角色/角色）：指标、状态、行动和论证。

**状态 –** 是在 Gerät/Dienst darstellt 中的对象/数据点中的当前变量。 Jeder Indicator.state hat einen bestimmten 输入数字、字符串、布尔值……。 Darüber hinaus ist auch genau festgelegt welchen Wert oder Wertebereich der inidcator.state haben kann, diese Angaben sind im “native” eines Objektshinterlegt.
Bisher 实现了本地人的：

- sendEvents = Bedeutung bis jetzt Unbekannt。
- allowedValues = 字符串在 Akzeptiert werden 中。
- 最小值 = Gibt den niedrigsten Zahlen wert an der Akzeptiert wird。
- 最大值 = Gibt den höchsten Zahlen wert an der Akzeptiert wird。
- 步骤 = Gibt an in welchen Schritten ein Wert verändert werden kann。

**按钮 –** “请求”是 Befehl der an das Gerät/den Dienst geschickt werden kann und von diesem Aktzeptiert wird。 Dieses Objekt hat im Regelfall ein Unterobjekt, das argument.

**参数 –** ist ein Unterobject von einer Aktion-Channel。 Der Type ist „gemischt“ da er nicht vorgegeben wrd。在本地人的 des Objekts finden sich verschiedene Informationen 中，sie können von argument zu argument anders sein。
Bisher bekannte 当地人的：

- 方向 = Gibt die Richtung an in der der Informationsfluss statt findet。

“In” bedeutet es wird kein Wert zurück geliefert。
“Out”是在 Wert zurück geliefert 中进行的。

- relatedStateVariable = Gibt den Indicator.state an der für den Austausch der Daten

基本情况是。

- argumentNumber = Gibt an das wievielte Argument der Action es ist。

### 一般对象
Die folgenden Objekte finden sich für jedes Gerät/jeden Dienst und werden zur Verwaltung benötigt。 Sie sind nicht Bestandteil des UPnP Standards oder der Geräte-/Dienstbeschreibung des jeweiligen Gerätes。

**Alive –** wird vom Gerät/Dienst auf“true”gesetzt 和 vom Adapter nach x Sekunden auf“null”gesetzt，wenn das Gerät/Dienst diesen nicht wieder auf“true”setzt。 Die Ablauf zeit ist abhängig davon welche maximal Lebensdauer vom Gerät für das Alive signal mitgeteilt wurde。 Wenn ein Gerät sich abmeldet wrd der Status auf “虚假的法律”。 Es ist möglich dieses Objekt von Hand oder per Skript auf „true“ zu setzen, das sollte jedoch nur gemacht werden wenn man sicher ist dass das Gerät/Dienst erreichbar ist.曼努埃尔在“真实”的意义上是正确的，但在“假”的意义上，曼努埃尔在“真实”的意义上是正确的。

**Sid –** Dient 是订阅中的身份识别。该 sid wird jedesmal vom 主机 erzeugt wenn eine 订阅 von einem 客户端 angefordert wird。主机定义了时间，然后就结束了。 Sie gilt nur für einen bestimmten Dienst。

**请求 –** 发送一个带有选项的 SOAP 请求

### UPnP 对象
这是在 UPnP 标准和/或 Geräte-/Dinestbeschreibungen 中找到的对象。 Es handelt sich hier nicht um eine Vollständige liste aller Objekte, diese Auswahl an Objekten stellt lediglich häufig vorkommende Objekte dar.

**(A_ARG_TYPE_)InstanceID –** InstanceID ist am Häufigsten zu finden und wird zwingend benötigt da sie die Instanz eines Dienstes angibt der angesprochen werden soll。在发生故障时，InstanceID = 0。事件消息的 ID 会随着事件的发生而变化。

**(A_ARG_TYPE_)Channel(*) –** Das Channel Objekt findet sich im Zusammenhang mit Audio/Video Diensten。每个频道的音乐都已被播放过，并且已被播放过。 Mögliche Werte können Beispielsweise “Master”、“LF” 或 “RF” sein。在这一切中，“Master”代表Allgemeine Lautstärke，“LF”代表链接，“RF”代表法律。 Wenn jetzt die Lautstärke nur rechts vorne verändert werden soll，gibt man „RF“ bei Channel an。

**(Set/Get)Volume(*) –** Das Volume Objekt findet sich im Zusammenhang mit Audio/Video Diensten。我很高兴知道 Lautstärke 的 Anzeigen der Lautstärke genutzt 或 zum einstellen der Lautstärke。目标对象包含在 0 和 100 的 Wertebereich zwischen 中的每个 Mindestwert 和 Einen Maximalwert 中。Die Schrittweite liegt 正常 bei 1，das bedeutet es können nur glatte Zahlen angegeben werden。

### 管理
**按钮 –** “请求” Eine Action stellt einen Befehl dar, der an das Gerät/den Dienst geschickt werden kann。如果您采取了行动，请采取行动，然后再进行讨论。动作的核心人物是角色，即“动作”。 Beschreibt man die Action mit “send” wird der Befehl and das Gerät/den Dienst gesendet。

**state.argument.x –** Muss zwingend bei einer Action angegeben werden，wenn unter Rolle“state.argument.in” ist。 Mögliche Werte die angegeben werden können/müssen 在“相关状态变量”中找到人。名称“相关状态变量”是“本机”->“相关状态变量”提示下的对象。  Die Argumente müssen in einer bestimmten Reihenfolge angegeben werden, hierzu gibt es „native“ -> Argument_No. Ein Argument erkennt man an seiner Rolle/role, dort steht “argument”。  曼什弦乐在“Datanpunkt geschrieben werden”中被称为“”。 Es kann nicht pauschal beantwortet werden wann das der Fall ist, aber bei komplexen string wie zum Beispiel URL's kann das der Fall sein. Hier hilft nur ausprobieren。 Will man ein " in einem Argument übergeben muss man "" verwenden.

**（相关状态）变量 –** Es handelt sich um Variablen die für den Datenaustausch genutzt werden。在 Den Native 的 der Variablen finden sich verschiedene Informationen 中：

- allowedValues = gibt Auskunft über die möglichen Inhalte der Variable oder was als Argument mit einer Action gesendet werden kann。
- 最小值 = der niedrigste Wert den die 变量 enthalten kann oder als Argument mit einer Action gesendet werden kann。
- max= der höchste Wert den die Variable enthalten kann oder als Argument mit einer Action gesendet werden kann。
- 步骤 = gibt an in welchen Schritten ein Wert angegeben wrd。
- 发送事件 = ? Mögliche Werte sind “是”或“否”。 Es ist aber völlig unklar was das zu bedeuten hat。 Die Annahme dass die Werte für diese Variable nur dann von einem Gerät/Dienst automatisch gesendet werden wenn “yes” bei sendEvents steht hat sich nicht bestätigt。

Beispiel，wie man die Werte pollen kann：

```
// get every 10 seconds the values from device
schedule("*/10 * * * * *",  function () {
   setState( "upnp.0.FRITZ!Box_6590_Cable.WANDevice.WANCommonInterfaceConfig.GetCommonLinkProperties.request"/*GetCommonLinkProperties*/, true);
   setState( "upnp.0.FRITZ!Box_6590_Cable.WANDevice.WANCommonInterfaceConfig.GetAddonInfos.request"/*GetAddonInfos*/, true);
});
```

这是在 Admin einzustellen 中通过“请求”对象进行投票的。 Dafür Klickt man auf das Schraubenschlüssel Symbol bei dem Objekt。

### Geräte/Dienst Spezifische Besonderheiten
**Sonos：** Für QPlay ist es nicht möglich eine Subscription zu erstellen。 Möglicherweise ist hierfür eine Autentifikation notwendig

**Phillips Hue Bridge 2：** Hue Bridge 2 中的 UPnP 标准实现是 Fehlerhaft，我们可以通过 UPnP ansprechbar ist 来使用 Hue Bridge 2。

**Yamaha：** UPnP 标准基本 API 的版本，即其特征数据格式版本。 UPnP 适配器不可用。

**索尼：** 说明 ScalarWebApi 生成 UPnP 和数据格式的说明。 UPnP 适配器不可用。

**Amazon Kindle：** 启用 UPnP 后，即可使用 UPnP-Dienstbeschreibung geliefert 并可在此处查看。

## 英文描述
***翻译自https://www.deepl.com/translator***

### 预期用途
用于与所有支持 UPnP 的设备进行通信和交互。

#### 什么是 UPnP？
UPnP = 通用即插即用。旨在标准化网络上设备之间的通信。为此，存在所谓的“模式”，它们以 xml 文件的形式显示。它们包含有关设备或软件及其提供的服务的所有信息。为了确保这些服务也可以使用，提供了每项服务的描述。此描述遵循为服务定义的方案，允许快速交换信息和命令，而无需知道设备或软件的型号或制造商。过去，这种标准化主要用于媒体设备和软件。一段时间以来，人们也一直在努力通过这种标准化来标准化“IoT - 物联网”的通信。为此，“开放连接基金会”于 2016 年成立，接管了 UPnP 论坛的任务，该论坛已对支持 UPnP 的设备进行了认证并制定了标准。

#### 功能描述
适配器在第一次启动时广播并评估响应。答案包含指向服务的 xml 文件的链接。xml 文件用于在 ioBroker 中创建对象并用所有可用信息填充它们。

延时启动一项服务，等待来自登录或注销的设备/服务的消息。新检测到的设备/服务会自动添加到现有设备/服务中。第二个服务登录到每个可用设备并订阅状态消息，这样 ioBroker 就会自动收到设备/服务的任何更改（发送）通知。

#### 对象结构
每个对广播作出反应的设备或软件都创建为一个单独的对象。在此对象下，您将找到所有可用的服务及其功能。可能性分为 3 个类别（角色/角色）：指示器、状态、动作和参数。

**state -** 是一个变量，表示设备/服务中对象/数据点的当前状态。每个 indicator.state 都有特定的类型，如数字、字符串、布尔值等......此外，还指定了 inidcator.state 可以具有的确切值或值范围，这些详细信息存储在对象的“本机”中。先前实现的本机：

- sendEvents = 含义至今未知。
- allowedValues = 可以接受的字符串。
- 最小值 = 给出可以接受的最低值。
- 最大值 = 给出接受的最高值。
- step = 指定可以在哪些步骤中改变值。

**按钮 -** “请求” 是可以发送给设备/服务并被设备/服务接受的命令。此对象通常有一个子对象，即参数。

**参数 -** 是操作的子对象。由于未指定类型，因此类型为“混合”。对象的本机包含不同的信息，它们可能因参数而异。先前已知的本机：

- direction = 表示信息流的方向。“In”表示不返回任何值。“Out”表示返回一个值。
- relatedStateVariable = 返回指标。负责数据交换的状态。
-argumentNumber = 返回该操作的参数数量。

### 一般对象
以下对象适用于每个设备/服务，并且是管理所必需的。它们不是 UPnP 标准或相应设备的设备/说明手册的一部分。

**Alive -** 由设备/服务设置为“true”，如果设备/服务没有再次将其设置为“true”，则适配器在 x 秒后将其设置为“null”。到期时间取决于设备给出的 Alive 信号的最大生存期。当设备注销时，状态设置为“false”。可以手动或通过脚本将此对象设置为“true”，但只有在您确定设备/服务可访问时才应这样做。如果已手动将 Alive 设置为“true”，则如果不再需要，也应手动将其设置为“false”，否则可能会出现错误。

**Sid -** 用作订阅的标识。每次从客户端请求订阅时，主机都会创建此页面。sid 在主机定义的时间后运行，因此会不断更新。它仅对特定服务有效。

### UPnP 对象
此处列出的对象可以在 UPnP 标准和/或设备/dinest 描述中找到。这不是所有对象的完整列表，此对象选择仅代表经常出现的对象。

**(A_ARG_TYPE_)InstanceID -** instanceID 是最常见的，也是必需的，因为它指定要寻址的服务实例。在大多数情况下，instanceID = 0。此 ID 随服务的每个事件消息和发送到服务的每个命令一起传递。

**(A_ARG_TYPE_)Channel (*) -** 通道对象与音频/视频服务相关联。例如，如果您想更改音量，则必须指定通道。可能的值可以是，例如，“Master”、“LF”或“RF”。在此示例中，“Master”代表一般音量，“LF”代表左前，“RF”代表右前。如果您只想更改右前面板的音量，则必须在 Channel 中指定“RF”。

**(设置/获取)音量 (*) -** 音量对象与音频/视频服务相关。根据其出现的位置，它用于显示音量或调整音量。此对象始终具有可指定的最小值和最大值，在大多数情况下，值的范围在 0 到 100 之间。步长通常为 1，这意味着只能输入偶数。

＃＃＃ 控制
**按钮 -**“请求”操作是可以发送到设备/服务的命令。每个操作还包括必须指定为必需的参数。操作可以通过其角色/角色来识别，即“操作”。如果您用“发送”描述操作，则命令将发送到设备/服务。

**state.argument.x -** 如果角色为“state.argument.in”，则对于操作是必需的。可以在“相关状态变量”中找到可以/必须指定的可能值。此“相关状态变量”的名称存储在“native”->“relatedStateVariable”下的对象中。必须按特定顺序给出参数，为此有“native”-> Argument_No。可以通过其角色/角色识别参数，其中显示“参数”。某些字符串必须在数据点中用“”“”书写。无法以固定费率的方式回答这个问题，但对于像 URL 这样的复杂字符串，情况可能如此。尝试一下只会有所帮助。如果您想在参数中传递“，则必须使用“””。

**(相关状态)变量 -** 这些是用于数据交换的变量。在变量的 Native 中，有一些信息：

- allowedValues = 提供有关变量可能的内容或可以作为动作参数发送的内容的信息。
- 最小值 = 变量可以包含的最小值或作为动作参数发送的最小值。
- 最大值 = 变量可以包含或作为动作参数发送的最高值。
- step = 表示在哪些步骤中指定了值。
- sendEvents = ? 可能的值是“yes”或“no”。但这是什么意思完全不清楚。只有在 sendEvents 中设置了“yes”时，设备/服务才会自动发送此变量的值，这一假设尚未得到证实。

如何轮询值的示例：

```
// get every 10 seconds the values from device
schedule("*/10 * * * * *",  function () {
   setState( "upnp.0.FRITZ!Box_6590_Cable.WANDevice.WANCommonInterfaceConfig.GetCommonLinkProperties.request"/*GetCommonLinkProperties*/, true);
   setState( "upnp.0.FRITZ!Box_6590_Cable.WANDevice.WANCommonInterfaceConfig.GetAddonInfos.request"/*GetAddonInfos*/, true);
});
```

您可以通过对象配置在管理员中启用轮询。

### 设备/服务特定功能
**Sonos：**无法为 QPlay 创建订阅。这可能需要身份验证。

**Phillips Hue Bridge 2：**Hue Bridge 2 中 UPnP 标准的实现存在缺陷，这就是为什么可以找到 Hue Bridge 2 但无法通过 UPnP 访问的原因。

**Yamaha：**使用基于 UPnP 标准的 API，但使用自己的数据格式。目前，UPnP 适配器不支持此功能。

**索尼：**使用名为 UPnP 可寻址的 ScalarWebApi 接口，但使用其自己的数据格式。目前，UPnP 适配器不支持此功能。

**Amazon Kindle：**提供 UPnP 服务，但没有提供 UPnP 服务描述，因此无法使用。

<!-- 下一版本的占位符（在行首）：

### **正在进行中** -->

## Changelog

### 1.1.0 (2024-09-30)
* (Jey Cee) Migrate config to JSONConfig 
* (Jey Cee) Fix issues found by adapter checker
* (Jey Cee) Use default test and release action

### 1.0.21 (2022-02-27)
* small fixes

### 1.0.20 (2021-12-04)
* (foxriver76) ensure compatibility with future controller versions
__requires controller v3.3.0__

### 1.0.19 (2021-05-28)
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

Copyright (c) 2016-2024 Jey Cee <iobroker@all-smart.net>

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