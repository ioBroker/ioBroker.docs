---
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/adapterref/iobroker.admin/admin/tab-users.md
title: The Users tab
hash: xGhgY4eMab4BMoNxFtPxuBeDLJwfNdkUiNilHTX0+qk=
---
# The User tab

Users can be created here. To do so, click on the (+) in the bottom left corner. The administrator account is already created by default.

![iobroker\_adapter\_admin\_user\_01](../../../../de/adapterref/iobroker.admin/admin/img/tab-user_01-1.jpg)

## The page content

The page displays the existing users in a table. The fields in the column headers allow you to filter the table according to your own criteria.

The table consists of the following columns:

### **1.) ID**

This is the unique name of the respective user, according to the structure consisting of system.user.username.

### **2.) Name**

The user's name. This name can be freely chosen. This name must be unique.

### **3.) Activated**

This checkbox can be used to enable or disable a user's availability.

### **4.) Groups**

The groups created in the " **_Groups"_** tab are displayed here. Users can be assigned to the corresponding groups using a checkbox.

![iobroker\_adapter\_admin\_user\_groups](../../../../de/adapterref/iobroker.admin/admin/img/tab-user_Groups.jpg)

### **5.) Create a new user**

This icon is used to create a new user, who then needs to be assigned to an existing group.

### **6.) Edit existing user**

After selecting an existing user in the list, this icon allows you to edit that user's data.

### **7.) Delete existing user**

The trash can icon can be used to delete an existing user; existing groups will remain intact.