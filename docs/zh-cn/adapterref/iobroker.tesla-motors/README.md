---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tesla-motors/README.md
title: ioBroker.tesla-motors
hash: z6cbEnYX6PzPGXJ6Wx0ZbRKE/ig2WXsFm7jBW7UOkkA=
---
![标识](../../../en/adapterref/iobroker.tesla-motors/admin/tesla-motors.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.tesla-motors.svg)
![下载](https://img.shields.io/npm/dm/iobroker.tesla-motors.svg)
![稳定的](http://iobroker.live/badges/tesla-motors-stable.svg)
![已安装](http://iobroker.live/badges/tesla-motors-installed.svg)
![依赖状态](https://img.shields.io/david/dbweb-ch/iobroker.tesla-motors.svg)
![已知漏洞](https://snyk.io/test/github/dbweb-ch/ioBroker.tesla-motors/badge.svg)
![构建状态](http://img.shields.io/travis/dbweb-ch/ioBroker.tesla-motors.svg)
![新产品管理](https://nodei.co/npm/iobroker.tesla-motors.png?downloads=true)

# IoBroker.tesla-motors
## IoBroker 的特斯拉电机适配器
此适配器可将您的 Tesla 汽车控制权添加到 ioBroker。

＃＃ 配置
1. 创建一个新的适配器实例，每辆车都需要自己的实例。
2. 选择你喜欢的刷新率（见[Refresh Rate](#refreshRate)）
2. 输入您的 Tesla 用户名和 Tesla 密码。
3. 点击“获取令牌”向特斯拉请求令牌和刷新令牌。
4. 在下拉菜单中选择您的汽车。

###<a name="refreshRate"></a>刷新率
为了节省电池，汽车在一段时间没有活动后会进入睡眠模式。<br />只有在汽车处于唤醒状态时才能从汽车中获取信息。<br />用户报告了所谓的“吸血鬼排水”，如果汽车不进入睡眠状态，它每天最多可以消耗 10 公里的续航里程。<br />为了防止这种情况，您可以选择所需的刷新率：

* **关闭** - 适配器不会自行唤醒汽车。它仅根据要求唤醒汽车（如果您设置了状态）。

<br />如果汽车自行唤醒，适配器将请求汽车数据一次。

* **Temperate** - 适配器每小时将唤醒汽车一次以获取其状态。
* **主动** - 适配器每分钟唤醒一次汽车。
* **Smart** - 适配器尝试变得智能。它将观察汽车状态以确定它是应该醒着还是应该尽快进入睡眠状态。

在任何情况下，它都会让汽车在观察到注意的 10 分钟后进入睡眠状态（没有动作、没有气候、没有驾驶、没有充电）。
然后它不再唤醒汽车，如果您需要它，您可以自己触发它。

## 使用适配器
适配器创建多个状态。它们按主题分组：

* **chargeState** - 关于充电、电池和范围。
* **climateState** - 温度和窗口状态。
* **driveState** - 位置和速度
* **softwareUpdate** - 有关待定软件更新的信息
* **车辆** - 有关您车辆的信息

有一个名为 **command** 的特殊组，您可以在其中找到控制汽车的所有命令。
其中一些是双向的，例如，当汽车关闭气候时，气候状态会发生变化。您可以在“发送/接收”列中看到这一点。

姓名 |说明 | **S**end / **R**ecieve -------------- | -------------- | -------------- ChargePort |打开/关闭充电端口 | SR 解锁充电端口 |解锁充电端口 |充电 |开始/停止充电 | SR 气候 |启动/停止气候 | SR 远程启动 |激活/停用远程启动 | SR 哨兵模式 |激活/停用哨兵模式 | SR SetChargeLimit |以 % 为单位设置充电限制 | SR 设定温度 |设置目标温度。不要忘记打开气候！ | SR 限速 |激活速度限制 | SR SpeedLimitValue |限速值| SR StartSoftwareUpdate |开始软件更新 | SR 天窗通风口 |太阳屋顶通风口 | SR ValetMode |代客模式 | SR ValetPin |代客别针 | SR 备用 |如果汽车处于待机状态（将此设置为手动唤醒） | SR 门锁 |锁/开门| SR 手电筒 |闪灯| S honkHorn |鸣喇叭 | S openFrunk |打开 Frunk（没有收到）| S openTrunk |打开后备箱（没有收到）| S座椅_heater_left |座椅加热器左侧水平 (0-3) | SR座椅_加热器_后_中心|后排中央座椅加热器 (0-3) | SR Seater_heater_rear_left |左后座椅加热器 (0-3) | SR 座椅加热器_rear_right |右后座椅加热器 (0-3) | SR座椅_加热器_右|座椅加热器右侧水平 (0-3) | SR 方向盘_加热器 |方向盘加热器| SR 窗通风口 |窗户通风口| SR

##安全&amp;证书
Tesla API 使用基于令牌的安全方法。<br />令牌将过期（目前为 45 天后），但系统可以使用刷新令牌检索新令牌。<br />您的凭据不必存储以使适配器工作，但如果您在刷新令牌时遇到问题，这可能会使其更加稳定，因为适配器可以随时获取完整的新令牌。<br /><aside class="warning">警告：<br />使用您的 Tesla 凭证，您可以控制车辆行驶，包括打开 Windows 甚至驾驶。保存您的凭据！<br />要拒绝所有令牌，请更改您的 Tesla 帐户密码！</aside>

## 贡献者
* dbweb-ch
* 阿波罗77
* 洪巴赫
* klein0r

## Changelog
Note that missing version entries are typically dependency updates for security.
### 0.5.5
* (dbweb-ch) Fix issue with manual token input
* (dbweb-ch) Fix issue with token refresh and double encryption
### 0.5.4
* (Hombach) Fixed vulnerability; removed tests for node 10
* (dbweb-ch) Enable to manual entry tokens
### 0.5.3
* (dbweb-ch) Improved smart wakeup plan
* (dbweb-ch) wakeup more reliable on action request
* (dbweb-ch) Don't wake up the car every 12 hours anymore. If this is needed, trigger it by iobroker.
### 0.5.1
* (Hombach) Added tests for node 16; updated dependencies
### 0.5.0
* (klein0r) Store passwords and other sensitive information encrypted (BREAKING CHANGE)
### 0.4.3
* (dbweb-ch) Refresh mode aggressive: change refresh rate to 1 second instead of 1 minute
* (dbweb-ch) Add homelink support
### 0.4.2
* (dbweb-ch) Define instanceObject \"info.connection\" to prevent warning with js-controller 3.2.
### 0.4.1
* (dbweb-ch) Add \"Stopped\" as charge state where car can go asleep
### 0.4.0
* (dbweb-ch) Implement 2FA Authentification, use new authentification flow
### 0.3.2
* (dbweb-ch) Bugfix logging leading to a crash when authentication failed
### 0.3.1
* (dbweb-ch) Check token refresh more often
### 0.3.0
* (Hombach) Removed tests for node 8; updated dependencies
### 0.2.3
* (dbweb-ch) Refresh info every 5 seconds when car is moving
### 0.2.2
* (dbweb-ch) Use decrypt from ioBrokerTools, fix issue with selecting car
### 0.2.1
* (dbweb-ch) Fix bug with odomoter, refactor object creation, fix issues with compact mode
### 0.2.0
* (dbweb-ch) Included testing
* (dbweb-ch) Encrypt passwords
### 0.1.2
* (dbweb-ch) Added Roles, refactor states. 
* Attention: "awake" replaced by "standby" and inverted!
* Attention: Door lock is inverted.
### 0.1.1
* (dbweb-ch) Fix for Wakeup plan "smart"
### 0.1.0
* (dbweb-ch) Small fixes for Beta-Version release
### 0.0.3
* (dbweb-ch) control all state, added wakeup strategy
### 0.0.2
* (dbweb-ch) added all states
### 0.0.1
* (dbweb-ch) initial release

## License
MIT License

Copyright (c) 2021 Dominic Blattmann <nick@dbweb.ch>

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