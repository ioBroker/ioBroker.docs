---
title: Requirements
lastChanged: 29.05.2024
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/install/requirements.md
hash: Ab61xnvzrI3CtMuqVvsbYXq8pqtfYIs0/gcoaX1cIBg=
---
# System requirements

## System requirements

| operating system                              | Variants                                                       | Hardware environments (e.g.)                                                                        | Minimum requirements for ioBroker               | Recommended resources for ioBroker (2)                      |
| --------------------------------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ----------------------------------------------------------- |
| [Linux distributions](/docs/install/linux.md) | Recommendation: Debian including corresponding derivatives (1) | Raspberry Pi, single-board computer, mini-PC (e.g. NUC), hardware with a virtualization environment | 2 GB RAM, 32 GB storage capacity                | >= 4 GB (better 6 GB - 8 GB) RAM, >= 64 GB storage capacity |
| [docker](/docs/install/docker.md)             |                                                                | Mini-PC (e.g. NUC), NAS (3)                                                                         | 2 GB RAM, 32 GB storage capacity                | >= 4 GB (better 6 GB - 8 GB) RAM, >= 64 GB storage capacity |
| [Windows](/docs/install/windows.md)           |                                                                | PC, Mini-PC (e.g. NUC)                                                                              | 4 GB RAM, 50 GB storage capacity (including OS) | 8 GB RAM, 100 GB storage capacity (including OS)            |

(1) It is recommended to install ioBroker on a Debian/Ubuntu-based Linux distribution (server version without a desktop environment!). Installation on other Linux distributions is generally possible (as long as the valid Node.js version is supported) but requires expert knowledge, as the standard installation/maintenance scripts and instructions are tailored to Debian.

(2) These values are based on experience from a typical average installation of an ioBroker system with \~40 active adapters, Grafana and an external database

(3) For installation on a NAS, the requirements under Docker apply, plus additional resources for the NAS's own tasks.

### Generally

- ioBroker can be installed on all systems where Node.js is available.
- The required RAM and storage capacity increase if, for example, data points are historized (e.g., with the History Adapter which stores text files on the system) or if databases such as Influx or MySQL or other applications are additionally installed and run on this system.
- When selecting hardware, pay attention to its power consumption, as ioBroker will run around the clock (24/7 operation). Even a small difference in wattage will add up over the course of a year.