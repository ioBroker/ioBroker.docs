---
title: Admin
lastChanged: 07.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/admin/README.md
hash: hTw269Pr5HHBvlQYwpPAVr12pqDJHWQ8ya41+L7EKZQ=
---
# The user interface

The **admin** adapter is the basic adapter and is used to manage the entire ioBroker installation. It provides a web interface, which can be found at`http://<IP-Adresse des Servers>:8081` is called up.

This adapter is created during the ioBroker installation; manual installation is not necessary.

This page is an overview. Detailed descriptions can be found on the pages linked in the individual sections.

## Construction

The interface is divided into three areas: **1** the menu bar, **2** the main window, and **3** the toolbar at the bottom of the menu bar.

<img src="media/admin_aufbau.png" alt="Der Aufbau des Admin: Menueleiste, Hauptfenster, Symbolleiste" width="900" />

## 1 Menu bar

The menu bar leads to the individual pages of the admin panel. In a fresh installation, these are:

| Menu item                               | Contents                                                                                                     |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| [Overview](/docs/admin/overview.md)     | System status, host hardware data, active adapters, and the last log lines.                                  |
| [Quick access](/docs/admin/overview.md) | Tiles for all adapters with their own web interface as well as for the hosts.                                |
| [adapter](/docs/admin/adapter.md)       | Available and installed adapters, installation and update.                                                   |
| [Instance](/docs/admin/instances.md)    | Start and stop the created instances with their configuration.                                               |
| [objects](/docs/admin/objects.md)       | The object tree with all devices, channels, and data points.                                                 |
| [Categories](/docs/admin/enums.md)      | Rooms, trades, and favorites. This section used to be called "Lists".                                        |
| [Protocols](/docs/admin/log.md)         | The log file. If an error occurs, the menu item is highlighted in red.                                       |
| [user](/docs/admin/users.md)            | Users and groups, including their rights.                                                                    |
| [Hosts](/docs/admin/hosts.md)           | The computers running ioBroker. A notification will appear here if a new js-controller version is available. |
| [files](/docs/admin/files.md)           | The file manager for files managed by ioBroker.                                                              |
| [Backup](/docs/config/backup.md)        | Create, view, and restore backups.                                                                           |

Additional menu items appear with the installed adapters, such as _scripts_ (javascript), _calendar_ (fullcalendar), _devices_ (devices), or _events_ (eventlist). At the very bottom is **System** : this is where the [system settings](/docs/admin/settings.md) are configured.

### Reduce menu size

The menu bar can be toggled using the arrow in the upper left corner. It has three states: with labels, with icons only, and completely hidden. When hidden, it can be brought back using the icon with the three lines. This leaves more space for the main window on small screens.

<img src="media/admin_menue_zustaende.png" alt="Die drei Zustaende der Menueleiste: beschriftet, nur Symbole, ausgeblendet" width="292" />

## 2 main windows

The main window displays the content of the currently selected menu item. Details of what is shown there can be found on the pages linked in the table above.

Values are displayed in **red** in the object tree until they have been confirmed by the recipient (`ack = false` ).

## 3 Toolbar

At the bottom of the menu bar are four buttons:

| symbol            | function                                                                                                                    |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------- |
| bell              | System **notifications** . The number next to it indicates the number of unread messages.                                   |
| contrast          | **Change color theme** : switches between color themes (see below).                                                         |
| Magic Hat         | **Switch to expert mode** . It displays additional objects, settings, and columns and only applies to this browser session. |
| Connected windows | **Synchronize settings between all open browser windows** .                                                                 |

Many descriptions in this documentation assume expert mode. If a described button is missing, it's worth checking that switch first.

<img src="media/admin_expertenmodus.png" alt="Der Hinweis beim Einschalten des Expertenmodus" width="700" />

Expert mode only applies to the current browser session. It can be permanently enabled in the [system settings](/docs/admin/settings.md) .

### Color themes

The contrast switch changes the color theme. The choices are **modernLight** and **modernBlue** . Both display the same content; they differ only in color.

<img src="media/admin_farbthemen.png" alt="Die Farbthemen modernLight und modernBlue im Vergleich" width="900" />

The color theme applies per browser, not per user. Users accessing the admin panel from multiple devices must configure it individually on each device.