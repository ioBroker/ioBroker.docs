---
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/basics/alias.md
title: Alias
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
hash: QwIPQTgQXD25NUUWMGQmkjrFfy7z1Q/QBg/phOj2ik0=
---
# Aliases
Alias (pseudonym) is a virtual data point that is linked to a real data point.

## Use cases
Often the real devices are defective and the user has to replace this device.
In addition to replacing the hardware, the address of this device is changed. For example, from `hm-rpc.0.ABC123` to `hm-rpc.0.QJU978`.

Since the old address was used in many places like vis, javascript, scenes or others, the user now has to find all these places and replace it there.

This feature allows the user to assign an alias for the data point of a physical device and use that alias in all cases.
If the device needs to be replaced, the ID only needs to be changed in the alias.

Another use case for this feature is supporting devices in special smart adapters like iot or material.
Using aliases, the required state structure can be created, but the values are read from physical devices.

## Explanation
All data points created in the object namespace `alias.0` are managed as alias data points.

The value of the alias is read from the associated data point (target), but object properties (like common, native) are themselves read from the alias data point.

In fact, a `alias` object mirrors the value of the target object.
If allowed, both values can be changed and will be automatically synchronized by the ioBroker core system.
Both states can also be used to subscribe to scripts and should behave exactly the same.

Here is an example of such an object:

```
{
  "_id": "alias.0.Light.Device_1.WORKING",
  "type": "state",
  "common": {
    "alias": {
      "id": "admin.0.connected"
    },
    "name": "WORKING",
    "role": "indicator.working",
    "type": "boolean"
  },
  "native": {}
}
```

`native` is always empty because there is no device behind the alias and all settings are saved in `common`.

The ID of the data point whose value must be read or written is stored in `common.alias.id`.

Alias converts the value automatically if Min/Max settings are defined for both objects (alias and target).

For example, if the alias is `min=0,max=100` and the destination is `min=0,max=255`, when reading, the value 10 from the destination state will be converted to 3.9215686274509802 and the value written to the alias 10 will be converted to 25.5.

The types are also converted automatically: from string to number, from number to boolean and so on. It depends on the alias and target types.

Additionally, write and read functions can be defined in `common.alias`:

```
{
  "_id": "alias.0.Temperature.SET",
  "type": "state",
  "common": {
    "alias": {
      "id": "knx.0.6786878.value",
      "write": "(val * 9/5) + 32",
      "read": "(val − 32) * 5/9"
    },
    "unit": "°C",
    "name": "Temperature",
    "role": "value.temperature",
    "type": "number"
  },
  "native": {}
}
```

Goal

```
{
  "_id": "knx.0.6786878.value",
  "type": "state",
  "common": {
    "unit": "°F",
    "name": "Temperature",
    "role": "value.temperature",
    "type": "number"
  },
  "native": {}
}
```

If conversion functions are defined, automatic conversion is disabled. For read-only functions, the write function could be omitted, correspondingly for write-only functions - the read function.

E.g.

```
{
  "_id": "alias.0.button",
  "type": "state",
  "common": {
    "alias": {
      "id": "knx.0.6786879.value",
      "write": "val ? 1 : 0"
    },
    "name": "Button",
    "role": "button",
    "type": "boolean"
  },
  "native": {}
}
```

Goal

```
{
  "_id": "knx.0.6786879.value",
  "type": "state",
  "common": {
    "name": "KNX Switch",
    "role": "value",
    "type": "number",
    "min": 0,
    "max": 1
  },
  "native": {}
}
```

Subscriptions are managed automatically. When an alias is subscribed, the target ID is also subscribed.

The target device ID can be changed dynamically (via the administrator) and the subscription will be updated for a new target ID.

Since version 3.0 of the js-controller, separate status and command data points can be merged in the alias:

* alias.id.write contains the ID of the data point that is set when the alias is written
* alias.id.read contains the ID of the data point mirrored by the alias

```
{
    _id: "alias.0.aliasName",
    common: {
        name: 'Test AliasC',
        type: 'number',
        role: 'state',
        min: -10,
        max: 10,
        alias: {
            id: {
                read: 'state.id.to.read.from',
                write: 'state.id.to.write.to'
            }
            read: 'val * 10 + 1',
            write: '(val - 1) / 10'
        }
    },
    native: {},
    type: 'state'
}
```
