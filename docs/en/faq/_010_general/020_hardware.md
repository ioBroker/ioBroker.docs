---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/faq/_010_general/020_hardware.md
title: no title
hash: Mkk2qDHctvxEwVg5qNEzYwA4b8OEGzjv6QvRGh0GA7A=
---
## On which hardware does ioBroker run?

Anywhere a current Node.js version is running: Raspberry Pi, Mini-PC, NAS, Server, virtual machine.

The minimum equipment is considered **2 GB RAM and 32 GB storage space**4 GB (better 6 to 8 GB) and 64 GB are recommended. The complete table is available at
[Requirements](/docs/install/requirements.md), Recommendations for individual device classes under
[Hardware](/docs/install/hardware.md).

Three things that experience has shown are most crucial:

- **Do not run continuously on an SD card.** ioBroker writes constantly. An SD card can handle this for a while and then fails, usually without warning. On a Raspberry Pi, the system should be installed on an SSD.
- **A decent power supply.** A large proportion of the errors that look like software errors are actually voltage drops.
- **Enough RAM.** Every instance needs memory. Anyone planning big things doesn't start with 1 GB.