---
title: Install updates
lastChanged: 08.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/tutorial/updates.md
hash: lDDf2uNr1dAhSZ1iFc9+K7YJY8cAdMXQL4WUTZJodsY=
---
# Install updates

Updates keep a system running, but they are also the most common reason why it suddenly stops working. Both of these issues can be reconciled if you follow a specific order and don't try to do everything at once.

## The golden rule

!> Before each update
[Backup](/docs/config/backup.md)Not "one from last week," but one from now. It takes a minute to make, but the benefit could easily last an entire evening.

Here are two more rules that have proven effective in practice:

- **Not all at once.** If something goes wrong after five updates, you don't know which one it was.
- **Not right before leaving.** An update that goes wrong takes time.

## The chronological order

1. **Node.js**, if a new version is pending.
2. **js-controller**.
3. **adapter**.

Updating from the bottom up often works well and sometimes goes wrong: a new adapter may require a newer js-controller, and that in turn may require a newer Node.js version.

## Update adapter

In the rider [adapter](/docs/admin/adapter.md)
Adapters with a newer version are highlighted. Before clicking, it's worth checking the adapter's changelog: it will indicate whether the change is a bug fix or a modification that requires further work.

After the update: Check if the instance is running, and then...
[protocol](/docs/admin/log.md) see.

Stay on the repository **stable**The versions there have been tested.
_beta_ It is intended to help with testing, not for a system that needs to work. See
[Repositories](/docs/basics/repositories.md).

## Update the js-controller

He will **not** Updated in the Adapter tab, but in the tab
[Hosts](/docs/admin/hosts.md)A notification will appear there if a newer version is available. On the command line:

```bash
iobroker upgrade self
```

The user interface will be briefly unavailable during the update. This is normal.

## Update Node.js

This is the step with the most significant consequences and the only one that takes place outside of ioBroker. ioBroker provides its own command for this:

```bash
iobroker nodejs-update
```

!> Only **straight** Use version numbers, i.e., the LTS versions. Odd-numbered versions are not supported. See details below.
[Update Node.js](/docs/install/updatenode.md).

## The operating system

Under Linux, the underlying system also needs maintenance:

```bash
sudo apt update
sudo apt upgrade
```

A system that hasn't received security updates for years is a greater risk than an adapter that's one version behind.

## If an update goes wrong

1. Into the [protocol](/docs/admin/log.md)
   You can see it. It usually states clearly what's missing.
2. Stop the affected instance and restart it individually.
3. If that doesn't help, restore the backup. Instructions for doing so are below.
   [Restore configuration](/docs/trouble/restore.md)
   and in detail at
   [Restore](/docs/tutorial/restore.md).

And then in [forum](/docs/trouble/forum.md)
Ask around. If an update goes wrong for several people, experience shows you're not alone.