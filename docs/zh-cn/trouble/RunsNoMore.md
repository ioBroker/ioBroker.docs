---
title: ioBroker 不再运行
lastChanged: 06.06.2019
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/trouble/RunsNoMore.md
hash: +IimqxVNeVMpPXhNnAWhm8X76aM2a2RJemrZvve2pNs=
---
# IoBroker 不再运行
论坛中经常出现 ioBroker 不再运行的情况。但这是一个包含与以下信息一样多的声明：我的车没有行驶。

你不会认为汽车不能开动的原因有 1000 个：没有燃料、电池没电、轮胎漏气，还有，还有，还有……

ioBroker 非常模块化，您可以很容易地修复每个部分。配置文件从包含 Node.js 包的目录中取出，只要此配置目录完好无损，ioBroker 安装就不会发生任何严重问题。

您注意到的第一件事是，如果“admin”没有运行，ioBroker 就不会运行。但是有或多或少明确的算法如何检查损坏的内容。
检查 js-controller 是否正在运行：

**Linux：**

````
Linux: ps -A | grep iobroker
````

**视窗：**

检查进程资源管理器中是否存在 node.exe 进程（显示所有进程）

在 linux 下，这样的东西必须是可见的：

```
pi@pi:~$ ps -A | grep iobroker
1807 ? 13:59:22 iobroker.js-con
```

如果它没有运行，然后尝试启动 ioBroker

**Linux：**

```
cd /opt/iobroker
iobroker start
```

或**视窗：**

```
cd C:\ioBroker
iobroker start
```

如果还是不行或者出现错误信息，可以尝试手动启动js-controller。

```
cd /opt/iobroker
node node_modules/iobroker.js-controller/controller.js --logs
```

如果出现错误信息，您可以尝试更新“js-controller”。

如果 js-controller 正在运行，则 TCP 端口 9000 和 9001 必须被占用。这可以使用以下命令进行检查：

```
netstat -n -a -p TCP
```

以下行必须可见：

```
TCP 0.0.0.0:9000 0.0.0.0:0 LISTENING
TCP 0.0.0.0:9001 0.0.0.0:0 LISTENING
```

使用 Redis 时，它应该如下所示：

```
TCP 0.0.0.0:6379 0.0.0.0:0 LISTENING
TCP 0.0.0.0:9001 0.0.0.0:0 LISTENING
```

如果什么都看不见（或只有一个），那么这些端口可能已被其他程序占用。您可以更改 */opt/iobroker/iobroker-data/iobroker.json* 中的端口。或者重新配置另一个程序。

## 重新安装适配器或 js 控制器
如果适配器或 js-controller 正在运行，而不是在更新之后，那么很可能是更新出了问题。但是您可以轻松地再次安装适配器。您所要做的就是在控制台中编写：

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

## 检查或者node.js和npm是否安装正确
如果 js-controller 没有运行，也可能是根本没有安装 node.js。
建议使用 14.x 版本的 node.js。

Node.js 版本 16.x 已尽可能进行测试（截至 2022 年 5 月 5 日），对于 18.x，无法保证它会正常工作。

命令

```
node -v
npm -v
```

必须显示相同的版本号。如果不是，那么您应该卸载并重新安装 node.js。或检查搜索路径。

Node.js 的卸载和安装类似于手动安装 ioBroker（在 Raspberry 和其他 Linux 系统上）。

此处详细描述了必要的步骤。

在这里您可以找到有关其他系统的信息。
检查管理适配器是否正在运行

首先检查管理员是否被激活：

```
cd /opt/iobroker
iobroker list instances
```

你应该看到这样的一行：

```
system.adapter.admin.0 : admin - enabled, port: 8081, bind: 0.0.0.0, run as: admin
```

如果它显示“已禁用”而不是“启用”，您可以像这样启用适配器：

```
iobroker start admin
```

如果IP地址不正确，那么写：

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

然后实例必须在端口可见（默认为 8081）。

和

```
netstat -n -a -p TCP
```

您可以检查是否可以找到该行：

```
TCP 0.0.0.0:8081 0.0.0.0:0 LISTENING
```

如果它仍然没有运行，那么您可以手动启动它并查看是否有任何错误： cd /opt/iobroker node node_modules/iobroker.admin/admin.js --logs

它也可能是日志中的内容。日志文件位于 ***/opt/iobroker/log/iobroker.YYYY-MM-DD.log***。

你可以用命令

```
cd /opt/iobroker
cat log/iobroker.JJJJ-MM-TT.log
```

查看文件。当然，YYYY-MM-DD 必须替换为当前日期。 （“cat”只能在 Linux 下使用）

## 从管理员安装另一个实例
如果管理控制台中的设置已更改并且您无法再访问管理页面，仍然可以选择安装第二个管理实例。

所以：

```
iobroker add admin --port 8089
```

跑步。

这里 8089 是一个肯定是免费的端口。然后您可以通过 http://ip:8089 联系管理员。

再次设置正确后，您应该卸载新的（端口 8089 上的第二个）实例以节省资源。

## Npm 消失了
>！目前 Debian (Raspbian) Buster 正在发生这种情况

由于 npm 的问题，在从 Linux 升级后，通常会在主版本（6.x；8.x，10.x）中升级 nodejs，可能会突然没有任何效果。

比如无法再安装适配器，错误信息是***npm not found***

在这种情况下，请在控制台中检查：

节点 -v npm -v

通常现在（截至 2019 年 7 月 30 日）node 版本是 8.15.0 并且找不到 npm。

升级 npm 的正常程序不起作用，因为 npm 不存在。因此，您必须先卸载节点，然后重新安装它：

```
sudo apt-get --purge remove node
sudo apt-get --purge remove nodejs
sudo apt-get autoremove
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v
npm -v
```

通常现在应该安装 npm 6.x。

如果之前安装了 Node 的另一个主版本（不是 10.x），仍然需要编译 node 10 上的包

```
cd /opt/iobroker
npm rebuild
```