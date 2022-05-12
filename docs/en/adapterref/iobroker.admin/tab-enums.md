---
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/adapterref/iobroker.admin/tab-enums.md
title: The Enumerations tab
hash: 9FniQdkSMjiJGDBfr5fYi7lDHmMAquGE8W5bEO9hTuk=
---
# The Enumerations tab
The favorites, trades and rooms from the Homematic CCU are listed here.
You can also create your own enumerations, which can then be used in scripts, for example.

![iobroker_adapter_admin_enums_01](../../../de/adapterref/iobroker.admin/img/tab-enums_Enums_01.jpg)

## The title line
The title bar contains icons for the most important processes.
There is context help for each icon. Simply hold the mouse on the icon for a while.

![iobroker_adapter_admin_enums_headers_01](../../../de/adapterref/iobroker.admin/img/ioBroker_Adapter_admin_Enums_Headers_01.jpg)

### **The icons in detail:**
### **1.) Refresh view**
If listings that have just been created are not visible, clicking on this icon will help update the status of the page.

### **2.) Change sorting**
This button changes the sorting of the objects on this page.

When the button is active, all objects are sorted alphabetically.
If this button is not active, the objects are displayed hierarchically according to listings in a tree structure.

Then the next two icons are also visible.

### **3.) Collapse all subfolders**
### **4.) Expand all subfolders**
### **5.) add**
After selecting this icon, further listings can be added to the basic structure.
Elements within the folder structure are created using the (+) icon on the right (#10).
A configuration window opens:

![iobroker_adapter_admin_enums_new](../../../de/adapterref/iobroker.admin/img/tab-enums_Enums_new.jpg)

The name for the new enumeration must now be selected here, the generated ID will be adjusted automatically.

### The page content
![iobroker_adapter_admin_enums_headers_03](../../../de/adapterref/iobroker.admin/img/tab-enums_Enums_Headers_03.jpg)

The existing enumerations and their members are displayed in tabular form on the page.

The table consists of the following columns (The fields under the column headers 6, 7 and 8 serve as filter criteria). The table in the picture is arranged according to hierarchy and all sub-items (nodes) have been expanded:

### **6.) ID**
All members of the enumeration are listed here with their IDs. This designation can be changed by double-clicking or clicking on the associated pencil icon (#9).
The full ID of subordinate structures also includes the superordinate levels in front.

### **7.) Name**
The name of the member is given in this column. This designation can be changed by double-clicking or clicking on the associated pencil icon (#9).

### **8.) Members**
In this column, the members of an enumeration are displayed, if there are too many, only the number is displayed.
If you move the mouse over the field, all members are displayed in a bubble info.
Further information can be obtained via the info icon on the far right (#12)

### **9.) Edit designations**
After clicking on this icon, you can edit the designations in the ID and Name columns.
An ok button in the form of a tick and a cancel icon in the form of an (x) appear at this point.

### **10.) Add structure element**
After clicking on this icon, a dialog window opens in which a new member can be created within the respective structure.

![iobroker_adapter_admin_enums_new_member](../../../de/adapterref/iobroker.admin/img/tab-enums_Enums_new_Member.jpg)

Here, too, the name can be chosen individually. The associated ID is generated automatically according to the structure and the selected name.

### **11.) Delete item**
The element in this line is deleted with the trash can icon

### **12.) Information**
After clicking on this icon, another window with extended information on the selected element is displayed.

![iobroker_adapter_admin_enums_info](../../../de/adapterref/iobroker.admin/img/tab-enums_Enums_Info.jpg)