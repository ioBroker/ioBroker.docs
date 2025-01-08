---
title: The Redis database for ioBroker
lastChanged: 27.02.2021
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/config/redis.md
hash: Ev82te52KWYL/zhocAzZRad8qAof0Www9GazSsCX4aI=
---
Redis is an open source in-memory database.
More information can be found at https://redis.io/

The big advantage of Redis:

Compared to the internal ioBroker databases, Redis offers advantages in the areas of data access speed, IO management in the file system and better use of CPU resources.
The js controller is relieved. A previously sluggish system can become faster again.
It is important, however, that there is enough RAM available, as Redis keeps all data in RAM. Depending on what exactly is stored in Redis, the RAM requirement is from a few MB (e.g. if only states are stored in Redis) to over 200 MB (e.g. if objects and files are also stored there).

## Redis FAQ
1. Do I need Redis for my ioBroker or not?

For all common installations, ioBroker's own databases are usually sufficient! Only when the js controller constantly requires 50-70% or more CPU and the system feels sluggish at the same time, it might make sense to look into Redis.
Alternatively, it is necessary if you want a highly available ioBroker system, but a few more things are required for that.

2. How do I find out if I am using Redis or not?

Since ioBroker's own databases also use the Redis protocol for communication, it can sometimes be confusing when you read something about Redis in the log. As long as port 9000/9001 is mentioned, it indicates the internal database and has nothing to do with the external Redis database.
A call to `iobroker status` shows which database type is used for the states and objects databases.
"file" means that ioBroker's own databases are being used. "redis" means that a Redis is being used.

A detailed explanation of Redis with further information can be found in [forum](https://forum.iobroker.net/topic/26327/redis-in-iobroker-%C3%BCberblick)

## Redis persistence
Normally, Redis is an "in-memory database". The data is stored in RAM. When Redis is terminated, it is gone.
But to enable updates, Redis supports two types of data storage on the hard disk.
The RDB and AOF persistence.

**RDB** is active by default, this method saves the entire content in an RDB file. The saving interval can be configured and should be adapted to your own needs! Configuring this should be a mix of data security (how much data can you afford to lose in a crash) and write load for the storage medium, since the entire content is always written (if objects are also in Redis, this can be several hundred MB!).

**AOF** does, however, ensure that the data is completely up to date.
To do this, a so-called AOF file is continuously written, where all changes are always appended. This file is then consolidated at regular intervals and thus reduced in size again. What the final write load is exactly, and whether the whole thing is good for SD cards or not, depends on which data is stored. If objects and files are also in Redis, appending and rarely consolidating can potentially be significantly more "economical" than regularly saving large amounts of data.
As already mentioned above, this requires more RAM. If this RAM is not available, everything will continue to run smoothly - depending on the settings.
A backup of the data is not then created, however! Corresponding messages are only in the log file.

More details on persistence can be found at https://redis.io/topics/persistence

**Redis slaves**, i.e. a second Redis server, is another way to always have up-to-date data as a backup.
If the computer with the master Redis is defective, the data still exists on the slave in almost real-time.
You can use this to create a dump to reinstall the master, or as a quick solution you can make the slave the master and change the database IPs in ioBroker and you are almost back online. This can also be found in more detail in [forum](https://forum.iobroker.net/topic/26327/redis-in-iobroker-%C3%BCberblick) or at https://raw.githubusercontent.com/antirez/redis/5.0/redis.conf

**However, a slave does not protect against accidental deletion of data, as the data is deleted immediately afterwards on the slave. Only backups can help here.**

## Installation of Redis
Redis must be installed and configured as a separate service and the data should also be taken into account when backing up.
The persisted databases are saved in the form of JSON files in the "iobroker-data" folder.
The installation is done on the command line for

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

**Attention**: There are no official Redis builds for Windows.

## Setting up Redis
You can check using `sudo systemctl status redis-server`.
If it doesn't start again automatically after a reboot, `sudo systemctl enable redis-server` will help.
Redis uses port 6379 by default and also comes with a command line tool for accessing the database: `redis-cli` opens a shell.
The command `info` displays some information about the system, memory usage and the stored data ("keyspace"), which is of course currently empty.

If you are running a single-host system or ioBroker is running on the same host, then that's it.

If other hosts are to access this Redis server (slaves or something like that), then this must be allowed.
To do this, /etc/redis/redis.conf must be edited and the line **bind 127.0.0.1** must be changed to **bind 0.0.0.0** and directly below that the **protected_mode** must be set to **no**.

Afterwards, `sudo systemctl restart redis-server` restarts the server with the updated configuration.

For further details see [Multihost](https://www.iobroker.net/#de/documentation/config/multihost.md)

## Switch ioBroker database to Redis
Most changes and data queries take place with the States database. All data changes arrive here and are then distributed to adapters again if they have registered for certain data.
Switching the States to Redis therefore has by far the greatest and most noticeable performance effect.
If you are only switching the States database, you should ideally install the Redis server on the same host as the ioBroker master.

The conversion of the "states" is then done via:

```sh
iobroker stop
iobroker setup custom
```

Confirm the current settings for the "Objects" ("file" as type, IP, port 9001) and for "States" now set the type "redis", the IP of the Redis host server (or 127.0.01 if on the same host) and 6379 as the port.
To avoid losing all state data, it is a good idea to migrate the data, which the next questions in the configuration ask about.
After the migration, ioBroker can be restarted with **iobroker start**. If you also use slave systems, the same settings must be made everywhere using **iobroker setup custom**.
However, the question about migration must be answered in the negative!

If you also want to change "Objects", proceed in the same way and select the type "redis", enter the IP and port of the Redis host and, if necessary, migrate the data, which can take quite a while depending on the size.

**States and objects in the same or separate Redis processes?**

The easiest way is of course to store states and objects together in a Redis process.
This also means, however, that all data can only be backed up together.
In the ioBroker File DB, states, objects and files were separated and could thus be backed up selectively.
The write load is also higher if everything is stored in a Redis, as the database is larger.
In order to separate the frequently changing states and less frequently changed objects and files with a Redis setup, you can simply use two Redis processes per host.
Instructions for this can be found, for example, at https://gist.github.com/inecmc/f40ca0ee622e86999d9aa016c1b15e8c .

`iobroker setup custom` simply specifies the different ports for states or objects/files.

For states, it is recommended to use RDB persistence, which then saves the data every 5-15 minutes depending on the number of changes. For objects/files, AOF persistence is more suitable to minimize the write load.

## Backup
Redis usually saves its files under /var/lib/redis. The dump.rdb or appendonly.aof (depending on the persistence selected) located there can be saved. You can also create a dump.rdb using `redis-cli BGSAVE` directly before the backup and then save it away.