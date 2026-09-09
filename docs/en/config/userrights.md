---
title: Access management with users and groups
lastChanged: 08.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/config/userrights.md
hash: uKdcf8VAS648FAx+FuFT5jh+jE5kbedUL7jNl5x3PHM=
---
# Access management with users and groups

Those who register with ioBroker do so as **user**What this user is allowed to do is determined by two things together: the **rights of his groups** and the
**Access rights to the individual object**Both must permit what he intends to do. If one of them prohibits it, nothing happens.

These users are not the operating system users. They only apply within ioBroker: for logging into the admin interface, vis, and the web adapters. They are created in the tab.
[user](/docs/admin/users.md).

## The two existing groups

| group                                            | Intended for                                                  |
| ------------------------------------------------ | ------------------------------------------------------------- |
| **Administrator** (`system.group.administrator`) | Full access. This is where the user is located. `admin`.      |
| **user** (`system.group.user`)                   | Daily operation: switching and reading, but no modifications. |

A user can belong to multiple groups. Their rights are then the sum of all group rights.

## What a group is allowed to do

In the rider **user** The pencil opens the editing on a group, the rider **Permissions** shows the rights:

<img src="media/config_gruppe_berechtigungen.png" alt="Der Reiter Berechtigungen einer Gruppe mit den fuenf Rechteblöcken" width="588" />

Five blocks, each with the same five rights:

| block                     | What it applies to                                              |
| ------------------------- | --------------------------------------------------------------- |
| **Object permissions**    | The description of a data point: name, role, unit, assignments. |
| **Status authorizations** | The value itself. Switching is a write access to the state.     |
| **User permissions**      | Manage users and groups.                                        |
| **Other permissions**     | `http-Anfragen`, `Shell-Ausführung` and `sendTo`.               |
| **File permissions**      | The file storage, i.e., everything in the Files tab.            |

The five rights mean: **read** retrieve individually **list** To even see that something exists, **write** change, **delete** remove,
**create** Create a new one.

The group _user_ It is factory-set to cover everyday use:

| block      | Allowed                   |
| ---------- | ------------------------- |
| objects    | read, list                |
| Conditions | read, list, write, create |
| user       | read, list                |
| Other      | only `http-Anfragen`      |
| files      | read, list                |

This allows such a user to see everything and control devices, but not to modify objects or run scripts. `sendTo` Do not initiate the process and do not issue any shell commands.

!> `Shell-Ausführung` This means that scripts from this user are allowed to execute commands on the operating system. This right belongs only to the Administrators group.

## Rights to the individual object

Each object has its own access rights, similar to a file in Linux. These are visible in the **Expert mode**: the rider
[objects](/docs/admin/objects.md) It then gets a column with a three-digit number, for example. `664`. Clicking on it opens the access control list:

<img src="media/config_objekt_acl.png" alt="Die Zugriffssteuerungsliste eines Datenpunkts" width="722" />

At the top are **Owner-User** and **Owner group**, including the rights, separated by object and state, and for three roles each:

- **Owner**: the registered user.
- **group**: who is in the registered group.
- **Everyone**: all other registered users.

The three numbers represent precisely these three roles. Reading counts. `4`, Write `2`, together therefore `6`. `664` This means that the owner and group are allowed to read and write, everyone else can only read.

The desk **Apply to the object and its sub-objects** This applies the setting to the entire subtree. This is a convenient way to, for example, set an entire adapter namespace to read-only.

What rights? **newly created** Obtaining objects is stated in the
[System settings](/docs/admin/settings.md)
under _Standard AC&#x4C;_&#x54;his setting does not change existing objects.

## Create a restricted user

The usual scenario: someone should be able to operate the visualization, but not be able to change anything in the system.

1. In the rider **user** Create a user and assign a password.
2. him into the group **user** pull, not in **Administrator**.
3. In the [authentication](/docs/config/login.md)
   Enable login for the relevant web adapter.
4. Log in with this user and test whether only what is supposed to work actually works.

The group is sufficient _user_ If no group is selected, a separate group is created and assigned only the necessary permissions. If a specific area needs to be additionally restricted, this is done via the object's access rights.

!> Before switching,
[Backup](/docs/config/backup.md) Create. Anyone who locks themselves out with overly restrictive rights will otherwise only be able to get out via the...
[command line](/docs/config/cli.md) back inside.