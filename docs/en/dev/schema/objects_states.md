# ioBroker Schema
## Objects of type state

States are the most used objects. In States the Adapters store the informations. Some examples:

* A light bulb has states for on/off and brightness
* A weather adapter has states for todays temperature, wind, rain, ...
* A motion sensor has a state for motion detection

Some states are readonly, like the temperature of an temperature sensor. The temperature of a radiator ist also writeable, so the user can set the desired temperature.

### Mandatory Attributes

| **Attribute**         | **Value**    | **Description**
| --------------------- |:-------------|----------------
| `_id`                 | id           | [ID](ids.md) of the object
| `type`                | "state"    | Type "state"
| `common.name`         | string       | Name of the state
| `common.read`         | boolean      | true if state readable
| `common.write`        | boolean      | true if state writeable
| `common.role`         | string       | See list of roles below

### Optional Attributes

| **Attribute**         | **Value**    | **Description**
| --------------------- |:-------------|----------------
| `common.type`         | value type   | Type of stored value, possible values are mixed (default), number, string, boolean, array, object or file
| `common.min`          | number       | Minimum numeric value for common.type = number<br/>For example, Percent values should have 0
| `common.max`          | number       | Maximum numeric value for common.type = number<br/>For example, Percent values should have 100
| `common.step`         | number       | Increase/decrease interval for common.type = number<br/>A thermostat might be set in 0.5 steps
| `common.unit`         | string       | Unit of the value for common.type = number<br/>For example, Percent values have %
| `common.def`          | depends on type | Default value if not set
| `common.defAck`       | boolean      | ???
| `common.desc`         | string or object | Description of the state for user, object can be used for multilanguage descriptions
| `common.states`       | object       | Possible values with text for common.type = number<br/>For example, an alarm system might have {"0": "deactivated", "1": "activated", "2": "alarm"}
| `common.workingID`    | string       | When this state has a helper state WORKING. Here must be written the full name or just the last part if the first parts are the same with actual. Used for HM.LEVEL and normally has value "WORKING"
| `common.custom`       | object       | structure with custom settings for specific adapters. Like {"influxdb.0": {"enabled": true, "alias": "name"}}. enabled attribute is required and if it is not true, the whole attribute will be deleted

### Optional Attributes for other Adapters
Some other Adapters may also be configured here, like the History Adapter.

| **Attribute**         | **Value**    | **Description**
| --------------------- |:-------------|----------------
| `common.history.<HISTORY-INSTANCE>.changesOnly` | boolean | true = only value changes are logged
| `common.history.<HISTORY-INSTANCE>.enabled` | boolean | true = History enabled for this state

### State roles
The state role common.role has a predefined set of roles. The role defines how the state should be presented in the user interfaces. For example, some VIS widgets can only be used with specific states roles.

| **Category**    | **common.role**    | **common.type**    | **Description**
| ----------------|:-------------------|--------------------|------------------------------
| Common          |                    |                    | Very common roles. If role can not be more specific, these roles are used
|                 | text               | string             | 
|                 | text.url           | string             | value contains a url for usage in an anchor, iframe or img
|                 | html               | string             | 
|                 | json               | string             | 
|                 | list               | array              | 
|                 | date               | string or number   | string = parsable by "new Date(ddd)"<br/>number = epoch seconds * 1000
| Sensor          |                    |                    | Boolean values, read-only (common.read=true, common.write=false)
|                 | sensor.alarm       | boolean            | common alarm
|                 | sensor.alarm.fire  | boolean            | alarm for fire
|                 | sensor.alarm.flood | boolean            | alarm for water leakage
|                 | sensor.alarm.power | boolean            | alarm for power, e.g. no power when voltage is 0
|                 | sensor.alarm.secure | boolean            | alarm for door opened, window opened or motion detected for alarm systems
|                 | sensor.door        | boolean            | true = door opened<br/>false = door closed
|                 | sensor.light       | boolean            | feedback from bulb that it is powered on
|                 | sensor.lock        | boolean            | true = locked
|                 | sensor.motion      | boolean            | true = motion detected
|                 | sensor.noise       | boolean            | true = noise detected
|                 | sensor.rain        | boolean            | true = rain detected
|                 | sensor.window      | boolean            | true = window opened<br/>false = window closed
| Indicators      |                    |                    | Boolean values, read-only (common.read=true, common.write=false)<br/>The difference of Indicators from Sensors is that indicators will be shown as small icon. Sensors as a real value. So the indicator may not be alone in the channel. It must be some other main state inside channel.
|                 | indicator          | boolean            | 
|                 | indicator.alarm    | boolean            | 
|                 | indicator.alarm.fire | boolean          | fire detected
|                 | indicator.alarm.flood | boolean         | flood or leakage detected
|                 | indicator.alarm.health | boolean        | health problem
|                 | indicator.alarm.secure | boolean        | door or window is opened
|                 | indicator.connected| boolean            | only for adapter instances. Use indicator.reachable for devices
|                 | indicator.lowbat   | boolean            | true if battery is low
|                 | indicator.maintenance| boolean          | indicates system warnings/errors, alarms, service messages, battery empty or stuff like that
|                 | indicator.maintenance.alarm| boolean    |  
|                 | indicator.maintenance.lowbat| boolean   |  
|                 | indicator.maintenance.unreach| boolean  |  
|                 | indicator.reachable| boolean            | device is online
|                 | indicator.working  | boolean            | indicates that the target systems is executing something, like blinds or lock opening
| Buttons         |                    |                    | Boolean values, write-only (common.write=true, common.read=false)
|                 | button             | boolean            | unspecific button
|                 | button.close.blind | boolean            | 
|                 | button.close.tilt  | boolean            | 
|                 | button.long        | boolean            | press button long
|                 | button.mode        | boolean            | 
|                 | button.mode.auto   | boolean            | 
|                 | button.mode.manual | boolean            | 
|                 | button.mode.silent | boolean            | 
|                 | button.open.door   | boolean            | 
|                 | button.open.window | boolean            | 
|                 | button.open.blind  | boolean            | 
|                 | button.open.tilt   | boolean            | 
|                 | button.start       | boolean            | start button
|                 | button.stop        | boolean            | stop button
|                 | button.stop.tilt   | boolean            | stop button for tilt
| Buttons as sensor |                  |                    | Boolean values, read-only (common.write=false, common.read=true)
|                 | button             | boolean            | Please avoid and use button.press or button.long
|                 | button.long        | boolean            | button pressed long
|                 | button.press       | boolean            | button pressed
| Values          |                    |                    | Numbers, read-only (common.read=true, common.write=false)
|                 | value              | number             | 
|                 | value.battery      | number             | Battery level
|                 | value.blind        | number             | actual position of blind, max is fully open, min is filly closed
|                 | value.blood.sugar  | number             | common.unit = "mmol" or "mgdl"<br/>Blood sugar value
|                 | value.brightness   | number             | luminance level, common.unit="lux"
|                 | value.current      | number             | common.unit = "A"<br/>Current in Ampere
|                 | value.curtain      | number             | actual position of curtain
|                 | value.default      | number             | 
|                 | value.directoion   | number             | indicates up/down, left/right, 4-way switches, wind-direction,...
|                 | value.distance     | number             | 
|                 | value.distance.visibility | number      | 
|                 | value.fill         | number             | common.unit = "l" or "ml" or "m3" or "%"<br/>Fill level
|                 | value.gps          | number             | GPS longitude and latitude together like "5.56;43.45"
|                 | value.gps.elevation| number             | GPS elevation
|                 | value.gps.latitude | number             | GPS latitude coordinates
|                 | value.humidity     | number             | 
|                 | value.interval     | number             | common.unit="sec"<br/>Interval in seconds, can be 0.1 or less
|                 | value.lock         | number             | actual position of lock, max is fully open, min is filly closed
|                 | value.min          | number             | 
|                 | value.max          | number             | 
|                 | value.power.consumption | number        | common.unit = "Wh" or "KWh"
|                 | value.pressure     | number             | common.unit = "mbar"
|                 | value.severity     | number             | higher is more important
|                 | value.speed        | number             | wind speed
|                 | value.sun.elevation| number             | common.unit = "°"<br/>sun elevation in °
|                 | value.sun.azimuth  | number             | common.unit = "°"<br/>sun azimuth in °
|                 | value.temperature  | number             | common.unit="°C" or "°F" or "K"
|                 | value.tilt         | number             | actual position of tilt, max is fully open, min is filly closed
|                 | value.time         | number             | getTime() of Date() object
|                 | value.valve        | number             | 
|                 | value.voltage      | number             | common.unit = "V"<br/>Voltage in Volt
|                 | value.warning      | number             | higher is more important
|                 | value.window       | number             | common.states={"0": "CLOSED, "1": "TILTED", "2": "OPEN"}<br/>It is important to have CLOSED, TILTED, OPEN. Values can differ.









## Example

Here is a example from the Ikea Tradfri Adapter. The state is the on/off value from a light bulb:

```
{
  "_id": "tradfri.0.L-65537.lightbulb.state",
  "type": "state",
  "common": {
    "def": false,
    "type": "boolean",
    "read": true,
    "write": true,
    "name": "on/off",
    "role": "switch"
  },
  "native": {
    "path": "lightList.[0].onOff"
  },
  "from": "system.adapter.tradfri.0",
  "user": "system.user.admin",
  "ts": 1565733083196,
  "acl": {
    "object": 1636,
    "state": 1636
  }
}
```
