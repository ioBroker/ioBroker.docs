---
title: Linux
lastChanged: 11.10.2022
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/install/linux.md
hash: SxprV6MZeU8HOSJm14hYEgyv60ZTAt3c6tLkng7l5oM=
---
***ioBroker installation on a Linux system***

!> These instructions do NOT apply to finished images of the website! The manual installation described here is preferable to an image!

## General
ioBroker is installed manually using a script that carries out the necessary installation steps and loads any software packages that may still be required.
During the installation, a new user "iobroker" is created in the system as well as an associated home directory (/home/iobroker). The ioBroker then runs under this user.

These installation instructions describe a *reinstallation* of ioBroker on Linux using the example of a Raspberry Pi with Raspberry OS 'Bullseye'.

## Hardware required
***Raspberry Pi 2/3/4*** with Raspberry OS or any other hardware with a common Linux. However, Debian, Ubuntu or one of the distributions based on it is recommended.

We don't recommend using a Pi 1 as a master, as it simply isn't powerful enough (500MB RAM, etc.). Due to the different hardware, these instructions do not fit for a Pi 1 anyway.

A Pi 2 or Pi 3 also only has a maximum of 1 GB of RAM. With 15 adapter instances, this should still be enough, but beyond that it can get tight. Each adapter instance requires about 40MB (and sometimes 200MB and more) of RAM. Therefore, the RAM usage should always be kept in mind before further adapter instances are activated - 1 GB RAM is finite.

We therefore recommend the Raspberry4 with 4, better 8 GB RAM from the Raspberry series.

It is important to have a good ***power supply***. Stability problems are to be expected with a weak power supply unit (e.g. mobile phone power supply units).

***Memory card*** or SSD, USB stick, etc. (depending on the hardware used)

## Needed/important links
* Download Image: https://www.raspberrypi.org/software/operating-systems/
* Win32DiskImager: https://sourceforge.net/projects/win32diskimager/ **or**
* Balena Etcher: https://www.balena.io/etcher/
* Putty: http://www.putty.org/

## Installation Guide
* Install the desired base operating system (Raspberry OS Bullseye, Ubuntu, Debian, etc.) - depending on the hardware used.

  Help and instructions for the respective versions are available on the corresponding support pages, Youtube, etc.

?> ioBroker works as a server 24/7 and is administered via terminal programs such as Putty or similar. Installing a desktop ties up resources and is not necessary!

?> For security reasons, we advise against enabling root access for SSH. For the installation of ioBroker it is sufficient to put *sudo* in front of the respective command.

* Perform a system update via the console and depending on the OS used with ``sudo apt-get update && sudo apt-get upgrade`` or ``sudo apt update && sudo apt upgrade``.

* ioBroker with the ``curl -sLf https://iobroker.net/install.sh | bash -`` install.

  The installation script is executed. Depending on the hardware, the installation may take some time.

  The installation takes place in 4 steps which can be seen in the console:

  ``Installing prerequisites (1/4)``

  ``Creating ioBroker user and directory (2/4)``

  ``Installing ioBroker (3/4)``

  ``Finalizing installation (4/4)``

  At the end there is a message

  ``ioBroker was installed successfully``

  ``Open http://localhost:8081 in a browser and start configuring!``

ioBroker can now be called up in the web browser via the specified IP ``http://<IP-Adresse>:8081`` and set up.