---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.wm-bus/README.md
title: 无题
hash: RaW0P41itY9FCvEAt0J+/Q7CNelFExLWSZudYd8TTlU=
---
![标识](../../../en/adapterref/iobroker.wm-bus/admin/wm-bus.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.wm-bus.svg)
![测试](http://img.shields.io/travis/soef/ioBroker.wm-bus/master.svg)
![执照](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![构建状态](https://ci.appveyor.com/api/projects/status/xg29a1r5dl00dq23?svg=true)

### IoBroker.wm-bus
***此适配器至少需要 Node 4.4 ***

＃＃＃＃ 描述
无线 M-Bus 适配器

####信息
支持的 USB 适配器：

+ [iM871A](http://www.wireless-solutions.de/products/gateways/wirelessadapter) + [文化部](http://shop.busware.de/product_info.php/products_id/29?osCsid=eab2ce6ef5efc95dbdf61396ca256b6e) + [琥珀色 8465-M](https://www.amber-wireless.de/en/amb8465-m.html)

＃＃＃＃ 配置
如果使用，用于解密消息的 AES 密钥。
制造商 ID、类型和版本将在第一次收到消息后确定

＃＃＃＃ 安装
在 iobroker 根目录中执行以下命令（例如在 /opt/iobroker 中）

```
npm install iobroker.wm-bus
```

＃＃＃＃ 要求
+ 一个 [iM871A](http://www.wireless-solutions.de/products/gateways/wirelessadapter) USB 记忆棒 + 或一个 [文化部](http://shop.busware.de/product_info.php/products_id/29?osCsid=eab2ce6ef5efc95dbdf61396ca256b6e) USB 记忆棒 + 一个 WM-Bus 设备，例如[简易仪表](http://www.easymeter.com/)

## Changelog
### 0.3.0 (2018-01-23)
* (Apollon77) Upgrade Serialport Library