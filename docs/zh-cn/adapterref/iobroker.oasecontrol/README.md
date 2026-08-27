---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.oasecontrol/README.md
title: ioBroker.oasecontrol
hash: d0ERCppohm4g2Z0mkWNOXFm5kB6Ldlq89QGMf1Mm4JY=
---
# IoBroker.oasecontrol
**测试：** ![测试与发布](https://github.com/mr-suw/ioBroker.oasecontrol/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 oasecontrol 适配器
ioBroker.oasecontrol 可控制 OASE 的户外设备。

支持的设备包括 InScenio FM-Master EGC 系列。

当前正在测试的设备：

- FM-Master WLAN EGC Home，带 4 个电源插座

当前支持的功能：

可切换电源插座
可调光电源插座
- 新增对象元素，使插座开关只读

也可以与

- [InScenio FM-Master 云系列](https://www.oase.com/en/products-a-z/family/product/p/70788-inscenio-fm-master-cloud-int.html)

＃＃ 兼容性
兼容 OASE 固件版本：51.25

经测试，结果为 51.25

请确保将 io.broker MAC 地址添加到您的 WLAN 接入点的广播白名单中。

## 在 ioBroker 中进行设置
**OASE 设备 IP 地址：** OASE 设备的静态 IPv4 地址

**IP TCP 服务器：** ioBroker 实例的静态 IPv4 地址

**OASE 设备密码**：这是难点所在；在应用登录期间嗅探该密码；它是一个 74 个字符的加密字符串，源自 http://app-oasecloud-prod.azurewebsites.net/User/Inventory。字符 \\\u 应替换为 \u。

**轮询频率 [秒]：** OASE 设备应以秒为单位轮询以获取新数据的频率

## 设置检查
当日志序列如下所示时，表示您已成功设置此适配器：

```
authenticated to device
Starting TCP server with TLS...
Detected device:FM-Master EGC Home
```

oasecontrol 对象如下所示：

```
info.connection = true
...
serial-number = < device serial number >
```

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.1.4 (2026-05-31)
* Fix errors reported by checker

### 0.1.3 (2026-05-16)
* Fix deploy issue

### 0.1.0 (2026-05-16)
* Adapter requires node.js >= 22 now

### 0.0.8
* NPM release

## License
MIT license

Copyright (c) 2026 mrsuw mrsuw@icloud.com