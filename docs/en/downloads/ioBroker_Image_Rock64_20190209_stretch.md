---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/downloads/ioBroker_Image_Rock64_20190209_stretch.md
title: ioBroker Image for Rock64 with Stretch 20190730
hash: bt7jUjoNqqdU7o+F0pVJb2O7qiRvqkfYdg9IJEmaxmg=
---
# IoBroker Image for Rock64 with Stretch 20190730
This is a minimal SD card image for the Rock64. It is suitable for 4 GB cards and larger. Since it already only fits on a 2 GB card, 4 GB is the recommended minimum size. 16 GB cards or larger are recommended anyway so that the same cells are not always written to.

The image is unpacked and then written to the SD card using the Balena Etcher program.
This is available for various operating systems.

The image contains Armbian 5.90, based on Debian “Stretch” from June 28, 2019 after download from [https://dl.armbian.com/rock64/Debian_stretch_default.7z](https://dl.armbian.com/rock64/Debian_stretch_default.7z).

The following users are created:

- **User:** `root`, **Password:** 1234
- **User:** `pi`, **Password:** `raspberry`

Furthermore, node-js v 10.16..0 is installed as well as of course iobroker with the js-controller as of July 30, 2019.

**Only the admin and discovery adapters** are preinstalled and instances have been created for them.
The creation of additional adapters and their instances is described in [here](/tutorial/adapter.md)

-----------------

*This documentation reflects the status at the time the image was created. Updates may result in changes.*

The image is localized for Germany. If used in other environments, please adapt accordingly. (armbian-config; Personal)

## After the first start
If you are not prompted to create a new password for root and a new user after starting Rock for the first time, please proceed as follows for security reasons:

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

Since some time may have passed since the image was created at the time of download, you should first check whether there are any updates for the already installed adapters and the js-controller (see Hosts tab)

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