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

1. **Secure.**`iob stop` ,`iob backup` ,`iob start` . Additionally, a snapshot is taken on a virtualized system.
2. **Update the adapter first.** A new JS controller sometimes requires newer adapters. See [Updating adapters](/docs/install/updateadapter.md) .
3. **Read the changes.** If there's a major version jump, it will list the points that might cause problems – a required Node.js version, a removed setting.
4. **Plan ahead.** Don't arrive just before leaving.

## Update

A notification appears in the admin panel as soon as a newer version is available in the repository; the update can also be initiated there. On the console:

```bash
iob update          # zeigt, welche Version das Repository führt
iob upgrade self    # aktualisiert den js-controller
```

The command stops ioBroker during the update process and restarts it afterwards.

?>`iob upgrade self` It follows the configured repository. If this repository contains an **older** version, it will also be downgraded – this is the way back if a version causes problems, and also the reason to check the repository beforehand.

## Thereafter

- Is everything working again? There should be no red entries under _instances_ .
- Read the log from the first few minutes. Messages about outdated requests usually relate to a single adapter that needs to catch up.
- `iob diag` It summarizes the current situation and is the basis of every question in the [forum](https://forum.iobroker.net) .

## If it goes wrong

First, [ioBroker stops working](/docs/trouble/RunsNoMore.md) – the most common causes are listed there in order. If that doesn't help, restoring from the backup you just made is the quickest solution:

```bash
iob restore <datei>
```

## Read more

- [Perform updates](/docs/install/update.md)
- [Update Node.js & npm](/docs/install/updatenode.md)
- [Console commands](/docs/config/cli.md)