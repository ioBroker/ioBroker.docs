---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.kecontact/README.md
title: ioBroker.ke联系方式
hash: MGiYMwJoul92QwJbU2ve3VGjaw4SuxeBxGvNS9gxt8c=
---
![标识](../../../en/adapterref/iobroker.kecontact/admin/kecontact.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.kecontact.svg)
![下载](https://img.shields.io/npm/dm/iobroker.kecontact.svg)
![安装数量](https://iobroker.live/badges/kecontact-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/kecontact-stable.svg)
![NPM](https://nodei.co/npm/iobroker.kecontact.png?downloads=true)

# IoBroker.ke联系方式
[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/kecontact/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**测试：** ![测试与发布](https://github.com/Sneak-L8/ioBroker.kecontact/workflows/Test%20and%20Release/badge.svg)

# 适用于 KEBA KeContact P20 或 P30 以及 BMW i 壁挂式充电桩的 ioBroker 适配器
使用 UDP 协议控制您的充电站，并使用自动调节功能，例如通过光伏余能和电池储能为您的车辆充电。

＃＃ 安装
通过 ioBroker 管理后台安装此适配器：

1. 打开实例配置对话框
2. 输入您的 KEBA KeContact 壁挂盒的 IP 地址
3. 输入光伏自动控制系统或功率限制的电能表状态以及电池储能所需的数据
4. 保存配置
5. 启动适配器

＃＃ 配置
### KeContact IP 地址
这是您的 KEBA KeContact 或 BMW i 壁挂式充电桩的 IP 地址。支持与 Keba KeContact S10（相位切换装置）配合使用。

### 固件检查
Keba 网站改版后，已不再提供支持。

### 被动模式
如果您希望自行控制壁挂式光伏发电系统，并且不希望此适配器执行任何自动操作，请启用此选项。启用后，所有后续关于光伏自动控制和功率限制的选项都将被忽略。

### 后续墙盒
如果这是您环境中的后续墙盒，请启用此选项。目前，只能主动管理一个墙盒。所有其他墙盒（独立实例）都必须选中此选项，因为只能有一个实例接收广播消息。此墙盒/实例将以被动模式运行。

### 负载充电会话
您可以勾选此选项，定期从您的充电桩下载最新的充电记录（30 条）。

注意：版本 v1.1.1 及以下的用户必须勾选此选项才能继续接收充电记录！

### 刷新间隔
这是查询充电桩获取新充电值的间隔时间（以秒为单位）。

默认值为 10 分钟，这在 KeConnect 的负载和 ioBroker 中保持最新信息之间取得了良好的平衡。

### 光伏自动化
为了根据剩余电量（例如通过光伏发电）为车辆充电，您还可以定义代表剩余电量和电网用电量的状态。这些值用于计算可用于充电的电流。您还可以通过附加值来定义

* 用于切换充电相 1p/3p 或使用 Keba Kecontact 的 X2 端口（配合 Keba KeContact S10 或任何其他接触器）的状态
* 电池储能系统的当前功率状态，因此光伏自动系统将额外利用这些功率为您的车辆充电。
* 可以选择限制电池存储功率，使其仅以最小功率维持充电。
* 如果您想使用充电站的 X1 输入来控制充电方式（全功率充电或光伏自动充电），请切换 X1 选项。
* 最低电流与默认的 6 安培不同（例如，仅适用于雷诺 Zoe 等车型）
* 可用于启动充电的电网消耗功率值（这意味着即使没有足够的剩余功率，充电也会开始——建议单相充电为 0 瓦，三相充电为 500 瓦至 2000 瓦）
* 电流增量（建议 500 mA）
* 用于暂时维持充电过程的电网消耗值（这意味着即使剩余电量不足，充电也会稍后停止——初始电网消耗量将被加上——建议 500 瓦）
* 最短充电持续时间（即使剩余电量不足，充电过程也至少会持续此时间 - 建议 300 秒）
* 当剩余电量不足以满足需求时，需继续充电（以弥补阴天充电时间不足的情况）。
* 车辆插入电源后，应立即开始充电，并等待授权（以防止出现未立即充电而无法继续充电的错误）。

### 1p/3p 充电
如果您有一个安装接触器用于断开或断开充电站的 2 相和 3 相，并且该开关可由状态触发，则此适配器能够以单相充电开始，并在剩余电量充足时切换到三相充电。

在这种情况下，请输入您的安装接触器的状态，并说明它是常开 (NO) 还是常闭 (NC)。

此外，还可以选择将充电模式设置为永久单相或三相。

### 电池存储
如果您拥有储能电池，请在此处填写选项。通过指定储能电池的盈余状态和电网消耗状态，此适配器可以根据选项中预设的策略，控制是否使用储能电池为您的车辆充电。

德国能源条例第14a条 电力限制
根据德国能源条例第14a条，可以选择将充电站的电流限制为最大固定6A，或者根据电网消耗量动态调整为3x6A（4.140瓦）。

### 功率限制
您还可以限制壁挂式电表箱的最大功率，从而限制主电源的功率。例如，使用夜间蓄热式电暖器时，您可能需要遵守最大功率限制。

如果您输入一个值，壁挂式电表箱的功率将持续受到限制，不会超过您设定的功率限制。

最多可以指定三个电表状态进行功率限制。所有数值将相加以计算当前功耗。

还有一个额外的复选框用于指定是否包含壁挂式电表箱的功率（如果包含，则会从电表状态值中减去壁挂式电表箱的功率）。

另一种选择是限制电流而非功率。启用此选项后，充电站的电流将被降低，以确保每相电流不超过最大电流限制。

因此，您需要指定电表每相的电流状态。请确保充电站和电表的相序编号一致。

### 动态选项
此外，还有一些状态可以影响光伏系统的行为，例如，通过您自己的脚本根据您的需要更新这些值。

* kecontact.n.automatic.photovoltaics - 启用自动光伏系统（true），或设置为 false 时以最大功率为车辆充电
* kecontact.n.automatic.calcPhases - 定义当前用于充电计算的相位数。此参数是 Keba 德国版所必需的，可用于所有充电站的初始充电会话。
* kecontact.n.automatic.1p3pSwitch - 定义无论是否有剩余电量，充电时应始终使用 1 便士还是始终使用 3 便士。
* kecontact.n.automatic.addPower - 定义允许用于给车辆充电的电网消耗功率（瓦特数）（与选项中的设置相同）
* kecontact.n.automatic.pauseWallbox - 只要设置为 true，就会立即停止所有充电会话
* kecontact.n.automatic.limitCurrent - 将充电电流限制在指定的毫安 (mA) 范围内（0 = 无限制）
* kecontact.n.automatic.batteryStorageStrategy - 电池存储策略，用于决定是否以及如何使用电池存储为车辆充电。
* kecontact.n.automatic.batterySoCForCharging - 通过指定一个 SoC 值来限制车辆电池存储空间的使用，低于该 SoC 值则禁止充电。
* kecontact.n.automatic.stateVehicleSoC - 用于获取车辆当前SoC的状态名称（targetsoc和maxSoc需要用到）
* kecontact.n.automatic.targetSoC - 除非车辆达到此 SoC，否则禁用光伏自动充电（以最大功率充电）。
* kecontact.n.automatic.resetTargetSoC - 如果目标 SoC 在达到设定值后需要清除，则设置为 true
* kecontact.n.automatic.maxSoC - 最大 SoC 值，如果达到此 SoC 值，车辆将不会充电。

示例：要以 6A 的恒定电流为您的车辆充电，无论是否有剩余电流，请将光伏发电设置为 false，并将电流限制为 6000。

＃＃ 合法的
本项目与 KEBA AG 公司没有任何直接或间接的关联。

KeConnect是KEBA AG的注册商标。

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (Sneak-L8) new options to charge vehicle up to a specified SoC
* (Sneak-L8) new option to stop charging at a certain SoC
* (Sneak-L8) raise adapter-dev version from 1.4 to 1.5
* (Sneak-L8) drop dependencies to chai, sinon and mocha

### 3.3.0 (2025-09-18)
* (Sneak-L8) new option to always charge with 1p oder 3p
* (Sneak-L8) new setting for discharging power of storage battery (if not equal to max battery power)
* (Sneak-L8) updated version requirements (admin 7.6.17 and core 3.3.2)

### 3.2.0 (2025-07-13)
* (Sneak-L8) new option to always start charging when vehicle is plugged if authorization is required to prevent charging station to block charging
* (Sneak-L8) optimized strategy for battery charging
* (Sneak-L8) node.js >= 20 required

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