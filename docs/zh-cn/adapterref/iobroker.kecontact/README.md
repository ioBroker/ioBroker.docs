---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.kecontact/README.md
title: ioBroker.kecontact
hash: 2Vpc9wYKmn8IAuy5qokvBysTvCuYwoUmU1ScPC9TXwI=
---
![标识](../../../en/adapterref/iobroker.kecontact/admin/kecontact.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.kecontact.svg)
![下载](https://img.shields.io/npm/dm/iobroker.kecontact.svg)
![安装数量（最新）](https://iobroker.live/badges/kecontact-installed.svg)
![安装数量（稳定）](https://iobroker.live/badges/kecontact-stable.svg)
![依赖状态](https://img.shields.io/david/iobroker-community-adapters/iobroker.kecontact.svg)
![国家公共管理](https://nodei.co/npm/iobroker.kecontact.png?downloads=true)

# IoBroker.kecontact
[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/kecontact/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**测试：** ![测试与发布](https://github.com/iobroker-community-adapters/ioBroker.kecontact/workflows/Test%20and%20Release/badge.svg)

# 适用于 KEBA KeContact P20 或 P30 和 BMW i wallbox 的 ioBroker 适配器
控制您的充电站并使用自动调节，例如使用 UDP 协议通过光伏剩余电量和电池存储为您的车辆充电。

＃＃ 安装
通过 ioBroker Admin 安装此适配器：

1. 打开实例配置对话框
2. 输入 KEBA KeContact 墙盒的 IP 地址
3. 根据需要调整刷新间隔
4.保存配置
5. 启动适配器

＃＃ 配置
### KeContact IP 地址
这是您的 KEBA KeContact 或 BMW i 墙盒的 IP 地址。支持与Keba KeContact S10（相位开关装置）的组合。

### 固件检查
适配器每天都会检查 KEBA 网站上是否有更新的固件。此信息将被打印以记录为警告。

### 被动模式
如果您想自己控制墙盒并且不希望此适配器执行某些自动操作，请激活此选项。在这种情况下，所有有关光伏自动和功率限制的后续选项都将被忽略。

### 后续墙盒
如果这是您环境中的后续墙盒，请激活此选项。目前，只能主动管理一个 Wallbox。所有其他实例（单独的实例）必须选中此选项，因为只有一个实例可以接收广播消息。该墙盒/实例将以被动模式运行。

### 加载充电会话
您可以选中此选项以定期从壁箱下载最新的充电会话 (30)。
v1.1.1 及以下版本的用户请注意：您必须选中此选项才能仍然接收充电会话！

＃＃＃ 刷新间隔
这是墙盒应查询新收费值的频率（以秒为单位）。

默认值为 10 分钟，这是 KeConnect 负载和 ioBroker 中最新信息之间的良好平衡。

### PV 自动装置
要根据剩余电量（例如通过光伏）为您的车辆充电，您还可以定义代表剩余电量和主电源的状态。这些值用于计算可用于充电的安培数。通过附加值，您可以定义

* 切换充电相 1p/3p 或使用 Keba Kecontact X2 端口的状态（配合 Keba KeContact S10 或任何其他接触器）
* 电池存储当前电量的状态，因此光伏自动装置将额外使用它为您的车辆充电
* 限制电池存储功率的选项，仅以最小功率进行充电
* 如果您想使用充电站的 X1 输入来控制是满功率充电还是光伏自动充电，请切换 X1 选项
* 与默认 6 A 不同的最小安培数（仅适用于雷诺 Zoe）
* 可用于开始充电的功率值（这意味着即使没有足够的剩余电量也会开始充电 - 建议 0 W 用于 1 相充电，500 W 至 2000 W 用于 3 相充电）
* 安培数增量（建议 500 mA）
* 可以暂时用于维持充电会话的关注值（这意味着即使不再有足够的剩余电量，充电也会稍后停止 - 将添加起始关注 - 建议 500 W）
* 充电会话的最短持续时间（即使剩余电量不再充足，充电会话将至少持续一次 - 建议 300 秒）
* 每次剩余时间不再足够时继续充电的时间（以弥补阴天的时间）

### 1p/3p 充电
如果您有一个安装接触器来连接（断开）充电站的第 2 相和第 3 相，并且该开关可以由状态触发，则该适配器能够开始用一相充电，并在剩余电量充足的情况下切换到三相充电为了它。
在这种情况下，请输入您的安装接触器的状态以及它是 NO（常开）还是 NC（常闭）

### 功率限制
您还可以限制最大。壁箱的功率限制主功率。例如。当运行夜间储存加热器时，您可能必须遵守最大功率限制。
如果您输入一个值，您的 Wallbox 将持续受到限制，不能超过您的功率限制。
最多可以指定电能表的三种状态进行限制。所有值都将相加来计算电流消耗。
额外的复选框用于指定是否包含壁箱功率（在这种情况下，将从状态值中减去壁箱功率）。

### 动态选项
此外，还有一些状态会影响光伏发电自动运行的行为，例如通过您自己的脚本根据您的需要更新这些值）

* kecontact.0.automatic.photovoltaics - 自动激活光伏发电（true）或设置为 false 时将以最大功率为车辆充电
* kecontact.0.automatic.calcPhases - 定义当前用于充电计算的相数。这是 Keba Deutschland 版本所必需的，可用于所有充电站的初始充电会话
* kecontact.0.automatic.addPower - 定义允许为车辆充电的瓦数（与选项中相同）
* kecontact.0.automatic.pauseWallbox - 只要设置为 true，就会立即停止每个充电会话
* kecontact.0.automatic.limitCurrent - 将充电限制为指定的安培数（以 mA 为单位）（0 = 无限制）

示例：要以 6A 的恒定安培数为车辆充电（无论剩余电流有多少），请将光伏设置为 false，并将电流限制为 6000。

＃＃ 合法的
该项目与 KEBA AG 公司没有直接或间接附属关系。

KeConnect 是 KEBA AG 的注册商标。

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
* (Sneak-L8) support for 1p/3p-charging (start charging with 1 phase and switch to 3 phases when enough surplus available) including Keba KeContact S10
* (Sneak-L8) minimum amperage allowed to 5A because some vehicles and KeContact (undocumented) allow this value
* (Sneak-L8) new switch to limit battery storage support only to hold minimum charging power
* (Sneak-L8) catch error when requesting firmware page (sentry IOBROKER-KECONTACT-1H)
* (Sneak-L8) RFID tag and class where not updated in channel "statitics" when no charging sessions were obtained
* (Sneak-L8) added new Keba model Company Car Wall Box MID (sentry IOBROKER-KECONTACT-1K)

### 1.5.2 (2022-11-02)
* (Sneak-L8) fix error in release script

### 1.5.1 (2022-11-02)
* (Sneak-L8) update release script to v3

### 1.5.0 (2022-11-01)
* (Sneak-L8) minor fixes from adapter check
* (Sneak-L8) using Weblate for translations
* (Sneak-L8) update power and amperage value immediately for better calculation
* (Sneak-L8) fix description of authreq state
* (Sneak-L8) handle message at wallbox startup
* (Sneak-L8) catch error when UDP connection got lost (sentry IOBROKER-KECONTACT-1C)
* (Sneak-L8) update url and regex to Keba firmware

### 1.4.1 (2022-05-30)
* (Sneak-L8) separate states for charging and discharging battery storage
* (Sneak-L8) additional states to (de)authorize or unlock charging station and set date/time
* (Sneak-L8) fix unsubscribing foreign states (sentry IOBROKER-KECONTACT-10)

### 1.4.0 (2022-03-31)
* (Sneak-L8) support for battery storage in photovoltaics automatics
* (Sneak-L8) add state selector in settings dialog

## License
                                 Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/

   TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

   1. Definitions.

      "License" shall mean the terms and conditions for use, reproduction,
      and distribution as defined by Sections 1 through 9 of this document.

      "Licensor" shall mean the copyright owner or entity authorized by
      the copyright owner that is granting the License.

      "Legal Entity" shall mean the union of the acting entity and all
      other entities that control, are controlled by, or are under common
      control with that entity. For the purposes of this definition,
      "control" means (i) the power, direct or indirect, to cause the
      direction or management of such entity, whether by contract or
      otherwise, or (ii) ownership of fifty percent (50%) or more of the
      outstanding shares, or (iii) beneficial ownership of such entity.

      "You" (or "Your") shall mean an individual or Legal Entity
      exercising permissions granted by this License.

      "Source" form shall mean the preferred form for making modifications,
      including but not limited to software source code, documentation
      source, and configuration files.

      "Object" form shall mean any form resulting from mechanical
      transformation or translation of a Source form, including but
      not limited to compiled object code, generated documentation,
      and conversions to other media types.

      "Work" shall mean the work of authorship, whether in Source or
      Object form, made available under the License, as indicated by a
      copyright notice that is included in or attached to the work
      (an example is provided in the Appendix below).

      "Derivative Works" shall mean any work, whether in Source or Object
      form, that is based on (or derived from) the Work and for which the
      editorial revisions, annotations, elaborations, or other modifications
      represent, as a whole, an original work of authorship. For the purposes
      of this License, Derivative Works shall not include works that remain
      separable from, or merely link (or bind by name) to the interfaces of,
      the Work and Derivative Works thereof.

      "Contribution" shall mean any work of authorship, including
      the original version of the Work and any modifications or additions
      to that Work or Derivative Works thereof, that is intentionally
      submitted to Licensor for inclusion in the Work by the copyright owner
      or by an individual or Legal Entity authorized to submit on behalf of
      the copyright owner. For the purposes of this definition, "submitted"
      means any form of electronic, verbal, or written communication sent
      to the Licensor or its representatives, including but not limited to
      communication on electronic mailing lists, source code control systems,
      and issue tracking systems that are managed by, or on behalf of, the
      Licensor for the purpose of discussing and improving the Work, but
      excluding communication that is conspicuously marked or otherwise
      designated in writing by the copyright owner as "Not a Contribution."

      "Contributor" shall mean Licensor and any individual or Legal Entity
      on behalf of whom a Contribution has been received by Licensor and
      subsequently incorporated within the Work.

   2. Grant of Copyright License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      copyright license to reproduce, prepare Derivative Works of,
      publicly display, publicly perform, sublicense, and distribute the
      Work and such Derivative Works in Source or Object form.

   3. Grant of Patent License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      (except as stated in this section) patent license to make, have made,
      use, offer to sell, sell, import, and otherwise transfer the Work,
      where such license applies only to those patent claims licensable
      by such Contributor that are necessarily infringed by their
      Contribution(s) alone or by combination of their Contribution(s)
      with the Work to which such Contribution(s) was submitted. If You
      institute patent litigation against any entity (including a
      cross-claim or counterclaim in a lawsuit) alleging that the Work
      or a Contribution incorporated within the Work constitutes direct
      or contributory patent infringement, then any patent licenses
      granted to You under this License for that Work shall terminate
      as of the date such litigation is filed.

   4. Redistribution. You may reproduce and distribute copies of the
      Work or Derivative Works thereof in any medium, with or without
      modifications, and in Source or Object form, provided that You
      meet the following conditions:

      (a) You must give any other recipients of the Work or
          Derivative Works a copy of this License; and

      (b) You must cause any modified files to carry prominent notices
          stating that You changed the files; and

      (c) You must retain, in the Source form of any Derivative Works
          that You distribute, all copyright, patent, trademark, and
          attribution notices from the Source form of the Work,
          excluding those notices that do not pertain to any part of
          the Derivative Works; and

      (d) If the Work includes a "NOTICE" text file as part of its
          distribution, then any Derivative Works that You distribute must
          include a readable copy of the attribution notices contained
          within such NOTICE file, excluding those notices that do not
          pertain to any part of the Derivative Works, in at least one
          of the following places: within a NOTICE text file distributed
          as part of the Derivative Works; within the Source form or
          documentation, if provided along with the Derivative Works; or,
          within a display generated by the Derivative Works, if and
          wherever such third-party notices normally appear. The contents
          of the NOTICE file are for informational purposes only and
          do not modify the License. You may add Your own attribution
          notices within Derivative Works that You distribute, alongside
          or as an addendum to the NOTICE text from the Work, provided
          that such additional attribution notices cannot be construed
          as modifying the License.

      You may add Your own copyright statement to Your modifications and
      may provide additional or different license terms and conditions
      for use, reproduction, or distribution of Your modifications, or
      for any such Derivative Works as a whole, provided Your use,
      reproduction, and distribution of the Work otherwise complies with
      the conditions stated in this License.

   5. Submission of Contributions. Unless You explicitly state otherwise,
      any Contribution intentionally submitted for inclusion in the Work
      by You to the Licensor shall be under the terms and conditions of
      this License, without any additional terms or conditions.
      Notwithstanding the above, nothing herein shall supersede or modify
      the terms of any separate license agreement you may have executed
      with Licensor regarding such Contributions.

   6. Trademarks. This License does not grant permission to use the trade
      names, trademarks, service marks, or product names of the Licensor,
      except as required for reasonable and customary use in describing the
      origin of the Work and reproducing the content of the NOTICE file.

   7. Disclaimer of Warranty. Unless required by applicable law or
      agreed to in writing, Licensor provides the Work (and each
      Contributor provides its Contributions) on an "AS IS" BASIS,
      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
      implied, including, without limitation, any warranties or conditions
      of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
      PARTICULAR PURPOSE. You are solely responsible for determining the
      appropriateness of using or redistributing the Work and assume any
      risks associated with Your exercise of permissions under this License.

   8. Limitation of Liability. In no event and under no legal theory,
      whether in tort (including negligence), contract, or otherwise,
      unless required by applicable law (such as deliberate and grossly
      negligent acts) or agreed to in writing, shall any Contributor be
      liable to You for damages, including any direct, indirect, special,
      incidental, or consequential damages of any character arising as a
      result of this License or out of the use or inability to use the
      Work (including but not limited to damages for loss of goodwill,
      work stoppage, computer failure or malfunction, or any and all
      other commercial damages or losses), even if such Contributor
      has been advised of the possibility of such damages.

   9. Accepting Warranty or Additional Liability. While redistributing
      the Work or Derivative Works thereof, You may choose to offer,
      and charge a fee for, acceptance of support, warranty, indemnity,
      or other liability obligations and/or rights consistent with this
      License. However, in accepting such obligations, You may act only
      on Your own behalf and on Your sole responsibility, not on behalf
      of any other Contributor, and only if You agree to indemnify,
      defend, and hold each Contributor harmless for any liability
      incurred by, or claims asserted against, such Contributor by reason
      of your accepting any such warranty or additional liability.

   END OF TERMS AND CONDITIONS

   APPENDIX: How to apply the Apache License to your work.

      To apply the Apache License to your work, attach the following
      boilerplate notice, with the fields enclosed by brackets "[]"
      replaced with your own identifying information. (Don't include
      the brackets!)  The text should be enclosed in the appropriate
      comment syntax for the file format. We also recommend that a
      file or class name and description of purpose be included on the
      same "printed page" as the copyright notice for easier
      identification within third-party archives.

   Copyright 2021-2022 UncleSamSwiss, Sneak-L8

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.