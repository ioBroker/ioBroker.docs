---
title: ioBroker Basics
lastChanged: 24.08.2024
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/basics/README.md
hash: MXTgEqstM92RN3uaLS8jZhn4QQRPF+WUr/K7ibC/BO0=
---
ioBroker is a pure software solution for connecting different IoT systems to form an overall system.
Accordingly, each system still requires a central unit (gateway/interface) in order to be able to integrate its devices.

In special cases, such a control center can be simulated using software or connected to the ioBroker server as hardware (USB stick or similar).

## Modularity
ioBroker has a modular structure. These modules are called ***Adapters*** at ioBroker.
There are over 600 [adapter](http://download.iobroker.net/list.html) for connecting various hardware or integrating various information such as weather, calendar, etc.

Therefore, only the adapters required for individual needs need to be installed in an installation.
This saves storage space and computing power.

So-called ***instances*** are created for each adapter.
These are the "working versions" of the adapter.
Depending on the adapter, any number of instances can be created in order to separate different subsystems or different task areas from one another.

The corresponding configuration takes place in these instances.

## Architecture
### Server
A special feature of ioBroker is that the tasks **can** be distributed across multiple servers.
In such a case, it is referred to as a ***multihost system***.
The reasons for the division can be spatial or performance-related.

### Hardware requirements
An ioBroker server can be installed on almost any hardware.
The only requirement is that there is a current version of [nodejs](https://nodejs.org/en/download/) for the corresponding operating system.

!> As of August 2024, Node.js 20.x is recommended for ioBroker.

For a larger installation, a RAM of at least 2 GB, preferably 4 GB, is recommended. For testing, a Raspberry Pi 2/3 with 1 GB RAM is sufficient; even smaller computers are sufficient as a slave for a few adapters in a multi-host environment.

###Softwares
ioBroker manages the data in a database. The structure of the data is organized accordingly.

For each adapter there is a so-called namespace that contains all the data for an instance of the adapter.
Accordingly, the name of the namespace is, for example: ***AdapterName.0***

Within this area, ioBroker creates the devices, their channels and their data points with their values (states).

![Object structure](../../de/admin/media/ADMIN_Objekte_status_tree.png)

In this example, it is a self-created namespace for your own measured values.

[Adapter]: http://download.iobroker.net/list.html

[nodejs]: https://nodejs.org