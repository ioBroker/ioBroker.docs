---
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.fritzdect.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.fritzdect.svg
BADGE-Number of Installations (latest): http://iobroker.live/badges/fritzdect-installed.svg
BADGE-Number of Installations (stable): http://iobroker.live/badges/fritzdect-stable.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/foxthefox/ioBroker.fritzdect/badge.svg
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.fritzdect/README.md
title: 安装说明
hash: pmuEeuURe1K+Xf1kOmHTZG6bguIYTS/a2guR2rrDVq0=
---
![标识](../../../de/admin/fritzdect_logo.png)

# 安装说明
## FritzBox 设置
必须是具有 Fritzbox 和 Smarthome 访问权限的用户

＃ 密码
可能存在的问题：

- 密码长度超过 32 个字符
- 使用特殊字符
- 使用扩展 ASCII

如果有问题，那么也许首先使用更短更简单的 PW 来从根本上测试适配器的登录机制，然后逐步扩展它。

## 适配器设置
* 输入 IP 并以“http://”开头
* 轮询间隔可以任意选择（默认 5 分钟=300 秒）。这对于跟踪 ioBroker 之外的操作是必要的，因为 FritzBox 不提供自动更新。
* 如果轮询间隔设置为 0，则不执行循环查询。然后仅根据需要进行更新（参见手动更新）。

## 适配器启动
当适配器启动时，会发生以下情况：

* 查询 Fritzbox 的 FW 并将其写入日志中（某些 Fritzbox 没有响应，因此会产生错误）。
* 为设备创建数据点（对象）
* 创建组的数据点（对象）
* 对象被提供数据

以下对象在启动时仅写入一次：

* ID
* 固件版本
* 制造商
* 产品名称
* 主服务 ID
* 成员

## 恒温器功能
恒温器可在自动模式（温度控制）下运行，并将温度调节至目标温度。
目标温度可以是舒适温度、回退温度或者您自己选择的温度。

此外，阀门可以完全关闭，这对应于关闭状态。
另一个方向也可以通过 ON 进行预先选择，并对应 BOOST 或桑拿模式（不要忘记让它再次调节 ;-) ）。

目前这 3 种操作模式可以在数据点模式下用 0、1 或 2 进行预先选择。
当选择 0-AUTO 时，选择上次设定的温度。

### 带偏移的温度
可以校正 FritzBox 中测量的温度。为此，请输入测量的温度，然后会生成偏移量。该偏移量已被考虑在数据点 .temp 中。在这里您可以获得内部温度测量值。
散热器控制器内部使用的实际温度（actualtemp）也会因偏移而改变。这意味着 HKR 内部调节至校正值。
因此，对于目标/实际曲线而言，实际温度与目标温度是可比的。

## 手动更新
可以启动手动更新，例如在轮询间隔之间或禁用轮询时。
为此，向适配器实例发送一条包含文本“更新”且不包含任何参数的消息。
更新完成时将调用可选的回调。

下面是一个展示如何触发手动更新的示例：

```javascript
sendTo('fritzdect.0', 'update', null,
    (e) => {
        if (e["result"]) {
            // Update erfolgreich
        } else {
            console.log(e["error"]);
        }
    }
);
```

故障排除
建议查看日志；如果没有意义或者信息太少，请通过实例的专家设置选择调试模式。

## Changelog

### 2.6.1 (npm)
* log FW version of FB
* DECT350 now with battery data (issue #513)
* merge etsi devices into etsiunits (issue #597)

### 2.6.0 (npm)
* (khnz) PR#618 support on-demand updates
* change temperature checking < 28°C extended to < 35°C (issue #619)
* change dependencies

### 2.5.13 (npm)
* same as 2.5.12 with corrected IOB checker issues

### 2.5.12 (npm)
* skipping devices with empty identified (#598, #599), transmitted in FW8.01
* update responsive settings

### 2.5.11 (npm)
* upadate devDeps, linting error corrections
* iob checker corrections

### 2.5.10
* more loggimg for issue #500 of restart loop
* some error messages downgraded to warnings
* correction related to thermostat value take over, when reduced setting is activated
* update devDeps

### 2.5.9 (npm)
* correction for statistics,
* new message box password needs to be reentered in versions >=2.5.4
* xml output for buttons "my ..."

### 2.5.8 (npm)
* more error checking processing statistics

### 2.5.7 (npm)
* only for the hint that password needs to be reentered

### 2.5.6 (npm)
* change in jsonUIconfig

### 2.5.5 (npm)
* implementation of jsonUIconfig

### 2.5.4 (npm)
* correction for excluding routines

### 2.5.3 (npm)
* correction for updating komfort, absenk
* corrections for the statistics polling when device is not plugged in
* correction for year to date energy value (not recognizing two digit month)
* new possibility in admin page to exclude templates/routines/statistics for compatibility with older FB

### 2.5.2 (npm)
* correction for komfort, absenk if receiving 253/254 for OFF/ON it will be NaN see issue #164

### 2.5.1
* correction for energy today value

### 2.5.0
* getbasicdevicestats for powermeter (voltage, power, energy)
* derived values from energy stats -> year to date, month to date, last 12 month, last 31 days, todays accumulation

### 2.4.1 (npm)
* corrections reported by adapter-checker

### 2.4.0
* new function for routines which activatetrigger
* correction for templates and scenario (all templates are buttons, no need to check functionbitmask)

### 2.3.1
* new function gettriggerlist in admin
* corrected xml2json-light (included drirectly in repo until PR#8 is merged in repo), caused problems with templates in newer FB-firmware

### 2.3.0
* option to set for logging only when a difference to the old value is detected
* fritzdect-aha-nodejs as dependency

### 2.2.6
* new objects for thermostat adaptiveHeatingRunning, adaptiveHeatingActive

### 2.2.5
* several improvements for error handling
* handling of invalid xml-answer for check user rights

### 2.2.4
* correction: number format from admin page for times and tsoll

### 2.2.3 (npm)
* buttons setmodeon/off/auto have now initial value false, and when triggered with true get false again (for next trigger)
* buttons blindsclose/stop/open have now initial value false, and when triggered with true get false again (for next trigger)
* boostactivetime and windowopenactivetime can now be set to a default value in the adapter config
* new default temperature target in admin config (used if tsoll is not available e.g. object tree deleted and thermostat off/on)
* corrections for handling the initial value for tsoll/lasttarget when thermostat is off/on

### 2.2.2 (npm)
* license update
* corrected doc/de

### 2.2.1
* correction of "My colors" FB is not answering with valid xml
* added test script (fritz.js) for login check in doc/de

### 2.2.0 (npm)
* refactoring of API to FB, single instance with relogin after experied session
* refactoring main.js
* using http.request instead of deprecated @root/request
* log the user permissions
* remove fasthack for OFF/ON, upper range tchange, absenk, komfort = 32
* limitation of boost/windowopen activation to 24h
* correction of "present" (issue #224) 

### 2.1.16
* temperature range in sockets 0..32°C -> -20..50°C
* fast hack for OFF/ON feedback via temperature 253/254*0,5 -> upper range tchange, absenk, komfort = 128
* fast mod for fwversion for HAN-FUN
* present message correction

### 2.1.15 (npm)
* correction in timestamp as date/string
* several version bumps

### 2.1.14
* operationmode and hkrmode tracking also after commands
* extended datapoints for blinds from Rollotron
* presence=0 was detected but not written to the datapoint, now corrected (skipping the updated is not affected)

### 2.1.13
* correction at group of switches (switchtype not recognized -> simpleonoff)
* functionbitmask 32768 moved to role: switches

### 2.1.12 (npm)
* new values for DECT500
* back to full unit testing

### 2.1.11 (npm)
* template for fritzfon

### 2.1.10
* comfort/night is AUTO but reintroduced as operationmode

### 2.1.9
* info to user after start of adapter

### 2.1.8
* simpleonoff plug as device/group/template (telekom)

### 2.1.7 (npm)
* boostactivetime/windowactivetime only value

### 2.1.6
* pbkdf2 hash correction in calculation

### 2.1.5
* pbkdf2 hash correction in output to fritzbox

### 2.1.4
* removed the dependency to vis

### 2.1.3
* presence=0 continue

### 2.1.2
* withoit info.connection

### 2.1.1
* error handling in msgbox

### 2.1.0
* more refactoring => adapter based on class, gitCI instead of travisCI
* new thromastat buttons (setmodeauto, setmodeon,setmodeoff)

### 2.0.0 Breaking Changes in datapoints and structures (npm)
* refactoring of the code
* new fritzapi to either used md5 or pbkf2 decryption, needed for fritzbox FW >7.24
* **usage of AHA API returned values as datapoint identifier**
* **grouping of buttons under the DECT440**
* DECT500 groups
* accepting blocktime from fritzbox
* announcing new detected datapoints delivered by fritzbox
* option strictSSL (experimental)


### 1.1.4 (npm)
* blinds control
* update testing

### 1.1.3 (npm)
* setcolor cmd correction
* only valid color temperatures for white

### 1.1.2
* merge boost and boost active
* merge windowopen and windowopenactive
* DECT440 test

### 1.1.1 (npm)
* getColorDefaults in Admin, prepared but format of xml can no

### 1.1.0
* new features of AVM API 1.33
    * setblind
	* sethkrboost
	* setwindowopen
	* txbusy, windowopenactiveendtime,  boostactiveendtime, boostactive
* fade duration
* DECT440
* DECT500

### 1.0.1 (npm)
* bugfixes in fritz API calls
* error code 303 (but unknown what it means)
* (Black-Thunder) targetTemp=null
* (PascalBru) datapoint nextchange in hkr 

### 1.0.0 Breaking Change for non-native API objects
* merge of fritzapi into repo directly including added DECT500 commands
* **no longer support of non-native API calls (scraping of website)**
    * GuestWLAN
    * BatteryCharge
    * OS version
* correction of timestamp to date conversion for DECT400

### 0.3.2 (npm)
* new states in heater group, operationList and operationMode

### 0.3.1 (npm)
* (scrounger) new states in COMET, operationList and operationMode

### 0.3.0 (npm)
* new DECT500 supported (without commands)

### 0.2.5 (npm)
* fixed testing
* correction for indication of actualtemp in heater groups
* connection type and datasource added in io-package.json
* correction pf switch and alert state (boolean in update routine)

### 0.2.4 (npm)
* (Scrounger) correction of type mismatch (string boolean)

### 0.2.3 (npm)
* skip updating values, when device not present

### 0.2.2 (npm)
* added FritzDECT400 incl. testing
* removed offset in temp value
* new datapoint offset
* added template for switches
* added template testing

### 0.2.1 (npm)
* gulp added
* correction for DECT100 without temperature (caused a stop in creation of objects)
* template creation corrected
* my templates added in admin page

### 0.2.0
* compact mode

### 0.1.5 (npm)
* reading and activation of templates added
* correction of actual temperature in DECT200 and COMET (now offset recognized)
* password now hidden typed and encrypted
* new datapoint actualtemp for Comet
* fritzapi 0.10.5

### 0.1.4 (npm)
* button added, only send the timestamp of last click
* fritzapi 0.10.4

### 0.1.3 (npm)
* windowopenactiv added to thermostat

### 0.1.2  (npm)
* errorcode string->number
* batterylow -> boolean
* switch in admin for non native API call for battery charge in % (shall prevent 403 message logs)

### 0.1.1 (npm)
* switch for GuestWLAN when no access is granted and polling creates an error
* check for devices in admin page for better access to the xml/json stream from fritzbox
* admin v3 implemented

### 0.1.0 (npm)
* major code change to use the xml stream instead the dedicated API-commands for the dedicated values
* creation of objects according the feedback from fritzbox
* support of groups
* still usage of non-universal object names
* more objects

### 0.0.14 (npm)
* correction of temp offset influence

### 0.0.13 (npm)
* DECT200 voltage new object
* DECT200 mode/lock value polling
* Comet mode as number and not array
* ADMIN v3

### 0.0.12 (npm)
* changed state to  mode AUTO/OFF/ON for thermostat (including datapoint lasttarget when going back to AUTO)
* added name state for thermostat
* DECT100 temperature reading
* Contact reading

### 0.0.11 (npm)
* added state OFF/ON for thermostat

### 0.0.10 (npm)
* change to object oriented interface
* getOSversion when starting for log

### 0.0.9 (npm)
* values '1' accepted for ON
* values '0' accepted for OFF

### 0.0.8 (npm)
* messages info-> debug
* values 1/true/on/ON accepted for ON
* values 0/false/off/OFF accepted for OFF

### 0.0.7 (npm)
* current temp of Comet/DECT300
* cyclic polling GuestWLAN

### 0.0.6 (npm)
* correction targettemp in DECT200 section

### 0.0.5 (npm)
* setTemp on COMET
* GuestWlan corrected

### 0.0.4 (npm)
* cyclic status polling

### 0.0.3 (npm)
* user now configurable

### 0.0.2 (npm)
* metro widget for Dect200
* smartfritz-promise->fritzapi
* running version, tested with 1x DECT200 and Fritzbox FW=6.51 on Win10 with 4.5.0 and raspberry 4.7.0

### 0.0.1
* running version, tested with 1x DECT200 and Fritzbox FW=6.30

## License

The MIT License (MIT)

Copyright (c) 2018 - 2025 foxthefox <foxthefox@wysiwis.net>

Copyright (c) 2025 foxthefox <foxthefox@wysiwis.net>