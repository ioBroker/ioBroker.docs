---
title: instances
lastChanged: 10.05.02021
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/admin/instances.md
hash: ryoo5q50Xq8cxSezNgJU212bACYAHiFSrZdXotHE6us=
---
The instances already installed via the Adapter tab are listed here and can be configured accordingly.

## The title line
The title bar contains icons for the most important processes. There is context help for each icon. Simply hold the mouse on the icon for a while. There is also information about the load on the server.

![The icons in the title bar](../../de/admin/media/ADMIN_Instanzen_numbers.png)

The icons in detail:

### 1 - Refresh view
If instances that have just been created are not visible, clicking on this icon will help update the status of the page.

### 2 - Turn on admin mode
If you select this icon, additional columns for configuring the instances are displayed (toggle function). Information on this can be found in the Page content section.

### 3 - Show only instances of the selected host
![The available hosts](../../de/admin/media/ADMIN_Instanzen_hosts.png)

In multihost systems, the instances of all hosts are managed by the admin of the master. The information on which host this instance is located is in the ***Server*** column

If a host is selected in the header, you can use this button to display only the instances installed there.

![The available hosts](../../de/admin/media/ADMIN_Instanzen_hosts.png)

### 4 - Filters
A term can be entered in this field to filter or to search for instances

## More information in the Instances window
The first numbers indicate the memory used by the instances so far and the remaining free memory in MB. After that the free memory in %. In the square brackets is the name of the ioBroker server and the number of running processes.

## The page content
![The available hosts](../../de/admin/media/ADMIN_Instanzen_numbers02.png)

The installed instances of the adapters are presented in a table on the page.

The table consists of the following columns:

### 1 - state
The status of the instance is shown here by a traffic light. Further information can be obtained by hovering over the signal with the mouse.

Not all instances have this traffic light. But this is no reason to panic. These are either time-controlled instances that only briefly connect to the controller and then switch off again immediately, or continue to run in the background, like e.g. vis.

### 2 - icon
The icon that is used throughout ioBroker for this adapter is displayed here

### 3 - Instance
This column contains the name of the instance. it consists of the name of the adapter and a number that is consecutively numbered in the order in which the instances are installed. The first instance receives the

0. This designation is the basis for the designation of the data points in ioBroker.

### 4 - activated
This is where the instance is started or stopped. The green pause sign indicates that the adapter is running and can be paused by clicking on it, the red play sign indicates a stopped instance that can be started with a click.

### 5 - Configuration
Clicking on this icon opens an adapter-specific configuration menu. The corresponding menus are described for the associated adapters.

### 6 - restart
When you click on this icon, the corresponding instance is restarted

### 7 - trash can
With this icon the corresponding instance is deleted. Other instances of the same adapter remain. The adapter itself also remains.

### 8 - web link
Behind this icon there is a link to the website of this instance. Either because this adapter brings its own web interface (with a different port) or just a different path. In some cases, this link also leads to help pages.

### 9 - Title
The name of the instance is specified here. You can change this name according to your own wishes or needs. This is particularly useful if there are several instances (with otherwise the same name) of an adapter. This would be the case with hm-rpc, for example, if there were one instance each for RF, Wired and CuxD.

### 10.) Scheduling
In the case of adapters that are started on a time-controlled basis, it is entered here when this adapter is to start. This scheduling is in the format of a cron job. To change it, click on the button with the three dots. An input window opens with a lot of additional information and help.

### 11 - Reboot
A schedule can also be created here via the clock icon when this instance should be restarted.

This column is only visible in expert mode!

### 12 - log level
In this column, the respective log level for the instance can be adjusted. Debug, info, warn and error are available. By default, this value is set to info. If you have the impression that something is not running smoothly, you can set it to debug. then the log tab for this instance also displays debug information that can help to find an error. Conversely, you can also set this value higher so that the log is not so extensive.
This column is only visible in expert mode!

### 13 - RAM limit
Here you can specify how much memory the instance should be provided as a precaution. This amount of memory is then no longer available for other tasks and should not be selected too high, especially in systems with little main memory. If the instance temporarily needs more memory, the system will of course allocate it to you, but will then immediately release it again for the system. During the time when an instance requires more memory than it has been reserved, the required memory is shown in red.

This column is only visible in expert mode!

### 14 - RAM usage
The memory actually used by the instance is displayed here. These values are updated regularly. After the update, these values appear briefly in green text.