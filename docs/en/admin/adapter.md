---
title: adapter
lastChanged: 07.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/admin/adapter.md
hash: ohAfRiVkLid0gIA/1Xhd86sypRrdd5oDsT9aDk1bd0w=
---
# Rider Adapter

This page lists all available adapters for ioBroker: the installed ones and the over 800 available ones. Adapters are installed, updated, and removed from here.

An adapter is initially just the program. For it to do anything, it needs a...
**Instance**This will also be created here and then in the tab
[Instance](/docs/admin/instances.md)
configured.

## The toolbar

<img src="media/admin_adapter_leiste.png" alt="Die Werkzeugleiste des Reiters Adapter" width="900" />

| No. | function                                                                                                                 |
| --- | ------------------------------------------------------------------------------------------------------------------------ |
| 1   | **Change view mode**: switches between tile and list view.                                                               |
| 2   | **Check adapter for updates.** This happens automatically when the admin starts; here it can be triggered manually.      |
| 3   | **Repository timestamp.** When the adapter list was created and last loaded.                                             |
| 4   | **Show only installed adapters.**                                                                                        |
| 5   | **Show only adapters with updates.**                                                                                     |
| 6   | **Install from your own source** (see below).                                                                            |
| 7   | **Filter by name.**                                                                                                      |
| 8   | **Select category**Lighting, energy, communication, and so on.                                                           |
| 9   | **Sorting**: Title, Name, Popular first, Recently updated, Recently created.                                             |
| 10  | The counter column. Clicking on it opens the statistics: available, installed, and updated adapters from the last month. |

Is there a yellow warning above the list indicating that the current repository is the...
_Latest (Beta) Repository_ ioBroker delivers pre-release versions. For a system that is intended to run reliably, this is essential. _Stabl&#x65;_&#x54;he changeover will take place in the [System settings](/docs/admin/settings.md).

## The tile view

Each adapter gets a tile with its name, description, number of instances, and available and installed versions. The button with the three dots flips the tile over; the commands are on the back.

<img src="media/admin_adapter_kachel.png" alt="Eine Adapterkachel und ihre Rueckseite" width="630" />

| No. | function                                                                                             |
| --- | ---------------------------------------------------------------------------------------------------- |
| 1   | **Add instance.** If the adapter is not already installed, it will be installed during this process. |
| 2   | **Automatic Upgrade Policy** for this adapter.                                                       |
| 3   | **Read me**: opens the adapter's documentation.                                                      |
| 4   | **File upload.**                                                                                     |
| 5   | **Delete adapter.** Existing instances and their objects will be lost in the process.                |
| 6   | **Install a specific version**: for example, to revert to an older one.                              |

The small characters under the adapter name describe, **How** The adapter is working, not its installation state:

| Sign                         | Meaning                                                                        |
| ---------------------------- | ------------------------------------------------------------------------------ |
| Cloud with a line through it | The adapter doesn't require a cloud; it communicates directly with the device. |
| Cloud                        | The adapter requires the manufacturer's cloud service.                         |
| Down arrow (_push_)          | The device automatically reports changes.                                      |
| Up arrow (_poll_)            | ioBroker queries the device regularly.                                         |
| Green Mountains              | The adapter reports crashes to its developer via Sentry.                       |

?> _push_ This is the more pleasant case: values arrive immediately, without ioBroker having to query every second.

Below the adapter name, you'll also see up to five stars. This is the rating from users who have installed the adapter. Clicking on it opens the ratings and comments and allows you to vote yourself. See
[Adapter reviews](/docs/ecosystem/rating.md).

## The list view

The adapters are grouped by category in the list. Each line shows the installed and available versions as well as the license; the same commands as on the back of the tile are displayed on the right.

<img src="media/admin_adapter_liste.png" alt="Die Listenansicht mit aufgeklappter Kategorie" width="900" />

This view is good for browsing: The header of each group shows how many adapters of the category are already installed.

## Install from your own source

The button with the Octocat opens a dialog with four options:

<img src="media/admin_adapter_eigene_quelle.png" alt="Der Dialog zum Installieren aus eigener Quelle" width="820" />

- **From npm**: a beta or latest version directly from npm.
- **From GitHub**: the latest pre-release version from the developer's repository.
- **User-defined**: any URL.
- **From file**: a locally available package.

These methods bypass the verified repository. The versions may not be fully tested, and **Dependencies are not checked.**. On a system that needs to be running, only use if a fix is urgently needed; otherwise, wait for the stable version.

The option _Create an instance if one does not already exist._ This is the default setting. If it is deselected, the instance must be created manually afterwards.