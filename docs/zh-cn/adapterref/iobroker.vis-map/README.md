---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vis-map/README.md
title: ioBroker.vis-map
hash: eIIDzq4Ud+H8tQRsINqrWBl3j7ilWky8HEeKZoaP9HY=
---
![商标](../../../en/adapterref/iobroker.vis-map/admin/vis-map.png)

![安装数量](http://iobroker.live/badges/vis-map-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.vis-map.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.vis-map.svg)
![NPM](https://nodei.co/npm/iobroker.vis-map.png?downloads=true)

＃ioBroker.vis-map
![屏幕截图](../../../en/adapterref/iobroker.vis-map/img/widgets.png)

可以在地图上显示坐标的小部件。
实际上仅支持Open Stree Maps和Google。要使用Google Maps，您应该获取Google Maps的API密钥。
您可以[这里](https://console.developers.google.com/flows/enableapi?apiid=maps_backend,geocoding_backend,directions_backend,distance_matrix_backend,elevation_backend&keyType=CLIENT_SIDE&reusekey=true)

##用法
您可以将经度和纬度分开绑定，或者仅将Object ID放置在** longitude **中，其值如下所示：

-7.0001; 49.0000（经度；纬度）
-7,0001; 49,0000（经度；纬度）
-7.0001,49.0000（经度，纬度）
-49.0000,7.0001（纬度，经度+交换标志）
-49.0000; 7.0001（纬度；经度+交换标志）

## Changelog

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

 Copyright (c) 2016-2020 bluefox <dogafox@gmail.com>
 MIT