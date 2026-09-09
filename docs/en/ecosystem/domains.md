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

The two accounts are separate. Details of which account belongs to which account can be found under \[link/section name].
[Licenses](/docs/licenses/README.md).

## The forum

**forum.iobroker.net** This is the central point of contact for questions, bug reports to the community, and project announcements. How to ask questions effectively there is explained below. [Ask in the forum](/docs/trouble/forum.md).

## What your installation retrieves in the background

A running ioBroker system communicates with a few addresses on its own. All are harmless, but in a closed network, you need to know them.

| address                   | For what reason                                                                                                                                                                                                       |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **download.iobroker.net** | The adapter list. The administrator retrieves the repositories from there. _stable_ and _beta_, i.e., information on which adapters are available in which version. See [Repositories](/docs/basics/repositories.md). |
| **registry.npmjs.org**    | The adapters themselves. Installation is done via npm, therefore the program code comes from there and not from ioBroker.                                                                                             |
| **github.com**            | Only if an adapter is explicitly installed from a separate source, or if an instance is using the development version.                                                                                                |
| **iobroker.org**          | Receives anonymous usage statistics, if enabled. See [Usage statistics](/docs/ecosystem/statistics.md).                                                                                                               |
| **iobroker.live**         | Provides the small status graphs (_Badges_), which display the current version status in the adapter descriptions.                                                                                                    |

Once the cloud service is operational, the connection to **iobroker.pro** This means the instance is built from the inside out, so no port needs to be created in the router.

## Tools for developers

These addresses operate under **iobroker.in**They are used manually in the browser, not by your installation.

| address                         | For what reason                                                                                                                                                                           |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **adapter-creator.iobroker.in** | Creates the basic framework of a new adapter. See [Recommendations](/docs/dev/bestpractices.md).                                                                                          |
| **adapter-check.iobroker.in**   | Check an adapter repository for common errors before publishing. See [publish adapters](/docs/dev/adapterpublish.md).                                                                     |
| **translator.iobroker.in**      | Translates the text of an adapter into the supported languages.                                                                                                                           |
| **weblate.iobroker.net**        | The project's translation platform. The texts from the core and adapters are maintained there without requiring any programming knowledge. See [Participate](/docs/community/project.md). |

## If an address is unreachable

If the admin cannot access the adapter list, the tab remains. _adapter_ If the file is empty or shows outdated versions, this is almost always a naming or network problem and not a bug in ioBroker. Therefore, the first test is whether...
`download.iobroker.net` how it is resolved by the ioBroker computer. More information at [Adapter problems](/docs/trouble/adapter.md).