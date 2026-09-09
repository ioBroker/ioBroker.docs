---
title: vis
lastChanged: 09.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/viz/vis.md
hash: 6ZUCdIENctnvGWbz4Wz7QV+CgTt2aONENg5JOkrcwTc=
---
# vis

**vis** was long the visualization of ioBroker: an interface in which you could assemble your own user interfaces using building blocks instead of code.

**For a new project, [vis-2](/adapters/vis-2) is the right choice.** It's the successor and is still being developed. This page describes the editor of the original vis. Much of it still applies in vis-2, but the interface looks different. An overview of the visualizations and their strengths can be found under [Overview](/docs/viz/README.md) , and the building blocks for both versions are under [Widget Sets](/docs/viz/widgetsets.md) .

## configuration

vis requires the **web** adapter, which is automatically included during installation. Otherwise, nothing needs to be configured except for the license. This is managed in your account at [iobroker.net](https://iobroker.net) and is free for private use. Details on how this works can be found under [Adapter Licenses](/docs/licenses/adapter.md) .

There can only be **one** vis instance.

## operation

After installation, the adapter is accessed via`<IPdesServers>:8082/vis/index.html` The visualization can be accessed via the hyperlink in the Instances tab of the admin adapter.

A demo view is automatically created the first time the program is accessed.

A project contains multiple views. Each view allows for the free placement of several widgets, which are used for display or interaction. The visualization is created and configured via the editor. The editor is accessed via`<IPdesServers>:8082/vis/edit.html` The editor is accessed after closing it via the close-window icon (x) in the upper right corner. The last edited view is displayed in the function view. This can be accessed at any time with`<IPdesServers>:8082/vis/index.html#ViewName` The editor is divided into different areas.

![](../../de/viz/media/vis_ioBroker_vis_Editor_002-300x165.jpg)

---

## The riders in the head area (1)

### Views

If this tab is selected, you can choose the view to be edited from the existing ones in the pull-down menu below.\
![](../../de/viz/media/iobroker_vis_Editor_Widgets_Header.jpg)

The four icons to the right are self-explanatory and relate to the views. After clicking on the workspace, the view in the properties sidebar on the right switches to the Views tab and displays the settings for the view.

### Widgets

When the Widgets tab is activated, the toolbar below it changes.![](../../de/viz/media/iobroker_vis_Editor_Views_Header.jpg)

The tools for editing widgets are displayed.

#### Pulldown menu

Here you can select a widget for editing, or the selected widget will be displayed here.

#### Icon bar

The three icons for delete, copy and info become active when a widget is selected.

#### Align widgets

![](../../de/viz/media/iobroker_vis_Editor_Widgets_Ausrichten_Header.JPG)

By clicking and dragging (or Ctrl-clicking) multiple widgets, you can then use these icons to align groups (left-aligned, right-aligned, top-aligned, bottom-aligned, centered, vertically centered). You can also position multiple widgets with equal spacing (horizontally and vertically), and adjust the size of multiple widgets using the last two icons. Selecting a widget switches the view in the properties sidebar on the right to the Widget tab, displaying the settings for that widget. The multi-selection feature allows you to modify the properties of several widgets simultaneously via the right sidebar.

#### All widgets

The two widgets are used to simplify the editing of views. The first prevents the widget values from being updated, the second prevents widgets from being moved.

#### Export widget

If a widget is activated, you can use this button to export the widget's CSS code.

#### Import widget

Conversely, you can import widgets here that are not included in vis. After clicking on a widget, the view in the properties sidebar on the right switches to the Widget tab and displays the settings for the selected widget.

### Tools

When the Tools tab is activated, the underlying toolbar changes.![](../../de/viz/media/iobroker_vis_Editor_Tools_Header.JPG)

#### resolution

Many preset screen resolutions for mobile devices are displayed here, but there's also an "User-defined" option that allows you to configure your own settings. Selecting something here will draw a frame on the workspace corresponding to the chosen screen resolution.

#### default

If _"default"_ is checked, the active view becomes the default view and is loaded if the VIS view is loaded with the resolution set above. **For example:** The _iPad Portrait_ display is selected, and the _"Default"_ box is checked in the _"Start"_ view. Let's assume a view named _"Weather"_ has now been loaded from the project onto an iPad in landscape orientation. If the iPad is then rotated to portrait orientation, the _"Start"_ view, previously set as the _default_ for this resolution (portrait), will be displayed automatically. This allows for control via movement on appropriately mobile devices (for example, "back to the main menu" or _portrait orientation_ showing a different view than _landscape orientation_ ).

#### Grid

Here you have the options: _Inactive_ , _Elements_ , and _Grid_ . If you select Elements, the widgets will snap to an adjacent element when you move them with the mouse. With Grid, you can also specify a grid size (in pixels) within which the widgets will then snap.

#### Instance ID

A unique ID is displayed here, which can be addressed, for example, via a VIS [Control Command](https://github.com/iobroker/ioBroker.vis/blob/master/README.md#control-interface) using a script.

#### Browser ID

Clicking this button generates a new ID in the previous field. This allows each browser on each device to be individually identified.

#### export

Here you can export your view to use it, for example, in another installation. Clicking the button opens a window displaying the view in text format. You can copy this data to the clipboard using Ctrl+C, paste it into a text editor, and then save it.

#### import

After clicking, an empty window opens. Here you can copy a text file obtained via the _export_ function. Then, enter a name for the view in the lower left corner and click the _import_ button. The new view will then be available. This function is suitable for importing examples from the forum.

### Set up

![](../../de/viz/media/iobroker_vis_Editor_Setup_Header.gif)

#### Theme

Here you can choose from a color scheme for the editor.

#### Language

The operating language for the editor can be set.

#### Projects

Projects are collections of [views](/docs/viz/vis.md#views) . By default, the _main_ project is created and managed via`<IPdesServers>:8082/vis/index.html#ViewName` The project files are located in the ioBroker installation folder.`_ioBroker-Ordner_/iobroker-data/files/vis.0/main` .

#### Project export/import

Projects can be exported as a whole (e.g., to share with other users):\
&#x20;A zip file is created containing the images used, the stylesheet vis-user.css and the actual definitions vis-views.json.\
&#x20;Additionally, there is an option to export the project anonymously. :construction:\
&#x20;To import other projects, simply drag the zip file of an export described above onto the window and specify a name for the new project:\
![](../../de/viz/media/iobroker_vis_Editor_Setup_Projekt_ImportHeader.gif)

#### new project...

Here you can create a new project. A window will open prompting you to enter a project name. After confirmation, the editor will load the new project at this address:`<IPdesServers>:8082/vis/_projektname_/index.html#ViewName.`\
&#x20;The files for the new project are located in the ioBroker installation under`_ioBroker-Ordner_/iobroker-data/files/vis.0/projektname` .\
&#x20;**Tip** : You can duplicate a project folder and edit the duplicate in the VIS Editor.`<IPdesServers>:8082/vis/_projektname_duplikat_/index.html` .

#### Application

When a project is loaded, all [views](/docs/viz/vis.md#views) within that project are also loaded. This can sometimes be inefficient and slow down the system. Therefore, you can group related views into different projects. For example, it makes sense to separate them according to devices with different screen resolutions. You could create a _"Smartphone"_ project and contain views optimized for touch operation and portrait orientation. By deliberately reducing the number of widgets, the project remains small in terms of data volume and therefore loads quickly even when accessed remotely (e.g., via VPN and mobile data). A separate project _, "Wall Tablet,_ " which is only displayed on the wall-mounted tablet, doesn't need to load any views from the "Smartphone" project. The main project, _"main,"_ which displays all data, is typically only viewed and edited from a desktop PC. Data volume and processing speed are usually not a concern here. If views need to be used in multiple projects, they can be copied using the **export** and **import** commands in the [Tools](/docs/viz/vis.md#tools) tab. Linking between projects via navigation widgets is not possible.\
&#x20;**Tip** : It can also be useful to create a test project when experimenting with CSS commands.

#### File manager... (6)

After selecting this menu item, files can be conveniently copied into or out of the ioBroker file system without the need for any additional programs. The file manager will open:![The file manager of the vis editor](../../de/viz/media/iobroker_vis_Editor_Setup_Dateimanager.JPG)

The images shown are examples and are copyrighted by their respective companies.

The behavior is similar to any file manager. The blue "left arrow" button allows you to navigate up one hierarchy level, while clicking on a folder takes you inside it. A new folder can be created using the "Folder+" icon. Once you've reached the desired directory, you can select a file, download it to your computer using the blue arrow, and open Dropbox by clicking the green arrow.![](../../de/viz/media/iobroker_vis_Editor_Setup_Dateimanager_Dropbox.JPG) Here, files can be easily dragged and dropped and then uploaded to the ioBroker server by clicking the _**Upload**_ button. Alternatively, you can click anywhere in the area to open a file selection window. The file list will clear, and if you don't want to upload any more files, you can close the Dropbox using the **_Close_** button.

#### Settings... (7)

![](../../de/viz/media/iobroker_vis_Editor_Setup_Projekteinstellungen.JPG)

- _**Reload if connection is interrupted for longer than:**_ The active view will be completely reloaded if the connection between the frontend (tablet) and the server has been interrupted for longer than the preset time. To prevent this, this time can also be set to _**"never"**_ .
- _**Reconnect interval:**_ The time at which the frontend should attempt to reach the server.
- _**Dark Reconnect Screen:**_ Normally, the page is white when attempting to reload the view. To prevent this from being distracting in dark environments, the screen can be switched to dark mode using this checkbox.
- _**Delete inactive views from RAM:**_ To save valuable RAM on the front end, which is usually only 1GB on budget tablets, views that haven't been used for a while can be removed from RAM. However, reloading these views will then take longer. This option sets the time that unused views should be kept in RAM.

#### Object browser... (8)

![](../../de/viz/media/iobroker-vis_ioBroker_Adapter_Vis_Editor_Setup_objectbrowser.jpg)\
&#x20;Here you can search for an object. Clicking the "Select" button will _**place**_ the selected object in the clipboard. For faster searching, you can use the filter fields above the column headers.

### Help (5)

Here you will find an overview of the keyboard shortcuts under _"Shortcuts"_ and a brief information about the project under _"About the project"_ .

### Undo button (6)

This button allows you to undo the last action(s) step by step.

---

## The widget sidebar (2)

It is used to select widgets. The widgets are displayed as icons and can be dragged and dropped onto the workspace, or positioned at position 0,0 of the workspace using the _Insert_ button.\
![](../../de/viz/media/vis_iobroker_vis_Editor_Widgets_sidebar.jpg)

The field below the _Insert_ button is a filter field. Here you can enter a term to search the icons for it. All icons containing that term will be displayed. If you delete the last filter (or the \*), you get a drop-down list of possible search terms. Below that is the selection field for the widget sets.\
&#x20;The asterisk (\*) represents all widget sets.\
&#x20;When filtering by terms, all widget sets are automatically searched. Otherwise, the pull-down menu also offers the different widget sets as filters.

---

## The work surface (3)

This is where you position the widgets for the view. You can do this with the mouse or the arrow keys. If the Widgets tab is active, some alignment aids are also available.

---

## The settings sidebar (4)

Here, all settings for the views and widgets are entered via the corresponding tabs. Additionally, the CSS tab offers advanced users the option to integrate their own custom developments.

- Data point assignment
- Widget size
- Font size and color
- background
- Frame, line color, style, thickness
- CSS parameters

To display data points or perform actions, the data point must be assigned to the widget. This entry can be found in the _General_ section.