---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.wireless-settings/README.md
title: ioBroker.wireless-settings
hash: zSAWcaG2UiXMtmzLDrhD8+mBgQxOlaYOW/2HfpXdz2E=
---
![标识](../../../en/adapterref/iobroker.wireless-settings/admin/wireless-settings.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.telemetry.svg)
![下载](https://img.shields.io/npm/dm/iobroker.telemetry.svg)
![安装数量（最新）](http://iobroker.live/badges/wireless-settings-installed.svg)
![安装数量（稳定版）](http://iobroker.live/badges/wireless-settings-stable.svg)
![依赖状态](https://img.shields.io/david/ioBroker/iobroker.wireless-settings.svg)
![已知漏洞](https://snyk.io/test/github/ioBroker/ioBroker.wireless-settings/badge.svg)
![NPM](https://nodei.co/npm/iobroker.telemetry.png?downloads=true)

# IoBroker.wireless-settings
## 树莓派/Linux 上的 Wi-Fi 和以太网设置适配器
此分支可以配置由 NetworkManager 管理的网络接口。

### 支持的功能
- 连接和断开 Wi-Fi 网络
- 显示当前接口信息（IPv4/IPv6、网关、DNS）
- 更改以太网 IPv4 设置
- 更改活动 Wi-Fi 配置文件的 IPv4 设置
- 在 DHCP 和静态 IPv4 配置之间切换
- 配置子网掩码/前缀、网关和 DNS 服务器

**测试逻辑基于`nmcli` / NetworkManager。**

## 所需权限
此适配器假定 `iobroker` 用户可以执行以下命令：

- `/usr/bin/nmcli`

您可以通过拨打以下电话添加权限：

```shell
sudo chmod +x /opt/iobroker/node_modules/iobroker.wireless-settings/wlan_rights.sh
sudo /opt/iobroker/node_modules/iobroker.wireless-settings/wlan_rights.sh
```

## 注释
- 应用新的网络设置可能会短暂中断当前的管理员连接。
- 当设备 IP 地址更改时，请使用新地址重新打开 ioBroker Admin。
- 对于没有现有配置文件的以太网接口，适配器会自动创建专用的 NetworkManager 配置文件。

<!-- 下一版本的占位符（位于行首）：

### **正在进行中** -->

## Changelog
### 1.2.2 (2026-04-19)

- Detect docker

### 1.2.1 (2026-04-19)

- Added editable Ethernet and IPv4 settings in the Admin UI
- Added DHCP/static IPv4 switching with subnet, gateway and DNS handling
- Improved command execution by using argument-based process calls instead of raw shell strings
- Migrated GUI to vite

### 1.0.2 (2024-10-04)

- (@GermanBluefox) Updated for raspberry 5
- (@GermanBluefox) Change name to "wireless-settings"

### 0.4.0 (2024-10-03)

- (@GermanBluefox) Change name to "network-settings"

### 0.3.0 (2023-06-27)

- (@GermanBluefox) Change name to "network-settings"

### 0.2.2 (2023-06-27)

- (@GermanBluefox) Updated the GUI to the latest version

### 0.1.0 (2021-01-18)

- (ioBroker) fixed build scripts

### 0.0.1 (2021-01-18)

- (ioBroker) initial release

## License

MIT License

Copyright (c) 2021-2026 @GermanBluefox <dogafox@gmail.com>

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