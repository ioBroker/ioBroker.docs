---
title: Update NodeJS
lastChanged: 29.10.2022
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/install/updatenode.md
hash: oazpYy+PiXB6o3KoKB2y5HvacmA17vhc6tJYAJKDIyk=
---
# Node.js update
| js controller | Node.js | npm |
| ------ | ----------- | ------------- |
| < 4.x | 12.x, 14.x, 16.x | 6.x |
| 4.x | 12.x, 14.x, 16.x | 6.x, 7.x, 8.x |

## Why do you have to update this?
As is common with many open source technologies, Node.js is evolving rapidly.
Updates that increase **stability** and **security** or even add **new features** appear regularly.

ioBroker does not work without Node.js, see [architecture](https://www.iobroker.net/#de/documentation/basics/architecture.md) for details.
If you want to learn more about Node.js, [Wikipedia Node.js](https://de.wikipedia.org/wiki/Node.js).

?> **In the case of a Node.js version change, certain requirements must be checked and corrected in advance if necessary.
It is important to note the paths in which the installation is located.**

### Method
#### 1 - Check conditions
- version and path
- operating system
- js controller
- Adapters

<details><summary>Why does it need to be checked?</summary>

- which version and, above all, in which directory is the installation located

- In the Raspi environment, older systems based on "Debian jessie" or "Debian wheezy" are often used. There is nothing higher than Nodejs 10 for them, an operating system update would be possible if necessary.

- Check which js-controller version is installed (also visible on the host tab in the admin).

For versions **before** js-controller 3.x, please update the js-controller first if possible. Best on at least 3.2! For example, there is this [contribution](https://forum.iobroker.net/topic/42385/js-controller-3-2-jetzt-im-stable) in the forum.

- To ensure that there are no incompatibilities or problems after the update, you should check all adapters on the system and update them if necessary.

It is best to check the adapter readme via admin, in the changelog, or in the GitHub of the respective adapter to see whether the installed adapter versions explicitly support the planned Node.js version.

</details>

#### 2 - Create backup
Before any changes are made to the system, a backup must be created. Depending on the system, there are different options. The BackitUp Adapter or the command line command is recommended.
The backup should be up-to-date so that no data is lost.

#### 3 - Update Adapter
The adapters used in the system should be compatible with the new Node.js version, if necessary they must be updated.

#### 4 - Stop ioBroker
ioBroker is stopped using its own console command or system service management

#### 5 - Check if processes are still running
This usually terminates all processes. To be on the safe side, you should check again that there are really no processes (adapters, backups) running. You can also use a tool like "top" to check whether there are still processes that start with "io." start.

#### 6 - Node.js update
The next step is to update Node.js to the desired new version.
However, the update differs depending on the installed operating system, see instructions

?> The Node Package Manager, abbreviated to `npm`, is also updated, this may have to be reset to npm v6.x up to js-controller version 3, depending on the Node.js version used. Starting with js-controller version 4, npm v7/8 is also supported.

#### 7 - Check version and paths
After the update is complete, the paths and installed versions are checked again.

#### 8 - Run ioBroker fixer
Since the installation of Node.js, as mentioned at the beginning, makes some changes to the system, it is necessary to run the ioBroker fixer afterwards.
Among other things, this restores the security settings required for the operation of ioBroker and checks and corrects all authorizations.

#### 9 - Start ioBroker
Some JavaScript modules used contain parts that have to be compiled. This process takes place during installation.
By compiling these modules are bound to the Node.js version. After the update, these parts must therefore be recompiled.
Since js-controller version 3.0, an attempt is made to recognize adapters that contain such parts and to automatically carry out a rebuild.
This process can take some time and the affected adapters can restart multiple times.

<details><summary>Automatic rebuilds</summary>

ioBroker tries to automatically detect adapters that don't start because they need to be updated. This works in such a way that the typical error messages are recognized and ioBroker tries to update accordingly. First, a "rebuild" of the affected adapter is performed, if that doesn't help, the adapter dependencies are updated. It is therefore possible that the adapter restarts several times. Please be patient here! Only become active when the adapter stays red and the log says that the rebuild didn't work!

</details>

<details><summary>Manual rebuilds</summary>

If an automatic rebuild did not work, it can be carried out manually, see Troubleshooting.

</details>

<details><summary>Special cases (e.g. serial port)</summary>

Unfortunately, there are special cases where the above options don't do the rebuild either, one of which is serial port.

A log can look like this (even after all rebuild attempts).

<details><summary>LOG</summary>

![LOG](../../de/install/media/Log-Update_NodeJS.jpg)

</details>

There are also other error messages, but they all boil down to the same thing.
The easiest option is then to manually rebuild in the **correct** directory.
In that case look for the directory with "bindings" - above it is */opt/iobroker/node_modules/serialport/node_modules/bindings ...* on newer versions it can also be something like */opt/iobroker/node_modules/serialport/node_modules /@serialport/bindings*.

Then switch to this directory and execute `npm install --production`. Then restart the adapter again.

Another case are adapters with canvas module (possibly echarts or Mihome-vacuum) where there can be problems.

</details>

## Guide for Debian/Ubuntu
#### 1 - Check version and path
```
which nodejs node npm && nodejs -v && node -v && npm -v
```

- Output

```
/usr/bin/nodejs
/usr/bin/node
/usr/bin/npm
v14.18.3
v14.18.3
6.14.15
```

#### 2 - Backup
```
iobroker backup
```

- alternative [possibilities](https://www.iobroker.net/#de/documentation/config/backup.md)

#### 3 - Update Adapter
- Instructions can be found under [Manage adapters](https://www.iobroker.net/#de/documentation/tutorial/adapter.md)

#### 4 - Stop ioBroker
```
iobroker stop
```

#### 5 - Check ioBroker processes
```
ps aux | grep 'io\|PID'
```

- and

```
ps aux | grep 'backup\|PID'

```

- if processes are still running

```
sudo kill -9 <ProzessID>
```

#### 6 - Node.JS update
- Details on [Node.Js](https://github.com/nodesource/distributions#installation-instructions)

```
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs
```

- For other Node.js versions simply replace the 16 in the URL with the other version number.

!> As of October 2022, version 16 of Node.js is recommended for ioBroker!

!> Odd Node.js versions may not be used.

#### 7 - Check version/path
```
which nodejs node npm && nodejs -v && node -v && npm -v
```

#### 8 - Run iobroker fixer
```
iobroker fix
```

#### 9 - Start ioBroker
```
 iobroker start
 ```

## Instructions for Windows
#### 1 - Check version (Windows key + R)
```
cmd.exe /C node -v & pause
```

#### 2 - Backup
```
iobroker backup
```

- alternative [possibilities](https://www.iobroker.net/#de/documentation/config/backup.md)

#### 3 - Update Adapter
- Instructions can be found under [Manage adapters](https://www.iobroker.net/#de/documentation/tutorial/adapter.md)

#### 4- Backup of folder:
```
C:\Program Files\iobroker\deinhostname\nodejs
```

#### 5 - stop iobroker
```
iobroker stop
```

#### 6 - Node.js update
- Download [Node.js](https://nodejs.org) as an archive, not as an msi file
- Unzip the download and copy the entire folder over the existing folder:

```
C:\Program Files\iobroker\deinhostname\nodejs
```

- Copy the **nodevars.bat** file from the backup copy back to the folder:

```
C:\Program Files\iobroker\deinhostname\nodejs
```

#### 7 - Check version
```
cmd.exe /C node -v & pause
```

#### 8 - Run iobroker fixer
```
iobroker fix
```

#### 9 - Start ioBroker
```
iobroker start
```

## Instructions for Docker
- Node.js is usually done by updating the container to a new version of the [Docker Image](https://hub.docker.com/r/buanet/iobroker/tags).
- A detailed procedure and further details on the iobroker container can be found at [buanet](https://smarthome.buanet.de/2020/10/iobroker-docker-container-updates-upgrades/).

## Troubleshooting
### Manual rebuild
- For this there is

```
iobroker rebuild <adaptername>
```

- if that's not enough

```
iobroker rebuild <adaptername> --install
```

- just run it manually at the shell. Ideally, everything should be done automatically.

?> As long as the js controller is lower than version 4, the [ioBroker fixer](https://www.iobroker.net/#de/documentation/install/linux.md) must also be executed with a Node.js update within a major version.
With the future js controller in version 4, rebuilds are handled fully automatically.
A manual rebuild is then no longer supported.