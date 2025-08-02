---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-map/README.md
title: ioBroker.vis-карта
hash: wrWX5vCEa+TyCgDVUkiRLNIyI2SdtOdQd4cOyJHlgv4=
---
![Логотип](../../../en/adapterref/iobroker.vis-map/admin/vis-map.png)

![Количество установок](http://iobroker.live/badges/vis-map-stable.svg)
![версия НПМ](http://img.shields.io/npm/v/iobroker.vis-map.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vis-map.svg)
![НПМ](https://nodei.co/npm/iobroker.vis-map.png?downloads=true)

# IoBroker.vis-карта
![Скриншот](../../../en/adapterref/iobroker.vis-map/img/widgets.png)

Виджеты, которые могут показывать координаты на карте.
Фактически поддерживаются только Open Street Maps и Google. Чтобы использовать Google Maps, вам необходимо получить API Key для Google Maps.
Вы можете получить его [здесь](https://developers.google.com/maps/documentation/javascript/get-api-key)

## Использование
Вы можете связать долготу и широту отдельно или просто поместить в **долготу** идентификатор объекта со значением, как показано ниже:

- 7.0001;49.0000 (долгота ; широта)
- 7,0001;49,0000 (долгота ; широта)
- 7.0001,49.0000 (долгота, широта)
- 49.0000,7.0001 (широта, долгота + флаг замены)
- 49.0000;7.0001 (широта ; долгота + флаг замены)

<!-- Заполнитель для следующей версии (в начале строки):

### **РАБОТА В ХОДЕ** -->

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