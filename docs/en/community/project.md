---
title: Working in a team
lastChanged: 08.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/community/project.md
hash: Qu8G6VD989WESoCYggDHd5Fcvc2FVVvzcLGrIwpLk9Y=
---
# Contribute to further development

Everything related to ioBroker is openly available on [GitHub](https://github.com/ioBroker) . This isn't a detail for developers, but rather the reason why anyone can contribute: there's no closed version, no internal branch, and no place where you have to ask for permission before making a suggestion.

## How the project is divided

| Part                     | What's inside                                                         |
| ------------------------ | --------------------------------------------------------------------- |
| `ioBroker.js-controller` | The core: databases, instance management, the`iobroker` -commands.    |
| `ioBroker.admin`         | The interface described in the Admin chapter of this manual.          |
| `ioBroker.<name>`        | One repository per adapter, usually managed by a single person.       |
| `ioBroker/ioBroker`      | The installation scripts for Linux, including the installation fixer. |
| `ioBroker.docs`          | This documentation.                                                   |

Adapters are independent. Anyone wanting to improve an adapter deals with the person who maintains it, not with a central committee. For adapters whose maintainer is no longer active, the [iobroker community adapters](https://github.com/iobroker-community-adapters) step in.

## Where to begin?

**No programming knowledge required.** Translations are almost universally lacking. Each adapter has a file containing the text for its configuration interface; adding support for a missing language is a manageable, clearly defined task. Documentation is also required; see [the article on writing](/docs/community/doc.md) .

**Programming skills are required.** The easiest way to get started isn't to develop your own new adapter, but to use an existing one: find a bug report you can understand and submit a suggestion. This way, you learn the structure without having to make all the decisions yourself.

**A custom adapter.** This is useful if a device or service is still missing. The process for creating one is described under [Adapter Development](/docs/dev/adapterdev.md) , and the rules for inclusion in the official repository are under [Publishing Adapters](/docs/dev/adapterpublish.md) .

Before you start a new adapter: ask in the [forum](https://forum.iobroker.net) if anyone is already working on it. It happens that two people independently build the same thing.

## How a proposal works

1. _Fork_ the repository.
2. Create a branch for the change.
3. Make the change as small as possible and limited to one thing.
4. Submit a pull request and explain **why** the change is necessary, not just what it does.
5. Respond to follow-up questions. Any proposal that remains unaddressed after the first follow-up question will not be adopted.

Small, clearly justified changes are implemented quickly. Major renovations should be discussed beforehand; otherwise, a lot of work will be wasted on something that wasn't intended.

## What the project carries

Besides source code, ioBroker needs people who answer questions in the forum, test beta versions, and clearly describe bugs. This is less visible than an adapter, but without this work, the rest won't function.