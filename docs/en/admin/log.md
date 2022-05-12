---
title: log
lastChanged: 10.05.2021
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/admin/log.md
hash: SF9PSkEVT8mItnrGcqW4liNccrJ/ZhU4DElrk63Agz4=
---
The system messages are output continuously here. The latest message is at the top.

![The log page](../../de/admin/media/ADMIN_Log_numbers.png)

## The title line
The title bar contains icons for the most important processes. There is context help for each icon. Simply hold the mouse on the icon for a while.

### 1 - Update log
This button updates the list.

### 2 - Stop update
If you click on this button, the continuous update of the list is stopped.
Instead of the pause icon, the number of new, undisplayed messages now appears.

### 3 - Delete list
Clicking on this icon only deletes the list on the screen

### 4 - Clear log on host
Clicking on this icon permanently deletes the entire log on the host.

### 5 - Download log
with this button you can download a complete daily log of the last days from the directory /opt/iobroker/logs:

![log download](../../de/admin/media/ADMIN_Log_download.png)

You get the following screen: ![complete log](../../de/admin/media/ADMIN_Log_download02.png)

Since lines are often cut off in the listing in the log window, it is important to check here whether there is more information.

### 6 - Host List
Only messages that come from the host set here are displayed in the log. In multihost environments you can set the host to be logged here.

![the hosts](../../de/admin/media/ADMIN_Log_hosts.png)

## The page content
![the hosts](../../de/admin/media/ADMIN_Log_numbers02.png)

The existing objects are displayed in tabular form on the page.

Column headers 1 and 3 contain pull-down menus that serve as filter criteria, in column 4 a filter criterion can be freely entered

### 1 - Source
With this pull-down menu, the messages can be filtered according to the logging instance. Only those instances for which there are entries on the page are displayed in the menu.

### 2 - time
The timestamp of the message is listed here. This column is not filterable.

### 3 - displayed log level
This menu can be used to set the severity of the message to be displayed. However, this is only a filter of the existing list.
In order to define logging at a specific level for an instance, this must be set on the instances page.

Errors are shown in red font:

![errors](../../de/admin/media/ADMIN_Log02_error.png)

If there is an error on any host, the caption ***Log*** will also appear in red on the menu bar.

### 4 - Message
The respective message is displayed in this column, as far as it fits in the column.
The rest will be cut off. With mouse-over you can still see the whole message.
To post in the forum please download the log and copy the message from there.