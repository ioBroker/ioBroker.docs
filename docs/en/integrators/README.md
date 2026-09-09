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

**Build each system in the same way.** The same operating system version, the same Node.js version, the same adapter selection, the same names for rooms and functions. A system that looks like any other can be supported over the phone.
[Categories](/docs/basics/enums.md) They are more important than they look: visualization and voice control are based on them.

**Security before handover.** A furnished
[Data backup](/docs/config/backup.md)
Having a goal outside the facility is part of the effort, not part of a New Year's resolution. It's the difference between half a day's work and a week's worth.

**Separate entrances.** The customer receives their own user account with the necessary permissions, not the administrator account. Instructions on how to set this up can be found under \[link/section name].
[Access management](/docs/config/userrights.md)
and
[authentication](/docs/config/login.md).

**No open port.** For external access, the route is via the
[IoT adapter](/docs/cloud/iot.md) or a VPN solution is provided. Port forwarding to a customer's system poses a liability risk.

**Freeze versions.** In a customer's system, the repository belongs on
_stable_, not on _beta_, and certainly not an adapter from GitHub. See
[Repositories](/docs/basics/repositories.md).

## Larger facilities

When a system reaches the limits of a computer, there are two adjustment options:

- [Redis](/docs/config/redis.md) for the status database when a large number of values change very frequently.
- [Multihost](/docs/config/multihost.md), to distribute tasks across multiple computers, for example when a device needs to be connected in a specific location.

Multihost distributes the load, but it makes the system... **not** Fail-safe. If the computer with the databases fails, everything stops.

## License and warranty

ioBroker is open source and free to use. However, there is a limitation for commercial use that should be clarified before the first customer project: **vis-2 requires a paid license for this.**&#x54;his applies to use in customer projects, for use in services, and for operation by companies, authorities, or other institutions. Details can be found at \[link/reference]. [Adapter licenses](/docs/licenses/adapter.md).

This manual is not the right source for questions regarding liability and warranty.

## Remote access to customer systems

In addition to the IoT adapter, there is also a VPN solution for accessing multiple systems. [Link box](/docs/integrators/linkbox.md).