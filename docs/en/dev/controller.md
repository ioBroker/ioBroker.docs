---
title: JS Controller
lastChanged: 08.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/dev/controller.md
hash: xpXhYUrbO6lLZir90f3rYYwBd7uBifWhIkHCvsbvipw=
---
# The js-controller from a development perspective

The js-controller is the core of every ioBroker installation. For adapter development, what it provides and the resulting rules are of primary importance. The user's perspective on this same object is under...
[Controller and adapter](/docs/basics/adapter.md).

## What he takes over

| Task                   | What this means for the adapter                                                                                           |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Processes**          | The controller starts and stops instances and restarts them after a crash. An adapter does not need to keep itself alive. |
| **Object database**    | All descriptions: devices, channels, data points, instances, users. Rarely changed, often read.                           |
| **Condition database** | The values with timestamp and `ack`License plate. Frequently changed.                                                     |
| **News**               | Instances communicate with each other via the controller, not directly.                                                   |
| **Permissions**        | Every attempt runs against the [right](/docs/config/userrights.md) of the respective user.                                |

An adapter never communicates directly with the databases. It uses
`@iobroker/adapter-core`And this library communicates with the controller. Therefore, the adapter doesn't care whether the data is in the built-in file databases or in... [Redis](/docs/config/redis.md)
and whether the controller is running on the same computer or in a separate computer
[Multihost network](/docs/config/multihost.md).

## Object and condition are two things

This is where most misunderstandings begin.
**object** describes a **Condition** It contains the value. Both have the same ID, but are located in different databases and have different lifespans.

An object is created once during setup and rarely touched thereafter. Its state might change every second. Writing to the object with every value change creates unnecessary overhead.

The construction of an object is subject to
[Object schema](/docs/dev/objectsschema.md), the intended roles under
[State roles](/docs/dev/stateroles.md).

## The ack license plate

Each condition, in addition to its value, carries a `ack`It distinguishes between two completely different things:

- `ack: false` is a **Wish**Someone wants something to be switched. An adapter monitors these conditions and executes the request.
- `ack: true` is a **fact**The adapter has learned from the device that this is the case and writes the value back.

Mixing the two creates feedback loops: the adapter reports a value, mistakes it for a command, and switches again.

## CV of an instance

The controller starts the process, passes the configuration to it, and expects it to respond. Upon termination, the adapter is given the opportunity to clean up, and this is not a courtesy: unremoved timers and open connections are the most common reason why an instance cannot be restarted cleanly and consumes memory until the system freezes.

## Update

The js-controller will **not** updated via the Adapter tab, but via the tab
[Hosts](/docs/admin/hosts.md) or on the command line:

```bash
iobroker upgrade self
```

!> Before changing the controller version,
[Backup](/docs/config/backup.md) create. An adapter that requires a minimum version of the controller carries this in its `io-package.json` one; see
[publish adapters](/docs/dev/adapterpublish.md).