---
title: Entry
lastChanged: 07.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/install/README.md
hash: H6BCY9CKu61Z1VIi5OAI3eSsm8YqTU/dWCUpDwiLMqA=
---
# Install ioBroker

ioBroker is a server. It runs around the clock, waits for events, and controls devices – even when no one is using it. Therefore, the installation consists of two decisions: **where** it should run and **how** it should be installed there.

This chapter goes through both of them in order.

## The path through this chapter

1. [Requirements](/docs/install/requirements.md) - what the system must have: RAM, space, operating system.
2. [Hardware](/docs/install/hardware.md) - which device makes sense and what pitfalls to watch out for.
3. The installation itself, depending on the chosen method (see below).
4. [Update](/docs/install/update.md) - something that needs to be done regularly later on.

## The routes at a glance

| Away                                | For what                                                                  | Expense      |
| ----------------------------------- | ------------------------------------------------------------------------- | ------------ |
| [Linux](/docs/install/linux.md)     | The typical scenario: Debian, Ubuntu, Raspberry Pi OS. One command, done. | small amount |
| [docker](/docs/install/docker.md)   | If a Docker host or NAS is already available.                             | medium       |
| [Proxmox](/docs/install/proxmox.md) | When ioBroker is to run on a server alongside other services.             | higher       |
| [Windows](/docs/install/windows.md) | If no Linux device is available.                                          | small amount |
| [macOS](/docs/install/macos.md)     | For development and testing purposes only.                                | -            |

**For starters: Linux without any intermediate layers.** Debian, Ubuntu, or Raspberry Pi OS in the server version, with the installation script on top. Each additional layer—Docker, virtualization—brings its own quirks that can stand between the problem and the solution in case of an error. Migrating is always possible later; a backup can be transferred from any of these paths to any other.

## The installation command

On all Linux systems, it is the same single command:

```bash
curl -sLf https://iobroker.net/install.sh | bash -
```

It downloads missing packages, installs a suitable Node.js version, and configures the user.`iobroker` It connects and sets up the service. Node.js **does not** need to be installed manually beforehand.

The script will run as a **normal user** , not as a user account.`root` and not with`sudo` The user under whose account it runs manages the system later. Details can be found under [Linux](/docs/install/linux.md) .

## Finished Images

For Raspberry Pi and some single-board computers, there used to be ready-made images with ioBroker pre-installed. These are no longer maintained – the operating systems they contained have lacked security support for years. The current method is to install a current operating system yourself, then run the installation script.

## After installation

The interface can be accessed in the browser at`http://<adresse-des-servers>:8081` From there, we continue:

- [Admin interface](/docs/admin/README.md) - how the administration is structured
- [Adapters and instances](/docs/basics/adapter.md) - how devices and services are connected
- [Backup](/docs/config/backup.md) - set up the first backup before the initial configuration has taken any work.

## If it doesn't work

- [ioBroker is no longer working](/docs/trouble/RunsNoMore.md)
- [Adapter error](/docs/trouble/adapter.md)
- The command`iob diag` summarizes the state of the system and is the first thing people ask about in the [forum](https://forum.iobroker.net) .