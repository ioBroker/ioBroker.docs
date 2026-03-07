---
title: Update NodeJS
lastChanged: 04.10.2025
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/install/updatenode.md
hash: 6RUWTdFc8Gx0Oh983zD6Bll/WAeCUCD7b80X91zFBNo=
---
# Node.js Update
| js controller | Node.js | npm |
| ------ | ----------- | ------------- |
| < 4.x | 12.x, 14.x, 16.x | 6.x |
| 4.x | 12.x, 14.x, 16.x | 6.x, 7.x, 8.x |
| 5.x | 16.x, 18.x, 20.x | 8.x, 9.x |
| **6.x** | **18.x, 20.x, 22.x** | **8.x, 9.x, 10.x** |
| **7.x** | **18.x, 20.x, 22.x, (24.x)** | **8.x, 9.x, 10.x, 11.x** |

## Why is this update necessary?
ioBroker won't work without Node.js; see [architecture](https://www.iobroker.net/#de/documentation/basics/architecture.md) for details.

For more information about Node.js, see [Wikipedia Node.js](https://de.wikipedia.org/wiki/Node.js).

As is typical with many open-source technologies, Node.js is evolving rapidly.

Updates that improve **stability** and **security**, or even add **new features**, are released regularly.

Node.js 22.x is the current recommended version for ioBroker installations. This version has been in Active Long Term Support (LTS) status since October 2024 and will be supported until April 2027.

The ioBroker community has officially recommended this version, and the command `iob nodejs-update` automatically installs the recommended version.

Node.js 24.x is slated for Long Term Support (LTS) promotion in October 2025 and will then be supported until April 2028.

While this version is already available, it will only be recommended for production environments after the LTS promotion.

**When upgrading Node.js versions, certain prerequisites must be checked and corrected beforehand if necessary.

It is important to pay attention to the installation paths.**

**Important Notice October 2025:** Node.js 18.x has been end-of-life since April 2025 and will no longer receive security updates. **Node.js 22.x is the currently recommended LTS version** and should be used.

#### Recommended Update Methods
The simplest method for existing ioBroker installations is the integrated update command:

```
iob nodejs-update
```

### Procedure
#### 1 - Check the circumstances
- Version and path
- Operating system
- js-controller
- Adapter

<details><summary>Why is it necessary to check?</summary>

To ensure that all components are compatible with the new Node.js version and that the installation works correctly. Different JS controller versions support different Node.js versions, and not all adapters are automatically compatible with newer versions.

- which version and, most importantly, in which directory is the installation located
- In the Raspberry Pi environment, older systems based on "Debian Jessie" or "Debian Wheezy" are still commonly used. For these, there is no version higher than Node.js 10; an operating system update might be possible.
- Check which js-controller version is installed (also visible on the Host tab in the Admin panel). For versions **prior** to js-controller 3.x, please update js-controller first if possible. Ideally to at least version 3.2!

For example, there is this [Contribution](https://forum.iobroker.net/topic/42385/js-controller-3-2-jetzt-im-stable) in the forum.

To avoid incompatibilities or problems after the update, you should check all adapters on the system and update them if necessary.

It is best to check the adapter readme files via admin, in the changelog, or in the GitHub of the respective adapter to see if the installed adapter versions explicitly support the planned Node.js version.

</details>

#### 2 - Create backup
Before making any changes to the system, a backup must be created. Depending on the system, there are various options. The BackitUp adapter or using [Command line command](https://www.iobroker.net/#de/documentation/config/cli.md) is recommended. The backup should be recent to minimize data loss.

#### 3 - Update adapter
The adapters used in the system should be compatible with the new Node.js version; they may need to be updated.

#### 4 - Stop ioBroker
ioBroker can be stopped using its own console command or via system service management.

#### 5 - Check if any processes are still running
This usually terminates all processes. However, to be on the safe side, you should double-check that no processes (adapters, backups) are still running. You can also use a tool like "top" to check if any processes still exist that begin with "io.".

#### 6 - Node.js Update
The next step is to update Node.js to the desired new version. However, the update process differs depending on the installed operating system; see the instructions.

The Node Package Manager, abbreviated `npm`, is also automatically updated.

#### 7 - Check version and paths
After the update is complete, the paths and installed versions are checked again.

#### 8 - Run ioBroker fixer
Since installing Node.js, as mentioned earlier, makes some changes to the system, it is necessary to run [ioBroker fixer](https://www.iobroker.net/#de/documentation/trouble/install_fixer.md) afterwards. This restores, among other things, the security settings required for ioBroker to function and checks and corrects all permissions.

#### 9 - Starting ioBroker
Some JavaScript modules contain components that need to be compiled. This process occurs during installation. Compiling these modules binds them to the Node.js version. After an update, these components must therefore be recompiled. Since js-controller version 3.0, an attempt is made to detect adapters containing such components and automatically perform a rebuild. This process can take some time, and the affected adapters may restart multiple times. This can be observed in the log file. The easiest way to do this is in a terminal using the command ``iob logs --watch | uniq``.

<details><summary>Automatic Rebuilds</summary>

Since js-controller 3.0, adapters with native modules are automatically detected and a rebuild is performed automatically. This can be monitored in the log and takes a few minutes depending on the system.

ioBroker automatically attempts to identify adapters that are not starting because they need to be updated. This works by recognizing typical error messages and attempting the corresponding update. First, a rebuild of the affected adapter is performed. If that doesn't resolve the issue, the adapter's dependencies are updated. Therefore, the adapter may restart multiple times. Please be patient! Only take action if the adapter remains permanently red and the log indicates that the rebuild failed.

</details>

<details><summary>Manual Rebuilds</summary>

If the automatic rebuild fails, a manual rebuild of all adapters can be performed:

```bash
iobroker rebuild
```

Or with a complete reinstallation:

```bash
iobroker rebuild --install
```

If an automatic rebuild has not worked, it can be performed manually; see Troubleshooting.

</details>

<details><summary>Special cases (e.g. serial port)</summary>

Some adapters, such as the serial port adapter, require special handling. These may need to be manually reinstalled.

```bash
iob install serialport
```

Unfortunately, there are special cases where even the above options do not complete the rebuild; one of these is Serialport.

A log file might look like this (even after all rebuild attempts).

There are other error messages as well, but they all boil down to the same thing.

The simplest option is then to rebuild manually in the **correct** directory.

In that case, look for the directory containing "bindings" - above, it's */opt/iobroker/node_modules/serialport/node_modules/bindings...* In newer versions, it might be something like */opt/iobroker/node_modules/serialport/node_modules/@serialport/bindings*.

Then change to this directory and execute `npm install --omit=dev`. Afterwards, restart the adapter.

Another case involves adapters with a canvas module (e.g., echarts or Mihome-vacuum) where problems can occur.

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
v22.x.x
v22.x.x
10.x.x
10.x.x
0.x.x
```

Important: nodejs is located in /usr/bin, node is located in /usr/bin, npm is located in /usr/bin, npx is located in /usr/bin, corepack is located in /usr/bin, and the version numbers of nodejs and node, as well as of npm and npx, are identical.

#### 2 - Backup
```
iobroker backup
```

- alternative [options](https://www.iobroker.net/#de/documentation/config/backup.md)

#### 3 - Update adapter
Instructions can be found under [Manage adapters](https://www.iobroker.net/#de/documentation/tutorial/adapter.md)

```bash
iob update
```

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

- if processes are still ongoing

```
sudo kill -9 [PROZESS-ID]
```

Or to terminate all ioBroker processes:

```bash
sudo pkill -f iobroker
sudo pkill -f "io\."
```

#### 6 - Node.JS Update
**Method A: ioBroker's own update command (Recommended for 2025)**

```bash
# Direktes Update auf empfohlene Version (22.x)
iob nodejs-update

# Oder spezifische Version
iob nodejs-update 22
```

**Method B: NodeSource Repository**

- Details about [Node.js](https://github.com/nodesource/distributions#installation-instructions)

```
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
```

- For other Node.js versions, simply replace `22` in the URL with the other version number.

**As of October 2025, version 22.x of Node.js is recommended for ioBroker!**

!> **Odd-numbered Node.js versions must not be used.**

!> **Node.js 18.x is end-of-life (since April 2025) and should no longer be used.**

#### 7 - Check version/path
```
type -p nodejs node npm npx corepack && nodejs -v && node -v && npm -v && npx -v && corepack -v
```

#### 8 - Execute iobroker fixer
```
iobroker fix
```

#### 9 - Starting ioBroker
```
iobroker start
```

## Instructions for Windows
Node.js is updated by running the Windows Installer.

**Recommended steps for Windows (2025):**

1. Download the latest Node.js Windows Installer from [nodejs.org](https://nodejs.org) (version 22.x LTS)
2. **Stop ioBroker** via Services Manager or command line
3. **Run the installer** (automatic update)
4. **Run ioBroker Fixer:** `iobroker fix`
5. **Start ioBroker**

**Alternative for Windows:** Use Windows Subsystem for Linux (WSL2) with Ubuntu and then follow the Linux instructions.

## Docker Guide
- Node.js is usually updated by updating the container to a new version of the Docker image.
- Detailed instructions and further details about the iobroker container can be found at [buanet](https://docs.buanet.de/).

## Problem solving
### Manual Rebuild
- There is information on this.

```
iobroker rebuild
```

- if that's not enough

```
iobroker rebuild --install
```

- Simply execute it manually at the shell. Ideally, this should automate everything.

This command performs a complete reinstallation of all Node modules and should resolve most problems after a Node.js update.

### Common Problems (2025)
**"nodejs is NOT correctly installed"**

```bash
# Lösung: Fixer ausführen
iobroker fix

# Falls das nicht hilft, Node.js neu installieren
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
```

**NPM error after update**

```bash
# NPM Cache leeren
npm cache clean --force

# Node modules neu installieren
cd /opt/iobroker
rm -rf node_modules
npm install
```

**Adapters don't work after update**

```bash
# Einzelne Adapter neu installieren
iob install [ADAPTER-NAME]

# Oder alle Adapter rebuilden
iobroker rebuild --install
```

**Permission Issues**

```bash
# Berechtigungen korrigieren (Linux)
sudo chown -R iobroker:iobroker /opt/iobroker
iobroker fix
```

### Diagnostic Commands
```bash
# Umfassende Systemdiagnose
iob diag

# Node.js Installation prüfen
which node
which npm
ls -la $(which node)
node -v
npm -v

# ioBroker Status
iob status
iob list instances
```

As long as the JS controller is lower than version 4, even during a Node.js update within a major version, the `[ioBroker fixer](https://www.iobroker.net/#de/documentation/install/linux.md)` command must be executed.

With the future JS controller version 4, rebuilds will be handled fully automatically.