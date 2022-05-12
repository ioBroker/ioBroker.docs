---
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/adapterref/iobroker.admin/tab-hosts.md
title: The Hosts tab
hash: Jnt6k6H3Zc3NxzBPrWKISqelf4FWzT2DqjFE1jk2OjQ=
---
# The Hosts tab
The available hosts are displayed here.

In a standard system there is only one host. With a [multihost system](http://www.iobroker.net/?page_id=3068&lang=de), several accordingly.

## The title line
The title bar contains icons for the most important processes. There is context help for each icon. Simply hold the mouse on the icon for a while.

![](../../../de/adapterref/iobroker.admin/img/tab-hosts_Hosts_icons.jpg)

### **The icons in detail:**
### **1.) Get updates**
To check whether there is an update for the js-controller, you can click on this button. If there is an update, the label on the tab appears in green and the new version is displayed in the _**available**_ column.

### **2.) Filters**
With this field you can filter the list of hosts according to your own needs

## The page content
The existing hosts are displayed in tabular form on the page.

![](../../../de/adapterref/iobroker.admin/img/tab-hosts_Hosts_01.jpg)

The table consists of the following columns:

### **3.) Name**
This is the unique name of each host, as set in the host's operating system. This name must be unique.

### **4.) Restart Host**
The corresponding host can be restarted with this button. Clicking on it corresponds to the **_reboot_** command.

### **5.) Type**
Specification on which engine the host is running.

### **6.) Title**
full engine name, typically ioBroker.js-controller

### **7.) Platform**
Specification of the software basis on which the engine is based.

### **8.) Operating system**
Specification of the operating system running on the host.

### **9 available**
Indication of the latest available version of the engine

If a newer version of the engine is available, it can be updated via the console.
If available, this should always be done first, before you start updating the adapter.

### **9.) Installed**
Specification of the installed version of the engine