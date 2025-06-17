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

* :book: [Forum thread](https://forum.iobroker.net/topic/64734/test-adapter-energiefluss-erweitert-v0-0-x-github-latest)
* :gb: [English description](./docs/en/README.md)
* :de: [Deutsche Beschreibung](./docs/de/README.md)
* :eyeglasses: [Views Showcase](https://forum.iobroker.net/topic/74890/energiefluss-erweitert-ansichten/)
* :grey_question: [Wiki](https://www.kreyenborg.koeln/wissensdatenbank/Kategorie/iobroker-energiefluss-erweitert/)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.7.7 (2025-06-12)
- FIX: Issues found by ioBroker-Adapter-Checker (348)
- Added: When adding a new datasource, the associated name of this datasource is set as recommended alias

### 0.7.6 (2025-06-05)
- FIX: Removed instances from welcome screen, as this is confusing, if not using iobroker.pro

### 0.7.5 (2025-06-04)
- FIX: Override for bordercolor and borderfillcolor were not correctly applied on rect or circle
- FIX: If user-defined iframe was too small, animation was not applied
- FIX: Timer corrected for using "Line animation during startup" or "Show line between elements only"
- Added: Reworked function, to better detect overrides for > (greater than) or < (smaller than) with negative values
- Added: "default" option for override can now contain javascript function code and additional states to be fetched
- Added: "Fill outline" and "Fill element" according to value now support value overrides
- Added: Version check removed, as this is confusing, if user uses the default repository and Github has a new BETA version
- Added: New line-end for filling outline according to value added. Can now be round, square and butt
- Added: Few language corrections

### 0.7.4 (2025-04-30)
- FIX: Switching on/off on some designs did not work correctly
- FIX: Calculation from W to kW was overwriting user defined unit
- Added: New link to Wiki - now hosting on own server with translatable option
- Added: Function to draw lines now supports better alignment, if source and destination element are on the same x/y-axis

### 0.7.3 (2025-04-28)
- FIX: Only the first icon could be changed. After that, no icons were shown in the list
- FIX: On first load, datasources are not inserted in alphabetical order
- FIX: If a copied element belongs to a group, the group was not removed from that element
- FIX: Element positions (fore- and background) were not saved/displayed properly
- FIX: If an element should open a frame/site, an error was shown that no datasource is assigned
- Added: ACE SearchBox for Styles tab, output log and overrides (Strg + F)

### 0.7.2 (2025-04-25)
- FIX: Object browser was not opening, if objects do not have proper language details
- FIX: Datasources table actions column was misaligned
- Added: Dependencies updated (Admin: >=7.4.10 is now required) (#344)
- Added: Browser-Frame can now be an ioBroker state. This can be text, html, numbers or even a jsonTable, which will be displayed inside an overlay (new window or same window don't work for this)
- Added: Some language corrections

### 0.7.1 (2025-04-22)
- FIX: If datasource element was modified, the current status was not fetched correctely
- FIX: Overrides for elements were not applied correctly (#340)
- FIX: Filter in selection gallery was not working
- FIX: After tour has been visited, "End" didnt take the user to the overview
- Added: If you use the internal Icon-Proxy, icons are now cached inside the browser for faster loading and flicker prevention, if you use them in overrides
- Added: While sorting in Datasources table was set to descending, the new added datasource was sorted in wrongly
- Added: Improved loading and filter time of the ioBroker object browser
- Added: Object browser now supports smoother filtering including complete states (e.g. 0_userdata.0.example_state). Further it shows the current value of the state (mobile after touching the state)
- Added: Some code optimizations under the hood for smoother runtime
- Added: Better information, why an element could not be deleted (e.g. existing connection)
- Added: Few language corrections

### 0.7.0 (2025-04-09)
- FIX: If a line reconnection is aborted, the initial selected line was unselected
- FIX: Rotation for texts was not rotating around the own center
- FIX: Help text for connecting lines was missing
- FIX: Rightclick on a line, deletion was working, but element showed as inactive
- FIX: When moving multiple elements, it may happen that if one element would leave the workspace and is stopped, the other element still moves on
- FIX: Workspace could not be re-sized under some circumstances
- FIX: Leaving workspace open, sometimes results in adding the same datasources again and again
- FIX: If the used WebView on devices is too old, the live-view could not be displayed (#292, #324)
- FIX: Overwrites with javascript functions could be falsy detected as datapoint {my.0.datapoint}
- FIX: Gallery did not show the last uploaded image directly, if uploading several images at once
- Added: Dependencies updated (Web-Adapter: 6.1.10 and Admin: 6.0.0 are now required) (#332)
- Added: Inside the images select dialog uploads are possible
- Added: Pictures can now be rotated
- Added: If a value is set to be animated while changing the value, a visual effect is added to indicate the change
- Added: Undo und Redo functions are now globally availabe
- Added: If elements of the same type are selected, the user is able to perform modifications on them in one step (stack actions)
- Added: Strg/Meta (Mac) + A now selects all elements except lines
- Added: Copied elements can now be inserted at the current pointer position
- Added: Holding down the Shift key enables 2 modes: 1. moving elements with the keyboard, 10 steps per key press are possible | 2. moving elements with the mouse, the element snaps in the next grid
- Added: The live view and workspace now have toast messages on the top right corner to inform the user. For better usage, the user is also informed with tips which can be deactivated
- Added: Datasources will not be deleted directly - they will be marked for deletion and will be deleted once the workspace is saved. Before, the user is able to restore them
- Added: A workspace tour shows the user how to use the basic functions
- Added: Password protection for workspace. Password can be set inside the adapter-settings!
- Added: An URL parameter "lang=en" can now be attached to the URL, to display the live view and configuration workspace in the defined language
- Added: New element: switch is now available
- Added: UI optimizations

### 0.6.2 (2024-12-19)
- FIX: Further fix for properties of elements, if their value is empty or zero - elements could not be handled anymore
- FIX: While using installed browser application (PWA with https) or shortcuts on mobile devices, always instance 0 was fetched. Now each instance can be linked
- FIX: The title bar of the configuration bar blocked access to the 'Basic' and 'Advanced' tabs (macOS only)
- Added: Improved language detection

### 0.6.1 (2024-12-13)
- Added: Linebreaks for states with numbers are also accepted
- Added: Warning message during configuration, if element overrides can not be processed
- Added: Some more Eslint checks for saver code
- Added: Overrides for elements support now more complex code - even inside a function block and with variables
- FIX: New installed instance could crash, if the datsource is fetched for the first time 
- FIX: Handler for malformatted overrides added, to prevent a crash of the adapter
- FIX: If width or height of elements are empty or smaller than zero, this setting could not be reverted

### 0.6.0 (2024-12-10)
- FIX: Requested override value was not updated inside configuration, if state still has the same value
- Added: Dependency Eslint 9.x for ioBroker code-check and performance

### 0.5.1-alpha.11 (2024-11-12)
- FIX: Overrides were not correctly applied (#272)
- FIX: Timestamp of the last change was timestamp of the last update (#279)
- FIX: Font-size could not be changed
- Added: Improved UI
- Added: Information Icon on the live-view, to inform the user about any errors that have occured
- Added: Responsive Design for Adapter-Admin area added to meet new requirements
- Added: last change timestamp to datasource elements. Corresponds to fix (#279)

### 0.5.1-alpha.10 (2024-10-24)
- FIX: Applied fill color of element could not be removed or set to transparent
- FIX: Own Styles could not be modified, if they were empty or not set
- FIX: If width or height of a rect or circle is changed, the corresponding line-connection was not updated correctly
- FIX: Less power mode was not working correctly, if line animation should be reversed
- FIX: Shadow on a line was not saved (#264)
- Added: Line can be hidden, if no animation is active (#263)
- Added: Improved Less power mode. It now uses much less resources 
- Added: Text and Datasource-Elements can be rotated continuously up to 360 degrees
- Added: Option to make the configbar transparent, while changing settings (This is useful to see the changes on mobile devices, where the configbar could hide the element)
- Added: Update properties only if they have changed - ignore ioBroker timestamp updates on states as well
- Added: Smoothly animate filling of of rect or circle
- Added: Option to animate line drawing during loading live-view
- Added: Browser-Frames can now have user defined height and width

### 0.5.1-alpha.9 (2024-09-23)
- FIX: Wording for some boxes updated and general improvements of help functions
- Added: Support for Apple Devices including correct placement of texts and applying shadows to elements
- Added: Error handling for 'Browser Frame' inside iFrame overlay - if the URL can not be loaded in 5 seconds, the overlay will be closed

### 0.5.1-alpha.8 (2024-09-18)
- FIX: Some basic values were not saved properly
- FIX: Skipping version check while in display-mode (reduces loading time and bandwidth)
- Added: New option "Auto detect" for "Show source as". The source and unit (if present and not entered before) will be automatically detected
- Added: UI improvements

### 0.5.1-alpha.7 (2024-09-16)
- Added: Backup routine reworked to improve storage (sending/receiving data reduced)
- Added: Elements, which have addition or subtraction in use, now create states with their values and can be re-used by the user
- Added: Language and explanation improvements, some routines updated
- Added: Optimized contextmenu for touch-devices

### 0.5.1-alpha.6 (2024-08-29)
- Added: Show element coordinates when selecting and while dragging (can be deactivated inside settings)
- Added: Workspace can not be less height and width than the coordinates of the placed elements

### 0.5.1-alpha.5 (2024-08-27)
- FIX: Configbar was not opening when another element was moved before (#232)
- FIX: Adapter was crashing, if a static picture from the gallery has had an associated datasource (#233)
- FIX: Rounded corners inside rect were not correctly set
- FIX: If workspace is completely empty, the first new added element could not be edited
- FIX: Overrides were not correctly applied, if source value was converted to number and should be a string instead
- FIX: Access key inside live-view was not working
- Added: Rightclick contextmenu for quick access to some functions
- Added: Global Undo&Redo functionality for moving, adding, removing and connecting elements (does not affect configuration dialog)

### 0.5.1-alpha.4 (2024-08-07)
- Added: Alignments for elements refactored (Better detection if they run out of the workspace)
- Added: New element "ForeignObject" added. This allows normal HTML content inside the workspace.
- Added: Images can now have a shadow
- Added: Keyboard copy, paste and delete functions added (Strg/cmd + c and Strg/cmd + v, Entf/del)
- Added: Double-Click on element or Connection-Line opens the 'extended'-tab and single click opens 'basic'-tab inside the configbar
- Added: The liveview can now be displayed in fullscreen via doubleclick oder double-tap
- Added: Better handling of images through datasources (image will be hidden, if datasource is empty)
- Added: Connection-Lines can now have frame options for opening URLs
- Added: Object-Browser scrolls the first clicked parent folder to the top 
- FIX: Element with linebreak was not able to be moved after applying linebreak

### 0.5.1-alpha.3 (2024-07-18)
- Added: Rewritten Upload engine (Using Web-POST instead of sockets)
- Added: Behaviour of the lines can be changed in the connection area. This includes the radius length (smaller and bigger) and the start of the curves (earlier and later)
- Added: Several functions are optimized
- FIX: Warn message in Web-Adapter was missleading (removed)
- FIX: Message, that adapter is not configured was handling a different exception (solved)

### 0.5.1-alpha.2 (2024-07-09)
- Added: Support for https via Web-Adapter (own certificates necessary)
- Added: Icon-Proxy is removed from the adapter settings and runs on the extension of the Web-Adapter (If you use it or not - no changes are required)
- Added: 2 new override parameter "pos_x" and "pos_y" are available, to position text and datasource elements depending on their value
- Added: Energiefluss-erweitert is now available through the welcome screen of the Web-Adapter
- Added: Energiefluss-erweitert is now reachable via iobroker.net through the ioBroker-cloud adapter (No pro license required)
- Added: If the Web-Adapter is configured to use valid certificates, the view of Energiefluss-erweitert can be installed as PWA (progressive Web App) on Android and iOS [Explained here](https://www.google.de/search?q=what+is+a+pwa)
- FIX: Sometimes, the object-browser could not load states and crashed

### 0.5.1-alpha.1 (2024-07-04)
- Added: The image gallery has now a filter function which helps you to find the images more easily
- Added: The datasource object-browser has now a filter function which helps you to find the datasource more easily
- FIX: Added some crash-handler, which might throw an error, when the associated state is not found
- FIX: Linebreak was not working correctly (Delimiter was ignored)
- FIX: Under some circumstances a datasource could not be modified
- FIX: Text prepend was not working correctly if source is displayed as text

### 0.5.1-alpha.0 (2024-06-28)
- FIX: The coordinates and size of an added icon could not be changed
- FIX: Cursor as Pointer (hand) did not appear on elements with action
- FIX: NPM dependency for gallery was not fetched properly
- FIX: Newly added Text didnt save text (was empty instead)
- FIX: Under some circumstances an element could not be deleted (Error: Existing connection!)
- Added: Text-Elements can now be used as date and time element
- Added: Icons can now be rotated and flipped (even when using overrides for them)
- Added: New overrides parameter 'icon' available to change icons (Explained in [Wiki](https://github.com/SKB-CGN/ioBroker.energiefluss-erweitert/wiki/Custom-Overrides-for-elements#for-icons))

### 0.5.0-alpha.0 (2024-06-24)
**!!! Please note, this currently an Alpha-Version, because many things are changed and needed to be tested!!!**  
The core of the adapter keeps running on the same 0.4.1 version like before, but the configuration page has many improvements. See the list below! 

Note: save content of the state 'configuration' inside the instance as text on your disk to be able, to restore it in case needed or downgrading to the official version again! 

After downloading the BETA Version, please manually proceed with uploading the adapter (this has to be done, after adapters are installed via Github) 
described here: https://www.iobroker.net/#de/documentation/tutorial/adapter.md?#uploadvonadapterdateien

- Added: Support for Websockets is now integrated. Adapter uses the faster Websockets if available. If not, the connection falls back to socket polling 
- Added: Better Darkmode Support (including Log, Overrides and CSS Styles layout)
- Added: New option "Manual value change" for click options of datasources. With this you can directly modify the associated state inside ioBroker. Also predefined value(s) for quick accesses are possible.
- Added: Automatic line-break after x characters for datasources, which provide longer text (e.g. weather forecasts)
- Added: Define one Datasource as display and choose an other one to control (e.g. display the energy of a wallsocket, but switch it on or off with a different state via click-option)
- Added: Language and dependencies are updated
- Added: Better support for iOS devices as the values are not calculated via the objects itself anymore (should work for thickness and alignments)
- Added: Autocomplete when adding or modifying sources inside datasources (if active)
- Added: Import and Exports elements (e.g. for sharing a nice designed element with others)
- Added: Preview elements (circle and rect) with their fill or outline layout
- Added: Image gallery and query via web implementation of ioBroker
- Added: Select datasources which contain image paths for images (e.g. WeatherAdapter)
- Added: Improved workspace (better adding of elements, when scrolled, many design and element improvements etc.)
- FIX: Some bugs or routines where not working as they should
- FIX: Battery-Discharge was wrongly calculated, if the DoD should discharge till 0%
- FIX: Removed kW settings in calculation tab as they are already set as factor inside the datasource area

### 0.4.1 (2024-04-18)
- Hotfix: After uprading the Adapter, it could happen, that the first datasource was not updated properly

### 0.4.0 (2024-04-15)
- Added: The adapter provides 3 new states. charging_grid (battery charged via grid), charging_solar (battery charged via solar) and production (overall production) (#173, #152, #148)
- Added: Datasources for the battery calculation now need to be provided via the datasources tab and selected in the calculation tab (**!!! Important: !!! This is a major change**)
- Added: A Milliseconds Timestamp for Values can be selected (This can be used for custom overrides, to display what ever the user likes)
- Added: Object browser now provides the names of channels and devices and is more responsive
- Added: Better support inside configuration area for smaller devices like mobilephones and tablets
- Added: A new override property (img_url) has been added, to change pictures addresses for picture elements
- Added: Overrides can now contain states from iobroker, to directly read and for example calculate a value with an additional state. Please provide the name in curly braces.
- FIX: Wrong alignment of rectangle with border-fill if height and width are different (#172)
- FIX: The adapter could crash if the data source inside calculation was missing or deleted (#178)

### 0.3.0 (2024-03-12)
- Added: Up to 50% faster performance on saving data to the "data" datapoint due to removing unnecessary stuff
- Added: Support for light and dark theme manual selection with URL parameter "theme=dark" or "theme=light" for overwriting the system darkmode (if applicable)
- Added: Code optimization during start-up and releasing memory cause of not using start-up stuff during runtime anymore
- Added: When duplicating an element, the override properties are also duplicated
- Added: Elements can now be selected while holding ctrl key 
- Added: New override features for all elements added. The override features are explained inside the Wiki of the adapter (#153)
- FIX: Datasource could not be deleted (#145)
- FIX: If there is more power on a line than configured, the maximum amount of dots was ignored (#160)
- FIX: If image URL from datapoint is empty or NULL - remove the displayed image (useful for weather datapoints)
- FIX: If icon or svg was duplicated, the defined color was not adopted

### 0.2.2 (2024-02-15)
- Added: if using datasource as an image URL, in some cases the picture url is empty (for forecasts e.g.) - Chrome displayed a broken image
- Added: current active element receives a dashed border. This helps, to identify a picture element with empty url (if served via datasource)
- Added: Changed the previous added "unit" column for watts and kilowatts inside datasources into "factor" with a description
- Added: A new button inside datsources is able to check which datasources are in use
- Added: New translations and some code optimizations
- FIX: Broken SVG corrected

### 0.2.1 (2024-01-25)
- Added: Support for datasources as image URL's (explanation is given via question mark)
- Added: Background for workspace can now be set in basic settings (CSS still works as well)
- FIX: SVG element was not correctly saved after saving the workspace

### 0.2.0 (2024-01-11)
- Added: Control for not deleting sources, if they are in use as source, addition or subtraction (elements which use this one, will be displayed with additional information)
- Added: IDs for datasources will be displayed inside configuration bar, to better find the ID the element for reason mentioned before
- Added: Control for not adding duplicate datasources from ioBroker as this will lead into crashes cause of duplicate keys
- Added: Form on datasources configuration page will be deactivated during the time a datasource is edited
- Added: A unit for the datasource is selectable - this makes it easier to use those values for addition&subtraction without using Auxiliary data points
- Added: New translations, design modifcations and various code optimizations
- FIX: Crash Handler for missing datasources extended (if datasource from ioBroker was deleted and used as source, addition or subtraction in any element)

### 0.1.0 (2023-11-15)
- FIX: Alignment of texts and group movement was not possible, after changing to new multiline texts
- FIX: Saved default fill and outline colors were not applied if adding new text or datasource to workspace
- Added: Extended the auto calculation to W, kW, MW and GW

### 0.0.2-alpha.24 (2023-11-14)
- Added: Lacy loading for Object-Browser. The Object-Browser will not be loaded on configuration start. It will load necessary objects on request, to not block UI anymore
- Added: Support for line-breaks inside Text or Datasource elements. Line break can be done via <br> or \n. (#10)
- Added: Overrides can now handle 'text', 'unit', 'append' and 'prepend' values to be replaced
- Added: Check for Datasources - inside Datasources is a button, which is able to check you sources
- Added: Faster loading due to code optimizations
- FIX: Convert Value to positiv was not working. If value is positiv, it was displayed as negative
- FIX: After waking up displaying device (phone/tablet) from standby, datasources were not refreshed anymore (#99)
- FIX: If shadow color was entered in hex instead of rgb(a) it was not saved correctly (#90)
- FIX: Alias values without acknowledge were not updating (#96)
- FIX: Border-Fill on element was not showing, if value has changed the sign and should be displayed in the other direction
- FIX: Removed javascript warnings for some icons

### 0.0.2-alpha.23 (2023-10-25)
- Added: Extended the value calculation 'Calculate Value from W to kW' to: deactivated, Calculate Value from W to kW, Automatic calculation including unit (W, kW)
- Added: Some crash-handler if states were deleted
- FIX: Font face was not applied if changed
- FIX: When a state inside the "alias" environment was deleted and not removed from the workspace, the adapter could crash unexpectedly

### 0.0.2-alpha.22 (2023-10-20)
- Added: Support for boolean states to apply CSS Class, if their value is true/false
- Added: Refresh Button for object browser - if a new state was added through objects, the configuration needed a complete refresh to receive the new state
- Added: Support for own Text inside a datasource element. Useful, if you want to style text depending on the value of the datasource
- FIX: Overrides were not correctly loaded when adapter starts

### 0.0.2-alpha.21 (2023-10-17)
- Added: Using left over space in configbar, to display wider text/number boxes and more text without using more space
- Added: Static navigation in config bar for easier switching between basic and extended settings of the element
- Added: Better handling of boxes in tab menu. Now we use flex views to grow or shrink boxes. Some boxes a re-aligned to use the available space in a more efficient way.
- Added: ACE-Editor with syntax highlighting, autocompletion for properties and error notification while using in CSS tab (more user friendly when applying styles). Style of Log output is also formated with syntax highlighting
- Added: Override function for elements with datasources. Its now possible to add overrides to any element which uses a datasource. With this function, you are able to style the element depending on the value of the datasource
- FIX: Alignment of elements was not working correctly for text append, text prepend and grouped icons
- FIX: When using animation depencies with dots, it could be the case that an icorrect amount of dots was displayed
- FIX: When using subtraction or addition on a datasource, the displayed value was not updated if one of the subtraction or addition values were changed
- FIX: Thresholds were only possible for Integers - now decimal numbers are also possible
- FIX: If values were set to be animated, they stopped being updated after some time
- FIX: Some layout fixes

### 0.0.2-alpha.20 (2023-09-22)
- FIX: states in user environment (userdata and javascript) do not need ACK flags anymore
- FIX: Darkmode cleanups and some layout improvements
- FIX: Changed some CSS styles to be consistent
- Added: Version Checker to check the version on Github and inform the user

### 0.0.2-alpha.19 (2023-09-14)
- FIX: Since number animation, it could occur, that decimal places got cut off on initial values
- FIX: Save & Exit was not working correctly, if an high amount of data should be saved
- Added: Made previously count up/down Animation for numbers configurable for each datasource element
- Added: Low power mode for animations (can be enabled generaly or via URL parameter on each device)
- Added: If Element is filled depending on value, it is now possible, to use the basic color as fill for the remaining space or none as transparent

### 0.0.2-alpha.18 (2023-09-11)
- Added: Count up/down Animation for numbers added. Instead of directly changing numbers, they are animated.

### 0.0.2-alpha.17 (2023-09-07)
- FIX: Object browser did not show all states - especially not the ones in Channel or Folders

### 0.0.2-alpha.16 (2023-08-31)
- FIX: Adapter crashed sometimes, due to accessing invalid ids
- Added: Possibility to addition values to other values
- Added: Directly display animations and values after startup instead of waiting till first value changes
- Added: Adapter depencies and stability
- Added: New Translations for new functions

### 0.0.2-alpha.15 (2023-08-10)
- FIX: Under some circumstances symbols, texts and images could run out off workspace
- FIX: consumption calculation produced high CPU load on some systems (#43)
- FIX: Crash-Handler for animations optimized - if animation is present before value is updated, the adapter could crash
- Added: Better duplication of items
- Added: Actions for Datasources and Icons (on, off, toggle) - State can be display in Datasource as well
- Added: Consumption calculation - Added states if battery charge/discharge and public grid-feed/grid-consumption are not the same
- Added: Backup moved from states to ioBroker folder instead (saving Redis power and states loading)
- Added: Loading information for object browser (if not loaded already)
- Added: Darkmode for Layout

### 0.0.2-alpha.14 (2023-08-04)
- Added: Support for SVG elements. SVG will be an area inside the workspace and allows to paste pure SVG data (#31)
- Added: Support for own images. The user is responsible how to upload the image to ioBroker, as the adapter has no upload possibility
- Added: Support to arrange pictures and elements in levels. They can now be moved to fore- or background
- Added: Consumption calculation - Currently, only single-mode (positive and negative) states are supported. Different states for battery charge/discharge and public grid-feed/grid-consumption will be added in next version
- Added: Some error handling improved

### 0.0.2-alpha.13 (2023-07-26)
- FIX: Icon-Proxy was not showing icons under some circumstances
- FIX: Reverse steps for alignment was in the wrong order (#37)
- Added: Build-in Object Browser for faster loading and saving bandwith (get rid of the default one)
- Added: Autocomplete for Datasources Boxes - Datasource will be fetched during typing
- Added: Language for some boxes were missing
- Added: Disable all other Datasources in list while editing to prevent layout mix
- Added: New states for 'battery_remaining_target', which shows the target time in Unixtime and 'battery_remaining_target_DT', which shows the time in human readable format

### 0.0.2-alpha.12 (2023-07-18)
- Added: Improved Icon - Proxy, to serve icons for all symbols (if enabled)
- Added: Language translations for live-view variables

### 0.0.2-alpha.11 (2023-07-17)
- Added: Configuration Bar can be swapped from right to left (better handling, if elements are behind bar)
- Added: Icon-Proxy-Server (if some of your devices inside the network do not have an internet connection, Energiefluss-erweitert will serve those icons and cache them as well)
- Added: Better Help-Center when hitting the question mark icon
- Added: Language translation into: english, german, espanol, french, italian, netherlands, polish language, portuguese, russian, ukrainian, chinese
- Added: Previous outline fill extended for filling reverse

### 0.0.2-alpha.10 (2023-07-10)
- FIX: Basic icon color was not applied correctly
- FIX: Fill placeholders for elements were created in error in some circumstances
- FIX: Subtract was not calculated correctly, if state value is negative
- FIX: Better handling of positioning elements when entering coordinates
- FIX: Icons sometimes got a faulty format if duplicated
- Added: Circles and Rectangles can now have a fill border depending on the value
- Added: Configuration backup for the last 10 versions

### 0.0.2-alpha.9 (2023-07-04)
- FIX: CSS classes were causing color errors while being applied in config mode
- FIX: Do not Load CSS class when adapter is starting - only when values change
- FIX: Threshold was not calculated correctly, if element was substracted by other values
- FIX: ID list in configbar was loosing event for choosing next element in drop-down
- Added: Subtract values from other values
- Added: Start coordinates can be specified in basic settings to better position new elements 
- Added: Threshold for rectangle and circle
- Added: duplication of one or more element(s)
- Added: Fill element according to value can now have different directions (bottom to top, top to bottom, right to left, left to right)

### 0.0.2-alpha.8 (2023-06-26)
- FIX: Remaining Battery Calculation was not working if source has an ID 0 assigned
- FIX: Animation timing improved. Better time-handling (#20)
- FIX: Line could not be clicked/choosen (#19)
- FIX: Threshold was not working correctly
- Added: All elements can have CSS classes for their current state values. Active positive, Active negative, Inactive positive and Inactive negative
- Added: Battery Remaining Time explanation improved
- Added: Animation can run into opposite direction, if value has changed to positive/negative (#15, #18)
- Added: Datasource text elements can now have a text before and after their value

### 0.0.2-alpha.7 (2023-05-25)
- FIX: Some Icons were not moveable
- FIX: Initial configuration was broken
- Added: Existing Line can be modified as well

### 0.0.2-alpha.6 (2023-05-24)
- FIX: Line could not be restored in some circumstances
- FIX: Line was not editable anymore after modifying start and end

### 0.0.2-alpha.5 (2023-05-24)
- Added: Calculation of battery runtime (charge & discharge) can be calculated and implemented via source
- Added: Basic settings extended to colors of elements
- Added: alignment of text is possible (right, middle, left)
- Added: last change timestamp extended to more formats
- Added: Line can be modified (new start and/or end position). Useful, if many settings applied and line needs to be moved

### 0.0.2-alpha.4 (2023-05-17)
- Added: String Datasource can now be displayed

### 0.0.2-alpha.3 (2023-05-17)
- FIX: Animations not running after adding each of them
- Added: Elements can be chosen inside side-panel (useful, if element is not clickable anymore)

### 0.0.2-alpha.2 (2023-05-15)
- FIX: Source missing after saving - fill of element not possible (fix #11)
- FIX: Offset was not working
- Added: admin menu - link recolored
- Added: admin menu - access key table
- Added: question-mark icon for config-wheel
- Added: New animation-depencies added in advanced menu of animation. Choose dots or duration, to display power-amount on the line
- Added: last change timestamp of the datasource can be displayed as option: relative to now, timestamp US or timestamp DE
- Added: all elements can be moved with arrow keys for smoother alignment. Click icon and press arrow-key on keyboard to move it
- Added: noscroll is added to the workspace, while moving elements. This prevents the page being scrolled up or down
- Added: elements can be selected with the "lasso-function" - select more than one element with cursor
- Added: "lasso-catched" elements can be moved with mouse or keyboard (arrow keys)
- Added: Settings-menu has now basic settings for the elements. All values can be set as default values
- Added: displayed values can be reduced by other values (selectable)

### 0.0.2-alpha.1 (2023-04-28)
- FIX: removed local Test file, which does not belong to the project
- Added: Settings Wheel can be disabled in Live-View
- Added: Last selected Datasource can be "cached", for easier treeview (can be enabled/disabled in settings)
- Added: Alignment functions do now have an undo function for all steps
- Added: socket connection is monitored, shows a waiting screen, if instance is not started or restarted

### 0.0.2-alpha.0 (2023-04-28)
* (SKB) initial release

## License
MIT License

Copyright (c) 2025 SKB <info@skb-web.de>

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
