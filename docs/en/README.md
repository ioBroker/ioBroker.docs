---
title: Welcome
lastChanged: 07.04.2022
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/README.md
hash: 8AHt0wppgwAmiQS2SX+R3EKvvJat1c8b74YyaoGK9e8=
---
# Welcome
## Note on the current documentation
?> The documentation is under construction and is constantly being expanded. It may therefore happen that links do not yet work or that content is missing. We are grateful for any help in creating new articles or improvements. Information about this is available here [in the forum][].<br/><br/> **Until all content has been adopted, the old documentation is still [to be found here](https://www.iobroker.net/docu/). It will be successively replaced by this new documentation.**

<br/><br/><br/>

# IoBroker - Automate your life
ioBroker is a software solution to automate your home. It allows a wide variety of smart home systems, which would remain isolated solutions without ioBroker, to be connected and thus controlled comprehensively.

ioBroker is therefore **the** integration platform for the Internet of Things and enables the integration of commercial products from almost all areas of life or the integration of a self-created solution.

The ioBroker system has a modular structure and can be expanded to meet individual requirements by installing individual [adapters][].

Over 450 adapters implement the integration of various platforms, systems and devices from A for Alexa to Z for Zigbee and many other automation options.

<br/>

## IoBroker connects different smart home systems
![](../de/media/iobroker-simple-overview.png)

This graphic shows how ioBroker coordinates and connects the various smart home systems and other services (e.g. calendar) as a central system.
The adapters available in ioBroker can communicate with, among other things, centrally managed calendars or manufacturer-specific smart home systems (which are connected to the LAN or WLAN). In this way, the ioBroker software can read status information or trigger control actions.

<br/>

### Application example presence simulation
<br/>

This application example shows how the two independent smart home systems Philipps Hue and Homematic IP are combined using ioBroker in order to implement a presence simulation.

By connecting the two smart home systems to the ioBroker software, ioBroker is able to change the states of the Hue lamps (on/off) and the shutters (up/down). Holiday time is recognized by connecting the calendar to ioBroker.

By using the logic modules (adapter logic programming) in ioBroker, the user can now implement the following process in just a few steps:

- If the entry "Holiday" is entered in the calendar, all HUE lamps are switched on at 6 p.m.
- At 10:00 p.m. all shutters are closed and all Hue lights are switched off.
- At 08:00 in the morning all the shutters are raised again.

Using the available visualization adapters, the user can build individual status and control pages for his Hue lamps and shutters, which can be accessed with mobile devices from home or on vacation (e.g. using ioBroker Cloud Services or VPN).

<br/>

<br/>

# Strengths of ioBroker
## Platform independent
ioBroker can be installed on almost all hardware platforms (single-board computers like a Raspberry Pi, servers, NAS, servers with virtualization environments like Proxmox, desktop computers, ...) running Linux, OSX, Windows, Docker.

A simple installation routine from a single line (one-line installer) enables a user-friendly installation under Linux and thus a quick start in ioBroker.

<br/>

## Scalable
If additional smart home systems are to be connected over time, these can be implemented by the user at any time using additional adapters during operation.
ioBroker itself is also scalable: Several ioBroker servers can be connected to form a multihost system. It is even possible to mix operating system platforms and link single-board computers with large multi-core servers.

<br/>

## Individual programming of processes
With the logic adapters, ioBroker offers the possibility to create individual processes and scripts.
In a script, for example, a value can be monitored by an adapter (vacation is entered in the calendar for today) and an action can be triggered (switch on all Hue lights at 6 p.m.).

In ioBroker, these individual processes can be implemented by dragging and dropping building blocks (graphical programming) in "Rules" or "Blockly" or in the classic form with "Javascript" or "Typescript" in the form of written source code.

Further explanations of the logic modules as well as a further presentation of other logic modules such as Node-Red or the scene adapter are explained in this documentation in the "Logic and automation" section.

<br/>

## Visualization
Several visualization adapters offer the user the option of graphically realizing control options and status information. These individual visualizations can then be displayed and operated on a tablet, smartphone or computer.

Some visualization adapters and their main properties are briefly presented below.

### VIS
[adapter side vis][]

With the VIS adapter (visualization), ioBroker provides a powerful tool for creating individual visualizations. Current values from sensors can be displayed graphically in the same way as historical trends. Live images from surveillance cameras, the implementation of an alarm system, heating systems and air conditioning - almost anything imaginable can also be implemented.

With the use of VIS, the user has maximum freedom of design in the implementation. Ready-made building blocks for easy use help the user to put together the UI. But not only the display of information is possible. Devices can also be controlled quickly via the visualization interface. The operation of the interface can be adapted to a wide variety of end devices - from smartphones to wall tablets with touch functions to PCs - everything can be implemented with a simple drag and drop.

![](../de/media/iobroker-visualisation-vis.png)

<br/>

![VIS](media/vis2.png)<br/> ![](../de/media/iobroker-visualisation-vis-wetter.png)

<br/>

### Materials UI
React and Material UI interface.

[Adapter Side Material][]

![](../de/media/iobroker-visualisation-material.png)

<br/>

### Jarvis
[Jarvis adapter page][]

Jarvis is a Material Design visualization based on Material UI. Jarvis provides a structure and modules that are used for visualization but can be configured very flexibly.

Jarvis is responsive and adapts to the size of the screen and offers a standardized design so that a visualization can be put together in a short time.

The layout can be flexibly configured. The layout can be divided by any number of tabs. Each tab can then either be displayed in full screen mode or divided by individual columns (columns).

![](media/iobroker-visualisation-jarvis.png) ![](../de/media/iobroker-visualisation-jarvisDevices.png)

<br/>

### IQControl
Reach your goal quickly - but still flexible, that's what distinguishes iQontrol:

- Create the Vis once and use it everywhere: From PC to tablet to mobile phone, iQontrol runs on all end devices - either in the browser or as a web app (can be saved on the home screen and then feels like an app)
- iQontrol dynamically adapts to all resolutions (responsive design)
- Super fast loading time
- With the standard settings you can quickly reach your goal
- With the advanced settings and widgets, on the other hand, you have a high level of flexibility and customization options (in some installations you no longer recognize that it is actually iQontrol)

Video [iQontrol demo video][]

<img src="media/iobroker-visualisation-iqontrol.png" width="200"> <img src="media/iobroker-visualisation-iqontrol2.png" width="200"> <img src="media/iobroker-visualisation-iqontrol3.png" width="200">

<br/>

<img src="media/iobroker-visualisation-iqontrol4.png" width="200"> <img src="media/iobroker-visualisation-iqontrol5.png" width="200">

<br/>

### Lovelace
[adapter side lovelace][]

With the Lovelace adapter, the HomeAssistant UI Lovelace can be used for ioBroker. Lovelace has a responsive design and thus automatically adapts to the layout of the PC, tablet or smartphone screen.

In Lovelace, the devices with their properties are available for viewing / control, which are stored in ioBroker (e.g. on/off for a lamp, brightness, color temperature).

The Lovelace Editor (WYSIWYG principle - what you see is what you get principle) enables the simple creation of modern UIs in just a few steps. Custom cards and the YAML editor are available for the implementation of more complex requirements and wishes. Inspiration for a Lovelace UI can be collected in the HomeAssistant world and then implemented in ioBroker.

![](../de/media/iobroker-visualisation-lovelace.png)

<br/> <br/>

# Who is behind ioBroker?
ioBroker is an open source project developed by the ioBroker community and administrated by [Bluefox][] as project owner.

Many developers and many other helpers work on the central ioBroker system components, the many adapters, the social media support, the documentation and much more on a voluntary basis in their free time.
With the large and helpful community, a solution has been found to every problem so far.

ioBroker follows a decentralized approach in which each adapter is maintained in its own GitHub repository. The respective adapter developer makes the decisions about his adapter largely independently. Feature requests or third-party feature extensions as "pull requests" are of course taken into account.

Some developers have also joined forces in the ioBroker adapter community to ensure that even if individual developers no longer have time for their adapters, they can continue to be maintained.

There is no contractual support from the open source community, but together we have solved every problem so far!

Decisions on the direction of the central components and the overall project are discussed within the core team and then implemented.

The ioBroker core development team consists of:

* [bluefox][]
* [Apollon77][]
* [foxriver76][]
* [AlCalzone][]

You can find a list of [ioBroker Developers][] in the ioBroker Forum.

<br/>

# Licenses and costs
Many ioBroker projects are available together with the source code on [GitHub][]. In most cases the source code is licensed under the MIT license. Sometimes, however, licenses such as GPL, CC BY-NC or others are used, which must be taken into account, but do not make a big difference for the end user! The developer of an adapter determines the license for the respective adapter himself.

In very rare cases (<5 adapters currently) a (sometimes chargeable) license is required to use an adapter. For example, ioBroker GmbH provides a free license for private use for the "VIS" adapter - but a paid license is required for commercial use.
An overview and the ordering of the license for these adapters is done on this page [iobrokerPrices][]. The cost of using these adapters commercially is also listed there.

<br/>

# How is ioBroker funded?
All central components and almost all other adapters are available free of charge and the source code of the vast majority of adapters is openly available on GitHub.

Since an open source project cannot generate any income, e.g. to buy servers, an official company form is required for these things, the ioBroker GmbH. Among other things, ioBroker GmbH also offers commercial support for the ioBroker software or sells an ioBroker server, for example.

ioBroker GmbH provides the infrastructure (e.g. the forum server) for the community project free of charge and has already purchased development services in the past, which flowed into the development of the open source projects (e.g. Admin5).

The ioBroker Free Cloud is also a free service provided to the community by ioBroker GmbH. The Pro Cloud and the iot service are commercial offers from ioBroker GmbH, with the costs just covering the operating costs.

<br/>

# Remote access to your ioBroker installation via the ioBroker Cloud
Remote administration of a locally installed ioBroker system 24/7 is possible for the user or for system integrators via an optional cloud-based access. Access control can be freely configured by the user using users and groups.
The following graphic shows the ioBroker Cloud Service products at a glance.

![](../de/media/iobroker-cloud-services-overview.png)

<br/>

# Community
Since 2014, ioBroker has secured broad support from thousands of users and developers due to its many benefits. In the specially set up [Forum][], users and developers meet and exchange their experiences and suggestions. On the ioBroker [Discord][] server, experiences can be exchanged in live chat and live debug sessions can be held at short notice to track down current problems.

Link collection of the official ioBroker communities:

- ioBroker Forum: [Forum][]
- Discord ioBroker servers: [Discord][]
- Facebook group "ioBroker SmartHome and IoT": [FacebookioBrokerSmartHomeIoT][]
- Facebook group "ioBroker and smart home international": [FacebookioBrokerSmartHomeIoTInternational][]

<br/>

# IoBroker statistics
On [ioBrokerStatistics][] you will find an overview page with some interesting ioBroker statistics.

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