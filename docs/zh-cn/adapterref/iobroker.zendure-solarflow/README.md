---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.zendure-solarflow/README.md
title: ioBroker.zendure-solarflow
hash: AVn5YzHd9CTBo8vIgT61hMQK4ryROLtKMXW09AeSWz4=
---
![标识](../../../en/adapterref/iobroker.zendure-solarflow/admin/zendure-solarflow.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.zendure-solarflow.svg)
![下载](https://img.shields.io/npm/dm/iobroker.zendure-solarflow.svg)
![安装数量](https://iobroker.live/badges/zendure-solarflow-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/zendure-solarflow-stable.svg)
![新平台](https://nodei.co/npm/iobroker.zendure-solarflow.png?downloads=true)
![捐](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)

# IoBroker.zendure-solarflow
**测试：**![测试与发布](https://github.com/nograx/ioBroker.zendure-solarflow/workflows/Test%20and%20Release/badge.svg)

## Zendure Solarflow 适配器适用于 ioBroker
该项目是一个 ioBroker 适配器，用于从 Zendure Solarflow Cloud API 读取数据。它使用 Zendure 提供的官方 API。
您可以在此处阅读有关该 API 的更多信息：https://github.com/Zendure/developer-device-data-report

＃＃ 特征
- 获取 Solarflow 设备的所有遥测数据，包括官方应用程序中不可见的数据 - 例如电池电压
- 像在官方应用程序中一样控制您的 Solarflow HUB。大多数设置都可用。
- 控制输出限制 - 您不仅限于使用 Shelly Pro EM 来实现零馈入。您还可以通过 ioBroker 中的脚本或 blockly 设计更复杂的场景。
- 如果一块电池电压过低（电池保护），则停止输入。仅当通过适配器设置输出限制时才有效
- 同时控制多个 Solarflow！
- 获得更精确的计算！
- 适用于所有 Zendure SolarFlow 设备：HUB1200、Hyper2000、HUB2000 和 AIO！我只能在 HUB1200 上进行测试，因为我没有其他设备……

注释
1. 请停用/取消选中 Zendure App 中的所有模式，否则无法设置输出限制！

   ![Solarflow 设置窗口](https://raw.github.com/nograx/ioBroker.zendure-solarflow/master/Screenshots/ZendureSolarflowSettings.png)

2. 使用 ioBroker 适配器登录后，您将退出官方 iOS 或 Android 应用程序。这是正常现象。作为解决方法，您可以使用另一个电子邮件创建第二个 Zendure 帐户，并向该帐户授予对 Solarflow HUB 的访问权限。然后使用第二个帐户访问 ioBroker/Zendure Solarflow 适配器。

3. 如果没有太阳能输入且设备在线，适配器将显示电池使用量 +10W。这将反映设备的“待机”使用情况。

## 致谢
感谢 https://github.com/reinhard-brandstaedter/solarflow，它对 Zendure 的 MQTT 服务器知识帮助很大！谢谢！

## 捐赠
如果您发现该适配器对您有用并且想要支持我的工作，请随时通过 Paypal 捐款。谢谢！（这是 Nograx 的个人捐款链接，与 ioBroker 项目无关！）<br />

## Changelog
### 1.9.3 (2024-11-22)

- Fix for Low Voltage Block not deactivated.

### 1.9.2 (2024-11-21)

- Fix some state definitions

### 1.9.1 (2024-11-21)

- Improvement for 'Low Voltage Block'.
- Changed the state "hubState" a an option value.

### 1.9.0 (2024-11-20)

- New option to force Solarflow device to go offline when "Low Voltage Block"-option is used.

### 1.8.8 (2024-09-20)

- Improve connection retry, expand the time with every retry attempt.
- Start "restart adapter job" regardless of connection.
- Fix Hyper setInputLimit with step

### 1.8.7 (2024-09-09)

- Fix missing control states for AIO

### 1.8.6 (2024-09-06)

- Change login method: Added a retry loop for connecting to Zendure Cloud, if the Cloud Service "hangs" or is not available it will retry the connection 3 times.

### 1.8.5 (2024-08-26)

- Fix missing states for new HUB Firmware when connected to ACE
- Fix correct max value for AIO

### 1.8.4 (2024-08-16)

- Add support for Smart Plug, but only Power is available at the moment - unstable as often data is not updated by MQTT
- Some code improvements

### 1.8.3 (2024-08-12)

- Fix SOC and energyWhMax Value (counted by type of attached batteries)
- Add Calculation for Grid Input (only for Ace 1500 and Hyper 2000)
- Fix suggestions by ioBroker repository checker

### 1.7.7 (2024-08-02)

- Fix Input and Output limit for Hyper 2000

### 1.7.6 (2024-08-01)

- Fix support for 'Hyper_Test' devices
- Improved code for state creation

### 1.7.5 (2024-07-31)

- Fix controlling AC mode for Hyper 2000 (set acMode to 1: Charge by AC, 2: Output to AC)
- Show product name in channel name
- Show battery type as state in packData
- Show Hyper Temperature in States

### 1.7.4 (2024-07-31)

- Set max value and step for setInputLimit

### 1.7.3 (2024-07-30)

- Fix AC input value for Hyper to max. 1200W
- Fix dcSwitch and acSwitch value

### 1.7.2 (2024-07-29)

- Fix acSwitch for ACE and Hyper

### 1.7.1 (2024-07-29)

- Fix missing ACE 1500 when connected with HUB1200 / HUB2000
- Fix some missing states

### 1.7.0 (2024-07-26)

- Add support for Hyper 2000 and ACE 1500. Maybe not all states and control parameter are available. Still need to do some investigation.
- Some minor bugfixes.

### 1.6.7 (2024-06-23)

- Fix reconnect again. Adapter will now restart every 3 hours to cleanup fully.

### 1.6.6 (2024-06-21)

- Tweaked recurring refresh of access token.

### 1.6.5 (2024-06-20)

- Fix reconnect issue. Adapter will now restart if connection semms to be broken.

### 1.6.4 (2024-06-03)

- Fix services

### 1.6.3 (2024-06-03)

- Fixed reconnect when connection seems to be dead.

### 1.6.2 (2024-05-21)

- Changed standby usage to 10W

### 1.6.1 (2024-05-13)

- Fix issue that sometime data is not updated
- Add standby usage of HUB (20W) when solarinput is low

### 1.5.3 (2024-04-19)

- Fix autoRecover datatype issue

### 1.5.2 (2024-04-17)

- Minor bugfixes and improvements

### 1.5.0 (2024-04-12)

- Add the possibility to connect to the 'Fallback' MQTT server known as 'Developer MQTT'. This server is read-only - so no control is possible!

### 1.4.0 (2024-04-03)

- Add calculation states for solar input 1 & 2
- Add states for wifiState, hubState, pvBrand and inverseMaxPower
- Rename missleading title for input field 'Username' in settings to 'E-Mail'
- Fix energyWh, energyWhMax and SOC in calculations if "Low Voltage Check" is not used, it will set the calculation soc to 0 if minSoc (discharge limit) is reached
- Fix password input in settings

### 1.3.0 (2024-03-26)

- Fix calculation for outputPackEnergy and packInputEnergy
- Trigger full telemetry update on adapter start
- Add state and control for buzzer switch
- Add state and control for bypass mode and automatic reset of bypass mode next day
- Add states for pass (Bypass on/off), autoRecover (auto-mode for Bypass next day) and passMode (current bypass mode)
- Add efficiency factor for calculations (96% charging, 92%-98%\* for discharging - based on measuring from VoltAmpereLux Youtube channel - THANKS!)
- Changed calculations timeframe from 10secs to 30secs (performance related)

### 1.2.5 (2024-03-19)

- Fix error "Read-only" state written without ack-flag

### 1.2.4 (2024-03-18)

- Use setInterval instead of cronjob for refreshing access token

### 1.2.3 (2024-03-15)

- Fix ACK on onStateChange
- Update Readme

### 1.2.2 (2024-03-14)

- Fix issue that renamed devices could not be found.
- Add states for name, product name, serial ID and configured server.
- Make "energyWhMax" State writable, so you can adjust the max Value.
- Sent a warning if a device is configured for a server not in use.

### 1.2.1 (2024-03-13)

- Fix calculation of soc: Set energyMaxWh to current energyWh if Zendures SOC is 100%
- Round SOC to max 1 digit after comma.

### 1.2.0 (2024-03-13)

- EU server is working now.
- Fix calculation errors in log when calculation is not used
- More Debug Output
- Filter SolarFlow devices, so no other devices (e.g. SmartPlugs) will be added.
- Clear password when settings loaded, as encrypted password is loaded into input and leads to a wrong password.

### 1.1.23 (2024-03-11)

- Fix calculation of "energy in batteries"
- Try to implement EU server - untested -

### 1.1.22 (2024-03-09)

- Try to fix reset values at midnight

### 1.1.21 (2024-03-08)

- Fix calculation timeframe

### 1.1.17 (2024-03-08)

- Improve calculations
- No autocomplete on settings

### 1.1.15 (2024-03-06)

- Calculations improved
- Stop energy input on low voltage is now an option in settings

### 1.1.14 (2024-03-04)

- Reorganize Code
- Calculations are now optional and have to be enabled in settings
- Calculation of SOC from voltage and energy go in and out of batteries
- Stop energy feed if voltage drops under limit

### 1.1.11 (2024-03-01)

- Fix Solar Input 1 and 2 from the new Zendure firmware
- Fix remaining charging time
- Fix calculations overwritten when data with 0 value comes in.

### 1.1.8 (2024-02-29)

- Fix calculation error

### 1.1.7 (2024-02-29)

- Add energy calculations for 'today'
- Fix minutes display bug for remaining charge and discharge time

### 1.1.4 (2024-02-28)

- Fix timeout issues

### 1.1.0 (2024-02-27)

- Switched solar input 1 und 2 to adjust the behavior like the offical app
- Added Calculations folder, remaining charge and discharge time is now available as formatted time
- Added a note in the settings that this adapter only works with the global server

### 1.0.7 (2024-01-16)

- Add control for charge and discharge limit
- Update Readme Screenshot

### 1.0.6 (2024-01-16)

- Update Readme

### 1.0.5 (2024-01-15)

- Added state for both Solarflow PV inputs

### 1.0.4 (2023-12-16)

- Added Timeout for axios

### 1.0.3 (2023-12-12)

- Password is now encrypted. NOTE: You have to re-enter the password after adapter update!

### 1.0.2 (2023-12-12)

- Adapter improvements suggested by iobroker team
- Fixed battery pack temperature (data is in kelvin, so now converting to celcius)

### 1.0.1 (2023-11-03)

- Fix translationscd so
- Use 'extendObject' instead of 'setObjectNotExistsAsync'
- First official release version

### 0.1.0-alpha.2 (2023-10-27)

- Don't stop the adapter when no login information is provided!

### 0.1.0-alpha.1 (2023-10-27)

- Fix Typescript typos

### 0.1.0-alpha.0 (2023-10-26)

- Get battery information
- Reset states if no new data comes in (e.g. when Hub goes offline). Currently the last value still persist when Hub goes offline, so you may have 'pseudo' data in your states.

### 0.0.2 (2023-10-25)

- Initital Release, retrieving Hub data, telemetry and setting the output limit works!

### 0.0.1 (2023-10-24)

- First test

## License

MIT License

Copyright (c) 2024 Peter Frommert

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