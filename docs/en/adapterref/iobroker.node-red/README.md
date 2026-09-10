---
---
![Logo](../../admin/node-red.png)

# ioBroker.node-red

**Note:** If you cannot find your state in the select ID dialog of the ioBroker nodes, press the update button in instance settings or restart the node-red instance. By restarting the new object list will be created.

## Settings

![General settings](./img/instance-settings-general.png)

### Maximum RAM Setting

In the adapter/instance configuration you can adjust the maximum RAM/Heap for the node-red process. The default is sufficient for smaller node-red installations. If you have many nodes or you experience performance issues or crashes of the node.red process in the logs, please upgrade the maximum RAM setting! Depending on your available RAM (see e.g. using `free -m` on "avail") increase it to 1024 (=1GB) or even higher.

### Safe Mode

Flows will not be started, and you can edit the flows to fix some overload problem.

### Context Storage

Node-RED can store the context of a node (`context`, `flow` and `global`) in different [context stores](https://nodered.org/docs/user-guide/context). This adapter configures two of them:

| Store        | Persistent | Description                                                                                             |
| ------------ | ---------- | ------------------------------------------------------------------------------------------------------- |
| `file`       | yes        | Default store. The context is written to the ioBroker data directory and survives a restart of the adapter |
| `memoryOnly` | no         | The context is only kept in RAM and is lost as soon as the adapter restarts                              |

The store can be selected in the configuration dialog of every node that uses the context. If no store is selected, `file` is used.

**Note:** Up to version 6.0.8 the file based store was named `default`. If you selected the store explicitly in a node, open the node and select `file` again, otherwise node-red logs a warning about an unknown context store.

## Authentication

### None

![No Authentication](./img/instance-settings-auth-none.png)

### Simple

![Simple Authentication](./img/instance-settings-auth-simple.png)

### Extended

![Extended Authentication](./img/instance-settings-auth-extended.png)

## Nodes

### ioBroker in

### ioBroker out

### ioBroker get

### ioBroker get object

### ioBroker list

### ioBroker sendTo