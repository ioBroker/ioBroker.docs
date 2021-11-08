---
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/config/redis.md
title: ioBroker 的 Redis 数据库
hash: SoqEQqV0IZ/uxETDM3MSFvy9Bkrk4fp/cwvrsetbZjQ=
---
# IoBroker 的 Redis 数据库
Redis 是一个开源的内存数据库。
更多信息可以在 https://redis.io/ 找到

Redis 的一大优势：

与内部ioBroker 数据库相比，Redis 在数据访问速度、文件系统中的IO 管理以及更好地利用CPU 资源等方面具有优势。
js控制器松了一口气。以前缓慢的系统可以再次变得更快。
但是，重要的是要有足够的 RAM 可用，因为 Redis 将所有数据保存在 RAM 中。根据 Redis 中存储的确切内容，RAM 要求是几 MB（例如，如果只有状态在 Redis 中）到超过 200 MB（例如，如果对象和文件也存储在那里）。

## Redis 常见问题
1.我的ioBroker是否需要Redis？

对于所有常见的安装，ioBroker 自己的数据库通常就足够了！只有当 js-controller 永久需要 50-70% 或更多的 CPU 并且系统同时感到呆滞时，处理 Redis 的话题才有意义。
或者，如果您的目标是高度可用的 ioBroker 系统，则它变得必要，但还需要一些其他东西。

2. 如何知道我是否在使用Redis？

由于 ioBroker 自己的数据库也使用 Redis 协议进行通信，因此有时在日志中从 Redis 中读取某些内容会令人困惑。只要提到9000/9001端口，就是内部数据库，与外部Redis数据库无关。
对 `iobroker status` 的调用显示了用于状态和对象数据库的数据库类型。
“文件”表示使用ioBroker 自己的数据库。 “redis”表示正在使用Redis。

可以在 [论坛](https://forum.iobroker.net/topic/26327/redis-in-iobroker-%C3%BCberblick) 中找到有关 Redis 主题的详细说明以及更多信息

##Redis持久化
通常，Redis 是一个“内存数据库”。所以数据存储在RAM中。当Redis关闭时，这些都消失了。
为了启用更新，Redis 在硬盘上支持两种类型的数据存储。
RDB 和 AOF 持久化。

** RDB ** 默认情况下处于活动状态，此方法将整个内容保存在一个 RDB 文件中。可以配置存储间隔，并应根据您自己的需要进行调整！为了配置这个，混合了数据安全性（你可以应对在崩溃中丢失多少数据）和存储介质的写入负载，因为整个内容总是被写入（如果对象也在 Redis 中，这可能是几百个） MB！）。

但是，** AOF ** 确保数据是完全最新的。
为此，一个所谓的 AOF 文件被连续写入，其中所有更改始终附加。然后定期合并此文件，从而再次缩小其大小。最终的写入负载究竟如何，以及整个事情对 SD 卡是否有利，取决于保存的数据。如果对象和文件也在 Redis 中，那么不频繁地追加和合并比定期存储大量数据要“经济”得多。
如上所述，这意味着需要更多的内存。如果此 RAM 不可用，则一切都会继续 - 取决于设置 - 没有任何问题。
然后不会创建数据备份！相应的消息仅在日志文件中可用。

有关持久性的更多详细信息，请访问 https://redis.io/topics/persistence

** Redis Slaves **，即第二个 Redis 服务器，是另一种始终将当前数据作为备份的方式。
如果主Redis的计算机出现故障，数据仍然几乎实时地存在于从服务器上。
您可以使用它来创建转储以再次设置主服务器，或者作为一种快速解决方案，您可以使从服务器成为主服务器并更改 ioBroker 中的数据库 IP，您几乎可以再次在线更新。这也可以在 [论坛](https://forum.iobroker.net/topic/26327/redis-in-iobroker-%C3%BCberblick) 或 https://raw.githubusercontent.com/antirez/redis/5.0/redis.conf 中找到更详细的信息

** 但是，从站不能防止数据被意外删除，因为这些数据随后会立即在从站上删除。只有备份在这里有帮助。**

##安装Redis
Redis 必须作为单独的服务安装和配置，并且在备份期间也应考虑数据。
持久数据库以 JSON 文件的形式保存在“iobroker-data”文件夹中。
安装在命令行上进行

** Debian **

```sh
sudo apt update
sudo apt install redis
```

** Ubuntu **

```sh
sudo add-apt-repository ppa:chris-lea/redis-server
sudo apt-get update
sudo apt-get install redis-server
```

** 警告 **：没有适用于 Windows 的官方 Redis 版本。

##设置Redis
您可以使用 `sudo systemctl status redis-server` 进行检查。
如果重新启动后它没有自动重新启动，`sudo systemctl enable redis-server` 会有所帮助。
Redis 默认使用 6379 端口，并且还有一个用于访问数据库的命令行工具：`redis-cli` 打开一个 shell。
命令 `info` 显示了一些关于系统、内存使用和存储的数据（“keyspace”）的信息，当然当前是空的。

如果您操作单个主机系统或 ioBroker 在同一台主机上运行，那么就是这样。

如果其他主机也应该访问这个 Redis 服务器（从机什么的），那么这仍然必须被允许。
为此，必须编辑 /etc/redis/redis.conf 并将 **bind 127.0.0.1** 行更改为 **bind 0.0.0.0** 并将 **protected_mode** 设置为 **no** 下方会。

然后 `sudo systemctl restart redis-server` 使用更新的配置重新启动服务器。

有关更多详细信息，请参阅 [多主机](https://www.iobroker.net/#de/documentation/config/multihost.md)

## 将ioBroker 数据库转换为Redis
大多数更改和数据查询都是使用 States 数据库进行的。所有数据更改都到达这里，然后在适配器已注册某些数据时再次分发给它们。
到目前为止，将状态切换到 Redis 具有最大和最显着的性能影响。
如果只转换 States 数据库，理想情况下应该将 Redis 服务器与 ioBroker master 安装在同一主机上。

然后将“状态”更改为：

```sh
iobroker stop
iobroker setup custom
```

对于“对象”确认当前设置（“文件”作为类型，IP，端口 9001）和“状态”现在作为“redis”类型，Redis 主机服务器的 IP（或 127.0.01，如果在同一主机上） ) 并将 6379 设置为端口。
为了不丢失所有状态数据，建议迁移数据，这是配置中的下一个问题。
迁移后，ioBroker 可以通过 **iobroker start** 重新启动。如果还使用了从属系统，则必须通过 **iobroker setup custom** 在任何地方进行相同的设置。
然而，关于迁移的问题必须得到否定的回答！

如果您还想更改“对象”，请准确进行并选择“redis”类型，输入 Redis 主机的 IP 和端口并在必要时迁移数据，这取决于大小，可能需要一段时间。

** 状态和对象在同一个或不同的 Redis 进程中？**

在 Redis 进程中将状态和对象保存在一起当然是最简单的。
但是，这也意味着只能将所有数据一起备份。
使用 ioBroker File-DB，状态、对象和文件是分开的，因此可以有选择地备份。
如果所有内容都存储在 Redis 中，则写入负载也会更高，因为数据库更大。
为了将经常变化的状态和不经常变化的对象和文件与 Redis 设置分开，您可以简单地在每个主机上使用两个 Redis 进程。
例如，说明可在 https://gist.github.com/inecmc/f40ca0ee622e86999d9aa016c1b15e8c 获得。

使用 `iobroker setup custom` 可以简单地指定状态或对象/文件的各个不同端口。

对于状态，建议使用 RDB 持久性，然后根据更改次数每 5-15 分钟备份一次数据。对于对象/文件，AOF 持久化更适合最小化写负载。

##备份
Redis 通常将其文件保存在 /var/lib/redis 中。可以保存位于那里的 dump.rdb 或 appendonly.aof（取决于所选的持久性）。您还可以使用 `redis-cli BGSAVE` 在备份之前直接生成 dump.rdb，然后将其保存。