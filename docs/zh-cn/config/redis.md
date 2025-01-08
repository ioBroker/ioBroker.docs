---
title: ioBroker 的 Redis 数据库
lastChanged: 27.02.2021
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/config/redis.md
hash: Ev82te52KWYL/zhocAzZRad8qAof0Www9GazSsCX4aI=
---
Redis 是一个开源内存数据库。
更多信息可以在 https://redis.io/ 找到

Redis的一大优势：

与内部的ioBroker数据库相比，Redis主要在数据访问速度、文件系统的IO管理以及更好地利用CPU资源等方面具有优势。
js控制器松了口气。以前缓慢的系统可以再次变得更快。
但是，有足够的可用 RAM 非常重要，因为 Redis 将所有数据保存在 RAM 中。根据 Redis 中具体存储的内容，RAM 要求范围从几 MB（例如，如果 Redis 中只有状态）到超过 200 MB（例如，如果对象和文件也存储在其中）。

## Redis 常见问题解答
1. 我的 ioBroker 是否需要 Redis？

对于所有常见的安装，ioBroker 自己的数据库通常就足够了！只有当 js 控制器不断需要 50-70% 或更多 CPU 并且系统同时感觉缓慢时，处理 Redis 的话题才有意义。
或者，如果您想要一个高度可用的 ioBroker 系统，那么它就变得必要，但还需要一些东西。

2. 如何知道我是否在使用Redis？

由于ioBroker自己的数据库也使用Redis协议进行通信，因此当您在日志中阅读有关Redis的内容时有时会感到困惑。只要提到9000/9001端口，就表示内部数据库，与外部Redis数据库无关。
对`iobroker status`的调用显示了状态和对象数据库使用的数据库类型。
“文件”表示使用ioBroker自己的数据库。 “redis”表示正在使用Redis。

Redis 主题的详细解释以及更多信息可以在 [论坛](https://forum.iobroker.net/topic/26327/redis-in-iobroker-%C3%BCberblick) 中找到

## Redis持久化
通常Redis是一个“内存数据库”。数据存储在 RAM 中。当 Redis 停止时，这些就消失了。
为了也能够进行更新，Redis 在硬盘驱动器上支持两种类型的数据存储。
RDB和AOF持久化。

**RDB** 默认处于活动状态，此方法将所有内容保存到 RDB 文件中。存储间隔可以配置，并应根据您自己的需要进行调整！配置这个应该是数据安全性（崩溃时你能容忍丢失多少数据）和存储介质的写入负载的混合，因为整个内容总是被写入（即使Redis中有对象，这可能是几百个） MB！）。

但是，**AOF** 确保数据完全是最新的。
为此，会连续写入所谓的 AOF 文件，其中始终附加所有更改。然后，该文件会定期合并，从而再次变小。最终的写入负载到底是多少以及整个过程对 SD 卡是否有利取决于保存的数据。如果对象和文件也在 Redis 中，则附加和不频繁的合并可能比定期保存大量数据更“经济”。
如上所述，这需要更多的 RAM。如果此 RAM 不可用，一切都会继续运行，不会出现任何问题 - 取决于设置。
但是，不会创建数据备份！相应的消息仅存在于日志文件中。

有关持久性的更多详细信息，请访问 https://redis.io/topics/persistence

**Redis Slaves**，即第二个 Redis 服务器，是始终将当前数据作为备份的另一种选择。
如果主Redis的计算机出现故障，数据仍然几乎实时地存在于从服务器上。
您可以使用它来创建转储以再次设置主服务器，或者作为一种快速解决方案，您可以将从服务器设为主服务器并更改 ioBroker 中的数据库 IP，并且几乎可以再次上线。还可以在 [论坛](https://forum.iobroker.net/topic/26327/redis-in-iobroker-%C3%BCberblick) 或 https://raw.githubusercontent.com/antirez/redis/5.0/redis.conf 中找到更多详细信息

**但是，从属设备无法防止数据意外删除，因为这些数据也会在从属设备上立即被删除。只有备份可以提供帮助。**

## 安装 Redis
Redis 必须作为单独的服务安装和配置，并且备份时也应考虑数据。
持久数据库以 JSON 文件的形式存储在“iobroker-data”文件夹中。
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

**注意**：没有适用于 Windows 的官方 Redis 版本。

## 设置 Redis
您可以使用`sudo systemctl status redis-server`进行检查。
如果重新启动后没有自动启动，`sudo systemctl enable redis-server` 会有所帮助。
Redis 默认使用端口 6379，还包含用于访问数据库的命令行工具：`redis-cli` 打开 shell。
命令`info`显示一些有关系统、内存使用情况和存储数据（“密钥空间”）的信息，当然这些信息当前是空的。

如果您运行单主机系统或在同一主机上运行 ioBroker，那就这样了。

如果其他主机也应该访问此 Redis 服务器（从属服务器或类似的服务器），则仍然必须允许这样做。
为此，必须编辑 /etc/redis/redis.conf，并将行 **bind 127.0.0.1** 更改为 **bind 0.0.0.0** 并将 **protected_mode** 正下方设置为 **no ** 变得。

然后，`sudo systemctl restart redis-server` 使用更新后的配置重新启动服务器。

有关更多详细信息，请参阅[多主机](https://www.iobroker.net/#de/documentation/config/multihost.md)

## 将ioBroker数据库切换到Redis
大多数更改和数据查询都发生在 States 数据库中。所有数据更改都会到达此处，然后在适配器注册特定数据后分发回适配器。
将状态更改为 Redis 迄今为止具有最大且最显着的性能影响。
如果您只转换 states 数据库，那么理想情况下您应该将 Redis 服务器安装在与 ioBroker master 相同的主机上。

然后通过以下方式更改“状态”：

```sh
iobroker stop
iobroker setup custom
```

对于“对象”，确认当前设置（“文件”作为类型，IP，端口 9001），对于“状态”，现在作为类型“redis”，Redis 主机服务器的 IP（如果在同一主机上，则为 127.0.01） ）并将 6379 设置为端口。
为了不丢失所有状态数据，最好迁移数据，这就是配置过程中接下来的问题。
迁移后，可以使用 **iobroker start** 重新启动 ioBroker。如果您还使用从属系统，则必须通过**iobroker setup custom**在任何地方进行相同的设置。
然而，关于移民的问题必须得到否定的回答！

如果您还想更改“对象”，请执行此操作并选择类型“redis”，输入 Redis 主机的 IP 和端口，并在必要时迁移数据，这可能需要相当长的时间，具体取决于大小。

**同一或单独的 Redis 进程中的状态和对象？**

最简单的方法当然是将状态和对象一起存储在 Redis 进程中。
不过，这也意味着所有数据只能一起备份。
使用 ioBroker File-DB，状态、对象和文件被分开，因此可以有选择地备份。
当所有内容都存储在 Redis 中时，写入负载也会更高，因为数据库更大。
为了通过 Redis 设置将频繁更改的状态与不经常更改的对象和文件分开，您只需在每个主机上使用两个 Redis 进程即可。
例如，可以在 https://gist.github.com/inecmc/f40ca0ee622e86999d9aa016c1b15e8c 上找到相关说明。

使用`iobroker setup custom`，可以简单地指定状态或对象/文件的不同端口。

对于状态，建议使用 RDB 持久化，然后根据更改数量每 5-15 分钟备份一次数据。对于对象/文件来说，AOF持久化更适合最小化写入负载。

## 备份
Redis 通常将其文件存储在 /var/lib/redis 下。可以保存位于此处的 dump.rdb 或appendonly.aof（取决于所选的持久性）。您还可以使用`redis-cli BGSAVE` 在备份之前直接创建 dump.rdb，然后将其保存。