---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.places/README.md
title: ioBroker.places
hash: hjIkwB4JXT8fYW0UgWnjmkRHGf8xKpfjWJTof7ce7Ro=
---
![标识](../../../en/adapterref/iobroker.places/admin/places.png)

![安装数量](http://iobroker.live/badges/places-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.places.svg)
![下载](https://img.shields.io/npm/dm/iobroker.places.svg)

# IoBroker.places
![测试与发布](https://github.com/iobroker-community-adapters/ioBroker.places/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/places/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry 插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!从 js-controller 3.0 开始使用 Sentry 报告。

＃＃ 描述
这是一个 ioBroker 适配器，用于处理位置信息消息，其中至少应包含用户、地理位置和时间戳。
适配器分析位置信息是否在ioBroker位置配置周围的半径内或可选的其他地方。

＃＃ 配置
只有一个强制配置值：半径（米），用于识别用户的当前位置。
ioBroker 的位置用于识别用户是否“在家”，其他位置可以添加为配置的一部分。

* **Radius** (_mandatory_) 应该是以米为单位的半径，用于检查用户是否位于特定位置（家中或自定义位置）。
* **家庭名称** 可用于设置家庭位置的自定义名称。
* **Google 地图 API 密钥**将用于启用地理编码。打开配置页面时，将从配置的 vis-map 实例（如果可用）中获取丢失的 API 密钥。
* **可以激活 Google 地图地理编码**来获取所提供地理位置的真实地址和海拔高度。
* **地点** 是一个包含自定义地点的灵活列表，其中每个地点都应具有有效的名称、纬度和经度值。
* **Users** 是一个包含用户映射的灵活列表。

＃＃ 用法
要处理位置更新，只需使用以下语法发送消息：

```
// send a message to all instances of places adapter
sendTo('places', {
        user:       "Name of person",
        latitude:   50.9576191,
        longitude:  6.8272409,
        timestamp:  1520932471
});

// send a message to a specific instance of places adapter adapter
sendTo('places.0', {
        user:       "Name of person",
        latitude:   50.9576191,
        longitude:  6.8272409,
        timestamp:  1520932471
});

// send a message to a specific instance and define a callback
sendTo('places.0', {
        user:       "Name of person",
        latitude:   50.9576191,
        longitude:  6.8272409,
        timestamp:  1520932471
}, function (res) { log(JSON.stringify(res)); });
```

## 返回消息的结构
以下块显示了响应消息的外观。对于每个值，ioBroker 对象树都有一个相应的状态。

```
{
    "user":         "Name of person",       // name of person (may have been replaced by user mapping)
    "latitude":     50.9576191,
    "longitude":    6.8272409,
    "timestamp":    1520932471000,
    "date":         "2018-03-13 10:14:31",  // date extracted from timestamp
    "atHome":       false,                  // true if inside the configured radius around ioBroker
    "homeDistance": 104898,                 // distance in meters between position and ioBroker
    "name":         "",                     // name of place found within the configuration
    "address":      "",                     // readable address (if geocoding is active)
    "elevation":    "",                     // elevation in meters (if geocoding is active)
}
```

## 示例：OwnTracks + ioBroker.iot + ioBroker.places
### 1.配置iobroker.iot
在**服务白名单**下添加自定义服务**xyz**。

### 2. 配置 OwnTracks 移动应用程序
将模式更改为 **HTTP Private** 并使用以下地址作为 **Host** ： https://iobroker.pro/service/custom_xyz/<user-app-key>

### 3.配置iobroker.places
在“集成”选项卡上，您必须选择云适配器的实例和 **xyz** 作为服务。适配器将侦听传入的服务请求并开始处理。

## 示例：Telegram + ioBroker.telegram + ioBroker.places
### 1.配置iobroker.telegram
启用选项**存储原始请求**。

### 2. 创建脚本 (ioBroker.javascript)
创建一个包含原始请求订阅的简短脚本，例如来自 **telegram.0.communicate.requestRaw**，并将新的请求对象发送到 iobroker.places （或其实例）：

```
on({id: "telegram.0.communicate.requestRaw", change: "ne"}, function (obj) {
    var data = JSON.parse(obj.newState.val);
    if (data.from && data.location) {
        sendTo('places.0', {
            user: data.from.first_name,
            latitude: data.location.latitude,
            longitude: data.location.longitude,
            timestamp: data.date
        }, function (res) { log('places analyzed telegram position as: ' + JSON.stringify(res)); });
    }
});
```

## 学分
该实现部分基于 dschaedls [ioBroker.geofency](https://github.com/ioBroker/ioBroker.geofency) 适配器。该标志取自[免费图标 PNG](http://www.freeiconspng.com/images/maps-icon)，并已修改为具有透明背景。

## Changelog
### 1.1.2 (2022-04-17)
* (Apollon77) Fix personsAtHome and anybodyAtHome states

### 1.1.1 (2022-03-29)
* (Apollon77) Allow (again?) to consume external subscribed state value independently of ack flag

### 1.1.0 (2022-03-25)
* (Basgo) Correctly set ack flag
* (Apollon77) Add Sentry for crash reporting

### 1.0.0 (2020-08-16)
* (bluefox) Updated packages
* (bluefox) Refactoring

### 0.7.0 (2019-01-12)
* (BasGo) Added compact mode, replaced integration of iobroker.cloud with iobroker.iot

### 0.6.2 (2018-12-06)
* (bluefox) Error with blockly was fixed

### 0.6.1
* (BasGo) Added handling for invalid route details

### 0.6.0
* (BasGo) Changed implementation to use promises
* (BasGo) Added route details for driving home

### 0.5.1
* (BasGo) Extended help texts

### 0.5.0
* (BasGo) Added optional subscription for cloud adapter

### 0.4.2
* (BasGo) UI fixes

### 0.4.1
* (BasGo) Configuration dialog extended

### 0.4.0
* (BasGo) Google Maps can be used for configuration
* (BasGo) Geocoding can be activated

### 0.3.0
* (BasGo) Added user mappings

### 0.2.3
* (BasGo) Optimized state handling
* (BasGo) Added option to clear array

### 0.2.2
* (BasGo) Added check for newer entries

### 0.2.1
* (BasGo) Extended configuration

### 0.2.0
* (BasGo) Materialized admin page

### 0.1.1
* (BasGo) Fixed some smaller issues

### 0.1.0
* (BasGo) Initial release

## License

This adapter is licensed under the [MIT License](../blob/master/LICENSE) which is part of this repository.

Copyright (c) 2018-2022 BasGo <basgo@gmx.de>