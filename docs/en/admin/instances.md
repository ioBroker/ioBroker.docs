---
title: Instances
lastChanged: 10.05.02021
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/admin/instances.md
hash: ryoo5q50Xq8cxSezNgJU212bACYAHiFSrZdXotHE6us=
---
The instances already installed on the Adapter tab are listed here and can be configured accordingly.

## The title line
in the title line there are icons for the most important processes. There is context help for each icon. To do this, simply hold the mouse on the icon for a while. There is also information about the load on the server.

![The icons in the title bar](../../de/admin/media/ADMIN_Instanzen_numbers.png)

The icons in detail:

### 1 - Refresh the view
If instances that have just been created are not visible, clicking this icon helps to bring the status of the page up to date.

### 2 - Turn on administrator mode
When you select this icon, additional columns for configuring the instances are displayed (toggle function). Information on this in the section on page content.

### 3 - Show only instances of the selected host
![The available hosts](../../de/admin/media/ADMIN_Instanzen_hosts.png)

In multihost systems, the instances of all hosts are managed by the master's admin. The information on which host this instance is located is in the ***Server*** column

If a host is selected in the header, this button can only be used to display the instances installed there.

![The available hosts](../../de/admin/media/ADMIN_Instanzen_hosts.png)

### 4 - filter
A term for filtering or searching for instances can be entered in this field

## More information in the Instances window
The first numbers indicate the memory used by the instances so far and the remaining free memory in MB. Behind it the free memory in%. The name of the ioBroker server and the number of running processes are in the square brackets.

## The page content
![The available hosts](../../de/admin/media/ADMIN_Instanzen_numbers02.png)

The installed instances of the adapters are shown in a table on the page.

The table consists of the following columns:

### 1 - state
The state of the instance is shown here by a traffic light. Further information can be obtained by holding the mouse on the signal.

Not all instances have this traffic light. But don't panic. These are either time-controlled instances that only briefly connect to the controller and then switch off again immediately or continue to run in the background, for example.

### 2 - Icon
The icon that is used throughout ioBroker for this adapter is displayed here

### 3 - instance
The name of the instance is in this column. it is made up of the name of the adapter and a number that is consecutively numbered in the order in which the instances are installed. The first instance receives the

0. This designation is the basis for the designation of the data points in ioBroker.

### 4 - activated
The instance is started or stopped here. The green pause symbol shows that the adapter is running and can be paused by clicking on it, the red play symbol shows a stopped instance that can be started with one click.

### 5 - configuration
Clicking this icon opens an adapter-specific configuration menu. The corresponding menus are described for the associated adapters.

### 6 - restart
When you click on this icon, the corresponding instance is restarted

### 7 - trash can
The corresponding instance is deleted with this icon. Other instances of the same adapter are retained. The adapter itself also remains.

### 8 - web link
Behind this icon there is a link to the website of this instance. Either because this adapter has its own web interface (with a different port), or just a different path. In some cases, this link also leads to help pages.

### 9 - title
The name of the instance is specified here. You can change this name according to your own wishes or needs. This is particularly useful if there are several instances of an adapter (otherwise with the same name). This would be the case with hm-rpc, for example, if there is one instance each for RF, Wired and CuxD.

### 10.) Timing
In the case of adapters that are started time-controlled, the time when this adapter should start is entered here. This scheduling is in the format of a cron job. To change, click on the button with the three dots. An input window opens with a lot of additional information and help.

### 11 - restart
The clock icon can also be used to create a schedule when this instance should be restarted.

This column is only visible in expert mode!

### 12 - Log level
The respective log level for the instance can be adjusted in this column. Debug, info, warn and error are available. By default, this value is set to info. If you have the impression that something is not running smoothly, you can set it to debug. then debug information is output for this instance in the log tab, which can help to find an error. Conversely, you can set this value higher so that the log is not so extensive.
This column is only visible in expert mode!

### 13 - RAM limit
Here you can specify how much main memory of the instance should be made available as a precaution. This amount of memory is then no longer available for other tasks and should not be selected too high, especially in systems with little memory. If the instance needs more memory temporarily, this will of course be allocated to it by the system, but will then be immediately released for the system. During the time in which an instance requires more memory than it was reserved, the required memory is shown in red.

This column is only visible in expert mode!

### 14 - RAM usage
The actual memory used by the instance is displayed here. These values are updated regularly. After the update, these values appear briefly in green.