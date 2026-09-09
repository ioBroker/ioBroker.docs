---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/faq/_020_installation/020_iobroker.md
title: no title
hash: kwfPhtBV8XuVrlDlYH6zK2hTmhGFNG5hHIZjGel4S/Y=
---
## How do I install ioBroker?

The method depends on the operating system:

| system                                      | Away                                                                                         |
| ------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **Linux** (Debian, Ubuntu, Raspberry Pi OS) | The normal procedure. One command, done: [Installation under Linux.](/docs/install/linux.md) |
| **docker**                                  | If a Docker host or NAS is already available: [Docker](/docs/install/docker.md)              |
| **Proxmox**                                 | If ioBroker is to run alongside other services: [Proxmox](/docs/install/proxmox.md)          |
| **Windows**                                 | [Windows](/docs/install/windows.md)                                                          |
| **macOS**                                   | For testing and development purposes only: [macOS](/docs/install/macos.md)                   |

Under Linux, the following is sufficient:

```bash
curl -sLf https://iobroker.net/install.sh | bash -
```

After that, the admin is under`http://<IP-Adresse>:8081` reachable.

For those who are unsure: Debian without a graphical user interface on a mini-PC with an SSD is the path with the fewest surprises.