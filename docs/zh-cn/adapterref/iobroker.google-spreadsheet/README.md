---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.google-spreadsheet/README.md
title: ioBroker.google-电子表格
hash: zy+ofgh7dMJwoc0bOUlmGuQN5HzfEYHW+pBRxXwNzMg=
---
![标识](../../../en/adapterref/iobroker.google-spreadsheet/admin/google-spreadsheet.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.google-spreadsheet.svg)
![下载](https://img.shields.io/npm/dm/iobroker.google-spreadsheet.svg)
![安装数量](https://iobroker.live/badges/google-spreadsheet-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/google-spreadsheet-stable.svg)
![新平台](https://nodei.co/npm/iobroker.google-spreadsheet.png?downloads=true)

#ioBroker.google-电子表格
**测试：**![测试与发布](https://github.com/ThomasPohl/ioBroker.google-spreadsheet/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 google-spreadsheet 适配器
该适配器可用于自动与谷歌电子表格交互。

＃＃ 特征
* [将数据附加到电子表格]（features/append.md）
* [从电子表格中删除行](features/delete-rows.md)
* [创建工作表](features/create-sheet.md)
* [删除工作表](features/delete-sheet.md)
* [重复工作表](features/duplicate-sheet.md)
* [读取单元格](features/read-cell.md)
* [写入单元格](features/write-cell.md)

＃＃ 用法
＃＃＃ 设置
#### 启用 API 访问
1. 访问 [Google Cloud 控制台](https://console.cloud.google.com/flows/enableapi?apiid=sheets.googleapis.com)。

2. 创建或选择您希望与 API 一起使用的现有项目。

3. 为您的项目启用 Google 电子表格 API。

创建服务帐号
对于您在上一步中选择的项目，请按照以下步骤在 Google Cloud IAM 中创建一个新的服务帐号：

1. 导航到 [Google Cloud Console](https://console.cloud.google.com/iam-admin/iam) 中的 IAM 和管理页面。

2. 点击“服务帐户”，然后点击“创建服务帐户”。

3. 为服务帐号命名，并选择角色“项目”>“编辑者”。

4.点击“继续”进入下一步。

5. 在“密钥”选项卡上，单击“创建密钥”，并选择格式为“JSON”。然后单击“继续”。

6. 您的私钥将生成并自动下载。请妥善保存此文件，因为您稍后会需要它。

#### 授予电子表格的访问权限
打开您想要交互的电子表格，并将其与您新创建的服务帐户的电子邮件地址共享：

1. 在 Google 表格中打开所需的电子表格。

2.点击右上角的“分享”。

3. 在“添加人员”字段中输入服务帐户的电子邮件地址，并授予其必要的权限（例如“编辑”或“查看”）。

4. 点击“发送”即可完成分享。

#### 配置适配器实例
将以下信息添加到 ioBroker 中适配器实例的配置中：

- **电子表格 ID** - 您可以在电子表格的 URL 中找到该 ID。
- **服务账户** - 您创建的服务账户的电子邮件地址。
- **私钥** - 打开下载的 JSON 文件，并在文件中找到私钥。仅复制以“-----BEGIN PRIVATE KEY-----”开头的部分。

![设置](../../../en/adapterref/iobroker.google-spreadsheet/img/settings.png)

#### 在 URL 中查找电子表格 ID
要找到 Google 表格文档 URL 中的“电子表格 ID”，请按以下步骤操作：

1. 当您在网络浏览器中打开 Google Sheets 文档时，地址栏中的 URL 将如下所示：

```
https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
```

2.“SPREADSHEET_ID”是 URL 中“/d/”和“/edit”部分之间的一长串字符和数字。

### 块状
使用可用的块自动与您的电子表格交互。

![Blockly](../../../en/adapterref/iobroker.google-spreadsheet/img/blockly-append.png)

故障排除
### 向 Google 电子表格发送数据时出错：错误：错误：0909006C：PEM 例程：get_name：无起始行
将私钥复制到配置中时，请确保没有 \n。如果密钥中有 \n，请将其替换为正常的换行符

### 向 Google 电子表格发送数据时出错：错误：调用者没有权限
确保服务帐户具有足够的权限来写入电子表格。请参阅上面的“授予对电子表格的访问权限”部分。

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
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

   Copyright (c) 2024 Thomas Pohl

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.