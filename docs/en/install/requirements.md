---
title: Requirements
lastChanged: 21.10.2023
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/install/requirements.md
hash: fOD9aR7DqwJ/mZ8rYoZiXZBx5RwJO6UVv25NfMmoWAg=
---
## System requirements
| Operating system | Variants | Hardware environments (e.g.) | Minimum requirements for ioBroker | Recommended resources for ioBroker <sup>2</sup>

|---|:---------:|:---------:|:---------:|:-------- -:| Linux distributions | Recommendation: Debian including corresponding derivatives <sup>1</sup> | Raspberry PI, single-plane computer, mini PC (e.g. NUC), hardware with a virtualization environment | 2GB RAM, 32GB storage capacity | &gt;= 4 GB (better 6 GB - 8 GB) RAM, &gt;= 64 GB storage capacity Docker | | Mini PC (e.g. NUC), NAS <sup>3</sup> | 2GB RAM, 32GB storage capacity | &gt;= 4 GB (better 6 GB - 8 GB) RAM, &gt;= 64 GB storage capacity Windows | | PC, Mini PC (e.g. NUC)| 4 GB RAM, 50 GB storage capacity (including OS) | 8 GB RAM, 100 GB storage capacity (incl. OS) https://www.iobroker.net/#de/documentation/install/windows.md <sup>1</sup> It is recommended to run ioBroker on a Debian/Ubuntu based Linux distribution (server version without desktop! ) to install. Installation on another Linux distribution is generally possible (as long as the valid Node.js version is supported) but requires expert knowledge, as the standard scripts for installation/maintenance and instructions are tailored to Debian |

<sup>2</sup> These values are based on experiences from a typical average installation of an ioBroker system with ~40 active adapters, Grafana and an external database

<sup>3</sup> For installation on a NAS, the requirements under Docker apply, plus additional resources for the NAS&#39;s own tasks.

- ioBroker can be installed on all systems where Node.js is available.
- The required RAM and storage capacity increases if, for example, data points are historized (e.g. with the History Adapter, which stores text files on the system) or if databases such as Influx or MySQL or other applications are additionally installed and operated on this system
- When selecting hardware, pay attention to the power consumption of the hardware, as ioBroker will run around the clock (24/7 operation). A difference of just a few watts becomes noticeable in electricity consumption over the course of the year.