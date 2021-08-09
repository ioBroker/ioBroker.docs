---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.nanoleaf-lightpanels/README.md
title: ioBroker.nanoleaf-lightpanels 适配器
hash: EYavG70Hk24uclNC64ybkY58+MhOFmOsttwlvkDW74Q=
---
![商标](../../../en/adapterref/iobroker.nanoleaf-lightpanels/admin/nanoleaf-lightpanels.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.nanoleaf-lightpanels.svg)
![下载](https://img.shields.io/npm/dm/iobroker.nanoleaf-lightpanels.svg)
![新产品管理](https://nodei.co/npm/iobroker.nanoleaf-lightpanels.png?downloads=true)

# IoBroker.nanoleaf-lightpanels 适配器
=================

[![测试和发布](https://github.com/daniel-2k/ioBroker.nanoleaf-lightpanels/actions/workflows/test-and-release.yml/badge.svg?branch=master)](https://github.com/daniel-2k/ioBroker.nanoleaf-lightpanels/actions/workflows/test-and-release.yml)

这是一个 ioBroker 适配器，用于通过 nanoleaf OpenAPI 控制 nanoleaf Light Panels（以前称为 nanoleaf Aurora）或 nanoleaf Canvas 和 Shapes。

## 连接到 nanoleaf 灯板/画布控制器：
1. 在适配器设置中，您必须设置 nanoleaf 控制器的 IP 地址或主机名和端口。您可以使用搜索功能来发现网络中的所有 nanoleaf 设备。
2. nanoleaf OpenAPI 需要一个授权令牌来授予对 OpenAPI 的访问权限。如果您已经有一个，您可以在此处输入令牌并跳过下一步。
3. 如果没有授权令牌，则需要从 nanoleaf OpenAPI 请求。

为此，请按住设备上的电源按钮 5-7 秒，直到 LED 交替闪烁，从而将 nanoleaf 控制器设置为配对模式。
然后在 30 秒内单击“获取授权令牌”按钮（配对模式在 30 秒后停止）。适配器必须正在运行！如果成功，则应在“身份验证令牌”字段中看到授权令牌。如果发生错误，您会弹出错误消息（您可以在日志中看到详细信息）。

4. 保存设置。
5.玩得开心！

### 通过服务器发送事件 (SSE) 直接更新状态
由于 Light Panels 固件版本 > 3.1.0 和 Canvas 固件版本 > 1.1.0 Server Sent Events (SSE) 可用于直接状态更新。对于 Canvas 和 Shapes 设备，支持触摸事件。

_请注意：_为了检测 nanoleaf 设备是否还活着，每 60 秒从 nanoleaf 设备发送一次 SSDP 通知消息。请确保您可以在端口 1900 上接收 UDP 多播消息（检查防火墙和路由）。否则，您将在适配器中收到连接丢失的错误消息。如果您在保持活动时遇到问题，请在管理设置中为 nanoleaf 适配器设置正确的适配器接口。
对于搜索设备，请确保您可以在 UDP 端口 5000 上接收流量。
我注意到一些 nanoleaf 设备突然停止发送 SSDP 通知消息，因此不再检测到连接。这是 nanoleaf 设备本身的问题。人们如何有这个问题可以启用保活轮询机制的使用，而不是附加适配器设置中的 SSDP 通知消息。

状态更新轮询间隔的设置仅影响固件版本较低的设备，其中轮询用于状态更新，或者如果在附加适配器设置中禁用了 SSE 功能。

## 亚历克萨
您可以通过 ioBroker（云适配器）使用 Alexa 控制 nanoleaf Light Panels/Canvas。
支持开/关、亮度、颜色和色温。
您必须设置数据点

* 状态（用于电源开/关）
* 色调（用于颜色）
* 饱和度（颜色）
* 亮度（颜色）
* colorTemp（色温）

在相同智能名称下的云适配器中。

## IoBroker 可视化
nanoleaf 灯面板/画布可以在 ioBroker Visualization 中通过使用基本小部件作为“单选按钮开/关”或滑块来控制电源状态、亮度、色调、饱和度和色温状态。

对于效果，您可以使用“Select ValueList”小部件将其用作下拉列表，然后将 effectsList 状态映射到小部件的 value 和 text 属性（类型：“{nanoleaf-lightpanels.0.LightPanels.effectsList}” -> 花括号很重要！）

要控制和可视化颜色，您必须安装颜色选择器样式小部件。您可以将 RGB ID 映射到 colorRGB 状态或也使用三个 HSV 状态。

您可以使用在 github 上的 /vis 子文件夹中找到的 nanoleaf vis 演示项目。

## Changelog

### 1.2.1 (2021-06-20)
* (daniel_2k) fixed: get a new authorization token is not possible when the current token is already invalid
* (daniel_2k) fixed: device search in admin settings fixed
* (daniel_2k) changed: obtaining an authorization token is also possible when field is already filled

### 1.2.0 (2021-01-03)
* (daniel_2k) new: possibility to use polling for keep alive detection instead of SSDP notify messages (for nanoleaf devices which stop sending SSDP notify packages)
* (daniel_2k) changed: small internal adjustments

### 1.1.1 (2020-12-27)
* (daniel_2k) fixed: error in device detection

### 1.1.0 (2020-12-27)
* (daniel_2k) new: support nanoleaf Shapes

### 1.0.6 (2020-09-14)
* (daniel_2k) changed: force status update for Canvas touch events
* (daniel_2k) new: added debug logging of received data via SSE

### 1.0.5 (2020-09-13)
* (daniel_2k) fixed: touch channel was not created for nanoleaf devices (bug since 1.0.3)

### 1.0.4 (2020-09-06)
* (daniel_2k) new: adapter address can be choosen in adapter settings for interfacing binding issues
* (daniel_2k) changed: use fixed port 5000 for MSEARCH replies for easy setup in firewall

### 1.0.3 (2020-08-30)
* (daniel_2k) fixed: search nanoleaf devices does not work on clean install of adapter
* (daniel_2k) new: added update of effectsList via SSE
* (daniel_2k) new: ability to disable of using SSE (for nanoleaf devices that stops sending ssdp:alive messages)
* (daniel_2k) changed: display nanoleaf device name in admin search result list
* (daniel_2k) changed: using forked "node-upnp-ssdp" for fixing interface binding

### 1.0.2 (2020-07-06)
* (daniel_2k) fixed: detection of ssdp:alive notify message for Canvas (fix disconnect/connect issue)
* (daniel_2k) fixed: sending correct service type for discovery of Canvas devices (fixes no devices found for Canvas devices)
* (daniel_2k) changed: if unknown nanoleaf device is detected Canvas will be used as fallback and warning will be logged
* (daniel_2k) fixed: setting rhythmMode was not working

### 1.0.1 (2020-07-05)
* (daniel_2k) fixed: detection of firmware version for Canvas for enabling SSE (Canvas firmware > 1.1.0 required)

### 1.0.0 (2020-06-18)
* (daniel_2k) new: using server sent events (SSE) for getting updates instead of polling (firmware > 3.1.0 required)
* (daniel_2k) new: support touch events for Canvas
* (daniel_2k) new: searching devices in Admin is now possible
* (daniel_2k) changed: moved duration for brightness state to separate state (please note: duration of in native part of brightness state will no longer work)
* (daniel_2k) changed: some minor internal adjustments
* (daniel_2k) changed: removed Admin2 configuration page

### 0.8.2 (2019-08-02)
* (daniel_2k) fixed: effects with special characters (german umlauts) can now be set (fixes HTTP error code 422)
* (daniel_2k) changed: removed fixed effects *Solid* and *Dynamic* for all devices (works also no longer with Light Panels since firmware update)

### 0.8.1 (2019-01-31)
* (daniel_2k) new: rhythm module mode (microphone/AUX input) can be changed
* (daniel_2k) changed: removed fixed effects *Solid* and *Dynamic* for Canvas because not supported
* (daniel_2k) fixed: Rhythm module information depending of connect state

### 0.8.0 (2019-01-27)
* (daniel_2k) changed: adapter has own nanoleaf-api lib (no dependency), because the nanoleaf-aurora-client module does not implement the nanoleaf API correctly (will be changed until this is fixed in the module)
* (daniel_2k) fixed: should now work properly with Canvas
* (daniel_2k) new: duration for brightness changes added (can be set in native part of brightness state)
* (daniel_2k) new: added compact mode
* (daniel_2k) changed: handling of device states
* (daniel_2k) fixed: command queue will not process when states are written which cannot be processed
* (daniel_2k) changed: some small code adjustments

### 0.7.0 (2019-01-20)
* (daniel_2k) new: compatible with nanoleaf Canvas
* (daniel_2k) changed: Rhythm module information is now obtained depended if it is connected or not (only Light Panels)
* (daniel_2k) changed: some small adjustments

### 0.6.1 (2018-10-13)
* (daniel_2k) fixed: command processing stopping when invalid RGB value is written to 'colorRGB'
* (daniel_2k) changed: more error logging of invalid values send to controller
* (daniel_2k) changed: adjusted types and roles

### 0.6.0 (2018-09-02)
* (daniel_2k) changed: processing commands in sequence (FIFO) ensuring that all commands are executed and avoiding hanging of the nanoleaf-controller sometimes

### 0.5.0 (2018-08-10)
* (daniel_2k) changed: automatically reconnect attemps will be done in any case of connection failures (fixes no reconnect when device hung and was restarted)
* (daniel_2k) new: default minimum values for polling intervals in adapter
* (daniel_2k) new: static effects 'Solid' and 'Dynamic' added to effect states
* (daniel_2k) changed: save settings in admin is only possible when all fields filled
* (daniel_2k) changed: optimized debug logging

### 0.4.1 (2018-07-13)
* (daniel_2k) added automatic testing via Travis and Appveyor
* (daniel_2k) preparations for official repository

### 0.4.0 (2018-06-11)
* (daniel_2k) changed: Authorization token will be obtained now in the adapter settings (not on adapter start)
* (daniel_2k) fixed: some texts in the old adapter settings (Admin2)
* (daniel_2k) new: State 'effect' now contains all possible states (auto updated)
* (daniel_2k) changed: updated AuroraAPI version to 1.2.2

### 0.3.0 (2018-05-12)
* (daniel_2k) new: state "ColorRGB" for controlling color with hex RGB values
* (daniel_2k) changed: updating states from API only when value changed
* (daniel_2k) changed: state effectsList will now be written as a semicolon seperated list to use it with "Select ValueList" widget in ioBroker visualization
* (daniel_2k) new: debug logging
* (daniel_2k) changed: set units for states "saturation" and "hue"

### 0.2.0 (2018-05-03)
* (daniel_2k) adjusted types and roles of states according API JSON response data types
* (daniel_2k) compatible with node.js 4.x

### 0.1.0 (2018-04-23)
* (daniel_2k) initial release

## License
The MIT License (MIT)
Copyright (c) 2020 daniel_2k <daniel_2k@outlook.com>