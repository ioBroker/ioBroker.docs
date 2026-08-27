---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.modbus/README.md
title: iobroker.modbus
hash: PbHW49eOEqaAyxf25EGWOgN9XjyDPCkKLXXndbtEQO8=
---
![标识](../../../en/adapterref/iobroker.modbus/admin/modbus.png)

![安装数量](http://iobroker.live/badges/modbus-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.modbus.svg)
![下载](https://img.shields.io/npm/dm/iobroker.modbus.svg)

# Iobroker.modbus
![测试与发布](https://github.com/ioBroker/iobroker.modbus/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/modbus/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用 Sentry 库自动向开发者报告异常和代码错误。** 更多详情以及如何禁用错误报告的信息，请参阅 [Sentry插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！Sentry 报告功能从 js-controller 3.0 开始使用。

ioBroker 的 ModBus 从站和主站实现。支持以下类型：

- Modbus RTU over serial（主站）
- Modbus RTU over TCP（主站）
- Modbus TCP（从站，主站）
- Modbus TCP with SSL/TLS（主站）

## SSL/TLS 支持
对于需要 SSL/TLS 加密的设备（例如端口 802 上的 Kostal KSEM 智能电表）的安全连接，您可以选择“TCP with SSL/TLS”作为连接类型。这将提供以下配置选项：

- **SSL证书文件路径**：PEM格式的SSL证书文件的路径
- **SSL 私钥文件路径**：PEM 格式的 SSL 私钥文件路径
- **SSL CA 证书文件路径**：PEM 格式的 CA 证书文件路径（可选）
- **拒绝未经授权的证书**：取消选中以允许自签名证书

注意：ioBroker 进程必须能够访问证书文件，并且证书文件必须采用 PEM 格式。

＃＃ 设置
### 合作伙伴 IP 地址
Modbus 合作伙伴的 IP 地址。

＃＃＃ 港口
如果配置为主站（客户端），则使用 Modbus 伙伴的 TCP 端口；如果配置为从站（服务器），则使用自己的端口。

### 设备 ID
Modbus 设备 ID。如果使用 TCP/Modbus 网桥，则此信息很重要。

＃＃＃ 类型
从属（服务器）或主（客户端）。

### 通过序列号选择设备
对于串行连接，您可以选择设备的寻址方式：

- **串口**：选择一个固定的端口路径（例如 `COM3` 或 `/dev/ttyUSB0`）。
- **USB 设备 ID**：通过设备稳定的 USB 标识符（厂商 ID/产品 ID/序列号）来选择设备。实际端口在启动时解析，因此即使操作系统分配了不同的端口名称（例如，重启或重新插拔后），连接也能继续工作。

### 使用别名作为地址
通常情况下，所有寄存器的地址范围都可以是 0 到 65535。通过使用别名，您可以为每种类型的寄存器定义虚拟地址字段。通常情况下：

- 离散输入值范围为 10001 到 20000
线圈数量从 1 到 1000 不等
输入寄存器的范围是 30001 到 40000
- 持有登记簿编号为 40001 至 60000

每个别名都会在内部映射到地址，例如，30011 将映射到输入寄存器 10，依此类推。

### 直接地址
用于二进制输入和线圈。

如果没有此标志，则位寻址方式为：`0 => 15, 1 => 14, 2 => 13, ..., 15 => 0`。

启用此标志后，位寻址方式为：`0 => 0, 1 => 1, 2 => 2, ..., 15 => 15`。

### 不要将地址对齐到 16 位（字）
通常情况下，线圈和离散输入地址按 16 位对齐。

例如，地址 3 到 20 将与 0 到 32 对齐。

如果启用此选项，地址将不会对齐。

### 请勿使用多个寄存器
如果从设备不支持“写入多个寄存器”命令，您可以激活该命令，以便在写入多个寄存器时收到警告。

### 仅使用多个写寄存器
如果从设备仅支持“写入多个寄存器”命令，您可以激活该命令，以便始终使用 FC15/FC16 命令写入寄存器。

### 四舍五入到
float 和 double 类型的数字小数点后保留几位？

### 数据轮询间隔
循环轮询间隔（仅适用于主节点）

### 重新连接延迟
重连间隔（仅与主节点相关）

### 读取超时
读取请求超时时间（以毫秒为单位）。如果此时未收到从设备的响应，连接将被终止。

### 脉冲时间
如果线圈使用脉冲，则以毫秒为单位定义脉冲的持续时间。

### 等待时间
两次轮询两个不同设备 ID 之间的等待时间（以毫秒为单位）。

### 最大读取请求长度
命令 READ_MULTIPLE_REGISTERS 的最大长度为要读取的寄存器数量。

某些系统要求先执行“写入请求”才能在执行“读取请求”时提供数据。

您可以通过将“最大读取请求长度”设置为 1 来强制执行此模式。

**注意：**某些 USB Modbus 解决方案（例如基于 `socat` 的解决方案）可能无法与 `serialport` npm 模块配合使用。

有一个软件 [**Modbus RTU <-> 基于 TCP 的 Modbus RTU**](http://mbus.sourceforge.net/index.html) 网关，用于启用通过 TCP 协议使用串行 RTU。

**RTU over TCP** 和 **TCP** 两种解决方案都运行良好。

### 读取间隔
两次读取请求之间的延迟时间（以毫秒为单位）。默认值为 0。

### 写入间隔
两次写入请求之间的延迟时间（以毫秒为单位）。默认值为 0。

### 更新未更改的状态
通常情况下，如果值没有改变，则不会将其写入 ioBroker。

此标志允许每个周期更新值的时间戳。

### 值清理
启用无效寄存器值（NaN、无穷大、极端浮点值，例如 ±3.4e38）的自动清理功能。

此功能有助于防止损坏的 Modbus 浮点值传播到 ioBroker 状态，这对于 SolarEdge 逆变器等偶尔因超时或内部缩放错误而返回无效值的设备尤其有用。

启用后，您可以配置每个寄存器的清理选项：

- **消毒**：启用此收银机的消毒功能
- **清理操作**：选择如何处理无效值
- *保留上次有效值*：检测到无效值时，保留上次已知的有效值。
- *替换为 0*：将无效值替换为 0。
- **最小有效值**：可选的最小有效值阈值
- **最大有效值**：可选的最大有效值阈值

检测到无效值：

- `NaN`（非数字）
- `Infinity` 或 `-Infinity`
- 极端浮点值（≥3.4e38 或 ≤-3.4e38）- 典型的 Modbus 错误值
- 超出配置的最小/最大范围的值

### 身份证件中请勿包含地址
不要在生成的 ioBroker iD 中添加地址。`10_Input10` 与 `_Input10`。

### 保留身份证上的点
使用此标志，名称将为 `Inputs.Input10`。不使用此标志则为 => `Inputs_Input10`。

## 配置中单个地址行的参数
＃＃＃ 地址
要读取的Modbus地址。

### 从属设备 ID
如果有多个从属节点，则此 ID 为全局配置中指定的默认 ID（如果不是）。

＃＃＃ 姓名
这是参数的名称。

＃＃＃ 描述
参数说明。

＃＃＃ 单元
参数的单位。

＃＃＃ 类型
要从总线读取的数据类型。有关可能的数据类型的详细信息，请参阅“数据类型”部分。

＃＃＃ 长度
参数长度。对于大多数参数，长度取决于数据类型；但对于字符串，长度以字节/字符为单位定义。

＃＃＃ 因素
该系数用于乘以从总线读取的值，以实现静态缩放。因此，计算如下所示 `val = x * Factor + Offset`。

＃＃＃ 抵消
在上述乘法运算之后，将此偏移量添加到读取的值中。因此，计算过程如下所示 `val = x * Factor + Offset`。

＃＃＃ 公式
如果“因子”和“偏移量”不足以进行高级计算，则可以使用此字段。**如果设置了此字段，则“因子”和“偏移量”字段将被忽略。**公式由 `eval()` 函数执行。因此，所有常用函数均受支持，尤其是数学函数。公式必须符合 JavaScript 语法，因此还要注意大小写。

公式中，“x”必须用于从Modbus读取的值。例如：`x * Math.pow(10, sf['40065'])`

使用“sf”数组（见上例），您可以访问其他读取的 modbus 值，如果它们在配置中被标记为“比例因子”（见下文关于“SF”标志的信息）。

如果在运行时无法计算公式，则适配器会将警告消息写入日志。

公式的另一个用途是防止出现不合理的数据，例如使用类似 `x > 2000000 ? null : x` 的公式。

＃＃＃ 角色
要分配的ioBroker角色。

＃＃＃ 房间
ioBroker 房间分配。

### 民意调查
如果启用，则会按预定义的时间间隔从从设备轮询这些值。

### WP
写入脉冲

### CW
循环写入

旧金山
使用值作为缩放因子。

某些系统通过接口值提供动态缩放因子时，必须使用此功能。

如果某个值被标记此标志，则该值将存储到一个变量中，命名约定如下：`sf['Modbus_address']`。

之后，该变量可用于其他参数的任何公式中。例如，以下公式可以设置：`(x * sf['40065']) + 50;`

### 消毒（专家模式）
启用此寄存器的值清理功能。仅当在适配器设置中全局启用“值清理”时才可用。

### 清理操作（专家模式）
选择检测到无效值时要执行的操作：

- **保留上次有效值**：保留上次已知的有效值
- **替换为 0**：将无效值替换为 0。

### 最短有效期/最长有效期（专家模式）
可选的最小值和最大值阈值，用于范围验证。超出此范围的值将被视为无效，并根据“清理操作”进行清理。

## 数据类型
- `uint16be` - `无符号 16 位（大端序）：AABB => AABB`
- `uint16le` - `无符号 16 位（小端）：AABB => BBAA`
- `int16be` - `有符号 16 位（大端序）：AABB => AABB`
- `int16le` - `有符号 16 位（小端）：AABB => BBAA`
- `uint32be` - `无符号 32 位（大端序）：AABBCCDD => AABBCCDD`
- `uint32le` - `无符号 32 位（小端序）：AABBCCDD => DDCCBBAA`
- `uint32sw` - `无符号 32 位（大端字节序字交换）：AABBCCDD => CCDDAABB`
- `uint32sb` - `无符号 32 位（大端字节序交换）：AABBCCDD => DDCCBBAA`
- `int32be` - `有符号 32 位（大端序）：AABBCCDD => AABBCCDD`
- `int32le` - `有符号 32 位（小端序）：ABBCCDD => DDCCBBAA`
- `int32sw` - `有符号 32 位（大端字节序字交换）：AABBCCDD => CCDDAABB`
- `int32sb` - `有符号 32 位（大端字节序交换）：AABBCCDD => DDCCBBAA`
- `uint64be` - `无符号 64 位（大端）：AABBCCDDEEFFGGHH => AABBCCDDEEFFGGHH`
- `uint64le` - `无符号 64 位（小端序）：AABBCCDDEEFFGGHH => HHGGFFEEDDCCBBAA`
- `uint8be` - `无符号 8 位（大端序）：AABB => BB`
- `uint8le` - `无符号 8 位（小端序）：AABB => AA`
- `int8be` - `有符号 8 位（大端序）：AABB => BB`
- `int8le` - `有符号 8 位（小端序）：AABB => AA`
- `floatbe` - `浮动（大端）：AABBCCDD => AABBCCDD`
- `floatle` - `浮点数（小端序）：AABBCCDD => DDCCBBAA`
- `floatsw` - `浮点数（大端字节序单词交换）：AABBCCDD => CCDDAABB`
- `floatsb` - `浮点数（大端字节序交换）：AABBCCDD => DDCCBBAA`
- `doublebe` - `双（大端）：AABBCCDDEEFFGGHH => AABBCCDDEEFFGGHH`
- `double` - `Double (Little Endian): AABBCCDDEEFFGGHH => HHGGFFEEDDCCBBAA`
- `字符串` - `8 位字符串（零端）：ABCDEF\0 => ABCDEF\0`
- `stringle` - `8 位字符串（小端序，零端）：ABCDEF\0 => BADCFE\0`
- `string16` - `字符串 16 位（零端）：\0A\0B\0C\0D\0E\0F\0\0 => ABCDEF\0`
- `string16le`- `16 位字符串（小端序，零端）：A\0B\0C\0D\0E\0F\0\0\0 => ABCDEF\0`
- `rawhex` - `以十六进制表示的字符串 AABBCCDD.... => AABBCCDD....`

以下描述摘自 [这里](http://www.chipkin.com/how-real-floating-point-and-32-bit-data-is-encoded-in-modbus-rtu-messages/)

点对点 Modbus 协议因其便捷性而成为 RTU 通信的热门选择。该协议本身控制着 Modbus 网络中每个设备的交互，包括设备如何建立已知地址、设备如何识别彼此的消息以及如何从数据中提取基本信息。本质上，该协议是整个 Modbus 网络的基础。

然而，这种便利并非没有代价，Modbus RTU 消息协议也不例外。

该协议本身是基于 16 位寄存器长度的设备设计的。

因此，在实现 32 位数据元素时需要特别考虑。

最终的实现方案是使用两个连续的 16 位寄存器来表示 32 位数据，也就是 4 个字节的数据。

单精度浮点数据正是通过这 4 个字节的数据编码成 Modbus RTU 消息的。

### 字节顺序的重要性
Modbus 本身并未定义浮点数据类型，但普遍认为它使用 IEEE-754 标准实现 32 位浮点数据。

然而，IEEE 标准并未明确定义数据有效载荷的字节顺序。

因此，处理 32 位数据时，最重要的考虑因素是确保数据寻址顺序正确。

例如，根据 IEEE 754 标准定义的单精度 32 位浮点数，数字 123/456.00 如下所示：

![图1](../../../en/adapterref/iobroker.modbus/img/img1.png)

不同的字节顺序会产生显著的影响。例如，将表示 123456.00 的 4 个字节的数据按 `B A D C` 序列排序，称为“字节交换”。当将其解释为 IEEE 744 浮点数据类型时，结果则截然不同：

![图2](../../../en/adapterref/iobroker.modbus/img/img2.png)

将相同字节按“C D A B”顺序排列称为“字交换”。同样，结果与原始值 123456.00 有很大不同：

![图3](../../../en/adapterref/iobroker.modbus/img/img3.png)

此外，`byte swap` 和 `word swap` 实际上都会完全反转字节顺序，从而产生另一个结果：

![图4](../../../en/adapterref/iobroker.modbus/img/img4.png)

显然，在使用 Modbus 等网络协议时，必须严格注意传输内存字节的顺序，也就是所谓的“字节顺序”。

### 确定字节顺序
根据 Modbus 应用协议规范 V1.1.b，Modbus 协议本身被声明为“大端”协议：

Modbus 使用“大端序”表示地址和数据项。

这意味着，当传输的数值大于单个字节时，会先发送最高有效字节。

大端序是网络协议中最常用的格式——事实上，它非常普遍，以至于它也被称为“网络序”。

鉴于 Modbus RTU 消息协议采用大端字节序，为了通过 Modbus RTU 消息成功交换 32 位数据类型，必须考虑主站和从站的字节序。许多 RTU 主站和从站设备允许指定字节序，尤其是在软件模拟设备的情况下。只需确保两个设备的字节序设置相同即可。

一般来说，设备微处理器的系列决定了其字节序。通常，采用大端字节序（高位字节先存储，低位字节后存储）的CPU常见于采用摩托罗拉处理器的CPU。而采用小端字节序（低位字节先存储，高位字节后存储）的CPU常见于采用英特尔架构的CPU。至于哪种字节序被认为是“反向的”，则取决于个人看法。

但是，如果字节顺序和字节序不是可配置选项，则必须确定如何解释字节。这可以通过向从设备请求一个已知的浮点值来实现。如果返回的值不可能，例如，指数为两位数的数字，则很可能需要修改字节顺序。

### 实用帮助
FieldServer Modbus RTU 驱动程序提供多种函数移动功能，可处理 32 位整数和 32 位浮点值。更重要的是，这些函数移动功能支持所有不同的字节顺序。下表列出了 FieldServer 中将两个相邻的 16 位寄存器值复制到 32 位整数值的函数移动功能。

| 功能关键字 | 交换模式 | 源字节 | 目标字节 |
|-------------------|--------------------|-----------------|--------------|
| 2.i16-1.i32 | 不适用 | [ a b ] [ c d ] | [ a b c d ] |
| 2.i16-1.i32-s | 字节和字交换 | [ a b ] [ c d ] | [ d c b a ] |
| 2.i16-1.i32-sb | 字节交换 | [ a b ] [ c d ] | [ b a d c ] |
| 2.i16-1.i32-sw | 单词交换 | [ a b ] [ c d ] | [ c d a b ] |

下表显示了 FieldServer 函数如何将两个相邻的 16 位寄存器复制到 32 位浮点值：

| 功能关键字 | 交换模式 | 源字节 | 目标字节 |
|-------------------|--------------------|-----------------|--------------|
| 2.i16-1.ifloat | 不适用 | [ a b ] [ c d ] | [ a b c d ] |
| 2.i16-1.ifloat-s | 字节和字交换 | [ a b ] [ c d ] | [ d c b a ] |
| 2.i16-1.ifloat-sb | 字节交换 | [ a b ] [ c d ] | [ b a d c ] |
| 2.i16-1.ifloat-sw | 单词交换 | [ a b ] [ c d ] | [ c d a b ] |

下表显示了 FieldServer 函数将单个 32 位浮点值复制到两个相邻的 16 位寄存器的操作：

| 功能关键字 | 交换模式 | 源字节 | 目标字节 |
|------------------|--------------------|-----------------|----------------|
| 1.float-2.i16 | 不适用 | [ a b ] [ c d ] | [ a b ][ c d ] |
| 1.float-2.i16-s | 字节和字交换 | [ a b ] [ c d ] | [ d c ][ b a ] |
| 1.float-2.i16-sb | 字节交换 | [ a b ] [ c d ] | [ b a ][ d c ] |
| 1.float-2.i16-sw | 单词交换 | [ a b ] [ c d ] | [ c d ][ a b ] |

鉴于 FieldServer 函数的各种操作方式，正确处理 32 位数据取决于选择合适的函数。请观察这些 FieldServer 函数操作对已知单精度十进制浮点值 123456.00 的处理情况：

| 16 位值 | 函数移动 | 结果 | 函数移动 | 结果 |
|---------------|------------------|-----------|------------------|---------------|
| 0x2000 0x47F1 | 2.i16-1.float | 123456.00 | 1.float-2.i16 | 0x2000 0x47F1 |
| 0xF147 0x0020 | 2.i16-1.float-s | 123456.00 | 1.float-2.i16-s | 0xF147 0X0020 |
| 0x0020 0xF147 | 2.i16-1.float-sb | 123456.00 | 1.float-2.i16-sb | 0x0020 0xF147 |
| 0x47F1 0x2000 | 2.i16-1.float-sw | 123456.00 | 1.float-2.i16-sw | 0x47F1 0x2000 |

请注意，不同的字节顺序和字顺序需要使用相应的 FieldServer 函数移动。选择正确的函数移动后，数据即可双向转换。

在互联网上众多十六进制到浮点数的转换器和计算器中，真正允许调整字节和字顺序的工具寥寥无几。

www.61131.com/download.htm 提供了一个这样的实用工具，用户可以从这里下载 Linux 和 Windows 版本。

安装完成后，该工具以可执行文件的形式运行，并带有一个对话框界面。

该工具将十进制浮点数 123456.00 表示如下：

![图5](../../../en/adapterref/iobroker.modbus/img/img5.png)

然后可以交换字节和/或字，以分析 Modbus RTU 主设备和从设备之间可能存在的字节序问题。

## 账簿的导出/导入
借助导出/导入功能，您可以将所有寄存器数据（仅限一种类型）转换为 TSV（制表符分隔值）文件，然后再转换回来，以便轻松地将数据从一个设备复制到另一个设备，或在 Excel 中编辑寄存器。

您可以在 [modbus模板，](https://github.com/ioBroker/modbus-templates) 中与其他用户共享您的模式，或者您可以在那里找到一些注册模式。

＃＃ 测试
文件夹 `test` 中有一些程序用于测试 TCP 通信：

- Ananas32/64 是一个从属模拟器（仅包含寄存器和输入，不包含线圈和数字输入）
- RMMS 是一个主模拟器
- mod_RSsim.exe 是一个从属模拟器。您可能需要 [Microsoft Visual C++ 2008 SP1 Redistributable Package](https://www.microsoft.com/en-us/download/details.aspx?id=5582) 才能启动它（因为存在并行错误）。

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (@GermanBluefox) Fixed repeated `Can not set value: The value of "offset" is out of range` errors when a device answers a combined read block with fewer registers than requested (issue #502, via `@iobroker/modbus`): the short response is now reported with a single clear warning and the values that were returned are still stored. Workaround without the update: set "Max address gap to combine" to 0
- (@GermanBluefox) Added Modbus/UDP support as a master (issue #222): select "UDP (Master)" as the connection type. Requires `@iobroker/modbus` >= 7.6.0
- (@GermanBluefox) The register table export/import dialog can now use CSV (`;`-separated, quoted) or JSON in addition to TSV, and the data can be saved to / loaded from a file (issue #249): pick the format in the dialog to mass-edit the data points in Excel or a text editor. Empty columns (e.g. an unused "name") are preserved, so a round-trip export→edit→import no longer breaks the format
- (@GermanBluefox) Register tables with many data points are now much faster to edit (issue #249): rows are virtualized (only the visible ones are rendered), and a new "freeze order" toolbar button keeps rows from re-sorting/jumping while you type
- (@GermanBluefox) When "Multi device IDs" is enabled, register tables can be shown as a tree grouped by slave/device ID with collapsible sections (issue #249): toggle it with the new "Group by device ID" toolbar button

### 8.3.0 (2026-07-03)
- (@GermanBluefox) Added a "Max address gap to combine" setting (issue #581): controls how large an address gap may be bridged when combining registers into one read request. Set it to 0 to read only contiguous configured registers, so devices that reject a non-existent register in a gap no longer fail the whole read (requires `@iobroker/modbus` >= 7.5.1)
- (@GermanBluefox) Added per-device timeout and wait time (issue #605): when "Multi device IDs" is enabled, the Connection tab shows a table of all device IDs used in the register tables, each with its own timeout and wait time (blank = global value)
- (@GermanBluefox) Added a proxy mode (issue #775): a master can additionally serve its polled data as a Modbus TCP slave. Enable it in the Connection tab (requires `@iobroker/modbus` >= 7.5.1)
- (@GermanBluefox) Fixed the TCP/SSL master not recovering after a communication loss (issue #594, via `@iobroker/modbus`): the receive buffer is now cleared and the socket recreated on every reconnect, so a frame cut off by the disconnect can no longer desync the parser and permanently break polling until an adapter restart
- (@GermanBluefox) Fixed cyclic write of non-polled holding registers in immediate-write mode `maxBlock < 2` (follow-up to issue #771, via `@iobroker/modbus`)
- (@GermanBluefox) Updated the `@iobroker/modbus` package: fixed `Put.floatle()` to write a valid IEEE-754 little-endian float and to stop dropping data written after it

### 8.2.2 (2026-07-01)
- (@johannes-lode) Fixed FC1 coil reads returning stale data: the slave now refreshes the coil buffer before responding (event name matched the listener)
- (@johannes-lode) Fixed the TCP slave crashing on server listen errors (e.g. address already in use or privileged port without permission); such errors are now logged instead
- (@johannes-lode) Fixed coil/discrete-input reads being written to the wrong buffer bit for start addresses other than 0
- (@johannes-lode) Fixed the coil/discrete-input buffer size when the highest address is a multiple of 8 (`ceil(addressHigh / 8)`)

### 8.2.1 (2026-06-27)
- (@GermanBluefox) Allowed the selection of port by USB path

### 8.2.0 (2026-05-29)
- (@GermanBluefox) Added selection of the serial device by its stable USB ID (vendor/product/serial), so the connection keeps working even if the OS reassigns the port name

### 8.1.3 (2026-04-13)
- (@GermanBluefox) Corrected room definition for the first register

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
The MIT License (MIT)

Copyright (c) 2015-2026 Bluefox <dogafox@gmail.com>

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