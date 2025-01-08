---
title: hosts
lastChanged: 09.11.2022
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/admin/hosts.md
hash: vui0+3EZSKz2XJdrrGwCONv3my8EhEnFlpgcAu982o0=
---
The available hosts are displayed here.

![The Hosts page](../../de/admin/media/ADMIN_Hosts_numbers.png)

In a standard system there is only one host. In a multi-host system there are several.

## The title line
In the title bar there are icons for the most important processes. There is context help for each icon. Simply hold the mouse over the icon for a while.

The icons in detail:

### 1 - Switch view
With this button you can switch between the tile and list view (toggle function)

### 2 - Get updates
To check whether an update for the js-controller is available, you can click on this button. If an update is available, a number corresponding to the hosts to be updated will appear in the ***Hosts*** item in the menu bar and the new version will be displayed in the tile under available.

### 3 - Filter
In this field you can filter the list of hosts according to your wishes

## The page content
The page lists the existing hosts.

For each host there is a tile (a row in the list view) in which the data of the respective host is displayed.

The following icons are used to manage the hosts:

### 4 - Editing
The name of the host can be changed here. This name must be unique.

### 5 - Restart Host
This button can be used to restart the corresponding host. Clicking it corresponds to the reboot command.

### 6 - Remove host
This button is only available for slaves. If a slave has been removed from the multi-host environment, all objects belonging to this host can also be removed.

### 7 - Controller update
If there is an update of the js-controller for the set repository, another icon appears:

![controller update](../../de/admin/media/ADMIN_Hosts_update.png)

When you click on this icon, however, unlike the icon for the adapters, the update is not started because ioBroker must be closed for this to happen. Instead, instructions on how to proceed appear.