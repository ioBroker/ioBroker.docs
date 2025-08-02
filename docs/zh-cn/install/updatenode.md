---
title: 更新 NodeJS
lastChanged: 11.08.2023
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/install/updatenode.md
hash: tJGX8RGXf39O/2BqWaP41YGMCp6Gq1+N03L+zh/H5MI=
---
# Node.js 更新
| js 控制器 | Node.js | npm |
| ------ | ----------- | ------------- |
| < 4.x | 12.x、14.x、16.x | 6.x |
| 4.x | 12.x、14.x、16.x | 6.x、7.x、8.x |
| 5.x | 16.x、18.x、20.x | 8.x、9.x |

## 为什么要更新这个？
与许多开源技术一样，Node.js 正在快速发展。
提高**稳定性**和**安全性**甚至添加**新功能**的更新会定期出现。

ioBroker 在没有 Node.js 的情况下无法工作，有关详细信息请参见[建筑学](https://www.iobroker.net/#de/documentation/basics/architecture.md)。
如果您想了解有关 Node.js 的更多信息，请参见[维基百科 Node.js](https://de.wikipedia.org/wiki/Node.js)。

?> **更改 Node.js 版本时，必须检查某些要求，并在必要时提前更正。
请注意安装所在路径。**

＃＃＃ 程序
#### 1 - 检查情况
- 版本和路径
- 操作系统
-js控制器
- 适配器

<details><summary>为什么需要检查</summary>

- 哪个版本，最重要的是安装所在的目录

- 在 Raspi 环境中，甚至经常使用基于“Debian jessie”或“Debian wheezy”的较旧系统。对于他们来说，没有什么比 Nodejs 10 更高的了，如有必要，可以更新操作系统。

- 检查安装了哪个 js-controller 版本（也可以在管理中的主机选项卡上看到）。

对于 js-controller 3.x 之前的版本，如果可能，请先更新 js-controller。最好至少3.2！例如，论坛中有这个[贡献](https://forum.iobroker.net/topic/42385/js-controller-3-2-jetzt-im-stable)。

- 为确保更新后不出现不兼容或问题，您应检查系统上的所有适配器并在必要时进行更新。

最好通过管理员、变更日志或相应适配器的 GitHub 检查适配器自述文件，以查看已安装的适配器版本是否明确支持计划的 Node.js 版本。

</详情>

#### 2 - 创建备份
在对系统进行任何更改之前，必须创建备份。根据系统的不同，有不同的选项。建议使用 BackitUp 适配器或命令行命令。
备份应该是最新的，以便尽可能不丢失数据。

#### 3 - 更新适配器
系统中使用的适配器应与新的 Node.js 版本兼容；它们可能需要更新。

#### 4 - 停止 ioBroker
ioBroker 使用其自己的控制台命令或通过系统服务管理停止

#### 5 - 检查进程是否仍在运行
这通常会终止所有进程。为了安全起见，您应该再次检查是否没有进程（适配器、备份）实际在运行。您还可以使用“top”等工具来检查以“io”开头的进程是否仍然存在。开始。

#### 6 - Node.js 更新
下一步是将 Node.js 更新到所需的新版本。
但是，更新会根据安装的操作系统而有所不同，请参阅说明

?> 节点包管理器（简称 `npm`）也将更新；这可能需要重置为 npm v6.x，直到 js-controller 版本 3，具体取决于所使用的 Node.js 版本。从 js-controller 版本 4 开始，还支持 npm v8.x/9.x。

#### 7 - 检查版本和路径
更新完成后，再次检查路径和安装的版本。

#### 8 - 运行 ioBroker 修复程序
由于如开头所述，Node.js 的安装会对系统进行一些更改，因此之后需要运行 ioBroker 修复程序。
除此之外，这会恢复 ioBroker 操作所需的安全设置，并检查和更正所有授权。

#### 9 - 启动 ioBroker
使用的一些 JavaScript 模块包含需要编译的部分。此过程发生在安装过程中。
编译后，这些模块与 Node.js 版本绑定。因此，更新后，必须重新编译这些部分。
自 js-controller 3.0 版以来，已经尝试识别包含此类部分的适配器并自动重建它们。
此过程可能需要一些时间，并且受影响的适配器可能会重新启动多次。这可以在日志文件中观察到。最简单的方法是在终端中使用“`iob logs --watch | uniq `”

<details><summary>自动重建</summary>

ioBroker 自动尝试检测因需要更新而未启动的适配器。这样可以识别典型的错误消息，并且 ioBroker 尝试进行相应的更新。首先，对受影响的适配器进行“重建”，如果这没有帮助，则更新适配器依赖项。因此，适配器可能会重新启动多次。这里请耐心等待！只有当适配器保持永久红色并且日志显示重建不起作用时，您才采取行动！

</详情>

<details><summary>手动重建</summary>

如果自动重建不起作用，可以手动执行，请参阅故障排除。

</详情>

<details><summary>特殊情况（例如串口）</summary>

不幸的是，在某些特殊情况下，即使上述选项也无法完成重建，其中之一就是串行端口。

例如，日志可能如下所示（即使在所有重建尝试之后）。

<details><summary>日志</summary>

![日志](../../de/install/media/Log-Update_NodeJS.jpg)

</详情>

还有其他错误消息，但它们都是同一件事。
最简单的选择是在 **正确的** 目录中手动重建。
在这种情况下，查找带有“绑定”的目录 - 上面是 */opt/iobroker/node_modules/serialport/node_modules/bindings ...* 在较新的版本中，它也可以是 */opt/iobroker/node_modules/串行端口/node_modules /@串行端口/绑定*。

然后进入该目录并执行`npm install --omit=dev`。然后再次重新启动适配器。

另一种情况是带有画布模块（可能是 echarts 或 Mihome-vacuum）的适配器，可能会出现问题。

</详情>

## Debian/Ubuntu 说明
#### 1 - 检查版本和路径
```
sudo ln -s /usr/bin/node /usr/bin/nodejs &> /dev/null
type -p nodejs node npm npx corepack && nodejs -v && node -v && npm -v && npx -v && corepack -v

```

- 输出

```
/usr/bin/nodejs
/usr/bin/node
/usr/bin/npm
/usr/bin/npx
/usr/bin/corepack
v18.15.0
v18.15.0
9.6.0
9.6.0
0.19.0
```

重要的是：nodejs在/usr/bin中node在/usr/bin中npm在/usr/bin中npx在/usr/bin中corepack在/usr/bin中以及nodejs和node的版本号截至 npm 和 npx 均同意。

#### 2 - 备份
```
iobroker backup
```

- 替代[选项](https://www.iobroker.net/#de/documentation/config/backup.md)

#### 3 - 更新适配器
- 说明可以在[管理适配器](https://www.iobroker.net/#de/documentation/tutorial/adapter.md)中找到

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
- 有关 [Node.Js] 的详细信息(https://github.com/nodesource/distributions#installation-instructions)

```
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

- 对于其他 Node.js 版本，只需将 URL 中的 18 替换为其他版本号即可。

!> 自 2023 年 3 月起，ioBroker 建议使用 Node.js 版本 18！

!> 不得使用奇怪的 Node.js 版本。

#### 7 - 检查版本/路径
```
type -p nodejs node npm npx corepack && nodejs -v && node -v && npm -v && npx -v && corepack -v
```

#### 8 - 运行 iobroker 修复程序
```
iobroker fix
```

#### 9 - 启动 ioBroker
```
 iobroker start
 ```

## Windows 说明
Node.js 通过执行 [Windows安装程序](./windows.md) 进行更新。

## Docker 使用说明
- Node.js 通常通过将容器更新为新版本的 [Docker 映像](https://hub.docker.com/r/buanet/iobroker/tags) 来完成。
- 有关 iobroker 容器的详细过程和更多详细信息，请访问 [buanet](https://smarthome.buanet.de/2020/10/iobroker-docker-container-updates-upgrades/)。

## 问题解决
### 手动重建
- 有这个

```
iobroker rebuild <adaptername>
```

- 如果这还不够

```
iobroker rebuild <adaptername> --install
```

- 只需在 shell 中手动运行即可。理想情况下，一切都应该自动完成。

?> 只要 js 控制器低于版本 4，即使在主要版本中进行了 Node.js 更新，也必须执行 [ioBroker 修复程序](https://www.iobroker.net/#de/documentation/install/linux.md)。
使用版本 4 中的未来 js 控制器，重建将完全自动处理。
不再支持手动重建。