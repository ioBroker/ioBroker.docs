---
title: Tour of the surface
lastChanged: 08.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/tutorial/admin.md
hash: xYTy616iS/eEmQmNwLSg+Wh2R8FCNB9aOrheAvRdkcY=
---
# Tour of the surface

The admin panel has many tabs, and at first glance, it looks like there are more than there actually are. In fact, you'll only need four of them in everyday use. This tour explains what those are and what the others are for. A detailed description of each tab can be found in the [Admin Interface](/docs/admin/README.md) chapter.

## The structure

The page consists of three areas: on the left the **menu bar** with the tabs, to the right of it the **main window** and above it a **toolbar** , the content of which depends on the currently open tab.

The **system** settings are located at the bottom left. The [system settings](/docs/admin/settings.md) are configured there, and next to it is the switch for expert mode.

## The four you need every day

| Equestrian                           | For what                                                                              |
| ------------------------------------ | ------------------------------------------------------------------------------------- |
| [adapter](/docs/admin/adapter.md)    | Add new connections and update existing ones.                                         |
| [Instance](/docs/admin/instances.md) | The ongoing connections: configure, start, stop, and see if they are running.         |
| [objects](/docs/admin/objects.md)    | The tree of all data points. Here you can check if a value has arrived.               |
| [Protocols](/docs/admin/log.md)      | This is what the system has to say. The menu item turns red if an error has occurred. |

When something isn't working, the order is almost always the same: instances (is it running?), objects (is a value arriving?), logs (what is the system saying?).

## The rest

| Equestrian                                           | For what                                                                                                   |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| [Overview and quick access](/docs/admin/overview.md) | System status at a glance and tiles for all surfaces.                                                      |
| [Categories](/docs/admin/enums.md)                   | Spaces and functions. It looks like minor details, but it's the basis for visualization and voice control. |
| [user](/docs/admin/users.md)                         | Who is allowed to register and what they are allowed to do.                                                |
| [Hosts](/docs/admin/hosts.md)                        | The computer itself, updates of the js-controller, system messages.                                        |
| [files](/docs/admin/files.md)                        | The file storage, for example for images in a visualization.                                               |
| Backup                                               | This comes from the BackItUp adapter, see [Data Backup](/docs/config/backup.md) .                          |

Additional tabs are added with the installed adapters, such as _scripts_ , _calendars_ , or _devices_ .

## Expert mode

An icon in the bottom left corner activates expert mode. This displays additional columns and settings, including access rights to objects and the internal data points of the adapters.

It stays off at first. It reveals much more, and you'll only need most of it when you're investigating a problem.

## If you lack the space

The arrow at the top of the menu bar shrinks it down to icons. On a tablet, this is the difference between usable and unusable.

## What happens next?

Next comes the tab you'll be using most at the beginning: [Manage adapters](/docs/tutorial/adapter.md) .