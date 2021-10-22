---
title: Windows
lastChanged: 18.07.2019
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/install/windows.md
hash: px8Pj5WdRIRET04sAvbr8e4683UA6b4G1aExlrwjJgs=
---
# Installation of ioBroker on Windows
?> ***This article is currently being expanded*** .<br><br> Help with ioBroker. Please note the [ioBroker Style Guide](community/styleguidedoc) so that the changes can be adopted more easily.

The following instructions guide you through the installation step by step. Please do not skip any steps, as some commands build on each other.

## Check requirements
!> First check whether the system fulfills all the necessary [Installation requirements](install/requirements).

Node.js is required to run ioBroker. In the following it is assumed that neither Node.js nor ioBroker is installed on the PC. If ioBroker is already installed, please continue with the section [Update] ().

To see whether Node.js is installed, the key combination <kbd>⊞ Windows</kbd> + <kbd>r</kbd> opens the `Ausführen` dialog and then the command

```
cmd.exe /C node -v & pause
```

entered. After confirming the command, a window appears.

![Node.js version](../../de/install/media/w02nodecheck.png) *Node.js check*

Either an error message or the installed Node.js version is displayed.

If a Node.js version number is output, you must first check whether it still meets the [Installation requirements] ().

If the error message is `Der Befehl "node" ist entweder falsch geschrieben oder konnte nicht gefunden werden.`, then node.js is not installed and the installation is [can start right away](#nodeinst).

## Quick Start
?> This summary of the installation steps is intended for experienced ioBroker users who have already installed ioBroker several times.

Beginners should follow [detailed instructions](#nodeinst).

* Node.js 8.x LTS version [download and install] (install / nodejs).
* Open the command line `cmd.exe` as administrator and the following commands one after the other

  carry out:

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
Node.js is installed according to [of this manual](install/nodejs).

## Installation of ioBroker
?> ioBroker can be installed in a folder of your choice on the local hard drive. If the installation path contains spaces, the complete path must be enclosed in quotation marks for all commands.
Example command: `dir "C:\ioBroker Testsystem"`.

?> The default installation folder for ioBroker is `C:\iobroker`.

1. Open a command line window as administrator. To do this, use the key combination

<kbd>⊞ Windows</kbd> + <kbd>r</kbd> open the `Ausführen` dialog and there the command

```
cmd
```

   input.

Since the command line window has to be opened as an administrator, please complete the entry **not** with `OK` but with the key combination `Strg` + `Umschalt` + `Eingabetaste`. There is a security question, which must be confirmed with `Ja` or the entry of the administrator password.

!> The title line in the black command line window that has now opened must begin with the word `Administrator:`.

?> Some ioBroker adapters contain components that have to be compiled for Windows. Therefore, before installing ioBroker, the so-called `windows-build-tools` are installed. More information on `windows-build-tools` can be found in [to be found here](https://github.com/felixrieseberg/windows-build-tools).

1. The `windows-build-tools` are installed with the following command:

```
npm install --global windows-build-tools
```

1. Then in the command line window the command to create the installation folder

   carry out:

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

The installation process can take a while. When running npm, red error messages (gyp! ERR) may appear in connection with the module `unix-dgram`. These error messages can be ignored.

   The last lines of the installation should end something like this:

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

check whether ioBroker was started automatically as a Windows service.
The answer should be either

```
iobroker is running
```

   or

```
iobroker is not running
```

   ring.

   If ioBroker did not start automatically, please enter the following commands:

```
net start iobroker.exe
iobroker status
```

   The answer should be now

```
iobroker is running
```

   ring.

?> In the future, ioBroker will be started automatically in the background every time the system is restarted.

1. Finally, the command line window can be opened by executing the command

```
exit
```

   getting closed.

?> The further configuration takes place with the help of the `Admin` adapter. It is called up with a web browser and the address [http:// localhost: 8081](http://localhost:8081). Via the network The configuration of ioBroker is described in detail in the chapter [Configuration] ().

?> It is now recommended to run the [tutorial] () for beginners. Here the administration interface is presented step by step and essential basic settings are made.

## Update
@@@ tbd @@@

## Troubleshooting
@@@ tbd @@@