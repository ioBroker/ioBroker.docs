---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/faq/_020_usage/020_js_controller.md
title: no title
hash: dDuRxWR8fYL2k6gkOEaoYAox45L3oiGf+xqZGVOqznk=
---
## What is the js-controller?

The js-controller is the core of ioBroker. It starts and stops the instances, manages the two databases (objects and states), and monitors the system. Nothing works without it.

It is not an adapter and therefore does not appear in the adapter list. Its version is listed in the tab.
[Hosts](/docs/admin/hosts.md), its update runs via
[Update ioBroker](/docs/install/updateself.md).

Before updating the js-controller, a
[Backup](/docs/config/backup.md) created.