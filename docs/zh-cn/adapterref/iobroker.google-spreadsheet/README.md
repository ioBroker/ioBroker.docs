---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.google-spreadsheet/README.md
title: ioBroker.google-电子表格
hash: pNNJabJ6O6XqQiqNx6Uq1ZsvnOEWJqn8HYgvg21zAsE=
---
![标识](../../../en/adapterref/iobroker.google-spreadsheet/admin/google-spreadsheet.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.google-spreadsheet.svg)
![下载](https://img.shields.io/npm/dm/iobroker.google-spreadsheet.svg)
![安装数量](https://iobroker.live/badges/google-spreadsheet-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/google-spreadsheet-stable.svg)
![国家公共管理](https://nodei.co/npm/iobroker.google-spreadsheet.png?downloads=true)

# IoBroker.google-spreadsheet
**测试：** ![测试与发布](https://github.com/ThomasPohl/ioBroker.google-spreadsheet/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的谷歌电子表格适配器
该适配器可用于自动与谷歌电子表格交互。

＃＃ 特征
* [将数据附加到电子表格](features/append.md)
* [从电子表格中删除行](features/delete-rows.md)
* [创建工作表](features/create-sheet.md)
* [删除工作表](features/delete-sheet.md)
* [重复表](features/duplicate-sheet.md)

＃＃ 用法
＃＃＃ 设置
#### 启用 API 访问
1. 访问 [Google Cloud Console](https://console.cloud.google.com/flows/enableapi?apiid=sheets.googleapis.com)。

2. 创建或选择您希望与 API 一起使用的现有项目。

3. 为您的项目启用 Google Spreadsheet API。

#### 创建服务帐户
对于您在上一步中选择的项目，请按照以下步骤在 Google Cloud IAM 中创建新的服务帐号：

1. 导航到 [Google Cloud Console](https://console.cloud.google.com/iam-admin/iam) 中的 IAM 和管理页面。

2. 单击“服务帐户”，然后单击“创建服务帐户”。

3. 提供服务帐户的名称，然后选择角色“项目”>“编辑器”。

4. 单击“继续”继续下一步。

5. 在“密钥”选项卡上，单击“创建密钥”并选择格式“JSON”。然后单击“继续”。

6. 您的私钥将会生成并自动下载。请妥善保管此文件，因为稍后您将需要它。

#### 授予对电子表格的访问权限
打开您想要交互的电子表格，并将其与您新创建的服务帐户的电子邮件地址共享：

1. 在 Google 表格中打开所需的电子表格。

2. 点击右上角的“分享”。

3. 在“添加人员”字段中输入服务帐户的电子邮件地址，并授予其必要的权限（例如“编辑”或“查看”）。

4. 单击“发送”完成共享过程。

#### 配置适配器实例
将以下信息添加到 ioBroker 中适配器实例的配置中：

- **电子表格 ID** - 您可以在电子表格的 URL 中找到该 ID。
- **服务帐户** - 您创建的服务帐户的电子邮件地址。
- **私钥** - 打开下载的 JSON 文件，然后在文件中找到私钥。仅复制以“-----BEGIN PRIVATE KEY-----”开头的部分。

#### 在 URL 中查找电子表格 ID
要在 Google 表格文档的 URL 中找到“电子表格 ID”，请按照以下步骤操作：

1. 当您在网络浏览器中打开 Google Sheets 文档时，地址栏中的 URL 将如下所示：

```
https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
```

2. “SPREADSHEET_ID”是 URL 的“/d/”和“/edit”部分之间的一长串字符和数字。

### 块状
使用可用的块自动与电子表格交互。

![块状](../../../en/adapterref/iobroker.google-spreadsheet/img/blockly-append.png)

＃＃ 故障排除
### 将数据发送到 Google 电子表格时出错：错误：错误：0909006C：PEM 例程：get_name：无起始行
将私钥复制到配置中时，请确保不存在 \n。如果key中有\n，请将其替换为正常换行符

### 向 Google 电子表格发送数据时出错：错误：调用者没有权限
确保服务帐户具有足够的权限来写入电子表格。请参阅上面的“授予对电子表格的访问权限”部分。

## Changelog
### 0.2.0
* (Thomas Pohl) Parsing of private keys is now more robust

### 0.1.0
* (Thomas Pohl) Preparation for first stable release
* (Thomas Pohl) Improve logging + Code cleanup

### 0.0.6

* (Thomas Pohl) Parameter validation

### 0.0.5

* (Thomas Pohl) Position for "duplicate sheet"

### 0.0.4

* (Thomas Pohl) Added "duplicate Sheet"

### 0.0.3

* (Thomas Pohl) Added "add Sheet"
* (Thomas Pohl) Added "remove Sheet"

### 0.0.2

* (Thomas Pohl) Added "delete rows"

### 0.0.1

* (Thomas Pohl) initial release

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

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

   Copyright 2023 Thomas Pohl

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.