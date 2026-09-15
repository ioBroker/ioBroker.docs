---
title: JS Controller
lastChanged: 08.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/dev/controller.md
hash: xpXhYUrbO6lLZir90f3rYYwBd7uBifWhIkHCvsbvipw=
---
# The js-controller from a development perspective

The js-controller is the core of every ioBroker installation. For adapter development, it's crucial to understand what it provides and the resulting rules. The user's perspective on this same element is described under [Controller and Adapter](/docs/basics/adapter.md) .

## What he takes over

| Task                   | What this means for the adapter                                                                                           |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Processes**          | The controller starts and stops instances and restarts them after a crash. An adapter does not need to keep itself alive. |
| **Object database**    | All descriptions: devices, channels, data points, instances, users. Rarely changed, often read.                           |
| **Condition database** | The values with timestamp and`ack` License plate. Frequently changed.                                                     |
| **News**               | Instances communicate with each other via the controller, not directly.                                                   |
| **Permissions**        | Any access violates the [rights](/docs/config/userrights.md) of the respective user.                                      |

An adapter never communicates directly with the databases. It uses`@iobroker/adapter-core` And this library communicates with the controller. Therefore, the adapter doesn't care whether the data is located in the built-in file databases or in [Redis](/docs/config/redis.md) , and whether the controller is running on the same machine or in a [multi-host environment](/docs/config/multihost.md) .

## Object and condition are two things

This is where most misunderstandings begin. An **object** describes something, a **state** contains the value. Both have the same ID, but reside in different databases and have different lifespans.

An object is created once during setup and rarely touched thereafter. Its state might change every second. Writing to the object with every value change creates unnecessary overhead.

The structure of an object is described under [Object Schema](/docs/dev/objectsschema.md) , the intended roles under [State Roles](/docs/dev/stateroles.md) .

## The ack license plate

Each condition, in addition to its value, carries a`ack` It distinguishes between two completely different things:

- `ack: false` This is a **request** . Someone wants something to be switched. An adapter monitors these states and implements the request.
- `ack: true` That's a **fact** . The adapter has learned from the device that this is the case and writes the value back.

Mixing the two creates feedback loops: the adapter reports a value, mistakes it for a command, and switches again.

## CV of an instance

The controller starts the process, passes the configuration to it, and expects it to respond. Upon termination, the adapter is given the opportunity to clean up, and this is not a courtesy: unremoved timers and open connections are the most common reason why an instance cannot be restarted cleanly and consumes memory until the system freezes.

## Update

The js-controller is **not** updated via the Adapter tab, but via the [Hosts](/docs/admin/hosts.md) tab or on the command line:

```bash
iobroker upgrade self
```

!> Create a [backup](/docs/config/backup.md) before changing the controller version. An adapter that requires a minimum controller version will specify this in its \[document/information].`io-package.json` one; see [publish adapter](/docs/dev/adapterpublish.md) .