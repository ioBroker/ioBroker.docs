---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.coronavirus-statistics/README.md
title: ioBroker.coronavirus-统计
hash: gW9jg70uEEKlA3PAWaRnAxKZqrZMBnBFDoBGPkr9l9o=
---
![NPM 版本](http://img.shields.io/npm/v/iobroker.coronavirus-statistics.svg)
![下载](https://img.shields.io/npm/dm/iobroker.coronavirus-statistics.svg)
![安装数量（最新）](http://iobroker.live/badges/coronavirus-statistics-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/coronavirus-statistics-stable.svg)
![已知漏洞](https://snyk.io/test/github/DrozmotiX/ioBroker.coronavirus-statistics/badge.svg)
![新产品管理](https://nodei.co/npm/iobroker.coronavirus-statistics.png?downloads=true)
![依赖状态](https://img.shields.io/david/DrozmotiX/ioBroker.coronavirus-statistics.svg)

<img src="./admin/coronavirus-statistics.png" width="50" height="50" alt="">

# IoBroker.coronavirus-statistics
![测试和发布](https://github.com/c/ioBroker.coronavirus-statistics/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的冠状病毒实时统计适配器
显示全球冠状病毒信息和当前报告的适配器

无需配置，安装后将：

- 接收世界范围内的全球信息并将其写入“global_totals”
- 为每个国家/地区创建一个文件夹，其中包含有关 COVID-19 的所有相关信息
- 每 15 分钟更新一次信息

以下信息可用：

|数据点 |详情 |
|--|--|
|活跃 |当前感染人数|
|案例 |全部已知病例数|
|案例每百万 |每百万公民的完全已知病例数|
|批判 |量危急（住院）|
|死亡 |当前登记的死亡人数|
|人均死亡人数 |当前每百万公民的登记死亡人数|
|标志|国旗，链接到 github 位置 |
|恢复 |完全已知的康复病例数|
|今日案例 |今天的新案例 |
|今天死亡|今天已知的死亡人数|
|测试 |全球进行的 COVID-19 测试总数 |
|每百万县的测试|全球每百万人接受的 COVID-19 测试总数 |

请注意，此适配器使用尽可能多的最新信息，但可能会延迟几个小时，具体取决于国家/地区的报告。
德国联邦：https://npgeo-corona-npgeo-de.hub.arcgis.com/ s 通用来源：https://coronavirus-19-api.herokuapp.com

＃＃ 高级设置
|选项 |说明 |
|--|--|
|所有国家 |获取全球所有国家/地区的数据（默认：false）|
|大陆 |按处于单独状态的大洲对总金额进行分组（默认值：false） |
|删除未使用的状态 |取消选择国家/地区时删除数据（默认值：false）|

## 仅适用于德国
|选项 |说明 |
|--|--|
|联邦州|获取德国的联邦州数据（仅限选择，默认为 false） |
|县 |获取德国县的数据（仅限选定，默认为 false） |
|城市 |获取德国城市的数据（仅限选定，默认为 false） |
|所有联邦州 |所有德国联邦州（默认为 false） |
|所有城市 |所有德国城市（默认为 false） |
|所有县 |所有德国县（默认为 false） |

可以获取联邦州 (Bundesländer)、城市 (Städte) 县 (Landeskreise) 的数据。
您可以选择接收所有数据或仅在高级设置中选择特定区域。

<span style="color:red">疫苗接种数据目前仅适用于德国，并且只有在 *&quot;Bundesländer&quot;* 被激活时才会被检索</span>

## 添加缺失的国家
可能会发生国家不被正确识别的情况，因为 API 提供了一些不符合 ISO 的国家名称。在这种情况下，您将在日志中收到一条警告消息，如下所示

```
coronavirus-statistics.0	2020-03-21 09:05:31.328	warn	(22937) Timor-Leste not found in lib! Must be added to the country name translator.
```

使用数据点 `coronavirus-statistics.0.countryTranslator` 您可以自己指定一个国家。在此处查找相应国家/地区的名称：

[列出国家名称](https://github.com/i-rocky/country-list-js/blob/master/data/names.json)

使用选定的国家/地区名称，您必须创建一个 JSON 字符串并将其输入到数据点 `coronavirus-statistics.0.countryTranslator` 中。
JSON 字符串如下所示，例如：

```
{
	"Cabo_Verde": "Cape Verde",
	"Timor-Leste": "East Timor"
}
```

作为第一个值，警告消息中的名称必须取自日志。然后将 [列出国家名称](https://github.com/i-rocky/country-list-js/blob/master/data/names.json) 中的国家名称分配给它。

## Changelog

<!--
	### __WORK IN PROGRESS__
	* (DutchmanNL) 
-->

### 0.7.0-4 (2021-03-30)
* (DutchmanNL) round Impfquote to 2 digits
* (lembnau) Vaccination data for AstraZeneca Germany added
* (DutchmanNL) Bugfix : Solve last_update is invalid warn message
* (DutchmanNL) Bugfix : Solve cannot read property 'Erstimpfung' of undefined

### 0.6.9 (2021-03-22)

* (lembnau) Adapter issues with vaccination data from Germany solved

### 0.6.8 (2021-01-27)
* (DutchmanNL) Bugfix : Germany vaccination data, source changed code updated
* (DutchmanNL) Removed states (not provided by RKI anymore)
  * Impfungen pro 1.000 Einwohner
  * Indikation nach Alter 
  * Berufliche Indikation
  * Medizinische Indikation
  * Pflegeheim-bewohnerIn
* (DutchmanNL) New states (provided by RKI)
  * Differenz zum Vortag 
  * Gesamtzahl bisher verabreichter Impfstoffdosen
  * Gesamtzahl kumulativ BioNTech
  * Gesamtzahl kumulativ Moderna
  * Impf-quote
  * Zweit Impfungen kumulativ
  * Zweit Impfungen Differenz zum Vortag

### 0.6.7 (2021-01-04) Improve handling of vaccination data for germany
* (DutchmanNL) Added Impfungen pro 1.000 Einwohner
* (DutchmanNL) Bugfix : Proper error handling if excel data cannot be retrieved

### 0.6.6 (2021-01-03)
* (DutchmanNL) Bugfix : Wrong channel creation of _Impfungen
* (DutchmanNL) BugfixWindows :Error: ENOENT: no such file or directory, open 'C:\opt\iobroker\iobroker-data\files\Impfquotenmonitoring.xlsx'

### 0.6.5 (2021-01-02)
* (DutchmanNL) implement Vaccination data for Germany, thank you @winnyschuster for
[RKI-Impfquotenmonitoring Deutschland](https://forum.iobroker.net/topic/40394/skript-rki-impfquotenmonitoring-deutschland-incl-b-länder/3)

### 0.6.4 (2020-12-29)
* (DutchmanNL) change API from V2 to V3
* (DutchmanNL) Add Last_Updated for city's/counties

### 0.6.3 (2020-11-04)
* (DutchmanNL) Bugfix : Error warnings to wrong type in states
* (DutchmanNL) Bugfix : Error values.features is not iterable solved

### 0.6.2 (2020-11-02)
* (stan23) 
add "Cases per 100k" in total & during the last 7 days for Germany's Bundesländer

### 0.6.1 (2020-09-25)
* (stan23) Added cases per 100k during the last 7 days for Germany

### 0.6.0 (2020-08-28)
* (DutchmanNL) Replaced module request with axios
* (DutchmanNL) Bugfix : Proper error handling of failing API calls (if api not reachable)
* (Kampfratte) Bugfix : API-Abfrage geändert

### 0.5.7 (2020-04-17) Continent state attribute information added and warn messages reduced
* (DutchmanNL) Bugfix : Add continent state attribute definition
* (DutchmanNL) Bugfix : Reduce warn messages if error occurs to 1 per message

### 0.5.6 (2020-04-17) Bugfix : API changed
* (Kampfratte) Bugfix : API changed

### 0.5.5 (2020-04-07) Bugfixes, see changelog for details
* (DutchmanNL) Bugfix : Remove test-states
* (DutchmanNL) Bugfix : Selected items not shown in tables
* (DutchmanNL) Bugfix : Remove incorrect countryInfo state
* (Scrounger)  Bugfix : Timestamp for continents calculation
* (Scrounger)  Bugfix : Replace " , " in a country name causing errors
* (DutchmanNL) Bugfix : Saint Pierre Miquelon (iso2: null, iso3: null) not found in lib!
* (DutchmanNL) Implemented Total number of COVID-19 tests taken globally.  
 It reflects the Total Tests' column in the table at https://www.worldometers.info/coronavirus/.

### 0.5.1 (2020-03-31) BugFix : State attribute definition missing for + affectedCountries
* (DutchmanNL) BugFix : State attribute definition missing for + affectedCountries
* (DutchmanNL) BugFix : Ensure name changes are propagated

### 0.5.0 (2020-03-31) For Germany : federal states, counties and cities added
* (DutchmanNL) Update production release from 0.4.0 to 0.5.0
* (DutchmanNL) BugFix : Do not write objects unneeded

### 0.4.9 Fixed issues in country names, added counties and cities for germany
* (DutchmanNL  & AlCalzone) Code optimizations 
* (DutchmanNL) Cities for germany added
* (DutchmanNL) counties for germany added
* (DutchmanNL) Hiding tables if "all" is selected
* (DutchmanNL) Hiding unused tables in advanced settings
* (Kampfratte) BugFix : Country top 5
* (GermanBluefox) BugFix : hidden numbers
* (DutchmanNL) BugFix : Several translations
* (DutchmanNL) BugFix : Issues with integration testing
* (Scrounger)  Bugfix : Country names by ISO format (could result in new data points!)
* (DutchmanNL) BugFix : Deletion of unselected federal states and counties (Germany)
* (DutchmanNL) BugFix : Button only respond when clicking on lable (not all browser)
* (DutchmanNL) BugFix : Ensure incorrect created states for "countryInfo" are removed

### 0.4.5 Countries for Germany added
* (DutchmanNL) Countries for Germany added
* (DutchmanNL) added selection for federal states and country's
* (DutchmanNL) BugFix : State attribute definition missing for + deathsPerOneMillion

### 0.4.2 Federal States for Germany implemented
* (DutchmanNL) Configuration redesigned, moved options to "Advanced Settings" tab
* (DutchmanNL) Federal States for Germany implemented, thanks to : https://npgeo-corona-npgeo-de.hub.arcgis.com/ 

### 0.4.0 Data-points added for Top 5 of countries with most cases
* (KLVN) BugFix : German (and some other) translations corrected
* (DutchmanNL) Add gulp i18n translation structure


### 0.3.5 Data-points added for Top 5 of countries with most cases
* (DutchmanNL) Data-points added for Top 5 of countries with most cases
* (DutchmanNL) BugFix : Flag datapoints are not deleted

### 0.3.4 Add button to read "All Countrys"
* (DutchmanNL) Add button to read "All Countrys"
* (DutchmanNL) Add state for link to flag for each country on github
* (DutchmanNL) BugFix : State attribute definition missing for + countryInfo
* (DutchmanNL) BugFix : Turks_and_Caicos not found in lib! Must be added to the country name translator.

### 0.3.3 Improved configuration page
* (DutchmanNL) Improved configuration page
* (DutchmanNL) Make country list in configuration variable	
* (DutchmanNL) Implement choice if non-selected countrys should be deleted from states (if already there, default No!) 

### 0.3.1
* (DutchmanNL) Enable configuration

### 0.3.0 (2020-03-22)
* (GermanBluefox) The number of data points was reduced by selection of countries
 
### 0.2.5 
* (Scrounger) Bugfix : Cabo_Verde not found in lib! Must be added to the country name translator

### 0.2.4
* (Scrounger) Grouping by continents implemented

### 0.2.3
* (DutchmanNL) Error message for new attribute solved

### 0.2.2
* (GermanBluefox) fixed widget countries

### 0.2.1
* (DutchmanNL) Fixed error "State attribute definition missing"
* (DutchmanNL) Moved "_Laste_Update" to updated within global_totals tree
* (GermanBluefox) fix logo size

### 0.2.0 Code optimized & released
* (DutchmanNL) Stable release
* (DutchmanNL) Added retry if API does not provide correct information
* (DutchmanNL) Added last time stamp of data collection
* (AlCalzone) Code optimized

### 0.1.6 Adapter renamed
* (@DutchmanNL) Adapter renamed

### 0.1.2 Widgets added & code improvements
* (DutchmanNL) code improvements
* (GermanBluefox) add widgets

### 0.1.0
* (DutchmanNL) initial release

## License
MIT License

Copyright (c) 2020 DutchmanNL <rdrozda86@gmail.com>

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