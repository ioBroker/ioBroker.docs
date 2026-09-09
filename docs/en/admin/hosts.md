---
title: Hosts
lastChanged: 07.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/admin/hosts.md
hash: FtcbwmSBtLiPuHX8yOIAYe1kZYAb4SsM/X7BjRg60V4=
---
# Hosts tab

These are the computers running ioBroker. In a normal installation, there is exactly one; in a
[Multi-host system](/docs/config/multihost.md)
These are the master host and all other hosts.

<img src="media/admin_hosts.png" alt="Der Reiter Hosts mit aufgeklappter Detailzeile" width="900" />

| No. | Meaning                                                                                                                                  |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Notifications** of the host. The number indicates the number of unread messages. These may contain indications of insufficient memory. |
| 2   | The **name** of the host.                                                                                                                |
| 3   | The current **CPU**-Load.                                                                                                                |
| 4   | The **R.A.M.**-Utilization.                                                                                                              |
| 5   | The **Operating hours** of the js-controller.                                                                                            |
| 6   | The **installed** Version of the js-controller.                                                                                          |
| 7   | The **available** Version. If it is higher than the installed version, an update is required.                                            |
| 8   | **events**: incoming and outgoing messages per second.                                                                                   |
| 9   | The **Change name**.                                                                                                                     |
| 10  | **Host basic settings.**                                                                                                                 |
| 11  | **Restart the host.**                                                                                                                    |
| 12  | The **Log level** of the host.                                                                                                           |
| 13  | Does the **Detail line** on.                                                                                                             |

The details line lists the platform, operating system, architecture, number and speed of processors, model, RAM, system uptime, Node.js and NPM version, host time and time offset, as well as the number of known adapters, disk size, free disk space, number of active instances, and installation directory.

?> **Time and time offset** Worth a look: If the host's clock is running incorrectly, all timestamps of the data points will be incorrect, and time-controlled processes will start at the wrong time.

## Update js-controller

The js-controller is the core of ioBroker. Updates will be offered here as soon as a newer version is available in the repository. Instructions on how to do this and what needs to be done beforehand can be found here.
[Update ioBroker](/docs/install/updateself.md).

Before updating the js-controller, a
[Backup](/docs/config/backup.md) created.