---
title: architecture
lastChanged: 05.02.2022
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/basics/architecture.md
hash: 6Rz50x9RpGBE04w3ZBhuaKXtL/FmxELL0OpbQG3ep7s=
---
# System build
?> ***This is a placeholder***.<br><br> Help ioBroker and expand this article. Please note the [ioBroker Style Guide](https://www.iobroker.net/#de/documentation/community/styleguidedoc.md) so that the changes can be adopted more easily.

## Architecture
ioBroker is modular, i.e. made up of many individual components. Each module has a specific task. In order to keep an overview, ioBroker therefore has a central coordinator for all its modules. This coordinator is the `js-controller` working in the background. He is responsible for the central data storage as well as management and communication between all modules. The modules themselves are called `Adapter`. Adapters are installed by the user only when required. The web-based administration interface `admin` is itself an adapter. The Admin Adapter or "Admin" for short is the management interface of an ioBroker system. The [Admin](https://www.iobroker.net/#de/documentation/admin/README.md) is usually started with the address [http://localhost:8081](http://localhost:8081) called.

When a new adapter is installed with the Admin, the adapter files are first loaded from the Internet and written to the server hard drive. If an adapter is to be started, a `Instanz` of the adapter is created first. Each adapter instance can be configured individually and stopped and started independently with the admin. Therefore, each instance runs in its own process that communicates with the ioBroker js-controller in the background.

In a `Multihost` system with multiple ioBroker servers, instances of adapters can also be distributed across different servers. This allows the load to be distributed or additional hardware to be connected directly on site (e.g. IO ports, USB).

The communication between adapters, js-controller, databases and web frontends takes place via several TCP/IP connections. Depending on the selected setting, data is exchanged either in plain text or encrypted.

ioBroker and adapters are mainly written in the programming language JavaScript. A corresponding runtime environment is required to run JavaScript. ioBroker therefore relies on [Node.js](https://github.com/nodesource/distributions#installation-instructions). This runtime environment is available for a wide variety of software platforms such as Linux, Windows and macOS.

The Node Package Manager, `npm` for short, is used to install ioBroker and the adapters. This can search, install, remove, compile and update modules and their dependencies.
ioBroker does not work without Node.js. A manual installation of Node.js is not necessary, this is done directly by the ioBroker installer.

As is common with many open source technologies, Node.js is evolving rapidly. Minor updates that increase stability and security or even add new functions appear regularly.

Node.js versions with a **even** major version number are referred to as LTS versions (Long Term Support) and are maintained for a number of years (e.g. 12.x). Every year a new version comes into the LTS - In 2021 that was Node.js 16, which was released in April and will become an LTS version from October 2021.

At the same time, earlier LTS versions reach their end of life (EOL, End of Life). Node.js 10 received EOL status in April 2021 and will therefore no longer receive any updates, Nodejs 12.x will reach the end of its life at the end of April 2022. So there will be no more security updates!

ioBroker uses many modules and extensions from the JavaScript open-source scene, where it regularly happens that versions that go EOL are no longer supported shortly thereafter. This has no real effect in the first step, but in the medium term there will be adapters and later also the js-controller, which no longer supports EOL versions of Node.js.

@@@ Nice picture with architecture layers @@@ @@@ Explain JS controller and transition to adapters & instances @@@