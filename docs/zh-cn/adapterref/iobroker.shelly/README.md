---
BADGE-Number of Installations: http://iobroker.live/badges/shelly-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.shelly.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.shelly.svg
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.shelly/README.md
title: ioBroker.shelly
hash: lWXmsOSrtSultk4UC9EcmYOpqJo9oXG0QGiSqaHzgEo=
---
![标识](../../../en/adapterref/iobroker.shelly/../../admin/shelly.png)

# IoBroker.shelly
＃＃ 要求
1. nodejs 12.0（或更高版本）
2. js-controller 3.3.0（或更高版本）
4. 管理适配器 5.1.25（或更高版本）

## 设备代
查看*支持的设备*列表以获取更多详细信息。

- Gen1：ESP8266 设备、CoAP 或 MQTT
- Gen2：ESP32 设备、RCP 或 MQTT

＃＃ 一般的
您可以在 CoAP 或 MQTT 模式下使用适配器。默认模式为 CoAP，您无需执行任何操作。 **如果要使用 Gen2 设备，必须使用 MQTT！**

![iobroker_general](../../../en/adapterref/iobroker.shelly/../iobroker_general.png)

＃＃ 配置
### 限制登录
要使用受限登录保护您的 Shelly 设备，请在 ioBroker 配置中的*常规设置* 选项卡上选择用户名和密码。

![iobroker_general_restrict_login](../../../en/adapterref/iobroker.shelly/../iobroker_general_restrict_login.png)

在您的所有 Shelly 设备上激活登录限制：

1. 在您的网络浏览器中打开 Shelly Web 配置（而不是在 Shelly App 中！）
2.进入```互联网和安全设置->限制登录```
3. 激活复选框并输入之前配置的用户名和密码
4. 保存配置 - Shelly 会自动重启
5. 确保在所有 Shelly 设备上配置相同的用户名和密码

![shelly_restrict_login](../../../en/adapterref/iobroker.shelly/../shelly_restrict_login.png)

### 状态变化
默认情况下，只有当状态的值发生更改时，您才会看到更改。在这种情况下，*即使没有值更改也更新对象* 被停用。

例子：

* shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'S'（上次更改时间戳：01.02.2020 10:20:00）
* shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'S' (Last Changed Timestamp: 01.02.2020 **10:20:00**) - ioBroker 中没有显示变化，因为 value 是相同的
* shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'L'（上次更改时间戳：01.02.2020 10:22:00）

如果您激活 *Update objects 即使没有值更改*，则状态将在没有值更改的情况下更新。在这种情况下，唯一会改变的是 *Last Changed Timestamp*

例子：

* shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'S'（上次更改时间戳：01.02.2020 10:20:00）
* shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'S' (Last Changed Timestamp: 01.02.2020 **10:21:00**) - ioBroker 中的时间戳更改，值相同
* shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'L'（上次更改时间戳：01.02.2020 10:22:00）

### CoAP
默认使用 CoAP 协议。

如果您使用固件版本低于 1.9.4 的 Shelly，则您无需进行任何配置。 ioBroker 会自行找到您的 Shelly 设备。

**如果您使用 1.9.4 以上的固件版本，则必须在您的 Shelly 设备上输入 CoIoT 服务器用于 CoAP。** 输入您的 ioBroker 服务器的 IP 地址，然后输入端口 5683 作为 CoIoT 服务器。例如，如果 ioBroker 在地址 ```192.168.1.2``` 上运行，您必须输入 ```192.168.1.2:5683``` 并激活 CoIoT。

**重要提示：由于 CoAP 使用多播 UDP 包，因此 Shelly 设备必须与您的 ioBroker 服务器位于同一子网中。**

如果您在 docker 容器中使用 ioBroker，则容器必须在网络模式下运行 ```host``` 或 ```macvlan```。如果 docker 容器以 ```bridge``` 模式运行，则不会找到您的 Shelly 设备。

![iobroker_restrict_login](../../../en/adapterref/iobroker.shelly/../iobroker_general_coap.png)

CoAP 将添加您网络中的所有设备。如果要排除某些 Shelly 设备，可以将它们放入黑名单。只需将序列号输入黑名单表：

![iobroker_coap](../../../en/adapterref/iobroker.shelly/../iobroker_coap.png)

＃＃＃＃ 故障排除
在某些情况下，处于 CoAP 模式的 Shelly 适配器将找不到 Shelly 设备。请尝试以下操作：

1. 禁用 ioBroker Shelly 适配器实例。 **不要卸载 Shelly 适配器！** 但禁用 Shelly 实例很重要。
2. 打开终端窗口并在 ioBroker 服务器上运行以下命令：

```
cd /opt/iobroker/node_modules/iobroker.shelly/
node coaptest.js
```

您可以使用 ```tcpdump``` 来嗅探 CoAP 消息：

```
# Install tcpdump if it is not installed
sudo apt-get update
sudo apt-get install tcpdump

# tcpdump with IP address of Shelly device on network device eth1
sudo tcpdump -i eth1 src <IP-OF-SHELLY> and port 5683 -A

# tcpdump with IP address of Shelly device
sudo tcpdump src <IP-OF-SHELLY> and port 5683 -A

# tcpdump of all Shelly devices on network device eth1
sudo tcpdump  -i eth1 port 5683 -A

 # tcpdump of all Shelly devices
sudo tcpdump port 5683 -A
```

现在您将看到来自 Shelly 的所有 CoAP 消息。如果您没有看到任何消息，则说明 UDP 或多播消息存在网络问题。

CoAP 消息看起来像这样：

``` 
UDP Server listening on 0.0.0.0:5683
2020-08-19T19:33:29.484Z - 192.168.20.233:5683 - P-B3citsml	SHBTN-1#AXXXXXXXXXX#2RC{"G":[[0,9103,0],[0,2102,"S"],[0,2103,1],[0,3115,0],[0,3112,0],[0,3111,100],[0,9102,["button"]]]}
2020-08-19T19:33:29.827Z - 192.168.20.233:5683 - P-C3citsml	SHBTN-1#AXXXXXXXXXX#2RC{"G":[[0,9103,0],[0,2102,"S"],[0,2103,1],[0,3115,0],[0,3112,0],[0,3111,100],[0,9102,["button"]]]}
2020-08-19T19:33:33.942Z - 192.168.20.233:5683 - P-D3citsml	SHBTN-1#AXXXXXXXXXX#2RC{"G":[[0,9103,0],[0,2102,"S"],[0,2103,1],[0,3115,0],[0,3112,0],[0,3111,100],[0,9102,["button"]]]}
```

### MQTT
1.在ioBroker中打开Shelly Adapter配置
2.在*general settings*中选择```MQTT and HTTP```作为*protocol*
3.打开**mqtt设置**标签
4. 选择一个安全的用户名和密码（您必须在您的 Shelly 设备上配置这些信息）

![iobroker_general](../../../en/adapterref/iobroker.shelly/../iobroker_general_mqtt.png)

![iobroker_mqtt](../../../en/adapterref/iobroker.shelly/../iobroker_mqtt.png)

在所有 Shelly 设备上激活 MQTT：

1. 在您的网络浏览器中打开 Shelly Web 配置（而不是在 Shelly App 中！）
2.进入```互联网和安全设置->高级-开发者设置```
3. 激活 MQTT 并输入之前配置的用户名、密码和 ioBroker 安装的 ip 地址 - 后跟端口 1882（例如```192.168.20.242:1882```）
4. 保存配置 - Shelly 会自动重启

- 对于 Gen1 设备：不要更改```自定义 MQTT 前缀```（如果更改前缀，适配器将无法工作）

![shelly_mqtt1](../../../en/adapterref/iobroker.shelly/../shelly_mqtt1.png)

![shelly_mqtt2](../../../en/adapterref/iobroker.shelly/../shelly_mqtt2.png)

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
* (klein0r) Code refactoring
* (klein0r) Updated documentation

### 5.0.0 (2021-12-08)
Important: The adapter now requires at least Node.js 12.x, js-controller 3.3+ and Admin 5.1.25+
* (klein0r) Shelly Plus Support (1, 1 PM)
* (klein0r) Shelly Pro Support (4 PM)
* (klein0r) Updated logo
* (klein0r) Use class definition instead
* (klein0r) Use internal encryption methods
* (klein0r) Admin 5 config

### 4.1.2 (2021-11-14)
* (sbormann) Fix the online checks to stay online

### 4.1.1 (2021-11-13)
* (Apollon77) Try to prevent State changes after adapter is stopped

### 4.1.0 (2021-11-06)
* (HGlab) several fixes and adjustments
* (turbolift) fix temperature maximum warning
* (Apollon77) Destroy Coap and MQTT server on unload

### 4.0.8 (2021-05-06)
* (Stübi) - Online Status (beta, does not work correct)
* (Stübi) - Temperature greater min/max - Issue #370

### 4.0.7 (2021-02-07)
* (Stübi) - fixing the wrong identifier name from green to blue - Issue #334
* (Stübi) - renamed Shelly Motion MQTT name 
* (Stübi) - Because polling for battery devices is only permieted every 60 sec., the online state will not supported anymore. 
* (Stübi) - Polling for all battery devices changed to 60 sec. This can not be changed to any other value, still if you a power supply.
* (Stübi) - Add state for led light control for Shelly Plug S - Issue #344
* (quedrum) - Shelly1 Garage with ADDon and reed switch - Issue #276

### 4.0.6 (2021-02-02)
* (Stübi) - add min, max to state transiton for Shelly RGBW2 
* (Stübi) - if a property in the returned json for a http request does not exist, it will not shown as an error anymore
* (Stübi) - Bugfixing Shelly 1L
* (klein0r) - Added shelly motion (SHMOS-01)

### 4.0.5 (2021-02-01)
* (Matze2010) - Add Support for Shelly Uni (SHSW-L)
* (Matze2010) - Shelly 2.5 Roller: Support for favorite positions 
* (Stübi) - Bugfixing TypeError in Shelly Plug implementation (Issue #281)
* (Stübi) - Support of Shelly Color Bulb (SHCB-1) - Issue #317
* (Stübi) - Support of Shelly Button 1 (SHBTN-2) - Issue #316, #302, #303
* (Stübi) - add state Total_Returned for Shelly EM3 - Issue #299
* (Stübi) - add state transiton and fade_rate to Shelly Dimmer - Issue #260
* (Stübi) - add state transiton for Shelly RGBW2 - Issue #289

### 4.0.4 (2020-11-15)
* (Apollon77) update dependencies and shelly-iot lib
* (Stübi) - Bugfix EM3, unit of comsumed power Wh instead of kWH
* (Stübi) - optimize the destroy function (Bugfixing)
* (Stübi) - Bugfixing Relay0.Event error for Shelly I3 in MQTT mode (Issue #241)
* (harrym67) - Shelly 2.5 Roller mode. According to Shelly API: changed existing state swap to swap_input and add state swap.(Issue #240)
* (Stübi) - Allow setting of customer MQTT prefix (Issue #244)
* (harrym67) - Add Support for Shelly Uni (SHUNI-1)
* (harrym67) - Bugfix EM3 (Issue #256)
* (foxriver76) - Bugfix MQTT password check (Issue #264)

### 4.0.3 (2020-08-19)
* (Stübi) - Add a checkbox, to optionally enable updates of objects even if they have not changed (Issue #209)
* (Stübi) - Calculate temperature fahrenheit for Shelly 1PM and Plug S in MQTT mode
* (Stübi) - Fixed longpush time for MQTT (Shelly 1, 1PM, 2 and 2.5) 
* (Stübi) - Add State for changing temperature unit for Shelly HT and DW2
* (Stübi) - Delete external temperature 4 and external humidity 4 states for Shelly 1 and 1PM because they do not exist
* (Stübi) - Renamed state temperature to temperatureC for Shelly 1, 1PM, 2, 2.5, Plug S
* (Stübi) - Add tmperature in Celsius and Fahrenheit for Shelly HT and DW2
* (Stübi) - Bugfixing. Add missing states to MQTT, which exist for CoAP (Shelly 2, 2.5) 
* (Stübi) - Polltime for http optimized. 
* (Stübi) - removed min and max values for temperature states (Issue #236)
* (Stübi) - Bugfixing. Add timer to Shelly 1, 1PM for CoAP and removed it for MQTT (Shelly 1, 1PM, 2, 2.5) because it is not supported by MQTT
* (Stübi) - Add overpower value to Shelly 1, 1PM, 2, 2.5 and Plug, Plug S
* (Stübi) - Removed channel name from Shelly 4 Pro (Issue #238)

### 4.0.2 (2020-08-16)
* (Stübi) - Bugfixing Shelly DW2 (Issue #220)
* (Stübi) - Bugfixing manually set object name is overwritten (Issue #224)

### 4.0.1 (2020-08-15)
* (Stübi) Major Change!! If you use the CoAP protocol only Shelly devices with Firmware 1.8.x or above supported! All devices with Firmware below 1.8.x except Shelly 4Pro will not working with this release!
* Official release to npm/latest

### 4.0.0 (05.08.2020)
* (Stübi)     - Major Change!! If you use the CoAP protocol only Shelly devices with Firmware 1.8.x or above supported! All devices with Firmware below 1.8.x except Shelly 4Pro will not working with this release!
* (@harrym67) - Changing device files 
* (Stübi)     - Since Firmware 1.8. the Shelly device names like shelly.0.SHBTN-1#A4CF12F454A3#2 ends with #2. It will be changed back to #1 like shelly.0.SHBTN-1#A4CF12F454A3#1. 
* (@harrym67) - Add state factoryResetFromSwitch for Shelly 1, 1pm, 2, 2.5, Dimmer, Dimmer 2 and RGBW2
* (@harrym67) - Add states longpushDurationMsMin, longpushDurationMsMax and multipushTimeBetweenPushesMsMax for Shelly IX3
* (@harrym67) - Add state ChannelName for Shelly 1, 1pm, 2, 2.5, Dimmer, Dimmer 2, 4Pro, EM and 3EM
* (@harrym67) - Add state StopReason for Shelly 2 and 2.5 in Shuttermode
* (@harrym67) - Add state name to all Devices (Device Name)

### 3.3.6 (26.07.2020)
* (Stübi) - Bugfixing temperature for Shelly Dimmer (Issue #201)
* (Stübi) - Tried to fix high CPU load by replacing ping with tpcping (Issue #196, #202)
* (Stübi) - correct spelling mistake for Shelly DW2 (Issue #205)

### 3.3.5 (04.07.2020)
* (Stübi) - Add Shelly 4 Pro
* (Stübi) - Bugfixing Shelly RGBW2, sate lights.switch color mode
* (Stübi) - Add Shelly DW2
* (Stübi) - Add states longpush and input to Shelly Dimmer 1 (CoAP and MQTT)
* (Stübi) - Add states longpush and input to Shelly Dimmer 2 (CoAP and MQTT)
* (Stübi) - Add states longpush and input to Shelly 1, 1 PM, 2, 2.5 (CoAP)
* (Stübi) - Add state input to Shelly RGBW2 (CoAP)
* (Stübi) - Add state deviceid (Issue #193)

### 3.3.4 (23.06.2020)
* (Stübi) - Add Shelly Dimmer 2
* (Stübi) - Add states longpush and input to Shelly Dimmer 1 (MQTT)
* (Stübi) - Add states power and energy to Shelly Duo
* (Stübi) - Get power and energy by CoAP instead of http for Shelly 1 PM
* (Stübi) - Bugfixing Shelly Button 
* (Stübi) - Bugfixing Shelly 1 humidity MQTT
* (Stübi) - Fixed typo error (external temperature) / Shelly 1, 1 PM 
* (Stübi) - Fixed role for external temperature / Shelly 1, 1 PM 
* (Stübi) - Changed CoAP concept, because Shelly will change the CoAP payload in one of the future firmware versions. This makes the adjustments later easier. 
* (Stübi) - Shelly 4 Pro not supported anymore. If you need it please create an GitHub issue.
* (Stübi) - Shelly RGBW not supported anymore. If you need it please create an GitHub issue .

### 3.3.3 (18.06.2020)
* (Stübi) - Add Shelly Button
* (Stübi) - Add Shelly Gas

### 3.3.2 (13.06.2020)
* (Stübi) - Bugfixing Shelly RGBW2

### 3.3.1 (13.06.2020)
* (Stübi) - Change readme
* (Stübi) - Add state external humidity to Shelly 1 (Bug in  3.3.0)
* (Stübi) - Renamed state color to lights for Shelly RGBW2 - Issue #169
* (Stübi) - Renamed state light to lights for Shelly Dimmer
* (Stübi) - Bugfixng Shelly RGBW, RGBW and Bulb. State ligths.rgbw did not work - Issue #169

### 3.3.0 (04.06.2020)
* (Stübi) - Use only version with Shelly firmware greater equal v1.7.0 . Shelly firmware less v1.7.0 will not be supported by this Shelly adapter version anymore
* (Stübi) - Add state vibration and tilt to Shelly DW
* (Stübi) - Add polltime to index_m.html  
* (Stübi) - Fix RGBW2 with FW 1.7 - Issue #161
* (Stübi) - Add state Button Type for Shelly  1, 1PM, 2, 2.5 - Issue #157
* (Stübi) - Add state Button Reverse for Shelly 1, 1PM, 2, 2.5
* (Stübi) - Add firmware update button
* (Stübi) - Fix auto firmware update
* (Stübi) - Add state external humidity to Shelly 1 / 1PM - Issue #160
* (Stübi) - Add helper library and cleanup source code
* (Stübi) - Add Shelly I3

### 3.2.8 (09.05.2020)
* (c7j3X) - Add device Shelly Vintage
* (Stübi) - Add state vibration and tilt to Shelly DW

### 3.2.7 (28.04.2020)
* (Stübi) - User can enable/disable sentry logging

### 3.2.6 (27.04.2020)
* (Apollon77)  - Update Dependencies incl shelly-lib to prevent exceptions
* (Apollon77)  - Add Sentry for error/crash reporting (active with js-controller 3.0)
* (Stübi       - Add for hue two new datapoints for Shelly Bulb and RGBW2
* (@SamLowrie) - Add option to set a specific multicast interface for CoAP server

### 3.2.4 (11.04.2020)
* (Stübi) - Bugfixing MQTT ext_temperature for Shelly 1

### 3.2.3 (03.03.2020)
* (Stübi) - Bugfixing Shelly 3EMfor MQTT support (fixed datapoints for total and total_returned)
* (Stübi) - Bugfixing MQTT support for door and windows sensor (issue #135)

### 3.2.2 (03.03.2020)
* (Stübi) - Bugfixing, if Shelly sends a string instead of number and boolean (issue #131)

### 3.2.1 (02.03.2020)
* (Stübi) - Bugfixing Shelly 3EMfor MQTT support

### 3.2.0 (13.02.2020)
* (Simon W.) - Add device Shelly 3EM
* (Stübi)    - Add device Shelly Door/Windows sensor 
* (Stübi)    - Add external temperature sensor for Shelly 1, 1PM and 2.5 (only CoAP)

### 3.1.9 (25.01.2020)
* (Stübi) - Bugfixing, auto update new firmware

### 3.1.7 (08.01.2020)
* (Stübi) - Add state energy to Shelly dimmer

### 3.1.6 (30.12.2019)
* (Stübi) - Add device Shelly Door/Windows sensor 
* (Stübi) - Bugfixing, auto update new firmware

### 3.1.5 (23.12.2019)
* (Stübi) - Add device Shelly Plug S2. It will be shown as Shelly Plug S (SHPLG-1) in MQTT

### 3.1.4 (11.12.2019)
* (Stübi) - Bugfixing, auto update new firmware

### 3.1.3 (07.12.2019)
* (Stübi) - Bugfixing. Add power state to Shelly dimmer in MQTT mode

### 3.1.2 (11.10.2019)
* (Stübi) - Bugfixing. Error message will not only be shown in debug modus

### 3.1.1 (14.09.2019)
* (Stübi) - Add device Shelly Dimmer

### 3.1.0 (03.09.2019)
* (Stübi) - Add device Shelly flood

### 3.0.9 (06.08.2019)
* (Stübi) - Bugfixing, with the new firmware, Shelly HT sends the humidity by CoAP as it should. Division by 2 removed!
* (Stübi) - Add status Duration in roller (shutter) mode for CoAP (not working with MQTT) 
* (Stübi) - Changed role from level to level.brightness for state Gain

### 3.0.8 (27.07.2019)
* (Stübi) - Add device Shelly EM 
* (Stübi) - Add state energy for Shelly Plug S, Shelly PM and Shelly 2.5 in CoAP mode 
* (Stübi) - Add state temperature for Shelly Plug S, Shelly PM and Shelly 2.5 in CoAP mode
* (Stübi) - Add state overtemperature for Shelly Plug S, Shelly PM and Shelly 2.5 in CoAP and MQTT mode
* (Stübi) - Bugfixing, the Shelly HT sends by CoAP the humidity multiply with 2. The fix divides the value by 2.

### 3.0.7 (03.07.2019)
* (Stübi) - correct spelling error 
* (Stübi) - Adjust IP address after IP change in CoAP Modus (Issue 70)
* (Stübi) - Bugfixing for datapoint power (rounding method was wrong)
* (Stübi) - Fixed Buffer() is deprecated due to security and usability issues for Node >= 10

### 3.0.6 (29.06.2019)
* (Stübi) - State reboot and uptime added

### 3.0.5 (16.06.2019)
* (Stübi) - Bugfixing 
* (Stübi) - Add Blacklist

### 3.0.4 (04.06.2019)
* (Stübi) - Bugfixing (Issue #60)

### 3.0.3 (02.06.2019)
* (Stübi) - Support of MQTT QoS 1 and 2. Add auto firmware update to the menu

### 3.0.2 (25.05.2019)
* (Stübi) - Bugfixing and longpush and input states for Shelly 1, 2, 1pm, 2.5 and Shelly RGBWW2 added. Add state temperature to Shelly 1pm, 2.5 and Plug S.

### 3.0.1 (21.05.2019)
* (Stübi) - Redesign of the adapter. You can choose now between CoAP and MQTT protocol. The Shellys use this protocolls to send there state changes to ioBroker in realtime. Out of the Box the Shelly works with the CoAP protocol. You do not have to configure anything. The Shelly will be found by the Shelly Adapter itself. If you want to use MQTT, you have configure all your Shelly devices. You find a detailed installing documentation here: [Installation Documentation](./docs/EN/INSTALL.md). If you have problems with the version 3.0.1 please change back to 2.2.0 and leave an Issue (bug report) here: [GitHub Issues](https://github.com/iobroker-community-adapters/ioBroker.shelly/issues).

### 2.2.0 (13.04.2019)
* Add devices Shelly 2.5 and Shelly 1 PM

### 2.1.9 (31.03.2019)
* Add status 'firmware update' for Shelly RGBW, RGBW2 and Bulb

### 2.1.8 (19.03.2019)
* Consider roller (shutter) position in CoAP message 
* Support of Shelly Sensor

### 2.1.7 (15.03.2019)
* Changing all RGBWW2 colors at the same time
* new RGBWW2 State color.rgbw with the format #RRGGBBWW

### 2.1.6 (08.03.2019)
* Shelly RGBWW2 bug fixing (whit did not work in color mode)

### 2.1.5 (05.03.2019)
* Shelly Smoke Support

### 2.1.4 (20.02.2019)
* Bugfixing of Shelly RGBW2 Support. If you have installed version 2.1.3, please delete all RGBW2 objects first, because the objects will be renamed from lights to color and white in version 2.1.4.

### 2.1.3 (16.02.2019)
* Support of Shelly RGBW2

### 2.1.0 (09.02.2019)
* New Status 'new firmware available' for Shely1, Shelly2, Shelly4Pro and ShellyPlug

### 2.0.8 (31.01.2019)
* Bugfixing, polling new Shelly status must be at least 1 sec ago

### 2.0.7 (21.01.2019)
* Bugfixing for objects AutoTimerOn and AutoTimeroff

### 2.0.6 (12.01.2019)
* Getting faster online status for Shelly devices, excluded H&T. Fix of power status for Shelly Plug.

### 2.0.5 (07.01.2019)
* Fixing an error if Shelly device is not reachable (offline)

### 2.0.4 (04.01.2018)
* Support of js-controller compact mode and performance optimizing. Relay status changes will be shown much faster in ioBroker for Shelly 1, 2 and 4Pro

### 2.0.3 (02.01.2018)
* Shows RSSI Status for Shelly 1 & 2. You need Firmware 1.4.4

## License
The MIT License (MIT)

Copyright (c) 2018-2021 Thorsten Stueben <thorsten@stueben.de>, Apollon77 <iobroker@fischer-ka.de>

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