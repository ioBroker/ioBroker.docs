---
title: Access Control Lists (ACLs) in detail: objects, states and files
lastChanged: 02.10.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/config/acl.md
hash: ijuWFtNxV9Qlpek61WtzuVZr2SdV2UHWQryYdpJiKvU=
---
# Access rights (ACL) in detail
This page explains **how** ioBroker decides whether a user is allowed to read, list, write, create, or delete something: objects, states, and files. If you only want to create a restricted user, you can find step-by-step instructions under [Access management with users and groups](/docs/config/userrights.md).

This section explains the underlying model.

## The most important points in brief
* Every access must pass through **two barriers**: the **group rights** of the

The user and the **ACL** on the individual entry. If one of them blocks, nothing happens.

* The ACL works like file permissions under Linux: **owner**,

**Owners group**, **Everyone**, each with **reading** and **writing**.

* The number is **hexadecimal**, not octal as under Linux: `0x664`, not

`0664`.

* Only **exactly one** of the three roles applies, namely the first one that fits.
* Object, state, and file have **separate** rights, even if the object and

The condition bears the same ID.

* The user **admin** and the members of the **administrator group** are excluded from the ACL

objects, files and states are exempt and are allowed to do everything.

## Two barriers
Group rights and ACL answer two different questions:

| Barrier | Question | Where set up |
|-------------------|---------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| **Group Permissions** | Is this user even allowed this **type** of access? For example: writing states. | in the group, in the [user](/docs/admin/users.md) tab |
| **ACL** | Does this apply to **this one** entry? For example: to `alias.0.Licht`. | on the object, on the state, on the file |

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
| Entry | What it is | Rights field in the ACL |
|--------------------------|----------------------------------------------------------------------------------------------|----------------------------------------------|
| **Object** | The description of an entry: Name, Role, Unit, Settings (`common`, `native`). | `acl.object` |
| **File** | The ioBroker file storage: vis projects, adapter web files, uploaded images. | `acl.permissions` |
| **Users and Groups** | The objects `system.user.*` and `system.group.*`. | Like objects, plus their own group rights |
| **Other** | Not an entry, but capabilities: HTTP requests, shell commands, `sendTo`. | No ACL, only group rights |
| **Other** | Not an entry, but capabilities: HTTP requests, shell commands, `sendTo`. | No ACL, only group rights |

A data point thus has **two** ACL numbers: one for the object and one for the state. Users who only need to be able to toggle the data point require write permissions to the **state**. Write permissions to the object, on the other hand, allow modification of the data point.

## Who asks: Users, groups and special cases
### Users and Groups
Users are objects with the ID `system.user.<name>`, groups have the ID `system.group.<name>`. These users exist only within ioBroker; they have nothing to do with the operating system's users.

Anyone who is in a group is listed **in the group**, in `common.members`, not with the user:

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

### Multiple Groups
A user can belong to any number of groups. Their group permissions are then the **combination** of all groups: every single permission is granted as soon as **one** of their groups allows it. Therefore, one group cannot take away from a user what another group grants them.

A user in **no** group can do nothing.

### Special cases: admin and the administrator group
| Who | Group rights | ACL on objects | ACL on states | ACL on files |
|---------------------------------------------|-----------------|-----------------|------------------|----------------|
| User `system.user.admin` | all | excepted | excepted | excepted |
| Members of `system.group.administrator` | all | except | except | except |
| all others | as set | applies | applies | applies |

The administrator group always has full access, just like the user `admin`.

Their rights cannot be edited in the administrator settings. Therefore, only a user who is **not** a member of this group can be restricted.

Adding a user to the administrator group grants them access to everything, regardless of any ACLs. Create a separate group for restricted access.

### Who is "the user" during an access attempt?
* **Logged into the admin panel or a visualization:** the logged-in user

User.

* **Login disabled:** the user who logs into the instance as

The default user is set. For *admin* and *web*, this is `admin` by default, i.e., without any restrictions.

* **Internal adapters and scripts:** Access without user authentication is considered

`admin`.

ACLs primarily protect against actions performed by logged-in users via the web interfaces. As long as login is disabled, none of the restrictions described here apply.

## Barrier 1: Group rights
### The operations
A group's permissions are divided into blocks: objects, states, users, files, and others. The first four have the same operations:

| Law | Meaning |
|--------------------------|-------------------------------------------------------------------------|
| **list** (`list`) | Query a list, such as the object tree or the contents of a folder. |
| **write** (`write`) | Edit an entry. For objects, also: create a new one. |
| **create** (`create`) | Create a new entry where this is checked separately. |
| **delete** (`delete`) | Remove one entry. |
| **delete** | Remove an entry. |

The block **Other** has three rights of its own:

| Law | Meaning |
|----------------------------------|--------------------------------------------------------------------|
| **HTTP requests** (`http`) | The server retrieves an address on the network on behalf of the user interface. |
| **sendTo** (`sendto`) | Send messages to adapter instances and hosts. |
| **sendTo** (`sendto`) | Send messages to adapter instances and hosts. |

**Shell execution** means access to the operating system with the rights of the user under which ioBroker is running. **sendTo** allows messages to be sent to any instance and any host, enabling remote control of many adapters.

Both rights are only granted to individuals who would also be entrusted with the server.

### Which action requires which right
The web interfaces (Admin, web, socketio and others) check the following:

| Action | Law |
|--------------------------------------------------------------------------|--------------------------|
| Read object, subscribe to objects | Objects: read |
| Query object tree, object list | List objects |
| Modify or create an object | Write to objects |
| Delete object | Objects: delete |
| Read status, subscribe, check history | Statuses: read |
| Query multiple states at once | List states |
| Set state (switch) | Write states |
| Create state | States: create |
| Delete state | States: delete |
| Create user or group | User: create |
| Delete user or group | User: delete |
| Change password | User: write |
| Show folder contents | List files |
| Read file, check if it exists | Files: read |
| Create file | Files: create |
| Write, rename, create folders, change permissions or owner | Files: write |
| Delete file | Files: delete |
| Retrieve address from the web | Other: HTTP requests |
| Shell command, read host log | Other: Shell execution |
| Message to instance or host | Other: sendTo |

### Default settings for both groups
| Block | Administrator | User |
|----------|---------------|----------------------------------------|
| Objects | everything | list, read |
| states | everything | list, read, write, create |
| Users | all | list, read |
| Files | all | list, read |
| Other | all | only HTTP requests |

A member of the *Users* group can see and control everything, but cannot modify anything, change files, or send orders to adapters.

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

`1636` is the decimal representation of `0x664`. The database stores the number in decimal format, but the administrator displays it in hexadecimal as `664`.

### Reading the number: like Linux, but in hexadecimal
The ACL number has three digits, one for each role, in this order:

| Position | Role | Read | Write | Execute |
|--------|-----------------------------------|---------|-----------|-----------|
| first | **owner** (`owner`) | `0x400` | `0x200` | `0x100` |
| third | **Everyone** (all other users) | `0x4` | `0x2` | `0x1` |
| third | **Everyone** (all other users) | `0x4` | `0x2` | `0x1` |

Each position is the sum of its rights, just like under Linux:

| Digit | Meaning | Linux notation |
|--------|---------------------|--------------------|
| `0` | nothing | `---` |
| `2` | write | `-w-` |
| `6` | read and write | `rw-` |
| `6` | reading and writing | `rw-` |

The execute bit (`1`) exists, but ioBroker does not evaluate it. Therefore, `7` means the same as `6`.

Typical values:

| Hex | Decimal | Owner | Group | Each | Typical Use |
|---------|---------|------------------|------------------|------------------|-------------------------------------------|
| `0x664` | 1636 | read, write | read, write | read | default |
| `0x666` | 1638 | read, write | read, write | read, write | every registered user may write |
| `0x660` | 1632 | read, write | read, write | - | invisible to strangers |
| `0x640` | 1600 | read, write | read | - | Group reads, strangers see nothing |
| `0x600` | 1536 | read, write | - | - | only the owner |
| `0x444` | 1092 | read | read | read | read for all read-only |
| `0x444` | 1092 | read | read | read | read-only for all |

Never write `664` in scripts or JSON. This is 664 in decimal, so `0x298`: the owner would only be able to write and not read, and the group and everyone would receive bits that have no meaning. The correct way to write it is `0x664` or, in decimal, `1636`.

Even Linux habit doesn't help here: the octal `0o664` is 436 in decimal, so it's `0x1b4`.

### Which position applies: always exactly one role
ioBroker searches for the user's role in this order and takes the **first** one that matches:

1. Is the user the **owner**? Then only the **first** position counts.
2. Otherwise: Is he in the **owner group**, whether in his first or subsequent group?

another group? Then only the **second** position counts.

3. Otherwise, the **third** place applies.

The positions are not added together. As in Linux, the owner can therefore have fewer permissions than their group: In `0x464`, the owner can only read, even though the owner group has write permissions. The second position is irrelevant for them because the first one already matches.

### If nothing is entered
| Case | What applies |
|----------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| Object without `acl` | No ACL check, only group permissions count. |
| File without ACL | It is checked as if it belonged to `admin` and the group *administrator*, with the default file number from the system settings, otherwise `0x644`. |
| File without ACL | Checked as if it belonged to `admin` and the group *administrator*, with the default file number from system settings, otherwise `0x644`. |

## How a request is reviewed
The following tables apply to all users except for the special cases mentioned above. "ACL" refers to the bit indicating the role the user has for that entry.

### Objects
| Operation | Group Law | ACL (`acl.object`) |
|-------------|--------------------|-----------------------------------------------|
| read | Objects: read | read |
| List | Objects: List | Read, for each individual object in the list |
| write | Objects: write | write |
| Create new | Objects: write | - (there is no ACL yet) |
| delete | objects: delete | **write** |

A list contains only objects that the user is authorized to read. Anything that their ACL doesn't allow reading doesn't appear in the object tree at all. Deletion doesn't have its own ACL bit: anyone with write permissions for an object can also delete it with the appropriate group permission.

### States
| Operation | Group Law | ACL (`acl.state`) |
|-------------------|---------------------|-------------------|
| read, subscribe | Statuses: read | read |
| set (switch) | states: write | write |
| delete | states: delete | **write** |

If access is denied, the instance writes a warning to the log that begins with `Permission error for user` and names the user, ID and command.

### Files
| Operation | Group Law | ACL (`acl.permissions`) |
|---------------------------------------|--------------------|-------------------------|
| read | Files: read | read |
| Show folder contents | List files | Read |
| write, rename, create folder | files: write | write |
| Change permissions or owner | Files: write | write |
| delete | files: delete | see note |

A **new** file belongs to the user who creates it. Its permissions come from the standard ACL.

!> As it currently stands with the JS controller, **deleting** files fails for all users outside the administrator group, even if group rights and file ACLs allow it. Anyone who should be able to delete files must currently be a member of the administrator group.

### Users and Groups
The objects `system.user.*` and `system.group.*` are ordinary objects with an additional constraint. For them, **three** things must be allowed:

1. The group right in the **Users** block, i.e., read, list, write,

create or delete

2. the appropriate group right in the **Objects** block,
3. The ACL of the user or group object.

The two included groups are set to `0x644` and belong to `admin`. Therefore, no one can change them without administrator rights, even with all the boxes checked in the *Users* block.

## Default settings for new entries
The assignments for new objects, states, and files are defined in [System settings](/docs/admin/settings.md) under **Standard ACL**.

These are stored in `system.config`, in the field `common.defaultNewAcl`:

```json
"defaultNewAcl": {
  "owner": "system.user.admin",
  "ownerGroup": "system.group.administrator",
  "object": 1636,
  "state": 1636,
  "file": 1636
}
```

If nothing is entered there, then exactly the following applies: Owner `admin`, Group *administrator*, `0x664` for objects, states and files.

If the default ACL is changed, **existing** objects will also receive the new values, but only those that don't yet have an ACL. Objects with their own ACL remain unchanged.

Objects that an adapter creates itself belong to it. If it recreates them during an update, the permissions are restored as the adapter intended.

Where a restriction needs to be permanent, a [Alias](/docs/basics/alias.md) is the more reliable approach: it belongs to you, and the adapter doesn't touch it.

## Setting rights
### In the Admin
**Group rights:** **Users** tab, pencil icon next to the group, **Permissions** tab.

<img src="media/config_gruppe_berechtigungen.png" alt="The Permissions tab of a group" width="588" />

**ACL of an object:** In the [objects](/docs/admin/objects.md) tab, activate **expert mode**. A column with the ACL number will then appear; clicking on it opens the dialog:

<img src="media/config_objekt_acl.png" alt="The access control list of a data point" width="722" />

At the top are **Owner-User** and **Owner-Group**, below which are the rights separated by object and state, for **Owner**, **Group**, and **Everyone**. The **Apply to object and its sub-objects** switch applies the setting to the entire subtree.

### On the command line
All numbers are read in **hexadecimal**, so `644` becomes `0x644`. Users and groups may be specified without a prefix; `fred` becomes `system.user.fred`.

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

Further commands are listed under [command line](/docs/config/cli.md).

### In the script
In the JavaScript adapter, use `extendObject`. Write the numbers as a hexadecimal literal:

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
|                             | Linux | ioBroker |
|-----------------------------|--------------------------------|---------------------------------------------------------|
| User | `uid` | `system.user.<name>` |
| Groups | `gid` and other groups | `system.group.<name>`, members are in the group |
| Rights Number | **octal**, `0664` | **hexadecimal**, `0x664` |
| Rights Number | **octal**, `0664` | **hexadecimal**, `0x664` |
| which role applies | exactly one, the first suitable one | exactly one, the first suitable one |
| Superuser | `root` bypasses everything | `admin` and the entire administrator group bypass everything |
| Superuser | `root` bypasses everything | `admin` and the entire administrator group bypass everything |
| Additional restriction | - | Group rights per operation, such as "write states" |
| Separate rights per entry | One number per file | Object and state each have their own number |

## Example: a guest who only switches on his own devices
Goal: A user *guest* sees everything, but only activates the data points under `0_userdata.0.Gast`.

**1. Create group and user**

```bash
iobroker group add gast
iobroker user add gast --ingroup gast
```

In the admin settings, set the permissions for the group *guest*:

| Block | Rights |
|----------|-----------------------------|
| List objects, read |
| states | list, read, write |
| List files, read |
| User | - |
| Other | - |

**2. Give the group's own data points**

```bash
iobroker object chown admin gast 0_userdata.0.Gast.*
iobroker object chmod 644 664 0_userdata.0.Gast.*
```

**3. What happens next**

| Data point | ACL | Role of *guest* | Result |
|-----------------------------------|-----------------------------------------|----------------------------|--------------------|
| `0_userdata.0.Gast.Licht` | Group *guest*, status `0x664` | Owner group, number `6` | view and toggle |
| `0_userdata.0.Gast.Licht`, Object | Object `0x644` | Owner group, Number `4` | Do not modify |
| `0_userdata.0.Guest.Light`, object | object `0x644` | owner group, digit `4` | do not modify |

If *guest* should not see the remaining data points at all, they will be assigned `0` as their third position, for example `0x660`. Then they will be missing from his object tree.

**4. Login** - Enable login in the [Authentication](/docs/config/login.md) of the web adapter; otherwise, everyone will work as `admin`. Then log in as *guest* and check if only the intended functions work.

## Example: Making a group vis-2 compatible
Goal: Members of a separate group log in to the web adapter, open [vis-2](/docs/viz/vis-2.md) and only see what is intended for them - without being in the administrator group.

### Why a new group fails with “404 - index.html”
A newly created admin group has no permissions whatsoever. All five blocks are unchecked, including "Read files". Anyone in this group has no access to it.

vis-2 resides entirely within ioBroker's file storage. When the browser requests `/vis-2/index.html`, the web adapter reads this file **on behalf of the logged-in user**. If this fails due to permission issues, it doesn't distinguish between "forbidden" and "not found," but instead returns a 404 page. The message is therefore *index.html not found*, even though the file is present.

The obvious solution, adding the user **additionally** to the administrator group, works-but removes all restrictions, as members of this group are exempt from all ACLs. The fact that group-dependent visibility in vis-2 still works afterward is misleading: it only checks membership, not permissions. Granting the user's own group the permissions listed below is the quicker **and** safer way.

### The rights a vis-to-vis group needs
For simply viewing an image:

| Block | Law | What vis-2 is needed for |
|--------------|------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| **Files** | read | everything in the namespace `vis-2`, i.e. `index.html`, libraries and widget sets, and the project `vis-2.0/<Projekt>/vis-views.json` |
| **Objects** | read | `system.user.<name>`, `system.adapter.vis-2.0` and the objects of all data points in the views |
| **Objects** | Read | `system.user.<name>`, `system.adapter.vis-2.0` and the objects of all data points in the views |
| **Objects** | list | the list of groups that vis-2 retrieves at startup |
| **States** | read, list | the values in the views and `vis-2.0.info.uploaded` |
| **States** | read, list | the values in the views and `vis-2.0.info.uploaded` |
| **States** | write | only if switching is also to be done in the view |

This is the configuration of the included *Users* group, extended by *Users: read*. Everything else remains empty: no file write permissions, no *shell execution*, no *sendTo*.

Without the `list objects` option, vis-2 doesn't get the group list. Without the `read user` option, even reading the user's own object fails. Both errors look the same in the browser: the view doesn't finish loading, even though the login itself worked.

### The files themselves
The file ACL usually **does not** need to be modified. For example, `iobroker upload vis-2` und der vis-2-Editor anlegen, gehört `admin` and the group *administrator*, with `4` in the third position: *Everyone* has read access. The problem lies with the group, not the file.

Only those who want to assign different projects to different groups use the file ACL. The first part of the path is the namespace: `vis-2` contains the program code for all projects, `vis-2.0` the projects.

```bash
# Projekt "haupt" nur noch für die Gruppe "haupt" lesbar
iobroker chown admin haupt /vis-2.0/haupt/*
iobroker chmod 640 /vis-2.0/haupt/*
```

### The control data points
Navigation commands and `sendCommand` are handled via three separate states in vis-2:

| Data point | What for |
|----------------------------|-------------------------|
| `vis-2.0.control.instance` | Target instance of the command |
| `vis-2.0.control.command` | the command itself |
| `vis-2.0.control.command` | the command itself |

They are set to `0x664` by default, meaning *everyone* has read-only access. As long as the user is not in the owner group, such commands will have no effect-no message will appear in the view, only an error in the browser console. Those who need access can specify the group's data points:

```bash
iobroker object chown admin haupt vis-2.0.control.*
```

With multiple groups, only the third position remains: `iobroker object chmod 664 666 vis-2.0.control.*`. Die `666` is the state number, *everyone* is then allowed to write.

### View or edit
| Task | Additional requirement |
|-------------------------------|------------------------------------------------------|
| Open view, `index.html` | nothing further |
| Open editor, `edit.html` | Files: write and create, Objects: write |
| Delete projects or files | currently only possible in the administrator group |

The vis-2 editor is therefore practically reserved for administrators. Deleting files fails outside the administrator group (see the note about the files), and anyone who is allowed to save a project also changes it for everyone else.

Custom groups only receive the necessary permissions for runtime.

### Visibility by group in vis-2
In the editor, both the view and the individual widget can be restricted by group:

| Where | Fields |
|-----------------------------------------|---------------------------------------------------------------------------------------------------|
| **View**, Attributes, *General CSS* | **For Groups Only**, **If User Is Not in Group** (*Hide* / *Disabled*) |
| **Widget**, Attributes, *Visibility* | **For groups only**, **If user is not in group** (*Hide* / *Disabled*) |

vis-2 compares the logged-in user with `common.members` of the specified groups. It must be able to read the groups for this to work; see *List objects* above: without a group list, no one is considered a member, and everything remains hidden.

This visibility is **surface view, not protection**. The project is sent to the browser as a whole file; filtering only occurs there. Anyone opening the developer tools will also see the hidden widgets along with their data point IDs. Access is only prevented by the state ACLs.

For the same reason, every logged-in vis user sees the names of all groups and their members: vis-2 retrieves the complete group list at startup.

### The steps
```bash
iobroker group add haupt
iobroker user add max --ingroup haupt
```

1. In the Admin section, under the **Users** tab, grant the *main* group the necessary permissions.

Place the table at the top. A new group starts empty.

2. In the [Authentication](/docs/config/login.md) of the instance *web.0*, the

Enable login. Without it, everyone works as `admin`.

3. Restart the instance *web.0* so that it rereads the group permissions.
4. In the vis-2 editor, set views and widgets to **Groups only**.
5. Log in with *max*, preferably in a private window, and check: does it load?

In this view, if the foreign widgets are missing, you can switch on what you want to switch on.

6. What doesn't work is recorded in the log of the instance *web.0*, in the lines that begin with

`Permission error for user` begin.

## Troubleshooting
| Observation | Probable cause | Remedy |
|---------------------------------------------------------|----------------------------------------------------------------------------|---------------------------------------------------------|
| Everything is allowed, even though permissions are set | Login is off, it's running as `admin` | Enable login in the instance |
| He sees the data point but cannot activate it | Write permission on the **state** is missing; often only the object ACL has been changed | Check `acl.state`, not `acl.object` |
| He sees the data point, but cannot switch it | Write permission on the **state** is missing; often only the object ACL was changed | Check `acl.state`, not `acl.object` |
| Permissions set in the script, nothing works after that | Number written in decimal format, `664` instead of `0x664` | Use a hex literal |
| Permissions set in the script, then nothing works | Number written in decimal format, `664` instead of `0x664` | Use a hex literal |
| Permissions are reset after an adapter update | The adapter has recreated its objects | Use alias |
| A change to a user or group has no effect | The instance has cached the permissions | Restart the affected instance, e.g., *web* or *admin* |
| A user cannot delete a file | File deletion is currently only possible for the administrator group | See note regarding files |
| vis-2 reports "404 - index.html not found" | The group is missing *files: read*, the web adapter cannot read the file | see *making a group vis-2 compatible* |
| vis-2 requests a project even though one exists | `vis-2.0/<Projekt>/vis-views.json` is not user-readable | Check file ACL and *files: read* |
| Navigation and commands do not work in vis-2 | `vis-2.0.control.*` is read-only for the user | Give data points to the group |
| Navigation and commands do not work in vis-2 | `vis-2.0.control.*` is read-only for the user | Give data points to the group |

Before making major changes, create a [Backup](/docs/config/backup.md). Anyone who locks themselves out with overly restrictive permissions can only regain access via [command line](/docs/config/cli.md): `iobroker object chmod` and `iobroker object chown` always operate with administrator rights.