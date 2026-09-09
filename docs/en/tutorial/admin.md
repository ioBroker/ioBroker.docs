---
title: Tour of the surface
lastChanged: 08.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/tutorial/admin.md
hash: xYTy616iS/eEmQmNwLSg+Wh2R8FCNB9aOrheAvRdkcY=
---
# Tour of the surface

The admin panel has many tabs, and at first glance, it looks like there are more than there actually are. In fact, you'll only need four of them in your daily work. This tour explains which ones those are and what the others are for. A detailed description of each tab can be found in the chapter.
[Admin interface](/docs/admin/README.md).

## The structure

The page consists of three sections: on the left the **Menu bar** with the riders, to the right of that the **Main window** and about that a **Toolbar**, the content of which depends on the currently opened tab.

It sits at the very bottom left. **system**There, the
[System settings](/docs/admin/settings.md)
The procedure was carried out, and next to it is the switch for expert mode.

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
| Backup                                               | It comes from the BackItUp adapter, see [Data backup](/docs/config/backup.md).                             |

Additional tabs are added with the installed adapters, such as... _Scripts_,
_calendar_ or _Devices_.

## Expert mode

An icon in the bottom left corner activates expert mode. This displays additional columns and settings, including access rights to objects and the internal data points of the adapters.

It stays off at first. It reveals much more, and you'll only need most of it when you're investigating a problem.

## If you lack the space

The arrow at the top of the menu bar shrinks it down to icons. On a tablet, this is the difference between usable and unusable.

## What happens next?

Next comes the rider you'll be using most at the beginning:
[Manage adapters](/docs/tutorial/adapter.md).