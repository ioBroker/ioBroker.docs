---
title: architecture
lastChanged: 24.08.2024
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/basics/architecture.md
hash: fBfqIkwe2R088CwuRMCh53RGxixMmytK+tGKMdHsiV0=
---
# System structure
## Architecture
ioBroker is modular, i.e. it is made up of many individual components. Each module has a specific task. In order to keep track of everything, ioBroker has a central coordinator for all its modules. This coordinator is the `js-controller` that works in the background. It is responsible for central data storage as well as management and communication between all modules. The modules themselves are called `Adapter`.
Adapters are only installed by the user when required. The web-based administration interface `admin` is itself also an adapter. The admin adapter or "admin" for short is the management interface of an ioBroker system. The [Admin](https://www.iobroker.net/#de/documentation/admin/README.md) is usually started with the address [http://localhost:8081](http://localhost:8081) is called.

When a new adapter is installed with the admin, the adapter files are first downloaded from the Internet and written to the server hard drive. If an adapter is to be started, a `Instanz` of the adapter is first created. Each adapter instance can be individually configured and stopped and started independently with the admin. Therefore, each instance runs in its own process that communicates with the ioBroker js-controller in the background.

In a `Multihost` system with multiple ioBroker servers, adapter instances can also be distributed across different servers. This allows the load to be distributed or additional hardware to be connected directly on site (e.g. IO ports, USB).

Communication between adapters, js controllers, databases and web front ends takes place via several TCP/IP connections. Depending on the selected setting, data is exchanged either in plain text or encrypted.

ioBroker and adapters are primarily written in the JavaScript programming language. To run JavaScript, you need a corresponding runtime environment. ioBroker therefore relies on [Node.js](https://github.com/nodesource/distributions#installation-instructions). This runtime environment is available for a wide range of software platforms such as Linux, Windows and macOS.

The Node Package Manager, `npm` for short, is used to install ioBroker and the adapters. This can search for, install, remove, compile and update modules and their dependencies.
ioBroker does not work without Node.js. Manual installation of Node.js is not necessary; the ioBroker installer takes care of this directly.

As is common with many open source technologies, Node.js is evolving rapidly. Small updates that increase stability and security or even add new features are released regularly.

Node.js versions with **even** major version numbers are called LTS (Long Term Support) versions and are maintained for several years (e.g. 12.x). Every year a new version is added to the LTS - in 2021 this was Node.js 16, which was released in April and will become an LTS version from October 2021.

At the same time, previous LTS versions reach their end of life (EOL). Node.js 10 received EOL status in April 2021 and will no longer receive updates, and Nodejs 12.x will reach its end of life at the end of April 2022. So there will be no more security updates!

ioBroker uses many modules and extensions from the JavaScript open source scene, where it regularly happens that versions that go EOL are no longer supported shortly afterwards. This has no real impact in the first step, but in the medium term there will be adapters and later also the js-controller that no longer support EOL versions of Node.js.

## Adapters and instances
Adapters are special modules that integrate various devices, services or protocols into the ioBroker system. They act as interfaces between ioBroker and the external systems they control or collect data from. Adapters can be divided into different categories, such as device adapters, protocol adapters, service adapters, database adapters, visualization adapters, script adapters and special adapters.

Each adapter instance can be individually configured and stopped and started independently by the admin. This enables flexible and scalable integration of various devices and services into the ioBroker system. Adapter instances run in their own processes and communicate with the js controller in the background.

## Multihost systems
In a multi-host system, multiple ioBroker servers can be connected to each other to distribute the load or to connect additional hardware on site. This enables better scalability and flexibility of the ioBroker system. Adapter instances can be distributed across different servers to make optimal use of system resources.

Communication between servers takes place via TCP/IP connections, and data exchange can be in plain text or encrypted, depending on the settings. Multihost systems offer a robust and scalable solution for large installations with many devices and services.

## Security and Updates
Security and regular updates are important aspects when using ioBroker. Node.js, the underlying runtime environment, is evolving rapidly and receives regular updates that improve stability and security. It is important to use the LTS versions of Node.js as these are maintained over a longer period of time and receive security updates.

ioBroker and its adapters use many modules and extensions from the JavaScript open source community. It is important to update these modules regularly to benefit from the latest security and stability improvements. The Node Package Manager (npm) makes it easy to manage and update these modules.

## Summary
ioBroker is a modular and scalable system for integrating and controlling various devices, services and protocols. The central coordinator, the js-controller, manages the adapters and ensures communication between the various components of the system. Adapters enable the flexible integration of devices and services, and multi-host systems offer additional scalability and flexibility. Security and regular updates are important aspects to ensure the stability and reliability of the ioBroker system.