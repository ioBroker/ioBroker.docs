---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/faq/_050_advanced/040_backup.md
title: no title
hash: k0xYbXrXrcXjZaLn720WbV0ahV0xyzCQWqQND5hwFzQ=
---
## Should I make a backup? Of what?

Yes, and that should happen before anything happens, not after.

ioBroker provides the adapter for this. **BackItUp** with, in the admin under the menu item
**Backup**It backs up the two databases (objects and states), the configuration and, if desired, also the data of connected systems, a HomeMatic-CCU, Grafana, InfluxDB, the scripts of the javascript adapter.

It makes sense to:

- a daily automatic run,
- the filing **outside** of the ioBroker computer (NAS, network drive, cloud),
- and at least one restore test. A backup that has never been restored is a guess.

A backup is also essential. **before** every major update, especially before an update of the js-controller or a change of the Node.js major version.

Detailed: [Backup](/docs/config/backup.md)