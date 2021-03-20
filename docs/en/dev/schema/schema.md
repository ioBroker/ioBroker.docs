# ioBroker Schema

The following chapters describes the Database Schema of ioBroker.

There are two fundamentally different data-types in ioBroker. So called **states** and **objects**.

## Objects ##
[Objects](objects.md) represent rarely changing and larger data, like meta-data of your systems devices, configurations and additional
files.

Every Object has to have an attribute "type". There are different object types available and may have some mandatory attributes. 

Every object has a specific [ID](ids.md) and resides in a [namespace](namespaces.md).

By ID and namespace, a hierarchical tree is created. For deeper structure, there can be used some specialiced objects: [devices](objects_devices.md), [channels](objects_channels.md) and [folders]().

A valid [tree structure]() has a specific order of the objects.

Functions like setObject, getObject, ... are provided to you by the [adapter module](../reference/adaptermodule.md).

## States ##
States represent often changing data in your system, like f.e. 
* if a lamp is on or off
* if a motion detector detected some motion
* the temperature of your living room
* if the button of a remote control is pressed

Contrary to objects states can be used to trigger actions and states can create history data. To work with states there are several functions in the adapter module like setState, getState and so on.

For every state there also has to exist a corresponding object with `type=state`.

See [states]() for more information.
