---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.google-spreadsheet/README.md
title: ioBroker.google-spreadsheet
hash: pAaiT8VT5xOS7LRS+dmUq09dTm8BShfsSGVVqdHbYXA=
---
![标识](../../../en/adapterref/iobroker.google-spreadsheet/admin/google-spreadsheet.png)

![GitHub 许可证](https://img.shields.io/github/license/ThomasPohl/ioBroker.google-spreadsheet)
![下载](https://img.shields.io/npm/dm/iobroker.google-spreadsheet.svg)
![GitHub 仓库大小](https://img.shields.io/github/repo-size/ThomasPohl/ioBroker.google-spreadsheet)
![GitHub提交活动](https://img.shields.io/github/commit-activity/m/ThomasPohl/ioBroker.google-spreadsheet)
![自最新版本发布以来的 GitHub 提交记录（按日期排序）](https://img.shields.io/github/commits-since/ThomasPohl/ioBroker.google-spreadsheet/latest)
![GitHub 最新提交](https://img.shields.io/github/last-commit/ThomasPohl/ioBroker.google-spreadsheet)
![GitHub 问题](https://img.shields.io/github/issues/ThomasPohl/ioBroker.google-spreadsheet)
![NPM 版本](https://img.shields.io/npm/v/iobroker.google-spreadsheet.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/google-spreadsheet-stable.svg)
![安装数量](https://iobroker.live/badges/google-spreadsheet-installed.svg)

# IoBroker.google-spreadsheet
</br> **版本：** </br> </br> **测试：** </br> [![测试和发布](https://github.com/ThomasPohl/ioBroker.google-spreadsheet/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/ThomasPohl/ioBroker.google-spreadsheet/actions/workflows/test-and-release.yml)

## IoBroker 的 google-spreadsheet 适配器
该适配器可用于自动与谷歌电子表格进行交互。

＃＃ 特征
* [向电子表格追加数据](features/append.md)
* [从电子表格中删除行](features/delete-rows.md)
* [创建工作表](features/create-sheet.md)
* [删除工作表](features/delete-sheet.md)
* [删除工作表](features/delete-sheets.md)
* [重复工作表](features/duplicate-sheet.md)
* [读取单元格](features/read-cell.md)
* [写入单元格](features/write-cell.md)
* [写入单元格](features/write-cells.md)

＃＃ 用法
＃＃＃ 设置
#### 启用 API 访问
1. 访问 [Google Cloud 控制台](https://console.cloud.google.com/flows/enableapi?apiid=sheets.googleapis.com)。

2. 创建或选择要与 API 一起使用的现有项目。

3. 为您的项目启用 Google Spreadsheet API。

#### 创建服务帐户
对于您在上一步中选择的项目，请按照以下步骤在 Google Cloud IAM 中创建一个新的服务帐号：

1. 导航至 [Google Cloud 控制台](https://console.cloud.google.com/iam-admin/iam) 中的 IAM 和管理页面。

2. 点击“服务帐户”，然后点击“创建服务帐户”。

3. 为服务帐户命名，并选择角色“项目”>“编辑”。

4. 点击“继续”进入下一步。

5. 在“密钥”选项卡上，单击“创建密钥”，然后选择格式为“JSON”。然后单击“继续”。

6. 您的私钥将自动生成并下载。请妥善保管此文件，因为您稍后会用到它。

#### 授予对电子表格的访问权限
打开您想要操作的电子表格，并将其共享给您新创建的服务帐户的电子邮件地址：

1. 在 Google 表格中打开所需的电子表格。

2. 点击右上角的“分享”。

3. 在“添加人员”字段中输入服务帐户的电子邮件地址，并授予其必要的权限（例如，“编辑”或“查看”）。

4. 点击“发送”完成分享过程。

#### 配置适配器实例
请将以下信息添加到 ioBroker 中适配器实例的配置中：

- **电子表格 ID** - 您可以在电子表格的 URL 中找到 ID。
- **服务帐户** - 您创建的服务帐户的电子邮件地址。
- **私钥** - 打开下载的 JSON 文件，找到文件中的私钥。仅复制以“-----BEGIN PRIVATE KEY-----”开头的部分。

![设置](../../../en/adapterref/iobroker.google-spreadsheet/img/settings.png)

#### 在 URL 中查找电子表格 ID
要查找 Google 表格文档 URL 中的“电子表格 ID”，请按照以下步骤操作：

1. 当您在网页浏览器中打开 Google Sheets 文档时，地址栏中的 URL 将类似于这样：

```
https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
```

2.“SPREADSHEET_ID”是URL中“/d/”和“/edit”部分之间的长串字符和数字。

### Blockly
使用现有模块自动与电子表格进行交互。

![Blockly](../../../en/adapterref/iobroker.google-spreadsheet/img/blockly-append.png)

## 故障排除
### 向 Google 表格发送数据时出错：错误：error:0909006C:PEM routines:get_name:no start line
将私钥复制到配置文件时，请确保其中不包含换行符（\n）。如果私钥中包含换行符（\n），请将其替换为普通的换行符。

### 向 Google 表格发送数据时出错：错误：调用者没有权限
请确保服务帐户拥有足够的权限来写入电子表格。请参阅上文“授予对电子表格的访问权限”部分。

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.6.0 (2025-12-26)
- (Thomas Pohl) Added deleteSheets functionality (delete multiple sheets in one call)
- (Thomas Pohl) Added blockly block for deleteSheets
- (Thomas Pohl) Add write cells functionality (write multiple cells in one call)
- (Thomas Pohl) Added blockly block for writeCells

### 0.5.0
* (Thomas Pohl) Minimum node.js version is now 20
* (Thomas Pohl) Display connection state

### 0.4.0
* (Thomas Pohl) The privateKey is saved now encrypted
* (Thomas Pohl) Support for node.js 22

### 0.3.1
* (Thomas Pohl) Fixed reading cells and added error handling

### 0.3.0
* (Thomas Pohl) Added writing of single cells
* (Thomas Pohl) Added reading of single cells
* (Thomas Pohl) Documentation for all features

### 0.2.0
* (Thomas Pohl) Parsing of private keys is now more robust

### 0.1.0
* (Thomas Pohl) Preparation for first stable release
* (Thomas Pohl) Improve logging + Code cleanup

## License

   Copyright (c) 2024-2025 Thomas Pohl

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.