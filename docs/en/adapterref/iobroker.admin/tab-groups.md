---
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/adapterref/iobroker.admin/tab-groups.md
title: The Groups tab
hash: w81xH774XQVxqMAhQ70BdlBiKKarcO5bWiTNR7Zbfvc=
---
# The Groups tab
Here, user groups with different rights can be created by clicking on the (+) at the bottom left of the screen.

![iobroker_adapter_admin_user_02](../../../de/adapterref/iobroker.admin/img/tab-groups_admin_User_02.jpg)

## The page content
The existing groups are displayed in tabular form on the page. The fields in the column headers are used to filter the table according to your own criteria.

The table consists of the following columns:

### **1.) ID**
This is the unique name of the respective group, according to the structure consisting of system.group.groupname.

### **2.) Name**
The name of the group. This name can be freely chosen. This name must be unique.

### **3.) Description**
A description can be added here, for example referring to the rights in this group.

### **4.) User**
The users created in the **_Users_** tab are displayed here and can be assigned to the selected group via a checkbox.

### **5.) Adjust permissions**
If you click on the pencil symbol, another window opens in which the rights of this group can be adjusted.

![iobroker_adapter_admin_user_rechte_01](../../../de/adapterref/iobroker.admin/img/tab-groups_User_Rechte_01.jpg)

### **6.) Create new group**
With this icon you can create a new group, which is configured using the previous points.