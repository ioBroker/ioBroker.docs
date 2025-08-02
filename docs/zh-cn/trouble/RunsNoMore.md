---
title: ioBroker 不再运行
lastChanged: 06.06.2019
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/trouble/RunsNoMore.md
hash: Ga+TPCA7P3xhbRocb1+yR2lK4xmO52LrGRtPR4FOCqs=
---
# IoBroker 不再运行
论坛中经常出现 ioBroker 不再运行的情况。但这句话所包含的信息与“我的车无法行驶”一样多。

你不会认为汽车不行驶有 1000 个原因：没油、电池没电、轮胎瘪了，还有，还有……

ioBroker 非常模块化，您可以轻松修复每个部分。配置文件已从 Node.js 包所在的目录中删除，只要该配置目录仍然完好无损，ioBroker 安装就不会发生任何严重问题。

您注意到的第一件事是，如果“admin”未运行，则 ioBroker 不会运行。但是有一个或多或少清晰的算法来说明如何检查损坏的内容。
检查js控制器是否正在运行：

**Linux：**

````
Linux: ps -A | grep iobroker
````

**视窗：**

检查 Process Explorer 中是否存在 node.exe 进程（显示所有进程）

Linux 下必须能看到类似这样的东西：

```
pi@pi:~$ ps -A | grep iobroker
1807 ? 13:59:22 iobroker.js-con
```

如果不起作用，请尝试启动 ioBroker

**Linux：**

```
cd /opt/iobroker
iobroker start
```

或 **Windows：**

```
cd C:\ioBroker
iobroker start
```

如果仍然不起作用或者收到错误消息，您可以尝试手动启动 js 控制器。

```
cd /opt/iobroker
node node_modules/iobroker.js-controller/controller.js --logs
```

如果收到错误消息，您可以尝试更新“js-controller”。

如果js控制器正在运行，则必须占用TCP端口9000和9001。您可以使用以下命令检查这一点：

```
netstat -n -a -p TCP
```

以下几行必须可见：

```
TCP 0.0.0.0:9000 0.0.0.0:0 LISTENING
TCP 0.0.0.0:9001 0.0.0.0:0 LISTENING
```

使用 Redis 时，它应该如下所示：

```
TCP 0.0.0.0:6379 0.0.0.0:0 LISTENING
TCP 0.0.0.0:9001 0.0.0.0:0 LISTENING
```

如果没有任何可见的东西（或只有一个），则端口可能被其他程序占用。您可以更改 */opt/iobroker/iobroker-data/iobroker.json* 中的端口。或者重新配置另一个程序。

## 重新安装适配器或js控制器
如果适配器或 js 控制器正在运行并在更新后停止，则更新可能出现问题。但您可以轻松地再次安装适配器。您所要做的就是在控制台中写入：

```
cd /opt/iobroker
iobroker stop adapterName
npm install iobroker.adapterName
iobroker upload adapterName
iobroker start adapterName
```

或者对于 js 控制器：

```
cd /opt/iobroker
iobroker stop
npm install iobroker.js-controller
iobroker start
```

## 检查node.js和npm是否安装正确
如果 js-controller 没有运行，那么也可能是 node.js 根本没有安装。
建议使用14.x版本的node.js。

Node.js 版本 16.x 已经过大部分测试（截至 2022 年 5 月 5 日），18.x 版本不能保证它能够正常工作。

订单

```
node -v
npm -v
```

必须显示相同的版本号。如果不是这种情况，那么您应该卸载 Node.js 并重新安装它。或者检查搜索路径。

Node.js 的卸载和安装与手动 ioBroker 安装（在 Raspberry 和其他 Linux 系统上）的方式相同。

这里详细描述了必要的步骤。

在这里您可以找到有关其他系统的信息。
检查管理适配器是否正在运行

首先检查admin是否激活：

```
cd /opt/iobroker
iobroker list instances
```

你应该看到这样一行：

```
system.adapter.admin.0 : admin - enabled, port: 8081, bind: 0.0.0.0, run as: admin
```

如果它显示“已禁用”而不是“已启用”，您可以像这样激活适配器：

```
iobroker start admin
```

如果IP地址不正确，请写入：

```
iobroker set admin.0 --bind 0.0.0.0
```

允许所有 IP 地址。

您还可以更改端口：

```
iobroker set admin.0 --port 8081
```

或关闭 SSL：

```
iobroker set admin.0 --secure false
```

然后实例必须在端口（默认 8081）上可见。

和

```
netstat -n -a -p TCP
```

您可以检查是否可以找到该行：

```
TCP 0.0.0.0:8081 0.0.0.0:0 LISTENING
```

如果还是不行，可以手动启动，看看是否有错误： cd /opt/iobroker node node_modules/iobroker.admin/admin.js --logs

日志中也可能有一些东西。日志文件位于 ***/opt/iobroker/log/iobroker.YYYY-MM-DD.log***。

你可以用命令

```
cd /opt/iobroker
cat log/iobroker.JJJJ-MM-TT.log
```

查看文件。当然，YYYY-MM-DD 必须替换为当前日期。 （“cat”只能在 Linux 下使用）

## 从管理员安装另一个实例
如果管理控制台的设置发生更改并且您无法再访问管理页面，仍然可以选择安装第二个管理实例。

为此：

```
iobroker add admin --port 8089
```

执行。

这里8089是一个当然是免费的端口。然后您可以通过 http://ip:8089 联系管理员。

设置再次确定后，您应该卸载新实例（端口 8089 上的第二个实例）以节省资源。

## Npm 消失了
>！ Debian (Raspbian) Buster 目前正在发生类似的情况

由于 npm 的问题，可能会发生这样的情况：在升级 Linux 后（通常还涉及升级皮肤版本（6.x；8.x、10.x）内的 Nodejs），突然不再起作用。

例如，无法再安装适配器，错误消息为***npm not found***

在这些情况下，请检查控制台：

节点-v npm -v

通常现在（截至2019年7月30日）node版本是8.15.0并且找不到npm。

正常的 npm 升级过程不起作用，因为 npm 不存在。因此，您首先必须卸载节点，然后重新安装它：

```
sudo apt-get --purge remove node
sudo apt-get --purge remove nodejs
sudo apt-get autoremove
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v
npm -v
```

现在你通常应该已经安装了 npm 6.x。

如果之前安装了 Node 的另一个主版本（不是 10.x），则仍需要在 Node 10 上编译软件包

```
cd /opt/iobroker
npm rebuild
```