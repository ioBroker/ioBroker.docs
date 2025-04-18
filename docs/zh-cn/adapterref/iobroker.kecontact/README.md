---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.kecontact/README.md
title: ioBroker.kecontact
hash: gjIq7CnE26uX964IgZ62ULf8Dyy0VB1m8kjrJRsVuO4=
---
![标识](../../../en/adapterref/iobroker.kecontact/admin/kecontact.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.kecontact.svg)
![下载](https://img.shields.io/npm/dm/iobroker.kecontact.svg)
![安装数量](https://iobroker.live/badges/kecontact-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/kecontact-stable.svg)
![新平台](https://nodei.co/npm/iobroker.kecontact.png?downloads=true)

# IoBroker.kecontact
[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/kecontact/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**测试：**![测试与发布](https://github.com/Sneak-L8/ioBroker.kecontact/workflows/Test%20and%20Release/badge.svg)

# IoBroker 适配器适用于 KEBA KeContact P20 或 P30 和 BMW i 壁挂盒
使用 UDP 协议控制您的充电站并使用自动调节，例如通过光伏剩余电量和电池存储为您的车辆充电。

＃＃ 安装
通过 ioBroker Admin 安装此适配器：

1. 打开实例配置对话框
2. 输入您的 KEBA KeContact 墙盒的 IP 地址
3. 输入光伏自动装置或功率限制的能量计状态以及电池存储所需的数据
4.保存配置
5.启动适配器

＃＃ 配置
### KeContact IP 地址
这是您的 KEBA KeContact 或 BMW i 壁挂盒的 IP 地址。支持与 Keba KeContact S10（相位切换设备）组合使用。

### 固件检查
由于 Keba 网站已更改，因此不再提供支持。

### 被动模式
如果您想自己控制壁挂式充电箱，并且不希望此适配器执行某些自动化操作，请激活此选项。在这种情况下，所有与光伏自动化和功率限制有关的后续选项都将被忽略。

### 后续墙盒
如果这是您环境中的后续墙盒，请激活此选项。目前，只有一个墙盒可以主动管理。所有其他（单独的实例）都必须选中此选项，因为只有一个实例可以接收广播消息。此墙盒/实例将以被动模式运行。

### 加载充电会话
您可以勾选此选项，定期从壁挂式充电盒下载最新的充电会话（30）。
版本 v1.1.1 及以下版本的用户请注意：您必须勾选此选项才能继续接收充电会话！

### 刷新间隔
这是以秒为单位的间隔，表示壁挂盒应多久查询一次新的充电值。

默认值为 10 分钟，这在 KeConnect 的负载和 ioBroker 中的最新信息之间取得了良好的平衡。

### PV 自动装置
为了根据剩余电量为您的车辆充电（例如通过光伏），您还可以定义代表主电源剩余电量和电网消耗的状态。这些值用于计算可用于充电的电流。通过其他值，您可以定义

* 切换充电相 1p/3p 或使用 Keba Kecontact 的 X2 端口的状态（使用 Keba KeContact S10 或任何其他接触器）
* 电池存储当前电力的状态，因此光伏自动装置将额外使用它为您的车辆充电
* 可选择限制电池存储功率，以最低功率进行充电
* 如果您想使用充电站的 X1 输入来控制是否全功率充电或光伏自动充电，请切换 X1 选项
* 与默认的 6 A 不同的最小安培数（仅适用于 Renault Zoe）
* 可用于启动充电的电网消耗功率值（这意味着即使没有足够的剩余电量，充电也会开始 - 建议 1 相充电为 0 W，3 相充电为 500 W 至 2000 W）
* 电流增量（建议 500 mA）
* 可以暂时用来维持充电过程的电网消耗值（这意味着即使不再有足够的剩余电量，充电也会在稍后停止 - 将增加启动电网消耗 - 建议 500 W）
* 充电时间最短（即使剩余电量不再充足，一次充电也会至少持续这一次 - 建议 300 秒）
* 每次剩余时间不再充足时继续充电（弥补阴天的时间）
* 在车辆插上电源并需要授权后，务必立即对车辆进行充电（以防止出现未立即充电则无法进一步充电的情况）

### 1p/3p 充电
如果您有一个安装接触器来连接（断开）充电站的第 2 相和第 3 相，并且此开关可以由状态触发，则此适配器能够以单相开始充电，并在剩余电量足够的情况下切换到 3 相充电。
在这种情况下，请输入安装接触器的状态，以及它是 NO（常开）还是 NC（常闭）

### 电池存储
如果您拥有电池存储，请在此处填写选项。通过指定电池存储的剩余电量和电网消耗状态，此适配器可以控制是否使用电池存储为您的车辆充电，具体取决于选项中预设的策略。

### 德国 §14a EnWG 权力限制
根据德国 §14a EnWG，可以选择将充电站限制为最大 6A 固定电流或动态限制为 3x6A（4.140 瓦）的电网消耗

### 功率限制
您还可以限制壁挂式电箱的最大功率以限制主电源。例如，当运行夜间储热加热器时，您可能必须遵守最大功率限制。
如果您输入一个值，您的壁挂式电箱将不断受到限制，以免超过您的功率限制。
最多可以指定三种能量计状态进行限制。所有值都将相加以计算当前消耗。
一个额外的复选框用于指定是否包含壁挂式电箱功率（在这种情况下，壁挂式电箱功率将从状态值中减去）。

另一个选项让您可以不限制功率而是限制电流。使用此选项，充电站的电流将减少到不超过每个相位的最大电流。
因此，您需要指定电能表每个相位的电流状态。请确保充电站和电能表的相位具有相同的编号。

### 动态选项
此外，还有一些状态可以自动影响光伏电池的行为，例如通过您自己的脚本根据您的需要更新这些值）

* kecontact.n.automatic.photovoltaics - 设置为 false 时，激活光伏自动 (true) 或以最大功率为车辆充电
* kecontact.n.automatic.calcPhases - 定义当前用于充电计算的相数。这是 Keba Deutschland 版本所必需的，可用于所有充电站的初始充电会话
* kecontact.n.automatic.addPower - 定义允许为您的车辆充电的电网消耗瓦数（与选项相同）
* kecontact.n.automatic.pauseWallbox - 只要设置为 true，立即停止每次充电
* kecontact.n.automatic.limitCurrent - 将充电限制为指定的 mA 电流值（0 = 无限制）
* kecontact.n.automatic.batteryStorageStrategy - 您的电池存储是否以及如何为您的车辆充电的策略
* kecontact.n.automatic.batterySoCForCharging - 通过指定 SoC 来限制车辆电池存储的使用，低于该 SoC 则禁止充电

示例：要以恒定 6A 电流为您的车辆充电（无论是否有剩余），请将光伏设置为 false 并将限制电流设置为 6000。

＃＃ 合法的
该项目与 KEBA AG 公司无直接或间接关联。

KeConnect 是 KEBA AG 的注册商标。

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (Sneak-L8) new option to always start charging when vehicle is plugged if authorization is required to prevent charging station to block charging
* (Sneak-L8) optimized strategy for battery charging

### 3.1.0 (2025-03-20)
* (Sneak-L8) new option to reduce log entries on info level (write them with debug level)
* (Sneak-L8) fix wording error ("regard" changed to grid consumption)
* (Sneak-L8) fixed some english translations
* (Sneak-L8) renamed state "regardTimestamp" to "consumptionTimestamp" - please delete old state

### 3.0.1 (2025-03-15)
* (Sneak-L8) fix error sentry IOBROKER-KECONTACT-29 an IOBROKER-KECONTACT-2A
* (Sneak-L8) minimum js-controller now >= 7 due to I18n
* (Sneak-L8) fix roles of states in io-package.json
* (Sneak-L8) log of config on level debug instead of info

### 3.0.0 (2025-03-10)
* (Sneak-L8) rebase adapter on newest version of adapter creator
* (Sneak-L8) required js-controller now >= 6.0.11 and admin >= 7.0.23
* (Sneak-L8) new option to limit amperage of charging station to maximum value for amperage of whole mains circuit
* (Sneak-L8) immediately reduce charging power when over max amperage or max power limits
* (Sneak-L8) fix one time attempt for recharging vehicle in state 5
* (Sneak-L8) reduced info logs for max power adjustment when no vehicle is plugged (log as debug in that case)
* (Sneak-L8) pay attention to minimum time for phase switch by x2 when vehicle is plugged/unplugged
* (Sneak-L8) fix error sentry IOBROKER-KECONTACT-21
* (Sneak-L8) migrate from request to axios
* (Sneak-L8) migrate from ESlint v8 to v9

### 2.3.0 (2024-11-29)
* (Sneak-L8) new option to limit charging station according to german §14a EnWG
* (Sneak-L8) enable currTime for manual use and X2 even in passive mode
* (Sneak-L8) minimum verison für js-controller now 5.0.19
* (Sneak-L8) set currTimer timeout default value from 0 to 1
* (Sneak-L8) support new option "setBoot" of c-series stating firmware 3.10.57

### 2.2.0 (2024-06-23)
* (mcm1957) Adapter requires nodejs >= 18 and js-controller >= 5 now.
* (mcm1957) Dependencies have been updated.
* (Sneak-L8) fix url for download page at Keba website
* (Sneak-L8) fix lint problems by replacing double by single quotes

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

   Copyright 2021-2025 UncleSamSwiss, Sneak-L8

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.