---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/downloads/ioBroker_Image_Tinker_piVCCU3_20190813_stretch.md
title: ioBroker Image for Tinkerboard (S) with piVCCU 20190813
hash: 1SCL2XASshAYgQH+eZvQbYb/unN6Uo3fEWCpN2W2/zw=
---
# IoBroker Image for Tinkerboard (S) with piVCCU 20190813
## Creating a µ-SD card
This is an all-in-one SD card image for Homematic with ioBroker on the Asus Tinkerboard or Tinkerboard S.

The image was created on a Tinkerboard, but should also work on all of the above. It is suitable for 4 GB cards and larger. However, 8 GB is the recommended minimum size. 16 GB cards are recommended anyway so that the same cells are not always written to, which would lead to faster wear of the SD card.

The image is unpacked and then written to the SD card using the Balena Etcher program. Etcher is available for various operating systems.

## Components of the image
The image contains Raspbian lite, based on Debian 9 “Stretch” from 03.04.2019 after download from https://dl.armbian.com/tinkerboard/Debian_stretch_default.7z.

Additionally, packages that are necessary for some adapters have been installed.

Also included is piVCCU3 from 19.07.2019 after downloading from https://www.pivccu.de/images/?dir=piVCCU3

The following user is created:

* User: `pi`,
* Password: `raspberry`

Node-js is installed in version 10.16.2 as well as of course iobroker via the installer with the js-controller according to the status of the stable repository as of August 13, 2019.

This is a **minimal installation** that contains **only the admin and discovery adapters**. Additional adapters and their instances still need to be created and configured.

The creation of additional adapters and their instances is described in [here](/tutorial/adapter.md).

**Note!** The following instructions were created to the best of our knowledge using the information available at the time the image was created. Updates to packages or the kernel can change this at any time.

The image is localized for Germany. If used in other environments, please adapt accordingly. (`sudo raspi-config`; 4.) `Localisation Options`)

## After the first start
If you are not prompted to create a new password for root and a new user after starting the Tinkerboard for the first time, please proceed as follows for security reasons:

- To use the full size of the memory card you have to resize the filesystem with `sudo /usr/lib/armbian/armbian-resize-filesystem start`

to the size of the SD card.

- There may already be updates to the underlying Linux and nodejs. To update this, go to

on the console as follows: `sudo apt-get update && sudo apt-get upgrade -y`

- Be sure to change the root password with `sudo passwd root` Then enter the default password `1234` and then

Enter a new password and confirm in the next step.

- This also applies to the user `pi`. You can change this with `sudo passwd pi` Then the standard password `raspberry`

and then enter a new password and confirm in the next step.

Further settings can be made using the configuration utility, which you call with:

`sudo armbian-config`

For more information about this utility see [https://docs.armbian.com/User-Guide_Armbian-Config/](https://docs.armbian.com/User-Guide_Armbian-Config/)

## System update
Since some time may have passed since the image was created at the time of download, the first thing you should do is update your system to the latest version.

To update Linux and nodejs to the latest versions, proceed as follows on the console:

```sudo apt-get update && sudo apt-get upgrade -y```

You should also check whether there are any updates for the already installed adapters and the js-controller (see Hosts tab).

In addition to keeping the size of an image as small as possible, this is also the reason why only a few adapters are pre-installed.

In such cases, always first run the js-controller via the console according to the instructions in the Hosts tab, then the adapter admin if necessary and then all other adapters.

## Installation of Redis
These images no longer contain the Redis database to store the states. On weak computers and with little RAM, using Redis can sometimes significantly increase performance. On faster computers, it reduces write accesses and thus extends the life of the SD card.

If Redis is to be installed, the following steps must be taken with the current images.

### Redis server installation
After the command:

`sudo apt install redis-server`

Is the Redis server ready and available on port 6379

### Switching the states to Redis
To use Redis to store the states in ioBroker, this must be configured in the console with:

`iobroker setup custom`

In the following dialog enter the following (note the 4th line):

```
Type of objects DB [file, couch, redis], default [file]: ENTER
Host of objects DB(file), default[127.0.0.1]: ENTER
Port of objects DB(file), default[9001]: ENTER
Type of states DB [file, redis], default [file]: r ENTER
Host of states DB (file), default[HostName]:ENTER
Port of states DB (file), default[9000]: ENTER
Host name of this machine [hostname]: ENTER
```

Special features when installing in a multihost system are described here:

[Click here](config/multihost.md)

Release of redis for the user iobroker So that the backitup adapter can also access redis, the user must be given the necessary permission with:

`sudo usermod -a -G redis iobroker`

## The installed piVCCU3
A virtualized CCU3 is also installed in this image, which makes it possible to control Homematic and HM-IP devices without any additional separate hardware.
All that is required is the radio module HM-MOD-RPI-PCB or RPI-RF-MOD to be plugged into the pin header of the Raspberry Pi.

The piVCCU receives a different IP address from the DHCP server than the RaspberryPi itself. This can be obtained with the command `sudo pivccu-info`

If you call up this IP address you can log in to the CCU3 interface.