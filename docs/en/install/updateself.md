---
title: ioBroker
lastChanged: 07.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/install/updateself.md
hash: UuWOLh+jmdMGwpDrI68c6pPehGOuofEuJzncKHXR6e4=
---
# Update js-controller

The js-controller is the core of ioBroker: it maintains the databases, starts the adapters, and monitors them. It is rarely updated—only a few times a year—and because everything depends on it, this step needs to be prepared in advance.

## Previously

1. **Secure.** `iob stop`, `iob backup`, `iob start`. Additionally, a snapshot is taken on a virtualized system.
2. **Update the adapter first.** A newer JS controller sometimes requires newer adapters. See
   [Update adapter](/docs/install/updateadapter.md).
3. **Read the changes.** When making a major version jump, the list includes the points that can cause problems - a required Node.js version, a removed setting.
4. **Plan accordingly.** Not just before leaving.

## Update

A notification appears in the admin panel as soon as a newer version is available in the repository; the update can also be initiated there. On the console:

```bash
iob update          # zeigt, welche Version das Repository führt
iob upgrade self    # aktualisiert den js-controller
```

The command stops ioBroker during the update process and restarts it afterwards.

?> `iob upgrade self` follows the configured repository. If this leads to a
**lower** Versions are also downgraded - this is the way back when a version causes problems, and also the reason to check the repository beforehand.

## Thereafter

- Is everything working again? Under _Instance_ There must be no red entries.
- Read the log from the first few minutes. Messages about outdated requests usually relate to a single adapter that needs to catch up.
- `iob diag` summarizes the situation and is the basis of every question in the
  [forum](https://forum.iobroker.net).

## If it goes wrong

First
[ioBroker is no longer working](/docs/trouble/RunsNoMore.md) The most common causes are listed there in order. If that doesn't help, the quickest solution is the backup method described earlier:

```bash
iob restore <datei>
```

## Read more

- [Perform updates](/docs/install/update.md)
- [Update Node.js & npm](/docs/install/updatenode.md)
- [Console commands](/docs/config/cli.md)