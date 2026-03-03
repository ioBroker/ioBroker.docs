---
title: File Storage in ioBroker Adapters
lastChanged: 2025.01.13
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/dev/filestorage.md
---

# File Storage in ioBroker Adapters

This document explains how to correctly store files in the ioBroker database using `writeFileAsync`. It is based on developer discussions but written in a **neutral, documentation-style format** with examples.

---

## Overview

ioBroker adapters can store files in the internal database. To do this correctly, you need to define **meta objects**, which act as storage namespaces. The choice of meta object determines whether files are included in backups or not.

---

## Meta Objects

There are two relevant types of meta objects:

- **`meta`**  
  - Files stored here are **not included in backups**.  
  - Suitable for temporary or regeneratable data.

- **`meta.user`**  
  - Files stored here **are included in backups**.  
  - Suitable for persistent user data, such as keys, configuration files, or uploaded content.

A meta object acts like a **mount point** for files.  
The `writeFileAsync` command then writes data relative to this base path.

---

## Defining a Meta Object

Before writing files, create a meta object. Example:

```json
{
  "_id": "keys",
  "type": "meta",
  "common": {
    "name": "keys",
    "role": "meta.user"
  },
  "native": {}
}
```

Here:
- `_id`: defines the storage namespace (`keys` in this case).  
- `type: "meta"`: required for storage objects.  
- `role: "meta.user"`: ensures the data is included in backups.

---

## Writing Files

Once a meta object exists, files can be written using `writeFileAsync`.

### Example: Writing a Private Key

```js
// Store private key in namespace "adapter.namespace.keys"
await adapter.writeFileAsync(
  `${adapter.namespace}.keys`,    // meta object mount point
  'private-key.pem',              // relative file path
  keys.privateKey                 // file content
);
```

### Example: Writing a Temporary File

```js
// Store temporary data in namespace "adapter.namespace.temp"
await adapter.writeFileAsync(
  `${adapter.namespace}.temp`,    // meta object mount point
  'cache.json',                   // relative file path
  JSON.stringify(cacheData)       // file content
);
```

---

## Practical Notes

- Without a meta object, `writeFileAsync` will fail.  
- Always decide between `meta` and `meta.user`:
  - Use **`meta`** if the content can be regenerated and should not be backed up.
  - Use **`meta.user`** for persistent, user-related files that must survive backups.  
- The **first parameter** in `writeFileAsync` is the meta object (storage namespace).  
- The **second parameter** is the path relative to that namespace.

---

## Example from ioBroker Sayit

The [Sayit adapter](https://github.com/ioBroker/ioBroker.sayit) defines two storage namespaces in its `io-package.json`:

1. `adapter.namespace` (temporary storage, not backed up)  
2. `meta.user` storage (persistent, backed up)

This pattern allows the adapter to separate temporary generated files from user-provided content.

---

## Summary

- Use **meta objects** to define storage namespaces in ioBroker.  
- Decide between:
  - `meta` → temporary, excluded from backups.  
  - `meta.user` → persistent, included in backups.  
- Treat meta objects as **mount points**.  
- Always pass:
  - **first parameter** = namespace (e.g., `adapter.namespace.keys`).  
  - **second parameter** = relative file path.  

Correct usage ensures files are stored reliably and included in backups when required.