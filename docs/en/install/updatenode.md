---
title: Update NodeJS
lastChanged: 11.08.2023
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/install/updatenode.md
hash: tJGX8RGXf39O/2BqWaP41YGMCp6Gq1+N03L+zh/H5MI=
---
# Node.js Update
| js controller | Node.js | npm |
| ------ | ----------- | ------------- |
| < 4.x | 12.x, 14.x, 16.x | 6.x |
| 4.x | 12.x, 14.x, 16.x | 6.x, 7.x, 8.x |
| 5.x | 16.x, 18.x, 20.x | 8.x, 9.x |

## Why do you have to update this?
As is common with many open source technologies, Node.js is evolving rapidly.
Updates that increase **stability** and **security**, or even add **new features**, appear regularly.

ioBroker does not work without Node.js, details under [architecture](https://www.iobroker.net/#de/documentation/basics/architecture.md).
If you want to learn more about Node.js, [Wikipedia Node.js](https://de.wikipedia.org/wiki/Node.js).

?> **When changing the Node.js version, certain requirements must be checked and corrected in advance if necessary.
It is important to note the paths in which the installation is located.**

### Procedure
#### 1 - Check the circumstances
- Version and path
- operating system
- js-controller
- adapter

<details><summary>Why must it be checked</summary>

- which version and, above all, in which directory is the installation located

- In the Raspi environment, older systems based on "Debian jessie" or "Debian wheezy" are often used. For these, there is nothing higher than Nodejs 10, although an operating system update might be possible.

- Check which js-controller version is installed (also visible on the Host tab in the admin).

For versions **before** js-controller 3.x, please update the js-controller first if possible. Ideally to at least 3.2! There is an example of this [Contribution](https://forum.iobroker.net/topic/42385/js-controller-3-2-jetzt-im-stable) in the forum.

- To avoid incompatibilities or problems after the update, you should check all adapters on the system and update them if necessary.

It is best to check the adapter readme's via admin, in the changelog, or in the GitHub of the respective adapter to see whether the installed adapter versions explicitly support the planned Node.js version.

</details>

#### 2 - Create backup
Before making any changes to the system, a backup must be created. There are different options depending on the system. We recommend using the BackitUp adapter or a command line command.
The backup should be up to date so that as little data as possible is lost.

#### 3 - Update adapter
The adapters used in the system should be compatible with the new Node.js version; if necessary, they must be updated.

#### 4 - Stop ioBroker
ioBroker is stopped using its own console command or via system service management

#### 5 - Check if processes are still running
This usually terminates all processes. To be on the safe side, you should check again that no processes (adapters, backups) are running. You can also use a tool like "top" to check whether there are any processes that start with "io.".

#### 6 - Node.js Update
The next step is to update Node.js to the desired new version.
The update differs depending on the installed operating system, see instructions

?> The Node Package Manager, `npm` for short, is also updated. Depending on the Node.js version used, this may need to be reset to npm v6.x up to js-controller version 3. From js-controller version 4, npm v8.x/9.x is also supported.

#### 7 - Check version and paths
After the update is complete, the paths and installed versions are checked again.

#### 8 - Run ioBroker fixer
Since the installation of Node.js, as mentioned at the beginning, makes some changes to the system, it is necessary to run the ioBroker fixer afterwards.
Among other things, this restores the security settings necessary for the operation of ioBroker and checks and corrects all permissions.

#### 9 - Start ioBroker
Some JavaScript modules used contain parts that need to be compiled. This process takes place during installation.
By compiling, these modules are bound to the Node.js version. After an update, these parts must therefore be recompiled.
Since js-controller version 3.0, an attempt has been made to detect adapters that contain such parts and to automatically perform a rebuild.
This process can take some time and the affected adapters can restart several times. This can be observed in the log file. The easiest way to do this is in a terminal using ``iob logs --watch | uniq ``

<details><summary>Automatic rebuilds</summary>

ioBroker automatically tries to detect adapters that do not start because they need to be updated. This works by recognizing the typical error messages and ioBroker attempts to update them accordingly. First, a "rebuild" of the affected adapter is carried out; if that does not help, the adapter dependencies are updated. This means that the adapter may restart several times. Please be patient! Only take action when the adapter remains permanently red and the log also shows that the rebuild did not work!

</details>

<details><summary>Manual rebuilds</summary>

If an automatic rebuild does not work, it can be performed manually, see Troubleshooting.

</details>

<details><summary>special cases (e.g. serial port)</summary>

Unfortunately, there are special cases where even the above options do not complete the rebuild, one of them is Serialport.

There a log can look like this (even after all rebuild attempts)

<details><summary>LOG</summary>

![LOG](../../de/install/media/Log-Update_NodeJS.jpg)

</details>

There are also other error messages, but they all lead to the same thing.
The simplest option is to rebuild manually in the **correct** directory.
In this case, look for the directory with "bindings" - above it is */opt/iobroker/node_modules/serialport/node_modules/bindings ...* in newer versions it can also be something like */opt/iobroker/node_modules/serialport/node_modules/@serialport/bindings*.

Then change to this directory and execute `npm install --omit=dev`. Then restart the adapter again.

Another case is adapters with canvas modules (possibly echarts or Mihome-vacuum) where problems can arise.

</details>

## Instructions for Debian/Ubuntu
#### 1 - Check version and path
```
sudo ln -s /usr/bin/node /usr/bin/nodejs &> /dev/null
type -p nodejs node npm npx corepack && nodejs -v && node -v && npm -v && npx -v && corepack -v

```

- Edition

```
/usr/bin/nodejs
/usr/bin/node
/usr/bin/npm
/usr/bin/npx
/usr/bin/corepack
v18.15.0
v18.15.0
9.6.0
9.6.0
0.19.0
```

It is important: nodejs is in /usr/bin node is in /usr/bin npm is in /usr/bin npx is in /usr/bin corepack is in /usr/bin and the version numbers of nodejs and node as well as npm and npx are the same.

#### 2 - Backup
```
iobroker backup
```

- alternative [options](https://www.iobroker.net/#de/documentation/config/backup.md)

#### 3 - Update adapter
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

#### 6 - Node.JS Update
- Details about [Node.Js](https://github.com/nodesource/distributions#installation-instructions)

```
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

- For other Node.js versions simply replace 18 in the URL with the other version number.

!> As of March 2023, version 18 of Node.js is recommended for ioBroker!

!> Odd Node.js versions must not be used.

#### 7 - Check version/path
```
type -p nodejs node npm npx corepack && nodejs -v && node -v && npm -v && npx -v && corepack -v
```

#### 8 - run iobroker fixer
```
iobroker fix
```

#### 9 - Start ioBroker
```
 iobroker start
 ```

## Instructions for Windows
Node.js is updated by executing [Windows Installers](./windows.md).

## Instructions for Docker
- Node.js is usually done by updating the container to a new version of the [Docker image](https://hub.docker.com/r/buanet/iobroker/tags).
- A detailed procedure and further details about the iobroker container can be found at [buanet](https://smarthome.buanet.de/2020/10/iobroker-docker-container-updates-upgrades/).

## Problem solving
### Manual rebuild
- There are

```
iobroker rebuild <adaptername>
```

- if that is not enough

```
iobroker rebuild <adaptername> --install
```

- simply execute it manually in the shell. Ideally, this should do everything automatically.

?> As long as the js controller is lower than version 4, [ioBroker fixer](https://www.iobroker.net/#de/documentation/install/linux.md) must be executed even if a Node.js update is performed within a major version.

With the future js controller in version 4, rebuilds will be handled fully automatically.

A manual rebuild will then no longer be supported.