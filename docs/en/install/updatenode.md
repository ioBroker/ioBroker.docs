---
title: Update NodeJS
lastChanged: 09.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/install/updatenode.md
hash: spIj11/tZoz1oXvUP0RBUpJQaCBUTljoe/g9uZhcDB8=
---
# Node.js Update

| js-controller | Node.js                      | npm                      |
| ------------- | ---------------------------- | ------------------------ |
| < 4.x         | 12.x, 14.x, 16.x             | 6.x                      |
| 4.x           | 12.x, 14.x, 16.x             | 6.x, 7.x, 8.x            |
| 5.x           | 16.x, 18.x, 20.x             | 8.x, 9.x                 |
| **6.x**       | **18.x, 20.x, 22.x**         | **8.x, 9.x, 10.x**       |
| **7.x**       | **18.x, 20.x, 22.x, (24.x)** | **8.x, 9.x, 10.x, 11.x** |

## Why is it necessary to update this?

ioBroker does not work without Node.js; details can be found here. [architecture](/docs/basics/architecture.md).\
For those who want to learn more about Node.js, [Wikipedia Node.js](https://de.wikipedia.org/wiki/Node.js).

As is common with many open-source technologies, Node.js is evolving rapidly.\
Updates that **stability** and **Security** increase, or even **new features** Add them, they appear regularly.

Node.js 22.x is the current recommended version for ioBroker installations. This version has been in Active LTS status since October 2024 and will be supported until April 2027. The ioBroker community has officially recommended this version, and the **iob nodejs-update** The command automatically installs the recommended version.

Node.js 24.x has also been LTS since October 2025 and will be supported until April 2028. It works, but is not yet the general recommendation: Until all adapters have been tested for it, 22.x remains the safer option.

?> **When switching Node.js versions, certain prerequisites must be checked and corrected in advance if necessary.\
It is important to pay attention to the paths in which the installation is located.**

Node.js 18.x has been end-of-life since April 2025 and no longer receives security updates. **Node.js 22.x is the recommended LTS version.** The admin interface from version 8 onwards requires Node.js 22 anyway.

#### Recommended update methods

The simplest method for existing ioBroker installations is the integrated update command:

```
iob nodejs-update
```

### Procedure

#### 1 - Check the circumstances

- Version and path
- operating system
- js-controller
- adapter

<details>
<summary>Warum muss geprüft werden</summary>

To ensure that all components are compatible with the new Node.js version and that the installation works correctly. Different JS controller versions support different Node.js versions, and not all adapters are automatically compatible with newer versions.

- Which version and, most importantly, in which directory is the installation located?
- In the Raspberry Pi environment, older systems based on "Debian Jessie" or "Debian Wheezy" are still commonly used. For these, there is no version higher than Node.js 10; an operating system update might be possible.
- Check which js-controller version is installed (also visible on the Host tab in the Admin panel). For versions **before** js-controller 3.x; if possible, please update the js-controller first. Ideally to at least version 3.2!\
  For example, there is this forum post on this topic. [Contribution](https://forum.iobroker.net/topic/42385/js-controller-3-2-jetzt-im-stable).
- To avoid incompatibilities or problems after the update, you should check all adapters on the system and update them if necessary.\
  It is best to check the adapter readme files via admin, in the changelog, or in the GitHub of the respective adapter to see if the installed adapter versions explicitly support the planned Node.js version.

</details>

#### 2 - Create a backup

Before making any changes to the system, a backup must be created. Depending on the system, there are various options. The BackitUp adapter is recommended, or alternatively... [Command line command](/docs/config/cli.md)The backup should be up-to-date to minimize data loss.

#### 3 - Update adapter

The adapters used in the system should be compatible with the new Node.js version; they may need to be updated.

#### 4 - Stop ioBroker

ioBroker can be stopped using its own console command or via system service management.

#### 5 - Check if any processes are still running

This usually terminates all processes. However, to be on the safe side, you should double-check that no processes (adapters, backups) are still running. You can also use a tool like "top" to check if any processes still exist that begin with "io.".

#### 6 - Node.js Update

The next step is to update Node.js to the desired new version. However, the update process differs depending on the installed operating system; see the instructions.

The Node Package Manager, or Node Package Manager for short `npm`, is also automatically updated.

#### 7 - Check version and paths

After the update is complete, the paths and installed versions are checked again.

#### 8 - Run ioBroker fixer

Since the installation of Node.js, as mentioned at the beginning, makes some changes to the system, it is necessary afterwards to... [ioBroker fixer](/docs/trouble/install_fixer.md) This process restores the security settings necessary for the operation of ioBroker and checks and corrects all permissions.

#### 9 - Start ioBroker

Some JavaScript modules contain components that need to be compiled. This process occurs during installation. Compiling these modules binds them to the Node.js version. After an update, these components must therefore be recompiled. Since js-controller version 3.0, an attempt is made to detect adapters containing such components and automatically perform a rebuild. This process can take some time, and the affected adapters may restart multiple times. This can be observed in the log file. The easiest way to do this is in a terminal using... `iob logs --watch | uniq`.

<details>
<summary>Automatische Rebuilds</summary>

Since js-controller 3.0, adapters with native modules are automatically detected and a rebuild is performed automatically. This can be monitored in the log and takes a few minutes depending on the system.

ioBroker automatically attempts to identify adapters that are not starting because they need to be updated. This works by recognizing typical error messages and attempting the corresponding update. First, a rebuild of the affected adapter is performed. If that doesn't resolve the issue, the adapter's dependencies are updated. Therefore, the adapter may restart multiple times. Please be patient! Only take action if the adapter remains permanently red and the log indicates that the rebuild failed.

</details>

<details>
<summary>Manuelle Rebuilds</summary>

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

<details>
<summary>Sonderfälle (z.B. Serialport)</summary>

Some adapters, such as the serial port adapter, require special handling. These may need to be manually reinstalled.

```bash
iob install serialport
```

Unfortunately, there are special cases where even the above options do not complete the rebuild; one of these is Serialport.

A log file might look like this (even after all rebuild attempts).

There are other error messages as well, but they all boil down to the same thing. The simplest option is then to do it manually in **correct** Rebuild the directory. In that case, find the directory containing "bindings" - it's at the top. _/opt/iobroker/node\_modules/serialport/node\_modules/bindings ..._ In newer versions, it might also be something like... _/opt/iobroker/node\_modules/serialport/node\_modules/@serialport/bindings_ be.

Then change to this directory and `npm install --omit=dev` Run the command. Then restart the adapter.

Another case involves adapters with a canvas module (e.g., echarts or Mihome-vacuum) where problems can occur.

</details>

## Instructions for Debian/Ubuntu

#### 1 - Check version and path

```
sudo ln -s /usr/bin/node /usr/bin/nodejs &> /dev/null
type -p nodejs node npm npx corepack && nodejs -v && node -v && npm -v && npx -v && corepack -v
```

- output

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

- alternative [Possibilities](/docs/config/backup.md)

#### 3 - Update adapter

- Instructions can be found at [Manage adapters](/docs/tutorial/adapter.md)

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

- For other Node.js versions, simply add the following to the URL: `22` replace it with the other version number.

!> **As of October 2025, version 22.x of Node.js is recommended for ioBroker!**

!> **Odd-numbered Node.js versions must not be used.**

!> **Node.js 18.x is end-of-life (since April 2025) and should no longer be used.**

#### 7 - Check version/path

```
type -p nodejs node npm npx corepack && nodejs -v && node -v && npm -v && npx -v && corepack -v
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

Node.js is updated by running the Windows Installer.

**Recommended steps for Windows (2025):**

1. **Latest Node.js Windows Installer** from [nodejs.org](https://nodejs.org) Download (Version 22.x LTS)
2. **Stop ioBroker** via services management or command line
3. **Run installer** (automatic update)
4. **Run ioBroker Fixer:** `iobroker fix`
5. **Start ioBroker**

**Alternative for Windows:** Install Windows Subsystem for Linux (WSL2) with Ubuntu and then follow the Linux instructions.

## Docker tutorial

- Node.js is typically updated by updating the container to a new version of the Docker image.
- Detailed instructions and further details about the iobroker container can be found at [buanet](https://docs.buanet.de/) to find.

## Problem solving

### manual rebuild

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

### Common problems (2025)

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

**Permission problems**

```bash
# Berechtigungen korrigieren (Linux)
sudo chown -R iobroker:iobroker /opt/iobroker
iobroker fix
```

### Diagnostic commands

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

As long as the JS controller is lower than version 4, even a Node.js update within a major version requires... [ioBroker fixer](/docs/install/linux.md) be carried out.\
With the future js-controller in version 4, rebuilds will be handled fully automatically.