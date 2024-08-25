---
lastChanged: 24.08.2024
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/basics/adapter.md
title: Controllers and adapters
hash: 8HcEKegvo687TBc+kFOupFkmNBDZ+XMvC0iQNS62dKE=
---
# Controllers and adapters
## What is a controller?
A controller in ioBroker is a central component that is responsible for managing and coordinating the entire ioBroker system.
It performs tasks such as managing the adapters, storing data and providing interfaces for communication between the different components of the system.
Currently, Controller is written with TypeScript.

### Main functions of a controller
-

- **Adapter management**: The controller monitors and controls the various adapters installed in the ioBroker system.
- **Data Management**: The controller stores and manages the data collected by the adapters.
- **System Monitoring**: The controller monitors the health of the entire system and ensures that all components and adapters are functioning properly. It can trigger notifications and alarms when problems occur.

## What is an adapter?
An adapter in ioBroker is a software component that allows you to integrate various devices, services or protocols into the ioBroker system.
Adapters act as interfaces between ioBroker and the external systems you control or collect data from.

### Main functions of an adapter
1. **Data integration**: Adapters collect data from external devices or services and make this data available in ioBroker. This can include, for example, sensor data, status information or other relevant data.
2. **Control**: Adapters make it possible to control external devices or services via the ioBroker system. This can include, for example, turning devices on and off, setting parameters or executing commands.
3. **Protocol translation**: Adapters translate the communication protocols of external devices or services into a format that ioBroker can understand. This enables seamless integration of different systems that use different protocols.

### Examples of adapters
- **Zigbee adapter**: Enables the integration of Zigbee-based devices such as lamps, sensors and switches.
- **MQTT Adapter**: Enables communication with MQTT-based services and devices.
- **HTTP adapter**: Enables the integration of services that communicate via HTTP.

### Benefits of using adapters
- **Flexibility**: Adapters enable the integration of a wide range of devices and services, regardless of their communication protocols.
- **Extensibility**: New adapters can be developed to support additional devices or services, allowing the ioBroker system to be continuously expanded.
- **Centralization**: By using adapters, all devices and services can be managed and controlled centrally via the ioBroker system.

### Types of adapters
- **Device adapters**: These adapters enable the integration and control of physical devices such as lamps, sensors and switches. Examples are the Zigbee adapter and the Z-Wave adapter.
- **Protocol adapters**: These adapters translate various communication protocols into a format that ioBroker can understand. Examples are the MQTT adapter and the HTTP adapter.
- **Service adapters**: These adapters enable the integration of online services and APIs. Examples are the Alexa adapter and the Google Home adapter.
- **Database adapters**: These adapters enable the storage and query of data in various database systems. Examples are the SQL adapter and the InfluxDB adapter.
- **Visualization adapters**: These adapters provide options for visualizing and presenting data. Examples are the Vis adapter and the Flot adapter.
- **Script adapters**: These adapters allow you to create and run scripts within ioBroker. Examples are the JavaScript adapter and the Blockly adapter.
- **Specialty adapters**: These adapters provide special features or integrations that do not fit into the other categories. Examples are the Ping adapter and the Backitup adapter.