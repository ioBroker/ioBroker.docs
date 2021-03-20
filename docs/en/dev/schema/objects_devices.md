# ioBroker Schema
## Objects of type device

Devices represent a real device in the schema. A device can be a light bulb, a motion sensor, ...

The device object is used to group one or more channels or states specific to a device. It should have no parent except adapter instance namespace.

### Mandatory Attributes

| **Attribute**         | **Value**    | **Description**
| --------------------- |:-------------|----------------
| `_id`                 | id           | [ID](ids.md) of the object
| `type`                | "device"     | Type "device"
| `common.name`         | string       | Name of the Device

## Example

Here is a example light bulb device from Tradfr-Adapter:

```
{
  "_id": "tradfri.0.L-65544",
  "type": "device",
  "common": {
    "name": "Bedroom",
    "icon": "icons/bulb_ws.png"
  },
  "native": {
    "instanceId": 65544,
    "manufacturer": "IKEA of Sweden",
    "firmwareVersion": "2.3.050",
    "modelNumber": "TRADFRI bulb E14 WS opal 400lm",
    "type": "lightbulb",
    "serialNumber": ""
  },
  "from": "system.adapter.tradfri.0",
  "user": "system.user.admin",
  "ts": 1565733083254,
  "acl": {
    "object": 1636
  },
  "enums": {}
}
```

