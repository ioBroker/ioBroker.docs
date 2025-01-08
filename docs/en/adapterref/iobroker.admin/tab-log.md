---
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/adapterref/iobroker.admin/tab-log.md
title: The Rider Log
hash: kzof4XfyddkyR8KdFjUtTOUg5IE6jzeGfhiqozkyyE0=
---
# The Rider Log
The system's messages are continuously displayed here.
The most recent message is at the top.

![](../../../de/adapterref/iobroker.admin/img/tab-log_01.jpg)

## The title line
In the title bar there are icons for the most important processes.
There is context help for each icon. Simply hold the mouse over the icon for a while.

![](../../../de/adapterref/iobroker.admin/img/tab-log_icons.jpg)

### **The icons in detail:**
### **1.) Pause update**
Clicking this button stops the constant updating of the list.
Instead of the pause icon, the number of new, not displayed messages now appears.

### **2.) Update log**
This button updates the list.

### **3.) Copy log**
After clicking this icon, the list appears as text. Use CTRL-A to select the entire text and use CTRL-C to paste it into the clipboard for further editing.

### **4.) Delete list**
Clicking on this icon will only delete the list on the screen

### **5.) Clear log**
Clicking on this icon will permanently delete the entire log on the host.

### The pull-down menus
### **Instance Filter**
![](../../../de/adapterref/iobroker.admin/img/tab-log_instances.jpg)

This pull-down menu can be used to filter the messages according to the logging instance.
The menu only shows the instances for which there are entries on the page.

### **displayed log level**
![](../../../de/adapterref/iobroker.admin/img/tab-log_loglevel.jpg)

This menu can be used to set the severity of the message that should be displayed.
However, this is only a filter of the existing list. To set logging at a certain level for an instance, this must be set in the _**Instances**_ tab.