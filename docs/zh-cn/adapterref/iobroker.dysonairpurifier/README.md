---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.dysonairpurifier/README.md
title: ioBroker.dysonAirPurifier
hash: TrVvrFSq4u7AaaRxKlcy45ySYcqrWFFO5HjRluhLbPc=
---
# IoBroker.dysonAirPurifier
![徽标](admin/dyson_logo.svg)![徽标](../../../en/adapterref/iobroker.dysonairpurifier/admin/dyson_pure_cool.jpg)

![安装数量（最新）](http://iobroker.live/badges/dysonairpurifier-installed.svg)
![NPM 版本](https://img.shields.io/npm/v/iobroker.dysonairpurifier.svg)
![安装数量（稳定）](http://iobroker.live/badges/dysonairpurifier-stable.svg)
![已知漏洞](https://snyk.io/test/github/Grizzelbee/ioBroker.dysonairpurifier/badge.svg)
![新公共管理](https://nodei.co/npm/iobroker.dysonAirPurifier.svg?downloads=true)
![执照](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![下载](https://img.shields.io/npm/dm/iobroker.dysonairpurifier.svg)

[![测试与发布](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/actions/workflows/test-and-release.yml) ![CodeQL](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/actions/workflows/codeQL.yml/badge.svg)

## 适用于戴森空气净化器和风扇的 ioBroker 适配器
此适配器可将 ioBroker 连接到各种戴森空气净化器。
徽标中的风扇图标由 [Freepik](https://www.flaticon.com/de/autoren/freepik) 来自 [www.flaticon.com](https://www.flaticon.com/de/) 创建。

&gt; 如果您喜欢这个适配器并考虑支持我<br/>&gt; [![使用 PayPal 捐款](admin/paypal-donate-button.png)](https://www.paypal.com/donate/?hosted_button_id=SPUDTXGNG2MYG)

### 支持的设备
- 戴森 Pure Humidify+Cool（PH01，产品类型 358）
- 戴森 Pure Humidify+Cool（PH03，产品类型 358E）
- 戴森 Pure Humidify+Cool 甲醛 (PH04, 产品类型 358K)
- 戴森 Pure Cool Tower，2018 年型号（TP04，产品类型 438）
- 戴森 Pure Cool Tower 甲醛净化器，2018 年型号（TP07，产品类型 438E）
- 戴森 Pure Cool Tower 甲醛净化器，2018 年型号（TP07，产品类型 438K）
- 戴森 Pure Hot+Cool Link（HP02，产品类型 455）
- 戴森 Pure Hot+Cool Link 新品（产品类型 455A）
- 戴森 Pure Cool Link 书桌（DP01，产品类型 469）
- 戴森 Pure Cool Link Tower（TP02，产品类型 475）
- 戴森 Pure Cool Desk，2018 年型号（DP04，产品类型 520）
- 戴森 Pure Hot+Cool，2018 年型号（HP04，产品类型 527）
- 戴森 Pure Hot+Cool（HP07，产品类型 527E）
- 戴森 Pure Hot+Cool 甲醛 (HP09, 产品类型 527K)
- 戴森大号+静音甲醛净化器（BP03，产品型号664）

＃＃ 特征
将您的戴森风扇、风扇加热器、空气净化器和空气加湿器连接到 ioBroker。

- 从设备和传感器读取值
- 可以通过让您改变某些值（主功率、振荡、加热、风扇速度等）来控制设备。
- 从戴森服务器读取设备列表
- 处理无限数量的粉丝（当然，实际上您的 ioBroker 主机的资源限制了数量）。

工作原理
启动时，戴森云会查询所有绑定到您帐户的已知设备及其 MQTT 密码。获取该列表后，适配器即可本地连接到所有设备并进行交互。

- 只需连接到戴森云即可获取绑定到您帐户的设备列表及其 MQTT 密码。
- 因此，只有在适配器启动时才能识别新设备。
- 戴森云仅在适配器启动期间被查询一次。
- 戴森风扇充当 MQTT 服务器，适配器充当客户端。
- 设备和适配器之间的所有通信仅在本地进行。
- 适配器中的所有连接信息都会在重启期间被删除并重新建立。

＃＃ 安装
### 先决条件
- 此适配器需要 Node.js >= 版本 18.2
- 至少需要 js-Controller 3.0.0
- 至少需要 Admin 6.0.0
- 要运行此适配器，您需要一个戴森帐户。
- 请务必将你的粉丝添加到你的帐户。无论是通过应用程序还是在线添加。

### 适配器安装
使用 npm
在您的 ioBroker 安装上运行 `npm install iobroker.dysonairpurifier` 以从 npm 存储库中获取此适配器的最新版本。

#### 替代方案：使用 GitHub URL
通过 ioBroker 管理 UI 安装，将其指向 GitHub 上的最新稳定版本：<https://github.com/Grizzelbee/ioBroker.dysonairpurifier/tarball/master/>

您也可以使用这些方法安装旧版本（通过指向版本标签，例如 URL 中的`v0.6.0`而不是`master`），但通常首选最新版本。

### 需要配置数据
- 戴森帐户用户名
- 戴森账户密码（此适配器可处理最多 32 个字符的密码）
- 您的 LAN 中的风扇/空气净化器的 IP 地址（并非所有情况）。

戴森用户名和密码是常规配置数据，需要在适配器的配置页面中输入。
不同之处在于，IP 地址输入到设备树中“SSSSS_1”标签页的“SSSSS_0”字段中。

#### 如何配置适配器
> 此适配器首次常规启动时，会查询您的所有设备，并在设备树中创建所有受支持的设备——其基本信息由 API 提供，并包含一个附加字段 `Hostaddress`。
> > 因此，请运行一次适配器，您的戴森设备将在设备树中创建，并包含其基本设置。
> > 然后停止适配器，在设备树中的 `Hostaddress` 字段中输入 IP 地址，并重新启动适配器。之后，设备树中的戴森设备应该会填充数据。

_请注意_：由于戴森的 mDNS 实施不符合要求，您需要在_首次运行后_提供设备的本地 IP。

_附加说明_：自 0.7.1 版本起，只要未提供主机地址/IP，适配器就会尝试通过其主机名（序列号）连接到设备。此功能在两个前提条件下有效：

1. 您的局域网中正在运行 DNS 服务器。DNS 服务器位于您的路由器中（例如，FritzBox 就运行 DNS 服务器），或者位于专用的路由器中。
2.您没有更改默认设备名称。
3. 设备名称已正确映射到其 IP（如果您手动管理 DNS）。

### 双因素身份验证（自 V0.9.0 起）
安装适配器后，它应该会自动启动 - 如果没有，请先启动它。
更新后，它也会自动重启。在这两种情况下，它都会保持“黄色”状态，并且可能会在日志中显示一些错误 - 目前这样就没问题了。

- 打开适配器的配置对话框
- 至少填写您的电子邮件地址、密码和国家代码 - 其余部分是可选的
- 点击 2FA 代码电子邮件按钮启动该流程
- 您将在相应字段中自动收到“challengeId”、一封电子邮件和一个包含进一步说明的对话框
- 在“戴森一次性密码”字段中输入电子邮件中的 6 位代码
- 点击“完成”按钮
- 之后你应该会收到来自戴森的令牌（出于安全目的不可见）
- 完成设置后单击“保存并关闭” - 适配器应重新启动并变为绿色。

所有值都将被保存并进一步显示。

> 通常您不需要定期执行这 2 个 FA - 但您可以在需要时重复执行此操作。

#### 如果您在双重身份验证 (2-FA) 期间遇到 401 问题，请尝试以下解决方法：
1. 退出戴森智能手机应用程序
2. 等待几分钟
3. 将您的登录数据输入适配器（如果尚未完成）并按照 2FA 程序进行操作直至最后。
4. 适配器应启动并变为绿色。
5.等待一段时间（最多一个小时或更长时间，因为戴森在短时间内阻止了太多的请求）
6.如果您想使用，请重新登录您的戴森智能手机应用程序。

## 控制您的设备
此适配器目前可以控制您的设备的以下状态：

- FanMode，设备模式（手动，自动，关闭）
- FanSpeed，当前风扇转速
- 夜间模式，夜间模式状态
- 振荡，风扇振荡（开，关）。
- OscillationRight、OscillationAngle 上边界
- OscillationLeft、OscillationAngle 下边界
- 振荡角度，振荡角度
- 连续监测，即使设备关闭，也能连续监测环境传感器。
- MainPower，风扇的主电源。
- AutomaticMode，风扇处于自动模式。
- 气流方向，风扇吹向的方向。开启=向前；关闭=向后（又称喷射聚焦）
- Jetfocus，风扇吹向的方向。开启=向前；关闭=向后（又称 Jet focus）
- 加热模式，加热模式[开/关]
- HeatingTargetTemp，加热目标温度
- AirQualityTarget，自动模式的目标空气质量。
- 加湿模式，开/关
- 自动加湿模式，自动/关闭
- 自动加湿目标，自动加湿目标
- 加湿目标，手动加湿目标
- 温度单位，显示温度值的单位（风扇显示）。
- 水硬度，软，中，硬

据目前所知，这些状态的可能值如下所示。
风扇速度仅允许 1 到 10 之间的值以及“自动”模式。如果您想将风扇速度降至 0，则需要关闭主电源。
戴森应用程序也这样做。

### SystemStates 文件夹（自 2.4.0 起）
设备能够报告故障。此功能已添加到适配器版本 2.4.0 中。
目前，故障信息仅供参考，且数据点因设备而异。
如果您有关于故障的更详细信息，请随时报告给我，以便改进适配器。
所有状态均报告是否存在故障。`True` 表示故障，`false` 表示“无故障”。

### 轮询间隔
- 从 v3.2.2 开始，轮询间隔设为 0 肯定会禁用轮询。之前由于数学原因，这个功能可能有效，但目前尚不确定，而且存在未知的副作用。

了解这一点很有用，因为设备通常会在状态发生变化时自行发送（至少我的设备是这样）。使用此设置有助于通过停止不必要的轮询来减少网络流量。

### 已知问题
- 无法自动检测设备的 IP 地址
- 仍然有许多未知的设备消息（主要是故障和警告）
- 由于正确的 mqtt 消息未知，因此无法重置过滤器
- 有时适配器会丢失与风扇的 MQTT 连接，并且无法重新连接。“这通常不是适配器本身的问题，而是本地网络的问题！”
- 在某些情况下，只需拔掉风扇电源插头约10秒钟即可重置，然后再重新插上即可。不妨试试！
- 其他情况下，是 IP/DNS 问题。重置 DHCP/DNS 服务器（路由器）即可解决问题。

## 戴森 API 数据（消息有效载荷）的解释
信息复制并扩展自 <https://github.com/shadowwa/Dyson-MQTT2RRD/blob/master/README.md>

### 当前状态
| 名称 | 含义 | 可能的值 | 单位 |
|--------------|------------------------------------------------------------|----------------------|------|
| 模式原因 | 当前模式已由 RemoteControl、App、Scheduler 设置 | PRC、LAPP、LSCH、PUI | |
| 状态原因 | | 模式 | |
| rssi | WIFI强度 | -100 - 0 | dBm |
| 频道 | WIFI频道 | 52 | |
| fqhp |                                                            | 96704 |      |
| fghp | | 70480 | |

产品状态
| 名称 | 含义 | 可能的值 | 单位 |
| ---- | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | --- |
| ercd | 最后错误代码 | NONE ，或一些十六进制值 | |
| filf | 剩余滤芯寿命 | 0000 - 4300 | 小时 |
| fmod | 模式 | 风扇，自动，关闭 | |
| fpwr | 主电源 | 开启，关闭 | |
| fnst | 风扇状态 | 开启，关闭，风扇 | |
| fnsp|风扇转速 | 0001 - 0010，自动 |                                     |
| fdir | Fandirection 又名喷射焦点/ ON=前，OFF=后 | ON，OFF | |
| ffoc | JetFocus | 开启，关闭 | |
| nmod | 夜间模式 | 开启，关闭 | |
| oson | 振荡 | 开 , 关 | |
| osal | 振荡角度下限 | 0005 - 355 | ° （度）|
| osau | 振荡角度上边界 | 0005 - 355 | ° （度）|
| oscs | 振荡活动 | 开启，关闭，空闲 | |
| ancp | 振荡角度 | CUST, 0180 | °（度）|
| qtar | 空气质量目标 | 0001=好，0002=正常，0003=差，0004=非常差 | |
| rhtm | 持续监测 | 开启，关闭 | |
| 自动 | 自动模式 | 开，关 | |
| nmdv | 夜间模式最大风扇速度？| 0004 | |
| cflr | 碳过滤器状态 | 0000 - 0100 | 百分比 |
| cflt|碳过滤器| CARF，无 |                                     |
| hflr | HEPA过滤器状态 | 0000 - 0100 | 百分比 |
|哈弗 | HEPA 过滤器 | GHEP、GCOM |                                     |
| sltm | 睡眠定时器 | 开启，关闭 | | |
| hmod | 加热器模式 [开/关] | 加热 | |
| hmax | 加热目标温度 | 0 .. 5000 | K |
| hume | 加湿模式 | 开，关，| |
| haut | 自动加湿模式 | HUMIDIFY_AUTO_MODE_ON, HUMIDIFY_AUTO_MODE_OFF | |
| humt | 加湿目标 | HUMIDIFICATION_MODE_OFF, HUMIDIFICATION_MODE_THIRTY, HUMIDIFICATION_MODE_FORTY, HUMIDIFICATION_MODE_FIFTY, HUMIDIFICATION_MODE_SIXTY, HUMIDIFICATION_MODE_SEVENTY | |
| cdrr | CleanDurationRemaining | 整数 | 分钟 |
| 矩形 | 自动加湿目标 | 整数 | % |
| cltr | TimeRemainingToNextClean | 整数 | 小时 |
| wath | 水硬度 | 软="2025", 中="1350", 硬="0675" | |
|瓦CD |警告代码 |没有... |                                     |
| rstf | 重置过滤器生命周期 | 'RSTF', 'STET', RESET_FILTER_LIFE_IGNORE, RESET_FILTER_LIFE_ACTION | |
|科尔夫|温度格式 | ON=摄氏度，OFF=华氏度 |                                     |
| clcr | DeepcleanCycle | CLNO=非活动，CLAC=深度清洁正在进行中，CLCM=已完成 | |
| hsta | 加热状态 | ACTIVE/IDLE | |
| msta | 加湿状态 | 活动/空闲 OFF, HUMD | |
|聚苯乙烯 | [HP0x] 未知 | INIT、CLNG、INV、OFF |                                     |
| bril | 未知 | 0002 | 低级，中级，高级 |
| fqhp | 未知 | | |
| 倾斜 | [HP0x] 未知 | 字符串 | |
| 拨号 | [DP0x] 未知 | | |

| 错误代码 | 含义 |
|-------------|----------------------------------------------------------------------------------------------|
| NONE | 没有活动错误 |
| 57C2 | 未知 |
| 11E1 | 振荡功能已禁用。请按下遥控器上的“振荡”按钮继续。|

#### 调度程序
| 名称 | 含义 | 可能的值 | 单位 |
|------|--------------------|-----------------|------|
| dstv | 夏令时 | 0001... | |
| srsc | ？ | 7c68... | |
|齐德 |时区？          | 0001... |      |

### 环境电流传感器数据
＃＃＃＃ 数据
| 名称 | 含义 | 可能的值 | 单位 |
|------|----------------------------|-----------------|---------|
| hact | 湿度 (%) | 0000 - 0100 | 百分比 |
| 契约 | 灰尘 | 0000 - 0009 | |
| sltm | 睡眠定时器 | 关闭... 9999 | 分钟 |
| 触觉 | 温度（开尔文）| 0000 - 5000 | K |
| vact | 挥发性有机化合物 | 0001 - 0009 | |
| 甲醛 | 甲醛（未使用） | | |
| hchr | 甲醛 | | |
| pm25 | PM2.5 (未使用) | 0018 | |
| pm10 | PM10（未使用）| 0011 | |
| va10 | 挥发性有机化合物 | 0004 | |
| 氮氧化物 | 二氧化氮 | 0000 - 0014 | |
| p25r | PM2.5 颗粒物 | 0019 | µg/m³ |
| p10r | PM10 颗粒物 | 0018 | µg/m³ |

### 环境和使用数据
冗余值？

＃＃＃＃ 数据
| 名称 | 含义 | 可能的值 | 单位 |
| ----------- | ------------------------------------------------------------------------ | ------------------------------------------- | ----------- | --- |
| pal0 - pal9 | 从一小时开始在此灰尘层中停留的秒数 | 0000 - 3600 | |
| palm | 似乎是 palX 的中值 | | |
| vol0 - vol9 | 从一小时开始在此级别的 voc 中花费的秒数 | 0000 - 3600 | |
| volm | 似乎是 volX 的中值 | | |
| aql0 - aql9 | 自一小时开始以来处于此空气质量等级的秒数 | max (pal, vol)) | 0000 - 3600 | |
| aqlm | 似乎是 aqlX 的中值 | | |
| fafs | 似乎是在特定时间内花费的秒数 | 0000 - 3600 | |
| faos | 似乎是在特定时间内花费的秒数 | 0000 - 3600 | |
| fofs | 似乎是在特定时间内花费的秒数 | 0000 - 3600 ||
| fons | 似乎是在特定时间内花费的秒数 | 0000 - 3600 | |
| 嗡嗡 | 湿度？（％）| 0000 - 0100 | |
| tmpm | 温度（开尔文）？| 0000 - 5000 | |

### Sentry.io
此适配器使用 sentry.io 收集崩溃详情并自动向作者报告。此操作使用了 [ioBroker.sentry](https://github.com/ioBroker/plugin-sentry) 插件。如果您不想通过崩溃信息支持作者，请参阅 [插件主页](https://github.com/ioBroker/plugin-sentry) 了解该插件的功能、收集哪些信息以及如何禁用它。

## 法律声明
Dyson、pure cool、pure hot & cool 等是[戴森有限公司](https://www.dyson.com) 的商标或注册商标。所有其他商标均为其各自所有者的财产。

## Changelog
### **WORK IN PROGRESS**
- (grizzelbee) Upd: Dependencies got updated
- (grizzelbee) Fix: [#338](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/338) Fixed Admin dependency
- (grizzelbee) Fix: [#341](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/341) Fixed linting
- fixes #342 Updated minimum required NodeJs Version to 20

### 3.2.7 (2025-02-13)
- (grizzelbee) Upd: Dependencies got updated
- (grizzelbee) Upd: Moved to eslint 9 and fixed new lint issues

### 3.2.6 (2024-11-13)
- (grizzelbee) Upd: Dependencies got updated
- (grizzelbee) Fix: Fixed issues mentioned by adapter checker regarding responsive design

### 3.2.5 (2024-10-08) 
- (grizzelbee) Upd: Dependencies got updated
- (grizzelbee) Fix: Fixed GUI issues
- (grizzelbee) Fix: Added missing files to files-section in package.json

### 3.2.4 (2024-10-01)
- (grizzelbee) Upd: Dependencies got updated
- (grizzelbee) Fix: Removed plugin-sentry
- (grizzelbee) Fix: [#318](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/318) Added tests for node 22
- (grizzelbee) Upd: [#315](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/315) Fixed some issues mentioned by adapter-checker

### 3.2.3 (2024-06-21) (Marching on)
- (grizzelbee) Fix: Added missing clearInterval in onUnload

### 3.2.2 (2024-06-18) (Marching on)
- (grizzelbee) Upd: Dependencies got updated
- (grizzelbee) Upd: [#286](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/286) Fixed polling which got broken in v3.1.10
- (grizzelbee) Upd: Poll intervall of 0 disables polling

### 3.2.1 (2024-06-04) (Marching on)
- (grizzelbee) Upd: Dependencies got updated
- (grizzelbee) Upd: [#286](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/286) Fixed polling which got broken in v3.1.10

### 3.2.0 (2024-05-28) (Marching on)

- (grizzelbee) Chg: Lamps (Product type 552a) won't generate a warning on startup any longer but show an info that they are not supported by this adapter.
- (grizzelbee) Chg: Vacuum cleaner robots (Product types 276 and 277) won't generate a warning on startup any longer but show an info that they are not supported by this adapter.
- (grizzelbee) New: [#289](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/289) Added Support for Dyson Purifier Big+Quiet Formaldehyde (BP03, Produce type 664) 
- (grizzelbee) Fix: [#287](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/287) Added Switzerland again to config 
- (grizzelbee) Upd: Dependencies got updated
- (grizzelbee) Chg: removed obsolete index_m.html
- (grizzelbee) Fix: Fixed broken NO2Index
- (grizzelbee) Fix: Fixed broken fan speeds 0-10
- (grizzelbee) Fix: Fixed polling of sensor data
- (grizzelbee) Fix: setting fan speed = Auto works

### 3.1.10 (2024-05-14) (Marching on)

- (grizzelbee) Fix: [#281](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/281) Removed duplicate Sleeptimer field from config
- (grizzelbee) New: Enabled editing of field Sleeptimer 
- (grizzelbee) Fix: [#283](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/283) Late config of fields
- (grizzelbee) Fix: Mapping text values in fields Sleeptimer & fanspeed to numerical values

### 3.1.9 (2024-05-13) (Marching on)

- (arcticon)   Fix: [#278](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/278) Changeable fields are working again.

### 3.1.8 (2024-05-10) (Marching on)

- (arcticon)   Upd: Dependencies got updated
- (grizzelbee) Chg: code refactoring  
- (arcticon)   Chg: code refactoring  
- (arcticon)   Chg: [#273](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/273) Performance improvements
- (arcticon)   Chg: [#274](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/274) Update of outdated certificate

### 3.1.7 (2024-04-24) (Marching on)

- (grizzelbee) Upd: dependencies got updated
- (grizzelbee) Fix: [#266](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/266) HeatingMode switch is now working correctly

### 3.1.6 (2024-04-24) (Marching on)

- (grizzelbee) Upd: dependencies got updated
- (grizzelbee) Fix: [#266](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/266) HeatingMode switch is now working correctly

### 3.1.5 (2024-04-16) (Marching on)

- (grizzelbee) Fix: Requesting at least admin v6.13.16 as dependency

### 3.1.4 (2024-03-22) (Marching on)

- (grizzelbee) Fix: Lamps (Product type 552) won't generate a warning on startup anymore but show an info that they are not supported by this adapter.

### 3.1.3 (2024-02-28) (Marching on)

- (grizzelbee) Fix: 2FA Process is working again - truely

### 3.1.2 (2024-02-26) (Marching on)

- (grizzelbee) Upd: dependencies got updated
- (grizzelbee) Fix: 2FA Process is working again
- (grizzelbee) New: At least Node.js V18.2.0 is required

### 3.1.1 (2024-02-01) (Marching on)

- (grizzelbee) Upd: dependencies got updated
- (grizzelbee) Fix: [#244](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/244) Fixed PM2.5, PM10, VOC Values to be compliant to the dyson App
- (grizzelbee) Fix: [#113](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/113) Fixed NO2 Values to be compliant to the dyson App
- (grizzelbee) Fix: [#244](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/244) Fixed PM2.5, PM10, VOC Indexes
- (grizzelbee) New: Changed admin user interface to jsonConfig
- (grizzelbee) Upd: Code cleanup

### 3.0.0 (2024-01-11) (Marching on)

- (grizzelbee) Upd: dependencies got updated
- (grizzelbee) Upd: updated year of copyright in license
- (grizzelbee) New: [#244](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/244) Added HCHO-Index
- (grizzelbee) Chg: BREAKING CHANGES:
  - Replaced values in field pm25 with values from pm25r and calculating them accordingly to the dyson App
  - Replaced values in field pm10 with values from pm10r and calculating them accordingly to the dyson App
  - [#244](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/244) Replaced values in field hcho with values from hchr and calculating them accordingly to the dyson App
  - Fields pm25r and pm10r are now deprecated and will be removed

### 2.5.9 (2023-08-21) (Halo of the dark)

- (grizzelbee) Fix: Updated year in license- and readme file to make adapter checker happy

### 2.5.8 (2023-08-09) (Halo of the dark)

- (grizzelbee) Fix: Fixed calculation of hmax temperatures for heater models.

### 2.5.7 (2022-12-06) (Halo of the dark)

- (grizzelbee) New: Added support for Dyson Pure Humidify+Cool Formaldehyde (PH04, ProductType 358K)
- (grizzelbee) Upd: Upgraded axios to 1.2.1

### 2.5.6 (2022-11-28) (Halo of the dark)

- (grizzelbee) Fix: [#213](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/213) Fixed warning due to wrong data type on field FILTER_REPLACEMENT

### 2.5.4 (2022-11-27) (Halo of the dark)

- (grizzelbee) Upd: [#207](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/207) Downgraded axios to 0.27.2 due to an error in version 1.x returning data as binary instead of string.

### 2.5.3 (2022-11-26) (Halo of the dark)

- (grizzelbee) Upd: Dependencies got updated
- (grizzelbee) Chg: [#207](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/207) better and easier detection of supported devices

### 2.5.2 (2022-11-17) (Halo of the dark)

- (grizzelbee) Upd: Dependencies got updated
- (grizzelbee) Chg: Moved log message "requesting new state of device" from info to debug
- (grizzelbee) New: Added Dyson Pure Hot+Cool Formaldehyde (Type 527K) to device list.
- (grizzelbee) New: Added Dyson Pure Cool Tower Formaldehyde (Type 438K) to device list.

### 2.5.1 (2022-03-23) (Halo of the dark)

- (grizzelbee) Fix: Improved layout of config page and added tooltips to the checkboxes

### 2.5.0 (2022-03-22) (Halo of the dark)

- (grizzelbee) New: [#185](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/185) Added config option to disable logging of reconnect events

### 2.4.1 (2022-03-20) (Echo from the past)

- (grizzelbee) New: Changed SystemState from text to boolean data points

### 2.4.0 (2022-03-17) (Echo from the past)

- (grizzelbee) New: Added warning code to device tree
- (grizzelbee) New: Added Device-faults as SystemState to device tree
- (grizzelbee) New: Added donate button to readme and config page
- (grizzelbee) Upd: Switched "Sending data to device" message from loglevel info to debug
- (grizzelbee) Upd: reduced amount of debug messages
- (grizzelbee) Upd: Updated dependencies

### 2.3.2 (2022-03-04) (Fairytale of doom)

- (grizzelbee) Fix: Fixed: Sentry-Error: [DYSONAIRPURIFIER-D](https://sentry.io/organizations/grizzelbee/issues/3021418514)
- (grizzelbee) Upd: Updated dependencies

### 2.3.1 (2022-01-14) (Fairytale of doom)

- (grizzelbee) Upd: Updated dependencies
- (grizzelbee) Upd: Updated documentation

### 2.3.0 (2021-12-02) (Fairytale of doom)

- (grizzelbee) New: Added some GUI elements for air quality in folder icons
- (grizzelbee) New: Added support for HEPA PTFE filters
- (grizzelbee) New: Added support for Combined PTFE filters
- (grizzelbee) Chg: Fanspeed is now a number (not string anymore) to work properly with IoT-Adapter. Please delete this data point and let get recreated.

### 2.2.0 (2021-11-07) (Welcome to my wasteland)

- (grizzelbee) New: [#154](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/154) Added support for dyson Humidify+Cool PH03/358E.

### 2.1.4 (2021-10-20) (Running to the edge)

- (grizzelbee) New: [#152](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/152) Added token-indicator to config page in admin to show whether a token has already been received and saved or not.

### 2.1.3 (2021-10-17) (Running to the edge)

- (grizzelbee) Fix: [#148](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/148) Hostaddress is used properly when given.
- (grizzelbee) Fix: [#149](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/149) OscillationAngle "Breeze" is working now
- (grizzelbee) Fix: [#150](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/150) Strange delay and jumping of boolean switches is fixed

### 2.1.2 (2021-10-07) (Running to the edge)

- (grizzelbee) New: Removed NO2 from general AirQuality to be more compliant to dyson-app
- (grizzelbee) Upd: Code cleanup
- (grizzelbee) Upd: Removed delay between sending a command and new values getting displayed (max 30 Secs)

### 2.1.1 (2021-10-05) (Running to the edge)

- (grizzelbee) New: Added some more data points
- (grizzelbee) New: Added switch for temperature unit of the fan display
- (grizzelbee) New: Improved logging of unknown data points
- (germanBluefox) Fix: Fixed icon links
- (grizzelbee) Fix: fixed dependencies badge
- (grizzelbee) Fix: added missing dependency plugin-sentry
- (grizzelbee) Fix: Setting HumidificationTarget now works

### 2.0.1 (2021-10-04) (Lost in forever)

- (grizzelbee) Fix: Turning on HeatingMode should work now
- (grizzelbee) Fix: Sentry-error [DYSONAIRPURIFIER-7](https://sentry.io/organizations/nocompany-6j/issues/2690134161/?project=5735771) -> Cannot read property '3' of undefined
- (grizzelbee) Upd: Updated dependencies

### 2.0.0 (2021-09-26) (Lost in forever)

- (grizzelbee) New: Added DeepCleanCycle to known data points
- (grizzelbee) Fix: Switching water hardness now really works
- (grizzelbee) BREAKING CHANGES: Please recreate your object tree and test your scripts!
- (grizzelbee) Chg: All ON/OFF switches are now boolean types to be more compliant to ioBroker standards for VIS and other adapters. Please delete those data points and let them being recreated if necessary.
- (grizzelbee) Chg: All angles are numbers now
- (grizzelbee) Chg: All 2-way switches are boolean now
-

### V1.1.0 (2021-09-15) (Coming home)

- (grizzelbee) New: Added correct tier-level to io-package
- (grizzelbee) New: improved logging of unknown data points
- (grizzelbee) New: Added support for dyson Pure Hot+Cool Link (ProductType 455A)
- (grizzelbee) New: Added support for formaldehyde sensor
- (grizzelbee) New: oscillation angles can be set
- (grizzelbee) Upd: Improved OscillationAngle data point to display only the values supported by the current model
- (grizzelbee) Fix: removed info: undefined is not a valid state value for id "Hostaddress"

### V1.0.0 (2021-08-26) (Dim the spotlight)

- (grizzelbee) Fix: [#130](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/130) Fixed the newly introduced bug showing wrong values for temperatures
- (grizzelbee) Upd: Pushed to version 1.0.0
- (grizzelbee) Upd: Updated dependencies

### V0.9.5 (2021-08-23) (Marching on)

- (grizzelbee) Doc: [#124](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/124) Documented workaround for 2FA 401 Issue in ReadMe
- (grizzelbee) Fix: [#128](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/128) Fixed saving of config data
- (grizzelbee) Fix: [#107](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/107) Fixed type error on temperatures
- (grizzelbee) Fix: fixed warnings on startup

### V0.9.4 (2021-08-20) ()

- (grizzelbee) New: [#124](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/124) Credentials won't get logged but shown in a popup in admin when failing 2FA process.
- (grizzelbee) New: Added adminUI tag to io-package
- (grizzelbee) New: Cleanup of io-package

### V0.9.3 (2021-08-19) (Paralyzed)

- (grizzelbee) New: [#124](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/124) Leading and trailing whitespaces will be removed from all config values when saving
- (grizzelbee) New: [#124](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/124) Password will be logged in clear text in case of a http 401 (unauthorized) error during 2FA
- (grizzelbee) Chg: [#124](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/124) Removed general debug logging of 2FA login data

### V0.9.2 (2021-08-15) (Pearl in a world of dirt)

- (bvol) New: [#114](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/114) Added Switzerland to country selection in config , Thanks, @BVol, for his code!
- (grizzelbee) Fix: [#119](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/119) Updated dyson certificate to enable connection again. Thanks, @Krobipd, for helping with the link
- (grizzelbee) Upd: Updated dependencies

### V0.9.1 (2021-05-17) (Still breathing)

- (grizzelbee) New: [#105](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/105) TP02, HP02 and others supporting the fmod token are now able to switch from Off to Auto- and manual-mode

### V0.9.0 (2021-05-15) (Still breathing)

- (grizzelbee) New: Added ioBroker sentry plugin to report errors automatically
- (grizzelbee) New: Added support for Dyson Pure Cool TP07 (438E)
- (grizzelbee) New: Added support for Dyson 2-factor login method
- (grizzelbee) New: Added "keep Sensorvalues" to config to prevent destroying old values when continuous monitoring is off and fan is switched off (TP02)
- (grizzelbee) Fix: FilterLife should now be correctly in hours and percent in two separate data fields for fans supporting this (e.g. TP02)

### V0.8.2 (2021-04-09) (Still breathing)

- (grizzelbee) Fix: [#80](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/80) fixed npm install hint in documentation
- (grizzelbee) Fix: [#82](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/82) fixed common.dataSource type with type >poll<
- (grizzelbee) Fix: [#95](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/95) Added support for dyson Hot+Cool Formaldehyde (527E)
- (grizzelbee) Fix: [#94](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/94) Fixed dustIndex

### V0.8.1 (2021-02-19) (Fall into the flames)

- (grizzelbee) New: added icons to each fan type in device tree
- (grizzelbee) New: Showing Filter type correctly - not as code anymore
- (grizzelbee) Upd: updated dependencies

### V0.8.0 (2021-02-18) (Beyond the mirror)

- (grizzelbee) New: Log as info if account is active on login; else log as warning.
- (grizzelbee) New: [#21](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/21) Improvement for humidifier support
- (grizzelbee) Fix: [#67](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/67) Adapter sometimes wrote objects instead of values.

### V0.7.5 (2021-02-12) (I won't surrender)

- (grizzelbee) Fix: [#65](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/65) Adapter get online again after changes to dyson cloud API login procedure.
- (grizzelbee) New: Adapter reconnects with new host address when it gets changed manually

### V0.7.4 (2021-02-10) (Human)

- (grizzelbee) Fix: fixed adapter traffic light for info.connection
- (grizzelbee) Fix: Minor fixes

### V0.7.3 (2021-02-10) (When angels fall)

- (theimo1221) Fix: [#59](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/59) added default country
- (theimo1221) New: added function to mask password to dyson-utils.js
- (grizzelbee) New: extended config test and error logging
- (grizzelbee) New: added password to protectedNative in io-package.json
- (grizzelbee) Fix: fixed showing password in config (leftover from testing/fixing)
- (grizzelbee) Fix: fixed detection of needed js-controller features
- (grizzelbee) Fix: fixed detection if IP is given or not
- (grizzelbee) Upd: creating all data points with await

### V0.7.2 (2021-02-10) (Songs of love and death)

- (grizzelbee) Fix: [#59](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/59) Fixed bug while loading/saving config which led to wrong values displayed for country and temperature unit
- (grizzelbee) Upd: switched "Skipping unknown ..." message from info to debug

### V0.7.1 (2021-02-06) (Horizons)

- (grizzelbee) New: When no host address is given - adapter tries to connect via default hostname of the device
- (grizzelbee) Fix: [#13](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/13) Filterlifetime is now correctly displayed in hours and percent for devices supporting this
- (grizzelbee) Fix: [#48](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/48) Fixed countrycodes for UK and USA
- (grizzelbee) Fix: [#52](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/52) Fixed VOCIndex
- (grizzelbee) Fix: Removed option to control Fan state since it corresponds to the state of the fan in auto-mode. Controlling it is senseless.
- (grizzelbee) Fix: Fixed await...then antipattern.
- (grizzelbee) Fix: Fixed undefined roles
- (grizzelbee) Fix: Fixed some bad promises and moved code to dysonUtils
- (grizzelbee) Fix: Fixed encrypting password using js-controller 3.0 build-in routine
- (grizzelbee) Upd: Added topic "Controlling your device(s)" to readme
- (grizzelbee) Upd: Removed unnecessary saving of MQTT password
- (grizzelbee) Upd: [#9](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/9) Added some more dyson codes for heaters and humidifiers

### V0.7.0 (2021-01-08) (Afraid of the dark)

- (jpwenzel) New: Removing crypto from package dependency list (using Node.js provided version)
- (jpwenzel) New: Introducing unit tests
- (jpwenzel) New: At least Node.js 10.0.0 is required
- (grizzelbee) New: [#23](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/23) - Introduced new data field AirQuality which represents the worst value of all present indexes.
- (grizzelbee) New: BREAKING CHANGE! - switched over to the adapter-prototype build-in password encryption. Therefore, you'll need to enter your password again in config.
- (grizzelbee) New: At least js-controller 3.0.0 is required
- (grizzelbee) New: At least admin 4.0.9 is required
- (jpwenzel) Fix: General overhaul of readme
- (jpwenzel) Fix: Code refactoring
- (grizzelbee) Fix: fixed some datafield names - please delete the whole device folder and get them newly created.
- (grizzelbee) Fix: [#18](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/18) - Fixed creating the indexes when there is no according sensor
- (grizzelbee) Fix: [#13](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/13) - Displaying Filter life value in hours again
- (grizzelbee) Fix: [#13](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/13) - Creating additional Filter life value in percent
- (grizzelbee) Fix: removed materializeTab from ioPackage
- (grizzelbee) Fix: calling setState now as callback in createOrExtendObject
- (grizzelbee) Fix: Removed non-compliant values for ROLE
- (grizzelbee) Fix: calling setState in callback of set/createObject now
- (grizzelbee) Fix: ensuring to clear all timeouts in onUnload-function

### V0.6.0 (2020-10-29) (Rage before the storm)

- (grizzelbee) New: [#17](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/17) - Added online-indicator for each device
- (grizzelbee) New: [#19](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/19) - Extended Password length from 15 characters to 32
- (grizzelbee) New: [#20](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/20) - Improved error handling on http communication with Dyson API
- (grizzelbee) Fix: Fixed typo within data field anchorpoint - please delete the old ancorpoint manually.
- (grizzelbee) Fix: [#13](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/13) - Filter life value is now displayed in percent not in hours

### V0.5.1 (2020-10-27) (Heart of the hurricane)

- (grizzelbee) Fix: Added missing clearTimeout

### V0.5.0 (2020-10-27) (Heart of the hurricane)

- (grizzelbee) New: Editable data fields have now appropriate value lists
- (grizzelbee) New: Added more country codes
- (grizzelbee) New: Target temperature of heater can now be set - **in the configured unit!**
- (grizzelbee) Fix: [#13](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/13) - Filter life value is now displayed in percent not in hours
- (grizzelbee) Fix: [#6](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/6) - Changing the fanspeed does now fully work.

### V0.4.1 (2020-10-16) (unbroken)

- (grizzelbee) New: [#8](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/8) - Documented ProductTypes for better overview and user experience in ReadMe
- (grizzelbee) New: [#9](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/9) - Added some Hot&Cool specific datafields
- (grizzelbee) New: Logging of from devices, when shutting down the adapter
- (grizzelbee) New: [#10](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/10) - Polling device data every X (configurable) seconds for new data, hence sensors don't send updates on changing values
- (grizzelbee) New: [#11](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/11) - Added Austria and France to Country-List
- (grizzelbee) Fix: Fixed bug in error handling when login to Dyson API fails
- (grizzelbee) Fix: [#12](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/12) - Fixed Dyson API login by completely securing via HTTPS.
- (grizzelbee) Fix: Updated some descriptions in config

### V0.4.0 (2020-09-29)

- (grizzelbee) New: devices are now **controllable**
- (grizzelbee) New: state-change-messages are processed correctly now
- (grizzelbee) Fix: Added missing °-Sign to temperature unit
- (grizzelbee) Fix: Terminating adapter when starting with missing Dyson credentials
- (grizzelbee) Fix: NO2 and VOC Indices should work now
- (grizzelbee) Fix: Fixed build errors

### V0.3.0 (2020-09-27) - first version worth giving it a try

- (grizzelbee) New: Messages received via Web-API and MQTT getting processed
- (grizzelbee) New: datapoints getting created and populated
- (grizzelbee) New: Added config item for desired temperature unit (Kelvin, Fahrenheit, Celsius)
- (grizzelbee) New: Added missing product names to product numbers
- (grizzelbee) New: Hostaddress/IP is editable / configurable
- (grizzelbee) New: calculate quality indexes for PM2.5, PM10, VOC and NO2 according to Dyson App

### V0.2.0 (2020-09-22) - not working! Do not install/use

- (grizzelbee) New: Login to Dyson API works
- (grizzelbee) New: Login to Dyson AirPurifier (2018 Dyson Pure Cool Tower [TP04]) works
- (grizzelbee) New: mqtt-Login to [TP04] works
- (grizzelbee) New: mqtt-request from [TP04] works
- (grizzelbee) New: mqtt-request to [TP04] is responding

### V0.1.0 (2020-09-04) - not working! Do not install/use

- (grizzelbee) first development body (non-functional)

## License

MIT License

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

Copyright (c) 2025 Hanjo Hingsen <open-source@hingsen.de>