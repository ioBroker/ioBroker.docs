---
title: ioBroker basics
lastChanged: 14.05.2021
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/basics/README.md
hash: 4nSU2ciROiZWPofjIMQZOXpmkahrbQBmUU3WwJDFExw=
---
ioBroker is a pure software solution to connect different IoT systems to one overall system. Accordingly, a control center (gateway / interface) is still required for each system in order to be able to integrate its devices.

In special cases, a control center can be simulated using software or plugged into the ioBroker server as hardware (USB stick or similar).

## Modularity
ioBroker has a modular structure. These modules are called ***adapters*** at ioBroker.
There are over 400 [adapter](http://download.iobroker.net/list.html) for connecting various hardware or integrating various information such as weather, calendar, etc.

Therefore, only those adapters that are required for the individual needs need to be installed in an installation. This saves storage space and computing power.

So-called ***instances*** are created for each adapter. These are the "working versions" of the adapters. Depending on the adapter, any number of instances can be created in order to separate different subsystems or different task areas from one another.

The corresponding configuration takes place in these instances.

## Architecture
### Server
A special feature of ioBroker is that the tasks can be distributed over several servers **. In such a case one speaks of a ***multihost system*** . Reasons for the division can be spatial or a power distribution.

### Hardware requirements
An ioBroker server can be installed on almost any hardware. The only condition is that there is a current version of [nodejs](https://nodejs.org/en/download/) for the corresponding operating system.

!> As of May 2021, nodejs 12.x is still recommended for ioBroker.

For a larger installation, a working memory (RAM) of at least 2GB is recommended. A Raspberry Pi 2/3 with 1GB RAM is sufficient for testing; as a slave for individual adapters in a multihost environment, even smaller microcomputers are sometimes sufficient.

### Software
ioBroker manages the data in a database. The structure of the data is organized accordingly.

Each adapter has a so-called namespace that contains all the data on an instance of the adapter. Accordingly, the name of the namespace is e.g .: ***AdapterName.0***

Within this area, ioBroker creates the devices, their channels and, in turn, their data points with their values (states).

![Object structure](../../de/basics/../admin/media/ADMIN_Objekte_status_tree.png)

In this example, it is a self-created namespace for your own measured values.

[Adapter]: http://download.iobroker.net/list.html

[nodejs]: https://nodejs.org