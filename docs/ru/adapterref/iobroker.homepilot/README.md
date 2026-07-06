---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.homepilot/README.md
title: ioBroker.homepilot
hash: 81PmsjfzGIpTyiziWe53Oh+v7eFn8S0KgYpV0NYbkz8=
---
![Логотип](../../../en/adapterref/iobroker.homepilot/admin/homepilot.png)

![Количество установок](http://iobroker.live/badges/homepilot-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.homepilot.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.homepilot.svg)
![НПМ](https://nodei.co/npm/iobroker.homepilot.png?downloads=true)

# IoBroker.homepilot
## _Для работы адаптера требуется прошивка базовой станции Homepilot версии ниже 5.0 (выпущенная до сентября 2019 года)._<br> Более новые или обновленные станции можно управлять с помощью [ioBroker.homepilot20](https://github.com/homecineplexx/ioBroker.homepilot20)_
Требуется NodeJS версии 10 или выше.

:de: [Документация](/docs/de/doc_homepilot_de.md)

:uk: [Документация](/docs/en/doc_homepilot_en.md)

:ru: [Документация](/docs/en/doc_homepilot_en.md)

:portugal: [Документация](/docs/en/doc_homepilot_en.md)

:нидерланды: [Документация](/docs/en/doc_homepilot_en.md)

:fr: [Документация](/docs/en/doc_homepilot_en.md)

:it: [Документация](/docs/en/doc_homepilot_en.md)

:es: [Документация](/docs/en/doc_homepilot_en.md)

:Польша: [Документация](/docs/en/doc_homepilot_en.md)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.3.0 (2026-05-14)
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (mcm1957) Dependencies have been updated

### 1.2.3 (2024-04-19)
- (mcm1957) NPM related problems have been fixed.

### 1.2.2 (2024-04-18)
- (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
- (mcm1957) Dependencies have been updated

### 1.1.7 (2021-08-25)
* (pix) DeviceId should be string [#27](https://github.com/iobroker-community-adapters/ioBroker.homepilot/issues/27)

### 1.1.6 (2021-05-05)
* (pix) connectionType and dataSource added
* (pix) Travis updated
* (pix) minor fixes (logo size, update news)

[Older changelogs can be found there](CHANGELOG_OLD.md)## Roadmap
* 1.4.0 get a list of all installed duofern products in your network within the settings window
* 1.5.0 rearrange object tree to "homepilot.0.device.channel.state"
* 2.0.0 get live data from Homepilot station (zwave)
Contributions are welcome!

## License

The MIT License (MIT)

Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright (c) 2016-2022 pix

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