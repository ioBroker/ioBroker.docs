---
title: Access Control Lists (ACLs) in detail: objects, states and files
lastChanged: 17.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/config/acl.md
hash: hqB/KtLLeBQ+PE51fT+5/JlJMUkrKkaslgRR/u/zIyI=
---
# Access Control Lists (ACLs) in detail

This page explains **how** ioBroker decides whether a user is allowed to read, list, write, create, or delete objects, states, and files. For those who only want to create a restricted user, step-by-step instructions can be found under [Access Management with Users and Groups](/docs/config/userrights.md) . This page explains the underlying model.

## The most important points in brief

- Every access attempt must pass through **two barriers** : the user's **group rights** and the **ACL** on the individual entry. If either of these blocks access, nothing happens.
- The ACL works like file permissions under Linux: **Owner** , **Owner group** , **Everyone** , each with **read** and **write** permissions.
- The number is **hexadecimal** , not octal as under Linux: `0x664`, not `0664`.
- **Only one** of the three roles applies, namely the first one that fits.
- Object, state, and file have **separate** rights, even if the object and state share the same ID.
- The user **admin** and the members of the **administrator group** are exempt from the ACL on objects, files and states and are allowed to do everything.

## Two barriers

Group rights and ACL answer two different questions:

| barrier          | Ask                                                                             | Where set                                              |
| ---------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------ |
| **Group rights** | Is this user even allowed this **type** of access? For example: writing states. | in the group, in the [Users](/docs/admin/users.md) tab |
| **ACL**          | Does this apply to **this one** entry? For example: for `alias.0.Licht`.        | on the object, on the state, on the file               |

A user whose group has write permissions will still encounter a data point whose ACL only allows read access. Conversely, an open ACL is useless if the group does not permit writing to states at all.

```
Anfrage: Benutzer "fred" will alias.0.Licht schalten
   │
   ├─ 1. Gruppenrechte: darf fred Zustände schreiben?      nein → abgelehnt
   │                                                          ja ↓
   └─ 2. ACL von alias.0.Licht: welche Rolle hat fred,
         und erlaubt die Ziffer dieser Rolle das Schreiben?  nein → abgelehnt
                                                               ja → erlaubt
```

## What is protected

| entry                | What it is                                                                           | Rights field in the ACL                   |
| -------------------- | ------------------------------------------------------------------------------------ | ----------------------------------------- |
| **object**           | The description of an entry: Name, role, unit, settings (`common`, `native`).       | `acl.object`                              |
| **Condition**        | The value itself: `val`, `ack` Timestamp. Switching is a write access to the state.   | `acl.state`                               |
| **file**             | The ioBroker file storage: vis projects, web files of the adapters, uploaded images. | `acl.permissions`                         |
| **Users and groups** | The objects `system.user.*` and `system.group.*`.                                     | like objects, plus their own group rights |
| **Other**            | Not an entry, but skills: HTTP requests, shell commands, `sendTo`.                   | No ACL, only group rights.                |

A data point thus has **two** ACL numbers: one for the object and one for the state. Users who only need to be able to toggle the **state** require write permissions. Write permissions for the object, on the other hand, allow modification of the data point.

## Who asks: Users, groups and special cases

### Users and groups

Users are objects with the ID `system.user.<name>`, groups have the ID `system.group.<name>` These users exist only within ioBroker; they have nothing to do with the users of the operating system.

Those who are in a group stand **in the group** , in `common.members`, not at the user's location:

```json
{
  "_id": "system.group.user",
  "type": "group",
  "common": {
    "name": "User",
    "members": ["system.user.fred"],
    "acl": { "...": "..." }
  }
}
```

### Several groups

A user can belong to any number of groups. Their group permissions are then the **sum** of all group permissions: every single permission is granted as soon as **one** of their groups allows it. Therefore, one group cannot take away from a user what another group grants them.

A user in **no** group has any rights.

### Special cases: admin and the administrator group

| Who                                    | Group rights | ACL on objects | ACL conditions | ACL to files |
| -------------------------------------- | ------------ | -------------- | -------------- | ------------ |
| user `system.user.admin`                | all          | except         | except         | except       |
| members of `system.group.administrator` | all          | except         | except         | except       |
| all other                              | as set       | applies        | applies        | applies      |

The administrator group is therefore always allowed to do everything, just like the user. `admin` Their rights cannot be edited in the admin settings. Therefore, only a user who is **not** in this group can be restricted.

Adding a user to the administrator group grants them access to everything, regardless of any ACLs. Create a separate group for restricted access.

### Who is "the user" during an access attempt?

- **Logged in to the admin panel or a visualization:** the logged-in user.
- **Login disabled:** the user who is set as the default user in the instance. This is the default setting for _admin_ and _web._ `admin`, without any restrictions.
- **Internal adapters and scripts:** Access without user authentication is considered `admin`.

ACLs primarily protect actions performed **by logged-in users via the web interfaces** . As long as login is disabled, none of the restrictions described here apply.

## Barrier 1: Group rights

### The operations

A group's permissions are divided into blocks: objects, states, users, files, and others. The first four have the same operations:

| Right                  | Meaning                                                            |
| ---------------------- | ------------------------------------------------------------------ |
| **list** (`list`)     | Query a list, such as the object tree or the contents of a folder. |
| **read** (`read`)     | Retrieve or subscribe to a single entry.                           |
| **write** (`write`)   | Edit an entry. For objects, also: create a new one.                |
| **create** (`create`) | Create a new entry where this is checked separately.               |
| **delete** (`delete`) | Remove an entry.                                                   |

The **Other** block has three separate rights:

| Right                          | Meaning                                                                         |
| ------------------------------ | ------------------------------------------------------------------------------- |
| **HTTP requests** (`http`)    | The server retrieves an address on the network on behalf of the user interface. |
| **Shell version** (`execute`) | Execute commands on the operating system, read the host log.                    |
| **sendTo** (`sendto`)         | Send messages to adapter instances and hosts.                                   |

**Shell execution** means access to the operating system with the rights of the user under which ioBroker is running. And **\`sendTo\` ** allows messages to be sent to any instance and any host, enabling remote control of many adapters. Both of these rights are reserved for individuals who would also be entrusted with the server.

### Which action requires which right?

The web interfaces (Admin, web, socketio and others) check the following:

| action                                                              | Right                |
| ------------------------------------------------------------------- | -------------------- |
| Read object, subscribe to objects                                   | Objects: read        |
| Query object tree, object list                                      | List objects         |
| Modify or create an object                                          | Objects: write       |
| Delete object                                                       | Delete objects       |
| Read status, subscribe, check history                               | Conditions: read     |
| query multiple states at once                                       | List states          |
| Set state (switch)                                                  | States: write        |
| Create a state                                                      | States: create       |
| Delete state                                                        | States: delete       |
| Create user or group                                                | User: create         |
| Delete user or group                                                | User: delete         |
| Change Password                                                     | User: write          |
| Show folder contents                                                | List files           |
| Read file, check if it exists                                       | Files: read          |
| Create file                                                         | Files: create        |
| Write, rename, create folders, change permissions or owner of files | Files: write         |
| Delete file                                                         | Files: delete        |
| retrieve address from the network                                   | Other: HTTP requests |
| Shell command, read host log                                        | Other: Shell version |
| Message to instance or host                                         | Other: sendTo        |

### Default setting of both groups

| block      | Administrator | user                      |
| ---------- | ------------- | ------------------------- |
| objects    | everything    | list, read                |
| Conditions | everything    | list, read, write, create |
| user       | everything    | list, read                |
| files      | everything    | list, read                |
| Other      | everything    | HTTP requests only        |

A member of the _user_ group can see and control everything, but cannot modify anything, change files, or send orders to adapters.

## Barrier 2: the ACL at the individual entry

### This is what she looks like

On an object that is also a state:

```json
{
  "_id": "alias.0.Licht",
  "type": "state",
  "common": { "...": "..." },
  "acl": {
    "owner": "system.user.admin",
    "ownerGroup": "system.group.administrator",
    "object": 1636,
    "state": 1636
  }
}
```

To a file in the file storage:

```json
{
  "acl": {
    "owner": "system.user.admin",
    "ownerGroup": "system.group.administrator",
    "permissions": 1636
  }
}
```

`1636` is the decimal notation of `0x664` The database stores the number in decimal format, the administrator displays it in hexadecimal format as... `664`.

### Reading the number: like Linux, but in hexadecimal.

The ACL number has three digits, one for each role, in this order:

| position | role                            | read    | write   | carry out |
| -------- | ------------------------------- | ------- | ------- | --------- |
| first    | **Owner** (`owner`)            | `0x400` | `0x200` | `0x100`   |
| second   | **Owner group** (`ownerGroup`) | `0x40`  | `0x20`  | `0x10`    |
| third    | **Everyone** (all other users)  | `0x4`   | `0x2`   | `0x1`     |

Each position is the sum of its rights, just like under Linux:

| Number | Meaning             | Linux notation |
| ------ | ------------------- | -------------- |
| `0`    | nothing             | `---`          |
| `4`    | read                | `r--`          |
| `2`    | write               | `-w-`          |
| `6`    | reading and writing | `rw-`          |

The execute bit (`1`) exists, but ioBroker does not evaluate it. A `7` This means the same as a `6`.

Typical values:

| Hex     | decimal | Owner       | group       | Everyone    | Typical use                                  |
| ------- | ------- | ----------- | ----------- | ----------- | -------------------------------------------- |
| `0x664` | 1636    | read, write | read, write | read        | Default setting                              |
| `0x644` | 1604    | read, write | read        | read        | Only the owner changes                       |
| `0x666` | 1638    | read, write | read, write | read, write | Every registered user may write              |
| `0x660` | 1632    | read, write | read, write | –           | invisible to strangers                       |
| `0x640` | 1600    | read, write | read        | –           | The group is reading, strangers see nothing. |
| `0x600` | 1536    | read, write | –           | –           | only the owner                               |
| `0x444` | 1092    | read        | read        | read        | write-protected for all users                |

**Never** in scripts or JSON. `664` write. That's 664 in decimal, so `0x298` The owner would only be allowed to write and not read; the group and everyone would receive bits that mean nothing. The correct way is: `0x664` or decimal `1636` Even Linux habit doesn't help here: the octal `0o664` is 436 in decimal, so `0x1b4`.

### Which position applies: always exactly one role

ioBroker searches for the user's role in this order and takes the **first one** that matches:

1. Is the user the **owner** ? Then only the **first** position counts.
2. Otherwise: Is he in the **owner group** , regardless of whether it's his first group or another one? Then only the **second** position counts.
3. Otherwise, the **third** position applies.

The positions are not added together. As in Linux, the owner can therefore have fewer permissions than their group: In the case of `0x464` The owner can only read, although the owner group can write. The second position doesn't apply to him because the first one already matches.

### If nothing is entered

| case                             | What applies                                                                                                                                                      |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Object without `acl`              | No ACL check, only group rights count.                                                                                                                            |
| condition without own `acl.state` | The number from `acl.object` This also applies to the condition.                                                                                                   |
| File without ACL                 | It is examined as if it belonged to someone else. `admin` and the _administrator_ group, with the default file number from the system settings, otherwise `0x644`. |

## How a request is reviewed

The following tables apply to all users except for the special cases mentioned above. "ACL" refers to the bit indicating the role the user has for that entry.

### objects

| operation  | Group law      | ACL (`acl.object`)                          |
| ---------- | -------------- | -------------------------------------------- |
| read       | Objects: read  | read                                         |
| list       | List objects   | read, for each individual object in the list |
| write      | Objects: write | write                                        |
| Create new | Objects: write | – (there is no ACL yet)                      |
| delete     | Delete objects | **write**                                    |

A list contains only objects that the user is authorized to read. Anything that their ACL doesn't allow reading doesn't appear in the object tree at all. Deletion doesn't have its own ACL bit: anyone with write permissions for an object can also delete it with the appropriate group permission.

### Conditions

| operation       | Group law        | ACL (`acl.state`) |
| --------------- | ---------------- | ------------------ |
| Read, subscribe | Conditions: read | read               |
| set (switch)    | States: write    | write              |
| delete          | States: delete   | **write**          |

If access is denied, the instance writes a warning to the log, which includes `Permission error for user` begins and names the user, the ID, and the command.

### files

| operation                     | Group law     | ACL (`acl.permissions`) |
| ----------------------------- | ------------- | ------------------------ |
| read                          | Files: read   | read                     |
| Show folder contents          | List files    | read                     |
| write, rename, create folders | Files: write  | write                    |
| Change rights or ownership    | Files: write  | write                    |
| delete                        | Files: delete | See note                 |

A **new** file belongs to the user who creates it. Its permissions come from the standard ACL.

!> As it currently stands with the JS controller, **deleting** files fails for all users outside the administrator group, even if group permissions and file ACLs allow it. Anyone who needs to be able to delete files must currently be a member of the administrator group.

### Users and groups

The objects `system.user.*` and `system.group.*` These are ordinary objects with an additional barrier. **Three** things must be allowed for them:

1. The group rights in the **Users** block, i.e., read, list, write, create or delete,
2. the appropriate group right in the **Objects** block,
3. The ACL of the user or group object.

The two included groups are set up on `0x644` and belong `admin` Without administrator rights, no one can change it, even with all the boxes checked in the _Users_ block.

## Default settings for new entries

The assignments to new objects, states, and files are defined in the [system settings](/docs/admin/settings.md) under **Default ACL** . This is stored in... `system.config`, in the field `common.defaultNewAcl`:

```json
"defaultNewAcl": {
  "owner": "system.user.admin",
  "ownerGroup": "system.group.administrator",
  "object": 1636,
  "state": 1636,
  "file": 1636
}
```

If nothing is entered there, then exactly the following applies: Owner `admin`, _administrator_ group , `0x664` for objects, states, and files.

If the default ACL is changed, **existing** objects will also receive the new values, but only those that don't yet have an ACL. Objects with their own ACL remain unchanged.

Objects that an adapter creates itself belong to it. If it recreates them during an update, the permissions are restored as the adapter intended. Where a restriction needs to be permanent, an [alias](/docs/basics/alias.md) is the more reliable approach: it belongs to you, and the adapter doesn't touch it.

## Setting rights

### In the admin

**Group rights:** **Users** tab, pencil icon next to the group, **Permissions** tab.

<img src="media/config_gruppe_berechtigungen.png" alt="Der Reiter Berechtigungen einer Gruppe" width="588" />

**ACL of an object:** In the [Objects](/docs/admin/objects.md) tab, activate **expert mode** . A column with the ACL number will then appear; clicking on it opens the dialog:

<img src="media/config_objekt_acl.png" alt="Die Zugriffssteuerungsliste eines Datenpunkts" width="722" />

At the top are **the owner, user** , and **owner group** ; below are the permissions, separated by object and state, for **owner** , **group** , and **everyone** . The **"Apply to object and its sub-objects"** switch applies the setting to the entire subtree.

### On the command line

All numbers are read **in hexadecimal** , `644` This means `0x644` Users and groups may be specified without a prefix. `fred` will be `system.user.fred`.

```bash
# Objekt- und Zustandsrechte: erst die Objektzahl, dann optional die Zustandszahl
iobroker object chmod 644 664 alias.0.*

# nur die Objektrechte
iobroker object chmod 644 system.adapter.*

# Besitzer und Besitzergruppe von Objekten
iobroker object chown fred user alias.0.*

# Dateirechte: erstes Pfadstück ist der Namensraum, etwa vis-2.0
iobroker chmod 644 /vis-2.0/main/*
iobroker chown fred user /vis-2.0/main/*

# Benutzer und Gruppen
iobroker user add fred --ingroup user
iobroker user passwd fred
iobroker group adduser user fred
iobroker group deluser user fred
iobroker user get fred
iobroker group get user
```

Further commands are available under [Command Line](/docs/config/cli.md) .

### In the script

In the JavaScript adapter with `extendObject` Write the numbers as hexadecimal literals:

```javascript
extendObject('0_userdata.0.Gast.Licht', {
    acl: {
        owner: 'system.user.admin',
        ownerGroup: 'system.group.gast',
        object: 0x644,
        state: 0x664,
    },
});
```

## Linux and ioBroker compared

|                                | Linux                               | ioBroker                                                       |
| ------------------------------ | ----------------------------------- | -------------------------------------------------------------- |
| user                           | `uid`                               | `system.user.<name>`                                           |
| Groups                         | `gid` and other groups              | `system.group.<name>`, members are in the group               |
| Roll                           | Owner, group, others                | Owner, group of owners, everyone                               |
| Number of rights               | **octal** , `0664`                   | **hexadecimal** , `0x664`                                       |
| which role applies             | exactly one, the first suitable one | exactly one, the first suitable one                            |
| Execute bit                    | execute, enter folder               | present, but without significance                              |
| Superuser                      | `root` bypasses everything          | `admin` and the entire administrator group bypasses everything |
| additional barrier             | –                                   | Group rights per operation, such as "write states"             |
| Separate rights for each entry | one number per file                 | Object and condition each have their own number.               |

## Example: a guest who only switches on his own devices

Goal: A _guest_ user sees everything, but only activates the data points under `0_userdata.0.Gast`.

**1. Create group and user**

```bash
iobroker group add gast
iobroker user add gast --ingroup gast
```

In the admin panel, set the permissions for the _guest_ group:

| block      | right             |
| ---------- | ----------------- |
| objects    | list, read        |
| Conditions | list, read, write |
| files      | list, read        |
| user       | –                 |
| Other      | –                 |

**2. The group's own data points provide**

```bash
iobroker object chown admin gast 0_userdata.0.Gast.*
iobroker object chmod 644 664 0_userdata.0.Gast.*
```

**3. What happens now**

| Data point                         | ACL                                  | Role of _guest_        | Result         |
| ---------------------------------- | ------------------------------------ | ---------------------- | -------------- |
| `0_userdata.0.Gast.Licht`          | group _guest_ , condition `0x664`     | Owner group, number `6` | see and switch |
| `alias.0.Heizung`                  | _administrator_ group, status `0x664` | Each, digit `4`         | just see       |
| `0_userdata.0.Gast.Licht`, object | object `0x644`                        | Owner group, number `4` | do not rebuild |

If _the guest_ is not to see the other data points at all, these are assigned a third position. `0`, approximately `0x660` Then they are missing from his object tree.

**4. Login** — enable login in the web adapter's [authentication settings](/docs/config/login.md) ; otherwise, everyone will work as an IP address. `admin` Then log in as _a guest_ and check if only what should be possible actually works.

## Troubleshooting

| observation                                               | Probable cause                                                                    | remedy                                                   |
| --------------------------------------------------------- | --------------------------------------------------------------------------------- | -------------------------------------------------------- |
| Everything is allowed, even though rights are set.        | Registration is closed, it will be considered `admin` worked                       | Enable login to the instance                             |
| The user does not see a data point in the object tree.    | The group right _list_ is missing, or the ACL does not allow its role to be read. | Check group law, then the number of his role.            |
| He sees the data point, but cannot switch it.             | Write access to the **state** is lacking; often only the object ACL was changed.  | `acl.state` check, not `acl.object`                       |
| The owner is allowed less than his group                  | Only the first digit counts, not the second.                                      | Adjust first position                                    |
| Permissions set in the script, then nothing works at all. | Number written in decimal `664` instead of `0x664`                                  | Using a hex literal                                      |
| After an adapter update, the permissions are reset.       | The adapter has recreated its objects                                             | Use alias                                                |
| Changing a user or group has no effect                    | The instance has cached the rights.                                               | Restart the affected instance, such as _web_ or _admin._ |
| A user cannot delete a file.                              | Deleting files is currently only possible for the administrator group.            | See note for files                                       |

!> Create a [backup](/docs/config/backup.md) before making major changes. If you lock yourself out with overly restrictive permissions, you'll only be able to regain access via the [command line](/docs/config/cli.md) . `iobroker object chmod` and `iobroker object chown` Always work with administrator rights.