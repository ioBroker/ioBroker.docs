---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.web-speedy/README.md
title: ioBroker.web-speedy
hash: c53coGGAwPoPNkVflNuBVhYnpJXOP0mQ8U3HTL42Klo=
---
![商标](../../../en/adapterref/iobroker.web-speedy/admin/web-speedy.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.web-speedy.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.web-speedy.svg)
![安装数量（最新）](http://iobroker.live/badges/web-speedy-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/web-speedy-stable.svg)
![依赖状态](https://img.shields.io/david/iobroker-community-adapters/iobroker.web-speedy.svg)
![已知漏洞](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.web-speedy/badge.svg)
![NPM](https://nodei.co/npm/iobroker.web-speedy.png?downloads=true)
![特拉维斯](http://img.shields.io/travis/iobroker-community-adapters/ioBroker.web-speedy/master.svg)

＃ioBroker.web-speedy
##适用于ioBroker的Web快速适配器
Web-Speedy使您可以定期测试Internet连接并将结果存储在ioBroker中！

###如何使用此适配器
第一次启动时，它将根据ping结果检索附近的最佳服务器并运行第一个测试。

Web-Speedy以自动处理所有执行的方式构建，这意味着您没有配置页面。
但是，您仍然可以影响某些事情（请参见数据点）：

|州|描述 |
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| test_auto_modus |服务器模式运行|
| test_auto_intervall |自动测试执行的间隔时间（默认值= 30，如果设置为0，则不会运行任何自动测试！）|
| test_best |现在根据上次ping结果在最佳服务器上运行测试|
| test_by_id |立即在特定服务器ID上运行测试！ |
| test_by_url |立即在特定服务器URL上运行测试！ |
| test_duration |一次测试运行（上传或下载）的最大长度（以秒为单位）|
| test_specific |使用下拉列表选择上一次扫描中发现的前5个服务器之一。 |
| test_specific_id |输入特定的服务器ID[请在这里找到服务器ID](https://c.speedtest.net/speedtest-servers-static.php?fbclid=IwAR3mLi2N9mwp1zG4Xu96cn4h1Zql6NG26p6GDjctjMftq0YzKKwPk-wme8A)|
| test_specific_url |输入特定的服务器URL [请在此处找到服务器URL]（https://c.speedtest.net/speedtest-servers-static.php?fbclid=IwAR3mLi2N9mwp1zG4Xu96cn4h1Zql6NG26p6GDjctjMftq0YzKKwPk-wme8A）|

![兆字节](https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.web-speedy/master/admin/Mbyte.png)![兆比特](https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.web-speedy/master/admin/Mbit.png)![状态](https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.web-speedy/master/admin/states.png)

＃＃ 支持我
如果您喜欢我的工作，请随时提供个人捐款（这是DutchmanNL的个人捐款链接，与ioBroker项目无关！）[![捐赠]（https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.wled/master/admin/button.png）](http://paypal.me/DutchmanNL)

## Changelog

### 0.2.0 Initial release
* (DutchmanNL) Attention : Delete all objects beforer adapter start if previous version installed !
* (DutchmanNL) Implement [ test_auto_modus ] Server mode to run automatically tests with
* (DutchmanNL) Fix issues with running specific server tests
* (DutchmanNL) Upload speed calculation issue fixed

### 0.1.5 New settings possibilities & Code improvements
* (DutchmanNL) Implemented states for progress in %
* (DutchmanNL) No automated scan if test_auto_intervall set zo 0
* (DutchmanNL) Ensure propper running state reset at adapter start
* (DutchmanNL) Improve code performance and avoid multiple running instances
* (DutchmanNL) Implemented adjustable duration time for scan by (increase if you see strange test results, like to 20 secons)
* (DutchmanNL) Implemented state to run test by id or URL at specific server [Please find a server id here](https://c.speedtest.net/speedtest-servers-static.php?fbclid=IwAR3mLi2N9mwp1zG4Xu96cn4h1Zql6NG26p6GDjctjMftq0YzKKwPk-wme8A)

### 0.1.1 MegaByte to Megabit calculation and current test speeds implemented
* (DutchmanNL) Fix wrong status "test runnig"
* (DutchmanNL) Implement byte to bit calculation for test - results
* (DutchmanNL) implement current speeds in kb/s during download

### 0.1.0 Beta release for public testing
* (DutchmanNL) Beta release for public testing

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