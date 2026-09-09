---
title: Update adapter
lastChanged: 07.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/install/updateadapter.md
hash: u7tqEVXj1nDcHR5+WTE8XysrWNxMaHSdqXfvwD96+T0=
---
# Update and downgrade adapters

Adapters are the part of ioBroker that changes most frequently. They are updated individually – there's no reason to renew them all at once, and several good reasons against it.

## In the admin

Under _adapter_ Each entry displays its installed version and the version available in the repository. If a newer version is available, an update arrow appears. Clicking this arrow first shows the changes in the new version – this list is worth reading, as it indicates when a version requires or removes features.

The detailed description of the adapter management can be found in the
[Adapter Management Tutorial](/docs/tutorial/adapter.md).

## On the console

```bash
iob update --updatable      # zeigt nur, was aktualisierbar ist - ändert nichts
iob upgrade <adapter>       # aktualisiert genau diesen Adapter
iob upgrade                 # aktualisiert alle Adapter (nicht den js-controller)
```

?> `iob update` **Nothing changes**It only reads what's in the repository. Changes are only made with... `iob upgrade`.

## Demotion

Sometimes the latest version isn't desirable: because a version has a flaw, or because an older one is needed until another adapter becomes available.

`iob upgrade <adapter>` Sets the adapter to the version that is in the configured repository - **even if it is a lower one**A repository can also be specified directly with the command:

```bash
iob upgrade <adapter> <repository-url>
```

When switching from _Latest_ back to _Stable_ The same thing happens automatically.

Downgrading is not a clean reversal. Data points and settings created by the newer version remain, and the older version is unaware of them. Therefore, before downgrading...
[secure](/docs/install/update.md), and then observe the instance carefully.

## Install from GitHub

If a fix has not yet been released, an adapter can be installed directly from the source code - in the admin panel via _Install adapter from custom URL_ in expert mode.

!> Such versions are preliminary versions. They will be **not** The update process is repeated automatically and remains stalled until manually initiated. This is the wrong approach for everyday use; however, it's appropriate for testing in a secondary environment.

## After the update

- Is the instance running again? Under _Instance_ It must be green.
- Is there anything in the log? Warnings immediately after an update are the most common indication of a changed setting.
- Are the values being received? A quick look at the adapter's objects is all it takes.

## Read more

- [Perform updates](/docs/install/update.md) - the order of the three layers
- [Repositories](/docs/basics/repositories.md) - Stable and Latest
- [Adapter error](/docs/trouble/adapter.md) - if an adapter does not start after the update