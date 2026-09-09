---
title: Linux
lastChanged: 08.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/install/linux.md
hash: +X40zUSH0cALgPn+1NOVaXKIOaPX3jE0JpNgcsW+wwg=
---
# Installing ioBroker on Linux

On a Linux system, including a Raspberry Pi, ioBroker is installed with a single command. A script checks the system, downloads any missing packages, installs a suitable Node.js version, creates the service, and starts it.

Node.js **does not** need to be installed manually beforehand. However, anyone who has already done so should consult the [Node.js](/docs/install/nodejs.md) documentation to determine which version is compatible.

## Check beforehand

Whether the hardware is sufficient and which systems are supported can be found under [Requirements](/docs/install/requirements.md) .

Five points where most installations fail:

- **Not as`root` Install.** The script will run as **a normal user** , without any modifications.`sudo` Before that. This user will manage the system later. He must not`iobroker` This means: the script creates this user itself.
- **No desktop.** Use the server version of the operating system. ioBroker runs 24/7 and is managed via the console; a graphical interface only consumes memory.
- **Debian or Ubuntu.** Or something based on them, such as Raspberry Pi OS or Armbian. Other distributions often work, but are hardly familiar to anyone in the forum.
- **No intermediate layer at the beginning.** Docker and Proxmox have their place, but every additional layer stands between the problem and the solution in case of an error. Migrating is always possible later via a backup.
- **Pay attention to the power supply when using a Raspberry Pi.** A weak power supply, such as an old mobile phone charger, can cause crashes that look like software errors but aren't.

## The installation

**1. Install the operating system** and update it to the latest version:

```bash
sudo apt update && sudo apt full-upgrade
```

**2. Install ioBroker:**

```bash
curl -sLf https://iobroker.net/install.sh | bash -
```

Missing`curl` , it will be installed beforehand:`sudo apt install curl` .

The script works in four visible steps and takes a few minutes depending on the device:

```
Installing prerequisites (1/4)
Creating ioBroker user and directory (2/4)
Installing ioBroker (3/4)
Finalizing installation (4/4)
```

The final result is:

```
ioBroker was installed successfully
Open http://localhost:8081 in a browser and start configuring!
```

**3. Access the interface.** From your own computer under`http://<adresse-des-servers>:8081` The address is that of the ioBroker computer, not...`localhost` , if the browser is running elsewhere.

## After installation

The command`iobroker` is only available after a **new login** . Those immediately after installation`iobroker` If you type in the command and see "command not found", log out and log back in. A shorter version also works.`iob` .

From here on:

- [The first steps](/docs/tutorial/setup.md) involve the initial setup.
- [Console commands](/docs/config/cli.md) for everything that doesn't go through the user interface.
- If something isn't working, [troubleshooting](/docs/trouble/README.md) will help.

## Other ways

| Away    | Where described                     |
| ------- | ----------------------------------- |
| docker  | [docker](/docs/install/docker.md)   |
| Proxmox | [Proxmox](/docs/install/proxmox.md) |
| Windows | [Windows](/docs/install/windows.md) |
| macOS   | [macOS](/docs/install/macos.md)     |