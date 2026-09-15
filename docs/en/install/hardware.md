---
title: Hardware
lastChanged: 07.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/install/hardware.md
hash: nXriF2igRvt8fUxOB6/r8ZWffVpKceD/hrmYqn3qmxY=
---
# Which hardware is suitable for ioBroker?

ioBroker runs wherever Node.js runs. The question, therefore, is not whether a piece of hardware _can run_ it, but whether it can run it **24/7, for years, and unattended** . The recommendations on this page are based on that.

The minimum and recommended values for RAM and disk space are listed under [Requirements](/docs/install/requirements.md) . This section deals with the device classes themselves.

## The four classes

### Raspberry Pi and other single-board computers

The standard entry point, and perfectly adequate for a home with a manageable amount of technology. Recommended for a Raspberry Pi 4 with 4 GB of RAM or larger. Smaller models and the Zero are insufficient as soon as more than a handful of adapters are running.

Two points will determine whether you're happy or annoyed:

**The power supply.** Mobile phone chargers are insufficient. An underpowered power supply causes errors that resemble software problems: crashing adapters, corrupted databases, spontaneous restarts. The manufacturer's original power supply is the safe choice.

**Do not use an SD card continuously.** ioBroker writes constantly – states, logs, databases. SD cards can only handle this to a limited extent and fail silently: first the system slows down, then inexplicable errors appear, then it's too late. A Raspberry Pi 4 or 5 boots from a USB SSD, and this is the only recommendation that applies without reservation.

### Mini-PC

A used small-format office PC or a NUC-like device is the class in which most larger installations run. More RAM, a proper SSD, significantly more processing power than a single-board computer – and often only a few watts more power consumption at idle.

For anything that goes beyond simple home automation – a time-series database, Grafana, cameras, speech processing – this is the lower limit.

### NAS

Anyone already running a NAS can run ioBroker there in a [Docker container](/docs/install/docker.md) . This saves on a physical device, but has two drawbacks: The NAS has to provide the resources in addition to its own tasks, and adapters that search for devices on the network or access connected hardware require special container settings.

### Server with virtualization

Multiple systems can run side-by-side on a single computer; ioBroker is one of them – see [Proxmox](/docs/install/proxmox.md) . The advantage is the separation: a snapshot before an update, and if necessary, the previous state can be restored within a minute. The price is another layer that needs to be understood and maintained.

## This applies to all devices

**Electricity.** A device running continuously costs about three euros per watt per year. The difference between an energy-efficient and a standard setup can easily be 20 watts – a more noticeable difference than the purchase price.

**Operating system without a user interface.** The server version without a desktop. A graphical interface consumes resources for something no one sees and increases the attack surface.

**Debian or a derivative.** Ubuntu and Raspberry Pi OS are examples. Other distributions are possible, but the scripts, instructions, and forum answers are geared towards Debian.

**64-bit.** Even on a Raspberry Pi. Node.js' support for 32-bit systems is becoming increasingly poor.

**Plan for a reserve.** An installation grows. The adapter that isn't needed today will be installed in a year, and the history, which is empty today, fills up daily.

## What's not worth it

- **A device that also does something else** – the work computer, the media server in the living room. ioBroker should run when nobody thinks about it.
- **Use Wi-Fi instead of cables** if possible. A home automation system that relies on Wi-Fi will fail if the Wi-Fi stops working.
- **The cheapest storage option.** The card or SSD will keep the data for years.

Upgrading to more powerful hardware is not a fresh installation: A backup with`iob backup` And restoring the data to the new device includes the complete installation. Therefore, it's not worth buying a larger device out of concern for the move.