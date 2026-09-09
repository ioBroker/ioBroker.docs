---
title: Lovelace
lastChanged: 09.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/viz/lovelace.md
hash: P4YL5T5QBxPenVqmlLw3XNXXVGwpJ4KslDYbhr1nfKE=
---
# Lovelace

The [Lovelace](/adapters/lovelace) adapter brings the **Home Assistant** interface to ioBroker. It is natively compatible with phones, tablets, and computers, has a built-in editor that lets you see what you're building, and a wide selection of pre-made **maps** .

The adapter is one of the most active visualizations in the repository and is continuously maintained.

## How does that fit together?

Home Assistant doesn't use data points, but rather **entities** . An entity is usually an entire device and carries an identifier of the form...`domäne.name` , approximately`light.wohnzimmer` The domain determines how the map behaves: a`light` gets a brightness control, a`cover` Arrows for driving.

In ioBroker, a device consists of several data points. The adapter uses these to assemble the entities and presents the interface with a Home Assistant environment that doesn't actually exist.

That's precisely why preparation is more important than design. If you've set up your equipment properly, you've already done half the work.

## Where the entities come from

**The recommended method is automatic detection.** The adapter uses the same detection method as...`iot` and the Devices adapter. Anything that appears as a device there also appears in Lovelace.

Only devices with assigned **space and function** are recognized. If either is missing, the adapter ignores the device. This is the most common reason for a blank interface.

The [Devices adapter](/docs/viz/devices.md) is the interface for this detection process. The adapter's instructions explicitly recommend installing it: It shows which devices are detected and allows you to select an existing object for each data point of a device. Roles and types are automatically set correctly, enabling the detection to work.

**The second method is configuration at the object level.** Lovelace can be enabled in the settings of a data point, and a domain and its name can be specified. For simple cases such as...`input_boolean` or`input_number` That's sufficient. For multi-part devices, you select the data points for each task from selection fields.

For multi-part devices, the object to which the setting is attached is only the **anchor** : It gives the entity an identifier and name; its own value is not read. The values come from the selection fields.

## What can be depicted

In addition to switches and measured values, the adapter also knows, among other things...`light` ,`cover` ,`climate` ,`lock` ,`media_player` ,`vacuum` ,`humidifier` ,`water_heater` as well as `device_tracker`and`person` for presence and location on the map. This also includes special cases such as alarm systems, timers, weather, and video.

For devices that are not available in ioBroker, such as an alarm system, the adapter's instructions show a small script that creates the appropriate data point.

## Furnish

1. The adapter`lovelace` Install in the [Adapter](/docs/admin/adapter.md) tab and create an instance.
2. Maintain rooms and functions in the [Categories](/docs/admin/enums.md) tab, if not already done.
3. Access the interface. Lovelace comes with its **own web server** , usually`http://<adresse>:8091` .

A`web` Therefore, an adapter is not needed. Login and encryption can be enabled within the instance.

## On the go

Three ways, in the order in which the adapter's instructions list them:

- **VPN** to your own network.
- **Open the port to the outside** , with built-in login and encryption.
- **Via the ioBroker cloud.** This builds the`cloud` The adapter establishes the connection from the inside out, so nothing is open. This is particularly helpful for connections without their own public address (Dual Stack Lite). To achieve this, the Lovelace instance is selected in the cloud adapter configuration; it then appears on [iobroker.pro](https://iobroker.pro) under the applications.

When using the cloud **, encryption and login are disabled** in the Lovelace instance. Both are handled by the ioBroker account.

The approach via the cloud is described in detail under [Visualizations via the Cloud](/docs/cloud/viz.md) .

## Design

The editor is integrated into the interface and is opened via the pencil icon in the upper right corner. Maps are selected and arranged with the mouse; a YAML editor is available for more detailed adjustments. For those who want more, the Home Assistant ecosystem offers many **custom maps** and **themes** that can be used in ioBroker.

The complete description with all maps, themes and settings can be found in the [adapter's documentation](/adapters/lovelace) .

## Further information

- [Overview](/docs/viz/README.md) : the other ways to reach a surface
- [Device adapters](/docs/viz/devices.md) : the devices Lovelace builds from
- [Categories](/docs/admin/enums.md) : Maintaining spaces and functions