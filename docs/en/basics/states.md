---
lastChanged: 06.06.2019
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/basics/states.md
title: States and data points
hash: iNaFi9jvbeu0ho6uqGdece5axWYgny67ZtHqpuXSK9I=
---
# States and data points
A **data point** consists of a static object of type "state" and a dynamic state (state).

properties of a state

 * val - current value
 * ack - flag indicating acknowledgment of the value by the target system
 * ts - Unix timestamp of last state update (in milliseconds)
 * lc - Unix timestamp of last value change (in milliseconds)
 * q - [quality](../dev/objectsschema.md#states)
 * from - (optional) source(adapter instance) of last update
 * user - (optional) username who last wrote the value.
 * c - (optional) comment
 * expire - (optional) time in seconds when the value will be reset to `zero`.

Attributes of the static object are id, type = 'state', common, native. The following common attributes are possible:

* `common.type` (optional) - default is 'mixed' = any type. Possible values: 'number', 'string', 'boolean', 'array', 'object', 'mixed', 'file'.
* `common.name` (optional, string)
* `common.max` (optional, number)
* `common.step` (optional, number) - increase / decrease interval. E.g. 0.5 for thermostat
* `common.unit` (optional, string)
* `common.def` (optional - the default value)
* `common.defAck` (optional - if common.def is set, this value will be used as ack flag, js-controller 2.0.0+)
* `common.desc` (optional, string or object) - description, object for multilingual description
* `common.read` (bool, mandatory) - true if the data point is readable
* `common.write` (bool, mandatory) - true if the data point is writable
* `common.role` (string, mandatory) - role of the data point (used in user interfaces to indicate which widget should be selected. [Look here](../dev/stateroles.md)
* `common.states` (optional) attribute with possible states object` {'value': 'valuename', 'value2': 'valuename2', 0: 'OFF', 1: 'ON'} `
* `common.workingID` (string, optional) - if this state has auxiliary state WORKING. Here the full name must be written or only the last part if the first parts are identical to the real ones. Used for `HM.LEVEL` and usually has the value `WORKING`.
* `common.custom` (optional) - the structure with custom settings for specific adapters. Like `{"influxdb.0": {"enabled": true, "alias": "name"}}`. The `enabled` attribute is required. If this is not the case, the entire attribute is deleted.

?> ***This is a placeholder***.<br><br> Help ioBroker and expand this article. Please note the [ioBroker Style Guide](https://www.iobroker.net/#de/documentation/community/styleguidedoc.md) so that the changes can be adopted more easily.