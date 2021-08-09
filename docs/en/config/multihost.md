---
title: Multihost
lastChanged: 13.09.2018
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/config/multihost.md
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
hash: gH4zuuZ+a67CUc09gI901hft2T4V48aHFUypPcHeiak=
---
# The multihost operation
ioBroker is able to have the tasks done by several servers. This allows the processing load to be distributed across multiple hosts.
However, you can also use system-specific extensions of a single-board computer (GPIO from a RaspberryPi, although the "main computer" is a more powerful Intel NUC).

After creating a multihost system, all configurations are carried out centrally via the admin of the master. The admin of the slave (s) can no longer be reached via their web interface (s).

It therefore makes sense to use a host with a minimal installation for a slave, i.e. only the js-controller and the admin.

## Installation
### Master configuration
Execute the following command on the master:

** This step is absolutely necessary if Redis DB is in use. ** In other cases it can be used if the automatic method (see below) fails. Then please select f (ile) instead of r (edis)!

please call via the console:

1. `iobroker setup custom`

Complete the menu that now appears as follows

```
Type of objects DB [(f)ile, (c)ouch, (r)edis], default [file]: f
Host / Unix Socket of objects DB(file), default[0.0.0.0]:
Port of objects DB(file), default[9001]:
Type of states DB [(f)file, (r)edis], default [file]: r
Host / Unix Socket of states DB (redis), default[127.0.0.1]: 0.0.0.0
Port of states DB (redis), default[6379]:
Data directory (file), default[../../../iobroker-data/]: /opt/iobroker/iobroker-data/
Host name of this machine [ioBroker-RasPi]:
```

2. `iobroker multihost enable`

``` enter pass phrase```

3. `iobroker restart`

### Slave configuration
** This step is absolutely necessary if Redis DB is in use. **

Please enter via the console on the slave

1. `iobroker setup custom`

Complete the menu that now appears as follows

```
Type of objects DB [(f)ile, (c)ouch, (r)edis], default [file]: f
Host / Unix Socket of objects DB(file), default[127.0.0.1]: <MASTER-IP>
Port of objects DB(file), default[9001]:
Type of states DB [(f)file, (r)edis], default [file]: r
Host / Unix Socket of states DB (redis), default[<MASTER-IP>]:
Port of states DB (redis), default[6379]:
Host name of this machine [raspi-sub-1]:
```

at the end the info appears:

```
creating conf/iobroker.json
```

2. `iobroker multihost connect`

and fill out the following dialogs accordingly:

```
1 |       <MASTER-IP> |  host |       192.168.86.42 | "authentication required"
Please select host [1]: 1
Enter secret phrase for connection: *****

Config ok. Please restart ioBroker: "iobroker restart"
```

2. `iobroker restart`

The newly created host then appears on the main system under Hosts.

If that doesn't happen, please reboot both hosts. first the master, then the slave.

## Multihost with different subnets
** If both ioBroker hosts are in different subnets, ...

Example:**

* Normal LAN (for PC, tablet, use.) = 192.168.178.0/24
* IoT LAN (for Shelly, cameras, etc.) = 10.20.30.0/24

... the multihost automatic (“sudo iobroker multihost enable” and “sudo iobroker multihost browse“) does not work, but only the old way (`iobroker setup custom`) see above

## Multihost with redis
If a multihost environment is to be installed in which the states are saved in redis, there are still a few things to consider.

The redis.conf file on the host on which the states are saved must be changed as follows.

```
nano /etc/redis/redis.conf
```

The line `bind 127.0.0.1` contained therein must be supplemented with the IP of the network adapter so that the Redis server allows connects from outside.

So for example

```
bind 127.0.0.1 192.168.1.10
```

assuming that 192.168.1.10 is the local IP of the ioBroker master.

This adjustment is only necessary on the master.

Alternatively also works

```
bind 0.0.0.0
```

Finally restart the Redis server or computer. eg:

```
sudo service redis-server restart
```

## Distribute tasks
There are two ways to distribute the tasks among the hosts.

* If it is a new installation, select the host on which the instance of the adapter is to be installed in the Adapter tab from the pull-down menu above the adapter list.

Then add the instance there by clicking on the (+) in the right column.

* If you have already installed many adapters on a host, you can change the assignment of the installed instances in the Instances tab.

## Delete host
To delete a host, activate the expert mode in the objects admin tab of the master and activate the host selection in the Type column. Then delete the desired host.

## Possible problems
sometimes a message similar to:

```> ... bytes ... in strict mode```

Then please edit the file in which this occurs with the nano Editor. Right at the beginning is `'use strict';` Comment this line with // and save.

```> IP Address of the host is 127.0.0.1. It accepts no connections. Please change.```

if you did not do ``` setup custom ``` on the master system