---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.air-q/README.md
title: ioBroker.air-q
hash: mzD/gjdYCbOB5POtFxieQaf/0hWj1xkhBVHe0CoSR1c=
---
# IoBroker.air-q

![NPM版本](https://img.shields.io/npm/v/iobroker.air-q.svg)
![下载](https://img.shields.io/npm/dm/iobroker.air-q.svg)
![安装数量](https://iobroker.live/badges/air-q-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/air-q-stable.svg)
![国家公共管理](https://nodei.co/npm/iobroker.air-q.png?downloads=true)

<img src="admin/air-q.png" alt="Airq 标志" width="200"/>

**测试：** ![测试与发布](https://github.com/CorantGmbH/ioBroker.air-q/workflows/Test%20and%20Release/badge.svg)

＃＃ 内容
- [关于](#about)
- [开始](#start)
- [变更日志](#change)
- [许可证](#license)

＃＃ 关于<a id="about"/>
此 ioBroker 适配器与我们的[空气Q装置](https://www.air-q.com) 结合使用。它从我们的传感器轮询值并在 ioBroker 环境中为您显示它们。
</br> </br>

![空气-Q_frontal + Seitlich_full](https://github.com/CorantGmbH/ioBroker.air-q/assets/107550719/5c38d737-9641-463f-bd07-ac62ce5f1973)

＃＃ 入门<a id="start" />
您应该能够通过管理界面找到适配器。

否则，欢迎您通过控制台使用 ioBroker 命令行界面。只需直接进入您的 ioBroker 根文件夹并通过以下方式添加适配器即可

```
iobroker add air-q
```

这将安装适配器（如果尚未安装）并启动实例。
如果您只想安装适配器而不创建实例，请使用以下命令：

```
iobroker install air-q
```

有关更多信息，请访问 https://github.com/ioBroker/ioBroker/wiki/Console-commands 下的 ioBroker CLI 文档。

要配置您的实例，您只需选择是通过 IP 还是设备的短 ID 来连接它。

![截图2024-02-13 103001](https://github.com/CorantGmbH/ioBroker.air-q/assets/107550719/ec878783-af56-490d-af66-43c53c27df20)

请确保输入正确的 IP/ID 和密码。
然后您还可以选择如何检索数据。如果不需要负值，您可以修剪负值，当然温度除外。您可以通过输入以秒为单位的数字来设置轮询数据的频率。最后，您可以选择实时数据或平均数据。

![截图2024-02-13 104813](https://github.com/CorantGmbH/ioBroker.air-q/assets/107550719/429c57ab-933f-4930-a02b-30da7b5df180)

现在您应该已准备就绪，可以开始了！

当找到设备时，将根据您的配置检索数据并显示在对象选项卡中。当然，根据您拥有的设备，可能会显示更多传感器。

![截图2024-02-13 110655](https://github.com/CorantGmbH/ioBroker.air-q/assets/107550719/5639fdcb-3acf-4223-b1fa-fb69016c9d7b)

***目前我们已包含air-Q Pro 的所有传感器。可选传感器将包含在未来的补丁中。***

## Changelog

### 1.0.1

* Added sensor list update when connecting to a different air-Q in the same instance
* Fixed name display and update of device

### 1.0.0

* Include typescript files by @pr0crstntr in #6
* Created air-Q class by @pr0crstntr in #4
* Fix restart bug by @pr0crstntr in #7
* Update data poll by @pr0crstntr in #8
* Updated io-package by @pr0crstntr in #9
* Fixed save option for configuration by @pr0crstntr in #16
* Added clear intervals on unload by @pr0crstntr in #26
* Update README by @pr0crstntr in #37
* Changed role for temperature and added unit by @pr0crstntr in #38

### 0.0.1

* (Katharina K.) initial release

## License

MIT License

Copyright (c) 2024 Corant GmbH

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