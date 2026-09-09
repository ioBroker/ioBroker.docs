---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/faq/_050_advanced/040_backup.md
title: no title
hash: k0xYbXrXrcXjZaLn720WbV0ahV0xyzCQWqQND5hwFzQ=
---
## Should I make a backup? Of what?

Yes, and that should happen before anything happens, not after.

ioBroker includes the **BackItUp** adapter for this purpose, which can be found in the admin panel under the **Backup** menu item. It backs up the two databases (objects and states), the configuration, and optionally also the data of connected systems, a HomeMatic CCU, Grafana, InfluxDB, and the scripts of the JavaScript adapter.

It makes sense to:

- a daily automatic run,
- the storage location **outside** the ioBroker computer (NAS, network drive, cloud),
- and at least one restore test. A backup that has never been restored is a guess.

A backup should also be performed **before** every major update, especially before updating the js-controller or changing the Node.js main version.

In detail: [Backup](/docs/config/backup.md)