---
title: Entry
lastChanged: 07.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/install/README.md
hash: H6BCY9CKu61Z1VIi5OAI3eSsm8YqTU/dWCUpDwiLMqA=
---
# Install ioBroker

ioBroker is a server. It runs around the clock, waits for events, and controls devices – even when no one is using it. Therefore, the installation consists of two decisions: **whereupon** he should run and **How** it is installed there.

This chapter goes through both of them in order.

## The path through this chapter

1. [Requirements](/docs/install/requirements.md) - what the system must provide: RAM, space, operating system.
2. [Hardware](/docs/install/hardware.md) - which device is useful and what pitfalls exist.
3. The installation itself, depending on the chosen method (see below).
4. [Update](/docs/install/update.md) - which needs to be done regularly later on.

## The routes at a glance

| Away                                | For what                                                                  | Expense      |
| ----------------------------------- | ------------------------------------------------------------------------- | ------------ |
| [Linux](/docs/install/linux.md)     | The typical scenario: Debian, Ubuntu, Raspberry Pi OS. One command, done. | small amount |
| [docker](/docs/install/docker.md)   | If a Docker host or NAS is already available.                             | medium       |
| [Proxmox](/docs/install/proxmox.md) | When ioBroker is to run on a server alongside other services.             | higher       |
| [Windows](/docs/install/windows.md) | If no Linux device is available.                                          | small amount |
| [macOS](/docs/install/macos.md)     | For development and testing purposes only.                                | -            |

?> **To start: Linux without an intermediate layer.** Debian, Ubuntu, or Raspberry Pi OS in the server version, with the installation script on top. Each additional layer—Docker, a virtualization platform—brings its own quirks, which can stand between the problem and the solution in case of an error. Migrating is possible at any time later; a backup can be transferred from any of these methods to any of the others.

## The installation command

On all Linux systems, it is the same single command:

```bash
curl -sLf https://iobroker.net/install.sh | bash -
```

It downloads missing packages, installs a suitable Node.js version, and configures the user. `iobroker` Node.js must therefore be installed and set up the service. **not**
must be installed manually beforehand.

!> The script is considered **normal user** executed, not as `root` and not with `sudo`The user under whose account it runs manages the system later. Details are available at \[link/reference].
[Linux](/docs/install/linux.md).

## Finished Images

For Raspberry Pi and some single-board computers, there used to be ready-made images with ioBroker pre-installed. These are no longer maintained – the operating systems they contained have lacked security support for years. The current method is to install a current operating system yourself, then run the installation script.

## After installation

The interface can be accessed in the browser at `http://<adresse-des-servers>:8081`From there, we continue:

- [Admin interface](/docs/admin/README.md) - how the administration is structured
- [Adapter and instance](/docs/basics/adapter.md) - how devices and services are connected
- [Security](/docs/config/backup.md) - Set up the first backup before the initial configuration has taken any work.

## If it doesn't work

- [ioBroker is no longer working](/docs/trouble/RunsNoMore.md)
- [Adapter error](/docs/trouble/adapter.md)
- The command `iob diag` summarizes the state of the system and is the first thing to consider in the [forum](https://forum.iobroker.net) is asked.