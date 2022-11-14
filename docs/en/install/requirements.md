---
title: requirements
lastChanged: 13.09.2018
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/install/requirements.md
hash: Opfh6IzsupO+aH9II8ZSGygSZ/9Gh1AWeFjbpBIXsi4=
---
# System requirements
@@@ Table with RAM, CPU, OS, Node.js, npm, build-tools, network, disk space, SD card size @@@

## Reinstall
| | Variants | versions |
|---|:---------:|:-------:|

**Runtime Environment** | | Node.js | 32-/64-bit<br> ppc641e<br> armv61, armv71, arm64<br> aix-ppc64, s390x | 8.12.0 **Package Manager** | | Node Packet Manager npm | | 6.4.1

ioBroker can be installed on all systems where Node.js is available.

## Existing installations
| | Variants | versions |
|---|:---------:|:-------:|

**Runtime Environment** | | Node.js | 32-/64-bit<br> ppc641e<br> armv61, armv71, arm64<br> aix-ppc64, s390x | 6.0.0 - 10.10.0 <sup>*1</sup> **Package Manager** | | Node Packet Manager npm | | 3.0.0 - 4.6.1 5.7.1 - 6.4.1

<sup>*1</sup> The following adapters still have problems with Node.js versions &gt;= 10.0:

- maxcul (due to serialport dependency)
- noolite (due to serialport dependency)
- wetty (due to pty.js dependency)

## Supported Operating Systems
| | Variants |
|---|:---------:|

*Windows* | Windows 7 | 32-/64-bit Windows Server 2008 R2 | 64-bit/IA64 edition Windows 8 | 32-/64-bit Windows Server 2012 | 64-bit Windows 8.1 | 32-/64-bit Windows Server 2012 R2 | 64-bit Windows 10 | 32-/64-bit Windows Server 2016 | 64-bit *Linux distributions* | Arch and Derivatives | Debian and Derivatives | e.g. Ubuntu, Bananian,<br> Cubian, Raspbian, Knoppix Gentoo and derivatives | Red Hat and Derivatives | e.g. Fedora, Pidora,<br> CentOS, Mandriva Slackware and Derivatives | eg openSUSE* ther* | macOS | 64-bit Linux From Scratch |