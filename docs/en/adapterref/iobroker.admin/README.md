---
BADGE-Number of Installations: http://iobroker.live/badges/admin-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.admin.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.admin.svg
---
# Admin

The admin adapter is used to configure the whole ioBroker-Installation and all its adapters. 
It provides a web-interface, which can be opened by "http://<IP-Address of the server>:8081" 
in the web browser. This adapter is automatically installed together with ioBroker.

## Configuration
The configuration dialog of the adapter "admin" provides the following settings: 

![img_002](img/admin_img_002.jpg)

**IP:** the IP-address of the "admin" web-server can be chosen here. 
Different IPv4 and IPv6 addresses can be selected. The default value is 0.0.0.0. 
If you think, that 0.0.0.0 is invalid setting, please let it stay there, because it 
is absolutely valid. If you change the address, you will be able to reach the web-server 
only through this address. **Port:** You can specify the port of the "admin" web-server. 
If there are more web servers on the PC or device the port must be customized to avoid problems 
of a double port allocation. **Coding:** enable this option if secure https protocol should be used. 

**Authentication:** If you want the authentication with login/password you should enable this check-box. 
Default password for user "admin" is "iobroker" **Buffer:** to speed up the load of the pages enable this option. 
Normally only the developer wants to have this option unchecked.

## Handling
The main page of the admin consist of several tabs. **Adapter:** Here the instances of 
a adapters can be installed or deleted. With the update button 

![img_005](img/admin_img_005.jpg)

on the top left we can get if the new versions of adapters are available. 

![img_001](img/admin_img_001.jpg)

The available and installed versions of the adapter is shown. For overall view the state of the 
adapter is coloured (red=in planning; orange=alpha; yellow=beta). The updates to a newer version of 
the adapter are made here also. If there is a newer version the lettering of the tab will be green. 
If the question mark icon in the last column is active you can get from there to web site with information of the adapter. 
The available adapter are sorted in alphabetical order. Already installed instance are in the upper part of the list. 

**Instance:** The already installed instance are listed here and can be accordingly configured. If the title of the 
instance are underlined you can click on it and the corresponding web site will be opened. 

![img_003](img/admin_img_003.jpg)

**Objects:** the managed objects (for example setup / variables / programs of the connected hardware) 

![img_004](img/admin_img_004.jpg)

**States:** the current states (values of the objects)   
If the adapter history is installed, you can log chosen data points. 
The logged data points are selected on the right and appear with a green logo. 

**Scripts:** this tab is only active if the "javascript" adapter is installed.

**Node-red:** this tab is only visible if the "node-red" adapter installed and enabled.

**Hosts:** the computer which ioBroker is installed on. Here the latest version of js-controller can be installed on. 
If there is a new version the letters of the tab are green. To search for a new version you have to click on the update 
icon on the bottom left corner. 

**Enumeration:** here the favourites, trades and spaces from the CCU are listed. 

**Users:** here the users can be added. To do this click on the (+). By default there is an admin. 

**Groups:** if you click on the (+) on the bottom left you can create user groups. From the pull-down menu the users get assigned to the groups. 

**Event:** A list of the running updates of the conditions. 

**Hosts:**
Information about the computer on which ioBroker is installed. The current version of the js controller can be updated here. If a new version is available, the label of the tab appears in green.

**Log:** here the log is displayed In the tab instance the the logged log level 
of the single instance can be set. In the selection Menu the the displayed minimum log level is selected. If an error occurs the 
lettering of the log appears in red.

**System settings:**
Settings such as language, time and date format and other system-wide settings are made in the menu that opens here.

![img_006](img/admin_img_006.jpg)

The repositories and security settings can also be set here.

## Changelog
<!--
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (@GermanBluefox) Layout fix in edit object dialog

### 7.7.20 (2025-11-15)
- (@GermanBluefox) Small optimizations
- (@GermanBluefox) Allowed to upload objects via text

### 7.7.19 (2025-10-26)
- (@GermanBluefox) Updated schema location for JsonConfig

### 7.7.18 (2025-10-25)
- (@GermanBluefox) Improvement of categories: drag&drop, visibility
- (@copilot) Added missing filterFunc property to jsonConfig objectId schema to match documentation and implementation
- (@copilot, @SimonFischer04) Added extended reverse proxy example section with screenshots, limitations (admin root requirement), and adapter compatibility notes
- (@copilot, @SimonFischer04) Fixed instances page reverse proxy link mapping so adapter localLinks are rewritten to the configured proxy paths (prefix matching + web port replacement, with duplicate link collapse)
- (@copilot, @SimonFischer04) Fixed intro page reverse proxy link remapping so links are correctly rewritten immediately and after navigating away and back (load reverseProxy config before instance scan and use prefix startsWith matching)
- (@GermanBluefox) Fixed multi-selection in the select ID dialog

### 7.7.3 (2025-09-25)
- Many GUI changes: See previous changelog below for details

### 7.7.2 (2025-09-24)
- (@copilot) Fixed JSONCONFIG table validator bug where validation errors persisted after deleting table rows
- (@GermanBluefox) Made small fix for JsonConfig component `state`
- (@copilot) Fixed repository refresh issue: repositories are now automatically refreshed when switching repository source (stable/latest) without requiring manual "Check for updates"
- (@copilot) Added CSV file editing support in file browser - CSV files can now be edited directly in the file manager
- (@copilot) Implemented sortable columns for instances table (name, status, memory, ID, host, loglevel)
- (@copilot) Fixed adapter license icon linking to use commercial license URL instead of GitHub license
- (@copilot) Fixed license icon spacing in list view to maintain consistent layout
- (@GermanBluefox) Allows entering minus values with JsonConfig number component
- (@copilot) Fixed textIP checkbox inconsistency between Objects and States tabs for the same host configuration
- (@GermanBluefox) Added icon to `www` folder for windows
- (@copilot) Confirmed and documented Copilot issue handling guidelines: PRs use neutral language (no "fixes" keywords), issues closed manually by maintainers, and "fixed" labels added when appropriate
- (@copilot) Enhanced Copilot instructions to make issue management policy more prominent - no auto-closing issues, manual validation required
- (@copilot) Enhanced repository timestamp display to show both generated and read timestamps - shows when repository data was generated and when it was last read by admin backend
- (@copilot) Fixed jsonConfig port validation to properly account for bind addresses, allowing the same port on different IP addresses
- (@copilot) Added error indicators to JSON Config tabs and accordions to improve the visibility of validation errors
- (@copilot) Added export/import functionality for accordion sections in JsonConfig allowing users to save accordion data as JSON files and import them back with replace or add options
- (@copilot) Fixed time difference warning that incorrectly appeared when the browser tab was inactive for a while
- (@copilot) For GitHub-installed adapters, show version + commit hash instead of just version
- (@copilot) Fixed table export error when table items contain null values
- (@copilot) Object Browser: Added formatted duration display for values with role "value.duration" - shows time durations in HH:mm:ss format instead of raw seconds
- (@copilot) Enhanced GitHub Actions to skip tests when only README.md is changed, speeding up CI for Copilot PRs (tested with mixed file changes)
- (@GermanBluefox) Added the docker checker in JSON config
- (@copilot) Fixed js-controller update notifications to use "The js-controller" instead of "Adapter js-controller"
- (@copilot) Fixed JSONConfig sendTo jsonData attribute parser problem where backslashes (\) in text inputs caused JSON parsing errors
- (@copilot) Fixed step type behavior in chart display - "Schritte" now shows value until next point (step after) instead of step before
- (@copilot) Added all three-step type options (stepStart, stepMiddle, stepEnd) to chart display with clearer descriptions
- (@copilot) Fixed React error #62 in the Files tab caused by malformed CSS calc() function
- (@copilot) Added loading indicator to JSONConfig autocompleteSendTo component during sendTo operations
- (@copilot) Mark adapters removed from repository with "not maintained" text instead of empty version field
- (@copilot) Enhanced responsive design: modals and popups now use full screen on xs and sm breakpoints
- (@copilot) Added logout dropdown menu to user icon for improved user experience
- (@copilot) Updated OAuth2 documentation in DEVELOPER.md to include both cloud-based and direct callback approaches with clear guidance on when to use each method
- (@copilot) Only show adapters with satisfied dependencies in update all dialog
- (@copilot) Added new `readOnly` attribute for jsonEditor in jsonConfig - allows opening the editor to view JSON content without allowing modifications
- (@GermanBluefox) Reading of same instances was optimized in GUI
- (@GermanBluefox) Do not show the http page if admin is secured
- (@GermanBluefox) Show loading progress for custom tabs
- (@GermanBluefox) Fixing change of the language in the admin

## License

The MIT License (MIT)

Copyright (c) 2014-2025 bluefox <dogafox@gmail.com>