---
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/adapterref/iobroker.admin/admin/tab-enums.md
title: The list of items on the rider
hash: ZfJOk6TGlxMzkk+VijJM++zSiyrxngYXDuIZ2G/dGeI=
---
# The list tab

This section lists favorites, trades, and rooms from the Homematic CCU. You can also create your own lists, which can then be used in scripts, for example.

![iobroker\_adapter\_admin\_enums\_01](../../../../de/adapterref/iobroker.admin/admin/img/tab-enums_Enums_01.jpg)

## The title line

The title bar contains icons for the most important functions. Each icon has context-sensitive help; simply hover your mouse over the icon for a few moments.

![iobroker\_adapter\_admin\_enums\_headers\_01](../../../../de/adapterref/iobroker.admin/admin/img/ioBroker_Adapter_admin_Enums_Headers_01.jpg)

### **The icons in detail:**

### **1.) Update view**

If newly created lists are not visible, clicking this icon will help update the page.

### **2.) Change sorting**

This button changes the sorting of the objects on this page.

When the button is active, all objects are sorted alphabetically. If this button is not active, the objects are displayed hierarchically in a tree structure according to lists.

Then the next two icons will also be visible.

### **3.) Close all subfolders**

### **4.) Expand all subfolders**

### **5.) add**

After selecting this icon, further lists can be added to the basic structure. Elements within the folder structure are created using the (+) icon on the right (#10). A configuration window will open:

![iobroker\_adapter\_admin\_enums\_new](../../../../de/adapterref/iobroker.admin/admin/img/tab-enums_Enums_new.jpg)

Here you must now select the name for the new list; the generated ID will be adjusted automatically.

### The page content

![iobroker\_adapter\_admin\_enums\_headers\_03](../../../../de/adapterref/iobroker.admin/admin/img/tab-enums_Enums_Headers_03.jpg)

The page displays the existing lists and their members in tabular form.

The table consists of the following columns (the fields under column headers 6, 7, and 8 serve as filter criteria). The table in the image is ordered hierarchically, and all sub-items (nodes) have been expanded:

### **6.) ID**

Here, all members of the lists are listed with their IDs. This label can be changed by double-clicking or clicking the corresponding pencil icon (#9). The complete ID of subordinate structures also includes the parent levels as a prefix.

### **7.) Name**

This column displays the member's name. This name can be changed by double-clicking or clicking the corresponding pencil icon (#9).

### **8.) Members**

This column displays the members of a list; if there are too many members, only the count is shown. Hovering the mouse over the field displays all members in a bubble info window. Further information is available via the info icon on the far right (#12).

### **9.) Edit labels**

After clicking this icon, you can edit the labels in the ID and Name columns. An OK button (checkmark) and a Cancel icon (x) will appear at this point.

### **10.) Add structural element**

Clicking this icon opens a dialog box in which a new member can be created within the respective structure.

![iobroker\_adapter\_admin\_enums\_new\_member](../../../../de/adapterref/iobroker.admin/admin/img/tab-enums_Enums_new_Member.jpg)

Here too, the name can be chosen individually. The corresponding ID is automatically generated according to the structure and the chosen name.

### **11.) Delete element**

The trash can icon deletes the element in this line.

### **12.) Information**

Clicking this icon will display another window with more detailed information about the selected element.

![iobroker\_adapter\_admin\_enums\_info](../../../../de/adapterref/iobroker.admin/admin/img/tab-enums_Enums_Info.jpg)