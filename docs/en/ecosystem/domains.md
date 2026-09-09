---
title: Addresses and services
lastChanged: 08.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/ecosystem/domains.md
hash: uVwvXa6fNQj2ffJkNFwsEs9tGEQcycbsx8FDdGdd1Cs=
---
# Addresses and services

There are a number of internet addresses associated with ioBroker. Some are websites, others are accessed by your installation in the background. This page categorizes what each address belongs to, so it's clear where a click or connection leads.

## The two main addresses

| address          | For what                                                                                                                                             |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **iobroker.net** | This website provides documentation, an adapter overview, statistics, and downloads. It also hosts the free account used to manage adapter licenses. |
| **iobroker.pro** | The paid cloud service. Remote access, voice assistants, notifications. Access licenses are managed there.                                           |

The two accounts are separate. Details about which account belongs to which account can be found under [Licenses](/docs/licenses/README.md) .

## The forum

**forum.iobroker.net** is the central hub for questions, bug reports, and project announcements. How to ask questions effectively there is explained under [Asking in the Forum](/docs/trouble/forum.md) .

## What your installation retrieves in the background

A running ioBroker system communicates with a few addresses on its own. All are harmless, but in a closed network, you need to know them.

| address                   | For what reason                                                                                                                                                                                                       |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **download.iobroker.net** | The adapter list. From there, the administrator retrieves the _stable_ and _beta_ repositories, i.e., the information about which adapters exist in which version. See [Repositories](/docs/basics/repositories.md) . |
| **registry.npmjs.org**    | The adapters themselves. Installation is done via npm, therefore the program code comes from there and not from ioBroker.                                                                                             |
| **github.com**            | Only if an adapter is explicitly installed from a separate source, or if an instance is using the development version.                                                                                                |
| **iobroker.org**          | Receives anonymous usage statistics, if enabled. See [Usage Statistics](/docs/ecosystem/statistics.md) .                                                                                                              |
| **iobroker.live**         | Provides the small status graphics ( _badges_ ) that display the current version status in the adapter descriptions.                                                                                                  |

Once the cloud service is running, the connection to **iobroker.pro** is established. This builds the instance from the inside out, so no port needs to be configured in the router.

## Tools for developers

These addresses are hosted on **iobroker.in** . They are used manually in the browser, not by your installation.

| address                         | For what reason                                                                                                                                                                         |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **adapter-creator.iobroker.in** | Creates the basic structure of a new adapter. See [recommendations](/docs/dev/bestpractices.md) .                                                                                       |
| **adapter-check.iobroker.in**   | Check an adapter repository for common errors before publishing. See [Publishing adapters](/docs/dev/adapterpublish.md) .                                                               |
| **translator.iobroker.in**      | Translates the text of an adapter into the supported languages.                                                                                                                         |
| **weblate.iobroker.net**        | The project's translation platform. Texts from the core and adapters are maintained there without requiring any programming knowledge. See [Get Involved](/docs/community/project.md) . |

## If an address is unreachable

If the administrator cannot access the adapter list, the _Adapters_ tab will remain empty or display outdated versions. This is almost always a naming or network problem and not a bug in ioBroker. Therefore, the first test is whether`download.iobroker.net` This is resolved by the ioBroker computer. Further information can be found under [Adapter Problems](/docs/trouble/adapter.md) .