---
title: Windows
lastChanged: 29.09.2024
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/install/windows.md
hash: jULy3BfFGFvYaxcTpTGgY/ShX6i8ja5ZizBz+Scho18=
---
# Check requirements
Before installation, please check whether the system meets all necessary [Installation requirements](./requirements.md).

Problems with the Windows Installer can be discussed here in the forum: https://forum.iobroker.net/topic/63610/test-iobroker-unter-windows-installieren-2023-edition

# The ioBroker Windows Installer
With the ioBroker Windows Installer, ioBroker can be installed on Windows PCs with just a few clicks. The installer itself does not include any software packages. Required software is downloaded automatically during installation. An internet connection is therefore essential.

Once ioBroker is installed, the installer can be used for the following actions:

1. Update Node.js to the currently recommended version
2. Running the ioBroker Fixer
3. Delete or create rules for the Windows Firewall so that ioBroker can also be accessed from outside
4. Specify whether ioBroker starts automatically when Windows starts.

The installer installs itself and can be found in the Windows start menu under "ioBroker automation platform" - "ioBroker Setup".

## IoBroker under Windows - does it even make sense?
ioBroker generally runs just as well on Windows systems as it does on Linux systems. However, Windows systems may have system-related disadvantages for use as 24/7 systems, which everyone has to weigh up for themselves.
Windows is particularly well suited for quickly trying out ioBroker on an existing Windows PC.

## Install ioBroker
First, the installer must be downloaded. The current version is always available on the official download page: https://www.iobroker.net/#de/download

Then start the installer by double-clicking. First we select the language to be used:

![Language selection](../../de/install/media/windows/InstallWin_language.png "Language selection")

The welcome page then appears:

![Welcome page](../../de/install/media/windows/InstallWin_welcome.png "Welcome page")

After clicking on "Next" the license page appears:

![License page](../../de/install/media/windows/InstallWin_license.png "License page")

We have to accept the license and then click on "Next" again. On the following page we can now select the installation folder for our ioBroker installation:

![Installation folder](../../de/install/media/windows/InstallWin_folder.png "Installation folder")

Usually it is a good idea to just use the default value "C:\ioBroker". After clicking "Next" some checks will be performed:

![Reviews](../../de/install/media/windows/InstallWin_check.png "Reviews")

This may take a moment. The result of the check will then appear automatically:

![Verification result](../../de/install/media/windows/InstallWin_checkresult.png "Verification result")

In this example, everything is fine and we can continue. If all the necessary requirements are not met, then we must first clarify what to do. In most cases, ports that are required for the installation and operation of ioBroker are not available. If you are in this situation and do not know what to do, you can find help in the ioBroker forum at https://forum.iobroker.net/ After clicking on "Next" we can select some details:

![Options](../../de/install/media/windows/InstallWin_options.png "Options")

When you first install ioBroker, the first three options are predefined:

1. Node.js, the runtime environment for ioBroker, is downloaded and installed in the recommended version
2. ioBroker itself is installed
3. The ioBroker Fixer cannot be selected

The next two options can be changed, but it is generally recommended to keep the default settings.
And finally, the installer offers the option of adopting the configuration of an existing installation. This requires the complete "iobroker-data" folder, which can be found in the ioBroker folder of an existing ioBroker installation. This can come from an ioBroker installation under Windows or Linux. The data is adopted from this folder during installation; the contents of this folder are not changed.
After clicking on "Next" we now see the summary of the planned actions:

   ![Options](../../de/install/media/windows/InstallWin_summary.png "Options")

By clicking on "Install" the actual installation will now start:

   ![Options](../../de/install/media/windows/InstallWin_downloadnode.png "Options")

   ![Options](../../de/install/media/windows/InstallWin_installnode.png "Options")

   ![Options](../../de/install/media/windows/InstallWin_installiobroker.png "Options")

   ![Options](../../de/install/media/windows/InstallWin_finish.png "Options")

By clicking on "Finish" a web browser opens and ioBroker guides you through the first steps of the setup.

##Updates
!> Updates usually run smoothly and safely. However, as a precaution, you should back up your data before performing them.

- Using the Windows Installer, the installed Node.js version can be automatically updated to the recommended level.

To do this, simply start the installer from the Windows start menu ("ioBroker Setup") and follow the instructions. An available update for Node.js will be automatically detected and offered later.

- Since Windows Installer version 3.1.0, the JS controller can also be updated using the Windows Installer.

To do this, simply start the installer from the Windows start menu ("ioBroker Setup") and follow the instructions. An available update for JS controllers will be automatically detected and offered later.

- It is also possible to update JS controllers manually, but it is strongly recommended to perform updates using the Windows Installer.

If you still want to update manually, you can do so with the following commands:

`iob stop`

`iob update`

`iob upgrade self`

`iob start`

## Expert mode
The installer also offers an expert mode, which is not normally required for the normal ioBroker user. It can be activated on the first page of the installer by double-clicking on the ioBroker logo and then checking the "Expert mode" box.

The expert mode offers the following additional functions:

- Installation and maintenance of several ioBroker servers in parallel on one PC
- Installing JS Controller Alpha Versions

![Expert mode](../../de/install/media/windows/InstallWin_expertmode.png "Expert mode")

## Troubleshooting
**Problem:** The installation cannot be completed because port 9001 is in use by a process named "System".

**Possible solution:** The Intel® Graphics Command Center is known to block port 9001.
Check if there is a Windows service named "Graphics Command Center" or similar on your PC. If so, stop and disable this service.
Then you should be able to install ioBroker.