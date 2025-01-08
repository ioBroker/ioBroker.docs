---
title: log
lastChanged: 10.05.2021
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/admin/log.md
hash: 66gpVVstVxHlQUyyBYv8juocwLyP/pXvD9q5MXSJDlE=
---
The system's messages are continuously displayed here. The most recent message is at the top.

![The log page](../../de/admin/media/ADMIN_Log_numbers.png)

## The title line
In the title bar there are icons for the most important processes. There is context help for each icon. Simply hold the mouse over the icon for a while.

### 1 - Update log
This button updates the list.

### 2 - Pause update
Clicking this button stops the constant updating of the list.
Instead of the pause icon, the number of new, not displayed messages now appears.

### 3 - Delete list
Clicking on this icon will only delete the list on the screen

### 4 - Clear log on host
Clicking on this icon will permanently delete the entire log on the host.

### 5 - Download log
With this button you can download a complete daily log of the last few days from the directory /opt/iobroker/logs:

![log download](../../de/admin/media/ADMIN_Log_download.png)

This will give you the following screen: ![complete log](../../de/admin/media/ADMIN_Log_download02.png)

Since lines are often cut off in the list in the log window, it is important to check here to see if there is more information.

### 6 - Host list
Only messages that come from the host specified here are displayed in the log. In multi-host environments, you can specify the host to be logged here.

![The hosts](../../de/admin/media/ADMIN_Log_hosts.png)

## The page content
![The hosts](../../de/admin/media/ADMIN_Log_numbers02.png)

The existing objects are displayed in tabular form on the page.

Column headers 1 and 3 contain pull-down menus that serve as filter criteria, in column 4 a filter criterion can be freely entered

### 1 - Source
This pull-down menu can be used to filter the messages according to the logging instance. The menu only shows the instances for which there are entries on the page.

### 2 - Time
The timestamp of the message is listed here. This column cannot be filtered.

### 3 - displayed log level
This menu can be used to set the severity of the message that should be displayed. However, this is only a filter of the existing list.
To set logging at a certain level for an instance, this must be set on the instance page.

Errors are shown in red:

![Error](../../de/admin/media/ADMIN_Log02_error.png)

If there is an error on any host, the label ***Log*** appears in the menu bar in red.

### 4 - Message
The respective message is displayed in this column as long as it fits in the column.
The rest is cut off. You can still see the entire message by mouse-over.
To post in the forum, please download the log and copy the message from there.