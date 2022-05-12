---
title: 更新 NodeJS
lastChanged: 05.02.2022
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/install/updatenode.md
hash: DQTeytJpqltpLrFO/hbAsPe65ae0PWlctqjRtOgtwXc=
---
# Node.js 更新
| js 控制器 | Node.js | npm |
| ------ | ----------- | ------------- |
| < 4.x | 12.x、14.x、16.x | 6.x |
| 4.x | 12.x、14.x、16.x | 6.x、7.x、8.x |

## 为什么需要更新？
与许多开源技术一样，Node.js 正在迅速发展。
增加**稳定性**和**安全性**甚至添加**新功能**的更新会定期出现。

ioBroker 不能在没有 Node.js 的情况下工作，有关详细信息，请参阅 [建筑学](https://www.iobroker.net/#de/documentation/basics/architecture.md)。
如果您想了解有关 Node.js 的更多信息，请参阅[维基百科 Node.js](https://de.wikipedia.org/wiki/Node.js)。

?> **在Node.js版本变更的情况下，如有必要，必须提前检查和纠正某些要求。
请务必注意安装所在的路径。**

＃＃＃ 方法
#### 1 - 检查条件
- 版本和路径
- 操作系统
- js控制器
- 适配器

<details><summary>为什么需要检查？</summary>

- 哪个版本，最重要的是，安装位于哪个目录中

- 在 Raspi 环境中，经常使用基于“Debian jessie”或“Debian wheezy”的旧系统。对于他们来说，没有什么比 Nodejs 10 更高的了，如有必要，可以进行操作系统更新。

- 检查安装了哪个 js-controller 版本（在管理员的主机选项卡上也可见）。

对于 **before** js-controller 3.x 版本，请尽可能先更新 js-controller。最好至少3.2！例如，论坛中有这个[贡献](https://forum.iobroker.net/topic/42385/js-controller-3-2-jetzt-im-stable)。

- 为确保更新后没有不兼容或问题，您应该检查系统上的所有适配器并在必要时更新它们。

最好通过管理员、更改日志或相应适配器的 GitHub 中检查适配器自述文件，以查看已安装的适配器版本是否明确支持计划的 Node.js 版本。

</详情>

#### 2 - 创建备份
在对系统进行任何更改之前，必须创建备份。根据系统的不同，有不同的选项。建议使用 BackitUp Adapter 或命令行命令。
备份应该是最新的，这样就不会丢失任何数据。

#### 3 - 更新适配器
系统中使用的适配器应与新的 Node.js 版本兼容，如有必要，必须对其进行更新。

#### 4 - 停止 ioBroker
ioBroker 使用自己的控制台命令或系统服务管理停止

#### 5 - 检查进程是否仍在运行
这通常会终止所有进程。为了安全起见，您应该再次检查是否确实没有任何进程（适配器、备份）在运行。也可以使用“top”之类的工具来检查是否还有以“io”开头的进程。开球。

#### 6 - Node.js 更新
下一步是将 Node.js 更新到所需的新版本。
但是，更新根据安装的操作系统而有所不同，请参阅说明**注意**节点包管理器，简称`npm`，也会更新，这可能必须达到 js-controller 版本 3，具体取决于在要恢复到 npm v6.x 的 Node.js 版本上。从 js-controller 版本 4 开始，还支持 npm v7/8。

#### 7 - 检查版本和路径
更新完成后，再次检查路径和安装版本。

#### 8 - 运行 ioBroker 修复程序
由于 Node.js 的安装，如开头所述，对系统进行了一些更改，因此需要在之后运行 ioBroker 修复程序。
除其他外，这将恢复 ioBroker 操作所需的安全设置，并检查和更正所有授权。

#### 9 - 启动 ioBroker
一些使用的 JavaScript 模块包含必须编译的部分。此过程在安装期间进行。
通过编译这些模块绑定到 Node.js 版本。更新后，必须重新编译这些部分。
从 js-controller 版本 3.0 开始，尝试识别包含此类部件的适配器并自动执行重建。
此过程可能需要一些时间，并且受影响的适配器可能会重新启动多次。

<details><summary>自动重建</summary>

ioBroker 尝试自动检测由于需要更新而无法启动的适配器。这样做的方式是识别典型的错误消息，并且 ioBroker 会尝试相应地更新。首先，执行受影响适配器的“重建”，如果这没有帮助，则更新适配器依赖项。因此，适配器可能会重新启动几次。请在这里耐心等待！仅当适配器保持红色并且日志显示重建不起作用时才变为活动状态！

</详情>

<details><summary>手动重建</summary>

如果自动重建不起作用，可以手动执行，请参阅故障排除。

</详情>

<details><summary>特殊情况（例如串口）</summary>

不幸的是，在某些特殊情况下，上述选项也不进行重建，其中之一是串行端口。

日志可能看起来像这样（在所有重建尝试之后）。

<details><summary>日志</summary>

![日志](../../de/install/media/Log-Update_NodeJS.jpg)

</详情>

还有其他错误消息，但它们都归结为同一件事。
然后最简单的选择是在 **right** 目录中手动重建。
在这种情况下，查找带有“绑定”的目录 - 上面是 */opt/iobroker/node_modules/serialport/node_modules/bindings ...* 在较新的版本上，它也可以是 */opt/iobroker/node_modules/serialport /node_modules /@serialport/bindings*.

然后切换到这个目录，执行`npm install --production`。然后再次重新启动适配器。

另一种情况是带有画布模块的适配器（可能是 echarts 或 Mihome-vacuum），可能会出现问题。

</详情>

## Debian/Ubuntu 指南
#### 1 - 检查版本和路径
```
which nodejs node npm && nodejs -v && node -v && npm -v
```

- 输出

```
/usr/bin/nodejs
/usr/bin/node
/usr/bin/npm
v14.18.3
v14.18.3
6.14.15
```

#### 2 - 备份
```
iobroker backup
```

- 替代[可能性](https://www.iobroker.net/#de/documentation/config/backup.md)

#### 3 - 更新适配器
- 说明可在 [管理适配器](https://www.iobroker.net/#de/documentation/tutorial/adapter.md) 下找到

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

- 如果进程仍在运行

```
sudo kill -9 <ProzessID>
```

#### 6 - Node.JS 更新
- [Node.Js] 的详细信息（https://github.com/nodesource/distributions#installation-instructions）

```
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt install -y nodejs
```

- 对于 Node.js 16，只需将 URL 中的 14 替换为 16。

#### 7 - 检查版本/路径
```
which nodejs node npm && nodejs -v && node -v && npm -v
```

#### 8 - 运行 iobroker 修复程序
```
iobroker fix
```

#### 9 - 启动 ioBroker
```
 iobroker start
 ```

## 适用于 Windows 的说明
#### 1 - 检查版本（Windows 键 + R）
```
cmd.exe /C node -v & pause
```

#### 2 - 备份
```
iobroker backup
```

- 替代[可能性](https://www.iobroker.net/#de/documentation/config/backup.md)

#### 3 - 更新适配器
- 说明可在 [管理适配器](https://www.iobroker.net/#de/documentation/tutorial/adapter.md) 下找到

#### 4- 文件夹备份：
```
C:\Program Files\iobroker\deinhostname\nodejs
```

#### 5 - 停止 iobroker
```
iobroker stop
```

#### 6 - Node.js 更新
- 将 [Node.js](https://nodejs.org) 下载为存档，而不是 msi 文件
- 解压缩下载并将整个文件夹复制到现有文件夹：

```
C:\Program Files\iobroker\deinhostname\nodejs
```

- 将 **nodevars.bat** 文件从备份副本复制回文件夹：

```
C:\Program Files\iobroker\deinhostname\nodejs
```

#### 7 - 检查版本
```
cmd.exe /C node -v & pause
```

#### 8 - 运行 iobroker 修复程序
```
iobroker fix
```

#### 9 - 启动 ioBroker
```
iobroker start
```

## Docker 使用说明
- Node.js 通常通过将容器更新到新版本的 [Docker Image](https://hub.docker.com/r/buanet/iobroker/tags) 来完成。
- 有关 iobroker 容器的详细程序和更多详细信息，请参见 [buanet](https://smarthome.buanet.de/2020/10/iobroker-docker-container-updates-upgrades/)。

＃＃ 故障排除
### 手动重建
- 为此有

```
iobroker rebuild <adaptername>
```

- 如果这还不够

```
iobroker rebuild <adaptername> --install
```

- 只需在 shell 中手动运行它。理想情况下，一切都应该自动完成。

＃ 一个通知
?> 只要 js 控制器低于版本 4，[ioBroker 修复程序](https://www.iobroker.net/#de/documentation/install/linux.md) 也必须在主要版本中使用 Node.js 更新执行。
使用版本 4 中的未来 js 控制器，重建是完全自动处理的。
然后不再支持手动重建。