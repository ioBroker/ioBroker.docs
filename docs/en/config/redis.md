---
title: The Redis database for ioBroker
lastChanged: 27.02.2021
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/config/redis.md
hash: iS5fXBj9lEj5zQk1a5bbY7utI+8y43A3Sw9PKYfM8jw=
---
Redis is an open source in-memory database.
More information can be found at https://redis.io/

The big advantage of Redis:

Compared to the internal ioBroker databases, Redis mainly offers advantages in the areas of data access speed, IO management in the file system and better use of CPU resources.
The js controller is offloaded. A previously sluggish system can become faster again.
However, it is important that enough RAM is available, since Redis keeps all data in RAM. Depending on what exactly is stored in Redis, the RAM requirement ranges from a few MB (e.g. if only states are in Redis) to over 200 MB (if e.g. objects and files are also stored there).

## Redis FAQ
1. Do I need Redis for my ioBroker or not?

ioBroker's own databases are usually sufficient for all standard installations! Only when the js-controller permanently needs 50-70% or more CPU and the system feels sluggish at the same time, it makes sense to deal with the topic of Redis.
Alternatively, it becomes necessary if you are aiming for a highly available ioBroker system, but a few more things are necessary for this.

2. How do I find out if I'm using Redis or not?

Since ioBroker's own databases also use the Redis protocol for communication, it can sometimes be confusing when you read something about Redis in the log. As long as port 9000/9001 is mentioned, this indicates the internal database and has nothing to do with the external Redis database.
A call to `iobroker status` shows which database type is used for the States and Objects databases.
"file" means that ioBroker's own databases are used. "redis" means that a Redis is in use.

A detailed explanation on the subject of Redis with further information can be found in [Forum](https://forum.iobroker.net/topic/26327/redis-in-iobroker-%C3%BCberblick)

## Redis persistence
Typically, Redis is an "in-memory database". So the data is stored in RAM. When Redis exits, they're gone.
But to also enable an update, Redis supports two types of data storage on hard disk.
The RDB and AOF persistence.

**RDB** is active by default, this method saves all content to an RDB file. The storage interval can be configured and should be adapted to your own needs! Configuring this should be a mixture of data security (how much data can you cope with losing in a crash) and write load for the storage medium, since the entire content is always written (if there are objects in Redis, this may be several hundred MB!).

However, **AOF** ensures that the data is completely up-to-date.
For this purpose, a so-called AOF file is continuously written, where all changes are always appended. This file is then consolidated at regular intervals and thus becomes smaller again. How the final write load is exactly, and whether the whole thing is good for SD cards or not, depends on which data is stored. If objects and files are also in Redis, appending and consolidating rare ones is potentially much more "economical" than regularly saving large amounts of data.
As mentioned above, this requires more RAM. If this RAM is not available, depending on the settings, everything continues to run without any problems.
A backup of the data is then not created! Corresponding messages are only in the log file.

More details on persistence are available at https://redis.io/topics/persistence

**Redis Slaves**, i.e. a second Redis server, is another possibility to always have current data as a backup.
If the computer with the master Redis is defective, the data still exist on the slave almost in real time.
You can use this to create a dump to set up the master again, or as a quick solution you can make the slave the master and change the database IPs in ioBroker and you are almost online again. This can also be found in more detail in [Forum](https://forum.iobroker.net/topic/26327/redis-in-iobroker-%C3%BCberblick) or at https://raw.githubusercontent.com/antirez/redis/5.0/redis.conf

**However, a slave does not protect against the accidental deletion of data, since these are also deleted on the slave immediately afterwards. Only backups can help here.**

## Installing Redis
Redis must be installed and configured as a separate service and the data should also be taken into account when backing up.
The persisted databases are saved in the form of JSON files in the "iobroker-data" folder.
The installation takes place on the command line for

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

**Caution**: There are no official Redis builds for Windows.

## Set up Redis
You can check with `sudo systemctl status redis-server`.
If it doesn't start automatically after a reboot, `sudo systemctl enable redis-server` will help.
Redis uses port 6379 by default and also comes with a command line tool for accessing the database: `redis-cli` opens a shell.
The command `info` displays some information about the system, memory usage and the saved data ("keyspace"), which of course is currently empty.

If you run a single-host system or run ioBroker on the same host, then that's about it.

If other hosts should also be able to access this Redis server (slaves or something), then this must still be allowed.
To do this, /etc/redis/redis.conf must be edited and the line **bind 127.0.0.1** changed to **bind 0.0.0.0** and the **protected_mode** set to **no** directly below will.

Afterwards, `sudo systemctl restart redis-server` restarts the server with the updated configuration.

For more details see [multihost](https://www.iobroker.net/#de/documentation/config/multihost.md)

## Switch ioBroker database to Redis
Most changes and data queries take place with the States database. All data changes arrive here and are then distributed back to adapters when they have registered for specific data.
Changing the states to Redis has by far the largest and most noticeable performance effect.
If you only change the states database, you should ideally install the Redis server on the same host as the ioBroker master.

The "States" are then changed via:

```sh
iobroker stop
iobroker setup custom
```

Confirm the current settings for the "Objects" ("file" as type, IP, port 9001) and for "States" now as type "redis", the IP of the Redis host server (or 127.0.01 if on the same host ) and set 6379 as port.
In order not to lose all state data, it is advisable to migrate the data, which the next questions ask during configuration.
After the migration, ioBroker can be restarted with **iobroker start**. If you also use slave systems, the same settings must be made there via **iobroker setup custom**.
However, the question of migration must be answered in the negative!

If you also want to change "Objects", do the same and select the type "redis", enter the IP and port of the Redis host and migrate the data if necessary, which can take a while depending on the size.

**States and objects in the same or separate Redis processes?**

Of course, the easiest way is to store states and objects together in a Redis process.
However, this also means that all data can only be backed up together.
With the ioBroker File-DB, states, objects and files were separated and could thus be backed up selectively.
The write load is also higher when everything is stored in a Redis because the database is larger.
In order to separate the frequently changing states and not so often changed objects and files with a Redis setup, you can simply use two Redis processes per host.
There are instructions for this, for example, at https://gist.github.com/inecmc/f40ca0ee622e86999d9aa016c1b15e8c.

With `iobroker setup custom`, the respective different ports for states or objects/files are simply specified.

For states it is recommended to use an RDB persistence which then saves the data every 5-15 minutes depending on the number of changes. For objects/files, AOF persistence is more suitable for minimizing the write load.

## Backup
Redis typically stores its files under /var/lib/redis. The dump.rdb or appendonly.aof (depending on the selected persistence) located there can be saved. You can also create a dump.rdb with `redis-cli BGSAVE` directly before the backup and then save it away.