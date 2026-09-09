---
title: Introduction
lastChanged: 08.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/integrators/README.md
hash: qyTr9/uSjIej6BFGFHjOc1g8aWoFJyeg7SlILDL/Dxg=
---
# System integrators

Those who use ioBroker professionally and build systems for clients have different questions than someone who automates their own home. It's not different technology, but different constraints: multiple systems instead of one, unfamiliar networks, warranties, and people who don't post in a forum when something goes wrong, but call.

This chapter compiles additional points to consider. The technique itself is described in the other chapters.

## What has proven effective in practice

**Build every system the same way.** Same operating system version, same Node.js version, same adapter selection, same names for rooms and functions. A system that looks like all the others can be supported by phone. The [categories](/docs/basics/enums.md) are more important than they appear: visualization and voice control are built upon them.

**Data backup before handover.** A configured [data backup](/docs/config/backup.md) to a destination outside the system is part of the acceptance process, not just a good intention. It's the difference between half a day's work and a week's worth.

**Separate access.** The customer receives their own user account with the necessary permissions, not the administrator account. Instructions on how to set this up can be found under [Access Management](/docs/config/userrights.md) and [Authentication](/docs/config/login.md) .

**No open port.** External access is only permitted via the [IoT adapter](/docs/cloud/iot.md) or a VPN solution. Port forwarding to a customer's system poses a liability risk.

**Freeze versions.** In a customer's system, the repository should be _stable_ , not _beta_ , and certainly not an adapter from GitHub. See [Repositories](/docs/basics/repositories.md) .

## Larger facilities

When a system reaches the limits of a computer, there are two adjustment options:

- [Redis is](/docs/config/redis.md) used for the state database when a large number of values change very frequently.
- [Multihost](/docs/config/multihost.md) is used to distribute tasks across multiple computers, for example, when a device needs to be connected to a specific location.

Multihosting distributes the load, but it **doesn't** make the system fault-tolerant. If the computer hosting the databases fails, everything comes to a standstill.

## License and warranty

ioBroker is open source and free to use. However, there is a restriction for commercial use that should be clarified before the first customer project: **vis-2 requires a paid license** . This applies to use in customer projects, for use within the scope of services, and for operation by companies, government agencies, or other institutions. Details can be found under [Adapter Licenses](/docs/licenses/adapter.md) .

This manual is not the right source for questions regarding liability and warranty.

## Remote access to customer systems

In addition to the IoT adapter, the [Link-Box](/docs/integrators/linkbox.md) VPN solution is available for accessing multiple systems.