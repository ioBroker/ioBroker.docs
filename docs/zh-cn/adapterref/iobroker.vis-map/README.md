---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vis-map/README.md
title: ioBroker.vis-地图
hash: wrWX5vCEa+TyCgDVUkiRLNIyI2SdtOdQd4cOyJHlgv4=
---
![标识](../../../en/adapterref/iobroker.vis-map/admin/vis-map.png)

![安装数量](http://iobroker.live/badges/vis-map-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.vis-map.svg)
![下载](https://img.shields.io/npm/dm/iobroker.vis-map.svg)
![新平台](https://nodei.co/npm/iobroker.vis-map.png?downloads=true)

# IoBroker.vis-map
![截屏](../../../en/adapterref/iobroker.vis-map/img/widgets.png)

小部件，可以在地图上显示坐标。
实际上仅支持 Open Street Maps 和 Google。要使用 Google Maps，您应该获取 Google Maps 的 API 密钥。
您可以获取它 [这里](https://developers.google.com/maps/documentation/javascript/get-api-key)

＃＃ 用法
您可以将经度和纬度分开绑定，或者直接将对象 ID 放入**经度**中，其值如下：

- 7.0001；49.0000（经度；纬度）
- 7,0001；49,0000（经度；纬度）
- 7.0001,49.0000（经度，纬度）
- 49.0000,7.0001（纬度，经度+交换标志）
- 49.0000；7.0001（纬度；经度+交换标志）

<!-- 下一版本的占位符（在行首）：

### **正在进行中** -->

## Changelog
### 1.1.2 (2024-07-12)
- fix datapoint handling for lat/lan
- Make data points in 0_userdata work again

### 1.1.0 (2024-03-07)
- (bluefox) Removed dependency to `iobroker.vis`. Only show the message if vis is not installed

### 1.0.5 (2024-01-14)
- (bluefox) Added vis-2 to the restart by installation

### 1.0.4 (2020-03-18)
- (bluefox) Small errors were fixed

### 1.0.3 (2020-01-25)
- (TA2k) Fix OSM issue with Safari

### 1.0.2 (2018-07-06)
- (bluefox) Event click on pins added

### 1.0.1 (2018-01-08)
- (bluefox) Fix error if coordinates are empty

### 1.0.0 (2017-09-26)
- (bluefox) allow to swap longitude and latitude

### 0.1.4 (2017-04-28)
- (bluefox) add traffic layer for google maps

### 0.1.3 (2016-09-04)
- (bluefox) fix google map max zoom

### 0.1.1 (2016-07-17)
- (bluefox) remove unused files

### 0.1.0 (2016-07-08)
- (bluefox) initial checkin

## License
 Copyright (c) 2016-2024 bluefox <dogafox@gmail.com>
 MIT