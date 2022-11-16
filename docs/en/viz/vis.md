---
title: VIS
lastChanged: 04.11.2022
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/viz/vis.md
hash: bHKz1FZTHJ9k0VsfJURfpT2ieu6OgiaSp0zp2Vrwj24=
---
?> ***This page is currently being revised.***.<br><br> Help ioBroker and expand this article. Please note the [ioBroker Style Guide](https://www.iobroker.net/#de/documentation/community/styleguidedoc.md) so that the changes can be adopted more easily.

**Visualizations with VIS**

VIS is the main visualization tool from ioBroker and offers extensive options for visualizing a smart home.

## Configuration
VIS requires the WEB adapter, which is automatically installed when VIS is installed. No further configuration is necessary apart from entering the license, which can be obtained from https://iobroker.net/. This license is free for private use.<br> There can only be one VIS instance.

## Service
After installation, the adapter is called via `<IPdesServers>:8082/vis/index.html` or via the hyperlink in the Instances tab of the admin adapter and the visualization is displayed.

A demo view is automatically created the first time it is called up.

There are several views in a project.
Several widgets can be placed freely on each view, which are used for display or operation. The visualization is created and configured using the editor.
The editor is called up via `<IPdesServers>:8082/vis/edit.html`.
After closing the editor using the close-window icon ( (x) top right), the last edited view is displayed in the function view.
This can be called up at any time with `<IPdesServers>:8082/vis/index.html#ViewName` The editor is divided into different areas.

![](../../de/viz/media/vis_ioBroker_vis_Editor_002-300x165.jpg)

* * *

## The tabs in the header area (1)
### Views
If this tab is selected, you can select the view to be edited from the existing ones in the pull-down menu below.
![](../../de/viz/media/iobroker_vis_Editor_Widgets_Header.jpg)

The four icons to the right are self-explanatory and refer to the views.
After clicking on the workspace, the view in the properties sidebar changes to the Views tab on the right-hand side and shows the settings for the view.

### Widgets
If the Widgets tab is activated, the underlying toolbar changes ![](../../de/viz/media/iobroker_vis_Editor_Views_Header.jpg)

The tools for editing widgets are displayed.

#### Pull down menu
Here you can select a widget for editing, or the selected widget is displayed here.

#### Icon bar
The three icons for delete, copy and info become active when a widget is selected.

#### Align widgets
![](../../de/viz/media/iobroker_vis_Editor_Widgets_Ausrichten_Header.JPG)

If you select several widgets with the mouse button pressed (or with a Ctrl-click), you can then use these icons to align groups (left-aligned, right-aligned, top-aligned, bottom-aligned, centered, vertically aligned in the middle).
You can also position several widgets with the same distance (horizontally and vertically) and adjust the size of several widgets with the last two icons.
If you select a widget, the view in the properties sidebar on the right changes to the Widget tab and shows the settings for this widget.
With the possible multiple selection, you can change the properties of several widgets at the same time via the right sidebar.

#### All widgets
The two widgets are used for easier editing of views.
The first ensures that the values of the widgets are not updated, the second prevents the widgets from being moved.

#### Export Widget
If a widget is activated, you can use this button to export the widget's CSS code.

#### Import widget
Conversely, you can, for example, import widgets here that are not included in the scope of vis.
After clicking on a widget, the view in the properties sidebar changes to the Widget tab on the right-hand side and shows the settings for the selected widget.

###Tools
If the Tools tab is activated, the underlying toolbar changes ![](../../de/viz/media/iobroker_vis_Editor_Tools_Header.JPG)

#### Resolution
Many preset screen resolutions from mobile devices are displayed here, but there is also a "User-defined" item that offers the option of making your own settings.
If you select something here, a frame is drawn on the workspace that corresponds to the selected screen resolution.

####Default
If _default_ is checked, the active view will be made the default view and loaded if the VIS view is loaded with the resolution set above.
**Example:** The _iPad Portrait_ display is selected and the _Default_ box is checked in the _Start_ view. Assuming that a view named _Weather_ in landscape format was loaded from the project on an iPad. If the iPad is now rotated to portrait format, the _Start_ view previously set as the standard (_default_) for this resolution (portrait format) is automatically displayed.
With corresponding mobile devices, control by movement is possible (e.g. "back to the main menu" or _up_ shows a different view than _across_).

#### Grid
here there are the options _inactive_, _elements_ and _grid_. If you select elements, the widgets snap to an adjacent element when moving with the mouse. With grid you can specify a grid size (in px) in which the widgets then snap.

#### Instance ID
A unique ID is displayed here, which can be addressed with a script using VIS [ControlCommand](https://github.com/iobroker/ioBroker.vis/blob/master/README.md#control-interface), for example.

#### BrowserID
clicking this button creates a new ID in the previous field. This means that every browser can be individually identified on every end device.

Export ####
Here you can export your view, e.g. to use it in another installation. When you click the button, a window opens in which the view is offered in text form. You can put this data on the clipboard with Ctrl-C and load it into an editor and then save it

#### Import
After clicking, an empty window will open. Here you can copy a text file received via the _export_ function. Then enter a name for the view at the bottom left and click on the _import_ button. From then on, the new view is available. This function is useful for importing examples from the forum.

### Set up
![](../../de/viz/media/iobroker_vis_Editor_Setup_Header.gif)

#### Theme
Here you can choose a color scheme for the editor.

#### Language
The operating language for the editor can be specified

#### Projects
Projects are collections of [view](http://www.iobroker.net/?page_id=1193&lang=de).
The project _main_ is created by default and is called up via `<IPdesServers>:8082/vis/index.html#ViewName`.
The project files are located in the ioBroker installation in the `_ioBroker-Ordner_/iobroker-data/files/vis.0/main` folder.

#### Project export/import
Projects can be exported as a whole (e.g. to share with other users): A zip file is created containing the images used, the style sheet vis-user.css and the actual definitions vis-views.json.
There is also the option to export the project anonymously. :construction: To import other projects, simply drag the zip file of an export described above onto the window and enter a name for the new project: ![](../../de/viz/media/iobroker_vis_Editor_Setup_Projekt_ImportHeader.gif)

#### New project...
A new project can be created here.
A window opens and prompts you to enter a project name.
After confirming, the editor loads the new project at this address: `<IPdesServers>:8082/vis/_projektname_/index.html#ViewName.` The files of the new project are located in the ioBroker installation under `_ioBroker-Ordner_/iobroker-data/files/vis.0/projektname`.
**Tip**: You can duplicate a project folder and edit the duplicate in the VIS editor `<IPdesServers>:8082/vis/_projektname_duplikat_/index.html`.

#### Application
When loading a project, all [Views] :construction: (http://www.iobroker.net/?page_id=1193&lang=de) of this [project] :construction: (http://www.iobroker.net/?page_id =188&lang=de&preview_id=188&preview_nonce=d845a20ee2&preview=true#project) are also loaded.
Sometimes this doesn't make sense and slows down the system.
Therefore, views that belong together can be combined in different projects.
For example, it makes sense to separate according to end devices with different screen resolutions.
You can create a _Smartphone_ project and create views in it that are optimized for touch operation and vertical alignment.
By deliberately reducing the number of widgets, the project remains small in terms of data volume and therefore loads quickly when on the move (e.g. via VPN and mobile communications).
Another project _Wandtablet_, which is only displayed on the tablet on the wall, does not need to load any views from the _Smartphone _ project.
The main project _main_ for displaying all data is usually only displayed and edited from the desktop PC.
Data volume and computing speed usually play no role here.
If views are to be used in several projects, they can be copied using the [export](http://www.iobroker.net/?page_id=188&lang=de&preview_id=188&preview_nonce=d845a20ee2&preview=true#exportieren) :construction:/ [import](http://www.iobroker.net/?page_id=188&lang=de&preview_id=188&preview_nonce=d845a20ee2&preview=true#importieren) :construction: command.
Linking from one project to another via navigation widgets is not possible.
**Tip**: It can also be useful to create a test project when experimenting with CSS commands.

#### File Manager... (6)
After selecting this menu item, files can be conveniently copied into or out of the ioBroker file system without the need for additional programs.
The file manager opens: ![align="aligncenter" width="799"](media/iobroker_vis_Editor_Setup_Dateimanager.JPG) [caption id="attachment_6007" align="aligncenter" width="799"][![](img/ioBroker_Adapter_Vis_Editor_Setup_filemanager.jpg)](../../de/viz/img/ioBroker_Adapter_Vis_Editor_Setup_filemanager.jpg) *The images are just the sample images and are copyrighted by the respective companies.[ /caption]

The behavior is similar to any file manager.
With the blue button "Left arrow" you maneuver one hierarchical level higher, by clicking on a folder into it.
A new folder can be created with the "Folder+" icon.
If you have reached the desired directory, you select a file, you can download it to the computer with the blue arrow, if you click on the green arrow, the "Dropbox" opens.
![](../../de/viz/media/iobroker_vis_Editor_Setup_Dateimanager_Dropbox.JPG) Files can be stored here simply by drag & drop and then uploaded to the ioBroker server by clicking on the _**Upload**_ button.
Alternatively, you can click anywhere in the area, then a file selection will open.
The file list empties and if no more files are to be uploaded, exit the Dropbox via the **_Close_** button.

#### Settings... (7)
![](../../de/viz/media/iobroker_vis_Editor_Setup_Projekteinstellungen.JPG)

* _**Reload if no connection longer than:**_ The active view is completely reloaded,

if the connection between the frontend (tablet) and the server was interrupted for longer than the preset time.
To prevent this, this time can also be set to _**never**_.

* _**Reconnect Interval:**_ The time in which the frontend should try

to reach the server.

* _**Dark reconnect screen:**_ Usually the page is white when trying to reload the view.

So that this does not disturb in dark rooms, the screen can be switched to dark with this checkbox.

* _**Deleting non-active views from RAM:**_ To free up valuable working memory on the frontend,

which is usually only 1GB, especially on cheap tablets, views that have not been needed for a long time can be removed from the RAM.
However, if the corresponding view is loaded again, this will take longer.
This option sets the time that unused views are kept in RAM.

#### Object Browser... (8)
![](../../de/viz/media/iobroker-vis_ioBroker_Adapter_Vis_Editor_Setup_objectbrowser.jpg) You can search for an object here.
After clicking the _**Select**_ button, this is placed on the clipboard.
The filter fields above the column headers can be used to find them more quickly.

### Help (5)
There is an overview of the key commands under _Shortcuts_ and brief information under _About the project_.

### Undo button (6)
With this button you can undo the last action(s) step by step.

* * *

## The widget sidebar (2)
It is used to select widgets.
The widgets are displayed as icons and can be dragged and dropped onto the workspace, or positioned at position 0,0 of the workspace using the _Insert_ button.
![](../../de/viz/media/vis_iobroker_vis_Editor_Widgets_sidebar.jpg)

The field below the _Insert_ button is a filter field.
Here you can enter a term to search the icons for it.
All icons containing this term are displayed.
If you delete the last filter (or the \*), you get a pull-down list with the possible search terms.
Below that is the selection box for the widget sets.
The asterisk (*) represents all widget sets.
When filtering by term, all widget sets are automatically searched.
Otherwise, however, the pulldown menu also offers the various widget sets as filters.

* * *

## The work surface (3)
The widgets for the view are positioned here. This can be done with the mouse or the arrow keys.
If the Widgets tab is active, some alignment aids are also available.

* * *

## The settings sidebar (4)
here all settings for the views and the widgets are entered via the corresponding tabs.
In addition, the CSS tab offers advanced users the opportunity to integrate their own developments.

* Data point mapping
* Widget size
* Font size and color
*   Background
* Border, line color, type, thickness
* css parameters

In order to be able to display data points or carry out actions, the data point must be assigned to the widget.
This entry can be found in the _General_ section.