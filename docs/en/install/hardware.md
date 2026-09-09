---
title: Hardware
lastChanged: 07.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/install/hardware.md
hash: nXriF2igRvt8fUxOB6/r8ZWffVpKceD/hrmYqn3qmxY=
---
# Which hardware is suitable for ioBroker?

ioBroker runs wherever Node.js runs. Therefore, the question is not whether a particular piece of hardware can run it. _can_, but whether they **around the clock, for years and without supervision** can. The recommendations on this page are based on that.

The minimum and recommended values for RAM and disk space are listed under
[Requirements](/docs/install/requirements.md)This is about the device classes themselves.

## The four classes

### Raspberry Pi and other single-board computers

The standard entry point, and perfectly adequate for a home with a manageable amount of technology. Recommended for a Raspberry Pi 4 with 4 GB of RAM or larger. Smaller models and the Zero are insufficient as soon as more than a handful of adapters are running.

Two points will determine whether you're happy or annoyed:

!> **The power supply.** Standard mobile phone chargers are insufficient. An underpowered power supply can cause errors that resemble software problems: crashing adapters, corrupted databases, and spontaneous restarts. The manufacturer's original power supply is the safest choice.

!> **No SD card for continuous operation.** ioBroker constantly writes data – states, logs, databases. SD cards can only handle this to a limited extent and often fail silently: first the system slows down, then inexplicable errors appear, and then it's too late. A Raspberry Pi 4 or 5 boots from a USB SSD, and this is the only recommendation that applies without reservation.

### Mini-PC

A used small-format office PC or a NUC-like device is the class in which most larger installations run. More RAM, a proper SSD, significantly more processing power than a single-board computer – and often only a few watts more power consumption at idle.

For anything that goes beyond simple home automation – a time-series database, Grafana, cameras, speech processing – this is the lower limit.

### NAS

Anyone who already operates a NAS can install ioBroker there.
[Docker containers](/docs/install/docker.md)
Let it run. This saves a device, but has two drawbacks: The NAS has to provide the resources in addition to its own tasks, and adapters that search for devices on the network or access connected hardware require special container settings.

### Server with virtualization

Several systems run side-by-side on one computer; ioBroker is one of them - see
[Proxmox](/docs/install/proxmox.md)The advantage is the separation: a snapshot before an update, and if necessary, the previous state can be restored within a minute. Pricing is another aspect that needs to be understood and managed.

## This applies to all devices

**Electricity.** A device running continuously costs about three euros per watt per year. The difference between an energy-efficient and a standard setup can easily be 20 watts – a more noticeable difference than the purchase price.

**Operating system without a user interface.** The server version without a desktop. A graphical interface consumes resources for something nobody sees and increases the attack surface.

**Debian or a descendant.** Ubuntu and Raspberry Pi OS are included. Other distributions are possible, but the scripts, instructions, and forum answers are geared towards Debian.

**64-bit.** Even on a Raspberry Pi. Node.js' support for 32-bit systems is becoming increasingly poor.

**Plan for a reserve.** An installation grows. The adapter that is not needed today will be installed in a year, and the history, which is empty today, fills up daily.

## What's not worth it

- **A device that also does something else** - the work computer, the media server in the living room. ioBroker should run when nobody thinks about it.
- **Wi-Fi instead of cables**, if it can be avoided. A home automation system that depends on Wi-Fi will fail when the Wi-Fi fails.
- **The cheapest storage.** The card or SSD will retain data for years.

Upgrading to more powerful hardware is not a fresh installation: A backup with
`iob backup` And restoring the data to the new device includes the complete installation. Therefore, it's not worth buying a larger device out of concern for the move.