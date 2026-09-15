---
title: io-package.json
lastChanged: 08.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/dev/iopackage.md
hash: ho0tCf4V1qxS3zRT/RVW2Z2mJbrvrInBMqGH4tp7dLw=
---
# The file io-package.json

Besides the usual`package.json` Each adapter contains a second file: the`io-package.json` It contains everything **ioBroker** needs to know about the adapter that npm doesn't care about. This determines the entry in the adapter list, the instance objects, the icons on the tile, and the startup behavior.

The Adapter Creator sets them up completely. Anyone who later modifies them manually should know what the fields do.

The file has few blocks at the top level:

| block             | Contents                                                                          |
| ----------------- | --------------------------------------------------------------------------------- |
| `common`          | The main part: name, operating mode, interface, dependencies.                     |
| `native`          | The configuration defaults. At runtime as`this.config.<feld>` readable.           |
| `encryptedNative` | fields from`native` , which are stored in encrypted form.                         |
| `protectedNative` | fields from`native` , which only the adapter itself is allowed to read.           |
| `objects`         | Objects that are created once per system.                                         |
| `instanceObjects` | Objects that are created with **each** new instance.                              |
| `notifications`   | Custom notification categories. See [Notifications](/docs/dev/notifications.md) . |

## The fields that matter

### identifier

`common.name` is the adapter name without the preface`ioBroker.` It is written in lowercase. It is the identifier everywhere: in the object tree, in the npm package, in the repository. It cannot be changed later.

`common.titleLang` is the display name, multilingual.`common.desc` The short description, also multilingual.

`common.version` must be switched to the version in the`package.json` They fit. The adapter checker verifies this.

### Operating mode

`common.mode` Determines how ioBroker starts the instance:

| mode        | Behave                                                                                                                   |
| ----------- | ------------------------------------------------------------------------------------------------------------------------ |
| `daemon`    | It runs continuously. It restarts when the process ends. This is the normal behavior.                                    |
| `schedule`  | It runs according to a schedule; the schedule is stored in the instance object and can be changed in the admin panel.    |
| `once`      | It runs once after every change to the instance object and is not restarted afterwards.                                  |
| `subscribe` | Starts when`.alive` It is set to true, and ends when it goes to false.                                                   |
| `extension` | It is not started by ioBroker, but loaded from a web instance. This is how it works.`simple-api` and similar extensions. |
| `none`      | It doesn't start any process at all.                                                                                     |

At`schedule` The default setting belongs to`common.schedule` as a CRON expression.

`common.compact` This allows the instance to run in the same process as others. On small computers, this noticeably saves memory, but requires the adapter to completely clean up upon termination.

### surface

`common.adminUI.config` says what the configuration looks like:

- `json` The adapter brings`admin/jsonConfig.json` with. **Today's route.**
- `materialize` : the old`admin/index_m.html` .
- `html` : the even older`admin/index.html` .
- `none` The adapter has no configuration.

`common.icon` is the symbol in the folder`admin` ,`common.extIcon` its address on GitHub, so that the adapter list can also display it for uninstalled adapters.

### What controls the symbols on the tile

The small characters under the adapter name in the admin panel come from this file:

- `common.connectionType` :`local` or`cloud` Whether the adapter communicates directly with the device or via a service provided by the manufacturer.
- `common.dataSource` :`push` ,`poll` or`assumption` Whether values are generated automatically, queried, or merely assumed.
- `common.plugins.sentry` Enables crash notifications. See [Crash Notifications](/docs/ecosystem/sentry.md) .

These three pieces of information are often forgotten. They only take three lines and save users from having to ask a question in the forum.

### Dependencies

`common.dependencies` names what must be present on **the same** host, for example`[{"js-controller": ">=5.0.19"}]` .`common.globalDependencies` names what needs to run **somewhere** in the system, typically`[{"admin": ">=6.0.0"}]` .

`common.osDependencies.linux` lists operating system packages that are installed during installation.

### Configuration values

Everything under`native` This is the default configuration setting. At runtime, it is as follows:`this.config.<feld>` ready.

Every password and every access credential belongs in **both** lists:`encryptedNative` **and**`protectedNative` The first setting ensures that the value is encrypted in the database, the second prevents any other adapter from reading it. Setting only one setting creates a vulnerability.

Example from BackItUp:

```json
"encryptedNative": ["cifsPassword", "ftpPassword", "webdavPassword"],
"protectedNative": ["cifsPassword", "ftpPassword", "webdavPassword"]
```

### Objects that arise spontaneously

`instanceObjects` This is a list of objects that ioBroker creates with each new instance. This is the clean way to handle anything that should always be there anyway, such as the branch.`info` with the connection status:

```json
"instanceObjects": [
  {
    "_id": "info",
    "type": "channel",
    "common": { "name": "Information" },
    "native": {}
  },
  {
    "_id": "info.connection",
    "type": "state",
    "common": {
      "role": "indicator.connected",
      "name": "Verbindung zum Gerät",
      "type": "boolean",
      "read": true,
      "write": false,
      "def": false
    },
    "native": {}
  }
]
```

?>`info.connection` This is more than just decorative: The administrator colors the instance green or yellow afterward, and other adapters can react accordingly. An adapter establishing a connection should be in this state.

### News

`common.messagebox: true` Creates a message box for each instance. Without this entry, no message will arrive.`sendTo` See [Inter-Instance Messages](/docs/dev/messagebox.md) .

## Translations

All multilingual fields are not maintained manually. The project includes...`@iobroker/adapter-dev` , and the appeal

```bash
npm run translate
```

translates the new English texts from the`io-package.json` and from the i18n files into all supported languages. New texts are therefore **only entered in English** ; the command handles the rest.

## The complete list

This chapter lists the fields you will need in everyday use. The complete list of all attributes and their special cases can be found in the [object schema](/docs/dev/objectsschema.md) .