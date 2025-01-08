---
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/adapterref/iobroker.admin/tab-instances.md
title: The Instances tab
hash: wBKP7K139TehQSv9mxy6iGcoIz/dj9X8D7lacF88tpw=
---
# The Instances tab
The instances already installed via the Adapter tab are listed here and can be configured accordingly.

<span style="line-height: 1.5;"></span>

![iobroker_admin_instanzen_inhalt00](../../../de/adapterref/iobroker.admin/img/tab-instances_Inhalt00.jpg)

## The title line
In the title bar there are icons for the most important processes. There is context help for each icon.
To do this, simply hold the mouse on the icon for a while. There is also information about the server's load

![iobroker_admin_instanzen_headline_icons](../../../de/adapterref/iobroker.admin/img/tab-instances_Icons-e1476803621402.jpg)

### **The icons in detail:**
### **1.)  Enable administrator mode**
When you select this icon, additional columns for configuring the instances are displayed (toggle function).
For more information, see the Page content section.

### **2.) Refresh view**
If newly created instances are not visible, clicking this icon will help update the state of the page.

### **3.) Server status information**
In the right part of the title bar there is information about the activities of the instances and the utilization of the ioBroker server.

The first numbers indicate the memory used by the instances so far and the remaining free memory in MB. After that, the free memory in %. The name of the ioBroker server and the number of running processes are in square brackets.

## The page content
![iobroker_admin_instanzen_headline_columns](../../../de/adapterref/iobroker.admin/img/tab-instances_Headline_Columns.jpg)

The page displays the installed instances of the adapters in a table.

The table consists of the following columns:

### **1.) Condition**
Here, the status of the instance is shown by a traffic light. You can get more information by hovering the mouse over the signal.

![iobroker_admin_instances_status](../../../de/adapterref/iobroker.admin/img/tab-instances_Instanzen_Status.jpg)

Not all instances have this traffic light. But this is no reason to panic. These are either time-controlled instances that only connect to the controller briefly and then immediately switch off again, or continue to run in the background, like vis, for example.

### **2.) Icon**
This shows the icon that is used ioBroker-wide for this adapter

### **3rd) instance**
This column contains the name of the instance. It consists of the name of the adapter and a number that is numbered consecutively in the order in which the instances are installed. The first instance is given the number 0.
This name is the basis for the name of the data points in ioBroker.

### 4.) activated
This is where the instance is started or paused. The green pause sign indicates that the adapter is running and can be paused by clicking on it, the red play sign shows a stopped instance that can be started with a click.

### **5.) Configuration**
Clicking this icon opens an adapter-specific configuration menu. The corresponding menus are described in the corresponding [adapters](http://www.iobroker.net/?page_id=2236&lang=de).

### **6.) restart**
Clicking on this icon will restart the corresponding instance

### **7.) Trash can**
This icon deletes the corresponding instance. Other instances of the same adapter remain.
The adapter itself also remains.

### **8.) Weblink**
Behind this icon there is a link to the website of this instance. Either because this adapter has its own web interface (with a different port) or just a different path. In some cases this link also leads to help pages.

### **9.) Title**
The name of the instance is specified here. This name can be changed according to your own wishes or needs. This is particularly useful if there are several instances of an adapter (with otherwise the same name). This would be the case with hm-rpc, for example, if there is one instance each for RF, Wired and CuxD.

### **10.) Time planning**
For adapters that are started at a time, you enter when the adapter should start here.
This schedule is in the format of [cronjobs](https://de.wikipedia.org/wiki/Cron#Beispiele).
To change it, click on the button with the three dots. An input window opens with lots of additional information and help.

![iobroker_admin_instances_cronjob](../../../de/adapterref/iobroker.admin/img/tab-instances_Cronjob.jpg)

### **11.) Restart**
If this checkbox is checked, a schedule can also be created here for when this instance should be restarted.

### **12.) Log Level**
In this column, the respective log level for the instance can be adjusted. Debug, info, warn and error are available. By default, this value is set to info. If you have the impression that something is not running quite right, you can set it to debug. Then the log tab for this instance will also display debug information that can help to find an error. Conversely, you can also set this value higher so that the log is not so extensive.

### **13.) RAM Limit**
Here you can specify how much memory should be made available to the instance as a precaution.
This amount of memory is then no longer available for other tasks and should not be set too high, especially on systems with little memory. If the instance temporarily needs more memory, the system will of course allocate it to it but will then immediately release it for the system again. During the time in which an instance needs more memory than has been reserved for it, the required memory is shown in red.

### 14.) RAM usage
The actual memory used by the instance is displayed here. These values are updated regularly. After the update, these values appear briefly in green.