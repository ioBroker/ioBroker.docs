---
title: Windows
lastChanged: 14.01.2024
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/install/windows.md
hash: /MbzX3VqXu5BJwgcY2sPyem5I8kvkABYfsYbjNyEsig=
---
# Check requirements
Before installing, please check whether the system meets all the necessary [Installation requirements](./requirements.md).

Problems with the Windows Installer can be discussed here in the forum: https://forum.iobroker.net/topic/63610/test-iobroker-unter-windows-installieren-2023-edition

# The ioBroker Windows Installer
With the ioBroker Windows Installer, ioBroker can be installed on Windows PCs with just a few clicks. The installer does not come with any software packages itself. Required software is automatically downloaded during installation. An internet connection is therefore mandatory.

Once ioBroker is installed, the installer can be used for the following actions:

1. Update Node.js to the current recommended version
2. Run ioBroker Fixer
3. Delete or create rules for the Windows Firewall so that ioBroker can also be reached from outside
4. Determine whether ioBroker starts automatically when Windows starts.

The installer installs itself and can be found in the Windows start menu under “ioBroker automation platform” - “ioBroker Setup”.

## IoBroker on Windows - does that even make sense?
ioBroker usually runs just as well on Windows systems as it does on Linux systems. However, Windows systems for use as 24/7 systems may have system-related disadvantages that everyone has to weigh up for themselves.
Windows is particularly suitable for quickly trying out ioBroker on an existing Windows PC.

## Install ioBroker
First, the installer must be downloaded. The current version is always available on the official download page: https://www.iobroker.net/#de/download

The installer is then started by double-clicking. First we select the language to use:

![language selection](../../de/install/media/windows/InstallWin_language.png "language selection")

The welcome page then appears:

![Welcome page](../../de/install/media/windows/InstallWin_welcome.png "Welcome page")

After clicking “Next” the license page appears:

![License page](../../de/install/media/windows/InstallWin_license.png "License page")

We have to accept the license and then click “Next” again. On the following page we can now select the installation folder for our ioBroker installation:

![Installation folder](../../de/install/media/windows/InstallWin_folder.png "Installation folder")

It's usually a good idea to just use the default value "C:\ioBroker". After clicking "Next" some checks will be carried out:

![Reviews](../../de/install/media/windows/InstallWin_check.png "Reviews")

This can take a moment. The result of the check then appears automatically:

![Verification result](../../de/install/media/windows/InstallWin_checkresult.png "Verification result")

In this example everything is fine and we can continue. If all the necessary requirements are not met, you must first clarify what needs to be done. Ports required for the installation and operation of ioBroker are usually not available. If you are in this situation and don't know what to do, you can find help in the ioBroker forum at https://forum.iobroker.net/ After clicking on "Next" we can select some details:

![Options](../../de/install/media/windows/InstallWin_options.png "Options")

During the initial installation of ioBroker, the first three options are fixed:

1. Node.js, the runtime environment for ioBroker, is downloaded and installed in the recommended version
2. ioBroker itself is installed
3. The ioBroker Fixer cannot be selected

The next two options can be changed, but it is usually recommended to leave the default settings.
And finally, the installer offers the option of adopting the configuration of an existing installation. This requires the entire “iobroker-data” folder, which can be found in the ioBroker folder if an ioBroker installation is present. This can come from an ioBroker installation under Windows or Linux. The data is taken from this folder during installation; the contents of this folder are not changed.
After clicking “Next” we now see the summary of the planned actions:

   ![Options](../../de/install/media/windows/InstallWin_summary.png "Options")

   Clicking on “Install” will now start the actual installation:

   ![Options](../../de/install/media/windows/InstallWin_downloadnode.png "Options")

   ![Options](../../de/install/media/windows/InstallWin_installnode.png "Options")

   ![Options](../../de/install/media/windows/InstallWin_installiobroker.png "Options")

   ![Options](../../de/install/media/windows/InstallWin_finish.png "Options")

By clicking on “Finish” a web browser opens and ioBroker guides you through the first steps of the setup.

## Update
!> Normally updates are completely problem-free and safe. However, as a precaution, a data backup should be carried out before carrying out.

- With the help of the Windows Installer, the installed Node.js version can be automatically updated to the recommended level.

  To do this, simply start the installer from the Windows start menu (“ioBroker Setup”) and follow the instructions.

- Unfortunately, the js controller cannot be updated with the Windows Installer. This must be done using the ioBroker Command Line. This can be started from the Windows start menu under "ioBroker automation platform" - "ioBroker Command Line".

  The update is then carried out using the following commands:

  `iob stop`

  `iob update`

  `iob upgrade self`

  `iob start`

## Troubleshooting
**Problem:** The installation cannot be completed because port 9001 is occupied by a process named "System".

**Possible Solution:** The Intel® Graphics Command Center is known to block port 9001.
Check whether there is a Windows service called "Graphics Command Center" or similar on your PC. If yes, stop and disable this service.
You should then be able to install ioBroker.