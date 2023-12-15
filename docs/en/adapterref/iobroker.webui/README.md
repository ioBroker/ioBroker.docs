# ioBroker.webui

![Number of Installations](https://iobroker.live/badges/webui-installed.svg) 
![Stable version](https://iobroker.live/badges/webui-stable.svg) 
[![NPM version](https://img.shields.io/npm/v/iobroker.webui.svg)](https://www.npmjs.com/package/iobroker.webui)
[![Downloads](https://img.shields.io/npm/dm/iobroker.webui.svg)](https://www.npmjs.com/package/iobroker.webui)

[![NPM](https://nodei.co/npm/iobroker.webui.png?downloads=true)](https://nodei.co/npm/iobroker.webui/)

webui for ioBroker

![image](https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.webui/master/screenshot.png)

## Tutorial Videos (atm. in german only)

https://www.youtube.com/@jogibear9988

## Description

This is a complete visualization system for ioBroker.

It includes features like:

  - own simple scripting language
  - binding to ioBroker objects including converters & javascript expressions
  - paste of images from clipboard
  - drag drop of external images
  - drag drop of ioBroker objects to automaticy create bindings
  - drag drop of ioBroker objects to Properties to create Bindings to them
  - relative signal paths to ioBroker objects in screens (the full path can be hand over from outside to screen)
  - split view edit of html code
  - global stylesheet support
  - usage of npm packages containing webcomponents
  - screens inside of screens
  - use all icon packages from ioBroker
  - use charts from ioBroker
  - use combined signals object id's  e.g. "webui.0.test3.{webui.0.test3.select}" -> this will use the value from webui.0.test3.select for the signal name

## Installation

### Dependecies

  - You need the Web Adapter installed. It works with the following settings: ![image](https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.webui/master/web.png)
  
## Concepts

### Description

The Designer uses Webcomponents, so the HTML you Design is inside of a Shdowroot of a Webcomponent. This mens, you cannot style <body> or <html> inside of the Stylesheet. To style the outer Layout, use the ":host" selector.
This also means, you cannot use "on..." eventhandlers. Use the "@..." event assignment.

### Custom Controls in WebUI

You can create own reusable CustomControls in WebUI. This can have individual Javascript, Properties and a template.

You can use Double-Bracket Syntax and Double-Curly-Braket Syntax of "BaseCustomWebcomponent" to create bindings from the Template to the properties defined in the Designer. Curylbrackets create two way Bindings.
If you use the Bindings Dialog, you can Bind to a Property with ??Propertyname and to IoBroker Object in the Property via ?Propertyname.
In Scripts you can also write to Signals defined in Custom Properties.

You could also include Javascript in your CustomControl or Screen. Also you could use export a function "init(instance)" wich will be called when your CustomControl will be instanciated. (and also the connected and disconnected functions could be used)

## Sponsoring

If you want to help the development, sponsor this project at https://github.com/sponsors/jogibear9988

## Developing
  * Install Repository as Adapter in IOBroker
  * Download the Repository to an extra "dev" directory, do not develop inside the ioBroker Node_modules directory.
  * Do the following steps inside of the "dev" dirctory.

  * Install dependencies 
```
  $ npm install
```

  * Compile Typescript after doing changes (or press Ctrl + Shift + B in VsCode and select "tsc watch")
```
  $ npm run tsc
```

  * Adjust 'config.js' to match you ip-adress and port for your iobroker
   (The config.js in the repository root will be replaced with the one in '/config' when running 'npm build')
```
    window.iobrokerHost = '192.168.1.2';
    window.iobrokerPort = '8082';
    window.iobrokerSocketScriptUrl = 'http://' + window.iobrokerHost + ':' + window.iobrokerPort + '/lib/js/socket.io.js';
```

  * Run the app in a local server
```
  $ npm start
```

  * Navigate Chrome to [localhost:8000]() to see the app.

### More about Development

  - Run 
```
  $ npm run reflection
``` 
   to recreate reflection files for Scripting wich are used for the property grid

  - Run 
```
  $ npm run build
``` 
   to copy compiled files and node_modules to www folder so adapter is installable via github

  - Run 
```
  $ npm run release
  $ npm publish
``` 
   to create correct release commit for iobroker, Be carefull this also pushes to git repo.
   Be sure to edit "CHANGELOG.md" before, the text in "## **WORK IN PROGRESS**" in README.Md will be used for version info

## Info about the Adapter.

The Adapter is based on the following Designer component:
https://github.com/node-projects/web-component-designer

You need to create a screen "start", this is the first one called when you open runtime.html, 
but you can change this via query parameter:
runtime.html?screenName=screen2

## Changelog
<!--
	Placeholder for next versions:
	### __WORK IN PROGRESS__
-->
### 0.20.6 (2023-12-12)
- few wunderbaum fixes

### 0.20.5 (2023-12-11)
- better custom properties view

### 0.20.4 (2023-12-11)
- fix in css prop binding

### 0.20.3 (2023-12-11)
- update designer npm

### 0.20.2 (2023-12-11)
- fix for class binding

### 0.20.1 (2023-12-11)
- binding for classes

### 0.20.0 (2023-12-11)
- allow bindings to css vars

### 0.19.3 (2023-12-10)
- switch loglevel

### 0.19.2 (2023-12-10)
- package updates

### 0.19.1 (2023-12-07)
- fix load error

### 0.19.0 (2023-12-07)
- waitForReady needs to be awaited

### 0.18.15 (2023-12-06)
- fix missing null check

### 0.18.14 (2023-12-06)
- fix normal binding unsubscribe

### 0.18.13 (2023-12-06)
- fix historic binding unsubscribe

### 0.18.12 (2023-12-06)
- remove bindings in customcontrols

### 0.18.11 (2023-12-06)
- fix broken load historic

### 0.18.10 (2023-12-06)
- load historic only when previous load is finished

### 0.18.9 (2023-12-05)
- fix tooltips

### 0.18.8 (2023-12-05)
- lazy remove the title

### 0.18.7 (2023-12-05)
- better fix for monaco

### 0.18.6 (2023-12-05)
- fix for monaco bug
- title removed

### 0.18.5 (2023-12-05)
- code completition for base custom webcomponent
- object property type

### 0.18.4 (2023-12-03)
- better text for historic bindings cancel

### 0.18.3 (2023-12-03)
- fix reload in dynamics editor

### 0.18.2 (2023-12-03)
- ui for historic binding
- fixes in refactor view

### 0.18.1 (2023-12-03)
- fixes in refactor service

### 0.18.0 (2023-12-01)
- tooltip in solution explorer
- npm upgrade of designer
- refactor view for bindings and scripts

### 0.17.0 (2023-11-29)
- remove 2 uneeded files
- designer update

### 0.16.6 (2023-11-28)
- check for invalid propertynames
- move properties

### 0.16.5 (2023-11-27)
- copy screen and custom controls

### 0.16.4 (2023-11-27)
- fix usage of webui in windows

### 0.16.3 (2023-11-24)
- extra style for font declarations, they are not allowed in shadow dom

### 0.16.2 (2023-11-23)
- fix remove script command

### 0.16.1 (2023-11-23)
- additional file dnd

### 0.16.0 (2023-11-23)
- add additional files node and upload

### 0.15.1 (2023-11-22)
- export as xml (screens & controls)
- binding historic with reload
- fix dialog

### 0.15.0 (2023-11-19)
- uncloseable dialog 
- css properties for dialog
- binding to historic data

### 0.14.1 (2023-11-12)
- dialog centered

### 0.14.0 (2023-11-12)
- add simple dialog

### 0.13.1 (2023-11-11)
- two way bindings with expressions

### 0.13.0 (2023-11-09)
- fix upercase screen names in runtime
- raster in designer is now adjustable
- copy object nodes now copies complete string
- context menu to directly edit custom element
- fix handler path in script
- uiChangedView now workin
- error when importing invalid file (for example html instead of json)

### 0.12.3 (2023-09-20)
- after eval removal, functions need a return

### 0.12.2 (2023-09-20)
- events names for 2way bindings need a editor

### 0.12.1 (2023-09-20)
- two way for indirect bindings

### 0.12.0 (2023-09-20)
- support indirect bindings via {...} in signals (like in vis)

### 0.11.2 (2023-09-17)
- check npm package name

### 0.11.1 (2023-09-16)
- fix build on windows

### 0.11.0 (2023-09-11)
- dragdrop fixes
- screen/control size fixes
- connected/disconnected callbacks

### 0.10.0 (2023-09-10)
- new script commands
- bugfix with bindings and empty events
- select exported function in javascript
- bugfix in save of screens
- typescript in scripts
- started work on translateable runtime

### 0.9.0 (2023-09-06)
- signal selector in properties
- screen selector in properties
- new screen had style in scripts
- indirect value/property acces from scripts via editor
- list multiple undo entries (on hold of undo)

### 0.8.0 (2023-09-03)
- update designer to add and fix some commands
- move screen/control scripts out of html code
- add a javascript editor view
- bugfix when states where null after a fresh install
- designer addons do now work again
- docking framework updated, cause of bugs with undocking

### 0.7.0 (2023-09-01)
- screens and controls have now settings (width, height, useGlobalStyle)

### 0.6.0 (2023-09-01)
- removed many uneeded files from installation

### 0.5.1 (2023-09-01)
- show version in ui

### 0.5.0 (2023-09-01)
- signal as property type
- removed svg-image control
- shorter custom control tag name
- better dynamics editor
- dock ui fixes
- control ui from backend (switch view, reload)

### 0.4.0 (2023-08-30)
- remove uneeded files from upload
- remove icons into extra iobroker packages
- support icon adapters
- rename screens & controls

### 0.3.0 (2023-08-29)
- default value for custom properties
- open screens only once
- property bindings default one way

### 0.2.3 (2023-08-28)
- rework how custom controls are initalized

### 0.2.2 (2023-08-28)
- better support & fixes of custom elements
- enum properties in custom controls
- sample custom controls

### 0.2.1 (2023-08-28)
- null ref fix in bindings

### 0.2.0 (2023-08-28)
- Import/Export of Screens/Images/Controls
- Define your own Controls directly in webui
- Drag/Drop of Icons/Images to Properties
- Drag/Drop of objects to Bindings-Editor Signalname
- Basic functionality of CustomControls

### 0.1.0 (2023-08-27)
-   initial public release

## License
The MIT License (MIT)

Copyright (c) 2023 jogibear9988 <jochen.kuehner@gmx.de>
