---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.eebus-go/README.md
title: ioBroker.eebus-go
hash: 1yrporfEO17FPTwA2KoQpV/nbNK/8ayypId/iWmRbDo=
---
![标识](../../../en/adapterref/iobroker.eebus-go/admin/eebus-go.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.eebus-go.svg)
![下载](https://img.shields.io/npm/dm/iobroker.eebus-go.svg)
![安装数量](https://iobroker.live/badges/eebus-go-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/eebus-go-stable.svg)
![NPM](https://nodei.co/npm/iobroker.eebus-go.png?downloads=true)

# IoBroker.eebus-go
**测试：** ![测试与发布](https://github.com/FernetMenta/ioBroker.eebus-go/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 eebus-go 适配器
此适配器使 iobroker 能够根据德国能源法 (EnWG) 第 14a 条和电力法 (EEG) 第 9 条的规定，成为自定义能源管理器。德国能源法第 14a 条规定，如果可控系统（例如壁挂式电表箱或热泵）的耗电量超过 4.2kW，则必须具备调光功能。电力法第 9 条规定，电网运营商可以限制发电系统（例如光伏逆变器）的用电量。

这些法规由运行在智能电表网关上或连接到智能电表网关的控制盒来执行。控制盒会将限电事件直接发送给可控系统或自定义能源管理器。使用 iobroker 作为自定义能源管理器具有以下优势：

如果您拥有多个可控系统，例如壁挂式电源箱和热泵，您可以根据自身需求将有限的功率分配给各个设备。对于两个可控设备，在限时期间的合同最大功率为 Pdim = 4.2 kW + (CS – 1) x SF x 4.2 kW。两个可控系统的并发系数 SF 为 0.8。这意味着，例如，如果您在调光期间关闭热泵，则可以为您的汽车提供 7.56kW 的功率。
控制盒通过 EEBUS 协议进行通信。如果您的可控设备不支持此协议，此适配器可以通过其他方式进行管理，例如通过用户脚本切换继电器。

该适配器支持两种 EEBUS 应用场景：

- **LPC**（功耗限制）— 限制设备可以消耗的功耗（§14a EnWG）
- **LPP**（发电量限制）— 限制发电装置（例如光伏逆变器、电池储能装置）可以输入的电量（§9 EEG）

这两个用例都可以在“基本配置”选项卡中独立启用。每个用例都有自己的状态机、能量保护配置和ioBroker对象树。

您至少应该对 EEBus 用例有基本的了解：EEBus UC TS - 功耗限制和 EEBus UC TS - 发电限制。规范可在 [eebus.org](https://www.eebus.org/) 下载。

### 层叠星座
该适配器既作为电网运营商控制箱的可控系统 (CS)，又作为下游设备的能量保护器 (EG)。这使得能够实现消费 (LPC) 和生产 (LPP) 的级联限值分配，具体描述请参见相应的 EEBUS 用例规范：

<img src="doc/images/cascading-constellations.svg" alt="层叠星座" width="700">

### 故障安全
EEBUS规范要求可控系统具有故障安全状态，在该状态下，系统仅消耗（LPC）或产生（LPP）不超过4.2kW的功率。如果设备与自定义能量管理器或控制盒失去通信，则会进入此故障安全状态。双向心跳信号用于验证通信是否正常。

如果您使用此适配器控制非 EEBUS 设备（例如墙装式电源盒），则应确保该墙装式电源盒仅在 iobroker 无法控制的情况下才能使用故障保护电源。如果您有多个可控系统，请确保所有故障保护电源的总和小于或等于合同规定的最大功率（见上文）。这同样适用于通过 LPP 管理的生产设备。

### 可控系统状态机
该适配器实现了 EEBus UC TS §2.3.2 中定义的 LPC（功率消耗限制）和 LPP（功率生产限制）的独立状态机。这两个状态机共享相同的状态和转换，但独立运行：

<img src="doc/images/lpc-state-machine.svg" alt="LPC/LPP 状态机" width="700">

| 状态 | 描述 |
| ----------------------- | ------------------------------------------------------------------------------------------------ |
| **初始化** | CS 在（重新）启动后从此处开始。受故障保护功率限制。等待 120 秒以获取第一个心跳信号。 |
| **无限控制** | CS不受限制，但受能量守护控制。心跳已激活。 |
| **受限** | CS处于受限状态，受能量防护控制。有功率限制。 |
| **安全模式** | CS 不受能量防护控制。受安全模式限制。计时器正在运行。 |
| **无限自主运行** | CS 不受限制。运行方式如同不存在任何外部限制。控制盒已断开连接。 |

＃＃＃ 建筑学
有关完整的系统概述，请参阅 [架构图](doc/architecture-scenario.md)。

＃＃＃ 设置
此适配器使用 enbility 的开源 EEBUS 实现，参见 https://enbility.net/。该实现是用 Go 编写的，因此无法直接集成到 iobroker 适配器中。幸运的是，enbility 提供了一个带有 gRPC 服务器的组件。为了简化操作并提高兼容性，此适配器的作者将此组件以 Docker 容器的形式提供。请遵循此 [设置说明](doc/setup.md)。

＃＃＃ 配置
在管理界面的“基础配置”选项卡中配置与 gRPC 服务器的连接并保存配置。如果适配器可以连接到 gRPC 服务器，则会在该选项卡的表格中显示已发现的 EEBUS 设备列表。序列号可以随意设置，它是您的自定义能量管理器的序列号，可通过控制盒查看。与控制盒配对后请勿更改。默认的心跳超时时间为 30 秒，适用于大多数（如果不是所有）情况。

#### 用例激活
在“基本配置”选项卡中，您可以分别启用或禁用 LPC 和 LPP 用例：

- **启用 LPC**（默认：开启）— 启用功率消耗限制。输入您从能源供应商处获得的合同约定的最大功率消耗量。
- **启用 LPP**（默认：关闭）— 激活功率输出限制。输入合同规定的最大发电功率（例如，您的光伏系统的额定功率）。

如果控制盒连接到同一子网，它应该会出现在已发现设备列表中。选择它并保存配置。此适配器的 SKI 是在 gRPC 容器首次启动时生成的，并编码在右上角显示的二维码中。将控制盒与此自定义能源管理器配对时可能需要此 SKI。

#### 能量守卫
在“LPC 能耗防护”选项卡中，您可以定义用于控制能耗设备（EEBUS 或手动）的能耗防护。在“LPP 能耗防护”选项卡（仅启用 LPP 时可见）中，您可以定义用于生产设备的能耗防护。对于每个能耗防护，适配器都会创建可用于观察和控制能耗管理器的对象。

### Iobroker 对象
与通用适配器信息相关的状态：

- info.connection：与 gRPC 服务器的连接
- info.discoveredDevices：已发现的 EEBUS 设备列表
- info.ski：此适配器实例的 SKI

与 LPC 相关的州（根据 `LPC/`）：

- LPC.state：LPC 用例的状态，参见上文提到的 EEBUS 用例规范。
- LPC.limit：控制盒发送的当前功耗限制（如果限制已激活）。
- LPC.limitDuration：活动消费限制的持续时间
- LPC.limitMinutesToday：每日限时用电调暗的总时长。根据法律规定，此时长不得超过每日 2 小时。如果超过此时长，请联系您的能源供应商。

与 LPP 相关的状态（在 `LPP/` 下，仅当 LPP 启用时）：

- LPP.state：LPP 用例的状态（与 LPC 相同的状态机）
- LPP.limit：控制盒发送的当前生产限制（如果限制已激活）。
- LPP.limitDuration：活跃生产限制的持续时间
- LPP.limitMinutesToday：生产中断总时长

与所有能源警戒相关的州（在`LPC.EnergyGuards.Guard_{name}/`或`LPP.EnergyGuards.Guard_{name}/`下）：

- 百分比：在限制期间分配给此设备的控制箱限制百分比
- currentLimit：如果不为零，则表示此设备的当前活动限制。
- failsafeLimit：设备在故障安全模式下的最大功率。写入此状态将更改 eebus 设备的配置。
- lastHeartbeat：从设备接收到的最后一个心跳信号的时间（超时时间与控制盒连接的配置超时时间相同）

与EEBUS能源防护装置相关的状态：

- eebusConnected：如果与设备存在 EEBUS 连接，则为 true
- confirmedLimit：如果节能器已设置限值，则此处显示受控设备确认的值。
- 手动限制：如果控制框中未设置限制，用户可以自行设置限制。

与手动能量防护相关的状态：

- 心跳：用户脚本必须定期写入此状态，以表明可控设备处于可以调光的状态。
- 已连接：如果及时收到手动心跳信号，则为真；否则为假。可根据需要直接设置。

请参阅文档文件夹，其中包含手动防护装置的示例。

**注意：** 从不支持 LPP 的版本升级时，现有的 LPC 状态会自动从 `info.*` 迁移到 `LPC.*`，能量保护对象会自动从 `EnergyGuards.Guard_*` 迁移到 `LPC.EnergyGuards.Guard_*`。引用旧路径的用户脚本需要更新。

＃＃＃ 行为
当控制盒发送活动限制时，适配器会根据百分比设置将其分配给所有已配置的节能器。

百分比的运作方式：

每个能量守护者都有一个预设的百分比，用于定义其在总预算中所占的份额。分配与守护者当前是否连接无关——每个守护者始终参与分配。

- 如果所有百分比之和小于或等于 100%，则每个警卫将获得其分配的预算份额。
- 如果总和超过 100%，则所有百分比按比例缩小，使其符合 100%。

**安全限值：**

每个能量保护装置都有一个安全限值（即它必须始终允许汲取或产生的最小功率）。分配算法遍历所有保护装置：如果某个保护装置在剩余预算中所占的百分比低于其安全限值，则该保护装置的功率将被限制在其安全限值，并从预算中扣除该数值。此过程重复进行，直到不再需要限制任何保护装置为止。剩余预算随后按比例分配给未被限制的保护装置。

**示例：** 控制箱限功率为 4200W。保护电路 A 的功率占比为 70%，并设有 4200W 的故障保护功率。保护电路 B 的功率占比为 30%，且无故障保护功率。

- Guard A 的百分比份额为 2940W，但其故障保护需要 4200W → 限制为 4200W。
- 剩余预算 = 0W。警卫 B 获得 1W 的最低预算（与“无限制”不同的最低预算）。

**示例：** 控制箱限功率为 4200W。保护电路 A 的功率为 70%，无故障保护。保护电路 B 的功率为 30%，无故障保护。

- 守卫 A 获得 2940W (70%)，守卫 B 获得 1260W (30%)。总和 = 4200W。

**手动限制：**

如果 EEBUS 能量保护器已设置手动限值，且控制盒发送了有效限值，则适配器会在应用控制盒限值之前重置所有手动限值。控制盒限值生效期间无法设置手动限值。

**独立：**

LPC 和 LPP 独立运行——控制箱的消耗限制不会影响生产设备，反之亦然。

### 测试
在与实际控制盒配对之前，您应该使用模拟器测试您的系统，例如：https://github.com/FernetMenta/eebus-device-tester。如果您想使用与设备测试器运行所在机器不同的计算机上的浏览器，则必须将 WEB_ADDR 指定为该机器的公网 IP 地址。例如：

```
WEB_ADDR=192.168.171.49 ./device-tester -p 4815 -c cert.pem -k key.pem
```

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.2.0 (2026-08-25)

- Update instructions with info on how to run prebuilt binaries instead of a docker container
- Fix: clear discoverd devices on restart
- Move container image to GHCR: ghcr.io/fernetmenta/eebus-grpc:v2.0.2
- Fix: reported failsafe to controlbox is wrong because user set objects was not read at startup
- Fix: handle edge case when failsafeLimit / limit was set to 0
- More meaningful description
- Revised logic for distribution of limits to energy guards.
- Fix: send limit duration to eebus energy guards
- Fix: downgrade some heartbeat logs to debug level
- Fix: do not call distributeLimit if nothing changed
- Fix: Add minimum assured power to config, fix misinterpretation of contractual consumption nominal max.

### 1.1.1 (2026-08-20)

- Fix: adapter admin UI does not meet the ioBroker responsive design initiative requirements
- Fix: refactor subscribeCsLpcEvents and signal stream errors to caller
- Fix: drop console.log in grpc-service.js
- Fix: German strings / logging in grpc-service.js
- Update README with note on docker on Windows

### 1.1.0 (2026-08-19)

- Feature: automatic backup and restore of Docker volume certificates — certs are saved to the adapter data directory on connection and restored to the volume on adapter start, ensuring they survive ioBroker backup/restore cycles
- Check if docker is available and make admin UI options available on this.
- Update depencendy on eebus-grpc

### 1.0.0 (2026-08-17)

- Breaking: requires eebus-grpc container image version 2.0.0 (`fernetmenta/iobroker.eebus-grpc:2.0.0`). The gRPC API changed to a single-server architecture with instance-based routing — use cases no longer spawn separate gRPC servers.
- Feature: integrate ioBroker plugin-docker to automatically manage the eebus-grpc container (pull, start, stop, update) — enable via "Enable Docker Container" checkbox on Base Config tab (requires Docker Engine >= 20.10 on the host)
- Fix: reset info.connection state to false on adapter unload

### 0.3.2 (2026-08-14)

- Fix: reduce log spam on manual energy guards — require 2 consecutive missed heartbeats before marking disconnected, downgrade routine heartbeat logs to debug level
- Fix: suppress error-level logs and reconnect attempts when adapter is shutting down (gRPC stream CANCELLED is expected during stop)
- Add an example of a manual LPC guard to the doc folder.
- Fix: translations
- Various smaller fixes.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

Copyright (c) 2024-2026 FernetMenta <fernetmenta@online.de>

                    GNU GENERAL PUBLIC LICENSE
                       Version 3, 29 June 2007

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