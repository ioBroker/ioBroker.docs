---
title: Update
lastChanged: 07.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/install/update.md
hash: nuqMEaEe37j0+7NpnutRM3clHBXVKcy4QSUEcCzYZR0=
---
# Perform updates

An ioBroker installation consists of three layers, which are updated separately. This order has proven effective:

|   | What                                         | How often                                           |
| - | -------------------------------------------- | --------------------------------------------------- |
| 1 | [adapter](/docs/install/updateadapter.md)    | frequently - something comes up every week          |
| 2 | [js-controller](/docs/install/updateself.md) | rarely - a few times a year                         |
| 3 | [Node.js](/docs/install/updatenode.md)       | Rarely - when a version reaches the end of its life |

In addition, there is the operating system itself, which is supplied according to its own rules (`sudo apt update && sudo apt full-upgrade` ).

## Before every update: back up

A failed update can take days without a backup. With a backup, it takes half an hour.

```bash
iob stop
iob backup
iob start
```

The backup is saved as a ZIP file with the date in the directory.`backups` below the ioBroker folder. Anyone using the _backitup_ adapter will have this running anyway – in that case, it's worth checking whether the last backup is truly recent and whether it's located outside the device.

On a virtualized system, taking a snapshot before the update is the most convenient way to ensure safety; if in doubt, the previous state can be restored in a minute.

## The chronological order

**First the adapters, then the JS controller.** A new JS controller sometimes requires newer adapters; the reverse direction is more compatible.

**Node.js should only be updated last and deliberately.** Changing the main Node.js version is the most significant change. It has its own prerequisites and a separate page: [Updating Node.js & npm](/docs/install/updatenode.md) .

**Don't do everything in the same evening.** If something goes wrong after three simultaneous updates, the cause is difficult to find. Do one update, observe briefly, then move on to the next.

## Where updates are displayed

In the admin panel, under _Adapter_ , it shows for each entry whether a newer version is available in the repository. The console displays this information.

```bash
iob update --updatable
```

The same for everything at once, without changing anything.

## Stable and Latest

There are two repositories. **Stable** contains versions that have proven themselves across a wide range of systems; **Latest** contains everything as soon as it is released. For a system that needs to run reliably, Stable is the right setting – Latest is intended for people who want to find and report bugs. See [Repositories](/docs/basics/repositories.md) for more information.

## If something is stuck after an update

- [ioBroker is no longer working](/docs/trouble/RunsNoMore.md)
- [Adapter error](/docs/trouble/adapter.md)
- `iob diag` summarizes the status - repository, node version, system status, the latest log entries.