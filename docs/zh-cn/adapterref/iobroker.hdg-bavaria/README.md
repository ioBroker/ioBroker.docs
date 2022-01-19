---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.hdg-bavaria/README.md
title: ioBroker.hdg-巴伐利亚
hash: 4/VeZYU4RmVZw98dudC9qUtT+he1ziJ31g1Nu5OpoQk=
---
![标识](../../../en/adapterref/iobroker.hdg-bavaria/admin/hdg-bavaria.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.hdg-bavaria.svg)
![下载](https://img.shields.io/npm/dm/iobroker.hdg-bavaria.svg)
![安装数量（最新）](https://iobroker.live/badges/hdg-bavaria-installed.svg)
![安装数量（稳定）](https://iobroker.live/badges/hdg-bavaria-stable.svg)
![依赖状态](https://img.shields.io/david/stemaker/iobroker.hdg-bavaria.svg)
![新PM](https://nodei.co/npm/iobroker.hdg-bavaria.png?downloads=true)

# IoBroker.hdg-巴伐利亚
**测试：** ![测试和发布](https://github.com/stemaker/ioBroker.hdg-bavaria/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 hdg-bavaria 适配器
从 HDG 巴伐利亚锅炉的 HDG Control 访问数据。目前仅支持单一配置（K10-33、850l 水箱，带 3 个温度传感器，单一加热回路）。其他可根据要求添加。

## Changelog
<ul>
  <li>v0.3.1
    <ul>
      <li>Added integration test.</li>
    </ul>
  </li>
  <li>v0.3.0
    <ul>
      <li>Added tracking energy of the tank. Temperature sensor data is used to evaluate the current thermal energy of the tank.
      Tank content is currently equally distributed to temperature sensors which might not be accurate depending on sensor positions.</li>
    </ul>
  </li>
  <li>v0.2.1
    <ul>
      <li>First released version</li>
    </ul>
  </li>
</ul>

## License
MIT License

Copyright (c) 2021 stemaker <app.stemaker@gmail.com>

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