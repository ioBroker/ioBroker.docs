---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.modbus/README.md
title: iobroker.modbus
hash: bV12UaHIWeE2s72XClON8yl9YIq+LHFAoh5+qejs8ic=
---
![标识](../../../en/adapterref/iobroker.modbus/admin/modbus.png)

![安装数量](http://iobroker.live/badges/modbus-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.modbus.svg)
![下载](https://img.shields.io/npm/dm/iobroker.modbus.svg)

# Iobroker.modbus
![测试和发布](https://github.com/ioBroker/iobroker.modbus/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/modbus/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-Plugin 文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用 Sentry 报告。

ioBroker 的 ModBus 从站和主站的实现。支持以下类型：

- 串行 Modbus RTU（主站）
- Modbus RTU over TCP（主站）
- Modbus TCP（从站、主站）
- 带有 SSL/TLS 的 Modbus TCP（主站）

SSL/TLS 支持
为了与需要 SSL/TLS 加密的设备（例如端口 802 上的 Kostal KSEM 智能电表）建立安全连接，您可以选择“带 SSL/TLS 的 TCP”作为连接类型。这将提供以下配置选项：

- **SSL 证书文件路径**：PEM 格式的 SSL 证书文件的路径
- **SSL 私钥文件路径**：PEM 格式的 SSL 私钥文件的路径
- **SSL CA 证书文件路径**：PEM 格式的 CA 证书文件路径（可选）
- **拒绝未经授权的证书**：取消选中则允许自签名证书

注意：证书文件必须可由 ioBroker 进程访问，并且采用 PEM 格式。

＃＃ 设置
### 合作伙伴 IP 地址
Modbus 伙伴的 IP 地址。

＃＃＃ 港口
如果配置为主站（客户端），则为 modbus 伙伴的 TCP 端口；如果配置为从站（服务器），则为自己的端口。

### 设备 ID
Modbus 设备 ID。如果使用 TCP/Modbus 桥接器，则此项很重要。

＃＃＃ 类型
从属（服务器）或主（客户端）。

### 使用别名作为地址
通常，所有寄存器的地址范围都是 0 到 65535。通过使用别名，可以为每种类型的寄存器定义虚拟地址字段。通常：

- 离散输入从 10001 到 20000
- 线圈数从 1 到 1000
- 输入寄存器从 30001 到 40000
- 保持寄存器从 40001 到 60000

每个别名将在内部映射到地址，例如，30011 将映射到输入寄存器 10，等等。

### 直接地址
用于二进制输入和线圈。
如果没有此标志，则位的寻址方式如下：`0 => 15, 1 => 14, 2 => 13, ..., 15 => 0`。
如果激活此标志，则位的寻址方式如下：`0 => 0, 1 => 1, 2 => 2, ..., 15 => 15`。

### 不要将地址与 16 位（字）对齐
通常情况下，线圈和离散量输入地址对齐到 16 位。
例如，地址 3 到 20 将对齐到 0 到 32 位。
如果启用此选项，地址将不会对齐。

### 不要使用多个寄存器
如果从机不支持“写入多个寄存器”命令，您可以激活它以在写入多个寄存器时收到警告。

### 仅使用多个写入寄存器
如果从站仅支持“写入多个寄存器”命令，则可以激活该命令，以便始终使用 FC15/FC16 命令写入寄存器。

### 四舍五入为
浮点数和双精度数的逗号后有多少位数字。

### 数据轮询间隔
循环轮询间隔（仅与主站相关）

### 重新连接延迟
重新连接间隔（仅与主服务器相关）

### 读取超时
读取请求的超时时间（以毫秒为单位）。如果此时未收到从站的响应，则连接将终止。

### 脉冲时间
如果脉冲用于线圈，这定义了脉冲间隔的长度（以毫秒为单位）。

### 等待时间
两个不同设备 ID 轮询之间的等待时间（以毫秒为单位）。

### 最大读取请求长度
命令 READ_MULTIPLE_REGISTERS 的最大长度为要读取的寄存器的数量。

某些系统要求先进行“写入请求”才能在“读取请求”中传递数据。
您可以通过将“最大读取请求长度”设置为 1 来强制此模式。

**注意：**某些 USB Modbus 解决方案（例如基于 socat）可能无法与 serialport npm 模块协同工作。

有一个软件[**Modbus RTU <-> Modbus RTU over TCP**](http://mbus.sourceforge.net/index.html)网关，可以使用串行 RTU over TCP 协议。

**RTU over TCP** 和 **TCP** 这两种解决方案都运行良好。

### 读取间隔
两次读取请求之间的延迟（以毫秒为单位）。默认值为 0。

### 写入间隔
两次写入请求之间的延迟（以毫秒为单位）。默认值为 0。

### 更新未改变的状态
通常情况下，如果值没有改变，则不会将其写入 ioBroker。
此标志允许在每个周期更新值的时间戳。

### 不要在 ID 中包含地址
不要在生成的 ioBroker iD 中添加地址。`10_Input10` 与 `_Input10`。

### 保留 ID 中的点
使用此标志，名称将为`Inputs.Input10`。没有则 => `Inputs_Input10`。

## 配置中单个地址行的参数
＃＃＃ 地址
要读取的 Modbus 地址。

### 从属 ID
如果有多个从属设备，那么这就是 ID（如果不是全局配置中给出的默认 ID）。

＃＃＃ 姓名
这是参数的名称。

＃＃＃ 描述
参数描述。

＃＃＃ 单元
参数的单位。

＃＃＃ 类型
要从总线读取的数据类型。有关可能的数据类型的详细信息，请参阅数据类型部分。

＃＃＃ 长度
参数的长度。对于大多数参数，这是根据数据类型确定的，但对于字符串，这定义了以字节/字符为单位的长度。

＃＃＃ 因素
此因子用于乘以从总线读取的值，以进行静态缩放。因此，计算如下`val = x * Factor + Offset`。

＃＃＃ 抵消
经过上述乘法运算后，该偏移量会被添加到读取的值中。因此，计算结果如下`val = x * Factor + Offset`。

＃＃＃ 公式
如果 Factor 和 Offset 字段不够用，可以使用此字段进行高级计算。**如果设置了此字段，则 Factor 和 Offset 字段将被忽略。**该公式由 eval() 函数执行。因此，所有常用函数均受支持，尤其是数学函数。公式必须符合 JavaScript 语法，因此也要注意大小写。

公式中，“x”必须表示从 Modbus 读取的值。例如：`x * Math.pow(10, sf['40065'])`

使用“sf”数组（参见上面的例子），如果其他读取的 modbus 值在配置中被标记为“比例因子”（参见下面有关“SF”标志的信息），您可以访问它们。

如果在运行时无法评估公式，则适配器会向日志中写入警告消息。

公式的另一个用例是使用类似`x > 2000000 ? null : x`的公式来防止不可信的数据

＃＃＃ 角色
要分配的 ioBroker 角色。

＃＃＃ 房间
ioBroker 房间分配。

### 投票
如果激活，则从从站以预定的间隔轮询值。

### WP
写脉冲

### 连续波
循环写入

### 旧金山
使用值作为缩放因子。
在某些系统中，动态缩放因子需要使用此标记，这些因子通过接口上的值提供。
如果某个值带有此标记，则该值将存储在一个遵循以下命名约定的变量中：`sf['Modbus_address']`。
此变量随后可用于任何公式中的其他参数。例如，以下公式可以设置：`(x * sf['40065']) + 50;`

数据类型
- `uint16be` - `无符号 16 位（大端）：AABB => AABB`
- `uint16le` - `无符号 16 位（小端）：AABB => BBAA`
- `int16be` - `有符号 16 位（大端）：AABB => AABB`
- `int16le` - `有符号 16 位（小端）：AABB => BBAA`
- `uint32be` - `无符号 32 位（大端）：AABBCCDD => AABBCCDD`
- `uint32le` - `无符号 32 位（小端）：AABBCCDD => DDCCBBAA`
- `uint32sw` - `无符号 32 位（大端字交换）：AABBCCDD => CCDDAABB`
- `uint32sb` - `无符号 32 位（大端字节交换）：AABBCCDD => DDCCBBAA`
- `int32be` - `有符号 32 位（大端）：AABBCCDD => AABBCCDD`
- `int32le` - `有符号 32 位（小端）：ABBCCDD => DDCCBBAA`
- `int32sw` - `有符号 32 位（大端字交换）：AABBCCDD => CCDDAABB`
- `int32sb` - `有符号 32 位（大端字节交换）：AABBCCDD => DDCCBBAA`
- `uint64be` - `无符号 64 位（大端）：AABBCCDDEEFFGGHH => AABBCCDDEEFFGGHH`
- `uint64le` - `无符号 64 位（小端）：AABBCCDDEEFFGGHH => HHGGFFEEDDCCBBAA`
- `uint8be` - `无符号 8 位（大端）：AABB => BB`
- `uint8le` - `无符号 8 位（小端）：AABB => AA`
- `int8be` - `有符号 8 位（大端）：AABB => BB`
- `int8le` - `有符号 8 位（小端）：AABB => AA`
- `floatbe` - `浮动（大端）：AABBCCDD => AABBCCDD`
- `floatle` - `浮点数（小端）：AABBCCDD => DDCCBBAA`
- `floatsw` - `浮点数（大端字交换）：AABBCCDD => CCDDAABB`
- `floatsb` - `浮点数（大端字节交换）：AABBCCDD => DDCCBBAA`
- `doublebe` - `双（大端）：AABBCCDDEEFFGGHH => AABBCCDDEEFFGGHH`
- `doublele` - `双精度（小端）：AABBCCDDEEFFGGHH => HHGGFFEEDDCCBBAA`
- `string` - `字符串 8 位（零端）：ABCDEF\0 => ABCDEF\0`
- `stringle` - `字符串 8 位（小端，零端）：ABCDEF\0 => BADCFE\0`
- `string16` - `字符串 16 位（零端）:\0A\0B\0C\0D\0E\0F\0\0 => ABCDEF\0`
- `string16le`- `字符串 16 位（小端，零端）：A\0B\0C\0D\0E\0F\0\0\0 => ABCDEF\0`
- `rawhex` - `以十六进制表示的字符串值为 AABBCCDD.... => AABBCCDD....`

以下描述复制自[这里](http://www.chipkin.com/how-real-floating-point-and-32-bit-data-is-encoded-in-modbus-rtu-messages/)

点对点 Modbus 协议是 RTU 通信的热门选择，原因很简单，就是它的基本便利性。该协议本身控制着 Modbus 网络上每个设备的交互、设备如何建立已知地址、每个设备如何识别其消息以及如何从数据中提取基本信息。本质上，该协议是整个 Modbus 网络的基础。

然而，这种便利并非没有复杂性，Modbus RTU 消息协议也不例外。
该协议本身是基于 16 位寄存器长度的设备设计的。
因此，在实现 32 位数据元素时需要特别考虑。
该实现确定使用两个连续的 16 位寄存器来表示 32 位数据，或者说 4 个字节的数据。
正是在这四个字节的数据中，单精度浮点数据才能被编码成 Modbus RTU 消息。

### 字节顺序的重要性
Modbus 本身并未定义浮点数据类型，但普遍认为它使用 IEEE-754 标准实现 32 位浮点数据。
然而，IEEE 标准并没有明确定义数据有效负载的字节顺序。
因此，处理 32 位数据时最重要的考虑因素是按正确的顺序寻址数据。

例如，IEEE 754 标准中定义的单精度 32 位浮点数 123/456.00 如下所示：

![图片1](../../../en/adapterref/iobroker.modbus/img/img1.png)

不同字节排序的影响非常显著。例如，将表示 123456.00 的 4 个字节数据按`B A D C` 序列排序，这被称为“字节交换”。当将其解释为 IEEE 744 浮点数据类型时，结果会大不相同：

![图片2](../../../en/adapterref/iobroker.modbus/img/img2.png)

将相同的字节按“C D A B”序列排序称为“字交换”。结果与原始值 123456.00 再次大相径庭：

![图片3](../../../en/adapterref/iobroker.modbus/img/img3.png)

此外，`byte swap` 和 `word swap` 都会从本质上完全反转字节序列，从而产生另一个结果：

![图片4](../../../en/adapterref/iobroker.modbus/img/img4.png)

显然，当使用 Modbus 等网络协议时，必须严格注意内存字节在传输时的排序方式，也称为“字节顺序”。

### 确定字节顺序
根据 Modbus 应用协议规范 V1.1.b，Modbus 协议本身被声明为“大端”协议：

**Modbus 使用“大端”表示法来表示地址和数据项。
这意味着，当传输大于单个字节的数值时，将首先发送最高有效字节。**

Big-Endian 是网络协议最常用的格式 - 事实上，它非常常见，因此也被称为“网络顺序”。

鉴于Modbus RTU消息协议采用大端字节序，为了通过Modbus RTU消息成功交换32位数据类型，必须考虑主设备和从设备的字节序。许多RTU主从设备允许选择特定的字节顺序，尤其是在软件模拟单元的情况下。只需确保两个设备都设置为相同的字节顺序即可。

一般来说，设备微处理器的系列决定了其字节序。通常，大端字节序（先存储高位字节，后存储低位字节）通常出现在采用摩托罗拉处理器设计的 CPU 中。小端字节序（先存储低位字节，后存储高位字节）通常出现在采用英特尔架构的 CPU 中。至于哪种字节序被认为是“倒序”，则取决于个人观点。

但是，如果字节顺序和字节序不是可配置选项，则必须确定如何解释字节。这可以通过向从属设备请求一个已知的浮点值来完成。如果返回一个不可能的值，例如带有两位数指数的数字或类似的数字，则很可能需要修改字节顺序。

### 实用帮助
FieldServer Modbus RTU 驱动程序提供了多种函数移动，用于处理 32 位整数和 32 位浮点值。更重要的是，这些函数移动考虑了所有不同形式的字节排序。下表显示了将两个相邻的 16 位寄存器复制到 32 位整数值的 FieldServer 函数移动。

| 函数关键字 | 交换模式 | 源字节 | 目标字节 |
|-------------------|--------------------|-----------------|--------------|
| 2.i16-1.i32 | 不适用 | [ a b ] [ c d ] | [ a b c d ] |
| 2.i16-1.i32-s | 字节和字交换 | [ a b ] [ c d ] | [ d c b a ] |
| 2.i16-1.i32-sb | 字节交换 | [ a b ] [ c d ] | [ b a d c ] |
| 2.i16-1.i32-sw | 字交换 | [ a b ] [ c d ] | [ c d a b ] |

下表显示了将两个相邻的 16 位寄存器复制到 32 位浮点值的 FieldServer 函数移动：

| 函数关键字 | 交换模式 | 源字节 | 目标字节 |
|-------------------|--------------------|-----------------|--------------|
| 2.i16-1.ifloat | 不适用 | [ a b ] [ c d ] | [ a b c d ] |
| 2.i16-1.ifloat-s | 字节和字交换 | [ a b ] [ c d ] | [ d c b a ] |
| 2.i16-1.ifloat-sb | 字节交换 | [ a b ] [ c d ] | [ b a d c ] |
| 2.i16-1.ifloat-sw | 单词交换 | [ a b ] [ c d ] | [ c d a b ] |

下表显示了将单个 32 位浮点值复制到两个相邻的 16 位寄存器的 FieldServer 函数移动：

| 函数关键字 | 交换模式 | 源字节 | 目标字节 |
|------------------|--------------------|-----------------|----------------|
| 1.float-2.i16 | 不适用 | [ a b ] [ c d ] | [ a b ][ c d ] |
| 1.float-2.i16-s | 字节和字交换 | [ a b ] [ c d ] | [ d c ][ b a ] |
| 1.float-2.i16-sb | 字节交换 | [ a b ] [ c d ] | [ b a ][ d c ] |
| 1.float-2.i16-sw | 单词交换 | [ a b ] [ c d ] | [ c d ][ a b ] |

鉴于 FieldServer 函数的各种移动方式，32 位数据的正确处理取决于选择合适的移动方式。观察这些 FieldServer 函数在已知单精度十进制浮点值 123456.00 上的行为：

| 16 位值 | 函数移动 | 结果 | 函数移动 | 结果 |
|---------------|------------------|-----------|------------------|---------------|
| 0x2000 0x47F1 | 2.i16-1.浮点型 | 123456.00 | 1.浮点型-2.i16 | 0x2000 0x47F1 |
| 0xF147 0x0020 | 2.i16-1.浮点型| 123456.00 | 1.浮点型-2.i16-s | 0xF147 0X0020 |
| 0x0020 0xF147 | 2.i16-1.float-sb | 123456.00 | 1.float-2.i16-sb | 0x0020 0xF147 |
| 0x47F1 0x2000 | 2.i16-1.float-sw | 123456.00 | 1.float-2.i16-sw | 0x47F1 0x2000 |

请注意，不同的字节和字序需要使用合适的 FieldServer 函数 move。选择合适的函数 move 后，数据就可以双向转换。

互联网上有很多十六进制到浮点数的转换器和计算器，但实际上很少有允许操作字节和字序的。
其中一个这样的实用程序位于 www.61131.com/download.htm，您可以在那里下载该实用程序的 Linux 和 Windows 版本。
安装后，该实用程序将作为可执行文件运行，并带有一个对话框界面。
该实用程序将十进制浮点值 123456.00 的显示方式如下：

![图片5](../../../en/adapterref/iobroker.modbus/img/img5.png)

然后可以交换字节和/或字来分析 Modbus RTU 主设备和从设备之间可能存在的潜在字节顺序问题。

## 寄存器的导出/导入
通过导出/导入功能，您可以将所有注册数据（仅一种类型）转换为 TSV（制表符分隔值）文件，然后再转换回来，以便轻松地将数据从一个设备复制到另一个设备或在 Excel 中编辑注册。

您可以与[modbus 模板](https://github.com/ioBroker/modbus-templates) 中的其他用户共享您的模式，或者您可以在那里找到一些注册模式。

＃＃ 测试
文件夹`test`中有一些程序用于测试 TCP 通信：

- Ananas32/64 是一个从属模拟器（仅保持寄存器和输入，没有线圈和数字输入）
- RMMS 是主模拟器
- mod_RSsim.exe 是一个从属模拟器。您可能需要 [Microsoft Visual C++ 2008 SP1 Redistributable Package](https://www.microsoft.com/en-us/download/details.aspx?id=5582) 才能启动它（因为 SideBySide 错误）。

## 待办事项
- [ ] 解析 https://github.com/ioBroker/modbus-templates 上的文件并允许直接从适配器导入它们

<!--

### **工作正在进行** -->

## Changelog
### **WORK IN PROGRESS**
* (copilot) Improved Modbus error handling and fault tolerance - continue polling working devices even when others fail
* (copilot) Fixes memory leak
* (copilot) Added option to disable connection error logging to avoid log spam when devices are unavailable

### 6.4.0 (2024-11-22)
* (bluefox) Moved GUI compilation to vite
* (bluefox) Added error message if the response length is invalid

### 6.3.2 (2024-08-29)
* (bluefox) Corrected the error with alignment of addresses

### 6.3.0 (2024-08-28)
* (Apollon77) Fix Timeout management to prevent leaking memory
* (bluefox) Added information about connected clients in the server mode
* (bluefox) Tried to fix error with aligning addresses
* (bluefox) GUI was migrated to admin 7

### 6.2.3 (2024-05-25)
* (Q7Jensen) Fixed error at aligning addresses to word
* (Apollon77) Added device id to some errors

### 6.2.2 (2024-04-26)
* (Apollon77) Downgrade gulp to 4.0.2 to fix build

### 6.2.1 (2024-04-16)
* (PLCHome) Warning regarding scale factor due to incorrect check: "Calculation of a scaleFactor which is based on another scaleFactor seems strange."

### 6.2.0 (2024-04-12)
* (PLCHome) String based on 16-bit values big endian as well as little endian
* (PLCHome) Raw data as a hex string
* (PLCHome) Fix issue `stringle` was always converted to number for slave
* (PLCHome) Enable formula for strings and hex strings

### 6.1.0 (2023-12-14)
* (nkleber78) Implement the connection keepAlive

### 6.0.1 (2023-10-30)
* (bluefox) Better tooltips in settings

### 6.0.0 (2023-10-27)
* (bluefox) GUI packages updated
* (bluefox) Added help for settings
* (bluefox) Minimal supported node.js version is 16

### 5.0.11 (2022-12-01)
* (clausmuus) fixed reconnect of serial communication

### 5.0.8 (2022-09-27)
* (bluefox) GUI packages updated

### 5.0.5 (2022-08-13)
* (Apollon77) Prevent some crash cases reported by Sentry

### 5.0.4 (2022-06-15)v
* (bluefox) Corrected the coils reading in slave mode
* (bluefox) Corrected type of connection indicator

### 5.0.3 (2022-05-13)
* (bluefox) Fixed error with multi-devices

### 5.0.0 (2022-05-11)
* BREAKING: All space characters will be replaced with underscores now in the Objects IDs, not only the first one.
* (Apollon77) Catch error reported by sentry when invalid Master port is entered
* (bluefox) GUI migrated to mui-v5

### 4.0.4 (2022-03-25)
* (Apollon77/UncleSamSwiss) Prevent invalid state log

### 4.0.3 (2022-03-21)
* (bluefox) Updated serial port package
* (bluefox) A minimal node.js version is 12

### 3.4.17 (2021-11-11)
* (Apollon77) Catch errors in tasks processing to prevent crashes

### 3.4.15 (2021-11-09)
* (Apollon77) Catch errors in tasks processing to prevent crashes
* (Apollon77) make sure generated IDs do not end with "."

### 3.4.14 (2021-08-31)
* (nkleber78) Fixed issue with sorting
* (bluefox) Corrected the calculations with scaling factor
* (bluefox) Read times were optimized

### 3.4.11 (2021-07-31)
* (bluefox) Corrected import of last line

### 3.4.10 (2021-07-30)
* (Apollon77) Make sure that slave reconnections at least wait 1000ms to allow old connectio to close properly
* (bluefox) Corrected the error with write single registers

### 3.4.9 (2021-07-06)
* (bluefox) Changed edit behaviour

### 3.4.8 (2021-06-24)
* (Apollon77) Fix crash case on writing floats (Sentry IOBROKER-MODBUS-2D)

### 3.4.7 (2021-06-22)
* (bluefox) Corrected addressing with aliases in GUI

### 3.4.6 (2021-06-21)
* (bluefox) Corrected addressing with aliases

### 3.4.5 (2021-06-19)
* (bluefox) Corrected the "write multiple registers" option

### 3.4.4 (2021-06-16)
* (bluefox) GUI bugs were corrected
* (bluefox) Added output of error codes

### 3.4.2 (2021-06-15)
* (nkleber78) Corrected issue with the scale factors
* (bluefox) New react GUI added
* (bluefox) Add new option: Use only Write multiple registers, read interval

### 3.3.1 (2021-05-10)
* (bluefox) fixed the configuration dialog for "input registers" in slave mode

### 3.3.0 (2021-04-16)
* (Apollon77) Allow usage of write-only (no poll) states
* (Apollon77/TmShaz) F Write multiple registers
* (prog42) create states of type string with default value of type string

### 3.2.6 (2021-03-05)
* (Apollon77) Prevent a crash case (Sentry IOBROKER-MODBUS-20)
* (Apollon77) Better handle invalid responses

### 3.2.4 (2021-01-30)
* (Sierra83) also support ttyXRUSB0 style devices

### 3.2.3 (2021-01-21)
* (Apollon77) Catch value encoding error and do not crash adapter (Sentry IOBROKER-MODBUS-1W)
* (Apollon77) add a meta object as instance object

### 3.2.2 (2020-12-15)
* (Apollon77) prevent a rash case (Sentry IOBROKER-MODBUS-1S)

### 3.2.1 (2020-12-12)
* (Apollon77) prevent a crash case (Sentry IOBROKER-MODBUS-1R)

### 3.2.0 (2020-12-09)
* (nkleber78) Fixed formula where return keyword was missing

### 3.1.13 (2020-12-07)
* (nkleber78) Added the possibility to use formulas for values

### 3.1.12 (2020-12-05)
* (Apollon77) fix admin serial port selection

### 3.1.10 (2020-09-25)
* (nkleber78) Corrected: the exported data cannot be imported without modification

### 3.1.9 (2020-09-17)
* (Apollon77) Prevent crash case (Sentry IOBROKER-MODBUS-1C)

### 3.1.7 (2020-07-23)
* (Apollon77) Fix some Sentry crash reports (IOBROKER-MODBUS-N)

### 3.1.6 (2020-07-06)
* (bluefox) Fix some Sentry crash reports (IOBROKER-MODBUS-J)

### 3.1.5 (2020-06-29)
* (Apollon77) Fix some Sentry crash reports (IOBROKER-MODBUS-F)

### 3.1.4 (2020-06-24)
* (Apollon77) Fix some Sentry crash reports (IOBROKER-MODBUS-4, IOBROKER-MODBUS-7, IOBROKER-MODBUS-6)
* (Apollon77) Change the way adapter restarts when reconnections do not help

### 3.1.3 (2020-06-12)
* (Apollon77) fix scheduled restart

### 3.1.2 (2020-06-12)
* (Apollon77) fix serialport list for Admin

### 3.1.1 (2020-06-11)
* (Apollon77) Add Sentry crash reporting when used with js-controller >=3.x

### 3.1.0 (2020-06-11)
* (Apollon77) Make sure that regular adapter stops do not terminate the process, so that scheduled restarts still work
* (Apollon77) update serialport, support nodejs 12/14

### 3.0.4 (2020-06-05)
* (bluefox) Added device ID by export/import
* (bluefox) Added the "write interval" parameter
* (bluefox) Added the disabling of write multiple registers

### 3.0.3 (2020-06-05)
* (bluefox) Corrected error after refactoring

### 3.0.2 (2020-06-01)
* (compton-git) Decodes 0xFF00 as coil ON

### 3.0.1 (2020-01-23)
* (BlackBird77) Fixes for Serial Timeouts done
* (bluefox) Refactoring

### 3.0.0 (2019-05-15)
* (Apollon77) Support for nodejs 12 added, nodejs 4 is no longer supported!

### 2.0.9 (2018-10-11)
* (Bjoern3003) Write registers was corrected

### 2.0.7 (2018-07-02)
* (bluefox) The server mode was fixed

### 2.0.6 (2018-06-26)
* (bluefox) rtu-tcp master mode was fixed

### 2.0.3 (2018-06-16)
* (bluefox) Fixed the rounding of numbers

### 2.0.2 (2018-06-12)
* (bluefox) The error with blocks reading was fixed
* (bluefox) The block reading for discrete values was implemented

### 2.0.1 (2018-05-06)
* (bluefox) Added the support of multiple device IDs

### 1.1.1 (2018-04-15)
* (Apollon77) Optimize reconnect handling

### 1.1.0 (2018-01-23)
* (bluefox) Little endian strings added
* (Apollon77) Upgrade Serialport Library

### 1.0.2 (2018-01-20)
* (bluefox) Fixed read of coils

### 0.5.4 (2017-09-27)
* (Apollon77) Several Fixes

### 0.5.0 (2017-02-11)
* (bluefox) Create all states each after other

### 0.4.10 (2017-02-10)
* (Apollon77) Do not recreate all data points on start of adapter
* (ykuendig) Multiple optimization and wording fixes

### 0.4.9 (2016-12-20)
* (bluefox) fix serial RTU

### 0.4.8 (2016-12-15)
* (Apollon77) update serialport library for node 6.x compatibility

### 0.4.7 (2016-11-27)
* (bluefox) Use old version of jsmodbus

### 0.4.6 (2016-11-08)
* (bluefox) backward compatibility with 0.3.x

### 0.4.5 (2016-10-25)
* (bluefox) better buffer handling on tcp and serial

### 0.4.4 (2016-10-21)
* (bluefox) Fix write of holding registers

### 0.4.1 (2016-10-19)
* (bluefox) Support of ModBus RTU over serial and over TCP (only slave)

### 0.3.11 (2016-08-18)
* (Apollon77) Fix wrong byte count in loop

### 0.3.10 (2016-02-01)
* (bluefox) fix lost of history settings.

### 0.3.9 (2015-11-09)
* (bluefox) Use always write_multiple_registers by write of holding registers.

### 0.3.7 (2015-11-02)
* (bluefox) add special read/write mode if "Max read request length" is 1.

### 0.3.6 (2015-11-01)
* (bluefox) add cyclic write for holding registers (fix)

### 0.3.5 (2015-10-31)
* (bluefox) add cyclic write for holding registers

### 0.3.4 (2015-10-28)
* (bluefox) add doubles and fix uint64

### 0.3.3 (2015-10-27)
* (bluefox) fix holding registers

### 0.3.2 (2015-10-27)
* (bluefox) fix import from text file

### 0.3.1 (2015-10-26)
* (bluefox) fix error with length of read block (master)
* (bluefox) support of read blocks and maximal length of read request (master)
* (bluefox) can define fields by import

### 0.3.0 (2015-10-24)
* (bluefox) add round settings
* (bluefox) add deviceID
* (bluefox) slave supports floats, integers and strings

### 0.2.6 (2015-10-22)
* (bluefox) add different types for inputRegisters and for holding registers ONLY FOR MASTER

### 0.2.5 (2015-10-20)
* (bluefox) fix names of objects if aliases used

### 0.2.4 (2015-10-19)
* (bluefox) fix error add new values

### 0.2.3 (2015-10-15)
* (bluefox) fix error with master

### 0.2.2 (2015-10-14)
* (bluefox) implement slave
* (bluefox) change addressing model

### 0.0.1
* (bluefox) initial commit

## License
The MIT License (MIT)

Copyright (c) 2015-2024 Bluefox <dogafox@gmail.com>

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