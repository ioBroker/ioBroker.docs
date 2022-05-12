---
title: adapter
lastChanged: 10.05.2021
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/admin/adapter.md
hash: svGv1TgKOa2pP8zn85C5t9Xd7FgJNy5dfaEK2af4S84=
---
# The Adapters tab
The available and installed adapters are displayed and managed here.

## The title line
The title bar contains icons for the most important processes. There is context help for each icon. Simply hold the mouse on the icon for a while.

![The Admin tab](../../de/admin/media/ADMIN_Adapter_Kachel_numbers.png)

### 1 - Toggle view
This button can be used to switch between the tile view and the table view (toggle function)

### 2 - Update ad
Every time you restart, it will automatically check for updates. This button can be used to start the search manually or to trigger a refresh of the page.

### 3 - show only installed adapters
When you select this icon, only adapters with already installed instances are displayed (toggle function)

### 4 - View adapters with updates
When you select this icon, only adapters for which an update is available (toggle function) are displayed. The tiles of the updateable adapters have a green header. If there is no update for an adapter, a corresponding message appears.

In addition, another icon appears in the title bar:

![The Admin tab](../../de/admin/media/ADMIN_Adapter_Kachel_upgradeable.png)

By clicking on this icon (8) all available adapters will be updated.

### 5 - Install adapter from custom URL
!> **WARNING: Using this option can lead to problems with the ioBroker installation.** GitHub adapters may still be under development and therefore may not work properly! These should only be used with caution in a productive system. It is recommended to wait for a stable version!

Adapters can be installed from their own paths (URL or file paths) or pre-release versions of GitHub using the Octocat icon.

After clicking on this icon, a corresponding selection window opens:

![Install from GitHub](../../de/admin/media/ADMIN_Adapter_GitHub.png)

Under the ***FROM GITHUB*** tab, the desired adapter is simply selected from the pull-down menu and the latest pre-release is installed.

If the ***ANY*** tab is selected, any file path or any URL (e.g. a URL to an external adapter developer) can be entered in the field and the corresponding adapter can be installed.

### 6 - Turn on expert mode
The expert mode also makes it possible to install older versions of an adapter. If this button (9) is selected, an additional icon appears in the tile, which can be used to install earlier versions.

![Install other versions](../../de/admin/media/ADMIN_Adapter_Kachel_versions.png)

### 7 - Filters
Here you can use a filter term to search for specific adapters.