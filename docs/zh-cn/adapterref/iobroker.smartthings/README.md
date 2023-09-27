---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.smartthings/README.md
title: ioBroker.smartthings
hash: Q2OX4G2Y4FGzXN5q/OzU4jrQLAkq9jVnCD1TgAceyog=
---
![标识](../../../en/adapterref/iobroker.smartthings/admin/smartthings.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.smartthings.svg)
![下载](https://img.shields.io/npm/dm/iobroker.smartthings.svg)
![安装数量](https://iobroker.live/badges/smartthings-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/smartthings-stable.svg)
![依赖状态](https://img.shields.io/david/TA2k/iobroker.smartthings.svg)
![国家公共管理](https://nodei.co/npm/iobroker.smartthings.png?downloads=true)

# IoBroker.smartthings
**测试：** ![测试与发布](https://github.com/TA2k/ioBroker.smartthings/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 smartthings 适配器
适用于三星智能设备的适配器

## 登录ablauf：
Besuchen Sie den Link。 https://account.smartthings.com/tokens Melden Sie sich mit Ihrem Samsung-Konto an, um zur Seite \"Persönliche Zugriffstoken\" zu gelangen。
Tippen Sie auf die Schaltfläche “Neuen Tokengenerieren”，嗯 auf die Seite “Neuer Zugriffstoken” zu gelangen。
Geben Sie einen Namen für das neue Token 和。 Wählen Sie im Abschnitt “Autorisierte Bereiche” eine beliebige Funktionalität aus, die Sie für das Token autorisieren möchten。
Tippen Sie auf die Schaltfläche“Tokengenerieren”，wenn Sie fertig sind，和 Sie kehren zur Seite“Persönliche Zugriffstoken”zurück。 Kopieren Sie das neugenerierte Token und bewahren Sie es an einem sicheren Ort auf。 Dies ist Ihre einzige Möglichkeit, den neugenerierten Tokenwert abzurufen。

## 斯图恩
smartthings.0.id.capability 已真正设置或已设置

## 讨论和讨论：
https://forum.iobroker.net/topic/48091/test-adapter-samsung-smartthings-v-0-0-x

## Changelog

- 0.1.0 Added object excluding to reduce cpu usage

- 0.0.4 Reduced cpu load while writing states

- 0.0.3 (TA2k) initial release

## License

MIT License

Copyright (c) 2021 TA2k <tombox2020@gmail.com>

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