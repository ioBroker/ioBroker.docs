---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.huum-sauna/README.md
title: ioBroker.huum-桑拿
hash: aU0jjpssM3SwaO7SgNk2hq7ngOl6nohYqjvWz06NWe4=
---
![商标](../../../en/adapterref/iobroker.huum-sauna/admin/huum-sauna.png)

![下载](https://img.shields.io/npm/dm/iobroker.huum-sauna)
![安装数量](https://img.shields.io/npm/v/iobroker.huum-sauna/latest)
![已知漏洞](https://snyk.io/test/github/chris-1965/ioBroker.huum-sauna/badge.svg)
![新PM](https://nodei.co/npm/iobroker.huum-sauna.png?downloads=true)

# IoBroker.huum-桑拿
该适配器将 HUUM 桑拿控制设备集成到 iobroker。
可以找到用于桑拿控制的 HUUM Devive 规范[这里](https://huum.de/)

＃＃ 参数
- HUUM 网页“https://api.huum.eu/action/home/”的 1 + 2 个用户凭证
- 3刷新..刷新从设备加载HUUM数据
- 4 个光路 .. 用于切换外部光的可选光路（状态）。如果使用空 HUUM 开关方式
- 5 AstroLight .. 设置时，灯光会在日落时自动打开（用于室外桑拿）。

## 用法示例
![涂鸦](https://user-images.githubusercontent.com/56934142/150417838-425261da-a6c7-47b3-bf1b-2af6035ffd59.png)

## [变更日志](CHANGELOG.md)

## License
MIT License

"Copyright (c) 2022 Chris <besterquester@live.at>"
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