---
title: Advanced configuration
lastChanged: 08.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/config/README.md
hash: NcFCPaUAdbJ2sll5L4WBsoakKu5Fx/Rf3+NAWNEOrLI=
---
# Advanced configuration

A freshly installed ioBroker system is running, but it's configured for convenience, not continuous operation: no login, no encryption, no backups, all data stored in the built-in file databases. This is fine for a start. However, as soon as the system is used seriously, it's worth taking a look at the points in this chapter.

| Page                                            | What it's about                                                                                 |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| [Access management](/docs/config/userrights.md) | Users, groups, and the rights to the individual object.                                         |
| [authentication](/docs/config/login.md)         | Enable login to Admin, web and the other interfaces.                                            |
| [Encryption](/docs/config/encryption.md)        | HTTPS and certificates for web access.                                                          |
| [CLI](/docs/config/cli.md)                      | Commands on the command line. The escape route when the user interface is no longer accessible. |
| [Multihost](/docs/config/multihost.md)          | Distribute the load across multiple computers.                                                  |
| [Redis](/docs/config/redis.md)                  | Maintain the states in a faster database.                                                       |
| [Data recording](/docs/config/history.md)       | Record values: history, influxdb or sql, and how to switch between them.                        |
| [interfaces](/docs/config/api.md)               | Access points for everything that is not an adapter: simple-api, rest-api, WebSocket.           |
| [Data backup](/docs/config/backup.md)           | What is being backed up, where it goes, how often, and how it is returned.                      |

If you only read one of these pages, then the
[Data backup](/docs/config/backup.md)Everything else can be made up for later, but a missing backup cannot.

A sensible order for a system that is intended to remain:

1. **Set up backup** and trigger it manually once.
2. **password** for the user `admin` awarded and the **Registration**
   turn on.
3. If the system is to be accessible beyond the home network:
   **Encryption** to that, or better yet, the route via the
   [IoT adapter](/docs/cloud/iot.md).
4. For other people in the household **own users** Create with restricted rights.
5. Only when the system grows large: **Redis** and if necessary **Multihost**.