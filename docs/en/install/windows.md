---
title: installation
lastChanged: 18.07.2019
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/install/windows.md
hash: XFdcrokNPGtTri8RFE+c4m/7TgKEDdKqtTLfO7BRt1s=
---
# Installing ioBroker on Windows
?> ***This item is currently being expanded*** . <br><br> Help me with ioBroker. Please note the [ioBroker style guide](community/styleguidedoc), so that the changes can be adopted more easily.

The following instructions will guide you step by step through the installation. Please do not skip steps as some commands build on each other.

## Check requirements
!> First check whether the system fulfills all the necessary [installation requirements](install/requirements).

Node.js is required to run ioBroker. The following assumes that neither Node.js nor ioBroker is installed on the PC. If ioBroker is already installed, please continue with the section [Update] ().

In order to detect whether Node.js is installed, the `Ausführen` dialog is opened with the key combination <kbd>⊞ Windows</kbd> + <kbd>r</kbd> and then the command there

```
cmd.exe /C node -v & pause
```

entered. After confirming the command, a window appears.

![Node.js version](../../de/install/media/w02nodecheck.png) *Node.js exam*

Either an error message or the installed Node.js version is displayed.

When outputting a Node.js version number, first check that it still meets the [Installation Requirements] ().

If the error message is `Der Befehl "node" ist entweder falsch geschrieben oder konnte nicht gefunden werden.`, then node.js is not installed and the installation [can start right away](#nodeinst).

## Quick Start
?> This summary of the installation steps is intended for experienced ioBroker users who have already installed ioBroker several times.

Beginners should follow [detailed instructions](#nodeinst).

* Node.js 8.x LTS version [download and install] (install / nodejs).
* Command line `cmd.exe` open as administrator and the following commands in turn

  To run:

```
npm install --global windows-build-tools
md C:\iobroker
cd /d C:\iobroker
npm install iobroker
npm install --production --no-optional --logevel=error
iobroker status
```

<div id="nodeinst"></div>

## Installation of Node.js and npm
The installation of Node.js takes place in accordance with [this guide](install/nodejs).

## Installation of ioBroker
?> ioBroker can be installed in a freely selectable folder on the local hard disk. If the installation path contains spaces, the full path must be enclosed in all quoted commands.
Example command: `dir "C:\ioBroker Testsystem"`.

?> The default installation folder for ioBroker is `C:\iobroker`.

1. Open a command line window as administrator. To do this with the key combination

<kbd>⊞ Windows</kbd> + <kbd>r</kbd> open the `Ausführen` dialog and then the command

```
cmd
```

   enter.

Since the command line window must be opened as an administrator, please do not enter ** ** with `OK` but with the key combination `Strg` + `Umschalt` + `Eingabetaste`. A confirmation prompt is issued, which must be confirmed with `Ja` or the entry of the administrator password.

!> The title bar in the black command window, which has now opened, must begin with the word `Administrator:`.

?> Some ioBroker adapters contain components that need to be compiled for Windows. Therefore, the so-called `windows-build-tools` are installed before installing ioBroker. More information about the `windows-build-tools` are [to find here](https://github.com/felixrieseberg/windows-build-tools).

1. The `windows-build-tools` are installed with the following command:

```
npm install --global windows-build-tools
```

1. Then in the command line window the command to create the installation folder

   To run:

```
md C:\iobroker
```

1. Now the actual ioBroker installation package can be installed:

```
cd /d C:\iobroker
npm install iobroker
```

   The result should look like this:

```
[...]
╭───────────────────────────────────────────────────────╮
│ The iobroker files have been downloaded successfully. │
│ To complete the installation, you need to run         │
│                                                       │
│   npm i --production --no-optional --logevel=error    │
│                                                       │
╰───────────────────────────────────────────────────────╯

npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN enoent ENOENT: no such file or directory, open 'C:\iobroker\package.json'
npm WARN iobroker No description
npm WARN iobroker No repository field.
npm WARN iobroker No README data
npm WARN iobroker No license field.

+ iobroker@1.3.0
added 51 packages from 28 contributors and audited 83 packages in 6.937s
found 0 vulnerabilities
```

1. The ioBroker installation is completed with the following commands:

```
cd /d C:\iobroker
npm install --production --no-optional --logevel=error
```

The installation process may take a while. If npm is executed, red error messages (gyp! ERR) may appear in connection with the module `unix-dgram`. These error messages can be ignored.

   The last lines of the installation should end approximately like this:

```
[...]
Write "iobroker start" to start the ioBroker
npm install node-windows@0.1.14 --production --no-optional --logevel=error --save --prefix "C:/iobroker"
ioBroker service installed. Write "serviceIoBroker start" to start the service and go to http://localhost:8081 to open the admin UI.
To see the outputs do not start the service, but write "node node_modules/iobroker.js-controller/controller"
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: unix-dgram@0.2.3 (node_modules\unix-dgram):
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: unix-dgram@0.2.3 install: `node-gyp rebuild`
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: Exit status 1

added 514 packages from 300 contributors and audited 1808 packages in 61.874s
found 23 vulnerabilities (17 low, 6 high)
run `npm audit fix` to fix them, or `npm audit` for details
```

1. You can then use the command

```
iobroker status
```

Checking whether ioBroker was started automatically as a Windows service.
The answer should either

```
iobroker is running
```

   or

```
iobroker is not running
```

   ring.

   If ioBroker did not start automatically, enter the following commands:

```
net start iobroker.exe
iobroker status
```

   The answer should be now

```
iobroker is running
```

   ring.

?> In the future, ioBroker will be automatically started in the background each time the system is restarted.

1. Finally, the command line window can be executed by executing the command

```
exit
```

   getting closed.

?> Further configuration is carried out with the help of the `Admin` adapter. It is called with a web browser and the address [http:// localhost: 8081](http://localhost:8081). About the Network The configuration of ioBroker is described in detail in the [Configuration] () chapter.

?> For beginners it is now recommended to run the [Tutorial] (). Here, the administration interface is gradually presented and essential basic settings made.

## Update
@@@ tbd @@@

## Troubleshooting
@@@ tbd @@@