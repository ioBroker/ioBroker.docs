---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.openknx?style=flat-square
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.openknx?label=npm%20downloads&style=flat-square
BADGE-node-lts: https://img.shields.io/node/v-lts/iobroker.openknx?style=flat-square
BADGE-Libraries.io dependency status for latest release: https://img.shields.io/librariesio/release/npm/iobroker.openknx?label=npm%20dependencies&style=flat-square
BADGE-GitHub: https://img.shields.io/github/license/iobroker-community-adapters/iobroker.openknx?style=flat-square
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/iobroker-community-adapters/iobroker.openknx?logo=github&style=flat-square
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/iobroker.openknx?logo=github&style=flat-square
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/iobroker-community-adapters/iobroker.openknx?logo=github&style=flat-square
BADGE-GitHub issues: https://img.shields.io/github/issues/iobroker-community-adapters/iobroker.openknx?logo=github&style=flat-square
BADGE-GitHub Workflow Status: https://img.shields.io/github/actions/workflow/status/iobroker-community-adapters/iobroker.openknx/test-and-release.yml?branch=master&logo=github&style=flat-square
BADGE-Beta: https://img.shields.io/npm/v/iobroker.openknx.svg?color=red&label=beta
BADGE-Stable: http://iobroker.live/badges/openknx-stable.svg
BADGE-Installed: http://iobroker.live/badges/openknx-installed.svg
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.openknx/README.md
title: ioBroker.openknx
hash: OLamgqmbjWOnyXZ5LhZ+B2tG2TBAluQSOPqDv4tLvmc=
---
![标识](../../../en/admin/openknx.png)

# IoBroker.openknx
＃＃ 特征
- 支持本地导入 .knxproj 文件（ETS4、ETS5、ETS6），并提供密码支持
- 从 ETS ComObjects 读取/写入/传输/更新标志
- 当 GA 级 DPT 缺失时，从 ComObjects 推断 DPT
- 从 ETS 建筑结构中获取房间分配（枚举房间）
- XML 组地址导入作为备用方案
- 通过 .knxkeys 密钥文件或密码实现 KNX IP 安全隧道
- 由 KNXUltimate 提供支持的稳定可靠的 KNX 堆栈
- 对大多数DPT进行KNX数据报的自动编码/解码，对其他DPT进行原始读写操作。
- 支持 GroupValue 的读取、写入和响应
- 生成别名，将操作和状态 GA 合并到单个 ioBroker 对象中
- 直接链接：将任何 ioBroker 状态连接到 KNX 组地址
- 支持所有群组地址格式（3 级、2 级、自由格式）
- 免费开源，无云依赖，可离线运行

＃＃ 安装
在适配器列表中搜索“openknx”，然后点击“+”符号进行安装。

## 适配器配置
![设置](../../../en/adapterref/img/setting.png)

按“保存并关闭”或“保存”以重启适配器并应用更改。

- **检测** -- 扫描网络中所有可用的 KNX IP 网关。建议先选择本地网络接口，然后运行检测程序 -- 网关 IP 地址、端口和物理地址将自动填充。
- **本地 IPv4 网络接口** -- ioBroker 服务器能够连接到 KNX IP 网关的网络接口。请在运行检测前选择此项。
- **KNX网关IP地址** -- 您的KNX IP网关的IP地址。系统会自动检测并填充。
- **端口** -- 通常为 3671。通过检测自动填充。
- **协议** -- 连接到 KNX IP 网关的类型。**UDP 隧道** 是大多数 KNX IP 接口和路由器（例如 Weinzierl、MDT、ABB）的默认连接方式。**TCP 隧道** 提供更可靠的连接，并且受较新网关的支持——建议在可用时使用。**组播路由** 通过 KNXnet/IP 路由（组播组 224.0.23.12）连接，适用于充当线路耦合器的 KNX IP 路由器——不建立隧道连接，多个客户端可以同时访问。
- **物理 KNX 地址** -- 适配器在 KNX 总线上使用的独立地址（例如 1.1.250）。必须在 ETS 的 IP 接口中配置为附加地址，且不得被其他设备使用。
- **两帧之间的最小发送延迟 [毫秒]** -- 防止 KNX 总线因过快的报文而拥塞。如果在日志中看到 DISCONNECT_REQUEST 错误，请增加此值（例如，增加到 80-150 毫秒）。
- **对于 1 位枚举，请使用 common.type boolean 而不是数字** -- DPT-1（开关）在 ioBroker 中表示为布尔类型（true/false），而不是数字（0/1）。启用此功能可更好地兼容需要布尔值的 VIS 小部件和脚本。
- **启动时读取 KNX 值** -- 适配器启动后，首次连接时会从 KNX 总线读取所有带有自动读取标志的对象，以同步当前状态。
- **不针对未知的 KNX 组地址发出警告** -- 当收到适配器中未配置的 GA 的报文时，抑制警告日志条目。这在 GA 数量众多但适配器中仅使用其中一部分的安装环境中非常有用。
- **组地址样式** -- 定义与您的 ETS 配置相匹配的 GA 显示方式。支持所有 3 种样式，并转换为 3 级格式进行存储：3 级 (1/3/5)、2 级 (1/25) 或自由 (300)。GA 和组名称的组合在 ioBroker 对象树中必须是唯一的。

### 导入 ETS 项目（.knxproj 或 .xml）
导入对话框接受 **.knxproj**（推荐）和 **.xml** 文件。

#### .knxproj 导入（推荐）
直接导入ETS项目文件。这样可以提供最完整的数据：

1. 在 ETS 中，保存您的项目（文件 > 保存）。.knxproj 文件位于您的 ETS 项目目录中。
2. 如果项目受密码保护，请在导入按钮旁边的密码字段中输入项目密码。
3. 通过导入对话框将 .knxproj 文件上传到适配器中。
4. 导入立即开始，并根据文件大小显示进度估计。

与 XML 导入相比的优势：

- 从 ComObjects 获取**读取/写入/传输/更新标志**（而不是默认的 read=true，write=true）
- 当未向 GA 分配 DPT 时，从 ComObjects 推断 DPT。
- **房间分配** 来自 ETS 建筑/位置结构（自动创建 enum.rooms）
- **自动读取标志** 源自 ComObject ReadOnInit 标志
- 支持 ETS4、ETS5 和 ETS6 项目（包括受密码保护的项目）
- 未来的 ETS 版本将自动运行——无需更新适配器即可使用新的 ETS 补丁/小版本更新。

成功导入 .knxproj 文件后，使用下面的“创建别名”功能将状态 GA 与其对应的操作 GA 关联起来。

#### XML 导入（备用方案）
如果无法使用 .knxproj 文件，您可以将 ETS 中的组地址导出为 XML 文件：

![如何在ETS中将组地址导出为XML](../../../en/adapterref/img/exportGA.png)

1. 在 ETS 中，转到“组地址”，选择“导出组地址”，然后选择最新格式版本的 XML 导出。

不支持ETS4格式，它不包含DPT信息。

2. 通过导入对话框将 ETS 导出 XML 文件上传到适配器中。
3. 导入立即开始，完成后会给出状态报告。

提示：如果 GA 和使用该 GA 的通信对象具有不同的 DPT 子类型，ETS 将使用 DPT 编号最小的子类型。请确保所有元素都使用所需的数据类型。没有 DPT 基本类型的 GA 无法导入。ETS4 项目必须转换为 ETS5 或更高版本，并且 GA 必须设置 DPT。

#### 导入选项
- **不要覆盖现有的 IOB 对象** -- 导入时跳过现有的通信对象，只添加新的通信对象。
- **移除 ETS 导入文件中不存在的现有 IOB 对象** -- 从 ioBroker 树中删除 ETS 项目中不再存在的对象。这有助于在 ETS 中移除 GA 后进行清理。
- **导入前删除所有现有 KNX 对象（全新导入）** -- 先清除所有 KNX 对象，然后再全新导入。在重构 ETS 项目时请使用此功能。

### KNX 安全
![KNX 安全](../../../en/adapterref/img/knxsecure.png)

该适配器支持 KNX IP 安全隧道。配置请参见“KNX 安全”选项卡：

1. **启用 KNX Secure** -- 选中该复选框。
2. **密钥文件 (.knxkeys)** -- 将 .knxkeys 文件的内容粘贴到文本字段中。该文件在 ETS 中通过“附加功能”>“导出 KNX 密钥环”导出。
3. **密钥文件密码** -- 在 ETS 中导出密钥环时设置的密码。
4. **替代方案：隧道用户密码** -- 可以直接输入隧道密码（从 IP 接口的 ETS 项目配置中输入），而不是使用密钥文件。
5. **隧道接口 IA** -- （可选）指定隧道接口的单独地址（例如 1.1.254）。
6. **隧道用户 ID** -- 默认值为 2。仅当在同一接口上配置多个隧道连接时才更改。

### GA别名和迁移
![GA别名和迁移](../../../en/adapterref/img/alias.png)

在 KNX 系统中，动作和状态通常使用不同的 GA（全局属性）。此工具会自动将它们配对到 [ioBroker别名](https://www.iobroker.net/#en/documentation/dev/aliases.md) 中，从而在单个对象中实现读写操作。

该选项卡提供两个选项：

选项 A：别名（推荐）
创建 ioBroker 别名对象，将操作 GA（写入）和状态 GA（读取）合并为一个对象。

- **用于识别状态 GA 的正则表达式** -- 用于通过名称识别状态 GA 的正则表达式（例如，匹配“status”、“rm”、“Rückmeldung”等结尾）。此正则表达式同时用于别名生成（选项 A）和 KNX 兼容模式（选项 B）。
- **最小相似度** -- 匹配算法过滤相似条目的严格程度（0 = 宽松，1 = 完全一致）。
- **别名路径** -- 生成别名的对象文件夹（例如 `alias.0.KNX`）。
- **在搜索中包含组范围** -- 使用包含组名称的完整路径进行匹配，而不仅仅是 GA 名称。
- **生成别名** -- 此按钮用于启动别名生成。适配器必须正在运行。生成完成后，将显示生成的别名数量。

选项 B：knx 适配器迁移
对于从旧版 knx 适配器迁移的用户，希望现有的脚本、VIS 项目和仪表板无需更改即可继续工作。

- **ioBroker.knx 兼容模式** -- 将状态 GA 与操作 GA 在内部链接（类似于旧的 knx 适配器），而不是创建别名。使用与选项 A 相同的正则表达式。
- **目标命名空间** -- 设置为 `knx.0` 可重用旧的 knx 适配器对象路径，以便现有脚本、VIS 项目和仪表板无需更改即可继续工作。默认值为 `openknx.0`。

### GA 工具 / 直接链接
![GA 工具 / 直接链接](../../../en/adapterref/img/gatools.png)

直接连接将任何 ioBroker 状态（来自任何适配器）连接到 KNX 组地址。外部状态的更改会写入 KNX 总线，而从 KNX 接收到的值会转发回外部状态。

从左侧树状图中选择一个 GA。属性面板显示 GA 元数据（名称、地址、DPT、标志）。使用右侧的“直接链接”卡片链接外国州/省。

#### 链接模式
- **直接 (1:1)** -- 每个数值变化都会原封不动地转发到 KNX 总线。适用于传感器、调光器或滑块。
- **触发器（仅限 ON）** -- 仅转发真值（ON / true / 非零），忽略假值（OFF / false / 0）。适用于场景触发器或门开启器，其中源发送 ON/OFF（按下/释放）信号。
- **切换（KNX 指示灯开启时反转）** -- 对于每个真值，读取当前的 KNX 状态并发送其反转值。假值将被忽略。用于需要切换 KNX 指示灯开关状态的按钮。

＃＃＃＃ 临界点
发送到 KNX 总线前所需的最小更改量。如果输入值与当前 KNX 值之间的绝对差值小于阈值，则更新将被静默丢弃。这可以防止来自发送大量微小增量更改的源（例如模拟传感器）的总线泛洪。仅适用于数值。留空则发送所有更改。

#### 转换表达式
用于在写入 KNX 之前转换值的 JavaScript 表达式。变量 `value` 保存当前写入值。示例：

- `!!value` -- 将任何真值/假值转换为布尔值
- `value*100` -- 将 0-1 的浮点数缩放为 0-100 的百分比
- `value>0?100:0` -- 阈值转换为二进制
- `Math.round(value)` -- 对浮点数值进行四舍五入

转换表达式仅适用于从外部状态到 KNX 方向的转换。反向转换（KNX 到外部状态）则直接传递值，不进行转换。

## 从 KNX 适配器迁移
最简单的方法：在别名设置中将**目标命名空间**设置为`knx.0`。所有现有的脚本、VIS项目和仪表板都将自动使用openknx对象——无需手动查找/替换。

如果无法做到这一点，则必须在相应的工具（导出/导入 Node Red 流程、VIS 项目、脚本、Grafana 仪表板）中手动将对 `knx.0.` 的引用替换为 `openknx.0.`。

KNX总线概念
### 隧道连接中的 ACK 标志
应用程序不应设置 ack 标志。适配器会在数据确认后设置 ack 标志：

| GA 是 | 带有 R 标志的设备 | 不带 R 标志的设备 | 未连接 |
| --- | --- | --- | --- |
| 应用程序发送 GroupValue_Write | ack | ack | no ack |
| 应用程序发送 GroupValue_Read | 确认 | 无确认 | 无确认 |

### 组值写入
由向 ioBroker 中的通信对象写入数据触发。当总线上接收到写入帧时也会触发。

### 组值读取
可通过添加特殊注释或质量标记来触发：

```javascript
setState(myState, { val: false, ack: false, c: "GroupValue_Read" });
setState(myState, { val: false, ack: false, q: 0x10 });
```

注意：注释方法不适用于 JavaScript 适配器。请改用 `q: 0x10`。

### 组值响应
如果 `native.answer_groupValueResponse` 设置为 true，则适配器会以 GroupValue_Response 回复接收到的 GroupValue_Read 请求。总线上只能有一个对象设置此标志。

### 映射到 KNX 标志
使用 .knxproj 导入时，标志位直接从 ETS ComObjects 读取。使用 XML 导入时，会应用合理的默认值。

| 标志 | 适配器用法（.knxproj） | 适配器用法（XML 导入） |
| --- | --- | --- |
| C：通信 | 始终设置 | 始终设置 |
| R：读取 | 对象 common.read | 默认值为 true |
| T：传输 | 对象 common.update | 默认值 false |
| W: 写入 | 对象 common.write | 默认值为 true |
| U: 更新 | 对象 native.update | 默认值 false |
| I：初始化 | 对象 native.autoread | 派生自 DPT |

`native.answer_groupValueResponse` 如有需要，必须手动设置。

## IoBroker 对象描述
GA导入会生成一个遵循主组/中间组的文件夹结构。每个组地址都会成为一个对象：

```json
{
    "_id": "path.and.name.to.object",
    "type": "state",
    "common": {
        "desc": "Basetype: 1-bit value, Subtype: switch",
        "name": "Aussen Melder Licht schalten",
        "read": true,
        "role": "state",
        "type": "boolean",
        "unit": "",
        "write": true
    },
    "native": {
        "address": "0/1/2",
        "answer_groupValueResponse": false,
        "autoread": true,
        "bitlength": 1,
        "dpt": "DPT1.001",
        "encoding": { "0": "Off", "1": "On" },
        "force_encoding": "",
        "signedness": "",
        "valuetype": "basic"
    }
}
```

角色信息源自 DPT（例如，开关、级别、日期）。对于触发 DPT（例如场景编号），自动读取功能已设置为 false。

## DPT 参考
支持的 DPT 值：1-22、26、28、29、213、222、232、235、237、238、242、249、251、275。

不支持的 DPT 值将以十六进制字符串（原始数据）的形式写入。

| KNX DPT | 类型 | 描述 |
| --- | --- | --- |
| DPT-1 | 布尔值 | 1 位，假/真 |
| DPT-2 | 对象 | {"优先级":0/1, "数据":0/1} |
| DPT-3 | 对象 | {"decr_incr":0/1, "data":0..7} |
| DPT-4 | 字符串 | 单个 8 位字符 |
| DPT-5 | 数字 | 8 位无符号数 (0..255)；DPT-5.001：0..100%，DPT-5.003：0..360° |
| DPT-6 | 数字 | 8 位有符号数 (-128..127) |
| DPT-7 | 数字 | 16 位无符号 |
| DPT-8 | 数字 | 2 字节有符号数 (-32768..32767) |
| DPT-9 | 数字 | 2 字节浮点数 |
| DPT-10 | 日期 | 时间（时:分:秒 + 星期几），忽略日期部分 |
| DPT-11 | 日期 | 日期（日/月/年），忽略时间部分 |
| DPT-12 | 数字 | 4 字节无符号 |
| DPT-13 | 数字 | 4 字节有符号 |
| DPT-14 | 数字 | 4 字节浮点数 |
| DPT-15 | 数字 | 4 字节（访问数据） |
| DPT-16 | 字符串 | 14 个字符的 ASCII/ISO-8859-1 字符串 |
| DPT-17 | 编号 | 场景编号，自动读取功能无法读取 |
| DPT-18 | 对象 | {"save_recall":0/1, "scenenumber":0..63}，未被自动读取 |
| DPT-19 | 日期 | 日期+时间，不支持质量标志 |
| DPT-20 | 数字 | 1字节枚举 |
| DPT-21 | 对象 | {"outOfService":bool, "fault":bool, "overridden":bool, ...} |
| DPT-22 | 对象 | RHCC 状态 |
| DPT-26 | 字符串 | 十六进制，DPT_SceneInfo，无法通过自动读取 |
| DPT-28 | 字符串 | Unicode UTF-8 字符串，可变长度 |
| DPT-29 | 字符串 | 8 字节有符号字符串（由于 JavaScript 的数值限制） |
| DPT-213 | 对象 | 4 字节时间段（小时、分钟、秒） |
| DPT-222 | 对象 | 3x 2字节浮点数 |
| DPT-232 | 对象 | {红色:0..255, 绿色:0..255, 蓝色:0..255} |
| DPT-235 | 对象 | 电价有功电表 |
| DPT-237 | 对象 | DALI 诊断 |
| DPT-238 | 对象 | 场景配置，未通过自动读取功能读取 |
| DPT-242 | 对象 | xy 颜色（CIE 1931） |
| DPT-249 | 物体 | 色温转变 |
| DPT-251 | 对象 | RGBW 颜色 |
| DPT-275 | 对象 | 温度设定点偏移 |
| 其他 | 字符串 | 十六进制字符串（原始数据），例如“0102feff” |

关于日期/时间 DPT 的说明：JavaScript 和 KNX 的基本类型不同。DPT-10 返回一个 JS Date 对象，其中的日期部分必须忽略。DPT-11 返回一个 JS Date 对象，其中的时间部分必须忽略。

## Node-RED 示例
通过连接到 ioBroker 输出节点的函数节点，输入复杂数据类型 DPT-2：

```javascript
msg.payload = { priority: 1, data: 0 };
return msg;
```

## 日志级别
启用专家模式可在日志级别之间切换。默认级别为信息 (info)。

![日志级别](../../../en/adapterref/img/loglevel.png)

## 监控
Openknx 使用 sentry.io 进行错误跟踪（数据发送到位于德国的 ioBroker Sentry 服务器，已匿名化处理）。

总线负载估计在对象 `info.busload` 中进行。

## 局限性
仅支持 IPv4

＃＃ 常问问题
**自动读取会触发总线上的角色** 在 ETS 中检查连接到 GA 的组对象是否设置了 R/L 标志。信号的使用者不应设置此标志。如有必要，请禁用受影响对象的自动读取功能。

**启动时断开连接请求** 增加两帧之间的最小发送延迟。

**是否支持安全隧道？** 是的。KNX IP 安全隧道支持通过 .knxkeys 密钥文件或密码进行连接。

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.1.6 (2026-04-12)

- (TA2k) **breaking:** KNX communication switched to KNXUltimate
- (TA2k) **breaking:** DPT21 property names changed (outofservice → outOfService, inalarm → inAlarm, alarmeunack → alarmUnAck), values must be boolean
- (TA2k) **breaking:** DPT237 property names changed to camelCase
- (TA2k) feature: Native .knxproj import (ETS4/5/6, password-protected) with flags, DPT inference, room assignment
- (TA2k) feature: KNX Secure support
- (TA2k) feature: Extended DPT coverage and compatibility (9 additional DPTs, including DPT-22, 213, 222, 235, 242, 249, 251)
- (TA2k) feature: Improved connection stability
- (TA2k) feature: Improved role detection (switch, level, value, text, date) based on DPT type
- (TA2k) feature: Direct Link all iobroker states to a KNX state with a conversion mode
- (TA2k) feature: GA-Tools: all GA properties editable (DPT, type, role, flags) with compact layout

### 0.9.1 (2026-03-12)
- bugfix: Fixing increased delay in knx commands after several days
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (@klein0r) Adapter requires node.js >= 20 and js-controller >= 6 now

### 0.9.0 (2024-04-21)

- (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
- (mcm1957) Dependencies have been updated

### 0.8.0 (2024-03-30)

-   feature: put KNX interface name into log
-   bugfix: #419 wait for connection complete before data processing in case of receiving data before
-   bugfix: #457 Ack missing after changing IOB object value

### 0.7.3 (2024-03-05)

-   feature: one of the warnings is configurable in the dialog

### initial version

-   initial version from https://www.npmjs.com/package/iobroker.knx/v/0.8.3

## License

Copyright 2024 contributors to the ioBroker.openknx project

    				GNU GENERAL PUBLIC LICENSE

==========================  
Copyright Contributors to the ioBroker.openknx project

    				   Version 3, 29 June 2007


Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
Everyone is permitted to copy and distribute verbatim copies
of this license document, but changing it is not allowed.

    						Preamble

The GNU General Public License is a free, copyleft license for
software and other kinds of works.

The licenses for most software and other practical works are designed
to take away your freedom to share and change the works. By contrast,
the GNU General Public License is intended to guarantee your freedom to
share and change all versions of a program--to make sure it remains free
software for all its users. We, the Free Software Foundation, use the
GNU General Public License for most of our software; it applies also to
any other work released this way by its authors. You can apply it to
your programs, too.

When we speak of free software, we are referring to freedom, not
price. Our General Public Licenses are designed to make sure that you
have the freedom to distribute copies of free software (and charge for
them if you wish), that you receive source code or can get it if you
want it, that you can change the software or use pieces of it in new
free programs, and that you know you can do these things.

To protect your rights, we need to prevent others from denying you
these rights or asking you to surrender the rights. Therefore, you have
certain responsibilities if you distribute copies of the software, or if
you modify it: responsibilities to respect the freedom of others.

For example, if you distribute copies of such a program, whether
gratis or for a fee, you must pass on to the recipients the same
freedoms that you received. You must make sure that they, too, receive
or can get the source code. And you must show them these terms so they
know their rights.

Developers that use the GNU GPL protect your rights with two steps:
(1) assert copyright on the software, and (2) offer you this License
giving you legal permission to copy, distribute and/or modify it.

For the developers' and authors' protection, the GPL clearly explains
that there is no warranty for this free software. For both users' and
authors' sake, the GPL requires that modified versions be marked as
changed, so that their problems will not be attributed erroneously to
authors of previous versions.

Some devices are designed to deny users access to install or run
modified versions of the software inside them, although the manufacturer
can do so. This is fundamentally incompatible with the aim of
protecting users' freedom to change the software. The systematic
pattern of such abuse occurs in the area of products for individuals to
use, which is precisely where it is most unacceptable. Therefore, we
have designed this version of the GPL to prohibit the practice for those
products. If such problems arise substantially in other domains, we
stand ready to extend this provision to those domains in future versions
of the GPL, as needed to protect the freedom of users.

Finally, every program is threatened constantly by software patents.
States should not allow patents to restrict development and use of
software on general-purpose computers, but in those that do, we wish to
avoid the special danger that patents applied to a free program could
make it effectively proprietary. To prevent this, the GPL assures that
patents cannot be used to render the program non-free.

The precise terms and conditions for copying, distribution and
modification follow.

    				   TERMS AND CONDITIONS

0. Definitions.

"This License" refers to version 3 of the GNU General Public License.

"Copyright" also means copyright-like laws that apply to other kinds of
works, such as semiconductor masks.

"The Program" refers to any copyrightable work licensed under this
License. Each licensee is addressed as "you". "Licensees" and
"recipients" may be individuals or organizations.

To "modify" a work means to copy from or adapt all or part of the work
in a fashion requiring copyright permission, other than the making of an
exact copy. The resulting work is called a "modified version" of the
earlier work or a work "based on" the earlier work.

A "covered work" means either the unmodified Program or a work based
on the Program.

To "propagate" a work means to do anything with it that, without
permission, would make you directly or secondarily liable for
infringement under applicable copyright law, except executing it on a
computer or modifying a private copy. Propagation includes copying,
distribution (with or without modification), making available to the
public, and in some countries other activities as well.

To "convey" a work means any kind of propagation that enables other
parties to make or receive copies. Mere interaction with a user through
a computer network, with no transfer of a copy, is not conveying.

An interactive user interface displays "Appropriate Legal Notices"
to the extent that it includes a convenient and prominently visible
feature that (1) displays an appropriate copyright notice, and (2)
tells the user that there is no warranty for the work (except to the
extent that warranties are provided), that licensees may convey the
work under this License, and how to view a copy of this License. If
the interface presents a list of user commands or options, such as a
menu, a prominent item in the list meets this criterion.

1. Source Code.

The "source code" for a work means the preferred form of the work
for making modifications to it. "Object code" means any non-source
form of a work.

A "Standard Interface" means an interface that either is an official
standard defined by a recognized standards body, or, in the case of
interfaces specified for a particular programming language, one that
is widely used among developers working in that language.

The "System Libraries" of an executable work include anything, other
than the work as a whole, that (a) is included in the normal form of
packaging a Major Component, but which is not part of that Major
Component, and (b) serves only to enable use of the work with that
Major Component, or to implement a Standard Interface for which an
implementation is available to the public in source code form. A
"Major Component", in this context, means a major essential component
(kernel, window system, and so on) of the specific operating system
(if any) on which the executable work runs, or a compiler used to
produce the work, or an object code interpreter used to run it.

The "Corresponding Source" for a work in object code form means all
the source code needed to generate, install, and (for an executable
work) run the object code and to modify the work, including scripts to
control those activities. However, it does not include the work's
System Libraries, or general-purpose tools or generally available free
programs which are used unmodified in performing those activities but
which are not part of the work. For example, Corresponding Source
includes interface definition files associated with source files for
the work, and the source code for shared libraries and dynamically
linked subprograms that the work is specifically designed to require,
such as by intimate data communication or control flow between those
subprograms and other parts of the work.

The Corresponding Source need not include anything that users
can regenerate automatically from other parts of the Corresponding
Source.

The Corresponding Source for a work in source code form is that
same work.

2. Basic Permissions.

All rights granted under this License are granted for the term of
copyright on the Program, and are irrevocable provided the stated
conditions are met. This License explicitly affirms your unlimited
permission to run the unmodified Program. The output from running a
covered work is covered by this License only if the output, given its
content, constitutes a covered work. This License acknowledges your
rights of fair use or other equivalent, as provided by copyright law.

You may make, run and propagate covered works that you do not
convey, without conditions so long as your license otherwise remains
in force. You may convey covered works to others for the sole purpose
of having them make modifications exclusively for you, or provide you
with facilities for running those works, provided that you comply with
the terms of this License in conveying all material for which you do
not control copyright. Those thus making or running the covered works
for you must do so exclusively on your behalf, under your direction
and control, on terms that prohibit them from making any copies of
your copyrighted material outside their relationship with you.

Conveying under any other circumstances is permitted solely under
the conditions stated below. Sublicensing is not allowed; section 10
makes it unnecessary.

3. Protecting Users' Legal Rights From Anti-Circumvention Law.

No covered work shall be deemed part of an effective technological
measure under any applicable law fulfilling obligations under article
11 of the WIPO copyright treaty adopted on 20 December 1996, or
similar laws prohibiting or restricting circumvention of such
measures.

When you convey a covered work, you waive any legal power to forbid
circumvention of technological measures to the extent such circumvention
is effected by exercising rights under this License with respect to
the covered work, and you disclaim any intention to limit operation or
modification of the work as a means of enforcing, against the work's
users, your or third parties' legal rights to forbid circumvention of
technological measures.

4. Conveying Verbatim Copies.

You may convey verbatim copies of the Program's source code as you
receive it, in any medium, provided that you conspicuously and
appropriately publish on each copy an appropriate copyright notice;
keep intact all notices stating that this License and any
non-permissive terms added in accord with section 7 apply to the code;
keep intact all notices of the absence of any warranty; and give all
recipients a copy of this License along with the Program.

You may charge any price or no price for each copy that you convey,
and you may offer support or warranty protection for a fee.

5. Conveying Modified Source Versions.

You may convey a work based on the Program, or the modifications to
produce it from the Program, in the form of source code under the
terms of section 4, provided that you also meet all of these conditions:

    a) The work must carry prominent notices stating that you modified
    it, and giving a relevant date.

    b) The work must carry prominent notices stating that it is
    released under this License and any conditions added under section
    7.  This requirement modifies the requirement in section 4 to
    "keep intact all notices".

    c) You must license the entire work, as a whole, under this
    License to anyone who comes into possession of a copy.  This
    License will therefore apply, along with any applicable section 7
    additional terms, to the whole of the work, and all its parts,
    regardless of how they are packaged.  This License gives no
    permission to license the work in any other way, but it does not
    invalidate such permission if you have separately received it.

    d) If the work has interactive user interfaces, each must display
    Appropriate Legal Notices; however, if the Program has interactive
    interfaces that do not display Appropriate Legal Notices, your
    work need not make them do so.

A compilation of a covered work with other separate and independent
works, which are not by their nature extensions of the covered work,
and which are not combined with it such as to form a larger program,
in or on a volume of a storage or distribution medium, is called an
"aggregate" if the compilation and its resulting copyright are not
used to limit the access or legal rights of the compilation's users
beyond what the individual works permit. Inclusion of a covered work
in an aggregate does not cause this License to apply to the other
parts of the aggregate.

6. Conveying Non-Source Forms.

You may convey a covered work in object code form under the terms
of sections 4 and 5, provided that you also convey the
machine-readable Corresponding Source under the terms of this License,
in one of these ways:

    a) Convey the object code in, or embodied in, a physical product
    (including a physical distribution medium), accompanied by the
    Corresponding Source fixed on a durable physical medium
    customarily used for software interchange.

    b) Convey the object code in, or embodied in, a physical product
    (including a physical distribution medium), accompanied by a
    written offer, valid for at least three years and valid for as
    long as you offer spare parts or customer support for that product
    model, to give anyone who possesses the object code either (1) a
    copy of the Corresponding Source for all the software in the
    product that is covered by this License, on a durable physical
    medium customarily used for software interchange, for a price no
    more than your reasonable cost of physically performing this
    conveying of source, or (2) access to copy the
    Corresponding Source from a network server at no charge.

    c) Convey individual copies of the object code with a copy of the
    written offer to provide the Corresponding Source.  This
    alternative is allowed only occasionally and noncommercially, and
    only if you received the object code with such an offer, in accord
    with subsection 6b.

    d) Convey the object code by offering access from a designated
    place (gratis or for a charge), and offer equivalent access to the
    Corresponding Source in the same way through the same place at no
    further charge.  You need not require recipients to copy the
    Corresponding Source along with the object code.  If the place to
    copy the object code is a network server, the Corresponding Source
    may be on a different server (operated by you or a third party)
    that supports equivalent copying facilities, provided you maintain
    clear directions next to the object code saying where to find the
    Corresponding Source.  Regardless of what server hosts the
    Corresponding Source, you remain obligated to ensure that it is
    available for as long as needed to satisfy these requirements.

    e) Convey the object code using peer-to-peer transmission, provided
    you inform other peers where the object code and Corresponding
    Source of the work are being offered to the general public at no
    charge under subsection 6d.

A separable portion of the object code, whose source code is excluded
from the Corresponding Source as a System Library, need not be
included in conveying the object code work.

A "User Product" is either (1) a "consumer product", which means any
tangible personal property which is normally used for personal, family,
or household purposes, or (2) anything designed or sold for incorporation
into a dwelling. In determining whether a product is a consumer product,
doubtful cases shall be resolved in favor of coverage. For a particular
product received by a particular user, "normally used" refers to a
typical or common use of that class of product, regardless of the status
of the particular user or of the way in which the particular user
actually uses, or expects or is expected to use, the product. A product
is a consumer product regardless of whether the product has substantial
commercial, industrial or non-consumer uses, unless such uses represent
the only significant mode of use of the product.

"Installation Information" for a User Product means any methods,
procedures, authorization keys, or other information required to install
and execute modified versions of a covered work in that User Product from
a modified version of its Corresponding Source. The information must
suffice to ensure that the continued functioning of the modified object
code is in no case prevented or interfered with solely because
modification has been made.

If you convey an object code work under this section in, or with, or
specifically for use in, a User Product, and the conveying occurs as
part of a transaction in which the right of possession and use of the
User Product is transferred to the recipient in perpetuity or for a
fixed term (regardless of how the transaction is characterized), the
Corresponding Source conveyed under this section must be accompanied
by the Installation Information. But this requirement does not apply
if neither you nor any third party retains the ability to install
modified object code on the User Product (for example, the work has
been installed in ROM).

The requirement to provide Installation Information does not include a
requirement to continue to provide support service, warranty, or updates
for a work that has been modified or installed by the recipient, or for
the User Product in which it has been modified or installed. Access to a
network may be denied when the modification itself materially and
adversely affects the operation of the network or violates the rules and
protocols for communication across the network.

Corresponding Source conveyed, and Installation Information provided,
in accord with this section must be in a format that is publicly
documented (and with an implementation available to the public in
source code form), and must require no special password or key for
unpacking, reading or copying.

7. Additional Terms.

"Additional permissions" are terms that supplement the terms of this
License by making exceptions from one or more of its conditions.
Additional permissions that are applicable to the entire Program shall
be treated as though they were included in this License, to the extent
that they are valid under applicable law. If additional permissions
apply only to part of the Program, that part may be used separately
under those permissions, but the entire Program remains governed by
this License without regard to the additional permissions.

When you convey a copy of a covered work, you may at your option
remove any additional permissions from that copy, or from any part of
it. (Additional permissions may be written to require their own
removal in certain cases when you modify the work.) You may place
additional permissions on material, added by you to a covered work,
for which you have or can give appropriate copyright permission.

Notwithstanding any other provision of this License, for material you
add to a covered work, you may (if authorized by the copyright holders of
that material) supplement the terms of this License with terms:

    a) Disclaiming warranty or limiting liability differently from the
    terms of sections 15 and 16 of this License; or

    b) Requiring preservation of specified reasonable legal notices or
    author attributions in that material or in the Appropriate Legal
    Notices displayed by works containing it; or

    c) Prohibiting misrepresentation of the origin of that material, or
    requiring that modified versions of such material be marked in
    reasonable ways as different from the original version; or

    d) Limiting the use for publicity purposes of names of licensors or
    authors of the material; or

    e) Declining to grant rights under trademark law for use of some
    trade names, trademarks, or service marks; or

    f) Requiring indemnification of licensors and authors of that
    material by anyone who conveys the material (or modified versions of
    it) with contractual assumptions of liability to the recipient, for
    any liability that these contractual assumptions directly impose on
    those licensors and authors.

All other non-permissive additional terms are considered "further
restrictions" within the meaning of section 10. If the Program as you
received it, or any part of it, contains a notice stating that it is
governed by this License along with a term that is a further
restriction, you may remove that term. If a license document contains
a further restriction but permits relicensing or conveying under this
License, you may add to a covered work material governed by the terms
of that license document, provided that the further restriction does
not survive such relicensing or conveying.

If you add terms to a covered work in accord with this section, you
must place, in the relevant source files, a statement of the
additional terms that apply to those files, or a notice indicating
where to find the applicable terms.

Additional terms, permissive or non-permissive, may be stated in the
form of a separately written license, or stated as exceptions;
the above requirements apply either way.

8. Termination.

You may not propagate or modify a covered work except as expressly
provided under this License. Any attempt otherwise to propagate or
modify it is void, and will automatically terminate your rights under
this License (including any patent licenses granted under the third
paragraph of section 11).

However, if you cease all violation of this License, then your
license from a particular copyright holder is reinstated (a)
provisionally, unless and until the copyright holder explicitly and
finally terminates your license, and (b) permanently, if the copyright
holder fails to notify you of the violation by some reasonable means
prior to 60 days after the cessation.

Moreover, your license from a particular copyright holder is
reinstated permanently if the copyright holder notifies you of the
violation by some reasonable means, this is the first time you have
received notice of violation of this License (for any work) from that
copyright holder, and you cure the violation prior to 30 days after
your receipt of the notice.

Termination of your rights under this section does not terminate the
licenses of parties who have received copies or rights from you under
this License. If your rights have been terminated and not permanently
reinstated, you do not qualify to receive new licenses for the same
material under section 10.

9. Acceptance Not Required for Having Copies.

You are not required to accept this License in order to receive or
run a copy of the Program. Ancillary propagation of a covered work
occurring solely as a consequence of using peer-to-peer transmission
to receive a copy likewise does not require acceptance. However,
nothing other than this License grants you permission to propagate or
modify any covered work. These actions infringe copyright if you do
not accept this License. Therefore, by modifying or propagating a
covered work, you indicate your acceptance of this License to do so.

10. Automatic Licensing of Downstream Recipients.

Each time you convey a covered work, the recipient automatically
receives a license from the original licensors, to run, modify and
propagate that work, subject to this License. You are not responsible
for enforcing compliance by third parties with this License.

An "entity transaction" is a transaction transferring control of an
organization, or substantially all assets of one, or subdividing an
organization, or merging organizations. If propagation of a covered
work results from an entity transaction, each party to that
transaction who receives a copy of the work also receives whatever
licenses to the work the party's predecessor in interest had or could
give under the previous paragraph, plus a right to possession of the
Corresponding Source of the work from the predecessor in interest, if
the predecessor has it or can get it with reasonable efforts.

You may not impose any further restrictions on the exercise of the
rights granted or affirmed under this License. For example, you may
not impose a license fee, royalty, or other charge for exercise of
rights granted under this License, and you may not initiate litigation
(including a cross-claim or counterclaim in a lawsuit) alleging that
any patent claim is infringed by making, using, selling, offering for
sale, or importing the Program or any portion of it.

11. Patents.

A "contributor" is a copyright holder who authorizes use under this
License of the Program or a work on which the Program is based. The
work thus licensed is called the contributor's "contributor version".

A contributor's "essential patent claims" are all patent claims
owned or controlled by the contributor, whether already acquired or
hereafter acquired, that would be infringed by some manner, permitted
by this License, of making, using, or selling its contributor version,
but do not include claims that would be infringed only as a
consequence of further modification of the contributor version. For
purposes of this definition, "control" includes the right to grant
patent sublicenses in a manner consistent with the requirements of
this License.

Each contributor grants you a non-exclusive, worldwide, royalty-free
patent license under the contributor's essential patent claims, to
make, use, sell, offer for sale, import and otherwise run, modify and
propagate the contents of its contributor version.

In the following three paragraphs, a "patent license" is any express
agreement or commitment, however denominated, not to enforce a patent
(such as an express permission to practice a patent or covenant not to
sue for patent infringement). To "grant" such a patent license to a
party means to make such an agreement or commitment not to enforce a
patent against the party.

If you convey a covered work, knowingly relying on a patent license,
and the Corresponding Source of the work is not available for anyone
to copy, free of charge and under the terms of this License, through a
publicly available network server or other readily accessible means,
then you must either (1) cause the Corresponding Source to be so
available, or (2) arrange to deprive yourself of the benefit of the
patent license for this particular work, or (3) arrange, in a manner
consistent with the requirements of this License, to extend the patent
license to downstream recipients. "Knowingly relying" means you have
actual knowledge that, but for the patent license, your conveying the
covered work in a country, or your recipient's use of the covered work
in a country, would infringe one or more identifiable patents in that
country that you have reason to believe are valid.

If, pursuant to or in connection with a single transaction or
arrangement, you convey, or propagate by procuring conveyance of, a
covered work, and grant a patent license to some of the parties
receiving the covered work authorizing them to use, propagate, modify
or convey a specific copy of the covered work, then the patent license
you grant is automatically extended to all recipients of the covered
work and works based on it.

A patent license is "discriminatory" if it does not include within
the scope of its coverage, prohibits the exercise of, or is
conditioned on the non-exercise of one or more of the rights that are
specifically granted under this License. You may not convey a covered
work if you are a party to an arrangement with a third party that is
in the business of distributing software, under which you make payment
to the third party based on the extent of your activity of conveying
the work, and under which the third party grants, to any of the
parties who would receive the covered work from you, a discriminatory
patent license (a) in connection with copies of the covered work
conveyed by you (or copies made from those copies), or (b) primarily
for and in connection with specific products or compilations that
contain the covered work, unless you entered into that arrangement,
or that patent license was granted, prior to 28 March 2007.

Nothing in this License shall be construed as excluding or limiting
any implied license or other defenses to infringement that may
otherwise be available to you under applicable patent law.

12. No Surrender of Others' Freedom.

If conditions are imposed on you (whether by court order, agreement or
otherwise) that contradict the conditions of this License, they do not
excuse you from the conditions of this License. If you cannot convey a
covered work so as to satisfy simultaneously your obligations under this
License and any other pertinent obligations, then as a consequence you may
not convey it at all. For example, if you agree to terms that obligate you
to collect a royalty for further conveying from those to whom you convey
the Program, the only way you could satisfy both those terms and this
License would be to refrain entirely from conveying the Program.

13. Use with the GNU Affero General Public License.

Notwithstanding any other provision of this License, you have
permission to link or combine any covered work with a work licensed
under version 3 of the GNU Affero General Public License into a single
combined work, and to convey the resulting work. The terms of this
License will continue to apply to the part which is the covered work,
but the special requirements of the GNU Affero General Public License,
section 13, concerning interaction through a network will apply to the
combination as such.

14. Revised Versions of this License.

The Free Software Foundation may publish revised and/or new versions of
the GNU General Public License from time to time. Such new versions will
be similar in spirit to the present version, but may differ in detail to
address new problems or concerns.

Each version is given a distinguishing version number. If the
Program specifies that a certain numbered version of the GNU General
Public License "or any later version" applies to it, you have the
option of following the terms and conditions either of that numbered
version or of any later version published by the Free Software
Foundation. If the Program does not specify a version number of the
GNU General Public License, you may choose any version ever published
by the Free Software Foundation.

If the Program specifies that a proxy can decide which future
versions of the GNU General Public License can be used, that proxy's
public statement of acceptance of a version permanently authorizes you
to choose that version for the Program.

Later license versions may give you additional or different
permissions. However, no additional obligations are imposed on any
author or copyright holder as a result of your choosing to follow a
later version.

15. Disclaimer of Warranty.

THERE IS NO WARRANTY FOR THE PROGRAM, TO THE EXTENT PERMITTED BY
APPLICABLE LAW. EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT
HOLDERS AND/OR OTHER PARTIES PROVIDE THE PROGRAM "AS IS" WITHOUT WARRANTY
OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO,
THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM
IS WITH YOU. SHOULD THE PROGRAM PROVE DEFECTIVE, YOU ASSUME THE COST OF
ALL NECESSARY SERVICING, REPAIR OR CORRECTION.

16. Limitation of Liability.

IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING
WILL ANY COPYRIGHT HOLDER, OR ANY OTHER PARTY WHO MODIFIES AND/OR CONVEYS
THE PROGRAM AS PERMITTED ABOVE, BE LIABLE TO YOU FOR DAMAGES, INCLUDING ANY
GENERAL, SPECIAL, INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE
USE OR INABILITY TO USE THE PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF
DATA OR DATA BEING RENDERED INACCURATE OR LOSSES SUSTAINED BY YOU OR THIRD
PARTIES OR A FAILURE OF THE PROGRAM TO OPERATE WITH ANY OTHER PROGRAMS),
EVEN IF SUCH HOLDER OR OTHER PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF
SUCH DAMAGES.

17. Interpretation of Sections 15 and 16.

If the disclaimer of warranty and limitation of liability provided
above cannot be given local legal effect according to their terms,
reviewing courts shall apply local law that most closely approximates
an absolute waiver of all civil liability in connection with the
Program, unless a warranty or assumption of liability accompanies a
copy of the Program in return for a fee.

    				 END OF TERMS AND CONDITIONS

    		How to Apply These Terms to Your New Programs

If you develop a new program, and you want it to be of the greatest
possible use to the public, the best way to achieve this is to make it
free software which everyone can redistribute and change under these terms.

To do so, attach the following notices to the program. It is safest
to attach them to the start of each source file to most effectively
state the exclusion of warranty; and each file should have at least
the "copyright" line and a pointer to where the full notice is found.

    <one line to give the program's name and a brief idea of what it does.>
    Copyright (C) <year>  <name of author>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.

Also add information on how to contact you by electronic and paper mail.

If the program does terminal interaction, make it output a short
notice like this when it starts in an interactive mode:

    <program>  Copyright (C) <year>  <name of author>
    This program comes with ABSOLUTELY NO WARRANTY; for details type `show w'.
    This is free software, and you are welcome to redistribute it
    under certain conditions; type `show c' for details.

The hypothetical commands `show w' and `show c' should show the appropriate
parts of the General Public License. Of course, your program's commands
might be different; for a GUI interface, you would use an "about box".

You should also get your employer (if you work as a programmer) or school,
if any, to sign a "copyright disclaimer" for the program, if necessary.
For more information on this, and how to apply and follow the GNU GPL, see
<https://www.gnu.org/licenses/>.

The GNU General Public License does not permit incorporating your program
into proprietary programs. If your program is a subroutine library, you
may consider it more useful to permit linking proprietary applications with
the library. If this is what you want to do, use the GNU Lesser General
Public License instead of this License. But first, please read
<https://www.gnu.org/licenses/why-not-lgpl.html>.