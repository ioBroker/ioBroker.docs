---
title: architecture
lastChanged: 07.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/basics/architecture.md
hash: un7kAc/lBP8XFZbm9dkyVdyQVtO37So3gmER2h/6BmU=
---
# System structure

## architecture

ioBroker is modular, meaning it's built from many individual components. Each module has a specific task. To maintain an overview, ioBroker therefore has a central coordinator for all its modules. This coordinator works in the background. `js-controller`He is responsible for central data storage as well as management and communication between all modules. The modules themselves are `Adapter` These are called adapters. The user only installs them when needed. The web-based administration interface `admin` It is itself also an adapter. The Admin adapter, or "Admin" for short, is the management interface of an ioBroker system. [Admin](/docs/admin/README.md) is usually linked to the address <http://localhost:8081> called up.

When a new adapter is installed using the administrator account, the adapter files are first downloaded from the internet and written to the server's hard drive. If an adapter is to be started, a `Instanz` The adapter is generated. Each adapter instance can be individually configured and independently stopped and started by the administrator. Therefore, each instance runs in its own process, which communicates with the ioBroker js-controller in the background.

In a `Multihost`In systems with multiple ioBroker servers, adapter instances can be distributed across different servers. This allows for load distribution or the direct connection of additional hardware on-site (e.g., I/O ports, USB).

Communication between adapters, JS controllers, databases, and web frontends takes place via multiple TCP/IP connections. Depending on the selected settings, data exchange occurs either in plaintext or encrypted.

ioBroker and its adapters are primarily written in the JavaScript programming language. To execute JavaScript, a suitable runtime environment is required. Therefore, ioBroker relies on... [Node.js](https://github.com/nodesource/distributions#installation-instructions)This runtime environment is available for a wide variety of software platforms such as Linux, Windows, and macOS.

To install ioBroker and the adapters, the Node Package Manager, or Node Package Manager for short, is used. `npm`Node.js is used. It can search for, install, remove, compile, and update modules and their dependencies. ioBroker does not function without Node.js. Manual installation of Node.js is not necessary; the ioBroker installer handles this automatically.

As is common with many open-source technologies, Node.js is evolving rapidly. Minor updates that improve stability and security, or even add new features, are released regularly.

Node.js versions with **straight** Major version numbers become LTS (Long Term Support) versions after a few months and are then maintained for several years. A new version is released each year, and at the same time, an older version reaches its end of life (EOL) – after which it no longer receives security updates. Odd-numbered major versions are pre-release versions and are not suitable for ioBroker.

For ioBroker, this means that a specific recommended LTS version always applies, and versions after their end of life are no longer supported by the adapters and later by the js-controller. Information on which version is currently recommended and how to switch can be found at \[link to relevant documentation]. [Update Node.js & npm](/docs/install/updatenode.md).

## Adapter and instance

Adapters are special modules that integrate various devices, services, or protocols into the ioBroker system. They act as interfaces between ioBroker and the external systems you control or from which you collect data. Adapters can be categorized in various ways, such as device adapters, protocol adapters, service adapters, database adapters, visualization adapters, script adapters, and specialty adapters.

Each adapter instance can be individually configured and independently stopped and started by the administrator. This enables flexible and scalable integration of various devices and services into the ioBroker system. Adapter instances run in their own processes and communicate with the js-controller in the background.

## Multi-host systems

In a multi-host system, multiple ioBroker servers can be connected to distribute the load or to integrate additional local hardware. This enables better scalability and flexibility of the ioBroker system. Adapter instances can be distributed across different servers to optimize system resource utilization.

Communication between the servers takes place via TCP/IP connections, and data exchange can be either plaintext or encrypted, depending on the configuration. Multi-host systems offer a robust and scalable solution for large installations with many devices and services.

## Security and updates

Security and regular updates are crucial aspects of using ioBroker. Node.js, the underlying runtime environment, is rapidly evolving and receives regular updates that improve stability and security. It's important to use the LTS (Long Term Support) versions of Node.js, as these are maintained and receive security updates for a longer period.

ioBroker and its adapters utilize many modules and extensions from the JavaScript open-source community. It is important to update these modules regularly to benefit from the latest security and stability improvements. The Node Package Manager (npm) simplifies the management and updating of these modules.

## Summary

ioBroker is a modular and scalable system for integrating and controlling various devices, services, and protocols. The central coordinator, the js-controller, manages the adapters and ensures communication between the system's various components. Adapters enable flexible integration of devices and services, and multi-host systems offer additional scalability and flexibility. Security and regular updates are crucial for ensuring the stability and reliability of the ioBroker system.