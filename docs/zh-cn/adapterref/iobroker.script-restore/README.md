---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.script-restore/README.md
title: ioBroker.script-restore
hash: lmh/JMN6R7yz8kyrDMfpGztJz6FqAXQQ1KUl8Zk2sgQ=
---
![标识](../../../en/adapterref/iobroker.script-restore/admin/script-restore.svg)

![NPM 版本](https://img.shields.io/npm/v/iobroker.script-restore.svg)
![下载](https://img.shields.io/npm/dm/iobroker.script-restore.svg)
![安装数量](https://iobroker.live/badges/script-restore-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/script-restore-stable.svg)
![NPM](https://nodei.co/npm/iobroker.script-restore.png?downloads=true)

# IoBroker.script-restore
**测试：** ![测试与发布](https://github.com/ipod86/ioBroker.script-restore/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的脚本恢复适配器
浏览 ioBroker 备份存档中的单个脚本，而无需恢复整个备份。

＃＃ 描述
脚本恢复适配器会在 ioBroker 管理界面中添加一个选项卡，方便您打开备份存档并浏览其中包含的所有 JavaScript、TypeScript、Blockly 和规则脚本。您可以查看每个脚本的源代码，并单独下载或复制。

该存档完全在浏览器中解析——浏览过程中不会将任何文件写入磁盘。

＃＃ 特征
- 直接从 ioBroker 管理选项卡浏览备份存档
- 从备份目录加载本地备份文件（默认：`/opt/iobroker/backups`）
- 直接从您的计算机上传压缩文件
- 支持的格式：`.tar.gz`、`.tar`、`.json`、`.jsonl`
- 按文件夹组织的所有脚本的树状视图
- 按类型筛选脚本：JS、TypeScript、Blockly、规则
- 对脚本名称、路径和源代码进行全文搜索
- 查看源代码（JS/TS/Blockly/规则）
- 将源代码复制到剪贴板或下载为文件
- **选择多个脚本**（勾选☐复选框），然后将它们下载为 ZIP 压缩包。
- **从脚本恢复导出文件或 JS 适配器自身的备份文件（`2026-07-17-scripts.zip`）导入 ZIP 存档文件**
- 完全基于浏览器的解析——上传无需服务器往返
- **直接将脚本恢复到 ioBroker 中**，并可配置后缀（默认值：`_rcvr`）——现有脚本不会被覆盖。

＃＃ 配置
| 设置 | 说明 | 默认值 |
|---------|-------------|---------|
| 备份路径 | ioBroker 备份文件存储目录 | `/opt/iobroker/backups` |

＃＃ 用法
### 加载本地备份文件
1. 在 ioBroker 管理后台打开“脚本恢复”选项卡
2. 点击“本地文件”下拉菜单
3. 从列表中选择备份文件——脚本会自动加载。

### 上传备份文件
1. 在 ioBroker 管理后台打开“脚本恢复”选项卡
2. 点击“上传压缩文件”，然后从您的计算机中选择一个文件。
3. 浏览器解析压缩文件，并显示所有脚本。

### 查看和下载剧本
- 点击树状结构中的脚本即可查看其源代码
- 使用“复制”按钮将源内容复制到剪贴板
- 使用**下载**按钮将脚本保存为文件
- 点击脚本左侧的☐即可选中它——选择多个脚本后，点击**ZIP**即可将它们全部下载到一个压缩包中。

## 支持的备份格式
| 格式 | 描述 |
|--------|-------------|
| `.tar.gz` | 标准 ioBroker 备份 (`iobroker_YYYY-MM-DD-HH-mm_SS_backupiobroker.tar.gz`) |
| `.json` | JavaScript 适配器脚本导出 |
| `.jsonl` | ioBroker 对象导出（JSON 行） |
| `.zip` (scripts.zip) | 脚本恢复 ZIP 导出（包含 `.js`/`.ts` 文件） |
| `.zip`（JS适配器备份） | JS适配器内部备份（`YYYY-MM-DD-scripts.zip`，包含带有脚本元数据的`.json`文件） |
| `.zip`（JS适配器备份）| JS适配器内部备份（`YYYY-MM-DD-scripts.zip`，包含带有脚本元数据的`.json`文件）|

## Changelog
### 0.1.13 (2026-07-22)
* (winnyschuster) fix: correct folder indentation in script tree for deeply nested folders
* (ipod86) chore: update dev dependencies (@types/tar, @iobroker/testing, @types/node)

### 0.1.12 (2026-07-18)
* (ipod86) fix: add 30s timeout to all WebDAV operations
* (ipod86) fix: remove redundant variable alias in handleListLocalFiles

### 0.1.11 (2026-07-18)
* (ipod86) fix: move @types/tar to devDependencies (W0050, W5060)

### 0.1.10 (2026-07-18)
* (ipod86) fix: replace shell tar command with pure Node.js tar library for Windows compatibility
* (ipod86) feat: test local backup path button with result feedback
* (ipod86) feat: suggest backup path button
* (ipod86) fix: jsonConfig sendTo result format validation

### 0.1.9 (2026-07-17)
* (ipod86) feat: checkbox multi-select for ZIP export — click ☐ to select, main click still views only
* (ipod86) feat: import scripts.zip (our adapter export) and JS adapter backup ZIP (2026-07-17-scripts.zip)
* (ipod86) fix: align script list item columns (checkbox, icon, name) with flex layout

### 0.1.8 (2026-07-15)
* (ipod86) fix: sanitize object IDs from backup paths to prevent invalid ioBroker state IDs
* (ipod86) fix: add 30s timeout to HTTP URL download
* (ipod86) fix: bundle jszip locally in admin tab — no CDN dependency
* (ipod86) fix: zip export now works in all browsers (script tag loading, DOM-append before click)
* (ipod86) fix: remove postinstall lifecycle script from package.json (E0093)

Older changelogs are available in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License
MIT License

Copyright (c) 2026 ipod86 <david@graef.email>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.