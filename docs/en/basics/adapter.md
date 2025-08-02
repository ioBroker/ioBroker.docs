---
lastChanged: 24.08.2024
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/basics/adapter.md
title: Controllers and adapters
---
# Controllers and adapters

## What is a controller?

A controller in ioBroker is a central component that is responsible for managing and coordinating the entire ioBroker system.
It performs tasks such as managing the adapters, storing data and providing interfaces for communication between the adapters.
Currently, the Controller is written with TypeScript.

### Main functions of a controller

- **Adapter management**: The controller monitors and controls the various adapters installed in the ioBroker system.
- **Data Management**: The controller stores and manages the data collected by the adapters.
- **System Monitoring**: The controller monitors the health of the entire system and ensures that all components and adapters are functioning properly. It can trigger notifications and alarms when problems occur.
- **Communication**: The controller provides the interfaces through which the different adapters of ioBroker can communicate with each other.

## What is an adapter?

An adapter in ioBroker is a software component that allows you to integrate various devices, services or protocols into the ioBroker system.

It can perform different actions on gathered data, such as storing, processing, or forwarding it to other systems. It can visualize the data too in different ways.

Adapters act as interfaces between ioBroker and the external systems that you control or collect data from or between and the human.

### Main functions of an adapter
1. **Data integration**: Adapters collect data from external devices or services and make this data available in ioBroker. This can include, for example, sensor data, status information or other relevant data.
2. **Control**: Adapters make it possible to control external devices or services via the ioBroker system. This can include, for example, turning devices on and off, setting parameters or executing commands.
3. **Visualisation**: Adapters can visualize data in different ways, such as charts, graphs, tables, buttons, sliders, etc.
4. **History**: Adapters can store data for later analysis or visualization.
5. **Automation**: Adapters can trigger actions based on certain conditions or events.
6. **Notification**: Adapters can send notifications or alerts based on certain conditions or events.
7. **Service**: Adapters can back up configurations, update firmware, etc.

### Examples of adapters
- **Zigbee adapter**: Enables the integration of Zigbee-based devices such as lamps, sensors and switches.
- **MQTT Adapter**: Enables communication with MQTT-based services and devices.
- **JavaScript Adapter**: Allows you to write scripts in JavaScript/TypeScript or graphically combine the logic blocks to control devices or services.

### Benefits of using adapters
- **Flexibility**: Adapters enable the integration of a wide range of devices and services, regardless of their communication protocols.
- **Extensibility**: New adapters can be developed to support additional devices or services, allowing the ioBroker system to be continuously expanded.
- **Centralization**: By using adapters, all devices and services can be managed and controlled centrally via the ioBroker system.

### Types of adapters
- `general` - General purpose adapters. Examples are the `web`, `welcome` or `js-controller` adapters.
- `alarm` - For security and alarm features. Examples are the camera adapters.
- `climate-control` - For controlling heating, ventilation, and air conditioning systems. Examples are the `Daikin` or `dysonairpurifier` adapters.
- `communication` - For communication with other systems or services. Examples are the `Rest-API` or `cloud` adapters.
- `date-and-time` - For controlling of devices on schedule. Examples are the `trashschedule` or `birthdays` adapter.
- `energy` - For monitoring and controlling energy consumption or production. Examples are the `Solarlog` or `SMA-EM` adapter.
- `garden` - For controlling garden devices. Examples are the `gardena` or `rainbird` adapter.
- `geoposition` - For tracking the position of devices. Examples are the `geofency` or `owntracks` adapter.
- `hardware` - These adapters enable the integration and control of physical devices such as lamps, sensors and switches. Examples are the Zigbee adapter, the Z-Wave adapter, etc.
- `health` - For monitoring health data. Examples are the `fitbit-fitness` or `withings` adapter.
- `household` - For controlling household devices like vacuum cleaners or dishwashers. Examples are the `botvac` or `ecovacs-deebot` adapter.
- `infrastructure` - For monitoring and controlling infrastructure devices, like routers, printers or NAS. Examples are the `fritzbox` or `proxmox` adapter.
- `iot-systems` - For integrating IoT systems with various types of devices. Examples are the `s7` or `tasmota` adapter.
- ...
