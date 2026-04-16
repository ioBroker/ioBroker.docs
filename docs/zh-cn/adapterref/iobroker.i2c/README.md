---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.i2c/README.md
title: ioBroker.i2c
hash: kaRpJw8uhRiNxJQHOH78Wl3zDTFIKm7jUoSe3Ybd/0A=
---
![标识](../../../en/adapterref/iobroker.i2c/admin/i2c.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.i2c.svg)
![下载](https://img.shields.io/npm/dm/iobroker.i2c.svg)
![安装数量](https://iobroker.live/badges/i2c-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/i2c-stable.svg)
![NPM](https://nodei.co/npm/iobroker.i2c.png?downloads=true)

# IoBroker.i2c
**测试：** ![测试与发布](https://github.com/UncleSamSwiss/ioBroker.i2c/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 i2c 适配器
通过 I2C 总线与设备通信。

## 开发人员手册
本部分内容仅供开发者使用，之后可以删除。

### 免责声明
使用公司名称或徽标时，请务必考虑版权和商标问题，并在您的 README 文件中添加免责声明。

您可以查看其他适配器的示例，或在开发者社区中寻求帮助。未经许可使用公司名称或徽标可能会导致法律问题。

＃＃＃ 入门
您即将完成，只剩下几个步骤了：

1. 在 GitHub 上创建一个名为 `ioBroker.i2c` 的新仓库
1. 将当前文件夹初始化为新的 Git 仓库：

```bash
git init -b master
git add .
git commit -m "Initial commit"
```

1. 将本地仓库与 GitHub 上的仓库链接起来：

```bash
git remote add origin https://github.com/UncleSamSwiss/ioBroker.i2c
```

1. 将所有文件推送到 GitHub 仓库：

```bash
git push origin master
```

1. 在 https://github.com/UncleSamSwiss/ioBroker.i2c/settings/secrets 下添加一个新的密钥。该密钥必须命名为 `AUTO_MERGE_TOKEN`，并且包含一个具有推送权限的个人访问令牌，例如您自己的令牌。您可以在 https://github.com/settings/tokens 下创建一个新的令牌。

1. 前往 [main.js](main.js) 开始编程！

### 最佳实践
我们收集了一些关于 ioBroker 开发和编程的实用技巧。如果您是 ioBroker 或 Node.js 的新手，不妨看看。如果您已经经验丰富，也建议您浏览一下——或许能学到一些新东西 :)

### 状态角色
创建状态对象时，务必使用正确的角色。角色定义了可视化工具和其他适配器应如何解释该状态。有关可用角色及其含义的列表，请参阅 [状态角色文档](https://www.iobroker.net/#en/documentation/dev/stateroles.md)。

**重要提示：**请勿自行创建自定义角色名称。如果您需要的角色不在官方列表中，请联系 ioBroker 开发者社区，以获取有关添加新角色的指导和讨论。

### `package.json`中的脚本
为了方便起见，我们预定义了几个 npm 脚本。您可以使用 `npm run <scriptname>` 运行它们。

| 脚本名称 | 描述 |
| `check` | 对您的代码执行类型检查（不编译任何内容）。 |
| `test:ts` | 执行您在 `*.test.ts` 文件中定义的测试。 |
| `test:package` | 确保您的 `package.json` 和 `io-package.json` 有效。 |
| `test:integration` | 使用 ioBroker 的实际实例测试适配器启动。 |
| `test` | 对软件包文件和您的测试执行最小测试运行。 |
| `lint` | 运行 `ESLint` 来检查您的代码是否存在格式错误和潜在错误。 |
| `translate` | 将适配器中的文本翻译成所有必需的语言，更多详情请参见 [`@iobroker/adapter-dev`](https://github.com/ioBroker/adapter-dev#manage-translations)。 |
| `release` | 创建新版本，详情请参见 [`@alcalzone/release-script`](https://github.com/AlCalzone/release-script#usage)。 |
| `release` | 创建新版本，详情请参阅 [`@alcalzone/release-script`](https://github.com/AlCalzone/release-script#usage)。 |

### 写作测试
如果运用得当，代码测试至关重要，因为它能让你在修改代码时更有信心，同时又能准确地知道何时以及如何出现问题。关于测试驱动开发，可以阅读这篇文章：https://hackernoon.com/introduction-to-test-driven-development-tdd-61a13bc92d92。

虽然在编写代码之前先编写测试乍一看可能有些奇怪，但它的优势显而易见。

该模板提供了适配器启动和包文件的基本测试。

建议您添加自己的测试用例。

### 发布适配器
使用 GitHub Actions，您可以启用 npm 自动发布功能，每当您推送符合 `v<major>.<minor>.<patch>` 格式的新 Git 标签时，npm 都会自动发布新版本。我们**强烈建议**您这样做。具体步骤请参见 `.github/workflows/test-and-release.yml`。

由于您已经安装了发布脚本，因此只需调用以下代码即可创建新版本：

```bash
npm run release
```

发布脚本的其他命令行选项在[发布脚本文档](https://github.com/AlCalzone/release-script#command-line)中进行了说明。

要将您的适配器发布到 ioBroker 中，请参阅 [ioBroker.repositories](https://github.com/ioBroker/ioBroker.repositories#requirements-for-adapter-to-get-added-to-the-latest-repository) 的文档。

### 在本地 ioBroker 安装上手动测试适配器
为了在不发布的情况下将适配器安装到本地，建议执行以下步骤：

1. 如果您还没有 GitHub 仓库，请创建一个用于存放适配器的仓库。
1. 将你的代码推送到 GitHub 仓库
1. 使用 ioBroker 管理界面或命令行从 GitHub 安装适配器：
- **通过管理界面**：转到“适配器”选项卡，点击“自定义安装”（GitHub 图标），然后输入您的存储库 URL：

```
https://github.com/UncleSamSwiss/ioBroker.i2c
```

您还可以通过在末尾添加 `#branchname` 来从特定分支安装：

```
https://github.com/UncleSamSwiss/ioBroker.i2c#dev
```

- **通过命令行**：使用 `iob` 命令安装：

```bash
iob url https://github.com/UncleSamSwiss/ioBroker.i2c
```

或者来自特定分支：

```bash
iob url https://github.com/UncleSamSwiss/ioBroker.i2c#dev
```

后续更新：

1. 将你的更改推送到 GitHub
1. 重复上述安装步骤（通过管理界面或`iob url`命令）以更新适配器

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 2.0.0 (2026-04-01)

- (UncleSamSwiss) Allow to add/remove devices without restarting the adapter
- (UncleSamSwiss) Add support for Device Manager
- (UncleSamSwiss) Change to JSON Config
- (UncleSamSwiss) Minimum required Node.js version is now 20

### 1.2.1 (2021-10-13)

- (UncleSamSwiss) Reading multiple values from I2C into states is now faster. This should increase the polling frequency for most devices.

### 1.2.0 (2021-03-02)

- (UncleSamSwiss) Added support for MCP342x family (#44).
- (UncleSamSwiss) Added proper error handling on all periodic I2C operations (#112).

### 1.1.1 (2020-11-29)

- (UncleSamSwiss) Fixed issue with device search not working (#53).

### 1.1.0 (2020-11-05)

- (UncleSamSwiss) Added support for SX1507, SX1508 and SX1509.
- (UncleSamSwiss) Added support for MCP4725.
- (UncleSamSwiss) Added support for HMC5883L and QMC5883L.
- (UncleSamSwiss) Added support for Adafruit STEMMA Soil Sensor.
- (UncleSamSwiss) Added support for INA219.
- (UncleSamSwiss) Changed polling interval of ADS1x15 to milliseconds.
- (UncleSamSwiss) Fixed several bugs.

### 1.0.1 (2020-10-27)

- (UncleSamSwiss) Removed unneeded files in NPM package

### 1.0.0 (2020-10-27)

- (UncleSamSwiss) Updated to the latest development tools and changed to the TypeScript language
- (UncleSamSwiss) Rewrote entire UI in React with TypeScript

### 0.0.8 (2020-05-26)

- (Peter Müller) Added support for Generic device.
- (Peter Müller) Added support for `read` and `write` commands in scripts using `sendTo`.
- (Peter Müller) Added support for interrupts on PCF8574, MCP23008, MCP23017 devices.

### 0.0.7 (2020-01-19)

- (CC1337) Added support for PCA9685.

### 0.0.6 (2019-03-17)

- (UncleSamSwiss) Added support for BME280.
- (UncleSamSwiss) Added support for ADS1015 / ADS1115.

### 0.0.5 (2019-01-12)

- (UncleSamSwiss) Added support for MCP23008.

### 0.0.4 (2018-07-23)

- (UncleSamSwiss) Improved stability of MCP23017.
- (Apollon77) Latest ioBroker utils and testing including node 10.

### 0.0.3 (2017-11-12)

- (UncleSamSwiss) Added support for MCP23017.

### 0.0.2 (2017-07-30)

- (UncleSamSwiss) Added support for inverting PCF8574 inputs and outputs.

### 0.0.1 (2017-07-27)

- (UncleSamSwiss) Initial version

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

Copyright 2026 UncleSamSwiss

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.