---
BADGE-Number of Installations: http://iobroker.live/badges/tankerkoenig-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.tankerkoenig.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.tankerkoenig.svg
BADGE-NPM: https://nodei.co/npm/iobroker.tankerkoenig.png?downloads=true
---
![Logo](../../admin/tankerkoenig.png)
# ioBroker.tankerkoenig

![Number of Installations](http://iobroker.live/badges/tankerkoenig-installed.svg)
![Number of Installations](http://iobroker.live/badges/tankerkoenig-stable.svg) 
[![NPM version](http://img.shields.io/npm/v/iobroker.tankerkoenig.svg)](https://www.npmjs.com/package/iobroker.tankerkoenig)
[![Downloads](https://img.shields.io/npm/dm/iobroker.tankerkoenig.svg)](https://www.npmjs.com/package/iobroker.tankerkoenig)

[![NPM](https://nodei.co/npm/iobroker.tankerkoenig.png?downloads=true)](https://nodei.co/npm/iobroker.tankerkoenig/)

**Tests:**
[![Test and Release](https://github.com/iobroker-community-adapters/ioBroker.tankerkoenig/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.tankerkoenig/actions/workflows/test-and-release.yml)


## Description
This adapter returns fuel prices for up to ten different station through a JSON feed of the web service [tankerkoenig.de](https://creativecommons.tankerkoenig.de/#about). All data is stored in objects to be used and displayed in [ioBroker.vis](https://github.com/ioBroker/ioBroker.vis).
The adapter uses the site prices.php which reduces the amount of data to be transfered when updating compared to list.php and detail.php (bulk). The adapter creates datapoints for the station that sells the cheapest E5, E10 and diesel.

## Configuration
### API key
The API key can be obtained at [website Tankerkönig](https://creativecommons.tankerkoenig.de/#about). It is a 36 digit code that has to be entered in this field.

### Stations
Up to 10 gas stations can be queried. To do this, you need to enter the gas station ID. You can get the ID for each gas station on tankerkoenig.de. It is also 36 digits long.
In addition, you can enter your own name for the station.
![alt text](../img/tankerkoenigSettingsScreenshot1.png "Screenshot Settings")
![alt text](../img/tankerkoenigSettingsScreenshot2.png "Screenshot Settings")

This window is used to add the new stations, you can read the stadium ID directly in the map below and copy it into the field above.
#### Copy station ID
There are 2 ways to copy the ID into the field:
- you mark the ID and copy it with Ctrl+C or right click copy and then paste into the field.
- you can also do it with the button `Copy`, this will copy the whole content, and you can then either paste it directly into the field. 
  Or you click on the button `Paste` then only the ID will be pasted into the field.

![alt text](../img/tankerkoenigStationFinder_copyId.png "Screenshot Settings")
Under the discount options you can choose between the discount variants ⇨ Euro / Percent and for which fuel type the discount applies (default are all selected).

![alt text](../img/tankerkoenigStationFinder.png "Screenshot Settings")
### Set values to 0
Activate this function if the prices are to be set to 0 when the gas station is closed.\
If the function is turned off, the prices will be set as invalid, see below.

### Invalid prices
If a gas station does not provide prices for E5, E10 or Diesel, e.g. if the station is closed, the price will not change, instead the state quality will be set to `Quality code 0x40 => Substitute value from device`, the state will then be displayed in orange.

![alt text](../img/state_quality.png "Screenshot Settings")

### Minimize log
To reduce log writing (e.g. on SD cards) this option can be selected.

## Activation
The adapter runs as a daemon (not in schedule mode) and starts regularly every five minutes. The data of the source feed are updated by the server at tankerkoenig.de only every 4 minutes, therefore a more frequent query of the data makes no sense and causes only superfluous data traffic and costs resources. Larger intervals can be set at any time.

##  Datapoints
The datapoints are created dynamically, that is, when you create a station, datapoints are created for it (maximum 10 stations).
When you delete a station, the datapoints that are no longer needed are also deleted.
![alt text](../img/tankerkoenigNewDP.png "Screenshot Settings")
Under the different fuel types the following datapoints are created:
* `feed` (price with three decimal places as number)
* `short` (price with two decimal places (unrounded) as string)
* `3rd` (third decimal place of the price to represent the superscript in VIS)
* `combined` (ready HTML formatted with price and superscript third decimal place or if necessary opening status ["closed"/"not found"] for easy display with VIS HTML widget)

In addition, five data points are created on in the respective station:
* `discount` (discount in Euro / percent as number)
* `discounted` (shows if a discount is active or not)
* `status` (station open?)
* `name` (name of the gas station given by the user)
* `station_id` (Tanker King ID of the gas station)

Additionally the cheapest gas stations from the list are determined in the channels
* `cheapest.E5`
* `chepest.E10`
* `cheapest.diesel`

On the station level five more data points are created:
* `adapterStatus` (shows the status of the adapter possible values: `idle / automatic request / manual request / requet timeout 1min / write states / request Error / offline`)
* `json` (JSON data of the gas station)
* `jsonTable` (json table for the vis `only the json data no widget`)

![alt text](../img/jsonTable.png "Screenshot Settings")
* `lastUpdate` (time of the last update)
* `refresh` (This is a button to refresh the data manually `WARNING` after triggering it once it is not possible to trigger the manual refresh for 1 minute)

Within these channels, the most favorable gas station for the named fuel type is created. If several gas stations offer a fuel at the same price, the station that was entered first/at the top in the settings is output.

## VIS 
The datapoint 'combined' can be displayed easily in this VIS widget
```js
[{"tpl":"tplHtml","data":{"visibility-cond":"==","visibility-val":1,"refreshInterval":"0","gestures-offsetX":0,"gestures-offsetY":0,"signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"html":"<span style=\"font-size: 80%; padding: 0 20px 0 5px;\">Diesel</span>{tankerkoenig.0.stations.0.diesel.combined}"},"style":{"left":"634px","top":"745px","z-index":"20","width":"228px","height":"36px","background-color":"","color":"rgba(225,225,225,1)","font-size":"30px","text-align":"center","background":"rgba(250,0,0,0.1)"},"widgetSet":"basic"}]
```
The value of the datapoint `combined` deliveres a css class. These classes are `station_open`, `station_closed` and `station_notfound`. Through CSS definitions in the CSS editor in VIS now distinguished designs can be achieved (like red font color for a closed station).
```css
.station_open {
    color: blue; 
}
.station_closed {
    color: red !important; /* !important kann ggf. weggelassen werden */
}
.station_notfound {
    color: yellow !important; /* !important kann ggf. weggelassen werden */
}
.station_no_prices {
    color: yellow !important; /* !important kann ggf. weggelassen werden */
}

/* € sign */
.station_combined_euro {
    font-family: Times;
    font-size: 80%;
}
```

## Changelog
 <!--
 Release Script: https://github.com/AlCalzone/release-script
 Placeholder for the next version (at the beginning of the line):
 ### __WORK IN PROGRESS__ (- falls nicht benötigt löschen sonst klammern entfernen und nach dem - dein text schreiben)
 -->
### __WORK IN PROGRESS__
* (xXBJXx) Ukrainian translation added
* (xXBJXx) add validation function for ID and Name Input fields
* (xXBJXx) add copy from clipboard function for ID Input field
* (Schmakus) added daily min/max prices to all stations and fuel types

### 3.0.2 (2022-11-10)
* (xXBJXx) release new version from Tankerkoenig

### 3.0.1 (2022-07-30)
* (xXBJXx) added datapoints delete function
* (xXBJXx) resetValue function removed and state quality implemented. [issue #79](https://github.com/iobroker-community-adapters/ioBroker.tankerkoenig/issues/79)
* (xXBJXx) added function => Set values to 0 when the Station is closed.
* (xXBJXx) updated dependencies

### 3.0.0 (2022-07-02)
* (xXBJXx) BREAKING Adapter code completely revised
* (xXBJXx) Adapter completely switched to TypeScript
* (xXBJXx) BREAKING Adapter configurations page switched to React and redesigned
  (old config not compatible stations must be recreated)
* (xXBJXx) add Dependabot auto merge support
* (xXBJXx) add test and release script 
* (xXBJXx) Dependency updated
* (xXBJXx) add feature request: manual update of all stations (one request per minute allowed) [issue #53](https://github.com/iobroker-community-adapters/ioBroker.tankerkoenig/issues/53) 
* (xXBJXx) add a new state => adapterStatus (indicates whether the adapter executes an automatic request or a manual request)
* (xXBJXx) add new cutPrice function [issue #73](https://github.com/iobroker-community-adapters/ioBroker.tankerkoenig/issues/73)
* (xXBJXx) add the feature request: Include discount in price (euro and percent) [issue #50](https://github.com/iobroker-community-adapters/ioBroker.tankerkoenig/issues/50) and adapter code optimized
* (xXBJXx) add the feature request: JsonTable for the vis [issue #24](https://github.com/iobroker-community-adapters/ioBroker.tankerkoenig/issues/24)

### 2.2.0 (2021-11-14)
* (simatec) Design Fix for Admin Dark/Blue Theme

### 2.1.1 (2021-06-22)
* (pix) New adapter category "vehicle" [#67](https://github.com/iobroker-community-adapters/ioBroker.tankerkoenig/issues/67)
* (pix) Testing for Nodejs 16

### 2.0.12 (2021-05-05)
* (pix) connectionType and dataSource added

### 2.0.11 (2021-05-02)
* (anwa) "wrong type" and "ack flag" issues fixed (upcoming in js-controller > 3.3)

### 2.0.10 (2021-02-01)
* (wendy) "has no existing object" issue fixed

### 2.0.9 (2020-04-21)
* (pix) NodeJS 10 or higher required

### 2.0.8 (2020-03-27)
* (Zwer2k) 2.0.8 Catch error if station status reports _no data_

### 2.0.7 (2020-03-25)
* (pix) 2.0.7 Catch error if station status reports _no stations_

### 2.0.6 (2019-04-17)
* (Zwer2k) implementation of utils corrected
* (Zwer2k) fixed error occured when all stations were closed

### 2.0.5 (2019-02-22)
* (jens-maus) fixes to prevent _request()_ floodings

### 2.0.3 (2019-02-21)
* (pix) fixed issue with too short sync interval
* (pix) removed datapoint __price__ which was created for debug only

### 2.0.1 (2019-02-20)
* (pix) fixed scrollbar issue in firefox

### 2.0.0 (2019-02-18)
* (pix) admin3 ready

### 1.3.1 (2019-02-05)
* (arteck, pix) request issues fixed

### 1.3.0 (2019-02-05)
* (pix) Compact mode added

### 1.2.1 (2018-11-25)
* (pix) fixed issue __station_id__ and __status__ mixed up

### 1.2.0 (2018-11-25)
* (pix) new datapoint station ID added

### 1.1.0 (2018-05-12)
* (bluefox) prices as number to allow logging were added

### 1.0.5 (2018-02-07)
* (pix) Log entry opt out

### 1.0.4 (2017-03-21)
* (pix) position of _adapter.stop()_ optimized

### 1.0.3 (2017-01-05)
* (pix) Appveyor testing added

### 1.0.2 (2017-01-04)
* (apollon77) TravisCI testing added

### 1.0.1 (2016-12-20)
* (pix) reset to zero issue fixed

### 1.0.0 (2016-10-08)
* (pix) reset values to zero before each refresh now can be ticked off.

### 0.1.2 (2016-07-05)
* (pix,jens-maus) whitespaces between price and € sign

### 0.1.1 (2016-07-05)
* (pix) € appearance in datapoints __combined__ is customizable through css now (thanx jens-maus)

### 0.1.0 (2016-06-12)
* (pix) first version for npm
* (pix) settings window

### 0.0.8 (2016-06-09)
* (pix) Adapter.stop() fixed

### 0.0.7 (2016-06-09)
* (pix) New channels and values for cheapest station created

### 0.0.6 (2016-06-08)
* (pix) Short prices now string

### 0.0.5 (2016-06-08)
* (pix) Channels added for stations 2 to 10
* (pix) Readme corrected (CSS code example)
* (pix) no more log.warn if station is closed
* (pix) scheduled starting improved

### 0.0.4 (2016-06-01)
* (pix) HTML Code in Datapoint __combined__ corrected

### 0.0.3 (2016-06-01)
* (pix) Datapoint __combined__ with CSS class for status

### 0.0.2 (2016-06-01)
* (pix) Datapoint __combined__

### 0.0.1 (2016-05-31)
* (pix) Adapter created

## License

The MIT License (MIT)

Copyright (c) 2016-2022 xXBJXx <issi.dev.iobroker@gmail.com> pix

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