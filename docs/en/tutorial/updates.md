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

Make a [backup](/docs/config/backup.md) before every update. Not "one from last week," but one from now. It takes a minute, but could save you an entire evening.

Here are two more rules that have proven effective in practice:

- **Not all at once.** If something's stuck after five updates, you won't know which one it was.
- **Not right before leaving.** A botched update takes time.

## The chronological order

1. **Node.js** , in case a new version is available.
2. **js-controller** .
3. **Adapter** .

Updating from the bottom up often works well and sometimes goes wrong: a new adapter may require a newer js-controller, and that in turn may require a newer Node.js version.

## Update adapter

In the [Adapters](/docs/admin/adapter.md) tab, adapters with newer versions are highlighted. Before clicking, it's worth checking the adapter's changelog: this will indicate whether it's a bug fix or a redesign that requires further work.

After the update: Check if the instance is running and look at the [log](/docs/admin/log.md) .

Stay on the **stable** repository. The versions there are tested. _Beta_ is for testing purposes, not for a system that needs to work. See [Repositories](/docs/basics/repositories.md) .

## Update the js-controller

It is **not** updated in the Adapter tab, but in the [Hosts](/docs/admin/hosts.md) tab. A notification appears there if a newer version is available. On the command line:

```bash
iobroker upgrade self
```

The user interface will be briefly unavailable during the update. This is normal.

## Update Node.js

This is the step with the most significant consequences and the only one that takes place outside of ioBroker. ioBroker provides its own command for this:

```bash
iobroker nodejs-update
```

Use only **even** version numbers, i.e., the LTS versions. Odd versions are not supported. [See Update Node.js](/docs/install/updatenode.md) for details.

## The operating system

Under Linux, the underlying system also needs maintenance:

```bash
sudo apt update
sudo apt upgrade
```

A system that hasn't received security updates for years is a greater risk than an adapter that's one version behind.

## If an update goes wrong

1. Check the [minutes](/docs/admin/log.md) . They usually state in plain language what's missing.
2. Stop the affected instance and restart it individually.
3. If that doesn't help, restore the backup. Instructions on how to do this can be found under ["Restore configuration"](/docs/trouble/restore.md) and in detail under ["Restore"](/docs/tutorial/restore.md) .

And then ask in the [forum](/docs/trouble/forum.md) . If an update goes wrong for several people, you're usually not alone.