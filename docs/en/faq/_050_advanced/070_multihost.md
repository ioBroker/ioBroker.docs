---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/faq/_050_advanced/070_multihost.md
title: no title
hash: dxHNaiwu7IsHp1wMUWJbxMWowHtDUGQqkTJqP7XJwYE=
---
## What is a multi-host system?

Several computers that together form an ioBroker installation. One of them is the
**master**The two databases reside on this server. The other hosts retrieve the data from there and only run their own instances.

This makes sense primarily for two reasons:

- **Spatially**A second computer is located where the wireless dongle should be.
- **Load distribution**Computationally intensive adapters run on their own hardware.

Everything is managed via the master's admin; in the tab
[Instance](/docs/admin/instances.md) can be filtered by host, in the tab
[Hosts](/docs/admin/hosts.md) Each computer displays its values.

The master server is the single point on which everything depends. If it fails, the entire system shuts down. A multi-host setup simplifies the installation. **not**
not more reliable, but initially just larger.

Detailed: [Multihost](/docs/config/multihost.md)