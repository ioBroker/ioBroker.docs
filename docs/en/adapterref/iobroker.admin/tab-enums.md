---
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/adapterref/iobroker.admin/tab-enums.md
title: The Lists tab
hash: rqPVvVeC50Hm4dxcQ7zBoNm0VTUa7zS5Txki6arYBmc=
---
# The Enumerations tab
The favorites, trades and rooms from the Homematic CCU are listed here.
You can also create your own lists, which can then be used in scripts, for example.

![iobroker_adapter_admin_enums_01](../../../de/adapterref/iobroker.admin/img/tab-enums_Enums_01.jpg)

## The title line
In the title bar there are icons for the most important processes.
There is context help for each icon. Simply hold the mouse over the icon for a while.

![iobroker_adapter_admin_enums_headers_01](../../../de/adapterref/iobroker.admin/img/ioBroker_Adapter_admin_Enums_Headers_01.jpg)

### **The icons in detail:**
### **1.) Refresh view**
If newly created lists are not visible, clicking this icon will help update the page's status.

### **2.) Change sorting**
This button changes the sorting of the objects on this page.

If the button is active, all objects are sorted alphabetically.
If this button is not active, the objects are displayed hierarchically in a tree structure.

Then the next two icons are also visible.

### **3.) Close all subfolders**
### **4.) Expand all subfolders**
### **5.) add**
After selecting this icon, further lists can be added to the basic structure.
Elements within the folder structure are created using the (+) icon on the right (#10).
A configuration window opens:

![iobroker_adapter_admin_enums_new](../../../de/adapterref/iobroker.admin/img/tab-enums_Enums_new.jpg)

Here you must now select the name for the new list; the generated ID will be adjusted automatically.

### The page content
![iobroker_adapter_admin_enums_headers_03](../../../de/adapterref/iobroker.admin/img/tab-enums_Enums_Headers_03.jpg)

The page displays the existing lists and their members in tabular form.

The table consists of the following columns (the fields under column headers 6, 7 and 8 serve as filter criteria). The table in the image is arranged according to hierarchy and all sub-nodes have been expanded:

### **6.) ID**
All members of the enumerations are listed here with their IDs. This name can be changed by double-clicking or clicking on the corresponding pencil icon (#9).
The complete ID of subordinate structures also includes the parent levels in front.

### **7.) Name**
This column shows the member's name. This name can be changed by double-clicking or clicking on the corresponding pencil icon (#9).

### **8.) Members**
This column shows the members of a list; if there are too many, only the number is shown.
If you move the mouse over the field, all members are shown in a bubble info.
Further information can be obtained via the info icon on the far right (#12)

### **9.) Edit labels**
After clicking on this icon, you can edit the names in the ID and Name columns.
An OK button in the form of a check mark and a Cancel icon in the form of an (x) appear here.

### **10.) Add structural element**
After clicking this icon, a dialog window opens in which a new member can be created within the respective structure.

![iobroker_adapter_admin_enums_new_member](../../../de/adapterref/iobroker.admin/img/tab-enums_Enums_new_Member.jpg)

Here, too, the name can be chosen individually. The associated ID is automatically generated according to the structure and the chosen name.

### **11.) Delete element**
The trash can icon deletes the element in this row

### **12.) Information**
After clicking this icon, another window with additional information about the selected element is displayed.

![iobroker_adapter_admin_enums_info](../../../de/adapterref/iobroker.admin/img/tab-enums_Enums_Info.jpg)