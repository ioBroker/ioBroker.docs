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

ioBroker has a modular structure. These modules are called _**adapters**_ in ioBroker.\
&#x20;There are over 800 [adapters](/adapters) for connecting various hardware or integrating a wide range of information such as weather, calendar, etc.

Therefore, only the adapters required for individual needs need to be installed in an installation. This saves storage space and computing power.

For each adapter, so-called _**instances**_ are created. These are the "working versions" of the adapters. Depending on the adapter, any number of instances can be created to separate different subsystems or different task areas from one another.

The corresponding configuration takes place in these instances.

## architecture

### server

A special feature of ioBroker is that tasks **can** be distributed across multiple servers. In such a case, it is referred to as a _**multi-host system**_ . Reasons for this distribution can be geographical or resource allocation.

### Hardware requirements

An ioBroker server can be installed on almost any hardware. The only requirement is that a current version of [Node.js](https://nodejs.org/en/download/) is available for the respective operating system.

ioBroker recommends the LTS version **Node.js 22.** Odd-numbered Node.js versions must not be used. See [Installing Node.js](/docs/install/nodejs.md) for details.

The minimum requirements are 2 GB of RAM and 32 GB of storage; 4 GB (ideally 6 to 8 GB) of RAM and 64 GB of storage are recommended. A Raspberry Pi 4 is sufficient for testing; less is needed as an additional host for a few adapters in a multi-host system. The complete table can be found under [Requirements](/docs/install/requirements.md) .

### software

ioBroker manages the data in a database. The data structure is organized accordingly.

Each adapter has a so-called namespace that contains all the data for an instance of the adapter. Accordingly, the namespace might be, for example, _**AdapterName.0.**_

Within this area, ioBroker creates the devices, their channels, and in turn their data points with their values (states).

<img src="media/objekte_baum.png" alt="Der Objektbaum: Adapter, Instanz, Geraet, Kanal, Datenpunkte" width="900" />

In the example, the namespace belongs`hm-rpc.0` to the first instance of the HomeMatic adapter. The device is located below it.`LEQ0903185` (a door lock), including its channels and within them the individual data points with their current values. More information can be found under [Objects](/docs/basics/objects.md) and [States](/docs/basics/states.md) .

[nodejs]: https://nodejs.org