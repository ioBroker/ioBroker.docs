---
BADGE-GitHub: https://img.shields.io/github/license/dkleber89/ioBroker.beckhoff
BADGE-npm: https://img.shields.io/npm/v/iobroker.beckhoff.svg
BADGE-Number of Installations: http://iobroker.live/badges/beckhoff-installed.svg
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.beckhoff/README.md
title: ioBroker.beckhoff
hash: F6l2anbtBlPE/Y8p7eI/62RDm58FK/TuY9jd/A6Zn9k=
---
![商标](../../../de/adapterref/iobroker.beckhoff/img/beckhoff.png)

![构建状态](https://ci.appveyor.com/api/projects/status/tpqe657lqrir3kew/branch/master?svg=true)
![纳米](https://img.shields.io/npm/v/iobroker.beckhoff.svg)
![安装次数](http://iobroker.live/badges/beckhoff-installed.svg)

# IoBroker.beckhoff
此 ioBroker 适配器通过 ADS 协议实现与 Beckhof 控制器（Twincat 2 或 3）的通信。
ADS 协议在每个 Beckhoff 控制器中实现，无需许可证即可使用。

本项目与 Beckhoff 公司无关

＃＃ 描述
＃＃＃ 要求
* Beckhoff 的网络连接连接到 ioBroker 可以访问的网络
    * 必须为控制器分配一个固定的 IP 地址
    * 控制器必须能够被 ioBroker ping 通
    * TwinCat 2 **除了 BC 控件** 或 TwinCat 3

### 控制器配置
1.项目中必须激活ADS。为此，请转到控制项目中的任务配置并激活“创建符号”复选框。然后将配置加载到控制器并重新启动它。只有在使用 TwinCat 2 时才需要重新启动。

    ![创建符号](../../../de/adapterref/iobroker.beckhoff/img/createSymbols.png)

2. 必须在控制器中创建静态路由。路由必须匹配 ioBroker（IP 地址和 AMS-Net-ID）。

    这是将路由直接添加到控制器时的外观示例。路线也可以通过工程计算器添加。

    ![创建符号](../../../de/adapterref/iobroker.beckhoff/img/addRoute.png)

    有关 TwinCat 路由器和一般控制的更多信息，请参见[倍福信息系统](https://infosys.beckhoff.com/ "Beckhoff Information System")。

3. 对于 TwinCat 2，仍必须在控制器中创建结构。然后将该结构添加到全局变量表中。然后可以在此处创建所有必需的变量。然后，数据交换由 ADS 和适配器独立执行。

    ##### 当前支持的数据类型：BOOL、BYTE、WORD、DWORD、SINT、USINT、INT、UINT、DINT、UDINT、REAL、LREAL、TIME、TIME_OF_DAY、TOD、DATE、DATE_AND_TIME、DT、STRING
    OPTIONAL：可以直接在变量表中创建一个变量，不用精确名称嵌套-> ioBrokerResync（大小写和数据类型无关）-> 每次这个值改变时，再次读入ioBroker中的变量表.

3. 对于 TwinCat 3，还必须在控制器中创建一个全局变量表。然后可以在此处创建所有必需的变量。然后，数据交换由 ADS 和适配器独立执行。

    ##### 当前支持的数据类型：BOOL、BYTE、WORD、DWORD、SINT、USINT、INT、UINT、DINT、UDINT、REAL、LREAL、TIME、TIME_OF_DAY、TOD、DATE、DATE_AND_TIME、DT、STRING
    OPTIONAL：可以直接在变量表中创建一个变量，不用精确名称嵌套-> ioBrokerResync（大小写和数据类型无关）-> 每次这个值改变时，再次读入ioBroker中的变量表.

### 适配器设置
#### 双猫 3 和双猫 2
1.选择运行时版本
2. 输入目标 IP 地址和 AMS 网络 ID。
3. 使用 TwinCat 2，输入全局变量表中结构的实例名称。
4. 为 TwinCat 3 输入正确的变量表名称。
5. 其余点通常不需要更改。

#### 双猫 2 <= v2.11.2240
必须上传来自 SPS 项目的 *.tpy 文件。 -> 每当负责与 ioBroker 通信的结构发生更改时，必须再次上传此文件。

＃＃＃ 数据交换
- 一旦控制器中的变量发生变化，该值就会自动传输到 ioBroker 中的相应状态。
- 如果 ioBroker 中的值发生更改（重要：ACK 必须为 FALSE！！），则会自动将其传输到控制器。如果控制器接受该值，则将 ACK 设置为 TRUE。

＃＃＃ 重要的
1. TwinCAT AMS 路由器不允许来自同一主机的多个 TCP 连接。如果从同一个主机到同一个 TwinCat 路由器设置了两个实例，路由器会自动关闭第一个连接，只响应最新的连接。
2.适配器自动同步ioBroker中的所有变量。有几种方法可以触发重新同步：
    - 如果 Resyc 变量的值发生变化（参见 [此处](#configuration-of-the-controller)）
    - 如果控制器未处于运行模式的时间超过重新连接间隔 -> 当控制器切换到运行模式时，变量表将重新同步。
    - 当项目加载到控制器上时。异常 -> OnlineChange
    - 当适配器重新启动时。
3.“同步”或“读入”不是指变量的值交换，而是指变量本身的同步以及在ioBroker中的创建或删除

## Changelog
### 1.5.1 (2022-03-19)

-   (PLCHome) Add TIME, TIME_OF_DAY, TOD, DATE, DATE_AND_TIME and DT support
-   (PLCHome) Support for strings with all char length

### 1.5.0 (2021-09-28)

-   (dkleber89) Process next state in list when register subscriptions not before the previous is finish processed in plc
### 1.4.1 (2021-06-13)

-   (dkleber89) Some little Adapter maintenance

### 1.4.0 (2021-01-25)

-   (dkleber89) Add LREAL Support

### 1.3.0 (2021-01-25)

-   (dkleber89) Set correct type for channels

### 1.2.2 (2020-05-30)

-   (dkleber89) Clear reconnectTimeout on Adapter unload;

### 1.2.1 (2020-04-20)

- (dkleber89) Add CI over Github Actions; Update Dependencies;

### 1.2.0 (2020-01-02)

- (dkleber89) Add Support for Strings with fixed length to 80 Chars

### 1.1.0 (2019-11-12)

- (dkleber89) Add Support for older TwinCat2 Systems with no autosync

### 1.0.7 (2019-10-25)

- (dkleber89) Add Support for Compact Mode -> JS Controller >= 2.0.0

### 1.0.6 (2019-08-11)

-   (dkleber89) Add check change of Datatype on resync

### 1.0.5 (2019-08-10)

-   (dkleber89) Eslint, Prettier with Airbnb Codestyle, CI adopted, little random changes in Project Structure

### 1.0.4 (2019-08-01)

-   (dkleber89) Increase depth of LOG details, Update dependency versions

## License

The MIT License (MIT)

Copyright (c) 2018-2021 dkleber89 <dkleber89@gmail.com>

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