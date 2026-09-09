---
title: Introduction
lastChanged: 08.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/cloud/README.md
hash: pRgxvC/7BBGM69OeRprR65cyZj2ZoCP9ORWmDoN0U2w=
---
# Cloud services and apps

ioBroker runs on your own network, and that's the normal setup: the data stays within your home, and everything continues to work without internet access. However, your own network isn't sufficient for three things:

- **Access from anywhere**, without opening a port in the router.
- **Voice assistants**, because Alexa and Google Home send their requests from the internet.
- **External services**, which are supposed to report something to ioBroker, such as a webhook.

That's what the ioBroker cloud is for. The crucial point here is that the connection is... **from inside to outside** Set up. Your router remains closed, no port forwarding needs to be configured, and your installation is not accessible from the internet.

## The adapters

| adapter   | For what                                                                         |
| --------- | -------------------------------------------------------------------------------- |
| **IoT**   | The current approach. Voice assistants, remote access and services all in one.   |
| **cloud** | The predecessor. Still in operation, but for new facilities it is `iot` planned. |

Both require an account. One account is sufficient for free remote access.
[ioBroker.net](https://iobroker.net), for voice assistants and enhanced remote access, one is used at [ioBroker.pro](https://iobroker.pro) Used. The differences between the two are explained below.
[Access licenses](/docs/licenses/cloud.md).

## The pages in this chapter

| Page                                                | Contents                                                                                                         |
| --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| [IoT](/docs/cloud/iot.md)                           | Create an account, set up an instance, and check the connection. This is the starting point for everything else. |
| [Visualizations](/docs/cloud/viz.md)                | Access your own interface while on the go.                                                                       |
| [editors](/docs/cloud/editor.md)                    | Give other people access to the account.                                                                         |
| [Services](/docs/cloud/services.md)                 | Send values to ioBroker or trigger commands via an address.                                                      |
| [Alexa Smart Home Skill](/docs/cloud/alexasmart.md) | Switch devices using the usual commands.                                                                         |
| [Alexa Custom Skill](/docs/cloud/alexacustom.md)    | Custom voice commands and status queries.                                                                        |
| [App](/docs/cloud/app.md)                           | The official app for phone and tablet.                                                                           |

For voice control and custom-built interfaces to function, rooms and functions must be maintained. Without this...
[Categories](/docs/basics/enums.md) Neither Alexa nor a visualization adapter knows what is meant.

Before external access is set up: the user `admin` enter a password and the
[Registration](/docs/config/login.md)
turn on.