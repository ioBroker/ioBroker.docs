---
title: Link box
lastChanged: 08.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/integrators/linkbox.md
hash: 1yLduJWQVBMBUILdRdPGKxMTbDLPhFM+KeUouXzCGSo=
---
# Link box

The Link-Box is a VPN solution that allows access to systems without opening a port on their network. It is designed for users managing multiple installations in different locations.

## Construction

The solution consists of three parts:

| Part             | Where he runs                                                         |
| ---------------- | --------------------------------------------------------------------- |
| **Cloud server** | On duty. Mediating between both sides.                                |
| **link box**     | On the computer of the person accessing it, running Windows or Linux. |
| **adapter**      | In the system being accessed.                                         |

Both sides are building the connection **from inside to outside** to the server. This means that nothing needs to be opened in either the customer's network or the customer's own network. The adapter configuration defines which connections are allowed; everything else remains closed.

Access requires an account at [ioBroker.pro](https://iobroker.pro) in advance.

## Demarcation

|                 | Link box                          | [IoT adapter](/docs/cloud/iot.md)    |
| --------------- | --------------------------------- | ------------------------------------ |
| Intended for    | Management of multiple facilities | Access to your own system            |
| Reaches through | Any connections                   | User interfaces and voice assistants |
| Target audience | Integrators                       | user                                 |

For accessing your own installation remotely, the IoT adapter is the simpler option. The Link Box is worthwhile if you regularly access external networks and require more than just a web interface.

## Occupancy and furnishing

The software and instructions are available in the repository.
[ioBroker.link-box](https://github.com/ioBroker/ioBroker.link-box).

This page describes the structure, not the detailed setup. Before deploying it at a client's site, the current project status and the service terms and conditions should be reviewed.