---
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/dev/filestorage.md
title: Save files
lastChanged: 09.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
hash: BdDk9+qpyF9OESfx6zLfxAFj1zWh7zc5+LWx5I4ix/g=
---
# Save files

An adapter that needs to store files does not write them to the file system, but to ioBroker's data storage. This means they are located in a known location, independent of the operating system, are visible via the interface under **"Files,"** and can be included in data backups.

## The storage location is an object

Files are always attached to an object of type`meta` This object is the mount point; the file is assigned a path relative to it. Without such an object, the write operation will fail.

The field that matters is`common.type` :

| `common.type` | Meaning                                                                                                                                                         |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `meta.user`   | The files **are included in the data backup** . This applies to everything that cannot be recreated: keys, certificates, uploaded content, user-specific files. |
| `meta.folder` | These files **are not included in the data backup** . They are for intermediate states, temporary storage, and anything the adapter can regenerate at any time. |

!> The field is called`common.type` , not`common.role` The data backup checks precisely for this. If something else is listed there, the files will be missing after restoration.

## Create the storage location

The easiest way to do this is via`instanceObjects` in the [io-package.json](/docs/dev/iopackage.md) , then it is created automatically with each instance:

```json
"instanceObjects": [
    {
        "_id": "keys",
        "type": "meta",
        "common": {
            "name": "Schlüssel",
            "type": "meta.user"
        },
        "native": {}
    },
    {
        "_id": "temp",
        "type": "meta",
        "common": {
            "name": "Zwischenspeicher",
            "type": "meta.folder"
        },
        "native": {}
    }
]
```

The same applies to runtime:

```js
await this.setObjectNotExists('keys', {
    type: 'meta',
    common: { name: 'Schlüssel', type: 'meta.user' },
    native: {}
});
```

## Writing and reading

The first parameter is always the mounting point, the second the path below it:

```js
// schreiben
await this.writeFileAsync(`${this.namespace}.keys`, 'private-key.pem', privateKey);
await this.writeFileAsync(`${this.namespace}.temp`, 'cache.json', JSON.stringify(daten));

// lesen
const { file } = await this.readFileAsync(`${this.namespace}.keys`, 'private-key.pem');

// auflisten und löschen
const eintraege = await this.readDirAsync(`${this.namespace}.temp`, '');
await this.delFileAsync(`${this.namespace}.temp`, 'cache.json');
```

Subdirectories are created simply by the path:`'zertifikate/2026/host.pem'` .`mkdirAsync` There is an additional option, but it is rarely needed. The content consists of strings and...`Buffer` This includes images and archives as well as text.

## The shared folder

In addition to the own attachment points, there are`meta.user` This is the general folder for user files. It is created during setup and is the suggested upload location in the **Files** section of the interface. An adapter only writes to this folder if the file explicitly belongs to the user and not to itself.

## The special case of dataFolder

If an adapter needs actual files in the file system, for example because a third-party program is accessing them, it can be configured in`common.dataFolder` Specify a folder. The data backup will include this folder. The path via`meta` -objects is still the better option because it also works with multihost and in containers.

## Rules of thumb

- Everything that needs to be there again after a restoration belongs under`meta.user` .
- Everything that the adapter can rebuild on the next startup belongs under`meta.folder` This keeps the data backup small.
- Keep both separate instead of throwing everything into one pot.

How easily the two fields can get mixed up is shown by the [sayit](https://github.com/ioBroker/ioBroker.sayit) adapter: Its root object correctly bears`"type": "meta.user"` , the object`tts.userfiles` besides but`"role": "meta.user"` The sound files contained within are therefore not included in the data backup. Anyone using a third-party device...`io-package.json` Anyone using this as a template should check this section.