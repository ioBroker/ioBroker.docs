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

Under _Adapter_ , each entry displays its installed version and the version available in the repository. If a newer version is available, an update arrow appears. Clicking this arrow first shows the changes in the new version – this list is worth reading, as it indicates if a version requires or removes any features.

The detailed description of adapter management can be found in the [adapter management tutorial](/docs/tutorial/adapter.md) .

## On the console

```bash
iob update --updatable      # zeigt nur, was aktualisierbar ist - ändert nichts
iob upgrade <adapter>       # aktualisiert genau diesen Adapter
iob upgrade                 # aktualisiert alle Adapter (nicht den js-controller)
```

?>`iob update` **It doesn't change anything** . It only reads what's in the repository. Changes are only made with...`iob upgrade` .

## Demotion

Sometimes the latest version isn't desirable: because a version has a flaw, or because an older one is needed until another adapter becomes available.

`iob upgrade <adapter>` Sets the adapter to the version specified in the chosen repository – **even if it's an older version** . A repository can also be specified directly in the command:

```bash
iob upgrade <adapter> <repository-url>
```

The same thing happens automatically when switching from _Latest_ back to _Stable_ .

A downgrade is not a clean revert. Data points and settings created by the newer version remain, and the older version is unaware of them. Therefore, [back up your data](/docs/install/update.md) before downgrading and carefully monitor the instance afterward.

## Install from GitHub

If a bug fix has not yet been released, an adapter can be installed directly from the source code - in the admin panel via _"Install adapter from custom URL"_ in expert mode.

These versions are pre-release versions. They are **not** updated via the normal update process and remain in place until you manually update them. This is the wrong approach for everyday use; however, it is appropriate for testing in a secondary environment.

## After the update

- Is the instance running again? It should be green under _Instances_ .
- Is there anything in the log? Warnings immediately after an update are the most common indication of a changed setting.
- Are the values being received? A quick look at the adapter's objects is all it takes.

## Read more

- [Performing updates](/docs/install/update.md) - the sequence of the three layers
- [Repositories](/docs/basics/repositories.md) - Stable and Latest
- [Adapter error](/docs/trouble/adapter.md) - if an adapter does not start after an update