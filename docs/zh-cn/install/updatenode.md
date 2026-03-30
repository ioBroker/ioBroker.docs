---
title: 更新 NodeJS
lastChanged: 04.10.2025
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/install/updatenode.md
hash: 6RUWTdFc8Gx0Oh983zD6Bll/WAeCUCD7b80X91zFBNo=
---
# Node.js 更新
| js 控制器 | Node.js | npm |
| ------ | ----------- | ------------- |
| < 4.x | 12.x, 14.x, 16.x | 6.x |
| 4.x | 12.x、14.x、16.x | 6.x、7.x、8.x |
| 5.x | 16.x、18.x、20.x | 8.x、9.x |
| **6.x** | **18.x、20.x、22.x** | **8.x、9.x、10.x** |
| **7.x** | **18.x, 20.x, 22.x, (24.x)** | **8.x, 9.x, 10.x, 11.x** |

## 为什么需要进行此次更新？
没有 Node.js，ioBroker 将无法运行；详情请参阅 [建筑学](https://www.iobroker.net/#de/documentation/basics/architecture.md)。

有关 Node.js 的更多信息，请参阅 [维基百科 Node.js](https://de.wikipedia.org/wiki/Node.js)。

与许多开源技术一样，Node.js 发展迅速。

提升稳定性、增强安全性，甚至添加新功能的更新都会定期发布。

Node.js 22.x 是目前 ioBroker 安装的推荐版本。该版本自 2024 年 10 月起处于长期支持 (LTS) 状态，并将持续支持至 2027 年 4 月。

ioBroker 社区已正式推荐此版本，命令 `iob nodejs-update` 会自动安装推荐版本。

Node.js 24.x 计划于 2025 年 10 月升级为长期支持 (LTS) 版本，并将持续支持至 2028 年 4 月。

虽然此版本现已可用，但建议仅在 LTS 升级后才将其用于生产环境。

升级 Node.js 版本时，必须事先检查并修正某些先决条件（如有必要）。

务必注意安装路径。

**重要通知（2025 年 10 月）：** Node.js 18.x 已于 2025 年 4 月停止维护，将不再接收安全更新。**Node.js 22.x 是目前推荐的长期支持版本 (LTS)，** 请使用该版本。

#### 推荐的更新方法
对于已安装的 ioBroker，最简单的方法是使用集成的更新命令：

```
iob nodejs-update
```

＃＃＃ 程序
#### 1 - 检查情况
版本和路径
- 操作系统
- js控制器
- 适配器

<details><summary>为什么要进行检查？</summary>

为了确保所有组件与新的 Node.js 版本兼容，并且安装能够正常工作，需要注意的是，不同的 JS 控制器版本支持不同的 Node.js 版本，并非所有适配器都能自动兼容新版本。

- 安装的是哪个版本，以及最重要的，安装在哪个目录中
在树莓派环境中，基于“Debian Jessie”或“Debian Wheezy”的旧系统仍然很常用。这些系统最高只支持Node.js 10版本；或许可以尝试更新操作系统。
- 检查已安装的 js-controller 版本（也可在管理面板的“主机”选项卡中查看）。对于 js-controller 3.x 之前的版本，请尽可能先更新 js-controller。理想情况下，至少更新到 3.2 版本！

例如，论坛中有这个 [贡献](https://forum.iobroker.net/topic/42385/js-controller-3-2-jetzt-im-stable)。

为避免更新后出现不兼容或问题，您应该检查系统上的所有适配器，并在必要时进行更新。

最好通过管理员、变更日志或相应适配器的 GitHub 查看适配器自述文件，以确认已安装的适配器版本是否明确支持计划的 Node.js 版本。

</details>

#### 2 - 创建备份
在对系统进行任何更改之前，必须先创建备份。根据系统的不同，有多种备份选项。建议使用 BackitUp 适配器或 [命令行命令](https://www.iobroker.net/#de/documentation/config/cli.md)。备份应为近期备份，以最大程度地减少数据丢失。

#### 3 - 更新适配器
系统中使用的适配器应与新的 Node.js 版本兼容；它们可能需要更新。

#### 4 - 停止 ioBroker
可以使用 ioBroker 自身的控制台命令或通过系统服务管理来停止 ioBroker。

#### 5 - 检查是否还有进程在运行
这通常会终止所有进程。但是，为了安全起见，您应该再次检查是否还有进程（例如适配器、备份等）仍在运行。您还可以使用类似“top”的工具来检查是否还有以“io.”开头的进程。

#### 6 - Node.js 更新
下一步是将 Node.js 更新到所需的新版本。但是，更新过程会因已安装的操作系统而异；请参阅相关说明。

Node 包管理器（简称 `npm`）也会自动更新。

#### 7 - 检查版本和路径
更新完成后，系统会再次检查路径和已安装版本。

#### 8 - 运行 ioBroker 修复程序
如前所述，安装 Node.js 会对系统进行一些更改，因此之后需要运行 [ioBroker修复程序](https://www.iobroker.net/#de/documentation/trouble/install_fixer.md)。此操作会恢复 ioBroker 正常运行所需的安全设置，并检查和更正所有权限。

#### 9 - 启动 ioBroker
某些 JavaScript 模块包含需要编译的组件。此过程发生在安装过程中。编译这些模块会将它们与 Node.js 版本绑定。因此，更新后，这些组件必须重新编译。自 js-controller 3.0 版本起，系统会尝试检测包含此类组件的适配器，并自动执行重建。此过程可能需要一些时间，受影响的适配器可能会多次重启。您可以在日志文件中查看此情况。最简单的方法是在终端中使用命令 ``iob logs --watch | uniq`` 来完成此操作。

<details><summary>自动重建</summary>

自 js-controller 3.0 版本起，带有原生模块的适配器会被自动检测，并自动进行重新构建。此过程可在日志中查看，耗时几分钟，具体取决于系统配置。

ioBroker 会自动尝试识别因需要更新而无法启动的适配器。其工作原理是识别典型的错误消息并尝试相应的更新。首先，系统会重建受影响的适配器。如果重建后问题仍然存在，则会更新适配器的依赖项。因此，适配器可能会多次重启。请耐心等待！仅当适配器始终显示红色且日志表明重建失败时才需要采取操作。

</details>

<details><summary>手动重建</summary>

如果自动重建失败，可以手动重建所有适配器：

```bash
iobroker rebuild
```

或者完全重新安装：

```bash
iobroker rebuild --install
```

如果自动重建不起作用，可以手动执行重建；请参阅故障排除。

</details>

<details><summary>特殊情况（例如串口）</summary>

某些适配器，例如串口适配器，需要特殊处理。这些适配器可能需要手动重新安装。

```bash
iob install serialport
```

遗憾的是，有些特殊情况下，即使采用上述方法也无法完成重建；其中之一就是 Serialport。

日志文件可能如下所示（即使在所有重建尝试之后）。

还有其他一些错误信息，但它们都指向同一个问题。

最简单的解决方法是在**正确的**目录中手动重新构建。

在这种情况下，请查找包含“bindings”的目录——在上面的例子中，它是 */opt/iobroker/node_modules/serialport/node_modules/bindings...*。在新版本中，它可能类似于 */opt/iobroker/node_modules/serialport/node_modules/@serialport/bindings*。

然后切换到该目录并执行`npm install --omit=dev`。之后，重启适配器。

另一种情况涉及带有 canvas 模块的适配器（例如 echarts 或 Mihome-vacuum），这些适配器可能会出现问题。

</details>

## Debian/Ubuntu 使用说明
#### 1 - 检查版本和路径
```
sudo ln -s /usr/bin/node /usr/bin/nodejs &> /dev/null
type -p nodejs node npm npx corepack && nodejs -v && node -v && npm -v && npx -v && corepack -v
```

- 版本

```
/usr/bin/nodejs
/usr/bin/node
/usr/bin/npm
/usr/bin/npx
/usr/bin/corepack
v22.x.x
v22.x.x
10.x.x
10.x.x
0.x.x
```

重要提示：nodejs 位于 /usr/bin，node 位于 /usr/bin，npm 位于 /usr/bin，npx 位于 /usr/bin，corepack 位于 /usr/bin，并且 nodejs 和 node 以及 npm 和 npx 的版本号相同。

#### 2 - 备份
```
iobroker backup
```

- 其他[选项](https://www.iobroker.net/#de/documentation/config/backup.md)

#### 3 - 更新适配器
相关说明请参见[管理适配器](https://www.iobroker.net/#de/documentation/tutorial/adapter.md)

```bash
iob update
```

#### 4 - 停止 ioBroker
```
iobroker stop
```

#### 5 - 检查 ioBroker 进程
```
ps aux | grep 'io\|PID'
```

- 和

```
ps aux | grep 'backup\|PID'
```

如果流程仍在进行中

```
sudo kill -9 [PROZESS-ID]
```

或者终止所有 ioBroker 进程：

```bash
sudo pkill -f iobroker
sudo pkill -f "io\."
```

#### 6 - Node.js 更新
方法 A：ioBroker 自带的更新命令（推荐用于 2025 年）

```bash
# Direktes Update auf empfohlene Version (22.x)
iob nodejs-update

# Oder spezifische Version
iob nodejs-update 22
```

方法二：NodeSource 仓库

- 关于 [Node.js](https://github.com/nodesource/distributions#installation-instructions) 的详细信息

```
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
```

- 对于其他 Node.js 版本，只需将 URL 中的 `22` 替换为其他版本号即可。

**截至 2025 年 10 月，ioBroker 推荐使用 Node.js 22.x 版本！**

!> **请勿使用奇数版本的 Node.js。**

!> **Node.js 18.x 已停止维护（自 2025 年 4 月起），不应再使用。**

#### 7 - 检查版本/路径
```
type -p nodejs node npm npx corepack && nodejs -v && node -v && npm -v && npx -v && corepack -v
```

#### 8 - 执行 iobroker 修复程序
```
iobroker fix
```

#### 9 - 启动 ioBroker
```
iobroker start
```

## Windows 使用说明
通过运行 Windows Installer 来更新 Node.js。

**Windows 系统推荐步骤（2025）：**

1. 从 [nodejs.org](https://nodejs.org) 下载最新的 Node.js Windows 安装程序（版本 22.x LTS）。
2. 通过服务管理器或命令行停止 ioBroker 服务
3. **运行安装程序**（自动更新）
4. **运行 ioBroker Fixer：** `iobroker fix`
5. 启动 ioBroker

**Windows 系统的替代方案：** 使用适用于 Linux 的 Windows 子系统 (WSL2) 和 Ubuntu，然后按照 Linux 说明进行操作。

## Docker 指南
- Node.js 通常是通过将容器更新到新版本的 Docker 镜像来进行更新的。
- 有关 iobroker 容器的详细说明和更多详细信息，请访问 [buanet](https://docs.buanet.de/)。

问题解决
### 手动重建
- 这方面有相关信息。

```
iobroker rebuild
```

如果这还不够的话

```
iobroker rebuild --install
```

- 只需在 shell 中手动执行即可。理想情况下，这应该可以实现所有操作的自动化。

此命令将完全重新安装所有 Node 模块，应该可以解决 Node.js 更新后的大部分问题。

### 常见问题（2025）
**“nodejs 未正确安装”**

```bash
# Lösung: Fixer ausführen
iobroker fix

# Falls das nicht hilft, Node.js neu installieren
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
```

**更新后出现 NPM 错误**

```bash
# NPM Cache leeren
npm cache clean --force

# Node modules neu installieren
cd /opt/iobroker
rm -rf node_modules
npm install
```

更新后适配器无法工作

```bash
# Einzelne Adapter neu installieren
iob install [ADAPTER-NAME]

# Oder alle Adapter rebuilden
iobroker rebuild --install
```

权限问题

```bash
# Berechtigungen korrigieren (Linux)
sudo chown -R iobroker:iobroker /opt/iobroker
iobroker fix
```

### 诊断命令
```bash
# Umfassende Systemdiagnose
iob diag

# Node.js Installation prüfen
which node
which npm
ls -la $(which node)
node -v
npm -v

# ioBroker Status
iob status
iob list instances
```

只要 JS 控制器版本低于 4，即使在 Node.js 主版本更新期间，也必须执行 `[ioBroker修复程序](https://www.iobroker.net/#de/documentation/install/linux.md)` 命令。

从未来的 JS 控制器版本 4 开始，重新构建将完全自动完成。