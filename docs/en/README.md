---
title: Welcome
lastChanged: 02.05.2020
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/README.md
hash: kbMS+/KdE+PXIAzwu4tfSbRdupo0rAQpBQectuVvIxo=
---
# Welcome to ioBroker
!> **Note for beginners** If too many unfamiliar terms have already been used when reading these first few words, they will be explained again in detail on the [basics](https://www.iobroker.net/#de/documentation/basics/README.md) page.

ioBroker is a software solution to integrate various smart home systems, which would remain isolated solutions without ioBroker, into an overall system.

ioBroker is therefore **the** integration platform for the Internet of Things.

An ioBroker system has a modular structure. A variety of [adapters](http://download.iobroker.net/list.html) enables communication with over 400 different platforms from A for Alexa to Z for Z-Wave.

Be it the integration of commercial products from almost all areas of life or the integration of a self-created solution - ioBroker makes almost everything possible.

!> The documentation is under construction and is constantly being expanded. It may therefore happen that links do not yet work or that content is missing. We are grateful for any help in creating new articles or improvements. Information about this is available here [in the forum][].<br><br> **Until all content has been adopted, the old documentation is still [to be found here](https://www.iobroker.net/docu/). It will be successively replaced by the new documentation.**

## Cross-platform
Anyone who deals with home automation will sooner or later realize that individual systems are often not perfect. Every system has its strengths and weaknesses. ioBroker is therefore cross-platform and parallel operation with existing solutions is possible at any time. In this way, synergy effects can be used and the best of all worlds can be brought together.

ioBroker itself IS at home on almost all platforms. ioBroker can be installed on Windows, Linux, OSX or as a Docker image.
Preconfigured installation images relieve the user of the installation work.

Remote administration of a locally installed ioBroker system 24/7 is possible for the user or for system integrators via an optional cloud-based access. Access control can be freely configured by the user using users and groups.

## Scalable
If further smart home systems are to be connected over time, these can be implemented by the user at any time using additional adapters during ongoing operation.
ioBroker itself is also scalable: Several ioBroker servers can be connected to form a `Mutihost` system. It is even possible to mix operating system platforms and link SoC single-board computers with large multi-core servers.
For systems with the highest performance requirements, Redis, a particularly fast database, can be integrated as an option.

## Programmable
Optional programming is done with JavaScript, a scripting language that has been continuously developed since 1995. This is easy to learn, so that new requirements can be implemented quickly. This makes it possible for everyone to contribute to ioBroker and individual requirements can also be implemented.

The 'Blockly' variant is available for beginners in programming, which makes it possible to quickly get results yourself using 'drag and drop' without extensive programming knowledge.

## Visualization
With `VIS`, ioBroker provides a powerful tool for creating an individual visualization. Current values from sensors can be displayed graphically in the same way as historical trends. Live images from surveillance cameras, the implementation of an alarm system, heating systems and air conditioning - almost anything imaginable can also be implemented.

*Example of a self-created VIS user interface* ![VIS](../de/media/vis2.png)

The user has maximum freedom of design. Ready-made building blocks for easy use help the user. But not only the display of information is possible. Devices can also be controlled quickly via the visualization interface. The operation of the interface can be tailored to the most diverse end devices - from smartphones to wall tablets with touch functions to personal computers - everything can be implemented with simple drag and drop.

Simple, ready-made user interfaces can be quickly implemented with the Material or HabPanel adapter.

## Community
Since 2014, ioBroker has secured broad support from thousands of users and developers due to its many benefits. Users and developers meet in the specially set up [Forum](https://forum.iobroker.net) and exchange their experiences and suggestions there. Since ioBroker is open source software, all source texts are freely available on the [GitHub](https://github.com/ioBroker) platform.

?> What ioBroker is not: ioBroker is not commercial software. ioBroker is developed and maintained by volunteers. Therefore, the use of the software is at your own risk, except in the case of willful damage.
There is no contracted support!

[Grundlagen]: https://www.iobroker.net/#de/documentation/basics/README.md

[Adaptern]: http://download.iobroker.net/list.html

[hier zu finden]: https://www.iobroker.net/docu/

[im Forum]: https://forum.iobroker.net/category/186/dokumentations-support

[GitHub]: https://github.com/ioBroker

[Forum]: https://forum.iobroker.net