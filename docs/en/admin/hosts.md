---
title: hosts
lastChanged: 07.05.2021
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/admin/hosts.md
hash: b/cl0uw+yfoPT0T/XNqIz/AUhBq050Wlkmzg4UG42hI=
---
The available hosts are displayed here.

![The Hosts page](../../de/admin/media/ADMIN_Hosts_numbers.png)

In a standard system there is only one host. In a multi-host system, several accordingly.

## The title line
The title bar contains icons for the most important processes. There is context help for each icon. Simply hold the mouse on the icon for a while.

The icons in detail:

### 1 - Toggle view
With this button you can switch between the tile and the list view (toggle function)

### 2 - Get updates
To check whether there is an update for the js-controller, you can click on this button. If an update is available, a number corresponding to the hosts to be updated appears in the ***Hosts*** item in the menu bar and the new version is displayed in the tile under available.

### 3 - Filters
In this field you can filter the list of hosts according to your own needs

## The page content
The page lists the existing hosts.

For each host there is a tile (a line in the list view) in which the data of the respective host is displayed.

The following icons are used to manage the hosts:

### 4 - Edit
The name of the host can be changed here. This name must be unique.

### 5 - Restart Host
The corresponding host can be restarted with this button. Clicking on it corresponds to the reboot command.

### 6 - Remove host
This button is only available for slaves. If a slave was removed from the multihost environment, all objects belonging to this host can also be removed.

### 7 - Controller update
If there is an update of the js controller for the set repository, another icon appears:

![controller update](../../de/admin/media/ADMIN_Hosts_update.png)

However, in contrast to the icon for the adapters, clicking on this icon does not start the update because ioBroker has to be closed for this. Instead, instructions appear on how to proceed.