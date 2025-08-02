---
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/adapterref/iobroker.admin/tab-adapters.md
title: The Adapter tab
hash: QL+KH1rDLyLUu//lZEw1peBxkvCTrTkqq2Z4ohf+BKg=
---
# The Adapter tab
The available and installed adapters are displayed and managed here.

![iobroker_image_bpi_20160910](../../../de/adapterref/iobroker.admin/img/ioBroker_Image_BPi_20160910.jpg)

## The title line
In the title bar there are icons for the most important processes.
There is context help for each icon. Simply hold the mouse over the icon for a while.

![iobroker_adapter_admin_002aa](../../../de/adapterref/iobroker.admin/img/tab-adapters_002aa.jpg)

### **The icons in detail:**
![](../../../de/adapterref/iobroker.admin/img/tab-adapters_icons01_20170108-e1483882554815.jpg)

### **1.)  only show installed adapters**
When you select this icon, only the adapters that are already installed are displayed (toggle function)

### **2.) Show adapters with updates**
When you select this icon, only adapters for which an update is available are displayed (toggle function)

Behind the adapters that can be updated, there is an update icon in the **_installed_** column.
Clicking on this button will update the corresponding adapter to the latest version.

In addition, another icon appears in the title bar:

![iobroker_adapter_admin_002b](../../../de/adapterref/iobroker.admin/img/tab-adapters_002b.jpg)

Clicking this icon will update all available adapters.

### **3.) Install adapter from own URL**
Using the Octocat icon, adapters can be installed from custom paths (URL or file paths) or pre-release versions from GitHub.

After clicking on this icon, a corresponding selection window opens:

![iobroker_adapter_admin_002c_github](../../../de/adapterref/iobroker.admin/img/tab-adapters_002c_GitHub.jpg)

Under the **_From github_** tab, simply select the desired adapter from the pull-down menu and the latest pre-release version will be installed.

If you select the Any tab, you can enter any file path or any URL (e.g. a URL to an external adapter developer) in the field and install the corresponding adapter.

![iobroker_adapter_admin_002c_ownfile](../../../de/adapterref/iobroker.admin/img/tab-adapters_002c_ownFile.jpg)

### **4.) Activate expert mode**
The expert mode also allows older versions of an adapter to be installed.
If this button is selected, a pull-down menu (4) appears on the far right of each adapter, via which earlier versions can be installed.

![](../../../de/adapterref/iobroker.admin/img/tab-adapters_icons02_20170108.jpg)

### **5.) Check for updates**
Every time you restart the computer, the system automatically searches for updates. However, you can start the search manually using this button.

If updates are available in the repository set under [system settings](#Systemeinstellungen), the font of the **_Adapter_** tab is displayed in green.

### **5.) Change sorting**
This button changes the sorting of the adapters on this page.

When the button is active, all adapters are sorted alphabetically, with a block with the installed adapters being displayed first, followed by one with adapters that are not yet installed. Each of these two blocks is sorted alphabetically.

If this button is not active, the adapters are sorted by topic.

Then the next two icons are also visible.

### **6.) Close all topics**
### **7.) Expand all subject areas**
On the right side there are also two buttons

![iobroker_adapter_admin_003a](../../../de/adapterref/iobroker.admin/img/tab-adapters_003a.jpg)

### **8.) Edit tab**
With this button you can hide unnecessary tabs and show invisible ones.

### **<a id="Systemeinstellungen"></a> 9.) System Settings**
Basic parameters for ioBroker are set here.

## The page content
![iobroker_admin_adapter_inhalt01](../../../de/adapterref/iobroker.admin/img/tab-adapters_Inhalt01.jpg) The adapters are displayed in a table on the page. The table consists of the following columns:

### **1.) Name**
The names of the adapters and their corresponding icons are listed in this column.
If adapter grouping is selected using the icon (5) in the title bar, the group names also appear here.

### **2.) Description**
Here is a short description of the function of the adapter

### **3.) Keywords**
Here are some search terms associated with the adapter.

### **4.) Version**
The available version is displayed here. For an overview, the development status of an adapter is highlighted in color (red = in planning; yellow = beta; orange = alpha; green = final).

### **5.) installed**
This column provides various information about the installation status of this adapter. Firstly, it shows the version number of the installed adapter. If this is in bold, an update is available. After this, in square brackets, is the number of instances of this adapter installed, how many of them are activated and what their status is. For example, [2/1] means that there are two instances of this adapter, one of which is activated and running without problems (the latter can be recognized by the green color of the second number). Further to the right there is an update icon if an update is available for this adapter. Clicking this icon starts the update process.

### **6.) Platform**
This indicates which software platform this adapter is based on. Usually this is JavaScript under NodeJS.

### **7.) License**
This is the license under which the adapter is made available. The license conditions can usually be found in the readme. If the license requires that it be accepted by the end user, a window with the license conditions will be displayed when creating an instance.

### **8.) Install**
In this column there are various buttons for installation and help.

![](../../../de/adapterref/iobroker.admin/img/tab-adapters_icons02_20170108.jpg)

1. (+) This adds an instance of the adapter. This must be configured and activated in the Instances tab. With most adapters, any number of instances can be installed, e.g. to address different hardware. If this is not possible, a window opens with a corresponding error message.
2. (?) If this button is active, it links to the help page for the adapter. This is usually located on GitHub, where the adapter is also maintained.
3. (Trash can) This button deletes the adapter and all already installed instances
4. (Pulldown menu) This menu allows you to install previous versions of the respective adapter. This pulldown menu is only visible in expert mode.