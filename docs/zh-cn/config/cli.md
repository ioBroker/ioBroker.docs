---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/config/cli.md
title: 控制台命令
hash: ntIlrfMpR4seVtWD5Zxd17gyji9+GHxkueTwrGLx3JE=
---
# 控制台命令
可以通过控制台（Windows 和 Linux）执行启动、停止或更新等操作。以下是它们的描述。

注意：所有以`iobroker`开头的命令都可以从任何有 ioBroker 命令的目录中调用。`npm install` 命令必须从 ioBroker 根目录调用。

可以使用以下命令：

- [npm install iobroker.adapterName](#npm-install-iobrokeradaptername)
- [iobroker 启动](#iobroker-start)
- [iobroker 停止](#iobroker-stop)
- [iobroker 重启](#iobroker-restart)
- [iobroker isrun](#iobroker-isrun)
- [iobroker 启动适配器名称.实例](#iobroker-start-适配器名称实例)
- [iobroker 停止适配器名称.实例](#iobroker-stop-适配器名称实例)
- [iobroker 重新启动适配器名称.实例](#iobroker-restart-适配器名称实例)
- [iobroker 添加适配器名称 \[--enabled\] \[--host \<host\>\] \[--port \<port\>\]](#iobroker-add-adaptername)
- [iobroker 安装适配器名称](#iobroker-install-适配器名称)
- [iobroker 上传适配器名称](#iobroker-upload-adaptername)
- [iobroker 设置](#iobroker-setup)
- [iobroker del 适配器名称](#iobroker-del-适配器名称)
- [iobroker del 适配器名称.实例](#iobroker-del-适配器名称实例)
- [iobroker 更新 \[存储库 url\] \[--updatable\]](#iobroker-update-repository-url)
- [iobroker 升级 \[存储库 url\]](#iobroker-upgrade)
- [iobroker 自行升级 \[存储库 url\]](#iobroker-upgrade-self)
- [iobroker 升级适配器名称 \[存储库 url\]](#iobroker-upgrade-adaptername)
- [iobroker nodejs-更新](#iobroker-nodejs-更新)
- [iobroker 对象获取 objectId](#iobroker-object-get)
- [iobroker 对象 chmod \<object-mode\> \[状态模式\] \<id\> ]（#iobroker-object-chmod）
- [iobroker 对象 chown \<用户\> \<组\> \<id\>](#iobroker-object-chown)
- [iobroker 对象列表 \<id\>](#iobroker-object-list)
- [iobroker 设置 \<实例\> \[设置\]](#iobroker-set)
- [iobroker 状态获取 objectId](#iobroker-state-get)
- [iobroker state getplain objectId](#iobroker-state-getplain)
- [iobroker 状态获取值 objectId](#iobroker-state-getvalue)
- [iobroker 状态设置 objectId 新值](#iobroker-state-set)
- [iobroker 状态 del objectId](#iobroker-state-del)
- [iobroker 消息 \<adapter\>\[.instanceid\] \<command\> \[\message\]](#iobroker-message)
- [iobroker 设置](#iobroker-setup)
- [iobroker 清理](#iobroker-clean)
- [iobroker 备份](#iobroker-backup)
- [iobroker 主机](#iobroker-host)
- [iobroker 主机设置](#iobroker-host-set)
- [iobroker 主机删除](#iobroker-host-remove)
- [iobroker restore \<备份名称或路径\>](#iobroker-restore)
- [iobroker 列表 \<type\> \[pattern\]](#iobroker-list)
- [iobroker chmod \<模式\> \[模式\]](#iobroker-chmod)
- [iobroker chown \<用户\> \[组\] \[模式\] ](#iobroker-chown)
- [iobroker adduser \<用户\> \[--ingroup 组\] \[--密码密码\]](#iobroker-adduser)
- [iobroker deluser \<用户\>](#iobroker-deluser)
- [iobroker 密码 \<用户\> \[--密码密码\]](#iobroker-passwd)
- [iobroker 文件读取 \<toRead\> \[toWrite\]](#iobroker-file-read)
- [iobroker 文件写入 \<toRead\> \<toWrite\>](#iobroker-file-write)
- [iobroker 版本 \[adapterName\]](#iobroker-version)
- [iobroker uuid](#iobroker-uuid)
- [iobroker 状态](#iobroker-status)
- [iobroker 仓库 \[repoName\]](#iobroker-repo)
- [iobroker 信息](#iobroker-info)
- [iobroker 紧凑状态](#iobroker-compact-status)
- [iobroker compact \[启用|禁用|开|关\]](#iobroker-compact-enabledisableonoff)
- [iobroker compact 适配器名称.实例](#iobroker-compact-adapternameinstance)
- [iobroker 证书创建](#iobroker-cert-create)
- [iobroker 日志 \[--watch\]](#iobroker-logs)

**注意：**有一个参数`--timeout 5000`，可与每个命令一起使用。它指定连接到数据库的超时时间（以毫秒为单位）。

## Npm 安装 iobroker.adapterName
此命令必须从 ioBroker 的根目录调用（通常为 `/opt/iobroker` 或 `C:\Program Files\ioBroker`）。它使用 npm 管理器安装或更新给定的适配器或 js-controller。它始终有效，即使“admin”或“js-controller”出现问题。

使用示例：

- `npm install iobroker.admin` - 更新或安装“admin”适配器
- `npm install iobroker.js-controller` - 更新或安装 js-controller 本身
- `npm install https://github.com/husky-koglhof/ioBroker.hmm/tarball/master/` - 直接从 GitHub 或其他地方安装适配器。它必须是 ZIP 或 GZ 包，并且必须包含 `package.json`。

如果安装了适配器，则在调用`npm install ..`后，应重新启动指定的适配器或整个 js 控制器，以使更改生效。

可以使用`iobroker restart adapterName` 或仅使用`iobroker restart` 来完成此操作。有关详细信息，请参阅[这里](#iobroker-restart)。

***注意：***只有名为 `ioBroker.zzz` 的软件包才可以这样安装。

## Iobroker 启动
将 iobroker 作为守护进程启动。如果 ioBroker 已启动，您将收到以下警告：

`ioBroker controller daemon already running. PID: xx`

***Windows 注意事项：*** Windows 下的 ioBroker 通常作为服务启动。此命令将启动 ioBroker 的第二个实例，这将导致冲突。使用 ioBroker 目录中的 `serviceIoBroker.bat start` 而不是 `iobroker start` 命令。您应该具有管理员权限才能启动该服务。

## Iobroker 停止
如果 iobroker 作为守护进程运行，它将停止它。如果 ioBroker 未启动，您将收到以下警告：

`ioBroker controller daemon is not running`

***Windows 注意事项：*** Windows 下的 ioBroker 通常作为服务启动。此命令无效。使用 ioBroker 目录中的 `serviceIoBroker.bat stop` 而不是 `iobroker stop` 命令。您应该具有管理员权限才能停止该服务。

## Iobroker 重新启动
只需将停止和启动命令组合在一起即可。参见上文。

## Iobroker 运行
返回 ioBroker 的实际状态。它是否已启动。如果 ioBroker 未启动，则返回代码为 100。

与`iobroker status`相同。

## Iobroker 启动适配器名称.实例
您可以从控制台启动指定的适配器。它将自动启用并启动。

如果适配器已启动，它将重新启动。

您可以在“管理员”中控制现在已启用的适配器实例。

用法：

- `iobroker start email.0` - 启用并启动适配器实例 ioBroker.email.0

注意：您可以调用`iobroker start all`来启动所有禁用的实例，例如，在恢复之后。

## Iobroker 停止适配器名称.实例
您可以从控制台停止指定的适配器。它将被禁用并停止。它稍后不会自动重新启动。

您可以在“管理员”中控制现在已禁用的适配器实例。

用法：

- `iobroker stop email.0` - 启用并启动适配器实例 ioBroker.email.0

## Iobroker 重新启动适配器名称.实例
它只是重新启动指定的适配器。如果它被禁用，它将被启用。

## Iobroker 添加适配器名称
完整语法为`iobroker add adapterName [desiredInstanceNumber] [--enabled] [--host \<host\>] [--port \<port\>]`

此命令将安装（如果未安装）并创建指定适配器的实例。如果适配器的实例已存在，则将使用下一个实例编号。

还有一些附加参数：

- enabled：适配器实例将在创建后自动启用，否则将使用适配器预定义值。
- host：必须创建适配器实例的主机名。您可以使用“iobroker list hosts”命令获取主机列表。（尚未实现）
- 端口：如果适配器具有设置 native.port，它将在安装后设置为所需值。
- desireInstanceNumber：您可以指定所需的实例编号。

用法：

- `iobroker add dwd` - 安装并创建 dwd 适配器实例。
- `iobroker add admin --enabled --port 80` - 在端口 80 上创建管理适配器的第二个（正常）实例并启用它。

如果此命令不起作用，您可以随时使用`npm install iobroker.adapterName`命令强制更新或安装。不会创建任何实例，之后您应该再次调用`iobroker add iobroker.adapterName`命令。

## Iobroker 安装适配器名称
仅在 ioBroker 中安装适配器，不创建实例。如果适配器尚未安装，您将收到以下警告：

`adapter "admin" yet installed. Use "upgrade" to install newer version.`

## Iobroker 上传适配器名称
将适配器中“www”和“admin”文件夹中的网页上传到 ioBroker 文件存储中。开发人员通常使用它来查看配置页面或“www”页面上所做的更改。
您无法直接在 `iobroker/iobroker-data/adapter/file` 中更改文件。配置文件 (`iobroker-data/iobroker.json`) 中的objects.noFileCache 中有一个供开发人员使用的标志，用于禁用文件缓存。将此标志设置为 true（当然，配置文件更改后需要重新启动），iobroker-data 目录中的更改将在网络上显示，而无需 `iobroker upload adapterName` 命令。

注意：您可以调用`iobroker upload all`来上传所有适配器，例如，恢复后。

## Iobroker 设置
如果 ioBroker 不是通过 npm 或 Windows 安装程序安装的（例如，只是从 GitHub 复制并解压），则必须调用此命令。它会创建默认配置文件并准备数据目录。

您可以使用参数“first”调用此命令，以确保如果配置已经存在则不会覆盖任何内容。

用法：`iobroker setup first` - 如果尚未创建，则创建配置文件。

## Iobroker 设置自定义
要启用多主机配置，必须调用此命令。必须回答以下问题：

```
Type of objects DB [file, couch, redis], default [file]:
Host of objects DB(file), default[127.0.0.1]: enter IP address of the main system
Port of objects DB(file), default[9001]:
Type of states DB [file, redis], default [file]:
Host of states DB (file), default[ip]:
Port of states DB (file), default[9000]:
```

您只需按 ENTER 即可采用 \[\] 中显示的默认值。

**注意：**目前仅支持 *file* DB 类型。如果您更改端口，您必须是专家。

**注意：**检查主机上的防火墙设置中定义的端口（9000/9001）。

## Iobroker del 适配器名称
从 ioBroker 中完全删除此适配器的所有实例和状态并将其从磁盘上删除。

删除后，无法恢复适配器实例的设置。

用法：`iobroker del dwd` - 从 ioBroker 中删除适配器 dwd 的所有实例和代码。

## Iobroker del 适配器名称.实例
仅从 ioBroker 中删除此适配器的指定实例，并且**不**将其从磁盘中删除。

删除后，无法恢复适配器实例的设置。

用法：`iobroker del dwd.0` - 从 ioBroker 中删除适配器 dwd 的实例 0。

## Iobroker 更新 \[存储库 url\]
完整语法：`iobroker update \[repository url\]`

从配置的 ioBroker 存储库读取信息。如果设置了 `\repository url\`，则将从此存储库读取信息。

用法：

- `iobroker update` - 列出已配置（通常是本地）存储库中的可用版本。
- `iobroker update https://raw.githubusercontent.com/ioBroker/ioBroker.js-controller/master/conf/sources-dist.json` - 列出在线存储库中的可用版本。

```
>./iobroker.js update
Cannot get version of "virtual".
Cannot get version of "geofency".
update done
Adapter    "zwave"         : 0.1.0
Adapter    "yr"            : 0.1.2    , installed 0.1.2
Adapter    "web"           : 0.2.6    , installed 0.2.6
Adapter    "vis"           : 0.2.9    , installed 0.2.9
Adapter    "virtual"
Adapter    "sonos"         : 0.1.5    , installed 0.1.4 [Updateable]
Adapter    "rickshaw"      : 0.2.1    , installed 0.2.1
Adapter    "pushover"      : 0.1.0
Adapter    "onkyo"         : 0.0.4
Adapter    "telnet"        : 0.0.0
Adapter    "socketio"      : 0.2.3    , installed 0.2.3
Adapter    "simple-api"    : 0.0.3    , installed 0.0.3
Adapter    "sayit"         : 0.3.0    , installed 0.3.0
Adapter    "ping"          : 0.1.3    , installed 0.1.3
Adapter    "node-red"      : 0.1.5    , installed 0.1.5
Adapter    "mqtt"          : 0.1.6    , installed 0.1.5 [Updateable]
Adapter    "mobile"        : 0.0.2
Adapter    "legacy"        : 0.1.12
Adapter    "knx"           : 0.0.1
Controller "js-controller" : 0.5.14   , installed 0.5.14
Adapter    "javascript"    : 0.2.3    , installed 0.2.3
Adapter    "ical"          : 0.0.2    , installed 0.0.1 [Updateable]
Adapter    "hmm"           : 0.0.15   , installed 0.0.16
Adapter    "hue"           : 0.2.0    , installed 0.2.0
Adapter    "hm-rpc"        : 0.3.5    , installed 0.3.4 [Updateable]
Adapter    "hm-rega"       : 0.1.17   , installed 0.1.17
Adapter    "history"       : 0.1.3    , installed 0.1.3
Adapter    "highcharts"    : 0.0.0
Adapter    "graphite"      : 0.1.0
Adapter    "geofency"
Adapter    "example"       : 0.1.1    , installed 0.1.1
Adapter    "email"         : 0.1.0
Adapter    "dwd"           : 0.1.7    , installed 0.1.7
Adapter    "cul"           : 0.0.2    , installed 0.0.3
Adapter    "b-control-em"  : 0.1.1
Adapter    "artnet"        : 0.0.3
Adapter    "admin"         : 0.3.21   , installed 0.3.20 [Updateable]
```

此命令不改变任何内容，仅更新有关可用适配器版本的内部信息并显示它。

要仅显示可更新的适配器，请使用过滤器`--updatable`。

## Iobroker 升级
完整语法：`iobroker upgrade \[repository url\]`

如果指定存储库中有较新版本，它将升级所有适配器（不是 js-controller）。如果没有指定存储库链接，则将使用已配置的存储库。

用法：

- `iobroker upgrade` - 升级所有适配器。
- `iobroker upgrade https://raw.githubusercontent.com/ioBroker/ioBroker.js-controller/master/conf/sources-dist.json` - 从在线存储库升级所有适配器

## Iobroker 自我升级
完整语法：`iobroker upgrade self \[repository url\]`

此命令将 ioBroker.js-controller 升级到存储库中可找到的版本。

**注意：**如果指定或配置的存储库具有较低版本，则它将降级到此版本。

- `iobroker upgrade self` - 将 js-controller 升级到配置的存储库中的版本。
- `iobroker upgrade self https://raw.githubusercontent.com/ioBroker/ioBroker.js-controller/master/conf/sources-dist.json` - 将 js-controller 升级到在线存储库中的版本。

## Iobroker 升级适配器名称
完整语法：`iobroker upgrade adapterName \[repository url\]`

此命令将指定的适配器升级到存储库中的版本。

**注意：**如果指定或配置的存储库具有较低版本，则它将降级到此版本。

- `iobroker 升级电子邮件` - 将`ioBroker.email`适配器升级到配置的存储库中的版本。
- `iobroker 升级电子邮件 https://raw.githubusercontent.com/ioBroker/ioBroker.js-controller/master/conf/sources-dist.json` - 将 `ioBroker.email` 适配器升级到在线存储库中的版本。

## Iobroker nodejs 更新
此命令将 Node.js 升级到存储库中的版本。

- `iobroker nodejs-update` - 将 Node.js 升级到配置的存储库中的版本。

## Iobroker 对象获取
完整语法：`iobroker get objectId`

该命令从命令行读取对象的描述：C:\pWork>iobroker object get system.adapter.admin.0.uptime

```
>./iobroker object get system.adapter.admin.0.uptime
{
  "_id":"system.adapter.admin.0.uptime",
  "type":"state",
  "common":{"name":"admin.0.uptime","type":"number","role":"indicator.state","unit":"seconds"},
  "native":{}
}
```

**注意：**通常输出未格式化，但您可以使用标志`--pretty`来格式化它们。

## Iobroker 对象 chmod
格式：`iobroker object chmod <object-mode> [state-mode] <id>`

ID 可以是带有 '\*' 的模式。'\*' 只能位于模式的末尾。

## Iobroker 对象 chown
格式：`iobroker object chown <user> <group> <id>`

ID 可以是带有 '\*' 的模式。'\*' 只能位于模式的末尾。

## Iobroker 对象列表
格式：`iobroker object list <id>`

列出对象的权限，例如：

```
>iobroker object list system.adapter.admin.*

ObjectAC | StateAC |     User     |     Group    | ID
---------+---------+--------------+--------------+--------------
rw-r--r-- rw-r--r--          admin  administrator system.adapter.admin.0.uptime
rw-r--r-- rw-r--r--          admin  administrator system.adapter.admin.0.memRss
rw-r--r-- rw-r--r--          admin  administrator system.adapter.admin.0.memHeapTotal
rw-r--r-- rw-r--r--          admin  administrator system.adapter.admin.0.memHeapUsed
rw-r--r-- rw-r--r--          admin  administrator system.adapter.admin.0.connected
rw-r--r-- rw-r--r--          admin  administrator system.adapter.admin.0.alive
rw-r--r--                    admin  administrator system.adapter.admin.0
```

ID 可以是带有 '\*' 的模式。'\*' 只能位于模式的末尾。

## Iobroker 设置
完整语法：`iobroker set <instance> [--port value] [--enabled true|false] [--ip address] [--auth true|false] [--secure true|false] [—-ttl value]` 用于从控制台修改实例设置。可以修改以下设置：

- `port` - 更改实例绑定的端口
- `enabled` - 启用/禁用实例（也可以使用 `iobroker start|stop <instance>` 来完成）
- `ip` - 更改绑定的 IP 地址
- `auth` - 启用或禁用身份验证
- `secure` - 打开或关闭 SSL 协议
- `ttl` - 登录超时（秒）

## Iobroker 状态获取
完整语法：`iobroker state get stateId` 读取状态的 JSON 值：

```
>./iobroker state get system.adapter.admin.0.uptime
{"val":496,"ack":true,"ts":1425925626,"from":"system.adapter.admin.0","lc":1425925626}
```

您可以使用“--pretty”标志来格式化输出：

```
>./iobroker state get system.adapter.admin.0.uptime --pretty
{
  "val": 496,
  "ack": true,
  "ts": 1425925626,
  "from": "system.adapter.admin.0",
  "lc": 1425925626
}
```

## Iobroker 状态 getplain
完整语法：`iobroker state getplain stateId`

将状态的纯值读取为列表属性：

```
>./iobroker state getplain system.adapter.admin.0.uptime
571
true
system.adapter.admin.0
1425925701
1425925701
```

## Iobroker 状态获取值
完整语法：`iobroker state getvalue stateId`

将状态的纯值读取为列表属性：

```
>./iobroker state getvalue system.adapter.admin.0.uptime
571
```

## Iobroker 状态设置
完整语法：`iobroker state set stateId newValue ack`

设置状态的值。`ack` 默认 = `false`。

`>iobroker state set sayit.0.tts.text "Текст сказать"`

`>iobroker state set adapter.0.states.temperature 28.5 true`

如果ID错误，则不会有错误信息。

## Iobroker 状态删除
完整语法：`iobroker state del stateId`

刪除状态。

## Iobroker 消息
完整语法：`iobroker message adapter.instance command message`

当未设置实例时，向给定的适配器实例或适配器的所有实例发送消息。

## Iobroker 清理
清除 ioBroker 的所有设置。**如果调用此命令，则无法恢复设置。**

```
>iobroker clean yes
Deleted 205 objects.
Restarting ioBroker...
```

## Iobroker 备份
ioBroker 的备份设置保存在 zip 文件中。备份文件将在 `backups` 目录中创建，名称为：`2015_02_10-17_49_45_backupIoBroker.tar.gz`，包含当前日期和时间。

**注意：**尚未完成

## Iobroker 恢复
完整语法：`iobroker restore <backup name or path>` 如果使用命令`iobroker backup`创建了一些备份，那么它们可以恢复。如果您调用不带参数的 restore，您将获得可用备份的列表。

```
/>iobroker restore
Please specify one of the backup names:
   2015_07_18-12_20_28_backupIoBroker.tar.gz or 2015_07_18-12_20_28 or 0
   2015_07_17-21_54_01_backupIoBroker.tar.gz or 2015_07_17-21_54_01 or 1
```

您可以调用`iobroker restore 0`来使用最新的备份文件或其他索引。
以下命令与给定的示例相同：

– `iobroker 恢复 0`
-`iobroker 2015_07_18-12_20_28`
-`iobroker 2015_07_17-21_54_01_backupioBroker.tar.gz`
-`iobroker /opt/iobroker/backups/2015_07_17-21_54_01_backupioBroker.tar.gz`

所有适配器都将恢复为禁用状态，`admin` 除外。要一次启用所有适配器，您可以调用`iobroker start all`。如果某些适配器未上传，您可以调用“iobroker upload all”一次上传所有适配器的文件。

## Iobroker 主机
更改对象中的主机名。

有时，通过将 iobroker 数据从一个系统移动到另一个系统，需要更改主机名。可以使用此命令执行此操作。

在此之前您必须停止 ioBroker。

要将数据库中某些特定主机名更改为当前主机名，请写入`iobroker host oldHostName`。

要更改任何主机名（必须是单主机系统，不能是多主机系统），请写入`iobroker host this`。

## Iobroker 主机设置
您可以将主机名更改为某个特定名称（而非计算机名称）。为此，您必须写入：`iobroker host set newHostName` 以从实际计算机名称或先前指定的主机名重命名。

## Iobroker 主机删除
要删除主机，只需写入`iobroker host remove hostNameToRemove`。请小心操作。

## Iobroker 列表
使用此命令，可以显示 ioBroker 中的不同类型的对象和状态。示例：

- `iobroker list object hm-rega.0` - 显示实例 hm-rega.0 的所有对象
- `iobroker list states hm-rega.0` - 显示实例 hm-rega.0 的所有状态
- `iobroker list files vis.0` - 显示实例 vis.0 的所有文件
- `iobroker list examples` - 显示所有实例
- `iobroker list adapters` - 显示所有适配器
- `iobroker list users` - 显示所有用户
– `iobroker list groups` – 显示所有组
- `iobroker list enums` - 显示所有枚举
- `iobroker list hosts` - 显示所有主机

可以使用类型的短名称：

- `o` - 对象
- `s` - 状态
- `u` - 用户
- `e` - 枚举
- `g` - 群组
- `i` - 实例
- `f` - 文件
- `h` - 主机

例如 `iobroker l u` - 列出所有用户。

通过`list instances`，您可以使用附加过滤器：

- `enabled` - 列出所有启用的实例
- `disabled` - 列出所有已禁用的实例
- `port` - 列出所有带端口的实例
- `ip` - 列出所有可以绑定到某个 IP 的实例
- `ssl` - 列出所有可以启用 SSL 的实例

使用：`iobroker list instances --enabled` 列出所有启用的实例

或`iobroker l i --port`列出使用的端口。

## Iobroker 添加用户
此命令允许创建新用户（默认情况下在“管理员”组中）。可以使用参数`--ingroup`在命令中定义该组。如果未指定密码，则必须从控制台输入密码。
例如，在组“user”中创建用户“martin”：

`iobroker adduser martin --group user`

创建用户和密码：

`iobroker adduser martin --group user --password 12345`

## Iobroker 删除用户
要删除现有用户，请调用：

`iobroker deluser username`

用户也将自动从所有组中删除。`admin` 用户无法被删除。

## Iobroker 密码
要更改现有用户的密码，请拨打：

`iobroker passwd username`

系统将提示您输入密码并重复输入密码。
如果不需要控制台交互，请调用：

`iobroker passwd username --password newPassword`

## Iobroker 修改权限
改变文件模式。

## Iobroker chown
更改文件所有者。

## Iobroker 文件读取
从数据库读取文件并将其存储在本地文件系统中。
用法：`iobroker file read <fileToRead> [storeFile]` storeFile 是可选的，但可以是目录或新文件的路径。

例如：`iobroker file read /vis.0/main/img/picture.png /opt/myfile.png`

`file` 和 `read` 可以缩写为 `f r`。

## Iobroker 文件写入
将文件从本地文件系统写入数据库。
用法：`iobroker file write <fileToRead> <storeFile>` storeFile 可以是数据库中目录的路径，也可以是全名

例如：`iobroker file write /opt/myfile.png /vis.0/main/img/picture.png`

`file` 和 `write` 可以缩写为 `f w`。

## Iobroker 版本
显示适配器或 js-controller 的版本。

js-controller 的版本：

```
>iobroker version
0.11.2
>iobroker -v
0.11.2
>iobroker --version
0.11.2
```

管理适配器的版本：

```
>iobroker version admin
1.5.4
>iobroker admin -v
1.5.4
>iobroker admin --version
1.5.4
```

## Iobroker 的 uuid
显示此 ioBroker 安装的 UUID。

```
>iobroker uuid
8f73s7c9-2fd6-3066-189a-cccccccccc
```

## Iobroker 状态
ioBroker 是否运行。

## Iobroker 仓库
显示已配置的存储库或选择一个。

```
C:\ioBroker>ioBroker repo
default: conf/sources-dist.json
online: https://raw.githubusercontent.com/ioBroker/ioBroker.js-controller/master/conf/sources-dist.json
fast: http://download.iobroker.net/sources-dist.json

Active repo: fast
```

```
C:\ioBroker>ioBroker repo default
default: conf/sources-dist.json
online: https://raw.githubusercontent.com/ioBroker/ioBroker.js-controller/master/conf/sources-dist.json
fast: http://download.iobroker.net/sources-dist.json

Active repo: default
```

## Iobroker 信息
收集有关此主机的信息。

```
Platform       : Windows
Architecture   : x64
CPUs           : 4
Speed          : 2496 MHz
Model          : Intel(R) Core(TM) i7-7660U CPU @ 2.50GHz
RAM            : 15.9 GB
System uptime  : 13d. 13:18:04
Node.js        : v8.11.1
adapters count : 176
Disk size      : 949.9 GiB
Disk free      : 813.3 GiB
NPM            : v5.8.0
```

## Iobroker 紧凑状态
显示当前主机的紧凑模式的状态。

`Compact mode for this host is currently enabled`

## Iobroker compact [启用|禁用|开|关]
允许您为当前主机启用或禁用紧凑模式。首先输出当前状态，然后输出所做的更改。

```
Compact mode for this host is currently disabled

Compact mode for this host changed to enabled
```

Folgende Befehle sind möglich：

- `enable/on` - 为 ioBroker 激活 Compact-Modus
- `disable/off` - 停用 ioBroker 的 Compact-Modus

## Iobroker compact 适配器名称.实例
此命令允许检查和更改适配器实例的紧凑模式配置。
始终显示所有设置（参见状态），包括所做的更改。

所有更改也可在 ioBroker 运行时进行。适配器实例可以重新启动。

有以下组合可用：

### 紧凑适配器名称.实例状态
显示实例的当前状态和当前设置。

```
Compact mode supported: true
Compact mode enabled:   true
Compact group:          0
```

字段含义：

* 支持紧凑模式：适配器通常支持紧凑模式
* 紧凑模式已启用：此实例以紧凑模式启动
* 紧凑组：实例按指定在紧凑组中启动。0 表示“在此主机的主 js 控制器进程中”（风险较高，所需 RAM 较少）。> 0 表示单独的主机进程（风险较小，但所需 RAM 稍多）

### 紧凑适配器名称.实例组<group-id>
设置实例的紧凑模式组

```
Compact mode supported: true
Compact mode enabled:   true
Compact group:          0 --> 1
Instance settings for "simple-api.0" are changed.
```

### 紧凑适配器名称.实例<disable|off&gt;
停用实例的紧凑模式。

```
Compact mode supported: true
Compact mode enabled:   true --> false
Compact group:          1
Instance settings for "simple-api.0" are changed.
```

### 紧凑型适配器名称.实例组<enable|on&gt; [group-id]
激活实例的紧凑模式并（可选）在同一个调用中设置组：

```
Compact mode supported: true
Compact mode enabled:   false --> true
Compact group:          0 --> 1
Instance settings for "simple-api.0" are changed.
```

## Iobroker 证书创建
为 ioBroker 安装生成新的 SSL 证书，将其作为标准证书输入系统并颁发。

```
-----BEGIN RSA PRIVATE KEY-----
...
-----END RSA PRIVATE KEY-----

-----BEGIN CERTIFICATE-----
...
-----END CERTIFICATE-----

The object "system.certificates" was updated successfully.
```

## Iobroker 日志
显示最后几行并监控 ioBroker 日志。

此命令显示最后1000行日志并监视日志：

`iobroker logs --lines 1000`

要监控日志，请添加`--watch`，如下所示：

`iobroker logs --lines 100 --watch`