---
title: Requirements
lastChanged: 29.05.2024
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/install/requirements.md
hash: 0SDPNkhMUyCEtqFOGE+3l6j7Za3NFKtqDnBSLzma3jY=
---
## System requirements
| Operating system | Variants | Hardware environments (e.g.) | Minimum requirements for ioBroker | Recommended resources for ioBroker (2)

| --------- | --------- | --------- | --------- | --------- |
| Linux distributions | Recommendation: Debian including corresponding derivatives (1) | Raspberry PI, single-chip computer, mini-PC (e.g. NUC), hardware with a virtualization environment | 2 GB RAM, 32 GB storage capacity | >= 4 GB (better 6 GB - 8 GB) RAM, >= 64 GB storage capacity | Docker | | Mini-PC (e.g. NUC), NAS (3) | 2 GB RAM, 32 GB storage capacity | >= 4 GB (better 6 GB - 8 GB) RAM, >= 64 GB storage capacity | Windows | | PC, mini-PC (e.g. NUC)| 4 GB RAM, 50 GB storage capacity (incl. OS) | 8 GB RAM, 100 GB storage capacity (incl. OS) |

(1) It is recommended to install ioBroker on a Debian/Ubuntu based Linux distribution (server version without desktop!). Installation on another Linux distribution is generally possible (as long as the valid Node.js version is supported) but requires expert knowledge, as the standard scripts for installation/maintenance and instructions are tailored to Debian

(2) These values are based on experience of a typical average installation of an ioBroker system with ~40 active adapters, Grafana and an external database

(3) For installation on a NAS, the requirements under Docker apply, plus additional resources for the NAS's own tasks.

### Generally
- ioBroker can be installed on all systems where Node.js is available.
- The required RAM and storage capacity increases if, for example, data points are historized (e.g. with the History Adapter which stores text files on the system) or if databases such as Influx or MySQL or other applications are additionally installed and operated on this system
- When selecting hardware, pay attention to the power consumption of the hardware, as ioBroker will run around the clock (24/7 operation). A few watts difference will make a noticeable difference in power consumption over the course of the year.