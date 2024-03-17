---
title: ioBroker documentation
lastChanged: 29.02.2024
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/README.md
hash: XSuoGKgBMkdOrEyitIIbfCmq1qPO3feBmTaaEfj4YsQ=
---
***Note on current documentation***

?> The documentation is under construction and is constantly being expanded.
It may therefore happen that links do not yet work or content is missing. We would be grateful for any help in creating new articles or making improvements. Information about this can be found here in [Forum](https://forum.iobroker.net/category/186/dokumentations-support).

**Until all content has been transferred, the old documentation is still [can be found here](https://www.iobroker.net/docu/).
It will be gradually replaced by this new documentation.**

## IoBroker - Automate your life
ioBroker is a software solution for automating your home. It allows a wide variety of smart home systems, which would remain isolated solutions without ioBroker, to be connected and thus controlled across the board.

ioBroker is therefore **the** integration platform for the Internet of Things and enables the integration of commercial products from almost all areas of life or the integration of a self-created solution.

The ioBroker system has a modular structure and can be expanded to meet individual requirements by installing individual [adapters](https://www.iobroker.net/#de/adapters/adapters.md).

Over 450 adapters enable the integration of various platforms, systems and devices from A like Alexa to Z like Zigbee and many other automation options.

### IoBroker connects a wide variety of smart home systems
![](../de/media/iobroker-simple-overview.png)

This graphic shows how ioBroker, as a central system, coordinates and connects a wide variety of smart home systems and other services (e.g. calendars).
The adapters available in ioBroker can, among other things, communicate with centrally managed calendars or manufacturer-specific smart home systems (which are connected via LAN or WLAN). This allows the ioBroker software to read status information or trigger control actions.

### Application example of presence simulation
This application example shows how the two independent smart home systems Philipps Hue and Homematic IP are combined using ioBroker to realize a presence simulation.

By connecting the two smart home systems to the ioBroker software, ioBroker is able to change the states of the Hue lamps (on/off) and the shutters (up/down). Vacation time is recognized by connecting the calendar to ioBroker.

By using the logic blocks (adapter logic programming) in ioBroker, the user can now implement the following process in just a few steps:

- If the entry "Vacation" is entered in the calendar, all HUE lamps will be switched on at 6 p.m.
- At 10 p.m. all shutters will be closed and all Hue lights will be turned off.
- At 8:00 a.m. all shutters will be raised again.

Using the available visualization adapters, the user can build individual status and control pages for their Hue lamps and shutters, which can be accessed with mobile devices from home or while on vacation (e.g. using ioBroker Cloud Services or VPN).

## Strengths of ioBroker
### Platform independent
ioBroker can be installed on almost all hardware platforms that run Linux, OSX, Windows or Docker as the operating system. Single-board computers (such as the Raspberry Pi), servers, NAS or servers with virtualization environments (such as Proxmox, desktop computers, etc.) are therefore possible.

A simple installation routine consisting of a single line (one-line installer) enables a user-friendly installation under Linux and OSX and thus a quick start to ioBroker.

### Scalable
If additional smart home systems are to be connected over time, the user can implement them at any time using additional adapters during operation.
ioBroker itself is also scalable: several ioBroker servers can be connected to form a multihost system. It is even possible to mix operating system platforms and link single-board computers with large multi-core servers.

### Individual programming of processes
With the logic adapters, ioBroker offers the possibility of creating individual processes and scripts.
In a script, for example, a value can be monitored by an adapter (vacation is entered in the calendar for today) and an action can be triggered (switch on all Hue lights at 6 p.m.).

In ioBroker, these individual processes can be implemented by dragging and dropping building blocks (graphical programming) in “Rules” or “Blockly” or can be implemented in the classic form with “Javascript” or “Typescript” in the form of written source code.

Further explanations of the logic blocks as well as a further introduction to other logic blocks such as Node-Red or the scene adapter are explained in the “Logic and Automation” section of this documentation.

## Visualization
Several visualization adapters offer the user the opportunity to graphically implement control options and status information. These individual visualizations can then be displayed and operated on a tablet, smartphone or computer.

Some visualization adapters and their main properties are briefly introduced below.

### VIS
[Adapter side visible](https://www.iobroker.net/#de/adapters/adapterref/iobroker.vis/README.md)

With the VIS (Visualization) adapter, ioBroker provides a powerful tool for creating individual visualizations. Current values from sensors can be displayed graphically in the same way as historical curves. Live images from surveillance cameras, the implementation of an alarm system, heating systems and air conditioning technology - almost everything that is imaginable can also be implemented.

By using VIS, the user has maximum design freedom during implementation. Prefabricated building blocks for easy use help the user put together the UI. But not only the display of information is possible. Devices can also be controlled quickly via the visualization interface. The operation of the interface can be adapted to a wide variety of devices - from smartphones to wall tablets with touch functions to PCs - everything can be achieved by simply dragging and dropping.

![](../de/media/iobroker-visualisation-vis.png)

![VIS](media/vis2.png) ![](../de/media/iobroker-visualisation-vis-wetter.png)

### Material UI
React and Material UI interface.

[Adapter side material](https://www.iobroker.net/#de/adapters/adapterref/iobroker.material/README.md)

![](../de/media/iobroker-visualisation-material.png)

### Jarvis
[Adapter page Jarvis](https://www.iobroker.net/#de/adapters/adapterref/iobroker.jarvis/README.md)

Jarvis is a Material Design visualization based on Material UI. Jarvis provides a structure and modules that are used for visualization but can be configured very flexibly.

Jarvis is responsive and adapts to the size of the screen and offers a standardized design so that a visualization can be put together in a short time.

The layout can be flexibly configured. The layout can be divided by any number of tabs. Each tab can then either be displayed in full screen mode or divided into individual columns.

![](media/iobroker-visualisation-jarvis.png) ![](../de/media/iobroker-visualisation-jarvisDevices.png)

### IQcontrol
Reach your goal quickly - but still flexible, that's what sets iQontrol apart:

- Create the Vis once and use it everywhere: From PC, tablet to cell phone, iQontrol runs on all devices - either in the browser or as a web app (can be saved on the home screen and then feels like an app)
- iQontrol dynamically adapts to all resolutions (responsive, capable design)
- Super fast loading time
- With the standard settings you can quickly reach your goal
- With the advanced settings and widgets, however, you have a high level of flexibility and customization options (in some installations you no longer recognize that it is actually iQontrol)

Video [iQontrol Demo Video][]

<img src="media/iobroker-visualisation-iqontrol.png" width="200"> <img src="media/iobroker-visualisation-iqontrol2.png" width="200"> <img src="media/iobroker-visualisation-iqontrol3.png" width="200"> <img src="media/iobroker-visualisation-iqontrol4.png" width="200"> <img src="media/iobroker-visualisation-iqontrol5.png" width="200">

### Lovelace
[Adapter side lovelace](https://www.iobroker.net/#de/adapters/adapterref/iobroker.lovelace/README.md)

With the Lovelace adapter, the HomeAssistant UI Lovelace can be used for ioBroker. Lovelace has a responsive design and therefore automatically adapts to the layout of your PC, tablet or smartphone screen.

In Lovelace, the devices with their properties are directly available for viewing/controlling, which are stored in ioBroker (e.g. for a lamp on/off, brightness, color temperature).

The Lovelace Editor (WYSIWYG principle - what you see is what you get principle) enables the easy creation of modern UIs in just a few steps. Custom cards and the YAML editor are available to implement more complex requirements and wishes. Inspiration for a Lovelace UI can be collected in the HomeAssistant world and then implemented in ioBroker.

![](../de/media/iobroker-visualisation-lovelace.png)

## Who is behind ioBroker?
ioBroker is an open source project developed by the ioBroker community and administered by [Bluefox](https://github.com/GermanBluefox) as the project owner.

Many developers and many other helpers volunteer their free time to develop the central ioBroker system components, the many adapters, the social media support, the documentation and much more.
With the large and helpful community, a solution has been found for every problem so far.

ioBroker follows a decentralized approach in which each adapter is maintained in its own GitHub repository. The respective adapter developer makes decisions about his adapter largely independently. Feature requests or third-party feature extensions as “pull requests” are of course taken into account.

Some developers have also joined forces in the ioBroker adapter community to ensure that even if individual developers no longer have time for their adapters, they can be maintained.

There is no contractually agreed support from the open source community, but together we have solved every problem so far!

Decisions on the direction of the central components and the overall project are discussed within the core team and then implemented.

The ioBroker Core development team consists of:

* [Bluefox](https://github.com/GermanBluefox)
* [Apollon77](https://github.com/Apollon77)
* [foxriver76](https://github.com/foxriver76)
* [AlCalzone](https://github.com/AlCalzone)

You can find a list of [ioBroker Developer](https://forum.iobroker.net/groups/developer) in the ioBroker forum.

### Licenses and costs
Many ioBroker projects are available along with the source code on [GitHub](https://github.com/ioBroker). In the vast majority of cases, the source code is under the MIT license. However, sometimes licenses such as GPL, CC BY-NC or others are used, which must be taken into account, but do not in themselves make a big difference for end users! The developer of an adapter determines the license for the respective adapter himself.

In very rare cases (<5 adapters currently) a (sometimes paid) license is required to use an adapter. For example, ioBroker GmbH provides a free license for private use of the "VIS" adapter - however, a paid license is required for commercial use.
An overview and ordering the license for these adapters can be found on this page [iobrokerPrices](https://iobroker.net/www/pricing). The costs for commercial use of these adapters are also listed there.

### How is ioBroker financed?
All central components and almost all other adapters are available free of charge and the source code for the vast majority of adapters is openly available on GitHub.

Since an open source project cannot generate income to buy servers, for example, an official corporate form is required for these things, ioBroker GmbH. ioBroker GmbH also offers, among other things, commercial support for the ioBroker software or sells, for example, an ioBroker server.

ioBroker GmbH provides the infrastructure (e.g. the forum server) for the community project free of charge and has already purchased development services in the past, which went into the development of the open source projects (e.g. Admin5).

The ioBroker Free Cloud is also a free service made available to the community by ioBroker GmbH. The Pro-Cloud and the iot service are commercial offers from ioBroker GmbH, with the costs just covering the operating costs.

## Remote access to your ioBroker installation via the ioBroker Cloud
Remote management of a locally installed ioBroker system is possible 24/7 for the user or system integrators via optional cloud-based access. Access control can be freely configured by the user using users and groups.
The following graphic shows an overview of the ioBroker Cloud Service products.

![](../de/media/iobroker-cloud-services-overview.png)

## Community
Since 2014, ioBroker has secured widespread support from thousands of users and developers due to its many advantages. Users and developers meet in the specially set up [Forum](https://forum.iobroker.net) and exchange their experiences and suggestions with each other. On the ioBroker [Discord](https://discord.gg/sGWE65zF) server, experiences can be exchanged in live chat and live debug sessions can be carried out at short notice in order to get to the bottom of current problems.

Collection of links from the official ioBroker communities:

- ioBroker Forum: [Forum](https://forum.iobroker.net)
- Discord ioBroker Server: [Discord](https://discord.gg/sGWE65zF)
- Facebook group "ioBroker SmartHome and IoT": [FacebookioBrokerSmartHomeIoT](https://www.facebook.com/groups/440499112958264)
- Facebook group "ioBroker and smart home international": [FacebookioBrokerSmartHomeIoTInternational](https://www.facebook.com/groups/iobrokerinternational)

## IoBroker statistics
On [ioBrokerStatistics](https://www.iobroker.net/#de/statistics) you will find an overview page with some interesting ioBroker statistics.

[Grundlagen]: https://www.iobroker.net/#de/documentation/basics/README.md

[Adaptern]: https://www.iobroker.net/#de/adapters/adapters.md

[hier zu finden]: https://www.iobroker.net/docu/

[im Forum]: https://forum.iobroker.net/category/186/dokumentations-support

[GitHub]: https://github.com/ioBroker

[Forum]: https://forum.iobroker.net

[Telegram]: https://t.me/iobrokergermany

[Discord]: https://discord.gg/sGWE65zF

[FacebookIoBrokerSmartHomeIoT]: https://www.facebook.com/groups/440499112958264

[FacebookIoBrokerSmartHomeIoTInternational]: https://www.facebook.com/groups/iobrokerinternational

[iobrokerPreise]: https://iobroker.net/www/pricing

[Bluefox]: https://github.com/GermanBluefox

[Apollon77]: https://github.com/Apollon77

[foxriver76]: https://github.com/foxriver76

[AlCalzone]: https://github.com/AlCalzone

[ioBrokerStatistics]: https://www.iobroker.net/#de/statistics

[Adapterseite Material]: https://www.iobroker.net/#de/adapters/adapterref/iobroker.material/README.md

[Adapterseite Jarvis]: https://www.iobroker.net/#de/adapters/adapterref/iobroker.jarvis/README.md

[Adapterseite vis]: https://www.iobroker.net/#de/adapters/adapterref/iobroker.vis/README.md

[Adapterseite lovelace]:https://www.iobroker.net/#de/adapters/adapterref/iobroker.lovelace/README.md

[iQontrol Demo Video]: https://www.youtube.com/watch?v=QHgmrzMmcX4&list=PL8epyNz8pGEv6-R8dnfXm-m5aBlZFKOBG&index=1

[ioBroker Developer]: https://forum.iobroker.net/groups/developer