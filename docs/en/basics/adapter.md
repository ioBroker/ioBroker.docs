---
title: Controller and adapter
lastChanged: 08.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/basics/adapter.md
hash: jrVzIeukaTGEa86M7U8QdyHhThbiYw3L39AhdsJDJAU=
---
# Controller and adapter

ioBroker consists of two types of programs: the **js-controller** and the
**Adapters**The controller holds the system together; the adapters provide the actual functions.

## The js-controller

The JS controller is the core of every installation. Exactly one runs on each host. It is written in TypeScript and performs four tasks:

| Task            | What's behind it                                                                                    |
| --------------- | --------------------------------------------------------------------------------------------------- |
| Manage instance | It starts and stops the instances and restarts them as needed.                                      |
| Data storage    | He manages the two databases, one for the objects and one for the states.                           |
| communication   | All instances exchange their data via him, not directly with each other.                            |
| surveillance    | It reports when an instance is no longer running, memory is running low, or an update is available. |

The JS controller is not in the tab **adapter** updated, but via the tab [Hosts](/docs/admin/hosts.md)
or via the command line. Details are available at
[Update ioBroker](/docs/install/updateself.md).

## adapter

An adapter connects a system to ioBroker: a device, a service, a protocol, or even just a data source on the internet. Externally, it speaks the language of the connected system; internally, it stores the data as objects and states. It thus acts as the interface between ioBroker and everything that is not part of ioBroker.

What an adapter can do depends on what it was designed for. Typical examples are:

- **Retrieve data.** Measurement data, states and messages from the connected system are stored as data points in ioBroker.
- **Steer.** Switch devices on and off, set values, issue commands.
- **Record.** Save values for later evaluation, for example `history`,
  `influxdb` or `sql`.
- **Visualize.** Provide surfaces, for example `vis-2` or `iqontrol`.
- **Automate.** Triggering processes according to conditions or schedules, for example
  `javascript` or `scenes`.
- **Notify me.** Send messages, for example `telegram` or `email`.
- **Look after.** Create backups, update firmware, monitor the system.

Well-known examples include the Zigbee adapter for radios, the MQTT adapter for anything that uses this protocol, and the JavaScript adapter for custom scripts and Blockly.

### Advantages

- **Flexibility.** Almost any system can be connected, regardless of its protocol.
- **Expandability.** New adapters are added for new devices, without changing anything else in the installation.
- **Centralization.** All connected systems are managed in one place and can be linked together.

### Adapter categories

Each adapter has a category, which determines the order of the list in the tab.
**adapter** filterable: `alarm`, `climate-control`, `energy`, `hardware`,
`lighting`, `logic`, `multimedia`, `weather` and more. The complete list with explanations is available at
[publish adapters](/docs/dev/adapterpublish.md).

## Instance

An installed adapter is not yet working. A **Instance** Once created, only this instance will be operational. It contains the configuration, such as the gateway address or the access credentials.

There can be multiple instances of an adapter. This is always useful when the same system exists multiple times or when tasks need to remain separate. `hm-rpc.0` for the radio interface and `hm-rpc.1` for the wired, two `telegram`-Instances for two recipient groups.

Each instance gets its own namespace in the object tree, consisting of the adapter name and a sequential number, for example: `hm-rpc.0`The instance then places its devices, channels, and data points within this framework.

Instances are created and configured in the tab
[Instance](/docs/admin/instances.md)More information about the data structure can be found at
[objects](/docs/basics/objects.md) and
[Conditions](/docs/basics/states.md).