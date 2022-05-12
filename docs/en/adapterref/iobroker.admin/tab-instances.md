---
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/adapterref/iobroker.admin/tab-instances.md
title: The Instances tab
hash: qR+OGbujucG1OOZLvApoUl4xDF2/087seJP5CDRBtW8=
---
# The Instances tab
The instances already installed via the Adapter tab are listed here and can be configured accordingly.

<span style="line-height: 1.5;"></span>

![iobroker_admin_instances_content00](../../../de/adapterref/iobroker.admin/img/tab-instances_Inhalt00.jpg)

## The title line
The title bar contains icons for the most important processes. There is context help for each icon.
Simply hold the mouse on the icon for a while. There is also information about the load on the server

![iobroker_admin_instances_headline_icons](../../../de/adapterref/iobroker.admin/img/tab-instances_Icons-e1476803621402.jpg)

### **The icons in detail:**
### **1.) Switch on administrator mode**
When you select this icon, additional columns for configuring the instances are displayed (toggle function).
Information on this can be found in the Page content section.

### **2.) Refresh view**
If instances that have just been created are not visible, clicking on this icon will help update the status of the page.

### **3.) Status information about the server**
In the right part of the title bar there is information about the activities of the instances and the utilization of the ioBroker server.

The first numbers indicate the memory used by the instances so far and the remaining free memory in MB. After that the free memory in %. In the square brackets is the name of the ioBroker server and the number of running processes.

## The page content
![iobroker_admin_instances_headline_columns](../../../de/adapterref/iobroker.admin/img/tab-instances_Headline_Columns.jpg)

The page tabulates the installed instances of the adapters.

The table consists of the following columns:

### **1.) State**
The status of the instance is shown here by a traffic light. Further information can be obtained by hovering over the signal with the mouse.

![iobroker_admin_instances_status](../../../de/adapterref/iobroker.admin/img/tab-instances_Instanzen_Status.jpg)

Not all instances have this traffic light. But this is no reason to panic. These are either time-controlled instances that only connect briefly to the controller and then switch off again immediately, or continue to run in the background, such as vis.

### **2.) Icon**
The icon that is used throughout ioBroker for this adapter is displayed here

### **3.) Instance**
This column contains the name of the instance. it consists of the name of the adapter and a number that is consecutively numbered in the order in which the instances are installed. The first instance gets the 0.
This designation is the basis for the designation of the data points in ioBroker.

### 4.) activated
This is where the instance is started or stopped. The green pause sign indicates that the adapter is running and can be paused by clicking on it, the red play sign indicates a stopped instance that can be started with a click.

### **5.) Configuration**
Clicking on this icon opens an adapter-specific configuration menu. The corresponding menus are described in the corresponding [adapters](http://www.iobroker.net/?page_id=2236&lang=de).

### **6.) restart**
When you click on this icon, the corresponding instance is restarted

### **7.) Garbage can**
With this icon the corresponding instance is deleted. Other instances of the same adapter remain.
The adapter itself also remains.

### **8.) Web link**
Behind this icon there is a link to the website of this instance. Either because this adapter has its own web interface (with a different port) or just a different path. In some cases, this link also leads to help pages.

### **9.) Title**
The name of the instance is specified here. You can change this name according to your own wishes or needs. This is particularly useful if there are several instances (with otherwise the same designation) of an adapter. This would be the case with hm-rpc, for example, if there were one instance each for RF, Wired and CuxD.

### **10.) Scheduling**
In the case of adapters that are started on a time-controlled basis, it is entered here when this adapter is to start.
This schedule is in the format of a [cron jobs](https://de.wikipedia.org/wiki/Cron#Beispiele).
To change it, click on the button with the three dots. An input window opens with a lot of additional information and help.

![iobroker_admin_instances_cronjob](../../../de/adapterref/iobroker.admin/img/tab-instances_Cronjob.jpg)

### **11.) Reboot**
If this checkbox is ticked, a schedule can also be created here when this instance should be restarted.

### **12.) Log level**
In this column, the respective log level for the instance can be adjusted. Debug, info, warn and error are available. By default, this value is set to info. If you have the impression that something is not running smoothly, you can set it to debug. then the log tab for this instance also displays debug information that can help to find an error. Conversely, you can also set this value higher so that the log is not so extensive.

### **13.) RAM Limit**
Here you can specify how much memory the instance should be provided as a precaution.
This amount of memory is then no longer available for other tasks and should not be selected too high, especially in systems with little main memory. If the instance temporarily needs more memory, the system will of course allocate it to you, but will then immediately release it again for the system. During the time when an instance requires more memory than it has been reserved, the required memory is shown in red.

### 14.) RAM usage
The memory actually used by the instance is displayed here. These values are updated regularly. After the update, these values appear briefly in green text.