---
lastChanged: 06.06.2019
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/basics/states.md
title: States and data points
hash: MuOzn/4lCqzcKVo9fnOB28aNM+QE+RBdW9FF8LOvq00=
---
# States and data points
A **data point** consists of a static object of type `state` and a dynamic state.

Properties of a state are:

* `val` - current value
* `ack` - Flag indicating that the value has been acknowledged by the target system
* `ts` - Unix timestamp of the last update of the state (in milliseconds)
* `lc` - Unix timestamp of the last value change (in milliseconds)
* `q` - [quality](../dev/objectsschema.md#states)
* `from` - (optional) source (adapter instance) of the last update
* `user` - (optional) User name who last wrote the value.
* `c` - (optional) comment
* `expire` - (optional) Time in seconds when the value is reset to `null`.

Attributes of the static object are id, type = 'state', common, native. The following common attributes are possible:

* `common.type` (optional) - default is 'mixed' = any type. Possible values: `number`, `string`, `boolean`, `array`, `object`, `mixed`, `file`.
* `common.name` (optional, string)
* `common.max` (optional, number)
* `common.step` (optional, number) - increase / decrease interval. E.g. 0.5 for thermostat
* `common.unit` (optional, string)
* `common.def` (optional - the default value)
* `common.defAck` (optional - if common.def is set, this value is used as ack flag, js-controller 2.0.0+)
* `common.desc` (optional, string or object) - description, object for multilingual description
* `common.read` (bool, mandatory) - true if the data point is readable
* `common.write` (bool, mandatory) - true if the data point is writable
* `common.role` (string, mandatory) - Role of the data point (used in user interfaces to specify which widget to select. [Look here](../dev/stateroles.md)
* `common.states` (optional) Attribute with object of possible states` {'value': 'valuename', 'value2': 'valuename2', 0: 'OFF', 1: 'ON'} `
* `common.workingID` (string, optional) - if this status has the auxiliary status WORKING. Here the full name must be written or only the last part if the first parts are the same as the real ones. Used for `HM.LEVEL` and usually has the value `WORKING`.
* `common.custom` (optional) - the structure with custom settings for specific adapters. Like `{"influxdb.0": {"enabled": true, "alias": "name"}}`. The `enabled` attribute is required. If it is not, the entire attribute is cleared.