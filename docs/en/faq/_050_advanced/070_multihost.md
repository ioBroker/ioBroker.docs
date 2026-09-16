---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/faq/_050_advanced/070_multihost.md
title: no title
hash: dxHNaiwu7IsHp1wMUWJbxMWowHtDUGQqkTJqP7XJwYE=
---
## What is a multi-host system?

Several computers together form an ioBroker installation. One is the **master** : it houses the two databases. The other hosts retrieve the data from there and only run their own instances.

This makes sense primarily for two reasons:

- **Spatially** : a second computer is located where the wireless dongle belongs.
- **Load balancing** : computationally intensive adapters run on their own hardware.

Everything is managed via the master's admin; the [Instances](/docs/admin/instances.md) tab allows filtering by host, and the [Hosts](/docs/admin/hosts.md) tab lists each computer with its values.

The master server is the single point on which everything depends. If it fails, the entire system shuts down. A multi-host setup **doesn't** make the installation more resilient, it just makes it larger initially.

In detail: [Multihost](/docs/config/multihost.md)