---
title: Glossary
lastChanged: 08.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/basics/glossary.md
hash: 7Dl6z2K1j9x64D+6dzRprWkUXq5eRzFu4fHQKUkt934=
---
# Glossary

When working with ioBroker, you'll encounter a handful of terms that you need to know to understand tutorials and forum posts. Here they are, listed alphabetically.

- **adapter**

  A module for a device, service, or function. Because ioBroker is entirely made up of modules, almost everything is an adapter: the admin interface, the visualization, the script execution. See [Controller and Adapter](/docs/basics/adapter.md) .

- **Admin**

  The adapter that provides the web interface is usually on port 8081. Everything runs through it: installing adapters, creating instances, viewing objects, and writing scripts. See [Admin Interface](/docs/admin/README.md) .

- **Alias**

  A virtual data point that points to a real one. This allows you to change the name, role, and unit of another data point without modifying the adapter. See [Alias](/docs/basics/alias.md) .

- **Backup**

  A backup of the installation. The ioBroker backup includes objects, states, and configurations, but **not** the recorded measurement data. See [Data Backup](/docs/config/backup.md) .

- **Blockly**

  Graphical programming: Scripts are assembled from building blocks instead of being written. When saved, this results in JavaScript, which is then executed. No programming knowledge is required.

- **CCU**

  _The Central Control Unit (CCU)_ is eQ-3's smart home control center for Homematic. The current version is the CCU3. It can be used to control Homematic and Homematic IP devices, both wireless and wired.

- **Data point**

  Colloquially, the position where a value is located. More precisely, it consists of two parts: the **object** that describes the value, and the **state** that contains it. See [states](/docs/basics/states.md) .

- **Device**

  English: _device_ . A level in the object tree, usually directly below the adapter, that summarizes all channels and states of a device.

- **Homematic**

  A smart home system from eQ-3, widely used in Germany. The devices are connected via a CCU.

- **Host**

  The computer on which ioBroker is running. In a multi-host setup, there are several.

- **Instance**

  An ongoing process of an adapter. Most adapters allow multiple adapters, so that, for example, two Hue Bridges can be set up separately. The instance number is at the beginning of the object tree:`hue.0` and`hue.1` See [Controllers and Adapters](/docs/basics/adapter.md) .

- **JavaScript**

  The programming language in which ioBroker and its adapters are written, and in which you can also write your own scripts.

- **js-controller**

  The main process of ioBroker. It manages the two databases, starts the instances, monitors them, and restarts them in case of errors. See [js-controller](/docs/dev/controller.md) .

- **jsonl**

  The default file format of the two internal databases. This resolves the older issue.`file` -format and is significantly faster. See [Redis](/docs/config/redis.md) .

- **channel**

  A level that groups related states, usually below a device. A device can have multiple channels.

- **category**

  English _enum_ . A list of objects that belong together: all the appliances in a room, all the lamps in the house. See [categories](/docs/basics/enums.md) .

- **Multihost**

  Operating across multiple computers, for example to distribute load or to use an interface that is only connected to a specific device. One host manages the databases, and the others connect to it. See [Multihost](/docs/config/multihost.md) .

- **Node-RED**

  Graphical programming by chaining pre-built modules into a sequence. An alternative to Blockly, with its own interface.

- **object**

  The description of a data point: name, data type, unit, role, whether it is readable and writable. The object itself rarely changes, but its state is constant. See [Objects](/docs/basics/objects.md) .

- **Redis**

  A database that stores its data in RAM. In ioBroker, it can optionally be used for system states, which significantly reduces write operations to the card or disk on larger systems. See [Redis](/docs/config/redis.md) .

- **Repository**

  The list from which the adapters come. There are two: _stable_ for regular operation and _beta_ for testing. See [Repositories](/docs/basics/repositories.md) .

- **role**

  What a value represents: switch, temperature, brightness. User interfaces and voice assistants adapt to it. See [Roles of data points](/docs/basics/roles.md) .

- **State**

  See condition.

- **vis / vis-2**

  The visualization: custom user interfaces assembled from widgets. **vis-2** is the successor and the right choice for new projects. See [Visualizations](/docs/viz/README.md) .

- **Widget**

  A control element in a visualization. It displays or controls a state, such as a switch that changes its appearance.

- **Condition**

  English _state_ . The current value of a data point, along with the timestamp, the time of the last change, and the confirmation indicator (`ack` ). See [conditions](/docs/basics/states.md) .