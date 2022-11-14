---
title: admin
lastChanged: 11.11.2022
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/admin/README.md
hash: EBGvdYWH0ZAf9QUM3TNnRRTRhH1I1ZMNTPMf046zUKQ=
---
# The user interface
!> **Due to the extent of the documentation, this is only an overview, detailed information is provided on the pages linked to the tabs via the section headings. Please click on the headings.**

The Adapter Admin is the basic adapter and is used to operate the entire ioBroker installation. It provides a web interface. This is called under the ``<IP-Adresse des Servers>:8081``.

This adapter is created directly during the installation of ioBroker, manual installation is not necessary

![The admin in the tile view](../../de/admin/media/ADMIN_Adapter_Kachel.png)

The following functions, among others, can be accessed via the GUI provided by the adapter:

* Entry of system-wide settings
* Installation of additional adapters and their instances
* Access to the configuration of the instances
* Access to object and its status overview
* Access to the administration of users and groups
* Access to log files (protocols)
* Management of hosts
* File management

The adapter view is divided into the areas 1 - menu bar, 2 - main window and 3 - system settings

![The structure of the admin](../../de/admin/media/ADMIN_Screen_numbers.png)

## Menu bar
The menu bar contains several menu items. In the basic installation, these items are displayed as shown in the figure. After installing additional adapters, the triangle icon at the top left (1) can be used to activate additional points or deactivate them for a better overview.

![menu items](../../de/admin/media/ADMIN_Screen01_menuitems_numbers.png)

In order to have more space on mobile devices, for example, the menu bar can be reduced and hidden or displayed:

![Menu collapsed](../../de/admin/media/ADMIN_Screen01_menucollapsed.gif)

## The main window
The main window shows the content belonging to the selected menu item.

Detailed information on this content is stored on the pages linked via the headings.

[overview](https://www.iobroker.net/#de/documentation/admin/overview.md) All pages with their own web interface and information about the hosts are displayed here.

[adapter](https://www.iobroker.net/#de/documentation/admin/adapter.md) The available and installed adapters are displayed and managed here.

[instances](https://www.iobroker.net/#de/documentation/admin/instances.md) The instances already installed via the Adapter tab are listed here and can be configured accordingly.

[objects](https://www.iobroker.net/#de/documentation/admin/objects.md) The managed objects structures and data points of the devices that are integrated via adapters. Objects can be created and deleted here. Entire object structures can be uploaded or downloaded using the "Up Arrow" and "Down Arrow" buttons.

If values are displayed in red, they have not yet been confirmed by the recipient (ack = false).

[enumerations](https://www.iobroker.net/#de/documentation/admin/enums.md) The favorites, trades and rooms from the Homematic-CCU are listed here.

[logs](https://www.iobroker.net/#de/documentation/admin/log.md) The log is displayed here

In the Instances tab, the log level to be logged can be set for the individual instances. The minimum log level to be displayed is selected in the selection menu. If an error occurs, the caption of the tab appears in red.

[user](https://www.iobroker.net/#de/documentation/admin/users.md) Here users can be created and added to the existing groups.

[hosts](https://www.iobroker.net/#de/documentation/admin/hosts.md) Information about the computer on which ioBroker is installed. If a new version is available, a note appears in this entry in the menu bar.

[scripts](scripts.md) If the Java script adapter is installed, you can create your own scripts with javascript, Blockly or Typescript on this page.

[files](https://www.iobroker.net/#de/documentation/admin/files.md) File manager for managing files.

## System settings
[system settings](https://www.iobroker.net/#de/documentation/admin/settings.md) such as language, time and date format and other system-wide settings are made in the menu that opens here.

The repositories and security settings can also be set here.

[Übersicht]: https://www.iobroker.net/#de/documentation/admin/overview.md

[Adapter]: https://www.iobroker.net/#de/documentation/admin/adapter.md

[Instanzen]: https://www.iobroker.net/#de/documentation/admin/instances.md

[Objekte]: https://www.iobroker.net/#de/documentation/admin/objects.md

[Aufzählungen]: https://www.iobroker.net/#de/documentation/admin/enums.md

[Log]: https://www.iobroker.net/#de/documentation/admin/log.md

[files](https://www.iobroker.net/#de/documentation/admin/files.md)

[Benutzer]: https://www.iobroker.net/#de/documentation/admin/users.md

[Hosts]: https://www.iobroker.net/#de/documentation/admin/hosts.md

[Systemeinstellungen]: https://www.iobroker.net/#de/documentation/admin/settings.md