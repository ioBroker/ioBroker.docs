---
title: Hosts
lastChanged: 07.05.2021
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/admin/hosts.md
hash: vui0+3EZSKz2XJdrrGwCONv3my8EhEnFlpgcAu982o0=
---
The available hosts are displayed here.

![The Hosts page](../../de/admin/media/ADMIN_Hosts_numbers.png)

In a standard system there is only one host. In the case of a multihost system, several.

## The title line
in the title line there are icons for the most important processes. There is context help for each icon. To do this, simply hold the mouse on the icon for a while.

The icons in detail:

### 1 - Toggle view
With this button you can switch between the tile and the list view (toggle function)

### 2 - get updates
To check whether there is an update for the js controller, you can click on this button. If an update is available, a number corresponding to the hosts to be updated appears in the ***Hosts*** item on the menu bar and the new version is displayed in the tile under Available.

### 3 - filter
In this field you can filter the list of hosts according to your own requirements

## The page content
The existing hosts are listed on the page.

For each host there is a tile (a line in the list view) in which the data of the respective host are displayed.

The following icons are used to manage the hosts:

### 4 - edit
The name of the host can be changed here. This name must be unique.

### 5 - Restart host
The corresponding host can be restarted with this button. Clicking on it corresponds to the reboot command.

### 6 - Remove host
This button is only available for slaves. If a slave has been removed from the multihost environment, all objects belonging to this host can also be removed with it.

### 7 - Controller update
If there is an update of the js controller for the set repository, another icon appears:

![Controller update](../../de/admin/media/ADMIN_Hosts_update.png)

When you click on this icon, in contrast to the icon for the adapters, the update is not started because ioBroker must be closed for this. Instead, instructions on how to proceed appear.