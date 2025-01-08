---
title: definitions
lastChanged: 28.10.2022
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/basics/glossary.md
hash: JnivtZyRdEJ0E0HkDbRXmChDkytvfguiAW5fiVp6ki0=
---
To make getting started easier and further help more understandable, the most important terms that appear in and around ioBroker are explained here.

* **Adapter**

A module or driver for a device, service or for providing data.
Due to the very modular structure of ioBroker, practically everything is an adapter: admin interface, visualization, scripting, ...

* **Admin**

The admin adapter provides the web interface for configuring ioBroker. This includes installing adapters, creating instances, creating and checking objects, states, editing scripts and much more.

* **Categories**

English term: enum(eration)

A list/category is a list of specific objects that have been grouped together.

* **Blockly**

Blockly allows you to graphically assemble simple controls and scripts using linkable function blocks. No programming knowledge is required.

When a Blockly script is saved, JavaScript code is generated which is then executed.

* **CCU**

Is the Homematic Smarthome control center from the manufacturer eQ-3. There are 2 versions, the older CCU1 and the newer model CCU2, as well as the brand new CCU3.

CCU stands for Central Control Unit

The CCU2 and CCU3 can control all Homematic and HomematicIP devices. The CCU1 can only handle Homematic devices.
Homematic devices are available in wireless and wired versions (wired bus).

* **CSS**

Cascading Style Sheets. CSS can be used to describe the display of web pages independently of the content. As a supplement to the page structure defined in HTML, CSS defines how the page is displayed.

* **Cubietruck/Cubieboard 3**

Single-board computer similar to Raspberry PI/Odroid, but with SATA interface and 2GB RAM

* **Device**

English term: Device

In ioBroker, a device is often the next level below an adapter and groups all channels and states of the device.

* **Homematic**

Homematic is a smart home system manufactured by eQ-3 and distributed by elv. See also CCU.

* **Host**

The host is the computer/server on which ioBroker is running.

In multihost mode there are several hosts, one of which is the master, the others are the slaves

* **HTML**

Hypertext Markup Language. A page description language (the basis of the WWW) that is used to display content (text, links, graphics, videos, etc.) in web browsers.

* **instance**

Each adapter has at least one instance (but there can be several).
There are different reasons why multiple instances are used.
For example, you can test with a second instance of the JavaScript adapter without the risk of important scripts failing, since in the event of an error only the test instance is affected.

Most adapters can be started with multiple instances to be able to address multiple devices of the same type or with the same protocol. An instance corresponds to a running process on the host.
Example: 2 Hue bridges are to be integrated into ioBroker. However, since only one bridge can be configured per adapter, a 1st and 2nd instance of the Hue adapter is simply created and each bridge is configured in the corresponding instance of the adapter. The instantiation also makes it easy to tell the data points apart, since the instance name precedes the object structure (e.g. hue.0 and hue.1).

* **Javascript**

Programming language with which everything is programmed at ioBroker and also own scripts are programmed.

* **js-controller**

The js-controller is the main process of ioBroker and provides the necessary central basic functionality for all other modules.
It also provides access to the central object and state databases, coordinates all running adapter instances and processes and monitors them. If necessary, adapters are restarted by the js-controller.

* **Channel**

A channel groups thematically related states and is normally located under a device. There can be several channels per device.

* **Master**

The master is the host that is centrally responsible for managing all instances (including the slave instances!). When the master is terminated, the slave instances are also terminated. The master provides the central object and status databases for all slaves, to which all slaves connect.

* **Multihost mode**

The multihost mode of ioBroker can be used to distribute the control tasks across multiple computers if they require special interfaces (e.g. reading electricity meters in the basement). Furthermore, multiple hosts can be used to evenly distribute the load or memory usage. In multihost mode, one host is defined as the master; all others are slaves. The master controls all slaves and also the distribution of instances across the slaves.

* **Node-Red**

Graphical programming interface in which finished modules (nodes) can be linked to complex programs by simple chaining (flow).

* **Objects and States**

Basic definitions can be found [here]

* **Objects**

Objects describe a state in more detail and provide meta information, configuration and description about it. An object has a type, e.g. host, adapter, instance, enumeration, device, channel or data point...

The meta data also defines the data type of the state, e.g. number, boolean, string and also how the state should be represented in visualization interfaces.

* **Odroid**

Single-board computer similar to a Raspberry PI. There are several versions with different hardware configurations.

* **Parser adapter**

An adapter that cuts out parts of texts, regardless of their origin, by specifying so-called regular expressions, which can then be written into states. These values can then be further processed in scripts, etc.

* **Raspberry PI**

Credit card-sized single-board computer (developed by the Raspberry PI Foundation). All components required to operate a computer (CPU, GPU, RAM, etc.) are located on the board. The advantage over conventional computers is the minimal power consumption and the size. Disadvantage: CPU, RAM, etc. cannot be replaced or upgraded.

* **Redis**

A No-SQL database that keeps your data in memory and can be used in ioBroker to store state data. Is optionally used to increase performance, as no access to a hard disk, SSD or SD card is required for write and read actions. To use a Redis DB with ioBroker, this must be specified in the js-controller basic configuration.

* **State**

see condition or objects

* **vis**

The VIS adapter allows you to create your own user and visualization interfaces for ioBroker and display them on different devices. The interfaces are put together from customizable widgets and your own HTML code and their appearance can be changed using CSS.

* **Widget**

A control element in Vis. Widgets are used to display or control states; for example, turning a lamp on and off using a button that changes its appearance depending on the switching state.

* **condition or state**

A state contains the current value of a data point in ioBroker.
It also describes the timestamp, the time of the last change and the confirmation by the sender or receiver.

States can be stored in a JSON file or a Redis DB.

[hier]: https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/objectsschema.md