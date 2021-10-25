---
title: architecture
lastChanged: 13.09.2018
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/basics/architecture.md
hash: tRt6MnfQ7NhW3HVZYiIHrRBTqLWlqKrd6ES9IOnC1ic=
---
# System structure
?> ***This is a placeholder*** .<br><br> Help with ioBroker and expand this article. Please note [ioBroker Style Guide](https://www.iobroker.net/#de/documentation/community/styleguidedoc.md) so that the changes can be adopted more easily.

## Architecture
ioBroker is modular, i.e. made up of many individual components. Each module has a specific task. In order to keep track of things, ioBroker has a central coordinator for all of its modules. This coordinator is the `js-controller` working in the background. He is responsible for central data storage as well as management and communication between all modules. The modules themselves are called `Adapter`. Adapters are only installed by the user when required. The web-based administration interface `admin` is itself also an adapter. The Admin-Adapter or "Admin" for short is the management interface of an ioBroker system. The admin is usually called with the address [http:// localhost: 8081](http://localhost:8081).

When a new adapter is installed with the Admin, the adapter files are first downloaded from the Internet and written to the server hard drive. If an adapter is to be started, a `Instanz` of the adapter is generated first. Each adapter instance can be configured individually and stopped and started independently with the admin. Therefore, each instance runs in its own process that communicates in the background with the ioBroker js-controller.

In a `Multihost` system with several ioBroker servers, instances of adapters can also be distributed on different servers. This means that the load can be distributed or additional hardware can be connected directly on site (e.g. IO ports, USB).

The communication between adapters, js-controllers, databases and web frontends takes place via several TCP / IP connections. The data exchange takes place either in plain text or encrypted, depending on the selected setting.

ioBroker and adapter are mainly written in the JavaScript programming language. An appropriate runtime environment is required to run JavaScript. ioBroker is therefore based on `Node.js`. This runtime environment is available for a wide variety of software platforms such as Linux, Windows and macOS. The JavaScript package manager `npm` is used to install ioBroker and the adapters.

@@@ Explanation of a pretty picture with architectural layers @@@ @@@ JS controller and transition to adapters & instances @@@