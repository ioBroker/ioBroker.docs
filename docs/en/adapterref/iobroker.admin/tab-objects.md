---
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/adapterref/iobroker.admin/tab-objects.md
title: The Objects tab
hash: GIc3qNC2ZnoKb8Y2zbYYsyTbWS+DWObdVmPTllsNDVk=
---
# The Objects tab
All managed objects are located under this tab. A folder is created for each instance in which the data points created by it are located in a hierarchical structure. Objects can also be created and deleted manually here. Entire object structures can be uploaded or downloaded. Another button enables the expert view to be displayed.

<span style="line-height: 1.5; text-align: justify;"></span>

![iobroker_admin_objects_content00](../../../de/adapterref/iobroker.admin/img/tab-objects_Inhalt00.jpg)

## The title line
In the title bar there are icons for the most important processes. There is context help for each icon. Simply hold the mouse over the icon for a while.

![iobroker_admin_objekte_headline_icons](../../../de/adapterref/iobroker.admin/img/tab-objects_Headline_Icons.jpg)

### **The icons in detail:**
### **1.) Refresh view**
If newly created objects are not visible, clicking this icon will help update the page's status.

### **2.) Change sorting**
This button changes the sorting of the objects on this page.

If the button is active, all objects are sorted alphabetically. If this button is not active, the objects are sorted hierarchically by instance.

Then the next two icons are also visible.

### **3.) Close all topics**
### **4.) Expand all subject areas**
### **5.)  Administrator mode**
When you select this icon, additional objects are displayed (toggle function). These are the data points of the system.

### **6.) add**
After selecting this icon, additional objects can be added.
If a folder is selected, it is adopted as _Parent_ in the object structure.
A configuration window opens:

![iobroker_admin_objects_addobject](../../../de/adapterref/iobroker.admin/img/tab-objects_AddObject.jpg)

The name for the new object must now be selected here, with a device, a channel or a data point being available as the type according to the hierarchical structure.

The available data point types are logic value, switch, character string, number, value list, field, object and mixed.

As soon as you confirm the input window with OK, another window opens:

![iobroker_admin_objekte_addobjec02t](../../../de/adapterref/iobroker.admin/img/tab-objects_AddObjec02t.jpg)

Some data can be entered here. For example, a role and an icon can be added to the object.

The other tabs contain further properties of the object.
This type of information is available for every object.

### **7.) Upload**
This button uploads a complete object structure as a json file to the ioBroker server

### **8.) Download**
With this button, the selected object structure is downloaded as a json file from the ioBroker server and can be saved.

## The page content
![iobroker_admin_objekte_headline_columns](../../../de/adapterref/iobroker.admin/img/tab-objects_Headline_Columns.jpg)

The page displays the existing objects in tabular form.

The table consists of the following columns (the fields under column headers 1 and 2 as well as the pull-down menus of the other columns serve as filter criteria).
The table in the image is arranged according to hierarchy and all sub-points (nodes) have been expanded:

### **1.) ID**
These are the top levels of the object hierarchy. Here, for example, the name of the instance is created as the top level, and the respective structure of the data is created below it.

### **2.) Name**
The name of the object is given in this column. In addition, an icon in front of it shows which hierarchy level it is (device, channel or data point).

The values in this column are editable.

![iobroker_admin_objects_structure01](../../../de/adapterref/iobroker.admin/img/tab-objects_Structure01.jpg)

### **3.) Type**
The type in the hierarchy level, which was already visible in the _Name_ column by the preceding icon, is mentioned explicitly here again. Using the pulldown menu in the column header, you can filter by these types and, for example, only display all data points.

### 4.) Role
The role specifies how user interfaces such as .vis and mobile should handle this data point.
This is essentially the function of this object briefly described using a term.
You can then filter based on this. The values in this column are editable.

### **5.) Room**
If this object has already been assigned to a room, this will be shown here.
This is also used, among other things, for filtering when searching for objects.
The values in this column are editable. This means that the objects can be assigned to rooms later.
If you click on the field, a pop-up opens with the rooms that have been created so far.

![iobroker_admin_objekte_rooms](../../../de/adapterref/iobroker.admin/img/tab-objects_Rooms.jpg)

### **6.) Function**
This column contains the trade to which the corresponding object is assigned.

The values in this column are editable. This means that the objects can be assigned to trades at a later date. If you click on the field, a pop-up window opens with the trades created so far.

### **7.) Value**
If the object is a data point, the current value of this data point is displayed here.

### **8.) other**
If you click on the pencil icon, a window opens with the properties of this object.
It is the same window that appeared above when creating a new object.
The properties of the object can be changed here. This function should be used with extreme caution and only if you know exactly what you are doing with it.

Clicking on the trash can icon deletes this object and **all** objects below it in the hierarchy. For security reasons, a window appears in which the deletion must be confirmed again.

![iobroker_admin_objekte_delete](../../../de/adapterref/iobroker.admin/img/tab-objects_delete.jpg)

The gear icon only appears if at least one history instance is installed (History, InfluxDB or SQL).
The data point for logging historical data can be configured here. Further information can be found in the description of [history adapter](http://www.iobroker.net/?page_id=144&lang=de).

Using the gear wheel in the title bar, this action can be performed simultaneously for all data points that match the current filter criteria. It is therefore important to carefully check whether the filter criteria for this page are selected in such a way that only the desired data points are included.

The pulldown menu for filtering this column refers to data points with logged data.

Options include _with_, _without_ and _all_ as well as the installed history instances.