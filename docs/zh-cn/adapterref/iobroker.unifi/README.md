---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.unifi/README.md
title: ioBroker.unifi
hash: zSzVMfDGm9zu8qpM6269G1Ytu9zXQOIIt8F9wdWr3NA=
---
![安装数量](http://iobroker.live/badges/unifi-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.unifi.svg)
![下载](https://img.shields.io/npm/dm/iobroker.unifi.svg)
![新产品管理](https://nodei.co/npm/iobroker.unifi.png?downloads=true)

<img height="100px" src="admin/unifi.png" align="left"><br/>

# IoBroker.unifi
此 ioBroker 适配器允许对 [UniFi 设备](http://www.ubnt.com/) 进行监控和有限控制，例如使用公共 UniFi 控制器 Web-API 的 UniFi WiFi 接入点。

＃＃ 配置
### 最低要求信息
要启动并运行此适配器，需要以下信息：

* UniFi 控制器的 IP 地址和端口（如果您的控制器在 UbiOS（例如 UDM-Pro）上运行，请将端口留空）
* 本地用户名和密码（2FA **不支持**）
* 更新间隔

默认情况下，信息每 60 秒更新一次。根据您的 ioBroker 硬件和网络规模（客户端数量、UniFi 设备等），建议保持此间隔并避免进一步减少它。

### 过滤对象
适配器从 UniFi 控制器更新尽可能多的信息，但提供了限制更新信息的可能性。

可以禁用所选信息的更新或过滤该信息的特定对象。

|信息 |可过滤的对象 |
|-------------|-----------------------------------------|
|客户 |名称、主机名、IP 地址、MAC 地址 |
|设备 |姓名、IP 地址、MAC 地址 |
| WiFi |姓名 |
|网络 |姓名 |
|健康 |子系统 |

＃＃ 控制
### 启用/禁用 WiFi
通过更改 WiFi 的“启用”状态，可以启用/禁用它。几秒钟后，更改将提供给接入点。

### 凭证创建
使用 `vouchers.create_vouchers` 按钮可以创建预定义的优惠券。可以配置将创建的凭证数量、凭证的有效期以及设置上传和下载限制。

## 缺少数据点
适配器使用 [节点统一](https://github.com/jens-maus/node-unifi) 连接到您的 UniFi 控制器。为简化起见，并非所有可用数据点都被拉入您的 ioBroker。如果您缺少数据点，请使用以下 URL 检查 API。 （注意：您必须用您的设置替换 IP、PORT 和 SITE）

|信息 | API 网址 |
|-------------|---------------------------------------------|
|网站 | https://IP:PORT/api/self/sites |
|系统信息 | https://IP:PORT/api/s/SITE/stat/sysinfo |
|客户 | https://IP:PORT/api/s/SITE/stat/sta |
|设备 | https://IP:PORT/api/s/SITE/stat/device |
| WiFi | https://IP:PORT/api/s/SITE/rest/wlanconf |
|网络 | https://IP:PORT/api/s/SITE/rest/networkconf |
|健康 | https://IP:PORT/api/s/SITE/stat/health |
|优惠券 | https://IP:PORT/api/s/SITE/stat/voucher |
|新闻部 | https://IP:PORT/api/s/SITE/stat/dpi |
|警报 | https://IP:PORT/api/s/SITE/stat/alarm |

### UbiOS/UDM-Pro 端点
|信息 | API 网址 |
|-------------|------------------------------------------------------|
|网站 | https://IP/proxy/network/api/self/sites |
|系统信息 | https://IP/proxy/network/api/s/SITE/stat/sysinfo |
|客户 | https://IP/proxy/network/api/s/SITE/stat/sta |
|设备 | https://IP/proxy/network/api/s/SITE/stat/device |
| WiFi | https://IP/proxy/network/api/s/SITE/rest/wlanconf |
|网络 | https://IP/proxy/network/api/s/SITE/rest/networkconf |
|健康 | https://IP/proxy/network/api/s/SITE/stat/health |
|优惠券 | https://IP/proxy/network/api/s/SITE/stat/voucher |
|新闻部 | https://IP/proxy/network/api/s/SITE/stat/dpi |
|警报 | https://IP/proxy/network/api/s/SITE/stat/alarm |

＃＃ 已知的问题
* 客户端离线后，客户端的is_wired 状态不正确。这是 UniFi 控制器的已知问题，与适配器无关。 （参见 https://community.ui.com/questions/Wireless-clients-shown-as-wired-clients/49d49818-4dab-473a-ba7f-d51bc4c067d1）

＃＃ 参考
此适配器使用以下第三方 nodejs 模块的功能：

* [节点统一](https://github.com/jens-maus/node-unifi)
* [json-logic-js](https://github.com/jwadhams/json-logic-js)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.5.10 (2021-05-27)
* (jens-maus) Changed "Update done" output to be output as debug info.
* (jens-maus) Updated dependencies.

### 0.5.9 (2021-05-07)
* (jens-maus) Fixed all js-controller 3.3 related state warnings
* (kirovilya, jens-maus) Added device state object with dedicated states list.
* (jens-maus) Updated node-unifi to latest version
* (jens-maus) Updated dependencies

### 0.5.8 (2020-08-29)
* (braindead1) Fixed problems related to unused sites
* (braindead1) Fixed some errors reported via Sentry

### 0.5.7 (2020-07-27)
* (braindead1) Fixed Sentry errors caused by not updated configuration after update

### 0.5.6 (2020-07-25)
* (Scrounger, braindead1) Implemented Alarms, DPI & Gateway Traffic
* (braindead1) Prevented creation of ghost clients caused by iOS MAC randomization
* (dklinger) Implemented manual update trigger
* (braindead1) Implemented deletion of used vouchers
* (braindead1) Fixed some errors reported via Sentry

### 0.5.5 (2020-06-13)
* (braindead1) Fixed some errors reported via Sentry

### 0.5.4 (2020-06-06)
* (braindead1) Implemented offset for is_online
* (braindead1) Fixed some issues related to is_online
* (braindead1) Prepared whitelisting of clients etc.

### 0.5.2 (2020-05-23)
* (jens-maus) Implemented UniFiOS/UDM-Pro support
* (braindead1) Implemented possibility to enable/disable WLANs
* (braindead1) Implemented voucher creation
* (braindead1) Implemented online state for clients
* (braindead1) Updated client states
* (braindead1) Updated device states
* (braindead1) Improved error messages

### 0.5.0 (2020-05-09)
* (braindead1) Implemented configuration of updates
* (braindead1) Improved JsonLogic
* (braindead1) Removed legacy code
* (braindead1) Implemented Sentry

### 0.4.3 (2020-04-24)
* (braindead1) fixed configuration issue

### 0.4.2 (2020-04-23)
* (braindead1) subsystem issue fixed

### 0.4.1 (2020-04-16)
* (braindead1) Enhanced refactoring

### 0.4.0 (2020-04-16)
* (bluefox) Refactoring
  
### 0.3.1
* (jens-maus) added support for multi-site environments.

### 0.3.0
* (jens-maus) added access device data query and moved the client devices to the 'clients' subtree instead

### 0.2.1
* (jens-maus) minor fixes

### 0.2.0
* (jens-maus) moved `lib/unifi.js` to dedicated node-unifi nodejs class and added it as a dependency.

### 0.1.0
* (jens-maus) implemented a first basically working version which can retrieve status information from a UniFi controller.

### 0.0.1
* (jens-maus) initial checkin of non-working development version

## License
The MIT License (MIT)

Copyright (c) 2020 braindead1 &lt;os.braindead1@gmail.com&gt;
Copyright (c) 2016-2020 Jens Maus &lt;mail@jens-maus.de&gt;

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