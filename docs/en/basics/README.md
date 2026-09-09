---
title: ioBroker Basics
lastChanged: 07.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/basics/README.md
hash: ITCRY87U7tDXgOXNaJOfXvDr7l9WllchtlVkoo183Dk=
---
# ioBroker Basics

ioBroker is a purely software-based solution for connecting various IoT systems into a single, integrated system. Therefore, each system still requires a central hub (gateway/interface) to integrate its devices.

In special cases, such a central unit can be replicated via software, or connected to the ioBroker server as hardware (USB stick or similar).

## Modularity

ioBroker has a modular structure. These modules are called... _**adapter**_.\
There are over 800 [adapter](/adapters) for connecting various hardware or integrating a wide range of information such as weather, calendar, etc.

Therefore, only the adapters required for individual needs need to be installed in an installation. This saves storage space and computing power.

Each adapter comes with so-called _**Instance**_ These are the "working versions" of the adapters. Depending on the adapter, any number of instances can be created to separate different subsystems or different task areas from each other.

The corresponding configuration takes place in these instances.

## architecture

### server

One special feature of ioBroker is that tasks can be distributed across multiple servers. **can**In such a case, one speaks of a _**Multi-host system**_&#x52;easons for the division can be spatial in nature or a distribution of workload.

### Hardware requirements

An ioBroker server can be installed on almost any hardware. The only requirement is that a current version of ioBroker is available for the corresponding operating system. [nodejs](https://nodejs.org/en/download/) gives.

ioBroker recommends the LTS version. **Node.js 22**Odd-numbered Node.js versions must not be used. Details can be found at \[link/reference]. [Install Node.js](/docs/install/nodejs.md).

The minimum requirements are 2 GB of RAM and 32 GB of storage; 4 GB (preferably 6 to 8 GB) of RAM and 64 GB of storage are recommended. A Raspberry Pi 4 is sufficient for testing; even a smaller one will suffice as an additional host for a few adapters in a multi-host system. The complete table is available at \[link to table]. [Requirements](/docs/install/requirements.md).

### software

ioBroker manages the data in a database. The data structure is organized accordingly.

Each adapter has a so-called namespace that contains all the data for an instance of the adapter. Accordingly, the name of the namespace might be, for example: _**AdapterName.0**_

Within this area, ioBroker creates the devices, their channels, and in turn their data points with their values (states).

<img src="media/objekte_baum.png" alt="Der Objektbaum: Adapter, Instanz, Geraet, Kanal, Datenpunkte" width="900" />

In the example, the namespace belongs `hm-rpc.0` to the first instance of the HomeMatic adapter. The device is located below it. `LEQ0903185` (a door lock), including its channels and within them the individual data points with their current values. More information at
[objects](/docs/basics/objects.md) and [Conditions](/docs/basics/states.md).

[nodejs]: https://nodejs.org