---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/faq/_020_usage/070_instanz_zustand.md
title: no title
hash: Q9k5v7knbWg1sxPnfewRadAumDv6UP7nw2DYFUrBV2A=
---
## What do the symbols in front of an institution mean?

<img src="media/faq_instanz_zustand.png" alt="Drei Instanzzeilen mit unterschiedlichem Zustand" width="708" />

| symbol       | Meaning                                                                                                  |
| ------------ | -------------------------------------------------------------------------------------------------------- |
| Green Square | The instance is running.                                                                                 |
| Grey gear    | The instance is stopped. The red triangle next to it starts it.                                          |
| Clock        | A time-controlled instance. It only runs briefly at the set time and then terminates. This is not a bug. |

More details can be found by hovering the mouse cursor over the icon. Whether the instance is actually communicating with your device is not indicated here, but rather in its object. `info.connection`.

Detailed: [Instances tab](/docs/admin/instances.md)