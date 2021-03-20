# Adapter Module

The Adapter Module provides defined functions to access ioBroker.

There are functions for

* create and set objects like channels or states
* deleting objects
* subscribing objects
* logging to ioBroker
* file and directory operations
* and much more

Most functions also exist as an asynchronous version.

## Create and set objects

### setObject - Set an existing object

#### Definition
`function setObject(id, obj, callback)`

#### Parameters

| **Parameter**         | **Description**
| --------------------- |----------------
| `id`                  | [ID](ids.md) of the object, results in [tree structure]()
| `obj`                 | Bla
| `callback`            | Bla

#### Example

```
Bla
```

### setObjectNotExistsAsync - Set or create an object asynchronous

#### Definition
`function setObjectNotExistsAsync(id, obj)`

#### Parameters
| **Parameter**         | **Description**
| --------------------- |----------------
| `id`                  | [ID](ids.md) of the object, results in [tree structure]()
| `obj`                 | Valid object

#### Example
```
await this.setObjectNotExistsAsync(myadapter.0.state, {
    type: "state",
    common: {
        name: "state",
        type: "boolean",
        role: "switch",
        read: true,
        write: true,
        desc: "on/off",
        def: false
    },
    native: {},
});
```
