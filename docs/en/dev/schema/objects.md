# ioBroker Schema
## Objects

### Mandatory attributes

Following attributes have to exist in every object:

| **Attribute**         | **Description**
| --------------------- |----------------
| `_id`                 | [ID](ids.md) of the object, results in [tree structure]() 
| `type`                | see below for possible values
| `common`              | an object containing ioBroker specific abstraction properties
| `native`              | an object containing congruent properties of the target system

### Optional attributes

| **Attribute**         | **Description**
| --------------------- |----------------
| `common.name`         | name of the object (optional but strictly suggested to fill it)

### Object types

| **type**         | **Description** | **Documentation**
| ---------------- |-----------------|-------------------
| `state`          | parent should be of type channel, device, instance or host | [Link](objects_states.md)
| `channel`        | object to group one or more states. Parent should be device. | [Link](objects_channels.md)
| `device`         | object to group one or more channels or state. Should have no parent except adapter instance namespace. | [Link](objects_devices.md)
| `folder`         | a bunch of devices or may be other things
| `enum`           | objects holding a array in common.members that points to states, channels, devices or files. enums can have a parent enum (tree-structure possible)
| `host`           | a host that runs a controller process
| `adapter`        | the default config of an adapter. presence also indicates that the adapter is successfully installed. (suggestion: should have an attribute holding an array of the hosts where it is installed)
| `instance`       | instance of adapter. Parent has to be of type adapter
| `meta`           | rarely changing meta information that a adapter or his instances needs
| `config`         | configurations
| `script`         | scripts
| `user`           | users
| `group`          | groups
| `chart`          | charts

For each object type there is a dedicated document in this Schema Documentation.