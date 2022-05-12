---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/downloads/ioBroker_Image_Tinker_piVCCU3_20190813_stretch.md
title: ioBroker Image for Tinkerboard (S) with piVCCU 20190813
hash: mHiUX/oxnSf2tCy61Uj1ypeAz84pWMwsfAcPokwbMyo=
---
# IoBroker Image for Tinkerboard (S) with piVCCU 20190813
## Creation of a µ-SD card
This is an all-in-one SD card image for Homematic with ioBroker on the Asus Tinkerboard or Tinkerboard S.

The image was created on a Tinkerboard, but should also run on all of the above. It is suitable for 4 GB cards and larger. However, 8 GB is the recommended minimum size. 16GB cards are recommended anyway so that the same cells are not always written to, which would lead to faster wear and tear on the SD card.

The image is unpacked and then written to the SD card using the Balena Etcher program. Etcher is available for different operating systems.

## Components of the image
The image contains the Raspbian lite, based on Debian 9 “Stretch” from 04/03/2019 after download from https://dl.armbian.com/tinkerboard/Debian_stretch_default.7z.

In addition, packages required for some adapters were installed.

Also included is piVCCU3 from 07/19/2019 after download from https://www.pivccu.de/images/?dir=piVCCU3

The following user is created:

* Users: `pi`,
* Password: `raspberry`

Node-js is installed in version 10.16.2 and of course iobroker via the installer with the js-controller according to the stable repository dated 08/13/2019.

It is a **minimal installation** that **only contains the admin and the discovery adapter**. other adapters and their instances still have to be created and configured.

The creation of additional adapters and their instances is described in [here](/tutorial/adapter.md).

**Note!** The following instructions were created to the best of our knowledge using the information available at the time the image was created. Something can change at any time due to updates of packages or the kernel.

The image is localized for Germany. If used in other environments, please adjust accordingly. (`sudo raspi-config`; 4.) `Localisation Options`)

## After the first start
If you are not prompted to create a new password for the root and a new user after starting the Tinkerboard for the first time, please proceed as follows for security reasons:

- To use the full size of the memory card you have to start the file system with `sudo /usr/lib/armbian/armbian-resize-filesystem`

  adapt to the size of the SD card.

- There may already be updates to the underlying Linux and nodejs. To bring this up to date

to do the following on the console: `sudo apt-get update && sudo apt-get upgrade -y`

- Be sure to change the root password with `sudo passwd root` Then enter the default password `1234` and then

enter a new password and confirm in the next step.

- This also applies to the user `pi`. This is changed with `sudo passwd pi` Then the default password `raspberry`

Enter and then enter a new password and confirm in the next step.

Further settings can be made with the configuration utility, which is called with:

`sudo armbian-config`

More information about this utility under [https://docs.armbian.com/User-Guide_Armbian-Config/](https://docs.armbian.com/User-Guide_Armbian-Config/)

## System update
Since some time may have passed since the image was created at the time of the download, the first thing you should do is bring the system up to date.

To update Linux and nodejs to the latest versions, proceed as follows on the console:

```sudo apt-get update && sudo apt-get upgrade -y```

You should also check whether there are already updates for the installed adapters and the js controller (see Hosts tab).

In addition to the smallest possible size of an image, this is also the reason that only a few adapters are already pre-installed.

In such cases, always run the js-controller first via the console according to the instructions in the Hosts tab, then if necessary the Adapter Admin and then all other adapters.

## Installing Redis
These images no longer contain the Redis database to store the states. With weak computers and little RAM, the use of Redis increases the performance, sometimes considerably. With faster computers, it reduces write access and thus extends the life of the SD card.

If Redis is to be installed, you must proceed as follows with the current images.

### Installing the Redis server
After the command:

`sudo apt install redis-server`

Is the Redis server ready and available on port 6379

### Changing the states to Redis
Using Redis to store the states in ioBroker must be configured in the console with:

`iobroker setup custom`

In the dialog that now follows, enter as follows (attention in the 4th line):

```
Type of objects DB [file, couch, redis], default [file]: ENTER
Host of objects DB(file), default[127.0.0.1]: ENTER
Port of objects DB(file), default[9001]: ENTER
Type of states DB [file, redis], default [file]: r ENTER
Host of states DB (file), default[HostName]:ENTER
Port of states DB (file), default[9000]: ENTER
Host name of this machine [hostname]: ENTER
```

Special features of the installation in a multihost system are described here:

[Click here](config/multihost.md)

Release of redis for the user iobroker For example, so that the backitup adapter can also access redis, the user must be given the necessary rights with:

`sudo usermod -a -G redis iobroker`

## The installed piVCCU3
A virtualized CCU3 is also installed in this image, which makes it possible to control Homematic and HM-IP devices without additional separate hardware.
Only the radio module HM-MOD-RPI-PCB or RPI-RF-MOD has to be plugged into the pin strip of the Raspberry Pi.

The piVCCU receives a different IP address from the DHCP server than the RaspberryPi itself. This is obtained with the command `sudo pivccu-info`

If you call up this IP address, you can log on to the CCU3 interface.