---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.schwoerer-ventcube/README.md
title: ioBroker.schwoerer-ventcube
hash: rjqmmMPuxlOO2pLoItSgaCjFBmKTBrhI/tT3cN3YOpw=
---
![标识](../../../en/adapterref/iobroker.schwoerer-ventcube/admin/schwoerer-ventcube.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.schwoerer-ventcube.svg)
![下载](https://img.shields.io/npm/dm/iobroker.schwoerer-ventcube.svg)
![依赖状态](https://img.shields.io/david/Excodibur/iobroker.schwoerer-ventcube.svg)
![安装数量（最新）](http://iobroker.live/badges/schwoerer-ventcube-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/schwoerer-ventcube-stable.svg)
![语言等级：JavaScript](https://img.shields.io/lgtm/grade/javascript/g/Excodibur/ioBroker.schwoerer-ventcube.svg?logo=lgtm&logoWidth=18)
![新产品管理](https://nodei.co/npm/iobroker.schwoerer-ventcube.png?downloads=true)

# IoBroker.schwoerer-ventcube
![Github 发布状态](https://github.com/Excodibur/iobroker.schwoerer-ventcube/workflows/Build%2C%20Test%20and%20Release/badge.svg)

## 用于 ioBroker 的 schwoerer-ventcube 适配器
Schwoererhaus Ventcube 系统的适配器。有关 Ventcube Fresh 的更多信息，请参见 [这里](https://www.bauinfocenter.de/lueftung/lueftungsanlagen/)。

**免责声明**：该适配器既不是由分发 Ventcube 系统的公司 [Schwoererhaus KG](https://www.schwoererhaus.de/) 开发也不是官方支持的。应谨慎遵循说明并自担风险。

### 前提条件
为了访问 Ventcube 的网络接口，需要满足以下（已知的）先决条件：

- Ventcube 需要连接到您的内部网络（通常通过网线）
- 需要支持 Modbus TCP 接口（控制面板：>= V1.05，VentCube：>= V02.11）并且通常必须先手动启用
    * 在控制面板上登录到“服务”部分（使用文档中的标准密码）
* 在基本设置中检查网络连接是否已建立，并且“9. 网络接口”和“10. Modbus TCP”都处于活动状态。
* 如果最后两个设置无效，请激活它们并重新启动 Ventcube（例如，通过暂时切断电源）

### 配置参数
根据建筑物特定的 Ventcube 设置，并非所有可以从 Ventcube 界面检索或更改的参数都将被使用。 “parameters”文件夹中的每个参数都与“lastUpdate”文件夹中的一个条目并排显示，该条目指示每个参数的最后提取时间戳。

下面引用的规范中提到的所有参数都已添加到适配器中，并且可以通过 ***高级功能*** 选项访问，该选项可在适配器部署期间进行配置。启用此选项将导致适配器定期检索 100 多个参数的数据，其中大多数可能不会在普通家庭中使用。测试范围仅限于***基本功能***（默认启用）。

在适配器部署期间可能需要更改以下默认配置值才能正确连接到 Ventcube：

|参数 |默认值 |说明 |
| `Server` |爱马仕-LT |通常 Ventcube 使用 _HERMES-LT_ 在网络中注册自己，但如果它不起作用，请尝试使用 IP 地址。 |
| `Port` | 502 | |
| `Interval` | 30 |应该在多少秒后从服务器刷新指标 |
| `Request Timeout` | 5000 |等待 Ventcube 请求超时的毫秒数 |
| `Reconnection Attempts` | 10 |如果与 Ventcube 的连接丢失，应尝试重新连接多少次 |
| `Delay between reconnection attempts` | 10000 |重新连接尝试之间等待的时间（以毫秒为单位）|
| `Advanced Functions` | &#10003; |如果 Ventcube 仅用于通风，基本功能可能就足够了，如果需要加热/冷却功能或系统指标（错误代码、风扇详细信息），则应激活高级功能。 |
| `高级功能` | &#10003; |如果 Ventcube 仅用于通风，基本功能可能就足够了，如果需要加热/冷却功能或系统指标（错误代码、风扇详细信息），则应激活高级功能。 |

#### 有趣的函数（开始）
- ***Betriebsart***，多变
- ***Stoßlüftung***（30 分钟 4 级空气爆发），可变
- ***Ist Temp Raum 1***（室内温度）
- ***T10 温度***

###参考系统
ioBroker 适配器已成功通过以下测试：

|控制面板 |风管 | Modbus规范|
|---------------|----------|-----------------------------------|
| V01.10 | V02.26 | [参数liste_Modbus_TCP_03.2020](https://schwoerer-service.com/storage/files/Community/2020/Parameterliste_Modbus_TCP_032020.pdf) |

## Changelog
See [Changelog](https://github.com/Excodibur/ioBroker.schwoerer-ventcube/blob/master/CHANGELOG.md).

## License
MIT License

Copyright (c) 2020-2021 Excodibur

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