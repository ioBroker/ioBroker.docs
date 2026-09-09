---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/faq/_020_installation/030_update_nodejs.md
title: no title
hash: rfmDysgNjSfP8ChiBHfvvf2rjus9yRzteMPLY26HVgo=
---
## How do I update Node.js correctly?

Within a major version (e.g., from 22.9 to 22.11), a normal system update is sufficient:

```bash
sudo apt update && sudo apt upgrade
```

A change of **Main version** (e.g., from 20 to 22) is something else entirely. In this case, the modules need to be rebuilt; otherwise, the adapters won't start. This is handled by the command. `iob nodejs-update`.

!> Before a [Backup](/docs/config/backup.md)
create. And **never** Skip a major version or switch to an odd-numbered version.

The full process is available at
[Update Node.js](/docs/install/updatenode.md).

An update of ioBroker itself is different from an update of Node.js. For ioBroker, see \[link/reference].
[Update](/docs/install/update.md).