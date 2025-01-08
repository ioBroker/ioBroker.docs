---
title: Admin
lastChanged: 11.11.2022
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/admin/README.md
hash: /JitWiMs2lRCOckIg+9AMDHp3Zr/o2xQk7f4bo3FKq8=
---
# The user interface
!> **Due to the scope of the documentation, this is only an overview. Detailed information is provided on the pages that are linked to the tabs via the section headings. Please click on the headings.**

The Admin adapter is the basic adapter and is used to operate the entire ioBroker installation. It provides a web interface. This is called under ``<IP-Adresse des Servers>:8081``.

This adapter is created directly during the installation of ioBroker, manual installation is not necessary

![The admin in tile view](../../de/admin/media/ADMIN_Adapter_Kachel.png)

The following functions can be accessed via the GUI provided by the adapter:

* Entering system-wide settings
* Installation of additional adapters and their instances
* Access to the configuration of the instances
* Access to object and its status overview
* Access to the administration of users and groups
* Access to log files (protocols)
* Host management
* File management

The adapter view is divided into the areas 1 - Menu bar, 2 - Main window and 3 - System settings

![The structure of the admin](../../de/admin/media/ADMIN_Screen_numbers.png)

## Menu bar
The menu bar contains several menu items. In the basic installation, these items are displayed as shown in the illustration. After installing additional adapters, additional items can be activated or deactivated for a better overview using the triangle icon in the top left (1).

![menu items](../../de/admin/media/ADMIN_Screen01_menuitems_numbers.png)

To have more space on mobile devices, for example, the menu bar can be made smaller and hidden or shown:

![menu collapsed](../../de/admin/media/ADMIN_Screen01_menucollapsed.gif)

## The main window
The main window displays the content associated with the selected menu item.

Detailed information on this content can be found in the pages linked via the headings.

[Overview](https://www.iobroker.net/#de/documentation/admin/overview.md) All pages with their own web interface and information about the hosts are displayed here.

[adapter](https://www.iobroker.net/#de/documentation/admin/adapter.md) The available and installed adapters are displayed and managed here.

[instances](https://www.iobroker.net/#de/documentation/admin/instances.md) The instances already installed via the Adapter tab are listed here and can be configured accordingly.

[objects](https://www.iobroker.net/#de/documentation/admin/objects.md) The managed objects Structures and data points of the devices that are integrated via adapters. Objects can be created and deleted here. Entire object structures can be uploaded or downloaded using the "Up arrow" and "Down arrow" buttons.

If values are displayed in red, they have not yet been confirmed by the recipient (ack = false).

[lists](https://www.iobroker.net/#de/documentation/admin/enums.md) The favorites, trades and rooms from the Homematic CCU are listed here.

[protocols](https://www.iobroker.net/#de/documentation/admin/log.md) The log is displayed here

In the Instances tab, the log level to be logged can be set for each instance. The minimum log level to be displayed is selected in the selection menu. If an error occurs, the tab label appears in red.

[user](https://www.iobroker.net/#de/documentation/admin/users.md) Users can be created here and added to existing groups.

[hosts](https://www.iobroker.net/#de/documentation/admin/hosts.md) Information about the computer on which ioBroker is installed. If a new version is available, a note appears in this entry in the menu bar.

[scripts](scripts.md) If the Java script adapter is installed, you can create your own scripts on this page with javascript, Blockly or Typescript.

[files](https://www.iobroker.net/#de/documentation/admin/files.md) File manager for managing files.

## System Settings
In the menu that opens here, settings such as language, time and date format as well as other system-wide settings can be made.

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