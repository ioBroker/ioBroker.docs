---
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/adapterref/iobroker.admin/tab-hosts.md
title: The Hosts tab
hash: A0PX3gNVnrOQijF2MxOe4AXudr5VPDE9MVykcpPXSng=
---
# The Hosts tab
The available hosts are displayed here.

In a standard system there is only one host. In a [multihost system](http://www.iobroker.net/?page_id=3068&lang=de) there are several.

## The title line
In the title bar there are icons for the most important processes. There is context help for each icon. Simply hold the mouse over the icon for a while.

![](../../../de/adapterref/iobroker.admin/img/tab-hosts_Hosts_icons.jpg)

### **The icons in detail:**
### **1.) Get updates**
To check whether there is an update for the js-controller you can click on this button. If there is an update the tab label appears in green and the new version is displayed in the _**available**_ column.

### **2.) Filter**
With this field you can filter the list of hosts according to your wishes

## The page content
The page displays the available hosts in a table.

![](../../../de/adapterref/iobroker.admin/img/tab-hosts_Hosts_01.jpg)

The table consists of the following columns:

### **3.) Name**
This is the unique name of each host as defined in the host's operating system. This name must be unique.

### **4.) Restart Host**
This button can be used to restart the corresponding host. Clicking it corresponds to the command **_reboot_**.

### **5.) Type**
Specifies which engine the host is running on.

### **6.) Title**
full name of the engine, usually ioBroker.js-controller

### **7.) Platform**
Specifies the software basis on which the engine is based.

### **8.) Operating system**
Specifies the operating system running on the host.

### **9.) Available**
Specifying the latest available version of the engine

If a newer version of the engine is available, it can be updated via the console.
This should always be done first if available, before starting to update the adapter.

### **9.) Installed**
Specifying the installed version of the engine