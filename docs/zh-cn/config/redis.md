---
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/config/redis.md
title: ioBroker 的 Redis 数据库
hash: OO6QwcVxnlNy+qafCZFqQ7pZKK33y+Ddy6McX56JFDM=
---
# IoBroker 的 Redis 数据库
Redis 是一个开源的内存数据库。
更多信息可以在 https://redis.io/ 找到

Redis 的一大优势：

与内部 ioBroker 数据库相比，Redis 在数据访问速度、文件系统中的 IO 管理和更好地利用 CPU 资源等方面具有优势。
js 控制器已卸载。以前缓慢的系统可以再次变得更快。
但是，有足够的可用 RAM 很重要，因为 Redis 将所有数据保存在 RAM 中。根据具体存储在 Redis 中的内容，RAM 要求的范围从几 MB（例如，如果 Redis 中只有状态）到超过 200 MB（例如，对象和文件也存储在那里）。

## Redis 常见问题
1. 我的 ioBroker 是否需要 Redis？

ioBroker 自己的数据库通常足以满足所有标准安装！只有当 js-controller 永久需要 50-70% 或更多的 CPU 并且同时感觉系统卡顿时，处理 Redis 的话题才有意义。
或者，如果您的目标是高度可用的 ioBroker 系统，则它变得很有必要，但为此还需要做一些其他的事情。

2. 我如何知道我是否在使用 Redis？

由于 ioBroker 自己的数据库也使用 Redis 协议进行通信，因此当您在日志中阅读有关 Redis 的内容时，有时会感到困惑。只要提到端口9000/9001，这表示内部数据库，与外部Redis数据库无关。
对 `iobroker status` 的调用显示了用于状态和对象数据库的数据库类型。
“文件”表示使用 ioBroker 自己的数据库。 “redis”表示一个 Redis 正在使用中。

有关 Redis 主题的详细说明以及更多信息，请参见 [论坛](https://forum.iobroker.net/topic/26327/redis-in-iobroker-%C3%BCberblick)

## Redis 持久化
通常，Redis 是一个“内存数据库”。因此数据存储在 RAM 中。当 Redis 退出时，它们就消失了。
但为了启用更新，Redis 支持在硬盘上存储两种类型的数据。
RDB 和 AOF 持久化。

**RDB** 默认激活，此方法将所有内容保存到 RDB 文件中。存储间隔可以配置，应该根据自己的需要进行调整！配置这个应该是数据安全性（你可以应对在崩溃中丢失多少数据）和存储介质的写入负载的混合，因为整个内容总是被写入（如果 Redis 中有对象，这可能是几百个）兆！）。

但是，**AOF** 确保数据是完全最新的。
为此，不断写入一个所谓的 AOF 文件，其中始终附加所有更改。然后，该文件会定期合并，从而再次变小。最终的写入负载究竟如何，以及整个事情是否适合 SD 卡，取决于存储的数据。如果对象和文件也在 Redis 中，那么附加和合并稀有的可能比定期保存大量数据更“经济”。
如上所述，这需要更多 RAM。如果此 RAM 不可用，根据设置，一切都会继续运行而不会出现任何问题。
然后不会创建数据备份！相应的消息仅在日志文件中。

有关持久性的更多详细信息，请访问 https://redis.io/topics/persistence

**Redis Slaves**，即第二个 Redis 服务器，是始终将当前数据作为备份的另一种可能性。
如果主 Redis 的计算机出现故障，数据仍然几乎实时存在于从属上。
您可以使用它来创建转储以再次设置主服务器，或者作为一种快速解决方案，您可以使从服务器成为主服务器并更改 ioBroker 中的数据库 IP，然后您几乎再次在线。这也可以在 [论坛](https://forum.iobroker.net/topic/26327/redis-in-iobroker-%C3%BCberblick) 或 https://raw.githubusercontent.com/antirez/redis/5.0/redis.conf 中找到更详细的信息

**但是，从站不能防止意外删除数据，因为这些数据也会在从站上立即删除。只有备份可以提供帮助。**

## 安装 Redis
Redis 必须安装并配置为单独的服务，备份时也应考虑数据。
持久化的数据库以 JSON 文件的形式保存在“iobroker-data”文件夹中。
安装在命令行上进行

**Debian**

```sh
sudo apt update
sudo apt install redis
```

**Ubuntu**

```sh
sudo add-apt-repository ppa:chris-lea/redis-server
sudo apt-get update
sudo apt-get install redis-server
```

**注意**：没有适用于 Windows 的官方 Redis 构建。

## 设置 Redis
您可以查看`sudo systemctl status redis-server`。
如果重启后它没有自动启动，`sudo systemctl enable redis-server`会有所帮助。
Redis 默认使用 6379 端口，并且还附带了一个用于访问数据库的命令行工具：`redis-cli`打开一个 shell。
`info`命令显示了一些关于系统、内存消耗和保存的数据（“keyspace”）的信息，当然这些信息目前仍然是空的。

如果您运行单主机系统或在同一主机上运行 ioBroker，那么就是这样。

如果其他主机也应该能够访问这个 Redis 服务器（从属服务器或其他东西），那么这仍然必须被允许。
为此，必须编辑 /etc/redis/redis.conf 并将 **bind 127.0.0.1** 行更改为 **bind 0.0.0.0** 并在 **protected_mode** 正下方设置为 **no ** 会。

之后，`sudo systemctl restart redis-server`使用更新的配置重新启动服务器。

有关更多详细信息，请参阅[多主机](https://www.iobroker.net/#de/documentation/config/multihost.md)

## 将 ioBroker 数据库切换到 Redis
大多数更改和数据查询都发生在 States 数据库中。所有数据更改都到达这里，然后在适配器注册特定数据后分发回给适配器。
将状态更改为 Redis 具有迄今为止最大和最明显的性能影响。
如果您只更改状态数据库，则理想情况下，您应该将 Redis 服务器安装在与 ioBroker 主服务器相同的主机上。

然后通过以下方式更改“状态”：

```sh
iobroker stop
iobroker setup custom
```

确认“对象”的当前设置（“文件”作为类型、IP、端口 9001）和“状态”现在作为类型“redis”，即 Redis 主机服务器的 IP（如果在同一主机上，则为 127.0.01 ) 并将 6379 设置为端口。
为了不丢失所有状态数据，建议迁移数据，下一个问题在配置期间提出。
迁移后，可以使用 **iobroker start** 重新启动 ioBroker。如果您还使用从属系统，则必须通过 **iobroker setup custom** 进行相同的设置。
然而，移民问题必须得到否定的回答！

如果您还想更改“对象”，请执行相同操作并选择“redis”类型，输入 Redis 主机的 IP 和端口，并根据需要迁移数据，这可能需要一段时间，具体取决于大小。

**相同或不同 Redis 进程中的状态和对象？**

当然，最简单的方法是将状态和对象一起存储在一个 Redis 进程中。
但是，这也意味着所有数据只能一起备份。
使用 ioBroker File-DB，状态、对象和文件被分离，因此可以有选择地备份。
当所有内容都存储在 Redis 中时，写入负载也会更高，因为数据库更大。
为了通过 Redis 设置分离经常更改的状态和不经常更改的对象和文件，您可以简单地在每个主机上使用两个 Redis 进程。
例如，在 https://gist.github.com/inecmc/f40ca0ee622e86999d9aa016c1b15e8c 上有相关说明。

使用`iobroker setup custom`，可以简单地指定状态或对象/文件的各个不同端口。

对于状态，建议使用 RDB 持久性，然后根据更改的数量每 5-15 分钟保存一次数据。对于对象/文件，AOF 持久化更适合最小化写入负载。

##备份
Redis 通常将其文件存储在 /var/lib/redis 下。可以保存位于那里的 dump.rdb 或 appendonly.aof（取决于所选的持久性）。您也可以在备份之前直接创建一个带有`redis-cli BGSAVE`的dump.rdb，然后将其保存起来。