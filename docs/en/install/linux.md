---
title: Linux
lastChanged: 05.12.2020
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/install/linux.md
hash: IfM8p2R5hk9FlFrPpHyIakS8bpY9abMKtH1lxmBoo8w=
---
# IoBroker installation on Linux
!> These instructions do NOT apply to finished images of the website! However, manual installation is preferable to an image.

The installation is carried out using a script that carries out the necessary installation steps and loads any software packages that may still be required.
During the installation, a new user "iobroker" is created in the system as well as an associated home directory (/home/iobroker).
The ioBroker then runs under this user.

If reloading a script is too dangerous for you, you can check the script beforehand under [this link](https://raw.githubusercontent.com/ioBroker/ioBroker/stable-installer/installer.sh).

These installation instructions for ioBroker show the installation on Linux using the example of a Raspberry Pi with Raspberry OS 'Buster'.

Due to dependencies on other packages or additional installations, there can always be peculiarities during the installation.

## Hardware required
###Raspberry Pi 2/3/4
or any other hardware with a common Linux. However, Debian, Ubuntu or one of the distributions based on it is recommended.

We do not recommend using a Pi 1 as a master. It just isn't powerful enough (500 MB RAM, etc.). Due to the different hardware, these instructions do not fit for a Pi 1 anyway.

A Pi 2 or Pi 3 also only has a maximum of 1 GB of RAM. With 15 adapter instances, this should still be enough, but beyond that it can get tight. Each adapter instance requires about 40MB (and sometimes 200MB and more) of RAM. Therefore, one should always keep an eye on the RAM usage before activating further adapter instances - 1 GB RAM is finite.

We therefore recommend the Raspberry4 with 4, better 8 GB RAM from the Raspberry series.

### Power adapter
it is important to have a good power supply. Stability problems are to be expected with a weak power supply

### Memory card
or SSD, USB stick, etc. (depending on the hardware used)

## Needed/important links
* Download Image: https://www.raspberrypi.org/software/operating-systems/
* Win32DiskImager: https://sourceforge.net/projects/win32diskimager/ **or**
* Balena Etcher: https://www.balena.io/etcher/
* Putty: http://www.putty.org/

## Installation Guide
### Installation operating system
* Install the desired base operating system (Raspberry OS Bullseye, Ubuntu, Debian, etc.) - depending on the hardware used.

Help and instructions for the respective versions are available on the corresponding support pages, Youtube, etc.

* ONLY if root access via SSH or sftp is absolutely necessary

Root access for SSH can be unlocked.

Due to the well-known safety aspects, we advise against it. For the installation of ioBroker it is sufficient to use the command sudo and put it in front of the respective command.

### Install Node.js
!> with the current installer from ioBroker (see below) **on a system without node.js** the currently recommended version of node.js is automatically installed! A previous separate installation of node.js is **no longer** necessary.

The following instructions are also to be used when downgrading.

The currently recommended version is node 14.x; for other desired versions in step 4.1. replace the “14.x” with Y.x”.

!> Node.js < 12.x is no longer supported

<span style="color:red">Odd nodejs versions are generally not recommended as they are developer versions.</span>

<span style="color:red">npm is installed appropriately along with nodejs. Installing or upgrading npm manually is not advisable!</span>

1. System update: ``sudo apt-get update && sudo apt-get upgrade``

Depending on the OS used, the update can also be carried out using ``sudo apt update && sudo apt upgrade``.

2. Test for existing versions of nodejs and npm.

    ``node -v``

    ``nodejs -v``

    ``npm -v``

only if **ALL** these commands do not bring any result (i.e. no longer display a version number) continue with step 4. of this section, otherwise, or if the version does not correspond to the desired version, do the following beforehand:

3. Uninstall the existing node & node.js versions

    ``sudo apt-get --purge remove node`` (You may get an error message here. Please continue!)

    ``sudo apt-get --purge remove nodejs``

    ``sudo apt-get autoremove``

    ``sudo reboot``

4. Reinstall Node.js for Linux and Raspberry 2/3

    ``curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -``

    ``sudo apt install -y nodejs``

    ``sudo reboot``

After installation, the commands “node -v” and “nodejs -v” must return the same version number.

    If ``node -v`` produces an error message like “not found”, then please enter

    Run ``sudo ln -s /usr/local/bin/nodejs /usr/bin/node`` on the console.

In newer installations, the command ``nodejs -v`` may produce an error message like “not found”.
In principle, this is harmless, since the command ``nodejs`` has not been used for a long time, but can be "repaired" via a symlink with the command ``sudo ln -s /usr/bin/node /usr/bin/nodejs``.

---

If the versions are different, please work through section [Install Node.js](#installation-nodejs) again

As a final check, please check the version of npm using ``npm -v``.

If this results in a version < 6, please carry out an npm update with ``sudo -H npm install -g npm@6``

---

### Installation ioBroker
The installation can be done with the user pi but also with the user root.

Execute on the console:

``curl -sLf https://iobroker.net/install.sh | bash -``

---

The installation takes place in 4 steps:

``Installing prerequisites (1/4)``

``Creating ioBroker user and directory (2/4)``

``Installing ioBroker (3/4)``

``Finalizing installation (4/4)``

At the end there is a message

``ioBroker was installed successfully``

``Open http://localhost:8081 in a browser and start configuring!``

---

Now call ioBroker via the specified IP in the web browser: ``http://<IP-Adresse>:8081``

**A notice:**

Changes to the installation can lead to rights problems.

In this case please use the installation fixer:

``curl -sL https://iobroker.net/fix.sh | bash -``

or short `iobroker fix`

more information in the forum:

https://forum.iobroker.net/topic/20211/iobroker-installation-fixer-beta-available%C3%BCgbar