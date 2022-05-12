---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/downloads/ioBroker_Image_RPi_2-3-4_20191127_buster.md
title: ioBroker Image for Raspberry Pi2/3/4 Buster 20191127
hash: VMimg5s0Ar5yl1CUlqb84IAS0AMoMcD8TCLv8whhtHw=
---
# IoBroker Image for Raspberry Pi2/3/4 Buster 20191127
## Creation of a µ-SD card
This is an SD card image for the Raspberry Pi2, Pi3, Pi3 B+ or Pi4.

The image was created on a Raspberry Pi4 with 4GB RAM, but should also run on all of the above. It is suitable for 8 GB cards and larger. However, a 16 GB is the recommended minimum size.
16GB cards are recommended anyway so that the same cells are not always written.

The image is unpacked and then written to the SD card using the Balena Etcher program. Etcher is available for different operating systems.

## Components of the image
The image contains the Raspbian lite, based on Debian 10 “Buster” from 09/26/2019 after download from http://www.raspberrypi.org/downloads.

In addition, packages required for some adapters were installed.

The following user is created:

* Users: `pi`,
* Password: `raspberry`

Node-js is installed in version 10.17.0 and of course iobroker via the installer with the js-controller **v2.1.1** as of November 27th, 2019.

It is a **minimal installation** that only contains the admin, the info and the discovery adapter**.
Additional adapters and their instances still have to be created and configured.

The creation of additional adapters and their instances is described in [here](/tutorial/adapter.md).

**Note!** The following instructions were created to the best of our knowledge using the information available at the time the image was created. Something can change at any time due to updates of packages or the kernel.

The image is localized for Germany. If used in other environments, please adjust accordingly. (`sudo raspi-config`; 4.) Localization Options)

## After the first start
After starting the Rapberry Pi for the first time, please make the following settings with `sudo raspi-config`:

* Point 1: `Change user password` (assign your own password for the user `Pi`)

* Item 2: `Network Options – Hostname` (change the name of the Raspberry Pi if necessary. Default is `raspberrypi`)

if the host name is changed, please enter `iobroker host this` in the console in the installation directory

* Item 7: `Advanced Options - Expand filesystem` (expand the root filesystem up to the maximum size of the used SD card)

* If necessary, make adjustments under point 4: `Localization Options`. The default settings apply to Germany

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