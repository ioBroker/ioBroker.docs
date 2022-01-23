---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.dysonairpurifier/README.md
title: ioBroker.dyson空气净化器
hash: Mlho8Fb/5kV7FMKtUNBDi3f4f5aAe9lEJIi/3JCk/hQ=
---
# IoBroker.dysonAirPurifier
![标志](admin/dyson_logo.svg)![标志](../../../en/adapterref/iobroker.dysonairpurifier/admin/dyson_pure_cool.jpg)

![安装数量（最新）](http://iobroker.live/badges/dysonairpurifier-installed.svg)
![NPM 版本](https://img.shields.io/npm/v/iobroker.dysonairpurifier.svg)
![安装数量（稳定）](http://iobroker.live/badges/dysonairpurifier-stable.svg)
![已知漏洞](https://snyk.io/test/github/Grizzelbee/ioBroker.dysonairpurifier/badge.svg)
![新PM](https://nodei.co/npm/iobroker.dysonAirPurifier.svg?downloads=true)
![执照](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![下载](https://img.shields.io/npm/dm/iobroker.dysonairpurifier.svg)

[![测试和发布](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/actions/workflows/test-and-deploy.yml/badge.svg)](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/actions/workflows/test-and-deploy.yml)

## 适用于戴森空气净化器和风扇的 ioBroker 适配器
该适配器将 ioBroker 连接到各种戴森空气净化器。

由[Freepik](https://www.flaticon.com/de/autoren/freepik) 来自 [www.flaticon.com](https://www.flaticon.com/de/)创建的徽标中的风扇图标。

### 支持的设备
* Dyson Pure Cool Link Tower (TP02, ProductType 475)
* Dyson Pure Cool Tower，2018 年型号（TP04，ProductType 438）
* Dyson Pure Cool Tower 甲醛，2018 年型号（TP07，ProductType 438E）
* Dyson Pure Cool Link Desk (DP01, ProductType 469)
* Dyson Pure Cool Desk，2018 年型号（DP04，ProductType 520）
* Dyson Pure Hot+Cool Link (HP02, ProductType 455)
* Dyson Pure Hot+Cool Link New (ProductType 455A)
* Dyson Pure Hot+Cool，2018 年型号（HP04，ProductType 527）
* Dyson Pure Hot+Cool (HP07, ProductType 527E)
* Dyson Pure Humidify+Cool (PH01, ProductType 358)
* Dyson Pure Humidify+Cool (PH03, ProductType 358E)

＃＃ 特征
将您的戴森风扇、暖风机、空气净化器和空气加湿器连接到 ioBroker。

* 从设备和传感器读取值
* 可以通过让您更改某些值（主功率、振荡、加热、风扇速度……）来控制设备
* 从 Dyson 服务器读取设备列表
* 处理*无限*数量的粉丝（当然，事实上您的 ioBroker 主机的资源限制了数量）。

＃＃ 怎么运行的
启动时，dyson 云会查询绑定到您帐户的所有已知设备及其 MQTT 密码。有了这个列表，适配器就可以本地连接到所有设备并与它们交互。

* 连接戴森云只需要获取绑定到您账户的设备列表和他们的MQTT密码。
* 因此，只有在适配器启动时才能识别新设备。
* 适配器启动期间仅查询一次戴森云。
* 戴森风扇充当 MQTT 服务器，适配器充当客户端。
* 设备和适配器之间的所有通信仅在本地进行。
* 适配器中的所有连接信息都会在重新启动期间被删除并重新构建。

＃＃ 安装
### Sentry.io
该适配器使用 sentry.io 收集有关崩溃的详细信息并将其自动报告给作者。 [ioBroker.sentry](https://github.com/ioBroker/plugin-sentry)插件用于它。请参阅[插件主页](https://github.com/ioBroker/plugin-sentry)以获取有关插件功能、收集哪些信息以及如何禁用它的详细信息，如果您不喜欢用您的崩溃信息来支持作者。

### 先决条件
* 此适配器需要 Node.js >= 版本 10
* 至少需要 js-Controller 3.0.0
* 至少需要 Admin 4.0.9
* 要运行此适配器，您需要一个 Dyson 帐户。
* 确保将您的粉丝添加到您的帐户。无论是通过应用程序还是在线。

### 适配器安装
#### 使用 npm
在您的 ioBroker 安装上运行 ```npm install iobroker.dysonairpurifier``` 以从 npm 存储库中获取此适配器的最新版本。

#### 替代方案：使用 GitHub URL
通过 ioBroker 管理 UI 将其指向 GitHub 上的最新稳定版本进行安装：<https://github.com/Grizzelbee/ioBroker.dysonairpurifier/tarball/master/>

您还可以使用这些方法安装较旧的版本（通过指向版本标签，例如，```v0.6.0``` 而不是 URL 中的 ```master```），但通常首选最新版本。

### 需要配置数据
* 戴森账号用户名
* Dyson 帐户密码（此适配器最多可处理 32 个字符的密码）
* LAN 中的风扇/空气净化器 IP 地址（并非在所有情况下）。

戴森用户名和密码是通用配置数据，需要在适配器的配置页面中输入。
不同的是，IP 被输入到 `devices` 选项卡页面上设备树中的字段 `Hostname`。

####如何配置适配器
> 在此适配器的第一次常规启动时，将为您的所有设备查询 Dyson API，并将在设备树中创建所有受支持的设备——API 提供的基本信息和附加字段 `Hostaddress`。
> > 所以请运行适配器一次，您的戴森设备将在设备树中创建，并带有它们的基本设置。
> > 然后停止适配器，在设备树的`Hostaddress` 字段中输入 IP，然后重新启动适配器。之后，设备树中的 Dyson 设备应填充数据。

*请注意*：由于 Dyson 的 mDNS 实施不符合标准，您需要*在第一次运行*后提供设备的本地 IP。

*附加说明*：从版本 0.7.1 开始，只要未提供主机地址/IP，适配器就会尝试通过其主机名（序列号）连接到设备。这将在两个先决条件下起作用：

1. 有一个 DNS 服务器在你的局域网中运行。在您的路由器（例如 FritzBoxes 运行 DNS）或专用路由器中。
2. 您没有更改默认设备名称。
3. 设备名称正确映射到其 IP（以防您手动管理 DNS）。

### 2 因素身份验证（自 V0.9.0 起）
安装适配器后，它应该会自动启动 - 如果没有，请先启动它。
更新后它也会自动重启。在这两种情况下，它都将保持“黄色”状态，并且可能会在日志中显示一些错误 - 现在很好。

* 打开适配器的配置对话框
* 至少填写您的电子邮件地址、密码和国家代码 - 其余为可选
* 单击 2FA 代码电子邮件按钮以启动该过程
* 您将在相应字段中自动收到“challengeId”、一封电子邮件和一个包含进一步说明的对话框
* 将电子邮件中的 6 位代码输入“戴森一次性密码”字段
* 点击“完成”按钮
* 之后你应该已经收到了来自戴森的令牌（出于安全目的不可见）
* 完成设置后单击保存并关闭 - 适配器应重新启动并变为绿色。

所有值将被保存并进一步显示。
> 通常您不需要按计划执行此 2 FA - 但您可以在需要时重复执行。

#### 如果您在 2-FA 期间遇到 401 问题。请尝试此解决方法：
1. 退出您的戴森智能手机应用程序
2. 等待几分钟
3. 将您的登录数据输入到适配器（如果尚未完成）并按照 2FA 程序完成。
4. 适配器应启动并变为绿色。
5. 等待一段时间（最多一个小时或更长时间，因为戴森在短时间内阻止了太多请求）
6. 如果您喜欢使用它，请重新登录您的戴森智能手机应用程序。

## 控制您的设备
此适配器当前能够控制您设备的以下状态：

* FanMode，设备模式（手动，自动，关闭）
* FanSpeed , 当前风扇速度
*夜间模式，夜间模式状态
*振荡，风扇振荡（开，关）。
* OscillationRight , OscillationAngle 上边界
* OscillationLeft , OscillationAngle 下边界
* 振荡角，振荡角
* ContinuousMonitoring ，即使设备关闭也能持续监控环境传感器。
* MainPower ，风扇的主电源。
* AutomaticMode , 风扇处于自动模式。
* Flowdirection ，风扇吹向的方向。开=前；关闭=返回（又名 Jet 焦点）
* Jetfocus，风扇吹向的方向。开=前；关闭=返回（又名 Jet 焦点）
*加热模式，加热模式[开/关]
* HeatingTargetTemp , 加热目标温度
* AirQualityTarget，自动模式的目标空气质量。
*加湿模式，开/关
* HumidifyAutoMode , 自动/关闭
* 自动加湿目标，自动加湿目标
* 加湿目标，手动加湿目标
* TemperatureUnit , 显示温度值的单位（风扇显示）。
* 水硬度、软、中、硬

据了解，这些状态的可能值记录在下面。
风扇速度仅允许从 1 到 10 的值和自动。如果您想将风扇速度设置为 0，则需要关闭主电源。
这也是戴森应用程序所做的。

＃＃＃ 已知的问题
*没有设备的自动IP检测
* 有时适配器会丢失与风扇的 MQTT 连接并且无法重新连接。在我的情况下，拔下风扇大约 10 秒钟就足以重置它并重新插入。试一试。

## Dyson API 数据说明（消息负载）
从 <https://github.com/shadowwa/Dyson-MQTT2RRD/blob/master/README.md> 复制和扩展的信息

＃＃＃ 当前状态
|姓名 |意义 |可能的值 |单位 |
|--------------|------------------------------------------------------------|----------------------|------|
|模式原因 |当前模式已由 RemoteControl、App、Scheduler | 设置中国、LAPP、LSCH、PUI | |
|状态原因| |模式 | |
| RSS | WIFI强度 | -100 - 0 |分贝 |
|频道 | WIFI频道 | 52 | |
| fqhp | | 96704 | |
| fghp | | 70480 | |

#### 产品状态
|姓名 |意义 |可能的值 |单位 |
|------|-------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------|
| ercd |上次错误代码 | NONE 或一些六进制值 | |
|菲尔夫 |过滤器剩余寿命 | 0000 - 4300 |小时 |
| fmod |模式 |风扇，自动，关闭 | |
| fpwr |主电源 |开、关 | |
|首发 |粉丝状态 |开、关、风扇 | |
| fnsp |风扇转速 | 0001 - 0010，自动 | |
|目录 |粉丝方向又名。 Jet 对焦/ ON=前，OFF=后 |开、关 | |
| foc |喷气焦点 |开、关 | |
|修改 |夜间模式 |开、关 | |
|奥森 |振荡 |开、关 | |
|奥斯 | OscillationAngle 下边界 | 0005 - 355 | °（度）|
|奥绍| OscillationAngle 上边界 | 0005 - 355 | °（度）|
|操作系统 |振荡活动 |开、关、空闲 | |
|安普|振荡角 | CUST, 0180 | °（度）|
|卡塔尔 |空气质量目标 | 0001=好，0002=正常，0003=差，0004=非常差 | |
| rhtm |持续监控 |开、关 | |
|汽车 |自动模式 |开、关 | |
|纳米片 |夜间模式最大风扇速度？ | 0004 | |
| cflr |状态 碳过滤器 | 0000 - 0100 |百分比 |
| cflt |碳过滤器 |卡夫，无 | |
| hflr |状态 HEPA 过滤器 | 0000 - 0100 |百分比 |
|高频 | HEPA-过滤器 | GHEP, GCOM | |
| sltm |睡眠定时器 |开，关 || |
|修改 |加热器模式 [开/关] |热 | |
|最大 |加热目标温度 | 0 .. 5000 | ķ |
|休谟 |加湿模式 |开，关，| |
|上 |加湿自动模式 | HUMIDIFY_AUTO_MODE_ON, HUMIDIFY_AUTO_MODE_OFF | |
|哼哼|加湿目标 | HUMIDIFICATION_MODE_OFF, HUMIDIFICATION_MODE_THIRTY, HUMIDIFICATION_MODE_FORTY, HUMIDIFICATION_MODE_FIFTY, HUMIDIFICATION_MODE_SIXTY, HUMIDIFICATION_MODE_SEVENTY | |
|光盘 | CleanDurationRemaining |整数 |分钟 |
|矩形 |自动加湿目标 |整数 | % |
|分类 | TimeRemainingToNextClean |整数 |小时 |
|哇 |水硬度 |软=“2025”，中=“1350”，硬=“0675”| |
|万事达|警告代码 |无... | |
| rstf |重置过滤器生命周期 | 'RSTF'、'STET'、RESET_FILTER_LIFE_IGNORE、RESET_FILTER_LIFE_ACTION | |
|科尔夫 |温度格式 | ON=摄氏，OFF=华氏| |
| clcr |深层清洁循环 | CLNO=未激活，CLAC=正在进行深度清洁，CLCM=已完成 | |
|赫斯塔 |加热状态 |活动/空闲 | |
| msta |加湿状态 |活动/空闲关闭，HUMD | |
| psta | [HP0x] 未知 |初始化，CLNG，INV，关闭 | |
|布里尔 |未知 | 0002 | LEVEL_LOW、LEVEL_MEDIUM、LEVEL_HIGH |
| fqhp |未知 | | |
|倾斜 | [HP0x] 未知 |字符串 | |
|拨号 | [DP0x] 未知 | | |

|错误代码 |含义 |
|-------------|----------------------------------------------------------------------------------------------|
|无 |没有错误活动 |
| 57C2 |未知 |
| 11E1 |振荡已被禁用。请按遥控器上的“振荡”按钮继续。 |

####调度器
|姓名 |意义 |可能的值 |单位 |
|------|--------------------|-----------------|------|
|数字电视 |日光节约时间 | 0001... | |
| srsc | ? | 7c68... | |
|齐德 |时区？ | 0001... | |

### 环境-电流-传感器-数据
＃＃＃＃ 数据
|姓名 |意义 |可能的值 |单位 |
|------|----------------------------|-----------------|---------|
|契约 |湿度 (%) | 0000 - 0100 |百分比 |
|契约 |灰尘 | 0000 - 0009 | |
| sltm |睡眠定时器 |关... 9999 |分钟 |
|圆通 |开尔文温度 | 0000 - 5000 | ķ |
|真空 |挥发性有机化合物| 0001 - 0009 | |
| hcho |甲醛 ||
|下午25 | PM2.5 | 0018 ||
|下午10 | PM10 | 0011 ||
| va10 |挥发性有机化合物| 0004 ||
|氮氧化物 |二氧化氮 | 0000 - 0014 ||
| p25r | | 0019 ||
| p10r | | 0018 ||

### 环境和使用数据
冗余值？

＃＃＃＃ 数据
|姓名 |意义 |可能的值 |单位 |
|-------------|--------------------------------------------------------------------------|---------------------------------------------|-------------|
|朋友0 - 朋友9 |自一小时开始以来在此级别的灰尘中花费的秒数| 0000 - 3600 | |
|棕榈|似乎是 palX 的中值 | | |
|卷 0 - 卷 9 |自一小时开始以来在此级别 voc 中的第二次花费数 | 0000 - 3600 | |
|卷 |似乎是 volX | 的中值| |
| aql0 - aql9 |在这个级别的空气质量中第二次花费的次数| max (pal, vol)) 从一小时开始 | 0000 - 3600 | |
| aqlm |似乎是 aqlX 的中值 | | |
| FAFS |似乎是在特定时间花费的秒数| 0000 - 3600 | |
|粮农组织 |似乎是在特定时间花费的秒数| 0000 - 3600 | |
|福斯 |似乎是在特定时间花费的秒数| 0000 - 3600 | |
|字体 |似乎是在特定时间花费的秒数| 0000 - 3600 | |
|哼哼|湿度 ？ (%) | 0000 - 0100 | |
| tmpm |开尔文温度？ | 0000 - 5000 | |

＃＃ 法律声明
Dyson、pure cool、pure hot & cool 等是 [戴森有限公司](https://www.dyson.com) 的商标或注册商标，所有其他商标均为其各自所有者的财产。

## Changelog

### V2.3.1 (2022-01-14) (Fairytale of doom)
* (grizzelbee) Upd: Updated dependencies
* (grizzelbee) Upd: Updated documentation

### V2.3.0 (2021-12-02) (Fairytale of doom)
* (grizzelbee) New: Added some GUI elements for air quality in folder icons
* (grizzelbee) New: Added support for HEPA PTFE filters
* (grizzelbee) New: Added support for Combined PTFE filters
* (grizzelbee) Chg: Fanspeed is now a number (not string anymore) to work properly with IoT-Adapter. Please delete this data point and let get recreated. 

### V2.2.0 (2021-11-07) (Welcome to my wasteland)
* (grizzelbee) New: [#154](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/154) Added support for dyson Humidify+Cool PH03/358E.

### V2.1.4 (2021-10-20) (Running to the edge)
* (grizzelbee) New: [#152](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/152) Added token-indicator to config page in admin to show whether a token has already been received and saved or not.

### V2.1.3 (2021-10-17) (Running to the edge)
* (grizzelbee) Fix: [#148](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/148) Hostaddress is used properly when given.
* (grizzelbee) Fix: [#149](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/149) OscillationAngle "Breeze" is working now 
* (grizzelbee) Fix: [#150](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/150) Strange delay and jumping of boolean switches is fixed 

### V2.1.2 (2021-10-07) (Running to the edge)
* (grizzelbee) New: Removed NO2 from general AirQuality to be more compliant to dyson-app
* (grizzelbee) Upd: Code cleanup
* (grizzelbee) Upd: Removed delay between sending a command and new values getting displayed (max 30 Secs)


### V2.1.1 (2021-10-05) (Running to the edge)
* (grizzelbee) New: Added some more data points 
* (grizzelbee) New: Added switch for temperature unit of the fan display
* (grizzelbee) New: Improved logging of unknown data points
* (germanBluefox) Fix: Fixed icon links
* (grizzelbee) Fix: fixed dependencies badge
* (grizzelbee) Fix: added missing dependency plugin-sentry
* (grizzelbee) Fix: Setting HumidificationTarget now works

### V2.0.1 (2021-10-04) (Lost in forever)
* (grizzelbee) Fix: Turning on HeatingMode should work now
* (grizzelbee) Fix: Sentry-error [DYSONAIRPURIFIER-7](https://sentry.io/organizations/nocompany-6j/issues/2690134161/?project=5735771) -> Cannot read property '3' of undefined
* (grizzelbee) Upd: Updated dependencies

### V2.0.0 (2021-09-26) (Lost in forever)
* (grizzelbee) New: Added DeepCleanCycle to known data points
* (grizzelbee) Fix: Switching water hardness now really works
* (grizzelbee) BREAKING CHANGES: Please recreate your object tree and test your scripts!
* (grizzelbee) Chg: All ON/OFF switches are now boolean types to be more compliant to ioBroker standards for VIS and other adapters. Please delete those data points and let them being recreated if necessary.
* (grizzelbee) Chg: All angles are numbers now
* (grizzelbee) Chg: All 2-way switches are boolean now
* 
### V1.1.0 (2021-09-15) (Coming home)
* (grizzelbee) New: Added correct tier-level to io-package
* (grizzelbee) New: improved logging of unknown data points
* (grizzelbee) New: Added support for dyson Pure Hot+Cool Link (ProductType 455A) 
* (grizzelbee) New: Added support for formaldehyde sensor
* (grizzelbee) New: oscillation angles can be set
* (grizzelbee) Upd: Improved OscillationAngle data point to display only the values supported by the current model  
* (grizzelbee) Fix: removed info: undefined is not a valid state value for id "Hostaddress"

### V1.0.0 (2021-08-26) (Dim the spotlight)
* (grizzelbee) Fix: [#130](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/130) Fixed the newly introduced bug showing wrong values for temperatures
* (grizzelbee) Upd: Pushed to version 1.0.0
* (grizzelbee) Upd: Updated dependencies

### V0.9.5 (2021-08-23) (Marching on)
* (grizzelbee) Doc: [#124](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/124) Documented workaround for 2FA 401 Issue in ReadMe
* (grizzelbee) Fix: [#128](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/128) Fixed saving of config data
* (grizzelbee) Fix: [#107](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/107) Fixed type error on temperatures
* (grizzelbee) Fix: fixed warnings on startup

### V0.9.4 (2021-08-20) ()
* (grizzelbee) New: [#124](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/124) Credentials won't get logged but shown in a popup in admin when failing 2FA process. 
* (grizzelbee) New: Added adminUI tag to io-package
* (grizzelbee) New: Cleanup of io-package

### V0.9.3 (2021-08-19) (Paralyzed)
* (grizzelbee) New: [#124](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/124) Leading and trailing whitespaces will be removed from all config values when saving
* (grizzelbee) New: [#124](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/124) Password will be logged in clear text in case of a http 401 (unauthorized) error during 2FA
* (grizzelbee) Chg: [#124](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/124) Removed general debug logging of 2FA login data


### V0.9.2 (2021-08-15) (Pearl in a world of dirt)
* (bvol)       New: [#114](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/114) Added Switzerland to country selection in config , Thanks, @BVol, for his code! 
* (grizzelbee) Fix: [#119](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/119) Updated dyson certificate to enable connection again. Thanks, @Krobipd, for helping with the link
* (grizzelbee) Upd: Updated dependencies 

### V0.9.1 (2021-05-17) (Still breathing)
* (grizzelbee) New: [#105](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/105) TP02, HP02 and others supporting the fmod token are now able to switch from Off to Auto- and manual-mode

### V0.9.0 (2021-05-15) (Still breathing)
* (grizzelbee) New: Added ioBroker sentry plugin to report errors automatically 
* (grizzelbee) New: Added support for Dyson Pure Cool TP07 (438E)
* (grizzelbee) New: Added support for Dyson 2-factor login method
* (grizzelbee) New: Added "keep Sensorvalues" to config to prevent destroying old values when continuous monitoring is off and fan is switched off (TP02)  
* (grizzelbee) Fix: FilterLife should now be correctly in hours and percent in two separate data fields for fans supporting this (e.g. TP02)

### V0.8.2 (2021-04-09) (Still breathing)
* (grizzelbee) Fix: [#80](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/80) fixed npm install hint in documentation
* (grizzelbee) Fix: [#82](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/82) fixed common.dataSource type with type >poll<
* (grizzelbee) Fix: [#95](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/95) Added support for dyson Hot+Cool Formaldehyde (527E)
* (grizzelbee) Fix: [#94](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/94) Fixed dustIndex


### V0.8.1 (2021-02-19) (Fall into the flames)
* (grizzelbee) New: added icons to each fan type in device tree
* (grizzelbee) New: Showing Filter type correctly - not as code anymore
* (grizzelbee) Upd: updated dependencies

### V0.8.0 (2021-02-18) (Beyond the mirror)
* (grizzelbee) New: Log as info if account is active on login; else log as warning. 
* (grizzelbee) New: [#21](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/21) Improvement for humidifier support
* (grizzelbee) Fix: [#67](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/67) Adapter sometimes wrote objects instead of values.

### V0.7.5 (2021-02-12) (I won't surrender)
* (grizzelbee) Fix: [#65](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/65) Adapter get online again after changes to dyson cloud API login procedure.
* (grizzelbee) New: Adapter reconnects with new host address when it gets changed manually

### V0.7.4 (2021-02-10) (Human)
* (grizzelbee) Fix: fixed adapter traffic light for info.connection
* (grizzelbee) Fix: Minor fixes

### V0.7.3 (2021-02-10) (When angels fall)
* (theimo1221) Fix: [#59](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/59) added default country
* (theimo1221) New: added function to mask password to dyson-utils.js
* (grizzelbee) New: extended config test and error logging
* (grizzelbee) New: added password to protectedNative in io-package.json
* (grizzelbee) Fix: fixed showing password in config (leftover from testing/fixing)
* (grizzelbee) Fix: fixed detection of needed js-controller features
* (grizzelbee) Fix: fixed detection if IP is given or not
* (grizzelbee) Upd: creating all data points with await 


### V0.7.2 (2021-02-10) (Songs of love and death)
* (grizzelbee) Fix: [#59](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/59) Fixed bug while loading/saving config which led to wrong values displayed for country and temperature unit
* (grizzelbee) Upd: switched "Skipping unknown ..." message from info to debug 

### V0.7.1 (2021-02-06) (Horizons)
* (grizzelbee) New: When no host address is given - adapter tries to connect via default hostname of the device
* (grizzelbee) Fix: [#13](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/13) Filterlifetime is now correctly displayed in hours and percent for devices supporting this
* (grizzelbee) Fix: [#48](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/48) Fixed countrycodes for UK and USA
* (grizzelbee) Fix: [#52](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/52) Fixed VOCIndex
* (grizzelbee) Fix: Removed option to control Fan state since it corresponds to the state of the fan in auto-mode. Controlling it is senseless.
* (grizzelbee) Fix: Fixed await...then antipattern.
* (grizzelbee) Fix: Fixed undefined roles
* (grizzelbee) Fix: Fixed some bad promises and moved code to dysonUtils
* (grizzelbee) Fix: Fixed encrypting password using js-controller 3.0 build-in routine
* (grizzelbee) Upd: Added topic "Controlling your device(s)" to readme
* (grizzelbee) Upd: Removed unnecessary saving of MQTT password
* (grizzelbee) Upd: [#9](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/9) Added some more dyson codes for heaters and humidifiers


### V0.7.0 (2021-01-08) (Afraid of the dark)
* (jpwenzel)   New: Removing crypto from package dependency list (using Node.js provided version)
* (jpwenzel)   New: Introducing unit tests
* (jpwenzel)   New: At least NodeJs 10.0.0 is required
* (grizzelbee) New: [#23](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/23) - Introduced new data field AirQuality which represents the worst value of all present indexes.
* (grizzelbee) New: BREAKING CHANGE! - switched over to the adapter-prototype build-in password encryption. Therefore, you'll need to enter your password again in config.
* (grizzelbee) New: At least js-controller 3.0.0 is required
* (grizzelbee) New: At least admin 4.0.9 is required
* (jpwenzel)   Fix: General overhaul of readme
* (jpwenzel)   Fix: Code refactoring
* (grizzelbee) Fix: fixed some datafield names - please delete the whole device folder and get them newly created.
* (grizzelbee) Fix: [#18](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/18) - Fixed creating the indexes when there is no according sensor
* (grizzelbee) Fix: [#13](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/13) - Displaying Filter life value in hours again
* (grizzelbee) Fix: [#13](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/13) - Creating additional Filter life value in percent
* (grizzelbee) Fix: removed materializeTab from ioPackage
* (grizzelbee) Fix: calling setState now as callback in createOrExtendObject
* (grizzelbee) Fix: Removed non-compliant values for ROLE
* (grizzelbee) Fix: calling setState in callback of set/createObject now
* (grizzelbee) Fix: ensuring to clear all timeouts in onUnload-function

### V0.6.0 (2020-10-29) (Rage before the storm)
* (grizzelbee) New: [#17](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/17) - Added online-indicator for each device
* (grizzelbee) New: [#19](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/19) - Extended Password length from 15 characters to 32
* (grizzelbee) New: [#20](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/20) - Improved error handling on http communication with Dyson API
* (grizzelbee) Fix: Fixed typo within data field anchorpoint - please delete the old ancorpoint manually.
* (grizzelbee) Fix: [#13](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/13) - Filter life value is now displayed in percent not in hours

### V0.5.1 (2020-10-27) (Heart of the hurricane)
* (grizzelbee) Fix: Added missing clearTimeout

### V0.5.0 (2020-10-27) (Heart of the hurricane)
* (grizzelbee) New: Editable data fields have now appropriate value lists
* (grizzelbee) New: Added more country codes
* (grizzelbee) New: Target temperature of heater can now be set - **in the configured unit!**
* (grizzelbee) Fix: [#13](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/13) - Filter life value is now displayed in percent not in hours
* (grizzelbee) Fix: [#6](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/6) - Changing the fanspeed does now fully work.  

### V0.4.1 (2020-10-16) (unbroken)
* (grizzelbee) New: [#8](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/8) - Documented ProductTypes for better overview and user experience in ReadMe
* (grizzelbee) New: [#9](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/9) - Added some Hot&Cool specific datafields
* (grizzelbee) New: Logging of from devices, when shutting down the adapter
* (grizzelbee) New: [#10](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/10) - Polling device data every X (configurable) seconds for new data, hence sensors don't send updates on changing values
* (grizzelbee) New: [#11](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/11) - Added Austria and France to Country-List
* (grizzelbee) Fix: Fixed bug in error handling when login to Dyson API fails
* (grizzelbee) Fix: [#12](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/12) - Fixed Dyson API login by completely securing via HTTPS.
* (grizzelbee) Fix: Updated some descriptions in config
  
### V0.4.0 (2020-09-29)
* (grizzelbee) New: devices are now **controllable**
* (grizzelbee) New: state-change-messages are processed correctly now
* (grizzelbee) Fix: Added missing °-Sign to temperature unit
* (grizzelbee) Fix: Terminating adapter when starting with missing Dyson credentials
* (grizzelbee) Fix: NO2 and VOC Indices should work now
* (grizzelbee) Fix: Fixed build errors

### V0.3.0 (2020-09-27) - first version worth giving it a try
* (grizzelbee) New: Messages received via Web-API and MQTT getting processed
* (grizzelbee) New: datapoints getting created and populated
* (grizzelbee) New: Added config item for desired temperature unit (Kelvin, Fahrenheit, Celsius)
* (grizzelbee) New: Added missing product names to product numbers
* (grizzelbee) New: Hostaddress/IP is editable / configurable
* (grizzelbee) New: calculate quality indexes for PM2.5, PM10, VOC and NO2 according to Dyson App

### V0.2.0 (2020-09-22) - not working! Do not install/use
* (grizzelbee) New: Login to Dyson API works
* (grizzelbee) New: Login to Dyson AirPurifier (2018 Dyson Pure Cool Tower [TP04]) works
* (grizzelbee) New: mqtt-Login to [TP04] works
* (grizzelbee) New: mqtt-request from [TP04] works
* (grizzelbee) New: mqtt-request to [TP04] is responding

### V0.1.0 (2020-09-04) - not working! Do not install/use
* (grizzelbee) first development body (non-functional)

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

Copyright (c) 2020 .. 2022 Hanjo Hingsen <open-source@hingsen.de>