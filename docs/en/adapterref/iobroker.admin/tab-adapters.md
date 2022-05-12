---
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/adapterref/iobroker.admin/tab-adapters.md
title: The Adapter tab
hash: mYx9gAiqrOYwPEWZekb9aOzN+YrITmzgTLJwbzoMIhk=
---
# The Adapters tab
The available and installed adapters are displayed and managed here.

![iobroker_image_bpi_20160910](../../../de/adapterref/iobroker.admin/img/ioBroker_Image_BPi_20160910.jpg)

## The title line
The title bar contains icons for the most important processes.
There is context help for each icon. Simply hold the mouse on the icon for a while.

![iobroker_adapter_admin_002aa](../../../de/adapterref/iobroker.admin/img/tab-adapters_002aa.jpg)

### **The icons in detail:**
![](../../../de/adapterref/iobroker.admin/img/tab-adapters_icons01_20170108-e1483882554815.jpg)

### **1.) Only show installed adapters**
When you select this icon, only the adapters that are already installed are displayed (toggle function)

### **2.) View adapters with updates**
When you select this icon, only adapters for which an update is available are displayed (toggle function)

There is an update icon in the **_installed_** column behind the updateable adapters.
By clicking on this button, the corresponding adapter is updated to the latest version.

In addition, another icon appears in the title bar:

![iobroker_adapter_admin_002b](../../../de/adapterref/iobroker.admin/img/tab-adapters_002b.jpg)

Clicking this icon will update all available adapters.

### **3.) Install adapter from own URL**
Adapters can be installed from their own paths (URL or file paths) or pre-release versions of GitHub using the Octocat icon.

After clicking on this icon, a corresponding selection window opens:

![iobroker_adapter_admin_002c_github](../../../de/adapterref/iobroker.admin/img/tab-adapters_002c_GitHub.jpg)

Under the **_From github_** tab, simply select the desired adapter from the pull-down menu and the latest pre-release will be installed.

If you select the Any tab, you can enter any file path or any URL (e.g. a URL to an external adapter developer) in the field and the corresponding adapter can be installed.

![iobroker_adapter_admin_002c_ownfile](../../../de/adapterref/iobroker.admin/img/tab-adapters_002c_ownFile.jpg)

### **4.) Switch on expert mode**
The expert mode also makes it possible to install older versions of an adapter.
If this button is selected, a pull-down menu (4) appears on the far right for each adapter, via which earlier versions can be installed.

![](../../../de/adapterref/iobroker.admin/img/tab-adapters_icons02_20170108.jpg)

### **5.) Check for Updates**
Every time you restart, it will automatically check for updates. You can use this button to start the search manually.

If updates are available in the repository set under [system settings](#Systemeinstellungen), the font of the **_Adapter_** tab is displayed in green.

### **5.) Change sorting**
This button changes the sorting of the adapters on this page.

When the button is active, all adapters are sorted alphabetically, with a block with the installed adapters first being displayed, followed by one with adapters that have not yet been installed. Each of these two blocks is sorted alphabetically.

If this button is not active, the adapters are sorted by topic.

Then the next two icons are also visible.

### **6.) Close all topics**
### **7.) Expand all topics**
There are also two buttons on the right side

![iobroker_adapter_admin_003a](../../../de/adapterref/iobroker.admin/img/tab-adapters_003a.jpg)

### **8.) Edit tab**
This button can be used to hide tabs that are not required and to show those that are not visible.

### **<a id="Systemeinstellungen"></a> 9.) System Settings**
Basic parameters for ioBroker are set here.

## The page content
![iobroker_admin_adapter_content01](../../../de/adapterref/iobroker.admin/img/tab-adapters_Inhalt01.jpg) The adapters are displayed in tabular form on the page. The table consists of the following columns:

### **1.) Name**
The names of the adapters with the associated icons are listed in this column.
If the grouping of adapters is selected via the icon (5) in the title bar, the group names also appear here.

### **2.) Description**
Here is a brief description of the function of the adapter

### **3.) Keywords**
Here are some search terms associated with the adapter.

### **4th version**
The available version is shown here. The development status of an adapter is highlighted in color to provide an overview. (red = planned; yellow = beta; orange = alpha; green = final).

### **5.) installed**
This column gives various information about the installation status of this adapter.
On the one hand there is the version number of the installed adapter. If this is printed in bold, there is an update. After that, in square brackets, is the number of instances installed by this adapter, how many are enabled, and what their status is. [2/1] means that there are two instances of this adapter, one of which is activated and running without problems (the latter can be recognized by the green color of the second number). There is an update icon further to the right if there is an update for this adapter. Clicking on this icon starts the update process.

### **6.) Platform**
The software platform on which this adapter is based is specified here. Usually this is javascript under nodejs.

### **7.) License**
This is the license under which the adapter is made available. The license conditions can usually be found in the readme. If the license requires acceptance by the end user, a license terms window will appear when creating an instance.

### **8.) Install**
This column contains various buttons for installation and for help.

![](../../../de/adapterref/iobroker.admin/img/tab-adapters_icons02_20170108.jpg)

1. (+) This adds an instance of the adapter. This still has to be configured and activated in the Instances tab. With most adapters, any number of instances can be installed, e.g. to address different hardware. If this is not possible, a window opens with a corresponding error message.
2. (?) When this button is active, it links to the adapter's help page. This is usually located on GitHub, where the adapter is also maintained.
3. (trash can) This button deletes the adapter and all instances already installed
4. (Pull-down menu) Previous versions of the respective adapter can be installed via this menu. This pulldown menu is only visible in expert mode.