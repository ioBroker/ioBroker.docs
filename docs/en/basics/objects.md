---
lastChanged: 13.09.2018
template: true
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/basics/objects.md
title: How is the information stored?
hash: 1esXUxnW4ODED5oca7t4iOPzFYH7TNdyhjh2/64jlUk=
---
# How is the information stored?
In ioBroker there are two types of information:

- Objects: Meta data that describes the structure and properties of the data, e.g. name, type, unit, min/max values.
- States: The actual data, e.g. 23.5°C, true, "Hello World".

## Objects
There are different types of objects:

- `host`: The information about the host (computer) on which the ioBroker is running. Several hosts can run in one system.
- `user`: The information about a user: password, picture, name, color. Multiple users can exist.
- `group`: Information about a group that contains multiple users.
- `script`: The information about a script: source code, name, description.
- `design`: Contains instructions on how the controller should search for objects of a specific type.
- `adapter`: An adapter is a software module that performs a specific task, such as reading data from a device or controlling a device.
- `instance`: An instance is a copy of an adapter running on a host. An instance has an index.
- `device`: A device is a group of channels that belong to a physical device, e.g. a light switch.
- `channel`: A channel is a group of states that belong together thematically, e.g. all states of a light switch.
- `state`: A data point is a state, e.g. the temperature of a room.
- `enum`: A category is a group of objects that belong together thematically, e.g. all devices in a room.
- `meta`: A meta object is an object that contains information about other objects, e.g. the description of a device.
- `chart`: A chart object is an object that contains the configuration for a chart.
- `folder`: A folder is an object that contains other objects, e.g. all devices in a room.
- `schedule`: A schedule is an object that contains the configuration for a schedule.
- `config`: A configuration object is an object that contains the configuration about ioBroker: language, active repositories, etc.