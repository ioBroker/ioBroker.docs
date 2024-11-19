![Logo](admin/energiefluss-erweitert.png)

# ioBroker.energiefluss-erweitert

[![NPM version](https://img.shields.io/npm/v/iobroker.energiefluss-erweitert?style=flat-square)](https://www.npmjs.com/package/iobroker.energiefluss-erweitert)
[![Downloads](https://img.shields.io/npm/dm/iobroker.energiefluss-erweitert.svg)](https://www.npmjs.com/package/iobroker.energiefluss-erweitert)
![Number of Installations](https://iobroker.live/badges/energiefluss-erweitert-installed.svg)

![GitHub](https://img.shields.io/github/license/SKB-CGN/iobroker.energiefluss-erweitert?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/SKB-CGN/iobroker.energiefluss-erweitert?logo=github&style=flat-square)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/SKB-CGN/iobroker.energiefluss-erweitert?logo=github&style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/SKB-CGN/iobroker.energiefluss-erweitert?logo=github&style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/SKB-CGN/iobroker.energiefluss-erweitert?logo=github&style=flat-square)

[![NPM](https://nodei.co/npm/iobroker.energiefluss-erweitert.png?downloads=true)](https://nodei.co/npm/iobroker.energiefluss-erweitert/)

![Test and Release](https://github.com/SKB-CGN/ioBroker.energiefluss-erweitert/workflows/Test%20and%20Release/badge.svg)

## energiefluss-erweitert adapter for ioBroker
It provides an animated energyflow for all elements, you add. This could be: photovoltaics, battery, house-consumption, grid-feed-in (grid-consumption), car charge etc.

## Documentation

* [Forum thread](https://forum.iobroker.net/topic/64734/test-adapter-energiefluss-erweitert-v0-0-x-github-latest)
* [English description](./docs/en/README.md)
* [Deutsche Beschreibung](./docs/de/README.md)
* [Views Showcase](https://forum.iobroker.net/topic/74890/energiefluss-erweitert-ansichten/)
* [Wiki](https://github.com/SKB-CGN/ioBroker.energiefluss-erweitert/wiki)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.5.1-alpha.11 (2024-11-12)
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Overrides were not correctly applied (#272)
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Timestamp of the last change was timestamp of the last update (#279)
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Font-size could not be changed
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Improved UI
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Information Icon on the live-view, to inform the user about any errors that have occured
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Responsive Design for Adapter-Admin area added to meet new requirements
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Added: last change timestamp to datasource elements. Corresponds to fix (#279)

### 0.5.1-alpha.10 (2024-10-24)
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Applied fill color of element could not be removed or set to transparent
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Own Styles could not be modified, if they were empty or not set
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: If width or height of a rect or circle is changed, the corresponding line-connection was not updated correctly
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Less power mode was not working correctly, if line animation should be reversed
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Shadow on a line was not saved (#264)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Line can be hidden, if no animation is active (#263)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Improved Less power mode. It now uses much less resources 
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Text and Datasource-Elements can be rotated continuously up to 360 degrees
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Option to make the configbar transparent, while changing settings (This is useful to see the changes on mobile devices, where the configbar could hide the element)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Update properties only if they have changed - ignore ioBroker timestamp updates on states as well
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Smoothly animate filling of of rect or circle
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Option to animate line drawing during loading live-view
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Browser-Frames can now have user defined height and width

### 0.5.1-alpha.9 (2024-09-23)
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Wording for some boxes updated and general improvements of help functions
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Support for Apple Devices including correct placement of texts and applying shadows to elements
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Error handling for 'Browser Frame' inside iFrame overlay - if the URL can not be loaded in 5 seconds, the overlay will be closed

### 0.5.1-alpha.8 (2024-09-18)
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Some basic values were not saved properly
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Skipping version check while in display-mode (reduces loading time and bandwidth)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: New option "Auto detect" for "Show source as". The source and unit (if present and not entered before) will be automatically detected
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: UI improvements

### 0.5.1-alpha.7 (2024-09-16)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Backup routine reworked to improve storage (sending/receiving data reduced)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Elements, which have addition or subtraction in use, now create states with their values and can be re-used by the user
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Language and explanation improvements, some routines updated
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Optimized contextmenu for touch-devices

### 0.5.1-alpha.6 (2024-08-29)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Show element coordinates when selecting and while dragging (can be deactivated inside settings)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Workspace can not be less height and width than the coordinates of the placed elements

### 0.5.1-alpha.5 (2024-08-27)
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Configbar was not opening when another element was moved before (#232)
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Adapter was crashing, if a static picture from the gallery has had an associated datasource (#233)
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Rounded corners inside rect were not correctly set
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: If workspace is completely empty, the first new added element could not be edited
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Overrides were not correctly applied, if source value was converted to number and should be a string instead
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Access key inside live-view was not working
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Rightclick contextmenu for quick access to some functions
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Global Undo&Redo functionality for moving, adding, removing and connecting elements (does not affect configuration dialog)

### 0.5.1-alpha.4 (2024-08-07)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Alignments for elements refactored (Better detection if they run out of the workspace)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: New element "ForeignObject" added. This allows normal HTML content inside the workspace.
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Images can now have a shadow
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Keyboard copy, paste and delete functions added (Strg/cmd + c and Strg/cmd + v, Entf/del)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Double-Click on element or Connection-Line opens the 'extended'-tab and single click opens 'basic'-tab inside the configbar
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: The liveview can now be displayed in fullscreen via doubleclick oder double-tap
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Better handling of images through datasources (image will be hidden, if datasource is empty)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Connection-Lines can now have frame options for opening URLs
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Object-Browser scrolls the first clicked parent folder to the top 
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Element with linebreak was not able to be moved after applying linebreak

### 0.5.1-alpha.3 (2024-07-18)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Rewritten Upload engine (Using Web-POST instead of sockets)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Behaviour of the lines can be changed in the connection area. This includes the radius length (smaller and bigger) and the start of the curves (earlier and later)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Several functions are optimized
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Warn message in Web-Adapter was missleading (removed)
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Message, that adapter is not configured was handling a different exception (solved)

### 0.5.1-alpha.2 (2024-07-09)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Support for https via Web-Adapter (own certificates necessary)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Icon-Proxy is removed from the adapter settings and runs on the extension of the Web-Adapter (If you use it or not - no changes are required)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: 2 new override parameter "pos_x" and "pos_y" are available, to position text and datasource elements depending on their value
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Energiefluss-erweitert is now available through the welcome screen of the Web-Adapter
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Energiefluss-erweitert is now reachable via iobroker.net through the ioBroker-cloud adapter (No pro license required)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: If the Web-Adapter is configured to use valid certificates, the view of Energiefluss-erweitert can be installed as PWA (progressive Web App) on Android and iOS [Explained here](https://www.google.de/search?q=what+is+a+pwa)
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Sometimes, the object-browser could not load states and crashed

### 0.5.1-alpha.1 (2024-07-04)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: The image gallery has now a filter function which helps you to find the images more easily
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: The datasource object-browser has now a filter function which helps you to find the datasource more easily
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Added some crash-handler, which might throw an error, when the associated state is not found
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Linebreak was not working correctly (Delimiter was ignored)
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Under some circumstances a datasource could not be modified
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Text prepend was not working correctly if source is displayed as text

### 0.5.1-alpha.0 (2024-06-28)
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: The coordinates and size of an added icon could not be changed
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Cursor as Pointer (hand) did not appear on elements with action
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: NPM dependency for gallery was not fetched properly
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Newly added Text didnt save text (was empty instead)
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Under some circumstances an element could not be deleted (Error: Existing connection!)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Text-Elements can now be used as date and time element
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Icons can now be rotated and flipped (even when using overrides for them)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: New overrides parameter 'icon' available to change icons (Explained in [Wiki](https://github.com/SKB-CGN/ioBroker.energiefluss-erweitert/wiki/Custom-Overrides-for-elements#for-icons))

### 0.5.0-alpha.0 (2024-06-24)
**!!! Please note, this currently an Alpha-Version, because many things are changed and needed to be tested!!!**  
The core of the adapter keeps running on the same 0.4.1 version like before, but the configuration page has many improvements. See the list below! 

Note: save content of the state 'configuration' inside the instance as text on your disk to be able, to restore it, it case needed or downgrading to the official version again! 

After downloading the BETA Version, please manually proceed with uploading the adapter (this has to be done, after adapters are installed via Github) 
described here: https://www.iobroker.net/#de/documentation/tutorial/adapter.md?#uploadvonadapterdateien

- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Support for Websockets is now integrated. Adapter uses the faster Websockets if available. If not, the connection falls back to socket polling 
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Better Darkmode Support (including Log, Overrides and CSS Styles layout)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: New option "Manual value change" for click options of datasources. With this you can directly modify the associated state inside ioBroker. Also predefined value(s) for quick accesses are possible.
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Automatic line-break after x characters for datasources, which provide longer text (e.g. weather forecasts)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Define one Datasource as display and choose an other one to control (e.g. display the energy of a wallsocket, but switch it on or off with a different state via click-option)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Language and dependencies are updated
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Better support for iOS devices as the values are not calculated via the objects itself anymore (should work for thickness and alignments)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Autocomplete when adding or modifying sources inside datasources (if active)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Import and Exports elements (e.g. for sharing a nice designed element with others)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Preview elements (circle and rect) with their fill or outline layout
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Image gallery and query via web implementation of ioBroker
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Select datasources which contain image paths for images (e.g. WeatherAdapter)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Improved workspace (better adding of elements, when scrolled, many design and element improvements etc.)
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Some bugs or routines where not working as they should
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Battery-Discharge was wrongly calculated, if the DoD should discharge till 0%
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Removed kW settings in calculation tab as they are already set as factor inside the datasource area

### 0.4.1 (2024-04-18)
- Hotfix: After uprading the Adapter, it could happen, that the first datasource was not updated properly

### 0.4.0 (2024-04-15)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: The adapter provides 3 new states. charging_grid (battery charged via grid), charging_solar (battery charged via solar) and production (overall production) (#173, #152, #148)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Datasources for the battery calculation now need to be provided via the datasources tab and selected in the calculation tab (**!!! Important: !!! This is a major change**)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: A Milliseconds Timestamp for Values can be selected (This can be used for custom overrides, to display what ever the user likes)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Object browser now provides the names of channels and devices and is more responsive
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Better support inside configuration area for smaller devices like mobilephones and tablets
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: A new override property (img_url) has been added, to change pictures addresses for picture elements
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Overrides can now contain states from iobroker, to directly read and for example calculate a value with an additional state. Please provide the name in curly braces.
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Wrong alignment of rectangle with border-fill if height and width are different (#172)
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: The adapter could crash if the data source inside calculation was missing or deleted (#178)

### 0.3.0 (2024-03-12)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Up to 50% faster performance on saving data to the "data" datapoint due to removing unnecessary stuff
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Support for light and dark theme manual selection with URL parameter "theme=dark" or "theme=light" for overwriting the system darkmode (if applicable)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Code optimization during start-up and releasing memory cause of not using start-up stuff during runtime anymore
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: When duplicating an element, the override properties are also duplicated
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Elements can now be selected while holding ctrl key 
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: New override features for all elements added. The override features are explained inside the Wiki of the adapter (#153)
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Datasource could not be deleted (#145)
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: If there is more power on a line than configured, the maximum amount of dots was ignored (#160)
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: If image URL from datapoint is empty or NULL - remove the displayed image (useful for weather datapoints)
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: If icon or svg was duplicated, the defined color was not adopted

### 0.2.2 (2024-02-15)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: if using datasource as an image URL, in some cases the picture url is empty (for forecasts e.g.) - Chrome displayed a broken image
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: current active element receives a dashed border. This helps, to identify a picture element with empty url (if served via datasource)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Changed the previous added "unit" column for watts and kilowatts inside datasources into "factor" with a description
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: A new button inside datsources is able to check which datasources are in use
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: New translations and some code optimizations
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Broken SVG corrected

### 0.2.1 (2024-01-25)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Support for datasources as image URL's (explanation is given via question mark)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Background for workspace can now be set in basic settings (CSS still works as well)
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: SVG element was not correctly saved after saving the workspace

### 0.2.0 (2024-01-11)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Control for not deleting sources, if they are in use as source, addition or subtraction (elements which use this one, will be displayed with additional information)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: IDs for datasources will be displayed inside configuration bar, to better find the ID the element for reason mentioned before
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Control for not adding duplicate datasources from ioBroker as this will lead into crashes cause of duplicate keys
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Form on datasources configuration page will be deactivated during the time a datasource is edited
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: A unit for the datasource is selectable - this makes it easier to use those values for addition&subtraction without using Auxiliary data points
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: New translations, design modifcations and various code optimizations
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Crash Handler for missing datasources extended (if datasource from ioBroker was deleted and used as source, addition or subtraction in any element)

### 0.1.0 (2023-11-15)
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Alignment of texts and group movement was not possible, after changing to new multiline texts
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Saved default fill and outline colors were not applied if adding new text or datasource to workspace
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Extended the auto calculation to W, kW, MW and GW

### 0.0.2-alpha.24 (2023-11-14)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Lacy loading for Object-Browser. The Object-Browser will not be loaded on configuration start. It will load necessary objects on request, to not block UI anymore
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Support for line-breaks inside Text or Datasource elements. Line break can be done via <br> or \n. (#10)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Overrides can now handle 'text', 'unit', 'append' and 'prepend' values to be replaced
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Check for Datasources - inside Datasources is a button, which is able to check you sources
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Faster loading due to code optimizations
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Convert Value to positiv was not working. If value is positiv, it was displayed as negative
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: After waking up displaying device (phone/tablet) from standby, datasources were not refreshed anymore (#99)
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: If shadow color was entered in hex instead of rgb(a) it was not saved correctly (#90)
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Alias values without acknowledge were not updating (#96)
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Border-Fill on element was not showing, if value has changed the sign and should be displayed in the other direction
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Removed javascript warnings for some icons

### 0.0.2-alpha.23 (2023-10-25)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Extended the value calculation 'Calculate Value from W to kW' to: deactivated, Calculate Value from W to kW, Automatic calculation including unit (W, kW)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Some crash-handler if states were deleted
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Font face was not applied if changed
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: When a state inside the "alias" environment was deleted and not removed from the workspace, the adapter could crash unexpectedly

### 0.0.2-alpha.22 (2023-10-20)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Support for boolean states to apply CSS Class, if their value is true/false
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Refresh Button for object browser - if a new state was added through objects, the configuration needed a complete refresh to receive the new state
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Support for own Text inside a datasource element. Useful, if you want to style text depending on the value of the datasource
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Overrides were not correctly loaded when adapter starts

### 0.0.2-alpha.21 (2023-10-17)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Using left over space in configbar, to display wider text/number boxes and more text without using more space
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Static navigation in config bar for easier switching between basic and extended settings of the element
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Better handling of boxes in tab menu. Now we use flex views to grow or shrink boxes. Some boxes a re-aligned to use the available space in a more efficient way.
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: ACE-Editor with syntax highlighting, autocompletion for properties and error notification while using in CSS tab (more user friendly when applying styles). Style of Log output is also formated with syntax highlighting
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Override function for elements with datasources. Its now possible to add overrides to any element which uses a datasource. With this function, you are able to style the element depending on the value of the datasource
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Alignment of elements was not working correctly for text append, text prepend and grouped icons
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: When using animation depencies with dots, it could be the case that an icorrect amount of dots was displayed
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: When using subtraction or addition on a datasource, the displayed value was not updated if one of the subtraction or addition values were changed
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Thresholds were only possible for Integers - now decimal numbers are also possible
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: If values were set to be animated, they stopped being updated after some time
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Some layout fixes

### 0.0.2-alpha.20 (2023-09-22)
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: states in user environment (userdata and javascript) do not need ACK flags anymore
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Darkmode cleanups and some layout improvements
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Changed some CSS styles to be consistent
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Version Checker to check the version on Github and inform the user

### 0.0.2-alpha.19 (2023-09-14)
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Since number animation, it could occur, that decimal places got cut off on initial values
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Save & Exit was not working correctly, if an high amount of data should be saved
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Made previously count up/down Animation for numbers configurable for each datasource element
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Low power mode for animations (can be enabled generaly or via URL parameter on each device)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: If Element is filled depending on value, it is now possible, to use the basic color as fill for the remaining space or none as transparent

### 0.0.2-alpha.18 (2023-09-11)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Count up/down Animation for numbers added. Instead of directly changing numbers, they are animated.

### 0.0.2-alpha.17 (2023-09-07)
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Object browser did not show all states - especially not the ones in Channel or Folders

### 0.0.2-alpha.16 (2023-08-31)
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Adapter crashed sometimes, due to accessing invalid ids
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Possibility to addition values to other values
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Directly display animations and values after startup instead of waiting till first value changes
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Adapter depencies and stability
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: New Translations for new functions

### 0.0.2-alpha.15 (2023-08-10)
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Under some circumstances symbols, texts and images could run out off workspace
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: consumption calculation produced high CPU load on some systems (#43)
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Crash-Handler for animations optimized - if animation is present before value is updated, the adapter could crash
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Better duplication of items
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Actions for Datasources and Icons (on, off, toggle) - State can be display in Datasource as well
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Consumption calculation - Added states if battery charge/discharge and public grid-feed/grid-consumption are not the same
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Backup moved from states to ioBroker folder instead (saving Redis power and states loading)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Loading information for object browser (if not loaded already)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Darkmode for Layout

### 0.0.2-alpha.14 (2023-08-04)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Support for SVG elements. SVG will be an area inside the workspace and allows to paste pure SVG data (#31)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Support for own images. The user is responsible how to upload the image to ioBroker, as the adapter has no upload possibility
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Support to arrange pictures and elements in levels. They can now be moved to fore- or background
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Consumption calculation - Currently, only single-mode (positive and negative) states are supported. Different states for battery charge/discharge and public grid-feed/grid-consumption will be added in next version
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Some error handling improved

### 0.0.2-alpha.13 (2023-07-26)
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Icon-Proxy was not showing icons under some circumstances
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Reverse steps for alignment was in the wrong order (#37)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Build-in Object Browser for faster loading and saving bandwith (get rid of the default one)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Autocomplete for Datasources Boxes - Datasource will be fetched during typing
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Language for some boxes were missing
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Disable all other Datasources in list while editing to prevent layout mix
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: New states for 'battery_remaining_target', which shows the target time in Unixtime and 'battery_remaining_target_DT', which shows the time in human readable format

### 0.0.2-alpha.12 (2023-07-18)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Improved Icon - Proxy, to serve icons for all symbols (if enabled)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Language translations for live-view variables

### 0.0.2-alpha.11 (2023-07-17)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Configuration Bar can be swapped from right to left (better handling, if elements are behind bar)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Icon-Proxy-Server (if some of your devices inside the network do not have an internet connection, Energiefluss-erweitert will serve those icons and cache them as well)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Better Help-Center when hitting the question mark icon
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Language translation into: english, german, espanol, french, italian, netherlands, polish language, portuguese, russian, ukrainian, chinese
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Previous outline fill extended for filling reverse

### 0.0.2-alpha.10 (2023-07-10)
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Basic icon color was not applied correctly
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Fill placeholders for elements were created in error in some circumstances
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Subtract was not calculated correctly, if state value is negative
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Better handling of positioning elements when entering coordinates
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Icons sometimes got a faulty format if duplicated
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Circles and Rectangles can now have a fill border depending on the value
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Configuration backup for the last 10 versions

### 0.0.2-alpha.9 (2023-07-04)
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: CSS classes were causing color errors while being applied in config mode
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Do not Load CSS class when adapter is starting - only when values change
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Threshold was not calculated correctly, if element was substracted by other values
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: ID list in configbar was loosing event for choosing next element in drop-down
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Subtract values from other values
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Start coordinates can be specified in basic settings to better position new elements 
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Threshold for rectangle and circle
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: duplication of one or more element(s)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Fill element according to value can now have different directions (bottom to top, top to bottom, right to left, left to right)

### 0.0.2-alpha.8 (2023-06-26)
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Remaining Battery Calculation was not working if source has an ID 0 assigned
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Animation timing improved. Better time-handling (#20)
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Line could not be clicked/choosen (#19)
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Threshold was not working correctly
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: All elements can have CSS classes for their current state values. Active positive, Active negative, Inactive positive and Inactive negative
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Battery Remaining Time explanation improved
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Animation can run into opposite direction, if value has changed to positive/negative (#15, #18)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Datasource text elements can now have a text before and after their value

### 0.0.2-alpha.7 (2023-05-25)
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Some Icons were not moveable
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Initial configuration was broken
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Existing Line can be modified as well

### 0.0.2-alpha.6 (2023-05-24)
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Line could not be restored in some circumstances
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Line was not editable anymore after modifying start and end

### 0.0.2-alpha.5 (2023-05-24)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Calculation of battery runtime (charge & discharge) can be calculated and implemented via source
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Basic settings extended to colors of elements
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: alignment of text is possible (right, middle, left)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: last change timestamp extended to more formats
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Line can be modified (new start and/or end position). Useful, if many settings applied and line needs to be moved

### 0.0.2-alpha.4 (2023-05-17)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: String Datasource can now be displayed

### 0.0.2-alpha.3 (2023-05-17)
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Animations not running after adding each of them
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Elements can be chosen inside side-panel (useful, if element is not clickable anymore)

### 0.0.2-alpha.2 (2023-05-15)
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Source missing after saving - fill of element not possible (fix #11)
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: Offset was not working
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: admin menu - link recolored
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: admin menu - access key table
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: question-mark icon for config-wheel
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: New animation-depencies added in advanced menu of animation. Choose dots or duration, to display power-amount on the line
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: last change timestamp of the datasource can be displayed as option: relative to now, timestamp US or timestamp DE
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: all elements can be moved with arrow keys for smoother alignment. Click icon and press arrow-key on keyboard to move it
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: noscroll is added to the workspace, while moving elements. This prevents the page being scrolled up or down
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: elements can be selected with the "lasso-function" - select more than one element with cursor
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: "lasso-catched" elements can be moved with mouse or keyboard (arrow keys)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Settings-menu has now basic settings for the elements. All values can be set as default values
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: displayed values can be reduced by other values (selectable)

### 0.0.2-alpha.1 (2023-04-28)
- ![](https://placehold.co/15x15/A1D343/A1D343.png) FIX: removed local Test file, which does not belong to the project
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Settings Wheel can be disabled in Live-View
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Last selected Datasource can be "cached", for easier treeview (can be enabled/disabled in settings)
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: Alignment functions do now have an undo function for all steps
- ![](https://placehold.co/15x15/00B5DD/00B5DD.png) Added: socket connection is monitored, shows a waiting screen, if instance is not started or restarted

### 0.0.2-alpha.0 (2023-04-28)
* (SKB) initial release

## License
MIT License

Copyright (c) 2024 SKB <info@skb-web.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
