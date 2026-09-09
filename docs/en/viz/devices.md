---
title: Device adapter
lastChanged: 09.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/viz/devices.md
hash: fW1CY5wexEjEtuTwURrLWOVzVWBqTCr4vb3j2wKdmdc=
---
# Surface from the Devices adapter

The [\`devices\`](/adapters/devices) adapter isn't actually a visualization adapter. It assigns data points to **devices** : a switch, a feedback signal, and a counter become a lamp; four values become a thermostat. Since version 4, it can also generate a complete user interface directly from these devices, and that's precisely what this page is about.

The adapter only runs as a tab in the admin panel. It doesn't query any devices and requires virtually no processing power.

## Why the detour is worthwhile

A single data point tells us little.`hm-rpc.1.00085A49A3F98C.4.STATE` is a`boolean` The system knows nothing more than that. Only when it results in a device of type`light` The other adapters will know what to do:

- When creating a widget **, vis-2** suggests the appropriate data points.
- **[Lovelace](/docs/viz/lovelace.md)** builds its surface from it.
- **IoT** reports the device to Alexa or Google as a lamp, not as a switch.
- **Matter** can only pass it on in the first place.
- A script locates the device via its type rather than a cryptic identifier.

There is also a second advantage, which only becomes apparent later: The devices are located below`alias.0.<Name>` If the device is later replaced, the assignment is changed in one place. Visualization, scripts, and recording do not notice this.

## Create a device

The tab is called **"Devices"** in the admin panel. It must be enabled in the admin instance settings, just like scripts and logs.

1. Click **+** , give it a name and choose a **type** , for example`light` ,`blind` ,`thermostat` or`temperature` .
2. Assign the data points. Required fields are marked with`*` It is marked as such; optional fields such as humidity for the temperature sensor can be omitted.
3. Save. The device will appear under`alias.0.<Name>` in the object tree.

Almost every model also displays battery, connection, and error **statuses** . These are optional but are evaluated by Lovelace and Matter.

An alias can do more than just point to a data point: Read and write operations can be performed on **different** data points, and a conversion can be defined for both directions. This way, a roller shutter that reports 0 for open becomes a device that behaves like all others.

## Where the devices come from

| Origin                     | Description                                                                                                                                                                                                          |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Automatically detected** | Adapters like`zigbee` or`hm-rpc` They already provide a usable structure. The devices adapter recognizes them automatically, **but only if a room or function is assigned.** Without an assignment, nothing happens. |
| **Alias**                  | The recommended method for anything made by hand. The equipment is located below.`alias.0` .                                                                                                                         |
| **Linked Devices**         | The predecessor via the adapter`linkeddevices` . No longer intended for new installations.                                                                                                                           |

The types that exist and the data points they expect are listed in the [type-detector](https://github.com/ioBroker/ioBroker.type-detector/blob/master/DEVICES.md) .

## The built-in surface

Once the devices are configured, a user interface can be created if desired. It is accessible via the associated \[link/path].`web` -Instance reachable, usually under`http://<adresse>:8082/devices/` .

What can be adjusted:

- **Which devices appear** is determined by the **GUI** column in the device list. Anything that isn't checked is excluded.
- **Rooms.** They are taken from the categories and can be named, colored, and given a background image.
- **Tiles.** Size, symbol, and label can be changed per device. Where a trend is recorded, the tile can show a curve or the day's high and low values.
- **Favorites and groups** for the devices you use constantly.
- **Additional tiles** that are not device-related: clock, weather, a website, a line break, even an embedded Vis 2 view.
- **Color themes** , including “Clean Light” and “Tech Blue”.

The interface can also be set up as a browser extension and transferred to the [ioBroker VisuApp](/docs/cloud/app.md) on the phone.

This interface **does not replace vis-2** . It is intended for quickly and automatically generated room views. Anyone who wants to build a dashboard exactly to their own specifications should use [vis-2](/docs/viz/README.md) .

## A video about it

The ioBroker channel shows the entire process in just over twenty minutes, from the aliases to the room view to the app: [ioBroker Devices/Device Adapters: Automatic Visualization for Smart Home](https://www.youtube.com/watch?v=C-e8j8NHdi0) (May 2026).

## Further information

- [Categories](/docs/basics/enums.md) and the [Categories](/docs/admin/enums.md) tab: the basis for spaces and functions
- [Roles of data points](/docs/basics/roles.md) : how an adapter recognizes what a data point is
- [Alias](/docs/basics/alias.md) : what's behind`alias.0` is
- [Overview](/docs/viz/README.md) : the other ways to reach a surface