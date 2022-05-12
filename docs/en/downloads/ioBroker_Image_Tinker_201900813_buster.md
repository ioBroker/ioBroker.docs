---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/downloads/ioBroker_Image_Tinker_201900813_buster.md
title: ioBroker Image for Rock64 with stretch 20190730
hash: Knij0kKVnXf5W7yzCfj3x/rGFiUZx7zcUpMprYGAW9c=
---
# IoBroker Image for Rock64 with stretch 20190730
This is a minimal SD card image for the Tinkerboard or the Tinkerboard S. It is suitable for 4 GB cards and larger. As it already only just fits on a 2GB card, a 4GB is the minimum recommended size. 16GB cards or larger are recommended anyway so that the same cells are not always written to, which leads to faster aging of the card.

The image is unpacked and then written to the SD card using the Balena Etcher program.
This is available for different operating systems.

The image contains Armbian 5.90, based on Debian "Buster" from 07/06/2019 after download from [https://dl.armbian.com/tinkerboard/Debian_buster_default.7z](https://dl.armbian.com/tinkerboard/Debian_buster_default.7z).

The following users have been created:

- **User:** `root`, **Password:** 1234
- **User:** `pi`, **Password:** `raspberry`

Furthermore, node-js v 10.16.2 is installed and of course iobroker with the js-controller according to the stable repository dated 08/13/2019.

**Only the admin and the discovery adapter** are pre-installed and instances created for them.
The creation of additional adapters and their instances is described in [here](/tutorial/adapter.md)

-----------------

*This documentation reflects the status when the image was created. Updates may result in changes.*

The image is localized for Germany. If used in other environments, please adjust accordingly. (armbian-config; Personal)

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

Since some time may have passed since the image was created at the time of the download, you should first check whether there are already updates to the adapters already installed and the js controller (see Hosts tab).

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