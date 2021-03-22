# ioBroker Schema
## Objects of type channel

Channels are used to group one or more states. The parent should be device.

### Mandatory Attributes

| **Attribute**         | **Value**    | **Description**
| --------------------- |:-------------|----------------
| `_id`                 | id           | [ID](ids.md) of the object
| `type`                | "channel"    | Type "channel"
| `common.name`         | string       | Name of the Channel

### Optional Attributes

| **Attribute**         | **Value**    | **Description**
| --------------------- |:-------------|----------------
| `common.role`         | role         | Describes the states in the channel, same values like common.role in states

## Example

Here is a example from a weather forecast Adapter. The channel is used to group all states from the next day:

```
{
  "type": "channel",
  "common": {
    "name": "Day 1",
    "role": "weather"
  },
  "native": {},
  "from": "system.adapter.daswetter.0",
  "user": "system.user.admin",
  "ts": 1565731801542,
  "_id": "daswetter.0.NextDays.Location_1.Day_1",
  "acl": {
    "object": 1636
  }
}
```
